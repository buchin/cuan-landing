import { Cpu, Send, Bot, Calendar, Server, ShoppingBag } from 'lucide-react'
import {
  AnthropicIcon,
  OpenAIIcon,
  GoogleGeminiIcon,
  DeepSeekIcon,
} from '../../../components/brand/BrandIcons'
import { useLanguage } from '../../../context/LanguageContext'

export function McpSection() {
  const { language } = useLanguage()

  const mcpList = language === 'id'
    ? [
        {
          Icon: Calendar,
          category: 'Konten & Media Sosial',
          prompt: '“Cuan, jadwalkan postingan promo ke Instagram & X”',
          title: 'Tebar.app MCP',
          desc: 'Agen meriset tren, menulis draf copy promosi, dan langsung mengatur jadwal postingan di media sosial tanpa repot bolak-balik aplikasi.',
        },
        {
          Icon: Server,
          category: 'Hosting & Server Web',
          prompt: '“Cuan, cek performa server dan jalankan backup”',
          title: 'IDCloudHost MCP',
          desc: 'Agen memantau performa server, mengelola domain, dan memastikan website bisnis Anda terus aktif lancar 24/7 tanpa menyentuh terminal.',
        },
        {
          Icon: ShoppingBag,
          category: 'Penjualan & Form Order',
          prompt: '“Cuan, rekap pesanan baru dan sinkronkan leads”',
          title: 'Scalev MCP',
          desc: 'Agen menarik data pesanan baru dari checkout Scalev, menyinkronkan kontak leads pembeli, dan siap membalas pertanyaan calon pelanggan di live chat 24/7.',
        },
      ]
    : [
        {
          Icon: Calendar,
          category: 'Social Media Scheduling',
          prompt: '“Cuan, schedule promotional posts to X & LinkedIn”',
          title: 'Postiz MCP',
          desc: 'Agents research trending topics, draft promotional copy, and schedule multi-platform posts automatically without manual copy-paste.',
        },
        {
          Icon: Server,
          category: 'Cloud Hosting & Infrastructure',
          prompt: '“Cuan, check server RAM usage and run backup”',
          title: 'Hetzner Cloud MCP',
          desc: 'Agents inspect VPS health, manage networking, and keep your self-hosted infrastructure running fast and secure 24/7 with zero terminal complexity.',
        },
        {
          Icon: ShoppingBag,
          category: 'E-Commerce Orders & Payments',
          prompt: '“Cuan, sync incoming orders and update leads”',
          title: 'Shopify & Stripe MCP',
          desc: 'Agents retrieve incoming customer orders, sync lead data, and answer shopper questions in 24/7 live chat with full purchase history context.',
        },
      ]

  return (
    <section
      id="ecosystem"
      className="scroll-mt-6 border-b border-border/60 bg-muted/10 px-6 py-16 sm:px-8 sm:py-24"
      aria-labelledby="ecosystem-title"
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <div className="mb-3.5 inline-flex items-center gap-2 text-sm sm:text-[15px] font-semibold text-foreground/80">
            <Cpu className="h-4 w-4 text-primary" strokeWidth={1.5} />
            <span>
              {language === 'id'
                ? 'Ekosistem Terbuka & Integrasi Alat Bisnis'
                : 'Open Ecosystem & Business Tool Integrations'}
            </span>
          </div>
          <h2
            id="ecosystem-title"
            className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl"
          >
            {language === 'id'
              ? 'Bebas Hubungkan Tools Bisnis & Model AI Pilihan Anda'
              : 'Connect Any Business Tool & AI Model Freely'}
          </h2>
          <p className="mt-3 text-base sm:text-lg leading-relaxed text-muted-foreground">
            {language === 'id'
              ? 'Dari manajemen sosmed, server hosting, toko online, hingga akun AI resmi—semua bisa dioperasikan cukup lewat satu obrolan santai.'
              : 'From social media and hosting to e-commerce checkouts and official AI subscriptions—operate everything in plain words.'}
          </p>
        </div>

        {/* 3 MCP Examples Grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {mcpList.map(({ Icon, category, prompt, title, desc }) => (
            <div
              key={title}
              className="rounded-xl border border-border/60 bg-card p-6 shadow-2xs transition-colors hover:border-border/80 flex flex-col justify-between"
            >
              <div>
                <Icon className="mb-3.5 h-6 w-6 text-foreground/80" strokeWidth={1.5} />

                <div className="text-xs font-semibold text-primary mb-1 uppercase tracking-wider">
                  {category}
                </div>
                <h3 className="font-display text-lg font-bold text-foreground">
                  {title}
                </h3>

                {/* Authentic Cuan Composer Capsule */}
                <div className="pointer-events-none my-3.5 flex select-none items-center justify-between overflow-hidden rounded-full border border-border/40 bg-muted/40 dark:bg-[#1e2023] pl-3.5 text-xs font-mono text-foreground/90 shadow-2xs">
                  <span className="line-clamp-1 flex-1 py-2 leading-relaxed">{prompt}</span>
                  <span aria-hidden="true" className="flex h-9 w-10 shrink-0 items-center justify-center rounded-r-full bg-primary/[0.14] text-foreground">
                    <Send className="h-3.5 w-3.5" strokeWidth={1.75} />
                  </span>
                </div>

                <p className="text-sm leading-relaxed text-muted-foreground">
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Model AI resmi highlight banner */}
        <div className="mt-8 rounded-xl border border-border/60 bg-card p-5 sm:p-6 shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <Bot className="h-6 w-6 text-foreground/80 shrink-0 mt-0.5" strokeWidth={1.5} />
            <div>
              <h4 className="text-sm sm:text-base font-bold text-foreground">
                {language === 'id'
                  ? 'Ditenagai Model AI Paling Cerdas di Dunia'
                  : 'Powered by the World’s Leading AI Models'}
              </h4>
              <p className="mt-0.5 text-xs sm:text-sm text-muted-foreground">
                {language === 'id'
                  ? 'Hubungkan akun resmi yang sudah Anda miliki (Claude, ChatGPT, Gemini, DeepSeek). Nol biaya markup, bebas biaya dobel.'
                  : 'Bring your existing official accounts (Claude, ChatGPT, Gemini, DeepSeek). Zero markup, zero double billing.'}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-foreground shrink-0">
            <span className="inline-flex items-center gap-1.5 rounded-md border border-border/60 bg-muted/40 px-2.5 py-1 shadow-2xs">
              <AnthropicIcon className="h-3.5 w-3.5 opacity-80" />
              <span>Claude</span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-md border border-border/60 bg-muted/40 px-2.5 py-1 shadow-2xs">
              <OpenAIIcon className="h-3.5 w-3.5 opacity-80" />
              <span>ChatGPT</span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-md border border-border/60 bg-muted/40 px-2.5 py-1 shadow-2xs">
              <GoogleGeminiIcon className="h-3.5 w-3.5 opacity-80" />
              <span>Gemini</span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-md border border-border/60 bg-muted/40 px-2.5 py-1 shadow-2xs">
              <DeepSeekIcon className="h-3.5 w-3.5 opacity-80" />
              <span>DeepSeek</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
