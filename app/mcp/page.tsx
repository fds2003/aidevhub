import Link from 'next/link'
import type { Metadata } from 'next'
import { Boxes, BookOpen, ExternalLink, Sparkles } from 'lucide-react'
import { GlassCard } from '@/components/ui/glass-card'
import { Button } from '@/components/ui/button'
import { McpHostMatrix } from '@/components/mcp-host-matrix'
import { McpDirectoryClient } from '@/components/mcp-directory-client'
import { getAllMCPServers, getMcpDirectoryStats } from '@/lib/mcp-directory'

export const metadata: Metadata = {
  title: 'MCP server directory & compatibility matrix',
  description:
    'Curated official, community, and commercial MCP servers with install commands, typical use cases, and Claude / Cursor / Windsurf client notes. Links to the MCP Registry plus on-site tools and workflows.',
  alternates: { canonical: '/mcp' },
  openGraph: {
    title: 'MCP server directory & compatibility matrix',
    description:
      'Model Context Protocol directory: 70+ server entries, install commands, scenarios, and host compatibility notes.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MCP server directory & compatibility matrix',
    description:
      'Model Context Protocol directory: 70+ server entries, install commands, scenarios, and host compatibility notes.',
  },
}

const tutorials = [
  {
    title: 'Build an MCP server development workflow',
    description: 'Step-by-step from environment setup to iteration—ideal for your first custom MCP.',
    href: '/workflows/building-with-mcp-server-development-workflow',
  },
  {
    title: 'What is Model Context Protocol?',
    description: 'Protocol scope, capabilities, and how it maps to our tools catalog.',
    href: '/tools/model-context-protocol',
  },
  {
    title: 'FastMCP quick start',
    description: 'Common TypeScript scaffolds and toolchain patterns.',
    href: '/tools/fastmcp',
  },
  {
    title: 'Playwright MCP',
    description: 'Browser automation MCP tooling overview.',
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
                MCP server directory
              </h1>
              <p className="mt-1 text-sm text-zinc-500">
                Model Context Protocol · standardized access to tools and data sources
              </p>
            </div>
          </div>
          <p className="max-w-3xl text-lg leading-relaxed text-zinc-400">
            Built for evaluation and rollout: browse{' '}
            <strong className="text-zinc-200">official reference / community / commercial</strong> servers—
            <strong className="text-zinc-200">{stats.total}</strong> entries, each with install commands and typical
            scenarios. The matrix below summarizes how{' '}
            <strong className="text-zinc-200">Claude Desktop, Claude Code, Cursor, and Windsurf</strong> usually handle
            stdio, remote, and OAuth-style tools (as of 2026-05; defer to vendor docs).
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <span className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-emerald-300">
              Official reference {stats.official}
            </span>
            <span className="rounded-lg border border-sky-500/20 bg-sky-500/10 px-3 py-1 text-sky-300">
              Community {stats.community}
            </span>
            <span className="rounded-lg border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-amber-200">
              Commercial {stats.commercial}
            </span>
          </div>
        </header>

        <section className="mb-14" aria-labelledby="mcp-intro">
          <h2 id="mcp-intro" className="mb-4 text-xl font-semibold text-zinc-100">
            Why MCP deserves deep coverage
          </h2>
          <GlassCard variant="glass" padding="lg" className="text-zinc-400 leading-relaxed">
            <p className="mb-3">
              MCP turns “what tools can the model call?” from IDE-specific wiring into an open protocol: the same server
              can plug into Claude, Cursor, Windsurf, and more. Teams care about{' '}
              <strong className="text-zinc-200">what to install, how to install it, and which tasks it fits</strong>,
              plus whether a client supports stdio, remote transports, or OAuth-style flows.
            </p>
            <p className="flex flex-wrap items-center gap-2">
              <Sparkles className="h-4 w-4 text-purple-400" />
              <span>
                Official registry & discovery:
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
            Host client capability matrix
          </h2>
          <McpHostMatrix />
        </section>

        <section className="mb-14" aria-labelledby="mcp-directory">
          <h2 id="mcp-directory" className="mb-4 text-xl font-semibold text-zinc-100">
            Server list
          </h2>
          <McpDirectoryClient servers={servers} />
        </section>

        <section className="mb-14" aria-labelledby="mcp-learn">
          <div className="mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-zinc-400" />
            <h2 id="mcp-learn" className="text-xl font-semibold text-zinc-100">
              Tutorials & on-site resources
            </h2>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {tutorials.map((t) => (
              <li key={t.href}>
                <GlassCard variant="default" hover className="h-full p-5">
                  <h3 className="mb-2 font-medium text-zinc-100">{t.title}</h3>
                  <p className="mb-4 text-sm text-zinc-500">{t.description}</p>
                  <Button asChild variant="outline" size="sm" className="border-[#1c1c2e]">
                    <Link href={t.href}>Open</Link>
                  </Button>
                </GlassCard>
              </li>
            ))}
          </ul>
        </section>

        <footer className="border-t border-[#1c1c2e] pt-10 text-center">
          <p className="mb-4 text-zinc-500 text-sm">
            Install commands and package names follow each upstream README; archived reference servers may differ in
            security posture and maintenance status.
          </p>
          <Button asChild className="bg-purple-600 hover:bg-purple-500">
            <Link href="/tools">Browse all MCP-related tools</Link>
          </Button>
        </footer>
      </div>
    </div>
  )
}
