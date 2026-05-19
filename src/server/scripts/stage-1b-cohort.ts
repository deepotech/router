/**
 * STAGE I-B COHORT GENERATION
 * ===========================
 * Controlled expansion targeting complex diagnostic intents.
 * Constraints:
 * - Generates 25-30 new entities maximum.
 * - Stays in STAGED status (No auto-publishing).
 * - Enforces chunk generation for retrieval readiness.
 * - Rate limited and governed.
 */

import { config } from "dotenv";
config({ path: ".env.local" });
config({ path: ".env" });

import { prisma } from "../db/prisma";
import { ContentExpansionService } from "../services/content-expansion.service";
import { SemanticChunkingService, RawChunk } from "../services/semantic-chunking.service";
import { createOpenAI } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { z } from "zod";

const getOpenAIModel = () => {
  const provider = createOpenAI({
    apiKey: process.env.OPENAI_API_KEY || "",
    baseURL: process.env.OPENAI_BASE_URL || "https://api.openai.com/v1",
  });
  return provider("gpt-4o-mini");
};

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

const STAGE_1B_TOPICS = [
  // WiFi interference issues
  { title: "2.4GHz WiFi interference from microwave", category: "Interference" },
  { title: "Bluetooth devices causing WiFi drops", category: "Interference" },
  { title: "Crowded WiFi channel overlap", category: "Interference" },
  { title: "Baby monitor killing WiFi signal", category: "Interference" },
  { title: "Wireless headset interference with router", category: "Interference" },
  
  // ISP-specific DNS failures
  { title: "Comcast Xfinity DNS not resolving", category: "DNS" },
  { title: "Spectrum DNS server issues", category: "DNS" },
  { title: "AT&T DNS server down", category: "DNS" },
  { title: "Verizon Fios DNS resolution failed", category: "DNS" },
  { title: "Optimum DNS probe finished no internet", category: "DNS" },
  
  // Firmware rollback/recovery
  { title: "How to rollback router firmware", category: "Firmware" },
  { title: "Router bricked during firmware update", category: "Firmware" },
  { title: "Asus firmware recovery mode", category: "Firmware" },
  { title: "TP-Link firmware upgrade failed", category: "Firmware" },
  { title: "Netgear TFTP firmware recovery", category: "Firmware" },
  
  // Mesh router synchronization issues
  { title: "Mesh network node not syncing", category: "Mesh" },
  { title: "TP-Link Deco red light no internet", category: "Mesh" },
  { title: "Netgear Orbi satellite disconnected", category: "Mesh" },
  { title: "Eero mesh node offline", category: "Mesh" },
  { title: "Google Nest WiFi point flashing yellow", category: "Mesh" },
  
  // DHCP/IP conflict diagnostics
  { title: "Another device is using this IP address", category: "DHCP" },
  { title: "Router DHCP pool exhaustion", category: "DHCP" },
  { title: "Windows IP address conflict detected", category: "DHCP" },
  { title: "Static IP vs DHCP conflict", category: "DHCP" },
  { title: "Router not assigning IP addresses", category: "DHCP" }
];

async function generateChunksForProblem(problem: any) {
  const { object } = await generateObject({
    model: getOpenAIModel(),
    schema: z.object({
      overview: z.string().describe("Dense 2-3 sentence technical summary for retrieval. No fluff."),
      diagnostic: z.string().describe("Step-by-step diagnostic process with technical signals. Markdown."),
      faq: z.array(z.object({
        question: z.string(),
        answer: z.string().describe("Concise, technically accurate answer. Max 3 sentences.")
      })).min(2).max(3),
    }),
    prompt: `
You are a Staff Network Engineer. Generate dense, technical retrieval chunks for this router problem:
Title: "${problem.title}"
Category: ${problem.diagnosticCategory || "General"}
Excerpt: ${problem.excerpt || "N/A"}
Existing content snippet: ${problem.content.substring(0, 300)}

Rules:
- Overview: 2-3 dense sentences with technical signals (IPs, protocols, error codes)
- Diagnostic: Markdown checklist of 3-5 diagnostic steps. Include specific commands/settings.
- FAQ: 2-3 specific technical Q&As. No generic answers.
    `.trim(),
  });

  const faqText = object.faq.map((f: any) => `Q: ${f.question}\nA: ${f.answer}`).join("\n\n");

  const rawChunks: RawChunk[] = [
    { chunkType: "OVERVIEW", title: `${problem.title} — Overview`, content: object.overview, priorityScore: 1.2 },
    { chunkType: "DIAGNOSTIC", title: `${problem.title} — Diagnostic`, content: object.diagnostic, priorityScore: 1.0 },
    { chunkType: "FAQ", title: `${problem.title} — FAQs`, content: faqText, priorityScore: 0.9 },
  ];

  await SemanticChunkingService.processAndSaveChunks("PROBLEM", problem.id, rawChunks);
}

async function runStage1BCohort() {
  console.log("\n╔══════════════════════════════════════════════════════════╗");
  console.log("║           STAGE I-B COHORT GENERATION                   ║");
  console.log("╚══════════════════════════════════════════════════════════╝\n");

  let createdCount = 0;
  let errorCount = 0;

  for (const topic of STAGE_1B_TOPICS) {
    try {
      // 1. Create stub
      const slug = topic.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      
      let problem = await prisma.problem.findUnique({ where: { slug } });
      if (problem && problem.content && problem.content.length > 50) {
        console.log(`  ⏭️  Skipping fully generated: ${topic.title}`);
        continue;
      }

      if (!problem) {
        console.log(`  → Creating: ${topic.title}`);
        problem = await prisma.problem.create({
          data: {
            title: topic.title,
            slug,
            status: "DRAFT",
            isPublished: false,
            diagnosticCategory: topic.category,
            content: "",
            excerpt: "",
            metaTitle: "",
            metaDescription: "",
            semanticIntent: "",
            retrievalSummary: "",
            causes: [],
            faqs: [],
            fixes: [],
          }
        });
      } else {
        console.log(`  → Resuming: ${topic.title}`);
      }

      // 2. Run Generation Stages
      await ContentExpansionService.generateProblemStage1(problem.id, problem.title);
      await delay(1000);
      await ContentExpansionService.generateProblemStage2(problem.id);
      await delay(1000);
      await ContentExpansionService.generateProblemStage3(problem.id);
      await delay(1000);

      // 3. Backfill Retrieval Chunks to ensure Tier 1 eligibility immediately
      const fullProblem = await prisma.problem.findUnique({ where: { id: problem.id } });
      if (fullProblem && fullProblem.content) {
        await generateChunksForProblem(fullProblem);
      }

      createdCount++;
      console.log(`    ✅ Success: STAGED with semantic chunks.`);
      await delay(2000); // Telemetry pacing
    } catch (err: any) {
      console.error(`    ❌ Error for ${topic.title}: ${err.message}`);
      errorCount++;
      await delay(2000);
    }
  }

  console.log("\n╔══════════════════════════════════════════════════════════╗");
  console.log("║                 COHORT COMPLETE                         ║");
  console.log(`║ Entities Staged: ${createdCount}                                       ║`);
  console.log(`║ Errors         : ${errorCount}                                       ║`);
  console.log("╚══════════════════════════════════════════════════════════╝\n");
}

runStage1BCohort().catch(console.error).finally(() => process.exit(0));
