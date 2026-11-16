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
    xs: { box: 'h-5 w-5', text: 'text-[10px]' },
    sm: { box: 'h-6 w-6', text: 'text-xs' },
    md: { box: 'h-10 w-10', text: 'text-xs' },
    lg: { box: 'h-12 w-12', text: 'text-sm' },
  }[size]

  // Shape & Framing (Strict Calm Software Standards):
  // - Person / Individual -> Pure Circle (rounded-full) with natural portrait framing (object-cover)
  // - Business / Organization -> Squircle (rounded-xl) with object-contain to preserve logo aspect ratio
  const shapeClass = isBusiness ? (size === 'xs' ? 'rounded-md' : 'rounded-xl') : 'rounded-full'
  const fitClass = isBusiness ? 'object-contain p-1.5 bg-background' : 'object-cover'

  if (!imgError && candidateSrc) {
    return (
      <img
        src={candidateSrc}
        alt={sponsor.brand_name}
        onError={() => setImgError(true)}
        className={`${dim.box} ${shapeClass} ${fitClass} border border-border/60 shrink-0 shadow-2xs ${className}`}
        loading="lazy"
      />
    )
  }

  // Fallback Monogram (Calm Software Aesthetic):
  // Never loud/nursery pastels. Use dignified neutral tones that feel like natural brandmarks.
  const fallbackBg = isTitan
    ? 'border-amber-500/40 bg-amber-500/10 text-amber-700 dark:text-amber-400'
    : isBusiness
      ? 'border-border/70 bg-muted/60 text-foreground/80'
      : 'border-border/60 bg-muted/40 text-foreground/70'

  return (
    <div
      className={`${dim.box} ${dim.text} ${shapeClass} ${fallbackBg} flex items-center justify-center font-display font-semibold shrink-0 border select-none ${className}`}
      title={sponsor.brand_name}
    >
      {getInitials(sponsor.brand_name)}
    </div>
  )
}
