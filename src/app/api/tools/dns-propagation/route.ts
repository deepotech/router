import { NextRequest, NextResponse } from "next/server";
import { Resolver } from "dns/promises";

type RecordType = "A" | "AAAA" | "MX" | "TXT" | "NS" | "CNAME";
const VALID_TYPES: RecordType[] = ["A", "AAAA", "MX", "TXT", "NS", "CNAME"];

const RESOLVERS = [
  { name: "Cloudflare", ip: "1.1.1.1", location: "Global" },
  { name: "Google Public DNS", ip: "8.8.8.8", location: "Global" },
  { name: "Quad9", ip: "9.9.9.9", location: "Switzerland" },
  { name: "OpenDNS", ip: "208.67.222.222", location: "Global" },
  { name: "CleanBrowsing", ip: "185.228.168.9", location: "Global" },
  { name: "Level3 (Lumen)", ip: "4.2.2.2", location: "United States" },
  { name: "DNS.Watch", ip: "84.200.69.80", location: "Germany" },
  { name: "Comodo Secure DNS", ip: "8.26.56.26", location: "Global" },
];

async function resolveWithTimeout(resolver: Resolver, domain: string, type: RecordType, timeoutMs: number): Promise<unknown> {
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Timeout")), timeoutMs)
  );

  let queryPromise: Promise<unknown>;
  switch (type) {
    case "A":
      queryPromise = resolver.resolve4(domain);
      break;
    case "AAAA":
      queryPromise = resolver.resolve6(domain);
      break;
    case "MX":
      queryPromise = resolver.resolveMx(domain);
      break;
    case "TXT":
      queryPromise = resolver.resolveTxt(domain);
      break;
    case "NS":
      queryPromise = resolver.resolveNs(domain);
      break;
    case "CNAME":
      queryPromise = resolver.resolveCname(domain);
      break;
  }

  return Promise.race([queryPromise, timeoutPromise]);
}

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

  const results = await Promise.all(
    RESOLVERS.map(async (r) => {
      try {
        const resolver = new Resolver();
        resolver.setServers([r.ip]);
        const records = await resolveWithTimeout(resolver, clean, type, 3000);

        return {
          resolver: r.name,
          ip: r.ip,
          location: r.location,
          resolved: true,
          records,
        };
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "DNS resolution failed";
        return {
          resolver: r.name,
          ip: r.ip,
          location: r.location,
          resolved: false,
          error: message,
        };
      }
    })
  );

  return NextResponse.json({
    domain: clean,
    type,
    results,
  });
}
