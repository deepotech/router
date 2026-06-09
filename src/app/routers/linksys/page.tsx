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
  title: "Linksys Router Login, Password, Reset & Setup Guide (2026)",
  description:
    "Learn how to log in to Linksys routers and Velop mesh systems at 192.168.1.1 or linksyssmartwifi.com, find default passwords, update firmware, and troubleshoot Linksys issues.",
  canonical: "/routers/linksys",
  keywords: [
    "linksys router login",
    "192.168.1.1",
    "linksyssmartwifi.com",
    "myrouter.local",
    "linksys default password",
    "linksys router reset",
    "linksys router setup",
    "linksys velop setup",
    "linksys admin login",
    "linksys firmware update",
    "linksys mesh router",
    "linksys router troubleshooting",
    "linksys velop red light",
    "linksys smart wifi login",
    "linksys wrt3200acm",
  ],
});

// =============================================================
// Breadcrumbs
// =============================================================

const breadcrumbs = [
  { name: "Routers", url: "/routers" },
  { name: "Linksys", url: "/routers/linksys" },
];

// =============================================================
// Root Causes for Linksys Issues
// =============================================================

const commonCauses = [
  {
    title: "linksyssmartwifi.com Loopback Failures",
    desc: "Linksys Smart Wi-Fi routers route request packets meant for 'linksyssmartwifi.com' internally via the router's DNS server to 192.168.1.1. If you use custom DNS (like Google 8.8.8.8) on your PC, have secure DNS (DoH) active in your web browser, or are connected to a corporate VPN, loopback fails, and the browser displays a standard internet site rather than the local router admin login portal.",
  },
  {
    title: "Upstream Gateway IP Subnet Collisions",
    desc: "Most Linksys routers use 192.168.1.1 as their default LAN IP address. If the modem provided by your ISP also uses the 192.168.1.X subnet on its LAN port, a routing conflict occurs. Modern Linksys firmware automatically shifts the router's LAN IP to 192.168.15.1 or 10.0.0.1 to avoid a crash, catching users off-guard when the default 192.168.1.1 IP stops loading.",
  },
  {
    title: "Velop Node Placement and Backhaul Disconnects",
    desc: "Velop mesh satellite nodes communicate with the primary parent node over a dedicated 5GHz wireless backhaul band. If a satellite node is placed too far from the parent node or behind dense plaster/concrete walls, the backhaul link drops, causing the satellite node's LED to illuminate solid red and disconnect all connected wireless clients.",
  },
  {
    title: "Linksys Cloud Account Session Synchronization Error",
    desc: "Modern Linksys smart Wi-Fi systems authenticate administrative credentials via Linksys Cloud servers. If the router loses internet connectivity or Linksys' central authorization servers experience downtime, attempts to log in via the Linksys app or linksyssmartwifi.com fail with credentials mismatches, forcing users to use the local admin bypass password.",
  },
];

// =============================================================
// Quick Fix Checklist
// =============================================================

const quickFixChecklist = [
  "Confirm your device is connected to the Linksys router's network. Run 'ipconfig' (Windows) or 'ifconfig' (macOS) to verify your Default Gateway is 192.168.1.1 or 192.168.15.1.",
  "Type http://192.168.1.1 or http://myrouter.local directly into your browser's address bar. Do not enter it in search engines (Google, Bing).",
  "Temporarily disable active VPN clients, proxy services, and browser Secure DNS (DNS-over-HTTPS) settings to allow local DNS resolving.",
  "Look for the default password on the sticker on the bottom of the router. If you see a field named 'Admin Password', use that. Otherwise, try leaving it blank or entering 'admin'.",
  "Power-cycle the Linksys router by unplugging its power adapter for 30 seconds, then plugging it back in. Wait 2 minutes for the system boot to finish.",
  "If locked out, press and hold the physical reset button for 10–15 seconds. Release when the LED blinks red or changes colors to trigger a factory restoration.",
];

// =============================================================
// Diagnostic Steps
// =============================================================

const troubleshootingSteps = [
  {
    title: "Verify Network Connection and Retrieve Default Gateway",
    description:
      "Confirm that your device (PC, tablet, or phone) is physically connected to the Linksys router via an Ethernet cable connected to a LAN port, or wirelessly connected to the Linksys SSID. Open a Command Prompt (Windows) and run the command 'ipconfig'. Locate your active network adapter and note the 'Default Gateway' IP address. If the gateway address is 192.168.1.1, proceed with local configuration. If it shows 192.168.15.1 or 10.0.0.1, the router shifted subnets due to an upstream ISP modem conflict. If your IP address shows 169.254.X.X, the router failed to issue a DHCP lease — disconnect and reconnect the cable, power-cycle the router, and try again.",
    tip: "If you are using a Linksys Velop mesh network, plug your PC directly into the secondary Ethernet port on the main parent node (connected to your modem) to run diagnostics on the master node.",
  },
  {
    title: "Access the Web Portal and Bypass Smart Wi-Fi Redirects",
    description:
      "Open a web browser (Chrome, Edge, Safari, or Firefox) in Private or Incognito mode to prevent browser cache redirect loops. In the address bar, type 'http://192.168.1.1' or 'http://myrouter.local' and press Enter. If the Linksys Smart Wi-Fi login page loads, it prompts for a Linksys Cloud account email and password. If you want to bypass this and log in locally (e.g., if the internet is down), look at the bottom right of the page and click the link that says 'For local access, click here'. This opens the local administration interface.",
    tip: "If you get a warning saying 'Your connection is not private' or 'HTTPS Warning', click 'Advanced' and choose 'Proceed' — the router uses a local self-signed certificate, which is completely safe for local network operations.",
  },
  {
    title: "Authenticate with Local Admin Credentials",
    description:
      "In the local login prompt, enter your administrative credentials. By default, legacy Linksys routers (like the WRT54G series) use 'admin' as the username and 'admin' as the password (or leave the username blank and type 'admin' as the password). Smart Wi-Fi and newer Velop routers print a unique default access password on the bottom sticker under 'Admin Password' or 'Recovery Key'. Enter this password and click 'Sign In'. If you get an 'Invalid Password' error and cannot remember a custom password you configured, you will need to perform a factory reset.",
    tip: "On modern Linksys Smart Wi-Fi portals, leaving the password field blank and clicking 'Sign In' may trigger a helper script that prompts you for the unique recovery key printed on the router label.",
  },
  {
    title: "Verify ISP WAN and Interface Setup",
    description:
      "Once logged into the Linksys dashboard, navigate to Router Settings > Connectivity > Internet Settings. The Connection Type should match your ISP configuration: 'Automatic Configuration - DHCP' for cable or fiber connections, or 'PPPoE' for DSL lines. If PPPoE is selected, ensure your ISP-provided username and password are correct. If your fiber provider requires VLAN tagging, enable 'VLAN' under the internet settings tab and enter the required VLAN ID (e.g., 201 for CenturyLink). Click 'Apply' to save settings, then verify your WAN status shows 'Connected' with a valid public IP address.",
    tip: "Use the built-in diagnostic tools under Connectivity > Troubleshooting > Diagnostics. Click the 'Ping' test button and ping '8.8.8.8' to determine if physical internet access is functional even if DNS resolution is temporarily failing.",
  },
];

