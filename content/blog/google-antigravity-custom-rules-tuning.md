---
title: "How to Write Google Antigravity Custom Rules: agents.md, .rules, Strict Mode & Allow Lists (2026 Guide)"
slug: "google-antigravity-custom-rules-tuning"
description: "Learn how to write custom rules for Google Antigravity 2.0: where agents.md and .rules files go, how rule resolution works, and copy-paste configs for strict mode, allow lists, turbo mode, and auto-retry."
category: "ai-agents"
tags: ["google-antigravity", "configuration", "best-practices", "code-quality", "agents-md"]
author: "AI Dev Hub"
readingTime: 11
createdAt: "2026-05-26"
updatedAt: "2026-09-15"
publishedAt: "2026-05-26"
featured: true
hideLegacy2026Banner: true
faqs:
  - question: "Does Google Antigravity use agents.md?"
    answer: "Yes. Antigravity 2.0 reads agents.md as a project-level instruction file and merges it with .rules files found in the repository. agents.md is the cross-tool convention shared with other AI coding agents, while .gemini/rules files carry Antigravity-specific directives with higher precedence."
  - question: "Where do Antigravity rule files live?"
    answer: "Global rules live in ~/.gemini/antigravity/rules and apply to every project. Project rules live in ./.gemini/rules at the repository root. Directory-level .rules files can be dropped into any subfolder (for example ./src/components/.rules) to enforce standards for that layer only."
  - question: "What is the rule resolution order in Antigravity?"
    answer: "Antigravity resolves constraints top-down: global rules first, then project rules in .gemini/rules, then directory-specific .rules files. More specific (deeper) rules override more general ones on conflict."
  - question: "What does strict mode do in Antigravity IDE?"
    answer: "Strict mode removes the agent's freedom to improvise around your rules: it fails the task instead of warning when a naming convention, security rule, or stack constraint is violated, and it blocks auto-approval of out-of-scope file edits."
  - question: "How do I let Antigravity run commands without asking every time?"
    answer: "Use the allow list. Entries are glob patterns such as 'npm test', 'npm run lint:*', or 'git status'. Commands on the list execute without a permission prompt; everything else requires confirmation. Avoid wildcarding destructive commands like git push --force."
  - question: "What is Antigravity turbo mode?"
    answer: "Turbo mode allows Antigravity to auto-approve all actions in a task except those matching your deny list. It is fastest but riskiest; pair it with a tight deny list covering deploys, migrations, and force-pushes."
  - question: "How does auto-retry work in Antigravity?"
    answer: "Auto-retry re-submits a failed agent step automatically when the failure looks transient (rate limits, flaky network, tool timeouts). Configure max attempts and backoff in settings; keep retries under three to avoid runaway token spend."
---

Left to its own devices, an AI coding agent will write code based on its general training weights. While functional, it might import libraries you don't use, ignore your team's naming conventions, or skip writing necessary JSDoc comments.

To maintain codebase health, you must establish clear guardrails.

In **Google Antigravity 2.0**, developers can enforce strict coding guidelines, safety rules, and architecture choices using **Custom Project Rules**, the **agents.md** convention, and per-directory `.rules` files. This guide covers the full configuration surface: where rule files live, how they resolve, and how to tune strict mode, allow lists, turbo mode, and auto-retry.

> **Quick Answer:** Antigravity reads custom rules from three places, resolved top-down: global rules in `~/.gemini/antigravity/rules`, project rules in `./.gemini/rules`, and directory-scoped `.rules` files anywhere in the tree. `agents.md` sets baseline context; `.rules` carry Antigravity-specific constraints that override it on conflict. Use **strict mode** to fail hard on violations, an **allow list** for promptless command execution, and **turbo mode** only where mistakes are cheap to roll back.

---

## agents.md vs .rules: What Antigravity Actually Reads

Antigravity 2.0 supports two instruction channels, and knowing the difference prevents most configuration confusion:

| | agents.md | .gemini/rules files |
|---|---|---|
| Origin | Open cross-tool convention | Antigravity/Gemini-specific |
| Scope | Whole repository | Global, project, or single directory |
| Precedence | Baseline | Higher — overrides agents.md on conflict |
| Best for | Product context, build/test commands | Hard engineering constraints (stack, security, naming) |

**Practical division of labor**: keep `agents.md` for what the project *is* ("Next.js 15 app, pnpm, tests via vitest, never touch /generated"), and use `.rules` files for how code *must be written* (naming, imports, security boundaries). If a rule seems to be ignored, first check whether it contradicts something in `agents.md` — project rules win, but contradictions waste context and confuse the planner.

```
my-repo/
├── agents.md                  # cross-tool project context
├── .gemini/
│   └── rules                  # project-level Antigravity rules
└── src/
    └── components/
        └── .rules             # directory-scoped rules
```

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

By placing specialized `.rules` files in specific subdirectories, you can enforce different standards for different layers of your application. For example, your backend API layer can forbid UI imports, while your frontend component directory can require strict TypeScript prop interfaces.

**Precedence rule of thumb**: the deeper (more specific) file wins. A `.rules` file in `src/components/` can relax a project-wide rule for presentational components, or tighten it further — but it cannot loosen a security rule defined at project level if strict mode is enabled.

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

Three rules of thumb that make rules actually stick:

1. **One rule, one sentence.** Compound rules ("use camelCase and never install packages") get partially ignored.
2. **State the exception alongside the rule.** "Do NOT install packages unless explicitly authorized" is enforceable; a bare ban trains the agent to route around you silently.
3. **Keep the file under ~150 lines.** Everything is injected into the system prompt every task; bloated rules dilute all of them.

