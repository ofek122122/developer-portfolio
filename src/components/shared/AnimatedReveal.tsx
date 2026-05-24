import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface AnimatedRevealProps {
  children: ReactNode
  delay?: number
  /** Distance in pixels. Negative shifts horizontally from the start side. */
  from?: 'bottom' | 'start' | 'none'
  amount?: number
  className?: string
  as?: 'div' | 'section' | 'article' | 'li' | 'span'
  /** When false, animation re-plays on each enter. Default once-only. */
  once?: boolean
}

export function AnimatedReveal({
  children,
  delay = 0,
  from = 'bottom',
  amount = 28,
  className,
  as = 'div',
  once = true,
}: AnimatedRevealProps) {
  const reduced = useReducedMotion()
  const MotionTag = motion[as]

  if (reduced || from === 'none') {
    const Tag = as
    return <Tag className={className}>{children}</Tag>
  }

  const initial =
    from === 'bottom'
      ? { opacity: 0, y: amount }
      : { opacity: 0, x: amount, y: 0 }

  return (
    <MotionTag
      className={className}
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  )
}
