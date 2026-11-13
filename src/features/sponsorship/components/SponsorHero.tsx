import { Heart, ArrowRight, Globe, CheckCircle2 } from 'lucide-react'
import { useLanguage } from '../../../context/LanguageContext'

interface SponsorHeroProps {
  onScrollToCheckout: () => void
}

export function SponsorHero({ onScrollToCheckout }: SponsorHeroProps) {
  const { t } = useLanguage()

  return (
    <>
      {/* Hero Section */}
      <section className="mx-auto max-w-4xl px-6 pt-12 pb-10 text-center sm:px-8 sm:pt-16 sm:pb-12">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/40 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-foreground/80">
          <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500/20" />
          <span>{t('Founding Era · Bayar Suka-Suka')}</span>
        </div>

        <h1 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:leading-[1.1]">
          {t('Dukung Peluncuran Cuan v1.0 & Pasang Logo Brand Anda')}
        </h1>

        <p className="mt-4 text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          {t(
            'Dukungan Anda diakui abadi di ekosistem Cuan. Pasang logo brand dan backlink dofollow permanen, raih sorotan ke puluhan ribu kreator & pebisnis digital, serta tentukan peringkat brand Anda di Leaderboard.',
          )}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={onScrollToCheckout}
            className="action-primary min-h-11 px-6 text-sm font-semibold inline-flex items-center gap-2 cursor-pointer"
          >
            <span>{t('Dukung Sekarang (Bayar Suka-Suka)')}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
          <a
            href="#leaderboard"
            className="action-secondary min-h-11 px-6 text-sm font-semibold inline-flex items-center gap-2"
          >
            <span>{t('Lihat Leaderboard')}</span>
          </a>
        </div>
      </section>

      {/* Value Highlights (Clean direct icons without nested boxes) */}
      <section className="mx-auto max-w-5xl px-6 sm:px-8 mb-16">
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-2xs">
            <Globe className="mb-3 h-5 w-5 text-foreground/80" strokeWidth={1.75} />
            <h3 className="font-display text-base font-bold text-foreground">
              {t('Logo & Dofollow Backlink')}
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {t(
                'Nama brand atau profil Anda dicantumkan secara permanen di GitHub README dan landing page resmi cuan.work dengan backlink dofollow untuk otoritas domain Anda.',
              )}
            </p>
          </div>

          <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-2xs">
            <div className="mb-3.5 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-border/70 bg-muted/40 px-2 py-1 text-2xs font-semibold text-foreground/90">
                <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span>50rb FB</span>
              </span>
              <span className="text-muted-foreground/60 text-xs">+</span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-border/70 bg-muted/40 px-2 py-1 text-2xs font-semibold text-foreground/90">
                <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
                </svg>
                <span>13rb+ Buletin</span>
              </span>
            </div>
            <h3 className="font-display text-base font-bold text-foreground">
              {t('Sorotan ke 63.000+ Audiens')}
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {t(
                'Dapatkan eksposur organik melalui postingan akun Facebook Buchin (50.000+ pengikut) dan newsletter mingguan Dojo (13.000+ pelanggan aktif kreator & pengusaha digital).',
              )}
            </p>
          </div>

          <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-2xs">
            <CheckCircle2 className="mb-3 h-5 w-5 text-foreground/80" strokeWidth={1.75} />
            <h3 className="font-display text-base font-bold text-foreground">
              {t('Sekali Bayar Suka-Suka')}
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {t(
                'Tanpa biaya langganan berulang. Anda berkontribusi dengan nominal suka-suka sesuai kemampuan, dan status sponsor Anda tercatat permanen di ekosistem Cuan.',
              )}
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
