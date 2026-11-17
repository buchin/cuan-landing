import { createContext, useContext, useEffect, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import id from '../locales/id.json'
import en from '../locales/en.json'

export type LanguagePreference = 'auto' | 'en' | 'id'
export type Language = 'en' | 'id'

const dictionaries: Record<'en' | 'id', Record<string, string>> = {
  id,
  en,
}

export function getLocalizedPath(pathname: string, targetLang: 'id' | 'en'): string {
  // Strip existing /en prefix if present
  let barePath = pathname
  if (pathname === '/en' || pathname.startsWith('/en/')) {
    barePath = pathname.slice(3) || '/'
  }
  if (targetLang === 'en') {
    return barePath === '/' ? '/en' : `/en${barePath}`
  }
  return barePath
}

interface LanguageContextType {
  preference: LanguagePreference
  language: 'en' | 'id'
  setPreference: (value: LanguagePreference | 'en' | 'id') => void
  switchLanguage: (next: 'en' | 'id') => void
  t: (text: string) => string
}

const LanguageContext = createContext<LanguageContextType>({
  preference: 'id',
  language: 'id',
  setPreference: (_value) => {},
  switchLanguage: (_next) => {},
  t: (text: string) => text,
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  const navigate = useNavigate()

  // The URL path is the single source of truth for SEO & routing
  const isEnUrl = location.pathname === '/en' || location.pathname.startsWith('/en/')
  const language: 'en' | 'id' = isEnUrl ? 'en' : 'id'

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  const value = useMemo(() => {
    const handleSwitch = (next: 'en' | 'id') => {
      try {
        localStorage.setItem('cuan-language', next)
      } catch {}
      const targetUrl = getLocalizedPath(
        location.pathname + location.search + location.hash,
        next
      )
      if (targetUrl !== location.pathname + location.search + location.hash) {
        navigate(targetUrl)
      }
    }

    return {
      preference: language,
      language,
      setPreference: (next: LanguagePreference | 'en' | 'id') => {
        const target: 'en' | 'id' = next === 'auto' ? 'id' : next
        handleSwitch(target)
      },
      switchLanguage: handleSwitch,
      t: (text: string) => {
        const dict = dictionaries[language]
        if (dict && Object.prototype.hasOwnProperty.call(dict, text)) {
          return dict[text]
        }
        return text
      },
    }
  }, [language, location.pathname, location.search, location.hash, navigate])

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)
