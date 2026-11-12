import fs from 'fs'
import path from 'path'

console.log('--- Verifying Built Distribution in dist/ ---')

const distDir = path.resolve('dist')
if (!fs.existsSync(distDir)) {
  throw new Error('dist/ directory does not exist! Run npm run build first.')
}

const assetsDir = path.join(distDir, 'assets')
const files = fs.readdirSync(assetsDir)
const jsFile = files.find(f => f.endsWith('.js') && f.startsWith('index-'))

if (!jsFile) {
  throw new Error('Could not find bundled index-*.js in dist/assets/')
}

const jsContent = fs.readFileSync(path.join(assetsDir, jsFile), 'utf-8')

// 1. Section Ordering Check (Hero -> Ecosystem Strip -> Problem -> How-It-Works)
console.log('1. Checking Section Order in Bundle (Hero -> Ecosystem -> Problem -> How-It-Works)...')
const ecoIndex = jsContent.indexOf('id:"ecosystem-strip"')
const problemIndex = jsContent.indexOf('id:"problem"')
const howIndex = jsContent.indexOf('id:"how-it-works"')

console.log(`Ecosystem index: ${ecoIndex}, Problem index: ${problemIndex}, How-it-works index: ${howIndex}`)
if (problemIndex === -1 || ecoIndex === -1 || howIndex === -1) {
  throw new Error('Missing section IDs in bundle')
}
if (!(ecoIndex < problemIndex && problemIndex < howIndex)) {
  throw new Error(`Section ordering violated! Expected eco < problem < how, got ${ecoIndex}, ${problemIndex}, ${howIndex}`)
}
console.log('✓ Section ordering verified in bundle (Hero -> Ecosystem -> Problem -> How-It-Works)!')

// 2. Platforms Check
console.log('2. Checking Ecosystem Platforms...')
const requiredBrands = ['WordPress', 'Ghost', 'Reels', 'TikTok', 'YouTube', 'Pinterest', 'CodeCanyon', 'WooCommerce', 'Laravel', 'Telegram', 'Discord', 'Cloudflare']
for (const b of requiredBrands) {
  if (!jsContent.includes(b)) {
    throw new Error(`Missing expected brand/platform in bundle: ${b}`)
  }
}
console.log('✓ All expected brands present:', requiredBrands.join(', '))

// Verify WhatsApp and Substack are removed from ecosystem
if (jsContent.includes('WhatsAppIcon') || jsContent.includes('SubstackIcon')) {
  throw new Error('WhatsAppIcon or SubstackIcon still present in bundle!')
}
console.log('✓ WhatsApp and Substack confirmed removed from bundle.')

// 3. Task Completion Card & Authentic Cuan Components
console.log('3. Checking Authentic Cuan TaskCompletionCard & Composer...')
const requiredTaskTokens = [
  '#task_script_install',
  'Live Terminal',
  'Coba Lagi',
  'Script Marketplace Berhasil Terpasang & Aktif',
  'Ringkasan Hasil',
  '3/3 kriteria',
]
for (const token of requiredTaskTokens) {
  if (!jsContent.includes(token)) {
    throw new Error(`Missing required TaskCompletionCard token: ${token}`)
  }
}
console.log('✓ TaskCompletionCard tokens verified!')

// 4. Forbidden Jargon Check
console.log('4. Checking Absence of Internal Jargon in LandingPage...')
const landingSource = fs.readFileSync(path.resolve('src/features/landing/LandingPage.tsx'), 'utf-8')
const forbidden = [/\bpty\b/i, /\bdaemon\b/i, /\bzero-kill\b/i, /\bbyo\b/i]
for (const pattern of forbidden) {
  if (pattern.test(landingSource)) {
    throw new Error(`Forbidden jargon pattern found in LandingPage.tsx: ${pattern}`)
  }
}
console.log('✓ Zero forbidden jargon in LandingPage.tsx!')

console.log('\n========================================')
console.log('ALL BUNDLE VERIFICATION CHECKS PASSED!')
console.log('========================================\n')
