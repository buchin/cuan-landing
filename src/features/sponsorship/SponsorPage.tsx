import { useState, useEffect, useMemo, useRef } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Globe,
  Sparkles,
  Sun,
  Moon,
  HelpCircle,
  Server,
  Heart,
  Github,
  X,
  Trophy,
  ExternalLink,
  Upload,
  AlertCircle,
  Medal,
} from 'lucide-react'
import { CuanMark } from '../../components/brand/CuanMark'
import { useLanguage } from '../../context/LanguageContext'
import { useTheme } from '../../context/ThemeContext'

interface SponsorItem {
  id: string
  brand_name: string
  website_url?: string
  logo_url?: string
  logo_path?: string
  slogan?: string
  amount_idr?: number
  paid_at?: string
}

function formatIDR(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(amount)
}

function getRankBadge(rank: number) {
  switch (rank) {
    case 1:
      return {
        label: '🥇 #1 Platinum',
        className: 'border-amber-500/40 bg-amber-500/10 text-amber-600 dark:text-amber-400',
      }
    case 2:
      return {
        label: '🥈 #2 Gold',
        className: 'border-slate-400/40 bg-slate-400/10 text-slate-700 dark:text-slate-300',
      }
    case 3:
      return {
        label: '🥉 #3 Silver',
        className: 'border-amber-700/40 bg-amber-700/10 text-amber-700 dark:text-amber-500',
      }
    case 4:
    case 5:
      return {
        label: `⭐ #${rank} Bronze`,
        className: 'border-blue-500/40 bg-blue-500/10 text-blue-600 dark:text-blue-400',
      }
    default:
      return {
        label: `#${rank}`,
        className: 'border-border/60 bg-muted/40 text-muted-foreground',
      }
  }
}

const PRESET_AMOUNTS = [
  { value: 100_000, label: 'Rp 100.000', tier: 'Supporter' },
  { value: 300_000, label: 'Rp 300.000', tier: 'Logo Compact' },
  { value: 1_000_000, label: 'Rp 1.000.000', tier: 'Top 5 Titan', popular: true },
  { value: 2_500_000, label: 'Rp 2.500.000', tier: 'VIP Leader' },
]

