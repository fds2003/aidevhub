import type { Post } from '@/types'

const LEGACY_CUTOFF = new Date('2025-01-01T00:00:00.000Z').getTime()

/** 发布时间早于 2025-01-01 视为需在 2026 平台标注语境的旧文（可被 hideLegacy2026Banner 关闭） */
export function postNeedsLegacy2026Banner(post: Post): boolean {
  if (post.hideLegacy2026Banner) return false
  const t = new Date(post.publishedAt || post.createdAt).getTime()
  return t < LEGACY_CUTOFF
}

export function postHasCustom2026Note(post: Post): boolean {
  return Boolean(post.updateNote2026?.trim())
}

export function postShows2026UpdateSection(post: Post): boolean {
  return postHasCustom2026Note(post) || postNeedsLegacy2026Banner(post)
}
