// Built using Hyperiux Vault: https://vault.hyperiux.com

"use client";

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useMotionValueEvent,
  type MotionValue,
} from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { fontVelaBold, fontVelaGxBold, fontVelaMedium } from "@/components/fonts";

// Card size is fixed px, matching the reference end-state frame exactly
// (node 280:1606) — 258px wide, height varies per card with its own content
// (140/142/171px), not a single uniform height.
const CARD_WIDTH_PX = 258;
// Mobile falls back to a single uniform stacked-column height.
const MOBILE_CARD_HEIGHT_PX = 180;

// Backdrop rings behind the headline/cards, per Figma node 278:1566 — TWO
// overlapping thin grey circles (a Venn shape), each with 6 evenly spaced
// grey dots. Sized slightly smaller than the reference's own ~781px
// circles, and offset from each other by the same proportion the reference
// offsets its two circle centres (~256.7px horizontally, 126.2px
// vertically at the reference's own 781px scale).
const RING_SIZE = 650;
const RING_DOT_RADIUS = 11.4;
const RING_DOTS = 6;
const RING_OFFSET = { x: (256.7 * RING_SIZE) / 782 / 2, y: (126.2 * RING_SIZE) / 782 / 2 };

function ringDotPoint(i: number, center: number, radius: number) {
  const angle = (i / RING_DOTS) * Math.PI * 2 - Math.PI / 2;
  return { x: center + radius * Math.cos(angle), y: center + radius * Math.sin(angle) };
}

function BackdropRing({ offsetX = 0, offsetY = 0 }: { offsetX?: number; offsetY?: number }) {
  const center = RING_SIZE / 2;
  const radius = RING_SIZE / 2 - RING_DOT_RADIUS;
  const dots = Array.from({ length: RING_DOTS }, (_, i) => ringDotPoint(i, center, radius));

  return (
    <svg
      viewBox={`0 0 ${RING_SIZE} ${RING_SIZE}`}
      className="absolute shrink-0"
      style={{
        width: RING_SIZE,
        height: RING_SIZE,
        left: `calc(50% + ${offsetX}px - ${RING_SIZE / 2}px)`,
        top: `calc(50% + ${offsetY}px - ${RING_SIZE / 2}px)`,
      }}
    >
      <circle cx={center} cy={center} r={radius} fill="none" stroke="#D8D8D8" strokeWidth={1} />
      {dots.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={RING_DOT_RADIUS} fill="#D8D8D8" />
      ))}
    </svg>
  );
}

function BackdropRings() {
  return (
    <div className="relative h-full w-full">
      <BackdropRing offsetX={-RING_OFFSET.x} offsetY={-RING_OFFSET.y} />
      <BackdropRing offsetX={RING_OFFSET.x} offsetY={RING_OFFSET.y} />
    </div>
  );
}

