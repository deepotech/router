"use client";

import { useState } from "react";
import { Activity, Loader2, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

// =============================================================
// DNS Lookup Client — supports A, AAAA, MX, TXT, NS, CNAME
// =============================================================

type RecordType = "A" | "AAAA" | "MX" | "TXT" | "NS" | "CNAME";
const RECORD_TYPES: RecordType[] = ["A", "AAAA", "MX", "TXT", "NS", "CNAME"];

interface MxRecord { exchange: string; priority: number }

interface DnsResult {
  domain: string;
  type: RecordType;
  resolved: boolean;
  records?: unknown;
  error?: string;
}

function renderRecords(result: DnsResult): React.ReactNode {
  if (!result.records) return null;
  const records = result.records as any[];

  if (result.type === "MX") {
    return (records as MxRecord[]).map((r, i) => (
      <div key={i} className="flex items-center justify-between text-sm py-2 border-b border-[var(--border-subtle)] last:border-0">
        <span className="text-[var(--text-muted)] text-xs">Priority {r.priority}</span>
        <span className="font-mono text-[var(--brand-400)] break-all ml-3">{r.exchange}</span>
      </div>
    ));
  }

  if (result.type === "TXT") {
    return (records as string[][]).map((r, i) => (
      <div key={i} className="text-xs font-mono text-[var(--brand-400)] py-2 break-all border-b border-[var(--border-subtle)] last:border-0">
        {r.join("")}
      </div>
    ));
  }

  return (records as string[]).map((r, i) => (
    <div key={i} className="text-sm font-mono text-[var(--brand-400)] py-2 border-b border-[var(--border-subtle)] last:border-0">
      {r}
    </div>
  ));
}

export default function DNSLookupClient() {
  const [domain, setDomain] = useState("");
  const [recordType, setRecordType] = useState<RecordType>("A");
  const [result, setResult] = useState<DnsResult | null>(null);
  const [loading, setLoading] = useState(false);

  async function lookup() {
    if (!domain.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch(
        `/api/tools/dns?domain=${encodeURIComponent(domain.trim())}&type=${recordType}`
      );
      const json = await res.json();
      setResult(json);
    } catch {
      setResult({ domain, type: recordType, resolved: false, error: "Request failed. Please try again." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="glass-card p-6 space-y-4 mb-6">
      {/* Input Row */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          id="dns-lookup-domain"
          type="text"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && lookup()}
          placeholder="example.com"
          className="flex-1 px-4 py-2.5 bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-xl text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--brand-500)] focus:ring-1 focus:ring-[var(--brand-500)] text-sm transition-all font-mono"
        />
        <select
          id="dns-record-type"
          value={recordType}
          onChange={(e) => setRecordType(e.target.value as RecordType)}
          className="px-4 py-2.5 bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:border-[var(--brand-500)] text-sm font-mono transition-all cursor-pointer"
        >
          {RECORD_TYPES.map((t) => (
            <option key={t} value={t}>{t} Record</option>
          ))}
        </select>
        <Button variant="primary" size="md" onClick={lookup} loading={loading} id="dns-lookup-btn">
          <Activity size={15} /> Lookup
        </Button>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex items-center gap-3 p-4 bg-[var(--bg-elevated)] rounded-xl border border-[var(--border-subtle)]">
          <Loader2 size={18} className="text-emerald-400 animate-spin" />
          <span className="text-sm text-[var(--text-secondary)]">
            Querying {recordType} records for <span className="font-mono">{domain}</span>…
          </span>
        </div>
      )}

      {/* Result */}
      {result && !loading && (
        <div className={`p-5 rounded-xl border ${
          result.resolved
            ? "border-emerald-800/50 bg-emerald-900/10"
            : "border-red-800/50 bg-red-900/10"
        }`}>
          <div className="flex items-center gap-3 mb-4">
            {result.resolved
              ? <CheckCircle size={18} className="text-emerald-400 shrink-0" />
              : <XCircle size={18} className="text-red-400 shrink-0" />}
            <span className="font-semibold text-[var(--text-primary)] text-sm">
              {result.resolved
                ? `${result.type} Records for ${result.domain}`
                : `No ${result.type} records found for ${result.domain}`}
            </span>
          </div>
          {result.resolved && !!result.records && (
            <div className="space-y-0">{renderRecords(result)}</div>
          )}
          {result.error && (
            <p className="text-sm text-red-400">{result.error}</p>
          )}
        </div>
      )}

      {/* Quick Presets */}
      <div className="pt-2 border-t border-[var(--border-subtle)]">
        <p className="text-xs text-[var(--text-muted)] mb-2">Quick check popular domains:</p>
        <div className="flex flex-wrap gap-2">
          {["google.com", "cloudflare.com", "github.com", "openai.com"].map((d) => (
            <button
              key={d}
              onClick={() => setDomain(d)}
              className="text-xs px-2.5 py-1 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--brand-400)] hover:border-[var(--brand-800)] transition-all font-mono"
            >
              {d}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
