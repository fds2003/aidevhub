#!/usr/bin/env tsx
/**
 * Extract content from aibord123 (old site) HTML files
 * 
 * Parses two formats:
 *   1. tutorial/        - Old tutorial pages (article.markdown-body)
 *   2. newtutorial/     - New tutorial pages (section.blog-single)
 * 
 * Usage:
 *   npx tsx scripts/extract-from-aibord123.ts
 * 
 * Output:
 *   scripts/data/extracted/tutorials.json
 *   scripts/data/extracted/newtutorials.json
 */

import fs from 'fs'
import path from 'path'
import * as cheerio from 'cheerio'
import pLimit from 'p-limit'

// --- Config ---
const AIBORD_ROOT = path.resolve(__dirname, '../../aibord123')
const DATA_DIR = path.resolve(__dirname, 'data/extracted')
const CONCURRENCY = 20

interface ExtractedTool {
  name: string
  slug: string
  title: string
  description: string
  longDescription: string
  metaTitle: string
  metaKeywords: string
  metaDescription: string
  officialUrl: string
  features: string[]
  headings: { level: number; text: string }[]
  codeSnippets: string[]
  content: string
  sourceFile: string
  sourceType: 'tutorial' | 'newtutorial'
}

// --- Helpers ---

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
}

function extractMeta($: cheerio.CheerioAPI): { title: string; keywords: string; description: string } {
  return {
    title: $('title').text().split('|')[0].trim(),
    keywords: ($('meta[name="keywords"]').attr('content') || '').trim(),
    description: ($('meta[name="description"]').attr('content') || '').trim(),
  }
}

