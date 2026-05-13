"use client";

import type { SiteContentStats } from "@/lib/content-stats";
import Link from "next/link";
import { GlassButton } from "./glass-button";
import { SearchInput } from "./search-input";
import { ArrowRight, Terminal } from "lucide-react";

/** 与 {@link computeContentStats} 结果绑定；禁止在此写死「40+」「52」等占位数字 */
export function HeroSection({ stats }: { stats: SiteContentStats }) {
  const categoryLinks = [
    { name: "AI Coding", count: stats.aiCodingToolsCount, href: "/categories/ai-coding-tools" },
    { name: "MCP Servers", count: stats.mcpCount, href: "/mcp" },
    { name: "AI Agents", count: stats.aiAgentsCount, href: "/categories/ai-agents" },
    { name: "Workflows", count: stats.workflowCount, href: "/workflows" },
  ];

  const statBar = [
    { label: "Tools", value: String(stats.toolCount), hl: true },
    { label: "Workflows", value: String(stats.workflowCount), hl: false },
    { label: "MCP Servers", value: String(stats.mcpCount), hl: false },
    { label: "Articles", value: String(stats.postCount), hl: false },
  ];

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#080810]">
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#00D9FF]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#7B61FF]/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00D9FF]/20 to-transparent" />

      <div className="relative z-10 container mx-auto px-4 py-24 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-8 bg-[#111118] border border-[#1c1c2e] rounded-lg text-xs font-mono text-zinc-400">
          <span className="text-terminal-500">$</span>
          <span className="text-zinc-500">ai-dev-hub</span>
          <span className="text-zinc-600">--version</span>
          <span className="text-[#00D9FF]">1.0.0</span>
        </div>

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-[1.1]">
          The Ultimate Hub for
          <br />
          <span className="text-[#00D9FF]">AI Development</span>
        </h1>

        <p className="text-lg md:text-xl text-zinc-500 max-w-2xl mx-auto mb-10 leading-relaxed">
          A curated collection of AI coding assistants, MCP servers, agents, and workflows.
          Everything you need to build with AI — in one place.
        </p>

        <div className="max-w-xl mx-auto mb-12">
          <SearchInput placeholder="Search tools, articles, workflows..." />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-20">
          <GlassButton size="lg" variant="cyan" as="link" href="/tools">
            <Terminal className="w-4 h-4 mr-2" />
            Explore Tools
          </GlassButton>
          <GlassButton size="lg" variant="secondary" as="link" href="/workflows">
            View Workflows
            <ArrowRight className="w-4 h-4 ml-2" />
          </GlassButton>
        </div>

        <div className="inline-flex items-center gap-0 mb-20 bg-[#111118] border border-[#1c1c2e] rounded-xl overflow-hidden">
          {statBar.map((stat, i) => (
            <div key={stat.label} className="flex items-center">
              {i > 0 && <div className="w-px h-12 bg-[#1c1c2e]" />}
              <div className="px-8 py-4 text-center">
                <div className={`text-2xl font-bold font-mono tabular-nums ${stat.hl ? "text-[#00D9FF]" : "text-white"}`}>
                  {stat.value}
                </div>
                <div className="text-xs text-zinc-500 mt-0.5 font-mono">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          {categoryLinks.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              className="group px-4 py-2 bg-[#111118] border border-[#1c1c2e] rounded-lg text-sm text-zinc-400 hover:text-[#00D9FF] hover:border-[#00D9FF]/30 transition-all duration-150 font-mono"
            >
              <span className="text-[#00D9FF] opacity-0 group-hover:opacity-100 transition-opacity">{'// '}</span>
              {cat.name}
              <span className="ml-2 text-zinc-600 group-hover:text-[#00D9FF]/40 transition-colors tabular-nums">
                ({cat.count})
              </span>
            </Link>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1c1c2e] to-transparent" />
    </section>
  );
}
