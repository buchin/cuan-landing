import { chromium } from 'playwright'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import fs from 'node:fs/promises'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outputDir = path.resolve(__dirname, '../public/examples/social-media')
await fs.mkdir(outputDir, { recursive: true })

const slides = [
  {
    tag: 'PANDUAN SEDUH #01',
    title: '5 Kunci Emas Seduh V60\nyang Sering Diabaikan Pemula',
    subtitle: 'Biar kopi seduhan rumah Anda tidak lagi terasa pahit gosong atau asam sepat.',
    footer: '@barukopi.id · Geser untuk membaca →',
    isCover: true,
  },
  {
    tag: 'KUNCI SEDUH #01',
    num: '01',
    title: 'Jangan Pakai Air Mendidih Langsung',
    desc: 'Suhu ideal menyeduh V60 adalah 90°C – 94°C. Air mendidih 100°C membakar bubuk kopi dan mengekstrak rasa pahit getir berlebih.',
    tip: 'Langkah praktis: Diamkan air 1–2 menit setelah teko mendidih sebelum mulai menuang.',
    footer: '@barukopi.id · Kunci #01 dari 5',
  },
  {
    tag: 'KUNCI SEDUH #02',
    num: '02',
    title: 'Patuhi Rasio Seduh 1:15',
    desc: 'Gunakan timbangan digital (scale). Takaran sendok adalah penyebab utama rasa kopi berubah-ubah setiap hari.',
    tip: 'Rumus standar: 15 gram bubuk kopi diseduh dengan total 225 gram air panas.',
    footer: '@barukopi.id · Kunci #02 dari 5',
  },
  {
    tag: 'KUNCI SEDUH #03',
    num: '03',
    title: 'Kunci Blooming 30–45 Detik',
    desc: 'Tuangan pertama (30–45ml) bertujuan membuang gas CO2 dari biji kopi sangrai segar agar air bisa menyerap aroma secara optimal.',
    tip: 'Tanda kopi segar: Bubuk kopi akan mengembang dan membentuk kubah gelembung kecil.',
    footer: '@barukopi.id · Kunci #03 dari 5',
  },
  {
    tag: 'RINGKASAN & DISKUSI',
    num: '✓',
    title: 'Simpan Panduan Ini\nuntuk Seduhan Besok Pagi',
    desc: '1. Suhu 90°–94°C\n2. Rasio 1:15 (15g kopi : 225ml air)\n3. Blooming 40 detik',
    tip: 'Komentar "V60" kalau Anda mau rekomendasi 3 biji kopi arabika lokal terbaik minggu ini!',
    footer: '@barukopi.id · Follow untuk tips seduh harian',
    isOutro: true,
  },
]

function getSlideHtml(slide, index, total) {
  return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,600;1,6..72,400&display=swap');
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      width: 1080px;
      height: 1350px;
      background-color: #121214;
      color: #f4f4f6;
      font-family: 'Plus Jakarta Sans', sans-serif;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 100px 90px;
      overflow: hidden;
      position: relative;
    }

    /* Ambient Subtle Glow */
    .glow {
      position: absolute;
      top: -150px;
      right: -150px;
      width: 600px;
      height: 600px;
      background: radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, rgba(18, 18, 20, 0) 70%);
      pointer-events: none;
    }

    .top-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      padding-bottom: 28px;
    }

    .brand {
      font-size: 22px;
      font-weight: 700;
      letter-spacing: 0.05em;
      color: #10b981;
      text-transform: uppercase;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .brand-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #10b981;
    }

    .slide-num {
      font-size: 20px;
      font-weight: 600;
      color: rgba(244, 244, 246, 0.5);
      letter-spacing: 0.1em;
    }

    .content-area {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 40px;
      margin: 40px 0;
    }

    .tag-badge {
      display: inline-flex;
      align-items: center;
      align-self: flex-start;
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.12);
      padding: 8px 18px;
      border-radius: 999px;
      font-size: 16px;
      font-weight: 600;
      color: #10b981;
      letter-spacing: 0.08em;
    }

    .title {
      font-size: ${slide.isCover ? '68px' : '56px'};
      font-weight: 800;
      line-height: 1.15;
      letter-spacing: -0.03em;
      color: #ffffff;
      white-space: pre-line;
    }

    .desc {
      font-size: 28px;
      line-height: 1.55;
      color: rgba(244, 244, 246, 0.78);
      font-weight: 400;
      white-space: pre-line;
      max-width: 900px;
    }

    .tip-box {
      background: rgba(255, 255, 255, 0.04);
      border-left: 4px solid #10b981;
      padding: 24px 30px;
      border-radius: 0 16px 16px 0;
      font-size: 24px;
      line-height: 1.5;
      color: rgba(244, 244, 246, 0.9);
      font-weight: 500;
    }

    .bottom-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      padding-top: 28px;
      font-size: 20px;
      color: rgba(244, 244, 246, 0.55);
      font-weight: 500;
    }

    .dots {
      display: flex;
      gap: 8px;
    }

    .dot {
      width: 28px;
      height: 4px;
      border-radius: 2px;
      background: rgba(255, 255, 255, 0.18);
    }

    .dot.active {
      background: #10b981;
      width: 48px;
    }
  </style>
</head>
<body>
  <div class="glow"></div>

  <div class="top-bar">
    <div class="brand">
      <span class="brand-dot"></span>
      BARU KOPI
    </div>
    <div class="slide-num">${index + 1} / ${total}</div>
  </div>

  <div class="content-area">
    <div class="tag-badge">${slide.tag}</div>
    <h1 class="title">${slide.title}</h1>
    <p class="desc">${slide.subtitle || slide.desc}</p>
    ${slide.tip ? `<div class="tip-box">${slide.tip}</div>` : ''}
  </div>

  <div class="bottom-bar">
    <span>${slide.footer}</span>
    <div class="dots">
      ${Array.from({ length: total })
        .map((_, i) => `<div class="dot ${i === index ? 'active' : ''}"></div>`)
        .join('')}
    </div>
  </div>
</body>
</html>`
}

async function renderCarousel() {
  console.log('Launching browser to render carousel slides...')
  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({
    viewport: { width: 1080, height: 1350 },
    deviceScaleFactor: 1,
  })
  const page = await context.newPage()

  for (let i = 0; i < slides.length; i++) {
    const html = getSlideHtml(slides[i], i, slides.length)
    await page.setContent(html, { waitUntil: 'networkidle' })
    const outPath = path.join(outputDir, `slide-${i + 1}.png`)
    await page.screenshot({ path: outPath })
    console.log(`Rendered slide-${i + 1}.png`)
  }

  await browser.close()
  console.log('All 5 slides successfully rendered to', outputDir)
}

renderCarousel().catch(err => {
  console.error(err)
  process.exit(1)
})
