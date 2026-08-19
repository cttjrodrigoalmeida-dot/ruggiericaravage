export function onRequest() {
  return new Response('404 - Página não encontrada', {
    status: 404,
    headers: {
      'Content-Type': 'text/plain; charset=UTF-8',
      'Cache-Control': 'no-store, no-cache, must-revalidate',
      'X-Robots-Tag': 'noindex, nofollow, noarchive',
    },
  })
}
