import Link from "next/link";
import { Server, Shield, Key, HelpCircle, ArrowRight } from "lucide-react";

interface BrandInfo {
  name: string;
  slug: string;
  initials: string;
  gradient: string;
  setupUrl: string;
  ipUrl: string;
  ipLabel: string;
  passUrl: string;
  troubleUrl: string;
}

const BRANDS: BrandInfo[] = [
  {
    name: "TP-Link",
    slug: "tp-link",
    initials: "TP",
    gradient: "from-teal-600 to-emerald-600",
    setupUrl: "/tp-link-router-login",
    ipUrl: "/tplinkwifi.net",
    ipLabel: "192.168.0.1",
    passUrl: "/tp-link-default-password",
    troubleUrl: "/tp-link-login-not-working",
  },
  {
    name: "ASUS",
    slug: "asus",
    initials: "AS",
    gradient: "from-blue-600 to-indigo-600",
    setupUrl: "/routers/asus",
    ipUrl: "/ips/192-168-50-1",
    ipLabel: "192.168.50.1",
    passUrl: "/asus-default-password",
    troubleUrl: "/asus-router-red-light",
  },
  {
    name: "Netgear",
    slug: "netgear",
    initials: "NG",
    gradient: "from-purple-600 to-pink-600",
    setupUrl: "/netgear-router-login",
    ipUrl: "/routerlogin.net",
    ipLabel: "192.168.1.1",
    passUrl: "/netgear-default-password",
    troubleUrl: "/routerlogin.com-not-working",
  },
  {
    name: "Huawei",
    slug: "huawei",
    initials: "HW",
    gradient: "from-red-600 to-orange-600",
    setupUrl: "/huawei-router-login",
    ipUrl: "/huawei-router-ip-address",
    ipLabel: "192.168.8.1",
    passUrl: "/huawei-router-default-password",
    troubleUrl: "/routers/huawei",
  },
  {
    name: "D-Link",
    slug: "d-link",
    initials: "DL",
    gradient: "from-cyan-600 to-blue-600",
    setupUrl: "/routers/d-link",
    ipUrl: "/ips/192-168-0-1",
    ipLabel: "192.168.0.1",
    passUrl: "/d-link-default-password",
    troubleUrl: "/routers/d-link",
  },
  {
    name: "Linksys",
    slug: "linksys",
    initials: "LS",
    gradient: "from-blue-700 to-sky-500",
    setupUrl: "/routers/linksys",
    ipUrl: "/ips/192-168-1-1",
    ipLabel: "192.168.1.1",
    passUrl: "/linksys-default-password",
    troubleUrl: "/routers/linksys",
  },
  {
    name: "Cisco",
    slug: "cisco",
    initials: "CS",
    gradient: "from-indigo-700 to-blue-500",
    setupUrl: "/routers/cisco",
    ipUrl: "/ips/192-168-1-1",
    ipLabel: "192.168.1.1",
    passUrl: "/routers/cisco",
    troubleUrl: "/routers/cisco",
  },
  {
    name: "Arris",
    slug: "arris",
    initials: "AR",
    gradient: "from-amber-600 to-orange-600",
    setupUrl: "/routers/arris",
    ipUrl: "/ips/192-168-0-1",
    ipLabel: "192.168.0.1",
    passUrl: "/routers/arris",
    troubleUrl: "/routers/arris",
  },
  {
    name: "Tenda",
    slug: "tenda",
    initials: "TD",
    gradient: "from-orange-500 to-yellow-500",
    setupUrl: "/routers/tenda",
    ipUrl: "/ips/192-168-0-1",
    ipLabel: "192.168.0.1",
    passUrl: "/routers/tenda",
    troubleUrl: "/routers/tenda",
  },
  {
    name: "Mercusys",
    slug: "mercusys",
    initials: "MC",
    gradient: "from-red-500 to-rose-600",
    setupUrl: "/routers/mercusys",
    ipUrl: "/ips/192-168-1-1",
    ipLabel: "192.168.1.1",
    passUrl: "/routers/mercusys",
    troubleUrl: "/routers/mercusys",
  },
  {
    name: "Xiaomi",
    slug: "xiaomi",
    initials: "XM",
    gradient: "from-orange-600 to-rose-500",
    setupUrl: "/routers/xiaomi",
    ipUrl: "/ips/192-168-31-1",
    ipLabel: "192.168.31.1",
    passUrl: "/routers/xiaomi",
    troubleUrl: "/routers/xiaomi",
  },
  {
    name: "Belkin",
    slug: "belkin",
    initials: "BK",
    gradient: "from-emerald-600 to-teal-500",
    setupUrl: "/routers/belkin",
    ipUrl: "/ips/192-168-2-1",
    ipLabel: "192.168.2.1",
    passUrl: "/routers/belkin",
    troubleUrl: "/routers/belkin",
  },
];

export function PopularBrandsSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-[var(--border-subtle)] bg-[var(--bg-elevated)]/20">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-extrabold text-[var(--text-primary)] tracking-tight">
              Popular Router Brands
            </h2>
            <p className="text-[var(--text-secondary)] mt-2">
              Select a brand to find login pages, default passwords, setup guides, and troubleshooting steps.
            </p>
          </div>
          <Link
            href="/routers"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--brand-400)] hover:text-[var(--brand-300)] hover:underline transition-colors"
          >
            All Brands <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {BRANDS.map((brand) => (
            <div
              key={brand.slug}
              className="glass-card p-6 flex flex-col justify-between hover:border-[var(--brand-500)] hover:-translate-y-1 transition-all duration-300 group"
            >
              <div>
                <div className="flex items-center gap-4 mb-5">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${brand.gradient} flex items-center justify-center text-white font-bold text-lg shadow-md`}
                  >
                    {brand.initials}
                  </div>
                  <div>
                    <Link href={`/routers/${brand.slug}`} className="hover:underline">
                      <h3 className="text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--brand-400)] transition-colors">
                        {brand.name}
                      </h3>
                    </Link>
                    <span className="text-xs text-[var(--text-muted)]">Default Configuration</span>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[var(--text-muted)] flex items-center gap-1.5">
                      <Server size={14} /> Setup:
                    </span>
                    <Link
                      href={brand.setupUrl}
                      className="text-[var(--brand-400)] hover:underline font-medium text-xs truncate max-w-[150px]"
                    >
                      Login Page
                    </Link>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[var(--text-muted)] flex items-center gap-1.5">
                      <Shield size={14} /> Default IP:
                    </span>
                    <Link
                      href={brand.ipUrl}
                      className="text-[var(--brand-400)] hover:underline font-mono text-xs"
                    >
                      {brand.ipLabel}
                    </Link>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[var(--text-muted)] flex items-center gap-1.5">
                      <Key size={14} /> Password:
                    </span>
                    <Link
                      href={brand.passUrl}
                      className="text-[var(--brand-400)] hover:underline font-medium text-xs"
                    >
                      Admin Passwords
                    </Link>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[var(--text-muted)] flex items-center gap-1.5">
                      <HelpCircle size={14} /> Support:
                    </span>
                    <Link
                      href={brand.troubleUrl}
                      className="text-[var(--brand-400)] hover:underline font-medium text-xs"
                    >
                      Troubleshooting
                    </Link>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[var(--border-subtle)]">
                <Link
                  href={`/routers/${brand.slug}`}
                  className="text-xs font-semibold text-[var(--text-secondary)] group-hover:text-[var(--brand-400)] flex items-center justify-between"
                >
                  <span>View all {brand.name} models</span>
                  <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
