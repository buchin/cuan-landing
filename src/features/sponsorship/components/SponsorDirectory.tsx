import { Sparkles, Globe, ExternalLink, ArrowUpRight, ShieldCheck, Heart } from 'lucide-react'
import { SponsorItem, getRankBadge } from '../types'
import { useLanguage } from '../../../context/LanguageContext'

interface SponsorDirectoryProps {
  sponsors: SponsorItem[]
  totalCount?: number
}

function cleanDomain(url?: string): string {
  if (!url) return ''
  return url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')
}

function getInitials(name: string): string {
  if (!name) return '?'
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

export function SponsorDirectory({ sponsors, totalCount }: SponsorDirectoryProps) {
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
            {totalCount ? `${totalCount} ${t('Sponsor Terverifikasi')}` : t('Direktori Resmi')} · {t('Komunitas Founding Backers')}
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

      {/* 1. TOP FOUNDING TITANS (Tier Rp 300.000+) */}
      {titans.length > 0 && (
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-border/40">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-500" />
              <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground">
                {t('Founding Titans (Top Tier)')}
              </h3>
            </div>
            <span className="text-2xs text-muted-foreground">
              {titans.length} {t('Sponsor Teratas')}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {titans.map((sp, index) => {
              const rank = index + 1
              const rankInfo = getRankBadge(rank)
              const logoSrc = sp.logo_url || (sp.logo_path ? `/uploads/sponsors/logos/${sp.logo_path}` : null)
              const hasWebsite = Boolean(sp.website_url && sp.website_url.trim().length > 0)

              return (
                <div
                  key={sp.id}
                  className="rounded-2xl border border-amber-500/30 bg-card p-5 shadow-2xs hover:border-amber-500/60 transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Header: Rank + Tier */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-2xs font-semibold border ${rankInfo.className}`}
                      >
                        {rankInfo.label}
                      </span>
                      <span className="text-2xs font-mono text-muted-foreground">
                        Titan Backer
                      </span>
                    </div>

                    {/* Brand Info */}
                    <div className="flex items-start gap-3 mt-1">
                      {logoSrc ? (
                        <div className="h-10 w-10 rounded-xl border border-border/60 bg-muted/30 p-1 flex items-center justify-center shrink-0">
                          <img src={logoSrc} alt={sp.brand_name} className="h-full w-full object-contain" />
                        </div>
                      ) : (
                        <div className="h-10 w-10 rounded-xl border border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-400 font-display font-bold text-sm flex items-center justify-center shrink-0">
                          {getInitials(sp.brand_name)}
                        </div>
                      )}

                      <div className="min-w-0 flex-1">
                        <h4 className="font-display font-bold text-base text-foreground truncate">
                          {sp.brand_name}
                        </h4>
                        {sp.slogan ? (
                          <p className="text-xs text-muted-foreground italic mt-0.5 line-clamp-2">
                            "{sp.slogan}"
                          </p>
                        ) : (
                          <p className="text-2xs text-muted-foreground mt-0.5">
                            {t('Founding Sponsor Cuan v1.0')}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Bottom: Link / Website */}
                  <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between text-xs">
                    {hasWebsite ? (
                      <a
                        href={sp.website_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-semibold text-primary hover:underline group-hover:text-primary"
                      >
                        <Globe className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="truncate max-w-[180px]">{cleanDomain(sp.website_url)}</span>
                        <ArrowUpRight className="h-3.5 w-3.5 opacity-70 group-hover:opacity-100 transition-opacity" />
                      </a>
                    ) : (
                      <span className="text-2xs text-muted-foreground inline-flex items-center gap-1">
                        <Heart className="h-3 w-3 text-rose-500/70" />
                        {t('Founding Supporter')}
                      </span>
                    )}

                    <span className="text-2xs font-mono text-muted-foreground/70">
                      Verified
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {businessesWithWebsite.map((sp) => (
              <a
                key={sp.id}
                href={sp.website_url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-border/70 bg-card p-4 shadow-2xs hover:border-primary/50 hover:bg-muted/30 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-display font-semibold text-sm text-foreground group-hover:text-primary transition-colors truncate">
                      {sp.brand_name}
                    </h4>
                    <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                  </div>
                  {sp.slogan && (
                    <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                      {sp.slogan}
                    </p>
                  )}
                </div>

                <div className="mt-3 pt-2.5 border-t border-border/40 flex items-center justify-between text-2xs text-muted-foreground">
                  <span className="font-mono text-primary/80 group-hover:underline truncate max-w-[200px]">
                    {cleanDomain(sp.website_url)}
                  </span>
                  <span>Dofollow</span>
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

          <div className="flex flex-wrap items-center gap-2">
            {communityBackers.map((sp) => (
              <span
                key={sp.id}
                className="text-xs font-medium text-foreground/80 px-3 py-1.5 rounded-lg border border-border/50 bg-card shadow-2xs inline-flex items-center gap-1.5"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/80" />
                <span>{sp.brand_name}</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Verification Footer Note */}
      <div className="mt-10 p-4 rounded-xl border border-border/50 bg-muted/20 text-center text-xs text-muted-foreground">
        <span>
          {t('Daftar ini diperbarui secara otomatis dari sistem verifikasi transaksi.')}{' '}
        </span>
        <a
          href="#checkout"
          className="font-semibold text-primary hover:underline inline-flex items-center gap-1 ml-1"
        >
          <span>{t('Dukung Cuan v1.0 & Cantumkan Bisnis Anda')}</span>
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </section>
  )
}
