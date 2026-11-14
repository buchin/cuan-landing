import { Sparkles, ArrowRight, Globe } from 'lucide-react'
import { useLanguage } from '../../../context/LanguageContext'
import { SPONSORWARE_TARGET } from '../types'

interface SponsorHeroProps {
  onScrollToCheckout: () => void
  sponsorCount?: number
}

export function SponsorHero({ onScrollToCheckout, sponsorCount = 0 }: SponsorHeroProps) {
  const { t } = useLanguage()
  const target = SPONSORWARE_TARGET
  const percent = Math.min(100, Math.round((sponsorCount / target) * 100))
  const remaining = Math.max(0, target - sponsorCount)

  return (
    <>
      {/* Hero Section */}
      <section className="mx-auto max-w-4xl px-6 pt-12 pb-10 text-center sm:px-8 sm:pt-16 sm:pb-12">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/40 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-foreground/80">
          <Sparkles className="h-3.5 w-3.5 text-amber-500" />
          <span>{t('Sponsorware · Rilis Open Source v1.0')}</span>
        </div>

        <h1 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:leading-[1.1]">
          {t('Bantu Rilis Cuan v1.0 Jadi Open Source')}
        </h1>

        <p className="mt-4 text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          {t(
            'Script Cuan v1.0 akan dibuka 100% gratis di GitHub saat 50 sponsor komunitas terpenuhi. Dukung mulai Rp 100.000 (Bayar Suka-Suka) untuk langsung membuka akses private repo hari ini juga.',
          )}
        </p>

        {/* Milestone Progress Bar Card (Calm Things 3 style) */}
        <div className="mx-auto max-w-xl mt-8 mb-6 rounded-2xl border border-border/80 bg-card p-5 shadow-2xs text-left space-y-3">
          <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-foreground">
            <span>{t('Milestone Rilis Repositori Publik:')}</span>
            <span className="font-mono text-primary font-bold">
              {sponsorCount} / {target} {t('Sponsor')}
            </span>
          </div>
          <div className="h-2.5 w-full rounded-full bg-muted/60 overflow-hidden">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500"
              style={{ width: `${percent}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-2xs text-muted-foreground">
            <span>
              {sponsorCount === 0
                ? t('Belum ada sponsor · Jadilah yang pertama!')
                : `${remaining} ${t('sponsor lagi untuk membuka akses publik')}`}
            </span>
            <span className="font-mono font-medium">{percent}%</span>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={onScrollToCheckout}
            className="action-primary min-h-11 px-6 text-sm font-semibold inline-flex items-center gap-2 cursor-pointer"
          >
            <span>{t('Dukung Mulai Rp 100rb & Buka Akses Repo')}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
          <a
            href="#leaderboard"
            className="action-secondary min-h-11 px-6 text-sm font-semibold inline-flex items-center gap-2"
          >
            <span>{t('Lihat Leaderboard')}</span>
          </a>
        </div>
      </section>

      {/* Value Highlights */}
      <section className="mx-auto max-w-5xl px-6 sm:px-8 mb-16">
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-2xs">
            <div className="mb-3.5 flex items-center gap-2.5 text-foreground/80">
              <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" aria-label="GitHub">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              <Globe className="h-5 w-5 text-foreground/80" strokeWidth={1.75} aria-label="cuan.work" />
            </div>
            <h3 className="font-display text-base font-bold text-foreground">
              {t('Akses Private Repo & Backlink')}
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {t(
                'Dapatkan invite instan ke private GitHub repo Cuan hari ini juga, serta pencantuman nama brand & backlink dofollow permanen di web resmi.',
              )}
            </p>
          </div>

          <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-2xs">
            <div className="mb-3.5 flex items-center gap-2.5 text-foreground/80">
              <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" aria-label="Facebook">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" aria-label="Substack">
                <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
              </svg>
            </div>
            <h3 className="font-display text-base font-bold text-foreground">
              {t('Sorotan ke 63.000+ Audiens')}
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {t(
                'Sponsor Top 5 Titan mendapatkan sorotan berkala melalui akun Facebook Buchin (50.000+ pengikut) dan newsletter mingguan Dojo (13.000+ subscriber).',
              )}
            </p>
          </div>

          <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-2xs">
            <div className="mb-3.5 flex items-center gap-2.5 text-foreground/80">
              <svg className="h-4.5 w-auto fill-current" viewBox="0 0 1000 314" aria-label="BCA">
              <path d="m 147.34669,237.88336 c 0,-12.4911 0.13562,-45.8787 -0.17228,-49.99236 0.26842,-49.68172 -35.85414,-84.72767 -58.674773,-81.99559 -15.79108,1.37038 -29.025179,7.8093 -36.131016,26.33267 -6.585974,17.26296 -0.697885,40.22487 21.198868,45.61295 23.413963,5.78646 37.086001,10.60092 46.980501,17.39303 12.12372,8.3152 22.02105,24.2022 22.28381,42.669" />
              <path d="m 156.69305,313.40296 c -41.28452,0 -83.71334,-10.1684 -126.085648,-30.2796 l -1.039728,-0.5113 -0.497275,-1.0595 C 10.055561,241.41496 0,197.51416 0,154.56275 0,111.67615 9.6430481,69.654125 28.67202,29.570445 l 0.522703,-1.06518 1.05952,-0.53118 C 69.45081,9.4056654 111.61685,-4.4667969e-5 155.61942,-4.4667969e-5 c 40.99069,0 84.7672,10.470869667969 126.57727,30.333339667969 l 1.07365,0.47749 0.49444,1.08494 c 19.37931,40.87763 29.59874,84.767165 29.59874,127.006815 0,42.07562 -9.81258,84.13432 -29.2145,124.98642 l -0.51139,1.0737 -1.07929,0.4974 c -38.5976,18.2716 -82.12548,27.9429 -125.86529,27.9429 M 34.529044,277.61956 c 41.163036,19.3623 82.215886,29.1411 122.164006,29.1411 42.3582,0 84.4847,-9.259 121.98321,-26.8101 18.62776,-39.5866 28.07019,-80.3286 28.07019,-121.04802 0,-40.88347 -9.85493,-83.411095 -28.49683,-123.085165 -40.57537,-19.0742 -82.95049,-29.1890696 -122.6302,-29.1890696 -42.60116,0 -83.43363,9.0355796 -121.446374,26.8609396 C 15.926699,72.341065 6.6396702,113.05204 6.6396702,154.56275 c 0,41.58951 9.6515028,84.13431 27.8893738,123.05681" />
              <path d="m 137.56237,237.90306 c 0.0763,-16.0114 -8.86041,-30.1694 -20.54055,-37.7782 -10.36068,-6.7244 -24.270055,-11.1434 -46.70926,-16.83366 -6.936336,-1.77427 -14.191926,-5.71569 -16.438108,-10.73929 -5.941786,5.98692 -7.021076,19.44705 -5.97569,27.31295 1.21493,9.1034 11.852506,24.1062 27.869603,24.694 9.781485,0.3926 22.148198,-2.1051 28.078685,-3.365 10.23073,-2.2096 26.41735,4.1984 28.9941,16.6895" />
              <path d="m 155.61942,28.465705 c -27.15761,0 -50.61679,17.91012 -50.53203,48.90172 0.0848,26.061425 21.04348,40.013175 28.52227,49.978385 11.30153,15.01678 17.4185,32.79128 18.05421,59.98852 0.49444,21.64533 0.46901,43.01923 0.5792,50.59413 l 5.99548,0 c -0.10447,-7.9252 -0.37579,-30.6158 -0.0651,-51.26375 0.40685,-27.20571 6.7442,-44.30212 18.05139,-59.3189 7.54378,-9.96521 28.48553,-23.91696 28.53075,-49.978385 0.10171,-30.9916 -23.34334,-48.90172 -50.47836,-48.90172" />
              <path d="m 162.51335,237.88336 c 0,-12.4911 -0.14134,-45.8787 0.16105,-49.99236 -0.26558,-49.68172 35.83437,-84.72767 58.67478,-81.99559 15.79108,1.37038 29.01106,7.8093 36.13669,26.33267 6.58032,17.26296 0.6583,40.22487 -21.213,45.61295 -23.42528,5.78646 -37.08037,10.60092 -47.00029,17.39303 -12.10961,8.3152 -21.31472,24.2022 -21.59725,42.669" />
              <path d="m 172.29202,237.90306 c -0.0848,-16.0114 8.84911,-30.1694 20.49535,-37.7782 10.40306,-6.7244 24.32939,-11.1434 46.74882,-16.83366 6.95045,-1.77427 14.19756,-5.71569 16.40418,-10.73929 5.97006,5.98692 7.04653,19.44705 6.00112,27.31295 -1.24034,9.1034 -11.84967,24.1062 -27.83852,24.694 -9.77866,0.3926 -22.21035,-2.1051 -28.11541,-3.365 -10.19116,-2.2096 -26.423,4.1984 -29.01106,16.6895" />
              <path d="m 829.5219,52.939205 -38.66259,70.174035 c -14.5931,-11.84967 -32.41283,-20.57163 -55.1487,-20.57163 -53.80382,0 -75.65817,40.10642 -75.65817,68.35745 0,20.97 13.73137,51.9107 61.60471,51.9107 20.09415,0 48.66161,-13.9799 56.88348,-20.3398 l -38.23876,81.4135 c -18.22657,3.6363 -24.21356,5.8909 -39.64298,6.3684 -85.68547,2.557 -120.31057,-50.0799 -120.28514,-103.86686 0.0566,-71.10373 63.27451,-157.577415 168.07371,-157.577415 6.42209,0 14.27667,2.22076 20.9926,4.68166 l 6.78658,-8.67958" />
              <path d="M 989.05162,27.010645 1000,282.06386 l -81.47846,0 -0.0481,-43.7427 -55.55839,0 -18.28589,43.7427 -88.36393,0 92.38163,-182.129935 -20.83157,-0.13562 39.58083,-72.78766 z m -71.10645,78.025925 -31.41264,74.18607 32.35913,0" />
              <path d="m 528.93477,27.010645 c 40.34935,0.22602 63.15021,22.12841 63.15021,53.76716 0,29.166455 -24.04686,54.984825 -50.44445,68.334775 27.1774,9.99042 29.52811,34.51491 29.52811,51.86558 0,41.9174 -42.06151,81.0857 -96.73556,81.0857 l -119.23691,0 46.51149,-179.59282 -19.10526,-0.11019 39.05531,-75.350205 c 0,0 74.46586,-0.22604 107.27706,0 M 489.3483,130.41969 c 8.3462,0 23.08339,-2.11332 26.7677,-18.26612 4.03747,-17.534195 -9.79278,-18.006105 -16.42679,-18.006105 l -23.70499,-0.10383 -8.26707,36.376905 z m -33.51472,45.07069 -10.91448,41.91738 27.91199,0 c 10.98228,0 25.94835,-5.4502 29.61569,-19.0911 3.62216,-13.68051 -6.84026,-22.82628 -17.78298,-22.82628" />
            </svg>
              <svg className="h-5 w-auto fill-current" viewBox="0 0 24 24" aria-label="Stripe">
                <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697.5 12.52.5 7.42.5 3.86 3.144 3.86 7.625c0 4.887 4.12 5.922 6.94 6.974 2.378.887 3.197 1.611 3.197 2.614 0 1.026-.952 1.545-2.428 1.545-2.392 0-5.187-1.127-6.938-2.171L3.74 22.09c1.944 1.077 4.858 1.91 8.272 1.91 5.373 0 9.176-2.584 9.176-7.234 0-5.148-4.148-6.07-7.212-7.616z" />
              </svg>
            </div>
            <h3 className="font-display text-base font-bold text-foreground">
              {t('Bayar Suka-Suka (Min. Rp 100rb)')}
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {t(
                'Satu kali pembayaran tanpa biaya langganan berulang. Mendukung Transfer Bank BCA (Lokal) dan Stripe (Internasional) via Dojo Checkout yang aman.',
              )}
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
