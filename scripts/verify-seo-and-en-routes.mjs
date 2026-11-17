import fs from 'node:fs/promises'
import path from 'node:path'
import { preview } from 'vite'
import { chromium } from '/Users/buchin/Repos/cuan-landing/node_modules/playwright/index.mjs'

const outputDir = '/Users/buchin/.gemini/antigravity-cli/brain/7caad0f1-212c-4a22-960f-48ac044a12c4/screenshots'
await fs.mkdir(outputDir, { recursive: true })

const landingRoot = '/Users/buchin/Repos/cuan-landing'
const server = await preview({
  root: landingRoot,
  preview: { host: '127.0.0.1', port: 0, open: false },
})

const port = server.httpServer.address().port
const baseUrl = `http://127.0.0.1:${port}`
console.log(`Preview server running at ${baseUrl}`)

const browser = await chromium.launch({ headless: true })

try {
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
  })
  const page = await context.newPage()

  // 1. Test /docs/work-with-cuan (Indonesian)
  await page.goto(`${baseUrl}/docs/work-with-cuan`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(400)
  const idTitle = await page.title()
  console.log('ID Docs Title:', idTitle)
  if (!idTitle.includes('Bekerja dengan Cuan')) {
    throw new Error(`Expected ID title to have 'Bekerja dengan Cuan', got: ${idTitle}`)
  }

  // Capture desktop ID
  await page.screenshot({
    path: path.join(outputDir, 'seo-01-work-with-cuan-desktop-id.png'),
  })
  console.log('Captured seo-01-work-with-cuan-desktop-id.png')

  // Capture scrolled status indicators section
  const statusSec = page.locator('#status-indicators')
  await statusSec.scrollIntoViewIfNeeded()
  await page.waitForTimeout(300)
  await page.screenshot({
    path: path.join(outputDir, 'seo-07-status-symbols-desktop.png'),
  })
  console.log('Captured seo-07-status-symbols-desktop.png')

  // 2. Test clicking EN button in navbar from /docs/work-with-cuan
  const enBtn = page.locator('header button:has-text("ID")')
  await enBtn.click()
  await page.waitForTimeout(400)
  console.log('Current URL after EN click:', page.url())
  if (!page.url().includes('/en/docs/work-with-cuan')) {
    throw new Error(`Expected URL to have '/en/docs/work-with-cuan', got: ${page.url()}`)
  }
  const enTitle = await page.title()
  console.log('EN Docs Title:', enTitle)
  if (!enTitle.includes('Work with Cuan')) {
    throw new Error(`Expected EN title to have 'Work with Cuan', got: ${enTitle}`)
  }

  // Capture desktop EN
  await page.screenshot({
    path: path.join(outputDir, 'seo-02-work-with-cuan-desktop-en.png'),
  })
  console.log('Captured seo-02-work-with-cuan-desktop-en.png')

  // 3. Test legacy slug redirect /docs/work-with-agent -> /docs/work-with-cuan
  await page.goto(`${baseUrl}/docs/work-with-agent`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(300)
  console.log('URL after visiting /docs/work-with-agent:', page.url())
  if (!page.url().endsWith('/docs/work-with-cuan')) {
    throw new Error(`Expected redirect to /docs/work-with-cuan, got: ${page.url()}`)
  }

  // 4. Test Customer Support Live Chat Widget subsection notes
  await page.goto(`${baseUrl}/docs/customer-support`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(300)
  await page.screenshot({
    path: path.join(outputDir, 'seo-03-customer-support-widget-desktop.png'),
  })
  console.log('Captured seo-03-customer-support-widget-desktop.png')

  // 5. Test English Landing Page /en
  await page.goto(`${baseUrl}/en`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(400)
  const lpEnTitle = await page.title()
  console.log('EN Landing Title:', lpEnTitle)
  await page.screenshot({
    path: path.join(outputDir, 'seo-04-landing-en-desktop.png'),
  })
  console.log('Captured seo-04-landing-en-desktop.png')

  // 6. Test English Sponsor Page /en/sponsor
  await page.goto(`${baseUrl}/en/sponsor`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(400)
  const sponsorEnTitle = await page.title()
  console.log('EN Sponsor Title:', sponsorEnTitle)
  await page.screenshot({
    path: path.join(outputDir, 'seo-05-sponsor-en-desktop.png'),
  })
  console.log('Captured seo-05-sponsor-en-desktop.png')

  // 7. Test Mobile Viewport 390x844 on /en/docs/work-with-cuan
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto(`${baseUrl}/en/docs/work-with-cuan`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(300)
  await page.screenshot({
    path: path.join(outputDir, 'seo-06-work-with-cuan-mobile-en.png'),
  })
  console.log('Captured seo-06-work-with-cuan-mobile-en.png')

  await context.close()
  console.log('All tests passed successfully!')
} finally {
  await browser.close()
  await server.close()
}
