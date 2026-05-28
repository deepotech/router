import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import TroubleshootingArticleShell from "@/components/tools/TroubleshootingArticleShell";
import ConnectionOptimizerClient from "@/components/tools/ConnectionOptimizerClient";

export const metadata: Metadata = buildMetadata({
  title: "Default Gateway Not Available? Fix Gateway Connection Issues",
  description:
    "Is your computer showing a 'Default Gateway is Not Available' error? Learn how to reset your TCP/IP stack, configure driver power settings, and resolve gateway failures.",
  canonical: "/default-gateway-not-available",
  keywords: [
    "default gateway not available",
    "fix gateway connection issues",
    "gateway is unreachable",
    "gateway ip address mismatch",
    "ethernet no default gateway",
    "default gateway blank"
  ],
});

const breadcrumbs = [
  { name: "Router Problems", url: "/router-keeps-restarting" },
  { name: "Default Gateway Not Available", url: "/default-gateway-not-available" },
];

const troubleshootingSteps = [
  {
    title: "Inspect Adapter Power Management Settings",
    description: "On Windows, open Device Manager, expand Network Adapters, right-click your adapter (Intel/Realtek), and select Properties. Under the Power Management tab, uncheck 'Allow the computer to turn off this device to save power'.",
    tip: "Power-saving sleep states frequently lock up the network adapter's physical transceiver (PHY), causing it to fail to process gateway keepalive frames."
  },
  {
    title: "Query Mapped Routes and ARP Cache States",
    description: "Open an elevated command interface. Execute 'route print' to ensure the default route (0.0.0.0/0) points to your router's actual LAN IP. Run 'arp -a' to verify if the router's physical MAC address is successfully mapped.",
    tip: "A stale or incorrect gateway MAC entry in your ARP cache will redirect local packets to a dead network node."
  },
  {
    title: "Execute TCP/IP Stack & Winsock Catalog Reset",
    description: "Reset the network interface catalog. Run 'netsh int ip reset' and 'netsh winsock reset' in an administrator command prompt. Reboot the computer immediately afterward.",
    tip: "This purges corrupted socket configurations, third-party LSP blocks, and routing tables altered by VPN software."
  },
  {
    title: "Verify Router DHCP Option 3 Gateway Settings",
    description: "Log into the router dashboard using its local IP. Navigate to LAN/DHCP settings and verify that the Gateway IP (DHCP Option 3) matches the router's LAN IP exactly. If it is blank or incorrect, clients will connect but receive no default gateway path.",
    tip: "If Option 3 is misconfigured, devices will obtain local IPs but will have a blank default gateway, blocking internet routing."
  },
  {
    title: "Disable Active Co-Processor Security Software",
    description: "Uninstall packet-level monitoring utilities (e.g., Smart Connect packages, Killer Control Center, or third-party antivirus web shields). These tools hook into the network stack and drop outbound gateway queries.",
    tip: "Third-party packet inspection software often causes driver timeouts that present as gateway disconnected errors."
  }
];

const faqs = [
  {
    question: "Why does my computer report that the default gateway is not available?",
    answer: "This error is triggered when the operating system's network diagnostics utility fails to receive ICMP echo replies (pings) or ARP responses from the configured gateway IP address. It indicates that the path between the adapter and the router has dropped at Layer 2 (ARP mapping) or Layer 3 (Routing Table configuration)."
  },
  {
    question: "Why does restarting my computer temporarily resolve the gateway issue?",
    answer: "Restarting resets the network interface controller (NIC) driver, rebuilds the TCP/IP stack from registry values, clears the local ARP cache containing corrupt MAC mappings, and initiates a new DHCP lease request. If the root cause is driver thermal throttling or memory leak, restarting temporarily clears the error state."
  },
  {
    question: "Why is the default gateway blank in my ipconfig output?",
    answer: "A blank default gateway indicates that your adapter completed physical port auto-negotiation (Layer 1/2) but did not receive a default gateway route (DHCP Option 3) during the DHCP handshake. This happens if the router's DHCP daemon is unresponsive, if MAC filtering is active, or if you have manually assigned a static IP without entering a gateway address."
  },
  {
    question: "Can third-party antivirus firewall applications cause gateway unreachable errors?",
    answer: "Yes. Many antivirus solutions install custom Layered Service Providers (LSPs) or virtual network filters to scan web traffic. If these filters hang or conflict with a system update, they will drop outgoing UDP and TCP packets, blocking the client from communicating with the gateway."
  },
  {
    question: "How do I manually configure a static default gateway IP?",
    answer: "Go to your operating system's network adapter settings, right-click your connection, select properties, and select IPv4. Toggle to manual settings, enter an IP address in your subnet range (e.g., 192.168.1.150), enter subnet mask 255.255.255.0, and enter your router's LAN IP (e.g., 192.168.1.1) in the Default Gateway field."
  },
  {
    question: "What is the difference between a default gateway and an IP address?",
    answer: "Your IP address is the unique identity of your device on the local subnet, allowing other local nodes to address packets to it. The default gateway is the IP address of the router interface connected to the LAN. It serves as the exit route for all packets destined for addresses outside the local subnet (e.g., the internet)."
  }
];

