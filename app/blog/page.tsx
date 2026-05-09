import Link from 'next/link'
import { Clock, Calendar, ArrowRight } from 'lucide-react'
import { GlassCard } from '@/components/ui/glass-card'
import { Badge } from '@/components/ui/glass-badge'
import { GradientSection, SectionHeader } from '@/components/ui/gradient-section'
import { getAllPosts } from '@/lib/content'
import { format } from 'date-fns'

export const metadata = {
  title: 'Blog',
  description: 'Tutorials, guides, and insights on AI coding tools, MCP, and developer productivity.',
}

export default function BlogPage() {
  const posts = getAllPosts()

  // Group posts by category for better organization
  const categories = Array.from(new Set(posts.map((p) => p.category)))

  return (
    <main className="min-h-screen bg-[#080810]">
      {/* Hero */}
      <GradientSection variant="default" size="lg">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-xs font-mono text-[#00D9FF] bg-[#00D9FF]/8 rounded-md border border-[#00D9FF]/20">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00D9FF] animate-pulse" />
            {posts.length} Articles
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            AI Dev Hub Blog
          </h1>
          <p className="text-lg text-zinc-400 leading-relaxed">
            Tutorials, guides, and insights on AI coding tools, MCP, and developer productivity.
          </p>
        </div>
      </GradientSection>

      {/* Blog Posts */}
      <GradientSection variant="muted" size="lg">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mb-10 justify-center">
          <Badge variant="cyan" size="md">All</Badge>
          {categories.map((cat) => (
            <Badge key={cat} variant="outline" size="md">{cat}</Badge>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
          {posts.map((post, index) => (
            <GlassCard 
              key={post.slug} 
              hover 
              padding="lg" 
              className="group animate-fade-in"
            >
              {/* Featured Badge for first item */}
              {index === 0 && (
                <div className="mb-4">
                  <Badge variant="cyan" size="sm">Featured</Badge>
                </div>
              )}

              {/* Meta */}
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="outline" size="sm">{post.category}</Badge>
                {post.readingTime && (
                  <div className="flex items-center gap-1 text-zinc-600 text-xs font-mono">
                    <Clock className="w-3 h-3" />
                    {post.readingTime} min
                  </div>
                )}
              </div>

              {/* Title */}
              <h2 className="text-lg font-semibold text-white mb-3 leading-snug group-hover:text-[#00D9FF] transition-colors line-clamp-2">
                <Link href={`/blog/${post.slug}`}>
                  {post.title}
                </Link>
              </h2>

              {/* Description */}
              <p className="text-sm text-zinc-500 mb-4 line-clamp-3 leading-relaxed">
                {post.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {post.tags?.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="outline" size="sm">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-[#1c1c2e]">
                <div className="flex items-center gap-1.5 text-zinc-600 text-xs font-mono">
                  <Calendar className="w-3 h-3" />
                  <time dateTime={post.publishedAt || post.createdAt}>
                    {format(new Date(post.publishedAt || post.createdAt), 'MMM d, yyyy')}
                  </time>
                </div>
                <Link 
                  href={`/blog/${post.slug}`} 
                  className="flex items-center gap-1 text-xs font-mono text-[#00D9FF] group-hover:underline"
                >
                  Read <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </GlassCard>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#111118] border border-[#1c1c2e] mb-4">
              <span className="text-2xl">📝</span>
            </div>
            <p className="text-zinc-500 font-mono">No posts found. Check back soon!</p>
          </div>
        )}
      </GradientSection>
    </main>
  )
}
