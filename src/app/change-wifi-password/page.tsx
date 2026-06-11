import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import TroubleshootingArticleShell from "@/components/tools/TroubleshootingArticleShell";
import { JsonLd } from "@/lib/seo/schema";
import { APP_URL } from "@/lib/constants";
import Link from "next/link";
import { ShieldAlert, BookOpen, AlertTriangle, KeyRound, Wifi, Smartphone, HelpCircle, FileText } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "How to Change Your WiFi Password (Complete Router Guide 2026)",
  description:
    "The definitive authority guide to changing your Wi-Fi password across all major router brands (TP-Link, ASUS, NETGEAR, D-Link, Huawei, Xiaomi, Linksys, Tenda). Learn administrative login steps, secure encryption settings, phone setup, and troubleshooting.",
  canonical: "/change-wifi-password",
  keywords: [
    "change wifi password",
    "how to change wifi password",
    "change wireless password",
    "update wifi password",
    "router wifi password change",
    "change router password",
    "wifi password setup",
    "wireless network password",
    "wifi security settings",
    "router settings password",
    "change wifi password on tp-link",
    "change wifi password on asus",
    "change wifi password on netgear"
  ],
});

const breadcrumbs = [
  { name: "Router Guides", url: "/routers" },
  { name: "Change WiFi Password", url: "/change-wifi-password" },
];

const troubleshootingSteps = [
  {
    title: "Identify Your Router's Gateway IP Address",
    description: "Find the local IP address of your router. Common defaults include 192.168.1.1, 192.168.0.1, or 10.0.0.1. You can find this on the router's physical sticker or by running an IP config check on a connected device.",
    tip: "If the sticker is worn, open Command Prompt on Windows and type 'ipconfig' to find the Default Gateway IP."
  },
  {
    title: "Log In to the Router Admin Console",
    description: "Open a web browser, type the router's IP address into the address bar, and press Enter. input your admin credentials. If unknown, check the default admin login details on your router sticker.",
    tip: "Do not confuse the router admin password with your Wi-Fi password; they are entirely separate."
  },
  {
    title: "Locate the Wireless Settings Menu",
    description: "Navigate through the admin interface to find sections labeled 'Wireless', 'Wireless Settings', 'WLAN', 'WiFi Settings', or 'Basic/Advanced Wireless'.",
    tip: "In modern dual-band routers, you may need to update credentials for both the 2.4 GHz and 5 GHz bands separately."
  },
  {
    title: "Configure the Security Protocol and Password",
    description: "Ensure the security mode is set to a secure protocol like WPA2-Personal, WPA3-Personal, or a hybrid mode. Delete the old password in the Security Key field and enter your new secure password.",
    tip: "We recommend using a passphrase containing at least 12 to 16 characters mixed with numbers and special symbols."
  },
  {
    title: "Save and Apply the Changes",
    description: "Click 'Save', 'Apply', or 'Submit'. The router will process the changes and restart the wireless radio transmitters, applying the new configuration parameters.",
    tip: "The radio restart will immediately disconnect all active Wi-Fi clients. Be prepared to reconnect them."
  },
  {
    title: "Update WiFi Profiles on All Client Devices",
    description: "On each client device, navigate to Wi-Fi settings, select the network name (SSID), choose 'Forget Network', and then reconnect by inputting the newly configured security password.",
    tip: "Smart home IoT sensors, wireless printers, and mesh nodes may require manual reconfiguration or WPS pairing."
  }
];

const faqs = [
  {
    question: "How do I change my WiFi password?",
    answer: "To change your Wi-Fi password, connect a computer or phone to your router's network, open a web browser, and navigate to your router's gateway IP address (typically 192.168.1.1 or 192.168.0.1). Log in using the admin credentials, find the 'Wireless Settings' or 'WiFi Setup' section, enter a new password in the Security Key/Passphrase field, and click 'Save' or 'Apply'. Reconnect your devices using the new password."
  },
  {
    question: "Will changing my WiFi password disconnect all my devices?",
    answer: "Yes, changing the Wi-Fi password will immediately terminate all active wireless connections on your network. Laptops, smartphones, smart TVs, cameras, printers, and mesh satellites will lose access. You must manually update the password on each device to re-establish connection. Wired Ethernet connections to the router will remain unaffected."
  },
  {
    question: "How often should I change my WiFi password?",
    answer: "Security experts recommend changing your Wi-Fi password every 3 to 6 months to minimize security risks. Additionally, you should change it immediately if you suspect an unauthorized user has joined your network, after having guests utilize your main network (rather than a guest network), or after discovering malware infections on local devices."
  },
  {
    question: "Can I change my WiFi password from my smartphone?",
    answer: "Yes. You can change your Wi-Fi password from a phone by connecting to the current network, opening a mobile browser, and typing the router's IP address. Alternatively, you can use official manufacturer apps (such as TP-Link Tether, ASUS Router, or Netgear Nighthawk) on your iOS or Android device to access wireless settings directly."
  },
  {
    question: "What is the difference between my WiFi password and my router admin password?",
    answer: "The Wi-Fi password (security key/WPA passphrase) is used by client devices to connect to your wireless network for internet access. The router admin password is the administrative credential used to log in to the router's configuration settings panel via a browser. For optimal security, these two passwords must be different."
  },
  {
    question: "What is the safest WiFi password standard?",
    answer: "The safest Wi-Fi password is a long passphrase of 12 to 20 characters combining random words, uppercase and lowercase letters, numbers, and special characters, coupled with WPA3 (Simultaneous Authentication of Equals) encryption. Avoid dictionary words, birthdates, names, or repetitive characters."
  },
  {
    question: "Does changing my WiFi password improve network performance and security?",
    answer: "Yes, changing your password prevents unauthorized devices from leaching your bandwidth, which improves overall network speed and latency. From a security standpoint, it prevents network sniffing, man-in-the-middle attacks, and access to shared local files by unauthorized users."
  },
  {
    question: "Why can't I log into my router's administrative page?",
    answer: "This usually occurs due to typing the wrong gateway IP address, using an unaligned connection (such as trying to connect via WAN instead of LAN), browser caching errors, or using incorrect administrative credentials. Ensure you are connected to the router via Wi-Fi or Ethernet, verify the gateway IP, clear browser cache, or try another browser. If you forgot the admin password, a physical factory reset is required."
  },
  {
    question: "What happens if I forget my new WiFi password?",
    answer: "If you forget your new Wi-Fi password, you can view it by logging into the router admin page via a device connected via a wired Ethernet cable. If you cannot log in or do not have an Ethernet connection, you must perform a hard factory reset by holding the physical reset button for 10-15 seconds. This resets all settings, including the Wi-Fi password, back to factory defaults."
  },
  {
    question: "Should I configure my router to use WPA2 or WPA3 security?",
    answer: "You should use WPA3 if your router and client devices support it, as it offers modern cryptographic features (SAE) that resist offline brute-force attacks. If you have older legacy devices that do not support WPA3, choose the hybrid WPA2/WPA3 Personal (Transition Mode) to maintain backward compatibility."
  }
];

const commonCauses = [
  {
    title: "Unauthorized Piggybacking",
    desc: "Unsecured networks or compromised passwords allow neighbors or nearby users to connect, causing bandwidth congestion and slowing down speeds."
  },
  {
    title: "Outdated Security Protocol",
    desc: "Running outdated WPA or WEP protocols exposes the wireless packets to easy decryption, allowing malicious actors to intercept data."
  },
  {
    title: "Leaked Wi-Fi Credentials",
    desc: "Sharing passwords with guests or visitors often leads to the credentials spreading, resulting in an unmanageable list of connected devices."
  },
  {
    title: "Default Login Exposure",
    desc: "Keeping default factory security settings makes the network an easy target for automated dictionary attacks and wardriving tools."
  }
];

const quickFixChecklist = [
  "Verify your router gateway IP before initiating the login process.",
  "Connect via a wired Ethernet connection when modifying wireless configuration settings.",
  "Write down or save your new Wi-Fi credentials in a secure password manager.",
  "Select WPA3-Personal or WPA2/WPA3 Transition Mode for the security standard.",
  "Perform a 'Forget Network' action on all devices before reconnecting with the new password."
];

