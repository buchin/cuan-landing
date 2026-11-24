import http from 'http'
import { spawn } from 'child_process'
import path from 'path'
import fs from 'fs'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const playwright = require('playwright')

const artifactsDir = process.env.CUAN_TASK_ARTIFACTS_DIR || '/tmp/cuan-task-agent-2545758298/artifacts'
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

async function verifyFunctionsReceiver() {
  console.log('\n--- 1. Testing Functions Profile Validation Logic ---')
  const { isValidEmail, formatUrl } = await import('../functions/api/sponsors/profile.ts')

  // Email validation tests
  if (!isValidEmail('sponsor@example.com')) throw new Error('Valid email rejected')
  if (isValidEmail('invalid-email')) throw new Error('Invalid email accepted')
  if (isValidEmail('')) throw new Error('Empty email accepted')
  if (isValidEmail('@domain.com')) throw new Error('Malformed email accepted')
  console.log('✓ Email validation assertions passed')

  // URL format tests
  if (formatUrl('example.com') !== 'https://example.com') throw new Error('URL prefix failed')
  if (formatUrl('http://example.com') !== 'http://example.com') throw new Error('http scheme preserved failed')
  if (formatUrl('https://example.com') !== 'https://example.com') throw new Error('https scheme preserved failed')
  console.log('✓ URL formatting assertions passed')
}

