export interface DocSection {
  slug: string
  title: string
  titleEn: string
  icon: string
  summary: string
  summaryEn: string
  content: {
    intro: string
    introEn: string
    subsections: {
      id: string
      heading: string
      headingEn: string
      text: string
      textEn: string
      code?: string
      codeLang?: string
      note?: string
      noteEn?: string
    }[]
  }
}

export const DOC_SECTIONS: DocSection[] = [
  {
    slug: 'getting-started',
    title: 'Persiapan & Quick Start',
    titleEn: 'Getting Started & Quick Start',
    icon: 'Terminal',
    summary: 'Pasang Cuan di server VPS atau komputer lokal dalam 30 detik.',
    summaryEn: 'Deploy Cuan on your VPS or local machine in under 30 seconds.',
    content: {
      intro: 'Cuan didesain agar mudah dioperasikan oleh siapa pun, bahkan tanpa latar belakang developer. Di server VPS pribadi atau komputer lokal, Cuan berjalan di atas Docker yang terisolasi lengkap dengan database PostgreSQL.',
      introEn: 'Cuan is engineered for effortless deployment by anyone, with or without a developer background. On a private VPS or local machine, Cuan runs inside isolated Docker containers bundled with PostgreSQL.',
      subsections: [
        {
          id: 'auto-install',
          heading: 'Opsi 1: 1-Line VPS Auto-Installer (Otomatis Docker & SSL)',
          headingEn: 'Option 1: 1-Line VPS Auto-Installer (Automated Docker & SSL)',
          text: 'Cara paling praktis untuk server Linux (Ubuntu 22.04/24.04 atau Debian 12). Skrip ini otomatis memverifikasi dependensi, menyiapkan Docker & PostgreSQL, dan mengonfigurasi Cuan tanpa perlu mengedit file konfigurasi secara manual:',
          textEn: 'The easiest path for Linux VPS (Ubuntu 22.04/24.04 or Debian 12). Automatically verifies dependencies, bootstraps Docker & PostgreSQL, and configures Cuan without manual config editing:',
          code: 'curl -fsSL https://cuan.work/install.sh | bash',
          codeLang: 'bash',
          note: 'Jika Anda sudah memiliki subdomain, langsung tambahkan flag --domain dan --email agar sertifikat SSL Let\'s Encrypt otomatis terpasang (lihat langkah di bawah).',
          noteEn: 'If you already have a custom domain, pass the --domain and --email flags to auto-provision Let\'s Encrypt SSL (see Domain guide below).',
        },
        {
          id: 'docker',
          heading: 'Opsi 2: Manual Docker Compose',
          headingEn: 'Option 2: Manual Docker Compose',
          text: 'Bagi Anda yang ingin mengelola file docker-compose.yml sendiri di server atau komputer lokal:',
          textEn: 'For users who prefer managing docker-compose.yml directly on their server or local machine:',
          code: 'curl -fsSL https://cuan.work/docker-compose.yml -o docker-compose.yml\ndocker compose up -d',
          codeLang: 'bash',
          note: 'Setelah container berjalan, buka browser Anda ke http://localhost:8080 (atau http://IP-SERVER:8080) untuk masuk ke halaman aktivasi Owner pertama.',
          noteEn: 'Once containers are running, navigate to http://localhost:8080 (or http://SERVER-IP:8080) to complete initial Owner setup.',
        },
        {
          id: 'domain-setup',
          heading: 'Menghubungkan Domain Pribadi (cuan.bisnisanda.com)',
          headingEn: 'Connecting Your Custom Domain (cuan.yourbusiness.com)',
          text: 'Agar Cuan online 24 jam dan dapat diakses oleh Anda serta staf dari HP maupun laptop di mana saja, hubungkan server VPS Anda ke subdomain pribadi:\n\n1. Buka DNS Management domain Anda (Cloudflare, Niagahoster, Domainesia, Namecheap, dsb).\n2. Tambahkan A Record:\n   • Name / Host: cuan (atau app)\n   • Target IP: IP Server VPS Anda\n   • TTL: Auto (atau Proxy ON jika menggunakan Cloudflare)\n\n3. Hubungkan domain sesuai metode instalasi yang Anda gunakan:',
          textEn: 'To keep Cuan online 24/7 and accessible to you and your team from mobile or laptop anywhere, connect your VPS server to your custom subdomain:\n\n1. Open your DNS provider dashboard (Cloudflare, Namecheap, GoDaddy, etc.).\n2. Add an A Record:\n   • Name / Host: cuan (or app)\n   • Target IP: Your VPS IP Address\n   • TTL: Auto (or Proxy ON for Cloudflare)\n\n3. Connect your domain using your preferred deployment method:',
          code: '# Cara A: Otomatis 1-Baris dengan installer (Docker + Caddy SSL otomatis):\ncurl -fsSL https://cuan.work/install.sh | bash -s -- --domain cuan.bisnisanda.com --email anda@bisnisanda.com\n\n# Cara B: Jika menjalankan Docker Compose manual (aktifkan Caddy proxy profile):\nCUAN_DOMAIN=cuan.bisnisanda.com ACME_EMAIL=anda@bisnisanda.com docker compose --profile proxy up -d\n\n# Cara C: Jika menggunakan Cloudflare Tunnel (tanpa buka port 80/443):\n# Arahkan Public Hostname Cloudflare Tunnel langsung ke http://localhost:8080',
          codeLang: 'bash',
          note: 'Setelah selesai, buka https://cuan.bisnisanda.com di browser. Sambungan HTTPS dengan gembok hijau langsung aktif dan siap digunakan tim!',
          noteEn: 'Once completed, navigate to https://cuan.yourbusiness.com in your browser. HTTPS with a green padlock is live and ready for your team!',
        },
        {
          id: 'first-setup',
          heading: 'Pengaturan Pertama (Owner Onboarding)',
          headingEn: 'First Setup (Owner Onboarding)',
          text: 'Saat membuka Cuan untuk pertama kali, sistem akan menyambut Anda dengan wizard pembuatan akun Owner pertama:\n\n1. Masukkan Nama Lengkap, Alamat Email, dan Kata Sandi yang kuat.\n2. Akun pertama ini otomatis menjadi Superadmin (Owner) dengan kendali penuh atas sistem.\n3. Setelah selesai, Anda langsung diarahkan ke Dashboard utama Cuan.',
          textEn: 'When opening Cuan for the first time, you will be greeted with the first Owner creation wizard:\n\n1. Enter your Full Name, Email Address, and a secure Password.\n2. This first account automatically becomes the Superadmin (Owner) with full administrative authority.\n3. Upon completion, you are redirected directly to your main Cuan Workspace Dashboard.',
        },
      ],
    },
  },
  {
    slug: 'ai-providers',
    title: 'Menghubungkan Mesin AI',
    titleEn: 'Connecting AI Providers',
    icon: 'Cpu',
    summary: 'Gunakan akun langganan resmi bulanan tanpa biaya token atau bawa API Key sendiri.',
    summaryEn: 'Use flat monthly subscriptions with zero markup or bring your own API keys.',
    content: {
      intro: 'Cuan dilengkapi dengan Dual-Mode AI Engine: Anda bisa memanfaatkan langganan resmi yang sudah Anda bayar tiap bulan (Claude Pro, ChatGPT Plus, Antigravity) tanpa membayar tagihan token per-kata, atau menghubungkan kunci API langsung dari provider aslinya.',
      introEn: 'Cuan features a Dual-Mode AI Engine: leverage the monthly subscriptions you already pay for (Claude Pro, ChatGPT Plus, Antigravity) with zero per-token markup, or connect API keys directly at wholesale cost.',
      subsections: [
        {
          id: 'cli-subscription',
          heading: '1. Langganan Resmi via CLI (Hemat Biaya Maksimal)',
          headingEn: '1. Official CLI Subscriptions (Zero Token Markup)',
          text: 'Jika Anda sudah berlangganan Claude Pro/Team, ChatGPT Plus/Team, atau Google Gemini/Antigravity, Anda tidak perlu lagi membeli saldo API terpisah:\n\n1. Buka menu Settings > AI Providers di dashboard Cuan.\n2. Pilih provider CLI yang ingin digunakan (Claude Code, ChatGPT CLI, atau Antigravity).\n3. Ikuti alur otentikasi login resmi (cukup 1 kali).\n4. Binary CLI terpasang aman di server user-space tanpa membutuhkan akses root.',
          textEn: 'If you already subscribe to Claude Pro/Team, ChatGPT Plus/Team, or Google Gemini/Antigravity, you never need to buy secondary API credits:\n\n1. Navigate to Settings > AI Providers in your Cuan dashboard.\n2. Select your CLI provider (Claude Code, ChatGPT CLI, or Antigravity).\n3. Complete the official 1-time authentication flow.\n4. CLI binaries execute securely in user-space without requiring root access.',
          note: 'Mode ini sangat menghemat anggaran operasional agensi dan marketer karena kuota pemakaian mengikuti batas wajar langganan bulanan Anda.',
          noteEn: 'This mode dramatically cuts operating costs for agencies and marketers by honoring standard monthly subscription allowances.',
        },
        {
          id: 'byok',
          heading: '2. Universal BYOK (Bring Your Own Key)',
          headingEn: '2. Universal BYOK (Bring Your Own Key)',
          text: 'Bagi Anda yang membutuhkan akses model API pay-as-you-go langsung dari sumbernya tanpa potongan pihak ketiga:\n\n• OpenAI: GPT-4o, o1, o3-mini\n• Anthropic: Claude 3.5 Sonnet, Claude 3.5 Haiku\n• DeepSeek: DeepSeek-V3, DeepSeek-R1 (pilihan paling ekonomis dan cerdas)\n• Groq: Llama 3.3 70B (respon ultra-cepat untuk triase pesan pelanggan)\n• Ollama: Model lokal offline di server pribadi Anda',
          textEn: 'For teams needing wholesale pay-as-you-go model access directly from source providers without markups:\n\n• OpenAI: GPT-4o, o1, o3-mini\n• Anthropic: Claude 3.5 Sonnet, Claude 3.5 Haiku\n• DeepSeek: DeepSeek-V3, DeepSeek-R1 (high intelligence at lowest cost)\n• Groq: Llama 3.3 70B (ultra-low latency for instant customer triage)\n• Ollama: Local offline models hosted on your private server',
          note: 'Cara pasang: Buka Settings > AI Providers > Tambah Provider > Masukkan API Key > Klik Simpan.',
          noteEn: 'Setup: Open Settings > AI Providers > Add Provider > Paste API Key > Click Save.',
        },
        {
          id: 'security',
          heading: '3. Keamanan Kredensial & Enkripsi AES-256-GCM',
          headingEn: '3. Credential Security & AES-256-GCM Encryption',
          text: 'Keamanan data dan kunci rahasia Anda terjamin secara ketat:\n\n• Enkripsi Database: Semua API Key dan token dienkripsi di level PostgreSQL menggunakan cipher AES-256-GCM.\n• Log Sanitization: Log aplikasi otomatis menyensor string kredensial menjadi [REDACTED].\n• Isolasi Hak Akses: Staf (Member) tidak pernah bisa melihat atau mengekspor kunci API milik Owner.',
          textEn: 'Your secrets and operational data are strictly defended:\n\n• Database Encryption: All API keys and tokens are encrypted at rest in PostgreSQL via AES-256-GCM ciphers.\n• Log Sanitization: System logs automatically mask credentials as [REDACTED].\n• Role Isolation: Non-owner staff members can never inspect or export your private API keys.',
        },
      ],
    },
  },
  {
    slug: 'projects-tasks',
    title: 'Proyek & Task Otonom',
    titleEn: 'Projects & Autonomous Tasks',
    icon: 'FolderKanban',
    summary: 'Kelola aset digital, delegasikan tugas ke Asisten AI, dan tinjau hasil kerja sebelum disetujui.',
    summaryEn: 'Manage digital assets, delegate work to AI agents, and review diffs before approval.',
    content: {
      intro: 'Cuan adalah ruang kerja otonom tempat ide pemasaran diubah menjadi eksekusi nyata. Anda mengelola aset digital (Landing page, Blog WordPress/Ghost, Script Video, Katalog Produk) sebagai Proyek terstruktur, di mana Asisten AI bekerja dalam pengawasan manusia (Human-in-the-Loop).',
      introEn: 'Cuan is an autonomous workspace where marketing ideas become real assets. Manage digital assets (Landing pages, WordPress/Ghost blogs, Video scripts, Product catalogs) as structured Projects, where AI agents execute work under Human-in-the-Loop supervision.',
      subsections: [
        {
          id: 'create-project',
          heading: '1. Membuat Proyek Aset Digital',
          headingEn: '1. Creating a Digital Asset Project',
          text: 'Setiap aset digital Anda memiliki ruang kerja mandiri:\n\n1. Buka menu Projects di sidebar kiri dan klik + New Project.\n2. Tulis nama proyek (misal: "Landing Page Kursus Digital" atau "Katalog Toko Online").\n3. (Opsional) Hubungkan URL Git Repository jika proyek ingin disinkronkan langsung ke GitHub.\n4. Masukkan variabel environment spesifik proyek jika diperlukan.',
          textEn: 'Every digital asset maintains its own isolated workspace:\n\n1. Open the Projects menu from the left sidebar and click + New Project.\n2. Enter your project title (e.g. "Digital Course Landing Page" or "Online Store Catalog").\n3. (Optional) Connect your Git Repository URL to sync code and assets with GitHub.\n4. Define project-scoped environment variables if required.',
        },
        {
          id: 'agent-delegation',
          heading: '2. Pendelegasian Tugas ke Asisten AI (@cuan Mention)',
          headingEn: '2. Delegating Tasks to AI Agents (@cuan Mention)',
          text: 'Anda tidak perlu menulis prompt berulang kali. Cukup delegasikan tugas di tab Discussions atau Tasks:\n\n• Ketik instruksi kerja secara natural, misalnya:\n  "@cuan buatkan copy sales page dengan pendekatan problem-agitate-solution untuk produk ini"\n• Asisten AI akan mengambil tugas tersebut, membuat workspace cabang yang terisolasi, dan mengeksekusi pekerjaan secara mandiri.',
          textEn: 'Skip repetitive prompt typing. Delegate directly inside Discussions or Tasks:\n\n• Type your brief naturally, for example:\n  "@cuan draft a high-converting sales page using the problem-agitate-solution framework"\n• The AI agent picks up the task, branches an isolated workspace, and executes the work autonomously.',
        },
        {
          id: 'human-approval',
          heading: '3. Tinjauan & Persetujuan Manusia (Approval Card)',
          headingEn: '3. Human-in-the-Loop Review (Approval Card)',
          text: 'Asisten AI di Cuan tidak pernah mengubah atau merilis sesuatu tanpa persetujuan Anda:\n\n1. Begitu AI selesai bekerja, panel task menampilkan kartu Needs Approval dengan ringkasan hasil kerja dan bukti eksekusi.\n2. Anda dapat melihat preview konten, diff perubahan kode, atau hasil generate.\n3. Klik Approve untuk menerima hasil kerja, atau ketik masukan revisi jika ada bagian yang perlu disempurnakan.',
          textEn: 'AI assistants in Cuan never deploy or commit changes without explicit authorization:\n\n1. When work completes, the task drawer renders a Needs Approval card with output summary and verification proof.\n2. Inspect content previews, diff changes, or generated assets.\n3. Click Approve to finalize the work, or submit revision feedback if adjustments are needed.',
          note: 'Prinsip Zero Halusinasi: Agen wajib menyertakan bukti kerja nyata sebelum meminta approval, sehingga Anda selalu memegang kendali 100%.',
          noteEn: 'Zero Hallucination Principle: Agents must provide verifiable proof of execution before requesting approval, keeping you in complete control.',
        },
      ],
    },
  },
  {
    slug: 'inbox',
    title: 'Inbox & Live Chat Pelanggan',
    titleEn: 'Customer Inbox & Live Chat',
    icon: 'MessageSquare',
    summary: 'Kelola chat pengunjung website dengan widget instan dan asisten AI otonom.',
    summaryEn: 'Manage website customer conversations with instant live chat and autonomous AI.',
    content: {
      intro: 'Ubah interaksi obrolan pengunjung website menjadi konversi penjualan. Tim Anda dan Asisten AI dapat menjawab pertanyaan pelanggan dari satu antarmuka terpadu yang tenang dan bebas gangguan.',
      introEn: 'Turn visitor conversations into actual sales conversions. Your human team and AI assistants handle customer queries from one calm, noise-free unified interface.',
      subsections: [
        {
          id: 'chat-widget',
          heading: '1. Widget Live Chat Website (1 Baris Kode)',
          headingEn: '1. Website Live Chat Widget (1-Line Snippet)',
          text: 'Salin satu baris kode script berikut ke HTML landing page, tema WordPress, Ghost blog, atau toko online Anda:',
          textEn: 'Embed this lightweight script snippet into your landing page HTML, WordPress theme, Ghost blog, or custom storefront:',
          code: '<script src="https://cuan.bisnisanda.com/chat/widget.js" data-cuan-token="TOKEN_ANDA" async></script>',
          codeLang: 'html',
          note: 'Token widget dapat Anda salin langsung di Settings > Integrations atau di pengaturan Inbox dashboard Cuan. Ukuran widget sangat ringan (< 15KB) sehingga tidak memperlambat skor kecepatan website Anda.',
          noteEn: 'Copy your widget token directly from Settings > Integrations in your Cuan dashboard. The widget bundle is under 15KB, ensuring zero impact on your Core Web Vitals.',
        },
        {
          id: 'auto-whisper',
          heading: '2. Respon Otomatis & Auto-Whisper (@agent Mention)',
          headingEn: '2. Autonomous AI Triage & Auto-Whisper (@agent Mention)',
          text: 'Di ruang chat pelanggan, Cuan menjaga agar rahasia internal bisnis Anda tidak bocor:\n\n• Mengetik biasa: Pesan terkirim secara publik ke pengunjung website.\n• Mengetik mention @cuan atau nama asisten: Composer secara otomatis beralih ke mode Bisikan Internal (Whisper) dengan indikator visual kuning yang jelas.\n• Asisten AI akan merespon secara internal untuk memberi tahu staf manusia cara menjawab pelanggan terbaik, tanpa pernah terlihat oleh pengunjung website.',
          textEn: 'Inside customer chat rooms, Cuan safeguards your internal business operations:\n\n• Standard typing: Messages are delivered publicly to the website visitor.\n• Typing an @agent mention (like @cuan): Composer automatically switches to internal Whisper mode with a calm yellow indicator.\n• The AI assistant analyzes the inquiry and provides internal coaching to your staff, completely invisible to the customer.',
        },
        {
          id: 'reply-draft',
          heading: '3. Alur Persetujuan Draf Jawaban (Human-in-the-Loop)',
          headingEn: '3. Visitor Reply Draft Approval (Human-in-the-Loop)',
          text: 'Asisten AI dapat menyusun draf balasan untuk pertanyaan produk yang rumit:\n\n1. AI menghasilkan kartu Draf Balasan di panel chat.\n2. Staf Anda cukup memeriksa draf tersebut.\n3. Klik Kirim Balasan untuk langsung meneruskannya ke pengunjung, atau edit kata-katanya terlebih dahulu.',
          textEn: 'AI assistants can prepare polished response drafts for complex visitor inquiries:\n\n1. The assistant generates a Reply Draft card inside the conversation stream.\n2. Your human staff reviews the proposed message.\n3. Click Send Reply to dispatch it immediately to the visitor, or edit text as desired.',
          note: 'Catatan Roadmap: Saluran pihak ketiga tambahan (seperti WhatsApp Gateway resmi) saat ini dalam tahap pengujian ketahanan internal dan akan dirilis resmi setelah uji produksi selesai.',
          noteEn: 'Roadmap Note: Additional third-party messaging channels (such as an official WhatsApp Gateway) are undergoing internal resilience testing and will be officially released once production verification completes.',
        },
      ],
    },
  },
  {
    slug: 'team',
    title: 'Kolaborasi Tim & Hak Akses',
    titleEn: 'Team Collaboration & Access Control',
    icon: 'Users',
    summary: 'Atur peran Owner dan Member, undang staf dengan 1-klik tautan WhatsApp.',
    summaryEn: 'Role Owner vs Member, 1-click WhatsApp invites without SMTP setup.',
    content: {
      intro: 'Cuan membagi peran secara tegas antara Pemilik Bisnis (Owner) dan Staf Operasional (Member) demi menjaga keamanan kunci API dan kelancaran alur kerja kolaborasi harian.',
      introEn: 'Cuan strictly separates Business Owners from Operational Staff to secure private API credentials while accelerating daily collaborative workflows.',
      subsections: [
        {
          id: 'rbac-roles',
          heading: '1. Perbedaan Hak Akses: Owner vs Member',
          headingEn: '1. Permission Roles: Owner vs Member',
          text: '• Owner (Pemilik Bisnis): Kontrol penuh sistem, manajemen konfigurasi AI, melihat billing, mengundang/menghapus staf, dan mengatur integrasi git.\n• Member (Staf / Virtual Assistant / Tim): Mengerjakan task harian, mendelegasikan tugas ke Asisten AI, mengelola pesan masuk di Inbox, dan berkolaborasi tanpa bisa mengakses atau melihat kunci API rahasia Owner.',
          textEn: '• Owner (Business Owner): Full administrative authority, AI configuration, billing, team member management, and repository connections.\n• Member (Staff / Virtual Assistant): Daily execution, task delegation to AI assistants, customer inbox management, strictly prohibited from inspecting or exporting secret AI API keys.',
        },
        {
          id: 'instant-invite',
          heading: '2. Undangan 1-Klik Tanpa Setup Email/SMTP',
          headingEn: '2. 1-Click Invites Without SMTP / Email Complexities',
          text: 'Anda tidak perlu menyewa layanan email transaksional atau mengatur SPF/DKIM DNS yang rumit:\n\n1. Buka menu Team di dashboard Cuan, lalu klik + Invite Member.\n2. Masukkan nama dan email staf Anda.\n3. Sistem langsung meng-generate link undangan kriptografis aman (berlaku 7 hari).\n4. Salin link tersebut dan bagikan langsung lewat WhatsApp, Telegram, atau Slack.\n5. Staf cukup mengklik tautan untuk menentukan kata sandi mereka sendiri dan langsung masuk ke workspace.',
          textEn: 'No need to subscribe to transactional email services or configure painful DKIM/SPF DNS records:\n\n1. Open the Team menu in Cuan and click + Invite Member.\n2. Enter your team member\'s name and email.\n3. Cuan generates a cryptographically signed invite link valid for 7 days.\n4. Copy and send the link directly via WhatsApp, Telegram, or Slack.\n5. The invitee clicks the link, sets their password, and immediately accesses the workspace.',
        },
      ],
    },
  },
  {
    slug: 'self-hosting',
    title: 'Pemeliharaan, Backup & Update',
    titleEn: 'Maintenance, Backups & Updates',
    icon: 'Server',
    summary: 'Rekomendasi spesifikasi VPS, backup atomik 1-langkah, dan panduan update versi.',
    summaryEn: 'Recommended VPS specs, 1-step atomic backups, and version upgrade guides.',
    content: {
      intro: 'Cuan dirancang sebagai aplikasi mandiri (self-contained) yang hemat sumber daya. Server dengan spesifikasi minimal sudah cukup untuk melayani kebutuhan bisnis, tim, dan otomasi AI Anda selama 24 jam penuh.',
      introEn: 'Cuan is engineered as a lightweight, self-contained application. A standard entry-level VPS is more than enough to power daily business operations, team collaboration, and 24/7 AI automation.',
      subsections: [
        {
          id: 'vps-specs',
          heading: '1. Spesifikasi Server VPS yang Direkomendasikan',
          headingEn: '1. Recommended Server Hardware',
          text: '• Minimum: 1 vCPU, 2 GB RAM, 25 GB SSD (VPS $4–$6/bulan di Hetzner, DigitalOcean, Linode, atau Vultr).\n• Disarankan untuk tim aktif & multi-proyek: 2 vCPU, 4 GB RAM, 50 GB SSD.\n• Sistem Operasi: Ubuntu 22.04 LTS, Ubuntu 24.04 LTS, atau Debian 12.',
          textEn: '• Minimum: 1 vCPU, 2 GB RAM, 25 GB SSD ($4–$6/mo VPS on Hetzner, DigitalOcean, Linode, or Vultr).\n• Recommended for active teams & multi-project workloads: 2 vCPU, 4 GB RAM, 50 GB SSD.\n• Operating System: Ubuntu 22.04 LTS, Ubuntu 24.04 LTS, or Debian 12.',
        },
        {
          id: 'backup-restore',
          heading: '2. Backup & Restore Otomatis 1-Perintah',
          headingEn: '2. 1-Step Automated Backup & Restore',
          text: 'Cuan menyertakan skrip otomatis untuk mencadangkan database PostgreSQL dan data workspace dengan aman tanpa downtime:',
          textEn: 'Cuan includes production-grade scripts to snapshot and restore your PostgreSQL database and workspace data atomically without downtime:',
          code: '# Buat snapshot backup lengkap ke folder backups/:\n./scripts/backup.sh\n\n# Pulihkan dari snapshot cadangan terbaru:\n./scripts/restore.sh --latest --force',
          codeLang: 'bash',
          note: 'Setiap file backup diberi timestamp rapi dan diverifikasi integritasnya sebelum proses selesai.',
          noteEn: 'Every backup archive is timestamped and integrity-checked before completing.',
        },
        {
          id: 'update-cuan',
          heading: '3. Cara Update ke Versi Cuan Terbaru',
          headingEn: '3. Upgrading to the Latest Cuan Version',
          text: 'Pembaruan Cuan bersifat non-destruktif dan menjaga seluruh data proyek, chat, serta pengaturan Anda:\n\n• Jika menggunakan 1-Line Installer:\n  Jalankan ./scripts/update.sh --version <versi-baru>. Skrip akan otomatis melakukan backup sebelum update dan memiliki fitur auto-rollback jika terjadi kendala.\n\n• Jika menggunakan Docker Compose manual:\n  docker compose pull && docker compose up -d',
          textEn: 'Cuan updates are non-destructive, preserving all your projects, conversations, and settings:\n\n• If using the 1-Line Installer:\n  Run ./scripts/update.sh --version <new-version>. It creates an automatic pre-update backup and supports automated rollback.\n\n• If using manual Docker Compose:\n  Run docker compose pull && docker compose up -d',
          code: '# Contoh update aman dengan auto-rollback:\n./scripts/update.sh --version 0.9.0',
          codeLang: 'bash',
        },
        {
          id: 'health-monitoring',
          heading: '4. Healthcheck & Status Sistem',
          headingEn: '4. Healthcheck & System Probes',
          text: 'Pantau status operasional service menggunakan endpoint standar industri:',
          textEn: 'Monitor runtime health using standard container endpoints:',
          code: '# Liveness probe (HTTP 200 saat proses aktif):\ncurl -f http://localhost:8080/healthz\n\n# Readiness probe (HTTP 200 saat database & koneksi siap melayani traffic):\ncurl -f http://localhost:8080/readyz',
          codeLang: 'bash',
        },
      ],
    },
  },
]
