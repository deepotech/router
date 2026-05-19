import { OperationalModeService } from "./operational-mode.service";
import { prisma } from "../db/prisma";
import { ContentQualityStatus } from "@prisma/client";

export class RolloutControlService {
  private static readonly STAGE_A_LIMIT = 100;
  private static readonly STAGE_B_LIMIT = 500;
  private static readonly STAGE_C_LIMIT = 2000;

  /**
   * Determines if the system is allowed to publish more entities based on the current rollout stage limits.
   */
  public static async canPublish(targetPublishCount: number): Promise<boolean> {
    if (!(await OperationalModeService.isPublishingEnabled())) {
      console.warn("[RolloutControl] Publishing is currently disabled by Operational Mode.");
      return false;
    }

    const currentPublishedCount = await this.getTotalPublishedCount();
    const prospectiveCount = currentPublishedCount + targetPublishCount;

    // Rollout Gate logic: Require manual admin override to move between stages
    // For this vertical slice, we just enforce the Stage A limit.
    if (prospectiveCount > this.STAGE_A_LIMIT) {
      console.warn(`[RolloutControl] Stage A limit reached (${this.STAGE_A_LIMIT}). Automatic publishing halted until Stage B is unlocked.`);
      return false;
    }

    return true;
  }

  private static async getTotalPublishedCount(): Promise<number> {
    const [problems, routers, ips] = await Promise.all([
      prisma.problem.count({ where: { status: ContentQualityStatus.PUBLISHED } }),
      prisma.routerModel.count({ where: { status: ContentQualityStatus.PUBLISHED } }),
      prisma.ipAddress.count({ where: { status: ContentQualityStatus.PUBLISHED } })
    ]);
    
    return problems + routers + ips;
  }
}
