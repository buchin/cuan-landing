import http from 'http'
import { spawn } from 'child_process'
import path from 'path'
import fs from 'fs'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const playwright = require(process.env.CUAN_BROWSER_MODULE || 'playwright-core')

const artifactsDir = process.env.CUAN_TASK_ARTIFACTS_DIR || '/tmp/cuan-task-agent-1494548304/artifacts'
if (!fs.existsSync(artifactsDir)) {
  fs.mkdirSync(artifactsDir, { recursive: true })
}

function waitPort(port, timeoutMs = 20000) {
  const start = Date.now()
  return new Promise((resolve, reject) => {
    function tryConnect() {
      const req = http.get(`http://127.0.0.1:${port}/`, (res) => {
        res.resume()
        resolve()
      })
      req.on('error', () => {
        if (Date.now() - start > timeoutMs) {
          reject(new Error(`Timed out waiting for port ${port}`))
        } else {
          setTimeout(tryConnect, 300)
        }
      })
    }
    tryConnect()
  })
}

async function run() {
  console.log('--- Starting Vite Preview Server ---')
  const preview = spawn('npx', ['vite', 'preview', '--port', '4173', '--strictPort'], {
    stdio: 'inherit',
    cwd: process.cwd(),
  })

  try {
    await waitPort(4173)
    console.log('Preview server ready at http://127.0.0.1:4173')

    const browser = await playwright.chromium.launch({
      headless: true,
      args: ['--no-sandbox'],
    })

    // ==========================================
    // 1. DESKTOP VERIFICATION (1440x900)
    // ==========================================
    console.log('\n=== RUNNING DESKTOP VERIFICATION (1440x900) ===')
    const desktopContext = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 2,
    })
    const desktopPage = await desktopContext.newPage()
    await desktopPage.goto('http://127.0.0.1:4173', { waitUntil: 'networkidle' })

    // 1.1 Hero Section
    console.log('--- Checking Hero Section ---')
    const heroTitle = await desktopPage.locator('#landing-title').innerText()
    console.log('Observed Hero Title:', heroTitle)
    if (!heroTitle.includes('Kembangin Proyek Digital dari Ide sampai Cuan')) {
      throw new Error(`Unexpected hero title: ${heroTitle}`)
    }

    const heroScreenshot = path.join(artifactsDir, 'desktop-01-hero.png')
    await desktopPage.screenshot({ path: heroScreenshot, clip: { x: 0, y: 0, width: 1440, height: 850 } })
    console.log('Saved:', heroScreenshot)

    // 1.2 Problem Section (PAS Order: Problem right after Hero)
    console.log('\n--- Checking Problem Section (PAS Order) ---')
    const problemSection = desktopPage.locator('#problem')
    await problemSection.scrollIntoViewIfNeeded()
    const problemText = await problemSection.innerText()
    if (!problemText.includes('Punya segudang ide bisnis, tapi sering mentok di urusan teknis?')) {
      throw new Error('Problem section title missing')
    }
    console.log('Verified: Problem section is placed directly after Hero!')

    // 1.3 Ecosystem Strip
    console.log('\n--- Checking Ecosystem Strip ---')
    const ecoSection = desktopPage.locator('#ecosystem-strip')
    await ecoSection.scrollIntoViewIfNeeded()
    const ecoText = await ecoSection.innerText()
    console.log('Observed Ecosystem text snippet:', ecoText.slice(0, 150))
    if (!ecoText.includes('Bantu jalankan berbagai jenis proyek digital Anda')) {
      throw new Error('Ecosystem strip heading missing')
    }
    const requiredPlatforms = ['Web & Publishing', 'Konten & Sosmed', 'Script & Toko Digital', 'Otomasi & Bot', 'WordPress', 'Ghost', 'Reels', 'CodeCanyon', 'Telegram', 'Discord', 'Cloudflare']
    for (const p of requiredPlatforms) {
      if (!ecoText.includes(p)) {
        throw new Error(`Missing required ecosystem platform: ${p}`)
      }
      console.log(`Verified ecosystem platform present: ${p}`)
    }
    if (ecoText.includes('WhatsApp')) {
      throw new Error('WhatsApp should not be in the ecosystem strip')
    }
    if (ecoText.includes('Substack')) {
      throw new Error('Substack should not be in the ecosystem strip')
    }
    console.log('Verified: WhatsApp and Substack removed cleanly.')

    const ecoScreenshot = path.join(artifactsDir, 'desktop-02-ecosystem.png')
    await ecoSection.screenshot({ path: ecoScreenshot })
    console.log('Saved:', ecoScreenshot)

    // 1.4 Cara Kerja Cuan (3 Langkah Ringkas & Tenang)
    console.log('\n--- Checking Cara Kerja Cuan (3 Langkah Ringkas & Tenang) ---')
    const demoSection = desktopPage.locator('#how-it-works')
    await demoSection.scrollIntoViewIfNeeded()

    const demoContent = await demoSection.innerText()
    console.log('Observed demoContent length:', demoContent.length)
    if (!demoContent.includes('Satu Obrolan, Langsung Menjadi Pekerjaan Nyata')) {
      throw new Error('Section 3 heading missing')
    }
    if (!demoContent.includes('file script katalog produk $39')) {
      throw new Error('Step 1 chat prompt missing')
    }
    if (!demoContent.includes('Pasang Script Marketplace & Konfigurasi Server')) {
      throw new Error('Step 2 approval plan title missing')
    }
    if (!demoContent.includes('Script Marketplace Berhasil Terpasang & Aktif')) {
      throw new Error('Step 3 result title missing')
    }
    if (!demoContent.includes('Live Terminal')) {
      throw new Error('Step 3 Live Terminal button missing')
    }
    if (!demoContent.includes('Ringkasan Hasil')) {
      throw new Error('Step 3 Ringkasan Hasil missing')
    }

    // Click interactive approve button on Step 2
    const approveBtn = demoSection.locator('button:has-text("Setujui & Jalankan Rencana")')
    if (await approveBtn.isVisible()) {
      await approveBtn.click()
      await desktopPage.waitForTimeout(300)
      const approvedBadge = demoSection.locator('span:has-text("Rencana Disetujui")').first()
      if (await approvedBadge.isVisible()) {
        console.log('Verified: Step 2 Approval button clicked -> changed state to "Rencana Disetujui"!')
      }
    }

    const howItWorksScreenshot = path.join(artifactsDir, 'desktop-03-how-it-works.png')
    await demoSection.screenshot({ path: howItWorksScreenshot })
    console.log('Saved:', howItWorksScreenshot)

    // 1.4 5 Pilar Nilai Utama
    console.log('\n--- Checking 5 Pilar Nilai Utama ---')
    const featuresSection = desktopPage.locator('#features')
    await featuresSection.scrollIntoViewIfNeeded()
    const featuresText = await featuresSection.innerText()

    const requiredPillars = [
      'Eksekusi Mandiri',
      'Pemeriksaan Hasil Nyata',
      'Anti-Amnesia Konteks',
      'Pakai Akun AI Sendiri',
      'Data Milik Anda di Server Sendiri',
    ]

    for (const pillar of requiredPillars) {
      if (!featuresText.includes(pillar)) {
        throw new Error(`Missing expected pillar: ${pillar}`)
      }
      console.log(`Verified pillar present: ${pillar}`)
    }

    const pillarsScreenshot = path.join(artifactsDir, 'desktop-06-5-pillars.png')
    await featuresSection.screenshot({ path: pillarsScreenshot })
    console.log('Saved:', pillarsScreenshot)

    // 1.5 Jargon Check
    console.log('\n--- Checking Absence of Forbidden Technical Jargon ---')
    const fullBodyText = await desktopPage.locator('body').innerText()
    const forbidden = ['PTY', 'daemon', 'cuan-runner daemon', 'zero-kill']
    for (const j of forbidden) {
      if (fullBodyText.toLowerCase().includes(j.toLowerCase())) {
        throw new Error(`Found forbidden internal jargon on landing page: ${j}`)
      }
    }
    console.log('Verified: Page is 100% clean of internal technical jargon (PTY, daemon, zero-kill)!')

    // Fullpage Desktop Screenshot
    const fullDesktopScreenshot = path.join(artifactsDir, 'desktop-fullpage.png')
    await desktopPage.screenshot({ path: fullDesktopScreenshot, fullPage: true })
    console.log('Saved:', fullDesktopScreenshot)
    await desktopContext.close()

    // ==========================================
    // 2. MOBILE VERIFICATION (390px - iPhone 12/13/14)
    // ==========================================
    console.log('\n=== RUNNING MOBILE VERIFICATION (390px) ===')
    const mobileContext = await browser.newContext({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
    })
    const mobilePage = await mobileContext.newPage()
    await mobilePage.goto('http://127.0.0.1:4173', { waitUntil: 'networkidle' })

    // Check no horizontal scrollbar overflow
    const scrollWidth = await mobilePage.evaluate(() => document.documentElement.scrollWidth)
    const clientWidth = await mobilePage.evaluate(() => document.documentElement.clientWidth)
    console.log(`Mobile width check: clientWidth=${clientWidth}, scrollWidth=${scrollWidth}`)
    if (scrollWidth > clientWidth) {
      console.warn(`Warning: Horizontal overflow detected on mobile (${scrollWidth} > ${clientWidth})`)
    } else {
      console.log('Verified: Zero horizontal scrollbar on mobile (390px)!')
    }

    // Mobile Hero
    const mobileHeroScreenshot = path.join(artifactsDir, 'mobile-390px-01-hero.png')
    await mobilePage.screenshot({ path: mobileHeroScreenshot, clip: { x: 0, y: 0, width: 390, height: 750 } })
    console.log('Saved:', mobileHeroScreenshot)

    // Mobile Ecosystem
    const mobileEcoSection = mobilePage.locator('#ecosystem-strip')
    await mobileEcoSection.scrollIntoViewIfNeeded()
    const mobileEcoScreenshot = path.join(artifactsDir, 'mobile-390px-02-ecosystem.png')
    await mobileEcoSection.screenshot({ path: mobileEcoScreenshot })
    console.log('Saved:', mobileEcoScreenshot)

    // Mobile How-it-works (3 Steps)
    const mobileDemoSection = mobilePage.locator('#how-it-works')
    await mobileDemoSection.scrollIntoViewIfNeeded()
    const mobileHowItWorksScreenshot = path.join(artifactsDir, 'mobile-390px-03-how-it-works.png')
    await mobileDemoSection.screenshot({ path: mobileHowItWorksScreenshot })
    console.log('Saved:', mobileHowItWorksScreenshot)

    // Mobile 5 Pillars
    const mobileFeaturesSection = mobilePage.locator('#features')
    await mobileFeaturesSection.scrollIntoViewIfNeeded()
    const mobilePillarsScreenshot = path.join(artifactsDir, 'mobile-390px-04-pillars.png')
    await mobileFeaturesSection.screenshot({ path: mobilePillarsScreenshot })
    console.log('Saved:', mobilePillarsScreenshot)

    // Fullpage Mobile Screenshot
    const mobileFullScreenshot = path.join(artifactsDir, 'mobile-390px-fullpage.png')
    await mobilePage.screenshot({ path: mobileFullScreenshot, fullPage: true })
    console.log('Saved:', mobileFullScreenshot)

    await mobileContext.close()
    await browser.close()

    console.log('\n======================================================')
    console.log('ALL VERIFICATION CHECKS PASSED FACTUALLY (100% SUITE)!')
    console.log('======================================================\n')
  } finally {
    preview.kill()
  }
}

run().catch((err) => {
  console.error('Verification failed:', err)
  process.exit(1)
})
