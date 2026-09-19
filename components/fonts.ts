/**
 * Brand typeface utility classes (Figma: "Vela Sans" / "Vela Sans GX").
 * Family + fallback stack are declared as CSS vars in app/globals.css;
 * until the real font files are added via @font-face or next/font/local,
 * both fall back to system sans-serif.
 */

export const fontVelaMedium = "[font-family:var(--font-vela-sans)] font-medium";
export const fontVelaBold = "[font-family:var(--font-vela-sans)] font-bold";

export const fontVelaGxRegular =
  "[font-family:var(--font-vela-sans-gx)] font-normal";
export const fontVelaGxBold = "[font-family:var(--font-vela-sans-gx)] font-bold";
export const fontVelaGxExtraBold =
  "[font-family:var(--font-vela-sans-gx)] font-extrabold";
