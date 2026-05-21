import Link from 'next/link'
import { Calendar, ArrowRight, Tag } from 'lucide-react'
import { Badge } from '@/components/ui/glass-badge'
import { getAllPosts } from '@/lib/content'
import { format } from 'date-fns'

export const metadata = {
  title: 'Blog — AI Dev Hub',
  description: 'Tutorials, guides, and insights on AI coding tools, MCP, and developer productivity.',
}

// NOTE: 博客列表采用 Editorial Layout
// - 第一篇文章使用大卡（占左列全高），突出最新内容
// - 右列使用 2 张紧凑小卡
// - 余下文章以标准三列网格展示
export default function BlogPage() {
  const posts = getAllPosts()
  const categories = Array.from(new Set(posts.map((p) => p.category)))

  // 分离：前 3 篇 editorial，其余普通网格
  const editorialPosts = posts.slice(0, 3)
  const remainingPosts = posts.slice(3)

  return (
    <main className="min-h-screen bg-[#040408]">

      {/* ── Hero ── */}
      <section className="relative pt-16 pb-12 overflow-hidden">
        {/* 背景光晕 */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[#00BBFF]/8 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-[#7C3AED]/6 rounded-full blur-[100px] pointer-events-none" />

        <div className="container relative text-center max-w-3xl mx-auto px-4">
          {/* 标签徽章 */}
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-xs font-mono text-[#00BBFF] bg-[#00BBFF]/8 rounded-full border border-[#00BBFF]/20">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00BBFF] animate-pulse" />
            {posts.length} Articles Published
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight leading-tight">
            AI Dev Hub <span className="text-[#00BBFF]">Blog</span>
          </h1>
          <p className="text-base md:text-lg text-zinc-400 leading-relaxed">
            Deep dives into AI coding tools, MCP ecosystem, agent workflows,
            and everything that moves fast in developer productivity.
          </p>
        </div>
      </section>

      {/* ── Category Filter Pills ── */}
      <section className="border-b border-white/[0.06] bg-[#04040A]">
        <div className="container px-4 py-4">
          <div className="flex flex-wrap gap-2 justify-center">
            <button className="px-3 py-1 text-xs font-mono font-medium rounded-full bg-[#00BBFF]/10 text-[#00BBFF] border border-[#00BBFF]/30 transition-all">
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                className="px-3 py-1 text-xs font-mono font-medium rounded-full text-zinc-500 border border-white/[0.06] hover:text-white hover:border-white/20 transition-all"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Editorial Layout (前 3 篇) ── */}
      {editorialPosts.length > 0 && (
        <section className="container px-4 py-12 md:py-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Latest</h2>
            <div className="h-px flex-1 bg-white/[0.05] mx-4" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
            {/* 大卡 — 最新文章（左 3 列） */}
            {editorialPosts[0] && (
              <Link
                href={`/blog/${editorialPosts[0].slug}`}
                className="lg:col-span-3 group relative flex flex-col justify-end min-h-[380px] md:min-h-[440px] rounded-2xl border border-white/[0.07] bg-gradient-to-b from-[#0A0A18] to-[#07070F] overflow-hidden hover:border-[#00BBFF]/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(0,187,255,0.08)]"
              >
                {/* 顶部色条 */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#00BBFF] via-[#7C3AED] to-transparent" />
                {/* 底部渐变遮罩 */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#04040C] via-[#04040C]/60 to-transparent" />

                {/* 内容 */}
                <div className="relative p-7 md:p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-widest text-[#00BBFF] bg-[#00BBFF]/10 rounded border border-[#00BBFF]/20">
                      Latest
                    </span>
                    <span className="text-xs text-zinc-500 font-mono capitalize">{editorialPosts[0].category?.replace(/-/g, ' ')}</span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-white mb-3 leading-tight group-hover:text-[#00BBFF] transition-colors line-clamp-3">
                    {editorialPosts[0].title}
                  </h2>
                  <p className="text-sm text-zinc-400 leading-relaxed line-clamp-3 mb-5">
                    {editorialPosts[0].description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-zinc-600 text-xs font-mono">
                      <Calendar className="w-3 h-3" />
                      <time>
                        {format(new Date(editorialPosts[0].publishedAt || editorialPosts[0].createdAt), 'MMM d, yyyy')}
                      </time>
                    </div>
                    <span className="flex items-center gap-1 text-xs font-mono text-[#00BBFF] group-hover:gap-2 transition-all">
                      Read article <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>
            )}

            {/* 小卡列 — 右 2 列 */}
            <div className="lg:col-span-2 flex flex-col gap-5">
              {editorialPosts.slice(1, 3).map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex-1 relative flex flex-col justify-between min-h-[180px] rounded-2xl border border-white/[0.07] bg-[#08081A]/60 p-6 overflow-hidden hover:border-white/[0.14] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
                >
                  {/* 左侧色条 */}
                  <div className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full bg-gradient-to-b from-[#7C3AED]/60 to-[#00BBFF]/60" />
                  <div>
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-3 block capitalize">
                      {post.category?.replace(/-/g, ' ')}
                    </span>
                    <h3 className="text-sm font-semibold text-white leading-snug group-hover:text-[#00BBFF] transition-colors line-clamp-3 mb-2">
                      {post.title}
                    </h3>
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/[0.05]">
                    <div className="flex items-center gap-1 text-zinc-600 text-xs font-mono">
                      <Calendar className="w-3 h-3" />
                      <time>{format(new Date(post.publishedAt || post.createdAt), 'MMM d, yyyy')}</time>
                    </div>
                    <ArrowRight className="w-3 h-3 text-zinc-600 group-hover:text-[#00BBFF] transition-colors" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 分隔线 ── */}
      {remainingPosts.length > 0 && (
        <div className="container px-4">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-xs font-mono text-zinc-500 uppercase tracking-widest whitespace-nowrap">More Articles</h2>
            <div className="h-px flex-1 bg-white/[0.05]" />
          </div>
        </div>
      )}

      {/* ── 普通三列网格（余下文章）── */}
      {remainingPosts.length > 0 && (
        <section className="container px-4 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {remainingPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col rounded-2xl border border-white/[0.06] bg-[#07070F] p-6 hover:border-white/[0.12] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
              >
                {/* 类别 */}
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-3 block capitalize">
                  {post.category?.replace(/-/g, ' ')}
                </span>

                {/* 标题 */}
                <h3 className="text-sm font-semibold text-white leading-snug group-hover:text-[#00BBFF] transition-colors line-clamp-2 mb-2 flex-1">
                  {post.title}
                </h3>

                {/* 摘要 */}
                <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed mb-4">
                  {post.description}
                </p>

                {/* 标签 */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {post.tags?.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono text-zinc-600 border border-white/[0.06] rounded-full"
                    >
                      <Tag className="w-2.5 h-2.5" />
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-white/[0.05]">
                  <div className="flex items-center gap-1 text-zinc-600 text-xs font-mono">
                    <Calendar className="w-3 h-3" />
                    <time>{format(new Date(post.publishedAt || post.createdAt), 'MMM d, yyyy')}</time>
                  </div>
                  <ArrowRight className="w-3 h-3 text-zinc-700 group-hover:text-[#00BBFF] transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── 空状态 ── */}
      {posts.length === 0 && (
        <div className="container px-4 py-24 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#0A0A18] border border-white/[0.07] mb-4">
            <span className="text-2xl">📝</span>
          </div>
          <p className="text-zinc-500 font-mono text-sm">No posts found. Check back soon!</p>
        </div>
      )}
    </main>
  )
}
