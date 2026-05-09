#!/usr/bin/env tsx
/**
 * Batch Tool Page Generator
 * 
 * Reads extracted data from scripts/data/extracted/ and generates
 * frontmatter-formatted MD files in content/tools/
 * 
 * Priority is given to developer-relevant tools. Uses AI enhancement
 * for the most important tools.
 * 
 * Usage:
 *   npx tsx scripts/batch-generate-tools.ts                    # Generate all filtered tools (template)
 *   npx tsx scripts/batch-generate-tools.ts --ai               # Generate with AI enhancement (limited)
 *   npx tsx scripts/batch-generate-tools.ts --ai --limit=10    # Generate 10 AI-enhanced tools
 */

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

// --- Config ---
const DATA_DIR = path.resolve(__dirname, 'data/extracted')
const TOOLS_DIR = path.resolve(__dirname, '../content/tools')

interface ToolFrontmatter {
  name: string
  slug: string
  description: string
  longDescription: string
  category: string
  tags: string[]
  website: string
  affiliateUrl: string
  pricing: 'free' | 'freemium' | 'paid' | 'open-source'
  features: string[]
  pros: string[]
  cons: string[]
  alternatives: string[]
  createdAt: string
  updatedAt: string
  publishedAt: string
}

interface ExtractedSummary {
  name: string
  slug: string
  category: string
  title: string
  description: string
  officialUrl: string
  featureCount: number
  codeCount: number
  sourceType: string
  sourceFile: string
}

// Priority tools - developer tools we definitely want
const PRIORITY_TOOLS = new Set([
  'cursor', 'claude-code', 'github-copilot', 'windsurf', 'codeium',
  'tabnine', 'replit', 'amazon-codewhisperer', 'amazon-q-developer',
  'continue', 'sourcegraph', 'codegpt', 'askcodi', 'mentat',
  'sweep-ai', 'ghostwriter', 'replit-agent',
  'claude', 'chatgpt', 'gemini', 'grok', 'deepseek',
  'mistral', 'llama', 'ollama', 'openai',
  'copilot', 'codegeex', 'tongyi',
  'langchain', 'crewai', 'autogpt', 'dify', 'coze',
  'mcp', 'fastmcp', 'model-context-protocol',
  'n8n', 'zapier', 'comfyui',
  'supabase', 'vercel', 'netlify', 'cloudflare',
  'vscode', 'neovim', 'jetbrains',
  'bolt', 'lovable', 'v0', 'claude-artifacts',
  'perplexity', 'notion-ai', 'github-copilot',
  'stable-diffusion', 'midjourney', 'leonardo',
  'blackbox', 'blackboxai',
])

// Developer-relevant keywords for filtering
const DEV_KEYWORDS = [
  'developer', 'coding', 'code', 'programming', 'ide', 'editor',
  'api', 'sdk', 'framework', 'library', 'cli', 'terminal',
  'github', 'git', 'deploy', 'server', 'database',
  'mcp', 'agent', 'workflow', 'automation',
  'open source', 'llm', 'model', 'language model',
  'pair programming', 'code review', 'debug',
]

function isDevRelevant(name: string, title: string, description: string): number {
  const text = `${name} ${title} ${description}`.toLowerCase()
  let score = 0
  
  // Exact priority match = highest priority
  if (PRIORITY_TOOLS.has(name.toLowerCase()) || PRIORITY_TOOLS.has(title.toLowerCase())) {
    score += 100
  }

  // Keyword matches
  for (const kw of DEV_KEYWORDS) {
    if (text.includes(kw)) score += 10
  }

  return score
}

function guessPricing(name: string, slug: string, url: string): 'free' | 'freemium' | 'paid' | 'open-source' {
  const text = `${name} ${slug} ${url}`.toLowerCase()
  if (text.includes('github.com') || text.includes('open-source') || text.includes('opensource')) return 'open-source'
  if (text.includes('pricing') || text.includes('/pricing') || text.includes('freemium')) return 'freemium'
  if (text.includes('/pricing') || text.includes('paid')) return 'paid'
  return 'freemium'
}

function generateToolMarkdown(data: ExtractedSummary): string {
  const today = new Date().toISOString().split('T')[0]
  const slug = data.slug.toLowerCase().replace(/[^a-z0-9-]/g, '')

  const frontmatter: ToolFrontmatter = {
    name: data.name,
    slug,
    description: data.description || data.title,
    longDescription: '',
    category: data.category,
    tags: [data.category, slug],
    website: data.officialUrl || `https://${slug}.com`,
    affiliateUrl: '',
    pricing: guessPricing(data.name, slug, data.officialUrl),
    features: [],
    pros: [],
    cons: [],
    alternatives: [],
    createdAt: today,
    updatedAt: today,
    publishedAt: today,
  }

  const body = `# ${data.name}

${data.description || data.title}

## Getting Started

[Visit ${data.name}](${data.officialUrl})

## Use Cases

`
  return matter.stringify(body, frontmatter)
}

