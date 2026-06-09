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
  title: "Belkin Router Login, Password, Reset & Setup Guide (2026)",
  description:
    "Complete guide to log in to Belkin routers at 192.168.2.1 or http://router. Find default passwords, LED indicator meanings, model specs, troubleshooting for Belkin N, AC, and Wi-Fi 6 routers.",
  canonical: "/routers/belkin",
  keywords: [
    "belkin router login",
    "belkin default password",
    "belkin router setup",
    "192.168.2.1",
    "http://router belkin",
    "belkin router admin",
    "belkin router reset",
    "belkin n router login",
    "belkin router password",
    "belkin router troubleshooting",
    "belkin f9k router",
    "belkin wifi login",
  ],
});

// =============================================================
// Breadcrumbs
// =============================================================

const breadcrumbs = [
  { name: "Routers", url: "/routers" },
  { name: "Belkin", url: "/routers/belkin" },
];

// =============================================================
// Root Causes
// =============================================================

const commonCauses = [
  {
    title: "Unique Default IP: 192.168.2.1",
    desc: "Unlike most routers that use 192.168.1.1 or 192.168.0.1, Belkin routers default to 192.168.2.1. Users often try the wrong IP. Always confirm your gateway using 'ipconfig' on Windows.",
  },
  {
    title: "Empty Password Field on Login",
    desc: "Belkin routers ship with no default admin password — the password field is blank on first access. Many users don't realize this and think the login is broken. Simply leave the password field empty and click Submit.",
  },
  {
    title: "http://router Hostname Resolution Failure",
    desc: "The local hostname alias 'http://router' only resolves via Belkin's local DNS server. If you have an active VPN, browser DoH enabled, or you're on a different network, this alias won't work. Use 192.168.2.1 directly instead.",
  },
  {
    title: "DHCP Conflict with Primary ISP Router",
    desc: "When Belkin is deployed behind an ISP router on the same 192.168.2.X subnet, IP conflicts occur. This is rare since 192.168.2.X is uncommon for ISP hardware, but check and change Belkin's LAN IP to 192.168.3.1 if needed.",
  },
];

// =============================================================
// Quick Fix Checklist
// =============================================================

const quickFixChecklist = [
  "Connect your device to the Belkin router via Ethernet or Wi-Fi (SSID is on the bottom label).",
  "Open a browser and go to http://192.168.2.1 — this is Belkin's unique default IP (not 192.168.1.1).",
  "On the login page, leave the password field completely blank and click Submit — Belkin has no default password.",
  "If a password is required, check the label on the underside of the router for any set credentials.",
  "Disable VPN clients and browser proxy extensions before attempting to access the admin panel.",
  "To factory reset: with the router powered on, hold the RESET button on the back for 10 seconds until the power light blinks.",
];

// =============================================================
// Diagnostic Steps
// =============================================================

