import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import TroubleshootingArticleShell from "@/components/tools/TroubleshootingArticleShell";
import ConnectionOptimizerClient from "@/components/tools/ConnectionOptimizerClient";
import { ShieldAlert, Server, Settings, Globe, Shield, Terminal, Activity, HelpCircle, HardDrive, Cpu, Network } from "lucide-react";

// Premium SEO Metadata
export const metadata: Metadata = buildMetadata({
  title: "Double NAT Detected? How to Fix on Xbox, PS5 & Router — RouterVia",
  description:
    "Solve 'Double NAT Detected' errors on Xbox, PS5, mesh networks, and ISP gateways. Learn how to configure bridge mode, setup AP mode, and establish Open NAT.",
  canonical: "/double-nat-detected",
  keywords: [
    "double nat detected",
    "how to fix double nat",
    "double nat xbox",
    "double nat ps5",
    "double nat gaming",
    "two routers on same network",
    "double nat issue",
    "carrier grade nat",
    "modem router combo",
    "bridge mode",
    "nat type strict",
    "port forwarding not working",
    "open nat",
  ],
});

const breadcrumbs = [
  { name: "Gaming Tools", url: "/nat-type-checker" },
  { name: "Double NAT Detected", url: "/double-nat-detected" },
];

const troubleshootingSteps = [
  {
    title: "Toggle the ISP Gateway Modem to Bridge Mode",
    description:
      "Log into the administration page of the gateway modem provided by your ISP (commonly accessed at 192.168.1.1 or 192.168.0.1). Navigate to WAN, Internet, or Network settings. Locate the Device Mode, Operation Mode, or NAT settings and toggle it from Router/Residential Gateway to 'Bridge Mode' (or 'IP Passthrough'). This disables the gateway's internal routing, NAT translation, and DHCP server, allowing your personal router to receive the public IP address directly on its WAN port.",
    tip: "If you cannot find a bridge mode toggle, disable the gateway's Wi-Fi radios entirely, assign your personal router's WAN port a static IP inside the gateway, and place that static IP address inside the gateway's DMZ (Demilitarized Zone).",
  },
  {
    title: "Configure Your Personal Router/Mesh to Access Point (AP) Mode",
    description:
      "If you prefer to let the ISP gateway manage routing and DHCP leases, you must disable routing on your personal router. Log into your personal router's management page (e.g. 192.168.50.1 for ASUS or 192.168.0.1 for TP-Link). Navigate to Advanced Settings -> System Mode (or Administration). Select 'Access Point (AP) Mode' and save the configuration. The router will restart, disable its secondary NAT engine, and pass DHCP lease requests directly to the ISP gateway.",
    tip: "In AP Mode, your personal router acts strictly as a wireless switch. You must manage port forwarding rules on the ISP gateway instead of the personal router.",
  },
  {
    title: "Deconflict Dynamic UPnP and Static Port Mapping Rules",
    description:
      "If you cannot remove the secondary NAT layer, you must establish manual static routes across both devices. Bind your gaming console or server to a static local IP. Create a port forwarding rule on your personal router mapping the target ports to your console. Then, log into the ISP gateway, create a port forwarding rule matching those exact port values, and route them to the WAN IP address of your personal router.",
    tip: "Ensure UPnP is set to 'Disabled' on both routers to prevent dynamic conntrack table updates from breaking your cascaded manual rules.",
  },
  {
    title: "Flush Router ARP and Connection Tracking Tables",
    description:
      "After modifying NAT configurations, changing modes, or establishing DMZ allocations, your devices will retain stale translation records in their memory. Power cycle your network devices in sequence: unplug both the ISP modem and your personal router from power. Wait 60 seconds. Plug the ISP modem in first, wait 2 minutes for it to establish WAN sync, and then power on your personal router.",
    tip: "Verify your console's connection state in the settings menu. You should see the Double NAT warning disappear and NAT Type change to Moderate or Open.",
  },
];

