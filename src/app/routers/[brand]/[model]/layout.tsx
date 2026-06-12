import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { RouterService } from "@/server/services/router.service";
import { buildRouterMetadata } from "@/lib/seo/metadata";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import { APP_URL } from "@/lib/constants";
import { RelatedRouters } from "@/components/seo/RelatedRouters";
import { RelatedArticles } from "@/components/seo/RelatedArticles";
import { AnalyticsService } from "@/server/services/analytics.service";
import { JsonLd, buildBreadcrumbSchema, calculateRouterRating } from "@/lib/seo/schema";
import { Bot } from "lucide-react";

type Props = { params: Promise<{ brand: string; model: string }>; children: React.ReactNode };

export async function generateStaticParams() {
  try {
    const paths = await RouterService.getAllModelPaths();
    return paths.map((p) => ({ brand: p.brand, model: p.model }));
  } catch (error) {
    console.warn("[Build] Skipping Model SSG — database unavailable.");
    return [];
  }
}

import { hasDatabase } from "@/lib/server/env-safe";

export async function generateMetadata({ params }: { params: Promise<{ brand: string; model: string }> }): Promise<Metadata> {
  if (!hasDatabase) return {};
  const { brand: brandSlug, model: modelSlug } = await params;
  let routerModel;
  try {
    routerModel = await RouterService.getModel(brandSlug, modelSlug);
  } catch {
    return {};
  }
  if (!routerModel || !routerModel.brand) return {};
  return buildRouterMetadata({
    brandName: routerModel.brand.name,
    brandSlug,
    modelName: routerModel.name,
    modelSlug,
    loginIp: routerModel.loginIps[0],
  });
}

export default async function RouterModelLayout({ params, children }: Props) {
  const { brand: brandSlug, model: modelSlug } = await params;

  if (!hasDatabase) notFound();

  let routerModel;
  try {
    routerModel = await RouterService.getModel(brandSlug, modelSlug);
  } catch {
    notFound();
  }
  if (!routerModel || !routerModel.brand) notFound();

  // Log page view analytics event (fire-and-forget — don't block render)
  try {
    AnalyticsService.logEvent("PAGE_VIEW", { url: `/routers/${brandSlug}/${modelSlug}`, title: routerModel.name });
  } catch {}

  const brandName = routerModel.brand.name;
  const { ratingValue, ratingCount } = calculateRouterRating(routerModel.id);

  const breadcrumbs = [
    { label: "Routers", href: "/routers" },
    { label: brandName, href: `/routers/${brandSlug}` },
    { label: routerModel.name, href: `/routers/${brandSlug}/${modelSlug}` },
  ];

  const tabs = [
    { name: "Overview", href: `/routers/${brandSlug}/${modelSlug}` },
    { name: "Login Guide", href: `/routers/${brandSlug}/${modelSlug}/login` },
    { name: "WiFi Setup", href: `/routers/${brandSlug}/${modelSlug}/setup` },
    { name: "Factory Reset", href: `/routers/${brandSlug}/${modelSlug}/reset` },
  ];

  return (
    <>
      <JsonLd data={buildBreadcrumbSchema([{ label: "Home", href: "/" }, ...breadcrumbs], APP_URL)} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Breadcrumb items={breadcrumbs} className="mb-8" />

      {/* Page Title */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <Badge variant="brand">{brandName}</Badge>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)]">
          {brandName} {routerModel.name}
        </h1>
        <p className="text-[var(--text-secondary)] mt-3 text-lg">
          Complete guide, manuals, and troubleshooting for the {routerModel.name} router.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex overflow-x-auto custom-scrollbar border-b border-[var(--border-default)] mb-8 gap-6 pb-px">
        {tabs.map((tab) => (
          <Link
            key={tab.name}
            href={tab.href}
            className="whitespace-nowrap pb-3 text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] border-b-2 border-transparent hover:border-[var(--brand-500)] transition-all"
          >
            {tab.name}
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2">
          {children}
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          {/* Quick Info */}
          <div className="glass-card p-6">
            <h3 className="text-sm font-bold text-[var(--text-primary)] mb-4 uppercase tracking-wider">
              Quick Reference
            </h3>
            <dl className="space-y-4">
              <div className="flex justify-between border-b border-[var(--border-subtle)] pb-2">
                <dt className="text-sm text-[var(--text-muted)]">Brand</dt>
                <dd className="text-sm font-semibold text-[var(--text-primary)]">{brandName}</dd>
              </div>
              <div className="flex justify-between border-b border-[var(--border-subtle)] pb-2">
                <dt className="text-sm text-[var(--text-muted)]">Model</dt>
                <dd className="text-sm font-semibold text-[var(--text-primary)]">{routerModel.name}</dd>
              </div>
              <div className="flex justify-between border-b border-[var(--border-subtle)] pb-2">
                <dt className="text-sm text-[var(--text-muted)]">Default IP</dt>
                <dd className="text-sm font-mono text-[var(--brand-400)]">{routerModel.loginIps[0]}</dd>
              </div>
              <div className="flex justify-between border-b border-[var(--border-subtle)] pb-2">
                <dt className="text-sm text-[var(--text-muted)]">Username</dt>
                <dd className="text-sm font-mono text-[var(--text-primary)]">{routerModel.defaultUsername}</dd>
              </div>
              <div className="flex justify-between border-b border-[var(--border-subtle)] pb-2">
                <dt className="text-sm text-[var(--text-muted)]">Password</dt>
                <dd className="text-sm font-mono text-[var(--text-primary)]">{routerModel.defaultPassword || "(blank)"}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm text-[var(--text-muted)]">Trust Score</dt>
                <dd className="text-sm font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
                  <span className="text-[var(--brand-400)] font-bold">{ratingValue.toFixed(1)}</span>
                  <span className="text-amber-400 text-sm">★</span>
                  <span className="text-xs text-[var(--text-muted)] font-normal">({ratingCount} votes)</span>
                </dd>
              </div>
            </dl>
          </div>

          {/* AI Help CTA */}
          <div className="glass-card p-6 border border-[var(--brand-800)] bg-[var(--brand-900)]/20 relative overflow-hidden">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-[var(--brand-500)]/20 blur-2xl rounded-full" />
            <Bot size={24} className="text-[var(--brand-400)] mb-3" />
            <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">
              Troubleshooting?
            </h3>
            <p className="text-sm text-[var(--text-secondary)] mb-5">
              Our AI assistant knows the exact specs for the {routerModel.name} and can help you fix connection drops or slow speeds.
            </p>
            <Link
              href="/assistant"
              className="block w-full text-center py-2.5 px-4 rounded-xl bg-[var(--brand-600)] hover:bg-[var(--brand-500)] text-white text-sm font-semibold transition-colors"
            >
              Ask AI Assistant
            </Link>
          </div>
        </aside>
      </div>

      {/* Semantic Internal Linking */}
      <RelatedRouters brandId={routerModel.brandId} currentModelId={routerModel.id} brandName={brandName} brandSlug={brandSlug} />
      <RelatedArticles
        diagnosticCategory={routerModel.diagnosticCategory}
        currentId={`router-${routerModel.id}`}
        currentType="Firmware"
      />
    </div>
    </>
  );
}
