import { Github, X } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'

interface GithubNoticeModalProps {
  isOpen: boolean
  onClose: () => void
  onActionClick?: () => void
  actionLabel?: string
}

export function GithubNoticeModal({
  isOpen,
  onClose,
  onActionClick,
  actionLabel,
}: GithubNoticeModalProps) {
  const { t } = useLanguage()

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="github-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl border border-border/80 bg-card p-6 shadow-xl space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <Github className="h-6 w-6 text-foreground shrink-0" strokeWidth={1.5} />
            <div>
              <h3 id="github-modal-title" className="font-display text-base font-bold text-foreground">
                {t('Repositori Open Source Cuan v1.0')}
              </h3>
              <div className="inline-flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-400 font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                <span>{t('Tahap Kurasi Final Rilis Publik (Apache-2.0)')}</span>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
            aria-label={t('Tutup')}
          >
            <X className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed">
          {t('Repositori publik Cuan sedang disiapkan dan dirapikan untuk rilis open source resmi. Masukkan email Anda di Waiting List untuk mendapatkan notifikasi rilis pertama dan akses repositori prioritas.')}
        </p>

        <div className="rounded-xl border border-border/60 bg-muted/20 p-3 text-xs text-muted-foreground flex items-center justify-between">
          <span>{t('Lisensi Terbuka:')}</span>
          <span className="font-mono font-semibold text-foreground">Apache License 2.0</span>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-2">
          {onActionClick && (
            <button
              type="button"
              onClick={onActionClick}
              className="action-primary flex-1 min-h-11 px-4 text-sm font-semibold justify-center cursor-pointer"
            >
              {actionLabel || t('Daftar Waiting List Sekarang')}
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="action-secondary min-h-11 px-4 text-sm font-semibold justify-center cursor-pointer"
          >
            {t('Tutup')}
          </button>
        </div>
      </div>
    </div>
  )
}