const faqs = [
  {
    question: "Is Double NAT dangerous or does it pose security risks?",
    answer:
      "Double NAT is not dangerous; in fact, it adds an extra layer of firewall protection by isolating your local devices behind two separate NAT translation engines. However, it does not increase security in a meaningful way for residential users and introduces severe connectivity bottlenecks for gaming, VoIP, and remote access. For standard home networks, the routing complications far outweigh any perceived security benefits.",
  },
  {
    question: "Does Double NAT cause in-game latency or high ping?",
    answer:
      "No. Double NAT does not add noticeable network latency or increase your ping. The time it takes for a router CPU to perform NAT translation is measured in microseconds (fractions of a millisecond). The main performance impact of Double NAT is that it breaks incoming connections and packet handshakes, leading to packet drops, strict NAT, and matchmaking timeouts rather than inflating physical RTT ping times.",
  },
  {
    question: "Can Double NAT affect port forwarding rules and UPnP?",
    answer:
      "Yes. Under Double NAT, standard port forwarding rules and UPnP fail entirely. When an external client attempts to connect to your forwarded port, the packet is intercepted and dropped by the first router (the ISP gateway) because it does not have a forwarding rule. The packet never reaches your personal router where your custom rules are defined. You must forward the port across both translation layers to make it work.",
  },
  {
    question: "Can Double NAT cause a Strict NAT Type on gaming consoles?",
    answer:
      "Yes, Double NAT is the primary cause of a 'Strict' or 'Type 3' NAT warning on Xbox, PlayStation, and Nintendo Switch. Because two routers are translating addresses, the console cannot determine its external public socket mapping during network test handshakes. This prevents other players from establishing direct peer-to-peer (P2P) connections with your system, blocking voice chats and lobby matching.",
  },
  {
    question: "Is Bridge Mode safe to enable on my ISP modem/router combo?",
    answer:
      "Yes, Bridge Mode is completely safe to enable, provided you have a personal router connected to the modem. Bridge mode disables the firewall and routing functions on the ISP gateway, passing the public IP directly to your personal router. Your personal router's built-in firewall immediately takes over the protection of your network, ensuring your local devices remain secure.",
  },
  {
    question: "Can I resolve Double NAT by disabling DHCP on my secondary router?",
    answer:
      "Disabling DHCP on your secondary router without changing its operation mode to Access Point (AP) mode will not resolve Double NAT and will crash your network. The router's WAN port will continue to perform NAT translation while clients fail to receive IP addresses. You must switch the router's system mode to Access Point mode, which automatically handles DHCP disabling and routes traffic transparently.",
  },
  {
    question: "Why does my mesh Wi-Fi system create a Double NAT error?",
    answer:
      "Most mesh Wi-Fi systems (like Deco, Eero, or Orbi) are configured by default to act as routers. If you plug the main mesh unit into an ISP modem/router gateway, both devices will perform NAT translation. To resolve this, you must log into the mesh app and toggle its operation mode from Router Mode to Access Point (AP) Mode, or put the ISP gateway in Bridge Mode.",
  },
  {
    question: "How do I check if my router's WAN IP is private or public?",
    answer:
      "Log into your router's status interface and check the WAN/Internet IP. Private IP ranges defined by RFC 1918 include: 10.0.0.0 to 10.255.255.255, 172.16.0.0 to 172.31.255.255, and 192.168.0.0 to 192.168.255.255. If your WAN IP falls within these ranges, your router is receiving a private IP from an upstream gateway, confirming a Double NAT setup.",
  },
  {
    question: "What is Carrier-Grade NAT (CGNAT) and how does it relate to Double NAT?",
    answer:
      "CGNAT is a carrier-level translation system where your ISP assigns a shared private IP (100.64.0.0/10 range) to your router's WAN port. While Double NAT occurs locally inside your home due to nesting two routers, CGNAT is a 'double NAT' controlled by your ISP. Resolving local Double NAT will not open your ports if your ISP is running CGNAT; you must contact them to request a public IP.",
  },
  {
    question: "Can I use DMZ to bypass Double NAT without using Bridge Mode?",
    answer:
      "Yes. If your ISP gateway does not support Bridge Mode, you can assign your personal router's WAN port a static IP inside the gateway, and place that static IP address inside the gateway's DMZ (Demilitarized Zone). This instructs the gateway to forward all unsolicited incoming traffic directly to your personal router, bypassing its firewall.",
  },
];

