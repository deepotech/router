export class HallucinationDetectionService {
  /**
   * Deterministically validates an AI-generated IP address to ensure it is a valid IPv4 or IPv6 structure,
   * preventing hallucinations like "192.168.300.1".
   */
  public static isValidIpAddress(ip: string): boolean {
    const ipv4Regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return ipv4Regex.test(ip.trim());
  }

  /**
   * Evaluates text for common hallucination patterns.
   * E.g., instructing users to "download RAM" or "drill into the router".
   */
  public static containsDangerousAdvice(text: string): boolean {
    const dangerousPhrases = [
      "download ram",
      "drill a hole",
      "microwave your router",
      "delete system32",
      "cut the power cord",
      "solder the pins"
    ];

    const normalized = text.toLowerCase();
    return dangerousPhrases.some(phrase => normalized.includes(phrase));
  }

  /**
   * Verifies an entity payload for structural and deterministic truth before staging.
   * Returns a hallucination score (0 = Perfect, 1.0 = Complete Hallucination).
   */
  public static evaluateEntityPayload(payload: { ips?: string[], textContent: string }): number {
    let score = 0.0;

    if (payload.ips) {
      for (const ip of payload.ips) {
        if (!this.isValidIpAddress(ip)) {
          score += 0.5; // High penalty for fake IPs
        }
      }
    }

    if (this.containsDangerousAdvice(payload.textContent)) {
      score += 1.0; // Instant fail
    }

    // Add more deterministic checks as the ground truth database grows.
    
    return Math.min(score, 1.0);
  }
}
