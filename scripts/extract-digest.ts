#!/usr/bin/env npx tsx
/**
 * 提取 aibord123/digest/ 文摘数据
 * 生成 blog 风格的内容
 */

import * as fs from 'fs'
import * as path from 'path'
import * as cheerio from 'cheerio'

const AIBORD_ROOT = path.resolve(__dirname, '../../aibord123')
const OUTPUT_DIR = path.resolve(__dirname, './data/extracted')
const DIGEST_OUTPUT = path.join(OUTPUT_DIR, 'digests.json')

// 找出所有文摘 HTML 文件
function findDigestFiles(): string[] {
  const files: string[] = []
  
  function walk(dir: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true })
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        walk(fullPath)
      } else if (entry.name === 'index.html') {
        // 跳过重定向页面
        const content = fs.readFileSync(fullPath, 'utf-8')
        if (!content.includes('noindex') && !content.includes('refresh')) {
          files.push(fullPath)
        }
      }
    }
  }
  
  const digestDir = path.join(AIBORD_ROOT, 'digest')
  if (fs.existsSync(digestDir)) {
    walk(digestDir)
  }
  
  return files
}

// 解析文摘 HTML
function parseDigest(filePath: string) {
  const content = fs.readFileSync(filePath, 'utf-8')
  const $ = cheerio.load(content)
  
  // 提取标题
  const titleEl = $('p.title')
  const title = titleEl.text().trim() || $('h1').first().text().trim() || $('title').text().split('|')[0].trim()
  
  // 提取 meta 信息
  const metaText = $('ul.meta').text().trim()
  const authorMatch = metaText.match(/By\s+(.+?)(?:\n|$)/i)
  const author = authorMatch ? authorMatch[1].replace(/<[^>]+>/g, '').trim() : 'AiBard123'
  const dateMatch = metaText.match(/([A-Z][a-z]+\s+\d+,\s+\d+)/i)
  const dateStr = dateMatch ? dateMatch[1] : new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  
  // 解析日期
  const date = new Date(dateStr)
  const createdAt = isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString()
  
  // 提取正文
  const contentEl = $('div.single-blog-content')
  let body = ''
  
  if (contentEl.length > 0) {
    // 清理内容
    contentEl.find('script, style, iframe, .ads, .advertisement').remove()
    body = contentEl.html() || ''
    
    // 清理 HTML 标签内的 URL 引用
    body = body.replace(/https:\/\/api\.allorigins\.win\/raw\?url=/g, '')
    
    // 清理相对路径图片
    body = body.replace(/src="\/images\//g, 'src="https://aibard123.com/images/')
  }
  
  // 提取来源
  const sourceMatch = body.match(/来源[：:]\s*<a[^>]+href="([^"]+)"[^>]*>([^<]+)<\/a>/)
  const sourceUrl = sourceMatch ? sourceMatch[1] : ''
  const sourceName = sourceMatch ? sourceMatch[2] : ''
  
  // 提取标签
  const keywords = $('meta[name="keywords"]').attr('content') || ''
  const tags = keywords.split(',').map(t => t.trim()).filter(t => t.length > 0 && t.length < 30)
  
  // 生成 slug
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
  
  // 估算阅读时间（中文约 400 字/分钟，英文约 200 词/分钟）
  const textContent = contentEl.text() || ''
  const chineseChars = (textContent.match(/[\u4e00-\u9fa5]/g) || []).length
  const englishWords = (textContent.match(/[a-zA-Z]+/g) || []).length
  const readingTime = Math.max(1, Math.ceil((chineseChars / 400 + englishWords / 200)))
  
  return {
    title,
    slug,
    description: textContent.slice(0, 200).replace(/\s+/g, ' ').trim() + '...',
    author: author.slice(0, 50),
    sourceUrl,
    sourceName,
    tags: tags.slice(0, 8),
    readingTime,
    createdAt,
    body,
    originalPath: filePath.replace(AIBORD_ROOT, ''),
  }
}

