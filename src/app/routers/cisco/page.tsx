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
  title: "Cisco Router Login, Password, Reset & Setup Guide (2026)",
  description:
    "Complete guide to log in to Cisco home and small business routers at 192.168.1.1 or 192.168.0.1. Find default passwords, Linksys legacy info, admin panel access, and full troubleshooting for Cisco RV and home routers.",
  canonical: "/routers/cisco",
  keywords: [
    "cisco router login",
    "cisco default password",
    "cisco router setup",
    "192.168.1.1 cisco",
    "cisco rv router login",
    "cisco small business router",
    "cisco router admin",
    "cisco router reset",
    "cisco rv340 login",
    "cisco rv160 setup",
    "cisco router password",
    "cisco router troubleshooting",
  ],
});

// =============================================================
// Breadcrumbs
// =============================================================

const breadcrumbs = [
  { name: "Routers", url: "/routers" },
  { name: "Cisco", url: "/routers/cisco" },
];

// =============================================================
// Root Causes for Cisco Issues
// =============================================================

const commonCauses = [
  {
    title: "HTTPS-Only Admin Panel with Untrusted Certificate",
    desc: "Cisco RV-series routers use HTTPS for their admin panel (https://192.168.1.1) and present a self-signed certificate. Browsers block this with a security warning. You must click 'Advanced' then 'Proceed' to access the panel — this is expected behavior.",
  },
  {
    title: "Cisco RV Default Credentials Changed",
    desc: "Cisco RV-series (RV160, RV260, RV340) ship with admin/admin as defaults but require you to change the password on first login. Many users forget their custom password after the initial setup wizard.",
  },
  {
    title: "Dual-WAN Failover Misconfiguration",
    desc: "Cisco RV routers support dual-WAN load balancing. Misconfigured failover policies can cause intermittent connectivity where one WAN link fails silently without triggering a proper failover to the backup link.",
  },
  {
    title: "VPN Tunnel Phase Negotiation Failure",
    desc: "On Cisco RV routers configured for IPsec or SSL VPN, mismatched Phase 1 or Phase 2 parameters (encryption algorithm, DH group, or lifetime values) between the router and VPN client will prevent tunnel establishment.",
  },
];

// =============================================================
// Quick Fix Checklist
// =============================================================

const quickFixChecklist = [
  "Ensure your computer is connected to the Cisco router via an Ethernet cable or the router's Wi-Fi network.",
  "Open a browser and navigate to https://192.168.1.1 (note the https://). Accept the self-signed certificate warning to proceed.",
  "Try the default credentials: username 'cisco' and password 'cisco', or 'admin' / 'admin' depending on the model generation.",
  "Check the product label on the underside or rear of the router for the exact default login credentials for your model.",
  "Disable any VPN clients, proxy settings, or firewall software on your PC that might block access to the local admin panel.",
  "If credentials are lost, press and hold the RESET button on the back of the unit for 10+ seconds to restore factory defaults.",
];

// =============================================================
// Diagnostic Steps
// =============================================================

const troubleshootingSteps = [
  {
    title: "Determine Your Cisco Router's Gateway IP",
    description:
      "Connect a computer to the Cisco router via Ethernet cable. On Windows, open Command Prompt and run 'ipconfig'. Under your Ethernet adapter, find the 'Default Gateway' field. Cisco home routers typically use 192.168.1.1, while some older models or custom ISP configurations may use 192.168.0.1 or 10.0.0.1. Cisco RV-series small business routers default to 192.168.1.1.",
    tip: "Always connect via Ethernet cable rather than Wi-Fi for initial router configuration. This prevents Wi-Fi-related disconnections during setup.",
  },
  {
    title: "Access the Cisco Web-Based Setup Page",
    description:
      "Open your browser and type https://192.168.1.1 in the address bar (use https:// not http:// for RV-series). You'll see a browser security warning about an untrusted SSL certificate — this is normal for Cisco routers using self-signed certificates. Click 'Advanced' then 'Proceed to 192.168.1.1 (unsafe)' to continue. The Cisco login page will appear.",
    tip: "For Cisco RV-series, use Microsoft Edge or Google Chrome. Firefox may require additional steps to bypass the certificate warning on some firmware versions.",
  },
  {
    title: "Log In with Admin Credentials",
    description:
      "Cisco RV-series default login: Username = cisco, Password = cisco. On first login, you will be forced to change the password. Cisco home routers (older EPC and DPC models): Username = admin, Password = admin. If neither works, check the physical label on the router. After a factory reset, defaults are restored.",
    tip: "Cisco RV routers enforce password complexity requirements. Your new password must be at least 8 characters with uppercase, lowercase, and a number — simple passwords like 'admin123' will be rejected.",
  },
  {
    title: "Configure WAN Settings and Verify Connectivity",
    description:
      "After login, navigate to WAN > WAN Settings (or Internet Connection on home models). Select your connection type: DHCP (Dynamic IP) for most cable/fiber setups, PPPoE if your ISP requires a username/password, or Static IP with your ISP-assigned IP. For RV-series with dual-WAN, configure WAN1 as primary and WAN2 as failover. Click Save, then check the WAN status dashboard for a green connection indicator.",
    tip: "If using Cisco RV340 dual-WAN, navigate to WAN > WAN Failover and set a ping target (e.g., 8.8.8.8) with a 3-second interval and 3 retry attempts for accurate WAN health monitoring.",
  },
];

