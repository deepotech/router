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
    "gaming router optimization",
    "reduce gaming lag",
    "optimize router for gaming",
    "qos for gaming",
    "bufferbloat fix",
    "open nat port forwarding",
    "mtu size gaming ping",
    "gaming dns settings",
    "router gaming mode",
    "band steering gaming",
    "5ghz gaming settings",
    "router firewall gaming",
    "gaming router configuration",
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
// Troubleshooting Steps
// =============================================================

const troubleshootingSteps = [
  {
    title: "Enable UPnP or Configure Manual Port Forwarding",
    description:
      "Log into your router admin panel. Navigate to Advanced > NAT Forwarding > UPnP (TP-Link), WAN > UPnP (ASUS), or ADVANCED > UPnP (Netgear). Enable UPnP and reboot your router and console. UPnP allows game consoles to automatically register port mappings in the NAT table, opening your connection to an Open or Moderate NAT type without manual configuration. If UPnP alone is insufficient, assign your console a static IP and manually forward platform-specific ports.",
    tip: "If you have two Xbox consoles or two PS5 units on the same network, UPnP may conflict over port 3074. In this case, disable UPnP and use static port forwarding with different port offsets for each console.",
  },
  {
    title: "Configure QoS to Prioritize Gaming Traffic",
    description:
      "Enable Quality of Service (QoS) in your router admin panel. Run a speed test to determine your actual line speeds. Set QoS bandwidth caps to 85-90% of your maximum upload and download speeds — this headroom prevents the router's buffer from filling up (bufferbloat). Add a high-priority rule targeting your gaming console or PC by its MAC address or local IP. Set the gaming device priority to Highest, and assign streaming and downloads to Low or Background priority.",
    tip: "Setting QoS to 100% of your speed defeats its purpose. The 10-15% headroom is critical — it allows the router to process gaming packets without queuing them behind download traffic.",
  },
  {
    title: "Set MTU to Optimal Size for Your Connection Type",
    description:
      "Find MTU settings under WAN > Connection Type or Advanced > WAN in your router panel. For cable and fiber connections, set MTU to 1500 bytes (the ethernet maximum). For PPPoE DSL connections, set MTU to 1492 (accounting for 8-byte PPPoE header overhead). For VPN-routed connections, reduce to 1380-1420. Mismatched MTU causes packets to fragment, doubling the routing workload and adding 10-30ms latency per hop.",
    tip: "To find the perfect MTU for your line: open Command Prompt and run 'ping -l 1472 -f 8.8.8.8'. If you get 'Packet needs to be fragmented', reduce the payload size by 10 until you get a reply. Add 28 to that value for your ideal MTU.",
  },
  {
    title: "Switch to Dedicated 5 GHz or 6 GHz Band for Gaming Devices",
    description:
      "Log into your router's wireless settings. Disable Band Steering (auto-band selection) to prevent the router from moving your gaming device between 2.4 GHz and 5 GHz bands mid-session. Create a dedicated SSID for the 5 GHz or 6 GHz band. Connect only your gaming console or PC to this SSID. Set the Wi-Fi channel to a non-overlapping channel: channels 36, 40, 44, or 48 for 5 GHz. Enable 80 MHz channel width for maximum throughput.",
    tip: "If you have a tri-band router (2.4 GHz + 5 GHz + 5 GHz or 6 GHz), dedicate the second 5 GHz or 6 GHz band exclusively to gaming devices. Connect backhaul, IoT devices, and phones to the other bands.",
  },
];

// =============================================================
// FAQ Data
// =============================================================

