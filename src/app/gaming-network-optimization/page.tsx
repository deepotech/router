import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import TroubleshootingArticleShell from "@/components/tools/TroubleshootingArticleShell";
import ConnectionOptimizerClient from "@/components/tools/ConnectionOptimizerClient";

// ─────────────────────────────────────────────
// Premium SEO Metadata
// ─────────────────────────────────────────────
export const metadata: Metadata = buildMetadata({
  title:
    "Gaming Network Optimization (2026) – Complete Guide to Optimize Your Network for Online Gaming",
  description:
    "Master gaming network optimization. Fix ping, eliminate bufferbloat, stop packet loss, reduce jitter, configure QoS, set up port forwarding, and build the fastest possible gaming connection for Warzone, Valorant, Fortnite, CS2, and Apex Legends.",
  canonical: "/gaming-network-optimization",
  keywords: [
    "gaming network optimization",
    "optimize network for gaming",
    "how to improve gaming connection",
    "best network settings for gaming",
    "gaming internet optimization",
    "gaming connection guide",
    "gaming network setup",
    "reduce ping for gaming",
    "fix lag gaming",
    "gaming network troubleshooting",
    "online gaming optimization",
    "gaming router optimization",
  ],
});

// ─────────────────────────────────────────────
// Breadcrumbs
// ─────────────────────────────────────────────
const breadcrumbs = [
  { name: "Gaming Net", url: "/problems" },
  { name: "Gaming Network Optimization", url: "/gaming-network-optimization" },
];

// ─────────────────────────────────────────────
// Troubleshooting Steps
// ─────────────────────────────────────────────
const troubleshootingSteps = [
  {
    title: "Switch to a Wired Cat6 Ethernet Connection",
    description:
      "The single most impactful gaming network optimization is eliminating Wi-Fi. Wireless introduces variable retry delays, co-channel interference, background SSID scans, and hidden-node collisions — all of which cause jitter and lag spikes that no router firmware can fix. Connect your gaming PC or console directly to your router using a shielded Cat6 or Cat6A Ethernet cable. A wired connection delivers sub-1ms gateway latency vs. 5–50ms over Wi-Fi.",
    tip: "If running a cable is impossible, use a MoCA 2.5 adapter over existing coaxial cable or a Powerline adapter. Both provide significantly lower jitter than 5 GHz Wi-Fi over the same physical distance.",
  },
  {
    title: "Fix Bufferbloat with SQM (FQ-CoDel or CAKE)",
    description:
      "Bufferbloat is the primary cause of load-induced lag spikes — when your ping jumps to 200–400ms the moment someone starts a download. Enable Smart Queue Management (SQM) on your router using FQ-CoDel or CAKE. Set your upload and download caps to 85–90% of your measured line speed. Disable hardware NAT acceleration (CTF/Flow Cache) first or SQM will have zero effect. Verify with a DSLReports bufferbloat test — target A or B grade.",
    tip: "Upload-path bufferbloat is usually worse than download on DSL and cable connections. Always cap both upload AND download, not just one direction.",
  },
  {
    title: "Configure QoS to Prioritize Your Gaming Device",
    description:
      "Quality of Service (QoS) ensures that gaming traffic from your specific device takes priority over background downloads, streaming, and cloud backup operations from other household devices. Log into your router and assign your gaming device (PC or console) a static IP via DHCP reservation. Then set that IP to the highest QoS priority class. Also prioritize game-specific UDP ports: Valorant (7000–7500), Warzone (3074), CS2 (27005–27020).",
    tip: "If your router supports DSCP marking, set your gaming device's traffic to DSCP CS5 or EF (Expedited Forwarding) to instruct all intermediate network devices to treat gaming packets with the highest priority class.",
  },
  {
    title: "Set Up Port Forwarding for Your Game Consoles",
    description:
      "Strict NAT types block direct peer-to-peer connections in multiplayer games, forcing traffic through relay servers with significantly higher latency. Open your NAT type by forwarding the specific UDP ports your console or game uses. For PlayStation: forward TCP/UDP 1935, 3478-3480. For Xbox: forward TCP/UDP 3074, 3544. For PC gaming: check each game's official port list. Alternatively, place your console in the router's DMZ for fully open NAT.",
    tip: "If double NAT is present (ISP modem + your router in cascade), you must enable bridge mode on the ISP modem first. No amount of port forwarding on your router will work while double NAT is active.",
  },
  {
    title: "Switch to a Low-Latency DNS Resolver",
    description:
      "DNS resolution time adds directly to your initial connection latency for each game server session, matchmaking request, and CDN asset download. Your ISP's default DNS resolvers are often slow and geographically distant. Switch to Cloudflare DNS (1.1.1.1 / 1.0.0.1) or Google DNS (8.8.8.8 / 8.8.4.4) for faster response times. For gaming specifically, Cloudflare 1.1.1.1 consistently delivers the lowest DNS resolution latency globally.",
    tip: "Set your DNS on your router — not on individual devices — so all devices benefit simultaneously without repeated configuration. Look for the DNS settings under your router's WAN or Internet Connection settings.",
  },
  {
    title: "Update Router Firmware and NIC Drivers",
    description:
      "Outdated router firmware can contain memory leaks, buffer management bugs, and unpatched wireless scheduling issues that degrade network quality over time. Log into your router admin panel and check for firmware updates under Administration or System. Similarly, update your PC's network interface card (NIC) drivers from the manufacturer's website (Intel, Realtek, Broadcom). Disable Energy Efficient Ethernet (EEE) in the NIC's advanced settings to prevent the adapter from entering low-power states.",
    tip: "After updating firmware, perform a factory reset followed by manual reconfiguration (do not restore from backup) to clear accumulated routing table corruption and stale configuration entries.",
  },
];

