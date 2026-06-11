import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import TroubleshootingArticleShell from "@/components/tools/TroubleshootingArticleShell";
import { JsonLd } from "@/lib/seo/schema";
import { APP_URL } from "@/lib/constants";
import Link from "next/link";
import { Settings, Info, AlertTriangle, KeyRound, Wifi, Smartphone, Gamepad2, Tv, Shield, HelpCircle, FileText, CheckSquare } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "Port Forwarding Guide: How to Forward Ports on Your Router (2026)",
  description:
    "The definitive authority guide to port forwarding. Learn what port forwarding is, how it works, how to configure rules on TP-Link, ASUS, NETGEAR, D-Link, and Linksys, detect CGNAT, and check open ports.",
  canonical: "/port-forwarding",
  keywords: [
    "port forwarding",
    "what is port forwarding",
    "how to port forward",
    "port forward router",
    "port forwarding guide",
    "open ports router",
    "port forwarding settings",
    "how to port forward for gaming",
    "port mapping vs port triggering",
    "dmz settings router",
    "upnp security risks"
  ],
});

const breadcrumbs = [
  { name: "Router Guides", url: "/routers" },
  { name: "Port Forwarding", url: "/port-forwarding" },
];

const troubleshootingSteps = [
  {
    title: "Assign a Static IP Address to Your Host Device",
    description: "Navigate to your router's DHCP Server settings and configure an IP reservation for your computer, console, or server using its physical MAC address. This prevents IP address changes from breaking your port rules.",
    tip: "You can also configure a static IP directly in the network settings of your Windows, PlayStation, or Xbox client."
  },
  {
    title: "Log In to Your Router's Admin Panel",
    description: "Open a web browser, type your router's default gateway IP address (typically 192.168.1.1 or 192.168.0.1) in the URL bar, and log in with your administrative credentials.",
    tip: "Disable VPNs or proxy profiles that redirect traffic away from local networks."
  },
  {
    title: "Navigate to the Port Forwarding Settings Menu",
    description: "Search the advanced menu options for settings labeled 'Port Forwarding', 'Virtual Server', 'NAT Forwarding', 'Application & Gaming', or 'Port Mapping'.",
    tip: "On modern mesh systems, this configuration is usually located inside the whole-home mobile management app."
  },
  {
    title: "Create a New Port Forwarding Rule",
    description: "Click Add New or Custom Rule. Enter a service name, specify the internal and external port ranges, select the protocol (TCP, UDP, or Both), and enter the static IP of your host device.",
    tip: "To forward a single port, enter the same port number in both the internal and external fields."
  },
  {
    title: "Save Changes and Audit Port Status",
    description: "Save or apply the settings. The router will write the new rules to its NAT translation table. Open your host application, then use an online port checker tool to verify that the target port status is Open.",
    tip: "If the port checker says Closed, check that your local OS firewall is not blocking incoming packets."
  }
];

const faqs = [
  {
    question: "What does port forwarding do?",
    answer: "Port forwarding tells your router's NAT (Network Address Translation) firewall to direct incoming traffic from the internet on specific port numbers to a specific device on your local network. By default, routers block all unsolicited inbound connections. Creating a port forwarding rule tells the router exactly where to send these connections."
  },
  {
    question: "Is port forwarding safe?",
    answer: "Port forwarding carries some security risk because it opens a pathway through your router's firewall, allowing external devices to connect directly to an internal client. If the application listening on that port has security vulnerabilities, hackers can exploit it. To stay safe, disable UPnP, manually configure rules, close ports when not in use, and keep your software updated."
  },
  {
    question: "What ports should I forward for online gaming?",
    answer: "Standard ports for gaming consoles include TCP 3074 and UDP 88, 500, 3074, 3544, 4500 (Xbox Live), and TCP 3478-3480 and UDP 3074, 3478-3479 (PlayStation Network). For PC gaming, ports vary by title, such as Call of Duty (UDP 3074) and Minecraft (TCP/UDP 25565)."
  },
  {
    question: "Why is my port forwarding not working?",
    answer: "This is usually caused by a Double NAT conflict (connecting a personal router to an ISP gateway without Bridge Mode active), being behind Carrier-Grade NAT (CGNAT) where your ISP blocks incoming ports, local Windows or macOS firewalls blocking the application, or your host device's IP changing because it wasn't set as static."
  },
  {
    question: "What is the difference between TCP and UDP protocols?",
    answer: "TCP (Transmission Control Protocol) is a connection-oriented protocol that guarantees packet delivery and order, used for web pages, SSH, and downloads. UDP (User Datagram Protocol) is a connectionless protocol that prioritizes speed over reliability, used for online gaming, video calls, and DNS."
  },
  {
    question: "Can I configure port forwarding without administrative access?",
    answer: "No. Creating port forwarding rules requires administrative access to the router console or companion app. If you do not have administrative access, you cannot configure static port maps. UPnP may open ports automatically if enabled, but this is less secure."
  },
  {
    question: "What is Carrier-Grade NAT (CGNAT) and how does it block port forwarding?",
    answer: "CGNAT is a setup where ISPs share a single public IPv4 address across hundreds of households. In this configuration, your router gets a private WAN IP rather than a public one. Since the public IP is managed by the ISP, inbound packets cannot reach your router, blocking port forwarding. You must request a static IP from your ISP to bypass this."
  },
  {
    question: "Does port forwarding improve my download and upload speeds?",
    answer: "No, port forwarding does not increase your physical bandwidth or ISP internet speeds. However, it can improve network stability, latency (ping), and matchmaking speeds in multiplayer games by allowing direct connections, bypassing firewall delays and packet filtering."
  },
  {
    question: "What is a static IP and why is it required for port forwarding?",
    answer: "A static IP is an IP address that never changes. It is required because port forwarding rules map external ports to a specific internal IP address. If your device's IP changes (which occurs regularly with dynamic DHCP), the port rule will point to the wrong device, breaking the connection."
  },
  {
    question: "Should I use DMZ instead of port forwarding?",
    answer: "No. Enabling DMZ (Demilitarized Zone) forwards all incoming traffic on all 65,535 ports to a single local device. This exposes the target device to public scans and exploits, posing a security risk. Only use DMZ temporarily for troubleshooting purposes."
  }
];

