import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import TroubleshootingArticleShell from "@/components/tools/TroubleshootingArticleShell";
import ConnectionOptimizerClient from "@/components/tools/ConnectionOptimizerClient";

export const metadata: Metadata = buildMetadata({
  title: "DNS Server Not Responding? How to Fix DNS Errors — RouterVia",
  description:
    "Is your browser showing DNS server not responding? Learn how to flush DNS, configure public DNS like Cloudflare and Google, and resolve DNS lookup failures on Windows and macOS.",
  canonical: "/dns-server-not-responding",
  keywords: [
    "dns server not responding",
    "dns issues",
    "internet dns error",
    "dns lookup failed",
    "flush dns cache command",
    "cloudflare public dns setup",
    "how to change dns servers"
  ],
});

const breadcrumbs = [
  { name: "DNS Optimization", url: "/best-dns-for-gaming" },
  { name: "DNS Server Not Responding", url: "/dns-server-not-responding" },
];

const troubleshootingSteps = [
  {
    title: "Flush the Local DNS Resolver Cache",
    description: "On Windows, open Command Prompt as Administrator and run: 'ipconfig /flushdns'. On macOS, open Terminal and run 'sudo killall -HUP mDNSResponder'. This clears outdated mapping database records.",
    tip: "Clearing the cache forces your operating system to request fresh network records instead of relying on stale cache files."
  },
  {
    title: "Configure High-Performance Public DNS Servers",
    description: "Access your router settings page or open your device's network adapter settings. Change DNS from Automatic to manual. Set Primary DNS to '1.1.1.1' (Cloudflare) and Secondary to '8.8.8.8' (Google).",
    tip: "Public DNS servers are updated instantly, have massive cache pools, and avoid ISP logging and tracking blocks."
  },
  {
    title: "Release and Renew Your IP Address Lease",
    description: "In the same command prompt window, type 'ipconfig /release' to release the current IP details, and then 'ipconfig /renew' to pull a fresh configuration and default gateway route from the router.",
  },
  {
    title: "Disable IPv6 Settings on the Adapter",
    description: "Open Network and Sharing Center -> Change Adapter Settings. Right-click your active connection, click Properties, and uncheck 'Internet Protocol Version 6 (TCP/IPv6)'. Save and restart the computer.",
    tip: "Some routers do not map IPv6 DNS routes properly, causing lookup requests to time out before falling back to IPv4."
  }
];

const faqs = [
  {
    question: "What does 'DNS Server Not Responding' mean?",
    answer: "This error indicates that your device successfully connected to the local router, but the DNS server (domain name book resolver) is failing to translate web addresses (like google.com) into numeric IP addresses that routing equipment understands."
  },
  {
    question: "Can an antivirus firewall block DNS lookups?",
    answer: "Yes, active web protection layers or VPN tunnels create custom network adapters. If these adapters freeze or if the firewall blocks outgoing UDP packets on Port 53, your computer will fail to resolve hostnames."
  },
  {
    question: "Is public DNS safe to use?",
    answer: "Yes. Large public DNS networks like Cloudflare (1.1.1.1) and Google (8.8.8.8) are safe, run advanced security features to block malicious domains, and respect user privacy by erasing logs within 24 hours."
  }
];

export default function DnsServerNotRespondingPage() {
  return (
    <TroubleshootingArticleShell
      h1="How to Fix 'DNS Server Not Responding' Errors"
      intro="If your web browser fails to resolve web addresses or reports that your DNS server is offline, follow our step-by-step diagnostic workflow to clear your cache, assign public resolvers, and bypass ISP network issues."
      category="dns"
      breadcrumbs={breadcrumbs}
      faqs={faqs}
      troubleshootingSteps={troubleshootingSteps}
    >
      <div className="space-y-6">
        <ConnectionOptimizerClient mode="dns-fix" />

        <article className="prose prose-invert max-w-none space-y-4 text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
          <h2 className="text-sm font-bold text-[var(--text-primary)]">Understanding DNS Mappings and Browser Lookups</h2>
          <p>
            The Domain Name System (DNS) operates as the telephone directory of the Internet. Every time you enter a URL, your computer initiates a network query on UDP Port 53. By default, your router routes this request to your Internet Service Provider's local DNS servers.
          </p>
          <p>
            When these ISP servers get overloaded or crash, your browser will display errors like <em>DNS_PROBE_FINISHED_NXDOMAIN</em>. Changing your settings to global public resolvers overrides these unreliable servers, speeding up web navigation and ensuring constant access.
          </p>
          <div className="p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-2">
            <span className="font-bold text-[var(--text-primary)] block text-xs">Recommended Tools & Quick Links</span>
            <ul className="list-disc pl-4 space-y-1 text-[11px]">
              <li>Test live name server propagation across our <a href="/dns-propagation-checker" className="text-[var(--brand-400)] hover:underline">Global DNS Propagation Checker</a>.</li>
              <li>Read how to optimize console ping with the <a href="/best-dns-for-gaming" className="text-[var(--brand-400)] hover:underline">Best DNS for Gaming Setup</a>.</li>
              <li>Verify if your DNS configuration is leaking using the <a href="/dns-lookup" className="text-[var(--brand-400)] hover:underline">DNS Lookup Tool</a>.</li>
              <li>Is your router gateway offline? Check how to access the <a href="/ips/192-168-1-1" className="text-[var(--brand-400)] hover:underline">192.168.1.1 Gateway Panel</a>.</li>
            </ul>
          </div>
        </article>
      </div>
    </TroubleshootingArticleShell>
  );
}
