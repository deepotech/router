import { ShieldCheck, Compass, Database, Wrench } from "lucide-react";

export function WhyRouterViaSection() {
  const features = [
    {
      title: "Verified Router Login Information",
      description: "Our database contains verified admin login URLs, default IP addresses, and factory username/password combinations checked against manufacturer specifications.",
      icon: ShieldCheck,
      colorClass: "bg-emerald-950/60 border-emerald-800 text-emerald-300",
    },
    {
      title: "Step-by-Step Troubleshooting",
      description: "Get detailed, easy-to-follow diagnostic checklists for wireless disconnects, double NAT conflicts, yellow/red internet status lights, and DNS failures.",
      icon: Compass,
      colorClass: "bg-blue-950/60 border-blue-800 text-blue-300",
    },
    {
      title: "Updated Router Database",
      description: "We regularly update our database containing thousands of router models from major and minor brands, matching them to their dynamic firmware configurations.",
      icon: Database,
      colorClass: "bg-purple-950/60 border-purple-800 text-purple-300",
    },
    {
      title: "Networking Tools",
      description: "Diagnose connection issues instantly using our built-in web utilities: local/public IP checkers, DNS propagation trackers, port checkers, and subnet calculators.",
      icon: Wrench,
      colorClass: "bg-amber-950/60 border-amber-800 text-amber-300",
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-[var(--border-subtle)] bg-[var(--bg-elevated)]/10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold text-[var(--text-primary)] tracking-tight">
            Why RouterVia?
          </h2>
          <p className="text-[var(--text-secondary)] mt-3 text-lg">
            We simplify complex network configurations, diagnostic operations, and device troubleshooting.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className="glass-card p-8 hover:border-[var(--border-strong)] transition-all duration-300 flex gap-6"
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border ${feat.colorClass}`}>
                  <Icon size={26} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3">
                    {feat.title}
                  </h3>
                  <p className="text-[var(--text-secondary)] leading-relaxed text-sm">
                    {feat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
