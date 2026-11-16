import { useState } from 'react'
import { SponsorItem } from '../types'

interface SponsorAvatarProps {
  sponsor: SponsorItem
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

function cleanDomain(url?: string): string {
  if (!url) return ''
  return url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')
}

function getInitials(name: string): string {
  if (!name) return '?'
  const words = name.trim().split(/[\s._-]+/).filter((w) => /[a-zA-Z0-9]/.test(w))
  if (words.length === 0) return name.replace(/[^a-zA-Z0-9]/g, '').slice(0, 2).toUpperCase() || '?'
  if (words.length === 1) return words[0].replace(/[^a-zA-Z0-9]/g, '').slice(0, 2).toUpperCase()
  return (words[0][0] + words[words.length - 1][0]).toUpperCase()
}

export function SponsorAvatar({ sponsor, size = 'md', className = '' }: SponsorAvatarProps) {
  const [imgError, setImgError] = useState(false)

  const domain = cleanDomain(sponsor.website_url)
  const isBusiness = Boolean(domain)
  const isTitan = (sponsor.amount_idr || 0) >= 200_000

  // 1. Explicit logo (if uploaded by sponsor)
  const logoSrc = sponsor.logo_url || (sponsor.logo_path ? `/uploads/sponsors/logos/${sponsor.logo_path}` : null)

  // 2. Domain icon via unavatar with fallback=false (avoids robot mascot!)
  const domainIcon = domain ? `https://unavatar.io/${domain}?fallback=false` : null

  // 3. Gravatar avatar (from email hash)
  const gravatarSrc = sponsor.avatar_url

  // If business: try logo, then real domain icon.
  // If individual: try logo, then gravatar.
  const candidateSrc = logoSrc || (isBusiness ? domainIcon : gravatarSrc) || gravatarSrc

  // Dimension mapping
  const dim = {
    xs: { box: 'h-5 w-5 min-w-5', text: 'text-[10px]' },
    sm: { box: 'h-6 w-6 min-w-6', text: 'text-xs' },
    md: { box: 'h-10 w-10 min-w-10', text: 'text-xs' },
    lg: { box: 'h-12 w-12 min-w-12', text: 'text-sm' },
    xl: { box: 'h-16 w-16 min-w-16', text: 'text-base font-bold' },
  }[size]

  // Pure Circular Frame (with avatar & data-avatar to prevent global index.css zero-radius overrides):
  const containerClasses = `avatar sponsor-avatar relative ${dim.box} aspect-square rounded-full overflow-hidden shrink-0 shadow-2xs flex items-center justify-center`

  // Calm Hairline Border (Zero concentric rings, neutral border that lets brand colors shine):
  const imageBorderClass = 'border border-border/60 bg-card'

  const fallbackClasses = isTitan
    ? 'border border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-400'
    : isBusiness
      ? 'border border-border/70 bg-card text-foreground/80'
      : 'border border-border/60 bg-muted/30 text-foreground/70'

  if (!imgError && candidateSrc) {
    return (
      <div
        className={`${containerClasses} ${imageBorderClass} ${className}`}
        data-avatar=""
        data-sponsor-avatar=""
        style={{ borderRadius: '9999px' }}
        title={sponsor.brand_name}
      >
        <img
          src={candidateSrc}
          alt={sponsor.brand_name}
          onError={() => setImgError(true)}
          className="avatar sponsor-avatar h-full w-full rounded-full object-cover"
          data-avatar=""
          data-sponsor-avatar=""
          style={{ borderRadius: '9999px' }}
          loading="lazy"
        />
      </div>
    )
  }

  // Fallback Monogram:
  // Rendered inside a guaranteed round circle with avatar classes
  return (
    <div
      className={`${containerClasses} ${fallbackClasses} font-display font-semibold select-none ${dim.text} ${className}`}
      data-avatar=""
      data-sponsor-avatar=""
      style={{ borderRadius: '9999px' }}
      title={sponsor.brand_name}
    >
      {getInitials(sponsor.brand_name)}
    </div>
  )
}
