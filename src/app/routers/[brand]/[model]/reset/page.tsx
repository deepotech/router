import { notFound } from "next/navigation";
import { RotateCcw } from "lucide-react";
import { RouterService } from "@/server/services/router.service";
import { JsonLd, buildHowToSchema } from "@/lib/seo/schema";
import { APP_URL } from "@/lib/constants";
import type { Metadata } from "next";

type Props = { params: Promise<{ brand: string; model: string }> };

export const revalidate = 86400;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { brand: brandSlug, model: modelSlug } = await params;
  const routerModel = await RouterService.getModel(brandSlug, modelSlug);
  if (!routerModel || !routerModel.brand) return {};
  return {
    title: `How to Factory Reset the ${routerModel.brand.name} ${routerModel.name}`,
    description: `Forgotten your password? Learn how to factory reset your ${routerModel.brand.name} ${routerModel.name} router back to its original default settings and IP address.`,
    alternates: {
      canonical: `${APP_URL}/routers/${brandSlug}/${modelSlug}/reset`,
    },
  };
}

export default async function RouterResetGuidePage({ params }: Props) {
  const { brand: brandSlug, model: modelSlug } = await params;
  const routerModel = await RouterService.getModel(brandSlug, modelSlug);
  if (!routerModel || !routerModel.brand) notFound();

  const brandName = routerModel.brand.name;

  const howToSchema = buildHowToSchema(
    `How to reset the ${brandName} ${routerModel.name}`,
    `Instructions for restoring factory defaults on your router.`,
    [
      { title: "Keep router powered on", description: "Ensure the router is plugged in and powered on." },
      { title: "Locate Reset button", description: "Find the small reset pinhole or button on the back of the router." },
      { title: "Press and hold", description: "Use a paperclip to press and hold the button for 10-15 seconds." },
      { title: "Wait for reboot", description: "Release the button and wait for the router lights to flash and reboot." }
    ]
  );

  return (
    <>
      <JsonLd data={howToSchema} />

      <section className="glass-card p-6">
        <h2 className="text-xl font-bold text-[var(--text-primary)] mb-5 flex items-center gap-2">
          <RotateCcw size={20} className="text-amber-400" />
          Factory Reset Guide
        </h2>

        {routerModel.resetGuide ? (
          <div
            className="prose-dark"
            dangerouslySetInnerHTML={{ __html: markdownToHtml(routerModel.resetGuide) }}
          />
        ) : (
          <p className="text-[var(--text-secondary)]">
            A specific reset guide for this model is not yet available. Generally, you can reset any {brandName} router by pressing and holding the reset button with a paperclip for 10 seconds while the router is powered on.
          </p>
        )}
      </section>
    </>
  );
}

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
