import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface MarqueeProps {
  items: ReactNode[]
  className?: string
  /** Separator rendered between items, defaults to an em dash. */
  separator?: ReactNode
}

export function Marquee({ items, className, separator }: MarqueeProps) {
  const sep = separator ?? <span className="text-ink-soft">—</span>

  const row = (
    <div className="marquee-track">
      {items.map((item, i) => (
        <span key={i} className="inline-flex items-center gap-12">
          <span>{item}</span>
          {sep}
        </span>
      ))}
    </div>
  )

  return (
    <div className={cn('marquee', className)} aria-hidden="true">
      {row}
      {/* Duplicate track so the loop is seamless */}
      {row}
    </div>
  )
}
