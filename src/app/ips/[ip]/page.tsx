import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { HelpCircle, ChevronDown, Wrench, AlertTriangle } from "lucide-react";
import { IpService } from "@/server/services/ip.service";
import { AnalyticsService } from "@/server/services/analytics.service";
import { buildIpMetadata } from "@/lib/seo/metadata";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { JsonLd, buildBreadcrumbSchema, buildFaqSchema, generateSemanticArticleSchema } from "@/lib/seo/schema";
import { APP_URL } from "@/lib/constants";
import { Badge } from "@/components/ui/Badge";
import { slugToIp } from "@/lib/utils";
import { RelatedProblemsForIp } from "@/components/seo/RelatedProblemsForIp";
import { RelatedArticles } from "@/components/seo/RelatedArticles";

type Props = { params: Promise<{ ip: string }> };

export async function generateStaticParams() {
  try {
    return await IpService.getAllPaths();
  } catch (error) {
    console.warn("[Build] Skipping IP SSG — database unavailable.");
    return [];
  }
}

import { hasDatabase } from "@/lib/server/env-safe";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (!hasDatabase) return {};
  const { ip: ipSlug } = await params;
  const ip = await IpService.getBySlug(ipSlug);
  if (!ip) return {};
  return buildIpMetadata({
    ipAddress: ip.address,
    ipSlug: ip.slug,
    brands: ip.commonBrands,
  });
}

export const revalidate = 86400;

export default async function IpPage({ params }: Props) {
  const { ip: ipSlug } = await params;
  const ip = await IpService.getBySlug(ipSlug);
  if (!ip) notFound();

  // Log page view analytics event
  AnalyticsService.logEvent("PAGE_VIEW", { url: `/ips/${ip.slug}`, title: ip.address });

  const breadcrumbs = [
    { label: "IP Addresses", href: "/ips" },
    { label: ip.address, href: `/ips/${ip.slug}` },
  ];

  return (
    <>
      <JsonLd data={buildBreadcrumbSchema([{ label: "Home", href: "/" }, ...breadcrumbs], APP_URL)} />
      {ip.faqs.length > 0 && <JsonLd data={buildFaqSchema(ip.faqs)} />}
      <JsonLd
        data={generateSemanticArticleSchema(
          `${ip.address} Router Login Guide`,
          ip.metaDescription || ip.description,
          `https://routervia.com/ips/${ip.slug}`,
          ip.createdAt,
          ip.updatedAt,
          ip.decayScore ?? 0.9,
          "RouterVia",
          "https://routervia.com"
        )}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Breadcrumb items={breadcrumbs} className="mb-8" />

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] mb-3">
            <span className="font-mono text-[var(--brand-400)]">{ip.address}</span>
            {" "}— Router Admin Login Page
          </h1>
          <p className="text-[var(--text-secondary)] text-lg">{ip.description}</p>
          <div className="flex flex-wrap gap-2 mt-4">
            {ip.commonBrands.map((brand) => (
              <Badge key={brand} variant="brand">{brand}</Badge>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* How to Login */}
            <section className="glass-card p-6">
              <h2 className="text-xl font-bold text-[var(--text-primary)] mb-5 flex items-center gap-2">
                <Wrench size={20} className="text-[var(--brand-400)]" />
                How to Login at {ip.address}
              </h2>
              <div
                className="prose-dark"
                dangerouslySetInnerHTML={{ __html: markdownToHtml(ip.loginGuide) }}
              />
            </section>

            {/* Cannot connect warning */}
            <section className="glass-card p-6 border-amber-800/50 bg-amber-900/10">
              <div className="flex items-start gap-3">
                <AlertTriangle size={20} className="text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-[var(--text-primary)] mb-2">
                    Can&apos;t access {ip.address}?
                  </h3>
                  <ul className="text-sm text-[var(--text-secondary)] space-y-1.5 list-disc pl-4">
                    <li>Make sure you&apos;re connected to the router (WiFi or cable)</li>
                    <li>Check your Default Gateway: run <code className="text-[var(--accent-400)] bg-[var(--bg-elevated)] px-1 rounded">ipconfig</code> on Windows</li>
                    <li>Try <Link href="/ips/192-168-0-1" className="text-[var(--brand-400)] hover:underline">192.168.0.1</Link> or <Link href="/ips/192-168-1-1" className="text-[var(--brand-400)] hover:underline">192.168.1.1</Link> if this doesn&apos;t work</li>
                    <li>Disable VPN if you&apos;re using one</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* FAQs */}
            {ip.faqs.length > 0 && (
              <section className="glass-card p-6">
                <h2 className="text-xl font-bold text-[var(--text-primary)] mb-5 flex items-center gap-2">
                  <HelpCircle size={20} className="text-[var(--accent-400)]" />
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  {ip.faqs.map((faq, i) => (
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

            {/* Programmatic Internal Link Clusters */}
            <RelatedProblemsForIp ipAddress={ip.address} diagnosticCategory={ip.diagnosticCategory} />
            
            <RelatedArticles
              diagnosticCategory={ip.diagnosticCategory}
              currentId={`ip-${ip.id}`}
              currentType="IP"
            />
          </div>

          {/* Sidebar */}
          <aside className="space-y-4">
            <div className="glass-card p-5">
              <h3 className="text-sm font-bold text-[var(--text-primary)] mb-4">Common Routers Using This IP</h3>
              <ul className="space-y-2">
                {ip.commonBrands.map((brand) => (
                  <li key={brand}>
                    <Link
                      href={`/routers/${brand.toLowerCase().replace(/\s+/g, "-")}`}
                      className="text-sm text-[var(--brand-400)] hover:underline"
                    >
                      {brand} routers →
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass-card p-5 border border-[var(--brand-800)] bg-[var(--brand-900)]/20">
              <p className="text-sm font-semibold text-[var(--text-primary)] mb-2">Need help?</p>
              <p className="text-xs text-[var(--text-secondary)] mb-4">Our AI assistant can walk you through the login process step by step.</p>
              <Link href="/assistant" className="block w-full text-center py-2 px-4 rounded-lg bg-[var(--brand-600)] hover:bg-[var(--brand-500)] text-white text-sm font-semibold transition-colors">
                Ask AI Assistant
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}

function markdownToHtml(md: string): string {
  return md
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/^\d+\. (.+)$/gm, "<li>$1</li>")
    .replace(/^- (.+)$/gm, "<li>$1</li>")
    .replace(/\n\n/g, "<br/><br/>")
    .replace(/\n/g, "<br/>");
}
