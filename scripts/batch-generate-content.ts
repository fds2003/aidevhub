#!/usr/bin/env tsx
/**
 * Batch Blog & Workflow Content Generator
 * 
 * Reads extracted tutorial data and generates:
 *   - Blog posts (comprehensive guides from merged tutorial content)
 *   - Workflow pages (step-by-step guides)
 * 
 * Usage:
 *   npx tsx scripts/batch-generate-content.ts              # Generate blog + workflow templates
 *   npx tsx scripts/batch-generate-content.ts --ai          # AI-enhanced generation
 *   npx tsx scripts/batch-generate-content.ts --ai --limit=5  # Generate 5 AI-enhanced items
 */

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

// --- Config ---
const DATA_DIR = path.resolve(__dirname, 'data/extracted')
const BLOG_DIR = path.resolve(__dirname, '../content/blog')
const WORKFLOW_DIR = path.resolve(__dirname, '../content/workflows')

// Blog topics to generate - using tutorials that exist in our extracted data
const BLOG_TOPICS: { title: string; category: string; tags: string[]; tutorialNames: string[] }[] = [
  {
    title: 'ChatGPT Complete Guide: From Beginner to Advanced',
    category: 'ai-coding-tools',
    tags: ['ChatGPT', 'AI Chat', 'GPT-4', 'Tutorial', 'Beginner'],
    tutorialNames: ['chatgpt', 'chatgpt4', 'chatgpt-web', 'chatgpt-prompt-genius'],
  },
  {
    title: 'Claude AI: The Complete Guide to Anthropic\'s Assistant',
    category: 'ai-coding-tools',
    tags: ['Claude', 'Anthropic', 'AI Assistant', 'Tutorial'],
    tutorialNames: ['claude', 'claude-code'],
  },
  {
    title: 'GitHub Copilot vs Cursor vs Windsurf: Which AI Coding Tool is Best?',
    category: 'comparisons',
    tags: ['Copilot', 'Cursor', 'Windsurf', 'AI Coding', 'Comparison'],
    tutorialNames: ['copilot'],
  },
  {
    title: 'Getting Started with MCP: Build Your First MCP Server',
    category: 'mcp',
    tags: ['MCP', 'Model Context Protocol', 'Tutorial', 'Server'],
    tutorialNames: ['model-context-protocol', 'fastmcp'],
  },
  {
    title: 'AutoGPT and AI Agents: A Beginner\'s Guide to Autonomous AI',
    category: 'ai-agents',
    tags: ['AutoGPT', 'AI Agents', 'Autonomous AI', 'Tutorial'],
    tutorialNames: ['autogpt', 'agentgpt'],
  },
  {
    title: 'Stable Diffusion: Complete Guide to AI Image Generation',
    category: 'ai-coding-tools',
    tags: ['Stable Diffusion', 'AI Image', 'Generation', 'Tutorial'],
    tutorialNames: ['stable-diffusion', 'stablediffusionweb', 'dreamstudio', 'dreamlike'],
  },
  {
    title: 'Midjourney Tutorial: How to Create Stunning AI Art',
    category: 'ai-coding-tools',
    tags: ['Midjourney', 'AI Art', 'Image Generation', 'Tutorial'],
    tutorialNames: ['midjourney', 'leonardo'],
  },
  {
    title: 'How to Use Perplexity AI for Research and Development',
    category: 'ai-coding-tools',
    tags: ['Perplexity', 'AI Search', 'Research', 'Tutorial'],
    tutorialNames: ['perplexity-ask-ai'],
  },
  {
    title: 'Dify: Building AI Applications with Open-Source Tools',
    category: 'ai-agents',
    tags: ['Dify', 'AI Applications', 'Open Source', 'Tutorial'],
    tutorialNames: ['dify'],
  },
  {
    title: 'Zapier and Automation: Streamline Your Developer Workflow',
    category: 'ai-workflow',
    tags: ['Zapier', 'Automation', 'Workflow', 'Developer'],
    tutorialNames: ['zapier'],
  },
  {
    title: 'New Bing (Copilot) Complete Guide: AI-Powered Search',
    category: 'ai-coding-tools',
    tags: ['Bing', 'Copilot', 'AI Search', 'Microsoft'],
    tutorialNames: ['newbing', 'bingcreate'],
  },
  {
    title: 'Ollama: Running Local LLMs Made Simple',
    category: 'ai-coding-tools',
    tags: ['Ollama', 'Local LLM', 'Open Source', 'Tutorial'],
    tutorialNames: ['ollama'],
  },
]

