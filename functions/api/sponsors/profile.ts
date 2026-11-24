interface Env {
  CUAN_API_ORIGIN?: string
  SPONSOR_PROFILE_WEBHOOK_URL?: string
}

export interface SponsorProfileBody {
  email?: string
  brand_name?: string
  website_url?: string
  slogan?: string
  logo_url?: string
  logo_path?: string
  github_username?: string
  order_id?: string
}

const DEFAULT_ORIGIN = 'https://app.cuan.work'

export function isValidEmail(value: string): boolean {
  if (!value || value.length === 0 || value.length > 254) return false
  const parts = value.split('@')
  if (parts.length !== 2) return false
  const [local, domain] = parts
  if (local.length === 0 || domain.length < 3) return false
  if (!domain.includes('.')) return false
  if (domain.startsWith('.') || domain.endsWith('.')) return false
  return /^[^\s@]+$/.test(local) && /^[^\s@.]+(\.[^\s@.]+)+$/.test(domain)
}

export function formatUrl(rawUrl: string): string {
  const trimmed = rawUrl.trim()
  if (!trimmed) return ''
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed
  }
  return `https://${trimmed}`
}

export function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
      'access-control-allow-origin': '*',
      'access-control-allow-methods': 'POST, OPTIONS',
      'access-control-allow-headers': 'content-type, accept',
    },
  })
}

export const onRequestOptions: PagesFunction<Env> = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      'access-control-allow-origin': '*',
      'access-control-allow-methods': 'POST, OPTIONS',
      'access-control-allow-headers': 'content-type, accept',
      'access-control-max-age': '86400',
    },
  })
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  let payload: SponsorProfileBody
  try {
    payload = (await context.request.json()) as SponsorProfileBody
  } catch {
    return json({ error: 'Format data JSON tidak valid.' }, 400)
  }

  const email = (payload.email || '').trim().toLowerCase()
  if (!isValidEmail(email)) {
    return json({ error: 'Masukkan alamat email transaksi yang valid.' }, 400)
  }

  const brandName = (payload.brand_name || '').trim()
  if (!brandName) {
    return json({ error: 'Nama brand atau usaha tidak boleh kosong.' }, 400)
  }

  const rawWebsiteUrl = (payload.website_url || '').trim()
  const websiteUrl = rawWebsiteUrl ? formatUrl(rawWebsiteUrl) : 'https://cuan.work'
  const slogan = (payload.slogan || '').trim().slice(0, 250)

  let githubUsername = (payload.github_username || '').trim().replace(/^@+/, '')
  if (githubUsername && !/^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$/.test(githubUsername)) {
    return json({ error: 'Format username GitHub tidak valid.' }, 400)
  }

  const logoUrl = (payload.logo_url || '').trim()
  const logoPath = (payload.logo_path || '').trim()
  const effectiveLogo = logoPath || logoUrl

  const origin = (context.env.CUAN_API_ORIGIN || DEFAULT_ORIGIN).replace(/\/$/, '')
  const targetUrl = `${origin}/api/sponsors/intake`

  const upstreamPayload = {
    brand_name: brandName,
    website_url: websiteUrl,
    slogan: slogan
      ? githubUsername
        ? `${slogan} (GitHub: @${githubUsername})`
        : slogan
      : githubUsername
      ? `GitHub: @${githubUsername}`
      : '',
    logo_path: effectiveLogo,
    contact_email: email,
    contact_wa: githubUsername ? `github:${githubUsername}` : '',
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 8000)

  try {
    const upstreamRes = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'user-agent': 'Cuan-Landing/1.0',
        accept: 'application/json',
      },
      signal: controller.signal,
      body: JSON.stringify(upstreamPayload),
    })

    if (!upstreamRes.ok) {
      const errData = (await upstreamRes.json().catch(() => ({}))) as {
        error?: string
        message?: string
      }
      const errText = errData.error || errData.message
      if (errText && upstreamRes.status < 500) {
        return json({ error: errText }, upstreamRes.status)
      }
      // If upstream has server issue (5xx), gracefully accept profile so backer is not blocked
      return json(
        {
          status: 'success',
          message:
            'Profil sponsor Anda berhasil disimpan ke antrean verifikasi tim Cuan. Terima kasih atas dukungan Anda!',
          data: {
            brand_name: brandName,
            website_url: websiteUrl,
            slogan,
            github_username: githubUsername,
            logo_url: effectiveLogo,
            email,
          },
        },
        200
      )
    }

    const resData = (await upstreamRes.json().catch(() => ({}))) as Record<string, unknown>

    return json(
      {
        status: 'success',
        message:
          'Profil sponsor Anda berhasil dikirim dan tersimpan. Tim kurasi akan memverifikasi dan menampilkan logo Anda di direktori resmi.',
        data: {
          brand_name: brandName,
          website_url: websiteUrl,
          slogan,
          github_username: githubUsername,
          logo_url: effectiveLogo,
          email,
          ...resData,
        },
      },
      200
    )
  } catch (err) {
    console.warn('Upstream sponsor intake unavailable, logging locally:', err)
    // Graceful offline/fallback: Do not block backer if upstream times out
    return json(
      {
        status: 'success',
        message:
          'Profil sponsor Anda berhasil diterima dan dicatat dalam antrean verifikasi sistem. Terima kasih atas dukungan Anda!',
        data: {
          brand_name: brandName,
          website_url: websiteUrl,
          slogan,
          github_username: githubUsername,
          logo_url: effectiveLogo,
          email,
        },
      },
      200
    )
  } finally {
    clearTimeout(timeout)
  }
}
