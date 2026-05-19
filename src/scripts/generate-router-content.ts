import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const generationSchema = z.object({
  wifiSetupGuide: z.string().describe("Markdown formatted step-by-step guide to configuring WiFi and changing the password for this specific router brand/model."),
  resetGuide: z.string().describe("Markdown formatted step-by-step guide to factory resetting this router model."),
  faqs: z.array(z.object({
    question: z.string(),
    answer: z.string(),
  })).max(5).describe("List of 3-5 frequently asked questions and short, helpful answers specific to this router model."),
});

async function main() {
  console.log("🔍 Scanning for router models with incomplete content...");
  
  // Find up to 5 router models that are missing a setup guide or FAQs
  const models = await prisma.routerModel.findMany({
    where: {
      OR: [
        { wifiSetupGuide: { equals: "" } },
        { resetGuide: { equals: "" } }
      ]
    },
    include: { brand: true },
    take: 5,
  });

  if (models.length === 0) {
    console.log("✅ All router models have complete content.");
    process.exit(0);
  }

  console.log(`Found ${models.length} models to process.`);

  for (const model of models) {
    console.log(`\n🤖 Generating content for: ${model.brand.name} ${model.name}...`);
    
    try {
      const { object } = await generateObject({
        model: openai("gpt-4o-mini"),
        schema: generationSchema,
        prompt: `
          You are an expert network technician.
          Please generate detailed, accurate content for the router model: ${model.brand.name} ${model.name}.
          Default IP: ${model.loginIps[0]}
          Default Username: ${model.defaultUsername}
          Default Password: ${model.defaultPassword}

          Generate:
          1. A WiFi setup guide (Markdown, use headings, bullet points, and code blocks for credentials).
          2. A factory reset guide (Markdown).
          3. A list of 3-5 FAQs.
        `,
      });

      await prisma.routerModel.update({
        where: { id: model.id },
        data: {
          wifiSetupGuide: object.wifiSetupGuide,
          resetGuide: object.resetGuide,
          faqs: object.faqs,
        },
      });

      console.log(`✅ Successfully updated ${model.brand.name} ${model.name}.`);
      
      // Sleep to avoid rate limits
      await new Promise(r => setTimeout(r, 2000));
      
    } catch (error) {
      console.error(`❌ Failed to generate content for ${model.name}:`, error);
    }
  }

  console.log("\n🎉 Content automation complete.");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
