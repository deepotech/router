import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import TroubleshootingArticleShell from "@/components/tools/TroubleshootingArticleShell";
import { JsonLd } from "@/lib/seo/schema";
import { APP_URL } from "@/lib/constants";
import Link from "next/link";
import { Settings, Info, AlertTriangle, KeyRound, Wifi, Smartphone, Gamepad2, Tv, Shield, HelpCircle, FileText, CheckSquare } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "Router Settings Guide: How to Configure & Optimize Your Router (2026)",
  description:
    "The definitive authority guide to configuring, optimizing, and securing your wireless router settings. Learn how to adjust DNS, set up port forwarding, customize QoS, secure guest networks, and troubleshoot.",
  canonical: "/router-settings",
  keywords: [
    "router settings",
    "how to configure router settings",
    "best router settings",
    "router setup guide",
    "default router settings",
    "configure router settings",
    "wireless router settings",
    "advanced router settings",
    "change router settings",
    "network configuration settings",
    "router administrative setup",
    "router qos settings",
    "change dns on router"
  ],
});

const breadcrumbs = [
  { name: "Router Guides", url: "/routers" },
  { name: "Router Settings", url: "/router-settings" },
];

const troubleshootingSteps = [
  {
    title: "Access Your Router Administrative Portal",
    description: "Open a web browser on a device connected to the network, type your router's default gateway IP address (typically 192.168.1.1, 192.168.0.1, or 10.0.0.1) in the URL bar, and log in with your administrative credentials.",
    tip: "Disable temporary VPNs or iOS Private Relay if the login screen fails to load."
  },
  {
    title: "Navigate to the Security and Wireless Tab",
    description: "Go to Wireless settings to configure your Wi-Fi name (SSID), choose a modern encryption mode like WPA3-Personal or WPA2/WPA3 transition mode, and set a strong passphrase.",
    tip: "Use the same SSID for both 2.4 GHz and 5 GHz bands if you want to use Smart Connect band steering."
  },
  {
    title: "Update LAN & WAN DNS Parameters",
    description: "Navigate to DNS, WAN, or DHCP settings, toggle DNS settings to manual, and enter public Anycast resolver IPs (like 1.1.1.1 and 8.8.8.8) to bypass your ISP's slow DNS servers.",
    tip: "Configuring DNS at the router level automatically applies it to all client devices on your network."
  },
  {
    title: "Configure QoS and Port Forwarding",
    description: "For applications that require open ports (like gaming or hosting servers), configure port forwarding rules. Set up Quality of Service (QoS) rules to prioritize high-priority traffic.",
    tip: "Keep UPnP disabled if you prefer to manually configure your port forwarding rules for security."
  },
  {
    title: "Segment Network using Guest WLAN Profiles",
    description: "Set up a Guest network with isolation settings enabled. Point all guest devices and smart home IoT appliances to this SSID to isolate them from your primary local network.",
    tip: "Isolating IoT devices prevents compromised smart home bulbs or cameras from scanning your main network."
  },
  {
    title: "Save Config and Export System Backup",
    description: "Click Save or Apply. Navigate to System Tools, check for firmware updates, and export a configuration backup file (.bin) to allow one-click recovery.",
    tip: "Perform a system restart once a week to clear memory cache leak bottlenecks."
  }
];

const faqs = [
  {
    question: "What are the best router settings for speed?",
    answer: "For maximum speed, configure your router to use the 5 GHz or 6 GHz band, set wireless channel width to 80 MHz or 160 MHz, select WPA3 security to bypass WPA2 throughput caps, set custom DNS resolvers like Cloudflare (1.1.1.1) to speed up hostname lookup latency, and configure Quality of Service (QoS) to prioritize critical devices during network congestion."
  },
  {
    question: "How do I access my router settings?",
    answer: "To access your router settings, connect a computer or phone to your router's network, open a web browser, and type your router's default gateway IP address (typically 192.168.1.1 or 192.168.0.1) in the URL address bar. Press Enter and log in using the administrator username and password (usually found on the physical sticker at the bottom of the device)."
  },
  {
    question: "What happens if I make a mistake in my router settings?",
    answer: "If you configure a setting incorrectly and lose internet access or access to the admin portal, you can restore your settings by factory resetting your router. Locate the small 'Reset' button on the back of the router, hold it down with a paperclip for 10-15 seconds, and release. This resets the router back to its factory default settings."
  },
  {
    question: "Should I keep UPnP enabled?",
    answer: "No, security experts recommend keeping UPnP (Universal Plug and Play) disabled. While UPnP allows devices to open ports automatically for gaming, it also allows malware to open ports without your permission, exposing your local network to threats. Manually configure port forwarding rules instead for optimal security."
  },
  {
    question: "How do I choose between 2.4 GHz and 5 GHz bands?",
    answer: "Choose the 5 GHz (or 6 GHz) band for high-speed devices that are physically close to the router (like gaming PCs, consoles, and streaming devices). Choose the 2.4 GHz band for long-range connections, smart home IoT devices (bulbs, plugs, cameras), and devices separated by multiple walls, as 2.4 GHz has better range."
  },
  {
    question: "What is QoS and should I turn it on?",
    answer: "QoS (Quality of Service) is a feature that prioritizes network traffic for specific devices or applications. You should turn it on if your network experiences congestion (e.g., streaming and downloading slows down your online gaming). Set a small bandwidth reserve for gaming and real-time voice applications to reduce latency spikes."
  },
  {
    question: "How do I protect my router settings from hackers?",
    answer: "To secure your router, change the default administrator login password, use WPA3 or WPA2-Personal (AES) encryption, disable WPS (Wi-Fi Protected Setup), disable remote WAN management, keep your firmware updated, and set up a separate guest network for visitors and IoT devices."
  },
  {
    question: "Should I hide my Wi-Fi network name (SSID)?",
    answer: "No, hiding your SSID does not improve security. Hackers can detect hidden SSIDs by scanning wireless packets on the network. Hiding your SSID can also cause connection drops and drain mobile device batteries as clients continuously scan for the hidden network."
  },
  {
    question: "Why does my router settings page say 'Not Secure' in my web browser?",
    answer: "This warning occurs because local router admin pages use HTTP instead of HTTPS, or they use self-signed SSL certificates that your web browser doesn't recognize. This is normal and safe for local configurations because the traffic is isolated to your local area network (LAN) and does not go out over the internet."
  },
  {
    question: "How do I reset my router to default settings?",
    answer: "To reset your router to default settings, locate the physical reset button (usually a small pinhole on the back or bottom of the router). While the router is powered on, use a paperclip to press and hold the button for 10 to 15 seconds. The status lights will flash, indicating the router has restarted with factory settings."
  }
];

