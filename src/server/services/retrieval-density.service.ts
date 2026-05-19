export interface DensityScore {
  score: number; // 0-100
  signalToNoiseRatio: number; // 0-100
  isVerbose: boolean;
  isExtractive: boolean;
  recommendation: 'APPROVE' | 'REJECT' | 'REWRITE';
}

export class RetrievalDensityService {
  /**
   * Evaluates a text chunk for semantic density.
   * High density = fact-dense, clear constraints, low filler.
   */
  public static calculateDensity(textContent: string, contextType: 'troubleshooting' | 'specification' | 'login' = 'troubleshooting'): DensityScore {
    const text = textContent.toLowerCase();
    const wordCount = text.split(/\s+/).length;

    if (wordCount < 10) {
      return { score: 10, signalToNoiseRatio: 10, isVerbose: false, isExtractive: false, recommendation: 'REJECT' };
    }

    // Filler / Fluff words
    const fillerWords = ['basically', 'simply', 'just', 'really', 'very', 'in order to', 'as a matter of fact', 'it is important to note that', 'moreover', 'furthermore', 'in conclusion', 'to sum up'];
    let fillerCount = 0;
    fillerWords.forEach(fw => {
      const regex = new RegExp(`\\b${fw}\\b`, 'gi');
      const matches = textContent.match(regex);
      if (matches) fillerCount += matches.length;
    });

    // Technical signal dictionary
    const exactEntities = (textContent.match(/\b(192\.168\.\d+\.\d+|10\.\d+\.\d+\.\d+|admin|password|WPA3|DHCP|DNS|NAT|IPv6|Mbps|GHz|router|firmware|reset|login|blinking|orange|red|white|mac|port|forwarding|reboot)\b/gi) || []).length;
    
    // Calculate Ratios
    const fillerRatio = fillerCount / wordCount;
    const signalRatio = exactEntities / wordCount;
    
    let signalScore = 100 - (fillerRatio * 500); // Heavy penalty for filler
    signalScore += signalRatio * 1000; // Bonus for entities
    
    signalScore = Math.max(0, Math.min(100, signalScore));

    const isVerbose = fillerRatio > 0.05 || (wordCount > 150 && signalRatio < 0.02);
    const isExtractive = exactEntities >= 3 || signalScore > 70;

    let recommendation: 'APPROVE' | 'REJECT' | 'REWRITE' = 'APPROVE';
    if (signalScore < 30) recommendation = 'REJECT';
    else if (isVerbose && signalScore < 60) recommendation = 'REWRITE';

    if (recommendation !== 'APPROVE') {
      console.warn(`[RetrievalDensity] Chunk recommendation: ${recommendation}. Score: ${signalScore.toFixed(2)}, isVerbose: ${isVerbose}`);
    }

    return {
      score: signalScore,
      signalToNoiseRatio: signalScore,
      isVerbose,
      isExtractive,
      recommendation
    };
  }

  /**
   * Scores extraction quality specifically for LLM Crawlers (e.g., Perplexity, SearchGPT).
   * They favor semantic HTML, lists, strong tags, and clear hierarchy.
   */
  public static scoreExtractionQuality(htmlChunk: string): number {
    let score = 35; // Base score
    
    if (htmlChunk.includes('<ol>') || htmlChunk.includes('<ul>')) score += 20;
    if (htmlChunk.match(/<h[2-4]>/)) score += 20;
    if (htmlChunk.includes('<strong>') || htmlChunk.includes('<b>')) score += 15;
    if (htmlChunk.includes('<code>')) score += 10;
    
    // Penalize deep nesting or div soup (bad for LLM extractors)
    const divDepth = (htmlChunk.match(/<div/g) || []).length;
    if (divDepth > 3) score -= (divDepth - 3) * 5;

    // Must have at least some structured data markers or clear sections
    if (!htmlChunk.includes('<!-- BEGIN AI RETRIEVAL CHUNK -->')) {
      score -= 10;
    }

    return Math.max(0, Math.min(100, score));
  }
}
