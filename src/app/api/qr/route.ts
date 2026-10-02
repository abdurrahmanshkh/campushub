import { NextRequest, NextResponse } from "next/server";
import QRCode from "qrcode";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const rawUrl = searchParams.get("url");
  const format = searchParams.get("format") || "png";

  // Priority order for resolving base site URL:
  // 1. Explicit rawUrl query param (highest specificity)
  // 2. process.env.NEXT_PUBLIC_SITE_URL (if configured and not localhost)
  // 3. Vercel production or deployment domain
  // 4. Request host headers (works transparently for build60.vercel.app or custom domains)
  // 5. Fallback localhost
  let targetUrl = rawUrl;

  if (!targetUrl) {
    let siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

    if (!siteUrl || siteUrl.includes("localhost")) {
      if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
        siteUrl = `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
      } else if (process.env.VERCEL_URL) {
        siteUrl = `https://${process.env.VERCEL_URL}`;
      } else {
        const host = request.headers.get("x-forwarded-host") || request.headers.get("host");
        if (host && !host.includes("localhost")) {
          const proto = request.headers.get("x-forwarded-proto") || "https";
          siteUrl = `${proto}://${host}`;
        }
      }
    }

    siteUrl = (siteUrl || "http://localhost:3000").replace(/\/$/, "");
    targetUrl = code ? `${siteUrl}/r/${encodeURIComponent(code)}` : `${siteUrl}/workshop`;
  }

  try {
    const cacheControl = targetUrl.includes("localhost")
      ? "no-store, no-cache, must-revalidate"
      : "public, max-age=3600, stale-while-revalidate=86400";

    if (format === "svg") {
      const svg = await QRCode.toString(targetUrl, {
        type: "svg",
        margin: 2,
        color: {
          dark: "#0B1220",
          light: "#FFFFFF",
        },
        errorCorrectionLevel: "H",
      });

      return new NextResponse(svg, {
        headers: {
          "Content-Type": "image/svg+xml",
          "Cache-Control": cacheControl,
        },
      });
    }

    // Default to PNG
    const pngBuffer = await QRCode.toBuffer(targetUrl, {
      type: "png",
      width: 512,
      margin: 2,
      color: {
        dark: "#0B1220",
        light: "#FFFFFF",
      },
      errorCorrectionLevel: "H",
    });

    return new NextResponse(Uint8Array.from(pngBuffer), {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": cacheControl,
      },
    });
  } catch (error) {
    console.error("QR generation error:", error);
    return new NextResponse("Failed to generate QR code", { status: 500 });
  }
}
