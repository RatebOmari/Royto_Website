import { NextResponse } from "next/server";

/**
 * Contact form endpoint.
 *
 * TODO(placeholder): this validates and returns success but does not send
 * anything anywhere. Plug the real destination in at `deliver()` below — an
 * email API, a CRM, or a webhook. Until then no enquiry is delivered, so do
 * not go live with the form as the only contact route: the page also shows a
 * mailto: fallback for exactly this reason.
 */

export type ContactFieldErrors = Partial<
  Record<"name" | "business" | "message" | "email", string>
>;

type ContactPayload = {
  name: string;
  business: string;
  message: string;
  email: string;
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

async function deliver(payload: ContactPayload): Promise<void> {
  // TODO(placeholder): send `payload` to its real destination here.
  void payload;
}

export async function POST(request: Request) {
  let body: Partial<ContactPayload>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, errors: { message: "Something went wrong. Try again?" } },
      { status: 400 },
    );
  }

  const errors = validate(body);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 400 });
  }

  await deliver({
    name: body.name!.trim(),
    business: body.business!.trim(),
    message: body.message!.trim(),
    email: body.email!.trim(),
  });

  return NextResponse.json({ ok: true });
}
