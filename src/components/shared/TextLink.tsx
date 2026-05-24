import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type Tone = 'ink' | 'signal' | 'cobalt' | 'paper'
type Size = 'sm' | 'md' | 'lg'

const TONES: Record<Tone, string> = {
  ink: 'text-ink hover:text-signal',
  signal: 'text-signal hover:text-ink',
  cobalt: 'text-cobalt hover:text-ink',
  paper: 'text-paper hover:text-signal',
}

const SIZES: Record<Size, string> = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg sm:text-xl',
}

interface CommonProps {
  children: ReactNode
  tone?: Tone
  size?: Size
  className?: string
  /** Show the trailing arrow that slides on hover. */
  arrow?: boolean
}

type AsAnchor = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & {
    as?: 'a'
    href: string
  }

type AsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    as: 'button'
  }

export type TextLinkProps = AsAnchor | AsButton

export function TextLink(props: TextLinkProps) {
  const {
    children,
    tone = 'ink',
    size = 'md',
    arrow = true,
    className,
    ...rest
  } = props
  const classes = cn(
    'group inline-flex items-baseline gap-2 font-medium tracking-tight transition-colors duration-200',
    'focus-visible:outline-none focus-visible:[outline:2px_solid_var(--signal)] focus-visible:outline-offset-4',
    TONES[tone],
    SIZES[size],
    className,
  )

  const inner = (
    <>
      <span className="link-rule">{children}</span>
      {arrow && (
        <ArrowRight
          aria-hidden="true"
          className="h-[1em] w-[1em] shrink-0 translate-y-[0.08em] transition-transform duration-200 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
        />
      )}
    </>
  )

  if (rest.as === 'button') {
    const { as: _as, ...buttonProps } = rest as AsButton
    void _as
    return (
      <button type="button" className={classes} {...buttonProps}>
        {inner}
      </button>
    )
  }
  const { as: _as, ...anchorProps } = rest as AsAnchor
  void _as
  return (
    <a className={classes} {...anchorProps}>
      {inner}
    </a>
  )
}
