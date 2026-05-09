'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Search, ExternalLink, Grid, List } from 'lucide-react'
import { GlassCard } from '@/components/ui/glass-card'
import { Badge, ToolBadge } from '@/components/ui/glass-badge'
import { Button } from '@/components/ui/button'
import type { Tool } from '@/types'

const TOOLS_PER_PAGE = 12

interface ToolsClientProps {
  tools: Tool[]
  categories: string[]
}

export function ToolsClient({ tools, categories }: ToolsClientProps) {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const matchesSearch =
        tool.name.toLowerCase().includes(search.toLowerCase()) ||
        tool.description.toLowerCase().includes(search.toLowerCase())
      const matchesCategory = !selectedCategory || tool.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [tools, search, selectedCategory])

  const paginatedTools = useMemo(() => {
    const start = (currentPage - 1) * TOOLS_PER_PAGE
    return filteredTools.slice(start, start + TOOLS_PER_PAGE)
  }, [filteredTools, currentPage])

  const totalPages = Math.ceil(filteredTools.length / TOOLS_PER_PAGE)

  const handleFilterChange = (category: string | null) => {
    setSelectedCategory(category)
    setCurrentPage(1)
  }

  return (
    <div className="min-h-screen bg-[#080810]">
      {/* Hero */}
      <div className="bg-[#0d0d16] border-b border-[#1c1c2e]">
        <div className="container py-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 text-xs font-mono text-[#00D9FF] bg-[#00D9FF]/8 rounded-md border border-[#00D9FF]/20">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00D9FF] animate-pulse" />
                {tools.length} Tools
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">
                AI Tools Directory
              </h1>
              <p className="text-zinc-400">
                Discover the best AI coding tools, editors, and assistants for developers.
              </p>
            </div>
            <div className="flex gap-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-[#00D9FF]/10 text-[#00D9FF] border border-[#00D9FF]/20' 
                    : 'text-zinc-500 hover:text-white hover:bg-[#111118]'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-[#00D9FF]/10 text-[#00D9FF] border border-[#00D9FF]/20' 
                    : 'text-zinc-500 hover:text-white hover:bg-[#111118]'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-8">
        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search tools..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setCurrentPage(1)
              }}
              className="w-full h-11 pl-11 pr-4 bg-[#111118] border border-[#1c1c2e] rounded-xl text-sm font-mono text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#00D9FF]/50 transition-colors"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleFilterChange(null)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                selectedCategory === null
                  ? 'bg-[#00D9FF]/10 text-[#00D9FF] border border-[#00D9FF]/20'
                  : 'bg-[#111118] text-zinc-400 border border-[#1c1c2e] hover:text-white hover:border-[#282838]'
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleFilterChange(category)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                  selectedCategory === category
                    ? 'bg-[#00D9FF]/10 text-[#00D9FF] border border-[#00D9FF]/20'
                    : 'bg-[#111118] text-zinc-400 border border-[#1c1c2e] hover:text-white hover:border-[#282838]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Tools Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8 stagger-children">
            {paginatedTools.map((tool) => (
              <GlassCard key={tool.slug} hover padding="lg" className="group">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#1c1c2e] border border-[#282838] flex items-center justify-center text-lg font-bold text-white font-mono">
                      {tool.name[0]}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white group-hover:text-[#00D9FF] transition-colors">
                        {tool.name}
                      </h3>
                      {tool.pricing && <ToolBadge type={tool.pricing} />}
                    </div>
                  </div>
                </div>

                {/* Category */}
                <Badge variant="outline" size="sm" className="mb-3">
                  {tool.category}
                </Badge>

                {/* Description */}
                <p className="text-sm text-zinc-500 mb-4 line-clamp-2">
                  {tool.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {tool.tags?.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="outline" size="sm">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t border-[#1c1c2e]">
                  <Button size="sm" variant="secondary" className="flex-1" asChild>
                    <Link href={`/tools/${tool.slug}`}>Details</Link>
                  </Button>
                  <a
                    href={tool.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-[#1c1c2e] border border-[#282838] text-zinc-400 hover:text-[#00D9FF] hover:border-[#00D9FF]/20 transition-all"
                    aria-label={`Visit ${tool.name}`}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </GlassCard>
            ))}
          </div>
        ) : (
          <div className="space-y-3 mb-8">
            {paginatedTools.map((tool) => (
              <GlassCard key={tool.slug} hover padding="md" className="group flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#1c1c2e] border border-[#282838] flex items-center justify-center text-xl font-bold text-white font-mono shrink-0">
                  {tool.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-white group-hover:text-[#00D9FF] transition-colors truncate">
                      {tool.name}
                    </h3>
                    <ToolBadge type={tool.pricing || 'free'} />
                  </div>
                  <p className="text-sm text-zinc-500 truncate">{tool.description}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Badge variant="outline" size="sm">{tool.category}</Badge>
                  <Button size="sm" variant="secondary" asChild>
                    <Link href={`/tools/${tool.slug}`}>Details</Link>
                  </Button>
                </div>
              </GlassCard>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            >
              ← Prev
            </Button>
            <span className="px-4 py-2 text-sm font-mono text-zinc-500">
              {currentPage} / {totalPages}
            </span>
            <Button
              variant="secondary"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            >
              Next →
            </Button>
          </div>
        )}

        {paginatedTools.length === 0 && (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#111118] border border-[#1c1c2e] mb-4">
              <Search className="w-6 h-6 text-zinc-500" />
            </div>
            <p className="text-zinc-500 font-mono">No tools found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}
