import Link from 'next/link'
import { ArrowRight, ExternalLink } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { Tool } from '@/types'

interface FeaturedToolsProps {
  tools: Tool[]
}

export function FeaturedTools({ tools }: FeaturedToolsProps) {
  return (
    <section className="py-12">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Featured AI Tools</h2>
          <Button variant="ghost" asChild>
            <Link href="/tools">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <Card key={tool.slug} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-xl">{tool.name}</CardTitle>
                  <Badge
                    variant={
                      tool.pricing === 'free'
                        ? 'success'
                        : tool.pricing === 'paid'
                        ? 'default'
                        : 'secondary'
                    }
                  >
                    {tool.pricing}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{tool.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {tool.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Button asChild className="w-full">
                  <a
                    href={tool.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
