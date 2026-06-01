import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import TroubleshootingArticleShell from "@/components/tools/TroubleshootingArticleShell";
import ConnectionOptimizerClient from "@/components/tools/ConnectionOptimizerClient";
import {
  ShieldCheck,
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
  Zap,
} from "lucide-react";

// =============================================================
// Premium SEO Metadata
// =============================================================

export const metadata: Metadata = buildMetadata({
  title: "Xbox NAT Type Open: Fix Strict & Moderate NAT on Xbox | RouterVia",
  description:
    "Get Open NAT Type on Xbox Series X, Series S, and Xbox One. Complete guide covering UPnP, port forwarding, Double NAT, CGNAT, DMZ, and Alternate Port Selection to fix Strict and Moderate NAT on all router brands.",
  canonical: "/xbox-nat-type-open",
  keywords: [
    "xbox open nat type",
    "xbox strict nat fix",
    "xbox moderate nat fix",
    "how to get open nat on xbox",
    "xbox series x nat type",
    "xbox series s nat type",
    "xbox one port forwarding",
    "xbox live nat type strict",
    "xbox double nat detected",
    "xbox upnp not successful",
    "xbox nat type open fix",
    "xbox live port forwarding",
    "xbox alternate port selection",
    "xbox nat type open router",
  ],
});

// =============================================================
// Breadcrumbs
// =============================================================

const breadcrumbs = [
  { name: "Gaming Tools", url: "/nat-type-checker" },
  { name: "Xbox NAT Type Open", url: "/xbox-nat-type-open" },
];

// =============================================================
// Troubleshooting Steps
// =============================================================

const troubleshootingSteps = [
  {
    title: "Run the Xbox Network Diagnostic and Read Your NAT Type",
    description:
      "Press the Xbox button on your controller to open the guide. Navigate to Profile & System → Settings → General → Network Settings → Test network connection. Wait for the diagnostics to complete. Note the NAT Type displayed (Open, Moderate, or Strict) and any specific error messages — especially 'Double NAT Detected' or 'UPnP Not Successful'. These messages are critical diagnostic clues that determine which fix you need to apply.",
    tip: "Also check the 'Current Network Status' summary page — it shows packet loss percentage and latency to Xbox servers. High packet loss on top of a Strict NAT usually indicates an ISP routing issue rather than a firewall problem.",
  },
  {
    title: "Reserve a Static IP for Your Xbox via DHCP Reservation",
    description:
      "Before creating any port forwarding or DMZ rules, lock your Xbox to a permanent local IP using DHCP reservation in your router. Log into your router admin panel. On TP-Link: go to Advanced → Network → DHCP Server → Address Reservation. On ASUS: LAN → DHCP Server → Manually Assigned IP. On Netgear: Advanced → LAN Setup → Address Reservation. Add a new entry using your Xbox's MAC address — found at Settings → General → Network Settings → Advanced Settings — and assign an IP outside the DHCP range, such as 192.168.1.160. Save and reboot your router.",
    tip: "DHCP reservation is better than a manually-configured static IP on the Xbox itself. It keeps the Xbox integrated into the router's network management and avoids IP conflicts if DHCP pool boundaries change.",
  },
  {
    title: "Enable UPnP on Your Router",
    description:
      "UPnP (Universal Plug and Play) allows your Xbox to automatically register port mappings with the router on demand. Log into your router admin panel and enable UPnP: on TP-Link, go to Advanced → NAT Forwarding → UPnP; on ASUS, go to WAN → Basic Config → Enable UPnP; on Netgear, go to ADVANCED → Advanced Setup → UPnP; on Linksys, go to Security → Apps and Gaming → UPnP. Save and reboot your router, then restart your Xbox and rerun the Network Test. UPnP alone achieves Open NAT on most home networks running a single Xbox console.",
    tip: "If the Xbox still reports 'UPnP Not Successful' after enabling UPnP, the issue is usually stale port mappings from a previous session. Toggle UPnP OFF, reboot the router, toggle it back ON, and then restart the Xbox before retesting.",
  },
  {
    title: "Configure Manual Port Forwarding Rules for Xbox Live",
    description:
      "If UPnP does not achieve Open NAT, create static port forwarding rules pointing to your Xbox's reserved IP. In your router admin panel, navigate to the port forwarding section (Virtual Servers on TP-Link, Port Forwarding on ASUS, Port Forwarding/Port Triggering on Netgear). Add the following rules to your Xbox static IP: TCP port 3074; UDP ports 88, 500, 3074, 3544, 4500. Save all rules. Run the Xbox Network Test to verify NAT Type changed to Open.",
    tip: "Port 88 (UDP) is used by Kerberos authentication for Xbox Live accounts. Port 3544 (UDP) is used by Teredo IPv6-over-IPv4 tunneling. Port 4500 (UDP) is for IPSec NAT traversal. All are required for full Open NAT.",
  },
  {
    title: "Use Alternate Port Selection If NAT Remains Moderate",
    description:
      "If your NAT Type shows Moderate after enabling UPnP and port forwarding, another device on your network may have claimed port 3074. Xbox Live supports an alternate port selection feature to work around this. On your Xbox, go to Settings → General → Network Settings → Advanced Settings → Alternate Port Selection. Change from 'Automatic' to 'Manual' and select a port in the 49152–65535 range. The Xbox will use this alternate port for multiplayer sessions, which typically resolves Moderate NAT when port 3074 is in use by another device or strict NAT rule.",
    tip: "This is the correct solution when you have two Xbox consoles sharing a single network — each console should be assigned a different manual alternate port to prevent conflicts.",
  },
];

