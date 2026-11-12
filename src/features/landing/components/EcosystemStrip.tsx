import {
  Globe,
  Share2,
  FileCode,
  Bot,
  CheckCheck,
} from 'lucide-react'
import {
  WordPressIcon,
  GhostIcon,
  InstagramIcon,
  TikTokIcon,
  YouTubeIcon,
  PinterestIcon,
  WooCommerceIcon,
  LaravelIcon,
  EnvatoIcon,
  TelegramIcon,
  DiscordIcon,
  CloudflareIcon,
} from '../../../components/brand/BrandIcons'
import { useLanguage } from '../../../context/LanguageContext'

export function EcosystemStrip() {
  const { t } = useLanguage()

  const categories = [
    {
      Icon: Globe,
      category: t('Web & Publishing'),
      desc: t('Blog artikel, portal konten, media publikasi'),
      brands: [
        { name: 'WordPress', Icon: WordPressIcon },
        { name: 'Ghost', Icon: GhostIcon },
      ],
    },
    {
      Icon: Share2,
      category: t('Konten & Sosmed'),
      desc: t('Ideasi hook, naskah video, visual promo'),
      brands: [
        { name: 'Reels', Icon: InstagramIcon },
        { name: 'TikTok', Icon: TikTokIcon },
        { name: 'YouTube', Icon: YouTubeIcon },
        { name: 'Pinterest', Icon: PinterestIcon },
      ],
    },
    {
      Icon: FileCode,
      category: t('Script & Toko Digital'),
      desc: t('Script marketplace, katalog produk, web app'),
      brands: [
        { name: 'CodeCanyon', Icon: EnvatoIcon },
        { name: 'WooCommerce', Icon: WooCommerceIcon },
        { name: 'Laravel', Icon: LaravelIcon },
      ],
    },
    {
      Icon: Bot,
      category: t('Otomasi & Bot'),
      desc: t('Notifikasi order, auto-ping SEO, alur otomatis'),
      brands: [
        { name: 'Telegram', Icon: TelegramIcon },
        { name: 'Discord', Icon: DiscordIcon },
        { name: 'Cloudflare', Icon: CloudflareIcon },
      ],
    },
  ]

  return (
    <section
      id="ecosystem-strip"
      className="border-y border-border/50 bg-muted/15 py-12 px-6 sm:px-8"
      aria-label={t('Ekosistem Project')}
    >
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-6">
          <p className="text-xs sm:text-sm font-semibold tracking-wide text-muted-foreground">
            {t('Bantu jalankan berbagai jenis proyek digital Anda:')}
          </p>
        </div>

        {/* Categorized Digital Project Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map(({ Icon, category, desc, brands }) => (
            <div
              key={category}
              className="rounded-xl border border-border/60 bg-card/60 p-4 shadow-2xs hover:border-border transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Icon className="h-4 w-4 text-foreground/80 shrink-0" strokeWidth={1.75} />
                  <span className="text-xs font-bold text-foreground">
                    {category}
                  </span>
                </div>

                {/* Monochrome Brand Logos Wall */}
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-3">
                  {brands.map(({ name, Icon: BrandSvg }) => (
                    <div
                      key={name}
                      className="inline-flex items-center gap-1.5 rounded-md border border-border/60 bg-muted/40 px-2 py-1 text-xs font-medium text-foreground/85 hover:text-foreground hover:border-border transition-colors shadow-2xs"
                    >
                      <BrandSvg className="h-3.5 w-3.5 shrink-0 opacity-80" />
                      <span>{name}</span>
                    </div>
                  ))}
                </div>

                <div className="text-[11px] text-muted-foreground leading-relaxed">
                  {desc}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 text-center">
          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground/80">
            <CheckCheck className="h-3.5 w-3.5 text-emerald-500" />
            <span>{t('+ ribuan script & template open-source lainnya siap dijalankan di server Anda')}</span>
          </span>
        </div>
      </div>
    </section>
  )
}
