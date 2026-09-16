---
title: "Google Antigravity Cost & Latency Estimates: How Much a Task Really Costs (and How to Measure It Yourself)"
slug: "google-antigravity-benchmark-2026-09"
description: "Transparent cost & latency estimates for Google Antigravity 2.0 tasks on a ~200-file Next.js project — single-file refactors, multi-file cascades, and TDD loops — plus a step-by-step method to measure your own real numbers."
category: "comparisons"
tags: ["google-antigravity", "benchmark", "ai-agents", "token-cost", "developer-productivity"]
author: "AI Dev Hub"
readingTime: 7
createdAt: "2026-09-15"
updatedAt: "2026-09-16"
publishedAt: "2026-09-15"
featured: false
hideLegacy2026Banner: true
faqs:
  - question: "How much does a typical Antigravity task cost in tokens?"
    answer: "Our model-based estimate (from token-counting rules and Gemini's published list pricing, not a live run): a single-file refactor is roughly 3,000–3,500 tokens (~$0.01), a 12-file cascade rename roughly 12,000–13,000 tokens (~$0.05), and a cross-directory search+replace roughly 8,000–9,000 tokens. Enabling Gemini context caching should cut input costs on repeat tasks by ~60–90%. Treat these as planning estimates and measure your own runs to confirm."
  - question: "What is Antigravity's success rate on first pass?"
    answer: "We have not published a live success-rate study. In practice the qualitative pattern is: single-file edits are near-deterministic (very high first-pass rate), while multi-file cascades occasionally need one self-correction loop when a compiler error surfaces. Run your own tasks with a hard tsc --noEmit gate to get a real number for your codebase."
  - question: "How was this benchmark built?"
    answer: "The figures in this post are transparent planning estimates built from Antigravity's published behavior (Research → Plan → Execute → Verify loop, chunk-based multi_replace_file_content, ripgrep-based search, Gemini context caching with ~32k-token minimum / ~300s TTL) and Gemini's published list API pricing — not from a live controlled study we executed. They are meant to give order-of-magnitude intuition; validate against your own project."
---

# Google Antigravity Benchmark (September 2026): How to Estimate What It Costs and Where It Struggles

We keep getting the same question after our [Google Antigravity tutorial](/blog/google-antigravity-tutorial-guide) and [custom rules guide](/blog/google-antigravity-custom-rules-tuning): *does the agent actually work on a real codebase, and what does it cost per task?*

> **Honesty note up front:** the figures below are **transparent planning estimates**, not results from a live benchmark we ran. We build them from Antigravity's published behavior and Gemini's published pricing, and we label every number as an estimate so you can reproduce and verify it on your own codebase. If you run real numbers, we'd genuinely like to compare notes — reach us via [contact](/contact).

> **Quick Answer (order-of-magnitude):** On a ~200-file Next.js project, Antigravity 2.0 tasks typically land around **$0.01 for a single-file edit, ~$0.05 for a 12-file cascade, ~$0.09 for a full TDD feature build** (at published Gemini list pricing). With a warm [Gemini context cache](/blog/google-antigravity-prompt-caching), input token costs on repeat turns drop ~60–90%. These are **estimates, not measurements** — run the reproduction method at the bottom to get real numbers for your own project.

## Methodology (how these estimates are built)

1. **Token model.** Estimate input tokens per task from what the agent actually loads: system rules (~2–5k), file tree / directory index (~1–3k), and the files it reads. Output tokens come from the diffs + plan + walkthrough docs it writes.
2. **Pricing.** Apply Gemini's published **list** API pricing to input vs. output tokens. Real cost varies by model version, region, and any active discounts.
3. **Caching.** Where static context (rules + tree + unchanged files) exceeds the ~32k-token minimum, assume it can ride a **context cache** (~300s TTL), which cuts input pricing on repeat turns by a large margin.
4. **Success.** Judge qualitatively: tasks with a hard compiler/test gate are more reliable; deep type-inference cascades are where misses show up.

Everything below is an **order-of-magnitude estimate**.

## Test Environment (assumed)

| Item | Value |
|------|-------|
| Agent | Google Antigravity CLI v2.0 (2026-09) |
| Model | Gemini (default planner/executor routing) |
| Target project | Next.js 14, TypeScript, ~200 source files, Vitest test suite |
| Verification gate | `tsc --noEmit` + `npm run test` inside the agent sandbox |
| Rules config | ~80-line `.gemini/rules` file (see our [rules guide](/blog/google-antigravity-custom-rules-tuning)) |

## Estimated Cost & Latency by Task

| Task | Est. wall time | Est. tokens | Est. 1st-pass | Why |
|------|-----------|----------------------|----------------|-------|
| Single-file function rename | ~40–50s | ~3,000–3,500 | High | Bounded blast radius; compiler confirms fast |
| 12-file interface refactor | ~2–2.5m | ~12,000–13,000 | Medium-high | Call-graph mapping across modules; a missed type alias can add one self-correction loop |
| Cross-directory grep+replace (47 files) | ~1.5–2m | ~8,000–9,000 | High | ripgrep-backed; risk is scope, not volume |
| Write failing test, then implement (TDD loop) | ~3–4m | ~18,000–21,000 | Medium | Longest loop; more turns = more context re-send |
| Same tasks, cache warm | ~35–40% faster | **~60–90% cheaper input** | Same | Static context rides the context cache (see [prompt caching](/blog/google-antigravity-prompt-caching)) |

## Estimated Cost (rough, at published Gemini list pricing)

- Single-file task: **≈ $0.01**
- Multi-file cascade: **≈ $0.05**
- Full TDD feature build: **≈ $0.09**

These assume list pricing and no active discount. Your effective price depends on the exact model and any volume pricing you have.

## Where It's Most Likely to Miss

The realistic failure class is **implicit type dependencies**: a renamed generic parameter consumed via type inference in a file the call-graph didn't flag as a direct import. The self-correction loop usually recovers it in one extra compile pass — but only if your verification gate is a real `tsc --noEmit` + test run, not a lint-only check. And because everything runs in an isolated sandbox branch, a bad change rolls back atomically without touching your main branch (see [sandbox isolation](/blog/google-antigravity-sandbox-security-deep-dive)).

## How to Build Your Own Real Benchmark

Since these are estimates, the real win is measuring your own project:

1. Clone a mid-size TypeScript project with a working `tsc --noEmit` + test suite.
2. Add a tight `agents.md` + `.gemini/rules` file (our [rules tutorial](/blog/google-antigravity-custom-rules-tuning) has copy-paste templates).
3. Run the four tasks above on fresh branches; log the **wall time** and the token counter Antigravity prints at task end, and note `git diff --stat` to confirm the change set matched the plan.
4. Repeat with the context cache warm to measure the actual input-cost reduction.
5. Report your real numbers to us — we'd like to replace these estimates with community-verified data.

*These are estimates, not measurements. The shape of the data (multi-file ≈ 4× single-file tokens; cache-warm runs substantially cheaper) is what to expect — the exact numbers belong to your codebase and your model version.*
