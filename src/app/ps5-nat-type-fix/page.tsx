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
  Gamepad2,
  AlertTriangle,
  CheckCircle2,
  Wifi,
} from "lucide-react";

// =============================================================
// Premium SEO Metadata
// =============================================================

export const metadata: Metadata = buildMetadata({
  title: "PS5 NAT Type Fix: Change NAT Type 3 to Type 2 (Open) | RouterVia",
  description:
    "Fix PS5 NAT Type 3 (Strict) to NAT Type 2 (Moderate/Open). Step-by-step guide covering UPnP, port forwarding, DMZ, Double NAT, and CGNAT for all router brands. Resolve PS5 NAT Type Failed errors.",
  canonical: "/ps5-nat-type-fix",
  keywords: [
    "ps5 nat type fix",
    "fix nat type 3 ps5",
    "ps5 nat type failed",
    "playstation 5 nat type 2",
    "ps5 open nat",
    "how to change nat type on ps5",
    "ps5 port forwarding",
    "ps5 upnp",
    "ps5 nat type strict",
    "psn port forwarding",
    "ps5 voice chat not working",
    "ps5 multiplayer not working",
    "ps5 dmz",
    "ps5 nat type 1",
  ],
});

// =============================================================
// Breadcrumbs
// =============================================================

const breadcrumbs = [
  { name: "Gaming Tools", url: "/nat-type-checker" },
  { name: "PS5 NAT Type Fix", url: "/ps5-nat-type-fix" },
];

// =============================================================
// Troubleshooting Steps
// =============================================================

const troubleshootingSteps = [
  {
    title: "Run the PS5 Network Test and Record Your NAT Type",
    description:
      "From the PS5 home screen, go to Settings > Network > Connection Status > Test Internet Connection. Wait for the diagnostic to complete. Record the NAT Type shown (Type 1, 2, or 3) and any error message such as 'NAT Type Failed'. This baseline reading tells you exactly how severe the restriction is before making any changes. Also note your PS5's current IP address shown on the Connection Status page — you will need it for DHCP reservation.",
    tip: "Run this test every time you make a configuration change so you can measure improvement. The NAT type displayed here reflects your router's current state, not a cached value.",
  },
  {
    title: "Assign Your PS5 a Static IP via DHCP Reservation",
    description:
      "Before creating any port forwarding rules, you must lock your PS5 to a fixed private IP address. Log into your router admin panel and navigate to LAN > DHCP Server > Address Reservation (TP-Link), LAN > DHCP Server > Manually Assigned IP (ASUS), or LAN Setup > Address Reservation (Netgear). Add a new reservation using your PS5's MAC address (found at Settings > System > System Information on the PS5) and assign an IP outside the DHCP pool — for example, 192.168.1.200. This ensures your port forwarding rules always point to the correct device.",
    tip: "DHCP reservation is safer than setting a static IP manually on the PS5 itself, because the router still manages the lease and subnet configuration centrally.",
  },
  {
    title: "Enable UPnP on Your Router",
    description:
      "Log into your router admin panel. Navigate to Advanced > NAT Forwarding > UPnP (TP-Link), WAN > Basic Config > Enable UPnP (ASUS), ADVANCED > Advanced Setup > UPnP (Netgear), or Advanced > UPnP (Huawei). Enable UPnP and save the configuration. Restart your router. Then restart your PS5 and run Settings > Network > Test Internet Connection again. UPnP allows the PS5 to automatically negotiate port mappings with the router, which is sufficient to achieve NAT Type 2 on most home networks.",
    tip: "If two PlayStation consoles share your network and both request the same UPnP port (3478), only the first gets it. The second will remain Type 3. In this case, disable UPnP and use manual port forwarding with different port assignments for each console.",
  },
  {
    title: "Configure Manual Port Forwarding Rules for PSN",
    description:
      "If UPnP does not change your NAT type, create manual port forwarding rules in your router admin panel. Navigate to the port forwarding section (Virtual Servers on TP-Link, Port Forwarding on ASUS, Port Forwarding/Port Triggering on Netgear). Add the following rules, all pointing to your PS5's static IP: TCP ports 80, 443, 3478, 3479, 3480 and UDP ports 3478, 3479. Save the rules and run the PS5 network test again. NAT Type should change to Type 2.",
    tip: "Always set the protocol correctly — TCP ports and UDP ports are different rules. A rule configured as TCP only will not pass UDP game traffic, leaving NAT partially open.",
  },
];

// =============================================================
// FAQ Data
// =============================================================

