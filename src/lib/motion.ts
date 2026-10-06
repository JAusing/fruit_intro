import type { CSSProperties } from "react";

/** Inline CSS custom properties for the parallax classes in globals.css (--shift / --depth, in px). */
export function motion(vars: Record<`--${string}`, number>): CSSProperties {
  return vars as CSSProperties;
}
