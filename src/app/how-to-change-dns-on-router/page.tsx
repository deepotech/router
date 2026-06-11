import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import TroubleshootingArticleShell from "@/components/tools/TroubleshootingArticleShell";
import { JsonLd } from "@/lib/seo/schema";
import { APP_URL } from "@/lib/constants";
import Link from "next/link";
import {
  Globe,
  Wifi,
  Smartphone,
  Shield,
  Zap,
  Gamepad2,
  Settings,
  HelpCircle,
  AlertTriangle,
} from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "How to Change DNS on Router: Best DNS Servers & Setup Guide (2026)",
  description:
    "Step-by-step guide to changing your DNS server on any router brand. Includes the best DNS servers for speed, privacy, and gaming — Cloudflare, Google, OpenDNS, and more.",
  canonical: "/how-to-change-dns-on-router",
  keywords: [
    "how to change dns on router",
    "change dns server router",
    "best dns server for router",
    "change dns settings router",
    "router dns configuration",
    "cloudflare dns router setup",
    "google dns router",
    "best dns for gaming",
    "fastest dns server",
    "change dns android",
    "change dns iphone",
    "private dns router",
    "opendns setup",
    "dns over https router",
    "set custom dns router",
    "configure dns router",
    "IPv6 resolver configuration",
  ],
});

const breadcrumbs = [
  { name: "Router Guides", url: "/routers" },
  { name: "Router Settings", url: "/router-settings" },
  { name: "Change DNS on Router", url: "/how-to-change-dns-on-router" },
];

const troubleshootingSteps = [
  {
    title: "Log In to Your Router's Admin Panel",
    description:
      "Open a web browser and type your router's gateway IP address in the address bar. Common defaults are 192.168.1.1, 192.168.0.1, or brand-specific addresses like router.asus.com or tplinkwifi.net. Enter your admin username and password.",
    tip: "If you do not know your gateway IP, open Command Prompt and run 'ipconfig'. The address next to 'Default Gateway' is your router login address.",
  },
  {
    title: "Navigate to the WAN or Internet DNS Settings",
    description:
      "Once logged in, find the DNS configuration section. This is usually located under WAN, Internet, Advanced, or Network Settings. Look for fields labeled 'Primary DNS', 'Secondary DNS', or 'DNS Server'.",
    tip: "On TP-Link routers, DNS is under Advanced → Network → DHCP Server. On ASUS, navigate to WAN → Internet Connection → WAN DNS Setting.",
  },
  {
    title: "Enter Your Preferred DNS Server Addresses",
    description:
      "Clear the existing DNS addresses and enter your preferred Primary and Secondary DNS. For Cloudflare: 1.1.1.1 (Primary) and 1.0.0.1 (Secondary). For Google: 8.8.8.8 (Primary) and 8.8.4.4 (Secondary).",
    tip: "Always enter both Primary and Secondary DNS. If the primary fails, your router automatically falls back to the secondary without interrupting your connection.",
  },
  {
    title: "Save Settings and Flush DNS Cache",
    description:
      "Click Save or Apply to write the new DNS settings to the router. After saving, flush the DNS cache on your computer: open Command Prompt (Windows) and run 'ipconfig /flushdns', or on macOS: 'sudo dscacheutil -flushcache'.",
    tip: "Restarting your router after changing DNS settings ensures all connected devices receive the updated resolver addresses from the DHCP server immediately.",
  },
  {
    title: "Verify DNS Resolution Speed and Connectivity",
    description:
      "Open a browser and confirm websites load correctly. Use Command Prompt and run 'nslookup google.com' to verify the new DNS server is responding. The 'Server' field should display your new DNS IP address.",
    tip: "Tools like DNS Benchmark (Windows) or namebench allow you to test multiple DNS providers simultaneously to find the fastest server for your specific location.",
  },
];