// =============================================================
// FAQ Q&A Data (10 Detailed Questions)
// =============================================================

const faqs = [
  {
    question: "What is the default IP address for a Linksys router?",
    answer:
      "The standard default IP address for almost all Linksys routers and Velop mesh nodes is 192.168.1.1. Linksys also supports the local hostname redirect 'http://myrouter.local' for browser-based access. However, if the router detects a subnet conflict with your upstream ISP modem (e.g., the modem is also using 192.168.1.1), it will automatically shift its LAN IP to 192.168.15.1 or a similar range to prevent routing loops. If 192.168.1.1 does not work, run 'ipconfig' in Windows Command Prompt and check the Default Gateway IP.",
  },
  {
    question: "What is the default admin password for Linksys routers?",
    answer:
      "Legacy Linksys routers use 'admin' as the default password (and either 'admin' or blank as the username). Modern Linksys routers (including Velop mesh systems, MR-series, and Hydra-series) do not have a universal default password. Instead, they print a unique default admin password on a white specifications sticker located on the bottom of the device. Look for the label 'Admin Password' or 'Security Key'. If you changed this password and forgot it, you must perform a factory reset to restore the original label value.",
  },
  {
    question: "How do I factory reset my Linksys router or Velop node?",
    answer:
      "To factory reset a Linksys router: (1) Ensure the router is powered on and the status LED shows steady red, blue, or purple. (2) Locate the physical RESET button — on WRT and MR models, it is a red button on the back panel; on Velop nodes, it is a recessed button on the bottom. (3) Press and hold the button for 10 to 15 seconds. (4) Watch the LED: on Velop nodes, the light will turn red, fade, and then flash in red cycles. (5) Release the button. (6) Wait 2 to 3 minutes for the router to fully reboot. All configurations will be wiped, and the credentials will reset to default.",
  },
  {
    question: "Why does linksyssmartwifi.com fail to load?",
    answer:
      "The domain 'linksyssmartwifi.com' is a local DNS alias designed to redirect your browser to 192.168.1.1 when you are connected to your home network. Common reasons it fails: (1) Active VPN connection: VPN tunnels bypass the router's DNS server, resolving the address externally, which fails. Disable your VPN. (2) Secure DNS (DoH) enabled in your browser: Disable Secure DNS in Chrome/Firefox settings. (3) Custom external DNS settings on your computer. Disconnect and reconnect to the network, or access the router using its raw IP address http://192.168.1.1 instead.",
  },
  {
    question: "How do I update the firmware on a Linksys router?",
    answer:
      "You can update Linksys firmware automatically or manually. Automatic: Log in to the Linksys Smart Wi-Fi portal (or Linksys app), go to Router Settings > Connectivity, and under the Basic tab, check 'Automatic' next to Firmware Update. Click 'Check for Updates' and follow the prompts. Manual: Go to linksys.com/support, search your exact router model and hardware version, and download the latest '.img' or '.bin' firmware file. Log in to the web interface, go to Connectivity > Choose File, select the downloaded image, and click 'Start'. Do not power off the router during this process.",
  },
  {
    question: "What is Linksys Velop and how do I add a node?",
    answer:
      "Linksys Velop is a modular mesh Wi-Fi system designed to eliminate wireless dead zones. To add a node to an existing setup: (1) Place the new satellite node within 10–15 feet of the primary parent node and plug it into power. (2) Wait for the node's top LED to turn solid purple, indicating it is ready for setup. (3) Open the Linksys app on your mobile device and log in. (4) Tap the menu icon in the upper-left corner and select 'Set Up a New Product'. (5) Tap 'Add Another Node' and follow the on-screen Bluetooth pairing prompts. Once completed, move the node to its final location.",
  },
  {
    question: "Does Linksys support Wi-Fi 6, Wi-Fi 6E, and Wi-Fi 7?",
    answer:
      "Yes. Linksys offers a robust portfolio across modern wireless standards. Wi-Fi 6 models include the Hydra 6, MR9600, and Velop MX4200. Wi-Fi 6E models include the Hydra Pro 6E and Velop Atlas Max 6E, which unlock the clean 6GHz spectrum for ultra-low latency. Wi-Fi 7 models include the flagship Linksys Velop Pro 7, featuring Cognitive Mesh, 320MHz channel width, and Multi-Link Operation (MLO) to deliver wireless speeds exceeding 10 Gbps and reduced interference in congested areas.",
  },
  {
    question: "Are Linksys routers compatible with OpenWrt?",
    answer:
      "Several Linksys router series are highly compatible with OpenWrt and custom firmware, particularly the WRT series (WRT1200AC, WRT1900ACS, WRT3200ACM, and WRT32X). These routers were designed with open-source developers in mind, featuring powerful dual-core Marvell processors and ample flash memory. Installing OpenWrt unlocks advanced features like SQM bufferbloat control, WireGuard VPN servers, and custom routing tables. Note that flashing third-party firmware requires downloading the specific image from openwrt.org and flashing it via the manual update screen, which will void the manufacturer warranty.",
  },
  {
    question: "How do I configure port forwarding on a Linksys router?",
    answer:
      "To configure port forwarding: (1) Log in to the web interface at 192.168.1.1. (2) Under Smart Wi-Fi Tools, click 'Apps and Gaming'. (3) Select the 'Single Port Forwarding' or 'Port Range Forwarding' tab. (4) Click 'Add a new Single Port Forwarding'. (5) Enter an application name (e.g., Minecraft), the external and internal ports (e.g., 25565), and select the protocol (TCP/UDP). (6) Enter the static LAN IP of your gaming PC or console. (7) Check the 'Enabled' box and click 'Save'. Make sure your device has a DHCP reservation under Connectivity > DHCP Reservation.",
  },
  {
    question: "What does a solid red light on my Linksys Velop node mean?",
    answer:
      "A solid red LED on a Linksys Velop node indicates a total loss of internet connectivity. If it is the primary parent node connected to your modem, check that the Ethernet cable is securely connected to the WAN port and power-cycle your modem. If it is a secondary satellite node, a solid red light means it has lost connection to the parent node. Move the node closer to the parent node, remove metal obstructions, or connect the nodes via a wired Ethernet backhaul cable to restore the link.",
  },
];

