interface Env {
  CUAN_API_ORIGIN?: string
  SPONSOR_BASELINE?: string
  SPONSOR_TARGET?: string
}

const DEFAULT_ORIGIN = 'https://app.cuan.work'
const DEFAULT_BASELINE = 29
const DEFAULT_TARGET = 100

export const onRequest: PagesFunction<Env> = async (context) => {
  const origin = (context.env.CUAN_API_ORIGIN || DEFAULT_ORIGIN).replace(/\/$/, '')
  const incoming = new URL(context.request.url)
  const target = new URL(origin + incoming.pathname + incoming.search)

  const headers = new Headers(context.request.headers)
  headers.delete('host')

  const init: RequestInit = {
    method: context.request.method,
    headers,
    redirect: 'manual',
  }

  if (context.request.method !== 'GET' && context.request.method !== 'HEAD') {
    init.body = await context.request.arrayBuffer()
  }

  const upstream = await fetch(target.toString(), init)

  // Server-side baseline augmentation for GET /api/sponsors/current
  if (
    context.request.method === 'GET' &&
    incoming.pathname.endsWith('/api/sponsors/current') &&
    upstream.ok
  ) {
    try {
      const data = (await upstream.json()) as any
      const baseline = parseInt(context.env.SPONSOR_BASELINE || String(DEFAULT_BASELINE), 10) || DEFAULT_BASELINE
      const targetCount = parseInt(context.env.SPONSOR_TARGET || String(DEFAULT_TARGET), 10) || DEFAULT_TARGET
      const realTotal = typeof data?.total === 'number' ? data.total : (Array.isArray(data?.sponsors) ? data.sponsors.length : 0)
      const combinedTotal = baseline + realTotal

      const augmented = {
        ...data,
        sponsors: data?.sponsors || [],
        total: combinedTotal,
        target: targetCount,
      }

      const responseHeaders = new Headers(upstream.headers)
      responseHeaders.set('content-type', 'application/json; charset=utf-8')
      responseHeaders.delete('content-encoding')
      responseHeaders.delete('content-length')

      return new Response(JSON.stringify(augmented), {
        status: upstream.status,
        headers: responseHeaders,
      })
    } catch {
      // Fallback to upstream response if JSON parsing fails
    }
  }

  const responseHeaders = new Headers(upstream.headers)
  responseHeaders.delete('content-encoding')
  responseHeaders.delete('content-length')

  return new Response(upstream.body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers: responseHeaders,
  })
}
