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
      intro: 'Cuan didesain agar mudah dioperasikan oleh siapa pun, bahkan tanpa latar belakang developer. Di server VPS pribadi atau komputer lokal, Cuan berjalan di atas Docker yang terisolasi lengkap dengan database PostgreSQL.',
      introEn: 'Cuan is designed for effortless deployment by anyone, with or without developer background. On a VPS or local machine, Cuan runs on isolated Docker containers bundled with PostgreSQL.',
      subsections: [
        {
          id: 'auto-install',
          heading: 'Opsi 1: 1-Line VPS Auto-Installer (Otomatis Docker & SSL)',
          headingEn: 'Option 1: 1-Line VPS Auto-Installer (Automated Docker & SSL)',
          text: 'Cara paling praktis untuk server Linux (Ubuntu/Debian). Skrip ini otomatis menyiapkan Docker, database PostgreSQL, dan mengonfigurasi Cuan tanpa perlu setting file manual:',
          textEn: 'The easiest way for Linux VPS (Ubuntu/Debian). Automatically prepares Docker, PostgreSQL, and initializes Cuan without manual config editing:',
          code: 'curl -fsSL https://cuan.work/install.sh | bash',
          codeLang: 'bash',
          note: 'Jika Anda sudah memiliki subdomain, langsung tambahkan flag --domain dan --email agar SSL otomatis terpasang (lihat panduan Domain di bawah).',
          noteEn: 'If you already have a custom domain, pass the --domain and --email flags to auto-provision SSL (see Domain guide below).',
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
          id: 'from-source',
          heading: 'Opsi 3: Build dari Source (Developer)',
          headingEn: 'Option 3: Build from Source (Developers)',
          text: 'Bagi pengembang yang ingin berkontribusi atau mengkustomisasi backend Go dan frontend React:',
          textEn: 'For developers who want to contribute or customize the Go backend and React frontend:',
          code: 'git clone https://github.com/buchin/cuan.git\ncd cuan\ngo run ./cmd/server',
          codeLang: 'bash',
        },
        {
          id: 'domain-setup',
          heading: 'Menghubungkan Domain Pribadi (cuan.bisnisanda.com)',
          headingEn: 'Connecting Your Custom Domain (cuan.yourbusiness.com)',
          text: 'Agar Cuan online 24 jam dan dapat diakses oleh Anda serta staf dari HP maupun laptop di mana saja, hubungkan server VPS Anda ke subdomain pribadi:\n\n1. Buka DNS Management domain Anda (Cloudflare, Niagahoster, Domainesia, Namecheap, dsb).\n2. Tambahkan A Record:\n   • Name / Host: cuan (atau app)\n   • Target IP: IP Server VPS Anda\n   • TTL: Auto (atau Proxy ON jika menggunakan Cloudflare)\n\n3. Hubungkan domain sesuai metode instalasi yang Anda gunakan:',
          textEn: 'To keep Cuan online 24/7 and accessible to you and your team from mobile or laptop anywhere, connect your VPS server to your custom subdomain:\n\n1. Open your DNS provider dashboard (Cloudflare, Namecheap, GoDaddy, etc.).\n2. Add an A Record:\n   • Name / Host: cuan (or app)\n   • Target IP: Your VPS IP Address\n   • TTL: Auto (or Proxy ON for Cloudflare)\n\n3. Connect your domain using your preferred deployment method:',
          code: '# Cara A: Otomatis 1-Baris dengan installer (Docker + Caddy SSL otomatis):\ncurl -fsSL https://cuan.work/install.sh | bash -s -- --domain cuan.bisnisanda.com --email anda@bisnisanda.com\n\n# Cara B: Jika menjalankan Docker Compose manual (aktifkan Caddy proxy profile):\nCUAN_DOMAIN=cuan.bisnisanda.com ACME_EMAIL=anda@bisnisanda.com docker compose --profile proxy up -d\n\n# Cara C: Jika menggunakan Cloudflare Tunnel (tanpa buka port 80/443):\n# Arahkan Public Hostname Cloudflare Tunnel langsung ke http://localhost:8080',
          codeLang: 'bash',
          note: 'Setelah selesai, buka https://cuan.bisnisanda.com. Sambungan HTTPS dengan gembok hijau langsung aktif dan siap digunakan tim!',
          noteEn: 'Once completed, navigate to https://cuan.yourbusiness.com. HTTPS with a green padlock is live and ready for your team!',
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
    title: 'Inbox & Live Chat Pelanggan',
    titleEn: 'Customer Inbox & Live Chat',
    icon: 'MessageSquare',
    summary: 'Kelola chat pengunjung website dengan widget instan dan asisten AI otonom.',
    summaryEn: 'Manage website customer conversations with instant live chat and autonomous AI.',
    content: {
      intro: 'Ubah interaksi obrolan pengunjung menjadi aksi terstruktur. Tim Anda dan Asisten AI dapat menjawab pertanyaan pelanggan dari satu antarmuka terpadu yang tenang dan bebas gangguan.',
      introEn: 'Transform visitor interactions into structured business workflows. Your team and AI assistants handle customer queries from one calm, noise-free unified interface.',
      subsections: [
        {
          id: 'chat-widget',
          heading: '1. Widget Live Chat Website (1 Baris Kode)',
          headingEn: '1. Website Live Chat Widget (1-Line Snippet)',
          text: 'Salin satu baris kode script berikut ke HTML landing page atau toko online Anda untuk mengaktifkan live chat instan yang terhubung langsung ke Inbox Cuan:',
          textEn: 'Embed this lightweight snippet into your website or storefront HTML to connect visitors directly to your Cuan Inbox:',
          code: '<script src="https://your-cuan-domain.com/chat/widget.js" data-cuan-token="TOKEN_ANDA" async></script>',
          codeLang: 'html',
          note: 'Token widget dapat Anda ambil langsung di Settings > Integrations pada dashboard Cuan.',
          noteEn: 'You can generate and copy your widget token directly from Settings > Integrations in your Cuan dashboard.',
        },
        {
          id: 'ai-triage',
          heading: '2. Respon Otomatis & Auto-Whisper (@agent Mention)',
          headingEn: '2. Autonomous AI Triage & Auto-Whisper (@agent Mention)',
          text: 'Di ruang chat pelanggan, default pesan selalu terkirim langsung ke pelanggan secara publik. Saat Anda mengetik mention @cuan atau nama asisten AI, composer secara otomatis beralih ke mode bisikan internal (whisper) dengan indikator visual kuning yang jelas, sehingga instruksi internal tidak akan pernah bocor ke pelanggan.',
          textEn: 'In customer chat rooms, messages default to public replies. When typing an @agent mention (such as @cuan), composer automatically switches to internal whisper mode with clear visual indicators, ensuring internal instructions never leak to visitors.',
        },
        {
          id: 'human-approval',
          heading: '3. Alur Persetujuan Draf Jawaban (Human-in-the-Loop)',
          headingEn: '3. Visitor Reply Draft Approval (Human-in-the-Loop)',
          text: 'Asisten AI dapat menyusun draf balasan untuk pertanyaan kompleks. Staf manusia dapat memeriksa draf tersebut dalam satu klik sebelum pesan benar-benar terkirim ke pengunjung.',
          textEn: 'AI assistants can draft high-quality answers for complex inquiries. Human staff can inspect and approve the draft with a single click before delivery.',
          note: 'Catatan Roadmap: Integrasi saluran perpesanan pihak ketiga (seperti WhatsApp Gateway) saat ini dalam tahap pengujian ketahanan internal dan akan dirilis resmi setelah lolos uji produksi.',
          noteEn: 'Roadmap Note: Third-party messaging integrations (such as WhatsApp Gateway) are currently in internal resilience testing and will be officially released once fully proven.',
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
          id: 'domain-ssl',
          heading: 'Opsi Domain, SSL Otomatis & Cloudflare Tunnel',
          headingEn: 'Custom Domains, Automated SSL & Cloudflare Tunnel',
          text: 'Cuan mendukung fleksibilitas penuh untuk berbagai topologi jaringan server:\n\n• Caddy Otomatis (Standalone): Caddy bawaan langsung mengurus port 80/443 serta perpanjangan sertifikat SSL Let\'s Encrypt secara otomatis tanpa intervensi manual.\n• Cloudflare Tunnel (Tanpa Buka Port): Jika tidak ingin membuka port 80/443 di VPS publik, pasang cloudflared tunnel yang mengarahkan subdomain Anda langsung ke http://localhost:8080.\n• Nginx / Reverse Proxy Host: Jika VPS Anda sudah menjalankan Nginx, gunakan opsi --existing-proxy dan teruskan proxy_pass ke port 8080.',
          textEn: 'Cuan provides full flexibility for various deployment architectures:\n\n• Automated Caddy (Standalone): Native Caddy manages ports 80/443 and auto-renews Let\'s Encrypt SSL certificates seamlessly.\n• Cloudflare Tunnel (Zero Open Ports): To avoid exposing open ports on your VPS, run a cloudflared tunnel forwarding your subdomain straight to http://localhost:8080.\n• Existing Nginx / Traefik: If your server already runs a reverse proxy, pass --existing-proxy and point proxy_pass to port 8080.',
          code: '# Contoh menjalankan dengan Nginx / reverse proxy yang sudah ada:\ncurl -fsSL https://cuan.work/install.sh | bash -s -- --existing-proxy',
          codeLang: 'bash',
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