const troubleshootingSteps = [
  {
    title: "Confirm Belkin Router's Gateway IP",
    description:
      "On Windows, open Command Prompt and run 'ipconfig'. Look for the 'Default Gateway' under your active adapter. Belkin routers uniquely use 192.168.2.1 as their default gateway — not 192.168.1.1 like most brands. If your gateway shows 192.168.1.1, you may be connected to a different router. Ensure you're connected to the Belkin network specifically.",
    tip: "You can also try running 'arp -a' in Command Prompt to list all discovered local devices and find the Belkin router's IP if it was changed from default.",
  },
  {
    title: "Access the Belkin Admin Panel",
    description:
      "Open your web browser in Private/Incognito mode. Type http://192.168.2.1 in the URL address bar. You can also try http://router (Belkin's local hostname alias). If both fail, confirm your gateway IP using ipconfig. The Belkin login page will show a single password field. Do not type 'admin' — the default password is blank (empty).",
    tip: "Belkin routers use HTTP (not HTTPS) for the admin panel. If your browser automatically redirects to HTTPS, manually type http:// to force the correct protocol.",
  },
  {
    title: "Log In and Complete Initial Setup",
    description:
      "On the login page, leave the password field blank and click 'Submit' or press Enter. You will be taken to the Belkin setup wizard or the main dashboard. The wizard walks you through internet connection type selection (automatic DHCP, PPPoE, or Static IP), creating a custom Wi-Fi name and password, and setting an admin password. It is strongly recommended to set an admin password during this step.",
    tip: "After completing setup, write down your admin password and store it securely. Since Belkin has no default password, if you forget it, a factory reset is the only recovery option.",
  },
  {
    title: "Configure WAN and Test Internet Access",
    description:
      "From the Belkin dashboard, navigate to Internet Connection or WAN Settings. Belkin automatically detects most ISP connection types (DHCP). If your ISP uses PPPoE, select PPPoE and enter the username and password provided by your ISP. For Static IP, enter the assigned IP, subnet mask, gateway, and DNS servers. Click Save and check the internet connection status indicator on the main dashboard.",
    tip: "If your ISP provided a modem-router combo and you're using Belkin behind it, ensure there's no double-NAT issue. Set Belkin to use a different subnet (e.g., 192.168.3.1 LAN) or enable DMZ mode on the upstream modem.",
  },
];

// =============================================================
// FAQs
// =============================================================

const faqs = [
  {
    question: "What is the default IP address for Belkin routers?",
    answer:
      "The default gateway IP for Belkin routers is 192.168.2.1 — which is unique among router brands (most use 192.168.1.1 or 192.168.0.1). Belkin also provides the local hostname alias http://router, which resolves when you are on the Belkin network using its DNS. Always confirm your default gateway with 'ipconfig' on Windows if access fails.",
  },
  {
    question: "What is the default password for Belkin routers?",
    answer:
      "Belkin routers have no default admin password. On the login screen, leave the password field completely blank and click Submit to log in. After gaining access, it is strongly recommended to navigate to Utilities > System Settings and set a custom admin password to secure your router management panel.",
  },
  {
    question: "How do I factory reset a Belkin router?",
    answer:
      "To factory reset a Belkin router: (1) Keep the router powered on. (2) Locate the RESET button (usually a small recessed button on the back or bottom). (3) Press and hold using a paperclip for 10 seconds until the power light blinks rapidly. (4) Release and wait for the router to reboot (approximately 60 seconds). All settings — including Wi-Fi name, password, admin password, and ISP settings — will be erased.",
  },
  {
    question: "Why doesn't http://router work on Belkin?",
    answer:
      "http://router is a local hostname alias that Belkin routers provide through their built-in DNS server. It fails if: (1) You are connected to a different network or mobile data. (2) A VPN is routing your DNS queries externally. (3) Your browser uses DNS-over-HTTPS (DoH) which bypasses local DNS. To fix: disable VPN, turn off DoH in browser settings, or simply type http://192.168.2.1 directly in the URL bar.",
  },
  {
    question: "How do I change the Wi-Fi name and password on a Belkin router?",
    answer:
      "To change Wi-Fi settings: (1) Log in at http://192.168.2.1. (2) Navigate to Wi-Fi > Wi-Fi Settings or Wireless Settings. (3) Update the Network Name (SSID) field. (4) Choose WPA2-PSK or WPA3 under Security Mode. (5) Enter your desired Wi-Fi password. (6) Click Save Changes. All connected devices will need to reconnect with the new credentials.",
  },
  {
    question: "How do I update Belkin router firmware?",
    answer:
      "To update Belkin firmware: (1) Log in to the admin panel at 192.168.2.1. (2) Navigate to Utilities > Firmware Update. (3) Click 'Check for Updates' to search for automatic updates, or visit the Belkin support website to download the firmware file manually for your exact model number. (4) Upload the file and click Update. Do not disconnect power during the firmware update process.",
  },
  {
    question: "Does Belkin support parental controls?",
    answer:
      "Yes, modern Belkin routers include basic parental controls. Navigate to Firewall > Parental Controls in the admin panel to set up content filtering, access scheduling (block internet at specific times), and website blacklists/whitelists by connected device. Belkin's parental controls are simpler compared to ASUS AiProtection or Netgear Circle but are effective for basic household management.",
  },
  {
    question: "What is the connection between Belkin and Linksys?",
    answer:
      "Belkin acquired Linksys from Cisco in 2013. Since then, Belkin and Linksys have operated as sister brands under Belkin International. In 2018, Foxconn Technology Group acquired Belkin International, which included both Belkin and Linksys brands. Belkin focuses on consumer peripherals and basic routers, while Linksys focuses on the more advanced home networking market with products like Velop mesh systems.",
  },
  {
    question: "How do I enable Guest Wi-Fi on a Belkin router?",
    answer:
      "To enable guest Wi-Fi: (1) Log in to the Belkin admin panel at 192.168.2.1. (2) Navigate to Wi-Fi > Guest Access or Wi-Fi Settings. (3) Enable the Guest Network toggle. (4) Set a separate SSID for guests (e.g., 'HomeGuest'). (5) Set a guest Wi-Fi password. (6) Optionally enable 'Guest network isolation' to prevent guests from accessing your main local network devices. (7) Click Save.",
  },
  {
    question: "How do I set up port forwarding on a Belkin router?",
    answer:
      "To set up port forwarding: (1) Log in at http://192.168.2.1. (2) Navigate to Firewall > Virtual Servers (Port Forwarding). (3) Click Add. (4) Enter a description, the internal IP of your device (recommend setting a DHCP reservation), the external port, the internal port, and the protocol (TCP, UDP, or Both). (5) Click Save. Use an online port checker tool to confirm the port is accessible externally.",
  },
];

