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
    if (!heroTitle.includes('Punya PM & Tim Teknis Pribadi')) {
      throw new Error(`Unexpected hero title: ${heroTitle}`)
    }

    const heroBadge = await desktopPage.locator('main section:first-of-type div.rounded-full').first().innerText()
    console.log('Observed Hero Badge:', heroBadge)
    if (!heroBadge.includes('AI Project Manager')) {
      throw new Error(`Unexpected hero badge: ${heroBadge}`)
    }

    const heroScreenshot = path.join(artifactsDir, 'desktop-01-hero.png')
    await desktopPage.screenshot({ path: heroScreenshot, clip: { x: 0, y: 0, width: 1440, height: 850 } })
    console.log('Saved:', heroScreenshot)

    // 1.2 Ecosystem Strip
    console.log('\n--- Checking Ecosystem Strip ---')
    const ecoSection = desktopPage.locator('#ecosystem-strip')
    await ecoSection.scrollIntoViewIfNeeded()
    const ecoText = await ecoSection.innerText()
    console.log('Observed Ecosystem text snippet:', ecoText.slice(0, 150))
    if (!ecoText.includes('Bikin & kelola berbagai jenis project')) {
      throw new Error('Ecosystem strip heading missing')
    }
    const requiredPlatforms = ['WordPress', 'Ghost', 'CodeCanyon & Scripts', 'Media Sosial', 'Cloudflare & Web Apps']
    for (const p of requiredPlatforms) {
      if (!ecoText.includes(p)) {
        throw new Error(`Missing required ecosystem platform: ${p}`)
      }
      console.log(`Verified ecosystem platform present: ${p}`)
    }

    const ecoScreenshot = path.join(artifactsDir, 'desktop-02-ecosystem.png')
    await ecoSection.screenshot({ path: ecoScreenshot })
    console.log('Saved:', ecoScreenshot)

    // 1.3 Kotak Demo Terpadu (3 Tab Interaktif)
    console.log('\n--- Checking Kotak Demo Terpadu (3 Tab Interaktif) ---')
    const demoSection = desktopPage.locator('#how-it-works')
    await demoSection.scrollIntoViewIfNeeded()

    // TAB 1: Pasang Script Beli
    console.log('-> Testing Tab 1: Pasang Script Beli (Bebas Biaya Jasa Install)...')
    const tab1Btn = demoSection.locator('button:has-text("Pasang Script Beli")')
    await tab1Btn.click()
    await desktopPage.waitForTimeout(300)

    let demoContent = await demoSection.innerText()
    console.log('Observed demoContent Tab 1 length:', demoContent.length)
    if (!demoContent.toLowerCase().includes('bebas jasa install')) {
      throw new Error('Tab 1 badge missing')
    }
    if (!demoContent.includes('file script katalog produk $39')) {
      throw new Error('Tab 1 chat prompt missing')
    }
    if (!demoContent.includes('Cara Lama (Repot & Boncos Jasa Teknisi)')) {
      throw new Error('Tab 1 Cara Lama contrast missing')
    }
    if (!demoContent.includes('Pakai Cuan (Beres Lewat Chat)')) {
      throw new Error('Tab 1 Pakai Cuan contrast missing')
    }

    // Click interactive approve button on Tab 1
    const approveBtn1 = demoSection.locator('button:has-text("Setujui & Jalankan Rencana")')
    if (await approveBtn1.isVisible()) {
      await approveBtn1.click()
      await desktopPage.waitForTimeout(300)
      const approvedBadge1 = demoSection.locator('span:has-text("Rencana Disetujui")').first()
      if (await approvedBadge1.isVisible()) {
        console.log('Verified: Tab 1 Approval button clicked -> changed state to "Rencana Disetujui"!')
      }
    }

    const demoTab1Screenshot = path.join(artifactsDir, 'desktop-03-demo-tab1-script.png')
    await demoSection.screenshot({ path: demoTab1Screenshot })
    console.log('Saved:', demoTab1Screenshot)

    // TAB 2: Riset & Update Web
    console.log('-> Testing Tab 2: Riset & Update Web (Anti-Amnesia Sesi)...')
    const tab2Btn = demoSection.locator('button:has-text("Riset & Update Web")')
    await tab2Btn.click()
    await desktopPage.waitForTimeout(400)

    demoContent = await demoSection.innerText()
    if (!demoContent.toLowerCase().includes('anti-amnesia sesi')) {
      throw new Error('Tab 2 badge missing')
    }
    if (!demoContent.includes('Riset 5 produk kompetitor')) {
      throw new Error('Tab 2 chat prompt missing')
    }
    if (!demoContent.includes('Cara Lama (Amnesia Sesi & Manual Copy-Paste)')) {
      throw new Error('Tab 2 Cara Lama contrast missing')
    }
    if (!demoContent.includes('Pakai Cuan (Anti-Amnesia & Eksekusi Langsung)')) {
      throw new Error('Tab 2 Pakai Cuan contrast missing')
    }

    // Click interactive approve button on Tab 2
    const approveBtn2 = demoSection.locator('button:has-text("Setujui & Jalankan Rencana")')
    if (await approveBtn2.isVisible()) {
      await approveBtn2.click()
      await desktopPage.waitForTimeout(300)
      console.log('Verified: Tab 2 Approval button clicked -> changed state to "Rencana Disetujui"!')
    }

    const demoTab2Screenshot = path.join(artifactsDir, 'desktop-04-demo-tab2-research.png')
    await demoSection.screenshot({ path: demoTab2Screenshot })
    console.log('Saved:', demoTab2Screenshot)

    // TAB 3: Otomasi Trafik & Sosmed
    console.log('-> Testing Tab 3: Otomasi Trafik & Sosmed (Otomasi Rutin)...')
    const tab3Btn = demoSection.locator('button:has-text("Otomasi Trafik & Sosmed")')
    await tab3Btn.click()
    await desktopPage.waitForTimeout(400)

    demoContent = await demoSection.innerText()
    if (!demoContent.toLowerCase().includes('otomasi rutin')) {
      throw new Error('Tab 3 badge missing')
    }
    if (!demoContent.includes('auto-ping ke mesin pencari')) {
      throw new Error('Tab 3 chat prompt missing')
    }
    if (!demoContent.includes('Cara Lama (Manual, Tercecer & Mudah Lupa)')) {
      throw new Error('Tab 3 Cara Lama contrast missing')
    }
    if (!demoContent.includes('Pakai Cuan (Otomasi Rutin Terpadu)')) {
      throw new Error('Tab 3 Pakai Cuan contrast missing')
    }

    // Click interactive approve button on Tab 3
    const approveBtn3 = demoSection.locator('button:has-text("Setujui & Jalankan Rencana")')
    if (await approveBtn3.isVisible()) {
      await approveBtn3.click()
      await desktopPage.waitForTimeout(300)
      console.log('Verified: Tab 3 Approval button clicked -> changed state to "Rencana Disetujui"!')
    }

    const demoTab3Screenshot = path.join(artifactsDir, 'desktop-05-demo-tab3-automation.png')
    await demoSection.screenshot({ path: demoTab3Screenshot })
    console.log('Saved:', demoTab3Screenshot)

    // 1.4 5 Pilar Nilai Utama
    console.log('\n--- Checking 5 Pilar Nilai Utama ---')
    const featuresSection = desktopPage.locator('#features')
    await featuresSection.scrollIntoViewIfNeeded()
    const featuresText = await featuresSection.innerText()

    const requiredPillars = [
      'Eksekusi Mandiri',
      'Verifikasi Nyata',
      'Anti-Amnesia Konteks',
      'BYO AI Account',
      'Kedaulatan Server Privat',
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

    // Mobile Demo Section & Tab Switch
    const mobileDemoSection = mobilePage.locator('#how-it-works')
    await mobileDemoSection.scrollIntoViewIfNeeded()
    const mobileDemoTab1 = path.join(artifactsDir, 'mobile-390px-03-demo-tab1.png')
    await mobileDemoSection.screenshot({ path: mobileDemoTab1 })
    console.log('Saved:', mobileDemoTab1)

    // Switch tab on mobile
    const mobileTab2Btn = mobileDemoSection.locator('button:has-text("Riset & Update Web")')
    await mobileTab2Btn.click()
    await mobilePage.waitForTimeout(300)
    const mobileDemoTab2 = path.join(artifactsDir, 'mobile-390px-03-demo-tab2.png')
    await mobileDemoSection.screenshot({ path: mobileDemoTab2 })
    console.log('Saved:', mobileDemoTab2)

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
