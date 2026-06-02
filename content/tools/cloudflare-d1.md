---
slug: cloudflare-d1
title: "Cloudflare D1 - Serverless SQLite at the Edge"
description: Serverless SQLite database running on Cloudflare edge network with 5M free reads/day, global replication, and zero cold starts.
category: Cloudflare
tags: [cloudflare, cloudflare-d1, d1-database, serverless-sqlite, edge-database, planetscale-alternative, supabase-alternative]
website: https://developers.cloudflare.com/d1/
pricing: free
logo: /images/tools/cloudflare-d1.webp
features:
  - "SQLite at the edge"
  - "5M free reads per day"
  - "Global replication"
  - "Zero cold starts"
  - "Automatic backups"
  - "TypeScript ORM support"
pros:
  - "No connection limits"
  - "True serverless - no DB management"
  - "Works perfectly with Workers"
  - "Huge free tier"
  - "SQLite simplicity"
cons:
  - "SQLite limitations (single writer)"
  - "No real-time subscriptions"
  - "Smaller than PlanetScale"
alternatives:
  - PlanetScale
  - Supabase
  - Neon
  - Turso
  - AWS Aurora
createdAt: 2026-05-09
updatedAt: 2026-05-09
publishedAt: 2026-05-09
---

# Cloudflare D1

## Serverless SQLite That Actually Works

PlanetScale charges you for **database branches**. Supabase charges you for **connections**. Neon charges you for **storage**.

Cloudflare D1 says: "Just use SQLite, it's free."

## D1 vs The Competition

| Feature | Cloudflare D1 | PlanetScale | Supabase | Neon |
|---------|---------------|-------------|----------|------|
| Free Reads | **5M/day** | 10M/month | 2M/month | 3M/month |
| Free Writes | **100K/day** | Limited | Limited | Limited |
| Pricing | **$0** | $29+/mo | $25+/mo | $9+/mo |
| Connection Limit | **Unlimited** | 1 per branch | 60 max | Limited |
| Edge Ready | **Yes** | No | No | No |

## The SQLite Advantage

SQLite is:
- **Battle-tested**: 20+ years of production use
- **Simple**: No server to manage
- **Fast**: Local-first, no network latency
- **Portable**: Ship your database with your code

## Quick Start

```bash
# Create database
wrangler d1 create my-db

# Run migrations
wrangler d1 execute my-db --file=./schema.sql

# Query from Workers
const result = await env.DB.prepare(
  'SELECT * FROM users WHERE id = ?'
).bind(userId).first()
```

## When to Use D1

✅ **Perfect for:**
- User profiles and settings
- Blog CMS data
- E-commerce products
- Analytics events
- Anything that fits SQLite

❌ **Maybe not:**
- High-write apps (>10k writes/day)
- Real-time subscriptions
- Complex joins across huge datasets

## The Verdict

D1 is the database you want when you're tired of managing database servers. It's free, it's fast, and it works at the edge.

**Stop paying for PlanetScale. Use D1.**
