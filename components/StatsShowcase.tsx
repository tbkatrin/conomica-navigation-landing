"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { DecorativeCircleMark } from "./DecorativeCircle";
import { fontVelaBold, fontVelaGxExtraBold, fontVelaMedium } from "./fonts";

/**
 * "Conomica в цифрах" — per Figma node 329:1669. Reproduced with the
 * frame's own fixed 1440px coordinates (left/top per stat block, matching
 * Hero.tsx/GroupStructure.tsx's existing convention for pixel-exact Figma
 * layouts) since the design itself is authored as an absolute grid, not a
 * flow layout.
 *
 * The frame's own header (translucent nav pill) isn't reproduced here —
 * that's the global SiteHeader, already present on every page. The
 * cone-in-circle motif reuses DecorativeCircleMark (see DecorativeCircle.tsx)
 * rather than a second copy of the same animation, sized bigger here and
 * with the "sequential" line-travel variant (see that file's own doc
 * comment for both variants).
 *
 * Each stat block animates in on its own as it scrolls into view — entering
 * from a different side (bottom/left/right, cycling every 3 cards) and
 * continuing to drift gently as the section scrolls past, so every block
 * has its own independent parallax rather than a single shared effect.
 *
 * Fluid-scaling pass: positions/sizes in `cqw` against this file's 1440px
 * reference via the `CQW()` helper (see Footer.tsx's doc comment for the
 * technique writeup); font-sizes use `clamp(floor, Pcqw, ceiling)`,
 * tracking is in `em`. The scroll-parallax `DIRECTIONS` distances are also
 * pre-divided by 14.4 and fed into Framer Motion as `"Ncqw"` strings (same
 * trick Loader.tsx already uses for its own motion-driven positions), so
 * the drift distance scales with the container instead of staying a flat
 * px offset.
 */

const CQW = (px: number) => `${px / 14.4}cqw`;

interface Stat {
  /** small label above the big number, e.g. "более" — omitted when absent */
  prefix?: string;
  value: string;
  unit: string;
  description: ReactNode;
  left: number;
  top: number;
}

const STATS: Stat[] = [
  {
    value: "7.7",
    unit: "млрд",
    description: "было взыскано по приобретенному портфелю требований",
    left: 149,
    top: 128,
  },
  {
    prefix: "более",
    value: "700",
    unit: "сделок",
    description: "активный портфель, находящийся в текущем взыскании",
    left: 407,
    top: 128,
  },
  {
    value: "6.9",
    unit: "млрд",
    description: (
      <>
        возвращено бизнесу <br />в оборот с помощью продажи дебиторской задолженности
      </>
    ),
    left: 265,
    top: 326,
  },
  {
    value: "1.5",
    unit: "млрд",
    description: "заработали инвесторы после возврата инвестиций и оплаты комиссий",
    left: 545,
    top: 326,
  },
  {
    value: "2.3",
    unit: "млрд",
    description: "активный портфель, находящийся в текущем взыскании",
    left: 408,
    top: 553,
  },
  {
    prefix: "более",
    value: "1500",
    unit: "инвесторов",
    description: (
      <>
        участвовали в <br />
        финансировании сделок <br />
        на платформах
      </>
    ),
    left: 707,
    top: 554,
  },
];

// cycles bottom → left → right → bottom … per card index, each with its own
// entrance offset (where it travels in from) and exit drift (the subtle
// continued parallax once it's settled and the section keeps scrolling).
// Values are design-px/14.4 (this file's 1440px reference → cqw) so the
// drift distance scales with the container, same as everything else here.
const DIRECTIONS = [
  { x: 0, y: 64 / 14.4, exitX: 0, exitY: -18 / 14.4 }, // bottom
  { x: -64 / 14.4, y: 0, exitX: 16 / 14.4, exitY: 0 }, // left
  { x: 64 / 14.4, y: 0, exitX: -16 / 14.4, exitY: 0 }, // right
];

function StatBlock({ stat, index }: { stat: Stat; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const dir = DIRECTIONS[index % DIRECTIONS.length];

  const { scrollYProgress } = useScroll({
    target: ref,
    // 0 when the block's top touches the viewport's bottom (starts
    // animating in just before it's visible), 1 when its bottom leaves the
    // viewport's top (fully scrolled past) — own independent progress per
    // block, since each sits at a different point on the page.
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 0.35, 1], [`${dir.x}cqw`, "0cqw", `${dir.exitX}cqw`]);
  const y = useTransform(scrollYProgress, [0, 0.35, 1], [`${dir.y}cqw`, "0cqw", `${dir.exitY}cqw`]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <motion.div
      ref={ref}
      className="absolute border-l border-[#191919] px-[1.6667cqw]"
      style={{ left: CQW(stat.left), top: CQW(stat.top), width: "clamp(130px,11.25cqw,180px)", x, y, opacity }}
    >
      <div className="flex flex-col items-start gap-[0.5556cqw]">
        {stat.prefix && (
          <p className={`text-[clamp(11px,1.3889cqw,22.22px)] leading-[0.94] tracking-[-0.05em] text-[#353537] ${fontVelaBold}`}>
            {stat.prefix}
          </p>
        )}
        <p className={`text-[clamp(17.33px,3.6111cqw,57.78px)] leading-[0.95] tracking-[-0.03em] text-[#191919] ${fontVelaGxExtraBold}`}>
          {stat.value}
        </p>
        <p className={`text-[clamp(11px,1.3889cqw,22.22px)] leading-[0.94] tracking-[-0.05em] text-[#353537] ${fontVelaBold}`}>
          {stat.unit}
        </p>
      </div>
      <p className={`mt-[1.5972cqw] text-[clamp(11px,0.9722cqw,15.56px)] leading-none tracking-[-0.04em] text-[#353537] ${fontVelaMedium}`}>
        {stat.description}
      </p>
    </motion.div>
  );
}

export default function StatsShowcase() {
  return (
    <section className="relative z-10 mx-auto w-full max-w-[1600px] overflow-hidden bg-[#F5F5F5] [container-type:inline-size]">
      <div className="relative" style={{ minHeight: CQW(780), paddingBottom: CQW(72) }}>
        {STATS.map((stat, i) => (
          <StatBlock key={i} stat={stat} index={i} />
        ))}

        {/* the existing animated ring+cone mark, bigger here and with a
            single line travelling dot-to-dot instead of Offer's
            bidirectional fill */}
        <div className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: CQW(1027), top: CQW(380) }}>
          <DecorativeCircleMark size={CQW(340)} travel="sequential" />
        </div>
      </div>
    </section>
  );
}
