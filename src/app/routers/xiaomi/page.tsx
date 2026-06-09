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
  Smartphone,
  ShieldAlert,
  Radio,
  MonitorPlay,
} from "lucide-react";

// =============================================================
// Premium SEO Metadata
// =============================================================

export const metadata: Metadata = buildMetadata({
  title: "Xiaomi Router Login, Password, Reset & Setup Guide (2026)",
  description:
    "Learn how to log in to Xiaomi Mi Router at 192.168.31.1 or miwifi.com, find default passwords, update MiWiFi firmware, configure Xiaomi mesh, reset Xiaomi routers, and troubleshoot common issues.",
  canonical: "/routers/xiaomi",
  keywords: [
    "xiaomi router login",
    "xiaomi mi router",
    "192.168.31.1",
    "miwifi.com",
    "xiaomi router password",
    "xiaomi router reset",
    "xiaomi router setup",
    "xiaomi router admin",
    "xiaomi miwifi",
    "xiaomi ax6000",
    "xiaomi router firmware update",
    "xiaomi mesh router",
    "xiaomi wifi 6",
    "mi router 4a",
    "xiaomi router not connecting",
    "xiaomi router troubleshooting",
  ],
});

// =============================================================
// Breadcrumbs
// =============================================================

const breadcrumbs = [
  { name: "Routers", url: "/routers" },
  { name: "Xiaomi", url: "/routers/xiaomi" },
];

// =============================================================
// Root Causes for Xiaomi Issues
// =============================================================

const commonCauses = [
  {
    title: "miwifi.com Hostname Resolution Blocked",
    desc: "Xiaomi's local hostname 'miwifi.com' relies on the router's built-in DNS resolver to redirect the request locally to 192.168.31.1. Active VPN tunnels, DNS-over-HTTPS settings in Chrome or Firefox, or corporate proxy configurations route DNS externally, preventing miwifi.com from resolving to the local admin interface.",
  },
  {
    title: "Subnet Collision with ISP Gateway",
    desc: "If the upstream ISP modem or gateway uses the 192.168.31.X subnet — same as Xiaomi's default — the Mi Router automatically shifts its LAN IP to 192.168.1.1 or a different subnet to avoid routing conflicts, which catches users off-guard when the default IP stops responding.",
  },
  {
    title: "MiWiFi App Pairing Session Expiry",
    desc: "The MiWiFi mobile app uses a time-limited session token for local management. If the app has been idle for several hours or the router has been rebooted, the session token expires and the app shows 'Device Offline', even though the router is fully operational. A manual re-login in the app resolves this.",
  },
  {
    title: "OpenWrt / Third-Party Firmware Conflicts",
    desc: "Xiaomi routers are popular targets for OpenWrt and Padavan third-party firmware installations due to their powerful hardware. If a partial or incompatible firmware flash was performed, the router may boot into a half-functional state with the stock web interface broken or the SSH telnet exploit port closed.",
  },
];

// =============================================================
// Quick Fix Checklist
// =============================================================

const quickFixChecklist = [
  "Verify your device is on the Xiaomi router's network. Run 'ipconfig' (Windows) to confirm your Default Gateway shows 192.168.31.1 (or 192.168.1.1 if subnet-shifted).",
  "Open an Incognito browser window and type http://192.168.31.1 or http://miwifi.com directly into the address bar — never into a Google search bar.",
  "Disable all VPN clients, browser proxy extensions, and DNS-over-HTTPS (Secure DNS) settings before accessing the admin portal.",
  "Check the label on the bottom or back of the Mi Router for the default admin password — Xiaomi prints a unique password per device on modern models.",
  "Power-cycle the Mi Router by unplugging for 30 seconds, then reconnecting. Wait 90 seconds before attempting to load the admin page.",
  "If locked out, hold the physical RESET button for 5–10 seconds until the indicator light blinks to perform a factory reset.",
];

// =============================================================
// Diagnostic Steps
// =============================================================

const troubleshootingSteps = [
  {
    title: "Verify Network Connectivity and DHCP Assignment",
    description:
      "Ensure your device is actively connected to the Xiaomi Mi Router network. Use an Ethernet cable into any LAN port on the router, or connect to the default Wi-Fi SSID (printed on the router label). Open a command prompt and run 'ipconfig' (Windows) or 'ip route' (Linux/macOS). Your IPv4 address should fall in the 192.168.31.X range with the Default Gateway set to 192.168.31.1. If your IP address is in the 169.254.X.X APIPA range, the router has not issued a DHCP lease — power-cycle the router and retry. If your IP shows a different subnet (e.g., 192.168.1.X), the router has auto-shifted subnets due to an upstream IP conflict; try accessing http://192.168.1.1.",
    tip: "On Xiaomi mesh networks, each node (main router + mesh units) maintains the same SSID. If the gateway IP shows 192.168.31.1, you are connected to the main router's network and can proceed to access the admin panel.",
  },
  {
    title: "Access the Xiaomi MiWiFi Admin Dashboard",
    description:
      "Open a web browser in Incognito or Private mode to clear any cached redirects. In the address bar, type 'http://192.168.31.1' or Xiaomi's local hostname 'http://miwifi.com' and press Enter. The MiWiFi web interface will load — a modern, dark-themed UI with a network status overview. If you see a browser certificate warning, click 'Advanced' and then 'Proceed' — the router uses a locally self-signed SSL certificate which is expected. If miwifi.com fails to load, fall back to the raw IP address 192.168.31.1.",
    tip: "If neither address works, check whether your router's WAN port is connected to a modem that uses the same 192.168.31.X subnet. Xiaomi routers auto-shift to avoid conflicts. Check the modem's connected device list to find the new IP assigned to the Mi Router's LAN interface.",
  },
  {
    title: "Authenticate with MiWiFi Admin Credentials",
    description:
      "The MiWiFi login screen prompts for an admin password. Modern Xiaomi routers (Mi Router 4A, AX3000, AX6000, and BE7000 series) print a unique device-specific password on the bottom label. Look for 'Admin Password' or 'Password' on the specifications sticker. On older Mi Router 3 and earlier models, a password is set during the first-time setup wizard — if you forgot this, a factory reset is required. Xiaomi does not have a universal recovery password. After entering the correct password, the full MiWiFi dashboard appears.",
    tip: "The MiWiFi app (iOS/Android) provides an alternative login method using Xiaomi account credentials if you bound the router to your Mi Account during setup. Open the app, sign in, and select your router from the device list — no web browser or local IP needed.",
  },
  {
    title: "Diagnose WAN Connection and Internet Status",
    description:
      "Inside the MiWiFi dashboard, the home screen displays a network topology diagram showing: your ISP connection status, the router's WAN IP, and connected devices. If the WAN status shows 'Not Connected' or a red indicator, navigate to Settings > Internet Settings and verify your connection protocol. Most cable and fiber ISPs use Dynamic IP (DHCP) which auto-configures. DSL and some fiber services require PPPoE — enter your ISP username and password. For Fiber-to-the-Premises connections requiring VLAN tagging (e.g., VLAN ID 10 or 35), expand the advanced internet settings and configure the VLAN ID field. Run a Ping diagnostic from within the dashboard to test connectivity to 8.8.8.8.",
    tip: "Navigate to Mi Router Settings > Advanced Settings > Diagnostics > Network Diagnostics. Run the built-in connection test — it checks gateway ping, DNS resolution, and external internet access sequentially, pinpointing exactly which layer of connectivity is broken.",
  },
];

// =============================================================
// FAQ Q&A Data (10 Detailed Questions)
// =============================================================

