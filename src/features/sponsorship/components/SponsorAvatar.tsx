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
  const isTitan = (sponsor.amount_idr || 0) >= 200_000
  const isBusiness = Boolean(domain)

  // 1. Explicit logo (if uploaded by sponsor)
  const logoSrc = sponsor.logo_url || (sponsor.logo_path ? `/uploads/sponsors/logos/${sponsor.logo_path}` : null)

  // 2. Domain icon via unavatar (falls back to Google S2 favicon service)
  const domainIcon = domain
    ? `https://unavatar.io/${domain}?fallback=https%3A%2F%2Fwww.google.com%2Fs2%2Ffavicons%3Fdomain%3D${domain}%26sz%3D128`
    : null

  // 3. Gravatar avatar (from email hash)
  const gravatarSrc = sponsor.avatar_url

  // Candidate image URL:
  // - If business: logo -> domain favicon -> gravatar
  // - If individual person: logo -> gravatar
  const candidateSrc = logoSrc || (isBusiness ? domainIcon : gravatarSrc) || gravatarSrc

  // Design standard:
  // - Person / Individual -> Circle (rounded-full) with object-cover
  // - Brand / Organization -> Squircle (rounded-xl) with object-contain (preserves logo integrity)
  const shapeClass = isBusiness ? 'rounded-xl' : 'rounded-full'
  const fitClass = isBusiness ? 'object-contain p-1 bg-background' : 'object-cover'

  const sizeClasses = {
    xs: isBusiness ? 'h-5 w-5 text-[10px] rounded-md' : 'h-5 w-5 text-[10px] rounded-full',
    sm: isBusiness ? 'h-6 w-6 text-xs rounded-lg' : 'h-6 w-6 text-xs rounded-full',
    md: isBusiness ? 'h-10 w-10 text-xs rounded-xl' : 'h-10 w-10 text-xs rounded-full',
    lg: isBusiness ? 'h-12 w-12 text-sm rounded-xl' : 'h-12 w-12 text-sm rounded-full',
  }[size]

  if (!imgError && candidateSrc) {
    return (
      <img
        src={candidateSrc}
        alt={sponsor.brand_name}
        onError={() => setImgError(true)}
        className={`${sizeClasses} ${fitClass} border border-border/50 shrink-0 shadow-2xs ${className}`}
        loading="lazy"
      />
    )
  }

  return (
    <div
      className={`${sizeClasses} ${shapeClass} flex items-center justify-center font-display font-semibold shrink-0 border ${
        isTitan
          ? 'border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-400'
          : 'border-border/60 bg-muted/40 text-foreground/80'
      } ${className}`}
    >
      {getInitials(sponsor.brand_name)}
    </div>
  )
}
