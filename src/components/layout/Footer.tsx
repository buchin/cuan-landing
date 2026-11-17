import { Link, useLocation } from 'react-router-dom'
import { Github } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'

interface FooterProps {
  onOpenGithubModal: () => void
}

export function Footer({ onOpenGithubModal }: FooterProps) {
  const { t } = useLanguage()
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <footer className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 border-t border-border/60 px-4 sm:px-8 py-6 text-sm text-muted-foreground">
      <p className="flex flex-wrap items-center gap-1.5 leading-relaxed">
        <span className="font-display tracking-tight font-bold text-foreground">
          cuan
        </span>
        <span>· {t('Kembangin proyek digital dari ide sampai cuan.')}</span>
      </p>

      <div className="flex flex-wrap items-center gap-5">
        {isHome ? (
          <>
            <a
              href="#ecosystem-strip"
              className="inline-flex min-h-11 items-center hover:text-foreground transition-colors"
            >
              {t('Ekosistem')}
            </a>
            <a
              href="#problem"
              className="inline-flex min-h-11 items-center hover:text-foreground transition-colors"
            >
              {t('Tantangan')}
            </a>
            <a
              href="#how-it-works"
              className="inline-flex min-h-11 items-center hover:text-foreground transition-colors"
            >
              {t('Cara Kerja')}
            </a>
          </>
        ) : (
          <>
            <Link
              to="/#ecosystem-strip"
              className="inline-flex min-h-11 items-center hover:text-foreground transition-colors"
            >
              {t('Ekosistem')}
            </Link>
            <Link
              to="/#problem"
              className="inline-flex min-h-11 items-center hover:text-foreground transition-colors"
            >
              {t('Tantangan')}
            </Link>
            <Link
              to="/#how-it-works"
              className="inline-flex min-h-11 items-center hover:text-foreground transition-colors"
            >
              {t('Cara Kerja')}
            </Link>
          </>
        )}

        <Link
          to="/docs"
          className="inline-flex min-h-11 items-center hover:text-foreground transition-colors"
        >
          {t('Dokumentasi')}
        </Link>
        <Link
          to="/sponsor"
          className="inline-flex min-h-11 items-center hover:text-foreground transition-colors font-medium text-primary"
        >
          {t('Program Sponsor Founding')}
        </Link>

        <button
          type="button"
          onClick={onOpenGithubModal}
          className="inline-flex min-h-11 items-center gap-1 hover:text-foreground transition-colors cursor-pointer"
          title="GitHub Repository"
        >
          <Github className="h-4 w-4" strokeWidth={1.5} />
          <span>GitHub</span>
        </button>
      </div>
    </footer>
  )
}
