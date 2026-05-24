import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { buildMetadata } from "@/lib/seo/metadata";
import { JsonLd, buildBreadcrumbSchema } from "@/lib/seo/schema";
import { APP_URL } from "@/lib/constants";

export const metadata = buildMetadata({
  title: "Privacy Policy | RouterVia",
  description: "Read the Privacy Policy for RouterVia. Understand how we collect, process, and protect your diagnostic logs, IP addresses, cookie preferences, and advertising telemetry.",
  canonical: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Privacy Policy", href: "/privacy-policy" },
  ];
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbs, APP_URL);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />

      <div className="flex flex-col min-h-screen">
        <Header />

        <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
          <h1 className="text-4xl font-extrabold text-[var(--text-primary)] mb-4">
            Privacy Policy
          </h1>
          <p className="text-sm text-[var(--text-muted)] mb-8">
            Last Updated: May 24, 2026
          </p>

          <div className="prose-dark space-y-8">
            <section>
              <p className="text-lg text-[var(--text-secondary)]">
                At RouterVia, accessible from {APP_URL}, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by RouterVia and how we use it.
              </p>
              <p className="text-[var(--text-secondary)]">
                If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us. This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in RouterVia.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">1. Consent</h2>
              <p className="text-[var(--text-secondary)]">
                By using our website, you hereby consent to our Privacy Policy and agree to its terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">2. Information We Collect</h2>
              <p className="text-[var(--text-secondary)] mb-4">
                The personal info that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal info.
              </p>
              <ul className="list-disc pl-6 text-[var(--text-secondary)] space-y-2">
                <li>
                  <strong>Contact details:</strong> If you contact us directly, we may receive additional information about you such as your name, email address, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.
                </li>
                <li>
                  <strong>Diagnostic data & IP logs:</strong> When you use our network diagnostic utilities (e.g., DNS checker, Ping tests, IP lookup tools), our system may temporarily capture your public IP address, browser type, and test inputs. This telemetry data is processed in-memory to execute the request and is not permanently stored or associated with personal identifiers.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">3. How We Use Your Information</h2>
              <p className="text-[var(--text-secondary)] mb-2">
                We use the information we collect in various ways, including to:
              </p>
              <ul className="list-disc pl-6 text-[var(--text-secondary)] space-y-2">
                <li>Provide, operate, and maintain our website and diagnostic tools.</li>
                <li>Improve, personalize, and expand our platform content.</li>
                <li>Understand and analyze how visitors interact with our network guides.</li>
                <li>Develop new products, features, and diagnostic functionality.</li>
                <li>Communicate with you for customer support, updates, and feedback.</li>
                <li>Detect, prevent, and mitigate technical issues, security vulnerabilities, or fraudulent activity.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">4. Log Files & Network Diagnostics</h2>
              <p className="text-[var(--text-secondary)]">
                RouterVia follows a standard procedure of using log files. These files log visitors when they visit websites. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">5. Cookies & Local Browser Storage</h2>
              <p className="text-[var(--text-secondary)] mb-4">
                Like any other website, RouterVia uses "cookies" and browser local storage. Cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
              </p>
              <p className="text-[var(--text-secondary)]">
                Our tools may also use your browser's local storage (LocalStorage) to store local preferences, such as keeping track of your recent IP lookup history, selected router brands, or theme configurations. This data remains on your physical device and is not uploaded to our servers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">6. Google DoubleClick DART Cookies & AdSense Policy</h2>
              <p className="text-[var(--text-secondary)] mb-4">
                Google is one of the third-party vendors on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to RouterVia and other sites on the internet.
              </p>
              <p className="text-[var(--text-secondary)]">
                Visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL: <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-[var(--brand-400)] hover:underline font-semibold">https://policies.google.com/technologies/ads</a>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">7. Our Advertising Partners</h2>
              <p className="text-[var(--text-secondary)] mb-4">
                Some of the advertisers on our site may use cookies and web beacons. Our advertising partners include:
              </p>
              <ul className="list-disc pl-6 text-[var(--text-secondary)] space-y-2">
                <li>
                  <strong>Google AdSense:</strong> Google's advertising system uses tracking technologies to serve relevant ads. You can view their privacy practices and opt-out specifications directly through Google's Privacy & Terms.
                </li>
              </ul>
              <p className="text-[var(--text-secondary)] mt-4">
                Third-party ad servers or ad networks use technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on RouterVia, which are sent directly to users' browsers. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.
              </p>
              <p className="text-[var(--text-secondary)] mt-2">
                Note that RouterVia has no access to or control over these cookies that are used by third-party advertisers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">8. Third Party Privacy Policies & External Links</h2>
              <p className="text-[var(--text-secondary)] mb-4">
                RouterVia's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.
              </p>
              <p className="text-[var(--text-secondary)]">
                Our platform contains links to external hardware manufacturers (e.g., TP-Link, Huawei, ZTE) and third-party networking tools. We are not responsible for the privacy practices, cookies, or content of external sites.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">9. CCPA Privacy Rights (Do Not Sell My Personal Information)</h2>
              <p className="text-[var(--text-secondary)] mb-2">
                Under the CCPA, among other rights, California consumers have the right to:
              </p>
              <ul className="list-disc pl-6 text-[var(--text-secondary)] space-y-2">
                <li>Request that a business that collects a consumer's personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.</li>
                <li>Request that a business delete any personal data about the consumer that a business has collected.</li>
                <li>Request that a business that sells a consumer's personal data, not sell the consumer's personal data.</li>
              </ul>
              <p className="text-[var(--text-secondary)] mt-4">
                If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">10. GDPR Data Protection Rights</h2>
              <p className="text-[var(--text-secondary)] mb-2">
                We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:
              </p>
              <ul className="list-disc pl-6 text-[var(--text-secondary)] space-y-2">
                <li><strong>The right to access</strong> – You have the right to request copies of your personal data. We may charge you a small fee for this service.</li>
                <li><strong>The right to rectification</strong> – You have the right to request that we correct any information you believe is inaccurate. You also have the right to request that we complete the information you believe is incomplete.</li>
                <li><strong>The right to erasure</strong> – You have the right to request that we erase your personal data, under certain conditions.</li>
                <li><strong>The right to restrict processing</strong> – You have the right to request that we restrict the processing of your personal data, under certain conditions.</li>
                <li><strong>The right to object to processing</strong> – You have the right to object to our processing of your personal data, under certain conditions.</li>
                <li><strong>The right to data portability</strong> – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</li>
              </ul>
              <p className="text-[var(--text-secondary)] mt-4">
                If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.
              </p>
            </section>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
