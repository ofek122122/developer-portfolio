import { useTranslation } from 'react-i18next'
import type { TFunction } from 'i18next'
import { ArrowRight } from 'lucide-react'
import { NumberedSection } from '@/components/shared/NumberedSection'
import { AnimatedReveal } from '@/components/shared/AnimatedReveal'
import { TextLink } from '@/components/shared/TextLink'
import { services } from '@/data/services'
import type { Locale } from '@/types'

export function Services() {
  const { t, i18n } = useTranslation()
  const locale: Locale = i18n.language.startsWith('he') ? 'he' : 'en'

  const real = services.filter((s) => s.id !== 'other')
  const open = services.find((s) => s.id === 'other')

  return (
    <NumberedSection
      id="services"
      number="03"
      label={t('index.practice', 'Practice')}
      title={t('services.title')}
      intro={t('services.subtitle')}
    >
      <ul className="divide-y divide-ink/15 border-y border-ink/30">
        {real.map((s, i) => (
          <ServiceRow key={s.id} service={s} locale={locale} index={i + 1} t={t} />
        ))}
      </ul>

      {/* Loud full-bleed signal block — the "open to ideas" entry */}
      {open && (
        <AnimatedReveal className="mt-16">
          <a
            href="#contact"
            className="group relative -mx-6 block bg-signal text-ink transition-colors hover:bg-ink hover:text-signal sm:-mx-10"
          >
            <div className="grid items-end gap-x-10 gap-y-6 px-6 py-12 sm:px-10 sm:py-16 md:grid-cols-12 md:py-20">
              <div className="md:col-span-9">
                <div className="mono-ltr text-[11px] font-medium uppercase tracking-[0.2em] opacity-80">
                  / 05 · {t('services.elseLabel', 'Something else')}
                </div>
                <h3 className="mt-6 font-display text-[clamp(2.5rem,7vw,6rem)] font-medium leading-[0.95] tracking-tightest">
                  {open.title[locale]}
                </h3>
                <p className="mt-6 max-w-2xl text-lg font-medium leading-snug sm:text-xl">
                  {open.description[locale]}
                </p>
              </div>
              <div className="flex justify-start md:col-span-3 md:justify-end">
                <span className="group/cta inline-flex items-baseline gap-2 text-lg font-medium tracking-tight sm:text-xl">
                  <span className="link-rule">{t('services.contactCta')}</span>
                  <ArrowRight
                    aria-hidden="true"
                    className="h-[1em] w-[1em] shrink-0 translate-y-[0.08em] transition-transform duration-200 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
                  />
                </span>
              </div>
            </div>
          </a>
        </AnimatedReveal>
      )}
    </NumberedSection>
  )
}

interface ServiceRowProps {
  service: (typeof services)[number]
  locale: Locale
  index: number
  t: TFunction
}

function ServiceRow({ service: s, locale, index, t }: ServiceRowProps) {
  return (
    <AnimatedReveal as="li" delay={index * 0.04} className="group">
      <details className="block py-7 transition-colors open:bg-ink/[0.02]">
        <summary className="flex cursor-pointer list-none items-start justify-between gap-6 [&::-webkit-details-marker]:hidden">
          <div className="flex items-baseline gap-6 sm:gap-10">
            <span className="mono-ltr w-8 shrink-0 text-[11px] font-medium uppercase tracking-[0.2em] text-ink-soft">
              0{index}
            </span>
            <h3 className="font-display text-3xl font-medium leading-tight tracking-tight text-ink transition-colors group-hover:text-signal sm:text-4xl md:text-5xl">
              {s.title[locale]}
            </h3>
          </div>
          <div className="flex shrink-0 items-baseline gap-4">
            {s.startingPrice && (
              <span className="mono-ltr hidden text-xs font-medium uppercase tracking-[0.18em] text-ink sm:inline">
                {t('services.priceFrom')}{' '}
                <span className="text-ink">{s.startingPrice}</span>
              </span>
            )}
            <span className="mono-ltr text-2xl font-medium text-ink-soft transition-transform duration-300 group-open:rotate-45">
              +
            </span>
          </div>
        </summary>

        <div className="grid gap-x-10 gap-y-6 pl-14 pr-0 pt-6 sm:grid-cols-12 sm:pl-16 rtl:pl-0 rtl:pr-14 rtl:sm:pr-16">
          <div className="sm:col-span-7">
            <p className="text-base leading-relaxed text-ink-soft sm:text-lg">
              {s.description[locale]}
            </p>
            {s.bullets.length > 0 && (
              <ul className="mt-5 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
                {s.bullets.map((b, j) => (
                  <li
                    key={j}
                    className="flex items-baseline gap-3 text-sm text-ink"
                  >
                    <span className="mono-ltr text-[10px] text-signal">▸</span>
                    <span>{b[locale]}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="flex flex-col items-start gap-4 sm:col-span-5 sm:items-end">
            {s.startingPrice ? (
              <div className="mono-ltr">
                <div className="text-[10px] uppercase tracking-[0.2em] text-ink-soft">
                  {t('services.priceFrom')}
                </div>
                <div className="font-display text-4xl font-medium text-ink">
                  {s.startingPrice}
                </div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-ink-soft">
                  {t('services.priceNote')}
                </div>
              </div>
            ) : (
              <div className="mono-ltr text-[11px] font-medium uppercase tracking-[0.2em] text-ink-soft">
                {t('services.byQuote')}
              </div>
            )}
            <TextLink href="#contact" tone="ink" size="sm">
              {t('services.contactCta')}
            </TextLink>
          </div>
        </div>
      </details>
    </AnimatedReveal>
  )
}
