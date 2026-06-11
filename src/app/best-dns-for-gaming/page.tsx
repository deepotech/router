import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import TroubleshootingArticleShell from "@/components/tools/TroubleshootingArticleShell";
import { JsonLd } from "@/lib/seo/schema";
import { APP_URL } from "@/lib/constants";
import Link from "next/link";
import {
  Gamepad2,
  Zap,
  Shield,
  Globe,
  Settings,
  HelpCircle,
  Wifi,
} from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "Best DNS for Gaming: Lowest Ping DNS Servers for PS5, Xbox & PC (2026)",
  description:
    "Find the fastest DNS servers for gaming. Ranked by latency for PS5, Xbox Series X, Nintendo Switch, and PC. Setup guides for Cloudflare, Google DNS, and more.",
  canonical: "/best-dns-for-gaming",
  keywords: [
    "best dns for gaming",
    "lowest latency dns gaming",
    "fastest dns server gaming",
    "cloudflare dns gaming",
    "google dns gaming",
    "dns for ps5",
    "dns for xbox",
    "dns ps5 faster",
    "best dns servers 2026",
    "gaming dns setup",
    "reduce gaming ping dns",
    "best dns nintendo switch",
    "dns for lower ping",
  ],
});

const breadcrumbs = [
  { name: "Router Guides", url: "/routers" },
  { name: "Best DNS for Gaming", url: "/best-dns-for-gaming" },
];

const troubleshootingSteps = [
  {
    title: "Find the DNS Settings on Your Gaming Device or Router",
    description:
      "DNS for gaming can be configured at the router level (applies to all devices) or directly on each console. For router-level setup, log in to your router admin panel at 192.168.1.1 or 192.168.0.1. For device-level setup, go to Network Settings on your PS5, Xbox, Switch, or PC.",
    tip: "Setting DNS on your router affects all devices simultaneously. Setting DNS on a specific console overrides the router setting only for that device.",
  },
  {
    title: "Choose the Right DNS Provider for Your Region",
    description:
      "Cloudflare (1.1.1.1) is consistently the fastest DNS globally with average query times under 12ms. Google (8.8.8.8) provides excellent reliability and uptime. Quad9 (9.9.9.9) offers built-in malware filtering with ~18ms average latency.",
    tip: "DNS speed varies by geographic region. Run a DNS benchmark tool like DNS Benchmark (Windows) or namebench to test which provider is fastest from your exact location.",
  },
  {
    title: "Enter Primary and Secondary DNS Addresses",
    description:
      "For Cloudflare: Primary 1.1.1.1 / Secondary 1.0.0.1. For Google: Primary 8.8.8.8 / Secondary 8.8.4.4. For Quad9: Primary 9.9.9.9 / Secondary 149.112.112.112. Always configure both Primary and Secondary for automatic failover.",
    tip: "A common trick: use Cloudflare 1.1.1.1 as Primary and Google 8.8.4.4 as Secondary — this gives you the fastest primary and a highly reliable fallback from a different infrastructure.",
  },
  {
    title: "Save Settings and Test Your Connection",
    description:
      "Save the new DNS settings and run your console's network test. On PS5: Settings → Network → Connection Status → Test Internet Connection. On Xbox: Settings → General → Network Settings → Test Network Connection. Reboot the router after changing DNS there.",
    tip: "After saving, run a DNS speed test using nslookup google.com in Command Prompt. The Server field should now show your new DNS provider's IP address.",
  },
];

