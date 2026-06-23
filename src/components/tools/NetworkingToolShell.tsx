import Link from "next/link";
import { Activity, Shield, Cpu, Network, Info } from "lucide-react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { APP_URL } from "@/lib/constants";

export interface NetworkingToolShellProps {
  h1: string;
  intro: string;
  toolType: "dns" | "port" | "mac" | "subnet" | "ping" | "password";
  breadcrumbs: {
    name: string;
    url: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  children: React.ReactNode;
}

export default function NetworkingToolShell({
  h1,
  intro,
  toolType,
  breadcrumbs,
  faqs,
  children,
}: NetworkingToolShellProps) {
  // Convert standard breadcrumbs format to components breadcrumb format
  const mappedBreadcrumbs = breadcrumbs.map((b) => ({
    label: b.name,
    href: b.url,
  }));

  // Tool specific configurations (colors, icons, pathways, default metadata)
  const configs = {
    dns: {
      icon: Activity,
      colorClass: "bg-emerald-900/20 text-emerald-400 border-emerald-800/30",
      appId: "dns-lookup",
      appName: "RouterVia DNS Lookup Tool",
      description: "A secure and comprehensive online tool to resolve A, AAAA, MX, TXT, NS, and CNAME records for any domain.",
      howItWorksTitle: "How Does the DNS Lookup Tool Work?",
      howItWorksText1: "When you run a DNS lookup query, our secure backend uses node-level DNS resolver libraries to send queries directly to authoritative name servers. Instead of relying on locally cached entries, the tool requests fresh records to ensure you get the absolute most accurate and current configuration.",
      howItWorksText2: "DNS (Domain Name System) is the phonebook of the internet. It translates human-friendly hostnames like google.com into numerical IP addresses like 142.251.46.238 so that computers can establish secure connections.",
      revealsTitle: "Essential DNS Record Types Explained",
      revealCards: [
        { title: "A Records (Address)", desc: "Maps a hostname to an IPv4 address. The most fundamental record used for routing standard web traffic." },
        { title: "AAAA Records", desc: "Maps a domain to its 128-bit IPv6 address, enabling modern dual-stack network connectivity." },
        { title: "MX Records (Mail Exchange)", desc: "Specifies the mail servers responsible for receiving email on behalf of your domain name." },
        { title: "TXT Records (Text)", desc: "Contains descriptive text metadata, heavily used for email verification (SPF, DKIM) and search console ownership." },
      ],
      differencesTitle: "Authoritative vs. Recursive DNS Servers",
      differencesText1: "Recursive DNS servers (like Cloudflare 1.1.1.1 or Google 8.8.8.8) act as intermediaries. They query other servers on your behalf and temporarily cache the results to speed up future requests.",
      differencesText2: "Authoritative DNS servers hold the master records for a domain. Our lookup tool queries authoritative and fresh recursive states to deliver complete transparency into your records.",
    },
    port: {
      icon: Shield,
      colorClass: "bg-orange-900/20 text-orange-400 border-orange-800/30",
      appId: "port-checker",
      appName: "RouterVia Open Port Checker",
      description: "A free online port scanner to check TCP port status, verify port forwarding rules, and test firewall security.",
      howItWorksTitle: "How Does the Open Port Checker Work?",
      howItWorksText1: "Our port checker initiates a direct TCP handshake from our dedicated server to your specified host IP and port. If the remote service responds with a SYN-ACK packet, the port is identified as OPEN. If it times out or returns a RST packet, the port is marked as CLOSED or FILTERED.",
      howItWorksText2: "Testing open ports is crucial for setting up applications like remote desktop (RDP), game servers (Minecraft, Steam), web servers, and ensuring your router's port forwarding rules are active.",
      revealsTitle: "What Does Port Status Reveal?",
      revealCards: [
        { title: "Open Status", desc: "A service is actively listening on this port and accepting connections. Make sure the service is fully secured." },
        { title: "Closed Status", desc: "No service is listening on this port. External connection attempts will be outright rejected." },
        { title: "Filtered / Firewall", desc: "A router firewall is silently dropping packets. The request will time out without getting any response." },
        { title: "Common Attack Vectors", desc: "Leaving administrative ports (like 22 for SSH or 3389 for RDP) open to the public internet invites brute-force attacks." },
      ],
      differencesTitle: "TCP vs. UDP Port Diagnostics",
      differencesText1: "TCP (Transmission Control Protocol) is a connection-oriented protocol that guarantees packet delivery via a three-way handshake. Because of this handshake, TCP ports can easily be checked online.",
      differencesText2: "UDP (User Datagram Protocol) is a connectionless protocol. Since UDP does not require a handshake, checking UDP port status remotely is notoriously difficult and unreliable, as silent firewalls behave the same as active services.",
    },
    mac: {
      icon: Cpu,
      colorClass: "bg-purple-900/20 text-purple-400 border-purple-800/30",
      appId: "mac-address-lookup",
      appName: "RouterVia MAC Address Lookup",
      description: "An instant OUI tool to discover the hardware manufacturer and vendor of any network device by its MAC address.",
      howItWorksTitle: "How Does the MAC Address Lookup Work?",
      howItWorksText1: "A MAC (Media Access Control) address is a unique 48-bit physical hardware identifier. The first 24 bits (6 hexadecimal digits) form the Organizationally Unique Identifier (OUI), which is issued by the IEEE. Our tool extracts this OUI and references an updated manufacturer database to identify the brand.",
      howItWorksText2: "Unlike IP addresses which are logical and assigned dynamically by routers, MAC addresses are physically burned into the network interface card (NIC) at the factory and remain constant.",
      revealsTitle: "What Can You Learn From a MAC Address?",
      revealCards: [
        { title: "Hardware Vendor", desc: "Identifies the exact manufacturer of the chip or device — e.g. Apple, Intel, Samsung, Espressif." },
        { title: "Device Category", desc: "Helps classify unidentified devices on your local WiFi client list (e.g. smart home plug vs. laptop)." },
        { title: "Local Administration", desc: "Reveals if a device is using randomized MAC addresses (common on modern iOS/Android devices for privacy)." },
        { title: "Network Troubleshooting", desc: "Essential for configuring static DHCP leases, MAC address filtering, or router authentication." },
      ],
      differencesTitle: "MAC Randomization & Modern Privacy",
      differencesText1: "To prevent tracking across public networks, modern operating systems (iOS, Android, Windows) dynamically generate a randomized, private MAC address for each SSID connection.",
      differencesText2: "If your lookup returns 'Unknown Vendor', the device is likely using a randomized MAC address. You can disable private addressing in the device's WiFi settings to expose its true hardware MAC.",
    },
    subnet: {
      icon: Network,
      colorClass: "bg-blue-900/20 text-blue-400 border-blue-800/30",
      appId: "subnet-calculator",
      appName: "RouterVia Subnet Calculator",
      description: "A fast offline IP subnet calculator to compute CIDR blocks, subnet masks, usable host ranges, and broadcast addresses.",
      howItWorksTitle: "How Does the Subnet Calculator Work?",
      howItWorksText1: "This tool performs fast, mathematical bitwise operations entirely inside your web browser. By parsing a CIDR notation IP block (like 192.168.1.0/24), it extracts the network prefix, calculates the subnet mask using bitwise shifts, and computes the network, broadcast, and host IP address bounds.",
      howItWorksText2: "Subnetting is the practice of dividing a large network into smaller, logical subnetworks. This improves network routing efficiency, enhances organization, and minimizes security blast radiuses.",
      revealsTitle: "Critical Subnet Metrics Explained",
      revealCards: [
        { title: "Subnet Mask", desc: "A 32-bit number that masks the IP address, dividing it into network bits and host bits (e.g., 255.255.255.0)." },
        { title: "Broadcast Address", desc: "The special IP address used to send data to all host devices within the subnet simultaneously." },
        { title: "First & Last Usable", desc: "The actual range of IP addresses that can be assigned to physical devices (routers, servers, computers)." },
        { title: "Total Usable Hosts", desc: "Calculated as 2^(32-prefix) - 2. We subtract two addresses because the network and broadcast IPs are reserved." },
      ],
      differencesTitle: "Understanding CIDR Prefix Notation",
      differencesText1: "CIDR (Classless Inter-Domain Routing) notation represents an IP address followed by a slash and a decimal number indicating the network prefix length — e.g. /24 implies 24 bits are dedicated to the network.",
      differencesText2: "This modern system replaced the legacy Class A, B, and C address classes in 1993, allowing networks to be split with absolute precision rather than arbitrary, wasteful boundaries.",
    },
    ping: {
      icon: Activity,
      colorClass: "bg-yellow-900/20 text-yellow-400 border-yellow-800/30",
      appId: "ping-test",
      appName: "RouterVia Ping Test",
      description: "A free browser-based ping test to measure latency and packet loss to any host or IP address using HTTP HEAD requests.",
      howItWorksTitle: "How Does the Ping Test Work?",
      howItWorksText1: "This browser-based ping tool sends HTTP HEAD requests to the target host and measures the round-trip time (RTT) — the time it takes for a request to travel from your browser to the server and back. It runs 4 consecutive probes, similar to a traditional ICMP ping, and reports the average latency.",
      howItWorksText2: "Note: Browser pings use HTTP rather than raw ICMP packets, so results include HTTP handshake overhead and may differ from system-level ping times. They are best used for relative comparison between hosts rather than absolute latency measurements.",
      revealsTitle: "Interpreting Ping Results",
      revealCards: [
        { title: "< 20ms — Excellent", desc: "Extremely low latency. Ideal for competitive online gaming, VoIP calls, and real-time financial trading applications." },
        { title: "20–50ms — Good", desc: "Standard home broadband performance. Suitable for gaming and streaming without noticeable lag." },
        { title: "50–100ms — Acceptable", desc: "Moderate latency. May introduce slight delays in competitive gaming. Common on mobile or congested networks." },
        { title: "> 100ms — High", desc: "Noticeable lag. Investigate ISP congestion, Wi-Fi signal strength, VPN overhead, or routing path issues." },
      ],
      differencesTitle: "ICMP Ping vs. HTTP Ping",
      differencesText1: "Traditional ICMP ping (the system command) sends small ICMP Echo Request packets directly to the target IP at the network layer. Many servers block ICMP requests for security, which makes them appear unreachable even when the website is fully accessible.",
      differencesText2: "HTTP HEAD ping (used here) sends a lightweight HTTP request to the web application layer. This gives a more realistic measurement of website accessibility but includes TCP handshake and TLS negotiation overhead. Both methods are valid diagnostic tools for different use cases.",
    },
    password: {
      icon: Shield,
      colorClass: "bg-cyan-900/20 text-cyan-400 border-cyan-800/30",
      appId: "password-generator",
      appName: "RouterVia Password Generator",
      description: "A cryptographically secure browser-based password generator for creating strong WiFi passwords and router admin credentials.",
      howItWorksTitle: "How Does the Password Generator Work?",
      howItWorksText1: "This tool uses the Web Crypto API (crypto.getRandomValues) built into your browser to generate cryptographically secure random passwords. Unlike Math.random() which uses a predictable pseudo-random algorithm, crypto.getRandomValues uses the operating system's entropy pool to generate true randomness that cannot be predicted or reverse-engineered.",
      howItWorksText2: "All password generation happens locally in your browser — no passwords are ever sent to our servers. The tool assembles a character set based on your selected options, then uses the random byte stream to select characters uniformly from that set.",
      revealsTitle: "Password Security Fundamentals",
      revealCards: [
        { title: "Entropy & Length", desc: "Password strength is measured in bits of entropy. Each additional character multiplies the attack space — 16 characters is exponentially harder to crack than 8." },
        { title: "Character Diversity", desc: "Mixing uppercase, lowercase, numbers, and symbols dramatically increases the keyspace — from 26^N to 94^N possible combinations." },
        { title: "WPA2 / WPA3 Requirements", desc: "WiFi passwords must be 8–63 characters. WPA3 uses SAE (Simultaneous Authentication of Equals) to resist offline dictionary attacks even with shorter passwords." },
        { title: "Admin Panel Security", desc: "Router admin passwords are the most critical — a compromised admin panel gives full network control. Always change from the default 'admin/admin' credentials." },
      ],
      differencesTitle: "WPA2 vs. WPA3 Security",
      differencesText1: "WPA2 (Wi-Fi Protected Access 2) uses CCMP-AES encryption with a 4-way handshake that is vulnerable to offline brute-force attacks if a weak password is used. An attacker who captures the handshake can attempt millions of password guesses per second using a GPU.",
      differencesText2: "WPA3 replaces the vulnerable 4-way handshake with SAE (Simultaneous Authentication of Equals), also known as Dragonfly. SAE prevents offline dictionary attacks — each authentication attempt requires active participation, making brute-force attacks computationally impractical. Enable WPA3 in your router's wireless security settings if your devices support it.",
    },
  };

  const config = configs[toolType];
  const Icon = config.icon;

  // JSON-LD Schemas
  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": `${APP_URL}/${config.appId}#app`,
    "name": config.appName,
    "applicationCategory": "NetworkingApplication",
    "operatingSystem": "All",
    "url": `${APP_URL}/${config.appId}`,
    "description": config.description
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": APP_URL,
      },
      ...breadcrumbs.map((b, i) => ({
        "@type": "ListItem",
        "position": i + 2,
        "name": b.name,
        "item": `${APP_URL}${b.url}`,
      }))
    ]
  };

  const relatedToolsCluster = [
    { label: "DNS Lookup Tool", href: "/dns-lookup" },
    { label: "Open Port Checker", href: "/port-checker" },
    { label: "MAC Address Lookup", href: "/mac-address-lookup" },
    { label: "Subnet Calculator", href: "/subnet-calculator" },
  ];

  return (
    <>
      {/* Dynamic JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Breadcrumb items={mappedBreadcrumbs} className="mb-8" />

        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${config.colorClass}`}>
              <Icon size={20} />
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-[var(--text-primary)]">
              {h1}
            </h1>
          </div>
          <p className="text-[var(--text-secondary)]">
            {intro}
          </p>
        </div>

        {/* Interactive Tool Component */}
        <div className="mb-8">{children}</div>

        {/* ── Dynamic SEO Content ──────────────────────────────────────────── */}
        <article className="prose prose-invert max-w-none mt-10">
          {/* How It Works */}
          <section className="mb-10" aria-labelledby="how-it-works">
            <h2
              id="how-it-works"
              className="text-xl font-bold text-[var(--text-primary)] mb-4"
            >
              {config.howItWorksTitle}
            </h2>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-3">
              {config.howItWorksText1}
            </p>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
              {config.howItWorksText2}
            </p>
          </section>

          {/* Core Info Cards */}
          <section className="mb-10" aria-labelledby="core-metrics">
            <h2
              id="core-metrics"
              className="text-xl font-bold text-[var(--text-primary)] mb-4"
            >
              {config.revealsTitle}
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {config.revealCards.map((card) => (
                <div
                  key={card.title}
                  className="bg-[var(--bg-elevated)] rounded-xl p-5 border border-[var(--border-subtle)] hover:border-[var(--brand-800)] hover:scale-[1.01] transition-all duration-300"
                >
                  <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-1">
                    {card.title}
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Deep Technical Explanation */}
          <section className="mb-10" aria-labelledby="technical-details">
            <h2
              id="technical-details"
              className="text-xl font-bold text-[var(--text-primary)] mb-4"
            >
              {config.differencesTitle}
            </h2>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-3">
              {config.differencesText1}
            </p>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
              {config.differencesText2}
            </p>
          </section>

          {/* FAQ Section */}
          <section aria-labelledby="faq-heading" className="mb-10">
            <h2
              id="faq-heading"
              className="text-xl font-bold text-[var(--text-primary)] mb-6"
            >
              Frequently Asked Questions
            </h2>
            <div className="space-y-5">
              {faqs.map((faq) => (
                <div
                  key={faq.question}
                  className="border border-[var(--border-subtle)] rounded-xl p-5 bg-[var(--bg-elevated)] hover:bg-[var(--bg-surface)] transition-all duration-300"
                >
                  <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Internal Linking Mesh / Cluster */}
          <section aria-labelledby="related-tools" className="mb-4 pt-6 border-t border-[var(--border-subtle)]">
            <h2
              id="related-tools"
              className="text-lg font-bold text-[var(--text-primary)] mb-4"
            >
              Related Networking Tools
            </h2>
            <div className="flex flex-wrap gap-3">
              {relatedToolsCluster.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="text-sm px-4 py-2 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--brand-400)] hover:border-[var(--brand-800)] transition-all"
                >
                  {tool.label}
                </Link>
              ))}
            </div>
          </section>
        </article>
      </div>
    </>
  );
}
