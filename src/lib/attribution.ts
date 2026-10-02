import { cookies } from "next/headers";
import { AttributionCookie } from "@/types";

export const ATTRIBUTION_COOKIE_NAME = "build60_attribution";

export async function getAttributionCookie(): Promise<AttributionCookie | null> {
  try {
    const cookieStore = await cookies();
    const raw = cookieStore.get(ATTRIBUTION_COOKIE_NAME)?.value;
    if (!raw) return null;
    const parsed = JSON.parse(decodeURIComponent(raw));
    return parsed as AttributionCookie;
  } catch {
    return null;
  }
}

export async function setAttributionCookie(data: Partial<AttributionCookie>): Promise<void> {
  const existing = (await getAttributionCookie()) || {
    firstTouchAt: new Date().toISOString(),
    lastTouchAt: new Date().toISOString(),
  };

  const updated: AttributionCookie = {
    partnerCode: data.partnerCode || existing.partnerCode,
    referralCode: data.referralCode || existing.referralCode,
    source: data.source || existing.source || "direct",
    medium: data.medium || existing.medium,
    campaign: data.campaign || existing.campaign,
    content: data.content || existing.content,
    firstTouchAt: existing.firstTouchAt || new Date().toISOString(),
    lastTouchAt: new Date().toISOString(),
  };

  const cookieStore = await cookies();
  cookieStore.set(ATTRIBUTION_COOKIE_NAME, encodeURIComponent(JSON.stringify(updated)), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days attribution window
  });
}