function cleanHtml(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

function extractImages($: cheerio.CheerioAPI, container: cheerio.Cheerio<any>): string[] {
  const images: string[] = []
  container.find('img').each((_, el) => {
    const src = $(el).attr('src')
    const alt = $(el).attr('alt') || ''
    if (src) images.push(src)
  })
  return images
}

// --- Tutorial (old format) Parser ---

function parseTutorialPage(filePath: string): ExtractedTool | null {
  try {
    const html = fs.readFileSync(filePath, 'utf-8')
    const $ = cheerio.load(html)

    const meta = extractMeta($)
    const title = $('h1.mt-5').first().text().trim()
    const contentEl = $('article.markdown-body')
    
    if (!title || contentEl.length === 0) return null

    // Extract headings structure
    const headings: { level: number; text: string }[] = []
    contentEl.find('h1, h2, h3, h4, h5, h6').each((_, el) => {
      const tagName = $(el).prop('tagName')?.toLowerCase() || ''
      const level = parseInt(tagName.replace('h', ''))
      const text = $(el).text().trim()
      if (text) headings.push({ level, text })
    })

    // Extract code snippets
    const codeSnippets: string[] = []
    contentEl.find('pre[tabindex="0"] code').each((_, el) => {
      const code = $(el).text().trim()
      if (code) codeSnippets.push(code)
    })

    // Extract feature list items
    const features: string[] = []
    const featureSections = contentEl.find('h4#特性, h3:contains(特性), h2:contains(特性), h2:contains(功能), h3:contains(功能), h4:contains(功能), h5:contains(功能)')
    if (featureSections.length > 0) {
      featureSections.each((_, section) => {
        const nextUl = $(section).nextAll('ul, ol').first()
        nextUl.find('li').each((_, li) => {
          const text = $(li).text().trim()
          if (text) features.push(text)
        })
      })
    }

    // Try to extract from all ul/ol if features list is empty
    if (features.length === 0) {
      contentEl.find('ul > li, ol > li').each((_, li) => {
        const text = $(li).text().trim()
        if (text && text.length < 200) features.push(text)
      })
    }

    // Extract official URL - from product intro section or meta
    let officialUrl = ''
    const productIntroLink = contentEl.find('h4#产品介绍 + div[style*="flex"] div[style*="padding-left"] h4 a[href]').first()
    if (productIntroLink.length > 0) {
      officialUrl = productIntroLink.attr('href') || ''
    }
    if (!officialUrl) {
      // Fallback: find first external link
      contentEl.find('a[href*="http"]').each((_, el) => {
        const href = $(el).attr('href') || ''
        if (href && !href.includes('aibard123') && !href.includes('localhost')) {
          officialUrl = href
          return false // break
        }
      })
    }

    // Extract description from product intro paragraph
    let description = meta.description
    const productDesc = contentEl.find('h4#产品介绍 + div[style*="flex"] div[style*="padding-left"] p').first()
    if (productDesc.length > 0) {
      description = productDesc.text().trim()
    }
    if (!description || description.includes('AiBard123')) {
      // Fallback: first meaningful paragraph
      contentEl.find('p').each((_, el) => {
        const text = $(el).text().trim()
        if (text.length > 20 && text.length < 300) {
          description = text
          return false
        }
      })
    }

    // Get full content text
    const contentText = cleanHtml(contentEl.html() || '')

    // Generate slug
    const slug = path.basename(path.dirname(filePath)).toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')

    return {
      name: slug.charAt(0).toUpperCase() + slug.slice(1),
      slug,
      title,
      description: description || title,
      longDescription: contentText.substring(0, 2000),
      metaTitle: meta.title,
      metaKeywords: meta.keywords,
      metaDescription: meta.description,
      officialUrl,
      features: [...new Set(features)],
      headings,
      codeSnippets,
      content: contentText,
      sourceFile: path.relative(AIBORD_ROOT, filePath),
      sourceType: 'tutorial',
    }
  } catch (err: any) {
    console.error(`❌ Error parsing ${filePath}: ${err.message}`)
    return null
  }
}

// --- New Tutorial Parser ---

function parseNewTutorialPage(filePath: string): ExtractedTool | null {
  try {
    const html = fs.readFileSync(filePath, 'utf-8')
    const $ = cheerio.load(html)

    const meta = extractMeta($)

    // Title from H3 in right section
    const title = $('section.blog-single .right-section h3').first().text().trim()
    const contentEl = $('article.single-blog div.single-blog-content')
    
    if (!title && contentEl.length === 0) return null

    // Fallback: try to get title from H1 or content
    const fallbackTitle = $('h1.mt-5').first().text().trim() || meta.title

    // Short description
    let description = $('section.blog-single .right-section p[style*="font-size"]').first().text().trim()
    if (!description) {
      description = $('section.blog-single .right-section p').first().text().trim()
    }

    // Official URL
    let officialUrl = $('section.blog-single .right-section div.visit a').first().attr('href') || ''

    // Extract headings
    const headings: { level: number; text: string }[] = []
    contentEl.find('h1, h2, h3, h4, h5, h6').each((_, el) => {
      const tagName = $(el).prop('tagName')?.toLowerCase() || ''
      const level = parseInt(tagName.replace('h', ''))
      const text = $(el).text().trim()
      if (text) headings.push({ level, text })
    })

    // Extract code snippets
    const codeSnippets: string[] = []
    contentEl.find('pre code').each((_, el) => {
      const code = $(el).text().trim()
      if (code) codeSnippets.push(code)
    })

    // Extract features from lists
    const features: string[] = []
    contentEl.find('ul > li, ol > li').each((_, li) => {
      const text = $(li).text().trim()
      if (text && text.length < 200) features.push(text)
    })

    // Full content
    const contentText = cleanHtml(contentEl.html() || '')

    const actualTitle = title || fallbackTitle
    const slug = path.basename(path.dirname(filePath)).toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')

    return {
      name: slug.charAt(0).toUpperCase() + slug.slice(1),
      slug,
      title: actualTitle,
      description: description || actualTitle,
      longDescription: contentText.substring(0, 2000),
      metaTitle: meta.title,
      metaKeywords: meta.keywords,
      metaDescription: meta.description,
      officialUrl,
      features: [...new Set(features)],
      headings,
      codeSnippets,
      content: contentText,
      sourceFile: path.relative(AIBORD_ROOT, filePath),
      sourceType: 'newtutorial',
    }
  } catch (err: any) {
    console.error(`❌ Error parsing ${filePath}: ${err.message}`)
    return null
  }
}

// --- Discovery Functions ---

function findTutorialFiles(): string[] {
  const tutorialDir = path.join(AIBORD_ROOT, 'tutorial')
  if (!fs.existsSync(tutorialDir)) return []

  const files: string[] = []
  const entries = fs.readdirSync(tutorialDir, { withFileTypes: true })
  
  for (const entry of entries) {
    if (entry.isDirectory()) {
      const indexPath = path.join(tutorialDir, entry.name, 'index.html')
      if (fs.existsSync(indexPath)) {
        files.push(indexPath)
      }
    }
  }
  return files
}

function findNewTutorialFiles(): string[] {
  const newtutorialDir = path.join(AIBORD_ROOT, 'newtutorial')
  if (!fs.existsSync(newtutorialDir)) return []

  const files: string[] = []

  function scan(dir: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true })
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        // Skip pagination directories
        if (entry.name === 'page') continue
        // Skip year/month directories (they contain individual articles)
        if (/^\d{4}$/.test(entry.name) || /^\d{2}$/.test(entry.name)) {
          scan(fullPath)
        } else {
          // Check if this directory has an index.html
          const indexPath = path.join(fullPath, 'index.html')
          if (fs.existsSync(indexPath)) {
            files.push(indexPath)
          }
          // Also scan deeper
          scan(fullPath)
        }
      } else if (entry.name === 'index.html' && dir !== newtutorialDir) {
        // Avoid duplicate adding; handled above
      }
    }
  }

  scan(newtutorialDir)
  return files
}

// --- Classification ---

