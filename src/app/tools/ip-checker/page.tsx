import type { Metadata } from "next";
import { Globe } from "lucide-react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { buildMetadata } from "@/lib/seo/metadata";
import { APP_URL } from "@/lib/constants";
import IpCheckerClient from "./IpCheckerClient";
import Link from "next/link";

// ── Metadata ──────────────────────────────────────────────────────────────────
export const metadata: Metadata = buildMetadata({
  title: "What Is My IP Address? | Free IP Checker Tool — RouterVia",
  description:
    "Instantly find your public IP address, ISP, location, and timezone for free. Our IP Checker tool works on any device — no login required.",
  canonical: "/tools/ip-checker",
  keywords: [
    "what is my ip",
    "my ip address",
    "ip checker",
    "public ip address",
    "find my ip",
    "ip location",
    "my public ip",
    "ip address lookup",
    "what is my public ip",
    "check ip address",
    "ip address finder",
    "my isp",
    "ip geolocation",
  ],
});

// ── Structured Data ───────────────────────────────────────────────────────────
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "@id": `${APP_URL}/tools/ip-checker#app`,
      name: "IP Checker — What Is My IP",
      url: `${APP_URL}/tools/ip-checker`,
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Any",
      description:
        "A free online tool to instantly reveal your public IP address, ISP, location, and timezone.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      featureList: [
        "Public IP address detection",
        "ISP / Organization lookup",
        "City and country geolocation",
        "Timezone detection",
        "No login or registration required",
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${APP_URL}/tools/ip-checker#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "What is my IP address?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Your IP address is a unique number assigned to your internet connection by your Internet Service Provider (ISP). It identifies your device on the internet and allows websites and servers to send data back to you. Click 'Check My IP' above to instantly see your current public IP address.",
          },
        },
        {
          "@type": "Question",
          name: "What is the difference between a public IP and a private IP?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A public IP address is the address visible to the internet, assigned by your ISP. A private IP address (like 192.168.1.x) is used only within your local network and is assigned by your router. This tool detects your public IP — the one websites see when you connect.",
          },
        },
        {
          "@type": "Question",
          name: "Can websites see my IP address?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Every website you visit can see your public IP address. It is used for routing traffic, serving localized content, fraud detection, and rate limiting. Using a VPN can mask your real IP address.",
          },
        },
        {
          "@type": "Question",
          name: "Does my IP address reveal my exact location?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Your IP address can reveal your approximate location — typically your city or region — and your ISP. It does not reveal your exact home address or precise GPS coordinates. The accuracy of IP geolocation varies depending on how your ISP allocates addresses.",
          },
        },
        {
          "@type": "Question",
          name: "Why does my IP address change?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Most ISPs assign dynamic IP addresses that change periodically — when you restart your router or after a set lease period. Some ISPs offer static IP addresses that do not change. Connecting via a different network (mobile data, café Wi-Fi) will always give you a different IP.",
          },
        },
        {
          "@type": "Question",
          name: "How do I hide my IP address?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You can hide your IP address by using a VPN (Virtual Private Network), which routes your traffic through a server in another location. The Tor browser also masks your IP through multiple relay nodes. Proxy servers are another option but are generally less secure.",
          },
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${APP_URL}/tools/ip-checker#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: APP_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Tools",
          item: `${APP_URL}/tools`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "IP Checker",
          item: `${APP_URL}/tools/ip-checker`,
        },
      ],
    },
  ],
};

// ── Breadcrumbs ───────────────────────────────────────────────────────────────
const breadcrumbs = [
  { label: "Tools", href: "/tools" },
  { label: "IP Checker", href: "/tools/ip-checker" },
];

// ── FAQ data (rendered in page) ───────────────────────────────────────────────
const faqs = [
  {
    q: "What is my IP address?",
    a: "Your IP address is a unique number assigned to your internet connection by your Internet Service Provider (ISP). It identifies your device on the internet and allows websites and servers to send data back to you. Click 'Check My IP' above to instantly see yours.",
  },
  {
    q: "What is the difference between a public IP and a private IP?",
    a: "A public IP address is the address visible to the internet, assigned by your ISP. A private IP (like 192.168.1.x) is used only within your local network and is assigned by your router. This tool detects your public IP — the one websites see when you connect.",
  },
  {
    q: "Can websites see my IP address?",
    a: "Yes. Every website you visit can see your public IP address. It is used for routing traffic, serving localized content, fraud detection, and rate limiting. Using a VPN masks your real IP from the sites you visit.",
  },
  {
    q: "Does my IP address reveal my exact location?",
    a: "Your IP can reveal your approximate city or region and your ISP. It does not reveal your exact home address or GPS coordinates. Accuracy varies depending on how your ISP allocates addresses.",
  },
  {
    q: "Why does my IP address change?",
    a: "Most ISPs assign dynamic IP addresses that change periodically — when you restart your router or after a lease period expires. Connecting via a different network (mobile data, café Wi-Fi) will always show a different IP.",
  },
  {
    q: "How do I hide my IP address?",
    a: "Use a VPN (Virtual Private Network) to route your traffic through a server elsewhere. The Tor browser also masks your IP through multiple relay nodes. Proxy servers are another option but are generally less secure than VPNs.",
  },
];

