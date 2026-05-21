'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, Github } from 'lucide-react'
import { NAV_ITEMS, SITE_NAME, SOCIAL_LINKS } from '@/lib/constants'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeHref, setActiveHref] = useState('/')

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
          {NAV_ITEMS.map((item) => {
            const isActive = activeHref === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setActiveHref(item.href)}
                className={cn(
                  "px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-150",
                  isActive
                    ? "text-white bg-surface border border-border"
                    : "text-zinc-500 hover:text-white hover:bg-surface/50"
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* GitHub */}
          <a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center justify-center w-8 h-8 rounded-lg text-zinc-500 hover:text-white hover:bg-surface transition-all"
            aria-label="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <button className="flex items-center justify-center w-8 h-8 rounded-lg text-zinc-500 hover:text-white hover:bg-surface transition-all">
                <Menu className="w-4 h-4" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 bg-background border-l border-border">
              <nav className="flex flex-col gap-1 mt-8">
                {NAV_ITEMS.map((item) => {
                  const isActive = activeHref === item.href
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => { setActiveHref(item.href); setIsOpen(false) }}
                      className={cn(
                        "px-4 py-3 text-sm font-medium rounded-lg transition-all",
                        isActive
                          ? "text-primary bg-primary/5 border border-primary/20"
                          : "text-zinc-400 hover:text-white hover:bg-surface"
                      )}
                    >
                      {item.label}
                    </Link>
                  )
                })}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
