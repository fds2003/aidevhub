---
slug: cloudflare-kv
title: "Cloudflare KV - Global Key-Value Store"
description: "The global key-value store that reads in milliseconds. 1M free reads/day, built for high-read workloads. Redis alternative that runs at the edge."
category: Cloudflare
tags: [cloudflare, cloudflare-kv, kv-store, key-value, redis-alternative, edge-cache, global-cache]
website: https://developers.cloudflare.com/kv/
pricing: free
logo: /images/tools/cloudflare-kv.png
features:
  - "1M free reads per day"
  - "Global replication"
  - "Millisecond reads"
  - "Simple key-value API"
  - "Namespace isolation"
  - "Works with Workers"
pros:
  - "Truly global - no CDN warm-up"
  - "Infinite scale reads"
  - "No connection management"
  - "Perfect for caching"
  - "Free tier is generous"
cons:
  - "Eventual consistency (reads can lag)"
  - "No complex queries"
  - "Limited to 25MB per value"
  - "Write latency ~60s to replicate"
alternatives:
  - Redis
  - Upstash Redis
  - PlanetScale Branching
  - AWS DynamoDB
createdAt: 2026-05-09
updatedAt: 2026-05-09
publishedAt: 2026-05-09
---

# Cloudflare KV

## Redis for the Rest of Us

Redis is great, but:
- You need to manage the server
- Connection pooling is a pain
- Regional only - not truly global
- Expensive at scale

Cloudflare KV is Redis... but better.

## KV vs Redis

| Feature | Cloudflare KV | Redis |
|---------|---------------|-------|
| Setup | **Zero config** | Manageserver |
| Global | **Yes - 30+ regions** | Single region |
| Reads | **~20ms** | ~1ms |
| Connections | **Unlimited** | Pooled |
| Persistence | Built-in | Config needed |
| Cost | **$0** | $50+/month |

## Perfect Use Cases

### 1. Feature Flags
```javascript
// Store flags globally, read instantly
const flags = await env.FLAGS.get('feature-flags', 'json')
```

### 2. User Sessions
```javascript
// Sessions available globally, no Redis cluster needed
await env.SESSIONS.put(`session:${userId}`, sessionData)
```

### 3. Cache Layer
```javascript
// Cache API responses, refresh daily
const cached = await env.CACHE.get(`api:${endpoint}`)
if (!cached) {
  const fresh = await fetchFromAPI()
  await env.CACHE.put(`api:${endpoint}`, fresh, { expirationTtl: 86400 })
}
```

### 4. Simple Leaderboards
```javascript
await env.SCORES.put(`score:${gameId}:${rank}`, playerData)
```

## The Verdict

KV is perfect for high-read, low-write data. It's not Redis, but it's **simpler, cheaper, and truly global**.

**Stop managing Redis clusters. Use KV.**
