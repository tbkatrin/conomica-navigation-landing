"use client";

/**
 * Cross-promo showcase right after Hero — per Figma node 232:8618
 * (232:8617 = займы content, 232:8619 = цессии content). Per-element
 * edge-exit/edge-enter mechanic (see ui/edge-slide), and "Платформа" is
 * accented green in the headline.
 *
 * Each variant has a row of four info badges at the top-left (no mini logo
 * any more), its own text-block position, and a MacBook mockup composited
 * from the shared shell + that variant's dashboard screenshot (the same
 * "Perspective N · 3d" cutouts the Hero product cards use). The two
 * variants' mockup boxes differ slightly in size and position, so the
 * macbook, badge-row and text-block slots each use `anchorB` to give every
 * variant its own exact rest box.
 *
 * Fluid-scaling: the box is sized as `96.9388cqw` of the OUTER page wrapper
 * (1330/1372 — its own proportion of that wrapper's Figma width, see
 * app/page.tsx), with `aspectRatio` locking its height to that fluid
 * width. The box is itself a nested `[container-type:size]` context, so
 * everything inside (positions/sizes via the `CQW()` helper) scales in `cqw`
 * against *its own* rendered width — 1330px is this file's own reference
 * (see Footer.tsx's doc comment for the general technique). Font-sizes use
 * `clamp(floor, Pcqw, ceiling)`, tracking is in `em`. ui/edge-slide.tsx's
 * travel distance is `100cqw`/`100cqh` (one full box width/height).
 */

import { useScroll, useTransform, useReducedMotion } from "motion/react";
import { useRef, type CSSProperties, type ReactNode } from "react";
import Asset from "./Asset";
import { fontVelaGxBold, fontVelaGxExtraBold, fontVelaMedium } from "./fonts";
import { Slot } from "./ui/edge-slide";

const CQW = (px: number) => `${px / 13.3}cqw`;

// every badge in the top row shares one height (the tallest design badge)
const BADGE_HEIGHT = 76;

interface BadgeSpec {
  icon: { src: string; w: number; h: number; box?: number };
  text: string;
  /** fixed text column width in px (text wraps inside it) */
  textWidth?: number;
  /** icon/text gap in px */
  gap?: number;
  /** horizontal padding in px */
  px?: number;
  width?: number;
}

interface MockupBox {
  left: number;
  top: number;
  width: number;
  height: number;
  /** extra inset wrapping shell+screen together (only the цессии mockup) */
  groupInset?: string;
  screenInset: string;
  screenRadius?: number;
  screenRect: { left: string; top: string; width: string; height: string };
  notchInset: string;
  screen: string;
}

interface Variant {
  productName: string;
  headline: ReactNode;
  badges: BadgeSpec[];
  badgeRow: { left: number; top: number };
  textBlock: { left: number; top: number; width: number };
  mockup: MockupBox;
  ctaHref?: string;
}

const VARIANTS: [Variant, Variant] = [
  {
    productName: "займы",
    headline: (
      <>
        <span className="text-[#00703E]">Платформа</span> инвестиций в займы
        для бизнеса, обеспеченные текущей дебиторской задолженностью
      </>
    ),
    badgeRow: { left: 57, top: 52 },
    badges: [
      { icon: { src: "/products-promo/bank-icon.svg", w: 33, h: 30.6291 }, text: "Лицензия \nЦентробанка РФ" },
      { icon: { src: "/products-promo/badge-unique-solutions.svg", w: 44, h: 44 }, text: "Уникальные продуктовые решения", textWidth: 187 },
      { icon: { src: "/products-promo/badge-experience.svg", w: 29.25, h: 32.3333, box: 37 }, text: "Более 9 лет \nопыт работы  команды", gap: 24 },
      { icon: { src: "/products-promo/badge-it-solution.svg", w: 38, h: 35 }, text: "Собственное безопасное \nIT-решение", width: 303 },
    ],
    textBlock: { left: 76, top: 335, width: 397 },
    ctaHref: "https://conomica-finance.ru/",
    mockup: {
      left: 749,
      top: 177,
      width: 643,
      height: 512.462,
      screenInset: "17.37% 13.22% 31.31% 31.42%",
      screenRadius: 36,
      screenRect: { left: "4.29%", top: "3.88%", width: "92.41%", height: "91.46%" },
      notchInset: "18.57% 37.37% 79.37% 55.75%",
      screen: "/products-promo/dashboard-money.png",
    },
  },
  {
    productName: "цессии",
    headline: (
      <>
        <span className="text-[#00703E]">Платформа</span> управления
        <br />
        сделками по приобретению и взысканию истекшей
        <br />
        дебиторской задолженности
      </>
    ),
    badgeRow: { left: 64, top: 61 },
    badges: [
      { icon: { src: "/hero/badge-skolkovo.svg", w: 42.6846, h: 43 }, text: "Резидент \nСколково", px: 29 },
      { icon: { src: "/products-promo/badge-valuation.svg", w: 41.4999, h: 41.5, box: 40 }, text: "Более 9 лет опыт в оценке и взыскании", textWidth: 229 - 64, gap: 24 },
      { icon: { src: "/products-promo/badge-industry-leader.svg", w: 48, h: 48 }, text: "Лидер отрасли в сегменте", textWidth: 123 },
      { icon: { src: "/products-promo/badge-crm.svg", w: 42, h: 42 }, text: "Собственная уникальная CRM-система", textWidth: 208 },
    ],
    textBlock: { left: 64, top: 308, width: 320 },
    ctaHref: "https://cabinet.conomica.space/",
    mockup: {
      left: 732,
      top: 145,
      width: 669,
      height: 533.183,
      groupInset: "2.06% -0.45% -2.06% 0.45%",
      screenInset: "15.57% 10.61% 30.61% 32.29%",
      screenRect: { left: "2.84%", top: "7.65%", width: "89.41%", height: "87%" },
      notchInset: "20.63% 36.92% 77.31% 56.2%",
      screen: "/products-promo/dashboard-overview.png",
    },
  },
];

