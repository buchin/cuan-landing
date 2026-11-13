interface Env {
  DOJO_WAITING_LIST_WEBHOOK_URL?: string
  DOJO_WAITING_LIST_WEBHOOK_SECRET?: string
  CUAN_API_ORIGIN?: string
}

interface SignupBody {
  email?: string
  source?: string
}

// Dojo menyimpan lead per produk, jadi slug ini harus menunjuk produk waiting
// list rilis v1.0 - bukan tier sponsor berbayar.
const PRODUCT_SLUG = 'cuan'
const DEFAULT_ORIGIN = 'https://app.cuan.work'

function isValidEmail(value: string): boolean {
  if (value.length === 0 || value.length > 254) return false
  const parts = value.split('@')
  if (parts.length !== 2) return false
  const [local, domain] = parts
  if (local.length === 0 || domain.length < 3) return false
  if (!domain.includes('.')) return false
  if (domain.startsWith('.') || domain.endsWith('.')) return false
  return /^[^\s@]+$/.test(local) && /^[^\s@.]+(\.[^\s@.]+)+$/.test(domain)
}

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  })
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  let payload: SignupBody
  try {
    payload = (await context.request.json()) as SignupBody
  } catch {
    return json({ error: 'Invalid JSON body.' }, 400)
  }

  const email = (payload.email || '').trim().toLowerCase()
  if (!isValidEmail(email)) {
    return json({ error: 'Masukkan alamat email yang valid.' }, 400)
  }

  const source = (payload.source || 'landing_page').trim().slice(0, 80)
  const webhook = (context.env.DOJO_WAITING_LIST_WEBHOOK_URL || '').trim()
  const secret = (context.env.DOJO_WAITING_LIST_WEBHOOK_SECRET || '').trim()
  const origin = (context.env.CUAN_API_ORIGIN || DEFAULT_ORIGIN).replace(/\/$/, '')
  const primaryBackendUrl = `${origin}/api/waiting-list`

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 8000)

  try {
    const signupData = {
      event: 'waiting_list.signup',
      email,
      source,
      product: PRODUCT_SLUG,
      timestamp: new Date().toISOString(),
      action: 'send_welcome_email',
      trigger_email: true,
    }

    // 1. Always submit to primary Cuan backend database (app.cuan.work/api/waiting-list)
    const backendRes = await fetch(primaryBackendUrl, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'user-agent': 'Cuan-WaitingList/1.0',
      },
      signal: controller.signal,
      body: JSON.stringify(signupData),
    })

    // 2. Also forward to external Dojo webhook if explicitly configured
    if (webhook && webhook !== primaryBackendUrl) {
      const webhookHeaders: Record<string, string> = {
        'content-type': 'application/json',
        'user-agent': 'Cuan-WaitingList/1.0',
      }
      if (secret) {
        webhookHeaders['x-dojo-secret'] = secret
        webhookHeaders['authorization'] = `Bearer ${secret}`
      }
      void fetch(webhook, {
        method: 'POST',
        headers: webhookHeaders,
        body: JSON.stringify(signupData),
      }).catch((err) => console.error('Dojo webhook forward error:', err))
    }

    if (!backendRes.ok) {
      const errData = (await backendRes.json().catch(() => ({}))) as { error?: string; message?: string }
      return json({ error: errData.error || errData.message || 'Gagal mendaftar waiting list. Coba lagi sebentar lagi.' }, backendRes.status)
    }

    return json({ status: 'success', message: 'Terima kasih telah bergabung di Waiting List Cuan.' }, 201)
  } catch (err) {
    console.error('Waiting list error:', err)
    return json({ error: 'Gagal mendaftar waiting list. Coba lagi sebentar lagi.' }, 502)
  } finally {
    clearTimeout(timeout)
  }
}
