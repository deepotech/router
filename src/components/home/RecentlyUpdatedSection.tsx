import Link from "next/link";
import { Clock, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  href: string;
  type: string;
  createdAt: string;
}

interface RecentlyUpdatedSectionProps {
  articles: Article[];
}

export function RecentlyUpdatedSection({ articles }: RecentlyUpdatedSectionProps) {
  if (!articles || articles.length === 0) return null;

  const badgeColors: Record<string, "brand" | "success" | "warning" | "danger" | "outline" | "default"> = {
    IP: "success",
    Problem: "danger",
    Firmware: "brand",
  };

  // Limit to 5 articles
  const displayedArticles = articles.slice(0, 5);

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 border-t border-[var(--border-subtle)] bg-[var(--bg-elevated)]/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mb-8">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            Recently Updated Database Articles
          </h2>
          <span className="text-xs text-[var(--text-muted)] font-mono ml-auto hidden sm:inline">
            Status: Active Monitoring
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {displayedArticles.map((article) => (
            <Link
              key={article.id}
              href={article.href}
              className="glass-card p-5 hover:border-[var(--brand-500)] hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <Badge variant={badgeColors[article.type] || "default"}>
                    {article.type}
                  </Badge>
                  <span className="text-[10px] text-[var(--text-muted)] flex items-center gap-1 font-medium">
                    <Clock size={10} />
                    {new Date(article.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-[var(--text-primary)] group-hover:text-[var(--brand-400)] transition-colors line-clamp-2">
                  {article.title}
                </h3>
              </div>
              <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] flex items-center gap-0.5 text-xs text-[var(--brand-400)] font-semibold group-hover:underline">
                View Article <ChevronRight size={12} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