// =============================================================
// FAQ Q&A Data
// =============================================================

const faqs = [
  {
    question: "What is the default IP address for Cisco routers?",
    answer:
      "Cisco RV-series small business routers (RV160, RV260, RV340) use 192.168.1.1 as the default gateway and admin panel IP. Cisco home routers (including older Cisco-branded Linksys models) may use 192.168.0.1 or 192.168.1.1 depending on the model. Always confirm using 'ipconfig' (Windows) or 'ip route' (Linux/macOS) while connected to the router.",
  },
  {
    question: "What are the default login credentials for Cisco routers?",
    answer:
      "For Cisco RV-series (RV160, RV260, RV340, RV345): Username = cisco, Password = cisco. For older Cisco home/SOHO routers: Username = admin, Password = admin. On first login to RV-series, you are required to change the password immediately. Check the label on the underside of your specific router for model-specific defaults.",
  },
  {
    question: "How do I factory reset a Cisco RV router?",
    answer:
      "To factory reset a Cisco RV router: (1) Ensure the router is powered on. (2) Locate the RESET button on the back panel. (3) Press and hold the RESET button with a paperclip for 10 to 15 seconds until the power LED blinks or the router reboots. (4) Release the button. The router will reboot to factory settings (this takes about 2 minutes). All custom configuration, VPN settings, firewall rules, and passwords will be erased.",
  },
  {
    question: "Why does my browser show a security warning when accessing 192.168.1.1 on a Cisco router?",
    answer:
      "Cisco RV-series routers use HTTPS with a self-signed SSL certificate for the admin panel, which browsers mark as 'untrusted' because it wasn't issued by a recognized certificate authority. This is expected and safe for local admin access. To proceed: in Chrome click 'Advanced' then 'Proceed to 192.168.1.1 (unsafe)'; in Firefox click 'Advanced' then 'Accept the Risk and Continue'. The connection is still encrypted locally.",
  },
  {
    question: "What is the difference between Cisco RV and Cisco home routers?",
    answer:
      "Cisco RV-series are small business/SMB routers designed for offices with features like VPN server (IPsec/SSL), dual-WAN failover, advanced firewall rules, VLAN support, and network segmentation. Cisco home routers (historically Linksys, which Cisco sold in 2013) are consumer-grade with simpler features — Wi-Fi management, basic port forwarding, parental controls, and DHCP. For home use, the simpler Linksys (now independent) or RV160W is appropriate.",
  },
  {
    question: "How do I set up a VPN on a Cisco RV router?",
    answer:
      "To configure IPsec VPN on a Cisco RV router: (1) Log in to the admin panel. (2) Navigate to VPN > IPsec > VPN Profiles. (3) Click Add and set the remote gateway IP/FQDN and pre-shared key. (4) Configure Phase 1 (IKEv2, AES-256, SHA-256, DH Group 14) and Phase 2 (ESP, AES-256, SHA-256, PFS DH Group 14) parameters. (5) Set local and remote subnets. (6) Click Save and Enable. For SSL VPN (AnyConnect), navigate to VPN > SSL VPN and configure the user database and client download portal.",
  },
  {
    question: "How do I update Cisco RV router firmware?",
    answer:
      "To update firmware on a Cisco RV router: (1) Log in to the admin panel at https://192.168.1.1. (2) Navigate to Administration > Firmware Upgrade. (3) Visit Cisco's support website and download the latest firmware for your specific RV model and hardware version. (4) Upload the .bin firmware file using the 'Choose File' button. (5) Click Upgrade and wait for the router to reboot — this takes 5 to 10 minutes. Never interrupt power during firmware upgrade.",
  },
  {
    question: "Does Cisco RV support VLAN segmentation?",
    answer:
      "Yes, Cisco RV-series routers (RV260, RV340, RV345) support VLAN (Virtual LAN) segmentation. You can create multiple VLANs for network isolation — for example, separating IoT devices, guest users, and office workstations into different broadcast domains. Navigate to LAN > VLAN to create VLANs, assign LAN ports and SSIDs to specific VLANs, and configure inter-VLAN routing policies.",
  },
  {
    question: "How do I configure Port Forwarding on a Cisco router?",
    answer:
      "To configure port forwarding on Cisco RV: (1) Log in at https://192.168.1.1. (2) Navigate to Firewall > Port Forwarding. (3) Click Add and enter: the external port (or range), the protocol (TCP/UDP/Both), the internal IP of the target device (assign it a DHCP reservation first), and the internal port. (4) Click Save. Test with an external port checker tool to confirm the rule is working.",
  },
  {
    question: "What happened to Cisco Linksys routers?",
    answer:
      "Cisco acquired Linksys in 2003 and sold it to Belkin in 2013. During Cisco's ownership, Linksys products were sometimes branded as 'Cisco Linksys'. After the sale, Linksys became an independent brand under Belkin's portfolio and later Foxconn. Current Linksys routers (Velop mesh, MR series) are completely separate from Cisco's SMB RV-series product line. If you have a 'Cisco Linksys' router, it was manufactured between 2003 and 2013.",
  },
];

