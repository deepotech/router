import type { MetadataRoute } from "next";
import { APP_URL, ROUTER_BRANDS, COMMON_IPS } from "@/lib/constants";

// =============================================================
// Root Sitemap — static + high-priority pages
// Dynamic router/problem/IP pages are handled by their own
// sitemap.ts files inside each route segment
// =============================================================

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: APP_URL,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${APP_URL}/routers`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${APP_URL}/problems`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${APP_URL}/tools`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${APP_URL}/assistant`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  const brandPages: MetadataRoute.Sitemap = ROUTER_BRANDS.map((brand) => ({
    url: `${APP_URL}/routers/${brand.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  const ipPages: MetadataRoute.Sitemap = COMMON_IPS.map((ip) => ({
    url: `${APP_URL}/ips/${ip.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const toolPages: MetadataRoute.Sitemap = [
    "ip-checker",
    "dns-checker",
    "ping-test",
    "speed-test",
    "port-checker",
    "wifi-qr",
    "password-generator",
  ].map((tool) => ({
    url: `${APP_URL}/tools/${tool}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...brandPages, ...ipPages, ...toolPages];
}
