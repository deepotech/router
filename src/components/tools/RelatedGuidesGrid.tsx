import Link from "next/link";
import { LogIn, Lock, RefreshCw, Settings, Shield, Server, Wifi, GitCompare, ShoppingBag } from "lucide-react";

export function RelatedGuidesGrid() {
  const guides = [
    {
      label: "Router Login",
      href: "/router-login",
      desc: "Step-by-step gateway admin panel access",
      icon: LogIn,
      color: "text-blue-400 border-blue-900/30 bg-blue-950/5",
    },
    {
      label: "Router Password",
      href: "/router-password",
      desc: "Manufacturer default credentials list",
      icon: Lock,
      color: "text-purple-400 border-purple-900/30 bg-purple-950/5",
    },
    {
      label: "Router Reset",
      href: "/router-reset",
      desc: "Factory default hardware restore guides",
      icon: RefreshCw,
      color: "text-orange-400 border-orange-900/30 bg-orange-950/5",
    },
    {
      label: "Router Settings",
      href: "/router-settings",
      desc: "Configure local network & gateway policy",
      icon: Settings,
      color: "text-amber-400 border-amber-900/30 bg-amber-950/5",
    },
    {
      label: "WiFi Security",
      href: "/wifi-security",
      desc: "Harden your wireless network parameters",
      icon: Shield,
      color: "text-emerald-400 border-emerald-900/30 bg-emerald-950/5",
    },
    {
      label: "DNS Guides",
      href: "/dns",
      desc: "Speed up and optimize domain resolvers",
      icon: Server,
      color: "text-cyan-400 border-cyan-900/30 bg-cyan-950/5",
    },
    {
      label: "Mesh WiFi",
      href: "/mesh-wifi",
      desc: "Configure whole-home wireless networks",
      icon: Wifi,
      color: "text-pink-400 border-pink-900/30 bg-pink-950/5",
    },
    {
      label: "Comparisons",
      href: "/compare",
      desc: "Compare network specs side-by-side",
      icon: GitCompare,
      color: "text-indigo-400 border-indigo-900/30 bg-indigo-950/5",
    },
    {
      label: "Buying Guides",
      href: "/best-wifi-routers",
      desc: "Top home and gaming routers analyzed",
      icon: ShoppingBag,
      color: "text-teal-400 border-teal-900/30 bg-teal-950/5",
    },
  ];

  return (
    <section className="mt-12 border-t border-[var(--border-subtle)] pt-10">
      <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">Network Administration Hub</h2>
      <p className="text-xs text-[var(--text-muted)] mb-6">Explore our engineering-grade manuals and resources to customize your home gateway settings.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {guides.map((g) => {
          const Icon = g.icon;
          return (
            <Link
              key={g.href}
              href={g.href}
              className={`glass-card p-5 flex gap-4 border ${g.color} hover:border-[var(--brand-500)] hover:bg-[var(--bg-hover)] transition-all duration-200 hover:-translate-y-0.5 group`}
            >
              <div className="shrink-0 mt-0.5 p-2 bg-[var(--bg-surface)] rounded-xl border border-[var(--border-subtle)] group-hover:border-[var(--brand-500)]/30 transition-all">
                <Icon size={18} className="text-[var(--text-primary)] group-hover:text-[var(--brand-400)] transition-colors animate-pulse-slow" />
              </div>
              <div>
                <span className="block font-bold text-sm text-[var(--text-primary)] group-hover:text-[var(--brand-400)] transition-colors mb-0.5">
                  {g.label}
                </span>
                <span className="block text-[11px] text-[var(--text-muted)] leading-normal">
                  {g.desc}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
