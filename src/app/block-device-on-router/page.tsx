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
  Sliders,
  Clock,
  Lock,
  Settings,
  HelpCircle,
} from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "How to Block a Device on Your Router (MAC Filtering & ACL Guide 2026)",
  description:
    "Step-by-step guide to blocking devices on your router using MAC address filtering, ACL rules, and parental controls. ASUS, TP-Link, and Netgear walkthroughs included.",
  canonical: "/block-device-on-router",
  keywords: [
    "block device on router",
    "mac address filtering",
    "how to block wifi device",
    "kick device off wifi",
    "router acl",
    "parental controls router",
    "block internet access router",
    "mac filtering asus",
    "block device tp-link",
    "netgear block device",
  ],
});

const breadcrumbs = [
  { name: "WiFi Security", url: "/wifi-security" },
  { name: "Block Device on Router", url: "/block-device-on-router" },
];

const troubleshootingSteps = [
  {
    title: "Log Into Your Router Admin Panel",
    description:
      "Open any web browser connected to your network and type the router's default gateway IP address (such as 192.168.1.1, 192.168.0.1, or 192.168.50.1) into the URL search bar. Enter your administrative credentials to sign in.",
    tip: "If you do not know your gateway IP address, check the sticker on the back of the physical router or consult our default settings guide.",
  },
  {
    title: "Navigate to Client List / DHCP Status",
    description:
      "Locate the device monitoring screen, which may be named 'Network Map', 'Attached Devices', 'DHCP Client List', or 'Client Status'. This displays every device currently connected to your network.",
    tip: "Look for device names, IP addresses, and MAC addresses to identify the exact device you want to block.",
  },
  {
    title: "Identify the Target Device's MAC Address",
    description:
      "Note down the 12-character alphanumeric physical MAC address of the target device. Check it against your list of known hardware to ensure you do not block a critical system.",
    tip: "If the device hostname is empty or generic, use an online MAC lookup tool to identify the hardware manufacturer.",
  },
  {
    title: "Add the MAC Address to the Block or Deny List",
    description:
      "Go to your router's MAC Filtering, Access Control, or Parental Controls settings. Choose the block or deny mode, select the target MAC address from the client list or enter it manually, and add it to the rule list.",
    tip: "Make sure you choose 'Block' or 'Reject' mode, as selecting 'Allow' (Whitelist) will block all other devices except the ones listed.",
  },
  {
    title: "Save Settings and Verify Disconnection",
    description:
      "Click Save, Apply, or OK to implement the rules. The router's wireless radio may temporarily restart. Test the target device to ensure it no longer has local network or internet access.",
    tip: "Check the router client list to confirm that the device status shows as blocked or restricted.",
  },
];

const faqs = [
  {
    question: "How do I block a device from my WiFi?",
    answer:
      "To block a device from your WiFi, you must log into your router's web interface (typically by typing 192.168.1.1 or 192.168.0.1 in a browser). Go to the 'Access Control', 'MAC Filtering', or 'Parental Controls' settings page. Find the target device under the client list, select its MAC address, add it to the block or deny list, and click 'Apply'. This instantly revokes its internet access and prevents it from communicating with other local devices.",
  },
  {
    question: "Will blocked devices know they are blocked?",
    answer:
      "Not directly. A blocked device will not receive a pop-up alert stating it was blocked by the administrator. Instead, the device will display symbols indicating a successful WiFi connection but 'No Internet Access', or it will fail to obtain an IP address altogether. Web browser requests on the blocked device will time out with 'DNS Probe Finished No Internet' or generic connection errors.",
  },
  {
    question: "Can a blocked device reconnect using a different MAC address?",
    answer:
      "Yes, modern smartphones, tablets, and computers feature MAC address randomization (Private Wi-Fi Address) by default. If a device has this enabled, it can generate a new virtual MAC address and reconnect if it knows the Wi-Fi password. To prevent this, you should change your WiFi password and enable WPA3, or configure your router to use a Whitelist (Allow List) where only pre-approved MAC addresses can connect.",
  },
  {
    question: "Does blocking a device disconnect them immediately?",
    answer:
      "Yes, in most routers. Enabling Access Control or MAC filtering on a specific client will trigger the router to immediately drop the device's current session and deauthenticate it from the wireless network. In some routers, a soft reboot of the wireless radio occurs, briefly disconnects all clients, and then reconnects all non-blocked clients while ignoring the blocked device's connection requests.",
  },
  {
    question: "What is the difference between MAC filtering and parental controls?",
    answer:
      "MAC filtering operates at Layer 2 (Data Link) of the OSI model and blocks a device completely based on its hardware identifier. Parental controls are higher-level software applications running on the router that allow for content filtering (blocking specific sites or categories), daily time quotas, and scheduling. Parental controls are designed for content moderation, while MAC filtering is designed for network security and hardware-level isolation.",
  },
  {
    question: "Can I block a device on a specific time schedule?",
    answer:
      "Yes. Most modern routers allow you to configure time-based scheduling via Access Control Lists (ACL) or Parental Controls. You can set rules that block internet access for specific MAC addresses or profiles during designated time windows, such as bedtime hours (e.g., 10 PM to 7 AM) or during school hours, while allowing normal connection access outside of these periods.",
  },
  {
    question: "How do I find the MAC address of a device I want to block?",
    answer:
      "You can find it by logging into your router's admin panel and checking the 'Network Map' or 'Attached Devices' list. The router lists every connected device's IP, hostname, and MAC address. Alternatively, on the device itself, you can find it under wireless hardware properties (labeled as 'Wi-Fi Address' on iOS, 'MAC Address' on Android/Windows, or 'Ethernet Address' on macOS).",
  },
  {
    question: "What should I do if an unknown device keeps reconnecting?",
    answer:
      "If an unknown device keeps reconnecting even after being blocked, the user is likely utilizing MAC address randomization to bypass your block. The only foolproof resolution is to change your WiFi password to a strong, complex passphrase and ensure you are using WPA3 or WPA2-AES encryption. Additionally, you can set up a Guest WiFi network with isolated access to keep untrusted devices off your primary local network.",
  },
  {
    question: "Can I block a device using its IP address instead of its MAC address?",
    answer:
      "You can, but it is not recommended unless you have set up a DHCP Reservation (Static IP) for that device. If a device obtains its IP address dynamically via DHCP, its IP address can change over time or after a router reboot, rendering the IP-based block rule ineffective. A MAC address is a permanent physical identifier, making MAC-based blocks far more persistent and reliable.",
  },
  {
    question: "Does MAC filtering slow down my router's network performance?",
    answer:
      "For consumer routers, MAC filtering has a negligible impact on performance because the router checks the MAC address table only during the initial authentication and association phase, or when rebuilding routing tables. It does not actively inspect every data packet for MAC validation during active transfers. However, having hundreds of custom ACL rules can slightly consume CPU cycles on low-end hardware, but standard home usage will experience no visible lag.",
  },
  {
    question: "How do VPNs interact with router-based blocks and content filters?",
    answer:
      "If you block a device entirely via MAC address filtering or Access Control, a VPN cannot bypass it because the block stops the device at the physical connection layer. However, if you are only using router-based content filters (blocking specific websites), a user on an allowed device can use a VPN to encrypt their traffic and bypass the router's DNS-based web filters, since the router will only see encrypted packets going to the VPN server.",
  },
  {
    question: "What is the difference between Blacklisting (Deny List) and Whitelisting (Allow List)?",
    answer:
      "Blacklisting (Deny List) allows all devices to connect to your WiFi except for the specific MAC addresses you add to the block list. This is highly convenient but requires constant maintenance. Whitelisting (Allow List) blocks all devices by default, permitting network access only to the specific MAC addresses you have pre-registered. Whitelisting is extremely secure but requires you to manually log in and add every new device, guest phone, or smart plug before they can connect.",
  },
];