// Custom schema objects
const collectionPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${APP_URL}/change-wifi-password#collection`,
  "url": `${APP_URL}/change-wifi-password`,
  "name": "How to Change Your WiFi Password (Complete Router Guide 2026)",
  "description": "The definitive authority guide for changing Wi-Fi passwords across all major router brands, including TP-Link, ASUS, Netgear, D-Link, Huawei, Xiaomi, Linksys, and Tenda. Learn how to access administrative portals, generate secure WPA3 network keys, and reconnect devices safely.",
  "about": [
    { "@type": "Thing", "name": "WiFi Password" },
    { "@type": "Thing", "name": "Wireless Security" },
    { "@type": "Thing", "name": "Router Configurations" }
  ]
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${APP_URL}/change-wifi-password#brands-list`,
  "name": "Supported Router Brands for WiFi Password Change",
  "description": "Step-by-step Wi-Fi password change guides for leading networking hardware manufacturers.",
  "numberOfItems": 8,
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "TP-Link", "url": `${APP_URL}/routers/tp-link` },
    { "@type": "ListItem", "position": 2, "name": "ASUS", "url": `${APP_URL}/routers/asus` },
    { "@type": "ListItem", "position": 3, "name": "NETGEAR", "url": `${APP_URL}/routers/netgear` },
    { "@type": "ListItem", "position": 4, "name": "D-Link", "url": `${APP_URL}/routers/d-link` },
    { "@type": "ListItem", "position": 5, "name": "Huawei", "url": `${APP_URL}/routers/huawei` },
    { "@type": "ListItem", "position": 6, "name": "Xiaomi", "url": `${APP_URL}/routers/xiaomi` },
    { "@type": "ListItem", "position": 7, "name": "Linksys", "url": `${APP_URL}/routers/linksys` },
    { "@type": "ListItem", "position": 8, "name": "Tenda", "url": `${APP_URL}/routers/tenda` }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "@id": `${APP_URL}/change-wifi-password#how-to-change`,
  "name": "How to Change Your WiFi Password",
  "description": "A step-by-step guide to log into your router and change your wireless network password.",
  "totalTime": "PT5M",
  "supply": [
    { "@type": "HowToSupply", "name": "Router IP Address" },
    { "@type": "HowToSupply", "name": "Admin Username and Password" }
  ],
  "tool": [
    { "@type": "HowToTool", "name": "Web Browser" },
    { "@type": "HowToTool", "name": "Computer or Smartphone" }
  ],
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Open Router Login Page",
      "text": "Connect your device to the router (via Wi-Fi or Ethernet cable), open any web browser, and type your router's default gateway IP address (typically 192.168.1.1 or 192.168.0.1) in the URL address bar.",
      "url": `${APP_URL}/change-wifi-password#step-1`
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Sign In to Admin Panel",
      "text": "Enter your administrative credentials (username and password). If you haven't changed these, check the label on the bottom of the physical router for the default credentials.",
      "url": `${APP_URL}/change-wifi-password#step-2`
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Navigate to Wireless Settings",
      "text": "Locate the 'Wireless', 'Wireless Settings', 'WiFi Settings', or 'WLAN' tab in the router administration menu.",
      "url": `${APP_URL}/change-wifi-password#step-3`
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Enter New WiFi Password",
      "text": "Find the field labeled 'WiFi Password', 'Security Key', 'Passphrase', or 'Pre-Shared Key (PSK)'. Delete the existing password and enter a new, secure, unique password (WPA2/WPA3 recommended).",
      "url": `${APP_URL}/change-wifi-password#step-4`
    },
    {
      "@type": "HowToStep",
      "position": 5,
      "name": "Save Changes",
      "text": "Click 'Save', 'Apply', or 'Submit'. The wireless radio will restart, applying the new credentials. This will disconnect all currently connected wireless clients.",
      "url": `${APP_URL}/change-wifi-password#step-5`
    },
    {
      "@type": "HowToStep",
      "position": 6,
      "name": "Reconnect Your Devices",
      "text": "Go to the Wi-Fi settings on your smart devices, click on your network name (SSID), select 'Forget Network', then reselect the network and enter the new Wi-Fi password.",
      "url": `${APP_URL}/change-wifi-password#step-6`
    }
  ]
};