const commonCauses = [
  {
    title: "Bufferbloat Bottleneck",
    desc: "Unoptimized traffic queues cause packet queues to build up during downloads, increasing latency spikes and packet loss for gaming and video calls."
  },
  {
    title: "DNS Query Latency",
    desc: "Slow DNS resolution from ISP-assigned recursive servers delays the initial load of web pages, making connections feel laggy."
  },
  {
    title: "Double NAT Conflict",
    desc: "Connecting two routers in series creates conflicting subnets and firewall policies, blocking port forwarding rules and gaming connections."
  },
  {
    title: "Default Admin Credentials",
    desc: "Leaving default factory credentials active exposes the administration panel to network scans and hijacking by malicious users."
  }
];

const quickFixChecklist = [
  "Identify your default gateway IP address using ipconfig or system details.",
  "Change the default administrative login credentials immediately to secure access.",
  "Set custom Anycast DNS servers (1.1.1.1 / 8.8.8.8) to improve hostname lookups.",
  "Enable WPA3-Personal or WPA2/WPA3 hybrid mode to secure data transmission.",
  "Export a copy of your working configuration settings file (.bin) to simplify recovery."
];

// Custom schemas
const collectionPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${APP_URL}/router-settings#collection`,
  "url": `${APP_URL}/router-settings`,
  "name": "Router Settings Configuration & Optimization Guide",
  "description": "The definitive resource for optimizing home wireless router configurations. Detailed step-by-step instructions for adjusting administrative logins, Wi-Fi security keys, custom DNS servers, port forwarding, QoS, and guest networks.",
  "about": [
    { "@type": "Thing", "name": "Router Settings" },
    { "@type": "Thing", "name": "Network Configurations" },
    { "@type": "Thing", "name": "Wireless Optimization" }
  ]
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${APP_URL}/router-settings#settings-list`,
  "name": "Key Router Configuration Areas",
  "description": "The primary configuration categories within home and enterprise networking routers.",
  "numberOfItems": 7,
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Administrative Credentials", "url": `${APP_URL}/router-admin` },
    { "@type": "ListItem", "position": 2, "name": "Wireless SSID & Passwords", "url": `${APP_URL}/change-wifi-password` },
    { "@type": "ListItem", "position": 3, "name": "DNS Resolvers", "url": `${APP_URL}/how-to-change-dns-on-router` },
    { "@type": "ListItem", "position": 4, "name": "Port Forwarding & NAT", "url": `${APP_URL}/port-forwarding-guide` },
    { "@type": "ListItem", "position": 5, "name": "Quality of Service (QoS)", "url": `${APP_URL}/best-qos-settings-for-gaming` },
    { "@type": "ListItem", "position": 6, "name": "Guest Network Isolation", "url": `${APP_URL}/router-settings` },
    { "@type": "ListItem", "position": 7, "name": "System Restore & Maintenance", "url": `${APP_URL}/router-reset` }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "@id": `${APP_URL}/router-settings#how-to-configure`,
  "name": "How to Configure Basic Router Settings",
  "description": "Step-by-step guide to log into your router console and customize your settings for security and performance.",
  "totalTime": "PT10M",
  "supply": [
    { "@type": "HowToSupply", "name": "Network Cable or Wi-Fi Signal" },
    { "@type": "HowToSupply", "name": "Admin Password" }
  ],
  "tool": [
    { "@type": "HowToTool", "name": "Web Browser" },
    { "@type": "HowToTool", "name": "Computer or Smartphone" }
  ],
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Access Router Web Interface",
      "text": "Open a browser, type your router's default gateway IP address (typically 192.168.1.1 or 192.168.0.1) in the URL bar, and log in with your administrative credentials.",
      "url": `${APP_URL}/router-settings#step-1`
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Configure Wireless Parameters",
      "text": "Navigate to Wireless or WLAN settings, set a custom network name (SSID), choose WPA2-Personal or WPA3, and enter a secure password.",
      "url": `${APP_URL}/router-settings#step-2`
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Apply Custom DNS IPs",
      "text": "Go to WAN or DHCP Settings, locate DNS server settings, set them to manual, and enter public DNS IPs (e.g. 1.1.1.1 and 8.8.8.8).",
      "url": `${APP_URL}/router-settings#step-3`
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Set Up QoS Prioritization",
      "text": "Enable QoS (Quality of Service) to prioritize real-time traffic for gaming and video calls, preventing bufferbloat bottlenecks.",
      "url": `${APP_URL}/router-settings#step-4`
    },
    {
      "@type": "HowToStep",
      "position": 5,
      "name": "Enable Guest Network Isolation",
      "text": "Create a guest Wi-Fi SSID with isolation settings enabled to segment guest devices and smart home IoT appliances from your primary local network.",
      "url": `${APP_URL}/router-settings#step-5`
    },
    {
      "@type": "HowToStep",
      "position": 6,
      "name": "Save Configurations & Backup",
      "text": "Click Save or Apply to write configuration modifications to memory. Export a copy of the configuration settings file (.bin) as a backup.",
      "url": `${APP_URL}/router-settings#step-6`
    }
  ]
};

