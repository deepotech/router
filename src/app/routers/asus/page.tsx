import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import TroubleshootingArticleShell from "@/components/tools/TroubleshootingArticleShell";
import { JsonLd } from "@/lib/seo/schema";
import {
  Wifi,
  Lock,
  Globe,
  Shield,
  Settings,
  RefreshCw,
  AlertTriangle,
  ChevronRight,
  Cpu,
  Zap,
  Sliders,
  CheckCircle2,
  Network,
  Gamepad2,
  Server,
  Info,
  ArrowRight,
  Gauge,
  Layers,
  HelpCircle,
  FileText,
  Search,
  Star,
  TrendingUp,
  Radio,
  MonitorPlay,
} from "lucide-react";

// =============================================================
// Premium SEO Metadata
// =============================================================

export const metadata: Metadata = buildMetadata({
  title: "ASUS Router Login, Password, Reset & Setup Guide (2026)",
  description:
    "Learn how to log in to ASUS routers at 192.168.1.1 or router.asus.com, reset passwords, update firmware, configure Wi-Fi 6 and Wi-Fi 7, and troubleshoot ASUS router issues. Complete ASUS router guide.",
  canonical: "/routers/asus",
  keywords: [
    "asus router",
    "asus router login",
    "asus router password",
    "asus default password",
    "router.asus.com",
    "192.168.1.1 asus",
    "asus router setup",
    "asus router reset",
    "asus firmware update",
    "asus router not connecting",
    "asus router troubleshooting",
    "asus wifi settings",
    "asus rog router",
    "asus aimesh",
    "asus aiprotection",
    "asus router admin",
    "asus adaptive qos",
    "asus game boost",
    "asus wtfast",
    "asus zenwifi",
  ],
});

// =============================================================
// Breadcrumbs
// =============================================================

const breadcrumbs = [
  { name: "Routers", url: "/routers" },
  { name: "ASUS", url: "/routers/asus" },
];

// =============================================================
// Root Causes for ASUS Issues
// =============================================================

const commonCauses = [
  {
    title: "Browser DNS Redirect Conflict",
    desc: "Modern browsers with DNS-over-HTTPS enabled query external resolvers (Cloudflare 1.1.1.1 or Google 8.8.8.8) instead of the router's local DNS service, preventing router.asus.com from resolving to 192.168.1.1.",
  },
  {
    title: "PPPoE or DHCP Credential Mismatch",
    desc: "Incorrect ISP PPPoE username/password or wrong VLAN ID settings on the WAN interface block the ASUS router from negotiating an external WAN IP, resulting in a disconnected or 0.0.0.0 WAN address.",
  },
  {
    title: "Wireless Band Steering Conflicts",
    desc: "When the 2.4GHz and 5GHz bands share the same SSID under Smart Connect, legacy devices may be forced onto a band they cannot optimally use, causing high retransmission rates and perceived speed drops.",
  },
  {
    title: "AiProtection Signature Database Blocking",
    desc: "ASUS AiProtection powered by Trend Micro occasionally misclassifies legitimate LAN traffic as threats after signature updates, throttling or blocking affected services without user-visible alerts.",
  },
];

// =============================================================
// Quick Fix Checklist
// =============================================================

const quickFixChecklist = [
  "Confirm your device is connected to the ASUS router network via Ethernet or Wi-Fi, then run 'ipconfig' (Windows) or 'ip route' (Linux/macOS) to verify your default gateway shows 192.168.1.1.",
  "Type the login address directly into your browser's address bar — either 192.168.1.1 or router.asus.com — never into a search engine field.",
  "Disable any active VPN client, browser proxy extension, or DNS-over-HTTPS setting before attempting to load the admin panel.",
  "Check the hardware label on the underside of the router for your exact model, hardware version, default Wi-Fi password, and admin credentials.",
  "Power-cycle by unplugging the ASUS router for 30 seconds and reconnecting. This clears DHCP lease conflicts, ARP cache, and memory state.",
  "If credentials are unknown, hold the physical RESET pinhole button on the rear panel for 5–10 seconds until all LEDs blink, restoring factory defaults.",
];

// =============================================================
// Diagnostic Steps
// =============================================================

const troubleshootingSteps = [
  {
    title: "Verify Physical and Network-Layer Connectivity",
    description:
      "Ensure your computer or device is actively connected to the ASUS router — either via a Cat6 Ethernet cable plugged into a LAN port, or wirelessly via the default SSID (printed on the bottom label). Confirm the local LAN LED is solid green or white. Run 'ipconfig' on Windows to verify your IPv4 address is in the 192.168.1.X range and the Default Gateway is 192.168.1.1. If you see a 169.254.X.X APIPA address, your device has not received a DHCP lease from the router.",
    tip: "Force a fresh DHCP lease by running 'ipconfig /release' followed by 'ipconfig /renew' in an elevated Command Prompt. This is often faster than rebooting the PC.",
  },
  {
    title: "Load the ASUS Admin Portal",
    description:
      "Open a fresh browser window (Chrome, Edge, or Safari in InPrivate/Incognito mode to bypass cached redirects). In the URL bar, type '192.168.1.1' or the ASUS hostname alias 'router.asus.com' and press Enter. The ASUS web management interface will load the login page. If it shows a security certificate warning, click 'Advanced' and proceed — the router uses a self-signed SSL certificate for local HTTPS connections, which is expected behavior.",
    tip: "If router.asus.com fails to resolve, your browser's Secure DNS (DoH) feature is bypassing the router's local resolver. Go to Chrome Settings > Privacy and Security > Security > Use secure DNS and temporarily set it to 'Off'.",
  },
  {
    title: "Authenticate with ASUS Admin Credentials",
    description:
      "At the login screen, enter your ASUS router credentials. The factory default for most ASUS routers is username: 'admin' and password: 'admin'. If you changed the password during initial setup and have forgotten it, you must perform a factory reset (hold the RESET button 5–10 seconds). For routers with AiProtection enabled, you may also see a Trend Micro TOS acceptance screen on first login after firmware updates — accept to restore full functionality.",
    tip: "The ASUS Router App (iOS and Android) can also serve as an alternative login method. It auto-discovers routers on your LAN using mDNS and eliminates the need to know the IP address.",
  },
  {
    title: "Use ASUS System Log and Network Map for Diagnostics",
    description:
      "Once logged in, click on the 'Network Map' icon to verify the WAN connection status. A green cloud icon confirms internet connectivity. Navigate to Administration > System Log > General Log to review system events. For WAN issues, go to WAN > Internet Connection and verify your connection type (DHCP, PPPoE, or Static IP) and credentials match exactly what your ISP provided. Use Ping/Traceroute tools under Network Tools to run connectivity tests from the WAN interface itself.",
    tip: "ASUS routers record detailed DHCP, firewall, and wireless association logs. If devices are dropping from the network, the wireless log under Wireless > Log can show exactly when and why a client disconnected.",
  },
];

// =============================================================
// FAQ Q&A Data (10 Detailed Questions)
// =============================================================

