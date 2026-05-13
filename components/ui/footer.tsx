"use client";

// Footer - Modern footer with gradient accent
import Link from "next/link";
import { Sparkles, Github, Twitter, Rss } from "lucide-react";
import { AUTHOR_EMAIL, SOCIAL_LINKS } from "@/lib/constants";

const FOOTER_LINKS = {
  tools: [
    { label: "All Tools", href: "/tools" },
    { label: "AI Coding", href: "/categories/ai-coding-tools" },
    { label: "MCP Servers", href: "/categories/mcp" },
    { label: "AI Agents", href: "/categories/ai-agents" },
  ],
  resources: [
    { label: "Blog", href: "/blog" },
    { label: "Workflows", href: "/workflows" },
    { label: "MCP Ecosystem", href: "/mcp" },
    { label: "Categories", href: "/categories" },
  ],
  company: [{ label: "Contact", href: `mailto:${AUTHOR_EMAIL}` }],
  social: [
    { icon: Github, href: SOCIAL_LINKS.github, label: "GitHub" },
    { icon: Twitter, href: SOCIAL_LINKS.twitter, label: "Twitter" },
    { icon: Rss, href: "/rss.xml", label: "RSS" },
  ],
};

export function Footer() {
  return (
    <footer className="relative bg-zinc-950 border-t border-zinc-800">
      {/* Gradient accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-white">AI Dev Hub</span>
            </Link>
            <p className="text-zinc-400 mb-6 max-w-xs">
              Your premier destination for AI development tools, workflows, and resources.
              Built for developers, by developers.
            </p>
            <div className="flex items-center gap-3">
              {FOOTER_LINKS.social.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-zinc-500 hover:text-white bg-zinc-900 rounded-lg hover:bg-zinc-800 transition-colors"
                  aria-label={item.label}
                >
                  <item.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Tools */}
          <div>
            <h3 className="font-semibold text-white mb-4">Tools</h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.tools.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-zinc-500">
            © 2024 AI Dev Hub. All rights reserved.
          </p>
          <p className="text-sm text-zinc-600">
            Built with ❤️ for the developer community
          </p>
        </div>
      </div>
    </footer>
  );
}