// =============================================================
// JSON-LD Schema
// =============================================================

const collectionPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": "https://routervia.com/routers/cisco#collection",
  url: "https://routervia.com/routers/cisco",
  name: "Cisco Router Hub: Login, Password, Setup & Troubleshooting",
  description:
    "Complete guide to Cisco RV-series and home router login at 192.168.1.1. Default credentials, firmware updates, VPN setup, VLAN configuration, and factory reset procedures.",
  mainEntity: {
    "@type": "ItemList",
    name: "Cisco Router Product Lines",
    numberOfItems: 3,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Cisco RV340 Series",
        description: "Dual-WAN Gigabit VPN routers for small business with advanced security.",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Cisco RV160 / RV260 Series",
        description: "Entry-level SMB routers with VPN, firewall, and VLAN support.",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Cisco RV Series Wi-Fi",
        description: "Wireless variants of the RV series with integrated 802.11ac/ax radios.",
      },
    ],
  },
};

// =============================================================
// 1. Login Addresses
// =============================================================

const loginAddresses = [
  {
    address: "192.168.1.1",
    usage: "Cisco RV-series (all models)",
    notes: "Default gateway for RV160, RV260, RV340, RV345. Use https:// prefix.",
  },
  {
    address: "192.168.0.1",
    usage: "Older Cisco home / Cisco-Linksys",
    notes: "Used on legacy consumer-grade Cisco and Cisco-branded Linksys models pre-2013.",
  },
  {
    address: "10.0.0.1",
    usage: "Some ISP-deployed Cisco units",
    notes: "Used by some ISPs who deploy Cisco routers with custom firmware and subnets.",
  },
];

// =============================================================
// 2. Cisco Router Models Table
// =============================================================

