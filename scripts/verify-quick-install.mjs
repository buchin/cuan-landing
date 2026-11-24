import path from 'node:path'
import fs from 'node:fs/promises'
import { createRequire } from 'node:module'
import { preview } from 'vite'

const require = createRequire(import.meta.url)
const playwright = require(process.env.CUAN_BROWSER_MODULE || 'playwright-core')

const artifactsDir = process.env.CUAN_TASK_ARTIFACTS_DIR || '/tmp/cuan-task-agent-839370704/artifacts'
await fs.mkdir(artifactsDir, { recursive: true })

console.log('--- Starting Vite Preview Server ---')
const server = await preview({
  preview: { host: '127.0.0.1', port: 0, open: false },
})

const port = server.httpServer.address().port
const baseUrl = `http://127.0.0.1:${port}`
console.log(`Preview server ready at ${baseUrl}`)

const browser = await playwright.chromium.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
})

try {
  // ==========================================
  // 1. DESKTOP VERIFICATION (1440x900)
  // ==========================================
  console.log('\n=== RUNNING DESKTOP VERIFICATION (1440x900) ===')
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    permissions: ['clipboard-read', 'clipboard-write'],
  })
  const desktopPage = await desktopContext.newPage()
  await desktopPage.goto(baseUrl, { waitUntil: 'networkidle' })

  // 1.1 Verify Hero Quick Install box
  console.log('1. Verifying Quick Install Box in Hero Section...')
  const heroSection = desktopPage.locator('section[aria-labelledby="landing-title"]')
  await heroSection.waitFor({ state: 'visible' })

  const commandCode = heroSection.locator('code:has-text("curl -fsSL https://cuan.work/install.sh | bash")')
  if (!(await commandCode.isVisible())) {
    throw new Error('Quick Install command code is not visible in Hero Section!')
  }
  console.log('✓ Quick Install command code is visible in Hero Section')

  // 1.2 Verify Copy button initial state
  const copyBtn = heroSection.locator('button:has-text("Salin")')
  if (!(await copyBtn.isVisible())) {
    throw new Error('Copy button with text "Salin" not found in Hero Section!')
  }
  console.log('✓ Copy button is visible with initial state "Salin"')

  // Screenshot before copy
  await desktopPage.screenshot({
    path: path.join(artifactsDir, 'desktop-hero-quick-install.png'),
    clip: { x: 0, y: 0, width: 1440, height: 750 },
  })
  console.log('✓ Saved desktop-hero-quick-install.png')

  // 1.3 Click copy button and verify feedback
  await copyBtn.click()
  await desktopPage.waitForTimeout(200)

  const copiedBtn = heroSection.locator('button:has-text("Tersalin!")')
  if (!(await copiedBtn.isVisible())) {
    throw new Error('Copy button did not show "Tersalin!" feedback when clicked!')
  }
  console.log('✓ Interactive feedback confirmed: button displays "Tersalin!" on click')

  // Screenshot after copy
  await desktopPage.screenshot({
    path: path.join(artifactsDir, 'desktop-hero-copied.png'),
    clip: { x: 0, y: 0, width: 1440, height: 750 },
  })
  console.log('✓ Saved desktop-hero-copied.png')

  // 1.4 Verify Hero CTA hierarchy (Docs & GitHub present, Hall of Fame NOT in Hero)
  console.log('2. Verifying Hero CTA hierarchy...')
  const docsLink = heroSection.locator('a[href="/docs"]:has-text("Dokumentasi")')
  if (!(await docsLink.isVisible())) {
    throw new Error('Secondary Documentation link missing in Hero!')
  }
  console.log('✓ Secondary Documentation link is visible in Hero')

  const githubLink = heroSection.locator('a[href="https://github.com/buchin/cuan"]')
  if (!(await githubLink.isVisible())) {
    throw new Error('Secondary GitHub link missing in Hero!')
  }
  console.log('✓ Secondary GitHub link is visible in Hero')

  const heroHallOfFame = heroSection.locator('a:has-text("Hall of Fame 100 Backer")')
  if (await heroHallOfFame.count() > 0) {
    throw new Error('Hall of Fame button should NOT be in Hero Section!')
  }
  console.log('✓ Hall of Fame 100 Backer button is successfully removed from Hero Section')

  // 1.5 Verify Hall of Fame button in FoundingBackersSection
  console.log('3. Verifying Hall of Fame button relocation in Backer Section...')
  const backerSection = desktopPage.locator('section:has-text("Sponsorware · Target 100 Sponsor")')
  await backerSection.scrollIntoViewIfNeeded()
  await desktopPage.waitForTimeout(300)

  const backerHallOfFame = backerSection.locator('a[href="/sponsor#directory"]:has-text("Hall of Fame 100 Backer")')
  if (!(await backerHallOfFame.isVisible())) {
    throw new Error('Relocated Hall of Fame 100 Backer button not found in FoundingBackersSection!')
  }
  console.log('✓ Relocated Hall of Fame 100 Backer button is visible in FoundingBackersSection')

  await backerSection.screenshot({
    path: path.join(artifactsDir, 'desktop-backers-hall-of-fame.png'),
  })
  console.log('✓ Saved desktop-backers-hall-of-fame.png')

  // 1.6 Check layout and overflow
  const isOverflowingDesktop = await desktopPage.evaluate(() => {
    return document.documentElement.scrollWidth > window.innerWidth
  })
  if (isOverflowingDesktop) {
    throw new Error('Desktop layout has horizontal overflow!')
  }
  console.log('✓ Desktop layout has no horizontal overflow')

  // 1.7 Dark Mode Verification
  console.log('4. Verifying Dark Mode...')
  await desktopPage.evaluate(() => {
    document.documentElement.classList.add('dark')
    window.scrollTo(0, 0)
  })
  await desktopPage.waitForTimeout(300)

  await desktopPage.screenshot({
    path: path.join(artifactsDir, 'desktop-hero-dark-mode.png'),
    clip: { x: 0, y: 0, width: 1440, height: 750 },
  })
  console.log('✓ Saved desktop-hero-dark-mode.png')

  await desktopContext.close()

  // ==========================================
  // 2. MOBILE VERIFICATION (375x667)
  // ==========================================
  console.log('\n=== RUNNING MOBILE VERIFICATION (375x667) ===')
  const mobileContext = await browser.newContext({
    viewport: { width: 375, height: 667 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
    permissions: ['clipboard-read', 'clipboard-write'],
  })
  const mobilePage = await mobileContext.newPage()
  await mobilePage.goto(baseUrl, { waitUntil: 'networkidle' })

  const mobileHero = mobilePage.locator('section[aria-labelledby="landing-title"]')
  const mobileCommand = mobileHero.locator('code:has-text("curl -fsSL https://cuan.work/install.sh | bash")')
  if (!(await mobileCommand.isVisible())) {
    throw new Error('Quick Install command missing on mobile view!')
  }
  console.log('✓ Mobile Quick Install command is visible')

  const mobileCopyBtn = mobileHero.locator('button:has-text("Salin")')
  if (!(await mobileCopyBtn.isVisible())) {
    throw new Error('Mobile Copy button missing!')
  }

  // Check overflow on mobile
  const isOverflowingMobile = await mobilePage.evaluate(() => {
    return document.documentElement.scrollWidth > window.innerWidth
  })
  if (isOverflowingMobile) {
    throw new Error('Mobile layout has horizontal overflow!')
  }
  console.log('✓ Mobile layout has no horizontal overflow')

  await mobilePage.screenshot({
    path: path.join(artifactsDir, 'mobile-hero-quick-install.png'),
    clip: { x: 0, y: 0, width: 375, height: 667 },
  })
  console.log('✓ Saved mobile-hero-quick-install.png')

  // Test mobile copy click
  await mobileCopyBtn.click()
  await mobilePage.waitForTimeout(200)

  const mobileCopiedBtn = mobileHero.locator('button:has-text("Tersalin!")')
  if (!(await mobileCopiedBtn.isVisible())) {
    throw new Error('Mobile copy button did not show "Tersalin!" on click!')
  }
  console.log('✓ Mobile copy button interaction verified ("Tersalin!")')

  await mobilePage.screenshot({
    path: path.join(artifactsDir, 'mobile-hero-copied.png'),
    clip: { x: 0, y: 0, width: 375, height: 667 },
  })
  console.log('✓ Saved mobile-hero-copied.png')

  // Check backer section on mobile
  const mobileBackerSection = mobilePage.locator('section:has-text("Sponsorware · Target 100 Sponsor")')
  await mobileBackerSection.scrollIntoViewIfNeeded()
  await mobilePage.waitForTimeout(300)

  const mobileHallOfFame = mobileBackerSection.locator('a[href="/sponsor#directory"]:has-text("Hall of Fame 100 Backer")')
  if (!(await mobileHallOfFame.isVisible())) {
    throw new Error('Mobile relocated Hall of Fame button not visible!')
  }
  console.log('✓ Mobile relocated Hall of Fame button is visible')

  await mobileBackerSection.screenshot({
    path: path.join(artifactsDir, 'mobile-backers-hall-of-fame.png'),
  })
  console.log('✓ Saved mobile-backers-hall-of-fame.png')

  await mobileContext.close()

  // ==========================================
  // 3. MOBILE VERIFICATION (390x844 - iPhone 12/13/14)
  // ==========================================
  console.log('\n=== RUNNING MOBILE 390x844 VERIFICATION ===')
  const mobileContext390 = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
  })
  const mobilePage390 = await mobileContext390.newPage()
  await mobilePage390.goto(baseUrl, { waitUntil: 'networkidle' })

  await mobilePage390.screenshot({
    path: path.join(artifactsDir, 'mobile-390-hero.png'),
    clip: { x: 0, y: 0, width: 390, height: 844 },
  })
  console.log('✓ Saved mobile-390-hero.png')
  await mobileContext390.close()

  console.log('\n=== ALL VERIFICATIONS PASSED SUCCESSFULLY ===')
} finally {
  await browser.close()
  await server.close()
}
