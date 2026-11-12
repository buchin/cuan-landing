interface Env {
  CUAN_API_ORIGIN?: string
}

const DEFAULT_ORIGIN = 'https://app.cuan.work'

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

  const responseHeaders = new Headers(upstream.headers)
  responseHeaders.delete('content-encoding')
  responseHeaders.delete('content-length')

  return new Response(upstream.body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers: responseHeaders,
  })
}
