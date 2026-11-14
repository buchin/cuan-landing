import { useState } from 'react'
import { ArrowRight, CheckCircle2, Check } from 'lucide-react'
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

  const handleProceedToDojo = (e: React.FormEvent) => {
    e.preventDefault()

    const finalAmount = Math.max(100_000, selectedAmount)
    const checkoutUrl = new URL('https://dojo.cc/checkout/cuan-founding-backer')
    checkoutUrl.searchParams.set('amount', finalAmount.toString())
    checkoutUrl.searchParams.set(
      'return_url',
      `${window.location.origin}/sponsor?status=pending`
    )
    window.location.href = checkoutUrl.toString()
  }

  const projectedTier =
    selectedAmount >= 2_500_000
      ? {
          name: 'Founding Patron',
          perks: [
            t('Akses Penuh Private Repo GitHub v0.9 & rilis publik v1.0'),
            t('Posisi Logo Teratas (Top Tier) di Website cuan.work & README GitHub'),
            t('Sorotan berkala ke 63.000+ audiens di Facebook & Buletin Mingguan Dojo'),
            t('Prioritas konsultasi arsitektur agen & otomasi sistem bisnis Anda'),
          ],
        }
      : selectedAmount >= 1_000_000
      ? {
          name: 'Titan Backer',
          perks: [
            t('Akses Penuh Private Repo GitHub v0.9 & rilis publik v1.0'),
            t('Posisi Logo Utama di Website cuan.work & README resmi GitHub'),
            t('Sorotan berkala ke 63.000+ audiens di Facebook Buchin & Buletin Dojo'),
          ],
        }
      : selectedAmount >= 300_000
      ? {
          name: 'Logo & Backlink',
          perks: [
            t('Akses Penuh Private Repo GitHub v0.9 & rilis publik v1.0'),
            t('Penempatan Logo Brand Anda di direktori sponsor cuan.work'),
            t('Tautan Backlink Dofollow resmi & permanen ke website Anda'),
          ],
        }
      : {
          name: 'Supporter',
          perks: [
            t('Akses Penuh Private Repo GitHub v0.9 & rilis publik v1.0'),
            t('Pencantuman nama Anda secara permanen di README resmi GitHub'),
            t('Akses ke grup komunitas sponsor & pembaruan script mingguan'),
          ],
        }

  return (
    <section
      ref={checkoutRef as any}
      id="checkout"
      className="mx-auto max-w-2xl px-6 sm:px-8 mb-24 scroll-mt-20"
    >
      <div className="rounded-2xl border border-border/70 bg-card p-6 sm:p-8 shadow-2xs space-y-6">
        {/* Header */}
        <div className="space-y-1.5 text-center sm:text-left">
          <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-foreground">
            {t('Pilih Paket Dukungan Sponsor')}
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            {t(
              'Satu kali kontribusi untuk membuka akses private repo Cuan v0.9 & rilis publik v1.0. Tanda terima dan akses langsung dikirimkan ke email Anda.'
            )}
          </p>
        </div>

        <form onSubmit={handleProceedToDojo} className="space-y-6">
          {/* Preset Buttons */}
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
                    <span className="text-xs sm:text-sm font-semibold tracking-tight">
                      {p.label}
                    </span>
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
                  <span>
                    {t('+ Masukkan Nominal Kustom Lainnya (Min. Rp 100.000)')}
                  </span>
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

            {/* Standout Tier Deliverables (Bear Notes / Things 3 Left Accent Line) */}
            <div className="border-l-2 border-primary pl-3.5 py-1 space-y-2 transition-all">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-foreground tracking-tight">
                  {t('Benefit Paket')}: {projectedTier.name}
                </span>
                <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-2xs font-semibold text-primary">
                  {formatIDR(selectedAmount)}
                </span>
              </div>
              <ul className="space-y-1.5 text-xs">
                {projectedTier.perks.map((perk, i) => (
                  <li key={i} className="flex items-start gap-2 text-foreground/90">
                    <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" strokeWidth={2.5} />
                    <span className="leading-relaxed">{perk}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Hairline Divider & Post-Purchase Onboarding Notice */}
          <div className="border-t border-border/40 pt-5 space-y-3.5">
            <div className="flex items-start gap-2.5 text-xs text-muted-foreground leading-relaxed">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <p>
                {t(
                  'Undangan akses kolaborator private repo GitHub serta tautan formulir logo & backlink akan dikirimkan otomatis ke email Anda setelah pembayaran terkonfirmasi di Dojo.'
                )}
              </p>
            </div>

            {/* Direct Checkout CTA Button */}
            <button
              type="submit"
              className="action-primary w-full min-h-12 text-sm sm:text-base font-semibold justify-center gap-2 shadow-xs cursor-pointer transition-all hover:brightness-105 active:scale-[0.99]"
            >
              <span>{`${t('Lanjut ke Pembayaran')} — ${formatIDR(
                selectedAmount
              )}`}</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <div className="flex items-center justify-between text-2xs text-muted-foreground pt-1">
              <span>
                {t('Diproses aman oleh Dojo via Transfer BCA & Stripe.')}
              </span>
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