const faqs = [
  {
    question: "What is the default ASUS router login address?",
    answer:
      "The default login address for ASUS routers is 192.168.1.1. ASUS also provides the hostname alias 'router.asus.com' which resolves locally when your device is on the same network. For ASUS ZenWiFi mesh nodes and secondary AiMesh nodes, the address remains 192.168.1.1 but you must be connected to that specific node's network. Some ASUS DSL modem-routers use 192.168.1.1 as well. Always type the address directly into the browser URL bar — never the search bar — to avoid being redirected to external search results.",
  },
  {
    question: "What is the default username and password for ASUS routers?",
    answer:
      "For the vast majority of ASUS routers, the factory default credentials are username: 'admin' (all lowercase) and password: 'admin' (all lowercase). However, during initial setup, the ASUS firmware wizard may require you to set a custom admin password before granting access to the dashboard. If you completed this step and forgot the password, you cannot recover it remotely — a factory reset is required. Some newer ASUS models, particularly ZenWiFi AXE series, prompt you to create credentials during Quick Internet Setup without storing a default.",
  },
  {
    question: "How do I reset my ASUS router to factory settings?",
    answer:
      "To factory reset an ASUS router, make sure it is powered on. Locate the RESET button — usually a recessed pinhole on the rear panel. Use a paperclip or SIM ejector pin and hold the button for 5 to 10 seconds. You will know the reset is complete when the power LED starts blinking rapidly or all LEDs flash simultaneously. The router will reboot within 30–60 seconds and return to factory defaults including username 'admin', password 'admin', and the original SSID/password printed on the hardware label.",
  },
  {
    question: "Why can't I access router.asus.com?",
    answer:
      "router.asus.com is a local DNS alias that only resolves when your device uses the ASUS router's built-in DNS resolver. If it is not loading, your browser may be using a third-party DNS or DNS-over-HTTPS provider. Solutions: (1) Type 192.168.1.1 directly instead. (2) Disable browser Secure DNS in settings. (3) Disconnect from any active VPN clients. (4) Run 'ipconfig /flushdns' on Windows to clear the resolver cache. (5) Ensure you are connected to the ASUS network, not a guest or secondary router.",
  },
  {
    question: "How do I update ASUS router firmware?",
    answer:
      "ASUS firmware can be updated two ways. Method 1 — Online update: Log in to the admin panel at 192.168.1.1, go to Administration > Firmware Upgrade, and click 'Check'. If a newer version is found, click 'Update Now'. Method 2 — Manual upload: Visit asus.com/support, search for your router model, select your hardware version (shown on the bottom label), download the .trx or .pkgtb firmware file, then upload it in Administration > Firmware Upgrade > Manual. Never cut power during an upgrade as it can brick the router.",
  },
  {
    question: "What is AiMesh and how does it work?",
    answer:
      "AiMesh is ASUS's proprietary whole-home mesh networking system that allows you to combine multiple ASUS routers (even different models) into a unified mesh network with a single SSID. Unlike traditional mesh systems that require buying a complete matching kit, AiMesh lets you repurpose an existing ASUS router as a mesh node. The primary router acts as the AiMesh main node and manages routing, DHCP, and internet connectivity. Secondary nodes connect via wired backhaul (preferred for reliability) or wireless backhaul and extend coverage seamlessly.",
  },
  {
    question: "What is ASUS AiProtection and is it safe to use?",
    answer:
      "AiProtection is ASUS's built-in network security platform powered by Trend Micro's commercial-grade threat intelligence. It provides three main features: (1) Router Security Assessment — scans your router configuration for weak passwords and outdated firmware; (2) Malicious Sites Blocking — blocks DNS queries to known malware, phishing, and botnet command-and-control servers; (3) Two-Way IPS — inspects inbound and outbound traffic for known exploit signatures. AiProtection is safe to enable for most users and adds a meaningful layer of protection at the network perimeter without noticeably affecting throughput on modern ASUS hardware.",
  },
  {
    question: "How does ASUS Adaptive QoS improve gaming performance?",
    answer:
      "ASUS Adaptive QoS (Quality of Service) is a traffic prioritization engine that analyzes packet type, destination port, and application signature to classify network flows by category (Gaming, Streaming, Browsing, etc.). When enabled, it automatically elevates gaming traffic — primarily UDP packets on standard game server ports — above lower-priority transfers like cloud backups or BitTorrent, reducing in-game latency even when the network is otherwise congested. The 'Game Boost' profile within Adaptive QoS takes this further by assigning the highest queue priority to game data and can be combined with WTFast premium routing for geo-optimized server paths.",
  },
  {
    question: "Which ASUS routers support Wi-Fi 7?",
    answer:
      "ASUS's Wi-Fi 7 lineup as of 2025 includes the ROG Rapture GT-BE98 Pro (quad-band, 10G/2.5G ports), the RT-BE96U (tri-band, targeting ISP gateway deployments), the ZenWiFi Pro ET12 (mesh Wi-Fi 6E, stepping stone), and the ZenWiFi BQ16 Pro (Wi-Fi 7 mesh flagship). These routers support Multi-Link Operation (MLO) which allows a single device to aggregate bandwidth across two bands simultaneously, reducing effective latency to sub-2ms local hops. They also support 320MHz channels on the 6GHz band for peak theoretical throughput exceeding 9Gbps.",
  },
  {
    question: "What is the difference between ASUS ROG and standard ASUS routers?",
    answer:
      "ROG (Republic of Gamers) routers are ASUS's premium tier designed specifically for competitive gaming environments. They differentiate from standard ASUS models by including dedicated gaming hardware (more powerful CPUs and radio chips), ROG-exclusive firmware features like Game Acceleration powered by WTFast, Gear Accelerator (USB hardware dongle for priority gaming traffic), enhanced RGB Aura Sync lighting, more extensive port configurations (multiple 10G/2.5G LAN ports), and advanced VPN Fusion — allowing gaming traffic and VPN traffic to coexist simultaneously on different tunnels. Standard ASUS RT-series routers offer excellent value but lack these gaming-specific optimizations.",
  },
];

// =============================================================
// JSON-LD Custom Schema (CollectionPage & ItemList)
// =============================================================

const collectionPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": "https://routervia.com/routers/asus#collection",
  url: "https://routervia.com/routers/asus",
  name: "ASUS Router Hub: Login, Password, Setup & Troubleshooting Guide",
  description:
    "Learn how to log in to ASUS routers at 192.168.1.1 or router.asus.com, reset passwords, update firmware, configure AiMesh, and troubleshoot ASUS router issues.",
  mainEntity: {
    "@type": "ItemList",
    name: "ASUS Router Product Series",
    numberOfItems: 6,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "RT Series",
        description:
          "ASUS's mainstream home Wi-Fi routers covering Wi-Fi 5, Wi-Fi 6, Wi-Fi 6E, and Wi-Fi 7 standards.",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "ROG Rapture Series",
        description:
          "ASUS's Republic of Gamers premium routers with Game Boost, WTFast, and dedicated gaming hardware.",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "ZenWiFi Series",
        description:
          "ASUS's whole-home mesh Wi-Fi systems built on the AiMesh platform for seamless roaming.",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "TUF Gaming Series",
        description:
          "ASUS's mid-range gaming routers offering gaming QoS and robust hardware at competitive price points.",
      },
      {
        "@type": "ListItem",
        position: 5,
        name: "DSL-AC Series",
        description:
          "ASUS's integrated DSL modem-routers supporting ADSL2+ and VDSL2 connections.",
      },
      {
        "@type": "ListItem",
        position: 6,
        name: "ExpertWiFi Series",
        description:
          "ASUS's business-grade routers with VLAN support, VPN server capabilities, and advanced firewall controls.",
      },
    ],
  },
};

// =============================================================
// ASUS Model Lookup Data
// =============================================================

const asusModels = [
  {
    model: "RT-AX88U Pro",
    standard: "Wi-Fi 6",
    speed: "AX6000",
    highlight: "Dual 2.5G ports, 8 LAN ports",
  },
  {
    model: "RT-AX86U Pro",
    standard: "Wi-Fi 6",
    speed: "AX5700",
    highlight: "Gaming QoS, 2.5G WAN",
  },
  {
    model: "RT-AXE7800",
    standard: "Wi-Fi 6E",
    speed: "AXE7800",
    highlight: "6GHz band, tri-band, AiMesh",
  },
  {
    model: "ROG Rapture GT-AXE16000",
    standard: "Wi-Fi 6E",
    speed: "AXE16000",
    highlight: "Quad-band, 10G + 2.5G, WTFast",
  },
  {
    model: "ROG Rapture GT-BE98 Pro",
    standard: "Wi-Fi 7",
    speed: "BE19000",
    highlight: "Wi-Fi 7 MLO, quad-band, 10G",
  },
  {
    model: "ZenWiFi Pro ET12",
    standard: "Wi-Fi 6E",
    speed: "AXE11000",
    highlight: "2-pack mesh, 10G backhaul",
  },
  {
    model: "ZenWiFi BQ16 Pro",
    standard: "Wi-Fi 7",
    speed: "BE33000",
    highlight: "Wi-Fi 7 mesh flagship, MLO",
  },
  {
    model: "TUF-AX6000",
    standard: "Wi-Fi 6",
    speed: "AX6000",
    highlight: "2.5G WAN, gaming QoS, robust build",
  },
  {
    model: "RT-BE96U",
    standard: "Wi-Fi 7",
    speed: "BE19000",
    highlight: "Tri-band Wi-Fi 7, ISP-grade",
  },
];

// =============================================================
// ASUS Login Addresses
// =============================================================

const loginAddresses = [
  {
    address: "192.168.1.1",
    usage: "Default gateway for all ASUS routers",
    notes: "Primary access method — works on all models",
  },
  {
    address: "router.asus.com",
    usage: "Local hostname alias (HTTPS)",
    notes: "Requires local DNS — may fail with VPN/DoH",
  },
  {
    address: "ASUS Router App",
    usage: "iOS & Android mobile management",
    notes: "Auto-discovers router via mDNS",
  },
  {
    address: "AiMesh Node IP",
    usage: "Router-specific for mesh nodes",
    notes: "Assign static IPs to nodes for stable access",
  },
];

