export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://aidevhub.net'
export const SITE_NAME = 'AI Dev Hub'
export const SITE_DESCRIPTION = 'Your definitive resource for AI-powered development tools, MCP servers, AI agents, and workflow automation. Discover, compare, and master the best AI tools for modern developers.'
export const SITE_KEYWORDS = 'AI coding tools, AI agents, MCP, Model Context Protocol, AI workflow automation, Cursor, Claude Code, Windsurf, GitHub Copilot, AI development tools'
export const AUTHOR = 'AI Dev Hub'
export const AUTHOR_EMAIL = 'hello@aidevhub.net'

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
] as const
