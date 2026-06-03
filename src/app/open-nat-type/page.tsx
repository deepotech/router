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
  title: "Open NAT Type: How to Get Open NAT for Gaming & Lower Ping | RouterVia",
  description:
    "Learn how to get an Open NAT type on Xbox, PlayStation, and PC. Stop matchmaking lag, fix Strict NAT, configure UPnP, and map ports on TP-Link, ASUS, and Netgear routers.",
  canonical: "/open-nat-type",
  keywords: [
    "open nat type",
    "how to get open nat",
    "open nat gaming",
    "nat type open",
    "fix strict nat",
    "gaming nat optimization",
    "double nat fix",
    "port forwarding guide",
    "cgnat gaming",
  ],
});

// =============================================================
// Breadcrumbs
// =============================================================

const breadcrumbs = [
  { name: "Gaming Tools", url: "/nat-type-checker" },
  { name: "Open NAT Type", url: "/open-nat-type" },
];

// =============================================================
// Troubleshooting Steps (Renders at the top of the shell)
// =============================================================

const troubleshootingSteps = [
  {
    title: "Verify Your WAN IP to Check for CGNAT",
    description:
      "Log into your router admin panel and navigate to the WAN, Status, or Device Info tab. Locate your WAN (Internet) IP address. Check if this IP falls within the range of 100.64.0.0 to 100.127.255.255. This block is reserved for Carrier-Grade NAT (CGNAT). If your WAN IP is in this range, your ISP is sharing a single public IP among multiple subscribers, making an Open NAT impossible through standard settings. You will need to contact your ISP and request a static public IP.",
    tip: "Compare your router's WAN IP with the public IP displayed on a site like WhatIsMyIP.com. If the two addresses do not match, you are either behind CGNAT or a Double NAT configuration.",
  },
  {
    title: "Enable Universal Plug and Play (UPnP)",
    description:
      "Navigate to the NAT, Advanced, or WAN setup page in your router's interface. Find the UPnP (Universal Plug and Play) option and toggle it to Enabled. UPnP allows game clients on your PC or console to dynamically open the specific incoming UDP/TCP ports they need when the game starts, and close them when you log off, achieving an Open NAT without manual configuration.",
    tip: "After enabling UPnP, reboot both your router and your gaming console or PC. This forces the device to clear its active NAT mappings and request fresh port allocations from the router.",
  },
  {
    title: "Setup Static DHCP Reservation and Manual Port Forwarding",
    description:
      "If UPnP is disabled for security reasons or fails to open NAT, you must forward ports manually. Go to LAN Settings > DHCP Client List on your router, select your gaming device, and bind its MAC address to a fixed local IP address (Static IP). Next, open the Port Forwarding, Virtual Server, or NAT tab. Create a forwarding rule targeting your device's static IP for port 3074 UDP/TCP (the default port for Xbox and Call of Duty) or platform-specific ports.",
    tip: "If you have two of the same consoles in one house, manual port forwarding will conflict. In this case, use UPnP, or change the manual port selection settings inside the network menu of the second console to use an alternate port like 3075.",
  },
  {
    title: "Eliminate Double NAT Layouts",
    description:
      "Double NAT occurs when you have two routers in series doing Address Translation. Locate the upstream modem provided by your ISP. Log into its admin panel and toggle it into 'Bridge Mode' or 'IP Passthrough' to turn off its routing functions. This passes the public IP directly to your personal router, leaving only a single layer of NAT.",
    tip: "If your ISP modem does not support Bridge Mode, you can achieve a similar result by placing your personal router's WAN IP inside the ISP modem's DMZ (Demilitarized Zone) or configuring your personal router in Access Point (AP) mode.",
  },
];

// =============================================================
// Common Causes
// =============================================================

