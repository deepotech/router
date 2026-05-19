import { OpenAI } from "openai";
import { prisma } from "../db/prisma";
import { SemanticChunk, StorageTier } from "@prisma/client";
import { VectorStorageStrategy } from "./vector-storage.strategy";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export class MinimalEmbeddingPipeline {
  /**
   * Generates embeddings for a batch of chunks, skipping those that already exist.
   */
  public static async embedChunks(chunks: SemanticChunk[]) {
    const results = [];

    for (const chunk of chunks) {
      // Check if embedding already exists for this chunk to save costs
      const existing = await prisma.embeddingRecord.findUnique({
        where: { chunkId: chunk.id }
      });

      if (existing) {
        results.push(existing);
        continue;
      }

      // Generate embedding using small model
      const contentToEmbed = `${chunk.title ? chunk.title + "\n" : ""}${chunk.content}`;
      const response = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: contentToEmbed,
        encoding_format: "float",
      });

      const vector = response.data[0].embedding;
      
      // Determine initial storage tier (usually HOT for new items)
      const tier = VectorStorageStrategy.determineStorageTier(0, chunk.priorityScore, 0);

      // We use raw query because prisma doesn't natively support creating pgvector array insertions easily without raw
      // Upserting via raw
      const vectorString = `[${vector.join(",")}]`;
      
      await prisma.$executeRaw`
        INSERT INTO "embedding_records" ("chunkId", "embedding", "storageTier", "freshnessScore", "updatedAt")
        VALUES (${chunk.id}, ${vectorString}::vector, ${tier}::"StorageTier", 1.0, NOW())
        ON CONFLICT ("chunkId") DO UPDATE 
        SET "embedding" = ${vectorString}::vector, "updatedAt" = NOW();
      `;

      // Fetch the created record
      const record = await prisma.embeddingRecord.findUnique({
        where: { chunkId: chunk.id }
      });
      
      if (record) results.push(record);
    }

    return results;
  }
}
