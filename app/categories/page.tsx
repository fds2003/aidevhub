import Link from 'next/link'
import { Code2, Bot, Workflow, Boxes, Scale } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CATEGORIES } from '@/lib/constants'

export const metadata = {
  title: 'Categories',
  description: 'Browse AI tools and content by category.',
  alternates: { canonical: '/categories' },
  openGraph: {
    title: 'Categories',
    description: 'Browse AI tools and content by category.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Categories',
    description: 'Browse AI tools and content by category.',
  },
}

const iconMap: Record<string, React.ElementType> = {
  Code2,
  Bot,
  Workflow,
  Boxes,
  Scale,
}

export default function CategoriesPage() {
  return (
    <div className="container py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Categories</h1>
        <p className="text-xl text-muted-foreground">
          Browse AI tools and content by category.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CATEGORIES.map((category) => {
          const Icon = iconMap[category.icon] || Code2
          return (
            <Link key={category.slug} href={`/categories/${category.slug}`}>
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{category.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{category.description}</p>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
