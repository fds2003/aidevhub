"use client";

// Badge Component - Category/Status badges with gradient backgrounds
import { forwardRef, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "purple" | "cyan" | "emerald" | "amber" | "rose" | "outline";
  size?: "sm" | "md";
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    const baseStyles = "inline-flex items-center font-medium transition-colors";

    const variants = {
      default: "bg-zinc-800 text-zinc-300",
      purple: "bg-purple-500/15 text-purple-400 border border-purple-500/20",
      cyan: "bg-cyan-500/15 text-cyan-400 border border-cyan-500/20",
      emerald: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20",
      amber: "bg-amber-500/15 text-amber-400 border border-amber-500/20",
      rose: "bg-rose-500/15 text-rose-400 border border-rose-500/20",
      outline: "bg-transparent border border-zinc-700 text-zinc-400",
    };

    const sizes = {
      sm: "px-2 py-0.5 text-xs rounded-md gap-1",
      md: "px-2.5 py-1 text-xs rounded-lg gap-1.5",
    };

    return (
      <span
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  }
);

Badge.displayName = "Badge";

// Tool Card Badge - For pricing/featured labels
export const ToolBadge = forwardRef<HTMLSpanElement, { type: "free" | "freemium" | "paid" | "open-source" | "popular" | "new" } & HTMLAttributes<HTMLSpanElement>>(
  ({ type, className, ...props }, ref) => {
    const config = {
      free: { label: "Free", variant: "emerald" as const },
      freemium: { label: "Freemium", variant: "cyan" as const },
      paid: { label: "Paid", variant: "amber" as const },
      "open-source": { label: "Open Source", variant: "purple" as const },
      popular: { label: "Popular", variant: "rose" as const },
      new: { label: "New", variant: "purple" as const },
    };

    const { label, variant } = config[type];

    return (
      <Badge variant={variant} size="sm" ref={ref} className={className} {...props}>
        {type === "popular" && (
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1.5-.5-2.5-.5-2.5a1 1 0 00-1.88 0z" />
          </svg>
        )}
        {label}
      </Badge>
    );
  }
);

ToolBadge.displayName = "ToolBadge";