// =============================================================
// FAQ Data
// =============================================================

const faqs = [
  {
    question: "What does Xbox Strict NAT mean?",
    answer:
      "Strict NAT on Xbox means your router's firewall is blocking inbound UDP and TCP connections on the ports Xbox Live uses for peer-to-peer multiplayer. With Strict NAT, you can connect to Xbox Live services for downloads, achievements, and account management, but you cannot establish direct connections with other players. You can only connect to players with Open NAT — you cannot join parties with Moderate or Strict NAT players, cannot host multiplayer sessions, and cannot use party chat with everyone in a lobby.",
  },
  {
    question: "What is the difference between Xbox Open, Moderate, and Strict NAT?",
    answer:
      "Open NAT allows you to connect to all other players regardless of their NAT type, host game sessions, join any party, and use party chat without restrictions — this is the target state. Moderate NAT lets you connect to Open NAT players and most Moderate NAT players, but you may experience slow matchmaking and cannot connect to Strict NAT players. Strict NAT is the most restricted state — you can only connect to Open NAT players, cannot host, cannot party chat with most players, and matchmaking is significantly limited.",
  },
  {
    question: "What does 'Xbox Double NAT Detected' mean?",
    answer:
      "The 'Double NAT Detected' warning on Xbox means two separate routers are performing network address translation on your network. This typically happens when an ISP modem-router combo and your personal router are both active simultaneously. With Double NAT, your port forwarding rules on your personal router are invisible to the internet because the ISP gateway blocks all inbound traffic before it reaches your router. Fix this by enabling Bridge Mode on the ISP gateway or setting your personal router to Access Point (AP) Mode.",
  },
  {
    question: "What does 'UPnP Not Successful' mean on Xbox?",
    answer:
      "The 'UPnP Not Successful' error means your Xbox requested a port mapping from your router via UPnP, but the router refused or ignored the request. Common causes: UPnP is disabled on the router; another device has already claimed the same port; the router's UPnP daemon has crashed and needs a restart; or the router firmware has a UPnP implementation bug. Fix: enable UPnP in router settings, toggle it off and on, reboot the router, and restart the Xbox. If UPnP continues failing, disable it completely and use manual port forwarding instead.",
  },
  {
    question: "What ports do I need to forward for Xbox Live Open NAT?",
    answer:
      "For Xbox Live, forward the following ports to your Xbox's static IP: TCP port 3074 (Xbox Live multiplayer); UDP port 88 (Xbox Live authentication); UDP port 500 (IPSec); UDP port 3074 (Xbox Live multiplayer); UDP port 3544 (Teredo IPv6 tunneling); UDP port 4500 (IPSec NAT traversal). If you use Xbox Remote Play, also open TCP port 10001 and UDP port 10001. After creating rules, run Settings → General → Network Settings → Test network connection to verify Open NAT.",
  },
  {
    question: "Why does my Xbox show Moderate NAT even with port forwarding enabled?",
    answer:
      "Moderate NAT after port forwarding usually means one of three things: another device on your network claimed port 3074 before your Xbox (use Alternate Port Selection to resolve this); your router's port forwarding rules are overridden by Double NAT from an upstream gateway (check WAN IP for private addresses); or your ISP uses CGNAT (check WAN IP for 100.64.x.x). Additionally, some routers require a reboot after adding port forwarding rules before they take effect.",
  },
  {
    question: "Is it safe to put my Xbox in the DMZ?",
    answer:
      "Yes, placing an Xbox in the DMZ is safe. The Xbox runs a closed, locked operating system that does not expose vulnerable services like SMB, RDP, or web servers. The Xbox only communicates with Microsoft's Xbox Live servers and peers in authorized game sessions. The main risk of DMZ is negligible for consoles. Keep your Xbox firmware updated while using DMZ. Never place a Windows PC, Mac, NAS, or any general-purpose device in the DMZ without a robust software firewall.",
  },
  {
    question: "Can CGNAT prevent me from fixing Xbox Strict NAT?",
    answer:
      "Yes. If your ISP uses Carrier-Grade NAT (CGNAT), your router's WAN IP address will be in the 100.64.0.0–100.127.255.255 range (RFC 6598). Under CGNAT, you share a public IP with multiple customers and no inbound connections are routable to your network. UPnP, port forwarding, and DMZ all fail silently under CGNAT. Contact your ISP to request a dedicated public IP address — this is typically available as a paid upgrade on residential plans.",
  },
  {
    question: "Can two Xbox consoles on the same network both have Open NAT?",
    answer:
      "Yes, but only if they use different ports. Both consoles cannot use the same UPnP port mapping simultaneously. The recommended approach: disable UPnP on your router, assign each Xbox a static IP via DHCP reservation, and forward port 3074 to the first Xbox. On the second Xbox, use Alternate Port Selection (Settings → General → Network Settings → Advanced Settings → Alternate Port Selection → Manual → choose a different port, e.g. 3075 or 49152). Then forward that alternate port to the second Xbox's static IP.",
  },
  {
    question: "Does Xbox NAT Type affect ping and latency?",
    answer:
      "Xbox Strict NAT does not directly increase your ping to dedicated game servers — latency to servers is determined by your ISP routing and geographic distance. However, Strict NAT forces you to connect through Microsoft's relay servers for peer-to-peer games instead of establishing direct peer connections. These relay servers add 20–80ms of additional latency compared to direct connections. Open NAT allows direct peer-to-peer connections with the lowest possible latency for peer-hosted game sessions.",
  },
];

