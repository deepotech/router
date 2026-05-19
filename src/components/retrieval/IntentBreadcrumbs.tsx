import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface IntentBreadcrumbsProps {
  hierarchy: {
    label: string;
    href: string;
  }[];
}

export function IntentBreadcrumbs({ hierarchy }: IntentBreadcrumbsProps) {
  if (!hierarchy || hierarchy.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="mb-6 flex items-center text-sm">
      <ol className="flex items-center gap-2 overflow-hidden text-neutral-400">
        <li className="flex items-center">
          <Link href="/" className="hover:text-white transition-colors" aria-label="Home">
            <Home className="w-4 h-4" />
          </Link>
        </li>
        {hierarchy.map((item, index) => {
          const isLast = index === hierarchy.length - 1;
          return (
            <li key={index} className="flex items-center gap-2">
              <ChevronRight className="w-4 h-4 text-neutral-600 shrink-0" />
              {isLast ? (
                <span className="text-neutral-200 font-medium truncate max-w-[200px] md:max-w-[400px]">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-white transition-colors truncate max-w-[150px] md:max-w-[250px]"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
