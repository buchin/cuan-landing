import { useState, useEffect } from 'react'
import { AlignLeft, ChevronDown } from 'lucide-react'

export interface TocItem {
  id: string
  heading: string
  headingEn: string
}

interface TableOfContentsProps {
  items: TocItem[]
  language: 'id' | 'en'
}

export function TableOfContents({ items, language }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    if (!items || items.length === 0) return

    const handleScroll = () => {
      // Offset by navbar height (64px) + comfortable margin
      const scrollPos = window.scrollY + 120
      let current = items[0]?.id || ''
      for (const item of items) {
        const el = document.getElementById(item.id)
        if (el && el.offsetTop <= scrollPos) {
          current = item.id
        }
      }
      setActiveId(current)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [items])

  // Handle initial hash scrolling on mount
  useEffect(() => {
    if (window.location.hash) {
      const hashId = window.location.hash.slice(1)
      const el = document.getElementById(hashId)
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' })
        }, 150)
      }
    }
  }, [])

  if (!items || items.length <= 1) return null

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const target = document.getElementById(id)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
      window.history.pushState(null, '', `#${id}`)
      setActiveId(id)
    }
  }

  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold text-foreground tracking-tight select-none flex items-center gap-1.5">
        <AlignLeft className="h-3.5 w-3.5 text-muted-foreground" />
        <span>{language === 'en' ? 'On this page' : 'Di halaman ini'}</span>
      </p>
      <nav aria-label={language === 'en' ? 'On this page' : 'Daftar isi halaman'} className="relative">
        <ul className="space-y-1 border-l border-border/40 pl-3 text-xs leading-relaxed">
          {items.map((item) => {
            const isActive = activeId === item.id
            const label = language === 'en' ? item.headingEn : item.heading
            return (
              <li key={item.id} className="relative">
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleClick(e, item.id)}
                  className={`block py-1 transition-colors -ml-[13px] pl-3 border-l-2 text-xs leading-normal ${
                    isActive
                      ? 'border-primary text-foreground font-medium'
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {label}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}

export function MobileTableOfContents({ items, language }: TableOfContentsProps) {
  if (!items || items.length <= 1) return null

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const target = document.getElementById(id)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
      window.history.pushState(null, '', `#${id}`)
    }
  }

  return (
    <details className="lg:hidden my-4 rounded-lg border border-border/50 bg-muted/20 px-3.5 py-2.5 text-xs group">
      <summary className="flex items-center justify-between font-medium text-foreground cursor-pointer select-none">
        <span className="flex items-center gap-1.5">
          <AlignLeft className="h-3.5 w-3.5 text-muted-foreground" />
          <span>{language === 'en' ? 'On this page' : 'Di halaman ini'}</span>
        </span>
        <div className="flex items-center gap-1 text-muted-foreground">
          <span className="text-[11px]">({items.length})</span>
          <ChevronDown className="h-3.5 w-3.5 transition-transform group-open:rotate-180" />
        </div>
      </summary>
      <ul className="mt-2.5 pt-2 border-t border-border/30 space-y-2">
        {items.map((item) => {
          const label = language === 'en' ? item.headingEn : item.heading
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => handleClick(e, item.id)}
                className="block text-muted-foreground hover:text-foreground transition-colors py-0.5"
              >
                {label}
              </a>
            </li>
          )
        })}
      </ul>
    </details>
  )
}
