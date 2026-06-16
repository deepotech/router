import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import TroubleshootingArticleShell from "@/components/tools/TroubleshootingArticleShell";
import ConnectionOptimizerClient from "@/components/tools/ConnectionOptimizerClient";
import Link from "next/link";
import { Activity, Settings, Terminal, Globe, HelpCircle, Info, Shield } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "DNS Server Not Responding? How to Fix DNS Errors — RouterVia",
  description:
    "Is your browser showing DNS server not responding? Learn how to flush DNS, configure public DNS like Cloudflare and Google, and resolve DNS lookup failures on Windows and macOS.",
  canonical: "/dns-server-not-responding",
  keywords: [
    "dns server not responding",
    "dns issues",
    "internet dns error",
    "dns lookup failed",
    "flush dns cache command",
    "cloudflare public dns setup",
    "how to change dns servers",
  ],
});

const breadcrumbs = [
  { name: "DNS Optimization", url: "/best-dns-for-gaming" },
  { name: "DNS Server Not Responding", url: "/dns-server-not-responding" },
];

const troubleshootingSteps = [
  {
    title: "Flush the Local DNS Resolver Cache",
    description: "Clear out stale hostname records from your operating system's local database. On Windows, search for Command Prompt, right-click and select 'Run as Administrator', and execute the command: 'ipconfig /flushdns'. On macOS, open Terminal and run 'sudo killall -HUP mDNSResponder'. This forces the system to drop expired cached IP addresses and request a fresh lookup directly from nameservers during your next web browsing session.",
    tip: "Clearing the cache forces your operating system to request fresh network records instead of relying on stale cache files."
  },
  {
    title: "Configure High-Performance Public DNS Servers",
    description: "Bypass your Internet Service Provider's default servers, which may be offline. Open your operating system's network adapter settings or your router's administration panel. Switch your IP allocation options from automatic DNS server assignments to manual configuration. Enter Cloudflare's public DNS IP addresses: Primary: '1.1.1.1', Secondary: '1.0.0.1'. Alternatively, configure Google's servers: Primary: '8.8.8.8', Secondary: '8.8.4.4'. Save the configuration.",
    tip: "Public DNS servers are updated instantly, have massive cache pools, and avoid ISP logging and tracking blocks."
  },
  {
    title: "Release and Renew Your IP Address Lease",
    description: "Force your network interface card (NIC) to re-establish a handshake with your router gateway. Open Command Prompt (Windows) or Terminal (macOS). On Windows, type 'ipconfig /release' and press Enter to drop the current local IP assignment. Next, type 'ipconfig /renew' and press Enter to request a new IP address lease, subnet mask, and default gateway assignment from your router's DHCP server.",
  },
  {
    title: "Disable IPv6 Settings on the Adapter",
    description: "Open the Control Panel on Windows, navigate to Network and Sharing Center, and select 'Change Adapter Settings'. Right-click your active wireless or ethernet adapter and choose 'Properties'. Scroll down the protocols list and uncheck the box labeled 'Internet Protocol Version 6 (TCP/IPv6)'. Click 'OK' to save. On macOS, go to System Settings > Network > Wi-Fi/Ethernet > Details > TCP/IP, and set Configure IPv6 to 'Link-local only'.",
    tip: "Some routers do not map IPv6 DNS routes properly, causing lookup requests to time out before falling back to IPv4."
  },
  {
    title: "Run DNS Diagnostic Commands",
    description: "Run diagnostic utilities to isolate the source of the lookup failure. Open your command shell and type 'ping 8.8.8.8'. If the ping succeeds, your physical internet connection is active. Next, type 'nslookup google.com'. If this fails, the problem lies with your DNS resolver. You can test a specific resolver by typing 'nslookup google.com 1.1.1.1' to force the query through Cloudflare's server and verify if it resolves successfully.",
  },
  {
    title: "Reset Network Adapter and TCP/IP Stack",
    description: "Repair corrupted network protocol configurations at the kernel level. On Windows, open Command Prompt as Administrator and run the command 'netsh winsock reset' to reset the Windows Sockets API catalog. Next, execute 'netsh int ip reset' to reset the TCP/IP stack to its factory default state. Once completed, restart your computer immediately to apply the repairs.",
  }
];

