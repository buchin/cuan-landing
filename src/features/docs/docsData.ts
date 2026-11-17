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
    summary: 'Pasang Cuan di server VPS atau komputer lokal dalam waktu kurang dari 3 menit.',
    summaryEn: 'Deploy Cuan on your VPS or local machine in under 3 minutes.',
    content: {
      intro: 'Cuan didesain agar bisa dijalankan oleh siapa pun tanpa keahlian coding. Anda hanya butuh server murah (tersedia mulai Rp 10.000-an/bulan) dan satu alamat subdomain (misalnya: cuan.bisnisanda.com). Dalam hitungan detik, Cuan langsung aktif dan siap digunakan oleh tim Anda.',
      introEn: 'Cuan is engineered for anyone to deploy without coding skills. All you need is an entry-level server (starting at ~$1/mo) and a custom subdomain (e.g. cuan.yourbusiness.com). Within seconds, Cuan is live and ready for your team.',
      subsections: [
        {
          id: 'auto-install',
          heading: '1. Instalasi Otomatis 1-Baris (Direkomendasikan)',
          headingEn: '1. 1-Line Automated Installer (Recommended)',
          text: 'Cara tercepat dan paling praktis untuk server Linux (Ubuntu atau Debian). Perintah ini otomatis menyiapkan seluruh kebutuhan sistem, database, dan aplikasi tanpa perlu mengedit file pengaturan sama sekali:\n\n• **Otomatis dengan Domain & SSL**: Masukkan subdomain dan email Anda agar gembok hijau HTTPS langsung terpasang otomatis.\n• **Tanpa Konfigurasi Manual**: Sistem mendeteksi kebutuhan server secara mandiri.',
          textEn: 'The fastest, easiest path for Linux VPS (Ubuntu or Debian). Automatically sets up system dependencies, database, and application without manual configuration:\n\n• **Automatic Domain & SSL**: Provide your subdomain and email to auto-provision green-padlock HTTPS certificates.\n• **Zero Manual Config**: The installer self-detects environment requirements.',
          code: 'curl -fsSL https://cuan.work/install.sh | bash -s -- --domain cuan.bisnisanda.com --email anda@bisnisanda.com',
          codeLang: 'bash',
          note: '💡 Belum punya domain atau ingin mencoba di komputer sendiri? Jalankan tanpa parameter: `curl -fsSL https://cuan.work/install.sh | bash` lalu buka `http://localhost:8080` di browser Anda.',
          noteEn: '💡 Testing locally or without a domain yet? Simply run without flags: `curl -fsSL https://cuan.work/install.sh | bash` then open `http://localhost:8080` in your browser.',
        },
        {
          id: 'docker',
          heading: '2. Instalasi Mandiri via Docker Compose',
          headingEn: '2. Manual Deployment via Docker Compose',
          text: 'Bagi Anda yang terbiasa mengelola file container sendiri di server atau komputer pribadi:\n\n• **Unduh & Jalankan**: Ambil file konfigurasi resmi dan jalankan layanan Cuan di latar belakang.',
          textEn: 'For users who prefer managing container files directly on their server or local machine:\n\n• **Download & Run**: Fetch the official configuration and run Cuan services in the background.',
          code: 'curl -fsSL https://cuan.work/docker-compose.yml -o docker-compose.yml\ndocker compose up -d',
          codeLang: 'bash',
          note: 'Setelah container menyala, buka `http://localhost:8080` (atau `http://IP-SERVER:8080`) di browser untuk melanjutkan ke aktivasi akun Pemilik pertama.',
          noteEn: 'Once containers are running, navigate to `http://localhost:8080` (or `http://SERVER-IP:8080`) to complete initial Owner account setup.',
        },
        {
          id: 'domain-setup',
          heading: '3. Menghubungkan Domain Pribadi (cuan.bisnisanda.com)',
          headingEn: '3. Connecting Your Custom Subdomain',
          text: 'Agar Cuan online 24 jam dan dapat diakses oleh Anda serta staf dari HP maupun laptop di mana saja:\n\n1. **Buka Pengaturan DNS** domain Anda (di Cloudflare, Niagahoster, Domainesia, Namecheap, dsb).\n2. **Tambahkan A Record**:\n   • **Nama / Host**: `cuan` (atau `app`)\n   • **Alamat IP**: Masukkan IP Server VPS Anda\n3. **Buka Browser**: Kunjungi `https://cuan.bisnisanda.com`. Sambungan aman dengan gembok hijau HTTPS sudah aktif otomatis!',
          textEn: 'To keep Cuan online 24/7 and accessible to you and your team from mobile or laptop anywhere:\n\n1. **Open DNS Settings** in your provider dashboard (Cloudflare, Namecheap, Niagahoster, etc.).\n2. **Add an A Record**:\n   • **Name / Host**: `cuan` (or `app`)\n   • **IP Target**: Enter your VPS server IP address\n3. **Open Browser**: Navigate to `https://cuan.yourbusiness.com`. Secure green-padlock HTTPS is automatically active!',
          note: '💡 **Trik Hemat Biaya**: Menggunakan server murah tanpa IP publik langsung (VPS NAT Rp 10.000-an/bln) atau server rumah? Anda bisa menghubungkan domain secara gratis lewat Cloudflare Tunnel tanpa perlu buka port sama sekali. Lihat panduan lengkapnya di bab Pemeliharaan & Update.',
          noteEn: '💡 **Ultra-Budget Tip**: Running on an ultra-cheap NAT VPS (~$1/mo) or home server behind CGNAT? Connect your domain freely via Cloudflare Tunnel without opening any public ports. See the complete guide in the Maintenance section.',
        },
        {
          id: 'first-setup',
          heading: '4. Aktivasi Akun Pemilik (Owner Onboarding)',
          headingEn: '4. Owner Account Activation',
          text: 'Saat membuka Cuan untuk pertama kali, layar akan menyambut Anda dengan formulir aktivasi akun utama:\n\n1. **Masukkan Identitas**: Tuliskan nama lengkap, email, dan kata sandi yang aman.\n2. **Akun Superadmin**: Akun pertama ini otomatis menjadi Pemilik Utama (Owner) dengan hak akses penuh atas seluruh pengaturan dan kunci AI.\n3. **Masuk ke Dashboard**: Anda langsung diarahkan ke ruang kerja utama Cuan yang bersih dan siap digunakan.',
          textEn: 'When opening Cuan for the first time, you will be greeted with the primary account setup screen:\n\n1. **Enter Details**: Input your full name, email, and a secure password.\n2. **Superadmin Status**: This first account automatically becomes the Business Owner with complete control over settings and AI keys.\n3. **Access Workspace**: You are redirected directly to your clean, production-ready Cuan workspace.',
        },
        {
          id: 'troubleshooting',
          heading: '5. Kendala Umum & Solusi Cepat (Troubleshooting)',
          headingEn: '5. Common Issues & Quick Solutions',
          text: '• **Domain belum bisa dibuka atau gembok HTTPS belum muncul?**\n  Penyebaran DNS biasanya butuh waktu 1–5 menit. Pastikan port 80 dan 443 terbuka di firewall server Anda (jalankan: `sudo ufw allow 80/tcp && sudo ufw allow 443/tcp`).\n\n• **Bagaimana cara memastikan Cuan aktif berjalan?**\n  Jalankan perintah: `docker compose ps`. Pastikan status aplikasi dan database berstatus "Up" atau "healthy".\n\n• **Ingin memindahkan Cuan ke server baru?**\n  Jalankan `./scripts/backup.sh`, salin file arsip dari folder `backups/` ke server baru, lalu jalankan `./scripts/restore.sh --latest --force`. Seluruh data, database, dan akun pulih utuh 100%.',
          textEn: '• **Domain unreachable or green HTTPS padlock missing?**\n  DNS propagation typically takes 1–5 minutes. Ensure ports 80 and 443 are open in your firewall (run: `sudo ufw allow 80/tcp && sudo ufw allow 443/tcp`).\n\n• **How to verify that Cuan is actively running?**\n  Run: `docker compose ps`. Ensure application and database containers report healthy status.\n\n• **How to migrate Cuan to a new server?**\n  Run `./scripts/backup.sh`, copy the backup archive from `backups/` to your new server, then run `./scripts/restore.sh --latest --force`. All data, conversations, and accounts are restored 100% loss-free.',
        },
      ],
    },
  },
  {
    slug: 'ai-providers',
    title: 'Menghubungkan Mesin AI',
    titleEn: 'Connecting AI Providers',
    icon: 'Cpu',
    summary: 'Gunakan langganan bulanan resmi tanpa biaya token atau pasang model AI apa saja sesuai anggaran bisnis.',
    summaryEn: 'Use flat monthly subscriptions with zero markup or connect any AI model at cost-efficient rates.',
    content: {
      intro: 'Cuan memberi Anda kebebasan penuh dalam memilih otak kecerdasan buatan. Anda bisa memanfaatkan akun langganan bulanan resmi yang sudah Anda miliki (Claude Pro, ChatGPT Plus) tanpa biaya token tambahan, atau menghubungkan penyedia model AI apa pun di dunia dengan tarif hemat sesuai kebutuhan bisnis Anda.',
      introEn: 'Cuan gives you complete freedom to choose your AI intelligence. Use your existing flat monthly subscriptions (Claude Pro, ChatGPT Plus) with zero token markups, or connect any global model provider at cost-efficient rates tailored to your business.',
      subsections: [
        {
          id: 'cli-subscription',
          heading: '1. Langganan Bulanan Resmi (Tanpa Biaya Token Tambahan)',
          headingEn: '1. Flat Monthly Subscriptions (Zero Token Markups)',
          text: 'Jika Anda sudah berlangganan Claude Pro/Team, ChatGPT Plus/Team, atau Google Gemini Advanced, Anda tidak perlu lagi membeli saldo token API terpisah:\n\n1. **Buka Menu Settings > AI Providers** di dashboard Cuan.\n2. **Pilih Layanan Anda**: Klik Claude Code, ChatGPT CLI, atau Antigravity.\n3. **Login Resmi 1 Kali**: Ikuti tautan otentikasi resmi dari penyedia.\n4. **Siap Digunakan**: Asisten AI langsung aktif menggunakan kuota wajar langganan bulanan Anda.',
          textEn: 'If you already subscribe to Claude Pro/Team, ChatGPT Plus/Team, or Google Gemini Advanced, you never need to purchase per-token API credits:\n\n1. **Open Settings > AI Providers** in your Cuan dashboard.\n2. **Select Your Service**: Click Claude Code, ChatGPT CLI, or Antigravity.\n3. **Complete 1-Time Official Login**: Follow the provider\'s official authentication URL.\n4. **Ready to Work**: AI assistants immediately utilize your standard subscription quota.',
          note: '💡 **Pilihan Terhemat**: Solusi favorit agensi dan solopreneur karena biaya bulanan AI menjadi tetap dan terprediksi tanpa kaget melihat tagihan token.',
          noteEn: '💡 **Cost-Predictable**: A favorite for agencies and solopreneurs because AI overhead remains fixed and predictable without billing surprises.',
        },
        {
          id: 'universal-byok',
          heading: '2. Pasang Kunci API Sendiri (Bebas Pilih Model Apa Saja)',
          headingEn: '2. Bring Your Own Key: Universal Model Compatibility',
          text: 'Cuan mendukung protokol universal standar industri. Artinya, Anda bisa memasang kunci API dari penyedia mana pun di dunia tanpa terkunci pada satu vendor:\n\n• **Penyedia AI Global**: OpenAI (GPT-4o, o3-mini), Anthropic (Claude 3.7 Sonnet), Google Gemini (Gemini 2.5 Pro & Flash), xAI (Grok), dan DeepSeek (V3 & R1).\n• **Penyedia Super Hemat & Cepat**: Groq (kecepatan kilat) atau OpenRouter (akses ratusan model dalam 1 saldo).\n• **Model AI Offline Gratis di Komputer Sendiri**: Ollama, LM Studio, atau LocalAI (100% gratis, data rahasia tidak pernah keluar dari server pribadi Anda).',
          textEn: 'Cuan implements universal industry protocols. Connect API keys from any provider globally without vendor lock-in:\n\n• **Global AI Providers**: OpenAI (GPT-4o, o3-mini), Anthropic (Claude 3.7 Sonnet), Google Gemini (Gemini 2.5 Pro & Flash), xAI (Grok), and DeepSeek (V3 & R1).\n• **Ultra-Fast & Budget Providers**: Groq (ultra-high speed) or OpenRouter (hundreds of models on one balance).\n• **Free Offline Models on Your Machine**: Ollama, LM Studio, or LocalAI (100% free, confidential data never leaves your private machine).',
        },
        {
          id: 'custom-endpoints',
          heading: '3. Cara Memasang Penyedia AI Kustom (Custom Endpoint)',
          headingEn: '3. Connecting Custom Endpoints & Local Models',
          text: 'Ingin menghubungkan OpenRouter, Groq, atau model Ollama di laptop Anda? Cukup isi 3 kolom di menu Settings > AI Providers:\n\n1. **API Key**: Masukkan kunci rahasia Anda (kosongkan jika memakai Ollama lokal).\n2. **Alamat Endpoint (Base URL)**:\n   • OpenRouter: `https://openrouter.ai/api/v1`\n   • Groq: `https://api.groq.com/openai/v1`\n   • Ollama Komputer Sendiri: `http://localhost:11434/v1`\n3. **Nama Model**: Tuliskan nama model pilihan Anda (misal: `deepseek/deepseek-r1` atau `llama-3.3-70b-versatile`).\n4. **Uji Koneksi**: Klik tombol Uji untuk memastikan respon lancar, lalu Simpan.',
          textEn: 'Connecting OpenRouter, Groq, or a local Ollama model? Simply complete 3 fields in Settings > AI Providers:\n\n1. **API Key**: Enter your secret key (optional for local unauthenticated Ollama).\n2. **Endpoint URL (Base URL)**:\n   • OpenRouter: `https://openrouter.ai/api/v1`\n   • Groq: `https://api.groq.com/openai/v1`\n   • Local Ollama: `http://localhost:11434/v1`\n3. **Model Name**: Enter your model identifier (e.g. `deepseek/deepseek-r1` or `llama-3.3-70b-versatile`).\n4. **Test Connection**: Click Test to verify latency, then Save.',
          note: '💡 **Anti-Ketinggalan Zaman**: Kapan pun ada model AI baru atau penyedia murah yang dirilis esok hari, Anda tidak perlu menunggu update Cuan. Cukup ganti Base URL dan Nama Model!',
          noteEn: '💡 **Future-Proof**: Whenever a breakthrough model or budget provider launches tomorrow, no software updates needed. Simply update the Base URL and Model Name!',
        },
        {
          id: 'security',
          heading: '4. Keamanan Standar Perbankan & Kunci Terlindungi',
          headingEn: '4. Bank-Grade Security & Credential Protection',
          text: 'Keamanan kredensial dan data bisnis Anda adalah prioritas utama:\n\n• **Enkripsi Kuat Standar Bank (AES-256)**: Semua API Key tersimpan dalam bentuk terenkripsi kuat di database server Anda.\n• **Sensor Otomatis di Layar & Log**: Sistem otomatis menyensor karakter kunci rahasia (`[REDACTED]`) agar tidak pernah terekspos di layar maupun rekaman server.\n• **Perlindungan Akses Staf**: Staf operasional (Member) yang Anda undang tidak akan pernah bisa melihat atau mengekspor kunci API milik Anda.',
          textEn: 'Your credentials and business data are defended by default:\n\n• **Bank-Grade Encryption (AES-256)**: All API keys are encrypted at rest inside your private database.\n• **Automatic Screen & Log Masking**: Sensitive keys are masked as `[REDACTED]` in logs and UI displays.\n• **Staff Isolation**: Non-owner staff members can never view, inspect, or export your private API keys.',
        },
      ],
    },
  },
  {
    slug: 'projects-tasks',
    title: 'Proyek & Task Otonom',
    titleEn: 'Projects & Autonomous Tasks',
    icon: 'FolderKanban',
    summary: 'Kelola aset digital bisnis, delegasikan tugas ke Asisten AI, dan setujui hasil kerja nyata.',
    summaryEn: 'Manage business digital assets, delegate work to AI agents, and approve verified deliverables.',
    content: {
      intro: 'Cuan mengubah rencana bisnis dan ide pemasaran Anda menjadi hasil kerja nyata. Kelola aset digital (landing page, toko online, artikel blog, naskah video) dalam bentuk Proyek terstruktur, di mana Asisten AI bekerja mandiri dengan pengawasan penuh dari Anda (Human-in-the-Loop).',
      introEn: 'Cuan transforms business plans and marketing ideas into real deliverables. Manage digital assets (landing pages, online stores, blog articles, video scripts) as structured Projects, where AI agents execute work under your full supervision (Human-in-the-Loop).',
      subsections: [
        {
          id: 'create-project',
          heading: '1. Membuat Proyek Ruang Kerja Baru',
          headingEn: '1. Creating a Dedicated Project Workspace',
          text: 'Setiap produk atau kampanye bisnis Anda memiliki ruang kerja mandiri yang rapi:\n\n1. **Buka Menu Projects** di navigasi kiri, lalu klik `+ New Project`.\n2. **Tuliskan Nama Proyek**: Misalnya "Landing Page Produk Kursus" atau "Katalog Promo Toko".\n3. **Hubungkan Kode (Opsional)**: Anda bisa menautkan repositori GitHub jika ingin hasil kerja otomatis tersimpan rapi.',
          textEn: 'Every product or marketing campaign maintains its own clean workspace:\n\n1. **Open Projects Menu** from the sidebar and click `+ New Project`.\n2. **Enter Project Name**: For example, "Course Sales Page" or "Store Catalog Promo".\n3. **Connect Code Repository (Optional)**: Link a GitHub repository if you want deliverables auto-committed.',
        },
        {
          id: 'agent-delegation',
          heading: '2. Mendelegasikan Tugas ke Asisten AI (@cuan Mention)',
          headingEn: '2. Delegating Tasks to AI Agents (@cuan Mention)',
          text: 'Lupakan mengetik prompt berulang-ulang. Di Cuan, Anda cukup memberikan instruksi kerja seperti berbicara dengan asisten profesional:\n\n• **Contoh Instruksi Nyata**:\n  `@cuan buatkan 3 opsi copywriting sales page yang menonjolkan garansi 30 hari untuk produk ini`\n• **AI Langsung Bekerja**: Asisten AI membaca konteks proyek, menyiapkan draf deliverables, dan mengerjakannya di ruang kerja yang terisolasi.',
          textEn: 'Skip repetitive prompt typing. Delegate directly like speaking to a skilled operational assistant:\n\n• **Real Brief Example**:\n  `@cuan draft 3 high-converting sales copy angles highlighting our 30-day money-back guarantee`\n• **Autonomous Execution**: The AI agent reads project context, prepares deliverable drafts, and works inside an isolated workspace.',
        },
        {
          id: 'human-approval',
          heading: '3. Kendali Penuh di Tangan Anda (Kartu Persetujuan / Approval)',
          headingEn: '3. You Stay in Full Control (Approval Cards)',
          text: 'Asisten AI di Cuan tidak pernah mempublikasikan atau mengubah data bisnis tanpa izin Anda:\n\n1. **Notifikasi Selesai Kerja**: Begitu AI selesai bekerja, panel tugas menampilkan kartu "Needs Approval" dengan ringkasan hasil kerja.\n2. **Periksa Hasil**: Anda bisa membaca teks hasil generate, melihat pratinjau tampilan, atau mengecek perubahannya.\n3. **Klik Setujui (Approve)**: Jika sudah sesuai, klik Setujui. Jika ingin revisi, cukup ketikkan catatan perbaikan Anda.',
          textEn: 'AI assistants in Cuan never deploy or publish changes without your authorization:\n\n1. **Work Completion Notice**: When the AI finishes, the task panel displays a "Needs Approval" card with output proof.\n2. **Review Deliverables**: Inspect generated copy, preview visuals, or verify changes.\n3. **Click Approve**: If satisfied, click Approve. If edits are needed, reply with your feedback.',
          note: '🔒 **Prinsip Bukti Nyata**: Asisten AI di Cuan wajib menyertakan bukti hasil kerja sebelum meminta persetujuan. Anda selalu memegang kendali 100%.',
          noteEn: '🔒 **Zero Hallucination Principle**: AI assistants in Cuan must provide verifiable proof of execution before requesting approval, keeping you in complete control.',
        },
        {
          id: 'quick-win-task',
          heading: '4. Tugas Pertama Anda dalam 2 Menit (Aha! Moment)',
          headingEn: '4. Your First 2-Minute Task (Aha! Moment)',
          text: 'Rasakan langsung kemudahan alur kerja Cuan setelah login pertama:\n\n1. **Buka Proyek Baru**, lalu masuk ke tab Discussions.\n2. **Ketik Perintah Nyata**: `@cuan buatkan 3 opsi headline landing page yang menarik untuk pembeli pemula`.\n3. **Tinjau & Setujui**: Dalam hitungan detik, kartu Needs Approval muncul di panel samping. Baca hasilnya dan klik Approve!\n\nHanya dalam 2 menit, Anda sudah merasakan bagaimana tim manusia dan kecerdasan buatan berkolaborasi nyata tanpa ribet.',
          textEn: 'Experience the immediate value of Cuan automation right after setup:\n\n1. **Open New Project**, then navigate to the Discussions tab.\n2. **Type a Real Brief**: `@cuan generate 3 landing page headline options targeting first-time buyers`.\n3. **Review & Approve**: In seconds, the Needs Approval card appears in the side drawer. Inspect the copy and click Approve!\n\nIn just 2 minutes, experience real human-AI collaboration without prompt engineering friction.',
        },
      ],
    },
  },
  {
    slug: 'inbox',
    title: 'Inbox & Live Chat Pelanggan',
    titleEn: 'Customer Inbox & Live Chat',
    icon: 'MessageSquare',
    summary: 'Kelola percakapan pengunjung website dengan widget instan dan asisten AI otonom.',
    summaryEn: 'Manage website visitor conversations with instant live chat and autonomous AI assistance.',
    content: {
      intro: 'Ubah pengunjung website menjadi pembeli setia. Cuan menyediakan widget live chat ringan untuk website toko online Anda, di mana Anda, staf, dan asisten AI bekerja bersama dari satu kotak masuk (inbox) yang tenang dan terpadu.',
      introEn: 'Turn website visitors into loyal customers. Cuan provides a lightweight live chat widget for your storefront, where you, your staff, and AI assistants collaborate from one calm, unified inbox.',
      subsections: [
        {
          id: 'chat-widget',
          heading: '1. Pasang Widget Live Chat di Website (1 Baris Kode)',
          headingEn: '1. 1-Line Website Live Chat Widget',
          text: 'Salin satu baris kode script berikut dan tempelkan ke HTML website, tema WordPress, blog Ghost, atau toko online Anda:',
          textEn: 'Embed this lightweight script snippet into your landing page HTML, WordPress theme, Ghost blog, or custom storefront:',
          code: '<script src="https://cuan.bisnisanda.com/chat/widget.js" data-product="nama-website-anda" defer></script>',
          codeLang: 'html',
          note: '💡 **Ringan & Kencang**: Kode ini bisa Anda ambil langsung dari menu Settings > Integrations di Cuan. Ukurannya super ringan (< 15KB) sehingga kecepatan loading website Anda tetap kencang 100%.',
          noteEn: '💡 **Lightweight**: Copy this snippet directly from Settings > Integrations in Cuan. The bundle is under 15KB with zero impact on your site speed.',
        },
        {
          id: 'auto-whisper',
          heading: '2. Bisikan Rahasia Bot (@cuan Whisper Mode)',
          headingEn: '2. Private AI Coaching (@cuan Whisper Mode)',
          text: 'Di ruang percakapan dengan pelanggan, Cuan menjaga agar rahasia internal bisnis Anda tidak pernah bocor:\n\n• **Ketik Pesan Biasa**: Terkirim langsung ke layar pengunjung website.\n• **Ketik Mention @cuan**: Kotak chat otomatis beralih ke Mode Bisikan Internal (latar kuning lembut).\n• **Bimbingan Staf**: AI akan memberikan rekomendasi jawaban terbaik kepada staf Anda secara rahasia tanpa pernah terlihat oleh pengunjung website.',
          textEn: 'Inside customer chat rooms, Cuan safeguards your private internal operations:\n\n• **Standard typing**: Delivered publicly to the website visitor.\n• **Typing an @agent mention (like @cuan)**: Composer automatically switches to internal Whisper mode with a calm yellow indicator.\n• **Staff Coaching**: The AI analyzes customer intent and coaches your team on the best response, completely invisible to the visitor.',
        },
        {
          id: 'reply-draft',
          heading: '3. Draf Balasan Otomatis yang Terverifikasi',
          headingEn: '3. Verified AI Reply Drafts',
          text: 'Ketika pelanggan menanyakan hal teknis atau rekomendasi produk, AI dapat menyusun draf balasan yang siap pakai:\n\n1. **AI Menyusun Draf**: Kartu rekomendasi balasan muncul di layar obrolan.\n2. **Pemeriksaan Cepat**: Staf Anda membaca kalimat yang disarankan.\n3. **Kirim Sekali Klik**: Klik tombol Kirim untuk langsung membalas pelanggan, atau ubah kata-katanya terlebih dahulu sesuai gaya komunikasi toko Anda.',
          textEn: 'When visitors ask complex product questions, the AI assistant prepares polished response drafts:\n\n1. **AI Draft Generation**: A suggested reply card appears directly inside the conversation stream.\n2. **Quick Review**: Your team verifies the recommended response.\n3. **1-Click Dispatch**: Click Send Reply to respond instantly, or edit phrasing to match your brand voice.',
          note: 'Catatan Roadmap: Integrasi saluran percakapan tambahan (seperti WhatsApp Gateway resmi) saat ini sedang dalam tahap uji ketahanan produksi dan akan segera dirilis.',
          noteEn: 'Roadmap Note: Additional communication channels (such as an official WhatsApp Gateway) are undergoing production resilience testing and will be officially released soon.',
        },
      ],
    },
  },
  {
    slug: 'team',
    title: 'Kolaborasi Tim & Hak Akses',
    titleEn: 'Team Collaboration & Access Control',
    icon: 'Users',
    summary: 'Atur wewenang Pemilik vs Staf, undang tim lewat tautan WhatsApp tanpa ribet.',
    summaryEn: 'Organize Owner vs Staff permissions, invite team members via WhatsApp effortlessly.',
    content: {
      intro: 'Ajak tim, staf admin, atau asisten virtual bekerja bersama di Cuan dengan pembagian wewenang yang tegas demi menjaga kerahasiaan kunci API dan data bisnis Anda.',
      introEn: 'Invite your team, administrative staff, or virtual assistants into Cuan with clear permission boundaries to safeguard your API credentials and business assets.',
      subsections: [
        {
          id: 'rbac-roles',
          heading: '1. Perbedaan Wewenang: Pemilik (Owner) vs Staf (Member)',
          headingEn: '1. Roles & Permissions: Owner vs Staff Member',
          text: 'Cuan membagi peran secara sederhana dan jelas agar tidak membingungkan:\n\n• **Pemilik (Owner)**: Pemilik bisnis yang memiliki kendali mutlak — mengatur kunci AI, melihat biaya penggunaan, mengundang atau menghapus staf, dan mengatur integrasi.\n• **Staf (Member)**: Admin atau asisten operasional yang bertugas membalas chat pelanggan, mengerjakan tugas harian, dan meminta bantuan AI — tanpa pernah bisa melihat atau menyalin kunci API rahasia milik Pemilik.',
          textEn: 'Cuan keeps roles clean, intuitive, and secure:\n\n• **Owner (Business Owner)**: Full administrative authority — manages AI providers, monitors usage, invites or removes team members, and configures integrations.\n• **Member (Staff / Virtual Assistant)**: Daily execution — responds to customer inquiries, manages tasks, and delegates to AI assistants, strictly prohibited from inspecting or exporting secret AI credentials.',
        },
        {
          id: 'instant-invite',
          heading: '2. Undang Tim Lewat WhatsApp (Tanpa Setting Email Ribet)',
          headingEn: '2. 1-Click WhatsApp Invites (No Email Setup Needed)',
          text: 'Anda tidak perlu menyewa layanan email berbayar atau pusing mengatur server pengiriman email:\n\n1. **Buka Menu Team** di Cuan, lalu klik tombol `+ Invite Member`.\n2. **Tuliskan Nama & Email Staf Anda**.\n3. **Salin Tautan Undangan**: Sistem otomatis membuat tautan rahasia unik (berlaku aman selama 7 hari).\n4. **Kirim via WhatsApp / Telegram**: Bagikan tautan ke staf Anda.\n5. **Staf Langsung Masuk**: Staf cukup mengklik tautan tersebut, menentukan kata sandi mereka sendiri, dan langsung siap bekerja.',
          textEn: 'No need to subscribe to transactional email providers or configure complicated DNS records:\n\n1. **Open Team Menu** in Cuan and click `+ Invite Member`.\n2. **Enter Name & Email** of your team member.\n3. **Copy Secret Invite Link**: Cuan generates a cryptographically secure invite link valid for 7 days.\n4. **Send via WhatsApp / Telegram**: Share the link directly with your team.\n5. **Immediate Onboarding**: The recipient clicks the link, sets their own password, and immediately enters the workspace.',
        },
      ],
    },
  },
  {
    slug: 'self-hosting',
    title: 'Pemeliharaan, Backup & Update',
    titleEn: 'Maintenance, Backups & Updates',
    icon: 'Server',
    summary: 'Rekomendasi server, cadangan data 1-klik, trik hemat biaya VPS NAT, dan update versi.',
    summaryEn: 'Recommended server specs, 1-click backups, ultra-budget NAT VPS guide, and upgrades.',
    content: {
      intro: 'Cuan dirancang sebagai aplikasi mandiri yang sangat hemat sumber daya. Server minimal dengan spesifikasi rendah sudah lebih dari cukup untuk melayani operasional bisnis, staf, dan otomasi AI Anda selama 24 jam penuh.',
      introEn: 'Cuan is engineered as a lightweight, self-contained application. A budget server is more than enough to power daily business operations, team collaboration, and 24/7 AI automation.',
      subsections: [
        {
          id: 'vps-specs',
          heading: '1. Rekomendasi Spesifikasi Server',
          headingEn: '1. Recommended Server Hardware',
          text: '• **Spesifikasi Hemat (Mulai Rp 10.000–Rp 50.000/bln)**: 1 vCPU, 1 GB RAM, 15 GB SSD (Sangat cukup untuk solopreneur dan toko online pemula).\n• **Spesifikasi Disarankan (Untuk Agensi / Tim Aktif)**: 2 vCPU, 2–4 GB RAM, 30 GB SSD.\n• **Sistem Operasi**: Ubuntu 22.04 LTS, Ubuntu 24.04 LTS, atau Debian 12.',
          textEn: '• **Budget Tier (Starting at ~$1–$4/mo)**: 1 vCPU, 1 GB RAM, 15 GB SSD (Sufficient for solopreneurs and small storefronts).\n• **Recommended Tier (For Active Teams / Agencies)**: 2 vCPU, 2–4 GB RAM, 30 GB SSD.\n• **Operating System**: Ubuntu 22.04 LTS, Ubuntu 24.04 LTS, or Debian 12.',
        },
        {
          id: 'backup-restore',
          heading: '2. Cadangkan & Pulihkan Data 1-Klik (Backup & Restore)',
          headingEn: '2. 1-Click Automated Backup & Restore',
          text: 'Seluruh data proyek, obrolan pelanggan, dan pengaturan Anda dapat dicadangkan secara instan dan aman tanpa downtime:\n\n• **Buat File Cadangan**: Menghasilkan satu file arsip rapi di folder `backups/`.\n• **Pulihkan Kapan Saja**: Mengembalikan seluruh sistem ke kondisi persis seperti saat dicadangkan.',
          textEn: 'Snapshot and restore your entire database, workspace data, and customer conversations atomically without downtime:\n\n• **Create Backup Snapshot**: Generates an archive file inside the `backups/` folder.\n• **Instant Recovery**: Restore the complete system loss-free with one command.',
          code: '# Buat cadangan data lengkap ke folder backups/:\n./scripts/backup.sh\n\n# Pulihkan seluruh data dari file cadangan terbaru:\n./scripts/restore.sh --latest --force',
          codeLang: 'bash',
          note: '💡 Setiap file backup diberi stempel tanggal rapi sehingga mudah disimpan atau dipindahkan ke Google Drive / komputer pribadi.',
          noteEn: '💡 Every backup archive is timestamped and integrity-verified for seamless archiving or remote offsite storage.',
        },
        {
          id: 'update-cuan',
          heading: '3. Memperbarui Cuan ke Versi Terbaru',
          headingEn: '3. Upgrading Cuan Safely',
          text: 'Pembaruan Cuan bersifat aman dan tidak menghapus data obrolan, proyek, maupun pengaturan Anda:\n\n• **Jika Menggunakan Skrip Installer**: Skrip otomatis membuat backup pengaman sebelum memperbarui sistem.\n• **Jika Menggunakan Docker Mandiri**: Cukup unduh versi terbaru dan jalankan kembali.',
          textEn: 'Cuan updates are non-destructive, preserving all your projects, conversations, and settings:\n\n• **Automated Installer**: Automatically creates a pre-upgrade safety backup and supports instant rollback.\n• **Manual Docker Compose**: Pull the latest images and restart containers.',
          code: '# Update otomatis dengan backup pengaman:\n./scripts/update.sh --version 0.9.0\n\n# Atau jika menggunakan Docker Compose manual:\ndocker compose pull && docker compose up -d',
          codeLang: 'bash',
        },
        {
          id: 'budget-nat-vps',
          heading: '4. Trik Hemat Biaya: Menjalankan Cuan di VPS NAT (Rp 10.000–Rp 25.000/bln)',
          headingEn: '4. Ultra-Budget Strategy: NAT VPS (~$1/mo) with Cloudflare Tunnel',
          text: 'Bagi Anda yang ingin menekan biaya server serendah mungkin, Anda bisa memanfaatkan penyedia VPS NAT (seperti Helipod, SumoPod, Dahono, HostData, atau Cloudra) yang banyak tersedia di Indonesia dengan harga mulai Rp 10.000 per bulan.\n\n**Karakteristik & Solusi VPS NAT**:\n• **Kenapa Murah?** 1 alamat IP publik digunakan bersama oleh puluhan pengguna, menghemat biaya sewa IP publik yang mahal.\n• **Keterbatasan Port**: VPS NAT tidak memiliki akses langsung port 80/443. Akses SSH diberikan lewat port khusus (misal: `ssh -p 22022 root@IP`).\n• **Apakah Cuan Kuat?** Sangat kuat! Cuan berbasis Go yang hemat memori (idle RAM hanya ~30-50MB), sehingga server RAM 1GB (atau 512MB + Swap) sangat stabil.\n\n**Cara Menghubungkan Domain & SSL Gratis (Cloudflare Tunnel)**:\n1. **Login SSH** ke server menggunakan port yang diberikan provider Anda.\n2. **Aktifkan Swap 1GB** agar proses instalasi lancar:\n   `fallocate -l 1G /swapfile && chmod 600 /swapfile && mkswap /swapfile && swapon /swapfile`\n3. **Instal Cuan Mode Ringan** (tanpa meminta port 80/443):\n   `curl -fsSL https://cuan.work/install.sh | bash -s -- --existing-proxy`\n4. **Hubungkan Domain via Cloudflare Tunnel**:\n   Di Cloudflare Zero Trust (Tunnels), buat tunnel baru dan arahkan Public Hostname ke `http://localhost:8080`.\n\nWebsite Anda langsung aktif di `https://cuan.bisnisanda.com` dengan gembok hijau HTTPS resmi tanpa perlu beli IP publik dedicated!',
          textEn: 'For founders, solopreneurs, and small teams wanting to minimize server overhead, you can leverage NAT VPS providers (such as Helipod, SumoPod, Dahono, HostData, or Cloudra) available in Indonesia for only Rp 10.000 – Rp 25.000 / month (~$1/mo).\n\n**NAT VPS Characteristics & Solutions**:\n• **Why so cheap?** A single public IPv4 address is shared across dozens of servers, eliminating the expensive dedicated IP markup.\n• **Port Constraints**: NAT VPS instances do not have direct public access to ports 80 and 443. SSH access is provided via a dedicated port (e.g. `ssh -p 22022 root@IP`).\n• **Can Cuan run on NAT VPS?** Absolutely! Cuan is built with Go and is exceptionally lightweight (idle RAM ~30-50MB), making 1GB RAM (or 512MB + Swap) more than sufficient.\n\n**Connecting Custom Domains with Official SSL (Cloudflare Tunnel)**:\n1. **Connect via SSH** using the custom port assigned by your provider.\n2. **Create 1GB Swap Memory** for smooth container operations:\n   `fallocate -l 1G /swapfile && chmod 600 /swapfile && mkswap /swapfile && swapon /swapfile`\n3. **Install Cuan in Lightweight Mode** (bypassing ports 80/443 requirements):\n   `curl -fsSL https://cuan.work/install.sh | bash -s -- --existing-proxy`\n4. **Connect Custom Domain for Free** via Cloudflare Tunnel (Zero Trust > Tunnels):\n   Create a tunnel, run the lightweight cloudflared container, and route your Public Hostname to `http://localhost:8080`.\n\nYour Cuan instance goes live at `https://cuan.yourbusiness.com` with green-padlock HTTPS, zero port forwarding, and zero dedicated IP costs!',
          code: '# 1. Pasang Cuan di VPS NAT (mode ringan tanpa minta port 80/443):\ncurl -fsSL https://cuan.work/install.sh | bash -s -- --existing-proxy\n\n# 2. Hubungkan domain secara gratis via Cloudflare Tunnel:\ndocker run -d --name cloudflared --restart unless-stopped \\\n  --network host \\\n  cloudflare/cloudflared:latest tunnel --no-autoupdate run --token TOKEN_DARI_CLOUDFLARE',
          codeLang: 'bash',
          note: '💡 **Bebas Batasan**: Cloudflare Tunnel 100% gratis dan bekerja secara koneksi keluar (outbound), sehingga kebal terhadap batasan port provider, firewall, bahkan koneksi internet rumahan (Indihome/Biznet/FirstMedia).',
          noteEn: '💡 **Unrestricted**: Cloudflare Tunnels are 100% free and operate via outbound connections, making them completely immune to NAT port forwarding limits, provider firewalls, or home broadband CGNAT setups.',
        },
        {
          id: 'health-monitoring',
          heading: '5. Memastikan Sistem Sehat & Normal',
          headingEn: '5. System Health & Diagnostics',
          text: 'Jika Anda ingin memastikan seluruh layanan Cuan berjalan lancar di server:\n\n• **Cek Status Container**: Jalankan perintah berikut di terminal server untuk melihat status aplikasi dan database.\n• **Uji Respon Aplikasi**: Memastikan aplikasi merespon normal dengan kode HTTP 200.',
          textEn: 'To verify that all Cuan services are operating normally:\n\n• **Check Container Status**: Run this command in your server terminal to inspect container states.\n• **Application Probe**: Verifies that the application responds with HTTP 200 OK.',
          code: '# Cek status container di terminal:\ndocker compose ps\n\n# Uji respon kesehatan aplikasi:\ncurl -f http://localhost:8080/healthz',
          codeLang: 'bash',
        },
      ],
    },
  },
]
