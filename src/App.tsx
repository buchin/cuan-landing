import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { LanguageProvider } from './context/LanguageContext'
import { ThemeProvider } from './context/ThemeContext'
import { ScrollToTop } from './components/common/ScrollToTop'

const LandingPage = lazy(() => import('./features/landing/LandingPage'))
const SponsorPage = lazy(() => import('./features/sponsorship/SponsorPage'))

function PageFallback() {
  return (
    <div className="min-h-dvh flex items-center justify-center bg-background text-foreground">
      <div className="h-5 w-5 rounded-full border-2 border-primary border-t-transparent animate-spin" />
    </div>
  )
}

export function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <ScrollToTop />
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/sponsor" element={<SponsorPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default App