const commonCauses = [
  {
    title: "Double NAT Conflict",
    desc: "Connecting a router to an ISP-provided modem-router gateway creates two active NAT tables, blocking incoming packets before they reach your local router."
  },
  {
    title: "Carrier-Grade NAT (CGNAT)",
    desc: "ISPs sharing a single public IP across multiple households blocks unsolicited inbound traffic from reaching your router gateway."
  },
  {
    title: "Dynamic Host IP Changes",
    desc: "Dynamic DHCP IP assignments cause your host device's IP address to change, rendering static port forwarding rules obsolete."
  },
  {
    title: "Local Firewall Blocks",
    desc: "Windows Defender SPI firewalls or antivirus software blocking unsolicited local socket queries on configured application ports."
  }
];

const quickFixChecklist = [
  "Verify your router WAN IP address matches your public internet IP address.",
  "Configure a static IP reservation for your host device inside DHCP settings.",
  "Create manual port forwarding rules instead of relying on UPnP.",
  "Check that your local Windows Defender firewall allows the application port.",
  "Test port status using an online checker while the application is active."
];

// Custom schemas
const collectionPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${APP_URL}/port-forwarding#collection`,
  "url": `${APP_URL}/port-forwarding`,
  "name": "Port Forwarding Hub: Configuration & Port Reference Guide",
  "description": "The definitive authority resource for configuring, testing, and securing port forwarding configurations. Step-by-step instructions for TP-Link, ASUS, Netgear, D-Link, and Linksys routers.",
  "about": [
    { "@type": "Thing", "name": "Port Forwarding" },
    { "@type": "Thing", "name": "NAT Configuration" },
    { "@type": "Thing", "name": "Open Ports" }
  ]
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${APP_URL}/port-forwarding#topics-list`,
  "name": "Key Port Forwarding Topics",
  "description": "The primary configuration and troubleshooting guides for port routing.",
  "numberOfItems": 6,
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Port Forwarding Guide", "url": `${APP_URL}/port-forwarding-guide` },
    { "@type": "ListItem", "position": 2, "name": "Port Forwarding Troubleshooting", "url": `${APP_URL}/port-forwarding-not-working` },
    { "@type": "ListItem", "position": 3, "name": "Minecraft Port Forwarding", "url": `${APP_URL}/minecraft-port-forwarding` },
    { "@type": "ListItem", "position": 4, "name": "Open NAT Settings", "url": `${APP_URL}/open-nat-type` },
    { "@type": "ListItem", "position": 5, "name": "Strict NAT Solutions", "url": `${APP_URL}/nat-type-strict` },
    { "@type": "ListItem", "position": 6, "name": "Console Optimization", "url": `${APP_URL}/ps5-nat-type-fix` }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "@id": `${APP_URL}/port-forwarding#how-to-configure`,
  "name": "How to Configure Port Forwarding on a Router",
  "description": "Step-by-step guide to log into your router console and open specific ports for gaming, media servers, and remote connections.",
  "totalTime": "PT10M",
  "supply": [
    { "@type": "HowToSupply", "name": "Router Gateway IP" },
    { "@type": "HowToSupply", "name": "Admin Password" }
  ],
  "tool": [
    { "@type": "HowToTool", "name": "Web Browser" },
    { "@type": "HowToTool", "name": "Device MAC Address" }
  ],
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Configure Static IP Address",
      "text": "Navigate to DHCP reservation page or device settings and configure a static IP to keep the address from changing.",
      "url": `${APP_URL}/port-forwarding#step-1`
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Log In to Router Administrative Page",
      "text": "Open a web browser, enter the router's gateway IP (e.g. 192.168.1.1), and log in using admin credentials.",
      "url": `${APP_URL}/port-forwarding#step-2`
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Open Port Forwarding Section",
      "text": "Find settings labeled Virtual Server, Port Forwarding, or NAT Forwarding in the router dashboard.",
      "url": `${APP_URL}/port-forwarding#step-3`
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Define Configuration Rule",
      "text": "Enter port numbers (internal/external), select protocol TCP or UDP, and enter the static IP of your client device.",
      "url": `${APP_URL}/port-forwarding#step-4`
    },
    {
      "@type": "HowToStep",
      "position": 5,
      "name": "Apply Rule and Save",
      "text": "Click Save, Apply, or Submit to write configurations to router memory and update the NAT table.",
      "url": `${APP_URL}/port-forwarding#step-5`
    },
    {
      "@type": "HowToStep",
      "position": 6,
      "name": "Verify Port Status",
      "text": "Start the host application on your client, then use an online port checking tool to verify the port is Open.",
      "url": `${APP_URL}/port-forwarding#step-6`
    }
  ]
};