const faqs = [
  {
    question: "What does changing DNS on a router do?",
    answer:
      "Changing DNS on your router replaces the default DNS server assigned by your ISP with a third-party alternative. DNS (Domain Name System) translates website names like google.com into IP addresses. Switching to a faster or more private DNS provider can reduce page load times, improve security by blocking malicious domains, and bypass ISP-level content filtering. The change applies to every device on your network simultaneously.",
  },
  {
    question: "What is the best DNS server to use on a router?",
    answer:
      "The best DNS server depends on your priority. For speed: Cloudflare (1.1.1.1) is consistently the fastest globally. For reliability: Google (8.8.8.8) has exceptional uptime. For privacy: Cloudflare for Families (1.1.1.3) blocks trackers and malware. For parental controls: OpenDNS FamilyShield (208.67.222.123) filters adult content. For gaming: Cloudflare (1.1.1.1) is recommended for its lowest average latency.",
  },
  {
    question: "Will changing DNS on my router affect all devices?",
    answer:
      "Yes. When you change DNS settings in your router's admin panel, the new DNS server is distributed to every device on your network via DHCP. This includes smartphones, smart TVs, gaming consoles, and computers. Individual devices can override the router's DNS by setting their own DNS addresses in their local network configuration settings.",
  },
  {
    question: "Does changing DNS improve internet speed?",
    answer:
      "Yes, in many cases. ISP default DNS servers are often slow and overloaded, causing delays when resolving domain names. Switching to a faster public DNS provider like Cloudflare (1.1.1.1) or Google (8.8.8.8) can reduce DNS lookup times significantly, resulting in faster page load speeds. It does not increase your base download or upload bandwidth.",
  },
  {
    question: "Is it safe to change DNS on a router?",
    answer:
      "Yes, changing DNS settings is safe and fully reversible. You can always revert to your ISP's default DNS by deleting the custom addresses and saving empty fields. Using reputable DNS providers like Cloudflare, Google, or OpenDNS is generally more secure than ISP defaults, as these providers implement DNSSEC validation and malware-blocking features.",
  },
  {
    question: "How do I change DNS on Android or iPhone?",
    answer:
      "On Android 9+: Go to Settings → Network & Internet → Private DNS → Private DNS provider hostname → enter 'one.one.one.one' for Cloudflare. On iPhone/iOS: Go to Settings → Wi-Fi → tap the (i) icon next to your network → Configure DNS → Manual → add 1.1.1.1 and 1.0.0.1 as server addresses and remove the old entries.",
  },
  {
    question: "What is the difference between Primary and Secondary DNS?",
    answer:
      "Primary DNS is the first server your router queries for domain name resolution. Secondary DNS is a backup server. If the primary DNS server is unreachable or slow, your router automatically falls back to the secondary server. Always configure both to maintain continuous DNS resolution during server outages.",
  },
  {
    question: "How do I know if my DNS has been changed successfully?",
    answer:
      "Open Command Prompt (Windows) or Terminal (macOS/Linux) and run 'nslookup google.com'. The 'Server' field in the output should show the IP address of your new DNS provider (e.g. 1.1.1.1). On Windows, you can also run 'ipconfig /all' and check the 'DNS Servers' field for your network adapter.",
  },
  {
    question: "What is DNS over HTTPS (DoH) and should I use it?",
    answer:
      "DNS over HTTPS (DoH) encrypts DNS queries between your device and the DNS resolver, preventing ISPs or third parties from monitoring which websites you visit. Many modern routers support DoH natively under Advanced or Encrypted DNS settings. Cloudflare (https://cloudflare-dns.com/dns-query) and Google (https://dns.google/dns-query) both support DoH.",
  },
  {
    question: "Why do my devices still show the old ISP DNS after changing router settings?",
    answer:
      "Client devices cache DNS parameters for the duration of their DHCP lease. To force devices to pull updated settings instantly, flush your DNS cache (run 'ipconfig /flushdns' on Windows), power cycle your router, or toggle Wi-Fi OFF and ON on your devices to renew their DHCP lease and receive the new DNS addresses.",
  },
];

const commonCauses = [
  {
    title: "ISP Default DNS Is Slow",
    desc: "ISP-assigned DNS servers are often overloaded and geographically distant, causing delays in domain resolution for every page load.",
  },
  {
    title: "DNS Hijacking by ISP",
    desc: "Some ISPs redirect failed DNS queries to their own search or advertising pages, leaking browsing data and causing unexpected redirections.",
  },
  {
    title: "Stale DHCP Leases",
    desc: "Connected devices keep old DNS server IP addresses in memory until their dynamic DHCP lease expires, showing outdated DNS settings.",
  },
  {
    title: "Leaked IPv6 Resolvers",
    desc: "Failing to update IPv6 DNS settings allows devices to bypass custom IPv4 rules via default ISP IPv6 paths, undermining your changes.",
  },
];

const quickFixChecklist = [
  "Use Cloudflare (1.1.1.1 / 1.0.0.1) for the fastest and most privacy-respecting DNS globally.",
  "Always configure both Primary and Secondary DNS fields to maintain fallback resolution.",
  "Flush your DNS cache after changing settings: run 'ipconfig /flushdns' on Windows.",
  "Restart your router after applying DNS changes to propagate settings to all devices.",
  "Enable DNS over HTTPS (DoH) if your router firmware supports encrypted DNS queries.",
  "Test your new DNS speed with 'nslookup google.com' in Command Prompt before finalizing.",
  "For gaming consoles, set DNS directly on the device for the most responsive configuration.",
];

