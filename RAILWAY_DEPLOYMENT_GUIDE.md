# RouterVia — Railway Deployment Guide

**Platform:** https://railway.app  
**Domain:** https://routervia.com  
**Stack:** Next.js 16 · PostgreSQL (Neon) · Redis (Upstash) · BullMQ

---

## Architecture Overview

```
Railway Project
├── [Service] web     — Next.js app (npm run start)
└── [Service] worker  — BullMQ content worker (npm run worker)

External
├── Neon PostgreSQL   — Primary database
├── Upstash Redis     — BullMQ queue + semantic cache
└── routervia.com     — Custom domain (Cloudflare or direct)
```

---

## Step 1 — Create Railway Project

1. Go to https://railway.app → **New Project**
2. Select **"Deploy from GitHub repo"**
3. Connect your GitHub account and select the `routervia` repository
4. Railway will detect Next.js automatically via Nixpacks

---

## Step 2 — Create the Web Service

Railway will auto-create a service. Configure it:

| Setting | Value |
|---------|-------|
| **Service Name** | `web` |
| **Build Command** | `npm run build` |
| **Start Command** | `npm run start` |
| **Root Directory** | `/` (default) |
| **Health Check Path** | `/` |
| **Health Check Timeout** | `30s` |

---

## Step 3 — Create the Worker Service

Add a **second service** in the same project for BullMQ:

1. Click **"+ New"** → **"GitHub Repo"** → same repo
2. Configure:

| Setting | Value |
|---------|-------|
| **Service Name** | `worker` |
| **Build Command** | `npm run build` |
| **Start Command** | `npm run worker` |
| **Root Directory** | `/` |
| **Health Check** | *(disabled — worker has no HTTP)* |

> **Important:** Worker and web should share the same environment variables group (or copy all vars to both).

---

## Step 4 — Set Environment Variables

Set these in **both** `web` and `worker` services (or use a shared variable group):

### Required — App Will Not Start Without These
```
DATABASE_URL=postgresql://user:password@host/dbname?sslmode=require
NEXT_PUBLIC_APP_URL=https://routervia.com
NODE_ENV=production
```

### Required — AI Features
```
OPENAI_API_KEY=sk-or-v1-...
# If using OpenRouter:
OPENAI_BASE_URL=https://openrouter.ai/api/v1
```

### Required — BullMQ Workers + Redis Cache
```
REDIS_URL=rediss://default:password@native-titmouse-xxx.upstash.io:6379
UPSTASH_REDIS_REST_URL=https://native-titmouse-xxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-token-here
```

### Optional — Analytics
```
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

> **Never commit these to Git.** Use Railway's env var UI.

---

## Step 5 — Connect PostgreSQL

RouterVia uses **Neon** (external managed PostgreSQL):

1. Go to https://neon.tech and create a project
2. Copy the connection string (with `?sslmode=require`)
3. Set it as `DATABASE_URL` in Railway

### Run Migrations on First Deploy
After first deploy completes, open Railway shell or run locally:
```bash
DATABASE_URL=<prod_url> npx prisma migrate deploy
```

Or add to Railway's **Deploy Hook** (one-time):
```bash
npx prisma migrate deploy
```

---

## Step 6 — Connect Redis (Upstash)

RouterVia uses **Upstash** (serverless Redis):

1. Go to https://upstash.com → Create database → Select TLS
2. Copy:
   - **Redis URL** (`rediss://...`) → `REDIS_URL`
   - **REST URL** → `UPSTASH_REDIS_REST_URL`
   - **REST Token** → `UPSTASH_REDIS_REST_TOKEN`

> **Fail-open:** If Redis is unavailable, the app falls back to PostgreSQL search. Workers will fail to start gracefully and Railway will retry.

---

## Step 7 — Connect Custom Domain

