import { Routes, Route, Navigate } from 'react-router-dom'
import { LandingPage } from './features/landing/LandingPage'
import { SponsorPage } from './features/sponsorship/SponsorPage'
import { LanguageProvider } from './context/LanguageContext'
import { ThemeProvider } from './context/ThemeContext'

export function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/sponsor" element={<SponsorPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default App
