import { prisma } from "../db/prisma";

export interface OverlapAnalysis {
  isCannibalizing: boolean;
  maxSimilarity: number;
  recommendation: 'CREATE_NEW' | 'MERGE' | 'REJECT';
  overlappingChunkId?: number;
}

export class SemanticOverlapService {
  private static readonly STOP_WORDS = new Set(['the', 'is', 'at', 'which', 'on', 'and', 'a', 'to', 'in', 'of', 'for', 'with', 'as', 'by', 'this', 'that', 'it', 'be', 'are', 'was', 'were', 'will', 'can', 'how']);

  private static tokenize(text: string): Set<string> {
    const words = text.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/);
    return new Set(words.filter(w => w.length > 2 && !this.STOP_WORDS.has(w)));
  }

  public static calculateJaccardSimilarity(textA: string, textB: string): number {
    const setA = this.tokenize(textA);
    const setB = this.tokenize(textB);

    if (setA.size === 0 || setB.size === 0) return 0;

    let intersectionCount = 0;
    for (const word of setA) {
      if (setB.has(word)) intersectionCount++;
    }

    const unionSize = setA.size + setB.size - intersectionCount;
    return unionSize === 0 ? 0 : intersectionCount / unionSize;
  }

  /**
   * Analyzes text for overlap against existing semantic chunks.
   * Prevents cannibalized indexing by identifying near-identical flows.
   */
  public static async analyzeOverlap(textContent: string): Promise<OverlapAnalysis> {
    // In production, this uses pgvector cosine distance.
    // For this slice, we simulate against recent chunks using Jaccard similarity.
    
    const recentChunks = await prisma.semanticChunk.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
      select: { id: true, content: true }
    });

    let maxSimilarity = 0;
    let closestChunkId: number | undefined;

    for (const chunk of recentChunks) {
      const similarity = this.calculateJaccardSimilarity(textContent, chunk.content);
      if (similarity > maxSimilarity) {
        maxSimilarity = similarity;
        closestChunkId = chunk.id;
      }
    }

    let recommendation: 'CREATE_NEW' | 'MERGE' | 'REJECT' = 'CREATE_NEW';
    let isCannibalizing = false;

    if (maxSimilarity >= 0.85) {
      recommendation = 'REJECT'; // Nearly identical
      isCannibalizing = true;
    } else if (maxSimilarity >= 0.65) {
      recommendation = 'MERGE'; // Substantial overlap
      isCannibalizing = true;
    }

    if (isCannibalizing) {
      console.warn(`[SemanticOverlap] Cannibalization risk detected. Max Similarity: ${(maxSimilarity * 100).toFixed(1)}%. Recommendation: ${recommendation}`);
    }

    return {
      isCannibalizing,
      maxSimilarity,
      recommendation,
      overlappingChunkId: closestChunkId
    };
  }

  public static async hasHighOverlap(textContent: string, threshold = 0.7): Promise<boolean> {
    const analysis = await this.analyzeOverlap(textContent);
    return analysis.maxSimilarity >= threshold;
  }
}