// ──────────────────────────────────────────
// JSON-LD Schemas
// ──────────────────────────────────────────
const collectionPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${APP_URL}/how-to-change-dns-on-router#collection`,
  url: `${APP_URL}/how-to-change-dns-on-router`,
  name: "How to Change DNS on Router: Complete DNS Setup & Best DNS Guide",
  description:
    "The definitive guide to changing DNS server settings on any router brand. Covers the best DNS providers for speed, gaming, privacy, and parental controls — Cloudflare, Google, OpenDNS, and more.",
  about: [
    { "@type": "Thing", name: "DNS Server Configuration" },
    { "@type": "Thing", name: "Router DNS Settings" },
    { "@type": "Thing", name: "Cloudflare DNS" },
    { "@type": "Thing", name: "Google DNS" },
  ],
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${APP_URL}/how-to-change-dns-on-router#dns-providers`,
  name: "Best DNS Servers for Routers",
  description: "Top-rated public DNS providers ranked by speed, privacy, and use case.",
  numberOfItems: 5,
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Cloudflare DNS (1.1.1.1)", url: "https://1.1.1.1" },
    { "@type": "ListItem", position: 2, name: "Google Public DNS (8.8.8.8)", url: "https://dns.google" },
    { "@type": "ListItem", position: 3, name: "OpenDNS (208.67.222.222)", url: "https://www.opendns.com" },
    { "@type": "ListItem", position: 4, name: "Quad9 (9.9.9.9)", url: "https://www.quad9.net" },
    { "@type": "ListItem", position: 5, name: "NextDNS (Configurable)", url: "https://nextdns.io" },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "@id": `${APP_URL}/how-to-change-dns-on-router#how-to`,
  name: "How to Change DNS Server on a Router",
  description:
    "Step-by-step instructions to change DNS settings in your router admin panel to improve speed, privacy, and security.",
  totalTime: "PT5M",
  supply: [
    { "@type": "HowToSupply", name: "Router Gateway IP Address" },
    { "@type": "HowToSupply", name: "Admin Username and Password" },
  ],
  tool: [{ "@type": "HowToTool", name: "Web Browser" }],
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Log In to Router Admin Panel",
      text: "Open a browser and enter your router's gateway IP (e.g. 192.168.1.1). Log in with admin credentials.",
      url: `${APP_URL}/how-to-change-dns-on-router#step-1`,
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Navigate to DNS Settings",
      text: "Find DNS fields under WAN, Internet, or Advanced → Network settings.",
      url: `${APP_URL}/how-to-change-dns-on-router#step-2`,
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Enter DNS Server Addresses",
      text: "Replace old DNS with your preferred provider: Cloudflare (1.1.1.1 / 1.0.0.1) or Google (8.8.8.8 / 8.8.4.4).",
      url: `${APP_URL}/how-to-change-dns-on-router#step-3`,
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Save Settings and Restart Router",
      text: "Click Save or Apply. Restart the router to propagate DNS changes to all connected devices.",
      url: `${APP_URL}/how-to-change-dns-on-router#step-4`,
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Verify DNS Resolution",
      text: "Run 'nslookup google.com' in Command Prompt to confirm the new DNS server is active.",
      url: `${APP_URL}/how-to-change-dns-on-router#step-5`,
    },
  ],
};

