import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Zap,
  Check,
  Loader2,
} from 'lucide-react'
import { useLanguage } from '../../../context/LanguageContext'

interface HeroSectionProps {
  emailInputRef: React.RefObject<HTMLInputElement>
}

export function HeroSection({ emailInputRef }: HeroSectionProps) {
  const { t } = useLanguage()

  const [email, setEmail] = useState('')
  const [waitingListStep, setWaitingListStep] = useState<'email' | 'confirmed'>('email')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

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
        body: JSON.stringify({ email: trimmed, source: 'hero_waiting_list' }),
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
    <section
      className="relative mx-auto max-w-6xl px-6 pb-12 pt-8 text-center sm:px-8 sm:pb-16 sm:pt-12"
      aria-labelledby="landing-title"
    >
      <div className="mx-auto max-w-3xl">
        <h1
          id="landing-title"
          className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:leading-[1.1]"
        >
          {t('Kembangin Proyek Digital dari Ide sampai Cuan')}
        </h1>
        <p className="mt-4 text-base font-normal text-muted-foreground sm:text-lg md:text-xl leading-relaxed">
          {t('Ubah obrolan santai dan file script jadi website, konten, dan otomasi aktif di server milik sendiri. Bebas pusing koding, tanpa sewa tim teknis mahal.')}
        </p>

        {/* Waiting List Form & Sponsorship CTA */}
        <div id="waiting-list" className="mt-8 max-w-lg mx-auto scroll-mt-24">
          {waitingListStep === 'email' && (
            <div className="space-y-3">
              <form onSubmit={handleJoinWaitingList} className="flex flex-col sm:flex-row gap-2.5">
                <input
                  ref={emailInputRef as any}
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setFormError(null)
                  }}
                  placeholder={t('Masukkan email Anda...')}
                  aria-label={t('Email untuk waiting list')}
                  className="min-h-12 flex-1 rounded-xl border border-border/70 bg-card px-4 text-base text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary shadow-2xs transition-colors"
                  disabled={isSubmitting}
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="action-primary min-h-12 px-6 text-base font-semibold shadow-xs shrink-0 inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>{t('Mendaftarkan...')}</span>
                    </>
                  ) : (
                    <>
                      <span>{t('Gabung Waiting List')}</span>
                      <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                    </>
                  )}
                </button>
              </form>
              {formError && (
                <p className="text-xs text-rose-500 font-medium text-center">{formError}</p>
              )}
              <p className="text-xs text-muted-foreground text-center inline-flex items-center justify-center gap-1.5 w-full">
                <Lock className="h-3.5 w-3.5 text-muted-foreground/80 shrink-0" strokeWidth={1.5} />
                <span>{t('Gratis · Tanpa kartu kredit · Prioritas rilis v1.0 & akses repositori')}</span>
              </p>
            </div>
          )}

          {waitingListStep === 'confirmed' && (
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 dark:bg-emerald-500/10 p-5 sm:p-6 text-left space-y-4 shadow-xs">
              <div className="flex items-center gap-2.5 text-emerald-600 dark:text-emerald-400 font-bold text-base sm:text-lg">
                <CheckCircle2 className="h-5 w-5 shrink-0" strokeWidth={2} />
                <span>{t('Posisi Anda di Waiting List Cuan v1.0 Resmi Terdaftar!')}</span>
              </div>
              <p className="text-sm text-foreground/90 leading-relaxed">
                {t('Email Anda telah tercatat.')} {t('Kami telah menambahkan')}{' '}
                <span className="font-semibold text-foreground">{email}</span> {t('ke antrean prioritas rilis v1.0. Notifikasi peluncuran resmi dan akses repositori akan dikirimkan langsung ke inbox Anda.')}
              </p>

              <div className="rounded-xl border border-border/70 bg-card p-4 sm:p-5 space-y-2.5">
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary uppercase tracking-wider">
                  <Zap className="h-3.5 w-3.5" />
                  <span>{t('Akselerasi Peluncuran')}</span>
                </div>
                <div className="font-display text-base sm:text-lg font-bold text-foreground">
                  {t('Ingin pasang logo permanen & ikut mempercepat peluncuran Cuan?')}
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {t('Jadilah Founding Sponsor untuk mendapatkan penempatan logo utama dan backlink dofollow permanen di repositori GitHub & landing page Cuan, serta sorotan berkala ke 63.000+ audiens kreator & pebisnis digital.')}
                </p>
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <Link
                    to="/sponsor"
                    className="action-primary min-h-10 px-5 text-xs sm:text-sm font-semibold inline-flex items-center gap-2"
                  >
                    <span>{t('Lihat Halaman Sponsor & Benefit')}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setWaitingListStep('email')
                      setEmail('')
                      setFormError(null)
                    }}
                    className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-2 transition-colors cursor-pointer"
                  >
                    {t('Daftarkan email lain')}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Centered 3-Device Mockup Showcase */}
      <div className="mx-auto mt-8 max-w-4xl sm:mt-10">
        <div className="relative">
          <img
            src="/landing/cuan.webp"
            alt={t('Cuan multi-device workspace on Laptop, Tablet, and Mobile')}
            width={2000}
            height={1088}
            className="max-h-[480px] w-full object-contain [filter:drop-shadow(0_16px_36px_rgba(0,0,0,0.08))_drop-shadow(0_4px_12px_rgba(0,0,0,0.03))]"
            loading="eager"
          />
        </div>
      </div>

      {/* Trust Highlights */}
      <div className="mx-auto mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs sm:text-sm text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <ShieldCheck className="h-4 w-4" strokeWidth={1.5} />
          {t('Open-source & kendali penuh di server sendiri')}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Zap className="h-4 w-4" strokeWidth={1.5} />
          {t('Bebas biaya dobel · Bawa akun resmi AI sendiri (Claude, ChatGPT, Gemini, DeepSeek)')}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Check className="h-4 w-4 text-emerald-500" strokeWidth={1.5} />
          {t('Nol biaya langganan platform tambahan')}
        </span>
      </div>
    </section>
  )
}