// Workflow topics
const WORKFLOW_TOPICS: { title: string; description: string; category: string; difficulty: 'beginner' | 'intermediate' | 'advanced'; duration: string; tools: string[]; tutorialNames: string[] }[] = [
  {
    title: 'ChatGPT Prompt Engineering Workflow',
    description: 'Master prompt engineering techniques to get the best results from ChatGPT',
    category: 'AI Workflow',
    difficulty: 'beginner',
    duration: '20 min',
    tools: ['chatgpt', 'chatgpt-prompt-genius'],
    tutorialNames: ['chatgpt', 'chatgpt-prompt-genius'],
  },
  {
    title: 'Building with MCP: Server Development Workflow',
    description: 'Step-by-step workflow for creating and deploying MCP servers',
    category: 'MCP',
    difficulty: 'intermediate',
    duration: '30 min',
    tools: ['fastmcp', 'claude-code'],
    tutorialNames: ['model-context-protocol', 'fastmcp'],
  },
  {
    title: 'AI-Powered Code Review Workflow',
    description: 'Use AI tools to automate and improve your code review process',
    category: 'AI Workflow',
    difficulty: 'beginner',
    duration: '15 min',
    tools: ['github-copilot', 'cursor', 'claude-code'],
    tutorialNames: ['codegeex', 'chatreviewer'],
  },
  {
    title: 'Local LLM Setup and Usage Workflow',
    description: 'Set up and use local language models with Ollama for development',
    category: 'AI Workflow',
    difficulty: 'intermediate',
    duration: '25 min',
    tools: ['ollama'],
    tutorialNames: ['ollama'],
  },
  {
    title: 'CrewAI Multi-Agent Collaboration Workflow',
    description: 'Build and orchestrate multiple AI agents working together on complex tasks',
    category: 'AI Workflow',
    difficulty: 'advanced',
    duration: '40 min',
    tools: ['crewai', 'autogpt', 'langchain'],
    tutorialNames: ['autogpt'],
  },
]

interface ExtractedData {
  name: string
  slug: string
  title: string
  description: string
  content: string
  headings: { level: number; text: string }[]
  codeSnippets: string[]
  officialUrl: string
  sourceFile: string
  sourceType: string
}

// --- Lookup by name ---
function findByName(data: ExtractedData[], names: string[]): ExtractedData[] {
  const nameMap = new Map(data.map(d => [d.slug.toLowerCase(), d]))
  return names
    .map(n => nameMap.get(n.toLowerCase()))
    .filter((d): d is ExtractedData => d !== undefined)
    .slice(0, 3) // Max 3 source files per blog
}

