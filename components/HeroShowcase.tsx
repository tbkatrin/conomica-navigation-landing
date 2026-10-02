"use client";

/**
 * Cross-promo showcase right after Hero — per Figma node 218:2027's promo
 * grid (232:8617 = займы content, 232:8619 = цессии content, both updated
 * with the new "Perspective N · 3d" laptop mockups). Per-element
 * edge-exit/edge-enter mechanic (see ui/edge-slide), and "Платформа" is
 * accented green in the headline.
 *
 * The two variants' own mockup boxes differ slightly in size (643×512.462
 * for займы vs 669×533.183 for цессии — a real difference between the two
 * source screenshots' perspective, not a mistake), so the macbook slot
 * uses `anchorB` to give each variant its own exact rest box while every
 * other slot shares one anchor.
 *
 * Fluid-scaling pass: the box itself used to be a fixed 1330×584px size;
 * it's now sized as `93.3989cqw` of the OUTER page wrapper (1330/1424 —
 * its own proportion of that wrapper at the 1440 reference, see
 * app/page.tsx) — no additional ceiling needed since that outer wrapper
 * already caps at 1600px itself, so this box's growth stops right along
 * with it. `aspectRatio` keeps its height locked to that fluid width
 * instead of a fixed 584px. The box itself then becomes a
 * *nested* `[container-type:inline-size]` context, so everything inside
 * it (logo/badge/headline/text/macbook positions, via the `CQW()` helper)
 * scales in `cqw` against *its own* rendered width — 1330px is this
 * file's own reference (see Footer.tsx's doc comment for the general
 * technique). Font-sizes use `clamp(floor, Pcqw, ceiling)`, tracking is in
 * `em`. ui/edge-slide.tsx's travel distance switched from a fixed px
 * frame size to `100cqw`/`100cqh` (one full box width/height, whatever
 * that currently renders as) — see that file's own doc comment.
 */

import { useScroll, useTransform, useReducedMotion } from "motion/react";
import { useRef, type ReactNode } from "react";
import Asset from "./Asset";
import { fontVelaGxBold, fontVelaGxExtraBold, fontVelaGxRegular, fontVelaMedium } from "./fonts";
import { Slot } from "./ui/edge-slide";

const CQW = (px: number) => `${px / 13.3}cqw`;

interface MockupBox {
  left: number;
  top: number;
  width: number;
  height: number;
  /** A single pre-composited screenshot straight out of Figma (shell +
   * perspective-warped screen + notch already baked in as one PNG) — used
   * instead of the shell+overlay compositing below whenever it's available,
   * since it's pixel-exact by construction and sidesteps having to
   * reproduce Figma's own perspective/skew math in CSS. */
  fullImage?: string;
  /** inset of the perspective-screen sub-box, as CSS inset percentages */
  screenInset?: string;
  /** the screen image's own position within that sub-box, as percentages */
  screenRect?: { left: string; top: string; width: string; height: string };
  /** slight tilt on the screen image itself, matching the source photo's own perspective, in degrees */
  screenRotate?: number;
  /** Figma specifies this per mockup — some export with no object-fit class
   * (defaults to "fill", i.e. stretch to the box) and some explicitly set
   * "object-cover" (preserve aspect, crop). Must match the source exactly,
   * not assumed uniform across mockups. */
  screenFit?: "fill" | "cover";
  screen?: string;
}

interface Variant {
  productName: string;
  headline: ReactNode;
  badge: { icon: string; iconClassName: string; lines: [string, string] };
  mockup: MockupBox;
  ctaHref?: string;
}

// Shared slot geometry for the pieces both variants render at the same
// size — only the macbook (see anchorB below) differs per variant.
const LOGO_POS = { left: CQW(80), top: CQW(56) };
const BADGE_POS = { left: CQW(1047), top: CQW(47) };
const TEXT_BLOCK = { left: CQW(70), top: CQW(320), width: CQW(360) };

