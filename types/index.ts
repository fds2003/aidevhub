export interface Tool {
  slug: string
  name: string
  description: string
  longDescription?: string
  category: string
  tags: string[]
  website: string
  affiliateUrl?: string
  pricing: 'free' | 'freemium' | 'paid' | 'open-source'
  logo?: string
  screenshots?: string[]
  features?: string[]
  pros?: string[]
  cons?: string[]
  alternatives?: string[]
  createdAt: string
  updatedAt: string
  publishedAt?: string
}

export interface Post {
  slug: string
  title: string
  description: string
  content?: string
  category: string
  tags: string[]
  author?: string
  coverImage?: string
  readingTime?: number
  createdAt: string
  updatedAt: string
  publishedAt?: string
  featured?: boolean
  /** Markdown：2026 年对旧文的补充，展示在正文前 */
  updateNote2026?: string
  /** 为 true 时不展示「旧文默认提示框」（仍会展示 updateNote2026 若有） */
  hideLegacy2026Banner?: boolean
}

export interface Workflow {
  slug: string
  title: string
  description: string
  content?: string
  category: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  duration?: string
  tools: string[]
  steps: WorkflowStep[]
  createdAt: string
  updatedAt: string
  publishedAt?: string
  featured?: boolean
}

export interface WorkflowStep {
  order: number
  title: string
  description: string
  prompt?: string
  code?: string
  image?: string
}

export interface MCPServer {
  slug: string
  name: string
  description: string
  repository: string
  npmPackage?: string
  categories: string[]
  useCases: string[]
  createdAt: string
  updatedAt: string
}

export interface Category {
  slug: string
  name: string
  description: string
  icon: string
  count?: number
}

export interface NavItem {
  href: string
  label: string
}

export interface BreadcrumbItem {
  label: string
  href?: string
}