const ciscoModels = [
  {
    model: "Cisco RV160",
    type: "SMB Router",
    ports: "5x GbE, 1x WAN",
    highlight: "VPN (16 tunnels), Firewall, VLAN, basic SMB",
  },
  {
    model: "Cisco RV160W",
    type: "SMB Wi-Fi Router",
    ports: "5x GbE + 802.11ac",
    highlight: "Wi-Fi 5 integrated, VPN, Firewall, dual-band",
  },
  {
    model: "Cisco RV260",
    type: "SMB Router",
    ports: "8x GbE LAN, 1x WAN",
    highlight: "50 VPN tunnels, AnyConnect SSL VPN, advanced ACL",
  },
  {
    model: "Cisco RV260W",
    type: "SMB Wi-Fi Router",
    ports: "8x GbE + 802.11ac",
    highlight: "Integrated AC1200 Wi-Fi, 50 VPN tunnels, WPA3",
  },
  {
    model: "Cisco RV340",
    type: "Dual-WAN SMB Router",
    ports: "4x GbE LAN, 2x WAN",
    highlight: "Dual-WAN failover, 100 VPN tunnels, IPS/IDS",
  },
  {
    model: "Cisco RV340W",
    type: "Dual-WAN Wi-Fi Router",
    ports: "4x GbE LAN, 2x WAN + Wi-Fi",
    highlight: "Dual-WAN + 802.11ac Wi-Fi, enterprise-grade VPN",
  },
  {
    model: "Cisco RV345P",
    type: "PoE SMB Router",
    ports: "16x GbE (8x PoE), 2x WAN",
    highlight: "PoE+ budget, 100 IPsec tunnels, ideal for IP cameras",
  },
];

// =============================================================
// 3. LED Meanings
// =============================================================

const ledStatuses = [
  {
    name: "Power LED",
    status: "Solid Green",
    meaning: "Router is powered on and operating normally.",
  },
  {
    name: "Power LED",
    status: "Blinking Amber",
    meaning: "Firmware upgrade in progress. Do not disconnect power.",
  },
  {
    name: "WAN LED",
    status: "Solid Green",
    meaning: "WAN port has a physical link and active internet connection.",
  },
  {
    name: "WAN LED",
    status: "Blinking Green",
    meaning: "WAN data traffic is actively flowing through the port.",
  },
  {
    name: "LAN LED",
    status: "Off",
    meaning: "No device connected to that LAN port or cable unplugged.",
  },
  {
    name: "VPN LED",
    status: "Solid Green",
    meaning: "At least one active VPN tunnel is established and operational.",
  },
  {
    name: "USB LED",
    status: "Solid Green",
    meaning: "USB storage or 3G/4G modem is connected and recognized.",
  },
];

// =============================================================
// 4. Cisco vs ASUS vs Netgear Comparison
// =============================================================

const comparisonRows = [
  {
    feature: "Primary Market",
    cisco: "SMB / Small Business",
    asus: "Consumer / Gaming",
    netgear: "Consumer / Prosumer",
  },
  {
    feature: "Default Login IP",
    cisco: "192.168.1.1 (https://)",
    asus: "192.168.1.1 / router.asus.com",
    netgear: "192.168.1.1 / routerlogin.net",
  },
  {
    feature: "Default Username",
    cisco: "cisco",
    asus: "admin",
    netgear: "admin",
  },
  {
    feature: "VPN Support",
    cisco: "IPsec + SSL VPN (AnyConnect)",
    asus: "PPTP, OpenVPN, IPsec, WireGuard",
    netgear: "PPTP, OpenVPN (Nighthawk only)",
  },
  {
    feature: "Dual-WAN",
    cisco: "Yes (RV340/RV345 series)",
    asus: "Yes (RT-AX88U Pro, limited)",
    netgear: "No (consumer line)",
  },
  {
    feature: "VLAN Support",
    cisco: "Advanced (802.1Q VLAN tagging)",
    asus: "Basic (guest network VLAN)",
    netgear: "Basic (guest network VLAN)",
  },
];

// =============================================================
// Page Component
// =============================================================

