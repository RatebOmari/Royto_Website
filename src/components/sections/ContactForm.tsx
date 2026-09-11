"use client";

import { AnimatePresence, motion } from "motion/react";
import { useId, useState } from "react";
import { Button } from "@/components/ui/Button";
import type { ContactFieldErrors } from "@/app/api/contact/route";
import { CONTACT_EMAIL } from "@/content/site";
import { ease } from "@/lib/motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { cx } from "@/lib/utils";

type Status = "idle" | "sending" | "sent" | "error";

/** The reply promise. Shown above the form and repeated on success. */
const NEXT_STEP =
  "I’ll come back to you within two working days with either a time to talk or an honest “this isn’t worth automating yet.”";

const FIELDS = [
  { name: "name", label: "Your name", type: "text", autoComplete: "name" },
  {
    name: "business",
    label: "Business name",
    type: "text",
    autoComplete: "organization",
  },
  { name: "message", label: "What’s eating your week?", type: "textarea" },
  { name: "email", label: "Email", type: "email", autoComplete: "email" },
] as const;

function Field({
  field,
  error,
  disabled,
}: {
  field: (typeof FIELDS)[number];
  error?: string;
  disabled: boolean;
}) {
  const id = useId();
  const errorId = `${id}-error`;
  const shared = {
    id,
    name: field.name,
    disabled,
    required: true,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errorId : undefined,
    // No `outline-none` here. The growing underline is a flourish, not the
    // focus indicator — keyboard users still get the standard 2px teal ring
    // from the base layer. A mouse click gets the underline only, because the
    // ring is scoped to :focus-visible.
    className:
      "field-input peer w-full rounded-none border-0 border-b border-line bg-transparent px-0 py-3 text-body text-ink placeholder:text-slate/60 disabled:opacity-60",
  };

  return (
    <div>
      <label htmlFor={id} className="mono-label block text-slate">
        {field.label}
      </label>
      <div className="relative mt-2">
        {field.type === "textarea" ? (
          <textarea {...shared} rows={4} />
        ) : (
          <input {...shared} type={field.type} autoComplete={field.autoComplete} />
        )}
        <span
          aria-hidden="true"
          className="field-underline absolute inset-x-0 bottom-0 block h-px bg-teal"
        />
      </div>
      {/* Errors slide down with the message; they don't pop. */}
      <AnimatePresence initial={false}>
        {error ? (
          <motion.p
            id={errorId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: ease.inOutQuart }}
            className="overflow-hidden font-mono text-mono-sm text-gold"
          >
            <span className="block pt-2">{error}</span>
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export function ContactForm() {
  const reduced = useReducedMotion();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<ContactFieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setErrors({});
    setFormError(null);

    const data = Object.fromEntries(new FormData(event.currentTarget));
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = await response.json();
      if (!response.ok) {
        setErrors(body.errors ?? {});
        setStatus("idle");
        // A delivery failure returns a message rather than field errors. Show
        // it verbatim: it names the mailto fallback, which is the only way the
        // visitor still reaches us.
        if (!body.errors) {
          setFormError(body.message ?? "Something went wrong. Try again?");
        }
        return;
      }
      setStatus("sent");
    } catch {
      setStatus("error");
      setFormError(
        `Couldn’t send that. Email ${CONTACT_EMAIL} instead and it'll reach the same place.`,
      );
    }
  }

  if (status === "sent") {
    return (
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: ease.outExpo }}
        className="rounded-panel border border-teal bg-teal-soft p-8 md:p-10"
        role="status"
      >
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="size-8"
          fill="none"
          stroke="var(--teal)"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <motion.path
            d="M4 12.5 l5.5 5.5 L20 6"
            initial={reduced ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.4, ease: ease.outExpo, delay: 0.1 }}
          />
        </svg>
        <p className="mt-6 measure text-body text-ink">Got it. {NEXT_STEP}</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-7">
      {/* What happens after sending, stated before anyone has to trust the button. */}
      <p className="measure font-mono text-mono text-slate">{NEXT_STEP}</p>

      {FIELDS.map((field) => (
        <Field
          key={field.name}
          field={field}
          error={errors[field.name]}
          disabled={status === "sending"}
        />
      ))}

      {formError ? (
        <p role="alert" className="font-mono text-mono-sm text-gold">
          {formError}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-5 pt-2">
        <Button type="submit" disabled={status === "sending"} arrow={status === "idle"}>
          <span className={cx("inline-flex items-center gap-2")}>
            {status === "sending" ? (
              <>
                <svg
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                  className="spinner size-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <circle cx="8" cy="8" r="6" opacity="0.3" />
                  <path d="M14 8a6 6 0 0 0-6-6" strokeLinecap="round" />
                </svg>
                Sending
              </>
            ) : (
              "Send it over"
            )}
          </span>
        </Button>

        <p className="font-mono text-mono text-slate">
          Prefer email?{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-teal-ink underline underline-offset-4 decoration-line-strong transition-colors hover:decoration-teal"
          >
            {CONTACT_EMAIL}
          </a>
        </p>
      </div>
    </form>
  );
}
