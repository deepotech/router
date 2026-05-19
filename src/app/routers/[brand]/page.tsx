import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Wifi, Lock } from "lucide-react";
import { RouterService } from "@/server/services/router.service";
import { buildMetadata } from "@/lib/seo/metadata";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import { JsonLd, buildBreadcrumbSchema } from "@/lib/seo/schema";
import { APP_URL } from "@/lib/constants";
import { RelatedProblems } from "@/components/seo/RelatedProblems";

type Props = { params: Promise<{ brand: string }> };

export async function generateStaticParams() {
  return RouterService.getAllBrandPaths();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { brand: brandSlug } = await params;
  const brand = await RouterService.getBrand(brandSlug);
  if (!brand) return {};
  return buildMetadata({
    title: `${brand.name} Router Login — Default IP, Username & Password`,
    description: `Find login IPs, default passwords, and setup guides for all ${brand.name} router models.`,
    canonical: `/routers/${brand.slug}`,
  });
}

export const revalidate = 86400;

export default async function BrandPage({ params }: Props) {
  const { brand: brandSlug } = await params;
  const [brand, models] = await Promise.all([
    RouterService.getBrand(brandSlug),
    RouterService.getBrandModels(brandSlug),
  ]);
  if (!brand) notFound();

  const breadcrumbs = [
    { label: "Routers", href: "/routers" },
    { label: brand.name, href: `/routers/${brand.slug}` },
  ];

  return (
    <>
      <JsonLd data={buildBreadcrumbSchema([{ label: "Home", href: "/" }, ...breadcrumbs], APP_URL)} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Breadcrumb items={breadcrumbs} className="mb-8" />

        <div className="glass-card p-8 mb-10 flex items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-[var(--brand-900)] border border-[var(--brand-800)] flex items-center justify-center flex-shrink-0">
            <Wifi size={28} className="text-[var(--brand-400)]" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-[var(--text-primary)] mb-2">
              {brand.name} Routers
            </h1>
            {brand.description && (
              <p className="text-[var(--text-secondary)] max-w-2xl">{brand.description}</p>
            )}
            <div className="mt-3">
              <Badge variant="brand">{models.length} models available</Badge>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {models.map((model, i) => (
            <Link
              key={model.slug}
              href={`/routers/${brand.slug}/${model.slug}`}
              className={`glass-card p-6 hover:border-[var(--border-strong)] hover:bg-[var(--bg-hover)] hover:-translate-y-0.5 transition-all duration-[var(--transition-base)] group animate-fade-in-up stagger-${Math.min(i + 1, 6)}`}
            >
              <h2 className="text-base font-bold text-[var(--text-primary)] mb-3">
                {brand.name} {model.name}
              </h2>
              <p className="text-xs text-[var(--text-secondary)] mb-1">
                Login IP:{" "}
                <span className="font-mono text-[var(--brand-400)]">
                  {model.loginIps[0]}
                </span>
              </p>
              <p className="text-xs text-[var(--text-secondary)]">
                Default:{" "}
                <span className="font-mono text-[var(--text-primary)]">
                  {model.defaultUsername} / {model.defaultPassword || "(blank)"}
                </span>
              </p>
              <div className="mt-3 text-xs text-[var(--brand-400)] group-hover:underline">
                View full guide →
              </div>
            </Link>
          ))}
        </div>

        {models.length === 0 && (
          <div className="glass-card p-12 text-center">
            <p className="text-[var(--text-muted)]">No models found for {brand.name} yet.</p>
          </div>
        )}

        {/* Topic Cluster Expansion */}
        <RelatedProblems category="WIFI" currentSlug="" />
      </div>
    </>
  );
}
