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
    "Bufferbloat Fix (2026) – Complete Guide to Eliminate Bufferbloat & Reduce Gaming Lag",
  description:
    "Learn how to fix bufferbloat on any router. Test your connection, configure FQ-CoDel or CAKE Smart Queue Management (SQM), set up ASUS Adaptive QoS, TP-Link QoS, Netgear, and OpenWrt to stop bufferbloat lag spikes in Warzone, Valorant, Fortnite, and CS2.",
  canonical: "/bufferbloat-fix",
  keywords: [
    "bufferbloat fix",
    "how to fix bufferbloat",
    "reduce bufferbloat",
    "network bufferbloat solution",
    "bufferbloat causing lag",
    "what is bufferbloat",
    "bufferbloat gaming",
    "fq-codel settings",
    "cake active queue management",
    "smart queue management router",
    "sqm openwrt bufferbloat",
    "asus adaptive qos bufferbloat",
    "tp-link qos bufferbloat",
    "netgear qos bufferbloat",
    "bufferbloat test",
    "bufferbloat vs latency",
    "bufferbloat vs jitter",
  ],
});

// ─────────────────────────────────────────────
// Breadcrumbs
// ─────────────────────────────────────────────
const breadcrumbs = [
  { name: "Gaming Net", url: "/problems" },
  { name: "Bufferbloat Fix", url: "/bufferbloat-fix" },
];

// ─────────────────────────────────────────────
// Troubleshooting Steps (Shell Sidebar)
// ─────────────────────────────────────────────
const troubleshootingSteps = [
  {
    title: "Test Your Bufferbloat Grade Before Anything Else",
    description:
      "Before changing any router settings, establish a baseline bufferbloat grade. Navigate to DSLReports Speed Test (dslreports.com/speedtest) or Waveform Bufferbloat Test and run a full test while streaming a YouTube video on another device. The tool grades your connection A–F based on how much your latency increases under load. A grade of C or lower confirms you have a bufferbloat problem. Screenshot or record the exact score to compare after applying fixes.",
    tip: "Run the test twice — once with all devices idle, and once with a simultaneous 4K YouTube stream on another device. The delta between both pings is your bufferbloat severity score.",
  },
  {
    title: "Enable SQM / FQ-CoDel on Your Router",
    description:
      "Smart Queue Management (SQM) using the FQ-CoDel or CAKE algorithm is the most effective fix for bufferbloat. Log into your router admin panel and navigate to the QoS or Traffic Management section. Enable SQM and select FQ-CoDel as the queue discipline. Set your upload and download caps to exactly 85–90% of your measured raw line speed (not your ISP plan speed). Apply settings and run the bufferbloat test again to confirm the grade has improved to A or B.",
    tip: "If your router does not natively support SQM/FQ-CoDel, flash it with OpenWrt firmware which offers full SQM support via the luci-app-sqm package.",
  },
  {
    title: "Set SQM Bandwidth to 90% of Real Line Speed",
    description:
      "A common SQM misconfiguration is using your ISP's advertised speed (e.g., 100 Mbps) instead of your actual measured throughput. Run a raw Ookla speed test with all other devices disconnected. Use the measured result (e.g., 94.2 Mbps down / 11.7 Mbps up) and set SQM to 90% of these values (84.7 Mbps down / 10.5 Mbps up). Using the advertised speed will fail to constrain peak traffic below the link saturation point, leaving bufferbloat intact.",
    tip: "Slightly undercapping your line (85–90%) gives the SQM algorithm room to enforce queue discipline before the physical link itself becomes the bottleneck, which it cannot manage.",
  },
  {
    title: "Disable Hardware NAT Acceleration When Using SQM",
    description:
      "Most modern routers include a hardware acceleration feature (labeled CTF, Cut-Through Forwarding, hardware NAT, or Flow Cache depending on brand). This hardware bypasses the CPU-based packet inspection pipeline entirely, which prevents SQM from reading and managing queue depths. Log into your router admin panel and disable hardware acceleration before activating SQM. On ASUS routers, disable it under WAN → Internet Connection → Enable NAT acceleration. On TP-Link, disable NAT Boost under Advanced System settings.",
    tip: "After disabling hardware NAT, your router's CPU usage will increase under full load, but your ping latency under load will decrease dramatically as SQM takes control of the queue.",
  },
  {
    title: "Switch to a Wired Cat6 Ethernet Connection",
    description:
      "Bufferbloat is dramatically amplified over wireless connections because Wi-Fi introduces its own internal queue and retransmission delays. Even with perfect SQM configuration, Wi-Fi adds unpredictable jitter on top of bufferbloat delays. Connect your gaming PC or console directly to the router using a shielded Cat6 or Cat6A Ethernet cable. This eliminates the wireless medium's variable retry delays and allows SQM to operate on a clean, deterministic link.",
    tip: "If running a cable is impossible, use a Powerline adapter or MoCA adapter rather than Wi-Fi. Both operate over existing home wiring and have far lower jitter than 2.4 GHz or 5 GHz Wi-Fi.",
  },
  {
    title: "Assign Your Gaming Device a Static IP and Highest QoS Priority",
    description:
      "If your router does not support SQM, configure traditional Class-of-Service (CoS) QoS. First, assign a static DHCP lease to your gaming device's MAC address so its IP never changes. Then navigate to the QoS rules section and assign that IP the highest priority class. Additionally, configure port-based priority for common game UDP port ranges (e.g., Valorant 7000–7500 UDP, Warzone 3074 UDP) so game traffic preempts background downloads even when the queue is saturated.",
    tip: "Traditional CoS QoS (without SQM) does not eliminate bufferbloat — it only prioritizes game packets within the bloated queue. For full elimination, SQM with FQ-CoDel or CAKE is required.",
  },
];

