import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

interface SeoHeadProps {
  title: string
  description?: string
  lang?: 'id' | 'en'
  path?: string
}

export function SeoHead({ title, description, lang = 'id', path }: SeoHeadProps) {
  const location = useLocation()

  useEffect(() => {
    // 1. Update Title
    document.title = title

    // 2. Update html lang attribute
    document.documentElement.lang = lang

    // 3. Helper to update/create meta tag
    const updateMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name'
      let el = document.querySelector(`meta[${attr}="${name}"]`)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, name)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    if (description) {
      updateMeta('description', description)
      updateMeta('og:description', description, true)
      updateMeta('twitter:description', description)
    }

    updateMeta('og:title', title, true)
    updateMeta('twitter:title', title)
    updateMeta('og:url', `https://cuan.work${location.pathname}`, true)
    updateMeta('og:type', 'website', true)

    // 4. Helper to update/create link tag
    const updateLink = (rel: string, href: string, hreflang?: string) => {
      const selector = hreflang
        ? `link[rel="${rel}"][hreflang="${hreflang}"]`
        : `link[rel="${rel}"]:not([hreflang])`
      let el = document.querySelector(selector)
      if (!el) {
        el = document.createElement('link')
        el.setAttribute('rel', rel)
        if (hreflang) el.setAttribute('hreflang', hreflang)
        document.head.appendChild(el)
      }
      el.setAttribute('href', href)
    }

    // Determine normalized path for canonical & hreflang
    const currentPath =
      path ||
      (location.pathname.startsWith('/en')
        ? location.pathname.slice(3) || '/'
        : location.pathname)

    const idUrl = `https://cuan.work${currentPath}`
    const enUrl = `https://cuan.work${currentPath === '/' ? '/en' : `/en${currentPath}`}`

    updateLink('canonical', lang === 'en' ? enUrl : idUrl)
    updateLink('alternate', idUrl, 'id')
    updateLink('alternate', enUrl, 'en')
    updateLink('alternate', idUrl, 'x-default')
  }, [title, description, lang, path, location.pathname])

  return null
}
