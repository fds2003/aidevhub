import Link from 'next/link'
import { ArrowRight, Clock } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { Post } from '@/types'
import { formatDistanceToNow } from 'date-fns'

interface LatestTutorialsProps {
  posts: Post[]
}

export function LatestTutorials({ posts }: LatestTutorialsProps) {
  return (
    <section className="py-12 bg-muted/50">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Latest Tutorials</h2>
          <Button variant="ghost" asChild>
            <Link href="/blog">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Card key={post.slug} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary">{post.category}</Badge>
                  {post.readingTime && (
                    <span className="flex items-center text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      {post.readingTime} min read
                    </span>
                  )}
                </div>
                <CardTitle className="text-xl line-clamp-2">
                  <Link href={`/blog/${post.slug}`} className="hover:text-primary">
                    {post.title}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 line-clamp-3">
                  {post.description}
                </p>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>
                    {formatDistanceToNow(new Date(post.publishedAt || post.createdAt), {
                      addSuffix: true,
                    })}
                  </span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-primary hover:underline"
                  >
                    Read more
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
