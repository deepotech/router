import { cn } from "@/lib/utils";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import type { BreadcrumbItem } from "@/types";

// =============================================================
// Breadcrumb — navigation + SEO schema data
// =============================================================

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  const allItems = [{ label: "Home", href: "/" }, ...items];

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("flex items-center gap-1 text-sm", className)}
    >
      <ol className="flex items-center gap-1 flex-wrap">
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1;
          return (
            <li key={index} className="flex items-center gap-1">
              {index === 0 && (
                <Home
                  size={14}
                  className="text-[var(--text-muted)] mr-0.5"
                  aria-hidden="true"
                />
              )}
              {isLast || !item.href ? (
                <span
                  className="text-[var(--text-primary)] font-medium truncate max-w-[200px]"
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-[var(--text-muted)] hover:text-[var(--brand-400)] transition-colors duration-[var(--transition-fast)] truncate max-w-[200px]"
                >
                  {item.label}
                </Link>
              )}
              {!isLast && (
                <ChevronRight
                  size={14}
                  className="text-[var(--text-muted)] flex-shrink-0"
                  aria-hidden="true"
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
