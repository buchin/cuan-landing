import { Check, X, Minus, CheckCircle2 } from 'lucide-react'
import { CuanMark } from '../../../components/brand/CuanMark'
import { useLanguage } from '../../../context/LanguageContext'

interface ComparisonRow {
  label: string
  desc: string
  chatbot: { icon: 'check' | 'warn' | 'x'; text: string }
  coder: { icon: 'check' | 'warn' | 'x'; text: string }
  hermes: { icon: 'check' | 'warn' | 'x'; text: string }
  cuan: { icon: 'check' | 'warn' | 'x'; text: string }
}

export function ComparisonSection() {
  const { t } = useLanguage()

  const comparisonRows: ComparisonRow[] = [
    {
      label: 'Lingkungan eksekusi',
      desc: 'Di mana tugas benar-benar dijalankan',
      chatbot: { icon: 'x', text: 'Cloud vendor (terisolasi dari VPS)' },
      coder: { icon: 'warn', text: 'Terminal laptop lokal / software koding' },
      hermes: { icon: 'warn', text: 'Cloud vendor Meta / server lokal' },
      cuan: { icon: 'check', text: 'Server VPS 24/7 mandiri' },
    },
    {
      label: 'Antrean banyak tugas (Multi-task)',
      desc: 'Memproses banyak instruksi tanpa ditunggui',
      chatbot: { icon: 'x', text: 'Prompt manual 1 per 1' },
      coder: { icon: 'warn', text: 'Wajib ditungguin di terminal' },
      hermes: { icon: 'warn', text: 'Background tugas sosmed / scraping' },
      cuan: { icon: 'check', text: 'Antrean otonom 24/7 di server' },
    },
    {
      label: 'Antarmuka & kemudahan pakai',
      desc: 'Kenyamanan akses untuk tim non-teknis',
      chatbot: { icon: 'warn', text: 'Chat teks percakapan' },
      coder: { icon: 'x', text: 'Wajib terminal hitam & git' },
      hermes: { icon: 'warn', text: 'Mobile app & bot pesan (Slack/WA)' },
      cuan: { icon: 'check', text: 'Web & Mobile tenang (ramah non-teknis)' },
    },
    {
      label: 'Rem pengaman persetujuan',
      desc: 'Kontrol manusia sebelum aksi menyentuh sistem',
      chatbot: { icon: 'x', text: 'Tidak ada (hanya saran teks)' },
      coder: { icon: 'warn', text: 'Prompt teks terminal [y/n]' },
      hermes: { icon: 'warn', text: 'Izin ad-hoc (pop-up / tombol chat)' },
      cuan: { icon: 'check', text: 'Approval Card 1-Tap terstruktur' },
    },
    {
      label: 'Quality Gate & verifikasi selesai',
      desc: 'Pembuktian nyata sebelum tugas dianggap tuntas',
      chatbot: { icon: 'x', text: 'Tidak ada pengujian sistem' },
      coder: { icon: 'warn', text: 'Testing kode programmer' },
      hermes: { icon: 'warn', text: 'Evaluasi internal bot (status API)' },
      cuan: { icon: 'check', text: 'Bukti visual + tes otomatis tuntas' },
    },
    {
      label: 'Model biaya token AI',
      desc: 'Struktur biaya pemakaian kecerdasan buatan',
      chatbot: { icon: 'x', text: 'Langganan per akun ($20/bln)' },
      coder: { icon: 'warn', text: 'Langganan / API developer' },
      hermes: { icon: 'warn', text: 'Langganan berjenjang / API dev' },
      cuan: { icon: 'check', text: 'Bebas dobel biaya (pakai akun resmi sendiri)' },
    },
  ]

  const renderIcon = (type: 'check' | 'warn' | 'x') => {
    switch (type) {
      case 'check':
        return <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400" strokeWidth={1.5} />
      case 'warn':
        return <Minus className="h-4 w-4 text-amber-500/70" strokeWidth={1.5} />
      case 'x':
        return <X className="h-4 w-4 text-muted-foreground/40" strokeWidth={1.5} />
    }
  }

  return (
    <section
      id="comparison"
      className="scroll-mt-6 border-b border-border/60 bg-muted/10 px-6 py-16 sm:px-8 sm:py-24"
      aria-labelledby="comparison-title"
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <div className="mb-3.5 inline-flex items-center gap-2 text-sm sm:text-[15px] font-semibold text-foreground/80">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" strokeWidth={1.5} />
            <span>{t('Mengapa Cuan Berbeda?')}</span>
          </div>
          <h2
            id="comparison-title"
            className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl"
          >
            {t('Bukan Sekadar Chatbot atau Tool Programmer')}
          </h2>
          <p className="mt-3 text-base sm:text-lg leading-relaxed text-muted-foreground">
            {t('Perbandingan faktual antara Chatbot percakapan, Tool Koding, Asisten Personal, dan Cuan.')}
          </p>
        </div>

        {/* DESKTOP TABLE VIEW */}
        <div className="mt-10 hidden sm:block overflow-x-auto pb-4">
          <table className="w-full min-w-[760px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-border/60">
                <th className="py-3.5 pr-4 font-bold text-foreground w-[24%]">
                  {t('Kebutuhan Bisnis Anda')}
                </th>
                <th className="px-3 py-3.5 font-semibold text-center w-[19%]">
                  <div className="font-bold text-foreground">{t('Chatbot')}</div>
                  <div className="text-xs text-muted-foreground font-normal mt-0.5">
                    (Claude, ChatGPT, Gemini)
                  </div>
                </th>
                <th className="px-3 py-3.5 font-semibold text-center w-[19%]">
                  <div className="font-bold text-foreground">{t('Tool Koding')}</div>
                  <div className="text-xs text-muted-foreground font-normal mt-0.5">
                    (OpenCode, Claude Code)
                  </div>
                </th>
                <th className="px-3 py-3.5 font-semibold text-center w-[19%]">
                  <div className="font-bold text-foreground">{t('Asisten Personal')}</div>
                  <div className="text-xs text-muted-foreground font-normal mt-0.5">
                    (Hermes, Muse)
                  </div>
                </th>
                <th className="px-3 py-3.5 font-bold text-foreground text-center w-[19%] bg-primary/5 dark:bg-primary/10 rounded-t-lg border-x border-t border-border/50">
                  <div className="inline-flex items-center gap-1.5 font-bold">
                    <CuanMark decorative className="h-4 w-4" />
                    <span className="font-display tracking-tight text-sm font-bold text-foreground">
                      cuan
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground font-normal mt-0.5">
                    {t('AI Project Manager Bisnis')}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {comparisonRows.map((row, idx, arr) => (
                <tr key={row.label} className="hover:bg-muted/30 transition-colors">
                  <td className="py-3.5 pr-4 font-semibold text-foreground">
                    {t(row.label)}
                  </td>
                  <td className="px-3 py-3.5 text-center text-muted-foreground">
                    <div className="flex flex-col items-center gap-1">
                      {renderIcon(row.chatbot.icon)}
                      <span className="text-xs sm:text-sm leading-tight">{t(row.chatbot.text)}</span>
                    </div>
                  </td>
                  <td className="px-3 py-3.5 text-center text-muted-foreground">
                    <div className="flex flex-col items-center gap-1">
                      {renderIcon(row.coder.icon)}
                      <span className="text-xs sm:text-sm leading-tight">{t(row.coder.text)}</span>
                    </div>
                  </td>
                  <td className="px-3 py-3.5 text-center text-muted-foreground">
                    <div className="flex flex-col items-center gap-1">
                      {renderIcon(row.hermes.icon)}
                      <span className="text-xs sm:text-sm leading-tight">{t(row.hermes.text)}</span>
                    </div>
                  </td>
                  <td className={`px-3 py-3.5 text-center bg-primary/5 dark:bg-primary/10 border-x border-border/50 ${idx === arr.length - 1 ? 'border-b rounded-b-lg' : ''}`}>
                    <div className="flex flex-col items-center gap-1 font-semibold text-foreground">
                      {renderIcon(row.cuan.icon)}
                      <span className="text-xs sm:text-sm leading-tight text-foreground font-semibold">{t(row.cuan.text)}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MOBILE CARD VIEW */}
        <div className="mt-8 space-y-4 sm:hidden">
          {comparisonRows.map((row) => (
            <div
              key={row.label}
              className="rounded-xl border border-border/60 bg-card p-4 shadow-2xs"
            >
              <div className="mb-3">
                <h3 className="font-display text-base font-bold text-foreground">
                  {t(row.label)}
                </h3>
                <p className="mt-0.5 text-xs sm:text-sm text-muted-foreground">
                  {t(row.desc)}
                </p>
              </div>

              {/* Cuan Highlight Card */}
              <div className="mb-3 flex items-start gap-2.5 rounded-lg border border-primary/25 bg-primary/5 dark:bg-primary/10 p-3">
                <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" strokeWidth={1.5} />
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-foreground">
                    <CuanMark decorative className="h-3.5 w-3.5" />
                    <span className="font-display tracking-tight font-bold text-foreground">
                      cuan
                    </span>
                    <span className="text-xs font-normal text-muted-foreground">({t('AI Project Manager')})</span>
                  </div>
                  <div className="mt-0.5 text-xs sm:text-sm font-semibold text-foreground">
                    {t(row.cuan.text)}
                  </div>
                </div>
              </div>

              {/* Alternatives Comparison List */}
              <div className="space-y-2 border-t border-border/40 pt-2.5 text-xs sm:text-sm">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="text-xs">
                    {t('Chatbot')} <span className="text-[11px] text-muted-foreground/75">(Claude, ChatGPT, Gemini)</span>
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-foreground">
                    {renderIcon(row.chatbot.icon)}
                    <span>{t(row.chatbot.text)}</span>
                  </span>
                </div>

                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="text-xs">
                    {t('Tool Koding')} <span className="text-[11px] text-muted-foreground/75">(OpenCode, Claude Code)</span>
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-foreground">
                    {renderIcon(row.coder.icon)}
                    <span>{t(row.coder.text)}</span>
                  </span>
                </div>

                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="text-xs">
                    {t('Asisten Personal')} <span className="text-[11px] text-muted-foreground/75">(Hermes, Muse)</span>
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-foreground">
                    {renderIcon(row.hermes.icon)}
                    <span>{t(row.hermes.text)}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