// =============================================================
// JSON-LD Custom Schema (CollectionPage & ItemList)
// =============================================================

const collectionPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": "https://routervia.com/routers/linksys#collection",
  url: "https://routervia.com/routers/linksys",
  name: "Linksys Router Hub: Login, Password, Setup & Troubleshooting Guide",
  description:
    "Complete technical reference guide to log in to Linksys routers and Velop mesh systems at 192.168.1.1 or linksyssmartwifi.com, find admin passwords, update firmware, and resolve issues.",
  mainEntity: {
    "@type": "ItemList",
    name: "Linksys Router Families",
    numberOfItems: 5,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Linksys Velop Mesh Series",
        description:
          "Modular whole-home mesh Wi-Fi nodes designed for seamless roaming and large coverage areas using Intelligent and Cognitive Mesh technologies.",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Linksys Hydra / MR Series (Wi-Fi 6/6E)",
        description:
          "High-performance standalone dual-band and tri-band routers optimized for high-bandwidth streaming, smart homes, and gaming.",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Linksys WRT Open Source Series",
        description:
          "Legacy and modern hardware designed for open-source customization, supporting OpenWrt and DD-WRT firmware for advanced configurations.",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Linksys Max-Stream Series",
        description:
          "Traditional household Wi-Fi 5 and Wi-Fi 6 routers offering MU-MIMO speeds and reliable concurrent connections for media streams.",
      },
      {
        "@type": "ListItem",
        position: 5,
        name: "Linksys EA Series (Smart Wi-Fi)",
        description:
          "Standard dual-band routers utilizing the cloud-integrated Linksys Smart Wi-Fi portal for straightforward home management.",
      },
    ],
  },
};

// =============================================================
// Linksys Login Addresses Lookup
// =============================================================

const loginAddresses = [
  {
    address: "192.168.1.1",
    usage: "Default gateway IP for almost all Linksys routers and Velop nodes",
    notes: "Primary access method. Enter in browser URL bar to load admin page.",
  },
  {
    address: "linksyssmartwifi.com",
    usage: "Local DNS hostname redirect for Smart Wi-Fi admin interface",
    notes: "Redirect will fail if VPN, proxy, or browser secure DNS (DoH) is active.",
  },
  {
    address: "myrouter.local",
    usage: "Alternative local DNS hostname for web browser login",
    notes: "Useful fallback if the router's exact numerical IP address is unknown.",
  },
  {
    address: "192.168.15.1",
    usage: "Subnet shifted IP fallback address",
    notes: "Automatically assigned if the upstream modem also uses 192.168.1.1 subnet.",
  },
];

// =============================================================
// Linksys LED Status Guide
// =============================================================

const ledStatuses = [
  {
    color: "Solid Blue",
    meaning: "Internet Connected — Normal Operation",
    fix: "The router has a valid WAN IP and internet connectivity. No action required.",
  },
  {
    color: "Blinking Blue",
    meaning: "Starting up, negotiating WAN link, or pairing",
    fix: "Wait 2 minutes for startup. If pairing, follow the mobile app bluetooth prompts.",
  },
  {
    color: "Solid Purple",
    meaning: "Ready for Setup (Velop nodes)",
    fix: "Open the Linksys mobile app on your smartphone to initiate the setup wizard.",
  },
  {
    color: "Blinking Purple",
    meaning: "Setup in progress / pairing search active",
    fix: "Ensure your phone's Bluetooth is enabled and stay within 5 feet of the node.",
  },
  {
    color: "Solid Red",
    meaning: "No Internet Connection detected on WAN port",
    fix: "Check Ethernet cable from modem. Power-cycle the modem and check ISP status.",
  },
  {
    color: "Blinking Red",
    meaning: "Primary node disconnected / hardware error",
    fix: "Verify node connection to modem. Perform a physical reboot or factory reset.",
  },
  {
    color: "Solid Yellow / Amber",
    meaning: "Weak wireless backhaul link (Satellite nodes)",
    fix: "Move the satellite node closer to the parent node to restore throughput.",
  },
];