const commonCauses = [
  {
    title: "Disabled UPnP Protocols",
    desc: "Without UPnP, the router blocks incoming connection requests, forcing game ports to remain closed and resulting in a Moderate or Strict NAT.",
  },
  {
    title: "Double NAT Routing Layers",
    desc: "Having two routers running NAT in series (e.g., an ISP modem-router and a personal mesh router) locks ports on the secondary layer.",
  },
  {
    title: "Carrier-Grade NAT (CGNAT)",
    desc: "Many ISPs assign private WAN IP addresses to save IPv4 space, preventing inbound port maps from reaching your home router.",
  },
  {
    title: "Aggressive Router Firewalls",
    desc: "Strict router firewall rules or active SIP ALG modules drop incoming UDP packets, breaking peer association tables.",
  },
];

// =============================================================
// Quick Fix Checklist
// =============================================================

const quickFixChecklist = [
  "Check your WAN IP address in the router dashboard: if it is between 100.64.0.0 and 100.127.255.255, you are behind CGNAT.",
  "Enable Universal Plug and Play (UPnP) under Advanced NAT or WAN configuration submenus.",
  "Assign your gaming console or PC a static local IP using DHCP Static Reservation.",
  "Configure manual port forwarding for your platform's gaming ports (e.g., UDP port 3074).",
  "Resolve Double NAT by placing your ISP modem into Bridge Mode or configuring your router in Access Point (AP) mode.",
  "Turn off SIP ALG in the router's ALG or security page to prevent packet address rewrites.",
  "Configure a DMZ for your game console only (avoid using DMZ for Windows PCs or general devices).",
  "Enable IPv6 to bypass NAT routing entirely and get direct network interfaces."
];

// =============================================================
// FAQ Data (10 advanced FAQs)
// =============================================================

const faqs = [
  {
    question: "Is Open NAT type safe for my gaming PC?",
    answer:
      "Having an Open NAT is generally safe for gaming consoles (PS5, Xbox, Switch) because they run closed, locked-down operating systems that do not expose standard desktop services. However, for a Windows PC, exposing all ports via DMZ or a broad UPnP configuration carries security risks. A Windows PC runs background network services that could be scanned and targeted. For PC gaming, it is safer to manually forward only the specific ports required by the game launcher rather than placing the entire PC in a DMZ.",
  },
  {
    question: "Why does my NAT type keep switching between Open and Moderate?",
    answer:
      "This fluctuating behavior is typically caused by UPnP mapping timeouts. When your router or console restarts, UPnP dynamically registers port mappings. If another device on the network requests the same ports or if the lease time expires, the router may release the mapping, forcing the NAT back to Moderate. To fix this, configure a DHCP reservation to assign your gaming device a static IP, and set up permanent, manual port forwarding rules instead of relying on dynamic UPnP.",
  },
  {
    question: "Can I get an Open NAT type if I am using a mobile hotspot?",
    answer:
      "It is extremely difficult to get an Open NAT on a mobile hotspot (4G LTE or 5G). Cellular networks run behind Carrier-Grade NAT (CGNAT) by default because mobile carriers do not have enough public IPv4 addresses for millions of cellular devices. Since CGNAT blocks all incoming ports at the carrier level, you cannot forward ports. The only ways to get an Open NAT on a hotspot are to request a static public IP from your carrier (which usually requires a business plan) or route your traffic through a gaming VPN with port forwarding capabilities.",
  },
  {
    question: "Does Open NAT lower my ping to the game server?",
    answer:
      "Open NAT does not lower your base ping (which is determined by geographical distance and routing paths). However, it prevents latency spikes and connection drops. With Moderate or Strict NAT, you may be unable to establish direct peer-to-peer (P2P) connections. When this happens, the game is forced to route your traffic through intermediate relay servers. These relays add extra routing hops, which can increase your ping by 30ms to 80ms. Open NAT guarantees direct routing.",
  },
  {
    question: "What is the difference between Moderate NAT and Strict NAT?",
    answer:
      "Under Moderate NAT (Type 2), some incoming ports are open, allowing you to connect to most players, host lobbies, and hear voice chat. However, you cannot connect to players with Strict NAT. Strict NAT (Type 3) means all incoming ports are closed. You cannot host lobbies, and you can only connect to players with Open NAT. Moderate NAT is acceptable for most gamers, while Strict NAT severely limits matchmaking pool sizes and breaks party systems.",
  },
  {
    question: "Should I prioritize IPv6 over IPv4 to solve NAT issues?",
    answer:
      "Yes, if your ISP and the game servers support it. IPv6 (Internet Protocol version 6) allocates trillions of unique public IP addresses, completely eliminating the need for NAT. Under IPv6, every device in your home has its own public IP, allowing direct inbound and outbound connections. If you enable IPv6 globally, you bypass NAT types entirely, achieving the equivalent of Open NAT natively without needing UPnP or manual port forwarding rules.",
  },
  {
    question: "Can I use DMZ and Port Forwarding at the same time?",
    answer:
      "No, configuring both at the same time is redundant and can cause conflicts. DMZ (Demilitarized Zone) acts as a catch-all rule: it forwards all incoming traffic on unmapped ports to a single designated device. If you have active port forwarding rules, the router will send traffic on those specified ports to those devices, and send everything else to the DMZ host. It is best to use Port Forwarding for specific devices and leave DMZ disabled, or use DMZ exclusively for one console.",
  },
  {
    question: "Why does my ISP use CGNAT and how does it affect gaming?",
    answer:
      "ISPs use Carrier-Grade NAT (CGNAT) to conserve their limited pool of public IPv4 addresses. Instead of assigning a unique public IP to each subscriber, they pool thousands of users behind a single public IP. Because the carrier controls the port mappings at their gateway, subscribers cannot configure inbound port forwarding. For online gaming, this locks your NAT type to Strict, preventing P2P connections, hosting custom games, and voice chat.",
  },
  {
    question: "Does enabling UPnP cause lag on my network?",
    answer:
      "No, UPnP does not cause network lag. UPnP only handles the initial handshake to register port mappings when a game starts. Once the mapping is registered in your router's NAT table, the router forwards incoming packets instantly with no CPU overhead. However, UPnP can be security-vulnerable if malicious software on a local device opens ports without your knowledge, which is why some security-conscious gamers prefer manual port forwarding.",
  },
  {
    question: "How do I fix a Double NAT type if I have a mesh Wi-Fi system?",
    answer:
      "If you connect a personal mesh system (like eero, Google Nest, or TP-Link Deco) to your ISP-provided gateway, both devices will perform NAT. To fix this, open your mesh system's settings app, navigate to Advanced Settings > Operating Mode, and change it from 'Router' to 'Bridge Mode' or 'Access Point (AP) Mode'. This disables the mesh system's routing functions, leaving your ISP gateway as the sole NAT provider.",
  },
];

