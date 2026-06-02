import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

function validate({ name, email, message }) {
  if (!name || name.trim().length < 2) return 'Name must be at least 2 characters.'
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Invalid email address.'
  if (!message || message.trim().length < 20) return 'Message must be at least 20 characters.'
  return null
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { name, email, subject, message } = req.body

  const validationError = validate({ name, email, message })
  if (validationError) {
    return res.status(400).json({ success: false, error: validationError })
  }

  try {
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_TO || process.env.SMTP_USER,
      replyTo: email.trim(),
      subject: subject?.trim() || 'New message from portfolio',
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
          <h2 style="color:#b28784;">New message from your portfolio</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px;font-weight:bold;color:#555;">Name</td><td style="padding:8px;">${escapeHtml(name.trim())}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;color:#555;">Email</td><td style="padding:8px;"><a href="mailto:${escapeHtml(email.trim())}">${escapeHtml(email.trim())}</a></td></tr>
            <tr><td style="padding:8px;font-weight:bold;color:#555;">Subject</td><td style="padding:8px;">${escapeHtml(subject?.trim() || '—')}</td></tr>
          </table>
          <div style="margin-top:16px;padding:16px;background:#f9f5f5;border-radius:8px;white-space:pre-wrap;">${escapeHtml(message.trim())}</div>
        </div>
      `,
    })

    res.json({ success: true })
  } catch (err) {
    console.error('Mail error:', err.message)
    res.status(500).json({ success: false, error: 'Failed to send email. Please try again.' })
  }
}
