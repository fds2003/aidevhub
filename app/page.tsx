import { ArrowRight } from 'lucide-react';
import { GradientSection, SectionHeader } from '@/components/ui/gradient-section';
import { ToolCard } from '@/components/ui/tool-card';
import { GlassCard } from '@/components/ui/glass-card';
import { Badge } from '@/components/ui/glass-badge';
import { GlassButton } from '@/components/ui/glass-button';
import { HeroSection } from '@/components/hero-section';
import { computeContentStats } from '@/lib/content-stats';
import { getAllTools, getAllPosts, getAllWorkflows } from '@/lib/content';
import Link from 'next/link';
import { format } from 'date-fns';

export default function HomePage() {
  const allTools = getAllTools()
  const allPosts = getAllPosts()
  const allWorkflows = getAllWorkflows()
  const counts = computeContentStats(allTools, allPosts, allWorkflows)

  const featuredTools = allTools.slice(0, 4).map((tool) => ({
    slug: tool.slug,
    name: tool.name,
    tagline: tool.description,
    pricing: tool.pricing,
    categories: [tool.category],
  }))

  const latestPosts = allPosts.slice(0, 3).map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.description,
    category: post.category,
    date: format(new Date(post.publishedAt || post.createdAt), 'MMM d, yyyy'),
  }))

  const categories = [
    {
      name: 'AI Coding',
      count: counts.aiCodingToolsCount,
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
        </svg>
      ),
      description: 'AI-powered code editors and assistants',
      href: '/categories/ai-coding-tools',
      color: 'text-[#00D9FF]',
      bg: 'bg-[#00D9FF]/10',
    },
    {
      name: 'MCP Servers',
      count: counts.mcpCount,
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 8.25h13.5M5.25 12h13.5M5.25 15.75h13.5" />
        </svg>
      ),
      description: 'Model Context Protocol servers and tools',
      href: '/mcp',
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
    },
    {
      name: 'AI Agents',
      count: counts.aiAgentsCount,
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
        </svg>
      ),
      description: 'Autonomous AI agents and frameworks',
      href: '/categories/ai-agents',
      color: 'text-terminal-400',
      bg: 'bg-terminal-500/10',
    },
    {
      name: 'Cloudflare',
      count: counts.cloudflareToolsCount,
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
        </svg>
      ),
      description: 'Workers, R2, D1, KV, Pages, Queues, AI',
      href: '/cloudflare',
      color: 'text-orange-400',
      bg: 'bg-orange-500/10',
    },
    {
      name: 'Workflows',
      count: counts.workflowCount,
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
        </svg>
      ),
      description: 'Proven AI workflows and automations',
      href: '/workflows',
      color: 'text-amber-400',
      bg: 'bg-amber-500/10',
    },
  ]

  return (
    <main className="min-h-screen bg-[#080810]">
      <HeroSection
        toolCount={counts.toolCount}
        articleCount={counts.postCount}
        workflowCount={counts.workflowCount}
      />

      {/* Why Choose Us */}
      <GradientSection variant="default" size="sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            {
              icon: "🎯",
              title: "Curated Quality",
              desc: "Every tool is hand-picked and tested by developers"
            },
            {
              icon: "⚡",
              title: "Always Fresh",
              desc: "Updated weekly with the latest AI developments"
            },
            {
              icon: "🔧",
              title: "Practical Focus",
              desc: "Real workflows you can implement today"
            }
          ].map((item) => (
            <div key={item.title} className="flex items-start gap-4 p-4">
              <span className="text-2xl shrink-0">{item.icon}</span>
              <div>
                <h3 className="text-sm font-semibold text-white mb-1">{item.title}</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </GradientSection>

      {/* Categories */}
      <GradientSection variant="muted" size="lg">
        <SectionHeader
          badge="Browse by Category"
          title="Find What You Need"
          description="Explore our curated collection of AI development resources"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <GlassCard key={cat.name} hover padding="lg" className="group">
              <div className={`w-10 h-10 ${cat.bg} rounded-lg flex items-center justify-center mb-4 ${cat.color}`}>
                {cat.icon}
              </div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-semibold text-white group-hover:text-[#00D9FF] transition-colors">
                  {cat.name}
                </h3>
                <Badge variant="outline" size="sm">{cat.count}</Badge>
              </div>
              <p className="text-sm text-zinc-500 mb-4 leading-relaxed">{cat.description}</p>
              <Link href={cat.href} className="inline-flex items-center text-xs font-mono text-zinc-500 group-hover:text-[#00D9FF] transition-colors">
                Explore <span className="ml-1 opacity-50">→</span>
              </Link>
            </GlassCard>
          ))}
        </div>
      </GradientSection>

      {/* Featured Tools */}
      <GradientSection variant="grid" size="lg">
        <SectionHeader
          badge="Trending"
          title="Popular AI Tools"
          action={
            <GlassButton variant="secondary" size="sm" as="link" href="/tools">
              View All <ArrowRight className="w-4 h-4 ml-2" />
            </GlassButton>
          }
        />
        {featuredTools.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 stagger-children">
            {featuredTools.map((tool) => (
              <div key={tool.slug} className="animate-fade-in">
                <ToolCard tool={tool} variant="featured" />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-zinc-500 font-mono text-sm">No tools found.</p>
        )}
      </GradientSection>

      {/* Latest Articles */}
      {/* Latest Articles — Editorial Layout */}
      <GradientSection variant="muted" size="lg">
        <SectionHeader
          badge="From the Blog"
          title="Latest Articles"
          action={
            <GlassButton variant="secondary" size="sm" as="link" href="/blog">
              All Posts <ArrowRight className="w-4 h-4 ml-2" />
            </GlassButton>
          }
        />
        {latestPosts.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
            {/* 大卡 — 最新文章（左 3 列） */}
            <Link
              href={`/blog/${latestPosts[0].slug}`}
              className="lg:col-span-3 group relative flex flex-col justify-end min-h-[320px] rounded-2xl border border-white/[0.07] bg-gradient-to-b from-[#0A0A18] to-[#07070F] overflow-hidden hover:border-[#00BBFF]/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(0,187,255,0.08)]"
            >
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#00BBFF] via-[#7C3AED] to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#04040C] via-[#04040C]/50 to-transparent" />
              <div className="relative p-7">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-3 block capitalize">
                  {latestPosts[0].category?.replace(/-/g, ' ')}
                </span>
                <h3 className="text-xl font-bold text-white mb-2 leading-tight group-hover:text-[#00BBFF] transition-colors line-clamp-2">
                  {latestPosts[0].title}
                </h3>
                <p className="text-sm text-zinc-400 line-clamp-2 leading-relaxed mb-4">
                  {latestPosts[0].excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-zinc-600 font-mono">{latestPosts[0].date}</span>
                  <span className="flex items-center gap-1 text-xs font-mono text-[#00BBFF] group-hover:gap-2 transition-all">
                    Read <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </Link>

            {/* 右列 2 张小卡 */}
            <div className="lg:col-span-2 flex flex-col gap-5">
              {latestPosts.slice(1, 3).map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex-1 relative flex flex-col justify-between rounded-2xl border border-white/[0.06] bg-[#08081A]/60 p-5 overflow-hidden hover:border-white/[0.14] transition-all duration-200 hover:-translate-y-0.5"
                >
                  <div className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full bg-gradient-to-b from-[#7C3AED]/60 to-[#00BBFF]/60" />
                  <div>
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-2 block capitalize">
                      {post.category?.replace(/-/g, ' ')}
                    </span>
                    <h4 className="text-sm font-semibold text-white leading-snug group-hover:text-[#00BBFF] transition-colors line-clamp-3">
                      {post.title}
                    </h4>
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/[0.05]">
                    <span className="text-xs text-zinc-600 font-mono">{post.date}</span>
                    <ArrowRight className="w-3 h-3 text-zinc-600 group-hover:text-[#00BBFF] transition-colors" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-zinc-500 font-mono text-sm">No posts found.</p>
        )}
      </GradientSection>


      {/* Newsletter */}
      <GradientSection variant="gradient" size="lg">
        {/* Glow Effects */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-64 h-64 bg-[#00D9FF]/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-64 h-64 bg-[#7B61FF]/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="relative max-w-xl mx-auto text-center">
          {/* Terminal Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-xs font-mono bg-[#111118]/80 border border-[#1c1c2e] rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00FF87] animate-blink" />
            <span className="text-zinc-400">Newsletter</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
            Stay Ahead of the Curve
          </h2>
          <p className="text-zinc-400 mb-8 text-sm leading-relaxed max-w-lg mx-auto">
            Get weekly updates on the latest AI tools, workflows, and tutorials.
            No spam — unsubscribe anytime.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" action="/api/subscribe" method="POST">
            <div className="flex-1 relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 font-mono text-sm">→</span>
              <input
                type="email"
                name="email"
                placeholder="your@email.com"
                required
                className="w-full h-12 pl-10 pr-4 bg-[#111118] border border-[#1c1c2e] rounded-xl text-sm font-mono text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#00D9FF]/50 focus:glow-cyan transition-all"
              />
            </div>
            <GlassButton size="lg" variant="cyan" type="submit" className="shrink-0 glow-cyan">
              Subscribe
            </GlassButton>
          </form>
          
          <p className="mt-4 text-xs text-zinc-600 font-mono">
            <span className="text-[#00FF87]">✓</span> No spam, unsubscribe anytime.
          </p>
        </div>
      </GradientSection>
    </main>
  )
}
