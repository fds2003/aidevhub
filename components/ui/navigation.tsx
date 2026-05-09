"use client";

// Navigation Bar - Modern glassmorphism header
import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { GlassButton } from "./glass-button";
import { Search, Menu, X, Sparkles } from "lucide-react";

const NAV_ITEMS = [
  { label: "Tools", href: "/tools" },
  { label: "Blog", href: "/blog" },
  { label: "Workflows", href: "/workflows" },
  { label: "MCP", href: "/mcp" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/50"
          : "bg-transparent"
      )}
    >
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-semibold text-white group-hover:text-purple-400 transition-colors">
            AI Dev Hub
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-4 py-2 text-sm text-zinc-400 hover:text-white transition-colors rounded-lg hover:bg-zinc-800/50"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Search Button */}
          <GlassButton variant="secondary" size="sm" className="hidden sm:flex">
            <Search className="w-4 h-4" />
            <span className="ml-2">Search</span>
            <kbd className="ml-4 px-1.5 py-0.5 text-xs bg-zinc-700 rounded">⌘K</kbd>
          </GlassButton>

          {/* CTA */}
          <GlassButton size="sm" className="hidden sm:flex">
            Get Started
          </GlassButton>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-zinc-400 hover:text-white transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden absolute top-full left-0 right-0 bg-zinc-950/95 backdrop-blur-xl border-b border-zinc-800 transition-all duration-300",
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
      >
        <div className="container mx-auto px-4 py-4 space-y-2">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-4 py-3 text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded-xl transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-zinc-800">
            <GlassButton className="w-full">Get Started</GlassButton>
          </div>
        </div>
      </div>
    </header>
  );
}
