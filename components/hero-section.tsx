import type { ElementType } from 'react'
import Link from 'next/link'
import { ArrowRight, Code2, Bot, BookOpen, Workflow, Boxes, Sparkles, Scale, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CATEGORIES } from '@/lib/constants'

const iconMap: Record<string, ElementType> = {
  Code2,
  Bot,
  Workflow,
  Boxes,
  Scale,
}

export type HeroStatsProps = {
  toolCount: number
  articleCount: number
  workflowCount: number
}

type CountStat = {
  key: string
  kind: 'count'
  value: string
  unit: string
  icon: ElementType
}

type CadenceStat = {
  key: string
  kind: 'cadence'
  title: string
  sub: string
  icon: ElementType
}

export function HeroSection({ toolCount, articleCount, workflowCount }: HeroStatsProps) {
  const stats: (CountStat | CadenceStat)[] = [
    {
      key: 'tools',
      kind: 'count',
      value: String(toolCount),
      unit: toolCount === 1 ? 'tool' : 'tools',
      icon: Code2,
    },
    {
      key: 'posts',
      kind: 'count',
      value: String(articleCount),
      unit: articleCount === 1 ? 'article' : 'articles',
      icon: BookOpen,
    },
    {
      key: 'cadence',
      kind: 'cadence',
      title: 'Weekly updates',
      sub: `${workflowCount} workflow template${workflowCount === 1 ? '' : 's'} · Totals match the content library`,
      icon: RefreshCw,
    },
  ]
  return (
    <section className="relative pt-8 pb-16 md:pt-12 md:pb-24 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#00D9FF]/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container relative text-center">
        {/* Terminal Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 text-xs font-mono bg-[#111118] border border-[#1c1c2e] rounded-full animate-fade-in">
          <Sparkles className="w-3.5 h-3.5 text-[#00D9FF]" />
          <span className="text-zinc-400">Powered by </span>
          <span className="text-[#00D9FF]">AI</span>
          <span className="text-zinc-600 mx-1">{'//'}</span>
          <span className="text-terminal-400">v2.0</span>
        </div>

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

        {/* Stats — real counts from the content library */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '240ms' }}>
          {stats.map((stat) => (
            <div
              key={stat.key}
              className="px-6 py-4 bg-[#111118]/60 border border-[#1c1c2e] rounded-xl backdrop-blur-sm"
            >
              {stat.kind === 'count' ? (
                <>
                  <div className="flex items-center justify-center gap-2 flex-wrap">
                    <stat.icon className="w-4 h-4 text-[#00D9FF] shrink-0" />
                    <span className="text-2xl md:text-3xl font-bold text-white font-mono tabular-nums">
                      {stat.value}
                      <span className="text-base md:text-lg font-semibold text-zinc-300 font-sans ml-1.5">
                        {stat.unit}
                      </span>
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <stat.icon className="w-4 h-4 text-[#00D9FF] shrink-0" />
                    <span className="text-lg md:text-xl font-semibold text-white">{stat.title}</span>
                  </div>
                  <p className="text-xs text-zinc-500 text-center leading-relaxed">{stat.sub}</p>
                </>
              )}
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
