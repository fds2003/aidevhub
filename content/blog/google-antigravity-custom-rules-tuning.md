---
title: "Writing Custom Rules: Tuning Agent Behavior via Rules and Directives"
slug: "google-antigravity-custom-rules-tuning"
description: "Master the art of controlling AI agent output. Learn how to configure custom rules and directives in Google Antigravity 2.0 to enforce coding conventions, tech stacks, and safety parameters."
category: "ai-agents"
tags: ["google-antigravity", "configuration", "best-practices", "code-quality"]
author: "AI Dev Hub"
readingTime: 5
createdAt: "2026-05-25T10:00:00.000Z"
updatedAt: "2026-05-25T10:00:00.000Z"
publishedAt: "2026-05-25T10:00:00.000Z"
featured: false
hideLegacy2026Banner: true
---

Left to its own devices, an AI coding agent will write code based on its general training weights. While functional, it might import libraries you don't use, ignore your team's naming conventions, or skip writing necessary JSDoc comments. 

To maintain codebase health, you must establish clear guardrails.

In **Google Antigravity 2.0**, developers can enforce strict coding guidelines, safety rules, and architecture choices using **Custom Project Rules**. Here is how to configure them to keep your agent aligned with your codebase standards.

---

## The Rule Resolution Hierarchy

When Antigravity initializes a task, it scans the repository folder structure to resolve its behavioral constraints. The system follows a specific hierarchy:

```
[1. Global Rules] -> (~/.gemini/antigravity/rules)
       ↓
[2. Project Rules] -> (./.gemini/rules)
       ↓
[3. Directory Rules] -> (./src/components/.rules)
```

By placing specialized `.rules` files in specific subdirectories, you can enforce different standards for different layers of your application. For example, your backend API layer can forbid UI imports, while your frontend component directory can require strict TypeScript Prop interfaces.

---

## Anatomy of a Perfect Rules File

Antigravity rules are written in plain Markdown, which the agent parser pre-compiles and injects directly into the LLM system prompt. 

Here is a standard, production-ready rule configuration (`.gemini/rules`):

```markdown
# Antigravity Project Engineering Rules

## 1. Tech Stack & Library Constraints
* ALWAYS use React + TypeScript for the frontend.
* Do NOT install new npm packages unless explicitly authorized by the user. 
* Prefer using existing helper utilities in `src/lib` instead of writing custom helper functions.

## 2. Naming Conventions
* Variables and functions MUST use camelCase (e.g. `fetchUserData`).
* Components and classes MUST use PascalCase (e.g. `UserCard`).
* Files and directories MUST use kebab-case (e.g. `user-card.tsx`).

## 3. Security Guidelines
* Never use raw database queries; always route access through the Prisma/TypeORM repository layer.
* Never print sensitive environment keys or write tokens to log files.
* Do not use `dangerouslySetInnerHTML` in frontend components.

## 4. Documentation (Mandatory JSDoc)
* Every new function must include a concise JSDoc comment explaining *why* it is designed, not just *what* it does.
```

---

## How Rules Alter Agent Execution

When these rules are parsed, the agent's behavior changes dramatically:

* **Preventing Package Bloat**: If a task requires dates sorting, instead of running `npm install date-fns`, the agent scans the rules, searches the codebase for an existing date utility, and imports it.
* **Auto-Correction on Lints**: If the agent generates camelCase for a file name (e.g., `userCard.tsx`), the linter rule triggers a warning, forcing the agent to rename it to `user-card.tsx` before staging the change.
* **Safety Halts**: If the agent attempts to fetch an environment secret to pass into an API tool, the security rule triggers a permission error, pausing execution for developer review.

---

## Conclusion: Tailoring Your Digital Engineer

By documenting your team's code conventions in markdown files, you convert Antigravity from a generic coding assistant into a bespoke team member who understands your architecture, obeys your security requirements, and formats code exactly the way you like it.

---

*In the final Day 7 article, we will wrap up the series by looking at the paradigm shift from autocompletion to fully autonomous software engineering.*
