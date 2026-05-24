import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { buildMetadata } from "@/lib/seo/metadata";
import { JsonLd, buildBreadcrumbSchema } from "@/lib/seo/schema";
import { APP_URL } from "@/lib/constants";

export const metadata = buildMetadata({
  title: "Terms of Service | RouterVia",
  description: "Read the Terms of Service for RouterVia. Review our acceptable use policies, diagnostic tool limitations, disclaimer of warranties, and liabilities.",
  canonical: "/terms-of-service",
});

export default function TermsOfServicePage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Terms of Service", href: "/terms-of-service" },
  ];
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbs, APP_URL);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />

      <div className="flex flex-col min-h-screen">
        <Header />

        <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
          <h1 className="text-4xl font-extrabold text-[var(--text-primary)] mb-4">
            Terms of Service
          </h1>
          <p className="text-sm text-[var(--text-muted)] mb-8">
            Last Updated: May 24, 2026
          </p>

          <div className="prose-dark space-y-8">
            <section>
              <p className="text-lg text-[var(--text-secondary)]">
                Welcome to RouterVia! By accessing or using our platform at {APP_URL} and its associated router database, lookup features, and diagnostic interfaces (collectively, the "Services"), you agree to be bound by these Terms of Service ("Terms").
              </p>
              <p className="text-[var(--text-secondary)]">
                Please read these Terms carefully before using the Services. If you do not agree with any part of these Terms, you must not access or use our Services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">1. Acceptable Use</h2>
              <p className="text-[var(--text-secondary)] mb-4">
                You agree to use our Services only for lawful educational, diagnostic, and troubleshooting purposes related to your personal home or authorized business networks. Specifically, you agree NOT to:
              </p>
              <ul className="list-disc pl-6 text-[var(--text-secondary)] space-y-2">
                <li>Use the Services to probe, scan, or test the vulnerability of any network, system, or router device without explicit authorization.</li>
                <li>Submit queries or execute diagnostic tools against systems or IP addresses you do not own or have permission to monitor.</li>
                <li>Attempt to overload, spam, or disrupt the performance of our API endpoints or backend diagnostic workers.</li>
                <li>Scrape, crawl, or harvest router setup database records or default passwords programmatically without our prior written consent.</li>
                <li>Deploy automated bots, spiders, or scripts that put excessive request pressure on our public checking tools.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">2. Diagnostic Tool Limitations</h2>
              <p className="text-[var(--text-secondary)]">
                Our lookup utilities—such as the IP Checker, DNS Propagation Checker, Port Scanner, and MAC Address Lookup—retrieve and display real-time network configurations. However, network conditions fluctuate rapidly. We cannot guarantee that the results displayed by these tools will always be 100% accurate, complete, or reflective of external ISP configurations. Results should be treated as diagnostic aids rather than definitive networking assessments.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">3. User Responsibilities & Device Configuration</h2>
              <p className="text-[var(--text-secondary)] mb-4">
                RouterVia provides default settings, default IP gateways, and configuration instructions for generic router models (including TP-Link, Huawei, ZTE, D-Link, etc.). If you choose to modify your router settings, reset your device, change DNS resolvers, configure port forwarding, or alter security rules:
              </p>
              <ul className="list-disc pl-6 text-[var(--text-secondary)] space-y-2">
                <li>You acknowledge that modifying router configurations can temporarily interrupt local internet service or expose your home network to external risks.</li>
                <li>You are solely responsible for keeping backups of your router firmware and current settings before executing resets or setting modifications.</li>
                <li>You are responsible for changing default passwords (like "admin") to secure credentials to protect your network.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">4. Intellectual Property</h2>
              <p className="text-[var(--text-secondary)]">
                The content, organization, layout, design, software, database compilations, and structured data on RouterVia are protected under applicable intellectual property laws. Router brands, logos, trademarks, and model numbers referenced on this website are the property of their respective manufacturer owners. RouterVia's reference to these manufacturer details is purely nominative, educational, and descriptive.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">5. Disclaimer of Warranties</h2>
              <p className="text-[var(--text-secondary)] italic">
                THE SERVICES AND ALL INFORMATION, GUIDES, DEFAULT SETTINGS, AND DIAGNOSTIC TOOLS ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS, WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. TO THE FULLEST PERMISSIBLE UNDER APPLICABLE LAW, ROUTERVIA DISCLAIMS ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE WEBSITE WILL RUN WITHOUT INTERRUPTION, BE FREE OF SECURITY EXPLOITS, OR THAT DIAGNOSTIC RESULTS WILL BE FREE FROM ERRORS.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">6. Limitation of Liability</h2>
              <p className="text-[var(--text-secondary)]">
                IN NO EVENT SHALL ROUTERVIA, ITS FOUNDERS, OR CONTRIBUTORS BE LIABLE FOR ANY DAMAGES WHATSOEVER (INCLUDING, WITHOUT LIMITATION, DAMAGES FOR LOSS OF INTERNET CONNECTIVITY, LOCAL NETWORK DOWNTIME, DATA LOSS, DEVICE BRICKING, UNAUTHORIZED NETWORK ACCESS, OR BUSINESS INTERRUPTION) ARISING OUT OF THE USE OF, OR INABILITY TO USE, THE GUIDES AND TOOLS ON ROUTERVIA, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">7. Modifications to Service & Terms</h2>
              <p className="text-[var(--text-secondary)]">
                We reserve the right to modify, suspend, or discontinue our diagnostic tools or database entries at any time without notice. We also reserve the right to revise these Terms of Service. By continuing to use RouterVia after updates are published, you agree to be bound by the updated Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">8. Contact Information</h2>
              <p className="text-[var(--text-secondary)]">
                If you have any questions or concerns regarding these Terms of Service, please contact us at <a href="mailto:support@routervia.com" className="text-[var(--brand-400)] hover:underline font-semibold">support@routervia.com</a>.
              </p>
            </section>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