// Target x/y are fixed px offsets from the stage's centre, matching the
// reference end-state frame's own absolute coordinates exactly (node
// 280:1606) — kept as fixed px, not %, so the cluster's footprint doesn't
// stretch to fill a stage wider than that reference frame. Card
// *content/style* (flat #f5f5f5, inline number+unit) matches the updated
// Figma grid node 211:3180: https://www.figma.com/design/XRkFuHyybWtSpFautPPDwx/Landing-conomica.ru?node-id=211-3180
// array order = stack order, back (z 2) -> front (z 9)
const CARDS: StackSpreadCard[] = [
  // top-left (NW) — сделок
  {
    stat: {
      value: ">700",
      unit: "сделок",
      description: "проведено с помощью наших платформ",
    },
    stackOffset: { x: -8, y: -10 },
    stackRotate: -18,
    target: { x: 352.5, y: -155, rotate: 0, w: CARD_WIDTH_PX, h: 140 },
    targetSm: { x: -22, y: -40 },
    z: 2,
  },
  // top-right (NE) — взыскано
  {
    stat: {
      value: "7.7",
      unit: "млрд",
      description: "было взыскано по приобретенному портфелю требований",
    },
    stackOffset: { x: 14, y: -10 },
    stackRotate: 20,
    target: { x: -355.5, y: -107, rotate: 0, w: CARD_WIDTH_PX, h: 142 },
    targetSm: { x: 22, y: -40 },
    z: 3,
  },
  // mid-left (W) — срок оборачиваемости
  {
    stat: {
      value: "8",
      unit: "месяцев",
      description: "средний срок оборачиваемости средств (срок цикла взыскания)",
    },
    stackOffset: { x: -16, y: 0 },
    stackRotate: -4,
    target: { x: 404.5, y: 19.5, rotate: 0, w: CARD_WIDTH_PX, h: 171 },
    targetSm: { x: -22, y: -19 },
    z: 4,
  },
  // top-centre (N) — возвращено бизнесу
  {
    stat: {
      value: "6.9",
      unit: "млрд",
      description: (
        <>
          возвращено бизнесу <br /> в оборот с помощью продажи дебиторской
          задолженности
        </>
      ),
    },
    stackOffset: { x: 1, y: -10 },
    stackRotate: -2,
    target: { x: -168.5, y: -208, rotate: 0, w: CARD_WIDTH_PX, h: 142 },
    targetSm: { x: 22, y: -19 },
    z: 5,
  },
  // mid-right (E) — активный портфель
  {
    stat: {
      value: "2.3",
      unit: "млрд",
      description: "активный портфель, находящийся в текущем взыскании",
    },
    stackOffset: { x: 18, y: 1 },
    stackRotate: 6,
    target: { x: -356.5, y: 77, rotate: 0, w: CARD_WIDTH_PX, h: 142 },
    targetSm: { x: -22, y: 20 },
    z: 6,
  },
  // bottom-left (SW) — инвесторов
  {
    stat: {
      value: ">900",
      unit: "инвесторов",
      description: (
        <>
          участвовали в
          <br />
          со-финансировании сделок
          <br />
          на платформа
        </>
      ),
    },
    stackOffset: { x: -6, y: 10 },
    stackRotate: 6,
    target: { x: 107.5, y: -209, rotate: 0, w: CARD_WIDTH_PX, h: 140 },
    targetSm: { x: 22, y: 20 },
    z: 7,
  },
  // bottom-centre (S) — заработали инвесторы
  {
    stat: {
      value: "1.5",
      unit: "млрд",
      description:
        "заработали инвесторы после возврата инвестиций и оплаты комиссий",
    },
    stackOffset: { x: 8, y: 7 },
    stackRotate: 3,
    target: { x: -144.5, y: 199, rotate: 0, w: CARD_WIDTH_PX, h: 142 },
    targetSm: { x: -22, y: 40 },
    z: 8,
  },
  // bottom-right (SE) — ROI
  {
    stat: {
      value: ">30%",
      unit: "ROI",
      description: (
        <>
          показатель доходности ROI (Return of Investment) в сделках
          <br /> инвесторов
        </>
      ),
    },
    stackOffset: { x: 20, y: 12 },
    stackRotate: -7,
    target: { x: 178.5, y: 162.5, rotate: 0, w: CARD_WIDTH_PX, h: 171 },
    targetSm: { x: 22, y: 40 },
    z: 9,
  },
];

// ---------------------------------------------------------------------------
// Mechanism
// ---------------------------------------------------------------------------

// Scroll progress where the cluster starts scattering and where it finishes.
const SCATTER_START = 0.13;
const SCATTER_END = 0.63;

const PARALLAX_X = 2.6;
const PARALLAX_Y = 2.2;
const PARALLAX_SPRING = { stiffness: 90, damping: 22, mass: 0.6 };
const parallaxDepth = (i: number, total: number) =>
  total <= 1 ? 1 : 0.55 + (i / (total - 1)) * 0.75;

const RESPONSIVE = {
  desktop: {
    scale: null as number | null,
    small: false,
    colX: null as number | null,
    card: null as { w: number; h: number } | null,
  },
  small: {
    scale: 0.72,
    small: true,
    colX: 22,
    card: { w: 40, h: MOBILE_CARD_HEIGHT_PX },
  },
};

function useResponsive() {
  const [r, setR] = useState(RESPONSIVE.desktop);
  useEffect(() => {
    // Touch vs. mouse, not raw width: a narrow but mouse-driven frame (21st
    // preview, split editor) keeps the desktop scatter + pointer parallax;
    // only real touch devices drop to the stacked column layout.
    const mq = window.matchMedia("(pointer: coarse)");
    const read = () => setR(mq.matches ? RESPONSIVE.small : RESPONSIVE.desktop);
    read();
    mq.addEventListener("change", read);
    return () => mq.removeEventListener("change", read);
  }, []);
  return r;
}