function slugify(text: string): string {
  return text.toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

// --- Generate Blog Post ---
function generateBlogPost(
  topic: typeof BLOG_TOPICS[0],
  sources: ExtractedData[]
): string {
  const today = new Date().toISOString().split('T')[0]
  const slug = slugify(topic.title)

  // Combine content from sources
  const combinedHeadings = sources.flatMap(s => s.headings || [])
  const combinedContent = sources.map(s => {
    let content = `## ${s.title}\n\n`
    content += s.content ? s.content.substring(0, 2000) : s.description
    if (s.codeSnippets && s.codeSnippets.length > 0) {
      content += '\n\n### Code Example\n\n```\n' + s.codeSnippets.slice(0, 2).join('\n\n') + '\n```\n\n'
    }
    return content
  }).join('\n\n')

  const frontmatter = {
    title: topic.title,
    slug,
    description: `A comprehensive guide to ${topic.tags.slice(0, 2).join(' and ')}. ${topic.title}.`,
    category: topic.category,
    tags: topic.tags,
    author: 'AI Dev Hub',
    coverImage: '',
    readingTime: Math.max(5, Math.round(combinedContent.length / 1000)),
    createdAt: today,
    updatedAt: today,
    publishedAt: today,
    featured: false,
  }

  const body = `# ${topic.title}

${frontmatter.description}

## Introduction

${sources.map(s => s.description || `Learn about ${s.title}`).join('. ')}

## Main Content

${combinedContent.substring(0, 8000)}

## Conclusion

${topic.tags.slice(0, 3).join(', ')} are powerful tools that can significantly improve your development workflow. This guide has covered the essential concepts and practical steps to get started.

### Key Takeaways
- ${topic.tags.slice(0, 3).map(t => `**${t}**: Essential for modern development`).join('\n- ')}

Start exploring today and see how these AI tools can transform your workflow!
`

  return matter.stringify(body, frontmatter)
}

// --- Generate Blog with AI ---
async function generateBlogWithAI(
  topic: typeof BLOG_TOPICS[0],
  sources: ExtractedData[]
): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) return generateBlogPost(topic, sources)

  const sourceContent = sources.map(s => 
    `--- Source: ${s.title} ---\nDescription: ${s.description}\nContent:\n${(s.content || '').substring(0, 1500)}`
  ).join('\n\n')

  const prompt = `You are a technical blog writer for AI Dev Hub (aidevhub.net). Write a comprehensive, SEO-optimized blog post.

Title: ${topic.title}
Category: ${topic.category}
Tags: ${topic.tags.join(', ')}

Source materials:
${sourceContent}

Return ONLY valid JSON:
{
  "description": "SEO meta description (max 160 chars)",
  "content": "Full markdown blog post (800-1500 words) with proper H2/H3 headings, code examples, lists, and a conclusion",
  "tags": ["${topic.tags.join('", "')}"],
  "readingTime": 8
}

Make the content informative, actionable for developers, and SEO-optimized.`

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
        max_tokens: 3000,
      }),
    })

    if (!response.ok) throw new Error(`API error: ${response.status}`)

    const result = await response.json()
    const content = JSON.parse(result.choices[0].message.content)
    const today = new Date().toISOString().split('T')[0]
    const slug = slugify(topic.title)

    const frontmatter = {
      title: topic.title,
      slug,
      description: content.description || topic.title,
      category: topic.category,
      tags: content.tags || topic.tags,
      author: 'AI Dev Hub',
      coverImage: '',
      readingTime: content.readingTime || 8,
      createdAt: today,
      updatedAt: today,
      publishedAt: today,
      featured: false,
    }

    return matter.stringify(content.content, frontmatter)
  } catch (err: any) {
    console.log(`   ⚠️  AI generation failed: ${err.message}, using template`)
    return generateBlogPost(topic, sources)
  }
}

