import { Sparkles, ArrowRight, Globe } from 'lucide-react'
import { BcaIcon, StripeIcon } from '../../../components/brand/BrandIcons'
import { useLanguage } from '../../../context/LanguageContext'
import { SPONSORWARE_TARGET } from '../types'

interface SponsorHeroProps {
  onScrollToCheckout: () => void
  sponsorCount?: number
  target?: number
}

export function SponsorHero({
  onScrollToCheckout,
  sponsorCount = 29,
  target = SPONSORWARE_TARGET,
}: SponsorHeroProps) {
  const { t } = useLanguage()
  const percent = Math.min(100, Math.round((sponsorCount / target) * 100))
  const remaining = Math.max(0, target - sponsorCount)

  return (
    <>
      {/* Hero Section */}
      <section className="mx-auto max-w-4xl px-6 pt-12 pb-10 text-center sm:px-8 sm:pt-16 sm:pb-12">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/40 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-foreground/80">
          <Sparkles className="h-3.5 w-3.5 text-amber-500" />
          <span>{t('Sponsorware · Rilis Open Source v1.0')}</span>
        </div>

        <h1 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:leading-[1.1]">
          {t('Bantu Rilis Cuan v1.0 Jadi Open Source')}
        </h1>

        <p className="mt-4 text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          {t(
            'Script Cuan saat ini dalam tahap pengembangan aktif dan akan dirilis gratis di GitHub saat 100 sponsor komunitas terpenuhi. Dukung mulai Rp 100.000 (Bayar Suka-Suka) untuk mencoba akses private repo v0.9 hari ini.',
          )}
        </p>

        {/* Milestone Progress Bar Card (Calm Things 3 style) */}
        <div className="mx-auto max-w-lg mt-6 mb-7 rounded-2xl border border-border/80 bg-card p-4 sm:p-5 shadow-2xs text-left space-y-2.5">
          <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-foreground">
            <span>{t('Milestone Rilis Repositori Publik:')}</span>
            <span className="font-mono text-primary font-bold">
              {sponsorCount} / {target} {t('Sponsor')}
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-muted/80 overflow-hidden">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500"
              style={{ width: `${percent}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-2xs text-muted-foreground">
            <span>
              {remaining === 0
                ? t('Target tercapai! Mempersiapkan rilis gratis v1.0')
                : `${remaining} ${t('sponsor lagi menuju rilis gratis')}`}
            </span>
            <span className="font-mono font-medium">{percent}%</span>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={onScrollToCheckout}
            className="action-primary min-h-11 px-6 text-sm font-semibold inline-flex items-center gap-2 cursor-pointer"
          >
            <span>{t('Buka Akses Private Repo (Mulai Rp 100rb)')}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
          <a
            href="#faq"
            className="action-secondary min-h-11 px-6 text-sm font-semibold inline-flex items-center gap-2"
          >
            <span>{t('Pelajari FAQ')}</span>
          </a>
        </div>
      </section>

      {/* Value Highlights */}
      <section className="mx-auto max-w-5xl px-6 sm:px-8 mb-16">
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-2xs">
            <div className="mb-3.5 flex items-center gap-2.5 text-foreground/80">
              <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" aria-label="GitHub">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              <Globe className="h-5 w-5 text-foreground/80" strokeWidth={1.75} aria-label="cuan.work" />
            </div>
            <h3 className="font-display text-base font-bold text-foreground">
              {t('Akses Private Repo & Backlink')}
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {t(
                'Dapatkan invite instan ke private GitHub repo Cuan hari ini juga, serta pencantuman nama brand & backlink dofollow permanen di web resmi.',
              )}
            </p>
          </div>

          <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-2xs">
            <div className="mb-3.5 flex items-center gap-2.5 text-foreground/80">
              <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" aria-label="Facebook">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" aria-label="Substack">
                <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
              </svg>
            </div>
            <h3 className="font-display text-base font-bold text-foreground">
              {t('Sorotan ke 63.000+ Audiens')}
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {t(
                'Sponsor Titan mendapatkan sorotan berkala melalui akun Facebook Buchin (50.000+ pengikut) dan newsletter mingguan Dojo (13.000+ subscriber).',
              )}
            </p>
          </div>

          <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-2xs">
            <div className="mb-3.5 flex items-center gap-3 text-foreground/85">
              <BcaIcon className="h-5 w-auto fill-current" />
              <span className="text-border/80 text-xs font-mono select-none">/</span>
              <StripeIcon className="h-4.5 w-auto fill-current" />
            </div>
            <h3 className="font-display text-base font-bold text-foreground">
              {t('Bayar Suka-Suka (Min. Rp 100rb)')}
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
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