const commonCauses = [
  {
    title: "NIC Sleep State Activation",
    desc: "Windows turns off the network adapter to save power, blocking the adapter's physical layer from receiving router routing frames."
  },
  {
    title: "Winsock Catalog Corruption",
    desc: "VPN software or antivirus agents modify network sockets and fail to clean up, dropping outgoing gateway routing paths."
  },
  {
    title: "Duplicate Gateway Metric Weights",
    desc: "Active Wi-Fi and Ethernet connections assigned with equal metric values confuse the OS routing decision engine."
  },
  {
    title: "DHCP Option 3 Misalignment",
    desc: "The router's DHCP daemon broadcasts an incorrect gateway address (or leaves it blank), depriving clients of an exit route."
  }
];

const quickFixChecklist = [
  "Disable network adapter power-saving sleep options in Device Manager.",
  "Run 'netsh int ip reset' and 'netsh winsock reset' in an admin command prompt.",
  "Ensure the default gateway IP address matches your router's LAN IP address.",
  "Uninstall Killer Control Center or Realtek Dragon bandwidth control packages.",
  "Disconnect any active VPN clients or custom web proxies."
];

export default function DefaultGatewayNotAvailablePage() {
  return (
    <TroubleshootingArticleShell
      h1="Default Gateway Not Available? Fix Gateway Connection Issues"
      intro="If your computer displays a 'Default Gateway is Not Available' diagnostic result or drops connections with a yellow warning triangle, your system has lost its Layer 3 exit route. Discover how to disable power-saving driver bugs, reset socket bindings, resolve ARP conflicts, and restore gateway communications."
      category="nat"
      breadcrumbs={breadcrumbs}
      faqs={faqs}
      troubleshootingSteps={troubleshootingSteps}
      warningBanner={{
        title: "Default Gateway Subnet Warning",
        text: "Manually configuring a default gateway that lies outside your current IP subnet mask (e.g., IP: 192.168.1.50 with Gateway: 192.168.0.1) creates an unroutable configuration. The OS will reject the route, blocking all outbound traffic."
      }}
      quickFixChecklist={quickFixChecklist}
      commonCauses={commonCauses}
      whenToContactISP="If the default gateway remains unreachable across multiple devices even after configuring static IPs and connecting directly to the main modem, the ISP gateway's switch controller chip may have failed. Contact your ISP to replace the residential gateway or modem unit."
      severityLevel="high"
    >
      <div className="space-y-6">
        {/* Quick Answer Snippet for AI Search Engines */}
        <section className="glass-card p-5 border border-amber-950/20 bg-amber-950/5 rounded-2xl relative overflow-hidden" aria-label="Quick Answer Summary">
          <div className="absolute top-0 right-0 bg-amber-500/10 text-amber-400 text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-bl-lg font-bold">
            AIO Quick Answer
          </div>
          <h3 className="text-xs font-bold text-amber-400 mb-2 uppercase tracking-wide">Quick Diagnostic Summary</h3>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            The &ldquo;Default Gateway is Not Available&rdquo; error occurs when a device&apos;s network adapter drops Layer 3 routing parameters. This is typically caused by **NIC power-saving sleep states**, **Winsock catalog corruption**, or **firewall interference**. Resolve this immediately by disabling power management savings in Device Manager and running <code className="font-mono text-amber-300">netsh int ip reset</code> in an elevated terminal to rebuild the routing stack.
          </p>
        </section>

        {/* Interactive Troubleshooting Wizard */}
        <ConnectionOptimizerClient mode="ethernet-no-internet" />

        {/* Technical Article Body */}
        <article className="prose prose-invert max-w-none space-y-6 text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
          
          <h2 className="text-sm font-bold text-[var(--text-primary)]">Why Does Restarting Temporarily Fix the Issue?</h2>
          <p>
            Many users experience a frustrating cycle: their connection drops, they run Windows Network Diagnostics which reports &ldquo;Fixed&rdquo; or they reboot their PC, and the internet works temporarily before dropping again. This pattern occurs due to the following internal mechanics:
          </p>
          <ul className="list-disc pl-5 space-y-3 text-[11px] text-[var(--text-muted)]">
            <li>
              <strong>ARP Cache Refresh:</strong> When a device reboots, it clears its Address Resolution Protocol (ARP) cache. If the gateway drop was caused by an IP conflict or incorrect MAC-to-IP mapping, rebooting forces a fresh ARP request to map the router&apos;s MAC address cleanly.
            </li>
            <li>
              <strong>DHCP Lease Renewal:</strong> Rebooting initiates a new DHCP lease handshake. If the lease had expired or was de-allocated on the router, rebooting secures a fresh allocation and options scope.
            </li>
            <li>
              <strong>NIC Driver Reset:</strong> If the network interface card (NIC) went into a sleep state or suffered a buffer overflow, restarting reinitializes the driver, restoring the physical transceiver (PHY) to a fully active state.
            </li>
            <li>
              <strong>TCP/IP Stack Rebuild:</strong> Outbound packets depend on temporary registry sockets. Rebooting closes orphan sockets and rebuilds the routing table, resolving temporary bottlenecks.
            </li>
          </ul>

          <h2 className="text-sm font-bold text-[var(--text-primary)]">Intel vs. Realtek Gateway Failures</h2>
          <p>
            Different network controller manufacturers utilize unique drivers and power configurations. The table below outlines common hardware-specific failures and how to resolve them:
          </p>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-[11px] text-[var(--text-secondary)]">
              <thead>
                <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                  <th className="px-3 py-2 text-left">Adapter / Controller</th>
                  <th className="px-3 py-2 text-left">Common Gateway Failure</th>
                  <th className="px-3 py-2 text-left">Primary Fix</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)]">
                <tr>
                  <td className="px-3 py-2 font-mono text-cyan-400">Intel I219-V / AX200 / AX211</td>
                  <td className="px-3 py-2">Energy Efficient Ethernet (EEE) power savings throttle down the link, dropping gateway synchronization.</td>
                  <td className="px-3 py-2">Open Adapter Properties, go to Advanced, and disable &ldquo;Energy Efficient Ethernet&rdquo; and &ldquo;Ultra Low Power Mode&rdquo;.</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-mono text-cyan-400">Realtek PCIe GbE Family Controller</td>
                  <td className="px-3 py-2">The driver enters a sleep state under low network utilization and fails to wake up, dropping default gateway routing.</td>
                  <td className="px-3 py-2">Go to Power Management tab, uncheck &ldquo;Allow the computer to turn off this device to save power&rdquo;, and disable &ldquo;Green Ethernet&rdquo;.</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-mono text-cyan-400">Killer E2500 / E3100 (Killer NIC)</td>
                  <td className="px-3 py-2">Killer Control Center bandwidth prioritization driver crashes, dropping outbound gateway UDP/TCP packets.</td>
                  <td className="px-3 py-2">Uninstall Killer Control Center software, and install the bare driver package from the manufacturer website.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-sm font-bold text-[var(--text-primary)]">What Is Happening Internally? The Default Gateway Layer 3 Routing Process</h2>
          <p>
            The default gateway is the door to the internet. When your device wants to send a packet to an IP address outside your local subnet (for example, Google&apos;s DNS at <code className="font-mono">8.8.8.8</code>), the operating system checks its local routing table.
          </p>
          <p>
            If no specific route matches the destination IP, the OS falls back to the **default route** (represented as <code className="font-mono">0.0.0.0</code> with subnet mask <code className="font-mono">0.0.0.0</code>, or <code className="font-mono">0.0.0.0/0</code>). This route points to the default gateway address (e.g., <code className="font-mono">192.168.1.1</code>). The operating system then broadcasts an **ARP request** to resolve the MAC address of the gateway IP. Once it receives the MAC address, it encapsulates the IP packet into a Layer 2 frame and sends it to the router&apos;s physical interface.
          </p>
          <p>
            If the gateway is blank or unreachable, the OS cannot resolve the gateway&apos;s MAC address. Outbound packets cannot be encapsulated, and the stack drops the traffic, displaying the &ldquo;Default Gateway is Not Available&rdquo; error.
          </p>

          <div className="p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-2">
            <span className="font-bold text-[var(--text-primary)] block text-xs">Deep Diagnostics & Internal Authority Links</span>
            <ul className="list-disc pl-4 space-y-1 text-[11px]">
              <li>If the gateway is blank because the router fails to lease IP addresses, read our <a href="/router-not-assigning-ip-addresses" className="text-[var(--brand-400)] hover:underline">DHCP Server Allocation Fix</a>.</li>
              <li>Troubleshoot overall Ethernet packet routing failures in our <a href="/ethernet-connected-but-no-internet" className="text-[var(--brand-400)] hover:underline">Ethernet Connected but No Internet Guide</a>.</li>
              <li>Learn how physical port negotiation caps routing speeds in our <a href="/ethernet-slower-than-wifi" className="text-[var(--brand-400)] hover:underline">Ethernet Slower than Wi-Fi Walkthrough</a>.</li>
              <li>Is your router gateway constantly rebooting under load? See our <a href="/router-keeps-restarting" className="text-[var(--brand-400)] hover:underline">Router Power Instability Debug Guide</a>.</li>
              <li>Check your DNS paths once the default gateway is restored with our <a href="/best-dns-for-faster-internet" className="text-[var(--brand-400)] hover:underline">Best DNS Settings Optimizer</a>.</li>
            </ul>
          </div>

          <h2 className="text-sm font-bold text-[var(--text-primary)]">Advanced Diagnostic Commands</h2>
          <p>
            Open PowerShell or Command Prompt as an Administrator and execute these diagnostic commands to analyze your gateway routing health:
          </p>

          <h3 className="text-xs font-bold text-[var(--text-primary)]">1. Query ARP Mapping Tables</h3>
          <pre className="p-3 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-lg font-mono text-[10px] text-green-400">
            arp -a
          </pre>
          <p className="text-[11px] text-[var(--text-muted)]">
            <strong>Diagnostic Check:</strong> Look for your default gateway IP (e.g., 192.168.1.1). If the MAC address shows as <code className="font-mono">00-00-00-00-00-00</code> or is missing, your system is failing to resolve the router&apos;s physical interface.
          </p>

          <h3 className="text-xs font-bold text-[var(--text-primary)]">2. Print System Routing Tables</h3>
          <pre className="p-3 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-lg font-mono text-[10px] text-green-400">
            route print
          </pre>
          <p className="text-[11px] text-[var(--text-muted)]">
            <strong>Diagnostic Check:</strong> Inspect the IPv4 Route Table under Active Routes. The destination list must contain a route for <code className="font-mono">0.0.0.0</code> with Netmask <code className="font-mono">0.0.0.0</code> pointing to your gateway IP. If multiple routes exist with equal metrics, your OS will struggle to select a path.
          </p>

          <h3 className="text-xs font-bold text-[var(--text-primary)]">3. Ping the Gateway IP</h3>
          <pre className="p-3 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-lg font-mono text-[10px] text-green-400">
            ping 192.168.1.1
          </pre>
          <p className="text-[11px] text-[var(--text-muted)]">
            <strong>Diagnostic Check:</strong> If ping replies are successful but you still cannot load web pages, your local connection is healthy, and the issue lies downstream with the ISP WAN link or local DNS. If the ping times out, your local link is dropping packets.
          </p>

          <h3 className="text-xs font-bold text-[var(--text-primary)]">4. Trace Route Outward</h3>
          <pre className="p-3 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-lg font-mono text-[10px] text-green-400">
            tracert 8.8.8.8
          </pre>
          <p className="text-[11px] text-[var(--text-muted)]">
            <strong>Diagnostic Check:</strong> The first hop of the route trace must point to your gateway IP. If the trace fails at hop 1, the connection is dropping between your device and the router.
          </p>

          <h3 className="text-xs font-bold text-[var(--text-primary)]">5. Reset Winsock Sockets</h3>
          <pre className="p-3 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-lg font-mono text-[10px] text-green-400">
            netsh winsock reset
          </pre>
          <p className="text-[11px] text-[var(--text-muted)]">
            <strong>Diagnostic Check:</strong> If this command resolves the issue after a reboot, the drop was caused by a corrupted network socket catalog or third-party packet injection layer.
          </p>

          <h2 className="text-sm font-bold text-[var(--text-primary)]">How ISPs Detect Gateway Instability Remotely</h2>
          <p>
            Your ISP monitors network paths to identify performance bottlenecks before they impact subscriber service:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-[11px] text-[var(--text-muted)]">
            <li>
              <strong>CMTS Telemetry:</strong> Cable providers monitor upstream and downstream power levels on the Cable Modem Termination System (CMTS). High noise ratios on these channels alert the provider to physical line degradation.
            </li>
            <li>
              <strong>Packet Loss Metrics:</strong> ISP routers monitor round-trip times and packet loss on customer links. High drop rates indicate congestion or failing transceiver hardware.
            </li>
            <li>
              <strong>Excessive ARP Queries:</strong> If a local network loop exists on your LAN, it will flood the link with broadcast traffic. The gateway will log this high volume of ARP requests and may rate-limit the port to protect the network.
            </li>
          </ul>
        </article>
      </div>
    </TroubleshootingArticleShell>
  );
}
