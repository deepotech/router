import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import TroubleshootingArticleShell from "@/components/tools/TroubleshootingArticleShell";
import ConnectionOptimizerClient from "@/components/tools/ConnectionOptimizerClient";
import {
  Zap,
  Wifi,
  Settings,
  Activity,
  Shield,
  CheckCircle2,
  AlertTriangle,
  Network,
  Gamepad2,
  Server,
  HardDrive,
  Info,
  ArrowRight,
  TrendingDown,
  Gauge,
  Sliders,
  AlertCircle,
  Layers,
  Cpu,
} from "lucide-react";

// =============================================================
// Premium SEO Metadata
// =============================================================

export const metadata: Metadata = buildMetadata({
  title: "Ethernet vs Wi-Fi Gaming: Latency, Jitter & Packet Loss Guide | RouterVia",
  description:
    "Is Ethernet really better for gaming? We compare wired vs wireless latency, jitter, packet loss, and bufferbloat across Wi-Fi 5, 6, 6E, and 7 with real-world gaming benchmarks.",
  canonical: "/ethernet-vs-wifi-gaming",
  keywords: [
    "ethernet vs wifi gaming",
    "is ethernet better for gaming",
    "gaming ethernet vs wifi",
    "wired vs wireless gaming",
    "best connection for gaming",
    "ethernet latency gaming",
    "wifi gaming latency",
    "ethernet packet loss",
    "wifi packet loss gaming",
    "ethernet jitter gaming",
    "wifi interference gaming",
    "wired connection gaming",
    "gaming network optimization",
  ],
});

// =============================================================
// Breadcrumbs
// =============================================================

const breadcrumbs = [
  { name: "Gaming Tools", url: "/nat-type-checker" },
  { name: "Ethernet vs Wi-Fi Gaming", url: "/ethernet-vs-wifi-gaming" },
];

// =============================================================
// Common Causes
// =============================================================

const commonCauses = [
  {
    title: "Half-Duplex Airtime Contention",
    desc: "Wi-Fi devices share the same radio channel and must wait for it to be silent before transmitting, creating unpredictable queue delays.",
  },
  {
    title: "RF Interference & Signal Decay",
    desc: "Microwaves, Bluetooth headsets, and neighboring routers corrupt wireless frames at the physical layer, forcing costly retransmissions.",
  },
  {
    title: "DFS Channel Switching",
    desc: "Wi-Fi 5GHz DFS channels must yield to radar signals. When triggered, the router drops all connections for up to 60 seconds to scan for interference.",
  },
  {
    title: "Mesh Roaming Handoffs",
    desc: "When moving between mesh nodes, the device temporarily disconnects during re-association, causing a latency spike of 500ms to 2,000ms mid-match.",
  },
];

// =============================================================
// Quick Fix Checklist
// =============================================================

const quickFixChecklist = [
  "Connect your gaming device with a Cat6 Ethernet cable for guaranteed zero-interference packet delivery.",
  "If cabling is impossible, use MoCA 2.5 adapters over existing coaxial lines — adds less than 1ms latency.",
  "Switch your Wi-Fi band to 6GHz (Wi-Fi 6E/7) which is interference-free and uncrowded.",
  "Enable Smart Queue Management (SQM / CAKE) on your router to prevent bufferbloat under load.",
  "Assign your gaming device a Static IP and place it in the highest QoS priority class.",
  "Disable 'Green Ethernet' / 'Energy Efficient Ethernet (EEE)' on your network adapter to prevent port sleep delays.",
];

// =============================================================
// Troubleshooting Steps
// =============================================================

const troubleshootingSteps = [
  {
    title: "Run a Continuous Ping Test to Isolate Local vs External Lag",
    description:
      "Open a terminal and run: ping -t 8.8.8.8 (Windows) or ping 8.8.8.8 (macOS/Linux). Run this for 5 minutes while actively streaming video on another device. Note any spikes above your baseline. If spikes only occur under local load, your issue is bufferbloat — fixable with QoS. If they occur at all times, it is an ISP routing problem.",
    tip: "Simultaneously ping your router gateway (usually 192.168.1.1) and compare. If gateway ping is stable but external ping spikes, the bottleneck is your ISP link — not your Wi-Fi.",
  },
  {
    title: "Measure Jitter with a Bufferbloat Test",
    description:
      "Visit waveform.com/tools/bufferbloat and run the test. It measures your latency increase under full download and upload load. An Ethernet connection with SQM active should score an 'A' grade (+0ms to +5ms). Wi-Fi without QoS typically scores 'C' or 'D' (+50ms to +200ms).",
    tip: "If your bufferbloat grade is poor on both Ethernet and Wi-Fi, the problem is your router's queue management — not the cable type.",
  },
  {
    title: "Check for Physical Layer Packet Loss",
    description:
      "Run: pathping 8.8.8.8 (Windows) or mtr 8.8.8.8 (Linux/macOS). Look for packet loss at hop 1 (your router). If loss appears at the first hop, it indicates a physical cable fault, a faulty network card, or wireless interference at the driver level.",
    tip: "On Wi-Fi, even 0.5% packet loss at the first hop will cause noticeable hitching in games using 128-tick rate servers.",
  },
  {
    title: "Configure QoS and Upload Queue Management",
    description:
      "Log into your router admin panel. Enable Smart Queue Management (SQM) and select CAKE as the queue discipline. Set the upload and download caps to 90% of your measured speed test results. This prevents your modem's buffer from saturating, which is the leading cause of ping spikes under load.",
    tip: "For full SQM configuration instructions, see our dedicated guide on Best QoS Settings for Gaming.",
  },
];

// =============================================================
// FAQ Data
// =============================================================

