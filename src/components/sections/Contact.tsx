import { useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { ArrowUpRight, Loader2 } from 'lucide-react'
import { NumberedSection } from '@/components/shared/NumberedSection'
import { AnimatedReveal } from '@/components/shared/AnimatedReveal'
import { BlockButton } from '@/components/shared/BlockButton'
import { cn } from '@/lib/utils'

type FieldErrors = Partial<Record<'name' | 'email' | 'message', string>>
type Status = 'idle' | 'submitting' | 'success' | 'error'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const CHANNELS = [
  {
    labelKey: 'contact.channels.email',
    fallback: 'Email',
    href: 'mailto:ofek.karavani1@gmail.com',
    display: 'ofek.karavani1@gmail.com',
  },
  {
    labelKey: 'contact.channels.phone',
    fallback: 'WhatsApp',
    href: 'https://wa.me/972525612414',
    display: '052-561-2414',
  },
  {
    labelKey: 'contact.channels.xplace',
    fallback: 'Xplace',
    href: 'https://www.xplace.com/u/ofekkaravani1',
    display: 'Top 1% · Certified',
  },
  {
    labelKey: 'contact.channels.location',
    fallback: 'Location',
    href: undefined as string | undefined,
    displayKey: 'contact.channels.locationValue',
  },
]

export function Contact() {
  const { t } = useTranslation()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<Status>('idle')

  const validate = (): FieldErrors => {
    const e: FieldErrors = {}
    if (!name.trim()) e.name = t('contact.form.validation.nameRequired')
    if (!email.trim()) e.email = t('contact.form.validation.emailRequired')
    else if (!EMAIL_RE.test(email))
      e.email = t('contact.form.validation.emailInvalid')
    if (!message.trim()) e.message = t('contact.form.validation.messageRequired')
    return e
  }

  const onSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length > 0) return

    setStatus('submitting')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setStatus('success')
      setName('')
      setEmail('')
      setMessage('')
    } catch {
      setStatus('error')
    }
  }

  // Underline-only input style — no rounded boxes
  const fieldClass =
    'w-full border-0 border-b border-paper/40 bg-transparent px-0 py-3 text-base font-medium text-paper placeholder:text-paper/40 ' +
    'focus:border-signal focus:outline-none focus:ring-0 transition-colors'

  return (
    <NumberedSection
      id="contact"
      number="05"
      label={t('index.contact', 'Contact')}
      tone="cobalt"
      title={
        <>
          <span>{t('contact.headline', 'Let’s talk.')}</span>
          <span className="text-signal">{t('contact.headlinePunct', ' →')}</span>
        </>
      }
      intro={t('contact.subtitle')}
    >
      <div className="grid gap-x-10 gap-y-14 md:grid-cols-12">
        {/* Form */}
        <div className="md:col-span-7">
          <form onSubmit={onSubmit} noValidate className="flex flex-col gap-8">
            <Field
              id="contact-name"
              label={t('contact.form.name')}
              placeholder={t('contact.form.namePlaceholder')}
              value={name}
              onChange={setName}
              error={errors.name}
              autoComplete="name"
              disabled={status === 'submitting'}
              fieldClass={fieldClass}
            />
            <Field
              id="contact-email"
              label={t('contact.form.email')}
              type="email"
              placeholder={t('contact.form.emailPlaceholder')}
              value={email}
              onChange={setEmail}
              error={errors.email}
              autoComplete="email"
              disabled={status === 'submitting'}
              fieldClass={fieldClass}
            />

            <div className="flex flex-col gap-2">
              <label
                htmlFor="contact-message"
                className="mono-ltr text-[11px] font-medium uppercase tracking-[0.22em] text-paper/70"
              >
                / {t('contact.form.message')}
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t('contact.form.messagePlaceholder')}
                disabled={status === 'submitting'}
                aria-invalid={!!errors.message}
                className={cn(
                  fieldClass,
                  'resize-y leading-relaxed',
                  errors.message && 'border-signal',
                )}
              />
              {errors.message && (
                <span className="mono-ltr text-[11px] uppercase tracking-[0.18em] text-signal">
                  {errors.message}
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-2">
              <BlockButton
                type="submit"
                variant="signal"
                disabled={status === 'submitting'}
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {t('contact.form.sending')}
                  </>
                ) : (
                  <>
                    {t('contact.form.submit')}
                    <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" />
                  </>
                )}
              </BlockButton>

              {status === 'success' && (
                <span className="mono-ltr text-[11px] font-medium uppercase tracking-[0.2em] text-signal">
                  ✱ {t('contact.form.success')}
                </span>
              )}
              {status === 'error' && (
                <span className="mono-ltr text-[11px] font-medium uppercase tracking-[0.2em] text-signal">
                  {t('contact.form.error')}
                </span>
              )}
            </div>
          </form>
        </div>

        {/* Channels — editorial key/value pairs in mono */}
        <div className="md:col-span-5 md:pt-2">
          <AnimatedReveal from="start" delay={0.1}>
            <div className="mono-ltr mb-6 text-[11px] font-medium uppercase tracking-[0.22em] text-paper/70">
              / {t('contact.channels.title')}
            </div>
            <ul role="list" className="divide-y divide-paper/20 border-y border-paper/40">
              {CHANNELS.map((c) => {
                const display =
                  'displayKey' in c && c.displayKey
                    ? t(c.displayKey)
                    : c.display
                const inner = (
                  <div className="flex items-baseline justify-between gap-4 py-4">
                    <span className="mono-ltr text-[11px] font-medium uppercase tracking-[0.2em] text-paper/60">
                      {t(c.labelKey, c.fallback)}
                    </span>
                    <span
                      dir="ltr"
                      className={cn(
                        'text-sm font-medium text-paper',
                        c.href && 'link-rule transition-colors group-hover:text-signal',
                      )}
                    >
                      {display}
                    </span>
                  </div>
                )
                return (
                  <li key={c.labelKey}>
                    {c.href ? (
                      <a
                        href={c.href}
                        target={c.href.startsWith('http') ? '_blank' : undefined}
                        rel={c.href.startsWith('http') ? 'noreferrer noopener' : undefined}
                        className="group block"
                      >
                        {inner}
                      </a>
                    ) : (
                      inner
                    )}
                  </li>
                )
              })}
            </ul>
          </AnimatedReveal>
        </div>
      </div>
    </NumberedSection>
  )
}

interface FieldProps {
  id: string
  label: string
  placeholder: string
  value: string
  onChange: (v: string) => void
  error?: string
  type?: string
  autoComplete?: string
  disabled?: boolean
  fieldClass: string
}

function Field({
  id,
  label,
  placeholder,
  value,
  onChange,
  error,
  type = 'text',
  autoComplete,
  disabled,
  fieldClass,
}: FieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="mono-ltr text-[11px] font-medium uppercase tracking-[0.22em] text-paper/70"
      >
        / {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        aria-invalid={!!error}
        className={cn(fieldClass, error && 'border-signal')}
      />
      {error && (
        <span className="mono-ltr text-[11px] uppercase tracking-[0.18em] text-signal">
          {error}
        </span>
      )}
    </div>
  )
}