function anchorFor(mockup: MockupBox): CSSProperties {
  return { left: CQW(mockup.left), top: CQW(mockup.top), width: CQW(mockup.width), height: CQW(mockup.height) };
}

function Badge({ spec }: { spec: BadgeSpec }) {
  const { icon } = spec;
  const iconBox = icon.box ?? null;
  return (
    <div
      className="flex items-center justify-center rounded-[8px] bg-white drop-shadow-[4px_4px_17px_rgba(0,0,0,0.11)]"
      style={{
        height: CQW(BADGE_HEIGHT),
        width: spec.width ? CQW(spec.width) : undefined,
        padding: `${CQW(16)} ${CQW(spec.px ?? 28)}`,
        gap: CQW(spec.gap ?? 16),
      }}
    >
      <div
        className="flex shrink-0 items-center justify-center"
        style={iconBox ? { width: CQW(iconBox), height: CQW(iconBox) } : undefined}
      >
        <Asset src={icon.src} alt="" className="shrink-0" style={{ width: CQW(icon.w), height: CQW(icon.h) }} />
      </div>
      <p
        className={`whitespace-pre-line t-body leading-[1.1]! text-[#191919] ${fontVelaMedium}`}
        style={{ width: spec.textWidth ? CQW(spec.textWidth) : undefined, whiteSpace: spec.textWidth ? undefined : "pre" }}
      >
        {spec.text}
      </p>
    </div>
  );
}

function BadgeRow({ badges }: { badges: BadgeSpec[] }) {
  return (
    <div className="flex items-center" style={{ gap: CQW(16) }}>
      {badges.map((b) => (
        <Badge key={b.text} spec={b} />
      ))}
    </div>
  );
}

function HeadlineCenter({ productName }: { productName: string }) {
  return (
    <div className={`text-center text-black ${fontVelaGxExtraBold}`}>
      <p className="t-h1">Conomica</p>
      <p className={`t-h2 ${fontVelaGxBold}`}>{productName}</p>
    </div>
  );
}

function TextBlock({ headline, ctaHref }: { headline: ReactNode; ctaHref?: string }) {
  const CtaTag = ctaHref ? "a" : "button";
  return (
    <div className="flex w-full flex-col items-start gap-[0.7519cqw]">
      <p className={`t-h3 text-[#191919] ${fontVelaGxBold}`}>
        {headline}
      </p>
      <CtaTag
        {...(ctaHref ? { href: ctaHref, target: "_blank", rel: "noopener noreferrer" } : {})}
        className="flex h-[3.609cqw] w-[12.0301cqw] items-center justify-center rounded-[12px] bg-[#00703E] drop-shadow-[0px_2px_1px_rgba(0,0,0,0.04)] transition-colors hover:bg-[#0EAD66]"
      >
        <span className={`t-button text-white ${fontVelaMedium}`}>
          На платформу
        </span>
      </CtaTag>
    </div>
  );
}

/** Macbook shell (flipped horizontally) + a dashboard screenshot fitted
 * into the pre-warped "Perspective N · 3d" cutout, exactly per Figma's own
 * percentage insets — those percentages are already relative to this same
 * box, so no manual px conversion is needed. */
function Macbook({ mockup }: { mockup: MockupBox }) {
  const body = (
    <>
      <Asset src="/products-promo/macbook.png" alt="" className="absolute inset-0 h-full w-full -scale-x-100" />
      <div
        className="absolute overflow-hidden"
        style={{ inset: mockup.screenInset, borderRadius: mockup.screenRadius ? CQW(mockup.screenRadius) : undefined }}
      >
        <Asset src={mockup.screen} alt="" fit="fill" className="absolute" style={mockup.screenRect} />
      </div>
    </>
  );

  return (
    <div className="relative h-full w-full">
      {mockup.groupInset ? (
        <div className="absolute" style={{ inset: mockup.groupInset }}>
          {body}
        </div>
      ) : (
        body
      )}
      {/* webcam notch on the screen's top bezel */}
      <div
        className="absolute bg-black"
        style={{
          inset: mockup.notchInset,
          borderBottomLeftRadius: CQW(7),
          borderBottomRightRadius: CQW(6),
        }}
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

  const [a, b] = VARIANTS;
  const badgeAnchor = (v: Variant): CSSProperties => ({ left: CQW(v.badgeRow.left), top: CQW(v.badgeRow.top) });
  const textAnchor = (v: Variant): CSSProperties => ({
    left: CQW(v.textBlock.left),
    top: CQW(v.textBlock.top),
    width: CQW(v.textBlock.width),
  });

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
          style={{ width: "96.9388cqw", aspectRatio: "1330 / 584", "--ref": 13.3 } as React.CSSProperties}
        >
          <Slot
            direction="up"
            anchor={badgeAnchor(a)}
            anchorB={badgeAnchor(b)}
            progress={progress}
            variants={VARIANTS}
            render={(v) => <BadgeRow badges={v.badges} />}
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
            anchor={textAnchor(a)}
            anchorB={textAnchor(b)}
            progress={progress}
            variants={VARIANTS}
            render={(v) => <TextBlock headline={v.headline} ctaHref={v.ctaHref} />}
          />
          <Slot
            direction="right"
            anchor={anchorFor(a.mockup)}
            anchorB={anchorFor(b.mockup)}
            progress={progress}
            variants={VARIANTS}
            render={(v) => <Macbook mockup={v.mockup} />}
          />
        </div>
      </div>
    </section>
  );
}
