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
          text: 'Siapkan alamat subdomain untuk Cuan Anda (misal: `cuan.bisnisanda.com`):\n\n• **VPS Biasa ($4–$6/bln)**: Tambahkan **A Record** di DNS domain Anda (Cloudflare, Niagahoster, Domainesia, Namecheap, dll):\n  **Host**: `cuan` &nbsp;➔&nbsp; **Target IP**: `IP Server VPS Anda`\n• **VPS NAT Hemat (Rp 10rb-an/bln)**: Tidak perlu buat A Record publik. Lewati langkah ini (domain akan disambung lewat Cloudflare Tunnel di Langkah 2).\n• **Uji Coba di Laptop**: Lewati langkah ini (bisa langsung dijalankan tanpa domain).',
          textEn: 'Prepare a subdomain address for Cuan (e.g. `cuan.yourbusiness.com`):\n\n• **Standard VPS ($4–$6/mo)**: Add an **A Record** in your DNS settings (Cloudflare, Namecheap, Niagahoster, etc.):\n  **Host**: `cuan` &nbsp;➔&nbsp; **Target IP**: `Your VPS IP`\n• **Budget NAT VPS (~$1/mo)**: No public A Record needed. Skip this step (domain connects via Cloudflare Tunnel in Step 2).\n• **Local Testing**: Skip this step (runs directly on localhost without a domain).',
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
          text: 'Pilihan termurah menggunakan VPS NAT lokal (Helipod, SumoPod, Dahono, Cloudra, dll). Hemat biaya hingga 80% dan sangat stabil di RAM 1GB:\n\n1. **Login SSH** dengan port khusus dari provider Anda: `ssh -p <PORT> root@<IP>`\n2. **Jalankan Perintah di Bawah**: Perintah ini mengaktifkan swap, memasang Cuan, dan menghubungkan Cloudflare Tunnel.\n3. **Arahkan Domain**: Di dashboard Cloudflare Zero Trust (Tunnels), buat tunnel baru dan arahkan Public Hostname ke `http://localhost:8080`. Selesai!',
          textEn: 'The most affordable path using local NAT VPS (Helipod, SumoPod, Dahono, Cloudra, etc.). Cuts server costs by 80% and runs smoothly on 1GB RAM:\n\n1. **SSH Login** using custom port assigned by your provider: `ssh -p <PORT> root@<IP>`\n2. **Run Commands Below**: Activates swap, installs Cuan, and connects Cloudflare Tunnel.\n3. **Route Domain**: In Cloudflare Zero Trust (Tunnels), create a tunnel and point Public Hostname to `http://localhost:8080`. Done!',
          code: '# 1. Aktifkan Swap 1GB (agar RAM hemat tidak macet):\nfallocate -l 1G /swapfile && chmod 600 /swapfile && mkswap /swapfile && swapon /swapfile\n\n# 2. Pasang Cuan (mode hemat tanpa mengikat port 80/443 publik):\ncurl -fsSL https://cuan.work/install.sh | bash -s -- --existing-proxy\n\n# 3. Hubungkan domain via Cloudflare Tunnel gratis:\ndocker run -d --name cloudflared --restart unless-stopped --network host \\\n  cloudflare/cloudflared:latest tunnel --no-autoupdate run --token TOKEN_DARI_CLOUDFLARE',
          codeLang: 'bash',
          note: '💡 Cloudflare Tunnel 100% gratis, aman tanpa buka port masuk, dan kebal dari firewall atau koneksi internet rumahan (Indihome/Biznet).',
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
    summary: 'Gunakan langganan bulanan tanpa biaya token atau pasang model AI apa saja.',
    summaryEn: 'Use flat monthly subscriptions or connect any AI model with zero markup.',
    content: {
      intro: 'Cuan memberi kebebasan penuh. Anda bisa memakai langganan bulanan yang sudah Anda miliki (Claude Pro, ChatGPT Plus) tanpa biaya token, atau memasang model AI apa pun di dunia dengan tarif hemat.',
      introEn: 'Complete freedom. Use existing monthly subscriptions (Claude Pro, ChatGPT Plus) with zero per-token markup, or connect any global model provider at low rates.',
      subsections: [
        {
          id: 'cli-subscription',
          heading: '1. Langganan Bulanan (Claude Pro / ChatGPT Plus)',
          headingEn: '1. Monthly Subscriptions (Claude Pro / ChatGPT Plus)',
          text: 'Jika sudah berlangganan Claude Pro/Team, ChatGPT Plus/Team, atau Gemini Advanced, Anda tidak perlu beli saldo token API terpisah:\n\n1. Buka menu **Settings > AI Providers** di dashboard Cuan.\n2. Pilih layanan: **Claude Code**, **ChatGPT CLI**, atau **Antigravity**.\n3. Klik tautan login resmi yang muncul di layar, lalu konfirmasi login akun Anda.\n4. Selesai. Asisten AI langsung aktif menggunakan kuota wajar langganan bulanan Anda.',
          textEn: 'If you already subscribe to Claude Pro/Team, ChatGPT Plus/Team, or Google Gemini Advanced, you never need to buy separate per-token API credits:\n\n1. Open **Settings > AI Providers** in your Cuan dashboard.\n2. Select your provider: **Claude Code**, **ChatGPT CLI**, or **Antigravity**.\n3. Click the official login URL shown on screen and authorize your account.\n4. Done. AI assistants immediately work within your regular monthly subscription quota.',
          note: '💡 Pilihan favorit agensi dan solopreneur karena biaya bulanan AI menjadi tetap tanpa tagihan per-token.',
          noteEn: '💡 A favorite for agencies and solopreneurs because AI overhead remains fixed without per-token surprises.',
        },
        {
          id: 'universal-byok',
          heading: '2. Pasang Kunci API (Bebas Pilih Model)',
          headingEn: '2. Custom API Keys (Use Any Model)',
          text: 'Cuan tidak mengunci Anda ke satu vendor. Anda bisa memasang kunci API dari penyedia mana pun:\n\n• **Penyedia Global**: OpenAI (GPT-4o, o3-mini), Anthropic (Claude 3.7 Sonnet), Google Gemini, DeepSeek (V3 & R1), xAI (Grok).\n• **Penyedia Super Murah & Cepat**: Groq (kecepatan kilat) atau OpenRouter (ratusan model dalam 1 saldo).\n• **Model AI Gratis di Komputer Sendiri**: Ollama atau LM Studio (100% gratis, data tidak pernah keluar dari server pribadi Anda).',
          textEn: 'Zero vendor lock-in. Connect API keys from any provider globally:\n\n• **Global Providers**: OpenAI (GPT-4o, o3-mini), Anthropic (Claude 3.7 Sonnet), Google Gemini, DeepSeek (V3 & R1), xAI (Grok).\n• **Ultra-Fast & Budget Providers**: Groq (ultra-high speed) or OpenRouter (hundreds of models on one balance).\n• **Free Offline Models on Your Machine**: Ollama or LM Studio (100% free, confidential data never leaves your machine).',
        },
        {
          id: 'custom-endpoints',
          heading: '3. Cara Pasang Penyedia Kustom (Custom Endpoint)',
          headingEn: '3. Connecting Custom Endpoints',
          text: 'Cukup isi 3 kolom di menu **Settings > AI Providers**:\n\n1. **API Key**: Tempel kunci rahasia Anda (kosongkan jika pakai Ollama lokal).\n2. **Base URL**:\n   • OpenRouter: `https://openrouter.ai/api/v1`\n   • Groq: `https://api.groq.com/openai/v1`\n   • Ollama Komputer Sendiri: `http://localhost:11434/v1`\n3. **Nama Model**: Tuliskan ID model (misal: `deepseek/deepseek-r1` atau `llama-3.3-70b-versatile`).\n4. Klik **Uji Koneksi** lalu **Simpan**.',
          textEn: 'Simply complete 3 fields in **Settings > AI Providers**:\n\n1. **API Key**: Enter your secret key (optional for local Ollama).\n2. **Base URL**:\n   • OpenRouter: `https://openrouter.ai/api/v1`\n   • Groq: `https://api.groq.com/openai/v1`\n   • Local Ollama: `http://localhost:11434/v1`\n3. **Model Name**: Enter model string (e.g. `deepseek/deepseek-r1` or `llama-3.3-70b-versatile`).\n4. Click **Test Connection**, then **Save**.',
          note: '💡 Kapan pun ada model AI baru esok hari, Anda tidak perlu menunggu update Cuan. Cukup ubah Base URL dan Nama Model!',
          noteEn: '💡 Whenever a breakthrough model launches tomorrow, no software updates needed. Simply update the Base URL and Model Name!',
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
          text: 'Cukup ketikkan instruksi kerja secara natural seperti berbicara dengan asisten profesional:\n\n• Contoh: `@cuan buatkan 3 opsi copywriting sales page yang menonjolkan garansi 30 hari untuk produk ini`\n• Asisten AI membaca konteks proyek dan menyiapkan draf hasil kerja di ruang kerja terisolasi.',
          textEn: 'Delegate naturally like speaking to a skilled operational assistant:\n\n• Example: `@cuan draft 3 sales copy options highlighting our 30-day money-back guarantee`\n• The AI reads project context and executes the task inside an isolated workspace.',
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
          text: '1. Buka Proyek baru, masuk ke tab **Discussions**.\n2. Ketik: `@cuan buatkan 3 headline menarik untuk produk kursus digital`.\n3. Dalam beberapa detik, kartu **Needs Approval** muncul di panel samping. Periksa dan klik **Approve**!\n\nHanya dalam 2 menit, Anda sudah merasakan kolaborasi nyata dengan AI tanpa pusing prompt engineering.',
          textEn: '1. Open a new project and navigate to the **Discussions** tab.\n2. Type: `@cuan generate 3 catchy headlines for a digital course`.\n3. In seconds, the **Needs Approval** card appears. Review and click **Approve**!\n\nIn just 2 minutes, experience real AI collaboration without prompt engineering friction.',
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
