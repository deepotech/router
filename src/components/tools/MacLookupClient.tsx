"use client";

import { useState } from "react";
import { Cpu, Loader2, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

// =============================================================
// MAC Address Lookup Client — queries /api/tools/mac
// =============================================================

interface MacResult {
  mac: string;
  vendor: string | null;
  found: boolean;
  error?: string;
}

const EXAMPLE_MACS = [
  { mac: "00:1A:2B:3C:4D:5E", label: "Apple" },
  { mac: "FC:AA:14:00:00:01", label: "Intel" },
  { mac: "B8:27:EB:AA:BB:CC", label: "Raspberry Pi" },
];

export default function MacLookupClient() {
  const [mac, setMac] = useState("");
  const [result, setResult] = useState<MacResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function lookup() {
    const cleaned = mac.replace(/[^A-Fa-f0-9]/g, "");
    if (cleaned.length < 6) {
      setError("Please enter at least the first 6 hex characters of a MAC address.");
      return;
    }
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const res = await fetch(`/api/tools/mac?mac=${encodeURIComponent(mac.trim())}`);
      const json: MacResult = await res.json();
      if ((json as { error?: string }).error && !json.found) {
        setError((json as { error?: string }).error ?? "Lookup failed.");
      } else {
        setResult(json);
      }
    } catch {
      setError("Request failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="glass-card p-6 space-y-4 mb-6">
      {/* Input */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          id="mac-lookup-input"
          type="text"
          value={mac}
          onChange={(e) => setMac(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && lookup()}
          placeholder="AA:BB:CC:DD:EE:FF"
          maxLength={17}
          className="flex-1 px-4 py-2.5 bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-xl text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--brand-500)] focus:ring-1 focus:ring-[var(--brand-500)] text-sm transition-all font-mono tracking-widest"
        />
        <Button variant="primary" size="md" onClick={lookup} loading={loading} id="mac-lookup-btn">
          <Cpu size={15} /> Lookup
        </Button>
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      {loading && (
        <div className="flex items-center gap-3 p-4 bg-[var(--bg-elevated)] rounded-xl border border-[var(--border-subtle)]">
          <Loader2 size={18} className="text-purple-400 animate-spin" />
          <span className="text-sm text-[var(--text-secondary)]">
            Looking up OUI for <span className="font-mono">{mac}</span>…
          </span>
        </div>
      )}

      {result && !loading && (
        <div className={`p-5 rounded-xl border ${
          result.found
            ? "border-purple-800/50 bg-purple-900/10"
            : "border-[var(--border-subtle)] bg-[var(--bg-elevated)]"
        }`}>
          <div className="flex items-center gap-3 mb-3">
            {result.found
              ? <CheckCircle size={18} className="text-purple-400 shrink-0" />
              : <XCircle size={18} className="text-[var(--text-muted)] shrink-0" />}
            <span className="font-semibold text-[var(--text-primary)] text-sm">
              {result.found ? "Vendor Found" : "Unknown Vendor / Private OUI"}
            </span>
          </div>
          <dl className="space-y-2">
            <div className="flex justify-between text-sm">
              <dt className="text-[var(--text-muted)]">OUI (First 3 bytes)</dt>
              <dd className="font-mono text-[var(--brand-400)]">{result.mac}</dd>
            </div>
            {result.vendor && (
              <div className="flex justify-between text-sm">
                <dt className="text-[var(--text-muted)]">Manufacturer</dt>
                <dd className="font-semibold text-[var(--text-primary)]">{result.vendor}</dd>
              </div>
            )}
            {!result.found && (
              <p className="text-xs text-[var(--text-muted)] pt-1">
                This OUI is not registered in the public IEEE database. It may be locally administered, randomized, or from a private manufacturer.
              </p>
            )}
          </dl>
        </div>
      )}

      {/* Example Presets */}
      <div className="pt-2 border-t border-[var(--border-subtle)]">
        <p className="text-xs text-[var(--text-muted)] mb-2">Try example MAC addresses:</p>
        <div className="flex flex-wrap gap-2">
          {EXAMPLE_MACS.map(({ mac: m, label }) => (
            <button
              key={m}
              onClick={() => setMac(m)}
              className="text-xs px-2.5 py-1 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--brand-400)] hover:border-[var(--brand-800)] transition-all font-mono"
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
