import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "AI Router Assistant | Ask RouterVia",
  description:
    "Get instant, expert answers to any router question. RouterVia's AI assistant helps you troubleshoot connectivity issues, configure settings, and fix network problems in seconds.",
  canonical: "/assistant",
  keywords: [
    "AI router assistant",
    "router help AI",
    "network troubleshooter AI",
    "router chat bot",
    "wifi fix assistant",
    "internet problems AI",
  ],
});

export default function AssistantLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
