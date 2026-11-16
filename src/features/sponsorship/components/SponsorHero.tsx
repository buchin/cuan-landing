import { Sparkles, ArrowRight, Globe } from 'lucide-react'
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
  sponsorCount = 58,
  target = SPONSORWARE_TARGET,
}: SponsorHeroProps) {
  const { t } = useLanguage()
  const percent = Math.min(100, Math.round((sponsorCount / target) * 100))
  const remaining = Math.max(0, target - sponsorCount)

  return (
    <>
      {/* Hero Section */}
      <section className="mx-auto max-w-4xl px-4 pt-12 pb-10 text-center sm:px-8 sm:pt-16 sm:pb-12">
        <div className="mb-3 text-2xs sm:text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center justify-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 text-amber-500/80" />
          <span>{t('Sponsorware · Rilis Open Source v1.0')}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:leading-[1.12] tracking-tight text-foreground text-balance">
          <span className="font-display font-bold">{t('Bantu Rilis Cuan v1.0 Jadi')}</span>{' '}
          <span className="font-serif italic font-normal text-foreground/90 whitespace-nowrap">{t('Open Source.')}</span>
        </h1>

        <p className="mt-4 text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto text-balance">
          {t(
            'Script Cuan saat ini dalam tahap pengembangan aktif dan akan dirilis gratis di GitHub saat 100 sponsor komunitas terpenuhi. Dukung mulai Rp 100.000 (Bayar Suka-Suka) untuk mencoba akses private repo v0.9 hari ini.',
          )}
        </p>

        {/* Milestone Progress Indicator (Calm Things 3 / Bear Notes style) */}
        <div className="mx-auto max-w-md mt-6 mb-7 rounded-xl border border-border/60 bg-muted/20 px-4 py-3.5 text-left space-y-2">
          <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-foreground">
            <span className="text-muted-foreground">{t('Progress Menuju Rilis Publik:')}</span>
            <span className="font-mono font-bold text-foreground">
              {sponsorCount} / {target} <span className="text-primary font-normal">({percent}%)</span>
            </span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-muted/80 overflow-hidden">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500"
              style={{ width: `${percent}%` }}
            />
          </div>
          <div className="text-2xs text-muted-foreground text-center">
            {remaining === 0
              ? t('Target tercapai! Mempersiapkan rilis publik v1.0')
              : `${remaining} ${t('sponsor lagi menuju rilis gratis di GitHub')}`}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={onScrollToCheckout}
            className="action-primary w-full sm:w-auto max-w-full min-h-11 px-5 text-sm font-semibold inline-flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{t('Buka Akses Private Repo (Mulai Rp 100rb)')}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
          <a
            href="#directory"
            className="action-secondary min-h-11 px-5 text-sm font-semibold inline-flex items-center gap-2"
          >
            <span>{t('Lihat Direktori Sponsor')}</span>
          </a>
          <a
            href="#faq"
            className="action-secondary min-h-11 px-5 text-sm font-semibold inline-flex items-center gap-2"
          >
            <span>{t('FAQ')}</span>
          </a>
        </div>
      </section>

      {/* Value Highlights (Apple Inset Grouped on Mobile, 3-Col Grid on Desktop) */}
      <section className="mx-auto max-w-5xl px-4 sm:px-8 mb-16">
        <div className="rounded-2xl border border-border/60 bg-card shadow-2xs divide-y divide-border/40 sm:divide-y-0 sm:grid sm:grid-cols-3 sm:gap-5 sm:bg-transparent sm:border-0 sm:shadow-none">
          {/* Highlight 1 */}
          <div className="p-5 sm:p-6 sm:rounded-2xl sm:border sm:border-border/60 sm:bg-card sm:shadow-2xs">
            <div className="mb-3 flex items-center gap-2.5 text-foreground/80">
              <GithubIcon className="h-5 w-5 shrink-0" aria-label="GitHub" />
              <Globe className="h-5 w-5 text-foreground/80 shrink-0" strokeWidth={1.75} aria-label="cuan.work" />
            </div>
            <h3 className="font-display text-sm sm:text-base font-bold text-foreground">
              {t('Akses Private Repo & Backlink')}
            </h3>
            <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {t(
                'Dapatkan invite instan ke private GitHub repo Cuan hari ini juga, serta pencantuman nama brand & backlink dofollow permanen di web resmi.',
              )}
            </p>
          </div>

          {/* Highlight 2 */}
          <div className="p-5 sm:p-6 sm:rounded-2xl sm:border sm:border-border/60 sm:bg-card sm:shadow-2xs">
            <div className="mb-3 flex items-center gap-2.5 text-foreground/80">
              <FacebookIcon className="h-5 w-5 shrink-0" aria-label="Facebook" />
              <SubstackIcon className="h-5 w-5 shrink-0" aria-label="Substack" />
            </div>
            <h3 className="font-display text-sm sm:text-base font-bold text-foreground">
              {t('Sorotan ke 63.000+ Audiens')}
            </h3>
            <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {t(
                'Sponsor Titan mendapatkan sorotan berkala melalui akun Facebook Buchin (50.000+ pengikut) dan newsletter mingguan Dojo (13.000+ subscriber).',
              )}
            </p>
          </div>

          {/* Highlight 3 */}
          <div className="p-5 sm:p-6 sm:rounded-2xl sm:border sm:border-border/60 sm:bg-card sm:shadow-2xs">
            <div className="mb-3 flex items-center gap-3 text-foreground/85">
              <BcaIcon className="h-4 w-auto fill-current" />
              <span className="text-border/80 text-xs font-mono select-none">/</span>
              <StripeIcon className="h-4 w-auto fill-current" />
            </div>
            <h3 className="font-display text-sm sm:text-base font-bold text-foreground">
              {t('Bayar Suka-Suka (Min. Rp 100rb)')}
            </h3>
            <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {t(
                'Satu kali pembayaran tanpa biaya langganan berulang. Mendukung Transfer Bank BCA (Lokal) dan Stripe (Internasional) via Dojo Checkout yang aman.',
              )}
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
