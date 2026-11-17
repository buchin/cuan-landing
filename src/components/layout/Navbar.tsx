import { Link, useLocation } from 'react-router-dom'
import { Github, Sun, Moon } from 'lucide-react'
import { CuanMark } from '../brand/CuanMark'
import { useLanguage } from '../../context/LanguageContext'
import { useTheme } from '../../context/ThemeContext'

interface NavbarProps {
  onOpenGithubModal: () => void
  onWaitingListClick?: () => void
}

export function Navbar({
  onOpenGithubModal,
  onWaitingListClick,
}: NavbarProps) {
  const { t, language, setPreference } = useLanguage()
  const { resolvedTheme, toggleTheme } = useTheme()
  const location = useLocation()

  const isHome = location.pathname === '/'
  const isSponsor = location.pathname.startsWith('/sponsor')
  const isDocs = location.pathname.startsWith('/docs')

  return (
    <header className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-2 px-4 sm:px-8 border-b border-border/40">
      <Link
        to="/"
        className="inline-flex min-h-11 items-center gap-2 font-medium tracking-tight shrink-0"
        aria-label="Cuan"
      >
        <CuanMark decorative className="h-7 w-7" />
        <span className="font-display text-xl font-bold tracking-tight text-foreground">
          cuan
        </span>
      </Link>

      <nav
        aria-label={t('Website navigation')}
        className="flex items-center gap-1.5 sm:gap-3.5"
      >
        {isHome ? (
          <a
            href="#ecosystem-strip"
            className="hidden min-h-11 items-center px-2 text-sm text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap sm:inline-flex"
          >
            {t('Ekosistem')}
          </a>
        ) : (
          <Link
            to="/#ecosystem-strip"
            className="hidden min-h-11 items-center px-2 text-sm text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap sm:inline-flex"
          >
            {t('Ekosistem')}
          </Link>
        )}

        {isHome ? (
          <a
            href="#problem"
            className="hidden min-h-11 items-center px-2 text-sm text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap sm:inline-flex"
          >
            {t('Tantangan')}
          </a>
        ) : (
          <Link
            to="/#problem"
            className="hidden min-h-11 items-center px-2 text-sm text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap sm:inline-flex"
          >
            {t('Tantangan')}
          </Link>
        )}

        {isHome ? (
          <a
            href="#how-it-works"
            className="hidden min-h-11 items-center px-2 text-sm text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap sm:inline-flex"
          >
            {t('Cara Kerja')}
          </a>
        ) : (
          <Link
            to="/#how-it-works"
            className="hidden min-h-11 items-center px-2 text-sm text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap sm:inline-flex"
          >
            {t('Cara Kerja')}
          </Link>
        )}

        <Link
          to="/sponsor"
          className={`hidden min-h-11 items-center px-2 text-sm transition-colors whitespace-nowrap lg:inline-flex ${
            isSponsor
              ? 'text-foreground font-semibold'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          {t('Sponsor')}
        </Link>

        <Link
          to="/docs"
          className={`hidden min-h-11 items-center px-2 text-sm transition-colors whitespace-nowrap sm:inline-flex ${
            isDocs
              ? 'text-foreground font-semibold'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          {t('Dokumentasi')}
        </Link>

        {/* Mini CTA button on Navbar */}
        {isHome ? (
          onWaitingListClick && (
            <button
              type="button"
              onClick={onWaitingListClick}
              className="action-primary hidden min-h-9 px-3.5 text-xs font-semibold sm:inline-flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <span>{t('Waiting List')}</span>
            </button>
          )
        ) : (
          <Link
            to="/#waiting-list"
            className="action-primary hidden min-h-9 px-3.5 text-xs font-semibold sm:inline-flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <span>{t('Waiting List')}</span>
          </Link>
        )}

        {/* Clean GitHub button */}
        <button
          type="button"
          onClick={onOpenGithubModal}
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted/70 hover:text-foreground transition-colors cursor-pointer"
          title="GitHub Repository"
          aria-label="GitHub Repository"
        >
          <Github className="h-4 w-4" strokeWidth={1.5} />
        </button>

        {/* Language Switcher */}
        <button
          type="button"
          onClick={() => setPreference(language === 'id' ? 'en' : 'id')}
          className="inline-flex h-9 px-2 items-center justify-center rounded-lg text-xs font-semibold text-muted-foreground hover:bg-muted/70 hover:text-foreground transition-colors shrink-0 cursor-pointer"
          title={language === 'id' ? 'Ganti ke English' : 'Switch to Bahasa Indonesia'}
        >
          {language === 'id' ? 'ID' : 'EN'}
        </button>

        {/* Theme Switcher */}
        <button
          type="button"
          onClick={toggleTheme}
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted/70 hover:text-foreground transition-colors shrink-0 cursor-pointer"
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