const VARIANTS: [Variant, Variant] = [
  {
    productName: "займы",
    headline: (
      <>
        <span className="text-[#00703E]">Платформа</span> инвестиций в займы
        для бизнеса, обеспеченные текущей дебиторской задолженностью
      </>
    ),
    badge: {
      icon: "/products-promo/bank-icon.svg",
      iconClassName: "h-[2.2556cqw] w-[2.4812cqw]",
      lines: ["Лицензия", "Центробанка РФ"],
    },
    ctaHref: "https://conomica-finance.ru/",
    mockup: {
      left: 750,
      top: 157,
      width: 643,
      height: 512.462,
      fullImage: "/products-promo/macbook-zaimy-full.png",
    },
  },
  {
    productName: "цессии",
    headline: (
      <>
        <span className="text-[#00703E]">Платформа</span> управления сделками
        по приобретению и взысканию истекшей дебиторской задолжености
      </>
    ),
    badge: {
      icon: "/hero/badge-skolkovo.svg",
      iconClassName: "h-[3.2331cqw] w-[3.2094cqw]",
      lines: ["Резидент", "Сколково"],
    },
    ctaHref: "https://cabinet.conomica.space/",
    mockup: {
      left: 731,
      top: 158,
      width: 669,
      height: 533.183,
      screenInset: "15.57% 10.61% 30.61% 32.29%",
      screenRect: { left: "2.84%", top: "7.65%", width: "89.41%", height: "87%" },
      screen: "/products-promo/perspective-cessii.png",
    },
  },
];

function anchorFor(mockup: MockupBox) {
  return { left: CQW(mockup.left), top: CQW(mockup.top), width: CQW(mockup.width), height: CQW(mockup.height) };
}

function InfoBadge({ icon, iconClassName, lines }: Variant["badge"]) {
  return (
    <div className="flex items-center gap-[1.8045cqw] rounded-[8px] bg-white px-[2.1053cqw] py-[1.203cqw] drop-shadow-[4px_4px_17px_rgba(0,0,0,0.11)]">
      <Asset src={icon} alt="" className={iconClassName} />
      <p className={`whitespace-nowrap text-[clamp(11px,1.3534cqw,20px)] leading-none tracking-[-0.04em] text-[#191919] ${fontVelaMedium}`}>
        {lines[0]}
        <br />
        {lines[1]}
      </p>
    </div>
  );
}

function MiniLogo({ product }: { product: string }) {
  return (
    <div className="flex items-center gap-[1.203cqw]">
      <Asset src="/hero/sis-icon.svg" alt="" className="h-[2.5778cqw] w-[2.2874cqw]" />
      <div className="flex flex-col items-start gap-[0.1504cqw]">
        <Asset src="/hero/product-wordmark.svg" alt="Conomica" className="h-[1.8916cqw] w-[11.07cqw]" />
        <p className={`text-[clamp(11px,1.203cqw,17.78px)] text-[#161616] ${fontVelaGxRegular}`}>{product}</p>
      </div>
    </div>
  );
}

function HeadlineCenter({ productName }: { productName: string }) {
  return (
    <div className={`text-center text-black ${fontVelaGxExtraBold}`}>
      <p className="text-[clamp(17.33px,3.9098cqw,57.78px)] leading-[0.95] tracking-[-0.03em]">Conomica</p>
      <p className={`text-[clamp(12.67px,2.8571cqw,42.22px)] leading-[0.98] tracking-[-0.03em] ${fontVelaGxBold}`}>{productName}</p>
    </div>
  );
}

function TextBlock({ headline, ctaHref }: { headline: ReactNode; ctaHref?: string }) {
  const CtaTag = ctaHref ? "a" : "button";
  return (
    <div className="flex flex-col items-start gap-[0.7519cqw]" style={{ width: TEXT_BLOCK.width }}>
      <p className={`text-[clamp(11px,2.1053cqw,31.11px)] leading-[0.95] tracking-[-0.03em] text-[#191919] ${fontVelaGxBold}`}>
        {headline}
      </p>
      <CtaTag
        {...(ctaHref ? { href: ctaHref, target: "_blank", rel: "noopener noreferrer" } : {})}
        className="flex h-[3.609cqw] w-[12.0301cqw] items-center justify-center rounded-[12px] bg-[#00703E] drop-shadow-[0px_2px_1px_rgba(0,0,0,0.04)] transition-colors hover:bg-[#0EAD66]"
      >
        <span className={`text-[clamp(11px,1.203cqw,17.78px)] leading-[1.2] tracking-[0.01em] text-white ${fontVelaMedium}`}>
          На платформу
        </span>
      </CtaTag>
    </div>
  );
}