// =============================================================
// Best Linksys Routers by Use Case
// =============================================================

const bestRouters = [
  {
    useCase: "Best Wi-Fi 7 Mesh System",
    model: "Linksys Velop Pro 7",
    standard: "Wi-Fi 7 (802.11be)",
    speed: "BE11000",
    highlight: "Cognitive Mesh, 320MHz 6GHz band, Multi-Link Operation (MLO)",
  },
  {
    useCase: "Best Performance Standalone",
    model: "Linksys Hydra Pro 6E",
    standard: "Wi-Fi 6E (802.11ax)",
    speed: "AXE6600",
    highlight: "Unlocks clean 6GHz spectrum, 5 Gbps WAN port, dual-core CPU",
  },
  {
    useCase: "Best Open Source / Techs",
    model: "Linksys WRT3200ACM",
    standard: "Wi-Fi 5 (802.11ac)",
    speed: "AC3200",
    highlight: "Fully compatible with OpenWrt, dual-core CPU, external antennas",
  },
  {
    useCase: "Best Mid-Range Value",
    model: "Linksys Hydra 6",
    standard: "Wi-Fi 6 (802.11ax)",
    speed: "AX3000",
    highlight: "Covers up to 2000 sq ft, manages 25+ devices, budget-friendly",
  },
];

// =============================================================
// Linksys Router Model Lookup Matrix
// =============================================================

const linksysModels = [
  {
    model: "Velop Pro 7 (MX6200)",
    standard: "Wi-Fi 7 Tri-Band",
    speed: "BE11000",
    highlight: "320MHz channel width, Cognitive Mesh, 2.5G WAN/LAN ports",
  },
  {
    model: "Atlas Pro 6 (MX5500)",
    standard: "Wi-Fi 6 Dual-Band",
    speed: "AX5400",
    highlight: "Intelligent Mesh, covers 2700 sq ft per node, 160MHz support",
  },
  {
    model: "Hydra Pro 6E (MR7500)",
    standard: "Wi-Fi 6E Tri-Band",
    speed: "AXE6600",
    highlight: "6GHz band support, 5G WAN port, low wireless latency",
  },
  {
    model: "Max-Stream MR9600",
    standard: "Wi-Fi 6 Dual-Band",
    speed: "AX6000",
    highlight: "8-stream Wi-Fi, 1.8GHz quad-core CPU, handles high-load smart homes",
  },
  {
    model: "WRT3200ACM",
    standard: "Wi-Fi 5 Dual-Band",
    speed: "AC3200",
    highlight: "Tri-Stream 160 technology, open-source firmware ready, eSATA port",
  },
  {
    model: "EA8300 Max-Stream",
    standard: "Wi-Fi 5 Tri-Band",
    speed: "AC2200",
    highlight: "Quad-core co-processors, smart connect band steering, MU-MIMO",
  },
];

// =============================================================
// Linksys Error Codes Resolution Matrix
// =============================================================

const errorCodes = [
  {
    error: "Solid Red LED on Node",
    meaning: "The node has lost connection to the internet or upstream router.",
    fix: "Verify Ethernet cable connection. Reboot modem. Check ISP service status.",
  },
  {
    error: "Solid Yellow LED on Satellite",
    meaning: "The satellite node is placed too far from the parent node.",
    fix: "Relocate the satellite closer. Reduce intervening walls or thick barriers.",
  },
  {
    error: "Smart Wi-Fi Error 502 / 503",
    meaning: "Linksys Cloud authentication servers are down or unreachable.",
    fix: "Log in locally using http://192.168.1.1 and the 'Local Access' button.",
  },
  {
    error: "Failed to Fetch WAN IP",
    meaning: "Upstream DHCP lease failed or PPPoE credentials authentication rejected.",
    fix: "Re-enter PPPoE details. Power-cycle the ISP modem. Clone MAC if required.",
  },
  {
    error: "Double NAT Detected",
    meaning: "Both Linksys router and ISP gateway are running network address translation.",
    fix: "Configure the Linksys router to 'Bridge Mode' or set ISP gateway to IP Passthrough.",
  },
  {
    error: "Velop Node Setup Timeout",
    meaning: "The Linksys app lost Bluetooth or local Wi-Fi connection during node pairing.",
    fix: "Ensure phone Bluetooth is on. Keep phone within 3 feet of the node. Restart app.",
  },
];

// =============================================================
// Linksys vs TP-Link vs ASUS Comparison
// =============================================================

const comparisonRows = [
  {
    feature: "Default Login IP",
    linksys: "192.168.1.1",
    tplink: "192.168.0.1 / 192.168.1.1",
    asus: "192.168.1.1",
  },
  {
    feature: "Local Hostname",
    linksys: "myrouter.local / linksyssmartwifi.com",
    tplink: "tplinkwifi.net",
    asus: "router.asus.com",
  },
  {
    feature: "Default Admin Password",
    linksys: "Unique on label (or blank / admin)",
    tplink: "admin / admin (or custom on first boot)",
    asus: "admin / admin",
  },
  {
    feature: "Mesh System Type",
    linksys: "Intelligent / Cognitive Mesh (Velop)",
    tplink: "Deco Mesh / EasyMesh",
    asus: "AiMesh (works across standalone models)",
  },
  {
    feature: "Gaming Optimization",
    linksys: "Killer Prioritization Engine / QoS",
    tplink: "HomeShield QoS / Game Accelerator",
    asus: "ROG Game Boost, WTFast, Adaptive QoS",
  },
  {
    feature: "Open-Source Support",
    linksys: "High on WRT series (WRT3200ACM)",
    tplink: "Limited on select Archer models",
    asus: "ASUSwrt-Merlin third-party fork",
  },
  {
    feature: "Management Portal",
    linksys: "Linksys Smart Wi-Fi Cloud / App",
    tplink: "Tether App / Web UI",
    asus: "ASUSwrt Web Portal / Router App",
  },
];

