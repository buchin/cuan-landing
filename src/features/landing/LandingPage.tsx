import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  GitBranch,
  Github,
  MessageSquare,
  Mail,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Zap,
  Volume2,
  Activity,
  Users,
  Sun,
  Moon,
  Coins,
  AlertCircle,
  Bot,
  Check,
  X,
  Minus,
  Database,
  Loader2,
  Cpu,
  Server,
  Calendar,
  ShoppingBag,
  Sparkles,
  Heart,
} from 'lucide-react'
import { CuanMark } from '../../components/brand/CuanMark'
import { ApprovalCard } from './ApprovalCard'
import { useLanguage } from '../../context/LanguageContext'
import { useTheme } from '../../context/ThemeContext'


export function LandingPage() {
  const { t, language, setPreference } = useLanguage()
  const { resolvedTheme, toggleTheme } = useTheme()

  const [email, setEmail] = useState('')
  const [waitingListStep, setWaitingListStep] = useState<'email' | 'confirmed'>('email')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [showGithubModal, setShowGithubModal] = useState(false)
  const emailInputRef = useRef<HTMLInputElement>(null)

  const scrollToWaitingList = () => {
    setShowGithubModal(false)
    const el = document.getElementById('waiting-list')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      setTimeout(() => {
        emailInputRef.current?.focus()
      }, 400)
    }
  }

  const handleJoinWaitingList = async (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = email.trim()
    if (!trimmed || !trimmed.includes('@')) {
      setFormError(t('Masukkan alamat email yang valid.'))
      return
    }

    setIsSubmitting(true)
    setFormError(null)

    try {
      const res = await fetch('/api/waiting-list', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed, source: 'hero_waiting_list' }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || data.message || t('Gagal mendaftar waiting list. Coba lagi sebentar lagi.'))
      }

      setWaitingListStep('confirmed')
    } catch (err: any) {
      setFormError(err.message || t('Terjadi gangguan jaringan saat mendaftar waiting list.'))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-dvh bg-background text-foreground">
      {/* Navigation Header */}
      <header className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-6 sm:px-8">
        <Link
          to="/"
          className="inline-flex min-h-11 items-center gap-2 font-medium tracking-tight"
          aria-label="Cuan"
        >
          <CuanMark decorative className="h-7 w-7" />
          <span className="font-display text-xl font-bold tracking-tight text-foreground">
            cuan
          </span>
        </Link>
        <nav
          aria-label={t('Website navigation')}
          className="flex items-center gap-2 sm:gap-4"
        >
          <a
            href="#problem"
            className="hidden min-h-11 items-center px-2 text-sm text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap sm:inline-flex"
          >
            {t('Masalah')}
          </a>
          <a
            href="#how-it-works"
            className="hidden min-h-11 items-center px-2 text-sm text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap sm:inline-flex"
          >
            {t('Cara kerja')}
          </a>
          <a
            href="#features"
            className="hidden min-h-11 items-center px-2 text-sm text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap sm:inline-flex"
          >
            {t('Fitur')}
          </a>
          <Link
            to="/sponsor"
            className="hidden min-h-11 items-center px-2 text-sm text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap lg:inline-flex"
          >
            {t('Sponsor')}
          </Link>
          <button
            type="button"
            onClick={() => setShowGithubModal(true)}
            className="inline-flex min-h-9 items-center gap-1.5 rounded-md border border-border/50 bg-muted/30 px-2.5 text-xs font-medium text-muted-foreground hover:bg-accent/50 hover:text-foreground transition-colors cursor-pointer whitespace-nowrap"
            title="GitHub Repository"
          >
            <Github className="h-3.5 w-3.5" strokeWidth={1.5} />
            <span className="hidden sm:inline">GitHub</span>
          </button>

          {/* Language Switcher */}
          <button
            type="button"
            onClick={() => setPreference(language === 'id' ? 'en' : 'id')}
            className="inline-flex min-h-9 items-center justify-center rounded-md border border-border/50 bg-muted/30 px-2.5 text-xs font-medium text-muted-foreground hover:bg-accent/50 hover:text-foreground transition-colors shrink-0 cursor-pointer"
            title={language === 'id' ? 'Ganti ke English' : 'Switch to Bahasa Indonesia'}
          >
            {language === 'id' ? 'ID' : 'EN'}
          </button>

          {/* Theme Switcher */}
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border/50 bg-muted/30 text-muted-foreground hover:bg-accent/50 hover:text-foreground transition-colors shrink-0 cursor-pointer"
            aria-label="Ganti tema"
            title={resolvedTheme === 'dark' ? 'Tema terang' : 'Tema gelap'}
          >
            {resolvedTheme === 'dark' ? (
              <Sun className="h-4 w-4" strokeWidth={1.5} />
            ) : (
              <Moon className="h-4 w-4" strokeWidth={1.5} />
            )}
          </button>
        </nav>
      </header>

      <main>
        {/* 1. HOOK / HERO SECTION (Above the fold on standard MacBook 1440x900) */}
        <section
          className="relative mx-auto max-w-6xl px-6 pb-12 pt-8 text-center sm:px-8 sm:pb-16 sm:pt-12"
          aria-labelledby="landing-title"
        >
          <div className="mx-auto max-w-3xl">
            <h1
              id="landing-title"
              className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:leading-[1.1]"
            >
              {t('Chat. Setujui. Beres.')}
            </h1>
            <p className="mt-4 text-base font-normal text-muted-foreground sm:text-lg md:text-xl leading-relaxed">
              {t('Kelola bisnis tanpa pusing urusan teknis.')}
            </p>

            {/* Waiting List Form & Sponsorship CTA */}
            <div id="waiting-list" className="mt-8 max-w-lg mx-auto scroll-mt-24">
              {waitingListStep === 'email' && (
                <div className="space-y-3">
                  <form onSubmit={handleJoinWaitingList} className="flex flex-col sm:flex-row gap-2.5">
                    <input
                      ref={emailInputRef}
                      type="email"
                      required
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        setFormError(null)
                      }}
                      placeholder={t('Masukkan email Anda...')}
                      aria-label={t('Email untuk waiting list')}
                      className="min-h-12 flex-1 rounded-xl border border-border/70 bg-card px-4 text-base text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary shadow-2xs transition-colors"
                      disabled={isSubmitting}
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="action-primary min-h-12 px-6 text-base font-semibold shadow-xs shrink-0 inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>{t('Mendaftarkan...')}</span>
                        </>
                      ) : (
                        <>
                          <span>{t('Gabung Waiting List')}</span>
                          <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                        </>
                      )}
                    </button>
                  </form>
                  {formError && (
                    <p className="text-xs text-rose-500 font-medium text-center">{formError}</p>
                  )}
                  <p className="text-xs text-muted-foreground text-center inline-flex items-center justify-center gap-1.5 w-full">
                    <Lock className="h-3.5 w-3.5 text-muted-foreground/80 shrink-0" strokeWidth={1.5} />
                    <span>{t('Gratis · Tanpa kartu kredit · Prioritas rilis v1.0 & akses repositori')}</span>
                  </p>
                </div>
              )}

              {waitingListStep === 'confirmed' && (
                <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 dark:bg-emerald-500/10 p-5 sm:p-6 text-left space-y-4 shadow-xs">
                  <div className="flex items-center gap-2.5 text-emerald-600 dark:text-emerald-400 font-bold text-base sm:text-lg">
                    <CheckCircle2 className="h-5 w-5 shrink-0" strokeWidth={2} />
                    <span>{t('Posisi Anda di Waiting List Cuan v1.0 Resmi Terdaftar!')}</span>
                  </div>
                  <p className="text-sm text-foreground/90 leading-relaxed">
                    {t('Email Anda telah tercatat.')} {t('Kami telah menambahkan')}{' '}
                    <span className="font-semibold text-foreground">{email}</span> {t('ke antrean prioritas rilis v1.0. Notifikasi peluncuran resmi dan akses repositori akan dikirimkan langsung ke inbox Anda.')}
                  </p>

                  <div className="rounded-xl border border-border/70 bg-card p-4 sm:p-5 space-y-2.5">
                    <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary uppercase tracking-wider">
                      <Sparkles className="h-3.5 w-3.5" />
                      <span>{t('Akselerasi Peluncuran')}</span>
                    </div>
                    <div className="font-display text-base sm:text-lg font-bold text-foreground">
                      {t('Ingin akses VIP pertama & ikut mempercepat peluncuran Cuan?')}
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {t('Jadilah Founding Sponsor untuk mendapatkan akses early-build, logo & tautan permanen di repositori GitHub & landing page, serta sesi konsultasi instalasi VPS.')}
                    </p>
                    <div className="pt-2 flex flex-wrap items-center gap-3">
                      <Link
                        to="/sponsor"
                        className="action-primary min-h-10 px-5 text-xs sm:text-sm font-semibold inline-flex items-center gap-2"
                      >
                        <span>{t('Lihat Halaman Sponsor & Benefit')}</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => {
                          setWaitingListStep('email')
                          setEmail('')
                          setFormError(null)
                        }}
                        className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-2 transition-colors cursor-pointer"
                      >
                        {t('Daftarkan email lain')}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Centered 3-Device Mockup Showcase - Optimized Above the Fold */}
          <div className="mx-auto mt-8 max-w-4xl sm:mt-10">
            <div className="relative">
              <img
                src="/landing/cuan.webp"
                alt={t('Cuan multi-device workspace on Laptop, Tablet, and Mobile')}
                width={2000}
                height={1088}
                className="max-h-[480px] w-full object-contain [filter:drop-shadow(0_16px_36px_rgba(0,0,0,0.08))_drop-shadow(0_4px_12px_rgba(0,0,0,0.03))]"
                loading="eager"
              />
            </div>
          </div>

          {/* Trust Highlights */}
          <div className="mx-auto mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs sm:text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4" strokeWidth={1.5} />
              {t('Open source under Apache-2.0')}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <GitBranch className="h-4 w-4" strokeWidth={1.5} />
              {t('Self-hosted on your own VPS')}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Zap className="h-4 w-4" strokeWidth={1.5} />
              {t('Bebas biaya token dobel · Bawa akun resmi atau API key sendiri (Claude, ChatGPT, Gemini, DeepSeek)')}
            </span>
          </div>
        </section>

        {/* 2. THE REAL BUSINESS & AI BOTTLENECKS (Consolidated) */}
        <section
          id="problem"
          className="scroll-mt-6 border-t border-border/60 bg-muted/20 px-6 py-16 sm:px-8 sm:py-24"
          aria-labelledby="problem-title"
        >
          <div className="mx-auto max-w-6xl">
            <div className="max-w-3xl">
              <div className="mb-3.5 inline-flex items-center gap-2 text-sm sm:text-[15px] font-semibold text-foreground/80">
                <AlertCircle className="h-4 w-4 text-amber-500/90" strokeWidth={1.5} />
                <span>{t('Tantangan Pebisnis & Kreator')}</span>
              </div>
              <h2
                id="problem-title"
                className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl"
              >
                {t('Punya segudang ide bisnis, tapi sering mentok di urusan teknis?')}
              </h2>
              <p className="mt-3 text-base sm:text-lg leading-relaxed text-muted-foreground">
                {t(
                  'Banyak pebisnis mencoba sewa programmer, langganan SaaS mahal, hingga utak-atik AI terbaru—namun tetap berakhir pusing dan kehilangan waktu jualan.',
                )}
              </p>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  Icon: Coins,
                  title: 'Sewa tim mahal, ngulik sendiri burnout',
                  desc: 'Gaji jutaan rupiah per bulan dan antrean berminggu-minggu bahkan untuk revisi kecil. Mencoba koding sendiri, seharian habis membaca tutorial dan error log alih-alih fokus jualan.',
                },
                {
                  Icon: Bot,
                  title: 'Chatbot AI cuma ngasih teks, eksekusi tetap manual',
                  desc: 'ChatGPT dan Claude hebat untuk drafting ide, tapi mereka cuma memberi resep dan potongan kode. Anda tetap harus manual copy-paste, menyatukan webhook, dan tebak-tebak errornya sendiri.',
                },
                {
                  Icon: Activity,
                  title: 'Asisten personal (Hermes, Muse) belum siap untuk bisnis',
                  desc: 'Lagi tren di kalangan kreator untuk riset pribadi atau ngobrol di Telegram, tapi belum siap untuk operasional bisnis—tanpa rem Approval Card terstruktur, tanpa verifikasi visual, dan tanpa Inbox chat pelanggan.',
                },
              ].map(({ Icon, title, desc }) => (
                <div
                  key={title}
                  className="rounded-xl border border-border/60 bg-card p-6 shadow-2xs transition-colors hover:border-border/80"
                >
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-muted/60 text-muted-foreground">
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </div>
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

        {/* 3. SOLUTION & PROCESS SECTION (S-P in PAS-P / StoryBrand 3-Step) */}
        <section
          id="how-it-works"
          className="scroll-mt-6 border-t border-border/60 px-6 py-16 sm:px-8 sm:py-24"
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
                {t('Kenalkan Cuan: AI Project Manager Siap Kerja Tanpa Pengawasan')}
              </h2>
              <p className="mt-3 text-base sm:text-lg leading-relaxed text-muted-foreground">
                {t(
                  'Anda bertindak sebagai owner yang memberi instruksi lewat chat santai. Cuan bekerja sebagai Agentic Project Manager yang menyusun rencana, mengotomasi alur operasional bisnis, menghubungkan tools lewat MCP, hingga deploy di server Anda sendiri sampai tuntas terverifikasi.',
                )}
              </p>
            </div>

            <ol className="mt-12 grid gap-8 lg:grid-cols-3">
              {/* STEP 01: CHAT */}
              <li className="flex flex-col justify-between rounded-xl border border-border/50 bg-card p-6 shadow-2xs">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-muted-foreground tabular-nums">
                      01
                    </span>
                    <span className="rounded-md bg-muted/60 px-2.5 py-0.5 text-xs font-semibold text-muted-foreground">
                      Chat
                    </span>
                  </div>
                  <h3 className="font-display mt-4 text-lg font-bold leading-snug">
                    {t('Describe what you need in plain words')}
                  </h3>
                  <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-muted-foreground">
                    {t(
                      'Start in Chat from your phone or desktop. Share an operational goal, customer support workflow, financial receipt, or web feature. Cuan analyzes your context automatically.',
                    )}
                  </p>
                </div>

                {/* Real Cuan Chat Preview */}
                <div className="mt-6 rounded-xl border border-border/60 bg-muted/20 p-4 text-left text-xs space-y-3">
                  <div className="flex items-center justify-between border-b border-border/40 pb-2">
                    <div className="flex items-center gap-1.5 font-medium text-foreground">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      <span className="font-semibold text-xs">@cuan</span>
                      <span className="text-[10px] text-muted-foreground font-mono">Project Manager</span>
                    </div>
                    <span className="text-[10px] text-muted-foreground font-mono">{t('Baru saja')}</span>
                  </div>
                  <div className="space-y-2.5">
                    <div className="rounded-lg bg-card p-3 border border-border/50 shadow-2xs">
                      <div className="text-[10px] font-semibold text-muted-foreground mb-1 flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                        {t('Anda (Owner)')}
                      </div>
                      <p className="text-foreground leading-relaxed">
                        &ldquo;{t('Tolong hubungkan webhook form order ke live chat pelanggan dan rekap mutasi otomatis.')}&rdquo;
                      </p>
                    </div>
                    <div className="rounded-lg bg-primary/5 dark:bg-primary/10 p-3 border border-primary/20">
                      <div className="text-[10px] font-semibold text-primary mb-1 flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        @cuan
                      </div>
                      <p className="text-foreground/90 leading-relaxed text-[11px]">
                        {t('Siap! Konteks alur kerja dan webhook terbaca. 3 tugas masuk antrean otomatis. Saya siapkan Approval Card rencana kerja dan kriteria pengujian sebelum eksekusi.')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-border/30 text-[10px] text-muted-foreground font-mono">
                    <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                      <span>{t('Antrean: 1 aktif · 2 menunggu')}</span>
                    </span>
                    <span className="rounded-md bg-muted/80 px-2 py-0.5 text-muted-foreground font-sans text-[11px]">
                      {t('Draft Approval Card')} &rarr;
                    </span>
                  </div>
                </div>
              </li>

              {/* STEP 02: APPROVAL CARD */}
              <li className="flex flex-col justify-between rounded-xl border border-border/50 bg-card p-6 shadow-2xs">
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
                    {t('Review and approve a clear plan')}
                  </h3>
                  <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-muted-foreground">
                    {t(
                      'Before touching anything, Cuan presents a structured Approval Card outlining the work scope, connected MCP tools, and definition of done verification criteria. One tap to approve.',
                    )}
                  </p>
                </div>

                {/* Real ApprovalCard Component from Cuan */}
                <div className="mt-6 text-left">
                  <ApprovalCard
                    plan={{
                      title: t('Integrasi Webhook Pesanan & CRM Kontak'),
                      project_name: 'cuan-workspace',
                      description: `- ${t('Pasang webhook pesanan otomatis ke sistem secara aman')}\n- ${t('Sinkronkan nomor kontak & catatan riwayat pelanggan')}\n- ${t('Pengujian otomatis & verifikasi visual 100% tuntas')}`,
                    }}
                    disabled={false}
                    onApprove={() => {}}
                    className="mt-0 pointer-events-none select-none shadow-none"
                  />
                </div>
              </li>

              {/* STEP 03: BERES */}
              <li className="flex flex-col justify-between rounded-xl border border-border/50 bg-card p-6 shadow-2xs">
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
                    {t('Verified outcomes delivered to your server')}
                  </h3>
                  <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-muted-foreground">
                    {t(
                      'Cuan executes the approved plan autonomously, connects the necessary tools, verifies Definition of Done criteria, and reports back via an authentic Task Card with 100% proof.',
                    )}
                  </p>
                </div>

                {/* Authentic Verified Task Result Card */}
                <div className="mt-6 rounded-xl border border-border/60 bg-muted/20 p-4 text-left text-xs space-y-3">
                  <div className="flex items-center justify-between border-b border-border/40 pb-2">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" strokeWidth={1.5} />
                      <span className="font-semibold text-xs text-foreground">
                        {t('Status: Selesai')}
                      </span>
                    </div>
                    <span className="rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 px-2 py-0.5 text-[11px] font-medium">
                      ✓ {t('100% Teruji')}
                    </span>
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-muted-foreground">
                      {t('Hasil Eksekusi')}
                    </div>
                    <div className="font-semibold text-foreground text-sm mt-0.5">
                      {t('Webhook Live Chat & Mutasi Berhasil Aktif')}
                    </div>
                  </div>
                  <div className="rounded-lg bg-card p-3 border border-border/50 shadow-2xs space-y-2 text-[11px] text-foreground/90">
                    <div className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                      {t('Bukti Kualitas (Quality Gate):')}
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" strokeWidth={1.5} />
                      <span>{t('4 pengujian otomatis lulus tanpa error')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" strokeWidth={1.5} />
                      <span>{t('Bukti visual tangkapan layar terverifikasi')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" strokeWidth={1.5} />
                      <span>{t('Deploy aman ke VPS tanpa downtime')}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-border/30 text-[10px] text-muted-foreground font-mono">
                    <span>#task_94a2f</span>
                    <span className="text-primary font-sans font-medium text-[11px]">
                      {t('Laporan Terverifikasi')} &rarr;
                    </span>
                  </div>
                </div>
              </li>
            </ol>
          </div>
        </section>

        {/* 3.5. COMPARISON SECTION (Why Cuan is Different) */}
        <section
          id="comparison"
          className="scroll-mt-6 border-t border-border/60 bg-muted/10 px-6 py-16 sm:px-8 sm:py-24"
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
                {t(
                  'Perbandingan faktual antara Chatbot percakapan (Claude, ChatGPT, Gemini), Tool Koding (OpenCode, Claude Code, Antigravity), Asisten Personal (Hermes, Muse), dan Cuan.',
                )}
              </p>
            </div>

            {/* DESKTOP TABLE VIEW (hidden sm:block) */}
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
                        (OpenCode, Claude Code, Antigravity)
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
                  {[
                    {
                      label: 'Lingkungan eksekusi',
                      desc: 'Di mana tugas benar-benar dijalankan',
                      chatbot: { icon: 'x', text: 'Cloud vendor (terisolasi dari VPS)' },
                      coder: { icon: 'warn', text: 'Terminal laptop lokal / software koding' },
                      hermes: { icon: 'warn', text: 'Mesin lokal / cloud vendor' },
                      cuan: { icon: 'check', text: 'Server VPS 24/7 mandiri' },
                    },
                    {
                      label: 'Antrean banyak tugas (Multi-task)',
                      desc: 'Memproses banyak instruksi tanpa ditunggui',
                      chatbot: { icon: 'x', text: 'Prompt manual 1 per 1' },
                      coder: { icon: 'warn', text: 'Wajib ditungguin di terminal' },
                      hermes: { icon: 'warn', text: 'Single-task / laptop aktif' },
                      cuan: { icon: 'check', text: 'Antrean otonom 24/7 di server' },
                    },
                    {
                      label: 'Antarmuka & kemudahan pakai',
                      desc: 'Kenyamanan akses untuk tim non-teknis',
                      chatbot: { icon: 'warn', text: 'Chat teks percakapan' },
                      coder: { icon: 'x', text: 'Wajib terminal hitam & git' },
                      hermes: { icon: 'warn', text: 'Desktop app personal & CLI' },
                      cuan: { icon: 'check', text: 'Web & Mobile tenang (ramah non-teknis)' },
                    },
                    {
                      label: 'Rem pengaman persetujuan',
                      desc: 'Kontrol manusia sebelum aksi menyentuh sistem',
                      chatbot: { icon: 'x', text: 'Tidak ada (hanya saran teks)' },
                      coder: { icon: 'warn', text: 'Prompt teks terminal [y/n]' },
                      hermes: { icon: 'warn', text: 'Prompt izin ad-hoc per aksi' },
                      cuan: { icon: 'check', text: 'Approval Card 1-Tap terstruktur' },
                    },
                    {
                      label: 'Quality Gate & verifikasi selesai',
                      desc: 'Pembuktian nyata sebelum tugas dianggap tuntas',
                      chatbot: { icon: 'x', text: 'Tidak ada pengujian sistem' },
                      coder: { icon: 'warn', text: 'Testing kode programmer' },
                      hermes: { icon: 'warn', text: 'Evaluasi internal bot' },
                      cuan: { icon: 'check', text: 'Bukti visual + tes otomatis tuntas' },
                    },
                    {
                      label: 'Alat operasional bisnis (Live Chat/CRM)',
                      desc: 'Integrasi live chat pelanggan dan database kontak',
                      chatbot: { icon: 'x', text: 'Tidak ada' },
                      coder: { icon: 'x', text: 'Tidak ada' },
                      hermes: { icon: 'warn', text: 'Personal agent (tanpa CRM/Inbox)' },
                      cuan: { icon: 'check', text: 'Inbox Live Chat & CRM Kontak' },
                    },
                    {
                      label: 'Model biaya token AI',
                      desc: 'Struktur biaya pemakaian kecerdasan buatan',
                      chatbot: { icon: 'x', text: 'Langganan per akun ($20/bln)' },
                      coder: { icon: 'warn', text: 'Langganan / API developer' },
                      hermes: { icon: 'warn', text: 'Bayar API per pemakaian' },
                      cuan: { icon: 'check', text: 'Bebas dobel biaya (pakai akun resmi sendiri)' },
                    },
                  ].map((row, idx, arr) => (
                    <tr key={row.label} className="hover:bg-muted/30 transition-colors">
                      <td className="py-3.5 pr-4 font-semibold text-foreground">
                        {t(row.label)}
                      </td>
                      <td className="px-3 py-3.5 text-center text-muted-foreground">
                        <div className="flex flex-col items-center gap-1">
                          {row.chatbot.icon === 'check' && <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400" strokeWidth={1.5} />}
                          {row.chatbot.icon === 'warn' && <Minus className="h-4 w-4 text-amber-500/70" strokeWidth={1.5} />}
                          {row.chatbot.icon === 'x' && <X className="h-4 w-4 text-muted-foreground/40" strokeWidth={1.5} />}
                          <span className="text-xs sm:text-sm leading-tight">{t(row.chatbot.text)}</span>
                        </div>
                      </td>
                      <td className="px-3 py-3.5 text-center text-muted-foreground">
                        <div className="flex flex-col items-center gap-1">
                          {row.coder.icon === 'check' && <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400" strokeWidth={1.5} />}
                          {row.coder.icon === 'warn' && <Minus className="h-4 w-4 text-amber-500/70" strokeWidth={1.5} />}
                          {row.coder.icon === 'x' && <X className="h-4 w-4 text-muted-foreground/40" strokeWidth={1.5} />}
                          <span className="text-xs sm:text-sm leading-tight">{t(row.coder.text)}</span>
                        </div>
                      </td>
                      <td className="px-3 py-3.5 text-center text-muted-foreground">
                        <div className="flex flex-col items-center gap-1">
                          {row.hermes.icon === 'check' && <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400" strokeWidth={1.5} />}
                          {row.hermes.icon === 'warn' && <Minus className="h-4 w-4 text-amber-500/70" strokeWidth={1.5} />}
                          {row.hermes.icon === 'x' && <X className="h-4 w-4 text-muted-foreground/40" strokeWidth={1.5} />}
                          <span className="text-xs sm:text-sm leading-tight">{t(row.hermes.text)}</span>
                        </div>
                      </td>
                      <td className={`px-3 py-3.5 text-center bg-primary/5 dark:bg-primary/10 border-x border-border/50 ${idx === arr.length - 1 ? 'border-b rounded-b-lg' : ''}`}>
                        <div className="flex flex-col items-center gap-1 font-semibold text-foreground">
                          {row.cuan.icon === 'check' && <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400" strokeWidth={1.5} />}
                          {row.cuan.icon === 'warn' && <Minus className="h-4 w-4 text-amber-500/70" strokeWidth={1.5} />}
                          {row.cuan.icon === 'x' && <X className="h-4 w-4 text-muted-foreground/40" strokeWidth={1.5} />}
                          <span className="text-xs sm:text-sm leading-tight text-foreground font-semibold">{t(row.cuan.text)}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* MOBILE CARD VIEW (block sm:hidden) - Zero Horizontal Scroll, High Ergonomics */}
            <div className="mt-8 space-y-4 sm:hidden">
              {[
                {
                  label: 'Lingkungan eksekusi',
                  desc: 'Di mana tugas benar-benar dijalankan',
                  chatbot: { icon: 'x', text: 'Cloud vendor (terisolasi dari VPS)' },
                  coder: { icon: 'warn', text: 'Terminal laptop lokal / software koding' },
                  hermes: { icon: 'warn', text: 'Mesin lokal / cloud vendor (Meta)' },
                  cuan: { icon: 'check', text: 'Server VPS 24/7 mandiri' },
                },
                {
                  label: 'Antrean banyak tugas (Multi-task)',
                  desc: 'Memproses banyak instruksi tanpa ditunggui',
                  chatbot: { icon: 'x', text: 'Prompt manual 1 per 1' },
                  coder: { icon: 'warn', text: 'Wajib ditungguin di terminal' },
                  hermes: { icon: 'warn', text: 'Single-task / laptop aktif' },
                  cuan: { icon: 'check', text: 'Antrean otonom 24/7 di server' },
                },
                {
                  label: 'Antarmuka & kemudahan pakai',
                  desc: 'Kenyamanan akses untuk tim non-teknis',
                  chatbot: { icon: 'warn', text: 'Chat teks percakapan' },
                  coder: { icon: 'x', text: 'Wajib terminal hitam & git' },
                  hermes: { icon: 'warn', text: 'Desktop app personal & CLI' },
                  cuan: { icon: 'check', text: 'Web & Mobile tenang (ramah non-teknis)' },
                },
                {
                  label: 'Rem pengaman persetujuan',
                  desc: 'Kontrol manusia sebelum aksi menyentuh sistem',
                  chatbot: { icon: 'x', text: 'Tidak ada (hanya saran teks)' },
                  coder: { icon: 'warn', text: 'Prompt teks terminal [y/n]' },
                  hermes: { icon: 'warn', text: 'Prompt izin ad-hoc per aksi' },
                  cuan: { icon: 'check', text: 'Approval Card 1-Tap terstruktur' },
                },
                {
                  label: 'Quality Gate & verifikasi selesai',
                  desc: 'Pembuktian nyata sebelum tugas dianggap tuntas',
                  chatbot: { icon: 'x', text: 'Tidak ada pengujian sistem' },
                  coder: { icon: 'warn', text: 'Testing kode programmer' },
                  hermes: { icon: 'warn', text: 'Evaluasi internal bot' },
                  cuan: { icon: 'check', text: 'Bukti visual + tes otomatis tuntas' },
                },
                {
                  label: 'Alat operasional bisnis (Live Chat/CRM)',
                  desc: 'Integrasi live chat pelanggan dan database kontak',
                  chatbot: { icon: 'x', text: 'Tidak ada' },
                  coder: { icon: 'x', text: 'Tidak ada' },
                  hermes: { icon: 'warn', text: 'Personal agent (tanpa CRM/Inbox)' },
                  cuan: { icon: 'check', text: 'Inbox Live Chat & CRM Kontak' },
                },
                {
                  label: 'Model biaya token AI',
                  desc: 'Struktur biaya pemakaian kecerdasan buatan',
                  chatbot: { icon: 'x', text: 'Langganan per akun ($20/bln)' },
                  coder: { icon: 'warn', text: 'Langganan / API developer' },
                  hermes: { icon: 'warn', text: 'Bayar API per pemakaian' },
                  cuan: { icon: 'check', text: 'Bebas dobel biaya (pakai akun resmi sendiri)' },
                },
              ].map((row) => (
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
                        {row.chatbot.icon === 'check' && <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" strokeWidth={1.5} />}
                        {row.chatbot.icon === 'warn' && <Minus className="h-3.5 w-3.5 text-amber-500/80" strokeWidth={1.5} />}
                        {row.chatbot.icon === 'x' && <X className="h-3.5 w-3.5 text-muted-foreground/40" strokeWidth={1.5} />}
                        <span>{t(row.chatbot.text)}</span>
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-muted-foreground">
                      <span className="text-xs">
                        {t('Tool Koding')} <span className="text-[11px] text-muted-foreground/75">(OpenCode, Claude Code, Antigravity)</span>
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-foreground">
                        {row.coder.icon === 'check' && <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" strokeWidth={1.5} />}
                        {row.coder.icon === 'warn' && <Minus className="h-3.5 w-3.5 text-amber-500/80" strokeWidth={1.5} />}
                        {row.coder.icon === 'x' && <X className="h-3.5 w-3.5 text-muted-foreground/40" strokeWidth={1.5} />}
                        <span>{t(row.coder.text)}</span>
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-muted-foreground">
                      <span className="text-xs">
                        {t('Asisten Personal')} <span className="text-[11px] text-muted-foreground/75">(Hermes, Muse)</span>
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-foreground">
                        {row.hermes.icon === 'check' && <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" strokeWidth={1.5} />}
                        {row.hermes.icon === 'warn' && <Minus className="h-3.5 w-3.5 text-amber-500/80" strokeWidth={1.5} />}
                        {row.hermes.icon === 'x' && <X className="h-3.5 w-3.5 text-muted-foreground/40" strokeWidth={1.5} />}
                        <span>{t(row.hermes.text)}</span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. PROOF & SUPERPOWERS SECTION (P in PAS-P) */}
        <section
          id="features"
          className="scroll-mt-6 border-t border-border/60 bg-muted/20 px-6 py-16 sm:px-8 sm:py-24"
          aria-labelledby="features-title"
        >
          <div className="mx-auto max-w-6xl">
            <div className="max-w-2xl">
              <h2
                id="features-title"
                className="font-display text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl text-foreground"
              >
                {t('Tetap memegang kendali penuh, tanpa pusing urusan teknis')}
              </h2>
              <p className="mt-3 text-base sm:text-lg leading-relaxed text-muted-foreground">
                {t(
                  'Tujuan dan keputusan bisnis Anda yang memimpin arah kerja. Cuan mengurus detail teknis dan membuktikan hasil kerjanya secara transparan.',
                )}
              </p>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  Icon: ShieldCheck,
                  title: 'Approval stays with you',
                  text: 'Review the plan before work starts. Get a clear account of changes, checks, and evidence before any code is published.',
                },
                {
                  Icon: Coins,
                  title: 'Bebas biaya dobel token AI',
                  text: 'Jalankan langganan resmi Anda (Claude Pro, ChatGPT Plus, Gemini) atau bawa API key sendiri (DeepSeek, OpenAI) tanpa markup token bulanan.',
                },
                {
                  Icon: CheckCircle2,
                  title: 'Autonomous Definition of Done loop',
                  text: 'Built-in quality gate runs targeted tests and verifies real component outputs automatically before marking any task complete.',
                },
                {
                  Icon: MessageSquare,
                  title: 'Inbox live chat pelanggan terpadu',
                  text: 'Kelola percakapan pelanggan dari widget live chat web dalam satu alur tenang, lengkap dengan catatan bisik privat untuk operator.',
                },
                {
                  Icon: Users,
                  title: 'Kolaborasi Tim & Undangan Staf via Email',
                  text: 'Undang staf dan admin dengan mudah via tautan email. Hak akses bertingkat Owner vs Member menjaga kredensial AI dan data sensitif tetap aman.',
                },
                {
                  Icon: Database,
                  title: 'CRM Kontak & Memori Bisnis Terpadu',
                  text: 'Database pelanggan terintegrasi dengan tag prospek (leads) dan riwayat percakapan. Cuan mengingat profil bisnis Anda untuk setiap respon cerdas agen.',
                },
                {
                  Icon: Mail,
                  title: 'Resend email alerts & idle chat transcripts.',
                  text: 'Never lose a customer lead. Automatically receive responsive email digests via Resend when live chat inquiries are unread or idle (>5-10m).',
                },
                {
                  Icon: Volume2,
                  title: 'Background audio chime & tab notifications.',
                  text: 'Harmonic Web Audio chime synthesizes subtle sound cues and dynamic browser tab badges when tasks finish in the background, with zero-friction silent autoplay fallback.',
                },
                {
                  Icon: Activity,
                  title: 'Worker observability & queue health.',
                  text: 'Monitor your cuan-runner daemon health, queue depth, and heartbeat directly in Settings with crystal-clear visual status indicators and zero terminal complexity.',
                },
              ].map(({ Icon, title, text }) => (
                <div key={title} className="rounded-xl border border-border/60 bg-card p-6 shadow-2xs transition-colors hover:border-border/80">
                  <Icon className="mb-3.5 h-5 w-5 text-muted-foreground" strokeWidth={1.5} />
                  <h3 className="text-base font-bold text-foreground">{t(title)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {t(text)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4.5. OPEN ECOSYSTEM & MCP INTEGRATION */}
        <section
          id="ecosystem"
          className="scroll-mt-6 border-t border-border/60 bg-muted/10 px-6 py-16 sm:px-8 sm:py-24"
          aria-labelledby="ecosystem-title"
        >
          <div className="mx-auto max-w-6xl">
            <div className="max-w-3xl">
              <div className="mb-3.5 inline-flex items-center gap-2 text-sm sm:text-[15px] font-semibold text-foreground/80">
                <Cpu className="h-4 w-4 text-primary" strokeWidth={1.5} />
                <span>
                  {language === 'id'
                    ? 'Ekosistem Terbuka & Integrasi MCP'
                    : 'Open Ecosystem & MCP Integrations'}
                </span>
              </div>
              <h2
                id="ecosystem-title"
                className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl"
              >
                {language === 'id'
                  ? 'Bebas Hubungkan Software Bisnis Apa Pun Lewat MCP'
                  : 'Connect Any Business Tool Freely via Open MCP'}
              </h2>
              <p className="mt-3 text-base sm:text-lg leading-relaxed text-muted-foreground">
                {language === 'id'
                  ? 'Cuan mengadopsi standar terbuka Model Context Protocol (MCP). Dari manajemen sosmed, server hosting, checkout e-commerce, hingga database internal—semua bisa dioperasikan agen cukup lewat chat tanpa batas vendor.'
                  : 'Cuan is built entirely on the open Model Context Protocol (MCP) standard. From social media, server hosting, and e-commerce checkouts to internal databases—your agents operate everything in plain words without vendor lock-in.'}
              </p>
            </div>

            {/* 3 MCP Examples Grid */}
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {(language === 'id'
                ? [
                    {
                      Icon: Calendar,
                      category: 'Konten & Media Sosial',
                      prompt: '“Cuan, jadwalkan postingan promo ke Instagram & X”',
                      title: 'Tebar.app MCP',
                      desc: 'Agen meriset tren, menulis draf copy promosi, dan langsung mengatur jadwal postingan di media sosial tanpa repot bolak-balik aplikasi.',
                    },
                    {
                      Icon: Server,
                      category: 'Hosting & Server VPS',
                      prompt: '“Cuan, cek utilisasi RAM dan backup server VPS”',
                      title: 'IDCloudHost MCP',
                      desc: 'Agen memantau performa VPS, mengelola domain, dan memastikan server infrastruktur bisnis Anda terus aktif lancar 24/7 tanpa menyentuh terminal.',
                    },
                    {
                      Icon: ShoppingBag,
                      category: 'Penjualan & Form Order',
                      prompt: '“Cuan, rekap pesanan baru dan sinkronkan leads”',
                      title: 'Scalev MCP',
                      desc: 'Agen menarik data pesanan baru dari checkout Scalev, menyinkronkan kontak leads pembeli, dan siap membalas pertanyaan calon pelanggan di live chat 24/7.',
                    },
                  ]
                : [
                    {
                      Icon: Calendar,
                      category: 'Social Media Scheduling',
                      prompt: '“Cuan, schedule promotional posts to X & LinkedIn”',
                      title: 'Postiz MCP',
                      desc: 'Agents research trending topics, draft promotional copy, and schedule multi-platform posts automatically without manual copy-paste.',
                    },
                    {
                      Icon: Server,
                      category: 'Cloud Hosting & Infrastructure',
                      prompt: '“Cuan, check server RAM usage and run backup”',
                      title: 'Hetzner Cloud MCP',
                      desc: 'Agents inspect VPS health, manage networking, and keep your self-hosted infrastructure running fast and secure 24/7 with zero terminal complexity.',
                    },
                    {
                      Icon: ShoppingBag,
                      category: 'E-Commerce Orders & Payments',
                      prompt: '“Cuan, sync incoming orders and update leads”',
                      title: 'Shopify & Stripe MCP',
                      desc: 'Agents retrieve incoming customer orders, sync lead data, and answer shopper questions in 24/7 live chat with full purchase history context.',
                    },
                  ]
              ).map(({ Icon, category, prompt, title, desc }) => (
                <div
                  key={title}
                  className="rounded-xl border border-border/60 bg-card p-6 shadow-2xs transition-colors hover:border-border/80 flex flex-col justify-between"
                >
                  <div>
                    <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-muted/60 text-muted-foreground">
                      <Icon className="h-5 w-5" strokeWidth={1.5} />
                    </div>

                    <div className="text-xs font-semibold text-primary mb-1 uppercase tracking-wider">
                      {category}
                    </div>
                    <h3 className="font-display text-lg font-bold text-foreground">
                      {title}
                    </h3>

                    {/* Chat Prompt Bubble */}
                    <div className="my-3.5 rounded-lg border border-border/50 bg-muted/30 px-3 py-2 text-xs font-mono text-foreground/90 flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                      <span className="truncate">{prompt}</span>
                    </div>

                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Model AI resmi highlight banner */}
            <div className="mt-8 rounded-xl border border-border/60 bg-card p-5 sm:p-6 shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Bot className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-foreground">
                    {language === 'id'
                      ? 'Bebas Hubungkan Model AI Resmi Pilihan Anda'
                      : 'Connect Your Preferred Official AI Subscriptions'}
                  </h4>
                  <p className="mt-0.5 text-xs sm:text-sm text-muted-foreground">
                    {language === 'id'
                      ? 'Gunakan akun resmi (Claude, ChatGPT, Gemini) atau pasang API key sendiri (DeepSeek, OpenAI) tanpa biaya token dobel.'
                      : 'Bring your official subscriptions (Claude, ChatGPT, Gemini) or use your own API keys (DeepSeek, OpenAI) with zero token markup.'}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-muted-foreground shrink-0">
                <span className="rounded-md border border-border/60 bg-muted/40 px-2.5 py-1">Claude</span>
                <span className="rounded-md border border-border/60 bg-muted/40 px-2.5 py-1">ChatGPT</span>
                <span className="rounded-md border border-border/60 bg-muted/40 px-2.5 py-1">Gemini</span>
                <span className="rounded-md border border-border/60 bg-muted/40 px-2.5 py-1">DeepSeek</span>
              </div>
            </div>
          </div>
        </section>

        {/* 4.6. FOUNDING BACKERS & SPONSORS TRUST BAR */}
        <section className="border-t border-border/60 bg-muted/5 px-6 py-12 sm:px-8">
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

        {/* 5. FINAL PITCH / CTA SECTION */}
        <section className="border-t border-border/60 px-6 py-16 sm:px-8 sm:py-20">
          <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div className="max-w-xl">
              <h2 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
                {t('Siap bebas dari pusing urusan teknis?')}
              </h2>
              <p className="mt-3 text-base sm:text-lg leading-relaxed text-muted-foreground">
                {t('Fokus besarkan bisnis dan cari cuan. Biarkan agen Cuan yang merapikan operasional, melayani pelanggan, dan mengeksekusi kebutuhan teknis di server Anda.')}
              </p>
              <p className="mt-3 text-sm text-muted-foreground/80">
                {t('Open source · Lisensi Apache-2.0 · Kendali penuh di VPS sendiri')}
              </p>
            </div>
            <button
              type="button"
              onClick={scrollToWaitingList}
              className="action-primary min-h-12 px-7 text-base font-semibold shadow-xs cursor-pointer inline-flex items-center gap-2"
            >
              <span>{t('Gabung Waiting List')}</span>
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 border-t border-border/60 px-6 py-6 text-sm text-muted-foreground sm:px-8">
        <p className="flex items-center gap-1.5">
          <span className="font-display tracking-tight font-bold text-foreground">
            cuan
          </span>
          <span>· {t('Your always-on project manager.')}</span>
        </p>
        <div className="flex flex-wrap items-center gap-5">
          <Link
            to="/sponsor"
            className="inline-flex min-h-11 items-center hover:text-foreground transition-colors font-medium text-primary"
          >
            {t('Program Sponsor Founding')}
          </Link>
          <a
            href="#comparison"
            className="inline-flex min-h-11 items-center hover:text-foreground transition-colors"
          >
            {t('Perbandingan')}
          </a>
          <a
            href="#ecosystem"
            className="inline-flex min-h-11 items-center hover:text-foreground transition-colors"
          >
            {t('Integrasi & MCP')}
          </a>
          <button
            type="button"
            onClick={() => setShowGithubModal(true)}
            className="inline-flex min-h-11 items-center hover:text-foreground transition-colors cursor-pointer"
          >
            {t('Self-hosting guide')}
          </button>
          <button
            type="button"
            onClick={() => setShowGithubModal(true)}
            className="inline-flex min-h-11 items-center gap-1.5 hover:text-foreground transition-colors cursor-pointer"
          >
            <Github className="h-4 w-4" strokeWidth={1.5} />
            <span>GitHub</span>
          </button>
        </div>
      </footer>

      {/* GitHub Curation Notice Modal */}
      {showGithubModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-labelledby="github-modal-title"
          onClick={() => setShowGithubModal(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl border border-border/80 bg-card p-6 shadow-xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted/60 text-foreground">
                  <Github className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 id="github-modal-title" className="font-display text-base font-bold text-foreground">
                    {t('Repositori Open Source Cuan v1.0')}
                  </h3>
                  <div className="inline-flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-400 font-medium">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                    <span>{t('Tahap Kurasi Final Rilis Publik (Apache-2.0)')}</span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowGithubModal(false)}
                className="rounded-lg p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
                aria-label={t('Tutup')}
              >
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              {t(
                'Repositori publik Cuan sedang disiapkan dan dirapikan untuk rilis open source resmi. Masukkan email Anda di Waiting List untuk mendapatkan notifikasi rilis pertama dan akses repositori prioritas.',
              )}
            </p>

            <div className="rounded-xl border border-border/60 bg-muted/20 p-3 text-xs text-muted-foreground flex items-center justify-between">
              <span>{t('Lisensi Terbuka:')}</span>
              <span className="font-mono font-semibold text-foreground">Apache License 2.0</span>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-2">
              <button
                type="button"
                onClick={scrollToWaitingList}
                className="action-primary flex-1 min-h-11 px-4 text-sm font-semibold justify-center cursor-pointer"
              >
                {t('Daftar Waiting List Sekarang')}
              </button>
              <button
                type="button"
                onClick={() => setShowGithubModal(false)}
                className="action-secondary min-h-11 px-4 text-sm font-semibold justify-center cursor-pointer"
              >
                {t('Tutup')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
