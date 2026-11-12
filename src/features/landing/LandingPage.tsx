import { useState, useRef } from 'react'
import { Navbar } from '../../components/layout/Navbar'
import { Footer } from '../../components/layout/Footer'
import { GithubNoticeModal } from '../../components/common/GithubNoticeModal'
import { HeroSection } from './components/HeroSection'
import { EcosystemStrip } from './components/EcosystemStrip'
import { ProblemSection } from './components/ProblemSection'
import { HowItWorksSection } from './components/HowItWorksSection'
import { PillarsSection } from './components/PillarsSection'
import { ComparisonSection } from './components/ComparisonSection'
import { McpSection } from './components/McpSection'
import { FoundingBackersSection } from './components/FoundingBackersSection'
import { FinalCtaSection } from './components/FinalCtaSection'

export function LandingPage() {
  const [showGithubModal, setShowGithubModal] = useState(false)
  const emailInputRef = useRef<HTMLInputElement>(null)

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
      {/* 1. Global Navigation */}
      <Navbar
        onOpenGithubModal={() => setShowGithubModal(true)}
        onWaitingListClick={scrollToWaitingList}
      />

      <main>
        {/* 2. Hero Section */}
        <HeroSection emailInputRef={emailInputRef} />

        {/* 3. Digital Project Ecosystem Strip (Immediately below Hero) */}
        <EcosystemStrip />

        {/* 4. Problem & Agitate */}
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
