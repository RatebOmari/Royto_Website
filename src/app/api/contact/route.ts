import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import {
  contactIntents,
  DEFAULT_INTENT,
  isContactIntent,
  type ContactIntent,
} from "@/content/contact";
import { CONTACT_EMAIL } from "@/content/site";

/** nodemailer needs the Node runtime, not Edge. */
export const runtime = "nodejs";

export type ContactFieldErrors = Partial<
  Record<"name" | "business" | "message" | "email", string>
>;

type ContactPayload = {
  name: string;
  business: string;
  message: string;
  email: string;
  intent: ContactIntent;
};

// Deliberately permissive: the goal is to catch typos, not to police
// addresses. Anything with a local part, an @ and a dotted domain passes.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(body: Partial<ContactPayload>): ContactFieldErrors {
  const errors: ContactFieldErrors = {};
  if (!body.name?.trim()) errors.name = "Please add your name.";
  if (!body.business?.trim()) errors.business = "Please add your business name.";
  if (!body.message?.trim()) {
    errors.message = "Tell us what’s eating your week.";
  } else if (body.message.trim().length < 10) {
    errors.message = "A sentence or two is plenty — just a bit more detail.";
  }
  if (!body.email?.trim()) {
    errors.email = "Please add an email so we can reply.";
  } else if (!EMAIL.test(body.email.trim())) {
    errors.email = "That doesn’t look like an email address.";
  }
  return errors;
}

/**
 * Anything interpolated into a mail header must not carry CR/LF, or a crafted
 * value could inject extra headers. Bodies are unaffected.
 */
function headerSafe(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function config() {
  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASSWORD,
    CONTACT_TO,
  } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASSWORD) return null;

  const port = Number(SMTP_PORT ?? 465);
  return {
    host: SMTP_HOST,
    port,
    // 465 is implicit TLS; 587 upgrades via STARTTLS.
    secure: port === 465,
    user: SMTP_USER,
    password: SMTP_PASSWORD,
    to: CONTACT_TO || CONTACT_EMAIL,
  };
}

async function deliver(payload: ContactPayload): Promise<void> {
  const smtp = config();
  if (!smtp) {
    // Throwing rather than returning quietly is the whole point: an enquiry
    // that cannot be delivered must never be reported to the sender as sent.
    throw new Error(
      "SMTP is not configured. Set SMTP_HOST, SMTP_USER and SMTP_PASSWORD.",
    );
  }

  const transporter = nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    secure: smtp.secure,
    auth: { user: smtp.user, pass: smtp.password },
  });

  const name = headerSafe(payload.name);
  const business = headerSafe(payload.business);
  const about = contactIntents[payload.intent];

  await transporter.sendMail({
    // Must be the authenticated mailbox — providers reject spoofed senders.
    from: `"Royto website" <${smtp.user}>`,
    to: smtp.to,
    // So hitting reply in your mail client answers the enquirer directly.
    replyTo: `"${name}" <${headerSafe(payload.email)}>`,
    subject: `${about.subject} — ${business} (${name})`,
    text: [
      `About:    ${about.label}`,
      `Name:     ${payload.name}`,
      `Business: ${payload.business}`,
      `Email:    ${payload.email}`,
      "",
      `${about.prompt}`,
      payload.message,
      "",
      "— sent from the royto.tech contact form",
    ].join("\n"),
  });
}

export async function POST(request: Request) {
  let body: Partial<ContactPayload> & { for?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, errors: { message: "Something went wrong. Try again?" } },
      { status: 400 },
    );
  }

  // The form posts the intent as `for`; normalise it onto the payload shape.
  body.intent = isContactIntent(body.for) ? body.for : DEFAULT_INTENT;

  const errors = validate(body);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 400 });
  }

  try {
    await deliver({
      name: body.name!.trim(),
      business: body.business!.trim(),
      message: body.message!.trim(),
      email: body.email!.trim(),
      // An unknown or missing value is filed as an audit, never rejected.
      intent: isContactIntent(body.intent) ? body.intent : DEFAULT_INTENT,
    });
  } catch (error) {
    // Logged for the server, never echoed to the visitor — the message could
    // contain host or credential detail.
    console.error("[contact] delivery failed:", error);
    return NextResponse.json(
      {
        ok: false,
        message: `We couldn’t send that. Please email ${CONTACT_EMAIL} directly — it reaches the same place.`,
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
