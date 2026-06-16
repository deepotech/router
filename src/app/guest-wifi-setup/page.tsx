import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import TroubleshootingArticleShell from "@/components/tools/TroubleshootingArticleShell";
import { JsonLd } from "@/lib/seo/schema";
import { APP_URL } from "@/lib/constants";
import Link from "next/link";
import {
  Link2,
  ShieldAlert,
  Wifi,
  Server,
  KeyRound,
  Settings,
  Info,
  HelpCircle,
  Activity,
  LayoutGrid,
  Network,
  Radio,
  Sliders,
  CheckCircle2
} from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "How to Set Up a Guest WiFi Network (Complete Router Guide 2026)",
  description:
    "Learn how to set up a guest WiFi network on ASUS, TP-Link, and Netgear routers. Covers client isolation, VLAN concepts, security benefits, and troubleshooting steps.",
  canonical: "/guest-wifi-setup",
  keywords: [
    "guest wifi setup",
    "guest network router",
    "guest wifi network",
    "how to set up guest wifi",
    "client isolation",
    "guest network security",
    "vlan router",
    "asus guest wifi",
    "tp-link guest network",
    "netgear guest wifi"
  ],
});

const breadcrumbs = [
  { name: "WiFi Security", url: "/wifi-security" },
  { name: "Guest WiFi Setup", url: "/guest-wifi-setup" },
];

const troubleshootingSteps = [
  {
    title: "Verify Guest SSID Broadcast is Enabled",
    description: "Confirm that the guest network radio transmitter is active and the SSID broadcast option is checked to make the SSID visible to client devices.",
    tip: "If you prefer maximum discretion, you can hide the SSID, but visitors must then manually type in the network name and security credentials."
  },
  {
    title: "Check Access Intranet / AP Isolation Toggle",
    description: "Verify that AP isolation is active and intranet access is disabled, ensuring that the network block is actively separating the guest and primary subnets.",
    tip: "Some ASUS routers name this setting 'Access Intranet' which must be toggled to 'Disable'."
  },
  {
    title: "Confirm Subnet Range and IP Allocation",
    description: "Run ipconfig or check the router's DHCP pool settings to ensure that guest clients are receiving IP addresses from a distinct guest subnet.",
    tip: "If guest devices are getting main network IPs, the router firmware might need an update or a reboot."
  },
  {
    title: "Check Client Security Protocol Compatibility",
    description: "If guests cannot connect to WPA3-only networks, check if their devices support the SAE handshake. Toggle to WPA2/WPA3 transition mode to test.",
    tip: "Legacy game consoles and older smart home hardware do not support WPA3-Personal."
  },
  {
    title: "Test and Verify Port Isolation/Firewall Rules",
    description: "Attempt to ping your main desktop's IP address from a guest-connected device. The ping requests should result in packets dropped/timeout.",
    tip: "Use Command Prompt on Windows or Terminal on macOS/Android to execute the ping command."
  },
  {
    title: "Verify Internet Routing and WAN Settings",
    description: "If guest clients are connected but have no internet, verify that the guest network's firewall rules permit WAN traffic and that the router's DNS resolver is forwarding requests.",
    tip: "Set a static public DNS like 1.1.1.1 or 8.8.8.8 on a guest device to rule out router DNS relay issues."
  }
];

const faqs = [
  {
    question: "Does a guest network use the same internet connection?",
    answer: "Yes, a guest network uses the same physical broadband internet connection and WAN port as your main network. However, it separates guest traffic from your private network by using virtual local area network (VLAN) mapping or software firewall configurations. This allows guests to access the internet without having access to local resources."
  },
  {
    question: "Can guests on my guest network see my devices?",
    answer: "No, provided that you have disabled 'Access Intranet' (or enabled 'AP Isolation' / 'Client Isolation') in your router settings. When these security settings are correctly configured, the router's internal firewall and access control lists block all communication between the guest subnet and the main subnet, keeping your private devices invisible."
  },
  {
    question: "Should I use WPA2 or WPA3 on my guest network?",
    answer: "You should ideally configure the guest network to use WPA2/WPA3 Personal (Transition Mode). While WPA3-Personal is much more secure, many visitors may carry older smartphones, tablets, or laptops that only support WPA2. A transition mode ensures backward compatibility while protecting newer devices with WPA3's Simultaneous Authentication of Equals (SAE) protocol."
  },
  {
    question: "Can I set a time limit on guest WiFi access?",
    answer: "Yes, many modern routers and mesh Wi-Fi systems (such as ASUS, TP-Link Deco, and Netgear Orbi) feature scheduling options or access timers. You can configure guest credentials that automatically expire after a set number of hours (e.g., 2, 4, or 8 hours) or disable the guest SSID automatically during specific night hours."
  },
  {
    question: "What is client isolation on a guest network?",
    answer: "Client isolation (also called Access Point or AP Isolation) is a security setting that prevents wireless devices connected to the same SSID from communicating with one another. When active, it blocks Layer 2 traffic between wireless clients, preventing guest devices from scanning each other for open ports, spreading malware, or snooping on unencrypted traffic."
  },
  {
    question: "How many devices can connect to a guest network?",
    answer: "Typically, a consumer router supports between 32 and 64 wireless client devices per radio band (2.4 GHz and 5 GHz). The practical limit is governed by the router's RAM, CPU capacity, and the size of the DHCP pool allocated to the guest subnet. If you expect a large number of guests, ensure the guest DHCP IP pool is sized appropriately."
  },
  {
    question: "Is a guest network slower than the main network?",
    answer: "By default, guest networks run at the same physical speed as the main network. However, because they share the same broadband pipe, we highly recommend setting up bandwidth limiting (rate limiting) for the guest network. Capping guest speeds prevents visitors from saturating your bandwidth and causing latency spikes on your main network."
  },
  {
    question: "Should I hide my guest network SSID?",
    answer: "No. Hiding the guest network SSID adds little to no security because hidden networks can still be discovered by passive packet sniffers. Hiding the SSID also makes it inconvenient for your guests, who must manually enter the exact network name (SSID) and security standard to connect. It is better to broadcast the SSID and secure it with a strong password."
  },
  {
    question: "Can I use a guest network for my smart home IoT devices?",
    answer: "Yes, utilizing a guest network to isolate smart home IoT devices (such as smart plugs, lightbulbs, cameras, and TVs) is an industry-standard security best practice. Because many IoT devices receive infrequent firmware updates and have low security standards, isolating them prevents a compromised smart home device from serving as an entry point to hack your main computers."
  },
  {
    question: "Do guest networks work when the router is in Access Point (AP) mode?",
    answer: "This depends on your hardware and topology. If you place a router into Access Point mode, it disables its internal routing and DHCP services. Some APs will bridge guest traffic directly to the main router without isolation, unless your main router and the AP both support 802.1Q VLAN tagging. Always test isolation when running access points in AP mode."
  },
  {
    question: "How do I configure guest network settings from my smartphone?",
    answer: "You can easily configure guest networks using your router manufacturer's mobile app (such as the TP-Link Tether or Deco app, ASUS Router app, or Netgear Nighthawk app). Alternatively, connect your smartphone to your network, open a mobile browser, enter your router's default gateway IP address, and configure the settings via the web interface."
  },
  {
    question: "Can a VPN be configured specifically for the guest network?",
    answer: "Yes, advanced consumer routers and those running custom open-source firmware (like DD-WRT, Tomato, or Asuswrt-Merlin) support Policy-Based Routing. This allows you to bind the guest network's VLAN interface to a VPN client configuration on the router, forcing all guest traffic to pass through the VPN tunnel while main network traffic routes normally."
  }
];

