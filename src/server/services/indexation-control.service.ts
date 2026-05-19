import { ContentQualityStatus } from "@prisma/client";
import { OperationalMode, OperationalModeService } from "./operational-mode.service";

export class IndexationControlService {
  /**
   * Deterministically returns the correct <meta name="robots"> tag settings.
   * Ensures that STAGED content or content during SEO_FREEZE is never indexed by Google.
   */
  public static async getRobotsConfig(
    status: ContentQualityStatus,
    trustScore?: number
  ): Promise<{ index: boolean; follow: boolean; noarchive: boolean }> {
    
    // 1. Operational Mode Overrides (Kill Switch)
    const currentMode = await OperationalModeService.getMode();
    if (currentMode === OperationalMode.SEO_FREEZE || currentMode === OperationalMode.EMERGENCY) {
      console.warn("[IndexationControl] System is in EMERGENCY/SEO_FREEZE. Forcing noindex.");
      return { index: false, follow: false, noarchive: true };
    }

    // 2. Publication Gate
    if (status !== ContentQualityStatus.PUBLISHED) {
      // It might be STAGED or REVIEWED, but it is not public.
      return { index: false, follow: false, noarchive: true };
    }

    // 3. Trust Score Gate
    // If somehow a published page has a trust score below 0.8, we noindex it to protect domain authority
    if (trustScore !== undefined && trustScore < 0.8) {
      return { index: false, follow: true, noarchive: true };
    }

    // Fully safe for massive indexing
    return { index: true, follow: true, noarchive: false };
  }
}
