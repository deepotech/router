"use client";

import { useState, useCallback } from "react";
import { Lock, Copy, Check, RefreshCw, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/Button";

// =============================================================
// Password Generator Client — Cryptographically secure, client-side
// =============================================================

const CHARS = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()-_=+[]{}|;:,.<>?",
};

const DEFAULT_OPTS = { uppercase: true, lowercase: true, numbers: true, symbols: false };

function generatePassword(length: number, opts: typeof DEFAULT_OPTS): string {
  let charset = "";
  if (opts.uppercase) charset += CHARS.uppercase;
  if (opts.lowercase) charset += CHARS.lowercase;
  if (opts.numbers) charset += CHARS.numbers;
  if (opts.symbols) charset += CHARS.symbols;
  if (!charset) charset = CHARS.lowercase;

  const arr = new Uint32Array(length);
  crypto.getRandomValues(arr);
  return Array.from(arr)
    .map((n) => charset[n % charset.length])
    .join("");
}

function getStrength(pwd: string): { label: string; color: string; width: string } {
  let score = 0;
  if (pwd.length >= 12) score++;
  if (pwd.length >= 16) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^a-zA-Z0-9]/.test(pwd)) score++;
  if (score <= 1) return { label: "Weak", color: "bg-red-500", width: "w-1/4" };
  if (score <= 3) return { label: "Fair", color: "bg-amber-500", width: "w-2/4" };
  if (score === 4) return { label: "Strong", color: "bg-emerald-500", width: "w-3/4" };
  return { label: "Very Strong", color: "bg-emerald-400", width: "w-full" };
}

export default function PasswordGeneratorClient() {
  const [length, setLength] = useState(16);
  const [opts, setOpts] = useState(DEFAULT_OPTS);
  const [password, setPassword] = useState(() => generatePassword(16, DEFAULT_OPTS));
  const [show, setShow] = useState(false);
  const [copied, setCopied] = useState(false);

  const regenerate = useCallback(() => {
    setPassword(generatePassword(length, opts));
    setCopied(false);
  }, [length, opts]);

  async function copyPassword() {
    await navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const strength = getStrength(password);

  return (
    <div className="space-y-6">
      {/* Password Display */}
      <div className="relative">
        <div className="w-full px-4 py-4 bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-xl font-mono text-[var(--brand-400)] text-lg tracking-wider break-all pr-24">
          {show ? password : "•".repeat(password.length)}
        </div>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
          <button
            onClick={() => setShow(!show)}
            className="p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-all"
            aria-label={show ? "Hide password" : "Show password"}
          >
            {show ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
          <button
            onClick={copyPassword}
            className="p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--brand-400)] hover:bg-[var(--bg-hover)] transition-all"
            aria-label="Copy password"
          >
            {copied ? (
              <Check size={16} className="text-emerald-400" />
            ) : (
              <Copy size={16} />
            )}
          </button>
        </div>
      </div>

      {/* Strength Meter */}
      <div>
        <div className="flex justify-between text-xs mb-1.5">
          <span className="text-[var(--text-muted)]">Strength</span>
          <span
            className={`font-semibold ${
              strength.label === "Weak"
                ? "text-red-400"
                : strength.label === "Fair"
                ? "text-amber-400"
                : "text-emerald-400"
            }`}
          >
            {strength.label}
          </span>
        </div>
        <div className="h-1.5 bg-[var(--bg-elevated)] rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${strength.color} ${strength.width}`}
          />
        </div>
      </div>

      {/* Length Slider */}
      <div>
        <div className="flex justify-between text-xs mb-2">
          <span className="text-[var(--text-muted)]">Length</span>
          <span className="font-semibold text-[var(--text-primary)]">{length} characters</span>
        </div>
        <input
          type="range"
          min={8}
          max={64}
          value={length}
          onChange={(e) => {
            setLength(+e.target.value);
            regenerate();
          }}
          className="w-full accent-[var(--brand-500)]"
          aria-label="Password length"
        />
      </div>

      {/* Character Options */}
      <div className="grid grid-cols-2 gap-3">
        {(Object.keys(opts) as (keyof typeof opts)[]).map((key) => (
          <label key={key} className="flex items-center gap-2.5 cursor-pointer group">
            <input
              type="checkbox"
              checked={opts[key]}
              onChange={(e) => {
                setOpts((o) => ({ ...o, [key]: e.target.checked }));
                regenerate();
              }}
              className="w-4 h-4 rounded accent-[var(--brand-500)]"
            />
            <span className="text-sm text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors capitalize">
              {key}
            </span>
          </label>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button variant="primary" size="md" onClick={regenerate} className="flex-1" id="regen-password-btn">
          <RefreshCw size={15} /> Generate New
        </Button>
        <Button variant="secondary" size="md" onClick={copyPassword}>
          {copied ? <Check size={15} /> : <Copy size={15} />}
          {copied ? "Copied!" : "Copy"}
        </Button>
      </div>
    </div>
  );
}
