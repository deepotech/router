import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { QueryNormalizationService } from "@/server/services/query-normalization.service";
import { SearchOrchestratorService } from "@/server/services/search-orchestrator.service";
import { prisma } from "@/server/db/prisma";
import { ArrowUpRight, Search, Activity } from "lucide-react";
import { SearchBox } from "@/components/search/SearchBox";
import { IntentBreadcrumbs } from "@/components/retrieval/IntentBreadcrumbs";
import { RetrievalAnswerBlock } from "@/components/retrieval/RetrievalAnswerBlock";
import type { RetrievalResult } from "@/server/services/search-orchestrator.service";

interface SearchPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const resolvedParams = await searchParams;
  const q = typeof resolvedParams.q === "string" ? resolvedParams.q : "";
  return {
    title: `Search Results for "${q || "..."}" - RouterVia`,
    description: `Find router login pages, troubleshooting guides, and IP address information for "${q}".`,
    robots: { index: false, follow: true },
  };
}

/**
 * Resolves a search result to a valid internal URL.
 * Uses actual DB lookups to build correct slugs — no guessing.
 */
async function resolveResultUrl(result: RetrievalResult): Promise<string> {
  if (result.entityType === "PROBLEM" && result.entityId > 0) {
    const problem = await prisma.problem.findUnique({
      where: { id: result.entityId },
      select: { slug: true },
    });
    if (problem) return `/problems/${problem.slug}`;
  }

  if (result.entityType === "ROUTER" && result.entityId > 0) {
    const router = await prisma.routerModel.findUnique({
      where: { id: result.entityId },
      select: { slug: true, brand: { select: { slug: true } } },
    });
    if (router?.brand) return `/routers/${router.brand.slug}/${router.slug}`;
  }

  if (result.entityType === "IP" && result.entityId > 0) {
    const ip = await prisma.ipAddress.findUnique({
      where: { id: result.entityId },
      select: { slug: true },
    });
    if (ip) return `/ips/${ip.slug}`;
  }

  return "#"; // Only if entity doesn't exist in DB
}

const TIER_LABELS: Record<number, { label: string; class: string }> = {
  0: { label: "Cache Hit",    class: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
  1: { label: "Direct Match", class: "bg-green-500/10 text-green-400 border-green-500/20" },
  2: { label: "Semantic",     class: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
  3: { label: "Fallback",     class: "bg-red-500/10 text-red-400 border-red-500/20" },
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const resolvedParams = await searchParams;
  const q = typeof resolvedParams.q === "string" ? resolvedParams.q : "";
  const normalizedQuery = QueryNormalizationService.normalize(q);

  const results = await SearchOrchestratorService.search(q, 8);
  const isFallback = results.length > 0 && results[0].tierUsed === 3;
  const bestMatch = results[0];

  // Resolve URLs in parallel — uses real DB lookups, not guesses
  const resolvedResults = await Promise.all(
    results.map(async (res) => ({
      ...res,
      url: await resolveResultUrl(res),
    }))
  );

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">

        <IntentBreadcrumbs hierarchy={[
          { label: "Home", href: "/" },
          { label: "Search", href: "/search" },
          { label: normalizedQuery || "Results", href: `/search?q=${encodeURIComponent(q)}` },
        ]} />

        <header className="space-y-3">
          <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
            <Search className="w-8 h-8 text-[var(--brand-400)]" />
            {q ? `Results for "${q}"` : "Search RouterVia"}
          </h1>
          {normalizedQuery && normalizedQuery !== q.toLowerCase().trim() && (
            <p className="text-sm text-[var(--brand-300)]">
              Normalized query: <span className="font-semibold text-white">{normalizedQuery}</span>
            </p>
          )}
        </header>

        {/* Search box — client component handles submission */}
        <SearchBox />

        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 md:p-8 space-y-6">
          <RetrievalAnswerBlock
            quickAnswer={
              results.length === 0
                ? "No results found. Try different keywords."
                : isFallback
                ? "No direct match found. Showing the most-visited related pages."
                : `Found ${results.length} relevant result${results.length !== 1 ? "s" : ""}.`
            }
            diagnosticSummary={[
              `Tier ${bestMatch?.tierUsed ?? "-"} retrieved`,
              isFallback ? "Fallback applied" : "Direct match",
            ]}
            retrievalTierUsed={Math.min(bestMatch?.tierUsed ?? 1, 2) as 0 | 1 | 2}
            semanticConfidence={isFallback ? 0.4 : 0.85}
            estimatedResolutionComplexity="LOW"
            recommendedNextStep={results.length > 0 ? "Follow top result" : "Refine query"}
          />

          {isFallback && (
            <div className="flex items-start gap-3 p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <Activity className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <p className="text-sm text-neutral-300 m-0">
                <strong className="text-amber-300">Semantic fallback:</strong>{" "}
                No exact match for your query. Showing pages that frequently resolve similar issues.
              </p>
            </div>
          )}

          {resolvedResults.length === 0 && (
            <div className="text-center py-8 text-neutral-400 text-sm">
              No results found for &quot;{q}&quot;. Try searching for a router brand, model, or common problem.
            </div>
          )}

          <div className="space-y-3">
            {resolvedResults.map((res, idx) => {
              const tier = TIER_LABELS[res.tierUsed] ?? TIER_LABELS[1];
              return (
                <Link
                  key={`${res.chunkId}-${idx}`}
                  href={res.url}
                  className="group flex flex-col p-4 rounded-xl bg-neutral-800/50 border border-neutral-800 hover:border-indigo-500/50 hover:bg-neutral-800 transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-base text-neutral-200 font-semibold group-hover:text-white transition-colors">
                      {res.title || res.chunkId}
                    </span>
                    {res.url !== "#" && (
                      <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-indigo-400 shrink-0 transition-colors" />
                    )}
                  </div>
                  <p className="text-sm text-neutral-400 line-clamp-2 mb-3">{res.content}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-0.5 rounded bg-neutral-700/50 text-neutral-300 border border-neutral-700">
                      {res.entityType}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded border ${tier.class}`}>
                      {tier.label}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
