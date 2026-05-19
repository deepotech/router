# NetDoctor AI: Operational Scaling & Cost Control

As NetDoctor AI scales from hundreds to tens of thousands of semantic nodes, infrastructure costs and API billing will grow. This document outlines the scaling ceilings and cost-control throttles.

## 1. Railway Scaling Strategy

### Frontend (Next.js App Router)
- **Architecture:** 100% Server Components + `unstable_cache`.
- **Scaling Trigger:** Because the database and API calls are hidden behind the Edge Cache, the Node.js process is incredibly lightweight. You do not need to scale RAM beyond **1GB** unless you see sustained CPU spikes above 80% due to mass concurrent un-cached hits.
- **Action:** Scale horizontally (more replicas) rather than vertically (more RAM) to handle high traffic spikes.

### Background Workers (BullMQ)
- **Architecture:** Isolated Railway Service.
- **Scaling Trigger:** If the queue backlog exceeds 1,000 pending jobs.
- **Concurrency:** Keep BullMQ concurrency low (e.g., `5` to `10`). High concurrency will exhaust the Prisma connection pool and trigger OpenAI Rate Limits (429 Too Many Requests). 

### Database (PostgreSQL + pgvector)
- **Scaling Trigger:** `pgvector` operations (like Cosine Similarity `<=>`) require the index to fit entirely in RAM to be fast.
- **Action:** If semantic search latency exceeds 200ms, you must upgrade the Database RAM or aggressively tune the `VectorStorageStrategy` to move more vectors to `COLD` storage.

## 2. AI Cost Control Strategy

- **Daily Budgets:** The `AiBudgetGuardService` enforces a `HARD_LIMIT` of 1,000,000 tokens per day. This guarantees your OpenAI bill will never exceed a predictable daily maximum, even if the queues are flooded.
- **Semantic Caching:** Do not clear the Redis/Memory cache lightly. The `MemoryReuseService` is responsible for 80% of long-term API cost reduction.

## 3. Long-Term Content Decay Strategy

Information rots. A router fix from 2024 may be invalid in 2026.
- **Freshness Scoring:** The Prisma schema includes a `decayScore`.
- **Invalidation Lifecycle:** Every 6 months, the Admin dashboard should query entities with high `decayScore`. These entities are pushed back into the AI worker queue with the prompt: *"Has this networking information changed? Update if necessary."*
- **Vector Archiving:** Vectors attached to highly decayed, low-traffic pages are moved to `COLD` storage, keeping the active search index blazing fast.