// ── Page ──────────────────────────────────────────────────────────────────────
export default function IpCheckerPage() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Breadcrumb items={breadcrumbs} className="mb-8" />

        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-blue-900/20 flex items-center justify-center">
              <Globe size={20} className="text-blue-400" />
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-[var(--text-primary)]">
              What Is My IP Address?
            </h1>
          </div>
          <p className="text-[var(--text-secondary)]">
            Instantly find your public IP address, ISP, location, and timezone.
            Free — no login required.
          </p>
        </div>

        {/* Interactive IP Checker (Client Component) */}
        <IpCheckerClient />

        {/* ── Static SEO Content ──────────────────────────────────────────── */}

        {/* How It Works */}
        <section className="mt-10 mb-10" aria-labelledby="how-it-works">
          <h2
            id="how-it-works"
            className="text-xl font-bold text-[var(--text-primary)] mb-4"
          >
            How Does the IP Checker Work?
          </h2>
          <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-3">
            When you click <strong>Check My IP</strong>, your browser sends a
            request to our secure server-side API. The server reads your public
            IP from the incoming connection headers (specifically the{" "}
            <code className="text-[var(--brand-400)] bg-[var(--bg-elevated)] px-1 rounded text-xs">
              x-forwarded-for
            </code>{" "}
            header), then queries a geolocation database to resolve your
            approximate location, ISP, and timezone.
          </p>
          <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
            Because the lookup happens on our server rather than in your
            browser, there are no CORS restrictions, no third-party scripts, and
            no data is stored or logged beyond what is displayed to you.
          </p>
        </section>

        {/* What Info Is Shown */}
        <section className="mb-10" aria-labelledby="what-info">
          <h2
            id="what-info"
            className="text-xl font-bold text-[var(--text-primary)] mb-4"
          >
            What Information Does Your IP Address Reveal?
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                title: "Public IP Address",
                desc: "The unique number that identifies your connection on the internet. Visible to every website you visit.",
              },
              {
                title: "ISP / Organization",
                desc: "The Internet Service Provider or organization that owns the IP block — e.g. Maroc Telecom, Comcast, Google LLC.",
              },
              {
                title: "Approximate Location",
                desc: "Your detected city, region, and country based on your IP. Not GPS-precise, but typically accurate to the city level.",
              },
              {
                title: "Timezone",
                desc: "The timezone associated with your IP's geographic region — useful for verifying VPN exit location.",
              },
            ].map(({ title, desc }) => (
              <div
                key={title}
                className="bg-[var(--bg-elevated)] rounded-xl p-5 border border-[var(--border-subtle)]"
              >
                <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-1">
                  {title}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* IPv4 vs IPv6 */}
        <section className="mb-10" aria-labelledby="ipv4-ipv6">
          <h2
            id="ipv4-ipv6"
            className="text-xl font-bold text-[var(--text-primary)] mb-4"
          >
            IPv4 vs IPv6 — What's the Difference?
          </h2>
          <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-3">
            <strong>IPv4</strong> (Internet Protocol version 4) is the original
            addressing system, using 32-bit numbers in the format{" "}
            <code className="text-[var(--brand-400)] bg-[var(--bg-elevated)] px-1 rounded text-xs">
              192.168.1.1
            </code>
            . It supports around 4.3 billion unique addresses — a number that
            the internet has now exhausted.
          </p>
          <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
            <strong>IPv6</strong> (Internet Protocol version 6) uses 128-bit
            addresses in hexadecimal format (e.g.{" "}
            <code className="text-[var(--brand-400)] bg-[var(--bg-elevated)] px-1 rounded text-xs">
              2001:db8::1
            </code>
            ), providing a virtually unlimited pool of addresses. Most modern
            ISPs now assign IPv6 addresses alongside IPv4 (dual-stack).
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
            {faqs.map(({ q, a }) => (
              <div
                key={q}
                className="border border-[var(--border-subtle)] rounded-xl p-5 bg-[var(--bg-elevated)]"
              >
                <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-2">
                  {q}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Internal Links */}
        <section aria-labelledby="related-tools" className="mb-4">
          <h2
            id="related-tools"
            className="text-lg font-bold text-[var(--text-primary)] mb-4"
          >
            Related Network Tools
          </h2>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "DNS Checker", href: "/tools/dns-checker" },
              { label: "Port Checker", href: "/tools/port-checker" },
              { label: "Speed Test", href: "/tools/speed-test" },
              { label: "Ping Test", href: "/tools/ping-test" },
              { label: "WiFi QR Generator", href: "/tools/wifi-qr" },
              { label: "All Tools", href: "/tools" },
            ].map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="text-sm px-4 py-2 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--brand-400)] hover:border-[var(--brand-800)] transition-all"
              >
                {label}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
