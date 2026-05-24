import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { NumberedSection } from '@/components/shared/NumberedSection'
import { AnimatedReveal } from '@/components/shared/AnimatedReveal'
import { testimonials } from '@/data/testimonials'
import type { Locale } from '@/types'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/utils'

function isPlaceholder(value: string) {
  return /{{.*?}}/.test(value)
}

export function Testimonials() {
  const { t, i18n } = useTranslation()
  const locale: Locale = i18n.language.startsWith('he') ? 'he' : 'en'
  const reduced = useReducedMotion()

  const real = testimonials.filter(
    (x) =>
      !isPlaceholder(x.name) &&
      !isPlaceholder(x.quote.he) &&
      !isPlaceholder(x.quote.en),
  )

  const [active, setActive] = useState(0)
  const safeActive = real.length > 0 ? active % real.length : 0
  const current = real[safeActive]

  return (
    <NumberedSection
      id="testimonials"
      number="04"
      label={t('index.words', 'Words')}
      title={t('testimonials.title')}
    >
      {real.length === 0 ? (
        <AnimatedReveal>
          <div className="grid items-baseline gap-x-10 gap-y-6 md:grid-cols-12">
            <div className="md:col-span-2">
              <span className="mono-ltr text-[11px] font-medium uppercase tracking-[0.2em] text-ink-soft">
                — Pending
              </span>
            </div>
            <p className="font-display text-[clamp(1.5rem,3vw,2.25rem)] font-medium leading-snug tracking-tight text-ink-soft md:col-span-10">
              {t(
                'testimonials.empty',
                locale === 'he'
                  ? 'המלצות לקוחות בדרך. עד אז — הפרויקטים מדברים בעד עצמם.'
                  : 'Client words are on the way. Until then — the work speaks.',
              )}
            </p>
          </div>
        </AnimatedReveal>
      ) : (
        <div className="grid gap-x-10 gap-y-10 md:grid-cols-12">
          {/* Big quote */}
          <div className="md:col-span-9">
            <AnimatePresence mode="wait">
              {current && (
                <motion.figure
                  key={current.id}
                  initial={reduced ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? undefined : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span
                    aria-hidden="true"
                    className="block font-display text-[clamp(5rem,12vw,10rem)] font-medium leading-none text-signal"
                  >
                    “
                  </span>
                  <blockquote className="mt-2 font-display text-[clamp(1.75rem,3.4vw,3rem)] font-medium leading-[1.1] tracking-tight text-ink">
                    {current.quote[locale]}
                  </blockquote>
                  <figcaption className="mono-ltr mt-10 flex items-baseline gap-4 border-t border-ink/20 pt-5 text-sm font-medium text-ink">
                    <span>{current.name}</span>
                    <span className="text-ink/30">—</span>
                    <span className="text-ink-soft">{current.role[locale]}</span>
                  </figcaption>
                </motion.figure>
              )}
            </AnimatePresence>
          </div>

          {/* Index + nav */}
          <div className="md:col-span-3 md:pt-3">
            <AnimatedReveal from="start" delay={0.1}>
              <ul role="list" className="flex flex-col gap-1">
                {real.map((tst, i) => {
                  const isActive = i === safeActive
                  return (
                    <li key={tst.id}>
                      <button
                        type="button"
                        onClick={() => setActive(i)}
                        aria-pressed={isActive}
                        className={cn(
                          'mono-ltr group flex w-full items-baseline justify-between gap-3 border-b border-ink/15 py-3 text-[11px] font-medium uppercase tracking-[0.2em] transition-colors',
                          isActive
                            ? 'text-ink'
                            : 'text-ink-soft hover:text-ink',
                        )}
                      >
                        <span className="flex items-baseline gap-3">
                          <span className={isActive ? 'text-signal' : ''}>
                            0{i + 1}
                          </span>
                          <span className="font-sans text-sm normal-case tracking-tight">
                            {tst.name}
                          </span>
                        </span>
                        <span
                          className={cn(
                            'h-px w-6 transition-all',
                            isActive
                              ? 'bg-signal'
                              : 'bg-ink/20 group-hover:bg-ink',
                          )}
                        />
                      </button>
                    </li>
                  )
                })}
              </ul>
            </AnimatedReveal>
          </div>
        </div>
      )}
    </NumberedSection>
  )
}
