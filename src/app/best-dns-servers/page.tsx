import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import TroubleshootingArticleShell from "@/components/tools/TroubleshootingArticleShell";
import { JsonLd } from "@/lib/seo/schema";
import { APP_URL } from "@/lib/constants";
import {
  Shield,
  Zap,
  Globe,
  Lock,
  Eye,
  EyeOff,
  Server,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
} from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "Best DNS Servers 2026 — Fastest & Most Secure Public DNS",
  description:
    "Complete directory of the best public DNS servers in 2026. Compare Cloudflare, Google DNS, Quad9, OpenDNS, CleanBrowsing, and AdGuard DNS by speed, privacy, and security. Setup instructions for Windows, Mac, Android, iOS, and routers.",
  canonical: "/best-dns-servers",
  keywords: [
    "best dns servers",
    "fastest dns server",
    "public dns servers",
    "free dns servers",
    "cloudflare dns",
    "google dns",
    "quad9 dns",
    "opendns",
    "adguard dns",
    "cleanbrowsing dns",
    "dns server list",
    "secure dns",
    "private dns",
    "dns comparison 2026",
  ],
});

const breadcrumbs = [
  { name: "DNS", url: "/dns" },
  { name: "Best DNS Servers", url: "/best-dns-servers" },
];

const troubleshootingSteps = [
  {
    title: "Identify Your Current DNS Resolver",
    description:
      "Before switching, know which DNS you are currently using. On Windows, open Command Prompt and run ipconfig /all — look for 'DNS Servers' under your active network adapter. On macOS or Linux run: cat /etc/resolv.conf. If you see your router's IP (like 192.168.1.1), you're using your router's default DNS forwarding.",
    tip: "Run: nslookup -type=txt whoami.ds.akahelp.net to see your actual upstream resolver IP.",
  },
  {
    title: "Choose a DNS Server for Your Use Case",
    description:
      "Different DNS resolvers are optimized for different priorities. Cloudflare 1.1.1.1 is the fastest globally. Google 8.8.8.8 has the widest cache. Quad9 9.9.9.9 blocks malware. OpenDNS offers parental controls. AdGuard DNS blocks ads. CleanBrowsing filters adult content. Match the resolver to your needs.",
    tip: "For gaming and general browsing: Cloudflare (1.1.1.1). For family networks: CleanBrowsing or OpenDNS. For security-first: Quad9.",
  },
  {
    title: "Configure DNS on Your Device or Router",
    description:
      "You can change DNS at two levels: individual device (affects only that device) or router (affects your entire network). Router-level configuration is recommended for households with many devices. Log in to your router admin panel (e.g. 192.168.1.1), find the DNS settings under WAN or DHCP, and enter the primary and secondary addresses.",
    tip: "Always configure both primary AND secondary DNS addresses for automatic failover if one server experiences an outage.",
  },
  {
    title: "Verify DNS Change Took Effect",
    description:
      "After changing DNS settings, flush your OS DNS cache and verify the change. On Windows: ipconfig /flushdns then nslookup google.com. On macOS: sudo killall -HUP mDNSResponder then dig google.com. The response server should now match your new DNS provider's IP.",
    tip: "Use DNS leak test tools (dnsleaktest.com) to verify your DNS queries are going to the correct resolver and not leaking to your ISP.",
  },
];

