import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import TroubleshootingArticleShell from "@/components/tools/TroubleshootingArticleShell";
import { JsonLd } from "@/lib/seo/schema";
import { APP_URL } from "@/lib/constants";
import {
  Globe,
  Server,
  RefreshCw,
  Layers,
  Lock,
  Zap,
  Shield,
  Database,
  ChevronRight,
} from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "What Is DNS? Domain Name System Explained (2026 Guide)",
  description:
    "Learn what DNS is, how the Domain Name System works step by step, what DNS records do, and why DNS matters for internet speed, privacy, and security.",
  canonical: "/what-is-dns",
  keywords: [
    "what is dns",
    "domain name system",
    "how dns works",
    "dns explained",
    "dns resolver",
    "dns records",
    "dns server",
    "dns lookup explained",
    "what does dns do",
    "dns for beginners",
  ],
});

const breadcrumbs = [
  { name: "DNS", url: "/dns" },
  { name: "What Is DNS?", url: "/what-is-dns" },
];

const troubleshootingSteps = [
  {
    title: "Understand the DNS Hierarchy",
    description:
      "DNS operates as a distributed, hierarchical database. At the top are 13 Root Server clusters. Beneath them are Top-Level Domain (TLD) servers (.com, .org, .net). Below TLD servers are Authoritative Name Servers that hold individual domain records.",
    tip: "Think of DNS as a chain of directory lookups — each level narrows the answer until the exact IP is found.",
  },
  {
    title: "Trace a DNS Lookup",
    description:
      "When you visit a website, your browser first checks its own cache, then the OS cache, then queries a recursive resolver (typically your ISP or a public resolver like 1.1.1.1). The resolver works through the hierarchy to return the domain's IP.",
  },
  {
    title: "Understand DNS Record Types",
    description:
      "DNS zones store information as records. A records map hostnames to IPv4 addresses. AAAA records map to IPv6. CNAME records create aliases. MX records route email. NS records identify name servers. TXT records store verification data.",
  },
  {
    title: "Learn How DNS Caching Works",
    description:
      "Every DNS response includes a TTL (Time to Live) value — the number of seconds a resolver or device can cache the record before re-querying. Common TTL values range from 300 seconds (5 minutes) to 86400 seconds (24 hours).",
    tip: "Lowering TTL before migrating a site to a new server allows changes to propagate faster worldwide.",
  },
];

const faqs = [
  {
    question: "What is DNS in simple terms?",
    answer:
      "DNS (Domain Name System) is the internet's phonebook. It converts human-readable domain names like 'google.com' into the numeric IP addresses (like 142.250.80.46) that computers use to find and connect to servers. Without DNS, you would need to memorize a unique number for every website you visit.",
  },
  {
    question: "What is a DNS server?",
    answer:
      "A DNS server is any network server that responds to DNS queries. There are four main types: recursive resolvers (the first stop for your device), root name servers (the top of the hierarchy), TLD name servers (.com, .org, etc.), and authoritative name servers (which hold the actual domain zone records).",
  },
  {
    question: "What is a DNS resolver?",
    answer:
      "A DNS recursive resolver is the server your device contacts first when making a DNS query. It takes your query, navigates the DNS hierarchy on your behalf, and returns the final IP address. Your ISP provides one by default, but you can use public resolvers like Cloudflare (1.1.1.1) or Google (8.8.8.8) for better speed and privacy.",
  },
  {
    question: "What is a DNS record?",
    answer:
      "A DNS record is a data entry in a domain's zone file stored on an authoritative name server. Different record types serve different purposes: A records map to IPv4, AAAA to IPv6, MX to mail servers, CNAME creates aliases, and TXT records store text data for verification and anti-spam purposes.",
  },
  {
    question: "What is DNS propagation?",
    answer:
      "DNS propagation is the time it takes for DNS changes (like a new IP address after a server migration) to be updated across all resolvers and caches worldwide. Because resolvers cache records based on TTL values, propagation can take anywhere from a few minutes to 48 hours depending on the domain's TTL setting.",
  },
  {
    question: "How does DNS affect internet speed?",
    answer:
      "DNS directly affects page load times because every domain referenced on a page requires a DNS lookup. Modern pages may require 20–100 lookups to render fully. Using a fast public resolver like Cloudflare (1.1.1.1) — which averages 11ms globally — versus a slow ISP resolver can shave noticeable time off every page load.",
  },
  {
    question: "What is DNS over HTTPS (DoH)?",
    answer:
      "DNS over HTTPS (DoH) encrypts DNS queries inside standard HTTPS traffic on TCP port 443. This prevents ISPs, network operators, or attackers from intercepting, logging, or modifying your DNS requests. DoH is supported by all major browsers and public resolvers like Cloudflare and Google.",
  },
  {
    question: "What is the difference between DNS and IP addresses?",
    answer:
      "An IP address is the actual network address of a server — a numeric identifier like 93.184.216.34 or 2606:2800:220:1::24c (IPv6). DNS is the system that maps human-friendly domain names to those IP addresses. DNS is the translation layer; IP is the underlying routing address.",
  },
];

