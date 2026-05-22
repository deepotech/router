import Link from "next/link";
import { Gamepad2, Activity, Globe, Shield, Zap, Info } from "lucide-react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { APP_URL } from "@/lib/constants";

export interface GamingToolShellProps {
  h1: string;
  intro: string;
  toolType: "nat" | "dns-gaming" | "dns-propagation";
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

export default function GamingToolShell({
  h1,
  intro,
  toolType,
  breadcrumbs,
  faqs,
  children,
}: GamingToolShellProps) {
  const mappedBreadcrumbs = breadcrumbs.map((b) => ({
    label: b.name,
    href: b.url,
  }));

  const configs = {
    nat: {
      icon: Gamepad2,
      colorClass: "bg-cyan-950/40 text-cyan-400 border-cyan-800/40 shadow-cyan-900/10",
      appId: "nat-type-checker",
      appName: "RouterVia Gaming NAT Type Assessment Tool",
      description: "Diagnose your console NAT type (Open, Moderate, Strict), check multiplayer connectivity barriers, and retrieve personalized, brand-specific router configurations.",
      howItWorksTitle: "How the NAT Type Assessment Works",
      howItWorksText1: "Because strict browser security sandboxes prevent direct socket access or STUN/TURN binding lookups, this tool utilizes a specialized heuristic network quiz. By mapping your console parameters, router brand, connection state, and current error messages, our engine deduces your exact NAT category (Type 1, 2, or 3) and formulates a direct, brand-specific troubleshooting configuration.",
      howItWorksText2: "NAT (Network Address Translation) dictates how your router maps incoming ports and public sockets to local device IPs. A Strict or Double NAT blocks peer-to-peer handshakes, preventing matchmaking, voice chats, and multiplayer sessions.",
      revealsTitle: "Understanding NAT Types & Their Impact",
      revealCards: [
        { title: "Open NAT (Type 1 / A)", desc: "Your system is connected directly to the internet or has all ports fully forwarded. You can host lobby sessions and connect to any player without issue." },
        { title: "Moderate NAT (Type 2 / B)", desc: "The system is behind a secure router that is forwarding ports correctly. You can join games and chat, but you cannot host lobbies for players with strict NAT." },
        { title: "Strict NAT (Type 3 / C)", desc: "Ports are locked and firewalled. You can only connect to players with Open NAT. You will encounter chat dropouts, high latency, and matchmaking failures." },
        { title: "Double NAT", desc: "Two routers (e.g. ISP gateway + personal mesh) are running DHCP simultaneously. This duplicates the translation layer and causes severe connectivity bugs." },
      ],
      differencesTitle: "UpnP vs. Static Port Forwarding vs. DMZ",
      differencesText1: "UPnP (Universal Plug and Play) is a dynamic protocol that allows gaming systems to request port maps on the fly. While highly convenient, it can sometimes fail under heavy concurrent loads or fail to refresh dynamic leases.",
      differencesText2: "Static Port Forwarding is the gold standard for gaming reliability. By configuring permanent, explicit routing rules for your system's IP, you ensure a bulletproof handshake. DMZ (Demilitarized Zone) forwards all traffic to a single IP — ideal as a temporary diagnostics step but insecure for long-term use on PCs.",
    },
    "dns-gaming": {
      icon: Zap,
      colorClass: "bg-emerald-950/40 text-emerald-400 border-emerald-800/40 shadow-emerald-900/10",
      appId: "best-dns-for-gaming",
      appName: "RouterVia Gaming DNS Performance Suite",
      description: "Analyze, find, and configure the lowest latency, highest reliability public DNS servers for competitive gaming.",
      howItWorksTitle: "How DNS Affects Your Gaming Experience",
      howItWorksText1: "While DNS (Domain Name System) does not directly affect your in-game tick rate or package transfer speed (which is governed by server routing), it dramatically dictates matchmaking lookup times, server handshake latency, and CDNs download speeds for huge game patches.",
      howItWorksText2: "Selecting a high-performance recursive DNS server physically close to your ISP node ensures that global hostname queries are resolved in 1-10ms rather than 50-100ms, making lobbies load and synchronize much faster.",
      revealsTitle: "Top Public DNS Providers for Gaming",
      revealCards: [
        { title: "Cloudflare (1.1.1.1)", desc: "Widely regarded as the fastest public resolver globally. Extreme emphasis on speed, minimal logging, and DNSSEC safety features." },
        { title: "Google (8.8.8.8)", desc: "Highly reliable, highly distributed global network. Provides excellent resolution stability and massive caching depth for patch CDNs." },
        { title: "Quad9 (9.9.9.9)", desc: "Combines exceptional speed with active malicious blocklists, protecting gaming systems from drive-by phishing and malware loops." },
        { title: "OpenDNS (208.67.222.222)", desc: "Cisco-powered infrastructure featuring customizable Web Content Filtering and excellent routing path optimization." },
      ],
      differencesTitle: "Should You Use ISP Default DNS Servers?",
      differencesText1: "By default, your router uses the DNS servers assigned by your ISP. Most ISPs use cheap, unoptimized local cache boxes that get overloaded during peak hours, causing slow hostnames lookups and occasional resolution errors.",
      differencesText2: "Switching your router or console settings to an independent, globally distributed DNS provider ensures faster caching, better security, and cleaner routing hops.",
    },
    "dns-propagation": {
      icon: Globe,
      colorClass: "bg-purple-950/40 text-purple-400 border-purple-800/40 shadow-purple-900/10",
      appId: "dns-propagation-checker",
      appName: "RouterVia Global DNS Propagation Checker",
      description: "Test and verify DNS record propagation across major global public resolvers in real-time.",
      howItWorksTitle: "How Global DNS Propagation Works",
      howItWorksText1: "When you update a DNS record, it doesn't change everywhere instantly. Instead, recursive DNS servers worldwide cache records based on their TTL (Time to Live) parameters. This tool queries authoritative and major recursive nodes in real-time, bypassing local browser cache, to verify if your updates have registered.",
      howItWorksText2: "By checking key resolver clusters (Cloudflare, Google, Quad9, OpenDNS, Level3), you can visually confirm when your new website, mail server, or security records have safely propagated to the global web.",
      revealsTitle: "Why DNS Propagation Varies Globally",
      revealCards: [
        { title: "TTL (Time To Live)", desc: "The duration (in seconds) that recursive resolvers are allowed to cache your record. Lowering this to 300s before a migration ensures fast updates." },
        { title: "ISP Caching Habits", desc: "Some residential ISPs ignore TTL values entirely and cache records for hours or days to save network bandwidth, causing local display delays." },
        { title: "Anycast Routing", desc: "Global DNS networks use Anycast to route queries to the nearest physical datacenter, meaning different nodes can receive updates at slightly different times." },
        { title: "Registry Updates", desc: "Changing Name Servers (NS) requires updating the TLD registry, a process that can naturally take 12 to 24 hours to sync worldwide." },
      ],
      differencesTitle: "How to Clear and Flush Your DNS Cache",
      differencesText1: "If you see old records while our checker reports new ones, your local system or router is caching the old state. You can flush this instantly in Windows by running 'ipconfig /flushdns' in CMD.",
      differencesText2: "On macOS, run 'sudo killall -HUP mDNSResponder' in Terminal. For mobile devices, toggling Airplane Mode on and off for 10 seconds forces a full local DNS cache rebuild.",
    },
  };

  const config = configs[toolType];
  const Icon = config.icon;

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": `${APP_URL}/${config.appId}#app`,
    "name": config.appName,
    "applicationCategory": "GamingApplication",
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

  const clusterLinks = [
    { label: "NAT Type Assessment", href: "/nat-type-checker" },
    { label: "Port Forwarding Guide", href: "/port-forwarding-guide" },
    { label: "Best DNS for Gaming", href: "/best-dns-for-gaming" },
    { label: "Global DNS Propagation", href: "/dns-propagation-checker" },
  ];

  return (
    <>
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

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center border shadow-sm ${config.colorClass}`}>
              <Icon size={20} />
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-[var(--text-primary)]">
              {h1}
            </h1>
          </div>
          <p className="text-[var(--text-secondary)] text-sm md:text-base leading-relaxed">
            {intro}
          </p>
        </div>

        <div className="mb-8">{children}</div>

        <article className="prose prose-invert max-w-none mt-10">
          <section className="mb-10" aria-labelledby="how-it-works">
            <h2 id="how-it-works" className="text-xl font-bold text-[var(--text-primary)] mb-4">
              {config.howItWorksTitle}
            </h2>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-3">
              {config.howItWorksText1}
            </p>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
              {config.howItWorksText2}
            </p>
          </section>

          <section className="mb-10" aria-labelledby="core-features">
            <h2 id="core-features" className="text-xl font-bold text-[var(--text-primary)] mb-4">
              {config.revealsTitle}
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {config.revealCards.map((card) => (
                <div
                  key={card.title}
                  className="bg-[var(--bg-elevated)] rounded-xl p-5 border border-[var(--border-subtle)] hover:border-cyan-800/40 hover:scale-[1.01] transition-all duration-300"
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

          <section className="mb-10" aria-labelledby="tech-details">
            <h2 id="tech-details" className="text-xl font-bold text-[var(--text-primary)] mb-4">
              {config.differencesTitle}
            </h2>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-3">
              {config.differencesText1}
            </p>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
              {config.differencesText2}
            </p>
          </section>

          <section aria-labelledby="faq-section" className="mb-10">
            <h2 id="faq-section" className="text-xl font-bold text-[var(--text-primary)] mb-6">
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

          <section aria-labelledby="related-gaming" className="mb-4 pt-6 border-t border-[var(--border-subtle)]">
            <h2 id="related-gaming" className="text-lg font-bold text-[var(--text-primary)] mb-4">
              Gaming & DNS Optimization Tools
            </h2>
            <div className="flex flex-wrap gap-3">
              {clusterLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm px-4 py-2 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-cyan-400 hover:border-cyan-800 transition-all duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </section>
        </article>
      </div>
    </>
  );
}
