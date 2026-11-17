import { preview } from 'vite'
import { chromium } from 'playwright'

const slug = process.argv[2] || 'getting-started'
const outPrefix = process.argv[3] || slug

const server = await preview({
  root: process.cwd(),
  preview: { port: 0, host: '127.0.0.1' },
  logLevel: 'error'
})
const address = server.httpServer.address()
const port = address.port

const browser = await chromium.launch({ headless: true })

// 1. Desktop 1280px Light
const pageDesktop = await browser.newPage({ viewport: { width: 1280, height: 900 } })
await pageDesktop.goto(`http://127.0.0.1:${port}/docs/${slug}`, { waitUntil: 'networkidle' })
const desktopPath = `/Users/buchin/.gemini/antigravity-cli/brain/7caad0f1-212c-4a22-960f-48ac044a12c4/screenshots/${outPrefix}-desktop.png`
await pageDesktop.screenshot({ path: desktopPath, fullPage: true })

// 2. Desktop 1280px Dark
await pageDesktop.evaluate(() => {
  document.documentElement.classList.add('dark')
  localStorage.setItem('cuan-theme', 'dark')
})
const desktopDarkPath = `/Users/buchin/.gemini/antigravity-cli/brain/7caad0f1-212c-4a22-960f-48ac044a12c4/screenshots/${outPrefix}-desktop-dark.png`
await pageDesktop.screenshot({ path: desktopDarkPath, fullPage: true })

// 3. Mobile 390px Light
const pageMobile = await browser.newPage({ viewport: { width: 390, height: 844 } })
await pageMobile.goto(`http://127.0.0.1:${port}/docs/${slug}`, { waitUntil: 'networkidle' })
const mobilePath = `/Users/buchin/.gemini/antigravity-cli/brain/7caad0f1-212c-4a22-960f-48ac044a12c4/screenshots/${outPrefix}-mobile.png`
await pageMobile.screenshot({ path: mobilePath, fullPage: true })

// 4. Mobile 390px Dark
await pageMobile.evaluate(() => {
  document.documentElement.classList.add('dark')
  localStorage.setItem('cuan-theme', 'dark')
})
const mobileDarkPath = `/Users/buchin/.gemini/antigravity-cli/brain/7caad0f1-212c-4a22-960f-48ac044a12c4/screenshots/${outPrefix}-mobile-dark.png`
await pageMobile.screenshot({ path: mobileDarkPath, fullPage: true })

await browser.close()
await new Promise(res => server.httpServer.close(res))

console.log(JSON.stringify({ desktopPath, desktopDarkPath, mobilePath, mobileDarkPath }))
