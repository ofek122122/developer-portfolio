import { useTranslation } from 'react-i18next'
import { Container } from '@/components/shared/Container'
import { LegalDialog } from '@/components/shared/LegalDialog'
import { LanguageToggle } from './LanguageToggle'

const NAV_KEYS = ['about', 'projects', 'services', 'testimonials', 'contact'] as const

const CHANNELS = [
  { label: 'Email', href: 'mailto:ofek.karavani1@gmail.com', display: 'ofek.karavani1@gmail.com' },
  { label: 'WhatsApp', href: 'https://wa.me/972525612414', display: '052-561-2414' },
  { label: 'Xplace', href: 'https://www.xplace.com/u/ofekkaravani1', display: 'Top 1% · Certified' },
  { label: 'GitHub', href: 'https://github.com/ofek122122', display: '@ofek122122' },
]

export function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-ink/30 bg-paper">
      <Container className="grid gap-x-10 gap-y-14 py-20 md:grid-cols-12">
        {/* Wordmark */}
        <div className="md:col-span-5">
          <div className="flex items-baseline gap-3">
            <span className="mono-ltr text-sm font-medium tracking-tight text-ink">
              OK
            </span>
            <span className="font-display text-lg font-medium tracking-tight text-ink">
              Ofek Karavani
            </span>
          </div>
          <p className="mt-6 max-w-md text-base leading-relaxed text-ink-soft">
            {t('footer.tagline')}
          </p>
          <p className="mono-ltr mt-8 text-[11px] uppercase tracking-[0.18em] text-ink-soft">
            {t('contact.channels.locationValue')}
          </p>
        </div>

        {/* Nav */}
        <div className="md:col-span-3">
          <h3 className="mono-ltr text-[11px] font-medium uppercase tracking-[0.18em] text-ink-soft">
            / {t('footer.quickLinks')}
          </h3>
          <ul className="mt-6 flex flex-col gap-3">
            {NAV_KEYS.map((k, i) => (
              <li key={k}>
                <a
                  href={`#${k}`}
                  className="group flex items-baseline gap-3 text-sm font-medium text-ink transition-colors hover:text-signal"
                >
                  <span className="mono-ltr text-[10px] tracking-[0.18em] text-ink/30 group-hover:text-signal">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="link-rule">{t(`nav.links.${k}`)}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Channels */}
        <div className="md:col-span-4">
          <h3 className="mono-ltr text-[11px] font-medium uppercase tracking-[0.18em] text-ink-soft">
            / {t('contact.channels.title')}
          </h3>
          <ul className="mt-6 flex flex-col gap-3">
            {CHANNELS.map((c) => (
              <li key={c.label}>
                <a
                  href={c.href}
                  target={c.href.startsWith('http') ? '_blank' : undefined}
                  rel={c.href.startsWith('http') ? 'noreferrer noopener' : undefined}
                  dir="ltr"
                  className="group flex items-baseline justify-between gap-4 text-sm font-medium text-ink transition-colors hover:text-signal"
                >
                  <span className="mono-ltr text-[10px] uppercase tracking-[0.18em] text-ink-soft">
                    {c.label}
                  </span>
                  <span className="link-rule">{c.display}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <div className="border-t border-ink/15">
        <Container className="mono-ltr flex flex-col items-center justify-between gap-4 py-5 text-[11px] uppercase tracking-[0.18em] text-ink-soft sm:flex-row">
          <span>© {year} OFEK KARAVANI · {t('footer.copyright')}</span>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <LegalDialog kind="privacy" tone="muted" />
            <span aria-hidden="true" className="text-ink/25">/</span>
            <LegalDialog kind="accessibility" tone="muted" />
            <span aria-hidden="true" className="hidden text-ink/25 lg:inline">/</span>
            <span className="hidden lg:inline">{t('footer.builtBy')}</span>
            <LanguageToggle />
          </div>
        </Container>
      </div>
    </footer>
  )
}