const faqs = [
  {
    question: "What does PS5 NAT Type 3 (Strict) mean?",
    answer:
      "NAT Type 3 on PS5 means your router's firewall is blocking inbound UDP and TCP connections on the ports used by PlayStation Network. The PS5 can connect to PSN servers for downloads and account management, but cannot establish direct peer-to-peer connections with other players. This prevents you from joining friends' parties, hosting multiplayer sessions, and using Party Chat reliably.",
  },
  {
    question: "What is the difference between PS5 NAT Type 1, 2, and 3?",
    answer:
      "NAT Type 1 (Open) means your PS5 has a direct connection to the internet without any router performing NAT — typically by connecting directly to a modem. NAT Type 2 (Moderate) means your PS5 is behind a router but the required PSN ports are open via UPnP or port forwarding. This is the ideal state for gaming. NAT Type 3 (Strict) means your router is blocking inbound ports, severely limiting peer-to-peer connections and multiplayer functionality.",
  },
  {
    question: "What does 'PS5 NAT Type Failed' mean?",
    answer:
      "The 'NAT Type Failed' error on PS5 means the console successfully connected to the internet but could not complete the STUN (Session Traversal Utilities for NAT) handshake used to determine NAT type. This is almost always caused by Double NAT (two routers in series), an overly aggressive firewall blocking UDP on port 3478, or CGNAT at the ISP level. Check your router's WAN IP — if it is a private address (192.168.x.x, 10.x.x.x, or 100.64.x.x), your network has Double NAT or CGNAT.",
  },
  {
    question: "What ports do I need to forward for PS5 to get NAT Type 2?",
    answer:
      "For PlayStation Network on PS5, forward the following ports to your PS5's static IP: TCP 80, TCP 443, TCP 3478, TCP 3479, TCP 3480, UDP 3478, UDP 3479. For PS5 Remote Play, also forward UDP 9296, UDP 9297, UDP 9302. After creating the rules, run Settings > Network > Test Internet Connection on your PS5 to confirm NAT Type 2.",
  },
  {
    question: "Is it safe to put my PS5 in the DMZ?",
    answer:
      "Yes, placing a PS5 in the DMZ is safe in practice. The PS5 runs a closed operating system that does not expose vulnerable services like SMB file sharing, RDP, or web servers. The PS5's network stack only responds to traffic from PSN authentication servers and known game services. Keep your PS5 firmware updated while using DMZ. Never place a Windows PC or NAS in the DMZ without a software firewall.",
  },
  {
    question: "Can I get PS5 NAT Type 1 through my router?",
    answer:
      "No. NAT Type 1 requires your PS5 to have a direct public IP address with no router performing network address translation. This is only possible by connecting the PS5 directly to a standalone modem (not a modem-router combo). Since this removes all router-level firewall protection for your other devices, NAT Type 2 is the practical target for all home setups. NAT Type 2 provides identical multiplayer connectivity to Type 1.",
  },
  {
    question: "Why does PS5 Party Chat keep disconnecting even with NAT Type 2?",
    answer:
      "If your PS5 shows NAT Type 2 but Party Chat still disconnects, the issue is likely with another player in the lobby — if they have NAT Type 3, the P2P audio channel cannot be established from their side. Other causes include: SIP ALG enabled on your router (corrupting UDP audio packets), ISP-level deep packet inspection filtering VoIP-like UDP streams, or Wi-Fi interference causing packet loss on the audio stream. Disable SIP ALG in your router's Firewall or ALG settings and verify all party members' NAT types.",
  },
  {
    question: "Does Double NAT cause PS5 NAT Type 3?",
    answer:
      "Yes. Double NAT is one of the most common causes of permanent NAT Type 3 on PS5. When two routers are active on your network (typically an ISP modem-router combo plus your personal router), port forwarding rules on your personal router are ignored because the ISP gateway blocks all inbound traffic first. You must enable Bridge Mode on the ISP gateway or set your personal router to Access Point (AP) Mode to eliminate the second NAT layer before port forwarding will work.",
  },
  {
    question: "Can CGNAT prevent me from fixing PS5 NAT Type 3?",
    answer:
      "Yes. If your ISP uses Carrier-Grade NAT (CGNAT), your router's WAN IP will be in the 100.64.0.0 to 100.127.255.255 range. Under CGNAT, you share a public IP with hundreds of other customers and cannot receive unsolicited inbound connections. No router setting — UPnP, port forwarding, or DMZ — can fix NAT Type 3 under CGNAT. Contact your ISP and request a dedicated public IP address.",
  },
  {
    question: "Will using a VPN fix PS5 NAT Type 3?",
    answer:
      "A gaming VPN with port forwarding (such as Mullvad, AirVPN, or ProtonVPN) can bypass CGNAT and provide Open NAT, but only if the VPN runs on your router or uses a dedicated PS5 VPN configuration. Most VPN services use Symmetric NAT at their endpoints, which is actually worse than Strict NAT for gaming. If you use a VPN, verify it supports port forwarding and uses a dedicated IP — otherwise the VPN will worsen your NAT situation.",
  },
];

// =============================================================
// Common Causes
// =============================================================

const commonCauses = [
  {
    title: "UPnP Disabled or Conflicting",
    desc: "UPnP is off or another device has claimed the same PSN ports, leaving the PS5 unable to register dynamic port mappings.",
  },
  {
    title: "Double NAT — ISP Gateway + Personal Router",
    desc: "Two NAT devices in series — ISP modem-router combo and personal router — block all inbound PSN traffic before it reaches the PS5.",
  },
  {
    title: "CGNAT — No Public IP Assigned",
    desc: "ISP assigns a shared private WAN IP (100.64.x.x range). No port forwarding is possible without a dedicated public IP.",
  },
  {
    title: "SIP ALG Corrupting PSN UDP Packets",
    desc: "Router's SIP Application Layer Gateway intercepts PSN UDP traffic on port 3478, rewriting and corrupting the STUN handshake.",
  },
  {
    title: "Dynamic DHCP IP — Stale Port Rules",
    desc: "PS5 received a new DHCP lease, making port forwarding rules point to a different device's IP address silently.",
  },
  {
    title: "Firewall Blocking PSN STUN Port 3478",
    desc: "Router firewall explicitly blocking UDP 3478, preventing the PS5 from completing the NAT type determination handshake.",
  },
];

