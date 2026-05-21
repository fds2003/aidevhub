import Link from 'next/link'
import { Github, Twitter } from 'lucide-react'
import { SITE_NAME, NAV_ITEMS, SOCIAL_LINKS } from '@/lib/constants'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-background">
      <div className="container py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded bg-primary/10 border border-primary/20 flex items-center justify-center">
                <span className="text-primary text-xs font-mono font-bold">AI</span>
              </div>
              <span className="font-semibold text-white font-mono">{SITE_NAME}</span>
            </div>
            <p className="mt-2 text-sm text-zinc-500 leading-relaxed">
              Curated AI development tools, MCP servers, agents, and workflows.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs font-mono font-semibold text-zinc-400 uppercase tracking-wider mb-4">
              Navigate
            </h3>
            <ul className="space-y-2.5 text-sm">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-zinc-500 hover:text-primary transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-xs font-mono font-semibold text-zinc-400 uppercase tracking-wider mb-4">
              Resources
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/rss.xml" className="text-zinc-500 hover:text-primary transition-colors">
                  RSS Feed
                </Link>
              </li>
              <li>
                <Link href="/sitemap.xml" className="text-zinc-500 hover:text-primary transition-colors">
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-xs font-mono font-semibold text-zinc-400 uppercase tracking-wider mb-4">
              Connect
            </h3>
            <div className="flex gap-3">
              <a href={SOCIAL_LINKS.twitter} target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-border text-zinc-500 hover:text-white hover:border-border-hover transition-all">
                <Twitter className="w-4 h-4" />
              </a>
              <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-border text-zinc-500 hover:text-white hover:border-border-hover transition-all">
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-600 font-mono">
            &copy; {currentYear} {SITE_NAME}. All rights reserved.
          </p>
          <p className="text-xs text-zinc-600 font-mono">
            Built with AI · Powered by curiosity
          </p>
        </div>
      </div>
    </footer>
  )
}
