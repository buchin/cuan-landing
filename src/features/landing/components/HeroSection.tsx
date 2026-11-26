import { useState } from 'react'
import {
  ShieldCheck,
  Zap,
  Check,
  Copy,
} from 'lucide-react'
import { useLanguage } from '../../../context/LanguageContext'

export function HeroSection() {
  const { t } = useLanguage()
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

  return (
    <section
      className="relative mx-auto max-w-6xl px-6 pb-12 pt-10 text-center sm:px-8 sm:pb-16 sm:pt-14"
      aria-labelledby="landing-title"
    >
      <div className="mx-auto max-w-3xl">
        {/* Calm Public Alpha eyebrow */}
        <div className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground mb-5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
          <span>{t('Public Alpha · Repositori Cuan Resmi Dibuka di GitHub')}</span>
        </div>

        <h1
          id="landing-title"
          className="text-4xl sm:text-5xl md:text-6xl lg:leading-[1.12] tracking-tight text-foreground max-w-3xl mx-auto"
        >
          <span className="font-display font-bold">{t('AI untuk Kelola Aset Digital')}</span>{' '}
          <span className="font-serif italic font-normal text-foreground/90">{t('dari Ide sampai Cuan.')}</span>
        </h1>

        <p className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg font-normal text-muted-foreground/90 leading-relaxed max-w-2xl mx-auto">
          {t('Dari website, blog, toko online, konten sosmed, hingga custom script — Cuan bantu jalankan berbagai proyek digital Anda di server sendiri.')}
        </p>

        {/* Quick Install Box (Single Primary CTA) & Supporting Links */}
        <div className="mt-8 max-w-xl mx-auto w-full">
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

          {/* Calm Alpha Stability Note */}
          <p className="mt-4 text-xs text-muted-foreground/85 leading-relaxed">
            <strong className="font-medium text-foreground/85">{t('Status Public Alpha (v0.9.x):')}</strong>{' '}
            {t('Belum disarankan untuk operasional bisnis utama (')}
            <em>production</em>
            {t('). Gunakan untuk uji coba dan bantu laporkan kendala di GitHub Issues.')}
          </p>
        </div>
      </div>

      {/* Centered 3-Device Mockup Showcase */}
      <div className="mx-auto mt-10 max-w-4xl sm:mt-14">
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
