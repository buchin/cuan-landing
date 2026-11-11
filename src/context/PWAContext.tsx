import { createContext, useContext, useEffect, useState } from 'react'
interface InstallPrompt extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: string }>
}
const PWAContext = createContext({
  installed: false,
  canInstall: false,
  install: async () => {},
  error: '',
})
export function PWAProvider({ children }: { children: React.ReactNode }) {
  const [prompt, setPrompt] = useState<InstallPrompt | null>(null),
    [installed, setInstalled] = useState(false),
    [error, setError] = useState('')
  useEffect(() => {
    const media = window.matchMedia('(display-mode: standalone)')
    const check = () =>
      setInstalled(
        media.matches ||
          Boolean(
            (navigator as Navigator & { standalone?: boolean }).standalone,
          ),
      )
    check()
    media.addEventListener('change', check)
    const isPublicLanding =
      typeof window !== 'undefined' &&
      (window.location.pathname === '/' ||
        window.location.pathname === '/sponsor' ||
        window.location.pathname === '/sponsors')

    if (isPublicLanding) {
      // Clean up any manifest link and service worker registrations on public landing page
      const manifestLink = document.querySelector<HTMLLinkElement>('link[rel="manifest"]')
      if (manifestLink) {
        manifestLink.remove()
      }
      if ('serviceWorker' in navigator) {
        void navigator.serviceWorker.getRegistrations().then((registrations) => {
          for (const reg of registrations) {
            void reg.unregister()
          }
        })
      }
      return () => {
        media.removeEventListener('change', check)
      }
    }

    // In-app: dynamically attach manifest for PWA capabilities
    let manifestLink = document.querySelector<HTMLLinkElement>('link[rel="manifest"]')
    if (!manifestLink) {
      manifestLink = document.createElement('link')
      manifestLink.rel = 'manifest'
      manifestLink.href = '/manifest.webmanifest'
      document.head.appendChild(manifestLink)
    }

    const ready = (e: Event) => {
      e.preventDefault()
      setPrompt(e as InstallPrompt)
    }
    const done = () => {
      setPrompt(null)
      setInstalled(true)
    }
    window.addEventListener('beforeinstallprompt', ready)
    window.addEventListener('appinstalled', done)
    if ('serviceWorker' in navigator && window.isSecureContext)
      navigator.serviceWorker
        .register('/sw.js', { updateViaCache: 'none' })
        .catch(() =>
          setError('App installation is unavailable. Reload and try again.'),
        )
    return () => {
      media.removeEventListener('change', check)
      window.removeEventListener('beforeinstallprompt', ready)
      window.removeEventListener('appinstalled', done)
    }
  }, [])
  async function install() {
    if (!prompt) return
    setError('')
    try {
      await prompt.prompt()
      await prompt.userChoice
      setPrompt(null)
    } catch {
      setError('Could not open the install prompt. Use your browser menu.')
    }
  }
  return (
    <PWAContext.Provider
      value={{ installed, canInstall: !!prompt, install, error }}
    >
      {children}
    </PWAContext.Provider>
  )
}
export const usePWA = () => useContext(PWAContext)
