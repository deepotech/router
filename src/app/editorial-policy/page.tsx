import { JsonLd } from "@/lib/seo/schema";
import { APP_URL } from "@/lib/constants";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Editorial & AI Policy | RouterVia",
  description: "Learn how we generate, verify, and govern the networking content published on RouterVia.",
  canonical: "/editorial-policy",
});

export default function EditorialPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-extrabold text-[var(--text-primary)] mb-8">
        Editorial & AI Governance Policy
      </h1>

      <div className="prose-dark space-y-6">
        <p className="text-lg text-[var(--text-secondary)]">
          At RouterVia, we utilize advanced language models and Knowledge Graphs to provide comprehensive coverage of millions of networking permutations. However, we believe in radical transparency regarding how this content is created.
        </p>

        <h2 className="text-2xl font-bold text-[var(--text-primary)] mt-10 mb-4">
          1. AI Generation Workflow
        </h2>
        <p className="text-[var(--text-secondary)]">
          A significant portion of our router setup guides and FAQs are initially drafted by AI. These drafts are generated using exact schematics, default IPs, and default credentials stored in our deterministic database.
        </p>

        <h2 className="text-2xl font-bold text-[var(--text-primary)] mt-10 mb-4">
          2. Content Quality Scoring (CQS)
        </h2>
        <p className="text-[var(--text-secondary)]">
          Before any AI-generated article is published, it passes through our proprietary QualityService pipeline. We programmatically reject content that is:
        </p>
        <ul className="list-disc pl-6 text-[var(--text-secondary)] space-y-2 mt-2">
          <li>Too short or lacking in technical depth (Thin Content).</li>
          <li>Repetitive or syntactically confusing.</li>
          <li>Missing critical schema structures.</li>
        </ul>

        <h2 className="text-2xl font-bold text-[var(--text-primary)] mt-10 mb-4">
          3. Human Verification
        </h2>
        <p className="text-[var(--text-secondary)]">
          Critical problem guides and comparison matrices are frequently reviewed and amended by our staff engineers. Look for the "Verified by Expert" badge on critical troubleshooting documents.
        </p>

        <h2 className="text-2xl font-bold text-[var(--text-primary)] mt-10 mb-4">
          4. User-Generated Solutions
        </h2>
        <p className="text-[var(--text-secondary)]">
          Community-submitted fixes are marked distinctly and are routed through an AI-assisted moderation queue to strip out malicious links or factually incorrect network commands before publication.
        </p>
      </div>
    </div>
  );
}
