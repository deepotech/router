import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import GamingToolShell from "@/components/tools/GamingToolShell";
import DnsPropagationCheckerClient from "@/components/tools/DnsPropagationCheckerClient";

export const metadata: Metadata = buildMetadata({
  title: "Global DNS Propagation Checker | Real-Time DNS Lookup — RouterVia",
  description:
    "Check DNS propagation in real-time across major global public resolvers. Test A, AAAA, MX, TXT, CNAME, and NS records instantly.",
  canonical: "/dns-propagation-checker",
  keywords: [
    "dns propagation checker",
    "global dns check",
    "dns propagation tool",
    "dns checker global",
    "real time dns propagation",
    "test dns changes",
  ],
});

const breadcrumbs = [
  { name: "Tools", url: "/dns-lookup" },
  { name: "DNS Propagation Checker", url: "/dns-propagation-checker" },
];

const faqs = [
  {
    question: "Why do DNS updates take so long to propagate globally?",
    answer: "When a DNS record is modified, the new value must be cached by thousands of ISP and public resolvers worldwide. These resolvers hold the old record in their cache for the duration of the Time to Live (TTL) value. Until the TTL expires, they will continue serving the old IP or configuration.",
  },
  {
    question: "How can I speed up DNS propagation during a website migration?",
    answer: "You can speed up propagation by lowering the TTL value of your records to 300 seconds (5 minutes) at least 24 to 48 hours BEFORE you perform the migration. This forces global resolvers to refresh their caches frequently, making the actual switch almost instantaneous.",
  },
  {
    question: "Why does the checker show new records while my browser shows old ones?",
    answer: "Your local computer operating system and your web browser maintain their own DNS caches to optimize page load speeds. If our checker shows the updated record across global servers but you still see the old site, you need to flush your local DNS cache and restart your browser.",
  },
];

export default function DnsPropagationCheckerPage() {
  return (
    <GamingToolShell
      h1="Global DNS Propagation Checker"
      intro="Check the propagation status of your updated hostnames and DNS records. Our utility bypasses browser caching to query the world's leading recursive DNS clusters in real-time, displaying exact values."
      toolType="dns-propagation"
      breadcrumbs={breadcrumbs}
      faqs={faqs}
    >
      <DnsPropagationCheckerClient />
    </GamingToolShell>
  );
}