export default function PortForwardingPage() {
  return (
    <TroubleshootingArticleShell
      h1="Port Forwarding Guide: How to Forward Ports on Your Router (2026)"
      intro="Port forwarding is a key network configuration that allows external devices on the internet to connect to specific devices on your local private network. In this comprehensive guide, learn how port forwarding works, how to configure rules on TP-Link, ASUS, NETGEAR, D-Link, and Linksys routers, how to test port status, and how to troubleshoot common issues like Double NAT and CGNAT."
      category="nat"
      breadcrumbs={breadcrumbs}
      faqs={faqs}
      troubleshootingSteps={troubleshootingSteps}
      warningBanner={{
        title: "Security Advisory: Manual Port Configuration Only",
        text: "Avoid enabling UPnP (Universal Plug and Play) on your router, as it allows malware to open ports without your permission. Manually configure port forwarding rules instead. This keeps you in control of what traffic enters your local area network (LAN)."
      }}
      quickFixChecklist={quickFixChecklist}
      commonCauses={commonCauses}
      whenToContactISP="If you suspect your ISP is using Carrier-Grade NAT (CGNAT) which blocks port forwarding, check your router's WAN IP address. If it falls in the range of 100.64.0.0 to 100.127.255.255, your ISP is using CGNAT. Contact their support line to request a public IPv4 address or ask if they offer static IP options."
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
            <Shield size={14} /> Network Security & NAT Translation Authority
          </div>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            Every device connected to your home network shares a single public IP address assigned by your ISP. To manage this setup, your router uses a process called **Network Address Translation (NAT)**. NAT acts as a coordinator, mapping the local private IP addresses of your devices (like <code>192.168.1.15</code>) to your single public WAN IP.
          </p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            By default, your router's NAT firewall blocks all unsolicited incoming traffic. This protects your network from public scans and security threats. However, this also blocks external servers from establishing connections to devices inside your network. For example, if you want to host a Minecraft server or set up remote desktop access, incoming connections will be blocked by the router.
          </p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            **Port forwarding** resolves this issue by creating a static rule in the router's NAT translation table. This rule tells the router that any incoming traffic on a specific port number should be forwarded directly to a designated device on your local network, bypasses the firewall block, and enables direct connections.
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
            <KeyRound size={12} /> Recommended Port Configurations
          </h2>
          <div className="overflow-x-auto mb-4">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-[11px] text-[var(--text-secondary)]">
              <thead>
                <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                  <th className="px-3 py-2 text-left border-b border-[var(--border-subtle)]">Method</th>
                  <th className="px-3 py-2 text-left border-b border-[var(--border-subtle)]">Mode of Action</th>
                  <th className="px-3 py-2 text-left border-b border-[var(--border-subtle)]">Recommended Use Case</th>
                  <th className="px-3 py-2 text-left border-b border-[var(--border-subtle)]">Security Risk</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)]">
                <tr>
                  <td className="px-3 py-2.5 font-bold text-[var(--text-primary)]">Port Forwarding</td>
                  <td className="px-3 py-2.5">Static map of external port to internal IP.</td>
                  <td className="px-3 py-2.5 font-semibold text-emerald-400">Hosting servers (Minecraft, web), static setups.</td>
                  <td className="px-3 py-2.5">Medium</td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-bold text-[var(--text-primary)]">Port Triggering</td>
                  <td className="px-3 py-2.5">Dynamic port opening triggered by outbound LAN packets.</td>
                  <td className="px-3 py-2.5 font-semibold text-emerald-400">Multiple devices, legacy console applications.</td>
                  <td className="px-3 py-2.5">Low</td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-bold text-[var(--text-primary)]">DMZ</td>
                  <td className="px-3 py-2.5">Forwards all unsolicited inbound traffic to one device.</td>
                  <td className="px-3 py-2.5 font-semibold text-red-400">Temporary debugging, strict firewalls.</td>
                  <td className="px-3 py-2.5">Critical</td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-bold text-[var(--text-primary)]">UPnP</td>
                  <td className="px-3 py-2.5">Automatic protocol-based port forwarding.</td>
                  <td className="px-3 py-2.5 font-semibold text-amber-500">Automated multiplayer matching.</td>
                  <td className="px-3 py-2.5">High</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
            Note: Manually configuring port forwarding rules is the recommended balance of performance and security for hosting home servers and optimizing online gaming.
          </p>
        </section>

        {/* ==========================================
            SECTION 3: WHAT IS PORT FORWARDING & HOW DOES IT WORK?
            ========================================== */}
        <section className="prose prose-invert max-w-none space-y-4">
          <h2 className="text-base font-bold text-[var(--text-primary)]">What is Port Forwarding and How Does It Work?</h2>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            To understand port forwarding, it helps to use a postal system analogy. Your router's public IP address is like the street address of an apartment building, while the port numbers represent individual apartment numbers.
          </p>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            When your computer sends a request to open a website, it sends packets to the router. The router notes your computer's local IP address and the outgoing port, routes the request to the web server, and sends the incoming response back to your computer.
          </p>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            However, if an external device tries to initiate a connection to your computer without a request from you, the router doesn't know where to send those packets. It has no record of the connection in its translation table, so it blocks the packets.
          </p>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Port forwarding manually maps an external port directly to a local IP address. When the router receives traffic on that port, it forwards it to the specified device, allowing direct connections.
          </p>
        </section>

        {/* ==========================================
            SECTION 4: WHY DO YOU NEED PORT FORWARDING?
            ========================================== */}
        <section className="prose prose-invert max-w-none space-y-4">
          <h2 className="text-base font-bold text-[var(--text-primary)]">Why Do You Need Port Forwarding?</h2>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Port forwarding is required for applications that need direct incoming connections. Key use cases include:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-xs text-[var(--text-muted)]">
            <li>
              <strong>Hosting Game Servers:</strong> Hosting multiplayer game servers (like Minecraft, Ark, or Rust) on your PC requires opening port rules to allow external players to connect.
            </li>
            <li>
              <strong>Optimizing Console Latency:</strong> Gaming consoles (like PS5 or Xbox) require specific ports to be open to achieve an **Open NAT** type. A Strict NAT type blocks matchmaking and voice chat, while an Open NAT type improves matchmaking speed.
            </li>
            <li>
              <strong>Accessing Local Hardware:</strong> Accessing local hardware (such as NAS servers, web servers, FTP servers, remote desktops, or IP security cameras) from outside your home network requires port forwarding.
            </li>
          </ul>
        </section>

        {/* ==========================================
            SECTION 5: HOW TO PORT FORWARD
            ========================================== */}
        <section className="prose prose-invert max-w-none space-y-4">
          <h2 className="text-base font-bold text-[var(--text-primary)]">How to Port Forward on Your Router (Step-by-Step)</h2>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            To set up port forwarding on your router, follow these steps:
          </p>
          <div className="border-l-4 border-[var(--brand-500)] pl-4 py-2 space-y-2 text-xs text-[var(--text-secondary)] bg-[var(--bg-elevated)] rounded-r-xl">
            <ol className="list-decimal pl-5 space-y-1.5">
              <li><strong>Assign a Static IP:</strong> Assign a static IP address to your target client device inside the DHCP settings page to prevent IP address changes.</li>
              <li><strong>Find Gateway IP:</strong> Locate your router's default gateway IP address (e.g., <Link href="/ips/192-168-1-1" className="text-[var(--brand-400)] hover:underline">192.168.1.1</Link> or <Link href="/ips/192-168-0-1" className="text-[var(--brand-400)] hover:underline">192.168.0.1</Link>) and enter it into a web browser address bar.</li>
              <li><strong>Log In:</strong> Enter your admin username and password. Check the sticker on the bottom of the router for default credentials. Learn more in our <Link href="/router-admin" className="text-[var(--brand-400)] hover:underline">Router Admin Setup Guide</Link> or recover credentials using our <Link href="/router-password" className="text-[var(--brand-400)] hover:underline">Router Password Guide</Link>.</li>
              <li><strong>Open Port Forwarding:</strong> Go to the Advanced tab and locate the **Port Forwarding**, **Virtual Server**, or **NAT Forwarding** tab.</li>
              <li><strong>Create a Rule:</strong> Enter a name, input internal/external ports (e.g. 25565), select TCP or UDP, and enter the static IP of your host device.</li>
              <li><strong>Save Settings:</strong> Click Save or Apply. The router will write the new rules to its NAT translation table.</li>
            </ol>
          </div>
        </section>

        {/* ==========================================
            SECTION 6: PORT FORWARDING BY ROUTER BRAND
            ========================================== */}
        <section className="prose prose-invert max-w-none space-y-4">
          <h2 className="text-base font-bold text-[var(--text-primary)]" id="brand-settings">Port Forwarding Navigation by Brand</h2>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            The port forwarding menu is located in different sections depending on your router manufacturer. Below are the navigation paths for leading router brands:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[var(--text-secondary)]">
            <div className="p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-1">
              <span className="font-bold text-[var(--text-primary)] block">
                <Link href="/routers/tp-link" className="text-[var(--brand-400)] hover:underline">TP-Link Settings</Link>
              </span>
              <p className="text-[11px] text-[var(--text-muted)]">Navigate to: <strong>Advanced → NAT Forwarding → Virtual Servers</strong>. Click Add to input port rules and device IP.</p>
            </div>
            <div className="p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-1">
              <span className="font-bold text-[var(--text-primary)] block">
                <Link href="/routers/asus" className="text-[var(--brand-400)] hover:underline">ASUS Settings</Link>
              </span>
              <p className="text-[11px] text-[var(--text-muted)]">Navigate to: <strong>WAN → Virtual Server / Port Forwarding</strong>. Toggle Enable Port Forwarding to On, and click Add Profile.</p>
            </div>
            <div className="p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-1">
              <span className="font-bold text-[var(--text-primary)] block">
                <Link href="/routers/netgear" className="text-[var(--brand-400)] hover:underline">NETGEAR Settings</Link>
              </span>
              <p className="text-[11px] text-[var(--text-muted)]">Navigate to: <strong>Advanced → Advanced Setup → Port Forwarding / Port Triggering</strong>. Click Add Custom Service.</p>
            </div>
            <div className="p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-1">
              <span className="font-bold text-[var(--text-primary)] block">
                <Link href="/routers/d-link" className="text-[var(--brand-400)] hover:underline">D-Link Settings</Link>
              </span>
              <p className="text-[11px] text-[var(--text-muted)]">Navigate to: <strong>Advanced → Port Forwarding</strong> or Virtual Server. Click Add Rule to specify details.</p>
            </div>
            <div className="p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-1 col-span-1 sm:col-span-2">
              <span className="font-bold text-[var(--text-primary)] block">
                <Link href="/routers/linksys" className="text-[var(--brand-400)] hover:underline">Linksys Settings</Link>
              </span>
              <p className="text-[11px] text-[var(--text-muted)]">Navigate to: <strong>Security → Apps and Gaming → Single Port Forwarding</strong> (or Port Range Forwarding).</p>
            </div>
          </div>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            If you need help navigating your router's administration panel, read our brand-specific guides or refer to our <Link href="/router-settings" className="text-[var(--brand-400)] hover:underline">Router Settings Guide</Link> for general layout tips.
          </p>
        </section>

        {/* ==========================================
            FEEDBACK ADDITION 1: MOST COMMON PORTS REFERENCE
            ========================================== */}
        <section className="prose prose-invert max-w-none space-y-4">
          <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-1.5">
            <Settings size={16} className="text-[var(--brand-400)]" />
            Most Common Network Ports Reference
          </h2>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Networking applications utilize standard port numbers to communicate. Below is a reference table of the most common ports used for web services, hosting, and remote connections:
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-[11px] text-[var(--text-secondary)]">
              <thead>
                <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                  <th className="px-3 py-2 text-left">Service / Application</th>
                  <th className="px-3 py-2 text-left">Standard Port Number</th>
                  <th className="px-3 py-2 text-left">Protocol Type</th>
                  <th className="px-3 py-2 text-left">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)]">
                <tr>
                  <td className="px-3 py-2.5 font-semibold text-[var(--text-primary)]">HTTP</td>
                  <td className="px-3 py-2.5 font-mono">80</td>
                  <td className="px-3 py-2.5 font-mono">TCP</td>
                  <td className="px-3 py-2.5">Standard unencrypted web page transfer.</td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-semibold text-[var(--text-primary)]">HTTPS</td>
                  <td className="px-3 py-2.5 font-mono">443</td>
                  <td className="px-3 py-2.5 font-mono">TCP</td>
                  <td className="px-3 py-2.5">Secure, encrypted web page transfer.</td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-semibold text-[var(--text-primary)]">Minecraft Java Edition</td>
                  <td className="px-3 py-2.5 font-mono">25565</td>
                  <td className="px-3 py-2.5 font-mono">TCP / UDP</td>
                  <td className="px-3 py-2.5">Default port to host a local Minecraft game server.</td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-semibold text-[var(--text-primary)]">FTP (File Transfer Protocol)</td>
                  <td className="px-3 py-2.5 font-mono">21</td>
                  <td className="px-3 py-2.5 font-mono">TCP</td>
                  <td className="px-3 py-2.5">File transfers to NAS or local storage servers.</td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-semibold text-[var(--text-primary)]">SSH (Secure Shell)</td>
                  <td className="px-3 py-2.5 font-mono">22</td>
                  <td className="px-3 py-2.5 font-mono">TCP</td>
                  <td className="px-3 py-2.5">Secure remote server command line access.</td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-semibold text-[var(--text-primary)]">RDP (Remote Desktop Protocol)</td>
                  <td className="px-3 py-2.5 font-mono">3389</td>
                  <td className="px-3 py-2.5 font-mono">TCP / UDP</td>
                  <td className="px-3 py-2.5">Windows Remote Desktop connection access.</td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-semibold text-[var(--text-primary)]">PlayStation Network (PSN)</td>
                  <td className="px-3 py-2.5 font-mono">3478 - 3480</td>
                  <td className="px-3 py-2.5 font-mono">TCP</td>
                  <td className="px-3 py-2.5">Connection ports for PlayStation lobby matchmaking.</td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-semibold text-[var(--text-primary)]">Xbox Live</td>
                  <td className="px-3 py-2.5 font-mono">3074</td>
                  <td className="px-3 py-2.5 font-mono">TCP / UDP</td>
                  <td className="px-3 py-2.5">Primary connection port for Xbox gaming lobbies.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ==========================================
            FEEDBACK ADDITION 2: HOW TO CHECK IF A PORT IS OPEN
            ========================================== */}
        <section className="prose prose-invert max-w-none space-y-4">
          <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-1.5">
            <Wifi size={16} className="text-[var(--brand-400)]" />
            How to Check if a Port is Open (Testing Port Status)
          </h2>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            After configuring your port forwarding rules, check that the port is open and listening. You can verify this using local command-line utilities or online port checker tools:
          </p>
          <div className="space-y-4 text-xs text-[var(--text-secondary)]">
            <div className="p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-2">
              <span className="font-bold text-[var(--text-primary)] block">Method 1: Windows PowerShell (Test-NetConnection)</span>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                Open PowerShell as Administrator and run the following command to test if a port is open on a target IP address:
              </p>
              <pre className="bg-[var(--bg-surface)] p-2 rounded text-[10px] font-mono border border-[var(--border-subtle)] text-[var(--text-primary)]">
                Test-NetConnection -ComputerName 192.168.1.15 -Port 25565
              </pre>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                Check the line labeled **TcpTestSucceeded**. If it says **True**, the port is open and listening.
              </p>
            </div>
            <div className="p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-2">
              <span className="font-bold text-[var(--text-primary)] block">Method 2: Command Prompt / Terminal (Telnet)</span>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                You can use Telnet in Command Prompt (Windows) or Terminal (macOS/Linux) to test if a port is open:
              </p>
              <pre className="bg-[var(--bg-surface)] p-2 rounded text-[10px] font-mono border border-[var(--border-subtle)] text-[var(--text-primary)]">
                telnet 192.168.1.15 25565
              </pre>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                If the screen goes blank or connects, the port is open. If you see a connection error, the port is closed.
              </p>
            </div>
            <div className="p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-2">
              <span className="font-bold text-[var(--text-primary)] block">Method 3: Netcat Utility (nc Command)</span>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                On macOS, Linux, or Windows (with Git Bash/WSL), use Netcat to scan a port:
              </p>
              <pre className="bg-[var(--bg-surface)] p-2 rounded text-[10px] font-mono border border-[var(--border-subtle)] text-[var(--text-primary)]">
                nc -zv 192.168.1.15 25565
              </pre>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                If the scan is successful, the terminal will return `Connection to port [open]`.
              </p>
            </div>
          </div>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Note: For testing, the host application (like your Minecraft server or remote desktop) must be running. If the application is closed, the port checker will show the port as **Closed** because no application is active to respond to the connection request.
          </p>
        </section>

        {/* ==========================================
            FEEDBACK ADDITION 3: CGNAT DETECTION
            ========================================== */}
        <section className="prose prose-invert max-w-none space-y-4">
          <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-1.5" id="cgnat-detection">
            <AlertTriangle size={16} className="text-amber-400" />
            CGNAT Detection Guide: Why Port Forwarding Fails
          </h2>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Many users set up port forwarding rules correctly but find that their ports remain closed. This is often caused by **Carrier-Grade NAT (CGNAT)**, a setup used by ISPs (especially on mobile, satellite, and fiber plans) to share a single public IPv4 address across multiple households.
          </p>
          <div className="border border-[var(--border-subtle)] rounded-xl p-5 bg-[var(--bg-elevated)] space-y-3 text-xs text-[var(--text-secondary)]">
            <span className="font-bold text-[var(--text-primary)] block">How to Detect if Your ISP is Using CGNAT:</span>
            <ol className="list-decimal pl-5 space-y-2 text-[11px] text-[var(--text-muted)]">
              <li>
                <strong>Check Your Router WAN IP:</strong> Log in to your router settings panel and navigate to the Status, WAN, or Internet page. Find the IP address labeled **WAN IP**, **Internet IP**, or **IPv4 Address**.
              </li>
              <li>
                <strong>Check Your Public IP:</strong> Open a new tab and go to an online checker tool (like `whatsmyip.org` or similar tools). Note the public IP address shown.
              </li>
              <li>
                <strong>Compare the Addresses:</strong> Compare your router's WAN IP to the public IP address:
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>If they match, you have a public IP and port forwarding will work correctly.</li>
                  <li>If they do not match, or if your router's WAN IP falls in the range of <strong>100.64.0.0 to 100.127.255.255</strong> (the reserved CGNAT address block), your ISP is using CGNAT.</li>
                </ul>
              </li>
            </ol>
            <div className="p-3 bg-[var(--bg-surface)] border-l-2 border-amber-500 rounded-r-lg text-[10px] text-[var(--text-muted)] italic">
              <strong>How to Bypass CGNAT:</strong> If your network is behind CGNAT, standard port forwarding is blocked because inbound traffic cannot reach your router. To resolve this, contact your ISP and request a public IPv4 address, or ask about static IP configuration options.
            </div>
          </div>
        </section>

        {/* ==========================================
            SECTION 7 & FEEDBACK 4: PORT FORWARDING FOR GAMING & GAMING PORTS
            ========================================== */}
        <section className="prose prose-invert max-w-none space-y-4" id="gaming-ports">
          <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-1.5">
            <Gamepad2 size={16} className="text-[var(--brand-400)]" />
            Port Forwarding for Online Gaming (Achieving Open NAT)
          </h2>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            In online gaming, your **NAT Type** determines your matchmaking speed and ability to connect to other players. A **Strict NAT** type blocks voice chat and prevents you from hosting lobbies, while an **Open NAT** type allows direct connections to other players.
          </p>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Below is a reference table of the ports required to achieve an Open NAT type in popular competitive multiplayer games:
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-[11px] text-[var(--text-secondary)]">
              <thead>
                <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                  <th className="px-3 py-2 text-left">Game Title</th>
                  <th className="px-3 py-2 text-left">Required TCP Ports</th>
                  <th className="px-3 py-2 text-left">Required UDP Ports</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)]">
                <tr>
                  <td className="px-3 py-2.5 font-semibold text-[var(--text-primary)]">Minecraft Java Edition</td>
                  <td className="px-3 py-2.5 font-mono">25565</td>
                  <td className="px-3 py-2.5 font-mono">25565</td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-semibold text-[var(--text-primary)]">Call of Duty (CoD) Series</td>
                  <td className="px-3 py-2.5 font-mono">3074, 27014-27050</td>
                  <td className="px-3 py-2.5 font-mono">3074, 3478, 4379-4380, 27000-27031</td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-semibold text-[var(--text-primary)]">Fortnite</td>
                  <td className="px-3 py-2.5 font-mono">5222, 5795-5847</td>
                  <td className="px-3 py-2.5 font-mono">5222, 5795-5847, 5800-5847</td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-semibold text-[var(--text-primary)]">Valorant</td>
                  <td className="px-3 py-2.5 font-mono">7000 - 8000</td>
                  <td className="px-3 py-2.5 font-mono">7000 - 8000, 5000-5500</td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-semibold text-[var(--text-primary)]">EA FC (FIFA) Series</td>
                  <td className="px-3 py-2.5 font-mono">3659, 42124</td>
                  <td className="px-3 py-2.5 font-mono">3659, 9000-9999</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            If you need to optimize NAT configurations for your gaming platform, check out our target guides: <Link href="/ps5-nat-type-fix" className="text-[var(--brand-400)] hover:underline">PlayStation 5 NAT Fixes</Link>, <Link href="/xbox-nat-type-open" className="text-[var(--brand-400)] hover:underline">Xbox NAT Setup</Link>, <Link href="/open-nat-type" className="text-[var(--brand-400)] hover:underline">How to Open NAT Type</Link>, <Link href="/nat-type-strict" className="text-[var(--brand-400)] hover:underline">Fixing Strict NAT Type</Link>, and <Link href="/minecraft-port-forwarding" className="text-[var(--brand-400)] hover:underline">Minecraft Port Forwarding Guide</Link>.
          </p>
        </section>

        {/* ==========================================
            SECTION 9: PORT FORWARDING VS TRIGGERING VS DMZ VS UPNP
            ========================================== */}
        <section className="prose prose-invert max-w-none space-y-4">
          <h2 className="text-base font-bold text-[var(--text-primary)]">Port Forwarding vs. Port Triggering vs. DMZ vs. UPnP</h2>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            There are several methods for opening ports and routing traffic through your router's firewall. Below is a comparison to help you choose the best option:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-xs text-[var(--text-muted)]">
            <li>
              <strong>Port Forwarding (Static):</strong> Maps external ports to a specific internal IP address. This is the most reliable method for hosting home servers, but it requires manual setup and a static IP reservation.
            </li>
            <li>
              <strong>Port Triggering (Dynamic):</strong> Opens inbound ports dynamically when outbound traffic is detected on a specified trigger port. This is more secure than port forwarding because ports close when they are not in use, and it does not require static IP reservations. However, only one device can use a port rule at a time.
            </li>
            <li>
              <strong>DMZ (Demilitarized Zone):</strong> Forwards all unsolicited inbound traffic on all 65,535 ports to a single local device. This exposes the target device to public scans and exploits, posing a security risk. Only use DMZ temporarily for troubleshooting purposes.
            </li>
            <li>
              <strong>UPnP (Universal Plug and Play):</strong> Allows devices and applications on your local network to open ports automatically. While convenient for multiplayer gaming, UPnP is less secure because malware can open ports without your permission.
            </li>
          </ul>
        </section>

        {/* ==========================================
            SECTION 10: SECURITY RISKS
            ========================================== */}
        <section className="prose prose-invert max-w-none space-y-4">
          <h2 className="text-base font-bold text-[var(--text-primary)]">Security Risks of Port Forwarding & Mitigation Steps</h2>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Every port forwarding rule you create opens a pathway through your router's firewall. If the application listening on that port (like an outdated Minecraft server or FTP software) has security vulnerabilities, hackers can exploit it to access your local network.
          </p>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            To secure your network, implement these safety practices:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-[var(--text-secondary)]">
            <div className="glass-card p-4 border border-[var(--border-subtle)] rounded-xl space-y-1">
              <span className="font-bold text-[var(--text-primary)] block">Disable UPnP</span>
              <p className="text-[11px] text-[var(--text-muted)]">Disable UPnP inside your router settings to prevent unauthorized applications or malware from opening ports dynamically.</p>
            </div>
            <div className="glass-card p-4 border border-[var(--border-subtle)] rounded-xl space-y-1">
              <span className="font-bold text-[var(--text-primary)] block">Manually Configure Rules</span>
              <p className="text-[11px] text-[var(--text-muted)]">Configure port forwarding rules manually to maintain control over what traffic enters your local network.</p>
            </div>
            <div className="glass-card p-4 border border-[var(--border-subtle)] rounded-xl space-y-1">
              <span className="font-bold text-[var(--text-primary)] block">Keep Host Software Updated</span>
              <p className="text-[11px] text-[var(--text-muted)]">Keep the software listening on the open port updated to apply security patches and minimize exploit risks.</p>
            </div>
            <div className="glass-card p-4 border border-[var(--border-subtle)] rounded-xl space-y-1">
              <span className="font-bold text-[var(--text-primary)] block">Close Unused Ports</span>
              <p className="text-[11px] text-[var(--text-muted)]">Delete or disable port forwarding rules when you are no longer hosting the server or using the application.</p>
            </div>
          </div>
        </section>

        {/* ==========================================
            SECTION 11: TROUBLESHOOTING
            ========================================== */}
        <section className="prose prose-invert max-w-none space-y-4">
          <h2 className="text-base font-bold text-[var(--text-primary)]">Troubleshooting Common Port Forwarding Failures</h2>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            If your ports show as Closed after configuration, follow the troubleshooting steps below:
          </p>
          <div className="space-y-4 text-xs text-[var(--text-secondary)]">
            <div className="p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-2">
              <span className="font-semibold text-[var(--text-primary)] flex items-center gap-1">
                <HelpCircle size={14} className="text-cyan-400" /> Double NAT Conflict on the Network
              </span>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                If you have connected your router to an ISP-provided modem-router gateway, you may have two active NAT tables. This blocks port forwarding because incoming packets are dropped at the ISP gateway before reaching your router. To resolve this, configure your ISP gateway to **Bridge Mode** or put your router's IP in the gateway's DMZ. Learn more in our <Link href="/double-nat-detected" className="text-[var(--brand-400)] hover:underline">Double NAT Diagnostics Guide</Link>.
              </p>
            </div>
            <div className="p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-2">
              <span className="font-semibold text-[var(--text-primary)] flex items-center gap-1">
                <HelpCircle size={14} className="text-cyan-400" /> Carrier-Grade NAT (CGNAT) Restrictions
              </span>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                If your router's WAN IP is different from your public IP address (typically in the 100.64.0.0/10 range), your ISP is using CGNAT, which blocks port forwarding. Request a public IPv4 address or ask about static IP options from your ISP to resolve this. Learn more in our troubleshooting guide: <Link href="/port-forwarding-not-working" className="text-[var(--brand-400)] hover:underline">Port Forwarding Not Working</Link>.
              </p>
            </div>
            <div className="p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-2">
              <span className="font-semibold text-[var(--text-primary)] flex items-center gap-1">
                <HelpCircle size={14} className="text-cyan-400" /> Local Windows Defender Firewall Blocks
              </span>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                Even if your router forwards ports correctly, the Windows Defender firewall on your host PC can block incoming connections. Verify that you have configured an inbound rule in Advanced Security Settings to allow traffic on the target port.
              </p>
            </div>
          </div>
        </section>

        {/* ==========================================
            SECTION 19: RELATED GUIDES
            ========================================== */}
        <section className="p-5 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-4">
          <span className="font-bold text-[var(--text-primary)] block text-xs flex items-center gap-1.5">
            <FileText size={14} className="text-[var(--brand-400)]" /> Internal Port Forwarding & NAT Resource Hub
          </span>
          <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
            Browse our other guides for advanced configurations, gaming optimizations, and network troubleshooting:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-[11px]">
            <Link href="/port-forwarding-guide" className="p-2.5 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-lg text-[var(--text-secondary)] hover:text-[var(--brand-400)] hover:border-[var(--brand-800)] transition-all">
              <strong>Port Forwarding Setup Guide</strong>
            </Link>
            <Link href="/port-forwarding-not-working" className="p-2.5 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-lg text-[var(--text-secondary)] hover:text-[var(--brand-400)] hover:border-[var(--brand-800)] transition-all">
              <strong>Port Forwarding Troubleshooting</strong>
            </Link>
            <Link href="/minecraft-port-forwarding" className="p-2.5 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-lg text-[var(--text-secondary)] hover:text-[var(--brand-400)] hover:border(--brand-800)] transition-all">
              <strong>Minecraft Server Setup</strong>
            </Link>
            <Link href="/open-nat-type" className="p-2.5 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-lg text-[var(--text-secondary)] hover:text-[var(--brand-400)] hover:border-[var(--brand-800)] transition-all">
              <strong>Open NAT Configurations</strong>
            </Link>
            <Link href="/nat-type-strict" className="p-2.5 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-lg text-[var(--text-secondary)] hover:text-[var(--brand-400)] hover:border-[var(--brand-800)] transition-all">
              <strong>Strict NAT Type Resolution</strong>
            </Link>
            <Link href="/ps5-nat-type-fix" className="p-2.5 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-lg text-[var(--text-secondary)] hover:text-[var(--brand-400)] hover:border-[var(--brand-800)] transition-all">
              <strong>PS5 NAT Type Fixes</strong>
            </Link>
            <Link href="/xbox-nat-type-open" className="p-2.5 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-lg text-[var(--text-secondary)] hover:text-[var(--brand-400)] hover:border-[var(--brand-800)] transition-all">
              <strong>Xbox Open NAT Setup</strong>
            </Link>
            <Link href="/gaming-network-optimization" className="p-2.5 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-lg text-[var(--text-secondary)] hover:text-[var(--brand-400)] hover:border-[var(--brand-800)] transition-all">
              <strong>Gaming Network Optimization</strong>
            </Link>
            <Link href="/router-settings" className="p-2.5 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-lg text-[var(--text-secondary)] hover:text-[var(--brand-400)] hover:border-[var(--brand-800)] transition-all">
              <strong>Router Settings Configuration</strong>
            </Link>
          </div>
        </section>

      </div>
    </TroubleshootingArticleShell>
  );
}