async function generateWithAI(data: ExtractedSummary): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    console.log('   ⚠️  OPENAI_API_KEY not set, using template')
    return generateToolMarkdown(data)
  }

  const prompt = `You are an AI tool directory content writer. Generate comprehensive content for the tool "${data.name}".

Context:
- Title: ${data.title}
- Description: ${data.description}
- Website: ${data.officialUrl}
- Category: ${data.category}

Return ONLY valid JSON with this exact structure (no markdown, no code fences):
{
  "longDescription": "A detailed 2-3 paragraph description covering what the tool does, who it's for, and its key value proposition",
  "pricing": "freemium|free|paid|open-source",
  "features": ["feature 1", "feature 2", "feature 3", "feature 4", "feature 5"],
  "pros": ["pro 1", "pro 2", "pro 3"],
  "cons": ["con 1", "con 2", "con 3"],
  "tags": ["${data.category}", "relevant-tag-1", "relevant-tag-2"],
  "alternatives": ["alternative-1", "alternative-2"]
}`

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 1500,
      }),
    })

    if (!response.ok) throw new Error(`API error: ${response.status}`)

    const result = await response.json()
    const content = JSON.parse(result.choices[0].message.content)
    const today = new Date().toISOString().split('T')[0]
    const slug = data.slug.toLowerCase().replace(/[^a-z0-9-]/g, '')

    const frontmatter: ToolFrontmatter = {
      name: data.name,
      slug,
      description: data.description || data.title,
      longDescription: content.longDescription || '',
      category: data.category,
      tags: content.tags || [data.category, slug],
      website: data.officialUrl || `https://${slug}.com`,
      affiliateUrl: '',
      pricing: content.pricing || guessPricing(data.name, slug, data.officialUrl),
      features: content.features || [],
      pros: content.pros || [],
      cons: content.cons || [],
      alternatives: content.alternatives || [],
      createdAt: today,
      updatedAt: today,
      publishedAt: today,
    }

    const body = `# ${data.name}

${content.longDescription || data.description}

## Features

${(content.features || []).map((f: string) => `- ${f}`).join('\n')}

## Pros & Cons

### Pros
${(content.pros || []).map((p: string) => `- ${p}`).join('\n')}

### Cons
${(content.cons || []).map((c: string) => `- ${c}`).join('\n')}

## Getting Started

[Visit ${data.name}](${data.officialUrl})

## Alternatives

${(content.alternatives || []).map((a: string) => `- [${a}](/tools/${a})`).join('\n')}
`
    return matter.stringify(body, frontmatter)
  } catch (err: any) {
    console.log(`   ⚠️  AI generation failed for ${data.name}: ${err.message}, using template`)
    return generateToolMarkdown(data)
  }
}

async function main() {
  const args = process.argv.slice(2)
  const useAI = args.includes('--ai')
  const limitArg = args.find(a => a.startsWith('--limit='))
  const limit = limitArg ? parseInt(limitArg.split('=')[1]) : 50

  // Read summary data
  const summaryPath = path.join(DATA_DIR, 'summary.json')
  if (!fs.existsSync(summaryPath)) {
    console.error('❌ Summary data not found. Run extract-from-aibord123.ts first.')
    process.exit(1)
  }

  const allData: ExtractedSummary[] = JSON.parse(fs.readFileSync(summaryPath, 'utf-8'))

  // Score and filter
  const scored = allData.map(d => ({
    data: d,
    score: isDevRelevant(d.name, d.title, d.description),
  }))

  // Sort by relevance score (descending), then by feature count
  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score
    return b.data.featureCount - a.data.featureCount
  })

  // Filter out already-existing tools
  const existingFiles = fs.existsSync(TOOLS_DIR) 
    ? new Set(fs.readdirSync(TOOLS_DIR).map(f => f.replace(/\.md$/, '')))
    : new Set()

  const toGenerate = scored
    .filter(s => s.score >= 10 && !existingFiles.has(s.data.slug))
    .slice(0, useAI ? Math.min(limit, 100) : limit)

  console.log(`📊 Summary: ${allData.length} total extracted`)
  console.log(`   Scored items: ${scored.filter(s => s.score >= 10).length} relevant`)
  console.log(`   Already exist: ${existingFiles.size}`)
  console.log(`   Will generate: ${toGenerate.length}`)
  console.log(`   AI enhanced: ${useAI ? 'yes (limited to ' + limit + ')' : 'no'}\n`)

  // Ensure output directory
  if (!fs.existsSync(TOOLS_DIR)) {
    fs.mkdirSync(TOOLS_DIR, { recursive: true })
  }

  // Generate
  for (let i = 0; i < toGenerate.length; i++) {
    const item = toGenerate[i]
    const progress = `[${i + 1}/${toGenerate.length}]`

    const outputPath = path.join(TOOLS_DIR, `${item.data.slug}.md`)
    if (fs.existsSync(outputPath)) {
      console.log(`   ${progress} ⚠️  Skipping ${item.data.name} (${item.data.slug}.md already exists)`)
      continue
    }

    let content: string
    if (useAI) {
      console.log(`   ${progress} 🤖 AI ${item.data.name} (score: ${item.score})...`)
      content = await generateWithAI(item.data)
      console.log(`      ✅ Created: ${item.data.slug}.md`)
    } else {
      console.log(`   ${progress} 📝 ${item.data.name} (score: ${item.score})...`)
      content = generateToolMarkdown(item.data)
    }

    fs.writeFileSync(outputPath, content)
  }

  // Summary
  const generated = toGenerate.length
  console.log(`\n✅ Batch generation complete!`)
  console.log(`   Generated: ${generated} tool pages`)
  console.log(`   Location: ${TOOLS_DIR}`)
  console.log(`\n📋 Top 10 generated tools:`)
  toGenerate.slice(0, 10).forEach((s, i) => {
    console.log(`   ${i + 1}. ${s.data.name} (${s.data.category}) - score: ${s.score}`)
  })
}

main().catch((err) => {
  console.error('❌ Fatal error:', err)
  process.exit(1)
})
