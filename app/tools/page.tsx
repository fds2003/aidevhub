import { getAllTools } from '@/lib/content'
import { ToolsClient } from '@/components/tools-client'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Tools Directory',
  description: 'Discover the best AI coding tools, editors, and assistants for developers.',
  openGraph: { title: 'AI Tools Directory' },
  twitter: { title: 'AI Tools Directory' },
  alternates: { canonical: '/tools' },
}

export default function ToolsPage() {
  const tools = getAllTools()
  const categories = Array.from(new Set(tools.map((t) => t.category)))

  return <ToolsClient tools={tools} categories={categories} />
}
