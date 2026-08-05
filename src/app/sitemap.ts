import type { MetadataRoute } from "next";
import { APP_URL } from "@/lib/constants";
import { prisma } from "@/server/db/prisma";
import { hasDatabase } from "@/lib/server/env-safe";

// =============================================================
// Dynamic Root Sitemap — Complete Production URL Catalog
// =============================================================

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: APP_URL, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { url: `${APP_URL}/routers`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${APP_URL}/ips`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${APP_URL}/problems`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${APP_URL}/dns`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${APP_URL}/router-login`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${APP_URL}/router-password`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${APP_URL}/router-reset`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${APP_URL}/router-login-hostnames`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${APP_URL}/routerlogin.net`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${APP_URL}/routerlogin.net-not-working`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${APP_URL}/tplinkwifi.net`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${APP_URL}/tplinkwifi.net-not-working`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${APP_URL}/routerlogin.com-not-working`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${APP_URL}/mywifiext.net-not-working`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${APP_URL}/orbilogin.com-not-working`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${APP_URL}/netgear-default-password`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${APP_URL}/tp-link-default-password`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${APP_URL}/asus-default-password`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${APP_URL}/linksys-default-password`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${APP_URL}/d-link-default-password`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${APP_URL}/router-login-recovery`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${APP_URL}/router-cannot-access-settings`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${APP_URL}/router-web-interface-not-opening`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${APP_URL}/router-login-page-not-loading`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${APP_URL}/router-ip-conflict`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${APP_URL}/router-no-internet-after-login`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${APP_URL}/router-firmware-update-guide`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${APP_URL}/change-wifi-password`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${APP_URL}/default-gateway-not-available`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${APP_URL}/dns-server-not-responding`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${APP_URL}/dns-probe-finished-no-internet`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${APP_URL}/internet-connected-no-access`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${APP_URL}/internet-keeps-dropping`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${APP_URL}/router-keeps-disconnecting`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${APP_URL}/router-keeps-restarting`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${APP_URL}/router-blinking-orange`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${APP_URL}/modem-online-light-blinking`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${APP_URL}/asus-router-red-light`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${APP_URL}/asus-router-keeps-restarting`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${APP_URL}/tp-link-router-keeps-disconnecting`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${APP_URL}/tp-link-login-not-working`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${APP_URL}/tp-link-router-login`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${APP_URL}/netgear-router-login`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${APP_URL}/double-nat-detected`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${APP_URL}/router-not-detecting-wan`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${APP_URL}/router-not-assigning-ip-addresses`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${APP_URL}/port-forwarding-guide`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${APP_URL}/port-forwarding-not-working`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${APP_URL}/minecraft-port-forwarding`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${APP_URL}/how-to-find-router-ip-address`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${APP_URL}/how-to-see-who-is-on-my-wifi`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${APP_URL}/block-device-on-router`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${APP_URL}/guest-wifi-setup`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${APP_URL}/secure-router-after-setup`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${APP_URL}/wpa3-vs-wpa2`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${APP_URL}/wifi-security`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${APP_URL}/best-wifi-routers`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${APP_URL}/best-mesh-wifi`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${APP_URL}/best-router-for-gaming`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${APP_URL}/best-mesh-wifi-for-gaming`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${APP_URL}/mesh-wifi-setup`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${APP_URL}/wifi-extender-vs-mesh`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${APP_URL}/how-to-improve-wifi-signal`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${APP_URL}/why-is-my-router-so-slow`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${APP_URL}/how-to-speed-up-internet`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${APP_URL}/slow-wifi-after-update`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${APP_URL}/best-dns-servers`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${APP_URL}/best-dns-for-gaming`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${APP_URL}/best-dns-for-ps5`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${APP_URL}/best-dns-for-xbox`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${APP_URL}/best-dns-for-faster-internet`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${APP_URL}/how-to-change-dns-on-router`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${APP_URL}/how-to-flush-dns-cache`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${APP_URL}/what-is-dns`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${APP_URL}/gaming-router-vs-normal-router`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${APP_URL}/gaming-switch-vs-router`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${APP_URL}/gaming-network-optimization`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${APP_URL}/best-router-settings-for-gaming`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${APP_URL}/best-qos-settings-for-gaming`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${APP_URL}/ethernet-vs-wifi-gaming`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${APP_URL}/cat6-vs-cat8-for-gaming`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${APP_URL}/powerline-adapter-for-gaming`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${APP_URL}/wifi-6-for-gaming`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${APP_URL}/wifi-7-for-gaming`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${APP_URL}/gaming-lag-spikes-fix`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${APP_URL}/high-ping-fix`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${APP_URL}/gaming-packet-loss-fix`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${APP_URL}/how-to-fix-packet-loss`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${APP_URL}/gaming-jitter-fix`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${APP_URL}/bufferbloat-fix`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${APP_URL}/open-nat-type`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${APP_URL}/nat-type-strict`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${APP_URL}/ps5-nat-type-fix`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${APP_URL}/xbox-nat-type-open`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${APP_URL}/wifi-keeps-disconnecting`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${APP_URL}/ethernet-slower-than-wifi`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${APP_URL}/wifi-connected-but-no-internet-phone`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${APP_URL}/huawei-router-login`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${APP_URL}/huawei-router-default-password`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${APP_URL}/huawei-router-ip-address`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${APP_URL}/huawei-hg8145v5-default-password`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${APP_URL}/huawei-ax3-default-password`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${APP_URL}/best-secure-dns-servers`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${APP_URL}/google-dns-vs-cloudflare`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${APP_URL}/packet-loss-for-gaming`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${APP_URL}/wifi-packet-loss`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${APP_URL}/ethernet-packet-loss`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${APP_URL}/disclaimer`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${APP_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${APP_URL}/privacy-policy`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${APP_URL}/terms-of-service`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${APP_URL}/editorial-policy`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ];

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

  if (!hasDatabase) {
    return [...staticPages, ...toolPages];
  }

  try {
    // 1. Dynamic Brands
    const brands = await prisma.brand.findMany({ select: { slug: true, updatedAt: true } });
    const brandPages: MetadataRoute.Sitemap = brands.map((b) => ({
      url: `${APP_URL}/routers/${b.slug}`,
      lastModified: b.updatedAt || now,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    }));

    // 2. Dynamic Router Models (Main page + Setup + Reset)
    const routers = await prisma.routerModel.findMany({
      where: { isPublished: true, status: "PUBLISHED" },
      select: { slug: true, updatedAt: true, brand: { select: { slug: true } } },
    });

    const routerPages: MetadataRoute.Sitemap = [];
    for (const r of routers) {
      if (!r.brand?.slug || !r.slug) continue;
      const baseUrl = `${APP_URL}/routers/${r.brand.slug}/${r.slug}`;
      const lastMod = r.updatedAt || now;

      routerPages.push({ url: baseUrl, lastModified: lastMod, changeFrequency: "weekly", priority: 0.8 });
      routerPages.push({ url: `${baseUrl}/setup`, lastModified: lastMod, changeFrequency: "weekly", priority: 0.75 });
      routerPages.push({ url: `${baseUrl}/reset`, lastModified: lastMod, changeFrequency: "weekly", priority: 0.75 });
    }

    // 3. Dynamic Problems
    const problems = await prisma.problem.findMany({
      where: { status: "PUBLISHED", isPublished: true },
      select: { slug: true, updatedAt: true },
    });

    const problemPages: MetadataRoute.Sitemap = problems.map((p) => ({
      url: `${APP_URL}/problems/${p.slug}`,
      lastModified: p.updatedAt || now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

    // 4. Dynamic IPs
    const ips = await prisma.ipAddress.findMany({
      where: { status: "PUBLISHED", isPublished: true },
      select: { slug: true, updatedAt: true },
    });

    const ipPages: MetadataRoute.Sitemap = ips.map((ip) => ({
      url: `${APP_URL}/ips/${ip.slug}`,
      lastModified: ip.updatedAt || now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));

    return [
      ...staticPages,
      ...toolPages,
      ...brandPages,
      ...routerPages,
      ...problemPages,
      ...ipPages,
    ];
  } catch (error) {
    console.error("[Sitemap] Failed to fetch dynamic database routes:", error);
    return [...staticPages, ...toolPages];
  }
}
