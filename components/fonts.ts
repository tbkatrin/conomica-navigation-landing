/**
 * Brand typeface utility classes (Figma: "Vela Sans" / "Vela Sans GX").
 * Family + fallback stack are declared as CSS vars in app/globals.css; both
 * resolve to the single variable font loaded in app/layout.tsx, so the
 * weight classes below pick real weights from its 200–800 axis.
 */

export const fontVelaRegular = "[font-family:var(--font-vela-sans)] font-normal";
export const fontVelaMedium = "[font-family:var(--font-vela-sans)] font-medium";
export const fontVelaBold = "[font-family:var(--font-vela-sans)] font-bold";

export const fontVelaGxRegular =
  "[font-family:var(--font-vela-sans-gx)] font-normal";
export const fontVelaGxBold = "[font-family:var(--font-vela-sans-gx)] font-bold";
export const fontVelaGxExtraBold =
  "[font-family:var(--font-vela-sans-gx)] font-extrabold";