const faqs = [
  {
    question: "What is the best DNS for gaming in 2026?",
    answer:
      "Cloudflare (1.1.1.1 / 1.0.0.1) is the best DNS for gaming in 2026. It has the lowest average global response time (~11ms), a strict no-logging policy, full DNSSEC support, and runs on Anycast infrastructure for the fastest regional routing. Google (8.8.8.8) is the best alternative for reliability, especially in regions where Cloudflare has fewer PoPs.",
  },
  {
    question: "Does DNS affect ping in games?",
    answer:
      "DNS does not directly reduce your in-game ping to game servers. Your ping (round-trip time to the server) is determined by physical routing paths and server distance. However, DNS speed affects matchmaking speed, lobby loading, and the time it takes to connect to servers at game launch. Faster DNS means faster server discovery, reducing initial connection delays by 50-200ms on slow ISP DNS.",
  },
  {
    question: "Should I change DNS on my router or directly on my PS5/Xbox?",
    answer:
      "Changing DNS on your router applies it to every device (PS5, Xbox, PC, phone) automatically. Changing it directly on a console overrides the router setting just for that device. If you want all gaming devices to benefit, change it at the router. If you want the fastest possible setup without touching the router, configure each console individually.",
  },
  {
    question: "What is the best DNS server for PS5?",
    answer:
      "The best DNS servers for PS5 are Cloudflare (Primary: 1.1.1.1, Secondary: 1.0.0.1). These provide the fastest PSN connection times and lowest DNS resolution latency. To configure: Settings → Network → Settings → Set Up Internet Connection → press Options → Advanced Settings → DNS Settings → Manual → enter 1.1.1.1 and 1.0.0.1.",
  },
  {
    question: "What is the best DNS server for Xbox Series X/S?",
    answer:
      "The best DNS servers for Xbox are Cloudflare (1.1.1.1 / 1.0.0.1) or Google (8.8.8.8 / 8.8.4.4). To configure on Xbox: Settings → General → Network Settings → Advanced Settings → DNS Settings → Manual → enter your preferred primary and secondary addresses. Both options significantly outperform the default ISP DNS assigned by most routers.",
  },
  {
    question: "Can changing DNS fix packet loss in games?",
    answer:
      "No. DNS affects name resolution speed, not data routing. Packet loss is caused by poor quality links, congested network segments, or a weak Wi-Fi signal. If you are experiencing packet loss, check your physical connection (use a wired Ethernet cable), check for router firmware updates, and review your ISP's line quality. See our Packet Loss Fix guide for detailed diagnostics.",
  },
  {
    question: "Does Google DNS or Cloudflare DNS give lower ping for gaming?",
    answer:
      "Cloudflare (1.1.1.1) generally has lower DNS resolution times globally, averaging ~11ms vs. Google's ~20ms. For actual in-game ping, the difference is negligible after the initial connection is established. Cloudflare is recommended for gaming because its faster resolution speeds up matchmaking, PSN/Xbox Live sign-ins, and game server discovery.",
  },
  {
    question: "Is Cloudflare DNS free?",
    answer:
      "Yes. Cloudflare's 1.1.1.1 DNS resolver is completely free for everyone. It offers standard DNS (1.1.1.1), malware-blocking DNS (1.1.1.2), and malware + adult content filtering (1.1.1.3). Cloudflare also provides DNS over HTTPS (DoH) and DNS over TLS (DoT) for free at cloudflare-dns.com.",
  },
];

const commonCauses = [
  {
    title: "Slow ISP Default DNS",
    desc: "ISP-provided DNS servers are often overcrowded and geographically distant, adding 50–150ms to every resolution query and slowing lobby loads.",
  },
  {
    title: "No DNS Caching at ISP Level",
    desc: "ISP DNS servers sometimes skip caching for popular domains, forcing full resolution on every query rather than serving a cached result.",
  },
  {
    title: "DNS Hijacking",
    desc: "Some ISPs intercept DNS queries and redirect them to their own search portal, leaking browsing data and causing unexpected delays.",
  },
  {
    title: "IPv6 DNS Not Configured",
    desc: "Devices with IPv6 enabled will bypass custom IPv4 DNS settings and fall back to ISP default IPv6 resolvers if IPv6 DNS is not also configured.",
  },
];

const quickFixChecklist = [
  "Set Cloudflare (1.1.1.1 / 1.0.0.1) as Primary and Secondary DNS on your router or console.",
  "Configure DNS on both the router (global) and the specific console (device override) for best results.",
  "Always fill both Primary and Secondary DNS fields — never leave Secondary blank.",
  "Flush DNS cache after changes: run 'ipconfig /flushdns' on Windows or power cycle your console.",
  "Run a DNS speed benchmark before and after to measure the improvement.",
  "For PS5: configure DNS under Advanced Settings in the Set Up Internet Connection wizard.",
  "For Xbox: go to Settings → General → Network Settings → Advanced Settings → DNS Settings.",
];

