import Link from "next/link";
import { CONTACT_EMAIL, footerColumns, site, socialLinks } from "@/content/site";

/**
 * A Server Component. The wordmark sits large and quiet; on hover the teal
 * period scales to 1.3 and back, in CSS — motion.md §6.
 */
export function Footer() {
  return (
    <footer className="border-t border-line bg-paper">
      <div className="container-royto py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <p className="footer-mark font-display text-[clamp(40px,7vw,64px)] font-extrabold leading-none tracking-[-0.04em] text-ink">
              royto<span className="footer-period text-teal">.</span>
            </p>
            <p className="mt-6 max-w-[38ch] text-small text-ink-soft">
              {site.tagline}
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-4 inline-block font-mono text-mono text-teal-ink underline underline-offset-4 decoration-line-strong transition-colors hover:decoration-teal"
            >
              {CONTACT_EMAIL}
            </a>
          </div>

          {footerColumns.map((column) => (
            <nav key={column.heading} aria-label={column.heading}>
              <h2 className="mono-label text-slate">{column.heading}</h2>
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-small text-ink-soft transition-colors duration-150 hover:text-teal-ink"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-mono-sm text-slate">{site.legal}</p>
          <ul className="flex gap-5">
            {socialLinks.map((social) => (
              <li key={social.href}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="me noreferrer"
                  className="font-mono text-mono-sm text-slate transition-colors duration-150 hover:text-teal-ink"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
