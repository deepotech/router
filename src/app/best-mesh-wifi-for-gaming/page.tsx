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
  Info,
  ArrowRight,
  TrendingDown,
  Gauge,
  Layers,
  Router,
  Home,
  AlertCircle,
  Cpu,
  Sliders,
} from "lucide-react";

// =============================================================
// Premium SEO Metadata
// =============================================================

export const metadata: Metadata = buildMetadata({
  title: "Best Mesh WiFi for Gaming: Latency, Backhaul & Setup Guide | RouterVia",
  description:
    "Is mesh WiFi good for gaming? Compare the best gaming mesh routers for low latency, dedicated backhaul, tri-band architecture, and whole-home coverage without sacrificing ping.",
  canonical: "/best-mesh-wifi-for-gaming",
  keywords: [
    "best mesh wifi for gaming",
    "gaming mesh wifi",
    "mesh wifi gaming",
    "gaming mesh router",
    "low latency mesh wifi",
    "mesh system for gaming",
    "mesh wifi vs router gaming",
    "gaming wifi coverage",
    "wifi dead zones gaming",
    "gaming mesh network",
    "best mesh for ps5",
    "best mesh for xbox",
    "best mesh for gaming pc",
    "wifi roaming gaming",
  ],
});

// =============================================================
// Breadcrumbs
// =============================================================

const breadcrumbs = [
  { name: "Gaming Tools", url: "/nat-type-checker" },
  { name: "Best Mesh WiFi for Gaming", url: "/best-mesh-wifi-for-gaming" },
];

// =============================================================
// Common Causes
// =============================================================

const commonCauses = [
  {
    title: "Shared Backhaul Congestion",
    desc: "In dual-band mesh systems, the same radio bands carry both client traffic and the inter-node backhaul link, meaning your gaming packets compete directly with internal mesh communication.",
  },
  {
    title: "Node Handoff (Roaming) Latency",
    desc: "When your device switches between mesh nodes, it briefly disconnects to re-authenticate to the closer node, causing a 100–500ms freeze that can disconnect you from a competitive lobby.",
  },
  {
    title: "Daisy-Chaining Beyond 2 Hops",
    desc: "Routing your gaming traffic through 3 or more wireless hops compounds backhaul latency, adding 5–20ms per hop to your total in-game ping.",
  },
  {
    title: "WAN Bufferbloat on Primary Node",
    desc: "Without SQM (Smart Queue Management) active on the primary mesh node, large background downloads saturate the outbound queue, inflating gaming ping for all connected devices.",
  },
];

// =============================================================
// Quick Fix Checklist
// =============================================================

const quickFixChecklist = [
  "Choose a tri-band or Wi-Fi 6E mesh system with a dedicated backhaul band — never share the backhaul and client bands on a dual-band system.",
  "Use wired Ethernet backhaul between nodes where possible — run a Cat6 cable from the primary node to each satellite for zero wireless-hop overhead.",
  "Keep your gaming device within one hop of the primary router node — never route through more than one satellite node wirelessly.",
  "Enable QoS device priority in the mesh admin app and assign Highest Priority to your gaming console or PC's MAC address.",
  "Set the primary node's roaming aggressiveness to Medium or Low to prevent your stationary gaming device from unnecessarily switching nodes.",
  "Enable SQM (CAKE or FQ-CoDel) on the primary router node and cap bandwidth at 90% of your ISP maximum to prevent bufferbloat.",
];

// =============================================================
// Diagnostic Steps
// =============================================================

const troubleshootingSteps = [
  {
    title: "Identify Which Mesh Node Your Gaming Device Is Using",
    description:
      "Open your mesh system's admin app (Eero, Orbi, ZenWiFi, Deco) and navigate to the connected devices list. Find your gaming device and verify it is connected to the primary router node or a satellite with a wired Ethernet backhaul. A device connected to a second-hop satellite node will have higher baseline latency.",
    tip: "If your gaming console or PC is in a different room from the primary node, run a Cat6 cable from the nearest satellite node directly into your device. This eliminates both the wireless-hop backhaul and the client wireless connection.",
  },
  {
    title: "Test Backhaul Link Quality Between Nodes",
    description:
      "In your mesh admin app, locate the node topology view. Check the backhaul link speed between the primary and satellite nodes. A healthy dedicated 5GHz backhaul should show 400–900 Mbps. A 6GHz backhaul should show 1,000–2,500 Mbps. Values below 100 Mbps indicate excessive distance or physical obstruction between nodes.",
    tip: "Reposition the satellite node to be within 30 feet (9 meters) of the primary node with clear line-of-sight through a single drywall partition. Reducing physical distance by 20% can double backhaul throughput.",
  },
  {
    title: "Run Comparative Ping Tests at Each Node Location",
    description:
      "Carry a laptop to each mesh node location and run 'ping -n 50 8.8.8.8' from Windows Command Prompt (or 'ping -c 50 8.8.8.8' on macOS/Linux). Record the average and maximum RTT values at each location. The primary node should always deliver the lowest average RTT. Any satellite node adding more than 5ms above the primary indicates a backhaul quality issue.",
    tip: "Also run a simultaneous ping to your router's gateway IP (192.168.1.1) to isolate the local hop contribution versus the WAN routing path.",
  },
  {
    title: "Configure QoS and Enable SQM on the Primary Node",
    description:
      "Log into your mesh system's management console or admin app. Navigate to Quality of Service or Traffic Management settings. Assign your gaming device to the Highest Priority class. Then enable Smart Queue Management (SQM) if supported — set the upload and download limits to 90% of your measured ISP maximum speed. This prevents buffer saturation from inflating ping under load.",
    tip: "On ASUS ZenWiFi systems, also enable Game Boost under the Gaming Center tab to apply deep-packet inspection that automatically classifies UDP game traffic for priority queuing.",
  },
];

// =============================================================
// FAQ Q&A Data (10 detailed questions)
// =============================================================

