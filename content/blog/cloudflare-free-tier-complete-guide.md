---
slug: "cloudflare-free-tier-complete-guide"
title: "Complete Guide to Cloudflare Free Tier Resources"
description: "Detailed breakdown of Cloudflare Workers, KV, Pages, R2, and D1 free tier limits — with code examples for reverse proxy, API acceleration, edge computing, and static hosting."
category: Cloudflare
tags: [cloudflare, free-tier, workers, pages, d1, r2, kv, serverless]
coverImage: /images/blog/cloudflare-free-guide.png
author: AI Dev Hub
readingTime: 12
createdAt: 2026-05-09
updatedAt: 2026-05-09
publishedAt: 2026-05-09
featured: true
---

# Complete Guide to Cloudflare Free Tier Resources

This guide provides a detailed inventory of every Cloudflare service available on the free tier, with usage limits, code examples, and production considerations.

## Workers — Serverless Functions at the Edge

Cloudflare Workers run JavaScript, Python, Rust, and Go across 300+ data centers.

**Free Tier Limits:**
- 100,000 requests per day
- 10ms CPU time per request
- 1,000 requests per minute burst
- 128MB memory per Worker

**Use Cases:**
- API endpoints and webhooks
- URL rewrites and redirects
- A/B testing middleware
- Authentication proxies

```javascript
// Example: Rate-limiting API gateway
export default {
  async fetch(request, env) {
    const ip = request.headers.get('CF-Connecting-IP')
    const count = await env.KV.get(`rate:${ip}`)
    if (count && parseInt(count) > 100) {
      return new Response('Rate limited', { status: 429 })
    }
    await env.KV.put(`rate:${ip}`, String(parseInt(count || '0') + 1), { expirationTtl: 3600 })
    return fetch(request)
  }
}
```

## KV — Global Key-Value Store

Low-latency key-value storage optimized for high-read workloads.

**Free Tier Limits:**
- 1,000,000 reads per day
- 1,000 writes per day
- 1GB total storage
- 1000 operations per second

## D1 — Serverless SQLite Database

Edge-native relational database with SQLite compatibility.

**Free Tier Limits:**
- 5GB storage
- 5,000,000 read operations per day
- 100,000 write operations per day

```sql
CREATE TABLE posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  body TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## R2 — S3-Compatible Object Storage

Zero-egress object storage wire-compatible with the S3 API.

**Free Tier Limits:**
- 10GB storage
- 1,000,000 read ops/month
- Zero egress fees

## Pages — Static Site Hosting

Unlimited sites with Git integration and preview deployments.

**Free Tier Limits:**
- Unlimited sites and bandwidth
- 500 build minutes/month
- 25MB per file

## Comparison

| Resource | Cloudflare | AWS | Vercel |
|----------|-----------|-----|--------|
| Compute | 100k req/day | 1M req/mo | 100h/mo |
| Database | 5GB D1 | — | — |
| Storage | 10GB R2 | 5GB S3 | — |
| Egress | **$0** | $0.09/GB | $0.15/GB |
| Total | **$0/mo** | ~$50/mo | $20/mo |

## Conclusion

Cloudflare free tier provides enough resources to run production applications serving thousands of users daily — at zero infrastructure cost.
