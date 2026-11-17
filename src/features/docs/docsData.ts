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
    titleEn: 'Getting Started',
    icon: 'Terminal',
    summary: 'Mulai menjalankan Cuan di server atau lokal dalam waktu 30 detik.',
    summaryEn: 'Deploy Cuan on your server or local machine in under 30 seconds.',
    content: {
      intro: 'Cuan didesain agar mudah dioperasikan oleh siapa pun, bahkan tanpa latar belakang developer. Anda dapat menjalankannya di server pribadi (VPS) atau komputer lokal menggunakan Docker maupun instalasi Linux langsung.',
      introEn: 'Cuan is designed for effortless deployment by anyone, with or without developer background. You can run it on a VPS or local machine via Docker or direct Linux installation.',
      subsections: [
        {
          id: 'docker',
          heading: 'Opsi 1: Docker Compose (Disarankan)',
          headingEn: 'Option 1: Docker Compose (Recommended)',
          text: 'Cara termudah dan paling terisolasi untuk menjalankan Cuan lengkap dengan database PostgreSQL:',
          textEn: 'The cleanest and most isolated way to run Cuan with an integrated PostgreSQL database:',
          code: 'curl -fsSL https://cuan.work/docker-compose.yml -o docker-compose.yml\ndocker compose up -d',
          codeLang: 'bash',
          note: 'Setelah container berjalan, buka browser Anda ke http://localhost:8080 untuk masuk ke halaman aktivasi Owner pertama.',
          noteEn: 'Once containers are running, navigate to http://localhost:8080 to complete initial Owner setup.',
        },
        {
          id: 'linux-install',
          heading: 'Opsi 2: 1-Line Native Linux Script',
          headingEn: 'Option 2: 1-Line Native Linux Script',
          text: 'Untuk server Ubuntu, Debian, atau Linux server lainnya, gunakan skrip instalasi otomatis yang akan menyiapkan service systemd:',
          textEn: 'For Ubuntu, Debian, or other Linux VPS distributions, use our automated one-line systemd installer:',
          code: 'curl -fsSL https://cuan.work/install.sh | bash',
          codeLang: 'bash',
          note: 'Skrip ini otomatis mendeteksi environment, mengonfigurasi direktori /opt/cuan, dan memastikan dependensi siap.',
          noteEn: 'This script automatically detects your environment, configures /opt/cuan, and ensures dependencies are ready.',
        },
        {
          id: 'from-source',
          heading: 'Opsi 3: Build dari Source (Developer)',
          headingEn: 'Option 3: Build from Source (Developers)',
          text: 'Bagi pengembang yang ingin berkontribusi atau mengkustomisasi backend Go dan frontend React:',
          textEn: 'For developers who want to contribute or customize the Go backend and React frontend:',
          code: 'git clone https://github.com/buchin/cuan.git\ncd cuan\ngo run ./cmd/server',
          codeLang: 'bash',
        },
        {
          id: 'first-setup',
          heading: 'Pengaturan Pertama (Owner Onboarding)',
          headingEn: 'First Setup (Owner Onboarding)',
          text: 'Saat membuka Cuan untuk pertama kali, sistem akan menyambut Anda dengan wizard pembuatan akun Owner pertama. Akun Owner memiliki kendali penuh atas konfigurasi AI Provider, kunci API, integrasi Git/WhatsApp, dan manajemen anggota tim.',
          textEn: 'When opening Cuan for the first time, you will be greeted with the first Owner creation wizard. The Owner role holds full administrative control over AI Providers, API keys, Git/WhatsApp integrations, and team management.',
        },
      ],
    },
  },
  {
    slug: 'ai-providers',
    title: 'Menghubungkan AI Provider',
    titleEn: 'Connecting AI Providers',
    icon: 'Cpu',
    summary: 'Gunakan langganan resmi CLI tanpa markup atau bawa API key Anda sendiri.',
    summaryEn: 'Use official subscription CLIs without token markup or bring your own API keys.',
    content: {
      intro: 'Cuan dilengkapi dengan Dual-Mode AI Engine: Anda bisa menggunakan langganan resmi (Claude Pro, ChatGPT Plus, Antigravity) tanpa membayar token API ganda, atau membawa kunci API sendiri (OpenAI, DeepSeek, Anthropic, Ollama).',
      introEn: 'Cuan features a Dual-Mode AI Engine: use your existing official subscriptions (Claude Pro, ChatGPT Plus, Antigravity) without paying secondary token fees, or bring your own API keys directly at cost.',
      subsections: [
        {
          id: 'cli-harness',
          heading: '1. Official Subscription CLIs (Hemat Biaya Maksimal)',
          headingEn: '1. Official Subscription CLIs (Zero Token Markup)',
          text: 'Jika Anda sudah memiliki langganan bulanan Claude Pro/Team, ChatGPT Plus, atau Google Gemini/Antigravity, Anda bisa menjalankannya langsung di server tanpa biaya API per-token.',
          textEn: 'If you already subscribe to Claude Pro/Team, ChatGPT Plus, or Google Gemini/Antigravity, run official harnesses directly without per-token API costs.',
          code: '# Cuan menyediakan manajer instalasi binary user-space otomatis di Settings > AI Providers\n# Binary terpasang aman di ~/.local/bin tanpa butuh akses sudo/root.',
          codeLang: 'bash',
        },
        {
          id: 'byok',
          heading: '2. Universal BYOK (Bring Your Own Key)',
          headingEn: '2. Universal BYOK (Bring Your Own Key)',
          text: 'Hubungkan langsung berbagai model terkemuka dunia dengan biaya langsung dari provider aslinya tanpa potongan pihak ketiga:',
          textEn: 'Connect global AI models directly at native cost without third-party markups:',
          note: 'Provider yang didukung: OpenAI (GPT-4o, o1, o3-mini), DeepSeek (V3, R1), Anthropic (Claude 3.5 Sonnet), Groq (Llama 3.3 70B ultra-fast), xAI (Grok), dan Ollama lokal.',
          noteEn: 'Supported providers: OpenAI (GPT-4o, o1, o3-mini), DeepSeek (V3, R1), Anthropic (Claude 3.5 Sonnet), Groq (Llama 3.3 70B), xAI (Grok), and local Ollama.',
        },
        {
          id: 'security',
          heading: '3. Keamanan Kredensial & Enkripsi AES-256-GCM',
          headingEn: '3. Credential Security & AES-256-GCM Encryption',
          text: 'Semua API key dan token dienkripsi di tingkat database menggunakan AES-256-GCM. Kredensial tidak pernah dicatat dalam log sistem (otomatis disensor menjadi [REDACTED]) dan hanya Owner yang dapat melihat preview tersensor (sk-...xxxx).',
          textEn: 'All API keys and tokens are encrypted at rest using AES-256-GCM. Credentials are never written to system logs (masked as [REDACTED]), and only the Owner can view masked previews (sk-...xxxx).',
        },
      ],
    },
  },
  {
    slug: 'team',
    title: 'Kolaborasi Tim & RBAC',
    titleEn: 'Team Collaboration & RBAC',
    icon: 'Users',
    summary: 'Atur peran Owner dan Member, undang staf dengan 1-klik tautan WhatsApp.',
    summaryEn: 'Role Owner vs Member, 1-click WhatsApp invites without SMTP setup.',
    content: {
      intro: 'Cuan menerapkan Fural Permission Model yang membagi peran secara tegas antara Pemilik Bisnis (Owner) dan Staf Operasional (Member) demi menjaga keamanan kredensial dan kelancaran alur kerja.',
      introEn: 'Cuan implements the Fural Permission Model, strictly separating Business Owners from Operational Staff to secure API credentials while accelerating daily workflows.',
      subsections: [
        {
          id: 'roles',
          heading: 'Perbedaan Hak Akses: Owner vs Member',
          headingEn: 'Permission Roles: Owner vs Member',
          text: '• Owner: Kontrol penuh sistem, manajemen konfigurasi AI, melihat billing, mengundang/menghapus staf, dan mengatur integrasi git.\n• Member: Menjalankan task harian, mendelegasikan tugas ke Asisten AI, mengelola pesan masuk di Inbox, dan berkolaborasi tanpa bisa mengakses atau melihat kunci API rahasia Owner.',
          textEn: '• Owner: Full system control, AI configuration, billing, staff invitations, and repository connections.\n• Member: Daily operations, task delegation to AI assistants, multi-channel customer communications, strictly forbidden from inspecting secret AI API keys.',
        },
        {
          id: 'invite',
          heading: 'Undangan 1-Klik Tanpa Konfigurasi Email/SMTP',
          headingEn: '1-Click Invites Without SMTP / Email Complexities',
          text: 'Anda tidak perlu menyewa layanan email transaksional atau mengatur SPF/DKIM DNS yang rumit. Cukup buat link undangan di TeamView dan bagikan langsung lewat WhatsApp atau Telegram.',
          textEn: 'No need to pay for transactional email SaaS or configure painful DKIM/SPF DNS records. Generate cryptographic 7-day invite links directly in TeamView and send them via WhatsApp or Telegram.',
          note: 'Staf cukup membuka tautan /invite/accept?token=... untuk menentukan kata sandi dan langsung masuk ke workspace.',
          noteEn: 'Staff simply open /invite/accept?token=... to set their password and get instant access.',
        },
      ],
    },
  },
  {
    slug: 'inbox',
    title: 'Inbox Multi-Channel & WhatsApp',
    titleEn: 'Multi-Channel Inbox & WhatsApp',
    icon: 'MessageSquare',
    summary: 'Kelola chat pelanggan WhatsApp & Web Widget dengan asisten AI otonom.',
    summaryEn: 'Manage WhatsApp & Web Chat inquiries with autonomous AI assistants.',
    content: {
      intro: 'Ubah interaksi obrolan pelanggan menjadi aksi terstruktur. Tim Anda dan Asisten AI dapat menjawab pertanyaan pelanggan dari satu layar terpadu.',
      introEn: 'Transform customer conversations into structured business workflows. Your team and AI assistants handle customer queries from one calm unified screen.',
      subsections: [
        {
          id: 'whatsapp-setup',
          heading: 'Integrasi WhatsApp Webhook',
          headingEn: 'WhatsApp Webhook Integration',
          text: 'Hubungkan nomor WhatsApp bisnis Anda menggunakan provider webhook (seperti Baileys gateway atau WhatsApp Cloud API). Pesan yang masuk akan otomatis dibuatkan room obrolan baru di Inbox.',
          textEn: 'Connect your business WhatsApp number via webhook gateways. Inbound messages automatically populate real-time conversation rooms in Inbox.',
        },
        {
          id: 'chat-widget',
          heading: 'Widget Live Chat Website',
          headingEn: 'Website Live Chat Widget',
          text: 'Salin satu baris kode script berikut ke landing page atau website toko online Anda untuk mengaktifkan live chat instan:',
          textEn: 'Embed this lightweight snippet into your website or landing page to enable instant live customer support:',
          code: '<script src="https://your-cuan-domain.com/chat/widget.js" data-cuan-token="TOKEN_ANDA" async></script>',
          codeLang: 'html',
        },
        {
          id: 'ai-triage',
          heading: 'Respon Otomatis & Delegasi Task AI',
          headingEn: 'Autonomous AI Triage & Task Delegation',
          text: 'Saat pelanggan menanyakan informasi produk atau bantuan teknis, Asisten AI dapat merespons secara otomatis atau menyusun draf jawaban untuk disetujui oleh staf manusia.',
          textEn: 'When visitors inquire about product specs or support, assigned AI assistants can automatically reply or prepare answer drafts for human approval.',
        },
      ],
    },
  },
  {
    slug: 'self-hosting',
    title: 'Self-Hosting & Disaster Recovery',
    titleEn: 'Self-Hosting & Portability',
    icon: 'Server',
    summary: 'Rekomendasi VPS, probe kesehatan sistem, serta prosedur backup & restore.',
    summaryEn: 'VPS recommendations, health checks, automated backups, and instant rollback.',
    content: {
      intro: 'Cuan dirancang sebagai aplikasi mandiri (self-contained) yang hemat sumber daya. Server dengan spesifikasi minimal sudah cukup untuk melayani kebutuhan bisnis dan tim Anda.',
      introEn: 'Cuan is engineered as a lightweight, self-contained application. A standard minimal VPS is more than enough to power daily business operations.',
      subsections: [
        {
          id: 'hardware',
          heading: 'Spesifikasi Server yang Direkomendasikan',
          headingEn: 'Recommended Server Hardware',
          text: '• Minimum: 1 vCPU, 2 GB RAM, 25 GB SSD (VPS $4-$6/bulan di Hetzner, DigitalOcean, Linode, atau Vultr).\n• Disarankan untuk tim aktif: 2 vCPU, 4 GB RAM, 50 GB SSD.\n• Sistem Operasi: Ubuntu 22.04/24.04 LTS atau Debian 12.',
          textEn: '• Minimum: 1 vCPU, 2 GB RAM, 25 GB SSD ($4-$6/mo VPS on Hetzner, DigitalOcean, Linode, or Vultr).\n• Recommended for active teams: 2 vCPU, 4 GB RAM, 50 GB SSD.\n• OS: Ubuntu 22.04/24.04 LTS or Debian 12.',
        },
        {
          id: 'health-probes',
          heading: 'Health & Readiness Probes',
          headingEn: 'Health & Readiness Probes',
          text: 'Pantau kesehatan service menggunakan endpoint standar industri:',
          textEn: 'Monitor application runtime health using standard container endpoints:',
          code: '# Liveness probe (HTTP 200 saat proses aktif):\ncurl -f http://localhost:8080/healthz\n\n# Readiness probe (HTTP 200 saat database & koneksi siap):\ncurl -f http://localhost:8080/readyz',
          codeLang: 'bash',
        },
        {
          id: 'backup-restore',
          heading: 'Backup & Restore 1-Langkah',
          headingEn: '1-Step Automated Backup & Restore',
          text: 'Cuan menyertakan skrip otomatis untuk mencadangkan database dan berkas konfigurasi dengan aman:',
          textEn: 'Cuan provides production-grade scripts to snapshot and restore your data atomically:',
          code: '# Buat snapshot backup:\n./scripts/backup.sh\n\n# Pulihkan dari snapshot cadangan terbaru:\n./scripts/restore.sh --latest --force',
          codeLang: 'bash',
          note: 'Database PostgreSQL dan direktori /app/data dicadangkan secara atomik tanpa downtime.',
          noteEn: 'PostgreSQL database and workspace storage are snapshotted atomically without downtime.',
        },
      ],
    },
  },
]
