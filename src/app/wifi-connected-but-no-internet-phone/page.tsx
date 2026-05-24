import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import TroubleshootingArticleShell from "@/components/tools/TroubleshootingArticleShell";
import ConnectionOptimizerClient from "@/components/tools/ConnectionOptimizerClient";

export const metadata: Metadata = buildMetadata({
  title: "Wi-Fi Connected But No Internet on Phone? Fix for Android & iOS (2026)",
  description:
    "Is your phone connected to Wi-Fi but has no internet? Discover why Android and iPhone experience connection drops—covering Private DNS overrides, MAC randomization, and captive portals.",
  canonical: "/wifi-connected-but-no-internet-phone",
  keywords: [
    "wifi connected but no internet phone",
    "android wifi no internet",
    "iphone wifi connected but no internet",
    "captive portal redirect",
    "private dns android",
    "private mac address ios"
  ],
});

const breadcrumbs = [
  { name: "Internet Fixes", url: "/wifi-connected-but-no-internet-phone" },
  { name: "Wi-Fi Connected But No Internet on Phone", url: "/wifi-connected-but-no-internet-phone" },
];

const troubleshootingSteps = [
  {
    title: "Toggle Private MAC Randomization Settings",
    description: "On iOS, tap the 'i' next to your connected SSID and toggle 'Private Wi-Fi Address' to OFF. On Android, go to Network Details → Advanced → Privacy, and select 'Use Device MAC'. Dynamic L2 address shifting causes DHCP allocation pools to dry up.",
    tip: "Randomized MAC addresses protect your privacy on public networks, but trigger security locks on some residential routers."
  },
  {
    title: "Change system-wide Private DNS / DoT configurations",
    description: "On Android, navigate to Settings → Network & Internet → Private DNS, and toggle it to Automatic or OFF. Routers blocking port 853 will disable all outbound traffic on devices enforcing DNS-over-TLS.",
    tip: "If Private DNS is set to a specific host (e.g. dns.adguard.com) and that server goes offline, your phone will lose all internet access while Wi-Fi remains active."
  },
  {
    title: "Disable VPN and Secure Proxies",
    description: "Temporarily turn off any third-party VPN apps or security profiles. Check your iOS iCloud settings and disable 'Private Relay' to verify if local gateways resolve traffic.",
  },
  {
    title: "Force-Open Captive Portal Interfaces",
    description: "If connected to a public network, open your web browser and type 'neverssl.com' in the URL bar. This redirects your system to the captive portal authorization script, bypassing HTTPS certificates.",
    tip: "Browsers default to secure connections, which blocks the HTTP-based redirect rules used by public networks."
  }
];

const faqs = [
  {
    question: "Why does my phone show Wi-Fi connected but no internet while my PC works fine?",
    answer: "Mobile phones utilize advanced privacy mechanisms like MAC address randomization, Private DNS (DNS-over-TLS), and secure proxy layers (iCloud Private Relay) that desktop systems do not enforce by default. These specialized mobile protocols frequently conflict with home router security settings."
  },
  {
    question: "How does Android's 'Private DNS' setting affect my Wi-Fi access?",
    answer: "Android routes all DNS requests through port 853 (TLS) when Private DNS is active. If your router's firewall blocks port 853 or the custom resolver is offline, Android cannot translate domain names to IP addresses, dropping all web loading."
  },
  {
    question: "Why does my iPhone say 'Privacy Warning' under my Wi-Fi network?",
    answer: "This is a diagnostic notice showing that the 'Private Wi-Fi Address' setting is off. While turning it off fixes DHCP lease exhaustion on home routers, iOS warns you that your phone is broadcasting its physical MAC address, allowing tracking across public Wi-Fi zones."
  }
];

const commonCauses = [
  {
    title: "Android DoT Block",
    desc: "Android attempting secure DNS-over-TLS on port 853 while the router's hardware firewall blocks outbound encrypted queries."
  },
  {
    title: "iOS MAC Exhaustion",
    desc: "iPhone generating new virtual MAC identities that saturate the router's small dynamic DHCP pool, leading to IP denial."
  },
  {
    title: "iCloud Proxy Timeout",
    desc: "iCloud Private Relay routing tunnels dropping sync, causing all system traffic to route into a dead network socket."
  },
  {
    title: "Captive Portal Sandbox",
    desc: "The network redirect page is blocked by HTTPS strict rules, keeping the phone in an unauthenticated local pool."
  }
];

const quickFixChecklist = [
  "Disable Airplane Mode for 10 seconds to clear mobile interface sockets.",
  "Turn off iCloud Private Relay in your iPhone iCloud settings.",
  "Set Android Private DNS back to Automatic under network details.",
  "Check 'Forget Network' and rejoin, re-entering the security key.",
  "Verify if other connected devices are experiencing the same outage."
];

