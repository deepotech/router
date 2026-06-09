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
  Star,
  Radio,
} from "lucide-react";

// =============================================================
// Premium SEO Metadata
// =============================================================

export const metadata: Metadata = buildMetadata({
  title: "Tenda Router Login, Password, Reset & Setup Guide (2026)",
  description:
    "Learn how to log in to Tenda routers and Nova mesh systems at 192.168.0.1 or tendawifi.com. Find default passwords, LED meanings, setup guides, and troubleshooting steps.",
  canonical: "/routers/tenda",
  keywords: [
    "tenda router login",
    "tenda login",
    "tenda wifi login",
    "tenda router password",
    "tendawifi.com",
    "192.168.0.1 tenda",
    "tenda router setup",
    "tenda router reset",
    "tenda default password",
    "tenda admin login",
    "tenda nova setup",
    "tenda led lights",
  ],
});

// =============================================================
// Breadcrumbs
// =============================================================

const breadcrumbs = [
  { name: "Routers", url: "/routers" },
  { name: "Tenda", url: "/routers/tenda" },
];

// =============================================================
// Root Causes for Tenda Issues
// =============================================================

const commonCauses = [
  {
    title: "Secure DNS (DoH) Redirect Blocking",
    desc: "Modern browsers with secure DNS enabled bypass the router's local DNS resolver. This prevents the hostname alias tendawifi.com from resolving to the local gateway IP (192.168.0.1), resulting in connection timeout errors.",
  },
  {
    title: "IP Subnet Conflict with Primary Modem",
    desc: "If your Tenda router is connected to a primary ISP gateway that also uses the 192.168.0.X subnet, an IP conflict occurs. The Tenda router will fail to route traffic or load its management page until its LAN IP is shifted to 192.168.1.1 or 192.168.2.1.",
  },
  {
    title: "DHCP Lease Pool Exhaustion",
    desc: "Legacy Tenda AC-series routers occasionally experience DHCP daemon hangs, preventing new wireless clients from acquiring a local IP address (clients get stuck at 'Obtaining IP Address' or self-assign a 169.254.X.X address).",
  },
  {
    title: "Nova Mesh Node Disconnection",
    desc: "Secondary Tenda Nova mesh nodes can lose sync due to high physical obstacles or excessive distance from the primary node. This causes a blinking red LED and packet drops for connected devices.",
  },
];

// =============================================================
// Quick Fix Checklist
// =============================================================

const quickFixChecklist = [
  "Confirm your device is connected to the Tenda Wi-Fi network (SSID) or a LAN port on the back of the router.",
  "Enter http://192.168.0.1 or http://tendawifi.com directly into your browser's address bar. Do not enter it in a Google search box.",
  "Disable any active VPN clients or browser proxy extensions, as they route local traffic through remote servers.",
  "Check the hardware label on the underside of your Tenda router for the default Wi-Fi password (SSID Key) and default login credentials.",
  "Power-cycle the Tenda router by unplugging it from power for 30 seconds and plugging it back in.",
  "If the custom login password is unknown, hold the physical RST/WPS button for 8–10 seconds to restore factory defaults.",
];

// =============================================================
// Diagnostic Steps
// =============================================================

