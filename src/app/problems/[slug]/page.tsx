import { notFound } from "next/navigation";
import { prisma } from "@/server/db/prisma";
import { EdgeCacheService } from "@/server/services/edge-cache.service";
import { IndexationControlService } from "@/server/services/indexation-control.service";
import { EntityType } from "@prisma/client";
import { Metadata } from "next";
import { CheckCircle, AlertTriangle } from "lucide-react";
import { AISnapshotSchemaService } from "@/server/services/ai-snapshot-schema.service";
import { RetrievalAnswerBlock } from "@/components/retrieval/RetrievalAnswerBlock";
import { IntentBreadcrumbs } from "@/components/retrieval/IntentBreadcrumbs";
import { PeopleAlsoResolve } from "@/components/retrieval/PeopleAlsoResolve";
import { RetrievalExplanation } from "@/components/retrieval/RetrievalExplanation";

function ProblemContent({ problem }: { problem: any }) {
  const fixes: { stepTitle: string; description: string; technicalDetails?: string }[] = Array.isArray(problem.fixes) ? problem.fixes : [];
  const faqs: { question: string; answer: string }[] = Array.isArray(problem.faqs) ? problem.faqs : [];
  const causes: string[] = Array.isArray(problem.causes) ? problem.causes : [];

  return (
    <div className="space-y-8">
      {/* Excerpt / Overview */}
      {problem.excerpt && (
        <div className="prose prose-invert max-w-none">
          <p className="text-lg text-neutral-300 leading-relaxed">{problem.excerpt}</p>
        </div>
      )}

      {/* Main Content (markdown) */}
      {problem.content && (
        <div className="prose prose-invert max-w-none">
          <div className="whitespace-pre-wrap text-neutral-300 leading-relaxed">{problem.content}</div>
        </div>
      )}

      {/* Root Causes */}
      {causes.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            Common Causes
          </h2>
          <ul className="space-y-2">
            {causes.map((cause, i) => (
              <li key={i} className="flex items-start gap-3 text-neutral-300">
                <span className="mt-1 w-2 h-2 rounded-full bg-amber-400 flex-shrink-0" />
                {cause}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Step-by-step Fixes */}
      {fixes.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-400" />
            How to Fix It
          </h2>
          <ol className="space-y-4">
            {fixes.map((fix, i) => (
              <li key={i} className="flex gap-4 p-4 bg-neutral-800/50 rounded-xl border border-neutral-700">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-semibold text-white">{fix.stepTitle}</h3>
                  <p className="text-neutral-400 text-sm mt-1">{fix.description}</p>
                  {fix.technicalDetails && (
                    <p className="text-neutral-500 text-xs mt-2 font-mono bg-neutral-900 px-3 py-2 rounded-lg">{fix.technicalDetails}</p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* FAQs */}
      {faqs.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="p-4 bg-neutral-800/50 rounded-xl border border-neutral-700">
                <h3 className="font-semibold text-white mb-2">{faq.question}</h3>
                <p className="text-neutral-400 text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}


export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const problem = await prisma.problem.findUnique({ where: { slug } });
  
  if (!problem) return {};

  const robots = await IndexationControlService.getRobotsConfig(problem.status, 0.9);

  return {
    title: `${problem.title} - RouterVia Troubleshooting`,
    description: problem.metaDescription || `Learn how to fix ${problem.title}.`,
    alternates: {
      canonical: `https://routervia.com/problems/${slug}`
    },
    robots
  };
}

export default async function ProblemPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const problem = await prisma.problem.findUnique({
    where: { slug }
  });

  if (!problem) notFound();

  // Tier 0 -> Tier 3 Retrieval Cascade via Edge Cache
  const pageData = await EdgeCacheService.getCachedPageData(
    `/problems/${slug}`,
    problem.title,
    EntityType.PROBLEM,
    problem.id,
    problem.decayScore ?? 1.0
  );

  // Generate Intent Breadcrumbs Hierarchy
  const breadcrumbHierarchy = [
    { label: "Troubleshooting", href: "/problems" },
    { label: problem.diagnosticCategory || "General", href: `/problems?category=${problem.diagnosticCategory}` },
    { label: problem.title, href: `/problems/${slug}` }
  ];

  // Prepare AI Snapshot Schema
  const schemaString = await AISnapshotSchemaService.generateSchema({
    title: problem.title,
    description: problem.metaDescription || `Learn how to fix ${problem.title}.`,
    quickAnswer: problem.excerpt || "Follow the diagnostic steps below to resolve this network issue.",
    trustScore: 0.92,
    diagnosticSignals: Array.isArray(problem.causes) ? (problem.causes as string[]) : [],
    estimatedResolutionTime: "MEDIUM",
    semanticCategory: problem.diagnosticCategory || "General",
    retrievalTier: 0,
    semanticCentrality: 0.85,
    authorityScore: 0.9,
    governanceStatus: problem.status,
    url: `https://routervia.com/problems/${slug}`
  });

  return (
    <>
      {schemaString && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaString }} />
      )}
      <main className="min-h-screen bg-neutral-950 text-neutral-200 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          
          <IntentBreadcrumbs hierarchy={breadcrumbHierarchy} />

          {/* Header & Trust Signals */}
        <header className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-white">{problem.title}</h1>
        </header>

        {/* Semantic Content Chunks */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 md:p-8 space-y-8">
          
          <RetrievalAnswerBlock 
            quickAnswer={problem.excerpt || "Follow the verified technical steps below to stabilize the network connection."}
            diagnosticSummary={Array.isArray(problem.causes) ? problem.causes.slice(0, 3) as string[] : []}
            retrievalTierUsed={0}
            semanticConfidence={0.92}
            estimatedResolutionComplexity="MEDIUM"
            recommendedNextStep={Array.isArray(problem.fixes) && problem.fixes.length > 0 ? (problem.fixes[0] as any).stepTitle : "Run diagnostic suite"}
          />

          <RetrievalExplanation 
            resolutionRate={0.81}
            relatedIssue={problem.title}
            actionTaken="applying the canonical diagnostic steps"
            confidenceScore={0.85}
          />

          <ProblemContent problem={problem} />
        </div>

        <PeopleAlsoResolve currentEntityId={problem.id} currentEntityType="PROBLEM" />

      </div>
    </main>
    </>
  );
}
