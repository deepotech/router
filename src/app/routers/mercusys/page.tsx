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
  title: "Mercusys Router Login, Password, Reset & Setup Guide (2026)",
  description:
    "Complete guide to log in to Mercusys routers at 192.168.1.1 or mwlogin.net. Find default passwords, LED indicator meanings, model specs, and step-by-step troubleshooting for all Mercusys routers.",
  canonical: "/routers/mercusys",
  keywords: [
    "mercusys router login",
    "mercusys login",
    "mwlogin.net",
    "192.168.1.1 mercusys",
    "mercusys default password",
    "mercusys router setup",
    "mercusys router reset",
    "mercusys admin login",
    "mercusys wifi login",
    "mercusys halo mesh",
    "mercusys led lights",
    "mercusys router password",
  ],
});

// =============================================================
// Breadcrumbs
// =============================================================

const breadcrumbs = [
  { name: "Routers", url: "/routers" },
  { name: "Mercusys", url: "/routers/mercusys" },
];

// =============================================================
// Root Causes for Mercusys Issues
// =============================================================

const commonCauses = [
  {
    title: "Secure DNS (DoH) Blocking mwlogin.net",
    desc: "Browsers with DNS-over-HTTPS enabled (Chrome, Firefox) bypass the router's local DNS. The hostname mwlogin.net won't resolve to the local gateway. Disable DoH in browser settings or use the numeric IP 192.168.1.1 directly.",
  },
  {
    title: "IP Subnet Conflict with Primary Modem",
    desc: "If the upstream modem uses the same 192.168.1.X range, an IP conflict prevents Mercusys from routing correctly. Change the Mercusys LAN IP to 192.168.2.1 under Advanced > Network > LAN Settings.",
  },
  {
    title: "Custom Admin Password Not Remembered",
    desc: "Newer Mercusys firmware requires creating a custom admin password on first login. If forgotten, a factory reset is required — there is no way to recover it without losing settings.",
  },
  {
    title: "Halo Mesh Node Out of Range",
    desc: "Mercusys Halo satellite units that are placed too far from the primary router will fail to establish a stable backhaul link, showing red LED status and causing drops for connected clients.",
  },
];

// =============================================================
// Quick Fix Checklist
// =============================================================

const quickFixChecklist = [
  "Ensure your computer or phone is connected to the Mercusys Wi-Fi network or a LAN port via Ethernet cable.",
  "Type http://192.168.1.1 or http://mwlogin.net directly into your browser's URL bar — not a search engine.",
  "Disable any active VPN software or browser proxy extensions before attempting to reach the admin page.",
  "Check the sticker on the underside of your Mercusys router for the default SSID, Wi-Fi password, and login info.",
  "Power cycle the router: unplug it for 30 seconds, then plug back in and wait 60 seconds for full boot.",
  "If you've forgotten the admin password, press the RESET button on the rear for 8–10 seconds to restore factory defaults.",
];

// =============================================================
// Diagnostic Steps
// =============================================================

const troubleshootingSteps = [
  {
    title: "Verify Gateway IP via Command Prompt",
    description:
      "Connect your computer to the Mercusys router using an Ethernet cable or via Wi-Fi. On Windows, open Command Prompt and run 'ipconfig'. Look for the 'Default Gateway' value under your active adapter — it should read 192.168.1.1. On macOS or Linux, run 'ip route' or 'netstat -nr'. If the gateway shows 169.254.X.X, the router is not assigning IPs — restart it.",
    tip: "Run 'ipconfig /release' then 'ipconfig /renew' in Windows Command Prompt to force a fresh IP assignment from the Mercusys DHCP server.",
  },
  {
    title: "Access the Mercusys Web Admin Panel",
    description:
      "Open your web browser in Private or Incognito mode to avoid stale DNS cache. Enter http://192.168.1.1 or http://mwlogin.net in the address bar and press Enter. If mwlogin.net loads a search engine, it means local DNS is being bypassed — use the numeric IP instead. The Mercusys login page will show a single password field (no username required on most models).",
    tip: "Always use http:// prefix (not https://) when accessing router admin pages to prevent SSL certificate errors that block the page from loading.",
  },
  {
    title: "Enter Admin Password and Configure",
    description:
      "On most Mercusys routers, the login requires only a password (no username field). On first access, you'll be prompted to create a new admin password. If the router was previously configured, enter the custom password. If forgotten, a factory reset is required. After login, the Quick Setup wizard guides you through WAN type selection (Dynamic IP, Static IP, or PPPoE) and Wi-Fi SSID/password configuration.",
    tip: "Mercusys routers do not have a universal default admin password. Each unit requires a password to be set on first boot. If first setup was skipped, hold RESET for 8 seconds.",
  },
  {
    title: "Configure WAN and Verify Internet Connectivity",
    description:
      "Once logged in, navigate to Basic > Internet. Select your connection type: Dynamic IP (most home broadband), Static IP (assigned by ISP), or PPPoE (ISP username/password required). For PPPoE, enter the credentials your ISP provided. Click Save and check the internet status indicator at the top of the page. A green status confirms internet access is established.",
    tip: "If the WAN status shows an IP conflict, change your Mercusys LAN IP to 192.168.2.1 via Advanced > Network > LAN and reboot to resolve the double-NAT issue.",
  },
];

