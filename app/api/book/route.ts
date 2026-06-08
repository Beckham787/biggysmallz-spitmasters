import { NextRequest, NextResponse } from "next/server";
import { siteConfig } from "@/lib/site-config";

/**
 * POST /api/book — Book a Date submissions.
 *
 * Sends the booking details to the owner's inbox. The provider is swappable via
 * the EMAIL_PROVIDER env var ("web3forms" | "resend"). Keys live server-side in
 * .env.local (see .env.local.example) and never reach the browser.
 *
 *   ┌──────────────────────────────────────────────────────────────────────┐
 *   │  DROP YOUR KEY IN .env.local — NOT HERE.                               │
 *   │  web3forms → WEB3FORMS_ACCESS_KEY                                       │
 *   │  resend    → RESEND_API_KEY  (+ RESEND_FROM, OWNER_EMAIL)              │
 *   └──────────────────────────────────────────────────────────────────────┘
 */

export const runtime = "nodejs";

type BookingPayload = {
  name?: string;
  phone?: string;
  email?: string;
  eventDate?: string;
  eventType?: string;
  message?: string;
};

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: NextRequest) {
  let body: BookingPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = (body.name || "").trim();
  const phone = (body.phone || "").trim();
  const email = (body.email || "").trim();
  const eventDate = (body.eventDate || "Not specified").trim();
  const eventType = (body.eventType || "Not specified").trim();
  const message = (body.message || "").trim();

  // Server-side validation mirrors the form: name + one contact method.
  if (!name) {
    return NextResponse.json({ error: "Name is required." }, { status: 400 });
  }
  if (!phone && !email) {
    return NextResponse.json(
      { error: "A phone number or email is required." },
      { status: 400 },
    );
  }

  const subject = `New booking enquiry — ${name}${
    eventType !== "Not specified" ? ` (${eventType})` : ""
  }`;

  const lines = [
    ["Name", name],
    ["Phone", phone || "—"],
    ["Email", email || "—"],
    ["Event date", eventDate],
    ["Event type", eventType],
    ["Message", message || "—"],
  ];

  const text = lines.map(([k, v]) => `${k}: ${v}`).join("\n");
  const html = `
    <div style="font-family: Georgia, 'Times New Roman', serif; color:#15110f; max-width:560px;">
      <h2 style="font-family: Arial, sans-serif; text-transform:uppercase; letter-spacing:2px; color:#c1432d;">
        New booking enquiry
      </h2>
      <table style="border-collapse:collapse; width:100%;">
        ${lines
          .map(
            ([k, v]) => `
          <tr>
            <td style="padding:8px 12px; border-bottom:1px solid #eee; font-weight:bold; width:130px; vertical-align:top;">${k}</td>
            <td style="padding:8px 12px; border-bottom:1px solid #eee; vertical-align:top; white-space:pre-wrap;">${escapeHtml(
              v,
            )}</td>
          </tr>`,
          )
          .join("")}
      </table>
      <p style="font-family: Arial, sans-serif; font-size:12px; color:#8a807a; margin-top:20px;">
        Sent from the ${siteConfig.name} website. Reply to the customer by phone or email.
      </p>
    </div>`;

  const provider = (process.env.EMAIL_PROVIDER || "web3forms").toLowerCase();

  try {
    if (provider === "resend") {
      await sendWithResend({ subject, html, text, replyTo: email });
    } else {
      await sendWithWeb3Forms({ subject, lines, message });
    }
  } catch (err) {
    console.error("Booking email failed:", err);
    return NextResponse.json(
      {
        error:
          "We couldn't send your message right now. Please try again, or contact Biggy directly.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}

// ── Web3Forms (default) ──────────────────────────────────────────────────────
// Free, no domain verification. The destination inbox is the one tied to the
// access key in the Web3Forms dashboard. Set WEB3FORMS_ACCESS_KEY in .env.local.
async function sendWithWeb3Forms({
  subject,
  lines,
  message,
}: {
  subject: string;
  lines: string[][];
  message: string;
}) {
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    throw new Error("WEB3FORMS_ACCESS_KEY is not set in .env.local");
  }

  const fields: Record<string, string> = {
    access_key: accessKey,
    subject,
    from_name: `${siteConfig.name} — Booking`,
  };
  for (const [k, v] of lines) fields[k] = v;
  if (message) fields["Message"] = message;

  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(fields),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Web3Forms responded ${res.status}: ${detail}`);
  }
}

// ── Resend ───────────────────────────────────────────────────────────────────
// Requires a verified sending domain. Set RESEND_API_KEY, RESEND_FROM and
// OWNER_EMAIL in .env.local.
async function sendWithResend({
  subject,
  html,
  text,
  replyTo,
}: {
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;
  const to = process.env.OWNER_EMAIL || siteConfig.contact.email;
  if (!apiKey) throw new Error("RESEND_API_KEY is not set in .env.local");
  if (!from) throw new Error("RESEND_FROM is not set in .env.local");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      html,
      text,
      // Let Biggy reply straight to the customer when they left an email.
      ...(replyTo ? { reply_to: replyTo } : {}),
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Resend responded ${res.status}: ${detail}`);
  }
}
