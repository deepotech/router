import Link from "next/link";
import { Wifi, Globe } from "lucide-react";
import { APP_NAME } from "@/lib/constants";

// =============================================================
// Footer — server component
// =============================================================

const footerLinks = {
  Routers: [
    { label: "TP-Link", href: "/routers/tp-link" },
    { label: "Huawei", href: "/routers/huawei" },
    { label: "ZTE", href: "/routers/zte" },
    { label: "D-Link", href: "/routers/d-link" },
    { label: "ASUS", href: "/routers/asus" },
    { label: "All Brands", href: "/routers" },
  ],
  "Common IPs": [
    { label: "192.168.1.1", href: "/ips/192-168-1-1" },
    { label: "192.168.0.1", href: "/ips/192-168-0-1" },
    { label: "192.168.8.1", href: "/ips/192-168-8-1" },
    { label: "10.0.0.1", href: "/ips/10-0-0-1" },
  ],
  "Fix Problems": [
    {
      label: "WiFi Connected No Internet",
      href: "/problems/wifi-connected-no-internet",
    },
    { label: "Slow Internet", href: "/problems/slow-internet" },
    { label: "DNS Not Resolving", href: "/problems/dns-not-resolving" },
    { label: "All Problems", href: "/problems" },
  ],
  Tools: [
    { label: "IP Checker", href: "/tools/ip-checker" },
    { label: "DNS Checker", href: "/tools/dns-checker" },
    { label: "Speed Test", href: "/tools/speed-test" },
    { label: "WiFi QR Generator", href: "/tools/wifi-qr" },
    { label: "Password Generator", href: "/tools/password-generator" },
  ],
};

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Top Row */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[var(--brand-600)] flex items-center justify-center">
                <Wifi size={16} className="text-white" aria-hidden="true" />
              </div>
              <span className="font-bold text-[var(--text-primary)]">
                Router<span className="gradient-text">Via</span>
              </span>
            </Link>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              AI-powered router troubleshooting and networking platform. Fix any
              WiFi issue instantly.
            </p>
            <div className="flex items-center gap-3 mt-5">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="w-8 h-8 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--brand-400)] hover:border-[var(--brand-800)] transition-all duration-[var(--transition-fast)]"
              >
                <Globe size={14} aria-hidden="true" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-8 h-8 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--brand-400)] hover:border-[var(--brand-800)] transition-all duration-[var(--transition-fast)]"
              >
                <Globe size={14} aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4">
                {category}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[var(--text-muted)] hover:text-[var(--brand-400)] transition-colors duration-[var(--transition-fast)]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Row */}
        <div className="pt-8 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[var(--text-muted)]">
            © {year} {APP_NAME}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="https://twitter.com" className="text-[var(--text-muted)] hover:text-[#1DA1F2] transition-colors" aria-label="Twitter">
              <Globe size={20} />
            </a>
            <a href="https://github.com" className="text-[var(--text-muted)] hover:text-white transition-colors" aria-label="GitHub">
              <Globe size={20} />
            </a>
            <Link
              href="/privacy"
              className="text-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
