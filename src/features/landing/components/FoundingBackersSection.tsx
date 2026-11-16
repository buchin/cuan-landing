import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Crown, Medal, ShieldCheck, Globe } from 'lucide-react'
import { useLanguage } from '../../../context/LanguageContext'
import { SponsorItem, SPONSORWARE_TARGET, getRankBadge } from '../../sponsorship/types'
import { SponsorAvatar } from '../../sponsorship/components/SponsorAvatar'

function safeUrl(url?: string): string {
  if (!url) return '#'
  const trimmed = url.trim()
  if (/^https?:\/\//i.test(trimmed)) return trimmed
  return `https://${trimmed}`
}

function cleanDomain(url?: string): string {
  if (!url) return ''
  return url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')
}

export function FoundingBackersSection() {
  const { t } = useLanguage()
  const [sponsors, setSponsors] = useState<SponsorItem[]>([])
  const [totalCount, setTotalCount] = useState<number>(58)
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

  const titans = sponsors.filter((sp) => (sp.amount_idr || 0) >= 200_000)
  const businesses = sponsors.filter(
    (sp) =>
      (sp.amount_idr || 0) < 200_000 &&
      Boolean(sp.website_url && sp.website_url.trim().length > 0)
  )

  return (
    <section className="border-b border-border/60 bg-muted/5 px-6 py-12 sm:px-8">
      {/* Top Banner & Milestone */}
      <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-muted/40 px-3 py-1 text-2xs sm:text-xs font-medium text-muted-foreground mb-3">
            <span>{t('Sponsorware · Target 100 Sponsor Komunitas')}</span>
          </div>
          <h3 className="text-xl sm:text-2xl text-foreground font-display font-bold tracking-tight">
            {t('Bantu Cuan v1.0 Resmi Dirilis Jadi')}{' '}
            <span className="font-serif italic font-normal text-foreground/90">{t('Open Source.')}</span>
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

      {/* Dynamic Backers & Sponsors Showcase (Calm 3-Tier Hierarchy) */}
      {sponsors.length > 0 && (
        <div className="mx-auto max-w-6xl mt-8 pt-6 border-t border-border/40 space-y-4">
          <div className="text-2xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <Crown className="h-3.5 w-3.5 text-amber-500" />
            <span>{t('Founding Titans & Mitra Terverifikasi')}</span>
          </div>

          {/* 1. Founding Titans (Prominent Highlight Cards) */}
          {titans.length > 0 && (
            <div className="space-y-3">
              {/* Top #1 Spotlight Titan */}
              {(() => {
                const topSponsor = titans[0]
                const hasWebsite = Boolean(topSponsor.website_url && topSponsor.website_url.trim().length > 0)
                const CardWrapper = hasWebsite ? 'a' : 'div'
                const wrapperProps = hasWebsite
                  ? {
                      href: safeUrl(topSponsor.website_url),
                      target: '_blank',
                      rel: 'noopener noreferrer',
                      className: 'rounded-xl border border-amber-500/30 bg-card p-4 sm:p-5 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 group hover:border-amber-500/60 hover:bg-muted/10 transition-all cursor-pointer',
                    }
                  : {
                      className: 'rounded-xl border border-amber-500/30 bg-card p-4 sm:p-5 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 group',
                    }

                return (
                  <CardWrapper key={topSponsor.id} {...(wrapperProps as any)}>
                    <div className="flex items-center gap-3.5 min-w-0">
                      <SponsorAvatar sponsor={topSponsor} size="lg" />
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 text-2xs font-bold text-amber-700 dark:text-amber-400">
                          <Crown className="h-3.5 w-3.5 text-amber-500" />
                          <span>#1 Platinum Titan</span>
                        </div>
                        <div className="font-display font-bold text-sm sm:text-base text-foreground transition-colors truncate">
                          {topSponsor.brand_name}
                        </div>
                        {topSponsor.slogan ? (
                          <div className="text-2xs sm:text-xs text-muted-foreground truncate max-w-xl">
                            {topSponsor.slogan}
                          </div>
                        ) : (
                          <div className="text-2xs text-muted-foreground/75 truncate">
                            {t('Founding Patron')}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="shrink-0 text-left sm:text-right pt-2 sm:pt-0 border-t sm:border-t-0 border-border/40">
                      {hasWebsite ? (
                        <span className="text-xs font-semibold text-primary group-hover:underline inline-flex items-center gap-1">
                          <Globe className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>{cleanDomain(topSponsor.website_url)}</span>
                          <ArrowUpRight className="h-3 w-3 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                        </span>
                      ) : (
                        <span className="text-2xs font-medium text-muted-foreground/70 inline-flex items-center gap-1">
                          <ShieldCheck className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                          <span>{t('Founding Patron')}</span>
                        </span>
                      )}
                    </div>
                  </CardWrapper>
                )
              })()}

              {/* Other Titans (Ranks 2+) */}
              {titans.length > 1 && (
                <div className={`grid grid-cols-1 ${titans.length === 2 ? 'sm:grid-cols-1 max-w-md' : 'sm:grid-cols-2 lg:grid-cols-3'} gap-3`}>
                  {titans.slice(1).map((sp, idx) => {
                    const rank = idx + 2
                    const rankInfo = getRankBadge(rank)
                    const hasWebsite = Boolean(sp.website_url && sp.website_url.trim().length > 0)
                    const CardWrapper = hasWebsite ? 'a' : 'div'
                    const wrapperProps = hasWebsite
                      ? {
                          href: safeUrl(sp.website_url),
                          target: '_blank',
                          rel: 'noopener noreferrer',
                          className: 'rounded-xl border border-border/70 bg-card p-3 shadow-2xs flex items-center justify-between gap-3 group hover:border-amber-500/40 hover:bg-muted/10 transition-all cursor-pointer',
                        }
                      : {
                          className: 'rounded-xl border border-border/70 bg-card p-3 shadow-2xs flex items-center justify-between gap-3 group',
                        }

                    return (
                      <CardWrapper key={sp.id} {...(wrapperProps as any)}>
                        <div className="flex items-center gap-2.5 min-w-0">
                          <SponsorAvatar sponsor={sp} size="sm" />
                          <div className="min-w-0">
                            <div className="flex items-center gap-1 text-[11px] font-semibold text-muted-foreground">
                              <Medal className={`h-3 w-3 ${rank === 2 ? 'text-amber-500' : 'text-slate-400'}`} />
                              <span>#{rank} {rankInfo.tierName}</span>
                            </div>
                            <div className="font-display font-semibold text-xs text-foreground transition-colors truncate">
                              {sp.brand_name}
                            </div>
                          </div>
                        </div>

                        <div className="shrink-0 text-right">
                          {hasWebsite ? (
                            <span className="text-2xs font-medium text-primary group-hover:underline inline-flex items-center gap-1">
                              <span className="truncate max-w-[120px]">{cleanDomain(sp.website_url)}</span>
                              <ArrowUpRight className="h-2.5 w-2.5 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                            </span>
                          ) : (
                            <span className="text-2xs text-muted-foreground/70 inline-flex items-center gap-1">
                              <ShieldCheck className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                              <span>{t('Terverifikasi')}</span>
                            </span>
                          )}
                        </div>
                      </CardWrapper>
                    )
                  })}
                </div>
              )}
            </div>
          )}

          {/* 2. Verified Business Partners Row */}
          {businesses.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-2xs font-semibold uppercase tracking-wider text-muted-foreground/80 mr-1">
                {t('Mitra Bisnis:')}
              </span>
              {businesses.map((sp) => (
                <a
                  key={sp.id}
                  href={safeUrl(sp.website_url)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-border/60 bg-card hover:bg-muted/40 hover:border-foreground/30 text-xs font-medium text-foreground transition-all shadow-2xs group"
                >
                  <SponsorAvatar sponsor={sp} size="xs" />
                  <span className="font-semibold text-foreground/90">{sp.brand_name}</span>
                  <ArrowUpRight className="h-3 w-3 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
              ))}
            </div>
          )}

          {/* 3. Community Backers Appreciation & Directory Link */}
          <div className="pt-3 border-t border-border/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>
                {t('Didukung oleh')} <strong className="font-semibold text-foreground">{count} {t('Founding Backers')}</strong> {t('yang mendanai rilis publik v1.0.')}
              </span>
            </div>

            <Link
              to="/sponsor#directory"
              className="font-semibold text-primary hover:underline inline-flex items-center gap-1 shrink-0"
            >
              <span>{t('Lihat Wall of Fame Lengkap')}</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      )}
    </section>
  )
}
