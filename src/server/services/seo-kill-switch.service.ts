import { OperationalMode, OperationalModeService } from "./operational-mode.service";

export class SeoKillSwitchService {
  /**
   * Activates the emergency kill switch.
   * This immediately stops publishing, halts the AI queues, and forces a noindex stance.
   */
  public static activateKillSwitch(reason: string) {
    console.error(`🚨 [SEO KILL SWITCH ACTIVATED] Reason: ${reason}`);
    OperationalModeService.setMode(OperationalMode.EMERGENCY);
    
    // In a real environment, this would broadcast an event to all BullMQ workers
    // instructing them to pause, and invalidate the Edge cache to force noindex headers.
  }

  /**
   * Freezes AI Generation but allows deterministic publishing to continue.
   */
  public static freezeAiGeneration(reason: string) {
    console.warn(`⚠️ [AI FREEZE] Reason: ${reason}`);
    OperationalModeService.setMode(OperationalMode.AI_DISABLED);
  }

  /**
   * Restores normal operations.
   */
  public static deactivateKillSwitch() {
    console.log(`✅ [SYSTEM RESTORED] Resuming normal operations.`);
    OperationalModeService.setMode(OperationalMode.NORMAL);
  }

  public static getCurrentStatus() {
    return {
      mode: OperationalModeService.getMode(),
      aiEnabled: OperationalModeService.isAiEnabled(),
      publishingEnabled: OperationalModeService.isPublishingEnabled()
    };
  }
}
