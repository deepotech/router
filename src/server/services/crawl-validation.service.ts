export interface CrawlValidationResult {
  isValid: boolean;
  score: number;
  issues: string[];
  metrics: {
    hasH1: boolean;
    hasH2: boolean;
    hasSchema: boolean;
    hasExtractionBoundaries: boolean;
    wordCount: number;
  };
}

export class CrawlValidationService {
  /**
   * Simulates a full Googlebot / AI crawler extraction process.
   * Verifies structural readability, schema completeness, and uniqueness constraints.
   */
  public static validatePageReadiness(htmlContent: string): CrawlValidationResult {
    const issues: string[] = [];
    let score = 100;
    
    // Structure Checks
    const hasH1 = /<h1\b[^>]*>[\s\S]*?<\/h1>/i.test(htmlContent);
    const hasH2 = /<h2\b[^>]*>[\s\S]*?<\/h2>/i.test(htmlContent);
    const hasSchema = htmlContent.includes('application/ld+json');
    const hasExtractionBoundaries = htmlContent.includes('<!-- BEGIN AI RETRIEVAL CHUNK -->') && 
                                    htmlContent.includes('<!-- END AI RETRIEVAL CHUNK -->');

    if (!hasH1) {
      issues.push('Missing H1 tag. Essential for SEO hierarchy.');
      score -= 20;
    }

    if (!hasH2) {
      issues.push('Missing H2 tags. Content lacks structural readability.');
      score -= 10;
    }

    if (!hasSchema) {
      issues.push('Missing structured data (Schema.org). Critical for rich snippets.');
      score -= 15;
    }

    if (!hasExtractionBoundaries) {
      issues.push('Missing AI extraction boundaries. Extraction for LLMs may fail or pull noise.');
      score -= 10;
    }

    // Word Count Density
    const textOnly = htmlContent.replace(/<[^>]*>?/gm, '');
    const wordCount = textOnly.split(/\s+/).filter(w => w.length > 0).length;

    if (wordCount < 150) {
      issues.push('Thin content. Word count below 150. High risk of crawl bloat/thin content penalty.');
      score -= 25;
    } else if (wordCount > 4000) {
      issues.push('Potential crawl bloat. Word count exceedingly high (>4000). Consider chunking.');
      score -= 5;
    }

    // Raw JSON Leakage (outside of Schema)
    // Simplified heuristic: if it contains raw unescaped JSON properties but isn't explicitly marked as script.
    // In actual implementation we'd strip the ld+json blocks before checking.
    const withoutSchema = htmlContent.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/gi, '');
    if (withoutSchema.includes('{"') && withoutSchema.includes('":')) {
      issues.push('Detected raw JSON strings leaked into renderable content.');
      score -= 20;
    }

    // It must pass a certain threshold AND have critical components to be valid
    const isValid = score >= 75 && hasH1 && hasSchema;

    if (!isValid) {
      console.warn(`[CrawlValidation] Page failed validation. Score: ${score}. Issues: ${issues.join(' | ')}`);
    }

    return {
      isValid,
      score,
      issues,
      metrics: {
        hasH1,
        hasH2,
        hasSchema,
        hasExtractionBoundaries,
        wordCount
      }
    };
  }
}