// ─────────────────────────────────────────────
// FAQ
// ─────────────────────────────────────────────
const faqs = [
  {
    question: "What is bufferbloat?",
    answer:
      "Bufferbloat is a networking phenomenon where excessive packet buffering inside a router, modem, or other network device causes high latency and jitter under load. When bandwidth is saturated — for example, when a large file is downloading — the router fills its internal memory buffer with queued packets. Instead of dropping excess packets to signal congestion (which would trigger TCP's rate-control), the router holds them, increasing the delay for all traffic — including real-time gaming packets — dramatically.",
  },
  {
    question: "How do I test for bufferbloat?",
    answer:
      "The most reliable bufferbloat test is the DSLReports Speed Test (dslreports.com/speedtest) or Waveform Bufferbloat Test. Both tools measure your latency while simultaneously saturating your upload and download bandwidth, then report a letter grade (A–F) based on how much your ping increased under load. A grade of A or B means minimal bufferbloat. A grade of C–F indicates a significant problem requiring SQM configuration on your router.",
  },
  {
    question: "What is the difference between bufferbloat and high ping?",
    answer:
      "High ping (latency) is a static, constant delay — your connection always adds a fixed 80ms baseline, for example. Bufferbloat is dynamic: your ping is fine (e.g., 15ms) when the link is idle, but it spikes to 300–500ms the moment a download saturates your bandwidth. Bufferbloat is identified by the gap between idle ping and loaded ping, while high ping is identified by a consistently elevated baseline latency regardless of load.",
  },
  {
    question: "What is the difference between bufferbloat and jitter?",
    answer:
      "Jitter is the packet delay variation — the inconsistency in how long individual packets take to arrive. Bufferbloat is the primary cause of jitter under load. When the router's buffer fills and empties dynamically as traffic flows through it, different packets experience different queue depths, resulting in varying delivery times (jitter). Fixing bufferbloat with SQM virtually eliminates load-induced jitter by keeping queue depths short and consistent.",
  },
  {
    question: "What is the difference between bufferbloat and packet loss?",
    answer:
      "Packet loss occurs when a data packet is permanently discarded and never reaches its destination. Bufferbloat causes packets to be severely delayed (sometimes hundreds of milliseconds) but not lost. However, in extreme bufferbloat scenarios, TCP connections may time out before delayed packets arrive, which can appear as packet loss to game clients. Fixing bufferbloat is the first step — run a packet loss test after to determine if true packet drops remain.",
  },
  {
    question: "What is FQ-CoDel?",
    answer:
      "FQ-CoDel (Fair Queuing Controlled Delay) is an Active Queue Management (AQM) algorithm designed specifically to fix bufferbloat. It works by maintaining multiple small per-flow queues (Fair Queuing) and dynamically dropping packets when queue delay exceeds a target threshold (CoDel — Controlled Delay). This forces TCP to slow down before the buffer overflows, keeping queue depths low and latency stable even under full bandwidth saturation.",
  },
  {
    question: "What is CAKE and how does it compare to FQ-CoDel?",
    answer:
      "CAKE (Common Applications Kept Enhanced) is a next-generation AQM algorithm that extends FQ-CoDel with additional features: traffic shaping (rate limiting), better handling of diffserv/DSCP priority markings, overhead compensation for PPPoE/ATM links, and per-host fairness (so one heavy user doesn't starve all others). CAKE is generally preferred over FQ-CoDel for home router deployments because it integrates shaping and queuing into a single pass, reducing CPU overhead.",
  },
  {
    question: "Does bufferbloat cause packet loss in games?",
    answer:
      "Not directly, but indirectly yes. Bufferbloat causes extreme latency spikes (200–500ms) that cause game clients to time out waiting for server acknowledgments. The game client then treats these delayed packets as lost and re-requests them, triggering what appears to be packet loss. In UDP-based games (Valorant, Warzone, CS2), where packets are not retransmitted, bufferbloat simply causes delayed input registration, rubberbanding, and desynchronization.",
  },
  {
    question: "Can bufferbloat happen on fiber optic connections?",
    answer:
      "Yes. Bufferbloat is a router-side problem, not a medium problem. Even a 10 Gbps fiber connection can suffer severe bufferbloat if the router's packet queue management is poorly configured. Fiber removes physical-layer signal noise and provides very high bandwidth headroom, but the router still has finite memory buffers that can bloat under load without proper AQM (SQM). The fix is always on the router — not the physical medium.",
  },
  {
    question: "Why does my ping spike when someone downloads something?",
    answer:
      "This is the classic symptom of bufferbloat. When another device saturates your bandwidth (downloading a game update, streaming 4K video, or uploading cloud backups), your router's buffer fills with queued download/upload packets. Your gaming packets must wait behind this backlog in the queue, delaying them by the time it takes to drain the queued packets. Enabling SQM (FQ-CoDel or CAKE) with a slight speed cap prevents the buffer from filling, keeping gaming packets at the front of the queue.",
  },
];

// ─────────────────────────────────────────────
// Common Causes
// ─────────────────────────────────────────────
const commonCauses = [
  {
    title: "Oversized Router Buffers",
    desc: "Router manufacturers ship devices with excessively large packet buffers to maximize throughput, but this causes severe queue-filling delays for real-time traffic.",
  },
  {
    title: "No Active Queue Management",
    desc: "Without FQ-CoDel or CAKE, routers use simple FIFO queues that fill completely before dropping packets, introducing hundreds of milliseconds of delay.",
  },
  {
    title: "Background Bandwidth Saturation",
    desc: "Downloads, cloud backups, software updates, and 4K streaming from other household devices saturate upload or download channels, triggering bufferbloat.",
  },
  {
    title: "Hardware NAT Bypassing SQM",
    desc: "Hardware-accelerated NAT offloads packet processing from the CPU, which prevents any software-based queue management from operating on those flows.",
  },
];

// ─────────────────────────────────────────────
// Quick Fix Checklist
// ─────────────────────────────────────────────
const quickFixChecklist = [
  "Run a DSLReports or Waveform bufferbloat test to get your baseline grade.",
  "Enable SQM (FQ-CoDel or CAKE) in your router's QoS or Traffic Management settings.",
  "Set SQM bandwidth caps to 85–90% of your actual measured speed (not your ISP plan).",
  "Disable hardware NAT/CTF acceleration so SQM can operate on all flows.",
  "Switch from Wi-Fi to a wired Cat6 Ethernet cable to remove wireless queue delays.",
  "Assign your gaming device a static IP and assign it highest QoS priority.",
  "Stop all background downloads and cloud sync operations during gaming sessions.",
  "Re-run the bufferbloat test after changes to confirm your grade improved to A or B.",
];

