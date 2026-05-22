import { NextRequest, NextResponse } from "next/server";

// =============================================================
// MAC Address Vendor Lookup — uses macvendors.com public API
// =============================================================

export async function GET(request: NextRequest) {
  const mac = request.nextUrl.searchParams.get("mac");

  if (!mac) {
    return NextResponse.json({ error: "Missing mac parameter" }, { status: 400 });
  }

  // Strip separators, uppercase, keep hex chars only
  const clean = mac.trim().replace(/[^A-Fa-f0-9]/g, "").toUpperCase();

  if (clean.length < 6) {
    return NextResponse.json({ error: "Invalid MAC address — need at least 6 hex characters" }, { status: 400 });
  }

  // Format OUI as XX:XX:XX for the API
  const oui = clean.slice(0, 6).match(/.{2}/g)!.join(":");

  try {
    const res = await fetch(`https://api.macvendors.com/${encodeURIComponent(oui)}`, {
      headers: { Accept: "text/plain" },
      signal: AbortSignal.timeout(6000),
    });

    if (res.status === 404) {
      return NextResponse.json({ mac: oui, vendor: null, found: false });
    }

    if (!res.ok) {
      throw new Error(`Upstream API error: ${res.status}`);
    }

    const vendor = (await res.text()).trim();
    return NextResponse.json({ mac: oui, vendor, found: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Lookup failed";
    return NextResponse.json({ mac: oui, vendor: null, found: false, error: message });
  }
}
