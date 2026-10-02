"use server";

import { z } from "zod";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  getRegistrationsCollection,
  getPartnersCollection,
  getUsersCollection,
  getEventsCollection,
  getTrackingEventsCollection,
} from "@/lib/db";
import { getActiveEvent, DEFAULT_EVENT_SLUG } from "@/lib/events";
import { getAttributionCookie } from "@/lib/attribution";
import { setSessionCookie, clearSessionCookie } from "@/lib/session";
import { hashPassword, verifyPassword, requireAdmin } from "@/lib/auth";
import { PartnerStatus } from "@/types";

// 1. Student Registration Validation Schema
const registrationSchema = z.object({
  name: z.string().trim().min(2, "Full name must be at least 2 characters").max(100),
  email: z.string().trim().email("Please enter a valid academic/personal email").max(150),
  college: z.string().trim().min(2, "Please enter your college name").max(150),
  graduationYear: z.string().trim().regex(/^202[4-9]$/, "Please select a valid graduation year (2024-2029)"),
  branch: z.string().trim().max(100).optional(),
  phone: z.string().trim().max(20).optional(),
  partnerCode: z.string().trim().max(50).optional(),
  studentRef: z.string().trim().max(50).optional(),
  source: z.string().trim().max(50).optional(),
  medium: z.string().trim().max(50).optional(),
  campaign: z.string().trim().max(50).optional(),
  content: z.string().trim().max(50).optional(),
});

export async function registerStudentAction(formData: FormData) {
  const rawData = {
    name: formData.get("name"),
    email: formData.get("email"),
    college: formData.get("college"),
    graduationYear: formData.get("graduationYear"),
    branch: formData.get("branch") || undefined,
    phone: formData.get("phone") || undefined,
    partnerCode: formData.get("partnerCode") || undefined,
    studentRef: formData.get("studentRef") || undefined,
    source: formData.get("source") || undefined,
    medium: formData.get("medium") || undefined,
    campaign: formData.get("campaign") || undefined,
    content: formData.get("content") || undefined,
  };

  const parsed = registrationSchema.safeParse(rawData);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message || "Invalid input data",
    };
  }

  const { name, college, graduationYear, branch, phone } = parsed.data;
  const emailNormalized = parsed.data.email.toLowerCase();

  // Check attribution cookie fallback
  const attributionCookie = await getAttributionCookie();
  const effectivePartnerCode =
    parsed.data.partnerCode || attributionCookie?.partnerCode || undefined;
  const effectiveReferralCode =
    parsed.data.studentRef || attributionCookie?.referralCode || undefined;
  const effectiveSource =
    parsed.data.source ||
    (effectiveReferralCode ? "student_referral" : attributionCookie?.source) ||
    "direct";
  const effectiveMedium = parsed.data.medium || attributionCookie?.medium || "web";
  const effectiveCampaign = parsed.data.campaign || attributionCookie?.campaign || "build60_sprint";

  const event = await getActiveEvent();
  if (!event.registrationOpen) {
    return {
      success: false,
      error: "Registrations for this workshop are currently closed.",
    };
  }

  const registrationsCol = await getRegistrationsCollection();
  const partnersCol = await getPartnersCollection();
  const trackingCol = await getTrackingEventsCollection();

  // Check duplicate registration
  const existing = await registrationsCol.findOne({
    eventId: event._id as ObjectId,
    emailNormalized,
  });

  if (existing) {
    return {
      success: false,
      error: "You are already registered for this workshop with this email address. We look forward to seeing you!",
    };
  }

  // Lookup partner if partnerCode is present
  let resolvedPartnerId: ObjectId | undefined = undefined;
  let resolvedPartnerCode: string | undefined = undefined;
  let resolvedCampusSlug: string | undefined = undefined;

  if (effectivePartnerCode) {
    const partner = await partnersCol.findOne({
      code: { $regex: new RegExp(`^${effectivePartnerCode.trim()}$`, "i") },
    });
    if (partner) {
      resolvedPartnerId = partner._id as ObjectId;
      resolvedPartnerCode = partner.code;
      resolvedCampusSlug = partner.slug;

      // Mark partner activated if not already
      if (!partner.activatedAt) {
        await partnersCol.updateOne(
          { _id: partner._id },
          { $set: { activatedAt: new Date() } }
        );
      }
    }
  }

  // Check secondary student referral
  let referredByRegistrationId: ObjectId | undefined = undefined;
  if (effectiveReferralCode) {
    const referrerReg = await registrationsCol.findOne({
      studentReferralCode: { $regex: new RegExp(`^${effectiveReferralCode.trim()}$`, "i") },
    });
    if (referrerReg) {
      referredByRegistrationId = referrerReg._id as ObjectId;
      // If no partner was found yet, preserve referring student's partner!
      if (!resolvedPartnerCode && referrerReg.partnerCode) {
        resolvedPartnerCode = referrerReg.partnerCode;
        resolvedPartnerId = referrerReg.partnerId as ObjectId;
        resolvedCampusSlug = referrerReg.campusId;
      }
    }
  }

  // Generate unique random student referral code: s-XXXXX
  const randomSuffix = Math.random().toString(36).substring(2, 7).toUpperCase();
  const studentReferralCode = `s-${randomSuffix}`;

  const newRegId = new ObjectId();
  await registrationsCol.insertOne({
    _id: newRegId,
    eventId: event._id as ObjectId,
    name,
    emailNormalized,
    college,
    graduationYear,
    branch,
    phone,
    partnerId: resolvedPartnerId,
    partnerCode: resolvedPartnerCode,
    campusId: resolvedCampusSlug,
    source: effectiveSource,
    medium: effectiveMedium,
    campaign: effectiveCampaign,
    content: parsed.data.content,
    studentReferralCode,
    referredByRegistrationId,
    isDemo: false,
    registeredAt: new Date(),
  });

  // Track event
  await trackingCol.insertOne({
    eventId: event._id as ObjectId,
    type: "registration_completed",
    partnerId: resolvedPartnerId,
    partnerCode: resolvedPartnerCode,
    source: effectiveSource,
    medium: effectiveMedium,
    campaign: effectiveCampaign,
    registrationId: newRegId,
    isDemo: false,
    createdAt: new Date(),
  });

  return {
    success: true,
    registrationId: newRegId.toString(),
    studentReferralCode,
    name,
    college,
  };
}

