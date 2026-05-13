---
title: "LLM Inference Walkthrough Using Llama — A Quick Start Guide"
slug: "llm-inference-walkthrough"
description: "Step-by-step walkthrough of LLM inference using Meta Llama models, covering tokenization, forward pass, sampling strategies, and optimization techniques."
category: "ai-news"
tags: [chatgpt, ai, llm, prompt-engineering, programming]
readingTime: "27 min"
createdAt: "2024-01-08T16:00:00.000Z"
publishedAt: "2024-01-08T16:00:00.000Z"
featured: false
---
# LLM Inference Walkthrough Using Llama

LLM inference converts input text to output text through forward passes. Tokenization splits text into token IDs using BPE. The model processes tokens through transformer layers, producing logits for each vocabulary position. Softmax converts logits to probabilities. Sampling selects the next token. The process repeats until a stop token or max length.

## Key Optimization: KV-Cache

The KV-cache stores key-value pairs from previous attention computations. For token N, only the new Q, K, V need computation — previous K, V are reused. This reduces per-token computation from O(N) to O(1) in the attention layer.

## Sampling Strategies

- Temperature: scales logits before softmax. Lower (0.1) = deterministic, higher (0.9) = creative
- Top-k: sample only from k highest probability tokens
- Top-p: sample from the smallest set whose cumulative probability exceeds p

## Performance

First token (prefill) is compute-bound. Subsequent tokens (decode) are memory-bandwidth-bound. This asymmetry drives batching and speculative decoding strategies.
