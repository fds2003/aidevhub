import { forwardRef, HTMLAttributes } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { GlassCard } from "./glass-card";
import { Badge, ToolBadge } from "./glass-badge";
import { ExternalLink, TrendingUp } from "lucide-react";

export interface ToolCardProps extends HTMLAttributes<HTMLDivElement> {
  tool: {
    slug: string;
    name: string;
    tagline?: string;
    logo?: string;
    pricing?: "free" | "freemium" | "paid" | "open-source";
    categories?: string[];
    featured?: boolean;
    rating?: number;
    users?: string;
    trending?: boolean;
  };
  variant?: "default" | "compact" | "featured";
}

export const ToolCard = forwardRef<HTMLDivElement, ToolCardProps>(
  ({ className, tool, variant = "default", ...props }, ref) => {
    const { slug, name, tagline, logo, pricing, categories, featured, trending } = tool;

    if (variant === "compact") {
      return (
        <Link href={`/tools/${slug}`}>
          <GlassCard ref={ref} hover padding="sm" className={cn("flex items-center gap-4", className)} {...props}>
            <div className="w-10 h-10 rounded-lg bg-[#1c1c2e] border border-[#282838] flex items-center justify-center text-lg font-bold text-white shrink-0 font-mono">
              {logo || (name ? name[0] : '?')}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-medium text-white truncate text-sm">{name}</h3>
                {trending && <TrendingUp className="w-3.5 h-3.5 text-[#00D9FF]" />}
              </div>
              {tagline && <p className="text-xs text-zinc-500 truncate mt-0.5">{tagline}</p>}
            </div>
            {pricing && <ToolBadge type={pricing} />}
          </GlassCard>
        </Link>
      );
    }

    return (
      <Link href={`/tools/${slug}`}>
        <GlassCard
          ref={ref}
          hover
          className={cn(
            "group relative overflow-hidden",
            featured && "border-[#00D9FF]/20",
            className
          )}
          {...props}
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              {/* Logo */}
              <div className="w-12 h-12 rounded-xl bg-[#111118] border border-[#1c1c2e] flex items-center justify-center text-xl font-bold text-white group-hover:border-[#282838] transition-colors font-mono">
                {logo || (name ? name[0] : '?')}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-white group-hover:text-[#00D9FF] transition-colors text-sm">
                    {name}
                  </h3>
                  {trending && <TrendingUp className="w-3.5 h-3.5 text-[#00D9FF]" />}
                </div>
                {pricing && <ToolBadge type={pricing} />}
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-zinc-600 group-hover:text-[#00D9FF] transition-colors opacity-0 group-hover:opacity-100 shrink-0" />
          </div>

          {/* Tagline */}
          {tagline && (
            <p className="text-sm text-zinc-500 mb-4 line-clamp-2 leading-relaxed">{tagline}</p>
          )}

          {/* Categories */}
          {categories && categories.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {categories.slice(0, 3).map((cat) => (
                <Badge key={cat} variant="outline" size="sm">
                  {cat}
                </Badge>
              ))}
            </div>
          )}
        </GlassCard>
      </Link>
    );
  }
);
ToolCard.displayName = "ToolCard";
