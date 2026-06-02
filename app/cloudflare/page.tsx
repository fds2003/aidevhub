import Link from 'next/link';
import { getAllTools } from '@/lib/content';
import { ToolCard } from '@/components/ui/tool-card';
import { Badge } from '@/components/ui/glass-badge';
import { GlassCard } from '@/components/ui/glass-card';
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cloudflare hub — edge platform in one place',
  description: 'Learn the Cloudflare stack: Workers, R2, D1, KV, Pages, Queues, and Workers AI. Zero egress fees on R2, no cold starts on Workers, generous free tiers.',
  keywords: ['cloudflare', 'cloudflare workers', 'cloudflare pages', 'cloudflare r2', 'cloudflare d1', 'zero egress', 'serverless', 'edge computing'],
  alternates: { canonical: '/cloudflare' },
  openGraph: {
    title: 'Cloudflare hub — edge platform in one place',
    description: 'Learn the Cloudflare stack: Workers, R2, D1, KV, Pages, Queues, and Workers AI. Zero egress fees on R2, no cold starts on Workers, generous free tiers.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cloudflare hub — edge platform in one place',
    description: 'Learn the Cloudflare stack: Workers, R2, D1, KV, Pages, Queues, and Workers AI. Zero egress fees on R2, no cold starts on Workers, generous free tiers.',
  },
}