const commonCauses = [
  {
    title: "Unauthorized Neighbor Connection",
    desc: "A neighbor or nearby user has guessed or obtained your WiFi passphrase, using your local area network to browse the internet, download large files, or access shared storage.",
  },
  {
    title: "Uncontrolled Screen Time for Kids",
    desc: "A child's smartphone, tablet, or gaming console is accessing the internet past bedtime or during study hours, requiring selective access restrictions.",
  },
  {
    title: "Bandwidth-Heavy IoT Devices",
    desc: "A smart camera, streaming box, or smart TV is constantly uploading or downloading telemetry data, degrading network speeds for working systems.",
  },
  {
    title: "Forgotten Guest Devices",
    desc: "A visitor's device that was allowed on the primary network stays active and auto-connects whenever they are nearby, bypassing guest network isolation.",
  },
];

const quickFixChecklist = [
  "Identify the target device's unique physical MAC address from the router's client list.",
  "Navigate to the Access Control, MAC Filtering, or Parental Controls menu in the router interface.",
  "Add the target device's MAC address to the blacklist/deny list.",
  "Apply the changes to save the firewall rules and disconnect the client.",
  "Modify your primary WiFi password to prevent the blocked client from re-connecting with a new randomized MAC address.",
];

// ─── SCHEMAS ────────────────────────────────────────────────────────────────

const techArticleSchema = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "@id": `${APP_URL}/block-device-on-router#article`,
  url: `${APP_URL}/block-device-on-router`,
  headline:
    "How to Block a Device on Your Router: MAC Filtering, ACL & Parental Controls (2026)",
  description:
    "Step-by-step guide to blocking devices on your router using MAC address filtering, ACL rules, and parental controls. ASUS, TP-Link, and Netgear walkthroughs included.",
  author: { "@type": "Organization", name: "RouterVia" },
  publisher: { "@type": "Organization", name: "RouterVia" },
  dateModified: new Date().toISOString().split("T")[0],
  proficiencyLevel: "Intermediate",
  about: [
    { "@type": "Thing", name: "Wireless MAC Address Filtering" },
    { "@type": "Thing", name: "Access Control List" },
    { "@type": "Thing", name: "WiFi Network Security" },
  ],
};

const faqPageSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${APP_URL}/block-device-on-router#faq`,
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

const collectionPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${APP_URL}/block-device-on-router#collection`,
  url: `${APP_URL}/block-device-on-router`,
  name: "Router Access Controls & Blocked Device Management",
  description:
    "A collection of guides and technical walkthroughs for blocking devices, configuring MAC filters, and scheduling internet access on wireless routers.",
  about: [{ "@type": "Thing", name: "WiFi Security" }],
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
      name: "Block Device on Router",
      item: `${APP_URL}/block-device-on-router`,
    },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "@id": `${APP_URL}/block-device-on-router#asus-howto`,
  name: "How to Block a Device on ASUS Routers",
  description:
    "Step-by-step instructions for blocking a connected device via the ASUSWRT administrative panel.",
  totalTime: "PT5M",
  supply: [
    { "@type": "HowToSupply", name: "ASUS Router Admin Credentials" },
    { "@type": "HowToSupply", name: "Device MAC Address" },
  ],
  tool: [
    { "@type": "HowToTool", name: "Web Browser" },
    { "@type": "HowToTool", name: "Computer or Smartphone" },
  ],
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Access Admin Panel",
      text: "Open a browser, go to 192.168.50.1 or router.asus.com, and sign in using your administrator username and password.",
      url: `${APP_URL}/block-device-on-router#asus-step-1`,
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Find Device in Network Map",
      text: "On the home screen, click the 'Clients' icon under Network Map to open the connected devices sidebar.",
      url: `${APP_URL}/block-device-on-router#asus-step-2`,
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Toggle Block Access",
      text: "Select the target client in the list and toggle the 'Block Internet Access' switch to ON, then click Apply.",
      url: `${APP_URL}/block-device-on-router#asus-step-3`,
    },
  ],
};