const faqs = [
  {
    question: "Is mesh WiFi good for gaming?",
    answer:
      "Yes, with the right system and configuration. A tri-band mesh system with a dedicated backhaul band adds only 1–3ms of local hop overhead per node, which is imperceptible during gameplay. The critical requirement is that the gaming device must be within one wireless hop of the primary router, and ideally connected via Ethernet from the nearest satellite node. Dual-band mesh systems are not recommended for gaming because they share the backhaul and client bands, creating unpredictable queue delays.",
  },
  {
    question: "Does mesh WiFi increase ping?",
    answer:
      "A poorly configured mesh system (dual-band, multiple wireless hops, no QoS) will increase ping by 5–25ms compared to a single router. However, a quality tri-band or Wi-Fi 6E mesh system with a dedicated 5GHz or 6GHz backhaul adds only 1–3ms of per-hop overhead — negligible for gaming. A mesh with Ethernet backhaul is virtually identical in performance to a single router.",
  },
  {
    question: "Is Ethernet backhaul worth it for gaming?",
    answer:
      "Yes, absolutely. Ethernet backhaul eliminates wireless hop latency entirely. Instead of the inter-node link using a shared 5GHz radio, it runs over a Cat6 cable at 1 Gbps with sub-0.1ms latency. This transforms each satellite node into a de facto access point with the same performance as being directly connected to the main router. If you can run cables, always use Ethernet backhaul for gaming.",
  },
  {
    question: "Can a mesh system replace Ethernet for competitive gaming?",
    answer:
      "For the final connection between your gaming device and the mesh node, Ethernet remains superior. A Cat6 cable from the nearest satellite node into your PS5, Xbox, or gaming PC delivers zero local jitter and 0% packet loss. While a Wi-Fi 7 mesh with MLO approaches Ethernet performance in ideal conditions, a physical cable is still the most reliable option for competitive FPS players.",
  },
  {
    question: "Is WiFi 7 mesh worth it for gaming?",
    answer:
      "Yes, if you are in a large home and cannot use wired connections. A Wi-Fi 7 mesh system uses Multi-Link Operation (MLO) on both the client and backhaul connections, simultaneously bonding 5GHz and 6GHz bands. This reduces local latency to under 2ms and provides near-zero packet loss. Wi-Fi 7 mesh systems also use 320 MHz channels on the 6GHz backhaul, delivering enough bandwidth to prevent congestion even in heavy multi-device households.",
  },
  {
    question: "Does roaming between mesh nodes affect gaming sessions?",
    answer:
      "Yes. When your device roams from one mesh node to another, it briefly disconnects to re-authenticate. With standard 802.11r fast roaming, this takes 50–150ms. Without fast roaming, it can take 500–2,000ms — enough to disconnect you from a game lobby. For stationary gaming setups (a console or PC in a fixed room), always disable aggressive roaming or configure your device to stay on a specific node's SSID to prevent unwanted handoffs.",
  },
  {
    question: "What is the best mesh system for PS5?",
    answer:
      "The ASUS ZenWiFi Pro ET12 is the top choice for PS5 gaming. It features Wi-Fi 6E with a dedicated 6GHz backhaul, 2.5G WAN/LAN ports, and a built-in gaming QoS mode. The PS5 Pro's Wi-Fi 7 hardware pairs perfectly with Wi-Fi 7 mesh systems like the ASUS ZenWiFi BQ16. For a more affordable option, the TP-Link Deco XE75 Pro provides excellent 6GHz backhaul performance at a lower price.",
  },
  {
    question: "What is the best mesh system for Xbox?",
    answer:
      "The Netgear Orbi 960 is outstanding for Xbox gaming. Its 10G WAN port prevents internet bottlenecking, and the dedicated 6GHz backhaul ensures the Xbox Series X's Wi-Fi 6 hardware gets the cleanest possible path to the primary node. The ASUS ZenWiFi XT9 is an excellent mid-range alternative with a dedicated 5GHz backhaul, gaming QoS mode, and ASUS AiMesh compatibility for easy multi-node expansion.",
  },
  {
    question: "How many mesh nodes do I need for gaming?",
    answer:
      "For a home under 2,000 sq ft with a single story, a single high-performance gaming router is preferable. For 2,000–4,000 sq ft or two floors, a 2-node mesh system (primary + one satellite) is sufficient. For homes over 4,000 sq ft or three floors, 3 nodes are recommended. The key rule: always keep your primary gaming device within one wireless hop of the primary node. Adding more nodes than necessary compounds latency without benefit.",
  },
  {
    question: "Can mesh WiFi reduce packet loss?",
    answer:
      "Yes, in the right scenario. If your gaming device is experiencing packet loss because it is at the edge of your single router's coverage range (weak signal, low SNR), placing a mesh satellite node closer will significantly reduce local packet loss. However, mesh systems add more wireless hops, each of which can introduce its own small loss rate. Ethernet backhaul between nodes eliminates backhaul packet loss entirely.",
  },
];

// =============================================================
// Page Component
// =============================================================

