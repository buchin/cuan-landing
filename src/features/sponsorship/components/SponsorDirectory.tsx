import { Globe, ArrowUpRight, ShieldCheck, Heart, Crown, Medal, ExternalLink } from 'lucide-react'
import { SponsorItem, getRankBadge } from '../types'
import { useLanguage } from '../../../context/LanguageContext'
import { SponsorAvatar } from './SponsorAvatar'

interface SponsorDirectoryProps {
  sponsors: SponsorItem[]
  totalCount?: number
}

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

export function SponsorDirectory({ sponsors, totalCount = 58 }: SponsorDirectoryProps) {
  const { t } = useLanguage()

  if (!sponsors || sponsors.length === 0) {
    return null
  }

  // 1. Top Titans: amount_idr >= 200_000 (Rp 300k tier with unique transfer code)
  const titans = sponsors.filter((sp) => (sp.amount_idr || 0) >= 200_000)

  // 2. Verified Businesses with Website (excluding titans already shown)
  const businessesWithWebsite = sponsors.filter(
    (sp) =>
      (sp.amount_idr || 0) < 200_000 &&
      Boolean(sp.website_url && sp.website_url.trim().length > 0)
  )

  // 3. Community Backers (without website)
  const communityBackers = sponsors.filter(
    (sp) =>
      (sp.amount_idr || 0) < 200_000 &&
      (!sp.website_url || sp.website_url.trim().length === 0)
  )

  return (
    <section id="directory" className="mx-auto max-w-5xl px-6 sm:px-8 mb-24 scroll-mt-20">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/40 px-3.5 py-1 text-xs font-semibold text-foreground/80">
          <ShieldCheck className="h-3.5 w-3.5 text-primary" />
          <span>
            {totalCount} {t('Sponsor Terverifikasi')}
          </span>
        </div>
        <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          {t('Wall of Fame & Direktori Sponsor')}
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          {t(
            'Apresiasi mendalam bagi para perintis dan pendukung awal yang mendanai rilis publik Cuan v1.0. Tautan bisnis dan profil resmi terverifikasi.'
          )}
        </p>
      </div>

      {/* 1. TOP FOUNDING TITANS (Top Tier) */}
      {titans.length > 0 && (
        <div className="mb-12 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-border/40">
            <div className="flex items-center gap-2">
              <Crown className="h-4 w-4 text-amber-500" />
              <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground">
                {t('Founding Titans (Top Tier)')}
              </h3>
            </div>
            <span className="text-2xs text-muted-foreground">
              {titans.length} {t('Sponsor Teratas')}
            </span>
          </div>

          {/* SPOTLIGHT: #1 Platinum Titan (Hero Full-Width Spotlight Card) */}
          {(() => {
            const topSponsor = titans[0]
            const hasWebsite = Boolean(topSponsor.website_url && topSponsor.website_url.trim().length > 0)
            const CardWrapper = hasWebsite ? 'a' : 'div'
            const wrapperProps = hasWebsite
              ? {
                  href: safeUrl(topSponsor.website_url),
                  target: '_blank',
                  rel: 'noopener noreferrer',
                  className: 'rounded-2xl border border-amber-500/30 bg-card p-6 sm:p-7 shadow-2xs hover:border-amber-500/60 hover:bg-muted/10 transition-all flex flex-col justify-between group cursor-pointer',
                }
              : {
                  className: 'rounded-2xl border border-amber-500/30 bg-card p-6 sm:p-7 shadow-2xs flex flex-col justify-between group',
                }

            return (
              <CardWrapper key={topSponsor.id} {...(wrapperProps as any)}>
                <div>
                  {/* Header: Pure Typography Rank (Zero Nested Box, No Gimmicks) */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-700 dark:text-amber-400">
                      <Crown className="h-4 w-4 text-amber-500" />
                      <span>#1 Platinum Titan</span>
                    </div>
                    <span className="text-2xs font-medium text-muted-foreground/70">
                      {t('Sponsor Utama')}
                    </span>
                  </div>

                  {/* Brand / Person Info */}
                  <div className="flex items-start sm:items-center gap-4 sm:gap-5">
                    <SponsorAvatar sponsor={topSponsor} size="xl" />

                    <div className="min-w-0 flex-1">
                      <h4 className="font-display font-bold text-lg sm:text-xl text-foreground transition-colors">
                        {topSponsor.brand_name}
                      </h4>

                      {topSponsor.slogan ? (
                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mt-1 max-w-2xl">
                          {topSponsor.slogan}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </div>

                {/* Bottom: Hairline Link / Verification (Things 3 Style) */}
                <div className="mt-5 pt-3.5 border-t border-border/40 flex items-center justify-between text-xs">
                  {hasWebsite ? (
                    <span className="inline-flex items-center gap-1.5 font-semibold text-primary group-hover:underline transition-colors">
                      <Globe className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="truncate max-w-[240px]">{cleanDomain(topSponsor.website_url)}</span>
                      <ArrowUpRight className="h-3.5 w-3.5 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </span>
                  ) : (
                    <span className="text-2xs text-muted-foreground inline-flex items-center gap-1.5 font-medium">
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>{t('Founding Patron')}</span>
                    </span>
                  )}
                  <span className="text-2xs text-muted-foreground/60 inline-flex items-center gap-1">
                    <ShieldCheck className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                    <span>{t('Terverifikasi')}</span>
                  </span>
                </div>
              </CardWrapper>
            )
          })()}

          {/* Ranks 2+ (Gold, Silver, Bronze Titans Grid) */}
          {titans.length > 1 && (
            <div className={`grid grid-cols-1 gap-4 ${titans.length <= 3 ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3'}`}>
              {titans.slice(1).map((sp, index) => {
                const rank = index + 2
                const rankInfo = getRankBadge(rank)
                const hasWebsite = Boolean(sp.website_url && sp.website_url.trim().length > 0)
                const CardWrapper = hasWebsite ? 'a' : 'div'
                const wrapperProps = hasWebsite
                  ? {
                      href: safeUrl(sp.website_url),
                      target: '_blank',
                      rel: 'noopener noreferrer',
                      className: 'rounded-2xl border border-border/70 bg-card p-5 shadow-2xs hover:border-amber-500/40 hover:bg-muted/10 transition-all flex flex-col justify-between group cursor-pointer',
                    }
                  : {
                      className: 'rounded-2xl border border-border/70 bg-card p-5 shadow-2xs flex flex-col justify-between group',
                    }

                return (
                  <CardWrapper key={sp.id} {...(wrapperProps as any)}>
                    <div>
                      {/* Header: Pure Typography Rank (Calm, Zero Redundancy) */}
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-700 dark:text-amber-400 mb-3">
                        {rank === 2 && <Medal className="h-3.5 w-3.5 text-amber-500" />}
                        {rank >= 3 && <Medal className="h-3.5 w-3.5 text-slate-400" />}
                        <span>#{rank} {rankInfo.tierName}</span>
                      </div>

                      {/* Brand / Person Info */}
                      <div className="flex items-start gap-3.5 mt-1.5">
                        <SponsorAvatar sponsor={sp} size="lg" />

                        <div className="min-w-0 flex-1">
                          <h4 className="font-display font-bold text-base text-foreground transition-colors truncate">
                            {sp.brand_name}
                          </h4>
                          {sp.slogan ? (
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
                              {sp.slogan}
                            </p>
                          ) : null}
                        </div>
                      </div>
                    </div>

                    {/* Bottom: Hairline Link / Verification */}
                    <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between text-xs">
                      {hasWebsite ? (
                        <span className="inline-flex items-center gap-1.5 font-semibold text-primary group-hover:underline transition-colors">
                          <Globe className="h-3.5 w-3.5 text-muted-foreground" />
                          <span className="truncate max-w-[200px]">{cleanDomain(sp.website_url)}</span>
                          <ArrowUpRight className="h-3.5 w-3.5 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                        </span>
                      ) : (
                        <span className="text-2xs text-muted-foreground inline-flex items-center gap-1.5 font-medium">
                          <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                          <span>{t('Founding Backer')}</span>
                        </span>
                      )}
                      <span className="text-2xs text-muted-foreground/60">{t('Terverifikasi')}</span>
                    </div>
                  </CardWrapper>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* 2. VERIFIED BUSINESSES & PROJECTS (With Website & Slogan) */}
      {businessesWithWebsite.length > 0 && (
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-border/40">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-primary" />
              <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground">
                {t('Bisnis & Proyek Terverifikasi')}
              </h3>
            </div>
            <span className="text-2xs text-muted-foreground">
              {businessesWithWebsite.length} {t('Mitra Bisnis')}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {businessesWithWebsite.map((sp) => (
              <a
                key={sp.id}
                href={safeUrl(sp.website_url)}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-border/70 bg-card p-4 shadow-2xs hover:border-border/90 hover:bg-muted/10 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start gap-3">
                    <SponsorAvatar sponsor={sp} size="md" />
                    <div className="min-w-0 flex-1">
                      <h4 className="font-display font-semibold text-sm text-foreground transition-colors truncate">
                        {sp.brand_name}
                      </h4>
                      {sp.slogan ? (
                        <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5 leading-relaxed">
                          {sp.slogan}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </div>

                <div className="mt-3.5 pt-2.5 border-t border-border/40 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="text-xs text-muted-foreground/80 group-hover:text-primary transition-colors truncate max-w-[190px]">
                    {cleanDomain(sp.website_url)}
                  </span>
                  <span className="text-2xs font-medium text-muted-foreground/70 group-hover:text-primary transition-colors inline-flex items-center gap-1 shrink-0">
                    <span>{t('Kunjungi')}</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* 3. COMMUNITY FOUNDING BACKERS */}
      {communityBackers.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-border/40">
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-rose-500" />
              <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground">
                {t('Komunitas Founding Backers')}
              </h3>
            </div>
            <span className="text-2xs text-muted-foreground">
              {communityBackers.length} {t('Kontributor')}
            </span>
          </div>

          {/* Calm Roster Grid: Zero Pill Boxes, Clean Typography & Circular Avatars */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-5 gap-y-3.5 py-1">
            {communityBackers.map((sp) => (
              <div
                key={sp.id}
                className="flex items-center gap-2.5 min-w-0 py-0.5 group"
                title={sp.brand_name}
              >
                <SponsorAvatar sponsor={sp} size="sm" />
                <span className="text-xs font-medium text-foreground/85 group-hover:text-foreground truncate transition-colors">
                  {sp.brand_name}
                </span>
              </div>
            ))}
          </div>

          <p className="mt-4 pt-3 border-t border-border/30 text-xs text-muted-foreground/80 italic">
            {t('Serta para Founding Backers lainnya yang memilih mendukung rilis ini secara anonim.')}
          </p>
        </div>
      )}

      {/* Sponsor Self-Management & Privacy Callout */}
      <div className="mt-12 rounded-2xl border border-border/70 bg-card p-5 sm:p-6 shadow-2xs text-left">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="font-display font-semibold text-sm text-foreground flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <span>{t('Sudah menjadi Founding Backer?')}</span>
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-xl">
              {t(
                'Jika profil atau logo brand Anda belum tampil, ingin diperbarui, atau ingin disembunyikan demi privasi (mode anonim), Anda dapat mengelolanya kapan saja melalui tautan profil sponsor di email invoice atau dashboard Dojo Anda.'
              )}
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <a
              href="https://dojo.cc/support"
              target="_blank"
              rel="noopener noreferrer"
              className="action-secondary min-h-9 px-4 text-xs font-semibold inline-flex items-center gap-1.5"
            >
              <span>{t('Kelola Profil di Dojo')}</span>
              <ExternalLink className="h-3 w-3 opacity-70" />
            </a>
            <a
              href="#checkout"
              className="action-primary min-h-9 px-4 text-xs font-semibold inline-flex items-center gap-1.5"
            >
              <span>{t('Dukung Cuan v1.0')}</span>
              <ArrowUpRight className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
