# NetDoctor AI: Production Operations Playbook

This playbook outlines the standard operating procedures for resolving incidents, scaling the infrastructure, and maintaining semantic integrity for the NetDoctor AI platform.

## 1. Outage Response

### OpenAI Outage Response
1. The **AI Circuit Breaker** will automatically trip after 5 consecutive timeouts or 5xx errors.
2. The system enters **Degradation Mode**. All pending AI jobs will be routed to the Dead-Letter Queue (DLQ).
3. **Action:** Monitor OpenAI status (status.openai.com). Once resolved, manually trigger a replay of the DLQ via the Bull Board dashboard.

### Redis Failure Response
1. If Railway Redis crashes, the workers will automatically pause. Next.js cache will fall back to stale data.
2. **Action:** Restart the Redis container via the Railway Dashboard. Once active, the workers will automatically reconnect and resume processing.

### pgvector Degradation
1. If semantic retrieval latency spikes above 500ms, the vector index requires maintenance.
2. **Action:** Connect to the Neon database and manually rebuild the index:
   \`\`\`sql
   REINDEX INDEX "SemanticChunks_embedding_idx";
   \`\`\`

## 2. Crawl Anomaly Response

If Google Search Console reports a massive spike in indexed pages (e.g., 10k+ pages overnight) without governance approval:
1. Trigger the **SEO Kill Switch** immediately via the Admin Operations Command Center.
2. This will freeze the sitemap, pause all AI generation queues, and apply a strict \`X-Robots-Tag: noindex\` to all non-canonical pages.
3. **Action:** Investigate the \`CrawlLockService\` logs to determine how the publish cap was bypassed. Revert recent publications manually if they fail the \`search-quality-baseline\` verification.

## 3. Deployment Rollback

If a new deployment causes catastrophic semantic corruption or worker failure:
1. Engage the **Deployment Freeze Protocol** to prevent further data mutations.
2. Roll back the deployment to the previous stable commit using the Railway Dashboard.
3. If database migrations were involved, you MUST restore the database from the automated Neon snapshot taken prior to the deployment.
4. Unfreeze the deployment once verified stable.

## 4. Railway Scaling Guidance

As the platform scales, follow these limits:
- **Worker Memory:** AI generation workers MUST have at least 1GB of memory. Increase via Railway settings if \`memory-observability\` triggers OOM warnings.
- **Queue Concurrency:** Do not exceed a concurrency of 5 on the AI queue to respect OpenAI rate limits. Scale horizontally by adding more worker replicas, NOT by increasing concurrency per worker.
- **Database Pooling:** Ensure Neon connection pooling is enabled. The Next.js web instances and isolated workers share the same pool; monitor active connections closely.
