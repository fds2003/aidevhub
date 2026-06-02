import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CATEGORIES } from '@/lib/constants'
import { getAllTools, getAllPosts, getAllWorkflows } from '@/lib/content'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return CATEGORIES.map((cat) => ({ slug: cat.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const category = CATEGORIES.find((c) => c.slug === slug)
  if (!category) return { title: 'Category Not Found' }

  return {
    title: category.name,
    description: category.description,
    alternates: {
      canonical: `/categories/${slug}`,
    },
    openGraph: {
      title: category.name,
      description: category.description,
      images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: category.name,
      description: category.description,
    },
  }
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params
  const category = CATEGORIES.find((c) => c.slug === slug)
  if (!category) notFound()

  const tools = getAllTools().filter((t) => t.category === slug)
  const posts = getAllPosts().filter((p) => p.category === slug)
  const workflows = getAllWorkflows().filter((w) => w.category === slug)

  const hasContent = tools.length > 0 || posts.length > 0 || workflows.length > 0

  return (
    <div className="container py-12">
      <Button variant="ghost" className="mb-8" asChild>
        <Link href="/categories">
          <ArrowLeft className="mr-2 h-4 w-4" />
          All Categories
        </Link>
      </Button>

      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{category.name}</h1>
        <p className="text-xl text-muted-foreground">{category.description}</p>
      </header>

      {hasContent ? (
        <div className="space-y-12">
          {tools.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-4">Tools ({tools.length})</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tools.map((tool) => (
                  <Link key={tool.slug} href={`/tools/${tool.slug}`}>
                    <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                      <CardHeader>
                        <CardTitle className="text-xl">{tool.name}</CardTitle>
                        <Badge variant="outline">{tool.pricing}</Badge>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{tool.description}</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {posts.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-4">Articles ({posts.length})</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`}>
                    <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                      <CardHeader>
                        <CardTitle className="text-xl">{post.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{post.description}</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {workflows.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-4">Workflows ({workflows.length})</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {workflows.map((workflow) => (
                  <Card key={workflow.slug}>
                    <CardHeader>
                      <CardTitle className="text-xl">{workflow.title}</CardTitle>
                      <Badge variant={workflow.difficulty === 'beginner' ? 'success' : workflow.difficulty === 'intermediate' ? 'warning' : 'destructive'}>
                        {workflow.difficulty}
                      </Badge>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{workflow.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}
        </div>
      ) : (
        <div className="text-center py-12 text-muted-foreground">
          <p>No content in this category yet. Check back soon!</p>
        </div>
      )}
    </div>
  )
}
