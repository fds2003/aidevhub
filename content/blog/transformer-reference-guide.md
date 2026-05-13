---
title: "Transformer Quick Reference — Models, Architectures, and Training Methods"
slug: "transformer-reference-guide"
description: "Comprehensive reference guide to transformer model architectures, training methodologies, and key research papers organized by topic."
category: "ai-news"
tags: [chatgpt, ai, llm, prompt-engineering, programming]
readingTime: "19 min"
createdAt: "2023-08-13T16:00:00.000Z"
publishedAt: "2023-08-13T16:00:00.000Z"
featured: false
---
# Transformer Quick Reference — Models, Architectures, and Training Methods

Comprehensive reference organizing transformer research by model family, architectural innovation, and training methodology.

## Model Architectures

**Encoder-Only (BERT family):** BERT, RoBERTa, ELECTRA — optimized for classification, NER, and QA tasks.

**Decoder-Only (GPT family):** GPT, LLaMA, Mistral — designed for generative tasks with autoregressive decoding.

**Encoder-Decoder (T5 family):** T5, BART, Pegasus — suited for translation, summarization, and seq2seq tasks.

## Attention Innovations

- **FlashAttention**: IO-aware exact attention via GPU SRAM tiling
- **Sparse Attention**: O(n log n) complexity by attending to a subset of positions
- **Linear Attention**: O(n) complexity using kernel feature maps
- **Multi-Query Attention**: Shared key/value heads for faster inference

## Position Encoding

- Absolute encoding (original Transformer)
- Rotary Position Embedding (RoPE) used by LLaMA, Mistral
- ALiBi used by BLOOM, MPT

## Training Methods

- **Pre-training**: Next-token prediction on web-scale corpora
- **Instruction Tuning**: Supervised fine-tuning on instruction-output pairs
- **RLHF**: Reinforcement learning from human feedback
- **DPO**: Direct preference optimization — simpler RLHF alternative

## References

Each architecture listed has published papers with open-source implementations available on GitHub.
