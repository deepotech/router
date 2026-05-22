"use client";

import { useState } from "react";
import { Network } from "lucide-react";
import { Button } from "@/components/ui/Button";

// =============================================================
// Subnet Calculator Client — pure browser-side CIDR computation
// =============================================================

interface SubnetResult {
  input: string;
  network: string;
  broadcast: string;
  subnetMask: string;
  firstUsable: string;
  lastUsable: string;
  hosts: number;
  prefix: number;
  totalAddresses: number;
}

function intToIp(n: number): string {
  return [
    (n >>> 24) & 255,
    (n >>> 16) & 255,
    (n >>> 8) & 255,
    n & 255,
  ].join(".");
}

function calculate(cidr: string): SubnetResult | null {
  const match = cidr.trim().match(/^(\d{1,3}(?:\.\d{1,3}){3})\/(\d{1,2})$/);
  if (!match) return null;

  const parts = match[1].split(".").map(Number);
  if (parts.some((p) => p < 0 || p > 255)) return null;

  const prefix = parseInt(match[2], 10);
  if (prefix < 0 || prefix > 32) return null;

  const ipInt = ((parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3]) >>> 0;
  const mask = prefix === 0 ? 0 : ((~0 << (32 - prefix)) >>> 0);
  const networkInt = (ipInt & mask) >>> 0;
  const broadcastInt = (networkInt | (~mask >>> 0)) >>> 0;
  const totalAddresses = Math.pow(2, 32 - prefix);

  let firstUsable: number, lastUsable: number, hosts: number;
  if (prefix >= 31) {
    firstUsable = networkInt;
    lastUsable = broadcastInt;
    hosts = totalAddresses;
  } else {
    firstUsable = networkInt + 1;
    lastUsable = broadcastInt - 1;
    hosts = totalAddresses - 2;
  }

  return {
    input: cidr.trim(),
    network: intToIp(networkInt),
    broadcast: intToIp(broadcastInt),
    subnetMask: intToIp(mask),
    firstUsable: intToIp(firstUsable),
    lastUsable: intToIp(lastUsable),
    hosts: Math.max(0, hosts),
    prefix,
    totalAddresses,
  };
}

const EXAMPLES = ["192.168.1.0/24", "10.0.0.0/8", "172.16.0.0/16", "192.168.1.128/25"];

const RESULT_ROWS: { label: string; key: keyof SubnetResult }[] = [
  { label: "Network Address",    key: "network"       },
  { label: "Subnet Mask",        key: "subnetMask"    },
  { label: "Broadcast Address",  key: "broadcast"     },
  { label: "First Usable Host",  key: "firstUsable"   },
  { label: "Last Usable Host",   key: "lastUsable"    },
  { label: "Usable Hosts",       key: "hosts"         },
  { label: "Total Addresses",    key: "totalAddresses"},
  { label: "CIDR Prefix",        key: "prefix"        },
];

export default function SubnetCalculatorClient() {
  const [cidr, setCidr] = useState("");
  const [result, setResult] = useState<SubnetResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  function calculate_and_set() {
    const res = calculate(cidr);
    if (!res) {
      setError("Invalid CIDR — use format like 192.168.1.0/24");
      setResult(null);
    } else {
      setError(null);
      setResult(res);
    }
  }

  return (
    <div className="glass-card p-6 space-y-4 mb-6">
      {/* Input */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          id="subnet-cidr-input"
          type="text"
          value={cidr}
          onChange={(e) => setCidr(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && calculate_and_set()}
          placeholder="192.168.1.0/24"
          className="flex-1 px-4 py-2.5 bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-xl text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--brand-500)] focus:ring-1 focus:ring-[var(--brand-500)] text-sm transition-all font-mono"
        />
        <Button variant="primary" size="md" onClick={calculate_and_set} id="subnet-calc-btn">
          <Network size={15} /> Calculate
        </Button>
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      {result && (
        <div className="border border-[var(--border-subtle)] rounded-xl overflow-hidden">
          <div className="px-5 py-3 bg-[var(--bg-elevated)] border-b border-[var(--border-subtle)]">
            <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider">
              Results for <span className="font-mono text-[var(--brand-400)]">{result.input}</span>
            </p>
          </div>
          <div className="divide-y divide-[var(--border-subtle)]">
            {RESULT_ROWS.map(({ label, key }) => (
              <div key={key} className="flex items-center justify-between px-5 py-3">
                <dt className="text-sm text-[var(--text-muted)]">{label}</dt>
                <dd className="font-mono text-sm font-semibold text-[var(--text-primary)]">
                  {key === "prefix" ? `/${result[key]}` : String(result[key])}
                </dd>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Presets */}
      <div className="pt-2 border-t border-[var(--border-subtle)]">
        <p className="text-xs text-[var(--text-muted)] mb-2">Common subnets:</p>
        <div className="flex flex-wrap gap-2">
          {EXAMPLES.map((ex) => (
            <button
              key={ex}
              onClick={() => setCidr(ex)}
              className="text-xs px-2.5 py-1 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--brand-400)] hover:border-[var(--brand-800)] transition-all font-mono"
            >
              {ex}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
