import Link from 'next/link'
import { ArrowRight, Code2, Bot, Workflow, Boxes } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CATEGORIES } from '@/lib/constants'
import { Badge } from '@/components/ui/glass-badge'

const iconMap: Record<string, React.ElementType> = {
  Code2,
  Bot,
  Workflow,
  Boxes,
}

// Stats data
const stats = [
  { label: 'AI Tools', value: '50+', icon: Code2 },
  { label: 'MCP Servers', value: '25+', icon: Boxes },
  { label: 'Workflows', value: '40+', icon: Workflow },
  { label: 'Community', value: '10K+', icon: Bot },
]

export function HeroSection() {
  return (
    <section className="relative pt-8 pb-16 md:pt-12 md:pb-24 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#00D9FF]/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container relative text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 animate-fade-in" style={{ animationDelay: '60ms' }}>
          Your Premier AI Developer
          <br />
          <span className="text-primary">Productivity Platform</span>
        </h1>
        
        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in" style={{ animationDelay: '120ms' }}>
          Discover the best AI Coding Tools, MCP Ecosystem, AI Agents, and
          Workflow automation. Stay ahead in the AI-powered development era.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in" style={{ animationDelay: '180ms' }}>
          <Button size="lg" className="group" asChild>
            <Link href="/tools">
              Explore Tools 
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/blog">Read the Blog</Link>
          </Button>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '240ms' }}>
          {stats.map((stat, i) => (
            <div key={stat.label} className="px-6 py-4 bg-[#111118]/60 border border-[#1c1c2e] rounded-xl backdrop-blur-sm">
              <div className="flex items-center justify-center gap-2 mb-1">
                <stat.icon className="w-4 h-4 text-[#00D9FF]" />
                <span className="text-2xl md:text-3xl font-bold text-white font-mono">{stat.value}</span>
              </div>
              <span className="text-xs text-zinc-500 font-mono">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function CategoriesSection() {
  return (
    <section className="py-12 bg-muted/50">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-8">Browse by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {CATEGORIES.map((category) => {
            const Icon = iconMap[category.icon] || Code2
            return (
              <Link
                key={category.slug}
                href={`/categories/${category.slug}`}
                className="group p-6 rounded-lg border bg-card hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <Icon className="h-10 w-10 mb-4 text-primary group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold mb-2">{category.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {category.description}
                </p>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