// =============================================================
// Page Component
// =============================================================

export default function LinksysRouterHubPage() {
  return (
    <>
      {/* Custom JSON-LD schema for CollectionPage and ItemList */}
      <JsonLd data={collectionPageSchema} />

      <TroubleshootingArticleShell
        h1="Linksys Router Login, Password, Reset &amp; Setup Guide"
        intro="Linksys stands as a cornerstone brand in home networking history, renowned for its legendary WRT54G series and modern pioneers like the Velop mesh Wi-Fi systems. Today, under its Intelligent and Cognitive Mesh technologies, Linksys manufactures standalone routers, mesh systems, and high-performance gaming gear designed to optimize speed, security, and coverage. Whether you are logging in at 192.168.1.1 or linksyssmartwifi.com, setting up a new Velop node, flashing OpenWrt on a WRT series router, configuring port forwarding for gaming, or troubleshooting a blinking red light, this complete authority guide provides detailed technical instructions and diagnostic steps."
        category="wifi"
        breadcrumbs={breadcrumbs}
        faqs={faqs}
        troubleshootingSteps={troubleshootingSteps}
        warningBanner={{
          title: "Critical Security Notice: Update Default Credentials Immediately",
          text: "While legacy Linksys models defaulted to 'admin' (or left it blank), newer Linksys Smart Wi-Fi and Velop routers ship with a unique device-specific admin password printed on the bottom sticker. This password should be changed immediately during initial setup to prevent unauthorized local administrative access. Navigate to Router Settings > Connectivity > CA Web Access and configure a strong, unique administrative password.",
        }}
        quickFixChecklist={quickFixChecklist}
        commonCauses={commonCauses}
        whenToContactISP="If you have verified that your Linksys router's WAN port is physically connected to your modem, rebooted both devices, checked that your internet connection protocol (DHCP/PPPoE) matches your ISP requirements, and verified your WAN interface status shows 'Disconnected' with no public IP assigned, the issue is on your ISP's side. Contact your service provider to check for localized network outages, verify that the MAC address registration of your new router is accepted, or verify that your fiber ONT/DSL line is active."
        severityLevel="medium"
      >
        <div className="space-y-12">

          {/* =============================================================
              FEATURED SNIPPET: HOW TO LOGIN TO A LINKSYS ROUTER
              ============================================================= */}
          <section
            className="glass-card p-6 border border-orange-950/20 bg-orange-950/5 rounded-2xl relative overflow-hidden space-y-4"
            aria-label="How to Login to a Linksys Router"
          >
            <div className="absolute top-0 right-0 bg-orange-500/10 text-orange-400 text-[10px] font-mono uppercase tracking-wider px-3 py-1 rounded-bl-lg font-bold">
              Featured Snippet
            </div>
            <h2 className="text-sm font-bold text-orange-400 uppercase tracking-wide flex items-center gap-1.5">
              <Zap size={16} /> How to Login to a Linksys Router
            </h2>
            <div className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
              <p className="mb-3">
                Follow these exact steps to access your Linksys router administrative settings dashboard:
              </p>
              <ol className="list-decimal pl-5 space-y-2 text-xs text-[var(--text-secondary)] font-medium">
                <li>
                  <strong>Connect to the Router:</strong> Plug your computer into any LAN port on the router using an Ethernet cable, or connect to the default Wi-Fi SSID printed on the label.
                </li>
                <li>
                  <strong>Launch your Web Browser:</strong> Open Chrome, Edge, Firefox, or Safari in Private/Incognito mode to bypass local cache redirection.
                </li>
                <li>
                  <strong>Enter the Gateway IP:</strong> Type{" "}
                  <Link href="/ips/192-168-1-1" className="text-orange-400 hover:underline font-mono">
                    192.168.1.1
                  </Link>{" "}
                  directly into the address bar and press Enter. You can also try <strong>http://myrouter.local</strong>.
                </li>
                <li>
                  <strong>Bypass Cloud Login (Optional):</strong> If prompted with a Linksys Smart Wi-Fi screen, click the <strong>'For local access, click here'</strong> link to load local administration.
                </li>
                <li>
                  <strong>Authenticate:</strong> Look at the sticker on the bottom of your Linksys router for the default Admin Password. Enter it and click <strong>Sign In</strong>.
                </li>
              </ol>
            </div>
          </section>

          {/* =============================================================
              1. LINKSYS LOGIN ADDRESSES LOOKUP
              ============================================================= */}
          <section className="space-y-4" id="login-addresses" aria-label="Linksys Login Addresses Lookup">
            <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
              <Globe size={18} className="text-orange-400" />
              1. Linksys Router Login Addresses Lookup
            </h2>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Linksys routers utilize several DNS hostnames and IP addresses for management depending on your hardware model and network configuration. The matrix below lists each access option.
            </p>
            <div className="overflow-x-auto rounded-xl border border-white/5">
              <table className="w-full text-xs text-[var(--text-secondary)]">
                <thead>
                  <tr className="bg-orange-500/10 text-orange-300 text-left">
                    <th className="px-4 py-3 font-semibold">Address / IP</th>
                    <th className="px-4 py-3 font-semibold">Purpose</th>
                    <th className="px-4 py-3 font-semibold">Important Configuration Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {loginAddresses.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white/[0.02]" : "bg-white/[0.04]"}>
                      <td className="px-4 py-3 font-mono text-orange-300 font-semibold">
                        {row.address === "192.168.1.1" ? (
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
              To learn more about how local subnets operate and see other common login IPs, explore our{" "}
              <Link href="/ips" className="text-orange-400 hover:underline">
                router gateway directory
              </Link>.
            </p>
          </section>

          {/* =============================================================
              2. ABOUT LINKSYS ROUTERS
              ============================================================= */}
          <section className="space-y-4" id="about-linksys" aria-label="About Linksys Routers">
            <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
              <Cpu size={18} className="text-orange-400" />
              2. About Linksys Routers: Brand History &amp; Legacy
            </h2>
            <div className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed space-y-3">
              <p>
                Founded in 1988 by Victor and Janie Tsao in Irvine, California, Linksys was acquired by Cisco Systems in 2003, subsequently sold to Belkin in 2013, and is now owned by Foxconn Interconnect Technology. Throughout these transitions, Linksys has maintained its status as a networking giant. The launch of the WRT54G in 2002 — which utilized an open-source Linux kernel — inadvertently sparked the entire custom router firmware movement, paving the way for DD-WRT, Tomato, and OpenWrt.
              </p>
              <p>
                In recent years, Linksys shifted its focus toward solving whole-home Wi-Fi coverage issues. The introduction of <strong>Linksys Velop</strong> marked a major transition to mesh architecture. Utilizing Intelligent Mesh and Cognitive Mesh software, Velop nodes dynamically self-heal and steer client devices across bands to ensure seamless coverage.
              </p>
              <p>
                Today, Linksys products range from entry-level Hydra routers to enterprise-grade mesh systems. Their software platform is highly integrated with the Linksys Cloud, allowing remote network monitoring and parental control management from smartphones.
              </p>
              <p>
                For a comparison of Linksys with other industry-leading manufacturers, refer to our comprehensive{" "}
                <Link href="/routers" className="text-orange-400 hover:underline">
                  router directory
                </Link>.
              </p>
            </div>
          </section>

          {/* =============================================================
              3. LINKSYS PRODUCT FAMILIES
              ============================================================= */}
          <section className="space-y-4" id="product-families" aria-label="Linksys Product Families">
            <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
              <Layers size={18} className="text-orange-400" />
              3. Linksys Router Product Families
            </h2>
            <div className="overflow-x-auto rounded-xl border border-white/5">
              <table className="w-full text-xs text-[var(--text-secondary)]">
                <thead>
                  <tr className="bg-orange-500/10 text-orange-300 text-left">
                    <th className="px-4 py-3 font-semibold">Series</th>
                    <th className="px-4 py-3 font-semibold">Product Line</th>
                    <th className="px-4 py-3 font-semibold">Primary Focus</th>
                    <th className="px-4 py-3 font-semibold">Core Technological Advantage</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white/[0.02]">
                    <td className="px-4 py-3 font-mono font-semibold text-orange-300">Velop Mesh</td>
                    <td className="px-4 py-3">Whole-Home Mesh System</td>
                    <td className="px-4 py-3">Large homes, multi-story buildings</td>
                    <td className="px-4 py-3">Cognitive & Intelligent Mesh, seamless roaming, app-centric setup</td>
                  </tr>
                  <tr className="bg-white/[0.04]">
                    <td className="px-4 py-3 font-mono font-semibold text-orange-300">Hydra Series</td>
                    <td className="px-4 py-3">Standalone Wi-Fi 6/6E</td>
                    <td className="px-4 py-3">Smart homes, high-bandwidth users</td>
                    <td className="px-4 py-3">Tri-band configuration, 6GHz spectrum, multi-gigabit WAN ports</td>
                  </tr>
                  <tr className="bg-white/[0.02]">
                    <td className="px-4 py-3 font-mono font-semibold text-orange-300">WRT Series</td>
                    <td className="px-4 py-3">Open-Source Developer</td>
                    <td className="px-4 py-3">Network engineers, enthusiasts</td>
                    <td className="px-4 py-3">Official OpenWrt compatibility, dual-core CPUs, heavy heat sinks</td>
                  </tr>
                  <tr className="bg-white/[0.04]">
                    <td className="px-4 py-3 font-mono font-semibold text-orange-300">Max-Stream</td>
                    <td className="px-4 py-3">Value Standalone Routers</td>
                    <td className="px-4 py-3">Mid-sized apartments, budget setups</td>
                    <td className="px-4 py-3">Affordable dual-band Wi-Fi 6, basic parental controls, gigabit ports</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* =============================================================
              4. LINKSYS LED STATUS GUIDE
              ============================================================= */}
          <section className="space-y-4" id="led-guide" aria-label="Linksys LED Status Guide">
            <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
              <Sliders size={18} className="text-orange-400" />
              4. Linksys Router &amp; Velop LED Status Guide
            </h2>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Linksys routers and Velop mesh nodes feature a single multi-color LED indicator at the top of the node or physical lights on the front panel. Understanding these LED states is essential for troubleshooting.
            </p>
            <div className="overflow-x-auto rounded-xl border border-white/5">
              <table className="w-full text-xs text-[var(--text-secondary)]">
                <thead>
                  <tr className="bg-orange-500/10 text-orange-300 text-left">
                    <th className="px-4 py-3 font-semibold">LED Behavior</th>
                    <th className="px-4 py-3 font-semibold">Diagnostic State</th>
                    <th className="px-4 py-3 font-semibold">Recommended Fix / Next Steps</th>
                  </tr>
                </thead>
                <tbody>
                  {ledStatuses.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white/[0.02]" : "bg-white/[0.04]"}>
                      <td className="px-4 py-3 font-mono text-orange-300 font-semibold">{row.color}</td>
                      <td className="px-4 py-3">{row.meaning}</td>
                      <td className="px-4 py-3 text-[var(--text-tertiary)]">{row.fix}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* =============================================================
              5. FIRMWARE RECOVERY MODE (PARTITION FALLBACK)
              ============================================================= */}
          <section className="space-y-4" id="recovery-mode" aria-label="Firmware Recovery Mode">
            <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
              <RefreshCw size={18} className="text-orange-400" />
              5. Firmware Recovery Mode &amp; Partition Fallback
            </h2>
            <div className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed space-y-3">
              <p>
                Linksys WRT and Smart Wi-Fi routers feature a built-in safety mechanism called <strong>Dual-Partition Booting</strong>. This means the router maintains two separate memory partitions containing firmware copies (Partition 1 and Partition 2). If a firmware update fails, gets corrupted, or a third-party firmware flash (like OpenWrt) bricks the active partition, you can force the router to swap boot partitions to recover it.
              </p>
              <p className="font-semibold text-orange-300">
                How to Force Linksys Partition Swapping (3-Cycle Boot Recovery):
              </p>
              <ol className="list-decimal pl-5 space-y-2 text-xs">
                <li>
                  Turn on the router and wait for the power LED or top light to illuminate.
                </li>
                <li>
                  As soon as the power light flashes or turns on, immediately turn off the router using its physical power switch.
                </li>
                <li>
                  Repeat this process two more times: Turn the switch ON, wait for the power light to react, and immediately turn the switch OFF.
                </li>
                <li>
                  On the fourth attempt, leave the router switched ON. The bootloader will detect the three consecutive boot interruptions, assume firmware failure, and swap the active boot partition pointer to the alternate partition.
                </li>
                <li>
                  The router will boot successfully into its backup firmware, restoring access to the administration dashboard.
                </li>
              </ol>
            </div>
          </section>

          {/* =============================================================
              6. GAMING PERFORMANCE & QoS CONFIGURATION
              ============================================================= */}
          <section className="space-y-4" id="gaming-performance" aria-label="Gaming Performance">
            <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
              <Gamepad2 size={18} className="text-orange-400" />
              6. Gaming Performance &amp; Killer Prioritization
            </h2>
            <div className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed space-y-3">
              <p>
                Linksys routers utilize advanced Quality of Service (QoS) engines to optimize competitive gaming traffic. WRT series models (like the WRT32X) and modern Hydra models feature integration with the <strong>Killer Prioritization Engine</strong>. When a PC with Killer networking hardware is detected, the router auto-synchronizes and places gaming packets at the front of the queue, reducing peak ping jitter by up to 77%.
              </p>
              <p>
                To manually configure prioritization for consoles (PS5, Xbox Series X) or PCs:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-xs">
                <li>
                  Log in to the router web interface at 192.168.1.1 and navigate to <strong>Smart Wi-Fi Tools &gt; Media Prioritization</strong>.
                </li>
                <li>
                  Toggle the Prioritization setting to <strong>ON</strong>.
                </li>
                <li>
                  Drag and drop your gaming device from the 'Normal Priority' list to the 'High Priority' list.
                </li>
                <li>
                  Under 'Settings', enter your ISP download/upload speeds. This is crucial for the queue scheduler to prevent bufferbloat.
                </li>
                <li>
                  Save changes. High-priority gaming streams will bypass normal household traffic queues.
                </li>
              </ul>
            </div>
          </section>

          {/* =============================================================
              7. BEST LINKSYS ROUTERS BY USE CASE
              ============================================================= */}
          <section className="space-y-4" id="best-routers" aria-label="Best Linksys Routers">
            <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
              <Star size={18} className="text-orange-400" />
              7. Best Linksys Routers by Use Case
            </h2>
            <div className="overflow-x-auto rounded-xl border border-white/5">
              <table className="w-full text-xs text-[var(--text-secondary)]">
                <thead>
                  <tr className="bg-orange-500/10 text-orange-300 text-left">
                    <th className="px-4 py-3 font-semibold">Use Case</th>
                    <th className="px-4 py-3 font-semibold">Model Recommendation</th>
                    <th className="px-4 py-3 font-semibold">Wireless Standard</th>
                    <th className="px-4 py-3 font-semibold">Max Speed Rating</th>
                    <th className="px-4 py-3 font-semibold">Hardware Highlight</th>
                  </tr>
                </thead>
                <tbody>
                  {bestRouters.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white/[0.02]" : "bg-white/[0.04]"}>
                      <td className="px-4 py-3 font-semibold">{row.useCase}</td>
                      <td className="px-4 py-3 text-orange-300 font-semibold">{row.model}</td>
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
              8. LINKSYS ROUTER MODEL LOOKUP MATRIX
              ============================================================= */}
          <section className="space-y-4" id="model-matrix" aria-label="Linksys Model Matrix">
            <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
              <FileText size={18} className="text-orange-400" />
              8. Linksys Router Model Lookup Matrix
            </h2>
            <div className="overflow-x-auto rounded-xl border border-white/5">
              <table className="w-full text-xs text-[var(--text-secondary)]">
                <thead>
                  <tr className="bg-orange-500/10 text-orange-300 text-left">
                    <th className="px-4 py-3 font-semibold">Model Name</th>
                    <th className="px-4 py-3 font-semibold">Wireless Standard</th>
                    <th className="px-4 py-3 font-semibold">Speed Class</th>
                    <th className="px-4 py-3 font-semibold">Technical Advantage</th>
                  </tr>
                </thead>
                <tbody>
                  {linksysModels.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white/[0.02]" : "bg-white/[0.04]"}>
                      <td className="px-4 py-3 font-mono font-semibold text-orange-300">{row.model}</td>
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
              9. LINKSYS ERROR CODES RESOLUTION MATRIX
              ============================================================= */}
          <section className="space-y-4" id="error-codes" aria-label="Linksys Error Codes">
            <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
              <AlertTriangle size={18} className="text-orange-400" />
              9. Linksys Error Codes &amp; Diagnostics Resolution Matrix
            </h2>
            <div className="overflow-x-auto rounded-xl border border-white/5">
              <table className="w-full text-xs text-[var(--text-secondary)]">
                <thead>
                  <tr className="bg-orange-500/10 text-orange-300 text-left">
                    <th className="px-4 py-3 font-semibold">Error / Indication</th>
                    <th className="px-4 py-3 font-semibold">Root Cause Analysis</th>
                    <th className="px-4 py-3 font-semibold">Resolution Workflow</th>
                  </tr>
                </thead>
                <tbody>
                  {errorCodes.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white/[0.02]" : "bg-white/[0.04]"}>
                      <td className="px-4 py-3 font-mono font-semibold text-orange-300">{row.error}</td>
                      <td className="px-4 py-3">{row.meaning}</td>
                      <td className="px-4 py-3 text-[var(--text-tertiary)]">{row.fix}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* =============================================================
              10. LINKSYS VS TP-LINK VS ASUS
              ============================================================= */}
          <section className="space-y-4" id="brand-comparison" aria-label="Brand Comparison">
            <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
              <Layers size={18} className="text-orange-400" />
              10. Brand Comparison: Linksys vs. TP-Link vs. ASUS
            </h2>
            <div className="overflow-x-auto rounded-xl border border-white/5">
              <table className="w-full text-xs text-[var(--text-secondary)]">
                <thead>
                  <tr className="bg-orange-500/10 text-orange-300 text-left">
                    <th className="px-4 py-3 font-semibold">Feature / Metric</th>
                    <th className="px-4 py-3 font-semibold">Linksys</th>
                    <th className="px-4 py-3 font-semibold">TP-Link</th>
                    <th className="px-4 py-3 font-semibold">ASUS</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white/[0.02]" : "bg-white/[0.04]"}>
                      <td className="px-4 py-3 font-semibold">{row.feature}</td>
                      <td className="px-4 py-3 font-mono text-orange-300">{row.linksys}</td>
                      <td className="px-4 py-3 font-mono">{row.tplink}</td>
                      <td className="px-4 py-3 font-mono">{row.asus}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* =============================================================
              11. SECURITY CHECKLIST FOR LINKSYS ROUTERS
              ============================================================= */}
          <section className="space-y-4" id="security-checklist" aria-label="Security Checklist">
            <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
              <Shield size={18} className="text-orange-400" />
              11. Linksys Router Security Best Practices Checklist
            </h2>
            <div className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed space-y-3">
              <p>
                Secure your Linksys network against potential intrusions by verifying and applying these settings:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="glass-card p-4 rounded-xl border border-white/5 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-orange-300">
                    <CheckCircle2 size={14} /> Change Wi-Fi Security Mode
                  </div>
                  <p className="text-[11px] text-[var(--text-secondary)]">
                    Go to Wi-Fi Settings &gt; Security Mode. Set to <strong>WPA3-Personal</strong> or <strong>WPA2/WPA3 Mixed Personal</strong>. Avoid WEP or WPA-Only modes, which are vulnerable to brute-force exploits.
                  </p>
                </div>
                <div className="glass-card p-4 rounded-xl border border-white/5 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-orange-300">
                    <CheckCircle2 size={14} /> Disable Wi-Fi Protected Setup (WPS)
                  </div>
                  <p className="text-[11px] text-[var(--text-secondary)]">
                    WPS pinholes permit devices to pair without typing the primary password, but WPS PIN brute-forcing is a well-known vulnerability. Navigate to Wi-Fi &gt; WPS and toggle WPS to <strong>OFF</strong>.
                  </p>
                </div>
                <div className="glass-card p-4 rounded-xl border border-white/5 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-orange-300">
                    <CheckCircle2 size={14} /> Disable UPnP (Universal Plug and Play)
                  </div>
                  <p className="text-[11px] text-[var(--text-secondary)]">
                    While convenient for gaming, UPnP allows software inside your network to open ports automatically without admin authorization. Disable UPnP under Connectivity &gt; UPnP to prevent malware port forward creation.
                  </p>
                </div>
                <div className="glass-card p-4 rounded-xl border border-white/5 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-orange-300">
                    <CheckCircle2 size={14} /> Disable Remote Administration
                  </div>
                  <p className="text-[11px] text-[var(--text-secondary)]">
                    Prevent accessing the router's settings interface via the public WAN port. Go to Connectivity &gt; CA Web Access and ensure 'Remote Management' is toggled to <strong>OFF</strong>.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* =============================================================
              12. ISP COMPATIBILITY GUIDE
              ============================================================= */}
          <section className="space-y-4" id="isp-compatibility" aria-label="ISP Compatibility Guide">
            <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
              <Network size={18} className="text-orange-400" />
              12. Linksys ISP Compatibility Guide
            </h2>
            <div className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed space-y-3">
              <p>
                Linksys routers work with almost all major Internet Service Providers (ISPs), including cable, DSL, and fiber networks. Match the WAN configuration on your Linksys router to your ISP's connection protocol:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-xs">
                <li>
                  <strong>Cable ISPs (Comcast Xfinity, Spectrum, Cox):</strong> Connect your modem's Ethernet port to the Linksys WAN/Internet port. Select 'Automatic Configuration - DHCP' in the setup menu. Power-cycle the cable modem to reset MAC address bindings before turning on the Linksys router.
                </li>
                <li>
                  <strong>Fiber ISPs (Google Fiber, CenturyLink, MetroNet):</strong> Fiber ONT devices terminate directly in Ethernet. Connect the ONT to the Linksys router's WAN port. If your fiber provider uses PPPoE (e.g., CenturyLink), enter your login details in the settings. If they require VLAN tagging (e.g., VLAN ID 201), enable VLAN settings on the Linksys Connectivity page.
                </li>
                <li>
                  <strong>DSL ISPs:</strong> DSL lines require a separate modem. Connect the DSL modem LAN port to the Linksys router WAN port. Configure PPPoE in the Linksys dashboard and input your ISP username and password.
                </li>
              </ul>
            </div>
          </section>
        </div>
      </TroubleshootingArticleShell>
    </>
  );
}
