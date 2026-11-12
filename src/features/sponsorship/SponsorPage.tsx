import { useState, useEffect, useMemo, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Sparkles } from 'lucide-react'
import { Navbar } from '../../components/layout/Navbar'
import { Footer } from '../../components/layout/Footer'
import { GithubNoticeModal } from '../../components/common/GithubNoticeModal'
import { SponsorHero } from './components/SponsorHero'
import { SponsorLeaderboard } from './components/SponsorLeaderboard'
import { SponsorCheckoutForm } from './components/SponsorCheckoutForm'
import { SponsorFaq } from './components/SponsorFaq'
import { SponsorItem } from './types'
import { useLanguage } from '../../context/LanguageContext'

export function SponsorPage() {
  const { t } = useLanguage()
  const [searchParams] = useSearchParams()

  const [sponsors, setSponsors] = useState<SponsorItem[]>([])
  const [showGithubModal, setShowGithubModal] = useState(false)
  const [selectedAmount, setSelectedAmount] = useState<number>(1_000_000)
  const [isCustomAmount, setIsCustomAmount] = useState<boolean>(false)

  const checkoutRef = useRef<HTMLDivElement>(null)
  const isReturnFromCheckout = searchParams.get('status') === 'pending' || Boolean(searchParams.get('order_id'))

  useEffect(() => {
    fetch('/api/sponsors/current')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.sponsors && Array.isArray(data.sponsors)) {
          setSponsors(data.sponsors)
        }
      })
      .catch(() => null)
  }, [])

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

  const scrollToCheckout = (amount?: number) => {
    if (amount) {
      setSelectedAmount(amount)
      setIsCustomAmount(false)
    }
    checkoutRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-dvh bg-background text-foreground">
      {/* 1. Global Navigation */}
      <Navbar
        isSubPage
        onOpenGithubModal={() => setShowGithubModal(true)}
      />

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

        {/* 2. Hero Section & Value Highlights */}
        <SponsorHero onScrollToCheckout={() => scrollToCheckout()} />

        {/* 3. Leaderboard Showcase */}
        <SponsorLeaderboard
          top5List={top5List}
          next25List={next25List}
          communitySupporters={communitySupporters}
          onSelectSlot={(amount) => scrollToCheckout(amount)}
        />

        {/* 4. Unified Checkout Form */}
        <SponsorCheckoutForm
          checkoutRef={checkoutRef}
          sponsors={sponsors}
          minTop5Benchmark={minTop5Benchmark}
          selectedAmount={selectedAmount}
          setSelectedAmount={setSelectedAmount}
          isCustomAmount={isCustomAmount}
          setIsCustomAmount={setIsCustomAmount}
        />

        {/* 5. FAQ Section */}
        <SponsorFaq />
      </main>

      {/* 6. Global Footer */}
      <Footer isSubPage onOpenGithubModal={() => setShowGithubModal(true)} />

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
