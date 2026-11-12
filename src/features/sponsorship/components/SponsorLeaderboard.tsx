import { Trophy, Medal, ExternalLink, ArrowRight } from 'lucide-react'
import { SponsorItem, formatIDR, getRankBadge } from '../types'
import { useLanguage } from '../../../context/LanguageContext'

interface SponsorLeaderboardProps {
  top5List: (SponsorItem | null)[]
  next25List: SponsorItem[]
  communitySupporters: SponsorItem[]
  onSelectSlot: (amount: number) => void
}

export function SponsorLeaderboard({
  top5List,
  next25List,
  communitySupporters,
  onSelectSlot,
}: SponsorLeaderboardProps) {
  const { t } = useLanguage()

  return (
    <section id="leaderboard" className="mx-auto max-w-5xl px-6 sm:px-8 mb-20 scroll-mt-20">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-muted/30 px-3 py-1 text-2xs font-semibold text-muted-foreground mb-2">
          <Trophy className="h-3.5 w-3.5 text-amber-500" />
          <span>{t('Founding Era Leaderboard · v1.0')}</span>
        </div>
        <h2 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {t('Leaderboard Sponsor & Founding Backer')}
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
          {t(
            'Peringkat dinamis berdasarkan kontribusi Pay-What-You-Want. Diurutkan otomatis dari donasi tertinggi dan waktu pembayaran tercepat.',
          )}
        </p>
      </div>

      {/* Level 1: TOP 5 BESAR (Founding Titans) */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-amber-500" />
            <h3 className="font-display text-sm sm:text-base font-bold text-foreground">
              {t('Top 5 Besar (The Founding Titans)')}
            </h3>
          </div>
          <span className="text-2xs text-muted-foreground">
            {t('Logo Utama + Slogan + Link Dofollow')}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {top5List.map((sp, idx) => {
            const rank = idx + 1
            const badge = getRankBadge(rank)

            if (sp) {
              const logoSrc = sp.logo_url || (sp.logo_path ? `/uploads/sponsors/logos/${sp.logo_path}` : null)
              return (
                <div
                  key={sp.id}
                  className="rounded-2xl border border-border/80 bg-card p-4 flex flex-col justify-between shadow-2xs"
                >
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-3">
                      <span
                        className={`inline-flex items-center rounded-full border px-2 py-0.5 text-2xs font-bold ${badge.className}`}
                      >
                        {badge.label}
                      </span>
                      {sp.website_url && (
                        <a
                          href={sp.website_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-foreground p-1 transition-colors"
                          title={t('Kunjungi Website')}
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </div>

                    <div className="flex flex-col items-center text-center my-2">
                      {logoSrc ? (
                        <img
                          src={logoSrc}
                          alt={sp.brand_name}
                          className="h-10 w-auto max-w-[120px] object-contain mb-2"
                        />
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted/60 font-display font-bold text-sm text-foreground mb-2">
                          {sp.brand_name.slice(0, 2).toUpperCase()}
                        </div>
                      )}
                      <div className="font-display font-bold text-sm text-foreground truncate max-w-full">
                        {sp.brand_name}
                      </div>
                      {sp.slogan && (
                        <p className="text-2xs text-muted-foreground line-clamp-1 mt-0.5">
                          {sp.slogan}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-border/40 text-center">
                    <span className="font-mono text-2xs font-semibold text-foreground/80">
                      {sp.amount_idr ? formatIDR(sp.amount_idr) : t('Founding Backer')}
                    </span>
                  </div>
                </div>
              )
            }

            // Empty Slot (No nested box, clean icon)
            return (
              <button
                key={idx}
                type="button"
                onClick={() => onSelectSlot(1_000_000)}
                className="flex flex-col items-center justify-between rounded-2xl border border-dashed border-border/80 bg-muted/10 p-5 text-center hover:bg-muted/30 hover:border-primary/50 transition-all cursor-pointer group min-h-[190px]"
              >
                <div className="flex items-center gap-1.5 rounded-full border border-border/60 bg-background/80 px-2.5 py-0.5 text-2xs font-semibold text-muted-foreground">
                  <span>{`Slot #${rank} Tersedia`}</span>
                </div>

                <div className="my-2 flex flex-col items-center">
                  {rank === 1 ? (
                    <Trophy className="h-7 w-7 text-muted-foreground group-hover:text-primary transition-colors" strokeWidth={1.5} />
                  ) : (
                    <Medal className="h-7 w-7 text-muted-foreground group-hover:text-primary transition-colors" strokeWidth={1.5} />
                  )}
                  <span className="mt-2 text-xs font-semibold text-foreground">
                    {rank === 1 ? t('Jadilah #1 Titan') : t('Amankan Slot Top 5')}
                  </span>
                  <span className="text-2xs text-muted-foreground">
                    {t('Logo utama & dofollow link')}
                  </span>
                </div>

                <span className="text-xs font-medium text-primary group-hover:underline inline-flex items-center gap-1">
                  <span>{t('Ambil Slot')}</span>
                  <ArrowRight className="h-3 w-3" />
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Level 2: PERINGKAT 6 - 30 (25 Slot Logo Compact) */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-blue-500" />
            <h3 className="font-display text-sm sm:text-base font-bold text-foreground">
              {t('Peringkat 6 – 30 (25 Slot Logo Compact)')}
            </h3>
          </div>
          <span className="text-2xs text-muted-foreground">
            {t('Grid Logo + Tooltip + Tautan')}
          </span>
        </div>

        {next25List.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {next25List.map((sp, idx) => {
              const rank = idx + 6
              const logoSrc = sp.logo_url || (sp.logo_path ? `/uploads/sponsors/logos/${sp.logo_path}` : null)
              return (
                <div
                  key={sp.id}
                  className="rounded-xl border border-border/60 bg-card p-3 flex items-center gap-2.5 shadow-2xs"
                >
                  <span className="font-mono text-2xs font-semibold text-muted-foreground">
                    #{rank}
                  </span>
                  {logoSrc ? (
                    <img src={logoSrc} alt={sp.brand_name} className="h-6 w-auto object-contain" />
                  ) : (
                    <span className="text-xs font-semibold text-foreground truncate">
                      {sp.brand_name}
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-border/60 bg-muted/15 p-6 text-center">
            <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
              {t(
                'Slot logo compact (ukuran sedang dengan link terverifikasi) terbuka untuk dukungan mulai Rp 300.000. Urutan posisi otomatis diatur berdasarkan nominal kontribusi.',
              )}
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              {[6, 7, 8, 9, 10, '...', 30].map((slot, idx) => (
                <span
                  key={idx}
                  className="rounded-lg border border-border/50 bg-background/60 px-2.5 py-1 text-2xs font-mono text-muted-foreground"
                >
                  {typeof slot === 'number' ? `Slot #${slot}` : slot}
                </span>
              ))}
            </div>
            <div className="mt-5">
              <button
                type="button"
                onClick={() => onSelectSlot(300_000)}
                className="action-secondary min-h-10 px-4 text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer"
              >
                <span>{t('Daftar di Slot Logo Compact →')}</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Level 3: PERINGKAT 31+ (Community Supporters Wall) */}
      <div className="rounded-2xl border border-border/60 bg-card/60 p-5 text-center">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
          {t('Community Supporters Wall')}
        </h4>
        {communitySupporters.length > 0 ? (
          <div className="flex flex-wrap items-center justify-center gap-2">
            {communitySupporters.map((sp) => (
              <span
                key={sp.id}
                className="rounded-full border border-border/60 bg-card px-3 py-1 text-xs font-medium text-foreground"
              >
                {sp.brand_name}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-xs text-muted-foreground">
            {t(
              'Dukungan mulai Rp 100.000 tercantum permanen di Community Supporters Wall dan repositori resmi GitHub Cuan.',
            )}
          </p>
        )}
      </div>
    </section>
  )
}
