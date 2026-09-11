import { monthlyReportExample } from "@/content/pricing";

/**
 * What the Run plan's monthly summary looks like. Labelled as an example
 * twice — eyebrow and footnote — and every row is a mechanic, never a
 * client's figure.
 */
export function MonthlyReportExample() {
  return (
    <div className="rounded-panel border border-line bg-paper-raised p-6 shadow-card md:p-7">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <p className="mono-label text-slate">{monthlyReportExample.label}</p>
        <p className="mono-label text-slate">{monthlyReportExample.period}</p>
      </div>
      <ul className="mt-4 divide-y divide-line">
        {monthlyReportExample.rows.map((row) => (
          <li key={row.metric} className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-4 py-3">
            <span className="text-small text-ink">
              {row.metric}
              <span className="ml-2 font-mono text-mono-sm text-slate">{row.note}</span>
            </span>
            <span className="font-display text-[22px] font-extrabold leading-none tracking-[-0.02em] text-ink tabular-nums">
              {row.value}
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-4 font-mono text-mono-sm text-slate">{monthlyReportExample.note}</p>
    </div>
  );
}
