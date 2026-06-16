import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import TroubleshootingArticleShell from "@/components/tools/TroubleshootingArticleShell";
import { JsonLd } from "@/lib/seo/schema";
import { APP_URL } from "@/lib/constants";
import Link from "next/link";
import {
  Link2,
  ShieldAlert,
  History,
  Lock,
  Unlock,
  Cpu,
  Layers,
  HelpCircle,
  CheckCircle2,
  ListChecks,
  Info,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "WPA3 vs WPA2: Key Differences, Security & Which to Use (2026)",
  description:
    "WPA3 vs WPA2 explained in depth. Compare SAE vs 4-Way Handshake, forward secrecy, brute-force protection, compatibility, and get a step-by-step migration guide.",
  canonical: "/wpa3-vs-wpa2",
  keywords: [
    "wpa3 vs wpa2",
    "wpa3 vs wpa2 security",
    "wpa3 better than wpa2",
    "should i use wpa3",
    "wpa3 security",
    "wpa2 vulnerabilities",
    "sae authentication",
    "wifi encryption comparison",
    "wireless security protocols",
    "wpa3 compatibility",
  ],
});

const breadcrumbs = [
  { name: "WiFi Security", url: "/wifi-security" },
  { name: "WPA3 vs WPA2", url: "/wpa3-vs-wpa2" },
];

const troubleshootingSteps = [
  {
    title: "Access the Router Admin Panel",
    description:
      "Connect your client device to your router via Ethernet or Wi-Fi. Open your preferred web browser and enter the default gateway IP address (such as 192.168.1.1 or 192.168.0.1) into the URL search bar. Log in using your admin credentials.",
    tip: "If you don't know your router IP, look for the 'Default Gateway' in your network connection status or run the 'ipconfig' command in Windows.",
  },
  {
    title: "Navigate to Wireless Security Settings",
    description:
      "Once inside the administration console, navigate to the Wireless settings tab. This is often labeled as 'Wireless Settings', 'WLAN', 'WiFi Setup', or found under 'Advanced Settings' -> 'Wireless'.",
    tip: "On dual-band or tri-band routers, make sure you configure security protocols for all broadcast bands (2.4 GHz, 5 GHz, and 6 GHz).",
  },
  {
    title: "Enable WPA2/WPA3 Mixed or WPA3-Personal Mode",
    description:
      "Locate the 'Security Mode' or 'Network Authentication' dropdown menu. If you have legacy smart home or IoT devices, select 'WPA2/WPA3-Personal' (Transition Mode) to allow backward compatibility. If your devices are modern, choose 'WPA3-Personal' (SAE) for maximum security.",
    tip: "Avoid selecting enterprise modes unless you have a dedicated RADIUS server set up on your network.",
  },
  {
    title: "Configure Protected Management Frames (PMF)",
    description:
      "Ensure that Protected Management Frames are set to 'Capable' or 'Required'. PMF is a mandatory component of WPA3 that encrypts management traffic, shielding clients from deauthentication attacks. Transition mode usually sets PMF to 'Capable' automatically.",
    tip: "If you configure WPA3-Only, PMF must be set to 'Required'.",
  },
  {
    title: "Verify Connection Stability and Troubleshoot",
    description:
      "Save changes and reboot the router. On your client devices, forget the existing Wi-Fi profile and reconnect using the same password. If an older IoT device fails to reconnect, you may need to set up a dedicated WPA2-only guest network for those devices.",
    tip: "If client devices complain about incorrect passwords or fail to acquire IP addresses, verify that their operating systems and wireless drivers are fully updated.",
  },
];

const faqs = [
  {
    question: "Is WPA3 significantly more secure than WPA2?",
    answer:
      "Yes, WPA3 provides massive security improvements over WPA2. The most critical change is the replacement of WPA2's 4-Way Handshake with Simultaneous Authentication of Equals (SAE). This protocol prevents offline brute-force and dictionary attacks, meaning attackers cannot capture a handshake and crack it offline on a GPU cluster. WPA3 also introduces Perfect Forward Secrecy, ensuring past captured traffic remains secure even if the password is leaked later, and mandates Protected Management Frames (PMF) to block common deauthentication attacks.",
  },
  {
    question: "Can WPA3 routers work with WPA2 devices?",
    answer:
      "Yes, they can, provided you enable WPA2/WPA3 Transition Mode (often called Mixed Mode) on the router. In this mode, the router broadcasts an SSID that accepts connections from both newer WPA3-capable devices (using SAE) and older WPA2 devices (using the standard 4-way handshake). This allows a smooth transition without rendering legacy devices obsolete.",
  },
  {
    question: "What is SAE in WPA3?",
    answer:
      "SAE stands for Simultaneous Authentication of Equals. It is a secure key exchange protocol based on the Dragonfly handshake. Unlike WPA2-PSK, which uses a static key exchange vulnerable to interception and offline cracking, SAE performs a zero-knowledge proof. Both client and router prove knowledge of the passphrase without transmitting it or a simple hash of it over the air. This eliminates offline dictionary attacks entirely.",
  },
  {
    question: "Does WPA3 improve WiFi speed?",
    answer:
      "WPA3 does not directly increase raw Wi-Fi throughput or connection speeds, as speed is determined by physical layer standards (like Wi-Fi 6, 6E, or 7), channel width, and signal quality. However, WPA3 does improve network efficiency by reducing the vulnerability to deauthentication attacks, which can drop client connections and trigger slow reconnect sequences. By preventing unauthorized clients from leaching bandwidth via brute-force attacks, it helps maintain peak network performance.",
  },
  {
    question: "What is the KRACK attack and does WPA3 fix it?",
    answer:
      "The Key Reinstallation Attack (KRACK) is a serious vulnerability in WPA2's 4-Way Handshake discovered in 2017. It allows attackers in radio range to manipulate the handshake messages to reset the encryption key's replay counter. This allows the attacker to replay packets, decrypt sensitive data, or inject malicious payloads. WPA3 completely eliminates KRACK by design by replacing the 4-way handshake with SAE, which does not allow key reinstallation or replay attacks.",
  },
  {
    question: "Should I use WPA3-Personal or WPA3-Enterprise?",
    answer:
      "WPA3-Personal is designed for home networks and small offices where a single shared passphrase is used for all clients. WPA3-Enterprise is designed for corporate networks, requiring individual credentials (username and password or security certificates) authenticated via a central RADIUS server. WPA3-Enterprise also includes a high-security 192-bit mode (using CNSA standards) for government and financial institutions. Choose WPA3-Personal for home use.",
  },
  {
    question: "What happens if I enable WPA3 and my device doesn't support it?",
    answer:
      "If you configure your router to 'WPA3-Only' mode and a client device does not support WPA3, it will not be able to see the Wi-Fi network or will fail to connect with an 'authentication error' or 'invalid password' warning. If you have unsupported devices, you must use WPA2/WPA3 Transition Mode, or set up a secondary WPA2-only guest network specifically for legacy devices.",
  },
  {
    question: "Is WPA2 still safe to use in 2026?",
    answer:
      "WPA2 remains relatively safe for everyday use if you configure it with a highly complex, random passphrase (at least 16-20 characters long) to resist offline dictionary attacks and keep your router firmware updated to patch KRACK vulnerabilities. However, because WPA2 lacks native forward secrecy and is vulnerable to offline cracking, it is no longer considered state-of-the-art. Upgrading to WPA3 is highly recommended for modern security.",
  },
  {
    question: "What is PMF (Protected Management Frames) and why is it mandatory in WPA3?",
    answer:
      "Protected Management Frames (PMF), standardized under 802.11w, encrypt management frames such as deauthentication, disassociation, and beacon frames. Under WPA2, these frames were unencrypted, allowing attackers to easily spoof deauthentication frames to disconnect users (often done to capture handshakes). In WPA3, PMF is mandatory, protecting clients from unauthorized disconnections and improving network stability.",
  },
  {
    question: "What is OWE (Opportunistic Wireless Encryption) in WPA3?",
    answer:
      "OWE (often branded as Wi-Fi Certified Enhanced Open) is a WPA3-adjacent standard that provides encryption on open public networks (like coffee shops) without requiring a password. It uses a Diffie-Hellman key exchange to encrypt the link between each client and the access point, preventing local passive eavesdropping and packet sniffing which is common on standard WPA2 open hotspots.",
  },
  {
    question: "How does WPA3 prevent offline brute-force attacks?",
    answer:
      "In WPA2, an attacker can capture the 4-way handshake or a PMKID and run a local brute-force dictionary attack on their own hardware, testing billions of passwords per second. WPA3-SAE prevents this by requiring an active network exchange for every single password guess. If an attacker wants to test a password, they must send a frame to the router and wait for a response. The router can rate-limit or block the MAC address after a few failed attempts, rendering brute-force attacks useless.",
  },
  {
    question: "Can a firmware update add WPA3 support to my older WPA2 router?",
    answer:
      "In some cases, yes. Some manufacturers released firmware updates adding WPA3 capability to high-end WPA2 routers. However, because WPA3 requires more processing power to handle the Dragonfly key exchange and mandates PMF, many older or budget-friendly routers do not have the hardware capability to support it, meaning you must purchase a newer router to get WPA3 support.",
  },
];

