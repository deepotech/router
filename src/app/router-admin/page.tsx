import type { Metadata } from "next";
import Link from "next/link";
import { Link2, Info } from "lucide-react";
import TroubleshootingArticleShell from "@/components/tools/TroubleshootingArticleShell";
import { buildMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/lib/seo/schema";
import { APP_URL } from "@/lib/constants";

// ---- SEO Metadata ----
export const metadata: Metadata = buildMetadata({
  title: "Router Admin Hub: Control Panel Login, Passwords & Settings",
  description:
    "Access your router admin control panel. The central hub for router login addresses, default passwords, factory reset guides, and manufacturer directories.",
  canonical: "/router-admin",
  keywords: [
    "router admin",
    "router control panel",
    "router login page",
    "router admin panel",
    "router settings portal",
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
    "name": "Router Admin Hub: Control Panel Login, Passwords & Settings",
    "description": "Access your router admin control panel. The central hub for router login addresses, default passwords, factory reset guides, and manufacturer directories.",
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
    "numberOfItems": 4,
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
    "Change the default admin login credentials immediately",
    "Update your Wi-Fi SSID and set a complex WPA3 security key",
    "Deactivate WPS PIN features to secure your spectrum",
    "Keep WAN remote management settings disabled",
    "Download and save a backup configuration file locally after changes",
  ];

  return (
    <>
      <JsonLd data={collectionPageSchema} />
      <JsonLd data={itemListSchema} />

      <TroubleshootingArticleShell
        h1="Router Admin Control Hub"
        intro="Access your router admin control panel. The central hub for router login addresses, default passwords, factory reset guides, and manufacturer directories."
        category="wifi"
        breadcrumbs={breadcrumbs}
        faqs={faqs}
        troubleshootingSteps={troubleshootingSteps}
        quickFixChecklist={quickFixChecklist}
        severityLevel="low"
      >
        {/* Section 1: Settings Overview */}
        <div className="mb-10 prose-dark">
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3">Router Admin Panel Settings Overview</h2>
          <p>
            The router admin panel is the central control system of your local area network (LAN). It runs as a lightweight web daemon inside the router&apos;s firmware. When you log in, you gain control over parameters that manage bandwidth allocation, spectrum security, and connectivity behaviors.
          </p>
          <p>
            Key operations managed in the admin dashboard include:
          </p>
          <ul>
            <li>
              <strong>Wi-Fi Management:</strong> Customize SSID names, select transmission channels (2.4GHz, 5GHz, 6GHz), and configure security protocols (WPA2/WPA3).
            </li>
            <li>
              <strong>DHCP Configurations:</strong> Define local IP allocation address ranges and assign static IP leases to specific devices.
            </li>
            <li>
              <strong>Port Forwarding:</strong> Forward specific gaming and service ports (TCP/UDP) directly to host consoles or servers.
            </li>
            <li>
              <strong>Network Security:</strong> Set up firewall rules, configure parent filters, and enable guest networks to isolate unsafe IoT client devices.
            </li>
          </ul>
        </div>

        {/* Section 2: Link blocks to cluster pages */}
        <div className="mb-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/router-login"
            className="glass-card p-5 hover:border-[var(--border-strong)] hover:bg-[var(--bg-hover)] hover:-translate-y-0.5 transition-all duration-[var(--transition-fast)] group block"
          >
            <h3 className="font-bold text-sm text-[var(--brand-400)] group-hover:underline mb-1">Router Login Guide</h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Step-by-step instructions to log into TP-Link, ASUS, Netgear, and D-Link dashboards.
            </p>
          </Link>
          <Link
            href="/router-password"
            className="glass-card p-5 hover:border-[var(--border-strong)] hover:bg-[var(--bg-hover)] hover:-translate-y-0.5 transition-all duration-[var(--transition-fast)] group block"
          >
            <h3 className="font-bold text-sm text-[var(--brand-400)] group-hover:underline mb-1">Default Password Lists</h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Find standard manufacturer usernames and passwords, and learn recovery steps.
            </p>
          </Link>
          <Link
            href="/router-reset"
            className="glass-card p-5 hover:border-[var(--border-strong)] hover:bg-[var(--bg-hover)] hover:-translate-y-0.5 transition-all duration-[var(--transition-fast)] group block"
          >
            <h3 className="font-bold text-sm text-[var(--brand-400)] group-hover:underline mb-1">How to Reset a Router</h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Compare soft reset vs hard factory resets, and learn post-reset setups.
            </p>
          </Link>
          <Link
            href="/router-login-not-working"
            className="glass-card p-5 hover:border-[var(--border-strong)] hover:bg-[var(--bg-hover)] hover:-translate-y-0.5 transition-all duration-[var(--transition-fast)] group block"
          >
            <h3 className="font-bold text-sm text-[var(--brand-400)] group-hover:underline mb-1">Troubleshooting Login Issues</h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Resolve ERR_CONNECTION_TIMED_OUT errors, SSL certificate warnings, and VPN blocks.
            </p>
          </Link>
        </div>

        {/* Section 3: Common Admin Operations */}
        <div className="mb-10 prose-dark">
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3">Common Admin Operations</h2>
          <p>
            Understanding how to perform basic configuration modifications is key to secure network management:
          </p>
          <ol>
            <li>
              <strong>Change SSID and Security Keys:</strong> Navigate to the Wireless section. Modify the Wi-Fi Name (SSID) and select WPA3-Personal as your security encryption standard. Select a strong, unique Wi-Fi password.
            </li>
            <li>
              <strong>Enable a Guest Network:</strong> Under Guest Network configurations, set up an isolated SSID for visitors and smart home IoT devices. This keeps your main network nodes protected.
            </li>
            <li>
              <strong>Configure Port Forwarding:</strong> Go to WAN settings, NAT settings, or Virtual Server. Define the target host device local IP address and input the required application port rules.
            </li>
            <li>
              <strong>Update Device Firmware:</strong> Under System Management, check for updates online or manually upload official firmware binaries downloaded from the manufacturer&apos;s support page.
            </li>
          </ol>
        </div>

        {/* Section 4: Troubleshooting Admin console */}
        <div className="mb-10 prose-dark">
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3">Troubleshooting Admin Console Connections</h2>
          <p>
            If you encounter errors when trying to connect to your gateway admin portal, verify the following:
          </p>
          <ul>
            <li>
              <strong>VPN Client Status:</strong> Active VPN clients encrypt and tunnel outbound data into external servers, blocking local socket requests to private ranges like 192.168.1.1. Disconnect VPNs before loading the page.
            </li>
            <li>
              <strong>Gateway Subnet:</strong> If your router uses 192.168.1.1, your computer must be assigned an IP within the 192.168.1.x subnet range. Verify your IP configuration using <code>ipconfig</code> in Windows CMD.
            </li>
            <li>
              <strong>AP Isolation:</strong> If you are connected to a guest network, access to the admin port is blocked by default to prevent client sniffing. Connect to the primary Wi-Fi network.
            </li>
          </ul>
        </div>

        {/* Section 5: Cluster Internal Linking Hub */}
        <div className="mb-10 p-6 glass-card border border-[var(--border-subtle)] rounded-2xl">
          <h2 className="text-base font-bold text-[var(--text-primary)] mb-4 flex items-center gap-1.5">
            <Link2 size={16} className="text-[var(--brand-400)]" />
            Router Access Cluster Navigation
          </h2>
          <div className="flex flex-wrap gap-2.5">
            {[
              { label: "Router Directory", href: "/routers" },
              { label: "IP Address Directory", href: "/ips" },
              { label: "Router Login Guide", href: "/router-login" },
              { label: "Default Router Passwords", href: "/router-password" },
              { label: "How to Reset a Router", href: "/router-reset" },
              { label: "Router Admin Hub", href: "/router-admin" },
              { label: "Login Issues Diagnoses", href: "/router-login-not-working" },
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
