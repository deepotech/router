import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import TroubleshootingArticleShell from "@/components/tools/TroubleshootingArticleShell";
import { JsonLd } from "@/lib/seo/schema";
import { APP_URL } from "@/lib/constants";
import Link from "next/link";
import {
  Wifi,
  Shield,
  Search,
  Monitor,
  Smartphone,
  AlertTriangle,
  CheckSquare,
  Link2,
  Terminal,
  Radio,
  Server,
  Globe,
} from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "How to See Who Is on My WiFi: All Methods (Router, Apps & OS Tools)",
  description:
    "Find out exactly who is connected to your WiFi. Use your router's client list, DHCP leases, ARP tables, Fing, Angry IP Scanner, and built-in Windows, macOS, and Linux tools.",
  canonical: "/how-to-see-who-is-on-my-wifi",
  keywords: [
    "how to see who is on my wifi",
    "who is on my wifi",
    "check wifi connected devices",
    "router client list",
    "dhcp lease",
    "arp table",
    "fing app",
    "angry ip scanner",
    "find devices on network",
    "wifi connected devices list",
    "network scanner",
    "unknown device on network",
  ],
});

const breadcrumbs = [
  { name: "WiFi Security", url: "/wifi-security" },
  { name: "Who Is on My WiFi", url: "/how-to-see-who-is-on-my-wifi" },
];

const troubleshootingSteps = [
  {
    title: "Log Into Your Router Admin Panel",
    description:
      "Open a browser and navigate to your router's default gateway IP (192.168.1.1 or 192.168.0.1). Log in with admin credentials. If you have never changed these, check the sticker on the underside of the router.",
    tip: "Connect via Ethernet for the most reliable admin access. Visit our router login guide if you need help.",
  },
  {
    title: "Check the DHCP Client / Connected Devices List",
    description:
      "Inside the admin panel, navigate to the Wireless Statistics, Network Map, Attached Devices, or DHCP Client List section. This shows all currently connected devices with their IP address, MAC address, and hostname.",
    tip: "Take note of every device listed. Compare hostnames and MAC vendor prefixes against your known devices.",
  },
  {
    title: "Run an ARP Table Scan on Your Computer",
    description:
      "Open Command Prompt (Windows) or Terminal (macOS/Linux) and type: arp -a. This lists every device your computer has recently communicated with on the local network, including their IP and MAC address.",
    tip: "On Windows, run 'arp -a' in CMD. On Linux, run 'ip neigh show' for a more complete neighbor table.",
  },
  {
    title: "Use a Network Scanner App (Fing or Angry IP Scanner)",
    description:
      "Download Fing on your smartphone or Angry IP Scanner on your desktop. Run a full LAN scan of your subnet (e.g., 192.168.1.0/24). These tools fingerprint devices by MAC vendor OUI, hostname, and open ports, making identification easier than the router list alone.",
    tip: "Fing's device recognition database often identifies smart TVs, game consoles, and cameras by their hardware fingerprint.",
  },
  {
    title: "Compare Results Against Your Known Devices",
    description:
      "Create a list of every device you own with its MAC address. Cross-reference this against the router's client list and your ARP/scanner results. Any device not on your known list is a candidate for investigation or blocking.",
    tip: "Check the first 6 characters (OUI) of any unknown MAC address using an online MAC vendor lookup tool to identify the manufacturer.",
  },
];

