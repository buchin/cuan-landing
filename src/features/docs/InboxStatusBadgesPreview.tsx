import {
  CheckCircle2,
  Circle,
  Clock3,
  Eye,
  AlertCircle,
  Bot,
} from 'lucide-react'

interface InboxStatusBadgesPreviewProps {
  language: 'id' | 'en'
}

export function InboxStatusBadgesPreview({ language }: InboxStatusBadgesPreviewProps) {
  const isEn = language === 'en'

  return (
    <div className="my-6 rounded-2xl border border-border/60 bg-muted/20 p-4 sm:p-6 space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/80">
            {isEn ? 'Real Inbox Representation' : 'Tampilan Nyata di Inbox Cuan'}
          </span>
        </div>
        <p className="text-xs sm:text-sm text-muted-foreground">
          {isEn
            ? 'Below is the authentic layout of avatar badges in Cuan Inbox, matching the actual application interface:'
            : 'Berikut adalah representasi tampilan badge di sudut avatar pada daftar Inbox Cuan sesuai antarmuka aplikasi sebenarnya:'}
        </p>
      </div>

      {/* Simulated Real Inbox Rows */}
      <div className="rounded-xl border border-border/70 bg-card divide-y divide-border/40 overflow-hidden shadow-xs">
        {/* Row 1: Resolved / Selesai */}
        <div className="flex items-start gap-3 p-3.5 sm:p-4 hover:bg-muted/30 transition-colors">
          {/* Avatar with Green Checkmark Badge */}
          <div className="relative shrink-0 mt-0.5">
            <div
              className="h-9 w-9 rounded-full bg-secondary/80 flex items-center justify-center font-bold text-xs border border-border/50 text-foreground overflow-hidden"
              aria-label="Agent Avatar"
            >
              <Bot className="h-4 w-4 text-primary" />
            </div>
            {/* Overlaid Badge */}
            <span
              className="absolute -bottom-0.5 -right-0.5 rounded-full bg-background flex items-center justify-center p-0.5 shadow-xs text-emerald-600 dark:text-emerald-400 ring-1 ring-background"
              title={isEn ? 'Completed / Resolved (Click to Reopen)' : 'Selesai / Tuntas (Klik untuk Reopen)'}
            >
              <CheckCircle2 className="h-4 w-4" strokeWidth={2} />
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-semibold text-foreground truncate">
                {isEn ? 'Penyatuan Indikator Status Inbox' : 'Penyatuan Indikator Status Inbox'}
              </span>
              <span className="text-xs text-muted-foreground shrink-0 tabular-nums">
                {isEn ? 'Yesterday' : 'Yesterday'}
              </span>
            </div>
            <p className="text-xs text-muted-foreground truncate mt-0.5">
              {isEn
                ? 'Execution proof verified and criteria accepted...'
                : 'Bukti eksekusi atau kriteria penerimaan telah disetujui...'}
            </p>
            <div className="mt-2 flex items-center gap-1.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
              <span>
                {isEn
                  ? 'Status: Resolved (All tasks completed / Closed)'
                  : 'Status: Tuntas / Resolved (Seluruh tugas selesai)'}
              </span>
            </div>
          </div>
        </div>

        {/* Row 2: In Progress / Sedang Berjalan */}
        <div className="flex items-start gap-3 p-3.5 sm:p-4 hover:bg-muted/30 transition-colors">
          {/* Avatar with Pie Progress Badge */}
          <div className="relative shrink-0 mt-0.5">
            <div
              className="h-9 w-9 rounded-full bg-secondary/80 flex items-center justify-center font-bold text-xs border border-border/50 text-foreground overflow-hidden"
              aria-label="Agent Avatar"
            >
              <Bot className="h-4 w-4 text-primary" />
            </div>
            {/* Overlaid Pie Progress Badge */}
            <span
              className="absolute -bottom-0.5 -right-0.5 rounded-full bg-background flex items-center justify-center p-0.5 shadow-xs text-muted-foreground ring-1 ring-background"
              title={isEn ? 'In progress (runner active)' : 'Sedang berjalan (runner aktif)'}
            >
              <svg
                viewBox="0 0 16 16"
                className="h-4 w-4 task-pulse-subtle"
                data-testid="task-pie-progress"
                aria-hidden="true"
              >
                <circle
                  cx="8"
                  cy="8"
                  r="6.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  opacity="0.65"
                />
                {/* 35% wedge to match real partial progress */}
                <path
                  d="M 8 8 L 8 3.5 A 4.5 4.5 0 0 1 11.6 5.3 Z"
                  fill="currentColor"
                />
              </svg>
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-semibold text-foreground truncate">
                {isEn ? 'Implementasi Aksi Kirim Email' : 'Implementasi Aksi Kirim Email'}
              </span>
              <span className="text-xs text-muted-foreground shrink-0 tabular-nums">
                {isEn ? 'Yesterday' : 'Yesterday'}
              </span>
            </div>
            <p className="text-xs text-muted-foreground truncate mt-0.5">
              {isEn
                ? 'Reply email dispatch feature actively executing...'
                : 'Fitur pengiriman email balasan sedang diproses runner...'}
            </p>
            <div className="mt-2 flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground">
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 shrink-0 task-pulse-subtle" aria-hidden="true">
                <circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.65" />
                <path d="M 8 8 L 8 3.5 A 4.5 4.5 0 0 1 11.6 5.3 Z" fill="currentColor" />
              </svg>
              <span>
                {isEn
                  ? 'Status: In Progress (Subtle pulse indicates active execution)'
                  : 'Status: Berjalan / In Progress (Denyut lembut menandakan runner aktif)'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Breakdown Cards of Real Badges */}
      <div className="space-y-3">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {isEn ? 'Badge Reference on Avatar' : 'Panduan Badge di Sudut Avatar'}
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Centang Hijau */}
          <div className="p-3 rounded-xl border border-border/60 bg-card/60 flex items-start gap-3">
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5">
              <CheckCircle2 className="h-4 w-4" strokeWidth={2} />
            </div>
            <div className="text-xs space-y-1">
              <p className="font-semibold text-foreground">
                {isEn ? 'Green Checkmark (CheckCircle2)' : 'Centang Hijau (CheckCircle2)'}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {isEn
                  ? 'Shown when all tasks are complete or conversation is marked Resolved. Click to Reopen.'
                  : 'Muncul saat tugas selesai atau percakapan berstatus Resolved. Klik langsung untuk Reopen.'}
              </p>
            </div>
          </div>

          {/* Pie Progress */}
          <div className="p-3 rounded-xl border border-border/60 bg-card/60 flex items-start gap-3">
            <div className="p-1.5 rounded-lg bg-muted text-muted-foreground shrink-0 mt-0.5">
              <svg viewBox="0 0 16 16" className="h-4 w-4 task-pulse-subtle" aria-hidden="true">
                <circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.65" />
                <path d="M 8 8 L 8 3.5 A 4.5 4.5 0 0 1 11.6 5.3 Z" fill="currentColor" />
              </svg>
            </div>
            <div className="text-xs space-y-1">
              <p className="font-semibold text-foreground">
                {isEn ? 'Pie Progress Ring' : 'Lingkaran Pie Progres'}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {isEn
                  ? 'Slices fill incrementally as tasks complete, with a calm pulse when the runner is executing.'
                  : 'Irisan lingkaran terisi otomatis sesuai progres tugas, berdenyut lembut saat runner aktif bekerja.'}
              </p>
            </div>
          </div>

          {/* Outline Circle */}
          <div className="p-3 rounded-xl border border-border/60 bg-card/60 flex items-start gap-3">
            <div className="p-1.5 rounded-lg bg-muted text-muted-foreground/70 shrink-0 mt-0.5">
              <Circle className="h-4 w-4" strokeWidth={1.5} />
            </div>
            <div className="text-xs space-y-1">
              <p className="font-semibold text-foreground">
                {isEn ? 'Outline Ring (Circle)' : 'Lingkaran Garis (Circle)'}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {isEn
                  ? 'Shown for standard active chats without tasks. Click directly to mark conversation as Resolved.'
                  : 'Muncul pada obrolan reguler tanpa antrean tugas. Klik langsung untuk menandai percakapan tuntas.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Task Card Indicators */}
      <div className="pt-4 border-t border-border/40 space-y-3">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {isEn
            ? 'Detailed Indicators inside Chat & Tasks Menu'
            : 'Indikator Rinci di Dalam Kartu Chat & Menu Tasks'}
        </h4>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {isEn
            ? 'Inside individual task cards and the Tasks dashboard, secondary technical states are shown cleanly:'
            : 'Di dalam kartu tugas obrolan dan menu Tasks, status teknis lanjutan ditampilkan secara terpisah:'}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          <div className="p-2.5 rounded-lg border border-border/50 bg-card/40 flex items-center gap-2.5 text-xs">
            <Eye className="h-4 w-4 text-purple-600 dark:text-purple-400 shrink-0" />
            <div className="min-w-0">
              <p className="font-medium text-foreground truncate">
                {isEn ? 'Needs Approval' : 'Menunggu Persetujuan'}
              </p>
              <p className="text-[11px] text-muted-foreground truncate">
                {isEn ? 'Eye (Purple)' : 'Ikon Mata Ungu'}
              </p>
            </div>
          </div>

          <div className="p-2.5 rounded-lg border border-border/50 bg-card/40 flex items-center gap-2.5 text-xs">
            <Clock3 className="h-4 w-4 text-muted-foreground shrink-0" />
            <div className="min-w-0">
              <p className="font-medium text-foreground truncate">
                {isEn ? 'Queued' : 'Dalam Antrean'}
              </p>
              <p className="text-[11px] text-muted-foreground truncate">
                {isEn ? 'Clock3 (Muted)' : 'Ikon Jam Abu-abu'}
              </p>
            </div>
          </div>

          <div className="p-2.5 rounded-lg border border-border/50 bg-card/40 flex items-center gap-2.5 text-xs">
            <AlertCircle className="h-4 w-4 text-amber-500 shrink-0" />
            <div className="min-w-0">
              <p className="font-medium text-foreground truncate">
                {isEn ? 'Needs Attention' : 'Perlu Perhatian'}
              </p>
              <p className="text-[11px] text-muted-foreground truncate">
                {isEn ? 'AlertCircle (Amber)' : 'Tanda Seru Oranye'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