const commonCauses = [
  {
    title: "AP Isolation Disabled",
    desc: "When Access Point isolation is disabled, client devices on the guest network can scan and interact with each other, exposing them to local security vulnerabilities."
  },
  {
    title: "Shared Subnet Configuration",
    desc: "If the router does not assign guest clients to a separate IP range or VLAN and leaves them on the main subnet, they can access shared network resources like NAS drives."
  },
  {
    title: "No Bandwidth Limit Restraints",
    desc: "Without a QoS rule or speed limit, a guest downloading large files or streaming high-definition video can saturate the network, causing bufferbloat for primary users."
  },
  {
    title: "SSID Broadcast Turned Off",
    desc: "If 'SSID Broadcast' is disabled in the guest wireless settings, the network will not appear in visitors' Wi-Fi lists, requiring manual configuration."
  }
];

const quickFixChecklist = [
  "Enable the Guest SSID broadcast in the wireless settings panel.",
  "Secure the guest network with WPA2/WPA3 Transition Mode and a strong password.",
  "Set 'Access Intranet' to Disable (or enable Client/AP Isolation) to block local access.",
  "Apply bandwidth limits (e.g., 10-15 Mbps) to prevent guest traffic from hogging your internet.",
  "Ensure the guest DHCP pool is configured with a separate subnet (e.g., 192.168.50.x).",
  "Reboot the router after applying major VLAN or guest network isolation modifications."
];

// Custom schema objects
const collectionPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${APP_URL}/guest-wifi-setup#collection`,
  "url": `${APP_URL}/guest-wifi-setup`,
  "name": "How to Set Up a Guest WiFi Network (Complete Router Guide 2026)",
  "description": "Learn how to set up a guest WiFi network on ASUS, TP-Link, and Netgear routers. Covers client isolation, VLAN concepts, security benefits, and troubleshooting steps.",
  "about": [
    { "@type": "Thing", "name": "Guest WiFi Setup" },
    { "@type": "Thing", "name": "Client Isolation" },
    { "@type": "Thing", "name": "VLAN Configurations" }
  ]
};

const howToAsusSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "@id": `${APP_URL}/guest-wifi-setup#how-to-asus`,
  "name": "How to Set Up Guest WiFi on ASUS Routers",
  "description": "A detailed step-by-step guide to configuring an isolated guest Wi-Fi network on an ASUS router using the ASUSWRT admin panel.",
  "totalTime": "PT5M",
  "supply": [
    { "@type": "HowToSupply", "name": "ASUS Router Login IP (192.168.50.1 or 192.168.1.1)" },
    { "@type": "HowToSupply", "name": "Administrator Login Username and Password" }
  ],
  "tool": [
    { "@type": "HowToTool", "name": "Web Browser" },
    { "@type": "HowToTool", "name": "Computer or Mobile Device" }
  ],
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Log In to the ASUSWRT Dashboard",
      "text": "Connect your laptop or device to your ASUS router via Wi-Fi or Ethernet. Open a web browser, enter 192.168.50.1 or router.asus.com in the URL bar, and log in with your administrative credentials.",
      "url": `${APP_URL}/guest-wifi-setup#step-asus-1`
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Navigate to the Guest Network Panel",
      "text": "In the left-hand navigation sidebar under the 'General' subcategory, click on 'Guest Network'.",
      "url": `${APP_URL}/guest-wifi-setup#step-asus-2`
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Select Wireless Band and Enable",
      "text": "Choose either the 2.4 GHz, 5 GHz, or 6 GHz frequency band for the guest network and click the 'Enable' button to open the configuration settings.",
      "url": `${APP_URL}/guest-wifi-setup#step-asus-3`
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Configure SSID, Security Standard, and Password",
      "text": "Enter a distinct Guest SSID (e.g., RouterVia_Guest). Set the Authentication Method to WPA2-Personal, WPA3-Personal, or WPA2/WPA3-Personal. Enter a strong Pre-Shared Key.",
      "url": `${APP_URL}/guest-wifi-setup#step-asus-4`
    },
    {
      "@type": "HowToStep",
      "position": 5,
      "name": "Configure Intranet Access (Client Isolation)",
      "text": "Set the 'Access Intranet' toggle to 'Disable'. This creates a firewall barrier preventing guest devices from communicating with devices on your main home network.",
      "url": `${APP_URL}/guest-wifi-setup#step-asus-5`
    },
    {
      "@type": "HowToStep",
      "position": 6,
      "name": "Set Bandwidth Limits and Save",
      "text": "Optionally configure a bandwidth limit (e.g., 15 Mbps download / 3 Mbps upload) to protect your main network's internet capacity. Click 'Apply' to save the settings and restart the wireless radio.",
      "url": `${APP_URL}/guest-wifi-setup#step-asus-6`
    }
  ]
};

