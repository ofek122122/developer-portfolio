import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { TFunction } from 'i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { NumberedSection } from '@/components/shared/NumberedSection'
import { AnimatedReveal } from '@/components/shared/AnimatedReveal'
import { projects } from '@/data/projects'
import { cn } from '@/lib/utils'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import type { Locale, Project } from '@/types'

type FilterKey = 'all' | 'landingPage' | 'website' | 'webApp' | 'system'

const FILTER_MATCHERS: Record<Exclude<FilterKey, 'all'>, string[]> = {
  landingPage: ['Landing Page'],
  website: ['Website', 'Multi-page'],
  webApp: ['Web App', 'Next.js', 'React'],
  system: ['System', 'CRM', 'Fastify'],
}

const FILTER_KEYS: FilterKey[] = ['all', 'landingPage', 'website', 'webApp', 'system']

// Deterministic placeholder gradients per project, matching paper palette
const PLACEHOLDER_TINTS = [
  ['#FF4D1A', '#0B0B0C'],
  ['#1B3CFF', '#F4F1EA'],
  ['#0B0B0C', '#FF4D1A'],
  ['#F4F1EA', '#1B3CFF'],
  ['#FF4D1A', '#1B3CFF'],
]
function tintFor(id: string): [string, string] {
  let hash = 0
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) | 0
  const t = PLACEHOLDER_TINTS[Math.abs(hash) % PLACEHOLDER_TINTS.length]
  return [t[0], t[1]]
}

