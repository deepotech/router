import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import TroubleshootingArticleShell from "@/components/tools/TroubleshootingArticleShell";
import ConnectionOptimizerClient from "@/components/tools/ConnectionOptimizerClient";

export const metadata: Metadata = buildMetadata({
  title: "How to Fix DNS_PROBE_FINISHED_NO_INTERNET Chrome Error",
  description:
    "Is Google Chrome showing a DNS_PROBE_FINISHED_NO_INTERNET error? Learn how to flush your DNS cache, reset winsock sockets, and configure public DNS resolvers.",
  canonical: "/dns-probe-finished-no-internet",
  keywords: [
    "dns_probe_finished_no_internet",
    "chrome dns error",
    "dns probe finished no internet fix",
    "browser dns problem",
    "chrome internet error"
  ],
});

const breadcrumbs = [
  { name: "Router Problems", url: "/router-keeps-restarting" },
  { name: "Chrome DNS Error", url: "/dns-probe-finished-no-internet" },
];

const troubleshootingSteps = [
  {
    title: "Execute OS Network Socket & TCP/IP Reset",
    description: "Open Command Prompt as an Administrator. Execute 'netsh winsock reset' and 'netsh int ip reset' to clear corrupted layered service providers (LSPs) and routing table configurations, then reboot immediately.",
    tip: "Winsock corruptions are a primary trigger when your physical link is active but browsers fail to bind DNS query ports."
  },
  {
    title: "Flush Local DNS Resolver Cache",
    description: "In your administrator terminal, execute 'ipconfig /flushdns' to clear the operating system's DNS resolver cache. This forces your system to retrieve fresh records from your configured upstream resolver.",
    tip: "A stale DNS cache containing expired IP addresses or corrupted host mappings will continuously trigger browser resolution timeouts."
  },
  {
    title: "Purge Chrome Browser Built-In Host Cache",
    description: "Launch Google Chrome, navigate to 'chrome://net-internals/#dns' in the address bar, and click the 'Clear host cache' button. Next, go to 'chrome://net-internals/#sockets' and click 'Flush socket pools'.",
    tip: "Chrome uses a standalone DNS client stack and socket pool separate from the OS resolver; clearing the OS cache alone is often insufficient."
  },
  {
    title: "Transition to Ultra-Reliable Public DNS Resolvers",
    description: "Open your active network adapter settings, right-click and select Properties, double-click IPv4, and toggle manual settings. Set Primary DNS to 1.1.1.1 (Cloudflare) and Secondary to 8.8.8.8 (Google).",
    tip: "ISP default DNS daemons frequently drop queries under peak load or suffer complete name lookup outages."
  }
];

const faqs = [
  {
    question: "Why does the DNS_PROBE_FINISHED_NO_INTERNET error happen only in Google Chrome?",
    answer: "Google Chrome implements its own built-in Async DNS resolver client separate from the underlying operating system's standard API resolver. If Chrome's internal socket pool gets locked or if its custom DNS-over-HTTPS (DoH) configuration encounters a conflict with your security software, Chrome will fail to resolve hostnames even while other browsers or apps continue to work fine."
  },
  {
    question: "What is the difference between DNS_PROBE_FINISHED_NO_INTERNET and DNS_PROBE_FINISHED_NXDOMAIN?",
    answer: "NXDOMAIN indicates that the DNS resolver was contacted successfully and returned a 'Non-Existent Domain' record, meaning the server responded but the domain does not exist. DNS_PROBE_FINISHED_NO_INTERNET represents a total connectivity failure, indicating that Chrome's DNS client was completely unable to establish a UDP port 53 link or receive a response from your configured gateway or DNS resolver."
  },
  {
    question: "Can aggressive browser extensions trigger DNS probe errors?",
    answer: "Yes. Adblockers, security shields, and custom browser VPN extensions hook into Chrome's network API layers to inspect packets. If an extension's background script crashes, or if its local proxy daemon hangs, it will block Chrome from opening outgoing UDP socket channels, throwing the DNS probe error."
  },
  {
    question: "How do I resolve this DNS error on Android or iPhone?",
    answer: "On mobile devices, open your browser settings, clear browsing history, and cookies. For a system-wide fix, go to your Wi-Fi details, select 'Modify Network' or tap info, toggle IP settings to static, and enter public DNS servers (1.1.1.1 and 8.8.8.8) or enable Secure DNS (Private DNS) with a TLS provider in system settings."
  },
  {
    question: "Why does an active VPN client trigger sudden DNS probe timeouts?",
    answer: "VPNs create a virtual adapter interface and modify your routing table to direct all DNS queries into their secure tunnel. If the VPN client loses synchronization with its remote endpoint but fails to clean up its local DNS binding hooks, your operating system will attempt to query a dead virtual port, blocking all name resolution."
  }
];

