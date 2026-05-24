import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import TroubleshootingArticleShell from "@/components/tools/TroubleshootingArticleShell";
import ConnectionOptimizerClient from "@/components/tools/ConnectionOptimizerClient";

export const metadata: Metadata = buildMetadata({
  title: "How to Change DNS on Your Router: ASUS, TP-Link, Netgear (2026)",
  description:
    "Learn how to configure custom DNS resolvers on your router. Step-by-step guides for TP-Link, ASUS, Netgear, Linksys, and IPv6 DNS propagation settings.",
  canonical: "/how-to-change-dns-on-router",
  keywords: [
    "how to change dns on router",
    "set custom dns router",
    "configure dns router",
    "ASUS WAN DNS settings",
    "TP-Link DHCP DNS setup",
    "IPv6 resolver configuration"
  ],
});

const breadcrumbs = [
  { name: "DNS Guides", url: "/best-dns-for-faster-internet" },
  { name: "How to Change DNS on Router", url: "/how-to-change-dns-on-router" },
];

const troubleshootingSteps = [
  {
    title: "Access the Router Administration Web Portal",
    description: "Open your web browser and enter your router's default gateway IP (usually 192.168.1.1, 192.168.0.1, or 192.168.50.1) in the URL bar. Enter your administrative credentials to log in.",
    tip: "Disconnect any active VPN clients on your computer before attempting to access the local gateway page."
  },
  {
    title: "Locate WAN or Internet Settings (Recommended Path)",
    description: "Navigate to the advanced WAN, Internet, or DHCP Server settings tab. TP-Link hosts this under 'DHCP Server', ASUS under 'WAN', and Netgear under 'Internet'.",
    tip: "Configuring DNS under DHCP settings pushes custom IPs directly to your clients, which is faster than WAN-side relaying."
  },
  {
    title: "Enter Custom Primary & Secondary IPv4 Addresses",
    description: "Toggle the DNS IP mode from 'Automatic / Assign by ISP' to 'Manual / Use These Servers'. Enter your target resolver IPs (e.g., Cloudflare: 1.1.1.1 and 1.0.0.1; Google: 8.8.8.8 and 8.8.4.4). Save changes.",
  },
  {
    title: "Configure Custom IPv6 Resolvers (Optional)",
    description: "If your ISP supports IPv6, navigate to the IPv6 settings tab. Set DNS to manual, and enter secure IPv6 resolvers (e.g. Cloudflare: 2606:4700:4700::1111 and 2606:4700:4700::1001). Save and restart your router.",
    tip: "Failing to update IPv6 resolvers while keeping IPv6 active allows client devices to bypass your custom IPv4 DNS settings, using the ISP's default IPv6 servers."
  }
];

const faqs = [
  {
    question: "Should I configure DNS on my router or my individual devices?",
    answer: "Configuring DNS at the router level is the most efficient method because it automatically applies custom, high-speed, or secure DNS resolvers to every connected device on your network, including smart TVs, gaming consoles, and smart home appliances."
  },
  {
    question: "Why do my devices still use the old ISP DNS after changing the router settings?",
    answer: "Client devices cache DNS parameters for the duration of their DHCP lease. To force your devices to pull the updated DNS settings instantly, you must power cycle your router or toggle Wi-Fi OFF and ON on your devices."
  },
  {
    question: "What happens if my custom DNS server goes offline?",
    answer: "If both your primary and secondary custom DNS servers go offline, your devices will fail to resolve hostnames, showing 'DNS_PROBE_FINISHED_NXDOMAIN' errors. Always configure a reliable secondary resolver from a different network (e.g. Primary Cloudflare 1.1.1.1, Secondary Google 8.8.4.4)."
  }
];

const commonCauses = [
  {
    title: "WAN vs. DHCP Mappings",
    desc: "Configuring DNS solely on the WAN port, forcing queries through the router's under-powered local dnsmasq forwarder."
  },
  {
    title: "Leaked IPv6 Resolvers",
    desc: "Failing to update IPv6 DNS settings, allowing devices to bypass custom IPv4 rules via default ISP IPv6 paths."
  },
  {
    title: "Stale DHCP Leases",
    desc: "Connected clients keeping old DNS server mappings in memory until their dynamic DHCP lease expires."
  },
  {
    title: "AP Mode Redirection",
    desc: "Attempting to change DNS settings on a secondary router running in Access Point mode, which has its DHCP server disabled."
  }
];

const quickFixChecklist = [
  "Identify your router's default gateway IP address via ipconfig.",
  "Decide on a fast public DNS provider (like Cloudflare 1.1.1.1 or Google 8.8.8.8).",
  "Input both Primary and Secondary DNS addresses to ensure redundant failover.",
  "Check and configure your IPv6 DNS settings if IPv6 is active on your WAN line.",
  "Power cycle your router to force all client devices to renew their leases."
];

