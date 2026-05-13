import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { GlassCard } from '@/components/ui/glass-card'
import { Badge } from '@/components/ui/glass-badge'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { CopyToClipboard } from '@/components/ui/copy-to-clipboard'
import {
  getAllMCPServers,
  getMCPServerBySlug,
  getMCPServerSlugs,
} from '@/lib/mcp-directory'
import type { MCPServerEntry } from '@/types/mcp-directory'
import { SITE_URL } from '@/lib/constants'
import { cn } from '@/lib/utils'

interface PageProps {
  params: Promise<{ slug: string }>
}

const CATEGORY_LABEL = {
  official: '官方参考',
  community: '社区',
  commercial: '商业',
} as const

const HOST_ROWS: { key: keyof MCPServerEntry['hosts']; label: string }[] = [
  { key: 'claudeCode', label: 'Claude Code' },
  { key: 'claudeDesktop', label: 'Claude Desktop' },
  { key: 'cursor', label: 'Cursor' },
  { key: 'windsurf', label: 'Windsurf' },
]

function levelLabel(level: MCPServerEntry['hosts'][keyof MCPServerEntry['hosts']]) {
  switch (level) {
    case 'native':
      return '原生 / 一等文档'
    case 'stdio':
      return 'stdio 配置可用'
    case 'limited':
      return '部分支持或文档较少'
    default:
      return '待自行核对'
  }
}

function levelTone(level: MCPServerEntry['hosts'][keyof MCPServerEntry['hosts']]) {
  switch (level) {
    case 'native':
      return 'text-emerald-300'
    case 'stdio':
      return 'text-sky-300'
    case 'limited':
      return 'text-amber-300'
    default:
      return 'text-zinc-500'
  }
}

export async function generateStaticParams() {
  return getMCPServerSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const server = getMCPServerBySlug(slug)
  if (!server) {
    return { title: '未找到' }
  }
  const title = `${server.name} MCP`
  const desc = `${server.summary} 安装：${server.installCommand.slice(0, 120)}${server.installCommand.length > 120 ? '…' : ''}`
  const canonical = `${SITE_URL}/mcp/${slug}`
  return {
    title,
    description: desc,
    alternates: { canonical },
    openGraph: {
      title: `${title} | AI Dev Hub`,
      description: server.summary,
      url: canonical,
    },
  }
}

export default async function MCPServerDetailPage({ params }: PageProps) {
  const { slug } = await params
  const server = getMCPServerBySlug(slug)
  if (!server) notFound()

  const related = getAllMCPServers()
    .filter((s) => s.slug !== server.slug && s.category === server.category)
    .slice(0, 4)

  return (
    <div className="min-h-screen bg-[#080810]">
      <div className="container max-w-3xl py-10 md:py-14">
        <Breadcrumbs
          items={[
            { label: 'MCP 目录', href: '/mcp' },
            { label: server.name },
          ]}
        />

        <Link
          href="/mcp"
          className="mb-6 inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-purple-400"
        >
          <ArrowLeft className="h-4 w-4" />
          返回目录
        </Link>

        <header className="mb-8">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <h1 className="text-3xl font-bold text-zinc-100">{server.name}</h1>
            <Badge variant="outline">{CATEGORY_LABEL[server.category]}</Badge>
            {server.packageName ? (
              <Badge variant="cyan" size="sm">
                {server.packageName}
              </Badge>
            ) : null}
          </div>
          <p className="text-lg text-zinc-400 leading-relaxed">{server.summary}</p>
        </header>

        <GlassCard variant="default" padding="lg" className="mb-6">
          <div className="mb-2 flex items-center justify-between gap-2">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
              安装命令
            </h2>
            <CopyToClipboard text={server.installCommand} />
          </div>
          <pre className="overflow-x-auto rounded-lg border border-[#1c1c2e] bg-black/50 p-4 text-sm leading-relaxed text-zinc-200 whitespace-pre-wrap break-all">
            {server.installCommand}
          </pre>
          <a
            href={server.repository}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1.5 text-sm text-purple-400 hover:text-purple-300"
          >
            查看源码 / 文档
            <ExternalLink className="h-4 w-4" />
          </a>
        </GlassCard>

        <GlassCard variant="default" padding="lg" className="mb-6">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-500">
            典型使用场景
          </h2>
          <ul className="list-inside list-disc space-y-2 text-zinc-300">
            {server.useCases.map((u) => (
              <li key={u}>{u}</li>
            ))}
          </ul>
        </GlassCard>

        <GlassCard variant="default" padding="lg" className="mb-6">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-500">
            与常见客户端的对接方式（经验标注）
          </h2>
          <p className="mb-4 text-xs text-zinc-500">
            以下为站内用于选型的粗粒度标签，非厂商认证；接入前请对照各客户端最新 MCP 文档。
          </p>
          <ul className="divide-y divide-[#1c1c2e] border border-[#1c1c2e] rounded-lg overflow-hidden">
            {HOST_ROWS.map(({ key, label }) => (
              <li key={key} className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-center sm:justify-between bg-[#0c0c14]">
                <span className="text-sm text-zinc-400">{label}</span>
                <span className={cn('text-sm font-medium', levelTone(server.hosts[key]))}>
                  {levelLabel(server.hosts[key])}
                </span>
              </li>
            ))}
          </ul>
        </GlassCard>

        {server.tags?.length ? (
          <div className="mb-8 flex flex-wrap gap-2">
            {server.tags.map((tag) => (
              <Badge key={tag} variant="purple" size="sm">
                {tag}
              </Badge>
            ))}
          </div>
        ) : null}

        {related.length > 0 ? (
          <section aria-labelledby="related-mcp">
            <h2 id="related-mcp" className="mb-3 text-lg font-semibold text-zinc-100">
              同类目条目
            </h2>
            <ul className="space-y-2">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/mcp/${r.slug}`}
                    className="block rounded-lg border border-[#1c1c2e] bg-[#111118] px-4 py-3 text-sm text-zinc-300 hover:border-purple-500/30 hover:text-purple-300 transition-colors"
                  >
                    {r.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </div>
  )
}