// =============================================================
// Common Causes
// =============================================================

const commonCauses = [
  {
    title: "UPnP Disabled or Port Conflict",
    desc: "UPnP is off or another device has already claimed TCP/UDP port 3074, preventing Xbox Live from registering a dynamic port mapping.",
  },
  {
    title: "Double NAT — ISP Gateway + Personal Router",
    desc: "Two NAT layers in series — ISP modem-router and personal router — block all inbound Xbox Live traffic before it reaches the console.",
  },
  {
    title: "CGNAT — Shared Public IP",
    desc: "ISP assigns a shared private WAN IP in the 100.64.x.x range. No port forwarding is possible without requesting a dedicated public IP.",
  },
  {
    title: "Missing or Incorrect Port Rules",
    desc: "Port forwarding rules pointing to the wrong IP address, or missing the UDP port 88 and UDP 3544 Teredo entries required for full Open NAT.",
  },
  {
    title: "Dynamic DHCP Lease Breaking Rules",
    desc: "Xbox received a new DHCP IP address after a router reboot, making previously correct port forwarding rules point silently to the wrong device.",
  },
  {
    title: "ISP Firewall Blocking Xbox Live Ports",
    desc: "Some ISPs filter specific UDP port ranges at the network level. If all router-side fixes fail, the block may be upstream at the ISP.",
  },
];

// =============================================================
// Quick Fix Checklist
// =============================================================

const quickFixChecklist = [
  "Press Xbox button → Settings → General → Network Settings → Test network connection. Note NAT Type and any error messages.",
  "Check your router's WAN IP — if it shows a private address (192.168.x.x / 10.x.x.x / 100.64.x.x), fix Double NAT or CGNAT first.",
  "Enable UPnP in your router admin panel. Reboot router and Xbox. Retest NAT.",
  "Assign Xbox a static IP via DHCP reservation using its MAC address.",
  "Forward TCP 3074 and UDP 88, 500, 3074, 3544, 4500 to Xbox's static IP.",
  "If still Moderate — use Alternate Port Selection on Xbox (Settings → Network → Advanced Settings).",
  "If still Strict — place Xbox static IP in the router's DMZ for guaranteed Open NAT.",
  "If WAN IP is 100.64.x.x — contact ISP to remove CGNAT or request dedicated public IP.",
];

// =============================================================
// Page Component
// =============================================================

