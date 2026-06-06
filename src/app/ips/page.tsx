import type { Metadata } from "next";
import Link from "next/link";
import { Link2, Info } from "lucide-react";
import TroubleshootingArticleShell from "@/components/tools/TroubleshootingArticleShell";
import { buildMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/lib/seo/schema";
import { APP_URL } from "@/lib/constants";

// ---- SEO Metadata ----
export const metadata: Metadata = buildMetadata({
  title: "Router IP Addresses Directory (192.168.1.1, 192.168.0.1 & More)",
  description:
    "Browse the most common router IP addresses including 192.168.1.1, 192.168.0.1, 10.0.0.1, and more. Learn how to access your router login page, change settings, and troubleshoot connection issues.",
  canonical: "/ips",
  keywords: [
    "router ip address",
    "default gateway",
    "192.168.1.1",
    "192.168.0.1",
    "10.0.0.1",
    "router login",
    "router admin page",
    "find router ip",
    "default router ip",
  ],
});

export default async function IpDirectoryPage() {
  const breadcrumbs = [{ name: "IP Addresses", url: "/ips" }];

  // ---- Structured Data (JSON-LD) ----
  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${APP_URL}/ips#webpage`,
    "url": `${APP_URL}/ips`,
    "name": "Router IP Addresses Directory (192.168.1.1, 192.168.0.1 & More)",
    "description": "Browse the most common router IP addresses including 192.168.1.1, 192.168.0.1, 10.0.0.1, and more. Learn how to access your router login page, change settings, and troubleshoot connection issues.",
    "about": {
      "@type": "Thing",
      "name": "Router IP Addresses",
    },
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${APP_URL}/ips#itemlist`,
    "name": "Popular Router IP Guides",
    "numberOfItems": 5,
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@type": "WebPage",
          "name": "192.168.1.1 Router Login Guide",
          "url": `${APP_URL}/ips/192-168-1-1`,
        },
      },
      {
        "@type": "ListItem",
        "position": 2,
        "item": {
          "@type": "WebPage",
          "name": "192.168.0.1 Router Login Guide",
          "url": `${APP_URL}/ips/192-168-0-1`,
        },
      },
      {
        "@type": "ListItem",
        "position": 3,
        "item": {
          "@type": "WebPage",
          "name": "10.0.0.1 Router Login Guide",
          "url": `${APP_URL}/ips/10-0-0-1`,
        },
      },
      {
        "@type": "ListItem",
        "position": 4,
        "item": {
          "@type": "WebPage",
          "name": "192.168.100.1 Router Login Guide",
          "url": `${APP_URL}/ips/192-168-100-1`,
        },
      },
      {
        "@type": "ListItem",
        "position": 5,
        "item": {
          "@type": "WebPage",
          "name": "192.168.8.1 Router Login Guide",
          "url": `${APP_URL}/ips/192-168-8-1`,
        },
      },
    ],
  };

  const faqs = [
    {
      question: "What is a default gateway?",
      answer: "A default gateway is the node or device on a computer network that serves as an access point to another network or the internet. In home setups, your wireless router serves as the default gateway.",
    },
    {
      question: "How do I find my router IP?",
      answer: "On Windows, type 'ipconfig' in Command Prompt and check the Default Gateway. On macOS, run 'netstat -nr' in Terminal. On Linux, run 'ip route'. On iOS/Android devices, tap the information button next to your connected Wi-Fi network.",
    },
    {
      question: "Why does 192.168.1.1 not work?",
      answer: "If 192.168.1.1 fails to load, you might not be connected to the router network, or your router may use a different gateway subnet like 192.168.0.1, 10.0.0.1, or 192.168.8.1. Active VPNs and proxy services can also block admin panel connections.",
    },
    {
      question: "What is routerlogin.net?",
      answer: "Routerlogin.net is a local domain name configuration used by Netgear routers. When typed into a browser connected to a Netgear router, it automatically redirects you to the router's local admin IP address (typically 192.168.1.1).",
    },
    {
      question: "Is 192.168.0.1 safe?",
      answer: "Yes, 192.168.0.1 is a standard private IP address reserved for local area networks under RFC 1918. It is completely safe. However, always secure the configuration panel by changing the default administrator password.",
    },
    {
      question: "How do I change my Wi-Fi password?",
      answer: "Login to your router's admin page by entering its IP in a browser, navigate to the Wireless Settings or Security section, input a new Wi-Fi key/password under the WPA2/WPA3 settings, and save/apply changes.",
    },
    {
      question: "Should I use WPA3?",
      answer: "Yes, WPA3 (Wi-Fi Protected Access 3) provides significantly stronger encryption than WPA2, offering robust protection against brute-force attacks and securing local device transmissions. Enable WPA3 if your router and client devices support it.",
    },
    {
      question: "How often should I update firmware?",
      answer: "You should check for and update your router's firmware every 3 to 6 months. Keeping firmware updated patches security vulnerabilities, fixes bugs, and can optimize overall Wi-Fi performance and range.",
    },
    {
      question: "Can I access my router remotely?",
      answer: "Yes, many routers support remote management settings. However, for network security, it is highly recommended to keep remote management disabled to prevent unauthorized external access from the public internet.",
    },
    {
      question: "What happens if I reset my router?",
      answer: "Performing a factory reset clears all custom configuration settings, restoring your router back to its default factory settings. This resets the Wi-Fi SSID, password, admin credentials, and routing tables to defaults.",
    },
  ];

  const troubleshootingSteps = [
    {
      title: "Confirm Local Network Connection",
      description: "Verify that your device is actively connected to your router's Wi-Fi network or connected directly using an Ethernet cable.",
      tip: "You cannot access local private subnets if you are only connected to cellular data.",
    },
    {
      title: "Launch a Web Browser",
      description: "Open any standard, updated browser (Chrome, Safari, Firefox, or Edge) on your connected device.",
    },
    {
      title: "Input the Router IP",
      description: "Clear the browser's address bar completely, type your router's default IP address (e.g., 192.168.1.1), and press Enter.",
      tip: "Do not append 'www' or '.com'. Just type the raw numeric IP separated by periods.",
    },
    {
      title: "Enter Admin Credentials",
      description: "When the router login page appears, input the default administrative username and password found on the router's physical sticker.",
    },
  ];

  const quickFixChecklist = [
    "Change the default administrative login password",
    "Enable WPA3 network encryption protocol",
    "Disable WPS (Wi-Fi Protected Setup) PIN access",
    "Update router firmware to the newest stable version",
    "Configure a separate Guest Network for IoT smart devices",
    "Enable automatic security updates if supported",
  ];

  return (
    <>
      <JsonLd data={collectionPageSchema} />
      <JsonLd data={itemListSchema} />

      <TroubleshootingArticleShell
        h1="Router IP Address Directory"
        intro="Find router login IP addresses, default gateways, setup instructions, troubleshooting guides, and security recommendations for every major router platform."
        category="wifi"
        breadcrumbs={breadcrumbs}
        faqs={faqs}
        troubleshootingSteps={troubleshootingSteps}
        quickFixChecklist={quickFixChecklist}
        severityLevel="low"
      >
        {/* Section 1: Featured Snippet Table */}
        <div className="mb-10 p-6 glass-card border border-[var(--border-subtle)] rounded-2xl">
          <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
            <Info size={18} className="text-[var(--brand-400)]" />
            Quick Reference: Router Brand Default IPs
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-sm">
              <thead>
                <tr className="text-[var(--text-primary)] font-semibold text-left">
                  <th className="pb-3 pr-4">Router Brand</th>
                  <th className="pb-3 px-4">Default IP Address</th>
                  <th className="pb-3 pl-4">Alternative URL Address</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)] text-[var(--text-secondary)]">
                <tr>
                  <td className="py-2.5 pr-4 font-bold text-[var(--text-primary)]">TP-Link</td>
                  <td className="py-2.5 px-4 font-mono">192.168.0.1</td>
                  <td className="py-2.5 pl-4 font-mono text-[var(--brand-400)]">tplinkwifi.net</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-bold text-[var(--text-primary)]">ASUS</td>
                  <td className="py-2.5 px-4 font-mono">192.168.1.1</td>
                  <td className="py-2.5 pl-4 font-mono text-[var(--brand-400)]">router.asus.com</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-bold text-[var(--text-primary)]">Huawei</td>
                  <td className="py-2.5 px-4 font-mono">192.168.8.1</td>
                  <td className="py-2.5 pl-4 font-mono text-[var(--brand-400)]">huaweiwifi.com / 192.168.3.1</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-bold text-[var(--text-primary)]">Netgear</td>
                  <td className="py-2.5 px-4 font-mono">192.168.1.1</td>
                  <td className="py-2.5 pl-4 font-mono text-[var(--brand-400)]">routerlogin.net</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-bold text-[var(--text-primary)]">D-Link</td>
                  <td className="py-2.5 px-4 font-mono">192.168.0.1</td>
                  <td className="py-2.5 pl-4 font-mono text-[var(--brand-400)]">dlinkrouter.local</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-bold text-[var(--text-primary)]">Xiaomi</td>
                  <td className="py-2.5 px-4 font-mono">192.168.31.1</td>
                  <td className="py-2.5 pl-4 font-mono text-[var(--brand-400)]">miwifi.com</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 2: Popular Router IP Addresses Cards */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-5">Popular Router Gateway Guides</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                ip: "192.168.1.1",
                slug: "192-168-1-1",
                brands: "ASUS, Netgear, Linksys",
                desc: "The global standard default gateway IP address for home wireless routers."
              },
              {
                ip: "192.168.0.1",
                slug: "192-168-0-1",
                brands: "TP-Link, D-Link",
                desc: "Highly popular default local subnet gateway IP used by consumer models."
              },
              {
                ip: "10.0.0.1",
                slug: "10-0-0-1",
                brands: "Comcast, Xfinity",
                desc: "Common private address space configured for business networks and ISP modems."
              },
              {
                ip: "192.168.100.1",
                slug: "192-168-100-1",
                brands: "Motorola, Zoom, Arris",
                desc: "Standard management IP reserved for cable and DSL broadband modems."
              },
              {
                ip: "192.168.8.1",
                slug: "192-168-8-1",
                brands: "Huawei, MiFi",
                desc: "Gateway address widely assigned to cellular modems and Huawei routers."
              }
            ].map((card) => (
              <Link
                key={card.ip}
                href={`/ips/${card.slug}`}
                className="glass-card p-5 hover:border-[var(--border-strong)] hover:bg-[var(--bg-hover)] hover:-translate-y-0.5 transition-all duration-[var(--transition-base)] group block"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-base font-bold text-[var(--brand-400)] group-hover:underline">
                    {card.ip}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-[var(--text-muted)] tracking-wider">
                    Guide →
                  </span>
                </div>
                <div className="text-xs font-semibold text-[var(--text-primary)] mb-1">
                  Brands: {card.brands}
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {card.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Section 3: What Is a Router IP Address? (400-600 words) */}
        <div className="mb-10 prose-dark">
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3">What Is a Router IP Address?</h2>
          <p>
            A router IP address is a unique identifier assigned to a router on a computer network. In home and office environments, this address typically refers to the router&apos;s Local Area Network (LAN) IP, which also functions as the network&apos;s Default Gateway. The default gateway acts as the central traffic controller, routing requests from your local devices (smartphones, laptops, smart TVs) out to the global internet and directing incoming data packets back to the correct device.
          </p>
          <p>
            Unlike public IP addresses that identify your network connection on the global internet (the Wide Area Network or WAN IP), router IP addresses are chosen from designated Private Address Spaces. As defined by the RFC 1918 standard, private IP address ranges—such as 192.168.x.x, 10.x.x.x, and 172.16.x.x to 172.31.x.x—are reserved exclusively for local networks and cannot be routed on the public internet. This design choice prevents IP address exhaustion and ensures security since local devices are shielded behind the router&apos;s public-facing WAN interface.
          </p>
          <p>
            The router&apos;s LAN IP address serves as the host address for the router&apos;s web-based administration console. By typing this private IP address directly into any web browser on a connected device, users can access the administrative configuration panel. This interface provides control over vital network settings, including Wi-Fi security protocols, port forwarding configurations, parental controls, dynamic DNS providers, and firewall rules.
          </p>
          <p>
            Managing these local IP addresses is the Dynamic Host Configuration Protocol (DHCP) server built directly into your router. When a client device connects to your Wi-Fi network, the DHCP server dynamically leases a unique private IP address from a pre-defined subnet pool (for example, assigning 192.168.1.50 to a laptop when the router itself is at 192.168.1.1). The DHCP server also conveys routing information, automatically telling the client device that the router&apos;s LAN IP is its gateway, ensuring seamless local communication and reliable routing to the internet.
          </p>
          <p>
            To connect local devices to the external web, the router employs a technique called Network Address Translation (NAT). NAT translates the private IP addresses of your internal devices into a single public WAN IP address provided by your Internet Service Provider (ISP). When a web server responds, the router translates that public address back to the requesting device&apos;s private LAN IP. This process allows dozens of household devices to share a single internet subscription while remaining hidden from direct external scans.
          </p>
          <p>
            Subnetting plays a crucial role in how private IP addresses behave. Subnet masks like 255.255.255.0 define the size of the local network segment. On a standard home network, this mask ensures that all devices must share the same first three octets of the IP address (e.g., 192.168.1.x) to communicate directly with each other without routing. If a device has an incorrectly configured subnet mask or static IP, it will fail to reach the gateway, resulting in an offline status even if the physical cable or Wi-Fi connection is solid. Understanding these concepts helps you troubleshoot complex connectivity dropouts.
          </p>
        </div>

        {/* Section 4: How To Find Your Router IP Address */}
        <div className="mb-10 glass-card p-6 border border-[var(--border-subtle)] rounded-2xl">
          <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4">How to Find Your Router Gateway IP</h2>
          <div className="space-y-4 text-sm">
            <div>
              <h3 className="font-bold text-[var(--text-primary)] mb-1">Windows</h3>
              <p className="text-[var(--text-secondary)] text-xs mb-1">Open Command Prompt, enter the following command, and look for the Default Gateway:</p>
              <pre className="font-mono text-xs text-[var(--brand-300)] bg-[var(--bg-base)] p-2 rounded border border-[var(--border-subtle)]">
                ipconfig
              </pre>
            </div>
            <div>
              <h3 className="font-bold text-[var(--text-primary)] mb-1">Linux</h3>
              <p className="text-[var(--text-secondary)] text-xs mb-1">Open your Terminal, enter the routing route command, and view the gateway column:</p>
              <pre className="font-mono text-xs text-[var(--brand-300)] bg-[var(--bg-base)] p-2 rounded border border-[var(--border-subtle)]">
                ip route
              </pre>
            </div>
            <div>
              <h3 className="font-bold text-[var(--text-primary)] mb-1">macOS</h3>
              <p className="text-[var(--text-secondary)] text-xs mb-1">Open Terminal, run the network statistics command to display routing gateways:</p>
              <pre className="font-mono text-xs text-[var(--brand-300)] bg-[var(--bg-base)] p-2 rounded border border-[var(--border-subtle)]">
                netstat -nr
              </pre>
            </div>
            <div>
              <h3 className="font-bold text-[var(--text-primary)] mb-1">Android</h3>
              <p className="text-[var(--text-secondary)] text-xs">
                Navigate to <strong>Settings</strong> &gt; <strong>Network &amp; Internet</strong> &gt; <strong>Wi-Fi</strong>. Tap the gear configuration icon next to your network connection and locate the gateway address.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-[var(--text-primary)] mb-1">iPhone (iOS)</h3>
              <p className="text-[var(--text-secondary)] text-xs">
                Go to <strong>Settings</strong> &gt; <strong>Wi-Fi</strong>. Tap the blue info (i) icon next to your connected network. Scroll down to IPv4 Configuration to find the address listed next to <strong>Router</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* Section 5: Most Common Router Login Addresses Table */}
        <div className="mb-10 p-6 glass-card border border-[var(--border-subtle)] rounded-2xl">
          <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4">Most Common Router Login Addresses</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-sm">
              <thead>
                <tr className="text-[var(--text-primary)] font-semibold text-left">
                  <th className="pb-3 pr-4">Address</th>
                  <th className="pb-3 px-4">Primary Vendors</th>
                  <th className="pb-3 px-4">Use Case</th>
                  <th className="pb-3 pl-4">Popularity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)] text-[var(--text-secondary)]">
                <tr>
                  <td className="py-2.5 pr-4 font-bold font-mono text-[var(--text-primary)]">192.168.1.1</td>
                  <td className="py-2.5 px-4">ASUS, Netgear, Linksys, TP-Link</td>
                  <td className="py-2.5 px-4">Consumer Router Gateway</td>
                  <td className="py-2.5 pl-4 font-medium text-emerald-400">Extreme (Standard)</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-bold font-mono text-[var(--text-primary)]">192.168.0.1</td>
                  <td className="py-2.5 px-4">TP-Link, D-Link, Tenda</td>
                  <td className="py-2.5 px-4">Consumer Router Gateway</td>
                  <td className="py-2.5 pl-4 font-medium text-emerald-400">High</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-bold font-mono text-[var(--text-primary)]">10.0.0.1</td>
                  <td className="py-2.5 px-4">Comcast (Xfinity), Cisco, Apple</td>
                  <td className="py-2.5 px-4">ISP Gateway / Enterprise Networks</td>
                  <td className="py-2.5 pl-4 font-medium text-cyan-400">Medium-High</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-bold font-mono text-[var(--text-primary)]">192.168.100.1</td>
                  <td className="py-2.5 px-4">Motorola, Arris, Netgear (Modems)</td>
                  <td className="py-2.5 px-4">Broadband Cable/Fiber Modems</td>
                  <td className="py-2.5 pl-4 font-medium text-cyan-400">Medium</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-bold font-mono text-[var(--text-primary)]">192.168.8.1</td>
                  <td className="py-2.5 px-4">Huawei, Mobile WiFi Hotspots</td>
                  <td className="py-2.5 px-4">4G/5G Cellular Gateway Modems</td>
                  <td className="py-2.5 pl-4 font-medium text-amber-500">Regional</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-bold font-mono text-[var(--text-primary)]">192.168.31.1</td>
                  <td className="py-2.5 px-4">Xiaomi</td>
                  <td className="py-2.5 px-4">Smart Mi Router Gateway</td>
                  <td className="py-2.5 pl-4 font-medium text-amber-500">Regional</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 6: Router Login Troubleshooting */}
        <div className="mb-10 prose-dark">
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3">Router Login Troubleshooting</h2>
          <p>
            If typing your gateway IP in a browser results in a timeout or loading error, it typically indicates network setting conflicts. Ensure you address the following root issues:
          </p>
          <ul className="space-y-2 text-sm">
            <li>
              <strong>Login Page Not Opening:</strong> Check that your browser isn&apos;t automatically forcing an `https://` prefix if the router admin page only supports unencrypted `http://`.
            </li>
            <li>
              <strong>VPN Interference:</strong> Virtual Private Networks encrypt and tunnel traffic through external servers, blocking local subnet access. Temporarily turn off any corporate or personal VPN clients.
            </li>
            <li>
              <strong>Subnet Conflicts:</strong> If you have chained multiple routers together, ensure the secondary router is configured in AP (Access Point) mode to prevent multiple DHCP servers from handing out conflicting IP addresses.
            </li>
            <li>
              <strong>Browser Cache Issues:</strong> Browsers store cookies that can break router redirect scripts. Try logging in using an Incognito or Private Browsing tab.
            </li>
          </ul>
          <p className="mt-4 text-sm">
            If you still cannot connect, review our detailed guide on{" "}
            <Link href="/router-login-not-working" className="text-[var(--brand-400)] hover:underline font-semibold">
              Router Login Page Not Working
            </Link>{" "}
            or perform a hardware{" "}
            <Link href="/router-reset" className="text-[var(--brand-400)] hover:underline font-semibold">
              Router Reset
            </Link>{" "}
            to restore credentials. Forgotten credentials can also be resolved via{" "}
            <Link href="/router-password-recovery" className="text-[var(--brand-400)] hover:underline font-semibold">
              Router Password Recovery
            </Link>.
          </p>
        </div>

        {/* Section 7: Router Setup Basics */}
        <div className="mb-10 glass-card p-6 border border-[var(--border-subtle)] rounded-2xl">
          <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4">Essential Router Setup Steps</h2>
          <div className="space-y-3.5 text-sm text-[var(--text-secondary)]">
            <div className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-500)] mt-2 flex-shrink-0" />
              <div>
                <strong>Change default Wi-Fi Name (SSID):</strong> Name your SSID uniquely. Avoid listing your home address or router manufacturer name.
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-500)] mt-2 flex-shrink-0" />
              <div>
                <strong>Select Strong Passwords:</strong> Choose a strong, custom Wi-Fi security password containing letters, numbers, and symbols.
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-500)] mt-2 flex-shrink-0" />
              <div>
                <strong>Update Router Firmware:</strong> Download and install official firmware updates to protect ports from hacking vulnerabilities.
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-500)] mt-2 flex-shrink-0" />
              <div>
                <strong>Backup Working Configurations:</strong> Download a copy of your router&apos;s working settings file to speed up recovery.
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-500)] mt-2 flex-shrink-0" />
              <div>
                <strong>Enable WPA3 Security Protocols:</strong> Ensure modern encryption is active on your wireless spectrums.
              </div>
            </div>
          </div>
        </div>

        {/* Section 9: Popular Router Guides Link Hub */}
        <div className="mb-10 p-6 glass-card border border-[var(--border-subtle)] rounded-2xl">
          <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Popular Router Guides</h2>
          <div className="flex flex-wrap gap-2.5">
            {[
              { label: "Router Directory", href: "/routers" },
              { label: "Router Admin Login", href: "/router-login" },
              { label: "Best Router for Gaming", href: "/best-router-for-gaming" },
              { label: "WiFi 6 for Gaming", href: "/wifi-6-for-gaming" },
              { label: "WiFi 7 for Gaming", href: "/wifi-7-for-gaming" },
              { label: "Gaming Network Optimization", href: "/gaming-network-optimization" },
              { label: "Best Router Settings", href: "/best-router-settings-for-gaming" },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-xs bg-[var(--bg-elevated)] border border-[var(--border-subtle)] hover:border-[var(--brand-800)] px-3 py-1.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--brand-400)] hover:bg-[var(--bg-hover)] transition-all font-medium flex items-center gap-1.5"
              >
                <Link2 size={12} className="text-[var(--text-muted)]" />
                {link.label}
              </Link>
            ))}
          </div>
        </div>

      </TroubleshootingArticleShell>
    </>
  );
}
