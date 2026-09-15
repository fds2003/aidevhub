import type { Post } from '@/types'

const LEGACY_CUTOFF = new Date('2025-01-01T00:00:00.000Z').getTime()

/** Posts published before 2025-01-01 get the 2026 legacy banner unless hideLegacy2026Banner is set. */
export function postNeedsLegacy2026Banner(post: Post): boolean {
  if (post.hideLegacy2026Banner) return false
  const t = new Date(post.publishedAt || post.createdAt).getTime()
  return t < LEGACY_CUTOFF
}

/**
 * Legacy posts (pre-2025) are off-topic for the current site focus
 * (Antigravity / Cloudflare / MCP). They are excluded from the sitemap and
 * marked noindex so they stop diluting topical authority. Explicit
 * `noindex: false` in frontmatter keeps a legacy post indexable.
 */
export function postIsNoindex(post: Post): boolean {
  if (post.noindex === false) return false
  if (post.noindex) return true
  return new Date(post.publishedAt || post.createdAt).getTime() < LEGACY_CUTOFF
}

export function postHasCustom2026Note(post: Post): boolean {
  return Boolean(post.updateNote2026?.trim())
}

export function postShows2026UpdateSection(post: Post): boolean {
  return postHasCustom2026Note(post) || postNeedsLegacy2026Banner(post)
}
