// @ts-nocheck
import { prisma } from "../db/prisma";

export interface SaturationMetrics {
  entityType: 'BRAND' | 'PROBLEM' | 'IP';
  entityIdentifier: string;
  generatedCount: number;
  maxRecommended: number;
  saturationRatio: number;
  action: 'SATURATED' | 'UNDERSERVED' | 'BALANCED';
}

export class EntitySaturationService {
  /**
   * Evaluates if a given entity is over-represented in the generated dataset.
   * Prevents graph imbalance (e.g., 500 pages on TP-Link, 0 on ASUS).
   */
  public static async analyzeBrandSaturation(brandName: string): Promise<SaturationMetrics> {
    const brand = await prisma.brand.findUnique({
      where: { name: brandName },
      include: { 
        routerModels: {
          where: { status: { in: ['PUBLISHED', 'STAGED'] } }
        }
      }
    });

    if (!brand) throw new Error("Brand not found");

    const generatedCount = brand.routerModels.length;
    
    // Heuristic max: we don't want more than 30% of our total allowed Stage 1 size (300 pages) 
    // dedicated to a single brand right now, so max ~50 models per brand initially.
    const maxRecommended = 50; 
    
    const saturationRatio = generatedCount / maxRecommended;

    let action: 'SATURATED' | 'UNDERSERVED' | 'BALANCED' = 'BALANCED';
    if (saturationRatio >= 0.9) action = 'SATURATED';
    else if (saturationRatio <= 0.2) action = 'UNDERSERVED';

    if (action === 'SATURATED') {
      console.warn(`[EntitySaturation] Brand ${brandName} is highly saturated (${(saturationRatio * 100).toFixed(1)}%). Consider shifting generation budget.`);
    }

    return {
      entityType: 'BRAND',
      entityIdentifier: brandName,
      generatedCount,
      maxRecommended,
      saturationRatio,
      action
    };
  }

  /**
   * Scans all brands and returns the most underserved ones to target next.
   */
  public static async getUnderservedBrands(limit = 3): Promise<string[]> {
    const brands = await prisma.brand.findMany({
      include: {
        _count: {
          select: { routerModels: { where: { status: { in: ['PUBLISHED', 'STAGED'] } } } }
        }
      }
    });

    const metrics = brands.map(b => ({
      name: b.name,
      count: b._count.routerModels
    })).sort((a, b) => a.count - b.count);

    return metrics.slice(0, limit).map(m => m.name);
  }
}
