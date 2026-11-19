import { useState, useMemo, useEffect } from 'react'
import { useParams, Link, useNavigate, Navigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import {
  Terminal,
  Cpu,
  FolderKanban,
  FolderGit2,
  Sparkles,
  Users,
  MessageSquare,
  Server,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Share2,
  Globe,
  Video,
  Layers,
  AlertTriangle,
  ExternalLink,
  Menu,
  X,
} from 'lucide-react'
import { Navbar } from '../../components/layout/Navbar'
import { Footer } from '../../components/layout/Footer'
import { GithubNoticeModal } from '../../components/common/GithubNoticeModal'
import { SeoHead } from '../../components/common/SeoHead'
import { CuanMark } from '../../components/brand/CuanMark'
import { useLanguage } from '../../context/LanguageContext'
import { DOC_SECTIONS, DOC_GROUPS } from './docsData'
import { CodeBlock } from './CodeBlock'
import { TableOfContents, MobileTableOfContents } from './TableOfContents'
import { InboxStatusBadgesPreview } from './InboxStatusBadgesPreview'
import { SocialMediaExampleProof } from './SocialMediaExampleProof'

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Terminal,
  Cpu,
  FolderKanban,
  FolderGit2,
  Sparkles,
  Users,
  MessageSquare,
  Server,
  Share2,
  Globe,
  Video,
  Layers,
  CuanMark: ({ className }: { className?: string }) => (
    <CuanMark className={className || 'h-4 w-4 shrink-0'} decorative />
  ),
}

