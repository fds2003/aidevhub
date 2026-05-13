import { getAllPosts, getAllTools, getAllWorkflows } from '@/lib/content'
import { computeContentStats, type SiteContentStats } from '@/lib/content-stats'

export type { SiteContentStats } from '@/lib/content-stats'
export { computeContentStats } from '@/lib/content-stats'

/** 仅服务端 / Server Component 使用（会读 Markdown 目录） */
export function getSiteContentStats(): SiteContentStats {
  return computeContentStats(getAllTools(), getAllPosts(), getAllWorkflows())
}