// =============================================================
// ASUS Error Codes Resolution Matrix
// =============================================================

const errorCodes = [
  {
    error: "WAN Disconnected",
    meaning: "Router cannot reach ISP gateway",
    fix: "Verify PPPoE credentials, power-cycle modem, check WAN cable",
  },
  {
    error: "Authentication Failed",
    meaning: "Wrong PPPoE username or password",
    fix: "Re-enter ISP credentials under WAN > Internet Connection",
  },
  {
    error: "No IP Address (0.0.0.0)",
    meaning: "DHCP negotiation with ISP failed",
    fix: "Power-cycle modem first, then router. Check if MAC cloning is needed",
  },
  {
    error: "DNS Lookup Failure",
    meaning: "Public domain names not resolving",
    fix: "Manually set DNS to 8.8.8.8 / 1.1.1.1 under WAN > DNS Settings",
  },
  {
    error: "AiProtection Blocked",
    meaning: "Trend Micro signature flagged legitimate traffic",
    fix: "Whitelist the IP/domain in AiProtection > Block Malicious Sites",
  },
  {
    error: "Wireless Client Disconnect Loop",
    meaning: "802.11r/k roaming triggers repeated re-auth",
    fix: "Disable Fast BSS Transition under Wireless > Professional settings",
  },
  {
    error: "Smart Connect Steering Issue",
    meaning: "Device stuck on a suboptimal band",
    fix: "Disable Smart Connect to manually separate 2.4G and 5G SSIDs",
  },
  {
    error: "Firmware Upgrade Failed",
    meaning: "Incomplete or corrupt firmware flash",
    fix: "Use Rescue Mode (hold reset while powering on) to reflash via TFTP",
  },
];

// =============================================================
// ASUS vs TP-Link Comparison
// =============================================================

const comparisonRows = [
  {
    feature: "Default Login IP",
    asus: "192.168.1.1",
    tplink: "192.168.0.1",
  },
  {
    feature: "Local Hostname",
    asus: "router.asus.com",
    tplink: "tplinkwifi.net",
  },
  {
    feature: "Default Credentials",
    asus: "admin / admin",
    tplink: "admin / admin (legacy) or custom",
  },
  {
    feature: "Mesh Technology",
    asus: "AiMesh (cross-model compatible)",
    tplink: "Deco (dedicated mesh hardware)",
  },
  {
    feature: "Gaming Focus",
    asus: "ROG, Game Boost, WTFast, Adaptive QoS",
    tplink: "Archer Gaming, Smart QoS",
  },
  {
    feature: "Security Platform",
    asus: "AiProtection (Trend Micro)",
    tplink: "HomeCare (Trend Micro)",
  },
  {
    feature: "Mobile App",
    asus: "ASUS Router App",
    tplink: "Tether App",
  },
  {
    feature: "Wi-Fi 7 Models",
    asus: "GT-BE98 Pro, RT-BE96U, ZenWiFi BQ16",
    tplink: "Archer BE550, BE800, Deco BE85",
  },
  {
    feature: "VPN Capabilities",
    asus: "OpenVPN, WireGuard, VPN Fusion",
    tplink: "OpenVPN, WireGuard, L2TP",
  },
  {
    feature: "Top Ports",
    asus: "Up to 10G x2 + 2.5G x2",
    tplink: "Up to 10G x2 (BE-series)",
  },
];

// =============================================================
// Page Component
// =============================================================

