function siteOrigin(request) {
  const host = String(request.headers.host || 'localhost').split(',')[0].replace(/[^a-zA-Z0-9.:[\]-]/g, '')
  return `https://${host}`
}

export default function handler(request, response) {
  response.setHeader('Content-Type', 'text/plain; charset=utf-8')
  response.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600')
  return response.status(200).send(`User-agent: *\nAllow: /\nSitemap: ${siteOrigin(request)}/sitemap.xml\n`)
}
