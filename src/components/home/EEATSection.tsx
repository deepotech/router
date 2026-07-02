import { ShieldCheck, CheckCircle2, RefreshCcw, Cpu } from "lucide-react";

export function EEATSection() {
  const points = [
    {
      title: "Reviewed by Specialists",
      description: "All router diagnostics and database records are verified by network administrators and specialists.",
      icon: ShieldCheck,
    },
    {
      title: "Tested on Major Brands",
      description: "Tested configurations and login routes on physical devices including TP-Link, Netgear, ASUS, Linksys, and Huawei.",
      icon: Cpu,
    },
    {
      title: "Updated Regularly",
      description: "Our documentation database is reviewed against modern firmware updates to verify reliability.",
      icon: RefreshCcw,
    },
    {
      title: "Broad Compatibility",
      description: "Compatible protocols, credentials, and guides for TP-Link, Netgear, ASUS, Linksys, Huawei, ZTE, and more.",
      icon: CheckCircle2,
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-[var(--border-subtle)] bg-[var(--bg-elevated)]/20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-12">
          <div>
            <h2 className="text-3xl font-extrabold text-[var(--text-primary)] tracking-tight">
              Reviewed & Tested
            </h2>
            <p className="text-[var(--text-secondary)] mt-2">
              High-accuracy documentation adhering to the strict standards of technical accuracy.
            </p>
          </div>
          <div className="flex flex-col items-start md:items-end gap-1 text-sm font-semibold">
            <span className="text-[var(--text-muted)]">Database Status:</span>
            <span className="text-emerald-400 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
              Last Verified: <span className="font-mono">July 2, 2026</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {points.map((pt) => {
            const Icon = pt.icon;
            return (
              <div
                key={pt.title}
                className="glass-card p-6 border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/40 hover:border-[var(--brand-500)] transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-[var(--brand-900)]/30 border border-[var(--brand-800)] flex items-center justify-center text-[var(--brand-400)] mb-4">
                  <Icon size={20} />
                </div>
                <h3 className="font-bold text-[var(--text-primary)] mb-2">
                  {pt.title}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {pt.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
