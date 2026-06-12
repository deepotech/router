import type { Metadata } from "next";
import Link from "next/link";
import { Wrench, ChevronRight } from "lucide-react";
import { ProblemService } from "@/server/services/problem.service";
import { buildMetadata } from "@/lib/seo/metadata";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import { JsonLd, buildBreadcrumbSchema } from "@/lib/seo/schema";
import { APP_URL, PROBLEM_CATEGORIES } from "@/lib/constants";
import { hasDatabase } from "@/lib/server/env-safe";

export const metadata: Metadata = buildMetadata({
  title: "WiFi & Router Problems — Troubleshooting Guides",
  description:
    "Fix any WiFi, router, or network problem with step-by-step troubleshooting guides. DNS issues, slow internet, no connection, and more.",
  canonical: "/problems",
});

// Force dynamic to prevent Prisma queries during Railway build phase
export const dynamic = "force-dynamic";

export default async function ProblemsPage() {
  let problems: any[] = [];
  if (hasDatabase) {
    try {
      problems = await ProblemService.getAll();
    } catch (error) {
      console.error("[Build] Failed to fetch problems:", error);
    }
  }

  const breadcrumbs = [{ label: "Fix Problems", href: "/problems" }];

  const categoryColors: Record<string, string> = {
    WIFI: "brand",
    DNS: "success",
    SPEED: "warning",
    CONNECTION: "danger",
    SECURITY: "outline",
    HARDWARE: "default",
    OTHER: "default",
  };

  return (
    <>
      <JsonLd
        data={buildBreadcrumbSchema(
          [{ label: "Home", href: "/" }, ...breadcrumbs],
          APP_URL
        )}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Breadcrumb items={breadcrumbs} className="mb-8" />

        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] mb-3">
            Fix WiFi &amp; Router Problems
          </h1>
          <p className="text-[var(--text-secondary)] max-w-2xl">
            Step-by-step troubleshooting guides for every common networking
            problem — from no internet to DNS failures.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {problems.map((problem, i) => (
            <Link
              key={problem.slug}
              href={`/problems/${problem.slug}`}
              className={`glass-card p-6 hover:border-[var(--border-strong)] hover:bg-[var(--bg-hover)] hover:-translate-y-0.5 transition-all duration-[var(--transition-base)] group animate-fade-in-up stagger-${Math.min(i + 1, 6)}`}
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-red-900/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Wrench size={18} className="text-red-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="mb-2">
                    <Badge
                      variant={
                        (categoryColors[problem.category] as "brand" | "success" | "warning" | "danger" | "outline" | "default") ??
                        "default"
                      }
                      size="sm"
                    >
                      {PROBLEM_CATEGORIES[problem.category as keyof typeof PROBLEM_CATEGORIES]}
                    </Badge>
                  </div>
                  <h2 className="text-sm font-bold text-[var(--text-primary)] mb-1 line-clamp-2">
                    {problem.title}
                  </h2>
                  <p className="text-xs text-[var(--text-muted)] line-clamp-2">
                    {problem.excerpt}
                  </p>
                  <span className="mt-3 text-xs text-[var(--brand-400)] flex items-center gap-1 group-hover:underline">
                    Read guide <ChevronRight size={12} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {problems.length === 0 && (
          <div className="glass-card p-12 text-center">
            <p className="text-[var(--text-muted)]">No guides found yet. Check back soon.</p>
          </div>
        )}
      </div>
    </>
  );
}
