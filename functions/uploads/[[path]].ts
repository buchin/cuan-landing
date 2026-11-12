interface Env {
  CUAN_API_ORIGIN?: string
}

const DEFAULT_ORIGIN = 'https://app.cuan.work'

export const onRequest: PagesFunction<Env> = async (context) => {
  const origin = (context.env.CUAN_API_ORIGIN || DEFAULT_ORIGIN).replace(/\/$/, '')
  const incoming = new URL(context.request.url)
  const target = new URL(origin + incoming.pathname + incoming.search)

  const upstream = await fetch(target.toString(), {
    method: context.request.method,
    headers: { accept: context.request.headers.get('accept') || '*/*' },
    redirect: 'manual',
  })

  const responseHeaders = new Headers(upstream.headers)
  responseHeaders.delete('content-encoding')
  responseHeaders.delete('content-length')

  return new Response(upstream.body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers: responseHeaders,
  })
}
