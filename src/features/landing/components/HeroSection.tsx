import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Zap,
  Check,
  Copy,
  Loader2,
  Plus,
  Star,
  ExternalLink,
  AlertTriangle,
  BookOpen,
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
import { useLanguage } from '../../../context/LanguageContext'
import { SPONSORWARE_TARGET } from '../../sponsorship/types'

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

  const [totalCount, setTotalCount] = useState<number>(100)
  const [targetCount, setTargetCount] = useState<number>(SPONSORWARE_TARGET)
  const [copied, setCopied] = useState(false)

  const handleCopyInstall = async () => {
    const cmd = 'curl -fsSL https://cuan.work/install.sh | bash'
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(cmd)
      } else {
        const textArea = document.createElement('textarea')
        textArea.value = cmd
        textArea.style.position = 'fixed'
        textArea.style.opacity = '0'
        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()
        document.execCommand('copy')
        document.body.removeChild(textArea)
      }
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback
    }
  }

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
      <div className="mx-auto max-w-4xl">
        {/* Public Alpha Milestone Celebration Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3.5 py-1 text-xs font-medium text-emerald-800 dark:text-emerald-300 mb-4 shadow-2xs">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
          <span>{t('🎉 Target 100 Sponsor Tercapai — Repositori Cuan Resmi Dibuka di GitHub (Public Alpha)')}</span>
        </div>

        <h1
          id="landing-title"
          className="text-4xl sm:text-5xl md:text-6xl lg:leading-[1.12] tracking-tight text-foreground max-w-3xl mx-auto"
        >
          <span className="font-display font-bold">{t('AI untuk Kelola Aset Digital')}</span>{' '}
          <span className="font-serif italic font-normal text-foreground/90">{t('dari Ide sampai Cuan.')}</span>
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
                <div className="absolute top-0 right-0 h-4 w-4 sm:h-5 sm:w-5 border border-current opacity-40 pointer-events-none" />
                {/* Front Stacked Card with Plus */}
                <div className="absolute bottom-0 left-0 h-4 w-4 sm:h-5 sm:w-5 border border-current bg-background flex items-center justify-center pointer-events-none">
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

        {/* Quick Install Box & Secondary Actions */}
        <div className="mt-7 max-w-xl mx-auto w-full">
          <div className="group relative flex items-center justify-between rounded-xl border border-border/80 bg-card p-1.5 sm:p-2 shadow-xs transition-all hover:border-border">
            <div className="flex items-center gap-2 min-w-0 flex-1 px-2.5 py-1 text-left overflow-x-auto scrollbar-none">
              <span className="font-mono text-xs sm:text-sm font-semibold text-muted-foreground/60 select-none">
                $
              </span>
              <code className="font-mono text-xs sm:text-sm font-medium text-foreground whitespace-nowrap select-all">
                curl -fsSL https://cuan.work/install.sh | bash
              </code>
            </div>
            <button
              type="button"
              onClick={handleCopyInstall}
              aria-label={copied ? t('Perintah instalasi tersalin') : t('Salin perintah instalasi')}
              className={`shrink-0 inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                copied
                  ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                  : 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-2xs'
              }`}
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 stroke-[2.5]" />
                  <span>{t('Tersalin!')}</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 stroke-[2]" />
                  <span>{t('Salin')}</span>
                </>
              )}
            </button>
          </div>

          {/* Secondary Hero Actions */}
          <div className="mt-3.5 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/docs"
              className="action-secondary min-h-10 px-4 text-xs sm:text-sm font-medium inline-flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
            >
              <BookOpen className="h-4 w-4 text-muted-foreground" />
              <span>{t('Dokumentasi')}</span>
            </Link>
            <a
              href="https://github.com/buchin/cuan"
              target="_blank"
              rel="noreferrer"
              className="action-secondary min-h-10 px-4 text-xs sm:text-sm font-medium inline-flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
            >
              <Star className="h-4 w-4 fill-current text-amber-400" />
              <span>{t('Buka di GitHub ⭐')}</span>
              <ExternalLink className="h-3.5 w-3.5 opacity-60" />
            </a>
          </div>
        </div>

        {/* Public Alpha Stability Notice Callout */}
        <div className="mt-4 max-w-xl mx-auto rounded-xl border border-amber-500/40 bg-amber-500/5 dark:bg-amber-500/10 px-4 py-2.5 text-left text-xs text-muted-foreground">
          <div className="flex items-start gap-2.5">
            <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <p className="text-foreground/85 leading-relaxed">
              <strong className="text-foreground">{t('Status Kestabilan (Fase Alpha):')}</strong>{' '}
              {t(
                'Cuan masih berstatus Public Alpha (v0.9.x) dan belum stabil untuk operasional bisnis utama (*production*). Gunakan untuk uji coba dan bantu laporkan kendala di GitHub Issues.',
              )}
            </p>
          </div>
        </div>

        {/* Release & Patch Updates Form */}
        <div id="waiting-list" className="mt-6 max-w-lg mx-auto scroll-mt-24">
          {waitingListStep === 'email' && (
            <div className="space-y-2.5">
              <form onSubmit={handleJoinWaitingList} className="flex flex-col sm:flex-row gap-2">
                <input
                  ref={emailInputRef as any}
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
                  className="action-primary min-h-11 px-5 text-xs sm:text-sm font-semibold shadow-xs shrink-0 inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
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
                <p className="text-xs text-rose-500 font-medium text-center">{formError}</p>
              )}
              <p className="text-[11px] text-muted-foreground text-center inline-flex items-center justify-center gap-1.5 w-full">
                <Lock className="h-3 w-3 text-muted-foreground/80 shrink-0" strokeWidth={1.5} />
                <span>{t('Gratis · Tanpa spam · Hanya kabar patch & pengumuman rilis stabil')}</span>
              </p>
            </div>
          )}

          {waitingListStep === 'confirmed' && (
            <div className="rounded-2xl border border-border/80 bg-card p-5 sm:p-6 space-y-4 shadow-2xs text-left min-w-0 max-w-full">
              {/* Primary Confirmation: Clean Icon + Headline + Focused Copy */}
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

              {/* Milestone Progress Bar (Things 3 & Bear Notes Calm Style) */}
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

              {/* Sponsor Bridge & Footer CTA */}
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
