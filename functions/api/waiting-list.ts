interface Env {
  DOJO_WAITING_LIST_WEBHOOK_URL?: string
  DOJO_WAITING_LIST_WEBHOOK_SECRET?: string
}

interface SignupBody {
  email?: string
  source?: string
}

const PRODUCT_SLUG = 'cuan'
const DEFAULT_DOJO_URL = 'https://dojo.cc/api/waiting-list'
const DEFAULT_DOJO_SECRET = '5fc35ce11780ea12cc4563856a3d9506696bd443c913cb9d'

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
  const targetUrl = (context.env.DOJO_WAITING_LIST_WEBHOOK_URL || DEFAULT_DOJO_URL).trim()
  const secret = (context.env.DOJO_WAITING_LIST_WEBHOOK_SECRET || DEFAULT_DOJO_SECRET).trim()

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 8000)

  try {
    const dojoRes = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-dojo-secret': secret,
        'user-agent': 'Cuan-Landing/1.0',
      },
      signal: controller.signal,
      body: JSON.stringify({
        email,
        source,
        product: PRODUCT_SLUG,
      }),
    })

    if (!dojoRes.ok) {
      const errData = (await dojoRes.json().catch(() => ({}))) as { error?: string; message?: string }
      return json(
        { error: errData.error || errData.message || 'Gagal mendaftar waiting list. Coba lagi sebentar lagi.' },
        dojoRes.status
      )
    }

    const data = (await dojoRes.json().catch(() => ({}))) as { duplicate?: boolean }
    return json(
      {
        status: 'success',
        duplicate: Boolean(data.duplicate),
        message: 'Terima kasih telah bergabung di Waiting List Cuan.',
      },
      201
    )
  } catch (err) {
    console.error('Waiting list error:', err)
    return json({ error: 'Gagal mendaftar waiting list. Coba lagi sebentar lagi.' }, 502)
  } finally {
    clearTimeout(timeout)
  }
}
