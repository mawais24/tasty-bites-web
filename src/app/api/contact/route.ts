import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const RECIPIENT = "mr.mawais24@gmail.com";
const MIN_FILL_MS = 4000; // submissions faster than 4s are treated as bots

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { name, email, phone, message, _hp, _t } = body as {
    name: string;
    email: string;
    phone?: string;
    message: string;
    _hp?: string;   // honeypot — must be empty
    _t?: number;    // form load timestamp — used for timing check
  };

  // Honeypot: any value means a bot filled it
  if (_hp) {
    // Return 200 silently so bots don't know they were rejected
    return NextResponse.json({ ok: true });
  }

  // Timing check: real humans take more than MIN_FILL_MS to read + fill a form
  if (typeof _t === "number" && Date.now() - _t < MIN_FILL_MS) {
    return NextResponse.json({ error: "Submission rejected." }, { status: 400 });
  }

  // Basic field validation
  if (
    typeof name !== "string" || name.trim().length < 2 ||
    typeof email !== "string" || !email.includes("@") ||
    typeof message !== "string" || message.trim().length < 5
  ) {
    return NextResponse.json({ error: "Please fill in all required fields." }, { status: 400 });
  }

  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    console.error("Missing GMAIL_USER or GMAIL_APP_PASSWORD env vars.");
    return NextResponse.json({ error: "Server configuration error." }, { status: 500 });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  const html = `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#faf7f0;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#faf7f0;padding:40px 0;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-top:4px solid #c9943a;">
        <tr>
          <td style="padding:36px 40px 0;">
            <p style="margin:0 0 4px;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#c9943a;">
              Tasty Bites Restaurant & Bistro
            </p>
            <h1 style="margin:0;font-size:24px;color:#1a1208;">New Contact Form Submission</h1>
            <hr style="border:none;border-top:1px solid #ede8de;margin:24px 0;" />
          </td>
        </tr>
        <tr>
          <td style="padding:0 40px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #ede8de;">
                  <p style="margin:0;font-size:11px;color:#9e8a78;letter-spacing:1px;text-transform:uppercase;">Name</p>
                  <p style="margin:4px 0 0;font-size:16px;color:#1a1208;">${escapeHtml(name.trim())}</p>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #ede8de;">
                  <p style="margin:0;font-size:11px;color:#9e8a78;letter-spacing:1px;text-transform:uppercase;">Email</p>
                  <p style="margin:4px 0 0;font-size:16px;color:#1a1208;">
                    <a href="mailto:${escapeHtml(email.trim())}" style="color:#c9943a;">${escapeHtml(email.trim())}</a>
                  </p>
                </td>
              </tr>
              ${phone ? `
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #ede8de;">
                  <p style="margin:0;font-size:11px;color:#9e8a78;letter-spacing:1px;text-transform:uppercase;">Phone</p>
                  <p style="margin:4px 0 0;font-size:16px;color:#1a1208;">
                    <a href="tel:${escapeHtml(String(phone).trim())}" style="color:#c9943a;">${escapeHtml(String(phone).trim())}</a>
                  </p>
                </td>
              </tr>` : ""}
              <tr>
                <td style="padding:10px 0;">
                  <p style="margin:0;font-size:11px;color:#9e8a78;letter-spacing:1px;text-transform:uppercase;">Message</p>
                  <p style="margin:8px 0 0;font-size:15px;color:#1a1208;line-height:1.7;white-space:pre-wrap;">${escapeHtml(message.trim())}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:28px 40px 36px;">
            <p style="margin:0;font-size:12px;color:#9e8a78;">
              Submitted on ${new Date().toLocaleString("en-AU", { timeZone: "Australia/Perth", dateStyle: "full", timeStyle: "short" })} (AWST)
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  try {
    await transporter.sendMail({
      from: `"Tasty Bites Website" <${process.env.GMAIL_USER}>`,
      to: RECIPIENT,
      replyTo: `"${name.trim()}" <${email.trim()}>`,
      subject: `New enquiry from ${name.trim()} — Tasty Bites`,
      html,
    });
  } catch (err) {
    console.error("Email send failed:", err);
    return NextResponse.json({ error: "Failed to send message. Please try again." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
