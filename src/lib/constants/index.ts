// =============================================================
// APP-WIDE CONSTANTS
// =============================================================

export const APP_NAME = "RouterVia";
export const APP_DESCRIPTION =
  "AI-powered router troubleshooting and networking platform. Fix WiFi issues, configure routers, and diagnose network problems instantly.";
export const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL || "https://routervia.com";

export const SUPPORTED_LOCALES = ["en", "ar", "fr"] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];
export const DEFAULT_LOCALE: SupportedLocale = "en";

// SEO
export const SITE_TITLE_TEMPLATE = `%s | ${APP_NAME}`;
export const OG_IMAGE_DEFAULT = `${APP_URL}/images/og-default.png`;

// Pagination
export const ROUTERS_PER_PAGE = 24;
export const PROBLEMS_PER_PAGE = 20;
export const SITEMAP_CHUNK_SIZE = 1000; // URLs per sitemap file

// Router brands (used for seeding + static generation)
export const ROUTER_BRANDS = [
  { name: "TP-Link", slug: "tp-link" },
  { name: "Huawei", slug: "huawei" },
  { name: "ZTE", slug: "zte" },
  { name: "D-Link", slug: "d-link" },
  { name: "ASUS", slug: "asus" },
  { name: "Netgear", slug: "netgear" },
  { name: "Linksys", slug: "linksys" },
  { name: "Xiaomi", slug: "xiaomi" },
  { name: "Tenda", slug: "tenda" },
  { name: "Mercusys", slug: "mercusys" },
] as const;

// Common IP addresses (used for sitemap + static generation)
export const COMMON_IPS = [
  { address: "192.168.1.1",   slug: "192-168-1-1"   },
  { address: "192.168.0.1",   slug: "192-168-0-1"   },
  { address: "192.168.1.254", slug: "192-168-1-254" },
  { address: "192.168.0.254", slug: "192-168-0-254" },
  { address: "10.0.0.1",      slug: "10-0-0-1"      },
  { address: "10.0.0.138",    slug: "10-0-0-138"    },
  { address: "192.168.8.1",   slug: "192-168-8-1"   },
  { address: "192.168.100.1", slug: "192-168-100-1" },
  // Additional high-traffic IPs with static guide pages
  { address: "192.168.50.1",  slug: "192-168-50-1"  },  // ASUS
  { address: "192.168.31.1",  slug: "192-168-31-1"  },  // Xiaomi Mi Router
  { address: "192.168.3.1",   slug: "192-168-3-1"   },  // Huawei HiLink
] as const;

// Problem categories
export const PROBLEM_CATEGORIES = {
  WIFI: "WiFi Issues",
  DNS: "DNS Problems",
  SPEED: "Slow Internet",
  CONNECTION: "Connection Issues",
  SECURITY: "Security",
  HARDWARE: "Hardware",
  OTHER: "Other",
} as const;