const faqs = [
  {
    question: "What is the default login IP address for a Xiaomi Mi Router?",
    answer:
      "The default gateway IP for most Xiaomi Mi Routers is 192.168.31.1. Xiaomi also provides the local hostname 'http://miwifi.com' which resolves to the router's admin interface when your device is connected to the Mi Router's network. Some older Mi Router models (Mi Router 1, 2, and 3 series) may use 192.168.1.1 as their default IP. If neither address loads, run 'ipconfig' in Windows Command Prompt to check your device's current Default Gateway, which always matches the router's admin IP. Always type the address directly into the URL bar, not a search engine.",
  },
  {
    question: "What is the default admin password for a Xiaomi Mi Router?",
    answer:
      "Xiaomi Mi Routers do not have a universal default admin password like 'admin/admin'. Modern models (AX3000, AX6000, BE7000, Mi Router 4 series) print a unique device-specific admin password on the bottom sticker. Look for a field labeled 'Admin Password' or 'Password'. For older models (Mi Router 3, Mini, 3G), the admin password is set by the user during the initial setup wizard and there is no default — if you skipped setup or forgot the password, a factory reset is required. The MiWiFi app allows password recovery if you bound the router to your Xiaomi account.",
  },
  {
    question: "How do I reset my Xiaomi Mi Router to factory defaults?",
    answer:
      "To factory reset a Xiaomi Mi Router: (1) Ensure the router is powered on with the indicator light showing normal operation. (2) Locate the RESET button — on most models it is a recessed pinhole on the rear or bottom panel. (3) Insert a straightened paperclip and hold the button for 5–10 seconds. (4) Release when the indicator light starts flashing yellow/orange. (5) Wait 90–120 seconds for the router to fully reboot to factory defaults. The admin password resets to the label value (or no password on very old models), and all Wi-Fi settings, port forwarding rules, and configurations are erased. Some models also have a reset button accessible from the dashboard under Settings > Factory Reset.",
  },
  {
    question: "Why can't I access miwifi.com on my Xiaomi router?",
    answer:
      "miwifi.com is Xiaomi's local DNS alias that resolves to 192.168.31.1 only when your device is using the Mi Router's built-in DNS resolver. Common failure causes: (1) Browser DNS-over-HTTPS (Secure DNS) is enabled — this bypasses the router's local DNS and sends queries to Cloudflare or Google, which return no result for 'miwifi.com'. Go to browser settings and disable Secure DNS. (2) An active VPN is routing all DNS queries through an encrypted tunnel. Disconnect the VPN first. (3) You are not connected to the Mi Router network. (4) The router's IP has shifted due to a subnet conflict — try http://192.168.31.1 or http://192.168.1.1 directly.",
  },
  {
    question: "How do I update Xiaomi Mi Router firmware?",
    answer:
      "Xiaomi provides automatic and manual firmware update options. Automatic: Log in to the MiWiFi dashboard at http://192.168.31.1, go to System Update (or Settings > Firmware Update), and click 'Check for Updates'. If a new version is available, click 'Update'. The router downloads and installs the firmware automatically and reboots. Manual: Visit miwifi.com/download to download the latest firmware for your exact model. Log in to the dashboard, go to Settings > Manual Firmware Update, upload the downloaded .bin file, and click 'Update'. Never cut power during a firmware flash — it can brick the device.",
  },
  {
    question: "What is Xiaomi Mesh Router and how do I set it up?",
    answer:
      "Xiaomi's Mesh Router system (AX Mesh, Xiaomi Mesh System AX3000) creates a unified whole-home Wi-Fi network where multiple nodes share a single SSID and enable seamless client roaming. Setup: (1) Connect the primary router to your modem and complete internet setup. (2) Place mesh satellite units within range of the primary router. (3) Power on the satellite units. (4) Open the MiWiFi app on your smartphone, select your primary router, and tap 'Add Mesh Node'. (5) Follow the app prompts — the satellite unit auto-pairs with the primary via the 5GHz backhaul band. (6) Once paired, move satellites to their final positions. All nodes broadcast the same SSID and password.",
  },
  {
    question: "Does Xiaomi support Wi-Fi 6 and Wi-Fi 7?",
    answer:
      "Yes. Xiaomi has an extensive Wi-Fi 6 and Wi-Fi 7 lineup. Wi-Fi 6 models include the Xiaomi AX3000 (entry-level), Xiaomi AX3600 (with dedicated 6GHz gaming antenna), Xiaomi AX6000 (flagship Wi-Fi 6), and the Xiaomi Redmi AX5400 (budget-friendly). Wi-Fi 7 models include the Xiaomi BE7000 (tri-band, 320MHz channels on 6GHz), the Xiaomi BE3600 (value Wi-Fi 7), and the Xiaomi AX10000 (quad-band flagship). These routers support Multi-Link Operation (MLO), OFDMA, and 4K-QAM modulation for significantly higher throughput and lower latency than Wi-Fi 5 predecessors.",
  },
  {
    question: "How do I enable SSH on a Xiaomi router for OpenWrt?",
    answer:
      "Many Xiaomi Mi Router models support SSH access for advanced configuration or OpenWrt installation. On newer models: Log in to the MiWiFi dashboard, navigate to Settings > Advanced Settings > SSH Login. Enable the SSH toggle and note the root password displayed. Connect via 'ssh root@192.168.31.1' from your PC terminal. On older models (Mi Router 3G, 4A Gigabit), you may need to exploit the MiWiFi developer mode or use a telnet exploit during initial setup. Always backup your current firmware before attempting to flash OpenWrt. Note: Installing third-party firmware voids your warranty.",
  },
  {
    question: "How do I set up port forwarding on a Xiaomi Mi Router?",
    answer:
      "To configure port forwarding: (1) Log in to the MiWiFi dashboard at http://192.168.31.1. (2) Navigate to Settings > Advanced Settings > Port Forwarding (or 'NAT' on some firmware versions). (3) Click 'Add Rule'. (4) Enter a rule name (e.g., PS5). (5) Select the internal IP address of your device from the dropdown or type it manually. (6) Enter the external and internal port numbers (they can differ). (7) Select the protocol: TCP, UDP, or Both. (8) Enable the rule and save. Important: Assign your device a static DHCP lease in Settings > Connected Devices > DHCP Reservations to ensure the forwarded IP never changes.",
  },
  {
    question: "What is the Xiaomi AX6000 and is it good for gaming?",
    answer:
      "The Xiaomi AX6000 is a tri-band Wi-Fi 6 router with a 2.5G WAN port, three radios (2.4GHz 4x4 + 5GHz 4x4 + 5GHz 4x4), and a total theoretical throughput of 6000Mbps. For gaming: it supports 160MHz channel width on the 5GHz band for sub-5ms wireless latency to local devices, has a dedicated gaming acceleration feature that prioritizes UDP gaming packets, supports UPnP for automatic NAT opening (Open NAT type on PS5 and Xbox), and features hardware NAT offloading for line-rate routing without CPU bottlenecks. Combined with its 2.5G WAN port — which accommodates multi-gigabit fiber ISP plans — the AX6000 is an excellent gaming router at a competitive price point compared to Western brand equivalents.",
  },
];

// =============================================================
// JSON-LD Custom Schema (CollectionPage & ItemList)
// =============================================================

const collectionPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": "https://routervia.com/routers/xiaomi#collection",
  url: "https://routervia.com/routers/xiaomi",
  name: "Xiaomi Mi Router Hub: Login, Password, Setup & Troubleshooting Guide",
  description:
    "Complete guide to log in to Xiaomi Mi Routers at 192.168.31.1 or miwifi.com, recover admin passwords, update MiWiFi firmware, configure mesh networks, and troubleshoot Xiaomi router issues.",
  mainEntity: {
    "@type": "ItemList",
    name: "Xiaomi Router Product Series",
    numberOfItems: 5,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Mi Router AX Series (Wi-Fi 6)",
        description:
          "Xiaomi's mainstream Wi-Fi 6 routers including the AX3000, AX3600, and AX6000, offering high-performance OFDMA and MU-MIMO networking.",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Mi Router BE Series (Wi-Fi 7)",
        description:
          "Xiaomi's latest-generation Wi-Fi 7 routers including the BE7000 and BE3600 featuring MLO, 320MHz channels, and 4K-QAM.",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Xiaomi Mesh System",
        description:
          "Whole-home mesh Wi-Fi systems including the Xiaomi Mesh System AX3000 for seamless whole-home coverage with unified SSID roaming.",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Redmi Router Series",
        description:
          "Budget-friendly Redmi-branded routers offering solid Wi-Fi 5 and Wi-Fi 6 performance at entry-level price points.",
      },
      {
        "@type": "ListItem",
        position: 5,
        name: "Mi Router Pro / Enterprise",
        description:
          "Higher-end and developer-friendly Mi Router models with SSH access, OpenWrt support, and advanced networking capabilities.",
      },
    ],
  },
};

// =============================================================
// Xiaomi Login Addresses Lookup
// =============================================================

const loginAddresses = [
  {
    address: "192.168.31.1",
    usage: "Default gateway for all modern Mi Router models",
    notes: "Primary access IP — works on AX3000, AX6000, BE7000, Mi 4 series",
  },
  {
    address: "miwifi.com",
    usage: "Local DNS hostname redirect for MiWiFi admin panel",
    notes: "Fails if VPN or browser DoH is active. Use raw IP as reliable fallback",
  },
  {
    address: "192.168.1.1",
    usage: "Legacy Mi Router 1, 2, Mini series / subnet-shifted state",
    notes: "Used when upstream ISP modem conflicts with the 192.168.31.X subnet",
  },
  {
    address: "MiWiFi App",
    usage: "iOS & Android mobile management via Xiaomi account",
    notes: "Requires router bound to Mi Account. Supports remote access via cloud",
  },
];

// =============================================================
// Xiaomi LED Status Guide
// =============================================================

const ledStatuses = [
  {
    color: "Solid Blue",
    meaning: "Internet Connected — Fully Operational",
    fix: "No action needed. The router has a valid WAN IP and internet routing is active.",
  },
  {
    color: "Blinking Yellow / Orange",
    meaning: "No Internet Connection — WAN link failed or negotiating",
    fix: "Check the cable from modem to WAN port. Verify PPPoE credentials or power-cycle the modem. Normal during first 60 seconds of startup.",
  },
  {
    color: "Solid Yellow / Orange",
    meaning: "Router booting up or firmware updating",
    fix: "Wait 90 seconds for boot to complete. Do NOT power off if updating — this can brick the device.",
  },
  {
    color: "Rapid Red/Blue Alternation",
    meaning: "Factory reset in progress",
    fix: "Release the RESET button if held too long, or allow the reset process to complete. Router will reboot automatically.",
  },
];

// =============================================================
// Best Xiaomi Routers by Use Case
// =============================================================