const faqs = [
  {
    question: "What is the fastest DNS server in 2026?",
    answer:
      "Cloudflare DNS (1.1.1.1) is consistently the fastest public DNS resolver globally, with an average query response time of 11–13ms according to DNSPerf benchmarks. Google DNS (8.8.8.8) is a close second at around 20ms. Both are significantly faster than most ISP-provided DNS servers, which average 50–100ms.",
  },
  {
    question: "Is changing your DNS server safe?",
    answer:
      "Yes, changing your DNS server to a reputable public resolver is completely safe. Companies like Cloudflare, Google, and Quad9 operate DNS infrastructure with enterprise-grade security. In fact, it is often safer than using your ISP's DNS, which may log your queries and lack protection against DNS hijacking.",
  },
  {
    question: "Does changing DNS improve internet speed?",
    answer:
      "Changing DNS does not increase your download bandwidth, but it reduces DNS lookup latency — the time your browser takes to resolve a domain before loading it. On sites that pull resources from many domains, this can make browsing noticeably snappier. Cloudflare (1.1.1.1) can reduce lookup times by 50–80% compared to slow ISP DNS.",
  },
  {
    question: "What is the best DNS for privacy?",
    answer:
      "Cloudflare (1.1.1.1) is the top privacy-focused public resolver. It deletes all transaction logs within 24 hours and supports DNS-over-HTTPS (DoH) and DNS-over-TLS (DoT) by default. Quad9 (9.9.9.9) is operated by a Swiss non-profit and never logs personal data. AdGuard DNS and CleanBrowsing also have strict no-logs policies.",
  },
  {
    question: "What is the difference between primary and secondary DNS?",
    answer:
      "The primary DNS server is queried first for every lookup. The secondary DNS is only queried if the primary fails to respond within the timeout period. Having both configured provides automatic failover, ensuring DNS resolution continues even if one server experiences an outage. Always configure both.",
  },
  {
    question: "Can I use different DNS servers on different devices?",
    answer:
      "Yes. You can configure DNS per-device in network adapter settings (Windows, macOS, Linux, Android, iOS) or configure DNS at the router level to apply to all devices on your home network. Router-level DNS settings override per-device settings unless the device has its own DNS configured.",
  },
  {
    question: "What is DNS-over-HTTPS (DoH)?",
    answer:
      "DNS-over-HTTPS (DoH) encrypts your DNS queries by wrapping them inside standard HTTPS traffic on port 443. This prevents ISPs, network admins, and attackers from seeing which websites you are looking up. Most modern browsers (Chrome, Firefox, Edge) support DoH. All major public DNS providers support DoH endpoints.",
  },
  {
    question: "Should I change DNS on my router or on my device?",
    answer:
      "Changing DNS at the router level is more efficient — it applies to every device on your home network without individual configuration. This is the recommended approach for families. However, if your ISP's router restricts DNS changes, configure DNS on each device individually. Mobile devices benefit from per-device DNS when on cellular networks.",
  },
];

const quickFixChecklist = [
  "Note your current DNS servers (run ipconfig /all on Windows) before changing",
  "Choose a DNS provider based on your priority: speed, privacy, security, or filtering",
  "Configure DNS at the router level for whole-network coverage",
  "Enter both primary AND secondary addresses for failover",
  "Flush your DNS cache after changing settings (ipconfig /flushdns on Windows)",
  "Run a DNS leak test to verify queries are reaching the new provider",
];

const commonCauses = [
  {
    title: "Slow ISP DNS Resolvers",
    desc: "Default ISP-assigned DNS servers are often congested and slow, adding unnecessary latency to every website lookup.",
  },
  {
    title: "Lack of DNS Encryption",
    desc: "Standard ISP DNS uses unencrypted UDP port 53, exposing browsing queries to third-party monitoring and hijacking.",
  },
  {
    title: "No Malware Filtering",
    desc: "ISP DNS resolvers do not block queries to known malicious or phishing domains, leaving devices vulnerable.",
  },
  {
    title: "ISP DNS Logging",
    desc: "Many ISPs log DNS queries for advertising profiling and data monetization, compromising user privacy.",
  },
];

// ─── DNS Resolver Data ────────────────────────────────────────────────────────

