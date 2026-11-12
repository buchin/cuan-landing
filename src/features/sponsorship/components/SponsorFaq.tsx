import { HelpCircle } from 'lucide-react'
import { useLanguage } from '../../../context/LanguageContext'

export function SponsorFaq() {
  const { t } = useLanguage()

  const faqs = [
    {
      q: 'Bagaimana cara kerja Pay-What-You-Want di Cuan?',
      a: 'Anda bebas menentukan nominal donasi (mulai Rp 10.000). Semua kontribusi dicatat dan diurutkan secara transparan di Leaderboard. Siapa pun yang menempati Top 5 kontributor tertinggi mendapatkan slot logo utama, slogan, dan link dofollow permanen.',
    },
    {
      q: 'Apakah posisi saya di Top 5 bisa tergeser?',
      a: 'Ya, posisi Top 5 bersifat dinamis sesuai kontribusi terbesar. Namun, Anda selalu bisa menambah kontribusi kapan saja untuk mempertahankan atau merebut kembali posisi puncak!',
    },
    {
      q: 'Apa metode pembayaran yang tersedia?',
      a: 'Pembayaran diproses aman via Dojo Checkout. Untuk sponsor lokal (Indonesia) mendukung Transfer Bank BCA, dan untuk sponsor internasional mendukung pembayaran via Stripe.',
    },
    {
      q: 'Bagaimana cara mengganti logo atau tautan website setelah bayar?',
      a: 'Anda bisa menghubungi tim kurasi kami via dojo.cc/support atau membalas email konfirmasi invoice untuk memperbarui aset visual dan tautan website bisnis Anda.',
    },
    {
      q: 'Kapan akses VIP build mulai diberikan?',
      a: 'Backer akan menerima undangan langsung ke repositori staging dan akses rilis privat via email sebelum tanggal pengumuman rilis open source publik.',
    },
  ]

  return (
    <section className="mx-auto max-w-3xl px-6 sm:px-8">
      <div className="text-center mb-8">
        <h2 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {t('Pertanyaan yang Sering Diajukan')}
        </h2>
      </div>

      <div className="space-y-4">
        {faqs.map(({ q, a }) => (
          <div key={q} className="rounded-xl border border-border/60 bg-card p-5 text-left shadow-2xs">
            <h4 className="font-display text-base font-bold text-foreground flex items-center gap-2">
              <HelpCircle className="h-4 w-4 text-primary shrink-0" strokeWidth={1.75} />
              <span>{t(q)}</span>
            </h4>
            <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed pl-6">
              {t(a)}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center rounded-2xl border border-border/60 bg-muted/20 p-6 sm:p-8">
        <h3 className="font-display text-lg font-bold text-foreground">
          {t('Ada pertanyaan khusus sebelum bergabung?')}
        </h3>
        <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
          {t('Silakan hubungi kami di')}{' '}
          <a
            href="https://dojo.cc/support"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-primary hover:underline"
          >
            dojo.cc/support
          </a>
          .
        </p>
      </div>
    </section>
  )
}