const faqs = [
  {
    question: "How do I see all devices connected to my WiFi?",
    answer:
      "The most reliable method is to log into your router's admin panel (typically at 192.168.1.1 or 192.168.0.1) and navigate to the Connected Devices, DHCP Client List, or Network Map section. This shows every device currently assigned an IP address on your network. For a more complete picture, combine this with a network scanner app like Fing or Angry IP Scanner, which can detect devices the router might not list by hostname.",
  },
  {
    question: "What does MAC address filtering do?",
    answer:
      "MAC (Media Access Control) address filtering allows you to create an allowlist or blocklist of hardware identifiers. When enabled in allowlist mode, only devices whose MAC addresses are explicitly listed can connect to your WiFi, even if they know the password. In blocklist mode, specific devices are denied access while all others can connect. Note that MAC addresses can be spoofed by determined attackers, so this should be one layer among several security measures.",
  },
  {
    question: "Can someone use my WiFi without showing up on the router list?",
    answer:
      "In most cases, no — any device connected to your WiFi must obtain an IP address via DHCP (or set a static IP manually), and both scenarios result in the device appearing in the ARP table and typically the DHCP lease table. However, a sophisticated attacker using a static IP within your subnet's range could potentially avoid the DHCP lease list while still appearing in ARP tables. Running both an ARP scan and checking DHCP leases together provides the most comprehensive view.",
  },
  {
    question: "What is an ARP table?",
    answer:
      "ARP (Address Resolution Protocol) is the network protocol that maps IP addresses to MAC addresses on a local network. Your computer maintains an ARP cache (table) that records the IP-to-MAC address mappings of every device it has communicated with recently. Running 'arp -a' in Command Prompt or Terminal displays this cache, giving you a snapshot of active devices on your subnet. Entries expire after a period of inactivity, so the ARP table shows recently active devices rather than a complete historical list.",
  },
  {
    question: "Is Fing safe to use?",
    answer:
      "Fing is a well-established network discovery tool developed by Fing Ltd, a reputable company. The app scans your local network using standard ARP and mDNS discovery techniques — it does not send any of your network data to external servers during a basic scan. The free version provides excellent device identification. Fing does offer optional cloud-connected features (like continuous monitoring) that involve account registration. For basic one-time scanning, it is considered safe and is widely used by IT professionals.",
  },
  {
    question: "How can I tell what device an IP address belongs to?",
    answer:
      "Start by checking the router's DHCP client list — it often shows the hostname alongside the IP and MAC address. If the hostname is not descriptive, look up the first 6 characters of the MAC address (the OUI) using an online MAC vendor lookup tool (such as macvendors.com). This reveals the device manufacturer, which usually narrows down what the device is. You can also try pinging the IP and then running 'nslookup [IP address]' to see if the device has a resolvable hostname on your network.",
  },
  {
    question: "Why do I see unknown devices on my network?",
    answer:
      "Unknown devices on your network are typically caused by: (1) your own devices you've forgotten about (smart TVs, old tablets, IoT sensors, printers, mesh satellite nodes); (2) devices belonging to household members you weren't aware of; (3) an unauthorized user who obtained your WiFi password; or (4) a device with MAC address randomization that makes it appear under a different identifier each time it connects (common in modern iOS and Android devices). Systematically audit each device before assuming it is unauthorized.",
  },
  {
    question: "How do I kick someone off my WiFi?",
    answer:
      "The most effective method is to change your WiFi password — this immediately disconnects all devices and requires every user to re-authenticate. If you want to block a specific device without changing your password for others, use your router's MAC address filtering or Access Control List to add that device's MAC to a block/deny list. For detailed brand-specific instructions, see our guide on how to block a device on your router. You should also enable WPA3 and a strong passphrase to prevent re-entry.",
  },
];

const commonCauses = [
  {
    title: "Forgotten IoT Devices",
    desc: "Smart plugs, thermostats, cameras, and other IoT devices are often connected and forgotten. They appear as unknown entries in your client list because their hostnames are not descriptive.",
  },
  {
    title: "Shared Passwords Spreading",
    desc: "Every person you give your WiFi password to can share it further. Without a guest network, the original password propagates across an uncontrolled number of devices.",
  },
  {
    title: "MAC Address Randomization",
    desc: "Modern iOS (iOS 14+) and Android (11+) devices use randomized MAC addresses by default. The same phone appears under a different MAC each time it connects to a new network, creating apparent 'unknown' entries.",
  },
  {
    title: "Neighbor Using Same SSID",
    desc: "If you use a common SSID (like 'Home' or 'WiFi') and your neighbor has the same network name with the same password (common with ISP-supplied routers), their devices may occasionally appear on your network.",
  },
];

const quickFixChecklist = [
  "Log into your router admin panel and open the Connected Devices or DHCP list.",
  "Run 'arp -a' in Command Prompt or Terminal to cross-reference active devices.",
  "Download Fing on your smartphone and run a network scan.",
  "Look up unknown MAC addresses using an online OUI/vendor lookup tool.",
  "Compare all discovered devices against your complete list of owned hardware.",
  "Change your WiFi password immediately if any unauthorized device is found.",
];

// ─── SCHEMAS ────────────────────────────────────────────────────────────────