// ──────────────────────────────────────────
// Page Component
// ──────────────────────────────────────────
export default function HowToChangeDnsOnRouterPage() {
  return (
    <TroubleshootingArticleShell
      h1="How to Change DNS on Your Router (Best DNS Servers 2026)"
      intro="Changing your router's DNS server is one of the fastest, most impactful network upgrades you can make. The right DNS provider reduces page load times, protects your devices from malware, gives you faster gaming connections, and bypasses ISP-level content restrictions — without changing your internet plan. This guide covers how to change DNS settings on any router brand, the best DNS servers to use, and how to configure DNS on phones and gaming consoles."
      category="dns"
      breadcrumbs={breadcrumbs}
      faqs={faqs}
      troubleshootingSteps={troubleshootingSteps}
      warningBanner={{
        title: "Only Use DNS Addresses from Trusted Providers",
        text: "Entering incorrect DNS IPs will prevent all connected devices from resolving domain names, causing a complete network outage. Malicious or unverified DNS servers can redirect you to phishing sites and intercept your data. Use only the providers listed in this guide: Cloudflare, Google, OpenDNS, and Quad9.",
      }}
      quickFixChecklist={quickFixChecklist}
      commonCauses={commonCauses}
      whenToContactISP="Contact your ISP if you suspect DNS hijacking — where your browser redirects failed DNS lookups to an ISP search or advertising page instead of returning an NXDOMAIN error. This is a sign your ISP is intercepting DNS traffic. Switching to a DNS-over-HTTPS (DoH) enabled provider is the most effective solution."
      severityLevel="low"
    >
      {/* Schema Injection */}
      <JsonLd data={collectionPageSchema} />
      <JsonLd data={itemListSchema} />
      <JsonLd data={howToSchema} />

      <div className="space-y-10">

        {/* ==========================================
            SECTION 1: INTRO / WHAT IS DNS
            ========================================== */}
        <section className="prose prose-invert max-w-none space-y-4" aria-label="Introduction">
          <div className="flex items-center gap-2 text-[var(--brand-400)] font-semibold text-xs uppercase tracking-wider mb-2">
            <Globe size={14} /> DNS Configuration Authority Guide
          </div>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            Every time you type a website address into your browser, your device sends a query to a DNS (Domain Name System) server to translate the domain name into a numerical IP address. By default, your router uses the DNS server assigned by your ISP — and this server is often slow, logs your browsing data, and lacks modern security features like DNSSEC or malware filtering.
          </p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            Changing your router&apos;s DNS server to a faster, more private alternative like Cloudflare (<code>1.1.1.1</code>) or Google (<code>8.8.8.8</code>) updates this setting for every device on your network simultaneously — smartphones, smart TVs, gaming consoles, and laptops all benefit without requiring individual configuration.
          </p>
        </section>

        {/* ==========================================
            SECTION 2: AI QUICK REFERENCE SNIPPET TABLE (FEATURED SNIPPET)
            ========================================== */}
        <section
          className="glass-card p-6 border border-emerald-950/30 bg-emerald-950/5 rounded-2xl relative overflow-hidden"
          aria-label="Best DNS Servers Quick Reference"
        >
          <div className="absolute top-0 right-0 bg-emerald-500/10 text-emerald-400 text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-bl-lg font-bold">
            AI Overview Summary
          </div>
          <h2 className="text-xs font-bold text-emerald-400 mb-3 uppercase tracking-wide flex items-center gap-1.5">
            <Globe size={12} /> Best DNS Servers for Routers (2026)
          </h2>
          <div className="overflow-x-auto mb-4">
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
                  <td className="px-3 py-2.5 font-semibold text-emerald-400">Speed + Privacy (Recommended)</td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-bold text-[var(--text-primary)]">Google Public DNS</td>
                  <td className="px-3 py-2.5 font-mono">8.8.8.8</td>
                  <td className="px-3 py-2.5 font-mono">8.8.4.4</td>
                  <td className="px-3 py-2.5">Reliability + Global coverage</td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-bold text-[var(--text-primary)]">OpenDNS</td>
                  <td className="px-3 py-2.5 font-mono">208.67.222.222</td>
                  <td className="px-3 py-2.5 font-mono">208.67.220.220</td>
                  <td className="px-3 py-2.5">Parental controls + Security filtering</td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-bold text-[var(--text-primary)]">Quad9</td>
                  <td className="px-3 py-2.5 font-mono">9.9.9.9</td>
                  <td className="px-3 py-2.5 font-mono">149.112.112.112</td>
                  <td className="px-3 py-2.5">Malware blocking + Security</td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-bold text-[var(--text-primary)]">Cloudflare Families</td>
                  <td className="px-3 py-2.5 font-mono">1.1.1.3</td>
                  <td className="px-3 py-2.5 font-mono">1.0.0.3</td>
                  <td className="px-3 py-2.5">Malware + adult content blocking</td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-bold text-[var(--text-primary)]">AdGuard DNS</td>
                  <td className="px-3 py-2.5 font-mono">94.140.14.14</td>
                  <td className="px-3 py-2.5 font-mono">94.140.15.15</td>
                  <td className="px-3 py-2.5">Ad blocking + tracker filtering</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
            Cloudflare (1.1.1.1) is the world&apos;s fastest public DNS resolver and does not log personal IP data, making it the top recommendation for both speed and privacy.
          </p>
        </section>

        {/* ==========================================
            SECTION 3: ROUTER DNS SETTINGS BY BRAND
            ========================================== */}
        <section className="prose prose-invert max-w-none space-y-4" id="brand-settings">
          <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-1.5">
            <Settings size={16} className="text-[var(--brand-400)]" />
            Router DNS Settings Navigation by Brand
          </h2>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            DNS settings are located in different sections depending on your router manufacturer. The table below shows the exact navigation path for each major brand:
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-[11px] text-[var(--text-secondary)]">
              <thead>
                <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                  <th className="px-3 py-2 text-left">Router Brand</th>
                  <th className="px-3 py-2 text-left">Login Address</th>
                  <th className="px-3 py-2 text-left">DNS Settings Location</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)]">
                {[
                  { brand: "TP-Link", href: "/routers/tp-link", login: "tplinkwifi.net", path: "Advanced → Network → DHCP Server → Primary DNS" },
                  { brand: "ASUS", href: "/routers/asus", login: "router.asus.com", path: "WAN → Internet Connection → WAN DNS Setting" },
                  { brand: "NETGEAR", href: "/routers/netgear", login: "routerlogin.net", path: "Basic → Internet → Domain Name Server (DNS) Address" },
                  { brand: "D-Link", href: "/routers/d-link", login: "192.168.0.1", path: "Setup → Internet → DNS Settings" },
                  { brand: "Huawei", href: "/routers/huawei", login: "192.168.8.1", path: "Advanced → DNS → Primary/Secondary DNS" },
                  { brand: "Xiaomi", href: "/routers/xiaomi", login: "192.168.31.1", path: "Settings → Advanced → LAN Settings → DNS" },
                  { brand: "Linksys", href: "/routers/linksys", login: "192.168.1.1", path: "Connectivity → Internet Settings → DNS Server" },
                  { brand: "ZTE", href: "/routers/zte", login: "192.168.1.1", path: "Network → WAN Settings → DNS Configuration" },
                  { brand: "Tenda", href: "/routers/tenda", login: "tendawifi.com", path: "Advanced Settings → DHCP Server → Primary DNS" },
                ].map(({ brand, href, login, path }) => (
                  <tr key={brand}>
                    <td className="px-3 py-2.5 font-semibold text-[var(--text-primary)]">
                      <Link href={href} className="text-[var(--brand-400)] hover:underline">{brand}</Link>
                    </td>
                    <td className="px-3 py-2.5 font-mono">{login}</td>
                    <td className="px-3 py-2.5 text-[var(--text-muted)]">{path}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Having trouble logging in to your router? Visit our{" "}
            <Link href="/router-login" className="text-[var(--brand-400)] hover:underline">Router Login Guide</Link>{" "}
            or{" "}
            <Link href="/router-admin" className="text-[var(--brand-400)] hover:underline">Router Admin Access Guide</Link>{" "}
            for step-by-step login instructions for every brand.
          </p>
        </section>

        {/* ==========================================
            SECTION 4: DETAILED BRAND GUIDES (TP-LINK / ASUS)
            ========================================== */}
        <section className="prose prose-invert max-w-none space-y-4">
          <h2 className="text-base font-bold text-[var(--text-primary)]">
            Step-by-Step DNS Setup: TP-Link and ASUS Routers
          </h2>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Detailed walkthroughs for the two most popular consumer router brands worldwide:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[var(--text-secondary)]">
            <div className="p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-2">
              <span className="font-bold text-[var(--text-primary)] block">
                <Link href="/routers/tp-link" className="text-[var(--brand-400)] hover:underline">TP-Link Router DNS Setup</Link>
              </span>
              <ol className="list-decimal pl-4 space-y-1 text-[11px] text-[var(--text-muted)]">
                <li>Open a browser. Navigate to <strong>tplinkwifi.net</strong> or <strong>192.168.0.1</strong>.</li>
                <li>Log in with your admin credentials (default: admin / admin).</li>
                <li>Go to <strong>Advanced → Network → DHCP Server</strong>.</li>
                <li>Enter Primary DNS: <strong>1.1.1.1</strong> and Secondary DNS: <strong>1.0.0.1</strong>.</li>
                <li>Click <strong>Save</strong>. Power cycle the router.</li>
              </ol>
            </div>
            <div className="p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-2">
              <span className="font-bold text-[var(--text-primary)] block">
                <Link href="/routers/asus" className="text-[var(--brand-400)] hover:underline">ASUS Router DNS Setup</Link>
              </span>
              <ol className="list-decimal pl-4 space-y-1 text-[11px] text-[var(--text-muted)]">
                <li>Open a browser. Navigate to <strong>router.asus.com</strong> or <strong>192.168.1.1</strong>.</li>
                <li>Log in with your ASUS admin credentials.</li>
                <li>Go to <strong>WAN → Internet Connection</strong>.</li>
                <li>Toggle <strong>Connect to DNS Server Automatically</strong> to <strong>No</strong>.</li>
                <li>Enter DNS Server 1: <strong>1.1.1.1</strong> and DNS Server 2: <strong>1.0.0.1</strong>. Click <strong>Apply</strong>.</li>
              </ol>
            </div>
          </div>
        </section>

        {/* ==========================================
            SECTION 5: CHANGE DNS ON PHONE (ANDROID + iOS)
            ========================================== */}
        <section className="prose prose-invert max-w-none space-y-4" id="change-dns-phone">
          <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-1.5">
            <Smartphone size={16} className="text-[var(--brand-400)]" />
            How to Change DNS on Android and iPhone
          </h2>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Configure DNS settings directly on your smartphone when you want to apply changes only for your device, or when connected to public Wi-Fi where router access is unavailable.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-2">
              <span className="font-bold text-[var(--text-primary)] block">Android — Private DNS (Android 9+)</span>
              <ol className="list-decimal pl-4 space-y-1 text-[11px] text-[var(--text-muted)]">
                <li>Go to <strong>Settings → Network &amp; Internet</strong>.</li>
                <li>Tap <strong>Private DNS</strong>.</li>
                <li>Select <strong>Private DNS provider hostname</strong>.</li>
                <li>Enter <strong>one.one.one.one</strong> for Cloudflare or <strong>dns.google</strong> for Google.</li>
                <li>Tap <strong>Save</strong>.</li>
              </ol>
              <p className="text-[10px] text-[var(--text-muted)] italic">Applies DNS over TLS globally for all networks on this device.</p>
            </div>
            <div className="p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-2">
              <span className="font-bold text-[var(--text-primary)] block">iPhone / iOS — Manual DNS</span>
              <ol className="list-decimal pl-4 space-y-1 text-[11px] text-[var(--text-muted)]">
                <li>Go to <strong>Settings → Wi-Fi</strong>.</li>
                <li>Tap the <strong>(i)</strong> icon next to your Wi-Fi network.</li>
                <li>Scroll to <strong>Configure DNS</strong> → select <strong>Manual</strong>.</li>
                <li>Tap <strong>Add Server</strong> → enter <strong>1.1.1.1</strong>.</li>
                <li>Tap <strong>Add Server</strong> → enter <strong>1.0.0.1</strong>.</li>
                <li>Remove the old ISP DNS server entries. Tap <strong>Save</strong>.</li>
              </ol>
              <p className="text-[10px] text-[var(--text-muted)] italic">Configuration applies per Wi-Fi network. Repeat for each network.</p>
            </div>
          </div>
        </section>

        {/* ==========================================
            SECTION 6: DNS FOR GAMING (PS5, XBOX, PC)
            ========================================== */}
        <section className="prose prose-invert max-w-none space-y-4" id="dns-for-gaming">
          <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-1.5">
            <Gamepad2 size={16} className="text-[var(--brand-400)]" />
            Best DNS for Gaming: PS5, Xbox, and PC Configuration
          </h2>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Setting a faster DNS server on your gaming console can reduce matchmaking times, lower latency to game servers, and improve download speeds from PSN or Xbox Live CDN. Cloudflare (1.1.1.1) is the top choice for gaming due to its globally low average latency.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-2">
              <span className="font-bold text-[var(--text-primary)] block">PlayStation 5 DNS Setup</span>
              <ol className="list-decimal pl-4 space-y-1 text-[11px] text-[var(--text-muted)]">
                <li>Go to <strong>Settings → Network</strong>.</li>
                <li>Select <strong>Settings → Set Up Internet Connection</strong>.</li>
                <li>Press <strong>Options → Advanced Settings</strong>.</li>
                <li>Set DNS Settings to <strong>Manual</strong>.</li>
                <li>Primary: <strong>1.1.1.1</strong>, Secondary: <strong>1.0.0.1</strong>.</li>
              </ol>
              <Link href="/ps5-nat-type-fix" className="text-[var(--brand-400)] hover:underline text-[11px] block mt-1">→ PS5 NAT Fix Guide</Link>
            </div>
            <div className="p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-2">
              <span className="font-bold text-[var(--text-primary)] block">Xbox Series X/S DNS Setup</span>
              <ol className="list-decimal pl-4 space-y-1 text-[11px] text-[var(--text-muted)]">
                <li>Go to <strong>Settings → General → Network Settings</strong>.</li>
                <li>Select <strong>Advanced Settings → DNS Settings → Manual</strong>.</li>
                <li>Primary: <strong>1.1.1.1</strong>, Secondary: <strong>1.0.0.1</strong>.</li>
                <li>Press <strong>B</strong> to save changes.</li>
              </ol>
              <Link href="/xbox-nat-type-open" className="text-[var(--brand-400)] hover:underline text-[11px] block mt-1">→ Xbox Open NAT Guide</Link>
            </div>
            <div className="p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-2">
              <span className="font-bold text-[var(--text-primary)] block">Windows PC DNS Setup</span>
              <ol className="list-decimal pl-4 space-y-1 text-[11px] text-[var(--text-muted)]">
                <li>Go to <strong>Settings → Network &amp; Internet → Advanced Network Settings</strong>.</li>
                <li>Click your active adapter → <strong>Edit → Manual → IPv4</strong>.</li>
                <li>Preferred DNS: <strong>1.1.1.1</strong>, Alternate: <strong>1.0.0.1</strong>.</li>
                <li>Click <strong>Save</strong>.</li>
              </ol>
              <Link href="/best-dns-for-gaming" className="text-[var(--brand-400)] hover:underline text-[11px] block mt-1">→ Best DNS for Gaming Guide</Link>
            </div>
          </div>
        </section>

        {/* ==========================================
            SECTION 7: DNS OVER HTTPS (DOH)
            ========================================== */}
        <section className="prose prose-invert max-w-none space-y-4">
          <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-1.5">
            <Shield size={16} className="text-[var(--brand-400)]" />
            DNS over HTTPS (DoH): Encrypted DNS for Maximum Privacy
          </h2>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Standard DNS queries are transmitted in plain text, meaning your ISP and network administrators can see every domain name you query. <strong>DNS over HTTPS (DoH)</strong> encrypts these queries inside standard HTTPS connections on port 443, making them indistinguishable from ordinary web traffic.
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-[11px] text-[var(--text-secondary)]">
              <thead>
                <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                  <th className="px-3 py-2 text-left">Provider</th>
                  <th className="px-3 py-2 text-left">DoH Endpoint</th>
                  <th className="px-3 py-2 text-left">Features</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)]">
                {[
                  { provider: "Cloudflare", endpoint: "https://cloudflare-dns.com/dns-query", features: "No logging, DNSSEC, fastest globally" },
                  { provider: "Google", endpoint: "https://dns.google/dns-query", features: "DNSSEC validation, high reliability" },
                  { provider: "Quad9", endpoint: "https://dns.quad9.net/dns-query", features: "Threat intelligence blocking, DNSSEC" },
                  { provider: "NextDNS", endpoint: "https://dns.nextdns.io/your-id", features: "Configurable blocklists, analytics dashboard" },
                ].map((row) => (
                  <tr key={row.provider}>
                    <td className="px-3 py-2.5 font-semibold text-[var(--text-primary)]">{row.provider}</td>
                    <td className="px-3 py-2.5 font-mono text-[10px]">{row.endpoint}</td>
                    <td className="px-3 py-2.5">{row.features}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            To enable DoH on your router, look for a <strong>DNS over HTTPS</strong>, <strong>Encrypted DNS</strong>, or <strong>Secure DNS</strong> toggle in Advanced Settings. If your router does not support DoH, enable it at the browser level in Chrome, Firefox, or Edge via their Privacy &amp; Security settings.
          </p>
        </section>

        {/* ==========================================
            SECTION 8: DNS SPEED TEST + VERIFICATION
            ========================================== */}
        <section className="prose prose-invert max-w-none space-y-4">
          <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-1.5">
            <Zap size={16} className="text-[var(--brand-400)]" />
            How to Test DNS Speed and Verify Your DNS Changes
          </h2>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            After changing your DNS settings, verify the new configuration is active and test its performance:
          </p>
          <div className="space-y-4 text-xs">
            <div className="p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-2">
              <span className="font-bold text-[var(--text-primary)] block">Method 1: nslookup Command (Windows / macOS / Linux)</span>
              <p className="text-[11px] text-[var(--text-muted)]">Open Command Prompt or Terminal and run:</p>
              <pre className="bg-[var(--bg-surface)] p-2 rounded text-[10px] font-mono border border-[var(--border-subtle)] text-[var(--text-primary)]">
                nslookup google.com
              </pre>
              <p className="text-[11px] text-[var(--text-muted)]">
                The <strong>Server</strong> line should show your new DNS IP (e.g. <code>1.1.1.1</code>). If it still shows an old ISP address, flush your DNS cache and retry.
              </p>
            </div>
            <div className="p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-2">
              <span className="font-bold text-[var(--text-primary)] block">Method 2: Flush DNS Cache (Windows)</span>
              <p className="text-[11px] text-[var(--text-muted)]">Open Command Prompt as Administrator and run:</p>
              <pre className="bg-[var(--bg-surface)] p-2 rounded text-[10px] font-mono border border-[var(--border-subtle)] text-[var(--text-primary)]">
                ipconfig /flushdns
              </pre>
              <p className="text-[11px] text-[var(--text-muted)]">This clears cached DNS records so new queries use the updated server immediately.</p>
            </div>
            <div className="p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-2">
              <span className="font-bold text-[var(--text-primary)] block">Method 3: DNS Speed Benchmark Tools</span>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                Use <strong>DNS Benchmark</strong> (Windows, free by GRC) or <strong>namebench</strong> (cross-platform) to automatically test response times for 50+ DNS providers from your location and identify the fastest resolver for your ISP.
              </p>
            </div>
          </div>
        </section>

        {/* ==========================================
            SECTION 9: DNS COMPARISON TABLE
            ========================================== */}
        <section className="prose prose-invert max-w-none space-y-4">
          <h2 className="text-base font-bold text-[var(--text-primary)]">
            DNS Provider Comparison: Speed, Privacy, and Security Features
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-[11px] text-[var(--text-secondary)]">
              <thead>
                <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                  <th className="px-3 py-2 text-left">Provider</th>
                  <th className="px-3 py-2 text-left">Avg. Speed</th>
                  <th className="px-3 py-2 text-left">No-Log Policy</th>
                  <th className="px-3 py-2 text-left">DNSSEC</th>
                  <th className="px-3 py-2 text-left">DoH / DoT</th>
                  <th className="px-3 py-2 text-left">Malware Filter</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)]">
                {[
                  { p: "Cloudflare (1.1.1.1)", s: "~11 ms", nl: "✅", ds: "✅", doh: "✅ / ✅", mf: "1.1.1.2 / 1.1.1.3" },
                  { p: "Google (8.8.8.8)", s: "~20 ms", nl: "Partial", ds: "✅", doh: "✅ / ✅", mf: "❌" },
                  { p: "OpenDNS", s: "~25 ms", nl: "❌", ds: "✅", doh: "✅ / ✅", mf: "✅ FamilyShield" },
                  { p: "Quad9 (9.9.9.9)", s: "~18 ms", nl: "✅", ds: "✅", doh: "✅ / ✅", mf: "✅" },
                  { p: "AdGuard DNS", s: "~28 ms", nl: "✅", ds: "✅", doh: "✅ / ✅", mf: "✅ + Ads" },
                  { p: "ISP Default", s: "~50–150 ms", nl: "❌", ds: "Varies", doh: "❌ / ❌", mf: "❌" },
                ].map((row) => (
                  <tr key={row.p}>
                    <td className="px-3 py-2.5 font-semibold text-[var(--text-primary)]">{row.p}</td>
                    <td className="px-3 py-2.5 font-mono">{row.s}</td>
                    <td className="px-3 py-2.5">{row.nl}</td>
                    <td className="px-3 py-2.5">{row.ds}</td>
                    <td className="px-3 py-2.5">{row.doh}</td>
                    <td className="px-3 py-2.5">{row.mf}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ==========================================
            SECTION 10: COMMON DNS PROBLEMS & FIXES
            ========================================== */}
        <section className="prose prose-invert max-w-none space-y-4">
          <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-1.5">
            <AlertTriangle size={16} className="text-amber-400" />
            Common DNS Problems and How to Fix Them
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {[
              {
                problem: "Websites not loading after DNS change",
                fix: "Flush your DNS cache ('ipconfig /flushdns' on Windows) and restart your browser. Wait 1–2 minutes for the router to propagate the new DNS addresses to all connected devices.",
              },
              {
                problem: "DNS still shows old ISP server (nslookup)",
                fix: "Some ISPs use DNS hijacking that redirects queries regardless of your settings. Enable DNS over HTTPS (DoH) in your browser settings to bypass this, or contact your ISP.",
              },
              {
                problem: "Slower speeds after changing DNS",
                fix: "The chosen DNS provider may be geographically farther from you. Run a DNS speed benchmark to find the fastest provider for your location. Cloudflare (1.1.1.1) is fastest for most global regions.",
              },
              {
                problem: "Some websites blocked after DNS change",
                fix: "If you switched to a filtering DNS (like OpenDNS or Quad9), malicious or adult-content sites are intentionally blocked. Switch to 1.1.1.1 or 8.8.8.8 if you do not want content filtering.",
              },
            ].map(({ problem, fix }) => (
              <div key={problem} className="p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-1.5">
                <span className="font-bold text-amber-400 text-[11px] block">{problem}</span>
                <p className="text-[11px] text-[var(--text-muted)]">{fix}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ==========================================
            SECTION 11: RELATED GUIDES / INTERNAL LINKS
            ========================================== */}
        <section className="prose prose-invert max-w-none space-y-4">
          <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-1.5">
            <HelpCircle size={16} className="text-[var(--brand-400)]" />
            Related Network Configuration Guides
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {[
              { title: "Best DNS for Gaming (2026)", href: "/best-dns-for-gaming", desc: "Ranked DNS providers for PS5, Xbox, PC — fastest ping comparison." },
              { title: "Best DNS for Faster Internet", href: "/best-dns-for-faster-internet", desc: "Side-by-side speed benchmarks of the top public DNS resolvers." },
              { title: "Port Forwarding Guide", href: "/port-forwarding", desc: "How to open ports for gaming, servers, and remote access." },
              { title: "Router Settings Guide", href: "/router-settings", desc: "Complete guide to every important router configuration panel." },
              { title: "Open NAT Type Guide", href: "/open-nat-type", desc: "How to achieve Open NAT for faster gaming matchmaking." },
              { title: "Change Wi-Fi Password", href: "/change-wifi-password", desc: "Step-by-step guide to updating your wireless password on any router." },
              { title: "Router Login Guide", href: "/router-login", desc: "How to access your router's admin panel from any browser." },
              { title: "Router Password Recovery", href: "/router-password", desc: "How to find or reset your router admin password." },
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