// 生成 MD 文件
function generateMarkdown(digest: ReturnType<typeof parseDigest>): string {
  // 分类判断
  let category = 'ai-news'
  const lowerTitle = digest.title.toLowerCase()
  const lowerBody = digest.body.toLowerCase()
  
  if (lowerTitle.includes('tutorial') || lowerTitle.includes('guide') || lowerTitle.includes('教程') || lowerTitle.includes('指南')) {
    category = 'tutorials'
  } else if (lowerTitle.includes('tool') || lowerTitle.includes('工具')) {
    category = 'ai-news'
  } else if (lowerTitle.includes('prompt') || lowerTitle.includes('提示词') || lowerTitle.includes('prompt')) {
    category = 'prompts'
  }
  
  const frontmatter = `---
title: "${digest.title.replace(/"/g, '\\"')}"
slug: "${digest.slug}"
description: "${digest.description.replace(/"/g, '\\"')}"
category: "${category}"
tags: [${digest.tags.map(t => `"${t}"`).join(', ')}]
author: "${digest.author}"
sourceUrl: "${digest.sourceUrl}"
sourceName: "${digest.sourceName}"
readingTime: "${digest.readingTime} min"
createdAt: "${digest.createdAt}"
publishedAt: "${digest.createdAt}"
featured: false
---
`

  // 清理 body HTML
  let bodyMd = digest.body
    .replace(/<h4[^>]*id="([^"]+)"[^>]*>([^<]+)<\/h4>/g, '## $2\n')
    .replace(/<h3[^>]*>([^<]+)<\/h3>/g, '### $1\n')
    .replace(/<h2[^>]*>([^<]+)<\/h2>/g, '## $1\n')
    .replace(/<h1[^>]*>([^<]+)<\/h1>/g, '# $1\n')
    .replace(/<p>([^<]*<strong>[^<]*<\/strong>[^<]*)<\/p>/g, '\n**$1**\n')
    .replace(/<p>([^<]*<a[^>]+>[^<]+<\/a>[^<]*)<\/p>/gi, '\n$1\n')
    .replace(/<p>\s*<strong>/g, '\n**')
    .replace(/<\/strong>\s*<\/p>/g, '**\n')
    .replace(/<p>\s*<\/p>/g, '\n')
    .replace(/<p>([^<]+)<\/p>/g, '\n$1\n')
    .replace(/<br\s*\/?>\s*/gi, '\n')
    .replace(/<img[^>]+src="([^"]+)"[^>]*alt="([^"]*)"[^>]*>/gi, '![$2]($1)')
    .replace(/<img[^>]+alt="([^"]+)"[^>]+src="([^"]+)"[^>]*>/gi, '![$1]($2)')
    .replace(/<img[^>]+src="([^"]+)"[^>]*>/gi, '![]($1)')
    .replace(/<a[^>]+href="([^"]+)"[^>]*>([^<]+)<\/a>/gi, '[$2]($1)')
    .replace(/<strong>([^<]+)<\/strong>/g, '**$1**')
    .replace(/<em>([^<]+)<\/em>/g, '*$1*')
    .replace(/<code>([^<]+)<\/code>/g, '`$1`')
    .replace(/<ul[^>]*>/g, '\n')
    .replace(/<\/ul>/g, '\n')
    .replace(/<li>([^<]+)<\/li>/g, '- $1\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\n{3,}/g, '\n\n')
    .trim()
  
  return frontmatter + '\n' + bodyMd + '\n'
}

// 主函数
async function main() {
  console.log('🔍 扫描文摘文件...')
  
  // 确保输出目录存在
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true })
  }
  
  const files = findDigestFiles()
  console.log(`📄 找到 ${files.length} 个文摘文件`)
  
  if (files.length === 0) {
    console.log('⚠️ 未找到文摘文件')
    return
  }
  
  // 解析所有文摘
  const digests = files.map(f => parseDigest(f))
  
  // 过滤与开发者相关的内容
  // 精准关键词：只选择与开发者工具直接相关的高质量内容
  const targetKeywords = [
    // AI Coding 工具
    'cursor', 'copilot', 'codeium', 'windsurf', 'claude code', 'tabnine', 'replit', 
    // AI Agent 平台
    'langchain', 'crewai', 'autogpt', 'dify', 'coze', '琅人工智能',
    // AI 框架
    'nextjs', 'react', 'vite', 'tailwind', 'vercel', 'netlify',
    // 开发工具
    'github', 'gitlab', 'docker', 'kubernetes', 'aws', 'cloudflare',
    // AI 开发
    'api key', 'openai api', 'anthropic', 'ollama', 'vllm',
    // 特定工具教程
    'midjourney 教程', 'stable diffusion 教程', 'chatgpt 教程', 'gpt-4 教程',
    'cursor 教程', 'copilot 教程', 'github copilot',
  ]
  
  const excludeKeywords = [
    '股票', '赚钱', '创业', '电商', '变现', '副业', '培训',
    '旅游', '美食', '娱乐', '游戏', '视频', '音乐', '小说',
    '养生', '健康', '减肥', '健身', '护肤', '穿搭', '摄影'
  ]
  
  const devDigests = digests.filter(d => {
    const text = (d.title + ' ' + d.description).toLowerCase()
    
    // 必须包含目标关键词
    const hasTarget = targetKeywords.some(kw => text.includes(kw.toLowerCase()))
    
    // 不能包含排除词
    const hasExclude = excludeKeywords.some(kw => text.includes(kw))
    
    // 优先选择阅读时间较长的
    const isLongEnough = d.readingTime >= 5
    
    return hasTarget && !hasExclude && isLongEnough
  })
  
  // 按阅读时间降序排序，限制数量
  devDigests.sort((a, b) => b.readingTime - a.readingTime)
  const topDigests = devDigests.slice(0, 30)
  
  console.log(`🎯 筛选出 ${devDigests.length} 个与开发者相关的文摘`)
  console.log(`🎯 精选 ${topDigests.length} 篇高质量内容`)

  // 保存 JSON
  fs.writeFileSync(DIGEST_OUTPUT, JSON.stringify(topDigests, null, 2), 'utf-8')
  console.log(`💾 已保存到 ${DIGEST_OUTPUT}`)

  // 生成 MD 文件
  const contentDir = path.resolve(__dirname, '../content/blog')
  let generated = 0

  for (const digest of topDigests) {
    const filePath = path.join(contentDir, `${digest.slug}.md`)
    
    // 跳过已存在的文件（避免覆盖）
    if (fs.existsSync(filePath)) {
      continue
    }
    
    const md = generateMarkdown(digest)
    fs.writeFileSync(filePath, md, 'utf-8')
    generated++
  }
  
  console.log(`✅ 生成了 ${generated} 个博客文章`)
  console.log(`📊 总计: ${topDigests.length} 篇精选文摘`)
}

main().catch(console.error)
