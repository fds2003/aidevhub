import Link from 'next/link'
import { CalendarClock } from 'lucide-react'
import { GlassCard } from '@/components/ui/glass-card'
import { MDXRemote } from '@/components/mdx-remote'
import type { Post } from '@/types'
import {
  postHasCustom2026Note,
  postNeedsLegacy2026Banner,
  postShows2026UpdateSection,
} from '@/lib/blog-legacy-2026'

const DEFAULT_NOTE = `以下为 **2026 年** 编辑部提示，**不替代**下文历史正文：

- 框架、API 与包名请以当前官方文档为准；文中代码多为教学脉络，迁移时请对照发行说明。
- **Llama / RAG / Prompt** 等方向生态迭代快，可结合站内 **2026 年** 新文与工具目录交叉阅读。
- 若你发现事实性过期表述，欢迎通过页脚渠道反馈，我们会迭代「更新说明」或拆新题单篇。`

export function BlogPostUpdate2026({ post }: { post: Post }) {
  if (!postShows2026UpdateSection(post)) return null

  const custom = postHasCustom2026Note(post)
  const legacyOnly = postNeedsLegacy2026Banner(post) && !custom

  return (
    <div className="max-w-4xl mb-8">
      <GlassCard
        padding="lg"
        className="border-[#00D9FF]/25 bg-[#00D9FF]/5"
      >
        <div className="flex items-start gap-3 mb-3">
          <CalendarClock className="w-5 h-5 text-[#00D9FF] shrink-0 mt-0.5" />
          <div>
            <h2 className="text-lg font-semibold text-white tracking-tight">
              2026 年更新说明
            </h2>
            <p className="text-xs text-zinc-500 font-mono mt-1">
              {legacyOnly ? '原文发布时间较早 · 语境补充' : '编辑补充 · 与正文并列阅读'}
            </p>
          </div>
        </div>

        <div className="prose prose-invert prose-sm max-w-none border-t border-[#1c1c2e] pt-4">
          {custom && post.updateNote2026 ? (
            <MDXRemote source={post.updateNote2026} />
          ) : (
            <MDXRemote source={DEFAULT_NOTE} />
          )}
        </div>

        <p className="text-xs text-zinc-600 mt-4 font-mono">
          当月新文示例：{' '}
          <Link href="/blog/llm-observability-baseline-2026-05" className="text-[#00D9FF] hover:underline">
            可观测性
          </Link>
          {' · '}
          <Link href="/blog/graph-rag-when-why-2026-05" className="text-[#00D9FF] hover:underline">
            Graph RAG
          </Link>
          {' · '}
          <Link href="/blog/prompt-caching-tool-design-2026-05" className="text-[#00D9FF] hover:underline">
            Prompt / 工具
          </Link>
          {' · '}
          <Link href="/blog/small-model-deployment-tradeoffs-2026-05" className="text-[#00D9FF] hover:underline">
            小模型部署
          </Link>
        </p>
      </GlassCard>
    </div>
  )
}
