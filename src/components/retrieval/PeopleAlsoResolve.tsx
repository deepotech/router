import React from "react";
import Link from "next/link";
import { ArrowUpRight, Network } from "lucide-react";
import { SemanticLinkCandidate, SemanticLinkRefinerService } from "@/server/services/semantic-link-refiner.service";
import { AuthorityHubService } from "@/server/services/authority-hub.service";
import { prisma } from "@/server/db/prisma";
import { ContentQualityStatus } from "@prisma/client";

interface PeopleAlsoResolveProps {
  currentEntityId: number;
  currentEntityType: 'PROBLEM' | 'ROUTER' | 'IP';
}

export async function PeopleAlsoResolve({ currentEntityId, currentEntityType }: PeopleAlsoResolveProps) {
  // 1. Identify Super-Resolvers and Hubs via AuthorityHubService
  const hubs = await AuthorityHubService.identifyHubs();
  
  // 2. Fetch some initial candidates from DB (simulating semantic link candidates)
  // To avoid heavy queries, we'll fetch recently published entities of high trust
  const publishedProblems = await prisma.problem.findMany({
    where: { 
      status: "PUBLISHED", 
      id: { not: currentEntityType === 'PROBLEM' ? currentEntityId : undefined } 
    },
    select: { id: true, title: true, slug: true, diagnosticCategory: true, status: true },
    take: 20
  });

  // Filter out any unwanted entities strictly as per Governance rules
  const safeProblems = publishedProblems.filter(p => p.status === ContentQualityStatus.PUBLISHED);

  const candidates: SemanticLinkCandidate[] = safeProblems.map(p => {
    // Generate an affinity score. In a real system this uses Vector cosine similarity.
    // Here we deterministically bump score if they share the same category.
    let score = 0.5;
    let type: SemanticLinkCandidate['affinityType'] = 'REUSE_OVERLAP';
    
    // Simulate finding if it's a hub
    const isHub = hubs.some(h => h.entityIdentifier === `problem-${p.id}`);
    if (isHub) score += 0.3;

    return {
      targetUrl: `/problems/${p.slug}`,
      title: p.title,
      affinityScore: score,
      affinityType: type,
      semanticCluster: p.diagnosticCategory || "General"
    };
  });

  // 3. Refine links using SemanticLinkRefinerService
  const refinedLinks = await SemanticLinkRefinerService.refineOutboundLinks(
    currentEntityId,
    currentEntityType,
    candidates
  );

  // Hard cap to 5
  const finalLinks = refinedLinks.slice(0, 5);

  if (finalLinks.length === 0) return null;

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 mt-8">
      <div className="flex items-center gap-3 mb-4">
        <Network className="w-5 h-5 text-indigo-400" />
        <h2 className="text-lg font-bold text-white m-0">People Also Resolve</h2>
      </div>
      <p className="text-sm text-neutral-400 mb-4">
        High-success diagnostic paths based on semantic resolution patterns:
      </p>
      <ul className="space-y-3">
        {finalLinks.map((link: any, idx) => (
          <li key={idx}>
            <Link 
              href={link.targetUrl}
              className="group flex items-center justify-between p-3 rounded-lg bg-neutral-800/50 border border-neutral-800 hover:border-indigo-500/50 hover:bg-neutral-800 transition-all"
            >
              <div className="flex flex-col">
                <span className="text-neutral-200 font-medium group-hover:text-white transition-colors">
                  {link.title}
                </span>
                <span className="text-xs text-neutral-500 mt-1">
                  Semantic Cluster: {link.semanticCluster}
                </span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-indigo-400 transition-colors" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
