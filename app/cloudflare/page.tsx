import Link from 'next/link';
import { getAllTools } from '@/lib/content';
import { ToolCard } from '@/components/ui/tool-card';
import { Badge } from '@/components/ui/glass-badge';
import { GlassCard } from '@/components/ui/glass-card';
import { SEOHead } from '@/components/seo-head';

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
      <SEOHead
        title="Cloudflare 专题 - 一站式边缘计算平台"
        description="学习使用 Cloudflare 全家桶：Workers、R2、D1、KV、Pages、Queues 和 Workers AI。零 egress 费用，零冷启动，无限免费额度。"
        keywords="cloudflare, cloudflare workers, cloudflare pages, cloudflare r2, cloudflare d1, zero egress, serverless, edge computing"
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-yellow-500/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/20 rounded-full blur-[120px]" />
        
        <div className="relative max-w-4xl mx-auto text-center">
          <Badge variant="glow" className="mb-4">
            ☁️ Stop Paying Seventeen Different Bills
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-orange-400 via-yellow-400 to-amber-400 bg-clip-text text-transparent">
              Just Fucking Use Cloudflare
            </span>
          </h1>
          
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            一个平台，搞定所有。云函数、存储、数据库、缓存、消息队列、AI...
            <span className="text-orange-400 font-semibold"> 零 egress 费用</span>。
          </p>

          {/* Comparison Table */}
          <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto mb-12">
            <GlassCard className="p-6 border-red-500/20">
              <h3 className="text-lg font-semibold text-red-400 mb-3">❌ 你现在的账单</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Vercel: $20/月</li>
                <li>AWS S3: 存储 + egress</li>
                <li>PlanetScale: $29/月</li>
                <li>Redis: $50/月</li>
                <li className="text-red-400 font-semibold">总计: $100+/月</li>
              </ul>
            </GlassCard>
            
            <GlassCard className="p-6 border-green-500/20">
              <h3 className="text-lg font-semibold text-green-400 mb-3">✅ Cloudflare 全家桶</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Workers: 100k req/天免费</li>
                <li>R2: 10GB存储 + 零egress</li>
                <li>D1: 5M reads/天免费</li>
                <li>KV: 1M reads/天免费</li>
                <li className="text-green-400 font-semibold">总计: $0/月</li>
              </ul>
            </GlassCard>
          </div>

          <Link
            href="/blog/just-fucking-use-cloudflare"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-black font-semibold rounded-lg hover:opacity-90 transition-opacity"
          >
            阅读完整指南 →
          </Link>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Cloudflare 产品矩阵</h2>
          <p className="text-gray-400 text-center mb-12">每个产品都是业界顶级的替代方案</p>

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
                      了解更多 →
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
          <h2 className="text-3xl font-bold mb-4">现代化全栈架构</h2>
          <p className="text-gray-400 mb-8">一个公司，一个账单，一个 API</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: '前端', tool: 'Next.js → Pages', color: 'from-blue-500 to-cyan-500' },
              { name: '后端', tool: 'Cloudflare Workers', color: 'from-orange-500 to-yellow-500' },
              { name: '数据库', tool: 'Cloudflare D1', color: 'from-green-500 to-emerald-500' },
              { name: '存储', tool: 'Cloudflare R2', color: 'from-purple-500 to-pink-500' },
              { name: '缓存', tool: 'Cloudflare KV', color: 'from-red-500 to-orange-500' },
              { name: '消息队列', tool: 'Cloudflare Queues', color: 'from-indigo-500 to-blue-500' },
              { name: 'AI', tool: 'Workers AI', color: 'from-violet-500 to-purple-500' },
              { name: '域名', tool: 'Registrar', color: 'from-teal-500 to-green-500' },
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
          <h2 className="text-3xl font-bold text-center mb-4">工具详情</h2>
          <p className="text-gray-400 text-center mb-12">深入了解每个产品的特性和使用方法</p>

          <div className="grid md:grid-cols-2 gap-6">
            {cloudflareTools.map((tool) => (
              <ToolCard
                key={tool.slug}
                slug={tool.slug}
                name={tool.name}
                tagline={tool.description}
                pricing={tool.pricing}
                categories={[tool.category]}
                rating={5}
                users="100K+"
                trending={true}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <GlassCard className="p-12 border-orange-500/30">
            <h2 className="text-3xl font-bold mb-4">停止多平台账单焦虑</h2>
            <p className="text-gray-400 mb-8">
              用 Cloudflare 全家桶，一个平台搞定所有需求。<br />
              免费额度足够大多数项目使用。
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/blog/just-fucking-use-cloudflare"
                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-black font-semibold rounded-lg hover:opacity-90 transition-opacity"
              >
                开始阅读
              </Link>
              <Link
                href="https://dash.cloudflare.com/signup"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-orange-500 text-orange-400 font-semibold rounded-lg hover:bg-orange-500/10 transition-colors"
              >
                创建免费账号
              </Link>
            </div>
          </GlassCard>
        </div>
      </section>
    </>
  );
}
