import { notFound } from "next/navigation";
import Link from "next/link";
import { Wifi } from "lucide-react";
import { RouterService } from "@/server/services/router.service";
import { JsonLd, buildHowToSchema } from "@/lib/seo/schema";
import { APP_URL } from "@/lib/constants";
import type { Metadata } from "next";

type Props = { params: Promise<{ brand: string; model: string }> };

export const revalidate = 86400;

import { hasDatabase } from "@/lib/server/env-safe";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (!hasDatabase) return {};
  const { brand: brandSlug, model: modelSlug } = await params;
  const routerModel = await RouterService.getModel(brandSlug, modelSlug);
  if (!routerModel || !routerModel.brand) return {};
  return {
    title: `How to Login to ${routerModel.brand.name} ${routerModel.name} Router`,
    description: `Step-by-step guide to accessing the ${routerModel.brand.name} ${routerModel.name} admin panel. Default IP: ${routerModel.loginIps[0]}, Username: ${routerModel.defaultUsername}.`,
    alternates: {
      canonical: `${APP_URL}/routers/${brandSlug}/${modelSlug}/login`,
    },
  };
}

export default async function RouterLoginGuidePage({ params }: Props) {
  const { brand: brandSlug, model: modelSlug } = await params;
  const routerModel = await RouterService.getModel(brandSlug, modelSlug);
  if (!routerModel || !routerModel.brand) notFound();

  const brandName = routerModel.brand.name;
  const mainIp = routerModel.loginIps[0];

  const howToSchema = buildHowToSchema(
    `How to login to the ${brandName} ${routerModel.name} Router`,
    `Access the admin interface of your ${routerModel.name} using the default IP ${mainIp}.`,
    [
      {
        title: "Connect to the network",
        description: `Ensure your device is connected to the ${brandName} router via WiFi or an Ethernet cable.`,
      },
      {
        title: "Open a web browser",
        description: `Launch Chrome, Edge, or Safari and type http://${mainIp} into the address bar.`,
      },
      {
        title: "Enter default credentials",
        description: `When prompted, enter the default username ('${routerModel.defaultUsername}') and password ('${routerModel.defaultPassword || "leave blank"}').`,
      },
    ]
  );

  return (
    <>
      <JsonLd data={howToSchema} />

      <section className="glass-card p-6">
        <h2 className="text-xl font-bold text-[var(--text-primary)] mb-5 flex items-center gap-2">
          <Wifi size={20} className="text-[var(--brand-400)]" />
          Login Guide
        </h2>

        <div className="prose-dark mb-8">
          <p>
            To access the administration panel for your <strong>{brandName} {routerModel.name}</strong> router, you need to be connected to its network. Follow the steps below:
          </p>
          <ol className="space-y-4 my-6 list-decimal pl-5">
            <li className="text-[var(--text-secondary)]">
              <strong className="text-[var(--text-primary)]">Connect to the Router:</strong> Make sure your device (computer or smartphone) is connected to the router's WiFi network or via a direct Ethernet cable.
            </li>
            <li className="text-[var(--text-secondary)]">
              <strong className="text-[var(--text-primary)]">Open a Web Browser:</strong> Launch your preferred web browser and enter the default IP address: 
              <br/>
              {routerModel.loginIps.map((ip) => (
                <Link key={ip} href={`/ips/${ip.replace(/\./g, "-")}`} className="inline-block mt-2 mr-2 px-3 py-1 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-md font-mono text-[var(--brand-400)] hover:border-[var(--brand-500)] transition-colors">
                  http://{ip}
                </Link>
              ))}
            </li>
            <li className="text-[var(--text-secondary)]">
              <strong className="text-[var(--text-primary)]">Enter Credentials:</strong> You will be prompted for a username and password. 
              <br/>
              <div className="mt-2 p-4 bg-[var(--bg-elevated)] rounded-xl border border-[var(--border-subtle)]">
                <p>Username: <code className="font-mono text-[var(--text-primary)]">{routerModel.defaultUsername}</code></p>
                <p className="mt-1">Password: <code className="font-mono text-[var(--text-primary)]">{routerModel.defaultPassword || "(blank)"}</code></p>
              </div>
            </li>
          </ol>
          <p className="text-sm text-[var(--text-muted)]">
            Note: If you have previously changed the password and forgotten it, you will need to perform a factory reset. See the Factory Reset tab for instructions.
          </p>
        </div>
      </section>
    </>
  );
}
