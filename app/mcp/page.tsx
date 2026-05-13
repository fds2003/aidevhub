import Link from 'next/link'
import type { Metadata } from 'next'
import { Boxes, BookOpen, ExternalLink, Sparkles } from 'lucide-react'
import { GlassCard } from '@/components/ui/glass-card'
import { Button } from '@/components/ui/button'
import { McpHostMatrix } from '@/components/mcp-host-matrix'
import { McpDirectoryClient } from '@/components/mcp-directory-client'
import { getAllMCPServers, getMcpDirectoryStats } from '@/lib/mcp-directory'

export const metadata: Metadata = {
  title: 'MCP 服务器目录与兼容矩阵',
  description:
    '收录官方参考、社区与商业 MCP 服务器：安装命令、典型场景，以及 Claude / Cursor / Windsurf 客户端能力对照。附 MCP Registry 与站内工具/工作流连结。',
  openGraph: {
    title: 'MCP 服务器目录与兼容矩阵 | AI Dev Hub',
    description:
      'Model Context Protocol 精选目录：七十余条服务器条目、安装命令、场景与宿主兼容说明。',
  },
}

const tutorials = [
  {
    title: '用 MCP 做服务器开发工作流',
    description: '从环境到迭代的步骤式工作流，适合第一次搭自有 MCP。',
    href: '/workflows/building-with-mcp-server-development-workflow',
  },
  {
    title: 'Model Context Protocol 是什么',
    description: '协议定位、能力与站内工具条目。',
    href: '/tools/model-context-protocol',
  },
  {
    title: 'FastMCP 快速搭服务',
    description: 'TypeScript 侧常见脚手架与工具链。',
    href: '/tools/fastmcp',
  },
  {
    title: 'Playwright MCP',
    description: '浏览器自动化类 MCP 工具说明。',
    href: '/tools/mcp-playwright',
  },
]

export default function MCPPage() {
  const servers = getAllMCPServers()
  const stats = getMcpDirectoryStats()

  return (
    <div className="min-h-screen bg-[#080810]">
      <div className="container max-w-6xl py-12 md:py-16">
        <header className="mb-12">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-xl border border-[#1c1c2e] bg-[#111118] p-3">
              <Boxes className="h-9 w-9 text-[#00D9FF]" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-zinc-100 md:text-4xl">
                MCP 服务器目录
              </h1>
              <p className="mt-1 text-sm text-zinc-500">
                Model Context Protocol · 工具与数据源的标准化接入
              </p>
            </div>
          </div>
          <p className="max-w-3xl text-lg leading-relaxed text-zinc-400">
            面向选型与落地：按<strong className="text-zinc-200">官方参考 / 社区 / 商业</strong>
            分类浏览 <strong className="text-zinc-200">{stats.total}</strong>{' '}
            条服务器，每条含安装命令与典型场景；下方矩阵概括{' '}
            <strong className="text-zinc-200">Claude Desktop、Claude Code、Cursor、Windsurf</strong>{' '}
            对 stdio、远程与 OAuth 类工具的常见支持方式（截至 2026-05，以各厂商文档为准）。
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <span className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-emerald-300">
              官方参考 {stats.official}
            </span>
            <span className="rounded-lg border border-sky-500/20 bg-sky-500/10 px-3 py-1 text-sky-300">
              社区 {stats.community}
            </span>
            <span className="rounded-lg border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-amber-200">
              商业 {stats.commercial}
            </span>
          </div>
        </header>

        <section className="mb-14" aria-labelledby="mcp-intro">
          <h2 id="mcp-intro" className="mb-4 text-xl font-semibold text-zinc-100">
            为什么值得做深 MCP 内容
          </h2>
          <GlassCard variant="glass" padding="lg" className="text-zinc-400 leading-relaxed">
            <p className="mb-3">
              MCP 把「模型能调什么工具」从各 IDE 私协议里抽成开放协议：同一服务器可接到 Claude、Cursor、Windsurf
              等不同客户端。开发者更关心的是：<strong className="text-zinc-200">装什么、怎么装、用在哪类任务</strong>
              ，以及客户端是否支持 stdio / 远程 / OAuth。
            </p>
            <p className="flex flex-wrap items-center gap-2">
              <Sparkles className="h-4 w-4 text-purple-400" />
              <span>
                官方注册与发现：
                <a
                  href="https://registry.modelcontextprotocol.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-1 text-purple-400 hover:text-purple-300"
                >
                  MCP Registry
                  <ExternalLink className="ml-0.5 inline h-3 w-3" />
                </a>
              </span>
            </p>
          </GlassCard>
        </section>

        <section className="mb-14" aria-labelledby="mcp-matrix">
          <h2 id="mcp-matrix" className="mb-4 text-xl font-semibold text-zinc-100">
            宿主客户端能力矩阵
          </h2>
          <McpHostMatrix />
        </section>

        <section className="mb-14" aria-labelledby="mcp-directory">
          <h2 id="mcp-directory" className="mb-4 text-xl font-semibold text-zinc-100">
            服务器列表
          </h2>
          <McpDirectoryClient servers={servers} />
        </section>

        <section className="mb-14" aria-labelledby="mcp-learn">
          <div className="mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-zinc-400" />
            <h2 id="mcp-learn" className="text-xl font-semibold text-zinc-100">
              教程与站内资源
            </h2>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {tutorials.map((t) => (
              <li key={t.href}>
                <GlassCard variant="default" hover className="h-full p-5">
                  <h3 className="mb-2 font-medium text-zinc-100">{t.title}</h3>
                  <p className="mb-4 text-sm text-zinc-500">{t.description}</p>
                  <Button asChild variant="outline" size="sm" className="border-[#1c1c2e]">
                    <Link href={t.href}>打开</Link>
                  </Button>
                </GlassCard>
              </li>
            ))}
          </ul>
        </section>

        <footer className="border-t border-[#1c1c2e] pt-10 text-center">
          <p className="mb-4 text-zinc-500 text-sm">
            安装命令与包名以各仓库 README 为准；归档类参考实现请注意安全模型与维护状态。
          </p>
          <Button asChild className="bg-purple-600 hover:bg-purple-500">
            <Link href="/tools">浏览全部 MCP 类工具</Link>
          </Button>
        </footer>
      </div>
    </div>
  )
}
