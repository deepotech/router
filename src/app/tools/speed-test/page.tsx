import { Gauge } from "lucide-react";
import { SpeedTestTool } from "@/components/tools/SpeedTestTool";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import type { Metadata } from "next";
import { APP_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Internet Speed Test | RouterVia",
  description: "Measure your real internet download, upload, and ping speeds accurately using our cloudflare-backed testing engine.",
  alternates: {
    canonical: `${APP_URL}/tools/speed-test`,
  },
};

const breadcrumbs = [
  { label: "Tools", href: "/tools" },
  { label: "Speed Test", href: "/tools/speed-test" },
];

export default function SpeedTestPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumb items={breadcrumbs} className="mb-8" />

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-amber-900/20 flex items-center justify-center">
            <Gauge size={20} className="text-amber-400" />
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[var(--text-primary)]">Speed Test</h1>
        </div>
        <p className="text-[var(--text-secondary)]">Measure your real internet download and upload speeds.</p>
      </div>

      <SpeedTestTool />
    </div>
  );
}
