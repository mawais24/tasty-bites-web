import nodemailer from "nodemailer";
import type { Booking } from "@/types/database";
import { formatSlotLabel } from "@/lib/booking-hours";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function sendEmail({
  to,
  subject,
  html,
  replyTo,
}: {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
}) {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    throw new Error("Missing GMAIL_USER or GMAIL_APP_PASSWORD env vars.");
  }

  await transporter.sendMail({
    from: `"Tasty Bites Website" <${process.env.GMAIL_USER}>`,
    to: Array.isArray(to) ? to.join(", ") : to,
    replyTo,
    subject,
    html,
  });
}

function formatBookingDate(dateStr: string): string {
  return new Date(`${dateStr}T00:00:00`).toLocaleDateString("en-AU", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const GOLD = "#c9943a";

function emailShell(headline: string, subhead: string, bodyHtml: string): string {
  return `<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#faf7f0;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#faf7f0;padding:40px 0;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-top:4px solid ${GOLD};">
        <tr>
          <td style="padding:36px 40px 0;">
            <p style="margin:0 0 4px;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:${GOLD};">
              Tasty Bites Restaurant & Bistro
            </p>
            <h1 style="margin:0;font-size:24px;color:#1a1208;">${headline}</h1>
            <p style="margin:6px 0 0;font-size:13px;color:#6b5a48;">${subhead}</p>
            <hr style="border:none;border-top:1px solid #ede8de;margin:24px 0;" />
          </td>
        </tr>
        <tr><td style="padding:0 40px 36px;">${bodyHtml}</td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function detailRow(label: string, value: string): string {
  return `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #ede8de;">
        <p style="margin:0;font-size:11px;color:#9e8a78;letter-spacing:1px;text-transform:uppercase;">${label}</p>
        <p style="margin:4px 0 0;font-size:16px;color:#1a1208;">${value}</p>
      </td>
    </tr>`;
}

export function getBookingEmailTemplate(booking: Booking) {
  const isPending = booking.status === "pending";
  const dateStr = formatBookingDate(booking.booking_date);
  const timeStr = formatSlotLabel(booking.booking_time);
  const name = escapeHtml(booking.name);

  const detailsTable = `
    <table width="100%" cellpadding="0" cellspacing="0">
      ${detailRow("Date", dateStr)}
      ${detailRow("Time", timeStr)}
      ${detailRow("Party Size", `${booking.party_size} ${booking.party_size === 1 ? "guest" : "guests"}`)}
      ${booking.special_requests ? detailRow("Special Requests", escapeHtml(booking.special_requests)) : ""}
    </table>`;

  const customer = {
    subject: isPending
      ? `Booking Received — Tasty Bites (${dateStr})`
      : `Booking Confirmed — Tasty Bites (${dateStr})`,
    html: emailShell(
      isPending ? "Booking Received" : "Booking Confirmed!",
      isPending
        ? "We'll confirm your table shortly"
        : "See you soon at Tasty Bites",
      `
        <p style="margin:20px 0 8px;font-size:15px;color:#1a1208;">Dear ${name},</p>
        <p style="margin:0 0 20px;font-size:15px;color:#1a1208;line-height:1.6;">
          ${isPending
            ? "Thanks for your booking request! This date is currently under review — our team will confirm your table shortly."
            : "Your table is booked! We look forward to welcoming you."}
        </p>
        ${detailsTable}
        <p style="margin:20px 0 0;font-size:13px;color:#9e8a78;">
          Shop 30, 130 Bridgeman Dr, Benett Springs WA 6063 · +61 8 9248 7000
        </p>
      `
    ),
  };

  const restaurant = {
    subject: `New Booking (${booking.status}) — ${booking.name} — ${dateStr}`,
    html: emailShell(
      "New Table Booking",
      isPending ? "Review required" : "Auto-confirmed",
      `
        <table width="100%" cellpadding="0" cellspacing="0">
          ${detailRow("Name", name)}
          ${detailRow("Email", `<a href="mailto:${escapeHtml(booking.email)}" style="color:${GOLD};">${escapeHtml(booking.email)}</a>`)}
          ${detailRow("Phone", `<a href="tel:${escapeHtml(booking.phone)}" style="color:${GOLD};">${escapeHtml(booking.phone)}</a>`)}
          ${detailRow("Date", dateStr)}
          ${detailRow("Time", timeStr)}
          ${detailRow("Party Size", `${booking.party_size}`)}
          ${booking.special_requests ? detailRow("Special Requests", escapeHtml(booking.special_requests)) : ""}
          ${detailRow("Status", booking.status)}
        </table>
      `
    ),
  };

  return { customer, restaurant };
}
