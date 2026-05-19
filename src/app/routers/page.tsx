import type { Metadata } from "next";
import Link from "next/link";
import { Wifi, ChevronRight } from "lucide-react";
import { RouterService } from "@/server/services/router.service";
import { buildMetadata } from "@/lib/seo/metadata";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import { JsonLd, buildBreadcrumbSchema } from "@/lib/seo/schema";
import { APP_URL } from "@/lib/constants";

export const metadata: Metadata = buildMetadata({
  title: "Router Brands — Login Pages, Default Passwords & Setup Guides",
  description:
    "Browse all router brands. Find default login IP addresses, usernames, passwords, and complete setup guides for TP-Link, Huawei, ZTE, D-Link, ASUS, Netgear and more.",
  canonical: "/routers",
});

// ISR — revalidate every 24 hours
export const revalidate = 86400;

export default async function RoutersPage() {
  const brands = await RouterService.getAllBrands();

  const breadcrumbs = [{ label: "Routers", href: "/routers" }];

  return (
    <>
      <JsonLd
        data={buildBreadcrumbSchema(
          [{ label: "Home", href: "/" }, ...breadcrumbs],
          APP_URL
        )}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumb */}
        <Breadcrumb items={breadcrumbs} className="mb-8" />

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] mb-3">
            Router Brands
          </h1>
          <p className="text-[var(--text-secondary)] max-w-2xl">
            Select your router brand to find the default login IP, username,
            password, setup guides, and FAQs for every model.
          </p>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {brands.map((brand, i) => (
            <Link
              key={brand.slug}
              href={`/routers/${brand.slug}`}
              className={`glass-card p-6 flex items-center gap-5 hover:border-[var(--border-strong)] hover:bg-[var(--bg-hover)] hover:-translate-y-0.5 transition-all duration-[var(--transition-base)] group animate-fade-in-up stagger-${Math.min(i + 1, 6)}`}
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-[var(--brand-900)] border border-[var(--brand-800)] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-[var(--transition-fast)]">
                <Wifi
                  size={24}
                  className="text-[var(--brand-400)]"
                  aria-hidden="true"
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h2 className="text-base font-bold text-[var(--text-primary)] mb-1">
                  {brand.name}
                </h2>
                {brand.description && (
                  <p className="text-xs text-[var(--text-muted)] line-clamp-2">
                    {brand.description}
                  </p>
                )}
                <div className="mt-2">
                  <Badge variant="default" size="sm">
                    {brand.modelCount ?? 0} models
                  </Badge>
                </div>
              </div>

              <ChevronRight
                size={18}
                className="text-[var(--text-muted)] group-hover:text-[var(--brand-400)] group-hover:translate-x-0.5 transition-all flex-shrink-0"
                aria-hidden="true"
              />
            </Link>
          ))}
        </div>

        {/* SEO Paragraph */}
        <div className="mt-16 glass-card p-8 prose-dark">
          <h2>Find Your Router&apos;s Admin Page</h2>
          <p>
            Every router has an admin panel accessible through a web browser.
            Most routers use a default IP address like{" "}
            <Link href="/ips/192-168-1-1" className="text-[var(--brand-400)] hover:underline">
              192.168.1.1
            </Link>{" "}
            or{" "}
            <Link href="/ips/192-168-0-1" className="text-[var(--brand-400)] hover:underline">
              192.168.0.1
            </Link>{" "}
            as the gateway. Select your brand above to find the exact login
            address and default credentials for your specific model.
          </p>
        </div>
      </div>
    </>
  );
}