const bestRouters = [
  {
    useCase: "Best Overall Flagship",
    model: "Xiaomi AX6000",
    standard: "Wi-Fi 6 (802.11ax)",
    speed: "AX6000",
    highlight: "2.5G WAN, tri-band, 160MHz, gaming acceleration",
  },
  {
    useCase: "Best Wi-Fi 7",
    model: "Xiaomi BE7000",
    standard: "Wi-Fi 7 (802.11be)",
    speed: "BE7000",
    highlight: "MLO, 320MHz 6GHz band, 2.5G ports, tri-band",
  },
  {
    useCase: "Best Mesh System",
    model: "Xiaomi Mesh System AX3000",
    standard: "Wi-Fi 6 Mesh",
    speed: "AX3000 (per node)",
    highlight: "Dedicated backhaul, seamless roaming, app setup",
  },
  {
    useCase: "Best Budget",
    model: "Redmi AX5400",
    standard: "Wi-Fi 6 (802.11ax)",
    speed: "AX5400",
    highlight: "6 antennas, OFDMA, excellent value under $100",
  },
];

// =============================================================
// Xiaomi Router Model Lookup Matrix
// =============================================================

const xiaomiModels = [
  {
    model: "Mi Router AX3000",
    standard: "Wi-Fi 6",
    speed: "AX3000",
    highlight: "Quad-core 1GHz CPU, OFDMA, 4 Gigabit LAN ports",
  },
  {
    model: "Mi Router AX6000",
    standard: "Wi-Fi 6",
    speed: "AX6000",
    highlight: "2.5G WAN, tri-band, 160MHz, gaming mode, hardware NAT",
  },
  {
    model: "Mi Router BE7000",
    standard: "Wi-Fi 7",
    speed: "BE7000",
    highlight: "320MHz 6GHz, MLO, 2x 2.5G ports, tri-band",
  },
  {
    model: "Mi Router AX3600",
    standard: "Wi-Fi 6",
    speed: "AX3600",
    highlight: "Dedicated gaming 5GHz band, AI QoS, 7-antenna design",
  },
  {
    model: "Redmi AX5400",
    standard: "Wi-Fi 6",
    speed: "AX5400",
    highlight: "6-stream MIMO, excellent price-to-performance ratio",
  },
  {
    model: "Mi Router 4A Gigabit",
    standard: "Wi-Fi 5",
    speed: "AC1200",
    highlight: "OpenWrt compatible, widely available, affordable",
  },
];

// =============================================================
// Xiaomi Error Codes Resolution Matrix
// =============================================================

const errorCodes = [
  {
    error: "No WAN IP / DHCP Timeout",
    meaning: "Router cannot obtain an IP address from the ISP or modem.",
    fix: "Power-cycle the modem. If MAC binding is active, clone your PC's MAC under Advanced > Internet Settings > MAC Clone.",
  },
  {
    error: "PPPoE Auth Failed",
    meaning: "The PPPoE credentials entered are incorrect or expired.",
    fix: "Re-enter the ISP PPPoE username and password in Settings > Internet Settings > PPPoE. Verify with your ISP.",
  },
  {
    error: "DNS Resolution Failure",
    meaning: "Router is connected to WAN but cannot resolve domain names.",
    fix: "Set DNS manually: Primary 8.8.8.8, Secondary 1.1.1.1 under Advanced Settings > DNS.",
  },
  {
    error: "miwifi.com Not Loading",
    meaning: "Browser cannot resolve the Xiaomi local hostname.",
    fix: "Disable DoH in browser, disconnect VPN, and use http://192.168.31.1 directly.",
  },
  {
    error: "Admin Password Incorrect",
    meaning: "Entered admin password does not match the stored credential.",
    fix: "Check the bottom sticker for the label password. If unknown, factory reset is required.",
  },
  {
    error: "Mesh Node Disconnected",
    meaning: "A mesh satellite unit has lost its link to the primary router.",
    fix: "Move the satellite closer. Use a wired Ethernet backhaul for stable mesh connectivity.",
  },
];

// =============================================================
// Xiaomi vs TP-Link vs ASUS Comparison
// =============================================================

const comparisonRows = [
  {
    feature: "Default Login IP",
    xiaomi: "192.168.31.1",
    tplink: "192.168.0.1 / 192.168.1.1",
    asus: "192.168.1.1",
  },
  {
    feature: "Local Hostname",
    xiaomi: "miwifi.com",
    tplink: "tplinkwifi.net",
    asus: "router.asus.com",
  },
  {
    feature: "Default Admin Password",
    xiaomi: "Unique per device (on label)",
    tplink: "admin / admin or custom",
    asus: "admin / admin",
  },
  {
    feature: "Mesh System",
    xiaomi: "Xiaomi Mesh (proprietary) / EasyMesh",
    tplink: "Deco (dedicated) / OneMesh",
    asus: "AiMesh (cross-model compatible)",
  },
  {
    feature: "Gaming Features",
    xiaomi: "Gaming mode, hardware NAT, QoS priority",
    tplink: "HomeShield QoS, Archer Gaming series",
    asus: "ROG Game Boost, WTFast, Adaptive QoS",
  },
  {
    feature: "Mobile App",
    xiaomi: "MiWiFi App (Mi Account required)",
    tplink: "Tether / Deco App",
    asus: "ASUS Router App",
  },
  {
    feature: "Value Proposition",
    xiaomi: "Exceptional specs-per-dollar ratio",
    tplink: "Broad range across all budgets",
    asus: "Premium features, higher price point",
  },
  {
    feature: "OpenWrt Support",
    xiaomi: "Widely supported (4A, 3G, many AX models)",
    tplink: "Partial (select Archer models)",
    asus: "Limited (Merlin custom firmware instead)",
  },
];

// =============================================================
// Page Component
// =============================================================