const resolvers = [
  {
    id: "cloudflare",
    name: "Cloudflare DNS",
    primary: "1.1.1.1",
    secondary: "1.0.0.1",
    primaryV6: "2606:4700:4700::1111",
    secondaryV6: "2606:4700:4700::1001",
    doh: "https://cloudflare-dns.com/dns-query",
    dot: "one.one.one.one",
    speed: "11ms",
    speedRank: 1,
    privacy: "Excellent",
    privacyNotes: "Logs deleted within 24h. Audited by KPMG.",
    security: "DNSSEC + DoH + DoT",
    filtering: "None (1.1.1.1) / Malware (1.1.1.2) / Malware+Adult (1.1.1.3)",
    operator: "Cloudflare, Inc. (USA)",
    color: "orange",
    tag: "Fastest + Privacy",
    tagColor: "text-orange-400",
    borderColor: "border-orange-900/30",
    bgColor: "bg-orange-950/5",
    description:
      "Cloudflare launched 1.1.1.1 on April 1, 2018 and rapidly became the world's fastest public DNS resolver. Its Anycast network spans 300+ data centers across every continent, routing each query to the nearest edge node. Cloudflare's privacy policy is market-leading: all transaction logs are purged within 24 hours and independently audited annually by KPMG. For families, Cloudflare also offers 1.1.1.2 (blocks malware) and 1.1.1.3 (blocks malware and adult content).",
    pros: ["Globally fastest (11ms average)", "KPMG-audited privacy", "Free DoH and DoT", "Family filter variants"],
    cons: ["US-based jurisdiction", "No customizable filtering without Cloudflare Gateway"],
  },
  {
    id: "google",
    name: "Google Public DNS",
    primary: "8.8.8.8",
    secondary: "8.8.4.4",
    primaryV6: "2001:4860:4860::8888",
    secondaryV6: "2001:4860:4860::8844",
    doh: "https://dns.google/dns-query",
    dot: "dns.google",
    speed: "20ms",
    speedRank: 2,
    privacy: "Good",
    privacyNotes: "Logs anonymized after 24–48h. No personal data retained.",
    security: "DNSSEC + DoH + DoT",
    filtering: "None",
    operator: "Google LLC (USA)",
    color: "blue",
    tag: "Most Reliable",
    tagColor: "text-blue-400",
    borderColor: "border-blue-900/30",
    bgColor: "bg-blue-950/5",
    description:
      "Google Public DNS, launched in December 2009, is the most widely used DNS resolver in the world by query volume. It maintains a massive global cache, giving it extremely high cache hit rates for popular domains. Google DNS supports EDNS Client Subnet (ECS), which shares a portion of your IP with content delivery networks (CDNs) to route media streams from Netflix, YouTube, and Spotify to the nearest caching nodes — improving streaming quality. Logs are anonymized within 48 hours.",
    pros: ["Highest global cache hit rate", "EDNS Client Subnet for CDN optimization", "Unmatched reliability (99.999% SLA)", "Excellent IPv6 support"],
    cons: ["Google data practices (privacy-aware users may prefer Cloudflare)", "Slightly slower than Cloudflare"],
  },
  {
    id: "quad9",
    name: "Quad9",
    primary: "9.9.9.9",
    secondary: "149.112.112.112",
    primaryV6: "2620:fe::fe",
    secondaryV6: "2620:fe::9",
    doh: "https://dns.quad9.net/dns-query",
    dot: "dns.quad9.net",
    speed: "15ms",
    speedRank: 3,
    privacy: "Excellent",
    privacyNotes: "No logging of IPs. Swiss-based non-profit. GDPR compliant.",
    security: "DNSSEC + Threat Blocking + DoH + DoT",
    filtering: "Malware blocking via 20+ threat intelligence feeds",
    operator: "Quad9 Foundation (Switzerland)",
    color: "purple",
    tag: "Best Security",
    tagColor: "text-purple-400",
    borderColor: "border-purple-900/30",
    bgColor: "bg-purple-950/5",
    description:
      "Quad9 is operated by the Quad9 Foundation, a Swiss non-profit cybersecurity organization. It automatically blocks DNS queries to known malicious domains using threat intelligence aggregated from over 20 cybersecurity partners including IBM X-Force, Proofpoint, and Secureworks. If your device attempts to resolve a phishing site or malware distribution domain, Quad9 blocks the resolution before any connection is made — providing a transparent security layer with no software installation required. Swiss jurisdiction provides GDPR compliance by default.",
    pros: ["Automatic malware domain blocking", "Swiss jurisdiction (strong privacy laws)", "No personal data logging", "Free for personal and commercial use"],
    cons: ["Slightly aggressive filtering may block legitimate domains", "Slightly slower than Cloudflare"],
  },
  {
    id: "opendns",
    name: "OpenDNS",
    primary: "208.67.222.222",
    secondary: "208.67.220.220",
    primaryV6: "2620:119:35::35",
    secondaryV6: "2620:119:53::53",
    doh: "https://doh.opendns.com/dns-query",
    dot: "dns.umbrella.com",
    speed: "25ms",
    speedRank: 4,
    privacy: "Moderate",
    privacyNotes: "Logs queries for filtering. Free tier data used for analytics.",
    security: "DNSSEC + Content Filtering",
    filtering: "Customizable category-based web filtering (free account required)",
    operator: "Cisco Systems (USA)",
    color: "amber",
    tag: "Best Filtering",
    tagColor: "text-amber-400",
    borderColor: "border-amber-900/30",
    bgColor: "bg-amber-950/5",
    description:
      "OpenDNS, now owned by Cisco, was one of the first public DNS providers and pioneered customizable content filtering. By creating a free OpenDNS account and linking it to your home IP address, you can configure category-based filtering (blocking adult content, gambling, social media, etc.) across your entire network. This makes OpenDNS particularly popular for family home networks and schools. Cisco Umbrella (enterprise version) offers advanced threat intelligence used by Fortune 500 companies.",
    pros: ["Customizable content category filtering", "Parental control features", "Anti-phishing protection", "Long-established and reliable"],
    cons: ["Free tier logs queries (privacy tradeoff)", "Requires account for custom filtering", "Slower than Cloudflare/Quad9"],
  },
  {
    id: "cleanbrowsing",
    name: "CleanBrowsing",
    primary: "185.228.168.9",
    secondary: "185.228.169.9",
    primaryV6: "2a0d:2a00:1::2",
    secondaryV6: "2a0d:2a00:2::2",
    doh: "https://doh.cleanbrowsing.org/doh/family-filter/",
    dot: "family-filter-dns.cleanbrowsing.org",
    speed: "30ms",
    speedRank: 5,
    privacy: "Good",
    privacyNotes: "Minimal logging. Privacy-first design for family use.",
    security: "Content filtering + Malware blocking",
    filtering: "Family Filter / Adult Filter / Security Filter (free tiers)",
    operator: "CleanBrowsing (USA)",
    color: "emerald",
    tag: "Best for Families",
    tagColor: "text-emerald-400",
    borderColor: "border-emerald-900/30",
    bgColor: "bg-emerald-950/5",
    description:
      "CleanBrowsing specializes in family-safe DNS filtering with three free tiers: Security Filter (blocks malware and phishing), Adult Filter (blocks adult content), and Family Filter (blocks adult content, mixed content, and proxies). Unlike OpenDNS, CleanBrowsing's basic filtering tiers require no account — just point your router to their DNS IPs and content filtering is immediately active. Particularly popular for schools, libraries, and homes with children.",
    pros: ["No account needed for basic filtering", "Three filter tiers (Security/Adult/Family)", "Works at router level for all devices", "Minimal data logging"],
    cons: ["Slower than top-tier resolvers", "Custom filtering requires paid plan", "Smaller infrastructure than Google/Cloudflare"],
  },
  {
    id: "adguard",
    name: "AdGuard DNS",
    primary: "94.140.14.14",
    secondary: "94.140.15.15",
    primaryV6: "2a10:50c0::ad1:ff",
    secondaryV6: "2a10:50c0::ad2:ff",
    doh: "https://dns.adguard-dns.com/dns-query",
    dot: "dns.adguard-dns.com",
    speed: "18ms",
    speedRank: 3,
    privacy: "Excellent",
    privacyNotes: "No logging. GDPR compliant. Cyprus jurisdiction.",
    security: "Ad blocking + Tracker blocking + Malware blocking",
    filtering: "Ads + Trackers + Malware (free) / Custom filters (paid)",
    operator: "AdGuard Software Ltd. (Cyprus)",
    color: "cyan",
    tag: "Blocks Ads at DNS",
    tagColor: "text-cyan-400",
    borderColor: "border-cyan-900/30",
    bgColor: "bg-cyan-950/5",
    description:
      "AdGuard DNS is the only major free public DNS resolver that blocks advertising networks and tracking domains at the DNS level — network-wide, without any browser extension required. By resolving ad server and tracker domains to null responses, it removes ads from websites, apps, and Smart TVs across every device on your network. AdGuard DNS does not log any personal data and is GDPR compliant. The free default servers block ads and trackers; a paid plan allows custom allowlists and block lists.",
    pros: ["Ad blocking at DNS level (no extensions needed)", "Tracker blocking on all devices", "No personal data logging", "Excellent GDPR compliance"],
    cons: ["Ad blocking may break some websites", "Custom rules require paid subscription", "Smaller global PoP network than Google/Cloudflare"],
  },
];