// =============================================================
// Page Component
// =============================================================

export default function OpenNatTypePage() {
  return (
    <TroubleshootingArticleShell
      h1="Open NAT Type: How to Get Open NAT for Gaming & Lower Ping"
      intro="If you are experiencing matchmaking delays, voice chat drops, or lobby connection errors, your router's NAT type is likely Moderate or Strict. NAT (Network Address Translation) dictates how your router handles incoming connection requests from other players. To host lobbies and play without restrictions, you must achieve an Open NAT. This technical guide explains the mechanics of NAT traversal, UPnP, and port mapping across all major router brands and gaming platforms."
      category="nat"
      breadcrumbs={breadcrumbs}
      faqs={faqs}
      troubleshootingSteps={troubleshootingSteps}
      warningBanner={{
        title: "NAT Security Threshold",
        text: "Achieving an Open NAT type involves allowing incoming connections through your router's firewall. While this is entirely safe for closed-system gaming consoles, you should exercise caution on Windows PCs. Never place a PC in the DMZ or configure broad, unmonitored UPnP ranges. Only forward specific ports requested by your game launchers.",
      }}
      quickFixChecklist={quickFixChecklist}
      commonCauses={commonCauses}
      whenToContactISP="Contact your ISP if your router's WAN IP lies within the CGNAT range (100.64.0.0/10), which prevents all forms of local port mapping, or if you require a static public IP to resolve persistent NAT translation conflicts."
      severityLevel="low"
    >
      <div className="space-y-12">
        {/* SECTION 1: Quick AI Answer */}
        <section
          className="glass-card p-6 border border-cyan-950/20 bg-cyan-950/5 rounded-2xl relative overflow-hidden"
          aria-label="Quick AI Answer"
        >
          <div className="absolute top-0 right-0 bg-[var(--brand-500)]/10 text-[var(--brand-400)] text-[10px] font-mono uppercase tracking-wider px-3 py-1 rounded-bl-lg font-bold">
            Quick AI Response Summary
          </div>
          <h2 className="text-xs font-bold text-[var(--brand-400)] mb-3 uppercase tracking-wide">
            How to Get an Open NAT Type Instantly
          </h2>
          <div className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed space-y-3">
            <p>
              To achieve an Open NAT type, apply the following steps in sequence:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-[var(--text-muted)]">
              <li><strong>Enable UPnP:</strong> Access your router settings and toggle UPnP to enabled. This is the fastest, dynamic method for consoles.</li>
              <li><strong>Configure Port Forwarding:</strong> If UPnP fails, assign your gaming device a static local IP and forward port <strong>UDP 3074</strong>.</li>
              <li><strong>Eliminate Double NAT:</strong> If you have two routers, place the upstream modem-router into Bridge Mode.</li>
              <li><strong>DMZ (Consoles Only):</strong> If you cannot open specific ports, configure a DMZ rule targeting your console's IP.</li>
            </ul>
          </div>
        </section>

        {/* Interactive Tool */}
        <section aria-label="Interactive Router Optimization Tool">
          <div className="mb-4">
            <h2 className="text-base font-bold text-[var(--text-primary)]">
              Interactive NAT Diagnostic Wizard
            </h2>
            <p className="text-xs text-[var(--text-muted)] mt-1">
              Select your primary gaming console or PC client below to view port ranges, test for double NAT layers, and retrieve step-by-step router guides.
            </p>
          </div>
          <ConnectionOptimizerClient mode="router-admin" />
        </section>

        {/* SECTION 2: NAT Types Comparison Table */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Activity size={18} className="text-cyan-400" />
            1. NAT Types: Matchmaking & Voice Chat Capabilities
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Your NAT type dictates which players you can connect to in multiplayer lobbies. Refer to this compatibility matrix:
          </p>
          <div className="overflow-x-auto border border-[var(--border-subtle)] rounded-xl">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-xs text-[var(--text-secondary)]">
              <thead>
                <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                  <th className="px-4 py-3 text-left">NAT Type</th>
                  <th className="px-4 py-3 text-left">Can Connect To</th>
                  <th className="px-4 py-3 text-left">Lobby Hosting</th>
                  <th className="px-4 py-3 text-left">Voice Chat (P2P)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)] bg-[var(--bg-surface)]/20">
                <tr>
                  <td className="px-4 py-3 font-semibold text-green-400">Open (Type 1)</td>
                  <td className="px-4 py-3">Open, Moderate, and Strict players (everyone).</td>
                  <td className="px-4 py-3 text-green-400 font-bold">Fully Supported</td>
                  <td className="px-4 py-3 text-green-400">Perfect (Direct Link)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-yellow-400">Moderate (Type 2)</td>
                  <td className="px-4 py-3">Open and Moderate players. Cannot connect to Strict.</td>
                  <td className="px-4 py-3 text-yellow-400 font-bold">Limited Support</td>
                  <td className="px-4 py-3 text-yellow-400">Generally Stable</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-red-400">Strict (Type 3)</td>
                  <td className="px-4 py-3">Open players only. Cannot connect to Moderate or Strict.</td>
                  <td className="px-4 py-3 text-red-500 font-bold">Not Supported</td>
                  <td className="px-4 py-3 text-red-500">Frequent Drops / Muted</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 3: What Open NAT Actually Means */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Network size={18} className="text-cyan-400" />
            2. The Technical Underpinnings of Open NAT
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            NAT is not a single standard; it is a set of behaviors defined by how your router handles **Endpoint Mapping** and **Endpoint Filtering**:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h4 className="font-bold text-[var(--text-primary)]">Endpoint-Independent Mapping</h4>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                The router translates a local IP and port to a single public IP and port, regardless of the destination. Any external device sending packets to that public port will route directly back to the local device. This is the baseline requirement for **Open NAT**.
              </p>
            </div>
            <div className="p-4 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h4 className="font-bold text-[var(--text-primary)]">Address-Restricted Filtering</h4>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                The router will only allow inbound packets from an external IP if the local device has previously sent an outbound packet to that specific IP. This results in a **Moderate NAT**.
              </p>
            </div>
            <div className="p-4 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h4 className="font-bold text-[var(--text-primary)]">Port-Restricted Filtering</h4>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                The router blocks inbound packets unless they originate from the exact same external IP and port that the local device previously targeted. This creates a **Strict NAT**, forcing the use of NAT traversal protocols like STUN or TURN relays.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: How NAT Works */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Cpu size={18} className="text-cyan-400" />
            3. PAT & Connection Tracking Tables
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Routers implement **PAT (Port Address Translation)** to track connections. When your console sends a packet to a game server, the router translates your local source IP (e.g., `192.168.1.50:3074`) into its public WAN IP (e.g., `82.44.102.15:3074`) and writes this mapping into its active **State Table**.
          </p>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            When the game server replies, it sends packets back to `82.44.102.15:3074`. The router looks up port `3074` in its state table, translates the destination address back to `192.168.1.50:3074`, and forwards the packet.
          </p>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            The problem arises with inbound traffic. If another player tries to connect to your console directly (P2P matchmaking), their packet arrives at your router's public IP on port `3074` without an active entry in the state table. Without an explicit rule (like UPnP or Port Forwarding), the router firewall discards this unsolicited packet, resulting in a Moderate or Strict NAT.
          </p>
        </section>

        {/* SECTION 5: Why Gamers Need Open NAT */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Gamepad2 size={18} className="text-cyan-400" />
            4. Genre and Platform Constraints
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Different platforms use different terminologies for NAT, but the underlying mechanisms are identical:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-5 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h4 className="font-bold text-green-400">PlayStation (Type 1, 2, 3)</h4>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                PlayStation categorizes NAT as Type 1 (direct connection to the internet, no router), Type 2 (connected through a router with open ports — equivalent to Open/Moderate), and Type 3 (connected through a router with blocked ports — equivalent to Strict).
              </p>
            </div>
            <div className="p-5 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h4 className="font-bold text-blue-400">Xbox (Open, Moderate, Strict)</h4>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                Xbox uses explicit Open, Moderate, and Strict labels. An Xbox console requires port <strong>UDP 3074</strong> to be fully mapped to negotiate peer matchmaking. If blocked, it defaults to Strict NAT, blocking party chat.
              </p>
            </div>
            <div className="p-5 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h4 className="font-bold text-red-400">Nintendo Switch (A, B, C, D, F)</h4>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                Nintendo Switch rates NAT from A (best/Open) to F (worst/Strict). Because Nintendo's online multiplayer is almost entirely P2P (players host the lobby states on their consoles), you must have NAT Type A or B to connect to matchmaking.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 6: Open NAT vs Moderate NAT */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <BarChart3 size={18} className="text-cyan-400" />
            5. Deep Comparison: Open NAT vs. Moderate NAT
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            While both Open and Moderate NAT types allow you to play online, they handle peer connections differently:
          </p>
          <ul className="list-disc pl-6 space-y-2.5 text-xs md:text-sm text-[var(--text-muted)]">
            <li><strong>Matchmaking Speed:</strong> Open NAT queries all available players in the matchmaking pool. Moderate NAT must skip players who have Strict NAT, narrowing your pool by up to 20% and increasing queue wait times.</li>
            <li><strong>Lobby Hosting:</strong> An Open NAT host can host lobby sessions for any player. A Moderate NAT host can only host sessions for Open and Moderate players; if a Strict player joins the queue, they will be disconnected.</li>
            <li><strong>In-Game VoIP:</strong> Moderate NAT can occasionally drop voice packets if the firewall's port translation table conflicts with the lobby server, resulting in robotic audio.</li>
          </ul>
        </section>

        {/* SECTION 7: Open NAT vs Strict NAT */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Shield size={18} className="text-cyan-400" />
            6. Strict NAT Latency Penalties
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Under a Strict NAT, your router blocks all incoming connections. To allow you to play, the game network must route your traffic through a dedicated **TURN (Traversal Using Relays around NAT)** server.
          </p>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Instead of routing your coordinates directly to the lobby host, your packets travel to the ISP, then to the TURN server, and then to the host. This relay architecture introduces significant latency overhead (often adding 30ms to 80ms of ping) and can cause packet drops. For a complete troubleshooting workflow to resolve Strict NAT, read our guide on{" "}
            <Link href="/nat-type-strict" className="text-[var(--brand-400)] hover:underline">How to Fix a Strict NAT Type</Link>.
          </p>
        </section>

        {/* SECTION 8: UPnP Explained */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Settings size={18} className="text-cyan-400" />
            7. Universal Plug and Play (UPnP): Dynamic NAT Mappings
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            **UPnP (Universal Plug and Play)** is a set of networking protocols that allows devices on your local network to discover each other and automatically configure port forwarding rules. When you launch a game like Call of Duty, the game client broadcasts a UPnP request to your router: *'Forward port 3074 UDP to my local IP address.'*
          </p>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            The router registers the rule in its NAT table instantly. When you close the game, the mapping is deleted, protecting the port from external scans. While highly convenient, UPnP does carry security risks because any software (including malware) on your local network can open incoming ports without administrator approval.
          </p>
        </section>

        {/* SECTION 9: Port Forwarding Method */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Network size={18} className="text-cyan-400" />
            8. Manual Port Forwarding: The Secure Route
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            If you choose to disable UPnP for security reasons, you must configure manual port forwarding. Manual port forwarding requires assigning a static IP to your gaming device via DHCP Reservation and creating rules to route specific external ports to that IP.
          </p>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            If your manual port forwarding rules are not resolving your NAT type, check our troubleshooting guide on{" "}
            <Link href="/port-forwarding-not-working" className="text-[var(--brand-400)] hover:underline">Why Port Forwarding Is Not Working</Link> to audit your configuration.
          </p>
        </section>

        {/* SECTION 10: Double NAT Problems */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Globe size={18} className="text-cyan-400" />
            9. Double NAT: Cascaded Firewalls
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Double NAT occurs when you have two routers performing address translation on the same network (for example, connecting a personal mesh Wi-Fi system to an ISP-provided modem-router gateway).
          </p>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            In this setup, your game packets must pass through two separate NAT translation tables. Even if you configure port forwarding on your personal router, incoming traffic is blocked at the upstream ISP router. To resolve this, read our step-by-step guide on{" "}
            <Link href="/double-nat-detected" className="text-[var(--brand-400)] hover:underline">How to Resolve Double NAT Environments</Link>.
          </p>
        </section>

        {/* SECTION 11: CGNAT Limitations */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Globe size={18} className="text-cyan-400" />
            10. Carrier-Grade NAT (CGNAT) and the 100.64.0.0/10 Range
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Many ISPs (especially cellular, satellite, and rural fiber providers) use **CGNAT (Carrier-Grade NAT)** to conserve IPv4 space. Under CGNAT, the ISP assigns your router a private WAN IP address within the shared **`100.64.0.0/10`** block (from `100.64.0.0` to `100.127.255.255`) defined by RFC 6598.
          </p>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Because the carrier is performing the address translation at their central gateway, local port forwarding or UPnP configurations cannot reach the public internet. If your WAN IP lies within this range, you will be locked to Strict NAT. The only solution is to contact your ISP and purchase a public static IP, or use an IPv6 configuration.
          </p>
        </section>

        {/* SECTION 12: Router Brand Guides */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Settings size={18} className="text-cyan-400" />
            11. Brand-Specific NAT Configurations
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Use these menu paths to configure NAT settings on your specific router brand:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h4 className="font-bold text-[var(--text-primary)]">TP-Link Archer</h4>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                Log into admin &gt; Advanced &gt; NAT Forwarding &gt; UPnP &gt; Enable. For static bindings: Advanced &gt; Network &gt; DHCP Server &gt; Address Reservation &gt; Add your console MAC and IP.
              </p>
            </div>
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h4 className="font-bold text-[var(--text-primary)]">ASUS RT Series</h4>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                Log into dashboard &gt; WAN &gt; Connection Tab &gt; Enable UPnP &gt; Set to Yes. For DHCP binding: LAN &gt; DHCP Server &gt; Enable Manual Assignment &gt; Input MAC and select IP.
              </p>
            </div>
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h4 className="font-bold text-[var(--text-primary)]">Netgear Nighthawk</h4>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                ADVANCED &gt; Advanced Setup &gt; UPnP &gt; Turn on UPnP. For static leases: ADVANCED &gt; Setup &gt; LAN Setup &gt; Address Reservation &gt; Click Add and assign IP.
              </p>
            </div>
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h4 className="font-bold text-[var(--text-primary)]">Linksys Wi-Fi</h4>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                Log into router &gt; Connectivity &gt; Administration &gt; Toggle UPnP to Enabled. For IP reservation: Connectivity &gt; Local Network &gt; DHCP Reservation.
              </p>
            </div>
          </div>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            For more advanced configurations (such as shaping traffic or optimizing DNS), see our guides on{" "}
            <Link href="/best-router-settings-for-gaming" className="text-[var(--brand-400)] hover:underline">Best Router Settings for Gaming</Link> and{" "}
            <Link href="/best-qos-settings-for-gaming" className="text-[var(--brand-400)] hover:underline">Best QoS Settings for Gaming</Link>.
          </p>
        </section>

        {/* SECTION 13: Xbox Open NAT */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Gamepad2 size={18} className="text-cyan-400" />
            12. Xbox Series X/S Open NAT Guide
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            To achieve an Open NAT on Xbox Series X/S, configure these parameters:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-xs md:text-sm text-[var(--text-muted)]">
            <li>Go to <strong>Settings &gt; General &gt; Network Settings</strong> and check your current NAT status.</li>
            <li>If NAT is Moderate or Strict, navigate to <strong>Advanced Settings &gt; Alternate Port Selection</strong>.</li>
            <li>Select <strong>Manual</strong>. Choose an alternate port (such as 49152 to 65535) if the default port 3074 is already mapped to another device.</li>
            <li>Configure your router's port forwarding rules to route this custom port to your Xbox's static IP.</li>
          </ul>
        </section>

        {/* SECTION 14: PlayStation Open NAT */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Gamepad2 size={18} className="text-cyan-400" />
            13. PlayStation 5 (PS5) NAT Type 2 Configuration
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            On PlayStation, a Type 2 NAT is the target connection type when using a router:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-xs md:text-sm text-[var(--text-muted)]">
            <li>Go to <strong>Settings &gt; Network &gt; Connection Status &gt; Test Internet Connection</strong>. Verify your NAT Type.</li>
            <li>If NAT is Type 3 (Strict), assign your PS5 a static IP inside your router.</li>
            <li>Configure port forwarding for PSN ports: <strong>TCP 3478-3480</strong> and <strong>UDP 3074, 3478-3479</strong>.</li>
            <li>Reboot your PS5 and re-run the connection test to verify that the NAT has updated to Type 2.</li>
          </ul>
        </section>

        {/* SECTION 15: PC Gaming Open NAT */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Terminal size={18} className="text-cyan-400" />
            14. PC Gaming Client Configurations
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            PC launchers (Steam, Battle.net, Epic Games, EA App) use different port ranges to negotiate multiplayer lobbies. Configure these rules:
          </p>
          <ul className="list-disc pl-6 space-y-2.5 text-xs md:text-sm text-[var(--text-muted)]">
            <li><strong>Steam Matchmaking:</strong> Forward UDP ports 27015 to 27030, and TCP ports 27015 to 27030.</li>
            <li><strong>Battle.net (Call of Duty):</strong> Forward UDP port 3074 and TCP port 3074 targeting your PC's static local IP.</li>
            <li><strong>EA App (Apex Legends):</strong> Forward TCP ports 80, 443, 9988, 17502, 20000-20100 and UDP ports 3659, 14000-14016.</li>
          </ul>
        </section>

        {/* SECTION 16: IPv6 and Open NAT */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Globe size={18} className="text-cyan-400" />
            15. Bypassing NAT with IPv6 Protocols
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            The long-term solution to NAT limitations is **IPv6**. Under IPv4, NAT is required because there are only 4.3 billion addresses. IPv6 provides 340 undecillion addresses, meaning every single device on earth can have its own unique public IP.
          </p>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Under IPv6, there is no address translation. Your router still has a firewall, but it does not perform NAT. If you enable IPv6 globally, your consoles and PC receive direct, public addresses, achieving the equivalent of Open NAT natively without needing UPnP or port forwarding rules.
          </p>
        </section>

        {/* SECTION 17: Security Implications */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Shield size={18} className="text-cyan-400" />
            16. Security Audits: Open NAT Risk Mitigation
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Opening ports exposes those specific avenues of incoming traffic to the internet. To minimize security vulnerabilities:
          </p>
          <ul className="list-disc pl-6 space-y-2.5 text-xs md:text-sm text-[var(--text-muted)]">
            <li><strong>Never Place PCs in DMZ:</strong> The DMZ opens all 65,535 ports to the internet, exposing Windows background services. Only use DMZ for consoles.</li>
            <li><strong>Configure Port Triggering:</strong> Instead of holding ports open permanently, use Port Triggering. The router will only open the port when it detects active outbound gaming traffic.</li>
            <li><strong>Disable UPnP when Idle:</strong> If you are not actively gaming, disable UPnP to prevent unauthorized local apps from opening ports.</li>
          </ul>
        </section>

        {/* SECTION 18: Diagnostics */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Terminal size={18} className="text-cyan-400" />
            17. Diagnostic Commands: Verifying Open Ports
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Use these CLI tools on your operating system to verify that the ports are actively listening and mapping correctly:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            <div className="p-5 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h4 className="font-bold text-[var(--text-primary)] font-sans">Windows Command Prompt</h4>
              <p className="text-[11px] text-green-400 leading-relaxed">
                <code>netstat -ano | findstr 3074</code>
                <br />
                Checks if port 3074 is listening or established.
                <br /><br />
                <code>ipconfig /all</code>
                <br />
                Displays network adapter configurations.
              </p>
            </div>
            <div className="p-5 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h4 className="font-bold text-[var(--text-primary)] font-sans">Linux Terminal</h4>
              <p className="text-[11px] text-green-400 leading-relaxed">
                <code>ss -tulw | grep 3074</code>
                <br />
                Lists active TCP and UDP listening sockets on port 3074.
                <br /><br />
                <code>sudo iptables -t nat -L -n -v</code>
                <br />
                Inspects the active NAT table mappings on Linux routers.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 19: When Open NAT Is Impossible */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Globe size={18} className="text-cyan-400" />
            18. VPN & Overlay Alternatives for CGNAT
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            If you are behind CGNAT and your ISP refuses to provide a public IP, standard port forwarding will not work. You can bypass this restriction using these network overlay alternatives:
          </p>
          <ul className="list-disc pl-6 space-y-2.5 text-xs md:text-sm text-[var(--text-muted)]">
            <li><strong>Tailscale / ZeroTier:</strong> Virtual private networking services that create encrypted Layer 2/3 tunnels between your devices globally, bypassing intermediate CGNAT routers.</li>
            <li><strong>VPN with Dedicated IP:</strong> Connect your router or PC to a commercial VPN provider that offers a dedicated public IP and static port forwarding slots.</li>
          </ul>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            For more details on resolving network routing issues, see our diagnostic guides on{" "}
            <Link href="/high-ping-fix" className="text-[var(--brand-400)] hover:underline">High Ping Resolution</Link> and{" "}
            <Link href="/packet-loss-test" className="text-[var(--brand-400)] hover:underline">Packet Loss Testing</Link>.
          </p>
        </section>
      </div>
    </TroubleshootingArticleShell>
  );
}
