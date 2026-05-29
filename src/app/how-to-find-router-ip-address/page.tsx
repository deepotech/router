import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import TroubleshootingArticleShell from "@/components/tools/TroubleshootingArticleShell";
import ConnectionOptimizerClient from "@/components/tools/ConnectionOptimizerClient";

export const metadata: Metadata = buildMetadata({
  title: "How to Find Your Router IP Address: Locate Default Gateway IP",
  description:
    "Trying to access your router admin console? Learn how to find your router IP address (default gateway) on Windows 11, macOS, Android, iPhone, and Linux.",
  canonical: "/how-to-find-router-ip-address",
  keywords: [
    "how to find router ip address",
    "what is my router ip",
    "default gateway address",
    "how to access router admin page",
    "find gateway ip"
  ],
});

const breadcrumbs = [
  { name: "Router Problems", url: "/router-keeps-restarting" },
  { name: "Find Router IP", url: "/how-to-find-router-ip-address" },
];

const troubleshootingSteps = [
  {
    title: "Retrieve Gateway via OS Command Prompt / Terminal",
    description: "On Windows, open Command Prompt and run 'ipconfig'. On macOS and Linux, open Terminal and run 'ip route' or 'netstat -nr'. Look for the 'Default Gateway' or 'gateway' entry.",
    tip: "If the output shows a blank gateway or an address starting with 169.254.x.x, your device has failed to receive an IP lease from the router via DHCP."
  },
  {
    title: "Inspect System Wi-Fi & Network Properties Menu",
    description: "Go to your operating system's network settings, open active Wi-Fi or Ethernet adapter properties, and look at the connection details. Under IPv4 properties, the default gateway will be displayed.",
    tip: "On mobile devices (Android and iOS), tap the active Wi-Fi network's information or settings icon to reveal the Gateway or Router IP directly."
  },
  {
    title: "Check Router Brand Hardware Defaults",
    description: "If your device is not connected or shows a blank gateway, refer to standard manufacturer default IPs (such as 192.168.1.1, 192.168.0.1, or 10.0.0.1) printed on the physical label on the bottom of the router.",
    tip: "Many routers also support friendly local domains (e.g., routerlogin.net for Netgear, tplinkwifi.net for TP-Link) which redirect to the gateway."
  },
  {
    title: "Deactivate Active Virtual Private Networks (VPNs)",
    description: "Completely disable VPN software before querying your gateway IP. VPN clients modify system routing tables, making your local gateway appear hidden or routing diagnostic queries through the VPN interface instead.",
    tip: "When a VPN is active, commands like 'ipconfig' may still display your true LAN gateway under the physical adapter, but 'route print' will show that all traffic is forced to a virtual tunnel interface."
  }
];

const faqs = [
  {
    question: "Is my router IP address the same as my public IP address?",
    answer: "No. Your router IP address is a private IP address (usually 192.168.1.1 or 192.168.0.1) used strictly on your Local Area Network (LAN) for communication between devices and the gateway. Your public IP address is assigned by your Internet Service Provider (ISP) to your router's WAN port and is visible to the rest of the world on the internet."
  },
  {
    question: "Why is my default gateway field blank in ipconfig?",
    answer: "A blank default gateway indicates your operating system was unable to negotiate a dynamic gateway address with the DHCP server, or a manual static configuration was entered without a gateway. This commonly happens if the router's DHCP pool is exhausted, AP isolation is active, or physical link issues prevent completing the DHCP discover/request exchange."
  },
  {
    question: "Can two routers on the same network use the same gateway IP?",
    answer: "No. If two routers on the same physical broadcast domain share the same IP address, it creates a severe IP address conflict. The devices will experience ARP packet collisions, causing routing tables to fluctuate rapidly and knocking clients off the network. Secondary routers must have their LAN IPs reconfigured (e.g., to 192.168.1.2) and their DHCP servers disabled."
  },
  {
    question: "What happens if I change my router's default IP address?",
    answer: "When you change your router's LAN IP address, the router's DHCP scope updates automatically to match the new subnet prefix (e.g., changing from 192.168.1.1 to 10.0.0.1 moves the subnet to 10.0.0.0/24). All connected client devices will temporarily lose connection and must request a new DHCP lease to receive updated IP configurations."
  },
  {
    question: "Why does a VPN hide or alter my router gateway information?",
    answer: "Active VPN software sets up a virtual network adapter (TUN/TAP) and adds a high-priority default route (0.0.0.0/0 with a low metric) into the system routing table. This redirects all outgoing traffic into the encrypted tunnel rather than sending it to your local router interface. Consequently, routing queries identify the VPN server's exit node as the default route endpoint instead of your local physical gateway."
  },
  {
    question: "How do I access the router admin dashboard once I know the IP address?",
    answer: "Open a modern web browser, type the gateway IP address (e.g., http://192.168.1.1) into the URL address bar, and press Enter. If the page times out or shows a security certificate block, you may need to disable VPNs, connect via an Ethernet cord, or proceed past the browser's HSTS warning."
  }
];

