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

  // 1. Explicit logo (if uploaded)
  const logoSrc = sponsor.logo_url || (sponsor.logo_path ? `/uploads/sponsors/logos/${sponsor.logo_path}` : null)

  // 2. Domain logo via unavatar (falls back automatically to google favicon)
  const domainIcon = domain ? `https://unavatar.io/${domain}?fallback=https%3A%2F%2Fwww.google.com%2Fs2%2Ffavicons%3Fdomain%3D${domain}%26sz%3D128` : null

  // 3. Gravatar avatar (from email hash)
  const gravatarSrc = sponsor.avatar_url

  // Priority: explicit logo -> domain icon (for websites) -> gravatar -> monogram fallback
  const candidateSrc = logoSrc || (domain ? domainIcon : gravatarSrc) || gravatarSrc

  const sizeClasses = {
    xs: 'h-4 w-4 text-[9px] rounded-full',
    sm: 'h-5 w-5 text-[10px] rounded-full',
    md: 'h-9 w-9 text-xs rounded-xl',
    lg: 'h-11 w-11 text-sm rounded-xl',
  }[size]

  if (!imgError && candidateSrc) {
    return (
      <img
        src={candidateSrc}
        alt={sponsor.brand_name}
        onError={() => setImgError(true)}
        className={`${sizeClasses} object-cover bg-muted/40 border border-border/40 shrink-0 ${className}`}
        loading="lazy"
      />
    )
  }

  return (
    <div
      className={`${sizeClasses} flex items-center justify-center font-display font-semibold shrink-0 border ${
        isTitan
          ? 'border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-400'
          : 'border-border/60 bg-muted/40 text-foreground/80'
      } ${className}`}
    >
      {getInitials(sponsor.brand_name)}
    </div>
  )
}
