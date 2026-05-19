"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import {
  Wifi,
  Wrench,
  Bot,
  Menu,
  X,
  Globe,
  ChevronDown,
  Zap,
} from "lucide-react";
import { GlobalSearch } from "@/components/ui/GlobalSearch";

// =============================================================
// Header — sticky navigation
// =============================================================

const navLinks = [
  { href: "/routers", label: "Routers", icon: Wifi },
  { href: "/problems", label: "Fix Problems", icon: Wrench },
  { href: "/tools", label: "Tools", icon: Zap },
  { href: "/assistant", label: "AI Assistant", icon: Bot },
];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Blur backdrop */}
      <div className="absolute inset-0 bg-[var(--bg-base)]/80 backdrop-blur-xl border-b border-[var(--border-subtle)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group"
            aria-label="RouterVia — Home"
          >
            <div className="w-8 h-8 rounded-lg bg-[var(--brand-600)] flex items-center justify-center shadow-lg group-hover:shadow-[var(--shadow-glow)] transition-all duration-[var(--transition-base)]">
              <Wifi size={16} className="text-white" aria-hidden="true" />
            </div>
            <span className="font-bold text-[var(--text-primary)] text-lg">
              Router<span className="gradient-text">Via</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map(({ href, label, icon: Icon }) => {
              const active =
                pathname === href || pathname.startsWith(href + "/");
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-[var(--transition-fast)]",
                    active
                      ? "bg-[var(--brand-900)] text-[var(--brand-300)]"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]"
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  <Icon size={15} aria-hidden="true" />
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Search & CTA */}
          <div className="hidden md:flex items-center gap-4 flex-1 justify-end max-w-sm">
            <GlobalSearch className="w-full" />
            <Link href="/assistant">
              <Button variant="primary" size="sm">
                <Bot size={15} aria-hidden="true" />
                Ask AI
              </Button>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden relative border-t border-[var(--border-subtle)] bg-[var(--bg-surface)]/95 backdrop-blur-xl">
          <nav
            className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1"
            aria-label="Mobile navigation"
          >
            {navLinks.map(({ href, label, icon: Icon }) => {
              const active =
                pathname === href || pathname.startsWith(href + "/");
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                    active
                      ? "bg-[var(--brand-900)] text-[var(--brand-300)]"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]"
                  )}
                >
                  <Icon size={18} aria-hidden="true" />
                  {label}
                </Link>
              );
            })}
            <div className="pt-3 pb-1">
              <GlobalSearch />
            </div>
            <div className="pt-2 mt-2 border-t border-[var(--border-subtle)]">
              <Link href="/assistant" onClick={() => setMobileOpen(false)}>
                <Button variant="primary" size="md" fullWidth>
                  <Bot size={16} />
                  Ask AI Assistant
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
