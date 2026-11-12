import { AlertCircle, Coins, FileCode, Bot } from 'lucide-react'
import { useLanguage } from '../../../context/LanguageContext'

export function ProblemSection() {
  const { t } = useLanguage()

  const problems = [
    {
      Icon: Coins,
      title: 'Sewa tim teknis mahal, ngulik sendiri burnout',
      desc: 'Gaji jutaan rupiah per bulan atau sewa agensi mahal hanya untuk setup kecil. Mau coba koding sendiri, seharian habis membaca tutorial dan mengatasi error log alih-alih meluncurkan karya.',
    },
    {
      Icon: FileCode,
      title: 'Script, tema, & template mangkrak karena setup rumit',
      desc: 'Beli script tools, tema blog portal, atau template web di marketplace tapi mentok saat setup database dan server. Mau bayar jasa install, biayanya mahal dan prosesnya lama.',
    },
    {
      Icon: Bot,
      title: 'Chatbot AI cuma ngasih teks, eksekusi tetap manual',
      desc: 'ChatGPT dan Claude hebat untuk meriset ide dan draf naskah atau kode. Namun mereka cuma memberi teks—Anda tetap harus manual copy-paste, menyambungkan webhook, dan menguji semuanya sendiri.',
    },
  ]

  return (
    <section
      id="problem"
      className="scroll-mt-6 border-b border-border/60 bg-muted/20 px-6 py-16 sm:px-8 sm:py-24"
      aria-labelledby="problem-title"
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <div className="mb-3.5 inline-flex items-center gap-2 text-sm sm:text-[15px] font-semibold text-foreground/80">
            <AlertCircle className="h-4 w-4 text-amber-500/90" strokeWidth={1.5} />
            <span>{t('Tantangan Kreator & Pebisnis Digital')}</span>
          </div>
          <h2
            id="problem-title"
            className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl"
          >
            {t('Punya segudang ide proyek digital, tapi sering mentok di urusan teknis?')}
          </h2>
          <p className="mt-3 text-base sm:text-lg leading-relaxed text-muted-foreground">
            {t('Banyak kreator dan pengembang proyek mencoba sewa programmer, langganan SaaS mahal, hingga utak-atik AI terbaru—namun akhirnya waktu habis mengurus error teknis alih-alih berkarya dan membesarkan proyek.')}
          </p>
        </div>

        {/* Problem Cards: No nested avatar boxes, clean direct icons */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {problems.map(({ Icon, title, desc }) => (
            <div
              key={title}
              className="rounded-xl border border-border/60 bg-card p-6 shadow-2xs transition-colors hover:border-border/80"
            >
              <Icon className="mb-3.5 h-6 w-6 text-foreground/80" strokeWidth={1.5} />
              <h3 className="font-display text-lg font-bold text-foreground">
                {t(title)}
              </h3>
              <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-muted-foreground">
                {t(desc)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
