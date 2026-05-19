import { ContentQualityStatus } from "@prisma/client";
import { IndexationControlService } from "./indexation-control.service";
import { CrawlPressureService } from "./crawl-pressure.service";

export interface AISnapshotSchemaData {
  title: string;
  description: string;
  quickAnswer: string;
  trustScore: number;
  diagnosticSignals: string[];
  estimatedResolutionTime: "LOW" | "MEDIUM" | "HIGH";
  semanticCategory: string;
  retrievalTier: 0 | 1 | 2;
  semanticCentrality: number;
  authorityScore: number;
  governanceStatus: ContentQualityStatus;
  url: string;
}

export class AISnapshotSchemaService {
  /**
   * Generates AI-native structured JSON-LD schemas optimized for SearchGPT, Perplexity, and AI Overviews.
   * Respects Governance, Crawl Pressure, and Indexation Control to prevent polluting the index.
   */
  public static async generateSchema(data: AISnapshotSchemaData): Promise<string | null> {
    // 1. Governance & Indexation Gates
    const robots = await IndexationControlService.getRobotsConfig(data.governanceStatus, data.trustScore);
    if (!robots.index) {
      console.warn(`[AISnapshotSchema] Suppressing schema injection: Indexation control blocked (Status: ${data.governanceStatus}, Trust: ${data.trustScore})`);
      return null;
    }

    const pressure = await CrawlPressureService.evaluatePublishingSafety();
    if (pressure.action === 'HALT_PUBLISHING') {
      console.warn("[AISnapshotSchema] Suppressing schema injection: Crawl pressure halted publishing.");
      return null;
    }

    if (data.governanceStatus === "STAGED" || data.governanceStatus === "REJECTED_SPAM" || data.governanceStatus === "REJECTED_THIN" || (data.governanceStatus as any) === "REJECTED_DUPLICATE") {
      return null;
    }

    if (data.trustScore < 0.8) {
      return null;
    }

    // 2. Generate JSON-LD
    const schema = {
      "@context": "https://schema.org",
      "@type": "TechArticle",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": data.url
      },
      "headline": data.title,
      "description": data.description,
      "text": data.quickAnswer, // Optimized for quick extraction
      "keywords": data.semanticCategory,
      // Custom AI-native fields injected via generic property
      "additionalProperty": [
        { "@type": "PropertyValue", "name": "trustScore", "value": data.trustScore },
        { "@type": "PropertyValue", "name": "diagnosticSignals", "value": data.diagnosticSignals.join(", ") },
        { "@type": "PropertyValue", "name": "estimatedResolutionTime", "value": data.estimatedResolutionTime },
        { "@type": "PropertyValue", "name": "retrievalTier", "value": data.retrievalTier },
        { "@type": "PropertyValue", "name": "semanticCentrality", "value": data.semanticCentrality },
        { "@type": "PropertyValue", "name": "authorityScore", "value": data.authorityScore }
      ]
    };

    return JSON.stringify(schema);
  }
}