// --- Generate Workflow ---
function generateWorkflow(
  topic: typeof WORKFLOW_TOPICS[0],
  sources: ExtractedData[]
): string {
  const today = new Date().toISOString().split('T')[0]
  const slug = slugify(topic.title)

  const steps = sources.flatMap(s => (s.headings || []))
    .filter(h => h.level >= 2)
    .slice(0, 6)
    .map((h, i) => ({
      order: i + 1,
      title: h.text,
      description: `Learn how to ${h.text.toLowerCase()} in this step of the ${topic.title} workflow.`,
      prompt: `Guide me through ${h.text.toLowerCase()} for this workflow.`,
      code: '',
    }))

  // If no steps from headings, create default steps
  if (steps.length === 0) {
    const defaultSteps = [
      { order: 1, title: 'Set Up Your Environment', description: 'Configure the necessary tools and environment.', prompt: 'Help me set up my development environment.', code: '' },
      { order: 2, title: 'Configure the Tool', description: 'Set up and configure your AI tool.', prompt: `Guide me through configuring ${topic.tools.join(', ')}.`, code: '' },
      { order: 3, title: 'Define Your Task', description: 'Clearly define what you want to accomplish.', prompt: 'Help me define my task requirements.', code: '' },
      { order: 4, title: 'Execute and Iterate', description: 'Run the workflow and refine results.', prompt: 'Guide me through executing and refining this workflow.', code: '' },
    ]
    steps.push(...defaultSteps)
  }

  const frontmatter = {
    title: topic.title,
    slug,
    description: topic.description,
    category: topic.category,
    difficulty: topic.difficulty,
    duration: topic.duration,
    tools: topic.tools,
    steps,
    createdAt: today,
    updatedAt: today,
    publishedAt: today,
    featured: false,
  }

  const body = `# ${topic.title}

${topic.description}

## Prerequisites
${topic.tools.map(t => `- **${t}**: Installed and configured`).join('\n')}
- Basic understanding of AI tools
- A project or task to work on

## Steps

${steps.map(s => `### ${s.order}. ${s.title}\n${s.description}\n`).join('\n')}

## Conclusion

You've completed the ${topic.title}. Practice these steps regularly to become more efficient with AI-powered development workflows.
`

  return matter.stringify(body, frontmatter)
}

// --- Main ---
async function main() {
  const args = process.argv.slice(2)
  const useAI = args.includes('--ai')
  const limitArg = args.find(a => a.startsWith('--limit='))
  const limit = limitArg ? parseInt(limitArg.split('=')[1]) : 15

  // Load data (prefer tutorials, fallback to newtutorials)
  const tutorialPath = path.join(DATA_DIR, 'tutorials.json')
  const newtutorialPath = path.join(DATA_DIR, 'newtutorials.json')

  const tutorialData: ExtractedData[] = fs.existsSync(tutorialPath)
    ? JSON.parse(fs.readFileSync(tutorialPath, 'utf-8'))
    : []

  const newTutorialData: ExtractedData[] = fs.existsSync(newtutorialPath)
    ? JSON.parse(fs.readFileSync(newtutorialPath, 'utf-8'))
    : []

  const allData = [...tutorialData, ...newTutorialData]
  console.log(`📚 Loaded ${tutorialData.length} tutorials + ${newTutorialData.length} new tutorials`)

  // Create output directories
  if (!fs.existsSync(BLOG_DIR)) fs.mkdirSync(BLOG_DIR, { recursive: true })
  if (!fs.existsSync(WORKFLOW_DIR)) fs.mkdirSync(WORKFLOW_DIR, { recursive: true })

  // --- Generate Blog Posts ---
  console.log('\n📝 Generating blog posts...')
  let blogCount = 0
  const blogLimit = Math.min(BLOG_TOPICS.length, limit)

  for (let i = 0; i < blogLimit; i++) {
    const topic = BLOG_TOPICS[i]
    const slug = slugify(topic.title)
    const outputPath = path.join(BLOG_DIR, `${slug}.md`)

    if (fs.existsSync(outputPath)) {
      console.log(`   [${i + 1}/${blogLimit}] ⚠️  Skipping ${topic.title} (already exists)`)
      continue
    }

    const sources = findByName(tutorialData, topic.tutorialNames)
    const progress = `[${i + 1}/${blogLimit}]`

    if (sources.length === 0) {
      console.log(`   ${progress} ⚠️  No sources for "${topic.title}", using metadata only`)
    }

    let content: string
    if (useAI && sources.length > 0) {
      console.log(`   ${progress} 🤖 AI ${topic.title}...`)
      content = await generateBlogWithAI(topic, sources)
    } else {
      console.log(`   ${progress} 📝 ${topic.title} (${sources.length} sources)`)
      content = generateBlogPost(topic, sources)
    }

    fs.writeFileSync(outputPath, content)
    blogCount++
  }

  console.log(`   ✅ Generated ${blogCount} blog posts`)

  // --- Generate Workflows ---
  console.log('\n🔧 Generating workflow pages...')
  let workflowCount = 0
  const workflowLimit = Math.min(WORKFLOW_TOPICS.length, limit)

  for (let i = 0; i < workflowLimit; i++) {
    const topic = WORKFLOW_TOPICS[i]
    const slug = slugify(topic.title)
    const outputPath = path.join(WORKFLOW_DIR, `${slug}.md`)

    if (fs.existsSync(outputPath)) {
      console.log(`   [${i + 1}/${workflowLimit}] ⚠️  Skipping ${topic.title} (already exists)`)
      continue
    }

    const sources = findByName(tutorialData, topic.tutorialNames)
    const progress = `[${i + 1}/${workflowLimit}]`

    console.log(`   ${progress} 📝 ${topic.title} (${sources.length} sources)`)
    const content = generateWorkflow(topic, sources)
    fs.writeFileSync(outputPath, content)
    workflowCount++
  }

  console.log(`   ✅ Generated ${workflowCount} workflow pages`)

  // --- Summary ---
  console.log(`\n📊 Summary:`)
  console.log(`   Blog posts: ${blogCount} (${BLOG_DIR})`)
  console.log(`   Workflows: ${workflowCount} (${WORKFLOW_DIR})`)
}

main().catch((err) => {
  console.error('❌ Fatal error:', err)
  process.exit(1)
})
