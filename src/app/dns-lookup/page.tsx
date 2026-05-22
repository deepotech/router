import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import NetworkingToolShell from "@/components/tools/NetworkingToolShell";
import DNSLookupClient from "@/components/tools/DNSLookupClient";

export const metadata: Metadata = buildMetadata({
  title: "DNS Lookup Tool | Check Domain DNS Records — RouterVia",
  description:
    "Instantly resolve A, AAAA, MX, TXT, NS, and CNAME DNS records for any domain using our secure and comprehensive DNS lookup tool.",
  canonical: "/dns-lookup",
  keywords: [
    "dns lookup",
    "check dns records",
    "dns record lookup",
    "nslookup online",
    "resolve mx records",
    "txt records checker",
    "routervia dns tool",
  ],
});

const breadcrumbs = [
  { name: "Tools", url: "/tools" },
  { name: "DNS Lookup", url: "/dns-lookup" },
];

const faqs = [
  {
    question: "What is a DNS record?",
    answer: "A DNS (Domain Name System) record is a database instruction residing on authoritative name servers. It provides critical mapping instructions that tell recursive resolvers which IP address or mail server is associated with a domain name.",
  },
  {
    question: "How long does it take for DNS changes to propagate?",
    answer: "DNS propagation can take anywhere from a few minutes to 48 hours globally. This timeline is controlled by the TTL (Time to Live) value set on each record. Lower TTL values speed up propagation, while higher TTL values optimize server load by caching responses longer.",
  },
  {
    question: "What is an MX record and why is it important?",
    answer: "An MX (Mail Exchange) record directs incoming emails sent to your domain to the correct mail server. Without properly configured MX records, mail servers cannot determine where to deliver messages, resulting in bounced emails.",
  },
  {
    question: "What is the difference between A and AAAA records?",
    answer: "An A record maps a domain or hostname to a 32-bit IPv4 address (e.g., 192.0.2.1), while a AAAA record maps it to a 128-bit IPv6 address (e.g., 2001:db8::1). Both serve the exact same function but cater to different IP protocol standards.",
  },
];

export default function DnsLookupPage() {
  return (
    <NetworkingToolShell
      h1="DNS Lookup Tool"
      intro="Instantly resolve A, AAAA, MX, TXT, NS, and CNAME DNS records for any domain using our secure and comprehensive DNS lookup tool."
      toolType="dns"
      breadcrumbs={breadcrumbs}
      faqs={faqs}
    >
      <DNSLookupClient />
    </NetworkingToolShell>
  );
}
