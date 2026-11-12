import { Link } from 'react-router-dom'
import { Github } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'

interface FooterProps {
  onOpenGithubModal: () => void
  isSubPage?: boolean
}

export function Footer({ onOpenGithubModal, isSubPage = false }: FooterProps) {
  const { t } = useLanguage()

  return (
    <footer className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 border-t border-border/60 px-6 py-6 text-sm text-muted-foreground sm:px-8">
      <p className="flex items-center gap-1.5">
        <span className="font-display tracking-tight font-bold text-foreground">
          cuan
        </span>
        <span>· {t('Kembangin proyek digital dari ide sampai cuan.')}</span>
      </p>

      <div className="flex flex-wrap items-center gap-5">
        {!isSubPage ? (
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
            <Link
              to="/sponsor"
              className="inline-flex min-h-11 items-center hover:text-foreground transition-colors font-medium text-primary"
            >
              {t('Program Sponsor Founding')}
            </Link>
          </>
        ) : (
          <Link
            to="/"
            className="inline-flex min-h-11 items-center hover:text-foreground transition-colors"
          >
            {t('Beranda')}
          </Link>
        )}

        <button
          type="button"
          onClick={onOpenGithubModal}
          className="inline-flex min-h-11 items-center gap-1.5 hover:text-foreground transition-colors cursor-pointer"
        >
          <Github className="h-4 w-4" strokeWidth={1.5} />
          <span>GitHub</span>
        </button>
      </div>
    </footer>
  )
}
