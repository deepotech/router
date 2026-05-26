import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import BrandIssueArticleShell from "@/components/tools/BrandIssueArticleShell";
import { getBrandIssueConfig } from "@/lib/config/brand-issues";
import { notFound } from "next/navigation";

const SLUG = "asus-router-keeps-restarting";

export const metadata: Metadata = (() => {
  const config = getBrandIssueConfig(SLUG);
  if (!config) return {};
  return buildMetadata({
    title: config.seo.title,
    description: config.seo.description,
    canonical: config.seo.canonical,
    keywords: config.seo.keywords,
  });
})();

export default function AsusRouterKeepsRestartingPage() {
  const config = getBrandIssueConfig(SLUG);
  if (!config) {
    notFound();
  }

  return <BrandIssueArticleShell config={config} />;
}
