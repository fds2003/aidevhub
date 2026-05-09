import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-medium font-mono transition-colors focus:outline-none',
  {
    variants: {
      variant: {
        default:  'border-transparent bg-[#00D9FF]/15 text-[#00D9FF]',
        secondary: 'border-transparent bg-[#111118] text-zinc-400',
        destructive: 'border-transparent bg-red-500/15 text-red-400',
        outline: 'border border-[#1c1c2e] text-zinc-400',
        success:  'border-transparent bg-terminal-500/15 text-terminal-400',
        warning:  'border-transparent bg-amber-500/15 text-amber-400',
        cyan:     'border-transparent bg-[#00D9FF]/15 text-[#00D9FF]',
        purple:   'border-transparent bg-purple-500/15 text-purple-400',
        terminal: 'border-transparent bg-terminal-500/15 text-terminal-400',
      },
    },
    defaultVariants: { variant: 'default' },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
