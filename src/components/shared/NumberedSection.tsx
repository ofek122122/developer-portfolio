import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { AnimatedReveal } from './AnimatedReveal'

interface NumberedSectionProps {
  id: string
  number: string
  /** Editorial label, set in mono, eg "studio" / "selected work" */
  label: string
  /** Display headline, set in Fraunces/Frank Ruhl. */
  title: ReactNode
  /** Optional intro paragraph, body text. */
  intro?: ReactNode
  /** Choose how children align beneath the heading. */
  tone?: 'paper' | 'signal' | 'cobalt' | 'ink'
  className?: string
  children: ReactNode
}

const TONES: Record<NonNullable<NumberedSectionProps['tone']>, string> = {
  paper: 'bg-paper text-ink',
  signal: 'bg-signal text-ink',
  cobalt: 'bg-cobalt text-paper',
  ink: 'bg-ink text-paper',
}

const NUMBER_TONES: Record<NonNullable<NumberedSectionProps['tone']>, string> = {
  paper: 'text-ink/30',
  signal: 'text-ink/40',
  cobalt: 'text-paper/40',
  ink: 'text-paper/40',
}

const RULE_TONES: Record<NonNullable<NumberedSectionProps['tone']>, string> = {
  paper: 'border-ink/20',
  signal: 'border-ink/30',
  cobalt: 'border-paper/30',
  ink: 'border-paper/20',
}

export function NumberedSection({
  id,
  number,
  label,
  title,
  intro,
  tone = 'paper',
  className,
  children,
}: NumberedSectionProps) {
  return (
    <section
      id={id}
      data-section={id}
      className={cn(
        'relative scroll-mt-24 py-24 sm:py-32 lg:py-40',
        TONES[tone],
        className,
      )}
    >
      <div
        className={cn(
          'border-t',
          RULE_TONES[tone],
          'mx-auto w-full max-w-[88rem] px-6 sm:px-10',
        )}
      >
        <div className="grid gap-x-10 gap-y-10 pt-10 sm:pt-14 md:grid-cols-12">
          <div className="md:col-span-3 lg:col-span-3">
            <AnimatedReveal from="start" className="flex items-baseline gap-4">
              <span
                className={cn(
                  'mono-ltr text-xs font-medium tracking-[0.18em]',
                  tone === 'paper' || tone === 'signal'
                    ? 'text-ink-soft'
                    : 'text-paper/70',
                )}
              >
                /{label.toUpperCase()}
              </span>
            </AnimatedReveal>
            <AnimatedReveal
              from="start"
              delay={0.05}
              className={cn(
                'mono-ltr mt-4 select-none font-display text-[6rem] font-medium leading-[0.85] sm:text-[8rem]',
                NUMBER_TONES[tone],
              )}
              as="div"
            >
              {number}
            </AnimatedReveal>
          </div>

          <div className="md:col-span-9 lg:col-span-9">
            <AnimatedReveal>
              <h2 className="font-display text-[clamp(2.5rem,6vw,5.5rem)] font-medium leading-[0.95] tracking-tightest">
                {title}
              </h2>
            </AnimatedReveal>
            {intro && (
              <AnimatedReveal delay={0.1}>
                <p
                  className={cn(
                    'mt-8 max-w-prose text-lg leading-relaxed sm:text-xl',
                    tone === 'paper' || tone === 'signal'
                      ? 'text-ink-soft'
                      : 'text-paper/80',
                  )}
                >
                  {intro}
                </p>
              </AnimatedReveal>
            )}
            <div className="mt-14 sm:mt-20">{children}</div>
          </div>
        </div>
      </div>
    </section>
  )
}
