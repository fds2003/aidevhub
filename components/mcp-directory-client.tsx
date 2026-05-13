'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ExternalLink, Search } from 'lucide-react'
import type { MCPServerCategory, MCPServerEntry } from '@/types/mcp-directory'
import { GlassCard } from '@/components/ui/glass-card'
import { Badge } from '@/components/ui/glass-badge'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

type FilterKey = 'all' | MCPServerCategory

const CATEGORY_LABEL: Record<MCPServerCategory, string> = {
  official: 'Official reference',
  community: 'Community',
  commercial: 'Commercial',
}

function hostBadgeClass(level: MCPServerEntry['hosts'][keyof MCPServerEntry['hosts']]) {
  switch (level) {
    case 'native':
      return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
    case 'stdio':
      return 'bg-sky-500/15 text-sky-300 border-sky-500/30'
    case 'limited':
      return 'bg-amber-500/15 text-amber-300 border-amber-500/30'
    default:
      return 'bg-zinc-500/15 text-zinc-400 border-zinc-500/25'
  }
}

function hostShort(level: MCPServerEntry['hosts'][keyof MCPServerEntry['hosts']]) {
  switch (level) {
    case 'native':
      return 'Native'
    case 'stdio':
      return 'stdio'
    case 'limited':
      return 'Limited'
    default:
      return 'TBD'
  }
}

interface McpDirectoryClientProps {
  servers: MCPServerEntry[]
}

export function McpDirectoryClient({ servers }: McpDirectoryClientProps) {
  const [filter, setFilter] = useState<FilterKey>('all')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return servers.filter((s) => {
      if (filter !== 'all' && s.category !== filter) return false
      if (!q) return true
      const hay = [
        s.name,
        s.summary,
        s.slug,
        s.installCommand,
        ...(s.tags ?? []),
        ...(s.useCases ?? []),
        s.packageName ?? '',
      ]
        .join('\n')
        .toLowerCase()
      return hay.includes(q)
    })
  }, [servers, filter, query])

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          {(['all', 'official', 'community', 'commercial'] as const).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setFilter(key)}
              className={cn(
                'rounded-lg border px-3 py-1.5 text-sm transition-colors',
                filter === key
                  ? 'border-purple-500/50 bg-purple-500/10 text-purple-200'
                  : 'border-[#1c1c2e] bg-[#111118] text-zinc-400 hover:border-zinc-600 hover:text-zinc-200'
              )}
            >
              {key === 'all' ? 'All' : CATEGORY_LABEL[key]}
            </button>
          ))}
        </div>
        <div className="relative w-full md:max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name, use case, package, command…"
            className="border-[#1c1c2e] bg-[#0a0a10] pl-9 text-zinc-200 placeholder:text-zinc-600"
            aria-label="Search MCP servers"
          />
        </div>
      </div>

      <p className="text-sm text-zinc-500">
        Showing <span className="text-zinc-300">{filtered.length}</span> / {servers.length}
      </p>

      <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((s) => (
          <li key={s.slug}>
            <GlassCard variant="default" hover className="h-full flex flex-col p-5">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <Link
                  href={`/mcp/${s.slug}`}
                  className="text-lg font-semibold text-zinc-100 hover:text-purple-300 transition-colors"
                >
                  {s.name}
                </Link>
                <Badge className="border border-[#1c1c2e] bg-zinc-900/80 text-zinc-400">
                  {CATEGORY_LABEL[s.category]}
                </Badge>
              </div>
              <p className="mb-3 flex-1 text-sm text-zinc-400 leading-relaxed">{s.summary}</p>
              <div className="mb-3 flex flex-wrap gap-1">
                {(['claudeCode', 'claudeDesktop', 'cursor', 'windsurf'] as const).map((h) => (
                  <span
                    key={h}
                    title={`${h}: ${s.hosts[h]}`}
                    className={cn(
                      'rounded border px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide',
                      hostBadgeClass(s.hosts[h])
                    )}
                  >
                    {h === 'claudeCode' ? 'C.Code' : h === 'claudeDesktop' ? 'C.Desk' : h === 'cursor' ? 'Cursor' : 'Wind'}{' '}
                    {hostShort(s.hosts[h])}
                  </span>
                ))}
              </div>
              <p className="mb-2 text-xs font-medium text-zinc-500">Install</p>
              <pre className="mb-3 max-h-20 overflow-auto rounded-lg border border-[#1c1c2e] bg-black/40 p-2 text-[11px] leading-snug text-zinc-300 whitespace-pre-wrap break-all">
                {s.installCommand}
              </pre>
              <div className="mb-3">
                <p className="mb-1 text-xs font-medium text-zinc-500">Use cases</p>
                <ul className="list-inside list-disc text-xs text-zinc-500 space-y-0.5">
                  {s.useCases.slice(0, 3).map((u) => (
                    <li key={u}>{u}</li>
                  ))}
                </ul>
              </div>
              <div className="mt-auto flex flex-wrap gap-2 border-t border-[#1c1c2e] pt-3">
                <Link
                  href={`/mcp/${s.slug}`}
                  className="text-sm text-purple-400 hover:text-purple-300"
                >
                  Details
                </Link>
                <a
                  href={s.repository}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-300"
                >
                  Repository
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </GlassCard>
          </li>
        ))}
      </ul>

      {filtered.length === 0 ? (
        <p className="py-12 text-center text-zinc-500">No matches. Try another filter or search keyword.</p>
      ) : null}
    </div>
  )
}