// ─────────────────────────────────────────────
// FAQ
// ─────────────────────────────────────────────
const faqs = [
  {
    question: "What is the most important gaming network optimization?",
    answer:
      "The single most impactful improvement is switching from Wi-Fi to a wired Ethernet connection. Wi-Fi introduces variable delay (jitter) from wireless retransmissions, co-channel interference, and background SSID scanning that causes lag spikes no software fix can eliminate. After that, enabling SQM (FQ-CoDel or CAKE) to fix bufferbloat is the second most impactful change, followed by configuring QoS to prioritize your gaming device.",
  },
  {
    question: "Does a gaming router actually improve performance?",
    answer:
      "A gaming router improves performance only if it provides better queue management (SQM/FQ-CoDel), lower CPU latency under load, and more granular QoS controls than a basic ISP router. Features like Geo-Filter, DumaOS, or ASUS Adaptive QoS can genuinely reduce lag when configured correctly. However, a basic router with OpenWrt and CAKE SQM will outperform most expensive gaming routers with poor queue management. Hardware does not matter as much as queue management configuration.",
  },
  {
    question: "What internet speed do I need for gaming?",
    answer:
      "Modern online games require surprisingly little bandwidth — typically 3–15 Mbps per active game session. The critical factors are not speed but latency (aim for under 50ms to your game server), jitter (under 5ms variance), packet loss (0%), and loaded latency/bufferbloat (under 20ms increase under full load). A 25 Mbps connection with excellent bufferbloat management will outperform a 500 Mbps connection with severe bufferbloat.",
  },
  {
    question: "How do I reduce ping in online games?",
    answer:
      "To reduce ping: (1) Switch to wired Ethernet. (2) Connect to game servers in your geographic region. (3) Eliminate bufferbloat with SQM. (4) Use a low-latency DNS resolver (Cloudflare 1.1.1.1). (5) Ensure no double NAT is present. (6) Avoid VPNs unless they specifically optimize routing paths. (7) Set QoS to prioritize your gaming device. If ping is still high after all local fixes, the limiting factor is your physical distance to the game server.",
  },
  {
    question: "Why does my ping spike during games?",
    answer:
      "Ping spikes during games are almost always caused by: (1) Bufferbloat — another device saturating your bandwidth, filling the router's buffer and delaying your gaming packets. (2) Wi-Fi background scanning — your wireless card periodically scans for new SSIDs, freezing for 100–300ms. (3) ISP node congestion during peak hours. The fastest diagnosis: run a continuous ping to 8.8.8.8 and watch it during gameplay. If it spikes exactly when your game lags, it is a local network or ISP issue.",
  },
  {
    question: "What DNS should I use for gaming?",
    answer:
      "Cloudflare DNS (1.1.1.1) consistently delivers the lowest DNS resolution latency globally and should be your first choice for gaming. Google DNS (8.8.8.8) is a reliable second option. Avoid using your ISP's default DNS — it is often geographically distant, slow to resolve, and may redirect failed lookups to ISP ad pages. Set your preferred DNS directly on your router so all gaming devices benefit without individual configuration.",
  },
  {
    question: "Does QoS actually help gaming?",
    answer:
      "Yes, but the type of QoS matters enormously. Traditional CoS QoS (device prioritization without SQM) prioritizes game packets within a bloated queue but does not reduce queue depth. It helps slightly but does not fix bufferbloat. SQM with FQ-CoDel or CAKE is true queue management — it actively keeps the buffer shallow, so gaming packets never wait more than 5–20ms even during full bandwidth saturation. SQM is dramatically more effective than traditional QoS.",
  },
  {
    question: "Should I use a VPN for gaming?",
    answer:
      "Only use a VPN for gaming if your ISP's routing to the game server is demonstrably poor (bad BGP peering, congested transit nodes). A gaming-specific VPN like ExitLag or Mudfish can bypass these inefficient paths. However, a VPN always adds at least 5–30ms of overhead, and if your ISP routing is already efficient, the VPN will only make things worse. Test with and without VPN using WinMTR to determine which path has lower hop latency.",
  },
  {
    question: "What is the ideal ping for online gaming?",
    answer:
      "Ideal ping ranges by game type: Under 20ms — imperceptible, competitive-level. 20–50ms — excellent for all games. 50–80ms — good for casual play. 80–120ms — noticeable delay in fast-paced shooters. 120–200ms — poor, affects all game types. Above 200ms — unplayable for competitive games. Note that ping stability (low jitter) is more important than the absolute ping value — a stable 60ms connection beats an unstable 30ms connection that spikes to 200ms.",
  },
];