const faqs = [
  {
    question: "What is the single most impactful router setting for gaming?",
    answer:
      "For most gamers, QoS (Quality of Service) configuration has the largest impact. It prevents bufferbloat — the condition where heavy downloads spike your ping from 20ms to 300ms. Enable QoS, set bandwidth limits to 90% of your line speed, and prioritize your gaming device. This alone can reduce ping spikes by 70-90% under household load.",
  },
  {
    question: "Should I use 2.4 GHz or 5 GHz for gaming?",
    answer:
      "Always use 5 GHz or 6 GHz for gaming over Wi-Fi. The 2.4 GHz band is heavily congested (it shares spectrum with microwaves, Bluetooth, and neighboring networks) and has higher latency due to interference retransmissions. The 5 GHz band offers lower latency, higher throughput, and far less interference. If your router or console supports Wi-Fi 6E, the 6 GHz band is even better — it is virtually interference-free on residential networks.",
  },
  {
    question: "Does enabling Gaming Mode on my router actually help?",
    answer:
      "Router 'Gaming Mode' or 'Accelerator' features vary by manufacturer and are often marketing labels. On ASUS routers, Game Acceleration uses a traffic shaping algorithm to prioritize UDP gaming packets. On Netgear Nighthawk routers, Gaming Mode prioritizes ports associated with known game titles. These features are effective when implemented properly, but manual QoS configuration with correct bandwidth limits is usually more reliable and measurable.",
  },
  {
    question: "What MTU size should I use for online gaming?",
    answer:
      "For standard cable or fiber broadband, use MTU 1500. For PPPoE DSL connections, use MTU 1492. If you are on a VPN or experience consistent fragmentation, reduce to 1420 or 1380. You can test your optimal MTU by running 'ping -l 1472 -f 8.8.8.8' in Windows Command Prompt and reducing the payload size until the ping succeeds without fragmentation, then add 28 bytes.",
  },
  {
    question: "What is bufferbloat and how does it destroy gaming performance?",
    answer:
      "Bufferbloat occurs when your router's transmit buffer fills up with packets (typically from a large download or upload). When the buffer is full, new packets — including your real-time game state packets — must queue behind bulk traffic. This queue creates latency spikes of 100-500ms that appear as lag, rubber-banding, and desync in gameplay. QoS with bandwidth capping (setting limits at 85-90% of line speed) prevents the buffer from reaching capacity, eliminating the queue.",
  },
  {
    question: "Should I disable SIP ALG for gaming?",
    answer:
      "Yes, always disable SIP ALG on any router used for gaming. SIP ALG (Application Layer Gateway) was designed for VoIP traffic but frequently intercepts and modifies UDP packets that it misidentifies as SIP signaling. This corrupts port forwarding rules, breaks UPnP mappings, and causes intermittent NAT type failures. SIP ALG provides no benefit for gaming and should be disabled immediately.",
  },
  {
    question: "Does changing my DNS improve gaming ping?",
    answer:
      "DNS servers affect the time it takes to resolve domain names (like game server hostnames) but do not reduce in-game ping to the actual game server. However, a slow or unreliable DNS can add 50-200ms to initial game connection establishment and session reconnects. Use a fast DNS resolver like Cloudflare (1.1.1.1), Google (8.8.8.8), or gaming-optimized resolvers. DNS does not affect in-game RTT once the connection is established.",
  },
  {
    question: "Is wired or wireless better for competitive gaming?",
    answer:
      "Wired Ethernet is always superior for competitive gaming. A Cat6 wired connection provides consistent 1ms latency, zero interference, and zero packet loss under normal conditions. Wi-Fi introduces variable latency (typically 1-30ms overhead), interference-related retransmissions (which add random spikes), and half-duplex behavior on most Wi-Fi implementations. If cables are not possible, use 5 GHz or 6 GHz Wi-Fi with a dedicated SSID and place the router within 10 meters of the gaming device.",
  },
  {
    question: "What channel width should I set for gaming Wi-Fi?",
    answer:
      "For 5 GHz gaming, use 80 MHz channel width. This provides excellent throughput while remaining stable. Avoid 160 MHz — while faster, it has fewer available channels and causes interference with radar systems on DFS channels, which triggers automatic channel switches that drop your connection momentarily. For 2.4 GHz, use 20 MHz channel width to avoid overlap with neighboring networks.",
  },
  {
    question: "Should I enable MIMO and beamforming on my router?",
    answer:
      "Yes. Enable MU-MIMO (Multi-User MIMO) and beamforming on all routers that support them. MU-MIMO allows your router to communicate with multiple devices simultaneously rather than sequentially, reducing queue wait times. Beamforming directs the wireless signal toward your gaming device rather than broadcasting omnidirectionally, improving signal strength and stability. Both features are beneficial and have no downside.",
  },
];

// =============================================================
// Common Causes
// =============================================================

const commonCauses = [
  {
    title: "Bufferbloat from Full Upload Buffer",
    desc: "Router transmit buffer fills under heavy upload load, queuing game packets behind bulk traffic and spiking ping to 200-500ms.",
  },
  {
    title: "Strict NAT Blocking Peer Connections",
    desc: "UPnP disabled or port forwarding unconfigured, forcing game traffic through relay servers and adding 30-80ms relay latency.",
  },
  {
    title: "2.4 GHz Band Congestion",
    desc: "Gaming device on the crowded 2.4 GHz band experiencing interference from neighboring networks and household appliances.",
  },
  {
    title: "MTU Fragmentation",
    desc: "Incorrect MTU size causing packets to fragment at every hop, adding processing overhead and 10-30ms per router in the path.",
  },
  {
    title: "SIP ALG Corrupting NAT Tables",
    desc: "SIP Application Layer Gateway intercepting and rewriting UDP game packets, breaking port forwarding and UPnP maps silently.",
  },
  {
    title: "DNS Resolver Latency on Connection Establish",
    desc: "Slow ISP DNS adding 100-300ms to initial game server hostname resolution and matchmaking service lookups.",
  },
];

// =============================================================
// Quick Fix Checklist
// =============================================================

const quickFixChecklist = [
  "Enable UPnP in router admin panel — reboot router and console to register fresh port mappings.",
  "Configure QoS: set bandwidth limits to 90% of your line speed and prioritize your gaming device.",
  "Disable SIP ALG under Firewall or NAT ALG settings to prevent silent port map corruption.",
  "Set MTU to 1500 (cable/fiber) or 1492 (PPPoE DSL) under WAN connection settings.",
  "Dedicate the 5 GHz or 6 GHz band to your gaming device with a separate SSID.",
  "Set Wi-Fi channel to 36, 40, 44, or 48 (5 GHz) using a fixed non-overlapping channel.",
  "Change DNS to 1.1.1.1 / 1.0.0.1 (Cloudflare) or 8.8.8.8 / 8.8.4.4 (Google).",
  "Disable Band Steering to prevent mid-session band switching on your gaming device.",
];

