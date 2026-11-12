import { Link } from 'react-router-dom'
import { Github, Sun, Moon } from 'lucide-react'
import { CuanMark } from '../brand/CuanMark'
import { useLanguage } from '../../context/LanguageContext'
import { useTheme } from '../../context/ThemeContext'

interface NavbarProps {
  onOpenGithubModal: () => void
  onWaitingListClick?: () => void
  isSubPage?: boolean
}

export function Navbar({
  onOpenGithubModal,
  onWaitingListClick,
  isSubPage = false,
}: NavbarProps) {
  const { t, language, setPreference } = useLanguage()
  const { resolvedTheme, toggleTheme } = useTheme()

  return (
    <header className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-6 sm:px-8 border-b border-border/40">
      <Link
        to="/"
        className="inline-flex min-h-11 items-center gap-2 font-medium tracking-tight"
        aria-label="Cuan"
      >
        <CuanMark decorative className="h-7 w-7" />
        <span className="font-display text-xl font-bold tracking-tight text-foreground">
          cuan
        </span>
      </Link>

      <nav
        aria-label={t('Website navigation')}
        className="flex items-center gap-2 sm:gap-3.5"
      >
        {!isSubPage ? (
          <>
            <a
              href="#ecosystem-strip"
              className="hidden min-h-11 items-center px-2 text-sm text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap sm:inline-flex"
            >
              {t('Ekosistem')}
            </a>
            <a
              href="#problem"
              className="hidden min-h-11 items-center px-2 text-sm text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap sm:inline-flex"
            >
              {t('Tantangan')}
            </a>
            <a
              href="#how-it-works"
              className="hidden min-h-11 items-center px-2 text-sm text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap sm:inline-flex"
            >
              {t('Cara Kerja')}
            </a>
            <Link
              to="/sponsor"
              className="hidden min-h-11 items-center px-2 text-sm text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap lg:inline-flex"
            >
              {t('Sponsor')}
            </Link>
          </>
        ) : (
          <Link
            to="/"
            className="inline-flex min-h-9 items-center gap-1.5 px-3 text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
          >
            <span>← {t('Kembali ke Beranda')}</span>
          </Link>
        )}

        {/* Mini CTA button on Navbar */}
        {onWaitingListClick && (
          <button
            type="button"
            onClick={onWaitingListClick}
            className="action-primary hidden min-h-9 px-3.5 text-xs font-semibold sm:inline-flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <span>{t('Waiting List')}</span>
          </button>
        )}

        {/* Clean GitHub button */}
        <button
          type="button"
          onClick={onOpenGithubModal}
          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border/50 bg-muted/30 text-muted-foreground hover:bg-accent/50 hover:text-foreground transition-colors cursor-pointer"
          title="GitHub Repository"
          aria-label="GitHub Repository"
        >
          <Github className="h-4 w-4" strokeWidth={1.5} />
        </button>

        {/* Language Switcher */}
        <button
          type="button"
          onClick={() => setPreference(language === 'id' ? 'en' : 'id')}
          className="inline-flex min-h-9 items-center justify-center rounded-md border border-border/50 bg-muted/30 px-2.5 text-xs font-medium text-muted-foreground hover:bg-accent/50 hover:text-foreground transition-colors shrink-0 cursor-pointer"
          title={language === 'id' ? 'Ganti ke English' : 'Switch to Bahasa Indonesia'}
        >
          {language === 'id' ? 'ID' : 'EN'}
        </button>

        {/* Theme Switcher */}
        <button
          type="button"
          onClick={toggleTheme}
          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border/50 bg-muted/30 text-muted-foreground hover:bg-accent/50 hover:text-foreground transition-colors shrink-0 cursor-pointer"
          aria-label="Ganti tema"
          title={resolvedTheme === 'dark' ? 'Tema terang' : 'Tema gelap'}
        >
          {resolvedTheme === 'dark' ? (
            <Sun className="h-4 w-4" strokeWidth={1.5} />
          ) : (
            <Moon className="h-4 w-4" strokeWidth={1.5} />
          )}
        </button>
      </nav>
    </header>
  )
}
