import { NextResponse } from 'next/server'
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
  if (!message || message.trim().length < 5) return 'Message must be at least 5 characters.'
  return null
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

// Mail is sent per request, so there is nothing here to prerender or cache.
export const dynamic = 'force-dynamic'

export async function POST(request) {
  let payload
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request body.' }, { status: 400 })
  }

  const { name, email, subject, message } = payload ?? {}

  const validationError = validate({ name, email, message })
  if (validationError) {
    return NextResponse.json({ success: false, error: validationError }, { status: 400 })
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
            <tr><td style="padding:8px;font-weight:bold;color:#555;">Subject</td><td style="padding:8px;">${escapeHtml(subject?.trim() || '\u2014')}</td></tr>
          </table>
          <div style="margin-top:16px;padding:16px;background:#f9f5f5;border-radius:8px;white-space:pre-wrap;">${escapeHtml(message.trim())}</div>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Mail error:', err.message)
    return NextResponse.json(
      { success: false, error: 'Failed to send email. Please try again.' },
      { status: 500 }
    )
  }
}