function classifyCategory(name: string, title: string, keywords: string): string {
  const text = `${name} ${title} ${keywords}`.toLowerCase()

  const mcpKeywords = ['mcp', 'model context protocol', 'mcp server', 'mcp tool', 'mcp client']
  const agentKeywords = ['ai agent', 'agent framework', 'autonomous', 'agentic', 'crewai', 'langchain', 'autogpt', 'dify', 'coze']
  const codingKeywords = ['coding', 'code editor', 'ide', 'programming', 'cursor', 'copilot', 'windsurf', 'codeium', 'tabnine', 'vscode', 'developer', 'replit', 'claude code']
  const workflowKeywords = ['workflow', 'automation', 'n8n', 'zapier', 'make', 'pipedream', 'pipeline']
  const comparisonKeywords = ['vs', 'comparison', 'versus', 'vs.', 'compare', 'alternative', 'review', 'best ']

  if (mcpKeywords.some(k => text.includes(k))) return 'mcp'
  if (agentKeywords.some(k => text.includes(k))) return 'ai-agents'
  if (workflowKeywords.some(k => text.includes(k))) return 'ai-workflow'
  if (comparisonKeywords.some(k => text.includes(k))) return 'comparisons'
  if (codingKeywords.some(k => text.includes(k))) return 'ai-coding-tools'

  return 'ai-coding-tools' // default
}

// --- Main ---

async function main() {
  console.log('🔍 Scanning tutorial/ directory...')
  const tutorialFiles = findTutorialFiles()
  console.log(`   Found ${tutorialFiles.length} tutorial files`)

  console.log('🔍 Scanning newtutorial/ directory...')
  const newTutorialFiles = findNewTutorialFiles()
  console.log(`   Found ${newTutorialFiles.length} newtutorial files`)

  const allTutorialResults: ExtractedTool[] = []
  const allNewTutorialResults: ExtractedTool[] = []

  const limit = pLimit(CONCURRENCY)

  // Parse tutorial files
  console.log('\n📖 Parsing old tutorials...')
  const tutorialTasks = tutorialFiles.map((file) =>
    limit(() => {
      const result = parseTutorialPage(file)
      if (result) {
        result.name = path.basename(path.dirname(file))
        console.log(`   ✅ ${result.name}`)
      } else {
        console.log(`   ⚠️  Skipped: ${path.relative(AIBORD_ROOT, file)}`)
      }
      return result
    })
  )
  const tutorialResults = await Promise.all(tutorialTasks)
  allTutorialResults.push(...tutorialResults.filter((r): r is ExtractedTool => r !== null))

  // Parse newtutorial files
  console.log('\n📖 Parsing new tutorials...')
  const newTutorialTasks = newTutorialFiles.map((file) =>
    limit(() => {
      const result = parseNewTutorialPage(file)
      if (result) {
        console.log(`   ✅ ${result.name}`)
      } else {
        console.log(`   ⚠️  Skipped: ${path.relative(AIBORD_ROOT, file)}`)
      }
      return result
    })
  )
  const newTutorialResults = await Promise.all(newTutorialTasks)
  allNewTutorialResults.push(...newTutorialResults.filter((r): r is ExtractedTool => r !== null))

  // Output results
  ensureDir(DATA_DIR)

  // Write tutorial results
  const tutorialOutputPath = path.join(DATA_DIR, 'tutorials.json')
  fs.writeFileSync(tutorialOutputPath, JSON.stringify(allTutorialResults, null, 2))
  console.log(`\n📦 Tutorial data written to: ${tutorialOutputPath}`)
  console.log(`   Total records: ${allTutorialResults.length}`)

  // Write newtutorial results
  const newtutorialOutputPath = path.join(DATA_DIR, 'newtutorials.json')
  fs.writeFileSync(newtutorialOutputPath, JSON.stringify(allNewTutorialResults, null, 2))
  console.log(`\n📦 New tutorial data written to: ${newtutorialOutputPath}`)
  console.log(`   Total records: ${allNewTutorialResults.length}`)

  // Write combined summary
  const allTools = [...allTutorialResults, ...allNewTutorialResults]
  const summary = allTools.map((t) => ({
    name: t.name,
    slug: t.slug,
    category: classifyCategory(t.name, t.title, t.metaKeywords),
    title: t.title,
    description: t.description.substring(0, 120),
    officialUrl: t.officialUrl,
    featureCount: t.features.length,
    codeCount: t.codeSnippets.length,
    sourceType: t.sourceType,
    sourceFile: t.sourceFile,
  }))

  const summaryPath = path.join(DATA_DIR, 'summary.json')
  fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2))
  console.log(`\n📊 Summary written to: ${summaryPath}`)

  // Stats
  const categoryCounts: Record<string, number> = {}
  for (const s of summary) {
    categoryCounts[s.category] = (categoryCounts[s.category] || 0) + 1
  }
  console.log('\n📈 Category Distribution:')
  for (const [cat, count] of Object.entries(categoryCounts).sort((a, b) => b[1] - a[1])) {
    console.log(`   ${cat}: ${count}`)
  }

  console.log(`\n✅ Extraction complete!`)
  console.log(`   Total extracted: ${summary.length}`)
  console.log(`   Tutorial: ${allTutorialResults.length}`)
  console.log(`   New Tutorial: ${allNewTutorialResults.length}`)
}

main().catch((err) => {
  console.error('❌ Fatal error:', err)
  process.exit(1)
})