// =============================================================
// Page Component
// =============================================================

export default function BestRouterSettingsForGamingPage() {
  return (
    <TroubleshootingArticleShell
      h1="Best Router Settings for Gaming: The Complete Optimization Guide"
      intro="Most gamers focus on their internet speed while ignoring the router settings that actually control gaming performance. Raw bandwidth is rarely the bottleneck — bufferbloat, Strict NAT, mismatched MTU, and congested Wi-Fi bands are. This technical guide walks through every router setting that directly impacts gaming latency, packet loss, NAT type, and connection stability, with step-by-step instructions for all major router brands."
      category="nat"
      breadcrumbs={breadcrumbs}
      faqs={faqs}
      troubleshootingSteps={troubleshootingSteps}
      warningBanner={{
        title: "Wired Connection Recommended",
        text: "All software optimizations in this guide assume a stable physical connection. If you are using Wi-Fi, results may vary based on RF environment. For competitive gaming, a Cat6 wired Ethernet connection is always the recommended baseline.",
      }}
      quickFixChecklist={quickFixChecklist}
      commonCauses={commonCauses}
      whenToContactISP="Contact your ISP if your router's WAN IP is in the CGNAT 100.64.0.0/10 range (preventing port forwarding), if bufferbloat persists despite QoS configuration (indicating modem-level buffering), or if your connection shows high jitter on a wired connection (indicating instability between the modem and DSLAM/OLT)."
      severityLevel="low"
    >
      <div className="space-y-10">

        {/* SECTION 1: Quick AI Answer */}
        <section
          className="glass-card p-6 border border-cyan-950/20 bg-cyan-950/5 rounded-2xl relative overflow-hidden"
          aria-label="Quick AI Answer"
        >
          <div className="absolute top-0 right-0 bg-[var(--brand-500)]/10 text-[var(--brand-400)] text-[10px] font-mono uppercase tracking-wider px-3 py-1 rounded-bl-lg font-bold">
            Quick AI Response Summary
          </div>
          <h2 className="text-xs font-bold text-[var(--brand-400)] mb-3 uppercase tracking-wide">
            The 5 Router Settings That Actually Improve Gaming Performance
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            The five settings with the most measurable impact on gaming performance are: <strong>(1) QoS with bandwidth capping</strong> to eliminate bufferbloat, <strong>(2) UPnP or manual port forwarding</strong> to open NAT type, <strong>(3) correct MTU size</strong> to stop packet fragmentation, <strong>(4) dedicated 5 GHz band</strong> with fixed non-overlapping channel for Wi-Fi users, and <strong>(5) SIP ALG disabled</strong> to stop silent NAT corruption. Wired Ethernet eliminates Wi-Fi variables entirely and should always be the first step.
          </p>
        </section>

        {/* Interactive Tool */}
        <section aria-label="Interactive Router Optimization Tool">
          <div className="mb-4">
            <h2 className="text-base font-bold text-[var(--text-primary)]">
              Interactive Router Configuration Wizard
            </h2>
            <p className="text-xs text-[var(--text-muted)] mt-1">
              Analyze your current router configuration, detect gaming bottlenecks, and receive a personalized optimization checklist.
            </p>
          </div>
          <ConnectionOptimizerClient mode="router-admin" />
        </section>

        {/* SECTION 2: What Actually Causes Gaming Lag */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Activity size={18} className="text-cyan-400" />
            2. What Actually Causes Gaming Lag: The Real Bottlenecks
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Most gamers blame their internet speed for lag. In reality, internet speed (Mbps) is almost never the cause of gaming latency. Online gaming consumes remarkably little bandwidth — a typical first-person shooter like Valorant or Call of Duty uses 50-150 Kbps of upstream data. Even a 5 Mbps connection is more than sufficient.
          </p>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            The real causes of gaming lag are router-level issues:
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-xs text-[var(--text-secondary)]">
              <thead>
                <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                  <th className="px-4 py-3 text-left">Root Cause</th>
                  <th className="px-4 py-3 text-left">Symptom</th>
                  <th className="px-4 py-3 text-left">Fix</th>
                  <th className="px-4 py-3 text-left">Impact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)] bg-[var(--bg-surface)]/20">
                <tr>
                  <td className="px-4 py-3 font-semibold">Bufferbloat</td>
                  <td className="px-4 py-3">Ping spikes to 300ms+ during downloads</td>
                  <td className="px-4 py-3">QoS with bandwidth cap at 90%</td>
                  <td className="px-4 py-3 text-red-500 font-bold">Critical</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold">Strict NAT Type</td>
                  <td className="px-4 py-3">Matchmaking fails, voice chat drops, relay routing</td>
                  <td className="px-4 py-3">UPnP or manual port forwarding</td>
                  <td className="px-4 py-3 text-red-500 font-bold">Critical</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold">MTU Fragmentation</td>
                  <td className="px-4 py-3">Consistent +20ms ping, packet loss at server</td>
                  <td className="px-4 py-3">Set MTU 1500 (cable) or 1492 (PPPoE)</td>
                  <td className="px-4 py-3 text-yellow-400 font-bold">High</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold">Wi-Fi Interference (2.4 GHz)</td>
                  <td className="px-4 py-3">Variable ping, spike every 10-30 seconds</td>
                  <td className="px-4 py-3">Switch to 5 GHz dedicated band</td>
                  <td className="px-4 py-3 text-yellow-400 font-bold">High</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold">SIP ALG Corruption</td>
                  <td className="px-4 py-3">Random NAT type changes, intermittent disconnects</td>
                  <td className="px-4 py-3">Disable SIP ALG in firewall settings</td>
                  <td className="px-4 py-3 text-yellow-400 font-bold">Medium</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold">ISP DNS Latency</td>
                  <td className="px-4 py-3">Slow game server connect / lobby joins</td>
                  <td className="px-4 py-3">Use 1.1.1.1 or 8.8.8.8 DNS</td>
                  <td className="px-4 py-3 text-blue-400 font-bold">Low</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 3: QoS Deep Dive */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <BarChart3 size={18} className="text-cyan-400" />
            3. QoS Configuration: Eliminating Bufferbloat
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            <strong>Bufferbloat</strong> is the most damaging and most overlooked cause of gaming lag. When a household member starts a large upload (backup, video upload, cloud sync), your router fills its transmit buffer with bulk data packets. Your gaming packets must queue behind this bulk traffic. The queue delay translates directly into ping spikes — you'll see your in-game ping jump from 20ms to 200-500ms instantly.
          </p>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            <strong>QoS (Quality of Service)</strong> prevents this by limiting total bandwidth and prioritizing gaming traffic. The key insight most guides miss: <strong>you must cap bandwidth below your actual line speed</strong>. Setting QoS to 100% of your speed does nothing — the buffer still fills up. Capping at 85-90% keeps the queue empty, allowing real-time gaming packets to transmit without waiting.
          </p>

          <h3 className="text-sm font-bold text-[var(--text-primary)]">QoS Configuration by Router Brand:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h4 className="text-sm font-bold text-[var(--text-primary)]">TP-Link (Archer / AX Series)</h4>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Navigate to <strong>Advanced &gt; QoS</strong>. Enable QoS. Enter your upload and download speeds (set to 90% of your measured speed test values). Under <strong>By Device</strong>, add your gaming console by IP and set priority to <strong>Highest</strong>. Under <strong>By Application</strong>, add gaming to high priority and downloads to low.
              </p>
            </div>
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h4 className="text-sm font-bold text-[var(--text-primary)]">ASUS (RT-AX / ROG Series)</h4>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Navigate to <strong>Adaptive QoS &gt; QoS</strong>. Enable Adaptive QoS. Set the operating mode to <strong>Customize</strong>. Set your total bandwidth (90% of line speed). Drag <strong>Gaming</strong> to the top priority slot. Alternatively, enable <strong>Game Acceleration</strong> (ASUS Aura Game Boost) for automatic traffic classification.
              </p>
            </div>
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h4 className="text-sm font-bold text-[var(--text-primary)]">Netgear (Nighthawk / Orbi)</h4>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Navigate to <strong>ADVANCED &gt; Setup &gt; QoS Setup</strong>. Enable WMM (Wi-Fi Multimedia) and Upstream QoS. Enable <strong>Gaming Mode</strong> which automatically prioritizes gaming UDP streams. Set bandwidth limits manually by clicking <strong>Setup QoS Rule</strong> and adding your console by MAC address.
              </p>
            </div>
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h4 className="text-sm font-bold text-[var(--text-primary)]">Huawei / ZTE (ISP Gateways)</h4>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Navigate to <strong>Advanced &gt; QoS &gt; Traffic Control</strong>. Add a new rule. Set the source IP to your gaming device's static IP, set the protocol to UDP (for game traffic), set priority to <strong>High</strong>, and leave TCP flows for downloads at <strong>Normal</strong> or <strong>Low</strong>. Apply and reboot.
              </p>
            </div>
          </div>

          <div className="p-5 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl font-mono text-xs text-[var(--text-muted)] space-y-3">
            <h4 className="text-xs font-bold text-[var(--text-primary)] font-sans">Measure Bufferbloat Before and After QoS:</h4>
            <div className="space-y-2">
              <div><strong>Tool:</strong> Visit <code>waveform.com/tools/bufferbloat</code> or run a DSLReports Speed Test.</div>
              <div><strong>Grade A or B:</strong> Bufferbloat is under control. Gaming latency will be stable.</div>
              <div><strong>Grade C, D, or F:</strong> Severe bufferbloat. Enable QoS and retest.</div>
              <div><strong>Windows PowerShell Test:</strong></div>
            </div>
            <pre className="text-green-400 overflow-x-auto">{`# Baseline ping while idle
ping -n 20 8.8.8.8

# Start a large download (any large file), then re-run:
ping -n 20 8.8.8.8

# If ping jumps by 50ms+ under load: bufferbloat confirmed.
# Enable QoS and re-test.`}</pre>
          </div>
        </section>

        {/* SECTION 4: NAT Settings */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Network size={18} className="text-cyan-400" />
            4. NAT Type Settings: Open vs. Moderate vs. Strict
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Your NAT type determines how your router handles inbound gaming connections. Strict NAT forces your game to use relay servers instead of direct peer-to-peer connections, adding 30-80ms of relay overhead and causing matchmaking and voice chat failures.
          </p>
          <ul className="list-disc pl-6 space-y-3 text-xs md:text-sm text-[var(--text-muted)]">
            <li>
              <strong className="text-green-400">Step 1 — Enable UPnP:</strong> The fastest NAT fix for most setups. Navigate to Advanced &gt; NAT Forwarding &gt; UPnP (TP-Link) or WAN &gt; UPnP (ASUS). Enable it, reboot your router and console, and run the console's network test. Most setups achieve Moderate or Open NAT immediately.
            </li>
            <li>
              <strong className="text-yellow-400">Step 2 — Static IP + Port Forwarding:</strong> If UPnP fails or you have multiple consoles, assign each a static IP via DHCP reservation and create manual port forwarding rules. Xbox: TCP/UDP 3074, UDP 88, 500, 3544, 4500. PS5: TCP 3478-3480, UDP 3478-3479.
            </li>
            <li>
              <strong className="text-orange-400">Step 3 — Resolve Double NAT:</strong> If your router's WAN IP is a private address (192.168.x.x or 10.x.x.x), you have Double NAT. Enable Bridge Mode on the ISP modem or set your router to AP Mode. Port forwarding cannot work through double NAT layers. See our{" "}
              <Link href="/double-nat-detected" className="text-[var(--brand-400)] hover:underline">Double NAT fix guide</Link>.
            </li>
            <li>
              <strong className="text-red-400">Step 4 — DMZ as Last Resort:</strong> Assign your console a static IP and place it in the router's DMZ (Demilitarized Zone). This forwards all inbound traffic to the console, guaranteeing Open NAT. Safe for gaming consoles; never use on PCs or NAS devices.
            </li>
          </ul>
          <p className="text-xs text-[var(--text-muted)]">
            For a complete NAT troubleshooting workflow, see our{" "}
            <Link href="/nat-type-strict" className="text-[var(--brand-400)] hover:underline">NAT Type Strict fix guide</Link>.
          </p>
        </section>

        {/* SECTION 5: MTU Optimization */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Cpu size={18} className="text-cyan-400" />
            5. MTU Optimization: Stop Packet Fragmentation
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            The <strong>MTU (Maximum Transmission Unit)</strong> defines the largest packet your network can transmit without splitting it into fragments. When a packet exceeds the MTU, it is fragmented into two smaller packets at each router hop — doubling the processing workload and adding latency at each point.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs text-[var(--text-secondary)]">
              <thead>
                <tr className="border-b border-[var(--border-subtle)] text-[var(--text-muted)] font-mono">
                  <th className="py-2.5 pr-4 font-semibold uppercase">Connection Type</th>
                  <th className="py-2.5 px-4 font-semibold uppercase">Recommended MTU</th>
                  <th className="py-2.5 pl-4 font-semibold uppercase">Reason</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)]">
                <tr>
                  <td className="py-3 pr-4 font-bold">Cable / Fiber (DHCP)</td>
                  <td className="py-3 px-4 text-green-400 font-mono">1500</td>
                  <td className="py-3 pl-4">Standard Ethernet maximum — no overhead</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-bold">PPPoE (DSL / FTTH)</td>
                  <td className="py-3 px-4 text-yellow-400 font-mono">1492</td>
                  <td className="py-3 pl-4">1500 minus 8-byte PPPoE header</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-bold">WireGuard VPN</td>
                  <td className="py-3 px-4 text-orange-400 font-mono">1420</td>
                  <td className="py-3 pl-4">1500 minus WireGuard tunnel overhead (60-80 bytes)</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-bold">OpenVPN</td>
                  <td className="py-3 px-4 text-orange-400 font-mono">1380</td>
                  <td className="py-3 pl-4">1500 minus OpenVPN encryption overhead (~120 bytes)</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-bold">Satellite (Starlink)</td>
                  <td className="py-3 px-4 text-blue-400 font-mono">1500</td>
                  <td className="py-3 pl-4">Starlink handles fragmentation internally</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="p-5 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl font-mono text-xs text-green-400 space-y-2">
            <div className="text-[var(--text-primary)] font-sans font-bold text-xs">Find Your Optimal MTU (Windows):</div>
            <pre className="overflow-x-auto">{`# Start at payload 1472 (1472 + 28 IP/ICMP headers = 1500 MTU)
ping -l 1472 -f 8.8.8.8

# If "Packet needs to be fragmented" error:
ping -l 1452 -f 8.8.8.8
ping -l 1432 -f 8.8.8.8

# When ping succeeds without fragmentation:
# Your MTU = that payload size + 28

# Set MTU in router WAN settings to this value.`}</pre>
          </div>
        </section>

        {/* SECTION 6: Wi-Fi Band & Channel Optimization */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Wifi size={18} className="text-cyan-400" />
            6. Wi-Fi Band, Channel & Width Optimization for Gaming
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            If wired Ethernet is not possible, proper Wi-Fi configuration can substantially reduce wireless latency. The most impactful settings are band selection, channel selection, and channel width:
          </p>
          <div className="space-y-4">
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h3 className="text-sm font-bold text-green-400">Band Selection: Always Use 5 GHz or 6 GHz</h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                The 2.4 GHz band operates in the same spectrum as Bluetooth devices, microwave ovens, and baby monitors. It is shared by virtually every Wi-Fi network in your neighborhood, causing severe co-channel interference. This interference causes retransmissions that add random latency spikes. The 5 GHz band has 25 non-overlapping channels (vs. 3 on 2.4 GHz), far less interference, and lower base latency. Wi-Fi 6E's 6 GHz band is interference-free on most residential networks.
              </p>
            </div>
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h3 className="text-sm font-bold text-yellow-400">Channel Selection: Use Fixed Non-Overlapping Channels</h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Set your router to a fixed Wi-Fi channel rather than Auto. Auto-channel selection can switch channels mid-session when it detects interference, dropping your connection for 1-3 seconds. For 5 GHz, use channels <strong>36, 40, 44, or 48</strong> (UNII-1 band — these do not require DFS radar avoidance and never trigger automatic channel switches). For 2.4 GHz, use channels <strong>1, 6, or 11</strong> only (the three non-overlapping channels).
              </p>
            </div>
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h3 className="text-sm font-bold text-blue-400">Channel Width: Use 80 MHz for 5 GHz Gaming</h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                80 MHz channel width provides excellent throughput (up to 433 Mbps per stream) while maintaining stable channel availability. Avoid 160 MHz — it uses DFS channels that are subject to radar detection interruptions, causing your router to switch channels automatically. For 2.4 GHz, always use 20 MHz to avoid overlap with neighboring networks.
              </p>
            </div>
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h3 className="text-sm font-bold text-purple-400">Disable Band Steering for Gaming Devices</h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Band Steering automatically moves devices between 2.4 GHz and 5 GHz based on signal strength. While useful for phones and laptops, it is harmful for gaming — a mid-session band switch drops the connection for 1-5 seconds. Disable Band Steering globally or create a separate SSID for the 5 GHz band and connect your gaming device only to that SSID. This locks it to 5 GHz permanently.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 7: DNS for Gaming */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Globe size={18} className="text-cyan-400" />
            7. DNS Configuration for Faster Game Server Resolution
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            DNS does not directly reduce in-game ping, but slow DNS resolution adds measurable delay to game server connection establishment, lobby joins, and matchmaking lookups. ISP DNS resolvers are often congested and slow — switching to a fast resolver reduces these delays by 50-200ms.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs text-[var(--text-secondary)]">
              <thead>
                <tr className="border-b border-[var(--border-subtle)] text-[var(--text-muted)] font-mono">
                  <th className="py-2.5 pr-4 font-semibold uppercase">DNS Provider</th>
                  <th className="py-2.5 px-4 font-semibold uppercase">Primary</th>
                  <th className="py-2.5 px-4 font-semibold uppercase">Secondary</th>
                  <th className="py-2.5 pl-4 font-semibold uppercase">Best For</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)]">
                <tr>
                  <td className="py-3 pr-4 font-bold text-orange-400">Cloudflare</td>
                  <td className="py-3 px-4 font-mono">1.1.1.1</td>
                  <td className="py-3 px-4 font-mono">1.0.0.1</td>
                  <td className="py-3 pl-4">Fastest globally, privacy-focused</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-bold text-blue-400">Google</td>
                  <td className="py-3 px-4 font-mono">8.8.8.8</td>
                  <td className="py-3 px-4 font-mono">8.8.4.4</td>
                  <td className="py-3 pl-4">Extremely reliable, wide anycast coverage</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-bold text-green-400">Quad9</td>
                  <td className="py-3 px-4 font-mono">9.9.9.9</td>
                  <td className="py-3 px-4 font-mono">149.112.112.112</td>
                  <td className="py-3 pl-4">Malware-blocking, privacy-focused</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            Set DNS on your <strong>router</strong> (not just the console) so all devices benefit. In your router admin panel, find the WAN or Internet settings and enter the primary and secondary DNS. For console-specific DNS optimization, see our{" "}
            <Link href="/best-dns-for-gaming" className="text-[var(--brand-400)] hover:underline">Best DNS for Gaming guide</Link>.
          </p>
        </section>

        {/* SECTION 8: SIP ALG & Firewall Settings */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Shield size={18} className="text-cyan-400" />
            8. Firewall & SIP ALG Settings That Break Gaming
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Several router security features that are beneficial for general use cause significant problems for gaming:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-xs md:text-sm text-[var(--text-muted)]">
            <li>
              <strong>SIP ALG (Application Layer Gateway):</strong> Intercepts and rewrites UDP packets it misidentifies as VoIP SIP signals. This corrupts port forwarding rules and UPnP maps silently. <strong>Disable SIP ALG immediately</strong> on any gaming router. Found under: Firewall &gt; ALG (TP-Link), WAN &gt; NAT Passthrough (ASUS), ADVANCED &gt; Security &gt; WAN Setup (Netgear).
            </li>
            <li>
              <strong>DoS / DDoS Protection (overly aggressive):</strong> Routers with strict DoS protection can throttle or block UDP gaming traffic, mistaking high-frequency game state packets for a flood attack. If you experience disconnections after extended gaming sessions, reduce DoS sensitivity or disable UDP flood protection.
            </li>
            <li>
              <strong>IGMP Snooping:</strong> Can block UPnP discovery multicast packets (239.255.255.250), preventing consoles from registering dynamic port mappings. If UPnP fails to open NAT, disable IGMP Snooping under LAN settings and retry.
            </li>
            <li>
              <strong>IPv6 Firewall (when IPv6 is active):</strong> If your network uses IPv6, ensure the IPv6 firewall has exceptions for gaming traffic. Some routers default to blocking all unsolicited IPv6 inbound traffic, which can cause NAT-type issues on platforms that prefer IPv6.
            </li>
          </ul>
        </section>

        {/* SECTION 9: Advanced Wireless Settings */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Zap size={18} className="text-cyan-400" />
            9. Advanced Wireless Settings for Wi-Fi Gaming
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            If you must use Wi-Fi for gaming, configure these advanced wireless parameters:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h3 className="text-sm font-bold text-[var(--text-primary)]">Enable MU-MIMO</h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Multi-User MIMO allows your router to communicate with multiple devices simultaneously. Without it, devices take turns using the wireless medium, adding queue delay. Enable MU-MIMO under Advanced Wireless settings on all routers that support Wi-Fi 5 (802.11ac) or newer.
              </p>
            </div>
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h3 className="text-sm font-bold text-[var(--text-primary)]">Enable Beamforming</h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Beamforming focuses the wireless signal toward your gaming device rather than broadcasting omnidirectionally. This improves RSSI (signal strength) and reduces interference. Explicit beamforming (requires compatible client) is more effective than implicit beamforming.
              </p>
            </div>
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h3 className="text-sm font-bold text-[var(--text-primary)]">Disable Airtime Fairness</h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Airtime Fairness gives every device equal airtime regardless of connection speed. This causes fast Wi-Fi 6 devices (your gaming console) to wait for slow legacy devices (IoT sensors, old phones). Disable it to let faster devices use the channel efficiently.
              </p>
            </div>
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h3 className="text-sm font-bold text-[var(--text-primary)]">Set Transmit Power to High</h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Under Advanced Wireless settings, set transmit power to High or 100%. Low transmit power causes your gaming device to stay associated with the router at a lower MCS rate, reducing throughput and increasing retry rates. Higher power maintains a cleaner signal at distance.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 10: Router Hardware Recommendations */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <HardDrive size={18} className="text-cyan-400" />
            10. When Router Hardware Is the Bottleneck
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Software optimization has limits. If your router's CPU is too slow to process QoS rules at wire speed, or if its NAT hardware offload is disabled, even the best settings won't help. Signs that your hardware is the bottleneck:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-xs md:text-sm text-[var(--text-muted)]">
            <li><strong>Consistently high CPU usage</strong> in the router's admin panel (&gt;70% idle).</li>
            <li><strong>Ping spikes only when QoS is enabled</strong> — the router CPU cannot classify traffic at full line speed.</li>
            <li><strong>Throughput drops below your plan speed</strong> when connecting multiple devices simultaneously.</li>
            <li><strong>Router age over 4-5 years</strong> — older routers lack hardware NAT acceleration found in modern SoCs.</li>
          </ul>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            For gaming-specific hardware, look for routers with dedicated gaming processors (ASUS ROG series, Netgear Nighthawk Pro, TP-Link Archer GX), hardware NAT offload, and 1.5-2.4 GHz dual-core or quad-core CPUs. These handle QoS classification at multi-gigabit speeds without CPU bottlenecks.
          </p>
        </section>

        {/* SECTION 11: Windows Gaming Network Optimizations */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Terminal size={18} className="text-cyan-400" />
            11. Windows Network Stack Optimizations for PC Gaming
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Beyond router settings, Windows has network stack parameters that affect gaming latency:
          </p>
          <pre className="p-4 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl font-mono text-xs text-green-400 overflow-x-auto">
{`# Run as Administrator in PowerShell

# Disable Nagle's Algorithm (reduces TCP buffering latency)
Set-ItemProperty -Path "HKLM:\\SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters\\Interfaces\\*" `
  + `-Name "TcpAckFrequency" -Value 1 -Type DWord

# Disable TCP Auto-Tuning (can cause issues with gaming UDP flows)
netsh interface tcp set global autotuninglevel=disabled

# Set DNS to Cloudflare for faster resolution
Set-DnsClientServerAddress -InterfaceAlias "Ethernet" -ServerAddresses ("1.1.1.1","1.0.0.1")

# Flush DNS cache after changing DNS servers
Clear-DnsClientCache

# Disable Network Throttling Index (removes artificial throughput limit)
Set-ItemProperty -Path "HKLM:\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile" \`
  -Name "NetworkThrottlingIndex" -Value 0xffffffff -Type DWord

# Set SystemResponsiveness to 0 for maximum gaming priority
Set-ItemProperty -Path "HKLM:\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile" \`
  -Name "SystemResponsiveness" -Value 0 -Type DWord`}
          </pre>
        </section>

        {/* SECTION 12: Console-Specific Quick Optimizations */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Gamepad2 size={18} className="text-cyan-400" />
            12. Console-Specific Network Settings
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl space-y-3">
              <h3 className="text-sm font-bold text-green-400">Xbox Series X/S Optimal Settings</h3>
              <ul className="list-disc pl-4 space-y-2 text-xs text-[var(--text-muted)]">
                <li>Settings &gt; General &gt; Network Settings &gt; Test NAT Type — target Open.</li>
                <li>Set static IP via Settings &gt; General &gt; Network &gt; Advanced Settings &gt; IP Settings &gt; Manual.</li>
                <li>Use DNS: 1.1.1.1 / 1.0.0.1 in Advanced Settings &gt; DNS Settings.</li>
                <li>Enable Settings &gt; General &gt; Network &gt; Allow Xbox to manage bandwidth — lets Xbox optimize connection automatically.</li>
              </ul>
            </div>
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl space-y-3">
              <h3 className="text-sm font-bold text-blue-400">PlayStation 5 Optimal Settings</h3>
              <ul className="list-disc pl-4 space-y-2 text-xs text-[var(--text-muted)]">
                <li>Settings &gt; Network &gt; Connection Status &gt; Test Internet Connection — target NAT Type 2.</li>
                <li>Settings &gt; Network &gt; Set Up Internet Connection &gt; Advanced &gt; IP Address: Manual (static IP outside DHCP pool).</li>
                <li>Set DNS: Primary 1.1.1.1, Secondary 1.0.0.1.</li>
                <li>MTU: Set to 1500 (automatic is usually correct; reduce to 1480 if experiencing disconnects).</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 13: Verification & Benchmarking */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Settings size={18} className="text-cyan-400" />
            13. Verify Your Optimizations: Before & After Testing
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            After applying router optimizations, run these tests to confirm improvements:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-5 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h4 className="font-bold text-[var(--text-primary)]">Bufferbloat Test</h4>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                Visit <code>waveform.com/tools/bufferbloat</code>. Run the test before and after enabling QoS. Your grade should improve from D/F to A/B. Ping under load should drop from 200-500ms to under 30ms.
              </p>
            </div>
            <div className="p-5 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h4 className="font-bold text-[var(--text-primary)]">NAT Type Test</h4>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                Use our <Link href="/nat-type-checker" className="text-[var(--brand-400)] hover:underline">NAT Type Checker</Link> or run the network test on your console. Target: Open or Moderate. Use our <Link href="/port-checker" className="text-[var(--brand-400)] hover:underline">Port Checker</Link> to verify forwarded ports are open.
              </p>
            </div>
            <div className="p-5 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h4 className="font-bold text-[var(--text-primary)]">Ping Stability Test</h4>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                Run <code>ping -t 8.8.8.8</code> in Windows for 2 minutes while a household member streams 4K video. Good result: ping stays under 30ms with no spikes above 50ms. Spikes indicate QoS is not configured correctly.
              </p>
            </div>
          </div>
        </section>

        {/* Related Guides */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)]">
            Related Gaming & NAT Guides
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { href: "/nat-type-strict", title: "NAT Type Strict Fix", desc: "Fix Strict NAT with UPnP, port forwarding, and DMZ on all router brands." },
              { href: "/double-nat-detected", title: "Double NAT Detected Fix", desc: "Resolve cascaded NAT blocking port forwarding and peer connections." },
              { href: "/high-ping-fix", title: "High Ping Fix Guide", desc: "Diagnose bufferbloat, routing issues, and ISP-level latency problems." },
              { href: "/port-forwarding-not-working", title: "Port Forwarding Not Working", desc: "Fix UPnP conflicts, CGNAT, and NAT table mapping failures." },
              { href: "/best-dns-for-gaming", title: "Best DNS for Gaming", desc: "Benchmarked DNS resolvers for lowest latency game server resolution." },
              { href: "/nat-type-checker", title: "NAT Type Checker", desc: "Live tool to detect your current NAT filtering type and open ports." },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="glass-card p-4 border border-[var(--border-subtle)] rounded-xl hover:border-[var(--brand-800)] transition-all duration-200 group"
              >
                <h3 className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--brand-400)] transition-colors">
                  {link.title}
                </h3>
                <p className="text-[11px] text-[var(--text-muted)] mt-1 leading-relaxed">{link.desc}</p>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </TroubleshootingArticleShell>
  );
}