export function Projects() {
  const { t, i18n } = useTranslation()
  const locale: Locale = i18n.language.startsWith('he') ? 'he' : 'en'
  const reduced = useReducedMotion()
  const [filter, setFilter] = useState<FilterKey>('all')
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const filtered = useMemo(() => {
    if (filter === 'all') return projects
    const matchers = FILTER_MATCHERS[filter]
    return projects.filter(
      (p) =>
        p.tags.some((tag) => matchers.includes(tag)) ||
        matchers.some((m) => p.category.en.includes(m)),
    )
  }, [filter])

  const previewProject = useMemo(
    () => filtered.find((p) => p.id === hoveredId) ?? null,
    [filtered, hoveredId],
  )

  return (
    <NumberedSection
      id="projects"
      number="02"
      label={t('index.work', 'Selected work')}
      title={t('projects.title')}
      intro={t('projects.subtitle')}
    >
      {/* Filter row — mono text buttons */}
      <AnimatedReveal>
        <div className="mono-ltr -mx-1 flex flex-wrap items-center gap-x-1 gap-y-2 border-b border-ink/15 pb-6 text-[11px] font-medium uppercase tracking-[0.2em]">
          {FILTER_KEYS.map((k, i) => {
            const active = filter === k
            return (
              <button
                key={k}
                type="button"
                onClick={() => setFilter(k)}
                aria-pressed={active}
                className={cn(
                  'px-3 py-1.5 transition-colors',
                  'focus-visible:outline-none focus-visible:[outline:2px_solid_var(--signal)] focus-visible:outline-offset-2',
                  active ? 'bg-ink text-paper' : 'text-ink-soft hover:text-ink',
                )}
              >
                {String(i).padStart(2, '0')} {t(`projects.filter.${k}`)}
              </button>
            )
          })}
        </div>
      </AnimatedReveal>

      {/* Table of works */}
      <div className="relative">
        <ul role="list" className="divide-y divide-ink/15 border-b border-ink/30">
          {filtered.map((p, i) => (
            <WorkRow
              key={p.id}
              project={p}
              locale={locale}
              index={i + 1}
              t={t}
              onHover={setHoveredId}
            />
          ))}
        </ul>

        {/* Desktop hover preview — sticky to the section, fades in on hover.
            Hidden on touch / non-hover-capable devices; mobile uses the inline
            thumbnail rendered inside each WorkRow instead. */}
        <div className="pointer-events-none absolute inset-y-0 end-0 hidden w-[clamp(280px,32vw,460px)] lg:[@media(hover:hover)]:block">
          <div className="sticky top-32 -mt-4 pe-4 pt-4">
            <AnimatePresence mode="wait">
              {previewProject && (
                <motion.div
                  key={previewProject.id}
                  initial={reduced ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="border border-ink/20 bg-paper-deep"
                >
                  <Preview project={previewProject} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </NumberedSection>
  )
}

interface WorkRowProps {
  project: Project
  locale: Locale
  index: number
  t: TFunction
  onHover: (id: string | null) => void
}

function WorkRow({ project: p, locale, index, t, onHover }: WorkRowProps) {
  const href = p.liveUrl ?? p.repoUrl
  const hasLink = !!href
  const Tag = (hasLink ? 'a' : 'div') as 'a'

  return (
    <li>
      <Tag
        {...(hasLink
          ? { href, target: '_blank', rel: 'noreferrer noopener' }
          : {})}
        onMouseEnter={() => onHover(p.id)}
        onMouseLeave={() => onHover(null)}
        onFocus={() => onHover(p.id)}
        onBlur={() => onHover(null)}
        className={cn(
          'group block transition-colors duration-200',
          hasLink && 'cursor-pointer',
        )}
      >
        <div className="grid grid-cols-12 items-start gap-x-4 gap-y-3 py-6 sm:py-8 lg:py-10">
          {/* Index */}
          <div className="col-span-2 sm:col-span-1">
            <span className="mono-ltr text-[11px] font-medium uppercase tracking-[0.2em] text-ink-soft">
              0{index}
            </span>
          </div>

          {/* Mobile thumbnail — always visible on touch / small screens.
              Hidden once we have a hover-capable desktop with the floating
              preview to the right. */}
          <div
            className={cn(
              'col-span-3 sm:col-span-2 lg:hidden',
              '[@media(hover:hover)]:lg:hidden',
            )}
          >
            <Thumbnail project={p} />
          </div>

          {/* Title + category */}
          <div className="col-span-7 sm:col-span-6 lg:col-span-6">
            <h3 className="font-display text-2xl font-medium leading-[0.95] tracking-tight text-ink transition-colors group-hover:text-signal sm:text-3xl md:text-4xl lg:text-5xl">
              {p.title[locale]}
            </h3>
            <p className="mono-ltr mt-2 text-[11px] font-medium uppercase tracking-[0.2em] text-ink-soft">
              {p.category[locale]}
              {(() => {
                // Drop tags that are already embedded in the category string so
                // it doesn't read "LANDING PAGE / EVENTS · LANDING PAGE / REACT".
                const cat = p.category.en.toLowerCase()
                const extra = p.tags.filter(
                  (tag) => !cat.includes(tag.toLowerCase()),
                )
                if (extra.length === 0) return null
                return (
                  <>
                    <span className="mx-2 text-ink/30">·</span>
                    <span>{extra.join(' / ')}</span>
                  </>
                )
              })()}
            </p>
          </div>

          {/* Year */}
          <div className="col-span-3 sm:col-span-1 lg:col-span-2">
            <span className="mono-ltr text-[11px] font-medium uppercase tracking-[0.2em] text-ink-soft">
              {p.year}
            </span>
          </div>

          {/* Action */}
          <div className="col-span-12 flex items-baseline justify-end gap-2 sm:col-span-2 lg:col-span-3">
            {hasLink ? (
              <span className="mono-ltr inline-flex items-baseline gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-ink transition-colors group-hover:text-signal">
                <span className="link-rule">
                  {p.liveUrl ? t('projects.live') : t('projects.repo')}
                </span>
                <ArrowUpRight className="h-3.5 w-3.5 translate-y-[1px] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100" />
              </span>
            ) : (
              <span className="mono-ltr text-[11px] font-medium uppercase tracking-[0.2em] text-ink-soft">
                {t('projects.private')}
              </span>
            )}
          </div>
        </div>
      </Tag>
    </li>
  )
}

function Thumbnail({ project: p }: { project: Project }) {
  const [ok, setOk] = useState(true)
  const [tintA, tintB] = tintFor(p.id)
  return (
    <div className="aspect-[4/3] w-full overflow-hidden border border-ink/15 bg-paper-deep">
      {ok ? (
        <img
          src={p.image}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover"
          onError={() => setOk(false)}
        />
      ) : (
        <div
          className="flex h-full w-full items-end p-2"
          style={{
            background: `linear-gradient(135deg, ${tintA} 0%, ${tintB} 100%)`,
          }}
        >
          <span className="mono-ltr text-[9px] font-medium uppercase tracking-[0.18em] text-paper mix-blend-difference">
            {p.id}
          </span>
        </div>
      )}
    </div>
  )
}

function Preview({ project: p }: { project: Project }) {
  const [ok, setOk] = useState(true)
  const [tintA, tintB] = tintFor(p.id)
  return (
    <div className="flex flex-col">
      <div className="aspect-[4/3] w-full overflow-hidden bg-ink">
        {ok ? (
          <img
            src={p.image}
            alt=""
            className="h-full w-full object-cover"
            onError={() => setOk(false)}
          />
        ) : (
          <div
            className="flex h-full w-full items-end p-5"
            style={{
              background: `linear-gradient(135deg, ${tintA} 0%, ${tintB} 100%)`,
            }}
          >
            <span className="font-display text-4xl font-medium text-paper mix-blend-difference">
              {p.id}
            </span>
          </div>
        )}
      </div>
      <div className="mono-ltr flex items-baseline justify-between gap-3 border-t border-ink/15 px-4 py-3">
        <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-ink">
          {p.year}
        </span>
        <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-ink-soft">
          {p.tags.join(' / ')}
        </span>
      </div>
    </div>
  )
}