const markdownComponents = {
  pre: ({ children }: any) => {
    const codeChild = children?.props
    const code = String(codeChild?.children || '').replace(/\n$/, '')
    const language = codeChild?.className?.replace(/^language-/, '')
    return <CodeBlock code={code} language={language} />
  },
  code: ({ className: _className, children, ...props }: any) => {
    return (
      <code
        className="px-1.5 py-0.5 rounded bg-muted/80 font-mono text-[12px] text-foreground font-medium border border-border/40 select-all whitespace-nowrap break-keep"
        {...props}
      >
        {children}
      </code>
    )
  },
  p: ({ children }: any) => (
    <p className="leading-relaxed my-1.5 text-muted-foreground">{children}</p>
  ),
  ul: ({ children }: any) => (
    <ul className="space-y-1.5 my-2 pl-4 list-disc text-muted-foreground marker:text-foreground/40">
      {children}
    </ul>
  ),
  ol: ({ start, children }: any) => (
    <ol
      start={start}
      className="space-y-1.5 my-2 pl-4 list-decimal text-muted-foreground marker:font-semibold marker:text-foreground/70"
    >
      {children}
    </ol>
  ),
  li: ({ children }: any) => (
    <li className="leading-relaxed pl-1">{children}</li>
  ),
  strong: ({ children }: any) => (
    <strong className="font-semibold text-foreground">{children}</strong>
  ),
  em: ({ children }: any) => (
    <em className="italic text-foreground/80">{children}</em>
  ),
  a: ({ href, children }: any) => {
    const isExternal = href?.startsWith('http') || href?.startsWith('//')
    return (
      <a
        href={href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noreferrer' : undefined}
        className="text-primary hover:underline font-medium"
      >
        {children}
      </a>
    )
  },
  blockquote: ({ children }: any) => (
    <blockquote className="border-l-2 border-border/70 pl-3 my-2 italic text-muted-foreground">
      {children}
    </blockquote>
  ),
}

function renderFormattedMarkdown(text?: string | null) {
  if (!text) return null
  const normalized = text
    .replace(/&nbsp;/g, ' ')
    .replace(/^[ \t]*• /gm, (match) => match.replace('• ', '- '))

  return (
    <div className="text-sm sm:text-[15px] leading-relaxed">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
        {normalized}
      </ReactMarkdown>
    </div>
  )
}

export function DocsPage() {
  const { slug } = useParams<{ slug?: string }>()
  const navigate = useNavigate()
  const { t, language } = useLanguage()
  const [showGithubModal, setShowGithubModal] = useState(false)
  const [isNoticeExpanded, setIsNoticeExpanded] = useState(false)
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false)

  // Lock body scroll and register Escape key listener when mobile drawer is open
  useEffect(() => {
    if (isMobileDrawerOpen) {
      const originalOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsMobileDrawerOpen(false)
        }
      }
      window.addEventListener('keydown', handleKeyDown)
      return () => {
        document.body.style.overflow = originalOverflow
        window.removeEventListener('keydown', handleKeyDown)
      }
    }
  }, [isMobileDrawerOpen])

  // Close mobile drawer automatically when route/slug changes
  useEffect(() => {
    setIsMobileDrawerOpen(false)
  }, [slug])

  const docsBasePath = language === 'en' ? '/en/docs' : '/docs'
  const homePath = language === 'en' ? '/en' : '/'

  // Redirect legacy slugs
  if (
    slug === 'projects-tasks' ||
    slug === 'new-work' ||
    slug === 'work-with-agent'
  ) {
    return <Navigate to={`${docsBasePath}/work-with-cuan`} replace />
  }
  if (slug === 'projects') {
    return <Navigate to={`${docsBasePath}/first-project`} replace />
  }
  if (slug === 'inbox') {
    return <Navigate to={`${docsBasePath}/customer-support`} replace />
  }
  if (slug === 'self-hosting') {
    return <Navigate to={`${docsBasePath}/settings-maintenance`} replace />
  }

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

  const currentTitle = language === 'en' ? currentSection.titleEn : currentSection.title
  const seoTitle = language === 'en'
    ? `${currentTitle} — Cuan Documentation`
    : `${currentTitle} — Dokumentasi Cuan`
  const seoDescription = language === 'en' ? currentSection.summaryEn : currentSection.summary

  return (
    <div className="min-h-dvh flex flex-col bg-background text-foreground">
      <SeoHead
        title={seoTitle}
        description={seoDescription}
        lang={language}
        path={`/docs/${currentSection.slug}`}
      />
      <Navbar
        onOpenGithubModal={() => setShowGithubModal(true)}
      />

      <main className="flex-1 mx-auto w-full max-w-6xl px-4 sm:px-8 py-6 sm:py-10">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3 select-none"
        >
          <Link to={homePath} className="hover:text-foreground transition-colors">
            {t('Beranda')}
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link to={docsBasePath} className="hover:text-foreground transition-colors">
            {t('Dokumentasi')}
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground font-medium truncate">
            {language === 'en' ? currentSection.titleEn : currentSection.title}
          </span>
        </nav>

        {/* Public Alpha & Stability Notice Callout (Default Collapsed) */}
        <div className="mb-5 rounded-xl border border-amber-500/30 bg-amber-500/5 dark:bg-amber-500/10 text-xs text-muted-foreground transition-all">
          {!isNoticeExpanded ? (
            <div className="flex items-center justify-between gap-3 px-3.5 py-2 min-h-[44px]">
              <button
                type="button"
                onClick={() => setIsNoticeExpanded(true)}
                className="flex items-center gap-2.5 min-w-0 text-left cursor-pointer flex-1 group"
                aria-label={language === 'en' ? 'Expand stability notice' : 'Buka detail catatan stabilitas'}
              >
                <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0" />
                <span className="font-medium text-foreground text-xs sm:text-[13px] truncate group-hover:underline">
                  {language === 'en'
                    ? 'Public Alpha (v0.9.x): Early preview, not yet stable for production'
                    : 'Fase Public Alpha (v0.9.x): Belum stabil untuk operasional bisnis utama'}
                </span>
                <span className="hidden sm:inline-block text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-800 dark:text-amber-300 font-bold shrink-0">
                  Preview
                </span>
              </button>
              <button
                type="button"
                onClick={() => setIsNoticeExpanded(true)}
                className="shrink-0 min-h-[44px] px-2 flex items-center gap-1 text-xs font-medium text-amber-700 dark:text-amber-300 hover:text-amber-900 dark:hover:text-amber-100 cursor-pointer"
                aria-label={language === 'en' ? 'Show details' : 'Lihat detail'}
              >
                <span>{language === 'en' ? 'Details' : 'Detail'}</span>
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <div className="p-4 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2 font-semibold text-foreground text-xs sm:text-sm">
                  <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-amber-600 dark:text-amber-400 shrink-0" />
                  <span>
                    {language === 'en'
                      ? 'Public Alpha Notice (Not Yet Stable)'
                      : 'Pemberitahuan Fase Public Alpha (Belum Stabil)'}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-800 dark:text-amber-300 font-bold">
                    v0.9.x Preview
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsNoticeExpanded(false)}
                  className="shrink-0 min-h-[36px] px-2 flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground cursor-pointer rounded-md hover:bg-amber-500/10"
                  aria-label={language === 'en' ? 'Collapse notice' : 'Tutup catatan'}
                >
                  <span>{language === 'en' ? 'Close' : 'Tutup'}</span>
                  <ChevronUp className="h-3.5 w-3.5" />
                </button>
              </div>

              <p className="text-foreground/85 leading-relaxed text-xs sm:text-[13px]">
                {language === 'en' ? (
                  <>
                    Following our 100-sponsor milestone, the Cuan repository is now open to the public on GitHub. However, please note: Cuan is <strong>still in active development and not yet stable for primary business operations (*production*)</strong>. Features, workflows, and database schemas are subject to change. Always maintain regular backups (<code className="px-1 py-0.5 bg-muted rounded font-mono text-[11px] border border-border/40">./scripts/backup.sh</code>).
                  </>
                ) : (
                  <>
                    Menepati komitmen 100 sponsor, repositori Cuan resmi dibuka ke publik di GitHub. Namun perlu dicatat: Cuan saat ini <strong>masih dalam tahap pengembangan aktif dan belum stabil untuk operasional bisnis utama (*production*)</strong>. Skema database, API, dan alur fitur masih bisa berubah sewaktu-waktu. Selalu lakukan pencadangan data berkala (<code className="px-1 py-0.5 bg-muted rounded font-mono text-[11px] border border-border/40">./scripts/backup.sh</code>).
                  </>
                )}
              </p>

              <div className="pt-2 border-t border-amber-500/20 flex flex-wrap items-center justify-between gap-2 text-2xs sm:text-xs text-muted-foreground">
                <p>
                  {language === 'en' ? (
                    <>
                      Found a bug or error on your server? Report directly on{' '}
                      <a
                        href="https://github.com/buchin/cuan/issues"
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium text-foreground underline hover:text-primary inline-flex items-center gap-1"
                      >
                        <span>GitHub Issues buchin/cuan</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </>
                  ) : (
                    <>
                      Menemukan kendala atau error di server Anda? Bantu laporkan langsung di{' '}
                      <a
                        href="https://github.com/buchin/cuan/issues"
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium text-foreground underline hover:text-primary inline-flex items-center gap-1"
                      >
                        <span>GitHub Issues buchin/cuan</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </>
                  )}
                </p>
                <button
                  type="button"
                  onClick={() => setIsNoticeExpanded(false)}
                  className="text-amber-800 dark:text-amber-300 font-medium hover:underline cursor-pointer"
                >
                  {language === 'en' ? 'Collapse ▴' : 'Sembunyikan ▴'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Navigation Drawer Trigger (Replaces horizontal scrolling pills) */}
        <div className="md:hidden mb-5">
          <button
            type="button"
            onClick={() => setIsMobileDrawerOpen(true)}
            className="w-full min-h-[44px] flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-border/70 bg-card hover:bg-muted/40 transition-colors text-xs font-medium text-foreground cursor-pointer shadow-2xs"
            aria-label={language === 'en' ? 'Open documentation menu' : 'Buka menu dokumentasi'}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <Menu className="h-4 w-4 text-muted-foreground shrink-0" />
              <span className="text-muted-foreground font-normal">
                {language === 'en' ? 'Docs Menu:' : 'Menu Dokumen:'}
              </span>
              <span className="font-semibold text-foreground truncate flex items-center gap-1.5">
                <IconComponent className="h-3.5 w-3.5 text-primary shrink-0" />
                <span className="truncate">{language === 'en' ? currentSection.titleEn : currentSection.title}</span>
              </span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground shrink-0 ml-2">
              <span className="text-[11px] font-mono text-muted-foreground/70">
                {activeIndex + 1}/{DOC_SECTIONS.length}
              </span>
              <ChevronDown className="h-4 w-4" />
            </div>
          </button>
        </div>

        {/* Layout Grid: Sidebar + Content + TOC */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-8 xl:gap-10 items-start">
          {/* Desktop Left Sidebar */}
          <aside className="hidden md:block md:col-span-4 lg:col-span-3 sticky top-20 space-y-5">
            <nav className="space-y-4" aria-label="Documentation Sidebar">
              {DOC_GROUPS.map((group) => {
                const groupItems = DOC_SECTIONS.filter((s) => s.group === group.id)
                return (
                  <div key={group.id} className="space-y-1">
                    <div className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60">
                      {language === 'en' ? group.labelEn : group.label}
                    </div>
                    {groupItems.map((sec) => {
                      const isActive = sec.slug === currentSection.slug
                      const ItemIcon = ICON_MAP[sec.icon] || BookOpen
                      return (
                        <Link
                          key={sec.slug}
                          to={`${docsBasePath}/${sec.slug}`}
                          className={`flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs sm:text-[13px] transition-colors ${
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
                  </div>
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
                <div className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6 sm:mb-7">
                  {renderFormattedMarkdown(
                    language === 'en'
                      ? currentSection.content.introEn
                      : currentSection.content.intro,
                  )}
                </div>
              )}

              <div className="space-y-8 sm:space-y-10">
                {currentSection.content.subsections.map((sub) => (
                  <section key={sub.id} id={sub.id} className="space-y-3 scroll-mt-24">
                    <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-foreground">
                      {language === 'en' ? sub.headingEn : sub.heading}
                    </h2>
                    <div className="text-sm sm:text-[15px] text-muted-foreground leading-relaxed">
                      {renderFormattedMarkdown(language === 'en' ? sub.textEn : sub.text)}
                    </div>

                    {sub.id === 'status-indicators' && (
                      <InboxStatusBadgesPreview language={language} />
                    )}

                    {sub.id === 'social-approval' && (
                      <SocialMediaExampleProof language={language} />
                    )}

                    {sub.code && (
                      <CodeBlock code={sub.code} language={sub.codeLang} />
                    )}

                    {(sub.note || sub.noteEn) && (
                      <div className="rounded-xl border border-border/50 bg-muted/20 px-4 py-3 sm:py-3.5 text-xs sm:text-[13.5px] text-muted-foreground leading-relaxed">
                        {renderFormattedMarkdown(language === 'en' ? sub.noteEn : sub.note)}
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
                  to={`${docsBasePath}/${prevSection.slug}`}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors p-2.5 rounded-lg hover:bg-muted/50 min-h-[44px]"
                >
                  <ArrowLeft className="h-4 w-4 shrink-0" />
                  <span className="hidden sm:inline text-xs text-muted-foreground">
                    {language === 'en' ? 'Previous:' : 'Sebelumnya:'}
                  </span>
                  <span className="font-medium text-foreground truncate max-w-[140px] sm:max-w-none">
                    {language === 'en' ? prevSection.titleEn : prevSection.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}

              {nextSection ? (
                <Link
                  to={`${docsBasePath}/${nextSection.slug}`}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors p-2.5 rounded-lg hover:bg-muted/50 ml-auto text-right min-h-[44px]"
                >
                  <span className="hidden sm:inline text-xs text-muted-foreground">
                    {language === 'en' ? 'Next:' : 'Selanjutnya:'}
                  </span>
                  <span className="font-medium text-foreground truncate max-w-[140px] sm:max-w-none">
                    {language === 'en' ? nextSection.titleEn : nextSection.title}
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0" />
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

      {/* Mobile Navigation Drawer (Slide-Over Sheet) */}
      {isMobileDrawerOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
            onClick={() => setIsMobileDrawerOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <aside
            className="fixed inset-y-0 left-0 w-[85%] max-w-xs bg-card border-r border-border/60 shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-200"
            role="dialog"
            aria-modal="true"
            aria-label={language === 'en' ? 'Documentation Navigation' : 'Navigasi Dokumentasi'}
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-4 py-3.5 border-b border-border/40">
              <div className="flex items-center gap-2 font-display font-semibold text-sm text-foreground">
                <BookOpen className="h-4 w-4 text-primary" />
                <span>{language === 'en' ? 'Documentation' : 'Dokumentasi Cuan'}</span>
              </div>
              <button
                type="button"
                onClick={() => setIsMobileDrawerOpen(false)}
                className="min-h-[44px] min-w-[44px] -mr-2 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
                aria-label={language === 'en' ? 'Close menu' : 'Tutup menu'}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Drawer Navigation Body */}
            <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
              {DOC_GROUPS.map((group) => {
                const groupItems = DOC_SECTIONS.filter((s) => s.group === group.id)
                return (
                  <div key={group.id} className="space-y-1">
                    <div className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60 select-none">
                      {language === 'en' ? group.labelEn : group.label}
                    </div>
                    {groupItems.map((sec) => {
                      const isActive = sec.slug === currentSection.slug
                      const ItemIcon = ICON_MAP[sec.icon] || BookOpen
                      return (
                        <button
                          key={sec.slug}
                          type="button"
                          onClick={() => {
                            navigate(`${docsBasePath}/${sec.slug}`)
                            setIsMobileDrawerOpen(false)
                          }}
                          className={`w-full min-h-[44px] flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs transition-colors text-left cursor-pointer ${
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
                          <span className="truncate flex-1">
                            {language === 'en' ? sec.titleEn : sec.title}
                          </span>
                          {isActive && (
                            <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                          )}
                        </button>
                      )
                    })}
                  </div>
                )
              })}
            </nav>

            {/* Drawer Footer */}
            <div className="p-4 border-t border-border/40 text-xs text-muted-foreground space-y-2 bg-muted/10">
              <p className="leading-relaxed text-2xs">
                {t('Mengalami kendala?')}
              </p>
              <a
                href="https://github.com/buchin/cuan/issues"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-primary hover:underline font-medium min-h-[44px] py-1 text-xs"
              >
                <span>Buka Diskusi GitHub →</span>
              </a>
            </div>
          </aside>
        </div>
      )}
    </div>
  )
}

export default DocsPage