// =============================================================
// FAQ Q&A Data
// =============================================================

const faqs = [
  {
    question: "What is the default IP address for Mercusys routers?",
    answer:
      "The default login IP address for Mercusys routers is 192.168.1.1. Mercusys also provides a local web portal hostname: http://mwlogin.net. This hostname only resolves when you are connected to the Mercusys router's local network and using its DNS server. If mwlogin.net fails, always use the numeric IP 192.168.1.1 directly in the browser address bar.",
  },
  {
    question: "What is the default username and password for Mercusys routers?",
    answer:
      "Mercusys routers do not use a default username. They require a custom admin password that must be created on your first login. There is no factory-set password. If you have never set one, go through the quick setup wizard when you access the admin page. If someone already configured the router and the password is unknown, you must factory reset the device.",
  },
  {
    question: "How do I factory reset a Mercusys router?",
    answer:
      "To factory reset a Mercusys router: (1) Make sure the router is powered on and running. (2) Find the RESET or RST button on the back or bottom of the unit. (3) Use a straightened paperclip to press and hold the button for 8 to 10 seconds until the LED lights blink rapidly or go off. (4) Release the button. The router will reboot automatically, taking 60 to 90 seconds. All custom settings (Wi-Fi name, password, admin password, ISP settings) will be erased.",
  },
  {
    question: "Why is mwlogin.net not working?",
    answer:
      "mwlogin.net is a local DNS hostname that resolves only when you are on the Mercusys router's network and using its DNS server. It fails to load if: (1) You are connected to mobile data or a different Wi-Fi network. (2) A VPN is active on your device and routing all DNS externally. (3) Your browser has Secure DNS (DNS-over-HTTPS / DoH) enabled. To fix: disconnect VPN, disable DoH in browser settings, or simply type 192.168.1.1 directly into the address bar.",
  },
  {
    question: "How do I change the Wi-Fi name and password on Mercusys?",
    answer:
      "To change Wi-Fi SSID and password: (1) Log in to 192.168.1.1 or mwlogin.net. (2) Go to Basic > Wireless. (3) Update the Wi-Fi Name (SSID) field with your desired network name. (4) Set Security to WPA2-PSK or WPA3-SAE. (5) Enter your new Wi-Fi password in the Password field. (6) Click Save. All devices will need to reconnect using the updated credentials.",
  },
  {
    question: "How do I set up Mercusys Halo Mesh Wi-Fi?",
    answer:
      "Mercusys Halo mesh systems are configured via the Mercusys app: (1) Connect the primary Halo unit to your modem via Ethernet. (2) Power on and connect your phone to the Halo's default Wi-Fi SSID. (3) Download the Mercusys app and follow the setup wizard to configure your internet type and create your network name and password. (4) To add satellite Halo units, place them within 2 rooms of the primary, power on, and scan the QR code via the app or press the pair button.",
  },
  {
    question: "Why is the Mercusys router WAN LED red?",
    answer:
      "A red WAN LED means the router has a physical WAN connection but cannot access the internet. Common causes: (1) Incorrect WAN type selected (should be PPPoE, Dynamic IP, or Static IP depending on ISP). (2) Wrong PPPoE username/password entered. (3) Modem not providing a valid DHCP lease — restart the modem first. (4) ISP line outage. Log in to the admin panel and verify the WAN status under Basic > Internet.",
  },
  {
    question: "Does Mercusys support WPA3 security?",
    answer:
      "Yes, newer Mercusys routers including the MR70X and MR80X Wi-Fi 6 models support WPA3-SAE security protocol. WPA3 provides enhanced security over WPA2 by preventing brute-force password guessing attacks and offering forward secrecy for individual sessions. Enable it in Basic > Wireless > Security Mode. Note: devices must also support WPA3 — older devices may need WPA2/WPA3 mixed mode.",
  },
  {
    question: "How do I update Mercusys router firmware?",
    answer:
      "To update Mercusys firmware: (1) Log in to the admin panel at 192.168.1.1. (2) Go to Advanced > System Tools > Firmware Upgrade. (3) Click 'Check for Updates' to look for OTA firmware automatically. (4) If you need to update manually, visit the Mercusys support website, download the firmware file for your exact model, then upload it using the 'Browse' button and click Upgrade. Do not disconnect power during upgrade.",
  },
  {
    question: "What is the difference between Mercusys and TP-Link?",
    answer:
      "Mercusys is a sub-brand of TP-Link, created specifically for the budget-conscious market. Mercusys devices are typically cheaper than equivalent TP-Link models with similar hardware but fewer advanced features (no VPN server, limited QoS, simpler UI). TP-Link Archer/Deco series targets mainstream and power users, while Mercusys targets price-sensitive buyers who need reliable basic home Wi-Fi. Both use similar chipsets and factory infrastructure.",
  },
];

