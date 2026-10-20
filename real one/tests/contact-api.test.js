import test from 'node:test'
import assert from 'node:assert/strict'
import handler from '../api/contact.js'

const original = { apiKey: process.env.RESEND_API_KEY, inbox: process.env.CONTACT_EMAIL, sender: process.env.RESEND_FROM, fetch: globalThis.fetch }
function invoke(method, body) {
  const state = { statusCode: 200, headers: {}, payload: null }
  const response = {
    setHeader(name, value) { state.headers[name] = value },
    status(code) { state.statusCode = code; return this },
    json(payload) { state.payload = payload; return this },
  }
  return Promise.resolve(handler({ method, body }, response)).then(() => state)
}
function configure(enabled) {
  if (enabled) {
    process.env.RESEND_API_KEY = 'test-api-key'
    process.env.CONTACT_EMAIL = 'hamitagencies@gmail.com'
  } else {
    delete process.env.RESEND_API_KEY
    delete process.env.CONTACT_EMAIL
  }
}
const valid = { name: 'Test Person', email: 'person@example.com', service: 'Local SEO', message: 'I would like to learn more about your services.' }

test('rejects methods other than POST', async () => {
  const result = await invoke('GET')
  assert.equal(result.statusCode, 405)
  assert.equal(result.headers.Allow, 'POST')
})

test('validates required name, email, and message', async () => {
  const result = await invoke('POST', { ...valid, email: 'not-an-email' })
  assert.equal(result.statusCode, 400)
})

test('never claims delivery if provider credentials are not configured', async () => {
  configure(false)
  const result = await invoke('POST', valid)
  assert.equal(result.statusCode, 503)
  assert.match(result.payload.error, /not configured/)
})

test('reports success only after the email provider accepts the message', async () => {
  configure(true)
  let sentRequest
  globalThis.fetch = async (url, options) => {
    sentRequest = { url, options }
    return { ok: true, status: 200 }
  }
  const result = await invoke('POST', valid)
  assert.equal(result.statusCode, 200)
  assert.equal(result.payload.ok, true)
  assert.equal(sentRequest.url, 'https://api.resend.com/emails')
  const body = JSON.parse(sentRequest.options.body)
  assert.equal(body.to[0], 'hamitagencies@gmail.com')
  assert.equal(body.reply_to, valid.email)
})

test('reports a delivery error when the provider rejects a message', async () => {
  configure(true)
  globalThis.fetch = async () => ({ ok: false, status: 401, text: async () => 'Unauthorized' })
  const result = await invoke('POST', valid)
  assert.equal(result.statusCode, 502)
  assert.match(result.payload.error, /could not deliver/)
})

test('rejects honeypot submissions without reporting a false success', async () => {
  configure(true)
  const result = await invoke('POST', { ...valid, website: 'spam' })
  assert.equal(result.statusCode, 400)
  assert.notEqual(result.statusCode, 200)
})

test.after(() => {
  if (original.apiKey === undefined) delete process.env.RESEND_API_KEY
  else process.env.RESEND_API_KEY = original.apiKey
  if (original.inbox === undefined) delete process.env.CONTACT_EMAIL
  else process.env.CONTACT_EMAIL = original.inbox
  if (original.sender === undefined) delete process.env.RESEND_FROM
  else process.env.RESEND_FROM = original.sender
  globalThis.fetch = original.fetch
})
