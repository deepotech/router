import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import TroubleshootingArticleShell from "@/components/tools/TroubleshootingArticleShell";
import ConnectionOptimizerClient from "@/components/tools/ConnectionOptimizerClient";
import {
  ShieldAlert,
  Settings,
  Globe,
  Shield,
  Terminal,
  Activity,
  Network,
  Cpu,
  HardDrive,
  Gamepad2,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

// =============================================================
// Premium SEO Metadata
// =============================================================

export const metadata: Metadata = buildMetadata({
  title: "NAT Type Strict Fix — Get Open NAT on Xbox, PS5 & PC | RouterVia",
  description:
    "Fix Strict NAT Type on Xbox, PS5, and PC. Learn how to achieve Open NAT through port forwarding, UPnP, DMZ, and router configuration. Step-by-step guide for all router brands.",
  canonical: "/nat-type-strict",
  keywords: [
    "nat type strict",
    "strict nat fix",
    "how to get open nat",
    "nat type moderate",
    "nat type open",
    "xbox nat type strict",
    "ps5 nat type strict",
    "double nat",
    "port forwarding",
    "upnp",
    "gaming connectivity",
    "multiplayer connection issues",
    "open nat gaming",
    "nat type 3",
    "nat type 1",
    "nat type 2",
  ],
});

// =============================================================
// Breadcrumbs
// =============================================================

const breadcrumbs = [
  { name: "Gaming Tools", url: "/nat-type-checker" },
  { name: "NAT Type Strict Fix", url: "/nat-type-strict" },
];

// =============================================================
// Troubleshooting Steps
// =============================================================

const troubleshootingSteps = [
  {
    title: "Enable UPnP on Your Router",
    description:
      "Log into your router's admin panel (typically at 192.168.1.1 or 192.168.0.1). Navigate to Advanced Settings > NAT Forwarding > UPnP, or WAN > UPnP depending on your router brand. Enable UPnP and save the configuration. Reboot your router and run the console's network test. UPnP allows game consoles and applications to automatically register port mappings in the router's NAT table without requiring manual rule entry.",
    tip: "After enabling UPnP, restart your console and run a fresh network test. The NAT type reading should update immediately. If it remains Strict after UPnP is enabled, proceed to manual port forwarding.",
  },
  {
    title: "Assign a Static Local IP to Your Console or Gaming PC",
    description:
      "Before creating port forwarding rules, you must bind your console to a fixed private IP address. This prevents DHCP from assigning it a different IP on reboot, which would invalidate your forwarding rules. On your console, navigate to Network Settings > Advanced Settings, disable DHCP, and manually enter an IP address outside your router's DHCP pool (e.g., 192.168.1.200). Alternatively, create a DHCP reservation in your router's admin panel using the console's MAC address.",
    tip: "DHCP reservations are more reliable than static IP assignment on the device itself. Look for DHCP Reservation or Address Reservation in your router's LAN settings.",
  },
  {
    title: "Create Manual Port Forwarding Rules",
    description:
      "In your router's admin panel, navigate to Advanced > NAT Forwarding > Virtual Servers (TP-Link), WAN > Port Forwarding (ASUS), or ADVANCED > Port Forwarding / Port Triggering (Netgear). Create rules for the required ports by entering: the internal IP of your console, the external port range, the internal port range, and the protocol (TCP/UDP or Both). Add all required ports for your platform — see the Gaming Console Ports section below for exact values.",
    tip: "Use 'Both' or 'TCP+UDP' for protocol unless the port specifically requires one type. A misconfigured protocol setting will leave the port partially open.",
  },
  {
    title: "Place Console in DMZ as Last Resort",
    description:
      "If manual port forwarding does not resolve Strict NAT, place your gaming console in the DMZ (Demilitarized Zone). In your router's admin panel, navigate to the Firewall or NAT section and find DMZ Host or DMZ Server. Enter the static IP address you assigned to your console. The DMZ exposes all ports on the console directly to the public internet, bypassing all firewall rules and NAT filtering. This is the most reliable way to achieve Open NAT.",
    tip: "DMZ is safe for dedicated gaming consoles because they do not run server services. However, never place a Windows PC or NAS device in the DMZ without additional firewall software, as it exposes all ports including SMB and RDP.",
  },
];

// =============================================================
// FAQ Data
// =============================================================

const faqs = [
  {
    question: "What is NAT Type Strict and why does it affect gaming?",
    answer:
      "NAT Type Strict (also called Type 3 on PlayStation or Strict on Xbox) means your router's firewall is blocking unsolicited inbound UDP and TCP connections. Multiplayer games rely on peer-to-peer (P2P) connections where game servers and other players need to reach your console directly. Strict NAT blocks these inbound connections, causing matchmaking failures, party invitations to fail, voice chat to cut out, and preventing you from hosting lobbies.",
  },
  {
    question: "What is the difference between NAT Type 1, 2, and 3?",
    answer:
      "PlayStation uses a 1-2-3 scale. NAT Type 1 (Open) means your console is connected directly to the internet without NAT, typically via a direct modem connection. NAT Type 2 (Moderate) means your console is behind a router with the correct ports open, allowing most peer-to-peer connections. NAT Type 3 (Strict) means your router is blocking inbound ports, preventing direct peer connections. Xbox uses Open, Moderate, and Strict labels which correspond directly to these same network states.",
  },
  {
    question: "Why does enabling UPnP sometimes not fix Strict NAT?",
    answer:
      "UPnP can fail for several reasons: your router's UPnP daemon may have a bug or memory leak causing stale entries, another device on your network may be claiming the same port via UPnP (a conflict), you have Double NAT preventing the UPnP request from reaching the outer router, or your ISP is running CGNAT which blocks UPnP mappings at the carrier level. If UPnP fails, use manual static port forwarding rules as a more reliable alternative.",
  },
  {
    question: "Can Double NAT cause a Strict NAT type?",
    answer:
      "Yes. Double NAT is one of the most common causes of a permanent Strict NAT state. When two routers are translating addresses in series, your console's port mapping requests cannot propagate to the upstream gateway. Incoming game connections are dropped at the outer router because it has no forwarding rule. Resolve Double NAT by enabling Bridge Mode on your ISP modem or setting your personal router to Access Point (AP) Mode. See our Double NAT guide for detailed steps.",
  },
  {
    question: "What ports do I need to forward for Xbox to get Open NAT?",
    answer:
      "For Xbox Live and Xbox Series X/S, forward the following ports to your console's static IP: TCP/UDP 3074 (primary Xbox Live), UDP 88 (Kerberos authentication), UDP 500 (IPsec for Xbox parties), UDP 3544 (Teredo tunneling), UDP 4500 (NAT-T for IPsec). For specific game titles like Halo Infinite or Call of Duty, additional ports may be required. Check the game's official support page for title-specific port requirements.",
  },
  {
    question: "What ports do I need to forward for PlayStation to get NAT Type 2?",
    answer:
      "For PlayStation Network (PS5 and PS4), forward the following ports: TCP 80, TCP 443, TCP 3478, TCP 3479, TCP 3480, UDP 3478, UDP 3479. For remote play or VoIP chat through PSN, also forward UDP 10070-10080. Assign your PS5 a static IP first. After creating these rules, run Settings > Network > Test Internet Connection on your PS5 to verify the NAT Type has changed from 3 to 2.",
  },
  {
    question: "Does NAT Type affect my ping or game latency?",
    answer:
      "NAT Type itself does not directly increase your ping. However, Strict NAT forces games to route your connection through relay servers (TURN servers) instead of establishing direct peer-to-peer connections. This relay routing adds 30-80ms of additional latency because your traffic must traverse an extra server hop. Open NAT allows direct P2P connections which are always lower-latency than relay routing. For a deep-dive on latency, see our High Ping Fix guide.",
  },
  {
    question: "What is CGNAT and how does it prevent Open NAT?",
    answer:
      "Carrier-Grade NAT (CGNAT) is a system where your ISP shares a single public IP address among multiple residential customers simultaneously. Your router's WAN port receives a private IP in the 100.64.0.0/10 range (RFC 6598). Because you do not have a unique public IP, you cannot forward inbound ports through the ISP's CGNAT gateway. No router settings change will fix Strict NAT under CGNAT. You must contact your ISP and request a dedicated public IP address (often available as a business or static IP upgrade).",
  },
  {
    question: "Is it safe to use DMZ on my gaming console?",
    answer:
      "DMZ on a gaming console is considered safe in practice. Modern game consoles (Xbox, PlayStation) do not run general-purpose server services that could be exploited. The risk of placing a console in DMZ is significantly lower than placing a PC or NAS. The console's network stack only responds to traffic initiated by known game and PSN/Xbox Live services. That said, keep your console's firmware updated when using DMZ to patch any discovered vulnerabilities in the network stack.",
  },
  {
    question: "Can a VPN cause Strict NAT type on my console?",
    answer:
      "Yes. Running a VPN on your router or console changes how your traffic exits the network. Most VPN providers use Symmetric NAT at their server endpoints, which is more restrictive than your ISP's NAT. Symmetric NAT assigns different external port mappings for each destination IP, breaking game P2P handshakes. If you are using a VPN and experiencing Strict NAT, disable the VPN for gaming or use a split-tunnel configuration that routes gaming traffic directly through your ISP without the VPN.",
  },
];

// =============================================================
// Common Causes
// =============================================================

const commonCauses = [
  {
    title: "UPnP Disabled or Malfunctioning",
    desc: "Router's Universal Plug and Play daemon is disabled or has stale conntrack entries preventing dynamic port registration.",
  },
  {
    title: "Double NAT — Two Routing Layers",
    desc: "ISP gateway and personal router both performing NAT translation, blocking incoming P2P connection handshakes.",
  },
  {
    title: "CGNAT — Shared ISP Public IP",
    desc: "Carrier-Grade NAT at ISP infrastructure level assigns a private WAN IP (100.64.x.x), preventing port forwarding entirely.",
  },
  {
    title: "Firewall Blocking Game Ports",
    desc: "Router firewall rules blocking inbound UDP ports required by Xbox Live (3074), PSN (3478–3479), or specific game titles.",
  },
  {
    title: "Dynamic Private IP — No Static Assignment",
    desc: "Port forwarding rules point to an old DHCP-assigned IP after the console received a new lease, silently breaking NAT rules.",
  },
  {
    title: "Symmetric NAT / Full-Cone NAT Mismatch",
    desc: "Router NAT behavior type is Symmetric rather than Full-Cone or Port-Restricted, preventing P2P hole-punching by game engines.",
  },
];

// =============================================================
// Quick Fix Checklist
// =============================================================

const quickFixChecklist = [
  "Run your console's network test to confirm current NAT type (Strict / Type 3 / Moderate).",
  "Check if your router's WAN IP is a private address — this indicates Double NAT or CGNAT.",
  "Enable UPnP in your router admin panel and reboot both router and console.",
  "Assign your console a static IP or DHCP reservation using its MAC address.",
  "Create manual port forwarding rules for your platform (Xbox: 3074, PS5: 3478-3479).",
  "If Double NAT exists, enable Bridge Mode on ISP modem or set personal router to AP Mode.",
  "As a last resort, place your console's static IP in the router's DMZ.",
  "Contact ISP if WAN IP is in 100.64.0.0/10 range (CGNAT) to request a public IP.",
];

// =============================================================
// Page Component
// =============================================================

export default function NatTypeStrictPage() {
  return (
    <TroubleshootingArticleShell
      h1="NAT Type Strict Fix: How to Get Open NAT on Xbox, PS5 & PC"
      intro="A Strict NAT type blocks peer-to-peer gaming connections, prevents party invitations, cuts voice chat, and forces game traffic through slow relay servers. This technical guide explains exactly why NAT becomes Strict and gives you every available fix — from enabling UPnP and manual port forwarding, to resolving Double NAT and escaping CGNAT restrictions — for all major router brands and gaming platforms."
      category="nat"
      breadcrumbs={breadcrumbs}
      faqs={faqs}
      troubleshootingSteps={troubleshootingSteps}
      warningBanner={{
        title: "CGNAT Alert — Router Settings Won't Help",
        text: "If your router's WAN IP address starts with 100.64.x.x or falls in the range 100.64.0.0 to 100.127.255.255, your ISP is using Carrier-Grade NAT. No router-side configuration change (UPnP, port forwarding, or DMZ) can fix Strict NAT in this scenario. You must contact your ISP to request a dedicated public IP address.",
      }}
      quickFixChecklist={quickFixChecklist}
      commonCauses={commonCauses}
      whenToContactISP="Contact your ISP if your router's WAN IP is in the 100.64.0.0/10 CGNAT range, if they provide a locked modem/gateway that cannot be bridged, or if port forwarding works but NAT remains Strict (indicating CGNAT upstream). Request a dedicated public IP or a business connection upgrade."
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
            How to Fix NAT Type Strict in Under 5 Minutes
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            NAT Type Strict means your router is blocking inbound peer-to-peer gaming connections. The fastest fix is to log into your router admin panel and enable <strong>UPnP</strong> (Universal Plug and Play). If UPnP alone does not work, assign your console a <strong>static IP</strong> and create <strong>manual port forwarding rules</strong> for your platform (Xbox: UDP/TCP 3074; PS5: TCP/UDP 3478-3479). If two routers exist on your network (Double NAT), you must remove one NAT layer via <strong>Bridge Mode</strong> or <strong>AP Mode</strong> first. If your ISP is using CGNAT (WAN IP starts with 100.64.x.x), you must contact them to obtain a public IP — no router setting will help.
          </p>
        </section>

        {/* Interactive Diagnostic Tool */}
        <section aria-label="Interactive NAT Diagnostic Wizard">
          <div className="mb-4">
            <h2 className="text-base font-bold text-[var(--text-primary)]">
              Interactive NAT Diagnostic Tool
            </h2>
            <p className="text-xs text-[var(--text-muted)] mt-1">
              Analyze your router configuration, detect NAT filtering type, and receive platform-specific remediation steps.
            </p>
          </div>
          <ConnectionOptimizerClient mode="router-admin" />
        </section>

        {/* SECTION 2: NAT Type Symptoms Table */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)]">
            2. NAT Type Symptoms & Diagnostics Matrix
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Use this matrix to map your exact symptom to the likely NAT filtering state and the fastest recommended fix:
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-xs text-[var(--text-secondary)]">
              <thead>
                <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                  <th className="px-4 py-3 text-left">Symptom</th>
                  <th className="px-4 py-3 text-left">NAT State</th>
                  <th className="px-4 py-3 text-left">Severity</th>
                  <th className="px-4 py-3 text-left">Fastest Fix</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)] bg-[var(--bg-surface)]/20">
                <tr>
                  <td className="px-4 py-3 font-semibold">Xbox shows &quot;Strict&quot; NAT in Network Settings &gt; Test NAT Type.</td>
                  <td className="px-4 py-3">Strict / Type 3</td>
                  <td className="px-4 py-3 text-red-500 font-bold">Critical</td>
                  <td className="px-4 py-3">Enable UPnP or forward ports 3074 TCP/UDP and 88 UDP to Xbox static IP.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold">PS5 shows NAT Type 3 — cannot join friends' parties or voice chat.</td>
                  <td className="px-4 py-3">NAT Type 3</td>
                  <td className="px-4 py-3 text-red-500 font-bold">Critical</td>
                  <td className="px-4 py-3">Forward TCP 3478-3480 and UDP 3478-3479 to your PS5's static IP.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold">Matchmaking takes 5+ minutes; lobbies drop after joining.</td>
                  <td className="px-4 py-3">Strict / Moderate</td>
                  <td className="px-4 py-3 text-yellow-400 font-bold">High</td>
                  <td className="px-4 py-3">Enable UPnP. If Double NAT, resolve it first via Bridge Mode or AP Mode.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold">Cannot invite friends or accept game invitations on Xbox/PS5.</td>
                  <td className="px-4 py-3">Strict / Type 3</td>
                  <td className="px-4 py-3 text-red-500 font-bold">Critical</td>
                  <td className="px-4 py-3">Forward platform-specific ports. Place console in DMZ as a final escalation.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold">Voice chat works but party frequently disconnects.</td>
                  <td className="px-4 py-3">Moderate / Partial</td>
                  <td className="px-4 py-3 text-yellow-400 font-bold">Medium</td>
                  <td className="px-4 py-3">Disable SIP ALG in router settings. Ensure UDP 500 and 4500 are open.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold">NAT type is Open but ping is very high and games stutter.</td>
                  <td className="px-4 py-3">NAT OK — Latency Issue</td>
                  <td className="px-4 py-3 text-blue-400 font-bold">Separate Issue</td>
                  <td className="px-4 py-3">
                    Review our{" "}
                    <Link href="/high-ping-fix" className="text-[var(--brand-400)] hover:underline">
                      High Ping Fix guide
                    </Link>{" "}
                    for bufferbloat and QoS configuration.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 3: What is NAT */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Network size={18} className="text-cyan-400" />
            3. What Is NAT? How It Controls Gaming Connections
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            <strong>Network Address Translation (NAT)</strong> is a mechanism built into your router that allows multiple devices sharing a single public IP address to communicate with the internet. Your ISP assigns one public IP to your router's WAN port. All devices on your local network (LAN) use private RFC 1918 addresses (192.168.x.x, 10.x.x.x) and share that public IP through NAT.
          </p>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            When a device inside your network initiates a connection to an internet server, your router records the internal IP and source port in its <strong>NAT connection tracking (conntrack) table</strong>, replaces the private source IP with the public IP, and forwards the packet. When the server responds, the router looks up the matching entry in its conntrack table and delivers the packet to the correct internal device.
          </p>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            The critical limitation: <strong>unsolicited inbound traffic</strong> — packets arriving from the internet without a prior outbound request — has no matching conntrack entry. The router's firewall drops these packets. Multiplayer gaming relies heavily on inbound connections (other players reaching your console), which is why NAT configuration is critical for gaming.
          </p>
          <div className="p-5 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl space-y-3 font-mono text-xs text-[var(--text-muted)]">
            <h4 className="text-xs font-bold text-[var(--text-primary)] font-sans">NAT Type Classification Summary:</h4>
            <ul className="space-y-2 leading-relaxed">
              <li>
                <strong className="text-green-400">Open (Type 1):</strong> Console has a direct public IP — no NAT translation. All inbound connections pass freely. Achievable by connecting directly to a modem with no router.
              </li>
              <li>
                <strong className="text-yellow-400">Moderate (Type 2):</strong> Console is behind NAT but critical game ports are open via UPnP or port forwarding. Can connect to Open and Moderate peers.
              </li>
              <li>
                <strong className="text-red-400">Strict (Type 3):</strong> Inbound ports are blocked. Can only connect to Open NAT peers. Cannot host lobbies, join restricted parties, or use voice chat reliably.
              </li>
            </ul>
          </div>
        </section>

        {/* SECTION 4: NAT Filtering Types */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Shield size={18} className="text-cyan-400" />
            4. NAT Filtering Behavior Types: Full-Cone vs. Symmetric
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            The "NAT Type" label used by consoles is a simplification. Under the hood, routers implement different NAT filtering behaviors that determine exactly which inbound packets are allowed:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs text-[var(--text-secondary)]">
              <thead>
                <tr className="border-b border-[var(--border-subtle)] text-[var(--text-muted)] font-mono">
                  <th className="py-2.5 pr-4 font-semibold uppercase">NAT Behavior</th>
                  <th className="py-2.5 px-4 font-semibold uppercase">Inbound Rule</th>
                  <th className="py-2.5 pl-4 font-semibold uppercase">Console NAT Result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)]">
                <tr>
                  <td className="py-3 pr-4 font-bold text-green-400">Full-Cone NAT</td>
                  <td className="py-3 px-4">Any external IP can send to the mapped port.</td>
                  <td className="py-3 pl-4 text-green-400">Open / Type 1</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-bold text-yellow-400">Restricted-Cone NAT</td>
                  <td className="py-3 px-4">Only IPs your device previously contacted can send inbound.</td>
                  <td className="py-3 pl-4 text-yellow-400">Moderate / Type 2</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-bold text-orange-400">Port-Restricted NAT</td>
                  <td className="py-3 px-4">Only the exact IP:port pair previously contacted can reply inbound.</td>
                  <td className="py-3 pl-4 text-orange-400">Moderate or Strict</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-bold text-red-400">Symmetric NAT</td>
                  <td className="py-3 px-4">Different external port used for each destination — breaks P2P hole-punching entirely.</td>
                  <td className="py-3 pl-4 text-red-400">Strict / Type 3</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Symmetric NAT is the most restrictive behavior and is commonly used by ISPs running CGNAT or by VPN services. It completely breaks the UDP hole-punching mechanism that games use to establish P2P connections. If your ISP uses Symmetric NAT at the carrier level, port forwarding has no effect.
          </p>
        </section>

        {/* SECTION 5: Why Port Forwarding Fails Under Strict NAT */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)]">
            5. Why Strict NAT Breaks Multiplayer: P2P Handshake Failures
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Modern multiplayer games use one of two connection models: <strong>dedicated servers</strong> (where the game company hosts all traffic) or <strong>peer-to-peer (P2P)</strong> (where players connect directly to each other). Even games with dedicated servers often use P2P for voice chat, party lobbies, and invitation systems.
          </p>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Under P2P, two players behind separate NAT routers use a technique called <strong>UDP hole-punching</strong> to establish a direct connection:
          </p>
          <div className="p-5 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl font-mono text-xs text-[var(--text-muted)] space-y-3">
            <div className="text-cyan-400 font-bold">[UDP Hole-Punching — Strict NAT Failure Path]</div>
            <div className="space-y-2 leading-relaxed">
              <div>
                <strong>1. Rendezvous:</strong> Player A and Player B both send UDP packets to a central matchmaking relay server. The server records the external IP:port mapping for each player.
              </div>
              <div className="pl-4 border-l-2 border-[var(--border-subtle)]">
                ↓ Server attempts to connect Player A directly to Player B.
              </div>
              <div>
                <strong>2. Hole-Punch Attempt:</strong> Player A's game client sends a UDP packet to Player B's external IP:port. This "punches a hole" in Player A's NAT table.
              </div>
              <div className="pl-4 border-l-2 border-[var(--border-subtle)]">
                ↓ Player B simultaneously sends a UDP packet to Player A's external IP:port.
              </div>
              <div>
                <strong>3. Under Strict NAT:</strong> Player B's outbound packet is allowed. However, the inbound packet from Player B arrives at Player A's router, which has no matching conntrack entry (because the destination port is blocked). <span className="text-red-400">[Packet Dropped at Firewall]</span>
              </div>
              <div className="pl-4 border-l-2 border-[var(--border-subtle)]">
                ✖ Direct P2P connection fails. Game falls back to relay server, adding latency.
              </div>
            </div>
          </div>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            When P2P hole-punching fails, the game uses a <strong>TURN relay server</strong> as a fallback. All packets travel through this relay server instead of directly between players. This adds 30-80ms of additional latency to all player interactions — on top of your existing ping to the game server.
          </p>
        </section>

        {/* SECTION 6: UPnP Guide */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Settings size={18} className="text-cyan-400" />
            6. How UPnP Works & Why It Sometimes Fails
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            <strong>Universal Plug and Play (UPnP)</strong> is a protocol that allows devices on your local network to automatically register port mapping rules in your router's NAT table without requiring manual configuration. When your Xbox or PS5 connects to an online game, its game client broadcasts a UPnP request over your LAN. The router's UPnP daemon receives this request and dynamically creates a port forwarding rule, enabling inbound game traffic to reach the console.
          </p>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            UPnP failures occur in these specific scenarios:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-xs md:text-sm text-[var(--text-muted)]">
            <li>
              <strong>UPnP Port Conflicts:</strong> Two devices attempt to register the same external port (e.g., two Xbox consoles both requesting port 3074). The router grants the first request and rejects the second, leaving the second console with Strict NAT.
            </li>
            <li>
              <strong>Stale conntrack Entries:</strong> After a router reboot or crash, old UPnP entries may persist in a broken state. Rebooting the router and all consoles clears these entries and allows fresh registrations.
            </li>
            <li>
              <strong>Double NAT Blocking UPnP:</strong> Your console sends the UPnP request to your personal router, which processes it. However, the ISP gateway's NAT table remains unchanged, so inbound traffic is still blocked at the outer layer.
            </li>
            <li>
              <strong>IGMP Snooping / Multicast Filtering:</strong> Some routers block UPnP discovery packets (which use multicast address 239.255.255.250) when IGMP snooping is enabled. Disable IGMP Snooping or add an exception for this multicast group.
            </li>
          </ul>
        </section>

        {/* SECTION 7: Router Brand Port Forwarding Guides */}
        <section className="space-y-6">
          <h2 className="text-lg font-bold text-[var(--text-primary)]">
            7. Router Brand-Specific Port Forwarding Guides
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Port forwarding menu paths vary significantly between router manufacturers. Use the correct path for your device:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h3 className="text-sm font-bold text-[var(--text-primary)]">TP-Link (TL-WR / Archer / Deco)</h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Log into <code>192.168.0.1</code> or <code>tplinkwifi.net</code>. Navigate to <strong>Advanced &gt; NAT Forwarding &gt; Virtual Servers</strong>. Click <strong>Add</strong>. Enter the external port, internal IP (your console's static IP), internal port, and protocol. Enable UPnP at <strong>Advanced &gt; NAT Forwarding &gt; UPnP</strong>.
              </p>
            </div>
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h3 className="text-sm font-bold text-[var(--text-primary)]">ASUS (RT / ROG / ZenWiFi)</h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Log into <code>router.asus.com</code> or <code>192.168.1.1</code>. Navigate to <strong>WAN &gt; Port Forwarding</strong>. Set <strong>Enable Port Forwarding</strong> to Yes. Add rules with Service Name, Port Range, Local IP, and Local Port. Enable UPnP via <strong>WAN &gt; Basic Config &gt; Enable UPnP</strong>.
              </p>
            </div>
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h3 className="text-sm font-bold text-[var(--text-primary)]">Netgear (Nighthawk / Orbi)</h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Log into <code>routerlogin.net</code> or <code>192.168.1.1</code>. Navigate to <strong>ADVANCED &gt; Advanced Setup &gt; Port Forwarding / Port Triggering</strong>. Select <strong>Port Forwarding</strong>, click <strong>Add Custom Service</strong>. Enter the port range, protocol, and internal IP. Enable UPnP via <strong>ADVANCED &gt; Advanced Setup &gt; UPnP</strong>.
              </p>
            </div>
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h3 className="text-sm font-bold text-[var(--text-primary)]">Linksys (WRT / Velop)</h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Log into <code>192.168.1.1</code> or <code>linksyssmartwifi.com</code>. Navigate to <strong>Smart Wi-Fi Tools &gt; Apps &amp; Gaming &gt; Single Port Forwarding</strong> or <strong>Port Range Forwarding</strong>. Enter Application name, External Start/End Port, Protocol, Device IP. Enable UPnP via <strong>Smart Wi-Fi Settings &gt; UPnP</strong>.
              </p>
            </div>
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h3 className="text-sm font-bold text-[var(--text-primary)]">Huawei (HG / WS / AX)</h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Log into <code>192.168.3.1</code> or <code>192.168.100.1</code>. Navigate to <strong>Advanced &gt; NAT &gt; Port Mapping</strong>. Click <strong>New Port Mapping Rule</strong>. Select the WAN connection, enter External Port, Internal Host IP, Internal Port, and Protocol. Enable UPnP under <strong>Advanced &gt; UPnP</strong>.
              </p>
            </div>
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h3 className="text-sm font-bold text-[var(--text-primary)]">ZTE (H / MF series)</h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Log into <code>192.168.1.1</code>. Navigate to <strong>Forward Rules &gt; Port Mapping</strong>. Click <strong>New</strong>. Enter the Name, WAN Connection, Protocol (TCP/UDP/Both), External Port Range, Internal Server IP, and Internal Port Range. Save and reboot. Enable UPnP via <strong>Advanced Setup &gt; UPnP</strong>.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 8: Gaming Console Ports Reference */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Gamepad2 size={18} className="text-cyan-400" />
            8. Gaming Console & PC Port Forwarding Reference Table
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Forward these exact ports to your gaming device's static IP address to achieve Open or Moderate NAT:
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-xs text-[var(--text-secondary)]">
              <thead>
                <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                  <th className="px-4 py-3 text-left">Platform</th>
                  <th className="px-4 py-3 text-left">Service</th>
                  <th className="px-4 py-3 text-left">Protocol</th>
                  <th className="px-4 py-3 text-left">Port(s)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)] bg-[var(--bg-surface)]/20">
                <tr>
                  <td className="px-4 py-3 font-semibold text-green-400">Xbox Series X/S & One</td>
                  <td className="px-4 py-3">Xbox Live — Primary</td>
                  <td className="px-4 py-3 font-mono">TCP + UDP</td>
                  <td className="px-4 py-3 font-mono">3074</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-green-400">Xbox Series X/S & One</td>
                  <td className="px-4 py-3">Kerberos Auth</td>
                  <td className="px-4 py-3 font-mono">UDP</td>
                  <td className="px-4 py-3 font-mono">88</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-green-400">Xbox Series X/S & One</td>
                  <td className="px-4 py-3">IPsec / Teredo</td>
                  <td className="px-4 py-3 font-mono">UDP</td>
                  <td className="px-4 py-3 font-mono">500, 3544, 4500</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-blue-400">PlayStation 5 & PS4</td>
                  <td className="px-4 py-3">PSN — HTTPS</td>
                  <td className="px-4 py-3 font-mono">TCP</td>
                  <td className="px-4 py-3 font-mono">80, 443, 3478, 3479, 3480</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-blue-400">PlayStation 5 & PS4</td>
                  <td className="px-4 py-3">PSN — Game Data</td>
                  <td className="px-4 py-3 font-mono">UDP</td>
                  <td className="px-4 py-3 font-mono">3478, 3479</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-purple-400">Nintendo Switch</td>
                  <td className="px-4 py-3">Nintendo Network</td>
                  <td className="px-4 py-3 font-mono">TCP</td>
                  <td className="px-4 py-3 font-mono">6667, 12400, 28910, 29900, 29901, 29920</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-purple-400">Nintendo Switch</td>
                  <td className="px-4 py-3">Nintendo Online</td>
                  <td className="px-4 py-3 font-mono">UDP</td>
                  <td className="px-4 py-3 font-mono">1-65535</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-yellow-400">PC Steam</td>
                  <td className="px-4 py-3">Steam P2P Gaming</td>
                  <td className="px-4 py-3 font-mono">UDP</td>
                  <td className="px-4 py-3 font-mono">27000-27036</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-yellow-400">PC Steam</td>
                  <td className="px-4 py-3">Steam Game Traffic</td>
                  <td className="px-4 py-3 font-mono">TCP</td>
                  <td className="px-4 py-3 font-mono">27015-27030, 27036-27037</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 9: Double NAT — Link Back */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <ShieldAlert size={18} className="text-cyan-400" />
            9. Double NAT — The Hidden Cause of Permanent Strict NAT
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            If your port forwarding rules and UPnP settings appear correct but your console continues to report Strict NAT, <strong>Double NAT is almost certainly the culprit</strong>. Double NAT occurs when two routing devices are performing address translation in series — typically an ISP modem/router combo plus your personal router.
          </p>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            To detect Double NAT, check your router's WAN IP address. If it is a private IP (starts with <code>192.168.</code>, <code>10.</code>, or <code>172.16-31.</code>), your router is receiving its IP from another upstream router, confirming Double NAT. Your console's NAT fix requests are only reaching your personal router — the outer ISP gateway is still blocking all inbound game traffic.
          </p>
          <div className="p-4 border border-amber-900/30 bg-amber-900/5 rounded-xl flex items-start gap-3">
            <AlertTriangle size={18} className="text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-xs font-semibold text-[var(--text-primary)]">Fix Double NAT First</h4>
              <p className="text-[10px] text-[var(--text-secondary)] leading-relaxed">
                No port forwarding rule will resolve Strict NAT if Double NAT is present. Enable Bridge Mode on your ISP gateway or set your personal router to Access Point (AP) Mode before attempting port forwarding. See our{" "}
                <Link href="/double-nat-detected" className="text-[var(--brand-400)] hover:underline">
                  Double NAT Detected fix guide
                </Link>{" "}
                for step-by-step instructions for every major ISP gateway and router brand.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 10: CGNAT */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Globe size={18} className="text-cyan-400" />
            10. CGNAT — When Strict NAT Is Your ISP's Fault
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            <strong>Carrier-Grade NAT (CGNAT)</strong> is deployed by ISPs to conserve public IPv4 addresses by sharing a single IP across hundreds or thousands of customers. Under CGNAT, your router's WAN interface is assigned a private IP in the <strong>100.64.0.0/10 range</strong> (RFC 6598 Shared Address Space). This range was specifically designated by IANA for ISP CGNAT infrastructure.
          </p>
          <div className="p-5 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl font-mono text-xs text-[var(--text-muted)] space-y-3">
            <h4 className="text-xs font-bold text-[var(--text-primary)] font-sans">How to Detect CGNAT:</h4>
            <div className="space-y-2">
              <div>
                <strong>Step 1:</strong> Log into your router admin panel.
              </div>
              <div>
                <strong>Step 2:</strong> Check the WAN Status / Internet page for the WAN IP address.
              </div>
              <div>
                <strong>Step 3:</strong> If the WAN IP is in any of these ranges, CGNAT is confirmed:
              </div>
              <ul className="pl-4 space-y-1">
                <li className="text-red-400">→ 100.64.0.0 to 100.127.255.255 (RFC 6598 CGNAT range)</li>
                <li className="text-yellow-400">→ 10.0.0.0 to 10.255.255.255 (RFC 1918 — also used by some ISPs)</li>
              </ul>
              <div>
                <strong>Alternative:</strong> Run <code className="bg-[var(--bg-surface)] px-1 rounded">curl ifconfig.me</code> in terminal and compare with your router's WAN IP. If they differ, CGNAT is active.
              </div>
            </div>
          </div>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            CGNAT cannot be resolved through router configuration. Your only options are:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-xs md:text-sm text-[var(--text-muted)]">
            <li><strong>Request a public static IP from your ISP</strong> — often available as a business upgrade or paid add-on.</li>
            <li><strong>Use a gaming VPN with port forwarding</strong> — services like Mullvad, ProtonVPN, or AirVPN offer dedicated IPs with port forwarding, bypassing CGNAT entirely.</li>
            <li><strong>Use Tailscale or WireGuard tunnels</strong> — create a virtual network overlay that bypasses NAT entirely using outbound-only tunnels.</li>
            <li><strong>Switch ISP</strong> — if CGNAT removal is refused or too expensive, consider an ISP that provides real public IPs on residential plans.</li>
          </ul>
        </section>

        {/* SECTION 11: SIP ALG */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Terminal size={18} className="text-cyan-400" />
            11. SIP ALG — The Router Feature That Silently Breaks NAT Rules
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            <strong>SIP ALG (Application Layer Gateway)</strong> is a router feature designed to help VoIP (Voice over IP) traffic traverse NAT. However, it is notorious for intercepting and corrupting UDP packets — including game data packets — that it incorrectly identifies as SIP signaling traffic. SIP ALG can randomly break port forwarding rules, corrupt UPnP maps, and cause intermittent NAT Type fluctuations.
          </p>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            <strong>Always disable SIP ALG</strong> on any router used for gaming. Find it under:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-xs md:text-sm text-[var(--text-muted)]">
            <li><strong>TP-Link:</strong> Advanced &gt; NAT Forwarding &gt; ALG — Disable SIP.</li>
            <li><strong>ASUS:</strong> WAN &gt; NAT Passthrough — Set SIP Passthrough to Disabled.</li>
            <li><strong>Netgear:</strong> ADVANCED &gt; Security &gt; WAN Setup — Disable SIP ALG.</li>
            <li><strong>Linksys:</strong> Security &gt; Apps and Gaming — uncheck SIP.</li>
            <li><strong>Huawei:</strong> Advanced &gt; NAT &gt; ALG Settings — disable SIP ALG.</li>
          </ul>
        </section>

        {/* SECTION 12: DMZ Configuration */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <HardDrive size={18} className="text-cyan-400" />
            12. DMZ Configuration — When Port Forwarding Is Not Enough
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            The DMZ (Demilitarized Zone) is a special router feature that forwards all incoming traffic on every port directly to a single designated internal host, bypassing all NAT and firewall rules. It is the nuclear option for achieving Open NAT and is appropriate when manual port forwarding fails or when a game requires unpredictable dynamic ports.
          </p>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            To configure DMZ:
          </p>
          <ol className="list-decimal pl-6 space-y-3 text-xs md:text-sm text-[var(--text-muted)]">
            <li>Assign your gaming console a static IP (e.g., <code>192.168.1.200</code>) via DHCP reservation in your router's LAN settings.</li>
            <li>Log into your router's admin panel. Navigate to:
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li><strong>TP-Link:</strong> Advanced &gt; NAT Forwarding &gt; DMZ</li>
                <li><strong>ASUS:</strong> WAN &gt; DMZ</li>
                <li><strong>Netgear:</strong> ADVANCED &gt; WAN Setup &gt; Default DMZ Server</li>
                <li><strong>Linksys:</strong> Security &gt; DMZ</li>
              </ul>
            </li>
            <li>Enable DMZ and enter your console's static IP address as the DMZ host.</li>
            <li>Save and reboot the router. Run a network test on your console — NAT should now show as Open.</li>
          </ol>
          <div className="p-4 border border-cyan-900/30 bg-cyan-900/5 rounded-xl flex items-start gap-3">
            <CheckCircle2 size={18} className="text-cyan-400 shrink-0 mt-0.5" />
            <p className="text-[10px] text-[var(--text-secondary)] leading-relaxed">
              <strong>DMZ vs Port Forwarding:</strong> DMZ opens every port on the console, while port forwarding opens only specific ports. DMZ is more effective at resolving Strict NAT but requires that your console has a static IP to prevent DHCP from reassigning the DMZ to a different device.
            </p>
          </div>
        </section>

        {/* SECTION 13: OS-Specific Network Diagnostics */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Activity size={18} className="text-cyan-400" />
            13. Advanced Diagnostics: Verify Open Ports from Terminal
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            After configuring port forwarding or DMZ, verify that the ports are actually reachable from the internet using these diagnostic commands:
          </p>

          <h3 className="text-xs font-bold text-[var(--text-primary)]">Windows — Test if a specific port is listening locally:</h3>
          <pre className="p-4 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl font-mono text-xs text-green-400 overflow-x-auto">
{`# Check if port 3074 is listening (run as Administrator)
netstat -ano | findstr :3074

# Use PowerShell to test TCP connectivity to a remote host on port 3074
Test-NetConnection -ComputerName "your-game-server.com" -Port 3074

# Check your public IP from PowerShell
(Invoke-WebRequest -Uri "https://api.ipify.org").Content`}
          </pre>

          <h3 className="text-xs font-bold text-[var(--text-primary)]">Linux — Verify NAT and open ports:</h3>
          <pre className="p-4 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl font-mono text-xs text-green-400 overflow-x-auto">
{`# Check active internet connections and listening ports
ss -tulnp

# Test UDP port reachability (requires nmap)
nmap -sU -p 3478 <your-public-ip>

# Inspect current NAT conntrack table entries
cat /proc/net/nf_conntrack | grep 3074

# Trace route to verify hop count and routing
mtr --report --report-cycles 10 8.8.8.8`}
          </pre>

          <h3 className="text-xs font-bold text-[var(--text-primary)]">External Port Verification:</h3>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Use our{" "}
            <Link href="/port-checker" className="text-[var(--brand-400)] hover:underline">
              Port Checker tool
            </Link>{" "}
            to verify that your forwarded ports are open and reachable from the external internet. If the port shows as closed after configuration, double-check that your console's IP matches the forwarding rule and that your ISP is not blocking the port at the carrier level.
          </p>
        </section>

        {/* SECTION 14: Windows & Console Network Optimizations */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Cpu size={18} className="text-cyan-400" />
            14. Windows Network Stack Optimizations for Gaming
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            After resolving NAT, apply these Windows registry and network stack optimizations to reduce connection latency and improve port forwarding responsiveness:
          </p>
          <pre className="p-4 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl font-mono text-xs text-green-400 overflow-x-auto">
{`# Run as Administrator in PowerShell

# Disable Nagle's Algorithm (reduces TCP buffering latency)
Set-ItemProperty -Path "HKLM:\\SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters\\Interfaces\\*" -Name "TcpAckFrequency" -Value 1 -Type DWord

# Disable Windows Auto-Tuning (can interfere with low-latency UDP gaming)
netsh interface tcp set global autotuninglevel=disabled

# Set DNS to gaming-optimized resolvers (Cloudflare)
Set-DnsClientServerAddress -InterfaceAlias "Ethernet" -ServerAddresses ("1.1.1.1","1.0.0.1")

# Flush DNS resolver cache
Clear-DnsClientCache

# Disable TCP Timestamps (reduces packet overhead)
netsh interface tcp set global timestamps=disabled

# Check current TCP settings
netsh interface tcp show global`}
          </pre>
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            For DNS optimization, see our{" "}
            <Link href="/best-dns-for-gaming" className="text-[var(--brand-400)] hover:underline">
              Best DNS for Gaming guide
            </Link>{" "}
            for resolver benchmark results across major game regions.
          </p>
        </section>

        {/* SECTION 15: Console-Specific NAT Steps */}
        <section className="space-y-6">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Gamepad2 size={18} className="text-cyan-400" />
            15. Console-Specific NAT Fix Workflows
          </h2>

          <div className="space-y-4">
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl space-y-3">
              <h3 className="text-sm font-bold text-green-400">Xbox Series X/S & Xbox One</h3>
              <ol className="list-decimal pl-5 space-y-2 text-xs text-[var(--text-muted)]">
                <li>Go to <strong>Settings &gt; General &gt; Network Settings &gt; Test NAT Type</strong>. Note the current NAT Type (Strict, Moderate, or Open).</li>
                <li>Go to <strong>Settings &gt; General &gt; Network Settings &gt; Advanced Settings &gt; IP Settings</strong>. Switch to Manual and enter your static IP, subnet mask, and gateway (router IP).</li>
                <li>Enable UPnP on your router. Reboot the Xbox and re-test NAT.</li>
                <li>If still Strict, create port forwarding rules: TCP/UDP 3074, UDP 88, 500, 3544, 4500 pointing to the Xbox's static IP.</li>
                <li>If Double NAT is present, configure Bridge Mode or AP Mode first. See{" "}
                  <Link href="/double-nat-detected" className="text-[var(--brand-400)] hover:underline">Double NAT guide</Link>.
                </li>
              </ol>
            </div>

            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl space-y-3">
              <h3 className="text-sm font-bold text-blue-400">PlayStation 5 & PlayStation 4</h3>
              <ol className="list-decimal pl-5 space-y-2 text-xs text-[var(--text-muted)]">
                <li>Go to <strong>Settings &gt; Network &gt; Connection Status &gt; Test Internet Connection</strong>. Check the NAT Type result (Type 1, 2, or 3).</li>
                <li>Go to <strong>Settings &gt; Network &gt; Set Up Internet Connection</strong>. Use LAN Cable or Wi-Fi. Choose Custom. Set IP Address to Manual, enter static IP, subnet <code>255.255.255.0</code>, gateway (router IP), and DNS (1.1.1.1 / 8.8.8.8).</li>
                <li>Enable UPnP on your router. Reboot PS5 and retest NAT.</li>
                <li>If still Type 3, forward TCP 80, 443, 3478, 3479, 3480 and UDP 3478, 3479 to the PS5's static IP.</li>
                <li>For PS5 Remote Play, also forward UDP 9296, 9297, 9302.</li>
              </ol>
            </div>

            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl space-y-3">
              <h3 className="text-sm font-bold text-purple-400">Nintendo Switch</h3>
              <ol className="list-decimal pl-5 space-y-2 text-xs text-[var(--text-muted)]">
                <li>Go to <strong>System Settings &gt; Internet &gt; Test Connection</strong>. Check if NAT type is A (best), B, C, D, or F (worst).</li>
                <li>Assign Switch a static IP via DHCP reservation on your router.</li>
                <li>Forward UDP 1-65535 to the Switch IP (Nintendo requires a wide range for online play).</li>
                <li>Alternatively, enable UPnP and place the Switch in the DMZ for the easiest Type A NAT achievement.</li>
              </ol>
            </div>
          </div>
        </section>

        {/* SECTION 16: When NAT Cannot Be Fixed */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Globe size={18} className="text-emerald-400" />
            16. When Strict NAT Cannot Be Fixed: Tunnel Alternatives
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            If your ISP enforces CGNAT and refuses to provide a public IP, or if you are in a network environment with locked-down firewall policies (university, apartment, hotel), you cannot fix Strict NAT through conventional means. Use these tunneling alternatives:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-5 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h4 className="font-bold text-[var(--text-primary)]">Tailscale</h4>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                Creates an encrypted peer-to-peer WireGuard mesh network. Your devices communicate using virtual Tailscale IPs (100.x.x.x range), bypassing your ISP's NAT entirely. Free for up to 100 devices. Best for connecting personal gaming servers, NAS, and remote PCs across CGNAT networks.
              </p>
            </div>
            <div className="p-5 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h4 className="font-bold text-[var(--text-primary)]">Gaming VPN with Port Forwarding</h4>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                Services like Mullvad, AirVPN, or ProtonVPN offer dedicated IP addresses with custom port forwarding. Your gaming console routes through the VPN endpoint's public IP, which has open ports configured. This bypasses CGNAT while maintaining your geographic game server proximity.
              </p>
            </div>
            <div className="p-5 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h4 className="font-bold text-[var(--text-primary)]">IPv6 Gaming</h4>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                IPv6 eliminates NAT entirely. Every device receives a globally unique public IPv6 address. If your ISP provides IPv6 (most modern ISPs do), enabling IPv6 on your console and router can achieve NAT-free Open connections for games that support IPv6. Check router settings for IPv6 / DHCPv6 configuration.
              </p>
            </div>
          </div>
        </section>

        {/* Internal Linking Section */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)]">
            Related NAT & Gaming Guides
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              {
                href: "/double-nat-detected",
                title: "Double NAT Detected Fix",
                desc: "Resolve cascaded router translation blocking all inbound P2P connections.",
              },
              {
                href: "/port-forwarding-not-working",
                title: "Port Forwarding Not Working",
                desc: "Fix UPnP conflicts, CGNAT restrictions, and port mapping failures.",
              },
              {
                href: "/high-ping-fix",
                title: "High Ping Fix Guide",
                desc: "Diagnose and eliminate bufferbloat, routing issues, and game server latency.",
              },
              {
                href: "/best-router-settings-for-gaming",
                title: "Best Router Settings for Gaming",
                desc: "QoS, MTU optimization, and band steering for competitive gaming.",
              },
              {
                href: "/nat-type-checker",
                title: "NAT Type Checker Tool",
                desc: "Live tool to identify your current NAT filtering type and open ports.",
              },
              {
                href: "/port-checker",
                title: "Port Checker Tool",
                desc: "Verify your forwarded ports are open and reachable from the internet.",
              },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="glass-card p-4 border border-[var(--border-subtle)] rounded-xl hover:border-[var(--brand-800)] transition-all duration-200 group"
              >
                <h3 className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--brand-400)] transition-colors">
                  {link.title}
                </h3>
                <p className="text-[11px] text-[var(--text-muted)] mt-1 leading-relaxed">
                  {link.desc}
                </p>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </TroubleshootingArticleShell>
  );
}