export default function ChangeWifiPasswordPage() {
  return (
    <TroubleshootingArticleShell
      h1="How to Change Your WiFi Password (Complete Router Guide 2026)"
      intro="Your Wi-Fi password is the primary defense line securing your home network against unauthorized intrusion, data interception, and bandwidth theft. In this definitive guide, learn step-by-step pathways to change wireless network keys across all major router manufacturers, configure modern WPA3 protocols, execute mobile changes, and troubleshoot common post-update issues."
      category="wifi"
      breadcrumbs={breadcrumbs}
      faqs={faqs}
      troubleshootingSteps={troubleshootingSteps}
      warningBanner={{
        title: "Security Advisory: Default Credentials Risk",
        text: "Always modify the router administrative password when updating your Wi-Fi password. Default admin logins (like 'admin' / 'admin') are publicly cataloged online, allowing anyone on your local network to hijack configurations, redirect DNS lookups, or completely lock you out of your device."
      }}
      quickFixChecklist={quickFixChecklist}
      commonCauses={commonCauses}
      whenToContactISP="If you are using a gateway device supplied directly by your ISP (e.g., Comcast, Spectrum, AT&T) and you cannot access the gateway panel using standard default IPs or domain portals, the ISP may have locked local admin configuration. In these situations, contact your ISP's customer support line or log in to their proprietary subscriber cloud portal (such as the My Xfinity or Spectrum app) to adjust your network settings."
      severityLevel="medium"
    >
      {/* Schema Injection */}
      <JsonLd data={collectionPageSchema} />
      <JsonLd data={itemListSchema} />
      <JsonLd data={howToSchema} />

      <div className="space-y-10">
        
        {/* ==========================================
            SECTION 1: HERO & CORE SECURITY CONTEXT
            ========================================== */}
        <section className="prose prose-invert max-w-none space-y-4" aria-label="Introduction">
          <div className="flex items-center gap-2 text-[var(--brand-400)] font-semibold text-xs uppercase tracking-wider mb-2">
            <ShieldAlert size={14} /> Global Wireless Security Authority
          </div>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            Securing your local area network (LAN) is a critical requirement in modern digital environments. Your wireless router represents the entry gateway to your entire household's computing infrastructure, connecting laptops, personal smartphones, enterprise work stations, smart home devices, and local storage servers. When you leave your Wi-Fi password unchanged for years, or continue to utilize the factory-default pre-shared key (PSK) printed on the router sticker, you expose your home to various serious threats.
          </p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            Unauthorized users leaching your bandwidth is the most common consequence of poor Wi-Fi hygiene. This piggybacking leads to noticeable bandwidth throttling, high gaming latency, and buffering during high-definition streaming. In worse scenarios, unsecured networks allow malicious actors to perform packet sniffing, initiate local network exploits, launch man-in-the-middle (MITM) attacks, or capture unencrypted traffic. Under extreme conditions, bad actors can utilize your network endpoint to perform illegal operations, exposing the primary subscriber to legal liabilities.
          </p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            To prevent these security gaps, network security frameworks recommend executing a Wi-Fi password change every three to six months. Regularly updating credentials flushes out dormant background connections, stops neighbor piggybacking, and renders obsolete any cached security keys stored on guest devices. This systematic approach ensures your network security standard remains optimized against modern brute-force dictionary attacks.
          </p>
        </section>

        {/* ==========================================
            SECTION 2: QUICK AI ANSWER (FEATURED SNIPPET)
            ========================================== */}
        <section className="glass-card p-6 border border-emerald-950/30 bg-emerald-950/5 rounded-2xl relative overflow-hidden" aria-label="Quick Answer Summary">
          <div className="absolute top-0 right-0 bg-emerald-500/10 text-emerald-400 text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-bl-lg font-bold">
            AI Overview Summary
          </div>
          <h2 className="text-xs font-bold text-emerald-400 mb-3 uppercase tracking-wide flex items-center gap-1.5">
            <KeyRound size={12} /> How to Change WiFi Password Quick Steps
          </h2>
          <div className="overflow-x-auto mb-4">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-[11px] text-[var(--text-secondary)]">
              <thead>
                <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                  <th className="px-3 py-2 text-left border-b border-[var(--border-subtle)]">Step</th>
                  <th className="px-3 py-2 text-left border-b border-[var(--border-subtle)]">Action Required</th>
                  <th className="px-3 py-2 text-left border-b border-[var(--border-subtle)]">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)]">
                <tr>
                  <td className="px-3 py-2.5 font-bold text-emerald-400">1</td>
                  <td className="px-3 py-2.5 font-semibold text-[var(--text-primary)]">Identify Gateway IP</td>
                  <td className="px-3 py-2.5">Find router address (typically <code>192.168.1.1</code> or <code>192.168.0.1</code>).</td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-bold text-emerald-400">2</td>
                  <td className="px-3 py-2.5 font-semibold text-[var(--text-primary)]">Access Admin Page</td>
                  <td className="px-3 py-2.5">Type IP into a web browser address bar and log in with admin credentials.</td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-bold text-emerald-400">3</td>
                  <td className="px-3 py-2.5 font-semibold text-[var(--text-primary)]">Navigate to Settings</td>
                  <td className="px-3 py-2.5">Go to the Wireless Setup, WLAN, or WiFi Settings tab in the router menu.</td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-bold text-emerald-400">4</td>
                  <td className="px-3 py-2.5 font-semibold text-[var(--text-primary)]">Update Password</td>
                  <td className="px-3 py-2.5">Type your new passphrase in the Security Key field. Select WPA3 or WPA2.</td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-bold text-emerald-400">5</td>
                  <td className="px-3 py-2.5 font-semibold text-[var(--text-primary)]">Save & Restart</td>
                  <td className="px-3 py-2.5">Click Save or Apply. The router will restart its wireless radios.</td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-bold text-emerald-400">6</td>
                  <td className="px-3 py-2.5 font-semibold text-[var(--text-primary)]">Reconnect Clients</td>
                  <td className="px-3 py-2.5">Forget old Wi-Fi profiles on your devices and log in using the new password.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
            Note: Performing these steps requires a device connected directly to the router's local network. Changing security keys does not delete your router's administrative configurations or reset your custom connection configurations.
          </p>
        </section>

        {/* ==========================================
            USER FEEDBACK 1: ROUTER LOGIN ADDRESS BY BRAND TABLE
            ========================================== */}
        <section className="prose prose-invert max-w-none space-y-4">
          <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-1.5">
            <BookOpen size={16} className="text-[var(--brand-400)]" />
            Router Default Login Portals by Manufacturer
          </h2>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            To make the connection process straightforward, manufacturers assign deterministic default local IP addresses or human-readable domain-style hostnames to their gateway interfaces. The table below represents the definitive catalog of administrator addresses for the market-dominant router brands:
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-[11px] text-[var(--text-secondary)]">
              <thead>
                <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                  <th className="px-3 py-2 text-left">Manufacturer</th>
                  <th className="px-3 py-2 text-left">Default IP Address</th>
                  <th className="px-3 py-2 text-left">Default Hostname Portal</th>
                  <th className="px-3 py-2 text-left">Internal Guides</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)]">
                <tr>
                  <td className="px-3 py-2.5 font-semibold text-[var(--text-primary)]">TP-Link</td>
                  <td className="px-3 py-2.5 font-mono">192.168.0.1 / 192.168.1.1</td>
                  <td className="px-3 py-2.5 font-mono">tplinkwifi.net</td>
                  <td className="px-3 py-2.5">
                    <Link href="/routers/tp-link" className="text-[var(--brand-400)] hover:underline">TP-Link Hub</Link>
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-semibold text-[var(--text-primary)]">ASUS</td>
                  <td className="px-3 py-2.5 font-mono">192.168.1.1 / 192.168.50.1</td>
                  <td className="px-3 py-2.5 font-mono">router.asus.com</td>
                  <td className="px-3 py-2.5">
                    <Link href="/routers/asus" className="text-[var(--brand-400)] hover:underline">ASUS Hub</Link>
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-semibold text-[var(--text-primary)]">NETGEAR</td>
                  <td className="px-3 py-2.5 font-mono">192.168.1.1 / 192.168.0.1</td>
                  <td className="px-3 py-2.5 font-mono">routerlogin.net / routerlogin.com</td>
                  <td className="px-3 py-2.5">
                    <Link href="/routers/netgear" className="text-[var(--brand-400)] hover:underline">NETGEAR Hub</Link>
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-semibold text-[var(--text-primary)]">D-Link</td>
                  <td className="px-3 py-2.5 font-mono">192.168.0.1 / 192.168.1.1</td>
                  <td className="px-3 py-2.5 font-mono">dlinkrouter.local</td>
                  <td className="px-3 py-2.5">
                    <Link href="/routers/d-link" className="text-[var(--brand-400)] hover:underline">D-Link Hub</Link>
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-semibold text-[var(--text-primary)]">Huawei</td>
                  <td className="px-3 py-2.5 font-mono">192.168.8.1 / 192.168.3.1</td>
                  <td className="px-3 py-2.5 font-mono">None (Direct IP access)</td>
                  <td className="px-3 py-2.5">
                    <Link href="/routers/huawei" className="text-[var(--brand-400)] hover:underline">Huawei Hub</Link>
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-semibold text-[var(--text-primary)]">Xiaomi</td>
                  <td className="px-3 py-2.5 font-mono">192.168.31.1</td>
                  <td className="px-3 py-2.5 font-mono">miwifi.com</td>
                  <td className="px-3 py-2.5">
                    <Link href="/routers/xiaomi" className="text-[var(--brand-400)] hover:underline">Xiaomi Hub</Link>
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-semibold text-[var(--text-primary)]">Linksys</td>
                  <td className="px-3 py-2.5 font-mono">192.168.1.1 / 192.168.15.1</td>
                  <td className="px-3 py-2.5 font-mono">myrouterlocal.net</td>
                  <td className="px-3 py-2.5">
                    <Link href="/routers/linksys" className="text-[var(--brand-400)] hover:underline">Linksys Hub</Link>
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-semibold text-[var(--text-primary)]">Tenda</td>
                  <td className="px-3 py-2.5 font-mono">192.168.0.1 / 192.168.1.1</td>
                  <td className="px-3 py-2.5 font-mono">tendawifi.com</td>
                  <td className="px-3 py-2.5">
                    <Link href="/routers/tenda" className="text-[var(--brand-400)] hover:underline">Tenda Hub</Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            If you change the gateway IP manually inside your router's LAN configuration, the domain names listed above will dynamically resolve to your new custom IP address, provided that the device you are querying from is configured to use the router's DNS resolver. To learn more about standard IP gateways, check out our guide on <Link href="/ips" className="text-[var(--brand-400)] hover:underline">Router Default IPs</Link> or view targeted IP walkthroughs like <Link href="/ips/192-168-1-1" className="text-[var(--brand-400)] hover:underline">192.168.1.1 Setup</Link> and <Link href="/ips/192-168-0-1" className="text-[var(--brand-400)] hover:underline">192.168.0.1 Setup</Link>.
          </p>
        </section>

        {/* ==========================================
            SECTION 3: WHAT IS A WIFI PASSWORD?
            ========================================== */}
        <section className="prose prose-invert max-w-none space-y-4">
          <h2 className="text-base font-bold text-[var(--text-primary)]">What is a Wi-Fi Password? (Understanding WLAN Security Keys)</h2>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            To fully secure your local network, you need to understand what happens when a device joins your wireless local area network (WLAN). A Wi-Fi password (commonly referred to as a security key, passphrase, or Pre-Shared Key) is a cryptographic string used to initialize authentication and encrypt data packets sent between clients (like your phone or computer) and your wireless router.
          </p>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Without this security key, anyone within radio range of your home could intercept your packets. Modern routers utilize advanced encryption protocols to secure this data transmission:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-xs text-[var(--text-muted)]">
            <li>
              <strong>WPA2-PSK (AES):</strong> Wi-Fi Protected Access 2 combined with the Advanced Encryption Standard (AES) has been the industry benchmark for over a decade. It protects your network from simple decryption attempts but is vulnerable to offline dictionary attacks if the key is weak. This vulnerability exists because WPA2's authentication handshake can be intercepted by sniffing software and decrypted offline.
            </li>
            <li>
              <strong>WPA3-SAE:</strong> Introduced in 2018, WPA3 represents the newest security protocol. It replaces WPA2's vulnerability-prone 4-way handshake with a protocol called <strong>Simultaneous Authentication of Equals (SAE)</strong>. This standard prevents brute-force dictionary attacks even if your password is simple, while also introducing forward secrecy to protect past data if the password is ever compromised.
            </li>
          </ul>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            A common point of confusion is the difference between the <strong>Wi-Fi Password</strong> and the <strong>Router Admin Password</strong>. The Wi-Fi Password secures the wireless data transmission channel, allowing devices to join the network. The Router Admin Password controls administrative access to the configuration console itself. If someone gains your Wi-Fi password, they can access the web, but if they gain your router admin password, they can modify all settings, lock you out of the network, or inject malware. You must keep these two passwords separate and secure.
          </p>
        </section>

        {/* ==========================================
            SECTION 4: BEFORE CHANGING YOUR PASSWORD
            ========================================== */}
        <section className="prose prose-invert max-w-none space-y-4">
          <h2 className="text-base font-bold text-[var(--text-primary)]">Pre-Configuration Checklist: Before You Begin</h2>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Before changing your Wi-Fi credentials, take a few minutes to prepare. This prevents accidental lockouts and ensures you can restore your network configurations quickly if something goes wrong.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-[var(--text-secondary)]">
            <div className="glass-card p-4 border border-[var(--border-subtle)] rounded-xl space-y-2">
              <span className="font-bold text-[var(--text-primary)] block">1. Verify Login Credentials</span>
              <p className="text-[11px] text-[var(--text-muted)]">
                Locate your administrator username and password. This is usually printed on the physical sticker at the bottom of the router. If you changed this admin password in the past and forgot it, you must perform a factory reset.
              </p>
            </div>
            <div className="glass-card p-4 border border-[var(--border-subtle)] rounded-xl space-y-2">
              <span className="font-bold text-[var(--text-primary)] block">2. Backup Router Settings</span>
              <p className="text-[11px] text-[var(--text-muted)]">
                Log into your router admin panel and export a backup of the current configuration settings (.bin or .conf file). This allows you to restore your configurations in a single click if errors occur.
              </p>
            </div>
            <div className="glass-card p-4 border border-[var(--border-subtle)] rounded-xl space-y-2">
              <span className="font-bold text-[var(--text-primary)] block">3. Use a Wired Connection</span>
              <p className="text-[11px] text-[var(--text-muted)]">
                When editing wireless configurations, it's best to connect to the router via a wired Ethernet cable. If you change the Wi-Fi password over a wireless connection, your device will be disconnected instantly, occasionally preventing you from confirming the changes.
              </p>
            </div>
            <div className="glass-card p-4 border border-[var(--border-subtle)] rounded-xl space-y-2">
              <span className="font-bold text-[var(--text-primary)] block">4. Document Current SSIDs</span>
              <p className="text-[11px] text-[var(--text-muted)]">
                Note the current wireless network names (SSID) for both the 2.4 GHz and 5 GHz frequency bands. Keeping the same SSIDs while changing only the password makes it easier for devices to reconnect automatically.
              </p>
            </div>
          </div>
        </section>

        {/* ==========================================
            SECTION 5: HOW TO FIND YOUR ROUTER LOGIN ADDRESS
            ========================================== */}
        <section className="prose prose-invert max-w-none space-y-4">
          <h2 className="text-base font-bold text-[var(--text-primary)]">How to Locate Your Router's Administrative IP Address</h2>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            To access your router's administration panel, you must first determine its local IP address, which acts as the default gateway on your local network. While standard default IPs are common, they can vary. Follow the steps below to find the IP address on your device:
          </p>
          <div className="space-y-4 text-xs text-[var(--text-secondary)]">
            <div className="border border-[var(--border-subtle)] rounded-xl p-4 bg-[var(--bg-elevated)]">
              <h3 className="font-bold text-[var(--text-primary)] mb-2">On Windows OS (Command Prompt):</h3>
              <ol className="list-decimal pl-5 space-y-1">
                <li>Press the <code>Windows Key + R</code>, type <code>cmd</code>, and press Enter.</li>
                <li>In the command prompt window, type <code>ipconfig</code> and press Enter.</li>
                <li>Look for the network adapter that is currently active (usually Ethernet or Wi-Fi).</li>
                <li>Find the line labeled <strong>Default Gateway</strong>. The IP address shown there (e.g., <code>192.168.1.1</code>) is your router's IP address.</li>
              </ol>
            </div>
            <div className="border border-[var(--border-subtle)] rounded-xl p-4 bg-[var(--bg-elevated)]">
              <h3 className="font-bold text-[var(--text-primary)] mb-2">On macOS (Terminal / System Settings):</h3>
              <ol className="list-decimal pl-5 space-y-1">
                <li>Open the Terminal app (press Command + Space, search for <code>Terminal</code>).</li>
                <li>Type <code>netstat -nr | grep default</code> or <code>route -n get default</code> and press Enter.</li>
                <li>The output will list the gateway IP address.</li>
                <li>Alternatively, open System Settings, navigate to <strong>Network</strong>, click on your active connection (Wi-Fi or Ethernet), click <strong>Details</strong>, and select the <strong>TCP/IP</strong> tab. The IP will be shown next to <strong>Router</strong>.</li>
              </ol>
            </div>
            <div className="border border-[var(--border-subtle)] rounded-xl p-4 bg-[var(--bg-elevated)]">
              <h3 className="font-bold text-[var(--text-primary)] mb-2">On iOS Devices (iPhone / iPad):</h3>
              <ol className="list-decimal pl-5 space-y-1">
                <li>Open the <strong>Settings</strong> app and select <strong>Wi-Fi</strong>.</li>
                <li>Locate the Wi-Fi network you are connected to and tap the blue info icon (<strong>i</strong>) next to it.</li>
                <li>Scroll down to the <strong>IPV4 Address</strong> section.</li>
                <li>The IP address shown next to <strong>Router</strong> is the gateway address.</li>
              </ol>
            </div>
          </div>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Once you have located this address, enter it into the URL bar of your browser to open the login portal. If you run into issues, read our detailed troubleshooting guide on <Link href="/router-login-not-working" className="text-[var(--brand-400)] hover:underline">Router Login Not Working</Link> or read about basic administration setups on <Link href="/router-admin" className="text-[var(--brand-400)] hover:underline">Router Admin Setup</Link>.
          </p>
        </section>

        {/* ==========================================
            SECTION 6: CHANGE WIFI PASSWORD ON TP-LINK
            ========================================== */}
        <section className="prose prose-invert max-w-none space-y-4">
          <h2 className="text-base font-bold text-[var(--text-primary)]" id="tp-link">Change WiFi Password on TP-Link Routers</h2>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            TP-Link is one of the world's most widely used router brands, utilizing a few distinct user interfaces depending on the model (e.g., standard green/blue firmware dashboards, the newer grey/blue dashboard, or Whole Home Deco Mesh app). Learn how to change your Wi-Fi password on these interfaces below:
          </p>
          <div className="border-l-4 border-[var(--brand-500)] pl-4 py-2 space-y-2 text-xs text-[var(--text-secondary)] bg-[var(--bg-elevated)] rounded-r-xl">
            <span className="font-bold text-[var(--text-primary)] block">Archer Web Interface Steps:</span>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Connect your device to the TP-Link network and open a browser.</li>
              <li>Go to <Link href="/ips/192-168-0-1" className="text-[var(--brand-400)] hover:underline">192.168.0.1</Link> or type <code>tplinkwifi.net</code> in the address bar.</li>
              <li>Enter your administrator login credentials. The default username and password for older models is <code>admin</code>. Newer models require a password set during initial setup.</li>
              <li>For newer models, go to the <strong>Advanced</strong> tab at the top. For older models, look at the sidebar menu.</li>
              <li>Select <strong>Wireless</strong>, then click on <strong>Wireless Settings</strong>.</li>
              <li>In the password field (labeled <strong>Password</strong>, <strong>Wireless Password</strong>, or <strong>Pre-Shared Key</strong>), delete the old password and enter your new passphrase.</li>
              <li>Click <strong>Save</strong> at the bottom of the page. The system will apply the settings, and your wireless network will restart.</li>
            </ol>
          </div>
          <div className="border-l-4 border-emerald-500/80 pl-4 py-2 space-y-2 text-xs text-[var(--text-secondary)] bg-[var(--bg-elevated)] rounded-r-xl">
            <span className="font-bold text-[var(--text-primary)] block">Deco Mesh Mobile App Steps:</span>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Connect your phone to your Deco Wi-Fi network and open the <strong>Deco app</strong>.</li>
              <li>On the home screen, tap the <strong>More</strong> icon in the bottom right corner.</li>
              <li>Select <strong>Wi-Fi Settings</strong> from the tools menu.</li>
              <li>Tap the network profile you wish to edit (Main Network or Guest Network).</li>
              <li>Tap the <strong>Password</strong> field, clear the old password, and enter a new one.</li>
              <li>Tap <strong>Save</strong> in the top right corner to apply. The Deco system will synchronize the updated settings across all satellite mesh nodes automatically.</li>
            </ol>
          </div>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            For further details, check our comprehensive brand-specific guide at <Link href="/routers/tp-link" className="text-[var(--brand-400)] hover:underline">TP-Link Settings & Login Page</Link>.
          </p>
        </section>

        {/* ==========================================
            SECTION 7: CHANGE WIFI PASSWORD ON ASUS
            ========================================== */}
        <section className="prose prose-invert max-w-none space-y-4">
          <h2 className="text-base font-bold text-[var(--text-primary)]" id="asus">Change WiFi Password on ASUS Routers</h2>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            ASUS routers utilize a custom dashboard called <strong>ASUSWRT</strong>, which provides advanced configuration settings and monitoring features. To change the Wi-Fi password on an ASUS router, follow these steps:
          </p>
          <div className="border-l-4 border-[var(--brand-500)] pl-4 py-2 space-y-2 text-xs text-[var(--text-secondary)] bg-[var(--bg-elevated)] rounded-r-xl">
            <ol className="list-decimal pl-5 space-y-1">
              <li>Connect to the ASUS network using a wired Ethernet connection or Wi-Fi.</li>
              <li>Open your web browser and go to <Link href="/ips/192-168-1-1" className="text-[var(--brand-400)] hover:underline">192.168.1.1</Link> or type <code>router.asus.com</code>.</li>
              <li>Enter your administrator username and password (default is <code>admin</code> / <code>admin</code> on older models).</li>
              <li>In the left-hand sidebar menu, locate the <strong>Advanced Settings</strong> section and click on <strong>Wireless</strong>.</li>
              <li>Ensure you are on the <strong>General</strong> tab at the top of the menu page.</li>
              <li>Select your target band from the <strong>Band</strong> dropdown menu if you do not have Smart Connect enabled (you must set the password for both 2.4 GHz and 5 GHz bands).</li>
              <li>Set the <strong>Authentication Method</strong> dropdown to a secure option (WPA2-Personal, WPA3-Personal, or WPA2/WPA3-Personal Transition Mode).</li>
              <li>Type your new password in the field labeled <strong>WPA Pre-Shared Key</strong>.</li>
              <li>Click <strong>Apply</strong> at the bottom of the page. The router will restart its wireless radios, applying the changes.</li>
            </ol>
          </div>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Learn more about managing ASUS routers and troubleshooting settings in our brand-specific guide at <Link href="/routers/asus" className="text-[var(--brand-400)] hover:underline">ASUS Settings & Login Page</Link>.
          </p>
        </section>

        {/* ==========================================
            SECTION 8: CHANGE WIFI PASSWORD ON NETGEAR
            ========================================== */}
        <section className="prose prose-invert max-w-none space-y-4">
          <h2 className="text-base font-bold text-[var(--text-primary)]" id="netgear">Change WiFi Password on NETGEAR Routers</h2>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            NETGEAR routers and Orbi mesh systems utilize a dashboard called NETGEAR Genie, accessible through web browsers or the Nighthawk/Orbi smartphone apps.
          </p>
          <div className="border-l-4 border-[var(--brand-500)] pl-4 py-2 space-y-2 text-xs text-[var(--text-secondary)] bg-[var(--bg-elevated)] rounded-r-xl">
            <span className="font-bold text-[var(--text-primary)] block">NETGEAR Web Portal Steps:</span>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Connect your device to the NETGEAR router's network.</li>
              <li>Open a web browser and type <code>routerlogin.net</code> or <code>routerlogin.com</code>. If they fail to load, use the gateway IP address <Link href="/ips/192-168-1-1" className="text-[var(--brand-400)] hover:underline">192.168.1.1</Link>.</li>
              <li>Enter your admin credentials. The default username is <code>admin</code>, and the default password is <code>password</code>.</li>
              <li>Ensure the <strong>Basic</strong> tab is selected at the top left of the dashboard.</li>
              <li>Click on the <strong>Wireless</strong> option in the sidebar menu.</li>
              <li>Scroll down to the <strong>Security Options</strong> section and ensure a secure protocol is selected (WPA2-PSK [AES] or WPA3).</li>
              <li>In the <strong>Passphrase</strong> field, enter your new Wi-Fi password.</li>
              <li>Click <strong>Apply</strong> at the top of the page. The system will save the new settings and restart your wireless networks.</li>
            </ol>
          </div>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            For more instructions on Netgear configurations, check our dedicated portal at <Link href="/routers/netgear" className="text-[var(--brand-400)] hover:underline">NETGEAR Settings & Login Page</Link>.
          </p>
        </section>

        {/* ==========================================
            SECTION 9: CHANGE WIFI PASSWORD ON D-LINK
            ========================================== */}
        <section className="prose prose-invert max-w-none space-y-4">
          <h2 className="text-base font-bold text-[var(--text-primary)]" id="d-link">Change WiFi Password on D-Link Routers</h2>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            D-Link routers feature a user-friendly setup wizard. If you are using an older DIR series router or a newer EAGLE PRO AI router, follow these steps to update your password:
          </p>
          <div className="border-l-4 border-[var(--brand-500)] pl-4 py-2 space-y-2 text-xs text-[var(--text-secondary)] bg-[var(--bg-elevated)] rounded-r-xl">
            <ol className="list-decimal pl-5 space-y-1">
              <li>Connect your computer or phone to your D-Link router's network.</li>
              <li>Open a web browser and enter <code>dlinkrouter.local</code> or the IP address <Link href="/ips/192-168-0-1" className="text-[var(--brand-400)] hover:underline">192.168.0.1</Link> in the address bar.</li>
              <li>Enter your administrator password. If you haven't changed this default admin password, leave the field blank (older models) or check the sticker on the back of your device.</li>
              <li>Navigate to the <strong>Settings</strong> menu at the top, and click on <strong>Wireless</strong>.</li>
              <li>Locate the <strong>Password</strong> field for your active Wi-Fi bands. If you are using Smart Connect, you only need to change it in one field. Otherwise, update the password for both the 2.4 GHz and 5 GHz bands.</li>
              <li>Type your new password in the corresponding password fields.</li>
              <li>Click <strong>Save</strong> in the upper right-hand corner. The router will apply the configuration and restart your Wi-Fi connections.</li>
            </ol>
          </div>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            For more details, view our D-Link configuration guide at <Link href="/routers/d-link" className="text-[var(--brand-400)] hover:underline">D-Link Settings & Login Page</Link>.
          </p>
        </section>

        {/* ==========================================
            SECTION 10: CHANGE WIFI PASSWORD ON HUAWEI
            ========================================== */}
        <section className="prose prose-invert max-w-none space-y-4">
          <h2 className="text-base font-bold text-[var(--text-primary)]" id="huawei">Change WiFi Password on Huawei Routers</h2>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Huawei WS and AX series routers (such as the AX3 and AX3 Pro) feature a modern web portal. To update your password on a Huawei router, follow these steps:
          </p>
          <div className="border-l-4 border-[var(--brand-500)] pl-4 py-2 space-y-2 text-xs text-[var(--text-secondary)] bg-[var(--bg-elevated)] rounded-r-xl">
            <ol className="list-decimal pl-5 space-y-1">
              <li>Connect to the Huawei router's Wi-Fi network.</li>
              <li>Open a web browser and enter <code>192.168.3.1</code> or <code>192.168.8.1</code> in the URL address bar.</li>
              <li>Enter your login password. This is usually the admin password you set during the initial setup process.</li>
              <li>In the main menu at the top, select the <strong>My Wi-Fi</strong> tab.</li>
              <li>Look for the <strong>Wi-Fi Password</strong> field. You can also change the SSID (Wi-Fi Name) in this section if desired.</li>
              <li>Input your new Wi-Fi password. For optimal security, ensure the security mode is set to a secure protocol like <strong>WPA2-PSK/WPA3-SAE</strong>.</li>
              <li>Click <strong>Save</strong>. The router will save the updated settings, disconnect current devices, and apply the changes.</li>
            </ol>
          </div>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            For a detailed look at configuring Huawei hardware, read our brand guide at <Link href="/routers/huawei" className="text-[var(--brand-400)] hover:underline">Huawei Settings & Login Page</Link>.
          </p>
        </section>

        {/* ==========================================
            SECTION 11: CHANGE WIFI PASSWORD ON XIAOMI
            ========================================== */}
        <section className="prose prose-invert max-w-none space-y-4">
          <h2 className="text-base font-bold text-[var(--text-primary)]" id="xiaomi">Change WiFi Password on Xiaomi Routers</h2>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Xiaomi routers utilize the MiWiFi firmware dashboard, accessible via standard web browsers or the Mi Home app. Follow the steps below to update your password:
          </p>
          <div className="border-l-4 border-[var(--brand-500)] pl-4 py-2 space-y-2 text-xs text-[var(--text-secondary)] bg-[var(--bg-elevated)] rounded-r-xl">
            <ol className="list-decimal pl-5 space-y-1">
              <li>Connect your device to your Xiaomi network.</li>
              <li>Open a browser and type <code>192.168.31.1</code> or <code>miwifi.com</code> in the address bar.</li>
              <li>Log in using your administrator password.</li>
              <li>Click on the <strong>Settings</strong> option in the top navigation bar.</li>
              <li>Click on <strong>Wi-Fi Settings</strong> in the submenu.</li>
              <li>Locate the band you wish to modify (2.4 GHz, 5 GHz, or Game band).</li>
              <li>Under the security option, ensure it is set to a secure WPA standard, then type your new password in the <strong>Password</strong> field.</li>
              <li>Click <strong>Save</strong> at the bottom of the section. The router will apply the new settings and restart your wireless networks.</li>
            </ol>
          </div>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            For more information on Xiaomi router settings, read our guide at <Link href="/routers/xiaomi" className="text-[var(--brand-400)] hover:underline">Xiaomi Settings & Login Page</Link>.
          </p>
        </section>

        {/* ==========================================
            SECTION 12: CHANGE WIFI PASSWORD ON LINKSYS
            ========================================== */}
        <section className="prose prose-invert max-w-none space-y-4">
          <h2 className="text-base font-bold text-[var(--text-primary)]" id="linksys">Change WiFi Password on Linksys Routers</h2>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Linksys routers and Velop whole-home mesh systems utilize the Linksys Smart Wi-Fi dashboard, accessible via browser or mobile app.
          </p>
          <div className="border-l-4 border-[var(--brand-500)] pl-4 py-2 space-y-2 text-xs text-[var(--text-secondary)] bg-[var(--bg-elevated)] rounded-r-xl">
            <ol className="list-decimal pl-5 space-y-1">
              <li>Connect your device to your Linksys network.</li>
              <li>Open your web browser and go to <Link href="/ips/192-168-1-1" className="text-[var(--brand-400)] hover:underline">192.168.1.1</Link> or type <code>myrouterlocal.net</code>.</li>
              <li>Log in using your administrative credentials. If you haven't changed these, the default username is <code>admin</code> (leave the password blank or type <code>admin</code>).</li>
              <li>In the left-hand sidebar under <strong>Router Settings</strong>, click on <strong>Wi-Fi Settings</strong>.</li>
              <li>Ensure the <strong>Basic</strong> tab is active.</li>
              <li>Locate the network profile you wish to edit and click <strong>Edit</strong> next to it.</li>
              <li>Select your security mode (WPA2 Personal or WPA3 Personal) and enter your new password in the <strong>Password</strong> field.</li>
              <li>Click <strong>Apply</strong>, then click <strong>Ok</strong> to confirm. The router will apply the new configuration.</li>
            </ol>
          </div>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            For additional details on Linksys setups, view our guide at <Link href="/routers/linksys" className="text-[var(--brand-400)] hover:underline">Linksys Settings & Login Page</Link>.
          </p>
        </section>

        {/* ==========================================
            SECTION 13: CHANGE WIFI PASSWORD ON TENDA
            ========================================== */}
        <section className="prose prose-invert max-w-none space-y-4">
          <h2 className="text-base font-bold text-[var(--text-primary)]" id="tenda">Change WiFi Password on Tenda Routers</h2>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Tenda routers are widely used for budget-friendly networks. To update the Wi-Fi password on a Tenda router, follow these steps:
          </p>
          <div className="border-l-4 border-[var(--brand-500)] pl-4 py-2 space-y-2 text-xs text-[var(--text-secondary)] bg-[var(--bg-elevated)] rounded-r-xl">
            <ol className="list-decimal pl-5 space-y-1">
              <li>Connect to the Tenda router's Wi-Fi network.</li>
              <li>Open your browser and navigate to <code>192.168.0.1</code> or <code>tendawifi.com</code>.</li>
              <li>Enter your login password (default username/password is usually <code>admin</code>).</li>
              <li>In the left sidebar menu, click on <strong>Wireless Settings</strong>.</li>
              <li>Under the <strong>WiFi Name & Password</strong> section, verify that the WPA Security mode is selected.</li>
              <li>In the <strong>WiFi Password</strong> field, delete the old password and enter your new secure passphrase.</li>
              <li>Click <strong>Save</strong> at the bottom of the section. The router will apply the settings and restart your wireless networks.</li>
            </ol>
          </div>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            For more information on Tenda routers, read our dedicated brand guide at <Link href="/routers/tenda" className="text-[var(--brand-400)] hover:underline">Tenda Settings & Login Page</Link>.
          </p>
        </section>

        {/* ==========================================
            USER FEEDBACK 2: CHANGE WIFI PASSWORD FROM PHONE
            ========================================== */}
        <section className="prose prose-invert max-w-none space-y-4">
          <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-1.5">
            <Smartphone size={16} className="text-[var(--brand-400)]" />
            How to Change WiFi Password From Your Phone (Mobile Devices)
          </h2>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            You do not need a computer or a wired Ethernet connection to change your Wi-Fi password. Most users prefer to use a smartphone (Android or iOS) to manage their networks. You can do this by using a mobile web browser or the manufacturer's official app:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-[var(--text-secondary)]">
            <div className="border border-[var(--border-subtle)] rounded-xl p-4 bg-[var(--bg-elevated)] space-y-2">
              <span className="font-bold text-[var(--text-primary)] block">Method 1: Mobile Web Browser (Universal)</span>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                Connect your phone to the Wi-Fi network you want to modify. Open Chrome or Safari and enter your router's gateway IP address (e.g., <code>192.168.1.1</code>) in the address bar. The login screen will open. Enter your admin credentials, zoom in on the responsive menu if needed, navigate to the wireless settings, and update your password. Once you click save, your phone will disconnect. You must forget the network in your Wi-Fi settings and log in using the new password to reconnect.
              </p>
            </div>
            <div className="border border-[var(--border-subtle)] rounded-xl p-4 bg-[var(--bg-elevated)] space-y-2">
              <span className="font-bold text-[var(--text-primary)] block">Method 2: Official Manufacturer App (App-Based)</span>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                Most modern routers support configuration apps, such as TP-Link Tether, NETGEAR Nighthawk, ASUS Router, Linksys, or Google Home. Install the app from the Google Play Store or Apple App Store, log in to your account, and select your local router. The app will detect your system. Tap on the wireless settings menu, select the network name, enter your new password, and click save. The app will automatically push the changes to your router.
              </p>
            </div>
          </div>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Note for mobile users: iOS and Android have security settings that occasionally prevent browsers from loading local IP addresses if VPNs or Private Relay (on iOS) are active. Temporary turn off any VPN, Apple iCloud Private Relay, or proxy settings before loading your router's IP address.
          </p>
        </section>

        {/* ==========================================
            SECTION 14: BEST PASSWORD PRACTICES
            ========================================== */}
        <section className="prose prose-invert max-w-none space-y-4">
          <h2 className="text-base font-bold text-[var(--text-primary)]">Best Practices for Creating a Secure WiFi Password</h2>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            A common security mistake is choosing a simple Wi-Fi password to make it easy for guests to remember. Hackers utilize automated wardriving scripts and cloud-based cracking software that run through thousands of combinations a second. A weak password can be cracked in minutes.
          </p>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            To secure your network, follow these practices for creating a strong password:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-xs text-[var(--text-muted)]">
            <li>
              <strong>Use Length to Your Advantage:</strong> Password length is more secure than complexity. Aim for a minimum of 12 to 16 characters. Every additional character increases the mathematical complexity of a brute-force attack.
            </li>
            <li>
              <strong>Create a Passphrase:</strong> Rather than a single complex word, combine 4 or 5 unrelated words (e.g., <code>Laptop#Coffee&Green$Cloud!</code>). This is easy to remember but difficult for automated scripts to guess.
            </li>
            <li>
              <strong>Avoid Predictable Patterns:</strong> Do not use your phone number, address, pet names, birthdays, or keyboard sequences (like <code>qwerty</code> or <code>12345678</code>).
            </li>
            <li>
              <strong>Utilize a Secure Guest Network:</strong> Do not share your main Wi-Fi password with guests. Instead, set up a segmented guest network with a separate password. This keeps guest devices isolated from your main network and local files.
            </li>
          </ul>
        </section>

        {/* ==========================================
            SECTION 15: WPA2 VS WPA3 COMPARISON
            ========================================== */}
        <section className="prose prose-invert max-w-none space-y-4">
          <h2 className="text-base font-bold text-[var(--text-primary)]">WPA2 vs. WPA3: Which Security Mode Should You Choose?</h2>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            When changing your Wi-Fi password, you will be prompted to select an encryption protocol. Below is a comparison of WPA2 and WPA3 security standards to help you choose the best option:
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-[11px] text-[var(--text-secondary)]">
              <thead>
                <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                  <th className="px-3 py-2 text-left">Security Feature</th>
                  <th className="px-3 py-2 text-left">WPA2 (Standard)</th>
                  <th className="px-3 py-2 text-left">WPA3 (Modern)</th>
                  <th className="px-3 py-2 text-left">Recommendation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)]">
                <tr>
                  <td className="px-3 py-2.5 font-semibold text-[var(--text-primary)]">Encryption Standard</td>
                  <td className="px-3 py-2.5">128-bit AES-CCMP</td>
                  <td className="px-3 py-2.5">128-bit or 192-bit CNSA (GCMP-256)</td>
                  <td className="px-3 py-2.5">WPA3 provides stronger, enterprise-grade encryption.</td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-semibold text-[var(--text-primary)]">Handshake Protocol</td>
                  <td className="px-3 py-2.5">4-Way Handshake (PSK)</td>
                  <td className="px-3 py-2.5">Simultaneous Authentication of Equals (SAE)</td>
                  <td className="px-3 py-2.5">SAE prevents offline dictionary brute-force cracking.</td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-semibold text-[var(--text-primary)]">Forward Secrecy</td>
                  <td className="px-3 py-2.5">None</td>
                  <td className="px-3 py-2.5">Diffie-Hellman Key Exchange integrated</td>
                  <td className="px-3 py-2.5">WPA3 prevents past sessions from being decrypted even if password leaks.</td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-semibold text-[var(--text-primary)]">Device Compatibility</td>
                  <td className="px-3 py-2.5">99.9% (Almost all legacy clients)</td>
                  <td className="px-3 py-2.5">Requires devices from 2020 or newer</td>
                  <td className="px-3 py-2.5">WPA2 has the best compatibility for older devices.</td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-semibold text-[var(--text-primary)]">Brute-Force Protection</td>
                  <td className="px-3 py-2.5">Vulnerable to capture and offline decrypt</td>
                  <td className="px-3 py-2.5">Blocks offline decryption, limits attempt rates</td>
                  <td className="px-3 py-2.5">WPA3 protects simple passwords from automated attacks.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            If you have older smart home devices (like smart plugs or cameras) that do not support WPA3, choose the hybrid <strong>WPA2/WPA3 Personal (Transition Mode)</strong>. This allows newer devices to connect using WPA3 security, while older devices connect using WPA2 compatibility.
          </p>
        </section>

        {/* ==========================================
            SECTION 16: WHAT HAPPENS AFTER THE CHANGE?
            ========================================== */}
        <section className="prose prose-invert max-w-none space-y-4">
          <h2 className="text-base font-bold text-[var(--text-primary)]">What Happens After Changing Your WiFi Password?</h2>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Once you click save or apply, the router will immediately restart its wireless radios. This causes a few events on your network:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-xs text-[var(--text-muted)]">
            <li>
              <strong>Instant Disconnection:</strong> All devices connected to the Wi-Fi network will lose their connection. This includes phones, laptops, smart TVs, cameras, printers, and mesh satellites.
            </li>
            <li>
              <strong>Wired Connections Stay Online:</strong> Devices connected via a wired Ethernet cable directly to the router will remain connected and online.
            </li>
            <li>
              <strong>Reconnection Required:</strong> To get devices back online, you must select the Wi-Fi network on each device, select 'Forget Network' (to clear the cached old password), and enter the new password.
            </li>
          </ul>
        </section>

        {/* ==========================================
            USER FEEDBACK 3: MOST COMMON MISTAKES
            ========================================== */}
        <section className="prose prose-invert max-w-none space-y-4">
          <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-1.5">
            <AlertTriangle size={16} className="text-amber-400" />
            Most Common Mistakes After Changing WiFi Password
          </h2>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Changing a Wi-Fi password is straightforward, but users often run into a few common post-change mistakes that can disrupt their network. Watch out for these common issues:
          </p>
          <div className="space-y-4 text-xs text-[var(--text-secondary)]">
            <div className="p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-2">
              <span className="font-bold text-[var(--text-primary)] block">1. Forgetting Saved Devices (Looping Login Attempts)</span>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                When you change the Wi-Fi password, background devices (such as smart TVs or tablets left in sleep mode) will continuously attempt to reconnect using the old cached password. This loop can trigger security lockouts on the router or drain mobile batteries. To prevent this, go through your home and manually update the password on all connected devices, or turn off the Wi-Fi card on devices you aren't currently using.
              </p>
            </div>
            <div className="p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-2">
              <span className="font-bold text-[var(--text-primary)] block">2. Mesh Satellite Node Synchronization Failures</span>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                If you are using a whole-home mesh Wi-Fi system (like TP-Link Deco, Netgear Orbi, or Linksys Velop), changing the password from the main router's web portal occasionally fails to synchronize with satellite nodes. When this occurs, satellite nodes can lose connection. To prevent this, change the password using the system's official mobile app, or restart your satellite nodes if they fail to connect after the update.
              </p>
            </div>
            <div className="p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-2">
              <span className="font-bold text-[var(--text-primary)] block">3. Smart Home IoT Device Disconnection</span>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                Smart home devices (like smart bulbs, plugs, and cameras) often use simple microcontrollers that only support 2.4 GHz connections and lack a user interface. When the password changes, these devices cannot prompt you for the new credentials. You must open each device's app, reset the device physically, and pair it again from scratch.
              </p>
            </div>
            <div className="p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-2">
              <span className="font-bold text-[var(--text-primary)] block">4. Wireless Printer Connection Issues</span>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                Wireless printers are notorious for network connection drops. If your printer has a display screen, go to its network settings, run the setup wizard, and enter the new password. If it does not have a screen, you must connect it to a computer via a USB cable to update settings or use the physical WPS buttons on the printer and router.
              </p>
            </div>
            <div className="p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-2">
              <span className="font-bold text-[var(--text-primary)] block">5. Selecting the Wrong WPA Mode</span>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                Enabling a strict WPA3-only security setting will block older devices that only support WPA2 from connecting. If you have legacy smart TVs, older laptops, or vintage game consoles, ensure your security settings are set to WPA2/WPA3 Transition Mode to maintain connection.
              </p>
            </div>
          </div>
        </section>

        {/* ==========================================
            SECTION 17: TROUBLESHOOTING COMMON PROBLEMS
            ========================================== */}
        <section className="prose prose-invert max-w-none space-y-4">
          <h2 className="text-base font-bold text-[var(--text-primary)]">Troubleshooting: Common WiFi Password Change Issues</h2>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            If you run into issues during or after changing your password, check the troubleshooting steps below:
          </p>
          <div className="space-y-4 text-xs text-[var(--text-secondary)]">
            <div className="p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-2">
              <span className="font-semibold text-[var(--text-primary)] flex items-center gap-1">
                <HelpCircle size={14} className="text-cyan-400" /> Cannot Log In to the Router Admin Portal
              </span>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                If the login page fails to load, ensure you are connected to the router's network (via Wi-Fi or Ethernet cable). Turn off any active VPNs or iOS Private Relay features that can redirect local traffic. Clear your browser cache or try a different browser. If you forgot the administrative password, hold the physical reset button for 10-15 seconds to restore factory settings. Learn more in our <Link href="/router-login-not-working" className="text-[var(--brand-400)] hover:underline">Router Login Not Working</Link> guide.
              </p>
            </div>
            <div className="p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-2">
              <span className="font-semibold text-[var(--text-primary)] flex items-center gap-1">
                <HelpCircle size={14} className="text-cyan-400" /> Save Button is Missing or Grayed Out
              </span>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                This occurs due to browser scripting conflicts, ad-blocker interference, or password validation errors. Ensure the password you entered meets the router's requirements (some routers reject special symbols or require a minimum length). Try temporarily disabling your ad-blocker or using a private browsing window.
              </p>
            </div>
            <div className="p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-2">
              <span className="font-semibold text-[var(--text-primary)] flex items-center gap-1">
                <HelpCircle size={14} className="text-cyan-400" /> Devices Say 'Incorrect Password' or Cannot Connect
              </span>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                This is usually caused by the device trying to connect using its cached old password profile. To fix this, open the device's Wi-Fi settings, select the network name, tap <strong>Forget Network</strong>, and then reconnect by inputting the new password. If the issue persists, restart both the client device and the router.
              </p>
            </div>
          </div>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            If you need to reset your router configurations back to default settings, view our <Link href="/router-reset" className="text-[var(--brand-400)] hover:underline">How to Reset Router Guide</Link> or learn how to recover admin access in our <Link href="/router-password" className="text-[var(--brand-400)] hover:underline">Router Password Recovery Walkthrough</Link>.
          </p>
        </section>

        {/* ==========================================
            SECTION 18: SECURITY CHECKLIST
            ========================================== */}
        <section className="prose prose-invert max-w-none space-y-4">
          <h2 className="text-base font-bold text-[var(--text-primary)]">Post-Configuration Security Checklist</h2>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            After updating your password, review this security checklist to ensure your router is configured securely:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[var(--text-secondary)]">
            <div className="glass-card p-4 border border-[var(--border-subtle)] rounded-xl">
              <span className="font-bold text-[var(--text-primary)] block">Enable WPA3-Personal</span>
              <p className="text-[11px] text-[var(--text-muted)]">Use WPA3-Personal or WPA2/WPA3 Transition Mode to secure data transmission.</p>
            </div>
            <div className="glass-card p-4 border border-[var(--border-subtle)] rounded-xl">
              <span className="font-bold text-[var(--text-primary)] block">Disable WPS (WiFi Protected Setup)</span>
              <p className="text-[11px] text(--text-muted)">Disable WPS in your settings, as it is vulnerable to automated PIN cracking exploits.</p>
            </div>
            <div className="glass-card p-4 border border-[var(--border-subtle)] rounded-xl">
              <span className="font-bold text-[var(--text-primary)] block">Update Admin Password</span>
              <p className="text-[11px] text-[var(--text-muted)]">Modify the default admin password (like 'admin') to secure access to the admin portal.</p>
            </div>
            <div className="glass-card p-4 border border-[var(--border-subtle)] rounded-xl">
              <span className="font-bold text-[var(--text-primary)] block">Configure Guest Networks</span>
              <p className="text-[11px] text-[var(--text-muted)]">Set up a guest network for visitors and IoT devices to keep your main network isolated.</p>
            </div>
            <div className="glass-card p-4 border border-[var(--border-subtle)] rounded-xl">
              <span className="font-bold text-[var(--text-primary)] block">Update Router Firmware</span>
              <p className="text-[11px] text-[var(--text-muted)]">Check for firmware updates regularly to apply security patches and performance fixes.</p>
            </div>
            <div className="glass-card p-4 border border-[var(--border-subtle)] rounded-xl">
              <span className="font-bold text-[var(--text-primary)] block">Disable Remote WAN Management</span>
              <p className="text-[11px] text-[var(--text-muted)]">Disable remote management to prevent users outside your network from accessing the login page.</p>
            </div>
          </div>
        </section>

        {/* ==========================================
            SECTION 19: RELATED GUIDES
            ========================================== */}
        <section className="p-5 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-4">
          <span className="font-bold text-[var(--text-primary)] block text-xs flex items-center gap-1.5">
            <FileText size={14} className="text-[var(--brand-400)]" /> Internal Networking Resource Hub
          </span>
          <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
            Browse our other guides for advanced configurations, gaming optimizations, and network troubleshooting:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-[11px]">
            <Link href="/router-settings" className="p-2.5 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-lg text-[var(--text-secondary)] hover:text-[var(--brand-400)] hover:border-[var(--brand-800)] transition-all">
              <strong>Router Settings Configuration</strong>
            </Link>
            <Link href="/router-admin" className="p-2.5 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-lg text-[var(--text-secondary)] hover:text-[var(--brand-400)] hover:border-[var(--brand-800)] transition-all">
              <strong>Admin Access Guide</strong>
            </Link>
            <Link href="/router-login" className="p-2.5 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-lg text-[var(--text-secondary)] hover:text-[var(--brand-400)] hover:border-[var(--brand-800)] transition-all">
              <strong>How to Log In to Router</strong>
            </Link>
            <Link href="/router-password" className="p-2.5 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-lg text-[var(--text-secondary)] hover:text-[var(--brand-400)] hover:border-[var(--brand-800)] transition-all">
              <strong>Router Password Recovery</strong>
            </Link>
            <Link href="/router-reset" className="p-2.5 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-lg text-[var(--text-secondary)] hover:text-[var(--brand-400)] hover:border-[var(--brand-800)] transition-all">
              <strong>How to Reset Router</strong>
            </Link>
            <Link href="/gaming-network-optimization" className="p-2.5 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-lg text-[var(--text-secondary)] hover:text-[var(--brand-400)] hover:border-[var(--brand-800)] transition-all">
              <strong>Gaming Network Tweaks</strong>
            </Link>
            <Link href="/best-router-for-gaming" className="p-2.5 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-lg text-[var(--text-secondary)] hover:text-[var(--brand-400)] hover:border-[var(--brand-800)] transition-all">
              <strong>Best Gaming Routers</strong>
            </Link>
            <Link href="/wifi-6-for-gaming" className="p-2.5 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-lg text-[var(--text-secondary)] hover:text-[var(--brand-400)] hover:border-[var(--brand-800)] transition-all">
              <strong>Wi-Fi 6 for Low Latency</strong>
            </Link>
            <Link href="/wifi-7-for-gaming" className="p-2.5 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-lg text-[var(--text-secondary)] hover:text-[var(--brand-400)] hover:border-[var(--brand-800)] transition-all">
              <strong>Wi-Fi 7 Standards Guide</strong>
            </Link>
          </div>
        </section>

      </div>
    </TroubleshootingArticleShell>
  );
}