export default function AsusRouterHubPage() {
  return (
    <>
      {/* Custom JSON-LD schema for CollectionPage and ItemList */}
      <JsonLd data={collectionPageSchema} />

      <TroubleshootingArticleShell
        h1="ASUS Router Hub: Login, Password, Setup &amp; Troubleshooting"
        intro="ASUS is the world's most decorated router brand, consistently winning performance benchmarks and security certifications across its RT, ROG, ZenWiFi, TUF, and ExpertWiFi product lines. Whether you need to access your router's admin panel at 192.168.1.1 or router.asus.com, configure AiMesh for whole-home coverage, optimize gaming with Adaptive QoS and WTFast, enable AiProtection threat prevention, or update to the latest Wi-Fi 7 firmware, this authoritative guide covers every procedure in precise technical detail. Use the sections below to solve any ASUS router challenge with confidence."
        category="wifi"
        breadcrumbs={breadcrumbs}
        faqs={faqs}
        troubleshootingSteps={troubleshootingSteps}
        warningBanner={{
          title: "Security Advisory: Change Default Credentials Immediately",
          text: "The factory default username and password ('admin' / 'admin') are publicly known. Any device on your local network can access your router admin panel using these credentials. Upon first login, navigate to Administration > System and set a strong, unique admin password immediately. Also ensure AiProtection is enabled for an additional layer of network threat defense.",
        }}
        quickFixChecklist={quickFixChecklist}
        commonCauses={commonCauses}
        whenToContactISP="If the ASUS router's Network Map shows a persistent WAN disconnect despite correct PPPoE credentials, your DNS fails to resolve public domains even with manual DNS servers set to 8.8.8.8, or your upstream SNR (signal-to-noise ratio) drops below threshold on a DSL connection, the fault lies within the ISP's infrastructure. Contact your ISP to run a remote line test, reset your subscriber port, or dispatch a technician to inspect physical cabling to your premises."
        severityLevel="medium"
      >
        <div className="space-y-12">

          {/* =============================================================
              FEATURED SNIPPET: HOW TO LOGIN TO AN ASUS ROUTER
              ============================================================= */}
          <section
            className="glass-card p-6 border border-blue-950/20 bg-blue-950/5 rounded-2xl relative overflow-hidden space-y-4"
            aria-label="How to Login to an ASUS Router"
          >
            <div className="absolute top-0 right-0 bg-blue-500/10 text-blue-400 text-[10px] font-mono uppercase tracking-wider px-3 py-1 rounded-bl-lg font-bold">
              Quick Guide
            </div>
            <h2 className="text-sm font-bold text-blue-400 uppercase tracking-wide flex items-center gap-1.5">
              <Zap size={16} /> How to Login to an ASUS Router
            </h2>
            <div className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
              <p className="mb-3">
                Follow these exact steps to access your ASUS router&apos;s administration panel for configuring Wi-Fi, port forwarding, AiMesh, or firmware:
              </p>
              <ol className="list-decimal pl-5 space-y-2 text-xs text-[var(--text-secondary)] font-medium">
                <li>
                  <strong>Connect to the ASUS Network:</strong> Plug a Cat6 Ethernet cable from your PC into any LAN port on the ASUS router, or connect your device to the default Wi-Fi SSID printed on the bottom label.
                </li>
                <li>
                  <strong>Open a Web Browser:</strong> Launch Google Chrome, Microsoft Edge, Mozilla Firefox, or Apple Safari. Use Incognito/InPrivate mode if you have previously cached redirects.
                </li>
                <li>
                  <strong>Enter the Gateway Address:</strong> Type{" "}
                  <Link href="/ips/192-168-1-1" className="text-blue-400 hover:underline font-mono">
                    192.168.1.1
                  </Link>{" "}
                  or the hostname alias{" "}
                  <strong>router.asus.com</strong> directly into the URL bar (not the search bar) and press Enter.
                </li>
                <li>
                  <strong>Enter Admin Credentials:</strong> Input the default username{" "}
                  <code>admin</code> and password <code>admin</code>. If you set a custom password during setup, use that instead. Accept the Trend Micro AiProtection TOS if prompted.
                </li>
                <li>
                  <strong>Explore the ASUS Dashboard:</strong> You are now in the ASUS ASUSWRT web interface. Use Network Map, Wireless, WAN, AiMesh, and Administration tabs to manage your network.
                </li>
              </ol>
            </div>
          </section>

          {/* =============================================================
              ASUS LOGIN ADDRESSES TABLE
              ============================================================= */}
          <section className="space-y-4" aria-label="ASUS Router Login Addresses">
            <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
              <Globe size={18} className="text-blue-400" />
              Most Common ASUS Router Login Addresses
            </h2>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              ASUS routers support multiple access methods for the admin panel. The numeric IP address works universally, while the hostname alias requires local DNS resolution. The ASUS Router App provides a mobile-native alternative that auto-discovers your router without needing an IP address.
            </p>
            <div className="overflow-x-auto rounded-xl border border-white/5">
              <table className="w-full text-xs text-[var(--text-secondary)]">
                <thead>
                  <tr className="bg-blue-500/10 text-blue-300 text-left">
                    <th className="px-4 py-3 font-semibold">Login Address</th>
                    <th className="px-4 py-3 font-semibold">Usage</th>
                    <th className="px-4 py-3 font-semibold">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {loginAddresses.map((row, i) => (
                    <tr
                      key={i}
                      className={
                        i % 2 === 0
                          ? "bg-white/[0.02]"
                          : "bg-white/[0.04]"
                      }
                    >
                      <td className="px-4 py-3 font-mono text-blue-300 font-semibold">
                        {row.address}
                      </td>
                      <td className="px-4 py-3">{row.usage}</td>
                      <td className="px-4 py-3 text-[var(--text-tertiary)]">
                        {row.notes}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-[var(--text-tertiary)] leading-relaxed">
              <Info size={12} className="inline mr-1 text-blue-400" />
              For AiMesh satellite nodes, each node has its own IP address within the 192.168.1.X subnet. Assign static DHCP reservations to each node in the AiMesh settings for consistent access.
            </p>
          </section>

          {/* =============================================================
              THREE VISUAL LOGIN METHODS
              ============================================================= */}
          <section className="space-y-4" aria-label="ASUS Router Login Methods">
            <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
              <Lock size={18} className="text-blue-400" />
              3 Ways to Access Your ASUS Router Admin Panel
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {/* Method 1 */}
              <div className="glass-card p-5 rounded-xl border border-blue-900/20 space-y-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/15 flex items-center justify-center">
                  <Globe size={16} className="text-blue-400" />
                </div>
                <h3 className="text-sm font-bold text-[var(--text-primary)]">
                  Method 1: IP Address
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Type{" "}
                  <Link href="/ips/192-168-1-1" className="text-blue-400 font-mono hover:underline">
                    192.168.1.1
                  </Link>{" "}
                  directly into your browser URL bar. Works on all ASUS routers regardless of VPN or DNS configuration. This is the most reliable access method and functions even if hostname resolution is broken.
                </p>
                {/* Glassmorphic browser mock */}
                <div className="rounded-lg bg-black/30 border border-white/10 overflow-hidden text-[10px]">
                  <div className="flex items-center gap-1.5 px-2 py-1.5 bg-white/5 border-b border-white/10">
                    <span className="w-2 h-2 rounded-full bg-red-400/60" />
                    <span className="w-2 h-2 rounded-full bg-yellow-400/60" />
                    <span className="w-2 h-2 rounded-full bg-green-400/60" />
                  </div>
                  <div className="flex items-center gap-1 px-2 py-1 bg-white/[0.03] border-b border-white/10">
                    <Lock size={8} className="text-green-400" />
                    <span className="font-mono text-green-300">192.168.1.1</span>
                  </div>
                  <div className="px-3 py-3 space-y-1.5">
                    <div className="text-[9px] font-bold text-white/70">ASUS Router Login</div>
                    <div className="flex gap-1">
                      <span className="text-white/40 text-[8px]">Username:</span>
                      <span className="font-mono text-blue-300 text-[8px]">admin</span>
                    </div>
                    <div className="flex gap-1">
                      <span className="text-white/40 text-[8px]">Password:</span>
                      <span className="font-mono text-blue-300 text-[8px]">••••••</span>
                    </div>
                    <div className="mt-1 h-4 w-full rounded bg-blue-500/30 flex items-center justify-center">
                      <span className="text-[8px] text-blue-300 font-semibold">Sign In</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Method 2 */}
              <div className="glass-card p-5 rounded-xl border border-indigo-900/20 space-y-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/15 flex items-center justify-center">
                  <Network size={16} className="text-indigo-400" />
                </div>
                <h3 className="text-sm font-bold text-[var(--text-primary)]">
                  Method 2: Hostname Alias
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Type <strong>router.asus.com</strong> into the URL bar. ASUS resolves this hostname locally to 192.168.1.1 using the router&apos;s built-in DNS. Requires no VPN, no DoH, and direct connection to the ASUS network. Supports HTTPS with ASUS&apos;s self-signed certificate.
                </p>
                <div className="rounded-lg bg-black/30 border border-white/10 overflow-hidden text-[10px]">
                  <div className="flex items-center gap-1.5 px-2 py-1.5 bg-white/5 border-b border-white/10">
                    <span className="w-2 h-2 rounded-full bg-red-400/60" />
                    <span className="w-2 h-2 rounded-full bg-yellow-400/60" />
                    <span className="w-2 h-2 rounded-full bg-green-400/60" />
                  </div>
                  <div className="flex items-center gap-1 px-2 py-1 bg-white/[0.03] border-b border-white/10">
                    <Lock size={8} className="text-green-400" />
                    <span className="font-mono text-green-300">router.asus.com</span>
                  </div>
                  <div className="px-3 py-3 space-y-1.5">
                    <div className="text-[9px] font-bold text-white/70">ASUS Router Login</div>
                    <div className="flex gap-1">
                      <span className="text-white/40 text-[8px]">Username:</span>
                      <span className="font-mono text-indigo-300 text-[8px]">admin</span>
                    </div>
                    <div className="flex gap-1">
                      <span className="text-white/40 text-[8px]">Password:</span>
                      <span className="font-mono text-indigo-300 text-[8px]">••••••</span>
                    </div>
                    <div className="mt-1 h-4 w-full rounded bg-indigo-500/30 flex items-center justify-center">
                      <span className="text-[8px] text-indigo-300 font-semibold">Sign In</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Method 3 */}
              <div className="glass-card p-5 rounded-xl border border-violet-900/20 space-y-3">
                <div className="w-8 h-8 rounded-lg bg-violet-500/15 flex items-center justify-center">
                  <Radio size={16} className="text-violet-400" />
                </div>
                <h3 className="text-sm font-bold text-[var(--text-primary)]">
                  Method 3: ASUS Router App
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Download the free <strong>ASUS Router</strong> app (iOS / Android). It uses mDNS to automatically discover your router on the local network — no IP address required. Also supports remote management via ASUS DDNS when away from home.
                </p>
                <div className="rounded-lg bg-black/30 border border-white/10 overflow-hidden text-[10px] px-3 py-3 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-blue-500/20 flex items-center justify-center">
                      <Radio size={10} className="text-blue-400" />
                    </div>
                    <span className="text-[9px] font-bold text-white/70">ASUS Router</span>
                  </div>
                  <div className="text-[8px] text-white/40">Scanning local network…</div>
                  <div className="flex items-center gap-1.5 bg-white/5 rounded px-2 py-1">
                    <CheckCircle2 size={8} className="text-green-400" />
                    <span className="text-[8px] text-green-300">Router found: RT-AX88U Pro</span>
                  </div>
                  <div className="h-4 w-full rounded bg-violet-500/30 flex items-center justify-center">
                    <span className="text-[8px] text-violet-300 font-semibold">Connect</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* =============================================================
              DEFAULT CREDENTIALS DEEP DIVE
              ============================================================= */}
          <section className="space-y-4" aria-label="ASUS Default Password Details">
            <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
              <Lock size={18} className="text-blue-400" />
              ASUS Router Default Password — Everything You Need to Know
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="glass-card p-5 rounded-xl border border-white/5 space-y-3">
                <h3 className="text-sm font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
                  <Info size={14} className="text-blue-400" />
                  Standard Models
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  For standard ASUS RT-series and most TUF Gaming routers, the factory default login credentials are:
                </p>
                <div className="flex gap-4 text-xs">
                  <div className="bg-white/5 rounded-lg px-4 py-3 text-center flex-1">
                    <div className="text-[10px] text-[var(--text-tertiary)] mb-1">Username</div>
                    <div className="font-mono font-bold text-blue-300 text-sm">admin</div>
                  </div>
                  <div className="bg-white/5 rounded-lg px-4 py-3 text-center flex-1">
                    <div className="text-[10px] text-[var(--text-tertiary)] mb-1">Password</div>
                    <div className="font-mono font-bold text-blue-300 text-sm">admin</div>
                  </div>
                </div>
                <p className="text-xs text-[var(--text-tertiary)] leading-relaxed">
                  These credentials apply at the web admin portal (192.168.1.1) and the ASUS Router App. They do not apply to the Wi-Fi password (SSID Key), which is a separate value unique to each device and printed on the bottom label.
                </p>
              </div>
              <div className="glass-card p-5 rounded-xl border border-white/5 space-y-3">
                <h3 className="text-sm font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
                  <Gamepad2 size={14} className="text-violet-400" />
                  ROG &amp; ZenWiFi Models
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  ROG Rapture and newer ZenWiFi models (AX series and later) enforce a password-creation step during the Quick Internet Setup (QIS) wizard. The router will not grant admin access until a unique password is set. If you skipped setup or forgot the password, a factory reset is the only recovery method.
                </p>
                <div className="text-xs text-[var(--text-secondary)] leading-relaxed space-y-1">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 size={12} className="text-green-400 mt-0.5 shrink-0" />
                    <span>Your custom password set during QIS wizard</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 size={12} className="text-green-400 mt-0.5 shrink-0" />
                    <span>Check your ASUS Router App — it may have cached credentials</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <AlertTriangle size={12} className="text-amber-400 mt-0.5 shrink-0" />
                    <span>If unknown: factory reset is required (5–10 sec RESET hold)</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* =============================================================
              ASUS FIRMWARE UPDATE — DETAILED GUIDE
              ============================================================= */}
          <section className="space-y-4" aria-label="ASUS Firmware Update Guide">
            <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
              <RefreshCw size={18} className="text-blue-400" />
              How to Update ASUS Router Firmware (2 Methods)
            </h2>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Keeping your ASUS router firmware current is critical for security (patching CVEs), stability (fixing memory leaks and Wi-Fi stack bugs), and performance (enabling newer Wi-Fi features like WPA3 support and MLO improvements). ASUS releases firmware updates frequently for popular models. Below are both methods.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {/* OTA Method */}
              <div className="glass-card p-5 rounded-xl border border-green-900/20 space-y-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-7 h-7 rounded-lg bg-green-500/15 flex items-center justify-center">
                    <Globe size={14} className="text-green-400" />
                  </div>
                  <h3 className="text-sm font-bold text-[var(--text-primary)]">
                    Method A: OTA Automatic Update
                  </h3>
                </div>
                <ol className="space-y-2 text-xs text-[var(--text-secondary)] list-decimal pl-4">
                  <li>Log in to the admin panel at <code className="text-green-300">192.168.1.1</code></li>
                  <li>Navigate to <strong>Administration</strong> &rarr; <strong>Firmware Upgrade</strong></li>
                  <li>Click <strong>&ldquo;Check&rdquo;</strong> to query the ASUS update servers</li>
                  <li>If a newer version is available, click <strong>&ldquo;Update Now&rdquo;</strong></li>
                  <li>Wait 3–5 minutes. Do <em>not</em> power off or refresh the page</li>
                  <li>Router will automatically reboot after successful flash</li>
                </ol>
                <div className="text-[10px] text-green-300/80 bg-green-500/5 rounded-lg px-3 py-2">
                  <strong>Best for:</strong> Most users. Requires active internet connection on the WAN port.
                </div>
              </div>
              {/* Manual Method */}
              <div className="glass-card p-5 rounded-xl border border-amber-900/20 space-y-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-7 h-7 rounded-lg bg-amber-500/15 flex items-center justify-center">
                    <FileText size={14} className="text-amber-400" />
                  </div>
                  <h3 className="text-sm font-bold text-[var(--text-primary)]">
                    Method B: Manual Firmware Upload
                  </h3>
                </div>
                <ol className="space-y-2 text-xs text-[var(--text-secondary)] list-decimal pl-4">
                  <li>Visit <strong>asus.com/support</strong>, search your exact router model</li>
                  <li>Match the <strong>Hardware Version</strong> (printed on bottom label, e.g., &ldquo;Ver 1.0&rdquo;)</li>
                  <li>Download the <code className="text-amber-300">.trx</code> or <code className="text-amber-300">.pkgtb</code> firmware file</li>
                  <li>Go to <strong>Administration</strong> &rarr; <strong>Firmware Upgrade</strong> &rarr; <strong>Manual</strong></li>
                  <li>Select the downloaded file and click <strong>&ldquo;Upload&rdquo;</strong></li>
                  <li>Do <em>not</em> interrupt power during the 3–5 minute flash process</li>
                </ol>
                <div className="text-[10px] text-amber-300/80 bg-amber-500/5 rounded-lg px-3 py-2">
                  <strong>Best for:</strong> Specific version pinning or offline environments. Hardware version must match exactly.
                </div>
              </div>
            </div>
            <div className="glass-card p-4 rounded-xl border border-red-900/20 bg-red-950/5 flex items-start gap-3">
              <AlertTriangle size={16} className="text-red-400 shrink-0 mt-0.5" />
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                <strong className="text-red-400">Never cut power during a firmware upgrade.</strong> A failed flash can corrupt the boot partition and brick the router. If this happens, use ASUS Rescue Mode: hold the Reset button while powering on, then use a wired PC at 192.168.1.1 to reflash via the emergency firmware restoration tool.
              </p>
            </div>
          </section>

          {/* =============================================================
              AIMESH — WHOLE HOME MESH SETUP
              ============================================================= */}
          <section className="space-y-4" aria-label="ASUS AiMesh Setup Guide">
            <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
              <Network size={18} className="text-blue-400" />
              ASUS AiMesh: Whole-Home Wi-Fi Mesh Setup Guide
            </h2>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              AiMesh is ASUS&apos;s proprietary mesh networking standard that transforms compatible ASUS routers into a single unified network. Its key advantage over competing mesh systems is cross-model compatibility — you can pair an RT-AX88U with a ZenWiFi AX node, or any other AiMesh-certified combination, without needing a matched set. This lets you reuse existing ASUS hardware as mesh nodes when upgrading your primary router.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                  AiMesh Setup Steps
                </h3>
                <ol className="space-y-2 text-xs text-[var(--text-secondary)] list-decimal pl-4">
                  <li>
                    <strong>Factory reset the node router</strong> (the secondary unit) by holding its Reset button for 10 seconds.
                  </li>
                  <li>
                    <strong>Log in to the main router</strong> at 192.168.1.1 and navigate to <strong>AiMesh</strong> in the left sidebar.
                  </li>
                  <li>
                    <strong>Power on the node router</strong> near the main router (within 3–5 feet for pairing) and wait for it to appear in the AiMesh device list.
                  </li>
                  <li>
                    <strong>Click &ldquo;Add&rdquo;</strong> next to the discovered node and confirm pairing. The main router will push its SSID, password, and network config to the node.
                  </li>
                  <li>
                    <strong>Choose backhaul type:</strong> Connect an Ethernet cable between the routers (wired backhaul, recommended) or leave wireless backhaul enabled for a cable-free deployment.
                  </li>
                  <li>
                    <strong>Relocate the node</strong> to its permanent position — midway between the main router and your dead zone for optimal coverage overlap.
                  </li>
                </ol>
              </div>
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                  AiMesh Best Practices
                </h3>
                <div className="space-y-2">
                  {[
                    {
                      icon: <CheckCircle2 size={13} className="text-green-400 shrink-0" />,
                      text: "Use wired Ethernet backhaul whenever possible — wireless backhaul halves available throughput on the backhaul band.",
                    },
                    {
                      icon: <CheckCircle2 size={13} className="text-green-400 shrink-0" />,
                      text: "Update all AiMesh nodes to the same firmware version for consistent performance and feature parity.",
                    },
                    {
                      icon: <CheckCircle2 size={13} className="text-green-400 shrink-0" />,
                      text: "Enable roaming assist under Wireless > Roaming Assist (set threshold to -70dBm) so devices hand off cleanly between nodes.",
                    },
                    {
                      icon: <CheckCircle2 size={13} className="text-green-400 shrink-0" />,
                      text: "Keep all nodes on the same SSID with identical security settings so mobile devices roam automatically.",
                    },
                    {
                      icon: <AlertTriangle size={13} className="text-amber-400 shrink-0" />,
                      text: "Mixing AiMesh with non-ASUS routers is not supported — all AiMesh nodes must be certified ASUS hardware.",
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-[var(--text-secondary)]">
                      {item.icon}
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* =============================================================
              AIPROTECTION SECURITY GUIDE
              ============================================================= */}
          <section className="space-y-4" aria-label="ASUS AiProtection Guide">
            <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
              <Shield size={18} className="text-blue-400" />
              ASUS AiProtection: Network-Level Threat Defense
            </h2>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              AiProtection is a commercial-grade network security engine built into all modern ASUS routers and powered by Trend Micro&apos;s threat intelligence platform. Unlike antivirus software that runs on individual devices, AiProtection operates at the router level, screening all inbound and outbound traffic for the entire network simultaneously — including smart home devices, IoT sensors, and guest devices that cannot run endpoint protection software themselves.
            </p>
            <div className="grid md:grid-cols-3 gap-3">
              {[
                {
                  icon: <Search size={16} className="text-blue-400" />,
                  title: "Router Security Assessment",
                  desc: "Scans your router configuration for known vulnerabilities: weak admin passwords, outdated firmware, open WAN management ports, and disabled firewall rules. Provides a scored security checklist.",
                  color: "blue",
                },
                {
                  icon: <Globe size={16} className="text-red-400" />,
                  title: "Malicious Sites Blocking",
                  desc: "Intercepts DNS queries destined for malware distribution servers, phishing domains, ransomware command-and-control (C2) infrastructure, and exploit kit landing pages before they can load in any browser on your network.",
                  color: "red",
                },
                {
                  icon: <Shield size={16} className="text-green-400" />,
                  title: "Two-Way IPS",
                  desc: "Deep packet inspection engine that analyzes both inbound exploit attempts targeting your devices and outbound traffic from potentially compromised devices attempting to reach botnet controllers or exfiltrate data.",
                  color: "green",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="glass-card p-4 rounded-xl border border-white/5 space-y-2"
                >
                  <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <h3 className="text-xs font-bold text-[var(--text-primary)]">
                    {item.title}
                  </h3>
                  <p className="text-[10px] text-[var(--text-secondary)] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              To enable AiProtection: log in to 192.168.1.1, navigate to <strong>AiProtection</strong> in the left sidebar, and toggle on <strong>Network Protection</strong>. Accept the Trend Micro Data Collection Agreement to activate the real-time signature feeds. AiProtection is available at no subscription cost on supported ASUS routers.
            </p>
          </section>

          {/* =============================================================
              ADAPTIVE QOS & GAMING OPTIMIZATION
              ============================================================= */}
          <section className="space-y-4" aria-label="ASUS Gaming Optimization Guide">
            <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
              <Gamepad2 size={18} className="text-blue-400" />
              ASUS Gaming Optimization: Adaptive QoS, Game Boost &amp; WTFast
            </h2>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              ASUS routers — particularly the ROG Rapture and TUF Gaming series — include the most comprehensive gaming optimization toolkit of any consumer router brand. Understanding and correctly configuring these features can dramatically reduce in-game latency, eliminate jitter, and stabilize your connection during peak network congestion periods.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {/* Adaptive QoS */}
              <div className="glass-card p-5 rounded-xl border border-blue-900/20 space-y-3">
                <div className="flex items-center gap-2">
                  <Sliders size={15} className="text-blue-400" />
                  <h3 className="text-sm font-bold text-[var(--text-primary)]">
                    Adaptive QoS — Traffic Prioritization
                  </h3>
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Adaptive QoS uses deep packet inspection (DPI) to classify every network flow by application type: Gaming, Media Streaming, Web Surfing, File Transfers, etc. It then dynamically allocates bandwidth queue priority so that game packets (typically small UDP datagrams to game servers) are never delayed behind large file downloads or video streams.
                </p>
                <div className="space-y-1.5 text-xs">
                  <div className="text-[10px] text-[var(--text-tertiary)] uppercase tracking-wide font-semibold">Priority Queue Order</div>
                  {["Gaming (UDP priority)", "Media Streaming", "Web / VoIP", "File Transfers", "Background / P2P"].map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div
                        className="h-1.5 rounded-full bg-blue-400"
                        style={{ width: `${100 - i * 18}%`, opacity: 1 - i * 0.15 }}
                      />
                      <span className="text-[10px] text-[var(--text-secondary)] shrink-0">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="text-[10px] text-blue-300/80 bg-blue-500/5 rounded-lg px-3 py-2">
                  Enable at: <strong>Adaptive QoS</strong> &rarr; <strong>QoS</strong> &rarr; Select <strong>Game Boost</strong> mode
                </div>
              </div>

              {/* WTFast */}
              <div className="glass-card p-5 rounded-xl border border-violet-900/20 space-y-3">
                <div className="flex items-center gap-2">
                  <TrendingUp size={15} className="text-violet-400" />
                  <h3 className="text-sm font-bold text-[var(--text-primary)]">
                    WTFast — Game Server Route Optimization
                  </h3>
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  WTFast (available on ROG Rapture routers) operates at the WAN routing level rather than the LAN queue level. It reroutes your game traffic through WTFast&apos;s global private backbone — a network of game-optimized servers positioned closer to major game server clusters worldwide — replacing the default BGP internet path with a lower-latency private tunnel.
                </p>
                <div className="space-y-2 text-xs text-[var(--text-secondary)]">
                  {[
                    "Works at router level — protects all game devices simultaneously",
                    "Supports 1,000+ games including Valorant, Apex, Warzone, FFXIV",
                    "Displays real-time latency comparison: before vs. after WTFast",
                    "Available on ROG Rapture GT series — requires WTFast account",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <ChevronRight size={12} className="text-violet-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <div className="text-[10px] text-violet-300/80 bg-violet-500/5 rounded-lg px-3 py-2">
                  Enable at: <strong>Game Acceleration</strong> &rarr; <strong>Game Boost</strong> tab &rarr; <strong>WTFast Settings</strong>
                </div>
              </div>
            </div>
          </section>

          {/* =============================================================
              ASUS WI-FI CONFIGURATION
              ============================================================= */}
          <section className="space-y-4" aria-label="ASUS Wi-Fi Configuration Guide">
            <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
              <Wifi size={18} className="text-blue-400" />
              How to Change ASUS Wi-Fi Name and Password
            </h2>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Changing your Wi-Fi credentials is one of the most common admin panel tasks. The procedure is identical across all modern ASUS routers running ASUSWRT. After changing the SSID or password, all currently connected devices will be disconnected and must re-authenticate using the new credentials.
            </p>
            <div className="glass-card rounded-xl border border-white/5 overflow-hidden">
              <div className="bg-blue-500/10 px-4 py-2.5 border-b border-white/5">
                <span className="text-xs font-semibold text-blue-300">
                  Step-by-Step: Change SSID and Wi-Fi Password
                </span>
              </div>
              <div className="divide-y divide-white/5">
                {[
                  {
                    step: "1",
                    action: "Login",
                    detail: "Open browser and go to 192.168.1.1. Enter admin credentials.",
                  },
                  {
                    step: "2",
                    action: "Navigate to Wireless",
                    detail: "Click on Wireless in the left navigation sidebar.",
                  },
                  {
                    step: "3",
                    action: "Select Band",
                    detail: "Choose 2.4GHz or 5GHz tab depending on which band you want to modify.",
                  },
                  {
                    step: "4",
                    action: "Set SSID",
                    detail: "In the Network Name (SSID) field, type your new Wi-Fi name (up to 32 characters).",
                  },
                  {
                    step: "5",
                    action: "Set Security",
                    detail: "Select Authentication Method: WPA3-Personal (recommended) or WPA2-Personal for legacy device compatibility.",
                  },
                  {
                    step: "6",
                    action: "Set Password",
                    detail: "Type a strong passphrase (12+ characters, mix of letters, numbers, and symbols) in the WPA Pre-Shared Key field.",
                  },
                  {
                    step: "7",
                    action: "Apply",
                    detail: "Click Apply at the bottom. The router will broadcast the new SSID immediately. Reconnect all devices.",
                  },
                ].map((row, i) => (
                  <div key={i} className="flex items-start gap-3 px-4 py-3">
                    <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-bold flex items-center justify-center shrink-0">
                      {row.step}
                    </span>
                    <div>
                      <span className="text-xs font-semibold text-[var(--text-primary)]">
                        {row.action}
                      </span>
                      <span className="text-xs text-[var(--text-secondary)] ml-2">
                        — {row.detail}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* =============================================================
              ASUS VPN CONFIGURATION
              ============================================================= */}
          <section className="space-y-4" aria-label="ASUS VPN Configuration">
            <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
              <Server size={18} className="text-blue-400" />
              ASUS VPN Server &amp; VPN Fusion Configuration
            </h2>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              ASUS routers include a built-in VPN server that supports OpenVPN and WireGuard protocols, allowing you to create an encrypted tunnel back to your home network from anywhere. ROG Rapture models additionally support VPN Fusion — a feature unique to ASUS that allows VPN and non-VPN traffic to coexist simultaneously by routing specific devices or applications through the VPN while others use the regular ISP connection.
            </p>
            <div className="grid md:grid-cols-3 gap-3">
              {[
                {
                  title: "OpenVPN Server",
                  icon: <Lock size={14} className="text-blue-400" />,
                  steps: [
                    "Go to VPN > VPN Server > OpenVPN",
                    "Enable the OpenVPN server",
                    "Download the .ovpn client configuration file",
                    "Import into OpenVPN client on remote devices",
                    "Use ASUS DDNS for dynamic home IP resolution",
                  ],
                  note: "Best for: Legacy clients, full device encryption",
                },
                {
                  title: "WireGuard Server",
                  icon: <Zap size={14} className="text-green-400" />,
                  steps: [
                    "Go to VPN > VPN Server > WireGuard",
                    "Enable WireGuard and set listen port",
                    "Generate keypair and export client config",
                    "Import config into WireGuard client app",
                    "WireGuard is faster and uses less CPU",
                  ],
                  note: "Best for: Speed, modern devices, low latency",
                },
                {
                  title: "VPN Fusion (ROG)",
                  icon: <Layers size={14} className="text-violet-400" />,
                  steps: [
                    "Go to VPN > VPN Fusion",
                    "Add your commercial VPN provider credentials",
                    "Select which devices or SSIDs use the VPN",
                    "Other devices continue using the normal ISP",
                    "Game on a clean connection while streaming via VPN",
                  ],
                  note: "Best for: Selective VPN routing on ROG models",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="glass-card p-4 rounded-xl border border-white/5 space-y-3"
                >
                  <div className="flex items-center gap-2">
                    {item.icon}
                    <h3 className="text-xs font-bold text-[var(--text-primary)]">
                      {item.title}
                    </h3>
                  </div>
                  <ul className="space-y-1">
                    {item.steps.map((s, j) => (
                      <li key={j} className="flex items-start gap-1.5 text-[10px] text-[var(--text-secondary)]">
                        <ArrowRight size={10} className="shrink-0 mt-0.5 text-[var(--text-tertiary)]" />
                        {s}
                      </li>
                    ))}
                  </ul>
                  <div className="text-[10px] text-[var(--text-tertiary)] bg-white/[0.03] rounded px-2 py-1.5">
                    {item.note}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* =============================================================
              WI-FI 6 AND WI-FI 7 ON ASUS
              ============================================================= */}
          <section className="space-y-4" aria-label="ASUS Wi-Fi 6 and Wi-Fi 7 Guide">
            <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
              <Cpu size={18} className="text-blue-400" />
              ASUS Wi-Fi 6, Wi-Fi 6E &amp; Wi-Fi 7: Technology Breakdown
            </h2>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              ASUS has been at the forefront of each Wi-Fi standard transition, launching flagship RT and ROG hardware ahead of the market in every generation. Understanding the generational differences helps you select the right ASUS router for your specific bandwidth, latency, and coverage requirements.
            </p>
            <div className="overflow-x-auto rounded-xl border border-white/5">
              <table className="w-full text-xs text-[var(--text-secondary)]">
                <thead>
                  <tr className="bg-blue-500/10 text-blue-300 text-left">
                    <th className="px-4 py-3 font-semibold">Standard</th>
                    <th className="px-4 py-3 font-semibold">Max Speed</th>
                    <th className="px-4 py-3 font-semibold">Key Feature</th>
                    <th className="px-4 py-3 font-semibold">ASUS Models</th>
                    <th className="px-4 py-3 font-semibold">Best For</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      std: "Wi-Fi 6 (802.11ax)",
                      speed: "9.6 Gbps",
                      feature: "OFDMA, MU-MIMO, TWT",
                      models: "RT-AX88U Pro, RT-AX86U Pro, TUF-AX6000",
                      use: "Dense home networks, streaming, gaming",
                    },
                    {
                      std: "Wi-Fi 6E",
                      speed: "10.8 Gbps",
                      feature: "6GHz band, 1,200MHz spectrum",
                      models: "RT-AXE7800, ROG GT-AXE16000, ZenWiFi Pro ET12",
                      use: "Low-congestion gaming, 4K/8K streaming",
                    },
                    {
                      std: "Wi-Fi 7 (802.11be)",
                      speed: "46 Gbps (theoretical)",
                      feature: "MLO, 320MHz channels, 4K-QAM",
                      models: "GT-BE98 Pro, RT-BE96U, ZenWiFi BQ16 Pro",
                      use: "Ultra-low latency, future-proofing",
                    },
                  ].map((row, i) => (
                    <tr
                      key={i}
                      className={i % 2 === 0 ? "bg-white/[0.02]" : "bg-white/[0.04]"}
                    >
                      <td className="px-4 py-3 font-semibold text-blue-300">{row.std}</td>
                      <td className="px-4 py-3 font-mono">{row.speed}</td>
                      <td className="px-4 py-3">{row.feature}</td>
                      <td className="px-4 py-3 text-[var(--text-tertiary)]">{row.models}</td>
                      <td className="px-4 py-3">{row.use}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* =============================================================
              ASUS MODEL LOOKUP
              ============================================================= */}
          <section className="space-y-4" aria-label="ASUS Router Model Lookup">
            <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
              <Search size={18} className="text-blue-400" />
              ASUS Router Model Lookup — 2024/2025 Lineup
            </h2>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Use this reference to identify your ASUS router model, its Wi-Fi generation, speed rating, and standout feature. The model number and hardware version are printed on the label on the underside of your router — use both when downloading firmware to ensure exact compatibility.
            </p>
            <div className="overflow-x-auto rounded-xl border border-white/5">
              <table className="w-full text-xs text-[var(--text-secondary)]">
                <thead>
                  <tr className="bg-blue-500/10 text-blue-300 text-left">
                    <th className="px-4 py-3 font-semibold">Model</th>
                    <th className="px-4 py-3 font-semibold">Standard</th>
                    <th className="px-4 py-3 font-semibold">Speed Rating</th>
                    <th className="px-4 py-3 font-semibold">Highlight</th>
                  </tr>
                </thead>
                <tbody>
                  {asusModels.map((m, i) => (
                    <tr
                      key={i}
                      className={i % 2 === 0 ? "bg-white/[0.02]" : "bg-white/[0.04]"}
                    >
                      <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">
                        {m.model}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${
                            m.standard === "Wi-Fi 7"
                              ? "bg-violet-500/20 text-violet-300"
                              : m.standard === "Wi-Fi 6E"
                              ? "bg-blue-500/20 text-blue-300"
                              : "bg-green-500/20 text-green-300"
                          }`}
                        >
                          {m.standard}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-mono text-[var(--text-secondary)]">
                        {m.speed}
                      </td>
                      <td className="px-4 py-3 text-[var(--text-secondary)]">
                        {m.highlight}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* =============================================================
              ASUS ERROR CODES MATRIX
              ============================================================= */}
          <section className="space-y-4" aria-label="ASUS Router Error Codes">
            <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
              <AlertTriangle size={18} className="text-amber-400" />
              ASUS Router Error Codes &amp; Troubleshooting Matrix
            </h2>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              ASUS routers surface error states through the Network Map dashboard, system logs, and LED indicator patterns. The table below maps the most common error conditions to their root causes and actionable resolutions. For detailed system event logs, navigate to <strong>Administration &rarr; System Log</strong> in the ASUS admin panel.
            </p>
            <div className="overflow-x-auto rounded-xl border border-white/5">
              <table className="w-full text-xs text-[var(--text-secondary)]">
                <thead>
                  <tr className="bg-amber-500/10 text-amber-300 text-left">
                    <th className="px-4 py-3 font-semibold">Error / Symptom</th>
                    <th className="px-4 py-3 font-semibold">Meaning</th>
                    <th className="px-4 py-3 font-semibold">Resolution</th>
                  </tr>
                </thead>
                <tbody>
                  {errorCodes.map((row, i) => (
                    <tr
                      key={i}
                      className={i % 2 === 0 ? "bg-white/[0.02]" : "bg-white/[0.04]"}
                    >
                      <td className="px-4 py-3 font-semibold text-amber-300">
                        {row.error}
                      </td>
                      <td className="px-4 py-3">{row.meaning}</td>
                      <td className="px-4 py-3 text-[var(--text-secondary)]">
                        {row.fix}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* =============================================================
              ASUS FACTORY RESET — COMPLETE GUIDE
              ============================================================= */}
          <section className="space-y-4" aria-label="ASUS Factory Reset Guide">
            <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
              <RefreshCw size={18} className="text-blue-400" />
              How to Factory Reset an ASUS Router
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="glass-card p-5 rounded-xl border border-white/5 space-y-3">
                <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                  Method 1: Physical Reset Button (Recommended)
                </h3>
                <ol className="space-y-2 text-xs text-[var(--text-secondary)] list-decimal pl-4">
                  <li>Ensure the router is powered on (power LED solid).</li>
                  <li>Locate the RESET pinhole on the rear panel — usually labelled &ldquo;Reset&rdquo;.</li>
                  <li>Insert a paperclip or SIM ejector pin into the pinhole and press firmly.</li>
                  <li>Hold for <strong>5–10 seconds</strong> until the power LED blinks rapidly or all LEDs flash.</li>
                  <li>Release the button and wait 30–60 seconds for the router to fully reboot.</li>
                  <li>Router is now at factory defaults: username <code>admin</code>, password <code>admin</code>.</li>
                </ol>
              </div>
              <div className="glass-card p-5 rounded-xl border border-white/5 space-y-3">
                <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                  Method 2: Software Reset via Admin Panel
                </h3>
                <ol className="space-y-2 text-xs text-[var(--text-secondary)] list-decimal pl-4">
                  <li>Log in to 192.168.1.1 with your admin credentials.</li>
                  <li>Navigate to <strong>Administration</strong> &rarr; <strong>Factory Default</strong>.</li>
                  <li>Click <strong>&ldquo;Restore&rdquo;</strong> and confirm the action in the popup dialog.</li>
                  <li>The router will immediately begin the reset process and reboot.</li>
                  <li>Wait 60–90 seconds for the process to complete before reconnecting.</li>
                  <li>Use this method when you have admin access and want a clean restore without physically accessing the router hardware.</li>
                </ol>
              </div>
            </div>
            <div className="glass-card p-4 rounded-xl border border-amber-900/20 bg-amber-950/5 flex items-start gap-3">
              <Info size={16} className="text-amber-400 shrink-0 mt-0.5" />
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                <strong className="text-amber-400">Before resetting:</strong> Export your current configuration file via Administration &rarr; Restore/Save/Upload Setting &rarr; Save Setting. This .CFG backup file lets you restore all your custom settings (SSID, port forwards, VPN configs) after the reset without re-entering everything manually.
              </p>
            </div>
          </section>

          {/* =============================================================
              ASUS VS TP-LINK COMPARISON TABLE
              ============================================================= */}
          <section className="space-y-4" aria-label="ASUS vs TP-Link Comparison">
            <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
              <Gauge size={18} className="text-blue-400" />
              ASUS vs. TP-Link: Detailed Feature Comparison
            </h2>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Both ASUS and TP-Link are leading global router brands with strong consumer and enthusiast offerings. The choice between them depends on your priorities: ASUS excels in gaming features, raw performance, and advanced firmware capabilities, while TP-Link offers broader value-tier coverage and a simpler management experience through the Tether app. The comparison below covers key differentiators across the product lineups.
            </p>
            <div className="overflow-x-auto rounded-xl border border-white/5">
              <table className="w-full text-xs text-[var(--text-secondary)]">
                <thead>
                  <tr className="bg-white/5 text-left">
                    <th className="px-4 py-3 font-semibold text-[var(--text-primary)]">Feature</th>
                    <th className="px-4 py-3 font-semibold text-blue-300">
                      ASUS
                    </th>
                    <th className="px-4 py-3 font-semibold text-green-300">
                      TP-Link
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr
                      key={i}
                      className={i % 2 === 0 ? "bg-white/[0.02]" : "bg-white/[0.04]"}
                    >
                      <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">
                        {row.feature}
                      </td>
                      <td className="px-4 py-3 text-blue-200">{row.asus}</td>
                      <td className="px-4 py-3 text-green-200">{row.tplink}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              For competitive gamers and power users who want maximum control over routing, QoS, VPN, and security, ASUS is generally the stronger choice. For family home networks, budget builds, and users who prefer a simple Tether app experience, TP-Link delivers excellent value. Both brands offer strong Wi-Fi 7 hardware as of 2025. See also:{" "}
              <Link href="/routers/tp-link" className="text-blue-400 hover:underline">
                TP-Link Router Hub
              </Link>{" "}
              for the complete TP-Link guide.
            </p>
          </section>

          {/* =============================================================
              ASUS PARENTAL CONTROLS AND GUEST NETWORK
              ============================================================= */}
          <section className="space-y-4" aria-label="ASUS Parental Controls and Guest Network">
            <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
              <HelpCircle size={18} className="text-blue-400" />
              ASUS Parental Controls &amp; Guest Network Configuration
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="glass-card p-5 rounded-xl border border-white/5 space-y-3">
                <h3 className="text-sm font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
                  <Shield size={14} className="text-blue-400" />
                  Parental Controls (AiProtection)
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  ASUS offers two layers of parental controls: Time Scheduling (blocks internet access for specific devices during set hours) and URL Filter (blocks access to specific domains or content categories). For comprehensive filtering, AiProtection&apos;s Web &amp; Apps Filter provides Trend Micro&apos;s curated category blocks including Adult Content, Violence, Gambling, and Social Media.
                </p>
                <div className="space-y-1.5 text-xs">
                  <div className="text-[10px] text-[var(--text-tertiary)] uppercase tracking-wide font-semibold">Setup Path</div>
                  {[
                    "AiProtection > Parental Controls",
                    "Add device by MAC address or hostname",
                    "Set time block schedule (e.g., 10PM–7AM)",
                    "Enable content category filters",
                    "Block specific URLs via URL Filter",
                  ].map((step, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <ChevronRight size={10} className="text-blue-400 shrink-0" />
                      <span className="text-[10px] text-[var(--text-secondary)]">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="glass-card p-5 rounded-xl border border-white/5 space-y-3">
                <h3 className="text-sm font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
                  <Wifi size={14} className="text-blue-400" />
                  Guest Network Setup
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  ASUS guest networks create an isolated SSID for visitors that cannot access your primary LAN devices (NAS, smart home hub, printers). Up to 3 guest networks can be created per band (2.4GHz and 5GHz). You can additionally restrict guest devices from accessing each other (client isolation) and set bandwidth limits per guest network to prevent guests from saturating your connection.
                </p>
                <div className="space-y-1.5 text-xs">
                  <div className="text-[10px] text-[var(--text-tertiary)] uppercase tracking-wide font-semibold">Setup Path</div>
                  {[
                    "Wireless > Guest Network",
                    "Enable Guest Network on 2.4GHz or 5GHz",
                    "Set unique SSID and password",
                    "Enable 'Access Intranet: Disable' for LAN isolation",
                    "Set bandwidth limit (e.g., 20Mbps upload/download cap)",
                  ].map((step, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <ChevronRight size={10} className="text-blue-400 shrink-0" />
                      <span className="text-[10px] text-[var(--text-secondary)]">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* =============================================================
              RELATED RESOURCES
              ============================================================= */}
          <section className="space-y-4" aria-label="Related Router Resources">
            <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
              <Star size={18} className="text-blue-400" />
              Related Router Guides &amp; Resources
            </h2>
            <div className="grid md:grid-cols-2 gap-3">
              {[
                {
                  href: "/ips/192-168-1-1",
                  label: "192.168.1.1 — ASUS Default Gateway",
                  desc: "Complete guide to accessing and troubleshooting the 192.168.1.1 login page.",
                },
                {
                  href: "/routers/tp-link",
                  label: "TP-Link Router Hub",
                  desc: "Complete TP-Link login, password reset, firmware, and troubleshooting guide.",
                },
                {
                  href: "/wifi-6-for-gaming",
                  label: "Wi-Fi 6 for Gaming",
                  desc: "How OFDMA and MU-MIMO in Wi-Fi 6 reduce gaming latency and improve congestion handling.",
                },
                {
                  href: "/wifi-7-for-gaming",
                  label: "Wi-Fi 7 for Gaming",
                  desc: "MLO, 320MHz channels, and 4K-QAM explained for ultra-low latency gaming setups.",
                },
                {
                  href: "/best-router-for-gaming",
                  label: "Best Router for Gaming",
                  desc: "Expert-ranked gaming routers including ASUS ROG and RT-series recommendations.",
                },
                {
                  href: "/routers",
                  label: "Router Brand Index",
                  desc: "Browse all supported router brands with login guides, default passwords, and setup help.",
                },
              ].map((link, i) => (
                <Link
                  key={i}
                  href={link.href}
                  className="glass-card flex items-start gap-3 p-4 rounded-xl border border-white/5 hover:border-blue-500/30 hover:bg-blue-500/5 transition-all group"
                >
                  <ChevronRight
                    size={14}
                    className="text-blue-400 shrink-0 mt-0.5 group-hover:translate-x-0.5 transition-transform"
                  />
                  <div>
                    <div className="text-xs font-semibold text-[var(--text-primary)] group-hover:text-blue-300 transition-colors">
                      {link.label}
                    </div>
                    <div className="text-[10px] text-[var(--text-tertiary)] mt-0.5 leading-relaxed">
                      {link.desc}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

        </div>
      </TroubleshootingArticleShell>
    </>
  );
}
