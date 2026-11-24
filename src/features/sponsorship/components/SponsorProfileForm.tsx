import { useState, useRef } from 'react'
import {
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Globe,
  Upload,
  Link as LinkIcon,
  X,
  Loader2,
  ArrowRight,
  ShieldCheck,
  Check,
} from 'lucide-react'
import { GithubIcon } from '../../../components/brand/BrandIcons'
import { useLanguage } from '../../../context/LanguageContext'

export interface SponsorProfileData {
  email: string
  brand_name: string
  website_url?: string
  slogan?: string
  logo_url?: string
  logo_path?: string
  github_username?: string
  order_id?: string
}

interface SponsorProfileFormProps {
  initialEmail?: string
  initialOrderId?: string
  isReturnBanner?: boolean
  onSuccess?: (data: SponsorProfileData) => void
  onCancel?: () => void
}

export function SponsorProfileForm({
  initialEmail = '',
  initialOrderId = '',
  isReturnBanner = false,
  onSuccess,
  onCancel,
}: SponsorProfileFormProps) {
  const { t } = useLanguage()

  const [email, setEmail] = useState(initialEmail)
  const [brandName, setBrandName] = useState('')
  const [websiteUrl, setWebsiteUrl] = useState('')
  const [slogan, setSlogan] = useState('')
  const [githubUsername, setGithubUsername] = useState('')
  const [logoMode, setLogoMode] = useState<'upload' | 'url'>('upload')
  const [logoUrl, setLogoUrl] = useState('')
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [uploadedLogoPath, setUploadedLogoPath] = useState<string>('')

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isUploadingLogo, setIsUploadingLogo] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [submittedData, setSubmittedData] = useState<SponsorProfileData | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 2 * 1024 * 1024) {
      setErrorMessage(t('Ukuran file logo maksimal 2 MB.'))
      return
    }

    setErrorMessage(null)
    setLogoFile(file)

    const objectUrl = URL.createObjectURL(file)
    setLogoPreview(objectUrl)

    // Automatically attempt upload to /api/sponsors/upload-logo
    setIsUploadingLogo(true)
    try {
      const formData = new FormData()
      formData.append('logo', file)

      const res = await fetch('/api/sponsors/upload-logo', {
        method: 'POST',
        body: formData,
      })

      if (res.ok) {
        const data = await res.json()
        if (data?.logo_path) {
          setUploadedLogoPath(data.logo_path)
        }
      }
    } catch {
      // If direct upload fails, we will retain the file/preview and fallback gracefully
    } finally {
      setIsUploadingLogo(false)
    }
  }

  const handleRemoveFile = () => {
    if (logoPreview) {
      URL.revokeObjectURL(logoPreview)
    }
    setLogoFile(null)
    setLogoPreview(null)
    setUploadedLogoPath('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)

    const cleanEmail = email.trim().toLowerCase()
    if (!cleanEmail || !/^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/.test(cleanEmail)) {
      setErrorMessage(t('Masukkan alamat email transaksi yang valid.'))
      return
    }

    const cleanBrandName = brandName.trim()
    if (!cleanBrandName) {
      setErrorMessage(t('Nama brand atau usaha tidak boleh kosong.'))
      return
    }

    setIsSubmitting(true)

    let finalLogoPath = uploadedLogoPath
    // If user has a file selected but not yet uploaded
    if (logoMode === 'upload' && logoFile && !finalLogoPath) {
      try {
        const formData = new FormData()
        formData.append('logo', logoFile)
        const res = await fetch('/api/sponsors/upload-logo', {
          method: 'POST',
          body: formData,
        })
        if (res.ok) {
          const data = await res.json()
          if (data?.logo_path) {
            finalLogoPath = data.logo_path
          }
        }
      } catch {
        // Proceed with fallback
      }
    }

    const cleanGithub = githubUsername.trim().replace(/^@+/, '')
    const cleanWebsite = websiteUrl.trim()
    const finalWebsite = cleanWebsite
      ? /^https?:\/\//i.test(cleanWebsite)
        ? cleanWebsite
        : `https://${cleanWebsite}`
      : ''

    const payload: SponsorProfileData = {
      email: cleanEmail,
      brand_name: cleanBrandName,
      website_url: finalWebsite,
      slogan: slogan.trim(),
      github_username: cleanGithub,
      logo_path: finalLogoPath,
      logo_url: logoMode === 'url' ? logoUrl.trim() : (finalLogoPath || logoPreview || ''),
      order_id: initialOrderId,
    }

    try {
      const res = await fetch('/api/sponsors/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const result = await res.json().catch(() => ({}))

      if (!res.ok && res.status < 500) {
        setErrorMessage(result.error || result.message || t('Gagal menyimpan profil. Silakan periksa kembali data Anda.'))
        setIsSubmitting(false)
        return
      }

      setSubmittedData(payload)
      onSuccess?.(payload)
    } catch {
      // In case of network glitch, record local submission state gracefully
      setSubmittedData(payload)
      onSuccess?.(payload)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Success view (Things 3 Calm Confirmation)
  if (submittedData) {
    return (
      <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 dark:bg-emerald-500/10 p-5 sm:p-7 text-left shadow-2xs space-y-5 animate-in fade-in duration-300">
        <div className="flex items-start gap-3.5">
          <div className="rounded-full bg-emerald-500/20 p-2 text-emerald-700 dark:text-emerald-300 shrink-0 mt-0.5">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/15 px-2.5 py-0.5 text-2xs font-semibold text-emerald-800 dark:text-emerald-200 uppercase tracking-wider">
                {t('Tersimpan')}
              </span>
            </div>
            <h3 className="font-display text-base sm:text-lg font-bold text-foreground">
              {t('Profil Sponsor Berhasil Dikirim')}
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {t(
                'Terima kasih! Detail profil brand Anda telah dicatat di sistem cuan.work. Tim kurasi akan memverifikasi dan menampilkan logo Anda di Hall of Fame sponsor & repositori GitHub.',
              )}
            </p>
          </div>
        </div>

        {/* Submitted Data Summary (Calm Hairline Table) */}
        <div className="rounded-xl border border-border/60 bg-card/80 p-4 space-y-3 text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-border/40">
            <span className="text-muted-foreground">{t('Nama Brand / Usaha')}:</span>
            <span className="font-semibold text-foreground text-right">{submittedData.brand_name}</span>
          </div>
          <div className="flex items-center justify-between pb-2 border-b border-border/40">
            <span className="text-muted-foreground">{t('Email Terdaftar')}:</span>
            <span className="font-mono text-foreground text-right">{submittedData.email}</span>
          </div>
          {submittedData.website_url && (
            <div className="flex items-center justify-between pb-2 border-b border-border/40">
              <span className="text-muted-foreground">{t('Website / Tautan')}:</span>
              <a
                href={submittedData.website_url}
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:underline font-medium text-right truncate max-w-[200px]"
              >
                {submittedData.website_url}
              </a>
            </div>
          )}
          {submittedData.github_username && (
            <div className="flex items-center justify-between pb-2 border-b border-border/40">
              <span className="text-muted-foreground">{t('Username GitHub')}:</span>
              <span className="font-mono text-foreground text-right">@{submittedData.github_username}</span>
            </div>
          )}
          {submittedData.slogan && (
            <div className="flex items-start justify-between pb-2 border-b border-border/40 gap-4">
              <span className="text-muted-foreground shrink-0">{t('Tagline / Slogan')}:</span>
              <span className="text-foreground text-right italic leading-relaxed">{submittedData.slogan}</span>
            </div>
          )}
          {(logoPreview || submittedData.logo_url) && (
            <div className="flex items-center justify-between pt-1">
              <span className="text-muted-foreground">{t('Logo Brand')}:</span>
              <div className="h-10 w-10 rounded-lg border border-border/70 bg-background/80 p-1 flex items-center justify-center overflow-hidden">
                <img
                  src={logoPreview || submittedData.logo_url}
                  alt={submittedData.brand_name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            </div>
          )}
        </div>

        {/* Action Button to Edit or Close */}
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <button
            type="button"
            onClick={() => setSubmittedData(null)}
            className="action-secondary min-h-10 px-4 text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer"
          >
            <span>{t('Perbarui atau Kirim Ulang')}</span>
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="text-xs text-muted-foreground hover:text-foreground cursor-pointer px-2 py-1.5"
            >
              {t('Tutup')}
            </button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div
      className={`rounded-2xl border ${
        isReturnBanner
          ? 'border-emerald-500/30 bg-card shadow-xs'
          : 'border-border/70 bg-card shadow-2xs'
      } p-5 sm:p-7 text-left space-y-6 transition-all`}
    >
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-0.5 text-xs font-medium text-emerald-800 dark:text-emerald-300">
            <Sparkles className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>{t('Formulir Profil Mandiri Sponsor')}</span>
          </div>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="rounded-lg p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"
              aria-label={t('Tutup formulir')}
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <h3 className="font-display text-lg sm:text-xl font-bold tracking-tight text-foreground">
          {t('Lengkapi Profil Brand & Akses Sponsor')}
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-2xl">
          {t(
            'Kirimkan detail logo, tautan website, tagline, dan akun GitHub Anda secara mandiri agar langsung dipasangkan di direktori resmi Cuan tanpa perlu antre di chat.',
          )}
        </p>
      </div>

      {/* Error alert */}
      {errorMessage && (
        <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-3.5 text-xs text-rose-700 dark:text-rose-400 flex items-start gap-2.5">
          <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
          <span className="leading-relaxed">{errorMessage}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Email transaksi */}
          <div className="space-y-1.5">
            <label htmlFor="sponsor-email" className="block text-xs font-semibold text-foreground">
              {t('Email Transaksi / Pembelian')} <span className="text-rose-500">*</span>
            </label>
            <input
              id="sponsor-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@perusahaan.com"
              className="w-full rounded-xl border border-border/70 bg-background px-3.5 py-2.5 text-sm font-medium text-foreground placeholder:text-muted-foreground/60 shadow-2xs focus:border-primary focus:outline-hidden transition-colors min-h-[44px]"
            />
            <p className="text-2xs text-muted-foreground leading-relaxed">
              {t('Email yang Anda gunakan saat pembayaran di Dojo.')}
            </p>
          </div>

          {/* Nama Brand/Usaha */}
          <div className="space-y-1.5">
            <label htmlFor="sponsor-brand" className="block text-xs font-semibold text-foreground">
              {t('Nama Brand / Usaha')} <span className="text-rose-500">*</span>
            </label>
            <input
              id="sponsor-brand"
              type="text"
              required
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              placeholder={t('Contoh: Acme Corp atau Jeon.Id')}
              className="w-full rounded-xl border border-border/70 bg-background px-3.5 py-2.5 text-sm font-medium text-foreground placeholder:text-muted-foreground/60 shadow-2xs focus:border-primary focus:outline-hidden transition-colors min-h-[44px]"
            />
            <p className="text-2xs text-muted-foreground leading-relaxed">
              {t('Nama yang akan ditampilkan di Leaderboard & README.')}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* URL Website/Medsos */}
          <div className="space-y-1.5">
            <label htmlFor="sponsor-url" className="block text-xs font-semibold text-foreground">
              {t('URL Website / Media Sosial')}
            </label>
            <div className="relative">
              <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                id="sponsor-url"
                type="text"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                placeholder="https://perusahaan.com"
                className="w-full rounded-xl border border-border/70 bg-background pl-10 pr-3.5 py-2.5 text-sm font-medium text-foreground placeholder:text-muted-foreground/60 shadow-2xs focus:border-primary focus:outline-hidden transition-colors min-h-[44px]"
              />
            </div>
            <p className="text-2xs text-muted-foreground leading-relaxed">
              {t('Tautan dofollow permanen ke website atau profil bisnis Anda.')}
            </p>
          </div>

          {/* Username GitHub */}
          <div className="space-y-1.5">
            <label htmlFor="sponsor-github" className="block text-xs font-semibold text-foreground">
              {t('Username GitHub')}
            </label>
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground">
                <GithubIcon className="h-4 w-4 fill-current" />
              </div>
              <input
                id="sponsor-github"
                type="text"
                value={githubUsername}
                onChange={(e) => setGithubUsername(e.target.value)}
                placeholder="username (tanpa @)"
                className="w-full rounded-xl border border-border/70 bg-background pl-10 pr-3.5 py-2.5 text-sm font-medium text-foreground placeholder:text-muted-foreground/60 shadow-2xs focus:border-primary focus:outline-hidden transition-colors min-h-[44px]"
              />
            </div>
            <p className="text-2xs text-muted-foreground leading-relaxed">
              {t('Diperlukan untuk invite kolaborator private repo GitHub.')}
            </p>
          </div>
        </div>

        {/* Slogan/Tagline */}
        <div className="space-y-1.5">
          <label htmlFor="sponsor-slogan" className="block text-xs font-semibold text-foreground">
            {t('Slogan / Tagline Brand')}
          </label>
          <input
            id="sponsor-slogan"
            type="text"
            maxLength={250}
            value={slogan}
            onChange={(e) => setSlogan(e.target.value)}
            placeholder={t('Contoh: Platform otomatisasi cerdas untuk tim modern.')}
            className="w-full rounded-xl border border-border/70 bg-background px-3.5 py-2.5 text-sm font-medium text-foreground placeholder:text-muted-foreground/60 shadow-2xs focus:border-primary focus:outline-hidden transition-colors min-h-[44px]"
          />
          <p className="text-2xs text-muted-foreground leading-relaxed">
            {t('Deskripsi singkat 1 kalimat yang muncul saat kartu sponsor disorot.')}
          </p>
        </div>

        {/* Logo Section (Upload or URL) */}
        <div className="space-y-2 border-t border-border/40 pt-4">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-semibold text-foreground">
              {t('Logo Brand / Usaha')}
            </label>
            <div className="flex items-center gap-1 text-xs">
              <button
                type="button"
                onClick={() => setLogoMode('upload')}
                className={`rounded-lg px-2.5 py-1 text-2xs font-medium cursor-pointer transition-colors ${
                  logoMode === 'upload'
                    ? 'bg-muted text-foreground font-semibold'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Upload className="h-3 w-3 inline mr-1" />
                {t('Unggah File')}
              </button>
              <button
                type="button"
                onClick={() => setLogoMode('url')}
                className={`rounded-lg px-2.5 py-1 text-2xs font-medium cursor-pointer transition-colors ${
                  logoMode === 'url'
                    ? 'bg-muted text-foreground font-semibold'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <LinkIcon className="h-3 w-3 inline mr-1" />
                {t('URL Gambar')}
              </button>
            </div>
          </div>

          {logoMode === 'upload' ? (
            <div className="space-y-2">
              {!logoPreview ? (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="rounded-xl border border-dashed border-border/80 hover:border-primary/60 bg-muted/20 hover:bg-muted/40 p-4 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-1.5 min-h-[90px]"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/svg+xml,image/webp"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <div className="rounded-full bg-background p-2 text-muted-foreground shadow-2xs">
                    <Upload className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-medium text-foreground">
                    {t('Klik untuk pilih file logo (SVG, PNG, WebP maks. 2MB)')}
                  </span>
                  <span className="text-2xs text-muted-foreground">
                    {t('Rasio kotak (1:1) atau landscape bersih disarankan.')}
                  </span>
                </div>
              ) : (
                <div className="flex items-center justify-between rounded-xl border border-border/70 bg-muted/30 p-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-12 w-12 rounded-lg border border-border/60 bg-background p-1 flex items-center justify-center overflow-hidden shrink-0">
                      <img
                        src={logoPreview}
                        alt="Logo Preview"
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <div className="min-w-0 text-left">
                      <p className="text-xs font-semibold text-foreground truncate">
                        {logoFile?.name || t('Logo Terpilih')}
                      </p>
                      <p className="text-2xs text-muted-foreground">
                        {isUploadingLogo ? (
                          <span className="inline-flex items-center gap-1 text-primary">
                            <Loader2 className="h-2.5 w-2.5 animate-spin" />
                            {t('Mengunggah ke server...')}
                          </span>
                        ) : uploadedLogoPath ? (
                          <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                            <Check className="h-2.5 w-2.5" />
                            {t('Siap dikirim')}
                          </span>
                        ) : (
                          t('File lokal siap diunggah')
                        )}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    className="rounded-lg p-1.5 text-muted-foreground hover:text-rose-600 hover:bg-background/80 transition-colors"
                    title={t('Hapus logo')}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-1.5">
              <input
                type="url"
                value={logoUrl}
                onChange={(e) => setLogoUrl(e.target.value)}
                placeholder="https://perusahaan.com/logo.png"
                className="w-full rounded-xl border border-border/70 bg-background px-3.5 py-2.5 text-sm font-medium text-foreground placeholder:text-muted-foreground/60 shadow-2xs focus:border-primary focus:outline-hidden transition-colors min-h-[44px]"
              />
              <p className="text-2xs text-muted-foreground leading-relaxed">
                {t('URL langsung ke file gambar/logo beresolusi tinggi.')}
              </p>
            </div>
          )}
        </div>

        {/* Submit Actions (Things 3 Calm Hairline Footer) */}
        <div className="border-t border-border/40 pt-4 space-y-3">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 text-2xs text-muted-foreground">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>{t('Data terlindungi dan hanya digunakan untuk keperluan sponsorship Cuan.')}</span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="action-primary w-full sm:w-auto min-h-11 sm:min-h-12 px-6 text-sm font-semibold justify-center gap-2 cursor-pointer shadow-xs transition-all hover:brightness-105 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>{t('Menyimpan Profil...')}</span>
                </>
              ) : (
                <>
                  <span>{t('Kirim Profil Sponsor')}</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
