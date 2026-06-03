import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import TroubleshootingArticleShell from "@/components/tools/TroubleshootingArticleShell";
import ConnectionOptimizerClient from "@/components/tools/ConnectionOptimizerClient";
import {
  Settings,
  Wifi,
  Globe,
  Shield,
  Terminal,
  Activity,
  Network,
  Cpu,
  Zap,
  HardDrive,
  Gamepad2,
  BarChart3,
  BookOpen,
} from "lucide-react";

// =============================================================
// Premium SEO Metadata
// =============================================================

export const metadata: Metadata = buildMetadata({
  title: "Best Router Settings for Gaming: Reduce Ping, Fix NAT & Stop Lag | RouterVia",
  description:
    "Optimize your router for competitive gaming. Configure QoS, fix Strict NAT, tune MTU, enable UPnP, choose gaming DNS, and eliminate bufferbloat with this expert router settings guide.",
  canonical: "/best-router-settings-for-gaming",
  keywords: [
    "best router settings for gaming",
    "gaming router settings",
    "router optimization for gaming",
    "reduce gaming lag",
    "best gaming network settings",
    "gaming router configuration",
    "qos gaming",
    "bufferbloat",
    "nat type",
    "packet loss gaming",
    "low latency gaming",
    "gaming wifi settings",
  ],
});

// =============================================================
// Breadcrumbs
// =============================================================

const breadcrumbs = [
  { name: "Gaming Tools", url: "/nat-type-checker" },
  { name: "Best Router Settings for Gaming", url: "/best-router-settings-for-gaming" },
];

// =============================================================
// Troubleshooting Steps (Renders at the top of the shell)
// =============================================================

const troubleshootingSteps = [
  {
    title: "Prioritize Gaming Traffic using QoS Capping",
    description:
      "Log into your router admin panel and navigate to the QoS or Traffic Control tab. Run a local speed test to measure your bandwidth. Set the QoS upload and download limits to exactly 85% to 90% of your maximum provisioned line speed. Capping bandwidth prevents the router's buffer from saturating (bufferbloat) when other devices on the network initiate bulk downloads or cloud backups. Assign your gaming console or PC Highest or Real-time priority.",
    tip: "A common mistake is setting QoS limits to 100% or higher. This defeats the queue-management mechanism. The 10% headroom is required for the queue-management algorithms to process gaming packets immediately.",
  },
  {
    title: "Open Your Ports: Enable UPnP or Setup Manual Port Forwarding",
    description:
      "Access the WAN, NAT Forwarding, or Advanced settings on your router. Enable Universal Plug and Play (UPnP) to allow game clients to open inbound ports automatically. If UPnP is disabled for security reasons or fails to establish an Open NAT type, configure manual port forwarding. Assign your gaming device a static IP address through DHCP Reservation, then forward the necessary platform-specific ports (e.g., UDP 3074 for general console gaming).",
    tip: "If you run multiple consoles of the same brand in a single household (like two Xboxes), UPnP can struggle to route port 3074. Set custom network ports in each console's advanced settings to prevent collisions.",
  },
  {
    title: "Select a Dedicated 5 GHz or 6 GHz Wi-Fi Channel",
    description:
      "If a wired connection is impossible, disable Band Steering (which dynamically switches your connection between 2.4 GHz and 5 GHz bands). Create a separate, dedicated SSID for your 5 GHz or 6 GHz band and connect only your gaming hardware to it. Use a Wi-Fi analyzer tool to locate the least crowded channel in your area. Avoid channels 52-144 if you live near an airport to prevent DFS radar avoidance drops, and lock your channel width to 80 MHz.",
    tip: "Avoid 160 MHz channel width for gaming. While it boasts higher peak throughput, it has fewer available channels, forcing the router onto DFS bands which can disconnect you for up to a minute if radar signals are detected.",
  },
  {
    title: "Configure the Router MTU for Maximum Payload Size",
    description:
      "Navigate to your router's WAN setup page and inspect the Maximum Transmission Unit (MTU) value. For standard cable or fiber connections using DHCP, ensure it is set to 1500. For DSL connections using PPPoE protocol encapsulation, reduce the MTU to 1492 to accommodate the 8-byte PPPoE header. Mismatched MTU values force your packet packets to undergo fragmenting at each hop, degrading ping by 15-30ms.",
    tip: "Verify your optimal MTU using the ping command: 'ping -l 1472 -f 8.8.8.8'. If the ping reports that the packet needs to be fragmented, decrease the payload size (-l value) by 10 and re-test until you get a successful response.",
  },
];

// =============================================================
// FAQ Data (10 detailed technical FAQs)
// =============================================================

