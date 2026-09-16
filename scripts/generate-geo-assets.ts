#!/usr/bin/env tsx
/**
 * GEO assets generator (runs after `next build`, writes into out/).
 *
 * Emits LLM-friendly static assets so retrieval engines (Perplexity, ChatGPT
 * Search, Claude, Copilot) can ingest AND keep the canonical source URL:
 *   - <section>/<slug>.md  — raw-markdown mirrors with canonical header,
 *                            CC BY 4.0 license and attribution footer
 *   - llms.txt             — curated index of every page (llms.txt convention)
 *   - llms-full.txt        — the whole corpus in one file
 *
 * Every mirror starts with `canonical:` and ends with an attribution line so
 * that whatever an extractor keeps travels with the aidevhub.net URL.
 */

import fs from 'fs'
import path from 'path'
import { getAllPosts, getAllTools, getAllWorkflows } from '../lib/content'
import { getAllMCPServers } from '../lib/mcp-directory'
import { postIsNoindex } from '../lib/blog-legacy-2026'
import {
  SITE_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
  CONTENT_LICENSE_NAME,
  CONTENT_LICENSE_URL,
} from '../lib/constants'

const OUT_DIR = path.join(process.cwd(), 'out')
const GENERATED_AT = new Date().toISOString().split('T')[0]

function fmtDate(val: unknown): string {
  if (!val) return ''
  if (val instanceof Date) return val.toISOString().split('T')[0]
  return String(val).split('T')[0]
}

function oneline(val: unknown): string {
  return String(val ?? '').replace(/\s+/g, ' ').trim()
}

function yamlStr(val: unknown): string {
  return JSON.stringify(oneline(val))
}

function licenseBlock(): string {
  return `License: ${CONTENT_LICENSE_NAME} (${CONTENT_LICENSE_URL}) — reuse permitted with attribution.`
}

function ensureOutDir(relPath: string): string {
  const abs = path.join(OUT_DIR, relPath)
  fs.mkdirSync(path.dirname(abs), { recursive: true })
  return abs
}

function writeFile(relPath: string, content: string): void {
  fs.writeFileSync(ensureOutDir(relPath), content, 'utf-8')
}

/** Prepend an H1 when the body doesn't start with one. */
function withH1(title: string, body: string): string {
  const trimmed = body.trimStart()
  return trimmed.startsWith('#') ? body : `# ${title}\n\n${body}`
}

/* ----------------------------- Blog mirrors ----------------------------- */

function buildPostMd(post: { slug: string; title: string; description: string; author?: string; publishedAt?: string | Date; createdAt: string | Date; updatedAt: string | Date; faqs?: Array<{ question: string; answer: string }> }, rawBody: string): string {
  const canonical = `${SITE_URL}/blog/${post.slug}`
  const published = fmtDate(post.publishedAt || post.createdAt)
  const updated = fmtDate(post.updatedAt || post.createdAt)

  let body = withH1(post.title, rawBody)

  if (post.faqs?.length) {
    body += `\n\n## Frequently Asked Questions\n\n${post.faqs
      .map((f) => `### ${f.question}\n\n${f.answer}`)
      .join('\n\n')}`
  }

  return [
    '---',
    `canonical: ${canonical}`,
    `title: ${yamlStr(post.title)}`,
    `description: ${yamlStr(post.description)}`,
    `author: ${yamlStr(post.author || SITE_NAME)}`,
    `published: ${published}`,
    `updated: ${updated}`,
    `license: ${CONTENT_LICENSE_NAME}`,
    '---',
    '',
    `> Source: [${post.title}](${canonical}) — ${SITE_NAME}. ${licenseBlock()}`,
    '',
    body.trimEnd(),
    '',
    '---',
    '',
    `*© ${new Date().getFullYear()} ${SITE_NAME} · Canonical: ${canonical} · ${licenseBlock()}*`,
    '',
  ].join('\n')
}

/* ----------------------------- Tool mirrors ----------------------------- */

function buildToolMd(tool: { slug: string; name: string; description: string; longDescription?: string; category: string; tags?: string[]; website: string; pricing: string; features?: string[]; pros?: string[]; cons?: string[] }, rawBody?: string): string {
  const canonical = `${SITE_URL}/tools/${tool.slug}`
  const lines: string[] = [
    '---',
    `canonical: ${canonical}`,
    `title: ${yamlStr(tool.name)}`,
    `description: ${yamlStr(tool.description)}`,
    `license: ${CONTENT_LICENSE_NAME}`,
    '---',
    '',
    `> Source: [${tool.name} — review, pricing & alternatives](${canonical}) — ${SITE_NAME}. ${licenseBlock()}`,
    '',
    `# ${tool.name}`,
    '',
    tool.description,
    '',
    `- **Pricing**: ${tool.pricing}`,
    `- **Website**: ${tool.website}`,
    `- **Category**: ${tool.category}`,
  ]
  if (tool.tags?.length) lines.push(`- **Tags**: ${tool.tags.join(', ')}`)

  if (tool.features?.length) {
    lines.push('', '## Key Features', '', ...tool.features.map((f) => `- ${f}`))
  }
  if (tool.pros?.length) {
    lines.push('', '## Pros', '', ...tool.pros.map((p) => `- ✅ ${p}`))
  }
  if (tool.cons?.length) {
    lines.push('', '## Cons', '', ...tool.cons.map((c) => `- ⚠️ ${c}`))
  }

  if (rawBody && rawBody.trim()) {
    lines.push('', withH1(tool.name, rawBody))
  }

  lines.push(
    '',
    '---',
    '',
    `*© ${new Date().getFullYear()} ${SITE_NAME} · Canonical: ${canonical} · ${licenseBlock()}*`,
    '',
  )
  return lines.join('\n')
}