// =============================================================
// JSON-LD Custom Schema
// =============================================================

const collectionPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": "https://routervia.com/routers/mercusys#collection",
  url: "https://routervia.com/routers/mercusys",
  name: "Mercusys Router Hub: Login, Password, Setup & Troubleshooting",
  description:
    "Complete guide to log in to Mercusys routers at 192.168.1.1 or mwlogin.net. Default passwords, LED diagnostics, setup procedures, and Halo mesh configuration.",
  mainEntity: {
    "@type": "ItemList",
    name: "Mercusys Router Families",
    numberOfItems: 3,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Mercusys Halo Mesh Series",
        description: "Whole-home Wi-Fi 6 mesh systems for seamless roaming coverage.",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Mercusys MR Wi-Fi 6 Series",
        description: "Dual-band Wi-Fi 6 routers (AX1500 to AX3000) for home broadband.",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Mercusys AC / N Series",
        description: "Budget-friendly Wi-Fi 5 and Wi-Fi 4 routers for basic home networking.",
      },
    ],
  },
};

// =============================================================
// 1. Mercusys Login Addresses
// =============================================================

const loginAddresses = [
  {
    address: "192.168.1.1",
    usage: "All Mercusys routers",
    notes: "Default gateway IP — works on all models regardless of firmware version.",
  },
  {
    address: "mwlogin.net",
    usage: "Local hostname alias",
    notes: "Auto-resolves when connected to Mercusys network using its DNS. Fails with VPN or DoH enabled.",
  },
];

// =============================================================
// 2. Mercusys Models Table
// =============================================================

const mercusysModels = [
  {
    model: "Mercusys AC10",
    standard: "Wi-Fi 5 (802.11ac)",
    speed: "AC1200",
    highlight: "Dual-band, 4 high-gain antennas, affordable home coverage",
  },
  {
    model: "Mercusys AC12G",
    standard: "Wi-Fi 5 (802.11ac)",
    speed: "AC1200",
    highlight: "Gigabit ports, dual-band, 3x external antennas",
  },
  {
    model: "Mercusys MR30G",
    standard: "Wi-Fi 5 (802.11ac)",
    speed: "AC1200",
    highlight: "Gigabit WAN/LAN ports, budget mesh-ready, easy app setup",
  },
  {
    model: "Mercusys MR70X",
    standard: "Wi-Fi 6 (802.11ax)",
    speed: "AX1800",
    highlight: "Wi-Fi 6, WPA3, OFDMA, MU-MIMO, Gigabit ports",
  },
  {
    model: "Mercusys MR80X",
    standard: "Wi-Fi 6 (802.11ax)",
    speed: "AX3000",
    highlight: "Tri-band Wi-Fi 6, 2.5G WAN port, 160MHz bandwidth",
  },
  {
    model: "Mercusys Halo H50G",
    standard: "Wi-Fi 5 Mesh",
    speed: "AC1900",
    highlight: "Mesh system, 3-pack covers up to 6000 sq ft, Gigabit backhaul",
  },
  {
    model: "Mercusys Halo H70X",
    standard: "Wi-Fi 6 Mesh",
    speed: "AX1800",
    highlight: "Wi-Fi 6 mesh, seamless roaming, app control, covers 5500 sq ft",
  },
];

