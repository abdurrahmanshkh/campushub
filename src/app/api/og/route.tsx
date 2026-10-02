import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") || "Build Your First AI Project in 60 Minutes";
  const college = searchParams.get("college");
  const club = searchParams.get("club");
  const isPartner = searchParams.get("type") === "partner" || Boolean(college);

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0B1220",
          padding: "60px 80px",
          fontFamily: "sans-serif",
          color: "#FFFFFF",
          position: "relative",
        }}
      >
        {/* Subtle grid background accent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: "radial-gradient(rgba(220, 225, 232, 0.12) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            opacity: 0.8,
          }}
        />

        {/* Top Header Bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            zIndex: 10,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <span
              style={{
                fontSize: "28px",
                fontWeight: 800,
                letterSpacing: "-0.5px",
                color: "#FFFFFF",
              }}
            >
              BUILD<span style={{ color: "#3B82F6" }}>60</span>
            </span>
            <span
              style={{
                fontSize: "14px",
                color: "#687386",
                textTransform: "uppercase",
                letterSpacing: "1.5px",
                paddingLeft: "16px",
                borderLeft: "1px solid rgba(220, 225, 232, 0.2)",
              }}
            >
              Campus Growth Hub
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "rgba(37, 99, 235, 0.15)",
              border: "1px solid rgba(37, 99, 235, 0.4)",
              borderRadius: "6px",
              padding: "6px 14px",
              fontSize: "13px",
              color: "#93C5FD",
              fontWeight: 600,
              letterSpacing: "0.5px",
            }}
          >
            FREE LIVE WORKSHOP
          </div>
        </div>

        {/* Main Content Area */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            zIndex: 10,
            maxWidth: "960px",
          }}
        >
          {isPartner && college ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "20px",
                color: "#C7F36B",
                fontWeight: 600,
                letterSpacing: "0.5px",
              }}
            >
              CAMPUS SPRINT AT {college.toUpperCase()}
            </div>
          ) : null}

          <div
            style={{
              fontSize: isPartner ? "52px" : "56px",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-1.5px",
              color: "#F7F7F3",
            }}
          >
            {title}
          </div>

          {isPartner && club ? (
            <div
              style={{
                fontSize: "22px",
                color: "#94A3B8",
                fontWeight: 500,
              }}
            >
              Hosted in collaboration with <span style={{ color: "#FFFFFF", fontWeight: 600 }}>{club}</span>
            </div>
          ) : (
            <div
              style={{
                fontSize: "22px",
                color: "#94A3B8",
                lineHeight: 1.4,
              }}
            >
              Hands-on project sprint designed for final-year engineering students.
            </div>
          )}
        </div>

        {/* Bottom Metadata & Disclaimer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            width: "100%",
            borderTop: "1px solid rgba(220, 225, 232, 0.15)",
            paddingTop: "24px",
            zIndex: 10,
          }}
        >
          <div style={{ display: "flex", gap: "28px", color: "#CBD5E1", fontSize: "16px", fontWeight: 500 }}>
            <span>• 60-Minute Build</span>
            <span>• 100% Free</span>
            <span>• Live Online</span>
            <span>• Working Project</span>
          </div>

          <div
            style={{
              fontSize: "12px",
              color: "#64748B",
              fontFamily: "monospace",
              letterSpacing: "0.5px",
            }}
          >
            A Growth Challenge Concept for NxtWave
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