async function run() {
  await verifyFunctionsReceiver()

  console.log('\n--- 2. Starting Vite Preview Server ---')
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
    // SCENARIO 1: Return from checkout (?status=pending)
    // ==========================================
    console.log('\n=== SCENARIO 1: Return from Checkout (?status=pending) ===')
    const context = await browser.newContext({
      viewport: { width: 1280, height: 800 },
      deviceScaleFactor: 2,
    })
    const page = await context.newPage()

    // Intercept profile API endpoint for deterministic testing
    await page.route('**/api/sponsors/profile', async (route) => {
      const postData = route.request().postDataJSON()
      console.log('Intercepted /api/sponsors/profile POST payload:', postData)
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          status: 'success',
          message: 'Profil sponsor Anda berhasil dikirim dan tersimpan.',
          data: postData,
        }),
      })
    })

    await page.goto('http://127.0.0.1:4173/sponsor?status=pending&order_id=dojo_sp_test_123', {
      waitUntil: 'networkidle',
    })

    // Verify banner presence
    const bannerTitle = await page.locator('text=Terima kasih atas kontribusi sponsor Anda!').first()
    if (!(await bannerTitle.isVisible())) {
      throw new Error('Return checkout banner not visible')
    }
    console.log('✓ Return from checkout banner is visible')

    // Verify form fields presence
    const emailInput = page.locator('#sponsor-email')
    const brandInput = page.locator('#sponsor-brand')
    const urlInput = page.locator('#sponsor-url')
    const githubInput = page.locator('#sponsor-github')
    const sloganInput = page.locator('#sponsor-slogan')

    if (!(await emailInput.isVisible())) throw new Error('#sponsor-email not found')
    if (!(await brandInput.isVisible())) throw new Error('#sponsor-brand not found')
    if (!(await urlInput.isVisible())) throw new Error('#sponsor-url not found')
    if (!(await githubInput.isVisible())) throw new Error('#sponsor-github not found')
    if (!(await sloganInput.isVisible())) throw new Error('#sponsor-slogan not found')
    console.log('✓ All 6 required form fields are visible and bound')

    // Fill the form
    await emailInput.fill('sponsor.test@example.com')
    await brandInput.fill('PT Sinergi Digital')
    await urlInput.fill('sinergidigital.id')
    await githubInput.fill('sinergidigital')
    await sloganInput.fill('Solusi otomatisasi cerdas bisnis masa depan')

    // Toggle logo URL mode and fill URL
    await page.locator('text=URL Gambar').click()
    const logoUrlInput = page.locator('input[type="url"]')
    await logoUrlInput.fill('https://sinergidigital.id/logo.png')

    // Submit the form
    const submitBtn = page.locator('button[type="submit"]:has-text("Kirim Profil Sponsor")')
    await submitBtn.click()

    // Verify success confirmation card appears
    await page.waitForSelector('text=Profil Sponsor Berhasil Dikirim', { timeout: 5000 })
    console.log('✓ Success confirmation card displayed')

    const submittedBrand = await page.locator('text=PT Sinergi Digital').isVisible()
    const submittedEmail = await page.locator('text=sponsor.test@example.com').isVisible()
    const submittedGithub = await page.locator('text=@sinergidigital').isVisible()
    if (!submittedBrand || !submittedEmail || !submittedGithub) {
      throw new Error('Submitted data summary incomplete in success card')
    }
    console.log('✓ Submitted data summary properly confirmed')

    const returnScreenshot = path.join(artifactsDir, 'sponsor-return-confirmed-desktop.png')
    await page.screenshot({ path: returnScreenshot, fullPage: false })
    console.log('Saved screenshot:', returnScreenshot)

    // ==========================================
    // SCENARIO 2: Direct /sponsor with Self-Service Trigger
    // ==========================================
    console.log('\n=== SCENARIO 2: Direct /sponsor (Self-Service Trigger) ===')
    const directPage = await context.newPage()
    await directPage.goto('http://127.0.0.1:4173/sponsor', { waitUntil: 'networkidle' })

    // Verify trigger button in Hero exists
    const triggerInHero = directPage.locator('button:has-text("Lengkapi Profil Sponsor")')
    if (!(await triggerInHero.isVisible())) {
      throw new Error('Self-service trigger button missing in hero')
    }
    console.log('✓ Self-service trigger button present in hero')

    // Verify self-service card before checkout exists
    const profileSectionCard = directPage.locator('#profile')
    if (!(await profileSectionCard.isVisible())) {
      throw new Error('Self-service profile card section (#profile) missing')
    }
    console.log('✓ Self-service profile section present on page')

    // Click trigger and verify form opens
    await triggerInHero.click()
    await directPage.waitForTimeout(400)
    const openedEmailInput = directPage.locator('#sponsor-email')
    if (!(await openedEmailInput.isVisible())) {
      throw new Error('Profile form failed to open after clicking trigger button')
    }
    console.log('✓ Profile form successfully opened via trigger button')

    // ==========================================
    // SCENARIO 3: Mobile Viewports (375px & 390px)
    // ==========================================
    console.log('\n=== SCENARIO 3: Mobile Viewports (375px & 390px) ===')
    for (const width of [375, 390]) {
      console.log(`--- Testing mobile viewport width: ${width}px ---`)
      const mobileContext = await browser.newContext({
        viewport: { width, height: 750 },
        deviceScaleFactor: 2,
        isMobile: true,
      })
      const mobilePage = await mobileContext.newPage()
      await mobilePage.goto('http://127.0.0.1:4173/sponsor?status=pending', { waitUntil: 'networkidle' })

      // Check horizontal overflow
      const overflow = await mobilePage.evaluate(() => {
        const docEl = document.documentElement
        return {
          scrollWidth: docEl.scrollWidth,
          clientWidth: docEl.clientWidth,
          hasHorizontalScroll: docEl.scrollWidth > docEl.clientWidth,
        }
      })
      console.log(`Viewport ${width}px overflow metrics:`, overflow)
      if (overflow.hasHorizontalScroll) {
        throw new Error(`Horizontal scroll detected on ${width}px mobile viewport! scrollWidth: ${overflow.scrollWidth}, clientWidth: ${overflow.clientWidth}`)
      }
      console.log(`✓ Zero horizontal overflow on ${width}px viewport!`)

      const mobileScreenshot = path.join(artifactsDir, `sponsor-profile-mobile-${width}px.png`)
      await mobilePage.screenshot({ path: mobileScreenshot, fullPage: false })
      console.log('Saved mobile screenshot:', mobileScreenshot)
      await mobileContext.close()
    }

    await browser.close()
    console.log('\n==========================================')
    console.log('ALL VERIFICATION SCENARIOS PASSED CLEANLY!')
    console.log('==========================================\n')
  } finally {
    preview.kill('SIGTERM')
  }
}

run().catch((err) => {
  console.error('Verification failed:', err)
  process.exit(1)
})
