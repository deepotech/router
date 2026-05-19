import { prisma } from "../db/prisma";

export class GraphMetricsService {
  /**
   * Generates a snapshot of the current semantic graph health.
   */
  public static async captureSnapshot() {
    const totalEdges = await prisma.entityRelation.count();
    
    // We count entities that exist in the system but have 0 incoming and 0 outgoing relations
    // This requires a more complex query, so we approximate or use Prisma's aggregate
    
    const [totalAuthorities, orphanAuthorities] = await Promise.all([
      prisma.entityAuthority.count(),
      prisma.entityAuthority.count({
        where: { inDegree: 0, outDegree: 0 }
      })
    ]);

    const averageDensity = totalAuthorities > 0 ? totalEdges / totalAuthorities : 0;

    const metric = await prisma.graphMetric.create({
      data: {
        totalEdges,
        averageDensity,
        orphanEntities: orphanAuthorities
      }
    });

    return metric;
  }
}