export default function BestMeshWifiForGamingPage() {
  return (
    <TroubleshootingArticleShell
      h1="Best Mesh WiFi for Gaming: Latency, Backhaul & Setup Guide"
      intro="Mesh WiFi systems promise whole-home wireless coverage without dead zones — but can they deliver the consistent low latency, stable jitter, and reliable packet delivery that competitive gaming demands? In this comprehensive technical guide, we dissect mesh network architecture, compare backhaul technologies, benchmark real gaming latency across multiple topologies, and recommend the best mesh systems for every home size and gaming style."
      category="wifi"
      breadcrumbs={breadcrumbs}
      faqs={faqs}
      troubleshootingSteps={troubleshootingSteps}
      warningBanner={{
        title: "Dual-Band Mesh Systems Are Not Recommended for Gaming",
        text: "Dual-band mesh routers share the same radio bands between client devices and the internal backhaul link. When your gaming device sends a packet, it competes directly with the mesh's own synchronization traffic for airtime. This creates unpredictable queue delays and jitter spikes. Always choose a tri-band mesh system with a dedicated backhaul band — or use Ethernet backhaul between nodes.",
      }}
      quickFixChecklist={quickFixChecklist}
      commonCauses={commonCauses}
      whenToContactISP="If you experience high ping or packet loss even when your gaming device is directly connected to the primary mesh node via Ethernet cable, the bottleneck is upstream. Connect directly to your modem bypassing all mesh nodes and retest. If the issue persists, contact your ISP to inspect the physical line quality between your home and the exchange."
      severityLevel="medium"
    >
      <div className="space-y-12">

        {/* SECTION 1: Quick AI Answer */}
        <section
          className="glass-card p-6 border border-blue-950/20 bg-blue-950/5 rounded-2xl relative overflow-hidden space-y-5"
          aria-label="Quick AI Answer"
        >
          <div className="absolute top-0 right-0 bg-[var(--brand-500)]/10 text-[var(--brand-400)] text-[10px] font-mono uppercase tracking-wider px-3 py-1 rounded-bl-lg font-bold">
            AI Summary
          </div>
          <h2 className="text-sm font-bold text-[var(--brand-400)] uppercase tracking-wide flex items-center gap-1.5">
            <Zap size={16} /> Quick Answer: Which Setup for Your Home?
          </h2>
          <div className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed space-y-2">
            <p>
              <strong>Mesh WiFi is excellent for gaming in large or multi-floor homes</strong> — but only with a tri-band system and a dedicated backhaul. For small apartments or single rooms close to a router, a high-performance single gaming router delivers lower latency than any mesh system.
            </p>
          </div>

          {/* Home Type Table */}
          <div className="overflow-x-auto border border-[var(--border-subtle)] rounded-xl">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-xs text-[var(--text-secondary)]">
              <thead>
                <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                  <th className="px-4 py-3 text-left">Home Type</th>
                  <th className="px-4 py-3 text-left">Recommendation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)] bg-[var(--bg-surface)]/20">
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">Small Apartment (&lt; 1,000 sq ft)</td>
                  <td className="px-4 py-3 text-emerald-400 font-semibold">Single Gaming Router</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">Medium Home (1,000–3,000 sq ft)</td>
                  <td className="px-4 py-3 text-cyan-400 font-semibold">Mesh WiFi (Tri-Band)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">Large House (&gt; 3,000 sq ft)</td>
                  <td className="px-4 py-3 text-cyan-400 font-semibold">Mesh WiFi (Tri-Band + Ethernet Backhaul)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">Multi-Floor Home</td>
                  <td className="px-4 py-3 text-cyan-400 font-semibold">Mesh WiFi (one node per floor)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">Competitive Esports Setup</td>
                  <td className="px-4 py-3 text-amber-500 font-semibold">Ethernet Preferred (Mesh for other devices)</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Full Tech Comparison Table */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wide">Full Technology Comparison</h3>
            <div className="overflow-x-auto border border-[var(--border-subtle)] rounded-xl">
              <table className="min-w-full divide-y divide-[var(--border-subtle)] text-xs text-[var(--text-secondary)]">
                <thead>
                  <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                    <th className="px-4 py-3 text-left">Technology</th>
                    <th className="px-4 py-3 text-left">Coverage</th>
                    <th className="px-4 py-3 text-left">Ping</th>
                    <th className="px-4 py-3 text-left">Jitter</th>
                    <th className="px-4 py-3 text-left">Gaming Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-subtle)] bg-[var(--bg-surface)]/20">
                  <tr>
                    <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">Ethernet (Cat6)</td>
                    <td className="px-4 py-3 text-amber-500">Limited by cable</td>
                    <td className="px-4 py-3 text-emerald-400 font-bold">&lt; 0.5 ms</td>
                    <td className="px-4 py-3 text-emerald-400 font-bold">&lt; 0.2 ms</td>
                    <td className="px-4 py-3 text-emerald-400 font-bold">★★★★★ Best</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">Single Gaming Router (Wi-Fi 6)</td>
                    <td className="px-4 py-3 text-amber-500">~2,000 sq ft</td>
                    <td className="px-4 py-3 text-emerald-400">2 – 5 ms</td>
                    <td className="px-4 py-3 text-emerald-400">~1.5 ms</td>
                    <td className="px-4 py-3 text-emerald-400 font-semibold">★★★★☆ Excellent</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">Dual-Band Mesh (Wireless)</td>
                    <td className="px-4 py-3 text-emerald-400">~4,500 sq ft</td>
                    <td className="px-4 py-3 text-red-500">8 – 25 ms</td>
                    <td className="px-4 py-3 text-red-500">~8 ms</td>
                    <td className="px-4 py-3 text-red-500 font-semibold">★★☆☆☆ Poor</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">Tri-Band Mesh (Wireless Backhaul)</td>
                    <td className="px-4 py-3 text-emerald-400">~5,500 sq ft</td>
                    <td className="px-4 py-3 text-emerald-400">3 – 8 ms</td>
                    <td className="px-4 py-3 text-emerald-400">~2 ms</td>
                    <td className="px-4 py-3 text-emerald-400 font-semibold">★★★★☆ Very Good</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">Tri-Band Mesh (Ethernet Backhaul)</td>
                    <td className="px-4 py-3 text-emerald-400">~6,000+ sq ft</td>
                    <td className="px-4 py-3 text-emerald-400 font-bold">1 – 4 ms</td>
                    <td className="px-4 py-3 text-emerald-400 font-bold">~0.8 ms</td>
                    <td className="px-4 py-3 text-emerald-400 font-bold">★★★★★ Outstanding</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">Wi-Fi 7 Mesh (MLO + 6GHz Backhaul)</td>
                    <td className="px-4 py-3 text-emerald-400">~6,000+ sq ft</td>
                    <td className="px-4 py-3 text-emerald-400 font-bold">1 – 3 ms</td>
                    <td className="px-4 py-3 text-emerald-400 font-bold">&lt; 0.5 ms</td>
                    <td className="px-4 py-3 text-emerald-400 font-bold">★★★★★ Outstanding</td>
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
              Analyze Your Gaming Latency Profile
            </h2>
            <p className="text-xs text-[var(--text-muted)] mt-1">
              Select your connection type and network load parameters to identify your local latency budget and optimal QoS configuration for your mesh setup.
            </p>
          </div>
          <ConnectionOptimizerClient mode="latency" />
        </section>

        {/* SECTION 2: What Is Mesh WiFi */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Wifi size={18} className="text-cyan-400" />
            1. What Is Mesh WiFi and How Does It Work?
          </h2>
          <div className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed space-y-3">
            <p>
              A mesh WiFi system replaces a single router with a distributed network of two or more <strong>nodes</strong> (also called satellites or access points) that communicate with each other and collectively create a single unified wireless network throughout your entire home.
            </p>
            <p>
              The four core architectural components of a mesh network are:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {[
                {
                  title: "Primary (Gateway) Node",
                  desc: "The main router node connected directly to your modem. It manages the entire mesh network, handles NAT, DHCP, and DNS, and serves as the uplink to the internet. All traffic ultimately passes through this node.",
                },
                {
                  title: "Satellite Nodes",
                  desc: "Secondary nodes placed throughout the home. They relay client device connections back to the primary node via the backhaul link. Each satellite extends the network's coverage radius without creating a separate SSID.",
                },
                {
                  title: "Backhaul",
                  desc: "The dedicated communication channel between nodes. This is the most critical variable for gaming performance. A dedicated backhaul band (5GHz or 6GHz) ensures gaming packets don't share airtime with inter-node synchronization traffic.",
                },
                {
                  title: "Seamless Roaming",
                  desc: "When you move between rooms, the mesh controller tracks signal quality and hands off your device to the nearest node using 802.11r (fast BSS transition). For stationary gaming devices, aggressive roaming can cause unwanted mid-game reconnections.",
                },
              ].map((item) => (
                <div key={item.title} className="p-4 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl space-y-1">
                  <h3 className="font-bold text-[var(--text-primary)] text-xs">{item.title}</h3>
                  <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3: Mesh vs Single Router */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Router size={18} className="text-cyan-400" />
            2. Mesh WiFi vs. Traditional Router: Full Comparison
          </h2>
          <div className="overflow-x-auto border border-[var(--border-subtle)] rounded-xl">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-xs text-[var(--text-secondary)]">
              <thead>
                <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                  <th className="px-4 py-3 text-left">Factor</th>
                  <th className="px-4 py-3 text-left">Single Gaming Router</th>
                  <th className="px-4 py-3 text-left">Mesh WiFi (Tri-Band)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)] bg-[var(--bg-surface)]/20">
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">Coverage</td>
                  <td className="px-4 py-3 text-amber-500">~1,500–2,500 sq ft</td>
                  <td className="px-4 py-3 text-emerald-400 font-semibold">3,000–9,000+ sq ft</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">Roaming</td>
                  <td className="px-4 py-3 text-red-500">Single radio cell, no roaming</td>
                  <td className="px-4 py-3 text-emerald-400">Seamless 802.11r fast handoff</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">Gaming Latency</td>
                  <td className="px-4 py-3 text-emerald-400 font-bold">2–5 ms (lowest)</td>
                  <td className="px-4 py-3 text-emerald-400">3–8 ms (tri-band dedicated backhaul)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">Jitter</td>
                  <td className="px-4 py-3 text-emerald-400 font-bold">~1.5 ms (excellent)</td>
                  <td className="px-4 py-3 text-emerald-400">~2–3 ms (dedicated backhaul)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">Scalability</td>
                  <td className="px-4 py-3 text-red-500">Not scalable — fixed coverage</td>
                  <td className="px-4 py-3 text-emerald-400">Add nodes to extend coverage</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">Cost</td>
                  <td className="px-4 py-3 text-emerald-400">$100–$400 (single unit)</td>
                  <td className="px-4 py-3 text-amber-500">$200–$900+ (2–3 node kit)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">Gaming QoS</td>
                  <td className="px-4 py-3 text-emerald-400">Advanced (CAKE, SQM, DSCP)</td>
                  <td className="px-4 py-3 text-amber-500">Varies by system (ASUS/Netgear best)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            For a detailed breakdown of gaming router selection, see our guide:{" "}
            <Link href="/best-router-for-gaming" className="text-[var(--brand-400)] hover:underline font-semibold">
              Best Router for Gaming
            </Link>{" "}and{" "}
            <Link href="/gaming-router-vs-normal-router" className="text-[var(--brand-400)] hover:underline font-semibold">
              Gaming Router vs. Normal Router
            </Link>.
          </p>
        </section>

        {/* SECTION 4: How Mesh Networks Work */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Network size={18} className="text-cyan-400" />
            3. How Mesh Networks Work: Packet Routing & Path Selection
          </h2>
          <div className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed space-y-3">
            <p>
              When your gaming PC sends a UDP packet (a game state update or input event), it travels through the following path in a mesh network:
            </p>
            <ol className="list-decimal pl-5 space-y-2 text-xs text-[var(--text-muted)]">
              <li><strong>Gaming Device → Nearest Satellite Node:</strong> The packet travels over the client radio band (2.4GHz or 5GHz) to the nearest node's client-facing radio.</li>
              <li><strong>Satellite Node → Primary Router Node (Backhaul):</strong> The satellite forwards the packet to the primary node via the dedicated backhaul band. In a tri-band system, this uses a separate, dedicated 5GHz or 6GHz radio that no client device accesses.</li>
              <li><strong>Primary Node → Modem → ISP → Game Server:</strong> The primary node applies NAT, queues the packet in the WAN buffer, and forwards it to the internet.</li>
            </ol>
            <p>
              Each wireless hop in this chain adds latency. The goal is to minimize hops: ideally, your gaming device connects to a satellite that has a <strong>wired Ethernet backhaul</strong> to the primary node, or directly to the primary node itself.
            </p>
            <p>
              Modern mesh systems use <strong>dynamic path selection</strong> — if one node-to-node path degrades (due to interference or distance), the system automatically reroutes through a different path. This is transparent to your gaming device but may cause a brief 50–200ms reconfiguration pause.
            </p>
          </div>
        </section>

        {/* SECTION 5: Gaming Requirements */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Gamepad2 size={18} className="text-cyan-400" />
            4. What Gaming Actually Requires from Your Network
          </h2>
          <div className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed space-y-3">
            <p>
              Understanding what gaming actually demands from a network helps you evaluate whether a mesh system is appropriate for your setup. Gaming's requirements are fundamentally different from streaming or file downloads:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {[
                { metric: "Ping / Latency", target: "< 30ms (competitive: < 15ms)", desc: "Round-trip time from your PC to the game server. High ping causes delayed hit registration and rubberbanding." },
                { metric: "Jitter", target: "< 5ms (competitive: < 2ms)", desc: "Variation in packet arrival time. High jitter makes opponents stutter and makes the game feel inconsistent even at low average ping." },
                { metric: "Packet Loss", target: "0% (max 0.5%)", desc: "Dropped packets force the client to extrapolate missing world state, causing position teleporting and missed shots." },
                { metric: "Stability", target: "Zero spike events", desc: "Consistent latency under household load matters more than raw low average ping. A 200ms spike during a gunfight is worse than a stable 25ms baseline." },
              ].map((item) => (
                <div key={item.metric} className="p-4 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-[var(--text-primary)] text-xs">{item.metric}</h3>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold">{item.target}</span>
                  </div>
                  <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
            <p>
              For a full guide on diagnosing and reducing all four metrics, see our{" "}
              <Link href="/how-to-reduce-latency" className="text-[var(--brand-400)] hover:underline font-semibold">
                How to Reduce Latency Guide
              </Link>{" "}and{" "}
              <Link href="/gaming-network-optimization" className="text-[var(--brand-400)] hover:underline font-semibold">
                Gaming Network Optimization
              </Link>.
            </p>
          </div>
        </section>

        {/* SECTION 6: Wireless vs Ethernet Backhaul */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Layers size={18} className="text-cyan-400" />
            5. Wireless Backhaul vs. Ethernet Backhaul: Gaming Impact
          </h2>
          <div className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed space-y-3">
            <p>
              The backhaul is the single most important architectural decision in a gaming mesh network. Here is a deep comparison between the two approaches:
            </p>
            <div className="overflow-x-auto border border-[var(--border-subtle)] rounded-xl">
              <table className="min-w-full divide-y divide-[var(--border-subtle)] text-xs text-[var(--text-secondary)]">
                <thead>
                  <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                    <th className="px-4 py-3 text-left">Factor</th>
                    <th className="px-4 py-3 text-left">Wireless Backhaul</th>
                    <th className="px-4 py-3 text-left">Ethernet Backhaul</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-subtle)] bg-[var(--bg-surface)]/20">
                  <tr>
                    <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">Backhaul Latency</td>
                    <td className="px-4 py-3 text-amber-500">1–3 ms per hop (dedicated band)</td>
                    <td className="px-4 py-3 text-emerald-400 font-bold">&lt; 0.1 ms per hop</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">Backhaul Throughput</td>
                    <td className="px-4 py-3 text-amber-500">300–2,500 Mbps (varies with distance)</td>
                    <td className="px-4 py-3 text-emerald-400 font-bold">1,000 Mbps (consistent)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">Interference Susceptibility</td>
                    <td className="px-4 py-3 text-red-500">High (RF noise, walls, neighbors)</td>
                    <td className="px-4 py-3 text-emerald-400 font-bold">Zero (shielded copper)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">Packet Loss Risk</td>
                    <td className="px-4 py-3 text-amber-500">Low (0.1–0.5% under congestion)</td>
                    <td className="px-4 py-3 text-emerald-400 font-bold">~0% (deterministic)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">Installation Complexity</td>
                    <td className="px-4 py-3 text-emerald-400">Simple (plug and play)</td>
                    <td className="px-4 py-3 text-amber-500">Requires cable routing</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="p-4 bg-[var(--bg-elevated)] border border-emerald-900/30 rounded-xl text-xs space-y-1.5">
              <h3 className="font-bold text-emerald-400">Verdict</h3>
              <p className="text-[var(--text-muted)] leading-relaxed">
                If running a cable is feasible, <strong>always use Ethernet backhaul</strong>. The sub-0.1ms hop latency and 0% backhaul packet loss transforms each satellite node into a high-performance access point. For installations where cables are not possible, choose a mesh system with a dedicated 5GHz or 6GHz backhaul band — never a shared dual-band system.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 7: Dedicated Backhaul Explained */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Shield size={18} className="text-cyan-400" />
            6. Dedicated Backhaul Explained: Tri-Band Architecture
          </h2>
          <div className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed space-y-3">
            <p>
              <strong>Dedicated backhaul</strong> means reserving one entire radio band exclusively for node-to-node communication, completely separate from the bands your gaming devices connect to. Here is how leading gaming mesh systems implement it:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              {[
                {
                  brand: "ASUS ZenWiFi Pro ET12",
                  backhaul: "6GHz (dedicated, up to 4,804 Mbps)",
                  client: "5GHz + 2.4GHz for devices",
                  notes: "Gaming Center QoS, AiMesh ecosystem, 2.5G ports",
                  color: "text-cyan-400 border-cyan-900/30",
                },
                {
                  brand: "Netgear Orbi 960",
                  backhaul: "6GHz (dedicated, quad-band, up to 10.8 Gbps aggregate)",
                  client: "5GHz + 2.4GHz for devices",
                  notes: "10G WAN port, up to 9,000 sq ft, excellent roaming",
                  color: "text-emerald-400 border-emerald-900/30",
                },
                {
                  brand: "TP-Link Deco XE75 Pro",
                  backhaul: "6GHz (dedicated)",
                  client: "5GHz + 2.4GHz for devices",
                  notes: "Budget Wi-Fi 6E tri-band, good for mid-range gaming",
                  color: "text-amber-400 border-amber-900/30",
                },
              ].map((item) => (
                <div key={item.brand} className={`p-4 bg-[var(--bg-elevated)] border rounded-xl space-y-2 ${item.color}`}>
                  <h3 className={`font-bold text-xs ${item.color.split(" ")[0]}`}>{item.brand}</h3>
                  <div className="space-y-1 text-[11px] text-[var(--text-muted)]">
                    <p><span className="font-semibold text-[var(--text-secondary)]">Backhaul:</span> {item.backhaul}</p>
                    <p><span className="font-semibold text-[var(--text-secondary)]">Client bands:</span> {item.client}</p>
                    <p><span className="font-semibold text-[var(--text-secondary)]">Gaming notes:</span> {item.notes}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 8: Latency Benchmarks */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Activity size={18} className="text-cyan-400" />
            7. Mesh WiFi Gaming Latency Benchmarks
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            The following benchmarks represent local network latency (device-to-router hop) under typical household conditions — not total ping to a game server, which is determined by your ISP routing:
          </p>
          <div className="overflow-x-auto border border-[var(--border-subtle)] rounded-xl">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-xs text-[var(--text-secondary)]">
              <thead>
                <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                  <th className="px-4 py-3 text-left">Topology</th>
                  <th className="px-4 py-3 text-left">Idle Latency</th>
                  <th className="px-4 py-3 text-left">Under Load</th>
                  <th className="px-4 py-3 text-left">Jitter (Std Dev)</th>
                  <th className="px-4 py-3 text-left">Worst-Case Spike</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)] bg-[var(--bg-surface)]/20">
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">Ethernet (Cat6)</td>
                  <td className="px-4 py-3 text-emerald-400 font-bold">&lt; 0.5 ms</td>
                  <td className="px-4 py-3 text-emerald-400 font-bold">&lt; 0.8 ms</td>
                  <td className="px-4 py-3 text-emerald-400 font-bold">&lt; 0.2 ms</td>
                  <td className="px-4 py-3 text-emerald-400 font-bold">&lt; 2 ms</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">Single Wi-Fi 6 Router</td>
                  <td className="px-4 py-3 text-emerald-400">2 – 5 ms</td>
                  <td className="px-4 py-3 text-emerald-400">4 – 10 ms</td>
                  <td className="px-4 py-3 text-emerald-400">~1.5 ms</td>
                  <td className="px-4 py-3 text-amber-500">20 – 50 ms</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">Dual-Band Mesh (1 hop wireless)</td>
                  <td className="px-4 py-3 text-amber-500">8 – 18 ms</td>
                  <td className="px-4 py-3 text-red-500">20 – 55 ms</td>
                  <td className="px-4 py-3 text-red-500">~8 ms</td>
                  <td className="px-4 py-3 text-red-500">80 – 200 ms</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">Tri-Band Mesh (1 hop, dedicated backhaul)</td>
                  <td className="px-4 py-3 text-emerald-400">3 – 7 ms</td>
                  <td className="px-4 py-3 text-emerald-400">5 – 12 ms</td>
                  <td className="px-4 py-3 text-emerald-400">~2 ms</td>
                  <td className="px-4 py-3 text-amber-500">15 – 35 ms</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">Tri-Band Mesh (Ethernet backhaul)</td>
                  <td className="px-4 py-3 text-emerald-400 font-bold">2 – 5 ms</td>
                  <td className="px-4 py-3 text-emerald-400 font-bold">3 – 7 ms</td>
                  <td className="px-4 py-3 text-emerald-400 font-bold">~0.8 ms</td>
                  <td className="px-4 py-3 text-emerald-400">8 – 20 ms</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 9: Jitter Benchmarks */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Gauge size={18} className="text-cyan-400" />
            8. Jitter Benchmarks: What Mesh Does to Frame Timing
          </h2>
          <div className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed space-y-3">
            <p>
              Jitter — the variance in packet delivery intervals — is often more impactful on gaming experience than average ping. A game client with 30ms average ping but 20ms jitter will feel far worse than one with 40ms ping and 2ms jitter.
            </p>
            <p>
              In mesh networks, jitter is primarily caused by:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-[var(--text-muted)]">
              <li><strong>Backhaul band contention:</strong> On dual-band mesh, when the backhaul link experiences momentary congestion from a large data transfer between nodes, your gaming packets pile up in the satellite's outbound queue, causing a burst of delayed delivery.</li>
              <li><strong>Node handoff events:</strong> Even with 802.11r fast roaming, a handoff between nodes introduces a 50–200ms jitter spike as the authentication state is transferred.</li>
              <li><strong>WAN bufferbloat:</strong> Without SQM on the primary node, large background downloads saturate the WAN buffer, creating variable queuing delays for all outbound gaming packets.</li>
            </ul>
            <p>
              To eliminate gaming jitter on your mesh network, follow our dedicated guide:{" "}
              <Link href="/gaming-jitter-fix" className="text-[var(--brand-400)] hover:underline font-semibold">
                How to Fix Gaming Jitter
              </Link>.
            </p>
          </div>
        </section>

        {/* SECTION 10: Packet Loss Benchmarks */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <AlertCircle size={18} className="text-cyan-400" />
            9. Packet Loss Benchmarks: Weak Signal vs. Mesh Coverage
          </h2>
          <div className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed space-y-3">
            <p>
              Packet loss is where mesh networks can actually <em>improve</em> your gaming experience — but only when configured correctly:
            </p>
            <div className="overflow-x-auto border border-[var(--border-subtle)] rounded-xl">
              <table className="min-w-full divide-y divide-[var(--border-subtle)] text-xs text-[var(--text-secondary)]">
                <thead>
                  <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                    <th className="px-4 py-3 text-left">Scenario</th>
                    <th className="px-4 py-3 text-left">Local Packet Loss</th>
                    <th className="px-4 py-3 text-left">Gaming Impact</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-subtle)] bg-[var(--bg-surface)]/20">
                  <tr>
                    <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">Device at edge of single router range (weak signal)</td>
                    <td className="px-4 py-3 text-red-500">1.5 – 5%</td>
                    <td className="px-4 py-3 text-red-500">Severe — position teleporting, shot desync</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">Device connected to nearby mesh satellite (strong signal)</td>
                    <td className="px-4 py-3 text-emerald-400">&lt; 0.1%</td>
                    <td className="px-4 py-3 text-emerald-400">Excellent — imperceptible</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">During mesh node roaming handoff</td>
                    <td className="px-4 py-3 text-amber-500">~5% burst (50–200ms window)</td>
                    <td className="px-4 py-3 text-amber-500">Momentary freeze or disconnect during handoff</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">Ethernet backhaul + device wired to satellite LAN port</td>
                    <td className="px-4 py-3 text-emerald-400 font-bold">~0%</td>
                    <td className="px-4 py-3 text-emerald-400 font-bold">Equivalent to single-router Ethernet connection</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              To measure your current packet loss and identify which hop is dropping frames, use our{" "}
              <Link href="/gaming-packet-loss-fix" className="text-[var(--brand-400)] hover:underline font-semibold">
                Gaming Packet Loss Fix Guide
              </Link>.
            </p>
          </div>
        </section>

        {/* SECTION 11: Large Houses */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Home size={18} className="text-cyan-400" />
            10. Mesh WiFi in Large Houses: Multi-Floor Coverage
          </h2>
          <div className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed space-y-3">
            <p>
              Large homes present the ideal use case for mesh WiFi — but the architecture needs to be designed deliberately around gaming requirements:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-xs text-[var(--text-muted)]">
              <li><strong>2-Floor Homes:</strong> Place the primary node on the ground floor adjacent to the modem. Place one satellite on the upper floor. If the gaming PC or console is on the upper floor, run an Ethernet cable from the satellite's LAN port into the device. The satellite handles local wireless for phones and tablets wirelessly.</li>
              <li><strong>3-Floor Homes:</strong> Use 3 nodes — one per floor. Run Ethernet backhaul between floors using existing cable runs or in-wall cable paths. Avoid daisy-chaining wirelessly across more than one satellite hop for gaming traffic.</li>
              <li><strong>Long Corridors:</strong> Place satellite nodes at each end of long hallways. The 5GHz band decays quickly over long distances; a satellite every 40–50 feet (12–15 meters) maintains backhaul link quality above the 400 Mbps threshold needed for reliable gaming.</li>
              <li><strong>Concrete Walls:</strong> The 5GHz band loses 15–20 dBm passing through a single concrete wall. Always place nodes on the same side of a concrete wall as the gaming device, or use Ethernet to bypass the obstacle entirely.</li>
            </ul>
          </div>
        </section>

        {/* SECTION 12: Apartments */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Server size={18} className="text-cyan-400" />
            11. Mesh WiFi in Apartments: Managing Congestion
          </h2>
          <div className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed space-y-3">
            <p>
              In apartment buildings, wireless congestion is a major gaming performance killer. Dozens of overlapping networks on the same channels create constant airtime contention. In this environment:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-xs text-[var(--text-muted)]">
              <li><strong>For small apartments under 800 sq ft:</strong> A single gaming router is preferable to a mesh system. Fewer wireless radios mean less interference contribution from your own network.</li>
              <li><strong>Use the 6GHz band for gaming clients:</strong> If your apartment uses a Wi-Fi 6E or Wi-Fi 7 mesh system, force your gaming devices onto the 6GHz band. Legacy devices cannot use 6GHz, making it a clean, interference-free channel in most apartments.</li>
              <li><strong>Avoid DFS channels on the 5GHz band:</strong> DFS channels (52–144) require routers to yield to radar signals. In airports or near weather stations, this can trigger a 60-second channel scan, dropping all wireless connections. Use non-DFS 5GHz channels (36–48 or 149–165) for the backhaul.</li>
              <li><strong>Disable Smart Connect / Band Steering:</strong> In dense environments, let your gaming device manually connect to the 6GHz or 5GHz band rather than relying on automatic band steering, which may assign it to a more congested band.</li>
            </ul>
          </div>
        </section>

        {/* SECTION 13: PS5 & Xbox */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Gamepad2 size={18} className="text-cyan-400" />
            12. Mesh WiFi for PS5 and Xbox: NAT, UPnP, and Roaming
          </h2>
          <div className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed space-y-3">
            <p>
              Connecting game consoles through a mesh network requires specific configuration to avoid NAT and UPnP issues:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-xs text-[var(--text-muted)]">
              <li><strong>NAT Type:</strong> Ensure your mesh system operates in router mode (not access point mode combined with an ISP gateway router), which would create a Double NAT condition. Double NAT causes NAT Type 3 (Strict) on PlayStation and NAT Type Strict on Xbox, blocking peer-to-peer matchmaking. If using your ISP's gateway alongside the mesh, set the ISP gateway to IP Passthrough or DMZ mode pointing to the primary mesh node.</li>
              <li><strong>UPnP:</strong> Enable UPnP (Universal Plug and Play) on the primary mesh node. This allows the PS5 and Xbox to automatically open the ports required for their online services (PlayStation Network, Xbox Live) without manual port forwarding rules.</li>
              <li><strong>Disable Roaming for Consoles:</strong> Consoles are stationary. Configure a static DHCP IP and set the console's connection to prefer a specific node (usually the one nearest to your TV). This prevents the system from performing unnecessary roaming handoffs during gameplay sessions.</li>
              <li><strong>Connect via Ethernet from Satellite:</strong> The single most impactful improvement — run a Cat6 cable from the nearest mesh satellite's LAN port directly into your PS5 or Xbox. This bypasses all wireless overhead for the device itself while still benefiting from the mesh's wide-area coverage for other devices.</li>
            </ul>
          </div>
        </section>

        {/* SECTION 14: Gaming PCs */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Cpu size={18} className="text-cyan-400" />
            13. Mesh WiFi for Gaming PCs: Adapter Selection
          </h2>
          <div className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed space-y-3">
            <p>
              To fully leverage a Wi-Fi 6E or Wi-Fi 7 mesh network on your gaming PC, you need a compatible client adapter. Recommended options:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-xs text-[var(--text-muted)]">
              <li><strong>Intel AX200:</strong> Wi-Fi 6 (802.11ax) M.2 module. Supports 2.4GHz and 5GHz bands with 2×2 MIMO. Excellent driver stability. Ideal for pairing with Wi-Fi 6 mesh systems.</li>
              <li><strong>Intel AX210:</strong> Wi-Fi 6E (802.11ax) M.2 module. Adds 6GHz band support, allowing connection to the clean 6GHz backhaul-adjacent band on a Wi-Fi 6E mesh system. Best-in-class for Wi-Fi 6E mesh configurations.</li>
              <li><strong>Intel BE200:</strong> Wi-Fi 7 (802.11be) M.2 module with Multi-Link Operation. Note: currently has compatibility limitations with some AMD platforms — verify motherboard support before purchase. Pairs perfectly with Wi-Fi 7 mesh systems like the ASUS ZenWiFi BQ16.</li>
              <li><strong>Qualcomm FastConnect 7800:</strong> Wi-Fi 7 chipset featuring EMLSR and STR MLO modes. Included in select premium gaming laptops and high-end desktop motherboards (ASUS ROG, MSI MEG series).</li>
            </ul>
            <p>
              For more details on Wi-Fi 7 adapter selection and setup, see our guide:{" "}
              <Link href="/wifi-7-for-gaming" className="text-[var(--brand-400)] hover:underline font-semibold">
                Wi-Fi 7 for Gaming Guide
              </Link>.
            </p>
          </div>
        </section>

        {/* SECTION 15: Best Mesh Systems */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Server size={18} className="text-cyan-400" />
            14. Best Mesh WiFi Systems for Gaming (All Budgets)
          </h2>
          <div className="overflow-x-auto border border-[var(--border-subtle)] rounded-xl">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-xs text-[var(--text-secondary)]">
              <thead>
                <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                  <th className="px-4 py-3 text-left">System</th>
                  <th className="px-4 py-3 text-left">Tier</th>
                  <th className="px-4 py-3 text-left">WiFi Standard</th>
                  <th className="px-4 py-3 text-left">Backhaul</th>
                  <th className="px-4 py-3 text-left">Gaming Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)] bg-[var(--bg-surface)]/20">
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">TP-Link Deco X55</td>
                  <td className="px-4 py-3 text-amber-500">Budget</td>
                  <td className="px-4 py-3">Wi-Fi 6 Dual-Band</td>
                  <td className="px-4 py-3 text-red-500">Shared 5GHz</td>
                  <td className="px-4 py-3 text-amber-500">★★★☆☆ Acceptable</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">ASUS ZenWiFi XT9</td>
                  <td className="px-4 py-3 text-cyan-400">Mid-Range</td>
                  <td className="px-4 py-3">Wi-Fi 6 Tri-Band</td>
                  <td className="px-4 py-3 text-emerald-400">Dedicated 5GHz</td>
                  <td className="px-4 py-3 text-emerald-400">★★★★☆ Very Good</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">TP-Link Deco XE75 Pro</td>
                  <td className="px-4 py-3 text-cyan-400">Mid-Range</td>
                  <td className="px-4 py-3">Wi-Fi 6E Tri-Band</td>
                  <td className="px-4 py-3 text-emerald-400">Dedicated 6GHz</td>
                  <td className="px-4 py-3 text-emerald-400">★★★★☆ Very Good</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">Netgear Orbi 970</td>
                  <td className="px-4 py-3 text-purple-400">Premium</td>
                  <td className="px-4 py-3">Wi-Fi 7 Quad-Band</td>
                  <td className="px-4 py-3 text-emerald-400 font-semibold">Dedicated 6GHz (MLO)</td>
                  <td className="px-4 py-3 text-emerald-400 font-bold">★★★★★ Outstanding</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">ASUS ZenWiFi BQ16</td>
                  <td className="px-4 py-3 text-purple-400">Premium</td>
                  <td className="px-4 py-3">Wi-Fi 7 Tri-Band</td>
                  <td className="px-4 py-3 text-emerald-400 font-semibold">Dedicated 6GHz (MLO)</td>
                  <td className="px-4 py-3 text-emerald-400 font-bold">★★★★★ Outstanding</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">Ubiquiti UniFi (U7 Pro)</td>
                  <td className="px-4 py-3 text-rose-400">Enterprise</td>
                  <td className="px-4 py-3">Wi-Fi 7 (requires controller)</td>
                  <td className="px-4 py-3 text-emerald-400 font-semibold">Ethernet (PoE)</td>
                  <td className="px-4 py-3 text-emerald-400 font-bold">★★★★★ Best in Class</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            For a broader router comparison, see our guide:{" "}
            <Link href="/best-router-for-gaming" className="text-[var(--brand-400)] hover:underline font-semibold">
              Best Router for Gaming
            </Link>.
          </p>
        </section>

        {/* SECTION 16: Best Mesh Settings */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Settings size={18} className="text-cyan-400" />
            15. Best Mesh Settings for Gaming
          </h2>
          <div className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed space-y-3">
            <p>Configure these settings on your primary mesh node for lowest-latency gaming:</p>
            <ul className="list-disc pl-5 space-y-2 text-xs text-[var(--text-muted)]">
              <li><strong>QoS / Device Priority:</strong> Assign your gaming device MAC address to Highest Priority in the mesh admin app. This ensures gaming UDP packets are dequeued before streaming or bulk download traffic.</li>
              <li><strong>SQM (Smart Queue Management):</strong> Enable CAKE or FQ-CoDel on the WAN interface of the primary node. Set upload and download limits to 90% of your measured ISP speed. This prevents bufferbloat — the leading cause of ping spikes under load.</li>
              <li><strong>Channel Width (6GHz):</strong> Set the 6GHz band to 160 MHz or 320 MHz (Wi-Fi 7). Avoid using 320 MHz if neighboring networks are causing co-channel interference; 160 MHz on a clean channel often delivers more stable latency.</li>
              <li><strong>DNS:</strong> Set the primary node's DNS to Cloudflare (1.1.1.1) or Google (8.8.8.8) to reduce DNS resolution latency by 10–30ms compared to default ISP DNS servers.</li>
              <li><strong>Roaming Aggressiveness:</strong> Set to Low or Medium for your gaming room. This prevents stationary gaming devices from unnecessarily roaming to a more distant node during a gameplay session.</li>
              <li><strong>Disable Band Steering for Gaming Devices:</strong> Manually assign your gaming console or PC to the 6GHz or 5GHz band rather than relying on the auto band-steering algorithm, which may select a congested 2.4GHz connection.</li>
            </ul>
            <p>
              For complete router-level configuration instructions:{" "}
              <Link href="/best-router-settings-for-gaming" className="text-[var(--brand-400)] hover:underline font-semibold">
                Best Router Settings for Gaming
              </Link>{" "}and{" "}
              <Link href="/best-qos-settings-for-gaming" className="text-[var(--brand-400)] hover:underline font-semibold">
                Best QoS Settings for Gaming
              </Link>.
            </p>
          </div>
        </section>

        {/* SECTION 17: Real Game Testing */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Gamepad2 size={18} className="text-cyan-400" />
            16. Real-World Game Latency Tests: Mesh vs. Single Router vs. Ethernet
          </h2>
          <div className="overflow-x-auto border border-[var(--border-subtle)] rounded-xl">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-xs text-[var(--text-secondary)]">
              <thead>
                <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                  <th className="px-4 py-3 text-left">Game</th>
                  <th className="px-4 py-3 text-left">Ethernet</th>
                  <th className="px-4 py-3 text-left">Single Router (Wi-Fi 6)</th>
                  <th className="px-4 py-3 text-left">Mesh Wireless (Tri-Band)</th>
                  <th className="px-4 py-3 text-left">Mesh Ethernet Backhaul</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)] bg-[var(--bg-surface)]/20">
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">Valorant (128-tick)</td>
                  <td className="px-4 py-3 text-emerald-400 font-bold">&lt; 0.5 ms</td>
                  <td className="px-4 py-3 text-emerald-400">3 – 6 ms</td>
                  <td className="px-4 py-3 text-emerald-400">5 – 10 ms</td>
                  <td className="px-4 py-3 text-emerald-400 font-semibold">3 – 7 ms</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">Counter-Strike 2 (128-tick)</td>
                  <td className="px-4 py-3 text-emerald-400 font-bold">&lt; 0.5 ms</td>
                  <td className="px-4 py-3 text-emerald-400">3 – 7 ms</td>
                  <td className="px-4 py-3 text-emerald-400">5 – 11 ms</td>
                  <td className="px-4 py-3 text-emerald-400 font-semibold">3 – 8 ms</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">Warzone (64-tick)</td>
                  <td className="px-4 py-3 text-emerald-400 font-bold">&lt; 0.5 ms</td>
                  <td className="px-4 py-3 text-emerald-400">2 – 5 ms</td>
                  <td className="px-4 py-3 text-emerald-400">4 – 9 ms</td>
                  <td className="px-4 py-3 text-emerald-400 font-semibold">2 – 6 ms</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">Fortnite (30-tick)</td>
                  <td className="px-4 py-3 text-emerald-400 font-bold">&lt; 0.5 ms</td>
                  <td className="px-4 py-3 text-emerald-400">2 – 4 ms</td>
                  <td className="px-4 py-3 text-emerald-400">4 – 8 ms</td>
                  <td className="px-4 py-3 text-emerald-400 font-semibold">2 – 5 ms</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">Apex Legends (20-tick)</td>
                  <td className="px-4 py-3 text-emerald-400 font-bold">&lt; 0.5 ms</td>
                  <td className="px-4 py-3 text-emerald-400">2 – 4 ms</td>
                  <td className="px-4 py-3 text-emerald-400">4 – 8 ms</td>
                  <td className="px-4 py-3 text-emerald-400 font-semibold">2 – 5 ms</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-[10px] text-[var(--text-muted)]">
            * All values represent local hop latency addition only. Total in-game ping depends on your ISP routing path to the game server. To reduce total ping, see our{" "}
            <Link href="/high-ping-fix" className="text-[var(--brand-400)] hover:underline">High Ping Fix Guide</Link>.
          </p>
        </section>

        {/* SECTION 18: Myths */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <AlertTriangle size={18} className="text-cyan-400" />
            17. Mesh WiFi Gaming Myths Debunked
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {[
              {
                myth: "Mesh WiFi always lowers ping",
                truth: "False. A poorly configured dual-band mesh system can add 8–25ms compared to a single router. Only a dedicated tri-band backhaul or Ethernet backhaul keeps latency competitive.",
              },
              {
                myth: "Mesh replaces the need for Ethernet",
                truth: "Partially false. For mobile devices and casual gaming, mesh WiFi is excellent. But for competitive FPS, a Cat6 cable from the nearest mesh satellite node directly into your gaming device remains the most reliable configuration.",
              },
              {
                myth: "More mesh nodes always help",
                truth: "False. Adding unnecessary nodes compounds wireless hop latency. Use the minimum number of nodes needed to cover your home. More nodes without wired backhaul means more potential failure points.",
              },
              {
                myth: "WiFi 7 mesh guarantees zero lag",
                truth: "False. WiFi 7 MLO dramatically reduces local wireless latency to 1–2ms, but cannot eliminate ISP routing delays, congested game servers, or poor backhaul placement. Local conditions still matter.",
              },
              {
                myth: "Roaming is instant and harmless",
                truth: "False. Even with 802.11r fast roaming, a handoff takes 50–200ms. Without fast BSS transition, it can take 500–2,000ms — enough to drop you from a competitive lobby. Disable aggressive roaming for stationary gaming setups.",
              },
            ].map((item) => (
              <div key={item.myth} className="p-4 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl space-y-2">
                <h3 className="font-bold text-amber-400 flex items-center gap-1.5 text-xs">
                  <CheckCircle2 size={13} /> {item.myth}
                </h3>
                <p className="text-[var(--text-muted)] leading-relaxed text-[11px]">
                  <strong>Debunked:</strong> {item.truth}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 19: Upgrade Decision Tree */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <TrendingDown size={18} className="text-cyan-400" />
            18. Upgrade Decision Guide: Should You Use Mesh?
          </h2>
          <div className="space-y-4">
            {/* Situation table */}
            <div className="overflow-x-auto border border-[var(--border-subtle)] rounded-xl">
              <table className="min-w-full divide-y divide-[var(--border-subtle)] text-xs text-[var(--text-secondary)]">
                <thead>
                  <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                    <th className="px-4 py-3 text-left">Situation</th>
                    <th className="px-4 py-3 text-left">Recommendation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-subtle)] bg-[var(--bg-surface)]/20">
                  <tr>
                    <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">Small Apartment (&lt; 1,000 sq ft)</td>
                    <td className="px-4 py-3 text-emerald-400 font-semibold">Single Gaming Router — less overhead, lower latency</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">Large Home (&gt; 2,500 sq ft)</td>
                    <td className="px-4 py-3 text-cyan-400 font-semibold">Mesh WiFi (Tri-Band + Ethernet Backhaul if possible)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">Multiple Floors</td>
                    <td className="px-4 py-3 text-cyan-400 font-semibold">Mesh WiFi — one node per floor with wired inter-floor backhaul</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">Dedicated Competitive Gaming Room</td>
                    <td className="px-4 py-3 text-amber-500 font-semibold">Ethernet direct — use mesh for rest of home only</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">Mixed Devices Household</td>
                    <td className="px-4 py-3 text-cyan-400 font-semibold">Mesh WiFi — covers all devices; wire the gaming console separately</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Buying Recommendation by User Type */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wide">Buying Recommendations by Gaming Profile</h3>
              <div className="overflow-x-auto border border-[var(--border-subtle)] rounded-xl">
                <table className="min-w-full divide-y divide-[var(--border-subtle)] text-xs text-[var(--text-secondary)]">
                  <thead>
                    <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                      <th className="px-4 py-3 text-left">User Type</th>
                      <th className="px-4 py-3 text-left">Best Choice</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border-subtle)] bg-[var(--bg-surface)]/20">
                    <tr>
                      <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">Casual Gamer</td>
                      <td className="px-4 py-3">Single Router (or budget dual-band mesh for larger apartments)</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">Large Home Gamer</td>
                      <td className="px-4 py-3 text-cyan-400 font-semibold">Tri-Band Mesh — ASUS ZenWiFi XT9 or Deco XE75 Pro</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">Streamer</td>
                      <td className="px-4 py-3 text-cyan-400 font-semibold">Wi-Fi 6E Mesh — ensures upload stream and game traffic use separate bands</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">Competitive Gamer</td>
                      <td className="px-4 py-3 text-amber-500 font-semibold">Ethernet from nearest node — Mesh WiFi 7 (ASUS BQ16 / Orbi 970) as backbone</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">Smart Home User</td>
                      <td className="px-4 py-3 text-cyan-400">Wi-Fi 6E or 7 Mesh — handles 50+ concurrent IoT devices cleanly</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 20: Future of Gaming WiFi */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Network size={18} className="text-cyan-400" />
            19. The Future of Gaming Mesh Networks
          </h2>
          <div className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed space-y-3">
            <p>
              The next generation of mesh networking is already emerging, driven by the needs of cloud gaming, VR, and increasingly dense smart homes:
            </p>
            <ul className="list-disc pl-5 space-y-3 text-xs text-[var(--text-muted)]">
              <li>
                <strong>WiFi 7 Mesh with Full MLO:</strong> The next wave of mesh systems will use Multi-Link Operation on both the backhaul and client connections simultaneously. This means the backhaul between nodes can bond 5GHz + 6GHz, while client devices also use MLO. The result is a self-healing, multi-path network that maintains near-zero local latency even under heavy congestion.
              </li>
              <li>
                <strong>WiFi 8 (802.11bn) Ultra High Reliability:</strong> The upcoming 802.11bn standard targets Ultra High Reliability (UHR) — effectively guaranteeing packet delivery with deterministic latency. This will make wireless mesh networks suitable even for mission-critical real-time applications like competitive esports.
              </li>
              <li>
                <strong>AI-Driven Dynamic Routing:</strong> Upcoming mesh systems will use on-device AI inference to predict congestion patterns and pre-emptively route gaming packets through the optimal path before interference occurs — rather than reacting to it after.
              </li>
              <li>
                <strong>Cloud Gaming & 8K Streaming:</strong> As GeForce Now, Xbox Cloud Gaming, and PlayStation Remote Play require both high bandwidth (50–100 Mbps per stream) and ultra-low latency (&lt;20ms total), WiFi 7 mesh with dedicated 6GHz backhaul will become the minimum recommended configuration.
              </li>
              <li>
                <strong>VR/AR Networking:</strong> Standalone VR headsets (Meta Quest 4, PSVR3) will require dedicated wireless connections with &lt;5ms local latency and &gt;500 Mbps throughput. WiFi 7 mesh with MLO is designed to support these requirements without a tethered cable.
              </li>
            </ul>
            <p>
              To stay ahead of these changes, see our deep-dive on the latest wireless standard:{" "}
              <Link href="/wifi-7-for-gaming" className="text-[var(--brand-400)] hover:underline font-semibold">
                Wi-Fi 7 for Gaming Guide
              </Link>{" "}and{" "}
              <Link href="/wifi-6-for-gaming" className="text-[var(--brand-400)] hover:underline font-semibold">
                Wi-Fi 6 for Gaming Guide
              </Link>.
            </p>
          </div>
        </section>

        {/* Internal Link Grid */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Info size={18} className="text-cyan-400" />
            20. Related Gaming Network Guides
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {[
              { href: "/wifi-7-for-gaming", label: "Wi-Fi 7 for Gaming Guide" },
              { href: "/wifi-6-for-gaming", label: "Wi-Fi 6 for Gaming Guide" },
              { href: "/ethernet-vs-wifi-gaming", label: "Ethernet vs. Wi-Fi for Gaming" },
              { href: "/best-router-for-gaming", label: "Best Router for Gaming" },
              { href: "/gaming-router-vs-normal-router", label: "Gaming Router vs. Normal Router" },
              { href: "/best-router-settings-for-gaming", label: "Best Router Settings for Gaming" },
              { href: "/best-qos-settings-for-gaming", label: "Best QoS Settings for Gaming" },
              { href: "/high-ping-fix", label: "High Ping Fix Guide" },
              { href: "/gaming-jitter-fix", label: "Gaming Jitter Fix Guide" },
              { href: "/gaming-packet-loss-fix", label: "Gaming Packet Loss Fix" },
              { href: "/gaming-network-optimization", label: "Gaming Network Optimization" },
              { href: "/cat6-vs-cat8-for-gaming", label: "Cat6 vs Cat8 for Gaming" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-2 p-3 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-lg hover:border-[var(--brand-800)] hover:text-[var(--brand-400)] transition-all duration-200 text-[var(--text-secondary)] font-semibold"
              >
                <ArrowRight size={12} className="text-[var(--brand-400)] shrink-0" />
                {label}
              </Link>
            ))}
          </div>
        </section>

      </div>
    </TroubleshootingArticleShell>
  );
}
