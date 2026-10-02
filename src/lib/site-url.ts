import { headers } from "next/headers";

/**
 * Returns the canonical base URL for the application.
 * Dynamically resolves across environments in priority order:
 * 1. process.env.NEXT_PUBLIC_SITE_URL (when set to a production domain)
 * 2. process.env.VERCEL_PROJECT_PRODUCTION_URL (auto-populated by Vercel for production alias)
 * 3. process.env.VERCEL_URL (auto-populated by Vercel for preview/branch deployments)
 * 4. Request host header (x-forwarded-host or host)
 * 5. Fallback http://localhost:3000
 */
export function getCanonicalSiteUrlSync(): string {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (envUrl && !envUrl.includes("localhost")) {
    return envUrl.replace(/\/$/, "");
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL.replace(/\/$/, "")}`;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL.replace(/\/$/, "")}`;
  }

  return envUrl || "http://localhost:3000";
}

export async function getCanonicalSiteUrl(): Promise<string> {
  const base = getCanonicalSiteUrlSync();
  if (!base.includes("localhost")) {
    return base;
  }

  try {
    const headerList = await headers();
    const host = headerList.get("x-forwarded-host") || headerList.get("host");
    if (host && !host.includes("localhost")) {
      const proto = headerList.get("x-forwarded-proto") || "https";
      return `${proto}://${host}`;
    }
  } catch {
    // Header access may fail outside request context (e.g., build time)
  }

  return base;
}