const faqs = [
  {
    question: "Does configuring QoS on my router reduce my ping?",
    answer:
      "QoS does not reduce your baseline ping under idle network conditions (e.g., if you have a 15ms ping to a local server, QoS won't lower it to 10ms). However, QoS prevents ping spikes (bufferbloat) under active network load. When other devices stream video, download patches, or sync backups, QoS ensures that your time-sensitive UDP gaming packets bypass the bulk queue. This keeps your ping stable at its baseline value, eliminating spikes from 20ms to 300ms.",
  },
  {
    question: "Should I disable UPnP for security reasons and use Port Forwarding instead?",
    answer:
      "From a strict cybersecurity perspective, manual port forwarding is more secure than UPnP because UPnP allows any software inside your network to open inbound ports without administrator approval. For maximum security, assign a static IP to your gaming device and configure manual port forwarding rules, then disable UPnP. However, for households with multiple consoles playing the same game, UPnP is often necessary because it can handle dynamic mapping allocations that static rules cannot.",
  },
  {
    question: "Is wired Ethernet always superior to Wi-Fi for gaming?",
    answer:
      "Yes, a physical Ethernet connection is always superior. Category 6 (Cat6) or Cat5e cables support full-duplex transmission (sending and receiving data simultaneously) and are immune to the electromagnetic interference, physical obstructions, and channel congestion that plague wireless signals. Even the fastest Wi-Fi 6E or Wi-Fi 7 connections are half-duplex (devices must take turns transmitting), which introduces jitter, packet loss, and variable latency overhead.",
  },
  {
    question: "Does changing my DNS server on the router improve live gameplay latency?",
    answer:
      "No, changing your DNS server does not improve your live, in-game ping. DNS (Domain Name System) is only responsible for translating domain names (like play.ea.com) into numeric IP addresses. Once your console or PC establishes a connection to the matchmaking server, all real-time game traffic travels directly to that IP address, bypassing the DNS resolver completely. However, a fast DNS like Cloudflare (1.1.1.1) will speed up lobby loads, matchmaking checks, and initial game server connections.",
  },
  {
    question: "What MTU size should I use on my router for gaming?",
    answer:
      "For cable, fiber, and general ethernet connections, the standard MTU should be set to 1500. If your ISP uses PPPoE (common with DSL and some fiber connections), you must reduce it to 1492. Setting the MTU too low can trigger unnecessary packet fragmentation, increasing packet header overhead. Setting it too high will cause routers along the path to discard or fragment the packet, adding processing latency and packet loss.",
  },
  {
    question: "What is the difference between Open NAT, Moderate NAT, and Strict NAT?",
    answer:
      "An Open NAT (Type 1 on PlayStation, Open on Xbox/PC) means your gaming device can accept inbound connections from any other device. You can host lobbies and connect to anyone. Moderate NAT (Type 2) means some ports are open, but others are blocked. You can connect to most players but may struggle to host or connect to Strict NAT players. Strict NAT (Type 3) means all inbound ports are blocked; your traffic is routed through slow relay servers, which adds significant latency and breaks voice chat.",
  },
  {
    question: "Should I enable or disable SIP ALG on my gaming router?",
    answer:
      "You should always disable SIP ALG (Session Initiation Protocol Application Layer Gateway). Although it was designed to improve voice-over-IP (VoIP) connections, it frequently misinterprets game packet structures, modifying their headers and breaking UDP port bindings. This leads to random disconnections, lobby errors, and can force your NAT type to become Strict. SIP ALG is found in the ALG, Firewall, or Security tabs of your router settings.",
  },
  {
    question: "Does enabling DMZ on my router protect my gaming PC?",
    answer:
      "No, enabling DMZ (Demilitarized Zone) on a Windows PC is extremely dangerous. DMZ forwards all inbound traffic that doesn't match an active port forwarding rule directly to the target device, completely bypassing your router's firewall. While this guarantees an Open NAT, it exposes all ports on your PC to the open internet, making it highly vulnerable to scanning and exploitation. DMZ should only be used as a last resort on dedicated gaming consoles (PS5, Xbox, Switch), which run closed operating systems.",
  },
  {
    question: "Should I enable or disable UPnP if I have multiple consoles?",
    answer:
      "You should enable UPnP if you have multiple consoles of the same type playing the same game. If you try to manually forward port 3074 to one console, the second console will be blocked and will fall back to Moderate or Strict NAT. UPnP handles this by dynamically mapping alternative ports (like 53584) to the second console, allowing both to play simultaneously. If UPnP conflicts occur, configure manual port selection in the advanced network menu of each console.",
  },
  {
    question: "How does co-channel interference affect Wi-Fi gaming?",
    answer:
      "Co-channel interference occurs when multiple nearby routers broadcast on the same wireless channel. On the 2.4 GHz band, there are only three non-overlapping channels (1, 6, and 11), meaning your router is likely sharing a channel with your neighbors. When two routers transmit simultaneously on the same channel, they trigger collisions, forcing your devices to discard the packet and request a retransmission. These retransmissions introduce lag spikes, jitter, and packet loss in online games.",
  },
];

// =============================================================
// Common Causes
// =============================================================

const commonCauses = [
  {
    title: "Bufferbloat under Network Load",
    desc: "Your router's memory buffer fills up with files, streams, or downloads, queuing your time-sensitive game packets and spiking latency from 20ms to 400ms.",
  },
  {
    title: "Strict NAT Routing Through Relays",
    desc: "Missing port maps force your game traffic to route through third-party relay servers instead of directly to peers, adding up to 80ms of latency.",
  },
  {
    title: "Wi-Fi Spectrum Congestion",
    desc: "Playing on 2.4 GHz causes wireless packet collisions and retransmissions due to interference from neighbor Wi-Fi networks and appliances.",
  },
  {
    title: "Incorrect MTU and Packet Fragmentation",
    desc: "Mismatched WAN MTU sizes force routers to split single game packets into multiple fragments, doubling routing overhead and causing packet loss.",
  },
  {
    title: "Aggressive Router Firewalls (SIP ALG)",
    desc: "SIP ALG modifies the header contents of UDP game packets, corrupting active NAT tables and causing random lobby drops or disconnects.",
  },
  {
    title: "Slow DNS Query Resolutions",
    desc: "Congested ISP DNS servers delay the initial lookup of matchmaking nodes, causing long lobby wait times and initial connection errors.",
  },
];

// =============================================================
// Quick Fix Checklist
// =============================================================

const quickFixChecklist = [
  "Verify your physical connection: Use a Cat6 Ethernet cable instead of Wi-Fi for 1ms stable routing.",
  "Access your router admin interface and enable UPnP under NAT or Advanced settings.",
  "Configure QoS: Cap upload and download limits to 90% of your line speed to prevent bufferbloat.",
  "Disable SIP ALG in the firewall or ALG settings to stop packet header manipulation.",
  "Switch to 5 GHz or 6 GHz Wi-Fi, lock the channel to 36-48 (UNII-1), and set channel width to 80 MHz.",
  "Disable Band Steering to prevent your gaming device from switching wireless bands mid-game.",
  "Set WAN MTU to 1500 for cable/fiber connections, or 1492 for PPPoE DSL networks.",
  "Update router DNS to public anycast resolvers: Cloudflare (1.1.1.1) and Google (8.8.8.8).",
];

// =============================================================
// Page Component
// =============================================================

