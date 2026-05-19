import type { Metadata } from "next";
import { APP_NAME, APP_URL, OG_IMAGE_DEFAULT } from "@/lib/constants";

// =============================================================
// Metadata factory helpers
// =============================================================

interface BuildMetadataOptions {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  noIndex?: boolean;
  keywords?: string[];
}

/**
 * Builds a fully-typed Next.js Metadata object.
 * Use in generateMetadata() functions across all pages.
 */
export function buildMetadata({
  title,
  description,
  canonical,
  ogImage = OG_IMAGE_DEFAULT,
  noIndex = false,
  keywords = [],
}: BuildMetadataOptions): Metadata {
  const resolvedCanonical = canonical
    ? `${APP_URL}${canonical}`
    : APP_URL;

  return {
    title,
    description,
    keywords,
    authors: [{ name: APP_NAME }],
    creator: APP_NAME,
    publisher: APP_NAME,
    metadataBase: new URL(APP_URL),
    alternates: {
      canonical: resolvedCanonical,
    },
    openGraph: {
      title,
      description,
      url: resolvedCanonical,
      siteName: APP_NAME,
      locale: "en_US",
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
  };
}

/**
 * Builds metadata for a router model page.
 */
export function buildRouterMetadata(data: {
  brandName: string;
  brandSlug: string;
  modelName: string;
  modelSlug: string;
  loginIp: string;
}) {
  const title = `${data.brandName} ${data.modelName} Login — Default IP, Username & Password`;
  const description = `Access your ${data.brandName} ${data.modelName} router. Login at ${data.loginIp}, default username and password, setup guides, reset instructions and FAQs.`;
  return buildMetadata({
    title,
    description,
    canonical: `/routers/${data.brandSlug}/${data.modelSlug}`,
    keywords: [
      `${data.brandName} ${data.modelName} login`,
      `${data.brandName} ${data.modelName} default password`,
      `${data.loginIp} login`,
      `${data.brandName} router setup`,
    ],
  });
}

/**
 * Builds metadata for an IP address page.
 */
export function buildIpMetadata(data: {
  ipAddress: string;
  ipSlug: string;
  brands: string[];
}) {
  const brandsStr = data.brands.slice(0, 3).join(", ");
  const title = `${data.ipAddress} — Router Login Admin Page`;
  const description = `Access your router admin page at ${data.ipAddress}. Used by ${brandsStr} and other routers. Default login credentials, setup guide and troubleshooting.`;
  return buildMetadata({
    title,
    description,
    canonical: `/ips/${data.ipSlug}`,
    keywords: [
      `${data.ipAddress}`,
      `${data.ipAddress} login`,
      `${data.ipAddress} admin`,
      `router admin ${data.ipAddress}`,
    ],
  });
}

/**
 * Builds metadata for a problem/troubleshooting page.
 */
export function buildProblemMetadata(data: {
  title: string;
  slug: string;
  excerpt: string;
}) {
  return buildMetadata({
    title: `${data.title} — How to Fix It`,
    description: data.excerpt,
    canonical: `/problems/${data.slug}`,
    keywords: [data.title, `fix ${data.title}`, "router troubleshooting"],
  });
}
