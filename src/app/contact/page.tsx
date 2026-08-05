import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ContactForm } from "./ContactForm";
import { buildMetadata } from "@/lib/seo/metadata";
import { JsonLd, buildBreadcrumbSchema } from "@/lib/seo/schema";
import { APP_URL } from "@/lib/constants";
import { Mail, HelpCircle, AlertCircle } from "lucide-react";

export const metadata = buildMetadata({
  title: "Contact Us | RouterVia Support & Feedback",
  description: "Get in touch with RouterVia. Contact our technical, support, or business inquiry team for help with router diagnostics and network troubleshooting tools.",
  canonical: "/contact",
});

export default function ContactPage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Contact", href: "/contact" },
  ];
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbs, APP_URL);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />

      <div className="flex flex-col min-h-screen">
        <Header />

        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Contact Info Column */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <h1 className="text-4xl font-extrabold text-[var(--text-primary)] mb-4">
                  Get in Touch
                </h1>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  Have questions about a router configuration? Encountered a bug in our diagnostic tools? Or want to partner with RouterVia? We're here to help. Fill out the form or reach out directly via email.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-blue-950 border border-blue-800 flex items-center justify-center text-blue-400 flex-shrink-0">
                    <Mail size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wider">Email Address</h3>
                    <p className="text-sm text-[var(--text-muted)] mt-1">For support or business inquiries:</p>
                    <a href="mailto:support@routervia.com" className="text-base font-semibold text-[var(--brand-400)] hover:underline mt-1 block">
                      support@routervia.com
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400 flex-shrink-0">
                    <HelpCircle size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wider">Troubleshooting FAQ</h3>
                    <p className="text-sm text-[var(--text-secondary)] mt-1">
                      Check our step-by-step guides on WiFi, DNS, and IP logins. Most configurations are listed in our database.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-amber-950 border border-amber-800 flex items-center justify-center text-amber-400 flex-shrink-0">
                    <AlertCircle size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wider">Note on Credentials</h3>
                    <p className="text-sm text-[var(--text-secondary)] mt-1">
                      RouterVia does not collect or manage your personal router credentials. Standard configurations listed are default vendor settings.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Column */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>

          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
