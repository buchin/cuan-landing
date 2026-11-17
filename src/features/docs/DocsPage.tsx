import { useState, useMemo } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {
  Terminal,
  Cpu,
  Users,
  MessageSquare,
  Server,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  BookOpen,
} from 'lucide-react'
import { Navbar } from '../../components/layout/Navbar'
import { Footer } from '../../components/layout/Footer'
import { GithubNoticeModal } from '../../components/common/GithubNoticeModal'
import { useLanguage } from '../../context/LanguageContext'
import { DOC_SECTIONS } from './docsData'
import { CodeBlock } from './CodeBlock'
import { TableOfContents, MobileTableOfContents } from './TableOfContents'

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Terminal,
  Cpu,
  Users,
  MessageSquare,
  Server,
}

export function DocsPage() {
  const { slug } = useParams<{ slug?: string }>()
  const navigate = useNavigate()
  const { t, language } = useLanguage()
  const [showGithubModal, setShowGithubModal] = useState(false)

  const activeIndex = useMemo(() => {
    if (!slug) return 0
    const idx = DOC_SECTIONS.findIndex((s) => s.slug === slug)
    return idx !== -1 ? idx : 0
  }, [slug])

  const currentSection = DOC_SECTIONS[activeIndex]
  const prevSection = activeIndex > 0 ? DOC_SECTIONS[activeIndex - 1] : null
  const nextSection =
    activeIndex < DOC_SECTIONS.length - 1 ? DOC_SECTIONS[activeIndex + 1] : null

  const IconComponent = ICON_MAP[currentSection.icon] || BookOpen

  return (
    <div className="min-h-dvh flex flex-col bg-background text-foreground">
      <Navbar
        onOpenGithubModal={() => setShowGithubModal(true)}
      />

      <main className="flex-1 mx-auto w-full max-w-6xl px-4 sm:px-8 py-6 sm:py-10">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 text-xs text-muted-foreground mb-6 select-none"
        >
          <Link to="/" className="hover:text-foreground transition-colors">
            {t('Beranda')}
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link to="/docs" className="hover:text-foreground transition-colors">
            {t('Dokumentasi')}
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground font-medium truncate">
            {language === 'en' ? currentSection.titleEn : currentSection.title}
          </span>
        </nav>

        {/* Mobile Horizontal Section Tabs */}
        <div className="md:hidden flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none border-b border-border/40">
          {DOC_SECTIONS.map((sec) => {
            const isActive = sec.slug === currentSection.slug
            return (
              <button
                key={sec.slug}
                type="button"
                onClick={() => navigate(`/docs/${sec.slug}`)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-foreground text-background'
                    : 'bg-muted/60 text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <span>{language === 'en' ? sec.titleEn : sec.title}</span>
              </button>
            )
          })}
        </div>

        {/* Layout Grid: Sidebar + Content + TOC */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-8 xl:gap-10 items-start">
          {/* Desktop Left Sidebar */}
          <aside className="hidden md:block md:col-span-4 lg:col-span-3 sticky top-20 space-y-1">
            <div className="pb-3 mb-2 border-b border-border/40">
              <span className="text-xs font-medium text-muted-foreground">
                {t('Panduan Resmi')}
              </span>
            </div>
            <nav className="space-y-1" aria-label="Documentation Sidebar">
              {DOC_SECTIONS.map((sec) => {
                const isActive = sec.slug === currentSection.slug
                const ItemIcon = ICON_MAP[sec.icon] || BookOpen
                return (
                  <Link
                    key={sec.slug}
                    to={`/docs/${sec.slug}`}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs sm:text-sm transition-colors ${
                      isActive
                        ? 'bg-muted font-medium text-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                  >
                    <ItemIcon
                      className={`h-4 w-4 shrink-0 ${
                        isActive ? 'text-primary' : 'text-muted-foreground'
                      }`}
                    />
                    <span className="truncate">
                      {language === 'en' ? sec.titleEn : sec.title}
                    </span>
                  </Link>
                )
              })}
            </nav>

            <div className="pt-6 mt-6 border-t border-border/40 text-xs text-muted-foreground space-y-2">
              <p className="leading-relaxed">
                {t('Mengalami kendala?')}
              </p>
              <a
                href="https://github.com/buchin/cuan/issues"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-primary hover:underline font-medium"
              >
                <span>Buka Diskusi GitHub →</span>
              </a>
            </div>
          </aside>

          {/* Main Content Area */}
          <article className="md:col-span-8 lg:col-span-6 xl:col-span-7 max-w-3xl min-w-0">
            {/* Header */}
            <header className="space-y-2.5 pb-6 border-b border-border/40">
              <h1 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-foreground flex items-center gap-2.5">
                <IconComponent className="h-6 w-6 text-muted-foreground shrink-0" />
                <span>{language === 'en' ? currentSection.titleEn : currentSection.title}</span>
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {language === 'en' ? currentSection.summaryEn : currentSection.summary}
              </p>
            </header>

            {/* Mobile / Tablet Collapsible TOC */}
            <MobileTableOfContents
              items={currentSection.content.subsections}
              language={language}
            />

            {/* Content Body */}
            <div className="py-6 space-y-8">
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {language === 'en'
                  ? currentSection.content.introEn
                  : currentSection.content.intro}
              </p>

              {currentSection.content.subsections.map((sub) => (
                <section key={sub.id} id={sub.id} className="space-y-3 pt-2 scroll-mt-24">
                  <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-foreground">
                    {language === 'en' ? sub.headingEn : sub.heading}
                  </h2>
                  <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">
                    {language === 'en' ? sub.textEn : sub.text}
                  </p>

                  {sub.code && (
                    <CodeBlock code={sub.code} language={sub.codeLang} />
                  )}

                  {(sub.note || sub.noteEn) && (
                    <div className="rounded-lg border-l-2 border-primary bg-muted/30 px-3.5 py-2.5 text-xs sm:text-sm text-foreground/90 leading-relaxed">
                      {language === 'en' ? sub.noteEn : sub.note}
                    </div>
                  )}
                </section>
              ))}
            </div>

            {/* Pagination Navigation Footer */}
            <div className="pt-8 mt-8 border-t border-border/40 flex items-center justify-between gap-4">
              {prevSection ? (
                <Link
                  to={`/docs/${prevSection.slug}`}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors p-2 rounded-lg hover:bg-muted/50"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span className="hidden sm:inline text-xs text-muted-foreground">Sebelumnya:</span>
                  <span className="font-medium text-foreground">
                    {language === 'en' ? prevSection.titleEn : prevSection.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}

              {nextSection ? (
                <Link
                  to={`/docs/${nextSection.slug}`}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors p-2 rounded-lg hover:bg-muted/50 ml-auto text-right"
                >
                  <span className="hidden sm:inline text-xs text-muted-foreground">Selanjutnya:</span>
                  <span className="font-medium text-foreground">
                    {language === 'en' ? nextSection.titleEn : nextSection.title}
                  </span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ) : (
                <div />
              )}
            </div>
          </article>

          {/* Desktop Right Rail TOC */}
          <aside className="hidden lg:block lg:col-span-3 xl:col-span-2 sticky top-20">
            <TableOfContents
              items={currentSection.content.subsections}
              language={language}
            />
          </aside>
        </div>
      </main>

      <Footer
        onOpenGithubModal={() => setShowGithubModal(true)}
      />

      <GithubNoticeModal
        isOpen={showGithubModal}
        onClose={() => setShowGithubModal(false)}
      />
    </div>
  )
}

export default DocsPage
