import { useState, useMemo } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {
  Terminal,
  Cpu,
  FolderKanban,
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
  FolderKanban,
  Users,
  MessageSquare,
  Server,
}

function renderInlineParts(rawText: string) {
  const parts = rawText.split(/(\*\*.*?\*\*|`.*?`)/g)
  return parts.map((part, partIdx) => {
    if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
      return (
        <strong key={partIdx} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      )
    }
    if (part.startsWith('`') && part.endsWith('`') && part.length >= 2) {
      return (
        <code key={partIdx} className="px-1.5 py-0.5 rounded bg-muted/80 font-mono text-[12px] text-foreground font-medium border border-border/40 select-all">
          {part.slice(1, -1)}
        </code>
      )
    }
    return part
  })
}

function renderFormattedText(text?: string | null) {
  if (!text) return null
  const lines = text.split('\n')
  const elements: React.ReactNode[] = []
  let i = 0

  while (i < lines.length) {
    const rawLine = lines[i].replace(/&nbsp;/g, ' ')
    const trimmed = rawLine.trim()

    // Fenced code block: ```lang
    if (trimmed.startsWith('```')) {
      const lang = trimmed.slice(3).trim()
      const codeLines: string[] = []
      i++
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i])
        i++
      }
      // Skip the closing ```
      if (i < lines.length) i++
      elements.push(
        <CodeBlock
          key={`code-block-${i}`}
          code={codeLines.join('\n')}
          language={lang || undefined}
        />
      )
      continue
    }

    if (!trimmed) {
      elements.push(<span key={`blank-${i}`} className="block h-2" />)
      i++
      continue
    }

    const isIndented = /^(\s{2,}|\t)/.test(rawLine)

    // Bullet list: starts with • or -
    if (trimmed.startsWith('• ') || trimmed.startsWith('- ')) {
      const content = trimmed.slice(2)
      elements.push(
        <span
          key={`bullet-${i}`}
          className={`flex items-start gap-2.5 my-1 leading-relaxed ${
            isIndented ? 'pl-5 text-muted-foreground/90' : 'text-muted-foreground'
          }`}
        >
          <span className="text-foreground/40 shrink-0 select-none mt-1.5 text-[8px] leading-none">
            ●
          </span>
          <span className="flex-1">{renderInlineParts(content)}</span>
        </span>
      )
      i++
      continue
    }

    // Numbered list: starts with 1. or 2. etc.
    const numMatch = trimmed.match(/^(\d+)\.\s+(.*)/)
    if (numMatch) {
      elements.push(
        <span
          key={`num-${i}`}
          className={`flex items-start gap-2.5 my-1.5 leading-relaxed ${
            isIndented ? 'pl-5 text-muted-foreground/90' : 'text-muted-foreground'
          }`}
        >
          <span className="font-semibold text-foreground/70 shrink-0 text-xs w-4 select-none pt-0.5">
            {numMatch[1]}.
          </span>
          <span className="flex-1">{renderInlineParts(numMatch[2])}</span>
        </span>
      )
      i++
      continue
    }

    // Regular line
    elements.push(
      <span
        key={`line-${i}`}
        className={`block leading-relaxed ${
          isIndented ? 'pl-5 text-muted-foreground/90' : 'text-muted-foreground'
        }`}
      >
        {renderInlineParts(trimmed)}
      </span>
    )
    i++
  }

  return elements
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
            <header className="space-y-2 pb-5 border-b border-border/40">
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
            <div className="pt-5 pb-8">
              {(currentSection.content.intro || currentSection.content.introEn) && (
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6 sm:mb-7">
                  {language === 'en'
                    ? currentSection.content.introEn
                    : currentSection.content.intro}
                </p>
              )}

              <div className="space-y-8 sm:space-y-10">
                {currentSection.content.subsections.map((sub) => (
                  <section key={sub.id} id={sub.id} className="space-y-3 scroll-mt-24">
                    <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-foreground">
                      {language === 'en' ? sub.headingEn : sub.heading}
                    </h2>
                    <div className="text-sm sm:text-[15px] text-muted-foreground space-y-1.5 leading-relaxed">
                      {renderFormattedText(language === 'en' ? sub.textEn : sub.text)}
                    </div>

                    {sub.code && (
                      <CodeBlock code={sub.code} language={sub.codeLang} />
                    )}

                    {(sub.note || sub.noteEn) && (
                      <div className="rounded-xl border border-border/50 bg-muted/20 px-4 py-3 sm:py-3.5 text-xs sm:text-[13.5px] text-muted-foreground leading-relaxed">
                        {renderFormattedText(language === 'en' ? sub.noteEn : sub.note)}
                      </div>
                    )}
                  </section>
                ))}
              </div>
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
