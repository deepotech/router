"use client";

import { useState } from "react";
import { Globe, Loader2, CheckCircle2, XCircle, RefreshCw, Server, MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";

type RecordType = "A" | "AAAA" | "MX" | "TXT" | "NS" | "CNAME";
const RECORD_TYPES: RecordType[] = ["A", "AAAA", "MX", "TXT", "NS", "CNAME"];

interface MxRecord {
  exchange: string;
  priority: number;
}

interface PropagationResult {
  resolver: string;
  ip: string;
  location: string;
  resolved: boolean;
  records?: any;
  error?: string;
}

interface ApiResponse {
  domain: string;
  type: RecordType;
  results: PropagationResult[];
}

export default function DnsPropagationCheckerClient() {
  const [domain, setDomain] = useState("");
  const [recordType, setRecordType] = useState<RecordType>("A");
  const [results, setResults] = useState<PropagationResult[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function checkPropagation() {
    if (!domain.trim()) return;
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const res = await fetch(
        `/api/tools/dns-propagation?domain=${encodeURIComponent(domain.trim())}&type=${recordType}`
      );
      if (!res.ok) {
        throw new Error("Failed to fetch DNS propagation details");
      }
      const data: ApiResponse = await res.json();
      setResults(data.results);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }

  function renderRecords(records: any, type: RecordType): React.ReactNode {
    if (!records) return <span className="text-[var(--text-muted)] italic text-xs">No records</span>;

    if (!Array.isArray(records)) {
      if (typeof records === "object") {
        return <span className="font-mono text-xs text-[var(--brand-400)] break-all">{JSON.stringify(records)}</span>;
      }
      return <span className="font-mono text-xs text-[var(--brand-400)] break-all">{String(records)}</span>;
    }

    if (records.length === 0) {
      return <span className="text-[var(--text-muted)] italic text-xs">Empty response</span>;
    }

    if (type === "MX") {
      return (records as MxRecord[]).map((r, i) => (
        <div key={i} className="flex justify-between items-center text-xs py-1 border-b border-[var(--border-subtle)] last:border-0 font-mono">
          <span className="text-[var(--text-muted)]">Pri: {r.priority}</span>
          <span className="text-[var(--brand-400)] break-all ml-2">{r.exchange}</span>
        </div>
      ));
    }

    if (type === "TXT") {
      return (records as (string | string[])[]).map((r, i) => {
        const val = Array.isArray(r) ? r.join("") : r;
        return (
          <div key={i} className="text-xs font-mono text-[var(--brand-400)] py-1 break-all border-b border-[var(--border-subtle)] last:border-0">
            {val}
          </div>
        );
      });
    }

    return (records as string[]).map((r, i) => (
      <div key={i} className="text-xs font-mono text-[var(--brand-400)] py-1 break-all border-b border-[var(--border-subtle)] last:border-0">
        {r}
      </div>
    ));
  }

  const successCount = results ? results.filter((r) => r.resolved).length : 0;
  const totalCount = results ? results.length : 0;
  const propagationPercentage = totalCount > 0 ? Math.round((successCount / totalCount) * 100) : 0;

  return (
    <div className="space-y-6">
      <div className="glass-card p-6 space-y-4">
        {/* Input Bar */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <input
              id="dns-prop-domain"
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && checkPropagation()}
              placeholder="Enter domain (e.g. google.com)"
              className="w-full px-4 py-2.5 bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-xl text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-sm transition-all font-mono"
            />
          </div>
          <select
            id="dns-prop-type"
            value={recordType}
            onChange={(e) => setRecordType(e.target.value as RecordType)}
            className="px-4 py-2.5 bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:border-purple-500 text-sm font-mono transition-all cursor-pointer"
          >
            {RECORD_TYPES.map((t) => (
              <option key={t} value={t}>
                {t} Record
              </option>
            ))}
          </select>
          <Button
            variant="primary"
            size="md"
            onClick={checkPropagation}
            loading={loading}
            id="dns-prop-btn"
            className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-medium"
          >
            <Globe size={15} /> Check Propagation
          </Button>
        </div>

        {/* Quick Presets */}
        <div className="pt-2 border-t border-[var(--border-subtle)] flex flex-wrap items-center gap-2">
          <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider font-mono mr-1">Presets:</span>
          {["cloudflare.com", "google.com", "github.com", "amazon.com"].map((d) => (
            <button
              key={d}
              onClick={() => setDomain(d)}
              className="text-xs px-2.5 py-1 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-purple-400 hover:border-purple-800 transition-all font-mono cursor-pointer"
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-12 space-y-4 bg-[var(--bg-elevated)] rounded-2xl border border-[var(--border-subtle)]">
          <Loader2 size={28} className="text-purple-400 animate-spin" />
          <p className="text-xs text-[var(--text-muted)] font-mono">
            Querying global DNS recursive clusters for <span className="text-purple-400 font-bold">{domain}</span>...
          </p>
        </div>
      )}

      {/* Error state */}
      {error && !loading && (
        <div className="p-4 border border-red-800/40 bg-red-900/10 text-red-400 rounded-xl text-xs flex items-center gap-2">
          <XCircle size={16} className="shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Results Rendering */}
      {results && !loading && (
        <div className="space-y-6">
          {/* Summary Metric card */}
          <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-2xl bg-gradient-to-br from-purple-950/10 via-transparent to-transparent flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="space-y-1 text-center md:text-left">
              <h3 className="text-sm font-bold text-[var(--text-primary)]">
                Propagation Summary
              </h3>
              <p className="text-xs text-[var(--text-secondary)]">
                Testing {recordType} records for <span className="font-mono text-purple-400 font-semibold">{domain}</span>
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <span className="text-2xl font-black text-[var(--text-primary)] font-mono">
                  {successCount}/{totalCount}
                </span>
                <span className="text-[10px] text-[var(--text-muted)] block uppercase font-mono tracking-wider">
                  Resolvers Active
                </span>
              </div>
              <div className="w-24 bg-[var(--bg-elevated)] h-3 rounded-full overflow-hidden border border-[var(--border-subtle)] relative">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-500"
                  style={{ width: `${propagationPercentage}%` }}
                />
              </div>
              <span className="text-xs font-bold font-mono text-purple-400">
                {propagationPercentage}%
              </span>
            </div>
          </div>

          {/* Grid Layout of results */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {results.map((r, i) => (
              <div
                key={i}
                className={`p-4 border rounded-xl bg-[var(--bg-elevated)] hover:bg-[var(--bg-surface)] transition-all duration-200 flex flex-col justify-between gap-3 ${
                  r.resolved
                    ? "border-[var(--border-subtle)] hover:border-purple-800/40"
                    : "border-red-900/30 hover:border-red-800/50"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-[var(--text-primary)] flex items-center gap-1.5">
                      <Server size={12} className="text-purple-400" />
                      {r.resolver}
                    </h4>
                    <div className="flex flex-wrap gap-2 text-[10px] text-[var(--text-muted)]">
                      <span className="font-mono">{r.ip}</span>
                      <span className="flex items-center gap-0.5">
                        <MapPin size={10} />
                        {r.location}
                      </span>
                    </div>
                  </div>

                  <div>
                    {r.resolved ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-950/30 border border-emerald-800/30 font-mono">
                        <CheckCircle2 size={10} /> OK
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-red-400 px-2 py-0.5 rounded-full bg-red-950/30 border border-red-800/30 font-mono">
                        <XCircle size={10} /> FAIL
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-3 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-lg min-h-[48px] flex flex-col justify-center">
                  {r.resolved ? (
                    renderRecords(r.records, recordType)
                  ) : (
                    <span className="text-[10px] text-red-400 font-mono break-all">{r.error || "Resolution failed"}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
