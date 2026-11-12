import { useState } from 'react'
import {
  CheckCircle2,
  Check,
  Terminal,
  RefreshCw,
  Clock,
  Sparkles,
} from 'lucide-react'
import { ApprovalCard } from '../ApprovalCard'
import { useLanguage } from '../../../context/LanguageContext'

export function HowItWorksSection() {
  const { t } = useLanguage()
  const [isPlanApproved, setIsPlanApproved] = useState(false)

  return (
    <section
      id="how-it-works"
      className="scroll-mt-6 border-b border-border/60 px-6 py-16 sm:px-8 sm:py-24"
      aria-labelledby="how-title"
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <div className="mb-3.5 inline-flex items-center gap-2 text-sm sm:text-[15px] font-semibold text-foreground/80">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" strokeWidth={1.5} />
            <span>{t('Cara kerja Cuan')}</span>
          </div>
          <h2
            id="how-title"
            className="font-display text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl"
          >
            {t('Satu Obrolan, Langsung Menjadi Pekerjaan Nyata')}
          </h2>
          <p className="mt-3 text-base sm:text-lg leading-relaxed text-muted-foreground">
            {t('Layanan pelanggan tetap hangat di tangan Anda dengan sentuhan manusia. Saat butuh riset konten, update web, atau eskalasi kendala teknis, cukup berikan arahan santai. Cuan menyusun rencana, meminta persetujuan Anda, lalu menuntaskan solusinya di balik layar.')}
          </p>
        </div>

        <ol className="mt-12 grid gap-8 lg:grid-cols-3">
          {/* STEP 01: CHAT & WHISPER */}
          <li className="flex flex-col justify-between rounded-xl border border-border/60 bg-card p-6 shadow-2xs">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-muted-foreground tabular-nums">
                  01
                </span>
                <span className="rounded-md bg-muted/60 px-2.5 py-0.5 text-xs font-semibold text-muted-foreground">
                  Chat & Whisper
                </span>
              </div>
              <h3 className="font-display mt-4 text-lg font-bold leading-snug">
                {t('Arahkan santai atau bisikkan kendala ke @cuan')}
              </h3>
              <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-muted-foreground">
                {t('Mulai dari chat di HP atau laptop. Minta riset ide video, pasang script baru, atau gunakan whisper privat ke @cuan saat menangani komplain pelanggan tanpa terlihat oleh pelanggan.')}
              </p>
            </div>

            {/* Real Cuan Chat Preview */}
            <div className="mt-6 rounded-xl border border-border/60 bg-muted/20 p-4 text-left text-xs space-y-3">
              <div className="flex items-center justify-between border-b border-border/40 pb-2">
                <div className="flex items-center gap-1.5 font-medium text-foreground">
                  <span className="h-2 w-2 rounded-full bg-amber-500" />
                  <span className="font-semibold text-xs">@cuan</span>
                  <span className="text-[10px] text-muted-foreground font-mono">Whisper Mode</span>
                </div>
                <span className="text-[10px] text-muted-foreground font-mono">{t('Privat Internal')}</span>
              </div>
              <div className="space-y-2.5">
                <div className="rounded-lg bg-card p-3 border border-border/50 shadow-2xs">
                  <div className="text-[10px] font-semibold text-muted-foreground mb-1 flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                    {t('Anda (Support / Owner)')}
                  </div>
                  <p className="text-foreground leading-relaxed">
                    &ldquo;{t('@cuan pembeli ini lapor tautan unduhan produk digitalnya error 403. Tolong periksa izin akses file dan siapkan solusinya.')}&rdquo;
                  </p>
                </div>
                <div className="rounded-lg bg-primary/5 dark:bg-primary/10 p-3 border border-primary/20">
                  <div className="text-[10px] font-semibold text-primary mb-1 flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    @cuan
                  </div>
                  <p className="text-foreground/90 leading-relaxed text-[11px]">
                    {t('Siap! Berkas digital terbaca. Saya siapkan rencana perbaikan izin file dan draf balasannya.')}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-border/30 text-[10px] text-muted-foreground font-mono">
                <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span>{t('Antrean: 1 aktif · 0 menunggu')}</span>
                </span>
                <span className="rounded-md bg-muted/80 px-2 py-0.5 text-muted-foreground font-sans text-[11px]">
                  {t('Draft Approval Card')} &rarr;
                </span>
              </div>
            </div>
          </li>

          {/* STEP 02: APPROVAL CARD */}
          <li className="flex flex-col justify-between rounded-xl border border-border/60 bg-card p-6 shadow-2xs">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-muted-foreground tabular-nums">
                  02
                </span>
                <span className="rounded-md bg-muted/60 px-2.5 py-0.5 text-xs font-semibold text-muted-foreground">
                  Setujui
                </span>
              </div>
              <h3 className="font-display mt-4 text-lg font-bold leading-snug">
                {t('Tinjau rencana kerja sebelum dijalankan')}
              </h3>
              <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-muted-foreground">
                {t('Cuan tidak pernah bertindak liar di luar kendali. Sebelum mengubah berkas atau menyentuh sistem, Cuan menyajikan rencana kerja transparan. Satu klik untuk menyetujui.')}
              </p>
            </div>

            {/* Real ApprovalCard Component */}
            <div className="mt-6 text-left">
              <ApprovalCard
                plan={{
                  title: t('Perbaiki Izin Akses Berkas & Buat Draf Balasan'),
                  project_name: 'cuan-workspace',
                  description: `- ${t('Cek status izin akses file digital di penyimpanan')}\n- ${t('Pulihkan tautan unduhan privat yang terverifikasi')}\n- ${t('Buatkan draf balasan ramah untuk dikirim ke pembeli')}`,
                }}
                accepted={isPlanApproved}
                onApprove={() => setIsPlanApproved(true)}
                className="mt-0"
              />
            </div>
          </li>

          {/* STEP 03: BERES (Authentic Cuan TaskCompletionCard) */}
          <li className="flex flex-col justify-between rounded-xl border border-border/60 bg-card p-6 shadow-2xs">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-muted-foreground tabular-nums">
                  03
                </span>
                <span className="rounded-md bg-muted/60 px-2.5 py-0.5 text-xs font-semibold text-muted-foreground">
                  Beres
                </span>
              </div>
              <h3 className="font-display mt-4 text-lg font-bold leading-snug">
                {t('Pekerjaan beres teruji + draf siap kirim')}
              </h3>
              <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-muted-foreground">
                {t('Pekerjaan tuntas diuji aktif. Untuk interaksi pelanggan atau publikasi, Cuan langsung membuatkan draf balasan ramah yang siap Anda kirimkan dengan satu ketukan.')}
              </p>
            </div>

            {/* Authentic Cuan TaskCompletionCard UI */}
            <div className="mt-6 rounded-xl border border-border/40 bg-card/40 dark:bg-card/20 p-3.5 sm:p-4 text-card-foreground shadow-xs space-y-3 text-left">
              {/* Top Header: Calm Status, TaskRef, Duration, Live Terminal & Coba Lagi buttons */}
              <div className="flex items-center justify-between gap-2 flex-wrap border-b border-border/40 pb-2.5">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" strokeWidth={2} />
                    <span>{t('Tugas Selesai')}</span>
                  </span>
                  <span className="text-xs font-mono font-medium text-muted-foreground">
                    #task_download_fix
                  </span>
                  <div className="hidden xs:flex items-center gap-1 text-[11px] text-muted-foreground font-mono">
                    <Clock className="h-3 w-3 shrink-0" />
                    <span>48s</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="min-h-[28px] px-2 py-0.5 text-xs font-medium rounded-lg inline-flex items-center gap-1.5 text-muted-foreground bg-muted/30 border border-border/40">
                    <Terminal className="h-3 w-3 text-emerald-500 shrink-0" />
                    <span className="text-[11px]">{t('Live Terminal')}</span>
                  </span>
                  <span className="min-h-[28px] px-2 py-0.5 text-xs font-medium rounded-lg inline-flex items-center gap-1.5 text-muted-foreground bg-muted/30 border border-border/40">
                    <RefreshCw className="h-3 w-3 shrink-0" />
                    <span className="text-[11px]">{t('Coba Lagi')}</span>
                  </span>
                </div>
              </div>

              {/* Title & Summary */}
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-foreground leading-snug">
                  {t('Izin Akses Berkas & Link Unduhan Berhasil Aktif')}
                </h4>

                <div className="text-xs text-foreground/90 space-y-1.5">
                  <div className="text-[11px] font-medium text-muted-foreground flex items-center gap-1">
                    <Check className="h-3 w-3 text-emerald-500" />
                    <span>{t('Ringkasan Hasil')}</span>
                  </div>
                  <div className="rounded-lg bg-muted/20 p-2.5 border border-border/30 space-y-1 text-[11px] text-muted-foreground">
                    <div className="flex items-start gap-1.5 text-foreground/90">
                      <span className="text-emerald-500">✓</span>
                      <span>{t('Izin berkas digital dipulihkan ke status privat aman')}</span>
                    </div>
                    <div className="flex items-start gap-1.5 text-foreground/90">
                      <span className="text-emerald-500">✓</span>
                      <span>{t('Tautan unduhan baru teruji aktif & dapat diakses')}</span>
                    </div>
                  </div>
                </div>

                {/* Authentic 1-Click Actionable Visitor Reply Draft */}
                <div className="rounded-lg border border-primary/25 bg-primary/5 dark:bg-primary/10 p-2.5 space-y-1.5">
                  <div className="flex items-center justify-between gap-1">
                    <div className="flex items-center gap-1 text-[11px] font-semibold text-primary">
                      <Sparkles className="h-3 w-3 shrink-0" />
                      <span>{t('Draf Balasan Pelanggan')}</span>
                    </div>
                    <span className="rounded-md bg-primary/15 px-2 py-0.5 text-[10px] font-semibold text-primary">
                      {t('Gunakan Draf')}
                    </span>
                  </div>
                  <p className="text-[11px] text-foreground/90 italic leading-relaxed">
                    &ldquo;{t('Halo Kak, tautan unduhan file digitalnya sudah kami perbaiki dan sekarang sudah bisa diakses normal. Silakan dicoba ya Kak!')}&rdquo;
                  </p>
                </div>

                {/* Technical link footer */}
                <div className="pt-2 flex items-center justify-between border-t border-border/30 text-[11px]">
                  <span className="text-muted-foreground hover:text-foreground transition-colors font-medium">
                    {t('Detail Diagnostik & Status Deploy →')}
                  </span>
                  <span className="font-mono text-muted-foreground/80">2/2 kriteria</span>
                </div>
              </div>
            </div>
          </li>
        </ol>
      </div>
    </section>
  )
}
