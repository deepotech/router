import { Shield, BookOpen, Users, Award } from "lucide-react";
import { JsonLd } from "@/lib/seo/schema";
import { APP_URL } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About RouterVia | Our Mission & Team",
  description: "Learn about the team of network engineers and AI researchers building the world's most advanced router troubleshooting and configuration platform.",
};

export default function AboutPage() {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "RouterVia",
    "url": APP_URL,
    "logo": `${APP_URL}/logo.png`,
    "sameAs": [
      "https://twitter.com/routervia",
      "https://github.com/routervia"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-800-555-0199",
      "contactType": "customer support"
    }
  };

  return (
    <>
      <JsonLd data={orgSchema} />
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--text-primary)] text-center mb-6">
          About RouterVia
        </h1>
        <p className="text-xl text-[var(--text-secondary)] text-center mb-16 max-w-2xl mx-auto">
          We are on a mission to map the world's networking knowledge and make troubleshooting accessible to everyone through artificial intelligence.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="glass-card p-8">
            <Shield size={32} className="text-[var(--brand-400)] mb-4" />
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">Expert Verification</h2>
            <p className="text-[var(--text-secondary)]">
              While our AI generates vast amounts of configuration data, every automated guide is scored, analyzed, and optionally verified by real network engineers to ensure absolute accuracy.
            </p>
          </div>
          <div className="glass-card p-8">
            <BookOpen size={32} className="text-[var(--accent-400)] mb-4" />
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">Editorial Standards</h2>
            <p className="text-[var(--text-secondary)]">
              We adhere strictly to our Editorial Policy. We prioritize user intent, technical correctness, and readability.
            </p>
          </div>
        </div>

        <section className="glass-card p-10 mb-16">
          <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-6 text-center">
            Our Core Values
          </h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <Users size={24} className="text-[var(--brand-400)] flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-[var(--text-primary)]">Democratized Knowledge</h3>
                <p className="text-[var(--text-secondary)] mt-1">Networking shouldn't be locked behind expensive certifications. We believe everyone has the right to understand their own home network.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Award size={24} className="text-[var(--brand-400)] flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-[var(--text-primary)]">Uncompromising Quality</h3>
                <p className="text-[var(--text-secondary)] mt-1">Our AI Content Governance pipeline ensures that no thin, inaccurate, or spammy content is ever published to our knowledge graph.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
