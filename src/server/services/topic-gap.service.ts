import { prisma } from "../db/prisma";

export interface TopicGapOpportunity {
  gapCategory: "MISSING_ROUTER_MODEL" | "MISSING_IP_PAGE" | "MISSING_TROUBLESHOOTING" | "MISSING_FIRMWARE_GUIDE" | "MISSING_COMPARISON" | "MISSING_SECURITY_ARTICLE" | "MISSING_FAQ";
  targetTitle: string;
  proposedSlug: string;
  brandSlug?: string;
  estimatedDemandScore: number;
  confidence: number;
  reasoning: string;
}

export class TopicGapService {
  /**
   * Discovers broad missing content opportunities across models, IPs, guides, comparisons, FAQs, and security guides.
   */
  public static async discoverGaps(): Promise<TopicGapOpportunity[]> {
    const gaps: TopicGapOpportunity[] = [];

    // 1. High-traffic missing models in popular series
    const brands = await prisma.brand.findMany({
      include: { models: true, families: true }
    });

    const highPriorityModelGaps = [
      { brandSlug: "tp-link", name: "Archer AX90", slug: "tp-link-archer-ax90" },
      { brandSlug: "asus", name: "RT-AX86U Pro", slug: "asus-rt-ax86u-pro" },
      { brandSlug: "netgear", name: "Nighthawk RAXE500", slug: "netgear-nighthawk-raxe500" },
      { brandSlug: "huawei", name: "WiFi Mesh 7", slug: "huawei-wifi-mesh-7" }
    ];

    for (const modelGap of highPriorityModelGaps) {
      const existing = await prisma.routerModel.findUnique({ where: { slug: modelGap.slug } });
      if (!existing) {
        gaps.push({
          gapCategory: "MISSING_ROUTER_MODEL",
          targetTitle: `${modelGap.name} Login & Setup Guide`,
          proposedSlug: modelGap.slug,
          brandSlug: modelGap.brandSlug,
          estimatedDemandScore: 92,
          confidence: 96,
          reasoning: `High search volume device ${modelGap.name} is missing from ${modelGap.brandSlug} catalog.`
        });
      }
    }

    // 2. Missing Comparison Pairs
    const topModels = await prisma.routerModel.findMany({ take: 4, orderBy: { id: "desc" } });
    if (topModels.length >= 2) {
      const modelA = topModels[0];
      const modelB = topModels[1];
      gaps.push({
        gapCategory: "MISSING_COMPARISON",
        targetTitle: `${modelA.name} vs ${modelB.name} Comparison & Specs`,
        proposedSlug: `${modelA.slug}-vs-${modelB.slug}`,
        estimatedDemandScore: 85,
        confidence: 90,
        reasoning: `High commercial buyer query comparison gap between ${modelA.name} and ${modelB.name}.`
      });
    }

    // 3. Missing Gateway IP Guides
    const missingIps = [
      { ip: "192.168.10.1", slug: "192-168-10-1" },
      { ip: "192.168.2.1", slug: "192-168-2-1" }
    ];
    for (const ipGap of missingIps) {
      const existing = await prisma.ipAddress.findUnique({ where: { address: ipGap.ip } });
      if (!existing) {
        gaps.push({
          gapCategory: "MISSING_IP_PAGE",
          targetTitle: `How to Access ${ipGap.ip} Router Admin Login`,
          proposedSlug: ipGap.slug,
          estimatedDemandScore: 88,
          confidence: 93,
          reasoning: `Gateway IP ${ipGap.ip} is a standard default gateway for multiple fiber modems.`
        });
      }
    }

    // 4. Missing Security Articles
    gaps.push({
      gapCategory: "MISSING_SECURITY_ARTICLE",
      targetTitle: "How to Secure WPA3 Router Encryption Against Deauth Attacks",
      proposedSlug: "wpa3-security-deauth-protection",
      estimatedDemandScore: 78,
      confidence: 87,
      reasoning: "High-authority topic gap identified in modern WiFi 6/6E security cluster."
    });

    return gaps;
  }
}
