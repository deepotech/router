import { embed } from "ai";
import { openai } from "@ai-sdk/openai";
import { prisma } from "../db/prisma";

export class EmbeddingService {
  /**
   * Generates a 1536-dimensional vector for a given text using OpenAI.
   */
  static async generateEmbedding(text: string): Promise<number[]> {
    const { embedding } = await embed({
      model: openai.embedding("text-embedding-3-small"),
      value: text,
    });
    return embedding;
  }

  /**
   * Updates the vector embedding for a router model.
   */
  static async updateRouterEmbedding(routerId: number, text: string) {
    const vector = await this.generateEmbedding(text);
    
    // In Prisma, pgvector updates are typically done via raw SQL to handle the array -> vector cast natively
    await prisma.$executeRaw`
      INSERT INTO router_embeddings ("routerId", "embedding", "updatedAt") 
      VALUES (${routerId}, ${vector}::vector, NOW())
      ON CONFLICT ("routerId") DO UPDATE 
      SET embedding = ${vector}::vector, "updatedAt" = NOW();
    `;
  }

  /**
   * Semantic search across routers based on natural language intent.
   */
  static async searchRoutersByIntent(query: string, limit = 5) {
    const queryVector = await this.generateEmbedding(query);

    // Find the closest vectors using L2 distance (<->) or Cosine Similarity (<=>)
    const matches = await prisma.$queryRaw<Array<{ routerId: number; distance: number }>>`
      SELECT "routerId", embedding <-> ${queryVector}::vector AS distance
      FROM router_embeddings
      ORDER BY distance ASC
      LIMIT ${limit};
    `;

    if (matches.length === 0) return [];

    const routerIds = matches.map((m) => m.routerId);
    
    // Fetch the full records
    const routers = await prisma.routerModel.findMany({
      where: { id: { in: routerIds } },
      include: { brand: true },
    });

    // Re-sort based on distance to maintain search relevance order
    return routers.sort((a, b) => routerIds.indexOf(a.id) - routerIds.indexOf(b.id));
  }
}