1. In the `web` service → **Settings** → **Custom Domains**
2. Add `routervia.com` and `www.routervia.com`
3. Railway provides a target hostname (e.g. `xxx.up.railway.app`)
4. In your DNS provider (Cloudflare):
   - `routervia.com` → CNAME → `xxx.up.railway.app` (proxied)
   - `www.routervia.com` → CNAME → `xxx.up.railway.app` (proxied)
5. SSL is automatically provisioned by Railway

---

## Step 8 — Build & Deploy

Railway auto-deploys on every `git push` to `main`. To trigger manually:

```bash
git push origin main
```

Or use the Railway CLI:
```bash
npx railway up
```

---

## Step 9 — Verify Deployment

After deploy completes, verify:

```
✅ https://routervia.com               → 200 OK
✅ https://routervia.com/sitemap.xml   → valid XML
✅ https://routervia.com/robots.txt    → correct disallow rules
✅ https://routervia.com/routers       → renders router list
✅ https://routervia.com/tools/ip-checker → functional tool
```

Check response headers:
```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Strict-Transport-Security: max-age=31536000
```

---

## Health Checks

| Endpoint | Purpose |
|----------|---------|
| `GET /` | Main health check (used by Railway) |
| `GET /api/observability` | Internal telemetry (noindex, admin only) |
| `GET /sitemap.xml` | Confirms static gen is working |

---

## Common Railway Pitfalls

| Issue | Cause | Fix |
|-------|-------|-----|
| Build fails with EPERM | Prisma DLL locked on Windows | Happens only locally; Railway runs Linux |
| `MODULE_NOT_FOUND` for tsx | `tsx` not in dependencies | Added to `devDependencies`, Nixpacks installs dev deps at build |
| Worker crashes on start | Missing `REDIS_URL` | Set `REDIS_URL` env var in worker service |
| App serves `localhost` URLs | `NEXT_PUBLIC_APP_URL` not set | Must be set to `https://routervia.com` in Railway |
| Prisma schema error | Migrations out of sync | Run `prisma migrate deploy` after deploy |
| 502 Bad Gateway | App not ready yet | Wait 60s for cold start; check Railway logs |

---

## Rollback Instructions

### Option 1 — Git Revert
```bash
git revert HEAD
git push origin main
```
Railway auto-deploys the reverted commit.

### Option 2 — Railway Deployments Tab
1. Go to service → **Deployments**
2. Find the last working deployment
3. Click **"Redeploy"**

### Option 3 — Environment Variable Rollback
If a broken env var caused the issue:
1. Go to service → **Variables**
2. Fix/restore the value
3. Trigger redeploy

---

## Deployment Checklist

### Pre-Deploy
- [ ] `npm run build` passes locally
- [ ] `npm run typecheck` passes with 0 errors
- [ ] All env vars set in Railway (web + worker)
- [ ] `DATABASE_URL` points to production Neon DB
- [ ] `NEXT_PUBLIC_APP_URL` is `https://routervia.com`
- [ ] `NODE_ENV` is `production`

### Post-Deploy
- [ ] Homepage loads at `https://routervia.com`
- [ ] `https://routervia.com/sitemap.xml` returns valid XML
- [ ] `https://routervia.com/robots.txt` disallows `/admin/`
- [ ] Router pages render (e.g. `/routers/tp-link`)
- [ ] Search returns results (`/search?q=tp-link`)
- [ ] Tools work (IP Checker, DNS Checker)
- [ ] No `netdoctor` or `localhost` references in page source
- [ ] Security headers present in response

---

## Worker Deployment Notes

The worker service runs **independently** from the web server:

- It connects to Redis via `REDIS_URL` on startup
- If Redis is unavailable, it logs a warning and Railway retries (max 3 times)
- It processes `content-generation` queue jobs (AI content backfill)
- **Not required for core search functionality** — only needed for AI content generation

To check worker health in Railway logs:
```
🚀 [Worker] RouterVia Content Worker starting...
[Worker] Redis: rediss://***@host:6379
[Worker] Listening for jobs on queue: content-generation
```
