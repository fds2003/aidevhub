import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { Tool, Post, Workflow } from '@/types'

const CWD = process.cwd()
const CONTENT_DIR = path.join(CWD, 'content')

// Get all files from a directory
function getFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir).filter((file) => file.endsWith('.md') || file.endsWith('.mdx'))
}

// Parse MDX frontmatter
function parseFrontmatter<T>(filePath: string): T & { content?: string } {
  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(fileContent)
  return { ...data, content } as T & { content?: string }
}

// Normalize tool data: handle files using 'title' instead of 'name'
function normalizeTool(data: Tool): Tool {
  const raw = data as unknown as Record<string, unknown>
  if (!raw.name && raw.title) {
    raw.name = raw.title as string
  }
  return raw as unknown as Tool
}

// Tools
export function getAllTools(): Tool[] {
  const toolsDir = path.join(CONTENT_DIR, 'tools')
  const files = getFiles(toolsDir)
  
  return files
    .map((file) => {
      const filePath = path.join(toolsDir, file)
      return normalizeTool(parseFrontmatter<Tool>(filePath))
    })
    .sort((a, b) => 
      new Date(b.publishedAt || b.createdAt).getTime() - 
      new Date(a.publishedAt || a.createdAt).getTime()
    )
}

export function getToolBySlug(slug: string): Tool | null {
  const filePath = path.join(CONTENT_DIR, 'tools', `${slug}.md`)
  if (!fs.existsSync(filePath)) return null
  return normalizeTool(parseFrontmatter<Tool>(filePath))
}

export function getToolsByCategory(category: string): Tool[] {
  return getAllTools().filter((tool) => tool.category === category)
}

// NOTE: gray-matter 会把 YAML 裸日期（如 2026-05-21）解析为 Date 对象，
// 必须用 instanceof 判断后统一转为毫秒数，不能直接调用 .split()
function toDateMs(val: unknown): number {
  if (!val) return 0
  if (val instanceof Date) return val.getTime()
  const ms = new Date(String(val)).getTime()
  return isNaN(ms) ? 0 : ms
}

function toDateDayStr(val: unknown): string {
  if (!val) return '1970-01-01'
  if (val instanceof Date) return val.toISOString().split('T')[0]
  return String(val).split('T')[0]
}

// Posts
export function getAllPosts(): Post[] {
  const postsDir = path.join(CONTENT_DIR, 'blog')
  const files = getFiles(postsDir)

  const todayStr = new Date().toISOString().split('T')[0]

  return files
    .map((file) => {
      const filePath = path.join(postsDir, file)
      return parseFrontmatter<Post>(filePath)
    })
    .sort((a, b) => {
      const pubA = a.publishedAt || a.createdAt
      const pubB = b.publishedAt || b.createdAt

      const dayA = toDateDayStr(pubA)
      const dayB = toDateDayStr(pubB)

      // 未来日期的文章排到末尾
      const isFutureA = dayA > todayStr
      const isFutureB = dayB > todayStr
      if (isFutureA && !isFutureB) return 1
      if (!isFutureA && isFutureB) return -1

      // 同等情况按时间戳降序（最新在前）
      return toDateMs(pubB) - toDateMs(pubA)
    })
}


export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(CONTENT_DIR, 'blog', `${slug}.md`)
  if (!fs.existsSync(filePath)) return null
  return parseFrontmatter<Post>(filePath)
}

export function getPostsByCategory(category: string): Post[] {
  return getAllPosts().filter((post) => post.category === category)
}

// Workflows
export function getAllWorkflows(): Workflow[] {
  const workflowsDir = path.join(CONTENT_DIR, 'workflows')
  const files = getFiles(workflowsDir)
  
  return files
    .map((file) => {
      const filePath = path.join(workflowsDir, file)
      return parseFrontmatter<Workflow>(filePath)
    })
    .sort((a, b) => 
      new Date(b.publishedAt || b.createdAt).getTime() - 
      new Date(a.publishedAt || a.createdAt).getTime()
    )
}

export function getWorkflowBySlug(slug: string): Workflow | null {
  const filePath = path.join(CONTENT_DIR, 'workflows', `${slug}.md`)
  if (!fs.existsSync(filePath)) return null
  return parseFrontmatter<Workflow>(filePath)
}
