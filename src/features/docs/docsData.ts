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
          text: 'Cuan dirancang sebagai Project Manager yang meringankan beban kerja Anda, bukan menambah birokrasi formulir. Anda bebas memilih cara memulai:\n\n• **Jalur Cepat (Otomatis via Chat — Disukai Pengguna)**:\n  Anda tidak perlu membuka menu atau mengisi formulir apa pun! Cukup buka **Inbox** atau **New work**, lalu ketik apa yang Anda butuhkan (misal: *"buatkan landing page untuk barukopi.id"* atau *"riset 5 ide konten untuk toko online saya"*). Cuan secara cerdas mengenali nama bisnis Anda, menawarkan pembuatan proyek baru secara otomatis, dan langsung mengeksekusi tugasnya tanpa friksi.\n\n• **Jalur Terencana (via Menu Projects)**:\n  Bagi Anda yang menyukai persiapan rapi di awal: buka menu **Projects**, klik `+ New Project`, lalu masukkan nama brand atau domain website Anda (misal: `tokosahabat.com` atau `@barukopi.id`). Cuan seketika menyiapkan ruang kerja mandiri untuk brand tersebut.',
          textEn: 'Cuan is designed as a burden-relieving Project Manager, never an administrative hurdle. You have two flexible ways to start:\n\n• **Fast Track (Autonomous via Chat — Recommended)**:\n  Skip forms and menus entirely! Simply open **Inbox** or **New work** and describe what you need (e.g. *"create a landing page for barukopi.id"* or *"research 5 content ideas for my store"*). Cuan proactively detects your brand, offers to provision a dedicated workspace in 1 click, and executes the work without friction.\n\n• **Planned Track (via Projects Menu)**:\n  For those who prefer structured upfront setup: navigate to **Projects**, click `+ New Project`, and enter your brand handle or domain (e.g. `tokosahabat.com` or `@barukopi.id`). Cuan immediately provisions a clean workspace for that business unit.',
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
          text: 'Di daftar Inbox, Cuan menggunakan filosofi visual tenang (terinspirasi standar Things 3) tanpa emoji, spinner agresif, atau warna neon mencolok. Anda dapat memantau status penyelesaian langsung dari sudut avatar percakapan:\n\n• **Centang Hijau (`CheckCircle2`) di Sudut Avatar**:\n  - Muncul di pojok kanan bawah avatar saat seluruh tugas selesai atau percakapan ditandai tuntas (*Resolved*).\n  - **Tombol Interaktif**: Anda bisa mengklik langsung badge ini dari daftar inbox untuk menandai percakapan selesai (*Resolve*) atau membukanya kembali (*Reopen*) tanpa harus membuka ruang chat terlebih dahulu.\n\n• **Lingkaran / Progres Pie (`task-pie-progress`) di Sudut Avatar**:\n  - Muncul di pojok kanan bawah avatar saat masih ada tugas yang sedang berjalan atau belum tuntas (*In Progress*).\n  - Jika percakapan memiliki beberapa tugas, irisan lingkaran terisi bertahap sesuai rasio tugas yang telah selesai.\n  - Saat runner sedang aktif mengeksekusi perintah di latar belakang, lingkaran memiliki **denyut lembut** (*task-pulse-subtle*).\n\n• **Lingkaran Netral (`Circle`) di Sudut Avatar**:\n  - Muncul pada percakapan reguler yang belum memiliki tugas khusus, siap diklik jika Anda ingin menandai percakapan telah selesai.\n\n*Catatan Indikator Rinci*: Detail teknis per tugas (seperti draf menunggu persetujuan `Eye` ungu, antrean runner `Clock3`, atau perhatian manual `AlertCircle`) ditampilkan terpisah di dalam kartu tugas obrolan dan detail proyek, bukan di sudut avatar Inbox.',
          textEn: 'In the Inbox list, Cuan employs a calm visual philosophy (inspired by Things 3 standards) free from emojis, aggressive spinners, or neon glare. You can monitor execution progress directly from the conversation avatar corner:\n\n• **Green Checkmark (`CheckCircle2`) on Avatar Corner**:\n  - Appears at the bottom-right of the avatar when all tasks are finished or the conversation is marked Resolved.\n  - **Interactive Toggle**: Click this badge directly from the inbox list to mark conversations as Resolved or Reopen them without having to open the chat room first.\n\n• **Pie Progress Ring (`task-pie-progress`) on Avatar Corner**:\n  - Appears at the bottom-right of the avatar when tasks are actively running or unfinished (*In Progress*).\n  - If multiple tasks exist, pie slices fill incrementally as each task is verified and completed.\n  - While the runner actively executes background steps, the ring exhibits a **calm subtle pulse** (*task-pulse-subtle*).\n\n• **Neutral Outline Ring (`Circle`) on Avatar Corner**:\n  - Appears on standard conversations without active background tasks, ready to click when you wish to resolve the thread.\n\n*Detailed Task Indicators*: Granular technical statuses (such as approval review `Eye`, queue position `Clock3`, or manual alert `AlertCircle`) are displayed inside chat task cards and project task views, not on the Inbox avatar.',
          note: 'Zero Visual Noise: Seluruh indikator di daftar Inbox menggunakan ikon SVG minimalis dan terintegrasi langsung di sudut avatar, memastikan pengawasan kerja berjam-jam tetap nyaman tanpa distorsi visual.',
          noteEn: 'Zero Visual Noise: All Inbox indicators use clean minimalist SVG icons embedded at the avatar corner, ensuring long-term monitoring comfort without visual fatigue.',
        },
        {
          id: 'tasks-monitoring',
          heading: '4. Navigasi Utama & Pengawasan Tugas',
          headingEn: '4. Main Navigation & Task Oversight',
          text: 'Anda tidak perlu repot membuat atau menggeser-geser tiket tugas setiap hari. Navigasi utama Cuan berfokus pada **Inbox, Projects, New work, Contacts, dan Settings**—seluruh antrean dikelola otomatis di balik layar:\n\n• **Transparansi Penuh**: Anda dapat memantau tugas yang sedang berjalan (*Doing*), menunggu persetujuan (*Needs Approval*), atau riwayat tugas selesai (*Done*) langsung dari kartu obrolan di **Inbox** maupun di dalam tab **Projects** (serta papan **Tasks**).\n• **Audit Trail**: Anda bisa mengklik tugas apa pun untuk menginspeksi log eksekusi, penggunaan token, dan detail runner bila dibutuhkan.',
          textEn: 'You never have to manage tickets or drag Kanban cards daily. Cuan’s main navigation focuses on **Inbox, Projects, New work, Contacts, and Settings**—all execution workflows and queues are handled autonomously:\n\n• **Full Transparency**: Monitor active jobs (*Doing*), pending reviews (*Needs Approval*), or completed history (*Done*) directly from **Inbox** task cards, inside **Projects**, or on the **Tasks** view.\n• **Audit Trail**: Click any task to inspect execution logs, token usage, and runner details whenever needed.',
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
    title: 'Otomasi Konten Sosmed',
    titleEn: 'Social Media Automation',
    icon: 'Share2',
    summary: 'Riset ide, template visual carousel, dan penjadwalan konten multi-platform.',
    summaryEn: 'Content research, carousel design templates, and multi-platform scheduling.',
    content: {
      intro: 'Rancangan alur kerja untuk membangun mesin konten mandiri di server sendiri: meriset topik, menghasilkan slide visual, dan menjadwalkan publikasi langsung ke akun media sosial.',
      introEn: 'Conceptual workflow for automated social content production: researching topics, compiling visual slides, and scheduling posts directly across social platforms.',
      subsections: [
        {
          id: 'wip-status',
          heading: 'Dalam Pengerjaan (Work in Progress)',
          headingEn: 'Work in Progress',
          text: 'Fitur dan alur kerja otomasi konten sosmed saat ini masih dalam tahap riset dan pengembangan aktif pada fase Public Alpha (**belum aktif di rilis saat ini**).\n\n• **Spesifikasi yang sedang disiapkan**: Integrasi tool Model Context Protocol (MCP) untuk publisher media sosial, template layout HTML-to-Image yang konsisten, dan rendering gambar headless di server.\n• **Status**: Perancangan modul dan pengujian arsitektur.\n\nPunya masukan atau ingin berdiskusi seputar arsitektur otomasi konten? Sampaikan ide Anda di [GitHub Issues buchin/cuan](https://github.com/buchin/cuan/issues).',
          textEn: 'Social content automation workflows are currently in active research and development during the Public Alpha phase (**not yet available in this release**).\n\n• **Upcoming Specifications**: Model Context Protocol (MCP) integrations for social channels, responsive HTML-to-Image templates, and headless server rendering.\n• **Status**: Module architecture and dependency evaluation.\n\nHave ideas or feedback? Join the discussion on [GitHub Issues buchin/cuan](https://github.com/buchin/cuan/issues).',
        },
      ],
    },
  },
  {
    slug: 'wordpress-niche-site',
    group: 'examples',
    title: 'WordPress Niche Site Otomatis',
    titleEn: 'Automated WordPress Niche Site',
    icon: 'Globe',
    summary: 'Penyusunan website WordPress, tema, dan penerbitan konten secara mandiri.',
    summaryEn: 'Autonomous WordPress site setup, theme provisioning, and article publishing.',
    content: {
      intro: 'Konsep alur kerja teknis untuk memasang, mengonfigurasi, dan mengelola website WordPress di server mandiri tanpa konfigurasi manual.',
      introEn: 'Technical blueprint for automated WordPress provisioning, theme installation, and content drafting on your own server.',
      subsections: [
        {
          id: 'wip-status',
          heading: 'Dalam Pengerjaan (Work in Progress)',
          headingEn: 'Work in Progress',
          text: 'Otomasi deployment dan manajemen WordPress via WP-CLI saat ini sedang dalam proses perancangan (**belum aktif di rilis saat ini**).\n\n• **Spesifikasi yang sedang disiapkan**: Auto-provisioning web server terisolasi per domain, database terpisah per proyek, dan pembuatan draf artikel SEO terverifikasi.\n• **Status**: Perancangan alur orkestrasi server.\n\nIkuti perkembangan atau diskusikan kebutuhan Anda di [GitHub Issues buchin/cuan](https://github.com/buchin/cuan/issues).',
          textEn: 'Automated WordPress deployment and management via WP-CLI is currently under development (**not yet available in this release**).\n\n• **Upcoming Specifications**: Isolated web server vhosts per domain, dedicated database instances, and verified SEO draft creation.\n• **Status**: Server orchestration architecture.\n\nFollow progress or share use-cases on [GitHub Issues buchin/cuan](https://github.com/buchin/cuan/issues).',
        },
      ],
    },
  },
  {
    slug: 'video-automation',
    group: 'examples',
    title: 'Produksi Video Pendek Vertikal',
    titleEn: 'Vertical Short Video Automation',
    icon: 'Video',
    summary: 'Konversi topik naskah menjadi video vertikal MP4 (9:16) untuk Reels, TikTok, dan Shorts.',
    summaryEn: 'Converting script topics into vertical MP4 videos (9:16) for Reels, TikTok, and Shorts.',
    content: {
      intro: 'Rancangan alur perakitan video vertikal beranimasi subtitle dan narasi suara secara mandiri di server tanpa aplikasi editing manual.',
      introEn: 'Automated pipeline concept for assembling vertical videos with animated subtitles and vocal narration directly on the server.',
      subsections: [
        {
          id: 'wip-status',
          heading: 'Dalam Pengerjaan (Work in Progress)',
          headingEn: 'Work in Progress',
          text: 'Pembuatan video otomatis (Remotion headless rendering & audio narator) saat ini masih berupa riset internal (**belum tersedia di rilis saat ini**).\n\n• **Spesifikasi yang sedang disiapkan**: Rendering video headless yang hemat CPU/RAM agar dapat berjalan stabil di server spesifikasi 1GB-2GB.\n• **Status**: Riset dependensi rendering grafis dan audio.\n\nMari berdiskusi seputar arsitektur video di [GitHub Issues buchin/cuan](https://github.com/buchin/cuan/issues).',
          textEn: 'Automated video compilation (headless Remotion rendering & narrator voiceover) is currently in internal research (**not yet available in this release**).\n\n• **Upcoming Specifications**: Resource-optimized headless video rendering that runs stably on 1GB-2GB RAM servers.\n• **Status**: Audio synthesis and graphic rendering research.\n\nJoin the discussion on [GitHub Issues buchin/cuan](https://github.com/buchin/cuan/issues).',
        },
      ],
    },
  },
  {
    slug: 'saas-mvp-laravel',
    group: 'examples',
    title: 'Scaffolding MVP Web App',
    titleEn: 'MVP Web App Scaffolding',
    icon: 'Layers',
    summary: 'Pembuatan prototipe aplikasi web full-stack secara cepat di workspace server.',
    summaryEn: 'Rapid full-stack web application prototyping in server workspaces.',
    content: {
      intro: 'Konsep pembuatan kerangka aplikasi web atau alat kerja bisnis internal secara mandiri dari deskripsi kebutuhan bisnis.',
      introEn: 'Autonomous scaffolding concept for web application frameworks and internal business tooling from plain requirements.',
      subsections: [
        {
          id: 'wip-status',
          heading: 'Dalam Pengerjaan (Work in Progress)',
          headingEn: 'Work in Progress',
          text: 'Scaffolding aplikasi web kompleks (seperti full-stack Laravel dan database migrations) saat ini masih dalam tahap riset agen otonom (**belum berstatus otomatis penuh tanpa campur tangan teknis**).\n\n• **Spesifikasi yang sedang disiapkan**: Sandboxing eksekusi kode, pengujian unit test otomatis sebelum approval, dan isolasi container runtime.\n• **Status**: Pengujian arsitektur agen tingkat lanjut.\n\nMari berkolaborasi mematangkan kapabilitas ini di [GitHub Issues buchin/cuan](https://github.com/buchin/cuan/issues).',
          textEn: 'Complex application scaffolding (such as full-stack Laravel apps with database migrations) is currently an active autonomous agent research area (**not yet a fully automated hands-free workflow**).\n\n• **Upcoming Specifications**: Code execution sandboxing, automated unit testing pre-approval, and container runtime isolation.\n• **Status**: Advanced agent architecture evaluation.\n\nCollaborate with us on [GitHub Issues buchin/cuan](https://github.com/buchin/cuan/issues).',
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
          text: 'Setiap kali Anda membuat unit bisnis baru, toko online baru, atau mengelola klien berbeda:\n\n• **Cara 1 (Otomatis via Chat)**: Cukup sebutkan nama brand baru Anda saat meminta tugas di obrolan (misal: *"buat konten untuk @brandbaru"*). Cuan otomatis menawarkan pembuatan proyek baru tanpa Anda perlu membuka menu pengaturan.\n• **Cara 2 (Manual via Menu)**: Buka menu **Projects**, klik `+ New Project`, dan masukkan nama identitas bisnis (misal: `@glowcare.id` atau `kantorcabang.com`).\n\nSeluruh riset kompetitor, aset gambar, dan dokumen bisnis akan tersimpan mandiri di proyek tersebut.',
          textEn: 'Whenever onboarding a new business unit, online store, or client:\n\n• **Method 1 (Autonomous via Chat)**: Simply reference your new brand handle or domain in chat (e.g. *"draft copy for @newbrand"*). Cuan proactively offers to create the project without requiring manual menu navigation.\n• **Method 2 (Manual via Menu)**: Open **Projects**, click `+ New Project`, and enter the brand handle (e.g. `@glowcare.id` or `branchstore.com`).\n\nAll competitor research, media assets, and business records remain strictly isolated within that dedicated project.',
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
          text: 'Setiap pengunjung website yang memulai obrolan melalui widget live chat otomatis tercatat rapi di menu **Contacts** lengkap dengan identitas kontak, waktu interaksi, dan riwayat pesan.',
          textEn: 'Every website visitor who initiates a conversation through the live chat widget is automatically cataloged under **Contacts**, complete with identity metadata, timestamp, and message history.',
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