// ─────────────────────────────────────────────
// Common Causes
// ─────────────────────────────────────────────
const commonCauses = [
  {
    title: "Wi-Fi Wireless Interference",
    desc: "Wireless signals from neighboring networks, walls, and appliances introduce variable delay and packet collisions that cause jitter and lag spikes.",
  },
  {
    title: "Bufferbloat (No SQM)",
    desc: "Default FIFO router queues fill completely under bandwidth load, causing 200–500ms latency spikes that break game server synchronization.",
  },
  {
    title: "Strict NAT / Double NAT",
    desc: "Cascaded routers or unconfigured port forwarding forces game traffic through relay servers with higher latency and connection instability.",
  },
  {
    title: "ISP Peak-Hour Congestion",
    desc: "Shared neighborhood CMTS or OLT nodes saturate during evening hours, causing packet drops and latency spikes outside your local network.",
  },
];

// ─────────────────────────────────────────────
// Quick Fix Checklist
// ─────────────────────────────────────────────
const quickFixChecklist = [
  "Switch from Wi-Fi to a wired Cat6 Ethernet cable.",
  "Enable SQM (FQ-CoDel or CAKE) in your router's QoS settings.",
  "Set SQM bandwidth caps to 85–90% of your measured line speed.",
  "Disable hardware NAT acceleration (CTF) so SQM can operate.",
  "Assign your gaming device a static IP and set it as highest QoS priority.",
  "Switch DNS to Cloudflare (1.1.1.1) on your router.",
  "Forward game ports or place console in DMZ to open your NAT type.",
  "Update your router firmware and PC NIC drivers.",
  "Run a bufferbloat test to verify your A–B grade.",
  "Run a packet loss test to confirm 0% drops after fixes.",
];