const quickFixChecklist = [
  "Use a public DNS resolver (1.1.1.1 or 8.8.8.8) for faster resolution times",
  "Enable DNS-over-HTTPS in your browser for encrypted, private queries",
  "Flush your DNS cache when browsing issues arise: ipconfig /flushdns (Windows)",
  "Configure DNS at the router level to protect all devices on your network",
  "Check TTL values when deploying new servers to control propagation speed",
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "@id": `${APP_URL}/what-is-dns#article`,
  headline: "What Is DNS? Domain Name System Explained",
  description:
    "A comprehensive educational guide explaining what the Domain Name System is, how DNS lookup works, DNS record types, resolvers, and why DNS matters for internet performance and privacy.",
  url: `${APP_URL}/what-is-dns`,
  publisher: {
    "@type": "Organization",
    name: "NetDoctor",
    url: APP_URL,
  },
  about: [
    { "@type": "Thing", name: "Domain Name System" },
    { "@type": "Thing", name: "DNS Resolver" },
    { "@type": "Thing", name: "DNS Records" },
  ],
};

const dnsComponents = [
  {
    icon: RefreshCw,
    title: "Recursive Resolver",
    color: "cyan",
    desc: "The first DNS server your device contacts. It queries the root, TLD, and authoritative servers on your behalf and returns the final IP address. Public DNS services (Cloudflare, Google) are recursive resolvers.",
  },
  {
    icon: Layers,
    title: "Root Name Servers",
    color: "emerald",
    desc: "13 logical root server addresses (replicated globally via Anycast). They sit at the top of the DNS tree and direct resolvers to the correct TLD server based on the domain suffix (.com, .org, etc.).",
  },
  {
    icon: Globe,
    title: "TLD Name Servers",
    color: "amber",
    desc: "Top-Level Domain servers manage directories for specific suffixes like .com (Verisign), .org (PIR), and country codes. They direct resolvers to the authoritative name server for each domain.",
  },
  {
    icon: Server,
    title: "Authoritative Name Server",
    color: "purple",
    desc: "The final server in the chain. It holds the authoritative DNS zone file for a domain — containing A, AAAA, MX, CNAME, and TXT records — and returns the definitive IP address to the resolver.",
  },
  {
    icon: Database,
    title: "DNS Cache",
    color: "blue",
    desc: "Temporary storage at browser, OS, and resolver levels. Records are cached until their TTL expires. Caching dramatically reduces lookup time for repeat queries — from 50ms to near-zero.",
  },
  {
    icon: Lock,
    title: "DNS Security (DoH/DoT)",
    color: "rose",
    desc: "DNS-over-HTTPS (DoH) and DNS-over-TLS (DoT) encrypt DNS queries, preventing ISP monitoring, man-in-the-middle attacks, and DNS hijacking. Supported by all modern browsers and resolvers.",
  },
];

const dnsRecords = [
  { type: "A", purpose: "Maps hostname → IPv4 address", example: "example.com → 93.184.216.34" },
  { type: "AAAA", purpose: "Maps hostname → IPv6 address", example: "example.com → 2606:2800:220:1::24c" },
  { type: "CNAME", purpose: "Creates domain alias (canonical name)", example: "www.example.com → example.com" },
  { type: "MX", purpose: "Designates mail server for a domain", example: "mail.example.com (Priority 10)" },
  { type: "NS", purpose: "Identifies authoritative name servers", example: "ns1.registrar-servers.com" },
  { type: "TXT", purpose: "Stores text data (SPF, DKIM, verification)", example: "v=spf1 include:google.com ~all" },
  { type: "SRV", purpose: "Defines host/port for specific services", example: "_sip._tcp.example.com → port 5060" },
  { type: "PTR", purpose: "Reverse DNS — maps IP back to hostname", example: "34.216.184.93.in-addr.arpa → example.com" },
];