export default function XboxNatTypeOpenPage() {
  return (
    <TroubleshootingArticleShell
      h1="Xbox NAT Type Open: Fix Strict & Moderate NAT on Xbox Series X/S and Xbox One"
      intro="Xbox Strict NAT blocks party invites, prevents you from hosting multiplayer sessions, and forces voice chat through slow Microsoft relay servers. Moderate NAT limits who you can play with and causes slow matchmaking. This complete guide explains every cause of Xbox Strict and Moderate NAT, and provides step-by-step fixes — UPnP, port forwarding, Alternate Port Selection, Double NAT resolution, CGNAT detection, and DMZ configuration — for all major router brands."
      category="nat"
      breadcrumbs={breadcrumbs}
      faqs={faqs}
      troubleshootingSteps={troubleshootingSteps}
      warningBanner={{
        title: "Double NAT Detected? Fix This Before Anything Else",
        text: "If your Xbox displays 'Double NAT Detected', no amount of port forwarding will achieve Open NAT until this is resolved. Check your personal router's WAN IP — if it is a private address (192.168.x.x or 10.x.x.x), you have two routers actively performing NAT. Enable Bridge Mode on your ISP modem or set your personal router to AP Mode first.",
      }}
      quickFixChecklist={quickFixChecklist}
      commonCauses={commonCauses}
      whenToContactISP="Contact your ISP if your router WAN IP is in the 100.64.0.0/10 CGNAT range, if your ISP gateway cannot be put into Bridge Mode, or if port forwarding and DMZ configurations have no effect on your Xbox NAT type. Request a dedicated public static IP address."
      severityLevel="medium"
    >
      <div className="space-y-10">

        {/* SECTION 1: Quick AI Answer */}
        <section
          className="glass-card p-6 border border-emerald-950/20 bg-emerald-950/5 rounded-2xl relative overflow-hidden"
          aria-label="Quick AI Answer"
        >
          <div className="absolute top-0 right-0 bg-[var(--brand-500)]/10 text-[var(--brand-400)] text-[10px] font-mono uppercase tracking-wider px-3 py-1 rounded-bl-lg font-bold">
            Quick AI Response Summary
          </div>
          <h2 className="text-xs font-bold text-[var(--brand-400)] mb-3 uppercase tracking-wide">
            Fix Xbox Strict NAT in Under 5 Minutes
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Xbox Strict NAT means your router is blocking the ports Xbox Live uses for peer-to-peer multiplayer. The fastest fix: log into your router admin panel and enable <strong>UPnP</strong> — this achieves Open NAT for most home setups. If UPnP shows &quot;Not Successful&quot;, assign your Xbox a <strong>static IP</strong> and forward <strong>TCP 3074 and UDP 88, 500, 3074, 3544, 4500</strong>. If your router WAN IP is a private address, you have <strong>Double NAT</strong> — fix that first. If it starts with <strong>100.64.x.x</strong>, that is CGNAT — only your ISP can fix it.
          </p>
        </section>

        {/* Interactive Tool */}
        <section aria-label="Interactive Xbox NAT Diagnostic">
          <div className="mb-4">
            <h2 className="text-base font-bold text-[var(--text-primary)]">
              Interactive Xbox NAT Diagnostic Tool
            </h2>
            <p className="text-xs text-[var(--text-muted)] mt-1">
              Analyze your router NAT configuration, detect Xbox Live port availability, and receive a personalized fix workflow.
            </p>
          </div>
          <ConnectionOptimizerClient mode="router-admin" />
        </section>

        {/* SECTION 2: NAT Types Comparison Table */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Network size={18} className="text-emerald-400" />
            2. Xbox NAT Type Comparison: Open vs Moderate vs Strict
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Xbox uses three NAT classifications. Here is exactly what each means for your gaming experience and the specific limitations each imposes:
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-xs text-[var(--text-secondary)]">
              <thead>
                <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                  <th className="px-4 py-3 text-left">Feature</th>
                  <th className="px-4 py-3 text-left text-green-400">Open NAT</th>
                  <th className="px-4 py-3 text-left text-yellow-400">Moderate NAT</th>
                  <th className="px-4 py-3 text-left text-red-400">Strict NAT</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)] bg-[var(--bg-surface)]/20">
                <tr>
                  <td className="px-4 py-3 font-semibold">Matchmaking</td>
                  <td className="px-4 py-3 text-green-400 font-bold">All players</td>
                  <td className="px-4 py-3 text-yellow-400">Open + Moderate only</td>
                  <td className="px-4 py-3 text-red-400">Open only</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold">Party Chat</td>
                  <td className="px-4 py-3 text-green-400 font-bold">Unrestricted</td>
                  <td className="px-4 py-3 text-yellow-400">May have issues</td>
                  <td className="px-4 py-3 text-red-400">Severely limited</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold">Host Game Sessions</td>
                  <td className="px-4 py-3 text-green-400 font-bold">Yes — full</td>
                  <td className="px-4 py-3 text-yellow-400">Limited</td>
                  <td className="px-4 py-3 text-red-400">No</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold">Join Parties</td>
                  <td className="px-4 py-3 text-green-400 font-bold">Any NAT type</td>
                  <td className="px-4 py-3 text-yellow-400">Open + Moderate</td>
                  <td className="px-4 py-3 text-red-400">Open only</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold">Peer-to-peer Latency</td>
                  <td className="px-4 py-3 text-green-400 font-bold">Direct connection</td>
                  <td className="px-4 py-3 text-yellow-400">Direct or relay</td>
                  <td className="px-4 py-3 text-red-400">Relay only (+20–80ms)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold">Matchmaking Speed</td>
                  <td className="px-4 py-3 text-green-400 font-bold">Fast</td>
                  <td className="px-4 py-3 text-yellow-400">Slower</td>
                  <td className="px-4 py-3 text-red-400">Very slow / timeout</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold">UPnP Port Mapping</td>
                  <td className="px-4 py-3 text-green-400 font-bold">Active</td>
                  <td className="px-4 py-3 text-yellow-400">Partial</td>
                  <td className="px-4 py-3 text-red-400">None or failed</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 3: How Xbox Live Uses NAT */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Activity size={18} className="text-emerald-400" />
            3. How Xbox Live Determines Your NAT Type
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            When you run a network test on Xbox, the console performs a series of probes to Microsoft&apos;s Xbox Live STUN and TURN servers to classify your NAT type. Here is exactly what happens:
          </p>
          <div className="p-5 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl font-mono text-xs text-[var(--text-muted)] space-y-4">
            <div className="text-emerald-400 font-bold">[Xbox Live NAT Type Detection — Connection Probe Sequence]</div>
            <div className="space-y-2 leading-relaxed">
              <div><strong>1.</strong> Xbox sends UDP probe to Xbox Live STUN server on port 3074.</div>
              <div className="pl-4 border-l-2 border-[var(--border-subtle)]">↓ Router creates outbound NAT mapping for this UDP session.</div>
              <div><strong>2.</strong> STUN server records your external IP:port mapping and sends a reply on the same socket.</div>
              <div className="pl-4 border-l-2 border-[var(--border-subtle)]">↓ STUN server also attempts to reach you from a different source port.</div>
              <div><strong>3. Open NAT:</strong> Router accepts all inbound from STUN server, including from alternate ports. <span className="text-green-400">[Open NAT Confirmed]</span></div>
              <div><strong>3. Moderate NAT:</strong> Router accepts reply on same socket but blocks alternate port probe. Direct P2P sometimes works. <span className="text-yellow-400">[Moderate NAT]</span></div>
              <div><strong>3. Strict NAT:</strong> Router blocks all unsolicited inbound on Xbox ports. Console must use relay. <span className="text-red-400">[Strict NAT — Relay Required]</span></div>
            </div>
          </div>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Xbox also uses <strong>Teredo</strong> (IPv6-over-IPv4 tunneling via UDP 3544) as an alternative path for NAT traversal. If Teredo is blocked by your router or ISP, Moderate and Strict NAT become permanent. Teredo requires UDP port 3544 to be open outbound.
          </p>
        </section>

        {/* SECTION 4: Symptoms Table */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Zap size={18} className="text-emerald-400" />
            4. Xbox NAT Error Diagnosis Matrix
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-xs text-[var(--text-secondary)]">
              <thead>
                <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                  <th className="px-4 py-3 text-left">Xbox Error / Symptom</th>
                  <th className="px-4 py-3 text-left">Root Cause</th>
                  <th className="px-4 py-3 text-left">Fastest Fix</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)] bg-[var(--bg-surface)]/20">
                <tr>
                  <td className="px-4 py-3 font-semibold">NAT Type: Strict</td>
                  <td className="px-4 py-3">Router firewall blocking Xbox Live ports</td>
                  <td className="px-4 py-3">Enable UPnP or forward TCP 3074 + UDP 88, 500, 3074, 3544, 4500.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold">Double NAT Detected</td>
                  <td className="px-4 py-3">Two active routers doing NAT in series</td>
                  <td className="px-4 py-3">Enable Bridge Mode on ISP modem or AP Mode on personal router.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold">UPnP Not Successful</td>
                  <td className="px-4 py-3">Router rejected UPnP port mapping request</td>
                  <td className="px-4 py-3">Toggle UPnP off/on in router. Reboot router + Xbox. Or disable UPnP and use manual port forwarding.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold">Cannot join party</td>
                  <td className="px-4 py-3">Strict NAT or port conflict with another device</td>
                  <td className="px-4 py-3">Forward ports. Use Alternate Port Selection if second Xbox is on network.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold">NAT Type: Moderate (won&apos;t change)</td>
                  <td className="px-4 py-3">Port 3074 claimed by another device or partial firewall block</td>
                  <td className="px-4 py-3">Use Alternate Port Selection → Manual port assignment on Xbox.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold">Voice chat drops in party</td>
                  <td className="px-4 py-3">SIP ALG corrupting UDP on ports 3074/88</td>
                  <td className="px-4 py-3">Disable SIP ALG in router firewall/ALG settings.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 5: Router Brand-Specific Guides */}
        <section className="space-y-6">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Settings size={18} className="text-emerald-400" />
            5. Router Brand-Specific Xbox Live Port Forwarding Guides
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Forward these Xbox Live ports to your Xbox&apos;s static IP: <strong>TCP: 3074 — UDP: 88, 500, 3074, 3544, 4500</strong>. Find the correct menu path for your router:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h3 className="text-sm font-bold text-[var(--text-primary)]">TP-Link (Archer / AX Series)</h3>
              <ol className="list-decimal pl-4 space-y-1 text-xs text-[var(--text-muted)]">
                <li>Log into <code>192.168.0.1</code> or <code>tplinkwifi.net</code>.</li>
                <li>Go to <strong>Advanced → NAT Forwarding → Virtual Servers</strong>.</li>
                <li>Click <strong>Add</strong>. Enter Service Name (Xbox-TCP), External Port (3074), Internal IP (Xbox static IP), Internal Port (3074), Protocol: TCP.</li>
                <li>Repeat for each UDP port: 88, 500, 3074, 3544, 4500. Save all rules.</li>
                <li>Enable UPnP at <strong>Advanced → NAT Forwarding → UPnP</strong>.</li>
              </ol>
            </div>
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h3 className="text-sm font-bold text-[var(--text-primary)]">ASUS (RT-AX / ROG / ZenWiFi)</h3>
              <ol className="list-decimal pl-4 space-y-1 text-xs text-[var(--text-muted)]">
                <li>Log into <code>router.asus.com</code> or <code>192.168.1.1</code>.</li>
                <li>Go to <strong>WAN → Port Forwarding</strong>. Set Enable Port Forwarding to <strong>Yes</strong>.</li>
                <li>Add rule: Service Name (Xbox-TCP), Port Range (3074), Local IP (Xbox IP), Local Port (3074), Protocol (TCP).</li>
                <li>Add UDP rules for ports 88, 500, 3074, 3544, 4500 separately.</li>
                <li>Enable UPnP at <strong>WAN → Basic Config → Enable UPnP</strong>.</li>
              </ol>
            </div>
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h3 className="text-sm font-bold text-[var(--text-primary)]">Netgear (Nighthawk / Orbi)</h3>
              <ol className="list-decimal pl-4 space-y-1 text-xs text-[var(--text-muted)]">
                <li>Log into <code>routerlogin.net</code> or <code>192.168.1.1</code>.</li>
                <li>Go to <strong>ADVANCED → Advanced Setup → Port Forwarding</strong>.</li>
                <li>Click <strong>Add Custom Service</strong>. Enter Name (Xbox-TCP), Start Port (3074), End Port (3074), Protocol (TCP), Internal IP (Xbox IP).</li>
                <li>Repeat for UDP services (88, 500, 3074, 3544, 4500).</li>
                <li>Enable UPnP at <strong>ADVANCED → Advanced Setup → UPnP</strong>.</li>
              </ol>
            </div>
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h3 className="text-sm font-bold text-[var(--text-primary)]">Linksys (WRT / Velop)</h3>
              <ol className="list-decimal pl-4 space-y-1 text-xs text-[var(--text-muted)]">
                <li>Log into <code>192.168.1.1</code> or the Linksys app.</li>
                <li>Go to <strong>Smart Wi-Fi Tools → Apps & Gaming → Port Range Forwarding</strong>.</li>
                <li>Add entry: Application (Xbox-TCP), External Start (3074), End (3074), Protocol (TCP), Device IP (Xbox IP). Enable.</li>
                <li>Repeat for UDP: 88, 500, 3074, 3544, 4500.</li>
                <li>Enable UPnP under <strong>Security → Apps and Gaming → UPnP</strong>.</li>
              </ol>
            </div>
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h3 className="text-sm font-bold text-[var(--text-primary)]">Huawei (HG / WS / AX)</h3>
              <ol className="list-decimal pl-4 space-y-1 text-xs text-[var(--text-muted)]">
                <li>Log into <code>192.168.3.1</code> or <code>192.168.100.1</code>.</li>
                <li>Go to <strong>Advanced → NAT → Port Mapping</strong>.</li>
                <li>Click <strong>New Port Mapping Rule</strong>. Set External Port (3074), Internal Host (Xbox IP), Internal Port (3074), Protocol (TCP).</li>
                <li>Repeat for UDP: 88, 500, 3074, 3544, 4500.</li>
                <li>Enable UPnP at <strong>Advanced → UPnP</strong>.</li>
              </ol>
            </div>
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h3 className="text-sm font-bold text-[var(--text-primary)]">ZTE (H / F Series)</h3>
              <ol className="list-decimal pl-4 space-y-1 text-xs text-[var(--text-muted)]">
                <li>Log into <code>192.168.1.1</code>.</li>
                <li>Go to <strong>Forward Rules → Port Mapping</strong>.</li>
                <li>Click <strong>New</strong>. Set WAN Connection, Protocol (TCP), External Port (3074), Internal Server IP (Xbox IP), Internal Port (3074).</li>
                <li>Repeat for UDP: 88, 500, 3074, 3544, 4500.</li>
                <li>Enable UPnP at <strong>Advanced Setup → UPnP</strong>.</li>
              </ol>
            </div>
          </div>
        </section>

        {/* SECTION 6: Xbox Live Port Reference Table */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Gamepad2 size={18} className="text-emerald-400" />
            6. Complete Xbox Live Port Forwarding Reference Table
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
                  <td className="px-4 py-3 font-semibold text-emerald-400">Xbox Live — Multiplayer</td>
                  <td className="px-4 py-3 font-mono">TCP + UDP</td>
                  <td className="px-4 py-3 font-mono">3074</td>
                  <td className="px-4 py-3">Primary Xbox Live multiplayer and matchmaking port</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-emerald-400">Xbox Live — Auth</td>
                  <td className="px-4 py-3 font-mono">UDP</td>
                  <td className="px-4 py-3 font-mono">88</td>
                  <td className="px-4 py-3">Kerberos authentication for Xbox Live accounts</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-emerald-400">IPSec</td>
                  <td className="px-4 py-3 font-mono">UDP</td>
                  <td className="px-4 py-3 font-mono">500</td>
                  <td className="px-4 py-3">IPSec key exchange for encrypted Xbox Live sessions</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-emerald-400">Teredo IPv6</td>
                  <td className="px-4 py-3 font-mono">UDP</td>
                  <td className="px-4 py-3 font-mono">3544</td>
                  <td className="px-4 py-3">IPv6-over-IPv4 tunneling for NAT traversal fallback</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-emerald-400">IPSec NAT-T</td>
                  <td className="px-4 py-3 font-mono">UDP</td>
                  <td className="px-4 py-3 font-mono">4500</td>
                  <td className="px-4 py-3">IPSec NAT traversal for encrypted connections through NAT</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-blue-400">Xbox — HTTPS</td>
                  <td className="px-4 py-3 font-mono">TCP</td>
                  <td className="px-4 py-3 font-mono">443</td>
                  <td className="px-4 py-3">Xbox Live account services, store, and downloads</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-purple-400">Remote Play</td>
                  <td className="px-4 py-3 font-mono">TCP + UDP</td>
                  <td className="px-4 py-3 font-mono">10001</td>
                  <td className="px-4 py-3">Xbox Remote Play streaming over the internet</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 7: Alternate Port Selection */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Zap size={18} className="text-emerald-400" />
            7. Alternate Port Selection — Fix Moderate NAT When Port 3074 Is Claimed
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Xbox includes a built-in feature called <strong>Alternate Port Selection</strong> to work around scenarios where TCP/UDP port 3074 is already in use by another device or is blocked by your ISP. This is particularly useful when two Xbox consoles share a network, or when port 3074 is blocked upstream.
          </p>
          <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl space-y-4">
            <h3 className="text-sm font-bold text-emerald-400">How to Enable Alternate Port Selection</h3>
            <ol className="list-decimal pl-5 space-y-3 text-xs text-[var(--text-muted)]">
              <li>Press the <strong>Xbox button</strong> to open the guide.</li>
              <li>Navigate to <strong>Profile & System → Settings → General → Network Settings</strong>.</li>
              <li>Select <strong>Advanced Settings</strong>.</li>
              <li>Select <strong>Alternate Port Selection</strong>.</li>
              <li>Change from <strong>Automatic</strong> to <strong>Manual</strong>.</li>
              <li>Select a port in the <strong>49152–65535</strong> range (e.g., 49152, 50001, or 52000).</li>
              <li>Save the setting. Run <strong>Test network connection</strong> to verify NAT type changed to Open.</li>
            </ol>
            <div className="p-4 border border-emerald-900/30 bg-emerald-900/5 rounded-xl flex items-start gap-3">
              <CheckCircle2 size={18} className="text-emerald-400 shrink-0 mt-0.5" />
              <p className="text-[10px] text-[var(--text-secondary)] leading-relaxed">
                <strong>Two Xbox consoles on one network:</strong> Disable UPnP on the router. Set the first Xbox to Automatic (uses port 3074 — forward 3074 to this console). Set the second Xbox to Manual alternate port (e.g., 3075 or 49152) and create a separate forwarding rule for that alternate port pointing to the second Xbox&apos;s static IP.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 8: DMZ Configuration */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Shield size={18} className="text-emerald-400" />
            8. DMZ Configuration — Guaranteed Open NAT for Xbox
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            If manual port forwarding and Alternate Port Selection both fail to achieve Open NAT, placing your Xbox in the router&apos;s DMZ (Demilitarized Zone) will bypass all port-blocking and guarantee Open NAT. The DMZ forwards all inbound internet traffic on every port directly to the Xbox.
          </p>
          <ol className="list-decimal pl-6 space-y-3 text-xs md:text-sm text-[var(--text-muted)]">
            <li>Ensure your Xbox has a <strong>static IP via DHCP reservation</strong> (e.g., <code>192.168.1.160</code>).</li>
            <li>Log into your router admin panel and navigate to the DMZ setting:
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>TP-Link:</strong> Advanced → NAT Forwarding → DMZ</li>
                <li><strong>ASUS:</strong> WAN → DMZ</li>
                <li><strong>Netgear:</strong> ADVANCED → WAN Setup → Default DMZ Server</li>
                <li><strong>Linksys:</strong> Security → DMZ</li>
                <li><strong>Huawei:</strong> Advanced → NAT → DMZ Host</li>
              </ul>
            </li>
            <li>Enable DMZ and enter your Xbox&apos;s static IP as the DMZ host.</li>
            <li>Save the configuration and reboot your router.</li>
            <li>On your Xbox, run <strong>Settings → General → Network Settings → Test network connection</strong>. NAT Type should show Open.</li>
          </ol>
        </section>

        {/* SECTION 9: Double NAT */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <AlertTriangle size={18} className="text-emerald-400" />
            9. Double NAT — Why Xbox Port Forwarding Is Silently Failing
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            If your Xbox displays <strong>Double NAT Detected</strong> or if your port forwarding rules have no effect on NAT type, Double NAT is almost certainly the cause. Double NAT occurs when your ISP-supplied modem-router gateway and your personal router are both performing NAT simultaneously.
          </p>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            To detect Double NAT: log into your personal router and look at the <strong>WAN IP address</strong> on the status page. If it begins with <code>192.168.</code>, <code>10.</code>, or <code>172.16–31.</code>, you have Double NAT. Your port forwarding rules on the personal router are invisible to the internet because all inbound traffic is blocked at the ISP gateway first.
          </p>
          <div className="p-4 border border-amber-900/30 bg-amber-900/5 rounded-xl flex items-start gap-3">
            <AlertTriangle size={18} className="text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-semibold text-[var(--text-primary)] mb-1">Fix Double NAT First</h4>
              <p className="text-[10px] text-[var(--text-secondary)] leading-relaxed">
                Enable <strong>Bridge Mode</strong> on your ISP gateway (disables its NAT and passes the public IP directly to your personal router), or put your personal router into <strong>Access Point (AP) Mode</strong> (disables its own NAT, letting the ISP gateway handle routing). See our{" "}
                <Link href="/double-nat-detected" className="text-[var(--brand-400)] hover:underline">
                  Double NAT Detected fix guide
                </Link>{" "}
                for brand-specific instructions.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 10: CGNAT */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Globe size={18} className="text-emerald-400" />
            10. CGNAT — When Your ISP Causes Permanent Xbox Strict NAT
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Carrier-Grade NAT (CGNAT) is used by ISPs — especially mobile broadband and fixed wireless providers — to share a single public IPv4 address among many customers. Your router&apos;s WAN IP will be in the <strong>100.64.0.0/10 range</strong> (RFC 6598). Under CGNAT, no inbound connections to your network are possible, making UPnP, port forwarding, and DMZ all ineffective.
          </p>
          <div className="p-5 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl font-mono text-xs text-[var(--text-muted)] space-y-2">
            <h4 className="text-xs font-bold text-[var(--text-primary)] font-sans">CGNAT Detection:</h4>
            <div>Check your router WAN IP. If it falls in any range below — CGNAT is confirmed:</div>
            <div className="text-red-400">→ 100.64.0.0 – 100.127.255.255 (RFC 6598 — definitive CGNAT)</div>
            <div className="text-yellow-400">→ 10.0.0.0 – 10.255.255.255 (some ISPs use this range for CGNAT)</div>
            <div className="mt-2">Cross-verify: run <code className="bg-[var(--bg-surface)] px-1 rounded">curl ifconfig.me</code> on a PC. If the result differs from your router&apos;s WAN IP — CGNAT is active.</div>
          </div>
          <ul className="list-disc pl-6 space-y-2 text-xs md:text-sm text-[var(--text-muted)]">
            <li><strong>Request a dedicated public static IP from your ISP</strong> — available as a paid upgrade on most residential plans.</li>
            <li><strong>Use a gaming VPN with port forwarding</strong> — Mullvad, AirVPN, or ProtonVPN with port forwarding running on your router; the VPN must support dedicated IPs to avoid Symmetric NAT at the VPN endpoint.</li>
            <li><strong>Enable IPv6</strong> — if your ISP provides IPv6, your Xbox can connect directly over IPv6 bypassing CGNAT entirely.</li>
          </ul>
        </section>

        {/* SECTION 11: SIP ALG */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Terminal size={18} className="text-emerald-400" />
            11. SIP ALG — Disable This If Xbox Party Chat Keeps Dropping
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            SIP ALG (Application Layer Gateway) is a router feature that intercepts UDP packets it misidentifies as VoIP SIP signaling. Xbox Live party chat and game voice audio use UDP on ports 3074 and 88 — ports that SIP ALG commonly intercepts. When SIP ALG is enabled, it rewrites packet headers and corrupts the Xbox Live handshake, causing party chat to drop even when NAT shows as Open.
          </p>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            <strong>Disable SIP ALG immediately</strong> on any router used with Xbox:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-xs md:text-sm text-[var(--text-muted)]">
            <li><strong>TP-Link:</strong> Advanced → NAT Forwarding → ALG — disable SIP ALG.</li>
            <li><strong>ASUS:</strong> WAN → NAT Passthrough — set SIP Passthrough to Disabled.</li>
            <li><strong>Netgear:</strong> ADVANCED → Security → WAN Setup — disable SIP ALG.</li>
            <li><strong>Linksys:</strong> Security → Apps and Gaming — uncheck SIP.</li>
            <li><strong>Huawei:</strong> Advanced → NAT → ALG Settings — disable SIP ALG.</li>
          </ul>
        </section>

        {/* SECTION 12: DNS Optimization */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Wifi size={18} className="text-emerald-400" />
            12. Xbox DNS Settings for Best Xbox Live Performance
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            While DNS does not directly affect NAT type, optimizing your Xbox DNS settings reduces lobby discovery latency and speeds up Xbox Live authentication. Configure these DNS settings manually on your Xbox:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="glass-card p-5 border border-emerald-900/20 bg-emerald-950/5 rounded-xl space-y-3">
              <h3 className="text-sm font-bold text-emerald-400">How to Set Xbox Manual DNS</h3>
              <ol className="list-decimal pl-4 space-y-1 text-xs text-[var(--text-muted)]">
                <li>Go to <strong>Settings → General → Network Settings</strong>.</li>
                <li>Select <strong>Advanced Settings</strong>.</li>
                <li>Select <strong>DNS Settings → Manual</strong>.</li>
                <li>Enter <strong>Primary DNS: 1.1.1.1</strong> (Cloudflare).</li>
                <li>Enter <strong>Secondary DNS: 1.0.0.1</strong>.</li>
                <li>Press <strong>B</strong> to save. Run network test to verify.</li>
              </ol>
            </div>
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl space-y-3">
              <h3 className="text-sm font-bold text-[var(--text-primary)]">Recommended DNS Options</h3>
              <div className="space-y-2 text-xs text-[var(--text-muted)]">
                <div className="flex justify-between items-center p-2 bg-[var(--bg-elevated)] rounded-lg">
                  <span className="font-bold text-emerald-400">Cloudflare</span>
                  <span className="font-mono">1.1.1.1 / 1.0.0.1</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-[var(--bg-elevated)] rounded-lg">
                  <span className="font-bold text-blue-400">Google</span>
                  <span className="font-mono">8.8.8.8 / 8.8.4.4</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-[var(--bg-elevated)] rounded-lg">
                  <span className="font-bold text-purple-400">Quad9</span>
                  <span className="font-mono">9.9.9.9 / 149.112.112.112</span>
                </div>
              </div>
              <p className="text-[10px] text-[var(--text-muted)]">
                See our{" "}
                <Link href="/best-dns-for-xbox" className="text-[var(--brand-400)] hover:underline">
                  Best DNS for Xbox guide
                </Link>{" "}
                for a full benchmark comparison.
              </p>
            </div>
          </div>
        </section>

        {/* Internal Links */}
        <section className="glass-card p-5 border border-[var(--border-subtle)] rounded-2xl space-y-3">
          <h3 className="text-sm font-bold text-[var(--text-primary)]">Related Xbox & Gaming Network Guides</h3>
          <ul className="space-y-2 text-xs text-[var(--text-muted)]">
            <li>→ <Link href="/nat-type-strict" className="text-[var(--brand-400)] hover:underline">NAT Type Strict Fix — All Platforms Guide</Link></li>
            <li>→ <Link href="/ps5-nat-type-fix" className="text-[var(--brand-400)] hover:underline">PS5 NAT Type Fix — Complete Guide</Link></li>
            <li>→ <Link href="/double-nat-detected" className="text-[var(--brand-400)] hover:underline">Double NAT Detected — How to Fix</Link></li>
            <li>→ <Link href="/port-forwarding-not-working" className="text-[var(--brand-400)] hover:underline">Port Forwarding Not Working — Troubleshooting Guide</Link></li>
            <li>→ <Link href="/high-ping-fix" className="text-[var(--brand-400)] hover:underline">High Ping Fix — Reduce Xbox Latency</Link></li>
            <li>→ <Link href="/best-dns-for-xbox" className="text-[var(--brand-400)] hover:underline">Best DNS for Xbox — Speed Benchmark</Link></li>
          </ul>
        </section>

      </div>
    </TroubleshootingArticleShell>
  );
}
