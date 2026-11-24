import { useState, useEffect, useMemo, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Sparkles, ArrowRight } from 'lucide-react'
import { Navbar } from '../../components/layout/Navbar'
import { Footer } from '../../components/layout/Footer'
import { GithubNoticeModal } from '../../components/common/GithubNoticeModal'
import { SeoHead } from '../../components/common/SeoHead'
import { SponsorHero } from './components/SponsorHero'
import { SponsorCheckoutForm } from './components/SponsorCheckoutForm'
import { SponsorProfileForm } from './components/SponsorProfileForm'
import { SponsorDirectory } from './components/SponsorDirectory'
import { SponsorFaq } from './components/SponsorFaq'
import { SponsorItem, SPONSORWARE_TARGET } from './types'
import { useLanguage } from '../../context/LanguageContext'

export function SponsorPage() {
  const { t, language } = useLanguage()
  const [searchParams] = useSearchParams()

  const title =
    language === 'en'
      ? 'Founding Backer Program — Cuan'
      : 'Program Sponsor Founding — Cuan'
  const description =
    language === 'en'
      ? 'Support open-source development of Cuan and get immediate private repo access, lifetime branding, and founding backer perks.'
      : 'Dukung pengembangan Cuan untuk rilis 100% open-source di GitHub. Dapatkan akses private repo sekarang dan penempatan logo abadi.'

  const [sponsors, setSponsors] = useState<SponsorItem[]>([])
  const [totalCount, setTotalCount] = useState<number>(100)
  const [targetCount, setTargetCount] = useState<number>(SPONSORWARE_TARGET)
  const [showGithubModal, setShowGithubModal] = useState(false)
  const [selectedAmount, setSelectedAmount] = useState<number>(300_000)
  const [isCustomAmount, setIsCustomAmount] = useState<boolean>(false)

  const checkoutRef = useRef<HTMLDivElement>(null)
  const profileRef = useRef<HTMLDivElement>(null)

  const statusParam = searchParams.get('status')
  const isReturnFromCheckout =
    statusParam === 'pending' ||
    statusParam === 'success' ||
    Boolean(searchParams.get('order_id'))

  const [isProfileFormOpen, setIsProfileFormOpen] = useState<boolean>(() => {
    return (
      searchParams.get('action') === 'profile' ||
      (typeof window !== 'undefined' && window.location.hash === '#profile')
    )
  })

  useEffect(() => {
    fetch('/api/sponsors/current')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.sponsors && Array.isArray(data.sponsors)) {
          setSponsors(data.sponsors)
        }
        if (typeof data?.total === 'number') {
          setTotalCount(data.total)
        }
        if (typeof data?.target === 'number') {
          setTargetCount(data.target)
        }
      })
      .catch(() => null)
  }, [])

  // Smooth scroll to anchor if URL contains hash (e.g. #directory, #checkout, or #profile)
  useEffect(() => {
    if (window.location.hash) {
      if (window.location.hash === '#profile') {
        setIsProfileFormOpen(true)
      }
      const timer = setTimeout(() => {
        const el = document.querySelector(window.location.hash)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
        }
      }, 350)
      return () => clearTimeout(timer)
    }
  }, [sponsors])

  const minTop5Benchmark = useMemo(() => {
    if (!sponsors || sponsors.length < 5) {
      return 100_000
    }
    const fifthAmount = sponsors[4]?.amount_idr || 100_000
    return fifthAmount + 10_000
  }, [sponsors])

  const scrollToCheckout = (amount?: number) => {
    if (amount) {
      setSelectedAmount(amount)
      setIsCustomAmount(false)
    }
    checkoutRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleOpenProfileForm = () => {
    setIsProfileFormOpen(true)
    setTimeout(() => {
      profileRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  return (
    <div className="min-h-dvh bg-background text-foreground overflow-x-hidden w-full">
      <SeoHead
        title={title}
        description={description}
        lang={language}
        path="/sponsor"
      />
      {/* 1. Global Navigation */}
      <Navbar
        onOpenGithubModal={() => setShowGithubModal(true)}
      />

      <main className="pb-24">
        {/* Return from Checkout Feedback Banner & Interactive Profile Form */}
        {isReturnFromCheckout && (
          <div className="mx-auto max-w-4xl px-4 pt-6 sm:px-8 space-y-4">
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5 text-emerald-800 dark:text-emerald-300 flex items-start gap-3.5">
              <Sparkles className="h-5 w-5 shrink-0 mt-0.5 text-emerald-600 dark:text-emerald-400" />
              <div>
                <h4 className="font-display font-bold text-sm sm:text-base">
                  {statusParam === 'success'
                    ? t('Pembayaran sponsor berhasil diverifikasi!')
                    : t('Terima kasih atas kontribusi sponsor Anda!')}
                </h4>
                <p className="text-xs sm:text-sm mt-1 leading-relaxed opacity-90">
                  {t(
                    'Dukungan Anda sedang diproses. Silakan lengkapi profil brand, tautan, dan logo Anda pada formulir di bawah ini agar langsung kami tampilkan di direktori sponsor resmi & repositori GitHub.',
                  )}
                </p>
              </div>
            </div>

            <SponsorProfileForm
              isReturnBanner={true}
              initialOrderId={searchParams.get('order_id') || ''}
              initialEmail={searchParams.get('email') || ''}
            />
          </div>
        )}

        {/* 2. Hero Section & Value Highlights */}
        <SponsorHero
          onScrollToCheckout={() => scrollToCheckout(300_000)}
          onOpenProfileForm={handleOpenProfileForm}
          sponsorCount={totalCount}
          target={targetCount}
        />

        {/* Self-service Sponsor Profile Form Section */}
        {!isReturnFromCheckout && (
          <section
            ref={profileRef}
            id="profile"
            className="mx-auto max-w-2xl px-4 sm:px-8 mb-16 scroll-mt-20"
          >
            {isProfileFormOpen ? (
              <SponsorProfileForm
                onCancel={() => setIsProfileFormOpen(false)}
              />
            ) : (
              <div className="rounded-2xl border border-border/70 bg-card p-5 sm:p-6 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                <div className="space-y-1">
                  <h3 className="font-display text-sm sm:text-base font-bold text-foreground">
                    {t('Sudah menjadi sponsor atau baru selesai bayar?')}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {t(
                      'Lengkapi atau perbarui logo, link tautan website, tagline brand, dan username GitHub Anda secara mandiri kapan saja.',
                    )}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleOpenProfileForm}
                  className="action-secondary min-h-11 px-4 text-xs sm:text-sm font-semibold inline-flex items-center gap-2 cursor-pointer shrink-0 w-full sm:w-auto justify-center"
                >
                  <span>{t('Buka Formulir Profil')}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </section>
        )}

        {/* 3. Direct Unified Checkout Form */}
        <SponsorCheckoutForm
          checkoutRef={checkoutRef}
          sponsors={sponsors}
          minTop5Benchmark={minTop5Benchmark}
          selectedAmount={selectedAmount}
          setSelectedAmount={setSelectedAmount}
          isCustomAmount={isCustomAmount}
          setIsCustomAmount={setIsCustomAmount}
        />

        {/* 4. Dynamic Founding Sponsors Directory & Wall of Fame */}
        <SponsorDirectory sponsors={sponsors} totalCount={totalCount} />

        {/* 5. FAQ Section */}
        <SponsorFaq />
      </main>

      {/* 6. Global Footer */}
      <Footer onOpenGithubModal={() => setShowGithubModal(true)} />

      {/* 7. Shared GitHub Notice Modal */}
      <GithubNoticeModal
        isOpen={showGithubModal}
        onClose={() => setShowGithubModal(false)}
        actionLabel={t('Dukung Sekarang')}
        onActionClick={() => scrollToCheckout()}
      />
    </div>
  )
}

export default SponsorPage
