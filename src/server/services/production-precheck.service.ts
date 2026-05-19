import { prisma } from "@/server/db/prisma";
import { DeploymentSecurityService } from "./deployment-security.service";

export class ProductionPrecheckService {
  /**
   * Executes the final pre-flight checks before the application handles live traffic.
   */
  static async executePreflightPipeline(): Promise<void> {
    console.log("[PRECHECK] Initiating production deployment preflight checks...");

    try {
      // 1. Secrets and Env Check
      DeploymentSecurityService.validateEnvironment();

      // 2. Database Connectivity
      await prisma.$queryRaw`SELECT 1`;
      console.log("[PRECHECK] Database connection verified.");

      // 3. Vector DB Readiness
      const vectorCheck = await prisma.$queryRaw<any[]>`
        SELECT extname FROM pg_extension WHERE extname = 'vector'
      `;
      if (!vectorCheck || vectorCheck.length === 0) {
        throw new Error("[PRECHECK FATAL] pgvector extension is not installed or enabled in production DB.");
      }
      console.log("[PRECHECK] pgvector extension verified.");

      // 4. (Future) Redis Connectivity, OpenAI healthchecks go here.

      console.log("[PRECHECK] All preflight checks passed. Ready for traffic.");
    } catch (e) {
      console.error("[PRECHECK FATAL] Deployment pipeline failed critical checks.", e);
      // In a real SRE pipeline, we exit 1 to fail the Docker startup or Railway deploy
      process.exit(1);
    }
  }
}