// JSON-LD Schemas
const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${APP_URL}/best-dns-servers#dns-list`,
  name: "Best Public DNS Servers 2026",
  description: "A ranked directory of the fastest and most secure free public DNS resolvers.",
  numberOfItems: 6,
  itemListElement: resolvers.map((r, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: r.name,
    description: `${r.primary} / ${r.secondary} — ${r.tag}`,
    url: `${APP_URL}/best-dns-servers#${r.id}`,
  })),
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${APP_URL}/best-dns-servers#faq`,
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.answer,
    },
  })),
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "@id": `${APP_URL}/best-dns-servers#how-to-change-dns`,
  name: "How to Change Your DNS Server",
  description: "Step-by-step guide to switching from your ISP's DNS to a faster, more private public resolver.",
  totalTime: "PT3M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Choose a DNS provider",
      text: "Select a public DNS based on your priority (speed, privacy, security, or filtering). Cloudflare 1.1.1.1 is fastest; Quad9 9.9.9.9 is best for security.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Log in to your router admin panel",
      text: "Open a browser and go to your router's default gateway IP (typically 192.168.1.1 or 192.168.0.1). Log in with your admin credentials.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Find the DNS settings",
      text: "Navigate to WAN settings, Internet settings, or DHCP Server settings. Look for Primary DNS and Secondary DNS fields.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Enter DNS addresses and save",
      text: "Enter the primary and secondary IP addresses of your chosen DNS provider. Click Save or Apply. Reboot the router if required.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Flush your DNS cache",
      text: "On Windows run: ipconfig /flushdns. On macOS run: sudo killall -HUP mDNSResponder. Then test with nslookup to verify.",
    },
  ],
};