const troubleshootingSteps = [
  {
    title: "Verify Network-Layer Connection to Tenda Gateway",
    description:
      "Connect your PC or smartphone to the Tenda router's Wi-Fi network (SSID) or plug an Ethernet cable into one of the LAN ports (often yellow). Open Command Prompt (Windows) and run 'ipconfig' or Terminal (macOS/Linux) and run 'ip route'. Verify your default gateway shows 192.168.0.1 or 192.168.1.1. If you see an APIPA IP address (169.254.X.X), the router is not issuing DHCP leases; restart the router.",
    tip: "You can force your device to acquire a new IP address by running 'ipconfig /release' then 'ipconfig /renew' in Windows.",
  },
  {
    title: "Access Tenda Web Administration Panel",
    description:
      "Open your web browser (preferably Chrome, Edge, or Safari) in Private or Incognito mode to bypass cached DNS redirects. Type 'http://192.168.0.1' or 'http://tendawifi.com' in the URL bar and press Enter. If you are connected to a customized ISP unit, the gateway IP might be configured as 'http://192.168.1.1' instead.",
    tip: "If tendawifi.com loads a generic search engine or fails to connect, type 192.168.0.1 directly. This bypasses local DNS translation bugs.",
  },
  {
    title: "Authenticate with Admin Password",
    description:
      "Enter your router admin password on the login screen. For older Tenda routers, the default username and password are 'admin' / 'admin'. For newer Tenda routers (including AC and RX series), there is no default password; you created a custom password during the initial setup. If the password is forgotten, you must perform a factory reset.",
    tip: "On Tenda Nova mesh networks, management is done exclusively through the 'Tenda WiFi' mobile app. Auto-discovery will connect to your Nova cluster once your phone is on the Nova Wi-Fi.",
  },
  {
    title: "Verify WAN Status and Settings",
    description:
      "Once logged in, check the internet connection status on the home dashboard. A green status line confirms connectivity. If WAN shows disconnected, click on 'Internet Settings' and select the appropriate connection type (usually Dynamic IP for standard modems, or PPPoE if your ISP requires a username and password). Enter your ISP credentials if using PPPoE and click Connect.",
    tip: "If your primary modem is also a router on the 192.168.0.X subnet, change the Tenda's LAN IP under Administration > LAN Settings to 192.168.2.1 to avoid IP address conflicts.",
  },
];

// =============================================================
// FAQ Q&A Data (10 Detailed Questions)
// =============================================================

const faqs = [
  {
    question: "What is the default IP address for Tenda routers?",
    answer:
      "The default IP address for most Tenda routers is 192.168.0.1. Tenda also provides a local domain hostname: http://tendawifi.com. However, if the router is configured behind another modem-router gateway, it might automatically change its own IP to 192.168.1.1 or 192.168.2.1 to prevent subnet conflicts. Always verify your default gateway using 'ipconfig' (Windows) if 192.168.0.1 does not load.",
  },
  {
    question: "What is the default admin username and password for Tenda routers?",
    answer:
      "On older Tenda models, the default username is 'admin' and the default password is 'admin' (all lowercase). On newer dual-band AC and RX series routers, there is no default login password. The setup wizard requires you to create a custom password during initial installation. If you are prompted for a login password and have not set one, try leaving the field blank, or try 'admin'.",
  },
  {
    question: "How do I factory reset a Tenda router?",
    answer:
      "To factory reset a Tenda router: (1) Keep the router powered on. (2) Locate the physical RST or RST/WPS button on the rear panel. (3) Use a paperclip or pen to press and hold this button for 8 to 10 seconds. (4) Release the button when all LED indicator lights blink or turn off. (5) The router will reboot automatically (takes about 60 seconds) with default factory settings. All custom Wi-Fi names, passwords, and ISP settings will be erased.",
  },
  {
    question: "Why is tendawifi.com not loading?",
    answer:
      "tendawifi.com is a local hostname alias that only resolves when you are connected directly to the Tenda router's local network and using its DNS resolver. It will fail to load if: (1) You are connected to a different Wi-Fi network or mobile data. (2) You have an active VPN connection which routes DNS queries externally. (3) Your browser uses Secure DNS (DNS-over-HTTPS). Disable VPN and DoH, or type the numeric IP 192.168.0.1 directly into the browser URL bar instead.",
  },
  {
    question: "How do I change my Tenda Wi-Fi name and password?",
    answer:
      "To change your Wi-Fi SSID and password: (1) Log in to the Tenda admin page at 192.168.0.1. (2) Navigate to the 'Wireless Settings' tab in the left sidebar. (3) Click on 'WiFi Name & Password'. (4) Enter your desired Wi-Fi name in the SSID field. (5) Select 'WPA2-PSK' or 'WPA3-SAE' security. (6) Enter your new Wi-Fi password. (7) Click Save. Reconnect all your devices using the new credentials.",
  },
  {
    question: "How do I set up a Tenda Nova Mesh Wi-Fi system?",
    answer:
      "Tenda Nova systems are configured using the 'Tenda WiFi' mobile app. Setup: (1) Connect the primary Nova node's WAN/LAN port to your modem using an Ethernet cable. (2) Power on the node and connect your smartphone to the default Wi-Fi SSID printed on the node's bottom label. (3) Open the Tenda WiFi app and follow the step-by-step setup wizard to configure your internet connection type. (4) To add secondary nodes, place them within 2 rooms of the primary node, power them on, and click '+' in the app to scan their bottom QR codes.",
  },
  {
    question: "Why is the Tenda router's WAN LED blinking red?",
    answer:
      "A blinking red WAN LED indicates that the router is physically connected to the modem but cannot establish an internet connection. Troubleshooting: (1) Restart your modem and Tenda router. (2) Check the Ethernet cable connecting the modem to the Tenda WAN port. (3) Log in to the Tenda panel and check if your ISP requires PPPoE authentication. (4) Ensure your ISP does not require MAC address cloning (if so, go to Internet Settings > MAC Clone and click 'Clone Local MAC').",
  },
  {
    question: "What is MAC Address Cloning and does Tenda support it?",
    answer:
      "Yes, Tenda routers support MAC address cloning. Some ISPs bind internet access to the MAC address of the first computer or gateway connected to their modem. If you replace that device with a Tenda router, the ISP will block access. To resolve this, log in to the Tenda panel, go to Internet Settings > MAC Address, select 'Clone Local MAC' (clones your connected computer's MAC address), and click Save.",
  },
  {
    question: "How do I update Tenda router firmware?",
    answer:
      "To update Tenda firmware: (1) Log in to the web panel at 192.168.0.1. (2) Go to Administration > System Upgrade. (3) Click 'Check for Updates' to look for OTA updates. (4) If none are found or your router lacks internet access, visit tendacn.com, download the firmware file for your exact model and hardware version, upload the file manually in the upgrade section, and click Upgrade. Never interrupt power during a firmware upgrade.",
  },
  {
    question: "How do I enable Bridge Mode on a Tenda router?",
    answer:
      "To configure a Tenda router as a secondary access point: (1) Log in to the admin panel. (2) Go to Administration > WAN Settings or Internet Settings. (3) Select 'Bridge' or 'AP Mode' from the connection type dropdown. (4) Disable the DHCP server under LAN Settings to prevent IP conflicts with your primary router. (5) Connect an Ethernet cable from a LAN port on your primary router to a LAN port on the Tenda router.",
  },
];

