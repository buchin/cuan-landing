import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import id from '../locales/id.json'
import en from '../locales/en.json'

export type LanguagePreference = 'auto' | 'en' | 'id'
const dictionaries: Record<'en' | 'id', Record<string, string>> = {
  id,
  en,
}
export function resolveLanguage(
  preference: LanguagePreference,
  languages: readonly string[],
): 'en' | 'id' {
  if (preference !== 'auto') return preference
  // The first supported browser preference wins. Default to Indonesian.
  for (const language of languages) {
    const base = language.toLowerCase().split('-')[0]
    if (base === 'id' || base === 'en') return base
  }
  return 'id'
}
const LanguageContext = createContext({
  preference: 'id' as LanguagePreference,
  language: 'id' as 'en' | 'id',
  setPreference: (_value: LanguagePreference) => {},
  t: (text: string) => text,
})
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [preference, setValue] = useState<LanguagePreference>(() => {
    try {
      const value = localStorage.getItem('cuan-language')
      return value === 'en' || value === 'id' || value === 'auto' ? value : 'id'
    } catch {
      return 'id'
    }
  })
  const [languages, setLanguages] = useState(
    () => navigator.languages || [navigator.language],
  )
  useEffect(() => {
    const update = () =>
      setLanguages(navigator.languages || [navigator.language])
    window.addEventListener('languagechange', update)
    return () => window.removeEventListener('languagechange', update)
  }, [])
  const language = resolveLanguage(preference, languages)
  const value = useMemo(
    () => ({
      preference,
      language,
      setPreference: (next: LanguagePreference) => {
        try {
          localStorage.setItem('cuan-language', next)
        } catch {
          /* Preference still works in this tab. */
        }
        setValue(next)
      },
      t: (text: string) => {
        const dict = dictionaries[language]
        if (dict && Object.prototype.hasOwnProperty.call(dict, text)) {
          return dict[text]
        }
        return text
      },
    }),
    [preference, language],
  )
  useEffect(() => {
    document.documentElement.lang = language
  }, [language])
  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}
export const useLanguage = () => useContext(LanguageContext)
