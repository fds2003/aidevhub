import Link from "next/link";
import { forwardRef, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline" | "cyan" | "terminal";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  as?: "button" | "link";
  href?: string;
}

export const GlassButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading, children, disabled, as = "button", href, ...props }, ref) => {
    const baseStyles = `
      relative inline-flex items-center justify-center font-medium
      transition-all duration-150 ease-out cursor-pointer
      disabled:opacity-40 disabled:cursor-not-allowed
    `;

    const variants = {
      primary: `
        bg-cyan-500 text-black font-semibold
        hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(0,217,255,0.3)]
        active:scale-[0.97]
      `,
      secondary: `
        bg-surface border border-border text-zinc-300
        hover:bg-surface/80 hover:border-border-hover hover:text-white
        active:scale-[0.97]
      `,
      ghost: `
        bg-transparent text-zinc-400
        hover:bg-surface hover:text-white
        active:scale-[0.97]
      `,
      outline: `
        bg-transparent border border-border text-zinc-300
        hover:bg-surface hover:border-primary/30 hover:text-primary
        active:scale-[0.97]
      `,
      cyan: `
        bg-cyan-500 text-black font-semibold
        hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(0,217,255,0.3)]
        active:scale-[0.97]
      `,
      terminal: `
        bg-terminal-500 text-black font-semibold
        hover:bg-terminal-400 hover:shadow-[0_0_20px_rgba(0,255,135,0.3)]
        active:scale-[0.97]
      `,
    };

    const sizes = {
      sm: "h-8 px-3 text-xs rounded-lg gap-1.5",
      md: "h-10 px-4 text-sm rounded-xl gap-2",
      lg: "h-12 px-6 text-base rounded-xl gap-2.5",
    };

    const cls = cn(baseStyles, variants[variant], sizes[size], className);

    if (as === "link" && href) {
      return (
        <Link ref={ref as React.Ref<HTMLAnchorElement>} href={href} className={cls} {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
          {children}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        className={cls}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

GlassButton.displayName = "GlassButton";
