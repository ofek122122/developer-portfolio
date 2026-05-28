import { useTranslation } from 'react-i18next'
import { NumberedSection } from '@/components/shared/NumberedSection'
import { AnimatedReveal } from '@/components/shared/AnimatedReveal'

const STACK = [
  'TypeScript',
  'React',
  'Next.js',
  'Vite',
  'Node.js',
  'Fastify',
  'Tailwind',
  'shadcn/ui',
  'Framer Motion',
  'PostgreSQL',
  'Prisma',
  'Supabase',
]

const META: { labelKey: string; fallback: string; value: string; mono?: boolean }[] = [
  { labelKey: 'about.meta.based', fallback: 'Based', value: 'Ashdod, IL', mono: true },
  { labelKey: 'about.meta.speaks', fallback: 'Speaks', value: 'Hebrew · English', mono: false },
  { labelKey: 'about.meta.years', fallback: 'In practice', value: '3+ years', mono: true },
  { labelKey: 'about.meta.shipped', fallback: 'Shipped', value: '15+ projects', mono: true },
  { labelKey: 'about.meta.openTo', fallback: 'Open to', value: 'Most things', mono: false },
  { labelKey: 'about.meta.certified', fallback: 'Certified', value: 'Top 1% Xplace', mono: true },
]

export function About() {
  const { t } = useTranslation()

  return (
    <NumberedSection
      id="about"
      number="01"
      label={t('index.studio', 'Studio')}
      title={
        <>
          <span>{t('about.headline', 'A small studio of one.')}</span>{' '}
          <span className="text-ink-soft">{t('about.headlineTail', 'Building since 2021.')}</span>
        </>
      }
    >
      <div className="grid gap-x-10 gap-y-12 md:grid-cols-12">
        {/* Bio paragraphs */}
        <div className="md:col-span-7">
          <AnimatedReveal className="flex flex-col gap-6">
            <p className="text-lg leading-relaxed text-ink sm:text-xl">
              {t('about.bio1')}
            </p>
            <p className="text-base leading-relaxed text-ink-soft sm:text-lg">
              {t('about.bio2')}
            </p>
          </AnimatedReveal>
        </div>

        {/* Mono meta — editorial key/value pairs */}
        <div className="md:col-span-5 md:pt-3">
          <AnimatedReveal from="start" delay={0.15}>
            <dl className="mono-ltr divide-y divide-ink/15 border-y border-ink/30">
              {META.map((m) => (
                <div
                  key={m.labelKey}
                  className="flex items-baseline justify-between gap-4 py-3"
                >
                  <dt className="text-[11px] font-medium uppercase tracking-[0.2em] text-ink-soft">
                    / {t(m.labelKey, m.fallback)}
                  </dt>
                  <dd
                    className={
                      m.mono
                        ? 'mono-ltr text-sm font-medium text-ink'
                        : 'font-sans text-sm font-medium text-ink'
                    }
                  >
                    {m.value}
                  </dd>
                </div>
              ))}
            </dl>
          </AnimatedReveal>
        </div>
      </div>

      {/* Stack — flowing label set, NOT a chip grid */}
      <div className="mt-20 sm:mt-28">
        <AnimatedReveal>
          <div className="mono-ltr mb-6 text-[11px] font-medium uppercase tracking-[0.2em] text-ink-soft">
            / {t('about.techTitle')}
          </div>
        </AnimatedReveal>
        <AnimatedReveal delay={0.1}>
          <p className="font-display text-[clamp(1.75rem,4.5vw,3.5rem)] font-medium leading-[1.05] tracking-tight text-ink">
            {STACK.map((tech, i) => (
              <span key={tech}>
                {i > 0 && (
                  <span className="text-signal">{' · '}</span>
                )}
                <span className="link-rule cursor-default transition-colors hover:text-signal">
                  {tech}
                </span>
              </span>
            ))}
          </p>
        </AnimatedReveal>
      </div>
    </NumberedSection>
  )
}
