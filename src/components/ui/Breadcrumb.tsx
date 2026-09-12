import Link from "next/link";

/** One mono line above the eyebrow: where this page sits. */
export function Breadcrumb({
  parent,
  current,
}: {
  parent: { label: string; href: string };
  current: string;
}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-5 font-mono text-mono-sm text-slate">
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link href={parent.href} className="transition-colors hover:text-teal-ink">
            {parent.label}
          </Link>
        </li>
        <li aria-hidden="true">›</li>
        <li aria-current="page" className="text-ink-soft">
          {current}
        </li>
      </ol>
    </nav>
  );
}
