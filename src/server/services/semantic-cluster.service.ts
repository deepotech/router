import { prisma } from "../db/prisma";

export interface SemanticClusterHierarchy {
  routerId: number;
  routerName: string;
  routerSlug: string;
  clusterNodes: {
    nodeType: "ROUTER" | "PROBLEM" | "GATEWAY_IP" | "FIRMWARE" | "RESOURCE" | "COMPARISON" | "TOOL" | "FAQ";
    label: string;
    targetUrl: string;
    isLinked: boolean;
  }[];
  clusterCompletenessScore: number; // 0 - 100%
  confidence: number;
  reasoning: string;
}

export class SemanticClusterOptimizerService {
  /**
   * Constructs and optimizes 8-node semantic clusters to boost topical authority.
   */
  public static async optimizeClusters(): Promise<SemanticClusterHierarchy[]> {
    const clusters: SemanticClusterHierarchy[] = [];

    const models = await prisma.routerModel.findMany({
      take: 20,
      include: { resources: true }
    });

    for (const model of models) {
      const primaryIp = model.loginIps[0] || "192.168.1.1";
      const ipSlug = primaryIp.replace(/\./g, "-");

      const nodes: SemanticClusterHierarchy["clusterNodes"] = [
        { nodeType: "ROUTER", label: `${model.name} Main Guide`, targetUrl: `/routers/${model.slug}`, isLinked: true },
        { nodeType: "PROBLEM", label: `${model.name} Login Not Working Fix`, targetUrl: `/router-login-not-working`, isLinked: true },
        { nodeType: "GATEWAY_IP", label: `Gateway ${primaryIp} Admin`, targetUrl: `/ips/${ipSlug}`, isLinked: true },
        { nodeType: "FIRMWARE", label: `Latest Firmware Download`, targetUrl: `/routers/${model.slug}#firmware`, isLinked: model.resources.some(r => r.resourceType === "FIRMWARE_BINARY") },
        { nodeType: "RESOURCE", label: `User Manual PDF`, targetUrl: `/routers/${model.slug}#resources`, isLinked: model.resources.length > 0 },
        { nodeType: "COMPARISON", label: `Specs vs Alternatives`, targetUrl: `/routers/${model.slug}#comparison`, isLinked: true },
        { nodeType: "TOOL", label: `Subnet & Ping Checker`, targetUrl: `/tools/ping-test`, isLinked: true },
        { nodeType: "FAQ", label: `Default Passwords & Reset FAQ`, targetUrl: `/routers/${model.slug}#faq`, isLinked: (model.faqs as any[])?.length > 0 }
      ];

      const linkedCount = nodes.filter(n => n.isLinked).length;
      const completeness = Math.round((linkedCount / nodes.length) * 100);

      clusters.push({
        routerId: model.id,
        routerName: model.name,
        routerSlug: model.slug,
        clusterNodes: nodes,
        clusterCompletenessScore: completeness,
        confidence: 95,
        reasoning: `8-node semantic cluster completeness is ${completeness}% (${linkedCount}/8 nodes populated).`
      });
    }

    return clusters;
  }
}
