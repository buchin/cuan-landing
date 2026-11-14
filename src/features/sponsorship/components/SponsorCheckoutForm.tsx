import { useState } from 'react'
import {
  ShieldCheck,
  Upload,
  X,
  AlertCircle,
  ArrowRight,
  Plus,
  Minus,
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
  const [websiteUrl, setWebsiteUrl] = useState<string>('')
  const [slogan, setSlogan] = useState<string>('')
  const [contactEmail, setContactEmail] = useState<string>('')
  const [contactWA, setContactWA] = useState<string>('')
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [showOptionalFields, setShowOptionalFields] = useState<boolean>(false)

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

      const sanitizedWebsite = websiteUrl.trim() || 'https://cuan.work'

      const checkoutRes = await fetch('/api/sponsors/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          brand_name: brandName.trim(),
          website_url: sanitizedWebsite,
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
      fallbackUrl.searchParams.set('email', contactEmail.trim())
      fallbackUrl.searchParams.set('return_url', `${window.location.origin}/sponsor?status=pending`)
      window.location.href = fallbackUrl.toString()
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err)
      setErrorMessage(`${t('Gagal menyiapkan checkout:')} ${msg}`)
      setIsSubmitting(false)
    }
  }

  const projectedTier = selectedAmount >= 2_500_000
    ? {
        name: 'Founding Patron',
        desc: t('Akses Private Repo + Posisi Logo Teratas di Website & README + Sorotan ke 63.000+ Audiens.'),
      }
    : selectedAmount >= 1_000_000
    ? {
        name: 'Titan Backer',
        desc: t('Akses Private Repo + Posisi Logo Utama di Website & README + Sorotan ke 63.000+ Audiens.'),
      }
    : selectedAmount >= 300_000
    ? {
        name: 'Logo & Backlink',
        desc: t('Akses Private Repo + Logo Terpampang di Website + Backlink Dofollow Resmi.'),
      }
    : {
        name: 'Supporter',
        desc: t('Akses Penuh Private Repo GitHub v0.9 & v1.0 + Nama Abadi di README.'),
      }

  return (
    <section ref={checkoutRef as any} id="checkout" className="mx-auto max-w-2xl px-6 sm:px-8 mb-24 scroll-mt-20">
      {/* Things 3 Single Card: Zero Nested Boxes */}
      <div className="rounded-2xl border border-border/70 bg-card p-6 sm:p-8 shadow-2xs space-y-6">
        {/* Header */}
        <div className="space-y-1.5">
          <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-foreground">
            {t('Pilih Paket Dukungan Sponsor')}
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            {t(
              'Satu kali kontribusi untuk membuka akses private repo Cuan v0.9 & v1.0. Tanda terima dan akses langsung dikirimkan ke email Anda.',
            )}
          </p>
        </div>

        <form onSubmit={handleSubmitCheckout} className="space-y-6">
          {/* Section 1: Presets (Calm & Clean, No Floating Badges) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-foreground">
                {t('Pilih Nominal (Bayar Suka-Suka):')}
              </span>
              <span className="text-muted-foreground tabular-nums">
                {t('Min. Rp 100.000')}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
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
                    className={`min-h-[58px] rounded-xl border px-3 py-2 text-center transition-all cursor-pointer flex flex-col justify-center items-center ${
                      isSelected
                        ? 'border-primary bg-primary/10 text-primary font-bold shadow-2xs ring-1 ring-primary/40'
                        : 'border-border/60 bg-background/50 text-foreground hover:bg-muted/40 hover:border-border/80'
                    }`}
                  >
                    <span className="text-xs sm:text-sm font-semibold tracking-tight">{p.label}</span>
                    <span className="text-[11px] text-muted-foreground mt-0.5 whitespace-nowrap">
                      {p.perk}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Custom Amount Field */}
            <div className="pt-0.5">
              {!isCustomAmount ? (
                <button
                  type="button"
                  onClick={() => {
                    setIsCustomAmount(true)
                    setCustomInput(selectedAmount.toString())
                  }}
                  className="text-xs font-medium text-primary hover:underline cursor-pointer inline-flex items-center gap-1"
                >
                  <span>{t('+ Masukkan Nominal Kustom Lainnya (Min. Rp 100.000)')}</span>
                </button>
              ) : (
                <div className="flex items-center gap-2 pt-1">
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
                      className="w-full rounded-xl border border-border/70 bg-background pl-11 pr-4 py-2.5 text-sm font-medium text-foreground shadow-2xs focus:border-primary focus:outline-hidden transition-colors"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setIsCustomAmount(false)
                      setSelectedAmount(300_000)
                    }}
                    className="rounded-xl border border-border/60 bg-muted/30 px-3.5 py-2.5 text-xs font-medium text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
                  >
                    {t('Kembali ke Preset')}
                  </button>
                </div>
              )}
            </div>

            {/* Quiet Tier Benefit (Pure typography, Zero Nested Boxes) */}
            <div className="pt-1 text-xs text-muted-foreground leading-relaxed">
              <span className="font-semibold text-foreground">{projectedTier.name}: </span>
              <span>{projectedTier.desc}</span>
            </div>
          </div>

          {/* Section 2: Hairline Divider & Primary Intake */}
          <div className="border-t border-border/40 pt-5 space-y-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {t('Penerima Akses')}
            </div>

            {/* 2 Symmetrical Primary Inputs */}
            <div className="grid gap-3.5 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-medium text-foreground mb-1.5">
                  {t('Nama Brand / Nama Anda *')}
                </label>
                <input
                  type="text"
                  required
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  placeholder="Contoh: Dojo Studio / Budi"
                  className="w-full rounded-xl border border-border/70 bg-background px-3.5 py-2.5 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/40 shadow-2xs focus:border-primary focus:outline-hidden transition-colors"
                />
                <p className="mt-1 text-2xs text-muted-foreground">
                  {t('Ditampilkan di daftar sponsor repositori & website.')}
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground mb-1.5">
                  {t('Alamat Email Kontak *')}
                </label>
                <input
                  type="email"
                  required
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="nama@email.com"
                  className="w-full rounded-xl border border-border/70 bg-background px-3.5 py-2.5 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/40 shadow-2xs focus:border-primary focus:outline-hidden transition-colors"
                />
                <p className="mt-1 text-2xs text-muted-foreground">
                  {t('Undangan kolaborator GitHub & invoice dikirim ke sini.')}
                </p>
              </div>
            </div>

            {/* Progressive Disclosure (Zero Nested Card - Flat on Canvas) */}
            <div className="pt-1">
              <button
                type="button"
                onClick={() => setShowOptionalFields(!showOptionalFields)}
                className="text-xs font-semibold text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 cursor-pointer select-none transition-colors"
              >
                {showOptionalFields ? (
                  <Minus className="h-3.5 w-3.5 text-primary" />
                ) : (
                  <Plus className="h-3.5 w-3.5 text-primary" />
                )}
                <span>{t('Lengkapi Profil Publik & Logo (Opsional)')}</span>
              </button>

              {showOptionalFields && (
                <div className="pt-3.5 space-y-4">
                  <div className="grid gap-3.5 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-medium text-foreground mb-1.5">
                        {t('WhatsApp / Telegram (Opsional)')}
                      </label>
                      <input
                        type="text"
                        value={contactWA}
                        onChange={(e) => setContactWA(e.target.value)}
                        placeholder="@username / 0812xxxxxxxx"
                        className="w-full rounded-xl border border-border/70 bg-background px-3.5 py-2.5 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/40 shadow-2xs focus:border-primary focus:outline-hidden transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-foreground mb-1.5">
                        {t('Tautan Website Resmi (Opsional)')}
                      </label>
                      <input
                        type="url"
                        value={websiteUrl}
                        onChange={(e) => setWebsiteUrl(e.target.value)}
                        placeholder="https://studioanda.com"
                        className="w-full rounded-xl border border-border/70 bg-background px-3.5 py-2.5 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/40 shadow-2xs focus:border-primary focus:outline-hidden transition-colors"
                      />
                      <p className="mt-1 text-2xs text-muted-foreground flex items-center gap-1">
                        <ShieldCheck className="h-3 w-3 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span>{t('Backlink dofollow resmi.')}</span>
                      </p>
                    </div>
                  </div>

                  {/* Slogan & Logo only if >= 300.000 */}
                  {selectedAmount >= 300_000 && (
                    <div className="space-y-3.5 pt-1">
                      <div>
                        <label className="block text-xs font-medium text-foreground mb-1.5">
                          {t('Slogan Singkat (Maks. 60 Karakter, Opsional)')}
                        </label>
                        <input
                          type="text"
                          maxLength={60}
                          value={slogan}
                          onChange={(e) => setSlogan(e.target.value)}
                          placeholder="Solusi Otomasi Digital untuk Kreator"
                          className="w-full rounded-xl border border-border/70 bg-background px-3.5 py-2.5 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/40 shadow-2xs focus:border-primary focus:outline-hidden transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-foreground mb-1.5">
                          {t('Berkas Logo (Opsional)')}
                        </label>
                        {logoPreview ? (
                          <div className="flex items-center gap-2.5 rounded-xl border border-border/60 bg-muted/20 px-3.5 py-2 shadow-2xs">
                            <img src={logoPreview} alt="Logo" className="h-6 w-auto object-contain rounded" />
                            <span className="text-xs text-muted-foreground font-mono flex-1 truncate">
                              {logoFile?.name}
                            </span>
                            <button
                              type="button"
                              onClick={handleRemoveLogo}
                              className="text-xs text-muted-foreground hover:text-foreground cursor-pointer transition-colors p-1"
                              title={t('Hapus Logo')}
                            >
                              <X className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-3">
                            <label className="action-secondary text-xs min-h-9 px-3.5 py-1.5 inline-flex items-center gap-1.5 cursor-pointer shadow-2xs">
                              <Upload className="h-3.5 w-3.5 text-muted-foreground" />
                              <span>{t('Pilih Berkas (SVG/PNG)')}</span>
                              <input
                                type="file"
                                accept=".svg,.png,.webp"
                                onChange={handleLogoChange}
                                className="hidden"
                              />
                            </label>
                            <span className="text-2xs text-muted-foreground">
                              {t('Bisa dikosongkan dulu jika belum siap.')}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Section 3: Hairline Divider & Submission */}
          <div className="border-t border-border/40 pt-5 space-y-3.5">
            <p className="text-2xs text-muted-foreground leading-relaxed">
              {t(
                'Sebagai Founding Sponsor, Anda berhak mencoba fitur v0.9 preview lebih awal dan mendapatkan update perbaikan berkala sebelum rilis publik resmi v1.0.',
              )}
            </p>

            {/* Error Message Alert */}
            {errorMessage && (
              <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-600 dark:text-rose-400 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Submit Checkout Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="action-primary w-full min-h-12 text-sm sm:text-base font-semibold justify-center gap-2 shadow-xs cursor-pointer disabled:opacity-50 transition-all hover:brightness-105 active:scale-[0.99]"
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

            <div className="flex items-center justify-between text-2xs text-muted-foreground pt-1">
              <span>{t('Diproses aman oleh Dojo via Transfer BCA & Stripe.')}</span>
              <div className="flex items-center gap-2 text-muted-foreground/60">
                <BcaIcon className="h-3.5 w-auto fill-current" />
                <span>•</span>
                <StripeIcon className="h-3 w-auto fill-current" />
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}
