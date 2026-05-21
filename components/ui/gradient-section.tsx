"use client";

import { forwardRef, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface GradientSectionProps extends HTMLAttributes<HTMLElement> {
  variant?: "default" | "muted" | "gradient" | "grid";
  size?: "sm" | "md" | "lg";
}

export const GradientSection = forwardRef<HTMLElement, GradientSectionProps>(
  ({ className, variant = "default", size = "md", children, ...props }, ref) => {
    const variants = {
      default: "bg-background",
      muted: "bg-surface/50",
      gradient: "bg-gradient-to-b from-background via-surface/40 to-background",
      grid: "bg-background relative",
    };

    const sizes = {
      sm: "py-12",
      md: "py-16",
      lg: "py-24",
    };

    return (
      <section
        ref={ref}
        className={cn(variants[variant], sizes[size], className)}
        {...props}
      >
        <div className="container mx-auto px-4">{children}</div>
      </section>
    );
  }
);
GradientSection.displayName = "GradientSection";

// Gradient Border
export function GradientBorder({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("relative rounded-xl p-[1px] bg-gradient-to-r from-primary to-secondary", className)}>
      <div className="bg-background rounded-xl h-full">{children}</div>
    </div>
  );
}

// Section Headers
export function SectionHeader({
  badge,
  title,
  description,
  action,
}: {
  badge?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
      <div>
        {badge && (
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 text-xs font-mono font-medium text-primary bg-primary/10 rounded-md border border-primary/20">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            {badge}
          </div>
        )}
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
          {title}
        </h2>
        {description && (
          <p className="mt-3 text-base text-zinc-400 max-w-2xl leading-relaxed">{description}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
