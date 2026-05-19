import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    
    // Fallbacks if params are missing
    const brand = searchParams.get("brand") || "RouterVia";
    const model = searchParams.get("model") || "Router Guide";
    const type = searchParams.get("type") || "Setup & Login Guide";

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            backgroundColor: "#030712", // gray-950
            backgroundImage: "radial-gradient(circle at 25px 25px, #1f2937 2%, transparent 0%), radial-gradient(circle at 75px 75px, #1f2937 2%, transparent 0%)",
            backgroundSize: "100px 100px",
            fontFamily: "sans-serif",
            padding: "80px",
          }}
        >
          {/* Top Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span
                style={{
                  color: "#0ea5e9", // sky-500
                  fontSize: 32,
                  fontWeight: 800,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  marginBottom: 16,
                }}
              >
                {type}
              </span>
              <h1
                style={{
                  fontSize: 72,
                  fontWeight: 900,
                  color: "#ffffff",
                  lineHeight: 1.1,
                  margin: 0,
                  maxWidth: "900px",
                }}
              >
                {brand} {model}
              </h1>
            </div>
            
            {/* Logo area */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(to bottom right, #0ea5e9, #6366f1)",
                width: 100,
                height: 100,
                borderRadius: 24,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.5)",
              }}
            >
              <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12.55a11 11 0 0 1 14.08 0" />
                <path d="M1.42 9a16 16 0 0 1 21.16 0" />
                <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
                <line x1="12" y1="20" x2="12" y2="20" />
              </svg>
            </div>
          </div>

          {/* Bottom Footer */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: "#0ea5e9" }} />
              <span style={{ fontSize: 32, color: "#9ca3af", fontWeight: 600 }}>
                Default IPs
              </span>
              <div style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: "#6366f1", marginLeft: 20 }} />
              <span style={{ fontSize: 32, color: "#9ca3af", fontWeight: 600 }}>
                Admin Passwords
              </span>
            </div>
            <div style={{ fontSize: 36, fontWeight: 800, color: "#ffffff" }}>
              RouterVia<span style={{ color: "#0ea5e9" }}>.AI</span>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: unknown) {
    console.error("Failed to generate OG image", e);
    return new Response("Failed to generate image", { status: 500 });
  }
}
