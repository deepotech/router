import Link from "next/link";
import { ChevronRight, Clock } from "lucide-react";
import { ArticlesService, type Article } from "@/server/services/articles.service";
import { Badge } from "@/components/ui/Badge";

interface Props {
  /** The current article's diagnosticCategory — used to find similar articles */
  diagnosticCategory: string | null;
  /** The current article's unique composite ID (e.g. "problem-12") — excluded from results */
  currentId: string;
  /** The current article's type — used for secondary entity-type matching */
  currentType: "IP" | "Problem" | "Firmware";
  /** How many related articles to show */
  limit?: number;
}

const badgeColors: Record<string, "brand" | "success" | "warning" | "danger" | "outline" | "default"> = {
  IP: "success",
  Problem: "danger",
  Firmware: "brand",
};

export async function RelatedArticles({ diagnosticCategory, currentId, currentType, limit = 4 }: Props) {
  // Fetch a pool of recent articles (up to 40 for diverse selection)
  const pool = await ArticlesService.getLatestArticles({ limit: 40 });

  // Filter and prioritize:
  // 1. Same category (diagnosticCategory)
  const matchedByCategory = pool.filter(
    (a) => a.id !== currentId && diagnosticCategory && a.diagnosticCategory === diagnosticCategory
  );

  // 2. Same entity type (IP, Problem, Firmware)
  const matchedByType = pool.filter(
    (a) => a.id !== currentId && a.type === currentType && !matchedByCategory.some((m) => m.id === a.id)
  );

  // 3. Fallbacks
  const rest = pool.filter(
    (a) => a.id !== currentId && !matchedByCategory.some((m) => m.id === a.id) && !matchedByType.some((m) => m.id === a.id)
  );

  const results = [...matchedByCategory, ...matchedByType, ...rest].slice(0, limit);

  if (results.length === 0) return null;

  return (
    <section className="mt-12 border-t border-[var(--border-subtle)] pt-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[var(--text-primary)] tracking-tight">Related Guides</h2>
          <p className="text-sm text-[var(--text-muted)] mt-1">Recommended troubleshooting and setup articles you might find useful.</p>
        </div>
        <Link
          href="/latest"
          className="text-sm font-semibold text-[var(--brand-400)] hover:text-[var(--brand-300)] hover:underline flex items-center gap-1"
        >
          View all <ChevronRight size={14} />
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {results.map((article: Article) => (
          <Link
            key={article.id}
            href={article.href}
            className="glass-card p-5 flex flex-col justify-between hover:border-[var(--brand-500)] hover:-translate-y-0.5 transition-all duration-200 group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <Badge variant={badgeColors[article.type] ?? "default"}>{article.type}</Badge>
                <span className="text-xs text-[var(--text-muted)] flex items-center gap-1">
                  <Clock size={11} />
                  {new Date(article.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <h3 className="text-base font-bold text-[var(--text-primary)] group-hover:text-[var(--brand-400)] transition-colors line-clamp-2 mb-1">
                {article.title}
              </h3>
              <p className="text-xs text-[var(--text-muted)] line-clamp-2">{article.excerpt}</p>
            </div>
            <span className="mt-4 text-xs font-semibold text-[var(--brand-400)] flex items-center gap-1 group-hover:underline">
              Read guide <ChevronRight size={12} />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
