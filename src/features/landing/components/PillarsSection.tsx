import { CheckCircle2, Zap, Activity, Coins, Server, Unlock } from 'lucide-react'
import { useLanguage } from '../../../context/LanguageContext'

export function PillarsSection() {
  const { t } = useLanguage()

  const pillars = [
    {
      Icon: Zap,
      title: 'Eksekusi Mandiri',
      text: 'Bukan sekadar chatbot yang memberi saran teks atau resep koding. Cuan bekerja langsung mengeksekusi instruksi sampai aktif di server Anda.',
    },
    {
      Icon: CheckCircle2,
      title: 'Pemeriksaan Hasil Nyata',
      text: 'Cuan memeriksa hasil pekerjaan dan menguji jalannya sistem sebelum menandai tugas selesai. Hasil kerja rapi dan siap langsung dipakai.',
    },
    {
      Icon: Activity,
      title: 'Anti-Amnesia Konteks',
      text: 'Cuan selalu mengingat profil bisnis, riwayat obrolan, dan preferensi Anda. Tidak perlu briefing ulang dari nol setiap kali memulai obrolan baru.',
    },
    {
      Icon: Coins,
      title: 'Pakai Akun AI Sendiri',
      text: 'Bebas biaya token dobel dan markup bulanan. Hubungkan langsung akun langganan Anda (Claude Pro, ChatGPT Plus, Gemini) atau bawa API key sendiri.',
    },
    {
      Icon: Server,
      title: 'Data Milik Anda di Server Sendiri',
      text: 'Seluruh database, file script, dan data bisnis tersimpan aman di server milik Anda sendiri. Bebas risiko kebocoran data ke vendor pihak ketiga.',
    },
    {
      Icon: Unlock,
      title: 'Open Source & Bebas Lock-in',
      text: 'Dilisensikan di bawah Apache-2.0. Anda tidak akan pernah disandera kenaikan harga langganan sepihak, pemangkasan fitur, atau pemblokiran akun. Software milik Anda selamanya.',
    },
  ]

  return (
    <section
      id="features"
      className="scroll-mt-6 border-b border-border/60 px-6 py-16 sm:px-8 sm:py-24"
      aria-labelledby="features-title"
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <div className="mb-3.5 inline-flex items-center gap-2 text-sm sm:text-[15px] font-semibold text-foreground/80">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" strokeWidth={1.5} />
            <span>{t('Fondasi Cuan')}</span>
          </div>
          <h2
            id="features-title"
            className="font-display text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl text-foreground"
          >
            {t('6 Pilar Fondasi Bisnis Tanpa Pusing Teknis')}
          </h2>
          <p className="mt-3 text-base sm:text-lg leading-relaxed text-muted-foreground">
            {t('Dirancang tenang, mandiri, dan bebas ketergantungan pada vendor SaaS mahal.')}
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map(({ Icon, title, text }) => (
            <div key={title} className="rounded-xl border border-border/60 bg-card p-6 shadow-2xs transition-colors hover:border-border/80">
              <Icon className="mb-3.5 h-5 w-5 text-foreground/80" strokeWidth={1.5} />
              <h3 className="text-base font-bold text-foreground">{t(title)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {t(text)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