// =============================================================
// 3. LED Status Meanings
// =============================================================

const ledStatuses = [
  {
    name: "Power LED",
    status: "Solid Green",
    meaning: "Router is powered on and operating normally.",
  },
  {
    name: "WAN LED",
    status: "Solid Green",
    meaning: "WAN port is connected and internet access is confirmed.",
  },
  {
    name: "WAN LED",
    status: "Solid / Blinking Orange",
    meaning: "WAN port is physically connected but no internet access. Check ISP settings or PPPoE credentials.",
  },
  {
    name: "2.4GHz / 5GHz Wi-Fi LED",
    status: "Off",
    meaning: "Wireless radio is disabled. Enable via admin panel under Basic > Wireless or press the Wi-Fi button.",
  },
  {
    name: "Halo Mesh LED",
    status: "Solid Green",
    meaning: "Mesh satellite node has a strong backhaul link to the primary router.",
  },
  {
    name: "Halo Mesh LED",
    status: "Solid Red",
    meaning: "Mesh satellite node cannot reach the primary router. Move it closer to improve signal.",
  },
];

// =============================================================
// 4. Mercusys vs TP-Link vs Tenda Comparison
// =============================================================

const comparisonRows = [
  {
    feature: "Default Login IP",
    mercusys: "192.168.1.1",
    tplink: "192.168.0.1 / 192.168.1.1",
    tenda: "192.168.0.1",
  },
  {
    feature: "Local Hostname",
    mercusys: "mwlogin.net",
    tplink: "tplinkwifi.net",
    tenda: "tendawifi.com",
  },
  {
    feature: "Default Password",
    mercusys: "Custom (set on first boot)",
    tplink: "admin / admin (or custom)",
    tenda: "admin / admin (or custom)",
  },
  {
    feature: "Mesh Technology",
    mercusys: "Halo (app-managed)",
    tplink: "Deco / EasyMesh",
    tenda: "Nova / Wi-Fi+",
  },
  {
    feature: "Price Tier",
    mercusys: "Entry-level budget",
    tplink: "Budget to premium",
    tenda: "Ultra-budget",
  },
  {
    feature: "Parent Company",
    mercusys: "TP-Link sub-brand",
    tplink: "TP-Link Corp",
    tenda: "Tenda Technology",
  },
];

// =============================================================
// Page Component
// =============================================================

