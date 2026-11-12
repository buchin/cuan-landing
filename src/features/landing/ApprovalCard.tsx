import { useLanguage } from '../../context/LanguageContext'
import { cn } from '../../lib/utils'
import {
  ClipboardCheck,
  CheckCircle2,
  Clock3,
  Folder,
  Play,
} from 'lucide-react'

export interface ApprovalPlan {
  title: string
  project_name?: string
  description?: string
}

export interface ApprovalCardProps {
  plan: ApprovalPlan
  accepted?: boolean
  deferred?: boolean
  disabled?: boolean
  onApprove?: () => void
  onChangePlan?: () => void
  onDefer?: () => void
  className?: string
}

export function FormattedTitle({ title }: { title: string }) {
  if (!title) return null
  const parts = title.split(/(`[^`]+`)/g)
  return (
    <h4 className="text-sm font-semibold tracking-tight text-foreground break-words leading-snug">
      {parts.map((part, index) => {
        if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
          return (
            <code
              key={index}
              className="mx-0.5 rounded px-1.5 py-0.5 font-mono text-[11px] sm:text-xs bg-muted border border-border/60 text-foreground font-normal break-all align-baseline"
            >
              {part.slice(1, -1)}
            </code>
          )
        }
        return <span key={index}>{part}</span>
      })}
    </h4>
  )
}

export function ApprovalCard({
  plan,
  accepted = false,
  deferred = false,
  disabled = false,
  onApprove,
  className,
}: ApprovalCardProps) {
  const { t } = useLanguage()

  // Simple bullet-point formatter for description
  const bulletPoints = (plan.description || '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => line.replace(/^-\s*/, ''))

  return (
    <div
      role="region"
      aria-label={`${t('Needs approval')}: ${plan.title}`}
      className={cn(
        'approval-card mt-3 rounded-xl border p-3.5 sm:p-4 space-y-3 shadow-none transition-all duration-200 min-w-0 max-w-full overflow-hidden border-border/60 bg-card/60 dark:bg-card/40 border-l-2 border-l-primary shadow-2xs',
        accepted && 'border-l-emerald-500 bg-emerald-500/5 dark:bg-emerald-500/10',
        className,
      )}
    >
      {/* Header Badge & Project Tag */}
      <div className="flex items-center justify-between gap-2 border-b border-border/40 pb-2">
        <div className="flex items-center gap-1.5 min-w-0">
          {accepted ? (
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
          ) : deferred ? (
            <Clock3 className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
          ) : (
            <ClipboardCheck className="h-3.5 w-3.5 text-primary shrink-0" />
          )}
          <span
            className={cn(
              'text-xs font-semibold truncate',
              accepted
                ? 'text-emerald-600 dark:text-emerald-400'
                : 'text-primary',
            )}
          >
            {t(accepted ? 'Rencana Disetujui' : deferred ? 'Saved for later' : 'Needs approval')}
          </span>
        </div>

        {plan.project_name && (
          <span
            className="inline-flex items-center gap-1 text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground shrink-0 max-w-[160px] truncate"
            title={plan.project_name}
          >
            <Folder className="h-2.5 w-2.5 opacity-70 shrink-0" />
            <span className="truncate">{plan.project_name}</span>
          </span>
        )}
      </div>

      {/* Plan Title */}
      <div className="approval-card-title">
        <FormattedTitle title={plan.title} />
      </div>

      {/* Plan Bullet Points */}
      {bulletPoints.length > 0 && (
        <div className="approval-card-description min-w-0 max-w-full text-foreground/90 text-xs sm:text-sm space-y-1.5">
          {bulletPoints.map((point, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <span className={cn('mt-0.5', accepted ? 'text-emerald-600 dark:text-emerald-400' : 'text-primary')}>•</span>
              <span>{point}</span>
            </div>
          ))}
        </div>
      )}

      {/* Action Buttons Mockup */}
      <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-border/30">
        <button
          type="button"
          disabled={disabled || accepted}
          onClick={onApprove}
          className={cn(
            'inline-flex min-h-8 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors',
            accepted
              ? 'bg-emerald-600 text-white cursor-default'
              : onApprove && !disabled
                ? 'bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer shadow-xs active:scale-95'
                : 'bg-primary text-primary-foreground opacity-90 cursor-default',
          )}
        >
          {accepted ? (
            <>
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>{t('Rencana Disetujui')}</span>
            </>
          ) : (
            <>
              <Play className="h-3 w-3 fill-current" />
              <span>{t('Setujui & Jalankan Rencana')}</span>
            </>
          )}
        </button>
      </div>
    </div>
  )
}
