const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const text = (value, max) => typeof value === 'string' ? value.trim().slice(0, max) : ''

export default async function handler(request, response) {
  response.setHeader('Cache-Control', 'no-store')
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST')
    return response.status(405).json({ error: 'Method not allowed.' })
  }

  const { name, email, business, service, message, website } = request.body ?? {}
  if (website) return response.status(400).json({ error: 'This message could not be accepted.' })
  const clean = { name: text(name, 80), email: text(email, 254), business: text(business, 100), service: text(service, 60), message: text(message, 3000) }
  if (clean.name.length < 2 || !emailPattern.test(clean.email) || clean.message.length < 10) {
    return response.status(400).json({ error: 'Please enter a valid name, email address, and a message of at least 10 characters.' })
  }
  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_EMAIL) {
    return response.status(503).json({ error: 'Our message service is not configured yet. Please email hamitagencies@gmail.com or use WhatsApp instead.' })
  }

  try {
    const result = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.RESEND_FROM || 'HAMIT AGENCIES <onboarding@resend.dev>',
        to: [process.env.CONTACT_EMAIL],
        reply_to: clean.email,
        subject: `Website enquiry${clean.service ? ` — ${clean.service}` : ''} from ${clean.name}`,
        text: `New message from the HAMIT AGENCIES website\n\nName: ${clean.name}\nEmail: ${clean.email}\nBusiness: ${clean.business || 'Not provided'}\nInterested in: ${clean.service || 'Not specified'}\n\nMessage:\n${clean.message}`,
      }),
    })
    if (!result.ok) {
      console.error('Resend message delivery failed:', result.status, await result.text())
      return response.status(502).json({ error: 'We could not deliver your message just now. Please try again or email us directly.' })
    }
    return response.status(200).json({ ok: true })
  } catch (error) {
    console.error('Contact service error:', error)
    return response.status(502).json({ error: 'We could not deliver your message just now. Please try again or email us directly.' })
  }
}
