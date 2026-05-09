#!/usr/bin/env tsx
/**
 * Tool Content Generator
 * Generates MDX content files for AI tools
 * 
 * Usage:
 *   Basic:         npx tsx scripts/generate-tool.ts "Tool Name" "ai-coding-tools"
 *   AI-powered:    npx tsx scripts/generate-tool.ts --ai "Tool Name" "ai-coding-tools"
 */

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

interface ToolData {
  name: string
  slug: string
  description: string
  longDescription?: string
  category: string
  tags: string[]
  website: string
  affiliateUrl?: string
  pricing: 'free' | 'freemium' | 'paid' | 'open-source'
  features?: string[]
  pros?: string[]
  cons?: string[]
  alternatives?: string[]
}

function generateToolContent(data: ToolData): string {
  const frontmatter = {
    name: data.name,
    slug: data.slug,
    description: data.description,
    longDescription: data.longDescription || '',
    category: data.category,
    tags: data.tags,
    website: data.website,
    affiliateUrl: data.affiliateUrl || '',
    pricing: data.pricing,
    features: data.features || [],
    pros: data.pros || [],
    cons: data.cons || [],
    alternatives: data.alternatives || [],
    createdAt: new Date().toISOString().split('T')[0],
    updatedAt: new Date().toISOString().split('T')[0],
    publishedAt: new Date().toISOString().split('T')[0],
  }

  const body = data.longDescription
    ? `# ${data.name}\n\n${data.longDescription}\n\n## Features\n\n${(data.features || []).map((f) => `- ${f}`).join('\n')}\n\n## Getting Started\n\n[Visit ${data.name}](${data.website})\n\n## Use Cases\n\n`
    : `# ${data.name}\n\n${data.description}\n\n## Getting Started\n\n[Visit ${data.name}](${data.website})\n\n## Use Cases\n\n`

  return matter.stringify(body, frontmatter)
}

async function generateWithAI(name: string, category: string, slug: string): Promise<ToolData> {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY environment variable is required for AI-powered generation')
  }

  const prompt = `You are an AI tool directory content writer. Generate comprehensive content for the AI tool "${name}" (category: ${category}).

Return ONLY valid JSON with this exact structure (no markdown, no code fences):
{
  "description": "A concise 1-2 sentence description",
  "longDescription": "A detailed 2-3 paragraph description covering what the tool does, who it's for, and its key value proposition",
  "website": "https://${slug}.com",
  "pricing": "freemium|free|paid|open-source",
  "features": ["feature 1", "feature 2", "feature 3", "feature 4", "feature 5"],
  "pros": ["pro 1", "pro 2", "pro 3"],
  "cons": ["con 1", "con 2", "con 3"],
  "tags": ["${category}", "relevant-tag-1", "relevant-tag-2"],
  "alternatives": ["cursor", "claude-code", "windsurf", "github-copilot"]
}`

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

  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`)
  }

  const result = await response.json()
  const content = JSON.parse(result.choices[0].message.content)

  return {
    name,
    slug,
    description: content.description,
    longDescription: content.longDescription,
    category,
    tags: content.tags || [category],
    website: content.website || `https://${slug}.com`,
    pricing: content.pricing || 'freemium',
    features: content.features || [],
    pros: content.pros || [],
    cons: content.cons || [],
    alternatives: content.alternatives || [],
  }
}

async function main() {
  const args = process.argv.slice(2)
  const useAI = args[0] === '--ai'
  const toolArgs = useAI ? args.slice(1) : args

  if (toolArgs.length < 2) {
    console.log('Usage:')
    console.log('  Template: npx tsx scripts/generate-tool.ts <name> <category>')
    console.log('  AI:       npx tsx scripts/generate-tool.ts --ai <name> <category>')
    console.log('Example:')
    console.log('  npx tsx scripts/generate-tool.ts "Claude Code" "ai-coding-tools"')
    console.log('  npx tsx scripts/generate-tool.ts --ai "Claude Code" "ai-coding-tools"')
    process.exit(1)
  }

  const name = toolArgs[0]
  const category = toolArgs[1]
  const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')

  let toolData: ToolData

  if (useAI) {
    console.log(`🤖 Generating AI-powered content for "${name}"...`)
    toolData = await generateWithAI(name, category, slug)
    console.log('✅ AI content generated successfully!')
  } else {
    console.log(`📝 Generating template for "${name}"...`)
    toolData = {
      name,
      slug,
      description: `Description for ${name}`,
      category,
      tags: [category],
      website: `https://example.com/${slug}`,
      pricing: 'freemium',
    }
  }

  const content = generateToolContent(toolData)
  const outputPath = path.join(process.cwd(), 'src/content/tools', `${slug}.md`)

  // Create directory if it doesn't exist
  fs.mkdirSync(path.dirname(outputPath), { recursive: true })

  // Check if file already exists
  if (fs.existsSync(outputPath)) {
    console.log(`⚠️  File already exists: ${outputPath}`)
    console.log('   Use a different name or delete the existing file.')
    process.exit(1)
  }

  fs.writeFileSync(outputPath, content)
  console.log(`✅ Created: ${outputPath}`)
  console.log(`   Name: ${toolData.name}`)
  console.log(`   Slug: ${toolData.slug}`)
  console.log(`   Category: ${toolData.category}`)
}

main().catch((error) => {
  console.error('❌ Error:', error.message)
  process.exit(1)
})
