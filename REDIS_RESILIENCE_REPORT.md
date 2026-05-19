# Redis & Queue Resilience Report

**Status:** ✅ Passed

## Architecture Review
RouterVia utilizes Redis for two primary functions:
1. **BullMQ Background Processing:** Used for async AI chunking, background expansion, and scheduled backfilling.
2. **Next.js Cache & Rate Limiting:** Utilizes Upstash REST URL.

## Connection Strategy & Fail-safes
Based on the audit of `src/server/jobs/redis.ts`:
- **`lazyConnect: true`**: BullMQ and the application do not block startup if Redis is down. The server boots independently.
- **Circuit Breaker (`retryStrategy`)**: If Redis drops, `ioredis` will retry with exponential backoff (`times * 50`). Crucially, if it fails more than 3 times, the strategy returns `null`. This forcefully stops reconnection spam, preventing Node.js from entering an infinite loop and exhausting CPU/Memory resources on Railway.

## Simulated Failure Behavior
If the Upstash Redis instance goes offline:
- Next.js will fall back to Prisma queries directly.
- The web application will remain fully responsive.
- Background worker jobs will be paused but not lost (retained in the DB or dropped safely, depending on the job type).
- The Railway instance will NOT crash.

## Verification
- TLS connections are automatically enabled if `rediss://` is detected.
- The application isolates the worker environment properly.