const faqs = [
  {
    question: "What does 'DNS Server Not Responding' mean?",
    answer: "This error indicates that your device successfully connected to the local router, but the DNS server (domain name book resolver) is failing to translate web addresses (like google.com) into numeric IP addresses that routing equipment understands. When you type a website name, your computer asks the DNS server for its numeric IP. If the DNS server is offline, overloaded, or experiencing packet loss, your browser times out and displays the 'DNS Server Not Responding' message."
  },
  {
    question: "Can an antivirus firewall block DNS lookups?",
    answer: "Yes, active web protection layers or VPN tunnels create custom network adapters. If these adapters freeze or if the firewall blocks outgoing UDP packets on Port 53, your computer will fail to resolve hostnames. Antivirus software packages with built-in network security firewalls can occasionally flag outgoing DNS query traffic as suspicious or misconfigure adapter bindings, dropping outbound UDP packets. Disabling the firewall temporarily is a quick diagnostic check."
  },
  {
    question: "Is public DNS safe to use?",
    answer: "Yes. Large public DNS networks like Cloudflare (1.1.1.1) and Google (8.8.8.8) are safe, run advanced security features to block malicious domains, and respect user privacy by erasing logs within 24 hours. Many security-focused DNS providers like Quad9 (9.9.9.9) or ControlD also maintain real-time threat intelligence blocklists, blocking lookups to known malware, phishing, and command-and-control servers at the DNS level before they can reach your system."
  },
  {
    question: "What causes DNS servers to go offline or fail?",
    answer: "DNS servers can fail due to server hardware crashes, DDoS attacks, network routing misconfigurations, or database corruption at the ISP level. ISP-provided DNS servers are particularly prone to outages because they do not have the massive global load-balancing infrastructures that providers like Cloudflare or Google maintain. Stale resolver caches or local router firmware memory leaks can also lock up the DNS forwarder process on your router, mimicking an external DNS failure."
  },
  {
    question: "How do I fix DNS errors on a Mac?",
    answer: "On macOS, go to System Settings > Network, select your active connection (Wi-Fi or Ethernet), and click on 'Details'. Select the 'DNS' tab, click the '+' button, and enter '1.1.1.1' and '8.8.8.8'. Remove any default ISP DNS IPs. Next, open Terminal and run the command: 'sudo killall -HUP mDNSResponder' to flush the macOS resolver cache. Finally, turn Wi-Fi off and back on to re-establish the connection parameters."
  },
  {
    question: "Why does my phone show DNS errors while my laptop works fine?",
    answer: "This issue points to a device-specific configuration problem rather than a general router outage. The phone may have a stale DHCP lease, a mismatched static IP binding, or be attempting to connect to a Private DNS server that is currently offline. Forget and reconnect to the Wi-Fi network on your phone to force a fresh lease, and verify that any Private DNS or VPN settings are disabled in the phone's settings menu."
  },
  {
    question: "What is DNS-over-HTTPS (DoH) and can it fix DNS errors?",
    answer: "DNS-over-HTTPS (DoH) is a protocol that encrypts standard DNS queries and wraps them inside common HTTPS traffic on Port 443. This prevents local eavesdropping and ISP traffic interception. While it does not directly fix a broken physical connection, DoH can bypass local DNS blocks, censorship, or DNS hijacking by your local network administrators, ensuring that your query path remains secure and unmanipulated."
  },
  {
    question: "Can a bad ethernet cable trigger DNS errors?",
    answer: "Yes. While it sounds like a software problem, hardware packet loss can cause DNS lookups to fail. DNS queries are lightweight UDP packets. If your ethernet cable is damaged, bent, or has broken pins, it can drop outgoing UDP packets. Since UDP does not have built-in retransmission checks like TCP, your operating system will assume the resolver is offline and throw a 'DNS Server Not Responding' error."
  }
];

