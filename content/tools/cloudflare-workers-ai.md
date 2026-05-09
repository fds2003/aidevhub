---
slug: cloudflare-workers-ai
title: "Cloudflare Workers AI - Run AI Models at the Edge"
description: "Run open-source AI models globally with no GPU setup required. Llama 3, Mistral, Stable Diffusion and more. 10k free neurons/day. OpenAI alternative."
category: Cloudflare
tags: [cloudflare, workers-ai, edge-ai, llama3, openai-alternative, replicate-alternative, stable-diffusion, local-llm-alternative]
website: https://developers.cloudflare.com/workers-ai/
pricing: free
logo: /images/tools/cloudflare-ai.png
features:
  - "10k free neurons/day"
  - "Run models at the edge"
  - "No GPU setup required"
  - "Open source models only"
  - "Llama 3, Mistral, Stable Diffusion"
  - "Whisper, BAAI Embeddings"
pros:
  - "No GPU infrastructure to manage"
  - "Low latency from edge deployment"
  - "No data leaves Cloudflare"
  - "Free tier is generous"
  - "Privacy focused"
cons:
  - "Fewer models than OpenAI"
  - "No fine-tuning (yet)"
  - "Inference speed varies by region"
alternatives:
  - OpenAI API
  - Replicate
  - AWS Bedrock
  - Hugging Face Inference API
  - Groq
createdAt: 2026-05-09
updatedAt: 2026-05-09
publishedAt: 2026-05-09
---

# Cloudflare Workers AI

## AI That Runs Where Your Users Are

OpenAI: $0.002/token for GPT-4. Plus your data goes to their servers.

Cloudflare Workers AI: Run the same models at the edge, free tier included.

## AI vs OpenAI

| Feature | Cloudflare AI | OpenAI |
|---------|---------------|--------|
| Price | **$0** (free tier) | $0.03-0.06/token |
| Data Privacy | **Never leaves CF** | Goes to OpenAI |
| Latency | **Edge (~50ms)** | Remote (~200ms+) |
| Models | Open source | Proprietary |
| Fine-tuning | Coming | Available |

## Available Models

### Text Generation
- **@cf/meta/llama-3-8b-instruct** - Meta's latest, rivals GPT-4
- **@cf/meta/llama-3-70b-instruct** - The big one
- **@cf/mistral/mistral-7b-instruct-v0.2** - Fast and capable
- **@cf/thebloke/decilm-7b-instruct-awq** - Quantized for speed

### Image Generation
- **@cf/stabilityai/stable-diffusion-xl-base-1.0** - SDXL at the edge
- **@cf/stabilityai/text-to-image** - Text to image

### Speech
- **@cf/openai/whisper** - Transcribe audio
- **@cf/meta/en-decode** - Speech synthesis

### Embeddings
- **@cf/baai/bge-base-en-v1.5** - Semantic search

## Quick Start

```javascript
export default {
  async fetch(request, env) {
    const response = await env.AI.run('@cf/meta/llama-3-8b-instruct', {
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: 'Why use Cloudflare Workers AI?' }
      ]
    })
    return Response.json(response)
  }
}
```

## The Verdict

Workers AI is for developers who want AI without the vendor lock-in, privacy concerns, and premium pricing of OpenAI.

**Stop paying OpenAI. Use Workers AI.**