const techArticleSchema = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "@id": `${APP_URL}/how-to-see-who-is-on-my-wifi#article`,
  url: `${APP_URL}/how-to-see-who-is-on-my-wifi`,
  headline: "How to See Who Is on My WiFi: All Methods (Router, Apps & OS Tools)",
  description:
    "Find out exactly who is connected to your WiFi using router client lists, DHCP leases, ARP tables, Fing, Angry IP Scanner, and OS-level tools.",
  author: { "@type": "Organization", name: "RouterVia" },
  publisher: { "@type": "Organization", name: "RouterVia" },
  dateModified: new Date().toISOString().split("T")[0],
  proficiencyLevel: "Beginner",
  about: [
    { "@type": "Thing", name: "WiFi Network Monitoring" },
    { "@type": "Thing", name: "Network Security" },
    { "@type": "Thing", name: "Connected Device Audit" },
  ],
};

const faqPageSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${APP_URL}/how-to-see-who-is-on-my-wifi#faq`,
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

const collectionPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${APP_URL}/how-to-see-who-is-on-my-wifi#collection`,
  url: `${APP_URL}/how-to-see-who-is-on-my-wifi`,
  name: "How to See Who Is on My WiFi",
  description:
    "Complete guide to monitoring WiFi-connected devices using router tools, network scanners, and OS commands.",
  about: [{ "@type": "Thing", name: "WiFi Network Monitoring" }],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: APP_URL },
    {
      "@type": "ListItem",
      position: 2,
      name: "WiFi Security",
      item: `${APP_URL}/wifi-security`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Who Is on My WiFi",
      item: `${APP_URL}/how-to-see-who-is-on-my-wifi`,
    },
  ],
};

