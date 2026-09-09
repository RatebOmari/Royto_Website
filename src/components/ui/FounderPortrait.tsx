/**
 * TODO(placeholder): there is no founder photograph yet.
 *
 * This is a *designed* placeholder, not a grey box and not a stock image —
 * the brief is explicit that where real proof will eventually go, we leave a
 * clearly marked empty state. Replace the whole component body with the real
 * image when one exists; the frame and aspect ratio should stay.
 */
export function FounderPortrait({ name }: { name: string }) {
  const initials = name
    .split(/[\s-]+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join("");

  return (
    <figure className="m-0">
      <div className="relative aspect-[4/5] overflow-hidden rounded-panel border border-line bg-paper-raised">
        <div aria-hidden="true" className="blueprint absolute inset-0 opacity-50" />
        <div className="absolute inset-0 grid place-items-center">
          <div className="text-center">
            <span
              aria-hidden="true"
              className="font-display text-[clamp(48px,9vw,88px)] font-extrabold leading-none tracking-[-0.04em] text-ink/12"
            >
              {initials}
            </span>
          </div>
        </div>
        <p className="mono-label absolute bottom-4 left-4 text-slate">
          Photo to come
        </p>
      </div>
    </figure>
  );
}
