import { getAllPosts, getAllTools, getAllWorkflows } from '@/lib/content'
import { computeContentStats, type SiteContentStats } from '@/lib/content-stats'

export type { SiteContentStats } from '@/lib/content-stats'
export { computeContentStats } from '@/lib/content-stats'

/** Server / Server Component only (reads Markdown directories). */
export function getSiteContentStats(): SiteContentStats {
  return computeContentStats(getAllTools(), getAllPosts(), getAllWorkflows())
}