export default function DnsServerNotRespondingPage() {
  return (
    <TroubleshootingArticleShell
      h1="How to Fix 'DNS Server Not Responding' Errors"
      intro="If your web browser fails to resolve web addresses or reports that your DNS server is offline, follow our step-by-step diagnostic workflow to clear your cache, assign public resolvers, and bypass ISP network issues."
      category="dns"
      breadcrumbs={breadcrumbs}
      faqs={faqs}
      troubleshootingSteps={troubleshootingSteps}
    >
      <div className="space-y-6">
        <ConnectionOptimizerClient mode="dns-fix" />

        <article className="prose prose-invert max-w-none space-y-4 text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
          <h2 className="text-sm font-bold text-[var(--text-primary)]">Understanding DNS Mappings and Browser Lookups</h2>
          <p>
            The Domain Name System (DNS) operates as the telephone directory of the Internet. Every time you enter a URL, your computer initiates a network query on UDP Port 53. By default, your router routes this request to your Internet Service Provider's local DNS servers.
          </p>
          <p>
            When these ISP servers get overloaded or crash, your browser will display errors like <em>DNS_PROBE_FINISHED_NXDOMAIN</em>. Changing your settings to global public resolvers overrides these unreliable servers, speeding up web navigation and ensuring constant access.
          </p>
          <div className="p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-2">
            <span className="font-bold text-[var(--text-primary)] block text-xs">Recommended Tools & Quick Links</span>
            <ul className="list-disc pl-4 space-y-1 text-[11px]">
              <li>Test live name server propagation across our <Link href="/dns-propagation-checker" className="text-[var(--brand-400)] hover:underline">Global DNS Propagation Checker</Link>.</li>
              <li>Read how to optimize console ping with the <Link href="/best-dns-for-gaming" className="text-[var(--brand-400)] hover:underline">Best DNS for Gaming Setup</Link>.</li>
              <li>Verify if your DNS configuration is leaking using the <Link href="/dns-lookup" className="text-[var(--brand-400)] hover:underline">DNS Lookup Tool</Link>.</li>
              <li>Is your router gateway offline? Check how to access the <Link href="/routers" className="text-[var(--brand-400)] hover:underline">Router Default Gateway Panel</Link>.</li>
            </ul>
          </div>
        </article>

        {/* DNS Server Comparison */}
        <section className="space-y-4">
          <h2 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-1.5">
            <Activity size={16} className="text-[var(--brand-400)]" />
            DNS Server Comparison — Which One is Most Reliable?
          </h2>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Public DNS resolvers have different performance and uptime profiles. Below is a comparison table of the most reliable alternative DNS resolvers:
          </p>

          <div className="overflow-x-auto border border-[var(--border-subtle)] rounded-xl bg-[var(--bg-elevated)]">
            <div className="min-w-[700px] text-xs">
              {/* Table Header */}
              <div className="grid grid-cols-7 border-b border-[var(--border-subtle)] bg-[var(--bg-elevated)] font-bold text-[var(--text-primary)] p-3">
                <div>Resolver</div>
                <div>Primary DNS</div>
                <div>Secondary DNS</div>
                <div>Avg Uptime SLA</div>
                <div>DoH Support</div>
                <div>Response Time</div>
                <div>Privacy Focus</div>
              </div>
              {/* Table Rows */}
              <div className="divide-y divide-[var(--border-subtle)]">
                <div className="grid grid-cols-7 p-3 text-[var(--text-secondary)] items-center">
                  <div className="font-bold text-[var(--text-primary)]">Cloudflare</div>
                  <div className="font-mono">1.1.1.1</div>
                  <div className="font-mono">1.0.0.1</div>
                  <div>99.99%</div>
                  <div>Yes (Port 443)</div>
                  <div>~ 12ms</div>
                  <div>Excellent (Purged in 24 hours)</div>
                </div>
                <div className="grid grid-cols-7 p-3 text-[var(--text-secondary)] items-center">
                  <div className="font-bold text-[var(--text-primary)]">Google DNS</div>
                  <div className="font-mono">8.8.8.8</div>
                  <div className="font-mono">8.8.4.4</div>
                  <div>99.99%</div>
                  <div>Yes</div>
                  <div>~ 18ms</div>
                  <div>Moderate (Keeps diagnostic logs)</div>
                </div>
                <div className="grid grid-cols-7 p-3 text-[var(--text-secondary)] items-center">
                  <div className="font-bold text-[var(--text-primary)]">Quad9</div>
                  <div className="font-mono">9.9.9.9</div>
                  <div className="font-mono">149.112.112.112</div>
                  <div>99.95%</div>
                  <div>Yes</div>
                  <div>~ 22ms</div>
                  <div>Excellent (GDPR Compliant, No IP logs)</div>
                </div>
                <div className="grid grid-cols-7 p-3 text-[var(--text-secondary)] items-center">
                  <div className="font-bold text-[var(--text-primary)]">OpenDNS</div>
                  <div className="font-mono">208.67.222.222</div>
                  <div className="font-mono">208.67.220.220</div>
                  <div>100.00%</div>
                  <div>Yes (Proprietary)</div>
                  <div>~ 24ms</div>
                  <div>Low (Logs queries for web filters)</div>
                </div>
                <div className="grid grid-cols-7 p-3 text-[var(--text-secondary)] items-center">
                  <div className="font-bold text-[var(--text-primary)]">ControlD</div>
                  <div className="font-mono">76.76.2.0</div>
                  <div className="font-mono">76.76.10.0</div>
                  <div>99.99%</div>
                  <div>Yes</div>
                  <div>~ 15ms</div>
                  <div>High (Zero logging options)</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Operating System Specific DNS Fix Commands */}
        <section className="space-y-4">
          <h2 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-1.5">
            <Terminal size={16} className="text-[var(--brand-400)]" />
            Operating System Specific DNS Fix Commands
          </h2>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            If a standard restart fails, execute these target terminal commands depending on your operating system:
          </p>

          <div className="space-y-4 text-xs">
            {/* Windows OS */}
            <div className="p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-2">
              <span className="font-bold text-[var(--text-primary)] block">Windows 10 / 11 (Command Prompt as Admin)</span>
              <pre className="p-3 bg-black/50 font-mono text-[var(--brand-400)] rounded-lg overflow-x-auto">
{`# Release current DHCP lease configurations
ipconfig /release

# Request fresh lease from your local router
ipconfig /renew

# Flush the OS DNS resolver cache
ipconfig /flushdns

# Re-register console endpoints with local server
ipconfig /registerdns

# Reset winsock socket configurations
netsh winsock reset

# Reset TCP/IP stack configuration
netsh int ip reset`}
              </pre>
            </div>

            {/* macOS */}
            <div className="p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-2">
              <span className="font-bold text-[var(--text-primary)] block">macOS (Terminal Console)</span>
              <pre className="p-3 bg-black/50 font-mono text-[var(--brand-400)] rounded-lg overflow-x-auto">
{`# Flush DNS resolver cache (macOS Monterey, Ventura, Sonoma, Sequoia)
sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder

# Renew DHCP Lease via command line
sudo ipconfig set en0 DHCP`}
              </pre>
            </div>

            {/* Linux */}
            <div className="p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-2">
              <span className="font-bold text-[var(--text-primary)] block">Linux (Ubuntu / Debian - Terminal)</span>
              <pre className="p-3 bg-black/50 font-mono text-[var(--brand-400)] rounded-lg overflow-x-auto">
{`# Flush systemd-resolved DNS cache
sudo resolvectl flush-caches

# Check DNS cache and status metrics
sudo resolvectl status

# Alternatively (for dnsmasq architectures)
sudo systemctl restart dnsmasq`}
              </pre>
            </div>
          </div>
        </section>

        {/* Router-Level DNS Fixes */}
        <section className="space-y-4">
          <h2 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-1.5">
            <Settings size={16} className="text-[var(--brand-400)]" />
            Router-Level DNS Fixes
          </h2>
          <div className="text-xs text-[var(--text-secondary)] space-y-3 leading-relaxed">
            <p>
              When multiple devices on your local network simultaneously report DNS server timeouts, the issue lies at the router level. The router's built-in DNS forwarder cache may be frozen, or the ISP-provided WAN gateway DNS resolvers may be down. Configuring manual DNS on your router fixes this for all connected devices.
            </p>
            <p>
              Follow these generic steps to assign public resolvers router-wide:
            </p>
            <ol className="list-decimal pl-5 space-y-2 text-[11px]">
              <li>Open any web browser and log in to your router gateway panel. Popular default IPs include <code>192.168.1.1</code> (ASUS, Netgear, Linksys), <code>192.168.0.1</code> (TP-Link, D-Link), or <code>192.168.8.1</code> (Huawei).</li>
              <li>Enter the default administrator credentials (typically found on a label at the back of the physical router device).</li>
              <li>Navigate to the **WAN**, **Internet**, or **Advanced Network Settings** menu panel.</li>
              <li>Locate the fields labeled **DNS Server**, **DNS Assignment**, or **Name Servers**. Change this setting from Automatic/ISP DNS to **Use These DNS Servers** or **Manual**.</li>
              <li>Input Cloudflare's primary (<code>1.1.1.1</code>) and secondary (<code>1.0.0.1</code>) addresses, or Google's primary (<code>8.8.8.8</code>) and secondary (<code>8.8.4.4</code>) servers.</li>
              <li>Save changes and reboot your router. This forces your router's DHCP server to lease these optimized public resolvers to all connected devices.</li>
            </ol>
          </div>
        </section>

        {/* Related DNS Guides */}
        <section className="prose prose-invert max-w-none space-y-4">
          <h2 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-1.5">
            <Info size={16} className="text-[var(--brand-400)]" />
            Related DNS Guides
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {[
              { title: "DNS Hub Guide", href: "/dns", desc: "Access our primary DNS learning center, featuring benchmarks and network tool directories." },
              { title: "Best DNS Servers 2026", href: "/best-dns-servers", desc: "Compare the absolute fastest and most secure public DNS resolvers available for consumer networks." },
              { title: "Best DNS for Gaming", href: "/best-dns-for-gaming", desc: "Detailed latency reviews of DNS resolvers ranked for low-ping gaming setups." },
              { title: "Best DNS for PS5", href: "/best-dns-for-ps5", desc: "Step-by-step custom DNS setup guide for PlayStation 5 consoles." },
              { title: "Best DNS for Xbox", href: "/best-dns-for-xbox", desc: "Step-by-step custom DNS setup guide for Xbox Series X/S and Xbox One consoles." },
              { title: "How to Change DNS on Router", href: "/how-to-change-dns-on-router", desc: "Learn how to configure manual DNS settings directly on all major router brands." },
              { title: "What Is DNS?", href: "/what-is-dns", desc: "Understand how the Domain Name System translates hostnames and routes packets." },
              { title: "Best DNS for Faster Internet", href: "/best-dns-for-faster-internet", desc: "Latency comparison of public DNS servers optimized for standard web browsing." },
            ].map(({ title, href, desc }) => (
              <Link
                key={href}
                href={href}
                className="p-3 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl hover:border-[var(--brand-400)] transition-colors group block no-underline"
              >
                <span className="font-semibold text-[var(--brand-400)] group-hover:underline text-[11px] block">{title}</span>
                <p className="text-[10px] text-[var(--text-muted)] mt-0.5">{desc}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </TroubleshootingArticleShell>
  );
}
