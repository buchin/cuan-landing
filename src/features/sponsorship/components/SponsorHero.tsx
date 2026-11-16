import { ArrowRight, Globe } from 'lucide-react'
import {
  GithubIcon,
  FacebookIcon,
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
      {/* Hero Section (Calm Things 3 / Bear Notes Canvas) */}
      <section className="mx-auto max-w-3xl px-4 pt-10 pb-8 text-center sm:px-8 sm:pt-14 sm:pb-10">
        <p className="text-[11px] font-medium text-muted-foreground/75 mb-2">
          {t('Target 100 Sponsor Komunitas')}
        </p>

        <h1 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground text-balance leading-tight">
          {t('Bantu Rilis Cuan v1.0 Jadi Open Source')}
        </h1>

        <p className="mt-3 text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed max-w-xl mx-auto text-balance">
          {t(
            'Script Cuan saat ini dalam tahap pengembangan aktif dan akan dirilis gratis di GitHub saat 100 sponsor komunitas terpenuhi. Dukung mulai Rp 100.000 (Bayar Suka-Suka) untuk mencoba akses private repo v0.9 hari ini.',
          )}
        </p>

        {/* Milestone Progress Indicator (Flat Things 3 Canvas, Zero Boxed Borders) */}
        <div className="mx-auto max-w-md mt-6 mb-7 text-left space-y-1.5">
          <div className="flex items-center justify-between text-xs font-medium">
            <span className="text-muted-foreground">{t('Progress Menuju Rilis Publik:')}</span>
            <span className="font-mono font-semibold text-foreground tabular-nums">
              {sponsorCount} / {target} <span className="text-primary font-normal">({percent}%)</span>
            </span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-muted/60 overflow-hidden">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500"
              style={{ width: `${percent}%` }}
            />
          </div>
          <p className="text-2xs text-muted-foreground/80 text-center pt-0.5">
            {remaining === 0
              ? t('Target tercapai! Mempersiapkan rilis publik v1.0')
              : `${remaining} ${t('sponsor lagi menuju rilis gratis di GitHub')}`}
          </p>
        </div>

        {/* Single Focused Action + Quiet Links */}
        <div className="flex flex-col items-center gap-2.5">
          <button
            type="button"
            onClick={onScrollToCheckout}
            className="action-primary w-full sm:w-auto px-6 text-sm font-semibold inline-flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
          >
            <span>{t('Buka Akses Private Repo (Mulai Rp 100rb)')}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-3 text-xs text-muted-foreground pt-1">
            <a href="#directory" className="hover:text-foreground transition-colors">
              {t('Lihat Direktori Sponsor')} ↓
            </a>
            <span className="text-border">·</span>
            <a href="#faq" className="hover:text-foreground transition-colors">
              {t('FAQ')} ↓
            </a>
          </div>
        </div>
      </section>

      {/* Value Reassurances (Quiet 3-Col Inline Strip, Zero Box Clutter) */}
      <section className="mx-auto max-w-4xl px-4 sm:px-8 mb-14">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 text-left py-3 border-y border-border/40">
          <div className="flex items-start gap-2.5">
            <GithubIcon className="h-4 w-4 text-foreground/80 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs sm:text-sm font-semibold text-foreground">
                {t('Akses Private Repo & Backlink')}
              </h4>
              <p className="text-2xs sm:text-xs text-muted-foreground leading-relaxed mt-0.5">
                {t('Invite instan ke private repo GitHub Cuan v0.9 & tautan dofollow permanen.')}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <FacebookIcon className="h-4 w-4 text-foreground/80 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs sm:text-sm font-semibold text-foreground">
                {t('Sorotan ke 63.000+ Audiens')}
              </h4>
              <p className="text-2xs sm:text-xs text-muted-foreground leading-relaxed mt-0.5">
                {t('Sorotan berkala di Facebook Buchin (50k+) dan buletin mingguan Dojo (13k+).')}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <Globe className="h-4 w-4 text-foreground/80 shrink-0 mt-0.5" strokeWidth={1.75} />
            <div>
              <h4 className="text-xs sm:text-sm font-semibold text-foreground">
                {t('Bayar Suka-Suka (Min. 100rb)')}
              </h4>
              <p className="text-2xs sm:text-xs text-muted-foreground leading-relaxed mt-0.5">
                {t('Satu kali bayar tanpa langganan. Mendukung Transfer BCA & Stripe via Dojo.')}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
