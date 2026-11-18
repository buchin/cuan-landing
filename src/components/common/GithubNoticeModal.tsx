import { Link } from 'react-router-dom'
import { Github, X, ExternalLink, AlertTriangle, Star } from 'lucide-react'
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
        className="w-full max-w-lg rounded-2xl border border-border/80 bg-card p-6 shadow-xl space-y-4 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <Github className="h-6 w-6 text-foreground shrink-0" strokeWidth={1.5} />
            <div>
              <h3 id="github-modal-title" className="font-display text-base font-bold text-foreground">
                {t('Repositori Cuan Resmi Publik di GitHub')}
              </h3>
              <div className="inline-flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>{t('100 Sponsor Terpenuhi · Fase Public Alpha (v0.9.x)')}</span>
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

        {/* Stability Warning */}
        <div className="rounded-xl border border-amber-500/40 bg-amber-500/5 dark:bg-amber-500/10 p-3.5 space-y-1.5 text-xs">
          <div className="inline-flex items-center gap-1.5 font-semibold text-amber-800 dark:text-amber-300">
            <AlertTriangle className="h-4 w-4 shrink-0" />
            <span>{t('Status Kestabilan: Masih Belum Stabil (Developer Preview)')}</span>
          </div>
          <p className="text-foreground/80 leading-relaxed">
            {t(
              'Sesuai janji kami, kode Cuan dibuka setelah mencapai 100 sponsor. Namun perlu dipahami bahwa Cuan masih dalam pengembangan aktif dan belum stabil untuk operasional bisnis utama (production). Fitur dan skema masih bisa berubah. Kami mengundang komunitas untuk ikut mencoba dan mematangkan Cuan bersama.',
            )}
          </p>
        </div>

        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          {t(
            'Kode sumber Cuan dirilis di bawah lisensi Apache License 2.0. Jangan lupa beri Star ⭐ di repositori untuk mendukung perkembangannya!',
          )}
        </p>

        <div className="rounded-xl border border-border/60 bg-muted/20 p-3 text-xs text-muted-foreground flex items-center justify-between">
          <span>{t('Lisensi Terbuka:')}</span>
          <span className="font-mono font-semibold text-foreground">Apache License 2.0</span>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-2">
          <a
            href="https://github.com/buchin/cuan"
            target="_blank"
            rel="noreferrer"
            className="action-primary flex-1 min-h-11 px-4 text-xs sm:text-sm font-semibold justify-center items-center text-center inline-flex gap-2 cursor-pointer shadow-xs"
          >
            <Star className="h-4 w-4 fill-current text-amber-300" />
            <span>{t('Buka buchin/cuan di GitHub')}</span>
            <ExternalLink className="h-3.5 w-3.5 opacity-80" />
          </a>
          <Link
            to="/docs"
            onClick={onClose}
            className="action-secondary min-h-11 px-4 text-xs sm:text-sm font-semibold justify-center items-center inline-flex cursor-pointer"
          >
            {t('Dokumentasi')}
          </Link>
          <Link
            to="/sponsor#directory"
            onClick={onClose}
            className="action-secondary min-h-11 px-4 text-xs sm:text-sm font-semibold justify-center items-center inline-flex cursor-pointer"
          >
            {t('Hall of Fame')}
          </Link>
        </div>
      </div>
    </div>
  )
}
