import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Container } from '@/components/shared/Container'
import { LanguageToggle } from './LanguageToggle'

const NAV_KEYS = ['about', 'projects', 'services', 'testimonials', 'contact'] as const

export function Header() {
  const { t } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = original
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-200',
        scrolled || open
          ? 'border-b border-ink/15 bg-paper'
          : 'border-b border-transparent bg-paper/0',
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-6 sm:h-20">
        <a
          href="#hero"
          aria-label={t('nav.logoAlt')}
          className="group flex items-baseline gap-3"
        >
          <span className="mono-ltr text-base font-medium tracking-tight text-ink">
            OK
          </span>
          <span className="hidden text-sm font-medium tracking-tight text-ink-soft transition-colors group-hover:text-ink sm:inline">
            Ofek Karavani
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {NAV_KEYS.map((k, i) => (
            <a
              key={k}
              href={`#${k}`}
              className="group flex items-baseline gap-2 text-sm font-medium text-ink-soft transition-colors hover:text-ink"
            >
              <span
                aria-hidden="true"
                className="mono-ltr text-[10px] font-medium tracking-[0.18em] text-ink/30 transition-colors group-hover:text-signal"
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <span>{t(`nav.links.${k}`)}</span>
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-5 sm:gap-6">
          <LanguageToggle />
          <button
            type="button"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center text-ink transition-colors hover:text-signal md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </Container>

      {open && (
        <div className="border-t border-ink/15 bg-paper md:hidden">
          <Container className="flex flex-col gap-1 py-6">
            {NAV_KEYS.map((k, i) => (
              <a
                key={k}
                href={`#${k}`}
                onClick={close}
                className="flex items-baseline justify-between gap-4 border-b border-rule px-2 py-4 text-lg font-medium text-ink transition-colors last:border-b-0 hover:text-signal"
              >
                <span>{t(`nav.links.${k}`)}</span>
                <span className="mono-ltr text-[11px] font-medium tracking-[0.18em] text-ink-soft">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </a>
            ))}
          </Container>
        </div>
      )}
    </header>
  )
}
