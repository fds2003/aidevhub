import { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/constants'
import { getAllTools, getAllPosts, getAllWorkflows } from '@/lib/content'

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
      url: `${SITE_URL}/categories`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/mcp`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ]

  const toolPages = tools.map((tool) => ({
    url: `${SITE_URL}/tools/${tool.slug}`,
    lastModified: new Date(tool.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const postPages = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const workflowPages = workflows.map((workflow) => ({
    url: `${SITE_URL}/workflows/${workflow.slug}`,
    lastModified: new Date(workflow.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...toolPages, ...postPages, ...workflowPages]
}
