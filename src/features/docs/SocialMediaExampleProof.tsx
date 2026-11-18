import { useState } from 'react'
import {
  CheckCircle2,
  Share2,
  ChevronLeft,
  ChevronRight,
  Send,
  Calendar,
  Layers,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  FolderKanban,
  FileText,
} from 'lucide-react'

interface SocialMediaExampleProofProps {
  language: 'id' | 'en'
}

export function SocialMediaExampleProof({ language }: SocialMediaExampleProofProps) {
  const isEn = language === 'en'
  const [activeTab, setActiveTab] = useState<'deliverable' | 'platform'>('deliverable')
  const [currentSlide, setCurrentSlide] = useState(0)
  const totalSlides = 5

  const slideImages = [
    '/examples/social-media/slide-1.png',
    '/examples/social-media/slide-2.png',
    '/examples/social-media/slide-3.png',
    '/examples/social-media/slide-4.png',
    '/examples/social-media/slide-5.png',
  ]

  const captionText = isEn
    ? `☕️ Brewing coffee at home but it often tastes burnt or sour?\n\nYou might be making these 3 simple mistakes:\n1. Pouring boiling 100°C water directly (ideal: 90°–94°C)\n2. Measuring with spoons instead of scale (golden ratio: 1:15)\n3. Skipping the 40-second blooming phase\n\nSwipe through the slides for the step-by-step breakdown! 👉\n\nComment "V60" below if you want our top 3 local arabica bean recommendations this week!\n\n#manualbrew #v60coffee #specialtycoffee #homebarista #coffeeguide`
    : `☕️ Sering seduh kopi sendiri di rumah tapi rasanya pahit gosong atau asam sepat?\n\nBisa jadi Anda melakukan 3 kesalahan sepele ini:\n1. Menuang air mendidih 100°C langsung (ideal: 90°–94°C)\n2. Menakar hanya pakai sendok kira-kira (rasio emas: 1:15 digital scale)\n3. Melewatkan fase blooming 40 detik\n\nGeser slide untuk panduan langkah demi langkahnya! 👉\n\nKetik "V60" di kolom komentar kalau Anda mau kami buatkan rekomendasi 3 biji kopi arabika lokal terbaik minggu ini!\n\n#kopinusantara #manualbrew #v60coffee #tipsngopi #seduhkopi`

  return (
    <div className="my-8 rounded-2xl border border-border/70 bg-card p-4 sm:p-6 space-y-6 shadow-sm">
      {/* Header & Tab Selector */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/50 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0">
            <Share2 className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-semibold text-foreground flex items-center gap-2">
              <span>{isEn ? 'Authentic Deliverable & Production Proof' : 'Bukti Nyata Hasil Kerja & Eksekusi Platform Cuan'}</span>
              <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                {isEn ? 'Verified Real Execution' : 'Terverifikasi Eksekusi Nyata'}
              </span>
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              {isEn
                ? '5 carousel slides (1080x1350px PNG) + Tebar.app MCP payload executed live on app.cuan.work.'
                : '5 slide carousel (1080x1350px PNG) + payload Tebar.app MCP dieksekusi nyata di app.cuan.work.'}
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="inline-flex rounded-xl bg-muted/60 p-1 border border-border/50 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('deliverable')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
              activeTab === 'deliverable'
                ? 'bg-background text-foreground shadow-xs'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {isEn ? '1. Slide & Schedule Deliverable' : '1. Hasil Slide & Jadwal'}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('platform')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'platform'
                ? 'bg-background text-foreground shadow-xs'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>{isEn ? '2. Live Cuan Board Proof' : '2. Bukti Live Platform Cuan'}</span>
          </button>
        </div>
      </div>

      {activeTab === 'deliverable' ? (
        /* Grid: Carousel Preview on Left, Caption & MCP Call on Right */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Interactive Carousel Preview */}
          <div className="lg:col-span-5 space-y-3">
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden border border-border/60 bg-muted/40 shadow-inner group">
              <img
                src={slideImages[currentSlide]}
                alt={`Slide ${currentSlide + 1}`}
                className="w-full h-full object-cover transition-opacity duration-200"
                loading="lazy"
              />

              {/* Navigation Overlay Arrows */}
              <button
                type="button"
                onClick={() => setCurrentSlide((prev) => (prev > 0 ? prev - 1 : totalSlides - 1))}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 hover:bg-background text-foreground shadow-md backdrop-blur-xs transition-transform hover:scale-105 cursor-pointer"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setCurrentSlide((prev) => (prev < totalSlides - 1 ? prev + 1 : 0))}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 hover:bg-background text-foreground shadow-md backdrop-blur-xs transition-transform hover:scale-105 cursor-pointer"
                aria-label="Next Slide"
              >
                <ChevronRight className="h-4 w-4" />
              </button>

              {/* Bottom Counter Pill */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-background/90 text-[11px] font-semibold text-foreground shadow-xs backdrop-blur-xs">
                {currentSlide + 1} / {totalSlides}
              </div>
            </div>

            {/* Thumbnail Track */}
            <div className="grid grid-cols-5 gap-1.5">
              {slideImages.map((src, idx) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setCurrentSlide(idx)}
                  className={`relative aspect-[4/5] rounded-md overflow-hidden border transition-all cursor-pointer ${
                    currentSlide === idx
                      ? 'ring-2 ring-primary border-transparent opacity-100 scale-95'
                      : 'border-border/60 opacity-60 hover:opacity-90'
                  }`}
                >
                  <img src={src} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Caption, MCP Tebar Tool Payload, and Approval Action */}
          <div className="lg:col-span-7 space-y-4">
            {/* Caption Box */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {isEn ? 'Generated Caption & Hashtags' : 'Naskah Caption & Tagar Terverifikasi'}
              </label>
              <div className="p-3.5 rounded-xl border border-border/50 bg-muted/20 text-xs sm:text-[13px] text-foreground leading-relaxed whitespace-pre-line font-sans select-text">
                {captionText}
              </div>
            </div>

            {/* Tebar.app MCP Integration Spec Card */}
            <div className="p-3.5 rounded-xl border border-border/60 bg-muted/30 space-y-2.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-foreground flex items-center gap-1.5">
                  <Send className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>{isEn ? 'Tebar.app MCP Tool Call Payload' : 'Payload Panggilan Tool MCP Tebar'}</span>
                </span>
                <span className="font-mono text-[10px] bg-muted px-1.5 py-0.5 rounded text-muted-foreground border border-border/40">
                  https://api.tebar.app/mcp
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11.5px] text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Layers className="h-3 w-3 text-foreground/70 shrink-0" />
                  <span>Tool: <strong className="text-foreground font-mono">create_post</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3 w-3 text-foreground/70 shrink-0" />
                  <span>Jadwal: <strong className="text-foreground">Kamis, 19:30 WIB</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Share2 className="h-3 w-3 text-foreground/70 shrink-0" />
                  <span>Target: <strong className="text-foreground">Instagram, Threads</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Sparkles className="h-3 w-3 text-foreground/70 shrink-0" />
                  <span>Media: <strong className="text-foreground">5 file PNG (1080x1350)</strong></span>
                </div>
              </div>
            </div>

            {/* Human-in-the-Loop Approval Action */}
            <div className="pt-2">
              <div className="p-3.5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <p className="text-xs font-semibold text-foreground">
                    {isEn ? 'Human-in-the-Loop Quality Gate' : 'Kontrol Penuh Pemilik Bisnis'}
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    {isEn
                      ? 'AI never posts without confirmation. Click Approve to dispatch to Tebar.'
                      : 'AI tidak akan posting tanpa izin Anda. Klik Setujui untuk menjadwalkan ke Tebar.'}
                  </p>
                </div>

                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 text-white font-medium text-xs shadow-xs cursor-default">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>{isEn ? 'Approve & Schedule' : 'Setujui & Jadwalkan'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Tab 2: Authentic Production Evidence from app.cuan.work */
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            {/* Screenshot 1: Task Verification Card */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-foreground flex items-center gap-1.5">
                  <FolderKanban className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>{isEn ? 'Task Card: 4/4 DoD Completed (100%)' : 'Kartu Tugas: 4/4 DoD Terverifikasi (100%)'}</span>
                </span>
                <span className="font-mono text-[10px] bg-muted px-2 py-0.5 rounded text-muted-foreground border border-border/40">
                  #A79CAF • barukopi.id
                </span>
              </div>
              <div className="rounded-xl overflow-hidden border border-border/60 bg-muted/20 shadow-xs">
                <img
                  src="/examples/social-media/cuan-task-proof-1440.png"
                  alt="Cuan Task Board Real Screenshot"
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </div>
              <p className="text-[11.5px] text-muted-foreground leading-relaxed">
                {isEn
                  ? 'Real task execution card captured from app.cuan.work showing all 4 acceptance criteria independently completed with zero visual noise, 33 validation checks passed, and full verification notes.'
                  : 'Tangkapan layar nyata dari app.cuan.work membuktikan ke-4 kriteria Definition of Done terpenuhi 100%, 33 pengujian integritas lolos, dan naskah terdokumentasi lengkap.'}
              </p>
            </div>

            {/* Screenshot 2: Empathic Project Manager Inbox */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-foreground flex items-center gap-1.5">
                  <FileText className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>{isEn ? 'Project Manager Burden Relief in Inbox' : 'Peran Project Manager Meringankan Beban User'}</span>
                </span>
                <span className="font-mono text-[10px] bg-muted px-2 py-0.5 rounded text-muted-foreground border border-border/40">
                  app.cuan.work/inbox
                </span>
              </div>
              <div className="rounded-xl overflow-hidden border border-border/60 bg-muted/20 shadow-xs">
                <img
                  src="/examples/social-media/cuan-inbox-live-1440.png"
                  alt="Cuan Inbox Real Screenshot"
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </div>
              <p className="text-[11.5px] text-muted-foreground leading-relaxed">
                {isEn
                  ? 'Zero developer cognitive fatigue: User requests "@cuan create a new project for @barukopi.id and run the task", and Cuan automatically provisions the managed brand workspace, isolates runner execution, and reports back.'
                  : 'Bebas pusing teknis: Pengguna cukup memerintahkan "@cuan buatkan project baru untuk @barukopi.id dan langsung jalankan task di atas", dan Cuan langsung menyiapkan workspace brand terisolasi serta mengorkestrasi runner sampai tuntas.'}
              </p>
            </div>
          </div>

          {/* Highlights Banner */}
          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <div className="p-1.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="h-4 w-4" />
              </div>
              <div>
                <span className="font-semibold text-foreground block">
                  {isEn ? 'Zero Synthetic Mockups • 100% Real Production Evidence' : 'Nol Mockup Palsu • 100% Bukti Nyata Produksi'}
                </span>
                <span className="text-[11px] text-muted-foreground">
                  {isEn
                    ? 'Captured authentic live session from Cuan instance connected to isolated runner nodes.'
                    : 'Diverifikasi langsung dari instance produksi Cuan yang terhubung ke node runner terisolasi.'}
                </span>
              </div>
            </div>

            <a
              href="https://app.cuan.work"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 hover:bg-primary/15 text-primary text-xs font-medium transition-colors"
            >
              <span>app.cuan.work</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
