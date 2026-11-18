import { ArrowRight, Globe, Sparkles, Star, ExternalLink, AlertTriangle } from 'lucide-react'
import {
  BcaIcon,
  StripeIcon,
  GithubIcon,
  FacebookIcon,
  SubstackIcon,
} from '../../../components/brand/BrandIcons'
import { useLanguage } from '../../../context/LanguageContext'
import { SPONSORWARE_TARGET } from '../types'

interface SponsorHeroProps {
  onScrollToCheckout: () => void
  sponsorCount?: number
  target?: number
}

export function SponsorHero({
  onScrollToCheckout,
  sponsorCount = 100,
  target = SPONSORWARE_TARGET,
}: SponsorHeroProps) {
  const { t } = useLanguage()
  const percent = Math.min(100, Math.round((sponsorCount / target) * 100))
  const isTargetMet = sponsorCount >= target

  return (
    <>
      {/* Hero Section */}
      <section className="mx-auto max-w-4xl px-4 pt-10 pb-8 text-center sm:px-8 sm:pt-14 sm:pb-10">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3.5 py-1 text-xs font-medium text-emerald-800 dark:text-emerald-300 mb-4 shadow-2xs">
          <Sparkles className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>
            {isTargetMet
              ? t('🎉 Target 100 Sponsor Tercapai (100%) · Repositori Publik Dibuka')
              : t('Sponsorware · Target 100 Sponsor')}
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:leading-[1.12] tracking-tight text-foreground text-balance">
          {isTargetMet ? (
            <>
              <span className="font-display font-bold">{t('Komitmen Terpenuhi: Cuan Resmi')}</span>{' '}
              <span className="font-serif italic font-normal text-foreground/90 whitespace-nowrap">
                {t('Open Source!')}
              </span>
            </>
          ) : (
            <>
              <span className="font-display font-bold">{t('Bantu Rilis Cuan v1.0 Jadi')}</span>{' '}
              <span className="font-serif italic font-normal text-foreground/90 whitespace-nowrap">
                {t('Open Source.')}
              </span>
            </>
          )}
        </h1>

        <p className="mt-4 text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto text-balance">
          {isTargetMet
            ? t(
                'Berkat 100 Founding Backers yang luar biasa, repositori Cuan resmi dibuka untuk publik sebagai Public Alpha (Developer Preview). Dukungan sukarela tetap dibuka bagi rekan yang ingin mendukung pematangan fitur dan percepatan rilis stabil.',
              )
            : t(
                'Script Cuan saat ini dalam tahap pengembangan aktif dan akan dirilis gratis di GitHub saat 100 sponsor komunitas terpenuhi. Dukung mulai Rp 100.000 (Bayar Suka-Suka) untuk mencoba akses private repo v0.9 hari ini.',
              )}
        </p>

        {/* Milestone Progress Card */}
        <div className="mx-auto max-w-md mt-6 mb-7 rounded-2xl border border-border/70 bg-card p-4 sm:p-5 shadow-2xs text-left space-y-2.5">
          <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-foreground">
            <span className="text-muted-foreground">{t('Progress Menuju Rilis Publik')}</span>
            <span className="font-mono font-bold text-foreground tabular-nums">
              {sponsorCount} / {target}
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-muted/80 overflow-hidden">
            <div
              className="h-full rounded-full bg-emerald-500 transition-all duration-500"
              style={{ width: `${percent}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>
              {isTargetMet
                ? t('Target 100 sponsor tercapai! Repositori dibuka di GitHub')
                : `${target - sponsorCount} ${t('sponsor lagi menuju rilis gratis')}`}
            </span>
            <span className="font-mono font-semibold text-emerald-600 dark:text-emerald-400">
              {percent}%
            </span>
          </div>
        </div>

        {/* Public Alpha Stability Notice Callout */}
        <div className="max-w-xl mx-auto mb-6 rounded-xl border border-amber-500/40 bg-amber-500/5 dark:bg-amber-500/10 px-4 py-2.5 text-left text-xs text-muted-foreground">
          <div className="flex items-start gap-2.5">
            <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <p className="text-foreground/85 leading-relaxed">
              <strong className="text-foreground">{t('Notice Kestabilan (Fase Alpha):')}</strong>{' '}
              {t(
                'Cuan masih berstatus Public Alpha (Developer Preview) dan belum stabil untuk operasional bisnis utama (*production*). Kami mengajak komunitas untuk ikut mencoba, mengeksplorasi kode, dan melaporkan kendala/bug di GitHub Issues.',
              )}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://github.com/buchin/cuan"
            target="_blank"
            rel="noreferrer"
            className="action-primary w-full sm:w-auto min-h-11 px-6 text-sm font-semibold inline-flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
          >
            <Star className="h-4 w-4 fill-current text-amber-300" />
            <span>{t('Buka buchin/cuan di GitHub ⭐')}</span>
            <ExternalLink className="h-3.5 w-3.5 opacity-80" />
          </a>
          <a
            href="#directory"
            className="action-secondary min-h-11 px-5 text-sm font-semibold inline-flex items-center gap-2"
          >
            <span>{t('Hall of Fame 100 Backer')}</span>
          </a>
          <button
            type="button"
            onClick={onScrollToCheckout}
            className="action-secondary min-h-11 px-5 text-sm font-semibold inline-flex items-center gap-2 cursor-pointer"
          >
            <span>{t('Dukung Proyek (Sponsor Baru)')}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>

      {/* Value Highlights Cards */}
      <section className="mx-auto max-w-5xl px-4 sm:px-8 mb-16">
        <div className="grid gap-4 sm:gap-5 sm:grid-cols-3">
          {/* Highlight 1 */}
          <div className="rounded-2xl border border-border/60 bg-card p-5 sm:p-6 shadow-2xs text-left flex flex-col justify-between">
            <div>
              <div className="mb-3.5 flex items-center gap-2.5 text-foreground/80">
                <GithubIcon className="h-5 w-5 shrink-0" aria-label="GitHub" />
                <Globe className="h-5 w-5 text-foreground/80 shrink-0" strokeWidth={1.75} aria-label="cuan.work" />
              </div>
              <h3 className="font-display text-sm sm:text-base font-bold text-foreground">
                {t('Akses Private Repo & Backlink')}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {t(
                  'Dapatkan invite instan ke private GitHub repo Cuan hari ini juga, serta pencantuman nama brand & backlink dofollow permanen di web resmi.',
                )}
              </p>
            </div>
          </div>

          {/* Highlight 2 */}
          <div className="rounded-2xl border border-border/60 bg-card p-5 sm:p-6 shadow-2xs text-left flex flex-col justify-between">
            <div>
              <div className="mb-3.5 flex items-center gap-2.5 text-foreground/80">
                <FacebookIcon className="h-5 w-5 shrink-0" aria-label="Facebook" />
                <SubstackIcon className="h-5 w-5 shrink-0" aria-label="Substack" />
              </div>
              <h3 className="font-display text-sm sm:text-base font-bold text-foreground">
                {t('Sorotan ke 63.000+ Audiens')}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {t(
                  'Sponsor Titan mendapatkan sorotan berkala melalui akun Facebook Buchin (50.000+ pengikut) dan newsletter mingguan Dojo (13.000+ subscriber).',
                )}
              </p>
            </div>
          </div>

          {/* Highlight 3 */}
          <div className="rounded-2xl border border-border/60 bg-card p-5 sm:p-6 shadow-2xs text-left flex flex-col justify-between">
            <div>
              <div className="mb-3.5 flex items-center gap-3 text-foreground/85">
                <BcaIcon className="h-4 w-auto fill-current" />
                <span className="text-border/80 text-xs font-mono select-none">/</span>
                <StripeIcon className="h-4 w-auto fill-current" />
              </div>
              <h3 className="font-display text-sm sm:text-base font-bold text-foreground">
                {t('Bayar Suka-Suka (Min. Rp 100rb)')}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {t(
                  'Satu kali pembayaran tanpa biaya langganan berulang. Mendukung Transfer Bank BCA (Lokal) dan Stripe (Internasional) via Dojo Checkout yang aman.',
                )}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
