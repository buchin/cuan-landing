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
  group: 'getting-started' | 'workflow' | 'admin'
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
  id: 'getting-started' | 'workflow' | 'admin'
  label: string
  labelEn: string
}

export const DOC_GROUPS: DocGroup[] = [
  { id: 'getting-started', label: 'Memulai', labelEn: 'Getting Started' },
  { id: 'workflow', label: 'Workflow', labelEn: 'Workflow' },
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
          text: '• **Domain belum bisa dibuka atau belum HTTPS?** Tunggu 1–5 menit propagasi DNS. Di VPS biasa, pastikan firewall mengizinkan port 80 dan 443: `sudo ufw allow 80/tcp && sudo ufw allow 443/tcp`.\n• **Cek apakah Cuan berjalan normal?** Jalankan perintah: `docker compose ps`. Status harus "Up" atau "healthy".\n• **Pindah ke server baru?** Jalankan `./scripts/backup.sh`, salin file dari folder `backups/` ke server baru, lalu jalankan `./scripts/restore.sh --latest --force`. Seluruh data pulih 100%.',
          textEn: '• **Domain unreachable or SSL pending?** Allow 1–5 minutes for DNS propagation. On standard VPS, verify firewall allows traffic: `sudo ufw allow 80/tcp && sudo ufw allow 443/tcp`.\n• **Check runtime health?** Run: `docker compose ps`. Containers should be "Up" or "healthy".\n• **Migrating servers?** Run `./scripts/backup.sh`, transfer the snapshot from `backups/`, and run `./scripts/restore.sh --latest --force`. Instant 100% data recovery.',
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
          text: 'Bagi Anda yang menginginkan privasi mutlak atau server tanpa akses internet luar:\n\n• Pasang Ollama di server Anda (`ollama run qwen2.5:14b` atau `deepseek-r1:8b`).\n• Di Cuan, pilih provider **Ollama Local** dan masukkan alamat `http://localhost:11434`.\n• Seluruh pemrosesan teks berjalan 100% di server Anda tanpa ada data yang keluar.',
          textEn: 'For complete data sovereignty or air-gapped server environments:\n\n• Install Ollama on your server (`ollama run qwen2.5:14b` or `deepseek-r1:8b`).\n• In Cuan, choose **Ollama Local** and set endpoint to `http://localhost:11434`.\n• 100% of reasoning occurs locally on your private hardware with zero outbound network calls.',
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
          heading: '2. Membuat Proyek Pertama (30 Detik)',
          headingEn: '2. Creating Your First Project (30 Seconds)',
          text: '1. Buka menu **Manage > Projects** di navigasi kiri, lalu klik `+ New Project`.\n2. Beri nama proyek sesuai nama brand atau domain website Anda (misal: `tokosahabat.com` atau `Kopi Senja`).\n3. Cuan seketika menyiapkan ruang kerja bersih dan mandiri khusus untuk brand ini.',
          textEn: '1. Open **Manage > Projects** from the sidebar and click `+ New Project`.\n2. Enter your brand or website domain (e.g. `tokosahabat.com` or `Kopi Senja`).\n3. Cuan immediately provisions a clean, isolated workspace for this business unit.',
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
          heading: '1. Mulai Pekerjaan Seketika (New Work)',
          headingEn: '1. Start Instantly from New Work',
          text: 'Buka halaman **New work** (ikon `+` di navigasi kiri):\n\n• **Pilih Brand**: Pilih nama proyek yang ingin Anda kerjakan (atau biarkan `Project: Auto` jika ingin langsung mulai).\n• **Instruksi Bebas**: Ketik kebutuhan Anda secara natural seperti berbicara dengan staf profesional—**tidak perlu tag @cuan atau mention apa pun**:\n\nAnda bisa menyalin contoh instruksi berikut langsung ke kolom input:',
          textEn: 'Open the **New work** page (the `+` icon in the navigation):\n\n• **Target Brand**: Select the project you want to work on (or leave it on `Project: Auto`).\n• **Natural Instructions**: Describe what you need naturally like speaking to a skilled assistant—**no tag or @cuan mention needed**:\n\nCopy this sample prompt directly into the input box:',
          code: 'buatkan 3 opsi copywriting sales page yang menonjolkan garansi 30 hari untuk produk ini',
          codeLang: 'chat',
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
          heading: '3. Kamus Simbol Status Task di Samping Avatar',
          headingEn: '3. Avatar Task Status Indicators Guide',
          text: 'Di samping avatar agen pada daftar chat dan panel tugas, Cuan menampilkan mikro-indikator status visual agar Anda langsung tahu kondisi kerja AI tanpa perlu membuka terminal:\n\n• 🟢 **Titik Hijau Berdenyut (`StatusDot: working`)**: Agen sedang aktif memproses instruksi di latar belakang.\n• 🕒 **Ikon Jam Abu-abu (`Clock3: queued`)**: Tugas sedang berada dalam antrean runner.\n• 🥧 **Lingkaran Pie Berdenyut (`TaskProgress: pie`)**: Beberapa subtugas sedang diproses secara paralel (lingkaran pie terisi bertahap).\n• 🟣 **Centang Ganda Ungu (`CheckCheck: review`)**: AI telah menyelesaikan draf dan menunggu persetujuan Anda (*Needs Approval*).\n• ✅ **Centang Hijau Melingkar (`CheckCircle2: complete`)**: Seluruh pekerjaan telah disetujui dan beres 100%.\n• ⚠️ **Tanda Seru Oranye (`AlertCircle: attention`)**: Tugas membutuhkan perhatian atau terhambat.',
          textEn: 'Beside the agent avatar in chat lists and task panels, Cuan displays subtle micro-indicators so you can monitor progress at a glance without opening a terminal:\n\n• 🟢 **Green Pulsing Dot (`StatusDot: working`)**: Agent is actively executing tasks in the background.\n• 🕒 **Muted Clock (`Clock3: queued`)**: Task is queued awaiting runner capacity.\n• 🥧 **Pulsing Pie Chart (`TaskProgress: pie`)**: Parallel subtasks in progress (pie segment fills proportionally).\n• 🟣 **Double Purple Checkmarks (`CheckCheck: review`)**: Deliverable is ready for your review (*Needs Approval*).\n• ✅ **Green Check Circle (`CheckCircle2: complete`)**: All tasks approved and completed.\n• ⚠️ **Amber Alert (`AlertCircle: attention`)**: Task requires attention or encountered an issue.',
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

  // ─── GRUP 3: ADMINISTRASI ───────────────────────────────────────────────────
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
          text: 'Setiap kali Anda membuat unit bisnis baru, toko online baru, atau mengelola klien berbeda:\n\n1. Buka menu **Manage > Projects**, klik `+ New Project`.\n2. Beri nama proyek sesuai identitas bisnis (misal: `@glowcare.id` atau `kantorcabang.com`).\n3. Seluruh riset kompetitor, aset gambar, dan dokumen bisnis akan tersimpan mandiri di proyek tersebut.',
          textEn: 'Whenever onboarding a new business unit, online store, or client:\n\n1. Open **Manage > Projects** and click `+ New Project`.\n2. Name the project according to the brand entity (e.g. `@glowcare.id` or `branchstore.com`).\n3. All competitor research, image assets, and documentation remain strictly contained within that project.',
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
