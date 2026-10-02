import bcrypt from "bcryptjs";
import { getSession } from "@/lib/session";
import { getPartnersCollection } from "@/lib/db";
import { SessionPayload, Partner } from "@/types";
import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function getCurrentUser(): Promise<SessionPayload | null> {
  return getSession();
}

export async function requireAdmin(): Promise<SessionPayload> {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    redirect("/admin/login");
  }
  return user;
}

export async function requirePartner(): Promise<{ user: SessionPayload; partner: Partner }> {
  const user = await getCurrentUser();
  if (!user || user.role !== "PARTNER" || !user.partnerId) {
    redirect("/partner/login");
  }

  const partners = await getPartnersCollection();
  let partnerDoc = null;
  try {
    partnerDoc = await partners.findOne({ _id: new ObjectId(user.partnerId) });
  } catch {
    partnerDoc = await partners.findOne({ _id: user.partnerId as unknown as ObjectId });
  }

  if (!partnerDoc) {
    redirect("/partner/login");
  }

  return { user, partner: partnerDoc };
}
