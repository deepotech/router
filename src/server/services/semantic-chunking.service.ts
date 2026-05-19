import crypto from "crypto";
import { EntityType, ChunkType, PrismaClient } from "@prisma/client";
import { prisma } from "../db/prisma";

export interface RawChunk {
  chunkType: ChunkType;
  title?: string;
  content: string;
  priorityScore?: number;
}

export class SemanticChunkingService {
  /**
   * Generates a deterministic hash for a piece of text to prevent duplicate embeddings.
   */
  public static generateSemanticHash(text: string): string {
    return crypto.createHash("sha256").update(text.trim().toLowerCase()).digest("hex");
  }

  /**
   * Estimates token count (simple heuristic: 1 token ≈ 4 characters).
   */
  public static estimateTokens(text: string): number {
    return Math.ceil(text.length / 4);
  }

  /**
   * Persists chunks to the database, avoiding duplicates via semanticHash.
   */
  public static async processAndSaveChunks(
    entityType: EntityType,
    entityId: number,
    rawChunks: RawChunk[]
  ) {
    const savedChunks = [];

    for (let i = 0; i < rawChunks.length; i++) {
      const raw = rawChunks[i];
      const chunkId = `${entityType.toLowerCase()}-${entityId}-${raw.chunkType.toLowerCase()}-${i}`;
      
      const contentStr = `${raw.title ? raw.title + "\n" : ""}${raw.content}`;
      const semanticHash = this.generateSemanticHash(contentStr);
      const tokenEstimate = this.estimateTokens(contentStr);

      // Upsert to avoid uniqueness constraints on semanticHash
      const chunk = await prisma.semanticChunk.upsert({
        where: { semanticHash },
        update: {
          chunkId, // Ensure chunkId is updated if re-run
          priorityScore: raw.priorityScore ?? 1.0,
        },
        create: {
          chunkId,
          entityType,
          entityId,
          chunkType: raw.chunkType,
          title: raw.title,
          content: raw.content,
          semanticHash,
          tokenEstimate,
          priorityScore: raw.priorityScore ?? 1.0,
        }
      });

      savedChunks.push(chunk);
    }

    return savedChunks;
  }
}
