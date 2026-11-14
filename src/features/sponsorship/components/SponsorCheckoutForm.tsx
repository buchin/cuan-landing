import { useState } from 'react'
import {
  Sparkles,
  ShieldCheck,
  Upload,
  X,
  AlertCircle,
  ArrowRight,
  Github,
} from 'lucide-react'
import { BcaIcon, StripeIcon } from '../../../components/brand/BrandIcons'
import { SponsorItem, formatIDR, PRESET_AMOUNTS } from '../types'
import { useLanguage } from '../../../context/LanguageContext'

interface SponsorCheckoutFormProps {
  checkoutRef: React.RefObject<HTMLDivElement | null>
  sponsors: SponsorItem[]
  minTop5Benchmark: number
  selectedAmount: number
  setSelectedAmount: (amount: number) => void
  isCustomAmount: boolean
  setIsCustomAmount: (isCustom: boolean) => void
}

export function SponsorCheckoutForm({
  checkoutRef,
  selectedAmount,
  setSelectedAmount,
  isCustomAmount,
  setIsCustomAmount,
}: SponsorCheckoutFormProps) {
  const { t } = useLanguage()

  const [customInput, setCustomInput] = useState<string>('')
  const [brandName, setBrandName] = useState<string>('')
  const [githubUsername, setGithubUsername] = useState<string>('')
  const [websiteUrl, setWebsiteUrl] = useState<string>('')
  const [slogan, setSlogan] = useState<string>('')
  const [contactEmail, setContactEmail] = useState<string>('')
  const [contactWA, setContactWA] = useState<string>('')
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setErrorMessage(t('Ukuran logo maksimal 2 MB'))
        return
      }
      setLogoFile(file)
      const reader = new FileReader()
      reader.onload = () => {
        setLogoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveLogo = () => {
    setLogoFile(null)
    setLogoPreview(null)
  }

  const handleSubmitCheckout = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)

    if (!brandName.trim()) {
      setErrorMessage(t('Mohon isi nama brand atau nama Anda'))
      return
    }

    if (!contactEmail.trim() || !contactEmail.includes('@')) {
      setErrorMessage(t('Mohon masukkan alamat email yang valid'))
      return
    }

    if (selectedAmount < 100_000) {
      setErrorMessage(t('Nominal dukungan minimal Rp 100.000'))
      return
    }

    setIsSubmitting(true)

    try {
      let uploadedLogoPath = ''

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

      const cleanGithub = githubUsername.trim().replace(/^@/, '')

      const checkoutRes = await fetch('/api/sponsors/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          brand_name: brandName.trim(),
          github_username: cleanGithub || undefined,
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

      // Fallback
      const fallbackUrl = new URL('https://dojo.cc/checkout/cuan-founding-backer')
      fallbackUrl.searchParams.set('amount', selectedAmount.toString())
      fallbackUrl.searchParams.set('brand', brandName.trim())
      if (cleanGithub) {
        fallbackUrl.searchParams.set('github', cleanGithub)
      }
      fallbackUrl.searchParams.set('email', contactEmail.trim())
      fallbackUrl.searchParams.set('return_url', `${window.location.origin}/sponsor?status=pending`)
      window.location.href = fallbackUrl.toString()
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err)
      setErrorMessage(`${t('Gagal menyiapkan checkout:')} ${msg}`)
      setIsSubmitting(false)
    }
  }

  const projectedTierLabel = selectedAmount >= 2_500_000
    ? t('🥇 #1 Platinum Titan · Tahta Utama #1 + Logo Eksklusif + Sorotan 63k')
    : selectedAmount >= 1_000_000
    ? t('Top 5 Titan · Akses Repo + Logo Utama + Sorotan 63k')
    : selectedAmount >= 300_000
    ? t('Logo & Backlink · Akses Repo + Logo di LP & Link Dofollow')
    : t('Supporter · Akses Private Repo + Nama Abadi di README')

  return (
    <section ref={checkoutRef as any} id="checkout" className="mx-auto max-w-3xl px-6 sm:px-8 mb-20 scroll-mt-20">
      <div className="rounded-2xl border border-border/80 bg-card p-6 sm:p-8 shadow-2xs space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-muted/40 px-3 py-1 text-xs font-semibold text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
            <span>{t('Satu Kali Pembayaran · Akses Repo Langsung')}</span>
          </div>
          <h2 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {t('Formulir Dukungan Sponsorware')}
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
            {t(
              'Tentukan nominal kontribusi yang nyaman bagi Anda (min. Rp 100.000). Akses script dan panduan langsung dikirimkan ke email & akun GitHub Anda.',
            )}
          </p>
        </div>

        <form onSubmit={handleSubmitCheckout} className="space-y-6">
          {/* Nominal Preset Chips */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs sm:text-sm font-semibold text-foreground">
                {t('Pilih Nominal Dukungan (Bayar Suka-Suka):')}
              </label>
              <span className="text-2xs text-muted-foreground">
                {t('Min. Rp 100.000')}
              </span>
            </div>

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
                    className={`relative min-h-16 rounded-2xl border p-2.5 text-center transition-all cursor-pointer flex flex-col justify-center items-center ${
                      isSelected
                        ? 'border-primary bg-primary/10 text-primary font-bold shadow-2xs ring-1 ring-primary'
                        : 'border-border/70 bg-card text-foreground hover:bg-muted/40'
                    }`}
                  >
                    {p.popular && (
                      <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold text-primary-foreground shadow-xs whitespace-nowrap">
                        {t('Paling Populer')}
                      </span>
                    )}
                    <span className="text-xs sm:text-sm font-bold">{p.label}</span>
                    <span className="text-2xs text-muted-foreground mt-0.5 line-clamp-1">{p.perk || p.tier}</span>
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
                  {t('+ Masukkan Nominal Kustom Lainnya (Min. Rp 100.000)')}
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-semibold text-muted-foreground">
                      Rp
                    </span>
                    <input
                      type="number"
                      min="100000"
                      step="50000"
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
                      setSelectedAmount(100_000)
                    }}
                    className="rounded-xl border border-border/60 bg-muted/30 px-3 py-2.5 text-xs text-muted-foreground hover:text-foreground cursor-pointer"
                  >
                    {t('Kembali ke Preset')}
                  </button>
                </div>
              )}
            </div>

            {/* Active Tier Summary Pill */}
            <div className="pt-1">
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-border/60 bg-muted/20 px-3 py-1.5 text-2xs text-foreground/80">
                <span className="font-semibold">{t('Hak yang terbuka:')}</span>
                <span className="text-primary font-medium">{projectedTierLabel}</span>
              </span>
            </div>
          </div>

          {/* Hairline Divider */}
          <div className="border-t border-border/40 pt-4 space-y-4">
            <h4 className="font-display text-sm font-bold text-foreground">
              {t('Informasi Penerima Akses & Profil:')}
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
                <label className="block text-xs font-semibold text-foreground mb-1.5 flex items-center gap-1.5">
                  <Github className="h-3.5 w-3.5 text-foreground/80" />
                  <span>{t('Username GitHub (Opsional)')}</span>
                </label>
                <input
                  type="text"
                  value={githubUsername}
                  onChange={(e) => setGithubUsername(e.target.value)}
                  placeholder="Contoh: octocat (opsional)"
                  className="w-full rounded-xl border border-border/80 bg-background px-3.5 py-2.5 text-xs sm:text-sm text-foreground focus:border-primary focus:outline-hidden"
                />
                <p className="mt-1 text-2xs text-muted-foreground">
                  {t('Diperlukan untuk menerima undangan akses kolaborator ke private repository Cuan.')}
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">
                  {t('Telegram / No. WhatsApp (Opsional)')}
                </label>
                <input
                  type="text"
                  value={contactWA}
                  onChange={(e) => setContactWA(e.target.value)}
                  placeholder={t('@username / 0812xxxxxxxx')}
                  className="w-full rounded-xl border border-border/80 bg-background px-3.5 py-2.5 text-xs sm:text-sm text-foreground focus:border-primary focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">
                {t('Tautan Website Resmi (Opsional untuk Backlink)')}
              </label>
              <input
                type="url"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                placeholder="https://studioanda.com"
                className="w-full rounded-xl border border-border/80 bg-background px-3.5 py-2.5 text-xs sm:text-sm text-foreground focus:border-primary focus:outline-hidden"
              />
              <p className="mt-1 text-[11px] text-muted-foreground/60 flex items-center gap-1">
                <ShieldCheck className="h-3 w-3 text-muted-foreground/50 shrink-0" />
                <span>{t('Kurasi: Bebas judol & konten melanggar hukum.')}</span>
              </p>
            </div>

            {/* Optional Logo & Slogan for Tier >= 300.000 */}
            {selectedAmount >= 300_000 && (
              <div className="space-y-4 pt-2 border-t border-border/40">
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

                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">
                    {t('Upload Logo Brand (Opsional)')}
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
                        {t('Pilih Berkas Logo (SVG, PNG, atau WebP)')}
                      </span>
                      <span className="text-2xs text-muted-foreground mt-0.5">
                        {t('Belum siap sekarang? Bisa dikosongkan dulu, tim kami akan meminta aset via WhatsApp/Email setelah pembayaran.')}
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
            )}
          </div>

          {/* Early Access Privilege Note (Positive, High-Value Framing) */}
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 text-xs text-foreground/90 flex items-start gap-3">
            <Sparkles className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="font-semibold text-foreground">
                {t('Hak Istimewa Early Access (v0.9 Preview):')}
              </div>
              <p className="leading-relaxed text-muted-foreground text-2xs sm:text-xs">
                {t(
                  'Sebagai Founding Sponsor, Anda berhak mencoba fitur-fitur baru lebih awal dan mendapatkan update perbaikan berkala langsung sebelum rilis publik resmi v1.0.',
                )}
              </p>
            </div>
          </div>

          {/* Error Message Alert */}
          {errorMessage && (
            <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-3.5 text-xs text-rose-600 dark:text-rose-400 flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Submit Checkout Button (Punchy, Clean, Focused) */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="action-primary w-full min-h-12 text-sm sm:text-base font-bold justify-center gap-2 shadow-xs cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>{t('Menyiapkan Checkout Dojo...')}</span>
            ) : (
              <>
                <span>{`${t('Dukung Sekarang')} — ${formatIDR(selectedAmount)}`}</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>

          <div className="flex flex-col items-center justify-center gap-2 pt-1 text-center">
            <p className="text-xs text-muted-foreground">
              {t(
                'Pembayaran diproses aman oleh Dojo via Transfer Bank BCA (Lokal) & Stripe (Internasional).',
              )}
            </p>
            <div className="flex items-center gap-2.5 text-muted-foreground/60">
              <BcaIcon className="h-4 w-auto fill-current" />
              <span className="text-border/80 text-2xs select-none">•</span>
              <StripeIcon className="h-3.5 w-auto fill-current" />
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}