export default function BlockDeviceOnRouterPage() {
  return (
    <TroubleshootingArticleShell
      h1="How to Block a Device on Your Router: MAC Filtering, ACL & Parental Controls (2026)"
      intro="Whether you've found an unauthorized device on your network, want to restrict a child's internet access, or need to block a bandwidth-heavy device during working hours, your router provides several methods to control exactly which devices can connect. This guide covers MAC address filtering, ACL rules, parental controls, and scheduling restrictions across ASUS, TP-Link, and Netgear routers."
      category="wifi"
      breadcrumbs={breadcrumbs}
      faqs={faqs}
      troubleshootingSteps={troubleshootingSteps}
      warningBanner={{
        title: "MAC Filtering Is Not Foolproof",
        text: "MAC address filtering can be bypassed by MAC spoofing — an attacker can clone an allowed device's MAC address. Use MAC filtering as one layer of defense alongside a strong WPA3 password, not as your sole security measure.",
      }}
      quickFixChecklist={quickFixChecklist}
      commonCauses={commonCauses}
      severityLevel="medium"
    >
      <JsonLd data={techArticleSchema} />
      <JsonLd data={faqPageSchema} />
      <JsonLd data={collectionPageSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={howToSchema} />

      <div className="space-y-10">
        {/* =====================================================================
            AI OVERVIEW SUMMARY
            ===================================================================== */}
        <section
          className="glass-card p-6 border border-emerald-950/30 bg-emerald-950/5 rounded-2xl relative overflow-hidden"
          aria-label="Quick Answer Summary"
        >
          <div className="absolute top-0 right-0 bg-emerald-500/10 text-emerald-400 text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-bl-lg font-bold">
            AI Overview Summary
          </div>
          <h2 className="text-xs font-bold text-emerald-400 mb-3 uppercase tracking-wide flex items-center gap-1.5">
            <Shield size={12} /> Router Blocking Quick Breakdown
          </h2>
          <div className="overflow-x-auto mb-4">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-[11px] text-[var(--text-secondary)]">
              <thead>
                <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                  <th className="px-3 py-2 text-left border-b border-[var(--border-subtle)]">
                    Method
                  </th>
                  <th className="px-3 py-2 text-left border-b border-[var(--border-subtle)]">
                    OSI Layer
                  </th>
                  <th className="px-3 py-2 text-left border-b border-[var(--border-subtle)]">
                    Primary Use Case
                  </th>
                  <th className="px-3 py-2 text-left border-b border-[var(--border-subtle)]">
                    Bypass Resistance
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)]">
                <tr>
                  <td className="px-3 py-2.5 font-bold text-emerald-400">
                    MAC Address Filtering
                  </td>
                  <td className="px-3 py-2.5">Layer 2 (Data Link)</td>
                  <td className="px-3 py-2.5">
                    Permanent ban or allowlist of specific physical network adapters.
                  </td>
                  <td className="px-3 py-2.5">
                    Low (Easy to bypass via software-based MAC address spoofing).
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-bold text-emerald-400">
                    Access Control Lists (ACL)
                  </td>
                  <td className="px-3 py-2.5">Layer 2, 3, or 4</td>
                  <td className="px-3 py-2.5">
                    Detailed rules blocking specific ports, protocols, or local subnets.
                  </td>
                  <td className="px-3 py-2.5">
                    Medium (Requires changing IP/MAC or matching static leases).
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-bold text-emerald-400">
                    Parental Controls
                  </td>
                  <td className="px-3 py-2.5">Layer 7 (Application)</td>
                  <td className="px-3 py-2.5">
                    Content categories, web domain filtering, and screen-time profiles.
                  </td>
                  <td className="px-3 py-2.5">
                    High (DPI and DNS filtering; partially bypassed via VPN).
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-bold text-emerald-400">
                    Time Scheduling
                  </td>
                  <td className="px-3 py-2.5">Cross-layer Integration</td>
                  <td className="px-3 py-2.5">
                    Restricting internet access during nightly hours or study blocks.
                  </td>
                  <td className="px-3 py-2.5">
                    Medium (Bypassed if device settings change system time or use VPN).
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Using a combination of these methods is the most effective way to secure your network.
            Always supplement physical hardware blocks with a strong WPA3 passphrase to prevent clients
            from simply generating randomized addresses and reconnecting.
          </p>
        </section>

        {/* =====================================================================
            SECTION 1: METHODS TO BLOCK A DEVICE
            ===================================================================== */}
        <section
          className="prose prose-invert max-w-none space-y-4"
          aria-label="Methods to Block a Device"
        >
          <div className="flex items-center gap-2 text-[var(--brand-400)] font-semibold text-xs uppercase tracking-wider mb-2">
            <Settings size={14} /> Network Control Methods
          </div>
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            Section 1 — Methods to Block a Device: Overview &amp; When to Use
          </h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            Managing access to your local network requires selecting the appropriate administrative
            tool for the job. Modern wireless gateways and routers do not rely on a single mechanism;
            rather, they expose various overlapping control utilities. When you want to restrict a device
            from accessing the internet or communicating with other resources on your local subnet, you must choose
            between MAC filtering, Access Control Lists, Parental Controls, or Time-based Scheduling.
            Each of these functions operates at a different layer of the networking stack and offers varying
            levels of security, user convenience, and customizability.
          </p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            <strong>MAC address filtering</strong> is a Layer 2 hardware restriction. It checks the unique
            Media Access Control identifier burned into a device's network card. If you place a MAC address on
            a blacklist (deny list), the router rejects all traffic from that specific hardware, dropping its association.
            If you place it on a whitelist (allow list), only pre-registered devices can establish a connection.
            This method is highly effective for isolating old, static devices or banning specific known devices, but it
            is structurally vulnerable to MAC spoofing and device randomization.
          </p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            <strong>Access Control Lists (ACLs)</strong> are formal firewall rule sets that can operate at Layer 2 (MAC),
            Layer 3 (IP), or Layer 4 (Transport). ACL rules can prevent a device from accessing the external Wide Area Network
            (WAN) while still allowing it to print to local network printers or sync with a local NAS. This makes ACLs the preferred
            method for power users, developers, and small-office environments where devices need local connectivity but must be
            severely restricted from sending or receiving external internet traffic. To adjust these parameters, you must
            understand the basics of your{" "}
            <Link href="/router-settings" className="text-[var(--brand-400)] hover:underline font-semibold">
              Router Settings
            </Link>{" "}
            and firewall configurations.
          </p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            <strong>Parental Controls</strong> operate primarily at Layer 7 (the Application layer) and integrate with DNS
            resolvers. Instead of blocking the hardware entirely, parental control suites assign devices to specific user profiles.
            You can then enforce rules targeting specific types of network traffic, such as restricting gaming ports, filtering out
            adult website URLs, or enforcing daily time quotas (e.g., maximum 2 hours of online access). This is ideal for managing
            smartphones, tablets, and gaming consoles used by children.
          </p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            <strong>Time Scheduling</strong> allows administrators to toggle access dynamically based on the time of day.
            Rather than banning a device permanently, you can create a rule that denies WAN gateway access between 10:00 PM and
            7:00 AM on weekdays. This prevents late-night screen time while ensuring the device functions normally during school
            or working hours.
          </p>
        </section>

        {/* =====================================================================
            SECTION 2: WHAT IS MAC ADDRESS FILTERING
            ===================================================================== */}
        <section
          className="prose prose-invert max-w-none space-y-4"
          aria-label="What Is MAC Address Filtering"
        >
          <div className="flex items-center gap-2 text-[var(--brand-400)] font-semibold text-xs uppercase tracking-wider mb-2">
            <Wifi size={14} /> Layer 2 Hardware Control
          </div>
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            Section 2 — What Is MAC Address Filtering? Technical Mechanics &amp; Limits
          </h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            A Media Access Control (MAC) address is a unique 48-bit physical identifier assigned to a network interface controller
            (NIC) during manufacturing. Represented as six groups of two hexadecimal digits separated by colons or hyphens
            (e.g., <code>00:1A:2B:3C:4D:5E</code>), it operates at Layer 2 (Data Link) of the Open Systems Interconnection (OSI) model.
            While IP addresses are logical identifiers that change depending on the subnet a device joins, a MAC address is designed
            to remain constant, acting as the permanent physical fingerprint of the hardware interface.
          </p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            MAC filtering works by inspecting the frame headers of all incoming connection requests. Before the router completes the
            handshake process or grants an IP address via DHCP, it reads the source MAC address in the frame. Based on your configuration:
          </p>
          <ul className="list-disc list-inside text-xs text-[var(--text-secondary)] space-y-2 pl-4">
            <li>
              <strong>Deny List (Blacklist) Mode:</strong> The router permits all wireless connections by default. However, if a device
              initiates a connection and its MAC matches an entry in the Deny List database, the router rejects the association request,
              refusing to establish a wireless link.
            </li>
            <li>
              <strong>Allow List (Whitelist) Mode:</strong> The router blocks every single wireless connection request by default.
              Only devices whose physical MAC addresses have been pre-registered in the router's database are permitted to associate.
              This represents an extremely high level of protection but introduces massive administrative overhead, as every new device,
              including guest phones and new smart appliances, must be manually registered.
            </li>
          </ul>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            To block a device using this method, you must first discover its MAC address. You can do this by examining the active DHCP lease
            tables inside your router's administrative page. If you are uncertain about who is on your network, follow our extensive guide
            to learn{" "}
            <Link
              href="/how-to-see-who-is-on-my-wifi"
              className="text-[var(--brand-400)] hover:underline font-semibold"
            >
              How to See Who Is on My WiFi
            </Link>
            . Alternatively, you can find the MAC address directly on the client device. On Windows, executing <code>ipconfig /all</code>
            in Command Prompt displays the "Physical Address". On iOS, navigate to Settings &gt; General &gt; About &gt; Wi-Fi Address. On Android,
            go to Settings &gt; About Phone &gt; Status Information.
          </p>
          <div className="border-l-4 border-[var(--brand-500)] pl-4 py-2 space-y-2 text-xs text-[var(--text-secondary)] bg-[var(--bg-elevated)] rounded-r-xl">
            <span className="font-bold text-[var(--text-primary)] block">
              Warning: MAC Spoofing &amp; Randomization Limitations
            </span>
            Modern operating systems (such as iOS 14+, Android 10+, and Windows 10/11) implement a privacy feature called MAC randomization.
            When enabled, the device generates a randomized, virtual MAC address for each wireless network it joins. If you block a device,
            the user can toggle their Wi-Fi off and on, generating a new randomized MAC address and instantly bypassing your block rule.
            Furthermore, an attacker with basic networking tools like Wireshark can monitor your local wireless traffic, record an authorized
            MAC address, and clone it onto their machine using built-in command lines. For this reason, MAC filtering is considered an
            obsolete security protocol when used alone. It must coexist with modern encryption standards, such as WPA3-Personal. Check our
            security comparison on{" "}
            <Link
              href="/wpa3-vs-wpa2"
              className="text-[var(--brand-400)] hover:underline font-semibold"
            >
              WPA3 vs WPA2
            </Link>{" "}
            to understand how newer standards protect against Layer 2 hijacking.
          </div>
        </section>

        {/* =====================================================================
            SECTION 3: BLOCK A DEVICE ON ASUS ROUTERS
            ===================================================================== */}
        <section
          className="prose prose-invert max-w-none space-y-4"
          aria-label="Block a Device on ASUS Routers"
        >
          <div className="flex items-center gap-2 text-[var(--brand-400)] font-semibold text-xs uppercase tracking-wider mb-2">
            <Terminal size={14} /> Brand Configuration Walks
          </div>
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            Section 3 — Block a Device on ASUS Routers: Step-by-Step Walkthrough
          </h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            ASUS routers running the ASUSWRT firmware supply three methods to block client access: the quick client list toggle,
            the parental control engine, or the advanced wireless MAC filtering system. To begin, ensure your computer or phone is connected
            to the ASUS network and log into the web management portal.
          </p>

          <div className="space-y-6">
            <div className="glass-card p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl">
              <h3 className="text-sm font-bold text-[var(--text-primary)] mb-2 flex items-center gap-1.5">
                <span className="text-[var(--brand-400)]">Method A:</span> Instant Client Block (Network Map)
              </h3>
              <ol className="list-decimal list-inside text-xs text-[var(--text-secondary)] space-y-1.5 pl-2">
                <li>
                  Open a web browser and navigate to <code>192.168.50.1</code> or type <code>router.asus.com</code> in the URL bar.
                </li>
                <li>
                  Sign in with your administrator credentials. If you are unsure of the default login data, read our resource on{" "}
                  <Link
                    href="/router-password"
                    className="text-[var(--brand-400)] hover:underline font-semibold"
                  >
                    Default Router Passwords
                  </Link>
                  .
                </li>
                <li>
                  On the main screen, under the <strong>Network Map</strong> tab, locate the circular icon labeled{" "}
                  <strong>Clients</strong>. Click it to display the connected client panel on the right sidebar.
                </li>
                <li>
                  Scan the list of active clients. Once you locate the device you wish to restrict, click on its name or icon.
                </li>
                <li>
                  A detailed card will appear. Find the setting labeled <strong>Block Internet Access</strong>. Toggle the switch
                  to the <strong>ON</strong> position.
                </li>
                <li>
                  Click <strong>Apply</strong>. The router will instantly drop the connection and block WAN access for this device.
                </li>
              </ol>
            </div>

            <div className="glass-card p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl">
              <h3 className="text-sm font-bold text-[var(--text-primary)] mb-2 flex items-center gap-1.5">
                <span className="text-[var(--brand-400)]">Method B:</span> Parental Control Filters (AiProtection)
              </h3>
              <ol className="list-decimal list-inside text-xs text-[var(--text-secondary)] space-y-1.5 pl-2">
                <li>
                  From the left-hand navigation pane in the ASUS web portal, click on <strong>AiProtection</strong> (or{" "}
                  <strong>Parental Controls</strong> depending on firmware).
                </li>
                <li>
                  Click the <strong>Parental Controls</strong> tab at the top and toggle the main switch to <strong>ON</strong>.
                </li>
                <li>
                  Select the target client device from the dropdown menu (or type its MAC address manually).
                </li>
                <li>
                  Click the <strong>Add (+)</strong> button to bind the device to a profile.
                </li>
                <li>
                  To block specific web contents, select <strong>Web &amp; Apps Filters</strong> and check categories such as P2P, File
                  Transfer, or Media Streaming.
                </li>
                <li>
                  To schedule access restrictions, select <strong>Time Scheduling</strong> and click the pencil edit icon to select block
                  hours on the calendar grid. Save your settings.
                </li>
              </ol>
            </div>

            <div className="glass-card p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl">
              <h3 className="text-sm font-bold text-[var(--text-primary)] mb-2 flex items-center gap-1.5">
                <span className="text-[var(--brand-400)]">Method C:</span> Wireless MAC Filter (Layer 2 Policy)
              </h3>
              <ol className="list-decimal list-inside text-xs text-[var(--text-secondary)] space-y-1.5 pl-2">
                <li>
                  Under the left-hand <strong>Advanced Settings</strong> category, click on <strong>Wireless</strong>.
                </li>
                <li>
                  Navigate to the <strong>Wireless MAC Filter</strong> tab located at the top-right of the configuration area.
                </li>
                <li>
                  Set the frequency band (2.4GHz, 5GHz, or 6GHz) for which you want to apply the rule. Note: You must apply the rule
                  to all bands separately if the client is dual-band.
                </li>
                <li>
                  Change the <strong>Enable MAC Filter</strong> setting to <strong>Yes</strong>.
                </li>
                <li>
                  Set the <strong>Mac Filter Mode</strong>. Select <strong>Reject</strong> to blacklist the device, or{" "}
                  <strong>Accept</strong> to allow only designated MAC addresses.
                </li>
                <li>
                  In the Client MAC Address input field, enter the target device's MAC address, click the <strong>Add (+)</strong> button, and click <strong>Apply</strong>.
                </li>
              </ol>
            </div>
          </div>
        </section>

        {/* =====================================================================
            SECTION 4: BLOCK A DEVICE ON TP-LINK ROUTERS
            ===================================================================== */}
        <section
          className="prose prose-invert max-w-none space-y-4"
          aria-label="Block a Device on TP-Link Routers"
        >
          <div className="flex items-center gap-2 text-[var(--brand-400)] font-semibold text-xs uppercase tracking-wider mb-2">
            <Radio size={14} /> Archer &amp; Deco Interfaces
          </div>
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            Section 4 — Block a Device on TP-Link Routers: Step-by-Step Walkthrough
          </h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            TP-Link routers utilize the Archer firmware line (green or blue styling) or the Deco mobile application interface.
            Using the web GUI, you can block client devices through Access Control or Parental Controls. To configure this, log into the router
            using our{" "}
            <Link href="/router-login" className="text-[var(--brand-400)] hover:underline font-semibold">
              Router Login Guide
            </Link>{" "}
            and open the advanced settings page.
          </p>

          <div className="space-y-6">
            <div className="glass-card p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl">
              <h3 className="text-sm font-bold text-[var(--text-primary)] mb-2 flex items-center gap-1.5">
                <span className="text-[var(--brand-400)]">Method A:</span> Access Control Blacklist (Web Interface)
              </h3>
              <ol className="list-decimal list-inside text-xs text-[var(--text-secondary)] space-y-1.5 pl-2">
                <li>
                  Open your browser and navigate to <code>192.168.0.1</code>, <code>192.168.1.1</code>, or <code>tplinkwifi.net</code>.
                </li>
                <li>
                  Enter your admin password and click <strong>Log In</strong>.
                </li>
                <li>
                  Go to the <strong>Advanced</strong> tab located along the top menu navigation bar.
                </li>
                <li>
                  In the left sidebar, click to expand the <strong>Security</strong> menu, then select <strong>Access Control</strong>.
                </li>
                <li>
                  Toggle the main <strong>Access Control</strong> switch to the <strong>ON</strong> position.
                </li>
                <li>
                  Under <strong>Access Mode</strong>, make sure the button is set to <strong>Blacklist</strong>.
                </li>
                <li>
                  Scroll down to the <strong>Devices in Blacklist</strong> table and click the <strong>Add</strong> button.
                </li>
                <li>
                  Click <strong>Select from Device List</strong> to check a checkbox next to the active client, or manually type a custom name
                  and the client's 12-digit MAC address. Click <strong>Save</strong>.
                </li>
              </ol>
            </div>

            <div className="glass-card p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl">
              <h3 className="text-sm font-bold text-[var(--text-primary)] mb-2 flex items-center gap-1.5">
                <span className="text-[var(--brand-400)]">Method B:</span> Parental Controls Restrictions
              </h3>
              <ol className="list-decimal list-inside text-xs text-[var(--text-secondary)] space-y-1.5 pl-2">
                <li>
                  Navigate to the <strong>Basic</strong> or <strong>Advanced</strong> menu and click on <strong>Parental Controls</strong>.
                </li>
                <li>
                  Toggle the Parental Controls setting to <strong>ON</strong>.
                </li>
                <li>
                  Click the <strong>Add</strong> button on the right side of the screen to create a new rule profile.
                </li>
                <li>
                  Give the profile a name (e.g., 'Blocked Kid Phone') and select the device from the connected clients picker list.
                </li>
                <li>
                  Set the Time Limits. You can specify weekday and weekend time access caps, or define a <strong>Bedtime</strong> period
                  during which all internet requests are refused.
                </li>
                <li>
                  If desired, type specific domain keywords to block (e.g., 'facebook.com' or 'tiktok.com') to prevent access without blocking
                  the entire network interface. Click <strong>Save</strong>.
                </li>
              </ol>
            </div>
          </div>
        </section>

        {/* =====================================================================
            SECTION 5: BLOCK A DEVICE ON NETGEAR ROUTERS
            ===================================================================== */}
        <section
          className="prose prose-invert max-w-none space-y-4"
          aria-label="Block a Device on Netgear Routers"
        >
          <div className="flex items-center gap-2 text-[var(--brand-400)] font-semibold text-xs uppercase tracking-wider mb-2">
            <Monitor size={14} /> Nighthawk &amp; Orbi Systems
          </div>
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            Section 5 — Block a Device on Netgear Routers: Step-by-Step Walkthrough
          </h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            Netgear routers run the classic Netgear genie firmware or the modern Nighthawk browser portal.
            Both portals allow you to manage connections under Advanced Security parameters. Use the guide below to block
            a hardware client via `routerlogin.net` or its local fallback address.
          </p>

          <div className="space-y-6">
            <div className="glass-card p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl">
              <h3 className="text-sm font-bold text-[var(--text-primary)] mb-2 flex items-center gap-1.5">
                <span className="text-[var(--brand-400)]">Method A:</span> Access Control (Web Portal)
              </h3>
              <ol className="list-decimal list-inside text-xs text-[var(--text-secondary)] space-y-1.5 pl-2">
                <li>
                  Open your browser, navigate to <code>192.168.1.1</code>, <code>192.168.0.1</code>, or <code>routerlogin.net</code>.
                </li>
                <li>
                  Enter <code>admin</code> for the username and enter your custom password.
                </li>
                <li>
                  Once logged in, click on the <strong>ADVANCED</strong> tab located at the top-left of the page.
                </li>
                <li>
                  Expand the <strong>Security</strong> menu on the left sidebar and click on <strong>Access Control</strong>.
                </li>
                <li>
                  Check the box next to <strong>Turn on Access Control</strong>. Note that if you do not check this box, your rules will not execute.
                </li>
                <li>
                  Choose your default access rule. Select <strong>Allow all new devices to connect</strong> to allow new users while targeting specific block rules.
                </li>
                <li>
                  Go to the table showing <strong>Connected Devices</strong>. Find the client you want to disconnect, check the select box next to it, and click the <strong>Block</strong> button at the top of the table.
                </li>
                <li>
                  Ensure the device status has updated to <strong>Blocked</strong> in the Access Control list, then click <strong>Apply</strong>.
                </li>
              </ol>
            </div>

            <div className="glass-card p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl">
              <h3 className="text-sm font-bold text-[var(--text-primary)] mb-2 flex items-center gap-1.5">
                <span className="text-[var(--brand-400)]">Method B:</span> Smart Parental Controls (App-based Block)
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-2 pl-2">
                If your Netgear router is managed using the Nighthawk or Orbi App, you can pause access directly from your phone.
              </p>
              <ol className="list-decimal list-inside text-xs text-[var(--text-secondary)] space-y-1.5 pl-2">
                <li>
                  Launch the <strong>Nighthawk App</strong> on your mobile device. Make sure you are logged in locally or via remote access.
                </li>
                <li>
                  Tap the <strong>Device Manager</strong> tile on the dashboard to view the connected network list.
                </li>
                <li>
                  Locate and tap on the target device.
                </li>
                <li>
                  Tap the <strong>Pause Internet</strong> toggle. The status indicator will switch to red, and the router will immediately block its outbound WAN connection.
                </li>
              </ol>
            </div>
          </div>
        </section>

        {/* =====================================================================
            SECTION 6: USING ACL (ACCESS CONTROL LISTS)
            ===================================================================== */}
        <section
          className="prose prose-invert max-w-none space-y-4"
          aria-label="Using ACL"
        >
          <div className="flex items-center gap-2 text-[var(--brand-400)] font-semibold text-xs uppercase tracking-wider mb-2">
            <Sliders size={14} /> Advanced Firewall Policies
          </div>
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            Section 6 — Using Access Control Lists (ACL): IP vs MAC &amp; Time Rules
          </h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            In networking, an Access Control List (ACL) is a sequential list of permit or deny statements applied to IP addresses,
            MAC addresses, or specific ports. Unlike basic MAC filtering, which is a binary on/off switch for a wireless radio,
            ACL rules are evaluated line-by-line in the router's firewall engine. This allows you to construct highly complex,
            granular security boundaries. For example, you can create a rule that allows a local media server to distribute stream
            packets within the LAN but blocks it from connecting to external public IP addresses.
          </p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            When configuring ACL rules, you must choose between IP-based rules and MAC-based rules:
          </p>
          <ul className="list-disc list-inside text-xs text-[var(--text-secondary)] space-y-2 pl-4">
            <li>
              <strong>IP-based ACLs (Layer 3):</strong> These target packet headers based on source or destination IP addresses.
              IP-based rules are extremely flexible because they can block entire subnets or restrict access to external web servers. However,
              if the client device obtains a different IP address from the DHCP pool, the ACL rule will fail. To prevent this, you must configure a
              DHCP Reservation (Static IP binding) inside your{" "}
              <Link href="/router-settings" className="text-[var(--brand-400)] hover:underline font-semibold">
                Router Settings
              </Link>{" "}
              for the client's MAC address before applying an IP-based ACL.
            </li>
            <li>
              <strong>MAC-based ACLs (Layer 2):</strong> These target Layer 2 frames. They remain active even if the device changes its IP address,
              since the physical hardware identifier remains mapped. However, MAC-based ACLs cannot easily filter external WAN URLs or target specific TCP/UDP ports,
              as MAC addresses are stripped away once a packet passes through the Layer 3 routing engine.
            </li>
          </ul>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            Enterprise and prosumer routers (such as Ubiquiti UniFi, Cisco, or Mikrotik) support raw, stateful firewall rules.
            With these systems, you can isolate internal Virtual Local Area Networks (VLANs), keeping untrusted IoT sensors away from
            your corporate workstations. If you are hosting public-facing services, a VLAN setup is vital. Learn how to configure isolated channels in our guide on
            how to{" "}
            <Link
              href="/guest-wifi-setup"
              className="text-[var(--brand-400)] hover:underline font-semibold"
            >
              Set Up Guest WiFi Networks
            </Link>
            .
          </p>
        </section>

        {/* =====================================================================
            SECTION 7: PARENTAL CONTROLS & SCHEDULING
            ===================================================================== */}
        <section
          className="prose prose-invert max-w-none space-y-4"
          aria-label="Parental Controls and Scheduling"
        >
          <div className="flex items-center gap-2 text-[var(--brand-400)] font-semibold text-xs uppercase tracking-wider mb-2">
            <Clock size={14} /> Screen Time Management
          </div>
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            Section 7 — Parental Controls: Designing Effective Scheduling &amp; Content Filters
          </h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            Router-based parental controls provide a way to moderate network access without resorting to a hard hardware ban.
            Instead of dropping the wireless link entirely, parental controls intercept traffic at the gateway and enforce
            policies based on time windows, domain categories, or application signatures.
          </p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            Most modern parental control systems (including built-in firmware and third-party solutions like Circle, Disney, or Netgear Smart
            Parental Controls) use a DNS-based redirect. When a client device makes a lookup request for a banned site (e.g., a gaming server
            or social media app), the router's internal DNS resolver redirects the request to a loopback address or a warning screen.
            Advanced systems also perform Deep Packet Inspection (DPI) to monitor and block non-DNS traffic, such as specific mobile application
            protocols that try to bypass standard web filters.
          </p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            When configuring time-based rules, we recommend creating a sleep-time schedule. For instance, you can construct a profile
            for your children's consoles and mobile devices that blocks internet access between 10:00 PM and 7:00 AM on weekdays. This is
            often far more effective than MAC whitelisting because it maintains connectivity during daylight homework hours but enforces
            boundaries at night.
          </p>
          <div className="overflow-x-auto my-4">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-[11px] text-[var(--text-secondary)]">
              <thead>
                <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                  <th className="px-3 py-2 text-left border-b border-[var(--border-subtle)]">
                    Control Type
                  </th>
                  <th className="px-3 py-2 text-left border-b border-[var(--border-subtle)]">
                    Pros
                  </th>
                  <th className="px-3 py-2 text-left border-b border-[var(--border-subtle)]">
                    Cons
                  </th>
                  <th className="px-3 py-2 text-left border-b border-[var(--border-subtle)]">
                    Ideal For
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)]">
                <tr>
                  <td className="px-3 py-2.5 font-bold text-[var(--brand-400)]">
                    Router Parental Controls
                  </td>
                  <td className="px-3 py-2.5">
                    Covers all connected devices (smart TVs, consoles, IoT) at the gateway; cannot be uninstalled from the device.
                  </td>
                  <td className="px-3 py-2.5">
                    Cannot manage cellular data connections; easily bypassed by a VPN tunnel or MAC randomization.
                  </td>
                  <td className="px-3 py-2.5">
                    Whole-home network baseline filters.
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-bold text-[var(--brand-400)]">
                    On-Device Software (Apple Screen Time / Family Link)
                  </td>
                  <td className="px-3 py-2.5">
                    Monitors cellular networks and app-level usage; provides direct device-level lockouts.
                  </td>
                  <td className="px-3 py-2.5">
                    Requires installation on each individual client; does not cover smart TVs or smart home hubs.
                  </td>
                  <td className="px-3 py-2.5">
                    Mobile phones, tablets, and personal computers.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* =====================================================================
            SECTION 8: WHAT TO DO AFTER BLOCKING
            ===================================================================== */}
        <section
          className="prose prose-invert max-w-none space-y-4"
          aria-label="What to Do After Blocking"
        >
          <div className="flex items-center gap-2 text-[var(--brand-400)] font-semibold text-xs uppercase tracking-wider mb-2">
            <Lock size={14} /> Post-Incident Security Checklist
          </div>
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            Section 8 — What to Do After Blocking: Hardening Network Boundaries
          </h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            Successfully blocking a MAC address or creating an ACL rule is only a temporary fix if your overall network
            boundaries remain weak. If a neighbor or unauthorized user was able to join your primary SSID, they already know
            your WiFi password. Once you block their current MAC address, they can easily bypass this by enabling MAC address
            randomization or using a different device.
          </p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            To prevent re-connection, you must immediately change your network security credentials. Check our step-by-step instructions on
            how to{" "}
            <Link
              href="/change-wifi-password"
              className="text-[var(--brand-400)] hover:underline font-semibold"
            >
              Change Your WiFi Password
            </Link>
            . We recommend using a completely new, complex passphrase of at least 12–16 random alphanumeric characters.
            Additionally, if your hardware supports it, update your security settings to use WPA3. WPA3 provides Protected Management
            Frames (PMF) by default, which blocks attackers from sending wireless deauthentication packets to disrupt legitimate users.
          </p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            Finally, set up a dedicated Guest Network to isolate temporary clients. By moving visitors and untrusted IoT devices
            to a guest SSID with local client isolation enabled, you prevent them from accessing your primary local network segment and scanning your local systems. Review our complete guide to{" "}
            <Link
              href="/guest-wifi-setup"
              className="text-[var(--brand-400)] hover:underline font-semibold"
            >
              Guest WiFi Setup
            </Link>{" "}
            to implement these boundaries. Follow this up by auditing your active DHCP leases and connection logs weekly to ensure no new unknown devices have registered on your gateway.
          </p>
        </section>

        {/* =====================================================================
            RELATED GUIDES & NETWORK OPTIMIZATIONS
            ===================================================================== */}
        <div className="mb-10 p-5 glass-card border border-[var(--border-subtle)] rounded-2xl">
          <h2 className="text-base font-bold text-[var(--text-primary)] mb-4 flex items-center gap-1.5">
            <Link2 size={16} className="text-[var(--brand-400)]" /> Related Guides &amp; Network Optimizations
          </h2>
          <div className="flex flex-wrap gap-2.5">
            {[
              { label: "WiFi Security Hub", href: "/wifi-security" },
              { label: "Change WiFi Password", href: "/change-wifi-password" },
              { label: "Router Login Guide", href: "/router-login" },
              { label: "Router Settings Overview", href: "/router-settings" },
              { label: "How to See Who Is on WiFi", href: "/how-to-see-who-is-on-my-wifi" },
              { label: "WPA3 vs WPA2 Protocol", href: "/wpa3-vs-wpa2" },
              { label: "Set Up Guest WiFi", href: "/guest-wifi-setup" },
              { label: "Default Router Passwords", href: "/router-password" },
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
