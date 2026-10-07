import type { ReactNode } from "react";
import { fontVelaMedium } from "../fonts";

/**
 * Pieces shared by the mobile layout (components/mobile/*). The mobile page
 * follows the Figma "Главная 390" frame and uses plain px sizes — it only
 * shows below the `md` breakpoint (768px), where the desktop page's fluid
 * `cqw` scaling is replaced by this stacked layout.
 */

export const SHADOW = "drop-shadow-[4px_4px_17px_rgba(0,0,0,0.11)]";
export const BTN_SHADOW = "drop-shadow-[0px_2px_1px_rgba(0,0,0,0.04)]";

/** Green full-width CTA, labelled in the web button style (Vela Sans Medium
 * 16px, 120% line-height, +1% tracking). */
export function CtaButton({ href, children }: { href?: string; children: ReactNode }) {
  const className = `flex h-11 w-full items-center justify-center rounded-[12px] bg-[#00703E] px-4 text-[16px] leading-[1.2] tracking-[0.01em] text-white transition-colors hover:bg-[#0EAD66] ${BTN_SHADOW} ${fontVelaMedium}`;
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={className}>
      {children}
    </button>
  );
}

/** Thin ring with six dots on it (the brand's ring-and-dots motif). `size`
 * is the whole mark's box in px; `rotate` turns the dots about the centre. */
export function RingMark({
  size,
  rotate = 0,
  ringColor = "#D8D8D8",
  dotColor = "#D8D8D8",
  className,
}: {
  size: number;
  rotate?: number;
  ringColor?: string;
  dotColor?: string;
  className?: string;
}) {
  const dotR = 1.284;
  const R = 50 - dotR;
  return (
    <svg
      aria-hidden
      viewBox="0 0 100 100"
      fill="none"
      width={size}
      height={size}
      className={className}
    >
      <g transform={`rotate(${rotate} 50 50)`}>
        <circle cx={50} cy={50} r={R} stroke={ringColor} strokeWidth={1} vectorEffect="non-scaling-stroke" />
        {Array.from({ length: 6 }, (_, i) => {
          const a = ((-90 + 60 * i) * Math.PI) / 180;
          return <circle key={i} cx={50 + R * Math.cos(a)} cy={50 + R * Math.sin(a)} r={dotR} fill={dotColor} />;
        })}
      </g>
    </svg>
  );
}

const ICON_RING = 15.5;
const PHONE_D =
  "M11.2915 8.47092V10.1742C11.2922 10.3323 11.2598 10.4888 11.1964 10.6337C11.1331 10.7786 11.0402 10.9086 10.9237 11.0155C10.8071 11.1224 10.6696 11.2038 10.5198 11.2544C10.37 11.3051 10.2113 11.3239 10.0538 11.3097C8.30675 11.1198 6.62857 10.5229 5.15412 9.56668C3.78233 8.69499 2.6193 7.53195 1.74761 6.16017C0.788094 4.67902 0.190969 2.99267 0.00460828 1.23775C-0.00957956 1.08075 0.00907928 0.922516 0.0593966 0.77312C0.109714 0.623724 0.190587 0.486442 0.296868 0.370014C0.403148 0.253586 0.532507 0.160564 0.676708 0.0968693C0.820909 0.0331746 0.976793 0.0002035 1.13444 5.50449e-05H2.83769C3.11322 -0.00265679 3.38034 0.0949143 3.58926 0.274582C3.79818 0.454249 3.93463 0.703754 3.9732 0.976589C4.04509 1.52167 4.17841 2.05687 4.37062 2.57197C4.44701 2.77518 4.46354 2.99603 4.41826 3.20835C4.37298 3.42067 4.26778 3.61556 4.11513 3.76993L3.39409 4.49097C4.20231 5.91237 5.37921 7.08926 6.8006 7.89749L7.52165 7.17644C7.67601 7.02379 7.8709 6.9186 8.08322 6.87332C8.29554 6.82803 8.51639 6.84457 8.7196 6.92095C9.23471 7.11317 9.76991 7.24649 10.315 7.31838C10.5908 7.35729 10.8427 7.4962 11.0227 7.70871C11.2028 7.92121 11.2984 8.19248 11.2915 8.47092Z";
const MAIL_D =
  "M0.753221 0L6.00773 4.1629L11.2545 0H0.753221ZM0 0.499857V6.85714H11.9991V0.503293L6.27398 5.04924C6.19816 5.10915 6.10436 5.14174 6.00773 5.14174C5.9111 5.14174 5.8173 5.10915 5.74148 5.04924L0.000858901 0.499857H0Z";
const PIN_D = "M16 7.5c-3.6 0-6.5 2.8-6.5 6.4 0 4.6 6.5 10.6 6.5 10.6s6.5-6 6.5-10.6c0-3.6-2.9-6.4-6.5-6.4Z";

/** Round outlined icon with a phone / mail / location glyph inside. */
export function ContactIcon({
  kind,
  size,
  color,
  cutout = "#191919",
}: {
  kind: "phone" | "mail" | "pin";
  size: number;
  color: string;
  /** background colour showing through the pin's centre hole */
  cutout?: string;
}) {
  return (
    <svg aria-hidden viewBox="0 0 32 32" fill="none" width={size} height={size} className="shrink-0">
      <circle cx="16" cy="16" r={ICON_RING} stroke={color} />
      {kind === "phone" && <path d={PHONE_D} fill={color} transform="translate(10.35,10.34)" />}
      {kind === "mail" && <path d={MAIL_D} fill={color} transform="translate(10,12.57)" />}
      {kind === "pin" && (
        <>
          <path d={PIN_D} fill={color} />
          <circle cx="16" cy="13.9" r="2.3" fill={cutout} />
        </>
      )}
    </svg>
  );
}
