"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, Loader2, Wifi, Wrench, Globe, ChevronRight } from "lucide-react";
import { useDebounce } from "@/lib/hooks/useDebounce"; // We'll create this hook

interface SearchResults {
  routers: Array<{ slug: string; name: string; brand: { name: string; slug: string } }>;
  problems: Array<{ slug: string; title: string }>;
  ips: Array<{ slug: string; address: string }>;
  isFallback?: boolean;
}

export function GlobalSearch({ className }: { className?: string }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResults | null>(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    async function fetchResults() {
      if (!debouncedQuery || debouncedQuery.length < 2) {
        setResults(null);
        return;
      }
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(debouncedQuery)}`);
        if (res.ok) {
          const data = await res.json();
          setResults(data);
          setOpen(true);
        }
      } catch (error) {
        console.error("Search failed:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchResults();
  }, [debouncedQuery]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const totalResults = results ? results.routers.length + results.problems.length + results.ips.length : 0;

  return (
    <div ref={wrapperRef} className={`relative ${className || "w-full max-w-xl"}`}>
      <div className="relative">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (e.target.value.length > 0) setOpen(true);
          }}
          onFocus={() => { if (query.length > 1) setOpen(true); }}
          placeholder="Search routers, problems, or IPs..."
          className="w-full pl-10 pr-10 py-2.5 bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-xl text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--brand-500)] focus:ring-1 focus:ring-[var(--brand-500)] text-sm transition-all"
        />
        {loading && (
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
            <Loader2 size={16} className="text-[var(--brand-400)] animate-spin" />
          </div>
        )}
      </div>

      {open && query.length >= 2 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-[var(--bg-surface)] border border-[var(--border-strong)] rounded-xl shadow-[var(--shadow-elevated)] overflow-hidden z-50">
          {!loading && totalResults === 0 && !results?.isFallback ? (
            <div className="p-6 text-center text-sm text-[var(--text-muted)]">
              No results found for &quot;{query}&quot;. Try adjusting your search.
            </div>
          ) : (
            <div className="max-h-[400px] overflow-y-auto custom-scrollbar py-2">
              {results?.isFallback && (
                <div className="px-4 py-3 mb-2 bg-[var(--bg-hover)] border-b border-[var(--border-default)]">
                  <p className="text-sm text-[var(--text-primary)] font-medium">No direct results found for &quot;{query}&quot;</p>
                  <p className="text-xs text-[var(--text-muted)] mt-1">Popular troubleshooting topics:</p>
                </div>
              )}
              {results?.routers && results.routers.length > 0 && (
                <div className="mb-2">
                  <div className="px-3 py-1.5 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider bg-[var(--bg-base)]">Routers</div>
                  {results.routers.map(router => (
                    <Link key={`router-${router.slug}`} href={`/routers/${router.brand.slug}/${router.slug}`} onClick={() => setOpen(false)} className="flex items-center gap-3 px-4 py-2 hover:bg-[var(--bg-hover)] transition-colors group">
                      <Wifi size={14} className="text-[var(--brand-400)]" />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-[var(--text-primary)] group-hover:text-[var(--brand-400)] transition-colors">
                          {router.brand.name} {router.name}
                        </div>
                      </div>
                      <ChevronRight size={14} className="text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  ))}
                </div>
              )}
              {results?.problems && results.problems.length > 0 && (
                <div className="mb-2">
                  <div className="px-3 py-1.5 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider bg-[var(--bg-base)]">Guides & Fixes</div>
                  {results.problems.map(prob => (
                    <Link key={`prob-${prob.slug}`} href={`/problems/${prob.slug}`} onClick={() => setOpen(false)} className="flex items-center gap-3 px-4 py-2 hover:bg-[var(--bg-hover)] transition-colors group">
                      <Wrench size={14} className="text-red-400" />
                      <div className="text-sm font-medium text-[var(--text-primary)] group-hover:text-red-400 transition-colors line-clamp-1">
                        {prob.title}
                      </div>
                      <ChevronRight size={14} className="text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
                    </Link>
                  ))}
                </div>
              )}
              {results?.ips && results.ips.length > 0 && (
                <div>
                  <div className="px-3 py-1.5 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider bg-[var(--bg-base)]">IP Addresses</div>
                  {results.ips.map(ip => (
                    <Link key={`ip-${ip.slug}`} href={`/ips/${ip.slug}`} onClick={() => setOpen(false)} className="flex items-center gap-3 px-4 py-2 hover:bg-[var(--bg-hover)] transition-colors group">
                      <Globe size={14} className="text-emerald-400" />
                      <div className="text-sm font-medium font-mono text-[var(--text-primary)] group-hover:text-emerald-400 transition-colors">
                        {ip.address}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
