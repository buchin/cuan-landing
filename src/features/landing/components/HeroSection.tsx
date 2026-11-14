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
  Plus,
} from 'lucide-react'
import {
  WordPressIcon,
  WooCommerceIcon,
  GhostIcon,
  EnvatoIcon,
  GithubIcon,
  LaravelIcon,
  CloudflareIcon,
  YouTubeIcon,
  TikTokIcon,
  InstagramIcon,
  PinterestIcon,
  TelegramIcon,
  DiscordIcon,
} from '../../../components/brand/BrandIcons'
import { CuanMark } from '../../../components/brand/CuanMark'
import { useLanguage } from '../../../context/LanguageContext'

interface HeroSectionProps {
  emailInputRef: React.RefObject<HTMLInputElement>
}

const platformLogos = [
  { name: 'WordPress', color: 'hover:text-[#21759B]', Icon: WordPressIcon },
  { name: 'WooCommerce', color: 'hover:text-[#96588A]', Icon: WooCommerceIcon },
  { name: 'CodeCanyon', color: 'hover:text-[#82B541]', Icon: EnvatoIcon },
  { name: 'GitHub', color: 'hover:text-black dark:hover:text-white', Icon: GithubIcon },
  { name: 'Ghost', color: 'hover:text-[#15171A] dark:hover:text-white', Icon: GhostIcon },
  { name: 'Laravel', color: 'hover:text-[#FF2D20]', Icon: LaravelIcon },
  { name: 'Cloudflare', color: 'hover:text-[#F38020]', Icon: CloudflareIcon },
  { name: 'YouTube', color: 'hover:text-[#FF0000]', Icon: YouTubeIcon },
  { name: 'TikTok', color: 'hover:text-[#FE2C55]', Icon: TikTokIcon },
  { name: 'Reels', color: 'hover:text-[#E4405F]', Icon: InstagramIcon },
  { name: 'Pinterest', color: 'hover:text-[#BD081C]', Icon: PinterestIcon },
  { name: 'Telegram', color: 'hover:text-[#24A1DE]', Icon: TelegramIcon },
  { name: 'Discord', color: 'hover:text-[#5865F2]', Icon: DiscordIcon },
]

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
      className="relative isolate mx-auto max-w-6xl px-6 pb-12 pt-8 text-center sm:px-8 sm:pb-16 sm:pt-12 overflow-hidden"
      aria-labelledby="landing-title"
    >
      {/* Subtle Giant Kepeng Coin Watermark - Anchored to Left Edge (Matching Reference: Bleeding Off-Canvas) */}
      <div className="pointer-events-none absolute -left-48 sm:-left-64 md:-left-80 lg:-left-96 top-1/2 -translate-y-1/2 -z-10 select-none overflow-visible">
        <CuanMark
          decorative
          className="h-[640px] w-[640px] sm:h-[840px] sm:w-[840px] lg:h-[1050px] lg:w-[1050px] opacity-[0.06] dark:opacity-[0.08] select-none text-foreground"
        />
      </div>

      <div className="mx-auto max-w-4xl">
        <h1
          id="landing-title"
          className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:leading-[1.1] max-w-3xl mx-auto"
        >
          {t('AI untuk Kelola Aset Digital dari Ide sampai Cuan')}
        </h1>

        {/* Subheadline & Category Context directly introducing the Brand Logos */}
        <div id="ecosystem-strip" className="mt-4 sm:mt-5">
          <p className="text-sm sm:text-base md:text-lg font-normal text-muted-foreground/90 leading-relaxed max-w-2xl mx-auto">
            {t('Dari website, blog, toko online, konten sosmed, hingga custom script — Cuan bantu jalankan berbagai proyek digital Anda di server sendiri.')}
          </p>
          <div className="mt-4 sm:mt-5 flex flex-wrap items-center justify-center gap-x-3.5 gap-y-2.5 sm:gap-x-4.5 md:gap-x-5 max-w-4xl mx-auto">
            {platformLogos.map(({ name, color, Icon: BrandSvg }) => (
              <div
                key={name}
                aria-label={name}
                className={`group/logo relative inline-flex items-center justify-center p-1.5 text-muted-foreground/70 transition-all duration-200 hover:scale-110 cursor-pointer ${color}`}
              >
                <BrandSvg className="h-5 w-5 sm:h-5.5 sm:w-5.5 shrink-0 transition-colors duration-200" />
                
                {/* Micro-tooltip */}
                <div className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 z-30 opacity-0 -translate-y-1 group-hover/logo:opacity-100 group-hover/logo:translate-y-0 transition-all duration-150 ease-out whitespace-nowrap rounded-md bg-foreground text-background px-2 py-0.5 text-[11px] font-medium tracking-tight shadow-md">
                  {name}
                  <div className="absolute left-1/2 -bottom-1 -translate-x-1/2 w-1.5 h-1.5 bg-foreground rotate-45" />
                </div>
              </div>
            ))}

            {/* 14th Stacked Layers Indicator: And many more */}
            <div
              aria-label={t('Dan banyak lagi...')}
              className="group/logo relative inline-flex items-center justify-center p-1.5 text-muted-foreground/70 transition-all duration-200 hover:scale-110 hover:text-primary cursor-pointer"
            >
              <div className="relative flex items-center justify-center h-5 w-5 sm:h-5.5 sm:w-5.5">
                {/* Back Stacked Card */}
                <div className="absolute top-0 right-0 h-4 w-4 sm:h-4.5 sm:w-4.5 border border-current opacity-40 pointer-events-none" />
                {/* Front Stacked Card with Plus */}
                <div className="absolute bottom-0 left-0 h-4 w-4 sm:h-4.5 sm:w-4.5 border border-current bg-background flex items-center justify-center pointer-events-none">
                  <Plus className="h-2.5 w-2.5 sm:h-3 sm:w-3 stroke-[2.5]" />
                </div>
              </div>

              {/* Micro-tooltip */}
              <div className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 z-30 opacity-0 -translate-y-1 group-hover/logo:opacity-100 group-hover/logo:translate-y-0 transition-all duration-150 ease-out whitespace-nowrap rounded-md bg-foreground text-background px-2 py-0.5 text-[11px] font-medium tracking-tight shadow-md">
                {t('Dan banyak lagi (Next.js, Python, Docker, API & script apapun)')}
                <div className="absolute left-1/2 -bottom-1 -translate-x-1/2 w-1.5 h-1.5 bg-foreground rotate-45" />
              </div>
            </div>
          </div>
        </div>

        {/* Waiting List Form & Sponsorship CTA */}
        <div id="waiting-list" className="mt-8 sm:mt-10 max-w-lg mx-auto scroll-mt-24">
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
            <div className="border border-border/80 bg-card p-5 sm:p-6 space-y-4 shadow-2xs text-left min-w-0 max-w-full">
              {/* Primary Confirmation: Clean Icon + Headline + Focused Copy */}
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div className="space-y-1 min-w-0 flex-1">
                  <h3 className="font-display text-base font-bold text-foreground">
                    {t('Posisi Anda Resmi Terdaftar')}
                  </h3>
                  <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed">
                    {t('Email')}{' '}
                    <code className="mx-0.5 rounded px-1.5 py-0.5 font-mono text-xs bg-muted border border-border/70 text-foreground font-medium">
                      {email}
                    </code>{' '}
                    {t('telah ditambahkan ke antrean prioritas. Notifikasi peluncuran dan akses repositori GitHub akan dikirimkan langsung ke inbox Anda.')}
                  </p>
                </div>
              </div>

              {/* Sponsor Bridge: Calm Things 3 Hairline Integration (Aligned to 32px Text Baseline) */}
              <div className="border-t border-black/[0.08] dark:border-white/[0.08] pt-3.5 pl-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="space-y-0.5 min-w-0">
                  <div className="font-medium text-foreground">
                    {t('Ingin pasang logo permanen & dukung Cuan?')}
                  </div>
                  <p className="text-muted-foreground text-[11px] sm:text-xs">
                    {t('Dapatkan slot Founding Sponsor dengan backlink dofollow permanen dan sorotan ke 63.000+ audiens.')}
                  </p>
                </div>
                <Link
                  to="/sponsor"
                  className="group inline-flex items-center gap-1.5 shrink-0 px-3 py-1.5 text-xs font-semibold text-foreground border border-black/10 dark:border-white/15 bg-background hover:bg-muted/60 hover:border-foreground/25 transition-all cursor-pointer self-start sm:self-auto"
                >
                  <span>{t('Pelajari Benefit Sponsor')}</span>
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Centered 3-Device Mockup Showcase */}
      <div className="mx-auto mt-8 max-w-4xl sm:mt-12">
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
