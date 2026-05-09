import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--background))] disabled:pointer-events-none disabled:opacity-40',
  {
    variants: {
      variant: {
        default:
          'bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--primary-hover))] active:scale-[0.97] shadow-[0_0_16px_rgba(0,217,255,0.15)] hover:shadow-[0_0_24px_rgba(0,217,255,0.25)]',
        destructive:
          'bg-[hsl(var(--destructive))] text-[hsl(var(--destructive-foreground))] hover:opacity-90 active:scale-[0.97]',
        outline:
          'border border-[hsl(var(--border))] bg-transparent hover:bg-[hsl(var(--secondary))] hover:border-[hsl(var(--border-hover))] text-[hsl(var(--foreground))] hover:text-white active:scale-[0.97]',
        secondary:
          'bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] hover:opacity-80 active:scale-[0.97]',
        ghost:
          'hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--accent-foreground))]',
        link:
          'text-[hsl(var(--primary))] underline-offset-4 hover:underline',
        cyan:
          'bg-cyan-500 text-black font-semibold hover:bg-cyan-400 active:scale-[0.97] shadow-[0_0_16px_rgba(0,217,255,0.2)]',
        terminal:
          'bg-terminal-500 text-black font-semibold hover:bg-terminal-400 active:scale-[0.97] shadow-[0_0_16px_rgba(0,255,135,0.2)]',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-11 rounded-lg px-6',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
