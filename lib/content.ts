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
  
  return files.map((file) => {
    const filePath = path.join(toolsDir, file)
    return normalizeTool(parseFrontmatter<Tool>(filePath))
  })
}

export function getToolBySlug(slug: string): Tool | null {
  const filePath = path.join(CONTENT_DIR, 'tools', `${slug}.md`)
  if (!fs.existsSync(filePath)) return null
  return normalizeTool(parseFrontmatter<Tool>(filePath))
}

export function getToolsByCategory(category: string): Tool[] {
  return getAllTools().filter((tool) => tool.category === category)
}

// Posts
export function getAllPosts(): Post[] {
  const postsDir = path.join(CONTENT_DIR, 'blog')
  const files = getFiles(postsDir)
  
  return files
    .map((file) => {
      const filePath = path.join(postsDir, file)
      return parseFrontmatter<Post>(filePath)
    })
    .sort((a, b) => 
      new Date(b.publishedAt || b.createdAt).getTime() - 
      new Date(a.publishedAt || a.createdAt).getTime()
    )
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
