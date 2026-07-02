import Link from "next/link";
import { Search, LogIn, Key, LifeBuoy, Wrench, ChevronRight } from "lucide-react";

export function StartHereSection() {
  const steps = [
    {
      step: "01",
      title: "Find Your Router",
      description: "Search our database for your specific brand and model's default login settings.",
      href: "/routers",
      icon: Search,
    },
    {
      step: "02",
      title: "Router Login",
      description: "Learn how to access your router setup page with default credentials.",
      href: "/router-login",
      icon: LogIn,
    },
    {
      step: "03",
      title: "Router Password",
      description: "Find the default administrator username and password combinations.",
      href: "/router-password",
      icon: Key,
    },
    {
      step: "04",
      title: "Router Recovery",
      description: "How to perform a factory reset if you are locked out of admin settings.",
      href: "/router-login-recovery",
      icon: LifeBuoy,
    },
    {
      step: "05",
      title: "Troubleshooting",
      description: "Diagnose and fix Wi-Fi issues, slow internet, and connection drops.",
      href: "/problems",
      icon: Wrench,
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-[var(--border-subtle)] bg-[var(--bg-elevated)]/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] tracking-tight">
            New to Router Configuration? Start Here
          </h2>
          <p className="text-sm text-[var(--text-secondary)] mt-2">
            Follow our core guides to master router settings, credentials, and diagnostics.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <Link
                key={step.step}
                href={step.href}
                className="glass-card p-6 hover:border-[var(--brand-500)] transition-all duration-300 flex flex-col justify-between group relative"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-2xl font-black text-[var(--text-muted)] group-hover:text-[var(--brand-500)] transition-colors">
                      {step.step}
                    </span>
                    <div className="w-10 h-10 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-secondary)] group-hover:text-[var(--brand-400)] transition-colors">
                      <Icon size={18} />
                    </div>
                  </div>
                  <h3 className="font-bold text-[var(--text-primary)] group-hover:text-[var(--brand-400)] transition-colors mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    {step.description}
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-1 text-xs font-semibold text-[var(--brand-400)] opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more <ChevronRight size={12} />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
