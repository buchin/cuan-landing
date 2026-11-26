import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2, Loader2, Lock } from 'lucide-react'
import { useLanguage } from '../../../context/LanguageContext'
import { SPONSORWARE_TARGET } from '../../sponsorship/types'

interface FinalCtaSectionProps {
  emailInputRef: React.RefObject<HTMLInputElement>
}

export function FinalCtaSection({ emailInputRef }: FinalCtaSectionProps) {
  const { t } = useLanguage()

  const [email, setEmail] = useState('')
  const [waitingListStep, setWaitingListStep] = useState<'email' | 'confirmed'>('email')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [totalCount, setTotalCount] = useState<number>(100)
  const [targetCount, setTargetCount] = useState<number>(SPONSORWARE_TARGET)

  useEffect(() => {
    fetch('/api/sponsors/current')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (typeof data?.total === 'number') {
          setTotalCount(data.total)
        }
        if (typeof data?.target === 'number') {
          setTargetCount(data.target)
        }
      })
      .catch(() => null)
  }, [])

  const percent = Math.min(100, Math.round((totalCount / targetCount) * 100))
  const remaining = Math.max(0, targetCount - totalCount)

  const handleJoinWaitingList = async (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = email.trim()
    if (!trimmed || !trimmed.includes('@')) {
      setFormError(t('Masukkan alamat email yang valid.'))
      return
    }

    setIsSubmitting(true)
    setFormError(null)

    try {
      const res = await fetch('/api/waiting-list', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed, source: 'final_cta_waiting_list' }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || data.message || t('Gagal mendaftar waiting list. Coba lagi sebentar lagi.'))
      }

      setWaitingListStep('confirmed')
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err)
      setFormError(msg || t('Terjadi gangguan jaringan saat mendaftar waiting list.'))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="waiting-list" className="px-6 py-16 sm:px-8 sm:py-20 scroll-mt-24">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
        <div className="max-w-xl">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
            <span className="font-display">{t('Siap bebas dari')}</span>{' '}
            <span className="font-serif italic font-normal text-foreground/90">{t('pusing urusan teknis?')}</span>
          </h2>
          <p className="mt-3 text-base sm:text-lg leading-relaxed text-muted-foreground">
            {t('Fokus berkarya, melayani pelanggan, dan cari cuan. Saat ada kendala rumit atau kebutuhan teknis, cukup eskalasi ke Cuan lewat chat. Biarkan Cuan yang membereskannya di balik layar dan menyiapkan draf solusinya untuk Anda.')}
          </p>
          <p className="mt-3 text-sm text-muted-foreground/80">
            {t('Open source · Bebas biaya dobel · Data 100% milik Anda di server sendiri')}
          </p>
        </div>

        <div className="w-full max-w-lg shrink-0">
          {waitingListStep === 'email' && (
            <div className="space-y-2.5">
              <form onSubmit={handleJoinWaitingList} className="flex flex-col sm:flex-row gap-2">
                <input
                  ref={emailInputRef}
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setFormError(null)
                  }}
                  placeholder={t('Daftar email untuk update patch & rilis stabil...')}
                  aria-label={t('Email untuk update rilis')}
                  className="min-h-11 flex-1 rounded-xl border border-border/70 bg-card px-4 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary shadow-2xs transition-colors"
                  disabled={isSubmitting}
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="action-primary min-h-11 px-5 text-xs sm:text-sm font-semibold shadow-xs shrink-0 inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 whitespace-nowrap"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>{t('Mendaftarkan...')}</span>
                    </>
                  ) : (
                    <>
                      <span>{t('Ikuti Update')}</span>
                      <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                    </>
                  )}
                </button>
              </form>
              {formError && (
                <p className="text-xs text-rose-500 font-medium">{formError}</p>
              )}
              <p className="text-[11px] text-muted-foreground inline-flex items-center gap-1.5">
                <Lock className="h-3 w-3 text-muted-foreground/80 shrink-0" strokeWidth={1.5} />
                <span>{t('Gratis · Tanpa spam · Hanya kabar patch & pengumuman rilis stabil')}</span>
              </p>
            </div>
          )}

          {waitingListStep === 'confirmed' && (
            <div className="rounded-2xl border border-border/80 bg-card p-5 sm:p-6 space-y-4 shadow-2xs text-left min-w-0 max-w-full">
              <div className="flex items-start gap-3.5">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div className="space-y-1 min-w-0 flex-1">
                  <h3 className="font-display text-base font-bold text-foreground">
                    {t('Selamat, Anda Masuk Waiting List')}
                  </h3>
                  <p className="text-xs sm:text-sm text-foreground/85 leading-relaxed">
                    {t('Email')}{' '}
                    <code className="mx-0.5 rounded px-1.5 py-0.5 font-mono text-xs bg-muted border border-border/70 text-foreground font-medium">
                      {email}
                    </code>{' '}
                    {t(
                      'telah terdaftar. Script Cuan saat ini dalam tahap pengembangan aktif dan akan dirilis gratis di GitHub setelah target 100 sponsor komunitas tercapai. Notifikasi rilis akan dikirimkan langsung ke inbox Anda.'
                    )}
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-border/70 bg-muted/30 p-3.5 space-y-2">
                <div className="flex items-center justify-between text-xs font-medium text-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
                    <span>{t('Milestone Rilis Repositori Publik:')}</span>
                  </span>
                  <span className="font-mono text-xs font-semibold text-primary">
                    {totalCount} / {targetCount} {t('Sponsor')}
                  </span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-muted-foreground/15 overflow-hidden">
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

              <div className="border-t border-border/50 pt-3.5 space-y-3.5 text-left">
                <div className="space-y-1">
                  <div className="font-semibold text-foreground text-xs sm:text-sm">
                    {t('Mau akses script Cuan hari ini tanpa antre?')}
                  </div>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    {t(
                      'Dukung mulai Rp 100.000 (Bayar Suka-Suka) untuk mencoba private repo GitHub (tahap v0.9) sekarang + nama/logo Anda tercatat abadi sebagai Founding Backer.'
                    )}
                  </p>
                </div>
                <Link
                  to="/sponsor"
                  className="action-primary w-full min-h-11 px-4 text-xs sm:text-sm font-semibold justify-center gap-2 shadow-xs cursor-pointer transition-all hover:brightness-105 active:scale-[0.99] inline-flex items-center"
                >
                  <span>{t('Jadi Sponsor Sekarang (Mulai Rp 100rb)')}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
