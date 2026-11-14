import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Sparkles, ArrowRight } from 'lucide-react'
import { useLanguage } from '../../../context/LanguageContext'
import { SponsorItem, SPONSORWARE_TARGET } from '../../sponsorship/types'

export function FoundingBackersSection() {
  const { t } = useLanguage()
  const [sponsors, setSponsors] = useState<SponsorItem[]>([])

  useEffect(() => {
    fetch('/api/sponsors/current')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.sponsors && Array.isArray(data.sponsors)) {
          setSponsors(data.sponsors)
        }
      })
      .catch(() => null)
  }, [])

  const count = sponsors.length
  const target = SPONSORWARE_TARGET
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
              'Script Cuan v1.0 akan dibuka 100% gratis di GitHub saat 50 sponsor terpenuhi. Dukung mulai Rp 100.000 untuk mendapatkan akses private repo hari ini dan amankan posisi logo perdana Anda.',
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

      {/* Dynamic Logo Strip (Only appears when sponsors exist) */}
      {sponsors.length > 0 && (
        <div className="mx-auto max-w-6xl mt-8 pt-6 border-t border-border/40">
          <div className="text-2xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            {t('Founding Sponsors & Backers:')}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {sponsors.map((sp) => {
              const logoSrc = sp.logo_url || (sp.logo_path ? `/uploads/sponsors/logos/${sp.logo_path}` : null)
              if (logoSrc) {
                return (
                  <div key={sp.id} className="h-8 px-3 rounded-lg border border-border/60 bg-card flex items-center shadow-2xs">
                    <img src={logoSrc} alt={sp.brand_name} className="h-5 w-auto object-contain" />
                  </div>
                )
              }
              return (
                <span key={sp.id} className="text-xs font-semibold text-foreground/80 px-2.5 py-1 rounded-md border border-border/50 bg-card">
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
