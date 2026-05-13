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

const DEFAULT_NOTE = `Editorial note for **2026**. This **does not replace** the historical article below.

- Prefer current official docs for frameworks, APIs, and package names; sample code here is mostly pedagogical—check release notes when migrating.
- **Llama / RAG / Prompt** ecosystems move fast; pair this post with **2026** articles and the tools directory on this site.
- If you spot factual drift, reach out via the footer—we will refresh this note or spin up a follow-up post.`

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
              2026 update note
            </h2>
            <p className="text-xs text-zinc-500 font-mono mt-1">
              {legacyOnly ? 'Older publish date · context add-on' : 'Editorial add-on · read alongside the article'}
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
          Recent picks:{' '}
          <Link href="/blog/llm-observability-baseline-2026-05" className="text-[#00D9FF] hover:underline">
            Observability
          </Link>
          {' · '}
          <Link href="/blog/graph-rag-when-why-2026-05" className="text-[#00D9FF] hover:underline">
            Graph RAG
          </Link>
          {' · '}
          <Link href="/blog/prompt-caching-tool-design-2026-05" className="text-[#00D9FF] hover:underline">
            Prompting & tools
          </Link>
          {' · '}
          <Link href="/blog/small-model-deployment-tradeoffs-2026-05" className="text-[#00D9FF] hover:underline">
            Small-model deployment
          </Link>
        </p>
      </GlassCard>
    </div>
  )
}
