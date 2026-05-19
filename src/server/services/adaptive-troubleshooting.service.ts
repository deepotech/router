export interface TroubleshootingNode {
  id: string;
  question: string;
  options: { label: string; nextNodeId: string | null; actionId?: string }[];
}

export class AdaptiveTroubleshootingService {
  /**
   * Generates a dynamic, branching troubleshooting tree.
   * If historical success indicates a specific probabilistic fix,
   * it promotes that branch to the top.
   */
  static buildAdaptiveTree(
    baseTree: TroubleshootingNode[],
    historicalSuccessData: Record<string, number> // actionId -> successRate
  ): TroubleshootingNode[] {
    if (!baseTree || baseTree.length === 0) return [];

    // Clone the tree to avoid mutating the base template
    const adaptiveTree = JSON.parse(JSON.stringify(baseTree)) as TroubleshootingNode[];

    // Iterate through nodes and sort options based on historical success of actions
    for (const node of adaptiveTree) {
      node.options.sort((a, b) => {
        const successA = a.actionId ? historicalSuccessData[a.actionId] || 0 : 0;
        const successB = b.actionId ? historicalSuccessData[b.actionId] || 0 : 0;
        
        // Higher success rate floats to the top
        return successB - successA;
      });
    }

    return adaptiveTree;
  }
}
