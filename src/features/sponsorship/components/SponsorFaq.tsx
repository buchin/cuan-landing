import { HelpCircle } from 'lucide-react'
import { useLanguage } from '../../../context/LanguageContext'

export function SponsorFaq() {
  const { t } = useLanguage()

  const faqs = [
    {
      q: 'Bagaimana cara kerja Sponsorware di Cuan?',
      a: 'Cuan v1.0 mengadopsi model Sponsorware. Script akan dirilis 100% open-source gratis di GitHub saat 100 sponsor komunitas terpenuhi. Anda bebas menentukan nominal dukungan (mulai Rp 100.000). Semua kontributor langsung mendapatkan akses ke private GitHub repo hari ini juga dan tercatat abadi di Leaderboard.',
    },
    {
      q: 'Kapan dan bagaimana saya mendapatkan akses ke script Cuan?',
      a: 'Setelah pembayaran terverifikasi via Dojo Checkout, undangan kolaborator akan dikirimkan langsung ke akun GitHub Anda (maksimal 1x24 jam) untuk mengakses private repository Cuan.',
    },
    {
      q: 'Apakah posisi saya di Top 5 bisa tergeser?',
      a: 'Posisi Top 5 bersifat dinamis berdasarkan nominal kontribusi tertinggi. Namun, nama dan kontribusi Anda sebagai Founding Sponsor tetap tercatat abadi di repositori resmi GitHub Cuan selamanya!',
    },
    {
      q: 'Ke mana saja brand sponsor akan disorot?',
      a: 'Selain penempatan logo dan tautan dofollow permanen di situs cuan.work dan repositori resmi GitHub Cuan, sponsor Top 5 (Founding Titans) juga akan kami sebutkan secara berkala dalam postingan publik di akun Facebook Buchin (50.000+ pengikut) serta edisi buletin mingguan Dojo (13.000+ pengusaha & kreator digital).',
    },
    {
      q: 'Apakah Cuan menerima semua jenis sponsor?',
      a: 'Tidak. Kami berkomitmen menjaga ekosistem Cuan bersih, berintegritas, dan patuh hukum. Kami menolak tegas sponsor yang terafiliasi dengan judi online (judol), konten pornografi/dewasa, pinjaman online ilegal, atau penipuan. Kontribusi dari situs/entitas tersebut akan ditolak dan tidak akan ditampilkan.',
    },
    {
      q: 'Apa metode pembayaran yang tersedia?',
      a: 'Pembayaran diproses aman via Dojo Checkout. Untuk sponsor lokal (Indonesia) mendukung Transfer Bank BCA, dan untuk sponsor internasional mendukung pembayaran via Stripe. Invoice dan tanda terima resmi otomatis dikirimkan ke email Anda.',
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