const commonCauses = [
  {
    title: "DHCP Lease Option 3 Omission",
    desc: "The router's DHCP server assigns local IP configurations but fails to transmit Option 3 (the default gateway parameter), leaving clients gateway-less."
  },
  {
    title: "VPN Routing Table Metric Hijacking",
    desc: "Virtual private network adapters insert low-metric override rules that route local traffic into external secure tunnels."
  },
  {
    title: "Access Point (AP) Dynamic Re-assignment",
    desc: "Placing a router into AP mode turns off its internal DHCP server, causing it to grab a dynamic, hard-to-find IP from the main modem."
  },
  {
    title: "IP Subnet Multi-homed Conflicts",
    desc: "Multiple mesh nodes or daisy-chained routers attempting to manage the same 192.168.1.0/24 broadcast domain concurrently."
  }
];

const quickFixChecklist = [
  "Run 'ipconfig' in Windows Command Prompt and find the IPv4 Default Gateway field.",
  "Check the specifications label on the bottom or back of your physical router casing.",
  "Disconnect any active VPN clients or custom proxy tunnels before checking.",
  "Tap the settings gear next to your connected Wi-Fi network on your smartphone.",
  "Ensure you are connected to the main home SSID and not a restrictive Guest network."
];

export default function HowToFindRouterIpAddressPage() {
  return (
    <TroubleshootingArticleShell
      h1="How to Find Your Router IP Address: Locate Default Gateway IP"
      intro="Struggling to access your router's administrative control panel? Finding your router IP address (also known as the default gateway) is the vital first step. Discover how to retrieve your gateway IP using quick OS commands, explore the difference between local and public IPs, and resolve dynamic subnet routing blocks."
      category="nat"
      breadcrumbs={breadcrumbs}
      faqs={faqs}
      troubleshootingSteps={troubleshootingSteps}
      warningBanner={{
        title: "Subnet Connection Warning",
        text: "Make sure you are connected to the router's local network (via Wi-Fi or Ethernet) before checking your gateway IP. If you are not connected, your operating system will not have a gateway registered, showing a blank value or APIPA (169.254.x.x) address."
      }}
      quickFixChecklist={quickFixChecklist}
      commonCauses={commonCauses}
      whenToContactISP="If your gateway IP address is completely blank across all network devices, even when connected directly via Ethernet and after a full factory reset, the router's internal DHCP daemon has failed. Contact your ISP if they supplied the modem-router gateway, or the manufacturer for hardware replacement."
      severityLevel="medium"
    >
      <div className="space-y-6">
        {/* Quick Answer Snippet for AI Search Engines */}
        <section className="glass-card p-5 border border-amber-950/20 bg-amber-950/5 rounded-2xl relative overflow-hidden" aria-label="Quick Answer Summary">
          <div className="absolute top-0 right-0 bg-amber-500/10 text-amber-400 text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-bl-lg font-bold">
            AIO Quick Answer
          </div>
          <h3 className="text-xs font-bold text-amber-400 mb-2 uppercase tracking-wide">Quick Diagnostic Summary</h3>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Your router IP address is your network&apos;s **Default Gateway**. On **Windows**, open Command Prompt, type <code className="font-mono text-cyan-300">ipconfig</code>, and press Enter to find it next to &ldquo;Default Gateway&rdquo;. On **macOS/Linux**, open Terminal and type <code className="font-mono text-cyan-300">ip route</code>. On **iOS/Android**, tap the info icon next to your active Wi-Fi name. Common default IPs are <code className="font-mono text-amber-300">192.168.1.1</code> or <code className="font-mono text-amber-300">192.168.0.1</code>.
          </p>
        </section>

        {/* Interactive Troubleshooting Wizard */}
        <ConnectionOptimizerClient mode="router-admin" />

        {/* Technical Article Body */}
        <article className="prose prose-invert max-w-none space-y-6 text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
          
          {/* Section 2: Symptoms vs Use Cases */}
          <h2 className="text-sm font-bold text-[var(--text-primary)]">Symptoms & Use Cases: Why You Need Your Router IP</h2>
          <p>
            Locating your router&apos;s IP address is necessary for administrative, security, and performance configuration. The table below covers common networking symptoms and the target use cases where retrieving the gateway IP is essential:
          </p>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-[11px] text-[var(--text-secondary)]">
              <thead>
                <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                  <th className="px-3 py-2 text-left">Observed Symptom</th>
                  <th className="px-3 py-2 text-left">Underlying Use Case</th>
                  <th className="px-3 py-2 text-left">Why Find the Router IP?</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)]">
                <tr>
                  <td className="px-3 py-2 font-semibold">Cannot access router login page</td>
                  <td className="px-3 py-2">Router Web Dashboard Configuration</td>
                  <td className="px-3 py-2">Bypasses domain redirect failures (e.g., routerlogin.net failing to load) by navigating directly to the numeric gateway socket.</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-semibold">Forgot administrative credentials</td>
                  <td className="px-3 py-2">Credential Recovery & Password Reset</td>
                  <td className="px-3 py-2">Enables access to the firmware login portal so you can check default passwords or initiate a physical factory reset.</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-semibold">Gateway is showing as blank or missing</td>
                  <td className="px-3 py-2">DHCP Allocation Troubleshooting</td>
                  <td className="px-3 py-2">Diagnoses whether your device is isolated (APIPA IP) or if the local network adapter has lost contact with the router&apos;s DHCP daemon.</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-semibold">Router console loads a different device</td>
                  <td className="px-3 py-2">Double NAT & IP Address Conflict Resolution</td>
                  <td className="px-3 py-2">Reveals if multiple cascaded routers are conflicting on the same gateway subnet, causing cross-device management overlaps.</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-semibold">Mesh nodes fail to sync properly</td>
                  <td className="px-3 py-2">Multi-Node Mesh System Audit</td>
                  <td className="px-3 py-2">Identifies the primary node&apos;s IP address relative to satellite nodes operating in bridge/AP mode, ensuring proper backhaul sync.</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Section 1 added as a Table: Most Common Router IPs (SEO optimization) */}
          <h2 className="text-sm font-bold text-[var(--text-primary)]">Most Common Router Default IP Addresses</h2>
          <p>
            Most router manufacturers use standard private IPv4 ranges defined by RFC 1918. If your diagnostic commands are failing or showing a blank gateway, try entering these highly common manufacturer default IP addresses directly into your web browser:
          </p>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-[11px] text-[var(--text-secondary)]">
              <thead>
                <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                  <th className="px-3 py-2 text-left">Default IP Address</th>
                  <th className="px-3 py-2 text-left">Subnet Range (CIDR)</th>
                  <th className="px-3 py-2 text-left">Common Associated Brands</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)]">
                <tr>
                  <td className="px-3 py-2 font-mono text-cyan-400">192.168.1.1</td>
                  <td className="px-3 py-2 font-mono">192.168.1.0/24</td>
                  <td className="px-3 py-2">ASUS, Linksys, Netgear, TP-Link, Huawei, D-Link</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-mono text-cyan-400">192.168.0.1</td>
                  <td className="px-3 py-2 font-mono">192.168.0.0/24</td>
                  <td className="px-3 py-2">TP-Link, D-Link, Netgear, Tenda</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-mono text-cyan-400">10.0.0.1</td>
                  <td className="px-3 py-2 font-mono">10.0.0.0/24</td>
                  <td className="px-3 py-2">Comcast Xfinity, Apple AirPort, Cisco</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-mono text-cyan-400">192.168.100.1</td>
                  <td className="px-3 py-2 font-mono">192.168.100.0/24</td>
                  <td className="px-3 py-2">Huawei (Modems), ZTE, Motorola, Arris</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-mono text-cyan-400">192.168.8.1</td>
                  <td className="px-3 py-2 font-mono">192.168.8.0/24</td>
                  <td className="px-3 py-2">Huawei (4G/5G Mobile Routers), GL.iNet</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-mono text-cyan-400">192.168.15.1</td>
                  <td className="px-3 py-2 font-mono">192.168.15.0/24</td>
                  <td className="px-3 py-2">Linksys, Vonage</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Section 3: OS-Specific Instructions */}
          <h2 className="text-sm font-bold text-[var(--text-primary)]">Step-by-Step: Find Gateway IP on Any Operating System</h2>
          <p>
            Your network adapter constantly caches routing configurations. Follow these precise platform-specific workflows to query your network adapter&apos;s routing table:
          </p>

          <h3 className="text-xs font-bold text-[var(--text-primary)]">1. Windows 11 & 10 (Using Command Prompt)</h3>
          <ol className="list-decimal pl-5 space-y-2 text-[11px] text-[var(--text-muted)]">
            <li>Press the <kbd className="px-1.5 py-0.5 rounded bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[10px] font-mono">Win + R</kbd> keys to open the Run dialog.</li>
            <li>Type <code className="font-mono text-cyan-400">cmd</code> and press Enter to launch the Command Prompt interface.</li>
            <li>In the console window, type the following command exactly and press Enter:
              <pre className="mt-1.5 p-2 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded font-mono text-[10px] text-green-400">ipconfig</pre>
            </li>
            <li>Scroll through the output to find your active network interface (e.g., &ldquo;Wireless LAN adapter Wi-Fi&rdquo; or &ldquo;Ethernet adapter&rdquo;).</li>
            <li>Locate the line labeled <strong className="text-[var(--text-primary)]">Default Gateway</strong>. The numeric IP to the right is your router&apos;s IP address.</li>
          </ol>

          <h3 className="text-xs font-bold text-[var(--text-primary)]">2. macOS (System Settings & Terminal)</h3>
          <p className="text-[11px] text-[var(--text-muted)]">
            <strong>Via Terminal:</strong> Open the Terminal app, type the routing query command below, and press Enter:
          </p>
          <pre className="p-2 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded font-mono text-[10px] text-green-400">netstat -nr | grep default</pre>
          <p className="text-[11px] text-[var(--text-muted)]">
            <strong>Via System Settings:</strong> Click the Apple icon → select <strong className="text-[var(--text-primary)]">System Settings</strong> → click <strong className="text-[var(--text-primary)]">Network</strong> → select your active Wi-Fi or Ethernet connection → click <strong className="text-[var(--text-primary)]">Details</strong> → click the <strong className="text-[var(--text-primary)]">TCP/IP</strong> tab. The IP will be displayed next to &ldquo;Router&rdquo;.
          </p>

          <h3 className="text-xs font-bold text-[var(--text-primary)]">3. Linux Distributions (CLI)</h3>
          <p className="text-[11px] text-[var(--text-muted)]">
            Linux systems map IP routes in the kernel. Open your terminal emulator and execute either of the following commands:
          </p>
          <pre className="p-2 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded font-mono text-[10px] text-green-400">ip route show | grep default</pre>
          <p className="text-[11px] text-[var(--text-muted)]">
            Or the legacy net-tools command:
          </p>
          <pre className="p-2 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded font-mono text-[10px] text-green-400">route -n</pre>
          <p className="text-[11px] text-[var(--text-muted)]">
            The gateway IP address will be located under the &ldquo;gateway&rdquo; or &ldquo;via&rdquo; column next to destination route <code className="font-mono">0.0.0.0</code>.
          </p>

          <h3 className="text-xs font-bold text-[var(--text-primary)]">4. iPhone & iPad (iOS Settings)</h3>
          <ol className="list-decimal pl-5 space-y-1 text-[11px] text-[var(--text-muted)]">
            <li>Open the system <strong className="text-[var(--text-primary)]">Settings</strong> app.</li>
            <li>Tap on <strong className="text-[var(--text-primary)]">Wi-Fi</strong>.</li>
            <li>Locate your currently connected Wi-Fi network (marked with a blue checkmark) and tap the blue <strong className="text-[var(--text-primary)]">info (&ldquo;i&rdquo;) icon</strong> on the right.</li>
            <li>Scroll down to the IPv4 Address section. Locate the field labeled <strong className="text-[var(--text-primary)]">Router</strong>. The IP shown is your gateway.</li>
          </ol>

          <h3 className="text-xs font-bold text-[var(--text-primary)]">5. Android Devices</h3>
          <ol className="list-decimal pl-5 space-y-1 text-[11px] text-[var(--text-muted)]">
            <li>Open your Android device <strong className="text-[var(--text-primary)]">Settings</strong> menu.</li>
            <li>Navigate to <strong className="text-[var(--text-primary)]">Network & Internet</strong> → tap <strong className="text-[var(--text-primary)]">Internet</strong> (or <strong className="text-[var(--text-primary)]">Wi-Fi</strong> depending on device manufacturer).</li>
            <li>Tap the <strong className="text-[var(--text-primary)]">settings gear icon</strong> next to your active network name.</li>
            <li>Tap <strong className="text-[var(--text-primary)]">Network Details</strong> or scroll down. Locate the entry labeled <strong className="text-[var(--text-primary)]">Gateway</strong>.</li>
            <li>If it is not visible, toggle IP settings from &ldquo;DHCP&rdquo; to &ldquo;Static&rdquo; to expose the pre-populated greyed-out Gateway IP value. <em>(Remember to toggle it back to DHCP afterward to avoid static conflicts.)</em></li>
          </ol>

          <h3 className="text-xs font-bold text-[var(--text-primary)]">6. PS5 & Xbox Gaming Consoles</h3>
          <p className="text-[11px] text-[var(--text-muted)]">
            <strong>PlayStation 5:</strong> Go to Settings → Network → Connection Status → select <strong className="text-[var(--text-primary)]">View Connection Status</strong>. Look for the Default Gateway line.
            <br />
            <strong>Xbox Series X/S:</strong> Go to Settings → General → Network Settings → select <strong className="text-[var(--text-primary)]">Advanced Settings</strong>. The gateway IP address will be displayed on the right sidebar along with subnet and IP configurations.
          </p>

          {/* Section: Why your router IP changed */}
          <h2 className="text-sm font-bold text-[var(--text-primary)]">Why Your Router IP Address Changed</h2>
          <p>
            Many users find that their router&apos;s IP address is no longer what it used to be. Understanding why the gateway IP shifts is critical to avoiding duplicate NAT routing loops and access timeouts. Here are the four primary factors that cause a router IP to change:
          </p>
          <ul className="list-disc pl-5 space-y-3 text-[11px] text-[var(--text-muted)]">
            <li>
              <strong>Upstream WAN-LAN Conflict (ISP Modems):</strong> When you connect a personal router to an ISP-provided modem/router combo, both units may attempt to claim the default <code className="font-mono">192.168.1.1</code> IP address. Modern routers detect this IP collision on their WAN port and will automatically shift their own LAN IP to a different subnet (e.g., <code className="font-mono">192.168.2.1</code> or <code className="font-mono text-cyan-400">192.168.50.1</code>) to prevent a routing lockup.
            </li>
            <li>
              <strong>Access Point (AP) Mode Activation:</strong> Setting a router to AP or Bridge mode turns off its internal DHCP server and routing engine. Instead of hosting its own subnet, it acts as a network bridge and requests a dynamic IP address from the primary gateway&apos;s DHCP pool. You must search the main router&apos;s client tables to locate the AP&apos;s new dynamic console IP.
            </li>
            <li>
              <strong>Mesh System Satellite Re-routing:</strong> In a mesh network, only the primary node hooked to the modem acts as the Layer 3 gateway. The secondary satellite nodes operate in bridge mode. If a satellite node is rebooted, it may be assigned a new management IP address by the primary node&apos;s DHCP daemon, altering the address used to access that specific node&apos;s debug panel.
            </li>
            <li>
              <strong>Manual Configuration Restores:</strong> Restoring router settings from a backup file or executing a factory reset will revert any custom IP assignments back to the manufacturer&apos;s default IP (e.g., reverting from a custom <code className="font-mono">10.0.0.1</code> back to the default <code className="font-mono">192.168.1.1</code>).
            </li>
          </ul>

          {/* Section 4: Deep Technical Section */}
          <h2 className="text-sm font-bold text-[var(--text-primary)]">Deep Technical Analysis: How Devices Discover the Gateway</h2>
          <p>
            How does an operating system magically know where to send packets destined for the internet? This process relies on tight integration between Layer 2 (Data Link) and Layer 3 (Network) layers:
          </p>

          <h3 className="text-xs font-bold text-[var(--text-primary)]">1. DHCP Option 3 (Router Option Assignment)</h3>
          <p>
            When a device connects to a network, it broadcasts a <code className="font-mono text-cyan-400">DHCPDISCOVER</code> packet. The router&apos;s DHCP daemon replies with a unicast lease offer containing crucial parameters defined in RFC 2132. Specifically, <strong className="text-[var(--text-primary)]">DHCP Option 3</strong> carries the gateway parameter — a list of IP addresses for routers on the client&apos;s subnet. The operating system parses this option and immediately binds the address as its active default gateway route.
          </p>

          <h3 className="text-xs font-bold text-[var(--text-primary)]">2. Layer 2 to Layer 3 Transition via ARP</h3>
          <p>
            If a client device wants to load a website, it must send packets outside its local subnet (e.g., to IP address <code className="font-mono">142.250.190.46</code>). The OS checks its routing table and sees that this target does not belong to the local subnet mask range. It routes the packet to the default gateway IP.
          </p>
          <p>
            However, network switches only understand physical MAC addresses at Layer 2. The client must resolve the router&apos;s physical interface. It broadcasts an <strong className="text-[var(--text-primary)]">ARP Request</strong>: <em>&ldquo;Who has 192.168.1.1? Tell 192.168.1.50.&rdquo;</em> The router responds with its physical MAC address. The client caches this in its ARP mapping table, encapsulates the IP packet into a Layer 2 Ethernet frame, and sends it directly to the gateway&apos;s network interface port.
          </p>

          <div className="p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-2">
            <span className="font-bold text-[var(--text-primary)] block text-xs">Technical Troubleshooting Authority Links</span>
            <ul className="list-disc pl-4 space-y-1 text-[11px]">
              <li>If the IP is correct but the console won&apos;t load, read our <a href="/router-login-not-working" className="text-[var(--brand-400)] hover:underline">Router Login Not Working Diagnostic</a>.</li>
              <li>Is your OS gateway throwing active error triangles? Check the <a href="/default-gateway-not-available" className="text-[var(--brand-400)] hover:underline">Default Gateway Not Available Guide</a>.</li>
              <li>Learn why the DHCP server might fail to lease addresses in our <a href="/router-not-assigning-ip-addresses" className="text-[var(--brand-400)] hover:underline">DHCP Server Allocation Guide</a>.</li>
              <li>Once you access your admin page, find optimal performance configs in our <a href="/best-dns-for-faster-internet" className="text-[var(--brand-400)] hover:underline">Best DNS Settings Guide</a>.</li>
            </ul>
          </div>

          <h3 className="text-xs font-bold text-[var(--text-primary)]">3. IPv4 vs. IPv6 Local Gateway Handling</h3>
          <p>
            In IPv4 networks, the gateway is represented by a private IPv4 unicast address assigned by DHCP or manual entry.
            <br />
            In IPv6 networks, gateway discovery is handled dynamically via **Neighbor Discovery Protocol (NDP)** rather than relying on DHCPv6. Routers periodically multicast **Router Advertisement (RA)** packets containing their local Link-Local IPv6 address (which always begins with the prefix <code className="font-mono text-cyan-400">fe80::</code>). Client devices capture these advertisements and bind the router&apos;s link-local address as their active default IPv6 gateway interface.
          </p>

          {/* Section 5: Brand Table */}
          <h2 className="text-sm font-bold text-[var(--text-primary)]">Default Gateway IPs & URLs by Brand</h2>
          <p>
            Manufacturers construct firmware to recognize dedicated DNS domains which intercept requests and point local browsers to the dashboard. The table below lists default details for top global router brands:
          </p>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-[11px] text-[var(--text-secondary)]">
              <thead>
                <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                  <th className="px-3 py-2 text-left">Router Manufacturer</th>
                  <th className="px-3 py-2 text-left">Default Gateway IP</th>
                  <th className="px-3 py-2 text-left">Friendly Access URL</th>
                  <th className="px-3 py-2 text-left">Default Login Credentials</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)]">
                <tr>
                  <td className="px-3 py-2 font-semibold">TP-Link</td>
                  <td className="px-3 py-2 font-mono">192.168.0.1 / 192.168.1.1</td>
                  <td className="px-3 py-2 font-mono">http://tplinkwifi.net</td>
                  <td className="px-3 py-2">admin / admin (or printed on label)</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-semibold">ASUS</td>
                  <td className="px-3 py-2 font-mono">192.168.50.1 / 192.168.1.1</td>
                  <td className="px-3 py-2 font-mono">http://router.asus.com</td>
                  <td className="px-3 py-2">Unique user setup on first boot</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-semibold">Netgear</td>
                  <td className="px-3 py-2 font-mono">192.168.1.1 / 192.168.0.1</td>
                  <td className="px-3 py-2 font-mono">http://routerlogin.net</td>
                  <td className="px-3 py-2">admin / password</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-semibold">Linksys</td>
                  <td className="px-3 py-2 font-mono">192.168.1.1 / 192.168.15.1</td>
                  <td className="px-3 py-2 font-mono">http://myrouter.local</td>
                  <td className="px-3 py-2">admin / admin (or blank / admin)</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-semibold">Huawei</td>
                  <td className="px-3 py-2 font-mono">192.168.3.1 / 192.168.8.1</td>
                  <td className="px-3 py-2 font-mono">http://192.168.3.1</td>
                  <td className="px-3 py-2">admin / admin (or printed on label)</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-semibold">ZTE</td>
                  <td className="px-3 py-2 font-mono">192.168.1.1 / 192.168.0.1</td>
                  <td className="px-3 py-2 font-mono">http://192.168.1.1</td>
                  <td className="px-3 py-2">admin / admin</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Section 6: Advanced Troubleshooting */}
          <h2 className="text-sm font-bold text-[var(--text-primary)]">Advanced Gateway Diagnostics & Edge Cases</h2>
          <p>
            In complex network topology setups, standard IP command queries often output confusing parameters. Use this advanced workflow checklist to troubleshoot abnormal gateway results:
          </p>

          <h3 className="text-xs font-bold text-[var(--text-primary)]">1. The Gateway Field is Blank</h3>
          <p>
            If your default gateway is entirely blank or displays <code className="font-mono text-cyan-400">0.0.0.0</code>, your operating system is unable to establish an exit route. 
            <br />
            <strong>Fix Action:</strong> Ensure your network card driver power-saving properties are disabled. Open an elevated command shell and execute:
          </p>
          <pre className="p-2 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded font-mono text-[10px] text-green-400">netsh int ip reset