// =============================================================
// JSON-LD Custom Schema (CollectionPage & ItemList)
// =============================================================

const collectionPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": "https://routervia.com/routers/tenda#collection",
  url: "https://routervia.com/routers/tenda",
  name: "Tenda Router Hub: Login, Password, Setup & Troubleshooting Guide",
  description:
    "Complete technical guide to log in to Tenda routers and Nova mesh systems at 192.168.0.1 or tendawifi.com, find default passwords, and resolve Tenda network issues.",
  mainEntity: {
    "@type": "ItemList",
    name: "Tenda Router Families",
    numberOfItems: 3,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Tenda Nova Mesh Series",
        description:
          "Whole-home Wi-Fi mesh systems featuring Nova MW3, MW6, and MX12 nodes.",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tenda RX Series (Wi-Fi 6)",
        description:
          "High-speed consumer routers supporting Wi-Fi 6 standard and easy setups.",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Tenda AC Series (Wi-Fi 5)",
        description:
          "Dual-band smart routers covering basic home needs at affordable prices.",
      },
    ],
  },
};

// =============================================================
// 1. Tenda Login Addresses Data
// =============================================================

const loginAddresses = [
  {
    address: "192.168.0.1",
    usage: "Most Tenda routers",
    notes: "Default gateway IP for accessing web admin UI on standard consumer routers.",
  },
  {
    address: "tendawifi.com",
    usage: "New routers",
    notes: "Local hostname alias that auto-resolves when connected to Tenda's DNS server.",
  },
  {
    address: "192.168.1.1",
    usage: "ISP customized units",
    notes: "Common gateway IP configured by ISPs distributing custom Tenda hardware.",
  },
];

// =============================================================
// 2. Tenda Models Lookup Data
// =============================================================

