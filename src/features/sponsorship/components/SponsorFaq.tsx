import { HelpCircle } from 'lucide-react'
import { useLanguage } from '../../../context/LanguageContext'

export function SponsorFaq() {
  const { t } = useLanguage()

  const faqs = [
    {
      q: 'Bagaimana status rilis Cuan dan pembukaan repositori publik di GitHub?',
      a: 'Target 100 Founding Backers telah terpenuhi dan repositori Cuan kini resmi dibuka untuk publik di GitHub (github.com/buchin/cuan) sebagai Public Alpha (Developer Preview) dengan lisensi Apache-2.0. Siapa pun dapat mencoba, mengeksplorasi kode sumber, dan ikut berkontribusi langsung.',
    },
    {
      q: 'Jika repositori publik sudah dibuka, apa keuntungan tetap menjadi sponsor Cuan?',
      a: 'Sponsor tetap mendapatkan benefit eksklusif yang sangat berharga: (1) Hak kolaborator private repository di GitHub untuk mengikuti roadmap & branch pengembangan internal, (2) Patch release lebih awal untuk perbaikan bug dan rilis fitur baru sebelum disinkronkan ke repo publik, serta (3) Penempatan permanen nama/logo brand dan tautan dofollow di Wall of Fame situs cuan.work serta README GitHub.',
    },
    {
      q: 'Kapan dan bagaimana saya mendapatkan hak kolaborator private repo?',
      a: 'Setelah kontribusi sponsor terverifikasi via Dojo Checkout, tautan undangan kolaborator private repository GitHub akan dikirimkan langsung ke alamat email Anda (maksimal 1x24 jam). Anda langsung dapat mengakses branch aktif dan update patch release lebih awal.',
    },
    {
      q: 'Berapa lama hak kolaborator private repo dan penempatan di Wall of Fame akan aktif?',
      a: 'Permanen. Hak akses sebagai kolaborator private repository GitHub Cuan dan penempatan logo serta backlink dofollow Anda di Wall of Fame bersifat seumur hidup (lifetime) tanpa biaya langganan bulanan.',
    },
    {
      q: 'Ke mana saja brand sponsor akan disorot?',
      a: 'Selain penempatan logo dan tautan dofollow permanen di Wall of Fame cuan.work dan README GitHub resmi Cuan, sponsor Titan & Platinum (mulai Rp 1.000.000) juga kami sebutkan secara berkala dalam postingan publik di akun Facebook Buchin (50.000+ pengikut) serta edisi buletin mingguan Dojo (13.000+ pengusaha & kreator digital).',
    },
    {
      q: 'Apakah Cuan menerima semua jenis sponsor?',
      a: 'Tidak. Kami berkomitmen menjaga ekosistem Cuan bersih, berintegritas, dan patuh hukum. Kami menolak tegas sponsor yang terafiliasi dengan judi online (judol), konten pornografi/dewasa, pinjaman online ilegal, atau penipuan. Kontribusi dari situs/entitas tersebut akan ditolak dan tidak akan ditampilkan di Wall of Fame.',
    },
    {
      q: 'Apa metode pembayaran yang tersedia?',
      a: 'Pembayaran diproses aman via Dojo Checkout. Untuk sponsor lokal (Indonesia) mendukung Transfer Bank BCA, dan untuk sponsor internasional mendukung pembayaran via Stripe. Invoice dan tanda terima resmi otomatis dikirimkan ke email Anda.',
    },
  ]

  return (
    <section id="faq" className="mx-auto max-w-3xl px-4 sm:px-8 mb-20 scroll-mt-20">
      <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground mb-1">
          <HelpCircle className="h-3.5 w-3.5 text-primary shrink-0" />
          <span>{t('Tanya Jawab')}</span>
        </div>
        <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          {t('Pertanyaan yang Sering Diajukan')}
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          {t('Semua hal yang perlu Anda ketahui tentang status Public Alpha, hak kolaborator private repo, dan penempatan permanen di Wall of Fame.')}
        </p>
      </div>

      <div className="space-y-3.5 text-left">
        {faqs.map(({ q, a }) => (
          <div key={q} className="rounded-xl border border-border/70 bg-card p-4 sm:p-5 shadow-2xs">
            <h3 className="font-display text-sm sm:text-base font-bold text-foreground flex items-center gap-2.5">
              <HelpCircle className="h-4 w-4 text-primary shrink-0" strokeWidth={2} />
              <span>{t(q)}</span>
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed pl-6.5 break-words">
              {t(a)}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-8 text-center text-xs sm:text-sm text-muted-foreground">
        <span>{t('Ada pertanyaan khusus sebelum bergabung? Hubungi kami di')}{' '}</span>
        <a
          href="https://dojo.cc/support"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-primary hover:underline"
        >
          dojo.cc/support
        </a>
      </p>
    </section>
  )
}
