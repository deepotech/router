import { NextRequest, NextResponse } from "next/server";
import dns from "dns/promises";

export async function GET(request: NextRequest) {
  const domain = request.nextUrl.searchParams.get("domain");

  if (!domain) {
    return NextResponse.json({ error: "Missing domain parameter" }, { status: 400 });
  }

  // Basic sanitisation
  const clean = domain.trim().replace(/^https?:\/\//, "").split("/")[0];

  try {
    const addresses = await dns.resolve4(clean);
    return NextResponse.json({
      domain: clean,
      resolved: true,
      ip: addresses[0],
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "DNS resolution failed";
    return NextResponse.json({
      domain: clean,
      resolved: false,
      error: message,
    });
  }
}