function usePointerParallax(active: boolean, enabled: boolean) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, PARALLAX_SPRING);
  const y = useSpring(rawY, PARALLAX_SPRING);

  useEffect(() => {
    if (!enabled) return;

    if (!active) {
      rawX.set(0);
      rawY.set(0);
      return;
    }

    const onMove = (event: PointerEvent) => {
      rawX.set((event.clientX / window.innerWidth) * 2 - 1);
      rawY.set((event.clientY / window.innerHeight) * 2 - 1);
    };
    const onLeave = () => {
      rawX.set(0);
      rawY.set(0);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [active, enabled, rawX, rawY]);

  return { x, y };
}

export interface StackSpreadStat {
  value: ReactNode;
  /** optional unit word rendered inline right after the value, e.g. "млрд" */
  unit?: ReactNode;
  description: ReactNode;
}

export interface StackSpreadTarget {
  /** px offset from the stage's centre (desktop) — % of container width on mobile, via targetSm */
  x: number;
  /** px offset from the stage's centre (desktop) — % of container height on mobile, via targetSm */
  y: number;
  rotate: number;
  scale?: number;
  /** px — fixed card width, matching the Figma reference exactly */
  w: number;
  /** px — each card's own height, matching the Figma reference (varies per card) */
  h: number;
}

export interface StackSpreadCard {
  stat: StackSpreadStat;
  target: StackSpreadTarget;
  /** final x/y (% of container) for tablet + mobile; falls back to `target` */
  targetSm?: { x: number; y: number };
  /** angle while clustered */
  stackRotate?: number;
  /** offset while clustered (% of container) */
  stackOffset?: { x: number; y: number };
  /** paint order, higher on top */
  z?: number;
}

function Card({
  card,
  progress,
  reduce,
  clusterRotation,
  scaleMul,
  isSmall,
  colX,
  fixedCard,
  stackScale,
  cardRadius,
  pointer,
  depth,
  containerWidth,
  containerHeight,
}: {
  card: StackSpreadCard;
  progress: MotionValue<number>;
  reduce: boolean | null;
  clusterRotation: boolean;
  /** uniform rest-scale for every card; null = use each card's own scale */
  scaleMul: number | null;
  isSmall: boolean;
  colX: number | null;
  fixedCard: { w: number; h: number } | null;
  /** scale of the cards while clustered, before the scatter */
  stackScale: number;
  /** corner radius on each card, in px (desktop) */
  cardRadius: number;
  pointer: { x: MotionValue<number>; y: MotionValue<number> };
  depth: number;
  /** measured width/height (px) of the sticky stage, used to turn the
   * %-based x/y offsets into real pixels below */
  containerWidth: number;
  containerHeight: number;
}) {
  const { stat, target } = card;

  const flat = reduce === true;
  const stackRotate = flat ? 0 : clusterRotation ? card.stackRotate ?? 0 : 0;
  const stackOffset = card.stackOffset ?? { x: 0, y: 0 };
  const restScale = scaleMul ?? target.scale ?? 1;

  // final resting spot: column grid on small screens, scatter on desktop
  const sm = isSmall && card.targetSm ? card.targetSm : null;
  const endX = sm
    ? colX != null
      ? Math.sign(sm.x) * colX
      : sm.x
    : target.x;
  const endY = sm ? sm.y : target.y;
  const endRotate = flat || isSmall ? 0 : target.rotate;

  // -50% keeps card centred on its anchor. Note: percentages inside the
  // CSS `translate` property resolve against the ELEMENT'S OWN box, not
  // the containing block (unlike `width`/`left`) — so offsets are computed
  // as real px and passed as literal `px` values below.
  //
  // The clustered stack phase (stackOffset) is still authored as a % of
  // the container — it's a tiny jumble near center, fine to scale with
  // viewport. The scattered end state (target.x/y) is authored as *fixed
  // px* matching the reference layout's own absolute coordinates exactly
  // (card size is fixed px too — see CARD_WIDTH_PX) — on mobile it falls
  // back to the %-based column layout instead, via targetSm/colX.
  const translate = useTransform(
    [progress, pointer.x, pointer.y],
    ([p, px, py]: number[]) => {
      const stackXPx = (stackOffset.x / 100) * containerWidth;
      const stackYPx = (stackOffset.y / 100) * containerHeight;
      const endXPx = isSmall ? (endX / 100) * containerWidth : endX;
      const endYPx = isSmall ? (endY / 100) * containerHeight : endY;
      const tx = stackXPx + (endXPx - stackXPx) * p;
      const ty = stackYPx + (endYPx - stackYPx) * p;
      const drift = depth * p;
      // parallax drift is authored as a small % of the container, same as
      // before — convert it to px here rather than folding it into tx/ty.
      const driftXPx = ((px * PARALLAX_X * drift) / 100) * containerWidth;
      const driftYPx = ((py * PARALLAX_Y * drift) / 100) * containerHeight;
      const dxPx = tx - driftXPx;
      const dyPx = ty - driftYPx;
      return `calc(-50% + ${dxPx}px) calc(-50% + ${dyPx}px)`;
    },
  );
  const rotate = useTransform(progress, [0, 1], [stackRotate, endRotate]);
  const scale = useTransform(progress, [0, 1], [stackScale, restScale]);

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 will-change-transform"
      style={{
        width: fixedCard ? `${fixedCard.w}%` : `${target.w}px`,
        height: `${fixedCard ? fixedCard.h : target.h}px`,
        zIndex: card.z ?? 1,
        translate,
        rotate,
        scale,
      }}
    >
      <CardFace stat={stat} cardRadius={cardRadius} />
    </motion.div>
  );
}