export default function XiaomiRouterHubPage() {
  return (
    <>
      {/* Custom JSON-LD schema for CollectionPage and ItemList */}
      <JsonLd data={collectionPageSchema} />

      <TroubleshootingArticleShell
        h1="Xiaomi Mi Router Hub: Login, Password, Setup &amp; Reset Guide"
        intro="Xiaomi has rapidly ascended to become one of the world's most influential networking brands, delivering exceptional Wi-Fi 6 and Wi-Fi 7 routers at highly competitive prices. Under the MiWiFi platform, Xiaomi produces a full ecosystem of home routers, mesh systems, and range extenders — from the affordable Redmi AX5400 to the flagship AX6000 and Wi-Fi 7 BE7000. Whether you need to log in at 192.168.31.1 or miwifi.com, recover your admin password, configure a Xiaomi mesh network, update MiWiFi firmware, set up gaming QoS, or explore SSH access for OpenWrt, this complete technical reference guide covers every configuration step in expert detail."
        category="wifi"
        breadcrumbs={breadcrumbs}
        faqs={faqs}
        troubleshootingSteps={troubleshootingSteps}
        warningBanner={{
          title: "Security Notice: Change the Default Admin Password on First Login",
          text: "Xiaomi Mi Routers ship with a label-printed unique password, but this credential is visible to anyone who physically handles the router. Immediately after your first login, navigate to Settings > Administration > Admin Password and set a strong, custom password. Also change the default Wi-Fi password to a unique passphrase to prevent unauthorized local network access.",
        }}
        quickFixChecklist={quickFixChecklist}
        commonCauses={commonCauses}
        whenToContactISP="If your Xiaomi Mi Router shows a persistent WAN disconnection despite correct PPPoE credentials and a working physical cable, your DNS tests timeout even with manually set servers (8.8.8.8), or the signal-to-noise ratio on a DSL connection is below threshold, the problem is upstream of your router. Contact your ISP to perform a line test, reset the DSLAM port, or verify that your account is active and has not been rate-limited."
        severityLevel="medium"
      >
        <div className="space-y-12">

          {/* =============================================================
              FEATURED SNIPPET: HOW TO LOGIN TO A XIAOMI ROUTER
              ============================================================= */}
          <section
            className="glass-card p-6 border border-orange-950/20 bg-orange-950/5 rounded-2xl relative overflow-hidden space-y-4"
            aria-label="How to Login to a Xiaomi Mi Router"
          >
            <div className="absolute top-0 right-0 bg-orange-500/10 text-orange-400 text-[10px] font-mono uppercase tracking-wider px-3 py-1 rounded-bl-lg font-bold">
              Featured Snippet
            </div>
            <h2 className="text-sm font-bold text-orange-400 uppercase tracking-wide flex items-center gap-1.5">
              <Zap size={16} /> How to Login to a Xiaomi Mi Router
            </h2>
            <div className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
              <p className="mb-3">
                Follow these steps to access your Xiaomi Mi Router administration panel:
              </p>
              <ol className="list-decimal pl-5 space-y-2 text-xs text-[var(--text-secondary)] font-medium">
                <li>
                  <strong>Connect to the Mi Router Network:</strong> Plug an Ethernet cable from your PC into any LAN port, or join the default Wi-Fi SSID and password printed on the router label.
                </li>
                <li>
                  <strong>Open a Web Browser:</strong> Launch Chrome, Edge, Firefox, or Safari in Incognito/Private mode to clear cached DNS entries.
                </li>
                <li>
                  <strong>Type the Gateway Address:</strong> Enter{" "}
                  <Link href="/ips/192-168-31-1" className="text-orange-400 hover:underline font-mono">
                    192.168.31.1
                  </Link>{" "}
                  directly into the URL bar and press Enter. Alternatively, type{" "}
                  <strong>miwifi.com</strong>.
                </li>
                <li>
                  <strong>Enter Admin Password:</strong> Check the bottom sticker for the device-unique label password. Enter it and click Log In.
                </li>
                <li>
                  <strong>Manage Your Network:</strong> You are now in the MiWiFi dashboard. Configure Wi-Fi, port forwarding, parental controls, or firmware updates from the menu.
                </li>
              </ol>
            </div>
          </section>

          {/* =============================================================
              1. XIAOMI LOGIN ADDRESSES LOOKUP
              ============================================================= */}
          <section className="space-y-4" id="login-addresses" aria-label="Xiaomi Login Addresses Lookup">
            <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
              <Globe size={18} className="text-orange-400" />
              1. Xiaomi Router Login Addresses Lookup
            </h2>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Xiaomi Mi Routers use different default IP addresses depending on the product generation and network configuration. The table below maps each access method to its use case.
            </p>
            <div className="overflow-x-auto rounded-xl border border-white/5">
              <table className="w-full text-xs text-[var(--text-secondary)]">
                <thead>
                  <tr className="bg-orange-500/10 text-orange-300 text-left">
                    <th className="px-4 py-3 font-semibold">Address / IP</th>
                    <th className="px-4 py-3 font-semibold">Typical Usage</th>
                    <th className="px-4 py-3 font-semibold">Important Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {loginAddresses.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white/[0.02]" : "bg-white/[0.04]"}>
                      <td className="px-4 py-3 font-mono text-orange-300 font-semibold">
                        {row.address === "192.168.31.1" ? (
                          <Link href="/ips/192-168-31-1" className="hover:underline">
                            192.168.31.1
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
            <p className="text-xs text-[var(--text-tertiary)] leading-relaxed">
              <Info size={12} className="inline mr-1 text-orange-400" />
              For a full explanation of gateway IP addresses and how routers assign them, see our{" "}
              <Link href="/ips" className="text-orange-400 hover:underline">
                router IP address directory
              </Link>.
            </p>
          </section>

          {/* =============================================================
              2. ABOUT XIAOMI ROUTERS
              ============================================================= */}
          <section className="space-y-4" id="about-xiaomi" aria-label="About Xiaomi Routers">
            <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
              <Cpu size={18} className="text-orange-400" />
              2. About Xiaomi Routers: Brand History &amp; Legacy
            </h2>
            <div className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed space-y-3">
              <p>
                Founded in 2010 in Beijing, China, Xiaomi Corporation entered the networking hardware market in 2013 with the original Mi Router — a device that immediately stood out for combining powerful hardware specifications (previously found only in expensive routers) with an aggressively low price point. This approach disrupted the home networking market, particularly in Asia, and established Xiaomi as a formidable challenger to incumbent brands like TP-Link, Asus, and Netgear.
              </p>
              <p>
                Xiaomi&apos;s router software platform, <strong>MiWiFi</strong>, is built on a customized Linux-based operating system with a modern web interface and deep integration with the <strong>Mi Ecosystem</strong> — Xiaomi&apos;s interconnected smart home product suite. The MiWiFi app ties router management directly to the user&apos;s Xiaomi account, enabling remote access, parental controls, and smart home device management from a single app.
              </p>
              <p>
                A distinctive aspect of Xiaomi routers is their popularity within the networking enthusiast and developer community. Many Xiaomi router models — particularly the Mi Router 4A Gigabit, 3G, and AX3000 — are officially or semi-officially supported by <strong>OpenWrt</strong>, the open-source Linux router distribution, making them attractive for users who want full control over their firmware.
              </p>
              <p>
                Explore how Xiaomi compares to other brands in our comprehensive{" "}
                <Link href="/routers" className="text-orange-400 hover:underline">
                  router brand directory
                </Link>.
              </p>
            </div>
          </section>

          {/* =============================================================
              3. XIAOMI PRODUCT FAMILIES
              ============================================================= */}
          <section className="space-y-4" id="product-families" aria-label="Xiaomi Product Families">
            <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
              <Layers size={18} className="text-orange-400" />
              3. Xiaomi Router Product Families
            </h2>
            <div className="overflow-x-auto rounded-xl border border-white/5">
              <table className="w-full text-xs text-[var(--text-secondary)]">
                <thead>
                  <tr className="bg-orange-500/10 text-orange-300 text-left">
                    <th className="px-4 py-3 font-semibold">Series</th>
                    <th className="px-4 py-3 font-semibold">Product Family</th>
                    <th className="px-4 py-3 font-semibold">Target Audience</th>
                    <th className="px-4 py-3 font-semibold">Key Features</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white/[0.02]">
                    <td className="px-4 py-3 font-mono font-semibold text-orange-300">AX Series</td>
                    <td className="px-4 py-3">Wi-Fi 6 Home Routers</td>
                    <td className="px-4 py-3">Home users, apartments, gamers</td>
                    <td className="px-4 py-3">OFDMA, MU-MIMO, 160MHz support, hardware NAT offloading</td>
                  </tr>
                  <tr className="bg-white/[0.04]">
                    <td className="px-4 py-3 font-mono font-semibold text-orange-300">BE Series</td>
                    <td className="px-4 py-3">Wi-Fi 7 Next-Gen Routers</td>
                    <td className="px-4 py-3">Power users, future-proof homes</td>
                    <td className="px-4 py-3">MLO, 320MHz 6GHz, 4K-QAM, 2.5G ports, ultra-low latency</td>
                  </tr>
                  <tr className="bg-white/[0.02]">
                    <td className="px-4 py-3 font-mono font-semibold text-orange-300">Mesh System</td>
                    <td className="px-4 py-3">Whole-Home Mesh Wi-Fi</td>
                    <td className="px-4 py-3">Large homes, multi-floor buildings</td>
                    <td className="px-4 py-3">Dedicated wireless backhaul, seamless roaming, single SSID</td>
                  </tr>
                  <tr className="bg-white/[0.04]">
                    <td className="px-4 py-3 font-mono font-semibold text-orange-300">Redmi Router</td>
                    <td className="px-4 py-3">Budget Wi-Fi 6 Routers</td>
                    <td className="px-4 py-3">Budget-conscious users, small apartments</td>
                    <td className="px-4 py-3">Cost-effective Wi-Fi 6, solid range, basic parental controls</td>
                  </tr>
                  <tr className="bg-white/[0.02]">
                    <td className="px-4 py-3 font-mono font-semibold text-orange-300">Mi Router 4 Series</td>
                    <td className="px-4 py-3">Developer-Friendly Routers</td>
                    <td className="px-4 py-3">Tech enthusiasts, OpenWrt users</td>
                    <td className="px-4 py-3">SSH access, OpenWrt support, USB port (select models), Gigabit LAN</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* =============================================================
              4. LOGIN GUIDE (3 METHODS)
              ============================================================= */}
          <section className="space-y-4" id="login-guide" aria-label="Xiaomi Login Guide">
            <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
              <Lock size={18} className="text-orange-400" />
              4. Xiaomi Router Login Guide (3 Methods)
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {/* Method 1 */}
              <div className="glass-card p-5 rounded-xl border border-orange-900/20 space-y-3">
                <div className="w-8 h-8 rounded-lg bg-orange-500/15 flex items-center justify-center">
                  <Globe size={16} className="text-orange-400" />
                </div>
                <h3 className="text-sm font-bold text-[var(--text-primary)]">
                  Method 1: IP Address
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Type{" "}
                  <Link href="/ips/192-168-31-1" className="text-orange-400 font-mono hover:underline">
                    192.168.31.1
                  </Link>{" "}
                  directly into your browser URL bar. Works on all Xiaomi routers regardless of DNS or VPN configuration — the most reliable access method.
                </p>
                <div className="rounded-lg bg-black/30 border border-white/10 overflow-hidden text-[10px]">
                  <div className="flex items-center gap-1.5 px-2 py-1.5 bg-white/5 border-b border-white/10">
                    <span className="w-2 h-2 rounded-full bg-red-400/60" />
                    <span className="w-2 h-2 rounded-full bg-yellow-400/60" />
                    <span className="w-2 h-2 rounded-full bg-green-400/60" />
                  </div>
                  <div className="flex items-center gap-1 px-2 py-1 bg-white/[0.03] border-b border-white/10">
                    <Lock size={8} className="text-green-400" />
                    <span className="font-mono text-green-300">192.168.31.1</span>
                  </div>
                  <div className="px-3 py-3 space-y-1.5">
                    <div className="text-[9px] font-bold text-white/70">MiWiFi Router Login</div>
                    <div className="flex gap-1">
                      <span className="text-white/40 text-[8px]">Password:</span>
                      <span className="font-mono text-orange-300 text-[8px]">••••••••</span>
                    </div>
                    <div className="mt-1 h-4 w-full rounded bg-orange-500/30 flex items-center justify-center">
                      <span className="text-[8px] text-orange-300 font-semibold">Log In</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Method 2 */}
              <div className="glass-card p-5 rounded-xl border border-amber-900/20 space-y-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/15 flex items-center justify-center">
                  <Network size={16} className="text-amber-400" />
                </div>
                <h3 className="text-sm font-bold text-[var(--text-primary)]">
                  Method 2: miwifi.com Hostname
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Type <strong>miwifi.com</strong> in the URL bar. Xiaomi resolves this locally via mDNS to 192.168.31.1. Requires direct connection to the Mi Router network without VPN or DoH interference.
                </p>
                <div className="rounded-lg bg-black/30 border border-white/10 overflow-hidden text-[10px]">
                  <div className="flex items-center gap-1.5 px-2 py-1.5 bg-white/5 border-b border-white/10">
                    <span className="w-2 h-2 rounded-full bg-red-400/60" />
                    <span className="w-2 h-2 rounded-full bg-yellow-400/60" />
                    <span className="w-2 h-2 rounded-full bg-green-400/60" />
                  </div>
                  <div className="flex items-center gap-1 px-2 py-1 bg-white/[0.03] border-b border-white/10">
                    <Lock size={8} className="text-green-400" />
                    <span className="font-mono text-green-300">miwifi.com</span>
                  </div>
                  <div className="px-3 py-3 space-y-1.5">
                    <div className="text-[9px] font-bold text-white/70">MiWiFi Router Login</div>
                    <div className="flex gap-1">
                      <span className="text-white/40 text-[8px]">Password:</span>
                      <span className="font-mono text-amber-300 text-[8px]">••••••••</span>
                    </div>
                    <div className="mt-1 h-4 w-full rounded bg-amber-500/30 flex items-center justify-center">
                      <span className="text-[8px] text-amber-300 font-semibold">Log In</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Method 3 */}
              <div className="glass-card p-5 rounded-xl border border-yellow-900/20 space-y-3">
                <div className="w-8 h-8 rounded-lg bg-yellow-500/15 flex items-center justify-center">
                  <Smartphone size={16} className="text-yellow-400" />
                </div>
                <h3 className="text-sm font-bold text-[var(--text-primary)]">
                  Method 3: MiWiFi App
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Download <strong>MiWiFi</strong> (iOS/Android). Sign in with your Xiaomi account. The app auto-discovers Mi Routers on your network and supports remote management via cloud.
                </p>
                <div className="rounded-lg bg-black/30 border border-white/10 overflow-hidden text-[10px] px-3 py-3 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-orange-500/20 flex items-center justify-center">
                      <Radio size={10} className="text-orange-400" />
                    </div>
                    <span className="text-[9px] font-bold text-white/70">MiWiFi App</span>
                  </div>
                  <div className="text-[8px] text-white/40">Scanning local network…</div>
                  <div className="flex items-center gap-1.5 bg-white/5 rounded px-2 py-1">
                    <CheckCircle2 size={8} className="text-green-400" />
                    <span className="text-[8px] text-green-300">Found: Mi Router AX6000</span>
                  </div>
                  <div className="h-4 w-full rounded bg-yellow-500/30 flex items-center justify-center">
                    <span className="text-[8px] text-yellow-300 font-semibold">Manage Router</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* =============================================================
              5. DEFAULT USERNAMES & PASSWORDS
              ============================================================= */}
          <section className="space-y-4" id="default-credentials" aria-label="Xiaomi Default Credentials">
            <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
              <Shield size={18} className="text-orange-400" />
              5. Xiaomi Default Usernames &amp; Passwords Lookup
            </h2>
            <div className="overflow-x-auto rounded-xl border border-white/5">
              <table className="w-full text-xs text-[var(--text-secondary)]">
                <thead>
                  <tr className="bg-orange-500/10 text-orange-300 text-left">
                    <th className="px-4 py-3 font-semibold">Model</th>
                    <th className="px-4 py-3 font-semibold">Default IP</th>
                    <th className="px-4 py-3 font-semibold">Username</th>
                    <th className="px-4 py-3 font-semibold">Admin Password</th>
                    <th className="px-4 py-3 font-semibold">Wi-Fi Password</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white/[0.02]">
                    <td className="px-4 py-3 font-mono font-semibold">AX3000 / AX6000 / BE7000</td>
                    <td className="px-4 py-3 font-mono">192.168.31.1</td>
                    <td className="px-4 py-3 font-mono">admin</td>
                    <td className="px-4 py-3 font-semibold text-orange-300">Unique — on bottom label</td>
                    <td className="px-4 py-3 text-[var(--text-tertiary)]">Printed on label</td>
                  </tr>
                  <tr className="bg-white/[0.04]">
                    <td className="px-4 py-3 font-mono font-semibold">Mi Router 4A Gigabit / 4C</td>
                    <td className="px-4 py-3 font-mono">192.168.31.1</td>
                    <td className="px-4 py-3 font-mono">admin</td>
                    <td className="px-4 py-3 font-semibold text-orange-300">Set during first setup</td>
                    <td className="px-4 py-3 text-[var(--text-tertiary)]">Set during first setup</td>
                  </tr>
                  <tr className="bg-white/[0.02]">
                    <td className="px-4 py-3 font-mono font-semibold">Redmi AX5400 / AX3000</td>
                    <td className="px-4 py-3 font-mono">192.168.31.1</td>
                    <td className="px-4 py-3 font-mono">admin</td>
                    <td className="px-4 py-3 font-semibold text-orange-300">Unique — on bottom label</td>
                    <td className="px-4 py-3 text-[var(--text-tertiary)]">Printed on label</td>
                  </tr>
                  <tr className="bg-white/[0.04]">
                    <td className="px-4 py-3 font-mono font-semibold">Mi Router 3 / Mini</td>
                    <td className="px-4 py-3 font-mono">192.168.31.1</td>
                    <td className="px-4 py-3 font-mono">admin</td>
                    <td className="px-4 py-3 font-mono text-gray-400">Set during first setup</td>
                    <td className="px-4 py-3 text-[var(--text-tertiary)]">Set during first setup</td>
                  </tr>
                  <tr className="bg-white/[0.02]">
                    <td className="px-4 py-3 font-mono font-semibold">Mi Router 1 / 2 (Legacy)</td>
                    <td className="px-4 py-3 font-mono">192.168.1.1</td>
                    <td className="px-4 py-3 font-mono">admin</td>
                    <td className="px-4 py-3 font-mono text-gray-400">Set during first setup</td>
                    <td className="px-4 py-3 text-[var(--text-tertiary)]">Set during first setup</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* =============================================================
              6. FIND ROUTER PASSWORD
              ============================================================= */}
          <section className="space-y-4" id="find-password" aria-label="Find Xiaomi Router Password">
            <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
              <Search size={18} className="text-orange-400" />
              6. How to Find Your Xiaomi Mi Router Password
            </h2>
            <div className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed space-y-3">
              <ol className="list-decimal pl-5 space-y-3 text-xs">
                <li>
                  <strong>Bottom Label Sticker:</strong> Flip your Mi Router over. The label includes the admin password (labeled &apos;Admin Password&apos; or &apos;Password&apos;), Wi-Fi SSID, and Wi-Fi key. Modern models have device-unique values.
                </li>
                <li>
                  <strong>MiWiFi App (Xiaomi Account):</strong> If you bound the router to your Xiaomi account during setup, open the MiWiFi app, sign in, select your router, and tap Wi-Fi Settings to view the current Wi-Fi password. Admin password recovery via app is model-dependent.
                </li>
                <li>
                  <strong>Windows Network Manager:</strong> On a PC connected to the Mi Router Wi-Fi, go to Control Panel &gt; Network and Sharing Center &gt; Wi-Fi adapter Properties &gt; Security tab &gt; Show Characters to reveal the Wi-Fi password.
                </li>
                <li>
                  <strong>Browser Saved Passwords:</strong> Check Chrome or Edge saved passwords for entries matching 192.168.31.1 or miwifi.com to recover a previously saved admin password.
                </li>
                <li>
                  <strong>Factory Reset:</strong> As a last resort, perform a hard reset using the RESET pinhole button (hold 5–10 seconds). See our full{" "}
                  <Link href="/router-password" className="text-orange-400 hover:underline">
                    router password recovery guide
                  </Link>.
                </li>
              </ol>
            </div>
          </section>

          {/* =============================================================
              7. INITIAL SETUP GUIDE
              ============================================================= */}
          <section className="space-y-4" id="setup-guide" aria-label="Xiaomi Initial Setup Guide">
            <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
              <Settings size={18} className="text-orange-400" />
              7. Initial Setup Guide for Xiaomi Mi Routers
            </h2>
            <div className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed space-y-3">
              <h3 className="text-xs font-bold text-[var(--text-primary)]">Method 1: Web Browser Setup</h3>
              <ol className="list-decimal pl-5 space-y-2 text-xs">
                <li>Power off your broadband modem and wait 30 seconds.</li>
                <li>Connect an Ethernet cable from the modem LAN output to the Mi Router&apos;s blue WAN port.</li>
                <li>Power on the modem first, then power on the Mi Router.</li>
                <li>Wait for the indicator light to turn solid blue (connected) or blinking yellow (negotiating).</li>
                <li>Connect your PC to the Mi Router via Ethernet or join its default Wi-Fi SSID (on label).</li>
                <li>Open a browser and navigate to <code>http://192.168.31.1</code> or <code>http://miwifi.com</code>.</li>
                <li>The MiWiFi Setup Wizard launches. Select your internet connection type:
                  <ul className="list-disc pl-5 mt-1 space-y-1 text-xs">
                    <li><strong>Dynamic IP (DHCP):</strong> Auto-detects — used by most cable and fiber connections.</li>
                    <li><strong>PPPoE:</strong> Enter ISP username and password (DSL and fiber PPPoE providers).</li>
                    <li><strong>Static IP:</strong> Manually enter IP, gateway, subnet mask, and DNS from your ISP.</li>
                  </ul>
                </li>
                <li>Set your Wi-Fi SSID and password (for 2.4GHz and 5GHz separately, or unified Smart Connect).</li>
                <li>Set a strong admin password. Optionally bind the router to your Xiaomi account for remote access.</li>
                <li>Click Complete Setup. The router reboots. Reconnect using your new Wi-Fi credentials.</li>
              </ol>
              <h3 className="text-xs font-bold text-[var(--text-primary)] mt-4">Method 2: MiWiFi App Setup</h3>
              <p>
                Download the MiWiFi app. Sign in or create a Xiaomi account. Tap the &apos;+&apos; button and select your router model. The app guides you through connection type selection, Wi-Fi naming, and admin password configuration via a step-by-step wizard — no web browser required.
              </p>
            </div>
          </section>

          {/* =============================================================
              8. WI-FI OPTIMIZATION
              ============================================================= */}
          <section className="space-y-4" id="wifi-optimization" aria-label="Xiaomi Wi-Fi Optimization">
            <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
              <Wifi size={18} className="text-orange-400" />
              8. Xiaomi Mi Router Wi-Fi Optimization
            </h2>
            <div className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed space-y-3">
              <h3 className="text-xs font-bold text-[var(--text-primary)]">Band Management</h3>
              <p>
                Xiaomi Smart Connect (unified SSID) automatically steers devices between 2.4GHz and 5GHz. To manually separate bands: go to Settings &gt; Wi-Fi Settings &gt; Smart Connect &gt; Off. This lets you assign IoT devices (smart bulbs, sensors) exclusively to 2.4GHz and phones/laptops to 5GHz for optimal performance.
              </p>
              <h3 className="text-xs font-bold text-[var(--text-primary)]">Optimal Channel Selection</h3>
              <ul className="list-disc pl-5 space-y-1 text-xs">
                <li><strong>2.4GHz:</strong> Set to channel 1, 6, or 11 (non-overlapping). Use 20MHz channel width in dense environments.</li>
                <li><strong>5GHz:</strong> Set to channels 36–48 (UNII-1) or 149–165 (UNII-3). Use 80MHz or 160MHz channel width on AX6000/BE7000 for maximum bandwidth.</li>
              </ul>
              <h3 className="text-xs font-bold text-[var(--text-primary)]">Gaming Mode (AX6000 / AX3600)</h3>
              <p>
                The Mi Router AX6000 and AX3600 feature a dedicated Gaming Acceleration mode. Enable it under Settings &gt; Advanced Settings &gt; Gaming Acceleration. This mode prioritizes UDP gaming traffic, reduces packet scheduling latency, and dedicates the secondary 5GHz radio (on tri-band models) as a gaming-optimized band for connected gaming devices.
              </p>
            </div>
          </section>

          {/* =============================================================
              9. FIRMWARE UPDATES
              ============================================================= */}
          <section className="space-y-4" id="firmware-updates" aria-label="Xiaomi Firmware Updates">
            <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
              <RefreshCw size={18} className="text-orange-400" />
              9. How to Update Xiaomi Mi Router Firmware
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="glass-card p-5 rounded-xl border border-orange-900/20 space-y-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-7 h-7 rounded-lg bg-orange-500/15 flex items-center justify-center">
                    <Globe size={14} className="text-orange-400" />
                  </div>
                  <h3 className="text-sm font-bold text-[var(--text-primary)]">
                    Method A: Automatic OTA Update
                  </h3>
                </div>
                <ol className="space-y-2 text-xs text-[var(--text-secondary)] list-decimal pl-4">
                  <li>Log in to MiWiFi dashboard at <code className="text-orange-300">192.168.31.1</code>.</li>
                  <li>Navigate to <strong>Settings</strong> &rarr; <strong>System Update</strong>.</li>
                  <li>Click <strong>&ldquo;Check for Updates&rdquo;</strong>.</li>
                  <li>If available, click <strong>&ldquo;Update Now&rdquo;</strong>.</li>
                  <li>Wait 3–5 minutes. Do <em>not</em> power off during the flash.</li>
                  <li>Router auto-reboots after successful update.</li>
                </ol>
                <div className="text-[10px] text-orange-300/80 bg-orange-500/5 rounded-lg px-3 py-2">
                  <strong>Requirement:</strong> Active WAN internet connection required for OTA downloads.
                </div>
              </div>
              <div className="glass-card p-5 rounded-xl border border-orange-900/20 space-y-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-7 h-7 rounded-lg bg-orange-500/15 flex items-center justify-center">
                    <FileText size={14} className="text-orange-400" />
                  </div>
                  <h3 className="text-sm font-bold text-[var(--text-primary)]">
                    Method B: Manual Firmware Upload
                  </h3>
                </div>
                <ol className="space-y-2 text-xs text-[var(--text-secondary)] list-decimal pl-4">
                  <li>Visit <strong>miwifi.com/download</strong> and select your exact router model.</li>
                  <li>Download the latest firmware <code>.bin</code> file to your PC.</li>
                  <li>Log in to the MiWiFi dashboard.</li>
                  <li>Go to <strong>Settings</strong> &rarr; <strong>Manual Firmware Update</strong>.</li>
                  <li>Click <strong>Choose File</strong>, select the .bin file, and click <strong>Update</strong>.</li>
                  <li>Wait for the progress bar to complete. Do not close the browser tab.</li>
                </ol>
                <div className="text-[10px] text-orange-300/80 bg-orange-500/5 rounded-lg px-3 py-2">
                  <strong>Warning:</strong> Install only firmware built for your exact model and hardware revision.
                </div>
              </div>
            </div>
          </section>

          {/* =============================================================
              10. RESET GUIDE
              ============================================================= */}
          <section className="space-y-4" id="reset-guide" aria-label="Xiaomi Reset Guide">
            <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
              <RefreshCw size={18} className="text-orange-400" />
              10. How to Reset a Xiaomi Mi Router
            </h2>
            <div className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed space-y-3">
              <h3 className="text-xs font-bold text-[var(--text-primary)]">Method 1: Dashboard Soft Reset</h3>
              <p>
                Log in to http://192.168.31.1, navigate to Settings &gt; Advanced Settings &gt; Factory Reset, click &apos;Restore Factory Settings&apos; and confirm. The router reboots to factory defaults within 90 seconds.
              </p>
              <h3 className="text-xs font-bold text-[var(--text-primary)]">Method 2: Physical RESET Pinhole</h3>
              <ol className="list-decimal pl-5 space-y-2 text-xs">
                <li>Ensure the Mi Router is powered on (indicator light is active).</li>
                <li>Find the recessed RESET pinhole on the rear or bottom panel.</li>
                <li>Press and hold using a paperclip for <strong>5–10 seconds</strong>.</li>
                <li>Release when the indicator light flashes yellow/orange or blinks rapidly.</li>
                <li>Wait 90–120 seconds for the router to fully reboot with factory defaults.</li>
              </ol>
              <p>
                For complete reset instructions across all router brands, see our{" "}
                <Link href="/router-reset" className="text-orange-400 hover:underline">
                  router reset guide
                </Link>.
              </p>
            </div>
          </section>

          {/* =============================================================
              LED STATUS GUIDE
              ============================================================= */}
          <section className="space-y-4" id="led-guide" aria-label="Xiaomi LED Status Guide">
            <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
              <Sliders size={18} className="text-orange-400" />
              11. Xiaomi Router LED Status Guide
            </h2>
            <div className="overflow-x-auto rounded-xl border border-white/5">
              <table className="w-full text-xs text-[var(--text-secondary)]">
                <thead>
                  <tr className="bg-orange-500/10 text-orange-300 text-left">
                    <th className="px-4 py-3 font-semibold">LED State</th>
                    <th className="px-4 py-3 font-semibold">Diagnostic Meaning</th>
                    <th className="px-4 py-3 font-semibold">Recommended Action</th>
                  </tr>
                </thead>
                <tbody>
                  {ledStatuses.map((led, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white/[0.02]" : "bg-white/[0.04]"}>
                      <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">{led.color}</td>
                      <td className="px-4 py-3">{led.meaning}</td>
                      <td className="px-4 py-3 text-[var(--text-tertiary)]">{led.fix}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* =============================================================
              12. ERROR CODES
              ============================================================= */}
          <section className="space-y-4" id="error-codes" aria-label="Xiaomi Error Codes">
            <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
              <AlertTriangle size={18} className="text-orange-400" />
              12. Common Xiaomi Router Errors &amp; Fixes
            </h2>
            <div className="overflow-x-auto rounded-xl border border-white/5">
              <table className="w-full text-xs text-[var(--text-secondary)]">
                <thead>
                  <tr className="bg-orange-500/10 text-orange-300 text-left">
                    <th className="px-4 py-3 font-semibold">Error / Status</th>
                    <th className="px-4 py-3 font-semibold">Root Cause</th>
                    <th className="px-4 py-3 font-semibold">Resolution</th>
                  </tr>
                </thead>
                <tbody>
                  {errorCodes.map((err, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white/[0.02]" : "bg-white/[0.04]"}>
                      <td className="px-4 py-3 font-semibold text-orange-300">{err.error}</td>
                      <td className="px-4 py-3">{err.meaning}</td>
                      <td className="px-4 py-3 text-[var(--text-tertiary)]">{err.fix}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* =============================================================
              13. GAMING PERFORMANCE
              ============================================================= */}
          <section className="space-y-4" id="gaming" aria-label="Xiaomi Gaming Performance">
            <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
              <Gamepad2 size={18} className="text-orange-400" />
              13. Xiaomi Mi Routers for Gaming
            </h2>
            <div className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed space-y-3">
              <p>
                Xiaomi&apos;s flagship routers offer compelling gaming performance for their price. Key features for gamers include:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  {
                    title: "Hardware NAT Offloading",
                    body: "The AX6000 and BE7000 include dedicated hardware NAT acceleration that processes routing at line-rate without burdening the CPU. This enables full multi-gigabit throughput even with many connected devices, reducing latency caused by software NAT processing delays.",
                  },
                  {
                    title: "Gaming Acceleration Mode",
                    body: "Enable under Settings > Gaming Acceleration. Xiaomi's gaming mode prioritizes UDP gaming packets in the QoS scheduler, reducing in-game jitter and packet delay variation during congestion. On the tri-band AX3600, the second 5GHz radio is dedicated to gaming device connections.",
                  },
                  {
                    title: "UPnP for Open NAT",
                    body: "Enable UPnP under Advanced Settings > NAT > UPnP. This allows PlayStation 5, Xbox Series X, and gaming PCs to automatically negotiate NAT port mappings, achieving Open NAT Type for fast matchmaking and P2P session stability. For our full guide see " + "our NAT type guide.",
                  },
                  {
                    title: "2.5G WAN for Multi-Gigabit Plans",
                    body: "The AX6000 and BE7000 include a 2.5G WAN port. If your ISP provides a multi-gigabit fiber plan (e.g., 2Gbps), this port fully utilizes the extra bandwidth, eliminating the 1Gbps bottleneck of standard WAN ports on competing models at this price point.",
                  },
                ].map((item, i) => (
                  <div key={i} className="glass-card p-5 rounded-xl border border-white/5 space-y-2">
                    <h3 className="text-sm font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
                      <CheckCircle2 size={14} className="text-green-400" />
                      {item.title}
                    </h3>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{item.body}</p>
                  </div>
                ))}
              </div>
              <p>
                See our guides on{" "}
                <Link href="/best-router-for-gaming" className="text-orange-400 hover:underline">best gaming routers</Link>
                {" "}and{" "}
                <Link href="/wifi-6-for-gaming" className="text-orange-400 hover:underline">Wi-Fi 6 for gaming</Link>.
              </p>
            </div>
          </section>

          {/* =============================================================
              14. BEST XIAOMI ROUTERS TABLE
              ============================================================= */}
          <section className="space-y-4" id="best-routers" aria-label="Best Xiaomi Routers">
            <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
              <Star size={18} className="text-orange-400" />
              14. Best Xiaomi Mi Routers by Use Case (2026)
            </h2>
            <div className="overflow-x-auto rounded-xl border border-white/5">
              <table className="w-full text-xs text-[var(--text-secondary)]">
                <thead>
                  <tr className="bg-orange-500/10 text-orange-300 text-left">
                    <th className="px-4 py-3 font-semibold">Best For</th>
                    <th className="px-4 py-3 font-semibold">Model</th>
                    <th className="px-4 py-3 font-semibold">Standard</th>
                    <th className="px-4 py-3 font-semibold">Speed Class</th>
                    <th className="px-4 py-3 font-semibold">Key Advantage</th>
                  </tr>
                </thead>
                <tbody>
                  {bestRouters.map((r, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white/[0.02]" : "bg-white/[0.04]"}>
                      <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">{r.useCase}</td>
                      <td className="px-4 py-3 font-mono text-orange-300">{r.model}</td>
                      <td className="px-4 py-3">{r.standard}</td>
                      <td className="px-4 py-3 font-mono">{r.speed}</td>
                      <td className="px-4 py-3 text-[var(--text-tertiary)]">{r.highlight}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* =============================================================
              15. MODEL LOOKUP MATRIX
              ============================================================= */}
          <section className="space-y-4" id="model-lookup" aria-label="Xiaomi Model Lookup">
            <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
              <Server size={18} className="text-orange-400" />
              15. Xiaomi Router Model Specifications
            </h2>
            <div className="overflow-x-auto rounded-xl border border-white/5">
              <table className="w-full text-xs text-[var(--text-secondary)]">
                <thead>
                  <tr className="bg-orange-500/10 text-orange-300 text-left">
                    <th className="px-4 py-3 font-semibold">Model</th>
                    <th className="px-4 py-3 font-semibold">Standard</th>
                    <th className="px-4 py-3 font-semibold">Speed Class</th>
                    <th className="px-4 py-3 font-semibold">Notable Features</th>
                  </tr>
                </thead>
                <tbody>
                  {xiaomiModels.map((m, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white/[0.02]" : "bg-white/[0.04]"}>
                      <td className="px-4 py-3 font-mono font-semibold">{m.model}</td>
                      <td className="px-4 py-3">{m.standard}</td>
                      <td className="px-4 py-3 font-mono text-orange-300">{m.speed}</td>
                      <td className="px-4 py-3 text-[var(--text-tertiary)]">{m.highlight}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* =============================================================
              16. SECURITY CHECKLIST
              ============================================================= */}
          <section className="space-y-4" id="security" aria-label="Xiaomi Router Security">
            <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
              <Shield size={18} className="text-orange-400" />
              16. Xiaomi Router Security Checklist
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="glass-card p-5 rounded-xl border border-white/5 space-y-3">
                <h3 className="text-sm font-semibold text-[var(--text-primary)]">Essential Steps</h3>
                <ul className="space-y-2 text-xs text-[var(--text-secondary)]">
                  {[
                    "Change default admin password on first login",
                    "Set WPA3 encryption (or WPA2-AES minimum)",
                    "Disable WPS — vulnerable to brute-force attacks",
                    "Create a separate Guest Wi-Fi for IoT and visitors",
                    "Disable remote management unless specifically needed",
                    "Keep firmware updated with monthly checks",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 size={12} className="text-green-400 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glass-card p-5 rounded-xl border border-white/5 space-y-3">
                <h3 className="text-sm font-semibold text-[var(--text-primary)]">Advanced Security</h3>
                <ul className="space-y-2 text-xs text-[var(--text-secondary)]">
                  {[
                    "Enable SPI Firewall under Advanced > Security",
                    "Configure Parental Controls with usage time limits",
                    "Change LAN subnet from 192.168.31.X to a less-common range",
                    "Disable UPnP if no gaming console requires it",
                    "Review connected devices list for unknown MAC addresses",
                    "Bind router to Xiaomi account for theft recovery tracking",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <ShieldAlert size={12} className="text-amber-400 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* =============================================================
              17. MESH SYSTEMS
              ============================================================= */}
          <section className="space-y-4" id="mesh" aria-label="Xiaomi Mesh WiFi">
            <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
              <Radio size={18} className="text-orange-400" />
              17. Xiaomi Mesh Wi-Fi Systems
            </h2>
            <div className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed space-y-3">
              <p>
                The Xiaomi Mesh System (AX3000 2-pack or 3-pack) uses a dedicated 5GHz wireless backhaul channel between nodes for data transport, keeping the primary 5GHz band fully available for client devices. This dedicated backhaul architecture avoids the throughput penalty common in two-band mesh systems.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="glass-card p-5 rounded-xl border border-white/5 space-y-2">
                  <h3 className="text-sm font-semibold text-[var(--text-primary)]">Mesh Setup Steps</h3>
                  <ol className="list-decimal pl-4 space-y-1 text-xs">
                    <li>Connect primary router to modem and complete internet setup.</li>
                    <li>Power on satellite mesh node within 3m of primary router.</li>
                    <li>Open the MiWiFi app on your phone.</li>
                    <li>Select primary router and tap &apos;Add Mesh Node&apos;.</li>
                    <li>Follow prompts — node auto-pairs via the backhaul band.</li>
                    <li>Move satellite to its permanent location once paired.</li>
                  </ol>
                </div>
                <div className="glass-card p-5 rounded-xl border border-white/5 space-y-2">
                  <h3 className="text-sm font-semibold text-[var(--text-primary)]">Mesh Performance Tips</h3>
                  <ul className="list-disc pl-4 space-y-1 text-xs">
                    <li>Use wired Ethernet backhaul between nodes for best performance.</li>
                    <li>Keep satellite nodes within clear line of sight of primary.</li>
                    <li>Avoid thick concrete walls between primary and satellite.</li>
                    <li>Target signal strength &gt; −70 dBm between nodes.</li>
                    <li>Use the MiWiFi app topology view to verify mesh stability.</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* =============================================================
              18. XIAOMI vs TP-LINK vs ASUS COMPARISON
              ============================================================= */}
          <section className="space-y-4" id="comparison" aria-label="Xiaomi vs Competitors">
            <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
              <Gauge size={18} className="text-orange-400" />
              18. Xiaomi vs TP-Link vs ASUS: Full Comparison
            </h2>
            <div className="overflow-x-auto rounded-xl border border-white/5">
              <table className="w-full text-xs text-[var(--text-secondary)]">
                <thead>
                  <tr className="bg-orange-500/10 text-orange-300 text-left">
                    <th className="px-4 py-3 font-semibold">Feature</th>
                    <th className="px-4 py-3 font-semibold">Xiaomi</th>
                    <th className="px-4 py-3 font-semibold">TP-Link</th>
                    <th className="px-4 py-3 font-semibold">ASUS</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white/[0.02]" : "bg-white/[0.04]"}>
                      <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">{row.feature}</td>
                      <td className="px-4 py-3 text-orange-300">{row.xiaomi}</td>
                      <td className="px-4 py-3">{row.tplink}</td>
                      <td className="px-4 py-3 text-[var(--text-tertiary)]">{row.asus}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="grid md:grid-cols-3 gap-3 text-xs">
              {[
                { href: "/routers/tp-link", label: "TP-Link Hub" },
                { href: "/routers/asus", label: "ASUS Hub" },
                { href: "/routers/huawei", label: "Huawei Hub" },
              ].map((link) => (
                <Link key={link.href} href={link.href} className="glass-card p-3 rounded-xl border border-white/5 hover:border-orange-900/30 transition-all text-center space-y-1">
                  <div className="text-[var(--text-primary)] font-semibold">{link.label}</div>
                  <div className="text-[var(--text-tertiary)]">Full guide →</div>
                </Link>
              ))}
            </div>
          </section>

          {/* =============================================================
              19. TROUBLESHOOTING CENTER
              ============================================================= */}
          <section className="space-y-4" id="troubleshooting" aria-label="Xiaomi Troubleshooting Center">
            <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
              <HelpCircle size={18} className="text-orange-400" />
              19. Xiaomi Router Troubleshooting Center
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                {
                  title: "192.168.31.1 or miwifi.com not loading",
                  steps: [
                    "Open browser in Incognito/Private mode",
                    "Disable VPN clients and browser Secure DNS (DoH)",
                    "Run ipconfig to verify gateway is 192.168.31.1",
                    "Try http://192.168.1.1 if subnet has shifted",
                    "Power-cycle the Mi Router and retry after 90 seconds",
                  ],
                },
                {
                  title: "Wrong admin password / locked out",
                  steps: [
                    "Check bottom label for device-unique password",
                    "Check MiWiFi app — may have cached session",
                    "Check browser saved passwords for 192.168.31.1",
                    "If older model, password was set during initial wizard",
                    "Factory reset via RESET pinhole (hold 5–10 seconds)",
                  ],
                },
                {
                  title: "Internet keeps disconnecting",
                  steps: [
                    "Update firmware to latest version",
                    "Switch to manual DNS: 8.8.8.8 and 1.1.1.1",
                    "Check PPPoE session settings — disable idle disconnect",
                    "Change Wi-Fi channel from Auto to manual (1, 6, or 11)",
                    "Disable Smart Connect and use separate 2.4GHz/5GHz SSIDs",
                  ],
                },
                {
                  title: "Slow Wi-Fi speeds",
                  steps: [
                    "Enable Gaming Acceleration mode (AX6000/AX3600)",
                    "Switch from 2.4GHz to 5GHz band manually",
                    "Set 5GHz channel width to 80MHz or 160MHz",
                    "Reduce distance from router or add mesh node",
                    "Check for firmware update — speed improvements are common",
                  ],
                },
              ].map((issue, i) => (
                <div key={i} className="glass-card p-5 rounded-xl border border-white/5 space-y-3">
                  <h3 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2">
                    <ChevronRight size={14} className="text-orange-400 shrink-0" />
                    {issue.title}
                  </h3>
                  <ol className="list-decimal pl-5 space-y-1 text-xs text-[var(--text-secondary)]">
                    {issue.steps.map((step, j) => (
                      <li key={j}>{step}</li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
          </section>

          {/* =============================================================
              20. OPENURT / DEVELOPER SECTION
              ============================================================= */}
          <section className="space-y-4" id="openwrt" aria-label="Xiaomi OpenWrt Support">
            <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
              <MonitorPlay size={18} className="text-orange-400" />
              20. Xiaomi Mi Router OpenWrt &amp; Developer Mode
            </h2>
            <div className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed space-y-3">
              <p>
                Xiaomi routers are among the most popular platforms for the OpenWrt open-source firmware community. Models with official or well-tested OpenWrt support include:
              </p>
              <div className="overflow-x-auto rounded-xl border border-white/5">
                <table className="w-full text-xs text-[var(--text-secondary)]">
                  <thead>
                    <tr className="bg-orange-500/10 text-orange-300 text-left">
                      <th className="px-4 py-3 font-semibold">Model</th>
                      <th className="px-4 py-3 font-semibold">OpenWrt Support</th>
                      <th className="px-4 py-3 font-semibold">SSH Access Method</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { model: "Mi Router 4A Gigabit (R4AG)", support: "Official OpenWrt", method: "Exploit via MiWiFi Dev Mode URL" },
                      { model: "Mi Router 3G (R3G)", support: "Official OpenWrt", method: "MiWiFi Dev Mode + flash via SSH" },
                      { model: "Mi Router AX3000 (RA67)", support: "Community / Partial", method: "Telnet exploit during first setup" },
                      { model: "Mi Router AX6000", support: "Work in progress", method: "SSH via MiWiFi Dev Mode (newer firmware blocked)" },
                    ].map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-white/[0.02]" : "bg-white/[0.04]"}>
                        <td className="px-4 py-3 font-mono font-semibold">{row.model}</td>
                        <td className="px-4 py-3 text-orange-300">{row.support}</td>
                        <td className="px-4 py-3 text-[var(--text-tertiary)]">{row.method}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="bg-amber-900/10 border border-amber-900/20 rounded-xl px-4 py-3">
                <p className="text-xs text-amber-300 flex items-start gap-2">
                  <AlertTriangle size={14} className="shrink-0 mt-0.5" />
                  <span><strong>Warning:</strong> Installing OpenWrt or third-party firmware voids your warranty and carries a risk of permanently bricking the device if an incompatible image is flashed. Always verify the OpenWrt Table of Hardware entry for your exact hardware revision before proceeding.</span>
                </p>
              </div>
            </div>
          </section>

          {/* =============================================================
              21. BUYING GUIDE
              ============================================================= */}
          <section className="space-y-4" id="buying-guide" aria-label="Xiaomi Router Buying Guide">
            <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
              <ArrowRight size={18} className="text-orange-400" />
              21. Xiaomi Router Buying Guide
            </h2>
            <div className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed space-y-3">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="glass-card p-5 rounded-xl border border-white/5 space-y-2">
                  <h3 className="text-sm font-semibold text-[var(--text-primary)]">Choose Xiaomi If:</h3>
                  <ul className="list-disc pl-4 space-y-1 text-xs">
                    <li>You want maximum specs-per-dollar performance.</li>
                    <li>You use Xiaomi or Redmi smartphones for deep ecosystem integration.</li>
                    <li>You want a developer-friendly router with SSH/OpenWrt support.</li>
                    <li>You want Wi-Fi 7 without spending on premium Western brand pricing.</li>
                    <li>You need a solid budget mesh system for a medium-sized home.</li>
                  </ul>
                </div>
                <div className="glass-card p-5 rounded-xl border border-white/5 space-y-2">
                  <h3 className="text-sm font-semibold text-[var(--text-primary)]">Consider Alternatives If:</h3>
                  <ul className="list-disc pl-4 space-y-1 text-xs">
                    <li>You need a dedicated gaming router with WTFast or ROG features (consider ASUS).</li>
                    <li>You want a wide global support network and local repair centers (consider TP-Link or ASUS).</li>
                    <li>You need enterprise-grade VLAN/SDN management (consider TP-Link Omada or ASUS ExpertWiFi).</li>
                    <li>You have a fiber subscription requiring complex PPPoE+VLAN that MiWiFi may not support on your ISP.</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* =============================================================
              INTERNAL LINKS CLUSTER
              ============================================================= */}
          <section className="space-y-4" aria-label="Related Networking Guides">
            <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
              <Globe size={18} className="text-orange-400" />
              Related Networking Guides
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { href: "/router-login", label: "Router Login Guide" },
                { href: "/router-password", label: "Router Password Recovery" },
                { href: "/router-reset", label: "Router Reset Guide" },
                { href: "/router-admin", label: "Router Admin Setup" },
                { href: "/ips/192-168-1-1", label: "192.168.1.1 Guide" },
                { href: "/ips/192-168-0-1", label: "192.168.0.1 Guide" },
                { href: "/routers/tp-link", label: "TP-Link Hub" },
                { href: "/routers/netgear", label: "NETGEAR Hub" },
                { href: "/routers/asus", label: "ASUS Hub" },
                { href: "/routers/huawei", label: "Huawei Hub" },
                { href: "/wifi-6-for-gaming", label: "Wi-Fi 6 for Gaming" },
                { href: "/best-router-for-gaming", label: "Best Gaming Routers" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="glass-card px-3 py-2.5 rounded-xl border border-white/5 hover:border-orange-900/30 transition-all text-xs text-[var(--text-secondary)] hover:text-orange-400 flex items-center gap-1.5"
                >
                  <ChevronRight size={12} className="text-orange-400 shrink-0" />
                  {link.label}
                </Link>
              ))}
            </div>
          </section>

        </div>
      </TroubleshootingArticleShell>
    </>
  );
}
