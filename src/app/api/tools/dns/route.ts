import { NextRequest, NextResponse } from "next/server";
import dns from "dns/promises";

type RecordType = "A" | "AAAA" | "MX" | "TXT" | "NS" | "CNAME";
const VALID_TYPES: RecordType[] = ["A", "AAAA", "MX", "TXT", "NS", "CNAME"];

export async function GET(request: NextRequest) {
  const domain = request.nextUrl.searchParams.get("domain");
  const rawType = (request.nextUrl.searchParams.get("type") ?? "A").toUpperCase();
  const type: RecordType = VALID_TYPES.includes(rawType as RecordType)
    ? (rawType as RecordType)
    : "A";

  if (!domain) {
    return NextResponse.json({ error: "Missing domain parameter" }, { status: 400 });
  }

  // Basic sanitisation
  const clean = domain.trim().replace(/^https?:\/\//, "").split("/")[0];

  try {
    let records: unknown;

    switch (type) {
      case "A":    records = await dns.resolve4(clean); break;
      case "AAAA": records = await dns.resolve6(clean); break;
      case "MX":   records = await dns.resolveMx(clean); break;
      case "TXT":  records = await dns.resolveTxt(clean); break;
      case "NS":   records = await dns.resolveNs(clean); break;
      case "CNAME":records = await dns.resolveCname(clean); break;
    }

    const aRecords = type === "A" ? (records as string[]) : [];

    return NextResponse.json({
      domain: clean,
      type,
      resolved: true,
      records,
      // Backward-compatible field expected by /tools/dns-checker
      ip: type === "A" && aRecords.length > 0 ? aRecords[0] : undefined,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "DNS resolution failed";
    return NextResponse.json({
      domain: clean,
      type,
      resolved: false,
      error: message,
    });
  }
}