export default function MercusysRouterHubPage() {
  return (
    <>
      <JsonLd data={collectionPageSchema} />

      <TroubleshootingArticleShell
        h1="Mercusys Router Login, Password, Setup & Troubleshooting Guide"
        intro="Mercusys is a budget-focused networking brand owned by TP-Link, offering a wide range of dual-band Wi-Fi 5 and Wi-Fi 6 routers as well as the Halo whole-home mesh systems. Mercusys routers are managed through a clean web interface accessible at 192.168.1.1 or the local alias mwlogin.net. Whether you need to access your admin panel for the first time, configure PPPoE for your ISP, understand LED indicators, pair Halo mesh satellites, or perform a factory reset, this comprehensive guide covers every step with detailed technical instructions."
        category="wifi"
        breadcrumbs={breadcrumbs}
        faqs={faqs}
        troubleshootingSteps={troubleshootingSteps}
        warningBanner={{
          title: "Security Notice: Set a Strong Admin Password on First Login",
          text: "Mercusys routers ship with no default admin password — you must create one on first login. Skipping this leaves your router management panel open to anyone on your local network. Set a strong, unique password immediately during the Quick Setup wizard.",
        }}
        quickFixChecklist={quickFixChecklist}
        commonCauses={commonCauses}
        whenToContactISP="If the Mercusys WAN LED shows orange after verifying your PPPoE credentials and connection type, and restarting both the modem and router doesn't resolve it, your ISP's DHCP or authentication server may be rejecting your connection. Contact your ISP to confirm your account is active, get the correct PPPoE username/password, or request a line test."
        severityLevel="low"
      >
        <div className="space-y-12">
          {/* =============================================================
              FEATURED SNIPPET
              ============================================================= */}
          <section
            className="glass-card p-6 border border-blue-950/20 bg-blue-950/5 rounded-2xl relative overflow-hidden space-y-4"
            aria-label="How to Login to a Mercusys Router"
          >
            <div className="absolute top-0 right-0 bg-blue-500/10 text-blue-400 text-[10px] font-mono uppercase tracking-wider px-3 py-1 rounded-bl-lg font-bold">
              Featured Snippet
            </div>
            <h2 className="text-sm font-bold text-blue-400 uppercase tracking-wide flex items-center gap-1.5">
              <Zap size={16} /> How to Login to a Mercusys Router
            </h2>
            <div className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
              <p className="mb-3">
                Follow these exact steps to access your Mercusys router admin panel:
              </p>
              <ol className="list-decimal pl-5 space-y-2 text-xs text-[var(--text-secondary)] font-medium">
                <li>
                  <strong>Connect to Mercusys network:</strong> Join the Mercusys Wi-Fi network (SSID printed on bottom label) or plug an Ethernet cable into a LAN port.
                </li>
                <li>
                  <strong>Open browser in Incognito mode:</strong> Use Chrome, Edge, or Firefox in Private/Incognito mode to avoid cached DNS issues.
                </li>
                <li>
                  <strong>Enter the login address:</strong> Type{" "}
                  <Link href="/ips/192-168-1-1" className="text-blue-400 hover:underline font-mono">
                    192.168.1.1
                  </Link>{" "}
                  or <strong>mwlogin.net</strong> in the URL bar and press Enter.
                </li>
                <li>
                  <strong>Enter admin password:</strong> Type the password you created during first setup. If this is your first time, you will be prompted to create one.
                </li>
                <li>
                  <strong>Configure your router:</strong> Use Basic menu for Wi-Fi settings, internet type, and connected devices, or Advanced for VLAN, QoS, and system tools.
                </li>
              </ol>
            </div>
          </section>

          {/* =============================================================
              1. LOGIN ADDRESSES TABLE
              ============================================================= */}
          <section className="space-y-4" id="login-addresses" aria-label="Mercusys Login Addresses">
            <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
              <Globe size={18} className="text-blue-400" />
              1. Mercusys Router Login Addresses
            </h2>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Mercusys routers use one primary IP address and one local hostname alias for admin panel access. The table below details each entry point.
            </p>
            <div className="overflow-x-auto rounded-xl border border-white/5">
              <table className="w-full text-xs text-[var(--text-secondary)]">
                <thead>
                  <tr className="bg-blue-500/10 text-blue-300 text-left">
                    <th className="px-4 py-3 font-semibold">Address / Gateway</th>
                    <th className="px-4 py-3 font-semibold">Usage</th>
                    <th className="px-4 py-3 font-semibold">Important Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {loginAddresses.map((row, i) => (
                    <tr
                      key={i}
                      className={i % 2 === 0 ? "bg-white/[0.02]" : "bg-white/[0.04]"}
                    >
                      <td className="px-4 py-3 font-mono text-blue-300 font-semibold">
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
          </section>

          {/* =============================================================
              2. MODELS TABLE
              ============================================================= */}
          <section className="space-y-4" id="models-lookup" aria-label="Mercusys Models">
            <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
              <Layers size={18} className="text-blue-400" />
              2. Mercusys Router Models Specifications
            </h2>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Find your specific Mercusys model below to identify its Wi-Fi standard, speed class, and key hardware features.
            </p>
            <div className="overflow-x-auto rounded-xl border border-white/5">
              <table className="w-full text-xs text-[var(--text-secondary)]">
                <thead>
                  <tr className="bg-blue-500/10 text-blue-300 text-left">
                    <th className="px-4 py-3 font-semibold">Model</th>
                    <th className="px-4 py-3 font-semibold">Wi-Fi Standard</th>
                    <th className="px-4 py-3 font-semibold">Speed Class</th>
                    <th className="px-4 py-3 font-semibold">Key Features</th>
                  </tr>
                </thead>
                <tbody>
                  {mercusysModels.map((row, i) => (
                    <tr
                      key={i}
                      className={i % 2 === 0 ? "bg-white/[0.02]" : "bg-white/[0.04]"}
                    >
                      <td className="px-4 py-3 font-semibold text-blue-300">{row.model}</td>
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
              3. LED STATUS TABLE
              ============================================================= */}
          <section className="space-y-4" id="led-meanings" aria-label="Mercusys LED Meanings">
            <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
              <Sliders size={18} className="text-blue-400" />
              3. Mercusys LED Light Status Meanings
            </h2>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Use the LED diagnostic table below to identify the status of your Mercusys router or Halo mesh node at a glance.
            </p>
            <div className="overflow-x-auto rounded-xl border border-white/5">
              <table className="w-full text-xs text-[var(--text-secondary)]">
                <thead>
                  <tr className="bg-blue-500/10 text-blue-300 text-left">
                    <th className="px-4 py-3 font-semibold">LED Indicator</th>
                    <th className="px-4 py-3 font-semibold">Light State</th>
                    <th className="px-4 py-3 font-semibold">Meaning & Resolution</th>
                  </tr>
                </thead>
                <tbody>
                  {ledStatuses.map((row, i) => (
                    <tr
                      key={i}
                      className={i % 2 === 0 ? "bg-white/[0.02]" : "bg-white/[0.04]"}
                    >
                      <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">{row.name}</td>
                      <td className="px-4 py-3 font-mono text-blue-300 font-semibold">{row.status}</td>
                      <td className="px-4 py-3 text-[var(--text-tertiary)]">{row.meaning}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* =============================================================
              4. COMPARISON TABLE
              ============================================================= */}
          <section className="space-y-4" id="comparison" aria-label="Mercusys vs TP-Link vs Tenda">
            <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
              <Cpu size={18} className="text-blue-400" />
              4. Router Comparison: Mercusys vs. TP-Link vs. Tenda
            </h2>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Mercusys, TP-Link, and Tenda are all dominant in the budget networking market. Here's how they compare across key operational parameters.
            </p>
            <div className="overflow-x-auto rounded-xl border border-white/5">
              <table className="w-full text-xs text-[var(--text-secondary)]">
                <thead>
                  <tr className="bg-blue-500/10 text-blue-300 text-left">
                    <th className="px-4 py-3 font-semibold">Feature</th>
                    <th className="px-4 py-3 font-semibold">Mercusys</th>
                    <th className="px-4 py-3 font-semibold">TP-Link</th>
                    <th className="px-4 py-3 font-semibold">Tenda</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr
                      key={i}
                      className={i % 2 === 0 ? "bg-white/[0.02]" : "bg-white/[0.04]"}
                    >
                      <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">{row.feature}</td>
                      <td className="px-4 py-3 text-blue-300">{row.mercusys}</td>
                      <td className="px-4 py-3">{row.tplink}</td>
                      <td className="px-4 py-3 text-[var(--text-tertiary)]">{row.tenda}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* =============================================================
              HALO MESH SETUP
              ============================================================= */}
          <section className="space-y-4" id="halo-setup" aria-label="Mercusys Halo Mesh Setup">
            <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
              <Radio size={18} className="text-blue-400" />
              Mercusys Halo Whole-Home Mesh Setup Guide
            </h2>
            <div className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed space-y-3">
              <p>
                The <strong>Mercusys Halo</strong> series (H50G, H70X, H80X) creates a unified whole-home Wi-Fi network using multiple nodes that share a single SSID. Configuration is done through the Mercusys app.
              </p>
              <ol className="list-decimal pl-5 space-y-2 text-xs">
                <li>
                  <strong>Connect Primary Halo Node:</strong> Plug an Ethernet cable from your modem's LAN port into the WAN port on the primary Halo node.
                </li>
                <li>
                  <strong>Power On:</strong> Connect the power adapter. Wait for the LED to change from red to pulsing blue (ready to configure).
                </li>
                <li>
                  <strong>Connect Phone to Halo SSID:</strong> Connect your smartphone to the default Wi-Fi network named on the sticker at the bottom of the node.
                </li>
                <li>
                  <strong>Open Mercusys App:</strong> Download the Mercusys app, create an account, and follow the guided setup. Select your internet connection type and set your custom Wi-Fi name and password.
                </li>
                <li>
                  <strong>Add Satellite Nodes:</strong> Position additional Halo nodes in adjacent rooms. Power them on — they will appear in the app. Tap '+' and follow the pairing process to extend your mesh network.
                </li>
              </ol>
            </div>
          </section>
        </div>
      </TroubleshootingArticleShell>
    </>
  );
}
