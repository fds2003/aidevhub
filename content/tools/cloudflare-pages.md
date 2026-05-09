---
slug: cloudflare-pages
title: "Cloudflare Pages - Free Static Hosting with Infinite Scale"
description: "Deploy unlimited static sites for free. Instant preview deployments, built-in CDN, zero config. The Netlify and Vercel killer."
category: Cloudflare
tags: [cloudflare, cloudflare-pages, static-hosting, vercel-alternative, netlify-alternative, free-hosting, jamstack]
website: https://pages.cloudflare.com/
pricing: free
logo: /images/tools/cloudflare-pages.png
features:
  - "Unlimited sites - all free"
  - "Instant preview deployments"
  - "Built-in global CDN"
  - "Zero config CI/CD"
  - "Custom domains with SSL"
  - "Workers integration"
pros:
  - "Massively generous free tier"
  - "Fastest CDN on the planet"
  - "Perfect DX with Git integration"
  - "Automatic deployments"
  - "Branch previews work great"
cons:
  - "Static only (use Workers for dynamic)"
  - "No server-side rendering by default (use Workers)")
  - "Build minutes limited (500/min on free)"
alternatives:
  - Vercel
  - Netlify
  - GitHub Pages
  - AWS Amplify
createdAt: 2026-05-09
updatedAt: 2026-05-09
publishedAt: 2026-05-09
---

# Cloudflare Pages

## The Hosting Platform That Doesn't Rob You

Vercel: "Hey, pay me $20/month for the privilege of deploying your code."

Cloudflare Pages: "Here's unlimited hosting, global CDN, and preview deployments. It's free."

## Pages vs Vercel vs Netlify

| Feature | Cloudflare Pages | Vercel | Netlify |
|---------|------------------|--------|---------|
| Sites | **Unlimited** | Unlimited | Unlimited |
| Bandwidth | **Unlimited** | 100GB/mo | 100GB/mo |
| Price | **$0** | $20+/mo | $19+/mo |
| CDN | **Built-in** | Fastly | Netlify |
| Previews | **Free** | Free (limited) | Free |
| Custom Domains | **Unlimited** | Unlimited | Unlimited |

## Why Pages Wins

### 1. Zero Egress
No bandwidth limits. Ever. Your site goes viral? Cloudflare doesn't send you a $500 bill.

### 2. Workers Integration
Static site but need an API? Add a `/functions` directory and you get Workers automatically.

### 3. Perfect Preview Deployments
Every PR gets a preview URL. Works out of the box with GitHub/GitLab.

### 4. Fastest CDN
Cloudflare's network is the largest. 200+ cities, <10ms to most users globally.

## Quick Start

```bash
# Connect to Pages
npx wrangler pages project create my-site

# Deploy
npx wrangler pages deploy dist/
```

Or just connect your Git repo and forget about it.

## The Verdict

Pages is what hosting should cost: **free**. No egress fees, no bandwidth anxiety, no surprise bills.

**Stop paying Vercel. Use Pages.**