export default function WhatIsDnsPage() {
  return (
    <>
      <JsonLd data={articleSchema} />

      <TroubleshootingArticleShell
        h1="What Is DNS? The Domain Name System Explained (2026)"
        intro="The Domain Name System (DNS) is the foundational infrastructure that translates human-readable domain names like 'google.com' into the numeric IP addresses computers use to communicate. Without DNS, the internet as we know it would not function. This guide explains exactly how DNS works, what the different components do, how DNS records are structured, and why your choice of DNS resolver directly affects your speed, privacy, and security."
        category="dns"
        breadcrumbs={breadcrumbs}
        faqs={faqs}
        troubleshootingSteps={troubleshootingSteps}
        quickFixChecklist={quickFixChecklist}
        severityLevel="low"
      >
        {/* DNS Explained: The Simple Version */}
        <section className="mb-10 prose-dark" aria-label="DNS Simple Explanation">
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3">
            DNS in Simple Terms: The Internet&apos;s Phonebook
          </h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-3">
            Every device on the internet communicates using numeric IP addresses — not domain names.
            When you type <strong>google.com</strong> into your browser, your computer has no idea
            where to go without first looking up the numeric IP address associated with that name.
            That lookup process is called a <strong>DNS query</strong>, and DNS is the globally
            distributed system that answers it.
          </p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-3">
            Think of it like a phone contact list. You store &quot;Mum&quot; in your phone, but the
            network routes the call using her actual phone number. DNS stores domain names and
            translates them to IP numbers. The directory is distributed across thousands of servers
            worldwide — no single server holds all the mappings.
          </p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            DNS operates silently in the background of every website visit, email sent, and{" "}
            <Link href="/best-dns-for-gaming" className="text-[var(--brand-400)] hover:underline">
              online game session
            </Link>{" "}
            — performing billions of queries every second globally. Your experience of the internet
            — its speed, reliability, and security — is directly shaped by the quality of the{" "}
            <Link href="/best-dns-servers" className="text-[var(--brand-400)] hover:underline">
              DNS servers
            </Link>{" "}
            you use.
          </p>
        </section>

        {/* DNS Lookup Step by Step */}
        <section className="mb-10" aria-label="How DNS Lookup Works">
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3">
            How a DNS Lookup Works — Step by Step
          </h2>
          <p className="text-sm text-[var(--text-secondary)] mb-5 leading-relaxed">
            When you enter a domain into a browser, the following chain of events happens in under
            100 milliseconds:
          </p>
          <div className="border-l-4 border-[var(--brand-500)] pl-4 py-2 space-y-4 text-sm text-[var(--text-secondary)] bg-[var(--bg-elevated)] rounded-r-xl">
            <ol className="list-decimal pl-5 space-y-3">
              {[
                {
                  title: "Browser Cache Check",
                  text: 'Your browser first checks its own internal DNS cache. If it visited "example.com" recently, the IP address may already be stored locally — resolving instantly with zero network latency.',
                },
                {
                  title: "OS Resolver Cache",
                  text: "If the browser cache misses, the query goes to the operating system's resolver stub. The OS checks its own DNS cache (which you can flush using ipconfig /flushdns on Windows) and the local hosts file.",
                },
                {
                  title: "Recursive Resolver Query",
                  text: "If the OS cache misses, the query is forwarded to your configured recursive DNS resolver — either your ISP's server or a public resolver like Cloudflare (1.1.1.1). The resolver's job is to hunt down the answer.",
                },
                {
                  title: "Root Server Contact",
                  text: 'If the resolver has no cached answer, it queries a Root Name Server. The root doesn\'t know the IP of "example.com", but it knows which TLD server handles ".com" domains and directs the resolver there.',
                },
                {
                  title: "TLD Server Query",
                  text: 'The resolver contacts the .com TLD Name Server (operated by Verisign). The TLD server responds with the address of the Authoritative Name Server for "example.com".',
                },
                {
                  title: "Authoritative Answer",
                  text: 'The resolver queries the Authoritative Name Server — the server managed by the domain owner (or their registrar). The authoritative server reads the A record for "example.com" and returns the definitive IP address.',
                },
                {
                  title: "Cache and Return",
                  text: "The resolver caches the result for the duration specified by the TTL (Time to Live) value in the DNS record, then returns the IP address to the OS, which passes it to the browser. The browser connects to the server at that IP.",
                },
              ].map((step, i) => (
                <li key={i}>
                  <strong>{step.title}:</strong> {step.text}
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* DNS System Components */}
        <section className="mb-10" aria-label="DNS System Components">
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-5">
            DNS System Components Explained
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {dnsComponents.map((c) => {
              const colorMap: Record<string, string> = {
                cyan: "text-cyan-400",
                emerald: "text-emerald-400",
                amber: "text-amber-400",
                purple: "text-purple-400",
                blue: "text-blue-400",
                rose: "text-rose-400",
              };
              return (
                <div
                  key={c.title}
                  className="p-4 glass-card border border-[var(--border-subtle)] rounded-xl space-y-2"
                >
                  <div className="flex items-center gap-2">
                    <c.icon size={16} className={colorMap[c.color]} />
                    <span className={`font-bold text-sm ${colorMap[c.color]}`}>{c.title}</span>
                  </div>
                  <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">{c.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* DNS Record Types */}
        <section className="mb-10" aria-label="DNS Record Types">
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3">DNS Record Types Reference</h2>
          <p className="text-sm text-[var(--text-secondary)] mb-4 leading-relaxed">
            A domain&apos;s DNS Zone File contains multiple record types. Each serves a distinct purpose
            in routing internet traffic. Understanding these records is essential for domain
            management, email delivery, and troubleshooting connectivity issues:
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-[11px] text-[var(--text-secondary)]">
              <thead>
                <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                  <th className="px-3 py-2 text-left">Record Type</th>
                  <th className="px-3 py-2 text-left">Purpose</th>
                  <th className="px-3 py-2 text-left">Example</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)]">
                {dnsRecords.map((r) => (
                  <tr key={r.type}>
                    <td className="px-3 py-2.5 font-bold font-mono text-[var(--brand-400)]">{r.type}</td>
                    <td className="px-3 py-2.5">{r.purpose}</td>
                    <td className="px-3 py-2.5 font-mono text-[var(--text-muted)]">{r.example}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Why DNS Matters */}
        <section className="mb-10 glass-card p-6 border border-[var(--border-subtle)] rounded-2xl">
          <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
            <Zap size={18} className="text-[var(--brand-400)]" />
            Why Your DNS Choice Matters
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[var(--text-secondary)]">
            <div className="space-y-2">
              <div className="font-bold text-emerald-400">Speed</div>
              <p>
                Cloudflare (1.1.1.1) averages 11ms globally. Slow ISP resolvers can take 50–200ms per
                lookup. On pages requiring 50+ lookups, this adds up to seconds of wasted time.
              </p>
            </div>
            <div className="space-y-2">
              <div className="font-bold text-blue-400">Privacy</div>
              <p>
                ISP DNS logs your every query for analytics and advertising. Cloudflare deletes all
                logs within 24 hours. Google and Quad9 provide strong privacy guarantees with DoH/DoT
                encryption.
              </p>
            </div>
            <div className="space-y-2">
              <div className="font-bold text-purple-400">Security</div>
              <p>
                Quad9 (9.9.9.9) blocks queries to known malware and phishing domains using threat
                intelligence from 20+ cybersecurity organizations, protecting all devices on your
                network.
              </p>
            </div>
          </div>
        </section>

        {/* Related Links */}
        <section className="mb-6 glass-card p-5 border border-[var(--border-subtle)] rounded-2xl">
          <h2 className="text-sm font-bold text-[var(--text-primary)] mb-3">Explore the DNS Cluster</h2>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "Best DNS Servers", href: "/best-dns-servers" },
              { label: "Flush DNS Cache", href: "/how-to-flush-dns-cache" },
              { label: "DNS Hub", href: "/dns" },
              { label: "Change DNS on Router", href: "/how-to-change-dns-on-router" },
              { label: "DNS Server Not Responding", href: "/dns-server-not-responding" },
              { label: "Best DNS for Gaming", href: "/best-dns-for-gaming" },
              { label: "Best DNS for PS5", href: "/best-dns-for-ps5" },
              { label: "Best DNS for Xbox", href: "/best-dns-for-xbox" },
              { label: "Best DNS Servers 2026", href: "/best-dns-servers" },
              { label: "Flush DNS Cache", href: "/how-to-flush-dns-cache" },
              { label: "Fastest DNS for Internet", href: "/best-dns-for-faster-internet" },
              { label: "DNS Probe Finished No Internet", href: "/dns-probe-finished-no-internet" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs bg-[var(--bg-elevated)] border border-[var(--border-subtle)] hover:border-[var(--brand-800)] px-3 py-1.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--brand-400)] transition-all font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </section>
      </TroubleshootingArticleShell>
    </>
  );
}