const commonCauses = [
  {
    title: "ISP Modem-Router Combinations",
    desc: "Provider-supplied gateway devices running routing daemons connected to personal third-party wireless routers.",
  },
  {
    title: "Mesh Wireless Systems in Router Mode",
    desc: "Deco, Eero, or Orbi nodes acting as routers when connected to an active upstream ISP routing box.",
  },
  {
    title: "Range Extenders with Routing Active",
    desc: "Wi-Fi extenders or powerline adapters configured to run separate DHCP servers, creating subnets.",
  },
  {
    title: "Double NAT Local IP Overlaps",
    desc: "Nested subnets (e.g. Router A 192.168.1.1 and Router B 192.168.0.1) performing translation in series.",
  },
  {
    title: "Dynamic UPnP conntrack Collisions",
    desc: "Two cascading routers running dynamic address translations, causing UPnP maps to fail at the gateway.",
  },
  {
    title: "Exposed DMZ Configuration Mismatches",
    desc: "Improper static IP assignments causing DMZ targets to bypass the secondary router and drop packets.",
  },
];

const quickFixChecklist = [
  "Check if your personal router's WAN IP is private (192.168.x.x, 10.x.x.x).",
  "Enable Bridge Mode or IP Passthrough on the ISP-supplied gateway modem.",
  "Toggle your personal router or mesh system to Access Point (AP) Mode.",
  "Disable DHCP and routing functions on secondary nested routers.",
  "Set up a WAN DMZ mapping on the ISP gateway targeting your personal router's WAN IP.",
  "Disable UPnP on both routers to prevent translation table race conditions.",
  "Power cycle the modem and router to clear stale connection tracking entries.",
];

