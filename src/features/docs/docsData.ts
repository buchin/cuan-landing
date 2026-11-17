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
    title: 'Quick Start',
    titleEn: 'Quick Start',
    icon: 'Terminal',
    summary: 'Pasang Cuan di server atau laptop dalam 3 menit.',
    summaryEn: 'Deploy Cuan on your server or local machine in 3 minutes.',
    content: {
      intro: 'Hanya butuh 3 langkah mudah: 1. Siapkan Subdomain, 2. Pasang Cuan (pilih Opsi A, B, atau C), dan 3. Buka Dashboard.',
      introEn: 'Just 3 simple steps: 1. Prepare Subdomain, 2. Install Cuan (choose Option A, B, or C), and 3. Open Dashboard.',
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
          headingEn: '4. Option C: Self-Managed (Local Machine / Docker)',
          text: 'Bagi Anda yang ingin menguji Cuan di laptop atau server pribadi tanpa domain:',
          textEn: 'For testing Cuan on your laptop or personal server without a domain:',
          code: 'curl -fsSL https://cuan.work/docker-compose.yml -o docker-compose.yml\ndocker compose up -d',
          codeLang: 'bash',
          note: 'Setelah container aktif, buka `http://localhost:8080` di browser Anda.',
          noteEn: 'Once containers are running, navigate to `http://localhost:8080` in your browser.',
        },
        {
          id: 'first-setup',
          heading: '5. Aktivasi: Buka Browser & Buat Akun Pemilik',
          headingEn: '5. Activation: Open Browser & Create Owner Account',
          text: '1. **Buka Alamat Cuan**: Kunjungi `https://cuan.bisnisanda.com` (atau `http://localhost:8080` jika di laptop).\n2. **Buat Akun Pemilik (Owner)**: Masukkan nama lengkap, email, dan password Anda.\n3. **Mulai Bekerja**: Akun pertama ini otomatis menjadi Superadmin dengan kendali penuh atas sistem.',
          textEn: '1. **Open Cuan**: Visit `https://cuan.yourbusiness.com` (or `http://localhost:8080` locally).\n2. **Create Owner Account**: Enter your full name, email, and password.\n3. **Ready to Work**: This first account automatically becomes the Superadmin with complete control over your workspace.',
        },
        {
          id: 'troubleshooting',
          heading: '6. Kendala Umum & Solusi Cepat',
          headingEn: '6. Common Issues & Quick Fixes',
          text: '• **Domain belum bisa dibuka atau belum HTTPS?**\n  Tunggu 1–5 menit propagasi DNS. Di VPS biasa, pastikan firewall mengizinkan port 80 dan 443: `sudo ufw allow 80/tcp && sudo ufw allow 443/tcp`.\n\n• **Cek apakah Cuan berjalan normal?**\n  Jalankan perintah: `docker compose ps`. Status harus "Up" atau "healthy".\n\n• **Pindah ke server baru?**\n  Jalankan `./scripts/backup.sh`, salin file dari folder `backups/` ke server baru, lalu jalankan `./scripts/restore.sh --latest --force`. Seluruh data pulih 100%.',
          textEn: '• **Domain unreachable or missing HTTPS?**\n  Allow 1–5 minutes for DNS propagation. On standard VPS, ensure ports 80/443 are open: `sudo ufw allow 80/tcp && sudo ufw allow 443/tcp`.\n\n• **Verify Cuan is running normally?**\n  Run: `docker compose ps`. Status should indicate "Up" or "healthy".\n\n• **Migrating to a new server?**\n  Run `./scripts/backup.sh`, copy the backup archive to your new server, then run `./scripts/restore.sh --latest --force`. 100% loss-free recovery.',
        },
      ],
    },
  },
  {
    slug: 'ai-providers',
    title: 'Koneksi AI',
    titleEn: 'AI Providers',
    icon: 'Cpu',
    summary: 'Gunakan langganan bulanan tanpa biaya token atau pasang model AI apa saja di dunia.',
    summaryEn: 'Use flat monthly subscriptions or connect any AI model with zero markup.',
    content: {
      intro: 'Cuan memberi kebebasan penuh tanpa vendor lock-in. Anda bisa memakai langganan bulanan yang sudah Anda miliki (Claude Pro, ChatGPT Plus, Gemini Advanced) tanpa biaya token per kata, atau menghubungkan kunci API model AI apa pun di dunia dengan tarif hemat.',
      introEn: 'Complete freedom with zero vendor lock-in. Use flat monthly subscriptions you already own (Claude Pro, ChatGPT Plus, Gemini Advanced) with zero per-token markup, or connect API keys for any frontier or budget AI model worldwide.',
      subsections: [
        {
          id: 'cli-subscription',
          heading: '1. Langganan Bulanan (Claude Pro / ChatGPT Plus / Gemini)',
          headingEn: '1. Monthly Subscriptions (Claude Pro / ChatGPT Plus / Gemini)',
          text: 'Jika sudah berlangganan Claude Pro/Team, ChatGPT Plus/Team, atau Gemini Advanced, Anda tidak perlu membeli saldo token API terpisah:\n\n• **Bebas Tagihan Token**: Asisten AI berjalan di server menggunakan kuota wajar langganan bulanan Anda tanpa tagihan per kata.\n• **Login Resmi 1-Klik**: Menggunakan harness resmi penyedia (Claude Code `claude`, Codex `codex`, atau Google Antigravity `agy`).\n• **Cara Menghubungkan**:\n  1. Buka menu **Settings > AI Providers** di dashboard Cuan.\n  2. Pilih penyedia: **Claude Code**, **ChatGPT CLI**, atau **Antigravity**.\n  3. Klik tautan login resmi yang muncul di layar, lalu setujui di browser Anda.\n  4. Selesai. Asisten AI langsung aktif seketika.',
          textEn: 'If you already subscribe to Claude Pro/Team, ChatGPT Plus/Team, or Google Gemini Advanced, you never need to buy separate per-token API credits:\n\n• **Zero Token Invoices**: AI assistants operate within your existing monthly subscription quota with zero per-token surprise billing.\n• **1-Click Official Login**: Powered by official provider harnesses (Claude Code `claude`, Codex `codex`, or Google Antigravity `agy`).\n• **How to Connect**:\n  1. Open **Settings > AI Providers** in your Cuan dashboard.\n  2. Select your provider: **Claude Code**, **ChatGPT CLI**, or **Antigravity**.\n  3. Click the official login URL shown on screen and authorize in your browser.\n  4. Done. AI assistants are immediately ready for work.',
          note: '💡 Pilihan favorit agensi dan pemilik bisnis karena pengeluaran bulanan untuk AI menjadi tetap tanpa kekhawatiran tagihan membengkak.',
          noteEn: '💡 A favorite for agencies and business owners because AI expenses remain fixed with zero token-billing anxiety.',
        },
        {
          id: 'universal-byok',
          heading: '2. Pasang Kunci API (Bebas Pilih Model)',
          headingEn: '2. Custom API Keys (BYOK — Bring Your Own Key)',
          text: 'Cuan mendukung seluruh keluarga model AI modern tanpa terkunci ke satu perusahaan:\n\n• **Model Penalaran Terdepan (Frontier & Deep Reasoning)**:\n  Anthropic (Claude Opus 5.5, Sonnet 5.5, Haiku 5.5), OpenAI (o3, o4-mini, GPT-5), Google Gemini (Gemini 3 Flash, Gemini 4 Argon & Hydrogen), xAI (Grok 3).\n• **Model Hemat Ekstrem & Konteks Raksasa (Super Murah & Cepat)**:\n  DeepSeek (DeepSeek V4.1 Flash, V3, R1), Moonshot Kimi (Kimi k1.5, Kimi k2 dengan konteks 2M), MiniMax (MiniMax-Text-01, Hailuo), Zhipu GLM (GLM-4-Plus, GLM-5).\n• **Model Terbuka (Open Weights) Berkecepatan Tinggi**:\n  Meta Muse & Llama (Llama 3.3 / Llama 4) via Groq (kecepatan kilat 500+ token/detik) atau OpenRouter (ratusan model dalam 1 saldo).\n• **Model Lokal 100% Gratis di Komputer Sendiri**:\n  Ollama atau LM Studio (data bisnis Anda tidak pernah meninggalkan server pribadi Anda).',
          textEn: 'Zero vendor lock-in. Connect API keys from the entire modern AI landscape:\n\n• **Frontier & Deep Reasoning Models**:\n  Anthropic (Claude Opus 5.5, Sonnet 5.5, Haiku 5.5), OpenAI (o3, o4-mini, GPT-5), Google Gemini (Gemini 3 Flash, Gemini 4 Argon & Hydrogen), xAI (Grok 3).\n• **Ultra-Budget & Giant Context Powerhouses**:\n  DeepSeek (DeepSeek V4.1 Flash, V3, R1), Moonshot Kimi (Kimi k1.5, Kimi k2 with 2M context), MiniMax (MiniMax-Text-01, Hailuo), Zhipu GLM (GLM-4-Plus, GLM-5).\n• **High-Speed Open Weights**:\n  Meta Muse & Llama (Llama 3.3 / Llama 4) via Groq (lightning-fast 500+ tok/s) or OpenRouter (hundreds of models on one balance).\n• **100% Free Offline Local Models**:\n  Ollama or LM Studio (confidential business data never leaves your private machine).',
        },
        {
          id: 'custom-endpoints',
          heading: '3. Pasang Penyedia Kustom (Tahan Masa Depan)',
          headingEn: '3. Custom Endpoints (Future-Proof Architecture)',
          text: 'Cuan menggunakan protokol universal yang kompatibel dengan format OpenAI dan Anthropic. Kapan pun ada model baru yang dirilis esok hari, Anda **TIDAK PERLU** menunggu pembaruan software Cuan. Cukup masukkan Base URL dan Nama Model di menu **Settings > AI Providers**:\n\n• **Moonshot Kimi**:\n  Base URL: `https://api.moonshot.cn/v1`\n  Model: `moonshot-v1-auto` atau `kimi-k1.5`\n• **MiniMax**:\n  Base URL: `https://api.minimax.chat/v1`\n  Model: `minimax-text-01` atau `abab6.5s-chat`\n• **DeepSeek**:\n  Base URL: `https://api.deepseek.com/v1`\n  Model: `deepseek-chat`, `deepseek-reasoner` (R1), atau `deepseek-v4-flash`\n• **Zhipu GLM**:\n  Base URL: `https://open.bigmodel.cn/api/paas/v4`\n  Model: `glm-4-plus` atau `glm-4-flash`\n• **Groq (Super Cepat)**:\n  Base URL: `https://api.groq.com/openai/v1`\n  Model: `llama-3.3-70b-versatile`\n• **OpenRouter (Agregator 200+ Model)**:\n  Base URL: `https://openrouter.ai/api/v1`\n  Model: `meta-llama/llama-3.3-70b-instruct` atau `google/gemini-2.5-flash`\n• **Ollama di Komputer Sendiri (Gratis)**:\n  Base URL: `http://localhost:11434/v1` (API Key boleh dikosongkan)\n  Model: `llama3.3` atau `deepseek-r1`',
          textEn: 'Cuan utilizes universal OpenAI-compatible and Anthropic-compatible protocols. Whenever a breakthrough model launches tomorrow, you **NEVER** have to wait for software updates. Simply enter the Base URL and Model Identifier in **Settings > AI Providers**:\n\n• **Moonshot Kimi**:\n  Base URL: `https://api.moonshot.cn/v1`\n  Model: `moonshot-v1-auto` or `kimi-k1.5`\n• **MiniMax**:\n  Base URL: `https://api.minimax.chat/v1`\n  Model: `minimax-text-01` or `abab6.5s-chat`\n• **DeepSeek**:\n  Base URL: `https://api.deepseek.com/v1`\n  Model: `deepseek-chat`, `deepseek-reasoner` (R1), or `deepseek-v4-flash`\n• **Zhipu GLM**:\n  Base URL: `https://open.bigmodel.cn/api/paas/v4`\n  Model: `glm-4-plus` or `glm-4-flash`\n• **Groq (Ultra Speed)**:\n  Base URL: `https://api.groq.com/openai/v1`\n  Model: `llama-3.3-70b-versatile`\n• **OpenRouter (200+ Models Aggregator)**:\n  Base URL: `https://openrouter.ai/api/v1`\n  Model: `meta-llama/llama-3.3-70b-instruct` or `google/gemini-2.5-flash`\n• **Local Ollama (100% Free)**:\n  Base URL: `http://localhost:11434/v1` (API Key optional)\n  Model: `llama3.3` or `deepseek-r1`',
          note: '💡 Fleksibilitas total: Cuan dirancang agar Anda selalu bisa memakai model tercerdas dan termurah kapan saja tanpa hambatan teknis.',
          noteEn: '💡 Complete autonomy: Cuan is architected so you can immediately switch to the fastest, smartest, or most affordable models without technical friction.',
        },
        {
          id: 'security',
          heading: '4. Keamanan Standar Bank & Privasi Kunci',
          headingEn: '4. Bank-Grade Security & Key Privacy',
          text: '• **Enkripsi Kuat (AES-256)**: Semua API Key tersimpan terenkripsi di database server pribadi Anda.\n• **Sensor Otomatis di Layar**: Kunci rahasia otomatis disensor (`[REDACTED]`) agar tidak pernah bocor di layar maupun log server.\n• **Privasi dari Staf**: Staf operasional (Member) yang Anda undang tidak bisa melihat atau menyalin kunci API milik Anda.',
          textEn: '• **Bank-Grade Encryption (AES-256)**: All API keys are encrypted at rest inside your private database.\n• **Automatic Screen Masking**: Sensitive keys are masked as `[REDACTED]` in logs and UI displays.\n• **Role Isolation**: Non-owner staff members can never view, inspect, or export your private API keys.',
        },
      ],
    },
  },
  {
    slug: 'projects-tasks',
    title: 'Project & Task',
    titleEn: 'Projects & Tasks',
    icon: 'FolderKanban',
    summary: 'Kelola aset bisnis, delegasikan tugas ke Asisten AI, dan setujui hasil kerja.',
    summaryEn: 'Manage business assets, delegate to AI assistants, and review deliverables.',
    content: {
      intro: 'Kelola aset bisnis Anda (landing page, artikel blog, naskah video, katalog toko) sebagai Proyek terstruktur, di mana Asisten AI bekerja mandiri di bawah pengawasan Anda.',
      introEn: 'Manage business assets (landing pages, blog posts, scripts, product catalogs) as structured Projects, where AI assistants work under your direct approval.',
      subsections: [
        {
          id: 'create-project',
          heading: '1. Membuat Proyek Baru',
          headingEn: '1. Creating a New Project',
          text: '1. Buka menu **Projects** di navigasi kiri, lalu klik `+ New Project`.\n2. Tulis nama proyek (misal: "Landing Page Kursus" atau "Katalog Promo Toko").\n3. (Opsional) Tautkan link GitHub jika ingin hasil kerja otomatis tersimpan ke repositori.',
          textEn: '1. Open the **Projects** menu from the sidebar and click `+ New Project`.\n2. Enter project title (e.g. "Course Landing Page" or "Store Promo Catalog").\n3. (Optional) Link a GitHub repository if you want deliverables auto-committed.',
        },
        {
          id: 'agent-delegation',
          heading: '2. Delegasi Tugas ke Asisten AI (@cuan)',
          headingEn: '2. Delegating to AI Assistant (@cuan)',
          text: 'Ketikkan instruksi kerja secara natural seperti berbicara dengan staf profesional:\n\n• Asisten AI membaca konteks proyek dan menyiapkan draf hasil kerja di ruang kerja terisolasi.\n• Anda bisa menyalin contoh instruksi berikut langsung ke chat diskusi:',
          textEn: 'Delegate naturally like speaking to a skilled operational assistant:\n\n• The AI reads project context and executes the task inside an isolated workspace.\n• Copy this sample prompt directly into your discussion chat:',
          code: '@cuan buatkan 3 opsi copywriting sales page yang menonjolkan garansi 30 hari untuk produk ini',
          codeLang: 'chat',
        },
        {
          id: 'human-approval',
          heading: '3. Kendali Penuh: Kartu Persetujuan (Approval)',
          headingEn: '3. Full Control: Approval Cards',
          text: 'AI di Cuan tidak pernah merilis atau mengubah data tanpa persetujuan Anda:\n\n1. Begitu AI selesai, panel tugas memunculkan kartu **Needs Approval** berisi bukti kerja nyata.\n2. Periksa hasil teks, gambar, atau perubahannya.\n3. Klik **Approve** jika setuju, atau ketik catatan revisi jika ingin diperbaiki.',
          textEn: 'AI in Cuan never publishes or alters data without your authorization:\n\n1. When the AI finishes, the task panel displays a **Needs Approval** card with output proof.\n2. Review copy, preview visuals, or verify changes.\n3. Click **Approve** if satisfied, or reply with edit feedback.',
          note: '🔒 AI di Cuan wajib menyertakan bukti nyata sebelum meminta persetujuan. Anda selalu memegang kendali 100%.',
          noteEn: '🔒 AI in Cuan must provide verifiable execution proof before requesting approval. You stay in 100% control.',
        },
        {
          id: 'quick-win-task',
          heading: '4. Tugas Pertama dalam 2 Menit (Aha! Moment)',
          headingEn: '4. First Task in 2 Minutes (Aha! Moment)',
          text: '1. Buka Proyek baru, masuk ke tab **Discussions**.\n2. Kirim instruksi chat di bawah ini ke @cuan:\n3. Dalam beberapa detik, kartu **Needs Approval** muncul di panel samping. Periksa dan klik **Approve**!\n\nHanya dalam 2 menit, Anda sudah merasakan kolaborasi nyata dengan AI tanpa pusing prompt engineering.',
          textEn: '1. Open a new project and navigate to the **Discussions** tab.\n2. Send the chat prompt below to @cuan:\n3. In seconds, the **Needs Approval** card appears. Review and click **Approve**!\n\nIn just 2 minutes, experience real AI collaboration without prompt engineering friction.',
          code: '@cuan buatkan 3 headline menarik untuk produk kursus digital',
          codeLang: 'chat',
        },
      ],
    },
  },
  {
    slug: 'inbox',
    title: 'Live Chat & Inbox',
    titleEn: 'Live Chat & Inbox',
    icon: 'MessageSquare',
    summary: 'Pasang widget chat di website dan balas pelanggan dengan bantuan asisten AI.',
    summaryEn: 'Embed a live chat widget and assist customers with AI coaching.',
    content: {
      intro: 'Ubah pengunjung website menjadi pembeli. Cuan menyediakan widget live chat ringan untuk website Anda, di mana Anda, staf, dan asisten AI berkolaborasi dari satu kotak masuk (inbox) terpadu.',
      introEn: 'Turn visitors into buyers. Cuan provides a lightweight live chat widget, allowing your team and AI assistants to collaborate in one unified inbox.',
      subsections: [
        {
          id: 'chat-widget',
          heading: '1. Pasang Widget Chat di Website (1 Baris Kode)',
          headingEn: '1. 1-Line Live Chat Widget',
          text: 'Salin satu baris kode script berikut dan tempelkan ke website Anda:\n\n• **WordPress**: Tempel di plugin Header & Footer Code (WPCode), atau di pengaturan tema sebelum tag penutup `</body>`.\n• **Website HTML / Toko Online**: Tempel tepat sebelum tag penutup `</body>` di file HTML Anda.',
          textEn: 'Embed this lightweight script snippet into your website:\n\n• **WordPress**: Paste into a Header & Footer Code plugin (WPCode), or your theme settings before `</body>`.\n• **HTML / Storefront**: Paste immediately before the closing `</body>` tag.',
          code: '<script src="https://cuan.bisnisanda.com/chat/widget.js" data-product="nama-website-anda" defer></script>',
          codeLang: 'html',
          note: '💡 Salin langsung dari menu Settings > Integrations di Cuan. Ukuran widget < 15KB tanpa membebani kecepatan website Anda.',
          noteEn: '💡 Copy directly from Settings > Integrations in Cuan. The bundle is under 15KB with zero speed penalty.',
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
          heading: '3. Draf Balasan Otomatis',
          headingEn: '3. Automated Reply Drafts',
          text: 'Ketika pelanggan menanyakan hal rumit, AI dapat menyusun draf balasan:\n\n1. AI menghasilkan kartu draf balasan di layar obrolan.\n2. Staf Anda membaca kalimat yang disarankan.\n3. Klik **Kirim Balasan** untuk langsung merespon pelanggan, atau edit kata-katanya terlebih dahulu.',
          textEn: 'When visitors ask complex questions, the AI prepares polished response drafts:\n\n1. The AI generates a suggested reply card in the chat view.\n2. Your team verifies the recommended response.\n3. Click **Send Reply** to respond immediately, or edit wording first.',
        },
      ],
    },
  },
  {
    slug: 'team',
    title: 'Tim & Akses',
    titleEn: 'Team & Access',
    icon: 'Users',
    summary: 'Atur peran Pemilik vs Staf, undang tim lewat WhatsApp tanpa setup email.',
    summaryEn: 'Owner vs Staff roles, 1-click WhatsApp invites without email setup.',
    content: {
      intro: 'Ajak tim bekerja bersama di Cuan dengan batas wewenang yang tegas demi menjaga kerahasiaan kunci API dan data bisnis Anda.',
      introEn: 'Collaborate with staff with clear boundaries to protect your API keys and business assets.',
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
    slug: 'self-hosting',
    title: 'Pemeliharaan',
    titleEn: 'Maintenance',
    icon: 'Server',
    summary: 'Rekomendasi server, backup 1-klik, update aman, dan status sistem.',
    summaryEn: 'Server specs, 1-click backups, safe updates, and system health.',
    content: {
      intro: 'Cuan sangat hemat sumber daya. Server dengan spesifikasi minimal sudah cukup untuk melayani operasional bisnis dan otomasi AI Anda selama 24 jam penuh.',
      introEn: 'Cuan is extremely lightweight. An entry-level server easily runs your business operations and 24/7 AI automation.',
      subsections: [
        {
          id: 'vps-specs',
          heading: '1. Rekomendasi Spesifikasi Server',
          headingEn: '1. Recommended Server Specs',
          text: '• **Spesifikasi Hemat (Mulai Rp 10rb–Rp 50rb/bln)**: 1 vCPU, 1 GB RAM, 15 GB SSD (Cukup untuk solopreneur dan toko online pemula).\n• **Spesifikasi Disarankan (Untuk Agensi / Tim Aktif)**: 2 vCPU, 2–4 GB RAM, 30 GB SSD.\n• **Sistem Operasi**: Ubuntu 22.04 LTS, Ubuntu 24.04 LTS, atau Debian 12.',
          textEn: '• **Budget Tier (Starting at ~$1–$4/mo)**: 1 vCPU, 1 GB RAM, 15 GB SSD (Sufficient for solopreneurs and small stores).\n• **Recommended Tier (For Active Teams / Agencies)**: 2 vCPU, 2–4 GB RAM, 30 GB SSD.\n• **Operating System**: Ubuntu 22.04 LTS, Ubuntu 24.04 LTS, or Debian 12.',
        },
        {
          id: 'backup-restore',
          heading: '2. Cadangkan & Pulihkan Data 1-Klik',
          headingEn: '2. 1-Click Backup & Restore',
          text: 'Cadangkan seluruh data database dan obrolan pelanggan tanpa downtime:',
          textEn: 'Snapshot and restore your entire database and customer conversations without downtime:',
          code: '# Buat file cadangan ke folder backups/:\n./scripts/backup.sh\n\n# Pulihkan seluruh data dari cadangan terbaru:\n./scripts/restore.sh --latest --force',
          codeLang: 'bash',
          note: '💡 Setiap file backup diberi stempel tanggal rapi untuk memudahkan penyimpanan atau pemindahan ke Google Drive.',
          noteEn: '💡 Every backup archive is timestamped and integrity-verified for seamless offsite backup.',
        },
        {
          id: 'update-cuan',
          heading: '3. Memperbarui Cuan ke Versi Terbaru',
          headingEn: '3. Upgrading to the Latest Version',
          text: 'Pembaruan Cuan bersifat aman dan tidak menghapus data Anda:',
          textEn: 'Cuan updates are non-destructive and preserve all your data:',
          code: '# Update otomatis dengan backup pengaman:\n./scripts/update.sh --version 0.9.0\n\n# Atau jika menggunakan Docker manual:\ndocker compose pull && docker compose up -d',
          codeLang: 'bash',
        },
        {
          id: 'health-monitoring',
          heading: '4. Memastikan Sistem Sehat',
          headingEn: '4. Checking System Health',
          text: 'Untuk memastikan seluruh layanan Cuan berjalan lancar di server:',
          textEn: 'To verify that all Cuan services are operating normally:',
          code: '# Cek status container di terminal:\ndocker compose ps\n\n# Uji respon kesehatan aplikasi:\ncurl -f http://localhost:8080/healthz',
          codeLang: 'bash',
        },
      ],
    },
  },
]
