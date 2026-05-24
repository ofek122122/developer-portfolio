import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { Container } from '@/components/shared/Container'
import { TextLink } from '@/components/shared/TextLink'
import { Marquee } from '@/components/shared/Marquee'
import { projects } from '@/data/projects'
import type { Locale } from '@/types'

const NAME_LATIN = ['Ofek', 'Karavani']
const NAME_HEBREW = ['אופק', 'קרוואני']

export function Hero() {
  const { t, i18n } = useTranslation()
  const locale: Locale = i18n.language.startsWith('he') ? 'he' : 'en'
  const reduced = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const [imageOk, setImageOk] = useState(true)

  // Scroll-driven parallax for the masthead — slower than the page
  const { scrollY } = useScroll()
  const nameY = useTransform(scrollY, [0, 800], [0, reduced ? 0 : -120])
  const nameOpacity = useTransform(scrollY, [0, 600], [1, reduced ? 1 : 0.15])

  const nameWords = locale === 'he' ? NAME_HEBREW : NAME_LATIN

  // Marquee items — recent projects + year
  const marqueeItems = [
    `Selected work — ${new Date().getFullYear()}`,
    ...projects.map((p) => p.title[locale]),
    `Available · ${t('contact.channels.locationValue')}`,
  ]

  // Subtle mouse parallax on the image
  const imageRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (reduced || !imageRef.current) return
    const el = imageRef.current
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const dx = (e.clientX - (rect.left + rect.width / 2)) / rect.width
      const dy = (e.clientY - (rect.top + rect.height / 2)) / rect.height
      el.style.setProperty('--px', `${dx * 8}px`)
      el.style.setProperty('--py', `${dy * 8}px`)
    }
    const reset = () => {
      el.style.setProperty('--px', '0px')
      el.style.setProperty('--py', '0px')
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseleave', reset)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', reset)
    }
  }, [reduced])

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
            {t('hero.eyebrowRight', 'Ashdod, IL — 2024')}
          </span>
        </motion.div>

        <div className="grid gap-x-10 gap-y-12 pt-10 md:grid-cols-12 md:pt-16">
          {/* Type mass */}
          <div className="relative md:col-span-7">
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

          {/* Image well */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-5"
          >
            <div
              ref={imageRef}
              className="relative aspect-[4/5] w-full overflow-hidden border border-ink/20 bg-ink"
              style={{ ['--px' as string]: '0px', ['--py' as string]: '0px' }}
            >
              {imageOk ? (
                <img
                  src="/images/hero.jpg"
                  alt={t('hero.imageAlt', 'Selected work — Nest Rooftop')}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 ease-out"
                  style={{
                    transform: 'translate(var(--px), var(--py)) scale(1.04)',
                  }}
                  onError={() => setImageOk(false)}
                />
              ) : (
                <TypographicFallback />
              )}

              {/* Metadata overlay top */}
              <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
                <span className="mono-ltr bg-paper px-2 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-ink">
                  /001
                </span>
                <span className="mono-ltr bg-paper px-2 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-ink">
                  2024
                </span>
              </div>

              {/* Caption overlay bottom */}
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-4">
                <span className="mono-ltr bg-paper px-2 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-ink">
                  Nest Rooftop
                </span>
                <span className="mono-ltr bg-signal px-2 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-ink">
                  Live
                </span>
              </div>
            </div>
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

function TypographicFallback() {
  return (
    <div className="relative h-full w-full bg-ink text-paper">
      <div className="absolute inset-0 flex flex-col justify-between p-8">
        <div className="mono-ltr text-[10px] uppercase tracking-[0.22em] text-paper/60">
          Image well — replace with{' '}
          <code className="text-signal">/public/images/hero.jpg</code>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <span className="font-display text-[15rem] font-medium leading-none text-paper/90">
            OK
          </span>
        </div>
        <div className="mono-ltr flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-paper/60">
          <span>Recommended 1200 × 1500</span>
          <span className="text-signal">●</span>
        </div>
      </div>
    </div>
  )
}
