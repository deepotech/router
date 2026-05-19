# AI & External Dependency Failure Report

**Status:** ✅ Passed

## Overview
RouterVia relies on OpenAI/OpenRouter for vector embeddings (`text-embedding-3-small`) to power Tier 2 Semantic Search. This report verifies the system's resilience if the AI provider goes offline, rate-limits the app, or if the API key is revoked.

## Graceful Degradation Pipeline
Audited `src/server/services/search-orchestrator.service.ts`:

1. **Tier 1 (Exact/Typo Search):** Uses Prisma and raw SQL (`pg_trgm`). If OpenAI is down, standard queries ("tp link default ip") will STILL process perfectly without hitting the OpenAI API.
2. **Tier 2 (Semantic Embedding):** If Tier 1 fails to find enough results, the Orchestrator calls OpenAI.
   - **Failsafe:** The `openai.embeddings.create` call is wrapped in a strict `try/catch`.
   - **Behavior:** If an error is caught (timeout, 429 rate limit, 500 error), the orchestrator intercepts the crash.
3. **Tier 3 (Honest Fallback):** If Tier 2 fails or is bypassed due to an error, the system seamlessly invokes `FallbackRecommendationService.getGlobalFallbacks()`, returning the most popular hubs.

## Verdict
- **No Blank Screens:** Users will never see an empty search result page or a 500 Server Error due to an OpenAI outage.
- **Operational Continuity:** Even in a total OpenAI outage, the core value proposition of the site (finding IPs, passwords, and exact problem guides) remains 100% operational via Tier 1 SQL.