export default function HowToSeeWhoIsOnMyWifiPage() {
  return (
    <TroubleshootingArticleShell
      h1="How to See Who Is on Your WiFi: Router, Apps & OS Methods (2026)"
      intro="Knowing exactly which devices are connected to your wireless network is the first step in maintaining network security. An unknown device on your WiFi could indicate unauthorized access, malware, or a misconfigured IoT device consuming your bandwidth. This guide covers every method — from your router's built-in client list to ARP tables, network scanner apps, and OS-level tools — so you can audit your network completely and take action immediately."
      category="wifi"
      breadcrumbs={breadcrumbs}
      faqs={faqs}
      troubleshootingSteps={troubleshootingSteps}
      warningBanner={{
        title: "Unknown Device Found? Act Immediately",
        text: "If you identify a device you don't recognize, change your WiFi password immediately, enable MAC address filtering, and review your router's connection logs. An unauthorized device on your network can intercept traffic, access shared files, or use your connection for illegal activity.",
      }}
      quickFixChecklist={quickFixChecklist}
      commonCauses={commonCauses}
      whenToContactISP="If you suspect your ISP-supplied router has been compromised or you cannot access the admin panel after multiple attempts, contact your ISP. They can remotely audit the device or issue a replacement gateway. Also contact your ISP if your router repeatedly shows unknown devices even after changing credentials, which may indicate a compromised modem."
      severityLevel="medium"
    >
      <JsonLd data={techArticleSchema} />
      <JsonLd data={faqPageSchema} />
      <JsonLd data={collectionPageSchema} />
      <JsonLd data={breadcrumbSchema} />

      <div className="space-y-10">

        {/* =====================================================================
            SECTION 1: WHY MONITOR YOUR WIFI
            ===================================================================== */}
        <section className="prose prose-invert max-w-none space-y-4" aria-label="Why Monitor Your WiFi">
          <div className="flex items-center gap-2 text-[var(--brand-400)] font-semibold text-xs uppercase tracking-wider mb-2">
            <Wifi size={14} /> Network Security Monitoring
          </div>
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            Section 1 — Why You Should Monitor Your WiFi Network
          </h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            Most home networks operate entirely on trust — if a device knows the
            WiFi password, it gets unrestricted access to the local area network
            (LAN). This means a single compromised or unauthorized device can
            communicate with every other device on the same subnet: your NAS
            drives, printers, smart home hubs, work laptops, and security
            cameras. Monitoring your connected devices list is the only way to
            enforce the boundaries of your trusted network perimeter.
          </p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            The signs of unauthorized network access are often subtle: your
            internet feels slower than usual, your router&apos;s WAN traffic
            indicator is active when you&apos;re not using it, or your internet
            provider reports unusually high data consumption. By running a
            systematic device audit at least once a month, you can detect
            freeloaders, rogue IoT devices phoning home to malicious servers,
            and any device that has lingered beyond its welcome.
          </p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            The modern home network is remarkably complex. A typical household
            with two adults and two children can easily have 30 to 50 connected
            devices: smartphones, tablets, laptops, smart TVs, gaming consoles,
            smart speakers, thermostats, doorbells, light bulbs, and more. Each
            of these represents a potential attack surface. Regular audits also
            help you identify devices running outdated firmware, which may
            contain known security vulnerabilities. For the full security
            hardening picture, see our{" "}
            <Link href="/wifi-security" className="text-[var(--brand-400)] hover:underline font-semibold">
              WiFi Security Guide
            </Link>.
          </p>
        </section>

        {/* =====================================================================
            SECTION 2: ROUTER ADMIN CLIENT LIST
            ===================================================================== */}
        <section className="prose prose-invert max-w-none space-y-4" aria-label="Router Admin Client List">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            Section 2 — Method 1: Router Admin Client List
          </h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            Your router maintains a real-time record of every device it has
            issued an IP address to via DHCP. This is the fastest and most
            authoritative source for connected device information. To access it,
            open a browser, navigate to your router&apos;s admin panel (see our{" "}
            <Link href="/router-login" className="text-[var(--brand-400)] hover:underline font-semibold">
              router login guide
            </Link>
            ), and look for the sections described below by brand:
          </p>

          <div className="space-y-4">
            <div className="border-l-4 border-[var(--brand-500)] pl-4 py-2 space-y-2 text-xs text-[var(--text-secondary)] bg-[var(--bg-elevated)] rounded-r-xl">
              <span className="font-bold text-[var(--text-primary)] block">
                ASUS Routers (ASUSWRT):
              </span>
              <p>
                Log in at <code>router.asus.com</code> or{" "}
                <code>192.168.1.1</code>. On the main dashboard, click{" "}
                <strong>Network Map</strong>. Click on the{" "}
                <strong>Clients</strong> icon (usually showing a person icon
                with a number). This lists every connected device with its IP,
                MAC address, hostname, and connection type (2.4 GHz / 5 GHz /
                Ethernet). You can also go to{" "}
                <strong>Wireless &gt; Wireless Statistics</strong> for wireless-only
                clients.
              </p>
            </div>

            <div className="border-l-4 border-[var(--brand-500)] pl-4 py-2 space-y-2 text-xs text-[var(--text-secondary)] bg-[var(--bg-elevated)] rounded-r-xl">
              <span className="font-bold text-[var(--text-primary)] block">
                TP-Link Routers (Archer):
              </span>
              <p>
                Log in at <code>tplinkwifi.net</code> or{" "}
                <code>192.168.0.1</code>. Navigate to{" "}
                <strong>Advanced &gt; Network Map</strong> or{" "}
                <strong>Wireless &gt; Wireless Statistics</strong>. The
                Wireless Statistics tab shows MAC addresses and signal strength
                for wireless clients. For a complete list including wired
                clients, go to{" "}
                <strong>Advanced &gt; IP &amp; MAC Binding &gt; ARP List</strong>.
              </p>
            </div>

            <div className="border-l-4 border-[var(--brand-500)] pl-4 py-2 space-y-2 text-xs text-[var(--text-secondary)] bg-[var(--bg-elevated)] rounded-r-xl">
              <span className="font-bold text-[var(--text-primary)] block">
                Netgear Routers:
              </span>
              <p>
                Log in at <code>routerlogin.net</code>. Navigate to{" "}
                <strong>
                  Basic &gt; Attached Devices
                </strong>{" "}
                or{" "}
                <strong>Advanced &gt; Administration &gt; Attached Devices</strong>. This
                shows all wired and wireless clients with their IP, MAC, and
                device name. Orbi mesh systems show attached devices per node.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto my-4">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-[11px] text-[var(--text-secondary)]">
              <thead>
                <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                  <th className="px-3 py-2 text-left">Column Name</th>
                  <th className="px-3 py-2 text-left">What It Means</th>
                  <th className="px-3 py-2 text-left">How to Use It</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)]">
                <tr>
                  <td className="px-3 py-2.5 font-bold">IP Address</td>
                  <td className="px-3 py-2.5">The local network address assigned to the device.</td>
                  <td className="px-3 py-2.5">Ping it or use nslookup to resolve its hostname.</td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-bold">MAC Address</td>
                  <td className="px-3 py-2.5">Hardware identifier burned into the device&apos;s NIC.</td>
                  <td className="px-3 py-2.5">Look up the first 6 digits (OUI) to identify the manufacturer.</td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-bold">Hostname / Name</td>
                  <td className="px-3 py-2.5">The network name the device broadcasts (set in OS settings).</td>
                  <td className="px-3 py-2.5">Compare against your known device names list.</td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-bold">Connection Type</td>
                  <td className="px-3 py-2.5">Whether connected via 2.4 GHz, 5 GHz, or Ethernet.</td>
                  <td className="px-3 py-2.5">Wired devices should be things like desktops or NAS units.</td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-bold">Lease Time</td>
                  <td className="px-3 py-2.5">How long until the IP address assignment expires.</td>
                  <td className="px-3 py-2.5">Short remaining time means the device may soon disconnect.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* =====================================================================
            SECTION 3: DHCP LEASE TABLE
            ===================================================================== */}
        <section className="prose prose-invert max-w-none space-y-4" aria-label="DHCP Lease Table">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            Section 3 — Method 2: DHCP Lease Table
          </h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            The DHCP (Dynamic Host Configuration Protocol) server running inside
            your router maintains a lease table — a database of every IP address
            it has assigned, to which MAC address, and for how long. This table
            is especially useful for catching devices that recently disconnected
            but were previously on your network.
          </p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            To find the DHCP lease table, log into your{" "}
            <Link href="/router-settings" className="text-[var(--brand-400)] hover:underline font-semibold">
              router settings
            </Link>{" "}
            and navigate to:{" "}
            <strong>Advanced &gt; DHCP Server &gt; DHCP Client List</strong> (TP-Link),{" "}
            <strong>LAN &gt; DHCP Server &gt; Clients List</strong> (ASUS), or{" "}
            <strong>Advanced &gt; LAN Setup</strong> (Netgear). The lease table
            shows both currently connected and recently expired leases (active
            vs. inactive), giving you a historical view of who has been on your
            network even if they are no longer present.
          </p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            DHCP lease duration is configured in the router settings (typically
            24 hours for home routers, 8 hours for some consumer models). A
            device that connected to your network this morning but is now turned
            off will still appear in the lease table until the lease expires.
            This makes DHCP leases a valuable forensic tool — if you see an
            unfamiliar device with a recently expired lease, it was on your
            network within the last 24 hours.
          </p>
        </section>

        {/* =====================================================================
            SECTION 4: ARP TABLE
            ===================================================================== */}
        <section className="prose prose-invert max-w-none space-y-4" aria-label="ARP Table">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            Section 4 — Method 3: ARP Table Inspection
          </h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            The ARP (Address Resolution Protocol) cache is a table maintained by
            each computer that records the IP-to-MAC address mappings of every
            device it has directly communicated with on the local network. Unlike
            the router&apos;s client list (which shows what the router sees), the ARP
            table shows what your specific computer has seen — useful for
            cross-referencing and detecting discrepancies.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="glass-card p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Monitor size={14} className="text-blue-400" />
                <span className="font-bold text-sm text-[var(--text-primary)]">Windows</span>
              </div>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed mb-2">
                Open Command Prompt and run:
              </p>
              <code className="block text-[11px] bg-[var(--bg-surface)] p-2 rounded text-emerald-400 font-mono">
                arp -a
              </code>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed mt-2">
                For a detailed neighbor table with state info:
              </p>
              <code className="block text-[11px] bg-[var(--bg-surface)] p-2 rounded text-emerald-400 font-mono mt-1">
                Get-NetNeighbor
              </code>
            </div>

            <div className="glass-card p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Terminal size={14} className="text-purple-400" />
                <span className="font-bold text-sm text-[var(--text-primary)]">macOS</span>
              </div>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed mb-2">
                Open Terminal and run:
              </p>
              <code className="block text-[11px] bg-[var(--bg-surface)] p-2 rounded text-emerald-400 font-mono">
                arp -a
              </code>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed mt-2">
                For a subnet-wide scan via nmap (install with Homebrew):
              </p>
              <code className="block text-[11px] bg-[var(--bg-surface)] p-2 rounded text-emerald-400 font-mono mt-1">
                nmap -sn 192.168.1.0/24
              </code>
            </div>

            <div className="glass-card p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Terminal size={14} className="text-green-400" />
                <span className="font-bold text-sm text-[var(--text-primary)]">Linux</span>
              </div>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed mb-2">
                View neighbor table:
              </p>
              <code className="block text-[11px] bg-[var(--bg-surface)] p-2 rounded text-emerald-400 font-mono">
                ip neigh show
              </code>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed mt-2">
                Full LAN scan with arp-scan:
              </p>
              <code className="block text-[11px] bg-[var(--bg-surface)] p-2 rounded text-emerald-400 font-mono mt-1">
                sudo arp-scan --localnet
              </code>
            </div>
          </div>

          <p className="text-sm text-[var(--text-secondary)] leading-relaxed mt-4">
            The ARP table output shows each device as an IP address followed by
            its MAC address and the interface it is reachable on. Entries marked
            as <code>dynamic</code> are real discovered devices; entries marked
            as <code>static</code> are manually added or loopback addresses.
            ARP entries expire after a period of inactivity (typically 2–20
            minutes depending on OS), so this method is best used when devices
            are actively on the network.
          </p>
        </section>

        {/* =====================================================================
            SECTION 5: FING
            ===================================================================== */}
        <section className="prose prose-invert max-w-none space-y-4" aria-label="Fing Network Scanner">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            Section 5 — Method 4: Fing Network Scanner
          </h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            Fing is one of the most powerful and user-friendly network discovery
            tools available. It goes beyond the basic ARP scan by actively
            fingerprinting devices using a combination of ARP, mDNS, SNMP, and
            UPNP probes, cross-referencing results against a proprietary device
            database covering millions of hardware models. This means Fing can
            often identify a Samsung Galaxy S24, a Ring doorbell, or a Sonos
            speaker by hardware signature alone — something the router&apos;s plain
            client list cannot do.
          </p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            <strong>How to use Fing:</strong> Download the Fing app on iOS or
            Android (free), connect your phone to the WiFi network you want to
            audit, and tap <strong>Devices</strong> at the bottom of the screen.
            Fing automatically discovers all active devices and displays their
            IP, MAC, manufacturer (OUI), hostname, and detected device type. For
            desktop use, Fing also offers Fing Desktop for Windows and macOS,
            which supports continuous background monitoring and alert
            notifications when new devices join the network.
          </p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            The continuous monitoring feature (requires a free Fing account) is
            particularly valuable for security — it sends an alert to your phone
            whenever a new device connects to your network, giving you real-time
            intrusion detection without requiring dedicated hardware.
          </p>
        </section>

        {/* =====================================================================
            SECTION 6: ANGRY IP SCANNER
            ===================================================================== */}
        <section className="prose prose-invert max-w-none space-y-4" aria-label="Angry IP Scanner">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            Section 6 — Method 5: Angry IP Scanner
          </h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            Angry IP Scanner is a fast, lightweight, open-source network scanner
            available for Windows, macOS, and Linux. It sweeps a specified IP
            range (for example, 192.168.1.1–192.168.1.254) by sending ICMP ping
            packets to each address and recording which ones respond. It then
            resolves hostnames via DNS/NetBIOS and optionally scans for open
            ports.
          </p>
          <div className="border-l-4 border-[var(--brand-500)] pl-4 py-2 space-y-2 text-xs text-[var(--text-secondary)] bg-[var(--bg-elevated)] rounded-r-xl">
            <span className="font-bold text-[var(--text-primary)] block">
              How to run an Angry IP Scanner audit:
            </span>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Download Angry IP Scanner from angryip.org and install it (Java required on some systems).</li>
              <li>In the <strong>IP Range</strong> field, enter your subnet range. For a typical home network, this is <code>192.168.1.1</code> to <code>192.168.1.254</code> (or <code>192.168.0.1</code> to <code>192.168.0.254</code>).</li>
              <li>Click the <strong>Start</strong> button. The scanner will ping each address in the range and display results as it goes.</li>
              <li>Use <strong>Tools &gt; Fetchers</strong> to add columns for MAC address, NetBIOS name, and TTL.</li>
              <li>Export the results to CSV via <strong>File &gt; Save</strong> to keep a record for comparison over time.</li>
            </ol>
          </div>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            Unlike Fing, Angry IP Scanner does not require an account and
            performs purely local discovery with no external data transmission.
            It is best suited for technical users who want full control over
            their scanning parameters and prefer a desktop-first tool.
          </p>
        </section>

        {/* =====================================================================
            SECTION 7: WINDOWS BUILT-IN TOOLS
            ===================================================================== */}
        <section className="prose prose-invert max-w-none space-y-4" aria-label="Windows Built-in Tools">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            Section 7 — Method 6: Windows Built-in Discovery Tools
          </h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            Windows provides several native tools for discovering devices on your
            local network without installing third-party software. These are
            available in all modern versions of Windows 10 and Windows 11.
          </p>
          <div className="space-y-3">
            <div className="glass-card p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl">
              <p className="text-xs font-bold text-[var(--text-primary)] mb-1">Command Prompt: net view</p>
              <code className="block text-[11px] bg-[var(--bg-surface)] p-2 rounded text-emerald-400 font-mono mb-2">
                net view /all
              </code>
              <p className="text-[11px] text-[var(--text-muted)]">
                Lists all Windows computers and shared resources visible on the local network via the NetBIOS/SMB protocol. Does not show non-Windows devices.
              </p>
            </div>
            <div className="glass-card p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl">
              <p className="text-xs font-bold text-[var(--text-primary)] mb-1">PowerShell: Get-NetNeighbor</p>
              <code className="block text-[11px] bg-[var(--bg-surface)] p-2 rounded text-emerald-400 font-mono mb-2">
                Get-NetNeighbor -State Reachable | Select-Object IPAddress, LinkLayerAddress, State
              </code>
              <p className="text-[11px] text-[var(--text-muted)]">
                Returns the ARP/NDP neighbor cache showing all reachable devices. More detailed than <code>arp -a</code>, with state information for each entry.
              </p>
            </div>
            <div className="glass-card p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl">
              <p className="text-xs font-bold text-[var(--text-primary)] mb-1">File Explorer: Network</p>
              <p className="text-[11px] text-[var(--text-muted)]">
                Open File Explorer and click <strong>Network</strong> in the left sidebar. Windows will scan for UPnP, SMB, and DLNA devices and display them visually. Ensure Network Discovery is enabled in Advanced Sharing Settings for this to work.
              </p>
            </div>
          </div>
        </section>

        {/* =====================================================================
            SECTION 8: MACOS METHODS
            ===================================================================== */}
        <section className="prose prose-invert max-w-none space-y-4" aria-label="macOS Methods">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            Section 8 — Method 7: macOS Network Discovery Methods
          </h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            macOS provides both GUI and command-line methods for discovering
            local network devices. The most comprehensive approach combines the
            built-in ARP cache with a Bonjour browser and optional nmap
            scanning.
          </p>
          <div className="space-y-3">
            <div className="glass-card p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl">
              <p className="text-xs font-bold text-[var(--text-primary)] mb-1">Terminal: arp -a</p>
              <p className="text-[11px] text-[var(--text-muted)] mb-2">Run in Terminal to see the ARP cache:</p>
              <code className="block text-[11px] bg-[var(--bg-surface)] p-2 rounded text-emerald-400 font-mono">
                arp -a
              </code>
            </div>
            <div className="glass-card p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl">
              <p className="text-xs font-bold text-[var(--text-primary)] mb-1">nmap Full Subnet Scan (via Homebrew)</p>
              <code className="block text-[11px] bg-[var(--bg-surface)] p-2 rounded text-emerald-400 font-mono mb-2">
                nmap -sn 192.168.1.0/24
              </code>
              <p className="text-[11px] text-[var(--text-muted)]">
                Install nmap via Homebrew (<code>brew install nmap</code>). This performs a ping scan of the entire /24 subnet and reports all responding hosts with their MAC addresses and manufacturer.
              </p>
            </div>
            <div className="glass-card p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl">
              <p className="text-xs font-bold text-[var(--text-primary)] mb-1">Finder: Network Browser</p>
              <p className="text-[11px] text-[var(--text-muted)]">
                Open Finder and click <strong>Network</strong> in the sidebar. macOS uses Bonjour (mDNS) to discover Apple devices, AirPlay receivers, and SMB shares. This is limited to Bonjour-announcing devices.
              </p>
            </div>
          </div>
        </section>

        {/* =====================================================================
            SECTION 9: LINUX METHODS
            ===================================================================== */}
        <section className="prose prose-invert max-w-none space-y-4" aria-label="Linux Methods">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            Section 9 — Method 8: Linux Network Discovery Commands
          </h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            Linux provides the most powerful set of native network discovery
            tools. The following commands work across most distributions
            (Ubuntu, Debian, Fedora, Arch).
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-[11px] text-[var(--text-secondary)]">
              <thead>
                <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                  <th className="px-3 py-2 text-left">Command</th>
                  <th className="px-3 py-2 text-left">What It Does</th>
                  <th className="px-3 py-2 text-left">Install Required?</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)]">
                <tr>
                  <td className="px-3 py-2.5 font-mono">ip neigh show</td>
                  <td className="px-3 py-2.5">Shows ARP/NDP neighbor table with state and MAC addresses.</td>
                  <td className="px-3 py-2.5">No (iproute2)</td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-mono">arp -a</td>
                  <td className="px-3 py-2.5">Legacy ARP cache display; shows IP and MAC of known hosts.</td>
                  <td className="px-3 py-2.5">No (net-tools)</td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-mono">nmap -sn 192.168.1.0/24</td>
                  <td className="px-3 py-2.5">Ping sweep of entire subnet; reports all responding hosts + MACs.</td>
                  <td className="px-3 py-2.5">nmap package</td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-mono">sudo arp-scan --localnet</td>
                  <td className="px-3 py-2.5">ARP scan of local network; very fast, shows all hosts.</td>
                  <td className="px-3 py-2.5">arp-scan package</td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-mono">cat /var/lib/dhcp/dhcpd.leases</td>
                  <td className="px-3 py-2.5">View DHCP lease database if your machine is the DHCP server.</td>
                  <td className="px-3 py-2.5">No (if DHCP server running)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* =====================================================================
            SECTION 10: WHAT TO DO WITH UNKNOWN DEVICES
            ===================================================================== */}
        <section className="prose prose-invert max-w-none space-y-4" aria-label="Unknown Device Actions">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            Section 10 — What to Do When You Find an Unknown Device
          </h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            Discovering an unfamiliar device is alarming, but not every unknown
            entry is an intruder. Before taking action, follow this systematic
            identification process:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                step: "1",
                title: "Look Up the MAC OUI",
                desc: "Take the first 6 characters (OUI prefix) of the device's MAC address and look it up at macvendors.com or similar. This reveals the hardware manufacturer — helping you identify cameras (Hikvision, Ring), smart TVs (Samsung, LG), or IoT devices (Espressif for ESP8266/ESP32 modules).",
                color: "text-blue-400",
              },
              {
                step: "2",
                title: "Check All Your Devices",
                desc: "Systematically check the MAC address or network name of every device in your home — including those you may have forgotten about: old tablets, smart plugs, NAS devices, printers, or game consoles on standby.",
                color: "text-emerald-400",
              },
              {
                step: "3",
                title: "Block & Change Password",
                desc: "If you cannot identify the device after a thorough check, block it immediately via your router's Access Control or MAC filter. Then change your WiFi password to invalidate any cached credentials. See our guide on how to block a device on your router.",
                color: "text-amber-400",
              },
              {
                step: "4",
                title: "Upgrade Your Security",
                desc: "After blocking the device, use the opportunity to upgrade your network security: enable WPA3, disable WPS, create a guest network for visitors, and review your router's firmware version. See our full WiFi Security Guide.",
                color: "text-rose-400",
              },
            ].map((item) => (
              <div key={item.step} className="glass-card p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-lg font-black ${item.color}`}>
                    {item.step}
                  </span>
                  <span className="font-bold text-sm text-[var(--text-primary)]">{item.title}</span>
                </div>
                <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            For complete instructions on removing a device from your network
            using MAC filtering, ACL rules, or parental controls, see our
            detailed guide:{" "}
            <Link href="/block-device-on-router" className="text-[var(--brand-400)] hover:underline font-semibold">
              How to Block a Device on Your Router
            </Link>
            . To change your WiFi password and invalidate all existing
            connections, visit our{" "}
            <Link href="/change-wifi-password" className="text-[var(--brand-400)] hover:underline font-semibold">
              WiFi Password Change Guide
            </Link>.
          </p>
        </section>

        {/* =====================================================================
            RELATED GUIDES
            ===================================================================== */}
        <div className="mb-10 p-5 glass-card border border-[var(--border-subtle)] rounded-2xl">
          <h2 className="text-base font-bold text-[var(--text-primary)] mb-4 flex items-center gap-1.5">
            <Link2 size={16} className="text-[var(--brand-400)]" /> Related Guides &amp; Network Optimizations
          </h2>
          <div className="flex flex-wrap gap-2.5">
            {[
              { label: "WiFi Security Hub", href: "/wifi-security" },
              { label: "Block Device on Router", href: "/block-device-on-router" },
              { label: "WPA3 vs WPA2", href: "/wpa3-vs-wpa2" },
              { label: "Set Up Guest WiFi", href: "/guest-wifi-setup" },
              { label: "Change WiFi Password", href: "/change-wifi-password" },
              { label: "Router Login Guide", href: "/router-login" },
              { label: "Router Settings Overview", href: "/router-settings" },
              { label: "Default Router Passwords", href: "/router-password" },
              { label: "Router Admin Hub", href: "/router-admin" },
              { label: "DNS Security Guide", href: "/dns" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs bg-[var(--bg-elevated)] border border-[var(--border-subtle)] hover:border-[var(--brand-800)] px-3 py-1.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--brand-400)] hover:bg-[var(--bg-hover)] transition-all font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </TroubleshootingArticleShell>
  );
}
