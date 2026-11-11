// Network-only: never persist account pages, chats, attachments, tokens or APIs.
self.addEventListener('install', () => self.skipWaiting())
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()))
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url)
  if (url.origin !== self.location.origin || event.request.mode !== 'navigate' || url.pathname.startsWith('/api/')) return
  event.respondWith(fetch(event.request, {cache: 'no-store'}).catch(() => new Response('<!doctype html><html lang="en"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Cuan — Offline</title><body style="font:16px system-ui;background:#191919;color:white;padding:32px;max-width:40em;margin:auto"><h1>You’re offline</h1><p>Connect to the internet to open Cuan. Your saved conversations stay on the server.</p><p><a style="color:#5ba0ff" href="/chat">Try again</a></p></body></html>', { status:503, headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store'} })))
})
self.addEventListener('push', event => {
  let data = {}
  try {
    data = event.data?.json() || {}
  } catch {
    const text = event.data?.text()
    if (text) data = { body: text }
  }

  const title = (typeof data.title === 'string' && data.title.trim()) ? data.title.trim() : 'Cuan'
  const body = (typeof data.body === 'string' && data.body.trim()) ? data.body.trim() : ''
  const icon = (typeof data.icon === 'string' && data.icon.trim()) ? data.icon.trim() : '/icons/cuan-192.png'
  const badge = (typeof data.badge === 'string' && data.badge.trim()) ? data.badge.trim() : '/icons/cuan-192.png'
  const tag = (typeof data.tag === 'string' && data.tag.trim()) ? data.tag.trim() : 'cuan-update'

  let href = '/inbox'
  try {
    if (data.href) {
      const url = new URL(data.href, self.location.origin)
      if (url.origin === self.location.origin && /^\/(inbox|projects|tasks|notifications)(\/|$)/.test(url.pathname)) {
        href = url.pathname + url.search
      }
    }
  } catch {}

  event.waitUntil(
    self.registration.showNotification(title, {
      body,
      icon,
      badge,
      tag,
      data: { href }
    })
  )
})
self.addEventListener('notificationclick', event => {
  event.notification.close()
  let targetHref = '/inbox'
  try {
    const rawHref = event.notification.data?.href
    if (rawHref) {
      const url = new URL(rawHref, self.location.origin)
      if (url.origin === self.location.origin && /^\/(inbox|projects|tasks|notifications)(\/|$)/.test(url.pathname)) {
        targetHref = url.pathname + url.search
      }
    }
  } catch {}

  const fullUrl = new URL(targetHref, self.location.origin).href
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(async windows => {
      for (const client of windows) {
        if (new URL(client.url).origin === self.location.origin) {
          if ('navigate' in client) {
            await client.navigate(fullUrl)
          }
          if ('focus' in client) {
            return client.focus()
          }
        }
      }
      if (self.clients.openWindow) {
        return self.clients.openWindow(fullUrl)
      }
    })
  )
})
