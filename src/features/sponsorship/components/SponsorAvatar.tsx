import { useState } from 'react'
import { SponsorItem } from '../types'

interface SponsorAvatarProps {
  sponsor: SponsorItem
  size?: 'xs' | 'sm' | 'md' | 'lg'
  className?: string
}

function cleanDomain(url?: string): string {
  if (!url) return ''
  return url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')
}

function getInitials(name: string): string {
  if (!name) return '?'
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
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
  }[size]

  // Pure Circular Frame (rounded-full 100% on container & image to prevent Safari WebKit clipping bugs):
  const containerClasses = `relative ${dim.box} aspect-square rounded-full overflow-hidden shrink-0 shadow-2xs flex items-center justify-center`

  // Background / Border styling
  const styleClasses = isTitan
    ? 'border border-amber-500/40 bg-amber-500/10 text-amber-700 dark:text-amber-400'
    : isBusiness
      ? 'border border-border/70 bg-card text-foreground/80'
      : 'border border-border/60 bg-muted/30 text-foreground/70'

  if (!imgError && candidateSrc) {
    const fitClass = isBusiness ? 'object-contain p-1.5' : 'object-cover'

    return (
      <div className={`${containerClasses} ${styleClasses} ${className}`} title={sponsor.brand_name}>
        <img
          src={candidateSrc}
          alt={sponsor.brand_name}
          onError={() => setImgError(true)}
          className={`h-full w-full rounded-full ${fitClass}`}
          loading="lazy"
        />
      </div>
    )
  }

  // Fallback Monogram:
  // Rendered inside a guaranteed round circle
  return (
    <div
      className={`${containerClasses} ${styleClasses} font-display font-semibold select-none ${dim.text} ${className}`}
      title={sponsor.brand_name}
    >
      {getInitials(sponsor.brand_name)}
    </div>
  )
}