export default function HowToChangeDnsOnRouterPage() {
  return (
    <TroubleshootingArticleShell
      h1="How to Change DNS on Your Router: ASUS, TP-Link, Netgear (2026)"
      intro="Want to improve web load speeds and secure your home network? Learn how to configure custom DNS resolvers at the router level. Follow our detailed walkthroughs for TP-Link, ASUS, Netgear, and Linksys firmware."
      category="dns"
      breadcrumbs={breadcrumbs}
      faqs={faqs}
      troubleshootingSteps={troubleshootingSteps}
      warningBanner={{
        title: "Security Warning: Dynamic DNS Modification",
        text: "Ensure you enter the exact numeric DNS IP addresses. Inputting incorrect digits in the DNS field will prevent all connected devices from resolving domain names, resulting in a total network outage until the settings are corrected or the router is factory reset."
      }}
      quickFixChecklist={quickFixChecklist}
      commonCauses={commonCauses}
      whenToContactISP="Contact your ISP if your custom DNS settings are automatically overwritten by the incoming WAN cable connection. Some ISPs lock their provided gateways (especially fiber ONTs) to their proprietary DNS servers to enforce local browsing restrictions."
      severityLevel="low"
    >
      <div className="space-y-6">
        {/* Quick Answer Snippet for AI Search Engines */}
        <section className="glass-card p-5 border border-emerald-950/20 bg-emerald-950/5 rounded-2xl relative overflow-hidden" aria-label="Quick Answer Summary">
          <div className="absolute top-0 right-0 bg-emerald-500/10 text-emerald-400 text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-bl-lg font-bold">
            AIO Quick Answer
          </div>
          <h3 className="text-xs font-bold text-emerald-400 mb-2 uppercase tracking-wide">Quick Diagnostic Summary</h3>
          <ul className="space-y-2 text-xs text-[var(--text-secondary)] leading-relaxed">
            <li><strong>Symptoms:</strong> Slow browsing or default ISP DNS redirection alerts across all devices on your local network.</li>
            <li><strong>Most Likely Cause:</strong> Your router is configured to 'Obtain DNS automatically', routing all local queries through slow ISP resolvers.</li>
            <li><strong>Fastest Safe Fix:</strong> Log into your router admin portal, locate the WAN or DHCP server DNS fields, toggle to 'Manual', and enter Cloudflare (1.1.1.1) or Google DNS (8.8.8.8) IPs.</li>
          </ul>
        </section>

        <ConnectionOptimizerClient mode="dns-setup" />

        <article className="prose prose-invert max-w-none space-y-6 text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
          
          <h2 className="text-sm font-bold text-[var(--text-primary)]">Symptoms vs. Root Causes Diagnostic Table</h2>
          <p>
            DNS configurations propagate differently across router interfaces. Use this comparison table to identify where to apply your DNS updates:
          </p>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-[11px] text-[var(--text-secondary)]">
              <thead>
                <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                  <th className="px-3 py-2 text-left">Configuration Goal</th>
                  <th className="px-3 py-2 text-left">Primary Interface Location</th>
                  <th className="px-3 py-2 text-left">Routing Context</th>
                  <th className="px-3 py-2 text-left">Expected Performance Result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)]">
                <tr>
                  <td className="px-3 py-2 font-mono">Fastest local client updates</td>
                  <td className="px-3 py-2">LAN / DHCP Server DNS fields</td>
                  <td className="px-3 py-2">Bypasses router caching daemon</td>
                  <td className="px-3 py-2">Clients resolve queries directly to public Anycast servers</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-mono">Centralized logging and control</td>
                  <td className="px-3 py-2">WAN / Internet Connection DNS fields</td>
                  <td className="px-3 py-2">Enforces router dnsmasq forwarding</td>
                  <td className="px-3 py-2">Router caches common records, reducing external queries</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-mono">Bypassing ISP filtering entirely</td>
                  <td className="px-3 py-2">IPv6 Internet DNS settings</td>
                  <td className="px-3 py-2">Prevents IPv6 resolver leakage</td>
                  <td className="px-3 py-2">No plaintext DNS bypasses allowed on client devices</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-sm font-bold text-[var(--text-primary)]">What Happens Internally When You Update Router DNS?</h2>
          <p>
            When you configure custom DNS servers in your router's DHCP server settings, you alter the parameters included in the local **DHCP Lease Handshake**.
          </p>
          <p>
            When a device connects to your Wi-Fi, it broadcasts a DHCP Request. The router's DHCP daemon responds with an allocation packet containing the client's local IP address, subnet mask, default gateway IP (the router itself), and the exact DNS server IP addresses. 
          </p>
          <p>
            If you configure DNS under the DHCP settings, the router tells the client to send DNS packets directly to Cloudflare (1.1.1.1) or Google (8.8.8.8). However, if you configure DNS on the WAN port settings, the router tells the client to use the router's own IP (e.g. 192.168.1.1) as the DNS server. The router then receives all local DNS queries, processes them through its internal forwarding daemon (usually dnsmasq), and forwards unresolved queries to the WAN-configured public DNS servers. WAN-side configuration enables local caching on the router but can bottleneck throughput on budget routers with low-spec processors.
          </p>

          <div className="p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-2">
            <span className="font-bold text-[var(--text-primary)] block text-xs">Deep Diagnostics & Internal Authority Links</span>
            <ul className="list-disc pl-4 space-y-1 text-[11px]">
              <li>If you are looking for DNS performance comparisons, read our <a href="/best-dns-for-faster-internet" className="text-[var(--brand-400)] hover:underline">Best DNS for Faster Internet Guide</a>.</li>
              <li>Learn how to resolve port blocks with our <a href="/dns-server-not-responding" className="text-[var(--brand-400)] hover:underline">DNS Server Not Responding Walkthrough</a>.</li>
              <li>Verify your gateway configuration endpoints at the <a href="/ips/192-168-1-1" className="text-[var(--brand-400)] hover:underline">192.168.1.1 Gateway Portal</a>.</li>
              <li>Analyze your wireless dropouts using the <a href="/wifi-keeps-disconnecting" className="text-[var(--brand-400)] hover:underline">WiFi Disconnection Walkthrough</a>.</li>
              <li>Check your physical link speed using the <a href="/ethernet-connected-but-no-internet" className="text-[var(--brand-400)] hover:underline">Ethernet Connected but No Internet Optimizer</a>.</li>
            </ul>
          </div>

          <h2 className="text-sm font-bold text-[var(--text-primary)]">Detailed Brand-Specific Walks for Common Router Interfaces</h2>
          <p>
            Follow these exact UI pathways to configure custom DNS servers across major residential router brands:
          </p>

          <h3 className="text-xs font-bold text-[var(--text-primary)] uppercase">1. ASUS (ASUSWRT Firmware)</h3>
          <p>
            ASUS routers support DNS configuration on both the WAN interface and local LAN DHCP daemons.
            <br />
            <strong>WAN-Side Path:</strong> <code>Advanced Settings → WAN → Internet Connection</code>. Scroll to <strong>WAN DNS Setting</strong>. Toggle <strong>Connect to DNS Server automatically</strong> to <strong>No</strong>, input your Primary and Secondary DNS IPs, and click <strong>Apply</strong>.
            <br />
            <strong>LAN-Side Path:</strong> <code>Advanced Settings → LAN → DHCP Server</code>. Input custom IPs in the <strong>DNS Server</strong> field.
          </p>

          <h3 className="text-xs font-bold text-[var(--text-primary)] uppercase">2. TP-Link (Archer Systems)</h3>
          <p>
            TP-Link routers allow clean DHCP server allocation adjustments that propagate instantly.
            <br />
            <strong>DHCP Path:</strong> <code>Advanced → Network → DHCP Server</code>. Input your preferred IPs in the <strong>Primary DNS</strong> and <strong>Secondary DNS</strong> fields. Click <strong>Save</strong>.
          </p>

          <h3 className="text-xs font-bold text-[var(--text-primary)] uppercase">3. Netgear (Nighthawk & Orbi)</h3>
          <p>
            Netgear routes all DNS queries through WAN interface rules.
            <br />
            <strong>WAN Path:</strong> Open <code>Basic tab → Internet</code>. Scroll down to <strong>Domain Name Server (DNS) Address</strong>. Select the radio button for <strong>Use These DNS Servers</strong>, enter your custom Primary and Secondary DNS IPs, and click <strong>Apply</strong>.
          </p>

          <h2 className="text-sm font-bold text-[var(--text-primary)]">When Hardware is Physically Failing</h2>
          <p>
            If your router fails to save custom DNS settings, logs you out during configuration changes, or resets its parameters back to default after a power outage, the hardware's non-volatile storage is likely failing:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-[11px] text-[var(--text-muted)]">
            <li>
              <strong>NVRAM Flash Wear:</strong> NVRAM chips have physical write limits. Over years of operation, the memory blocks degrade, causing database write failures. The router reverts to default ISP configuration profiles upon power cycles.
            </li>
            <li>
              <strong>Voltage Regulator Noise:</strong> Degraded power capacitors inside the router can introduce high voltage ripple that corrupts flash write operations, failing configuration saves.
            </li>
          </ul>

          <h2 className="text-sm font-bold text-[var(--text-primary)]">Commercial Intent: Custom Pi-Hole & NextDNS Solutions</h2>
          <p>
            If you want to enforce advanced network-wide ad blocking, malware prevention, and family content filtering, consider deploying a custom **Pi-Hole** DNS server or using a **NextDNS** cloud profile. 
          </p>
          <p>
            A Pi-Hole is a lightweight local DNS server that runs on a low-cost Raspberry Pi connected directly to your router switch. After deploying a Pi-Hole, you set your router's LAN DNS server IP to point to the Pi-Hole. The Pi-Hole intercepts all local hostname queries, checking them against global ad-blocking lists. If a smart TV or smartphone attempts to connect to an ad server, the Pi-Hole returns a loopback address (0.0.0.0), neutralizing the ad before it can download. This saves massive WAN bandwidth and speeds up web browsing across your entire network.
          </p>
        </article>
      </div>
    </TroubleshootingArticleShell>
  );
}