export default function CiscoRouterHubPage() {
  return (
    <>
      <JsonLd data={collectionPageSchema} />

      <TroubleshootingArticleShell
        h1="Cisco Router Login, Password, Setup & Troubleshooting Guide"
        intro="Cisco is one of the world's most recognized networking brands, offering both enterprise-grade infrastructure and small business (SMB) routers under its RV-series product line. Cisco RV-series routers — including the RV160, RV260, RV340, and RV345 — are designed for small offices needing advanced features like dual-WAN failover, IPsec VPN tunnels, AnyConnect SSL VPN, VLAN segmentation, and enterprise-level firewall rules. This guide covers Cisco router login at 192.168.1.1, default admin credentials, SSL certificate warnings, firmware updates, VPN configuration basics, and factory reset procedures for all major RV-series models."
        category="wifi"
        breadcrumbs={breadcrumbs}
        faqs={faqs}
        troubleshootingSteps={troubleshootingSteps}
        warningBanner={{
          title: "HTTPS Warning: Cisco RV Admin Panel Uses Self-Signed Certificate",
          text: "When you navigate to https://192.168.1.1 on a Cisco RV router, your browser will display a 'Your connection is not private' warning. This is expected — Cisco uses a self-signed certificate. Click 'Advanced' then 'Proceed' to access the admin panel. Do not use http:// — it will not load on newer RV firmware.",
        }}
        quickFixChecklist={quickFixChecklist}
        commonCauses={commonCauses}
        whenToContactISP="If your Cisco router's WAN shows a valid IP address but internet access is blocked, the issue may be ISP-side. Common causes include MAC address filtering (clone the MAC of the previously registered device), bandwidth throttling, or a misconfigured DHCP lease. Contact your ISP to confirm your account is active and the WAN MAC is registered."
        severityLevel="medium"
      >
        <div className="space-y-12">
          {/* FEATURED SNIPPET */}
          <section
            className="glass-card p-6 border border-cyan-950/20 bg-cyan-950/5 rounded-2xl relative overflow-hidden space-y-4"
            aria-label="How to Login to a Cisco Router"
          >
            <div className="absolute top-0 right-0 bg-cyan-500/10 text-cyan-400 text-[10px] font-mono uppercase tracking-wider px-3 py-1 rounded-bl-lg font-bold">
              Featured Snippet
            </div>
            <h2 className="text-sm font-bold text-cyan-400 uppercase tracking-wide flex items-center gap-1.5">
              <Zap size={16} /> How to Login to a Cisco RV Router
            </h2>
            <div className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
              <p className="mb-3">
                Follow these exact steps to access your Cisco RV-series router admin panel:
              </p>
              <ol className="list-decimal pl-5 space-y-2 text-xs text-[var(--text-secondary)] font-medium">
                <li>
                  <strong>Connect via Ethernet:</strong> Plug an Ethernet cable from a LAN port on the Cisco router to your PC. Avoid Wi-Fi for first-time setup.
                </li>
                <li>
                  <strong>Use HTTPS:</strong> Open your browser and navigate to{" "}
                  <Link href="/ips/192-168-1-1" className="text-cyan-400 hover:underline font-mono">
                    https://192.168.1.1
                  </Link>{" "}
                  (note the <strong>https://</strong> prefix).
                </li>
                <li>
                  <strong>Accept the certificate warning:</strong> Click <em>Advanced</em> then <em>Proceed to 192.168.1.1</em> to bypass the self-signed certificate warning.
                </li>
                <li>
                  <strong>Enter default credentials:</strong> Username: <code>cisco</code> — Password: <code>cisco</code>. You will be prompted to change the password immediately.
                </li>
                <li>
                  <strong>Run Quick Setup:</strong> Follow the setup wizard to configure your WAN connection type, Wi-Fi SSID (if applicable), and timezone.
                </li>
              </ol>
            </div>
          </section>

          {/* 1. LOGIN ADDRESSES TABLE */}
          <section className="space-y-4" id="login-addresses" aria-label="Cisco Login Addresses">
            <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
              <Globe size={18} className="text-cyan-400" />
              1. Cisco Router Login Addresses
            </h2>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Cisco routers use different default gateway IPs depending on model generation and ISP configuration. Always use <strong>https://</strong> for RV-series routers.
            </p>
            <div className="overflow-x-auto rounded-xl border border-white/5">
              <table className="w-full text-xs text-[var(--text-secondary)]">
                <thead>
                  <tr className="bg-cyan-500/10 text-cyan-300 text-left">
                    <th className="px-4 py-3 font-semibold">Address / Gateway</th>
                    <th className="px-4 py-3 font-semibold">Usage</th>
                    <th className="px-4 py-3 font-semibold">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {loginAddresses.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white/[0.02]" : "bg-white/[0.04]"}>
                      <td className="px-4 py-3 font-mono text-cyan-300 font-semibold">
                        {row.address === "192.168.1.1" ? (
                          <Link href="/ips/192-168-1-1" className="hover:underline">192.168.1.1</Link>
                        ) : row.address === "192.168.0.1" ? (
                          <Link href="/ips/192-168-0-1" className="hover:underline">192.168.0.1</Link>
                        ) : row.address}
                      </td>
                      <td className="px-4 py-3">{row.usage}</td>
                      <td className="px-4 py-3 text-[var(--text-tertiary)]">{row.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 2. MODELS TABLE */}
          <section className="space-y-4" id="models-lookup" aria-label="Cisco Models">
            <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
              <Layers size={18} className="text-cyan-400" />
              2. Cisco RV-Series Router Models
            </h2>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              The Cisco RV-series covers entry-level to advanced SMB routers. Find your model below to identify its capabilities and port configuration.
            </p>
            <div className="overflow-x-auto rounded-xl border border-white/5">
              <table className="w-full text-xs text-[var(--text-secondary)]">
                <thead>
                  <tr className="bg-cyan-500/10 text-cyan-300 text-left">
                    <th className="px-4 py-3 font-semibold">Model</th>
                    <th className="px-4 py-3 font-semibold">Type</th>
                    <th className="px-4 py-3 font-semibold">Ports</th>
                    <th className="px-4 py-3 font-semibold">Key Features</th>
                  </tr>
                </thead>
                <tbody>
                  {ciscoModels.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white/[0.02]" : "bg-white/[0.04]"}>
                      <td className="px-4 py-3 font-semibold text-cyan-300">{row.model}</td>
                      <td className="px-4 py-3">{row.type}</td>
                      <td className="px-4 py-3 font-mono text-xs">{row.ports}</td>
                      <td className="px-4 py-3 text-[var(--text-tertiary)]">{row.highlight}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 3. LED STATUS TABLE */}
          <section className="space-y-4" id="led-meanings" aria-label="Cisco LED Meanings">
            <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
              <Sliders size={18} className="text-cyan-400" />
              3. Cisco Router LED Status Meanings
            </h2>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Cisco RV-series routers use a consistent LED indicator system. Use the table below to diagnose your router's operational state.
            </p>
            <div className="overflow-x-auto rounded-xl border border-white/5">
              <table className="w-full text-xs text-[var(--text-secondary)]">
                <thead>
                  <tr className="bg-cyan-500/10 text-cyan-300 text-left">
                    <th className="px-4 py-3 font-semibold">LED Indicator</th>
                    <th className="px-4 py-3 font-semibold">Light State</th>
                    <th className="px-4 py-3 font-semibold">Meaning & Action</th>
                  </tr>
                </thead>
                <tbody>
                  {ledStatuses.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white/[0.02]" : "bg-white/[0.04]"}>
                      <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">{row.name}</td>
                      <td className="px-4 py-3 font-mono text-cyan-300 font-semibold">{row.status}</td>
                      <td className="px-4 py-3 text-[var(--text-tertiary)]">{row.meaning}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 4. COMPARISON TABLE */}
          <section className="space-y-4" id="comparison" aria-label="Cisco vs ASUS vs Netgear">
            <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
              <Cpu size={18} className="text-cyan-400" />
              4. Router Comparison: Cisco vs. ASUS vs. Netgear
            </h2>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Cisco, ASUS, and Netgear all offer high-performance routers but target different user profiles. Compare their capabilities below.
            </p>
            <div className="overflow-x-auto rounded-xl border border-white/5">
              <table className="w-full text-xs text-[var(--text-secondary)]">
                <thead>
                  <tr className="bg-cyan-500/10 text-cyan-300 text-left">
                    <th className="px-4 py-3 font-semibold">Feature</th>
                    <th className="px-4 py-3 font-semibold">Cisco</th>
                    <th className="px-4 py-3 font-semibold">ASUS</th>
                    <th className="px-4 py-3 font-semibold">Netgear</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white/[0.02]" : "bg-white/[0.04]"}>
                      <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">{row.feature}</td>
                      <td className="px-4 py-3 text-cyan-300">{row.cisco}</td>
                      <td className="px-4 py-3">{row.asus}</td>
                      <td className="px-4 py-3 text-[var(--text-tertiary)]">{row.netgear}</td>
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
