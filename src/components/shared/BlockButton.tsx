import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

type Variant = 'ink' | 'signal' | 'paper'

const VARIANTS: Record<Variant, string> = {
  ink: 'bg-ink text-paper hover:bg-signal hover:text-ink',
  signal: 'bg-signal text-paper hover:bg-ink',
  paper: 'bg-paper text-ink hover:bg-signal',
}

interface BlockButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  children: ReactNode
  variant?: Variant
  fullWidth?: boolean
}

export const BlockButton = forwardRef<HTMLButtonElement, BlockButtonProps>(
  function BlockButton(
    { children, variant = 'ink', fullWidth, className, ...rest },
    ref,
  ) {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-3 border border-ink px-7 py-4 text-sm font-medium uppercase tracking-[0.15em] transition-colors duration-200',
          'focus-visible:outline-none focus-visible:[outline:2px_solid_var(--signal)] focus-visible:outline-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
          VARIANTS[variant],
          fullWidth && 'w-full',
          className,
        )}
        {...rest}
      >
        {children}
      </button>
    )
  },
)
