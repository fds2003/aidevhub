import type { Post, Tool, Workflow } from '@/types'

/** 由已加载的 Tool/Post/Workflow 列表计算全站展示用数量（无 fs，可安全用于 Client 入参类型） */
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
