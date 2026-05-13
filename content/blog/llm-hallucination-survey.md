---
title: "LLM Hallucination Survey — Causes, Evaluation, and Mitigation Strategies"
slug: "llm-hallucination-survey"
description: "Comprehensive survey of hallucination in large language models covering root causes, evaluation benchmarks, detection methods, and mitigation techniques."
category: "ai-news"
tags: [chatgpt, ai, llm, prompt-engineering, programming]
readingTime: "28 min"
createdAt: "2023-09-10T16:00:00.000Z"
publishedAt: "2023-09-10T16:00:00.000Z"
featured: false
---
# LLM Hallucination — Causes, Evaluation, Mitigation

## Causes

Training data gaps, decoding strategy (temperature above 0.7 increases hallucination), attention drift in long contexts, sycophancy bias.

## Benchmarks

TruthfulQA, HaluEval, FActScore, RAGTruth.

## Mitigation

RAG grounding is the most effective practical method. Post-hoc checks with self-consistency and citation verification catch 90%+ of harmful hallucinations. Complete elimination remains an open problem.
