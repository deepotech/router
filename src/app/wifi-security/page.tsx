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
  Lock,
  EyeOff,
  Cpu,
  AlertOctagon,
  HardDrive,
  CheckCircle2,
  LockKeyhole
} from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "WiFi Security Guide: How to Secure Your Wireless Network (2026)",
  description:
    "The complete authority guide to WiFi security. Learn WPA2 vs WPA3, common wireless attacks (KRACK, Evil Twin, PMKID), router hardening, guest networks, smart home protection, and enterprise security.",
  canonical: "/wifi-security",
  keywords: [
    "wifi security",
    "wireless network security",
    "wpa2 vs wpa3",
    "wifi attacks",
    "secure wifi",
    "router security",
    "wireless encryption",
    "wifi password security",
    "home network security",
    "wpa3",
    "krack attack",
    "evil twin attack"
  ]
});

const breadcrumbs = [
  { name: "Router Security", url: "/router-settings" },
  { name: "WiFi Security", url: "/wifi-security" }
];

const troubleshootingSteps = [
  {
    title: "Audit Wireless Encryption and SSID Settings",
    description:
      "Access your router admin dashboard and navigate to the wireless security panel. Inspect the active security protocol. Ensure that legacy standards like WEP or WPA-TKIP are disabled, and select WPA3-Personal or WPA2-AES (CCMP). Customize the network name (SSID) to a unique value that does not reveal your router's brand or model, preventing targeted exploit scanning.",
    tip: "If legacy devices fail to connect, configure a WPA3/WPA2 Transition Mode. Avoid hiding the SSID, as this does not provide real security and can cause connectivity issues."
  },
  {
    title: "Inspect Connected Devices and DHCP Leases",
    description:
      "Navigate to the Connected Devices, DHCP Client List, or Network Map section of your router interface. Cross-reference the MAC addresses of all connected clients against a documented inventory of your owned devices. Use online OUI lookup tools to verify the hardware manufacturer of any unknown hostnames on your LAN.",
    tip: "Utilize tools like Fing or Angry IP Scanner to sweep the local subnet for hidden active nodes that may bypass basic router client tables."
  },
  {
    title: "Update Router Firmware to Patch Vulnerabilities",
    description:
      "Check the system maintenance section of your router's administration page for firmware updates. If your router does not support automatic cloud updates, visit the official manufacturer support page, download the latest firmware image corresponding to your exact hardware revision, and upload it manually via a wired Ethernet connection.",
    tip: "Always export and save a copy of your router's current configuration file before performing any firmware flash."
  },
  {
    title: "Update Admin Credentials and WiFi Passphrase",
    description:
      "Modify the default administrator credentials used to access the router's web interface, replacing common values (like 'admin') with a highly complex passphrase. Next, change the primary WiFi network security key. Select a strong, unique passphrase of at least 16 characters containing a mix of upper and lower case letters, numbers, and special symbols.",
    tip: "Changing the WiFi password forces all active clients to disconnect and re-authenticate, immediately purging unauthorized devices."
  },
  {
    title: "Enable and Configure the Built-in Firewall",
    description:
      "Locate the firewall settings in your router's advanced security configuration. Verify that the Stateful Packet Inspection (SPI) firewall is active for both IPv4 and IPv6 traffic. Disable Universal Plug and Play (UPnP) to prevent smart home devices from opening unauthenticated WAN-facing ports automatically.",
    tip: "Ensure remote management access from the WAN port is fully disabled, limiting administrative console access to local LAN clients."
  },
  {
    title: "Segment the Network with Guest Isolation",
    description:
      "Enable the Guest Network feature on your router to create a separate SSID for visitors and smart home (IoT) devices. In the guest network configuration, check the box for 'Client Isolation' or 'AP Isolation' and disable access to the primary local network. This locks guest traffic into a dedicated VLAN with internet-only routing.",
    tip: "Do not reuse your primary WiFi password for the guest network. Keep them completely distinct to maintain security boundaries."
  }
];

