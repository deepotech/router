import type { Metadata } from "next";
import Link from "next/link";
import {
  Globe,
  Network,
  ShieldAlert,
  Wifi,
  AlertTriangle,
  ExternalLink,
  Lock,
  MonitorSmartphone,
  Link2,
  Server,
  Info,
} from "lucide-react";
import TroubleshootingArticleShell from "@/components/tools/TroubleshootingArticleShell";
import { buildMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/lib/seo/schema";
import { APP_URL } from "@/lib/constants";

// ── SEO Metadata ──────────────────────────────────────────────────────────────
export const metadata: Metadata = buildMetadata({
  title: "Router Login Hostnames & Domains: Complete Directory Guide",
  description:
    "Complete directory of all router login hostnames and local admin domains. Find routerlogin.net, tplinkwifi.net, mywifiext.net, fritz.box, and more with default IPs, brands, and login instructions.",
  canonical: "/router-login-hostnames",
  keywords: [
    "router login hostnames",
    "router login websites",
    "router login domains",
    "router admin hostnames",
    "router local domain",
  ],
});

// ── Data ──────────────────────────────────────────────────────────────────────
const breadcrumbs = [
  { name: "Router Login", url: "/router-login" },
  { name: "Router Login Hostnames", url: "/router-login-hostnames" },
];

const faqs = [
  {
    question: "What is a router login hostname?",
    answer:
      "A router login hostname is a locally resolvable domain name (such as routerlogin.net or tplinkwifi.net) that your router's built-in DNS server intercepts and redirects to the router's own private IP address. Unlike public domain names, these hostnames never leave your local area network — they resolve only when your device is connected to the specific router that hosts the DNS intercept rule. They function as a human-readable alias for the numeric gateway IP address, making it easier to navigate to the admin console without memorising a sequence of numbers.",
  },
  {
    question: "Why does routerlogin.net not work sometimes?",
    answer:
      "routerlogin.net fails to load when your device's DNS query is answered by a resolver other than the router's own DNS forwarder. Common culprits include active VPN clients (which reroute DNS through a remote server), browser-level DNS-over-HTTPS (DoH) which bypasses the local resolver entirely, being connected to a guest network with AP Isolation active, or a cached NXDOMAIN or redirect stored in the browser's internal DNS cache. The fastest fix is to disable your VPN, switch DoH off in browser settings, clear the browser cache, and attempt the connection again via a private/incognito window.",
  },
  {
    question: "Is tplinkwifi.net safe to visit?",
    answer:
      "Yes — tplinkwifi.net is a legitimate TP-Link router management hostname that resolves exclusively within your local network subnet. It does not route on the public internet. When your device sends a DNS query for tplinkwifi.net, the TP-Link router's firmware intercepts that request and answers with its own private LAN IP address (typically 192.168.0.1), so your browser connects directly to the router hardware, not to a remote web server. There is no third-party involvement. The only security advisory is to always use http:// and not https:// on your first connection, since the router's self-signed TLS certificate may trigger browser warnings.",
  },
  {
    question: "What is the difference between routerlogin.net and 192.168.1.1?",
    answer:
      "routerlogin.net and 192.168.1.1 both point to the same router administration interface — the difference is in how the address is resolved. 192.168.1.1 is a raw IPv4 address that your browser routes directly to the device, bypassing DNS entirely. routerlogin.net is a domain hostname that requires a DNS lookup: your router's internal DNS server intercepts the query and returns 192.168.1.1. Because the hostname approach relies on local DNS, it can fail in environments where DNS resolution is redirected (VPN, DoH, guest network). The IP address method is more reliable as a fallback when DNS-based hostname resolution is broken.",
  },
  {
    question: "Can I access router login hostnames on mobile?",
    answer:
      "Yes, router login hostnames such as tplinkwifi.net, routerlogin.net, and fritz.box work on smartphones and tablets provided the device is connected to the correct Wi-Fi network — not a guest SSID and not cellular data. Open your phone's default browser (Chrome on Android, Safari on iOS), type the hostname into the address bar, and confirm any SSL certificate warnings. Some router manufacturers also offer dedicated mobile companion apps (TP-Link Tether, Netgear Nighthawk, ASUS Router App) that provide a more polished mobile management experience without needing to navigate via a hostname.",
  },
  {
    question: "Why does my browser show a security warning on the login page?",
    answer:
      "Most home router web interfaces use a self-signed TLS certificate to offer an HTTPS connection, or serve the admin panel over plain HTTP only. Browsers such as Chrome and Firefox perform strict certificate authority validation and flag self-signed certificates with a 'Your connection is not private' or 'Potential security risk' warning. This does not mean the connection is compromised — it means the certificate was not issued by a globally trusted CA. You can safely click 'Advanced' and proceed, since you are connecting to your own hardware within a trusted private network. If possible, use http:// explicitly to avoid the SSL validation check altogether.",
  },
  {
    question: "Does fritz.box work in all countries?",
    answer:
      "fritz.box is the registered local domain hostname for AVM FRITZ!Box routers, which are the market-dominant home router brand in German-speaking countries (Germany, Austria, Switzerland) and widely sold across Western Europe. The hostname resolves locally through the FRITZ!Box's embedded DNS service regardless of the user's geographic location, so it functions correctly everywhere in the world as long as the user is connected to a FRITZ!Box network. The admin interface itself is available in German and English. Users outside AVM markets accessing second-hand or imported FRITZ!Box units will find fritz.box works identically to the fallback IP 192.168.178.1.",
  },
  {
    question: "What happens if I'm on a VPN when trying to use routerlogin.net?",
    answer:
      "When a VPN client is active on your device, it inserts a virtual network adapter at a higher priority than your physical network interface, typically replacing the Default Gateway and DNS server settings with addresses pointing to the VPN provider's infrastructure. As a result, DNS queries for local hostnames like routerlogin.net are sent through the encrypted VPN tunnel to a remote DNS resolver, which has no knowledge of your router's local DNS intercept rules and returns either NXDOMAIN or a non-routable address. To fix this, pause or disable the VPN client, wait a few seconds for network routes to revert, and then attempt to load the hostname. Alternatively, use the direct gateway IP address (e.g. 192.168.1.1) which bypasses DNS resolution entirely.",
  },
];

const troubleshootingSteps = [
  {
    title: "Connect to Router Network",
    description:
      "Ensure your device is connected to the router's primary Wi-Fi SSID or via a physical Ethernet cable to a LAN port. Avoid guest networks, public hotspots, or mobile data — local hostnames are only resolvable on the router's own subnet.",
    tip: "On Windows, run 'ipconfig' to confirm the Default Gateway matches the expected router IP before attempting a hostname login.",
  },
  {
    title: "Disable Active VPN Software",
    description:
      "VPN clients redirect DNS queries through remote tunnels, breaking local hostname resolution. Pause, disconnect, or temporarily quit your VPN application. Wait 5–10 seconds for network routing tables to revert to the default gateway.",
  },
  {
    title: "Open Browser in Private / Incognito Mode",
    description:
      "Browsers cache DNS results and HTTP redirects that can interfere with local hostname resolution. Open a fresh Incognito (Chrome/Edge) or Private (Firefox/Safari) window to clear all cached data before attempting the hostname URL.",
    tip: "If incognito resolves correctly but a normal tab does not, clear your browser's DNS cache via chrome://net-internals/#dns or restart the browser completely.",
  },
  {
    title: "Navigate to Hostname or Fallback IP",
    description:
      "Type the router hostname (e.g., http://routerlogin.net) in the address bar and press Enter. Always use http:// not https:// on the first attempt to avoid self-signed certificate friction. If the hostname fails, fall back to the direct IP address (e.g., 192.168.1.1).",
  },
  {
    title: "Accept SSL Certificate Warning If Prompted",
    description:
      "If your browser displays a 'Your connection is not private' warning, click 'Advanced' and then 'Proceed to [address] (unsafe)'. This is expected behaviour for routers using self-signed certificates and does not indicate a genuine security risk within your private LAN.",
    tip: "Firefox may require you to manually add a security exception for the certificate before it permits the connection.",
  },
];

const quickFixChecklist = [
  "Ensure device is connected to the router's primary SSID — not a guest network",
  "Disable VPN client software before attempting hostname access",
  "Turn off DNS-over-HTTPS (DoH) in browser advanced settings",
  "Prefix the hostname with http:// (not https://) to avoid TLS certificate errors",
  "Switch to the direct gateway IP if hostname resolution continues to fail",
  "Use Incognito / Private browsing mode to bypass cached redirects",
];

// ── Structured Data ───────────────────────────────────────────────────────────
const collectionPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${APP_URL}/router-login-hostnames#webpage`,
  url: `${APP_URL}/router-login-hostnames`,
  name: "Router Login Hostnames & Domains: Complete Directory Guide",
  description:
    "Complete directory of all router login hostnames and local admin domains including routerlogin.net, tplinkwifi.net, mywifiext.net, fritz.box, and more.",
  about: {
    "@type": "Thing",
    name: "Router Administration Hostnames",
  },
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${APP_URL}/router-login-hostnames#itemlist`,
  name: "Router Login Hostname Directory",
  numberOfItems: 10,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "WebPage",
        name: "routerlogin.net — Netgear Router Login",
        url: `${APP_URL}/routerlogin.net`,
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "WebPage",
        name: "tplinkwifi.net — TP-Link Router Login",
        url: `${APP_URL}/tplinkwifi.net`,
      },
    },
    {
      "@type": "ListItem",
      position: 3,
      item: {
        "@type": "WebPage",
        name: "mywifiext.net — Netgear Extender Login",
        url: `${APP_URL}/mywifiext.net`,
      },
    },
    {
      "@type": "ListItem",
      position: 4,
      item: {
        "@type": "WebPage",
        name: "192.168.1.1 — Router Admin IP",
        url: `${APP_URL}/ips/192-168-1-1`,
      },
    },
    {
      "@type": "ListItem",
      position: 5,
      item: {
        "@type": "WebPage",
        name: "192.168.0.1 — Router Admin IP",
        url: `${APP_URL}/ips/192-168-0-1`,
      },
    },
  ],
};

