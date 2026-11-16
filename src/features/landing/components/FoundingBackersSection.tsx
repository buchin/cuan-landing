import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Sparkles, ArrowRight, ArrowUpRight } from 'lucide-react'
import { useLanguage } from '../../../context/LanguageContext'
import { SponsorItem, SPONSORWARE_TARGET } from '../../sponsorship/types'

function safeUrl(url?: string): string {
  if (!url) return '#'
  const trimmed = url.trim()
  if (/^https?:\/\//i.test(trimmed)) return trimmed
  return `https://${trimmed}`
}

export function FoundingBackersSection() {
  const { t } = useLanguage()
  const [sponsors, setSponsors] = useState<SponsorItem[]>([])
  const [totalCount, setTotalCount] = useState<number>(29)
  const [targetCount, setTargetCount] = useState<number>(SPONSORWARE_TARGET)

  useEffect(() => {
    fetch('/api/sponsors/current')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.sponsors && Array.isArray(data.sponsors)) {
          setSponsors(data.sponsors)
        }
        if (typeof data?.total === 'number') {
          setTotalCount(data.total)
        }
        if (typeof data?.target === 'number') {
          setTargetCount(data.target)
        }
      })
      .catch(() => null)
  }, [])

  const count = totalCount
  const target = targetCount
  const percent = Math.min(100, Math.round((count / target) * 100))

  return (
    <section className="border-b border-border/60 bg-muted/5 px-6 py-12 sm:px-8">
      <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
            <span>{t('Sponsorware · Rilis Open Source Komunitas')}</span>
          </div>
          <h3 className="font-display text-lg sm:text-xl font-bold text-foreground">
            {t('Bantu Cuan v1.0 Resmi Dirilis Jadi Open-Source Publik')}
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            {t(
              'Script Cuan saat ini dalam tahap pengembangan aktif dan akan dirilis gratis di GitHub saat 100 sponsor terpenuhi. Dukung mulai Rp 100.000 untuk mencoba private repo v0.9 hari ini dan tercatat abadi sebagai founding backer.',
            )}
          </p>

          {/* Minimal 1-Line Progress Bar on LP */}
          <div className="pt-1 flex items-center gap-3 text-xs text-muted-foreground">
            <div className="h-2 w-32 sm:w-48 rounded-full bg-muted/80 overflow-hidden">
              <div
                className="h-full rounded-full bg-primary transition-all duration-500"
                style={{ width: `${percent}%` }}
              />
            </div>
            <span className="font-mono text-2xs font-medium text-foreground">
              {count} / {target} {t('Sponsor')} ({percent}%)
            </span>
          </div>
        </div>

        <Link
          to="/sponsor"
          className="action-primary min-h-11 px-5 text-xs sm:text-sm font-semibold inline-flex items-center gap-2 shrink-0 cursor-pointer shadow-2xs"
        >
          <span>{t('Dukung Sekarang (Mulai Rp 100rb)')}</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Dynamic Backers & Sponsors Showcase */}
      {sponsors.length > 0 && (
        <div className="mx-auto max-w-6xl mt-8 pt-6 border-t border-border/40">
          <div className="flex items-center justify-between mb-3.5">
            <div className="text-2xs font-semibold uppercase tracking-wider text-muted-foreground">
              {t('Founding Sponsors & Backers:')}
            </div>
            <Link
              to="/sponsor#directory"
              className="text-2xs font-semibold text-primary hover:underline inline-flex items-center gap-1"
            >
              <span>{t('Lihat Direktori Lengkap')}</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {sponsors.map((sp) => {
              const isTitan = (sp.amount_idr || 0) >= 200_000
              const hasWebsite = Boolean(sp.website_url && sp.website_url.trim().length > 0)
              const logoSrc = sp.logo_url || (sp.logo_path ? `/uploads/sponsors/logos/${sp.logo_path}` : null)
              const titleText = sp.slogan ? `${sp.brand_name} - ${sp.slogan}` : sp.brand_name

              // 1. Titan Backers (Gold / Amber Highlight)
              if (isTitan) {
                if (hasWebsite) {
                  return (
                    <a
                      key={sp.id}
                      href={safeUrl(sp.website_url)}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={titleText}
                      className="group inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 hover:border-amber-500/70 text-xs font-semibold text-amber-900 dark:text-amber-300 transition-all shadow-2xs"
                    >
                      {logoSrc ? (
                        <img src={logoSrc} alt={sp.brand_name} className="h-4 w-auto object-contain mr-0.5" />
                      ) : (
                        <Sparkles className="h-3 w-3 text-amber-500 shrink-0" />
                      )}
                      <span>{sp.brand_name}</span>
                      <ArrowUpRight className="h-3 w-3 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </a>
                  )
                }
                return (
                  <span
                    key={sp.id}
                    title={titleText}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border border-amber-500/40 bg-amber-500/10 text-xs font-semibold text-amber-900 dark:text-amber-300 shadow-2xs"
                  >
                    {logoSrc ? (
                      <img src={logoSrc} alt={sp.brand_name} className="h-4 w-auto object-contain mr-0.5" />
                    ) : (
                      <Sparkles className="h-3 w-3 text-amber-500 shrink-0" />
                    )}
                    <span>{sp.brand_name}</span>
                  </span>
                )
              }

              // 2. Regular Backers with Website (Clickable with external arrow)
              if (hasWebsite) {
                return (
                  <a
                    key={sp.id}
                    href={safeUrl(sp.website_url)}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={titleText}
                    className="group inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-border/70 bg-card hover:bg-muted/50 hover:border-foreground/30 text-xs font-medium text-foreground transition-all shadow-2xs"
                  >
                    {logoSrc && (
                      <img src={logoSrc} alt={sp.brand_name} className="h-3.5 w-auto object-contain mr-0.5" />
                    )}
                    <span className="font-semibold text-foreground/90">{sp.brand_name}</span>
                    <ArrowUpRight className="h-2.5 w-2.5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </a>
                )
              }

              // 3. Community Backers (Clean pill badge)
              return (
                <span
                  key={sp.id}
                  className="text-xs font-normal text-muted-foreground px-2.5 py-1 rounded-md border border-border/40 bg-muted/20"
                >
                  {sp.brand_name}
                </span>
              )
            })}
          </div>
        </div>
      )}
    </section>
  )
}
