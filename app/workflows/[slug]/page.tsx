import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, Clock, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { getAllTools, getAllPosts, getAllWorkflows, getWorkflowBySlug } from '@/lib/content'
import { getRelatedPosts } from '@/lib/related-posts'
import { CopyToClipboard } from '@/components/ui/copy-to-clipboard'
import { generateBreadcrumbSchema, generateHowToSchema } from '@/lib/seo-schema'
import { SITE_URL } from '@/lib/constants'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  const workflows = getAllWorkflows()
  return workflows.map((workflow) => ({ slug: workflow.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const workflow = getWorkflowBySlug(slug)
  if (!workflow) return { title: 'Workflow Not Found' }

  return {
    title: workflow.title,
    description: workflow.description,
    openGraph: {
      title: `${workflow.title} - AI Dev Hub`,
      description: workflow.description,
      type: 'website',
      images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${workflow.title} - AI Dev Hub`,
      description: workflow.description,
    },
    alternates: {
      canonical: `/workflows/${slug}`,
    },
  }
}

export default async function WorkflowDetailPage({ params }: PageProps) {
  const { slug } = await params
  const workflow = getWorkflowBySlug(slug)

  if (!workflow) {
    notFound()
  }

  const allTools = getAllTools()
  const allPosts = getAllPosts()
  const allWorkflows = getAllWorkflows()

  // Get related workflows (exclude current)
  const relatedWorkflows = allWorkflows
    .filter((wf) => wf.slug !== slug && wf.category === workflow.category)
    .slice(0, 3)

  // Get related posts
  const relatedPosts = getRelatedPosts(workflow, allPosts, 3)
  const hasRelated = relatedWorkflows.length > 0 || relatedPosts.length > 0

  // Schema.org structured data
  const breadcrumbSchema = generateBreadcrumbSchema(
    [
      { name: 'AI Dev Hub', url: '/' },
      { name: 'Workflows', url: '/workflows' },
      { name: workflow.title, url: `/workflows/${slug}` },
    ],
    SITE_URL
  )

  const howToSchema = generateHowToSchema(
    workflow.title,
    workflow.description,
    workflow.steps?.map((s) => ({ name: s.title, text: s.description })) || []
  )

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <div className="container py-12 max-w-4xl">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: 'Workflows', href: '/workflows' },
            { label: workflow.title, href: `/workflows/${slug}` },
          ]}
        />

        {/* Back link */}
        <Button variant="ghost" className="mb-8" asChild>
          <Link href="/workflows">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Workflows
          </Link>
        </Button>

        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <Badge
              variant={
                workflow.difficulty === 'beginner'
                  ? 'success'
                  : workflow.difficulty === 'advanced'
                  ? 'destructive'
                  : 'secondary'
              }
            >
              {workflow.difficulty}
            </Badge>
            <Badge variant="outline">{workflow.category}</Badge>
            {workflow.duration && (
              <span className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                {workflow.duration}
              </span>
            )}
          </div>
          <h1 className="text-4xl font-bold mb-4">{workflow.title}</h1>
          <p className="text-xl text-muted-foreground mb-6">{workflow.description}</p>

          {/* Tools used */}
          {workflow.tools && workflow.tools.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-muted-foreground mr-2">Tools:</span>
              {workflow.tools.map((toolSlug) => {
                const tool = allTools.find((t) => t.slug === toolSlug)
                return (
                  <Link key={toolSlug} href={`/tools/${toolSlug}`}>
                    <Badge variant="outline" className="cursor-pointer hover:bg-secondary">
                      {tool?.name || toolSlug}
                    </Badge>
                  </Link>
                )
              })}
            </div>
          )}
        </header>

        {/* Steps */}
        {workflow.steps && workflow.steps.length > 0 && (
          <div className="space-y-6 mb-10">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <BookOpen className="h-6 w-6" />
              Steps
            </h2>
            {workflow.steps
              .sort((a, b) => a.order - b.order)
              .map((step) => (
                <Card key={step.order} className="relative overflow-hidden">
                  {/* Step number indicator */}
                  <div className="absolute top-0 left-0 w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg rounded-br-lg">
                    {step.order}
                  </div>

                  <CardHeader>
                    <CardTitle className="pl-8">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-8 space-y-4">
                    <p className="text-muted-foreground">{step.description}</p>

                    {step.prompt && (
                      <div className="bg-muted/50 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2 text-sm font-medium text-muted-foreground">
                          <BookOpen className="h-3.5 w-3.5" />
                          AI Prompt
                          <CopyToClipboard text={step.prompt} className="ml-auto" />
                        </div>
                        <p className="text-sm whitespace-pre-wrap font-mono bg-muted/30 rounded p-3">
                          {step.prompt}
                        </p>
                      </div>
                    )}

                    {step.code && (
                      <div className="bg-zinc-900 dark:bg-zinc-950 rounded-lg p-4 text-sm overflow-x-auto">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-zinc-500 font-mono">Code</span>
                          <CopyToClipboard text={step.code} className="text-zinc-500 hover:text-zinc-300" />
                        </div>
                        <pre className="text-green-400 font-mono text-xs overflow-x-auto">
                          <code>{step.code}</code>
                        </pre>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
          </div>
        )}

        {/* Related content */}
        {hasRelated && (
          <div className="border-t border-zinc-800 pt-8 mt-8">
            <h2 className="text-2xl font-bold mb-6">Related Content</h2>

            {relatedWorkflows.length > 0 && (
              <>
                <h3 className="text-lg font-semibold mb-4 text-zinc-400">More Workflows</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {relatedWorkflows.map((wf) => (
                    <Link key={wf.slug} href={`/workflows/${wf.slug}`} className="group block">
                      <Card className="h-full hover:shadow-lg transition-shadow">
                        <CardContent className="p-4">
                          <Badge variant="secondary" className="mb-2">
                            {wf.difficulty}
                          </Badge>
                          <h4 className="font-semibold mb-2 group-hover:text-purple-400 transition-colors line-clamp-2">
                            {wf.title}
                          </h4>
                          <p className="text-sm text-zinc-500 line-clamp-2 mb-3">
                            {wf.description}
                          </p>
                          <span className="text-sm text-purple-400 group-hover:text-purple-300 flex items-center gap-1">
                            View workflow <ArrowRight className="w-3 h-3" />
                          </span>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </>
            )}

            {relatedPosts.length > 0 && (
              <>
                <h3 className="text-lg font-semibold mb-4 text-zinc-400">Related Articles</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedPosts.map((post) => (
                    <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                      <Card className="h-full hover:shadow-lg transition-shadow">
                        <CardContent className="p-4">
                          <Badge variant="secondary" className="mb-2">
                            {post.category}
                          </Badge>
                          <h4 className="font-semibold mb-2 group-hover:text-purple-400 transition-colors line-clamp-2">
                            {post.title}
                          </h4>
                          <p className="text-sm text-zinc-500 line-clamp-2 mb-3">
                            {post.description}
                          </p>
                          <span className="text-sm text-purple-400 group-hover:text-purple-300 flex items-center gap-1">
                            Read more <ArrowRight className="w-3 h-3" />
                          </span>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </>
  )
}
