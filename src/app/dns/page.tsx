import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import TroubleshootingArticleShell from "@/components/tools/TroubleshootingArticleShell";
import { JsonLd } from "@/lib/seo/schema";
import { APP_URL } from "@/lib/constants";
import Link from "next/link";
import {
  Settings,
  Info,
  AlertTriangle,
  KeyRound,
  Wifi,
  Smartphone,
  Gamepad2,
  Tv,
  Shield,
  HelpCircle,
  FileText,
  CheckSquare,
  Globe,
  Lock,
  Server,
  Zap,
  ChevronRight,
  RefreshCw,
  Layers,
  EyeOff,
  Radio
} from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "DNS Guide: How the Domain Name System Works & Best Servers (2026)",
  description:
    "The definitive authority guide to the Domain Name System (DNS). Learn how DNS works, compare the fastest public resolvers (Cloudflare, Google, Quad9), troubleshoot DNS errors, and configure settings.",
  canonical: "/dns",
  keywords: [
    "dns",
    "what is dns",
    "dns server",
    "domain name system",
    "dns explained",
    "dns settings",
    "best dns server",
    "dns lookup",
    "dns resolver",
    "public dns",
    "dns configuration",
    "dns server not responding",
    "change dns settings"
  ],
});

const breadcrumbs = [
  { name: "Networking Guides", url: "/problems" },
  { name: "DNS", url: "/dns" },
];

const troubleshootingSteps = [
  {
    title: "Verify Physical Connectivity",
    description: "Ensure your physical network adapter (Ethernet or Wi-Fi link) is active. To rule out DNS resolution failure, try pinging a public IP address directly (such as 8.8.8.8 or 1.1.1.1) in your system console. If the IP ping succeeds but domain name pings fail, your internet connection is active, and the issue lies purely in DNS configuration.",
    tip: "Open Command Prompt (Windows) or Terminal (macOS/Linux) and run 'ping 8.8.8.8'. If packets transmit and receive successfully, your hardware and ISP connection are operating correctly."
  },
  {
    title: "Identify Your Current DNS Resolver",
    description: "Check which DNS servers your operating system is querying. On Windows, open a console and execute 'ipconfig /all', looking for the 'DNS Servers' line under your active adapter. On macOS or Linux, print the resolver configuration file by running 'cat /etc/resolv.conf' in the terminal.",
    tip: "If the DNS server IP listed matches your default gateway (e.g., 192.168.1.1), your computer is utilizing the router's DNS proxy forwarding table."
  },
  {
    title: "Flush Your Local OS DNS Cache",
    description: "Clear out stale, outdated, or corrupted domain-to-IP mappings saved in your system memory. This forces your browser to request fresh, updated IP address entries from your DNS resolver, bypassing old cached data that might be causing errors.",
    tip: "On Windows, run 'ipconfig /flushdns' as an administrator. On macOS, run 'sudo killall -HUP mDNSResponder' in the terminal."
  },
  {
    title: "Manually Configure DNS Resolver Addresses",
    description: "Upgrade from default ISP name servers to high-performance public resolvers. Configure your network adapter's IPv4 properties to use Cloudflare DNS (Primary: 1.1.1.1, Secondary: 1.0.0.1) or Google DNS (Primary: 8.8.8.8, Secondary: 8.8.4.4). For router-level configuration, log in to your router console and input these IPs in the WAN DNS parameters.",
    tip: "Always configure both Primary and Secondary DNS addresses to ensure automatic failover redundancy if one provider experience outage."
  },
  {
    title: "Audit Secure Protocol Options (DoH / DoT)",
    description: "Ensure your DNS traffic is encrypted by setting up DNS-over-HTTPS (DoH) or DNS-over-TLS (DoT). In web browsers like Chrome, Edge, or Firefox, navigate to privacy settings and enable secure DNS, choosing a custom provider. On modern operating systems or routers, configure systemic DoH profiles to prevent ISP sniffing.",
    tip: "Wrapping DNS traffic in HTTPS over port 443 keeps your network queries private and prevents local middleware devices from hijacking your DNS packets."
  }
];

const faqs = [
  {
    question: "What is the Domain Name System (DNS)?",
    answer: "DNS stands for Domain Name System, and it serves as the directory of the internet. It translates human-friendly web addresses like 'google.com' into the numeric IP addresses (like '142.251.46.238' or IPv6 '2607:f8b0:4004:83f::200e') that computers, servers, and routers require to communicate. Without DNS, you would have to enter a long sequence of numbers for every page you want to visit."
  },
  {
    question: "What is the fastest DNS server?",
    answer: "Globally, Cloudflare's public DNS (1.1.1.1) is recognized as the fastest public resolver, with an average response time of 11-13ms according to global DNSPerf benchmarks. Google Public DNS (8.8.8.8) is the second-fastest option, averaging around 20ms, while boasting the highest global uptime and cached record availability."
  },
  {
    question: "Does changing my DNS improve my internet speed?",
    answer: "Changing your DNS resolver does not increase your physical internet bandwidth (your download or upload cap in Mbps). However, it improves your 'resolution latency'—the time it takes for your browser to look up a website's location and begin loading it. Because modern web pages load files from dozens of different domains, using a faster DNS makes browsing feel much snappier and websites load significantly quicker."
  },
  {
    question: "Is Cloudflare DNS better than Google DNS?",
    answer: "Both are excellent, but they serve slightly different priorities. Cloudflare (1.1.1.1) is faster in query resolution latency and has a stricter, verified privacy policy that deletes all transaction logs within 24 hours. Google DNS (8.8.8.8) is exceptionally reliable, utilizes a larger global cache, and supports EDNS Client Subnet (ECS) which helps CDNs route media streams to closer caching nodes, making it slightly better for video streaming."
  },
  {
    question: "What causes DNS errors?",
    answer: "DNS errors like 'DNS Server Not Responding' are typically caused by an overloaded resolver on your ISP's network, corrupted DNS cache records on your local computer, a misconfigured router setting, network adapter driver conflicts, or local security firewalls blocking UDP port 53 packets."
  },
  {
    question: "Is using a custom public DNS safe?",
    answer: "Yes, using public DNS resolvers from reputable organizations like Cloudflare, Google, and Quad9 is highly secure and often safer than using your ISP's default DNS. Reputable providers support secure protocols like DNS-over-HTTPS (DoH) and DNS-over-TLS (DoT) that encrypt your queries, and providers like Quad9 actively block malicious domains to protect your system from malware."
  },
  {
    question: "What is a DNS cache?",
    answer: "A DNS cache is a temporary database maintained by your web browser and operating system that stores the IP addresses of websites you have recently visited. Saving these records locally allows your computer to bypass querying external DNS resolvers for subsequent visits to the same site, reducing page load times to nearly zero."
  },
  {
    question: "Should gamers change their DNS settings?",
    answer: "Yes, gamers should change their DNS settings to Cloudflare (1.1.1.1) or Google DNS (8.8.8.8). While changing DNS does not reduce your physical in-game ping (which is determined by server routing), it dramatically reduces matchmaking lookup delays, game server discovery times, lobby load times, and download speeds on networks like PSN and Xbox Live."
  },
  {
    question: "What is DNS over HTTPS (DoH)?",
    answer: "DNS over HTTPS (DoH) is a secure protocol that encrypts standard plaintext DNS queries (which run on UDP port 53) and wraps them inside secure HTTPS traffic on TCP port 443. This prevents ISPs, network administrators, or attackers from sniffing your browsing habits, hijacking your queries, or injecting malicious redirects."
  },
  {
    question: "How do I fix a 'DNS Server Not Responding' error?",
    answer: "To fix this error, start by flushing your local DNS cache using 'ipconfig /flushdns' in Command Prompt. If that fails, restart your router, update your network adapter drivers, temporarily disable your firewall/antivirus, or manually set your network settings to use public DNS servers like 1.1.1.1 and 8.8.8.8."
  },
  {
    question: "What is the fastest DNS for gaming?",
    answer: "The fastest DNS resolver for gaming is Cloudflare DNS (1.1.1.1 and 1.0.0.1). It consistently records the lowest query propagation time globally, which speeds up server lookup queries, matchmaking lobby initialization, and sign-ins on gaming networks. Google DNS (8.8.8.8 and 8.8.4.4) is a highly recommended secondary fallback due to its unmatched stability."
  },
  {
    question: "Can DNS reduce ping in multiplayer games?",
    answer: "No, custom DNS settings do not directly reduce your in-game ping once you are connected to a match. Ping is determined by the physical distance and network routing path between your home and the game server. However, a fast DNS resolver reduces the initial connection setup times, matchmaking discovery queues, and lobby load screens, preventing errors when joining multiplayer rooms."
  }
];

