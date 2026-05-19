# NetDoctor AI: Indexing & Rollout Strategy

This strategy ensures NetDoctor AI transitions from 0 indexed pages to a massive Semantic Authority Platform without triggering Google's "thin content" penalties or crawl instability.

## 1. Indexing Rollout Stages

To prevent Google from classifying the platform as an "AI spam flood," we will execute a staged rollout governed by the `RolloutControlService`.

### Stage 1: The Authority Seed (0 - 50 Pages)
- **Goal:** Establish initial topical authority.
- **Content:** The top 10 most popular router brands, their default IPs, and the absolute most common troubleshooting problems (e.g., "Blinking Orange Light", "Cannot Access 192.168.1.1").
- **Governance Gate:** Trust Score `> 0.95`. Zero hallucination tolerance.
- **Pacing:** Release 5 pages per day.
- **Action:** Submit `sitemap.xml` via Google Search Console. Wait until at least 20 pages are indexed and ranking before moving to Stage 2.

### Stage 2: The Semantic Clusters (50 - 200 Pages)
- **Goal:** Prove topic depth. 
- **Content:** Expand upon the Stage 1 routers. Generate specific problem pages for specific firmware versions of those routers.
- **Governance Gate:** Trust Score `> 0.90`.
- **Pacing:** Release 15 pages per day.
- **Rollback Criteria:** If Search Console shows a spike in "Crawled - currently not indexed," **pause publishing**. This indicates Google thinks the content is duplicate or low value.

### Stage 3: The Massive Expansion (200 - 1000 Pages)
- **Goal:** Scale the Knowledge Graph.
- **Content:** Long-tail router models, obscure error codes, and comparative ISP router setups.
- **Governance Gate:** Trust Score `> 0.85`.
- **Pacing:** Release 50 pages per day.

### Stage 4: Continuous Scale (1000+ Pages)
- **Goal:** Total ecosystem dominance.
- **Content:** Fully programmatic, continuous generation triggered by new search trends.

---

## 2. Google Trust Building Strategy

Google no longer trusts flat programmatic SEO sites. Trust must be earned through **Deterministic Authority**.

- **Semantic Hub Prioritization:** Do not publish random, disconnected problems. If we publish "Netgear Nighthawk Setup", we must immediately publish the 5 related troubleshooting nodes so the `RelatedEntityGraph` can interlink them. Google crawls links; dense internal linking proves deep knowledge.
- **High-Centrality Entities First:** The `SemanticCentralityService` identifies hubs. Entities like `192.168.1.1` should be treated as pillar pages. They must have the highest `semanticWeight` in the database.

---

## 3. Search Quality Governance

- **Trust Score Thresholds:** Any generated content scoring below `0.80` is permanently locked in the `STAGED` status and marked with `noindex`.
- **Duplicate Similarity:** If the `CrawlRiskService` detects > `0.5` semantic overlap with an existing published page, the new page is rejected. We will never publish "How to fix red light on Router A" and "Fixing red light on Router A" as separate URLs. They must be merged or distinctly targeted.
