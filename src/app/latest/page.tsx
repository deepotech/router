import { Metadata } from "next";
import Link from "next/link";
import { Clock, ChevronRight, ChevronLeft } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import { ArticlesService } from "@/server/services/articles.service";
import { buildMetadata } from "@/lib/seo/metadata";
import { JsonLd, buildBreadcrumbSchema } from "@/lib/seo/schema";
import { APP_URL } from "@/lib/constants";
import { hasDatabase } from "@/lib/server/env-safe";

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const resolvedParams = await searchParams;
  const pageStr = typeof resolvedParams.page === "string" ? resolvedParams.page : "1";
  const page = Math.max(1, parseInt(pageStr, 10) || 1);

  // C-5 Fix: noindex + follow — /latest is a utility pagination page, not a content destination.
  // Prevents crawl budget waste; Googlebot still follows links to discover individual article pages.
  return {
    ...buildMetadata({
      title: `Latest Troubleshooting Guides & Router Setups (Page ${page}) — RouterVia`,
      description: `Stay up to date with the latest router setups, firmware details, network troubleshooting, and IP configurations. Page ${page}.`,
      canonical: "/latest",
    }),
    robots: { index: false, follow: true },
  };
}

// force dynamic to support pagination query parameters
export const dynamic = "force-dynamic";

export default async function LatestArticlesPage({ searchParams }: Props) {
  const resolvedParams = await searchParams;
  const pageStr = typeof resolvedParams.page === "string" ? resolvedParams.page : "1";
  const page = Math.max(1, parseInt(pageStr, 10) || 1);
  const limit = 12; // 12 items per page fits nicely in a 3-column grid

  let articles: any[] = [];
  let totalCount = 0;
  if (hasDatabase) {
    try {
      const [resArticles, resCount] = await Promise.all([
        ArticlesService.getLatestArticles({ page, limit }),
        ArticlesService.getTotalArticlesCount(),
      ]);
      articles = resArticles;
      totalCount = resCount;
    } catch (error) {
      console.error("[Build] Failed to fetch latest articles:", error);
    }
  }

  const totalPages = Math.ceil(totalCount / limit);
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Latest Guides", href: "/latest" },
  ];
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbs, APP_URL);

  const badgeColors: Record<string, "brand" | "success" | "warning" | "danger" | "outline" | "default"> = {
    IP: "success",
    Problem: "danger",
    Firmware: "brand",
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />

      <div className="flex flex-col min-h-screen">
        <Header />

        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
          <Breadcrumb items={breadcrumbs} className="mb-8" />

          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] mb-3">
              Latest Troubleshooting Guides &amp; Setups
            </h1>
            <p className="text-[var(--text-secondary)] max-w-2xl text-lg">
              Explore the latest router login instructions, default gateway IP guides, and step-by-step troubleshooting articles.
            </p>
          </div>

          {articles.length === 0 ? (
            <div className="glass-card p-12 text-center text-[var(--text-muted)]">
              No articles found in the database.
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {articles.map((article, i) => (
                  <Link
                    key={article.id}
                    href={article.href}
                    className="glass-card p-6 flex flex-col justify-between hover:border-[var(--brand-500)] hover:-translate-y-0.5 transition-all duration-300 group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <Badge variant={badgeColors[article.type] || "default"}>
                          {article.type}
                        </Badge>
                        <span className="text-xs text-[var(--text-muted)] flex items-center gap-1">
                          <Clock size={12} />
                          {new Date(article.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                      <h2 className="text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--brand-400)] transition-colors line-clamp-2 mb-2">
                        {article.title}
                      </h2>
                      <p className="text-sm text-[var(--text-secondary)] line-clamp-3 mb-6">
                        {article.excerpt}
                      </p>
                    </div>
                    <span className="text-sm font-semibold text-[var(--brand-400)] flex items-center gap-1 group-hover:underline">
                      Read full guide <ChevronRight size={14} />
                    </span>
                  </Link>
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between border-t border-[var(--border-subtle)] pt-6 mt-8">
                  <div className="text-sm text-[var(--text-muted)]">
                    Showing page <span className="font-semibold text-[var(--text-primary)]">{page}</span> of <span className="font-semibold text-[var(--text-primary)]">{totalPages}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {page > 1 ? (
                      <Link
                        href={page === 2 ? "/latest" : `/latest?page=${page - 1}`}
                        className="px-4 py-2 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] hover:border-[var(--brand-500)] text-sm font-semibold text-[var(--text-secondary)] flex items-center gap-1 transition-all"
                      >
                        <ChevronLeft size={16} /> Previous
                      </Link>
                    ) : (
                      <button
                        disabled
                        className="px-4 py-2 rounded-xl bg-[var(--bg-elevated)]/50 border border-[var(--border-subtle)]/50 text-sm font-semibold text-[var(--text-muted)] flex items-center gap-1 cursor-not-allowed opacity-50"
                      >
                        <ChevronLeft size={16} /> Previous
                      </button>
                    )}

                    {page < totalPages ? (
                      <Link
                        href={`/latest?page=${page + 1}`}
                        className="px-4 py-2 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] hover:border-[var(--brand-500)] text-sm font-semibold text-[var(--text-secondary)] flex items-center gap-1 transition-all"
                      >
                        Next <ChevronRight size={16} />
                      </Link>
                    ) : (
                      <button
                        disabled
                        className="px-4 py-2 rounded-xl bg-[var(--bg-elevated)]/50 border border-[var(--border-subtle)]/50 text-sm font-semibold text-[var(--text-muted)] flex items-center gap-1 cursor-not-allowed opacity-50"
                      >
                        Next <ChevronRight size={16} />
                      </button>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </main>

        <Footer />
      </div>
    </>
  );
}