// =============================================================
// Quick Fix Checklist
// =============================================================

const quickFixChecklist = [
  "Run Settings > Network > Test Internet Connection and note the current NAT Type and any error.",
  "Check router WAN IP — if private (192.168.x.x / 10.x.x.x / 100.64.x.x), fix Double NAT or CGNAT first.",
  "Enable UPnP in router admin panel. Reboot router and PS5. Retest NAT.",
  "Assign PS5 a static IP via DHCP reservation using its MAC address.",
  "Forward TCP 80, 443, 3478-3480 and UDP 3478-3479 to PS5's static IP.",
  "Disable SIP ALG under Firewall/ALG settings on your router.",
  "If still Type 3 — place PS5 static IP in the router's DMZ for Open NAT.",
  "If WAN IP is 100.64.x.x — contact ISP to remove CGNAT or request public IP.",
];

// =============================================================
// Page Component
// =============================================================

export default function Ps5NatTypeFixPage() {
  return (
    <TroubleshootingArticleShell
      h1="PS5 NAT Type Fix: How to Change NAT Type 3 to Type 2 (Open)"
      intro="PS5 NAT Type 3 (Strict) blocks party invitations, disables voice chat, forces multiplayer through slow relay servers, and prevents you from hosting online sessions. This expert guide explains exactly why PS5 shows NAT Type 3 or the 'NAT Type Failed' error, and walks you through every fix — from enabling UPnP and configuring PSN port forwarding, to resolving Double NAT, bypassing CGNAT, and using DMZ — for all major router brands."
      category="nat"
      breadcrumbs={breadcrumbs}
      faqs={faqs}
      troubleshootingSteps={troubleshootingSteps}
      warningBanner={{
        title: "NAT Type Failed? Check for CGNAT First",
        text: "If your PS5 shows 'NAT Type Failed' (not just Type 3), check your router's WAN IP immediately. If it starts with 100.64.x.x, your ISP is using Carrier-Grade NAT and no router setting will fix this. You must contact your ISP to request a public IP address before any other step.",
      }}
      quickFixChecklist={quickFixChecklist}
      commonCauses={commonCauses}
      whenToContactISP="Contact your ISP if your router WAN IP is in the 100.64.0.0/10 CGNAT range, if they provide a locked gateway that cannot be put in Bridge Mode, or if the PS5 consistently shows 'NAT Type Failed' despite correct port forwarding rules. Request a dedicated public static IP or an upgrade to a business connection."
      severityLevel="medium"
    >
      <div className="space-y-10">

        {/* SECTION 1: Quick AI Answer */}
        <section
          className="glass-card p-6 border border-blue-950/20 bg-blue-950/5 rounded-2xl relative overflow-hidden"
          aria-label="Quick AI Answer"
        >
          <div className="absolute top-0 right-0 bg-[var(--brand-500)]/10 text-[var(--brand-400)] text-[10px] font-mono uppercase tracking-wider px-3 py-1 rounded-bl-lg font-bold">
            Quick AI Response Summary
          </div>
          <h2 className="text-xs font-bold text-[var(--brand-400)] mb-3 uppercase tracking-wide">
            Fix PS5 NAT Type 3 in Under 5 Minutes
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            PS5 NAT Type 3 means your router is blocking inbound PlayStation Network ports. The fastest fix: log into your router and enable <strong>UPnP</strong> — this alone resolves NAT Type 3 for most setups. If UPnP fails, assign your PS5 a <strong>static IP</strong> and manually forward <strong>TCP 3478-3480 and UDP 3478-3479</strong>. If two routers are on your network (Double NAT), fix that first by enabling <strong>Bridge Mode</strong> on your ISP modem. If your router WAN IP starts with <strong>100.64.x.x</strong>, call your ISP — that is CGNAT and no router setting will help.
          </p>
        </section>

        {/* Interactive Tool */}
        <section aria-label="Interactive PS5 NAT Diagnostic">
          <div className="mb-4">
            <h2 className="text-base font-bold text-[var(--text-primary)]">
              Interactive PS5 NAT Diagnostic Tool
            </h2>
            <p className="text-xs text-[var(--text-muted)] mt-1">
              Analyze your router NAT configuration, detect PSN port availability, and receive a personalized PS5 fix workflow.
            </p>
          </div>
          <ConnectionOptimizerClient mode="router-admin" />
        </section>

        {/* SECTION 2: Symptoms Table */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)]">
            2. PS5 NAT Type Symptoms & Diagnosis Matrix
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Use this matrix to identify your exact PS5 NAT problem and apply the fastest fix:
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
                  <td className="px-4 py-3 font-semibold">PS5 shows NAT Type 3 on network test.</td>
                  <td className="px-4 py-3">Strict — Type 3</td>
                  <td className="px-4 py-3 text-red-500 font-bold">Critical</td>
                  <td className="px-4 py-3">Enable UPnP or forward TCP/UDP 3478-3479 to PS5 static IP.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold">PS5 shows &quot;NAT Type Failed&quot; error.</td>
                  <td className="px-4 py-3">STUN Blocked</td>
                  <td className="px-4 py-3 text-red-500 font-bold">Critical</td>
                  <td className="px-4 py-3">Check WAN IP for CGNAT (100.64.x.x). If Double NAT, enable Bridge Mode on ISP modem.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold">Cannot join friends&apos; party or lobby.</td>
                  <td className="px-4 py-3">Type 3 or Type 2 vs Type 3</td>
                  <td className="px-4 py-3 text-red-500 font-bold">Critical</td>
                  <td className="px-4 py-3">Forward PSN ports. Place PS5 in DMZ as escalation. Check friend&apos;s NAT type too.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold">Party Chat voice keeps cutting out or dropping.</td>
                  <td className="px-4 py-3">Type 3 or SIP ALG</td>
                  <td className="px-4 py-3 text-yellow-400 font-bold">High</td>
                  <td className="px-4 py-3">Disable SIP ALG in router firewall settings. Ensure UDP 3478-3479 are open.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold">PS5 Remote Play works locally but fails over internet.</td>
                  <td className="px-4 py-3">Remote Play Ports Blocked</td>
                  <td className="px-4 py-3 text-yellow-400 font-bold">Medium</td>
                  <td className="px-4 py-3">Forward UDP 9296, 9297, 9302 to PS5 static IP for Remote Play.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold">NAT Type 2 but matchmaking is slow or times out.</td>
                  <td className="px-4 py-3">Type 2 — Other Issue</td>
                  <td className="px-4 py-3 text-blue-400 font-bold">Separate Issue</td>
                  <td className="px-4 py-3">
                    Check{" "}
                    <Link href="/high-ping-fix" className="text-[var(--brand-400)] hover:underline">
                      High Ping Fix guide
                    </Link>{" "}
                    — likely bufferbloat or ISP routing issue.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 3: NAT Types Explained */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Network size={18} className="text-cyan-400" />
            3. PS5 NAT Types Explained: What Type 1, 2, and 3 Really Mean
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            PlayStation uses a three-tier NAT classification system. Unlike Xbox (which uses Open/Moderate/Strict labels), PS5 uses numbered types. Here is exactly what each means at the network level:
          </p>
          <div className="space-y-3">
            <div className="p-5 bg-[var(--bg-elevated)] border border-green-900/30 rounded-xl space-y-2">
              <h3 className="text-sm font-bold text-green-400">NAT Type 1 — Open (Direct Connection)</h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Your PS5 has a direct public IP address. No NAT translation is occurring — the PS5 is connected straight to a standalone modem with no router in between. All inbound connections are allowed on all ports. This is the most permissive state but requires no router, which removes your home network's firewall protection. <strong>Not recommended</strong> for home setups — NAT Type 2 is equally capable for gaming.
              </p>
            </div>
            <div className="p-5 bg-[var(--bg-elevated)] border border-yellow-900/30 rounded-xl space-y-2">
              <h3 className="text-sm font-bold text-yellow-400">NAT Type 2 — Moderate (Target State)</h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Your PS5 is behind a router, but the required PSN ports are open — either via UPnP dynamic mapping or static port forwarding rules. Inbound PSN connections on ports 3478-3479 are allowed. Your PS5 can connect to all other NAT Type 1 and 2 players, join any party, host lobbies, and use Party Chat without restrictions. <strong>This is the ideal target for all home networks.</strong>
              </p>
            </div>
            <div className="p-5 bg-[var(--bg-elevated)] border border-red-900/30 rounded-xl space-y-2">
              <h3 className="text-sm font-bold text-red-400">NAT Type 3 — Strict (Broken State)</h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Your router's firewall is blocking inbound UDP traffic on the PSN STUN ports (3478-3479). The PS5 can connect to PSN for downloads, trophies, and account management, but cannot establish direct peer-to-peer connections with other players. You can only connect to NAT Type 1 peers. Cannot join parties hosted by Type 2 or 3 players, cannot use Party Chat reliably, and cannot host multiplayer sessions.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: How PSN Works */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Activity size={18} className="text-cyan-400" />
            4. How PlayStation Network Uses Your NAT: The STUN Handshake
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            When your PS5 runs a network test, it performs a <strong>STUN (Session Traversal Utilities for NAT)</strong> handshake with PlayStation's STUN servers on UDP port 3478. This process works as follows:
          </p>
          <div className="p-5 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl font-mono text-xs text-[var(--text-muted)] space-y-4">
            <div className="text-cyan-400 font-bold">[PSN NAT Type Detection — STUN Handshake Flow]</div>
            <div className="space-y-2 leading-relaxed">
              <div><strong>1.</strong> PS5 sends UDP packet to PSN STUN server at 103.6.161.103:3478.</div>
              <div className="pl-4 border-l-2 border-[var(--border-subtle)]">↓ Router creates outbound conntrack entry for this socket.</div>
              <div><strong>2.</strong> PSN STUN server replies, noting the external IP:port mapping your router created.</div>
              <div className="pl-4 border-l-2 border-[var(--border-subtle)]">↓ STUN server then tries to send a packet back on a <em>different</em> source port.</div>
              <div><strong>3. Under NAT Type 2:</strong> Router accepts the reply because it matches the outbound session. <span className="text-green-400">[NAT Type 2 Confirmed]</span></div>
              <div><strong>3. Under NAT Type 3:</strong> Router blocks the STUN reply because it uses a different source port than the original outbound packet. <span className="text-red-400">[NAT Type 3 — Packet Dropped]</span></div>
              <div><strong>3. Under NAT Failed:</strong> Router blocks the initial outbound UDP 3478 packet entirely, or the STUN reply never arrives. <span className="text-red-400">[NAT Type Failed]</span></div>
            </div>
          </div>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            This explains why simply "having internet access" doesn't guarantee good NAT — the STUN test specifically probes whether your router allows unrestricted inbound UDP on the ports PSN uses for peer connections.
          </p>
        </section>

        {/* SECTION 5: Router Brand Port Forwarding Guides */}
        <section className="space-y-6">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Settings size={18} className="text-cyan-400" />
            5. Router Brand-Specific PS5 Port Forwarding Guides
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Forward these PSN ports to your PS5's static IP: <strong>TCP: 80, 443, 3478, 3479, 3480 — UDP: 3478, 3479</strong>. Find the correct menu path for your router:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h3 className="text-sm font-bold text-[var(--text-primary)]">TP-Link (Archer / AX Series)</h3>
              <ol className="list-decimal pl-4 space-y-1 text-xs text-[var(--text-muted)]">
                <li>Log into <code>192.168.0.1</code> or <code>tplinkwifi.net</code>.</li>
                <li>Go to <strong>Advanced &gt; NAT Forwarding &gt; Virtual Servers</strong>.</li>
                <li>Click <strong>Add</strong>. Enter Service Type (e.g. PSN-TCP), External Port (3478), Internal IP (PS5 static IP), Internal Port (3478), Protocol: TCP.</li>
                <li>Repeat for each port and protocol. Save all rules.</li>
              </ol>
            </div>
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h3 className="text-sm font-bold text-[var(--text-primary)]">ASUS (RT-AX / ROG / ZenWiFi)</h3>
              <ol className="list-decimal pl-4 space-y-1 text-xs text-[var(--text-muted)]">
                <li>Log into <code>router.asus.com</code> or <code>192.168.1.1</code>.</li>
                <li>Go to <strong>WAN &gt; Port Forwarding</strong>. Set Enable to <strong>Yes</strong>.</li>
                <li>Add rules: Service Name (PSN), Port Range (3478:3480), Local IP (PS5 IP), Local Port (3478), Protocol (TCP/UDP).</li>
                <li>Enable UPnP at <strong>WAN &gt; Basic Config &gt; Enable UPnP</strong>.</li>
              </ol>
            </div>
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h3 className="text-sm font-bold text-[var(--text-primary)]">Netgear (Nighthawk / Orbi)</h3>
              <ol className="list-decimal pl-4 space-y-1 text-xs text-[var(--text-muted)]">
                <li>Log into <code>routerlogin.net</code> or <code>192.168.1.1</code>.</li>
                <li>Go to <strong>ADVANCED &gt; Advanced Setup &gt; Port Forwarding</strong>.</li>
                <li>Click <strong>Add Custom Service</strong>. Enter Name (PSN), Start/End Port (3478-3480), Protocol (TCP/UDP), Internal IP (PS5 IP).</li>
                <li>Save and repeat for UDP 3478-3479.</li>
              </ol>
            </div>
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h3 className="text-sm font-bold text-[var(--text-primary)]">Huawei (HG / WS / AX)</h3>
              <ol className="list-decimal pl-4 space-y-1 text-xs text-[var(--text-muted)]">
                <li>Log into <code>192.168.3.1</code> or <code>192.168.100.1</code>.</li>
                <li>Go to <strong>Advanced &gt; NAT &gt; Port Mapping</strong>.</li>
                <li>Click <strong>New Port Mapping Rule</strong>. Set External Port (3478), Internal Host (PS5 IP), Internal Port (3478), Protocol (TCP). Repeat for each port.</li>
                <li>Enable UPnP at <strong>Advanced &gt; UPnP</strong>.</li>
              </ol>
            </div>
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h3 className="text-sm font-bold text-[var(--text-primary)]">ZTE (H / F Series)</h3>
              <ol className="list-decimal pl-4 space-y-1 text-xs text-[var(--text-muted)]">
                <li>Log into <code>192.168.1.1</code>.</li>
                <li>Go to <strong>Forward Rules &gt; Port Mapping</strong>.</li>
                <li>Click <strong>New</strong>. Enter WAN Connection, Protocol (TCP/UDP), External Port (3478), Internal Server IP (PS5 IP), Internal Port (3478).</li>
                <li>Save and enable UPnP under <strong>Advanced Setup &gt; UPnP</strong>.</li>
              </ol>
            </div>
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h3 className="text-sm font-bold text-[var(--text-primary)]">Linksys (WRT / Velop)</h3>
              <ol className="list-decimal pl-4 space-y-1 text-xs text-[var(--text-muted)]">
                <li>Log into <code>192.168.1.1</code> or the Linksys app.</li>
                <li>Go to <strong>Smart Wi-Fi Tools &gt; Apps &amp; Gaming &gt; Port Range Forwarding</strong>.</li>
                <li>Enter Application (PSN), External Start (3478), End (3480), Protocol (Both), Device IP (PS5 IP). Enable.</li>
                <li>Repeat for UDP 3478-3479.</li>
              </ol>
            </div>
          </div>
        </section>

        {/* SECTION 6: PSN Port Reference */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Gamepad2 size={18} className="text-cyan-400" />
            6. Complete PS5 Port Forwarding Reference Table
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-xs text-[var(--text-secondary)]">
              <thead>
                <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                  <th className="px-4 py-3 text-left">Service</th>
                  <th className="px-4 py-3 text-left">Protocol</th>
                  <th className="px-4 py-3 text-left">Port(s)</th>
                  <th className="px-4 py-3 text-left">Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)] bg-[var(--bg-surface)]/20">
                <tr>
                  <td className="px-4 py-3 font-semibold text-blue-400">PSN — HTTP</td>
                  <td className="px-4 py-3 font-mono">TCP</td>
                  <td className="px-4 py-3 font-mono">80</td>
                  <td className="px-4 py-3">PSN store, firmware updates, trophy sync</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-blue-400">PSN — HTTPS</td>
                  <td className="px-4 py-3 font-mono">TCP</td>
                  <td className="px-4 py-3 font-mono">443</td>
                  <td className="px-4 py-3">Encrypted PSN authentication and account management</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-blue-400">PSN — STUN/TURN</td>
                  <td className="px-4 py-3 font-mono">TCP + UDP</td>
                  <td className="px-4 py-3 font-mono">3478</td>
                  <td className="px-4 py-3">NAT type detection, P2P session negotiation</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-blue-400">PSN — STUN Alt</td>
                  <td className="px-4 py-3 font-mono">TCP + UDP</td>
                  <td className="px-4 py-3 font-mono">3479</td>
                  <td className="px-4 py-3">Alternate STUN port for NAT traversal</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-blue-400">PSN — Voice</td>
                  <td className="px-4 py-3 font-mono">TCP</td>
                  <td className="px-4 py-3 font-mono">3480</td>
                  <td className="px-4 py-3">Party Chat and voice communication</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-purple-400">Remote Play</td>
                  <td className="px-4 py-3 font-mono">UDP</td>
                  <td className="px-4 py-3 font-mono">9296, 9297</td>
                  <td className="px-4 py-3">PS5 Remote Play video/audio stream</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-purple-400">Remote Play — Control</td>
                  <td className="px-4 py-3 font-mono">UDP</td>
                  <td className="px-4 py-3 font-mono">9302</td>
                  <td className="px-4 py-3">Remote Play controller input channel</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 7: DMZ Configuration */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Shield size={18} className="text-cyan-400" />
            7. DMZ Configuration — Guaranteed Open NAT for PS5
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            If manual port forwarding fails to resolve NAT Type 3, place your PS5 in the router's DMZ (Demilitarized Zone). The DMZ forwards all inbound internet traffic to the PS5, bypassing the router's NAT and firewall entirely. This guarantees NAT Type 2 (and in some cases Type 1 if combined with Bridge Mode on the ISP modem).
          </p>
          <ol className="list-decimal pl-6 space-y-3 text-xs md:text-sm text-[var(--text-muted)]">
            <li>Assign your PS5 a static IP via DHCP reservation in your router (e.g., <code>192.168.1.200</code>).</li>
            <li>Log into your router admin panel and navigate to:
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>TP-Link:</strong> Advanced &gt; NAT Forwarding &gt; DMZ</li>
                <li><strong>ASUS:</strong> WAN &gt; DMZ</li>
                <li><strong>Netgear:</strong> ADVANCED &gt; WAN Setup &gt; Default DMZ Server</li>
                <li><strong>Linksys:</strong> Security &gt; DMZ</li>
                <li><strong>Huawei:</strong> Advanced &gt; NAT &gt; DMZ Host</li>
              </ul>
            </li>
            <li>Enable DMZ and enter your PS5's static IP address as the DMZ host.</li>
            <li>Save the configuration and reboot your router.</li>
            <li>On your PS5, run <strong>Settings &gt; Network &gt; Test Internet Connection</strong>. NAT Type should now show Type 2.</li>
          </ol>
          <div className="p-4 border border-cyan-900/30 bg-cyan-900/5 rounded-xl flex items-start gap-3">
            <CheckCircle2 size={18} className="text-cyan-400 shrink-0 mt-0.5" />
            <p className="text-[10px] text-[var(--text-secondary)] leading-relaxed">
              <strong>DMZ vs Port Forwarding:</strong> DMZ opens every port to the PS5. Port forwarding opens specific ports only. DMZ is more reliable for resolving NAT Type 3 because it eliminates all possible port-blocking scenarios. It is safe for PS5 but never use DMZ on a Windows PC or NAS device.
            </p>
          </div>
        </section>

        {/* SECTION 8: Double NAT */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <ShieldAlert size={18} className="text-cyan-400" />
            8. Double NAT — Why Your PS5 Port Forwarding Isn't Working
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            If your port forwarding rules appear correct but your PS5 still shows NAT Type 3, <strong>Double NAT is the most likely cause</strong>. Double NAT occurs when both an ISP-supplied modem-router combo and your personal router are performing network address translation simultaneously.
          </p>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            To detect Double NAT: log into your personal router and check the <strong>WAN IP address</strong> shown on the status page. If it is a private IP (starting with <code>192.168.</code>, <code>10.</code>, or <code>172.16-31.</code>), you have Double NAT. Your port forwarding rules on your personal router are useless because all inbound traffic is blocked upstream at the ISP gateway.
          </p>
          <div className="p-4 border border-amber-900/30 bg-amber-900/5 rounded-xl flex items-start gap-3">
            <AlertTriangle size={18} className="text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-semibold text-[var(--text-primary)] mb-1">Fix Double NAT First</h4>
              <p className="text-[10px] text-[var(--text-secondary)] leading-relaxed">
                Enable <strong>Bridge Mode</strong> on your ISP gateway modem (disables its NAT and passes the public IP to your personal router), or set your personal router to <strong>Access Point (AP) Mode</strong> (disables its own NAT, letting the ISP gateway handle routing). See our{" "}
                <Link href="/double-nat-detected" className="text-[var(--brand-400)] hover:underline">
                  Double NAT Detected fix guide
                </Link>{" "}
                for brand-specific steps.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 9: CGNAT */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Globe size={18} className="text-cyan-400" />
            9. CGNAT — When Your ISP Causes Permanent NAT Type 3
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Carrier-Grade NAT (CGNAT) is deployed by ISPs on mobile broadband, fixed wireless, and some fiber/cable services to share a single public IPv4 address among multiple customers. Your router's WAN port receives a private IP in the <strong>100.64.0.0/10 range</strong> (RFC 6598). Under CGNAT, all your PS5's outbound connection attempts are routed through the ISP's shared translation system, and no inbound connections are possible.
          </p>
          <div className="p-5 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl font-mono text-xs text-[var(--text-muted)] space-y-2">
            <h4 className="text-xs font-bold text-[var(--text-primary)] font-sans">CGNAT Detection:</h4>
            <div>Check your router WAN IP. If it falls in any range below — CGNAT is confirmed:</div>
            <div className="text-red-400">→ 100.64.0.0 – 100.127.255.255 (RFC 6598 — definitive CGNAT)</div>
            <div className="text-yellow-400">→ 10.0.0.0 – 10.255.255.255 (some ISPs use this for CGNAT)</div>
            <div className="mt-2">Cross-verify: run <code className="bg-[var(--bg-surface)] px-1 rounded">curl ifconfig.me</code> on a PC and compare with the router WAN IP shown in admin panel. If different — CGNAT is active.</div>
          </div>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Solutions when behind CGNAT:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-xs md:text-sm text-[var(--text-muted)]">
            <li><strong>Request a public static IP from your ISP</strong> — typically available as a paid upgrade on residential plans.</li>
            <li><strong>Use a gaming VPN with dedicated IP and port forwarding</strong> — Mullvad, AirVPN, and ProtonVPN offer this; the VPN must run on the router for PS5 to benefit.</li>
            <li><strong>Enable IPv6</strong> — if your ISP provides IPv6, your PS5 can establish direct IPv6 connections bypassing CGNAT entirely. Enable IPv6 on your router and PS5.</li>
          </ul>
        </section>

        {/* SECTION 10: SIP ALG */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Terminal size={18} className="text-cyan-400" />
            10. SIP ALG — The Hidden Cause of Party Chat Failures
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            SIP ALG (Application Layer Gateway) is a router feature that intercepts UDP packets it misidentifies as VoIP SIP signaling. PS5 Party Chat uses UDP on ports 3478-3479 — the same ports SIP commonly uses. When SIP ALG is enabled, it rewrites the payload of these packets, corrupting the STUN handshake and breaking Party Chat even when port forwarding is correctly configured.
          </p>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            <strong>Disable SIP ALG immediately</strong> on any router used with a PS5:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-xs md:text-sm text-[var(--text-muted)]">
            <li><strong>TP-Link:</strong> Advanced &gt; NAT Forwarding &gt; ALG — disable SIP ALG.</li>
            <li><strong>ASUS:</strong> WAN &gt; NAT Passthrough — set SIP Passthrough to Disabled.</li>
            <li><strong>Netgear:</strong> ADVANCED &gt; Security &gt; WAN Setup — disable SIP ALG.</li>
            <li><strong>Linksys:</strong> Security &gt; Apps and Gaming — uncheck SIP.</li>
            <li><strong>Huawei:</strong> Advanced &gt; NAT &gt; ALG Settings — disable SIP ALG.</li>
          </ul>
        </section>

        {/* SECTION 11: Step-by-Step PS5 Network Setup */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Wifi size={18} className="text-cyan-400" />
            11. Complete PS5 Network Setup for NAT Type 2
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Follow this complete step-by-step PS5 network configuration to establish optimal connection settings:
          </p>
          <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl space-y-4">
            <h3 className="text-sm font-bold text-blue-400">PS5 Manual Network Configuration</h3>
            <ol className="list-decimal pl-5 space-y-3 text-xs text-[var(--text-muted)]">
              <li>Go to <strong>Settings &gt; Network &gt; Settings &gt; Set Up Internet Connection</strong>.</li>
              <li>Select your connection type (Wi-Fi or LAN Cable). Choose your network.</li>
              <li>Press <strong>Options</strong> on your DualSense controller &gt; <strong>Advanced Settings</strong>.</li>
              <li>Set <strong>IP Address Settings</strong> to <strong>Manual</strong>.</li>
              <li>Enter:
                <ul className="list-disc pl-4 mt-1 space-y-1">
                  <li><strong>IP Address:</strong> e.g. <code>192.168.1.200</code> (outside your DHCP pool)</li>
                  <li><strong>Subnet Mask:</strong> <code>255.255.255.0</code></li>
                  <li><strong>Default Gateway:</strong> your router IP (e.g. <code>192.168.1.1</code>)</li>
                </ul>
              </li>
              <li>Set <strong>DNS Settings</strong> to <strong>Manual</strong>:
                <ul className="list-disc pl-4 mt-1 space-y-1">
                  <li><strong>Primary DNS:</strong> <code>1.1.1.1</code> (Cloudflare)</li>
                  <li><strong>Secondary DNS:</strong> <code>1.0.0.1</code></li>
                </ul>
              </li>
              <li>Set <strong>MTU Settings</strong> to <strong>Automatic</strong> (or Manual 1500 for cable/fiber, 1492 for PPPoE).</li>
              <li>Set <strong>Proxy Server</strong> to <strong>Do Not Use</strong>.</li>
              <li>Save and test the connection. Go to <strong>Settings &gt; Network &gt; Connection Status &gt; Test Internet Connection</strong>.</li>
            </ol>
          </div>
        </section>

        {/* SECTION 12: Verification */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Activity size={18} className="text-cyan-400" />
            12. Verify Your Fix: Reading the PS5 Network Test Results
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs text-[var(--text-secondary)]">
              <thead>
                <tr className="border-b border-[var(--border-subtle)] text-[var(--text-muted)] font-mono">
                  <th className="py-2.5 pr-4 font-semibold uppercase">Test Result Field</th>
                  <th className="py-2.5 px-4 font-semibold uppercase">Good Result</th>
                  <th className="py-2.5 pl-4 font-semibold uppercase">Problem if Bad</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)]">
                <tr>
                  <td className="py-3 pr-4 font-bold">Internet Connection</td>
                  <td className="py-3 px-4 text-green-400">Connected</td>
                  <td className="py-3 pl-4">Check DNS, cable, and router WAN status</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-bold">NAT Type</td>
                  <td className="py-3 px-4 text-green-400">Type 2</td>
                  <td className="py-3 pl-4">Type 3 = open PSN ports. Failed = check CGNAT/Double NAT</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-bold">PlayStation Network</td>
                  <td className="py-3 px-4 text-green-400">Reachable</td>
                  <td className="py-3 pl-4">PSN outage or ISP blocking port 443</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-bold">Download Speed</td>
                  <td className="py-3 px-4 text-green-400">Near line speed</td>
                  <td className="py-3 pl-4">QoS too restrictive or Wi-Fi interference</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-bold">Upload Speed</td>
                  <td className="py-3 px-4 text-green-400">Near line speed</td>
                  <td className="py-3 pl-4">UPnP blocking upload, or ISP throttling upload</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            Use our{" "}
            <Link href="/port-checker" className="text-[var(--brand-400)] hover:underline">Port Checker tool</Link>{" "}
            to verify that ports 3478 and 3479 are externally reachable after configuring port forwarding or DMZ.
          </p>
        </section>

        {/* Related Guides */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)]">
            Related Guides
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { href: "/nat-type-strict", title: "NAT Type Strict Fix", desc: "Full guide for Strict NAT on all platforms — UPnP, port forwarding, DMZ, CGNAT." },
              { href: "/double-nat-detected", title: "Double NAT Detected Fix", desc: "Resolve cascaded router translation blocking all inbound PSN traffic." },
              { href: "/port-forwarding-not-working", title: "Port Forwarding Not Working", desc: "Fix UPnP conflicts, CGNAT restrictions, and stale NAT table entries." },
              { href: "/high-ping-fix", title: "High Ping Fix Guide", desc: "Reduce latency, eliminate bufferbloat, and optimize QoS for gaming." },
              { href: "/best-router-settings-for-gaming", title: "Best Router Settings for Gaming", desc: "QoS, MTU, Wi-Fi band, and firewall optimization for low-latency gaming." },
              { href: "/best-dns-for-ps5", title: "Best DNS for PS5", desc: "Benchmarked DNS resolvers for fastest PSN connection and game downloads." },
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