function CardFace({
  stat,
  cardRadius,
}: {
  stat: StackSpreadStat;
  cardRadius: number;
}) {
  return (
    <div
      className="flex h-full w-full items-start gap-[2px] overflow-hidden bg-white px-[16px] py-[32px] drop-shadow-[4px_4px_17px_rgba(0,0,0,0.11)]"
      style={{ borderRadius: `${cardRadius}px` }}
    >
      <span
        className={`shrink-0 text-[32px] leading-[0.94] tracking-[-1.6px] text-[#00703E] ${fontVelaBold}`}
      >
        {stat.value}
      </span>
      <div className="flex min-w-0 flex-1 flex-col items-start gap-[8px] text-[#191919]">
        {stat.unit && (
          <span
            className={`w-full text-[20px] leading-[0.94] tracking-[-1px] ${fontVelaBold}`}
          >
            {stat.unit}
          </span>
        )}
        <p
          className={`w-full text-[14px] leading-none tracking-[-0.56px] ${fontVelaMedium}`}
        >
          {stat.description}
        </p>
      </div>
    </div>
  );
}

interface StackSpreadStageProps {
  cards: StackSpreadCard[];
  /** scatter scroll distance, in vh */
  scrollLength?: number;
  bgColor?: string;
  /** fan the clustered stack (default) or start flat */
  clusterRotation?: boolean;
  /** scale of the cards while clustered, before the scatter */
  stackScale?: number;
  /** corner radius on each card, in px (desktop only — mobile keeps its responsive radius) */
  cardRadius?: number;
  /** color of the centre headline and subtitle */
  textColor?: string;
  /** scroll progress (0-1) where the centre text starts fading in */
  textFadeStart?: number;
}