const faqs = [
  {
    question: "What is the most secure WiFi encryption?",
    answer:
      "The most secure WiFi encryption standard currently available for home and enterprise networks is WPA3 (Wi-Fi Protected Access 3), specifically using WPA3-Enterprise (with 192-bit cryptographic strength) or WPA3-Personal using SAE (Simultaneous Authentication of Equals). WPA3 replaces the vulnerable 4-way handshake of WPA2 with a Dragonfly key exchange, which is mathematically immune to offline dictionary attacks and brute-force key recovery. Additionally, WPA3 utilizes GCMP-256 (Galois/Counter Mode Protocol) encryption, which is more secure and efficient than the legacy CCMP/AES protocol used in WPA2. If WPA3 is not supported by your devices, WPA2-AES is the next best secure option, whereas WEP and WPA-TKIP are completely compromised and should never be used."
  },
  {
    question: "Is WPA3 worth upgrading to?",
    answer:
      "Yes, upgrading to WPA3 is highly recommended and essential for maintaining modern wireless security. The primary benefit of WPA3 is its resistance to offline password cracking; even if you choose a weak or simple password, an attacker capturing the wireless handshake cannot crack it offline using GPU brute-force tools like Hashcat. WPA3 also introduces mandatory Protected Management Frames (PMF), which prevents deauthentication attacks that eject devices from your network. If you have older smart home (IoT) devices that do not support WPA3, you can configure your router to run in WPA3/WPA2 Mixed Mode (Transition Mode), allowing newer devices to connect securely via WPA3 while legacy devices connect via WPA2."
  },
  {
    question: "Can someone hack my WiFi without the password?",
    answer:
      "Yes, it is possible for a determined attacker to hack your WiFi network without knowing the password, especially if your router configurations are unhardened. Common entry points that bypass the WiFi password include exploiting WPS (Wi-Fi Protected Setup) PIN brute-force vulnerabilities, setting up an Evil Twin rogue access point that mimics your network SSID and forces your devices to connect to it, or exploiting unpatched firmware vulnerabilities (such as remote code execution bugs on the router's WAN interface). Additionally, if your router uses legacy encryption like WEP or WPA-TKIP, mathematical flaws allow attackers to crack the network key in minutes without needing a password. Hardening your router by disabling WPS, UPnP, and remote management, and using WPA3 encryption is critical to preventing these attacks."
  },
  {
    question: "What is an Evil Twin attack?",
    answer:
      "An Evil Twin attack is a type of wireless Man-in-the-Middle (MITM) attack where an attacker configures a rogue access point that broadcasts the exact same Network Name (SSID) and MAC address (BSSID) as a legitimate, trusted network. The attacker then broadcasts deauthentication packets to force target devices to disconnect from the legitimate router. When the target devices attempt to reconnect, they automatically associate with the attacker's rogue access point because it has a stronger signal or is closer. Once connected, the attacker can sniff all unencrypted traffic, capture login credentials, redirect DNS queries to phishing sites, or inject malware into web pages served to the victim."
  },
  {
    question: "Is my WiFi secure if I use WPA2?",
    answer:
      "A WiFi network running WPA2 can still be considered moderately secure, provided that two conditions are met: you have chosen a highly complex pre-shared key (over 16 characters containing letters, numbers, and special symbols) and your router's firmware is patched against the KRACK (Key Reinstallation Attack) vulnerability. However, WPA2 is fundamentally susceptible to offline dictionary attacks. If an attacker captures the 4-way handshake using monitor mode, they can run automated brute-force attacks on their own hardware without ever interacting with your network again. Additionally, WPA2 does not require Protected Management Frames (PMF) by default, leaving clients open to deauthentication denial-of-service attacks."
  },
  {
    question: "How do I know if someone is on my WiFi?",
    answer:
      "You can determine exactly who is on your network by checking your router's DHCP Client List or Network Map inside the admin panel. These lists display all active devices with their IP addresses, MAC addresses, and hostnames. For a deeper scan, you can use desktop tools like Angry IP Scanner or mobile apps like Fing to run a real-time subnet sweep of your network range. This will detect any hidden or silent devices that are currently connected. If you see hostnames or MAC addresses that do not correspond to any of your computers, phones, tablets, smart TVs, or IoT devices, it is highly likely that an unauthorized user or device is accessing your network. For a complete guide on how to perform this audit, read our guide on how to see who is on your WiFi."
  },
  {
    question: "Should I hide my SSID?",
    answer:
      "Hiding your SSID (network name) by disabling SSID broadcasting is not an effective security measure and is generally not recommended. While it prevents your network name from appearing in the standard list of available networks on consumer devices, it does not hide the network from attackers. Legitimate devices that are already configured to connect to your hidden network will continuously broadcast probe requests containing your SSID, making them trackable. Furthermore, hackers using free monitoring tools like Wireshark or NetSpot can easily discover hidden SSIDs by intercepting association frames. Hiding your SSID can also cause compatibility issues with older IoT devices and increase battery drain on your mobile devices."
  },
  {
    question: "What is a KRACK attack?",
    answer:
      "KRACK (Key Reinstallation Attack) is a serious cryptographic vulnerability discovered in 2017 that targets the 4-way handshake used in the WPA2 protocol. The attack works by manipulating and replaying cryptographic handshake messages (specifically message 3) to force the client to reinstall an encryption key that is already in use. When the key is reinstalled, the associated incremental transmit packet numbers (nonces) and replay counters are reset to zero. This key reuse allows an attacker within physical range to decrypt wireless traffic, replay packets, and in some cases, inject malicious data into the network. KRACK is a client-side and AP-side vulnerability that requires software patches to resolve."
  },
  {
    question: "How do I secure my smart home devices?",
    answer:
      "Smart home (IoT) devices should be secured through strict network segmentation. You should create a separate, isolated Guest WiFi network or a dedicated IoT VLAN (Virtual Local Area Network) specifically for these devices. Ensure that client isolation is enabled on this network so that smart bulbs, plugs, and cameras cannot communicate with each other or access your primary computer and storage drives. Additionally, you should change all default administrator credentials on smart devices immediately, disable remote cloud access if it is not required, and regularly check for firmware updates via the device manufacturer's app."
  },
  {
    question: "What is the difference between WPA-Personal and WPA-Enterprise?",
    answer:
      "WPA-Personal (WPA-PSK) utilizes a single Pre-Shared Key (password) that is shared among all users and devices on the network. This is the standard mode for residential homes. WPA-Enterprise (WPA-802.1X), on the other hand, does not use a single shared password. Instead, it delegates authentication to a central RADIUS (Remote Authentication Dial-In User Service) server. Each user logs in with their own unique credentials (such as an active directory username/password or a digital certificate). WPA-Enterprise is significantly more secure for businesses because it prevents credential sharing, allows administrators to revoke access for individual users, and generates unique session keys for every device."
  },
  {
    question: "Does a VPN protect me on WiFi?",
    answer:
      "Yes, a VPN (Virtual Private Network) provides an additional, highly effective layer of protection when using WiFi, especially on public or unencrypted networks. A VPN creates a secure, encrypted tunnel between your device and the VPN server, wrapping all of your internet traffic in advanced encryption (such as AES-256 or ChaCha20). Even if an attacker intercepts your wireless signals, runs an Evil Twin access point, or captures your packets using Wireshark, they will only see unreadable encrypted VPN traffic. However, while a VPN secures your data transit to the internet, it does not prevent local attacks on your device if your firewall is disabled, nor does it secure the router itself from being compromised."
  },
  {
    question: "How often should I change my WiFi password?",
    answer:
      "It is recommended to change your WiFi password at least once every 6 to 12 months, or immediately if you suspect that an unauthorized device has gained access to your network. You should also change the password after sharing it with temporary guests, contractors, or neighbors, or if a device that had access to the network is lost or stolen. When changing your password, ensure it is a strong passphrase of at least 16 characters containing a mix of upper and lower case letters, numbers, and symbols. Changing the WiFi password will force all connected devices to disconnect and re-authenticate, ensuring a clean state."
  }
];

const commonCauses = [
  {
    title: "Default Factory Credentials",
    desc: "Routers ship with generic administrative usernames and passwords printed on stickers. Attackers exploit these widely known defaults to compromise interfaces and alter DNS or routing rules."
  },
  {
    title: "Outdated Firmware",
    desc: "Unpatched router firmware contains publicly documented vulnerabilities (CVEs) that allow attackers within physical radio range or via the WAN port to execute arbitrary code or bypass authentication."
  },
  {
    title: "WEP or WPA (TKIP) Encryption",
    desc: "Using outdated cryptographic protocols exposes your wireless payload to rapid decryption. Free software tools can compromise WEP keys in minutes by exploiting weak initialization vector (IV) structures."
  },
  {
    title: "WPS Enabled",
    desc: "Wi-Fi Protected Setup PIN mechanisms are highly susceptible to brute-force and Pixie Dust attacks, allowing attackers to retrieve the primary pre-shared WiFi password in a matter of seconds."
  },
  {
    title: "No Guest Network Isolation",
    desc: "Failing to isolate guest or smart home (IoT) devices allows a single compromised endpoint to scan and launch lateral attacks against sensitive primary workstations, servers, and NAS nodes."
  },
  {
    title: "Disabled Firewall",
    desc: "Disabling the router's stateful packet inspection (SPI) firewall exposes internal ports directly to internet-wide automated port scans, inviting unauthorized remote connection attempts."
  }
];

const quickFixChecklist = [
  "Log into the router admin dashboard and replace default factory credentials with a complex custom username and password.",
  "Configure wireless security settings to use WPA3-Personal or WPA2-AES encryption and disable WEP and TKIP completely.",
  "Turn off Wi-Fi Protected Setup (WPS) within the wireless settings to prevent PIN-based authentication bypass.",
  "Establish a separate, isolated Guest network SSID with client isolation active to segment visitors and IoT hardware.",
  "Disable WAN Remote Management, Telnet, and UPnP services to minimize external exploit entry vectors.",
  "Apply the latest firmware patch downloaded directly from the official router manufacturer's support site.",
  "Secure your DNS queries by configuring encrypted DNS (DNS-over-HTTPS or DNS-over-TLS) on your router.",
  "Verify that the router's internal Stateful Packet Inspection (SPI) firewall is active for both IPv4 and IPv6 traffic."
];

// ---- SCHEMAS ----