const tendaModels = [
  {
    model: "Tenda AC6",
    standard: "Wi-Fi 5 (802.11ac)",
    speed: "AC1200",
    highlight: "4 high-gain antennas, Smart Wi-Fi Schedule, Beamforming+",
  },
  {
    model: "Tenda AC10",
    standard: "Wi-Fi 5 (802.11ac)",
    speed: "AC1200",
    highlight: "Gigabit ports, MU-MIMO, 1GHz CPU, App management",
  },
  {
    model: "Tenda AC23",
    standard: "Wi-Fi 5 (802.11ac)",
    speed: "AC2100",
    highlight: "7 high-gain antennas, 4x4 MU-MIMO for 5GHz, Gigabit ports",
  },
  {
    model: "Tenda RX2 Pro",
    standard: "Wi-Fi 6 (802.11ax)",
    speed: "AX1500",
    highlight: "Gigabit ports, WPA3, OFDMA + MU-MIMO, smart diagnostics",
  },
  {
    model: "Tenda RX9 Pro",
    standard: "Wi-Fi 6 (802.11ax)",
    speed: "AX3000",
    highlight: "1.6GHz Dual-Core CPU, 160MHz bandwidth, premium Wi-Fi 6",
  },
  {
    model: "Tenda RX12 Pro",
    standard: "Wi-Fi 6 (802.11ax)",
    speed: "AX3000",
    highlight: "High-performance Broadcom CPU, 5x 6dBi antennas, Wi-Fi+ mesh",
  },
  {
    model: "Tenda Nova MW3",
    standard: "Wi-Fi 5 Mesh",
    speed: "AC1200",
    highlight: "Coverage up to 3500 sq ft (3-pack), seamless roaming",
  },
  {
    model: "Tenda Nova MW6",
    standard: "Wi-Fi 5 Mesh",
    speed: "AC1200",
    highlight: "Gigabit backhaul, covers up to 6000 sq ft, Alexa compatible",
  },
  {
    model: "Tenda Nova MX12",
    standard: "Wi-Fi 6 Mesh",
    speed: "AX3000",
    highlight: "Broadcom CPU, covers up to 7000 sq ft, connects 160+ devices",
  },
];

// =============================================================
// 3. Tenda LED Meanings
// =============================================================

const ledStatuses = [
  {
    name: "Power LED",
    status: "Solid Green / Blue",
    meaning: "The router is powered on and functioning normally.",
  },
  {
    name: "WAN LED",
    status: "Blinking Red",
    meaning: "The WAN port is connected but the router cannot obtain an IP address or access the internet. Check ISP login settings.",
  },
  {
    name: "Wi-Fi LED",
    status: "Off",
    meaning: "The wireless radio is disabled. Log in to settings and enable Wi-Fi or press the Wi-Fi physical button.",
  },
  {
    name: "Mesh / SYS LED",
    status: "Solid Green",
    meaning: "Mesh node is successfully synced and has strong signal backhaul.",
  },
  {
    name: "Mesh / SYS LED",
    status: "Blinking Orange / Red",
    meaning: "Mesh node signal backhaul is weak or connection to primary node is lost. Move it closer.",
  },
  {
    name: "WPS LED",
    status: "Slow Blinking",
    meaning: "The router is actively searching for a client device to pair via WPS protocol. Sync window is open for 2 minutes.",
  },
];

// =============================================================
// 4. Tenda vs TP-Link vs Xiaomi Comparison Rows
// =============================================================

const comparisonRows = [
  {
    feature: "Default Login IP",
    tenda: "192.168.0.1",
    tplink: "192.168.0.1 / 192.168.1.1",
    xiaomi: "192.168.31.1",
  },
  {
    feature: "Local Hostname",
    tenda: "tendawifi.com",
    tplink: "tplinkwifi.net",
    xiaomi: "miwifi.com",
  },
  {
    feature: "Default Credentials",
    tenda: "admin / admin (or custom on first boot)",
    tplink: "admin / admin (or custom on first boot)",
    xiaomi: "Custom (created during initial setup)",
  },
  {
    feature: "Mesh Technology",
    tenda: "Nova / Wi-Fi+ (seamless roaming)",
    tplink: "Deco / EasyMesh (hybrid standards)",
    xiaomi: "Mi Mesh / EasyMesh compatible",
  },
  {
    feature: "Budget Focus",
    tenda: "Ultra-budget value solutions",
    tplink: "Mainstream home value & premium options",
    xiaomi: "Budget smart home & IoT integration",
  },
  {
    feature: "Mobile App",
    tenda: "Tenda WiFi App",
    tplink: "Tether App / Deco App",
    xiaomi: "MiWiFi App / Mi Home App",
  },
];

