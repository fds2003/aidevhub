---
slug: ollama
title: "Ollama - Run LLMs Locally and in the Cloud"
description: Local LLM runtime supporting Llama 3, Mistral, Phi, and 100+ open-source models with OpenAI-compatible API, GPU acceleration, and free cloud inference tier.
category: AI
tags: [ollama, local-llm, llama3, mistral, openai-api, self-hosted, open-source, edge-ai]
website: https://ollama.com/
pricing: free
logo: /images/tools/ollama.webp
features:
  - "Run LLMs locally on your machine"
  - "Free cloud inference"
  - "120B+ models available"
  - "OpenAI-compatible API"
  - "Cross-platform support"
  - "Model library with 100+ models"
pros:
  - "Zero cost for local inference"
  - "No data leaves your machine"
  - "OpenAI API compatibility"
  - "Huge model library"
  - "Free cloud tier is generous"
cons:
  - "Local inference needs decent GPU"
  - "Cloud tier has rate limits"
  - "Mac M-series only for best performance"
alternatives:
  - LM Studio
  - GPT4All
  - vLLM
  - OpenAI API
  - Replicate
createdAt: 2026-05-09
updatedAt: 2026-05-09
publishedAt: 2026-05-09
---

# Ollama

## Local LLMs Made Dead Simple

Ollama is the easiest way to run open-source LLMs on your local machine. Llama 3, Mistral, Phi, Gemma - just pull and run.

## Local Setup

```bash
# Install
curl -fsSL https://ollama.com/install.sh | sh

# Pull a model
ollama pull llama3
ollama pull mistral
ollama pull codellama

# Run it
ollama run llama3
```

## Compare: Local vs Cloud

| Feature | Ollama Local | Ollama Cloud | OpenAI |
|---------|-------------|--------------|--------|
| Cost | **$0** | $0 | $0.03-0.06/token |
| Privacy | **100% local** | Data in cloud | Data in cloud |
| Latency | Depends on GPU | ~200ms | ~200ms |
| Model access | All open source | All open source | GPT-4, etc. |
| Setup | 2 minutes | 2 minutes | 5 minutes |

## The Cloud Tier

Now Ollama has a free cloud tier!

```javascript
// Get API key from https://ollama.com/settings/keys

const response = await fetch('https://api.ollama.com/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    model: 'llama3',
    messages: [
      { role: 'user', content: 'Hello!' }
    ]
  })
});
```

### Cloud Tier Limits

| Limit | Free Tier |
|-------|-----------|
| Concurrent requests | 1 |
| Session quota | 5 hours |
| Weekly quota | 7 days |

### Best for Cloud

- Testing different models quickly
- Running 120B models (needs 80GB+ VRAM locally)
- Quick experiments without GPU setup

## OpenAI API Compatibility

Use Ollama with any OpenAI-compatible tool:

```python
# Python
from openai import OpenAI

client = OpenAI(
    base_url="https://ollama.com/v1",
    api_key="ollama"  # Not used, but required
)

response = client.chat.completions.create(
    model="llama3",
    messages=[{"role": "user", "content": "Hello!"}]
)
```

## Model Recommendations

| Model | Size | Best For |
|-------|------|----------|
| **llama3:8b** | 4.7GB | General tasks, best balance |
| **llama3:70b** | 40GB | Highest quality (needs big GPU) |
| **mistral:7b** | 4.1GB | Fast, efficient |
| **codellama:7b** | 3.8GB | Code generation |
| **phi3:14b** | 7.9GB | Good quality, smaller |
| **gemma:7b** | 4.8GB | Google's model |

## Verdict

Ollama makes local LLM inference accessible to everyone. No more:
- $100/month API bills
- Privacy concerns about sending data to OpenAI
- Waiting in queue for API access

**Pull a model and start building.**
