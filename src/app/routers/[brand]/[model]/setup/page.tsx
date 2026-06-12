import { notFound } from "next/navigation";
import { Settings } from "lucide-react";
import { RouterService } from "@/server/services/router.service";
import { JsonLd, buildHowToSchema } from "@/lib/seo/schema";
import { APP_URL } from "@/lib/constants";
import type { Metadata } from "next";
import { AISnapshotSchemaService } from "@/server/services/ai-snapshot-schema.service";
import { RetrievalAnswerBlock } from "@/components/retrieval/RetrievalAnswerBlock";
import { IntentBreadcrumbs } from "@/components/retrieval/IntentBreadcrumbs";
import { PeopleAlsoResolve } from "@/components/retrieval/PeopleAlsoResolve";
import { RetrievalExplanation } from "@/components/retrieval/RetrievalExplanation";

type Props = { params: Promise<{ brand: string; model: string }> };

export const revalidate = 86400;

import { hasDatabase } from "@/lib/server/env-safe";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (!hasDatabase) return {};
  const { brand: brandSlug, model: modelSlug } = await params;
  let routerModel;
  try {
    routerModel = await RouterService.getModel(brandSlug, modelSlug);
  } catch {
    return {};
  }
  if (!routerModel || !routerModel.brand) return {};
  return {
    title: `${routerModel.brand.name} ${routerModel.name} WiFi Setup & Configuration`,
    description: `Learn how to configure your ${routerModel.brand.name} ${routerModel.name} router, change the WiFi password, and set up your wireless network securely.`,
    alternates: {
      canonical: `${APP_URL}/routers/${brandSlug}/${modelSlug}/setup`,
    },
  };
}

export default async function RouterSetupGuidePage({ params }: Props) {
  const { brand: brandSlug, model: modelSlug } = await params;
  if (!hasDatabase) notFound();
  let routerModel;
  try {
    routerModel = await RouterService.getModel(brandSlug, modelSlug);
  } catch {
    notFound();
  }
  if (!routerModel || !routerModel.brand) notFound();

  const brandName = routerModel.brand.name;

  const howToSchema = buildHowToSchema(
    `How to setup WiFi on the ${brandName} ${routerModel.name}`,
    `Step-by-step guide to configuring your wireless network and changing the WiFi password.`,
    [
      { title: "Login to admin panel", description: "Access the router admin panel using the default IP and credentials." },
      { title: "Navigate to Wireless Settings", description: "Find the 'Wireless' or 'WLAN' section in the menu." },
      { title: "Change SSID and Password", description: "Update your Network Name (SSID) and set a strong WPA2/WPA3 password." },
      { title: "Save and Reboot", description: "Save the changes and reboot your router to apply the new settings." }
    ]
  );

  const breadcrumbHierarchy = [
    { label: "Routers", href: "/routers" },
    { label: brandName, href: `/routers/${brandSlug}` },
    { label: `${routerModel.name} Setup`, href: `/routers/${brandSlug}/${modelSlug}/setup` }
  ];

  const schemaString = await AISnapshotSchemaService.generateSchema({
    title: `${brandName} ${routerModel.name} WiFi Setup`,
    description: `Learn how to configure your ${brandName} ${routerModel.name} router.`,
    quickAnswer: routerModel.wifiSetupGuide ? "Follow the step-by-step setup guide to securely configure your router." : `Most ${brandName} routers follow a standard setup process: login to the admin panel, navigate to Wireless, and change your SSID and password.`,
    trustScore: 0.95,
    diagnosticSignals: ["Security configuration", "Initial Setup"],
    estimatedResolutionTime: "LOW",
    semanticCategory: "Router Setup",
    retrievalTier: 1,
    semanticCentrality: 0.88,
    authorityScore: 0.9,
    governanceStatus: (routerModel as any).status || "PUBLISHED",
    url: `https://routervia.com/routers/${brandSlug}/${modelSlug}/setup`
  });

  return (
    <>
      <JsonLd data={howToSchema} />
      {schemaString && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaString }} />
      )}

      <IntentBreadcrumbs hierarchy={breadcrumbHierarchy} />

      <RetrievalAnswerBlock 
        quickAnswer={routerModel.wifiSetupGuide ? "Configure the network settings according to the verified documentation." : `Most ${brandName} routers require you to log into the default gateway, usually 192.168.1.1, and modify the WLAN settings.`}
        diagnosticSummary={["Access default gateway", "Configure SSID", "Set WPA3/WPA2 security"]}
        retrievalTierUsed={1}
        semanticConfidence={0.95}
        estimatedResolutionComplexity="LOW"
        recommendedNextStep="Access the router's admin interface"
      />

      <section className="glass-card p-6">
        <h2 className="text-xl font-bold text-[var(--text-primary)] mb-5 flex items-center gap-2">
          <Settings size={20} className="text-[var(--brand-400)]" />
          WiFi Setup & Configuration Guide
        </h2>

        {routerModel.wifiSetupGuide ? (
          <div
            className="prose-dark"
            dangerouslySetInnerHTML={{ __html: markdownToHtml(routerModel.wifiSetupGuide) }}
          />
        ) : (
          <p className="text-[var(--text-secondary)]">
            A specific setup guide for this model is not yet available. However, most {brandName} routers follow a similar setup process involving logging in, navigating to the Wireless section, and saving your new SSID and password.
          </p>
        )}
      </section>

      <RetrievalExplanation 
        resolutionRate={0.92}
        relatedIssue={`${brandName} router setup`}
        actionTaken="following the verified quick start guide"
        confidenceScore={0.90}
      />

      <PeopleAlsoResolve currentEntityId={routerModel.id} currentEntityType="ROUTER" />
    </>
  );
}

// Minimal markdown converter
function markdownToHtml(md: string): string {
  return md
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/^\d+\. (.+)$/gm, "<li>$1</li>")
    .replace(/(<li>.*<\/li>)/g, "<ol className='list-decimal pl-5 my-4 space-y-2'>$1</ol>")
    .replace(/^- (.+)$/gm, "<li>$1</li>")
    .replace(/\n\n/g, "<br/><br/>")
    .replace(/\n/g, "<br/>");
}