export default function GuestWifiSetupPage() {
  return (
    <TroubleshootingArticleShell
      h1="How to Set Up a Guest WiFi Network on Your Router (2026 Guide)"
      intro="A guest WiFi network creates a completely separate wireless access zone that gives visitors internet access without exposing your primary devices, NAS drives, printers, smart home systems, or local shared files. This guide covers every major router brand, explains client isolation and VLAN principles, and walks you through troubleshooting common guest network issues."
      category="wifi"
      breadcrumbs={breadcrumbs}
      faqs={faqs}
      troubleshootingSteps={troubleshootingSteps}
      warningBanner={{
        title: "Security Warning: No Guest Network = Shared Access",
        text: "Without a guest network, visitors connected to your main WiFi can potentially access shared folders, network printers, NAS storage, and other devices on your local subnet. Always isolate guest traffic using AP (Access Point) Isolation."
      }}
      quickFixChecklist={quickFixChecklist}
      commonCauses={commonCauses}
      severityLevel="medium"
      whenToContactISP="If you are using an ISP-supplied gateway (such as Comcast Xfinity, Spectrum, or AT&T) and the guest network configuration option is grayed out or completely missing from the web interface, the ISP has likely disabled local controls. In these cases, you must log in to the provider's proprietary subscriber cloud application (e.g., Xfinity App, My Spectrum App) to configure your guest WiFi. If the app does not support local client isolation, contact their technical support or consider bridging their gateway to a dedicated retail router."
    >
      {/* Schema Injection */}
      <JsonLd data={collectionPageSchema} />
      <JsonLd data={howToAsusSchema} />

      <div className="space-y-10">
        
        {/* ==========================================
            SECTION 1: WHAT IS A GUEST WIFI NETWORK?
            ========================================== */}
        <section className="prose prose-invert max-w-none space-y-4" aria-label="What Is a Guest WiFi Network">
          <div className="flex items-center gap-2 text-[var(--brand-400)] font-semibold text-xs uppercase tracking-wider mb-2">
            <Radio size={14} /> Local Network Segmentation
          </div>
          <h2 className="text-xl font-bold text-[var(--text-primary)]">Section 1 — What Is a Guest WiFi Network?</h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            A guest Wi-Fi network is a secondary wireless local area network (WLAN) broadcast by your router. Physically, it shares the exact same antennas, radio chips, and internet connection as your main wireless network. However, logically, it operates as a distinct virtual interface. In modern network engineering, this is accomplished through the use of **Virtual Access Points (VAPs)**. A physical Wi-Fi radio (operating on 2.4 GHz, 5 GHz, or 6 GHz) can broadcast multiple Service Set Identifiers (SSIDs), with each SSID bound to a different virtual MAC address (BSSID).
          </p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            When you enable a guest network, the router creates a virtual bridge interface (typically named something like <code>br1</code>, whereas your main network resides on <code>br0</code>). This guest bridge interface is assigned its own DHCP server instance and a completely separate IP subnet pool. For example, if your primary home network devices are assigned IP addresses in the <code>192.168.1.0/24</code> subnet, guest clients might receive addresses in the <code>192.168.100.0/24</code> or <code>10.0.10.0/24</code> range. 
          </p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            The fundamental differentiator between a guest network and your main network lies in the firewall policies (specifically, <code>iptables</code> or <code>nftables</code> rules) running inside the router's firmware. A standard guest configuration allows packets to flow from the guest interface out through the Wide Area Network (WAN) port for internet access. However, it explicitly drops packets attempting to traverse from the guest interface to the main local bridge interface. This creates a secure logical barrier.
          </p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            A standard guest network provides and restricts the following:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-xs text-[var(--text-muted)]">
            <li>
              <strong>Active Outbound Routing:</strong> Permits guest devices to establish connections to public web servers, stream video, check email, and run VPNs.
            </li>
            <li>
              <strong>Isolated Subnet Allocation:</strong> Separates IP addressing so that guest devices cannot broadcast or route directly to local resources.
            </li>
            <li>
              <strong>Blocked Intra-SSID Traffic:</strong> Prevents guests on the guest network from seeing, pinging, or transferring files to other guests on the same SSID.
            </li>
            <li>
              <strong>Restricted Administrative Access:</strong> Blocks guests from accessing the router's administrative configuration portals (e.g., <code>192.168.1.1</code> or <code>192.168.50.1</code>) on standard admin ports (HTTP/HTTPS/SSH).
            </li>
          </ul>
        </section>

        {/* ==========================================
            SECTION 2: FEATURED AI SUMMARY
            ========================================== */}
        <section className="glass-card p-6 border border-emerald-950/30 bg-emerald-950/5 rounded-2xl relative overflow-hidden" aria-label="Quick Answer Summary">
          <div className="absolute top-0 right-0 bg-emerald-500/10 text-emerald-400 text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-bl-lg font-bold">
            AI Overview Summary
          </div>
          <h2 className="text-xs font-bold text-emerald-400 mb-3 uppercase tracking-wide flex items-center gap-1.5">
            <KeyRound size={12} /> Guest WiFi Setup Quick Reference
          </h2>
          <div className="overflow-x-auto mb-4">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-[11px] text-[var(--text-secondary)]">
              <thead>
                <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                  <th className="px-3 py-2 text-left border-b border-[var(--border-subtle)]">Router Brand</th>
                  <th className="px-3 py-2 text-left border-b border-[var(--border-subtle)]">Login Path</th>
                  <th className="px-3 py-2 text-left border-b border-[var(--border-subtle)]">Isolation Terminology</th>
                  <th className="px-3 py-2 text-left border-b border-[var(--border-subtle)]">Required Setting</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)]">
                <tr>
                  <td className="px-3 py-2.5 font-bold text-[var(--text-primary)]">ASUS</td>
                  <td className="px-3 py-2.5 font-mono">192.168.50.1 / router.asus.com</td>
                  <td className="px-3 py-2.5 font-semibold text-emerald-400">Access Intranet</td>
                  <td className="px-3 py-2.5">Set to <strong>Disable</strong></td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-bold text-[var(--text-primary)]">TP-Link</td>
                  <td className="px-3 py-2.5 font-mono">192.168.0.1 / tplinkwifi.net</td>
                  <td className="px-3 py-2.5 font-semibold text-emerald-400">Allow guests to access local network</td>
                  <td className="px-3 py-2.5">Keep <strong>Unchecked</strong></td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-bold text-[var(--text-primary)]">Netgear</td>
                  <td className="px-3 py-2.5 font-mono">192.168.1.1 / routerlogin.net</td>
                  <td className="px-3 py-2.5 font-semibold text-emerald-400">Allow guests to see each other</td>
                  <td className="px-3 py-2.5">Keep <strong>Unchecked</strong></td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
            Note: The isolation setting is the most critical security step. Enabling a guest network without verifying that local access is blocked leaves your primary computers, files, and smart devices exposed to traffic on the guest SSID.
          </p>
        </section>

        {/* ==========================================
            SECTION 2: BENEFITS OF GUEST NETWORKS
            ========================================== */}
        <section className="prose prose-invert max-w-none space-y-4" aria-label="Benefits of Guest Networks">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">Section 2 — Benefits of Guest Networks</h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            Setting up a guest Wi-Fi network is one of the most effective actions you can take to bolster your network security posture. In contemporary cybersecurity, home networks have become attractive targets due to the influx of remote work workstations, financial transactions, and vulnerable IoT hardware. Leaving your network unsegmented exposes you to multiple vulnerabilities. Let's analyze the technical advantages of configuring a guest SSID:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-[var(--text-secondary)]">
            
            <div className="glass-card p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-2">
              <span className="font-bold text-[var(--text-primary)] block flex items-center gap-1.5 text-xs text-[var(--brand-400)]">
                <ShieldAlert size={14} /> Prevents Lateral Movement
              </span>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                If a guest's device is infected with malware, spyware, or ransomware, connecting them to your primary network allows the threat to spread laterally. Using automated scanning tools (such as ARP sweeps or port scanners), malware can locate other active devices on the subnet, brute-force weak credentials, and execute network exploits on your desktop PCs, local servers, and Network Attached Storage (NAS) devices. A segmented guest network blocks this communication entirely.
              </p>
            </div>

            <div className="glass-card p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-2">
              <span className="font-bold text-[var(--text-primary)] block flex items-center gap-1.5 text-xs text-[var(--brand-400)]">
                <LayoutGrid size={14} /> Isolates Vulnerable IoT Hardware
              </span>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                Smart plugs, lightbulbs, vacuum cleaners, and IP cameras often operate on unpatched, low-cost Linux microkernels. These devices represent significant security liabilities because they rarely receive firmware updates and often contain hardcoded credentials or open debug ports. Placing your smart home hardware on an isolated guest Wi-Fi SSID ensures that even if an attacker gains control of a smart bulb, they cannot route packets to your work laptops or personal files.
              </p>
            </div>

            <div className="glass-card p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-2">
              <span className="font-bold text-[var(--text-primary)] block flex items-center gap-1.5 text-xs text-[var(--brand-400)]">
                <Sliders size={14} /> Enables Bandwidth Control (QoS)
              </span>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                Visitors running large software updates, torrenting, or streaming high-definition media can saturate your internet bandwidth, leading to packet loss, high ping, and bufferbloat for primary users. By routing guests through a separate guest SSID, you can apply Quality of Service (QoS) rate limits. This restricts guest downloads to a small portion of your connection (e.g., 10 Mbps) while preserving the bulk of your bandwidth for gaming, working, and streaming.
              </p>
            </div>

            <div className="glass-card p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-2">
              <span className="font-bold text-[var(--text-primary)] block flex items-center gap-1.5 text-xs text-[var(--brand-400)]">
                <KeyRound size={14} /> Simplifies Credential Sharing
              </span>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                Sharing your complex, primary network password with every visitor is bad practice. Once shared, your password may be stored on their device, shared with others, or cached in cloud-sync databases. With a guest network, you can set a simpler, easily shareable password (or print a QR code for their convenience) and change it periodically without having to reconfigure the Wi-Fi credentials on all of your personal computers, smart TVs, and mesh nodes.
              </p>
            </div>

          </div>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            By leveraging these mechanisms, guest networks transform your router from a flat, single-zone network into a multi-tiered security environment. For more information on how to audit who has access to your local resources, refer to our guide on <Link href="/how-to-see-who-is-on-my-wifi" className="text-[var(--brand-400)] hover:underline font-semibold">How to See Who Is on My WiFi</Link>.
          </p>
        </section>

        {/* ==========================================
            SECTION 3: CLIENT ISOLATION EXPLAINED
            ========================================== */}
        <section className="prose prose-invert max-w-none space-y-4" aria-label="Client Isolation Explained">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">Section 3 — Client Isolation (AP Isolation) Explained</h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            In standard network behavior, when wireless devices connect to the same access point, they are bridged together at Layer 2 (Data Link Layer). This means that Client A (e.g., a visitor's smartphone) can send traffic directly to Client B (e.g., your laptop) using their MAC addresses. The access point behaves like a virtual Ethernet switch, copying packets from one wireless station to another.
          </p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            **Access Point (AP) Isolation**, also referred to as client isolation, WLAN isolation, or station isolation, is a feature that fundamentally alters this behavior. When you enable client isolation, the access point's wireless driver is configured to drop any packet that has a destination MAC address matching another wireless station on the same SSID. The wireless radio behaves as a strict point-to-point connection for each client:
          </p>
          <div className="border-l-4 border-[var(--brand-500)] pl-4 py-2 space-y-2 text-xs text-[var(--text-secondary)] bg-[var(--bg-elevated)] rounded-r-xl">
            <span className="font-bold text-[var(--text-primary)] block">How AP Isolation Controls Traffic:</span>
            <p className="text-[11px] text-[var(--text-muted)]">
              When Client A attempts to transmit a packet to Client B on the same SSID, the frame is received by the AP. The AP checks the destination MAC address. If the destination is another local wireless device, the AP drops the frame immediately. The AP will only forward frames if the destination MAC address belongs to the gateway routing interface (the router's local IP address) or the WAN port.
            </p>
          </div>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            This isolation is crucial for protecting users on a public or semi-private guest network. Without AP isolation, a malicious actor sitting in their car outside your house could connect to your guest network and use network tools to sniff unencrypted broadcast traffic, execute ARP poisoning attacks, or run man-in-the-middle exploits against other visitors. AP isolation prevents this threat vector by blocking client-to-client communication.
          </p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            We highly recommend enabling AP isolation on your guest network, but keeping it disabled on your primary home network. On your primary network, you *want* devices to communicate with each other—this is what allows your phone to cast video to a Chromecast, print documents to a wireless printer, or sync files with a local network storage drive. Setting up these configurations correctly is vital. To adjust these administrative features, review our overview of <Link href="/router-settings" className="text-[var(--brand-400)] hover:underline font-semibold">Essential Router Settings</Link>.
          </p>
        </section>

        {/* ==========================================
            SECTION 4: VLAN CONCEPTS FOR HOME USERS
            ========================================== */}
        <section className="prose prose-invert max-w-none space-y-4" aria-label="VLAN Concepts for Home Users">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">Section 4 — VLAN Concepts for Home Users</h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            A **Virtual Local Area Network (VLAN)** is a logical segmentation method defined by the **IEEE 802.1Q** standard. It allows a single physical network switch or router to be partitioned into multiple independent logical networks. In enterprise environments, this allows IT administrators to isolate corporate data from guest access. In residential setups, VLANs perform the same role under the hood.
          </p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            Under the 802.1Q standard, packets are segmented using VLAN tags. Let's look at how tagged and untagged packets function:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-xs text-[var(--text-muted)]">
            <li>
              <strong>Untagged Packets (Access Ports):</strong> Standard network traffic generated by consumer devices (like computers, TVs, and gaming systems) does not contain VLAN headers. When these packets arrive at a switch port, the switch automatically assigns a **Port VLAN ID (PVID)** to define which logical network the packet belongs to.
            </li>
            <li>
              <strong>Tagged Packets (Trunk Ports):</strong> A 4-byte VLAN tag is inserted into the Ethernet frame header (between the Source MAC address and the EtherType fields). This tag contains a 12-bit VLAN Identifier (VID), allowing up to 4,096 unique VLANs to share a single physical connection. When carrying traffic for multiple virtual networks over a single Ethernet cable (e.g., between your router and a managed switch or a wireless access point), the devices use trunking to keep the packets separated.
            </li>
          </ul>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            In a typical consumer router, this VLAN routing occurs automatically. The router's software bridges the main SSID and the physical LAN ports to **VLAN 1** (the default native VLAN). When you enable the guest network, the router creates a new virtual bridge interface bound to an internal VLAN ID (such as **VLAN 50**). The router's internal firewall controls the routing between these VLANs, allowing VLAN 50 (guest) to reach the internet while blocking access to VLAN 1 (main network).
          </p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            For advanced home networks utilizing managed switches and professional access points (like Ubiquiti UniFi or TP-Link Omada), you can extend this VLAN tagging beyond the router. You can configure a trunk port on your managed switch to pass both the main LAN VLAN and the guest VLAN to your ceiling-mounted access points. The access points then assign the guest SSID to the guest VLAN tag and the primary SSID to the main LAN tag, maintaining complete network isolation from the wireless client all the way to the router's firewall. For security tips on configuring these standard encryption standards, read our detailed comparison of <Link href="/wpa3-vs-wpa2" className="text-[var(--brand-400)] hover:underline font-semibold font-bold">WPA3 vs WPA2 Wireless Encryption Standards</Link>.
          </p>
        </section>

        {/* ==========================================
            SECTION 5: HOW TO SET UP GUEST WIFI ON ASUS
            ========================================== */}
        <section className="prose prose-invert max-w-none space-y-4" aria-label="How to Set Up Guest WiFi on ASUS Routers">
          <h2 className="text-xl font-bold text-[var(--text-primary)]" id="asus-setup">Section 5 — How to Set Up Guest WiFi on ASUS Routers</h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            ASUS routers utilize a dashboard firmware interface called **ASUSWRT** (or ROG UI on gaming routers). It offers robust settings for configuring isolated guest access. Follow these step-by-step instructions to configure your guest network:
          </p>
          <div className="border-l-4 border-[var(--brand-500)] pl-4 py-2 space-y-2 text-xs text-[var(--text-secondary)] bg-[var(--bg-elevated)] rounded-r-xl">
            <span className="font-bold text-[var(--text-primary)] block">ASUSWRT Guest WiFi Setup:</span>
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                Connect your computer or phone to your ASUS router via an Ethernet cable or wireless connection. Open a web browser, enter <code>192.168.50.1</code> or <code>192.168.1.1</code> (or navigate to <code>router.asus.com</code>) into the address bar, and log in with your administrative credentials. If you are having trouble with access, consult our guide on <Link href="/router-login" className="text-[var(--brand-400)] hover:underline font-semibold">How to Log In to a Router</Link>.
              </li>
              <li>
                In the left-hand navigation sidebar under the <strong>General</strong> menu, click on <strong>Guest Network</strong>.
              </li>
              <li>
                You will see options for 2.4 GHz, 5 GHz, and 6 GHz bands. Click the <strong>Enable</strong> button under the band you wish to configure.
              </li>
              <li>
                Set the <strong>Network Name (SSID)</strong>. We recommend a distinct name like <code>ASUS_Guest_Secure</code>.
              </li>
              <li>
                Set the <strong>Authentication Method</strong>. We recommend selecting <strong>WPA2-Personal</strong> or <strong>WPA2/WPA3-Personal</strong> to maintain compatibility with legacy visitor devices.
              </li>
              <li>
                Enter a strong security passphrase in the <strong>WPA Pre-Shared Key</strong> field. Avoid using the same password as your main network or your router admin portal.
              </li>
              <li>
                Locate the <strong>Access Intranet</strong> setting. Set this to <strong>Disable</strong>. This is the critical step that tells the router's firewall to block guest clients from accessing devices on your main subnet.
              </li>
              <li>
                Optionally, set the <strong>Bandwidth Limiter</strong> to cap upload and download speeds for guest clients.
              </li>
              <li>
                Click <strong>Apply</strong>. The router will restart its wireless radios and begin broadcasting your new guest SSID.
              </li>
            </ol>
          </div>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            Note: On newer ASUS router models supporting Pro-style firmware or guest network profiles, you may also find these settings under a dedicated **VLAN** or **SDN** tab. The isolation mechanics remain the same: always verify that your intranet access is disabled.
          </p>
        </section>

        {/* ==========================================
            SECTION 6: HOW TO SET UP GUEST WIFI ON TP-LINK
            ========================================== */}
        <section className="prose prose-invert max-w-none space-y-4" aria-label="How to Set Up Guest WiFi on TP-Link Routers">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">Section 6 — How to Set Up Guest WiFi on TP-Link Routers</h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            TP-Link provides two primary methods for managing routers: the traditional web interface (used on Archer and router gateway devices) and the Deco mobile app (used on their whole-home mesh Wi-Fi systems). Follow the appropriate instructions below:
          </p>
          
          <div className="border-l-4 border-emerald-500/80 pl-4 py-2 space-y-2 text-xs text-[var(--text-secondary)] bg-[var(--bg-elevated)] rounded-r-xl">
            <span className="font-bold text-[var(--text-primary)] block">Archer Web Interface:</span>
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                Connect to the TP-Link network, open a web browser, and navigate to <code>192.168.0.1</code> or <code>192.168.1.1</code> (or use <code>tplinkwifi.net</code>). Enter your admin password to log in.
              </li>
              <li>
                Click the <strong>Advanced</strong> tab at the top of the interface, then select <strong>Wireless</strong> &gt; <strong>Guest Network</strong> in the left sidebar.
              </li>
              <li>
                Locate the 2.4 GHz or 5 GHz settings sections. Check the box to <strong>Enable Guest Network</strong>.
              </li>
              <li>
                Enter a Guest SSID (e.g., <code>TPLink_Guest_WiFi</code>) and select a security protocol (e.g., <strong>WPA2-Personal</strong> or <strong>WPA2/WPA3-Personal</strong>). Enter a secure network key.
              </li>
              <li>
                In the configuration options, locate the sharing permissions. Ensure the checkbox for <strong>Allow Guests to See Each Other</strong> is **unchecked**, and ensure the checkbox for <strong>Allow Guests to Access My Local Network</strong> is **unchecked**.
              </li>
              <li>
                Click <strong>Save</strong> at the bottom of the page to apply the changes.
              </li>
            </ol>
          </div>

          <div className="border-l-4 border-cyan-500/80 pl-4 py-2 space-y-2 text-xs text-[var(--text-secondary)] bg-[var(--bg-elevated)] rounded-r-xl">
            <span className="font-bold text-[var(--text-primary)] block">TP-Link Deco Mesh Mobile App:</span>
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                Connect your smartphone to your Deco mesh Wi-Fi network and open the <strong>Deco app</strong>.
              </li>
              <li>
                Tap the <strong>More</strong> menu icon in the bottom right corner of the screen.
              </li>
              <li>
                Tap <strong>Wi-Fi Settings</strong> from the network administration panel.
              </li>
              <li>
                Toggle the switch next to <strong>Guest Network</strong> to enable the SSID.
              </li>
              <li>
                Tap the guest network SSID profile to customize the SSID name and password.
              </li>
              <li>
                Look for the <strong>Isolated</strong> toggle or client access options. Ensure the network status is set to **Isolated** to prevent guest clients from routing traffic to your primary home network.
              </li>
              <li>
                Tap <strong>Save</strong> in the upper right corner to sync these settings across all Deco mesh nodes.
              </li>
            </ol>
          </div>
        </section>

        {/* ==========================================
            SECTION 7: HOW TO SET UP GUEST WIFI ON NETGEAR
            ========================================== */}
        <section className="prose prose-invert max-w-none space-y-4" aria-label="How to Set Up Guest WiFi on Netgear Routers">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">Section 7 — How to Set Up Guest WiFi on Netgear Routers</h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            Netgear routers and Orbi mesh systems use a web administration panel called Netgear Genie, which can be reached via a local IP address or a custom local domain. Follow these steps to configure your guest Wi-Fi network:
          </p>
          <div className="border-l-4 border-[var(--brand-500)] pl-4 py-2 space-y-2 text-xs text-[var(--text-secondary)] bg-[var(--bg-elevated)] rounded-r-xl">
            <span className="font-bold text-[var(--text-primary)] block">Netgear Web Interface Setup:</span>
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                Ensure your device is connected to the Netgear router. Open your web browser and go to <code>192.168.1.1</code> or <code>192.168.0.1</code> (or type <code>routerlogin.net</code> or <code>routerlogin.com</code> into the address bar).
              </li>
              <li>
                Enter your administrative credentials. The default admin username is <code>admin</code>, and the password is the one you created during initial setup.
              </li>
              <li>
                In the left-hand column, click on the <strong>Basic</strong> tab and choose <strong>Guest Network</strong>. (Alternatively, on older models, navigate to the <strong>Advanced</strong> tab &gt; <strong>Setup</strong> &gt; <strong>Guest Network Settings</strong>).
              </li>
              <li>
                Under the wireless band you want to broadcast (2.4 GHz, 5 GHz, or both), check the box to <strong>Enable Guest Network</strong>. Also verify that <strong>Enable SSID Broadcast</strong> is checked.
              </li>
              <li>
                Enter a customized Guest SSID name (e.g., <code>Netgear_Guest_Access</code>) and set the security standard to <strong>WPA2-PSK [AES]</strong> or the modern hybrid option.
              </li>
              <li>
                Enter a strong pre-shared key. 
              </li>
              <li>
                Locate the security checkbox labeled <strong>Allow guests to see each other and access my local network</strong>. Ensure this checkbox remains **unchecked**. Leaving this box unchecked is the step that isolates guest devices from your primary subnet.
              </li>
              <li>
                Click <strong>Apply</strong> at the top of the page. The Netgear gateway will update its configurations and begin broadcasting the guest network.
              </li>
            </ol>
          </div>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            If you need to change your administrative password to prevent guests from attempting admin logins, follow our detailed walkthrough on <Link href="/router-password" className="text-[var(--brand-400)] hover:underline font-semibold">Router Password Recovery &amp; Updates</Link>.
          </p>
        </section>

        {/* ==========================================
            SECTION 8: BANDWIDTH LIMITING
            ========================================== */}
        <section className="prose prose-invert max-w-none space-y-4" aria-label="Bandwidth Limiting for Guest Networks">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">Section 8 — Bandwidth Limiting for Guest Networks</h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            A common issue when sharing your Wi-Fi connection with guests is **bandwidth saturation**. When visitors stream 4K video, download game patches, or upload large photos, they consume substantial chunks of your network's capacity. In technical terms, this causes **bufferbloat**, where your router's packet queue overflows, resulting in high latency, jitter, and dropped packets for everyone on the network.
          </p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            To prevent this, you should configure bandwidth limits (also known as rate limiting or traffic shaping) for your guest SSID. Capping guest speeds protects your main network's internet performance. Most modern routers allow you to configure these limits directly within the guest network setup page or via **Quality of Service (QoS)** rules:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[var(--text-secondary)] mb-4">
            <div className="p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-2">
              <span className="font-bold text-[var(--text-primary)] block">ASUS Bandwidth Limiter</span>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                Inside the Guest Network settings page on ASUSWRT, you can enable the bandwidth limiter and input maximum download and upload speeds (in Mbps) for guest devices. This rate limit is applied per client or across the entire guest SSID. Setting a cap of 15 Mbps download and 3 Mbps upload is usually perfect for guest use.
              </p>
            </div>
            <div className="p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-2">
              <span className="font-bold text-[var(--text-primary)] block">TP-Link QoS Control</span>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                In the TP-Link Advanced dashboard, you can define bandwidth control rules by specifying the IP subnet range allocated to your guest network. You can set minimum and maximum bandwidth ranges for all IP addresses in the guest pool, preventing any single client device from monopolizing the internet connection.
              </p>
            </div>
          </div>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            For home networks with slow internet service (e.g., DSL connections with under 50 Mbps download), setting a strict limit of 5-10 Mbps for guests is highly recommended. This ensures that visitors can check emails and stream music without impacting your Zoom calls, remote work applications, or online gaming sessions.
          </p>
        </section>

        {/* ==========================================
            SECTION 9: TROUBLESHOOTING GUEST NETWORK ISSUES
            ========================================== */}
        <section className="prose prose-invert max-w-none space-y-4" aria-label="Troubleshooting Guest Network Issues">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">Section 9 — Troubleshooting Guest Network Issues</h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            While guest network setups are typically straightforward, issues with device connections, subnet routing, or slow speeds can arise. Review the detailed troubleshooting steps below:
          </p>
          <div className="space-y-4 text-xs text-[var(--text-secondary)]">
            
            <div className="p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-2">
              <span className="font-semibold text-[var(--text-primary)] flex items-center gap-1">
                <HelpCircle size={14} className="text-cyan-400" /> Guests Can't Connect to the Guest SSID
              </span>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                If guests receive connection failure or timeout errors when trying to connect, check the security protocols configured on the guest network. If you set the guest network to a strict **WPA3-only** protocol, older devices (such as older Android phones, legacy laptops, and older smart devices) will fail to connect. Toggle the network security mode to **WPA2/WPA3 Personal (Transition Mode)** to maintain backward compatibility. Also verify that you haven't run out of IP addresses in your guest DHCP pool.
              </p>
            </div>

            <div className="p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-2">
              <span className="font-semibold text-[var(--text-primary)] flex items-center gap-1">
                <HelpCircle size={14} className="text-cyan-400" /> Guest Devices Can See Primary Network Devices
              </span>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                If a guest-connected device can ping your main computers, see network printers, or access local files, your guest isolation features are misconfigured. Double-check that **Access Intranet** is set to **Disable** (on ASUS routers) or that **Allow guests to see each other and access my local network** is **unchecked** (on Netgear and TP-Link). If the router is operating in **Access Point (AP) mode**, verify that guest isolation is supported by the AP hardware, or verify that your VLAN tagging is correctly set up on the upstream router and managed switch.
              </p>
            </div>

            <div className="p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-2">
              <span className="font-semibold text-[var(--text-primary)] flex items-center gap-1">
                <HelpCircle size={14} className="text-cyan-400" /> Guest Network Speed is Extremely Slow
              </span>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                If the guest network's performance is poor, it may be due to restrictive QoS settings or wireless interference. Check if you have configured a bandwidth limiter that is set too low. Also, because guest networks share physical wireless channels with your main network, look for channel congestion using a Wi-Fi analyzer tool. If necessary, switch your router's wireless channels to less congested frequencies or adjust the QoS settings.
              </p>
            </div>

            <div className="p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-2">
              <span className="font-semibold text-[var(--text-primary)] flex items-center gap-1">
                <HelpCircle size={14} className="text-cyan-400" /> Guest SSID Does Not Appear in Wi-Fi Lists
              </span>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                If visitors cannot see the guest SSID in their Wi-Fi connection lists, make sure that **SSID Broadcast** is enabled in the guest settings. If you checked the option to hide the guest network SSID, the router will stop broadcasting the network name, requiring visitors to manually type in the SSID to connect. Also verify that you haven't scheduled the guest Wi-Fi to shut off automatically during certain hours.
              </p>
            </div>

          </div>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            If your router remains unresponsive or if applying guest settings causes configuration corruption, you may need to reset it. Refer to our guide on <Link href="/router-settings" className="text-[var(--brand-400)] hover:underline font-semibold font-bold">Essential Router Settings</Link> or learn how to block specific unauthorized connections at <Link href="/block-device-on-router" className="text-[var(--brand-400)] hover:underline font-semibold font-bold">How to Block Devices on a Router</Link>.
          </p>
        </section>

        {/* ==========================================
            SECTION 10: RELATED GUIDES (INTERNAL LINKING)
            ========================================== */}
        <div className="mb-10 p-5 glass-card border border-[var(--border-subtle)] rounded-2xl">
          <h2 className="text-base font-bold text-[var(--text-primary)] mb-4 flex items-center gap-1.5">
            <Link2 size={16} className="text-[var(--brand-400)]" /> Related Guides &amp; Network Optimizations
          </h2>
          <div className="flex flex-wrap gap-2.5">
            {[
              { label: "WPA3 vs WPA2 Security Protocols", href: "/wpa3-vs-wpa2" },
              { label: "How to Block Devices on a Router", href: "/block-device-on-router" },
              { label: "See Who Is Connected to Your WiFi", href: "/how-to-see-who-is-on-my-wifi" },
              { label: "Change WiFi Password Guide", href: "/change-wifi-password" },
              { label: "Router Login & Setup Portal", href: "/router-login" },
              { label: "Essential Router Settings Configuration", href: "/router-settings" },
              { label: "Router Password Recovery Steps", href: "/router-password" },
              { label: "WiFi Security & Isolation Hub", href: "/wifi-security" }
            ].map((guide, idx) => (
              <Link
                key={idx}
                href={guide.href}
                className="px-3 py-1.5 bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] border border-[var(--border-subtle)] hover:border-[var(--brand-500)] text-xs text-[var(--text-secondary)] hover:text-[var(--brand-400)] rounded-lg transition-all"
              >
                {guide.label}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </TroubleshootingArticleShell>
  );
}
