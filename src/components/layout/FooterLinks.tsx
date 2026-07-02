import Link from "next/link";

interface LinkItem {
  label: string;
  href: string;
}

interface FooterLinksProps {
  footerLinks: Record<string, LinkItem[]>;
}

export function FooterLinks({ footerLinks }: FooterLinksProps) {
  // Column definitions for desktop
  const desktopColumns = [
    {
      categories: ["Routers", "Mesh WiFi", "Commercial Guides"],
    },
    {
      categories: ["Common IPs", "Router Login", "Legal & Trust"],
    },
    {
      categories: ["Tools", "Network & IP", "DNS Guides"],
    },
    {
      categories: ["Gaming Net"], // Has 25 links - will get Show More details block
    },
    {
      categories: ["Router Problems", "Internet Fixes", "WiFi Security", "Troubleshooting"],
    },
  ];

  return (
    <div className="w-full">
      {/* DESKTOP LAYOUT (5 columns, visible on md and up) */}
      <div className="hidden md:grid md:grid-cols-5 gap-8 lg:gap-10">
        {desktopColumns.map((col, colIdx) => (
          <div key={colIdx} className="space-y-8">
            {col.categories.map((category) => {
              const links = footerLinks[category] || [];
              const isGamingNet = category === "Gaming Net";

              return (
                <div key={category}>
                  <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4">
                    {category}
                  </h3>
                  
                  {isGamingNet ? (
                    <div className="space-y-2.5">
                      {/* Show first 6 links */}
                      {links.slice(0, 6).map((link) => (
                        <div key={link.href}>
                          <Link
                            href={link.href}
                            className="text-sm text-[var(--text-muted)] hover:text-[var(--brand-400)] transition-colors duration-[var(--transition-fast)]"
                          >
                            {link.label}
                          </Link>
                        </div>
                      ))}
                      
                      {/* Hide rest under details summary */}
                      <details className="group">
                        <summary className="text-xs text-[var(--brand-400)] hover:text-[var(--brand-300)] hover:underline cursor-pointer list-none select-none font-semibold focus:outline-none py-1 flex items-center gap-1">
                          <span className="group-open:hidden">Show More (+{links.length - 6})</span>
                          <span className="hidden group-open:inline">Show Less</span>
                        </summary>
                        <div className="space-y-2.5 pt-2.5">
                          {links.slice(6).map((link) => (
                            <div key={link.href}>
                              <Link
                                href={link.href}
                                className="text-sm text-[var(--text-muted)] hover:text-[var(--brand-400)] transition-colors duration-[var(--transition-fast)]"
                              >
                                {link.label}
                              </Link>
                            </div>
                          ))}
                        </div>
                      </details>
                    </div>
                  ) : (
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
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* MOBILE LAYOUT (Accordion list, visible on small viewports) */}
      <div className="md:hidden space-y-3">
        {Object.entries(footerLinks).map(([category, links]) => {
          return (
            <details
              key={category}
              className="group border-b border-[var(--border-subtle)] pb-3"
            >
              <summary className="flex items-center justify-between text-sm font-semibold text-[var(--text-primary)] cursor-pointer list-none select-none py-2 focus:outline-none">
                <span>{category}</span>
                <span className="text-[var(--text-muted)] text-xs transform group-open:rotate-180 transition-transform duration-200">
                  ▼
                </span>
              </summary>
              <ul className="space-y-3 pt-3 pl-2 border-l border-[var(--border-subtle)]">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[var(--text-secondary)] hover:text-[var(--brand-400)] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
          );
        })}
      </div>
    </div>
  );
}
