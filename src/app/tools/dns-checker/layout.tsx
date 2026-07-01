import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "DNS Checker: Lookup A, MX, TXT, NS & More Records",
  description:
    "Free online DNS lookup tool. Check any domain's DNS records including A, AAAA, MX, TXT, NS, CNAME, SOA, and PTR records. Diagnose DNS propagation and email delivery issues instantly.",
  canonical: "/tools/dns-checker",
  keywords: [
    "DNS checker",
    "DNS lookup",
    "DNS records",
    "MX record checker",
    "TXT record lookup",
    "DNS propagation checker",
    "NS record checker",
    "CNAME lookup",
  ],
});

export default function DnsCheckerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