// ─────────────────────────────────────────────
// Full cluster link data
// ─────────────────────────────────────────────
const clusterLinks = [
  {
    category: "📡 Latency & Ping",
    articles: [
      { href: "/high-ping-fix", label: "High Ping Fix", desc: "Reduce your baseline latency to game servers" },
      { href: "/how-to-reduce-latency", label: "How to Reduce Latency", desc: "Complete latency reduction guide" },
      { href: "/gaming-lag-spikes-fix", label: "Gaming Lag Spikes Fix", desc: "Eliminate sudden ping spikes mid-game" },
    ],
  },
  {
    category: "📦 Packet Loss",
    articles: [
      { href: "/packet-loss-test", label: "Packet Loss Test", desc: "Diagnose packet drops step-by-step" },
      { href: "/how-to-fix-packet-loss", label: "How to Fix Packet Loss", desc: "Complete packet loss remediation" },
      { href: "/gaming-packet-loss-fix", label: "Gaming Packet Loss Fix", desc: "Fix drops in Warzone, Valorant, CS2" },
    ],
  },
  {
    category: "📈 Jitter & Instability",
    articles: [
      { href: "/gaming-jitter-fix", label: "Gaming Jitter Fix", desc: "Reduce packet delay variation" },
      { href: "/bufferbloat-fix", label: "Bufferbloat Fix", desc: "Configure SQM/FQ-CoDel/CAKE" },
      { href: "/bufferbloat-test", label: "Bufferbloat Test", desc: "Measure your A–F bufferbloat grade" },
    ],
  },
  {
    category: "🔧 Router & QoS",
    articles: [
      { href: "/best-router-settings-for-gaming", label: "Best Router Settings", desc: "Full gaming router optimization" },
      { href: "/best-qos-settings-for-gaming", label: "Best QoS Settings", desc: "Configure QoS for gaming traffic" },
    ],
  },
  {
    category: "🌐 NAT & Port Forwarding",
    articles: [
      { href: "/double-nat-detected", label: "Double NAT Fix", desc: "Resolve cascaded NAT issues" },
      { href: "/nat-type-strict", label: "Strict NAT Fix", desc: "Open your NAT for multiplayer" },
      { href: "/open-nat-type", label: "Open NAT Type", desc: "Achieve fully open NAT type" },
      { href: "/port-forwarding-not-working", label: "Port Forwarding Fix", desc: "Fix broken port forwarding rules" },
    ],
  },
  {
    category: "🔒 DNS",
    articles: [
      { href: "/best-dns-for-gaming", label: "Best DNS for Gaming", desc: "Fastest DNS servers for low latency" },
    ],
  },
];