---

## Strict Mode: Failing Loudly Instead of Silently

By default, Antigravity treats some rule violations as soft warnings — the agent may proceed and note the deviation in its final report. **Strict mode** (per-project setting in the IDE and CLI) flips this behavior:

- Convention violations **fail the step** and force the agent to self-correct before continuing.
- Out-of-scope file edits (paths not touched by the task plan) require explicit approval instead of being auto-staged.
- Security rules are never downgraded to warnings, regardless of other settings.

Enable it when the codebase has hard contracts — generated code boundaries, licensing constraints, regulated data paths. Leave it off during greenfield prototyping, or the agent will stall on every experiment.

```json
// .gemini/settings.json
{
  "execution": {
    "strictMode": true,
    "strictModeIgnore": ["**/*.test.ts"]
  }
}
```

---

## The Allow List: Promptless Execution Without Full Autopilot

The **allow list** controls which shell commands the agent may run without asking you each time. Entries are glob patterns:

```json
{
  "permissions": {
    "allow": [
      "npm test",
      "npm run lint:*",
      "npm run typecheck",
      "git status",
      "git diff:*"
    ],
    "deny": [
      "git push --force*",
      "rm -rf *",
      "npm publish*"
    ]
  }
}
```

Rules of thumb:

- Allow **read-only and idempotent** commands freely (`git status`, `npm test`, linters).
- Allow **build/test loops** — they're the backbone of agent self-verification, and prompting for each one destroys the workflow.
- Never wildcard `git push`, `npm publish`, or anything that talks to production.
- "Allow everything" (`"allow": ["*"]`) exists for throwaway sandbox containers only. It is exactly as dangerous as it sounds.

---

## Turbo Mode: When to Take the Training Wheels Off

**Turbo mode** is the opposite end of the spectrum: the agent auto-approves everything except your deny list. It is the right choice when:

- The task is contained (one module, clear acceptance criteria, tests exist).
- You are working in a container/branch where mistakes are cheap.
- The task is long-running and prompting every step would break your focus.

It is the wrong choice for migrations touching shared schemas, anything with production credentials, and tasks whose tests are weaker than the blast radius.

A pragmatic setup: turbo mode ON, deny list covering deploy/migrate/publish commands, strict mode ON for conventions. You get speed where it's safe and hard stops where it isn't.

---

## Auto-Retry: Surviving Transient Failures Without Burning Tokens

Agent tasks fail for two very different reasons: genuine blockers (contradictory requirements, missing files) and **transient noise** — rate limits, tool timeouts, flaky networks. **Auto-retry** handles the second category:

```json
{
  "execution": {
    "autoRetry": {
      "enabled": true,
      "maxAttempts": 3,
      "backoff": "exponential",
      "retryOn": ["rate_limit", "timeout", "network_error"]
    }
  }
}
```

Keep `maxAttempts` at 2–3. Every retry re-sends full context, so a systematically failing step burns tokens linearly with retries. If a step fails three times, the cause is almost never transient — let it stop and read the error.

---

## How Rules Alter Agent Execution

When these rules are parsed, the agent's behavior changes dramatically:

* **Preventing package bloat**: If a task requires date sorting, instead of running `npm install date-fns`, the agent scans the rules, searches the codebase for an existing date utility, and imports it.
* **Auto-correction on lints**: If the agent generates camelCase for a file name (e.g., `userCard.tsx`), the linter rule triggers a warning, forcing the agent to rename it to `user-card.tsx` before staging the change.
* **Safety halts**: If the agent attempts to fetch an environment secret to pass into an API tool, the security rule triggers a permission error, pausing execution for developer review.
* **Custom model routing** (optional): teams with dedicated inference setups can pin the planner and executor to specific models per rules file, trading latency for adherence on critical paths.

## Troubleshooting: When Your Rules Seem Ignored

1. **Check for contradictions** between `agents.md` and `.rules` files — the deeper file wins, silently.
2. **Check file location**: project rules must be exactly `.gemini/rules` at the repo root; a stray `.gemini` directory one level deeper is invisible.
3. **Check rule count**: past ~150 lines, adherence degrades across the board, not just for the newest rules.
4. **Check the skill overlap**: if a custom skill's instructions conflict with your rules, strict mode surfaces the conflict; without it, whichever loaded last wins.

---

## Conclusion: Tailoring Your Digital Engineer

By documenting your team's code conventions in markdown files, you convert Antigravity from a generic coding assistant into a bespoke team member who understands your architecture, obeys your security requirements, and formats code exactly the way you like it.

Start with three files: `agents.md` for context, `.gemini/rules` for constraints, and a tight allow list. Turn on strict mode once the rules stabilize. Turbo mode last, and only where blast radius is contained.

---

## Explore the Complete Google Antigravity Guide Series

- [Start here: install Antigravity, API keys & your first /goal task in 7 steps](/blog/google-antigravity-tutorial-guide)
- [Cost & latency estimates: what a task actually costs on a Next.js codebase (and how to measure your own)](/blog/google-antigravity-benchmark-2026-09)
- [Run parallel subagents safely on isolated branches](/blog/google-antigravity-subagent-orchestration)
- [Google Antigravity CLI vs. IDE: which one should you use?](/blog/google-antigravity-cli-vs-ide-guide)

*This is the flagship post of our Google Antigravity 2.0 series. Start with the [tutorial](/blog/google-antigravity-tutorial-guide) if new to the tool, or jump straight to the [benchmark](/blog/google-antigravity-benchmark-2026-09) for cost & latency estimates plus a method to measure your own project.*