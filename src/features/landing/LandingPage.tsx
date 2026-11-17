import { useState, useRef } from 'react'
import { Navbar } from '../../components/layout/Navbar'
import { Footer } from '../../components/layout/Footer'
import { GithubNoticeModal } from '../../components/common/GithubNoticeModal'
import { SeoHead } from '../../components/common/SeoHead'
import { useLanguage } from '../../context/LanguageContext'
import { HeroSection } from './components/HeroSection'
import { ProblemSection } from './components/ProblemSection'
import { HowItWorksSection } from './components/HowItWorksSection'
import { PillarsSection } from './components/PillarsSection'
import { ComparisonSection } from './components/ComparisonSection'
import { McpSection } from './components/McpSection'
import { FoundingBackersSection } from './components/FoundingBackersSection'
import { FinalCtaSection } from './components/FinalCtaSection'

export function LandingPage() {
  const { language } = useLanguage()
  const [showGithubModal, setShowGithubModal] = useState(false)
  const emailInputRef = useRef<HTMLInputElement>(null)

  const title =
    language === 'en'
      ? 'Cuan — Self-Hosted Agentic Project Manager for Digital Teams'
      : 'Cuan — Agentic Project Manager untuk Digital Marketer'
  const description =
    language === 'en'
      ? 'Run autonomous marketing and business projects on your private VPS with zero recurring platform markups. Keep 100% data privacy and customer ownership.'
      : 'Manajer proyek mandiri bertenaga AI untuk digital marketer dan pebisnis non-teknis. Self-hosted di VPS sendiri dengan kendali penuh.'

  const scrollToWaitingList = () => {
    setShowGithubModal(false)
    const el = document.getElementById('waiting-list')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      setTimeout(() => {
        emailInputRef.current?.focus()
      }, 400)
    }
  }

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <SeoHead title={title} description={description} lang={language} path="/" />
      {/* 1. Global Navigation */}
      <Navbar
        onOpenGithubModal={() => setShowGithubModal(true)}
        onWaitingListClick={scrollToWaitingList}
      />

      <main>
        {/* 2. Hero Section with Ecosystem Logos */}
        <HeroSection emailInputRef={emailInputRef} />

        {/* 3. Problem & Agitate */}
        <ProblemSection />

        {/* 5. How It Works (Chat & Whisper -> Approval -> Done with Draft) */}
        <HowItWorksSection />

        {/* 6. 5 Value Pillars */}
        <PillarsSection />

        {/* 7. Factual Comparison */}
        <ComparisonSection />

        {/* 8. Open Ecosystem & MCP */}
        <McpSection />

        {/* 9. Founding Backers Callout */}
        <FoundingBackersSection />

        {/* 10. Final CTA */}
        <FinalCtaSection onWaitingListClick={scrollToWaitingList} />
      </main>

      {/* 11. Global Footer */}
      <Footer onOpenGithubModal={() => setShowGithubModal(true)} />

      {/* 12. Shared GitHub Notice Modal */}
      <GithubNoticeModal
        isOpen={showGithubModal}
        onClose={() => setShowGithubModal(false)}
        onActionClick={scrollToWaitingList}
      />
    </div>
  )
}

export default LandingPage