export default function BestRouterSettingsForGamingPage() {
  return (
    <TroubleshootingArticleShell
      h1="Best Router Settings for Gaming: The Complete Optimization Guide"
      intro="For online gaming, speed is a secondary metric; latency, jitter, and packet loss are what dictate victory. Raw bandwidth (Mbps) is rarely the bottleneck because competitive gaming consumes less than 150 Kbps. The actual causes of lag, rubberbanding, and disconnected sessions are router-level configuration issues like bufferbloat, Strict NAT, and packet fragmentation. This guide covers every setting that impacts gaming networking, complete with menu paths for major router brands."
      category="nat"
      breadcrumbs={breadcrumbs}
      faqs={faqs}
      troubleshootingSteps={troubleshootingSteps}
      warningBanner={{
        title: "Physical Layer Prerequisite",
        text: "Software optimizations can only refine your connection. If your physical link is inherently unstable due to faulty cabling, signal attenuation, or co-channel interference, software settings cannot fully compensate. We highly recommend connecting your gaming PC or console via a Cat6 Ethernet cable prior to applying these optimizations.",
      }}
      quickFixChecklist={quickFixChecklist}
      commonCauses={commonCauses}
      whenToContactISP="Contact your ISP if you suspect your WAN IP lies behind a Carrier-Grade NAT (CGNAT) which prevents port forwarding, if your baseline ping to local hops remains high on a wired connection, or if you continue to experience packet loss at the first hop outside your home network (indicating physical line issues with the fiber node or copper junction)."
      severityLevel="low"
    >
      <div className="space-y-12">
        {/* SECTION 1: Quick AI Answer */}
        <section
          className="glass-card p-6 border border-cyan-950/20 bg-cyan-950/5 rounded-2xl relative overflow-hidden"
          aria-label="Quick AI Answer"
        >
          <div className="absolute top-0 right-0 bg-[var(--brand-500)]/10 text-[var(--brand-400)] text-[10px] font-mono uppercase tracking-wider px-3 py-1 rounded-bl-lg font-bold">
            Quick Summary
          </div>
          <h2 className="text-xs font-bold text-[var(--brand-400)] mb-3 uppercase tracking-wide">
            The Optimal Gaming Settings Blueprint
          </h2>
          <div className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed space-y-3">
            <p>
              To achieve the lowest latency and zero jitter, apply these core settings inside your router's administration interface:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-[var(--text-muted)]">
              <li><strong>Connection:</strong> Use a wired Ethernet cable (or 5GHz/6GHz Wi-Fi locked to a non-DFS channel like 36-48).</li>
              <li><strong>QoS:</strong> Enable Smart Queue Management (SQM) or Adaptive QoS and cap bandwidth to 85-90% of your speed.</li>
              <li><strong>NAT/Ports:</strong> Enable UPnP, or assign a static IP and configure manual Port Forwarding (target Open NAT).</li>
              <li><strong>MTU:</strong> Verify payload size and set MTU to 1500 (cable/fiber) or 1492 (PPPoE DSL).</li>
              <li><strong>Firewall/ALG:</strong> Disable SIP ALG to prevent corruption of UDP game states.</li>
            </ul>
          </div>
        </section>

        {/* Interactive Tool */}
        <section aria-label="Interactive Router Optimization Tool">
          <div className="mb-4">
            <h2 className="text-base font-bold text-[var(--text-primary)]">
              Interactive Latency Optimizer
            </h2>
            <p className="text-xs text-[var(--text-muted)] mt-1">
              Select your primary gaming platform and connection type to identify latent bottlenecks, calculate optimal MTU, and receive targeted configuration steps.
            </p>
          </div>
          <ConnectionOptimizerClient mode="latency" />
        </section>

        {/* SECTION 2: Gaming Symptoms Table */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Activity size={18} className="text-cyan-400" />
            1. Diagnostic Matrix: Common Gaming Symptoms
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Diagnosing the correct networking bottleneck is half the battle. Use this symptom matrix to identify your issue and jump straight to the relevant router optimization:
          </p>
          <div className="overflow-x-auto border border-[var(--border-subtle)] rounded-xl">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-xs text-[var(--text-secondary)]">
              <thead>
                <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                  <th className="px-4 py-3 text-left">Symptom</th>
                  <th className="px-4 py-3 text-left">Likely Network Cause</th>
                  <th className="px-4 py-3 text-left">Recommended Setting</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)] bg-[var(--bg-surface)]/20">
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">High Ping (Consistent)</td>
                  <td className="px-4 py-3">Sub-optimal routing paths, high geographical distance, or wrong DNS resolution.</td>
                  <td className="px-4 py-3">Switch DNS to Cloudflare/Google; verify game server location.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">Sudden Lag Spikes (Jitter)</td>
                  <td className="px-4 py-3">Bufferbloat from other devices downloading or uploading files.</td>
                  <td className="px-4 py-3">Configure QoS (Smart Queue Management) to 90% bandwidth cap.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">Character Rubberbanding</td>
                  <td className="px-4 py-3">Wireless packet collisions, signal interference, or severe packet loss.</td>
                  <td className="px-4 py-3">Connect via wired Cat6 Ethernet; switch to 5 GHz with 80MHz channel width.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">Voice Chat Drops / Lobby Failures</td>
                  <td className="px-4 py-3">Strict NAT type blocking inbound peer-to-peer (P2P) connections.</td>
                  <td className="px-4 py-3">Enable UPnP; forward port 3074; disable SIP ALG in firewall.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">Packet Loss (In-Game Stats)</td>
                  <td className="px-4 py-3">MTU payload fragmentation or faulty ISP node routing.</td>
                  <td className="px-4 py-3">Tune MTU (1500/1492) based on fragmentation testing.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">Matchmaking Errors / Slow Queues</td>
                  <td className="px-4 py-3">Strict NAT forcing connections through distant relay servers.</td>
                  <td className="px-4 py-3">Setup DHCP static reservation and configure manual port forwarding.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 3: How Gaming Traffic Travels */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Network size={18} className="text-cyan-400" />
            2. The Journey of a Gaming Packet: Latency Mechanics
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Understanding what happens between clicking a button and seeing an action on-screen is critical. A gaming packet is tiny (usually 50–150 bytes of UDP payload containing coordinate offsets and action states), but it must make a round-trip journey to the game server and back. This journey is divided into four distinct legs:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
            <div className="p-4 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h4 className="font-bold text-[var(--text-primary)]">1. The Client (PC/Console)</h4>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                The game engine packs your actions into a UDP packet. Operating system parameters (like TCP ACK frequency, network throttling, and driver queue sizes) dictate how fast the network card pushes this frame.
              </p>
            </div>
            <div className="p-4 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h4 className="font-bold text-[var(--text-primary)]">2. The Router (Local Hop)</h4>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                The router inspects the destination header, translates the local IP to a public IP (NAT), applies firewall rules, queues the packet, and transmits it. This is where configurations like QoS, UPnP, and MTU operate.
              </p>
            </div>
            <div className="p-4 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h4 className="font-bold text-[var(--text-primary)]">3. The ISP & Transit Nodes</h4>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                Your ISP routes the packet through fiber optic backbones, switches, and peering exchanges. Peering agreements, fiber congestion, and routing paths dictate the latency of this leg.
              </p>
            </div>
            <div className="p-4 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h4 className="font-bold text-[var(--text-primary)]">4. The Game Server</h4>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                The server receives the action, simulates it in the global state, and broadcasts the result back. Server tick rate (e.g., 64Hz or 128Hz) determines how fast the server processes your packet.
              </p>
            </div>
          </div>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            The total round-trip time (RTT) is the sum of these four legs. While you cannot control the ISP's routing or the game server's location, <strong>the local router is the primary source of controllable latency spikes</strong>. Under load, a misconfigured router can inflate a 15ms base ping to over 400ms due to packet queuing (bufferbloat) and transmission retries (Wi-Fi packet collisions).
          </p>
        </section>

        {/* SECTION 4: Router Settings That Matter Most */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <BarChart3 size={18} className="text-cyan-400" />
            3. Hierarchy of Impact: Router Settings Prioritization
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Not all router settings are created equal. Changing your DNS will have a negligible effect compared to fixing a Strict NAT or setting up Smart Queue Management (SQM) QoS. Use this hierarchy table to guide your optimization efforts:
          </p>
          <div className="overflow-x-auto border border-[var(--border-subtle)] rounded-xl">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-xs text-[var(--text-secondary)]">
              <thead>
                <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                  <th className="px-4 py-3 text-left">Priority</th>
                  <th className="px-4 py-3 text-left">Feature / Setting</th>
                  <th className="px-4 py-3 text-left">Primary Benefit for Gaming</th>
                  <th className="px-4 py-3 text-left">Estimated Impact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)] bg-[var(--bg-surface)]/20">
                <tr>
                  <td className="px-4 py-3 text-red-400 font-mono font-bold">1 (Critical)</td>
                  <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">QoS Capping (Bufferbloat)</td>
                  <td className="px-4 py-3">Prevents ping spikes and jitter during household downloads/uploads.</td>
                  <td className="px-4 py-3 text-red-500 font-bold">Eliminates 90% of lag spikes</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-red-400 font-mono font-bold">2 (Critical)</td>
                  <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">UPnP / Port Forwarding</td>
                  <td className="px-4 py-3">Opens NAT to avoid relays, enabling voice chat and peer matchmaking.</td>
                  <td className="px-4 py-3 text-red-500 font-bold">Opens NAT, drops ping by 30-80ms</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-yellow-400 font-mono font-bold">3 (High)</td>
                  <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">Physical Ethernet Connection</td>
                  <td className="px-4 py-3">Replaces half-duplex Wi-Fi, eliminating wireless packet collisions.</td>
                  <td className="px-4 py-3 text-yellow-400 font-bold">Prevents packet loss completely</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-yellow-400 font-mono font-bold">4 (High)</td>
                  <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">Wi-Fi Band & DFS Settings</td>
                  <td className="px-4 py-3">Bypasses co-channel interference and prevents dynamic radar disconnects.</td>
                  <td className="px-4 py-3 text-yellow-400 font-bold">Stabilizes Wi-Fi jitter</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-blue-400 font-mono font-bold">5 (Medium)</td>
                  <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">MTU Optimization</td>
                  <td className="px-4 py-3">Prevents path packet fragmentation, reducing router CPU load.</td>
                  <td className="px-4 py-3 text-blue-400 font-bold">Saves 10-20ms of routing overhead</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-blue-400 font-mono font-bold">6 (Low)</td>
                  <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">DNS Servers Configuration</td>
                  <td className="px-4 py-3">Speeds up initial domain queries for faster matchmaking lobbies.</td>
                  <td className="px-4 py-3 text-blue-400 font-bold">Improves connection time only</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 5: Best QoS Settings */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <BarChart3 size={18} className="text-cyan-400" />
            4. Smart Queue Management & Best QoS Settings
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Quality of Service (QoS) configurations differ dramatically based on router hardware. Basic QoS (found in old or cheap routers) uses simple packet prioritization based on port numbers or IP ranges. If a download is saturating your connection, basic QoS will still struggle to keep gaming latency low because it doesn't solve the underlying buffer queuing.
          </p>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Modern optimization relies on <strong>Smart Queue Management (SQM)</strong>. SQM uses active queue management algorithms to keep your network buffers empty:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h4 className="text-xs font-bold text-cyan-400 font-mono">FQ-CoDel (Fair Queueing Controlled Delay)</h4>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                FQ-CoDel breaks down your network traffic into separate sub-queues (one for each data flow). It automatically prioritizes packets from small, low-bandwidth flows (like UDP gaming packets) while penalizing large bulk flows (like downloads). It actively discards packets from bloated queues to force TCP scaling, keeping overall buffers empty.
              </p>
            </div>
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h4 className="text-xs font-bold text-emerald-400 font-mono">CAKE (Common Applications Kept Enhanced)</h4>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                CAKE is a more advanced successor to FQ-CoDel. It handles bandwidth shaping internally and incorporates host fairness (preventing a single laptop from hogging the connection). It automatically parses diffserv markings to classify gaming traffic and manages overhead calculations for DSL, cable, and fiber encapsulation natively.
              </p>
            </div>
          </div>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            For step-by-step instructions on setting up advanced queuing algorithms on compatible firmware, read our comprehensive guide on{" "}
            <Link href="/best-qos-settings-for-gaming" className="text-[var(--brand-400)] hover:underline">Best QoS Settings for Gaming</Link>.
          </p>
        </section>

        {/* SECTION 6: Bufferbloat Explained */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Activity size={18} className="text-cyan-400" />
            5. Bufferbloat: The Latency Silent Killer
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            To understand why bandwidth capping is necessary, we must understand <strong>Bufferbloat</strong>. Routers are designed with physical memory buffers. When data arrives from your devices faster than your internet line can transmit it, the excess packets are written to this memory buffer to prevent packet loss.
          </p>
          <div className="p-5 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-2xl space-y-3">
            <h4 className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wide">
              Concrete Example: The Saturation Queue
            </h4>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              Suppose you have a fiber plan with 20 Mbps upload speed. If a smart home camera starts uploading a high-definition recording, it will attempt to push data at 25 Mbps. Your router receives 25 Mbps of data but can only send 20 Mbps. The extra 5 Mbps of packets must wait in the router's memory queue.
            </p>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              If the buffer is large, it can hold up to 500 milliseconds (half a second) of queued data. When you click to shoot in your game, your game packet arrives at the router. Instead of transmitting immediately, it must wait behind the queued security camera packets. The result: your ping jumps from 20ms to 420ms, causing immediate lag and desync.
            </p>
          </div>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            By capping your router's total speed at 90% of your actual line rate (e.g., setting the router's limit to 18 Mbps on a 20 Mbps line), the bottleneck is moved from the ISP's modem (which has unmanaged buffers) to the router itself. The router's SQM algorithm can now actively drop or queue bulk traffic before it ever saturates the line, keeping the buffer completely empty and maintaining a flat ping.
          </p>
        </section>

        {/* SECTION 7: NAT Configuration */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Shield size={18} className="text-cyan-400" />
            6. Deep NAT Configuration: Open, Moderate & Strict
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Network Address Translation (NAT) is what allows multiple devices in your home to share a single public IP address. However, NAT can interfere with multiplayer games that rely on inbound socket connections for matchmaking, voice communication, and hosting:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h4 className="font-bold text-green-400">Open NAT (Type 1)</h4>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                All inbound traffic on game-specific ports is allowed to reach your console. You can connect to all players, host lobbies, and hear voice chat without restriction.
              </p>
            </div>
            <div className="p-4 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h4 className="font-bold text-yellow-400">Moderate NAT (Type 2)</h4>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                Some ports are forwarded, allowing communication with most players. You may struggle to connect to players with Strict NAT, and you cannot host custom sessions.
              </p>
            </div>
            <div className="p-4 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h4 className="font-bold text-red-400">Strict NAT (Type 3)</h4>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                All inbound ports are closed. Your game must route through third-party relay servers, adding up to 80ms of latency, disabling voice chat, and breaking matchmaking queues.
              </p>
            </div>
          </div>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            If your router reports a Strict NAT type, follow our guide on{" "}
            <Link href="/nat-type-strict" className="text-[var(--brand-400)] hover:underline">Fixing Strict NAT Types</Link> to configure exceptions. Additionally, if your router's upstream interface is assigned a private IP address by your ISP, see our guide on{" "}
            <Link href="/double-nat-detected" className="text-[var(--brand-400)] hover:underline">Resolving Double NAT Networks</Link> to bridge your gateway settings.
          </p>
        </section>

        {/* SECTION 8: Port Forwarding Settings */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Network size={18} className="text-cyan-400" />
            7. Manual Port Forwarding for Stable Lobby Connections
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            When UPnP fails, manual port forwarding is required. Port forwarding maps specific external internet ports directly to your gaming console or PC. This bypasses the NAT firewall for those specific channels.
          </p>
          <div className="p-5 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl space-y-3">
            <h4 className="text-xs font-bold text-[var(--text-primary)]">Common Port Configurations by Platform</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <span className="font-bold text-[var(--text-primary)]">PC Gaming (Steam, Battle.net)</span>
                <p className="text-[11px] text-[var(--text-muted)] font-mono">
                  TCP: 27015-27030, 27036 | UDP: 27015, 27031-27036
                </p>
              </div>
              <div className="space-y-1">
                <span className="font-bold text-[var(--text-primary)]">Xbox Series X / S</span>
                <p className="text-[11px] text-[var(--text-muted)] font-mono">
                  TCP: 3074 | UDP: 88, 500, 3074, 3544, 4500
                </p>
              </div>
              <div className="space-y-1">
                <span className="font-bold text-[var(--text-primary)]">PlayStation 5 (PS5)</span>
                <p className="text-[11px] text-[var(--text-muted)] font-mono">
                  TCP: 3478-3480 | UDP: 3074, 3478-3479
                </p>
              </div>
              <div className="space-y-1">
                <span className="font-bold text-[var(--text-primary)]">Nintendo Switch</span>
                <p className="text-[11px] text-[var(--text-muted)] font-mono">
                  UDP: 1024-65535 (P2P Matchmaking Range)
                </p>
              </div>
            </div>
          </div>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Remember: to configure manual port forwarding, you must first assign a static local IP to your device to prevent the rules from breaking when your router restarts. If your manual rules are not registering, read our guide on{" "}
            <Link href="/port-forwarding-not-working" className="text-[var(--brand-400)] hover:underline">Troubleshooting Port Forwarding Issues</Link>.
          </p>
        </section>

        {/* SECTION 9: Ethernet vs Wi-Fi */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Wifi size={18} className="text-cyan-400" />
            8. Ethernet vs. Wi-Fi: The Physical Layer Truth
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            The difference between wired Ethernet and wireless Wi-Fi is not about throughput (speed); it is about media access control. Ethernet cables support full-duplex communication over dedicated copper lines, whereas Wi-Fi is a shared, half-duplex medium:
          </p>
          <div className="overflow-x-auto border border-[var(--border-subtle)] rounded-xl">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-xs text-[var(--text-secondary)]">
              <thead>
                <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                  <th className="px-4 py-3 text-left">Metric</th>
                  <th className="px-4 py-3 text-left">Wired (Cat6 Ethernet)</th>
                  <th className="px-4 py-3 text-left">Wireless (Wi-Fi 6E / 7)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)] bg-[var(--bg-surface)]/20">
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">Base Latency Overhead</td>
                  <td className="px-4 py-3 text-green-400 font-mono font-bold">&lt; 1 ms</td>
                  <td className="px-4 py-3 text-yellow-400 font-mono">1.5 - 5 ms</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">Jitter (Latency Variance)</td>
                  <td className="px-4 py-3 text-green-400 font-mono font-bold">&lt; 0.2 ms</td>
                  <td className="px-4 py-3 text-red-400 font-mono">2.0 - 45 ms (interference spikes)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">Packet Loss (Idle Network)</td>
                  <td className="px-4 py-3 text-green-400 font-mono font-bold">0.00%</td>
                  <td className="px-4 py-3 text-yellow-400 font-mono">0.02% - 1.5%</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">Transmission Mode</td>
                  <td className="px-4 py-3 font-semibold">Full-Duplex (simultaneous Tx/Rx)</td>
                  <td className="px-4 py-3 text-[var(--text-muted)]">Half-Duplex (wait-to-talk collision avoidance)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            On Wi-Fi, your device must listen to the air before sending data to ensure no other device is transmitting (using CSMA/CA). If another device transmits, your device must wait, adding random queue delays. If a collision occurs anyway, the packet is discarded and retransmitted, resulting in a sudden 30-100ms lag spike in your game.
          </p>
        </section>

        {/* SECTION 10: Best Wi-Fi Settings for Gaming */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Wifi size={18} className="text-cyan-400" />
            9. Wireless Band Configuration: Channel Locking & Width
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            If you cannot route an Ethernet cable, configure these specific Wi-Fi settings to minimize wireless jitter:
          </p>
          <div className="space-y-4">
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h3 className="text-sm font-bold text-green-400">Avoid DFS (Dynamic Frequency Selection) Channels</h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                DFS channels (52-144 on the 5 GHz band) share frequency spectrum with weather radar and military systems. If your router detects a radar sweep on a DFS channel, it is legally required to disconnect all devices immediately and switch to a non-DFS channel. This causes a sudden 30-second disconnect. <strong>Lock your 5 GHz SSID to channels 36, 40, 44, or 48 (UNII-1 band)</strong> to avoid DFS shutdowns.
              </p>
            </div>
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h3 className="text-sm font-bold text-yellow-400">Lock Channel Width to 80 MHz for 5 GHz</h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Setting your 5 GHz channel width to 160 MHz increases peak speed but doubles the frequency footprint, making the signal highly susceptible to co-channel interference. An 80 MHz channel width strikes the perfect balance for gaming, providing stable throughput and lower co-channel collisions.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 11: Router Brand Settings */}
        <section className="space-y-6">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Settings size={18} className="text-cyan-400" />
            10. Exact Menu Paths by Router Brand
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Every router manufacturer organizes their menu settings differently. Locate your brand below to find the exact configuration options:
          </p>
          <div className="space-y-4">
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h4 className="text-sm font-bold text-[var(--text-primary)]">TP-Link (Archer / Deco Series)</h4>
              <ul className="list-disc pl-5 text-xs text-[var(--text-muted)] space-y-1">
                <li><strong>QoS:</strong> Advanced &gt; QoS &gt; Enable QoS. Cap values at 90% of speed.</li>
                <li><strong>UPnP:</strong> Advanced &gt; NAT Forwarding &gt; UPnP &gt; Enable.</li>
                <li><strong>SIP ALG:</strong> Advanced &gt; Security &gt; ALG &gt; Disable SIP ALG.</li>
                <li><strong>Wi-Fi Channels:</strong> Advanced &gt; Wireless &gt; Wireless Settings &gt; Choose 5GHz &gt; Lock Channel to 36 &gt; Width to 80MHz.</li>
              </ul>
            </div>
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h4 className="text-sm font-bold text-[var(--text-primary)]">ASUS (RT / ROG Merlin Series)</h4>
              <ul className="list-disc pl-5 text-xs text-[var(--text-muted)] space-y-1">
                <li><strong>QoS:</strong> Adaptive QoS &gt; QoS &gt; Enable QoS &gt; Choose Custom &gt; Drag Gaming to top.</li>
                <li><strong>UPnP:</strong> WAN &gt; Connection &gt; Enable UPnP &gt; Yes.</li>
                <li><strong>SIP ALG:</strong> WAN &gt; NAT Passthrough &gt; SIP Passthrough &gt; Set to Disable.</li>
                <li><strong>Wi-Fi Channels:</strong> Wireless &gt; General &gt; Band: 5GHz &gt; Control Channel: 44 &gt; Width: 80MHz.</li>
              </ul>
            </div>
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h4 className="text-sm font-bold text-[var(--text-primary)]">Netgear (Nighthawk / RAX Series)</h4>
              <ul className="list-disc pl-5 text-xs text-[var(--text-muted)] space-y-1">
                <li><strong>QoS:</strong> ADVANCED &gt; Setup &gt; QoS Setup &gt; Enable WMM &amp; Turn on Upstream QoS.</li>
                <li><strong>UPnP:</strong> ADVANCED &gt; Advanced Setup &gt; UPnP &gt; Turn on UPnP.</li>
                <li><strong>SIP ALG:</strong> ADVANCED &gt; Security &gt; WAN Setup &gt; Check Disable SIP ALG.</li>
                <li><strong>Wi-Fi Channels:</strong> ADVANCED &gt; Setup &gt; Wireless Settings &gt; Channel: 48 &gt; Mode: Up to 1733Mbps (80MHz).</li>
              </ul>
            </div>
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h4 className="text-sm font-bold text-[var(--text-primary)]">Linksys (MR / Max-Stream Series)</h4>
              <ul className="list-disc pl-5 text-xs text-[var(--text-muted)] space-y-1">
                <li><strong>QoS:</strong> Device Prioritization &gt; Enable &gt; Add your gaming console to High Priority List.</li>
                <li><strong>UPnP:</strong> Connectivity &gt; Administration &gt; Check UPnP Enabled.</li>
                <li><strong>SIP ALG:</strong> Security &gt; Firewall &gt; ALG &gt; Uncheck SIP.</li>
                <li><strong>Wi-Fi Channels:</strong> Wi-Fi Settings &gt; Advanced &gt; 5GHz &gt; Lock Channel to 40 &gt; Width to 80MHz.</li>
              </ul>
            </div>
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h4 className="text-sm font-bold text-[var(--text-primary)]">Huawei (HG / EG / AX Series Gateways)</h4>
              <ul className="list-disc pl-5 text-xs text-[var(--text-muted)] space-y-1">
                <li><strong>QoS:</strong> Advanced &gt; QoS &gt; Traffic Control &gt; Add Rule &gt; Source IP to Console IP &gt; Priority to High.</li>
                <li><strong>UPnP:</strong> Advanced &gt; Application &gt; UPnP &gt; Enable UPnP.</li>
                <li><strong>SIP ALG:</strong> Security &gt; ONT Security &gt; Application Layer Gateway &gt; Disable SIP.</li>
                <li><strong>Wi-Fi Channels:</strong> My Wi-Fi &gt; Advanced Wi-Fi Settings &gt; 5GHz channel &gt; Choose 36 &gt; Width: 80MHz.</li>
              </ul>
            </div>
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h4 className="text-sm font-bold text-[var(--text-primary)]">ZTE (F670 / ZXHN Gateways)</h4>
              <ul className="list-disc pl-5 text-xs text-[var(--text-muted)] space-y-1">
                <li><strong>QoS:</strong> Internet &gt; QoS &gt; Queue Classification &gt; Prioritize UDP ports 3074 / 27015.</li>
                <li><strong>UPnP:</strong> Application &gt; UPnP &gt; Enable UPnP.</li>
                <li><strong>SIP ALG:</strong> Application &gt; ALG &gt; Uncheck SIP.</li>
                <li><strong>Wi-Fi Channels:</strong> Local Network &gt; WLAN &gt; WLAN Advanced &gt; 5G Channel: 48 &gt; Bandwidth: 80MHz.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 12: DNS Settings for Gaming */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Globe size={18} className="text-cyan-400" />
            11. DNS Servers & Resolution Lookup Latency
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            As explained in the FAQ, changing your DNS resolver (like Cloudflare 1.1.1.1 or Google 8.8.8.8) does not lower your in-game round-trip ping. However, public DNS resolvers are highly optimized compared to local ISP resolvers, and they use global anycast networks to resolve server queries instantly.
          </p>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            By switching your router's upstream DNS, you resolve matchmaking hostnames, authentication checkpoints, and session lobbies much faster. Learn more and run tests using our detailed guide on{" "}
            <Link href="/best-dns-for-gaming" className="text-[var(--brand-400)] hover:underline">Best DNS for Gaming</Link>.
          </p>
        </section>

        {/* SECTION 13: MTU Optimization */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Cpu size={18} className="text-cyan-400" />
            12. Tuning MTU & Preventing Packet Fragmentation
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            If your Maximum Transmission Unit (MTU) setting is larger than your ISP's threshold, your router must split outgoing packets into two fragments. The second packet carries the remaining bytes but incurs a full secondary header (20 bytes IP header + 8 bytes UDP header). This is called <strong>packet fragmentation</strong>.
          </p>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Fragmentation increases router processing overhead, multiplies packet headers, and introduces packet drop risks (if either fragment is lost, the entire original payload is discarded).
          </p>
          <div className="p-5 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl font-mono text-xs text-cyan-400 space-y-3">
            <h4 className="text-xs font-bold text-[var(--text-primary)] font-sans">Testing for Fragmentation (Windows Command Prompt)</h4>
            <p className="text-xs text-[var(--text-muted)] font-sans">
              Run this command to send a packet with a payload size of 1472 bytes and the 'Do Not Fragment' (-f) flag set:
            </p>
            <pre className="bg-black/30 p-3 rounded-lg overflow-x-auto">ping 8.8.8.8 -f -l 1472</pre>
            <p className="text-xs text-[var(--text-muted)] font-sans">
              If you receive the error <code>Packet needs to be fragmented but DF set</code>, your current network path cannot support a 1500-byte MTU. Decrease the payload size (-l value) by 10 (e.g. 1462, 1452, 1442) until the ping succeeds. <strong>Add 28 to your successful payload value</strong> to get your optimal MTU. Set this value in your router's WAN menu.
            </p>
          </div>
        </section>

        {/* SECTION 14: Gaming Console Optimization */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Gamepad2 size={18} className="text-cyan-400" />
            13. Console Network Settings: Xbox, PS5 & Switch
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Apply these configurations directly inside your console's network setting submenus to optimize interaction with your router:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-5 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h4 className="font-bold text-green-400">Xbox Series X / S</h4>
              <ul className="list-disc pl-4 space-y-1.5 text-[11px] text-[var(--text-muted)]">
                <li>General &gt; Network Settings &gt; Advanced Settings &gt; DNS Settings &gt; Set Manual: 1.1.1.1 / 1.0.0.1.</li>
                <li>Advanced Settings &gt; Alternate Port Selection &gt; Choose Manual and select a port other than 3074 if multiple Xboxes are active.</li>
                <li>Go to Advanced Settings &gt; IP Settings &gt; Manual to set a static IP.</li>
              </ul>
            </div>
            <div className="p-5 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h4 className="font-bold text-blue-400">PlayStation 5 (PS5)</h4>
              <ul className="list-disc pl-4 space-y-1.5 text-[11px] text-[var(--text-muted)]">
                <li>Settings &gt; Network &gt; Set Up Internet Connection &gt; Hover over network &gt; Press Options &gt; Advanced Settings.</li>
                <li>Set IP Address to Manual, enter static IP outside DHCP range.</li>
                <li>Set DNS to Cloudflare: Primary 1.1.1.1, Secondary 1.0.0.1.</li>
                <li>Set MTU to 1500 (standard fiber/cable) or 1492 (PPPoE DSL).</li>
              </ul>
            </div>
            <div className="p-5 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h4 className="font-bold text-red-400">Nintendo Switch</h4>
              <ul className="list-disc pl-4 space-y-1.5 text-[11px] text-[var(--text-muted)]">
                <li>System Settings &gt; Internet &gt; Internet Settings &gt; Select Network &gt; Change Settings.</li>
                <li>Set DNS to Manual: Primary 8.8.8.8, Secondary 8.8.4.4.</li>
                <li>Set MTU to 1400 (Nintendo defaults to 1400 which aligns with their P2P relay encapsulation).</li>
                <li>If matchmaking fails consistently, enable static IP and place the Switch in DMZ.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 15: PC Gaming Optimization */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Terminal size={18} className="text-cyan-400" />
            14. PC Gaming Client Configurations
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            PC gaming launchers can saturate your network buffers in the background. Apply these client-level settings to protect your active sessions:
          </p>
          <ul className="list-disc pl-6 space-y-2.5 text-xs md:text-sm text-[var(--text-muted)]">
            <li>
              <strong>Steam:</strong> Settings &gt; Downloads &gt; check <strong>Limit download speed</strong>. Set this cap to 80% of your maximum download speed. Also, uncheck <strong>Allow downloads during gameplay</strong> to prevent sudden game patches from spawning mid-match.
            </li>
            <li>
              <strong>Riot Games (Valorant / League of Legends):</strong> Configure Riot Client settings to close completely during gameplay instead of minimizing to the tray, which stops telemetry background uploads.
            </li>
            <li>
              <strong>Battle.net (Blizzard):</strong> Settings &gt; Downloads &gt; under <strong>Network Bandwidth</strong>, check <strong>Limit download speed of latest updates</strong> and cap it to 5000 KB/s (40 Mbps) to avoid buffer saturation.
            </li>
          </ul>
        </section>

        {/* SECTION 16: Advanced Diagnostics */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Terminal size={18} className="text-cyan-400" />
            15. Advanced Diagnostics: Pinpointing Hops
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            When latency spikes occur, use these operating system diagnostics tools to identify exactly where the packets are delaying:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-5 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h4 className="font-bold text-[var(--text-primary)] font-sans">Windows Command Prompt</h4>
              <p className="text-[11px] text-green-400 leading-relaxed">
                <code>tracert 8.8.8.8</code>
                <br />
                Traces the IP address of each router hop. If hop 1 (router) is &gt;2ms, you have local Wi-Fi or cable issues.
                <br /><br />
                <code>pathping 8.8.8.8</code>
                <br />
                Calculates packet loss statistics over a 120-second window for each hop.
              </p>
            </div>
            <div className="p-5 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h4 className="font-bold text-[var(--text-primary)] font-sans">macOS Terminal</h4>
              <p className="text-[11px] text-green-400 leading-relaxed">
                <code>networkQuality</code>
                <br />
                Executes Apple's native bufferbloat and responsiveness test, reporting responsiveness in RPM (Roundtrips Per Minute).
                <br /><br />
                <code>traceroute 8.8.8.8</code>
                <br />
                Tracks routing hops to target destination.
              </p>
            </div>
            <div className="p-5 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h4 className="font-bold text-[var(--text-primary)] font-sans">Linux CLI</h4>
              <p className="text-[11px] text-green-400 leading-relaxed">
                <code>mtr -e 8.8.8.8</code>
                <br />
                Combines ping and traceroute into a live, interactive diagnostic chart showing real-time jitter and packet loss on each hop.
                <br /><br />
                <code>tracepath 8.8.8.8</code>
                <br />
                Traces network path and detects MTU bottlenecks.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 17: When Your ISP Is The Problem */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Globe size={18} className="text-cyan-400" />
            16. When the Latency Bottleneck Lies with Your ISP
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            If you have configured a wired connection, set up SQM QoS, and verified your MTU values, but still experience lag spikes, the issue lies outside your house. Common ISP-level bottlenecks include:
          </p>
          <ul className="list-disc pl-6 space-y-2.5 text-xs md:text-sm text-[var(--text-muted)]">
            <li>
              <strong>Peering Congestion:</strong> Your ISP routes traffic through cheap, congested transit exchanges. Even if your speed is high, your gaming packets sit in queues at these exchange points. Check our{" "}
              <Link href="/high-ping-fix" className="text-[var(--brand-400)] hover:underline">High Ping Fix Guide</Link> to diagnose ISP routes.
            </li>
            <li>
              <strong>Path Inefficiencies:</strong> Your ISP routes traffic to a game server 100 miles away by sending it through a transit city 400 miles away. Read our{" "}
              <Link href="/packet-loss-test" className="text-[var(--brand-400)] hover:underline">Packet Loss Diagnostic Guide</Link> to isolate routing paths.
            </li>
            <li>
              <strong>First-Hop Congestion (Node Over-Subscription):</strong> Your local neighborhood fiber cabinet or cable node is overloaded with active users during peak hours (7 PM to 11 PM). See our{" "}
              <Link href="/how-to-fix-packet-loss" className="text-[var(--brand-400)] hover:underline">Packet Loss Resolution Guide</Link> for escalation scripts to send to your ISP.
            </li>
          </ul>
        </section>
      </div>
    </TroubleshootingArticleShell>
  );
}
