import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import { useLanguage } from '../../../context/LanguageContext'

export function FoundingBackersSection() {
  const { language } = useLanguage()

  return (
    <section className="border-b border-border/60 bg-muted/5 px-6 py-12 sm:px-8">
      <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500/20" />
            <span>{language === 'id' ? 'Dukungan Komunitas & Founding Era' : 'Community & Founding Era Backers'}</span>
          </div>
          <h3 className="font-display text-lg sm:text-xl font-bold text-foreground">
            {language === 'id' ? 'Didukung oleh Founding Backers & Kreator Visioner' : 'Backed by Founding Backers & Visionary Creators'}
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-xl leading-relaxed">
            {language === 'id'
              ? 'Program Pay-What-You-Want v1.0 terbuka. Top 5 kontributor mendapatkan penempatan logo utama permanen di landing page dan GitHub README.'
              : 'Pay-What-You-Want program for v1.0 is open. Top 5 contributors receive permanent primary logo placement in our landing page and GitHub README.'}
          </p>
        </div>
        <Link
          to="/sponsor"
          className="action-secondary min-h-11 px-5 text-xs sm:text-sm font-semibold inline-flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <span>{language === 'id' ? 'Lihat Leaderboard & Sponsor →' : 'View Leaderboard & Sponsor →'}</span>
        </Link>
      </div>
    </section>
  )
}
