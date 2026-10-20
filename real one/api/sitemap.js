function siteOrigin(request) {
  const host = String(request.headers.host || 'localhost').split(',')[0].replace(/[^a-zA-Z0-9.:[\]-]/g, '')
  return `https://${host}`
}

export default function handler(request, response) {
  response.setHeader('Content-Type', 'application/xml; charset=utf-8')
  response.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600')
  const origin = siteOrigin(request)
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${origin}/</loc><changefreq>monthly</changefreq><priority>1.0</priority></url></urlset>`
  return response.status(200).send(xml)
}