// =============================================================
// Page Component
// =============================================================

export default function TendaRouterHubPage() {
  return (
    <>
      {/* Custom JSON-LD schema for CollectionPage and ItemList */}
      <JsonLd data={collectionPageSchema} />

      <TroubleshootingArticleShell
        h1="Tenda Router Login, Password, Setup &amp; Troubleshooting Guide"
        intro="Tenda is a leading global manufacturer of consumer networking equipment, recognized for its easy-to-install, cost-effective Wi-Fi routers, home mesh systems, and switches. From the affordable AC-series dual-band gateways to high-speed RX-series Wi-Fi 6 routers and the whole-home Nova mesh networks, Tenda hardware is designed for straightforward operation. Whether you need to log in to your admin panel at 192.168.0.1 or tendawifi.com, custom-configure PPPoE settings, resolve a blinking red WAN LED, pair Nova mesh nodes, or perform a factory reset, this authoritative guide provides step-by-step technical instructions."
        category="wifi"
        breadcrumbs={breadcrumbs}
        faqs={faqs}
        troubleshootingSteps={troubleshootingSteps}
        warningBanner={{
          title: "Security Warning: Change Default Password Immediately",
          text: "Many Tenda routers ship with a standard default password of 'admin'. Keeping this password active exposes your home network to unauthorized access from any local client. Navigate to Administration > Login Password in your Tenda settings panel to set a strong, unique administrator password immediately.",
        }}
        quickFixChecklist={quickFixChecklist}
        commonCauses={commonCauses}
        whenToContactISP="If your Tenda router's WAN LED continues to blink red after restarting both the modem and the router, your PPPoE status shows authentication failures, or your default gateway displays 0.0.0.0, the issue lies with your ISP. Contact your internet provider to verify your account status, retrieve your correct PPPoE login credentials, or ensure your local broadband line is active."
        severityLevel="medium"
      >
        <div className="space-y-12">
          {/* =============================================================
              FEATURED SNIPPET: HOW TO LOGIN TO A TENDA ROUTER
              ============================================================= */}
          <section
            className="glass-card p-6 border border-orange-950/20 bg-orange-950/5 rounded-2xl relative overflow-hidden space-y-4"
            aria-label="How to Login to a Tenda Router"
          >
            <div className="absolute top-0 right-0 bg-orange-500/10 text-orange-400 text-[10px] font-mono uppercase tracking-wider px-3 py-1 rounded-bl-lg font-bold">
              Featured Snippet
            </div>
            <h2 className="text-sm font-bold text-orange-400 uppercase tracking-wide flex items-center gap-1.5">
              <Zap size={16} /> How to Login to a Tenda Router
            </h2>
            <div className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
              <p className="mb-3">
                Follow these exact steps to access your Tenda router's administration configuration GUI:
              </p>
              <ol className="list-decimal pl-5 space-y-2 text-xs text-[var(--text-secondary)] font-medium">
                <li>
                  <strong>Connect to Tenda network:</strong> Connect your device (PC, laptop, or phone) to the Tenda router via an Ethernet cable connected to one of the LAN ports, or join the Wi-Fi network printed on the bottom label.
                </li>
                <li>
                  <strong>Launch your web browser:</strong> Open Chrome, Edge, Safari, or Firefox in Private/Incognito mode to avoid caching issues.
                </li>
                <li>
                  <strong>Enter Tenda access address:</strong> Type{" "}
                  <Link href="/ips/192-168-0-1" className="text-orange-400 hover:underline font-mono">
                    192.168.0.1
                  </Link>{" "}
                  or the local domain{" "}
                  <strong>tendawifi.com</strong> directly in the URL address bar and press Enter.
                </li>
                <li>
                  <strong>Provide credentials:</strong> Enter the default username <code>admin</code> and password <code>admin</code>. If your router uses a newer firmware, type the custom admin password you set during the initial installation.
                </li>
                <li>
                  <strong>Configure your settings:</strong> You will be logged into the Tenda dashboard. Go to Internet Settings, Wireless Settings, or Administration to manage your network.
                </li>
              </ol>
            </div>
          </section>

          {/* =============================================================
              1. TENDA LOGIN ADDRESSES TABLE
              ============================================================= */}
          <section className="space-y-4" id="login-addresses" aria-label="Tenda Login Addresses">
            <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
              <Globe size={18} className="text-orange-400" />
              1. Tenda Router Login Addresses Lookup
            </h2>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Depending on the model, connection type, or custom ISP configuration, Tenda routers can be accessed via different gateway addresses. The table below lists the common entry points.
            </p>
            <div className="overflow-x-auto rounded-xl border border-white/5">
              <table className="w-full text-xs text-[var(--text-secondary)]">
                <thead>
                  <tr className="bg-orange-500/10 text-orange-300 text-left">
                    <th className="px-4 py-3 font-semibold">Address / Gateway</th>
                    <th className="px-4 py-3 font-semibold">Usage</th>
                    <th className="px-4 py-3 font-semibold">Important Connection Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {loginAddresses.map((row, i) => (
                    <tr
                      key={i}
                      className={i % 2 === 0 ? "bg-white/[0.02]" : "bg-white/[0.04]"}
                    >
                      <td className="px-4 py-3 font-mono text-orange-300 font-semibold">
                        {row.address === "192.168.0.1" ? (
                          <Link href="/ips/192-168-0-1" className="hover:underline">
                            192.168.0.1
                          </Link>
                        ) : row.address === "192.168.1.1" ? (
                          <Link href="/ips/192-168-1-1" className="hover:underline">
                            192.168.1.1
                          </Link>
                        ) : (
                          row.address
                        )}
                      </td>
                      <td className="px-4 py-3">{row.usage}</td>
                      <td className="px-4 py-3 text-[var(--text-tertiary)]">{row.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* =============================================================
              2. TENDA MODELS LOOKUP TABLE
              ============================================================= */}
          <section className="space-y-4" id="models-lookup" aria-label="Tenda Models Lookup">
            <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
              <Layers size={18} className="text-orange-400" />
              2. Tenda Router Models Specifications Lookup
            </h2>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Quickly look up your specific Tenda model below to find its technical Wi-Fi standard, speed class, and core hardware configuration.
            </p>
            <div className="overflow-x-auto rounded-xl border border-white/5">
              <table className="w-full text-xs text-[var(--text-secondary)]">
                <thead>
                  <tr className="bg-orange-500/10 text-orange-300 text-left">
                    <th className="px-4 py-3 font-semibold">Tenda Model</th>
                    <th className="px-4 py-3 font-semibold">Wi-Fi Standard</th>
                    <th className="px-4 py-3 font-semibold">Speed Class</th>
                    <th className="px-4 py-3 font-semibold">Key Hardware Highlight</th>
                  </tr>
                </thead>
                <tbody>
                  {tendaModels.map((row, i) => (
                    <tr
                      key={i}
                      className={i % 2 === 0 ? "bg-white/[0.02]" : "bg-white/[0.04]"}
                    >
                      <td className="px-4 py-3 font-semibold text-orange-300">{row.model}</td>
                      <td className="px-4 py-3">{row.standard}</td>
                      <td className="px-4 py-3 font-mono">{row.speed}</td>
                      <td className="px-4 py-3 text-[var(--text-tertiary)]">{row.highlight}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* =============================================================
              3. TENDA LED STATUS MEANINGS
              ============================================================= */}
          <section className="space-y-4" id="led-meanings" aria-label="Tenda LED Meanings">
            <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
              <Sliders size={18} className="text-orange-400" />
              3. Tenda Gateway LED Light Diagnostic Meanings
            </h2>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Tenda routers and Nova mesh systems use color-coded LED arrays to communicate diagnostic states. Use the table below to check the health of your link.
            </p>
            <div className="overflow-x-auto rounded-xl border border-white/5">
              <table className="w-full text-xs text-[var(--text-secondary)]">
                <thead>
                  <tr className="bg-orange-500/10 text-orange-300 text-left">
                    <th className="px-4 py-3 font-semibold">LED Light Indicator</th>
                    <th className="px-4 py-3 font-semibold">Light State</th>
                    <th className="px-4 py-3 font-semibold">Diagnostic Meaning &amp; Resolution</th>
                  </tr>
                </thead>
                <tbody>
                  {ledStatuses.map((row, i) => (
                    <tr
                      key={i}
                      className={i % 2 === 0 ? "bg-white/[0.02]" : "bg-white/[0.04]"}
                    >
                      <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">{row.name}</td>
                      <td className="px-4 py-3 font-mono text-orange-300 font-semibold">{row.status}</td>
                      <td className="px-4 py-3 text-[var(--text-tertiary)]">{row.meaning}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* =============================================================
              4. TENDA VS TP-LINK VS XIAOMI COMPARISON
              ============================================================= */}
          <section className="space-y-4" id="comparison" aria-label="Tenda vs TP-Link vs Xiaomi">
            <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
              <Cpu size={18} className="text-orange-400" />
              4. Router Comparison: Tenda vs. TP-Link vs. Xiaomi
            </h2>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Tenda, TP-Link, and Xiaomi are the three dominant brands offering entry-level and mid-range consumer network solutions. Compare their structural differences below:
            </p>
            <div className="overflow-x-auto rounded-xl border border-white/5">
              <table className="w-full text-xs text-[var(--text-secondary)]">
                <thead>
                  <tr className="bg-orange-500/10 text-orange-300 text-left">
                    <th className="px-4 py-3 font-semibold">Feature / Metric</th>
                    <th className="px-4 py-3 font-semibold">Tenda</th>
                    <th className="px-4 py-3 font-semibold">TP-Link</th>
                    <th className="px-4 py-3 font-semibold">Xiaomi</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr
                      key={i}
                      className={i % 2 === 0 ? "bg-white/[0.02]" : "bg-white/[0.04]"}
                    >
                      <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">{row.feature}</td>
                      <td className="px-4 py-3 text-orange-300">{row.tenda}</td>
                      <td className="px-4 py-3">{row.tplink}</td>
                      <td className="px-4 py-3 text-[var(--text-tertiary)]">{row.xiaomi}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* =============================================================
              NOVA MESH SETUP GUIDE
              ============================================================= */}
          <section className="space-y-4" id="nova-setup" aria-label="Tenda Nova Mesh Setup">
            <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
              <Radio size={18} className="text-orange-400" />
              Tenda Nova Whole-Home Mesh Setup Procedure
            </h2>
            <div className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed space-y-3">
              <p>
                Tenda's <strong>Nova</strong> series is a highly popular mesh system featuring MW3, MW6, MW12, and MX12 nodes. Unlike standalone routers that use local web portals, Nova systems are set up and configured through a unified app interface.
              </p>
              <ol className="list-decimal pl-5 space-y-2 text-xs">
                <li>
                  <strong>Connect Primary Nova:</strong> Connect an Ethernet cable from your broadband modem's LAN port to the WAN/LAN port on the first Nova node.
                </li>
                <li>
                  <strong>Power Up:</strong> Connect the power adapter. The LED light will initially show solid red, then turn to blinking green or solid yellow.
                </li>
                <li>
                  <strong>Connect to Default SSID:</strong> On your smartphone, connect to the Wi-Fi network named <em>Nova_XXXX</em> (credentials are printed on the sticker on the bottom of the node).
                </li>
                <li>
                  <strong>Configure with App:</strong> Download and launch the <strong>Tenda WiFi</strong> app. The app will automatically discover your Nova gateway. Select your internet connection type (usually Dynamic IP or PPPoE) and create a custom Wi-Fi SSID and password.
                </li>
                <li>
                  <strong>Add Secondary Nodes:</strong> Position secondary Nova nodes within two rooms of the primary node. Power them on. The nodes will pair automatically via the app. If they fail to pair, click '+' in the top-right corner of the app dashboard and scan the QR code located on the secondary node's bottom sticker.
                </li>
              </ol>
            </div>
          </section>
        </div>
      </TroubleshootingArticleShell>
    </>
  );
}
