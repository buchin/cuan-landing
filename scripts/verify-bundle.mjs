import fs from 'fs'
import path from 'path'

console.log('--- Verifying Built Distribution in dist/ ---')

const distDir = path.resolve('dist')
if (!fs.existsSync(distDir)) {
  throw new Error('dist/ directory does not exist! Run npm run build first.')
}

const assetsDir = path.join(distDir, 'assets')
const files = fs.readdirSync(assetsDir)
const jsFiles = files.filter(f => f.endsWith('.js'))
const landingJsFile = files.find(f => f.startsWith('LandingPage-') && f.endsWith('.js'))

if (!landingJsFile) {
  throw new Error('Could not find LandingPage-*.js chunk in dist/assets/')
}

const landingJsContent = fs.readFileSync(path.join(assetsDir, landingJsFile), 'utf-8')
const allJsContent = jsFiles.map(f => fs.readFileSync(path.join(assetsDir, f), 'utf-8')).join('\n')

// 1. Section Ordering Check (Hero -> Ecosystem Strip -> Problem -> How-It-Works)
console.log('1. Checking Section Order in LandingPage Chunk (Hero -> Ecosystem -> Problem -> How-It-Works)...')
const ecoIndex = landingJsContent.indexOf('id:"ecosystem-strip"')
const problemIndex = landingJsContent.indexOf('id:"problem"')
const howIndex = landingJsContent.indexOf('id:"how-it-works"')

console.log(`Ecosystem index: ${ecoIndex}, Problem index: ${problemIndex}, How-it-works index: ${howIndex}`)
if (problemIndex === -1 || ecoIndex === -1 || howIndex === -1) {
  throw new Error('Missing section IDs in LandingPage bundle chunk')
}
if (!(ecoIndex < problemIndex && problemIndex < howIndex)) {
  throw new Error(`Section ordering violated! Expected eco < problem < how, got ${ecoIndex}, ${problemIndex}, ${howIndex}`)
}
console.log('✓ Section ordering verified in bundle (Hero -> Ecosystem -> Problem -> How-It-Works)!')

// 2. Platforms Check
console.log('2. Checking Ecosystem Platforms...')
const requiredBrands = ['WordPress', 'Ghost', 'Reels', 'TikTok', 'YouTube', 'Pinterest', 'CodeCanyon', 'WooCommerce', 'Laravel', 'Telegram', 'Discord', 'Cloudflare']
for (const b of requiredBrands) {
  if (!allJsContent.includes(b)) {
    throw new Error(`Missing expected brand/platform in bundle: ${b}`)
  }
}
console.log('✓ All expected brands present:', requiredBrands.join(', '))

// Verify WhatsApp and Substack are removed from ecosystem
if (allJsContent.includes('WhatsAppIcon') || allJsContent.includes('SubstackIcon')) {
  throw new Error('WhatsAppIcon or SubstackIcon still present in bundle!')
}
console.log('✓ WhatsApp and Substack confirmed removed from bundle.')

// 3. Task Completion Card & Killer USP (Whisper & Visitor Reply Draft)
console.log('3. Checking Authentic Cuan TaskCompletionCard & Killer USP (Whisper & Visitor Reply Draft)...')
const requiredTaskTokens = [
  '#task_download_fix',
  'Live Terminal',
  'Coba Lagi',
  'Izin Akses Berkas & Link Unduhan Berhasil Aktif',
  'Ringkasan Hasil',
  'Draf Balasan Pelanggan',
  'Gunakan Draf',
]
for (const token of requiredTaskTokens) {
  if (!allJsContent.includes(token)) {
    throw new Error(`Missing required TaskCompletionCard / Killer USP token: ${token}`)
  }
}
console.log('✓ TaskCompletionCard & Killer USP draft tokens verified!')

// 4. Forbidden Jargon Check
console.log('4. Checking Absence of Internal Jargon in Source Code...')
const landingDir = path.resolve('src/features/landing')
const checkDir = (dir) => {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      checkDir(full)
    } else if (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts')) {
      const src = fs.readFileSync(full, 'utf-8')
      const forbidden = [/\bpty\b/i, /\bdaemon\b/i, /\bzero-kill\b/i, /\bbyo\b/i]
      for (const pattern of forbidden) {
        if (pattern.test(src)) {
          throw new Error(`Forbidden jargon pattern ${pattern} found in ${full}`)
        }
      }
    }
  }
}
checkDir(landingDir)
console.log('✓ Zero forbidden jargon across all landing components!')

console.log('\n========================================')
console.log('ALL BUNDLE VERIFICATION CHECKS PASSED!')
console.log('========================================\n')
