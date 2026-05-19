/**
 * THIN CONTENT RECOVERY PIPELINE
 * ==============================
 * Automatically identifies published entities with < 150 words and
 * enriches them by adding missing technical depth (no SEO filler).
 */

import { config } from "dotenv";
config({ path: ".env.local" });
config({ path: ".env" });

import { createOpenAI } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { z } from "zod";
import { prisma } from "../db/prisma";

const openaiProvider = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
  baseURL: process.env.OPENAI_BASE_URL || "https://api.openai.com/v1",
});
const model = openaiProvider("gpt-4o-mini");

function getWordCount(text: string): number {
  return text.split(/\s+/).filter((w) => w.length > 0).length;
}

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function recoverThinProblems() {
  const problems = await prisma.problem.findMany({
    where: { status: { in: ["PUBLISHED", "STAGED", "REVIEWED"] } },
  });

  for (const p of problems) {
    const wordCount = getWordCount(p.content);
    if (wordCount >= 150) continue;

    console.log(`\n  → Recovering Thin Problem: [${p.id}] ${p.title} (${wordCount} words)`);

    const { object } = await generateObject({
      model,
      schema: z.object({
        enrichedContent: z.string().describe("Markdown content enriched with deep technical diagnostic steps. Maintain strict signal-to-noise ratio."),
      }),
      prompt: `
You are a Staff Network Engineer. The following troubleshooting guide is too brief and lacks technical depth.
Title: "${p.title}"
Current Content:
${p.content}

Task: Rewrite and expand this guide to provide comprehensive, step-by-step technical diagnostics.
- Include exact IP addresses, commands, or UI locations where applicable.
- Do NOT add SEO filler, intro paragraphs, or generic advice.
- ONLY augment missing technical depth.
      `.trim(),
    });

    const newWordCount = getWordCount(object.enrichedContent);
    await prisma.problem.update({
      where: { id: p.id },
      data: { content: object.enrichedContent },
    });

    console.log(`    ✅ Enriched to ${newWordCount} words`);
    await delay(1000);
  }
}

async function recoverThinRouters() {
  const routers = await prisma.routerModel.findMany({
    where: { status: { in: ["PUBLISHED", "STAGED", "REVIEWED"] } },
    include: { brand: { select: { name: true } } },
  });

  for (const r of routers) {
    const wordCount = getWordCount(r.wifiSetupGuide);
    if (wordCount >= 150) continue;

    console.log(`\n  → Recovering Thin Router: [${r.id}] ${r.brand.name} ${r.name} (${wordCount} words)`);

    const { object } = await generateObject({
      model,
      schema: z.object({
        enrichedGuide: z.string().describe("Markdown setup guide enriched with specific admin panel steps. Strict technical signal."),
      }),
      prompt: `
You are a Staff Network Engineer. The following router setup guide is too brief.
Router: ${r.brand.name} ${r.name}
Current Guide:
${r.wifiSetupGuide}

Task: Rewrite and expand this guide with exact step-by-step instructions for accessing the admin panel and configuring WiFi.
- Include default IPs, default credentials, and specific menu paths if known.
- Do NOT add SEO filler. ONLY technical instructions.
      `.trim(),
    });

    const newWordCount = getWordCount(object.enrichedGuide);
    await prisma.routerModel.update({
      where: { id: r.id },
      data: { wifiSetupGuide: object.enrichedGuide },
    });

    console.log(`    ✅ Enriched to ${newWordCount} words`);
    await delay(1000);
  }
}

async function main() {
  console.log("\n╔══════════════════════════════════════════════════════════╗");
  console.log("║               THIN CONTENT RECOVERY                     ║");
  console.log("╚══════════════════════════════════════════════════════════╝");

  await recoverThinProblems();
  await recoverThinRouters();

  console.log("\n╔══════════════════════════════════════════════════════════╗");
  console.log("║                 RECOVERY COMPLETE                       ║");
  console.log("╚══════════════════════════════════════════════════════════╝\n");
}

main().catch(console.error).finally(() => process.exit(0));