const commonCauses = [
  {
    title: "Legacy Device Compatibility",
    desc: "Many older smart plugs, cameras, printers, and legacy gaming consoles do not support WPA3 or the mandatory Protected Management Frames (PMF) standard, making them disconnect from modern networks.",
  },
  {
    title: "ISP-Supplied Router Limitations",
    desc: "Many users lease older modems or gateway units from their ISPs that do not receive firmware upgrades enabling WPA3, or have settings locked down preventing configuration changes.",
  },
  {
    title: "Lack of Security Awareness",
    desc: "A vast majority of residential and small business network administrators are unaware of the vulnerabilities in WPA2's 4-way handshake and do not know their router has a WPA3 setting available.",
  },
  {
    title: "Outdated Router Firmware",
    desc: "Even if the router hardware is capable of supporting WPA3, the router has never received a firmware update since its purchase, leaving it running on older WPA2-only code bases.",
  },
];

const quickFixChecklist = [
  "Verify if your router model supports WPA3-Personal or Mixed/Transition Mode.",
  "Check and install the latest firmware updates available for your router.",
  "Locate the wireless security options under the WLAN/WiFi settings in your admin panel.",
  "Select 'WPA2/WPA3-Personal Transition Mode' for optimal backward compatibility.",
  "Ensure Protected Management Frames (PMF) are enabled or set to capable.",
  "Update network cards and wireless drivers on all connecting computers and laptops.",
  "Forget the old Wi-Fi profiles on your client devices before reconnecting.",
  "Establish a separate guest network for legacy smart home (IoT) devices that fail WPA3 negotiation.",
];

// Plain JSON-LD schemas
const collectionPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${APP_URL}/wpa3-vs-wpa2#collection`,
  "url": `${APP_URL}/wpa3-vs-wpa2`,
  "name": "WPA3 vs WPA2: Key Differences, Security & Which to Use (2026)",
  "description":
    "An in-depth security comparison of WPA3 and WPA2 wireless protocols, covering SAE, 4-way handshakes, forward secrecy, vulnerabilities, and migration guides.",
  "about": [
    { "@type": "Thing", "name": "WiFi Security" },
    { "@type": "Thing", "name": "WPA3" },
    { "@type": "Thing", "name": "WPA2" },
    { "@type": "Thing", "name": "Wireless Security Protocols" },
  ],
};

const techArticleSchema = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "@id": `${APP_URL}/wpa3-vs-wpa2#article`,
  "url": `${APP_URL}/wpa3-vs-wpa2`,
  "headline": "WPA3 vs WPA2: Full Security Comparison & Migration Guide (2026)",
  "description":
    "WPA3 vs WPA2 explained in depth. Compare SAE vs 4-Way Handshake, forward secrecy, brute-force protection, compatibility, and get a step-by-step migration guide.",
  "inLanguage": "en-US",
  "mainEntityOfPage": `${APP_URL}/wpa3-vs-wpa2`,
  "datePublished": "2026-01-15T08:00:00+00:00",
  "dateModified": "2026-06-16T19:38:41+01:00",
  "author": {
    "@type": "Organization",
    "name": "RouterVia",
    "url": APP_URL,
  },
  "publisher": {
    "@type": "Organization",
    "name": "RouterVia",
    "logo": {
      "@type": "ImageObject",
      "url": `${APP_URL}/images/logo.png`,
    },
  },
  "about": [
    { "@type": "Thing", "name": "WPA3" },
    { "@type": "Thing", "name": "WPA2" },
    { "@type": "Thing", "name": "Simultaneous Authentication of Equals" },
    { "@type": "Thing", "name": "4-Way Handshake" },
  ],
};

const faqPageSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${APP_URL}/wpa3-vs-wpa2#faq`,
  "mainEntity": faqs.map((faq) => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer,
    },
  })),
};

