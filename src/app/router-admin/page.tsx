import type { Metadata } from "next";
import Link from "next/link";
import { Link2, Info, Shield, AlertTriangle, Settings, Zap, Wifi, Server } from "lucide-react";
import TroubleshootingArticleShell from "@/components/tools/TroubleshootingArticleShell";
import { buildMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/lib/seo/schema";
import { APP_URL } from "@/lib/constants";

// ---- SEO Metadata ----
export const metadata: Metadata = buildMetadata({
  title: "Router Admin Panel: Complete Guide to Login, Security & Settings",
  description:
    "Master your router admin control panel. Comprehensive guide covering admin URLs, brand-specific dashboards, security hardening, advanced features, troubleshooting, and FAQs for all major router brands.",
  canonical: "/router-admin",
  keywords: [
    "router admin",
    "router control panel",
    "router login page",
    "router admin panel",
    "router settings portal",
    "router admin security",
    "router admin URL",
    "192.168.1.1 admin",
    "router dashboard guide",
  ],
});

export default async function RouterAdminPage() {
  const breadcrumbs = [
    { name: "Router Admin", url: "/router-admin" }
  ];

  // ---- Structured Data (JSON-LD) ----
  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${APP_URL}/router-admin#webpage`,
    "url": `${APP_URL}/router-admin`,
    "name": "Router Admin Panel: Complete Guide to Login, Security & Settings",
    "description": "Master your router admin control panel. Comprehensive guide covering admin URLs, brand-specific dashboards, security hardening, advanced features, troubleshooting, and FAQs for all major router brands.",
    "about": {
      "@type": "Thing",
      "name": "Router Administration Panels",
    },
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${APP_URL}/router-admin#itemlist`,
    "name": "Popular Admin Guides",
    "numberOfItems": 8,
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@type": "WebPage",
          "name": "Router Brands Directory",
          "url": `${APP_URL}/routers`,
        },
      },
      {
        "@type": "ListItem",
        "position": 2,
        "item": {
          "@type": "WebPage",
          "name": "IP Address Directory",
          "url": `${APP_URL}/ips`,
        },
      },
      {
        "@type": "ListItem",
        "position": 3,
        "item": {
          "@type": "WebPage",
          "name": "Router Login Guide",
          "url": `${APP_URL}/router-login`,
        },
      },
      {
        "@type": "ListItem",
        "position": 4,
        "item": {
          "@type": "WebPage",
          "name": "Default Router Passwords Guide",
          "url": `${APP_URL}/router-password`,
        },
      },
      {
        "@type": "ListItem",
        "position": 5,
        "item": {
          "@type": "WebPage",
          "name": "Router Reset Guide",
          "url": `${APP_URL}/router-reset`,
        },
      },
      {
        "@type": "ListItem",
        "position": 6,
        "item": {
          "@type": "WebPage",
          "name": "Router Settings Guide",
          "url": `${APP_URL}/router-settings`,
        },
      },
      {
        "@type": "ListItem",
        "position": 7,
        "item": {
          "@type": "WebPage",
          "name": "Port Forwarding Guide",
          "url": `${APP_URL}/port-forwarding`,
        },
      },
      {
        "@type": "ListItem",
        "position": 8,
        "item": {
          "@type": "WebPage",
          "name": "Change Wi-Fi Password",
          "url": `${APP_URL}/change-wifi-password`,
        },
      },
    ],
  };

  // ---- HowTo Schema ----
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "@id": `${APP_URL}/router-admin#howto`,
    "name": "How to Access and Secure Your Router Admin Panel",
    "description": "Step-by-step guide to accessing your router's admin panel, changing default credentials, and hardening security settings.",
    "totalTime": "PT15M",
    "estimatedCost": {
      "@type": "MonetaryAmount",
      "currency": "USD",
      "value": "0",
    },
    "tool": [
      { "@type": "HowToTool", "name": "Web browser (Chrome, Firefox, Edge)" },
      { "@type": "HowToTool", "name": "Ethernet cable (recommended)" },
    ],
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Connect to your router",
        "text": "Connect your computer or phone to the router via Wi-Fi or Ethernet cable. Disconnect any active VPN clients.",
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Find your default gateway IP",
        "text": "Run ipconfig (Windows) or netstat -nr (macOS/Linux) to identify your Default Gateway IP address.",
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Open the admin panel",
        "text": "Type the gateway IP (e.g. 192.168.1.1) or hostname (e.g. tplinkwifi.net) into your browser's address bar and press Enter.",
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Enter admin credentials",
        "text": "Submit the default username and password printed on your router's label. Common defaults: admin/admin, admin/password.",
      },
      {
        "@type": "HowToStep",
        "position": 5,
        "name": "Change the default password",
        "text": "Navigate to Administration > Password or System Tools > Password and set a strong unique admin password immediately.",
      },
      {
        "@type": "HowToStep",
        "position": 6,
        "name": "Update firmware",
        "text": "Go to System Tools > Firmware Update or Administration > Router Update and install any available firmware patches.",
      },
      {
        "@type": "HowToStep",
        "position": 7,
        "name": "Disable remote management",
        "text": "Locate Remote Management or WAN Administration and set it to Disabled. This prevents external access to the admin panel.",
      },
      {
        "@type": "HowToStep",
        "position": 8,
        "name": "Save a configuration backup",
        "text": "Under System Tools > Backup & Restore, click Backup to export your configuration file (.bin/.cfg) and store it safely.",
      },
    ],
  };

  const faqs = [
    {
      question: "What is the router admin page?",
      answer: "The router admin page (or administration panel) is a localized web-based interface built into the router's firmware. It allows users to manage and customize all local networking, Wi-Fi settings, security configurations, and routing behaviors.",
    },
    {
      question: "How do I access the router admin panel?",
      answer: "Connect to your router via Wi-Fi or Ethernet. Open a browser and type your router's default gateway IP address (such as 192.168.1.1 or 192.168.0.1) in the URL address bar. Press Enter and enter your administrator credentials.",
    },
    {
      question: "What settings can I change in the admin panel?",
      answer: "You can modify your Wi-Fi network name (SSID), security password, routing protocols, DHCP configurations, parental controls, firewalls, port forwarding rules, and update firmware.",
    },
    {
      question: "Why does my browser block access to the admin page?",
      answer: "Modern browsers enforce secure HTTPS connections. Because routers use local self-signed SSL certificates that are not validated by global certificate authorities, browsers display security warnings. Click 'Advanced' and 'Proceed (unsafe)' to bypass.",
    },
    {
      question: "What is remote router administration?",
      answer: "Remote administration allows management console access from outside the local network via the public WAN interface. For network security, always keep remote management disabled to block potential external hacking attacks.",
    },
    {
      question: "What is a subnet mask?",
      answer: "A subnet mask (like 255.255.255.0) defines the size of the local IP address range. It tells devices which parts of their IP addresses belong to the local network segment and which identify the host client.",
    },
    {
      question: "How do I update router firmware?",
      answer: "Log into the admin panel, navigate to System Tools, Maintenance, or Firmware Update. If your router supports online updates, click 'Check for Updates'. Otherwise, download the firmware file from the manufacturer's website and upload it manually.",
    },
    {
      question: "How do I set up port forwarding?",
      answer: "Inside the admin panel under Port Forwarding, NAT, or Virtual Server settings, add a new rule linking your game or application's specific port numbers to the static private IP address of your gaming console or computer.",
    },
    {
      question: "What is DHCP and should I keep it enabled?",
      answer: "DHCP (Dynamic Host Configuration Protocol) automatically leases local IP addresses to devices connecting to your network. You should keep DHCP enabled to prevent local IP conflicts and simplify networking configuration.",
    },
    {
      question: "How do I factory reset my router?",
      answer: "Navigate to System Tools > Factory Defaults or Restore in the admin panel and click Restore, or hold down the physical Reset button on the back of the router for 10-15 seconds using a paperclip.",
    },
    {
      question: "Can I access the router admin panel over IPv6?",
      answer: "Yes, on routers with IPv6 management enabled, you can access the admin panel via the router's link-local IPv6 address. On Windows, run 'ipconfig' and look for the Default Gateway under your active adapter — it may display as fe80::1 or similar. In your browser, type http://[fe80::1%25eth0] using the correct interface identifier. However, most consumer routers still default to IPv4 for admin access to maximize compatibility.",
    },
    {
      question: "Is there a Telnet fallback if the web UI is inaccessible?",
      answer: "Some routers (particularly older DD-WRT or OpenWrt-flashed units) offer a Telnet or SSH CLI fallback. You can connect via: telnet 192.168.1.1 (port 23) or ssh admin@192.168.1.1 (port 22). This lets you run busybox commands, edit /etc/config/ files, and restart services like httpd. However, Telnet transmits data in plaintext — always prefer SSH. If available, disable Telnet and use SSH only.",
    },
    {
      question: "Do routers support two-factor authentication (2FA)?",
      answer: "Most consumer routers do not natively support 2FA, but enterprise-grade routers (ASUS AiMesh Pro, Netgear Orbi Pro, Ubiquiti UniFi) support RADIUS-based or time-based OTP (TOTP) authentication. On standard ASUS routers running ASUSWRT 3.0.0.4.386+, you can enable 2FA via the ASUS Router app. For OpenWrt-based firmware, you can install the luci-app-openvpn package alongside Google Authenticator PAM module to enforce TOTP login.",
    },
    {
      question: "What is SNMP and how is it used for router management?",
      answer: "SNMP (Simple Network Management Protocol) is a protocol that allows centralized monitoring and management of network devices. Routers expose system metrics (uptime, interface throughput, CPU load) via SNMP MIBs (Management Information Bases). You can poll a router using: snmpwalk -v2c -c public 192.168.1.1 .1.3.6.1.2.1. Most consumer routers support SNMPv2c; enterprise routers support SNMPv3 with authentication and encryption. Always change the community string from 'public' to a private value.",
    },
    {
      question: "What file format does the router configuration backup use?",
      answer: "Router configuration backup formats vary by manufacturer. TP-Link exports .bin binary files (encrypted with a device-specific key). ASUS uses .CFG files (a compressed tarball of /jffs/nvram). Netgear produces .cfg files. D-Link exports .bin or .cfg files. OpenWrt and DD-WRT export as .tar.gz archives containing UCI configuration files from /etc/config/. These files contain sensitive data including Wi-Fi passwords and admin credentials — store them encrypted.",
    },
  ];

  const troubleshootingSteps = [
    {
      title: "Confirm Local LAN Connection",
      description: "Ensure your computer or mobile device is connected directly to your router via Wi-Fi or a physical Ethernet cord.",
      tip: "Local subnets cannot be reached over standard mobile data networks.",
    },
    {
      title: "Input Default Gateway IP",
      description: "Type your router's default gateway IP address (such as 192.168.1.1) directly into the URL bar of your browser.",
    },
    {
      title: "Input Admin Login Credentials",
      description: "Enter the administrative username and password listed on the router's bottom label (typically admin/admin or admin/password).",
      tip: "If default credentials fail, you must perform a hardware reset to restore factory default login details.",
    },
    {
      title: "Modify and Save Settings",
      description: "Navigate through the setting menus to modify your configurations, and click 'Save' or 'Apply' on each section to commit changes to NVRAM.",
    },
  ];

  const quickFixChecklist = [
    "Identify your router's default access IP printed on the label",
    "Change the default admin login credentials immediately after first login",
    "Update your Wi-Fi SSID and set a complex WPA3 security key",
    "Deactivate WPS PIN features to secure your spectrum",
    "Keep WAN remote management settings disabled",
    "Disable UPnP to prevent unauthorized port mapping by applications",
    "Enable SPI firewall and configure DNS-over-HTTPS for upstream queries",
    "Download and save a backup configuration file locally after changes",
  ];

  return (
    <>
      <JsonLd data={collectionPageSchema} />
      <JsonLd data={itemListSchema} />
      <JsonLd data={howToSchema} />

      <TroubleshootingArticleShell
        h1="Router Admin Control Panel: Complete Guide"
        intro="The definitive guide to your router's admin control panel — covering how the web server works inside firmware, every common admin URL, brand-specific dashboards, security hardening, advanced features, and expert troubleshooting for all major router brands."
        category="wifi"
        breadcrumbs={breadcrumbs}
        faqs={faqs}
        troubleshootingSteps={troubleshootingSteps}
        quickFixChecklist={quickFixChecklist}
        severityLevel="low"
      >

        {/* Section 1: Admin Panel Overview */}
        <div className="mb-10 prose-dark">
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3 flex items-center gap-2">
            <Server size={18} className="text-[var(--brand-400)]" />
            What Is the Router Admin Panel?
          </h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-3">
            The router admin panel is a browser-accessible control interface embedded directly into your router&apos;s firmware. It is not a cloud service — it runs as a lightweight HTTP daemon (web server process) on the router&apos;s own CPU, served over your local area network on port 80 (HTTP) or port 443 (HTTPS). When you type <code className="text-[var(--brand-400)] font-mono bg-[var(--bg-elevated)] px-1 rounded">192.168.1.1</code> into your browser, you are making a TCP connection to this internal daemon, which responds with HTML, CSS, and JavaScript files stored in the router&apos;s flash memory.
          </p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-3">
            Different firmware platforms use different embedded web server implementations. TP-Link&apos;s stock firmware uses a custom C-based httpd daemon. ASUS routers (running ASUSWRT) use a modified version of <strong>mini_httpd</strong> alongside a Node.js-like event loop for its AJAX-driven UI. OpenWrt-based routers use <strong>uhttpd</strong> — a lightweight server optimised for embedded Linux. Older routers often ran <strong>BusyBox httpd</strong> — a minimal HTTP server occupying under 40KB of flash. Enterprise Cisco/Meraki units use a more capable <strong>lighttpd</strong> instance with TLS 1.3 support.
          </p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
            The admin panel communicates with the router&apos;s operating system through direct reads/writes to NVRAM (non-volatile RAM, storing persistent configuration values), UCI (Unified Configuration Interface on OpenWrt), or proprietary binary APIs. Changes you submit through the panel are written to NVRAM and applied by kernel-level modules — for example, changing the Wi-Fi channel triggers the wireless driver (<code className="font-mono text-xs bg-[var(--bg-elevated)] px-1 rounded">ath9k</code> or <code className="font-mono text-xs bg-[var(--bg-elevated)] px-1 rounded">mt76</code>) to reconfigure the radio hardware in real time.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
            {[
              { label: "Wi-Fi Management", desc: "SSID, channel, WPA3 security", icon: "📡" },
              { label: "DHCP & IP Allocation", desc: "Static leases, address pools", icon: "🔗" },
              { label: "Firewall & NAT", desc: "Port forwarding, SPI rules", icon: "🛡️" },
              { label: "Firmware & Backup", desc: "OTA updates, config export", icon: "💾" },
            ].map((item) => (
              <div key={item.label} className="glass-card p-4 rounded-xl border border-[var(--border-subtle)] text-center">
                <div className="text-2xl mb-2">{item.icon}</div>
                <p className="text-xs font-bold text-[var(--text-primary)] mb-1">{item.label}</p>
                <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Common Admin URLs Table */}
        <div className="mb-10 p-6 glass-card border border-[var(--border-subtle)] rounded-2xl">
          <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
            <Info size={18} className="text-[var(--brand-400)]" />
            Complete Router Admin URL Reference Table
          </h2>
          <p className="text-sm text-[var(--text-secondary)] mb-4 leading-relaxed">
            Every router ships with a preset default gateway IP and sometimes a hostname alias. The table below maps every common admin URL to its associated brands and notes. Always type these into your browser&apos;s <strong>address bar</strong>, not the search bar.
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-sm">
              <thead>
                <tr className="text-[var(--text-primary)] font-semibold text-left text-xs uppercase tracking-wider">
                  <th className="pb-3 pr-4">Admin URL / IP</th>
                  <th className="pb-3 px-4">Primary Brands</th>
                  <th className="pb-3 px-4">Default Port</th>
                  <th className="pb-3 pl-4">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)] text-[var(--text-secondary)]">
                {[
                  { url: "192.168.1.1", brands: "ASUS, Netgear, Linksys, Cisco, Belkin", port: "80 / 443", notes: "Most common home gateway IP" },
                  { url: "192.168.0.1", brands: "TP-Link, D-Link, Tenda, ZTE", port: "80 / 443", notes: "Second most common; Class C default" },
                  { url: "192.168.2.1", brands: "Belkin (legacy), 2Wire AT&T", port: "80", notes: "Less common; seen on older ISP units" },
                  { url: "10.0.0.1", brands: "Comcast Xfinity, Apple AirPort", port: "80 / 443", notes: "Class A private range; ISP gateways" },
                  { url: "10.0.0.138", brands: "Xfinity XB7/XB8 gateways", port: "443", notes: "Comcast advanced gateway management IP" },
                  { url: "192.168.100.1", brands: "Cox, Charter Spectrum, Motorola", port: "80", notes: "Common on ISP-provisioned cable modems" },
                  { url: "192.168.8.1", brands: "Huawei (4G/5G routers, HiLink)", port: "80 / 443", notes: "Huawei mobile router default" },
                  { url: "tplinkwifi.net", brands: "TP-Link (all current models)", port: "80", notes: "Resolves via local DNS to 192.168.0.1" },
                  { url: "router.asus.com", brands: "ASUS (all ASUSWRT models)", port: "80 / 443", notes: "Local hostname; resolves to 192.168.1.1" },
                  { url: "routerlogin.net", brands: "Netgear (Nighthawk, Orbi)", port: "80 / 443", notes: "Netgear universal login hostname" },
                ].map((row) => (
                  <tr key={row.url}>
                    <td className="py-2.5 pr-4 font-mono text-xs text-[var(--brand-400)] font-bold">{row.url}</td>
                    <td className="py-2.5 px-4 text-xs">{row.brands}</td>
                    <td className="py-2.5 px-4 font-mono text-xs text-[var(--text-muted)]">{row.port}</td>
                    <td className="py-2.5 pl-4 text-xs text-[var(--text-muted)]">{row.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-[var(--text-muted)] mt-4 leading-relaxed">
            To confirm your exact gateway on Windows, run <code className="font-mono bg-[var(--bg-elevated)] px-1 rounded">ipconfig</code> and look for <strong>Default Gateway</strong>. On macOS/Linux run <code className="font-mono bg-[var(--bg-elevated)] px-1 rounded">ip route show default</code> or <code className="font-mono bg-[var(--bg-elevated)] px-1 rounded">netstat -nr | grep default</code>.
          </p>
        </div>

        {/* Section 3: Brand-Specific Dashboards */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
            <Wifi size={18} className="text-[var(--brand-400)]" />
            Brand-Specific Admin Dashboards: Deep Dive
          </h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-5">
            Each router manufacturer has built a distinct admin UI with different menu structures, terminology, and feature sets. Understanding the layout of your specific brand&apos;s dashboard saves significant troubleshooting time.
          </p>
          <div className="space-y-5">
            {[
              {
                brand: "TP-Link (Archer / Deco Series)",
                url: "tplinkwifi.net or 192.168.0.1",
                color: "text-green-400 border-green-800/30 bg-green-900/5",
                features: [
                  "Unified sidebar navigation with Basic / Advanced toggle for different user levels",
                  "Quick Setup wizard for new router deployments with ISP auto-detection",
                  "Parental Controls with time scheduling and content filtering per device MAC",
                  "TP-Link HomeCare (powered by Trend Micro) — built-in antivirus, QoS, and parental filtering",
                  "OneMesh expansion: add TP-Link range extenders as seamless roaming nodes",
                  "IPv6 setup under Advanced > IPv6 with DS-Lite, 6in4, and native DHCPv6 support",
                ],
                note: "TP-Link Archer AX series routers offer a dedicated mobile app (TP-Link Tether) that mirrors most admin panel functions and adds real-time device monitoring with push alerts.",
              },
              {
                brand: "ASUS (ASUSWRT / ZenWiFi)",
                url: "router.asus.com or 192.168.1.1",
                color: "text-blue-400 border-blue-800/30 bg-blue-900/5",
                features: [
                  "Dashboard overview showing real-time network map of all connected clients",
                  "Traffic Analyzer with per-device bandwidth usage graphs up to 30 days",
                  "AiProtection (Trend Micro): malicious site blocking, two-way IPS, infected device quarantine",
                  "Built-in VPN server with OpenVPN + WireGuard support on AX/BE series",
                  "Adaptive QoS with automatic traffic prioritization by type: gaming, streaming, VoIP",
                  "AiMesh for whole-home mesh: add ASUS routers as wired or wireless backhaul nodes",
                  "ASUSWRT-Merlin custom firmware compatibility for power users needing advanced scripting",
                ],
                note: "ASUS routers running firmware 3.0.0.4.388+ support WireGuard VPN natively. Access it under VPN > VPN Server > WireGuard to generate peer configs for phones and laptops.",
              },
              {
                brand: "Netgear (Genie / RAX Nighthawk)",
                url: "routerlogin.net or 192.168.1.1",
                color: "text-purple-400 border-purple-800/30 bg-purple-900/5",
                features: [
                  "Netgear Genie: simple tile-based dashboard suitable for beginners",
                  "Advanced tab exposes full WAN, LAN, QoS, and security settings",
                  "ReadyDLNA media server built-in for USB-attached storage streaming to TVs",
                  "Netgear Armor (Bitdefender) subscription-based threat detection and device vulnerability scanning",
                  "Dynamic QoS with automatic upstream/downstream bandwidth measurement via Ookla",
                  "Nighthawk app for remote management with push notifications for new device connections",
                ],
                note: "Netgear Advanced > Administration > Backup Settings exports a .cfg file that restores all configurations including port forwarding, DHCP reservations, and parental controls.",
              },
              {
                brand: "D-Link (DIR Series)",
                url: "192.168.0.1 or dlinkrouter.local",
                color: "text-cyan-400 border-cyan-800/30 bg-cyan-900/5",
                features: [
                  "Tabbed layout: Home / Internet / Wireless / Firewall / Management",
                  "SharePort for USB storage sharing and printer sharing across the network",
                  "mydlink cloud integration for remote access without exposing admin port to WAN",
                  "Guest Zone configuration with per-guest bandwidth limiting and session duration",
                  "Advanced Firewall with custom ingress/egress rules, IP filtering, and MAC blocking",
                ],
                note: "D-Link DIR-X series routers support the mydlink app, which allows remote monitoring and basic control even without enabling remote management on the WAN interface.",
              },
              {
                brand: "Linksys (Smart Wi-Fi / Velop)",
                url: "192.168.1.1 or linksyssmartwifi.com",
                color: "text-orange-400 border-orange-800/30 bg-orange-900/5",
                features: [
                  "Linksys Smart Wi-Fi cloud portal: access admin panel remotely via linksyssmartwifi.com",
                  "Device prioritization: drag-and-drop bandwidth priority assignment per device",
                  "Parental Controls powered by Family Shield with category-based content filtering",
                  "Port Range Forwarding and Port Range Triggering under Security > Apps and Gaming",
                  "Velop mesh node status: satellite connection type and backhaul bandwidth visible in dashboard",
                ],
                note: "Linksys Velop nodes use 192.168.1.1 for the primary node. Secondary node IPs appear in the Network Map section — each node has its own management interface accessible from the primary dashboard.",
              },
              {
                brand: "Huawei (HiLink / 4G/5G Routers)",
                url: "192.168.8.1 or hilink.huawei.com",
                color: "text-red-400 border-red-800/30 bg-red-900/5",
                features: [
                  "HiLink app-first design: full admin access via mobile app with no browser required",
                  "Signal strength bars showing cellular connection quality (4G LTE / 5G SA/NSA)",
                  "SMS management for SIM-based routers — read, compose, and delete SMS from dashboard",
                  "Monthly data usage tracking with configurable quota alerts via SMS or notification",
                  "Dual-band or tri-band Wi-Fi management with automatic band steering",
                  "Bridge mode for connecting HiLink devices behind a primary wired router",
                ],
                note: "Huawei B715 and B818 enterprise 4G routers use 192.168.8.1 by default. The admin username is 'admin' and the default password is printed on the device label sticker.",
              },
            ].map((brand) => (
              <div key={brand.brand} className={`glass-card border rounded-xl p-5 ${brand.color}`}>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <h3 className="font-bold text-[var(--text-primary)] text-sm">{brand.brand}</h3>
                  <code className="font-mono text-xs bg-[var(--bg-elevated)] border border-[var(--border-subtle)] px-2 py-0.5 rounded text-[var(--brand-400)]">
                    {brand.url}
                  </code>
                </div>
                <ul className="space-y-1.5 mb-3">
                  {brand.features.map((f) => (
                    <li key={f} className="text-xs text-[var(--text-secondary)] leading-relaxed flex gap-2">
                      <span className="text-[var(--brand-400)] flex-shrink-0 mt-0.5">→</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="text-[11px] text-[var(--text-muted)] bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-lg p-2.5 leading-relaxed">
                  <strong>Expert Note:</strong> {brand.note}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Security Hardening Guide */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
            <Shield size={18} className="text-[var(--brand-400)]" />
            Router Admin Security Hardening: 10-Step Checklist
          </h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-5">
            A factory-default router is an open door for attackers. Every step below addresses a specific attack vector that threat actors routinely exploit on home and small-business networks. Apply all 10 steps immediately after accessing your admin panel for the first time. Steps marked <span className="text-red-400 font-semibold">Critical</span> should be completed within the first 5 minutes of ownership.
          </p>
          <div className="space-y-4">
            {[
              {
                step: 1,
                title: "Change the Default Admin Password",
                detail: "Navigate to Administration > Password (TP-Link), System > Administration (ASUS), or Advanced > Administration (Netgear). Set a minimum 12-character password with mixed case, numbers, and symbols. Avoid dictionary words. Default credentials like admin/admin are exploited by automated scanners within minutes of a router going online — bots use credential lists from leaked databases.",
                severity: "critical",
              },
              {
                step: 2,
                title: "Disable Remote (WAN) Management",
                detail: "Locate Remote Management or Remote Access under Advanced WAN settings. Set it to Disabled. If remote access is genuinely required, use a VPN server instead. Port 80/443 exposed on your WAN IP is discoverable via Shodan.io and routinely targeted by automated exploit scanners running 24/7.",
                severity: "critical",
              },
              {
                step: 3,
                title: "Enable SPI Firewall",
                detail: "SPI (Stateful Packet Inspection) firewall tracks connection states and drops unsolicited inbound packets that do not match existing outbound sessions. Enable it under Security > Firewall or Advanced > Firewall. Most routers have this enabled by default, but verify it has not been reset after a firmware update.",
                severity: "high",
              },
              {
                step: 4,
                title: "Disable UPnP",
                detail: "UPnP (Universal Plug and Play) allows applications on your LAN to automatically open ports without your knowledge or approval. Malware actively uses UPnP to punch holes in your firewall and establish command-and-control connections. Disable it under Advanced > UPnP or WAN > UPnP Settings. Configure specific ports manually via port forwarding rules instead.",
                severity: "high",
              },
              {
                step: 5,
                title: "Disable WPS (Wi-Fi Protected Setup)",
                detail: "WPS PIN method has a fundamental brute-force vulnerability (Pixie-Dust attack, CVE-2011-5053) that can expose your Wi-Fi passphrase in under 2 minutes using tools like Reaver or Bully from a nearby device. Disable WPS entirely under Wireless > WPS. Use WPA3-Personal with a strong passphrase for secure device onboarding instead.",
                severity: "high",
              },
              {
                step: 6,
                title: "Upgrade to WPA3-Personal Encryption",
                detail: "Under Wireless > Security, select WPA3-Personal (or WPA2/WPA3 Mixed Mode for compatibility with older devices). WPA3 uses SAE (Simultaneous Authentication of Equals) which prevents offline dictionary attacks entirely — even if an attacker captures the 4-way handshake. WPA2-TKIP is cryptographically broken and must never be used.",
                severity: "high",
              },
              {
                step: 7,
                title: "Install Latest Firmware",
                detail: "Router firmware patches fix actively exploited CVEs. Go to System Tools > Firmware Update and enable automatic updates if supported. Critical recent examples include CVE-2023-1389 (TP-Link Archer AX21 command injection), CVE-2022-33891 (Apache via TP-Link), and CVE-2021-20090 (Arcadyan buffer overflow affecting Buffalo, Telus, and O2 routers). Running unpatched firmware is the leading cause of router-based network compromise.",
                severity: "critical",
              },
              {
                step: 8,
                title: "Enable HTTPS-Only Admin Access",
                detail: "If your router supports HTTPS for the admin panel, disable plain HTTP access. On ASUS routers, navigate to Administration > System > HTTPS Web Access and select HTTPS only. This prevents admin credentials from being intercepted by a compromised device on your LAN performing a man-in-the-middle attack via ARP poisoning.",
                severity: "medium",
              },
              {
                step: 9,
                title: "Disable Telnet and Restrict SSH",
                detail: "Telnet (port 23) transmits all data in cleartext. On routers that expose Telnet for debugging purposes (many factory-default DD-WRT builds do), disable it immediately via Administration > Services > Telnet = Disabled. If SSH is needed, change its port from 22 to a non-standard high port (e.g., 2222) and restrict access to specific LAN IP addresses only.",
                severity: "medium",
              },
              {
                step: 10,
                title: "Configure DNS-over-HTTPS (DoH) Upstream",
                detail: "Standard DNS queries (UDP port 53) are unencrypted and visible to your ISP and any network observer. Configure your router's upstream DNS resolver to use DoH. Set Primary DNS to 1.1.1.1 and enable DoH if supported (some routers call it Encrypted DNS). Alternatively use NextDNS (https://dns.nextdns.io/xxxxxx) or Cloudflare (https://1.1.1.1/dns-query). On OpenWrt, install the https-dns-proxy package: opkg install https-dns-proxy.",
                severity: "medium",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-4 p-4 glass-card border border-[var(--border-subtle)] rounded-xl">
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                  item.severity === "critical" ? "bg-red-950/30 border border-red-800/40 text-red-400" :
                  item.severity === "high" ? "bg-amber-950/20 border border-amber-800/40 text-amber-400" :
                  "bg-blue-950/20 border border-blue-800/30 text-blue-400"
                }`}>
                  {item.step}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="text-sm font-bold text-[var(--text-primary)]">{item.title}</h3>
                    <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      item.severity === "critical" ? "bg-red-950/30 text-red-400 border border-red-800/30" :
                      item.severity === "high" ? "bg-amber-950/20 text-amber-400 border border-amber-800/30" :
                      "bg-blue-950/20 text-blue-400 border border-blue-800/30"
                    }`}>
                      {item.severity}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 5: Remote Administration Risks */}
        <div className="mb-10 p-5 border border-red-900/30 bg-red-950/10 rounded-2xl">
          <h2 className="text-lg font-bold text-[var(--text-primary)] mb-3 flex items-center gap-2">
            <AlertTriangle size={18} className="text-red-400" />
            Remote Administration: Security Risks &amp; Attack Vectors
          </h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
            Remote management (also called Remote Access, WAN Management, or Web-based Remote Setup) exposes your router&apos;s admin panel on your public WAN IP — meaning anyone on the internet can attempt to reach it. Here is a detailed breakdown of how attackers exploit this:
          </p>
          <div className="space-y-4">
            <div className="glass-card border border-[var(--border-subtle)] p-4 rounded-xl">
              <h3 className="text-sm font-bold text-red-400 mb-2">Attack Vector 1: Automated Port Scanning</h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Tools like Shodan.io, Masscan (capable of scanning the entire IPv4 internet in under 6 minutes), and ZMap continuously sweep port 80, 443, 8080, and 8443. If remote management is enabled, your router appears in Shodan results within 24 hours, filterable by firmware version and model number to target specific CVEs. To check if you are exposed, run <code className="font-mono bg-[var(--bg-elevated)] px-1 rounded text-[10px]">nmap -sV -p 80,443,8080 YOUR_WAN_IP</code> from a mobile hotspot or external server.
              </p>
            </div>
            <div className="glass-card border border-[var(--border-subtle)] p-4 rounded-xl">
              <h3 className="text-sm font-bold text-amber-400 mb-2">Attack Vector 2: Credential Brute Force</h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Once the admin panel is reachable on the WAN, bots submit thousands of username/password combinations per minute using tools like Hydra (<code className="font-mono text-[10px] bg-[var(--bg-elevated)] px-1 rounded">hydra -L users.txt -P pass.txt http-get://TARGET/admin</code>) or Medusa. Routers with default credentials (admin/admin, admin/password, admin/1234) are compromised in under 60 seconds. Many consumer routers implement zero rate limiting on login attempts, making automated attacks trivially fast.
              </p>
            </div>
            <div className="glass-card border border-[var(--border-subtle)] p-4 rounded-xl">
              <h3 className="text-sm font-bold text-purple-400 mb-2">Attack Vector 3: CVE Exploitation (Unauthenticated)</h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Many CVEs allow complete router compromise without any credentials. Key examples: <strong>CVE-2023-1389</strong> (TP-Link Archer AX21 — unauthenticated command injection via the locale API endpoint, actively weaponized by Mirai), <strong>CVE-2022-26376</strong> (ASUS — heap memory corruption in httpd leading to RCE), <strong>CVE-2021-40847</strong> (Netgear — stack buffer overflow in httpd binary). These vulnerabilities are integrated into botnet exploit kits within days of public CVE disclosure.
              </p>
            </div>
            <div className="glass-card border border-[var(--border-subtle)] p-4 rounded-xl">
              <h3 className="text-sm font-bold text-orange-400 mb-2">Real-World Example: Mirai Botnet &amp; Default Credentials</h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                The <strong>Mirai botnet</strong> (first detected August 2016) infected over 600,000 routers and IoT devices by scanning all 3.7 billion public IPv4 addresses for Telnet (port 23) and HTTP (port 80), then attempting login with a hardcoded dictionary of 62 default credential pairs including admin/admin, root/xc3511, and support/support. Compromised devices launched a 1.2 Tbps DDoS attack against Dyn DNS on October 21, 2016, taking offline Twitter, Reddit, Netflix, GitHub, and PayPal. Modern Mirai variants (Moobot, Fodcha, Gafgyt) combine credential stuffing with RCE exploits and as of 2024 account for over 30% of all IoT-sourced DDoS traffic.
              </p>
            </div>
          </div>
          <div className="mt-4 p-3 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-lg">
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              <strong className="text-[var(--text-primary)]">How to verify remote management is disabled:</strong> Log into your admin panel and navigate to Advanced &gt; Remote Management (TP-Link), WAN &gt; DDNS/Remote Access (ASUS), or Advanced &gt; Remote Management (Netgear). The status field should read &quot;Disabled&quot;. Additionally, test externally: <code className="font-mono bg-[var(--bg-elevated)] px-1 rounded text-[10px]">curl -I http://YOUR_WAN_IP</code> from a mobile hotspot — an HTTP 200 response means your panel is publicly accessible.
            </p>
          </div>
        </div>

        {/* Section 6: Advanced Admin Features */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
            <Zap size={18} className="text-[var(--brand-400)]" />
            Advanced Router Admin Features Explained
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                title: "QoS Traffic Shaping",
                icon: "⚡",
                desc: "Quality of Service (QoS) lets you prioritize specific traffic categories. Gaming UDP traffic to game server IPs can be elevated above background streaming or file downloads. Configure under Advanced > QoS. ASUS Adaptive QoS auto-classifies traffic using deep packet inspection (DPI) — you can override categories per device. In OpenWrt, QoS uses the 'tc' (traffic control) command with HTB (Hierarchical Token Bucket) or HFSC queuing disciplines for microsecond-precision shaping.",
              },
              {
                title: "VLAN Segmentation",
                icon: "🔀",
                desc: "VLANs (Virtual Local Area Networks) logically partition your network into isolated segments that cannot communicate without explicit inter-VLAN routing rules. Use VLANs to isolate IoT devices (smart TVs, cameras, doorbells) from your primary PC network — a compromised smart bulb cannot reach your NAS or workstation. Configure via Advanced > LAN > IPTV/VLAN or by assigning VLANs to specific SSIDs in the Wireless section.",
              },
              {
                title: "VPN Server Setup",
                icon: "🔒",
                desc: "Modern ASUS (firmware 386+) and Netgear Nighthawk routers include built-in WireGuard and OpenVPN servers. Enable under VPN > VPN Server. This lets you tunnel all mobile traffic through your home IP when on untrusted public Wi-Fi — no subscription needed. Generate client .conf or .ovpn files directly from the admin panel and import into the WireGuard or OpenVPN mobile app.",
              },
              {
                title: "DDoS Protection",
                icon: "🛡️",
                desc: "Higher-end routers include built-in DDoS mitigation: SYN flood protection (limits half-open TCP connections per second), ICMP rate limiting, and source IP verification (uRPF anti-spoofing). ASUS AiProtection includes real-time IPS using Trend Micro threat intelligence. TP-Link HomeCare blocks malicious IPs. Configure under Security > Firewall > DoS Protection. Enable ICMP and TCP flood protection thresholds specific to your connection speed.",
              },
              {
                title: "MAC Address Filtering",
                icon: "🔑",
                desc: "MAC filtering allows only devices with pre-registered hardware addresses to associate with your Wi-Fi. While it is not a complete security solution (MAC addresses can be spoofed in seconds with macchanger or similar tools), it adds a meaningful barrier against casual intruders. Configure under Wireless > MAC Filtering. Each entry requires the 48-bit MAC address in AA:BB:CC:DD:EE:FF format, found on device stickers or via the OS network settings.",
              },
              {
                title: "Bandwidth Monitoring",
                icon: "📊",
                desc: "Real-time and historical bandwidth monitoring identifies which devices consume the most data. ASUS Traffic Analyzer provides per-device charts for up to 30 days. TP-Link Tether shows live per-client download/upload speeds. On OpenWrt, install nlbwmon (opkg install nlbwmon) for persistent bandwidth accounting per MAC address and VLAN. Useful for detecting malware beaconing, unauthorized torrenting, or rogue streaming devices on your network.",
              },
            ].map((feature) => (
              <div key={feature.title} className="glass-card border border-[var(--border-subtle)] p-4 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{feature.icon}</span>
                  <h3 className="text-sm font-bold text-[var(--text-primary)]">{feature.title}</h3>
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 7: Troubleshooting 8 Scenarios */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
            <Settings size={18} className="text-[var(--brand-400)]" />
            Troubleshooting Admin Access: 8 Specific Scenarios
          </h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-5">
            Unable to reach your router admin panel? Each of the following scenarios has a distinct cause and a targeted fix. Identify the symptom that matches your situation:
          </p>
          <div className="space-y-4">
            {[
              {
                scenario: "VPN Client Is Blocking Access",
                symptom: "Browser shows ERR_CONNECTION_TIMED_OUT when VPN is active",
                fix: "Disconnect your VPN completely before accessing the admin panel. Most VPN clients (NordVPN, ExpressVPN, Mullvad) route all traffic through the tunnel, making local subnet IPs unreachable. Some VPN clients support 'LAN traffic exclusion' — look in Settings > Connection or Split Tunneling. ProtonVPN, Mullvad, and ExpressVPN all offer this option on desktop apps.",
              },
              {
                scenario: "AP Isolation Blocking Admin Access",
                symptom: "Connected to Wi-Fi but cannot reach the admin IP; Ethernet works fine",
                fix: "AP (Access Point) Isolation prevents clients on the same SSID from reaching the router management interface. It is typically enabled on Guest Networks by default. Connect to the primary network SSID or plug in directly via Ethernet. To access admin from the guest network, you would need to temporarily disable AP Isolation on that SSID.",
              },
              {
                scenario: "Wrong Subnet — IP Address Mismatch",
                symptom: "Browser immediately shows ERR_NETWORK_CHANGED or connection refused",
                fix: "Your device has a static IP configured in a different subnet than the router gateway. For example, your PC is 10.0.0.x but the router uses 192.168.1.x — there is no route between them. Run ipconfig (Windows) and verify the assigned IP prefix matches the gateway prefix. Set your network adapter to DHCP in Settings > Network > IPv4 Properties.",
              },
              {
                scenario: "HTTP vs HTTPS Port Mismatch",
                symptom: "Browser redirects from http:// to https:// and then shows a certificate error",
                fix: "If HTTPS-only mode is enabled on the router, typing http:// triggers a redirect to https:// — where a self-signed certificate error appears. Click Advanced > Proceed to [IP] (unsafe). This is safe on your LAN. If the panel uses a non-standard HTTPS port (e.g., 8443), try: https://192.168.1.1:8443 explicitly.",
              },
              {
                scenario: "Browser Cache Serving Stale Login Page",
                symptom: "Login page loads but form won't submit, or JavaScript errors appear in console",
                fix: "Hard-refresh with Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (macOS) to bypass cache. Open an Incognito window (Ctrl+Shift+N in Chrome, Ctrl+Shift+P in Firefox) which starts with no cached data or session tokens. Alternatively, clear site-specific data for the gateway IP in browser Settings > Privacy > Site Data.",
              },
              {
                scenario: "Firefox HSTS Preventing Access",
                symptom: "Firefox shows 'This site uses HTTP Strict Transport Security' with no Proceed option",
                fix: "Firefox enforces HSTS and blocks self-signed certs on known IPs. To clear: navigate to about:preferences#privacy > Certificates > Manage Certificates > Servers, and remove any entry for the router IP. Alternatively, switch to Chrome or Edge which have more permissive self-signed cert handling for private IP ranges. In Firefox you can also try clearing HSTS state via History > Clear Recent History > Active Logins.",
              },
              {
                scenario: "Chrome Showing NET::ERR_CERT_AUTHORITY_INVALID",
                symptom: "Chrome shows 'Your connection is not private' error",
                fix: "This is expected for self-signed router SSL certificates. Click 'Advanced' then 'Proceed to [IP address] (unsafe)'. This is safe when on your own LAN. If you see NET::ERR_CERT_INVALID instead (expired cert), navigate to Administration > System > Certificate on the router and regenerate the HTTPS cert, or temporarily access via http:// if the router allows non-HTTPS connections.",
              },
              {
                scenario: "Correct IP, Ping Works, But Page Won't Load",
                symptom: "Ping 192.168.1.1 succeeds but browser times out or shows connection reset",
                fix: "The router's httpd daemon has likely crashed or hung. Solution 1: Power cycle the router — unplug for 30 seconds and replug. Solution 2: If SSH is available, connect and run the service restart command: /etc/init.d/httpd restart (OpenWrt) or service restart_httpd (ASUS Merlin). Solution 3: If the issue persists after rebooting, the firmware is corrupted — perform a 30-30-30 hard reset: hold Reset 30s, unplug 30s while holding, replug and hold another 30s.",
              },
            ].map((item, idx) => (
              <div key={idx} className="glass-card border border-[var(--border-subtle)] p-5 rounded-xl">
                <div className="flex flex-wrap items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-default)] flex items-center justify-center text-xs font-bold font-mono text-[var(--brand-400)]">
                    {idx + 1}
                  </span>
                  <h3 className="text-sm font-bold text-[var(--text-primary)]">{item.scenario}</h3>
                </div>
                <p className="text-[11px] text-amber-400 font-medium mb-2 ml-9">
                  Symptom: {item.symptom}
                </p>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed ml-9">{item.fix}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl">
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              For a full diagnostic checklist and advanced resolution procedures, see our dedicated{" "}
              <Link href="/router-login-not-working" className="text-[var(--brand-400)] hover:underline font-semibold">
                Router Login Not Working
              </Link>{" "}
              guide.
            </p>
          </div>
        </div>

        {/* Section 8: Internal Link Grid */}
        <div className="mb-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              href: "/router-login",
              title: "Router Login Guide",
              desc: "Step-by-step instructions to log into TP-Link, ASUS, Netgear, and D-Link dashboards.",
            },
            {
              href: "/router-password",
              title: "Default Password Lists",
              desc: "Find standard manufacturer usernames and passwords, and learn recovery steps.",
            },
            {
              href: "/router-reset",
              title: "How to Reset a Router",
              desc: "Compare soft reset vs hard factory resets, and learn post-reset setups.",
            },
            {
              href: "/router-login-not-working",
              title: "Troubleshooting Login Issues",
              desc: "Resolve ERR_CONNECTION_TIMED_OUT errors, SSL certificate warnings, and VPN blocks.",
            },
            {
              href: "/router-settings",
              title: "Router Settings Explained",
              desc: "Deep dive into every router setting category — DHCP, QoS, NAT, firewall, DNS.",
            },
            {
              href: "/change-wifi-password",
              title: "Change Wi-Fi Password",
              desc: "Update your WPA2/WPA3 passphrase on TP-Link, ASUS, Netgear, and D-Link.",
            },
            {
              href: "/port-forwarding",
              title: "Port Forwarding Guide",
              desc: "Open TCP/UDP ports for gaming, servers, and remote desktop applications.",
            },
            {
              href: "/ips/192-168-50-1",
              title: "192.168.50.1 Admin Access",
              desc: "Login guide for ASUS routers and Cisco devices using the 192.168.50.1 gateway.",
            },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="glass-card p-5 hover:border-[var(--border-strong)] hover:bg-[var(--bg-hover)] hover:-translate-y-0.5 transition-all duration-[var(--transition-fast)] group block"
            >
              <h3 className="font-bold text-sm text-[var(--brand-400)] group-hover:underline mb-1">{link.title}</h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{link.desc}</p>
            </Link>
          ))}
        </div>

        {/* Section 9: Common Admin Operations */}
        <div className="mb-10 prose-dark">
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3">Common Admin Operations</h2>
          <p className="text-sm text-[var(--text-secondary)] mb-4 leading-relaxed">
            Understanding how to perform key configuration modifications is central to secure and optimized network management:
          </p>
          <ol className="space-y-4">
            {[
              {
                title: "Change SSID and Security Keys",
                desc: "Navigate to the Wireless section. Modify the Wi-Fi Name (SSID) and select WPA3-Personal as your security encryption standard. Choose a strong, unique passphrase with at least 12 characters combining letters, numbers, and symbols. See our full guide on how to change your Wi-Fi password for brand-specific steps.",
              },
              {
                title: "Enable a Guest Network",
                desc: "Under Guest Network configurations, set up an isolated SSID for visitors and smart home IoT devices. Enable AP Isolation on the guest SSID to prevent guest clients from seeing each other or accessing the primary network. Set a bandwidth limit (e.g., 10 Mbps up/down) to prevent guests from saturating your connection.",
              },
              {
                title: "Configure Port Forwarding",
                desc: "Go to WAN settings, NAT settings, or Virtual Server in your admin panel. Assign a static DHCP lease to the target device first, then define forwarding rules mapping the external port to that device's internal IP. For a complete walkthrough with examples for gaming consoles and home servers, see our port forwarding guide.",
              },
              {
                title: "Update Device Firmware",
                desc: "Under System Management or Administration, check for online updates or manually upload a firmware binary from the manufacturer's official support page. Always export a full configuration backup before upgrading — some major firmware versions reset settings to factory defaults. After the update, verify your port forwarding rules and DHCP reservations are still intact.",
              },
            ].map((op, idx) => (
              <li key={idx} className="flex gap-3 text-sm list-none">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-default)] flex items-center justify-center text-xs font-bold text-[var(--brand-400)]">
                  {idx + 1}
                </span>
                <div>
                  <strong className="text-[var(--text-primary)]">{op.title}:</strong>{" "}
                  <span className="text-[var(--text-secondary)] leading-relaxed">{op.desc}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Section 10: Router Access Cluster Navigation */}
        <div className="mb-10 p-6 glass-card border border-[var(--border-subtle)] rounded-2xl">
          <h2 className="text-base font-bold text-[var(--text-primary)] mb-4 flex items-center gap-1.5">
            <Link2 size={16} className="text-[var(--brand-400)]" />
            Related Router Guides
          </h2>
          <div className="flex flex-wrap gap-2.5">
            {[
              { label: "Router Directory", href: "/routers" },
              { label: "IP Address Directory", href: "/ips" },
              { label: "Router Login Guide", href: "/router-login" },
              { label: "Default Router Passwords", href: "/router-password" },
              { label: "How to Reset a Router", href: "/router-reset" },
              { label: "Router Settings Guide", href: "/router-settings" },
              { label: "Login Issues Diagnoses", href: "/router-login-not-working" },
              { label: "Change Wi-Fi Password", href: "/change-wifi-password" },
              { label: "Port Forwarding Guide", href: "/port-forwarding" },
              { label: "192.168.50.1 Admin", href: "/ips/192-168-50-1" },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-xs bg-[var(--bg-elevated)] border border-[var(--border-subtle)] hover:border-[var(--brand-800)] px-3 py-1.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--brand-400)] hover:bg-[var(--bg-hover)] transition-all font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

      </TroubleshootingArticleShell>
    </>
  );
}