// ──────────────────────────────────────────
// Schemas
// ──────────────────────────────────────────
const collectionPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${APP_URL}/best-dns-for-gaming#collection`,
  url: `${APP_URL}/best-dns-for-gaming`,
  name: "Best DNS Servers for Gaming (2026) — PS5, Xbox, PC & Switch",
  description:
    "Ranked comparison of the fastest DNS servers for online gaming. Includes setup guides for PlayStation 5, Xbox Series X/S, Nintendo Switch, and PC gaming platforms.",
  about: [
    { "@type": "Thing", name: "Gaming DNS Optimization" },
    { "@type": "Thing", name: "Cloudflare DNS 1.1.1.1" },
    { "@type": "Thing", name: "Google Public DNS" },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

export default function BestDnsForGamingPage() {
  return (
    <TroubleshootingArticleShell
      h1="Best DNS Servers for Gaming (2026): Lowest Ping for PS5, Xbox & PC"
      intro="Upgrading your DNS server is the fastest, free network change you can make for gaming. The right DNS provider reduces matchmaking times, speeds up lobby loading, and improves connection reliability — without changing your internet plan or hardware. This guide ranks the best DNS servers for gaming by latency, privacy, and platform compatibility, with step-by-step setup guides for PS5, Xbox, Nintendo Switch, and PC."
      category="dns"
      breadcrumbs={breadcrumbs}
      faqs={faqs}
      troubleshootingSteps={troubleshootingSteps}
      warningBanner={{
        title: "DNS Does Not Replace a Good Internet Connection",
        text: "Changing DNS servers improves name resolution speed and matchmaking times, but it does not increase your download/upload bandwidth, reduce physical ping to distant game servers, or fix packet loss. For those issues, check your connection quality, router QoS settings, and ISP line quality.",
      }}
      quickFixChecklist={quickFixChecklist}
      commonCauses={commonCauses}
      whenToContactISP="Contact your ISP if you suspect DNS hijacking — where DNS queries are redirected to an ISP search page even after changing your DNS settings. Enable DNS over HTTPS (DoH) in your browser or router to bypass this. If custom DNS settings are automatically overwritten by the ISP gateway, the ISP may be enforcing their DNS at the modem level."
      severityLevel="low"
    >
      <JsonLd data={collectionPageSchema} />
      <JsonLd data={faqSchema} />

      <div className="space-y-10">

        {/* ==========================================
            SECTION 1: INTRO
            ========================================== */}
        <section className="prose prose-invert max-w-none space-y-4" aria-label="Introduction">
          <div className="flex items-center gap-2 text-[var(--brand-400)] font-semibold text-xs uppercase tracking-wider mb-2">
            <Gamepad2 size={14} /> Gaming DNS Authority Guide
          </div>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            When you launch a game, your console or PC sends DNS queries to find the IP addresses of matchmaking servers, content delivery networks, and game services. If your ISP&apos;s DNS is slow or overloaded, these lookups add 50–200ms of invisible delay to every session start. Switching to a faster DNS provider like Cloudflare or Google eliminates this delay.
          </p>
        </section>

        {/* ==========================================
            SECTION 2: FEATURED SNIPPET TABLE
            ========================================== */}
        <section
          className="glass-card p-6 border border-emerald-950/30 bg-emerald-950/5 rounded-2xl relative overflow-hidden"
          aria-label="Best DNS for Gaming Quick Reference"
        >
          <div className="absolute top-0 right-0 bg-emerald-500/10 text-emerald-400 text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-bl-lg font-bold">
            AI Overview Summary
          </div>
          <h2 className="text-xs font-bold text-emerald-400 mb-3 uppercase tracking-wide flex items-center gap-1.5">
            <Zap size={12} /> Best DNS Servers for Gaming — Ranked by Latency
          </h2>
          <div className="overflow-x-auto mb-4">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-[11px] text-[var(--text-secondary)]">
              <thead>
                <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                  <th className="px-3 py-2 text-left border-b border-[var(--border-subtle)]">DNS Provider</th>
                  <th className="px-3 py-2 text-left border-b border-[var(--border-subtle)]">Primary</th>
                  <th className="px-3 py-2 text-left border-b border-[var(--border-subtle)]">Secondary</th>
                  <th className="px-3 py-2 text-left border-b border-[var(--border-subtle)]">Avg. Latency</th>
                  <th className="px-3 py-2 text-left border-b border-[var(--border-subtle)]">Best For</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)]">
                <tr>
                  <td className="px-3 py-2.5 font-bold text-[var(--text-primary)]">Cloudflare</td>
                  <td className="px-3 py-2.5 font-mono">1.1.1.1</td>
                  <td className="px-3 py-2.5 font-mono">1.0.0.1</td>
                  <td className="px-3 py-2.5 font-semibold text-emerald-400">~11 ms</td>
                  <td className="px-3 py-2.5 font-semibold text-emerald-400">Gaming (Recommended)</td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-bold text-[var(--text-primary)]">Google Public DNS</td>
                  <td className="px-3 py-2.5 font-mono">8.8.8.8</td>
                  <td className="px-3 py-2.5 font-mono">8.8.4.4</td>
                  <td className="px-3 py-2.5">~20 ms</td>
                  <td className="px-3 py-2.5">Reliability + Uptime</td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-bold text-[var(--text-primary)]">Quad9</td>
                  <td className="px-3 py-2.5 font-mono">9.9.9.9</td>
                  <td className="px-3 py-2.5 font-mono">149.112.112.112</td>
                  <td className="px-3 py-2.5">~18 ms</td>
                  <td className="px-3 py-2.5">Security + malware blocking</td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-bold text-[var(--text-primary)]">OpenDNS</td>
                  <td className="px-3 py-2.5 font-mono">208.67.222.222</td>
                  <td className="px-3 py-2.5 font-mono">208.67.220.220</td>
                  <td className="px-3 py-2.5">~25 ms</td>
                  <td className="px-3 py-2.5">Parental controls + filtering</td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-bold text-[var(--text-primary)]">AdGuard DNS</td>
                  <td className="px-3 py-2.5 font-mono">94.140.14.14</td>
                  <td className="px-3 py-2.5 font-mono">94.140.15.15</td>
                  <td className="px-3 py-2.5">~28 ms</td>
                  <td className="px-3 py-2.5">Ad blocking + tracker filtering</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
            Cloudflare (1.1.1.1) is the top recommendation for gaming due to its globally lowest average query time, DNSSEC validation, and strict no-logging policy.
          </p>
        </section>

        {/* ==========================================
            SECTION 3: PLATFORM SETUP GUIDES
            ========================================== */}
        <section className="prose prose-invert max-w-none space-y-4" id="platform-setup">
          <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-1.5">
            <Settings size={16} className="text-[var(--brand-400)]" />
            DNS Setup Guide by Platform
          </h2>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Step-by-step instructions to configure the best DNS for each gaming platform:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-2">
              <span className="font-bold text-[var(--text-primary)] block">PlayStation 5 (PS5)</span>
              <ol className="list-decimal pl-4 space-y-1 text-[11px] text-[var(--text-muted)]">
                <li>Go to <strong>Settings → Network → Settings</strong>.</li>
                <li>Select <strong>Set Up Internet Connection</strong>.</li>
                <li>Choose your Wi-Fi or LAN and press <strong>Options</strong>.</li>
                <li>Select <strong>Advanced Settings</strong>.</li>
                <li>Set <strong>DNS Settings → Manual</strong>.</li>
                <li>Primary: <strong>1.1.1.1</strong>, Secondary: <strong>1.0.0.1</strong>.</li>
                <li>Select <strong>Done</strong> and test the connection.</li>
              </ol>
              <Link href="/ps5-nat-type-fix" className="text-[var(--brand-400)] hover:underline text-[11px] block mt-1">→ PS5 Network Optimization Guide</Link>
            </div>
            <div className="p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-2">
              <span className="font-bold text-[var(--text-primary)] block">Xbox Series X/S</span>
              <ol className="list-decimal pl-4 space-y-1 text-[11px] text-[var(--text-muted)]">
                <li>Go to <strong>Settings → General → Network Settings</strong>.</li>
                <li>Select <strong>Advanced Settings</strong>.</li>
                <li>Select <strong>DNS Settings → Manual</strong>.</li>
                <li>Primary: <strong>1.1.1.1</strong>, Secondary: <strong>1.0.0.1</strong>.</li>
                <li>Press <strong>B</strong> to save and test your connection.</li>
              </ol>
              <Link href="/xbox-nat-type-open" className="text-[var(--brand-400)] hover:underline text-[11px] block mt-1">→ Xbox Open NAT Guide</Link>
            </div>
            <div className="p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-2">
              <span className="font-bold text-[var(--text-primary)] block">Nintendo Switch</span>
              <ol className="list-decimal pl-4 space-y-1 text-[11px] text-[var(--text-muted)]">
                <li>Go to <strong>System Settings → Internet → Internet Settings</strong>.</li>
                <li>Select your Wi-Fi network → <strong>Change Settings</strong>.</li>
                <li>Select <strong>DNS Settings → Manual</strong>.</li>
                <li>Primary: <strong>1.1.1.1</strong>, Secondary: <strong>1.0.0.1</strong>.</li>
                <li>Tap <strong>Save</strong>.</li>
              </ol>
            </div>
            <div className="p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-2">
              <span className="font-bold text-[var(--text-primary)] block">Windows PC</span>
              <ol className="list-decimal pl-4 space-y-1 text-[11px] text-[var(--text-muted)]">
                <li>Go to <strong>Settings → Network &amp; Internet → Advanced Network Settings</strong>.</li>
                <li>Click your active adapter → <strong>Edit</strong>.</li>
                <li>Select <strong>Manual → IPv4 → On</strong>.</li>
                <li>Preferred DNS: <strong>1.1.1.1</strong>, Alternate: <strong>1.0.0.1</strong>.</li>
                <li>Click <strong>Save</strong>.</li>
              </ol>
            </div>
          </div>
        </section>

        {/* ==========================================
            SECTION 4: DNS PROVIDER DEEP COMPARISON
            ========================================== */}
        <section className="prose prose-invert max-w-none space-y-4">
          <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-1.5">
            <Globe size={16} className="text-[var(--brand-400)]" />
            DNS Provider Comparison for Gaming
          </h2>
          <div className="space-y-4 text-xs">
            {[
              {
                name: "Cloudflare — 1.1.1.1 (Recommended for Gaming)",
                color: "border-orange-500/30 bg-orange-950/5",
                badge: "text-orange-400",
                latency: "~11 ms",
                description: "Cloudflare's 1.1.1.1 is the world's fastest public DNS resolver according to DNSPerf benchmarks. Built on Anycast infrastructure across 300+ cities, every query is routed to the nearest PoP (Point of Presence). Cloudflare processes DNS queries in ~11ms globally and maintains a strict no-logging policy — your IP address is never stored.",
                pros: ["Fastest average global DNS", "No query logging / full privacy", "DNSSEC and DoH / DoT support", "Free malware filter at 1.1.1.2"],
                cons: ["Rare: some ISPs throttle Cloudflare traffic"],
              },
              {
                name: "Google Public DNS — 8.8.8.8",
                color: "border-blue-500/30 bg-blue-950/5",
                badge: "text-blue-400",
                latency: "~20 ms",
                description: "Google's public DNS is the most widely used resolver in the world. It benefits from Google's massive global network infrastructure, excellent routing, and high cache hit rates for popular gaming domains. Average latency is ~20ms globally, making it slightly slower than Cloudflare but with exceptional uptime and redundancy.",
                pros: ["Excellent uptime and global coverage", "Fast caching for popular domains", "IPv6 support", "DNSSEC validation"],
                cons: ["Logs some query data for diagnostics", "Slightly slower than Cloudflare"],
              },
              {
                name: "Quad9 — 9.9.9.9 (Best for Security)",
                color: "border-purple-500/30 bg-purple-950/5",
                badge: "text-purple-400",
                latency: "~18 ms",
                description: "Quad9 is operated by the Quad9 Foundation (a non-profit) and is headquartered in Switzerland under strict privacy laws. It automatically blocks queries to known malicious domains using threat intelligence from 25+ cybersecurity organizations. Average latency of ~18ms makes it competitive with Google for gaming.",
                pros: ["Automatic malware domain blocking", "Non-profit with strict privacy policy", "No data sold to advertisers", "DNSSEC support"],
                cons: ["May block some legitimate domains by mistake", "Slightly slower than Cloudflare"],
              },
            ].map((p) => (
              <div key={p.name} className={`p-4 border rounded-xl space-y-3 ${p.color}`}>
                <div className="flex items-center justify-between">
                  <span className={`font-bold text-[11px] ${p.badge}`}>{p.name}</span>
                  <span className="font-mono text-[10px] text-[var(--text-muted)] bg-[var(--bg-surface)] px-2 py-0.5 rounded border border-[var(--border-subtle)]">{p.latency}</span>
                </div>
                <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">{p.description}</p>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="font-semibold text-emerald-400 text-[10px] block mb-1">Pros</span>
                    <ul className="space-y-0.5 text-[10px] text-[var(--text-muted)]">
                      {p.pros.map((pro) => <li key={pro}>✓ {pro}</li>)}
                    </ul>
                  </div>
                  <div>
                    <span className="font-semibold text-amber-400 text-[10px] block mb-1">Cons</span>
                    <ul className="space-y-0.5 text-[10px] text-[var(--text-muted)]">
                      {p.cons.map((con) => <li key={con}>✗ {con}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ==========================================
            SECTION 5: WHAT DNS DOES / DOESN'T DO FOR GAMING
            ========================================== */}
        <section className="prose prose-invert max-w-none space-y-4">
          <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-1.5">
            <Zap size={16} className="text-[var(--brand-400)]" />
            What DNS Does (and Does Not) Do for Gaming
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 border border-emerald-900/30 bg-emerald-950/5 rounded-xl space-y-2">
              <span className="font-bold text-emerald-400 text-[11px] block">✅ What DNS Improves</span>
              <ul className="space-y-1.5 text-[11px] text-[var(--text-muted)]">
                <li><strong>Matchmaking speed:</strong> Faster server lookups reduce lobby connection time.</li>
                <li><strong>Game launch times:</strong> Quicker CDN resolution means faster patch downloads.</li>
                <li><strong>Store loading:</strong> PS Store, Xbox Game Pass, Steam load faster.</li>
                <li><strong>Party/friends list:</strong> Faster DNS means quicker social server connections.</li>
                <li><strong>Privacy:</strong> No-log DNS hides browsing habits from ISP monitoring.</li>
              </ul>
            </div>
            <div className="p-4 border border-red-900/30 bg-red-950/5 rounded-xl space-y-2">
              <span className="font-bold text-red-400 text-[11px] block">❌ What DNS Does NOT Fix</span>
              <ul className="space-y-1.5 text-[11px] text-[var(--text-muted)]">
                <li><strong>In-game ping:</strong> Server distance determines latency once connected.</li>
                <li><strong>Packet loss:</strong> Poor physical link quality causes packet loss, not DNS.</li>
                <li><strong>Bandwidth:</strong> DNS does not increase download or upload speeds.</li>
                <li><strong>NAT type:</strong> Strict NAT requires port forwarding, not DNS changes.</li>
                <li><strong>Jitter/stuttering:</strong> Network instability requires QoS or hardware fix.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ==========================================
            SECTION 6: ROUTER DNS SETUP
            ========================================== */}
        <section className="prose prose-invert max-w-none space-y-4">
          <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-1.5">
            <Wifi size={16} className="text-[var(--brand-400)]" />
            Set DNS on Your Router (Applies to All Gaming Devices)
          </h2>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            The most efficient way to upgrade DNS for all gaming devices simultaneously is to configure it at the router level. Every device connected to your Wi-Fi or LAN will automatically use the faster DNS:
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-[11px] text-[var(--text-secondary)]">
              <thead>
                <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                  <th className="px-3 py-2 text-left">Router Brand</th>
                  <th className="px-3 py-2 text-left">Login Address</th>
                  <th className="px-3 py-2 text-left">DNS Menu Location</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)]">
                {[
                  { brand: "TP-Link", href: "/routers/tp-link", login: "tplinkwifi.net", path: "Advanced → Network → DHCP Server" },
                  { brand: "ASUS", href: "/routers/asus", login: "router.asus.com", path: "WAN → Internet Connection → WAN DNS Setting" },
                  { brand: "NETGEAR", href: "/routers/netgear", login: "routerlogin.net", path: "Basic → Internet → DNS Address" },
                  { brand: "D-Link", href: "/routers/d-link", login: "192.168.0.1", path: "Setup → Internet → DNS Settings" },
                  { brand: "Linksys", href: "/routers/linksys", login: "192.168.1.1", path: "Connectivity → Internet Settings → DNS" },
                ].map(({ brand, href, login, path }) => (
                  <tr key={brand}>
                    <td className="px-3 py-2.5 font-semibold">
                      <Link href={href} className="text-[var(--brand-400)] hover:underline">{brand}</Link>
                    </td>
                    <td className="px-3 py-2.5 font-mono">{login}</td>
                    <td className="px-3 py-2.5 text-[var(--text-muted)]">{path}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            For the full brand-by-brand guide, see our{" "}
            <Link href="/how-to-change-dns-on-router" className="text-[var(--brand-400)] hover:underline">How to Change DNS on Router</Link> guide.
          </p>
        </section>

        {/* ==========================================
            SECTION 7: SECURITY DNS FOR GAMING
            ========================================== */}
        <section className="prose prose-invert max-w-none space-y-4">
          <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-1.5">
            <Shield size={16} className="text-[var(--brand-400)]" />
            Security DNS Options for Gamers
          </h2>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            If you want both fast DNS and added security (such as blocking phishing sites or malware during gaming), consider these specialized options:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            {[
              { name: "Cloudflare for Families", primary: "1.1.1.3", secondary: "1.0.0.3", desc: "Blocks malware and adult content. Suitable for family gaming setups." },
              { name: "Cloudflare Malware Only", primary: "1.1.1.2", secondary: "1.0.0.2", desc: "Blocks malware domains only. Good for gamers who want protection without content filtering." },
              { name: "Quad9 Secured", primary: "9.9.9.9", secondary: "149.112.112.112", desc: "Blocks 25+ threat intelligence feeds. Swiss privacy law protection." },
            ].map((s) => (
              <div key={s.name} className="p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-2">
                <span className="font-bold text-[var(--text-primary)] text-[11px] block">{s.name}</span>
                <div className="font-mono text-[10px] text-[var(--text-muted)] space-y-0.5">
                  <div>Primary: <span className="text-[var(--text-primary)]">{s.primary}</span></div>
                  <div>Secondary: <span className="text-[var(--text-primary)]">{s.secondary}</span></div>
                </div>
                <p className="text-[10px] text-[var(--text-muted)] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ==========================================
            SECTION 8: RELATED GUIDES
            ========================================== */}
        <section className="prose prose-invert max-w-none space-y-4">
          <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-1.5">
            <HelpCircle size={16} className="text-[var(--brand-400)]" />
            Related Gaming Network Guides
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {[
              { title: "How to Change DNS on Router", href: "/how-to-change-dns-on-router", desc: "Step-by-step DNS setup guide for all major router brands." },
              { title: "Best DNS for Faster Internet", href: "/best-dns-for-faster-internet", desc: "Full latency benchmarks comparing top DNS providers for browsing." },
              { title: "Open NAT Type Guide", href: "/open-nat-type", desc: "How to achieve Open NAT for faster matchmaking on PS5 and Xbox." },
              { title: "Fix Strict NAT Type", href: "/nat-type-strict", desc: "Step-by-step fix for Strict NAT — UPnP, port forwarding, DMZ." },
              { title: "Port Forwarding Guide", href: "/port-forwarding", desc: "How to open ports for gaming servers and home hosting." },
              { title: "PS5 NAT Type Fix", href: "/ps5-nat-type-fix", desc: "Dedicated PS5 network optimization and NAT guide." },
              { title: "Xbox Open NAT Guide", href: "/xbox-nat-type-open", desc: "How to get Open NAT on Xbox Series X/S." },
              { title: "Router Settings Guide", href: "/router-settings", desc: "Complete guide to every important router configuration panel." },
            ].map(({ title, href, desc }) => (
              <Link
                key={href}
                href={href}
                className="p-3 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl hover:border-[var(--brand-400)] transition-colors group block no-underline"
              >
                <span className="font-semibold text-[var(--brand-400)] group-hover:underline text-[11px] block">{title}</span>
                <p className="text-[10px] text-[var(--text-muted)] mt-0.5">{desc}</p>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </TroubleshootingArticleShell>
  );
}