const techArticleSchema = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "@id": `${APP_URL}/wifi-security#article`,
  url: `${APP_URL}/wifi-security`,
  headline: "WiFi Security Guide: How to Secure Your Wireless Network (2026)",
  description:
    "The complete authority guide to WiFi security. Learn WPA2 vs WPA3, common wireless attacks (KRACK, Evil Twin, PMKID), router hardening, guest networks, smart home protection, and enterprise security.",
  publisher: {
    "@type": "Organization",
    name: "RouterVia",
    logo: {
      "@type": "ImageObject",
      url: `${APP_URL}/logo.png`
    }
  },
  author: {
    "@type": "Organization",
    name: "RouterVia Engineering Group"
  },
  dateModified: "2026-06-16",
  proficiencyLevel: "Advanced",
  about: [
    { "@type": "Thing", name: "WiFi Security" },
    { "@type": "Thing", name: "Wireless Encryption" },
    { "@type": "Thing", name: "Network Security" }
  ]
};

const faqPageSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${APP_URL}/wifi-security#faq`,
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer
    }
  }))
};

const collectionPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${APP_URL}/wifi-security#collection`,
  url: `${APP_URL}/wifi-security`,
  name: "WiFi Security Guides & Resources",
  description:
    "A collection of guides and technical resources for securing wireless networks, comparing protocols, isolating networks, and preventing attacks.",
  about: [
    { "@type": "Thing", name: "WiFi Security" },
    { "@type": "Thing", name: "Router Security" }
  ]
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${APP_URL}/wifi-security#itemlist`,
  name: "WiFi Security Cluster Guides",
  description:
    "Definitive guides for wireless network protection, protocol comparison, device isolation, and network auditing.",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      url: `${APP_URL}/wifi-security`,
      name: "WiFi Security Guide: How to Secure Your Wireless Network"
    },
    {
      "@type": "ListItem",
      position: 2,
      url: `${APP_URL}/wpa3-vs-wpa2`,
      name: "WPA3 vs WPA2: Differences, Handshakes, and Security Compared"
    },
    {
      "@type": "ListItem",
      position: 3,
      url: `${APP_URL}/guest-wifi-setup`,
      name: "How to Set Up a Secure Guest WiFi Network"
    },
    {
      "@type": "ListItem",
      position: 4,
      url: `${APP_URL}/block-device-on-router`,
      name: "How to Block a Device from Your WiFi Network"
    },
    {
      "@type": "ListItem",
      position: 5,
      url: `${APP_URL}/how-to-see-who-is-on-my-wifi`,
      name: "How to See Who is Connected to Your WiFi Network"
    }
  ]
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": `${APP_URL}/wifi-security#breadcrumb`,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: APP_URL
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Router Security",
      item: `${APP_URL}/router-settings`
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "WiFi Security",
      item: `${APP_URL}/wifi-security`
    }
  ]
};