// =============================================================
// JSON-LD Schema
// =============================================================

const collectionPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": "https://routervia.com/routers/belkin#collection",
  url: "https://routervia.com/routers/belkin",
  name: "Belkin Router Hub: Login, Password, Setup & Troubleshooting",
  description:
    "Complete guide to log in to Belkin routers at 192.168.2.1 or http://router. Default password (blank), LED diagnostics, firmware updates, and factory reset procedures.",
  mainEntity: {
    "@type": "ItemList",
    name: "Belkin Router Product Lines",
    numberOfItems: 3,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Belkin Wi-Fi 6 Routers",
        description: "Modern AX-class dual and tri-band routers with WPA3 support.",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Belkin AC / N Series",
        description: "Legacy Wi-Fi 5 and Wi-Fi 4 home routers for basic broadband.",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Belkin F9K Series",
        description: "Popular legacy N-series routers (N300, N600, N750) for home use.",
      },
    ],
  },
};

// =============================================================
// 1. Login Addresses
// =============================================================

const loginAddresses = [
  {
    address: "192.168.2.1",
    usage: "All Belkin routers",
    notes: "Unique default — Belkin uses 192.168.2.X subnet, not 192.168.1.X.",
  },
  {
    address: "http://router",
    usage: "Local hostname alias",
    notes: "Resolves via Belkin's local DNS. Fails with active VPN or browser DoH.",
  },
];

// =============================================================
// 2. Belkin Models Table
// =============================================================