export default function Wpa3VsWpa2Page() {
  return (
    <TroubleshootingArticleShell
      h1="WPA3 vs WPA2: Full Security Comparison & Migration Guide (2026)"
      intro="WPA2 has secured home and enterprise networks since 2004, but its 4-Way Handshake mechanism has well-documented vulnerabilities that can be exploited offline. WPA3, ratified by the Wi-Fi Alliance in 2018, replaces this with Simultaneous Authentication of Equals (SAE) — eliminating offline brute-force attacks and adding forward secrecy. This guide breaks down every technical difference and tells you exactly when and how to switch."
      category="wifi"
      breadcrumbs={breadcrumbs}
      faqs={faqs}
      troubleshootingSteps={troubleshootingSteps}
      warningBanner={{
        title: "WPA2 Vulnerability: KRACK Attack",
        text: "The Key Reinstallation Attack (KRACK) disclosed in 2017 demonstrates that WPA2's 4-Way Handshake can be manipulated to reinstall already-used cryptographic keys, allowing traffic decryption. While patches exist, WPA3 eliminates this vulnerability by design through SAE.",
      }}
      quickFixChecklist={quickFixChecklist}
      commonCauses={commonCauses}
      severityLevel="medium"
    >
      <JsonLd data={collectionPageSchema} />
      <JsonLd data={techArticleSchema} />
      <JsonLd data={faqPageSchema} />

      <div className="space-y-10">
        {/* ==========================================
            AI OVERVIEW SUMMARY
            ========================================== */}
        <section
          className="glass-card p-6 border border-emerald-950/30 bg-emerald-950/5 rounded-2xl relative overflow-hidden"
          aria-label="Quick Answer Summary"
        >
          <div className="absolute top-0 right-0 bg-emerald-500/10 text-emerald-400 text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-bl-lg font-bold">
            AI Overview Summary
          </div>
          <h2 className="text-xs font-bold text-emerald-400 mb-3 uppercase tracking-wide flex items-center gap-1.5">
            <ShieldCheck size={12} /> WPA3 vs WPA2 Security At-a-Glance
          </h2>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
            If you are looking for a quick summary of whether to upgrade:{" "}
            <strong>Yes, you should use WPA3 if your hardware allows it</strong>
            . WPA3 replaces WPA2's aging pre-shared key (PSK) mechanisms with a
            modern Dragonfly key exchange known as SAE. This change completely
            neutralizes offline dictionary attacks (where hackers capture packets
            and crack passwords using external GPUs) and ensures that even if a
            passphrase is later exposed, historical network traffic cannot be
            decrypted. For networks with older smart home devices (IoT), a
            hybrid <strong>WPA2/WPA3 Transition Mode</strong> is the recommended
            migration path to bridge compatibility gaps while securing modern
            smartphones and PCs.
          </p>
          <div className="border-l-4 border-emerald-500 pl-4 py-2 space-y-1 text-xs text-[var(--text-secondary)] bg-[var(--bg-elevated)] rounded-r-xl">
            <span className="font-bold text-[var(--text-primary)] block">
              Core Security Improvements:
            </span>
            <ul className="list-disc pl-4 space-y-1 text-[11px] text-[var(--text-muted)]">
              <li>
                <strong>SAE Authentication</strong>: Replaces the vulnerable
                4-Way Handshake with a secure Dragonfly exchange.
              </li>
              <li>
                <strong>Forward Secrecy</strong>: Ensures session keys are
                ephemeral and decoupled from the main passphrase.
              </li>
              <li>
                <strong>Mandatory PMF</strong>: Encrypts administrative frames to
                prevent deauthentication and denial-of-service.
              </li>
              <li>
                <strong>Enhanced Open (OWE)</strong>: Encrypts open public Wi-Fi
                connections without needing a public password.
              </li>
            </ul>
          </div>
        </section>

        {/* ==========================================
            SECTION 1: HISTORY OF WIFI SECURITY STANDARDS
            ========================================== */}
        <section
          className="prose prose-invert max-w-none space-y-4"
          aria-label="History of WiFi Security Standards"
        >
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            Section 1 — History of WiFi Security Standards
          </h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            Wireless networking relies on radio waves propagating through open space,
            meaning that physical boundaries like walls do not prevent signal
            reception. Without mathematical boundaries, anyone with a high-gain
            antenna could capture all communication within range. To address this,
            the IEEE and the Wi-Fi Alliance developed a series of security
            protocols beginning in the late 1990s. The evolution of these
            standards charts a continuous struggle between cryptographic advances
            and computing power upgrades that eventually render older algorithms
            insecure.
          </p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            The initial standard, <strong>WEP (Wired Equivalent Privacy)</strong>
            , was ratified in 1997. WEP aimed to provide the same level of security
            as a physical wired connection by using the RC4 stream cipher. However,
            its small 24-bit Initialization Vector (IV) was sent in cleartext,
            creating a vulnerability where IV collisions occurred frequently. This allowed
            attackers to collect enough packets to decrypt the secret key within
            minutes. In response, the Wi-Fi Alliance released{" "}
            <strong>WPA (Wi-Fi Protected Access)</strong> in 2003 as a transitional
            protocol. It utilized Temporal Key Integrity Protocol (TKIP) to wrap
            WEP's RC4 cipher, adding per-packet key mixing and a message integrity
            check to stop simple sniffing attacks without requiring hardware replacements.
          </p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            By 2004, the Wi-Fi Alliance introduced <strong>WPA2</strong>, built
            upon the 802.11i standard. WPA2 replaced the weak RC4 stream cipher and
            TKIP key wrapper with the robust <strong>Advanced Encryption Standard (AES)</strong>{" "}
            operating in Counter Mode with Cipher Block Chaining Message Authentication
            Code Protocol (CCMP). This configuration provided secure, hardware-accelerated
            encryption that remains the baseline standard today. However, the underlying
            authentication mechanism of WPA2—the 4-Way Handshake—was still built on a static
            Pre-Shared Key (PSK). Over the next decade, this design became vulnerable
            to offline brute-force attacks and key-reset vulnerabilities.
          </p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            To address WPA2's structural vulnerabilities, the Wi-Fi Alliance ratified{" "}
            <strong>WPA3</strong> in 2018. WPA3 replaces PSK authentication with
            Simultaneous Authentication of Equals (SAE) to protect against offline
            brute-force attacks, mandates Protected Management Frames (PMF), supports
            CNSA-compliant 192-bit security profiles, and introduces Opportunistic
            Wireless Encryption (OWE) for open hotspots. The table below outlines
            the progression and vulnerabilities of these standards:
          </p>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-[11px] text-[var(--text-secondary)]">
              <thead>
                <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                  <th className="px-3 py-2 text-left">Protocol</th>
                  <th className="px-3 py-2 text-left">Year</th>
                  <th className="px-3 py-2 text-left">Encryption Cipher</th>
                  <th className="px-3 py-2 text-left">Current Status</th>
                  <th className="px-3 py-2 text-left">Key Vulnerability</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)]">
                <tr>
                  <td className="px-3 py-2.5 font-semibold text-[var(--text-primary)]">
                    WEP
                  </td>
                  <td className="px-3 py-2.5">1997</td>
                  <td className="px-3 py-2.5">RC4 (Stream)</td>
                  <td className="px-3 py-2.5 text-rose-400 font-bold">
                    Broken & Deprecated
                  </td>
                  <td className="px-3 py-2.5">
                    Short 24-bit Initialization Vector (IV) collisions; key
                    recovery takes seconds.
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-semibold text-[var(--text-primary)]">
                    WPA-TKIP
                  </td>
                  <td className="px-3 py-2.5">2003</td>
                  <td className="px-3 py-2.5">RC4 + TKIP Wrapper</td>
                  <td className="px-3 py-2.5 text-rose-400 font-bold">
                    Broken & Deprecated
                  </td>
                  <td className="px-3 py-2.5">
                    Weak Michael MIC algorithm; susceptible to packet injection and
                    downgrade attacks.
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-semibold text-[var(--text-primary)]">
                    WPA2-AES
                  </td>
                  <td className="px-3 py-2.5">2004</td>
                  <td className="px-3 py-2.5">AES-CCMP (Block)</td>
                  <td className="px-3 py-2.5 text-amber-400 font-bold">
                    Active (Legacy Baseline)
                  </td>
                  <td className="px-3 py-2.5">
                    Offline dictionary attacks on captured 4-way handshakes, PMKID
                    harvesting, and KRACK key reinstallation.
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-semibold text-[var(--text-primary)]">
                    WPA3
                  </td>
                  <td className="px-3 py-2.5">2018</td>
                  <td className="px-3 py-2.5">AES-CCMP / GCMP</td>
                  <td className="px-3 py-2.5 text-emerald-400 font-bold">
                    Active (Modern Standard)
                  </td>
                  <td className="px-3 py-2.5">
                    Requires live handshake interactions; side-channel attacks on Dragonfly
                    implemented in early firmware (largely patched).
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ==========================================
            SECTION 2: WPA2: THE 4-WAY HANDSHAKE EXPLAINED
            ========================================== */}
        <section
          className="prose prose-invert max-w-none space-y-4"
          aria-label="WPA2: The 4-Way Handshake Explained"
        >
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            Section 2 — WPA2: The 4-Way Handshake Explained
          </h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            To understand the vulnerabilities of WPA2, it is necessary to examine how it
            establishes a secure connection. When a client (supplicant) connects to an Access
            Point (AP / authenticator), both parties must prove they know the shared password
            without sending the raw text over the air. WPA2-Personal achieves this using the
            <strong>4-Way Handshake</strong>, which derives unique encryption keys for the
            session.
          </p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            First, both the client and the AP derive the <strong>Pairwise Master Key (PMK)</strong>.
            The PMK is derived using the PBKDF2 algorithm, which hashes the Wi-Fi password
            (passphrase) and the network's SSID 4,096 times using SHA-1. Because the SSID is a key
            input, the same password generates a different PMK on different networks, protecting
            against pre-computed tables.
          </p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            The 4-Way Handshake then proceeds through the following steps to derive the
            <strong>Pairwise Transient Key (PTK)</strong>, which is used for encrypting data traffic:
          </p>
          <div className="space-y-3">
            <div className="glass-card p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl">
              <span className="font-bold text-xs text-[var(--text-primary)] block">
                Message 1: AP to Client (ANonce)
              </span>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                The AP generates a random cryptographic value called the{" "}
                <strong>ANonce (Authenticator Nonce)</strong> and sends it to the client
                in cleartext, along with its MAC address.
              </p>
            </div>
            <div className="glass-card p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl">
              <span className="font-bold text-xs text-[var(--text-primary)] block">
                Message 2: Client to AP (SNonce + MIC)
              </span>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                The client generates its own random value, the{" "}
                <strong>SNonce (Supplicant Nonce)</strong>. Using the PMK, ANonce, SNonce,
                AP MAC, and Client MAC, the client derives the PTK. It then sends its SNonce
                to the AP, along with a Message Integrity Code (MIC) computed using a subkey
                of the PTK (the Key Confirmation Key) to prove it possesses the correct PMK.
              </p>
            </div>
            <div className="glass-card p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl">
              <span className="font-bold text-xs text-[var(--text-primary)] block">
                Message 3: AP to Client (GTK + MIC)
              </span>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                The AP derives the PTK using the same parameters. It verifies the client's
                MIC. If valid, the AP generates the{" "}
                <strong>Group Temporal Key (GTK)</strong> for broadcast/multicast traffic.
                It sends Message 3 to the client containing the GTK (encrypted with a subkey
                of the PTK) and a new MIC.
              </p>
            </div>
            <div className="glass-card p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl">
              <span className="font-bold text-xs text-[var(--text-primary)] block">
                Message 4: Client to AP (Acknowledge)
              </span>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                The client verifies the AP's MIC, installs the keys, and sends Message 4 to
                confirm key installation. From this point on, unicast traffic is encrypted
                using the Temporal Key (TK) portion of the PTK.
              </p>
            </div>
          </div>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            <strong>The Vulnerability:</strong> The weakness of the 4-way handshake lies in the fact
            that all parameters required to derive the PTK—except for the PMK—are transmitted in
            cleartext over the air. An attacker in radio range can capture Message 1 and Message 2
            using a wireless card in monitor mode. Once captured, the attacker can use the cleartext
            MAC addresses, nonces, and the final MIC to perform an offline dictionary attack. By
            testing millions of passphrases per second, the attacker can compute the PMK and PTK for
            each attempt, comparing the resulting MIC with the captured MIC. If they match, the password
            is discovered. This attack does not require any interaction with the access point and cannot
            be blocked once the handshake packets are captured.
          </p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            Additionally, the WPA2 handshake is vulnerable to key reinstallation attacks (KRACK,
            CVE-2017-13077). In a KRACK attack, an attacker intercepts and delays Message 4 from reaching
            the AP. The AP, assuming Message 3 was lost, retransmits Message 3. When the client receives
            the retransmitted Message 3, it reinstalls the same encryption keys and resets its
            cryptographic packet numbers (nonces) and replay counters. This key reuse breaks the stream
            cipher's security, allowing the attacker to decrypt packets or inject traffic.
          </p>
          <div className="border-l-4 border-[var(--brand-500)] pl-4 py-2 space-y-2 text-xs text-[var(--text-secondary)] bg-[var(--bg-elevated)] rounded-r-xl">
            <span className="font-bold text-[var(--text-primary)] block">
              Global Admin Configuration Tip:
            </span>
            To mitigate these authentication vulnerabilities during migration, administrators must
            ensure they are logging into the correct control panel. For detailed steps on finding
            admin interfaces and default gateway configurations, refer to our complete guides on{" "}
            <Link href="/router-login" className="text-[var(--brand-400)] hover:underline font-semibold">
              Router Login Steps
            </Link>{" "}
            and{" "}
            <Link href="/router-settings" className="text-[var(--brand-400)] hover:underline font-semibold">
              Router Settings Customization
            </Link>
            .
          </div>
        </section>

        {/* ==========================================
            SECTION 3: WPA3: SAE AUTHENTICATION EXPLAINED
            ========================================== */}
        <section
          className="prose prose-invert max-w-none space-y-4"
          aria-label="WPA3: SAE Authentication Explained"
        >
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            Section 3 — WPA3: SAE Authentication Explained
          </h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            WPA3-Personal addresses WPA2's handshake vulnerability by replacing the pre-shared key
            (PSK) authentication with <strong>Simultaneous Authentication of Equals (SAE)</strong>.
            SAE is based on the <strong>Dragonfly Key Exchange</strong> protocol (RFC 7664), which
            implements a zero-knowledge proof. This protocol allows the client and the access point to
            verify their shared password without exposing it, or any hash directly derived from it,
            to eavesdroppers.
          </p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            Instead of executing a one-way mathematical hash of the password to check for a match, SAE
            treats the password as a coordinate base point on an elliptic curve (or a generator in a
            finite cyclic group). During the connection phase, the client and the AP perform an
            ephemeral Diffie-Hellman key exchange mapped to this password-derived point. The exchange
            is divided into two phases:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-xs text-[var(--text-muted)]">
            <li>
              <strong>Commit Phase:</strong> Both the client and the AP generate ephemeral private
              scalar values and random masking values. They calculate public Commit values based on
              the password-derived point, exchange them, and use them to compute a shared secret.
              Because the public Commit values are masked using random scalars, an attacker capturing
              these frames cannot reverse the math to discover the password-derived point.
            </li>
            <li>
              <strong>Confirm Phase:</strong> Both parties generate Confirmation values (hashes) from
              the shared secret, their public keys, and the exchanged Commit values. They exchange
              these Confirm frames to prove they reached the same shared secret. If the Confirm values
              match, the shared secret is used to derive the actual Pairwise Master Key (PMK).
            </li>
          </ul>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            <strong>Why it Defeats Offline Attacks:</strong> Because the shared secret and resulting
            PMK are derived using ephemeral keys, the mathematical relationship between the captured air
            traffic and the static password is broken. An attacker cannot use captured Dragonfly frames
            to run offline dictionary attacks on their GPU clusters. To test a single password guess, the
            attacker must perform a live, online exchange with the AP. The AP can detect and block
            repeated failed attempts, rendering brute-force attacks computationally infeasible.
          </p>
        </section>

        {/* ==========================================
            SECTION 4: FORWARD SECRECY: WHY IT MATTERS
            ========================================== */}
        <section
          className="prose prose-invert max-w-none space-y-4"
          aria-label="Forward Secrecy: Why It Matters"
        >
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            Section 4 — Forward Secrecy: Why It Matters
          </h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            <strong>Forward Secrecy</strong> (often called Perfect Forward Secrecy or PFS) is a
            cryptographic property ensuring that the compromise of a long-term key (such as the main
            Wi-Fi passphrase) does not compromise the confidentiality of past session keys. Without
            Forward Secrecy, historical data captured over the air remains vulnerable to decryption
            if the key is exposed in the future.
          </p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            In WPA2-Personal, the PMK is derived directly from the passphrase and the SSID. This PMK
            remains static across all sessions and all devices connecting to that network. If an
            attacker captures and records the encrypted wireless traffic of a device over a period
            of months, and subsequently obtains the Wi-Fi password (e.g., by social engineering or
            decryption), they can calculate the static PMK. With the PMK and the captured handshakes
            for each session, the attacker can decrypt all historical unicast traffic. This is a
            significant vulnerability for sensitive environments where long-term data confidentiality
            is required.
          </p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            WPA3-SAE addresses this vulnerability by using ephemeral key exchanges during the Commit
            and Confirm phases of the Dragonfly handshake. The resulting PMK is unique to that specific
            session. Once the session terminates, the ephemeral private keys are discarded. Even if an
            attacker later obtains the network's main WPA3 password, they cannot decrypt previously
            recorded traffic because they lack the ephemeral private keys discarded at the end of each
            session.
          </p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            This design change significantly alters the security model for residential and corporate
            Wi-Fi networks. Under WPA3, a password compromise is a point-in-time event. It allows an
            attacker to connect to the network moving forward, but it does not expose historical data.
            This mitigation protects long-term data confidentiality and reduces the impact of a
            compromised passphrase.
          </p>
        </section>

        {/* ==========================================
            SECTION 5: OFFLINE BRUTE-FORCE PROTECTION
            ========================================== */}
        <section
          className="prose prose-invert max-w-none space-y-4"
          aria-label="Offline Brute-Force Protection"
        >
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            Section 5 — Offline Brute-Force Protection
          </h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            In WPA2, offline brute-force attacks are highly effective because the cryptographic proof
            of the password (the MIC or PMKID) can be extracted from passive monitoring. In 2018,
            researchers discovered that attackers can extract the <strong>PMKID (Pairwise Master Key
            Identifier)</strong> from a single EAPOL association request frame sent by the AP. This
            can be done without waiting for a client to connect. Using tools like Hashcat, an attacker
            can run a dictionary attack against the PMKID offline, testing passwords at rates of
            billions of hashes per second on GPU clusters.
          </p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            WPA3-SAE addresses this by requiring an active network exchange for every password guess.
            An attacker cannot perform offline calculations on captured frames to verify a password
            guess. Instead, they must send a Commit frame to the AP for each guess. The AP verifies the
            Commit frame and responds. This online verification allows the AP to rate-limit login
            attempts, implement exponential backoff delays, or block offending MAC addresses after
            repeated failures.
          </p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            This change has significant implications for password strength. Under WPA2, short or simple
            passwords (e.g., "wifi1234") are easily cracked offline. To achieve security under WPA2,
            users must configure long, complex passphrases (16+ characters with mixed case, numbers,
            and symbols). Under WPA3, the lack of offline cracking means even simpler passwords
            are protected from dictionary attacks. While using a strong passphrase remains a best
            practice to prevent targeted online guessing, WPA3 provides a baseline of protection for
            standard user passwords.
          </p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            To ensure the security of your password change, always use a strong passphrase. For more
            information on updating wireless security settings and managing passphrases, refer to our
            guide on how to{" "}
            <Link href="/change-wifi-password" className="text-[var(--brand-400)] hover:underline font-semibold">
              Change Your WiFi Password
            </Link>
            .
          </p>
        </section>

        {/* ==========================================
            SECTION 6: FEATURE COMPARISON TABLE
            ========================================== */}
        <section
          className="prose prose-invert max-w-none space-y-4"
          aria-label="Feature Comparison Table"
        >
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            Section 6 — Feature Comparison Table
          </h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            WPA3 is divided into WPA3-Personal and WPA3-Enterprise, matching the structure of WPA2
            but implementing different cryptographic requirements. The table below compares these
            standards across key technical features:
          </p>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-[11px] text-[var(--text-secondary)]">
              <thead>
                <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                  <th className="px-3 py-2 text-left">Feature</th>
                  <th className="px-3 py-2 text-left">WPA2-Personal</th>
                  <th className="px-3 py-2 text-left">WPA2-Enterprise</th>
                  <th className="px-3 py-2 text-left">WPA3-Personal</th>
                  <th className="px-3 py-2 text-left">WPA3-Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)]">
                <tr>
                  <td className="px-3 py-2.5 font-semibold text-[var(--text-primary)]">
                    Authentication
                  </td>
                  <td className="px-3 py-2.5">Pre-Shared Key (PSK)</td>
                  <td className="px-3 py-2.5">IEEE 802.1X (RADIUS)</td>
                  <td className="px-3 py-2.5">Simultaneous Auth of Equals (SAE)</td>
                  <td className="px-3 py-2.5">IEEE 802.1X (RADIUS / EAP)</td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-semibold text-[var(--text-primary)]">
                    Encryption Cipher
                  </td>
                  <td className="px-3 py-2.5">AES-CCMP (128-bit)</td>
                  <td className="px-3 py-2.5">AES-CCMP (128-bit)</td>
                  <td className="px-3 py-2.5">AES-CCMP (128-bit)</td>
                  <td className="px-3 py-2.5">AES-CCMP (128-bit) / GCMP (256-bit)</td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-semibold text-[var(--text-primary)]">
                    Forward Secrecy
                  </td>
                  <td className="px-3 py-2.5 font-semibold text-rose-400">No</td>
                  <td className="px-3 py-2.5 font-semibold text-rose-400">No</td>
                  <td className="px-3 py-2.5 font-semibold text-emerald-400">
                    Yes (via Ephemeral DH)
                  </td>
                  <td className="px-3 py-2.5 font-semibold text-emerald-400">
                    Yes (via Ephemeral DH)
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-semibold text-[var(--text-primary)]">
                    Offline Attack Resistance
                  </td>
                  <td className="px-3 py-2.5 font-semibold text-rose-400">No</td>
                  <td className="px-3 py-2.5">N/A (Uses 802.1X certificates)</td>
                  <td className="px-3 py-2.5 font-semibold text-emerald-400">
                    Yes (Dragonfly SAE)
                  </td>
                  <td className="px-3 py-2.5">N/A (Uses EAP tunnels)</td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-semibold text-[var(--text-primary)]">
                    192-bit Security Mode
                  </td>
                  <td className="px-3 py-2.5">Unsupported</td>
                  <td className="px-3 py-2.5">Unsupported</td>
                  <td className="px-3 py-2.5">Unsupported</td>
                  <td className="px-3 py-2.5 font-semibold text-emerald-400">
                    Supported (CNSA Suite)
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-semibold text-[var(--text-primary)]">
                    PMF (Protected Mgmt Frames)
                  </td>
                  <td className="px-3 py-2.5">Optional (802.11w)</td>
                  <td className="px-3 py-2.5">Optional (802.11w)</td>
                  <td className="px-3 py-2.5 font-semibold text-emerald-400">
                    Mandatory (Required)
                  </td>
                  <td className="px-3 py-2.5 font-semibold text-emerald-400">
                    Mandatory (Required)
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-semibold text-[var(--text-primary)]">
                    OWE (Enhanced Open) Support
                  </td>
                  <td className="px-3 py-2.5 font-semibold text-rose-400">No</td>
                  <td className="px-3 py-2.5 font-semibold text-rose-400">No</td>
                  <td className="px-3 py-2.5 font-semibold text-emerald-400">
                    Integrated
                  </td>
                  <td className="px-3 py-2.5 font-semibold text-emerald-400">
                    Integrated
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-semibold text-[var(--text-primary)]">
                    Typical Use Case
                  </td>
                  <td className="px-3 py-2.5">Legacy Home Networks</td>
                  <td className="px-3 py-2.5">Legacy Enterprise Networks</td>
                  <td className="px-3 py-2.5">Modern Home/SOHO Networks</td>
                  <td className="px-3 py-2.5">High-Security Corporate Networks</td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-semibold text-[var(--text-primary)]">
                    Device Compatibility
                  </td>
                  <td className="px-3 py-2.5">Universal (Post-2004)</td>
                  <td className="px-3 py-2.5">Universal (Post-2004)</td>
                  <td className="px-3 py-2.5">Modern Devices (Post-2019)</td>
                  <td className="px-3 py-2.5">Modern Enterprise (Post-2019)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ==========================================
            SECTION 7: WPA3 COMPATIBILITY MATRIX
            ========================================== */}
        <section
          className="prose prose-invert max-w-none space-y-4"
          aria-label="WPA3 Compatibility Matrix"
        >
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            Section 7 — WPA3 Compatibility Matrix & Transition Mode
          </h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            Implementing WPA3 requires compatibility from both the wireless router (access point)
            and the client device. While modern operating systems natively support WPA3, hardware
            limitations on older devices can prevent successful connections. The table below lists
            WPA3 support across major operating systems and router manufacturers:
          </p>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-[11px] text-[var(--text-secondary)]">
              <thead>
                <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                  <th className="px-3 py-2 text-left">Platform / Brand</th>
                  <th className="px-3 py-2 text-left">WPA3 Support Status</th>
                  <th className="px-3 py-2 text-left">Minimum Requirements</th>
                  <th className="px-3 py-2 text-left">Configuration Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)]">
                <tr>
                  <td className="px-3 py-2.5 font-semibold text-[var(--text-primary)]">
                    Windows OS
                  </td>
                  <td className="px-3 py-2.5 text-emerald-400 font-semibold">Supported</td>
                  <td className="px-3 py-2.5">Windows 10 (2004+) / Windows 11</td>
                  <td className="px-3 py-2.5">
                    Requires compatible Wi-Fi adapter drivers (e.g., Intel AX200 series).
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-semibold text-[var(--text-primary)]">
                    macOS
                  </td>
                  <td className="px-3 py-2.5 text-emerald-400 font-semibold">Supported</td>
                  <td className="px-3 py-2.5">macOS Catalina (10.15+)</td>
                  <td className="px-3 py-2.5">
                    Supported on all Mac hardware released after 2018.
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-semibold text-[var(--text-primary)]">
                    iOS / iPadOS
                  </td>
                  <td className="px-3 py-2.5 text-emerald-400 font-semibold">Supported</td>
                  <td className="px-3 py-2.5">iOS 13+</td>
                  <td className="px-3 py-2.5">
                    Available on iPhone 7, iPad Air (3rd Gen), and newer hardware.
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-semibold text-[var(--text-primary)]">
                    Android OS
                  </td>
                  <td className="px-3 py-2.5 text-emerald-400 font-semibold">Supported</td>
                  <td className="px-3 py-2.5">Android 10+</td>
                  <td className="px-3 py-2.5">
                    Natively supported by the OS; dependent on device chipset integration.
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-semibold text-[var(--text-primary)]">
                    Linux
                  </td>
                  <td className="px-3 py-2.5 text-emerald-400 font-semibold">Supported</td>
                  <td className="px-3 py-2.5">wpa_supplicant 2.9+</td>
                  <td className="px-3 py-2.5">
                    Requires configuration updates in NetworkManager.
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-semibold text-[var(--text-primary)]">
                    TP-Link Routers
                  </td>
                  <td className="px-3 py-2.5 text-emerald-400 font-semibold">Supported</td>
                  <td className="px-3 py-2.5">Wi-Fi 6 (802.11ax) Models</td>
                  <td className="px-3 py-2.5">
                    Available on Archer AX/GX series and Deco mesh lines via firmware.
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-semibold text-[var(--text-primary)]">
                    ASUS Routers
                  </td>
                  <td className="px-3 py-2.5 text-emerald-400 font-semibold">Supported</td>
                  <td className="px-3 py-2.5">RT-AX series / ZenWiFi Mesh</td>
                  <td className="px-3 py-2.5">
                    Enabled in ASUSWRT under the Wireless General configuration tab.
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-semibold text-[var(--text-primary)]">
                    Netgear Routers
                  </td>
                  <td className="px-3 py-2.5 text-emerald-400 font-semibold">Supported</td>
                  <td className="px-3 py-2.5">Nighthawk AX / Orbi Wi-Fi 6</td>
                  <td className="px-3 py-2.5">
                    Configurable via routerlogin.net under Advanced Wireless settings.
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-semibold text-[var(--text-primary)]">
                    Huawei Routers
                  </td>
                  <td className="px-3 py-2.5 text-emerald-400 font-semibold">Supported</td>
                  <td className="px-3 py-2.5">WiFi AX3 / newer gateways</td>
                  <td className="px-3 py-2.5">
                    Configure through the Huawei AI Life mobile application or local IP portal.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            <strong>Understanding WPA2/WPA3 Transition Mode:</strong> To address compatibility
            issues during migration, the Wi-Fi Alliance introduced WPA2/WPA3 Transition Mode
            (also known as Mixed Mode). When enabled, the router broadcasts a single SSID that
            advertises support for both WPA2-PSK and WPA3-SAE. WPA3-capable client devices
            automatically negotiate the connection using the SAE protocol, while legacy devices
            fall back to the standard WPA2-PSK handshake.
          </p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            <strong>Transition Mode Risks (Downgrade Attacks):</strong> While Transition Mode assists
            with device compatibility, it introduces potential security vulnerabilities. Because
            the router continues to support WPA2-PSK on the same SSID, an attacker can perform a
            downgrade attack. By transmitting spoofed deauthentication frames to disconnect a
            WPA3 client and broadcasting a spoofed WPA2 beacon, the attacker can force the client to
            reconnect using WPA2-PSK. The attacker can then capture the standard WPA2 handshake or PMKID
            and perform an offline brute-force attack.
          </p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            To mitigate this risk, Transition Mode should be viewed as a temporary measure. Once
            all legacy clients are upgraded or isolated to a separate network, the primary network
            should be transitioned to WPA3-Only mode, where PMF is mandatory and WPA2 fallbacks are
            disabled.
          </p>
        </section>

        {/* ==========================================
            SECTION 8: MIGRATION GUIDE: MOVING TO WPA3
            ========================================== */}
        <section
          className="prose prose-invert max-w-none space-y-4"
          aria-label="Migration Guide: Moving from WPA2 to WPA3"
        >
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            Section 8 — Migration Guide: Moving from WPA2 to WPA3
          </h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            Migrating your network from WPA2 to WPA3 requires a systematic approach to prevent
            disconnecting legacy smart home or IoT devices. Follow this step-by-step migration guide
            to transition your network security standard:
          </p>

          <div className="space-y-4 text-xs text-[var(--text-secondary)]">
            <div className="border border-[var(--border-subtle)] rounded-xl p-4 bg-[var(--bg-elevated)] space-y-2">
              <h3 className="font-bold text-[var(--text-primary)] flex items-center gap-1.5">
                <RefreshCw size={14} className="text-[var(--brand-400)]" />
                Step 1: Check and Update Router Firmware
              </h3>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                Log into your router's administration panel by typing its gateway IP address
                (typically 192.168.1.1 or 192.168.0.1) into a web browser. Locate the firmware management or
                update section. Verify if any software updates are available and install them.
                Manufacturers frequently release firmware updates that add WPA3 or Transition Mode
                compatibility to existing hardware.
              </p>
            </div>

            <div className="border border-[var(--border-subtle)] rounded-xl p-4 bg-[var(--bg-elevated)] space-y-2">
              <h3 className="font-bold text-[var(--text-primary)] flex items-center gap-1.5">
                <Cpu size={14} className="text-[var(--brand-400)]" />
                Step 2: Audit Connected Client Compatibility
              </h3>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                Before changing the security protocol, review the clients currently connected to your
                network. You can verify this in the router's client list. Devices running modern operating
                systems (Windows 10/11, macOS Catalina+, iOS 13+, Android 10+) support WPA3. Older smart home
                sensors, legacy printers, and legacy gaming consoles (e.g., PlayStation 3, Xbox 360) are
                typically WPA2-only. For help auditing connected devices, refer to our guide on{" "}
                <Link
                  href="/how-to-see-who-is-on-my-wifi"
                  className="text-[var(--brand-400)] hover:underline font-semibold"
                >
                  How to See Who Is on Your WiFi
                </Link>
                .
              </p>
            </div>

            <div className="border border-[var(--border-subtle)] rounded-xl p-4 bg-[var(--bg-elevated)] space-y-2">
              <h3 className="font-bold text-[var(--text-primary)] flex items-center gap-1.5">
                <Lock size={14} className="text-[var(--brand-400)]" />
                Step 3: Enable WPA2/WPA3 Transition Mode
              </h3>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                Navigate to the wireless security settings page within your router's administration panel.
                Locate the SSID security options and select <strong>WPA2/WPA3-Personal (Transition/Mixed Mode)</strong>.
                This allows compatible devices to connect using WPA3-SAE, while older devices continue to
                connect using WPA2-PSK on the same SSID. Save the settings and restart the router.
              </p>
            </div>

            <div className="border border-[var(--border-subtle)] rounded-xl p-4 bg-[var(--bg-elevated)] space-y-2">
              <h3 className="font-bold text-[var(--text-primary)] flex items-center gap-1.5">
                <ListChecks size={14} className="text-[var(--brand-400)]" />
                Step 4: Reconnect and Test Client Devices
              </h3>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                On each client device, navigate to the Wi-Fi configuration menu, select the network name, and click
                <strong>Forget Network</strong>. This forces the device to query the router for its updated security
                capabilities. Re-select the network and enter the passphrase. Verify that the client connects
                successfully and has internet access.
              </p>
            </div>

            <div className="border border-[var(--border-subtle)] rounded-xl p-4 bg-[var(--bg-elevated)] space-y-2">
              <h3 className="font-bold text-[var(--text-primary)] flex items-center gap-1.5">
                <Layers size={14} className="text-[var(--brand-400)]" />
                Step 5: Troubleshoot and Isolate Legacy Hardware
              </h3>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                If an older smart plug, Wi-Fi printer, or legacy client fails to connect under Transition Mode,
                it may be due to the device's inability to negotiate connection when Protected Management Frames (PMF)
                are enabled. To address this, configure a separate 2.4 GHz Guest Network secured with <strong>WPA2-PSK (AES)</strong>
                only, and connect the legacy devices to it. This isolates legacy hardware from your main network.
                For configuration instructions, see our guide on{" "}
                <Link
                  href="/guest-wifi-setup"
                  className="text-[var(--brand-400)] hover:underline font-semibold"
                >
                  Setting Up a Guest WiFi Network
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        {/* ==========================================
            SECTION 9: WHEN TO STICK WITH WPA2
            ========================================== */}
        <section
          className="prose prose-invert max-w-none space-y-4"
          aria-label="When to Stick with WPA2"
        >
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            Section 9 — When to Stick with WPA2
          </h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            While WPA3 is the modern security standard, there are scenarios where maintaining a WPA2
            configuration is necessary or practical. The most common scenario involves compatibility
            limitations with older smart home devices (IoT). Many budget-friendly smart plugs, light
            bulbs, cameras, and older appliances use low-cost 2.4 GHz Wi-Fi modules (such as early ESP8266
            chipsets) that lack the processing power for the Dragonfly key exchange or do not support
            the mandatory Protected Management Frames (PMF) required by WPA3. These devices may fail to connect
            to a network running in WPA2/WPA3 Transition Mode.
          </p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            If your network consists primarily of legacy devices or if you lease an older router from
            your ISP that does not support WPA3, sticking with WPA2 remains acceptable under certain
            security conditions:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-xs text-[var(--text-muted)]">
            <li>
              <strong>Configure a Strong Passphrase:</strong> Because WPA2 is vulnerable to offline
              brute-force attacks, security relies entirely on password complexity. Use a passphrase of
              at least 16 to 20 characters, containing a mix of uppercase and lowercase letters, numbers,
              and symbols, to resist GPU-accelerated dictionary attacks.
            </li>
            <li>
              <strong>Disable WPS (Wi-Fi Protected Setup):</strong> WPS allows devices to connect using an
              8-digit PIN or a physical button press. However, the PIN mechanism is vulnerable to online
              brute-force attacks (e.g., Pixie Dust attacks) that can expose your WPA2 passphrase.
              Ensure WPS is disabled in your router's wireless settings.
            </li>
            <li>
              <strong>Implement Network Segmentation:</strong> If you must support legacy devices, isolate
              them by setting up a guest network or a dedicated SSID. This keeps legacy hardware on a separate
              subnet, protecting your primary computers, phones, and storage drives.
            </li>
            <li>
              <strong>Keep Firmware Updated:</strong> Ensure your router's firmware is kept updated to
              apply any security patches released by the manufacturer to mitigate known WPA2 vulnerabilities
              like KRACK.
            </li>
          </ul>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            To improve your overall network security, you can pair your WPA3 or WPA2 configuration with
            encrypted DNS lookups. Using secure DNS servers prevents your ISP or local eavesdroppers from
            monitoring the domains you visit. For configuration instructions, see our guide on{" "}
            <Link href="/dns" className="text-[var(--brand-400)] hover:underline font-semibold">
              Encrypted DNS Setup
            </Link>
            . If you need to restrict access for an unauthorized device that obtained your password, refer
            to our guide on{" "}
            <Link
              href="/block-device-on-router"
              className="text-[var(--brand-400)] hover:underline font-semibold"
            >
              How to Block a Device on Your Router
            </Link>
            .
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
              { label: "Guest WiFi Setup", href: "/guest-wifi-setup" },
              { label: "Block Device on Router", href: "/block-device-on-router" },
              { label: "How to See Who is on My WiFi", href: "/how-to-see-who-is-on-my-wifi" },
              { label: "DNS Configuration Guide", href: "/dns" },
            ].map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                className="text-xs px-3 py-1.5 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] hover:border-[var(--brand-400)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] rounded-lg transition-colors font-medium"
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
