// Vercel serverless function — contact form handler
// Install @vercel/node for production types: npm i -D @vercel/node
// Set env vars: RESEND_API_KEY, CONTACT_TO_EMAIL

interface ContactBody {
  name: string
  email: string
  message: string
}

interface ApiRequest {
  method: string
  body: ContactBody
}

interface ApiResponse {
  status: (code: number) => ApiResponse
  json: (data: Record<string, unknown>) => void
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, message } = req.body

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email' })
  }

  try {
    const apiKey = process.env.RESEND_API_KEY
    const toEmail = process.env.CONTACT_TO_EMAIL ?? 'ofek.karavani1@gmail.com'

    if (!apiKey) {
      // Dev fallback: log and succeed without sending
      console.info('[contact] No RESEND_API_KEY — skipping email send', { name, email })
      return res.status(200).json({ success: true })
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: [toEmail],
        subject: `Portfolio contact from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
        reply_to: email,
      }),
    })

    if (!response.ok) {
      throw new Error(`Resend error: ${response.status}`)
    }

    return res.status(200).json({ success: true })
  } catch (err) {
    console.error('[contact] Send error', err)
    return res.status(500).json({ error: 'Failed to send' })
  }
}