const belkinModels = [
  {
    model: "Belkin F9K1002 (N300)",
    standard: "Wi-Fi 4 (802.11n)",
    speed: "N300",
    highlight: "Basic single-band, 2 LAN ports, suitable for low-speed broadband",
  },
  {
    model: "Belkin F9K1105 (N300)",
    standard: "Wi-Fi 4 (802.11n)",
    speed: "N300",
    highlight: "3 external antennas, 4 LAN ports, simple home router",
  },
  {
    model: "Belkin F9K1112 (AC750)",
    standard: "Wi-Fi 5 (802.11ac)",
    speed: "AC750",
    highlight: "Dual-band AC, 4x GbE ports, budget Wi-Fi 5 entry",
  },
  {
    model: "Belkin F9K1115 (AC1200)",
    standard: "Wi-Fi 5 (802.11ac)",
    speed: "AC1200",
    highlight: "Dual-band AC1200, Gigabit ports, beamforming",
  },
  {
    model: "Belkin RT1800 (AX1800)",
    standard: "Wi-Fi 6 (802.11ax)",
    speed: "AX1800",
    highlight: "Wi-Fi 6, WPA3, OFDMA, MU-MIMO, 4x Gigabit LAN",
  },
  {
    model: "Belkin RT3200 (AX3200)",
    standard: "Wi-Fi 6 (802.11ax)",
    speed: "AX3200",
    highlight: "Tri-band Wi-Fi 6, 2.5G WAN port, 160MHz bandwidth",
  },
];

// =============================================================
// 3. LED Status Meanings
// =============================================================

const ledStatuses = [
  {
    name: "Power LED",
    status: "Solid White / Blue",
    meaning: "Router is powered on and operating normally.",
  },
  {
    name: "Power LED",
    status: "Blinking White",
    meaning: "Router is booting up or firmware is being applied. Wait for it to stabilize.",
  },
  {
    name: "Internet LED",
    status: "Solid White / Blue",
    meaning: "Internet connection is established and active.",
  },
  {
    name: "Internet LED",
    status: "Solid Amber / Orange",
    meaning: "WAN port has physical link but no internet access. Check ISP settings.",
  },
  {
    name: "Wi-Fi LED",
    status: "Off",
    meaning: "Wireless radio is disabled. Enable via admin panel > Wi-Fi Settings.",
  },
  {
    name: "WPS LED",
    status: "Blinking",
    meaning: "WPS pairing mode is active. Press WPS button on client device to pair within 2 minutes.",
  },
];

// =============================================================
// 4. Belkin vs D-Link vs Linksys Comparison
// =============================================================

const comparisonRows = [
  {
    feature: "Default Login IP",
    belkin: "192.168.2.1",
    dlink: "192.168.0.1",
    linksys: "192.168.1.1",
  },
  {
    feature: "Local Hostname",
    belkin: "http://router",
    dlink: "dlinkrouter.local",
    linksys: "myrouter.local",
  },
  {
    feature: "Default Password",
    belkin: "Blank (no password)",
    dlink: "Blank or 'admin'",
    linksys: "Custom (Linksys app)",
  },
  {
    feature: "Mesh Support",
    belkin: "Limited (no dedicated system)",
    dlink: "COVR mesh system",
    linksys: "Velop (industry-leading mesh)",
  },
  {
    feature: "Price Tier",
    belkin: "Budget to mid-range",
    dlink: "Budget to mid-range",
    linksys: "Mid-range to premium",
  },
  {
    feature: "Parent Company",
    belkin: "Foxconn (Belkin Int'l)",
    dlink: "D-Link Corp (independent)",
    linksys: "Foxconn (via Belkin Int'l)",
  },
];

// =============================================================
// Page Component
// =============================================================

