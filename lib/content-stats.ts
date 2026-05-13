import type { Post, Tool, Workflow } from '@/types'

/** Derive public counts from in-memory Tool/Post/Workflow lists (no fs; safe for client prop typing). */
export function computeContentStats(tools: Tool[], posts: Post[], workflows: Workflow[]) {
  return {
    toolCount: tools.length,
    postCount: posts.length,
    workflowCount: workflows.length,
    mcpCount: tools.filter((t) => t.category === 'mcp').length,
    aiCodingToolsCount: tools.filter((t) => t.category === 'ai-coding-tools').length,
    aiAgentsCount: tools.filter((t) => t.category === 'ai-agents').length,
    cloudflareToolsCount: tools.filter((t) => t.category === 'Cloudflare').length,
  } as const
}

export type SiteContentStats = ReturnType<typeof computeContentStats>