export default function DoubleNatDetectedPage() {
  return (
    <TroubleshootingArticleShell
      h1="Double NAT Detected? How to Fix on Xbox, PS5 & Routers"
      intro="If you are seeing a 'Double NAT Detected' warning on your Xbox, a Strict NAT type on your PlayStation, or are experiencing broken port forwarding rules, your network is running two routing engines in series. This cascading translation setup blocks inbound peer connections, voice chats, and server handshakes. Follow this technical guide to locate the double translation layer and configure bridge mode, AP mode, or DMZ passthroughs."
      category="nat"
      breadcrumbs={breadcrumbs}
      faqs={faqs}
      troubleshootingSteps={troubleshootingSteps}
      warningBanner={{
        title: "NAT Configuration Notice",
        text: "Resolving Double NAT requires changing the operational modes of your gateways (Bridge Mode or Access Point Mode). This will temporarily drop your internet connection and disable wireless radios on the bypassed modem. Ensure you have access to your personal router's login panel before proceeding.",
      }}
      quickFixChecklist={quickFixChecklist}
      commonCauses={commonCauses}
      whenToContactISP="If your ISP gateway has locked firmware that disables Bridge Mode or DMZ modifications, contact their support line. Request them to configure the modem to bridge mode remotely, or ask to exchange the unit for a standalone bridge modem."
      severityLevel="medium"
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
            How to Fix Double NAT Detected Immediately
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Double NAT occurs when two routers on the same network perform address translation simultaneously, blocking incoming traffic needed for gaming and remote access. To fix it, log into your ISP-supplied modem/gateway and enable <strong>Bridge Mode</strong> (or IP Passthrough) to disable its router features. Alternatively, log into your personal router or mesh system and change its operating mode to <strong>Access Point (AP) Mode</strong>. Finally, restart your network to clear stale translation tables.
          </p>
        </section>

        {/* Dynamic Diagnostics Tool Integration */}
        <section aria-label="Interactive Diagnostic Wizard">
          <div className="mb-4">
            <h2 className="text-base font-bold text-[var(--text-primary)]">
              Interactive Double NAT Diagnostic Tool
            </h2>
            <p className="text-xs text-[var(--text-muted)] mt-1">
              Analyze your local routing interfaces, identify private subnets, and receive customized configuration steps.
            </p>
          </div>
          <ConnectionOptimizerClient mode="router-admin" />
        </section>

        {/* SECTION 2: Symptoms Table */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)]">
            2. Double NAT Symptoms & Diagnostics Matrix
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Double NAT disrupts incoming traffic and peer handshakes. Use this symptoms matrix to isolate the issue and apply the fastest fix:
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-xs text-[var(--text-secondary)]">
              <thead>
                <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                  <th className="px-4 py-3 text-left">Observed Network Symptom</th>
                  <th className="px-4 py-3 text-left">Underlying Root Cause</th>
                  <th className="px-4 py-3 text-left">Severity</th>
                  <th className="px-4 py-3 text-left">Recommended Configuration Fix</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)] bg-[var(--bg-surface)]/20">
                <tr>
                  <td className="px-4 py-3 font-semibold">
                    Xbox Network Settings displays 'Double NAT Detected' and Strict NAT.
                  </td>
                  <td className="px-4 py-3">Nested router translations blocking Xbox Live port 3074 handshakes.</td>
                  <td className="px-4 py-3 text-red-500 font-bold">Critical</td>
                  <td className="px-4 py-3">
                    Configure the ISP gateway to Bridge Mode, or put the secondary router in AP Mode.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold">
                    Port forwarding rules are active on the main router, but port checkers show closed.
                  </td>
                  <td className="px-4 py-3">Incoming connection probes are blocked at the ISP-supplied upstream gateway.</td>
                  <td className="px-4 py-3 text-yellow-400 font-bold">Medium</td>
                  <td className="px-4 py-3">
                    Read our <Link href="/port-forwarding-not-working" className="text-[var(--brand-400)] hover:underline">Port Forwarding troubleshooting guide</Link> or configure DMZ.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold">
                    Lobby matchmaking fails or voice chat cuts out in Warzone and CS2.
                  </td>
                  <td className="px-4 py-3">Stateless UDP gaming packets are dropped at the secondary router's WAN interface.</td>
                  <td className="px-4 py-3 text-yellow-400 font-bold">Medium</td>
                  <td className="px-4 py-3">
                    Disable UPnP on both routers, then run our <Link href="/high-ping-fix" className="text-[var(--brand-400)] hover:underline">High Ping fix guide</Link>.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold">
                    NAS or security camera feeds are unreachable when testing from external cellular networks.
                  </td>
                  <td className="px-4 py-3">Inbound HTTP/RTSP requests cannot resolve WAN-to-LAN mappings.</td>
                  <td className="px-4 py-3 text-red-500 font-bold">Critical</td>
                  <td className="px-4 py-3">
                    Set up DMZ forwarding on the ISP gateway targeting your personal router's WAN IP.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 3: What Double NAT Actually Means */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Network size={18} className="text-cyan-400" />
            3. What Double NAT Actually Means: Subnet Isolation Mechanics
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Every device on a local area network (LAN) requires a unique IP address to route traffic. Private IP addresses (defined under RFC 1918) are reserved for local use and cannot route directly on the public internet. Instead, your router uses <strong>Network Address Translation (NAT)</strong> to translate private IP sockets to a single public IP.
          </p>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            <strong>Double NAT</strong> occurs when you cascade two routing engines. Each router establishes its own isolated private network (subnet) and NAT table. This creates a nested network boundary where traffic is translated twice before reaching the public internet:
          </p>
          <div className="p-5 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl space-y-3 font-mono text-xs text-[var(--text-muted)]">
            <h4 className="text-xs font-bold text-[var(--text-primary)] font-sans">Double NAT IP Allocation Example:</h4>
            <ul className="space-y-1.5 leading-relaxed">
              <li>
                <strong>ISP Public IP (WAN):</strong> <code>198.51.100.8</code> (Assigned to the ISP Gateway WAN interface)
              </li>
              <li>
                <strong>Router A (ISP Gateway LAN):</strong> <code>192.168.1.1</code> (Creates subnet <code>192.168.1.0/24</code>)
              </li>
              <li>
                <strong>Router B (Personal Router WAN IP):</strong> <code>192.168.1.50</code> (Obtained from Router A's DHCP pool)
              </li>
              <li>
                <strong>Router B (Personal Router LAN):</strong> <code>192.168.0.1</code> (Creates subnet <code>192.168.0.0/24</code>)
              </li>
              <li>
                <strong>Host Client (Gaming PC):</strong> <code>192.168.0.100</code> (Obtained from Router B's DHCP pool)
              </li>
            </ul>
          </div>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            When your gaming PC sends an outbound request, Router B translates the source IP from <code>192.168.0.100</code> to <code>192.168.1.50</code>. The packet is then sent to Router A, which translates it again from <code>192.168.1.50</code> to the public IP <code>198.51.100.8</code>. While outbound traffic completes this journey successfully, unsolicited inbound traffic fails because it cannot cross the first translation layer.
          </p>
        </section>

        {/* SECTION 4: Packet Flow Diagram */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)]">
            4. Inbound Packet Flow & Translation Collision Model
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            To visualize why incoming connections drop under Double NAT, trace the path of an external client packet trying to connect to a host machine:
          </p>
          <div className="p-5 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl font-mono text-xs text-[var(--text-muted)] space-y-4">
            <div className="flex items-center gap-2 text-cyan-400 font-bold">
              <span>[Cascading NAT Router Translation Path]</span>
            </div>
            <div className="space-y-2 leading-relaxed">
              <div>
                <strong>1. Packet Arrives (Internet):</strong>
                <br />
                External server sends packet to your public IP:
                <br />
                <span className="text-green-400">Destination: 198.51.100.8:3074 (Public WAN IP)</span>
              </div>
              <div className="pl-4 border-l-2 border-[var(--border-subtle)]">
                ↓ Packet hits the WAN interface of Router A (ISP Gateway).
              </div>
              <div>
                <strong>2. Router A (ISP Gateway) Rule Check:</strong>
                <br />
                Router A checks its NAT conntrack table. Since there is no active outbound record or manual port forwarding rule matching destination port 3074, Router A drops the packet:
                <br />
                <span className="text-red-400">Result: [Packet Dropped / Firewall Discard]</span>
              </div>
              <div className="pl-4 border-l-2 border-[var(--border-subtle)]">
                ✖ The packet never reaches Router B's WAN port or the host computer.
              </div>
            </div>
          </div>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Even if you configure a port forwarding rule on Router B, it remains inactive because the traffic is blocked upstream at Router A. You must eliminate one of the NAT layers to restore inbound connectivity.
          </p>
        </section>

        {/* SECTION 5: Why Double NAT Breaks Gaming */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)]">
            5. Why Double NAT Breaks Gaming: Netcode & Lobby Disconnects
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Multiplayer gaming networks (such as Xbox Live, PlayStation Network, Steam, and Nintendo Switch Online) utilize peer-to-peer (P2P) connections to sync player states, coordinates, and lobby voice chats. Under P2P, consoles must communicate directly with one another.
          </p>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            When a game like <em>Warzone</em>, <em>Fortnite</em>, <em>Apex Legends</em>, or <em>Valorant</em> attempts to pair you with other players, the server checks if it can send UDP packets directly to your console. Under Double NAT, these connection checks fail at your ISP gateway. This causes the lobby server to report a <strong>Strict NAT</strong> or <strong>Double NAT Detected</strong> warning, resulting in matchmaking failures, lobby drops, and voice chat disconnections.
          </p>
        </section>

        {/* SECTION 6: Double NAT vs Strict NAT */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <ShieldAlert size={18} className="text-cyan-400" />
            6. Double NAT vs. Strict NAT: Understanding the Differences
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Double NAT and Strict NAT are related concepts, but they represent different network conditions:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-xs md:text-sm text-[var(--text-muted)]">
            <li>
              <strong>Double NAT:</strong> A physical network architecture issue where two routers are performing address translation in series on your local network.
            </li>
            <li>
              <strong>Strict NAT:</strong> A logical firewall classification state. It occurs when a router blocks incoming ports used by gaming networks, preventing peer-to-peer connections.
            </li>
          </ul>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            While Double NAT almost always causes a Strict NAT state, you can experience a Strict NAT state without having a Double NAT setup (for example, if your single router has its firewall set to block incoming traffic or if UPnP is disabled). For console-specific NAT configuration steps, refer to our <Link href="/nat-type-strict" className="text-[var(--brand-400)] hover:underline">Strict NAT fix guide</Link>.
          </p>
        </section>

        {/* SECTION 7: Most Common Causes */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)]">
            7. Root Causes of Double NAT in Home Networks
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Double NAT is rarely configured intentionally by network administrators. Instead, it is typically introduced by connecting new network hardware to existing gateways:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-xs md:text-sm text-[var(--text-muted)]">
            <li>
              <strong>ISP-provided Modem/Router Combinations:</strong> Many internet providers supply a combined modem-router gateway. If you plug a personal wireless router (ASUS, Netgear, Linksys) into this gateway, both routers will run NAT engines, creating a Double NAT setup.
            </li>
            <li>
              <strong>Mesh Wi-Fi Systems:</strong> Popular mesh systems (like Deco, Eero, or Orbi) are configured by default to act as routers. If you connect the main mesh node to an active upstream ISP routing box, it will create a secondary NAT layer.
            </li>
            <li>
              <strong>Cascading Nested Routers:</strong> Manually chaining routers together (connecting the WAN port of a secondary router to the LAN port of a primary router) without disabling DHCP or NAT.
            </li>
            <li>
              <strong>Range Extenders:</strong> Some Wi-Fi range extenders or powerline adapters operate in router mode, creating their own subnets and DHCP servers rather than passing traffic transparently.
            </li>
          </ul>
        </section>

        {/* SECTION 8: Detecting Double NAT */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Terminal size={18} className="text-cyan-400" />
            8. Detecting Double NAT: Diagnostic Commands
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            You can verify if your network is running a Double NAT by checking your local routing path. Run these diagnostic commands in your system terminal:
          </p>

          <h3 className="text-xs font-bold text-[var(--text-primary)]">Windows (Command Prompt)</h3>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Trace the hops to an external server using <code>tracert</code>:
          </p>
          <pre className="p-4 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl font-mono text-xs text-green-400 overflow-x-auto">
            tracert 8.8.8.8
          </pre>
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            Analyze the first two hops of the traceroute. If hop 1 and hop 2 both display private IP addresses (e.g., Hop 1: <code>192.168.0.1</code>, Hop 2: <code>192.168.1.1</code>), your packets are crossing two local routers before reaching the internet, confirming Double NAT.
          </p>

          <h3 className="text-xs font-bold text-[var(--text-primary)]">Linux & macOS (Terminal)</h3>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            On Linux, run <code>ip route</code> or <code>traceroute</code>. On macOS, inspect routing tables using:
          </p>
          <pre className="p-4 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl font-mono text-xs text-green-400 overflow-x-auto">
            route -n get default
          </pre>
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            Look for the gateway address. Check if your WAN interface is receiving a private IP address from your upstream modem.
          </p>
        </section>

        {/* SECTION 9: CGNAT vs Double NAT */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Shield size={18} className="text-cyan-400" />
            9. CGNAT vs. Double NAT: Key Differences
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            While both Carrier-Grade NAT (CGNAT) and local Double NAT translate IP addresses twice, they occur at different points on the network and require different solutions:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs text-[var(--text-secondary)]">
              <thead>
                <tr className="border-b border-[var(--border-subtle)] text-[var(--text-muted)] font-mono">
                  <th className="py-2.5 pr-4 font-semibold uppercase">Feature</th>
                  <th className="py-2.5 px-4 font-semibold uppercase">Double NAT</th>
                  <th className="py-2.5 pl-4 font-semibold uppercase">CGNAT</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)] font-mono">
                <tr>
                  <td className="py-3 pr-4 font-bold text-[var(--text-primary)]">Location</td>
                  <td className="py-3 px-4 text-emerald-400">Local (Inside your home)</td>
                  <td className="py-3 pl-4 text-amber-400">ISP Carrier Gateway</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-bold text-[var(--text-primary)]">WAN IP Prefix</td>
                  <td className="py-3 px-4">192.168.x.x, 10.x.x.x, 172.16.x.x</td>
                  <td className="py-3 pl-4">100.64.0.0 to 100.127.255.255</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-bold text-[var(--text-primary)]">Control</td>
                  <td className="py-3 px-4">User manages hardware settings</td>
                  <td className="py-3 pl-4">Managed entirely by ISP</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-bold text-[var(--text-primary)]">Standard Fix</td>
                  <td className="py-3 px-4">Enable Bridge Mode or AP Mode</td>
                  <td className="py-3 pl-4">Request public IP or use tunnel proxy</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 10: Bridge Mode Guide */}
        <section className="space-y-6">
          <h2 className="text-lg font-bold text-[var(--text-primary)]">
            10. Router Bridge Mode Configuration Guide
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Configuring Bridge Mode on your ISP-supplied modem/gateway is the recommended way to resolve Double NAT. This disables its internal routing functions and passes the public IP directly to your personal router. Follow these brand-specific steps to enable Bridge Mode:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h3 className="text-sm font-bold text-[var(--text-primary)]">TP-Link Gateways</h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Log into the gateway (typically at <code>192.168.1.1</code>). Navigate to <strong>Advanced &gt; Network &gt; Internet</strong>. Click <strong>Modify</strong> on your active WAN profile, change the connection type from Dynamic IP or PPPoE to <strong>Bridge Mode</strong>, and click Save.
              </p>
            </div>
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h3 className="text-sm font-bold text-[var(--text-primary)]">ASUS Routers</h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Log into the admin portal (typically at <code>192.168.1.1</code>). Go to <strong>Administration &gt; Operation Mode</strong>. Select <strong>Access Point (AP) mode</strong> or <strong>Media Bridge mode</strong>, and click Save to restart the router.
              </p>
            </div>
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h3 className="text-sm font-bold text-[var(--text-primary)]">Netgear Gateways</h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Log into the gateway page (typically at <code>192.168.0.1</code>). Go to <strong>ADVANCED &gt; Device Mode</strong>. Change the operation mode from Router to <strong>Bridge Mode</strong>, click Apply, and wait for the modem to restart.
              </p>
            </div>
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h3 className="text-sm font-bold text-[var(--text-primary)]">Huawei Gateways</h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Access the admin portal (typically at <code>192.168.100.1</code>). Go to <strong>WAN &gt; WAN Configuration</strong>. Create or edit the WAN profile, set the connection type to <strong>Bridge</strong>, bind the physical LAN port connected to your personal router, and click Apply.
              </p>
            </div>
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h3 className="text-sm font-bold text-[var(--text-primary)]">ZTE Gateways</h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Log into the gateway (typically at <code>192.168.1.1</code>). Navigate to <strong>Local Network &gt; WLAN &gt; Operation Mode</strong> or <strong>Internet &gt; WAN Connection</strong>. Set the link type to <strong>Bridge Connection</strong> and click Apply.
              </p>
            </div>
          </div>
          <div className="p-4 border border-amber-900/30 bg-amber-900/5 rounded-xl flex items-start gap-3">
            <ShieldAlert size={18} className="text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-xs font-semibold text-[var(--text-primary)]">Risks of Bridge Mode:</h4>
              <p className="text-[10px] text-[var(--text-secondary)] leading-relaxed">
                Bridge Mode disables the built-in Wi-Fi radios on your ISP modem. Any devices connected directly to the modem's Wi-Fi or LAN ports (other than your personal router) will lose internet access. Connect all local devices directly to your personal router.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 11: Access Point Mode Guide */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)]">
            11. Access Point (AP) Mode vs. Router Mode
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            If your ISP gateway doesn't support Bridge Mode, you can resolve Double NAT by setting your personal router to Access Point (AP) Mode:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-xs md:text-sm text-[var(--text-muted)]">
            <li>
              <strong>Router Mode (Default):</strong> The router performs address translation, assigns IP addresses via DHCP, and acts as a firewall. This creates a nested subnet when connected to another router.
            </li>
            <li>
              <strong>Access Point (AP) Mode:</strong> The router disables its DHCP server, firewall, and NAT translation functions. It acts as a bridge, forwarding all traffic directly to the upstream ISP gateway, which handles all routing tasks.
            </li>
          </ul>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            <strong>When to use AP Mode:</strong> Use AP Mode if you want to keep the ISP gateway as your primary router (e.g., if you have TV boxes connected directly to it) but want to use your personal router or mesh system for wireless coverage.
          </p>
        </section>

        {/* SECTION 12: Mesh Network Problems */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <HardDrive size={18} className="text-cyan-400" />
            12. Mesh Wi-Fi Systems and Accidental Routing Loops
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Mesh systems (such as TP-Link Deco, Netgear Orbi, or Amazon Eero) are designed to provide wireless coverage using multiple nodes. However, because they include routing capabilities, they are a common cause of Double NAT.
          </p>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            If you connect the primary mesh node to an active ISP gateway, the mesh system creates its own network and DHCP pool. Any client connected to the mesh network will be isolated behind a secondary NAT layer. To resolve this, open your mesh system's mobile app, navigate to Advanced Settings &gt; Operating Mode, and select <strong>Access Point (AP) Mode</strong>. This disables routing on the mesh system, resolving Double NAT while keeping your mesh Wi-Fi network active.
          </p>
        </section>

        {/* SECTION 13: Port Forwarding Impact */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)]">
            13. How Double NAT Breaks Port Forwarding and UPnP
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Port forwarding requires a direct, unhindered path from the public internet to your host device. Double NAT breaks this path by introducing a secondary translation layer.
          </p>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            When you configure a port forwarding rule on your personal router, it is ignored because the incoming traffic is dropped upstream at the ISP gateway. UPnP (Universal Plug and Play) also fails because the game client cannot communicate with the upstream gateway's NAT table. For steps to troubleshoot broken port forwarding rules, refer to our <Link href="/port-forwarding-not-working" className="text-[var(--brand-400)] hover:underline">Port Forwarding fix guide</Link>.
          </p>
        </section>

        {/* SECTION 14: Xbox & PlayStation Fixes */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Settings size={18} className="text-cyan-400" />
            14. Console-Specific NAT Type Remediation
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            If you observe a Double NAT warning on your console, apply these fixes to restore an Open NAT type:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-xs md:text-sm text-[var(--text-muted)]">
            <li>
              <strong>Xbox Series X/S & Xbox One:</strong> Go to Settings &gt; General &gt; Network Settings. If you see 'Double NAT Detected', verify if you can enable bridge mode on your modem. If bridge mode is unavailable, assign the Xbox a static IP and forward port 3074 on both routers, or place the personal router in the ISP gateway's DMZ.
            </li>
            <li>
              <strong>PlayStation 5 & PlayStation 4:</strong> Go to Settings &gt; Network &gt; Connection Status &gt; Test Internet Connection. If your connection is NAT Type 3 (Strict), voice chats and lobby matching will fail. Resolve this by putting your secondary router in AP mode to eliminate the Double NAT layer, which will transition your PS5 connection to NAT Type 2 (Moderate/Open).
            </li>
          </ul>
        </section>

        {/* SECTION 15: Business Network Cases */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Server size={18} className="text-cyan-400" />
            15. Business Networks, Remote Feeds, and VPN Servers
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Double NAT does not just disrupt gaming; it also blocks remote access to critical business systems:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-xs md:text-sm text-[var(--text-muted)]">
            <li>
              <strong>VPN Servers (IPsec / OpenVPN):</strong> IPsec and OpenVPN servers hosted on a local NAS or router require unsolicited inbound connections. Double NAT blocks these requests, preventing remote clients from connecting to the VPN.
            </li>
            <li>
              <strong>Remote Desktop (RDP):</strong> Port forwarding TCP port 3389 for Windows Remote Desktop will fail under Double NAT unless the rule is configured on both routers.
            </li>
            <li>
              <strong>NAS and CCTV Access:</strong> Accessing local files or security camera feeds remotely requires a clear routing path. Use bridge mode on your modem to resolve Double NAT and restore remote connectivity.
            </li>
          </ul>
        </section>

        {/* SECTION 16: When Double NAT Is Impossible To Remove */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Globe size={18} className="text-emerald-400" />
            16. Tunneling Alternatives When Double NAT Cannot Be Removed
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            If your ISP blocks bridge mode and refuses to modify gateway settings, you cannot resolve Double NAT using standard routing changes. In this scenario, use these tunneling alternatives to bypass NAT boundaries:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-5 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h4 className="font-bold text-[var(--text-primary)]">Tailscale</h4>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                Creates an encrypted peer-to-peer mesh network using WireGuard. Once your devices are connected to Tailscale, they can communicate directly using virtual IP addresses, bypassing local Double NAT firewalls entirely.
              </p>
            </div>
            <div className="p-5 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h4 className="font-bold text-[var(--text-primary)]">Cloudflare Tunnels</h4>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                Establishes a secure outbound connection from your local server to Cloudflare's network. Allows external users to access your local web application or API without opening any inbound ports on your router.
              </p>
            </div>
            <div className="p-5 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h4 className="font-bold text-[var(--text-primary)]">ZeroTier</h4>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                Establishes a virtual ethernet switch across NAT barriers. Great for hosting private game servers or accessing local files remotely when you cannot modify gateway settings.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 17: ISP Escalation Workflow */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)]">
            17. ISP Escalation Evidence Checklist
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            If your ISP gateway has locked firmware that prevents you from enabling Bridge Mode or configuring DMZ exceptions, you must escalate the issue. Contact their support line and provide this technical detail:
          </p>
          <ul className="list-disc pl-6 space-y-2.5 text-xs md:text-sm text-[var(--text-muted)]">
            <li>
              <strong>Bypass Statement:</strong> \"I have connected a secondary personal router to your gateway. However, your locked firmware prevents me from enabling bridge mode, resulting in a Double NAT error that blocks my game connections.\"
            </li>
            <li>
              <strong>Traceroute Logs:</strong> Provide traceroute logs showing private IP addresses at hop 1 and hop 2, proving the gateway is performing NAT translation.
            </li>
            <li>
              <strong>Request Standalone Modem:</strong> Request to swap the gateway modem for a standalone bridge modem that does not contain built-in routing or DHCP servers.
            </li>
          </ul>
        </section>
      </div>
    </TroubleshootingArticleShell>
  );
}
