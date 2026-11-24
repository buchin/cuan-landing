# Cuan Landing Repository Guidance

Landing page and product site for Cuan (https://cuan.work).

## Architecture & Tech Stack
- **Framework:** React 18 + Vite + TypeScript
- **Styling:** Tailwind CSS + Lucide Icons
- **Production Hosting:** Cloudflare Pages (Project: `cuan-landing`, subdomain: `cuan-landing-cc9.pages.dev`, custom domains: `cuan.work`, `cuan.dojo.cc`)
- **Deployment:** Deployed via Cloudflare Pages + Wrangler (`npx wrangler pages deploy dist --project-name cuan-landing`).
  *Note:* Do not use or re-introduce GitHub Pages workflows.

## Mandatory Definition of Done (DoD)
1. **Zero Visual Noise & Calm Typography:** Follow Bear Notes & Things 3 design principles. Clean typography, neutral backgrounds, no distracting neon badges or nested box borders.
2. **Mobile & Desktop Responsiveness:** All UI components must render cleanly on mobile viewports (375px, 390px) and desktop without horizontal scroll or layout shift.
3. **Build Integrity:** `npm run build` must pass cleanly without TypeScript or lint errors.
4. **Interactive Feedback:** Any copy/action button must provide clear, immediate visual confirmation (e.g., "Tersalin!").
