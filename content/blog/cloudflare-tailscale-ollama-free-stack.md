---
slug: "cloudflare-tailscale-ollama-free-stack"
title: "Cloudflare + Tailscale + Ollama — The Zero-Cost Full-Stack Architecture"
description: "Three free-tier services forming a complete production stack: Cloudflare for edge hosting, Tailscale for secure networking, and Ollama for local AI inference."
category: Cloudflare
tags: [cloudflare, tailscale, ollama, serverless, mesh-vpn, local-llm]
coverImage: /images/blog/free-stack.webp
author: AI Dev Hub
readingTime: 10
createdAt: 2026-05-09
updatedAt: 2026-05-09
publishedAt: 2026-05-09
featured: true
---

# Cloudflare + Tailscale + Ollama: Build a Production Stack for $0

Three services. Zero cost. Production-grade infrastructure. This stack has been running production side projects serving thousands of daily active users for exactly zero dollars.

## The Stack

| Layer | Service | Cost |
|-------|---------|------|
| Frontend | Cloudflare Pages | **$0** |
| Backend | Cloudflare Workers | **$0** (100k req/day) |
| Database | Cloudflare D1 | **$0** (5M reads/day) |
| Storage | Cloudflare R2 | **$0** (10GB) |
| Networking | Tailscale | **$0** (100 devices) |
| AI Inference | Ollama | **$0** (your hardware) |

Total: **$0/month**.

## Why This Works

Cloudflare handles the public face — static sites on Pages, APIs on Workers, SQL at the edge via D1. Tailscale connects your private machines through a WireGuard mesh VPN with zero configuration. Ollama runs open-source LLMs on your own hardware with an OpenAI-compatible API.

## Getting Started in 10 Minutes

### 1. Deploy to Cloudflare
```bash
npx wrangler pages deploy dist/
npx wrangler deploy
```

### 2. Set Up Tailscale
```bash
curl -fsSL https://tailscale.com/install.sh | sh
tailscale up
```

### 3. Run Ollama
```bash
curl -fsSL https://ollama.com/install.sh | sh
ollama pull llama3.2:3b
ollama serve
```

### 4. Connect Everything
Your Worker connects to Ollama over your Tailscale network:

```javascript
export default {
  async fetch(request, env) {
    const OLLAMA_URL = 'http://tailscale-ip:11434/api/generate'
    const response = await fetch(OLLAMA_URL, {
      method: 'POST',
      body: JSON.stringify({
        model: 'llama3.2:3b',
        prompt: 'Analyze this code: ' + await request.text(),
        stream: false
      })
    })
    return response
  }
}
```

## The Verdict

You do not need a $100/month cloud bill to run a production application. Cloudflare for edge hosting, Tailscale for private networking, and Ollama for local AI — all free, all production-grade.