function StackSpreadStage({
  cards,
  scrollLength = 110,
  bgColor = "#ffffff",
  clusterRotation = true,
  stackScale = 0.82,
  cardRadius = 12,
  textColor = "#212121",
  textFadeStart = 0.3,
}: StackSpreadStageProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scale: scaleMul, small: isSmall, colX, card: fixedCard } =
    useResponsive();

  // Measured width of the stage — lets Card convert its %-based x/y offsets
  // into real px (see the comment on `translate` in Card).
  const [containerWidth, setContainerWidth] = useState(0);
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      setContainerWidth(entry.contentRect.width);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Height for the y offsets: the sticky stage is always exactly one
  // viewport tall (`h-screen`), so window height is the right measurement
  // — not the outer section's height, which is `scrollLength` vh tall.
  const [containerHeight, setContainerHeight] = useState(0);
  useEffect(() => {
    const read = () => setContainerHeight(window.innerHeight);
    read();
    window.addEventListener("resize", read);
    return () => window.removeEventListener("resize", read);
  }, []);

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    // "start end" (not "start start") — progress 0 is when the section's
    // top just touches the viewport's bottom, i.e. scattering can begin
    // while the section is still scrolling into view, before the sticky
    // pin even engages, rather than waiting for it to fully pin first.
    offset: ["start end", "end end"],
  });

  // hold, scatter, then settle
  const progress = useTransform(
    scrollYProgress,
    [0, SCATTER_START, SCATTER_END, 1],
    [0, 0, 1, 1],
  );

  // centre text always fades in on scroll; the scale-in is dropped only when
  // reduced motion is confirmed (`true`), not on the null SSR value.
  const [spread, setSpread] = useState(false);
  useMotionValueEvent(progress, "change", (p) => {
    setSpread((was) => (was ? p > 0.985 : p >= 0.999));
  });
  const parallaxEnabled = reduce !== true && !isSmall;
  const pointer = usePointerParallax(spread, parallaxEnabled);

  const noScale = reduce === true;
  const copyOpacity = useTransform(progress, [textFadeStart, textFadeStart + 0.35], [0, 1]);
  const copyScale = useTransform(progress, [textFadeStart, 0.9], [0.85, 1]);

  return (
    <section
      ref={wrapRef}
      className="relative w-full"
      style={{ height: `${scrollLength}vh`, backgroundColor: bgColor }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* backdrop rings, behind both the text and the cards — per Figma
            node 278:1566: two overlapping thin grey circles, each with 6
            evenly spaced grey dots, straddling the same point the cards
            scatter around */}
        {!isSmall && (
          <motion.div
            className="pointer-events-none absolute inset-0 z-[3]"
            style={{ opacity: copyOpacity }}
          >
            <BackdropRings />
          </motion.div>
        )}

        {/* centre text */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-[5] flex flex-col items-center justify-center px-6 text-center max-md:px-8"
          style={{
            opacity: copyOpacity,
            scale: noScale ? 1 : copyScale,
          }}
        >
          <h2
            className={`text-[38px] leading-[0.98] tracking-[-0.03em] ${fontVelaGxBold}`}
            style={{ color: textColor }}
          >
            Conomica в цифрах
          </h2>
        </motion.div>

        {/* scattering cards */}
        <div className="absolute inset-0 z-10">
          {cards.map((card, i) => (
            <Card
              key={i}
              card={card}
              progress={progress}
              reduce={reduce}
              clusterRotation={clusterRotation}
              scaleMul={scaleMul}
              isSmall={isSmall}
              colX={colX}
              fixedCard={fixedCard}
              stackScale={stackScale}
              cardRadius={cardRadius}
              pointer={pointer}
              depth={parallaxEnabled ? parallaxDepth(i, cards.length) : 0}
              containerWidth={containerWidth}
              containerHeight={containerHeight}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export interface StackSpreadProps {
  /** scatter scroll distance, in vh */
  scrollLength?: number;
  bgColor?: string;
  /** fan the clustered stack (default) or start flat */
  clusterRotation?: boolean;
  /** scale of the cards while clustered, before the scatter */
  stackScale?: number;
  /** corner radius on each card, in px (desktop only — mobile keeps its responsive radius) */
  cardRadius?: number;
  /** color of the centre headline and subtitle */
  textColor?: string;
  /** scroll progress (0-1) where the centre text starts fading in */
  textFadeStart?: number;
}

export default function StackSpread({
  scrollLength = 110,
  bgColor = "#ffffff",
  clusterRotation = true,
  stackScale = 0.82,
  cardRadius = 12,
  textColor = "#212121",
  textFadeStart = 0.3,
}: StackSpreadProps) {
  return (
    <StackSpreadStage
      cards={CARDS}
      scrollLength={scrollLength}
      bgColor={bgColor}
      clusterRotation={clusterRotation}
      stackScale={stackScale}
      cardRadius={cardRadius}
      textColor={textColor}
      textFadeStart={textFadeStart}
    />
  );
}
