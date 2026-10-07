import type { CSSProperties } from "react";
import Asset from "./Asset";
import { fontVelaGxBold, fontVelaGxExtraBold } from "./fonts";
import HeroProducts from "./HeroProducts";

/**
 * Hero — the earlier variant (Figma node 218:2027 / frame 225:5804),
 * restored on request: big logo top-left, a right-aligned headline, three
 * product cards, and the static mirrored wave image with a slow sway
 * animation (see `.hero-wave` in app/globals.css). The fixed nav bar itself
 * lives in SiteHeader.tsx, which stays transparent without a logo while
 * this section is on screen and switches to the small logo once it has
 * scrolled away.
 *
 * Fluid-scaling: everything is in `cqw` against this file's 1440px
 * reference (see Footer.tsx's doc comment for the technique writeup);
 * font-sizes use `clamp(floor, Pcqw, ceiling)`, tracking is in `em`. The
 * wave sits outside the container (it spans the real viewport) and is never
 * cropped; on wide viewports the headline and cards move down by the wave's
 * extra height instead (`--wave-extra`).
 */

/** How much taller the (uncropped, full-bleed) wave gets than it is at the
 * 1440px reference's ~497px — the headline and cards are pushed down by this
 * much on wide viewports so the wave never runs into them. */
const WAVE_EXTRA = "max(0px, calc((100vw + 90px) * 0.29389 - 497px))";

/** Top of the product cards: their 1440-reference position plus the wave's
 * extra height on wide viewports, but never so low that the cards' bottom
 * edge (card height 9.7222cqw + a 1.6667cqw gap) falls below the first
 * screen — and never above a 30cqw floor on very short windows. */
const CARDS_TOP = "max(30cqw, min(calc(42.7778cqw + var(--wave-extra)), calc(100svh - 11.3889cqw)))";

export default function Hero() {
  return (
    <section id="hero" className="relative w-full overflow-hidden bg-[#F5F5F5]">
      {/* Animated wave background — full-bleed (spans the real viewport,
          not capped to the 1600px content column). Height uses `aspect-`
          so the box's own ratio always matches the source photo's
          (2341×688, transparent background) at any viewport width — that
          guarantees zero cropping. Mirrored horizontally per the design.
          Outer div: position. Middle div: the sway animation. Inner div:
          the static horizontal flip. The left/width overshoot tucks the
          ribbon's own pointed tip behind the section's overflow-hidden
          edge. The PNG itself cuts the ribbon off at its top (and, once
          mirrored, right) edge, so `top` rises with the viewport width to
          keep that cut above the screen even at the sway animation's
          lowest point (the right side swings down by ~3.1vw − 32px; the extra
          8px is a safety margin). */}
      <div
        className="pointer-events-none absolute aspect-[2341/688] overflow-hidden"
        style={{ left: -90, width: "calc(100% + 90px)", top: "min(12px, calc(24px - 3.1vw))" }}
      >
        <div className="hero-wave h-full w-full">
          <div className="h-full w-full -scale-x-100">
            <Asset src="/hero/wave-bg.png" alt="" fit="cover" className="h-full w-full" />
          </div>
        </div>
      </div>

      <div
        className="relative mx-auto w-full max-w-[1600px] [container-type:inline-size]"
        style={{ "--wave-extra": WAVE_EXTRA, "--cards-top": CARDS_TOP } as CSSProperties}
      >
        <div aria-hidden style={{ height: "calc(var(--cards-top) + 9.7222cqw)" }} />

        {/* Big logo mark — ordinary page content, not part of the fixed
            header (see SiteHeader.tsx); scrolls away with the rest of Hero.
            z-[60] keeps it above the header's z-50 so the header's own
            backdrop-blur doesn't blur the logo underneath it. */}
        <div id="hero-logo" className="absolute z-[60] flex items-center gap-[1.6667cqw]" style={{ left: "2.3611cqw", top: "3.125cqw" }}>
          <Asset src="/hero/cone.svg" alt="" className="h-[4.6528cqw] w-[4.0972cqw]" />
          <div className="flex flex-col items-start gap-[0.2778cqw]">
            <Asset src="/hero/conomica-wordmark.svg" alt="Conomica" className="h-[3.8889cqw] w-[22.7083cqw]" />
            <p className={`text-[clamp(11px,1.9444cqw,31.11px)] leading-[0.95] tracking-[-0.03em] text-[#161616] ${fontVelaGxBold}`}>
              группа компаний
            </p>
          </div>
        </div>

        {/* Headline */}
        <h1
          className={`absolute text-right leading-[0.95] tracking-[-0.03em] text-[#191919] ${fontVelaGxExtraBold}`}
          style={{
            right: "2.2222cqw",
            top: "calc(var(--cards-top) - 8.5417cqw)",
            width: "clamp(300px, 45.3472cqw, 725px)",
            fontSize: "clamp(17.33px, 3.6111cqw, 57.78px)",
          }}
        >
          <span className="block">Экосистема fintech</span>
          <span className="block">продуктов от Conomica</span>
        </h1>

        {/* Product row */}
        <HeroProducts
          className="absolute flex items-center gap-[1.4583cqw]"
          style={{ left: "2.3611cqw", top: "var(--cards-top)", width: "calc(100% - 4.7222cqw)" }}
        />
      </div>
    </section>
  );
}
