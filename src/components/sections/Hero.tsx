import { useMemo, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { Container } from '@/components/shared/Container'
import { TextLink } from '@/components/shared/TextLink'
import { Marquee } from '@/components/shared/Marquee'
import { projects } from '@/data/projects'
import type { Locale, ProjectStatus } from '@/types'

const NAME_LATIN = ['Ofek', 'Karavani']
const NAME_HEBREW = ['אופק', 'קרוואני']

export function Hero() {
  const { t, i18n } = useTranslation()
  const locale: Locale = i18n.language.startsWith('he') ? 'he' : 'en'
  const reduced = useReducedMotion()
  const ref = useRef<HTMLElement>(null)

  // Scroll-driven parallax for the masthead — slower than the page
  const { scrollY } = useScroll()
  const nameY = useTransform(scrollY, [0, 800], [0, reduced ? 0 : -120])
  const nameOpacity = useTransform(scrollY, [0, 600], [1, reduced ? 1 : 0.15])

  const nameWords = locale === 'he' ? NAME_HEBREW : NAME_LATIN

  const fullYear = new Date().getFullYear()
  const shortYear = String(fullYear).slice(-2)

  // Marquee items — recent projects + year
  const marqueeItems = [
    `Selected work — ${fullYear}`,
    ...projects.map((p) => p.title[locale]),
    `Available · ${t('contact.channels.locationValue')}`,
  ]

  // Specimen list rendered inside the well — derived from the same data the
  // Selected Work section uses so the hero stays truthful as projects change.
  const specimen = useMemo(
    () =>
      projects.slice(0, 5).map((p, i) => ({
        num: String(i + 1).padStart(3, '0'),
        name: p.title[locale],
        status: p.status,
      })),
    [locale],
  )

  return (
    <section ref={ref} id="hero" className="relative overflow-hidden bg-paper">
      <Container className="relative pt-32 sm:pt-40 lg:pt-48">
        {/* Eyebrow row */}
        <motion.div
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mono-ltr flex items-center justify-between gap-4 border-b border-ink/20 pb-4 text-[11px] font-medium uppercase tracking-[0.22em] text-ink-soft"
        >
          <span>
            / {t('hero.eyebrowLeft', 'Freelance · Full-stack')}
          </span>
          <span className="hidden sm:inline">
            {t('hero.eyebrowRight', 'Ashdod, IL')} — {fullYear}
          </span>
        </motion.div>

        <div className="grid gap-x-10 gap-y-12 pt-10 lg:grid-cols-12 lg:pt-16">
          {/* Type mass */}
          <div className="relative lg:col-span-7">
            <motion.h1
              style={{ y: nameY, opacity: nameOpacity }}
              className="font-display text-[clamp(4rem,15vw,12rem)] font-medium leading-[0.84] tracking-tightest"
            >
              {nameWords.map((w, i) => (
                <motion.span
                  key={`${w}-${i}`}
                  initial={reduced ? false : { x: locale === 'he' ? 80 : -80, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.9, delay: 0.15 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="block"
                >
                  {w}
                  {i === nameWords.length - 1 && (
                    <span className="text-signal">.</span>
                  )}
                </motion.span>
              ))}
            </motion.h1>

            <motion.div
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-10"
            >
              <motion.div
                initial={reduced ? false : { scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.9, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="h-px w-full origin-left bg-ink rtl:origin-right"
              />
              <p className="mt-5 max-w-xl text-xl font-medium leading-snug text-ink sm:text-2xl">
                {t('hero.role')}
              </p>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
                {t('hero.sub')}
              </p>
            </motion.div>

            <motion.div
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-4"
            >
              <TextLink href="#contact" tone="signal" size="lg">
                {t('hero.ctaPrimary')}
              </TextLink>
              <TextLink href="#projects" tone="ink" size="lg">
                {t('hero.ctaSecondary')}
              </TextLink>
            </motion.div>
          </div>

          {/* Studio cover — typographic specimen replaces the website screenshot */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto w-full max-w-md lg:col-span-5 lg:mx-0 lg:max-w-none"
          >
            <StudioCover
              specimen={specimen}
              reduced={reduced}
              fullYear={fullYear}
              shortYear={shortYear}
            />
          </motion.div>
        </div>
      </Container>

      {/* Kinetic marquee — full bleed, sits on a hairline above and below */}
      <motion.div
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="mt-20 border-y border-ink/20 py-5 sm:mt-28"
      >
        <Marquee
          items={marqueeItems.map((item, i) => (
            <span
              key={i}
              className="mono-ltr text-[clamp(1.25rem,3vw,2.5rem)] font-medium uppercase tracking-[0.04em] text-ink"
            >
              {item}
            </span>
          ))}
          separator={
            <span className="text-signal text-[clamp(1.25rem,3vw,2.5rem)]">
              ✱
            </span>
          }
        />
      </motion.div>
    </section>
  )
}

interface SpecimenItem {
  num: string
  name: string
  status: ProjectStatus
}

const STATUS_LABEL: Record<ProjectStatus, string> = {
  live: 'Live ↗',
  'in-dev': 'In dev',
  repo: 'Repo',
  private: 'Private',
}

function StudioCover({
  specimen,
  reduced,
  fullYear,
  shortYear,
}: {
  specimen: SpecimenItem[]
  reduced: boolean
  fullYear: number
  shortYear: string
}) {
  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden border border-ink/20 bg-ink text-paper">
      {/* Faint hairline grid — the working surface */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(var(--paper) 1px, transparent 1px), linear-gradient(90deg, var(--paper) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Signal corner-marker — a small accent square that anchors the eye */}
      <div
        aria-hidden="true"
        className="absolute end-0 top-0 h-10 w-10 bg-signal"
      />

      <div className="relative flex h-full flex-col justify-between p-6 sm:p-7">
        {/* Top — masthead */}
        <div>
          <div className="mono-ltr flex items-center justify-between text-[10px] font-medium uppercase tracking-[0.22em] text-paper/55">
            <span>/ Studio · Bureau</span>
            <span className="text-ink">·</span>
          </div>
          <div className="mt-5 flex items-baseline gap-3">
            <span className="font-display text-[clamp(3.5rem,11vw,6.5rem)] font-medium leading-[0.85] tracking-tightest text-paper">
              Issue
            </span>
            <span className="font-display text-[clamp(3.5rem,11vw,6.5rem)] font-medium leading-[0.85] tracking-tightest text-signal">
              /{shortYear}
            </span>
          </div>
          <div className="mono-ltr mt-2 text-[10px] font-medium uppercase tracking-[0.22em] text-paper/45">
            A working catalog · {fullYear}
          </div>
        </div>

        {/* Middle — emphasis rule */}
        <div aria-hidden="true" className="my-3 flex items-center gap-3">
          <span className="h-px flex-1 bg-paper/25" />
          <span className="mono-ltr text-[10px] uppercase tracking-[0.22em] text-paper/45">
            005 ·
          </span>
        </div>

        {/* Bottom — specimen list of recent work */}
        <ul role="list" className="flex flex-col">
          {specimen.map((item) => (
            <li
              key={item.num}
              className="mono-ltr flex items-baseline justify-between gap-3 border-t border-paper/15 py-[7px] text-[10px] font-medium uppercase tracking-[0.18em] last:border-b last:border-paper/15"
            >
              <span className="w-9 shrink-0 text-paper/40">/{item.num}</span>
              <span className="flex-1 truncate text-paper">{item.name}</span>
              <span
                className={
                  item.status === 'live'
                    ? 'text-signal'
                    : item.status === 'in-dev'
                      ? 'text-paper/70'
                      : 'text-paper/40'
                }
              >
                {STATUS_LABEL[item.status]}
              </span>
            </li>
          ))}
        </ul>

        {/* Bottom corner — availability pulse */}
        <div className="mt-3 flex items-center justify-between">
          <span className="mono-ltr text-[10px] font-medium uppercase tracking-[0.22em] text-paper/45">
            Status
          </span>
          <span className="mono-ltr flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.22em] text-signal">
            <motion.span
              aria-hidden="true"
              className="inline-block h-1.5 w-1.5 bg-signal"
              animate={reduced ? undefined : { opacity: [1, 0.35, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
            Available
          </span>
        </div>
      </div>
    </div>
  )
}
