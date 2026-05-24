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

// Minimal HTML escape so visitor-supplied strings can't break the markup or
// inject content into the inbox notification.
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function buildHtml({
  name,
  email,
  message,
}: {
  name: string
  email: string
  message: string
}): string {
  const safeName = escapeHtml(name)
  const safeEmail = escapeHtml(email)
  // Preserve paragraph breaks from the message body without trusting raw HTML.
  const safeMessage = escapeHtml(message).replace(/\r?\n/g, '<br>')

  const now = new Date().toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Jerusalem',
  })

  // Inline-styled email so it survives Gmail / Outlook / iOS Mail. Mirrors the
  // Studio Bureau direction — paper background, ink type, signal vermillion
  // accent, mono metadata, Georgia as the Fraunces fallback.
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>New inquiry — ${safeName}</title>
</head>
<body style="margin:0;padding:0;background:#F4F1EA;color:#0B0B0C;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:#F4F1EA;">New project inquiry from ${safeName} — ${safeEmail}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#F4F1EA;">
    <tr>
      <td align="center" style="padding:48px 16px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background:#F4F1EA;">

          <!-- Masthead -->
          <tr>
            <td style="padding:0 8px 16px 8px;border-bottom:1px solid rgba(11,11,12,0.22);">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="font-family:ui-monospace,'JetBrains Mono','Courier New',monospace;font-size:11px;font-weight:500;letter-spacing:0.22em;text-transform:uppercase;color:#5A5A5C;">
                    / Studio · Bureau
                  </td>
                  <td align="right" style="font-family:ui-monospace,'JetBrains Mono','Courier New',monospace;font-size:11px;font-weight:500;letter-spacing:0.22em;text-transform:uppercase;color:#5A5A5C;">
                    ${escapeHtml(now)}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Headline -->
          <tr>
            <td style="padding:36px 8px 8px 8px;">
              <div style="font-family:ui-monospace,'JetBrains Mono','Courier New',monospace;font-size:11px;font-weight:500;letter-spacing:0.22em;text-transform:uppercase;color:#5A5A5C;">
                / 01 — New inquiry
              </div>
              <h1 style="margin:18px 0 0 0;font-family:Georgia,'Times New Roman',Times,serif;font-size:44px;font-weight:600;line-height:1.02;letter-spacing:-0.022em;color:#0B0B0C;">
                Project inquiry<span style="color:#FF4D1A;">.</span>
              </h1>
              <p style="margin:18px 0 0 0;font-size:16px;line-height:1.55;color:#5A5A5C;">
                ${safeName} reached out through the contact form on ofek-karavani.vercel.app. Reply directly to this email to respond.
              </p>
            </td>
          </tr>

          <!-- Meta table -->
          <tr>
            <td style="padding:32px 8px 0 8px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid rgba(11,11,12,0.3);">
                <tr>
                  <td style="padding:14px 0;border-bottom:1px solid rgba(11,11,12,0.1);font-family:ui-monospace,'JetBrains Mono','Courier New',monospace;font-size:11px;font-weight:500;letter-spacing:0.2em;text-transform:uppercase;color:#5A5A5C;vertical-align:top;width:128px;">
                    / Name
                  </td>
                  <td style="padding:14px 0;border-bottom:1px solid rgba(11,11,12,0.1);font-size:15px;font-weight:500;color:#0B0B0C;vertical-align:top;">
                    ${safeName}
                  </td>
                </tr>
                <tr>
                  <td style="padding:14px 0;border-bottom:1px solid rgba(11,11,12,0.3);font-family:ui-monospace,'JetBrains Mono','Courier New',monospace;font-size:11px;font-weight:500;letter-spacing:0.2em;text-transform:uppercase;color:#5A5A5C;vertical-align:top;">
                    / Email
                  </td>
                  <td style="padding:14px 0;border-bottom:1px solid rgba(11,11,12,0.3);font-size:15px;font-weight:500;vertical-align:top;">
                    <a href="mailto:${safeEmail}" style="color:#0B0B0C;text-decoration:underline;text-underline-offset:3px;">${safeEmail}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Message body -->
          <tr>
            <td style="padding:36px 8px 0 8px;">
              <div style="font-family:ui-monospace,'JetBrains Mono','Courier New',monospace;font-size:11px;font-weight:500;letter-spacing:0.2em;text-transform:uppercase;color:#5A5A5C;margin-bottom:18px;">
                / Message
              </div>
              <div style="font-family:Georgia,'Times New Roman',Times,serif;font-size:18px;line-height:1.55;color:#0B0B0C;">
                ${safeMessage}
              </div>
            </td>
          </tr>

          <!-- Quick action -->
          <tr>
            <td style="padding:36px 8px 0 8px;">
              <a href="mailto:${safeEmail}?subject=Re%3A%20your%20project%20inquiry" style="display:inline-block;background:#0B0B0C;color:#F4F1EA;font-family:ui-monospace,'JetBrains Mono','Courier New',monospace;font-size:12px;font-weight:500;letter-spacing:0.18em;text-transform:uppercase;text-decoration:none;padding:14px 22px;border:1px solid #0B0B0C;">
                Reply to ${safeName} &rarr;
              </a>
            </td>
          </tr>

          <!-- Footer rule -->
          <tr>
            <td style="padding:48px 8px 0 8px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid rgba(11,11,12,0.22);">
                <tr>
                  <td style="padding-top:18px;font-family:ui-monospace,'JetBrains Mono','Courier New',monospace;font-size:10px;font-weight:500;letter-spacing:0.22em;text-transform:uppercase;color:#5A5A5C;">
                    Sent via ofek-karavani.vercel.app
                  </td>
                  <td align="right" style="padding-top:18px;font-family:ui-monospace,'JetBrains Mono','Courier New',monospace;font-size:10px;font-weight:500;letter-spacing:0.22em;text-transform:uppercase;color:#FF4D1A;">
                    &#9642; Contact form
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

function buildText({
  name,
  email,
  message,
}: {
  name: string
  email: string
  message: string
}): string {
  return [
    'NEW PROJECT INQUIRY',
    '===================',
    '',
    `Name:     ${name}`,
    `Email:    ${email}`,
    '',
    'Message:',
    '--------',
    message,
    '',
    '---',
    'Sent via ofek-karavani.vercel.app',
    'Reply directly to this email to respond.',
  ].join('\n')
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
        from: 'Studio · Bureau <onboarding@resend.dev>',
        to: [toEmail],
        subject: `Inquiry from ${name} — ofek-karavani.vercel.app`,
        html: buildHtml({ name, email, message }),
        text: buildText({ name, email, message }),
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
