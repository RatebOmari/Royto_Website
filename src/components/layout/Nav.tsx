"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useEffect, useState } from "react";
import { Magnetic } from "@/components/motion/Magnetic";
import { ButtonLink } from "@/components/ui/Button";
import { Wordmark } from "@/components/ui/Wordmark";
import { cx } from "@/lib/utils";
import { navCta, navLinks } from "@/content/site";
import { ThemeToggle } from "./ThemeToggle";

/**
 * Transparent at the top of the page. Past 80px it gains a border, a blurred
 * translucent background, and the wordmark scales to 0.92 — motion.md §6.
 * The active-page indicator is a teal underline that slides between links
 * on a shared `layoutId`.
 */
export function Nav() {
  const pathname = usePathname();
  const [condensed, setCondensed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // A passive scroll listener rather than a Motion scroll subscription: the
  // nav is above the fold on every page, and this is one boolean.
  useEffect(() => {
    const onScroll = () => setCondensed(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href.startsWith("/#") ? false : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      data-condensed={condensed}
      className={cx(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-200 ease-[var(--ease-out-quad)]",
        condensed
          ? "border-b border-line bg-paper/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav
        aria-label="Primary"
        className="container-royto flex h-[72px] items-center justify-between gap-6"
      >
        <Magnetic>
          <Link
            href="/"
            className="flex items-center"
            aria-label="Royto — home"
          >
            <span className="nav-wordmark text-[22px] leading-none">
              <Wordmark />
            </span>
          </Link>
        </Magnetic>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <li key={link.href} className="relative">
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cx(
                    "relative block px-3 py-2 text-small transition-colors duration-150 ease-[var(--ease-out-quad)]",
                    active ? "text-ink" : "text-ink-soft hover:text-ink",
                  )}
                >
                  {link.label}
                  {active ? (
                    <span className="absolute inset-x-3 -bottom-px block h-px bg-teal" />
                  ) : null}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <div className="hidden sm:block">
            <ButtonLink href={navCta.href} className="px-4 py-2.5">
              {navCta.label}
            </ButtonLink>
          </div>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="grid size-9 place-items-center rounded-control border border-line text-ink transition-colors duration-150 hover:border-teal lg:hidden"
          >
            <span className="nav-burger relative block h-3 w-4" data-open={menuOpen}>
              <span className="nav-burger-top absolute inset-x-0 top-0 block h-px bg-current" />
              <span className="nav-burger-mid absolute inset-x-0 top-1.5 block h-px bg-current" />
              <span className="nav-burger-bot absolute inset-x-0 top-3 block h-px bg-current" />
            </span>
          </button>
        </div>
      </nav>

      <div
        id="mobile-nav"
        data-open={menuOpen}
        className="nav-drawer border-t border-line bg-paper lg:hidden"
        // Keeps the collapsed drawer out of the tab order and off the
        // accessibility tree while it is visually closed.
        inert={!menuOpen}
      >
        <div>
          <ul className="container-royto flex flex-col py-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block py-3 text-body text-ink-soft transition-colors hover:text-teal-ink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-3 sm:hidden">
              <ButtonLink href={navCta.href} onClick={() => setMenuOpen(false)}>
                {navCta.label}
              </ButtonLink>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
