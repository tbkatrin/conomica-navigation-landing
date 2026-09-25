/**
 * LOADER — интро навигационного лендинга Conomica.
 * Порт анимации Figma "Navigation landing V1" / `Group 347`
 * (fileKey JI3xuwFG1gkfqdqiRLTYB0), кадры Default … Variant21.
 *
 * Последовательность (по вариантам макета):
 *   build     — кольцо рисуется 6 дугами, у каждой дуги — точка и подпись,
 *               в центре проступает лого группы компаний  (Default … Group 352)
 *   hold      — полное собранное состояние
 *   strip     — подписи и лого гаснут → чистое кольцо + 6 точек  (Variant19)
 *   spiral    — 6 дуг раскручиваются в вертушку, точки стягиваются
 *               к центру  (Variant20)
 *   collapse  — вертушка и точки схлопываются в одну белую точку  (Variant21)
 *   handoff   — Smart-Animate переход screen 0 → screen 1: фон
 *               `#0A4028` → `#E2E6EF`, точка `#F2FAF2` → `#0A4028`
 *   done      — оверлей снимается, открывая витрину (screen 2)
 *
 * «Экран с точкой» не существует отдельно — это один непрерывный оверлей,
 * который проигрывает всю анимацию и оба перехода.
 *
 * Autoplay один раз. При `prefers-reduced-motion` — оверлея нет вовсе.
 * Реализация — Framer Motion. Сцена орбиты — 1102 × 620, desktop-only, `cqw`.
 */

"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Transition,
} from "framer-motion";

import {
  ORBIT,
  RING_CENTER,
  RING_DIAMETER_CQW,
  STAGE_H,
  STAGE_W,
} from "./loader.data";

/* ── цвета из макета ── */
const GREEN = "#0A4028"; // фон screen 0 / точка screen 1
const LAVENDER = "#EEF2EC"; // фон screen 1 = верх градиента героя (бесшовный переход)
const WHITE_DOT = "#F2FAF2"; // точка screen 0

/* ── геометрия ── */
const RING_RADIUS_CQW = RING_DIAMETER_CQW / 2; // радиус орбиты, cqw
const DOT_HALF_CQW = 0.862; // половина точки (19/1102), cqw
const ARC_COUNT = 6;
/** порядок появления «спиц» при сборке — снизу против часовой (как в макете) */
const SPOKE_ORDER = [3, 4, 5, 0, 1, 2];

type Phase =
  "build" | "hold" | "strip" | "spiral" | "collapse" | "handoff" | "done";

/* ── тайминги фаз, мс ── */
const SEQUENCE: Array<[Phase, number]> = [
  ["build", 2200], // сборка кольца (дуга + точка + подпись по кругу) + лого
  ["hold", 450], // собранное состояние
  ["strip", 480], // подписи/лого гаснут → кольцо + точки (Variant19)
  ["spiral", 700], // раскрутка в вертушку, точки к центру (Variant20)
  ["collapse", 460], // схлопывание в белую точку (Variant21)
  ["handoff", 900], // screen 0 → screen 1 (перекрас точки и фона)
];

const ARC_R = 50; // радиус дуги в viewBox 100×100 (= радиус орбиты точек)

const r3 = (n: number) => Math.round(n * 1000) / 1000; // стабильно для SSR/CSR
const toRad = (d: number) => (d * Math.PI) / 180;

/** угловой размер дуги i (от точки i до точки i+1), град */
function arcSpan(i: number): number {
  const start = ORBIT[i].angle;
  const end =
    i === ARC_COUNT - 1 ? ORBIT[0].angle + 360 : ORBIT[i + 1].angle;
  return end - start;
}

/** длина дуги i в единицах viewBox — своя у каждой (точки расставлены неравномерно) */
const arcLen = (i: number) => (2 * Math.PI * ARC_R * arcSpan(i)) / 360;

/** дуга i как path: ровно от точки i до точки i+1 (по часовой) */
function arcPath(i: number): string {
  const a0 = toRad(ORBIT[i].angle - 90);
  const a1 = toRad(ORBIT[i].angle - 90 + arcSpan(i));
  const x0 = r3(50 + ARC_R * Math.cos(a0));
  const y0 = r3(50 + ARC_R * Math.sin(a0));
  const x1 = r3(50 + ARC_R * Math.cos(a1));
  const y1 = r3(50 + ARC_R * Math.sin(a1));
  const large = arcSpan(i) > 180 ? 1 : 0;
  return `M ${x0} ${y0} A ${ARC_R} ${ARC_R} 0 ${large} 1 ${x1} ${y1}`;
}

/** задержка появления спицы i при сборке, сек */
const spokeDelay = (i: number) => 0.2 + SPOKE_ORDER.indexOf(i) * 0.26;

