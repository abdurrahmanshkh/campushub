import { NextRequest, NextResponse } from "next/server";
import QRCode from "qrcode";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const rawUrl = searchParams.get("url");
  const format = searchParams.get("format") || "png";

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const targetUrl = rawUrl || (code ? `${siteUrl}/r/${encodeURIComponent(code)}` : `${siteUrl}/workshop`);

  try {
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
          "Cache-Control": "public, max-age=86400, stale-while-revalidate=43200",
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
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=43200",
      },
    });
  } catch (error) {
    console.error("QR generation error:", error);
    return new NextResponse("Failed to generate QR code", { status: 500 });
  }
}
