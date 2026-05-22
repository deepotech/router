import Link from "next/link";
import { Globe, MapPin, Server, Info } from "lucide-react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import IpCheckerClient from "@/app/tools/ip-checker/IpCheckerClient";
import { APP_URL } from "@/lib/constants";

export interface IpCheckerToolShellProps {
  h1: string;
  intro: string;
  seoVariant:
    | "default"
    | "what-is-my-ip"
    | "check-my-ip"
    | "my-ip"
    | "public-ip-checker";
  breadcrumbs: {
    name: string;
    url: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export default function IpCheckerToolShell({
  h1,
  intro,
  seoVariant,
  breadcrumbs,
  faqs,
}: IpCheckerToolShellProps) {
  // Convert standard breadcrumbs format to components breadcrumb format
  const mappedBreadcrumbs = breadcrumbs.map((b) => ({
    label: b.name,
    href: b.url,
  }));

  // JSON-LD Schemas
  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": `${APP_URL}/tools/ip-checker#app`,
    "name": "RouterVia IP Checker",
    "applicationCategory": "NetworkingApplication",
    "operatingSystem": "All",
    "url": `${APP_URL}/tools/ip-checker`,
    "description": "A free online tool to instantly reveal your public IP address, ISP, location, and timezone."
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

  // Content configuration for variations
  const seoContent = {
    default: {
      howItWorksTitle: "How Does the IP Checker Work?",
      howItWorksText1: "When you click Check My IP, your browser sends a request to our secure server-side API. The server reads your public IP from the incoming connection headers (specifically the x-forwarded-for header), then queries a geolocation database to resolve your approximate location, ISP, and timezone.",
      howItWorksText2: "Because the lookup happens on our server rather than in your browser, there are no CORS restrictions, no third-party scripts, and no data is stored or logged beyond what is displayed to you.",
      revealsTitle: "What Information Does Your IP Address Reveal?",
      revealCards: [
        { title: "Public IP Address", desc: "The unique number that identifies your connection on the internet. Visible to every website you visit." },
        { title: "ISP / Organization", desc: "The Internet Service Provider or organization that owns the IP block — e.g. Maroc Telecom, Comcast, Google LLC." },
        { title: "Approximate Location", desc: "Your detected city, region, and country based on your IP. Not GPS-precise, but typically accurate to the city level." },
        { title: "Timezone", desc: "The timezone associated with your IP's geographic region — useful for verifying VPN exit location." },
      ],
      differencesTitle: "IPv4 vs IPv6 — What's the Difference?",
      differencesText1: "IPv4 (Internet Protocol version 4) is the original addressing system, using 32-bit numbers in the format 192.168.1.1. It supports around 4.3 billion unique addresses — a number that the internet has now exhausted.",
      differencesText2: "IPv6 (Internet Protocol version 6) uses 128-bit addresses in hexadecimal format (e.g. 2001:db8::1), providing a virtually unlimited pool of addresses. Most modern ISPs now assign IPv6 addresses alongside IPv4 (dual-stack).",
    },
    "what-is-my-ip": {
      howItWorksTitle: "How Can I Find My Public IP Address?",
      howItWorksText1: "To find your public IP address, you can use our lookup tool. The tool runs entirely server-side, fetching your external IP address from the x-forwarded-for header. This represents the global IP address that websites and internet services detect when you connect to them.",
      howItWorksText2: "Finding your public IP is critical for setting up certain router options, configuring remote desktop tools, hosting servers, or validating that your VPN is working correctly.",
      revealsTitle: "What Data Does an IP Address Lookup Show?",
      revealCards: [
        { title: "External IP", desc: "The public-facing address identifying your network router. This is the ID shared with any website you visit." },
        { title: "ISP Identity", desc: "The carrier providing your network access (such as Comcast, Verizon, Orange, or Vodafone)." },
        { title: "City & Country", desc: "The geographic area where your ISP router is hosted. This can differ slightly from your physical address." },
        { title: "Time Zone Info", desc: "The timezone associated with your ISP node, helping you check location routing." },
      ],
      differencesTitle: "IPv4 vs IPv6 Addresses Explained",
      differencesText1: "IPv4 addresses consist of four numbers separated by dots (e.g., 8.8.8.8) and are still widely used, though their supply is limited. They are easy to remember but lack modern routing enhancements.",
      differencesText2: "IPv6 addresses are longer and consist of eight groups of hexadecimal digits separated by colons. They offer superior security, auto-configuration capabilities, and ensure that every device has a unique address on the global web.",
    },
    "check-my-ip": {
      howItWorksTitle: "Why Verify and Check Your IP Address?",
      howItWorksText1: "Checking your public IP address lets you confirm how you appear to external web servers. By visiting this page, our backend reads connection headers and reports details like your ISP name and physical location. This is useful for troubleshooting network routing problems.",
      howItWorksText2: "Checking your IP is also the easiest way to test if your VPN, proxy, or Tor connection is active. If your IP checker shows your real location rather than the VPN server's location, you have an IP leak.",
      revealsTitle: "Key Geolocation Details of Your IP",
      revealCards: [
        { title: "Detected IP", desc: "The active IP address currently communicating with our web servers." },
        { title: "Internet Carrier", desc: "The telecom company providing your current internet data connection." },
        { title: "Regional Location", desc: "The approximate city, state, or country resolved from the IP registration database." },
        { title: "Local Timezone", desc: "The timezone registered to the IP's geographic location." },
      ],
      differencesTitle: "Dynamic vs Static IP Addresses",
      differencesText1: "A dynamic IP address is temporarily leased to your router by your ISP and changes periodically, such as when your router restarts. Most residential connections use dynamic IPs.",
      differencesText2: "A static IP address is permanent and remains the same indefinitely. Static IPs are ideal for businesses hosting websites, database servers, or VPN endpoints, but are usually more expensive.",
    },
    "my-ip": {
      howItWorksTitle: "Understanding Your Public IP Connection",
      howItWorksText1: "Your public IP is like the digital front door of your internet connection. It is assigned to your modem by your Internet Service Provider. When you send a request online, the destination server uses your public IP to know where to send the webpage data back.",
      howItWorksText2: "This page automatically shows your public IP by listening to secure HTTP headers, helping you verify your network's global parameters without installing client apps.",
      revealsTitle: "Network and Carrier Information",
      revealCards: [
        { title: "Active IP Address", desc: "The unique public address assigned to your network gateway by your carrier." },
        { title: "Network Provider", desc: "The Internet Service Provider (ISP) responsible for routing your traffic." },
        { title: "Approximate Geolocation", desc: "The city or territory representing where your connection routing takes place." },
        { title: "Local Time Zone", desc: "The time zone of the routing node, useful for server synchronization." },
      ],
      differencesTitle: "Is My IP Address Safe to Share?",
      differencesText1: "Your public IP address is naturally shared with every server you connect to. It does not reveal your name, street address, or personal files. It only indicates your general city-level location and your ISP.",
      differencesText2: "While sharing your IP is generally safe, malicious actors could theoretically use it to run port scans or launch DDoS attacks. Using a firewall and router NAT keeps your private devices secure.",
    },
    "public-ip-checker": {
      howItWorksTitle: "How Does a Public IP Checker Operate?",
      howItWorksText1: "A public IP checker reads your external IP address from incoming request headers, such as x-forwarded-for or x-real-ip, which are added by proxy servers and load balancers. It then references a secure GeoIP database to map the IP address to a country, region, and city.",
      howItWorksText2: "This is different from checking your local IP (like 192.168.1.1 or 10.0.0.1), which is only visible within your private home network and cannot be reached directly from the public internet.",
      revealsTitle: "Public Internet IP Diagnostics",
      revealCards: [
        { title: "External Public IP", desc: "The global address identifying your router on the public internet." },
        { title: "Service Provider (ISP)", desc: "The internet company powering your home or mobile connection." },
        { title: "Geographic Location", desc: "The city and region associated with the IP block registration." },
        { title: "Network Timezone", desc: "The timezone linked to your routing hub." },
      ],
      differencesTitle: "Public IP vs Private Local IP",
      differencesText1: "A public IP address is unique worldwide and is assigned by your ISP to connect your router to the outer internet. It is the address that the external web sees when you browse.",
      differencesText2: "A private IP address is assigned by your router's DHCP server to individual devices in your home (like your phone or laptop). Private IPs only work inside your local network and cannot be accessed from outside.",
    },
  };

  const content = seoContent[seoVariant] || seoContent.default;

  const ipToolsCluster = [
    { label: "IP Checker Tool", href: "/tools/ip-checker" },
    { label: "What Is My IP?", href: "/what-is-my-ip" },
    { label: "Check My IP", href: "/check-my-ip" },
    { label: "My IP Address", href: "/my-ip" },
    { label: "Public IP Checker", href: "/public-ip-checker" },
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
            <div className="w-10 h-10 rounded-xl bg-blue-900/20 flex items-center justify-center">
              <Globe size={20} className="text-blue-400" />
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-[var(--text-primary)]">
              {h1}
            </h1>
          </div>
          <p className="text-[var(--text-secondary)]">
            {intro}
          </p>
        </div>

        {/* Interactive IP Checker (Client Component) */}
        <IpCheckerClient />

        {/* ── Dynamic SEO Content ──────────────────────────────────────────── */}
        <article className="prose prose-invert max-w-none mt-10">
          {/* How It Works */}
          <section className="mb-10" aria-labelledby="how-it-works">
            <h2
              id="how-it-works"
              className="text-xl font-bold text-[var(--text-primary)] mb-4"
            >
              {content.howItWorksTitle}
            </h2>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-3">
              {content.howItWorksText1}
            </p>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
              {content.howItWorksText2}
            </p>
          </section>

          {/* What Info Is Shown */}
          <section className="mb-10" aria-labelledby="what-info">
            <h2
              id="what-info"
              className="text-xl font-bold text-[var(--text-primary)] mb-4"
            >
              {content.revealsTitle}
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {content.revealCards.map((card) => (
                <div
                  key={card.title}
                  className="bg-[var(--bg-elevated)] rounded-xl p-5 border border-[var(--border-subtle)]"
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

          {/* IPv4 vs IPv6 */}
          <section className="mb-10" aria-labelledby="ipv4-ipv6">
            <h2
              id="ipv4-ipv6"
              className="text-xl font-bold text-[var(--text-primary)] mb-4"
            >
              {content.differencesTitle}
            </h2>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-3">
              {content.differencesText1}
            </p>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
              {content.differencesText2}
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
                  className="border border-[var(--border-subtle)] rounded-xl p-5 bg-[var(--bg-elevated)]"
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
              Related IP Tools
            </h2>
            <div className="flex flex-wrap gap-3">
              {ipToolsCluster.map((tool) => (
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
