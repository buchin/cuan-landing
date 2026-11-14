export const SPONSORWARE_TARGET = 100

export interface SponsorItem {
  id: string
  brand_name: string
  github_username?: string
  website_url?: string
  logo_url?: string
  logo_path?: string
  slogan?: string
  amount_idr?: number
  paid_at?: string
}

export function formatIDR(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(amount)
}

export function getRankBadge(rank: number) {
  switch (rank) {
    case 1:
      return {
        label: '🥇 #1 Platinum Titan',
        className: 'border-amber-500/40 bg-amber-500/10 text-amber-600 dark:text-amber-400',
      }
    case 2:
      return {
        label: '🥈 #2 Gold Titan',
        className: 'border-slate-400/40 bg-slate-400/10 text-slate-700 dark:text-slate-300',
      }
    case 3:
      return {
        label: '🥉 #3 Silver Titan',
        className: 'border-amber-700/40 bg-amber-700/10 text-amber-700 dark:text-amber-500',
      }
    case 4:
    case 5:
      return {
        label: `⭐ #${rank} Bronze Titan`,
        className: 'border-blue-500/40 bg-blue-500/10 text-blue-600 dark:text-blue-400',
      }
    default:
      return {
        label: `#${rank}`,
        className: 'border-border/60 bg-muted/40 text-muted-foreground',
      }
  }
}

export const PRESET_AMOUNTS = [
  { value: 100_000, label: 'Rp 100.000', tier: 'Supporter', perk: 'Akses Private Repo' },
  { value: 300_000, label: 'Rp 300.000', tier: 'Logo & Backlink', perk: '+ Logo & Link Dofollow', popular: true },
  { value: 1_000_000, label: 'Rp 1.000.000', tier: 'Titan Backer', perk: 'Amankan Top 5 Titan' },
  { value: 2_500_000, label: 'Rp 2.500.000', tier: '#1 Platinum Titan', perk: 'Tahta Utama #1 & Sorotan 63k' },
]