export default function BelkinRouterHubPage() {
  return (
    <>
      <JsonLd data={collectionPageSchema} />

      <TroubleshootingArticleShell
        h1="Belkin Router Login, Password, Setup & Troubleshooting Guide"
        intro="Belkin is a consumer networking and electronics brand known for its straightforward, easy-to-configure home routers. Belkin routers are unique in using 192.168.2.1 as their default gateway IP — unlike most brands that use 192.168.1.1 or 192.168.0.1. Belkin also ships routers with no default admin password, requiring users to simply leave the login field blank on first access. This guide covers how to log in to your Belkin router at 192.168.2.1 or http://router, understand LED indicators, configure your internet connection, update firmware, set up guest networks, and perform a factory reset on all major Belkin N, AC, and Wi-Fi 6 models."
        category="wifi"
        breadcrumbs={breadcrumbs}
        faqs={faqs}
        troubleshootingSteps={troubleshootingSteps}
        warningBanner={{
          title: "Belkin Default: No Password — Set One Immediately",
          text: "Belkin routers ship with no admin password — anyone on your local network can access the router admin panel. After your first login, navigate to Utilities > System Settings and set a strong custom admin password to prevent unauthorized configuration changes.",
        }}
        quickFixChecklist={quickFixChecklist}
        commonCauses={commonCauses}
        whenToContactISP="If the Belkin router's internet LED shows amber after correctly configuring your WAN type and restarting the modem, your ISP may be blocking the connection. This can happen due to MAC address filtering (your ISP registered the modem's MAC), PPPoE authentication failures, or a physical line issue. Contact your ISP to verify your account status and connection type."
        severityLevel="low"
      >
        <div className="space-y-12">
          {/* FEATURED SNIPPET */}
          <section
            className="glass-card p-6 border border-purple-950/20 bg-purple-950/5 rounded-2xl relative overflow-hidden space-y-4"
            aria-label="How to Login to a Belkin Router"
          >
            <div className="absolute top-0 right-0 bg-purple-500/10 text-purple-400 text-[10px] font-mono uppercase tracking-wider px-3 py-1 rounded-bl-lg font-bold">
              Featured Snippet
            </div>
            <h2 className="text-sm font-bold text-purple-400 uppercase tracking-wide flex items-center gap-1.5">
              <Zap size={16} /> How to Login to a Belkin Router
            </h2>
            <div className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
              <p className="mb-3">
                Follow these exact steps to access your Belkin router's administration panel:
              </p>
              <ol className="list-decimal pl-5 space-y-2 text-xs text-[var(--text-secondary)] font-medium">
                <li>
                  <strong>Connect to Belkin network:</strong> Join the Belkin Wi-Fi network (SSID on bottom label) or connect via Ethernet to a LAN port.
                </li>
                <li>
                  <strong>Open browser:</strong> Use Chrome, Edge, or Firefox in Private mode.
                </li>
                <li>
                  <strong>Enter Belkin's unique IP:</strong> Type{" "}
                  <strong className="text-purple-400 font-mono">http://192.168.2.1</strong>{" "}
                  in the URL bar and press Enter. (Belkin uses 192.168.2.1 — not 192.168.1.1)
                </li>
                <li>
                  <strong>Leave password blank:</strong> Belkin has no default password. Leave the password field <em>empty</em> and click <strong>Submit</strong>.
                </li>
                <li>
                  <strong>Complete setup:</strong> Use the setup wizard to configure your internet connection and Wi-Fi. Set an admin password in Utilities &gt; System Settings.
                </li>
              </ol>
            </div>
          </section>

          {/* 1. LOGIN ADDRESSES */}
          <section className="space-y-4" id="login-addresses" aria-label="Belkin Login Addresses">
            <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
              <Globe size={18} className="text-purple-400" />
              1. Belkin Router Login Addresses
            </h2>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Belkin uses a unique IP range (192.168.2.X) that differs from most other router brands. The table below shows all valid entry points.
            </p>
            <div className="overflow-x-auto rounded-xl border border-white/5">
              <table className="w-full text-xs text-[var(--text-secondary)]">
                <thead>
                  <tr className="bg-purple-500/10 text-purple-300 text-left">
                    <th className="px-4 py-3 font-semibold">Address</th>
                    <th className="px-4 py-3 font-semibold">Usage</th>
                    <th className="px-4 py-3 font-semibold">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {loginAddresses.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white/[0.02]" : "bg-white/[0.04]"}>
                      <td className="px-4 py-3 font-mono text-purple-300 font-semibold">{row.address}</td>
                      <td className="px-4 py-3">{row.usage}</td>
                      <td className="px-4 py-3 text-[var(--text-tertiary)]">{row.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 2. MODELS TABLE */}
          <section className="space-y-4" id="models-lookup" aria-label="Belkin Models">
            <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
              <Layers size={18} className="text-purple-400" />
              2. Belkin Router Models Specifications
            </h2>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Find your Belkin router model below for its Wi-Fi standard, speed class, and core features.
            </p>
            <div className="overflow-x-auto rounded-xl border border-white/5">
              <table className="w-full text-xs text-[var(--text-secondary)]">
                <thead>
                  <tr className="bg-purple-500/10 text-purple-300 text-left">
                    <th className="px-4 py-3 font-semibold">Model</th>
                    <th className="px-4 py-3 font-semibold">Wi-Fi Standard</th>
                    <th className="px-4 py-3 font-semibold">Speed Class</th>
                    <th className="px-4 py-3 font-semibold">Key Features</th>
                  </tr>
                </thead>
                <tbody>
                  {belkinModels.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white/[0.02]" : "bg-white/[0.04]"}>
                      <td className="px-4 py-3 font-semibold text-purple-300">{row.model}</td>
                      <td className="px-4 py-3">{row.standard}</td>
                      <td className="px-4 py-3 font-mono">{row.speed}</td>
                      <td className="px-4 py-3 text-[var(--text-tertiary)]">{row.highlight}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 3. LED STATUS */}
          <section className="space-y-4" id="led-meanings" aria-label="Belkin LED Meanings">
            <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
              <Sliders size={18} className="text-purple-400" />
              3. Belkin LED Light Status Meanings
            </h2>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Use this table to diagnose your Belkin router's operational state from its LED indicator lights.
            </p>
            <div className="overflow-x-auto rounded-xl border border-white/5">
              <table className="w-full text-xs text-[var(--text-secondary)]">
                <thead>
                  <tr className="bg-purple-500/10 text-purple-300 text-left">
                    <th className="px-4 py-3 font-semibold">LED Indicator</th>
                    <th className="px-4 py-3 font-semibold">Light State</th>
                    <th className="px-4 py-3 font-semibold">Meaning & Action</th>
                  </tr>
                </thead>
                <tbody>
                  {ledStatuses.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white/[0.02]" : "bg-white/[0.04]"}>
                      <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">{row.name}</td>
                      <td className="px-4 py-3 font-mono text-purple-300 font-semibold">{row.status}</td>
                      <td className="px-4 py-3 text-[var(--text-tertiary)]">{row.meaning}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 4. COMPARISON */}
          <section className="space-y-4" id="comparison" aria-label="Belkin vs D-Link vs Linksys">
            <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
              <Cpu size={18} className="text-purple-400" />
              4. Router Comparison: Belkin vs. D-Link vs. Linksys
            </h2>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Belkin, D-Link, and Linksys all target the home consumer market. Here's a direct comparison of their key operational differences.
            </p>
            <div className="overflow-x-auto rounded-xl border border-white/5">
              <table className="w-full text-xs text-[var(--text-secondary)]">
                <thead>
                  <tr className="bg-purple-500/10 text-purple-300 text-left">
                    <th className="px-4 py-3 font-semibold">Feature</th>
                    <th className="px-4 py-3 font-semibold">Belkin</th>
                    <th className="px-4 py-3 font-semibold">D-Link</th>
                    <th className="px-4 py-3 font-semibold">Linksys</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white/[0.02]" : "bg-white/[0.04]"}>
                      <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">{row.feature}</td>
                      <td className="px-4 py-3 text-purple-300">{row.belkin}</td>
                      <td className="px-4 py-3">{row.dlink}</td>
                      <td className="px-4 py-3 text-[var(--text-tertiary)]">{row.linksys}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </TroubleshootingArticleShell>
    </>
  );
}