export default function WifiSecurityPage() {
  return (
    <TroubleshootingArticleShell
      h1="WiFi Security: The Complete Guide to Protecting Your Wireless Network (2026)"
      intro="Your home WiFi network is the gateway to every device you own — laptops, smartphones, smart TVs, cameras, and IoT sensors. A poorly secured wireless network exposes all of these to interception, hijacking, and exploitation. This definitive guide covers everything from encryption fundamentals to advanced attack vectors, router hardening checklists, enterprise protocols, and smart home protection strategies."
      category="wifi"
      breadcrumbs={breadcrumbs}
      faqs={faqs}
      troubleshootingSteps={troubleshootingSteps}
      warningBanner={{
        title: "Active Threat: Unencrypted Networks",
        text: "Routers using WEP or open networks with no password transmit all data in plaintext. Any device within radio range using freely available tools like Wireshark or Aircrack-ng can capture and read your traffic. Update your encryption protocol to WPA3 or WPA2-AES immediately."
      }}
      quickFixChecklist={quickFixChecklist}
      commonCauses={commonCauses}
      severityLevel="high"
      whenToContactISP="If you suspect your router has been compromised at the hardware level (e.g., persistent DNS hijacking or firmware modifications that survive factory resets), or if your ISP-provided gateway has administrative settings locked down, contact your ISP support immediately. They can push remote firmware upgrades, audit connection logs from their end, or swap the physical gateway for a newer, WPA3-capable model."
    >
      <JsonLd data={techArticleSchema} />
      <JsonLd data={faqPageSchema} />
      <JsonLd data={collectionPageSchema} />
      <JsonLd data={itemListSchema} />
      <JsonLd data={breadcrumbSchema} />

      <div className="space-y-10">
        {/* ==========================================
            AI SNIPPET BOX
            ========================================== */}
        <div className="glass-card p-6 border border-emerald-950/30 bg-emerald-950/5 rounded-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl" />
          <h3 className="text-sm font-bold text-emerald-400 mb-2 flex items-center gap-1.5">
            <Shield size={16} className="text-emerald-400" />
            Quick Take: Essential WiFi Hardening in 2026
          </h3>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Securing a wireless network requires a multi-layered cryptographic approach. Transition 
            your router to <strong>WPA3-Personal (SAE)</strong> to eliminate offline brute-force attacks, 
            which were a major vulnerability in WPA2. Disable insecure entry points like <strong>WPS</strong> and 
            <strong>UPnP</strong>. Segment your network using a dedicated, isolated <strong>Guest SSID</strong> with 
            client isolation turned on to containerize smart home (IoT) devices, and ensure your router firewall 
            is active with WAN administration disabled.
          </p>
        </div>

        {/* ==========================================
            SECTION 1: WHAT IS WIFI SECURITY
            ========================================== */}
        <section className="prose prose-invert max-w-none space-y-4" aria-label="What Is WiFi Security">
          <div className="flex items-center gap-2 text-[var(--brand-400)] font-semibold text-xs uppercase tracking-wider mb-2">
            <Lock size={14} /> Wireless Encryption Fundamentals
          </div>
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            Section 1 — What Is WiFi Security
          </h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            WiFi security refers to the collection of protocols, encryption algorithms, and network configurations 
            designed to protect wireless communication channels from unauthorized access, eavesdropping, and data 
            tampering. Unlike wired networks, where an attacker requires physical access to an Ethernet port or cable, 
            wireless networks transmit data via radio frequency (RF) waves in the 2.4 GHz, 5 GHz, and 6 GHz bands. 
            These waves propagate omnidirectionally, penetrating walls and extending beyond the physical boundaries 
            of a home or office. Consequently, any receiver situated within radio range can capture raw frames, 
            making cryptographic protection the only viable line of defense.
          </p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            At its core, wireless security transforms plaintext data packets into ciphertext before they are modulated 
            and transmitted over the air. This Layer 2 (Data Link) encryption ensures that even if an adversary captures 
            transmitting frames using monitor-mode wireless interfaces, the payload remains unreadable. However, WiFi security 
            is distinct from upper-layer encryption protocols like HTTPS (TLS) or IPsec. While TLS secures the application-level 
            payload between a browser and a web server, it leaves local network headers, mDNS queries, and device metadata 
            exposed. Robust wireless encryption secures the entire local frame, shielding internal traffic patterns and 
            preventing local attackers from mapping your network.
          </p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            Understanding the distinction between the Local Area Network (LAN) and the Wide Area Network (WAN) is crucial. 
            The router acts as the stateful gateway between these zones. Security mechanisms like NAT and the built-in SPI 
            firewall protect the LAN from direct incoming WAN-side probes. However, the wireless access point is a virtual bridge 
            extending inside the LAN. If an attacker bypasses wireless security and connects to your WiFi, they bypass the WAN 
            firewall completely. They are assigned a local IP address and can communicate directly with internal network 
            interfaces, exposing network storage (NAS), printers, and client operating systems to direct exploits.
          </p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            Wireless networks employ different authentication mechanisms to establish trusted connections. Under WPA-Personal 
            protocols, authentication relies on a Pre-Shared Key (PSK), which generates session-specific keys for encryption. 
            WPA-Enterprise replaces the single password model with 802.1X, authenticating clients individually via a central 
            database. In the WPA3 standard, Pre-Shared Keys are replaced by Simultaneous Authentication of Equals (SAE). SAE 
            utilizes zero-knowledge proofs to establish keys, ensuring that client-AP handshakes are immune to offline 
            dictionary attacks even if the password itself is weak.
          </p>

          <div className="overflow-x-auto my-6">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-[11px] text-[var(--text-secondary)]">
              <thead>
                <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                  <th className="px-3 py-2 text-left">Standard</th>
                  <th className="px-3 py-2 text-left">Release Year</th>
                  <th className="px-3 py-2 text-left">Encryption Algorithm</th>
                  <th className="px-3 py-2 text-left">Security Status</th>
                  <th className="px-3 py-2 text-left">Key Vulnerabilities</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)] bg-[var(--bg-elevated)]">
                <tr>
                  <td className="px-3 py-2.5 font-bold">WEP (Wired Equivalent Privacy)</td>
                  <td className="px-3 py-2.5">1997</td>
                  <td className="px-3 py-2.5 font-mono">RC4 (Stream Cipher)</td>
                  <td className="px-3 py-2.5 text-red-400 font-semibold">Obsolete / Insecure</td>
                  <td className="px-3 py-2.5">Weak 24-bit Initialization Vector (IV) reuse allows rapid key decryption within minutes.</td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-bold">WPA (Wi-Fi Protected Access)</td>
                  <td className="px-3 py-2.5">2003</td>
                  <td className="px-3 py-2.5 font-mono">TKIP (RC4 wrapper)</td>
                  <td className="px-3 py-2.5 text-red-400 font-semibold">Deprecated / Insecure</td>
                  <td className="px-3 py-2.5">Michael MIC checksum vulnerability allows packet injection and decryption of select packets.</td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-bold">WPA2 (Wi-Fi Protected Access 2)</td>
                  <td className="px-3 py-2.5">2004</td>
                  <td className="px-3 py-2.5 font-mono">AES-CCMP (Block Cipher)</td>
                  <td className="px-3 py-2.5 text-amber-400 font-semibold">Legacy Standard / Conditional</td>
                  <td className="px-3 py-2.5">Vulnerable to offline 4-way handshake brute-forcing, PMKID harvesting, and KRACK attacks.</td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-bold">WPA3 (Wi-Fi Protected Access 3)</td>
                  <td className="px-3 py-2.5">2018</td>
                  <td className="px-3 py-2.5 font-mono">AES-GCMP / SAE</td>
                  <td className="px-3 py-2.5 text-emerald-400 font-semibold">Current / Highly Secure</td>
                  <td className="px-3 py-2.5">Dragonblood side-channel vulnerabilities (fully mitigated by Hash-to-Element H2E updates).</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ==========================================
            SECTION 2: COMMON WIFI ATTACK VECTORS
            ========================================== */}
        <section className="prose prose-invert max-w-none space-y-4" aria-label="Common WiFi Attack Vectors">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            Section 2 — Common WiFi Attack Vectors
          </h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            Wireless network environments are subject to specialized attack vectors that target different layers of the 
            802.11 protocol suite. Unlike traditional wired threats, wireless exploits take advantage of the open medium 
            and design compromises made for backward compatibility. Understanding how these vulnerabilities operate is 
            essential to deploying effective mitigation strategies.
          </p>

          <div className="space-y-6">
            {/* Attack 1 */}
            <div className="glass-card p-5 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl">
              <h3 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2 mb-2">
                <AlertOctagon size={16} className="text-red-400" />
                KRACK (Key Reinstallation Attack, CVE-2017-13077)
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-2">
                <strong>What It Is:</strong> KRACK is a cryptographic protocol exploit discovered in 2017 that targets 
                the 4-way handshake of the WPA2 standard, allowing an attacker within physical proximity to decrypt 
                wireless traffic.
              </p>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-2">
                <strong>How It Works:</strong> During a normal 4-way handshake, when the client receives message 3 from 
                the access point, it installs the session encryption key (Pairwise Temporal Key) and resets the transmission 
                nonce and replay counter to zero. The attacker intercepts the client&apos;s message 4 before it reaches the AP. 
                Because the AP does not receive message 4, it retransmits message 3. The client receives the retransmitted 
                message 3, reinstalls the exact same session key, and resets its nonce and replay counter. By forcing key 
                reinstallation, the attacker resets cryptographic state parameters, allowing them to decrypt packets, execute 
                replay attacks, and forge TCP payloads.
              </p>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                <strong>Mitigation:</strong> Implement operating system patches on client devices that prevent the 802.11 
                wireless state machine from reinstalling an encryption key that has already been initialized. WPA3 is 
                inherently immune due to its use of the SAE handshake protocol.
              </p>
            </div>

            {/* Attack 2 */}
            <div className="glass-card p-5 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl">
              <h3 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2 mb-2">
                <AlertOctagon size={16} className="text-red-400" />
                Dragonblood (WPA3 SAE Side-Channel Attacks)
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-2">
                <strong>What It Is:</strong> Dragonblood is a collection of design flaws discovered in 2019 that target 
                the timing and cache architecture of early WPA3 Simultaneous Authentication of Equals (SAE) handshakes.
              </p>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-2">
                <strong>How It Works:</strong> WPA3-Personal uses the Dragonfly handshake, which relies on a mathematical 
                routine called &quot;Hunting and Pecking&quot; to derive a secure elliptic curve group element from the pre-shared 
                password. Because the algorithm performs loops that vary in execution time depending on the input password 
                characters and MAC addresses, it leaks timing details. An attacker observing the duration of handshakes, or 
                monitoring CPU cache access patterns on shared hardware, can perform timing analyses to systematically 
                reconstruct the password using offline dictionary-guessing tools.
              </p>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                <strong>Mitigation:</strong> Upgrade router and client firmware to support the updated WPA3 standard which 
                replaces Hunting and Pecking with <strong>Hash-to-Element (H2E)</strong>. H2E maps passwords directly to elliptic 
                curve points using constant-time mathematical formulas, eliminating timing and cache side-channels.
              </p>
            </div>

            {/* Attack 3 */}
            <div className="glass-card p-5 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl">
              <h3 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2 mb-2">
                <AlertOctagon size={16} className="text-red-400" />
                Evil Twin (Rogue AP Phishing)
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-2">
                <strong>What It Is:</strong> An Evil Twin is a rogue access point configured by an attacker to impersonate 
                a legitimate wireless network, tricking client devices into connecting to it.
              </p>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-2">
                <strong>How It Works:</strong> The attacker configures a high-power wireless card to broadcast the identical 
                SSID (and often the identical BSSID/MAC address) as the target network. The attacker then transmits spoofed 
                802.11 deauthentication frames to client devices on the real network. The disconnected clients automatically 
                scan for the configured SSID and connect to the attacker&apos;s stronger rogue signal. Once the client is connected, 
                the attacker acts as a Man-in-the-Middle (MITM) proxy, running packet sniffers, performing DNS spoofing, or 
                displaying fake captive portals to steal credentials.
              </p>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                <strong>Mitigation:</strong> Implement WPA-Enterprise with EAP-TLS, which requires the client device to validate 
                the AP&apos;s digital certificate. For home networks, turn off automated network joining (auto-connect) in client 
                settings and route all traffic through a secure virtual private network (VPN) when using public WiFi.
              </p>
            </div>

            {/* Attack 4 */}
            <div className="glass-card p-5 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl">
              <h3 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2 mb-2">
                <AlertOctagon size={16} className="text-red-400" />
                PMKID Extraction (Clientless WPA2 Cracking)
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-2">
                <strong>What It Is:</strong> PMKID extraction is a modern offline key-cracking attack targeting the 802.11r 
                fast roaming features of WPA2 without requiring a client connection or active handshake capture.
              </p>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-2">
                <strong>How It Works:</strong> Under WPA2-Personal, access points running fast transition protocols include 
                a Pairwise Master Key Identifier (PMKID) in the Robust Security Network Information Element (RSN IE) of their 
                association response frames. The PMKID is computed as an HMAC-SHA1 of the PMK, client MAC address, AP MAC address, 
                and SSID. The attacker sends a single dummy association request to the AP. The AP responds with the PMKID frame. 
                The attacker captures this single response frame, extracts the PMKID hash, and cracks it offline using tools like 
                <code>hashcat</code> (mode 22000) using high-performance GPU arrays.
              </p>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                <strong>Mitigation:</strong> Disable 802.11r (Fast Transition/Fast Roaming) on your router if it is not 
                strictly required. Set a highly complex pre-shared key exceeding 16 characters, or upgrade to WPA3-Personal, 
                which modifies key derivation to prevent offline PMKID exploitation.
              </p>
            </div>

            {/* Attack 5 */}
            <div className="glass-card p-5 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl">
              <h3 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2 mb-2">
                <AlertOctagon size={16} className="text-red-400" />
                Rogue Access Points (Physical LAN Bridging)
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-2">
                <strong>What It Is:</strong> A Rogue Access Point is an unauthorized physical wireless AP plugged directly 
                into an active, trusted Ethernet port within a secure corporate or home network.
              </p>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-2">
                <strong>How It Works:</strong> An employee or malicious insider connects a consumer-grade router or wireless bridge 
                to a physical RJ-45 wall port inside the building. The rogue AP obtains an IP address from the internal DHCP server, 
                effectively bridging the physical LAN to the airwaves. If this rogue device uses weak encryption or remains 
                open, an external attacker sitting in the parking lot can connect to its SSID, bypassing the perimeter firewall, 
                network access control (NAC) policies, and physical security measures.
              </p>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                <strong>Mitigation:</strong> Enforce 802.1X Port Security (MAC Authentication Bypass or Certificate-based auth) 
                on all switchports to shut down links when unauthorized hardware is attached. Regularly scan the airwaves 
                using Wireless Intrusion Prevention Systems (WIPS) to detect unauthorized BSSIDs.
              </p>
            </div>

            {/* Attack 6 */}
            <div className="glass-card p-5 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl">
              <h3 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2 mb-2">
                <AlertOctagon size={16} className="text-red-400" />
                Deauthentication Denial-of-Service Attacks
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-2">
                <strong>What It Is:</strong> A deauthentication attack is a protocol-level denial-of-service exploit that 
                forces wireless clients to instantly disconnect from their access point by spoofing management frames.
              </p>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-2">
                <strong>How It Works:</strong> Under WPA2, 802.11 management frames (including association and deauthentication 
                requests) are transmitted unencrypted and unauthenticated. An attacker within radio range uses monitor-mode 
                software (such as <code>aireplay-ng</code>) to craft a deauthentication packet. The attacker sets the source 
                MAC address to match the target AP and the destination MAC address to match the target client (or broadcasts 
                it to all clients). The client receives the spoofed frame, trusts its authenticity, and immediately terminates 
                its wireless connection, disrupting service or forcing a handshake capture attempt.
              </p>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                <strong>Mitigation:</strong> Enable <strong>802.11w Protected Management Frames (PMF)</strong> on your wireless 
                router. PMF encrypts and signs management frames, preventing client devices from accepting spoofed deauthentication 
                requests. PMF is optional in WPA2 but mandatory in WPA3.
              </p>
            </div>
          </div>
        </section>

        {/* ==========================================
            SECTION 3: WPA2 VS WPA3
            ========================================== */}
        <section className="prose prose-invert max-w-none space-y-4" aria-label="WPA2 vs WPA3: Which Should You Use">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            Section 3 — WPA2 vs WPA3: Which Should You Use
          </h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            The transition from WPA2 to WPA3 represents the most significant architectural advancement in wireless security 
            in over a decade. While WPA2 (introduced in 2004) has served as the industry workhorse, its fundamental reliance 
            on the Pre-Shared Key (PSK) handshake model makes it vulnerable to modern automated attacks. The WPA3 standard 
            (released in 2018) redesigns key establishment, encryption, and frame authentication from the ground up to address 
            these structural weaknesses.
          </p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            The primary security risk of WPA2-Personal lies in its 4-way cryptographic handshake. An attacker can use 
            monitor mode to capture the four EAPOL messages transmitted when a client connects to the network. Once captured, 
            the attacker can attempt to crack the password completely offline on local GPU arrays, generating billions of 
            hashes per second without sending a single packet to the target network. WPA3 eliminates this vector by replacing 
            the PSK handshake with **Simultaneous Authentication of Equals (SAE)**, which is based on the Dragonfly key exchange. 
            SAE uses zero-knowledge proofs to establish keys, ensuring that even if an attacker captures the handshake, they 
            cannot extract the password via offline brute-force methods.
          </p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            Additionally, WPA3 enforces <strong>Forward Secrecy</strong>. In a WPA2 network, if an adversary captures and archives 
            encrypted wireless traffic and subsequently obtains the pre-shared key (either via social engineering, brute-forcing, 
            or physical compromise), they can decrypt all historical captured traffic. In WPA3, every authentication session 
            generates a completely unique master key that is independent of the network password. Even if the password is 
            subsequently compromised, past encrypted sessions remain secure. For a granular analysis of these cryptographic 
            differences, read our detailed comparison in our dedicated{" "}
            <Link href="/wpa3-vs-wpa2" className="text-[var(--brand-400)] hover:underline font-semibold">
              WPA3 vs WPA2 Protocol Comparison
            </Link>.
          </p>

          <div className="overflow-x-auto my-6">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-[11px] text-[var(--text-secondary)]">
              <thead>
                <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                  <th className="px-3 py-2 text-left">Feature</th>
                  <th className="px-3 py-2 text-left">WPA2-Personal (PSK)</th>
                  <th className="px-3 py-2 text-left">WPA3-Personal (SAE)</th>
                  <th className="px-3 py-2 text-left">Key Security Advantage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)] bg-[var(--bg-elevated)]">
                <tr>
                  <td className="px-3 py-2.5 font-bold">Handshake Protocol</td>
                  <td className="px-3 py-2.5">4-Way Handshake (EAPOL-based)</td>
                  <td className="px-3 py-2.5">SAE (Simultaneous Authentication of Equals)</td>
                  <td className="px-3 py-2.5">SAE is mathematically immune to offline dictionary attack vectors.</td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-bold">Forward Secrecy</td>
                  <td className="px-3 py-2.5">No (Network key decrypts past traffic)</td>
                  <td className="px-3 py-2.5">Yes (Unique session keys generated)</td>
                  <td className="px-3 py-2.5">Compromising the password does not allow decryption of historical data.</td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-bold">Brute-Force Protection</td>
                  <td className="px-3 py-2.5">None (Offline cracking limited only by GPU speed)</td>
                  <td className="px-3 py-2.5">Active (Rate-limits password guessing at protocol level)</td>
                  <td className="px-3 py-2.5">Thwarts automated dictionary utilities by requiring active interaction.</td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-bold">Protected Management Frames (PMF)</td>
                  <td className="px-3 py-2.5">Optional (Rarely supported or enabled)</td>
                  <td className="px-3 py-2.5">Mandatory (Required for association)</td>
                  <td className="px-3 py-2.5">Encrypts management packets, neutralizing deauthentication tools.</td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-bold">Encryption Protocol</td>
                  <td className="px-3 py-2.5">AES-CCMP (128-bit)</td>
                  <td className="px-3 py-2.5">AES-GCMP (128-bit or 256-bit)</td>
                  <td className="px-3 py-2.5">GCMP is faster and computationally stronger than CCMP.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ==========================================
            SECTION 4: GUEST NETWORK ISOLATION
            ========================================== */}
        <section className="prose prose-invert max-w-none space-y-4" aria-label="Guest Network Isolation">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            Section 4 — Guest Network Isolation
          </h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            In modern network design, flat networks (where all devices connect to the same subnet and share the same 
            broadcast domain) represent a significant security vulnerability. If a visitor&apos;s infected laptop or a 
            cheap smart home plug connects to your primary wireless network, it has direct access to the entire Local Area 
            Network. The compromised device can scan active ports, access unencrypted SMB file shares, intercept local mDNS 
            broadcasts, and perform ARP spoofing to execute MITM attacks on your personal devices.
          </p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            Implementing guest network isolation is the primary defense against lateral movement. When you enable guest 
            isolation (often called Client Isolation or AP Isolation) on your router, the wireless access point prevents 
            wireless clients connected to the guest SSID from communicating with one another. Each client is isolated 
            within its own virtual port, blocking local traffic forwarding. A guest device can send packets to the 
            default gateway to access the internet, but it cannot communicate with or even discover other nodes on the subnet.
          </p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            Behind the scenes, guest networks are built on Virtual Local Area Networks (VLANs). The router establishes 
            a separate VLAN (e.g., VLAN 10 for LAN, VLAN 20 for Guest) and binds it to the guest SSID. Firewall rules 
            within the router&apos;s state engine permit routing from the guest VLAN out through the WAN port to the public 
            internet, but explicitly drop any packets trying to cross from the guest VLAN into the primary LAN VLAN. To learn 
            how to configure this securely on different router models, see our complete{" "}
            <Link href="/guest-wifi-setup" className="text-[var(--brand-400)] hover:underline font-semibold">
              Guest WiFi Setup Guide
            </Link>.
          </p>
        </section>

        {/* ==========================================
            SECTION 5: DEVICE MANAGEMENT & ACCESS CONTROL
            ========================================== */}
        <section className="prose prose-invert max-w-none space-y-4" aria-label="Device Management & Access Control">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            Section 5 — Device Management & Access Control
          </h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            Securing the wireless entry point is useless if you do not actively monitor the devices connected to your network. 
            Auditing connected devices allows you to build a baseline of trusted MAC addresses. A MAC (Media Access Control) 
            address is a unique 48-bit identifier burned into a device&apos;s Network Interface Card (NIC) at the factory. 
            By reviewing the router&apos;s DHCP client lease list, you can match these MAC addresses to their respective IP addresses 
            and hostnames to identify unknown network participants.
          </p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            However, modern operating systems like iOS, Android, and Windows now employ MAC address randomization by default. 
            When a device connects to a network, it generates a random MAC address to prevent tracking across public networks. 
            While this protects user privacy outdoors, it complicates local audits, making the same device appear as a brand-new, 
            unidentified client in your router logs. To mitigate this, configure your household devices to disable private/randomized 
            MAC addresses in their connection settings for your home SSID, allowing for stable client mapping.
          </p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            For step-by-step auditing, you can read our guide on{" "}
            <Link href="/how-to-see-who-is-on-my-wifi" className="text-[var(--brand-400)] hover:underline font-semibold">
              How to See Who Is on My WiFi
            </Link>{" "}
            to systematically track down rogue connections. If you discover an unauthorized device, MAC address filtering 
            can block its access, but it is not a foolproof security boundary because MAC addresses can be easily spoofed using 
            command-line tools like <code>macchanger</code>. The ultimate mitigation is to block the client at the protocol level 
            by changing your WiFi password or disabling the physical port. For detailed blocking instructions, visit our guide on{" "}
            <Link href="/block-device-on-router" className="text-[var(--brand-400)] hover:underline font-semibold">
              How to Block Devices on a Router
            </Link>.
          </p>
        </section>

        {/* ==========================================
            SECTION 6: ROUTER SECURITY HARDENING CHECKLIST
            ========================================== */}
        <section className="prose prose-invert max-w-none space-y-4" aria-label="Router Security Hardening Checklist">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            Section 6 — Router Security Hardening Checklist
          </h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            To ensure your home or office router is protected against external network attacks and local wireless compromises, 
            apply the following comprehensive hardening checklist. These settings disable legacy services and close common 
            vulnerability vectors.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            {/* Action 1 */}
            <div className="glass-card p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-1">
              <div className="flex items-center gap-2 font-bold text-xs text-[var(--text-primary)]">
                <CheckSquare size={14} className="text-[var(--brand-400)]" />
                1. Change Default Admin Credentials
              </div>
              <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                Replace factory-default admin usernames and passwords with unique credentials. Use a password manager to store 
                them. For assistance, consult our guide on changing your{" "}
                <Link href="/router-password" className="text-[var(--brand-400)] hover:underline">
                  Router Admin Password
                </Link>.
              </p>
            </div>

            {/* Action 2 */}
            <div className="glass-card p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-1">
              <div className="flex items-center gap-2 font-bold text-xs text-[var(--text-primary)]">
                <CheckSquare size={14} className="text-[var(--brand-400)]" />
                2. Disable WPS (Wi-Fi Protected Setup)
              </div>
              <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                Turn off WPS entirely in your wireless console. The PIN exchange protocol is highly vulnerable to automated 
                brute-force attacks (such as Reaver) and online key extraction techniques.
              </p>
            </div>

            {/* Action 3 */}
            <div className="glass-card p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-1">
              <div className="flex items-center gap-2 font-bold text-xs text-[var(--text-primary)]">
                <CheckSquare size={14} className="text-[var(--brand-400)]" />
                3. Disable WAN Remote Management
              </div>
              <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                Block administrative web interface access from the public internet. Ensure that access to the router setup is 
                restricted to local devices on the internal LAN network. Visit{" "}
                <Link href="/router-settings" className="text-[var(--brand-400)] hover:underline">
                  Router Settings
                </Link>{" "}
                to check your configuration.
              </p>
            </div>

            {/* Action 4 */}
            <div className="glass-card p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-1">
              <div className="flex items-center gap-2 font-bold text-xs text-[var(--text-primary)]">
                <CheckSquare size={14} className="text-[var(--brand-400)]" />
                4. Enable the SPI Firewall
              </div>
              <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                Turn on the Stateful Packet Inspection (SPI) firewall for both IPv4 and IPv6 traffic. This blocks uninvited 
                incoming WAN connection probes while maintaining internal state traffic.
              </p>
            </div>

            {/* Action 5 */}
            <div className="glass-card p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-1">
              <div className="flex items-center gap-2 font-bold text-xs text-[var(--text-primary)]">
                <CheckSquare size={14} className="text-[var(--brand-400)]" />
                5. Update Firmware Regularly
              </div>
              <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                Enable automatic updates or manually flash the latest security patch from the manufacturer&apos;s site monthly. 
                This patches critical memory leaks and security holes before they can be exploited.
              </p>
            </div>

            {/* Action 6 */}
            <div className="glass-card p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-1">
              <div className="flex items-center gap-2 font-bold text-xs text-[var(--text-primary)]">
                <CheckSquare size={14} className="text-[var(--brand-400)]" />
                6. Enforce WPA3-Personal Encryption
              </div>
              <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                Configure encryption to WPA3-Personal or WPA2-AES (CCMP). Disable legacy WEP and WPA-TKIP protocols. If you 
                are changing this for the first time, check out how to{" "}
                <Link href="/change-wifi-password" className="text-[var(--brand-400)] hover:underline">
                  Change WiFi Password
                </Link>.
              </p>
            </div>

            {/* Action 7 */}
            <div className="glass-card p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-1">
              <div className="flex items-center gap-2 font-bold text-xs text-[var(--text-primary)]">
                <CheckSquare size={14} className="text-[var(--brand-400)]" />
                7. Disable UPnP (Universal Plug and Play)
              </div>
              <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                Disable UPnP. This stops malware or unhardened IoT endpoints from dynamically requesting inbound port 
                forwarding mappings on the router firewall, exposing local ports to the internet.
              </p>
            </div>

            {/* Action 8 */}
            <div className="glass-card p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-1">
              <div className="flex items-center gap-2 font-bold text-xs text-[var(--text-primary)]">
                <CheckSquare size={14} className="text-[var(--brand-400)]" />
                8. Set up an Isolated Guest Network
              </div>
              <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                Create a distinct Guest network with client isolation activated. Keep this network isolated from the main 
                intranet, ensuring all external devices and IoT hardware are placed here.
              </p>
            </div>

            {/* Action 9 */}
            <div className="glass-card p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-1">
              <div className="flex items-center gap-2 font-bold text-xs text-[var(--text-primary)]">
                <CheckSquare size={14} className="text-[var(--brand-400)]" />
                9. Configure Custom unique SSID
              </div>
              <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                Do not use default SSIDs like &quot;Netgear&quot; or &quot;Linksys&quot;. A custom name prevents attackers from using 
                pre-computed WPA2 handshake decryption lookup tables (rainbow tables) based on generic SSIDs.
              </p>
            </div>

            {/* Action 10 */}
            <div className="glass-card p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-1">
              <div className="flex items-center gap-2 font-bold text-xs text-[var(--text-primary)]">
                <CheckSquare size={14} className="text-[var(--brand-400)]" />
                10. Implement Secure DNS
              </div>
              <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                Configure your router to route queries through secure DNS providers using DNS-over-HTTPS (DoH). This prevents 
                DNS hijacking and snooping. Read more on our dedicated{" "}
                <Link href="/dns" className="text-[var(--brand-400)] hover:underline">
                  DNS Guide
                </Link>.
              </p>
            </div>

            {/* Action 11 */}
            <div className="glass-card p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-1">
              <div className="flex items-center gap-2 font-bold text-xs text-[var(--text-primary)]">
                <CheckSquare size={14} className="text-[var(--brand-400)]" />
                11. Enable logging and Syslog
              </div>
              <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                Turn on administrative auditing and configure the router to push security event notifications to a local 
                Syslog server. This allows you to track connection failures and administrative login attempts.
              </p>
            </div>

            {/* Action 12 */}
            <div className="glass-card p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-1">
              <div className="flex items-center gap-2 font-bold text-xs text-[var(--text-primary)]">
                <CheckSquare size={14} className="text-[var(--brand-400)]" />
                12. Disable Telnet and SSH Protocols
              </div>
              <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                Ensure command-line administration protocols (Telnet and SSH) are turned off in the router interface if 
                you do not use them, eliminating brute-force entry routes.
              </p>
            </div>

            {/* Action 13 */}
            <div className="glass-card p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-1 md:col-span-2">
              <div className="flex items-center gap-2 font-bold text-xs text-[var(--text-primary)]">
                <CheckSquare size={14} className="text-[var(--brand-400)]" />
                13. Change the Default LAN IP Subnet Range
              </div>
              <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                Modify your router&apos;s LAN gateway IP from standard subnets (e.g., <code>192.168.1.1</code> or <code>192.168.0.1</code>) 
                to a non-standard subnet range (e.g., <code>172.16.88.1</code> or <code>10.45.20.1</code>). This thwarts basic CSRF (Cross-Site Request Forgery) 
                attacks targeting standard gateway paths and complicates automated vulnerability scans from unauthorized endpoints.
              </p>
            </div>
          </div>
        </section>

        {/* ==========================================
            SECTION 7: SMART HOME DEVICE SECURITY
            ========================================== */}
        <section className="prose prose-invert max-w-none space-y-4" aria-label="Smart Home Device Security">
          <div className="flex items-center gap-2 text-[var(--brand-400)] font-semibold text-xs uppercase tracking-wider mb-2">
            <Cpu size={14} /> Internet of Things (IoT) Hardening
          </div>
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            Section 7 — Smart Home Device Security
          </h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            The proliferation of smart home devices — including IP cameras, smart TVs, voice assistants, smart plugs, 
            and appliance sensors — introduces significant risks to the modern home network. These Internet of Things 
            (IoT) devices are designed primarily for cost efficiency and ease of use, with firmware security treated 
            as an afterthought. Many IoT products utilize stripped-down legacy Linux kernels containing unpatched vulnerabilities, 
            broadcast network discovery details via plaintext protocols, and rely on hardcoded manufacturer passwords 
            accessible via hidden telnet interfaces.
          </p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            Because smart devices represent vulnerable entry points, they are a primary target for automated malware 
            and botnets (such as the Mirai botnet). Once an attacker exploits a single smart plug or camera, they use that 
            device as a pivot point. The compromised device scan the rest of the internal network to locate and exploit 
            main workstations, storage systems, or personal computers. This makes network segmentation a critical requirement 
            for smart home architectures.
          </p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            To secure a smart home:
          </p>
          <div className="border-l-4 border-[var(--brand-500)] pl-4 py-2 space-y-2 text-xs text-[var(--text-secondary)] bg-[var(--bg-elevated)] rounded-r-xl">
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>VLAN Segmentation:</strong> Move all IoT clients to your isolated Guest WiFi network or configure a 
                dedicated IoT VLAN that cannot communicate with your primary data subnet.
              </li>
              <li>
                <strong>Change Default Credentials:</strong> Inspect the management application for every smart device and 
                update any default administrative passwords immediately.
              </li>
              <li>
                <strong>Audit WAN Access:</strong> Restrict devices from communicating with the cloud unless strictly necessary. 
                Use a local smart home manager (such as Home Assistant) to control devices locally without external cloud dependencies.
              </li>
              <li>
                <strong>Firmware Updates:</strong> Enable auto-update features in smart home applications and isolate devices that 
                have reached end-of-support (EOL) from the internet.
              </li>
            </ul>
          </div>
        </section>

        {/* ==========================================
            SECTION 8: ENTERPRISE VS HOME WIFI SECURITY
            ========================================== */}
        <section className="prose prose-invert max-w-none space-y-4" aria-label="Enterprise vs Home WiFi Security">
          <div className="flex items-center gap-2 text-[var(--brand-400)] font-semibold text-xs uppercase tracking-wider mb-2">
            <Server size={14} /> Corporate vs Consumer Network Protections
          </div>
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            Section 8 — Enterprise vs Home WiFi Security
          </h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            While home networks typically operate on the Pre-Shared Key (WPA-Personal) model, enterprise deployments 
            require granular access controls, auditable trails, and centralized management. Under a WPA-Personal 
            configuration, every device uses the same pre-shared password to authenticate. If an employee leaves 
            the organization or a laptop is stolen, the entire network password must be changed and updated across 
            every client device to maintain security. This key management model does not scale in corporate settings.
          </p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            WPA-Enterprise addresses this by integrating <strong>802.1X Network Access Control</strong>. Instead of 
            connecting using a shared password, clients authenticate individually via a central server running the 
            <strong>RADIUS (Remote Authentication Dial-In User Service)</strong> protocol. When a client associates with 
            an enterprise access point (the authenticator), the AP blocks local network traffic and forwards the client&apos;s 
            credentials (the supplicant) to the RADIUS server (the authentication server). The RADIUS server validates the 
            credentials against a central directory (such as Active Directory or LDAP) and, upon authorization, provides the 
            AP with a dynamic key (PMK) to encrypt that specific client&apos;s session.
          </p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            Enterprise networks support several Extensible Authentication Protocol (EAP) methods to manage credentials securely:
          </p>
          <div className="border-l-4 border-[var(--brand-500)] pl-4 py-2 space-y-2 text-xs text-[var(--text-secondary)] bg-[var(--bg-elevated)] rounded-r-xl">
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>EAP-TLS:</strong> The most secure method, requiring both the server and the client device to validate 
                each other using digital certificates. This eliminates password-based brute-force vectors entirely.
              </li>
              <li>
                <strong>EAP-PEAP (Protected EAP):</strong> Establishes an encrypted TLS tunnel between client and server, 
                protecting user credentials (usernames and passwords) as they traverse the wireless interface.
              </li>
              <li>
                <strong>EAP-TTLS (Tunneled TLS):</strong> Similar to PEAP, creating a secure tunnel to authenticate clients 
                using standard login systems or security tokens, reducing certificate management complexity on the client side.
              </li>
            </ul>
          </div>

          <div className="overflow-x-auto my-6">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-[11px] text-[var(--text-secondary)]">
              <thead>
                <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                  <th className="px-3 py-2 text-left">Feature</th>
                  <th className="px-3 py-2 text-left">WPA-Personal (PSK)</th>
                  <th className="px-3 py-2 text-left">WPA-Enterprise (802.1X)</th>
                  <th className="px-3 py-2 text-left">Best Use Case</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)] bg-[var(--bg-elevated)]">
                <tr>
                  <td className="px-3 py-2.5 font-bold">Authentication Key</td>
                  <td className="px-3 py-2.5">Single static pre-shared password shared by all clients.</td>
                  <td className="px-3 py-2.5">Dynamic session-specific keys mapped to individual users.</td>
                  <td className="px-3 py-2.5">Enterprise prevents credential leaks if one client is compromised.</td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-bold">Authentication Backend</td>
                  <td className="px-3 py-2.5">None (Local validation on the AP).</td>
                  <td className="px-3 py-2.5">Centralized RADIUS server (e.g., FreeRADIUS, Cisco ISE).</td>
                  <td className="px-3 py-2.5">Allows central logging, auditing, and revocation of clients.</td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-bold">Revocation Complexity</td>
                  <td className="px-3 py-2.5">High (Must change password on every network client).</td>
                  <td className="px-3 py-2.5">Low (Disable the individual user account in directory).</td>
                  <td className="px-3 py-2.5">Revokes access instantly for terminated employees or lost laptops.</td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-bold">Deployment Target</td>
                  <td className="px-3 py-2.5">Small office / home environments (SOHO).</td>
                  <td className="px-3 py-2.5">Large campuses, universities, corporate infrastructure.</td>
                  <td className="px-3 py-2.5">Ensures regulatory compliance and enforces access policies.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ==========================================
            INTERNAL LINKING & RELATED GUIDES
            ========================================== */}
        <div className="mb-10 p-5 glass-card border border-[var(--border-subtle)] rounded-2xl">
          <h2 className="text-base font-bold text-[var(--text-primary)] mb-4 flex items-center gap-1.5">
            <Link2 size={16} className="text-[var(--brand-400)]" /> Related Guides &amp; Network Optimizations
          </h2>
          <div className="flex flex-wrap gap-2.5">
            {[
              { label: "WPA3 vs WPA2 Comparison", href: "/wpa3-vs-wpa2" },
              { label: "Guest WiFi Setup Guide", href: "/guest-wifi-setup" },
              { label: "Block Devices on Router", href: "/block-device-on-router" },
              { label: "See Who Is On My WiFi", href: "/how-to-see-who-is-on-my-wifi" },
              { label: "Router Setup & Login Guide", href: "/router-login" },
              { label: "Router Settings Hardening", href: "/router-settings" },
              { label: "How to Change WiFi Password", href: "/change-wifi-password" },
              { label: "Secure DNS Configurations", href: "/dns" }
            ].map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="text-xs text-[var(--text-secondary)] hover:text-[var(--brand-400)] px-3 py-2 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-lg hover:border-[var(--brand-800)] transition-all font-semibold"
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
