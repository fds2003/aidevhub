import Link from 'next/link'
import { Mail, Building2 } from 'lucide-react'
import { SITE_NAME, NAV_ITEMS, AUTHOR_EMAIL } from '@/lib/constants'

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

          {/* Connect */}
          <div>
            <h3 className="text-xs font-mono font-semibold text-zinc-400 uppercase tracking-wider mb-4">
              Connect
            </h3>
            <div className="flex flex-col gap-2.5">
              <a href={`mailto:${AUTHOR_EMAIL}`}
                className="flex items-center gap-2 text-sm text-zinc-500 hover:text-primary transition-colors group">
                <Mail className="w-4 h-4 group-hover:text-primary transition-colors" />
                <span className="font-mono text-xs sm:text-sm truncate">{AUTHOR_EMAIL}</span>
              </a>
              <a href="mailto:business@aidevhub.net"
                className="flex items-center gap-2 text-sm text-zinc-500 hover:text-purple-400 transition-colors group">
                <Building2 className="w-4 h-4 text-purple-500/80 group-hover:text-purple-400 transition-colors" />
                <span className="font-mono text-xs sm:text-sm truncate">business@aidevhub.net</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
            <p className="text-xs text-zinc-600 font-mono">
              &copy; {currentYear} {SITE_NAME}. All rights reserved.
            </p>
            <div className="flex gap-3 text-xs text-zinc-600 font-mono">
              <Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
              <span className="text-zinc-700">&middot;</span>
              <Link href="/terms" className="hover:text-primary transition-colors">Terms</Link>
              <span className="text-zinc-700">&middot;</span>
              <Link href="/disclaimer" className="hover:text-primary transition-colors">Disclaimer</Link>
            </div>
          </div>
          <p className="text-xs text-zinc-600 font-mono">
            Built with AI · Powered by curiosity
          </p>
        </div>
      </div>
    </footer>
  )
}
