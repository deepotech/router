export interface ContentScore {
  score: number; // 0 to 100
  passed: boolean;
  issues: string[];
}

export class QualityService {
  /**
   * Evaluates AI-generated setup guides or articles to prevent "thin" or "spammy" content
   * from ever hitting the database and ruining our E-E-A-T score.
   */
  static evaluateContent(content: string, type: "GUIDE" | "FAQ"): ContentScore {
    let score = 100;
    const issues: string[] = [];

    // 1. Length Check
    const wordCount = content.split(/\s+/).length;
    if (type === "GUIDE" && wordCount < 150) {
      score -= 30;
      issues.push("Content is too thin (under 150 words).");
    } else if (type === "FAQ" && wordCount < 30) {
      score -= 20;
      issues.push("FAQ is too brief.");
    }

    // 2. Formatting Check (Markdown)
    if (type === "GUIDE" && !content.includes("##")) {
      score -= 20;
      issues.push("Lacks heading structure.");
    }

    // 3. AI Hallucination/Repetition Heuristics
    const lowerContent = content.toLowerCase();
    if (lowerContent.includes("as an ai language model")) {
      score -= 100;
      issues.push("Contains AI refusal boilerplate.");
    }
    
    // Repetitive phrasing check (simple heuristic)
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 10);
    const uniqueSentences = new Set(sentences.map(s => s.trim().toLowerCase()));
    if (sentences.length > 5 && uniqueSentences.size < sentences.length * 0.7) {
      score -= 40;
      issues.push("Highly repetitive content detected.");
    }

    return {
      score: Math.max(0, score),
      passed: score >= 80,
      issues,
    };
  }
}