const faqs = [
  {
    question: "Is Ethernet always better than Wi-Fi for gaming?",
    answer:
      "Yes, in terms of raw latency stability and reliability, Ethernet is always superior. Wired connections operate in full-duplex mode with zero interference, delivering sub-millisecond local latency and 0% packet loss. However, Wi-Fi 7 with Multi-Link Operation (MLO) on the 6GHz band can approach Ethernet performance under ideal conditions — but only when there is no interference and no other devices active.",
  },
  {
    question: "Can Wi-Fi 7 beat Ethernet for gaming?",
    answer:
      "Under perfect lab conditions, Wi-Fi 7 with MLO active can deliver sub-millisecond local latency — close to Ethernet. However, real homes have walls, microwaves, Bluetooth devices, and neighboring networks that degrade wireless performance. In real-world competitive gaming environments, Ethernet remains more reliable.",
  },
  {
    question: "Does Ethernet reduce ping?",
    answer:
      "Ethernet reduces your local network latency (the time your packet takes to travel from your PC to your router) by 2ms to 15ms compared to Wi-Fi. It cannot reduce your external ping from your home to the game server. However, Ethernet prevents your ping from spiking under household load, which is what most gamers call 'lag'.",
  },
  {
    question: "Does Ethernet eliminate packet loss?",
    answer:
      "Yes. Local packet loss on a wired Ethernet connection is virtually 0%. The copper wiring is fully shielded, and data is protected by the Ethernet frame CRC checksum. If packet loss appears on your wired connection, it originates from your ISP or the external routing path, not your local network.",
  },
  {
    question: "Is Cat8 worth it for gaming?",
    answer:
      "No. Cat8 cables support 40Gbps speeds over very short distances (under 30 meters) and require fully shielded, grounded RJ45 connectors. They are designed for data center server rack connections. For home gaming over distances under 100 meters, Cat6 or Cat6a is more than sufficient — and far more flexible and easier to route.",
  },
  {
    question: "Is Wi-Fi 6 good enough for esports?",
    answer:
      "Wi-Fi 6 is a significant improvement over Wi-Fi 5, especially in crowded environments thanks to OFDMA scheduling. However, it still operates on the congested 5GHz band, which is shared with neighboring networks. For competitive esports where every millisecond matters, a wired connection is still preferable.",
  },
  {
    question: "Does Ethernet improve hit registration in FPS games?",
    answer:
      "Yes. In high-tick-rate shooters like Valorant (128-tick) and CS2, your client sends coordinate and input packets to the server many times per second. If any of these packets are delayed or lost over Wi-Fi, the server processes a stale state — causing your shots to miss even though they appear to connect on your screen. Ethernet's guaranteed delivery prevents this desync.",
  },
  {
    question: "What is the best connection type for gaming?",
    answer:
      "Ranked best to worst: 1) Direct Ethernet (Cat6/Cat6a), 2) MoCA 2.5 over coaxial cable, 3) Wi-Fi 7 (6GHz band, MLO), 4) Wi-Fi 6E (6GHz band), 5) Wi-Fi 6 (5GHz band), 6) Powerline (AV2000), 7) Wi-Fi 5 (2.4GHz band).",
  },
  {
    question: "Is Powerline better than Wi-Fi for gaming?",
    answer:
      "Powerline adapters are generally more stable than Wi-Fi under heavy household wireless congestion, since they bypass airtime contention. However, electrical wiring is not shielded and is highly susceptible to noise from appliances. In most homes, modern Wi-Fi 6E or Wi-Fi 7 on the 6GHz band will outperform Powerline in terms of latency and jitter.",
  },
  {
    question: "Can Ethernet fix lag spikes?",
    answer:
      "Ethernet can fix lag spikes caused by local wireless interference, airtime contention, or mesh roaming handoffs. It cannot fix lag spikes caused by ISP congestion, game server overload, or poor routing between your ISP and the game server's data center.",
  },
];

// =============================================================
// Page Component
// =============================================================