/* --------------------------- Workflow mirrors ---------------------------- */

function buildWorkflowMd(wf: { slug: string; title: string; description: string; difficulty: string; duration?: string; tools?: string[]; steps?: Array<{ order: number; title: string; description: string; prompt?: string; code?: string }> }): string {
  const canonical = `${SITE_URL}/workflows/${wf.slug}`
  const lines: string[] = [
    '---',
    `canonical: ${canonical}`,
    `title: ${yamlStr(wf.title)}`,
    `description: ${yamlStr(wf.description)}`,
    `license: ${CONTENT_LICENSE_NAME}`,
    '---',
    '',
    `> Source: [${wf.title}](${canonical}) — ${SITE_NAME}. ${licenseBlock()}`,
    '',
    `# ${wf.title}`,
    '',
    wf.description,
    '',
    `- **Difficulty**: ${wf.difficulty}`,
  ]
  if (wf.duration) lines.push(`- **Duration**: ${wf.duration}`)
  if (wf.tools?.length) lines.push(`- **Tools**: ${wf.tools.join(', ')}`)

  for (const step of wf.steps || []) {
    lines.push('', `## Step ${step.order}: ${step.title}`, '', step.description)
    if (step.prompt) lines.push('', '**Prompt**', '', '```', step.prompt, '```')
    if (step.code) lines.push('', '```', step.code, '```')
  }

  lines.push(
    '',
    '---',
    '',
    `*© ${new Date().getFullYear()} ${SITE_NAME} · Canonical: ${canonical} · ${licenseBlock()}*`,
    '',
  )
  return lines.join('\n')
}

/* ------------------------------ MCP mirrors ------------------------------ */

function buildMcpMd(entry: { slug: string; name: string; summary: string; category: string; installCommand: string; useCases: string[]; repository: string; packageName?: string; hosts: Record<string, string> }): string {
  const canonical = `${SITE_URL}/mcp/${entry.slug}`
  const hosts = entry.hosts
    ? Object.entries(entry.hosts).map(([k, v]) => `- **${k}**: ${v}`)
    : []
  const lines: string[] = [
    '---',
    `canonical: ${canonical}`,
    `title: ${yamlStr(`${entry.name} — MCP Server`)}`,
    `description: ${yamlStr(entry.summary)}`,
    `license: ${CONTENT_LICENSE_NAME}`,
    '---',
    '',
    `> Source: [${entry.name} — MCP server profile](${canonical}) — ${SITE_NAME}. ${licenseBlock()}`,
    '',
    `# ${entry.name} (MCP Server)`,
    '',
    entry.summary,
    '',
    `- **Category**: ${entry.category}`,
    `- **Install**: \`${entry.installCommand}\``,
    `- **Repository**: ${entry.repository}`,
  ]
  if (entry.packageName) lines.push(`- **Package**: ${entry.packageName}`)
  if (entry.useCases?.length) {
    lines.push('', '## Use Cases', '', ...entry.useCases.map((u) => `- ${u}`))
  }
  if (hosts.length) {
    lines.push('', '## Host Compatibility', '', ...hosts)
  }
  lines.push(
    '',
    '---',
    '',
    `*© ${new Date().getFullYear()} ${SITE_NAME} · Canonical: ${canonical} · ${licenseBlock()}*`,
    '',
  )
  return lines.join('\n')
}

