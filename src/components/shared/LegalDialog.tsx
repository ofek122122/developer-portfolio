import { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { useTranslation } from 'react-i18next'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

type LegalKind = 'privacy' | 'accessibility'

interface LegalDialogProps {
  kind: LegalKind
  /** Optional tone for the trigger button. Defaults to ink. */
  tone?: 'ink' | 'paper' | 'muted'
  className?: string
}

export function LegalDialog({ kind, tone = 'ink', className }: LegalDialogProps) {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)

  const triggerLabel =
    kind === 'privacy' ? t('legal.privacy.trigger') : t('legal.accessibility.trigger')

  const triggerTone =
    tone === 'paper'
      ? 'text-paper/70 hover:text-paper'
      : tone === 'muted'
        ? 'text-ink-soft hover:text-ink'
        : 'text-ink hover:text-signal'

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className={cn(
            'mono-ltr text-[11px] font-medium uppercase tracking-[0.18em] transition-colors',
            'focus-visible:outline-none focus-visible:[outline:2px_solid_var(--signal)] focus-visible:outline-offset-2',
            triggerTone,
            className,
          )}
        >
          <span className="link-rule">{triggerLabel}</span>
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay
          className={cn(
            'fixed inset-0 z-50 bg-ink/70 backdrop-blur-sm',
            'data-[state=open]:animate-in data-[state=open]:fade-in-0',
            'data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
          )}
        />
        <Dialog.Content
          aria-describedby={undefined}
          className={cn(
            'fixed inset-x-0 bottom-0 top-0 z-50 flex flex-col bg-paper text-ink',
            'sm:inset-x-6 sm:inset-y-10 sm:max-h-[calc(100dvh-5rem)] sm:max-w-3xl sm:mx-auto sm:border sm:border-ink/30',
            'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-bottom-4',
            'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-bottom-4',
          )}
        >
          {/* Header */}
          <div className="flex shrink-0 items-center justify-between gap-4 border-b border-ink/15 px-6 py-4 sm:px-10">
            <Dialog.Title asChild>
              <h2 className="mono-ltr text-[11px] font-medium uppercase tracking-[0.22em] text-ink-soft">
                /{' '}
                {kind === 'privacy'
                  ? t('legal.privacy.title')
                  : t('legal.accessibility.title')}
              </h2>
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                type="button"
                aria-label={t('legal.close')}
                className="inline-flex h-9 w-9 items-center justify-center text-ink transition-colors hover:text-signal focus-visible:outline-none focus-visible:[outline:2px_solid_var(--signal)] focus-visible:outline-offset-2"
              >
                <X className="h-5 w-5" />
              </button>
            </Dialog.Close>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-6 py-10 sm:px-10">
            {kind === 'privacy' ? <PrivacyBody /> : <AccessibilityBody />}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

function SectionBlock({
  label,
  title,
  children,
}: {
  label: string
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="grid gap-x-8 gap-y-3 border-t border-ink/15 py-6 sm:grid-cols-12">
      <div className="sm:col-span-3">
        <div className="mono-ltr text-[10px] font-medium uppercase tracking-[0.22em] text-ink-soft">
          / {label}
        </div>
      </div>
      <div className="sm:col-span-9">
        <h3 className="mb-3 font-display text-2xl font-medium tracking-tight text-ink sm:text-3xl">
          {title}
        </h3>
        {children}
      </div>
    </div>
  )
}

function PrivacyBody() {
  const { t } = useTranslation()
  const collectItems = t('legal.privacy.collectItems', { returnObjects: true }) as string[]
  const noItems = t('legal.privacy.noItems', { returnObjects: true }) as string[]
  const thirdPartyItems = t('legal.privacy.thirdPartyItems', {
    returnObjects: true,
  }) as string[]

  return (
    <article className="mx-auto max-w-2xl">
      <h1 className="font-display text-[clamp(2.25rem,5vw,3.5rem)] font-medium leading-[1.05] tracking-tight text-ink">
        {t('legal.privacy.title')}
        <span className="text-signal">.</span>
      </h1>
      <p className="mt-6 text-base leading-relaxed text-ink-soft sm:text-lg">
        {t('legal.privacy.intro')}
      </p>

      <div className="mt-12 border-b border-ink/15">
        <SectionBlock label="01" title={t('legal.privacy.collectTitle')}>
          <BulletList items={collectItems} />
        </SectionBlock>
        <SectionBlock label="02" title={t('legal.privacy.noTitle')}>
          <BulletList items={noItems} />
        </SectionBlock>
        <SectionBlock label="03" title={t('legal.privacy.thirdPartyTitle')}>
          <BulletList items={thirdPartyItems} />
        </SectionBlock>
        <SectionBlock label="04" title={t('legal.privacy.rightsTitle')}>
          <p className="text-base leading-relaxed text-ink">
            {t('legal.privacy.rightsBody')}
          </p>
        </SectionBlock>
      </div>

      <p className="mono-ltr mt-10 text-[10px] font-medium uppercase tracking-[0.22em] text-ink-soft">
        / {t('legal.updated')}
      </p>
    </article>
  )
}

function AccessibilityBody() {
  const { t } = useTranslation()
  const features = t('legal.accessibility.featuresItems', { returnObjects: true }) as string[]

  return (
    <article className="mx-auto max-w-2xl">
      <h1 className="font-display text-[clamp(2.25rem,5vw,3.5rem)] font-medium leading-[1.05] tracking-tight text-ink">
        {t('legal.accessibility.title')}
        <span className="text-signal">.</span>
      </h1>
      <p className="mt-6 text-base leading-relaxed text-ink-soft sm:text-lg">
        {t('legal.accessibility.intro')}
      </p>

      <div className="mt-12 border-b border-ink/15">
        <SectionBlock label="01" title={t('legal.accessibility.featuresTitle')}>
          <BulletList items={features} />
        </SectionBlock>
        <SectionBlock label="02" title={t('legal.accessibility.knownTitle')}>
          <p className="text-base leading-relaxed text-ink">
            {t('legal.accessibility.knownBody')}
          </p>
        </SectionBlock>
        <SectionBlock label="03" title={t('legal.accessibility.reportTitle')}>
          <p className="text-base leading-relaxed text-ink">
            {t('legal.accessibility.reportBody')}
          </p>
        </SectionBlock>
        <SectionBlock label="04" title={t('legal.accessibility.coordinatorTitle')}>
          <p className="mono-ltr text-sm font-medium uppercase tracking-[0.18em] text-ink">
            {t('legal.accessibility.coordinatorBody')}
          </p>
        </SectionBlock>
      </div>

      <p className="mono-ltr mt-10 text-[10px] font-medium uppercase tracking-[0.22em] text-ink-soft">
        / {t('legal.updated')}
      </p>
    </article>
  )
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((item, i) => (
        <li
          key={i}
          className="flex items-baseline gap-3 text-base leading-relaxed text-ink"
        >
          <span className="mono-ltr shrink-0 text-[11px] font-medium tracking-wider text-signal">
            ▸
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}