/** Macbook shell (flipped horizontally) + a perspective screenshot fitted
 * into the pre-warped "Perspective N · 3d" cutout, exactly per Figma's own
 * percentage insets — those percentages are already relative to this same
 * box, so no manual px conversion is needed. When `fullImage` is set, skip
 * all that compositing and just render Figma's own flattened screenshot. */
function Macbook({ mockup }: { mockup: MockupBox }) {
  if (mockup.fullImage) {
    return <Asset src={mockup.fullImage} alt="" className="absolute inset-0 h-full w-full" />;
  }

  return (
    <div className="relative h-full w-full">
      <Asset src="/products-promo/macbook.png" alt="" className="absolute inset-0 h-full w-full -scale-x-100" />
      <div className="absolute overflow-hidden" style={{ inset: mockup.screenInset }}>
        <Asset
          src={mockup.screen!}
          alt=""
          fit={mockup.screenFit ?? "fill"}
          className="absolute"
          style={{
            left: mockup.screenRect!.left,
            top: mockup.screenRect!.top,
            width: mockup.screenRect!.width,
            height: mockup.screenRect!.height,
            rotate: mockup.screenRotate ? `${mockup.screenRotate}deg` : undefined,
          }}
        />
      </div>
      {/* webcam notch on the screen's top bezel */}
      <div
        className="absolute rounded-bl-[7px] rounded-br-[6px] bg-black"
        style={{ inset: "18.57% 37.37% 79.37% 55.75%" }}
      />
    </div>
  );
}

export interface HeroShowcaseProps {
  /** scroll distance the exit/enter transition plays over, in vh */
  scrollLength?: number;
}

export default function HeroShowcase({ scrollLength = 220 }: HeroShowcaseProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });

  const rawProgress = useTransform(scrollYProgress, [0.15, 0.85], [0, 1]);
  const progress = useTransform(rawProgress, (p) => (reduce ? 1 : p));

  return (
    <section ref={wrapRef} className="relative w-full" style={{ height: `${scrollLength}vh` }}>
      <div
        className="sticky top-0 flex h-screen w-full items-start justify-center overflow-hidden"
        // Centers the box the same way `items-center` would on ordinary
        // viewports, but caps the top gap at 120px — on a tall (e.g. 27"+)
        // monitor, true centering pushes the whole box, and the moment it
        // first scrolls into view, well below the fold, leaving a big
        // blank gap under the product cards until you scroll further.
        // The literal 584 here is just the box's reference height at the
        // 1440 breakpoint — an approximation for this centering math, not
        // pixel-critical now that the box's actual height is fluid.
        style={{ paddingTop: "clamp(0px, calc((100vh - 584px) / 2), 120px)" }}
      >
        <div
          className="relative mx-auto max-w-full overflow-hidden rounded-[8px] bg-white [container-type:size]"
          style={{ width: "93.3989cqw", aspectRatio: "1330 / 584" }}
        >
          <Slot
            direction="up"
            anchor={LOGO_POS}
            progress={progress}
            variants={VARIANTS}
            render={(v) => <MiniLogo product={v.productName} />}
          />
          <Slot
            direction="right"
            anchor={BADGE_POS}
            progress={progress}
            variants={VARIANTS}
            render={(v) => <InfoBadge {...v.badge} />}
          />
          <Slot
            direction="down"
            anchor={{ left: 0, top: 0, width: "100%", height: "100%" }}
            progress={progress}
            variants={VARIANTS}
            render={(v) => (
              <div className="flex h-full w-full items-center justify-center px-[4.812cqw]">
                <HeadlineCenter productName={v.productName} />
              </div>
            )}
          />
          <Slot
            direction="left"
            anchor={TEXT_BLOCK}
            progress={progress}
            variants={VARIANTS}
            render={(v) => <TextBlock headline={v.headline} ctaHref={v.ctaHref} />}
          />
          <Slot
            direction="right"
            anchor={anchorFor(VARIANTS[0].mockup)}
            anchorB={anchorFor(VARIANTS[1].mockup)}
            progress={progress}
            variants={VARIANTS}
            render={(v) => <Macbook mockup={v.mockup} />}
          />
        </div>
      </div>
    </section>
  );
}
