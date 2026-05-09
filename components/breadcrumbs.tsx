'use client'

import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={`mb-6 ${className}`}>
      <ol className="flex items-center gap-2 text-sm">
        <li className="flex items-center">
          <Link
            href="/"
            className="text-zinc-500 hover:text-purple-400 transition-colors"
            aria-label="Home"
          >
            <Home className="w-4 h-4" />
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            <ChevronRight className="w-4 h-4 text-zinc-700" />
            {item.href && index < items.length - 1 ? (
              <Link
                href={item.href}
                className="text-zinc-500 hover:text-purple-400 transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-zinc-300 font-medium" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

/**
 * Generate breadcrumb JSON-LD schema for a page
 */
export function generateBreadcrumbJsonLd(
  items: BreadcrumbItem[],
  siteUrl: string
): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.href ? `${siteUrl}${item.href}` : undefined,
    })),
  }
}