const commonCauses = [
  {
    title: "ISP Resolver Congestion",
    desc: "Default DNS servers provided by your Internet Service Provider are often under-provisioned, leading to high latency spikes and query timeouts during peak evening usage hours."
  },
  {
    title: "Corrupted Local DNS Cache",
    desc: "Stale, outdated, or corrupted DNS lookup records stored in your operating system's memory can cause your browser to attempt connections to incorrect or old server IP addresses."
  },
  {
    title: "DNS Hijacking by ISP or Malware",
    desc: "Unencrypted DNS queries running over standard UDP port 53 can be intercepted by ISPs (to inject search portals) or local adware to redirect traffic to unauthorized, malicious sites."
  },
  {
    title: "Misconfigured Network Adapter Profiles",
    desc: "Incorrectly entered DNS IP addresses, outdated network drivers, or network routing loops caused by virtual network adapter conflicts (VPNs or virtual machines)."
  }
];

const quickFixChecklist = [
  "Verify physical internet connectivity by pinging a public IP address (such as 8.8.8.8).",
  "Manually change your DNS settings to Cloudflare (1.1.1.1) or Google DNS (8.8.8.8).",
  "Flush your local operating system DNS cache ('ipconfig /flushdns' on Windows).",
  "Reboot your router and network adapter to clear temporary cached forwarding tables.",
  "Check and configure DNS settings on both the router level (WAN) and individual device levels."
];

// JSON-LD Schemas
const collectionPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${APP_URL}/dns#collection`,
  "url": `${APP_URL}/dns`,
  "name": "Domain Name System (DNS) Educational & Authority Hub",
  "description": "The definitive resource for Domain Name System (DNS) configuration, troubleshooting, speed optimization, security, and gaming configurations.",
  "about": [
    { "@type": "Thing", "name": "Domain Name System" },
    { "@type": "Thing", "name": "DNS Resolver" },
    { "@type": "Thing", "name": "Public DNS" }
  ]
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${APP_URL}/dns#topics-list`,
  "name": "DNS Optimization and Troubleshooting Guides",
  "description": "A directory of configuration guides and troubleshooting articles for DNS settings.",
  "numberOfItems": 8,
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "What is DNS?", "url": `${APP_URL}/what-is-dns` },
    { "@type": "ListItem", "position": 2, "name": "How to Change DNS on Router", "url": `${APP_URL}/how-to-change-dns-on-router` },
    { "@type": "ListItem", "position": 3, "name": "Best DNS for Gaming", "url": `${APP_URL}/best-dns-for-gaming` },
    { "@type": "ListItem", "position": 4, "name": "Best DNS for Faster Internet", "url": `${APP_URL}/best-dns-for-faster-internet` },
    { "@type": "ListItem", "position": 5, "name": "Best DNS for PS5", "url": `${APP_URL}/best-dns-for-ps5` },
    { "@type": "ListItem", "position": 6, "name": "Best DNS for Xbox", "url": `${APP_URL}/best-dns-for-xbox` },
    { "@type": "ListItem", "position": 7, "name": "DNS Server Not Responding", "url": `${APP_URL}/dns-server-not-responding` },
    { "@type": "ListItem", "position": 8, "name": "DNS Probe Finished No Internet", "url": `${APP_URL}/dns-probe-finished-no-internet` }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "@id": `${APP_URL}/dns#how-to-change-dns`,
  "name": "How to Change DNS Settings on a Router",
  "description": "Step-by-step instructions to configure custom, fast DNS servers on your home gateway router.",
  "totalTime": "PT5M",
  "supply": [
    { "@type": "HowToSupply", "name": "Router Gateway IP Address" },
    { "@type": "HowToSupply", "name": "Router Administrator Credentials" }
  ],
  "tool": [
    { "@type": "HowToTool", "name": "Web Browser" }
  ],
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Identify your Router's Gateway IP",
      "text": "Find your router's default gateway IP address (commonly 192.168.1.1 or 192.168.0.1) using ipconfig in Command Prompt.",
      "url": `${APP_URL}/dns#step-1`
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Log In to Router Administrative Console",
      "text": "Open a web browser, enter the gateway IP in the URL bar, and log in with your admin username and password.",
      "url": `${APP_URL}/dns#step-2`
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Navigate to WAN / Internet Settings",
      "text": "Search the settings menu for WAN, Internet, DHCP Server, or LAN settings to locate the DNS configurations.",
      "url": `${APP_URL}/dns#step-3`
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Enter DNS IPs and Save Settings",
      "text": "Change DNS selection to manual and type the primary and secondary IP addresses of your preferred public DNS provider, then click Save or Apply.",
      "url": `${APP_URL}/dns#step-4`
    }
  ]
};

