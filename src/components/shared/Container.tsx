import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface ContainerProps {
  children: ReactNode
  className?: string
  size?: 'wide' | 'narrow' | 'full'
}

export function Container({ children, className, size = 'wide' }: ContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full',
        size === 'wide' && 'max-w-[88rem] px-6 sm:px-10',
        size === 'narrow' && 'max-w-3xl px-6 sm:px-10',
        size === 'full' && 'px-6 sm:px-10',
        className,
      )}
    >
      {children}
    </div>
  )
}
