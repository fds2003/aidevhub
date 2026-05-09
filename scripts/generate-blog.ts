#!/usr/bin/env tsx
/**
 * Blog Post Generator
 * Generates MDX content files for blog posts
 * 
 * Usage:
 *   Basic:         npx tsx scripts/generate-blog.ts "Blog Title" "Tutorial"
 *   AI-powered:    npx tsx scripts/generate-blog.ts --ai "Blog Title" "Tutorial"
 */

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

interface PostData {
  title: string
  slug: string
  description: string
  content?: string
  category: string
  tags: string[]
  author?: string
  coverImage?: string
  readingTime?: number
}

function generatePostContent(data: PostData): string {
  const frontmatter = {
    title: data.title,
    slug: data.slug,
    description: data.description,
    category: data.category,
    tags: data.tags,
    author: data.author || 'AI Dev Hub',
    coverImage: data.coverImage || '',
    readingTime: data.readingTime || 5,
    createdAt: new Date().toISOString().split('T')[0],
    updatedAt: new Date().toISOString().split('T')[0],
    publishedAt: new Date().toISOString().split('T')[0],
    featured: false,
  }

  const body = data.content || `# ${data.title}\n\n${data.description}\n\n## Introduction\n\n\n\n## Main Content\n\n\n\n## Conclusion\n\n`

  return matter.stringify(body, frontmatter)
}

async function generateWithAI(title: string, category: string, slug: string): Promise<PostData> {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY environment variable is required for AI-powered generation')
  }

  const prompt = `You are a technical blog writer for AI Dev Hub (aidevhub.net), a website about AI coding tools, MCP ecosystem, AI agents, and workflow automation.

Write a comprehensive blog post titled "${title}" in the "${category}" category.

Return ONLY valid JSON with this exact structure (no markdown, no code fences):
{
  "description": "A compelling 2-3 sentence meta description for SEO (max 160 characters)",
  "content": "Full markdown blog post content with proper headings, lists, code blocks, and emphasis. Include an introduction, 3-5 main sections with H2 headings, and a conclusion. The content should be 800-1500 words and SEO-optimized.",
  "tags": ["relevant-tag-1", "relevant-tag-2", "relevant-tag-3"],
  "readingTime": 8
}

Make the content:
- SEO-optimized with natural keyword placement
- Informative and actionable for developers
- Well-structured with H2 and H3 headings
- Conversational but professional tone
- Include relevant code examples where appropriate
- End with a conclusion that summarizes key takeaways
- Be at least 800 words with detailed sub-sections`

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
      max_tokens: 3000,
    }),
  })

  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`)
  }

  const result = await response.json()
  const content = JSON.parse(result.choices[0].message.content)

  return {
    title,
    slug,
    description: content.description,
    content: content.content,
    category,
    tags: content.tags || [category],
    author: 'AI Dev Hub',
    readingTime: content.readingTime || 8,
  }
}

async function main() {
  const args = process.argv.slice(2)
  const useAI = args[0] === '--ai'
  const postArgs = useAI ? args.slice(1) : args

  if (postArgs.length < 2) {
    console.log('Usage:')
    console.log('  Template: npx tsx scripts/generate-blog.ts <title> <category>')
    console.log('  AI:       npx tsx scripts/generate-blog.ts --ai <title> <category>')
    console.log('Example:')
    console.log('  npx tsx scripts/generate-blog.ts "Getting Started with AI" "Tutorial"')
    console.log('  npx tsx scripts/generate-blog.ts --ai "Top 10 AI Coding Tools in 2025" "ai-coding-tools"')
    process.exit(1)
  }

  const title = postArgs[0]
  const category = postArgs[1]
  const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')

  let postData: PostData

  if (useAI) {
    console.log(`🤖 Generating AI-powered blog post: "${title}"...`)
    console.log('   This may take 30-60 seconds...')
    postData = await generateWithAI(title, category, slug)
    console.log('✅ AI content generated successfully!')
  } else {
    postData = {
      title,
      slug,
      description: `A comprehensive guide about ${title.toLowerCase()}`,
      category,
      tags: [category],
    }
  }

  const content = generatePostContent(postData)
  const outputPath = path.join(process.cwd(), 'src/content/blog', `${slug}.md`)

  // Create directory if it doesn't exist
  fs.mkdirSync(path.dirname(outputPath), { recursive: true })

  // Check if file already exists
  if (fs.existsSync(outputPath)) {
    console.log(`⚠️  File already exists: ${outputPath}`)
    console.log('   Use a different title or delete the existing file.')
    process.exit(1)
  }

  fs.writeFileSync(outputPath, content)
  console.log(`✅ Created: ${outputPath}`)
  console.log(`   Title: ${postData.title}`)
  console.log(`   Slug: ${postData.slug}`)
  console.log(`   Category: ${postData.category}`)
  if (postData.readingTime) {
    console.log(`   Reading Time: ~${postData.readingTime} min`)
  }
}

main().catch((error) => {
  console.error('❌ Error:', error.message)
  process.exit(1)
})
