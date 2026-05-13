import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Clock, Calendar, ArrowLeft, Tag, ArrowRight, Sparkles } from 'lucide-react'
import { GlassCard } from '@/components/ui/glass-card'
import { Badge } from '@/components/ui/glass-badge'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { TableOfContents } from '@/components/table-of-contents'
import { getAllPosts, getAllTools, getAllWorkflows, getPostBySlug } from '@/lib/content'
import { generateArticleSchema } from '@/lib/seo-schema'
import { calculateReadingTime, formatReadingTime } from '@/lib/reading-time'
import { getRelatedPosts, getRelatedTools, getRelatedWorkflows } from '@/lib/related-posts'
import { SITE_URL } from '@/lib/constants'
import { format } from 'date-fns'
import { MDXRemote } from '@/components/mdx-remote'
import { BlogPostUpdate2026 } from '@/components/blog-post-update-2026'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return { title: 'Post Not Found' }

  return {
    title: post.title,
    description: post.description,
    authors: [{ name: post.author || 'AI Dev Hub' }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.publishedAt ? new Date(post.publishedAt).toISOString() : undefined,
      modifiedTime: post.updatedAt ? new Date(post.updatedAt).toISOString() : undefined,
      authors: [post.author || 'AI Dev Hub'],
      tags: post.tags || [],
      images: post.coverImage ? [{ url: `${SITE_URL}${post.coverImage}` }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
    alternates: {
      canonical: `/blog/${slug}`,
    },
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  // Calculate reading time
  const readingTimeMinutes = post.content ? calculateReadingTime(post.content) : 0
  const readingTimeDisplay = formatReadingTime(readingTimeMinutes)

  // Get related content
  const allPosts = getAllPosts()
  const allTools = getAllTools()
  const allWorkflows = getAllWorkflows()
  const relatedPosts = getRelatedPosts(post, allPosts, 3)
  const relatedTools = getRelatedTools(post, allTools, 3)
  const relatedWorkflows = getRelatedWorkflows(post, allWorkflows, 3)
  const hasRelated = relatedPosts.length > 0 || relatedTools.length > 0 || relatedWorkflows.length > 0

  // Generate schema.org Article markup
  const articleSchema = generateArticleSchema(post, SITE_URL)

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <main className="min-h-screen bg-[#080810]">
        <article className="container py-8">
          <div className="max-w-4xl">
            {/* Breadcrumbs */}
            <Breadcrumbs
              items={[
                { label: 'Blog', href: '/blog' },
                { label: post.title, href: `/blog/${slug}` },
              ]}
            />

            {/* Back link */}
            <Link 
              href="/blog" 
              className="inline-flex items-center gap-2 text-sm font-mono text-zinc-500 hover:text-[#00D9FF] transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>

            {/* Header */}
            <header className="mb-8">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <Badge variant="cyan" size="sm">{post.category}</Badge>
                <div className="flex items-center gap-1 text-zinc-600 text-xs font-mono">
                  <Clock className="w-3 h-3" />
                  {readingTimeDisplay}
                </div>
                <div className="flex items-center gap-1 text-zinc-600 text-xs font-mono">
                  <Sparkles className="w-3 h-3" />
                  AI-powered content
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight leading-tight">
                {post.title}
              </h1>

              <p className="text-lg text-zinc-400 mb-6 leading-relaxed">{post.description}</p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500 border-b border-[#1c1c2e] pb-6">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <time dateTime={post.publishedAt || post.createdAt}>
                    {format(new Date(post.publishedAt || post.createdAt), 'MMMM d, yyyy')}
                  </time>
                </div>
                {post.tags && (
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    <span>{post.tags.slice(0, 3).join(', ')}</span>
                  </div>
                )}
              </div>
            </header>
          </div>

          <BlogPostUpdate2026 post={post} />

          {/* Content with TOC sidebar */}
          <div className="flex gap-8">
            {/* Main Content */}
            <div className="flex-1 max-w-4xl">
              <GlassCard padding="lg" className="mb-8">
                <div className="prose">
                  {post.content && <MDXRemote source={post.content} />}
                </div>
              </GlassCard>

              {/* Tags */}
              {post.tags && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="outline" size="sm">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Related content */}
              {hasRelated && (
                <div className="border-t border-[#1c1c2e] pt-8">
                  <h2 className="text-2xl font-bold text-white mb-6">Related Content</h2>

                  {relatedPosts.length > 0 && (
                    <>
                      <h3 className="text-sm font-mono text-zinc-500 uppercase tracking-wider mb-4">Articles</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                        {relatedPosts.map((relatedPost) => (
                          <Link key={relatedPost.slug} href={`/blog/${relatedPost.slug}`} className="group block">
                            <GlassCard hover padding="md">
                              <Badge variant="outline" size="sm" className="mb-3">{relatedPost.category}</Badge>
                              <h3 className="font-semibold text-white mb-2 line-clamp-2 group-hover:text-[#00D9FF] transition-colors">
                                {relatedPost.title}
                              </h3>
                              <p className="text-sm text-zinc-500 line-clamp-2 mb-3">{relatedPost.description}</p>
                              <span className="text-xs font-mono text-[#00D9FF] flex items-center gap-1">
                                Read more <ArrowRight className="w-3 h-3" />
                              </span>
                            </GlassCard>
                          </Link>
                        ))}
                      </div>
                    </>
                  )}

                  {relatedTools.length > 0 && (
                    <>
                      <h3 className="text-sm font-mono text-zinc-500 uppercase tracking-wider mb-4">Related Tools</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                        {relatedTools.map((tool) => (
                          <Link key={tool.slug} href={`/tools/${tool.slug}`} className="group block">
                            <GlassCard hover padding="md">
                              <Badge variant="cyan" size="sm" className="mb-3">{tool.pricing}</Badge>
                              <h3 className="font-semibold text-white mb-2 line-clamp-2 group-hover:text-[#00D9FF] transition-colors">
                                {tool.name}
                              </h3>
                              <p className="text-sm text-zinc-500 line-clamp-2 mb-3">{tool.description}</p>
                              <span className="text-xs font-mono text-[#00D9FF] flex items-center gap-1">
                                View tool <ArrowRight className="w-3 h-3" />
                              </span>
                            </GlassCard>
                          </Link>
                        ))}
                      </div>
                    </>
                  )}

                  {relatedWorkflows.length > 0 && (
                    <>
                      <h3 className="text-sm font-mono text-zinc-500 uppercase tracking-wider mb-4">Related Workflows</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {relatedWorkflows.map((wf) => (
                          <Link key={wf.slug} href={`/workflows/${wf.slug}`} className="group block">
                            <GlassCard hover padding="md">
                              <Badge variant="amber" size="sm" className="mb-3">{wf.difficulty}</Badge>
                              <h3 className="font-semibold text-white mb-2 line-clamp-2 group-hover:text-[#00D9FF] transition-colors">
                                {wf.title}
                              </h3>
                              <p className="text-sm text-zinc-500 line-clamp-2 mb-3">{wf.description}</p>
                              <span className="text-xs font-mono text-[#00D9FF] flex items-center gap-1">
                                View workflow <ArrowRight className="w-3 h-3" />
                              </span>
                            </GlassCard>
                          </Link>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* TOC Sidebar */}
            <aside className="hidden xl:block w-64 flex-shrink-0">
              <div className="sticky top-24">
                {post.content && <TableOfContents content={post.content} />}
              </div>
            </aside>
          </div>
        </article>
      </main>
    </>
  )
}
