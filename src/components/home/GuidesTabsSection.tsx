import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { GuidesTabsClient } from "./GuidesTabsClient";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  href: string;
  type: string;
  createdAt: string;
}

interface GuidesTabsSectionProps {
  latestArticles: Article[];
}

export function GuidesTabsSection({ latestArticles }: GuidesTabsSectionProps) {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-[var(--border-subtle)]">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-extrabold text-[var(--text-primary)] tracking-tight">
              Troubleshooting & Configuration Guides
            </h2>
            <p className="text-[var(--text-secondary)] mt-2">
              Recently updated router configurations, IP address setups, and network diagnostics.
            </p>
          </div>
          <Link
            href="/latest"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--brand-400)] hover:text-[var(--brand-300)] hover:underline transition-colors"
          >
            View All Guides <ChevronRight size={16} />
          </Link>
        </div>

        <GuidesTabsClient latestArticles={latestArticles} />
      </div>
    </section>
  );
}