// 2. Partner Application Validation Schema
const partnerApplySchema = z.object({
  clubName: z.string().trim().min(2, "Club name is required").max(120),
  collegeName: z.string().trim().min(3, "College name is required").max(150),
  city: z.string().trim().min(2, "City is required").max(100),
  clubType: z.string().trim().min(2, "Please select club type"),
  websiteUrl: z.string().trim().url().optional().or(z.literal("")),
  leadName: z.string().trim().min(2, "Lead organizer name is required").max(100),
  email: z.string().trim().email("Please enter a valid email address"),
  phone: z.string().trim().min(8, "Phone number is required").max(20),
  facultyName: z.string().trim().max(100).optional(),
  facultyEmail: z.string().trim().email().optional().or(z.literal("")),
  approximateCommunitySize: z.coerce.number().min(10, "Minimum community size is 10"),
  applicationReason: z.string().trim().min(15, "Please share why your club wants to collaborate"),
  authorized: z.string().refine((val) => val === "on", {
    message: "You must confirm you represent the student club",
  }),
});

export async function applyPartnerAction(formData: FormData) {
  const rawData = {
    clubName: formData.get("clubName"),
    collegeName: formData.get("collegeName"),
    city: formData.get("city"),
    clubType: formData.get("clubType"),
    websiteUrl: formData.get("websiteUrl") || "",
    leadName: formData.get("leadName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    facultyName: formData.get("facultyName") || undefined,
    facultyEmail: formData.get("facultyEmail") || "",
    approximateCommunitySize: formData.get("approximateCommunitySize"),
    applicationReason: formData.get("applicationReason"),
    authorized: formData.get("authorized"),
  };

  const parsed = partnerApplySchema.safeParse(rawData);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message || "Invalid application data",
    };
  }

  const data = parsed.data;
  const partnersCol = await getPartnersCollection();

  // Create clean slug
  const baseSlug = `${data.collegeName}-${data.clubName}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .substring(0, 40);

  const existingSlug = await partnersCol.findOne({ slug: baseSlug });
  const slug = existingSlug ? `${baseSlug}-${Math.floor(100 + Math.random() * 900)}` : baseSlug;

  // Generate unique collision resistant code e.g. "CC-1234"
  const prefix = data.clubName
    .replace(/[^a-zA-Z]/g, "")
    .substring(0, 3)
    .toUpperCase() || "HUB";
  const num = Math.floor(1000 + Math.random() * 9000);
  const code = `${prefix}-${num}`;

  const partnerId = new ObjectId();
  await partnersCol.insertOne({
    _id: partnerId,
    code,
    slug,
    clubName: data.clubName,
    clubType: data.clubType,
    collegeName: data.collegeName,
    city: data.city,
    logoUrl: undefined,
    leadName: data.leadName,
    email: data.email.toLowerCase(),
    phone: data.phone,
    facultyName: data.facultyName,
    facultyEmail: data.facultyEmail || undefined,
    approximateCommunitySize: data.approximateCommunitySize,
    applicationReason: data.applicationReason,
    status: "APPLIED",
    targetRegistrations: 500,
    isDemo: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  return {
    success: true,
    code,
    clubName: data.clubName,
    collegeName: data.collegeName,
  };
}

// 3. Admin Login Action
export async function loginAdminAction(formData: FormData) {
  const email = (formData.get("email") as string)?.trim().toLowerCase();
  const password = (formData.get("password") as string)?.trim();

  if (!email || !password) {
    return { success: false, error: "Email and password are required" };
  }

  const usersCol = await getUsersCollection();
  const user = await usersCol.findOne({ email, role: "ADMIN" });

  if (!user) {
    return { success: false, error: "Invalid admin credentials" };
  }

  const valid = await verifyPassword(password, user.passwordHash);
  if (!valid) {
    return { success: false, error: "Invalid admin credentials" };
  }

  await setSessionCookie({
    userId: user._id?.toString() || "",
    email: user.email,
    name: user.name,
    role: "ADMIN",
  });

  return { success: true };
}

// 4. Partner Login Action
export async function loginPartnerAction(formData: FormData) {
  const email = (formData.get("email") as string)?.trim().toLowerCase();
  const password = (formData.get("password") as string)?.trim();

  if (!email || !password) {
    return { success: false, error: "Email and password are required" };
  }

  const usersCol = await getUsersCollection();
  const user = await usersCol.findOne({ email, role: "PARTNER" });

  if (!user) {
    return { success: false, error: "Invalid partner credentials. Make sure your club has been approved." };
  }

  const valid = await verifyPassword(password, user.passwordHash);
  if (!valid) {
    return { success: false, error: "Invalid partner credentials" };
  }

  const partnersCol = await getPartnersCollection();
  const partner = await partnersCol.findOne({ _id: new ObjectId(user.partnerId as string) });

  await setSessionCookie({
    userId: user._id?.toString() || "",
    email: user.email,
    name: user.name,
    role: "PARTNER",
    partnerId: user.partnerId?.toString(),
    partnerCode: partner?.code,
  });

  return { success: true };
}

// 5. Admin Partner Status Update
export async function updatePartnerStatusAction(partnerId: string, status: PartnerStatus) {
  await requireAdmin();
  const partnersCol = await getPartnersCollection();
  const usersCol = await getUsersCollection();

  const partner = await partnersCol.findOne({ _id: new ObjectId(partnerId) });
  if (!partner) {
    return { success: false, error: "Partner not found" };
  }

  const updates: Record<string, unknown> = {
    status,
    updatedAt: new Date(),
  };

  if (status === "APPROVED" && !partner.approvedAt) {
    updates.approvedAt = new Date();

    // Check if user account already exists, if not create default access
    const existingUser = await usersCol.findOne({ email: partner.email });
    if (!existingUser) {
      const defaultPassword = "Partner2025!";
      const passwordHash = await hashPassword(defaultPassword);
      await usersCol.insertOne({
        email: partner.email,
        passwordHash,
        name: `${partner.leadName} (${partner.clubName})`,
        role: "PARTNER",
        partnerId: partner._id,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
  }

  await partnersCol.updateOne({ _id: partner._id }, { $set: updates });
  revalidatePath("/admin/partners");
  revalidatePath(`/admin/partners/${partnerId}`);
  return { success: true };
}

// 6. Admin Event Settings Update
export async function updateEventSettingsAction(formData: FormData): Promise<{ success: boolean; error?: string }> {
  try {
    await requireAdmin();
    const title = (formData.get("title") as string)?.trim();
    const description = (formData.get("description") as string)?.trim();
    const date = (formData.get("date") as string)?.trim() || undefined;
    const startTime = (formData.get("startTime") as string)?.trim() || undefined;
    const endTime = (formData.get("endTime") as string)?.trim() || undefined;
    const timezone = (formData.get("timezone") as string)?.trim() || "IST";
    const mode = ((formData.get("mode") as string) || "Online") as "Online" | "Hybrid" | "In-Person";
    const registrationTarget = Number(formData.get("registrationTarget")) || 500;
    const stretchTarget = Number(formData.get("stretchTarget")) || 550;
    const registrationOpen = formData.get("registrationOpen") === "true";
    const ctaText = (formData.get("ctaText") as string)?.trim() || "Claim Your Workshop Seat";

    const eventsCol = await getEventsCollection();
    await eventsCol.updateOne(
      { slug: DEFAULT_EVENT_SLUG },
      {
        $set: {
          title,
          description,
          date,
          startTime,
          endTime,
          timezone,
          mode,
          registrationTarget,
          stretchTarget,
          registrationOpen,
          ctaText,
          updatedAt: new Date(),
        },
      },
      { upsert: true }
    );

    revalidatePath("/");
    revalidatePath("/workshop");
    revalidatePath("/admin/settings");
    revalidatePath("/admin/dashboard");
    return { success: true };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Failed to update event settings";
    return { success: false, error: errorMsg };
  }
}

// 7. Logout Action
export async function logoutAction() {
  await clearSessionCookie();
  redirect("/");
}