export default function WifiConnectedButNoInternetPhonePage() {
  return (
    <TroubleshootingArticleShell
      h1="Wi-Fi Connected But No Internet on Phone? Fix for Android & iOS (2026)"
      intro="Is your smartphone connected to Wi-Fi but refusing to load pages or apps? Learn why Android and iOS devices experience 'No Internet' flags—covering Private DNS overrides, MAC address randomization conflicts, VPN blocks, and captive portal redirects."
      category="wifi"
      breadcrumbs={breadcrumbs}
      faqs={faqs}
      troubleshootingSteps={troubleshootingSteps}
      warningBanner={{
        title: "E-E-A-T Safety Notice: Network Security Configuration",
        text: "Disabling Private DNS or MAC randomization on your device reduces browsing privacy. We recommend disabling these settings only on trusted residential networks. Always re-enable them when connecting to public coffee shops, hotels, or airport hotspots."
      }}
      quickFixChecklist={quickFixChecklist}
      commonCauses={commonCauses}
      whenToContactISP="If all smartphones and computers on your Wi-Fi display 'Connected, No Internet' simultaneously, the issue is on your ISP dynamic WAN gateway. Contact your ISP and verify if they are experiencing a local node outage or DHCP lease failure on your fiber/coax termination point."
      severityLevel="medium"
    >
      <div className="space-y-6">
        {/* Quick Answer Snippet for AI Search Engines */}
        <section className="glass-card p-5 border border-amber-950/20 bg-amber-950/5 rounded-2xl relative overflow-hidden" aria-label="Quick Answer Summary">
          <div className="absolute top-0 right-0 bg-amber-500/10 text-amber-400 text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-bl-lg font-bold">
            AIO Quick Answer
          </div>
          <h3 className="text-xs font-bold text-amber-400 mb-2 uppercase tracking-wide">Quick Diagnostic Summary</h3>
          <ul className="space-y-2 text-xs text-[var(--text-secondary)] leading-relaxed">
            <li><strong>Symptoms:</strong> Your phone shows full Wi-Fi signal bars and says 'Connected', but no websites, social feeds, or apps load.</li>
            <li><strong>Most Likely Cause:</strong> An active VPN/iCloud Private Relay crash, or Android's Private DNS (DoT) attempting queries on blocked port 853.</li>
            <li><strong>Fastest Safe Fix:</strong> Disconnect any active VPN client, disable iCloud Private Relay, and toggle Android's Private DNS setting to 'Off' or 'Automatic'.</li>
          </ul>
        </section>

        <ConnectionOptimizerClient mode="mobile-no-internet" />

        <article className="prose prose-invert max-w-none space-y-6 text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
          
          <h2 className="text-sm font-bold text-[var(--text-primary)]">Symptoms vs. Root Causes Diagnostic Table</h2>
          <p>
            Smartphones interact with wireless gateways using specialized network wrappers. Use this comparison table to identify where your mobile connection is failing:
          </p>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-[11px] text-[var(--text-secondary)]">
              <thead>
                <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                  <th className="px-3 py-2 text-left">Observed Symptom</th>
                  <th className="px-3 py-2 text-left">Likely Under-the-Hood Cause</th>
                  <th className="px-3 py-2 text-left">Device OS Affected</th>
                  <th className="px-3 py-2 text-left">Primary Diagnostic Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)]">
                <tr>
                  <td className="px-3 py-2 font-mono">Wi-Fi icon has an exclamation mark or '!' logo</td>
                  <td className="px-3 py-2">Private DNS (DoT) resolver port 853 block</td>
                  <td className="px-3 py-2">Android (Android 9 to 14)</td>
                  <td className="px-3 py-2">Set Private DNS to Automatic / Off</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-mono">Connected but Safari times out on all pages</td>
                  <td className="px-3 py-2">iCloud Private Relay proxy socket freeze</td>
                  <td className="px-3 py-2">iOS (iPhone / iPad)</td>
                  <td className="px-3 py-2">Toggle iCloud Private Relay OFF</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-mono">Wi-Fi disconnects immediately after obtaining IP</td>
                  <td className="px-3 py-2">MAC Address randomization lease conflict</td>
                  <td className="px-3 py-2">Both iOS & Android</td>
                  <td className="px-3 py-2">Disable Private MAC for this SSID</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-mono">Phone connects but redirects to blank white screen</td>
                  <td className="px-3 py-2">Captive Portal sandbox security interception</td>
                  <td className="px-3 py-2">Public/Hotel Networks</td>
                  <td className="px-3 py-2">Open http://neverssl.com in browser</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-sm font-bold text-[var(--text-primary)]">What Happens Internally When Mobile DNS Fails?</h2>
          <p>
            When a smartphone connects to an Access Point, it undergoes an association process: first authenticating via WPA2/WPA3 pre-shared keys, then sending a DHCP request to the gateway to claim a local IP address, subnet mask, default gateway, and DNS servers. Once the phone secures its IP, it validates internet connectivity.
          </p>
          <p>
            Both Android and iOS perform an HTTP connectivity check by querying a secure server hosted by Google or Apple (e.g. <code>connectivitycheck.gstatic.com</code> or <code>captive.apple.com</code>). If the query receives a clean HTTP 204 (No Content) response, the OS confirms internet access. If the query is intercepted or redirected, the OS raises a captive portal prompt. If the DNS query fails completely due to a TLS handshake block on port 853 (common when Android tries to use Private DNS over a firewall that blocks DoT), the connectivity probe fails silently, displaying 'Connected, No Internet' despite a strong physical Wi-Fi signal.
          </p>

          <div className="p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-2">
            <span className="font-bold text-[var(--text-primary)] block text-xs">Recommended Diagnostic Resources & Tools</span>
            <ul className="list-disc pl-4 space-y-1 text-[11px]">
              <li>If you are looking to optimize DNS routing across all devices, read our <a href="/best-dns-for-faster-internet" className="text-[var(--brand-400)] hover:underline">Best DNS for Faster Internet Guide</a>.</li>
              <li>Learn how to update custom parameters with the <a href="/how-to-change-dns-on-router" className="text-[var(--brand-400)] hover:underline">How to Change DNS on Router Walkthrough</a>.</li>
              <li>Verify your system gateway endpoints at the <a href="/ips/192-168-1-1" className="text-[var(--brand-400)] hover:underline">192.168.1.1 Administration Portal</a>.</li>
              <li>Check your physical link speed using the <a href="/ethernet-connected-but-no-internet" className="text-[var(--brand-400)] hover:underline">Ethernet Connected but No Internet Diagnostics</a>.</li>
              <li>Analyze sudden wireless drops with our <a href="/wifi-keeps-disconnecting" className="text-[var(--brand-400)] hover:underline">WiFi Disconnection Walkthrough</a>.</li>
            </ul>
          </div>

          <h2 className="text-sm font-bold text-[var(--text-primary)]">Device-Specific Subsections for Quick Network Resets</h2>
          <p>
            Follow these exact navigation paths to reset network sockets and clear cache variables across different mobile and desktop platforms:
          </p>

          <h3 className="text-xs font-bold text-[var(--text-primary)] uppercase">1. Android (Samsung Galaxy, Google Pixel, etc.)</h3>
          <p>
            Android leverages system-wide DoT for Private DNS. If this is misconfigured, it blocks all apps.
            <br />
            <strong>Path to Reset Private DNS:</strong> <code>Settings → Network & Internet → Private DNS</code>. Change setting to <strong>Automatic</strong> or <strong>Off</strong>.
            <br />
            <strong>Path to Flush Mobile Network Settings:</strong> <code>Settings → System → Reset Options → Reset Wi-Fi, Mobile & Bluetooth</code>. This flushes all saved Wi-Fi caches.
          </p>

          <h3 className="text-xs font-bold text-[var(--text-primary)] uppercase">2. iOS (iPhone, iPad)</h3>
          <p>
            Apple's security suite is highly secure but highly rigid when proxies drop handshakes.
            <br />
            <strong>Path to Disable iCloud Private Relay:</strong> <code>Settings → [Your Name] → iCloud → Private Relay</code>. Switch the toggle to <strong>OFF</strong>.
            <br />
            <strong>Path to Disable MAC Randomization:</strong> <code>Settings → Wi-Fi</code> → Tap the blue <strong>i</strong> icon next to your network → Toggle <strong>Private Wi-Fi Address</strong> to <strong>OFF</strong>.
          </p>

          <h3 className="text-xs font-bold text-[var(--text-primary)] uppercase">3. Windows 11 & macOS</h3>
          <p>
            Laptops occasionally suffer from dynamic DNS lease blocks when waking up from sleep states.
            <br />
            <strong>Windows 11 Pathway:</strong> Open Terminal as Admin and run <code>ipconfig /release</code> followed by <code>ipconfig /renew</code> to claim a clean DHCP IP.
            <br />
            <strong>macOS Pathway:</strong> Go to <code>System Settings → Wi-Fi → Details → TCP/IP</code> and click <strong>Renew DHCP Lease</strong>.
          </p>

          <h2 className="text-sm font-bold text-[var(--text-primary)]">When Hardware is Physically Failing</h2>
          <p>
            If your phone's 'No Internet' issue persists across all Wi-Fi networks (including home, office, and public hotspots) while other devices connect easily, your phone's physical hardware may be degrading:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-[11px] text-[var(--text-muted)]">
            <li>
              <strong>Wi-Fi Antenna Flex Cable Wear:</strong> Dropping your smartphone can loosen the micro-coaxial Wi-Fi antenna connector on the motherboard. This attenuates the signal-to-noise ratio, causing connection drops under load.
            </li>
            <li>
              <strong>Silicon RF Front-End Module (FEM) Aging:</strong> The RF chip responsible for amplifying radio waves degrades, leading to high packet corruption rates.
            </li>
          </ul>

          <h2 className="text-sm font-bold text-[var(--text-primary)]">Commercial Intent: Upgrading to Mesh Wi-Fi 6/7</h2>
          <p>
            If you determine that your old router cannot handle the dense packet demands of multiple smartphones, tablets, and smart devices, it is time to upgrade. A modern **Wi-Fi 6 (802.11ax)** or **Wi-Fi 7** router is specifically designed to handle dense client environments. They utilize MU-MIMO and OFDMA to broadcast to multiple mobile devices concurrently, avoiding the packet queue bottlenecks that cause mobile connections to time out.
          </p>
        </article>
      </div>
    </TroubleshootingArticleShell>
  );
}
