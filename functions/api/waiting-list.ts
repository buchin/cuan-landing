interface Env {
  DOJO_WAITING_LIST_WEBHOOK_URL?: string
  DOJO_WAITING_LIST_WEBHOOK_SECRET?: string
}

interface SignupBody {
  email?: string
  source?: string
}

// Dojo menyimpan lead per produk, jadi slug ini harus menunjuk produk waiting
// list rilis v1.0 - bukan tier sponsor berbayar.
const PRODUCT_SLUG = 'cuan'

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
  const webhook = (context.env.DOJO_WAITING_LIST_WEBHOOK_URL || '').trim()
  if (!webhook) {
    return json({ error: 'Waiting list is not configured yet.' }, 503)
  }

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
  const secret = (context.env.DOJO_WAITING_LIST_WEBHOOK_SECRET || '').trim()

  const headers: Record<string, string> = {
    'content-type': 'application/json',
    'user-agent': 'Cuan-WaitingList/1.0',
  }
  if (secret) {
    headers['x-dojo-secret'] = secret
    headers['authorization'] = `Bearer ${secret}`
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 8000)

  try {
    const upstream = await fetch(webhook, {
      method: 'POST',
      headers,
      signal: controller.signal,
      body: JSON.stringify({
        event: 'waiting_list.signup',
        email,
        source,
        product: PRODUCT_SLUG,
        timestamp: new Date().toISOString(),
        action: 'send_welcome_email',
        trigger_email: true,
      }),
    })

    if (upstream.status >= 400) {
      return json({ error: 'Gagal mendaftar waiting list. Coba lagi sebentar lagi.' }, 502)
    }

    return json({ status: 'success', message: 'Terima kasih telah bergabung di Waiting List Cuan.' }, 201)
  } catch {
    return json({ error: 'Gagal mendaftar waiting list. Coba lagi sebentar lagi.' }, 502)
  } finally {
    clearTimeout(timeout)
  }
}
