---
title: "LoRA Fine-Tuning Illustrated — Low-Rank Adaptation Theory"
slug: "lora-finetuning-illustrated"
description: "Visual explanation of LoRA parameter-efficient fine-tuning covering rank decomposition, adapter design, scaling factors, and practical implementation."
category: "ai-news"
tags: [chatgpt, ai, llm, prompt-engineering, programming]
readingTime: "22 min"
createdAt: "2023-08-21T16:00:00.000Z"
publishedAt: "2023-08-21T16:00:00.000Z"
featured: false
---
# LoRA Fine-Tuning Illustrated

LoRA enables LLM fine-tuning with 10,000x fewer trainable parameters by freezing base weights and injecting low-rank matrices.

## How It Works

Instead of updating W (d x k), LoRA learns A (d x r) and B (r x k) where r=8 is typical. Forward: h = Wx + BAx. The rank r controls expressiveness vs efficiency.

## Why It Works

Pre-trained LLMs have low intrinsic rank — task-specific updates lie in a low-dimensional subspace.

## Multi-Task

LoRA adapters swap at inference without reloading base models, enabling cost-effective multi-tenant serving.
