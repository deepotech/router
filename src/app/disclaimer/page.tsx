import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { buildMetadata } from "@/lib/seo/metadata";
import { JsonLd, buildBreadcrumbSchema } from "@/lib/seo/schema";
import { APP_URL } from "@/lib/constants";

export const metadata = buildMetadata({
  title: "Disclaimer | RouterVia",
  description: "Read the Disclaimer for RouterVia. Understand the educational purpose of our guides, user configuration risks, third-party trademark specifications, and accuracy limits.",
  canonical: "/disclaimer",
});

export default function DisclaimerPage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Disclaimer", href: "/disclaimer" },
  ];
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbs, APP_URL);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />

      <div className="flex flex-col min-h-screen">
        <Header />

        <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
          <h1 className="text-4xl font-extrabold text-[var(--text-primary)] mb-4">
            Disclaimer
          </h1>
          <p className="text-sm text-[var(--text-muted)] mb-8">
            Last Updated: May 24, 2026
          </p>

          <div className="prose-dark space-y-8">
            <section>
              <p className="text-lg text-[var(--text-secondary)]">
                The information and diagnostic tools provided by RouterVia on {APP_URL} are intended solely for general educational, diagnostic, and informational purposes. By interacting with our troubleshooting guides, network diagnostics, or default router login credentials database, you acknowledge and agree to the following terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">1. Educational Purpose Only</h2>
              <p className="text-[var(--text-secondary)]">
                All articles, step-by-step router configuration tutorials, and guides published on this platform are meant for study, home network learning, and general diagnostics. Router settings, networking concepts, and default configurations vary dramatically by hardware firmware version, Internet Service Providers (ISPs), and geographic regions. What works for one hardware setup may not apply to your environment.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">2. Configuration Changes at User's Risk</h2>
              <p className="text-[var(--text-secondary)]">
                Any modifications you make to your local network, router settings, DNS resolvers, firewall rules, port forwarding lists, or device firmware are performed entirely at your own risk. Modifying router settings can result in internet service interruption, packet losses, localized security gaps, or bricking of your router hardware. RouterVia is not liable for network downtime, hardware damages, security vulnerabilities, ISP contract breaches, or data losses resulting from the configuration tutorials published on our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">3. Diagnostic Tool Limitations & Accuracy</h2>
              <p className="text-[var(--text-secondary)]">
                Our lookup utilities (including the IP Gateway Checker, DNS Propagation Checker, Port Scanner, Speed Test, and MAC Address Lookup) run dynamically to return active networking values. However, results are subject to latency constraints, ISP firewalls, browser configurations, and current network conditions. We cannot guarantee that lookup results, port states, or IP geolocation maps are permanently accurate, secure, or free from minor errors. Diagnostic tools should be cross-verified with professional network diagnostics for critical applications.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">4. Nominative Use of Router Brands & Trademarks</h2>
              <p className="text-[var(--text-secondary)]">
                RouterVia displays information, default settings, and logins for various hardware brands (e.g., TP-Link, Huawei, ZTE, D-Link, ASUS, Netgear, Linksys, Xiaomi, Tenda, Mercusys, etc.). We are an independent educational database. RouterVia is NOT affiliated with, sponsored by, endorsed by, or partnered with any of these hardware manufacturers. All brand names, model names, and registered trademarks belong exclusively to their respective owners. The reference to these trademark names on our site is strictly descriptive and qualifies as nominative fair use.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">5. Third-Party Links & Services</h2>
              <p className="text-[var(--text-secondary)]">
                Our guides may link to official manufacturer support sites, firmware download directories, or third-party diagnostic software. RouterVia does not inspect, warrant, or assume responsibility for the safety, accuracy, legal compliance, or privacy policies of these external destinations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">6. No Professional Networking Advice</h2>
              <p className="text-[var(--text-secondary)] font-medium">
                The content on RouterVia is not a substitute for professional network engineering, enterprise systems administration, or cybersecurity advice. For complex corporate networking, commercial settings, or high-risk configurations, please consult a certified network engineer.
              </p>
            </section>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
