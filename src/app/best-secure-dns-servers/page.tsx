import type { Metadata } from "next";
import Link from "next/link";
import { Link2, Info, Shield, Lock, Wifi, Smartphone, Globe, Settings, RefreshCw, AlertTriangle, ShieldCheck } from "lucide-react";
import TroubleshootingArticleShell from "@/components/tools/TroubleshootingArticleShell";
import { buildMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/lib/seo/schema";
import { APP_URL } from "@/lib/constants";

export const metadata: Metadata = buildMetadata({
  title: "Best Secure DNS Servers: Threat Blocking & Privacy Resolvers (2026)",
  description:
    "Explore the top secure public DNS resolvers. Compare Quad9, CleanBrowsing, Mullvad DNS, and Cloudflare families for malware blocking, ad filtering, and family safety.",
  canonical: "/best-secure-dns-servers",
  keywords: [
    "best secure dns servers",
    "quad9 malware blocking dns",
    "ad blocking public dns",
    "family filter dns resolvers",
    "secure dns over https",
    "mullvad dns privacy",
    "cleanbrowsing filter",
  ],
});

export default async function BestSecureDnsServersPage() {
  const breadcrumbs = [
    { name: "DNS Guides", url: "/best-dns-for-faster-internet" },
    { name: "Best Secure DNS Servers", url: "/best-secure-dns-servers" },
  ];

  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${APP_URL}/best-secure-dns-servers#webpage`,
    "url": `${APP_URL}/best-secure-dns-servers`,
    "name": "Best Secure DNS Servers: Threat Blocking & Privacy Resolvers (2026)",
    "description": "Explore the top secure public DNS resolvers. Compare Quad9, CleanBrowsing, Mullvad DNS, and Cloudflare families for malware blocking, ad filtering, and family safety.",
    "about": {
      "@type": "Thing",
      "name": "Secure DNS",
    },
  };

  const troubleshootingSteps = [
    {
      title: "Evaluate Secure DNS Families Based on Filtering Needs",
      description:
        "Before configuring secure DNS, determine what content you need to block. For general cybersecurity (blocking malware, phishing, and botnets) without restricting standard web browsing, choose Quad9 (9.9.9.9) or Cloudflare's security-only family (1.1.1.2). For home networks with children requiring adult content blocking, select CleanBrowsing Family Filter or Cloudflare Families (1.1.1.3). For advanced ad-blocking, deploy AdGuard DNS or Mullvad's specialized resolvers.",
      tip: "Security-only filters like Quad9 do not interfere with standard web loading speeds and are ideal for smart home IoT devices.",
    },
    {
      title: "Configure the Secure DNS IPs on Your Router",
      description:
        "To protect every device on your network, configure secure DNS at the router level. Log into your router's administration interface (typically 192.168.1.1 or 192.168.0.1). Navigate to WAN or DHCP Server settings. Find the Primary and Secondary DNS fields, overwrite any default ISP configurations with your chosen secure provider's IPs (e.g., entering 9.9.9.9 and 149.112.112.112 for Quad9), and click Apply to reboot the router.",
      tip: "Confirm that your router does not have 'DNS Relay' or 'DNS Forwarding' disabled, which can force clients to fall back to the default ISP settings.",
    },
    {
      title: "Enable Encrypted DNS-over-HTTPS (DoH) Client-Side",
      description:
        "To prevent local eavesdroppers from sniffing your domain queries, encrypt the transmission. On Windows 11, open Settings -> Network & Internet -> Select Wi-Fi/Ethernet -> Edit DNS server assignment. Change to Manual, input the secure DNS IPv4, and select 'Encrypted only (DNS over HTTPS)' under the Preferred DNS encryption dropdown menu.",
    },
  ];

  const faqs = [
    {
      question: "What is a secure DNS server?",
      answer: "A secure DNS server functions like a standard DNS resolver, but includes active filtering capabilities. When your device queries a domain, the secure DNS checks the hostname against a real-time threat database. If the site is flagged for hosting malware, phishing kits, or botnet commands, the resolver blocks the request, returning an NXDOMAIN error or redirecting you to a safe warning page.",
    },
    {
      question: "Is Quad9 (9.9.9.9) safe and private to use?",
      answer: "Yes, Quad9 is one of the most secure and private public resolvers in the world. Operated by a Swiss non-profit foundation, it is subject to strict Swiss privacy laws. Quad9 blocks malicious domains using threat intelligence from over 30 cybersecurity partners, does not log client IP addresses, and does not sell or share user data.",
    },
    {
      question: "Will a secure DNS block ads in mobile apps?",
      answer: "Yes. Using ad-blocking secure DNS resolvers like AdGuard DNS or Mullvad Adblock DNS can block advertisement servers inside mobile applications and web browsers, as they intercept the initial connection requests to advertising CDN domains.",
    },
    {
      question: "Does changing to a secure DNS protect me from hacking?",
      answer: "Changing to secure DNS adds a powerful layer of defense (specifically preventing malware downloads and phishing attacks), but it does not protect against all hacking vectors (like network port scans, unpatched OS vulnerabilities, or malware already running on your device). It should be used alongside active antivirus software and firewalls.",
    },
    {
      question: "Which DNS server is best for family content control?",
      answer: "CleanBrowsing's Family Filter (185.228.168.9 / 185.228.169.9) or Cloudflare's 1.1.1.3 resolver are the best for family control. They block access to adult sites, proxy servers, and VPN bypass tools, and force SafeSearch on Google, Bing, and YouTube.",
    },
  ];

  const commonCauses = [
    {
      title: "ISP DNS Hijacking",
      desc: "Certain ISPs redirect unencrypted DNS queries to their own resolvers using port 53 packet interception, bypassing your custom secure configurations.",
    },
    {
      title: "Decentralized Device Overrides",
      desc: "Individual devices on your network using static IP settings can bypass your router's secure DNS configurations, exposing those devices to threats.",
    },
    {
      title: "Domain Blacklist Latency",
      desc: "New phishing domains can bypass secure DNS filters during the first few hours of existence before threat intelligence databases update the blocklists.",
    },
  ];

  const quickFixChecklist = [
    "Ping your chosen secure DNS IP (such as 9.9.9.9) to verify latency and packet stability.",
    "Configure Quad9 (9.9.9.9) for robust, enterprise-grade threat and malware protection.",
    "Configure CleanBrowsing (185.228.168.9) to establish strict family filters and SafeSearch enforcement.",
    "Enable DNS-over-HTTPS (DoH) or DoT on all web browsers to encrypt query pathways.",
    "Flush your operating system's DNS cache using cmd/terminal after editing your DNS server configurations.",
  ];

  return (
    <>
      <JsonLd data={collectionPageSchema} />
      <TroubleshootingArticleShell
        h1="Best Secure DNS Servers: In-Depth Threat Protection & Privacy Guide"
        intro="Standard public DNS resolvers prioritize raw lookup speed. Secure DNS resolvers, however, place security and user privacy first. This guide reviews the top secure public DNS servers, compares their malware blocking performance, and details how to secure your entire home network."
        category="dns"
        breadcrumbs={breadcrumbs}
        faqs={faqs}
        troubleshootingSteps={troubleshootingSteps}
        warningBanner={{
          title: "Ad-Blocking DNS Coverage Limitation",
          text: "While ad-blocking secure DNS servers effectively block standard banner ads, they cannot block first-party integrated advertisements (such as YouTube video ads, which are served from the same CDN domain as the video stream).",
        }}
        quickFixChecklist={quickFixChecklist}
        commonCauses={commonCauses}
        severityLevel="medium"
        whenToContactISP="If you configure secure DNS and notice that your browser continues to display ads or load blocked malware test pages, your ISP is actively hijacking DNS traffic over port 53. Contact your ISP or enable DoH to bypass port 53 hijacking."
      >
        <div className="space-y-8">
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-[var(--text-primary)]">
              1. Top Secure Public DNS Server Configurations
            </h2>
            <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
              Below is a comparison of the top secure public DNS resolver families, their primary IPs, and filtering characteristics:
            </p>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-[var(--border-subtle)] text-xs text-[var(--text-secondary)]">
                <thead>
                  <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                    <th className="px-4 py-3 text-left">DNS Provider / Family</th>
                    <th className="px-4 py-3 text-left">Primary IP Address</th>
                    <th className="px-4 py-3 text-left">Secondary IP Address</th>
                    <th className="px-4 py-3 text-left">Target Blocking Category</th>
                    <th className="px-4 py-3 text-left">SafeSearch Enforcement</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-subtle)] bg-[var(--bg-surface)]/20">
                  <tr>
                    <td className="px-4 py-3 font-semibold text-[var(--brand-400)]">Quad9 (Recommended Security)</td>
                    <td className="px-4 py-3 font-mono">9.9.9.9</td>
                    <td className="px-4 py-3 font-mono">149.112.112.112</td>
                    <td className="px-4 py-3">Malware, phishing, spyware, botnets</td>
                    <td className="px-4 py-3">No</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-[var(--brand-400)]">Cloudflare Security (1.1.1.2)</td>
                    <td className="px-4 py-3 font-mono">1.1.1.2</td>
                    <td className="px-4 py-3 font-mono">1.0.0.2</td>
                    <td className="px-4 py-3">Malware, phishing threats only</td>
                    <td className="px-4 py-3">No</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-[var(--brand-400)]">Cloudflare Family (1.1.1.3)</td>
                    <td className="px-4 py-3 font-mono">1.1.1.3</td>
                    <td className="px-4 py-3 font-mono">1.0.0.3</td>
                    <td className="px-4 py-3">Malware + Adult content blocking</td>
                    <td className="px-4 py-3">Yes</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-[var(--brand-400)]">CleanBrowsing Family Filter</td>
                    <td className="px-4 py-3 font-mono">185.228.168.9</td>
                    <td className="px-4 py-3 font-mono">185.228.169.9</td>
                    <td className="px-4 py-3">Malware, adult content, proxy bypass</td>
                    <td className="px-4 py-3">Yes (Strict)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-[var(--brand-400)]">Mullvad Adblock DNS</td>
                    <td className="px-4 py-3 font-mono">194.242.2.188</td>
                    <td className="px-4 py-3 font-mono">194.242.2.9</td>
                    <td className="px-4 py-3">Advertisements, tracking servers</td>
                    <td className="px-4 py-3">No</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-bold text-[var(--text-primary)]">
              2. How Secure DNS Blocks Threats (Technical Detail)
            </h2>
            <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed text-justify">
              When a malware payload running on a system attempts to phone home to its Command and Control (C2) server, it queries a domain name (e.g. <code>malicious-c2-botnet.ru</code>). A standard DNS resolver answers with the C2's IP address.
            </p>
            <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed text-justify">
              Under a secure DNS configuration, the query goes to a secure resolver (like Quad9). The resolver checks the domain against its real-time blocklist. If the domain is flagged, the resolver returns <code>0.0.0.0</code> or `NXDOMAIN` (Non-Existent Domain). The botnet client cannot establish a TCP/UDP socket with the C2 server, preventing data exfiltration or secondary payload downloads.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-bold text-[var(--text-primary)]">
              3. Internal Linking Hub
            </h2>
            <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
              Explore more DNS resources and speed diagnostics in our system:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-[var(--border-subtle)] rounded-xl bg-[var(--bg-elevated)] space-y-2">
                <h3 className="text-sm font-bold text-[var(--text-primary)]">Primary DNS Guides</h3>
                <ul className="list-disc pl-5 space-y-1 text-xs text-[var(--text-muted)]">
                  <li>Find the fastest servers: <Link href="/best-dns-for-faster-internet" className="text-[var(--brand-400)] hover:underline">Best DNS for Faster Internet</Link></li>
                  <li>Compare leading providers: <Link href="/google-dns-vs-cloudflare" className="text-[var(--brand-400)] hover:underline">Google DNS vs Cloudflare Guide</Link></li>
                  <li>Optimize console setups: <Link href="/best-dns-for-ps5" className="text-[var(--brand-400)] hover:underline">Best DNS for PS5</Link> and <Link href="/best-dns-for-gaming" className="text-[var(--brand-400)] hover:underline">Best DNS for Gaming</Link></li>
                </ul>
              </div>
              <div className="p-4 border border-[var(--border-subtle)] rounded-xl bg-[var(--bg-elevated)] space-y-2">
                <h3 className="text-sm font-bold text-[var(--text-primary)]">General Diagnostics</h3>
                <ul className="list-disc pl-5 space-y-1 text-xs text-[var(--text-muted)]">
                  <li>Solve DNS server timeouts: <Link href="/dns-server-not-responding" className="text-[var(--brand-400)] hover:underline">DNS Server Not Responding Fix</Link></li>
                  <li>Clear local domain cache: <Link href="/dns-probe-finished-no-internet" className="text-[var(--brand-400)] hover:underline">DNS_PROBE_FINISHED_NO_INTERNET Fix</Link></li>
                  <li>Diagnose packet dropouts: <Link href="/packet-loss-test" className="text-[var(--brand-400)] hover:underline">Packet Loss Diagnostic Test</Link></li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </TroubleshootingArticleShell>
    </>
  );
}