export function SponsorPage() {
  const { t, language, setPreference } = useLanguage()
  const { resolvedTheme, toggleTheme } = useTheme()
  const [searchParams] = useSearchParams()

  const [sponsors, setSponsors] = useState<SponsorItem[]>([])
  const [showGithubModal, setShowGithubModal] = useState(false)

  // Form states
  const [selectedAmount, setSelectedAmount] = useState<number>(1_000_000)
  const [isCustomAmount, setIsCustomAmount] = useState<boolean>(false)
  const [customInput, setCustomInput] = useState<string>('')
  const [brandName, setBrandName] = useState<string>('')
  const [websiteUrl, setWebsiteUrl] = useState<string>('')
  const [slogan, setSlogan] = useState<string>('')
  const [contactEmail, setContactEmail] = useState<string>('')
  const [contactWA, setContactWA] = useState<string>('')
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const checkoutRef = useRef<HTMLDivElement>(null)
  const isReturnFromCheckout = searchParams.get('status') === 'pending' || Boolean(searchParams.get('order_id'))

  useEffect(() => {
    // Fetch live approved sponsors from backend
    fetch('/api/sponsors/current')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.sponsors && Array.isArray(data.sponsors)) {
          setSponsors(data.sponsors)
        }
      })
      .catch(() => null)
  }, [])

  // Calculate top 5 benchmark
  const minTop5Benchmark = useMemo(() => {
    if (!sponsors || sponsors.length < 5) {
      return 100_000
    }
    const fifthAmount = sponsors[4]?.amount_idr || 100_000
    return fifthAmount + 10_000
  }, [sponsors])

  const top5List = useMemo(() => {
    const list: (SponsorItem | null)[] = []
    for (let i = 0; i < 5; i++) {
      list.push(sponsors[i] || null)
    }
    return list
  }, [sponsors])

  const next25List = useMemo(() => {
    return sponsors.slice(5, 30)
  }, [sponsors])

  const communitySupporters = useMemo(() => {
    return sponsors.slice(30)
  }, [sponsors])

  // Projected tier label based on selectedAmount
  const projectedTier = useMemo(() => {
    if (selectedAmount >= 1_000_000) {
      return {
        label: t('Prioritas Top 5 Titan'),
        tag: 'Titan Tier',
      }
    }
    if (selectedAmount >= 300_000) {
      return {
        label: t('Slot Logo Compact (Peringkat 6 - 30)'),
        tag: 'Champion Tier',
      }
    }
    return {
      label: t('Community Supporter Wall'),
      tag: 'Supporter Tier',
    }
  }, [selectedAmount, t])

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setErrorMessage(t('Ukuran logo maksimal 2 MB'))
        return
      }
      setLogoFile(file)
      setLogoPreview(URL.createObjectURL(file))
      setErrorMessage(null)
    }
  }

  const handleRemoveLogo = () => {
    setLogoFile(null)
    if (logoPreview) {
      URL.revokeObjectURL(logoPreview)
      setLogoPreview(null)
    }
  }

  const handleSubmitCheckout = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)

    if (selectedAmount < 10_000) {
      setErrorMessage(t('Nominal minimal dukungan adalah Rp 10.000'))
      return
    }

    if (!brandName.trim()) {
      setErrorMessage(t('Mohon isi nama brand atau nama Anda'))
      return
    }

    if (!contactEmail.trim() || !contactEmail.includes('@')) {
      setErrorMessage(t('Mohon masukkan alamat email yang valid'))
      return
    }

    setIsSubmitting(true)

    try {
      let uploadedLogoPath = ''

      // 1. Upload logo if provided
      if (logoFile) {
        const formData = new FormData()
        formData.append('logo', logoFile)
        try {
          const uploadRes = await fetch('/api/sponsors/upload-logo', {
            method: 'POST',
            body: formData,
          })
          if (uploadRes.ok) {
            const uploadData = await uploadRes.json()
            if (uploadData.logo_path) {
              uploadedLogoPath = uploadData.logo_path
            }
          }
        } catch {
          // If upload fails, proceed without logo
        }
      }

      // 2. Create PWYW Checkout Session via Dojo API
      const checkoutRes = await fetch('/api/sponsors/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          brand_name: brandName.trim(),
          website_url: websiteUrl.trim(),
          slogan: slogan.trim(),
          logo_path: uploadedLogoPath,
          contact_email: contactEmail.trim(),
          contact_wa: contactWA.trim(),
          amount_idr: selectedAmount,
          return_url: `${window.location.origin}/sponsor?status=pending`,
        }),
      })

      if (checkoutRes.ok) {
        const checkoutData = await checkoutRes.json()
        if (checkoutData.checkout_url) {
          window.location.href = checkoutData.checkout_url
          return
        }
      }

      // Fallback: Direct Dojo redirect if API encounters issue
      const fallbackUrl = new URL('https://dojo.cc/checkout/cuan-founding-backer')
      fallbackUrl.searchParams.set('amount', selectedAmount.toString())
      fallbackUrl.searchParams.set('brand', brandName.trim())
      fallbackUrl.searchParams.set('email', contactEmail.trim())
      fallbackUrl.searchParams.set('return_url', `${window.location.origin}/sponsor?status=pending`)
      window.location.href = fallbackUrl.toString()
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err)
      setErrorMessage(`${t('Gagal menyiapkan checkout:')} ${msg}`)
      setIsSubmitting(false)
    }
  }

  const scrollToCheckout = (amount?: number) => {
    if (amount) {
      setSelectedAmount(amount)
      setIsCustomAmount(false)
    }
    checkoutRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-dvh bg-background text-foreground">
      {/* Top Navigation */}
      <header className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-6 sm:px-8 border-b border-border/40">
        <Link
          to="/"
          className="inline-flex min-h-11 items-center gap-2 font-medium tracking-tight"
          aria-label="Cuan"
        >
          <CuanMark decorative className="h-7 w-7" />
          <span className="font-display text-xl font-bold tracking-tight text-foreground">
            cuan
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            to="/"
            className="inline-flex min-h-9 items-center gap-1.5 px-3 text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{t('Kembali ke Beranda')}</span>
            <span className="sm:hidden">{t('Beranda')}</span>
          </Link>

          {/* Language Switcher */}
          <button
            type="button"
            onClick={() => setPreference(language === 'id' ? 'en' : 'id')}
            className="inline-flex min-h-9 items-center justify-center rounded-md border border-border/50 bg-muted/30 px-2.5 text-xs font-medium text-muted-foreground hover:bg-accent/50 hover:text-foreground transition-colors cursor-pointer"
            title={language === 'id' ? 'Ganti ke English' : 'Switch to Bahasa Indonesia'}
          >
            {language === 'id' ? 'ID' : 'EN'}
          </button>

          {/* Theme Switcher */}
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border/50 bg-muted/30 text-muted-foreground hover:bg-accent/50 hover:text-foreground transition-colors cursor-pointer"
            aria-label="Ganti tema"
            title={resolvedTheme === 'dark' ? 'Tema terang' : 'Tema gelap'}
          >
            {resolvedTheme === 'dark' ? (
              <Sun className="h-4 w-4" strokeWidth={1.5} />
            ) : (
              <Moon className="h-4 w-4" strokeWidth={1.5} />
            )}
          </button>
        </div>
      </header>

      <main className="pb-24">
        {/* Return from Checkout Feedback Banner */}
        {isReturnFromCheckout && (
          <div className="mx-auto max-w-4xl px-6 pt-6 sm:px-8">
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5 text-emerald-800 dark:text-emerald-300 flex items-start gap-3.5">
              <Sparkles className="h-5 w-5 shrink-0 mt-0.5 text-emerald-600 dark:text-emerald-400" />
              <div>
                <h4 className="font-display font-bold text-sm sm:text-base">
                  {t('Terima kasih atas kontribusi sponsor Anda!')}
                </h4>
                <p className="text-xs sm:text-sm mt-1 leading-relaxed opacity-90">
                  {t(
                    'Dukungan Anda sedang diproses. Profil dan logo Anda akan segera tampil di Leaderboard resmi dan repositori GitHub setelah verifikasi transaksi.',
                  )}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Hero Section */}
        <section className="mx-auto max-w-4xl px-6 pt-12 pb-10 text-center sm:px-8 sm:pt-16 sm:pb-12">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/40 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-foreground/80">
            <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500/20" />
            <span>{t('Founding Era · Pay What You Want')}</span>
          </div>

          <h1 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:leading-[1.1]">
            {t('Dukung Peluncuran Cuan v1.0 & Amankan Posisi Leaderboard')}
          </h1>

          <p className="mt-4 text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            {t(
              'Cuan adalah software mandiri (self-hosted di VPS) untuk pebisnis & digital marketer. Dukungan Anda diakui abadi di ekosistem open source dan menentukan peringkat brand Anda di Leaderboard.',
            )}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => scrollToCheckout()}
              className="action-primary min-h-11 px-6 text-sm font-semibold inline-flex items-center gap-2 cursor-pointer"
            >
              <span>{t('Dukung Sekarang (PWYW)')}</span>
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

        {/* Value Highlights */}
        <section className="mx-auto max-w-5xl px-6 sm:px-8 mb-16">
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-2xs">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-muted/60 text-primary">
                <Sparkles className="h-5 w-5" strokeWidth={1.5} />
              </div>
              <h3 className="font-display text-base font-bold text-foreground">
                {t('Early VIP Access')}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {t(
                  'Akses build rilis privat sebelum peluncuran publik. Coba fitur terbaru, integrasi antrean kerja otonom, dan paket skill lebih dulu.',
                )}
              </p>
            </div>

            <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-2xs">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-muted/60 text-primary">
                <Globe className="h-5 w-5" strokeWidth={1.5} />
              </div>
              <h3 className="font-display text-base font-bold text-foreground">
                {t('Logo & Dofollow Backlink')}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {t(
                  'Nama brand atau profil Anda dicantumkan secara permanen di GitHub README dan landing page resmi Cuan sebagai bukti kontribusi nyata.',
                )}
              </p>
            </div>

            <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-2xs">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-muted/60 text-primary">
                <Server className="h-5 w-5" strokeWidth={1.5} />
              </div>
              <h3 className="font-display text-base font-bold text-foreground">
                {t('Konsultasi VPS & MCP')}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {t(
                  'Kanal koordinasi langsung untuk bantuan konfigurasi VPS Ubuntu/Debian, pemasangan custom MCP server, dan grounding CRM profil bisnis Anda.',
                )}
              </p>
            </div>
          </div>
        </section>

        {/* LEADERBOARD SHOWCASE SECTION */}
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

                // Empty Slot
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => scrollToCheckout(1_000_000)}
                    className="flex flex-col items-center justify-between rounded-2xl border border-dashed border-border/80 bg-muted/10 p-5 text-center hover:bg-muted/30 hover:border-primary/50 transition-all cursor-pointer group min-h-[190px]"
                  >
                    <div className="flex items-center gap-1.5 rounded-full border border-border/60 bg-background/80 px-2.5 py-0.5 text-2xs font-semibold text-muted-foreground">
                      <span>{`Slot #${rank} Tersedia`}</span>
                    </div>

                    <div className="my-2 flex flex-col items-center">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted/50 text-muted-foreground group-hover:text-primary transition-colors">
                        {rank === 1 ? (
                          <Trophy className="h-5 w-5" strokeWidth={1.5} />
                        ) : (
                          <Medal className="h-5 w-5" strokeWidth={1.5} />
                        )}
                      </div>
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
                    onClick={() => scrollToCheckout(300_000)}
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

        {/* UNIFIED PWYW CHECKOUT CARD SECTION */}
        <section ref={checkoutRef} id="checkout" className="mx-auto max-w-3xl px-6 sm:px-8 mb-20 scroll-mt-20">
          <div className="rounded-3xl border border-border/80 bg-card p-6 sm:p-10 shadow-xs space-y-8">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-muted/40 px-3 py-1 text-xs font-semibold text-muted-foreground">
                <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500/20" />
                <span>{t('Satu Kali Pembayaran · Tanpa Langganan')}</span>
              </div>
              <h2 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                {t('Formulir Dukungan Pay-What-You-Want')}
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
                {t(
                  'Tentukan nominal kontribusi yang nyaman bagi Anda. Kontribusi Anda langsung dicatat dan menentukan posisi di Leaderboard.',
                )}
              </p>
            </div>

            {/* Smart Benchmark Callout */}
            <div className="rounded-2xl border border-primary/25 bg-primary/5 p-4 sm:p-5 flex items-start gap-3.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary mt-0.5">
                <Sparkles className="h-5 w-5" strokeWidth={1.5} />
              </div>
              <div className="space-y-1">
                <div className="text-xs sm:text-sm font-bold text-foreground">
                  {sponsors.length < 5
                    ? t('Peluang Emas: Slot Top 5 Titan Masih Terbuka!')
                    : t('Status Persaingan Top 5 Saat Ini')}
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {sponsors.length < 5
                    ? t(
                        'Belum ada 5 backer terdaftar. Dukungan mulai Rp 100.000 hari ini langsung mengamankan posisi Anda di Top 5 Besar (Logo Utama, Slogan, dan Tautan Website permanen).',
                      )
                    : `${t('Dukungan minimal saat ini untuk menggeser posisi Top 5 adalah')} ${formatIDR(
                        minTop5Benchmark,
                      )}.`}
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmitCheckout} className="space-y-6">
              {/* Nominal Preset Chips */}
              <div className="space-y-3">
                <label className="block text-xs sm:text-sm font-semibold text-foreground">
                  {t('Pilih Nominal Kontribusi (Satu Kali):')}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {PRESET_AMOUNTS.map((p) => {
                    const isSelected = selectedAmount === p.value && !isCustomAmount
                    return (
                      <button
                        key={p.value}
                        type="button"
                        onClick={() => {
                          setSelectedAmount(p.value)
                          setIsCustomAmount(false)
                          setCustomInput('')
                        }}
                        className={`min-h-14 rounded-2xl border p-2.5 text-center transition-all cursor-pointer flex flex-col justify-center items-center ${
                          isSelected
                            ? 'border-primary bg-primary/10 text-primary font-bold shadow-2xs'
                            : 'border-border/70 bg-card text-foreground hover:bg-muted/40'
                        }`}
                      >
                        <span className="text-xs sm:text-sm font-bold">{p.label}</span>
                        <span className="text-2xs text-muted-foreground">{p.tier}</span>
                      </button>
                    )
                  })}
                </div>

                {/* Custom Amount Field */}
                <div className="pt-1">
                  {!isCustomAmount ? (
                    <button
                      type="button"
                      onClick={() => {
                        setIsCustomAmount(true)
                        setCustomInput(selectedAmount.toString())
                      }}
                      className="text-xs font-semibold text-primary hover:underline cursor-pointer"
                    >
                      {t('+ Masukkan Nominal Kustom Lainnya')}
                    </button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <div className="relative flex-1">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-semibold text-muted-foreground">
                          Rp
                        </span>
                        <input
                          type="number"
                          min="10000"
                          step="10000"
                          value={customInput}
                          onChange={(e) => {
                            setCustomInput(e.target.value)
                            const num = parseInt(e.target.value, 10)
                            if (!isNaN(num) && num > 0) {
                              setSelectedAmount(num)
                            }
                          }}
                          placeholder="100000"
                          className="w-full rounded-xl border border-border/80 bg-background pl-11 pr-4 py-2.5 text-sm font-semibold text-foreground focus:border-primary focus:outline-hidden"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setIsCustomAmount(false)
                          setSelectedAmount(1_000_000)
                        }}
                        className="rounded-xl border border-border/60 bg-muted/30 px-3 py-2.5 text-xs text-muted-foreground hover:text-foreground cursor-pointer"
                      >
                        {t('Kembali ke Preset')}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Dynamic Benefit Unlock Preview */}
              <div className="rounded-2xl border border-border/60 bg-muted/20 p-4 sm:p-5 space-y-2.5">
                <div className="flex items-center justify-between text-xs font-semibold text-foreground">
                  <span>{t('Hak & Benefit yang Terbuka:')}</span>
                  <span className="rounded-full bg-primary/10 text-primary px-2.5 py-0.5 text-2xs font-bold">
                    {projectedTier.label}
                  </span>
                </div>
                <div className="space-y-2 text-xs sm:text-sm text-foreground/90">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
                    <span>{t('Akses VIP pertama ke build rilis Cuan sebelum publik')}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
                    <span>{t('Nama / Profil tercantum permanen di GitHub README')}</span>
                  </div>
                  {selectedAmount >= 300_000 && (
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
                      <span>{t('Slot logo compact & link terverifikasi di direktori sponsor')}</span>
                    </div>
                  )}
                  {selectedAmount >= 1_000_000 && (
                    <>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
                        <span>{t('Prioritas Top 5 Besar: Logo utama, slogan 1 baris & dofollow backlink')}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
                        <span>{t('Sesi konsultasi privat 1-on-1 arsitektur VPS & MCP')}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Sponsor Information Fields */}
              <div className="space-y-4 pt-2">
                <h4 className="font-display text-sm font-bold text-foreground">
                  {t('Informasi Profil Sponsor:')}
                </h4>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1.5">
                      {t('Nama Brand / Usaha / Nama Anda *')}
                    </label>
                    <input
                      type="text"
                      required
                      value={brandName}
                      onChange={(e) => setBrandName(e.target.value)}
                      placeholder="Contoh: Dojo Studio / Budi"
                      className="w-full rounded-xl border border-border/80 bg-background px-3.5 py-2.5 text-xs sm:text-sm text-foreground focus:border-primary focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1.5">
                      {t('Tautan Website Resmi (Opsional)')}
                    </label>
                    <input
                      type="url"
                      value={websiteUrl}
                      onChange={(e) => setWebsiteUrl(e.target.value)}
                      placeholder="https://studioanda.com"
                      className="w-full rounded-xl border border-border/80 bg-background px-3.5 py-2.5 text-xs sm:text-sm text-foreground focus:border-primary focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1.5">
                      {t('Alamat Email Kontak *')}
                    </label>
                    <input
                      type="email"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="nama@email.com"
                      className="w-full rounded-xl border border-border/80 bg-background px-3.5 py-2.5 text-xs sm:text-sm text-foreground focus:border-primary focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1.5">
                      {t('No. WhatsApp (Opsional)')}
                    </label>
                    <input
                      type="tel"
                      value={contactWA}
                      onChange={(e) => setContactWA(e.target.value)}
                      placeholder="0812xxxxxxxx"
                      className="w-full rounded-xl border border-border/80 bg-background px-3.5 py-2.5 text-xs sm:text-sm text-foreground focus:border-primary focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">
                    {t('Slogan / Tagline Singkat (Maks. 60 Karakter, Opsional untuk Top 5)')}
                  </label>
                  <input
                    type="text"
                    maxLength={60}
                    value={slogan}
                    onChange={(e) => setSlogan(e.target.value)}
                    placeholder="Contoh: Solusi Otomasi Digital untuk Kreator"
                    className="w-full rounded-xl border border-border/80 bg-background px-3.5 py-2.5 text-xs sm:text-sm text-foreground focus:border-primary focus:outline-hidden"
                  />
                </div>

                {/* Logo Upload Box */}
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">
                    {t('Upload Logo Brand (PNG / SVG transparan, maks 2 MB, Opsional)')}
                  </label>
                  {logoPreview ? (
                    <div className="flex items-center gap-3 rounded-xl border border-border/80 bg-muted/20 p-3">
                      <img src={logoPreview} alt="Logo Preview" className="h-8 w-auto object-contain" />
                      <span className="text-xs text-muted-foreground flex-1 truncate">
                        {logoFile?.name}
                      </span>
                      <button
                        type="button"
                        onClick={handleRemoveLogo}
                        className="rounded-lg p-1 text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer"
                        title={t('Hapus Logo')}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border/80 bg-muted/10 p-4 text-center hover:bg-muted/30 transition-colors cursor-pointer">
                      <Upload className="h-5 w-5 text-muted-foreground mb-1" strokeWidth={1.5} />
                      <span className="text-xs font-medium text-foreground">
                        {t('Pilih Berkas Logo')}
                      </span>
                      <span className="text-2xs text-muted-foreground mt-0.5">
                        {t('SVG, PNG, atau WebP (disarankan latar belakang transparan)')}
                      </span>
                      <input
                        type="file"
                        accept=".svg,.png,.webp"
                        onChange={handleLogoChange}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* Error Message Alert */}
              {errorMessage && (
                <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-3.5 text-xs text-rose-600 dark:text-rose-400 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Submit Checkout Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="action-primary w-full min-h-12 text-sm sm:text-base font-bold justify-center gap-2 shadow-xs cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>{t('Menyiapkan Checkout Dojo...')}</span>
                ) : (
                  <>
                    <span>{`${t('Dukung via Dojo Checkout')} — ${formatIDR(selectedAmount)}`}</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>

              <p className="text-center text-xs text-muted-foreground">
                {t(
                  'Pembayaran diproses aman oleh Dojo via Transfer Bank BCA (Lokal) & Stripe (Internasional).',
                )}
              </p>
            </form>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mx-auto max-w-3xl px-6 sm:px-8">
          <div className="text-center mb-8">
            <h2 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {t('Pertanyaan yang Sering Diajukan')}
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'Bagaimana cara kerja Pay-What-You-Want di Cuan?',
                a: 'Anda bebas menentukan nominal donasi (mulai Rp 10.000). Semua kontribusi dicatat dan diurutkan secara transparan di Leaderboard. Siapa pun yang menempati Top 5 kontributor tertinggi mendapatkan slot logo utama, slogan, dan link dofollow permanen.',
              },
              {
                q: 'Apakah posisi saya di Top 5 bisa tergeser?',
                a: 'Ya, posisi Top 5 bersifat dinamis sesuai kontribusi terbesar. Namun, Anda selalu bisa menambah kontribusi kapan saja untuk mempertahankan atau merebut kembali posisi puncak!',
              },
              {
                q: 'Apa metode pembayaran yang tersedia?',
                a: 'Pembayaran diproses aman via Dojo Checkout. Untuk sponsor lokal (Indonesia) mendukung Transfer Bank BCA, dan untuk sponsor internasional mendukung pembayaran via Stripe.',
              },
              {
                q: 'Bagaimana cara mengganti logo atau tautan website setelah bayar?',
                a: 'Anda bisa menghubungi tim kurasi kami via dojo.cc/support atau membalas email konfirmasi invoice untuk memperbarui aset visual dan tautan website bisnis Anda.',
              },
              {
                q: 'Kapan akses VIP build mulai diberikan?',
                a: 'Backer akan menerima undangan langsung ke repositori staging dan akses rilis privat via email sebelum tanggal pengumuman rilis open source publik.',
              },
            ].map(({ q, a }) => (
              <div key={q} className="rounded-xl border border-border/60 bg-card p-5 text-left shadow-2xs">
                <h4 className="font-display text-base font-bold text-foreground flex items-center gap-2">
                  <HelpCircle className="h-4 w-4 text-primary shrink-0" strokeWidth={1.75} />
                  <span>{t(q)}</span>
                </h4>
                <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed pl-6">
                  {t(a)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center rounded-2xl border border-border/60 bg-muted/20 p-6 sm:p-8">
            <h3 className="font-display text-lg font-bold text-foreground">
              {t('Ada pertanyaan khusus sebelum bergabung?')}
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
              {t('Silakan hubungi kami di')}{' '}
              <a
                href="https://dojo.cc/support"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary hover:underline"
              >
                dojo.cc/support
              </a>
              .
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 border-t border-border/60 px-6 py-6 text-sm text-muted-foreground sm:px-8">
        <p className="flex items-center gap-1.5">
          <span className="font-display tracking-tight font-bold text-foreground">
            cuan
          </span>
          <span>· {t('Your always-on project manager.')}</span>
        </p>
        <div className="flex gap-5">
          <Link to="/" className="inline-flex min-h-11 items-center hover:text-foreground transition-colors">
            {t('Beranda')}
          </Link>
          <button
            type="button"
            onClick={() => setShowGithubModal(true)}
            className="inline-flex min-h-11 items-center hover:text-foreground transition-colors cursor-pointer"
          >
            GitHub
          </button>
        </div>
      </footer>

      {/* GitHub Curation Notice Modal */}
      {showGithubModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-labelledby="github-modal-title"
          onClick={() => setShowGithubModal(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl border border-border/80 bg-card p-6 shadow-xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted/60 text-foreground">
                  <Github className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 id="github-modal-title" className="font-display text-base font-bold text-foreground">
                    {t('Repositori Open Source Cuan v1.0')}
                  </h3>
                  <div className="inline-flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-400 font-medium">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                    <span>{t('Tahap Kurasi Final Rilis Publik (Apache-2.0)')}</span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowGithubModal(false)}
                className="rounded-lg p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
                aria-label={t('Tutup')}
              >
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              {t(
                'Repositori publik Cuan sedang disiapkan dan dirapikan untuk rilis open source resmi. Masukkan email Anda di Waiting List untuk mendapatkan notifikasi rilis pertama dan akses repositori prioritas.',
              )}
            </p>

            <div className="rounded-xl border border-border/60 bg-muted/20 p-3 text-xs text-muted-foreground flex items-center justify-between">
              <span>{t('Lisensi Terbuka:')}</span>
              <span className="font-mono font-semibold text-foreground">Apache License 2.0</span>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-2">
              <Link
                to="/"
                className="action-primary flex-1 min-h-11 px-4 text-sm font-semibold justify-center inline-flex items-center"
              >
                {t('Daftar Waiting List Sekarang')}
              </Link>
              <button
                type="button"
                onClick={() => setShowGithubModal(false)}
                className="action-secondary min-h-11 px-4 text-sm font-semibold justify-center cursor-pointer"
              >
                {t('Tutup')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