export default function BestDnsServersPage() {
  return (
    <>
      <JsonLd data={itemListSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={howToSchema} />

      <TroubleshootingArticleShell
        h1="Best DNS Servers 2026: Complete Directory of Fastest & Most Secure Public Resolvers"
        intro="Switching your DNS server is one of the fastest, free performance upgrades you can make to your home network. Your default ISP-assigned DNS resolvers are often slow, unencrypted, and log your browsing data. This guide ranks every major free public DNS resolver by speed, privacy, and security — with exact IP addresses, IPv6 support, DoH/DoT endpoints, and step-by-step setup instructions for routers, Windows, macOS, Android, and iOS."
        category="dns"
        breadcrumbs={breadcrumbs}
        faqs={faqs}
        troubleshootingSteps={troubleshootingSteps}
        quickFixChecklist={quickFixChecklist}
        commonCauses={commonCauses}
        severityLevel="low"
      >
        {/* ── Quick Reference Table ── */}
        <section className="mb-10" id="quick-reference" aria-label="DNS Quick Reference Table">
          <div className="glass-card p-6 border border-emerald-950/30 bg-emerald-950/5 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-emerald-500/10 text-emerald-400 text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-bl-lg font-bold">
              Quick Reference
            </div>
            <h2 className="text-xs font-bold text-emerald-400 mb-4 uppercase tracking-wide flex items-center gap-1.5">
              <Zap size={12} /> All Public DNS Servers — At a Glance
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-[var(--border-subtle)] text-[11px] text-[var(--text-secondary)]">
                <thead>
                  <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                    <th className="px-3 py-2 text-left">Provider</th>
                    <th className="px-3 py-2 text-left">Primary IPv4</th>
                    <th className="px-3 py-2 text-left">Secondary IPv4</th>
                    <th className="px-3 py-2 text-left">Avg Speed</th>
                    <th className="px-3 py-2 text-left">Best For</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-subtle)]">
                  {resolvers.map((r) => (
                    <tr key={r.id}>
                      <td className="px-3 py-2.5 font-bold text-[var(--text-primary)]">
                        <a href={`#${r.id}`} className="hover:text-[var(--brand-400)] transition-colors">
                          {r.name}
                        </a>
                      </td>
                      <td className="px-3 py-2.5 font-mono">{r.primary}</td>
                      <td className="px-3 py-2.5 font-mono">{r.secondary}</td>
                      <td className="px-3 py-2.5 font-semibold text-emerald-400">{r.speed}</td>
                      <td className={`px-3 py-2.5 font-semibold ${r.tagColor}`}>{r.tag}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[10px] text-[var(--text-muted)] mt-3">
              Speed benchmarks based on global averages from DNSPerf. Individual performance varies by location and ISP.
            </p>
          </div>
        </section>

        {/* ── Individual Resolver Profiles ── */}
        <section className="mb-10" aria-label="DNS Resolver Profiles">
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">
            DNS Resolver Deep Dive — Full Profiles
          </h2>
          <p className="text-sm text-[var(--text-secondary)] mb-6 leading-relaxed">
            Each resolver below includes exact IPv4/IPv6 addresses, DoH and DoT endpoints for encrypted DNS, speed
            data, privacy policy summary, and recommended use cases.
          </p>

          <div className="space-y-6">
            {resolvers.map((r, index) => (
              <div
                key={r.id}
                id={r.id}
                className={`p-5 border rounded-2xl ${r.borderColor} ${r.bgColor}`}
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[10px] font-bold font-mono ${r.tagColor} bg-[var(--bg-base)] px-2 py-0.5 rounded`}>
                        #{index + 1}
                      </span>
                      <h3 className={`font-bold text-sm ${r.tagColor}`}>{r.name}</h3>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${r.borderColor} ${r.tagColor}`}>
                        {r.tag}
                      </span>
                    </div>
                    <p className="text-[11px] text-[var(--text-muted)]">Operated by {r.operator}</p>
                  </div>
                  <div className={`text-right text-[10px] font-mono ${r.tagColor}`}>
                    <div className="text-lg font-bold">{r.speed}</div>
                    <div className="text-[var(--text-muted)]">avg latency</div>
                  </div>
                </div>

                {/* IP Address Grid */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-[var(--bg-base)] border border-[var(--border-subtle)] rounded-xl p-3">
                    <div className="text-[10px] text-[var(--text-muted)] mb-1 font-semibold uppercase tracking-wide">Primary IPv4</div>
                    <div className={`font-mono text-sm font-bold ${r.tagColor}`}>{r.primary}</div>
                  </div>
                  <div className="bg-[var(--bg-base)] border border-[var(--border-subtle)] rounded-xl p-3">
                    <div className="text-[10px] text-[var(--text-muted)] mb-1 font-semibold uppercase tracking-wide">Secondary IPv4</div>
                    <div className={`font-mono text-sm font-bold ${r.tagColor}`}>{r.secondary}</div>
                  </div>
                  <div className="bg-[var(--bg-base)] border border-[var(--border-subtle)] rounded-xl p-3">
                    <div className="text-[10px] text-[var(--text-muted)] mb-1 font-semibold uppercase tracking-wide">Primary IPv6</div>
                    <div className="font-mono text-[10px] text-[var(--text-secondary)] break-all">{r.primaryV6}</div>
                  </div>
                  <div className="bg-[var(--bg-base)] border border-[var(--border-subtle)] rounded-xl p-3">
                    <div className="text-[10px] text-[var(--text-muted)] mb-1 font-semibold uppercase tracking-wide">Secondary IPv6</div>
                    <div className="font-mono text-[10px] text-[var(--text-secondary)] break-all">{r.secondaryV6}</div>
                  </div>
                </div>

                {/* DoH / DoT */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4 text-[10px]">
                  <div className="flex items-center gap-2 bg-[var(--bg-base)] border border-[var(--border-subtle)] rounded-lg px-3 py-2">
                    <Lock size={10} className="text-emerald-400 flex-shrink-0" />
                    <div>
                      <div className="text-[var(--text-muted)] font-semibold">DoH Endpoint</div>
                      <div className="font-mono text-[var(--text-secondary)] break-all">{r.doh}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-[var(--bg-base)] border border-[var(--border-subtle)] rounded-lg px-3 py-2">
                    <Shield size={10} className="text-blue-400 flex-shrink-0" />
                    <div>
                      <div className="text-[var(--text-muted)] font-semibold">DoT Hostname</div>
                      <div className="font-mono text-[var(--text-secondary)]">{r.dot}</div>
                    </div>
                  </div>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-2 mb-4 text-[10px]">
                  <div className="text-center bg-[var(--bg-base)] border border-[var(--border-subtle)] rounded-lg p-2">
                    <div className="text-[var(--text-muted)] mb-0.5">Privacy</div>
                    <div className={`font-bold ${r.tagColor}`}>{r.privacy}</div>
                  </div>
                  <div className="text-center bg-[var(--bg-base)] border border-[var(--border-subtle)] rounded-lg p-2">
                    <div className="text-[var(--text-muted)] mb-0.5">Security</div>
                    <div className="font-bold text-[var(--text-primary)] text-[9px] leading-tight">{r.security}</div>
                  </div>
                  <div className="text-center bg-[var(--bg-base)] border border-[var(--border-subtle)] rounded-lg p-2">
                    <div className="text-[var(--text-muted)] mb-0.5">Filtering</div>
                    <div className="font-bold text-[var(--text-primary)] text-[9px] leading-tight line-clamp-2">{r.filtering}</div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed mb-4">{r.description}</p>

                {/* Pros/Cons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <div className="text-[10px] font-bold text-emerald-400 mb-1.5 flex items-center gap-1">
                      <CheckCircle2 size={10} /> Pros
                    </div>
                    <ul className="space-y-1">
                      {r.pros.map((p) => (
                        <li key={p} className="text-[10px] text-[var(--text-muted)] flex items-start gap-1.5">
                          <ChevronRight size={9} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-amber-400 mb-1.5 flex items-center gap-1">
                      <AlertTriangle size={10} /> Cons
                    </div>
                    <ul className="space-y-1">
                      {r.cons.map((c) => (
                        <li key={c} className="text-[10px] text-[var(--text-muted)] flex items-start gap-1.5">
                          <ChevronRight size={9} className="text-amber-500 flex-shrink-0 mt-0.5" />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── How to Change DNS — Platform Guide ── */}
        <section className="mb-10 glass-card p-6 border border-[var(--border-subtle)] rounded-2xl" id="setup-guide">
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2 flex items-center gap-2">
            <Globe size={18} className="text-[var(--brand-400)]" />
            How to Change DNS on All Platforms
          </h2>
          <p className="text-sm text-[var(--text-secondary)] mb-5 leading-relaxed">
            Use these settings with any public DNS provider above. Replace the IPs with your chosen resolver&apos;s
            addresses.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {[
              {
                platform: "Windows 11 / 10",
                steps: [
                  "Settings → Network & Internet → Ethernet or Wi-Fi",
                  "Click your network → Edit DNS server assignment",
                  "Select Manual → enable IPv4",
                  "Enter Primary and Secondary DNS IPs → Save",
                ],
              },
              {
                platform: "macOS",
                steps: [
                  "System Settings → Network → select your adapter",
                  "Click Details → DNS tab",
                  "Click + to add Primary DNS IP",
                  "Add Secondary DNS IP → OK → Apply",
                ],
              },
              {
                platform: "Android (Private DNS)",
                steps: [
                  "Settings → Network & Internet → Private DNS",
                  "Select Private DNS provider hostname",
                  "Enter the DoT hostname (e.g. one.one.one.one for Cloudflare)",
                  "Tap Save — applies to all networks",
                ],
              },
              {
                platform: "iOS / iPadOS",
                steps: [
                  "Settings → Wi-Fi → tap (i) next to your network",
                  "Scroll to DNS → tap Configure DNS",
                  "Select Manual → tap Add Server",
                  "Enter primary and secondary IPs → Save",
                ],
              },
              {
                platform: "Router (All Devices)",
                steps: [
                  "Log in to router admin panel (192.168.1.1 or 192.168.0.1)",
                  "Go to WAN Settings or Internet Setup",
                  "Find Primary DNS / Secondary DNS fields",
                  "Enter your chosen DNS IPs → Save → Reboot router",
                ],
              },
              {
                platform: "Linux (systemd)",
                steps: [
                  "Edit /etc/systemd/resolved.conf",
                  'Set DNS=1.1.1.1 1.0.0.1 under [Resolve]',
                  "Run: sudo systemctl restart systemd-resolved",
                  "Verify: resolvectl status",
                ],
              },
            ].map((item) => (
              <div
                key={item.platform}
                className="p-4 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl"
              >
                <div className="font-bold text-[var(--text-primary)] mb-2 flex items-center gap-1.5">
                  <Server size={11} className="text-[var(--brand-400)]" />
                  {item.platform}
                </div>
                <ol className="list-decimal pl-4 space-y-1 text-[10px] text-[var(--text-secondary)]">
                  {item.steps.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </section>

        {/* ── DNS Security Section ── */}
        <section className="mb-10 glass-card p-6 border border-[var(--border-subtle)] rounded-2xl">
          <h2 className="text-lg font-bold text-[var(--text-primary)] mb-3 flex items-center gap-2">
            <Shield size={18} className="text-[var(--brand-400)]" />
            DNS Security: DoH, DoT, and DNSSEC Explained
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[var(--text-secondary)]">
            {[
              {
                name: "DNS-over-HTTPS (DoH)",
                port: "TCP 443",
                icon: Lock,
                color: "text-emerald-400",
                desc: "Encrypts DNS queries inside standard HTTPS traffic. ISPs and attackers cannot see which domains you query. Supported by Chrome, Firefox, Edge, and Windows 11 natively.",
              },
              {
                name: "DNS-over-TLS (DoT)",
                port: "TCP 853",
                icon: Shield,
                color: "text-blue-400",
                desc: "Wraps DNS queries in TLS encryption on a dedicated port. Easier to block than DoH but provides stronger privacy when allowed. Used by Android Private DNS and router firmware.",
              },
              {
                name: "DNSSEC",
                port: "UDP/TCP 53",
                icon: Eye,
                color: "text-purple-400",
                desc: "Cryptographically signs DNS records so clients can verify the response came from the legitimate authoritative server. Prevents DNS cache poisoning and man-in-the-middle attacks on DNS.",
              },
            ].map((item) => (
              <div
                key={item.name}
                className="p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-2"
              >
                <div className={`flex items-center gap-1.5 font-bold text-xs ${item.color}`}>
                  <item.icon size={12} />
                  {item.name}
                </div>
                <div className="font-mono text-[10px] text-[var(--text-muted)]">Port: {item.port}</div>
                <p className="text-[10px] text-[var(--text-muted)] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Related Links ── */}
        <section className="mb-6 glass-card p-5 border border-[var(--border-subtle)] rounded-2xl">
          <h2 className="text-sm font-bold text-[var(--text-primary)] mb-3">Related DNS Guides</h2>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "What is DNS?", href: "/what-is-dns" },
              { label: "Flush DNS Cache", href: "/how-to-flush-dns-cache" },
              { label: "DNS Hub", href: "/dns" },
              { label: "Best DNS for Gaming", href: "/best-dns-for-gaming" },
              { label: "Best DNS for Faster Internet", href: "/best-dns-for-faster-internet" },
              { label: "Change DNS on Router", href: "/how-to-change-dns-on-router" },
              { label: "DNS Not Responding Fix", href: "/dns-server-not-responding" },
              { label: "DNS Probe No Internet", href: "/dns-probe-finished-no-internet" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs bg-[var(--bg-elevated)] border border-[var(--border-subtle)] hover:border-[var(--brand-800)] px-3 py-1.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--brand-400)] transition-all font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </section>
      </TroubleshootingArticleShell>
    </>
  );
}