export default function EthernetVsWifiGamingPage() {
  return (
    <TroubleshootingArticleShell
      h1="Ethernet vs. Wi-Fi for Gaming: The Complete Latency & Packet Loss Guide"
      intro="Should you run an Ethernet cable to your gaming PC or console, or is your home Wi-Fi good enough? The answer depends on your specific setup, the games you play, and what network problems you are experiencing. In this in-depth technical guide, we analyze the physics of wired and wireless connections, measure latency and jitter across Wi-Fi standards, compare cable categories, and provide real-world gaming benchmark data to help you make the right decision."
      category="wifi"
      breadcrumbs={breadcrumbs}
      faqs={faqs}
      troubleshootingSteps={troubleshootingSteps}
      warningBanner={{
        title: "Half-Duplex: The Core Wi-Fi Limitation for Gaming",
        text: "All Wi-Fi standards — including Wi-Fi 7 — are half-duplex on the wireless medium. Your device cannot send and receive packets simultaneously over the air. It must wait for the channel to be free before transmitting. This fundamental physics constraint introduces unpredictable airtime wait times that Ethernet completely avoids by using separate wire pairs for transmit and receive.",
      }}
      quickFixChecklist={quickFixChecklist}
      commonCauses={commonCauses}
      whenToContactISP="Contact your ISP if packet loss and latency spikes persist even when your gaming PC is connected directly to the modem via Ethernet, bypassing your router entirely. This indicates a fault on the physical line between your home and the ISP exchange."
      severityLevel="medium"
    >
      <div className="space-y-12">

        {/* SECTION 1: Quick AI Answer */}
        <section
          className="glass-card p-6 border border-cyan-950/20 bg-cyan-950/5 rounded-2xl relative overflow-hidden space-y-5"
          aria-label="Quick AI Answer"
        >
          <div className="absolute top-0 right-0 bg-[var(--brand-500)]/10 text-[var(--brand-400)] text-[10px] font-mono uppercase tracking-wider px-3 py-1 rounded-bl-lg font-bold">
            AI Summary
          </div>
          <h2 className="text-sm font-bold text-[var(--brand-400)] uppercase tracking-wide flex items-center gap-1.5">
            <Zap size={16} /> Quick Answer: Ethernet vs. Wi-Fi by Use Case
          </h2>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-[var(--text-muted)]">
            <li><strong>Competitive Gaming (Valorant, CS2, Warzone):</strong> Ethernet is mandatory. Wireless jitter and packet loss will cost you gunfights.</li>
            <li><strong>Casual Gaming (RPGs, turn-based, indie):</strong> Wi-Fi on 5GHz or 6GHz is acceptable.</li>
            <li><strong>Streaming + Gaming simultaneously:</strong> Ethernet is strongly recommended to prevent upload saturation over a shared wireless medium.</li>
            <li><strong>Console / Mobile in another room:</strong> Wi-Fi 6E or 7 on the 6GHz band; use MoCA adapters if coaxial outlets are nearby.</li>
          </ul>

          <div className="overflow-x-auto border border-[var(--border-subtle)] rounded-xl">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-xs text-[var(--text-secondary)]">
              <thead>
                <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                  <th className="px-4 py-3 text-left">User Type</th>
                  <th className="px-4 py-3 text-left">Recommended Connection</th>
                  <th className="px-4 py-3 text-left">Reason</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)] bg-[var(--bg-surface)]/20">
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">Casual Gamer</td>
                  <td className="px-4 py-3">Wi-Fi 6 / 6E (5GHz or 6GHz)</td>
                  <td className="px-4 py-3 text-[var(--text-muted)]">Low packet rate; occasional jitter is non-critical.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">Competitive FPS Player</td>
                  <td className="px-4 py-3 font-semibold text-emerald-400">Wired Ethernet (Cat6)</td>
                  <td className="px-4 py-3 text-[var(--text-muted)]">128-tick servers demand zero jitter and &lt;1ms local latency.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">Streamer</td>
                  <td className="px-4 py-3 font-semibold text-emerald-400">Wired Ethernet (Cat6)</td>
                  <td className="px-4 py-3 text-[var(--text-muted)]">Upload stream competes with game packets on half-duplex Wi-Fi.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">Esports Player</td>
                  <td className="px-4 py-3 font-semibold text-emerald-400">Wired Ethernet (Cat6a)</td>
                  <td className="px-4 py-3 text-[var(--text-muted)]">Consistent sub-millisecond local latency; no airtime variance.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">Large Household</td>
                  <td className="px-4 py-3">Ethernet + Wi-Fi 7 (per device)</td>
                  <td className="px-4 py-3 text-[var(--text-muted)]">Wire gaming PCs; use Wi-Fi 7 for phones and casual devices.</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* ── 5-Metric Comparison Matrix ── */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wide mt-2">Full Metric Comparison Matrix</h3>
            <div className="overflow-x-auto border border-[var(--border-subtle)] rounded-xl">
              <table className="min-w-full divide-y divide-[var(--border-subtle)] text-xs text-[var(--text-secondary)]">
                <thead>
                  <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                    <th className="px-4 py-3 text-left">Metric</th>
                    <th className="px-4 py-3 text-left">Ethernet</th>
                    <th className="px-4 py-3 text-left">Wi-Fi 5</th>
                    <th className="px-4 py-3 text-left">Wi-Fi 6</th>
                    <th className="px-4 py-3 text-left">Wi-Fi 7</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-subtle)] bg-[var(--bg-surface)]/20">
                  <tr>
                    <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">Local Latency</td>
                    <td className="px-4 py-3 text-emerald-400 font-bold">&lt; 0.5 ms</td>
                    <td className="px-4 py-3 text-red-500">8 – 15 ms</td>
                    <td className="px-4 py-3 text-amber-500">4 – 10 ms</td>
                    <td className="px-4 py-3 text-emerald-400">1 – 3 ms</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">Jitter</td>
                    <td className="px-4 py-3 text-emerald-400 font-bold">&lt; 0.2 ms</td>
                    <td className="px-4 py-3 text-red-500">5 – 25 ms</td>
                    <td className="px-4 py-3 text-amber-500">2 – 10 ms</td>
                    <td className="px-4 py-3 text-emerald-400">0.5 – 2 ms</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">Packet Loss (local)</td>
                    <td className="px-4 py-3 text-emerald-400 font-bold">~0%</td>
                    <td className="px-4 py-3 text-red-500">0.5 – 3%</td>
                    <td className="px-4 py-3 text-amber-500">0.1 – 1%</td>
                    <td className="px-4 py-3 text-emerald-400">&lt; 0.1%</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">Stability Under Load</td>
                    <td className="px-4 py-3 text-emerald-400 font-bold">Excellent</td>
                    <td className="px-4 py-3 text-red-500">Poor</td>
                    <td className="px-4 py-3 text-amber-500">Fair</td>
                    <td className="px-4 py-3 text-emerald-400">Good</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">Competitive Gaming Score</td>
                    <td className="px-4 py-3 text-emerald-400 font-bold">★★★★★</td>
                    <td className="px-4 py-3 text-red-500">★★☆☆☆</td>
                    <td className="px-4 py-3 text-amber-500">★★★☆☆</td>
                    <td className="px-4 py-3 text-emerald-400">★★★★☆</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Interactive Tool */}
        <section className="space-y-4" aria-label="Interactive Latency Optimizer">
          <div>
            <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
              <Sliders size={18} className="text-cyan-400" />
              Analyze Your Connection Latency Profile
            </h2>
            <p className="text-xs text-[var(--text-muted)] mt-1">
              Select your connection type and bandwidth to calculate your latency budget, jitter targets, and optimal QoS queue configuration.
            </p>
          </div>
          <ConnectionOptimizerClient mode="latency" />
        </section>

        {/* SECTION 2: What Actually Happens When You Press a Key? */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Gamepad2 size={18} className="text-cyan-400" />
            1. What Actually Happens When You Press a Key?
          </h2>
          <div className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed space-y-3">
            <p>
              Every action you take in a multiplayer game — pressing W to move, clicking to shoot — triggers a precise chain of events. Understanding this chain reveals exactly where Wi-Fi and Ethernet diverge:
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            {[
              { step: "1", label: "Input Registered", desc: "Your keyboard or mouse generates an interrupt. The game client processes your input and packs it into a small UDP datagram (typically 64 to 512 bytes)." },
              { step: "2", label: "Local Transmission", desc: "The packet travels from your PC to your router. Over Ethernet: &lt;0.1ms. Over Wi-Fi: the device must wait for the channel to clear (0ms to 15ms variable delay)." },
              { step: "3", label: "Router NAT & Queue", desc: "Your router translates your private IP to your public IP and places the packet in its outbound queue. With SQM active, game UDP packets jump to the front." },
              { step: "4", label: "ISP Routing", desc: "The packet travels through your ISP's network, bouncing between routing nodes to reach the game server's data center." },
              { step: "5", label: "Server Processing", desc: "The game server processes your input, updates the world state, and sends back a response packet containing all other player coordinates." },
              { step: "6", label: "Return Path", desc: "The server's response travels the reverse path. On Wi-Fi, this return packet also waits for the channel — doubling the wireless delay in the Round-Trip Time (RTT)." },
            ].map((item) => (
              <div key={item.step} className="p-4 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[var(--brand-600)]/20 border border-[var(--brand-800)] flex items-center justify-center text-[10px] font-bold text-[var(--brand-400)]">{item.step}</span>
                  <h4 className="font-bold text-[var(--text-primary)] text-xs">{item.label}</h4>
                </div>
                <p className="text-[11px] text-[var(--text-muted)] leading-relaxed" dangerouslySetInnerHTML={{ __html: item.desc }} />
              </div>
            ))}
          </div>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            The key insight: Wi-Fi introduces variable delay at <strong>steps 2 and 6</strong>. Because the delay is unpredictable (sometimes 1ms, sometimes 15ms), your character moves inconsistently on the server — causing desync and missed shots. Ethernet makes steps 2 and 6 near-instant and deterministic.
          </p>
        </section>

        {/* SECTION 3: Technical Level Comparison */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Network size={18} className="text-cyan-400" />
            2. Ethernet vs. Wi-Fi at the Technical Level
          </h2>
          <div className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed space-y-3">
            <p>
              The performance difference between Ethernet and Wi-Fi originates at the physical and data-link layers of the networking stack:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-xs text-[var(--text-muted)]">
              <li>
                <strong>Layer 1 (Physical):</strong> Ethernet encodes data as electrical signals on shielded copper pairs. Wi-Fi encodes data as radio wave modulations in open air. Radio waves are subject to distance attenuation, reflections, and absorption by physical materials.
              </li>
              <li>
                <strong>Layer 2 (Data Link / MAC):</strong> Ethernet uses CSMA/CD (Carrier Sense Multiple Access with Collision Detection) on a private per-port segment. Because modern switches give each device a dedicated port, there are effectively zero collisions. Wi-Fi uses CSMA/CA (Collision Avoidance) where every device must listen for channel silence before transmitting, adding random backoff wait times.
              </li>
              <li>
                <strong>Full-Duplex vs. Half-Duplex:</strong> Ethernet connections operate in full-duplex mode — dedicated wire pairs carry outbound traffic while other pairs carry inbound traffic simultaneously. Wi-Fi is half-duplex: the same radio channel is used for both sending and receiving, and devices must take turns.
              </li>
              <li>
                <strong>Airtime Contention:</strong> Every active Wi-Fi device on your router competes for airtime. If your laptop begins uploading photos, your gaming console&apos;s next packet must wait until the upload burst is complete.
              </li>
            </ul>
          </div>
        </section>

        {/* SECTION 4: Latency Comparison Table */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Activity size={18} className="text-cyan-400" />
            3. Latency Comparison Across Connection Types
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Local network latency (the hop between your device and router) adds directly to your total in-game ping. Here is how each technology performs:
          </p>
          <div className="overflow-x-auto border border-[var(--border-subtle)] rounded-xl">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-xs text-[var(--text-secondary)]">
              <thead>
                <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                  <th className="px-4 py-3 text-left">Scenario</th>
                  <th className="px-4 py-3 text-left">Ethernet (Cat6)</th>
                  <th className="px-4 py-3 text-left">Wi-Fi 5</th>
                  <th className="px-4 py-3 text-left">Wi-Fi 6</th>
                  <th className="px-4 py-3 text-left">Wi-Fi 7</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)] bg-[var(--bg-surface)]/20">
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">Idle Latency (local hop)</td>
                  <td className="px-4 py-3 text-emerald-400 font-semibold">&lt; 0.5 ms</td>
                  <td className="px-4 py-3">8 – 15 ms</td>
                  <td className="px-4 py-3">4 – 10 ms</td>
                  <td className="px-4 py-3 text-emerald-400">1 – 3 ms</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">Loaded Latency (network busy)</td>
                  <td className="px-4 py-3 text-emerald-400 font-semibold">&lt; 1 ms *</td>
                  <td className="px-4 py-3 text-red-500">80 – 250 ms</td>
                  <td className="px-4 py-3 text-amber-500">25 – 80 ms</td>
                  <td className="px-4 py-3">5 – 20 ms</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">Average Gaming Latency Added</td>
                  <td className="px-4 py-3 text-emerald-400 font-semibold">0.3 – 0.8 ms</td>
                  <td className="px-4 py-3 text-red-500">12 – 30 ms</td>
                  <td className="px-4 py-3 text-amber-500">5 – 15 ms</td>
                  <td className="px-4 py-3">2 – 5 ms</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">Worst-Case Spike</td>
                  <td className="px-4 py-3 text-emerald-400 font-semibold">&lt; 2 ms</td>
                  <td className="px-4 py-3 text-red-500">300+ ms (microwave)</td>
                  <td className="px-4 py-3 text-amber-500">50 – 150 ms</td>
                  <td className="px-4 py-3">10 – 30 ms</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-[10px] text-[var(--text-muted)]">* With SQM/CAKE active. Without QoS, Ethernet loaded latency can still spike to 50ms+ due to bufferbloat on the WAN interface. If your ping is consistently high on all connection types (including direct Ethernet), check our <Link href="/high-ping-fix" className="text-[var(--brand-400)] hover:underline font-semibold">High Ping Fix Guide</Link>.</p>
        </section>

        {/* SECTION 5: Jitter Comparison */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Gauge size={18} className="text-cyan-400" />
            4. Jitter: Why Wi-Fi Feels Inconsistent
          </h2>
          <div className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed space-y-3">
            <p>
              Jitter is the variation in packet arrival timing. If your ping averages 30ms but oscillates between 15ms and 65ms, your jitter is 50ms. In game engines, high jitter causes your opponent&apos;s character to stutter, your own movement to feel &quot;floaty&quot;, and hit registration to become unreliable.
            </p>
            <p>
              <strong>Why Wi-Fi causes jitter:</strong> Every time a device transmits on Wi-Fi, it must first sense the medium, then wait a random backoff period before sending. This random wait time (DIFS + contention window) varies from packet to packet, causing each packet to arrive at slightly different intervals. Ethernet has no backoff period, so packets arrive at perfectly consistent intervals.
            </p>
            <p>
              To diagnose and eliminate jitter from your gaming session, follow our dedicated guide:{" "}
              <Link href="/gaming-jitter-fix" className="text-[var(--brand-400)] hover:underline font-semibold">
                How to Fix Gaming Jitter
              </Link>.
            </p>
          </div>
        </section>

        {/* SECTION 6: Packet Loss Comparison */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <AlertCircle size={18} className="text-cyan-400" />
            5. Packet Loss: RF Interference vs. Physical Copper
          </h2>
          <div className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed space-y-3">
            <p>
              Packet loss occurs when a data frame fails to reach its destination. Over Ethernet, local packet loss is virtually zero — the copper wire is fully shielded and protected against electromagnetic interference.
            </p>
            <p>
              Over Wi-Fi, packet loss happens regularly due to:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-[var(--text-muted)]">
              <li><strong>Radio Frequency Interference:</strong> Nearby appliances (cordless phones, microwave ovens, baby monitors) transmit on overlapping frequencies, corrupting wireless frames.</li>
              <li><strong>Signal Attenuation:</strong> As distance and physical obstacles increase, signal strength drops. Below a certain Signal-to-Noise Ratio (SNR), the router is forced to retransmit frames.</li>
              <li><strong>Retransmission Overhead:</strong> Wi-Fi uses automatic retransmission (ARQ). When a frame is corrupted, the sending device resends it. This doubles the airtime used and adds latency.</li>
            </ul>
            <p>
              To accurately measure your current packet loss and identify its source, use our{" "}
              <Link href="/packet-loss-test" className="text-[var(--brand-400)] hover:underline font-semibold">
                Packet Loss Test Tool
              </Link>{" "}and follow our{" "}
              <Link href="/gaming-packet-loss-fix" className="text-[var(--brand-400)] hover:underline font-semibold">
                Gaming Packet Loss Fix Guide
              </Link>.
            </p>
          </div>
        </section>

        {/* SECTION 7: Bufferbloat Under Load */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Layers size={18} className="text-cyan-400" />
            6. Bufferbloat Under Load
          </h2>
          <div className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed space-y-3">
            <p>
              Bufferbloat occurs when your router&apos;s transmit buffer fills up under load, adding hundreds of milliseconds of latency to every outgoing packet — including gaming UDP frames.
            </p>
            <p>
              This problem occurs on <em>both</em> Ethernet and Wi-Fi connections, but Wi-Fi makes it significantly worse because:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-[var(--text-muted)]">
              <li>Wireless throughput fluctuates with signal quality. When the router must lower the connection rate due to signal degradation, the queue backs up faster.</li>
              <li>Wi-Fi adds its own internal retransmission queues on top of the router&apos;s WAN queue.</li>
            </ul>
            <p>
              The fix is identical on both connection types: enable Smart Queue Management (SQM) using CAKE or FQ-CoDel on your router. For full configuration instructions, see our guide on{" "}
              <Link href="/best-qos-settings-for-gaming" className="text-[var(--brand-400)] hover:underline font-semibold">
                Best QoS Settings for Gaming
              </Link>.
            </p>
          </div>
        </section>

        {/* SECTION 8: Why Wi-Fi Causes Random Lag Spikes */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <AlertTriangle size={18} className="text-cyan-400" />
            7. Why Wi-Fi Causes Random Lag Spikes
          </h2>
          <div className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed space-y-3">
            <p>
              Sudden lag spikes on Wi-Fi are rarely caused by the game server. The most common sources of wireless lag spikes are:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-xs text-[var(--text-muted)]">
              <li><strong>Microwave Oven Interference:</strong> Consumer microwave ovens emit strong 2.45GHz radiation that overlaps directly with the 2.4GHz Wi-Fi band. Running a microwave can cause 100% packet loss for several seconds.</li>
              <li><strong>Bluetooth Frequency Hopping:</strong> Bluetooth operates on the same 2.4GHz spectrum using frequency hopping. Multiple active Bluetooth devices create persistent interference that raises your wireless error rate.</li>
              <li><strong>Neighbor Wi-Fi Overlap:</strong> In apartment buildings, dozens of overlapping Wi-Fi networks on the same channels create contention and collisions, especially during peak evening hours.</li>
              <li><strong>Mesh Network Roaming:</strong> When a mesh device hands off your connection from one node to another, it forces a re-association that can take 500ms to 2,000ms — enough to disconnect you from a competitive lobby.</li>
              <li><strong>DFS Channel Events:</strong> 5GHz Wi-Fi channels in the DFS (Dynamic Frequency Selection) range (channels 52-144) must yield to radar systems. When triggered, the router must scan all channels for 60 seconds, dropping all wireless connections during this scan.</li>
            </ul>
            <p>
              For a detailed diagnosis and fix for gaming lag spikes, see:{" "}
              <Link href="/gaming-lag-spikes-fix" className="text-[var(--brand-400)] hover:underline font-semibold">
                Gaming Lag Spikes Fix Guide
              </Link>.
            </p>
          </div>
        </section>

        {/* SECTION 9: Wi-Fi Standards Comparison */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Wifi size={18} className="text-cyan-400" />
            8. Wi-Fi 5 vs. 6 vs. 6E vs. 7 for Gaming
          </h2>
          <div className="overflow-x-auto border border-[var(--border-subtle)] rounded-xl">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-xs text-[var(--text-secondary)]">
              <thead>
                <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                  <th className="px-4 py-3 text-left">Feature</th>
                  <th className="px-4 py-3 text-left">Wi-Fi 5</th>
                  <th className="px-4 py-3 text-left">Wi-Fi 6</th>
                  <th className="px-4 py-3 text-left">Wi-Fi 6E</th>
                  <th className="px-4 py-3 text-left">Wi-Fi 7</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)] bg-[var(--bg-surface)]/20">
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">OFDMA Support</td>
                  <td className="px-4 py-3 text-red-500">No</td>
                  <td className="px-4 py-3 text-emerald-400">Yes</td>
                  <td className="px-4 py-3 text-emerald-400">Yes</td>
                  <td className="px-4 py-3 text-emerald-400">Yes (320MHz)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">Multi-Link Operation (MLO)</td>
                  <td className="px-4 py-3 text-red-500">No</td>
                  <td className="px-4 py-3 text-red-500">No</td>
                  <td className="px-4 py-3 text-red-500">No</td>
                  <td className="px-4 py-3 text-emerald-400 font-bold">Yes (5GHz + 6GHz)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">6GHz Band Access</td>
                  <td className="px-4 py-3 text-red-500">No</td>
                  <td className="px-4 py-3 text-red-500">No</td>
                  <td className="px-4 py-3 text-emerald-400">Yes</td>
                  <td className="px-4 py-3 text-emerald-400">Yes</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">Typical Gaming Latency Added</td>
                  <td className="px-4 py-3 text-red-500">12 – 30 ms</td>
                  <td className="px-4 py-3 text-amber-500">5 – 15 ms</td>
                  <td className="px-4 py-3">2 – 6 ms</td>
                  <td className="px-4 py-3 text-emerald-400 font-bold">1 – 3 ms</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">Interference Resistance</td>
                  <td className="px-4 py-3 text-red-500">Low (crowded bands)</td>
                  <td className="px-4 py-3 text-amber-500">Medium</td>
                  <td className="px-4 py-3 text-emerald-400">High (clean 6GHz)</td>
                  <td className="px-4 py-3 text-emerald-400 font-bold">Highest (MLO redundancy)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 10: Ethernet Cable Categories */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Settings size={18} className="text-cyan-400" />
            9. Ethernet Cable Categories: What Gamers Actually Need
          </h2>
          <div className="overflow-x-auto border border-[var(--border-subtle)] rounded-xl">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-xs text-[var(--text-secondary)]">
              <thead>
                <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                  <th className="px-4 py-3 text-left">Cable Type</th>
                  <th className="px-4 py-3 text-left">Max Speed</th>
                  <th className="px-4 py-3 text-left">Max Distance</th>
                  <th className="px-4 py-3 text-left">Gaming Verdict</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)] bg-[var(--bg-surface)]/20">
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">Cat5e</td>
                  <td className="px-4 py-3">1 Gbps</td>
                  <td className="px-4 py-3">100 m (328 ft)</td>
                  <td className="px-4 py-3 text-amber-500">Acceptable (limited to 1 Gbps)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">Cat6</td>
                  <td className="px-4 py-3">10 Gbps (up to 55 m)</td>
                  <td className="px-4 py-3">100 m (328 ft)</td>
                  <td className="px-4 py-3 text-emerald-400 font-bold">Best for Gaming</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">Cat6a</td>
                  <td className="px-4 py-3">10 Gbps</td>
                  <td className="px-4 py-3">100 m (328 ft)</td>
                  <td className="px-4 py-3 text-emerald-400">Recommended for in-wall/in-floor runs</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">Cat7</td>
                  <td className="px-4 py-3">10 Gbps</td>
                  <td className="px-4 py-3">100 m (328 ft)</td>
                  <td className="px-4 py-3 text-red-500">Not recommended (proprietary GG45 jacks)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">Cat8</td>
                  <td className="px-4 py-3">40 Gbps</td>
                  <td className="px-4 py-3">30 m (98 ft)</td>
                  <td className="px-4 py-3 text-red-500">Overkill — data center only</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-[var(--text-muted)]">
            For home gaming runs under 30 meters, <strong>Cat6</strong> is the ideal choice: affordable, flexible, and capable of 10 Gbps should you upgrade to a multi-gig internet plan. Avoid CCA (Copper Clad Aluminum) cables sold as &quot;Cat6&quot; — they break easily and increase signal resistance.
          </p>
        </section>

        {/* SECTION 11: Does Router Matter? */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Server size={18} className="text-cyan-400" />
            10. Does Your Router Matter for Ethernet vs. Wi-Fi?
          </h2>
          <div className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed space-y-3">
            <p>
              Yes. Even on a wired Ethernet connection, your router&apos;s CPU, RAM, and queue management software determine whether your packets are processed quickly or delayed in the WAN buffer.
            </p>
            <p>
              ISP-provided gateways feature weak dual-core processors and no advanced queue management. During heavy downloads, their WAN buffers bloat, causing ping spikes even on a wired connection. A gaming router with CAKE SQM active prevents this by capping the queue before it bloats.
            </p>
            <p>
              To choose the right router hardware for your setup, see our detailed evaluations:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li>
                <Link href="/best-router-for-gaming" className="text-[var(--brand-400)] hover:underline font-semibold">
                  Best Router for Gaming — Buyer&apos;s Guide
                </Link>
              </li>
              <li>
                <Link href="/gaming-router-vs-normal-router" className="text-[var(--brand-400)] hover:underline font-semibold">
                  Gaming Router vs. Normal Router Comparison
                </Link>
              </li>
              <li>
                <Link href="/best-router-settings-for-gaming" className="text-[var(--brand-400)] hover:underline font-semibold">
                  Best Router Settings for Gaming
                </Link>
              </li>
            </ul>
          </div>
        </section>

        {/* SECTION 12: Powerline Adapters */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <HardDrive size={18} className="text-cyan-400" />
            11. Powerline Adapters vs. Wi-Fi for Gaming
          </h2>
          <div className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed space-y-3">
            <p>
              Powerline adapters transmit network data over your home&apos;s existing electrical wiring. They present themselves as a cable-free alternative to routing Ethernet through walls.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-emerald-950/10 border border-emerald-800/40 rounded-xl space-y-2">
                <h4 className="font-bold text-emerald-400">Advantages</h4>
                <ul className="list-disc pl-4 space-y-1 text-[var(--text-muted)]">
                  <li>No need to drill holes or run new cables.</li>
                  <li>More stable than Wi-Fi in electrically quiet homes.</li>
                  <li>Plug-and-play installation.</li>
                </ul>
              </div>
              <div className="p-4 bg-red-950/10 border border-red-800/40 rounded-xl space-y-2">
                <h4 className="font-bold text-red-400">Disadvantages</h4>
                <ul className="list-disc pl-4 space-y-1 text-[var(--text-muted)]">
                  <li>Electrical wiring carries high-frequency noise from appliances.</li>
                  <li>Crossing circuit breakers degrades performance severely.</li>
                  <li>Latency can be 4–15ms and is highly variable.</li>
                  <li>Heavy appliances (dryers, air conditioners) cause packet bursts.</li>
                </ul>
              </div>
            </div>
            <p>
              In most homes, modern Wi-Fi 6E or Wi-Fi 7 on the 6GHz band will outperform Powerline in latency consistency. Use MoCA adapters over coaxial lines if they are available — they are far more reliable.
            </p>
          </div>
        </section>

        {/* SECTION 13: MoCA vs Ethernet vs Wi-Fi */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Network size={18} className="text-cyan-400" />
            12. MoCA Adapters vs. Ethernet vs. Wi-Fi
          </h2>
          <div className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed space-y-3">
            <p>
              MoCA (Multimedia over Coax) adapters convert your existing coaxial television outlets into a gigabit wired backhaul. Unlike powerline adapters, coaxial cables are designed to carry high-frequency signals and feature heavy shielding.
            </p>
            <p>
              MoCA 2.5 adapters deliver <strong>gigabit speeds with less than 1ms added latency</strong> — performance virtually identical to a direct Ethernet run. This makes them the ideal solution for apartments and homes where running new Cat6 cables through walls is not possible.
            </p>
          </div>
        </section>

        {/* SECTION 14: Real-World Gaming Tests */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Gamepad2 size={18} className="text-cyan-400" />
            13. Real-World Gaming Benchmarks by Game
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            The following benchmark data represents estimated local-network-added latency under typical real-world conditions (not isolated lab tests). External ping to game server is not included — that value is identical across connection types once the packet leaves your router.
          </p>
          <div className="overflow-x-auto border border-[var(--border-subtle)] rounded-xl">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-xs text-[var(--text-secondary)]">
              <thead>
                <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                  <th className="px-4 py-3 text-left">Game</th>
                  <th className="px-4 py-3 text-left">Ethernet (Cat6)</th>
                  <th className="px-4 py-3 text-left">Wi-Fi 5</th>
                  <th className="px-4 py-3 text-left">Wi-Fi 6/6E</th>
                  <th className="px-4 py-3 text-left">Wi-Fi 7</th>
                  <th className="px-4 py-3 text-left">Verdict</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)] bg-[var(--bg-surface)]/20">
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">Valorant (128-tick)</td>
                  <td className="px-4 py-3 text-emerald-400 font-semibold">&lt; 0.5ms (0% loss)</td>
                  <td className="px-4 py-3 text-red-500">10-25ms + spikes (1-3% loss)</td>
                  <td className="px-4 py-3 text-amber-500">4-12ms + minor jitter (0.5% loss)</td>
                  <td className="px-4 py-3 text-emerald-400">1-3ms + stable (0.1% loss)</td>
                  <td className="px-4 py-3 text-emerald-400 font-bold">Ethernet / Wi-Fi 7 (MLO)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">Counter-Strike 2 (128-tick)</td>
                  <td className="px-4 py-3 text-emerald-400 font-semibold">&lt; 0.5ms (0% loss)</td>
                  <td className="px-4 py-3 text-red-500">12-30ms + spikes (1-3% loss)</td>
                  <td className="px-4 py-3 text-amber-500">5-15ms + minor jitter (0.5% loss)</td>
                  <td className="px-4 py-3 text-emerald-400">1-4ms + stable (0.1% loss)</td>
                  <td className="px-4 py-3 text-emerald-400 font-bold">Ethernet Required</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">Warzone (64-tick)</td>
                  <td className="px-4 py-3 text-emerald-400 font-semibold">&lt; 0.5ms (0% loss)</td>
                  <td className="px-4 py-3 text-red-500">8-20ms + jitter (1-2% loss)</td>
                  <td className="px-4 py-3 text-amber-500">3-10ms + minor jitter (&lt;0.5% loss)</td>
                  <td className="px-4 py-3 text-emerald-400">1-3ms + stable (0.1% loss)</td>
                  <td className="px-4 py-3 text-emerald-400 font-bold">Ethernet Preferred</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">Fortnite (30-tick)</td>
                  <td className="px-4 py-3 text-emerald-400 font-semibold">&lt; 0.5ms (0% loss)</td>
                  <td className="px-4 py-3 text-red-500">10-18ms (0.5-1% loss)</td>
                  <td className="px-4 py-3 text-emerald-400">4-8ms (&lt;0.1% loss)</td>
                  <td className="px-4 py-3 text-emerald-400">1-3ms (0% loss)</td>
                  <td className="px-4 py-3 text-emerald-400 font-bold">Wi-Fi 6/7 Acceptable</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">Apex Legends (20-tick)</td>
                  <td className="px-4 py-3 text-emerald-400 font-semibold">&lt; 0.5ms (0% loss)</td>
                  <td className="px-4 py-3 text-red-500">8-15ms (0.5-1.5% loss)</td>
                  <td className="px-4 py-3 text-emerald-400">3-8ms (&lt;0.1% loss)</td>
                  <td className="px-4 py-3 text-emerald-400">1-3ms (0% loss)</td>
                  <td className="px-4 py-3 text-emerald-400 font-bold">Wi-Fi 6/7 Acceptable</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 15: Streaming + Gaming */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Activity size={18} className="text-cyan-400" />
            14. Streaming + Gaming Simultaneously
          </h2>
          <div className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed space-y-3">
            <p>
              Streaming to Twitch or YouTube while gaming requires a sustained, high-bandwidth upload (6 Mbps to 8 Mbps for 1080p60). Over Wi-Fi, this upload stream occupies the same half-duplex radio channel as your game&apos;s download packets, creating a direct conflict.
            </p>
            <p>
              Over Ethernet, your upload stream and game downloads use separate wire pairs on the same cable simultaneously — no conflict. The router still needs Smart Queue Management (SQM) to prevent the stream from pushing your game packets into a long queue, so set your upload cap to 90% of your measured upload speed in the QoS settings.
            </p>
            <p>
              For full configuration instructions:{" "}
              <Link href="/best-qos-settings-for-gaming" className="text-[var(--brand-400)] hover:underline font-semibold">
                Best QoS Settings for Gaming
              </Link>.
            </p>
          </div>
        </section>

        {/* SECTION 16: When Wi-Fi Is Good Enough */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <CheckCircle2 size={18} className="text-cyan-400" />
            15. When Wi-Fi Is Good Enough
          </h2>
          <div className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed space-y-3">
            <p>Wi-Fi is acceptable when all of the following conditions are met:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-[var(--text-muted)]">
              <li>You play single-player, turn-based, or low-tick-rate casual multiplayer games.</li>
              <li>You are the only active device on the wireless network during gaming sessions.</li>
              <li>You are within 20 feet of the router with no more than one wall between you.</li>
              <li>You are connected to the 5GHz or 6GHz band (not the congested 2.4GHz band).</li>
              <li>Your bufferbloat grade tests as &quot;A&quot; or &quot;B&quot; with SQM active on your router.</li>
            </ul>
          </div>
        </section>

        {/* SECTION 17: Signs Ethernet Will Help */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Shield size={18} className="text-cyan-400" />
            16. Signs Ethernet Will Immediately Help You
          </h2>
          <div className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed space-y-3">
            <div className="p-5 border border-emerald-800/30 bg-emerald-950/10 rounded-xl space-y-3">
              <h3 className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 size={14} /> If You Experience Any of These, Switch to Ethernet Today
              </h3>
              <ul className="list-disc pl-5 space-y-1.5 text-[10px] text-[var(--text-secondary)]">
                <li>Your ping test shows variance greater than 10ms between minimum and maximum values.</li>
                <li>Your packet loss is above 0.1% when testing from your PC to your router gateway IP.</li>
                <li>Your in-game shots miss targets that were clearly in your crosshair.</li>
                <li>Your character rubber-bands or warps when running in a straight line.</li>
                <li>Your ping spikes dramatically when another device starts downloading or streaming.</li>
                <li>Your connection drops intermittently when someone runs a microwave or vacuum cleaner.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 18: Network Optimization Checklist */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Settings size={18} className="text-cyan-400" />
            17. Full Network Optimization Checklist
          </h2>
          <div className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed space-y-3">
            <p>
              Whether you are on Ethernet or Wi-Fi, follow this full optimization checklist to extract maximum performance:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-[var(--text-muted)]">
              <li><strong>Router Placement:</strong> Elevate the router. Remove it from metal cabinets and concrete alcoves.</li>
              <li><strong>Firmware Updates:</strong> Update your router firmware. Manufacturers regularly patch queue management and wireless scheduling bugs.</li>
              <li><strong>Enable QoS / SQM:</strong> Configure CAKE or FQ-CoDel with bandwidth caps at 90% of measured speeds.</li>
              <li><strong>Optimize DNS:</strong> Replace your ISP&apos;s DNS servers with Cloudflare (1.1.1.1) or Google (8.8.8.8) to reduce DNS resolution latency.</li>
              <li><strong>Select Optimal Game Server:</strong> In-game settings allow selecting a preferred region. Choose the server geographically closest to you.</li>
              <li><strong>Disable Energy Efficient Ethernet (EEE):</strong> In Windows Device Manager → Network Adapter Properties → Advanced, disable Green Ethernet to prevent port sleep delays.</li>
            </ul>
            <p>
              For the complete advanced optimization guide, visit:{" "}
              <Link href="/gaming-network-optimization" className="text-[var(--brand-400)] hover:underline font-semibold">
                Gaming Network Optimization Guide
              </Link>.
            </p>
          </div>
        </section>

        {/* SECTION 19: Buying Recommendations */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <TrendingDown size={18} className="text-cyan-400" />
            18. Recommended Setup by User Type
          </h2>
          <div className="overflow-x-auto border border-[var(--border-subtle)] rounded-xl">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-xs text-[var(--text-secondary)]">
              <thead>
                <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                  <th className="px-4 py-3 text-left">User Type</th>
                  <th className="px-4 py-3 text-left">Recommended Setup</th>
                  <th className="px-4 py-3 text-left">Priority Features</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)] bg-[var(--bg-surface)]/20">
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">Casual Gamer</td>
                  <td className="px-4 py-3">Wi-Fi 6 (5GHz) + Standard Router</td>
                  <td className="px-4 py-3">Coverage, ease of use</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">Competitive FPS</td>
                  <td className="px-4 py-3 font-semibold text-emerald-400">Cat6 Ethernet + Gaming Router (SQM)</td>
                  <td className="px-4 py-3">Zero jitter, CAKE queue management</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">Streamer</td>
                  <td className="px-4 py-3 font-semibold text-emerald-400">Cat6 Ethernet + Gaming Router (QoS)</td>
                  <td className="px-4 py-3">Upload queue management, full-duplex stability</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">Esports Player</td>
                  <td className="px-4 py-3 font-semibold text-emerald-400">Cat6a Ethernet + High-end Gaming Router</td>
                  <td className="px-4 py-3">Sub-0.5ms local latency, multi-gig ports</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">Large Household</td>
                  <td className="px-4 py-3">Ethernet for PC/Console + Wi-Fi 7 for phones</td>
                  <td className="px-4 py-3">Flow isolation, MLO wireless stability</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            For detailed model-by-model router recommendations by budget tier, see our full guide:{" "}
            <Link href="/best-router-for-gaming" className="text-[var(--brand-400)] hover:underline font-semibold">
              Best Router for Gaming — Buyer&apos;s Guide <ArrowRight size={12} className="inline" />
            </Link>
          </p>
        </section>

      </div>
    </TroubleshootingArticleShell>
  );
}
