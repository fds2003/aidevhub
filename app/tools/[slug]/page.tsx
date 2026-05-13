import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, ExternalLink, Check, X as XIcon, Globe, Star } from 'lucide-react'
import { GlassCard } from '@/components/ui/glass-card'
import { Badge, ToolBadge } from '@/components/ui/glass-badge'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { getAllTools, getAllPosts, getAllWorkflows, getToolBySlug } from '@/lib/content'
import { generateSoftwareSchema } from '@/lib/seo-schema'
import { getRelatedPosts, getRelatedWorkflows } from '@/lib/related-posts'
import { SITE_URL } from '@/lib/constants'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  const tools = getAllTools()
  return tools.map((tool) => ({ slug: tool.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const tool = getToolBySlug(slug)
  if (!tool) return { title: 'Tool Not Found' }

  return {
    title: tool.name,
    description: tool.description,
    openGraph: {
      title: `${tool.name} - AI Dev Hub`,
      description: tool.description,
      type: 'website',
      images: tool.logo ? [{ url: `${SITE_URL}${tool.logo}` }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${tool.name} - AI Dev Hub`,
      description: tool.description,
    },
    alternates: {
      canonical: `/tools/${slug}`,
    },
  }
}

export default async function ToolDetailPage({ params }: PageProps) {
  const { slug } = await params
  const tool = getToolBySlug(slug)

  if (!tool) {
    notFound()
  }

  // Get related content
  const allPosts = getAllPosts()
  const allWorkflows = getAllWorkflows()
  const relatedPosts = getRelatedPosts(tool, allPosts, 3)
  const relatedWorkflows = getRelatedWorkflows(tool, allWorkflows, 3)
  const hasRelated = relatedPosts.length > 0 || relatedWorkflows.length > 0

  // Generate schema.org SoftwareApplication markup
  const softwareSchema = generateSoftwareSchema(tool, SITE_URL)

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />

      <main className="min-h-screen bg-[#080810]">
        <div className="container py-8 max-w-5xl">
          {/* Breadcrumbs */}
          <Breadcrumbs
            items={[
              { label: 'Tools', href: '/tools' },
              { label: tool.name, href: `/tools/${slug}` },
            ]}
          />

          {/* Back link */}
          <Link 
            href="/tools" 
            className="inline-flex items-center gap-2 text-sm font-mono text-zinc-500 hover:text-[#00D9FF] transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Tools
          </Link>

          {/* Header Card */}
          <GlassCard padding="lg" className="mb-8">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Logo & Basic Info */}
              <div className="flex items-start gap-5 flex-1">
                <div className="w-16 h-16 rounded-xl bg-[#1c1c2e] border border-[#282838] flex items-center justify-center text-2xl font-bold text-white font-mono shrink-0">
                  {tool.name[0]}
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                      {tool.name}
                    </h1>
                    {tool.pricing && <ToolBadge type={tool.pricing} />}
                  </div>
                  <p className="text-zinc-400 mb-4 leading-relaxed">{tool.description}</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="cyan" size="sm">{tool.category}</Badge>
                    {tool.tags?.slice(0, 4).map((tag) => (
                      <Badge key={tag} variant="outline" size="sm">{tag}</Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="lg:w-64 shrink-0">
                <a
                  href={tool.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full h-12 px-6 bg-[#00D9FF] hover:bg-[#00D9FF]/90 text-[#080810] font-semibold rounded-xl transition-all glow-cyan"
                >
                  <Globe className="w-4 h-4" />
                  Visit Website
                  <ExternalLink className="w-4 h-4" />
                </a>
                <div className="flex items-center justify-center gap-4 mt-3 text-xs text-zinc-600 font-mono">
                  <span className="flex items-center gap-1">
                    <Star className="w-3 h-3" /> 4.8/5
                  </span>
                  <span>10K+ users</span>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Long Description */}
          {tool.longDescription && (
            <GlassCard padding="lg" className="mb-8">
              <h2 className="text-xl font-semibold text-white mb-4">About {tool.name}</h2>
              <p className="text-zinc-400 leading-relaxed">{tool.longDescription}</p>
            </GlassCard>
          )}

          {/* Features & Pros/Cons */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Features */}
            {tool.features && tool.features.length > 0 && (
              <GlassCard padding="lg" className="lg:col-span-2">
                <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00D9FF]" />
                  Key Features
                </h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {tool.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm text-zinc-400">
                      <Check className="w-4 h-4 text-[#00FF87] mt-0.5 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            )}

            {/* Pros */}
            {tool.pros && tool.pros.length > 0 && (
              <GlassCard padding="lg">
                <h2 className="text-lg font-semibold text-[#00FF87] mb-4 flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  Pros
                </h2>
                <ul className="space-y-2">
                  {tool.pros.map((pro, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-zinc-400">
                      <span className="text-[#00FF87]">+</span>
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            )}
          </div>

          {/* Cons */}
          {tool.cons && tool.cons.length > 0 && (
            <GlassCard padding="lg" className="mb-8">
              <h2 className="text-lg font-semibold text-rose-400 mb-4 flex items-center gap-2">
                <XIcon className="w-4 h-4" />
                Cons
              </h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {tool.cons.map((con, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-zinc-400">
                    <span className="text-rose-400">−</span>
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          )}

          {/* Alternatives */}
          {tool.alternatives && tool.alternatives.length > 0 && (
            <GlassCard padding="lg" className="mb-8">
              <h2 className="text-lg font-semibold text-white mb-4">Alternatives</h2>
              <div className="flex flex-wrap gap-2">
                {tool.alternatives.map((alt) => (
                  <Link 
                    key={alt} 
                    href={`/tools/${alt}`}
                    className="px-4 py-2 text-sm font-mono text-zinc-400 bg-[#111118] border border-[#1c1c2e] rounded-lg hover:text-[#00D9FF] hover:border-[#00D9FF]/20 transition-all"
                  >
                    {alt.replace(/-/g, ' ')}
                  </Link>
                ))}
              </div>
            </GlassCard>
          )}

          {/* Related Content */}
          {hasRelated && (
            <div className="border-t border-[#1c1c2e] pt-8">
              <h2 className="text-2xl font-bold text-white mb-6">Related Content</h2>

              {relatedPosts.length > 0 && (
                <>
                  <h3 className="text-sm font-mono text-zinc-500 uppercase tracking-wider mb-4">Articles</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    {relatedPosts.map((post) => (
                      <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                        <GlassCard hover padding="md">
                          <Badge variant="outline" size="sm" className="mb-3">{post.category}</Badge>
                          <h3 className="font-semibold text-white mb-2 line-clamp-2 group-hover:text-[#00D9FF] transition-colors">
                            {post.title}
                          </h3>
                          <p className="text-sm text-zinc-500 line-clamp-2 mb-3">{post.description}</p>
                          <span className="text-xs font-mono text-[#00D9FF] flex items-center gap-1">
                            Read more <ArrowRight className="w-3 h-3" />
                          </span>
                        </GlassCard>
                      </Link>
                    ))}
                  </div>
                </>
              )}

              {relatedWorkflows.length > 0 && (
                <>
                  <h3 className="text-sm font-mono text-zinc-500 uppercase tracking-wider mb-4">Workflows</h3>
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
      </main>
    </>
  )
}
