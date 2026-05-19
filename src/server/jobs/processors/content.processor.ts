import { Job } from "bullmq";
import { prisma } from "../../db/prisma";
import { ContentGovernanceService } from "../../services/content-governance.service";
import { ContentExpansionService } from "../../services/content-expansion.service";

/**
 * The processor handles the actual execution logic for a job
 */
export async function contentProcessor(job: Job) {
  const { type, taskType, routerId, payload } = job.data;
  
  console.log(`[ContentProcessor] -----------------------------------------`);
  console.log(`[ContentProcessor] 📥 PICKED UP JOB ${job.id} (Name: ${job.name})`);
  console.log(`[ContentProcessor] Payload: ${JSON.stringify(job.data)}`);
  console.log(`[ContentProcessor] -----------------------------------------`);

  // Handle Legacy / Existing Tasks
  if (taskType === "SETUP_GUIDE" || taskType === "FAQ") {
    const router = await prisma.routerModel.findUnique({
      where: { id: routerId },
      include: { brand: true },
    });

    if (!router) throw new Error(`Router ${routerId} not found`);

    if (taskType === "SETUP_GUIDE") {
      await ContentGovernanceService.generateAndScoreSetupGuide(router);
    } else if (taskType === "FAQ") {
      await ContentGovernanceService.generateAndScoreFaqs(router);
    }
    return { success: true };
  }

  // Handle Phase 1 Content Expansion Tasks
  const routeKey = type || taskType || job.name;
  switch (routeKey) {
    case "PROBLEM_STAGE_1":
      await ContentExpansionService.generateProblemStage1(payload.problemId, payload.title);
      break;
    case "PROBLEM_STAGE_2":
      await ContentExpansionService.generateProblemStage2(payload.problemId);
      break;
    case "PROBLEM_STAGE_3":
      await ContentExpansionService.generateProblemStage3(payload.problemId);
      break;

    case "ROUTER_STAGE_1":
      await ContentExpansionService.generateRouterModelStage1(payload.modelId);
      break;
    case "ROUTER_STAGE_2":
      await ContentExpansionService.generateRouterModelStage2(payload.modelId);
      break;

    case "IP_STAGE_1":
      await ContentExpansionService.generateIpStage1(payload.ipId);
      break;

    case "generate-semantic-chunk":
      await ContentExpansionService.generateSemanticChunk(job.data);
      break;

    default:
      console.warn(`[ContentProcessor] Unknown job type: ${type || taskType}`);
  }

  console.log(`[ContentProcessor] ✅ COMPLETED JOB ${job.id}`);
  return { success: true };
}
