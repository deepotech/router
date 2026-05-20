import { notFound } from "next/navigation";
import { prisma } from "@/server/db/prisma";
import { RelatedArticles } from "@/components/seo/RelatedArticles";
import { AnalyticsService } from "@/server/services/analytics.service";
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
import { MarkdownRenderer } from "@/components/ui/MarkdownRenderer";
import { buildProblemMetadata } from "@/lib/seo/metadata";
import { JsonLd, buildBreadcrumbSchema, buildFaqSchema, generateSemanticArticleSchema } from "@/lib/seo/schema";
import { APP_URL } from "@/lib/constants";
import { RelatedRoutersForProblem } from "@/components/seo/RelatedRoutersForProblem";

// ─── Inline Markdown Client Wrapper ─────────────────────────────────────────
function MarkdownContent({ content }: { content: string }) {
  return <MarkdownRenderer content={content} />;
}

// ─── Problem Content ─────────────────────────────────────────────────────────
function ProblemContent({ problem }: { problem: any }) {
  const fixes: { stepTitle: string; description: string; technicalDetails?: string }[] = Array.isArray(problem.fixes) ? problem.fixes : [];
  const faqs: { question: string; answer: string }[] = Array.isArray(problem.faqs) ? problem.faqs : [];
  const causes: string[] = Array.isArray(problem.causes) ? problem.causes : [];

  return (
    <div className="space-y-10">
      {/* Excerpt / Overview */}
      {problem.excerpt && (
        <div className="flex gap-4 p-5 bg-blue-950/30 border border-blue-800/40 rounded-2xl">
          <div className="flex-shrink-0 w-1 rounded-full bg-gradient-to-b from-blue-400 to-blue-600" />
          <p className="text-base text-blue-100 leading-relaxed">{problem.excerpt}</p>
        </div>
      )}

      {/* Main Content (markdown) */}
      {problem.content && (
        <div className="prose-section">
          <MarkdownContent content={problem.content} />
        </div>
      )}

      {/* Root Causes */}
      {causes.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2.5">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-500/30">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
            </span>
            Common Causes
          </h2>
          <div className="grid gap-2">
            {causes.map((cause, i) => (
              <div key={i} className="flex items-start gap-3 p-3.5 bg-neutral-800/40 rounded-xl border border-neutral-700/50 hover:border-amber-500/30 transition-colors">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-400 text-xs font-bold flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                <span className="text-neutral-300 text-sm leading-relaxed">{cause}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Step-by-step Fixes */}
      {fixes.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2.5">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-green-500/15 border border-green-500/30">
              <CheckCircle className="w-4 h-4 text-green-400" />
            </span>
            Step-by-Step Fix
          </h2>
          <div className="space-y-3">
            {fixes.map((fix, i) => (
              <div key={i} className="relative flex gap-4 p-5 bg-neutral-800/40 rounded-2xl border border-neutral-700/50 hover:border-green-500/30 transition-all duration-200 group">
                {i < fixes.length - 1 && (
                  <div className="absolute left-[2.1rem] top-[4rem] bottom-[-0.75rem] w-px bg-neutral-700 group-hover:bg-green-800/50 transition-colors" />
                )}
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center shadow-lg shadow-blue-900/30">
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white text-base">{fix.stepTitle}</h3>
                  <p className="text-neutral-400 text-sm mt-1.5 leading-relaxed">{fix.description}</p>
                  {fix.technicalDetails && (
                    <div className="mt-3 rounded-lg overflow-hidden border border-neutral-700">
                      <div className="px-3 py-1 bg-neutral-800 border-b border-neutral-700 text-xs text-neutral-500 font-mono">
                        command
                      </div>
                      <pre className="px-4 py-3 bg-neutral-900 overflow-x-auto">
                        <code className="text-xs text-green-300 font-mono">{fix.technicalDetails}</code>
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FAQs */}
      {faqs.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <details key={i} className="group p-5 bg-neutral-800/40 rounded-2xl border border-neutral-700/50 hover:border-neutral-600 transition-colors cursor-pointer">
                <summary className="font-semibold text-white text-sm flex items-center justify-between list-none">
                  <span>{faq.question}</span>
                  <span className="text-neutral-500 group-open:rotate-180 transition-transform duration-200 flex-shrink-0 ml-4">▼</span>
                </summary>
                <p className="text-neutral-400 text-sm mt-3 leading-relaxed border-t border-neutral-700/50 pt-3">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}


import { hasDatabase } from "@/lib/server/env-safe";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  if (!hasDatabase) return {};
  const { slug } = await params;
  const problem = await prisma.problem.findUnique({ where: { slug } });
  
  if (!problem) return {};

  const robots = await IndexationControlService.getRobotsConfig(problem.status, 0.9);
  
  const baseMetadata = buildProblemMetadata({
    title: problem.title,
    slug: problem.slug,
    excerpt: problem.metaDescription || problem.excerpt,
  });

  return {
    ...baseMetadata,
    robots,
  };
}

export default async function ProblemPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const problem = await prisma.problem.findUnique({
    where: { slug }
  });

  if (!problem) notFound();

  // Log page view analytics event
  AnalyticsService.logEvent("PAGE_VIEW", { url: `/problems/${slug}`, title: problem.title });

  const faqs: { question: string; answer: string }[] = Array.isArray(problem.faqs) ? (problem.faqs as any) : [];

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
      <JsonLd
        data={generateSemanticArticleSchema(
          problem.title,
          problem.metaDescription || problem.excerpt,
          `https://routervia.com/problems/${slug}`,
          problem.createdAt,
          problem.updatedAt,
          problem.decayScore ?? 0.9,
          "RouterVia",
          "https://routervia.com"
        )}
      />
      <JsonLd data={buildBreadcrumbSchema([{ label: "Home", href: "/" }, ...breadcrumbHierarchy], APP_URL)} />
      {faqs.length > 0 && <JsonLd data={buildFaqSchema(faqs)} />}

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

          {/* Related Items Section for programmatic SEO & internal linking */}
          <RelatedRoutersForProblem diagnosticCategory={problem.diagnosticCategory} />

          <RelatedArticles
            diagnosticCategory={problem.diagnosticCategory}
            currentId={`problem-${problem.id}`}
            currentType="Problem"
          />

        </div>
      </main>
    </>
  );
}
