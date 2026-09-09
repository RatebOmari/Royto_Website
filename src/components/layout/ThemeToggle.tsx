"use client";

import { useTheme } from "@/lib/useTheme";

/**
 * Sun and moon in one 16px box, cross-fading and counter-rotating in CSS so
 * the control reads as a single object changing state rather than two icons
 * swapping. No animation library involved — this sits above the fold on every
 * page and shouldn't cost hydration time.
 */
export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      data-theme-state={theme ?? "unknown"}
      // Until the client resolves the theme, describe the control neutrally
      // rather than claiming a state we haven't confirmed.
      aria-label={
        theme === null
          ? "Switch colour theme"
          : `Switch to ${isDark ? "light" : "dark"} theme`
      }
      className="grid size-9 place-items-center rounded-control border border-line text-slate transition-colors duration-150 ease-[var(--ease-out-quad)] hover:border-teal hover:text-teal"
    >
      <span className="relative block size-4">
        <svg viewBox="0 0 16 16" aria-hidden="true" className="theme-icon theme-sun size-4">
          <circle cx="8" cy="8" r="3.1" fill="currentColor" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <line
              key={angle}
              x1="8"
              y1="1.4"
              x2="8"
              y2="3.1"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              transform={`rotate(${angle} 8 8)`}
            />
          ))}
        </svg>
        <svg viewBox="0 0 16 16" aria-hidden="true" className="theme-icon theme-moon size-4">
          <path
            d="M13.2 9.9A5.8 5.8 0 0 1 6.1 2.8a5.9 5.9 0 1 0 7.1 7.1Z"
            fill="currentColor"
          />
        </svg>
      </span>
    </button>
  );
}
