import { NextRequest, NextResponse } from "next/server";
import { getPartnersCollection, getRegistrationsCollection, getTrackingEventsCollection } from "@/lib/db";
import { ATTRIBUTION_COOKIE_NAME } from "@/lib/attribution";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;
  const normalizedCode = code?.trim().toUpperCase();

  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const utmSource = searchParams.get("utm_source");
  const utmMedium = searchParams.get("utm_medium");
  const utmCampaign = searchParams.get("utm_campaign");
  const utmContent = searchParams.get("utm_content");

  if (!normalizedCode) {
    return NextResponse.redirect(new URL("/workshop", request.url));
  }

  const partnersCol = await getPartnersCollection();
  const registrationsCol = await getRegistrationsCollection();
  const trackingCol = await getTrackingEventsCollection();

  let targetPartnerCode = "";
  let targetReferralCode: string | undefined = undefined;
  let eventType: "partner_link_click" | "referral_click" = "partner_link_click";
  let defaultSource = "partner_link";

  // Check if student referral (prefixed with S- or case insensitive)
  if (normalizedCode.startsWith("S-") || normalizedCode.startsWith("S_")) {
    const studentReg = await registrationsCol.findOne({
      studentReferralCode: { $regex: new RegExp(`^${normalizedCode}$`, "i") },
    });

    if (studentReg) {
      targetPartnerCode = studentReg.partnerCode || "";
      targetReferralCode = studentReg.studentReferralCode;
      eventType = "referral_click";
      defaultSource = "student_referral";

      await trackingCol.insertOne({
        type: eventType,
        partnerCode: targetPartnerCode,
        source: utmSource || defaultSource,
        medium: utmMedium || "referral",
        campaign: utmCampaign || "build60_sprint",
        content: targetReferralCode,
        isDemo: studentReg.isDemo,
        createdAt: new Date(),
      });
    }
  }

  // If not student referral, check partner code
  if (!targetPartnerCode) {
    const partner = await partnersCol.findOne({
      code: { $regex: new RegExp(`^${normalizedCode}$`, "i") },
    });

    if (partner) {
      targetPartnerCode = partner.code;
      eventType = "partner_link_click";
      defaultSource = "partner_link";

      // Mark partner activated if not already
      if (!partner.activatedAt) {
        await partnersCol.updateOne(
          { _id: partner._id },
          { $set: { activatedAt: new Date() } }
        );
      }

      await trackingCol.insertOne({
        type: eventType,
        partnerId: partner._id,
        partnerCode: partner.code,
        source: utmSource || defaultSource,
        medium: utmMedium || "campus_link",
        campaign: utmCampaign || "build60_sprint",
        content: utmContent || undefined,
        isDemo: partner.isDemo,
        createdAt: new Date(),
      });
    }
  }

  // Determine redirect URL
  const destination = new URL("/workshop", request.url);
  if (targetPartnerCode) {
    destination.searchParams.set("ref", targetPartnerCode);
    if (targetReferralCode) {
      destination.searchParams.set("studentRef", targetReferralCode);
    }
  } else {
    destination.searchParams.set("error", "invalid_ref");
  }

  const response = NextResponse.redirect(destination);

  // Set noindex, nofollow
  response.headers.set("X-Robots-Tag", "noindex, nofollow");

  // Set attribution cookie
  if (targetPartnerCode) {
    const attributionData = {
      partnerCode: targetPartnerCode,
      referralCode: targetReferralCode,
      source: utmSource || defaultSource,
      medium: utmMedium || "link",
      campaign: utmCampaign || "build60_sprint",
      content: utmContent || targetReferralCode,
      firstTouchAt: new Date().toISOString(),
      lastTouchAt: new Date().toISOString(),
    };

    response.cookies.set(
      ATTRIBUTION_COOKIE_NAME,
      encodeURIComponent(JSON.stringify(attributionData)),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 30, // 30 days
      }
    );
  }

  return response;
}
