import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'

type Lang = 'he' | 'en'

const LANGS: { code: Lang; label: string; aria: string }[] = [
  { code: 'en', label: 'EN', aria: 'English' },
  { code: 'he', label: 'HE', aria: 'עברית' },
]

interface LanguageToggleProps {
  className?: string
  /** Tone of the toggle text — defaults to ink for paper sections. */
  tone?: 'ink' | 'paper'
}

export function LanguageToggle({ className, tone = 'ink' }: LanguageToggleProps) {
  const { i18n } = useTranslation()
  const current: Lang = i18n.language.startsWith('he') ? 'he' : 'en'

  return (
    <div
      role="group"
      aria-label="Language"
      className={cn(
        'mono-ltr inline-flex items-center gap-1 text-[11px] font-medium uppercase tracking-[0.2em]',
        className,
      )}
    >
      {LANGS.map(({ code, label, aria }, i) => {
        const isActive = current === code
        return (
          <span key={code} className="inline-flex items-center gap-1">
            {i > 0 && (
              <span
                aria-hidden="true"
                className={cn(
                  tone === 'ink' ? 'text-ink/30' : 'text-paper/40',
                )}
              >
                /
              </span>
            )}
            <button
              type="button"
              aria-label={aria}
              aria-pressed={isActive}
              onClick={() => void i18n.changeLanguage(code)}
              className={cn(
                'px-0.5 transition-colors duration-150',
                'focus-visible:outline-none focus-visible:[outline:2px_solid_var(--signal)] focus-visible:outline-offset-2',
                isActive
                  ? tone === 'ink'
                    ? 'text-ink'
                    : 'text-paper'
                  : tone === 'ink'
                    ? 'text-ink/40 hover:text-signal'
                    : 'text-paper/50 hover:text-signal',
              )}
            >
              {label}
            </button>
          </span>
        )
      })}
    </div>
  )
}
