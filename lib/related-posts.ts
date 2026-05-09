/**
 * Related Content Utility
 * Find related content across tools, posts, and workflows
 */

import type { Tool, Post, Workflow } from '@/types'

interface ContentItem {
  slug: string
  title?: string
  name?: string
  description: string
  category: string
  tags?: string[]
  tools?: string[]
}

/**
 * Calculate similarity score between two content items
 */
function calculateSimilarity(item1: ContentItem, item2: ContentItem): number {
  let score = 0

  // Same category = high score
  if (item1.category === item2.category) {
    score += 3
  }

  // Shared tags = medium score
  if (item1.tags && item2.tags) {
    const sharedTags = item1.tags.filter((tag) => item2.tags?.includes(tag))
    score += sharedTags.length * 2
  }

  // For Workflow: shared tools = medium score
  if (item1.tools && item2.tools) {
    const sharedTools = item1.tools.filter((tool) => item2.tools?.includes(tool))
    score += sharedTools.length * 2
  }

  return score
}

/**
 * Get related tools for a given item
 */
export function getRelatedTools(
  currentItem: ContentItem,
  allTools: Tool[],
  limit: number = 3
): Tool[] {
  const otherTools = allTools.filter((t) => t.slug !== currentItem.slug)
  const scoredTools = otherTools.map((tool) => ({
    item: tool,
    score: calculateSimilarity(currentItem, tool as unknown as ContentItem),
  }))
  scoredTools.sort((a, b) => b.score - a.score)
  return scoredTools.slice(0, limit).map((t) => t.item)
}

/**
 * Get related posts for a given item (supports Tool, Post, Workflow)
 */
export function getRelatedPosts(
  currentItem: ContentItem,
  allPosts: Post[],
  limit: number = 3
): Post[] {
  const otherPosts = allPosts.filter((p) => p.slug !== currentItem.slug)
  const scoredPosts = otherPosts.map((post) => ({
    item: post,
    score: calculateSimilarity(currentItem, post as unknown as ContentItem),
  }))
  scoredPosts.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score
    return (
      new Date(b.item.publishedAt || b.item.createdAt).getTime() -
      new Date(a.item.publishedAt || a.item.createdAt).getTime()
    )
  })
  return scoredPosts.slice(0, limit).map((p) => p.item)
}

/**
 * Get related workflows for a given item
 */
export function getRelatedWorkflows(
  currentItem: ContentItem,
  allWorkflows: Workflow[],
  limit: number = 3
): Workflow[] {
  const scoredWorkflows = allWorkflows.map((wf) => ({
    item: wf,
    score: calculateSimilarity(currentItem, wf as unknown as ContentItem),
  }))
  scoredWorkflows.sort((a, b) => b.score - a.score)
  return scoredWorkflows.slice(0, limit).map((w) => w.item)
}

/**
 * Get all related content for a given item (cross-type)
 */
export function getRelatedContent(
  currentItem: ContentItem,
  allTools: Tool[],
  allPosts: Post[],
  allWorkflows: Workflow[],
  limits: { tools?: number; posts?: number; workflows?: number } = {}
): { tools: Tool[]; posts: Post[]; workflows: Workflow[] } {
  return {
    tools: getRelatedTools(currentItem, allTools, limits.tools || 3),
    posts: getRelatedPosts(currentItem, allPosts, limits.posts || 3),
    workflows: getRelatedWorkflows(currentItem, allWorkflows, limits.workflows || 3),
  }
}

// Legacy export for backward compatibility
export { getPostsByCategory } from './content'
