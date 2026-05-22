"use client";

import { useState } from "react";
import { Shield, Loader2, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

// =============================================================
// Port Checker Client — TCP connection test to host:port
// =============================================================

const COMMON_PORTS = [
  { port: 80,   name: "HTTP"  },
  { port: 443,  name: "HTTPS" },
  { port: 22,   name: "SSH"   },
  { port: 21,   name: "FTP"   },
  { port: 25,   name: "SMTP"  },
  { port: 3389, name: "RDP"   },
  { port: 3306, name: "MySQL" },
  { port: 5432, name: "PgSQL" },
];

interface PortResult {
  open: boolean;
  host: string;
  port: number;
}

export default function PortCheckerClient() {
  const [host, setHost] = useState("");
  const [port, setPort] = useState("");
  const [result, setResult] = useState<PortResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function check() {
    if (!host.trim() || !port.trim()) {
      setError("Please enter both a host and port number.");
      return;
    }
    const portNum = parseInt(port, 10);
    if (isNaN(portNum) || portNum < 1 || portNum > 65535) {
      setError("Please enter a valid port number (1–65535).");
      return;
    }
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const res = await fetch(
        `/api/tools/port?host=${encodeURIComponent(host.trim())}&port=${portNum}`
      );
      const json = await res.json();
      if (json.error) throw new Error(json.error);
      setResult(json);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Request failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="glass-card p-6 space-y-4 mb-6">
      {/* Inputs */}
      <div className="grid grid-cols-3 gap-3">
        <div className="col-span-2">
          <label className="block text-xs text-[var(--text-muted)] uppercase tracking-wider mb-1.5" htmlFor="pc-host">
            Host / IP Address
          </label>
          <input
            id="pc-host"
            type="text"
            value={host}
            onChange={(e) => setHost(e.target.value)}
            placeholder="example.com or 1.2.3.4"
            className="w-full px-4 py-2.5 bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-xl text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--brand-500)] focus:ring-1 focus:ring-[var(--brand-500)] text-sm font-mono transition-all"
          />
        </div>
        <div>
          <label className="block text-xs text-[var(--text-muted)] uppercase tracking-wider mb-1.5" htmlFor="pc-port">
            Port
          </label>
          <input
            id="pc-port"
            type="number"
            value={port}
            onChange={(e) => setPort(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && check()}
            placeholder="443"
            min={1}
            max={65535}
            className="w-full px-4 py-2.5 bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-xl text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--brand-500)] focus:ring-1 focus:ring-[var(--brand-500)] text-sm font-mono transition-all"
          />
        </div>
      </div>

      <Button variant="primary" size="md" fullWidth onClick={check} loading={loading} id="port-check-btn">
        <Shield size={15} /> Check Port
      </Button>

      {error && <p className="text-sm text-red-400">{error}</p>}

      {loading && (
        <div className="flex items-center gap-3 p-4 bg-[var(--bg-elevated)] rounded-xl border border-[var(--border-subtle)]">
          <Loader2 size={16} className="text-orange-400 animate-spin" />
          <span className="text-sm text-[var(--text-secondary)]">
            Connecting to <span className="font-mono">{host}:{port}</span>…
          </span>
        </div>
      )}

      {result && !loading && (
        <div className={`p-5 rounded-xl border ${
          result.open
            ? "border-emerald-800/50 bg-emerald-900/10"
            : "border-red-800/50 bg-red-900/10"
        }`}>
          <div className="flex items-center gap-3 mb-2">
            {result.open
              ? <CheckCircle size={20} className="text-emerald-400" />
              : <XCircle size={20} className="text-red-400" />}
            <span className="font-bold text-[var(--text-primary)]">
              Port {result.port} is{" "}
              <span className={result.open ? "text-emerald-400" : "text-red-400"}>
                {result.open ? "OPEN" : "CLOSED"}
              </span>
            </span>
          </div>
          <p className="text-sm text-[var(--text-secondary)]">
            {result.open
              ? `Port ${result.port} on ${result.host} is accepting TCP connections.`
              : `Port ${result.port} on ${result.host} is closed or filtered by a firewall.`}
          </p>
        </div>
      )}

      {/* Common Ports Presets */}
      <div className="pt-2 border-t border-[var(--border-subtle)]">
        <p className="text-xs text-[var(--text-muted)] mb-2">Common ports:</p>
        <div className="flex flex-wrap gap-2">
          {COMMON_PORTS.map(({ port: p, name }) => (
            <button
              key={p}
              onClick={() => setPort(String(p))}
              className="text-xs px-2.5 py-1 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--brand-400)] hover:border-[var(--brand-800)] transition-all font-mono"
            >
              {p} <span className="opacity-60">({name})</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
