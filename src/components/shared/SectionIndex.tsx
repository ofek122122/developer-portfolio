import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'

interface IndexEntry {
  id: string
  number: string
  labelKey: string
}

const ENTRIES: IndexEntry[] = [
  { id: 'hero', number: '00', labelKey: 'index.intro' },
  { id: 'about', number: '01', labelKey: 'index.studio' },
  { id: 'projects', number: '02', labelKey: 'index.work' },
  { id: 'services', number: '03', labelKey: 'index.practice' },
  { id: 'testimonials', number: '04', labelKey: 'index.words' },
  { id: 'contact', number: '05', labelKey: 'index.contact' },
]

export function SectionIndex() {
  const { t } = useTranslation()
  const [activeId, setActiveId] = useState<string>(ENTRIES[0].id)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const sections = ENTRIES.map((e) => document.getElementById(e.id)).filter(
      (el): el is HTMLElement => !!el,
    )
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        // pick the most intersecting one
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActiveId(visible[0].target.id)
      },
      { rootMargin: '-30% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const activeEntry = ENTRIES.find((e) => e.id === activeId) ?? ENTRIES[0]
  const activeIndex = ENTRIES.findIndex((e) => e.id === activeId)
  const progressLabel = `${String(activeIndex).padStart(2, '0')} / ${String(
    ENTRIES.length - 1,
  ).padStart(2, '0')}`

  // Hide while user is in the hero — provides no value at the top of the page
  // and physically overlaps hero CTAs at desktop sizes.
  if (activeId === 'hero') return null

  return (
    <div className="pointer-events-none fixed bottom-6 z-40 start-6 hidden lg:block">
      <div className="pointer-events-auto">
        <button
          type="button"
          aria-expanded={open}
          aria-label={t('index.label', 'Section index')}
          onClick={() => setOpen((v) => !v)}
          className="mono-ltr flex items-center gap-3 border border-ink/40 bg-paper/90 px-3 py-2 text-[11px] font-medium uppercase tracking-[0.18em] text-ink shadow-[0_2px_0_0_var(--ink)] backdrop-blur transition-colors hover:bg-signal hover:text-ink"
        >
          <span>{progressLabel}</span>
          <span className="h-3 w-px bg-ink/40" />
          <span className="lowercase tracking-[0.12em]">
            {t(activeEntry.labelKey)}
          </span>
        </button>

        {open && (
          <ul
            role="list"
            className="mono-ltr mt-3 flex w-72 flex-col border border-ink/40 bg-paper p-2 shadow-[0_2px_0_0_var(--ink)]"
          >
            {ENTRIES.map((e) => {
              const isActive = e.id === activeId
              return (
                <li key={e.id}>
                  <a
                    href={`#${e.id}`}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'flex items-baseline justify-between gap-4 px-3 py-2 text-xs uppercase tracking-[0.16em] transition-colors',
                      isActive
                        ? 'bg-signal text-ink'
                        : 'text-ink-soft hover:bg-ink/5 hover:text-ink',
                    )}
                  >
                    <span className="lowercase tracking-[0.12em]">
                      {t(e.labelKey)}
                    </span>
                    <span>{e.number}</span>
                  </a>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}
