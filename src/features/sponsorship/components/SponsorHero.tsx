import { Heart, ArrowRight, Globe } from 'lucide-react'
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
            <div className="mb-3.5 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-border/70 bg-muted/40 px-2 py-1 text-2xs font-semibold text-foreground/90">
                <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                <span>GitHub README</span>
              </span>
              <span className="text-muted-foreground/60 text-xs">+</span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-border/70 bg-muted/40 px-2 py-1 text-2xs font-semibold text-foreground/90">
                <Globe className="h-3.5 w-3.5 text-foreground/90" strokeWidth={1.75} />
                <span>cuan.work</span>
              </span>
            </div>
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
            <div className="mb-3.5 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-border/70 bg-muted/40 px-2 py-1 text-2xs font-semibold text-foreground/90">
                <span className="font-bold tracking-tight text-xs">BCA</span>
                <span>Transfer</span>
              </span>
              <span className="text-muted-foreground/60 text-xs">+</span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-border/70 bg-muted/40 px-2 py-1 text-2xs font-semibold text-foreground/90">
                <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697.5 12.52.5 7.42.5 3.86 3.144 3.86 7.625c0 4.887 4.12 5.922 6.94 6.974 2.378.887 3.197 1.611 3.197 2.614 0 1.026-.952 1.545-2.428 1.545-2.392 0-5.187-1.127-6.938-2.171L3.74 22.09c1.944 1.077 4.858 1.91 8.272 1.91 5.373 0 9.176-2.584 9.176-7.234 0-5.148-4.148-6.07-7.212-7.616z" />
                </svg>
                <span>Stripe</span>
              </span>
            </div>
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