export default function DnsHubPage() {
  return (
    <TroubleshootingArticleShell
      h1="DNS Complete Authority Guide: Optimization, Settings, Security & Troubleshooting"
      intro="The Domain Name System (DNS) is the foundational phone book of the modern internet. It translates user-friendly domains like google.com into numeric IP addresses that machines use to communicate. Choosing the correct DNS resolver directly affects your browsing speed, network latency, online privacy, and protection against malware. In this definitive guide, learn how DNS works, how to choose the fastest public resolver, configure your settings on all devices, and resolve common DNS connection errors."
      category="dns"
      breadcrumbs={breadcrumbs}
      faqs={faqs}
      troubleshootingSteps={troubleshootingSteps}
      warningBanner={{
        title: "DNS Security & Privacy Warning",
        text: "Using default Internet Service Provider (ISP) DNS servers often leaves your traffic unencrypted, allowing third parties to log your browsing history or execute DNS hijacking. Manually configuring your settings to use trusted public DNS resolvers that support DNS-over-HTTPS (DoH) or DNS-over-TLS (DoT) is highly recommended."
      }}
      quickFixChecklist={quickFixChecklist}
      commonCauses={commonCauses}
      whenToContactISP="If custom DNS settings are configured correctly on both the router and local clients, but web browsers continue to report name resolution failures, contact your ISP. They may be employing transparent DNS hijacking proxies at the modem level or experiencing core routing failures that block external DNS queries on port 53."
      severityLevel="low"
    >
      <JsonLd data={collectionPageSchema} />
      <JsonLd data={itemListSchema} />
      <JsonLd data={howToSchema} />

      <div className="space-y-10">

        {/* =========================================================================
            SECTION 1: WHAT IS DNS? (HERO + FEATURED SNIPPET)
            ========================================================================= */}
        <section className="prose prose-invert max-w-none space-y-4" aria-label="What is DNS">
          <div className="flex items-center gap-2 text-[var(--brand-400)] font-semibold text-xs uppercase tracking-wider mb-2">
            <Globe size={14} /> Domain Name System Overview
          </div>
          <h2 className="text-xl font-bold text-[var(--text-primary)]">Section 1 — What Is DNS? (Domain Name System Explained)</h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            The <strong>Domain Name System (DNS)</strong> translates human-readable domain names such as <code>google.com</code> or <code>wikipedia.org</code> into numeric IP addresses that computers use to communicate across the global internet. When a user requests a website, their computer performs a DNS query to map the text-based URL into a machine-readable routing address. This translation process lies at the core of all web browsing, email transmission, and online gaming.
          </p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            If you want to understand the system as a whole, it is helpful to look at the primary components and addresses. To help you get an immediate overview of the primary DNS resolvers available today, see our featured snippet comparison table below:
          </p>

          <div className="glass-card p-6 border border-emerald-950/30 bg-emerald-950/5 rounded-2xl relative overflow-hidden my-6">
            <div className="absolute top-0 right-0 bg-emerald-500/10 text-emerald-400 text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-bl-lg font-bold">
              AI Featured Snippet Reference
            </div>
            <h3 className="text-xs font-bold text-emerald-400 mb-3 uppercase tracking-wide flex items-center gap-1.5">
              <Zap size={12} /> Top Public DNS Resolvers Quick Reference
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-[var(--border-subtle)] text-[11px] text-[var(--text-secondary)]">
                <thead>
                  <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                    <th className="px-3 py-2 text-left border-b border-[var(--border-subtle)]">DNS Provider</th>
                    <th className="px-3 py-2 text-left border-b border-[var(--border-subtle)]">Primary DNS</th>
                    <th className="px-3 py-2 text-left border-b border-[var(--border-subtle)]">Secondary DNS</th>
                    <th className="px-3 py-2 text-left border-b border-[var(--border-subtle)]">Best For</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-subtle)]">
                  <tr>
                    <td className="px-3 py-2.5 font-bold text-[var(--text-primary)]">Cloudflare</td>
                    <td className="px-3 py-2.5 font-mono">1.1.1.1</td>
                    <td className="px-3 py-2.5 font-mono">1.0.0.1</td>
                    <td className="px-3 py-2.5 font-semibold text-emerald-400">Privacy & Speed</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2.5 font-bold text-[var(--text-primary)]">Google DNS</td>
                    <td className="px-3 py-2.5 font-mono">8.8.8.8</td>
                    <td className="px-3 py-2.5 font-mono">8.8.4.4</td>
                    <td className="px-3 py-2.5 font-semibold text-blue-400">Reliability & Caching</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2.5 font-bold text-[var(--text-primary)]">Quad9</td>
                    <td className="px-3 py-2.5 font-mono">9.9.9.9</td>
                    <td className="px-3 py-2.5 font-mono">149.112.112.112</td>
                    <td className="px-3 py-2.5 font-semibold text-purple-400">Security & Threat Blocking</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2.5 font-bold text-[var(--text-primary)]">OpenDNS</td>
                    <td className="px-3 py-2.5 font-mono">208.67.222.222</td>
                    <td className="px-3 py-2.5 font-mono">208.67.220.220</td>
                    <td className="px-3 py-2.5 font-semibold text-amber-500">Content Filtering & Controls</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-[10px] text-[var(--text-muted)] mt-2 leading-relaxed">
              Note: To explore what DNS is in deeper detail, we recommend visiting our entry guide on <Link href="/what-is-dns" className="text-[var(--brand-400)] hover:underline font-semibold">what is DNS</Link>. Understanding these addresses is the first step to securing and optimizing your connection.
            </p>
          </div>

          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            By default, when you sign up for internet access, your ISP assigns dynamic name servers automatically. However, these servers are often slow, insecure, and record your browsing habits for telemetry and advertising. In contrast, using a third-party recursive DNS service (like Cloudflare or Google) bypasses these issues and routes your requests to the nearest edge network node.
          </p>
          
          <div className="overflow-x-auto my-4">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-[11px] text-[var(--text-secondary)]">
              <thead>
                <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                  <th className="px-3 py-2 text-left">DNS Term</th>
                  <th className="px-3 py-2 text-left">Technical Meaning</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)]">
                <tr>
                  <td className="px-3 py-2.5 font-bold">DNS (Domain Name System)</td>
                  <td className="px-3 py-2.5">The globally distributed hierarchical database system that maps textual domain hostnames to IP addresses.</td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-bold">Resolver (Recursive Resolver)</td>
                  <td className="px-3 py-2.5">A server that receives queries from local clients, performs recursions by querying upstream servers, and returns the final IP.</td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-bold">Public DNS</td>
                  <td className="px-3 py-2.5">A free, third-party resolver infrastructure (e.g. Cloudflare or Google) that replaces your ISP's name servers.</td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-bold">DNS Cache</td>
                  <td className="px-3 py-2.5">A temporary storage database in browsers, OS, and routers that keeps previous DNS query results to accelerate loading.</td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-bold">DNS Server</td>
                  <td className="px-3 py-2.5">Any network server (recursive, root, TLD, or authoritative name server) that receives and processes DNS requests.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* =========================================================================
            SECTION 2: HOW DNS WORKS
            ========================================================================= */}
        <section className="prose prose-invert max-w-none space-y-4" aria-label="How DNS Works">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">Section 2 — How DNS Works: The Lookup Lifecycle</h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            When you enter a web address into your browser, an intricate chain of communication takes place behind the scenes within milliseconds. If the requested domain name is not already cached locally, your device initiates a recursive query.
          </p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            This resolution process goes through six distinct phases:
          </p>
          
          <div className="border-l-4 border-[var(--brand-500)] pl-4 py-2 space-y-3 text-sm text-[var(--text-secondary)] bg-[var(--bg-elevated)] rounded-r-xl">
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                <strong>Browser Request:</strong> Your browser reads the URL entered (e.g., <code>example.com</code>). It first checks its internal browser cache. If the record isn't found, it requests the local Operating System resolver to fetch the address.
              </li>
              <li>
                <strong>Recursive Resolver Query:</strong> The OS resolver sends a query packet to the configured DNS recursive resolver (typically your ISP's server or a public resolver like 1.1.1.1). The recursive resolver's job is to hunt down the IP address by traversing the DNS hierarchy.
              </li>
              <li>
                <strong>Root Server Lookup:</strong> If the recursive resolver does not have the record cached, it queries one of the world's 13 root name servers. The root server does not know the specific IP of <code>example.com</code>; instead, it reads the Top-Level Domain (TLD) suffix (e.g., <code>.com</code>) and directs the resolver to the responsible TLD server.
              </li>
              <li>
                <strong>TLD Server Query:</strong> The recursive resolver queries the TLD name server (in this case, the registry for <code>.com</code> domains). The TLD server reads the second-level domain name (<code>example</code>) and responds with the IP address of the authoritative name servers for that domain.
              </li>
              <li>
                <strong>Authoritative Name Server Query:</strong> The resolver queries the authoritative name server (managed by the domain owner or registrar). The authoritative server holds the master DNS zone records. It reads the host and returns the destination IPv4 address (found in the A record) or IPv6 address (AAAA record) back to the resolver.
              </li>
              <li>
                <strong>Final IP Response & Rendering:</strong> The recursive resolver receives the IP address from the authoritative server, saves the record in its own local cache for a duration specified by the Time-to-Live (TTL), and passes the numeric IP back to the computer's OS. The operating system caches the IP, forwards it to the browser, and the browser establishes a TCP/TLS connection to the target server to download the website files.
              </li>
            </ol>
          </div>
          
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            This entire lookup workflow is executed using light User Datagram Protocol (UDP) packets over port 53, completing in a fraction of a second. If any step along this path is delayed due to network congestion, the user experiences slow page loads, often labeled as a host resolution delay.
          </p>
        </section>

        {/* =========================================================================
            SECTION 3: DNS COMPONENTS EXPLAINED
            ========================================================================= */}
        <section className="prose prose-invert max-w-none space-y-4" aria-label="DNS Components">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">Section 3 — DNS Components Explained</h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            To understand the reliability and speed of the Domain Name System, it is important to examine the role of each server type in the hierarchy:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[var(--text-secondary)]">
            <div className="p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-2">
              <span className="font-bold text-[var(--text-primary)] flex items-center gap-1">
                <RefreshCw size={14} className="text-cyan-400" /> Recursive Resolver
              </span>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                The recursive resolver acts as the middleman between the client computer and the DNS server hierarchy. Its primary job is to accept client queries, query the root, TLD, and authoritative servers sequentially, and return the final IP address to the user. Public DNS servers are recursive resolvers.
              </p>
            </div>
            <div className="p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-2">
              <span className="font-bold text-[var(--text-primary)] flex items-center gap-1">
                <Layers size={14} className="text-emerald-400" /> Root Name Servers
              </span>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                Root servers sit at the top of the DNS hierarchy. There are 13 logical root server addresses globally (labeled a.root-servers.net to m.root-servers.net), though they are replicated across hundreds of physical locations using Anycast routing. Root servers direct query traffic to TLD servers based on top-level domain suffixes.
              </p>
            </div>
            <div className="p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-2">
              <span className="font-bold text-[var(--text-primary)] flex items-center gap-1">
                <Globe size={14} className="text-amber-400" /> TLD Name Servers
              </span>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                Top-Level Domain (TLD) servers manage the directory records for specific extensions (like .com, .org, .net, or country codes like .uk, .ca). TLD registries (such as Verisign for .com) direct resolvers to the authoritative servers that store the zone records for individual domains.
              </p>
            </div>
            <div className="p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-2">
              <span className="font-bold text-[var(--text-primary)] flex items-center gap-1">
                <Server size={14} className="text-purple-400" /> Authoritative Name Servers
              </span>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                The authoritative name server is the final destination in the resolution chain. It holds the actual DNS zone file containing records (A, AAAA, CNAME, MX) configured by the domain owner. When a resolver requests a hostname from an authoritative server, it receives the exact IP mapping.
              </p>
            </div>
          </div>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed mt-4">
            Understanding the distinction between these servers helps troubleshoot connection bottlenecks. For instance, an issue at the authoritative level means a website is misconfigured, while a slow recursive resolver means your local settings are pointing to a congested DNS server.
          </p>
        </section>

        {/* =========================================================================
            SECTION 4: COMMON DNS RECORD TYPES
            ========================================================================= */}
        <section className="prose prose-invert max-w-none space-y-4" aria-label="Common DNS Record Types">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">Section 4 — Common DNS Record Types</h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            The authoritative name server stores domain information in a standard format called a <strong>DNS Zone File</strong>. This file consists of distinct records, each serving a unique network mapping purpose. Below is a reference comparison table of the most common record types:
          </p>

          <div className="overflow-x-auto my-4">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-[11px] text-[var(--text-secondary)]">
              <thead>
                <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                  <th className="px-3 py-2 text-left">Record Type</th>
                  <th className="px-3 py-2 text-left">Purpose</th>
                  <th className="px-3 py-2 text-left">Mapped Target</th>
                  <th className="px-3 py-2 text-left">Example Mapping</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)]">
                <tr>
                  <td className="px-3 py-2.5 font-bold">A Record</td>
                  <td className="px-3 py-2.5">Maps a hostname to an IPv4 address.</td>
                  <td className="px-3 py-2.5">32-bit Numeric IP</td>
                  <td className="px-3 py-2.5 font-mono text-[var(--text-muted)]">example.com → 93.184.216.34</td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-bold">AAAA Record</td>
                  <td className="px-3 py-2.5">Maps a hostname to an IPv6 address.</td>
                  <td className="px-3 py-2.5">128-bit Hexadecimal IP</td>
                  <td className="px-3 py-2.5 font-mono text-[var(--text-muted)]">example.com → 2606:2800:220:1::24c</td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-bold">CNAME</td>
                  <td className="px-3 py-2.5">Creates an alias mapping one domain to another.</td>
                  <td className="px-3 py-2.5">Hostname Link</td>
                  <td className="px-3 py-2.5 font-mono text-[var(--text-muted)]">www.example.com → example.com</td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-bold">MX Record</td>
                  <td className="px-3 py-2.5">Specifies the mail servers responsible for domain email.</td>
                  <td className="px-3 py-2.5">Mail Server Domain</td>
                  <td className="px-3 py-2.5 font-mono text-[var(--text-muted)]">mail.example.com (Priority 10)</td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-bold">TXT Record</td>
                  <td className="px-3 py-2.5">Stores arbitrary text values (verification, SPF, DKIM).</td>
                  <td className="px-3 py-2.5">Text String</td>
                  <td className="px-3 py-2.5 font-mono text-[var(--text-muted)]">google-site-verification=abc123xyz</td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-bold">NS Record</td>
                  <td className="px-3 py-2.5">Identifies the authoritative name servers for the zone.</td>
                  <td className="px-3 py-2.5">Name Server Domain</td>
                  <td className="px-3 py-2.5 font-mono text-[var(--text-muted)]">ns1.registrar-servers.com</td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-bold">SRV Record</td>
                  <td className="px-3 py-2.5">Defines port and host details for specific services.</td>
                  <td className="px-3 py-2.5">Host, Port, Priority, Weight</td>
                  <td className="px-3 py-2.5 font-mono text-[var(--text-muted)]">_sip._tcp.example.com → port 5060</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            Understanding record types is vital when setting up features like custom email hosting or verifying domain ownership. For example, if you change routers or update your network config, you must ensure that your NS records point to the correct servers so your DNS changes propagate correctly.
          </p>
        </section>

        {/* =========================================================================
            SECTION 5: BEST PUBLIC DNS SERVERS
            ========================================================================= */}
        <section className="prose prose-invert max-w-none space-y-4" aria-label="Best Public DNS Servers">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">Section 5 — Best Public DNS Servers</h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            By default, your internet provider assigns DNS servers automatically. While convenient, ISP DNS is often slow, unreliable, and logged for data harvesting. Replacing these defaults with trusted public resolvers is a free and effective way to speed up your connection.
          </p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            Below is a deep look at the best public DNS servers available:
          </p>
          
          <div className="space-y-4 text-xs text-[var(--text-secondary)]">
            <div className="p-4 border border-emerald-900/30 bg-emerald-950/5 rounded-xl space-y-2">
              <span className="font-bold text-emerald-400 block text-xs">Cloudflare DNS (1.1.1.1 & 1.0.0.1)</span>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                Cloudflare's resolver is the fastest free public DNS service in the world, maintaining an average global response time under 13ms. Using its massive Anycast network distributed across over 300 data centers, Cloudflare routes queries to the nearest server. Cloudflare prioritizes privacy, deleting all logs within 24 hours.
              </p>
              <div className="text-[10px] text-[var(--text-muted)] font-mono">
                IPv4: 1.1.1.1 / 1.0.0.1 | IPv6: 2606:4700:4700::1111 / 2606:4700:4700::1001
              </div>
            </div>
            <div className="p-4 border border-blue-900/30 bg-blue-950/5 rounded-xl space-y-2">
              <span className="font-bold text-blue-400 block text-xs">Google Public DNS (8.8.8.8 & 8.8.4.4)</span>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                Google Public DNS is the most widely used resolver in the world. It provides excellent reliability, high cache availability, and resistance to DNS-based attacks. Google DNS supports EDNS Client Subnet (ECS), allowing CDNs to route media streams (like Netflix or YouTube) to local caching nodes for faster load speeds.
              </p>
              <div className="text-[10px] text-[var(--text-muted)] font-mono">
                IPv4: 8.8.8.8 / 8.8.4.4 | IPv6: 2001:4860:4860::8888 / 2001:4860:4860::8844
              </div>
            </div>
            <div className="p-4 border border-purple-900/30 bg-purple-950/5 rounded-xl space-y-2">
              <span className="font-bold text-purple-400 block text-xs">Quad9 (9.9.9.9 & 149.112.112.112)</span>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                Quad9 is operated by a Swiss non-profit foundation focused on cybersecurity. It automatically blocks queries to known malicious domains using threat intelligence from over 20 cybersecurity feeds. If a site contains malware, Quad9 blocks the resolution, protecting your device from infection.
              </p>
              <div className="text-[10px] text-[var(--text-muted)] font-mono">
                IPv4: 9.9.9.9 / 149.112.112.112 | IPv6: 2620:fe::fe / 2620:fe::9
              </div>
            </div>
            <div className="p-4 border border-amber-900/30 bg-amber-950/5 rounded-xl space-y-2">
              <span className="font-bold text-amber-400 block text-xs">OpenDNS (208.67.222.222 & 208.67.220.220)</span>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                Owned by Cisco, OpenDNS offers customized web filtering and parental controls. By setting up a free account, you can configure your router to block specific categories of websites (such as adult content or gambling sites) across your entire network.
              </p>
              <div className="text-[10px] text-[var(--text-muted)] font-mono">
                IPv4: 208.67.222.222 / 208.67.220.220 | IPv6: 2620:0:ccc::2 / 2620:0:ccd::2
              </div>
            </div>
          </div>
          
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed mt-4">
            If you want to read detailed speed tests and setup instructions for these platforms, refer to our comparison guides: <Link href="/best-dns-for-faster-internet" className="text-[var(--brand-400)] hover:underline">Best DNS for Faster Internet</Link> and <Link href="/best-dns-for-gaming" className="text-[var(--brand-400)] hover:underline">Best DNS for Gaming</Link>.
          </p>
        </section>

        {/* =========================================================================
            SECTION 6: DNS FOR GAMING
            ========================================================================= */}
        <section className="prose prose-invert max-w-none space-y-4" aria-label="DNS for Gaming">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">Section 6 — DNS for Gaming</h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            A common misconception in the gaming community is that changing your DNS server directly lowers your in-game ping (e.g. from 50ms to 20ms). <strong>DNS does not affect your physical ping or routing paths to active game servers.</strong> Once your computer establishes a connection to a game server, all subsequent real-time packets bypass the DNS resolver, traveling directly between your client and the host server.
          </p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            However, DNS is critical for other parts of the multiplayer experience:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-xs text-[var(--text-muted)]">
            <li>
              <strong>Matchmaking & Lobby Initialization:</strong> When a game searches for a match, it makes constant DNS queries to discover lobby hosts and authentication servers. Slow DNS resolvers can add several seconds of lag between screens or cause matchmaking timeout errors.
            </li>
            <li>
              <strong>Game Server Discovery:</strong> When you search a server list (like in Rust, Minecraft, or Battlefield), your computer queries the hostnames of hundreds of individual servers. A fast resolver like Cloudflare resolves these queries rapidly, loading server lists instantly.
            </li>
            <li>
              <strong>Lobby Sign-In:</strong> Logging into gaming networks (PSN, Xbox Live, Steam) requires resolving authentication hostnames. Using slow ISP DNS can cause sign-in timeouts or store loading errors.
            </li>
          </ul>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            To optimize your console or PC setup, check out our platform guides: <Link href="/best-dns-for-ps5" className="text-[var(--brand-400)] hover:underline font-semibold">best DNS for PS5</Link> and <Link href="/best-dns-for-xbox" className="text-[var(--brand-400)] hover:underline font-semibold">best DNS for Xbox</Link>. For a broader look at network configurations, see our guide on <Link href="/gaming-network-optimization" className="text-[var(--brand-400)] hover:underline font-semibold">gaming network optimization</Link>.
          </p>
        </section>

        {/* =========================================================================
            SECTION 7: DNS FOR FASTER BROWSING
            ========================================================================= */}
        <section className="prose prose-invert max-w-none space-y-4" aria-label="DNS for Faster Browsing">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">Section 7 — DNS for Faster Browsing</h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            While DNS does not change your physical download bandwidth (measured in Mbps), it significantly affects page resolution speeds. Modern websites load elements from dozens of different domains (e.g., ad networks, analytics trackers, media hosts). Loading a single page can require 20 to 100 separate DNS lookups.
          </p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            Using a slow DNS server can add a small delay to each lookup, causing the page to load noticeably slower. High-performance public resolvers use two key technologies to address this:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-xs text-[var(--text-muted)]">
            <li>
              <strong>Anycast Routing:</strong> Public DNS providers replicate their servers across hundreds of globally distributed data centers sharing a single IP address. Your query is automatically routed to the physically closest node, keeping latency low.
            </li>
            <li>
              <strong>Cache Prefetching:</strong> Leading resolvers preemptively refresh popular domain records in their cache before the Time-to-Live (TTL) expires. This means when you query a popular site, the resolver can serve the cached IP instantly without querying upstream servers.
            </li>
          </ul>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            Switching from a slow ISP DNS to Cloudflare or Google can reduce DNS resolution times from over 100ms to under 15ms. To read more about optimizing your browsing experience, see our guide on the <Link href="/best-dns-for-faster-internet" className="text-[var(--brand-400)] hover:underline font-semibold">best DNS for faster internet</Link>.
          </p>
        </section>

        {/* =========================================================================
            SECTION 8: HOW TO CHANGE DNS SETTINGS
            ========================================================================= */}
        <section className="prose prose-invert max-w-none space-y-4" aria-label="How to Change DNS">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">Section 8 — How to Change DNS Settings</h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            You can configure DNS at the router level (which automatically applies to every device on your network) or directly on individual devices. Below are step-by-step guides for both options:
          </p>

          <div className="space-y-4 text-xs text-[var(--text-secondary)]">
            {/* Router Configuration */}
            <div className="p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-2">
              <span className="font-bold text-[var(--text-primary)] block">1. Configure at the Router Level (Recommended)</span>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                Updating settings on your router applies your new DNS to all connected devices (smart TVs, consoles, phones, IoT devices) automatically:
              </p>
              <ol className="list-decimal pl-4 space-y-1 text-[11px] text-[var(--text-muted)]">
                <li>Open a web browser and enter your router's default gateway IP address (commonly <Link href="/ips/192-168-1-1" className="text-[var(--brand-400)] hover:underline font-mono">192.168.1.1</Link> or <Link href="/ips/192-168-0-1" className="text-[var(--brand-400)] hover:underline font-mono">192.168.0.1</Link>). Learn more in our <Link href="/router-login" className="text-[var(--brand-400)] hover:underline">router login portal guide</Link> and find default credentials in our <Link href="/router-admin" className="text-[var(--brand-400)] hover:underline">router admin database</Link>.</li>
                <li>Enter your administrative username and password (refer to our <Link href="/router-settings" className="text-[var(--brand-400)] hover:underline">router settings overview</Link> if you need assistance).</li>
                <li>Navigate to WAN, Internet, or DHCP Server settings. Look for the parameters labeled <strong>Primary DNS</strong> and <strong>Secondary DNS</strong>.</li>
                <li>Toggle the setting to manual, enter your preferred DNS IP addresses (e.g., Cloudflare's 1.1.1.1 and 1.0.0.1), and save your changes.</li>
              </ol>
              <p className="text-[10px] text-[var(--text-muted)] mt-1">
                For detailed instructions by router manufacturer, see our guide on <Link href="/how-to-change-dns-on-router" className="text-[var(--brand-400)] hover:underline font-semibold">how to change DNS on router</Link>.
              </p>
            </div>

            {/* Windows Configuration */}
            <div className="p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-2">
              <span className="font-bold text-[var(--text-primary)] block">2. Configure on Windows (10 & 11)</span>
              <ol className="list-decimal pl-4 space-y-1 text-[11px] text-[var(--text-muted)]">
                <li>Open Settings and go to <strong>Network & internet → Advanced network settings</strong>.</li>
                <li>Click on your active connection (Wi-Fi or Ethernet) and select <strong>Edit</strong> next to DNS server assignment.</li>
                <li>Change the setting from Automatic (DHCP) to <strong>Manual</strong>, toggle IPv4 to On, and enter your preferred DNS addresses.</li>
                <li>Click <strong>Save</strong> and close settings.</li>
              </ol>
              <p className="text-[10px] text-[var(--text-muted)]">
                Alternative: To change settings using PowerShell as Administrator, execute: <code>Set-DnsClientServerAddress -InterfaceAlias 'Ethernet' -ServerAddresses ('1.1.1.1','1.0.0.1')</code>.
              </p>
            </div>

            {/* macOS Configuration */}
            <div className="p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-2">
              <span className="font-bold text-[var(--text-primary)] block">3. Configure on macOS</span>
              <ol className="list-decimal pl-4 space-y-1 text-[11px] text-[var(--text-muted)]">
                <li>Go to Apple Menu → <strong>System Settings → Network</strong>.</li>
                <li>Click your active adapter, then click <strong>Details...</strong>.</li>
                <li>Select the <strong>DNS</strong> tab in the sidebar.</li>
                <li>Click the '+' icon under the DNS Servers list, add your primary and secondary DNS IPs, and click <strong>OK</strong>.</li>
              </ol>
            </div>

            {/* Mobile Configuration */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-2">
                <span className="font-bold text-[var(--text-primary)] block">4. Configure on Android</span>
                <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                  Go to Settings → Network & internet → Private DNS. Select <strong>Private DNS provider hostname</strong> and enter <code>one.one.one.one</code> (Cloudflare) or <code>dns.google</code> (Google) to enable secure DNS.
                </p>
              </div>
              <div className="p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-2">
                <span className="font-bold text-[var(--text-primary)] block">5. Configure on iOS / iPhone</span>
                <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                  Go to Settings → Wi-Fi. Tap the information 'i' icon next to your active network. Scroll down and tap <strong>Configure DNS → Manual</strong>. Tap Add Server and input the preferred IP addresses.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 9: DNS SECURITY & PRIVACY
            ========================================================================= */}
        <section className="prose prose-invert max-w-none space-y-4" aria-label="DNS Security & Privacy">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">Section 9 — DNS Security & Privacy</h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            The original DNS protocol, developed in the 1983, sends queries in plaintext over UDP port 53. This lacks encryption, exposing your internet activity to security vulnerabilities:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-xs text-[var(--text-muted)]">
            <li>
              <strong>DNS Hijacking:</strong> Attackers or ISPs intercept DNS queries and redirect you to their own search portals or malicious sites.
            </li>
            <li>
              <strong>DNS Spoofing (Poisoning):</strong> Attackers inject fake IP addresses into a recursive resolver's cache, redirecting users to phishing sites when they try to visit legitimate domains.
            </li>
            <li>
              <strong>Plaintext Eavesdropping:</strong> Any device along the network path (including your ISP) can monitor and log the hostnames you resolve, building a history of your browsing habits.
            </li>
          </ul>
          
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            To address these security concerns, modern web standards introduce secure, encrypted protocols:
          </p>
          <div className="space-y-4 text-xs text-[var(--text-secondary)]">
            <div className="p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-2">
              <span className="font-bold text-[var(--text-primary)] block">DNS over HTTPS (DoH)</span>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                DoH encrypts DNS queries and wraps them inside secure HTTPS traffic on TCP port 443. This makes DNS traffic look like standard encrypted web traffic, preventing ISPs and network firewalls from monitoring or blocking your queries.
              </p>
            </div>
            <div className="p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-2">
              <span className="font-bold text-[var(--text-primary)] block">DNS over TLS (DoT)</span>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                DoT encrypts DNS traffic using TLS (Transport Layer Security) over a dedicated port (TCP port 853). Unlike DoH, DoT separates DNS queries from web traffic, making it easier for network administrators to monitor and manage.
              </p>
            </div>
            <div className="p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-2">
              <span className="font-bold text-[var(--text-primary)] block">DNSSEC (Domain Name System Security Extensions)</span>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                DNSSEC adds cryptographic signatures to DNS records at the authoritative server level. When a recursive resolver receives a query response, it verifies this signature to ensure the data has not been modified in transit, preventing DNS spoofing.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 10: DNS VS VPN (NEW ADDITION)
            ========================================================================= */}
        <section className="prose prose-invert max-w-none space-y-4" aria-label="DNS vs VPN">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">Section 10 — DNS vs VPN: Understanding the Differences</h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            Many users wonder about the difference between changing their DNS settings and using a Virtual Private Network (VPN). While both tools improve your online privacy, they work in different ways and secure different parts of your network connection.
          </p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            <strong>DNS (Domain Name System)</strong> changes how your computer translates domain names into IP addresses. Changing your DNS (or enabling secure DNS like DoH or DoT) encrypts your domain queries, preventing your ISP or network administrators from monitoring what websites you look up. However, <em>DNS does not encrypt the actual traffic sent to those websites.</em> Once the IP is resolved, any data you send (such as downloads or form entries) travels over your standard ISP connection.
          </p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            <strong>VPN (Virtual Private Network)</strong> creates an encrypted tunnel for all your network traffic. When using a VPN, every packet sent from your device (including DNS queries, web traffic, and app data) is encrypted and routed through the VPN provider's server. This hides your physical location and IP address, preventing third parties from monitoring your online activity.
          </p>
          
          <div className="overflow-x-auto my-4">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-[11px] text-[var(--text-secondary)]">
              <thead>
                <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                  <th className="px-3 py-2 text-left">Feature</th>
                  <th className="px-3 py-2 text-left">Custom/Secure DNS</th>
                  <th className="px-3 py-2 text-left">Virtual Private Network (VPN)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)]">
                <tr>
                  <td className="px-3 py-2.5 font-bold">Encryption Scope</td>
                  <td className="px-3 py-2.5">Domain name queries only.</td>
                  <td className="px-3 py-2.5">All network traffic and data packets.</td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-bold">IP Address Protection</td>
                  <td className="px-3 py-2.5">Does not hide your public IP address.</td>
                  <td className="px-3 py-2.5">Masks your public IP with the VPN server IP.</td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-bold">Speed Impact</td>
                  <td className="px-3 py-2.5">Zero speed reduction; can improve load times.</td>
                  <td className="px-3 py-2.5">Slight speed reduction due to encryption overhead.</td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-bold">Setup Cost</td>
                  <td className="px-3 py-2.5">100% Free.</td>
                  <td className="px-3 py-2.5">Requires a paid subscription for high speeds.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            For optimal security, you can use both tools together. A VPN secures your active connection, while a custom DNS configured on your router serves as a fallback for devices that cannot run VPN software.
          </p>
        </section>

        {/* =========================================================================
            SECTION 11: COMMON DNS ERROR CODES (NEW ADDITION)
            ========================================================================= */}
        <section className="prose prose-invert max-w-none space-y-4" aria-label="Common DNS Error Codes">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">Section 11 — Common DNS Error Codes</h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            When DNS resolution fails, browsers display specific error codes depending on where the connection broke. Understanding these codes helps isolate the issue:
          </p>

          <div className="overflow-x-auto my-4">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-[11px] text-[var(--text-secondary)]">
              <thead>
                <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                  <th className="px-3 py-2 text-left">Error Code</th>
                  <th className="px-3 py-2 text-left">What It Means</th>
                  <th className="px-3 py-2 text-left">Primary Cause</th>
                  <th className="px-3 py-2 text-left">Troubleshooting Guide</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)]">
                <tr>
                  <td className="px-3 py-2.5 font-mono font-bold">DNS_SERVER_NOT_RESPONDING</td>
                  <td className="px-3 py-2.5">The recursive resolver is offline or unreachable.</td>
                  <td className="px-3 py-2.5">ISP server failure or incorrect local settings.</td>
                  <td className="px-3 py-2.5">
                    <Link href="/dns-server-not-responding" className="text-[var(--brand-400)] hover:underline font-semibold">DNS Not Responding Guide</Link>
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-mono font-bold">DNS_PROBE_FINISHED_NO_INTERNET</td>
                  <td className="px-3 py-2.5">The DNS query probe completed but found no active internet link.</td>
                  <td className="px-3 py-2.5">Physical connection dropout or router gateway offline.</td>
                  <td className="px-3 py-2.5">
                    <Link href="/dns-probe-finished-no-internet" className="text-[var(--brand-400)] hover:underline font-semibold">No Internet Probe Guide</Link>
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-mono font-bold">ERR_NAME_NOT_RESOLVED</td>
                  <td className="px-3 py-2.5">The browser cannot find the IP address for the requested domain.</td>
                  <td className="px-3 py-2.5">Typo in URL or local network connection issues.</td>
                  <td className="px-3 py-2.5">
                    <Link href="/dns-server-not-responding" className="text-[var(--brand-400)] hover:underline">Troubleshoot Host</Link>
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-mono font-bold">NXDOMAIN (Non-Existent Domain)</td>
                  <td className="px-3 py-2.5">The authoritative server reports the domain name does not exist.</td>
                  <td className="px-3 py-2.5">Domain registration expired or DNS propagation delay.</td>
                  <td className="px-3 py-2.5">
                    <Link href="/dns-propagation-checker" className="text-[var(--brand-400)] hover:underline">Check Propagation</Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            By identifying these error codes, you can determine if a connection issue is local to your device, a problem with your router, or an outage on your ISP's network.
          </p>
        </section>

        {/* =========================================================================
            SECTION 12: DNS TROUBLESHOOTING
            ========================================================================= */}
        <section className="prose prose-invert max-w-none space-y-4" aria-label="DNS Troubleshooting">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">Section 12 — DNS Troubleshooting</h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            If you are experiencing DNS errors, use these step-by-step diagnostic actions to resolve the issue:
          </p>
          <div className="border border-[var(--border-subtle)] rounded-xl p-5 bg-[var(--bg-elevated)] space-y-4 text-xs text-[var(--text-secondary)]">
            <span className="font-bold text-[var(--text-primary)] block">DNS Diagnostic Checklist:</span>
            <ol className="list-decimal pl-5 space-y-3 text-[11px] text-[var(--text-muted)]">
              <li>
                <strong>Perform an IP vs Domain Ping Test:</strong> Open your system command console. Execute <code>ping 8.8.8.8</code>. If the ping succeeds, your hardware is connected to the internet. Next, execute <code>ping google.com</code>. If this fails with a host resolution error, your DNS settings are misconfigured or offline.
              </li>
              <li>
                <strong>Flush Your Local DNS Resolver Cache:</strong> Corrupted or outdated records in your local DNS cache can cause resolution issues. Clear the cache using the terminal commands described in the OS guides above.
              </li>
              <li>
                <strong>Change Settings on Individual Clients:</strong> If you cannot access your router's administration panel, set your DNS settings manually on your specific computer or console to bypass the router's DNS proxy.
              </li>
              <li>
                <strong>Reset the TCP/IP Stack:</strong> If you experience persistent network issues, you can reset your network configurations back to default. On Windows, open Command Prompt as Administrator and run: <code>netsh int ip reset</code> followed by <code>netsh winsock reset</code>, then restart your PC.
              </li>
            </ol>
          </div>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            For detailed diagnostic steps, check out our dedicated troubleshooting guides: <Link href="/dns-server-not-responding" className="text-[var(--brand-400)] hover:underline font-semibold font-mono">/dns-server-not-responding</Link> and <Link href="/dns-probe-finished-no-internet" className="text-[var(--brand-400)] hover:underline font-semibold font-mono">/dns-probe-finished-no-internet</Link>.
          </p>
        </section>

        {/* =========================================================================
            SECTION 13: DNS CACHE EXPLAINED
            ========================================================================= */}
        <section className="prose prose-invert max-w-none space-y-4" aria-label="DNS Cache Explained">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">Section 13 — DNS Cache Explained</h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            To speed up page loading, your device saves the results of previous DNS lookups in a temporary database called the <strong>DNS Cache</strong>. This prevents your browser from having to query external DNS resolvers every time you visit a site.
          </p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            DNS caching occurs at multiple layers:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-xs text-[var(--text-muted)]">
            <li>
              <strong>Browser Cache:</strong> Web browsers (like Chrome or Firefox) save resolved IP addresses for a short time (usually a few minutes) to speed up navigation. You can view and clear this cache directly in browser settings (e.g., in Chrome at <code>chrome://net-internals/#dns</code>).
            </li>
            <li>
              <strong>OS Cache:</strong> Your computer's operating system maintains a system-wide DNS cache. Any application running on your computer can access this cache to find resolved addresses quickly.
            </li>
            <li>
              <strong>Router Forwarding Cache:</strong> Your home router caches DNS query results to speed up lookups for all devices connected to your Wi-Fi network.
            </li>
            <li>
              <strong>ISP Recursive Cache:</strong> Your Internet Service Provider's recursive resolver caches domain queries to handle requests from multiple users more efficiently.
            </li>
          </ul>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            Each DNS record contains a <strong>Time-to-Live (TTL)</strong> value set by the domain owner. The TTL specifies how long resolvers and client devices should cache the record before checking back with the authoritative server for updates. If a website changes servers or updates its IP address, users may experience connection issues until their local DNS cache expires.
          </p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            To force your device to update its records immediately, you can flush your DNS cache manually. To learn how to do this on different platforms, check out our guide on <Link href="/how-to-flush-dns-cache" className="text-[var(--brand-400)] hover:underline font-semibold">how to flush DNS cache</Link>.
          </p>
        </section>

        {/* =========================================================================
            SECTION 14: DNS FAQ
            ========================================================================= */}
        <section className="prose prose-invert max-w-none space-y-4" aria-label="DNS FAQs">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">Section 14 — DNS FAQ</h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            Find answers to common questions about the Domain Name System, resolver settings, speed optimization, and security below:
          </p>
          
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="border border-[var(--border-subtle)] rounded-xl p-5 bg-[var(--bg-elevated)] hover:bg-[var(--bg-surface)] transition-all duration-300"
              >
                <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-2">
                  {faq.question}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            INTERNAL NETWORK & SEO HUBS REFERENCE
            ========================================================================= */}
        <section className="prose prose-invert max-w-none space-y-4" aria-label="Internal Directory Resources">
          <h2 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-1.5">
            <HelpCircle size={16} className="text-[var(--brand-400)]" />
            Authority Networking Reference Directory
          </h2>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            To help you configure and troubleshoot your network settings, we maintain a comprehensive directory of networking guides:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <Link href="/how-to-change-dns-on-router" className="p-3 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl hover:border-[var(--brand-400)] transition-colors group block no-underline">
              <span className="font-semibold text-[var(--brand-400)] group-hover:underline text-[11px] block">Change DNS on Router</span>
              <p className="text-[10px] text-[var(--text-muted)] mt-0.5">Step-by-step configuration guide for TP-Link, ASUS, NETGEAR, D-Link, and Linksys.</p>
            </Link>
            <Link href="/best-dns-for-gaming" className="p-3 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl hover:border-[var(--brand-400)] transition-colors group block no-underline">
              <span className="font-semibold text-[var(--brand-400)] group-hover:underline text-[11px] block">Best DNS for Gaming</span>
              <p className="text-[10px] text-[var(--text-muted)] mt-0.5">Ranked latency comparisons and manual setup instructions for lowest ping.</p>
            </Link>
            <Link href="/best-dns-for-faster-internet" className="p-3 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl hover:border-[var(--brand-400)] transition-colors group block no-underline">
              <span className="font-semibold text-[var(--brand-400)] group-hover:underline text-[11px] block">Best DNS for Faster Internet</span>
              <p className="text-[10px] text-[var(--text-muted)] mt-0.5">Benchmark testing comparing Cloudflare, Google, and Quad9 for web browsing.</p>
            </Link>
            <Link href="/dns-server-not-responding" className="p-3 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl hover:border-[var(--brand-400)] transition-colors group block no-underline">
              <span className="font-semibold text-[var(--brand-400)] group-hover:underline text-[11px] block">DNS Server Not Responding</span>
              <p className="text-[10px] text-[var(--text-muted)] mt-0.5">Troubleshoot recursive resolver errors, gateway dropouts, and routing issues.</p>
            </Link>
            <Link href="/dns-probe-finished-no-internet" className="p-3 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl hover:border-[var(--brand-400)] transition-colors group block no-underline">
              <span className="font-semibold text-[var(--brand-400)] group-hover:underline text-[11px] block">DNS Probe Finished No Internet</span>
              <p className="text-[10px] text-[var(--text-muted)] mt-0.5">Diagnose browser errors when DNS checks verify hardware dropouts.</p>
            </Link>
            <Link href="/gaming-network-optimization" className="p-3 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl hover:border-[var(--brand-400)] transition-colors group block no-underline">
              <span className="font-semibold text-[var(--brand-400)] group-hover:underline text-[11px] block">Gaming Network Optimization</span>
              <p className="text-[10px] text-[var(--text-muted)] mt-0.5">Detailed guide to optimizing settings (QoS, DNS, ports) to minimize latency.</p>
            </Link>
            <Link href="/ips" className="p-3 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl hover:border-[var(--brand-400)] transition-colors group block no-underline">
              <span className="font-semibold text-[var(--brand-400)] group-hover:underline text-[11px] block">IP Database Directory</span>
              <p className="text-[10px] text-[var(--text-muted)] mt-0.5">Complete database of default router IP addresses and config login setups.</p>
            </Link>
            <Link href="/dns-leak-test" className="p-3 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl hover:border-[var(--brand-400)] transition-colors group block no-underline">
              <span className="font-semibold text-[var(--brand-400)] group-hover:underline text-[11px] block">DNS Leak Test tool</span>
              <p className="text-[10px] text-[var(--text-muted)] mt-0.5">Test if your browser leaks unencrypted DNS queries to your default ISP resolver.</p>
            </Link>
            <Link href="/best-dns-servers" className="p-3 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl hover:border-[var(--brand-400)] transition-colors group block no-underline">
              <span className="font-semibold text-[var(--brand-400)] group-hover:underline text-[11px] block">Best DNS Servers database</span>
              <p className="text-[10px] text-[var(--text-muted)] mt-0.5">The complete list of verified public IPv4 and IPv6 DNS addresses.</p>
            </Link>
            <Link href="/how-to-flush-dns-cache" className="p-3 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl hover:border-[var(--brand-400)] transition-colors group block no-underline">
              <span className="font-semibold text-[var(--brand-400)] group-hover:underline text-[11px] block">Flush DNS Cache</span>
              <p className="text-[10px] text-[var(--text-muted)] mt-0.5">How to clear cached DNS records on Windows, macOS, Chrome, and routers.</p>
            </Link>
          </div>
        </section>

      </div>
    </TroubleshootingArticleShell>
  );
}
