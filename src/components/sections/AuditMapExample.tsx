import { Tag } from "@/components/ui/Tag";
import { auditMapExample } from "@/content/pricing";

/**
 * What the audit's "written map" looks like, as a small labelled example.
 * Simulated content, so it says so — visibly, twice: the eyebrow and the
 * footnote. The rows are illustrative mechanics, never a client's numbers.
 */
export function AuditMapExample() {
  return (
    <div className="rounded-panel border border-line bg-paper-raised p-6 shadow-card md:p-7">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <p className="mono-label text-slate">{auditMapExample.label}</p>
        <p className="mono-label text-slate">Hours a week</p>
      </div>
      <ul className="mt-4 divide-y divide-line">
        {auditMapExample.rows.map((row) => (
          <li
            key={row.task}
            className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-2 py-3 sm:grid-cols-[minmax(0,1fr)_auto_auto]"
          >
            <span className="text-small text-ink">{row.task}</span>
            <span className="font-mono text-mono text-ink-soft tabular-nums">{row.hours}</span>
            <span className="col-span-2 sm:col-span-1">
              <Tag tone={row.tone}>{row.outcome}</Tag>
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-4 font-mono text-mono-sm text-slate">{auditMapExample.note}</p>
    </div>
  );
}
