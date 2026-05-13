---
title: "Domain Adaptation of General LLMs — Enhancing Large Models with Small Domain Models"
slug: "domain-adaptation-llm"
description: "Research paper analysis on techniques for adapting general-purpose LLMs to specialized domains using compact domain-specific models."
category: "ai-news"
tags: [chatgpt, ai, llm, prompt-engineering, programming]
readingTime: "37 min"
createdAt: "2024-04-01T16:00:00.000Z"
publishedAt: "2024-04-01T16:00:00.000Z"
featured: false
---
# Domain Adaptation of General LLMs

Domain adaptation tailors general-purpose LLMs to specialized domains like medicine, law, and finance.

## Three Approaches

1. Continue pre-training on domain text. Adds domain knowledge but requires significant compute (100B+ tokens). Risk of catastrophic forgetting.

2. Domain-specific instruction tuning. More efficient: 1,000-10,000 domain QA pairs. Works best combined with approach 1.

3. Retrieval augmentation with domain knowledge base. Most efficient: no training required, knowledge is always up-to-date, easy to swap domains.

## Combined Approach

A small domain expert model (e.g., BioBERT for biomedical) provides specialized representations. The general LLM queries the domain model for task-specific predictions via adapter or API.

## Results

Combined approaches outperform either method alone by 5-15% on domain-specific benchmarks, with the best results from continue pre-training + instruction tuning + retrieval augmentation.
