import type { Metadata } from "next";
import Link from "next/link";
import { Link2, Info } from "lucide-react";
import TroubleshootingArticleShell from "@/components/tools/TroubleshootingArticleShell";
import { buildMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/lib/seo/schema";
import { APP_URL } from "@/lib/constants";

// ---- SEO Metadata ----
export const metadata: Metadata = buildMetadata({
  title: "Router Login Guide: How to Access Your Router Admin Panel",
  description:
    "Learn how to access your router admin settings page. Step-by-step instructions on default IPs, usernames, passwords, and troubleshooting login issues.",
  canonical: "/router-login",
  keywords: [
    "router login",
    "router admin login",
    "router settings",
    "router admin panel",
  ],
});

export default async function RouterLoginPage() {
  const breadcrumbs = [
    { name: "Router Login", url: "/router-login" }
  ];

  // ---- Structured Data (JSON-LD) ----
  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${APP_URL}/router-login#webpage`,
    "url": `${APP_URL}/router-login`,
    "name": "Router Login Guide: How to Access Your Router Admin Panel",
    "description": "Learn how to access your router admin settings page. Step-by-step instructions on default IPs, usernames, passwords, and troubleshooting login issues.",
    "about": {
      "@type": "Thing",
      "name": "Router Access Gateways",
    },
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${APP_URL}/router-login#itemlist`,
    "name": "Popular Router Logins",
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
          "name": "Default Router Passwords Guide",
          "url": `${APP_URL}/router-password`,
        },
      },
      {
        "@type": "ListItem",
        "position": 4,
        "item": {
          "@type": "WebPage",
          "name": "How to Reset a Router Guide",
          "url": `${APP_URL}/router-reset`,
        },
      },
    ],
  };

  const faqs = [
    {
      question: "What is router login?",
      answer: "Router login is the process of accessing your wireless router's web-based administration console. Through this portal, users can modify local networking parameters, manage connected clients, forward ports, and edit security keys.",
    },
    {
      question: "How do I log into my router settings?",
      answer: "Make sure you are connected to the router's network. Open any web browser, type your router's default IP address (such as 192.168.1.1 or 192.168.0.1) into the address bar, press Enter, and enter the default admin username and password.",
    },
    {
      question: "What is the default username and password?",
      answer: "Most routers use 'admin' for the username and either 'admin', 'password', or a blank field for the password. Check your router's bottom label to find the specific default login keys.",
    },
    {
      question: "What is the difference between Wi-Fi password and router admin password?",
      answer: "The Wi-Fi password secures your wireless network transmission, allowing client devices to connect to the internet. The router admin password protects access to the router's settings panel. They should be configured with different, strong values.",
    },
    {
      question: "Why does the login page time out?",
      answer: "A timeout indicates your browser cannot reach the router IP address. Ensure your VPN is disabled, check that your device is connected to the primary Wi-Fi network (not a guest network), and verify you are using the correct Default Gateway IP.",
    },
    {
      question: "Can I log in using a smartphone?",
      answer: "Yes, you can access the router login screen by opening your smartphone's web browser and navigating to the router's local gateway IP address, or by using the manufacturer's official mobile application.",
    },
    {
      question: "What is a dynamic login address?",
      answer: "Some manufacturers configure local hostnames (like tplinkwifi.net or routerlogin.net) that resolve locally to the router's private gateway IP, making it easier to log in without memorizing numeric IPs.",
    },
    {
      question: "Is router admin login secure?",
      answer: "Local logins are secure from external intercept because they route internally over your private subnet. However, they are vulnerable if you haven't changed the manufacturer's default admin credentials, allowing anyone on your network to access settings.",
    },
    {
      question: "What is remote management?",
      answer: "Remote management allows you to access your router's administration console from outside your home network via the WAN interface. It is highly recommended to keep this disabled to prevent external hacking attempts.",
    },
    {
      question: "How do I save my router configurations?",
      answer: "Inside the router settings panel under System Tools or Administration, locate the 'Backup & Restore' option, click Backup to download the current configuration file (.bin or .config), and save it on your computer.",
    },
  ];

  const troubleshootingSteps = [
    {
      title: "Connect to the Router Network",
      description: "Ensure your device is wirelessly connected to the router's main SSID or connected directly via a physical RJ45 Ethernet patch cord.",
      tip: "Avoid guest networks or cellular data connections when attempting router admin access.",
    },
    {
      title: "Locate Your Default Gateway IP",
      description: "Find your gateway IP address by running 'ipconfig' (Windows) or 'netstat -nr' (macOS) in your system console, or by looking at the router's physical underside sticker.",
    },
    {
      title: "Open a Private Browser Tab",
      description: "Open an Incognito or Private Window in Chrome, Safari, Firefox, or Edge to bypass any cached network settings or cookies.",
    },
    {
      title: "Enter the IP and Log In",
      description: "Type the gateway IP (e.g., 192.168.1.1) in the browser search bar, proceed past any self-signed SSL warnings, and input the admin login credentials.",
    },
  ];

  const quickFixChecklist = [
    "Change the default admin console login password",
    "Configure a unique SSID name to replace default naming",
    "Select WPA3 or WPA2-AES as your Wi-Fi security protocol",
    "Keep remote WAN administration settings disabled",
    "Deactivate WPS (Wi-Fi Protected Setup) options",
    "Download and save a backup configuration file locally",
  ];

  return (
    <>
      <JsonLd data={collectionPageSchema} />
      <JsonLd data={itemListSchema} />

      <TroubleshootingArticleShell
        h1="Router Admin Login Guide"
        intro="Step-by-step instructions to access your wireless router settings page, locate default IP addresses, change local configurations, and log in securely."
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
            Quick Reference: Default Router IP Addresses
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-sm">
              <thead>
                <tr className="text-[var(--text-primary)] font-semibold text-left">
                  <th className="pb-3 pr-4">Router Brand</th>
                  <th className="pb-3 px-4">Default IP</th>
                  <th className="pb-3 pl-4">Alternative Login URL</th>
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
                  <td className="py-2.5 pr-4 font-bold text-[var(--text-primary)]">Netgear</td>
                  <td className="py-2.5 px-4 font-mono">192.168.1.1</td>
                  <td className="py-2.5 pl-4 font-mono text-[var(--brand-400)]">routerlogin.net</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-bold text-[var(--text-primary)]">Huawei</td>
                  <td className="py-2.5 px-4 font-mono">192.168.3.1</td>
                  <td className="py-2.5 pl-4 font-mono text-[var(--brand-400)]">huaweiwifi.com / 192.168.8.1</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-bold text-[var(--text-primary)]">D-Link</td>
                  <td className="py-2.5 px-4 font-mono">192.168.0.1</td>
                  <td className="py-2.5 pl-4 font-mono text-[var(--brand-400)]">dlinkrouter.local</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 2: Popular Router IP Cards */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-5">Access Guides by IP Address</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { ip: "192.168.1.1", slug: "192-168-1-1", brand: "ASUS, Netgear, Linksys" },
              { ip: "192.168.0.1", slug: "192-168-0-1", brand: "TP-Link, D-Link" },
              { ip: "10.0.0.1", slug: "10-0-0-1", brand: "Xfinity, Comcast" },
              { ip: "192.168.8.1", slug: "192-168-8-1", brand: "Huawei, cellular gateways" },
            ].map((card) => (
              <Link
                key={card.ip}
                href={`/ips/${card.slug}`}
                className="glass-card p-5 hover:border-[var(--border-strong)] hover:bg-[var(--bg-hover)] hover:-translate-y-0.5 transition-all duration-[var(--transition-fast)] group block"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-base font-bold text-[var(--brand-400)] group-hover:underline">
                    {card.ip}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-[var(--text-muted)] tracking-wider">
                    IP Guide →
                  </span>
                </div>
                <div className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Default access gateway address for {card.brand} routers.
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Section 3: What is Router Login */}
        <div className="mb-10 prose-dark">
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3">What is Router Login?</h2>
          <p>
            Router login is the primary administrative procedure that connects a client computer or phone to the built-in operating system daemon running inside your local wireless router. Standard routers do not require internet access to function or configure; they host a localized web server (such as mini_httpd) that serves settings files over local sockets. By typing your router&apos;s default gateway IP address (such as 192.168.1.1) into any web browser, you submit a local connection request to this inner daemon.
          </p>
          <p>
            Logging in grants access to the router&apos;s administration dashboard (often referred to as the control panel or console). Within this dashboard, users can modify vital transmission policies. Key tasks include renaming Wi-Fi SSIDs, configuring security keys (WPA2/WPA3), forwarding ports for gaming consoles, and enabling parental control sandboxes.
          </p>
        </div>

        {/* Section 4: Default Login IPs */}
        <div className="mb-10 prose-dark">
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3">Default Login IP Addresses</h2>
          <p>
            To log in, you must identify your router&apos;s local IP address. Under RFC 1918 standards, home networking devices utilize reserved private address ranges that do not route on the global web. The most common subnets are:
          </p>
          <ul>
            <li>
              <strong>192.168.1.1:</strong> The global standard used by ASUS, Netgear, Linksys, and Cisco.
            </li>
            <li>
              <strong>192.168.0.1:</strong> Common across TP-Link, D-Link, and Tenda units.
            </li>
            <li>
              <strong>10.0.0.1:</strong> Often used by Comcast Xfinity gateways and business routers.
            </li>
            <li>
              <strong>192.168.8.1:</strong> Heavily featured on Huawei modems and 4G LTE routers.
            </li>
          </ul>
          <p>
            You can verify your router&apos;s IP by opening your system console (Command Prompt in Windows or Terminal in macOS) and running the routing route check utility (type <code>ipconfig</code> on Windows or <code>netstat -nr</code> on macOS). Look for the <strong>Default Gateway</strong> address.
          </p>
        </div>

        {/* Section 5: Default Usernames & Passwords */}
        <div className="mb-10 prose-dark">
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3">Default Usernames & Passwords</h2>
          <p>
            Manufacturers configure default administrative access credentials during assembly. These are separate from your Wi-Fi password. The most common default credential pairings include:
          </p>
          <div className="overflow-x-auto my-4">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-sm">
              <thead>
                <tr className="text-[var(--text-primary)] font-bold text-left">
                  <th className="pb-2 pr-4">Default Username</th>
                  <th className="pb-2 px-4">Default Password</th>
                  <th className="pb-2 pl-4">Router Brands</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)] text-[var(--text-secondary)]">
                <tr>
                  <td className="py-2 pr-4 font-mono">admin</td>
                  <td className="py-2 px-4 font-mono">admin</td>
                  <td className="py-2 pl-4">TP-Link, ASUS, Netgear</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-mono">admin</td>
                  <td className="py-2 px-4 font-mono">password</td>
                  <td className="py-2 pl-4">Netgear, Linksys</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-mono">admin</td>
                  <td className="py-2 px-4 font-mono">(leave blank)</td>
                  <td className="py-2 pl-4">D-Link, Linksys, Belkin</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-mono">telecomadmin</td>
                  <td className="py-2 px-4 font-mono">admintelecom</td>
                  <td className="py-2 pl-4">Huawei (fiber modems)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            If these default configurations do not work, check the sticker on the back or bottom of your physical router. It contains the default administrative login credentials specific to your unit. If they still fail, the password has likely been changed, and you will need to perform a factory hardware reset.
          </p>
        </div>

        {/* Section 6: Login Not Working */}
        <div className="mb-10 prose-dark">
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3">Login Not Working? Common Fixes</h2>
          <p>
            If your browser displays a &quot;Connection Timed Out&quot; error when navigating to the router IP, it indicates that your device cannot route packets to the gateway. Apply these troubleshooting steps:
          </p>
          <ul>
            <li>
              <strong>Disconnect VPNs:</strong> Active VPN software routes all outbound data into an external secure tunnel, preventing local access.
            </li>
            <li>
              <strong>Check Guest Network Limits:</strong> Guest networks usually have AP Isolation active, blocking access to the administration port. Connect to the main Wi-Fi network.
            </li>
            <li>
              <strong>Use an Ethernet Cable:</strong> Connect directly to a router LAN port using an Ethernet cable to bypass wireless blocks.
            </li>
          </ul>
          <p>
            Read our detailed walkthrough on{" "}
            <Link href="/router-login-not-working" className="text-[var(--brand-400)] hover:underline font-semibold">
              Router Login Page Not Working
            </Link>{" "}
            for complete diagnostic procedures, or learn how to recover passwords with our{" "}
            <Link href="/router-password" className="text-[var(--brand-400)] hover:underline font-semibold">
              Router Password Guide
            </Link>.
          </p>
        </div>

        {/* Section 7: Router Login by Brand */}
        <div className="mb-10 glass-card p-6 border border-[var(--border-subtle)] rounded-2xl">
          <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4">Router Login Steps by Brand</h2>
          <div className="space-y-4 text-sm text-[var(--text-secondary)]">
            <div>
              <h3 className="font-bold text-[var(--text-primary)] mb-1">TP-Link Login</h3>
              <p>Connect to TP-Link Wi-Fi, open a browser, navigate to <strong>http://tplinkwifi.net</strong> (or 192.168.0.1), and enter your admin password.</p>
            </div>
            <div>
              <h3 className="font-bold text-[var(--text-primary)] mb-1">ASUS Login</h3>
              <p>Open a browser on a device connected to ASUS Wi-Fi, navigate to <strong>http://router.asus.com</strong> (or 192.168.1.1 / 192.168.50.1), and input your admin credentials.</p>
            </div>
            <div>
              <h3 className="font-bold text-[var(--text-primary)] mb-1">Netgear Login</h3>
              <p>Type <strong>http://routerlogin.net</strong> (or 192.168.1.1) in your browser search bar and submit Netgear credentials (admin/password).</p>
            </div>
            <div>
              <h3 className="font-bold text-[var(--text-primary)] mb-1">Huawei Login</h3>
              <p>Navigate to <strong>http://huaweiwifi.com</strong> (or 192.168.8.1 / 192.168.3.1) and log in with details listed on the modem sticker.</p>
            </div>
          </div>
        </div>

        {/* Section 8: Cluster Internal Linking Hub */}
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