/* --------------------------------- main ---------------------------------- */

interface CorpusEntry {
  title: string
  url: string
  desc: string
  md: string
}

function corpusLine(entry: CorpusEntry): string {
  return `- [${entry.title}](${entry.url}): ${entry.desc}`
}

function main(): void {
  const corpus: CorpusEntry[] = []

  // Blog posts (skip noindex/legacy — same exclusion as the sitemap)
  const posts = getAllPosts().filter((p) => !postIsNoindex(p))
  for (const post of posts) {
    const md = buildPostMd(post, post.content || '')
    writeFile(`blog/${post.slug}.md`, md)
    corpus.push({
      title: post.title,
      url: `${SITE_URL}/blog/${post.slug}`,
      desc: oneline(post.description),
      md,
    })
  }

  // Tools
  const tools = getAllTools()
  for (const tool of tools) {
    const body = (tool as { content?: string }).content || ''
    const md = buildToolMd(tool, body)
    writeFile(`tools/${tool.slug}.md`, md)
    corpus.push({
      title: tool.name,
      url: `${SITE_URL}/tools/${tool.slug}`,
      desc: oneline(tool.description),
      md,
    })
  }

  // Workflows
  const workflows = getAllWorkflows()
  for (const wf of workflows) {
    const md = buildWorkflowMd(wf)
    writeFile(`workflows/${wf.slug}.md`, md)
    corpus.push({
      title: wf.title,
      url: `${SITE_URL}/workflows/${wf.slug}`,
      desc: oneline(wf.description),
      md,
    })
  }

  // MCP servers
  const servers = getAllMCPServers()
  for (const entry of servers) {
    const md = buildMcpMd(entry)
    writeFile(`mcp/${entry.slug}.md`, md)
    corpus.push({
      title: `${entry.name} (MCP)`,
      url: `${SITE_URL}/mcp/${entry.slug}`,
      desc: oneline(entry.summary),
      md,
    })
  }

  // llms.txt — curated index (llms.txt convention)
  const llmsTxt = [
    `# ${SITE_NAME}`,
    '',
    `> ${SITE_DESCRIPTION}`,
    '',
    licenseBlock(),
    `Every entry below is also available as raw Markdown by appending \`.md\` to its URL, and as one combined corpus at ${SITE_URL}/llms-full.txt.`,
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    `Generated: ${GENERATED_AT}`,
    '',
    '## Blog',
    ...posts.map((p) =>
      corpusLine({ title: p.title, url: `${SITE_URL}/blog/${p.slug}`, desc: oneline(p.description), md: '' })
    ),
    '',
    '## Tools',
    ...tools.map((t) =>
      corpusLine({ title: t.name, url: `${SITE_URL}/tools/${t.slug}`, desc: oneline(t.description), md: '' })
    ),
    '',
    '## Workflows',
    ...workflows.map((w) =>
      corpusLine({ title: w.title, url: `${SITE_URL}/workflows/${w.slug}`, desc: oneline(w.description), md: '' })
    ),
    '',
    '## MCP Servers',
    ...servers.map((s) =>
      corpusLine({ title: `${s.name} (MCP)`, url: `${SITE_URL}/mcp/${s.slug}`, desc: oneline(s.summary), md: '' })
    ),
    '',
  ].join('\n')
  writeFile('llms.txt', llmsTxt)

  // llms-full.txt — single-file corpus
  const llmsFull = [
    `# ${SITE_NAME} — Full Content Corpus`,
    '',
    `> ${SITE_DESCRIPTION}`,
    '',
    licenseBlock(),
    `Each entry carries its canonical URL — keep it when quoting or summarizing.`,
    `Canonical index: ${SITE_URL}/sitemap.xml`,
    `Generated: ${GENERATED_AT}`,
    '',
    ...corpus.map((e) => `──────────────────────────────────────────\n\n${e.md}`),
  ].join('\n')
  writeFile('llms-full.txt', llmsFull)

  const size = (rel: string) => {
    try {
      return `${(fs.statSync(path.join(OUT_DIR, rel)).size / 1024).toFixed(0)} KB`
    } catch {
      return 'missing'
    }
  }
  console.log(
    `✅ GEO assets: ${posts.length} blog + ${tools.length} tools + ${workflows.length} workflows + ${servers.length} MCP mirrors; llms.txt ${size('llms.txt')}, llms-full.txt ${size('llms-full.txt')}`
  )
}

main()