// ─────────────────────────────────────────────
// Page Component
// ─────────────────────────────────────────────
export default function BufferbloatFixPage() {
  return (
    <TroubleshootingArticleShell
      h1="Bufferbloat Fix: Complete Technical Guide to Eliminate Bufferbloat on Any Router"
      intro="Is your ping perfect when idle but explodes to 300–500ms the moment anyone on your network starts a download? That is bufferbloat — the single most common and most fixable cause of gaming lag spikes. This comprehensive technical guide explains exactly what bufferbloat is, how it differs from high ping, jitter, and packet loss, and provides step-by-step SQM configuration instructions for OpenWrt, ASUS, TP-Link, and Netgear routers using FQ-CoDel and CAKE algorithms."
      category="wifi"
      breadcrumbs={breadcrumbs}
      faqs={faqs}
      troubleshootingSteps={troubleshootingSteps}
      warningBanner={{
        title: "Disable Hardware NAT Before Enabling SQM",
        text: "The single most common reason SQM fails to fix bufferbloat is that hardware NAT acceleration is still active. Hardware NAT routes packets directly at the hardware level, completely bypassing the CPU-based SQM queue. Disable CTF (Cut-Through Forwarding), hardware NAT, or Flow Cache in your router's WAN settings FIRST before enabling FQ-CoDel or CAKE. If this is not done, SQM will appear active in the UI but will have zero effect on queue depths.",
      }}
      quickFixChecklist={quickFixChecklist}
      commonCauses={commonCauses}
      whenToContactISP="Contact your ISP if: 1) After enabling SQM with proper settings your bufferbloat grade remains D or F even on a fully idle network; 2) Your modem's signal stats page shows upstream power levels above 50 dBmV or downstream SNR below 33 dB; 3) A WinMTR trace shows high latency beginning at hop 2 (the ISP's first router) even with zero local traffic. ISP-side bufferbloat exists on congested CMTS nodes and requires a node split or infrastructure upgrade — escalate with documented WinMTR logs."
      severityLevel="high"
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
            How to Fix Bufferbloat Instantly
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            To eliminate bufferbloat, enable <strong>Smart Queue Management (SQM)</strong> with the{" "}
            <strong>FQ-CoDel or CAKE</strong> algorithm in your router&apos;s QoS settings.
            Set the upload and download speed caps to <strong>85–90% of your real measured speed</strong>.
            Disable hardware NAT acceleration (CTF/Flow Cache) so SQM can operate.
            Connect via <strong>Cat6 Ethernet</strong> to remove wireless queue delays.
            Re-test using <strong>DSLReports Speed Test</strong> to confirm your grade reaches A or B.
          </p>
        </section>

        {/* ── Dynamic Diagnostics Tool ── */}
        <section aria-label="Interactive Bufferbloat & Latency Optimizer">
          <div className="mb-4">
            <h2 className="text-base font-bold text-[var(--text-primary)]">
              Interactive Bufferbloat & Latency Optimizer
            </h2>
            <p className="text-xs text-[var(--text-muted)] mt-1">
              Configure your network environment below to generate a custom bufferbloat remediation plan tailored to your router and connection type.
            </p>
          </div>
          <ConnectionOptimizerClient mode="latency" />
        </section>

        {/* ── Section 2: What Is Bufferbloat ── */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            1. What Is Bufferbloat? The Technical Explanation
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Bufferbloat is a networking problem caused by the excessive buffering of data packets inside network devices — primarily routers and cable modems. It was formally named and documented by Jim Gettys and Kathleen Nichols in 2011 and is recognized as one of the most impactful, yet widely misdiagnosed, causes of internet latency.
          </p>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Under normal conditions, your router processes packets almost instantly. However, when your bandwidth is saturated — for example, when a family member streams a 4K movie or downloads a large game update — your router runs out of available transmission capacity. Instead of immediately dropping excess packets (which would trigger TCP&apos;s built-in congestion control to slow down), the router holds them in an internal memory buffer.
          </p>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            These buffers are often sized in <strong>hundreds of milliseconds of capacity</strong> to maximize bulk transfer throughput. This means real-time packets — like your gaming ping, VoIP calls, or video conferencing frames — must wait behind hundreds of queued background data packets before being transmitted. The result is <strong>sudden, severe latency spikes</strong> that appear only under load.
          </p>
          <div className="p-4 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl">
            <p className="text-xs text-[var(--text-muted)] font-mono">
              <span className="text-green-400">Idle connection:</span> Ping = 15ms ✅<br />
              <span className="text-red-400">Under bandwidth load:</span> Ping = 380ms ❌ ← This is bufferbloat
            </p>
          </div>
        </section>

        {/* ── Section 3: Bufferbloat vs Latency ── */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            2. Bufferbloat vs. Latency: Understanding the Difference
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Bufferbloat and high ping are both measured in milliseconds but represent fundamentally different network problems with different root causes and different fixes:
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-xs text-[var(--text-secondary)]">
              <thead>
                <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                  <th className="px-4 py-3 text-left">Property</th>
                  <th className="px-4 py-3 text-left">Bufferbloat</th>
                  <th className="px-4 py-3 text-left">High Ping (Latency)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)] bg-[var(--bg-surface)]/20">
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--brand-400)]">Behavior</td>
                  <td className="px-4 py-3">Good ping when idle; spikes under load</td>
                  <td className="px-4 py-3">Consistently high ping regardless of load</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--brand-400)]">Root Cause</td>
                  <td className="px-4 py-3">Router memory buffer queue overflow</td>
                  <td className="px-4 py-3">Physical distance, ISP routing hops, poor peering</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--brand-400)]">When Visible</td>
                  <td className="px-4 py-3">Only during bandwidth saturation</td>
                  <td className="px-4 py-3">Always present, even on idle connections</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--brand-400)]">Primary Fix</td>
                  <td className="px-4 py-3">SQM / FQ-CoDel / CAKE on router</td>
                  <td className="px-4 py-3">Server selection, VPN rerouting, ISP upgrade</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--brand-400)]">Test Tool</td>
                  <td className="px-4 py-3">DSLReports loaded latency test</td>
                  <td className="px-4 py-3">
                    <Link href="/high-ping-fix" className="text-[var(--brand-400)] hover:underline">
                      High Ping Fix Guide
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Section 4: Bufferbloat vs Jitter ── */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            3. Bufferbloat vs. Jitter: How Bloat Creates Jitter
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Jitter (Packet Delay Variation) is the inconsistency in how long consecutive packets take to arrive. Bufferbloat is the primary cause of jitter under load. Here&apos;s why:
          </p>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            When a router&apos;s buffer is partially filled, the queue depth changes dynamically — growing as new packets arrive and shrinking as packets are sent. Because your gaming packets arrive at different queue depths on each transmission cycle, each one experiences a different wait time inside the buffer. This variance in wait time is jitter.
          </p>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Fixing bufferbloat with SQM (by keeping the queue very short at all times) effectively eliminates load-induced jitter. For a deep dive into jitter-specific fixes, read our{" "}
            <Link href="/gaming-jitter-fix" className="text-[var(--brand-400)] hover:underline">
              Gaming Jitter Fix Guide
            </Link>.
          </p>
        </section>

        {/* ── Section 5: Bufferbloat vs Packet Loss ── */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            4. Bufferbloat vs. Packet Loss: A Critical Distinction
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Packet loss and bufferbloat produce similar in-game symptoms (rubberbanding, missed shots, desync) but have different causes and require different fixes:
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-xs text-[var(--text-secondary)]">
              <thead>
                <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                  <th className="px-4 py-3 text-left">Metric</th>
                  <th className="px-4 py-3 text-left">What Happens</th>
                  <th className="px-4 py-3 text-left">Game Symptom</th>
                  <th className="px-4 py-3 text-left">Fix</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)] bg-[var(--bg-surface)]/20">
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--brand-400)]">Bufferbloat</td>
                  <td className="px-4 py-3">Packets are severely delayed (200–500ms) in a full router queue</td>
                  <td className="px-4 py-3">Ping spikes, lag spikes, inputs delayed and then caught up rapidly</td>
                  <td className="px-4 py-3">SQM / FQ-CoDel / CAKE</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--brand-400)]">Packet Loss</td>
                  <td className="px-4 py-3">Packets are permanently discarded and never reach destination</td>
                  <td className="px-4 py-3">Input ignored, character warps, connection warnings</td>
                  <td className="px-4 py-3">
                    <Link href="/gaming-packet-loss-fix" className="text-[var(--brand-400)] hover:underline">
                      Packet Loss Fix
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Fix bufferbloat first, then run a{" "}
            <Link href="/packet-loss-test" className="text-[var(--brand-400)] hover:underline">
              packet loss test
            </Link>{" "}
            to check if true packet drops still exist after the queue management fix.
          </p>
        </section>

        {/* ── Section 6: Symptoms Table ── */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            5. Bufferbloat Symptoms Diagnostic Table
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Use this table to identify bufferbloat-specific symptoms and distinguish them from other common network issues:
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-xs text-[var(--text-secondary)]">
              <thead>
                <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                  <th className="px-4 py-3 text-left">Observed Symptom</th>
                  <th className="px-4 py-3 text-left">Likely Cause</th>
                  <th className="px-4 py-3 text-left">Confirms Bufferbloat?</th>
                  <th className="px-4 py-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)] bg-[var(--bg-surface)]/20">
                <tr>
                  <td className="px-4 py-3 font-semibold text-amber-400">Ping spikes when someone downloads</td>
                  <td className="px-4 py-3">Router buffer overflow caused by download saturation</td>
                  <td className="px-4 py-3"><span className="text-red-400 font-bold">Yes — Classic</span></td>
                  <td className="px-4 py-3">Enable SQM with download cap at 90% of max speed</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-amber-400">Idle ping is fine; loaded ping spikes 200ms+</td>
                  <td className="px-4 py-3">Large FIFO queue filling under bandwidth saturation</td>
                  <td className="px-4 py-3"><span className="text-red-400 font-bold">Yes — Definitive</span></td>
                  <td className="px-4 py-3">Enable FQ-CoDel or CAKE; disable hardware NAT</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-amber-400">Rubberbanding during peak hours only</td>
                  <td className="px-4 py-3">ISP node congestion or home network load saturation</td>
                  <td className="px-4 py-3"><span className="text-yellow-400 font-bold">Likely</span></td>
                  <td className="px-4 py-3">Enable SQM; contact ISP if persists during off-peak</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-amber-400">Lag spikes on upload (streaming, backup)</td>
                  <td className="px-4 py-3">Upload queue saturation (bufferbloat on upload path)</td>
                  <td className="px-4 py-3"><span className="text-red-400 font-bold">Yes — Upload-side</span></td>
                  <td className="px-4 py-3">Set upload SQM cap to 90% of measured upload speed</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-amber-400">High ping always, even when idle</td>
                  <td className="px-4 py-3">Physical distance to server, ISP routing inefficiency</td>
                  <td className="px-4 py-3"><span className="text-green-400 font-bold">No — Not Bufferbloat</span></td>
                  <td className="px-4 py-3">
                    See{" "}
                    <Link href="/high-ping-fix" className="text-[var(--brand-400)] hover:underline">
                      High Ping Fix Guide
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-amber-400">Consistent FPS drops with stable ping</td>
                  <td className="px-4 py-3">GPU/CPU hardware bottleneck</td>
                  <td className="px-4 py-3"><span className="text-green-400 font-bold">No — Not Network</span></td>
                  <td className="px-4 py-3">Update GPU drivers, reduce game graphics settings</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Section 7: DSL Bufferbloat ── */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            6. DSL Connection Bufferbloat: Why DSL Suffers Most
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            DSL (Digital Subscriber Line) connections are particularly vulnerable to bufferbloat because of two compounding factors:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-xs md:text-sm text-[var(--text-muted)]">
            <li>
              <strong>ATM Overhead:</strong> Older DSL connections use ATM (Asynchronous Transfer Mode) framing, which wraps IP packets in 53-byte fixed-size cells. A single 1500-byte IP packet must be fragmented across multiple ATM cells, adding per-packet overhead and introducing a fixed processing delay per cell.
            </li>
            <li>
              <strong>Asymmetric Speeds:</strong> DSL connections typically offer much lower upload bandwidth (e.g., 10 Mbps upload vs. 100 Mbps download). The extremely narrow upload pipe saturates almost instantly when sharing the connection with other devices, causing severe upload-path bufferbloat that spikes both upload and download latency.
            </li>
            <li>
              <strong>DSLAM Buffering:</strong> Your ISP&apos;s DSLAM (Digital Subscriber Line Access Multiplexer) also maintains buffers for traffic destined to your line. ISP-side DSLAM bufferbloat cannot be fixed by configuring your home router — it requires ISP-level AQM deployment.
            </li>
          </ul>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            For DSL users, always configure <strong>PPPoE overhead compensation</strong> in your SQM settings (typically set to +8 bytes for PPPoE header overhead) to ensure the SQM cap accounts for the protocol encapsulation correctly.
          </p>
        </section>

        {/* ── Section 8: Cable Bufferbloat ── */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            7. Cable (DOCSIS) Connection Bufferbloat
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Cable internet users often report worse bufferbloat than fiber users due to the shared-medium nature of coaxial cable infrastructure. Key factors:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-xs md:text-sm text-[var(--text-muted)]">
            <li>
              <strong>DOCSIS 3.0 CMTS Buffering:</strong> Older DOCSIS 3.0 CMTS equipment maintained large buffers per subscriber line. Under DOCSIS 3.0 profiles, individual subscribers can burst to their maximum contracted speed, flooding the CMTS-to-subscriber queue and triggering severe bufferbloat.
            </li>
            <li>
              <strong>DOCSIS 3.1 with Active Queue Management:</strong> Modern DOCSIS 3.1 deployments include Low Latency DOCSIS (LLD) which implements AQM at the CMTS level. If your ISP has deployed LLD, cable modem bufferbloat is reduced at the provider level. Ask your ISP if their network supports Low Latency DOCSIS.
            </li>
            <li>
              <strong>Cable Modem Buffers:</strong> Your cable modem itself also contains transmit buffers that can bloat. Enabling SQM on your router to cap traffic slightly below the modem&apos;s capacity prevents the modem&apos;s internal buffers from filling.
            </li>
          </ul>
        </section>

        {/* ── Section 9: Fiber Bufferbloat ── */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            8. Fiber Optic Bufferbloat: It Still Happens
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Fiber optic (FTTH) users frequently assume their connection is immune to bufferbloat. It is not. While fiber provides very low baseline latency and extremely high bandwidth, bufferbloat occurs at the <strong>router level</strong> — not the physical medium level.
          </p>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            On a 1 Gbps fiber connection, your router can fill a 64 MB transmit buffer in milliseconds when a file transfer is in progress. If your router runs a plain FIFO queue without AQM, gaming packets will be queued behind hundreds of megabytes of buffered file transfer data, introducing exactly the same bufferbloat spike as on a 50 Mbps DSL line.
          </p>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Fiber users should still enable SQM on their router. The good news is that the high bandwidth headroom means you can set SQM caps close to 98% of line speed (e.g., 980 Mbps of a 1 Gbps line) without impacting bulk transfer performance.
          </p>
        </section>

        {/* ── Section 10: Router Queue Management ── */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            9. Router Queue Management: How FIFO vs. AQM Works
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            The root cause of bufferbloat is simple queue design. Understanding the difference between a basic FIFO queue and an Active Queue Management system is the foundation of fixing bufferbloat:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card p-5 border border-red-900/30 bg-red-950/5 rounded-xl space-y-3">
              <h3 className="text-sm font-bold text-red-400">FIFO Queue (Default — Causes Bufferbloat)</h3>
              <ul className="list-disc pl-5 space-y-1.5 text-xs text-[var(--text-muted)]">
                <li>All packets are queued in order of arrival — First In, First Out.</li>
                <li>Buffer fills completely before any packet is dropped.</li>
                <li>Gaming packets wait behind hundreds of queued bulk-transfer packets.</li>
                <li>No distinction between real-time traffic and background downloads.</li>
                <li>Buffer drain can take 200–600ms, causing massive latency spikes.</li>
              </ul>
            </div>
            <div className="glass-card p-5 border border-green-900/30 bg-green-950/5 rounded-xl space-y-3">
              <h3 className="text-sm font-bold text-green-400">FQ-CoDel / CAKE AQM (Fix — Eliminates Bufferbloat)</h3>
              <ul className="list-disc pl-5 space-y-1.5 text-xs text-[var(--text-muted)]">
                <li>Multiple per-flow queues prevent any single flow from monopolizing the buffer.</li>
                <li>Packets are dropped proactively when queue delay exceeds a target (5ms).</li>
                <li>TCP interprets drops as a signal to reduce its transmission rate immediately.</li>
                <li>Real-time small packets (gaming) are always served within one queue cycle.</li>
                <li>Sustained queue depth is kept below 5–20ms even under full bandwidth saturation.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ── Section 11: FQ-CoDel ── */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            10. FQ-CoDel: How It Works and How to Configure It
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            FQ-CoDel (Fair Queuing Controlled Delay) is the most widely deployed AQM algorithm and is available on OpenWrt, many ASUS routers (via Merlin firmware), and Linux-based routers. It combines two techniques:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-xs md:text-sm text-[var(--text-muted)]">
            <li>
              <strong>Fair Queuing (FQ):</strong> Creates one queue per active network flow (identified by source IP, destination IP, protocol, and port). Ensures round-robin service between all flows, preventing a single heavy download from monopolizing the queue.
            </li>
            <li>
              <strong>Controlled Delay (CoDel):</strong> Monitors the time a packet spends sitting in the queue. If any packet waits longer than the target delay (default: 5ms), CoDel drops it. This signals TCP to reduce its send rate before the buffer overflows, keeping queue delays consistently below the target.
            </li>
          </ul>
          <div className="p-4 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl space-y-2">
            <h4 className="text-xs font-bold text-[var(--text-primary)]">FQ-CoDel Key Configuration Parameters</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full text-xs text-[var(--text-muted)]">
                <thead>
                  <tr className="text-[var(--text-primary)] font-semibold border-b border-[var(--border-subtle)]">
                    <th className="py-2 pr-4 text-left">Parameter</th>
                    <th className="py-2 pr-4 text-left">Default Value</th>
                    <th className="py-2 text-left">Recommended for Gaming</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-subtle)]/50">
                  <tr>
                    <td className="py-2 pr-4 font-mono">target</td>
                    <td className="py-2 pr-4">5ms</td>
                    <td className="py-2">5ms (keep default)</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-mono">interval</td>
                    <td className="py-2 pr-4">100ms</td>
                    <td className="py-2">100ms (keep default)</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-mono">quantum</td>
                    <td className="py-2 pr-4">1514 bytes</td>
                    <td className="py-2">300 bytes (favors small packets)</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-mono">limit</td>
                    <td className="py-2 pr-4">1000 packets</td>
                    <td className="py-2">300–500 packets</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── Section 12: CAKE ── */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            11. CAKE: The Next-Generation Bufferbloat Fix
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            CAKE (Common Applications Kept Enhanced) is the successor to FQ-CoDel and is generally considered the best available AQM for home routers. CAKE integrates traffic shaping (rate limiting) with queue management into a single algorithm, eliminating the need to configure a separate traffic shaper and queue discipline.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h4 className="text-xs font-bold text-[var(--brand-400)]">CAKE Advantages Over FQ-CoDel</h4>
              <ul className="list-disc pl-4 space-y-1 text-xs text-[var(--text-muted)]">
                <li>Integrated shaping — no separate HTB qdisc needed</li>
                <li>Per-host fairness prevents one user from hogging bandwidth</li>
                <li>Native DSCP/Diffserv priority support</li>
                <li>Overhead compensation for PPPoE, ATM, VLAN</li>
                <li>Better performance at very low speeds (&lt;10 Mbps links)</li>
              </ul>
            </div>
            <div className="p-4 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h4 className="text-xs font-bold text-[var(--brand-400)]">When to Use CAKE vs. FQ-CoDel</h4>
              <ul className="list-disc pl-4 space-y-1 text-xs text-[var(--text-muted)]">
                <li>Use CAKE on OpenWrt for best overall performance</li>
                <li>Use FQ-CoDel if CAKE is not available on your router firmware</li>
                <li>Both are dramatically better than FIFO or basic QoS</li>
                <li>CAKE is preferred for DSL/PPPoE due to overhead handling</li>
                <li>FQ-CoDel is sufficient for cable/fiber connections</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ── Section 13: OpenWrt SQM ── */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            12. SQM Configuration on OpenWrt (FQ-CoDel & CAKE)
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            OpenWrt provides the most complete SQM implementation available for consumer routers via the <code>luci-app-sqm</code> package. Follow these steps to configure SQM:
          </p>
          <div className="space-y-4">
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl space-y-3">
              <h3 className="text-sm font-bold text-[var(--text-primary)]">Step 1: Install SQM Package</h3>
              <pre className="p-3 bg-black/40 rounded font-mono text-[10px] text-green-400 overflow-x-auto">
{`opkg update
opkg install luci-app-sqm
/etc/init.d/rpcd restart`}
              </pre>
            </div>
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl space-y-3">
              <h3 className="text-sm font-bold text-[var(--text-primary)]">Step 2: Configure via LuCI UI</h3>
              <ol className="list-decimal pl-5 space-y-1.5 text-xs text-[var(--text-muted)]">
                <li>Navigate to <strong>Network → SQM QoS</strong> in the LuCI web interface.</li>
                <li>Click <strong>Add</strong> to create a new SQM instance.</li>
                <li>Set <strong>Interface</strong> to your WAN interface (e.g., <code>eth0.2</code> or <code>pppoe-wan</code>).</li>
                <li>Set <strong>Download speed</strong> to 90% of your measured download speed in kbit/s.</li>
                <li>Set <strong>Upload speed</strong> to 90% of your measured upload speed in kbit/s.</li>
                <li>Under <strong>Queueing Discipline</strong>, select <code>cake</code> (preferred) or <code>fq_codel</code>.</li>
                <li>Under <strong>Queue Setup Script</strong>, select <code>piece_of_cake.qos</code> for CAKE.</li>
                <li>Click <strong>Save &amp; Apply</strong> and enable the SQM service.</li>
              </ol>
            </div>
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl space-y-3">
              <h3 className="text-sm font-bold text-[var(--text-primary)]">Step 3: Verify Queue is Active</h3>
              <pre className="p-3 bg-black/40 rounded font-mono text-[10px] text-green-400 overflow-x-auto">
{`# Check active qdiscs on WAN interface
tc qdisc show dev eth0.2

# Expected output should show cake or fq_codel, not pfifo_fast`}
              </pre>
            </div>
          </div>
        </section>

        {/* ── Section 14: ASUS Adaptive QoS ── */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            13. ASUS Adaptive QoS: Bufferbloat Fix on ASUS Routers
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            ASUS routers running ASUSWRT or ASUSWRT-Merlin firmware offer Adaptive QoS which provides basic traffic prioritization. For true SQM-level bufferbloat control, ASUSWRT-Merlin is recommended as it supports FQ-CoDel.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl space-y-3">
              <h3 className="text-sm font-bold text-[var(--text-primary)]">ASUS Stock Firmware (Adaptive QoS)</h3>
              <ol className="list-decimal pl-5 space-y-1.5 text-xs text-[var(--text-muted)]">
                <li>Log into <code>router.asus.com</code> or <code>192.168.50.1</code>.</li>
                <li>Navigate to <strong>Adaptive QoS</strong> in the left panel.</li>
                <li>Enable QoS and select <strong>Adaptive QoS</strong> mode.</li>
                <li>Choose the <strong>Gaming</strong> priority template.</li>
                <li>Go to <strong>WAN → Internet Connection</strong> and set <strong>NAT Acceleration</strong> to <strong>Disable</strong>.</li>
                <li>Enter your real measured upload and download speeds in the bandwidth fields.</li>
              </ol>
            </div>
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl space-y-3">
              <h3 className="text-sm font-bold text-[var(--text-primary)]">ASUSWRT-Merlin (Full FQ-CoDel SQM)</h3>
              <ol className="list-decimal pl-5 space-y-1.5 text-xs text-[var(--text-muted)]">
                <li>Flash Merlin firmware from <code>asuswrt-merlin.net</code> (matches your ASUS model).</li>
                <li>In the Merlin UI, go to <strong>Adaptive QoS</strong> and enable it.</li>
                <li>In <strong>QoS Type</strong>, select <strong>Traditional QoS</strong>.</li>
                <li>SSH into the router and install Entware via the Merlin add-on script.</li>
                <li>Run <code>opkg install tc-full kmod-sched-cake</code> to install CAKE.</li>
                <li>Deploy a CAKE setup script targeting your WAN interface.</li>
              </ol>
            </div>
          </div>
        </section>

        {/* ── Section 15: TP-Link QoS ── */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            14. TP-Link QoS: Bufferbloat Fix on TP-Link Routers
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            TP-Link Archer and Deco series routers offer basic QoS. While they do not support native FQ-CoDel/CAKE, correct bandwidth limiting and device priority significantly reduces bufferbloat compared to the default FIFO queue:
          </p>
          <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl space-y-3">
            <ol className="list-decimal pl-5 space-y-2 text-xs text-[var(--text-muted)]">
              <li>Log into <code>tplinkwifi.net</code> or <code>192.168.0.1</code>.</li>
              <li>Navigate to <strong>Advanced → QoS</strong>.</li>
              <li>Toggle QoS <strong>ON</strong>.</li>
              <li>Enter your actual measured download and upload speeds (set to 90% of measured values).</li>
              <li>Click <strong>Add Priority Rule</strong> and select your gaming device by MAC address.</li>
              <li>Set priority to <strong>Highest</strong> and duration to <strong>Always</strong>.</li>
              <li>Navigate to <strong>Advanced → System Tools → System Parameters</strong> and disable <strong>NAT Boost</strong> to prevent hardware offloading from bypassing QoS rules.</li>
              <li>Save and reboot the router.</li>
            </ol>
            <p className="text-xs text-amber-400 mt-2">
              ⚠️ TP-Link&apos;s QoS does not include FQ-CoDel or CAKE. For full bufferbloat elimination, consider flashing OpenWrt if your model is supported.
            </p>
          </div>
        </section>

        {/* ── Section 16: Netgear QoS ── */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            15. Netgear QoS: Bufferbloat Fix on Nighthawk & DumaOS Routers
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Netgear Nighthawk routers and models running DumaOS (XR series) offer different levels of QoS control. DumaOS includes the Geo-Filter and Congestion Control — the latter is Netgear&apos;s branded bufferbloat management system:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl space-y-3">
              <h3 className="text-sm font-bold text-[var(--text-primary)]">Netgear Nighthawk (Standard UI)</h3>
              <ol className="list-decimal pl-5 space-y-1.5 text-xs text-[var(--text-muted)]">
                <li>Log into <code>routerlogin.net</code> or <code>192.168.1.1</code>.</li>
                <li>Navigate to <strong>Advanced → Setup → QoS Setup</strong>.</li>
                <li>Enable QoS and enter your upstream bandwidth limit.</li>
                <li>Add your gaming device to the Priority List.</li>
                <li>Set WMM (Wi-Fi Multimedia) to <strong>Enabled</strong> for wireless priority.</li>
              </ol>
            </div>
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl space-y-3">
              <h3 className="text-sm font-bold text-[var(--text-primary)]">Netgear XR / DumaOS (Congestion Control)</h3>
              <ol className="list-decimal pl-5 space-y-1.5 text-xs text-[var(--text-muted)]">
                <li>Open the DumaOS dashboard in your browser.</li>
                <li>Navigate to <strong>Congestion Control</strong>.</li>
                <li>Set the bandwidth sliders to <strong>70–80%</strong> of your measured line speed.</li>
                <li>Enable <strong>Always</strong> mode to apply congestion control permanently.</li>
                <li>In the Geo-Filter panel, add your gaming device and restrict connections to nearby servers to reduce routing latency.</li>
                <li>Enable <strong>Share Excess</strong> so bandwidth can be temporarily reclaimed by non-game devices when not gaming.</li>
              </ol>
            </div>
          </div>
        </section>

        {/* ── Section 17: Testing ── */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            16. How to Test Bufferbloat Before and After Your Fix
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Measure your bufferbloat grade before and after configuration changes to quantify the improvement. Use these tools and procedures:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h4 className="text-xs font-bold text-[var(--text-primary)]">DSLReports Speed Test</h4>
              <p className="text-xs text-[var(--text-muted)]">
                Visit <code>dslreports.com/speedtest</code>. Run the full test — it grades your connection A–F based on loaded latency increase. Target: <span className="text-green-400 font-bold">A or B</span>.
              </p>
            </div>
            <div className="p-4 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h4 className="text-xs font-bold text-[var(--text-primary)]">Waveform Bufferbloat Test</h4>
              <p className="text-xs text-[var(--text-muted)]">
                Visit <code>waveform.com/tools/bufferbloat</code>. Simultaneously runs upload/download saturation while measuring ICMP latency, showing exact ms increase under load.
              </p>
            </div>
            <div className="p-4 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h4 className="text-xs font-bold text-[var(--text-primary)]">Manual Ping Test Method</h4>
              <pre className="p-2 bg-black/40 rounded font-mono text-[10px] text-green-400 overflow-x-auto">
{`# Terminal: measure ping under load
ping 8.8.8.8 -t

# Simultaneously run in browser:
# Fast.com or Ookla Speedtest
# Watch for ping spikes during download`}
              </pre>
            </div>
          </div>

          {/* Acceptable Bufferbloat Table */}
          <h3 className="text-base font-bold text-[var(--text-primary)] mt-6">
            Bufferbloat Grade Reference Table
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-xs text-[var(--text-secondary)]">
              <thead>
                <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                  <th className="px-4 py-3 text-left">DSLReports Grade</th>
                  <th className="px-4 py-3 text-left">Loaded Latency Increase</th>
                  <th className="px-4 py-3 text-left">Gaming Suitability</th>
                  <th className="px-4 py-3 text-left">Action Required</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)] bg-[var(--bg-surface)]/20">
                <tr>
                  <td className="px-4 py-3 font-bold text-green-400">A+</td>
                  <td className="px-4 py-3">&lt;5ms increase under full load</td>
                  <td className="px-4 py-3">Excellent — competitive gaming</td>
                  <td className="px-4 py-3">No action needed</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-bold text-green-400">A</td>
                  <td className="px-4 py-3">5–20ms increase under full load</td>
                  <td className="px-4 py-3">Very good — casual &amp; competitive</td>
                  <td className="px-4 py-3">No action needed</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-bold text-yellow-400">B</td>
                  <td className="px-4 py-3">20–50ms increase under full load</td>
                  <td className="px-4 py-3">Acceptable — casual gaming</td>
                  <td className="px-4 py-3">Minor SQM tuning recommended</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-bold text-orange-400">C</td>
                  <td className="px-4 py-3">50–100ms increase under full load</td>
                  <td className="px-4 py-3">Poor — noticeable lag spikes</td>
                  <td className="px-4 py-3">Enable SQM immediately</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-bold text-red-400">D</td>
                  <td className="px-4 py-3">100–300ms increase under full load</td>
                  <td className="px-4 py-3">Bad — severe game desync</td>
                  <td className="px-4 py-3">Enable SQM + disable hardware NAT</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-bold text-red-600">F</td>
                  <td className="px-4 py-3">&gt;300ms increase under full load</td>
                  <td className="px-4 py-3">Unplayable — constant lag spikes</td>
                  <td className="px-4 py-3">Full SQM overhaul or router replacement</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Section 18: Best SQM Settings ── */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            17. Best Bufferbloat Fix Settings by Connection Type
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-xs text-[var(--text-secondary)]">
              <thead>
                <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                  <th className="px-4 py-3 text-left">Connection Type</th>
                  <th className="px-4 py-3 text-left">Recommended Algorithm</th>
                  <th className="px-4 py-3 text-left">Speed Cap</th>
                  <th className="px-4 py-3 text-left">Special Settings</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)] bg-[var(--bg-surface)]/20">
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--brand-400)]">Fiber (FTTH)</td>
                  <td className="px-4 py-3">CAKE</td>
                  <td className="px-4 py-3">95% of measured speed</td>
                  <td className="px-4 py-3">No overhead compensation needed</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--brand-400)]">Cable (DOCSIS)</td>
                  <td className="px-4 py-3">CAKE or FQ-CoDel</td>
                  <td className="px-4 py-3">88–90% of measured speed</td>
                  <td className="px-4 py-3">Adjust for burst traffic variation</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--brand-400)]">DSL (PPPoE)</td>
                  <td className="px-4 py-3">CAKE (preferred for DSL)</td>
                  <td className="px-4 py-3">85–90% of measured speed</td>
                  <td className="px-4 py-3">Enable PPPoE overhead (+8 bytes)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--brand-400)]">5G Home Internet</td>
                  <td className="px-4 py-3">FQ-CoDel</td>
                  <td className="px-4 py-3">80–85% of measured speed</td>
                  <td className="px-4 py-3">Higher variance; more aggressive cap</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--brand-400)]">Starlink</td>
                  <td className="px-4 py-3">CAKE with adaptive shaping</td>
                  <td className="px-4 py-3">70–80% of measured speed</td>
                  <td className="px-4 py-3">High link variability; conservative cap required</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Section 19: Internal Linking ── */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            18. Complete Gaming Network Troubleshooting Resources
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Bufferbloat is closely linked to other network quality problems. Use these guides to build a comprehensive fix for your gaming connection:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { href: "/gaming-lag-spikes-fix", label: "Gaming Lag Spikes Fix", desc: "Diagnose and eliminate sudden latency spikes" },
              { href: "/gaming-jitter-fix", label: "Gaming Jitter Fix", desc: "Fix packet delay variation and unstable ping" },
              { href: "/gaming-packet-loss-fix", label: "Gaming Packet Loss Fix", desc: "Stop dropped packets in Warzone, Valorant, CS2" },
              { href: "/high-ping-fix", label: "High Ping Fix", desc: "Reduce baseline latency to game servers" },
              { href: "/how-to-reduce-latency", label: "How to Reduce Latency", desc: "Complete network latency reduction guide" },
              { href: "/best-qos-settings-for-gaming", label: "Best QoS Settings", desc: "Optimize your router QoS for gaming" },
              { href: "/best-router-settings-for-gaming", label: "Best Router Settings", desc: "Full gaming router optimization guide" },
              { href: "/packet-loss-test", label: "Packet Loss Test", desc: "Check your connection for packet drops" },
              { href: "/how-to-fix-packet-loss", label: "How to Fix Packet Loss", desc: "Step-by-step packet loss remediation" },
              { href: "/double-nat-detected", label: "Double NAT Fix", desc: "Resolve cascaded NAT issues" },
              { href: "/nat-type-strict", label: "Strict NAT Fix", desc: "Open your NAT type for multiplayer" },
              { href: "/port-forwarding-not-working", label: "Port Forwarding Fix", desc: "Fix port forwarding configuration" },
            ].map(({ href, label, desc }) => (
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
        </section>

      </div>
    </TroubleshootingArticleShell>
  );
}