// ─────────────────────────────────────────────
// Page Component
// ─────────────────────────────────────────────
export default function GamingNetworkOptimizationPage() {
  return (
    <TroubleshootingArticleShell
      h1="Gaming Network Optimization: The Complete 2026 Guide to Build the Fastest Gaming Connection"
      intro="Poor network performance kills competitive gaming. Lag spikes, high ping, packet loss, and jitter are not random — they have specific, fixable causes. This complete gaming network optimization guide covers every layer of your connection: local Wi-Fi vs. Ethernet, router bufferbloat and SQM configuration, QoS prioritization, NAT type and port forwarding, DNS optimization, and ISP-level diagnostics. Whether you play Valorant, Warzone, CS2, Fortnite, or Apex Legends, follow these steps to build the lowest-latency, most stable gaming connection possible."
      category="wifi"
      breadcrumbs={breadcrumbs}
      faqs={faqs}
      troubleshootingSteps={troubleshootingSteps}
      warningBanner={{
        title: "Start with Ethernet Before Changing Router Settings",
        text: "Before adjusting any router configuration, QoS, or DNS settings, physically connect your gaming device to your router via a Cat6 Ethernet cable. Many gaming network problems — lag spikes, jitter, packet loss — are caused entirely by Wi-Fi interference and disappear immediately with a wired connection. Diagnose on Ethernet first. Only configure router settings after confirming the issue persists on a wired link.",
      }}
      quickFixChecklist={quickFixChecklist}
      commonCauses={commonCauses}
      whenToContactISP="Contact your ISP when: (1) Wired Ethernet bypass tests show packet loss starting at hop 2 of a WinMTR/pathping trace — this means the ISP's own equipment is dropping packets before your data even leaves the ISP's network. (2) Your bufferbloat grade remains D or F even on a fully idle single-device wired connection, suggesting ISP CMTS-level queue bloat. (3) Peak-hour (7–11 PM) lag spikes occur consistently for several consecutive days — this indicates ISP node saturation requiring a node split. Always document with MTR logs, timestamps, and DSLReports results."
      severityLevel="medium"
    >
      <div className="space-y-12">

        {/* ── Section 1: Quick AI Answer ── */}
        <section
          className="glass-card p-6 border border-amber-950/20 bg-amber-950/5 rounded-2xl relative overflow-hidden"
          aria-label="Quick AI Answer"
        >
          <div className="absolute top-0 right-0 bg-[var(--brand-500)]/10 text-[var(--brand-400)] text-[10px] font-mono uppercase tracking-wider px-3 py-1 rounded-bl-lg font-bold">
            Quick AI Response
          </div>
          <h2 className="text-xs font-bold text-[var(--brand-400)] mb-3 uppercase tracking-wide">
            Fastest Gaming Network Fix
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            To instantly improve your gaming network: (1) Connect via <strong>Cat6 Ethernet</strong>. (2) Enable{" "}
            <strong>SQM (FQ-CoDel or CAKE)</strong> in your router&apos;s QoS settings with a cap at 90% of your measured speed. (3) Switch DNS to{" "}
            <strong>Cloudflare 1.1.1.1</strong> on your router. (4) Assign your gaming device the{" "}
            <strong>highest QoS priority</strong>. (5) Open your NAT type via port forwarding. Verify with a{" "}
            <Link href="/bufferbloat-test" className="text-[var(--brand-400)] hover:underline">
              bufferbloat test
            </Link>{" "}
            and a{" "}
            <Link href="/packet-loss-test" className="text-[var(--brand-400)] hover:underline">
              packet loss test
            </Link>.
          </p>
        </section>

        {/* ── Dynamic Tool ── */}
        <section aria-label="Interactive Gaming Network Optimizer">
          <div className="mb-4">
            <h2 className="text-base font-bold text-[var(--text-primary)]">
              Interactive Gaming Network Optimizer
            </h2>
            <p className="text-xs text-[var(--text-muted)] mt-1">
              Select your setup below to get a custom optimization plan for your specific router and connection type.
            </p>
          </div>
          <ConnectionOptimizerClient mode="latency" />
        </section>

        {/* ── Section 2: Network Quality Metrics ── */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            1. The Four Gaming Network Metrics You Must Measure First
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Before optimizing anything, measure your current connection quality. These four metrics determine your gaming experience — each has a different cause and a different fix:
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-xs text-[var(--text-secondary)]">
              <thead>
                <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                  <th className="px-4 py-3 text-left">Metric</th>
                  <th className="px-4 py-3 text-left">What It Measures</th>
                  <th className="px-4 py-3 text-left">Good Value</th>
                  <th className="px-4 py-3 text-left">Bad Value</th>
                  <th className="px-4 py-3 text-left">Fix Guide</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)] bg-[var(--bg-surface)]/20">
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--brand-400)]">Ping (Latency)</td>
                  <td className="px-4 py-3">Round-trip time to game server (ms)</td>
                  <td className="px-4 py-3 text-green-400">&lt;50ms</td>
                  <td className="px-4 py-3 text-red-400">&gt;100ms</td>
                  <td className="px-4 py-3"><Link href="/high-ping-fix" className="text-[var(--brand-400)] hover:underline">High Ping Fix</Link></td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--brand-400)]">Jitter</td>
                  <td className="px-4 py-3">Variance in ping between consecutive packets (ms)</td>
                  <td className="px-4 py-3 text-green-400">&lt;5ms</td>
                  <td className="px-4 py-3 text-red-400">&gt;30ms</td>
                  <td className="px-4 py-3"><Link href="/gaming-jitter-fix" className="text-[var(--brand-400)] hover:underline">Jitter Fix</Link></td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--brand-400)]">Packet Loss</td>
                  <td className="px-4 py-3">% of packets permanently discarded</td>
                  <td className="px-4 py-3 text-green-400">0%</td>
                  <td className="px-4 py-3 text-red-400">&gt;1%</td>
                  <td className="px-4 py-3"><Link href="/gaming-packet-loss-fix" className="text-[var(--brand-400)] hover:underline">Packet Loss Fix</Link></td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--brand-400)]">Bufferbloat</td>
                  <td className="px-4 py-3">Ping increase under full bandwidth load</td>
                  <td className="px-4 py-3 text-green-400">&lt;20ms (A grade)</td>
                  <td className="px-4 py-3 text-red-400">&gt;100ms (D/F grade)</td>
                  <td className="px-4 py-3"><Link href="/bufferbloat-fix" className="text-[var(--brand-400)] hover:underline">Bufferbloat Fix</Link></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Section 3: Optimization Priority ── */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            2. Gaming Network Optimization Priority Order
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Apply optimizations in this exact order for maximum impact. Each step builds on the previous one:
          </p>
          <div className="space-y-3">
            {[
              { priority: "01", color: "text-red-400 border-red-900/40", title: "Switch to Wired Ethernet", impact: "Eliminates Wi-Fi jitter, lag spikes, and packet collisions instantly. No configuration needed.", effort: "Low" },
              { priority: "02", color: "text-orange-400 border-orange-900/40", title: "Fix Bufferbloat (Enable SQM)", impact: "Eliminates load-induced lag spikes. Reduces loaded latency from 300ms to under 20ms.", effort: "Medium" },
              { priority: "03", color: "text-yellow-400 border-yellow-900/40", title: "Configure QoS Device Priority", impact: "Ensures gaming device gets first access to available bandwidth during household load.", effort: "Low" },
              { priority: "04", color: "text-blue-400 border-blue-900/40", title: "Open NAT Type (Port Forwarding)", impact: "Enables direct P2P connections to other players, reducing relay latency and matchmaking time.", effort: "Medium" },
              { priority: "05", color: "text-purple-400 border-purple-900/40", title: "Switch DNS to Cloudflare 1.1.1.1", impact: "Reduces DNS resolution time from 50–100ms to under 10ms per lookup.", effort: "Low" },
              { priority: "06", color: "text-[var(--brand-400)] border-[var(--brand-800)]", title: "Update Router Firmware & NIC Drivers", impact: "Clears memory leaks, queue bugs, and wireless scheduling issues.", effort: "Low" },
            ].map(({ priority, color, title, impact, effort }) => (
              <div key={priority} className={`flex gap-4 p-4 bg-[var(--bg-elevated)] border ${color.split(" ")[1]} rounded-xl`}>
                <div className={`flex-shrink-0 text-2xl font-black ${color.split(" ")[0]} font-mono opacity-40`}>{priority}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <p className="text-xs font-bold text-[var(--text-primary)]">{title}</p>
                    <span className="text-[10px] bg-[var(--bg-surface)] border border-[var(--border-subtle)] px-2 py-0.5 rounded-full text-[var(--text-muted)]">Effort: {effort}</span>
                  </div>
                  <p className="text-xs text-[var(--text-muted)] mt-1">{impact}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Section 4: Wi-Fi vs Ethernet ── */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            3. Wi-Fi vs. Ethernet for Gaming: A Full Comparison
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-xs text-[var(--text-secondary)]">
              <thead>
                <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                  <th className="px-4 py-3 text-left">Factor</th>
                  <th className="px-4 py-3 text-left">Wi-Fi 6 (802.11ax)</th>
                  <th className="px-4 py-3 text-left">Cat6 Ethernet</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)] bg-[var(--bg-surface)]/20">
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--brand-400)]">Typical Gateway Ping</td>
                  <td className="px-4 py-3 text-yellow-400">3–15ms</td>
                  <td className="px-4 py-3 text-green-400">&lt;1ms</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--brand-400)]">Jitter (Idle)</td>
                  <td className="px-4 py-3 text-yellow-400">2–8ms</td>
                  <td className="px-4 py-3 text-green-400">&lt;0.5ms</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--brand-400)]">Lag Spike Risk</td>
                  <td className="px-4 py-3 text-red-400">High (SSID scans, interference)</td>
                  <td className="px-4 py-3 text-green-400">Very Low</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--brand-400)]">Packet Loss Risk</td>
                  <td className="px-4 py-3 text-orange-400">Medium (collisions, weak signal)</td>
                  <td className="px-4 py-3 text-green-400">Near Zero</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--brand-400)]">Affected by Other Devices</td>
                  <td className="px-4 py-3 text-red-400">Yes (shared spectrum)</td>
                  <td className="px-4 py-3 text-green-400">No (dedicated line)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--brand-400)]">SQM Effectiveness</td>
                  <td className="px-4 py-3 text-yellow-400">Partial (wireless adds its own delay)</td>
                  <td className="px-4 py-3 text-green-400">Full (deterministic link)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--brand-400)]">Gaming Recommendation</td>
                  <td className="px-4 py-3 text-yellow-400">Acceptable if Ethernet impossible</td>
                  <td className="px-4 py-3 text-green-400">✅ Always preferred</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Section 5: Router Settings Summary ── */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            4. Essential Router Settings for Gaming Optimization
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { setting: "SQM / FQ-CoDel / CAKE", value: "Enabled", impact: "Eliminates bufferbloat — keeps queue latency under 5ms under full load", critical: true },
              { setting: "Hardware NAT (CTF)", value: "Disabled", impact: "Required for SQM to function — hardware offload bypasses software queue management", critical: true },
              { setting: "QoS Mode", value: "Adaptive or Traditional", impact: "Assigns gaming device highest traffic priority class", critical: true },
              { setting: "SQM Bandwidth Cap", value: "85–90% of measured speed", impact: "Prevents link from reaching physical saturation before SQM can constrain queue", critical: true },
              { setting: "DNS on WAN", value: "1.1.1.1 / 1.0.0.1", impact: "Reduces per-lookup DNS resolution delay from 50ms+ to under 10ms", critical: false },
              { setting: "DHCP Reservation", value: "Static IP for gaming device", impact: "Required for stable QoS rules and port forwarding targets", critical: false },
              { setting: "WAN MTU", value: "1492 (PPPoE) / 1500 (Cable)", impact: "Prevents packet fragmentation which causes silent large-payload packet drops", critical: false },
              { setting: "SIP ALG", value: "Disabled", impact: "Prevents ALG from modifying UDP game packets and causing connection errors", critical: false },
              { setting: "UPnP", value: "Enabled (if no manual port forwarding)", impact: "Allows games to open required ports automatically for Open NAT", critical: false },
              { setting: "Beamforming", value: "Enabled (Wi-Fi only)", impact: "Focuses wireless signal toward gaming device, improving signal quality", critical: false },
            ].map(({ setting, value, impact, critical }) => (
              <div key={setting} className={`p-4 bg-[var(--bg-elevated)] border rounded-xl ${critical ? "border-[var(--brand-800)]" : "border-[var(--border-subtle)]"}`}>
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <p className="text-xs font-bold text-[var(--text-primary)]">{setting}</p>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${critical ? "bg-[var(--brand-900)]/50 text-[var(--brand-400)]" : "bg-[var(--bg-surface)] text-[var(--text-muted)]"}`}>
                    {value}
                  </span>
                </div>
                <p className="text-xs text-[var(--text-muted)] mt-1.5">{impact}</p>
              </div>
            ))}
          </div>
          <p className="text-xs md:text-sm text-[var(--text-secondary)]">
            For brand-specific instructions, see our{" "}
            <Link href="/best-router-settings-for-gaming" className="text-[var(--brand-400)] hover:underline">Best Router Settings for Gaming guide</Link>{" "}
            and{" "}
            <Link href="/best-qos-settings-for-gaming" className="text-[var(--brand-400)] hover:underline">Best QoS Settings for Gaming guide</Link>.
          </p>
        </section>

        {/* ── Section 6: Game-Specific Latency Targets ── */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            5. Game-Specific Network Targets & Optimization Tips
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-xs text-[var(--text-secondary)]">
              <thead>
                <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                  <th className="px-4 py-3 text-left">Game</th>
                  <th className="px-4 py-3 text-left">Target Ping</th>
                  <th className="px-4 py-3 text-left">Key UDP Ports</th>
                  <th className="px-4 py-3 text-left">Protocol</th>
                  <th className="px-4 py-3 text-left">Special Note</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)] bg-[var(--bg-surface)]/20">
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--brand-400)]">Valorant</td>
                  <td className="px-4 py-3">&lt;35ms</td>
                  <td className="px-4 py-3 font-mono">7000–7500 UDP</td>
                  <td className="px-4 py-3">UDP</td>
                  <td className="px-4 py-3">128-tick servers; very sensitive to jitter</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--brand-400)]">Warzone / CoD</td>
                  <td className="px-4 py-3">&lt;50ms</td>
                  <td className="px-4 py-3 font-mono">3074, 27014–27050 UDP</td>
                  <td className="px-4 py-3">UDP</td>
                  <td className="px-4 py-3">Enable QoS port prioritization for UDP 3074</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--brand-400)]">CS2</td>
                  <td className="px-4 py-3">&lt;30ms</td>
                  <td className="px-4 py-3 font-mono">27005–27020 UDP</td>
                  <td className="px-4 py-3">UDP</td>
                  <td className="px-4 py-3">Use rate/cl_cmdrate 128 for higher tick</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--brand-400)]">Fortnite</td>
                  <td className="px-4 py-3">&lt;60ms</td>
                  <td className="px-4 py-3 font-mono">9000–9100 UDP</td>
                  <td className="px-4 py-3">UDP</td>
                  <td className="px-4 py-3">Set matchmaking region manually in settings</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--brand-400)]">Apex Legends</td>
                  <td className="px-4 py-3">&lt;60ms</td>
                  <td className="px-4 py-3 font-mono">37015, 37017 UDP</td>
                  <td className="px-4 py-3">UDP</td>
                  <td className="px-4 py-3">Use cl_showpos 1 to monitor in-game ping</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--brand-400)]">Rocket League</td>
                  <td className="px-4 py-3">&lt;40ms</td>
                  <td className="px-4 py-3 font-mono">7000–9000 UDP</td>
                  <td className="px-4 py-3">UDP</td>
                  <td className="px-4 py-3">Very sensitive to packet loss — prioritize 0%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Section 7: Complete Cluster Hub ── */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            6. Complete Gaming Network Optimization Guide Library
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Each article below is a deep-dive specialist guide for a specific gaming network problem. Use the category headers to navigate to the exact issue you are experiencing:
          </p>
          <div className="space-y-6">
            {clusterLinks.map(({ category, articles }) => (
              <div key={category}>
                <h3 className="text-sm font-bold text-[var(--text-primary)] mb-3">{category}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {articles.map(({ href, label, desc }) => (
                    <Link
                      key={href}
                      href={href}
                      className="glass-card p-4 border border-[var(--border-subtle)] rounded-xl hover:border-[var(--brand-800)] transition-all duration-200 group"
                    >
                      <p className="text-xs font-bold text-[var(--brand-400)] group-hover:text-[var(--brand-300)] transition-colors">
                        {label}
                      </p>
                      <p className="text-[11px] text-[var(--text-muted)] mt-1">{desc}</p>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </TroubleshootingArticleShell>
  );
}
