import { ArrowRight } from 'lucide-react'
import { useLanguage } from '../../../context/LanguageContext'

interface FinalCtaSectionProps {
  onWaitingListClick: () => void
}

export function FinalCtaSection({ onWaitingListClick }: FinalCtaSectionProps) {
  const { t } = useLanguage()

  return (
    <section className="px-6 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div className="max-w-xl">
          <h2 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
            {t('Siap bebas dari pusing urusan teknis?')}
          </h2>
          <p className="mt-3 text-base sm:text-lg leading-relaxed text-muted-foreground">
            {t('Fokus berkarya, melayani pelanggan, dan cari cuan. Saat ada kendala rumit atau kebutuhan teknis, cukup eskalasi ke Cuan lewat chat. Biarkan Cuan yang membereskannya di balik layar dan menyiapkan draf solusinya untuk Anda.')}
          </p>
          <p className="mt-3 text-sm text-muted-foreground/80">
            {t('Open source · Bebas biaya dobel · Data 100% milik Anda di server sendiri')}
          </p>
        </div>
        <button
          type="button"
          onClick={onWaitingListClick}
          className="action-primary min-h-12 px-7 text-base font-semibold shadow-xs cursor-pointer inline-flex items-center gap-2"
        >
          <span>{t('Gabung Waiting List')}</span>
          <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
        </button>
      </div>
    </section>
  )
}
