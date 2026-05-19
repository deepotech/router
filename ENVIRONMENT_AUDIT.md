# Environment Variables Audit — RouterVia

**Status:** ✅ Codebase Ready | ⚠️ Manual Verification Required on Railway

## Overview
A full audit of the environment variable configuration has been completed to ensure production readiness and domain isolation.

## Required Railway Production Variables
To ensure the system boots correctly and interacts with external services securely, the following variables MUST be present in your Railway UI (`Project` -> `Variables` -> `Shared`):

| Variable | Requirement | Status / Notes |
|----------|-------------|----------------|
| `DATABASE_URL` | `postgresql://...` | **Required.** Must be the pooled Neon connection string. Do not use the direct unpooled URL to prevent "Too many connections" errors. |
| `REDIS_URL` | `rediss://...` | **Required.** Must be the TLS Upstash connection string for BullMQ and runtime caching. |
| `UPSTASH_REDIS_REST_URL` | `https://...` | **Required.** Used by standard REST queries if IORedis TCP fails. |
| `UPSTASH_REDIS_REST_TOKEN` | `AY...` | **Required.** Authentication for the REST cache. |
| `OPENAI_API_KEY` | `sk-...` | **Required.** Used for Tier 2 Semantic Search embeddings. Supports both OpenAI (`sk-...`) and OpenRouter (`sk-or-...`) prefixes. |
| `NEXT_PUBLIC_APP_URL` | `https://routervia.com` | **Required.** Crucial for metadata, canonical tags, and sitemaps. |
| `NEXT_PUBLIC_APP_NAME` | `RouterVia` | **Required.** Used for dynamic SEO titles. |

## Audit Findings

### 1. Domain Isolation (No NetDoctor)
- **Result: PASSED**
- All `netdoctor.ai` and `netdoctorai.com` references have been successfully expunged from the codebase.
- Verified via `grep` search across `src/` and configuration files.

### 2. Localhost Leaks
- **Result: PASSED**
- No `http://localhost:3000` URLs are hardcoded as primary destinations.
- Localhost only exists safely as a fallback for local development (e.g., `process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'`).

### 3. Secret Exposure
- **Result: PASSED**
- No sensitive credentials (API keys, DB URLs) are exposed in client-side code (`NEXT_PUBLIC_` is correctly omitted from secrets).
- Ensure Railway deployment logs are not set to `debug` mode for Prisma to prevent accidental query logging of PII.

---
**ACTION REQUIRED:** Log in to your Railway dashboard and cross-reference the table above. If `NEXT_PUBLIC_APP_URL` is missing, Google will index `routervia.up.railway.app` instead of `routervia.com`.
