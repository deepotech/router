import { notFound } from "next/navigation";
import { HelpCircle, ChevronDown, BookOpen } from "lucide-react";
import { RouterService } from "@/server/services/router.service";
import { JsonLd, buildFaqSchema, buildProductSchema, generateSemanticArticleSchema, calculateRouterRating } from "@/lib/seo/schema";
import { APP_URL } from "@/lib/constants";
import { RelatedArticles } from "@/components/seo/RelatedArticles";

type Props = { params: Promise<{ brand: string; model: string }> };

export const revalidate = 86400;

import { hasDatabase } from "@/lib/server/env-safe";

export default async function RouterModelOverviewPage({ params }: Props) {
  const { brand: brandSlug, model: modelSlug } = await params;
  if (!hasDatabase) notFound();
  let routerModel;
  try {
    routerModel = await RouterService.getModel(brandSlug, modelSlug);
  } catch {
    notFound();
  }
  if (!routerModel || !routerModel.brand) notFound();

  const brandName = routerModel.brand.name;
  const { ratingValue, ratingCount } = calculateRouterRating(routerModel.id);

  return (
    <>
      <JsonLd
        data={buildProductSchema({
          name: `${brandName} ${routerModel.name}`,
          description: routerModel.metaDescription || `${brandName} ${routerModel.name} router admin page and setup guide.`,
          brand: brandName,
          image: routerModel.imageUrl || undefined,
          url: `${APP_URL}/routers/${brandSlug}/${modelSlug}`,
          ratingValue,
          ratingCount,
        })}
      />
      {routerModel.faqs.length > 0 && <JsonLd data={buildFaqSchema(routerModel.faqs)} />}
      <JsonLd
        data={generateSemanticArticleSchema(
          `${brandName} ${routerModel.name} Setup & Login Guide`,
          routerModel.metaDescription || `Complete guide, manuals, and troubleshooting for the ${routerModel.name} router.`,
          `${APP_URL}/routers/${brandSlug}/${modelSlug}`,
          routerModel.createdAt,
          routerModel.updatedAt,
          0.9,
          "RouterVia",
          "https://routervia.com"
        )}
      />

      <div className="space-y-6">
        <section className="glass-card p-6">
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-5 flex items-center gap-2">
            <BookOpen size={20} className="text-[var(--brand-400)]" />
            About the {routerModel.name}
          </h2>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            The {brandName} {routerModel.name} is a high-performance router designed for reliable home and small office networking. 
            Select one of the tabs above to access the detailed login guide, WiFi setup instructions, or factory reset procedures.
          </p>
        </section>

        {routerModel.faqs.length > 0 && (
          <section className="glass-card p-6">
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-5 flex items-center gap-2">
              <HelpCircle size={20} className="text-[var(--accent-400)]" />
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {routerModel.faqs.map((faq, i) => (
                <details key={i} className="group border border-[var(--border-subtle)] rounded-xl overflow-hidden">
                  <summary className="flex items-center justify-between p-4 cursor-pointer list-none hover:bg-[var(--bg-elevated)] transition-colors">
                    <span className="font-medium text-[var(--text-primary)] pr-4">{faq.question}</span>
                    <ChevronDown size={16} className="text-[var(--text-muted)] flex-shrink-0 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="px-4 pb-4 text-[var(--text-secondary)] text-sm leading-relaxed border-t border-[var(--border-subtle)] pt-3">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </section>
        )}

        <RelatedArticles
          diagnosticCategory={routerModel.diagnosticCategory}
          currentId={`router-${routerModel.id}`}
          currentType="Firmware"
        />
      </div>
    </>
  );
}
