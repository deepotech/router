import { notFound } from "next/navigation";
import { Check, X, ShieldAlert, Wifi, Zap } from "lucide-react";
import { ComparisonService } from "@/server/services/comparison.service";
import { JsonLd, buildBreadcrumbSchema } from "@/lib/seo/schema";
import { APP_URL } from "@/lib/constants";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 86400; // Cache for 24h

import { hasDatabase } from "@/lib/server/env-safe";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (!hasDatabase) return {};
  const { slug } = await params;
  let comparison;
  try {
    comparison = await ComparisonService.getComparisonBySlug(slug);
  } catch {
    return {};
  }
  
  if (!comparison) return {};
  
  return {
    title: comparison.seoTitle,
    description: comparison.seoDesc,
    alternates: {
      canonical: `${APP_URL}/compare/${slug}`,
    },
  };
}

export default async function ComparisonPage({ params }: Props) {
  const { slug } = await params;
  if (!hasDatabase) notFound();
  let comparison;
  try {
    comparison = await ComparisonService.getComparisonBySlug(slug);
  } catch {
    notFound();
  }
  
  if (!comparison) notFound();

  // In a real scenario, these IDs would map to real models, so we fetch them to get logos/brands
  let routerA, routerB;
  try {
    const res = await ComparisonService.getRoutersForComparison(comparison.routerAId, comparison.routerBId);
    routerA = res.routerA;
    routerB = res.routerB;
  } catch {
    notFound();
  }

  if (!routerA || !routerB) notFound();

  const title = `${routerA.brand.name} ${routerA.name} vs ${routerB.brand.name} ${routerB.name}`;

  return (
    <>
      <JsonLd
        data={buildBreadcrumbSchema(
          [
            { label: "Home", href: "/" },
            { label: "Compare Routers", href: "/compare" },
            { label: title, href: `/compare/${slug}` },
          ],
          APP_URL
        )}
      />

      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl md:text-5xl font-extrabold text-[var(--text-primary)] text-center mb-4">
          {title}
        </h1>
        <p className="text-[var(--text-secondary)] text-center text-lg max-w-3xl mx-auto mb-12">
          {comparison.seoDesc}
        </p>

        {/* Comparison Header / Verdict */}
        <div className="glass-card p-8 mb-12 border-t-4 border-[var(--brand-500)] text-center">
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3">
            The Verdict
          </h2>
          <div className="prose-dark max-w-4xl mx-auto text-[var(--text-secondary)]">
             {comparison.verdict}
          </div>
        </div>

        {/* Feature Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
           <div className="glass-card p-6">
             <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4 border-b border-[var(--border-subtle)] pb-2">
               {routerA.brand.name} {routerA.name}
             </h3>
             <ul className="space-y-3 mt-4">
                {(comparison.prosConsA as any)?.pros?.map((pro: string, i: number) => (
                  <li key={`pro-a-${i}`} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                    <Check size={16} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                    {pro}
                  </li>
                ))}
             </ul>
           </div>
           
           <div className="glass-card p-6">
             <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4 border-b border-[var(--border-subtle)] pb-2">
               {routerB.brand.name} {routerB.name}
             </h3>
             <ul className="space-y-3 mt-4">
                {(comparison.prosConsB as any)?.pros?.map((pro: string, i: number) => (
                  <li key={`pro-b-${i}`} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                    <Check size={16} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                    {pro}
                  </li>
                ))}
             </ul>
           </div>
        </div>

        {/* Call To Action (Affiliate Ready) */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
           <button className="px-6 py-3 rounded-xl bg-[var(--brand-600)] text-white font-bold hover:bg-[var(--brand-500)] transition-colors">
             Check Price for {routerA.name}
           </button>
           <button className="px-6 py-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-strong)] text-[var(--text-primary)] font-bold hover:bg-[var(--bg-hover)] transition-colors">
             Check Price for {routerB.name}
           </button>
        </div>
      </div>
    </>
  );
}
