export interface DocSubSection {
  id: string
  heading: string
  headingEn: string
  text?: string
  textEn?: string
  code?: string
  codeLang?: string
  note?: string
  noteEn?: string
}

export interface DocSection {
  slug: string
  group: 'getting-started' | 'workflow' | 'examples' | 'admin'
  title: string
  titleEn: string
  icon: string
  summary: string
  summaryEn: string
  content: {
    intro?: string
    introEn?: string
    subsections: DocSubSection[]
  }
}

export interface DocGroup {
  id: 'getting-started' | 'workflow' | 'examples' | 'admin'
  label: string
  labelEn: string
}

export const DOC_GROUPS: DocGroup[] = [
  { id: 'getting-started', label: 'Memulai', labelEn: 'Getting Started' },
  { id: 'workflow', label: 'Workflow', labelEn: 'Workflow' },
  { id: 'examples', label: 'Contoh Proyek (WIP)', labelEn: 'Examples (WIP)' },
  { id: 'admin', label: 'Administrasi', labelEn: 'Administration' },
]

export const DOC_SECTIONS: DocSection[] = [
  // ─── GRUP 1: MEMULAI ────────────────────────────────────────────────────────
  {
    slug: 'getting-started',
    group: 'getting-started',
    title: 'Quick Start',
    titleEn: 'Quick Start',
    icon: 'Terminal',
    summary: 'Pasang Cuan di server atau laptop dalam 3 menit.',
    summaryEn: 'Deploy Cuan on your server or local machine in 3 minutes.',
    content: {
      intro: '',
      introEn: '',
      subsections: [
        {
          id: 'dns-prep',
          heading: '1. Siapkan Subdomain (1 Menit)',
          headingEn: '1. Prepare Subdomain (1 Minute)',
          text: 'Siapkan alamat subdomain untuk Cuan Anda (misal: `cuan.bisnisanda.com`):\n\n• **VPS Biasa ($4–$6/bln)**: Tambahkan **A Record** di DNS domain Anda (Cloudflare, Niagahoster, Domainesia, Namecheap, dll):\n  **Host**: `cuan` ➔ **Target IP**: `IP Server VPS Anda`\n• **VPS NAT Hemat (Rp 10rb-an/bln)**: Tidak perlu buat A Record publik. Lewati langkah ini (domain akan disambung lewat Cloudflare Tunnel di Langkah 2).\n• **Uji Coba di Laptop**: Lewati langkah ini (bisa langsung dijalankan tanpa domain).',
          textEn: 'Prepare a subdomain address for Cuan (e.g. `cuan.yourbusiness.com`):\n\n• **Standard VPS ($4–$6/mo)**: Add an **A Record** in your DNS settings (Cloudflare, Namecheap, Niagahoster, etc.):\n  **Host**: `cuan` ➔ **Target IP**: `Your VPS IP`\n• **Budget NAT VPS (~$1/mo)**: No public A Record needed. Skip this step (domain connects via Cloudflare Tunnel in Step 2).\n• **Local Testing**: Skip this step (runs directly on localhost without a domain).',
        },
        {
          id: 'option-fast',
          heading: '2. Opsi A: Jalur Cepat (VPS Biasa $4–$6/bln)',
          headingEn: '2. Option A: Fast Track (Standard VPS $4–$6/mo)',
          text: 'Pilihan paling praktis untuk VPS cloud biasa dengan IP publik (DigitalOcean, Hetzner, Vultr, IDCloudHost, dll). Skrip ini otomatis memasang aplikasi, database, dan sertifikat gembok hijau HTTPS:',
          textEn: 'The easiest path for standard cloud VPS with dedicated IPv4 (DigitalOcean, Hetzner, Vultr, etc.). Automatically sets up the app, database, and green-padlock HTTPS:',
          code: 'curl -fsSL https://cuan.work/install.sh | bash -s -- --domain cuan.bisnisanda.com --email anda@bisnisanda.com',
          codeLang: 'bash',
          note: '💡 Ingin mencoba di laptop dulu tanpa domain? Cukup jalankan perintah di atas tanpa flag domain, lalu buka `http://localhost:8080`.',
          noteEn: '💡 Testing locally without a domain? Run the command above without domain flags, then open `http://localhost:8080`.',
        },
        {
          id: 'option-budget',
          heading: '3. Opsi B: Jalur Hemat (VPS NAT Rp 10.000-an/bln)',
          headingEn: '3. Option B: Ultra-Budget (NAT VPS ~$1/mo)',
          text: 'Pilihan paling hemat menggunakan VPS NAT lokal (Helipod, SumoPod, Dahono, Cloudra, dll). Menghemat biaya server hingga 80% karena menggunakan IP publik bersama, dan sangat stabil di RAM 1GB (idle RAM Cuan hanya ~30–50MB):\n\n1. **Login SSH**: Masuk ke server dengan port khusus dari penyedia Anda:\n```bash\nssh -p <PORT> root@<IP>\n```\n\n2. **Aktifkan Swap 1GB**: Mencegah memori penuh agar proses instalasi berjalan mulus:\n```bash\nfallocate -l 1G /swapfile && chmod 600 /swapfile && mkswap /swapfile && swapon /swapfile\n```\n\n3. **Instal Cuan Mode Ringan**: Memasang Cuan tanpa mengikat port 80/443 publik:\n```bash\ncurl -fsSL https://cuan.work/install.sh | bash -s -- --existing-proxy\n```\n\n4. **Hubungkan Domain via Cloudflare Tunnel Gratis**:\nDi dashboard Cloudflare Zero Trust (Tunnels), buat tunnel baru dan arahkan Public Hostname ke `http://localhost:8080`.\nLalu jalankan perintah konektor tunnel resmi dari Cloudflare (atau via container di bawah):\n```bash\ndocker run -d --name cloudflared --restart unless-stopped --network host \\\n  cloudflare/cloudflared:latest tunnel --no-autoupdate run --token TOKEN_DARI_CLOUDFLARE\n```\nWebsite Anda langsung aktif di domain sendiri dengan gembok hijau HTTPS resmi tanpa perlu beli IP publik dedicated!',
          textEn: 'The most affordable path using local NAT VPS (Helipod, SumoPod, Dahono, Cloudra, etc.). Cuts server costs by 80% using shared public IPv4, running stably on 1GB RAM (Cuan idle RAM is only ~30–50MB):\n\n1. **SSH Login**: Connect using the custom port assigned by your host:\n```bash\nssh -p <PORT> root@<IP>\n```\n\n2. **Enable 1GB Swap**: Ensures smooth installation without running out of memory:\n```bash\nfallocate -l 1G /swapfile && chmod 600 /swapfile && mkswap /swapfile && swapon /swapfile\n```\n\n3. **Install Cuan Lightweight Mode**: Installs Cuan without binding public ports 80/443:\n```bash\ncurl -fsSL https://cuan.work/install.sh | bash -s -- --existing-proxy\n```\n\n4. **Connect Domain via Free Cloudflare Tunnel**:\nIn Cloudflare Zero Trust (Tunnels), create a new tunnel and route Public Hostname to `http://localhost:8080`.\nThen run the tunnel connector command provided by Cloudflare (or via container below):\n```bash\ndocker run -d --name cloudflared --restart unless-stopped --network host \\\n  cloudflare/cloudflared:latest tunnel --no-autoupdate run --token TOKEN_FROM_CLOUDFLARE\n```\nYour workspace is immediately live on your domain with genuine green-padlock HTTPS without purchasing a dedicated public IP!',
          note: '💡 Cloudflare Tunnel 100% gratis, aman tanpa buka port masuk publik, dan kebal dari pembatasan firewall provider internet rumahan.',
          noteEn: '💡 Cloudflare Tunnel is 100% free, requires zero open inbound ports, and works behind home internet (CGNAT/firewalls).',
        },
        {
          id: 'option-local',
          heading: '4. Opsi C: Jalur Mandiri (Komputer Lokal / Docker)',
          headingEn: '4. Option C: Self-Managed (Local / Docker)',
          text: 'Bagi Anda yang ingin menguji Cuan di laptop atau server pribadi tanpa domain:',
          textEn: 'For developers evaluating Cuan locally or on self-managed Docker stacks:',
          code: 'curl -fsSL https://cuan.work/docker-compose.yml -o docker-compose.yml\ndocker compose up -d',
          codeLang: 'bash',
          note: 'Setelah container aktif, buka `http://localhost:8080` di browser Anda.',
          noteEn: 'Once containers are running, navigate to `http://localhost:8080` in your browser.',
        },
        {
          id: 'activate-owner',
          heading: '5. Aktivasi: Buka Browser & Buat Akun Pemilik',
          headingEn: '5. Activation: Browser Setup & Owner Account',
          text: '1. **Buka Alamat Cuan**: Kunjungi `https://cuan.bisnisanda.com` (atau `http://localhost:8080` jika di laptop).\n2. **Buat Akun Pemilik (Owner)**: Masukkan nama lengkap, email, dan password Anda.\n3. **Mulai Bekerja**: Akun pertama ini otomatis menjadi Superadmin dengan kendali penuh atas sistem.',
          textEn: '1. **Open Cuan**: Visit `https://cuan.yourbusiness.com` (or `http://localhost:8080` locally).\n2. **Create Owner Account**: Enter your full name, email, and password.\n3. **Ready to Work**: This first account automatically becomes the Superadmin with complete control over your workspace.',
        },
        {
          id: 'troubleshooting',
          heading: '6. Kendala Umum & Solusi Cepat',
          headingEn: '6. Common Troubleshooting',
          text: '• **Domain belum bisa dibuka atau belum HTTPS?** Tunggu 1–5 menit untuk propagasi DNS. Pastikan alamat IP server sudah sesuai dan port internet standar terbuka.\n• **Cek apakah Cuan berjalan normal?** Buka menu **Settings > General** di browser untuk memantau status sistem secara visual tanpa perlu terminal.\n• **Pindah ke server baru?** Cadangkan data dengan `./scripts/backup.sh` dan pulihkan di server baru dengan `./scripts/restore.sh --latest --force`. Seluruh data pulih 100%.',
          textEn: '• **Domain unreachable or SSL pending?** Allow 1–5 minutes for DNS propagation. Verify DNS points to your server and standard web ports are accessible.\n• **Check runtime health?** Open **Settings > General** in your browser to monitor server health visually without terminal commands.\n• **Migrating servers?** Run `./scripts/backup.sh` and restore on your new server via `./scripts/restore.sh --latest --force`. Instant 100% data recovery.',
        },
      ],
    },
  },
  {
    slug: 'connect-ai',
    group: 'getting-started',
    title: 'Koneksi AI',
    titleEn: 'Connect AI',
    icon: 'Cpu',
    summary: 'Gunakan langganan bulanan tanpa biaya token atau pasang model AI apa saja di dunia.',
    summaryEn: 'Use flat monthly subscriptions or connect any AI model with zero markup.',
    content: {
      intro: '',
      introEn: '',
      subsections: [
        {
          id: 'cli-subscription',
          heading: '1. Opsi 1: Pakai Langganan Bulanan (Claude Pro / ChatGPT Plus / Gemini)',
          headingEn: '1. Option 1: Use Monthly Subscriptions (Claude Pro / ChatGPT Plus / Gemini)',
          text: 'Hemat jutaan rupiah per bulan. Jika Anda sudah berlangganan Claude Pro, ChatGPT Plus, atau Gemini Advanced, Anda tidak perlu beli token API lagi:\n\n1. Buka menu **Settings > AI Providers** di Cuan.\n2. Pilih provider langganan Anda (Claude Code CLI / Codex / Gemini CLI).\n3. Klik **Hubungkan Akun** dan lakukan login sekali via browser.\n4. Cuan langsung aktif menggunakan kuota langganan bulanan Anda tanpa batas token per kata!',
          textEn: 'Save millions in token expenses. If you already subscribe to Claude Pro, ChatGPT Plus, or Gemini Advanced, you do not need metered API tokens:\n\n1. Open **Settings > AI Providers** in Cuan.\n2. Select your subscription CLI harness (Claude Code CLI / Codex / Gemini CLI).\n3. Click **Connect Account** and complete 1-click browser login.\n4. Cuan operates using your flat monthly subscription with zero per-word token costs!',
        },
        {
          id: 'api-keys',
          heading: '2. Opsi 2: Kunci API Model Frontier & Hemat',
          headingEn: '2. Option 2: Frontier & Budget API Keys',
          text: 'Gunakan model AI tercanggih atau paling hemat di dunia tanpa perantara:\n\n• **Frontier Models**: Masukkan kunci API dari Anthropic (Claude 3.7 Sonnet), OpenAI (GPT-4o), atau Google AI Studio (Gemini 2.5 Flash / Pro).\n• **Model Super Hemat**: Hubungkan DeepSeek V3/R1, Qwen 2.5, Llama 3 via OpenRouter, Groq, atau Fireworks dengan biaya mulai dari beberapa rupiah saja per tugas.\n• **Keamanan Kunci**: Kunci API Anda dienkripsi AES-256 di server pribadi Anda dan tidak pernah dikirim ke pihak ketiga selain penyedia model AI yang Anda pilih.',
          textEn: 'Connect frontier models or ultra-cheap inference engines with zero middleman:\n\n• **Frontier Engines**: Connect API keys from Anthropic (Claude 3.7 Sonnet), OpenAI (GPT-4o), or Google AI Studio (Gemini 2.5 Flash / Pro).\n• **Ultra-Budget APIs**: Connect DeepSeek V3/R1, Qwen 2.5, or Llama 3 via OpenRouter, Groq, or Fireworks for pennies per task.\n• **Key Security**: API keys are AES-256 encrypted on your private server and never routed anywhere except directly to your chosen provider.',
        },
        {
          id: 'local-ai',
          heading: '3. Opsi 3: AI Lokal Tanpa Internet (Ollama / vLLM)',
          headingEn: '3. Option 3: Offline Local AI (Ollama / vLLM)',
          text: 'Bagi Anda yang menginginkan privasi mutlak atau server tanpa koneksi internet luar:\n\n• **Dukungan AI Lokal**: Jika Anda menjalankan Ollama atau model lokal, cukup pilih provider **Ollama Local** di menu Cuan dan masukkan alamatnya (`http://localhost:11434`).\n• **100% Privat**: Seluruh pemrosesan teks berjalan sepenuhnya di server Anda tanpa ada data bisnis yang keluar.',
          textEn: 'For complete data sovereignty or air-gapped environments:\n\n• **Local AI Support**: If running Ollama or local LLMs, select **Ollama Local** inside Cuan and enter your endpoint (`http://localhost:11434`).\n• **100% Private**: All reasoning occurs strictly on your hardware with zero outbound data leakage.',
        },
        {
          id: 'switch-models',
          heading: '4. Kapan Harus Mengganti Model AI?',
          headingEn: '4. Choosing the Best Model for Each Workload',
          text: '• **Tugas Kreatif, Copywriting & Strategi**: Gunakan Claude 3.7 Sonnet atau GPT-4o untuk gaya bahasa natural dan bernuansa tinggi.\n• **Riset Cepat & Pemrosesan Data Banyak**: Gunakan Gemini 2.5 Flash (sangat cepat dan konteks 1 juta kata).\n• **Pekerjaan Rutin & Chat CS Ringan**: Gunakan DeepSeek V3 atau Qwen 2.5 untuk efisiensi biaya maksimal (hingga 90% lebih murah).',
          textEn: '• **Creative Copy, Strategy & Complex Logic**: Claude 3.7 Sonnet or GPT-4o for nuanced storytelling and natural prose.\n• **Fast Research & Heavy Document Processing**: Gemini 2.5 Flash for speed and 1M+ token context window.\n• **Routine Tasks & Routine Support**: DeepSeek V3 or Qwen 2.5 for peak cost efficiency (up to 90% cheaper).',
        },
      ],
    },
  },
  {
    slug: 'first-project',
    group: 'getting-started',
    title: 'Proyek Pertama',
    titleEn: 'Your First Project',
    icon: 'FolderGit2',
    summary: 'Siapkan wadah bisnis pertama Anda dan pahami kekuatan multi-project tanpa batas.',
    summaryEn: 'Set up your first business workspace and leverage unlimited multi-project support.',
    content: {
      intro: '',
      introEn: '',
      subsections: [
        {
          id: 'why-project',
          heading: '1. Kenapa Harus Pakai Project? (Bukan Chat Biasa)',
          headingEn: '1. Why Projects? (Avoiding Messy AI Chats)',
          text: 'Di aplikasi AI chat biasa, semua percakapan menumpuk di satu sidebar panjang. Topik Toko A, Toko B, dan tugas pribadi tercampur aduk, file tercecer, dan AI mulai bingung mengingat konteks bisnis Anda.\n\nDi Cuan, setiap brand, domain website, atau toko Anda (misal: `tokosahabat.com` vs `Kopi Senja`) memiliki wadah **Project** mandiri. Seluruh riset, draf konten, instruksi, dan kodenya hidup terisolasi di dalam wadah tersebut sehingga tidak akan pernah campur aduk!',
          textEn: 'In typical AI chat tools, conversations pile up in one endless sidebar. Business A, Business B, and random chats bleed together, assets get lost, and the AI loses context.\n\nIn Cuan, each brand, website domain, or store (e.g. `tokosahabat.com` vs `Kopi Senja`) lives in its own dedicated **Project**. All research, content drafts, tasks, and code stay strictly organized inside that workspace with zero cross-contamination.',
        },
        {
          id: 'create-first-project',
          heading: '2. Dua Jalur Memulai: Otomatis via Chat atau Terencana via Menu',
          headingEn: '2. Two Ways to Start: Autonomous via Chat or Planned via Menu',
          text: 'Cuan dirancang sebagai Project Manager yang meringankan beban kerja Anda, bukan menambah birokrasi formulir. Anda bebas memilih cara memulai:\n\n• **Jalur Cepat (Otomatis via Chat — Disukai Pengguna)**:\n  Anda tidak perlu membuka menu atau mengisi formulir apa pun! Cukup buka **Inbox** atau **New work**, lalu ketik apa yang Anda butuhkan (misal: *"buatkan landing page untuk barukopi.id"* atau *"riset 5 ide konten untuk toko online saya"*). Cuan secara cerdas mengenali nama bisnis Anda, menawarkan pembuatan proyek baru secara otomatis, dan langsung mengeksekusi tugasnya tanpa friksi.\n\n• **Jalur Terencana (via Menu Projects)**:\n  Bagi Anda yang menyukai persiapan rapi di awal: buka menu **Manage > Projects** di navigasi kiri, klik `+ New Project`, lalu masukkan nama brand atau domain website Anda (misal: `tokosahabat.com` atau `@barukopi.id`). Cuan seketika menyiapkan ruang kerja mandiri untuk brand tersebut.',
          textEn: 'Cuan is designed as a burden-relieving Project Manager, never an administrative hurdle. You have two flexible ways to start:\n\n• **Fast Track (Autonomous via Chat — Recommended)**:\n  Skip forms and menus entirely! Simply open **Inbox** or **New work** and describe what you need (e.g. *"create a landing page for barukopi.id"* or *"research 5 content ideas for my store"*). Cuan proactively detects your brand, offers to provision a dedicated workspace in 1 click, and executes the work without friction.\n\n• **Planned Track (via Projects Menu)**:\n  For those who prefer structured upfront setup: navigate to **Manage > Projects** in the sidebar, click `+ New Project`, and enter your brand handle or domain (e.g. `tokosahabat.com` or `@barukopi.id`). Cuan immediately provisions a clean workspace for that business unit.',
          note: '💡 Prinsip Project Manager Cuan: Anda tidak pernah disodori error teknis saat belum membuat proyek. Cuan selalu proaktif menawarkan solusi atau membuatkan wadah kerja untuk Anda.',
          noteEn: '💡 Cuan PM Principle: You are never stranded with raw technical errors. Cuan proactively proposes project creation or guides you forward seamlessly.',
        },
        {
          id: 'multi-project-power',
          heading: '3. Kekuatan Multi-Project: Bebas Tambah Banyak Bisnis',
          headingEn: '3. Unlimited Multi-Project Power',
          text: 'Satu instalasi Cuan bisa menaungi puluhan brand/domain sekaligus tanpa biaya lisensi tambahan:\n\n• **Bebas Campur Aduk**: Setiap kali Anda memulai bisnis, domain, atau klien baru, cukup buat satu Project baru.\n• **Target Presisi**: Saat mendelegasikan tugas di **New work**, Anda tinggal memilih brand mana yang ingin ditargetkan via pemilih proyek (pill).\n• **Kerahasiaan Terjamin**: File, catatan, dan memori antar bisnis tersimpan terpisah dan aman.',
          textEn: 'A single Cuan installation handles multiple domains, brands, or client projects at zero extra cost:\n\n• **Zero Clutter**: Whenever launching a new initiative or client, create a dedicated Project.\n• **Precise Targeting**: When delegating jobs in **New work**, pick the target brand via the project selector pill.\n• **Strict Isolation**: Business memories, assets, and credentials remain private and isolated.',
        },
      ],
    },
  },

  // ─── GRUP 2: WORKFLOW ───────────────────────────────────────────────────────
  {
    slug: 'work-with-cuan',
    group: 'workflow',
    title: 'Bekerja dengan Cuan',
    titleEn: 'Work with Cuan',
    icon: 'CuanMark',
    summary: 'Mulai pekerjaan seketika dari New Work, diskusikan & setujui hasil di Inbox, dan pahami simbol status kerja agen.',
    summaryEn: 'Start work instantly from New Work, review deliverables in Inbox, and understand avatar task indicators.',
    content: {
      intro: '',
      introEn: '',
      subsections: [
        {
          id: 'start-new-work',
          heading: '1. Mulai Pekerjaan Seketika (New Work & Inbox)',
          headingEn: '1. Start Instantly from New Work & Inbox',
          text: 'Mendelegasikan tugas ke Cuan semudah berbicara dengan Project Manager profesional di tim Anda:\n\n• **Pilih Brand / Proyek (Opsional)**: Jika Anda sudah memiliki proyek terdaftar, Anda dapat mencentang nama proyek pada pemilih (pill) di halaman **New work**.\n• **Langsung Ketik Kebutuhan (Tanpa Setup Terlebih Dahulu)**: Belum punya proyek atau memulai bisnis baru? Tidak masalah. Cukup ketik apa yang Anda butuhkan dengan menyebutkan nama brand atau domain website Anda. Cuan tidak akan pernah menyodorkan error teknis—Cuan secara proaktif mengusulkan pembuatan proyek baru dan langsung mengeksekusi instruksi Anda.\n• **Bahasa Alami Tanpa Jargon**: Tidak perlu format kaku, perintah terminal, atau tag `@cuan`:\n\nContoh instruksi nyata yang siap dieksekusi Cuan:',
          textEn: 'Delegating work to Cuan is as intuitive as chatting with an experienced Project Manager:\n\n• **Select Target Brand / Project (Optional)**: If you have existing projects, check the target project in the project selector on the **New work** page.\n• **Describe Directly (Zero Upfront Setup)**: Working on a fresh brand or domain? Simply describe your goal. Cuan never strands you with raw technical errors—it proactively proposes workspace creation and begins execution immediately.\n• **Natural Plain-Text Instructions**: No syntax tags, CLI flags, or `@cuan` mentions required:\n\nReal-world prompt example ready for autonomous execution:',
          code: 'instalkan wordpress untuk domain tokosaya.com lengkap dengan SSL',
          codeLang: 'chat',
          note: '💡 Prinsip Zero Friction: Baik di VPS lokal maupun server eksternal, Cuan langsung bertindak sebagai PM yang mengeksekusi—bukan sekadar membalas dengan artikel tutorial panjang atau menyuruh Anda mengisi formulir teknis.',
          noteEn: '💡 Zero Friction Philosophy: Whether running locally or across remote servers, Cuan acts as an executing PM—never dumping generic tutorial links or forcing technical configuration steps.',
        },
        {
          id: 'inbox-approval',
          heading: '2. Diskusi & Kartu Persetujuan (Approval) di Inbox',
          headingEn: '2. Discussion & Approval Cards in Inbox',
          text: 'Begitu Anda menekan kirim di New Work, Cuan otomatis mengarahkan Anda ke ruang diskusi di **Inbox**:\n\n• **Bukti Kerja Nyata**: AI mengeksekusi instruksi di ruang kerja terisolasi dan menampilkan draf hasil kerja nyata (teks, visual, atau kode).\n• **Kartu Persetujuan (Needs Approval)**: AI tidak pernah mempublikasikan atau mengubah data tanpa izin Anda. Cukup klik tombol **Approve** jika sudah puas.\n• **Mudah Direvisi**: Ingin perubahan? Cukup balas chat seperti biasa (misal: *"buat judulnya lebih santai"*), dan AI akan merevisinya seketika.',
          textEn: 'Once submitted from New Work, Cuan automatically routes you to the discussion room in **Inbox**:\n\n• **Tangible Deliverables**: The AI operates in an isolated workspace and produces draft outputs (copy, code, or media).\n• **Approval Cards (Needs Approval)**: The AI never alters data or publishes deliverables without your consent. You stay in 100% control—simply click **Approve**.\n• **Effortless Revisions**: Need adjustments? Reply right in the chat (e.g. *"make the headline more conversational"*), and the AI adapts instantly.',
          note: '🔒 Keamanan Terjamin: AI di Cuan wajib menyertakan bukti hasil nyata sebelum meminta persetujuan. Anda selalu memegang kendali penuh.',
          noteEn: '🔒 Guaranteed Control: AI in Cuan must present tangible proof before requesting approval. You stay in complete control.',
        },
        {
          id: 'status-indicators',
          heading: '3. Indikator Status & Progres Tugas di Inbox',
          headingEn: '3. Task Status & Progress Indicators in Inbox',
          text: 'Di daftar Inbox, Cuan menggunakan filosofi visual tenang (terinspirasi standar Things 3) tanpa emoji, spinner agresif, atau warna neon mencolok. Anda dapat memantau status penyelesaian langsung dari sudut avatar percakapan:\n\n• **Centang Hijau (`CheckCircle2`) di Sudut Avatar**:\n  - Muncul di pojok kanan bawah avatar saat seluruh tugas selesai atau percakapan ditandai tuntas (*Resolved*).\n  - **Tombol Interaktif**: Anda bisa mengklik langsung badge ini dari daftar inbox untuk menandai percakapan selesai (*Resolve*) atau membukanya kembali (*Reopen*) tanpa harus membuka ruang chat terlebih dahulu.\n\n• **Lingkaran / Progres Pie (`task-pie-progress`) di Sudut Avatar**:\n  - Muncul di pojok kanan bawah avatar saat masih ada tugas yang sedang berjalan atau belum tuntas (*In Progress*).\n  - Jika percakapan memiliki beberapa tugas, irisan lingkaran terisi bertahap sesuai rasio tugas yang telah selesai.\n  - Saat runner sedang aktif mengeksekusi perintah di latar belakang, lingkaran memiliki **denyut lembut** (*task-pulse-subtle*).\n\n• **Lingkaran Netral (`Circle`) di Sudut Avatar**:\n  - Muncul pada percakapan reguler yang belum memiliki tugas khusus, siap diklik jika Anda ingin menandai percakapan telah selesai.\n\n*Catatan Indikator Rinci*: Detail teknis per tugas (seperti draf menunggu persetujuan `CheckCheck`, antrean runner `Clock3`, atau perhatian manual `AlertCircle`) ditampilkan terpisah di dalam kartu tugas obrolan dan menu **Tasks**, bukan di sudut avatar Inbox.',
          textEn: 'In the Inbox list, Cuan employs a calm visual philosophy (inspired by Things 3 standards) free from emojis, aggressive spinners, or neon glare. You can monitor execution progress directly from the conversation avatar corner:\n\n• **Green Checkmark (`CheckCircle2`) on Avatar Corner**:\n  - Appears at the bottom-right of the avatar when all tasks are finished or the conversation is marked Resolved.\n  - **Interactive Toggle**: Click this badge directly from the inbox list to mark conversations as Resolved or Reopen them without having to open the chat room first.\n\n• **Pie Progress Ring (`task-pie-progress`) on Avatar Corner**:\n  - Appears at the bottom-right of the avatar when tasks are actively running or unfinished (*In Progress*).\n  - If multiple tasks exist, pie slices fill incrementally as each task is verified and completed.\n  - While the runner actively executes background steps, the ring exhibits a **calm subtle pulse** (*task-pulse-subtle*).\n\n• **Neutral Outline Ring (`Circle`) on Avatar Corner**:\n  - Appears on standard conversations without active background tasks, ready to click when you wish to resolve the thread.\n\n*Detailed Task Indicators*: Granular technical statuses (such as approval review `CheckCheck`, queue position `Clock3`, or manual alert `AlertCircle`) are displayed inside the chat task cards and the **Tasks** dashboard, not on the Inbox avatar.',
          note: 'Zero Visual Noise: Seluruh indikator di daftar Inbox menggunakan ikon SVG minimalis dan terintegrasi langsung di sudut avatar, memastikan pengawasan kerja berjam-jam tetap nyaman tanpa distorsi visual.',
          noteEn: 'Zero Visual Noise: All Inbox indicators use clean minimalist SVG icons embedded at the avatar corner, ensuring long-term monitoring comfort without visual fatigue.',
        },
        {
          id: 'tasks-monitoring',
          heading: '4. Menu Tasks: Papan Transparansi & Pengawasan',
          headingEn: '4. Tasks Menu: Transparency & Oversight',
          text: 'Anda tidak perlu repot membuat atau menggeser-geser tiket tugas setiap hari. Seluruh antrean dikelola otomatis oleh Cuan:\n\n• **Transparansi Penuh**: Menu **Tasks** hadir sebagai papan pemantauan (observability). Buka menu ini jika Anda ingin melihat ringkasan tugas yang sedang berjalan (*Doing*), menunggu persetujuan (*Needs Approval*), atau riwayat tugas selesai (*Done*).\n• **Audit Trail**: Anda bisa mengklik tugas apa pun untuk menginspeksi log eksekusi, penggunaan token, dan detail runner bila dibutuhkan.',
          textEn: 'You never have to manage tickets or drag Kanban cards daily. All execution workflows and queues are handled autonomously by Cuan:\n\n• **Full Transparency**: The **Tasks** menu serves as an observability dashboard. Check it whenever you wish to monitor active jobs (*Doing*), pending reviews (*Needs Approval*), or completed history (*Done*).\n• **Audit Trail**: Click any task to inspect execution logs, token usage, and runner details whenever needed.',
        },
      ],
    },
  },
  {
    slug: 'customer-support',
    group: 'workflow',
    title: 'Layanan Pelanggan',
    titleEn: 'Customer Support & Live Chat',
    icon: 'MessageSquare',
    summary: 'Pasang widget chat di website dan layani pelanggan bersama tim dengan bantuan bisikan AI.',
    summaryEn: 'Embed a live chat widget and assist customers with AI coaching.',
    content: {
      intro: '',
      introEn: '',
      subsections: [
        {
          id: 'chat-widget',
          heading: '1. Pasang Widget Chat di Website (1 Baris Kode)',
          headingEn: '1. 1-Line Live Chat Widget',
          text: 'Cara termudah: Buka menu **Pengaturan > Integrasi** di dashboard Cuan Anda, lalu klik tombol **"Copy widget code"**. Domain dan URL instance Cuan Anda sudah terisi otomatis tanpa perlu diedit manual!\n\n• **WordPress**: Tempel di plugin Header & Footer Code (WPCode), atau di pengaturan tema sebelum tag penutup `</body>`.\n• **Website HTML / Toko Online**: Tempel tepat sebelum tag penutup `</body>` di file HTML Anda.',
          textEn: 'Easiest method: Open **Settings > Integrations** inside your Cuan dashboard, then click **"Copy widget code"**. Your actual Cuan instance domain is already populated and ready to use without manual editing!\n\n• **WordPress**: Paste into a Header & Footer Code plugin (WPCode), or your theme settings before `</body>`.\n• **HTML / Storefront**: Paste immediately before the closing `</body>` tag.',
          code: '<script src="https://cuan.bisnisanda.com/chat/widget.js" data-product="nama-website-anda" defer></script>',
          codeLang: 'html',
          note: '💡 Rekomendasi: Gunakan tombol "Copy widget code" di menu Pengaturan aplikasi agar domain langsung sesuai. Ukuran bundle widget < 15KB tanpa membebani performa website.',
          noteEn: '💡 Recommended: Click "Copy widget code" in the Cuan app Settings menu so your domain is automatically configured. The widget bundle is under 15KB with zero performance penalty.',
        },
        {
          id: 'auto-whisper',
          heading: '2. Bisikan Rahasia Bot (@cuan Whisper Mode)',
          headingEn: '2. Private Bot Coaching (@cuan Whisper Mode)',
          text: 'Di ruang obrolan dengan pelanggan, Cuan menjaga rahasia internal bisnis Anda:\n\n• **Ketik Pesan Biasa**: Terkirim langsung ke layar pengunjung website.\n• **Ketik Mention @cuan**: Kotak chat otomatis beralih ke Mode Bisikan Internal (latar kuning lembut).\n• **Bimbingan Staf**: AI merekomendasikan jawaban terbaik kepada staf secara rahasia tanpa pernah terlihat oleh pengunjung website.',
          textEn: 'Inside customer chat rooms, Cuan safeguards your private internal operations:\n\n• **Standard typing**: Delivered publicly to the website visitor.\n• **Typing @cuan**: Automatically switches to internal Whisper mode (calm yellow indicator).\n• **Staff Coaching**: The AI coaches your staff with private answers, completely invisible to the visitor.',
        },
        {
          id: 'reply-draft',
          heading: '3. Draf Balasan Otomatis & Eskalasi ke Agen',
          headingEn: '3. Automated Reply Drafts & Agent Escalation',
          text: 'Ketika pelanggan menanyakan hal rumit atau membutuhkan eskalasi teknis:\n\n1. AI secara cerdas menyusun kartu draf balasan di layar obrolan.\n2. Staf Anda membaca rekomendasi kalimat yang disarankan.\n3. Klik **Kirim Balasan** untuk langsung merespon pelanggan, atau edit kata-katanya terlebih dahulu.',
          textEn: 'When visitors ask complex questions or need operational resolution:\n\n1. The AI generates a suggested reply card in the chat view.\n2. Your team verifies the recommended response.\n3. Click **Send Reply** to respond immediately, or edit wording first.',
        },
      ],
    },
  },

  // ─── GRUP 3: CONTOH PROYEK (EXAMPLES) ───────────────────────────────────────
  {
    slug: 'social-media-automation',
    group: 'examples',
    title: 'Otomasi Konten Sosmed (WIP)',
    titleEn: 'Social Media Automation (WIP)',
    icon: 'Share2',
    summary: '[Work in Progress] Rancangan alur riset ide, template carousel 1080x1350px, dan integrasi Tebar.app MCP.',
    summaryEn: '[Work in Progress] Blueprint workflow for research, carousel generation, and Tebar.app MCP scheduling.',
    content: {
      intro: '> 🚧 **Status: Work in Progress (Eksperimen / Dalam Pengembangan)**\n> Alur kerja ini adalah konsep dan rancangan alur (blueprint) yang sedang dikembangkan dan diuji coba pada fase Public Alpha. Dependensi tool eksternal (MCP Tebar.app, headless Chromium) masih dalam tahap integrasi aktif dan belum dapat diandalkan secara penuh untuk operasional produksi. Kami mengundang komunitas untuk ikut bereksperimen dan memberi masukan di [GitHub Issues](https://github.com/buchin/cuan/issues).\n\nVisi fitur ini adalah membangun mesin konten mandiri langsung dari instruksi obrolan tanpa perlu membuka dashboard sosmed secara manual.',
      introEn: '> 🚧 **Status: Work in Progress (Experimental / Under Development)**\n> This workflow is a concept and blueprint currently under active development and testing during the Public Alpha phase. External tool dependencies (Tebar.app MCP, headless Chromium) are actively being integrated and are not yet fully operational for production use. We invite the community to experiment and share feedback on [GitHub Issues](https://github.com/buchin/cuan/issues).\n\nThe vision is building an autonomous content engine directly from chat instructions without juggling social dashboards.',
      subsections: [
        {
          id: 'social-project',
          heading: '1. Dua Cara Memulai: Otomatis via Chat atau Buat Proyek di Menu',
          headingEn: '1. Two Ways to Start: Autonomous via Chat or Planned in Menu',
          text: 'Setiap kampanye media sosial atau unit bisnis hidup di ruang kerja **Proyek** terisolasi agar aset, riset, dan template visual tidak campur aduk:\n\n• **Jalur Cepat (Otomatis via Chat — Paling Mudah)**:\n  Anda tidak perlu membuka menu apa pun! Cukup berikan instruksi di obrolan dengan menyebutkan akun brand Anda (seperti contoh di Langkah 4 di bawah: *"buatkan carousel untuk @barukopi.id"*). Cuan sebagai Project Manager langsung mendeteksi brand tersebut, menawarkan pembuatan proyek baru secara instan, dan mengeksekusinya tanpa friksi.\n\n• **Jalur Terencana (via Menu Projects)**:\n  Jika Anda ingin menyiapkan wadah terlebih dahulu: buka menu **Manage > Projects**, klik tombol `+ New Project`, dan beri nama sesuai identitas brand Anda (misal: `@barukopi.id` atau `TokoKopiNusantara`). Seluruh riset audiens, file template HTML, dan aset gambar PNG hasil render akan tersimpan rapi di workspace proyek tersebut.',
          textEn: 'Every social campaign or business unit lives inside an isolated **Project** workspace so assets, audience research, and visual templates never cross-contaminate:\n\n• **Fast Track (Autonomous via Chat — Recommended)**:\n  Skip menu navigation entirely! Simply issue your prompt referencing your brand handle (as shown in Step 4 below: *"create a carousel for @barukopi.id"*). Cuan acts as an empathetic Project Manager—detecting the brand, proposing project creation in 1 click, and executing without friction.\n\n• **Planned Track (via Projects Menu)**:\n  If you prefer structured setup upfront: navigate to **Manage > Projects**, click `+ New Project`, and name it after your brand handle (e.g. `@barukopi.id` or `CoffeeRoastery`). All audience research, slide HTML templates, and compiled PNG assets remain organized inside that workspace.',
        },
        {
          id: 'social-prerequisites',
          heading: '2. Hubungkan Integrasi MCP Tebar.app',
          headingEn: '2. Connect Tebar.app MCP Integration',
          text: 'Tebar menyediakan endpoint Model Context Protocol (MCP) resmi untuk menjadwalkan konten multi-platform tanpa API pihak ketiga yang rumit:\n\n• **Daftar Akun**: Masuk ke [Tebar.app](https://tebar.app) dan tautkan akun Instagram, Threads, LinkedIn, X, atau TikTok Anda.\n• **Ambil API Key**: Buka menu Pengaturan Akun di dashboard Tebar, salin API Key Anda (`tb_live_...`).\n• **Pasang di Cuan**: Di Cuan, buka **Settings > Apps & Skills** (atau konfigurasi MCP server), daftarkan endpoint resmi:\n  - URL: `https://api.tebar.app/mcp`\n  - Header: `Authorization: Bearer tb_live_...`\n• **Deteksi Tool Otomatis**: Cuan otomatis mengenali kapabilitas resmi Tebar (`list_accounts`, `create_post`, `upload_media`, `list_posts`).',
          textEn: 'Tebar provides an official Model Context Protocol (MCP) server for multi-platform broadcasting without fragile direct API scrapers:\n\n• **Link Accounts**: Sign in to [Tebar.app](https://tebar.app) and connect your official Instagram, Threads, LinkedIn, X, or TikTok accounts.\n• **Copy API Key**: Open Account Settings on Tebar and copy your API Key (`tb_live_...`).\n• **Register in Cuan**: In Cuan, open **Settings > Apps & Skills** (or your MCP config), and add the official endpoint:\n  - URL: `https://api.tebar.app/mcp`\n  - Header: `Authorization: Bearer tb_live_...`\n• **Automatic Tool Discovery**: Cuan immediately discovers Tebar’s official tool suite (`list_accounts`, `create_post`, `upload_media`, `list_posts`).',
          note: 'Keamanan Standar OAuth: Tebar mengelola izin resmi media sosial via protokol OAuth. Kata sandi akun media sosial Anda tidak pernah dibagikan kepada Cuan maupun penyedia model AI.',
          noteEn: 'Official OAuth Security: Tebar manages all social channel authentications via OAuth. Your personal social passwords are never shared with Cuan or AI model providers.',
        },
        {
          id: 'social-skills',
          heading: '3. Penemuan Skill Otomatis oleh Cuan (Autonomous Skill Discovery)',
          headingEn: '3. Autonomous Skill Discovery by Cuan',
          text: 'Anda tidak perlu menghafal nama repositori atau mengunduh template desain manual. Cuan memiliki kapabilitas **Web Search** dan penalaran mandiri:\n\n• Saat Anda meminta Cuan membuat carousel, agen Cuan secara otonom mencari referensi skill di web dengan kata kunci seperti: `github skills carousel`.\n• Cuan menemukan panduan open-source (seperti `inference-sh/skills/guides/social/social-media-carousel/SKILL.md`) dan mempelajari standar industri terkini:\n  - **Dimensi Baku 4:5**: 1080 × 1350 piksel (memaksimalkan ruang pandang di feed Instagram & LinkedIn).\n  - **Swipe Psychology**: Slide 1 sebagai *Hook* pemikat, Slide 2–4 berisi *Value* dengan nomor besar (01, 02, 03), dan Slide penutup sebagai *Call-to-Action*.\n  - **Metode HTML-to-Image**: Membuat kode slide HTML yang bersih lalu merendernya menjadi gambar PNG berkualitas tajam tanpa pecah.',
          textEn: 'You do not need to memorize repository URLs or manually download design packs. Cuan leverages built-in **Web Search** and autonomous reasoning:\n\n• When instructed to create a carousel, Cuan autonomously queries the web using realistic keywords like: `github skills carousel`.\n• Cuan discovers reputable open-source agent guides (such as `inference-sh/skills/guides/social/social-media-carousel/SKILL.md`) and absorbs modern social standards:\n  - **Standard 4:5 Dimensions**: 1080 × 1350 pixels (maximizing feed real estate on Instagram & LinkedIn).\n  - **Swipe Psychology**: Slide 1 serves as the scroll-stopping *Hook*, Slides 2–4 deliver high-value points with bold numbers (01, 02, 03), and the final slide acts as a *Call-to-Action*.\n  - **HTML-to-Image Technique**: Assembling clean HTML layouts and compiling them into crisp, pixel-perfect PNG slide files.',
        },
        {
          id: 'social-prompt',
          heading: '4. Contoh Prompt Alami Siap Pakai',
          headingEn: '4. Natural Ready-to-Use Prompt',
          text: 'Cukup gunakan bahasa alami yang sederhana di obrolan proyek Anda:',
          textEn: 'Simply use natural, everyday language inside your project chat:',
          code: 'Cuan, tolong cari skill atau panduan carousel sosmed di GitHub, pelajari cara bikin slide visual yang memikat, lalu buatkan carousel 5 slide tentang 5 kunci emas seduh kopi V60 untuk akun @barukopi.id dan siapkan jadwalnya ke Instagram lewat Tebar.',
          codeLang: 'chat',
        },
        {
          id: 'social-execution',
          heading: '5. Transparansi Eksekusi & Pemanggilan Tool Tebar',
          headingEn: '5. Deterministic Execution & Tebar Tool Calls',
          text: 'Transparansi langkah kerja agen Cuan di server Anda:\n\n1. **Pencarian & Adopsi Skill**: Agen menjalankan pencarian web `github skills carousel`, menemukan dan membaca dokumen `social-media-carousel/SKILL.md` (dari repositori `inference-sh/skills`), lalu mengadopsi struktur Hook dan rasio 1080×1350px.\n2. **Riset & Render Gambar**: Menulis naskah kopi V60, menyusun markup HTML/CSS dark minimalis, dan merender 5 file PNG (`slide-1.png` s/d `slide-5.png`) menggunakan Chromium headless lokal di folder proyek.\n3. **Cek Akun & Siapkan Tebar MCP**: Agen memanggil tool Tebar `list_accounts` untuk memastikan akun Instagram aktif, lalu merakit argumen `create_post` (lampiran 5 gambar, caption, dan jadwal tayang).\n4. **Penyerahan Draf di Inbox**: Draf hasil kerja disajikan ke layar obrolan dengan status *Needs Approval*. Postingan **TIDAK AKAN** dipublikasikan sebelum Anda menekan tombol persetujuan.',
          textEn: 'Transparent execution trail run by the Cuan agent on your server:\n\n1. **Skill Discovery & Adoption**: Runs a web search for `github skills carousel`, reads `social-media-carousel/SKILL.md` (from the `inference-sh/skills` open-source repository), and adopts its Hook framework and 1080×1350px ratio.\n2. **Research & Headless Render**: Drafts coffee brewing copy, generates dark minimalist HTML/CSS, and renders 5 high-res PNG image files (`slide-1.png` through `slide-5.png`) using local headless Chromium inside the project folder.\n3. **Verify Accounts & Assemble Tebar MCP Call**: Calls Tebar tool `list_accounts` to verify target profiles, then stages the `create_post` payload (5 image attachments, caption copy, scheduled timestamp).\n4. **Deliver Approval Card in Inbox**: Presents the completed deliverable in your chat thread marked *Needs Approval*. Posts are **NEVER** dispatched to live feeds without your explicit approval.',
        },
        {
          id: 'social-approval',
          heading: '6. Bukti Nyata Hasil Kerja Cuan & Persetujuan Sekali Klik',
          headingEn: '6. Authentic Deliverable Proof & 1-Click Approval',
          text: 'Berikut adalah bukti nyata artefak yang dihasilkan oleh Cuan. Anda dapat menggeser kelima slide gambar PNG resolusi tinggi di bawah ini, memeriksa naskah caption, dan meninjau parameter tool Tebar. Cukup klik **Approve** untuk langsung menjadwalkan ke akun media sosial Anda.',
          textEn: 'Below is the authentic deliverable generated by Cuan. Swipe through all five high-resolution PNG slides, inspect the caption copy, and verify the Tebar tool parameters. Simply click **Approve** to schedule across your social channels.',
        },
      ],
    },
  },
  {
    slug: 'wordpress-niche-site',
    group: 'examples',
    title: 'WordPress Niche Site (WIP)',
    titleEn: 'Automated WordPress Niche Site (WIP)',
    icon: 'Globe',
    summary: '[Work in Progress] Konsep alur instalasi WordPress, tema, dan publikasi konten otomatis via WP-CLI.',
    summaryEn: '[Work in Progress] Blueprint workflow for automated WordPress provisioning and content publishing via WP-CLI.',
    content: {
      intro: '> 🚧 **Status: Work in Progress (Eksperimen / Dalam Pengembangan)**\n> Alur kerja ini merupakan rancangan spesifikasi teknis untuk mengelola WordPress via WP-CLI di server mandiri. Fitur otomatisasi penuh ini masih dalam tahap riset dan pengujian awal pada fase Public Alpha, dan belum siap digunakan untuk website produksi langsung. Mari berkontribusi atau beri saran di [GitHub Issues](https://github.com/buchin/cuan/issues).\n\nVisi fitur ini adalah memungkinkan Cuan mengurus instalasi WordPress dan penerbitan konten secara otomatis di latar belakang.',
      introEn: '> 🚧 **Status: Work in Progress (Experimental / Under Development)**\n> This workflow represents technical specifications for managing WordPress via WP-CLI on your self-hosted server. Full autonomous orchestration is currently in early experimental development during Public Alpha and is not yet ready for live production sites. Feel free to contribute or suggest improvements on [GitHub Issues](https://github.com/buchin/cuan/issues).\n\nThe vision is allowing Cuan to autonomously handle WordPress provisioning and content publishing in the background.',
      subsections: [
        {
          id: 'wp-prerequisites',
          heading: '1. Bebas Ribet Teknis: Cuan Menyiapkan Semuanya',
          headingEn: '1. Zero Technical Setup: Cuan Handles the Server',
          text: 'Anda tidak perlu mengerti cara konfigurasi database, web server, atau sertifikat SSL. Cuan secara mandiri mengurus seluruh kebutuhan teknis WordPress di latar belakang:\n\n• **Cukup Siapkan Domain**: Anda hanya perlu memiliki nama domain (misal: `tokosaya.com`).\n• **Eksekusi Otomatis**: Cuan otomatis mengonfigurasi WordPress, mengamankan SSL, dan mengatur sistem penerbitan konten tanpa Anda perlu menyentuh terminal.',
          textEn: 'You never need to configure databases, web servers, or SSL certificates. Cuan handles the complete technical WordPress environment behind the scenes:\n\n• **Just Bring a Domain**: You only need your domain name (e.g. `tokosaya.com`).\n• **Autonomous Execution**: Cuan configures WordPress, secures SSL, and manages publishing without you touching a terminal.',
          note: '💡 Prinsip Project Manager: Cuan yang mengerjakan detail teknis di latar belakang, Anda cukup fokus pada konsep bisnis dan strategi konten.',
          noteEn: '💡 PM Philosophy: Cuan handles technical execution in the background so you can focus strictly on business strategy.',
        },
        {
          id: 'wp-install-prompt',
          heading: '2. Contoh Prompt: Instalasi & Desain Awal',
          headingEn: '2. Prompt Example: Setup & Initial Design',
          text: 'Instruksi alami untuk membuat website WordPress baru di Cuan:',
          textEn: 'Natural prompt to provision a fresh WordPress instance in Cuan:',
          code: 'Cuan, tolong buatkan website WordPress baru untuk domain barukopi.com. Pasang tema kedai kopi modern yang bersih dan minimalis, siapkan halaman beranda yang memikat, pasang plugin SEO, dan bersihkan postingan bawaan.',
          codeLang: 'chat',
          note: '💡 Cuan otomatis mengatur web server, database, dan sertifikat keamanan SSL gratis tanpa perlu Anda sebutkan secara teknis.',
          noteEn: '💡 Cuan automatically configures the web server, database, and free SSL certificate without requiring technical instructions.',
        },
        {
          id: 'wp-content-prompt',
          heading: '3. Contoh Prompt: Riset & Publikasi Artikel SEO',
          headingEn: '3. Prompt Example: Keyword Research & SEO Articles',
          text: 'Setelah website aktif, gunakan prompt berikut untuk memproduksi konten berkualitas tinggi secara terjadwal:',
          textEn: 'Once the site is live, use the following prompt to autonomously research and draft search-optimized content:',
          code: 'Lakukan riset kata kunci seputar "rekomendasi biji kopi arabika lokal untuk pemula". Buat 1 artikel pilar mendalam (1.200+ kata) dengan struktur heading H2/H3 yang rapi, meta description persuasif, serta rekomendasi internal link. Masukkan artikel ini sebagai Draf di WordPress ke dalam kategori "Panduan Kopi".',
          codeLang: 'chat',
        },
        {
          id: 'wp-safety',
          heading: '4. Transparansi Eksekusi & Status Draft yang Aman',
          headingEn: '4. Execution Transparency & Safe Draft Status',
          text: 'Agen Cuan menjalankan perintah WP-CLI nyata di latar belakang:\n\n• `wp core download && wp core install` untuk inisialisasi.\n• `wp post create --post_title="..." --post_status=draft` untuk publikasi artikel.\n• Artikel **selalu berstatus draf** saat diserahkan ke Cuan Inbox. Anda dapat meninjau tata bahasa dan skor SEO di panel admin WordPress atau ruang chat sebelum memutuskan untuk mempublikasikannya live.',
          textEn: 'Cuan runs deterministic WP-CLI commands in the background:\n\n• `wp core download && wp core install` for provisioning.\n• `wp post create --post_title="..." --post_status=draft` for articles.\n• Articles are **always created as drafts**. You inspect formatting, tone, and SEO score in WordPress admin or the Cuan chat thread before approving live publication.',
        },
      ],
    },
  },
  {
    slug: 'video-automation',
    group: 'examples',
    title: 'Produksi Video Vertikal (WIP)',
    titleEn: 'Vertical Short Video (WIP)',
    icon: 'Video',
    summary: '[Work in Progress] Rancangan alur konversi naskah ke video pendek MP4 (9:16) via Remotion.',
    summaryEn: '[Work in Progress] Blueprint workflow for script-to-video compilation via Remotion.',
    content: {
      intro: '> 🚧 **Status: Work in Progress (Eksperimen / Dalam Pengembangan)**\n> Alur kerja komposisi video pendek (Remotion headless render & voiceover synthesis) saat ini masih berupa riset dan eksperimen internal pada fase Public Alpha. Eksekusi rendering video menuntut dependensi sistem khusus yang belum diaktifkan secara default di image rilis standar. Bantu kami mematangkan arsitekturnya di [GitHub Issues](https://github.com/buchin/cuan/issues).\n\nVisi fitur ini adalah mengubah naskah tulisan menjadi klip video pendek format vertikal (9:16) secara mandiri di server.',
      introEn: '> 🚧 **Status: Work in Progress (Experimental / Under Development)**\n> Short-form video composition (headless Remotion rendering & voice synthesis) is currently an internal research blueprint during Public Alpha. Headless video compilation requires heavy system dependencies not bundled by default in the standard release image. Join the discussion on [GitHub Issues](https://github.com/buchin/cuan/issues).\n\nThe vision is transforming scripts into vertical short videos (9:16) autonomously on your server.',
      subsections: [
        {
          id: 'video-prerequisites',
          heading: '1. Produksi Video Otomatis Tanpa Aplikasi Edit yang Berat',
          headingEn: '1. Automated Video Without Heavy Video Editors',
          text: 'Anda tidak perlu menginstal software editing video yang rumit atau repot memotong klip di laptop:\n\n• **Cukup Siapkan Naskah**: Tulis topik atau poin yang ingin dibahas dalam bahasa sehari-hari di chat.\n• **Rendering Otomatis**: Cuan memadukan teks beranimasi, latar visual minimalis, dan suara narator alami langsung menjadi file video MP4 siap tayang.\n• **Distribusi Mudah**: Hasil video siap ditonton langsung di Inbox untuk persetujuan Anda.',
          textEn: 'No complex editing suites or manual timeline cutting required on your computer:\n\n• **Just Bring a Script**: Outline the topic or talking points naturally in chat.\n• **Automated Rendering**: Cuan assembles animated subtitles, clean visual layouts, and natural voiceover into a ready-to-share MP4.\n• **Effortless Review**: Preview the completed video directly in your chat thread for quick approval.',
          note: '💡 Zero Software Overhead: Seluruh pemrosesan video berjalan di server Anda tanpa membebani laptop atau HP Anda.',
          noteEn: '💡 Zero Software Overhead: All rendering takes place on your private server without draining your laptop or phone memory.',
        },
        {
          id: 'video-prompt',
          heading: '2. Contoh Prompt Siap Pakai',
          headingEn: '2. Ready-to-Use Copyable Prompt',
          text: 'Kirim instruksi berikut di Inbox Cuan Anda:',
          textEn: 'Send the following instruction in your Cuan Inbox:',
          code: 'Ambil poin-poin utama dari materi "5 Kebiasaan Pagi untuk Produktivitas Ekstrem". Buatkan video pendek vertikal format 9:16 (1080x1920) berdurasi 45 detik untuk Instagram Reels / TikTok. Gunakan narasi suara bahasa Indonesia yang percaya diri dan natural, tampilkan subtitle teks dinamis per kalimat di tengah layar dengan huruf tebal, gunakan latar gradien gelap minimalis, lalu render menjadi file MP4.',
          codeLang: 'chat',
        },
        {
          id: 'video-execution',
          heading: '3. Alur Kerja Nyata di Server',
          headingEn: '3. Deterministic Background Execution',
          text: 'Langkah nyata yang dijalankan runner Cuan:\n\n1. **Naskah & Timing**: Naskah dibagi menjadi segmen 5-7 detik per poin agar ritme video cepat dan menarik penonton.\n2. **Generate Audio Narasi**: Mengubah naskah ke file audio `.mp3` narator.\n3. **Komposisi Remotion**: Memasukkan props durasi audio dan teks subtitle ke dalam komponen React Remotion.\n4. **Headless Render**: Mengeksekusi `npx remotion render Root MyVideo output.mp4 --gl=angle` di terminal latar belakang.\n5. **Pratinjau di Chat**: File MP4 yang sudah jadi disajikan langsung di obrolan Cuan untuk Anda tonton.',
          textEn: 'Concrete steps executed by the Cuan runner:\n\n1. **Script Pacing**: The script is segmented into 5-7 second beats for high-retention pacing.\n2. **Audio Synthesis**: The text is synthesized into a natural `.mp3` narration voiceover.\n3. **Remotion Composition**: Audio timeline and dynamic subtitle props are fed into a clean React composition.\n4. **Headless Render**: Executes `npx remotion render Root MyVideo output.mp4 --gl=angle` headlessly.\n5. **Chat Playback**: The compiled MP4 is served directly in your Cuan thread for instant browser playback.',
        },
        {
          id: 'video-multi-dist',
          heading: '4. Distribusi Multi-Platform',
          headingEn: '4. Multi-Platform Distribution',
          text: 'Setelah video disetujui, Anda dapat mengunduh MP4 ke perangkat Anda, atau meminta agen: *"Jadwalkan video ini ke TikTok dan Instagram Reels lewat Tebar untuk jam 12:00 siang"*. Satu video, multi-platform, tanpa pengerjaan manual berulang.',
          textEn: 'Once approved, download the MP4 locally or instruct the agent: *"Schedule this video to TikTok and Instagram Reels via Tebar for 12:00 PM"*. One video, multi-platform broadcast, zero repetitive manual labor.',
        },
      ],
    },
  },
  {
    slug: 'saas-mvp-laravel',
    group: 'examples',
    title: 'Scaffolding MVP Web App (WIP)',
    titleEn: 'MVP Web App Scaffolding (WIP)',
    icon: 'Layers',
    summary: '[Work in Progress] Konsep pembuatan prototipe aplikasi web (Laravel) langsung di workspace server.',
    summaryEn: '[Work in Progress] Concept workflow for rapid web application scaffolding in server workspaces.',
    content: {
      intro: '> 🚧 **Status: Work in Progress (Eksperimen / Dalam Pengembangan)**\n> Alur kerja scaffolding aplikasi kompleks (seperti full-stack Laravel/database) merupakan blueprint kemampuan agen otonom tingkat lanjut yang sedang dimatangkan pada fase Public Alpha. Alur ini masih memerlukan supervisi manual intensif dan belum berstatus stabil tanpa campur tangan teknis developer. Diskusi dan masukan sangat diharapkan di [GitHub Issues](https://github.com/buchin/cuan/issues).\n\nVisi fitur ini adalah membantu founder atau solopreneur mewujudkan ide aplikasi web secara cepat langsung di server sendiri.',
      introEn: '> 🚧 **Status: Work in Progress (Experimental / Under Development)**\n> Complex application scaffolding (such as full-stack Laravel/database apps) is an advanced autonomous agent blueprint being matured during Public Alpha. This workflow currently requires close manual supervision and is not yet a 1-click autonomous pipeline. Feedback and collaboration are welcome on [GitHub Issues](https://github.com/buchin/cuan/issues).\n\nThe vision is assisting founders in prototyping web apps quickly on their own server.',
      subsections: [
        {
          id: 'laravel-prerequisites',
          heading: '1. Dari Ide Bisnis Jadi Aplikasi Nyata Tanpa Setup Rumit',
          headingEn: '1. From Idea to Working App Without Setup Hassle',
          text: 'Membangun prototipe aplikasi biasanya memakan waktu berhari-hari hanya untuk menyiapkan database dan kodingan awal. Bersama Cuan, Anda cukup menjelaskan alur kerja bisnis yang diinginkan:\n\n• **Bahasa Bisnis Biasa**: Deskripsikan fitur seperti berbicara dengan mitra teknologi (misal: pencatatan invoice, daftar klien, dan status pembayaran).\n• **Eksekusi Lengkap**: Cuan menyiapkan struktur aplikasi, database, dan tampilan antarmuka yang bersih dan langsung siap dicoba.',
          textEn: 'Prototyping an app usually consumes days configuring databases and dependencies. With Cuan, describe your desired business workflows naturally:\n\n• **Plain Business Language**: Outline features like chatting with a technical teammate (e.g. invoices, client records, and payment status).\n• **Autonomous Delivery**: Cuan provisions the underlying code, database, and clean interface ready to test.',
          note: '💡 Kontrol Penuh: Anda dapat meninjau setiap perubahan kode sebelum menyetujuinya (*Approve*), tanpa perlu repot koding sendiri.',
          noteEn: '💡 Complete Control: Inspect code diffs before approving, without needing to write code manually.',
        },
        {
          id: 'laravel-prompt',
          heading: '2. Contoh Prompt Siap Pakai',
          headingEn: '2. Ready-to-Use Copyable Prompt',
          text: 'Kirim instruksi berikut di Inbox Cuan Anda:',
          textEn: 'Send the following instruction in your Cuan Inbox:',
          code: 'Buatkan proyek Laravel 11 baru untuk aplikasi manajemen invoice sederhana bernama "TagihKilat". Gunakan database SQLite. Buatkan model, migrasi, dan controller CRUD untuk entitas Client (nama, email, no_hp) dan Invoice (nomor_invoice, total, status: unpaid/paid, tanggal_jatuh_tempo). Buatkan halaman dashboard sederhana berbasis Blade dan Tailwind untuk melihat total omzet dan daftar tagihan yang belum dibayar.',
          codeLang: 'chat',
        },
        {
          id: 'laravel-execution',
          heading: '3. Alur Kerja Nyata di Repositori Kode',
          headingEn: '3. Concrete Codebase Execution',
          text: 'Agen Cuan bekerja langsung pada file fisik di disk server:\n\n1. `composer create-project laravel/laravel tagihkilat`.\n2. Menjalankan `php artisan make:model Client -mrc` dan `php artisan make:model Invoice -mrc`.\n3. Menulis skema migrasi tabel dan relasi `Client hasMany Invoices`.\n4. Menjalankan migrasi `php artisan migrate --force`.\n5. Membuat route di `routes/web.php` dan tampilan dashboard Blade yang bersih.\n6. Menjalankan `php artisan test` untuk memverifikasi bahwa endpoint mengembalikan HTTP 200 tanpa error PHP.',
          textEn: 'The Cuan agent modifies authentic disk files:\n\n1. `composer create-project laravel/laravel tagihkilat`.\n2. Executes `php artisan make:model Client -mrc` and `php artisan make:model Invoice -mrc`.\n3. Writes database migration schemas and `Client hasMany Invoices` relationships.\n4. Runs `php artisan migrate --force` against the SQLite database.\n5. Maps routes in `routes/web.php` and crafts clean Blade views.\n6. Runs `php artisan test` to verify routes return HTTP 200 without syntax or runtime exceptions.',
        },
        {
          id: 'laravel-git-sync',
          heading: '4. Tinjauan Kode (Git Diff) & Auto-Commit',
          headingEn: '4. Git Diff Review & Push Guarantee',
          text: 'Setelah seluruh file dan pengujian selesai, Cuan menyajikan ringkasan Git Diff (file apa saja yang ditambah atau dimodifikasi). Anda dapat menginspeksi kode tersebut. Begitu Anda menekan **Approve**, Cuan membuat commit Git terstruktur dan otomatis melakukan push ke branch GitHub proyek Anda.',
          textEn: 'Upon completing generation and automated verification, Cuan presents a structured Git Diff summary detailing every created or modified file. You inspect the code, and when you click **Approve**, Cuan creates a structured Git commit and pushes directly to your configured GitHub remote.',
        },
      ],
    },
  },

  // ─── GRUP 4: ADMINISTRASI ───────────────────────────────────────────────────
  {
    slug: 'manage-projects',
    group: 'admin',
    title: 'Kelola Proyek & GitHub',
    titleEn: 'Managing Projects & GitHub',
    icon: 'FolderGit2',
    summary: 'Menambah proyek untuk cabang bisnis baru dan menghubungkan repositori GitHub.',
    summaryEn: 'Add projects for new business lines and link GitHub repositories.',
    content: {
      intro: '',
      introEn: '',
      subsections: [
        {
          id: 'add-projects',
          heading: '1. Menambah Proyek Baru untuk Cabang Bisnis',
          headingEn: '1. Adding New Business Projects',
          text: 'Setiap kali Anda membuat unit bisnis baru, toko online baru, atau mengelola klien berbeda:\n\n• **Cara 1 (Otomatis via Chat)**: Cukup sebutkan nama brand baru Anda saat meminta tugas di obrolan (misal: *"buat konten untuk @brandbaru"*). Cuan otomatis menawarkan pembuatan proyek baru tanpa Anda perlu membuka menu pengaturan.\n• **Cara 2 (Manual via Menu)**: Buka menu **Manage > Projects**, klik `+ New Project`, dan masukkan nama identitas bisnis (misal: `@glowcare.id` atau `kantorcabang.com`).\n\nSeluruh riset kompetitor, aset gambar, dan dokumen bisnis akan tersimpan mandiri di proyek tersebut.',
          textEn: 'Whenever onboarding a new business unit, online store, or client:\n\n• **Method 1 (Autonomous via Chat)**: Simply reference your new brand handle or domain in chat (e.g. *"draft copy for @newbrand"*). Cuan proactively offers to create the project without requiring manual menu navigation.\n• **Method 2 (Manual via Menu)**: Open **Manage > Projects**, click `+ New Project`, and enter the brand handle (e.g. `@glowcare.id` or `branchstore.com`).\n\nAll competitor research, media assets, and business records remain strictly isolated within that dedicated project.',
        },
        {
          id: 'github-sync',
          heading: '2. Menautkan Repositori GitHub (Opsional)',
          headingEn: '2. Linking a GitHub Repository (Optional)',
          text: 'Jika proyek Anda adalah website atau aplikasi yang kodenya dikelola di GitHub:\n\n• Masukkan URL repositori GitHub Anda saat membuat atau mengedit proyek.\n• Cuan otomatis menyinkronkan repositori dan membuat commit baru setiap kali tugas disetujui (*Approve*).\n• *Catatan*: Fitur ini sepenuhnya opsional. Jika bisnis Anda tidak membutuhkan coding (hanya artikel, riset, atau naskah video), Cuan menyimpannya dengan aman di database lokal tanpa perlu akun GitHub.',
          textEn: 'If your project is a website or codebase managed on GitHub:\n\n• Paste your GitHub repository URL when configuring the project.\n• Cuan automatically synchronizes the repo and commits code upon task approval (*Approve*).\n• *Note*: This is completely optional. If your business focuses on content, copy, or research, Cuan persists everything locally without requiring GitHub.',
        },
        {
          id: 'isolated-environments',
          heading: '3. Lingkungan & Variabel Proyek Terisolasi',
          headingEn: '3. Isolated Environment Variables',
          text: 'Setiap proyek memiliki pengaturan variabel lingkungan (*environment variables*) sendiri. Kunci rahasia integrasi untuk Toko A tidak akan pernah terbaca oleh AI saat mengerjakan tugas untuk Toko B.',
          textEn: 'Each project maintains independent environment variables. API tokens and private integration credentials for Store A are strictly inaccessible when the AI operates on Store B.',
        },
      ],
    },
  },
  {
    slug: 'contacts',
    group: 'admin',
    title: 'Contacts & CRM',
    titleEn: 'Contacts & CRM',
    icon: 'Users',
    summary: 'Database kontak pelanggan, histori percakapan, dan memori AI terpadu.',
    summaryEn: 'Unified customer database, conversation history, and AI customer memory.',
    content: {
      intro: '',
      introEn: '',
      subsections: [
        {
          id: 'crm-overview',
          heading: '1. Database Kontak Otomatis',
          headingEn: '1. Automated Contact Directory',
          text: 'Setiap pengunjung website yang memulai obrolan melalui widget live chat otomatis tercatat rapi di menu **Manage > Contacts** lengkap dengan identitas kontak, waktu interaksi, dan riwayat pesan.',
          textEn: 'Every website visitor who initiates a conversation through the live chat widget is automatically cataloged under **Manage > Contacts**, complete with identity metadata, timestamp, and message history.',
        },
        {
          id: 'customer-memory',
          heading: '2. Memori Pelanggan untuk Asisten AI',
          headingEn: '2. AI Customer Memory',
          text: 'Asisten AI secara cerdas mengingat preferensi, riwayat transaksi, dan pertanyaan sebelumnya dari setiap pelanggan. Ketika pelanggan kembali berkunjung, AI menyajikan konteks lengkap kepada staf Anda sehingga pelanggan merasa dilayani oleh tim yang mengenal mereka dengan baik.',
          textEn: 'The AI assistant retains customer preferences, prior inquiries, and transactional history. When customers return, the AI provides staff with full situational context, ensuring personalized, premium service.',
        },
        {
          id: 'tagging-segments',
          heading: '3. Label & Catatan Internal',
          headingEn: '3. Internal Tags & Notes',
          text: 'Staf dapat menyematkan label (misal: *VIP*, *Lead Panas*, *Komplain*) dan menambahkan catatan internal pribadi yang hanya bisa dibaca oleh tim dan AI tanpa terlihat oleh pelanggan.',
          textEn: 'Staff can attach status badges (e.g. *VIP*, *Hot Lead*, *Support*) and internal private notes accessible only by your team and the AI assistant.',
        },
      ],
    },
  },
  {
    slug: 'team',
    group: 'admin',
    title: 'Tim & Akses',
    titleEn: 'Team & Access',
    icon: 'Users',
    summary: 'Atur peran Pemilik vs Staf, undang tim lewat WhatsApp tanpa setup email.',
    summaryEn: 'Owner vs Staff roles, 1-click WhatsApp invites without email setup.',
    content: {
      intro: '',
      introEn: '',
      subsections: [
        {
          id: 'rbac-roles',
          heading: '1. Peran: Pemilik (Owner) vs Staf (Member)',
          headingEn: '1. Roles: Owner vs Staff Member',
          text: '• **Pemilik (Owner)**: Kontrol mutlak — mengatur kunci AI, melihat biaya, mengundang/menghapus staf, dan mengatur integrasi.\n• **Staf (Member)**: Fokus kerja — membalas chat pelanggan, mengerjakan tugas harian, dan meminta bantuan AI — tanpa pernah bisa melihat atau menyalin kunci API milik Pemilik.',
          textEn: '• **Owner**: Full administrative control — manages AI keys, views usage, invites/removes staff, and manages integrations.\n• **Member**: Daily execution — handles customer chats, completes tasks, and delegates to AI — strictly barred from viewing or copying private API keys.',
        },
        {
          id: 'instant-invite',
          heading: '2. Undang Tim Lewat WhatsApp (Tanpa Setup Email)',
          headingEn: '2. 1-Click WhatsApp Invites (No Email Setup)',
          text: 'Tidak perlu sewa server email atau setting DNS yang rumit:\n\n1. Buka menu **Team** di Cuan, klik **+ Invite Member**.\n2. Masukkan nama dan email staf Anda.\n3. Klik **Salin Tautan Undangan** (tautan aman berlaku 7 hari).\n4. Kirimkan tautan tersebut lewat WhatsApp atau Telegram.\n5. Staf cukup mengklik tautan, membuat kata sandi mereka sendiri, dan langsung mulai bekerja.',
          textEn: 'No need to subscribe to transactional email services or configure DNS:\n\n1. Open the **Team** menu in Cuan and click **+ Invite Member**.\n2. Enter your team member\'s name and email.\n3. Click **Copy Invite Link** (cryptographically signed, valid 7 days).\n4. Send via WhatsApp, Telegram, or Slack.\n5. The recipient clicks the link, sets their password, and immediately accesses the workspace.',
        },
      ],
    },
  },
  {
    slug: 'settings-maintenance',
    group: 'admin',
    title: 'Pengaturan & Pemeliharaan',
    titleEn: 'Settings & Maintenance',
    icon: 'Server',
    summary: 'Pembaruan otomatis di jam hening, worker health, rekomendasi server, dan backup 1 perintah.',
    summaryEn: 'Automated off-peak updates, worker health, server specs, and 1-command backups.',
    content: {
      intro: '',
      introEn: '',
      subsections: [
        {
          id: 'auto-update',
          heading: '1. Pembaruan Aplikasi Otomatis (Tanpa Terminal)',
          headingEn: '1. Automated System Updates (Zero Terminal)',
          text: 'Anda tidak perlu repot mengetik perintah terminal untuk memperbarui Cuan:\n\n• **Pembaruan Otomatis (Auto-Update)**: Buka menu **Settings > General**, lalu aktifkan tombol Auto-Update. Cuan otomatis memeriksa dan memperbarui aplikasi ke versi terbaru di jam hening (pukul 03:00 pagi).\n• **Periksa Manual**: Klik tombol **Check Update** di menu Settings untuk memeriksa rilis baru seketika.\n• *(Opsional bagi Sysadmin)*: Pembaruan via terminal tetap tersedia: `./scripts/update.sh`',
          textEn: 'No terminal commands needed to keep Cuan up to date:\n\n• **Automatic Updates**: Navigate to **Settings > General** and toggle on Auto-Update. Cuan automatically checks and updates itself during off-peak hours (default: 03:00 AM).\n• **Check Manually**: Click the **Check Update** button inside Settings to check for new releases instantly.\n• *(Optional for Sysadmins)*: Terminal updates remain available: `./scripts/update.sh`',
        },
        {
          id: 'worker-health',
          heading: '2. Memantau Kesehatan Sistem di Dashboard',
          headingEn: '2. System Health Monitoring in Dashboard',
          text: 'Pantau kondisi server langsung dari aplikasi tanpa perlu login terminal:\n\n• **Status Live di Dashboard**: Buka menu **Settings > General**, kartu **Worker Health** menampilkan status kesiapan runner, antrean tugas, dan denyut nadi server secara *real-time*.\n• *(Opsional bagi Sysadmin)*: Status container juga bisa dipantau via terminal: `docker compose ps` atau `curl http://localhost:8080/healthz`.',
          textEn: 'Monitor server vitals directly from the app without opening a terminal:\n\n• **Live Dashboard Status**: Open **Settings > General**, where the **Worker Health** card displays runner readiness, queue depth, and heartbeats in real time.\n• *(Optional for Sysadmins)*: Container status can also be queried via terminal: `docker compose ps` or `curl http://localhost:8080/healthz`.',
        },
        {
          id: 'backup-restore',
          heading: '3. Cadangkan & Pulihkan Data (1 Perintah)',
          headingEn: '3. 1-Command Backup & Restore',
          text: 'Database Cuan (SQLite) dan seluruh file bisnis tersimpan mandiri di server lokal Anda. Untuk mencadangkan data sebelum migrasi server atau arsip berkala, jalankan perintah di bawah:',
          textEn: 'Cuan database (SQLite) and business assets are stored privately on your local server. To create a backup snapshot before migration or for periodic archives, run:',
          code: '# Buat file cadangan ke folder backups/:\n./scripts/backup.sh\n\n# Pulihkan seluruh data dari cadangan terbaru:\n./scripts/restore.sh --latest --force',
          codeLang: 'bash',
          note: '💡 File cadangan otomatis diberi stempel tanggal rapi untuk memudahkan penyimpanan atau pemindahan ke Google Drive.',
          noteEn: '💡 Backup archives are timestamped and integrity-verified for seamless offsite backup.',
        },
        {
          id: 'vps-specs',
          heading: '4. Rekomendasi Spesifikasi Server',
          headingEn: '4. Recommended Server Specs',
          text: '• **Spesifikasi Hemat (Mulai Rp 10rb–Rp 50rb/bln)**: 1 vCPU, 1 GB RAM, 15 GB SSD (Sangat cukup untuk solopreneur dan toko online pemula).\n• **Spesifikasi Disarankan (Untuk Agensi / Tim Aktif)**: 2 vCPU, 2–4 GB RAM, 30 GB SSD.\n• **Sistem Operasi**: Ubuntu 22.04 LTS, Ubuntu 24.04 LTS, atau Debian 12.',
          textEn: '• **Budget Tier (Starting at ~$1–$4/mo)**: 1 vCPU, 1 GB RAM, 15 GB SSD (Sufficient for solopreneurs and small storefronts).\n• **Recommended Tier (For Active Teams / Agencies)**: 2 vCPU, 2–4 GB RAM, 30 GB SSD.\n• **Operating System**: Ubuntu 22.04 LTS, Ubuntu 24.04 LTS, or Debian 12.',
        },
      ],
    },
  },
]
