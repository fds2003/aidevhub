export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://aidevhub.net'

/** Google Analytics 4 measurement ID (override via NEXT_PUBLIC_GA4_MEASUREMENT_ID) */
export const GA4_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID || 'G-XW0J813JL9'
export const SITE_NAME = 'AI Dev Hub'
export const SITE_DESCRIPTION = 'Hands-on Google Antigravity guides, Cloudflare Workers tutorials, and an MCP server directory. Real workflows, configuration recipes, and benchmarks for AI-powered developers.'
export const SITE_KEYWORDS = 'Google Antigravity, Antigravity rules, Antigravity tutorial, Cloudflare Workers, MCP servers, Model Context Protocol, AI coding tools, AI agents, AI workflow automation'
export const AUTHOR = 'AI Dev Hub'
export const AUTHOR_EMAIL = 'hello@aidevhub.net'

/**
 * Content licensing (GEO): a permissive, attribution-required license makes
 * retrieval engines and corpus builders far likelier to keep the source URL
 * when quoting or reusing our content.
 */
export const CONTENT_LICENSE_NAME = 'CC BY 4.0'
export const CONTENT_LICENSE_URL = 'https://creativecommons.org/licenses/by/4.0/'

/**
 * Display-name normalization for tool pages: 'leonardo' → 'Leonardo',
 * 'google-antigravity' → 'Google Antigravity', 'claude-code' → 'Claude Code'.
 */
export function normalizeToolName(raw: string): string {
  return raw
    .replace(/[-_]+/g, ' ')
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

// Categories
export const CATEGORIES = [
  {
    slug: 'ai-coding-tools',
    name: 'AI Coding Tools',
    description: 'AI-powered code editors, IDEs, and coding assistants',
    icon: 'Code2',
  },
  {
    slug: 'mcp',
    name: 'MCP Ecosystem',
    description: 'Model Context Protocol servers, tutorials, and use cases',
    icon: 'Boxes',
  },
  {
    slug: 'ai-agents',
    name: 'AI Agents',
    description: 'AI agent frameworks, automation tools, and orchestration',
    icon: 'Bot',
  },
  {
    slug: 'ai-workflow',
    name: 'AI Workflow',
    description: 'Productivity workflows powered by AI',
    icon: 'Workflow',
  },
  {
    slug: 'comparisons',
    name: 'Comparisons',
    description: 'In-depth comparisons of AI tools and platforms',
    icon: 'Scale',
  },
] as const

// Social Links
export const SOCIAL_LINKS = {
  twitter: 'https://twitter.com/aidevhub',
  github: 'https://github.com/aidevhub',
  rss: '/rss.xml',
} as const

// Navigation
export const NAV_ITEMS = [
  { href: '/tools', label: 'Tools' },
  { href: '/blog', label: 'Blog' },
  { href: '/workflows', label: 'Workflows' },
  { href: '/mcp', label: 'MCP' },
  { href: '/categories', label: 'Categories' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
] as const
