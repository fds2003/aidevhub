import Link from 'next/link'
import { Clock, BarChart3 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getAllWorkflows } from '@/lib/content'

export const metadata = {
  title: 'AI Workflows',
  description: 'Discover proven workflows for AI-powered development, productivity, and automation.',
  alternates: { canonical: '/workflows' },
  openGraph: {
    title: 'AI Workflows | AI Dev Hub',
    description: 'Discover proven workflows for AI-powered development, productivity, and automation.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Workflows | AI Dev Hub',
    description: 'Discover proven workflows for AI-powered development, productivity, and automation.',
  },
}

const difficultyColors = {
  beginner: 'success',
  intermediate: 'warning',
  advanced: 'destructive',
} as const

export default function WorkflowsPage() {
  const workflows = getAllWorkflows()

  return (
    <div className="container py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">AI Workflows</h1>
        <p className="text-xl text-muted-foreground">
          Discover proven workflows for AI-powered development, productivity, and automation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workflows.map((workflow) => (
          <Card key={workflow.slug} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant={difficultyColors[workflow.difficulty]}>
                  {workflow.difficulty}
                </Badge>
                {workflow.duration && (
                  <span className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-1" />
                    {workflow.duration}
                  </span>
                )}
              </div>
              <CardTitle className="text-xl">
                <Link href={`/workflows/${workflow.slug}`} className="hover:text-primary">
                  {workflow.title}
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{workflow.description}</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="flex items-center gap-1">
                  <BarChart3 className="h-3 w-3" />
                  {workflow.steps?.length || 0} steps
                </Badge>
                {workflow.tools?.map((tool) => (
                  <Badge key={tool} variant="secondary">
                    {tool}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {workflows.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p>No workflows found. Check back soon!</p>
        </div>
      )}
    </div>
  )
}
