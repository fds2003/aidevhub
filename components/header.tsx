import Link from 'next/link'
import { NAV_ITEMS, SITE_NAME } from '@/lib/constants'
import { MobileNav } from '@/components/mobile-nav'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/90 backdrop-blur-md">
      <div className="container flex h-14 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-7 h-7 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:border-primary/40 transition-colors">
            <span className="text-primary text-sm font-mono font-bold">AI</span>
          </div>
          <span className="text-sm font-semibold text-white tracking-tight font-mono">
            {SITE_NAME}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-150 text-zinc-500 hover:text-white hover:bg-surface/50"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <MobileNav />
        </div>
      </div>
    </header>
  )
}
