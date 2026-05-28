import { MetadataRoute } from 'next'
import { SITE_URL, CATEGORIES } from '@/lib/constants'
import { getAllTools, getAllPosts, getAllWorkflows } from '@/lib/content'
import { getMCPServerSlugs } from '@/lib/mcp-directory'

/** With `output: 'export'`, mark routes as statically generated. */
export const dynamic = 'force-static'

function lastModifiedFrom(isoPrimary?: string, isoFallback?: string): Date {
  const raw = isoPrimary || isoFallback
  if (!raw) return new Date()
  const d = new Date(raw)
  return Number.isNaN(d.getTime()) ? new Date() : d
}

export default function sitemap(): MetadataRoute.Sitemap {
  const tools = getAllTools()
  const posts = getAllPosts()
  const workflows = getAllWorkflows()

  const staticPages = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${SITE_URL}/tools`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/workflows`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/mcp`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/cloudflare`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.75,
    },
    {
      url: `${SITE_URL}/categories`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.2,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.2,
    },
    {
      url: `${SITE_URL}/disclaimer`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.2,
    },
  ]

  const categoryPages = CATEGORIES.map((category) => ({
    url: `${SITE_URL}/categories/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.65,
  }))

  const toolPages = tools.map((tool) => ({
    url: `${SITE_URL}/tools/${tool.slug}`,
    lastModified: lastModifiedFrom(tool.updatedAt, tool.createdAt),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const postPages = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: lastModifiedFrom(post.updatedAt, post.publishedAt || post.createdAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const workflowPages = workflows.map((workflow) => ({
    url: `${SITE_URL}/workflows/${workflow.slug}`,
    lastModified: lastModifiedFrom(workflow.updatedAt, workflow.publishedAt || workflow.createdAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const mcpServerPages = getMCPServerSlugs().map((slug) => ({
    url: `${SITE_URL}/mcp/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.72,
  }))

  return [...staticPages, ...categoryPages, ...toolPages, ...postPages, ...workflowPages, ...mcpServerPages]
}
