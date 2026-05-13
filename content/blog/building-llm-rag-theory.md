---
title: "Building an LLM From Scratch — Part 8: RAG Theory"
slug: "building-llm-rag-theory"
description: "Theoretical foundations of Retrieval-Augmented Generation covering vector embeddings, similarity search, document chunking strategies, and hybrid retrieval."
category: "ai-news"
tags: [chatgpt, ai, llm, prompt-engineering, programming]
readingTime: "37 min"
createdAt: "2024-04-17T16:00:00.000Z"
publishedAt: "2024-04-17T16:00:00.000Z"
featured: false
---
# Building an LLM From Scratch — Part 8: RAG Theory

RAG combines retrieval systems with generative models for knowledge-grounded text generation.

## Vector Search

Documents are embedded into vectors using models like BGE, E5, or Instructor. ANN indexes (HNSW, IVF) enable sub-10ms search over millions of vectors, trading 5-10% recall for orders-of-magnitude speed improvement over brute-force search.

## Chunking Strategies

Fixed-size: Simple and predictable. 512 tokens with 64 token overlap prevents middle-of-sentence splits.

Semantic: Split at topic boundaries using embedding similarity thresholds.

Recursive: Start with large chunks, fall back to smaller sizes when chunks exceed length limits.

## Hybrid Search

Dense embeddings capture semantic similarity. BM25 captures exact keyword matches. Hybrid search combines scores with inverted weighting: alpha * dense_score + (1-alpha) * keyword_score.

## Reranking

Cross-encoder rerankers evaluate query-document pairs jointly, producing more accurate relevance scores than bi-encoder embeddings. Improves top-5 relevance by 15-25%.