// ── Page Component ────────────────────────────────────────────────────────────
export default async function RouterLoginHostnamesPage() {
  return (
    <>
      <JsonLd data={collectionPageSchema} />
      <JsonLd data={itemListSchema} />

      <TroubleshootingArticleShell
        h1="Router Login Hostnames & Admin Domains: Complete Directory"
        intro="Every major router brand ships with a locally resolvable hostname that maps to the admin login interface — no IP address required. This authoritative directory covers every known router login hostname, explains how they work at the DNS level, and provides step-by-step guidance for when they fail to load."
        category="wifi"
        breadcrumbs={breadcrumbs}
        faqs={faqs}
        troubleshootingSteps={troubleshootingSteps}
        quickFixChecklist={quickFixChecklist}
        severityLevel="low"
        isHubPage={true}
        warningBanner={{
          title: "Local Network Access Only",
          text: "Router login hostnames such as routerlogin.net and tplinkwifi.net are locally resolved DNS aliases. They only work when your device is connected to the specific router's LAN. Attempting to visit them over mobile data or a VPN will fail.",
        }}
      >
        {/* ── Section 1: What Is a Router Login Hostname? ────────────────── */}
        <section className="mb-10" aria-labelledby="what-is-hostname">
          <h2
            id="what-is-hostname"
            className="text-xl font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2"
          >
            <Network size={20} className="text-[var(--brand-400)]" />
            What Is a Router Login Hostname?
          </h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
            A <strong>router login hostname</strong> is a locally resolvable
            domain name — such as{" "}
            <Link
              href="/routerlogin.net"
              className="text-[var(--brand-400)] hover:underline font-semibold"
            >
              routerlogin.net
            </Link>{" "}
            or{" "}
            <Link
              href="/tplinkwifi.net"
              className="text-[var(--brand-400)] hover:underline font-semibold"
            >
              tplinkwifi.net
            </Link>{" "}
            — that the router's embedded DNS server intercepts and translates
            into the router's own private LAN IP address. Unlike public domain
            names registered in global DNS infrastructure, these hostnames
            function exclusively within the router's subnet and have no presence
            on the open internet. If you are having trouble logging in or need to recover access, visit our <Link href="/router-login-recovery" className="text-[var(--brand-400)] hover:underline">router login recovery</Link> guide. For details on default passwords, see the main <Link href="/router-login" className="text-[var(--brand-400)] hover:underline">router login</Link> manual.
          </p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
            Under the hood, router firmware implements one of two resolution
            mechanisms. The first is a <strong>private DNS intercept</strong>:
            the router's DHCP server assigns itself as the primary DNS resolver
            for all LAN clients, and when any client queries for the registered
            hostname, the router's DNS daemon answers authoritatively with its
            own gateway IP. The second mechanism, used by devices supporting
            multicast DNS (mDNS/Bonjour), is the{" "}
            <code className="bg-[var(--bg-elevated)] px-1.5 py-0.5 rounded text-xs font-mono">
              .local
            </code>{" "}
            TLD — as seen in <code className="bg-[var(--bg-elevated)] px-1.5 py-0.5 rounded text-xs font-mono">dlinkrouter.local</code> — which
            propagates via zero-configuration networking without requiring a
            central DNS server.
          </p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
            The key distinction between hostnames and direct IP access is
            ergonomics and discoverability. Typing{" "}
            <code className="bg-[var(--bg-elevated)] px-1.5 py-0.5 rounded text-xs font-mono">
              http://fritz.box
            </code>{" "}
            is more intuitive for users than memorising{" "}
            <code className="bg-[var(--bg-elevated)] px-1.5 py-0.5 rounded text-xs font-mono">
              192.168.178.1
            </code>
            . However, the hostname approach introduces an additional DNS
            resolution layer that can break in certain network configurations —
            which is why understanding both methods is critical for reliable
            router management. Visit our{" "}
            <Link
              href="/router-login"
              className="text-[var(--brand-400)] hover:underline font-semibold"
            >
              Router Login Guide
            </Link>{" "}
            for a complete overview of all login methods.
          </p>
          <div className="p-4 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl text-xs text-[var(--text-secondary)] leading-relaxed">
            <strong className="text-[var(--text-primary)]">
              Technical note:
            </strong>{" "}
            Router firmware typically registers hostnames in the DHCP lease
            table and answers DNS queries for them via a lightweight embedded
            DNS forwarder (dnsmasq is the most commonly deployed implementation
            across OpenWrt-based and proprietary router firmware alike). The
            hostname is not registered with ICANN and carries no public routing
            authority.
          </div>
        </section>

        {/* ── Section 2: Hostname vs IP Address Comparison ──────────────── */}
        <section className="mb-10" aria-labelledby="hostname-vs-ip">
          <h2
            id="hostname-vs-ip"
            className="text-xl font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2"
          >
            <Globe size={20} className="text-[var(--brand-400)]" />
            Hostname vs. Direct IP Address — Which Should You Use?
          </h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-5">
            Both approaches lead to the same router administration interface,
            but their reliability and convenience characteristics differ
            meaningfully depending on the network environment. The table below
            compares the two methods head-to-head:
          </p>
          <div className="overflow-x-auto mb-5">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-sm border border-[var(--border-subtle)] rounded-xl overflow-hidden">
              <thead className="bg-[var(--bg-elevated)]">
                <tr className="text-[var(--text-primary)] font-semibold text-left">
                  <th className="py-3 px-4 w-1/3">Attribute</th>
                  <th className="py-3 px-4 w-1/3">
                    Hostname Approach
                    <br />
                    <span className="font-mono text-[var(--brand-400)] text-xs font-normal">
                      e.g. routerlogin.net
                    </span>
                  </th>
                  <th className="py-3 px-4 w-1/3">
                    Direct IP Approach
                    <br />
                    <span className="font-mono text-[var(--brand-400)] text-xs font-normal">
                      e.g. 192.168.1.1
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)] text-[var(--text-secondary)]">
                <tr className="hover:bg-[var(--bg-hover)] transition-colors">
                  <td className="py-2.5 px-4 font-semibold text-[var(--text-primary)]">
                    Ease of memorisation
                  </td>
                  <td className="py-2.5 px-4 text-emerald-400 font-semibold">
                    ✓ High — human-readable name
                  </td>
                  <td className="py-2.5 px-4 text-amber-400 font-semibold">
                    ✗ Low — numeric sequence
                  </td>
                </tr>
                <tr className="hover:bg-[var(--bg-hover)] transition-colors">
                  <td className="py-2.5 px-4 font-semibold text-[var(--text-primary)]">
                    Works with VPN active
                  </td>
                  <td className="py-2.5 px-4 text-red-400 font-semibold">
                    ✗ No — DNS redirected externally
                  </td>
                  <td className="py-2.5 px-4 text-emerald-400 font-semibold">
                    ✓ Sometimes — bypasses DNS
                  </td>
                </tr>
                <tr className="hover:bg-[var(--bg-hover)] transition-colors">
                  <td className="py-2.5 px-4 font-semibold text-[var(--text-primary)]">
                    Works with DoH enabled
                  </td>
                  <td className="py-2.5 px-4 text-red-400 font-semibold">
                    ✗ No — remote DoH resolver
                  </td>
                  <td className="py-2.5 px-4 text-emerald-400 font-semibold">
                    ✓ Yes — IP is DNS-independent
                  </td>
                </tr>
                <tr className="hover:bg-[var(--bg-hover)] transition-colors">
                  <td className="py-2.5 px-4 font-semibold text-[var(--text-primary)]">
                    Survives DHCP IP change
                  </td>
                  <td className="py-2.5 px-4 text-emerald-400 font-semibold">
                    ✓ Yes — hostname always resolves
                  </td>
                  <td className="py-2.5 px-4 text-red-400 font-semibold">
                    ✗ No — IP must be re-checked
                  </td>
                </tr>
                <tr className="hover:bg-[var(--bg-hover)] transition-colors">
                  <td className="py-2.5 px-4 font-semibold text-[var(--text-primary)]">
                    Browser SSL warnings
                  </td>
                  <td className="py-2.5 px-4 text-amber-400 font-semibold">
                    ~ Possible on HTTPS
                  </td>
                  <td className="py-2.5 px-4 text-amber-400 font-semibold">
                    ~ Possible on HTTPS
                  </td>
                </tr>
                <tr className="hover:bg-[var(--bg-hover)] transition-colors">
                  <td className="py-2.5 px-4 font-semibold text-[var(--text-primary)]">
                    Mobile app integration
                  </td>
                  <td className="py-2.5 px-4 text-emerald-400 font-semibold">
                    ✓ Most apps use hostname
                  </td>
                  <td className="py-2.5 px-4 text-amber-400 font-semibold">
                    ~ App-dependent
                  </td>
                </tr>
                <tr className="hover:bg-[var(--bg-hover)] transition-colors">
                  <td className="py-2.5 px-4 font-semibold text-[var(--text-primary)]">
                    Universal reliability
                  </td>
                  <td className="py-2.5 px-4 text-amber-400 font-semibold">
                    ~ DNS environment dependent
                  </td>
                  <td className="py-2.5 px-4 text-emerald-400 font-semibold">
                    ✓ Most reliable fallback
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            <strong className="text-[var(--text-primary)]">
              Recommendation:
            </strong>{" "}
            Use the hostname as your primary access method in normal usage — it
            is more convenient and adapts if the router's DHCP-assigned address
            changes. Always keep the fallback direct IP address noted somewhere
            accessible (such as a password manager or the router's physical
            label). If you frequently use a VPN or have enabled DNS-over-HTTPS
            in your browser, bookmark the direct IP instead. See the{" "}
            <Link
              href="/ips/192-168-1-1"
              className="text-[var(--brand-400)] hover:underline font-semibold"
            >
              192.168.1.1 admin guide
            </Link>{" "}
            or the{" "}
            <Link
              href="/ips/192-168-0-1"
              className="text-[var(--brand-400)] hover:underline font-semibold"
            >
              192.168.0.1 admin guide
            </Link>{" "}
            for brand-specific IP details.
          </p>
        </section>

        {/* ── Section 3: Why Hostnames Fail to Load ─────────────────────── */}
        <section className="mb-10" aria-labelledby="why-hostnames-fail">
          <h2
            id="why-hostnames-fail"
            className="text-xl font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2"
          >
            <ShieldAlert size={20} className="text-amber-400" />
            Why Router Login Hostnames Fail to Load
          </h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-5">
            Understanding the root causes of hostname resolution failures saves
            significant diagnostic time. The five most common failure modes are
            detailed below:
          </p>
          <div className="space-y-4">
            {/* Cause 1 */}
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl">
              <h3 className="text-sm font-bold text-[var(--text-primary)] mb-2 flex items-center gap-2">
                <AlertTriangle size={14} className="text-red-400 flex-shrink-0" />
                VPN Clients Hijacking DNS
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                When a VPN client connects, it inserts a virtual network adapter
                with a higher routing metric than your physical interface and
                replaces the system DNS server setting with the VPN provider's
                resolver. DNS queries for local hostnames like{" "}
                <code className="bg-[var(--bg-elevated)] px-1 py-0.5 rounded text-[10px] font-mono">
                  routerlogin.net
                </code>{" "}
                are tunnelled through the encrypted VPN connection to a remote
                DNS server that has no knowledge of your router's private DNS
                intercept rules. The remote server returns NXDOMAIN (domain not
                found) or an unrelated address, causing the browser to show a
                "server not found" error. Fix: disable your VPN before
                attempting local admin access, or configure split-tunnelling
                to exclude local RFC 1918 address ranges from the VPN tunnel.
              </p>
            </div>
            {/* Cause 2 */}
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl">
              <h3 className="text-sm font-bold text-[var(--text-primary)] mb-2 flex items-center gap-2">
                <AlertTriangle size={14} className="text-orange-400 flex-shrink-0" />
                Browser DNS-over-HTTPS (DoH) Bypassing Local DNS
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Modern browsers including Chrome, Firefox, and Edge include an
                optional DNS-over-HTTPS feature that encrypts DNS queries and
                sends them to a cloud resolver (such as Cloudflare 1.1.1.1 or
                Google 8.8.8.8) rather than using the operating system's
                configured DNS server. This completely bypasses the router's
                local DNS daemon, meaning that hostname intercepts for{" "}
                <code className="bg-[var(--bg-elevated)] px-1 py-0.5 rounded text-[10px] font-mono">
                  tplinkwifi.net
                </code>{" "}
                or{" "}
                <code className="bg-[var(--bg-elevated)] px-1 py-0.5 rounded text-[10px] font-mono">
                  fritz.box
                </code>{" "}
                never reach the router. Fix: in Chrome, open Settings → Privacy
                and Security → Security → Use secure DNS and disable it. In
                Firefox, open Settings → General → Network Settings and uncheck
                "Enable DNS over HTTPS". Alternatively, use the direct IP
                address which requires no DNS resolution at all.
              </p>
            </div>
            {/* Cause 3 */}
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl">
              <h3 className="text-sm font-bold text-[var(--text-primary)] mb-2 flex items-center gap-2">
                <AlertTriangle size={14} className="text-amber-400 flex-shrink-0" />
                AP Isolation on Guest Networks
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Access Point (AP) Isolation is a security feature commonly
                enabled on guest Wi-Fi networks that prevents devices on the
                guest SSID from communicating with the router's management
                interface and with each other. When a device is connected to a
                guest network with AP Isolation active, it cannot reach the
                router's LAN IP or its DNS service, making both hostname-based
                and direct-IP login attempts impossible. This is by design — it
                prevents guests from reconfiguring the router. Fix: connect to
                the main (non-guest) Wi-Fi SSID or to a LAN Ethernet port, then
                attempt admin access. If you need to manage a guest network
                without physical access to the main network, consult the{" "}
                <Link
                  href="/default-gateway-not-available"
                  className="text-[var(--brand-400)] hover:underline"
                >
                  default gateway not available guide
                </Link>
                .
              </p>
            </div>
            {/* Cause 4 */}
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl">
              <h3 className="text-sm font-bold text-[var(--text-primary)] mb-2 flex items-center gap-2">
                <AlertTriangle size={14} className="text-yellow-400 flex-shrink-0" />
                Incorrect HTTP vs. HTTPS (Self-Signed SSL)
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Some browser configurations and security extensions automatically
                upgrade all HTTP connections to HTTPS (via HSTS or HTTPS-only
                mode). If your router only serves its admin panel over HTTP, the
                browser's attempt to establish a secure HTTPS connection will
                fail with a certificate error or a connection refused message.
                Conversely, some newer routers support HTTPS with a self-signed
                certificate, which causes browsers to display a "Your connection
                is not private" interstitial. Fix: explicitly prefix the address
                with{" "}
                <code className="bg-[var(--bg-elevated)] px-1 py-0.5 rounded text-[10px] font-mono">
                  http://
                </code>{" "}
                (not https://) in the address bar, or click 'Advanced → Proceed'
                to bypass the self-signed certificate warning.
              </p>
            </div>
            {/* Cause 5 */}
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl">
              <h3 className="text-sm font-bold text-[var(--text-primary)] mb-2 flex items-center gap-2">
                <AlertTriangle size={14} className="text-blue-400 flex-shrink-0" />
                Wrong Subnet (Connected to Wrong Wi-Fi)
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                In homes with multiple routers, mesh nodes, or range extenders,
                it is easy to inadvertently connect to a different device's
                network than the one you intend to configure. Each router device
                has its own DNS intercept and its own gateway IP. If you are
                attempting to reach the admin console of Router A but your device
                has associated with Router B's SSID, the hostname will either
                resolve to Router B's IP or fail to resolve at all. Fix: verify
                the SSID your device is connected to in the Wi-Fi settings, and
                confirm the DHCP-assigned Default Gateway matches the device you
                are attempting to configure. Check our{" "}
                <Link
                  href="/router-reset"
                  className="text-[var(--brand-400)] hover:underline"
                >
                  router reset guide
                </Link>{" "}
                if you have lost track of which device is responsible for a
                subnet.
              </p>
            </div>
          </div>
        </section>

        {/* ── Section 4: Complete Hostname Directory ─────────────────────── */}
        <section className="mb-10" aria-labelledby="hostname-directory">
          <h2
            id="hostname-directory"
            className="text-xl font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2"
          >
            <Server size={20} className="text-[var(--brand-400)]" />
            Complete Router Login Hostname Directory
          </h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-5">
            The table below lists every major router login hostname, the
            corresponding brand, the default gateway IP address, and whether the
            hostname resolves without internet connectivity. Use this as a quick
            reference before attempting admin panel access:
          </p>
          <div className="overflow-x-auto rounded-xl border border-[var(--border-subtle)]">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-sm">
              <thead className="bg-[var(--bg-elevated)]">
                <tr className="text-[var(--text-primary)] font-semibold text-left">
                  <th className="py-3 px-4">Hostname</th>
                  <th className="py-3 px-4">Brand</th>
                  <th className="py-3 px-4">Default IP</th>
                  <th className="py-3 px-4">Works Offline</th>
                  <th className="py-3 px-4">Mobile App</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)] text-[var(--text-secondary)]">
                {[
                  {
                    hostname: "routerlogin.net",
                    href: "/routerlogin.net",
                    brand: "Netgear",
                    brandHref: "/netgear-router-login",
                    ip: "192.168.1.1",
                    ipHref: "/ips/192-168-1-1",
                    offline: "Yes",
                    app: "Nighthawk / Orbi",
                  },
                  {
                    hostname: "routerlogin.com",
                    href: "/routerlogin.net",
                    brand: "Netgear",
                    brandHref: "/netgear-router-login",
                    ip: "192.168.1.1",
                    ipHref: "/ips/192-168-1-1",
                    offline: "Yes",
                    app: "Nighthawk",
                  },
                  {
                    hostname: "tplinkwifi.net",
                    href: "/tplinkwifi.net",
                    brand: "TP-Link",
                    brandHref: "/tp-link-router-login",
                    ip: "192.168.0.1",
                    ipHref: "/ips/192-168-0-1",
                    offline: "Yes",
                    app: "Tether",
                  },
                  {
                    hostname: "mywifiext.net",
                    href: "/mywifiext.net",
                    brand: "Netgear Extender",
                    brandHref: "/netgear-router-login",
                    ip: "192.168.1.1",
                    ipHref: "/ips/192-168-1-1",
                    offline: "Yes",
                    app: "Nighthawk",
                  },
                  {
                    hostname: "orbilogin.com",
                    href: "/routerlogin.net",
                    brand: "Netgear Orbi",
                    brandHref: "/netgear-router-login",
                    ip: "192.168.1.1",
                    ipHref: "/ips/192-168-1-1",
                    offline: "Yes",
                    app: "Orbi",
                  },
                  {
                    hostname: "fritz.box",
                    href: "/router-login",
                    brand: "AVM FRITZ!Box",
                    brandHref: "/router-login",
                    ip: "192.168.178.1",
                    ipHref: "/router-login",
                    offline: "Yes",
                    app: "MyFRITZ!App",
                  },
                  {
                    hostname: "router.asus.com",
                    href: "/router-login",
                    brand: "ASUS",
                    brandHref: "/router-login",
                    ip: "192.168.1.1",
                    ipHref: "/ips/192-168-1-1",
                    offline: "Yes",
                    app: "ASUS Router",
                  },
                  {
                    hostname: "tendawifi.com",
                    href: "/router-login",
                    brand: "Tenda",
                    brandHref: "/router-login",
                    ip: "192.168.0.1",
                    ipHref: "/ips/192-168-0-1",
                    offline: "Yes",
                    app: "Tenda WiFi",
                  },
                  {
                    hostname: "mywifiext.local",
                    href: "/mywifiext.net",
                    brand: "Netgear Extender",
                    brandHref: "/netgear-router-login",
                    ip: "192.168.1.1",
                    ipHref: "/ips/192-168-1-1",
                    offline: "Yes",
                    app: "—",
                  },
                  {
                    hostname: "dlinkrouter.local",
                    href: "/router-login",
                    brand: "D-Link",
                    brandHref: "/router-login",
                    ip: "192.168.0.1",
                    ipHref: "/ips/192-168-0-1",
                    offline: "Yes",
                    app: "mydlink",
                  },
                ].map((row) => (
                  <tr
                    key={row.hostname}
                    className="hover:bg-[var(--bg-hover)] transition-colors"
                  >
                    <td className="py-2.5 px-4">
                      <Link
                        href={row.href}
                        className="font-mono text-[var(--brand-400)] hover:underline font-semibold text-xs"
                      >
                        {row.hostname}
                      </Link>
                    </td>
                    <td className="py-2.5 px-4">
                      <Link
                        href={row.brandHref}
                        className="text-xs text-[var(--text-secondary)] hover:text-[var(--brand-400)] transition-colors"
                      >
                        {row.brand}
                      </Link>
                    </td>
                    <td className="py-2.5 px-4">
                      <Link
                        href={row.ipHref}
                        className="font-mono text-xs text-[var(--text-secondary)] hover:text-[var(--brand-400)] transition-colors"
                      >
                        {row.ip}
                      </Link>
                    </td>
                    <td className="py-2.5 px-4 text-xs text-emerald-400 font-semibold">
                      {row.offline}
                    </td>
                    <td className="py-2.5 px-4 text-xs text-[var(--text-muted)]">
                      {row.app}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-[11px] text-[var(--text-muted)] leading-relaxed">
            * All hostnames in this directory resolve exclusively within the
            router's local area network. None are publicly routable. Default IPs
            may differ if the router administrator has changed the LAN subnet
            configuration.
          </p>
        </section>

        {/* ── Section 5: Common Router Login IPs ───────────────────────── */}
        <section className="mb-10" aria-labelledby="common-ips">
          <h2
            id="common-ips"
            className="text-xl font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2"
          >
            <MonitorSmartphone size={20} className="text-[var(--brand-400)]" />
            Common Router Login IP Addresses
          </h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-5">
            When a hostname fails to resolve, the direct gateway IP address is
            the most reliable alternative access method. These are the five most
            common router admin IP addresses and the brands that use them:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                ip: "192.168.1.1",
                slug: "192-168-1-1",
                brands: "Netgear, ASUS, Linksys, Cisco",
                desc: "The most widely deployed home router gateway IP globally.",
              },
              {
                ip: "192.168.0.1",
                slug: "192-168-0-1",
                brands: "TP-Link, D-Link, Tenda",
                desc: "Standard for consumer TP-Link and D-Link router ranges.",
              },
              {
                ip: "10.0.0.1",
                slug: "10-0-0-1",
                brands: "Xfinity, Comcast, Apple",
                desc: "Used by ISP-provided gateways and Apple AirPort devices.",
              },
              {
                ip: "192.168.100.1",
                slug: "192-168-100-1",
                brands: "Spectrum, Charter, cable modems",
                desc: "Common in cable modem gateways from Spectrum and Arris.",
              },
              {
                ip: "192.168.8.1",
                slug: "192-168-8-1",
                brands: "Huawei, ZTE, LTE routers",
                desc: "Default for Huawei HiLink modems and 4G LTE mobile routers.",
              },
            ].map((card) => (
              <Link
                key={card.ip}
                href={`/ips/${card.slug}`}
                className="glass-card p-4 hover:border-[var(--brand-800)] hover:bg-[var(--bg-hover)] hover:-translate-y-0.5 transition-all duration-200 group block rounded-xl border border-[var(--border-subtle)]"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-sm font-bold text-[var(--brand-400)] group-hover:underline">
                    {card.ip}
                  </span>
                  <ExternalLink
                    size={12}
                    className="text-[var(--text-muted)] group-hover:text-[var(--brand-400)] transition-colors"
                  />
                </div>
                <p className="text-[11px] text-[var(--text-muted)] mb-1.5 leading-relaxed">
                  {card.desc}
                </p>
                <p className="text-[10px] text-[var(--text-secondary)] font-semibold">
                  {card.brands}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Section 6: Choosing the Right Login Method ────────────────── */}
        <section className="mb-10" aria-labelledby="choosing-login-method">
          <h2
            id="choosing-login-method"
            className="text-xl font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2"
          >
            <Wifi size={20} className="text-[var(--brand-400)]" />
            Choosing the Right Login Method for Your Router
          </h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-5">
            The correct access method depends on your router brand, firmware
            version, current network environment, and whether a VPN is in use.
            Use the following decision guide to select the fastest and most
            reliable path to your router's admin interface:
          </p>

          <div className="space-y-4">
            <div className="p-5 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl">
              <h3 className="text-sm font-bold text-[var(--text-primary)] mb-2">
                Netgear Routers &amp; Extenders
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Use{" "}
                <Link
                  href="/routerlogin.net"
                  className="text-[var(--brand-400)] hover:underline font-semibold"
                >
                  http://routerlogin.net
                </Link>{" "}
                as the primary method for all Netgear routers (Nighthawk, Orbi,
                and standard WNDR/R series). For Netgear range extenders, use{" "}
                <Link
                  href="/mywifiext.net"
                  className="text-[var(--brand-400)] hover:underline font-semibold"
                >
                  http://mywifiext.net
                </Link>
                . Both hostnames resolve to the same firmware via the device's
                own DNS interceptor. If either fails, use the direct IP (usually{" "}
                <Link
                  href="/ips/192-168-1-1"
                  className="text-[var(--brand-400)] hover:underline font-mono"
                >
                  192.168.1.1
                </Link>
                ) as a fallback. See the full{" "}
                <Link
                  href="/netgear-router-login"
                  className="text-[var(--brand-400)] hover:underline"
                >
                  Netgear router login guide
                </Link>{" "}
                for model-specific instructions.
              </p>
            </div>

            <div className="p-5 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl">
              <h3 className="text-sm font-bold text-[var(--text-primary)] mb-2">
                TP-Link Routers
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                TP-Link uses{" "}
                <Link
                  href="/tplinkwifi.net"
                  className="text-[var(--brand-400)] hover:underline font-semibold"
                >
                  http://tplinkwifi.net
                </Link>{" "}
                across its entire consumer and SMB router range (Archer,
                Deco, and TL series). When on a VPN or if DoH is active in your
                browser, switch to the direct IP{" "}
                <Link
                  href="/ips/192-168-0-1"
                  className="text-[var(--brand-400)] hover:underline font-mono"
                >
                  192.168.0.1
                </Link>
                . Deco mesh units may also be accessible through the TP-Link
                Tether mobile app, which auto-discovers the gateway via UDP
                broadcast without relying on DNS. See the{" "}
                <Link
                  href="/tp-link-router-login"
                  className="text-[var(--brand-400)] hover:underline"
                >
                  TP-Link router login guide
                </Link>{" "}
                for firmware-specific steps.
              </p>
            </div>

            <div className="p-5 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl">
              <h3 className="text-sm font-bold text-[var(--text-primary)] mb-2">
                ASUS Routers
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                ASUS uses{" "}
                <code className="bg-[var(--bg-surface)] px-1 py-0.5 rounded text-[10px] font-mono">
                  http://router.asus.com
                </code>{" "}
                across its RT, GT, and ZenWiFi product lines. The ASUS firmware
                uses its own lightweight DNS server to intercept this hostname.
                If you have changed the router's LAN IP, the hostname will still
                resolve correctly since the DNS intercept is managed internally
                by the firmware. ASUS also supports{" "}
                <code className="bg-[var(--bg-surface)] px-1 py-0.5 rounded text-[10px] font-mono">
                  192.168.1.1
                </code>{" "}
                and{" "}
                <code className="bg-[var(--bg-surface)] px-1 py-0.5 rounded text-[10px] font-mono">
                  192.168.50.1
                </code>{" "}
                on certain mesh nodes. The ASUS Router mobile app is an
                excellent alternative for mobile access.
              </p>
            </div>

            <div className="p-5 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl">
              <h3 className="text-sm font-bold text-[var(--text-primary)] mb-2">
                VPN Users — Always Use Direct IP
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                If you regularly use a VPN for privacy or work purposes, bookmark
                your router's direct gateway IP address (e.g.{" "}
                <Link
                  href="/ips/192-168-1-1"
                  className="text-[var(--brand-400)] hover:underline font-mono"
                >
                  192.168.1.1
                </Link>{" "}
                or{" "}
                <Link
                  href="/ips/192-168-0-1"
                  className="text-[var(--brand-400)] hover:underline font-mono"
                >
                  192.168.0.1
                </Link>
                ) rather than the hostname. Direct IP access bypasses the DNS
                resolution layer entirely and may still work even with some VPN
                configurations if the VPN permits local LAN traffic (split
                tunnelling). You can find your current Default Gateway IP by
                running{" "}
                <code className="bg-[var(--bg-surface)] px-1 py-0.5 rounded text-[10px] font-mono">
                  ipconfig
                </code>{" "}
                (Windows) or{" "}
                <code className="bg-[var(--bg-surface)] px-1 py-0.5 rounded text-[10px] font-mono">
                  netstat -nr
                </code>{" "}
                (macOS/Linux) in your terminal. Need help recovering access? See
                the{" "}
                <Link
                  href="/router-password"
                  className="text-[var(--brand-400)] hover:underline"
                >
                  router password guide
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        {/* ── Section 7: Security Best Practices After Login ─────────────── */}
        <section className="mb-10" aria-labelledby="security-after-login">
          <div className="p-6 glass-card border border-[var(--brand-800)]/30 bg-[var(--brand-950)]/10 rounded-2xl">
            <div className="flex items-center gap-2 text-[var(--brand-400)] font-semibold text-xs uppercase tracking-wider mb-3">
              <Lock size={14} />
              Post-Login Security
            </div>
            <h2
              id="security-after-login"
              className="text-xl font-bold text-[var(--text-primary)] mb-3"
            >
              Security Best Practices After Accessing Your Router
            </h2>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
              Successfully logging into your router admin panel is the first step
              — hardening the configuration is the critical second step. Routers
              operating on default credentials are among the most commonly
              exploited devices in consumer networks. Once you have access,
              prioritise the following security actions before making any other
              changes:
            </p>
            <ul className="space-y-3 text-xs text-[var(--text-secondary)] leading-relaxed mb-6">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 w-5 h-5 rounded-full border border-[var(--brand-800)]/40 bg-[var(--brand-950)]/20 flex items-center justify-center flex-shrink-0 text-[9px] font-bold text-[var(--brand-400)]">
                  1
                </span>
                <span>
                  <strong className="text-[var(--text-primary)]">
                    Change the default admin password immediately.
                  </strong>{" "}
                  Default credentials (admin/admin, admin/password) are published
                  in public databases and exploited by automated scanners. Use a
                  strong, unique 16+ character passphrase. See our complete{" "}
                  <Link
                    href="/router-password"
                    className="text-[var(--brand-400)] hover:underline"
                  >
                    router password guide
                  </Link>
                  .
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 w-5 h-5 rounded-full border border-[var(--brand-800)]/40 bg-[var(--brand-950)]/20 flex items-center justify-center flex-shrink-0 text-[9px] font-bold text-[var(--brand-400)]">
                  2
                </span>
                <span>
                  <strong className="text-[var(--text-primary)]">
                    Enable WPA3 or WPA2-AES encryption.
                  </strong>{" "}
                  Legacy TKIP and WEP encryption are trivially cracked with
                  modern hardware. Always select the strongest protocol your
                  devices support.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 w-5 h-5 rounded-full border border-[var(--brand-800)]/40 bg-[var(--brand-950)]/20 flex items-center justify-center flex-shrink-0 text-[9px] font-bold text-[var(--brand-400)]">
                  3
                </span>
                <span>
                  <strong className="text-[var(--text-primary)]">
                    Disable remote WAN management.
                  </strong>{" "}
                  Remote access over the WAN interface exposes your router's admin
                  panel to the entire internet. Disable it unless you have a
                  specific operational requirement.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 w-5 h-5 rounded-full border border-[var(--brand-800)]/40 bg-[var(--brand-950)]/20 flex items-center justify-center flex-shrink-0 text-[9px] font-bold text-[var(--brand-400)]">
                  4
                </span>
                <span>
                  <strong className="text-[var(--text-primary)]">
                    Update router firmware.
                  </strong>{" "}
                  Manufacturers regularly release firmware patches that address
                  security vulnerabilities. Check the Administration or System
                  Tools menu for an update option.
                </span>
              </li>
            </ul>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Link
                href="/wifi-security"
                className="group p-4 border border-[var(--border-subtle)] hover:border-[var(--brand-800)] bg-[var(--bg-elevated)] rounded-xl transition-all duration-200 hover:-translate-y-0.5 block"
              >
                <span className="block font-bold text-xs text-[var(--text-primary)] group-hover:text-[var(--brand-400)] transition-colors mb-1">
                  Wi-Fi Security Guide →
                </span>
                <p className="text-[10px] text-[var(--text-muted)] leading-relaxed">
                  Comprehensive network security hardening guide covering
                  encryption, firewall, and attack mitigation.
                </p>
              </Link>
              <Link
                href="/wpa3-vs-wpa2"
                className="group p-4 border border-[var(--border-subtle)] hover:border-[var(--brand-800)] bg-[var(--bg-elevated)] rounded-xl transition-all duration-200 hover:-translate-y-0.5 block"
              >
                <span className="block font-bold text-xs text-[var(--text-primary)] group-hover:text-[var(--brand-400)] transition-colors mb-1">
                  WPA3 vs WPA2 →
                </span>
                <p className="text-[10px] text-[var(--text-muted)] leading-relaxed">
                  Understand the real-world differences and choose the strongest
                  encryption standard your devices support.
                </p>
              </Link>
              <Link
                href="/router-password"
                className="group p-4 border border-[var(--border-subtle)] hover:border-[var(--brand-800)] bg-[var(--bg-elevated)] rounded-xl transition-all duration-200 hover:-translate-y-0.5 block"
              >
                <span className="block font-bold text-xs text-[var(--text-primary)] group-hover:text-[var(--brand-400)] transition-colors mb-1">
                  Router Password Guide →
                </span>
                <p className="text-[10px] text-[var(--text-muted)] leading-relaxed">
                  How to change your admin password, recover a forgotten
                  credential, and apply best-practice password policies.
                </p>
              </Link>
            </div>
          </div>
        </section>

        {/* ── Brand-Specific Hostname Quick Links ────────────────────────── */}
        <section className="mb-10" aria-labelledby="hostname-cluster-nav">
          <div className="p-6 glass-card border border-[var(--border-subtle)] rounded-2xl">
            <h2
              id="hostname-cluster-nav"
              className="text-base font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2"
            >
              <Link2 size={16} className="text-[var(--brand-400)]" />
              Hostname-Specific Admin Guides
            </h2>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
              Navigate directly to the dedicated admin guide for your router's
              login hostname. Each guide includes default credentials, step-by-step
              setup, and brand-specific troubleshooting procedures.
            </p>
             <div className="flex flex-wrap gap-2.5">
              {[
                { label: "routerlogin.net Guide", href: "/routerlogin.net" },
                { label: "routerlogin.net Not Working", href: "/routerlogin.net-not-working" },
                { label: "tplinkwifi.net Guide", href: "/tplinkwifi.net" },
                { label: "tplinkwifi.net Not Working", href: "/tplinkwifi.net-not-working" },
                { label: "mywifiext.net Guide", href: "/mywifiext.net" },
                { label: "mywifiext.net Not Working", href: "/mywifiext.net-not-working" },
                { label: "routerlogin.com Not Working", href: "/routerlogin.com-not-working" },
                { label: "orbilogin.com Not Working", href: "/orbilogin.com-not-working" },
                { label: "Netgear Router Login", href: "/netgear-router-login" },
                { label: "TP-Link Router Login", href: "/tp-link-router-login" },
                { label: "Router Login Hub", href: "/router-login" },
                { label: "Router Reset Guide", href: "/router-reset" },
                { label: "Default Gateway Fix", href: "/default-gateway-not-available" },
                { label: "192.168.1.1 Admin", href: "/ips/192-168-1-1" },
                { label: "192.168.0.1 Admin", href: "/ips/192-168-0-1" },
              ].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-xs bg-[var(--bg-elevated)] border border-[var(--border-subtle)] hover:border-[var(--brand-800)] px-3 py-1.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--brand-400)] hover:bg-[var(--bg-hover)] transition-all font-medium"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Technical Explainer: How Local DNS Intercept Works ─────────── */}
        <section className="mb-10" aria-labelledby="technical-deep-dive">
          <h2
            id="technical-deep-dive"
            className="text-xl font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2"
          >
            <Info size={20} className="text-[var(--brand-400)]" />
            How Local DNS Intercept Works — Technical Deep Dive
          </h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
            Router firmware engineers implement hostname-based admin access
            through a mechanism called <strong>local DNS interception</strong> or
            a <strong>private DNS stub zone</strong>. Understanding the mechanism
            at the packet level helps diagnose failures with precision.
          </p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
            When your device connects to the router's LAN (via Wi-Fi or Ethernet),
            the DHCP server running on the router assigns your device an IP
            address in the local subnet and instructs the device to use the router
            itself as its DNS resolver — typically at the same IP as the Default
            Gateway (e.g.{" "}
            <code className="bg-[var(--bg-elevated)] px-1.5 py-0.5 rounded text-xs font-mono">
              192.168.1.1
            </code>
            ). The router runs a lightweight DNS forwarder (typically dnsmasq)
            that maintains a local zone database containing an A record mapping
            the hostname to the router's own LAN IP address.
          </p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
            When your browser resolves{" "}
            <code className="bg-[var(--bg-elevated)] px-1.5 py-0.5 rounded text-xs font-mono">
              routerlogin.net
            </code>
            , the OS sends a UDP DNS query to the configured resolver
            (192.168.1.1). The router's dnsmasq process checks its local zone
            file first, finds a matching A record, and returns the router's own
            IP address directly — without forwarding the query upstream to
            external resolvers like Google or Cloudflare. The browser receives
            this response, opens a TCP connection to port 80 on the returned IP,
            and the router's embedded HTTP server (mini_httpd, lighttpd, or
            uhttpd) serves the admin interface.
          </p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
            This architecture explains precisely why VPN clients and DoH break
            hostname resolution: both mechanisms bypass the router-assigned DNS
            resolver, sending queries to external servers that have no
            authoritative record for private hostnames and return NXDOMAIN. The
            direct IP fallback (e.g.{" "}
            <Link
              href="/ips/192-168-1-1"
              className="text-[var(--brand-400)] hover:underline font-semibold"
            >
              192.168.1.1
            </Link>
            ) works because TCP/IP routing to LAN addresses does not involve DNS
            at all — the OS routes it directly to the local interface without
            any resolver consultation.
          </p>
          <div className="p-4 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl">
            <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
              <strong className="text-[var(--text-secondary)]">
                Advanced note for network engineers:
              </strong>{" "}
              Some enterprise VPN configurations implement split-tunnelling
              exclusion rules that allow RFC 1918 address space (10.0.0.0/8,
              172.16.0.0/12, 192.168.0.0/16) to route through the physical
              interface rather than the VPN tunnel. When this is correctly
              configured, direct IP access to the gateway remains functional
              while the VPN is active, though hostname resolution may still fail
              if the VPN client overrides the system DNS configuration. If you
              frequently need to{" "}
              <Link
                href="/router-login"
                className="text-[var(--brand-400)] hover:underline"
              >
                access your router admin panel
              </Link>{" "}
              while working remotely with a VPN, configure split-tunnelling with
              your IT administrator or VPN provider.
            </p>
          </div>
        </section>
      </TroubleshootingArticleShell>
    </>
  );
}
