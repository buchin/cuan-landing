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

function getAvatarColor(name: string, isTitan: boolean) {
  if (isTitan) {
    return 'border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-400'
  }
  const palettes = [
    'border-blue-500/30 bg-blue-500/10 text-blue-700 dark:text-blue-400',
    'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400',
    'border-violet-500/30 bg-violet-500/10 text-violet-700 dark:text-violet-400',
    'border-sky-500/30 bg-sky-500/10 text-sky-700 dark:text-sky-400',
    'border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-400',
    'border-teal-500/30 bg-teal-500/10 text-teal-700 dark:text-teal-400',
  ]
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = (hash << 5) - hash + name.charCodeAt(i)
  }
  return palettes[Math.abs(hash) % palettes.length]
}

export function SponsorAvatar({ sponsor, size = 'md', className = '' }: SponsorAvatarProps) {
  const [imgError, setImgError] = useState(false)

  const domain = cleanDomain(sponsor.website_url)
  const isTitan = (sponsor.amount_idr || 0) >= 200_000
  const isBusiness = Boolean(domain)

  // 1. Explicit logo (if uploaded)
  const logoSrc = sponsor.logo_url || (sponsor.logo_path ? `/uploads/sponsors/logos/${sponsor.logo_path}` : null)

  // 2. Domain icon via unavatar with fallback=false (avoids robot mascot!)
  const domainIcon = domain ? `https://unavatar.io/${domain}?fallback=false` : null

  // 3. Gravatar avatar (from email hash)
  const gravatarSrc = sponsor.avatar_url

  // If business: try logo, then real domain icon.
  // If individual: try logo, then gravatar.
  const candidateSrc = logoSrc || (isBusiness ? domainIcon : gravatarSrc) || gravatarSrc

  // Shape:
  // - Person / Individual -> Circle (rounded-full) with natural portrait framing
  // - Business / Organization -> Squircle (rounded-xl) with object-contain to preserve logo aspect ratio
  const shapeClass = isBusiness ? 'rounded-xl' : 'rounded-full'
  const fitClass = isBusiness ? 'object-contain p-1.5 bg-background' : 'object-cover'

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

  // Graceful initial monogram fallback (Calm Software aesthetic)
  const colorClass = getAvatarColor(sponsor.brand_name, isTitan)

  return (
    <div
      className={`${sizeClasses} ${shapeClass} flex items-center justify-center font-display font-semibold shrink-0 border ${colorClass} ${className}`}
      title={sponsor.brand_name}
    >
      {getInitials(sponsor.brand_name)}
    </div>
  )
}