export default function RouterSettingsPage() {
  return (
    <TroubleshootingArticleShell
      h1="Router Settings Guide: How to Configure & Optimize Your Router (2026)"
      intro="Configuring your router settings correctly is essential for maintaining a fast, stable, and secure home network. Learn how to log into your administrative panel, optimize Wi-Fi bands, configure port forwarding, set up custom DNS resolvers, manage Quality of Service (QoS) priorities, and troubleshoot settings issues."
      category="wifi"
      breadcrumbs={breadcrumbs}
      faqs={faqs}
      troubleshootingSteps={troubleshootingSteps}
      warningBanner={{
        title: "Configuration Alert: Backup Settings Before Modifying",
        text: "Before making changes to your WAN, DHCP, or firewall configurations, always export a backup file of your current router settings. If a configuration error occurs, this file allows you to restore your network to its working state in a single click."
      }}
      quickFixChecklist={quickFixChecklist}
      commonCauses={commonCauses}
      whenToContactISP="If you are configuring a modem-router gateway provided by your ISP and cannot access the admin page using default credentials, your ISP may have disabled local access. Contact your ISP's support line or log in using their subscriber app to adjust your Wi-Fi name, password, or security configurations."
      severityLevel="medium"
    >
      {/* Schema Injection */}
      <JsonLd data={collectionPageSchema} />
      <JsonLd data={itemListSchema} />
      <JsonLd data={howToSchema} />

      <div className="space-y-10">

        {/* ==========================================
            SECTION 1: HERO & CORE INTRO
            ========================================== */}
        <section className="prose prose-invert max-w-none space-y-4" aria-label="Introduction">
          <div className="flex items-center gap-2 text-[var(--brand-400)] font-semibold text-xs uppercase tracking-wider mb-2">
            <Settings size={14} /> Global Router Configuration Standards
          </div>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            Your wireless router is the brain of your local network, managing all data packets sent between your client devices (smartphones, gaming consoles, PCs) and the internet. Out-of-the-box, most routers ship with factory configurations designed for compatibility rather than performance or security. Leaving these configurations at their defaults can leave your network vulnerable to unauthorized access and cause bandwidth congestion.
          </p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            Optimizing your router settings allows you to customize your network to meet your needs. By adjusting basic parameters like your Wi-Fi password and administrative login, you secure your personal data. Adjusting advanced settings like Quality of Service (QoS), Port Forwarding, and DNS servers allows you to prioritize high-speed activities (like 4K streaming and gaming), reduce lag spikes, and extend wireless coverage throughout your home.
          </p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            This guide covers how to locate settings panels, configure primary wireless options, set up advanced features, and troubleshoot common configuration issues. It serves as your main reference guide for managing home networking hardware.
          </p>
        </section>

        {/* ==========================================
            SECTION 2: AI QUICK REFERENCE TABLE (FEATURED SNIPPET)
            ========================================== */}
        <section className="glass-card p-6 border border-emerald-950/30 bg-emerald-950/5 rounded-2xl relative overflow-hidden" aria-label="Quick Answer Summary">
          <div className="absolute top-0 right-0 bg-emerald-500/10 text-emerald-400 text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-bl-lg font-bold">
            AI Overview Summary
          </div>
          <h2 className="text-xs font-bold text-emerald-400 mb-3 uppercase tracking-wide flex items-center gap-1.5">
            <KeyRound size={12} /> Recommended Router Settings
          </h2>
          <div className="overflow-x-auto mb-4">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-[11px] text-[var(--text-secondary)]">
              <thead>
                <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                  <th className="px-3 py-2 text-left border-b border-[var(--border-subtle)]">Router Setting</th>
                  <th className="px-3 py-2 text-left border-b border-[var(--border-subtle)]">Recommended Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)]">
                <tr>
                  <td className="px-3 py-2.5 font-bold text-[var(--text-primary)]">Security</td>
                  <td className="px-3 py-2.5 font-semibold text-emerald-400">WPA3</td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-bold text-[var(--text-primary)]">DNS</td>
                  <td className="px-3 py-2.5 font-semibold text-emerald-400">Cloudflare 1.1.1.1</td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-bold text-[var(--text-primary)]">WPS</td>
                  <td className="px-3 py-2.5 font-semibold text-emerald-400">Disabled</td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-bold text-[var(--text-primary)]">QoS</td>
                  <td className="px-3 py-2.5 font-semibold text-emerald-400">Enabled</td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-bold text-[var(--text-primary)]">Guest Network</td>
                  <td className="px-3 py-2.5 font-semibold text-emerald-400">Enabled</td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-bold text-[var(--text-primary)]">Firmware</td>
                  <td className="px-3 py-2.5 font-semibold text-emerald-400">Latest Version</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
            Note: Applying these parameters protects your local network, reduces latency, and prevents unauthorized devices from hijacking configuration settings.
          </p>
        </section>

        {/* ==========================================
            FEEDBACK ADDITION 1: ROUTER SETTINGS BY BRAND
            ========================================== */}
        <section className="prose prose-invert max-w-none space-y-4">
          <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-1.5">
            <Smartphone size={16} className="text-[var(--brand-400)]" />
            Router Settings Access URL by Brand
          </h2>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            To configure your settings, navigate to your router's default administrative IP or local address portal. The table below lists default configuration addresses for major router brands:
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-[11px] text-[var(--text-secondary)]">
              <thead>
                <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                  <th className="px-3 py-2 text-left">Brand</th>
                  <th className="px-3 py-2 text-left">Settings URL / Address</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)]">
                <tr>
                  <td className="px-3 py-2.5 font-semibold">
                    <Link href="/routers/tp-link" className="text-[var(--brand-400)] hover:underline">TP-Link</Link>
                  </td>
                  <td className="px-3 py-2.5 font-mono">tplinkwifi.net</td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-semibold">
                    <Link href="/routers/asus" className="text-[var(--brand-400)] hover:underline">ASUS</Link>
                  </td>
                  <td className="px-3 py-2.5 font-mono">router.asus.com</td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-semibold">
                    <Link href="/routers/netgear" className="text-[var(--brand-400)] hover:underline">NETGEAR</Link>
                  </td>
                  <td className="px-3 py-2.5 font-mono">routerlogin.net</td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-semibold">
                    <Link href="/routers/d-link" className="text-[var(--brand-400)] hover:underline">D-Link</Link>
                  </td>
                  <td className="px-3 py-2.5 font-mono">192.168.0.1</td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-semibold">
                    <Link href="/routers/huawei" className="text-[var(--brand-400)] hover:underline">Huawei</Link>
                  </td>
                  <td className="px-3 py-2.5 font-mono">192.168.8.1</td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-semibold">
                    <Link href="/routers/xiaomi" className="text-[var(--brand-400)] hover:underline">Xiaomi</Link>
                  </td>
                  <td className="px-3 py-2.5 font-mono">192.168.31.1</td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-semibold">
                    <Link href="/routers/linksys" className="text-[var(--brand-400)] hover:underline">Linksys</Link>
                  </td>
                  <td className="px-3 py-2.5 font-mono">myrouter.local</td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-semibold">
                    <Link href="/routers/tenda" className="text-[var(--brand-400)] hover:underline">Tenda</Link>
                  </td>
                  <td className="px-3 py-2.5 font-mono">tendawifi.com</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            If you need detailed login instructions, read our <Link href="/router-login" className="text-[var(--brand-400)] hover:underline">Router Login Walkthrough</Link> or troubleshoot connection drops with <Link href="/router-login-not-working" className="text-[var(--brand-400)] hover:underline">Router Login Not Working</Link>.
          </p>
        </section>

        {/* ==========================================
            SECTION 3: ACCESSING THE ROUTER ADMIN INTERFACE
            ========================================== */}
        <section className="prose prose-invert max-w-none space-y-4">
          <h2 className="text-base font-bold text-[var(--text-primary)]">How to Access and Configure Router Administrative Panels</h2>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Accessing your router settings requires a direct local connection to the device. To log in and modify settings, follow these steps:
          </p>
          <div className="border-l-4 border-[var(--brand-500)] pl-4 py-2 space-y-2 text-xs text-[var(--text-secondary)] bg-[var(--bg-elevated)] rounded-r-xl">
            <ol className="list-decimal pl-5 space-y-1.5">
              <li><strong>Connect to the Network:</strong> Connect your device (computer or smartphone) using an Ethernet cable (recommended) or via Wi-Fi.</li>
              <li><strong>Open Your Browser:</strong> Open any modern web browser (such as Chrome, Safari, Edge, or Firefox).</li>
              <li><strong>Enter Gateway IP:</strong> Type your router's default gateway IP address (e.g., <Link href="/ips/192-168-1-1" className="text-[var(--brand-400)] hover:underline">192.168.1.1</Link> or <Link href="/ips/192-168-0-1" className="text-[var(--brand-400)] hover:underline">192.168.0.1</Link>) into the URL address bar and press Enter.</li>
              <li><strong>Input Credentials:</strong> Enter your admin username and password. This is different from your Wi-Fi password. Check the physical sticker on your router if you do not know the defaults. Learn how in our <Link href="/router-admin" className="text-[var(--brand-400)] hover:underline">Router Admin Setup Guide</Link> or recover credentials using our <Link href="/router-password" className="text-[var(--brand-400)] hover:underline">Router Password Guide</Link>.</li>
            </ol>
          </div>
        </section>

        {/* ==========================================
            SECTION 4: WIFI SETTINGS CONFIGURATION
            ========================================== */}
        <section className="prose prose-invert max-w-none space-y-4">
          <h2 className="text-base font-bold text-[var(--text-primary)]">Wi-Fi Settings Configuration (SSID & Encryption)</h2>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            The Wi-Fi settings tab controls wireless connectivity. To optimize security and signal strength, configure the settings below:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-xs text-[var(--text-muted)]">
            <li>
              <strong>SSID (Service Set Identifier):</strong> This is your wireless network name. Choose a distinct name that doesn't reveal your router brand or personal details (e.g. avoid 'Netgear_42' or 'Smith_Family'). To change this setting, go to Wireless Settings, update the SSID field, and save.
            </li>
            <li>
              <strong>Security Protocol:</strong> Ensure your router is configured to use WPA3 or WPA2-Personal (AES) encryption. Do not use WEP or WPA (TKIP) protocols, as they are insecure. Learn how to update these configurations in our <Link href="/change-wifi-password" className="text-[var(--brand-400)] hover:underline">WiFi Password Change Guide</Link>.
            </li>
            <li>
              <strong>Channel Width & Frequency:</strong> Configure your bands to avoid interference:
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li><strong>2.4 GHz Band:</strong> Set channel width to 20 MHz (using channels 1, 6, or 11) to minimize overlaps with neighboring networks.</li>
                <li><strong>5 GHz / 6 GHz Bands:</strong> Set channel width to 80 MHz or 160 MHz for maximum speed and throughput.</li>
              </ul>
            </li>
          </ul>
        </section>

        {/* ==========================================
            SECTION 5: DNS SETTINGS
            ========================================== */}
        <section className="prose prose-invert max-w-none space-y-4">
          <h2 className="text-base font-bold text-[var(--text-primary)]">Domain Name System (DNS) Settings Optimization</h2>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            DNS (Domain Name System) is the service that translates website names (e.g. <code>google.com</code>) into IP addresses. By default, your router uses the DNS servers assigned by your ISP, which can be slow and impact page load speeds.
          </p>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            To configure custom DNS settings on your router:
          </p>
          <div className="border-l-4 border-[var(--brand-500)] pl-4 py-2 space-y-2 text-xs text-[var(--text-secondary)] bg-[var(--bg-elevated)] rounded-r-xl">
            <ol className="list-decimal pl-5 space-y-1">
              <li>Navigate to your router settings panel and click on the <strong>WAN</strong>, <strong>Internet</strong>, or <strong>DHCP Settings</strong> tab.</li>
              <li>Locate the <strong>DNS Settings</strong> or <strong>Primary/Secondary DNS IP Address</strong> fields.</li>
              <li>Toggle DNS configuration to <strong>Manual</strong> or <strong>Use These DNS Servers</strong>.</li>
              <li>Input the following secure public DNS IP configurations:
                <ul className="list-disc pl-5 mt-1 space-y-0.5">
                  <li><strong>Cloudflare DNS:</strong> Primary <code>1.1.1.1</code> | Secondary <code>1.0.0.1</code> (Fastest latency).</li>
                  <li><strong>Google DNS:</strong> Primary <code>8.8.8.8</code> | Secondary <code>8.8.4.4</code> (High reliability).</li>
                </ul>
              </li>
              <li>Click <strong>Save</strong> or <strong>Apply Settings</strong>.</li>
            </ol>
          </div>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            For step-by-step instructions, read our <Link href="/how-to-change-dns-on-router" className="text-[var(--brand-400)] hover:underline">Change DNS on Router Guide</Link> or review DNS performance benchmarks at <Link href="/best-dns-for-faster-internet" className="text-[var(--brand-400)] hover:underline">Best DNS for Speed</Link> and <Link href="/best-dns-for-gaming" className="text-[var(--brand-400)] hover:underline">Best DNS for Gaming</Link>.
          </p>
        </section>

        {/* ==========================================
            SECTION 6: PORT FORWARDING & NAT SETTINGS
            ========================================== */}
        <section className="prose prose-invert max-w-none space-y-4">
          <h2 className="text-base font-bold text-[var(--text-primary)]">Port Forwarding & Network Address Translation (NAT) Settings</h2>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Network Address Translation (NAT) maps internal client IP addresses to your public WAN IP address. If an external server attempts to connect directly to an internal client (like a game console), the router blocks it unless a port forwarding rule is configured.
          </p>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            To configure port forwarding:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-[var(--text-secondary)]">
            <li><strong>Assign a Static IP:</strong> Assign a static IP address to your target client device (e.g., PC or console) inside the DHCP settings page to prevent IP address changes.</li>
            <li><strong>Create Port Forwarding Rule:</strong> Navigate to the <strong>Port Forwarding</strong>, <strong>Virtual Server</strong>, or <strong>NAT Settings</strong> tab.</li>
            <li><strong>Input Ports:</strong> Specify the internal/external ports and protocol (TCP, UDP, or Both).</li>
            <li><strong>Specify Destination:</strong> Enter the static IP address of the target device and save.</li>
          </ul>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            For help opening ports, read our <Link href="/port-forwarding-guide" className="text-[var(--brand-400)] hover:underline">Port Forwarding Guide</Link> or troubleshoot issues in <Link href="/port-forwarding-not-working" className="text-[var(--brand-400)] hover:underline">Port Forwarding Not Working</Link>. For gaming console setups, check out <Link href="/nat-type-strict" className="text-[var(--brand-400)] hover:underline">Fix Strict NAT Type</Link> and <Link href="/open-nat-type" className="text-[var(--brand-400)] hover:underline">How to Open NAT Type</Link>.
          </p>
        </section>

        {/* ==========================================
            SECTION 7: QOS SETTINGS
            ========================================== */}
        <section className="prose prose-invert max-w-none space-y-4">
          <h2 className="text-base font-bold text-[var(--text-primary)]">Quality of Service (QoS) Settings Optimization</h2>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Quality of Service (QoS) is an advanced feature that prioritizes internet bandwidth for specific devices or applications. It is useful in households where downloading or streaming video creates latency spikes (bufferbloat) for other users.
          </p>
          <div className="border border-[var(--border-subtle)] rounded-xl p-4 bg-[var(--bg-elevated)] space-y-2 text-xs text-[var(--text-secondary)]">
            <span className="font-bold text-[var(--text-primary)] block">How to Optimize QoS:</span>
            <ul className="list-disc pl-5 space-y-1 text-[11px] text-[var(--text-muted)]">
              <li><strong>Enable QoS:</strong> Toggle the setting to enabled in the Advanced Settings or QoS tab.</li>
              <li><strong>Set Bandwidth Speed:</strong> Enter your actual download and upload speeds (run a speed test first) to allow the router to manage queues accurately.</li>
              <li><strong>Prioritize Devices:</strong> Assign 'High Priority' status to devices that require low latency (such as gaming PCs or consoles).</li>
              <li><strong>Apply Smart Queuing (FQ-CoDel / CAKE):</strong> Choose FQ-CoDel or CAKE if available, as these scheduling algorithms help reduce bufferbloat under load.</li>
            </ul>
          </div>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Learn more about configuring QoS in our dedicated guides: <Link href="/best-qos-settings-for-gaming" className="text-[var(--brand-400)] hover:underline">Best QoS Settings</Link> and <Link href="/gaming-network-optimization" className="text-[var(--brand-400)] hover:underline">Gaming Network Settings</Link>.
          </p>
        </section>

        {/* ==========================================
            SECTION 8: GUEST NETWORKS
            ========================================== */}
        <section className="prose prose-invert max-w-none space-y-4">
          <h2 className="text-base font-bold text-[var(--text-primary)]">Guest Wi-Fi Network Setup & Segmentation</h2>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Most home users share their primary Wi-Fi password with guests and connect smart home devices (like smart bulbs, plugs, and cameras) to their main network. This exposes the network to potential security risks. If a smart plug is compromised by malware, it can scan your local network to intercept personal files.
          </p>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            To prevent these security gaps, enable your router's **Guest Network** settings:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-xs text-[var(--text-muted)]">
            <li>
              <strong>Enable Guest Network Isolation:</strong> Check the box labeled **AP Isolation**, **Wireless Isolation**, or **Allow Guests to Access local network** (set this to disabled). This configuration isolates guest devices on a separate virtual LAN (VLAN), preventing them from communicating with your primary devices (laptops, NAS servers).
            </li>
            <li>
              <strong>Dedicate Guest SSID for Smart Home IoT:</strong> Connect all smart home devices to the Guest SSID. If a smart bulb is ever hacked, the attacker cannot pivot to access your home PCs or shared network folders.
            </li>
          </ul>
        </section>

        {/* ==========================================
            FEEDBACK ADDITION 2: BEST ROUTER SETTINGS FOR GAMING
            ========================================== */}
        <section className="prose prose-invert max-w-none space-y-4">
          <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-1.5" id="gaming-settings">
            <Gamepad2 size={16} className="text-[var(--brand-400)]" />
            Best Router Settings for Online Gaming (Reducing Ping & Packet Loss)
          </h2>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            For online gaming, maintaining low ping and zero packet loss is crucial. To optimize your router settings for gaming, implement the configurations below:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-[var(--text-secondary)]">
            <div className="border border-[var(--border-subtle)] rounded-xl p-4 bg-[var(--bg-elevated)] space-y-2">
              <span className="font-bold text-[var(--text-primary)] block">1. Prioritize Gaming Traffic (QoS)</span>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                Enable QoS on your router and set your gaming console or PC as a high-priority device. This ensures that game packets are prioritized during heavy download or streaming activity in the household.
              </p>
            </div>
            <div className="border border-[var(--border-subtle)] rounded-xl p-4 bg-[var(--bg-elevated)] space-y-2">
              <span className="font-bold text-[var(--text-primary)] block">2. Connect via Wi-Fi 6 / Wi-Fi 7</span>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                If an Ethernet connection is not available, use Wi-Fi 6 (802.11ax) or Wi-Fi 7 (802.11be) routers. These standards support OFDMA, which reduces latency and stabilizes your connection compared to older standards.
              </p>
            </div>
          </div>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            For detailed gaming network optimizations, read our gaming guides: <Link href="/best-router-for-gaming" className="text-[var(--brand-400)] hover:underline">Best Gaming Routers</Link>, <Link href="/wifi-6-for-gaming" className="text-[var(--brand-400)] hover:underline">WiFi 6 for Latency</Link>, <Link href="/wifi-7-for-gaming" className="text-[var(--brand-400)] hover:underline">WiFi 7 Standard Guide</Link>, and <Link href="/gaming-network-optimization" className="text-[var(--brand-400)] hover:underline">Network Optimization Tips</Link>.
          </p>
        </section>

        {/* ==========================================
            FEEDBACK ADDITION 3: BEST ROUTER SETTINGS FOR STREAMING
            ========================================== */}
        <section className="prose prose-invert max-w-none space-y-4">
          <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-1.5">
            <Tv size={16} className="text-[var(--brand-400)]" />
            Best Router Settings for 4K Streaming (Netflix, Prime & YouTube)
          </h2>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Unlike gaming (which requires low latency), video streaming requires high bandwidth and stable throughput. To optimize your network for 4K streaming and avoid buffering:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-xs text-[var(--text-muted)]">
            <li>
              <strong>Configure 5 GHz / 6 GHz Bands for TVs:</strong> Smart TVs and streaming boxes (such as Apple TV, Roku, or Fire Stick) should be connected to the 5 GHz or 6 GHz wireless band to support the high data rates required for Ultra-HD video.
            </li>
            <li>
              <strong>Enable WMM (Wi-Fi Multimedia):</strong> WMM is an integration feature that automatically prioritizes voice and video traffic on wireless networks. Ensure this setting is enabled under Wireless Advanced configurations to prevent video streams from buffering.
            </li>
            <li>
              <strong>Enable DNS Client Subnet (ECS):</strong> Use DNS servers that support ECS (like Google 8.8.8.8 or Cloudflare 1.1.1.1). ECS passes a masked portion of your IP address to content delivery networks (CDNs), ensuring Netflix and YouTube stream video from their closest caching server.
            </li>
          </ul>
        </section>

        {/* ==========================================
            SECTION 9: PARENTAL CONTROLS & SCHEDULING
            ========================================== */}
        <section className="prose prose-invert max-w-none space-y-4">
          <h2 className="text-base font-bold text-[var(--text-primary)]">Parental Controls & Access Scheduling Settings</h2>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Parental control settings allow you to manage internet access for specific devices in your household. To configure these settings:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-xs text-[var(--text-muted)]">
            <li>
              <strong>Time-Based Scheduling:</strong> Navigate to Parental Controls or Access Control, select the MAC address of the device you wish to limit, and set downtime windows (e.g. blocking internet access after 9:00 PM).
            </li>
            <li>
              <strong>Content Filtering:</strong> Some routers support content filtering to block specific websites or content categories. If your router does not support this, you can configure your router's DNS settings to use <strong>Cloudflare Family DNS</strong> (Primary <code>1.1.1.3</code> | Secondary <code>1.0.0.3</code>) to automatically block malware and adult content.
            </li>
          </ul>
        </section>

        {/* ==========================================
            SECTION 10: ROUTER SECURITY SETTINGS
            ========================================== */}
        <section className="prose prose-invert max-w-none space-y-4">
          <h2 className="text-base font-bold text-[var(--text-primary)]">Router Security Configurations (Firewall & Access Management)</h2>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Securing your router's administration panel is essential for protecting your local network. Configure the settings below to improve security:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-[var(--text-secondary)]">
            <div className="glass-card p-4 border border-[var(--border-subtle)] rounded-xl space-y-1">
              <span className="font-bold text-[var(--text-primary)] block flex items-center gap-1"><Shield size={12} /> Enable SPI Firewall</span>
              <p className="text-[11px] text-[var(--text-muted)]">Ensure the router's built-in Stateful Packet Inspection (SPI) firewall is enabled. This blocks unrequested inbound traffic while allowing outbound connections.</p>
            </div>
            <div className="glass-card p-4 border border-[var(--border-subtle)] rounded-xl space-y-1">
              <span className="font-bold text-[var(--text-primary)] block flex items-center gap-1"><Shield size={12} /> Disable Remote Management</span>
              <p className="text-[11px] text-[var(--text-muted)]">Disable remote WAN management. This prevents access to your router's login page from outside your local network, blocking WAN-side attacks.</p>
            </div>
          </div>
        </section>

        {/* ==========================================
            FEEDBACK ADDITION 4: ROUTER SETTINGS CHECKLIST
            ========================================== */}
        <section className="prose prose-invert max-w-none space-y-4">
          <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-1.5">
            <CheckSquare size={16} className="text-[var(--brand-400)]" />
            Router Settings Checklist
          </h2>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Review this checklist to verify your router is configured securely and optimized for performance:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[var(--text-secondary)]">
            <div className="glass-card p-4 border border-[var(--border-subtle)] rounded-xl flex gap-3">
              <span className="text-emerald-400 font-bold">✓</span>
              <div>
                <span className="font-bold text-[var(--text-primary)] block">Change Admin Password</span>
                <p className="text-[10px] text-[var(--text-muted)]">Change the default factory administrative login password to secure the console.</p>
              </div>
            </div>
            <div className="glass-card p-4 border border-[var(--border-subtle)] rounded-xl flex gap-3">
              <span className="text-emerald-400 font-bold">✓</span>
              <div>
                <span className="font-bold text-[var(--text-primary)] block">Use WPA3</span>
                <p className="text-[10px] text-[var(--text-muted)]">Use the strongest wireless security standard supported by your client devices.</p>
              </div>
            </div>
            <div className="glass-card p-4 border border-[var(--border-subtle)] rounded-xl flex gap-3">
              <span className="text-emerald-400 font-bold">✓</span>
              <div>
                <span className="font-bold text-[var(--text-primary)] block">Disable WPS</span>
                <p className="text-[10px] text-[var(--text-muted)]">Disable WPS to protect your network against automated PIN-cracking tools.</p>
              </div>
            </div>
            <div className="glass-card p-4 border border-[var(--border-subtle)] rounded-xl flex gap-3">
              <span className="text-emerald-400 font-bold">✓</span>
              <div>
                <span className="font-bold text-[var(--text-primary)] block">Configure DNS</span>
                <p className="text-[10px] text-[var(--text-muted)]">Configure secure, public Anycast DNS servers to reduce hostname lookup delays.</p>
              </div>
            </div>
            <div className="glass-card p-4 border border-[var(--border-subtle)] rounded-xl flex gap-3">
              <span className="text-emerald-400 font-bold">✓</span>
              <div>
                <span className="font-bold text-[var(--text-primary)] block">Enable Guest Network</span>
                <p className="text-[10px] text-[var(--text-muted)]">Set up an isolated guest network for visitors and smart home IoT appliances.</p>
              </div>
            </div>
            <div className="glass-card p-4 border border-[var(--border-subtle)] rounded-xl flex gap-3">
              <span className="text-emerald-400 font-bold">✓</span>
              <div>
                <span className="font-bold text-[var(--text-primary)] block">Update Firmware</span>
                <p className="text-[10px] text-[var(--text-muted)]">Install the latest firmware updates to apply security patches and performance fixes.</p>
              </div>
            </div>
            <div className="glass-card p-4 border border-[var(--border-subtle)] rounded-xl flex gap-3 col-span-1 sm:col-span-2">
              <span className="text-emerald-400 font-bold">✓</span>
              <div>
                <span className="font-bold text-[var(--text-primary)] block">Backup Configuration</span>
                <p className="text-[10px] text-[var(--text-muted)]">Export your settings to a local file so you can quickly restore configuration states if needed.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================
            FEEDBACK ADDITION 5: ROUTER SETTINGS MISTAKES
            ========================================== */}
        <section className="prose prose-invert max-w-none space-y-4">
          <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-1.5">
            <AlertTriangle size={16} className="text-amber-400" />
            Most Common Router Settings Mistakes to Avoid
          </h2>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            When configuring your router settings, watch out for these common configuration mistakes:
          </p>
          <div className="space-y-4 text-xs text-[var(--text-secondary)]">
            <div className="p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-1">
              <span className="font-bold text-[var(--text-primary)] block">1. Setting the Wrong MTU (Maximum Transmission Unit) Value</span>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                The MTU setting controls the maximum packet size allowed on your network. The standard MTU for Ethernet networks is 1500 bytes. Configuring an incorrect MTU value can cause packet fragmentation, high latency, or connection drops. Do not change this setting unless instructed by your ISP.
              </p>
            </div>
            <div className="p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-1">
              <span className="font-bold text-[var(--text-primary)] block">2. Incorrect DNS Server Configuration</span>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                Typing an incorrect IP address in the DNS settings fields will block your devices from resolving hostnames, preventing web pages from loading. Always verify the DNS IPs (e.g. 1.1.1.1 or 8.8.8.8) before saving your settings.
              </p>
            </div>
            <div className="p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-1">
              <span className="font-bold text-[var(--text-primary)] block">3. Leaving UPnP Enabled</span>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                Leaving UPnP enabled exposes your local network to security threats by allowing devices and applications to open ports automatically. Manually configure port forwarding rules instead for optimal security.
              </p>
            </div>
            <div className="p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-1">
              <span className="font-bold text-[var(--text-primary)] block">4. Creating a Double NAT Conflict</span>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                Connecting a second router directly to your ISP modem-router gateway without configuring it to Bridge Mode creates a Double NAT conflict. This results in two firewalls running in series, which blocks port forwarding rules.
              </p>
            </div>
            <div className="p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-1">
              <span className="font-bold text-[var(--text-primary)] block">5. Over-allocating QoS Priority Profiles</span>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                Prioritizing too many devices in your QoS settings page reduces the effectiveness of the prioritization. Prioritize only latency-sensitive devices (such as gaming consoles or PCs) to ensure QoS works correctly.
              </p>
            </div>
            <div className="p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-1">
              <span className="font-bold text-[var(--text-primary)] block">6. Hiding Your Wi-Fi Network Name (SSID)</span>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                Hiding your SSID does not improve security. Hackers can easily detect hidden networks by scanning wireless packets, while client devices waste battery searching for the hidden network name. Keep your SSID visible and use strong WPA3/WPA2 encryption instead.
              </p>
            </div>
          </div>
        </section>

        {/* ==========================================
            SECTION 11: FIRMWARE UPGRADES
            ========================================== */}
        <section className="prose prose-invert max-w-none space-y-4">
          <h2 className="text-base font-bold text-[var(--text-primary)]">Firmware Updates & Router Maintenance Settings</h2>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Your router's firmware is the operating system that runs the hardware. Router manufacturers regularly release firmware updates to patch security vulnerabilities, resolve bugs, and optimize wireless speeds.
          </p>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            To update your router's firmware:
          </p>
          <div className="border-l-4 border-[var(--brand-500)] pl-4 py-2 space-y-2 text-xs text-[var(--text-secondary)] bg-[var(--bg-elevated)] rounded-r-xl">
            <ol className="list-decimal pl-5 space-y-1">
              <li>Log in to your router settings panel and navigate to the <strong>System Tools</strong>, <strong>Administration</strong>, or <strong>Firmware Update</strong> tab.</li>
              <li>Click <strong>Check for Updates</strong>. If your router supports automatic updates, enable this feature to update automatically during off-peak hours.</li>
              <li>If your router requires manual updates, go to the manufacturer's official support website, download the firmware file for your router model, upload it to the firmware update page, and click <strong>Upgrade</strong>.</li>
              <li>Wait for the update to complete. Do not power off the router during the update process, as this can corrupt the firmware and damage the device.</li>
            </ol>
          </div>
        </section>

        {/* ==========================================
            SECTION 12: ADVANCED DHCP, MTU, AND UPNP
            ========================================== */}
        <section className="prose prose-invert max-w-none space-y-4">
          <h2 className="text-base font-bold text-[var(--text-primary)]">Advanced Settings: DHCP, MTU, and UPnP</h2>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            For advanced users, these settings allow further customization of network traffic:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-xs text-[var(--text-muted)]">
            <li>
              <strong>DHCP Address Reservations:</strong> The DHCP server dynamically assigns IP addresses to devices on your network. To prevent devices (such as servers or printers) from changing IP addresses, assign a static IP reservation using the device's MAC address.
            </li>
            <li>
              <strong>MTU (Maximum Transmission Unit):</strong> The MTU setting specifies the maximum size of data packets allowed on your network. The default MTU for Ethernet networks is 1500 bytes. Do not adjust this setting unless instructed by your ISP.
            </li>
            <li>
              <strong>UPnP (Universal Plug and Play):</strong> Keep UPnP disabled for security reasons, and manually configure port forwarding rules instead.
            </li>
          </ul>
        </section>

        {/* ==========================================
            SECTION 13: TROUBLESHOOTING COMMON PROBLEMS
            ========================================== */}
        <section className="prose prose-invert max-w-none space-y-4">
          <h2 className="text-base font-bold text-[var(--text-primary)]">Troubleshooting Common Router Settings Issues</h2>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            If you run into issues after modifying your router settings, follow the troubleshooting steps below:
          </p>
          <div className="space-y-4 text-xs text-[var(--text-secondary)]">
            <div className="p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-2">
              <span className="font-semibold text-[var(--text-primary)] flex items-center gap-1">
                <HelpCircle size={14} className="text-cyan-400" /> Configurations and Settings Do Not Save
              </span>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                If the settings page fails to save changes, this can occur due to browser scripting conflicts, ad-blocker interference, or using an incompatible browser. Try temporarily disabling your ad-blocker, clearing browser cache, or using a private browsing window. Ensure your router's power supply is connected securely and is not restarting during configuration.
              </p>
            </div>
            <div className="p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-2">
              <span className="font-semibold text-[var(--text-primary)] flex items-center gap-1">
                <HelpCircle size={14} className="text-cyan-400" /> IP Address Conflicts or Local Network Drops
              </span>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                If devices lose connection after you adjust IP configurations, verify that the router's DHCP server IP range is configured correctly and does not overlap with static IP addresses you have assigned manually. Ensure no other DHCP servers are active on your local network.
              </p>
            </div>
            <div className="p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-2">
              <span className="font-semibold text-[var(--text-primary)] flex items-center gap-1">
                <HelpCircle size={14} className="text-cyan-400" /> Locked Out of the Admin Console After Password Change
              </span>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                If you forget your administrator password or get locked out of the admin console, you must perform a hard factory reset. Locate the reset button on the back of the router, hold it down with a paperclip for 10-15 seconds, and release. This restores the router to its factory default settings, allowing you to log in using the default credentials.
              </p>
            </div>
          </div>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            If you need to perform a factory reset, read our <Link href="/router-reset" className="text-[var(--brand-400)] hover:underline">How to Reset Router Guide</Link>. To troubleshoot wireless drops, view our guides: <Link href="/wifi-keeps-disconnecting" className="text-[var(--brand-400)] hover:underline">WiFi Keeps Disconnecting</Link> and <Link href="/router-keeps-disconnecting" className="text-[var(--brand-400)] hover:underline">Router Keeps Disconnecting</Link>.
          </p>
        </section>

        {/* ==========================================
            SECTION 19: RELATED GUIDES
            ========================================== */}
        <section className="p-5 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-4">
          <span className="font-bold text-[var(--text-primary)] block text-xs flex items-center gap-1.5">
            <FileText size={14} className="text-[var(--brand-400)]" /> Internal Configuration Resource Hub
          </span>
          <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
            Browse our other guides for advanced configurations, gaming optimizations, and network troubleshooting:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-[11px]">
            <Link href="/router-login" className="p-2.5 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-lg text-[var(--text-secondary)] hover:text-[var(--brand-400)] hover:border-[var(--brand-800)] transition-all">
              <strong>How to Log In to Router</strong>
            </Link>
            <Link href="/router-admin" className="p-2.5 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-lg text-[var(--text-secondary)] hover:text-[var(--brand-400)] hover:border-[var(--brand-800)] transition-all">
              <strong>Admin Access Guide</strong>
            </Link>
            <Link href="/router-password" className="p-2.5 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-lg text-[var(--text-secondary)] hover:text-[var(--brand-400)] hover:border-[var(--brand-800)] transition-all">
              <strong>Router Password Recovery</strong>
            </Link>
            <Link href="/router-reset" className="p-2.5 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-lg text-[var(--text-secondary)] hover:text-[var(--brand-400)] hover:border-[var(--brand-800)] transition-all">
              <strong>How to Reset Router</strong>
            </Link>
            <Link href="/change-wifi-password" className="p-2.5 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-lg text-[var(--text-secondary)] hover:text-[var(--brand-400)] hover:border-[var(--brand-800)] transition-all">
              <strong>Change WiFi Password</strong>
            </Link>
            <Link href="/how-to-change-dns-on-router" className="p-2.5 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-lg text-[var(--text-secondary)] hover:text-[var(--brand-400)] hover:border-[var(--brand-800)] transition-all">
              <strong>Change DNS on Router</strong>
            </Link>
            <Link href="/best-dns-for-faster-internet" className="p-2.5 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-lg text-[var(--text-secondary)] hover:text-[var(--brand-400)] hover:border-[var(--brand-800)] transition-all">
              <strong>Best DNS for Speed</strong>
            </Link>
            <Link href="/best-dns-for-gaming" className="p-2.5 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-lg text-[var(--text-secondary)] hover:text-[var(--brand-400)] hover:border-[var(--brand-800)] transition-all">
              <strong>Best DNS for Gaming</strong>
            </Link>
            <Link href="/best-qos-settings-for-gaming" className="p-2.5 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-lg text-[var(--text-secondary)] hover:text-[var(--brand-400)] hover:border-[var(--brand-800)] transition-all">
              <strong>Best QoS Settings</strong>
            </Link>
            <Link href="/gaming-network-optimization" className="p-2.5 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-lg text-[var(--text-secondary)] hover:text-[var(--brand-400)] hover:border-[var(--brand-800)] transition-all">
              <strong>Gaming Network Optimization</strong>
            </Link>
            <Link href="/port-forwarding-guide" className="p-2.5 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-lg text-[var(--text-secondary)] hover:text-[var(--brand-400)] hover:border-[var(--brand-800)] transition-all">
              <strong>Port Forwarding Guide</strong>
            </Link>
            <Link href="/port-forwarding-not-working" className="p-2.5 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-lg text-[var(--text-secondary)] hover:text-[var(--brand-400)] hover:border-[var(--brand-800)] transition-all">
              <strong>Port Forwarding Fixes</strong>
            </Link>
            <Link href="/nat-type-strict" className="p-2.5 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-lg text-[var(--text-secondary)] hover:text-[var(--brand-400)] hover:border-[var(--brand-800)] transition-all">
              <strong>Strict NAT Type Fixes</strong>
            </Link>
            <Link href="/open-nat-type" className="p-2.5 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-lg text-[var(--text-secondary)] hover:text-[var(--brand-400)] hover:border-[var(--brand-800)] transition-all">
              <strong>Open NAT Type Setup</strong>
            </Link>
          </div>
        </section>

      </div>
    </TroubleshootingArticleShell>
  );
}