export default function Loader() {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("build");

  // мгновенный пропуск интро для превью/отладки: `?intro=off`
  const [skip, setSkip] = useState(false);
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("intro") === "off") {
      setSkip(true);
    }
  }, []);

  // проигрываем последовательность фаз
  useEffect(() => {
    if (reduce || skip) {
      setPhase("done");
      return;
    }
    let idx = 0;
    let timer: number;
    const next = () => {
      if (idx >= SEQUENCE.length) {
        setPhase("done");
        return;
      }
      const [ph, dur] = SEQUENCE[idx++];
      setPhase(ph);
      timer = window.setTimeout(next, dur);
    };
    next();
    return () => window.clearTimeout(timer);
  }, [reduce, skip]);

  // блокировка скролла на время интро + сигнал «лоадер закончился»
  useEffect(() => {
    if (reduce || phase === "done") {
      document.body.style.overflow = "";
      document.dispatchEvent(new Event("conomica:loaded"));
      return;
    }
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [reduce, phase]);

  const isSpiral = phase === "spiral";
  const isCollapsePlus =
    phase === "collapse" || phase === "handoff" || phase === "done";
  const stripped = phase === "strip" || isSpiral || isCollapsePlus;
  const handoff = phase === "handoff";
  const dotVisible = phase === "collapse" || phase === "handoff";

  /* всё кольцо крутится и сжимается: strip → spiral (вертушка) → collapse */
  const ringSpin = isCollapsePlus
    ? { rotate: 320, scale: 0 }
    : isSpiral
      ? { rotate: 100, scale: 0.62 }
      : { rotate: 0, scale: 1 };
  const ringSpinT: Transition = isCollapsePlus
    ? { duration: 0.5, ease: "easeIn" }
    : isSpiral
      ? { duration: 0.75, ease: [0.45, 0, 0.35, 1] }
      : { duration: 0.4, ease: "easeOut" };

  /* доля скрытой части дуги: 0 — целая, >0 — короткая «лопасть» вертушки */
  const arcHidden = isSpiral ? 0.4 : isCollapsePlus ? 0.55 : 0;

  /* точки в вертушке подтянуты к центру сильнее дуг */
  const dotPull = isSpiral || isCollapsePlus ? 0.5 : 1;

  if (skip) return null;

  return (
    <AnimatePresence>
      {!reduce && phase !== "done" && (
        <motion.div
          key="loader"
          aria-hidden
          className="fixed inset-0 flex items-center justify-center overflow-hidden"
          style={{ zIndex: 100 }}
          initial={{ backgroundColor: GREEN }}
          animate={{ backgroundColor: handoff ? LAVENDER : GREEN }}
          exit={{ opacity: 0 }}
          transition={{
            backgroundColor: { duration: 0.5, ease: "easeInOut" },
            opacity: { duration: 0.4, ease: "easeOut" },
          }}
        >
          <div
            className="relative shrink-0 [container-type:inline-size]"
            style={{
              // сцена масштабируется шириной, а всё внутри — в cqw/%;
              // min() по vw и vh, чтобы сцена влезала и по высоте
              width: `min(${STAGE_W}px, 94vw, 158vh)`,
              aspectRatio: `${STAGE_W} / ${STAGE_H}`,
            }}
          >
            <div className="absolute inset-0">
              {/* ── кольцо (6 дуг + точки) — крутится и сжимается целиком ── */}
              <div
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${RING_CENTER.x}%`,
                  top: `${RING_CENTER.y}%`,
                  width: `${RING_DIAMETER_CQW}cqw`,
                  height: `${RING_DIAMETER_CQW}cqw`,
                }}
              >
                <motion.div
                  className="absolute inset-0 origin-center"
                  initial={{ rotate: 0, scale: 1 }}
                  animate={ringSpin}
                  transition={ringSpinT}
                >
                  {/* дуги — каждая ровно от точки i до точки i+1 */}
                  {Array.from({ length: ARC_COUNT }, (_, i) => (
                    <svg
                      key={i}
                      viewBox="0 0 100 100"
                      fill="none"
                      className="absolute inset-0 h-full w-full overflow-visible"
                    >
                      <motion.path
                        d={arcPath(i)}
                        stroke="rgba(255,255,255,0.85)"
                        strokeWidth={0.45}
                        strokeLinecap="round"
                        strokeDasharray={arcLen(i)}
                        initial={{ opacity: 0, strokeDashoffset: arcLen(i) }}
                        animate={{
                          opacity: 1,
                          strokeDashoffset: arcLen(i) * arcHidden,
                        }}
                        transition={{
                          opacity: {
                            duration: 0.3,
                            delay: phase === "build" ? spokeDelay(i) : 0,
                            ease: "easeOut",
                          },
                          strokeDashoffset: {
                            duration: phase === "build" ? 0.55 : 0.5,
                            delay: phase === "build" ? spokeDelay(i) : 0,
                            ease: "easeInOut",
                          },
                        }}
                      />
                    </svg>
                  ))}

                  {/* точки — дополнительно подтягиваются к центру в вертушке */}
                  <motion.div
                    className="absolute inset-0 origin-center"
                    initial={{ scale: 1 }}
                    animate={{ scale: dotPull }}
                    transition={ringSpinT}
                  >
                    {ORBIT.map((p, i) => {
                      // placed by direct trig (angle measured clockwise from
                      // 12 o'clock) rather than a rotated zero-size wrapper +
                      // negative margins — that combination let the browser's
                      // shrink-to-fit width for the auto-sized rotated wrapper
                      // drift slightly per angle, nudging dots off the ring.
                      const rad = (p.angle * Math.PI) / 180;
                      const dx = RING_RADIUS_CQW * Math.sin(rad);
                      const dy = -RING_RADIUS_CQW * Math.cos(rad);
                      return (
                        <div
                          key={i}
                          className="absolute"
                          style={{
                            left: `calc(50% + ${dx}cqw)`,
                            top: `calc(50% + ${dy}cqw)`,
                            width: "1.724cqw",
                            height: "1.724cqw",
                            marginLeft: `calc(-${DOT_HALF_CQW}cqw)`,
                            marginTop: `calc(-${DOT_HALF_CQW}cqw)`,
                          }}
                        >
                          <motion.span
                            className="block h-full w-full rounded-full bg-[#F2FAF2] drop-shadow-[0_0_10px_rgba(255,255,255,0.85)]"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                              delay: phase === "build" ? spokeDelay(i) + 0.05 : 0,
                              duration: 0.4,
                              ease: [0.34, 1.56, 0.64, 1],
                            }}
                          />
                        </div>
                      );
                    })}
                  </motion.div>
                </motion.div>
              </div>

              {/* ── подписи-ценности ── */}
              {ORBIT.map((p, i) => (
                <motion.div
                  key={i}
                  className={
                    "absolute flex items-center " +
                    (p.nowrap ? "left-1/2 whitespace-nowrap" : "")
                  }
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: stripped ? 0 : 1, y: 0 }}
                  transition={{
                    duration: stripped ? 0.3 : 0.5,
                    delay:
                      stripped || phase !== "build" ? 0 : spokeDelay(i) + 0.1,
                    ease: "easeOut",
                  }}
                  style={{
                    ...(p.nowrap ? { x: "-50%" } : null),
                    ...(p.nowrap
                      ? p.labelInset[0]
                        ? { top: `${p.labelInset[0]}%` }
                        : { bottom: `${p.labelInset[2]}%` }
                      : {
                          top: `${p.labelInset[0]}%`,
                          bottom: `${p.labelInset[2]}%`,
                          right: `${p.labelInset[1]}%`,
                          left: `${p.labelInset[3]}%`,
                        }),
                  }}
                >
                  <p
                    className={
                      "text-center font-medium uppercase leading-[1.24] tracking-[0.02em] text-white " +
                      (p.nowrap ? "" : "w-full")
                    }
                    style={{ fontSize: "1.27cqw" }}
                  >
                    {p.label}
                  </p>
                </motion.div>
              ))}

              {/* ── лого группы компаний ── */}
              <motion.div
                className="absolute left-1/2 top-1/2 flex items-center"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{
                  opacity: stripped ? 0 : 1,
                  scale: stripped ? 0.92 : 1,
                }}
                transition={{
                  duration: stripped ? 0.3 : 0.5,
                  delay: stripped || phase !== "build" ? 0 : 1.6,
                  ease: "easeOut",
                }}
                style={{ x: "-50%", y: "-50%", gap: "2.18cqw" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/cone-loader.svg"
                  alt=""
                  className="block h-auto shrink-0"
                  style={{ width: "6.35cqw" }}
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/wordmark-loader.svg"
                  alt="Conomica — группа компаний"
                  className="block h-auto shrink-0"
                  style={{ width: "18.24cqw" }}
                />
              </motion.div>
            </div>
          </div>

          {/* ── общая точка: screen 0 (белая) → screen 1 (зелёная), центр экрана ── */}
          <motion.span
            className="absolute left-1/2 top-1/2 size-[19px] rounded-full drop-shadow-[5px_5px_25.55px_#ffffff]"
            initial={{ opacity: 0, scale: 0.4, backgroundColor: WHITE_DOT }}
            animate={{
              opacity: dotVisible ? 1 : 0,
              scale: dotVisible ? 1 : 0.4,
              backgroundColor: handoff ? GREEN : WHITE_DOT,
            }}
            transition={{
              opacity: { duration: 0.3, delay: phase === "collapse" ? 0.2 : 0 },
              scale: { duration: 0.3, delay: phase === "collapse" ? 0.2 : 0 },
              backgroundColor: { duration: 0.5, ease: "easeInOut" },
            }}
            style={{ x: "-50%", y: "-50%" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