ipconfig /renew</pre>
          <p>
            This forces the OS network stack registry back to zero and triggers a fresh DHCP request to bind Option 3.
          </p>

          <h3 className="text-xs font-bold text-[var(--text-primary)]">2. Client Mapped to the Wrong Subnet Prefix</h3>
          <p>
            If you have manually configured a static IP that belongs to a different subnet mask class than the router (e.g., Device Static IP <code className="font-mono">192.168.5.50</code> with Router Gateway IP <code className="font-mono">192.168.1.1</code>), the OS routing engine will mark the gateway as unreachable. Outbound packets will drop at the network stack.
            <br />
            <strong>Fix Action:</strong> Revert the network adapter properties back to &ldquo;Obtain an IP address automatically (DHCP)&rdquo; to allow the router to align your device subnet correctly.
          </p>

          <h3 className="text-xs font-bold text-[var(--text-primary)]">3. Double NAT & ISP Modem Combos</h3>
          <p>
            If your home layout uses a personal router connected to a modem provided by your ISP, both devices might be attempting to act as DHCP servers. This creates dual overlapping subnets (e.g., ISP modem assigning 192.168.1.x and your router assigning 192.168.1.x).
            <br />
            <strong>Fix Action:</strong> Log into the ISP modem console directly (bypass your personal router temporarily to access it) and toggle its mode to <strong className="text-[var(--text-primary)]">Bridge Mode</strong> or IP Passthrough. This disables its DHCP capabilities, allowing your personal router to take sole control of IP and gateway parameters.
          </p>
        </article>
      </div>
    </TroubleshootingArticleShell>
  );
}