export default function CloudflarePage() {
  const allTools = getAllTools();
  const cloudflareTools = allTools.filter(
    (tool) => tool.category === 'Cloudflare'
  );

  const products = [
    {
      name: 'Workers',
      slug: 'cloudflare-workers',
      tagline: 'Serverless at the Edge',
      icon: '⚡',
      color: 'from-orange-500 to-yellow-500',
    },
    {
      name: 'Pages',
      slug: 'cloudflare-pages',
      tagline: 'Free Static Hosting',
      icon: '📄',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      name: 'R2',
      slug: 'cloudflare-r2',
      tagline: 'S3 Without Egress Fees',
      icon: '🪣',
      color: 'from-purple-500 to-pink-500',
    },
    {
      name: 'D1',
      slug: 'cloudflare-d1',
      tagline: 'SQLite at the Edge',
      icon: '🗄️',
      color: 'from-green-500 to-emerald-500',
    },
    {
      name: 'KV',
      slug: 'cloudflare-kv',
      tagline: 'Global Key-Value Store',
      icon: '🔑',
      color: 'from-red-500 to-orange-500',
    },
    {
      name: 'Queues',
      slug: 'cloudflare-queues',
      tagline: 'Durable Message Queue',
      icon: '📬',
      color: 'from-indigo-500 to-blue-500',
    },
    {
      name: 'Workers AI',
      slug: 'cloudflare-workers-ai',
      tagline: 'AI at the Edge',
      icon: '🤖',
      color: 'from-violet-500 to-purple-500',
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-yellow-500/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/20 rounded-full blur-[120px]" />
        
        <div className="relative max-w-4xl mx-auto text-center">
          <Badge variant="outline" className="mb-4 border-orange-500/50 text-orange-400">
            ☁️ Stop Paying Seventeen Different Bills
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-orange-400 via-yellow-400 to-amber-400 bg-clip-text text-transparent">
              Just Fucking Use Cloudflare
            </span>
          </h1>
          
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            One platform for everything. Serverless compute, storage, databases, caching, queues, AI...
            <span className="text-orange-400 font-semibold"> Zero egress fees</span>.
          </p>

          {/* Comparison Table */}
          <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto mb-12">
            <GlassCard className="p-6 border-red-500/20">
              <h3 className="text-lg font-semibold text-red-400 mb-3">❌ Your Current Bill</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Vercel: $20/mo</li>
                <li>AWS S3: Storage + egress</li>
                <li>PlanetScale: $29/mo</li>
                <li>Redis: $50/mo</li>
                <li className="text-red-400 font-semibold">Total: $100+/mo</li>
              </ul>
            </GlassCard>
            
            <GlassCard className="p-6 border-green-500/20">
              <h3 className="text-lg font-semibold text-green-400 mb-3">✅ Cloudflare Stack</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Workers: 100k req/day free</li>
                <li>R2: 10GB storage + zero egress</li>
                <li>D1: 5M reads/day free</li>
                <li>KV: 1M reads/day free</li>
                <li className="text-green-400 font-semibold">Total: $0/mo</li>
              </ul>
            </GlassCard>
          </div>

          <Link
            href="/blog/just-fucking-use-cloudflare"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-black font-semibold rounded-lg hover:opacity-90 transition-opacity"
          >
            Read the Full Guide →
          </Link>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Cloudflare Product Matrix</h2>
          <p className="text-gray-400 text-center mb-12">Every product is a best-in-class industry alternative</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Link key={product.slug} href={`/tools/${product.slug}`}>
                <GlassCard 
                  hover 
                  className="p-6 h-full group cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${product.color} flex items-center justify-center text-2xl shrink-0`}>
                      {product.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-1 group-hover:text-orange-400 transition-colors">
                        Cloudflare {product.name}
                      </h3>
                      <p className="text-sm text-gray-400">{product.tagline}</p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/5">
                    <span className="text-sm text-orange-400 group-hover:underline">
                      Learn more →
                    </span>
                  </div>
                </GlassCard>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* The Stack */}
      <section className="py-16 px-4 bg-gradient-to-b from-transparent via-orange-500/5 to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Modern Full-Stack Architecture</h2>
          <p className="text-gray-400 mb-8">One company, one bill, one API</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Frontend', tool: 'Next.js → Pages', color: 'from-blue-500 to-cyan-500' },
              { name: 'Backend', tool: 'Cloudflare Workers', color: 'from-orange-500 to-yellow-500' },
              { name: 'Database', tool: 'Cloudflare D1', color: 'from-green-500 to-emerald-500' },
              { name: 'Storage', tool: 'Cloudflare R2', color: 'from-purple-500 to-pink-500' },
              { name: 'Cache', tool: 'Cloudflare KV', color: 'from-red-500 to-orange-500' },
              { name: 'Queues', tool: 'Cloudflare Queues', color: 'from-indigo-500 to-blue-500' },
              { name: 'AI', tool: 'Workers AI', color: 'from-violet-500 to-purple-500' },
              { name: 'Domain', tool: 'Registrar', color: 'from-teal-500 to-green-500' },
            ].map((item) => (
              <div
                key={item.name}
                className="p-4 rounded-xl bg-white/5 border border-white/10"
              >
                <div className={`text-xs text-gray-400 mb-1`}>{item.name}</div>
                <div className={`font-semibold bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                  {item.tool}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Tools Overview</h2>
          <p className="text-gray-400 text-center mb-12">Detailed information about each product&apos;s features and usage</p>

          <div className="grid md:grid-cols-2 gap-6">
            {cloudflareTools.map((tool) => (
              <ToolCard
                key={tool.slug}
                tool={{
                  slug: tool.slug,
                  name: tool.name,
                  tagline: tool.description,
                  pricing: tool.pricing,
                  categories: [tool.category],
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <GlassCard className="p-12 border-orange-500/30">
            <h2 className="text-3xl font-bold mb-4">Stop Multi-Platform Bill Anxiety</h2>
            <p className="text-gray-400 mb-8">
              One platform handles everything. The free tier is enough for most projects.<br />
              No more juggling multiple bills.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/blog/just-fucking-use-cloudflare"
                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-black font-semibold rounded-lg hover:opacity-90 transition-opacity"
              >
                Read the Guide
              </Link>
              <Link
                href="https://dash.cloudflare.com/signup"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-orange-500 text-orange-400 font-semibold rounded-lg hover:bg-orange-500/10 transition-colors"
              >
                Create Free Account
              </Link>
            </div>
          </GlassCard>
        </div>
      </section>
    </>
  );
}
