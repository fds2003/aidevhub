'use client'

import { useState, useEffect } from 'react'
import { List, ChevronRight } from 'lucide-react'

export interface TOCItem {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  content: string
  className?: string
}

/**
 * Extract headings from markdown content
 */
function extractHeadings(content: string): TOCItem[] {
  const headingRegex = /^(#{1,3})\s+(.+)$/gm
  const headings: TOCItem[] = []
  let match

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length
    const text = match[2].trim()
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')

    headings.push({ id, text, level })
  }

  return headings
}

/**
 * Table of Contents component
 */
export function TableOfContents({ content, className = '' }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<TOCItem[]>([])
  const [activeId, setActiveId] = useState<string>('')
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    const extractedHeadings = extractHeadings(content)
    setHeadings(extractedHeadings)

    // Set up intersection observer for active heading tracking
    if (extractedHeadings.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-80px 0px -80% 0px',
        threshold: 0,
      }
    )

    // Add IDs to headings in the document
    extractedHeadings.forEach((heading) => {
      const element = document.getElementById(heading.id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [content])

  if (headings.length === 0) {
    return null
  }

  return (
    <nav className={`bg-zinc-900/50 border border-zinc-800 rounded-lg p-4 ${className}`}>
      {/* Mobile toggle */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full md:hidden text-left"
      >
        <div className="flex items-center gap-2 text-sm font-semibold text-zinc-300">
          <List className="w-4 h-4" />
          Table of Contents
        </div>
        <ChevronRight
          className={`w-4 h-4 text-zinc-500 transition-transform ${
            isExpanded ? 'rotate-90' : ''
          }`}
        />
      </button>

      {/* Desktop header */}
      <div className="hidden md:flex items-center gap-2 text-sm font-semibold text-zinc-300 mb-3">
        <List className="w-4 h-4" />
        Table of Contents
      </div>

      {/* TOC Items */}
      <ul
        className={`space-y-2 ${isExpanded ? 'block' : 'hidden'} md:block`}
      >
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className={`
                block text-sm transition-colors py-1
                ${heading.level === 1 ? 'font-medium' : ''}
                ${heading.level === 2 ? 'pl-0' : ''}
                ${heading.level === 3 ? 'pl-4' : ''}
                ${
                  activeId === heading.id
                    ? 'text-purple-400'
                    : 'text-zinc-500 hover:text-zinc-300'
                }
              `}
              onClick={() => setIsExpanded(false)}
            >
              <span className="flex items-center gap-2">
                {heading.level > 1 && (
                  <ChevronRight className="w-3 h-3 text-zinc-700 flex-shrink-0" />
                )}
                {heading.text}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