const commonCauses = [
  {
    title: "Windows Dnscache Service Crash",
    desc: "The background Windows DNS Client service locks up or encounters registry read exceptions, failing to relay system query API calls."
  },
  {
    title: "Encrypted DNS-over-HTTPS Mismatches",
    desc: "Strict Secure DNS configurations in Chrome failing to negotiate secure TLS handshakes with routers that intercept port 443."
  },
  {
    title: "Antivirus Socket Hook Deadlocks",
    desc: "Third-party firewall engines inserting layered packet inspection rules that block outbound UDP queries on Port 53."
  },
  {
    title: "Router DNS Forwarding Daemon Halt",
    desc: "The router's DNS forwarder software (e.g. dnsmasq) locks up under high load, causing it to drop local gateway forwarding queries."
  }
];

const quickFixChecklist = [
  "Run 'ipconfig /flushdns' in an administrative Command Prompt terminal.",
  "Reset Winsock and TCP/IP stacks with 'netsh winsock reset' and reboot your PC.",
  "Navigate to chrome://net-internals/#dns and click 'Clear host cache'.",
  "Temporarily close your active VPN client or custom web proxy software.",
  "Manually assign Cloudflare (1.1.1.1) and Google (8.8.8.8) as your adapter DNS servers."
];

export default function DnsProbeFinishedNoInternetPage() {
  return (
    <TroubleshootingArticleShell
      h1="How to Fix DNS_PROBE_FINISHED_NO_INTERNET Chrome Error"
      intro="Are you constantly getting interrupted by the DNS_PROBE_FINISHED_NO_INTERNET error on Google Chrome? This diagnostic code indicates a complete breakdown in the browser's ability to resolve domain names into numeric IP addresses. Discover how to reset your Winsock socket bindings, purge Chrome's hidden async DNS cache, and restore gateway routing."
      category="dns"
      breadcrumbs={breadcrumbs}
      faqs={faqs}
      troubleshootingSteps={troubleshootingSteps}
      warningBanner={{
        title: "Security Packet Filtering Notice",
        text: "Using multiple security applications (like double firewalls or having an active VPN combined with a third-party antivirus web shield) often leads to socket hook conflicts. They will block outgoing UDP packets on Port 53, resulting in browser-wide DNS timeouts."
      }}
      quickFixChecklist={quickFixChecklist}
      commonCauses={commonCauses}
      whenToContactISP="If the DNS probe error continues across multiple devices and networks after setting static public DNS values, your ISP's upstream Carrier-Grade NAT (CGNAT) gateway or DNS recursive servers may be experiencing a major regional outage. Contact your ISP's helpline to verify their network status."
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
            The **DNS_PROBE_FINISHED_NO_INTERNET** error occurs when Chrome&apos;s network engine fails to contact a DNS server. Fix this immediately by resetting your local network sockets. Open Command Prompt as Administrator, run <code className="font-mono text-cyan-300">netsh winsock reset</code> and <code className="font-mono text-cyan-300">ipconfig /flushdns</code>, then reboot. Additionally, navigate to <code className="font-mono text-amber-300">chrome://net-internals/#dns</code> and click **Clear host cache** to purge stale browser mappings.
          </p>
        </section>

        {/* Interactive Troubleshooting Wizard */}
        <ConnectionOptimizerClient mode="dns-fix" />

        {/* Technical Article Body */}
        <article className="prose prose-invert max-w-none space-y-6 text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
          
          {/* Section: Symptoms Table */}
          <h2 className="text-sm font-bold text-[var(--text-primary)]">Symptoms & Diagnostic Scenarios</h2>
          <p>
            DNS failures can manifest as system-wide dropouts or browser-specific glitches. Match your current experience with the table below to identify the appropriate path:
          </p>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-[11px] text-[var(--text-secondary)]">
              <thead>
                <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                  <th className="px-3 py-2 text-left">Observed Symptom</th>
                  <th className="px-3 py-2 text-left">Network Context</th>
                  <th className="px-3 py-2 text-left">Diagnostic Analysis</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)]">
                <tr>
                  <td className="px-3 py-2 font-semibold">Chrome works on mobile but not on PC</td>
                  <td className="px-3 py-2">Device-Specific Configuration</td>
                  <td className="px-3 py-2">The router gateway is working fine. The issue lies locally with the PC&apos;s TCP/IP stack configuration, stale DNS cache, or Winsock socket hooks.</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-semibold">ERR_NAME_NOT_RESOLVED</td>
                  <td className="px-3 py-2">Browser Protocol Layer</td>
                  <td className="px-3 py-2">Indicates a direct name resolution timeout. The browser sent a DNS query but the configured DNS IP was unreachable or failed to respond.</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-semibold">DNS_PROBE_STARTED status banner</td>
                  <td className="px-3 py-2">Temporary Resolution State</td>
                  <td className="px-3 py-2">Chrome is attempting to contact its internal async resolver. If this banner hangs and is followed by the NO_INTERNET error, the socket connection failed.</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-semibold">Browser-only internet failure</td>
                  <td className="px-3 py-2">Application Sandbox</td>
                  <td className="px-3 py-2">Background applications (like Discord or Steam) work fine, but Chrome fails. Points to Chrome&apos;s internal host cache or browser proxy extension locks.</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-semibold">Intermittent DNS lookup drops</td>
                  <td className="px-3 py-2">Link Stability / Packet Drops</td>
                  <td className="px-3 py-2">High wireless interference or ISP gateway packet loss is dropping UDP query frames before they can return answers.</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Section: Internal Technical Explanation */}
          <h2 className="text-sm font-bold text-[var(--text-primary)]">Under the Hood: Chrome&apos;s DNS client architecture</h2>
          <p>
            When you enter a web domain into Chrome, the browser does not simply call the operating system&apos;s default resolver immediately. Instead, it follows a multi-tiered async resolution process:
          </p>
          <ul className="list-disc pl-5 space-y-3 text-[11px] text-[var(--text-muted)]">
            <li>
              <strong>Chrome Async DNS Resolver:</strong> To improve page loading speeds, Chrome utilizes its own high-performance, asynchronous DNS client. It builds custom UDP socket channels directly on port 53 to execute recursive lookup operations, bypassing standard OS system API hooks to avoid thread blocking.
            </li>
            <li>
              <strong>Internal Host Cache:</strong> Chrome caches parsed IP-to-domain relationships in its own volatile memory bucket (accessible at <code className="font-mono text-cyan-400">chrome://net-internals/#dns</code>). If a domain shifts its physical IP but Chrome&apos;s cache fails to invalidate the entry, Chrome will repeatedly attempt to bind sockets to a dead IP, throwing a probe failure.
            </li>
            <li>
              <strong>DNS-over-HTTPS (DoH) & TLS Handshakes:</strong> Under Secure DNS settings, Chrome wraps standard UDP queries inside encrypted HTTPS packets routed over Port 443. If your home router or office firewall intercepts port 443 packets (e.g. for deep packet inspection) or if you are behind a captive network portal, the TLS handshake will fail, crashing Chrome&apos;s async resolver daemon.
            </li>
            <li>
              <strong>Windows DNS Client (Dnscache) Hooking:</strong> On Windows, the system depends on the background <code className="font-mono text-cyan-400">Dnscache</code> service. If this service suffers a memory exhaustion bug or encounters registry read locks caused by malware/antivirus filters, it will block local socket binding API calls, triggering a browser-wide DNS blackout.
            </li>
          </ul>

          {/* Section: OS-Level Fix Commands */}
          <h2 className="text-sm font-bold text-[var(--text-primary)]">OS-Level Terminal Commands to Purge and Reset DNS</h2>
          <p>
            Flushing your resolver cache and resetting socket binds sweeps away stale parameters, forcing your adapter to renegotiate local routes. Select the command set for your OS below:
          </p>

          <h3 className="text-xs font-bold text-[var(--text-primary)]">1. Windows 11 & 10 (Elevated PowerShell / CMD)</h3>
          <p className="text-[11px] text-[var(--text-muted)]">
            Search for &ldquo;Command Prompt&rdquo;, right-click, and select <strong className="text-[var(--text-primary)]">Run as Administrator</strong>. Execute these three commands sequentially:
          </p>
          <pre className="p-3 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded font-mono text-[10px] text-green-400">ipconfig /flushdns
netsh winsock reset
netsh int ip reset</pre>
          <p className="text-[11px] text-[var(--text-muted)]">
            <em>Note: You must reboot your computer immediately after running the netsh commands to allow the kernel to re-initialize socket bindings.</em>
          </p>

          <h3 className="text-xs font-bold text-[var(--text-primary)]">2. macOS (Terminal)</h3>
          <p className="text-[11px] text-[var(--text-muted)]">
            Open Terminal from Applications → Utilities, copy the command below, press Enter, and input your administrator password:
          </p>
          <pre className="p-3 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded font-mono text-[10px] text-green-400">sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder</pre>
          <p className="text-[11px] text-[var(--text-muted)]">
            This flushes the local Apple Multicast DNS daemon, rebuilding the system routing interfaces immediately.
          </p>

          <h3 className="text-xs font-bold text-[var(--text-primary)]">3. Linux (systemd-resolved)</h3>
          <p className="text-[11px] text-[var(--text-muted)]">
            Modern Linux distros rely on the systemd-resolved service. Launch your shell console and execute:
          </p>
          <pre className="p-3 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded font-mono text-[10px] text-green-400">sudo resolvectl flush-caches</pre>
          <p className="text-[11px] text-[var(--text-muted)]">
            Or on older distributions:
          </p>
          <pre className="p-3 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded font-mono text-[10px] text-green-400">sudo systemd-resolve --flush-caches</pre>

          {/* Section: Router & DNS Recommendations */}
          <h2 className="text-sm font-bold text-[var(--text-primary)]">DNS Provider Comparison: Finding the Fastest, Most Secure Resolver</h2>
          <p>
            If your ISP&apos;s recursive DNS servers are slow or experiencing frequent outages, you can replace them. The table below compares the performance, security, and content delivery network (CDN) routing efficiency of the top public DNS providers:
          </p>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-[11px] text-[var(--text-secondary)]">
              <thead>
                <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                  <th className="px-3 py-2 text-left">DNS Provider</th>
                  <th className="px-3 py-2 text-left">Primary/Secondary IPv4</th>
                  <th className="px-3 py-2 text-left">Avg Latency</th>
                  <th className="px-3 py-2 text-left">Privacy Policy</th>
                  <th className="px-3 py-2 text-left">Best Suited For</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)]">
                <tr>
                  <td className="px-3 py-2 font-semibold text-emerald-400">Cloudflare DNS</td>
                  <td className="px-3 py-2 font-mono">1.1.1.1<br />1.0.0.1</td>
                  <td className="px-3 py-2 font-mono">&lt; 12ms</td>
                  <td className="px-3 py-2">Purges logs within 24 hours, strict DNSSEC, supports DoH/DoT.</td>
                  <td className="px-3 py-2">Lowest latency, high-performance online gaming, and strict data privacy.</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-semibold text-emerald-400">Google Public DNS</td>
                  <td className="px-3 py-2 font-mono">8.8.8.8<br />8.8.4.4</td>
                  <td className="px-3 py-2 font-mono">14ms - 20ms</td>
                  <td className="px-3 py-2">Logs search query data temporarily, excellent global routing.</td>
                  <td className="px-3 py-2">Smart CDN routing, high uptime reliability, and global content delivery.</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-semibold text-emerald-400">Quad9</td>
                  <td className="px-3 py-2 font-mono">9.9.9.9<br />149.112.112.112</td>
                  <td className="px-3 py-2 font-mono">18ms - 25ms</td>
                  <td className="px-3 py-2">No logging, automatically blocks threat-intelligence flagged domains.</td>
                  <td className="px-3 py-2">Built-in phishing protection and automatic malware blocking.</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-semibold text-emerald-400">Mullvad DNS</td>
                  <td className="px-3 py-2 font-mono">194.242.2.2<br />194.242.2.3</td>
                  <td className="px-3 py-2 font-mono">22ms - 30ms</td>
                  <td className="px-3 py-2">No logging whatsoever, operates on RAM-only DNS servers.</td>
                  <td className="px-3 py-2">High-security anonymous browsing and ad-blocking options.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-2">
            <span className="font-bold text-[var(--text-primary)] block text-xs">Internal Networking Authority Links</span>
            <ul className="list-disc pl-4 space-y-1 text-[11px]">
              <li>If you need deep router-side DNS setup steps, see our <a href="/how-to-change-dns-on-router" className="text-[var(--brand-400)] hover:underline">How to Change Router DNS Guide</a>.</li>
              <li>Troubleshoot chronic DNS server dropouts with the <a href="/dns-server-not-responding" className="text-[var(--brand-400)] hover:underline">DNS Server Not Responding Fix</a>.</li>
              <li>Learn how to speed up web resolution times in our <a href="/best-dns-for-faster-internet" className="text-[var(--brand-400)] hover:underline">Best DNS Settings Guide</a>.</li>
              <li>Verify your default routing gateway paths with the <a href="/default-gateway-not-available" className="text-[var(--brand-400)] hover:underline">Default Gateway Not Available Guide</a>.</li>
              <li>Analyze DHCP IP allocation problems with the <a href="/router-not-assigning-ip-addresses" className="text-[var(--brand-400)] hover:underline">Router DHCP Allocation Guide</a>.</li>
            </ul>
          </div>

          {/* Section: ISP & Network Side Detection */}
          <h2 className="text-sm font-bold text-[var(--text-primary)]">ISP & Network-Side Telemetry: Why DNS Fails Remotely</h2>
          <p>
            Sometimes, local computer configurations are flawless, and the issue originates from the telecommunications carrier&apos;s routing core. Here is how ISPs monitor and trigger remote DNS failures:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-[11px] text-[var(--text-muted)]">
            <li>
              <strong>Recursive Resolver Exhaustion:</strong> ISP recursion daemons handle millions of queries concurrently. Under severe Distributed Denial of Service (DDoS) attacks or network storms, the ISP&apos;s DNS servers will drop incoming Port 53 queries, resulting in sudden DNS_PROBE_FINISHED_NO_INTERNET timeouts.
            </li>
            <li>
              <strong>CGNAT Port Depletion:</strong> Many fiber/cable providers use Carrier-Grade NAT (CGNAT) to multiplex multiple subscribers onto a single public IP. If the CGNAT gateway runs out of available outbound port mappings, your router&apos;s outbound DNS UDP queries cannot secure a socket return path, causing them to time out.
            </li>
            <li>
              <strong>Gateway Relay Degradation:</strong> Residential gateway modems feature miniature system chips with restricted memory buffers. If the router&apos;s local DNS relay cache overflows, it will fail to forward client queries to the ISP WAN gateway, causing client computers to drop resolution.
            </li>
          </ul>
        </article>
      </div>
    </TroubleshootingArticleShell>
  );
}
