"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { fontVelaGxBold, fontVelaMedium } from "@/components/fonts";

export interface CarouselItem {
  id: string;
  title: string;
  description: string;
  tag?: string;
}

export interface CircularCarouselProps {
  items: CarouselItem[];
  activeIndex?: number;
  onActiveChange?: (index: number) => void;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  className?: string;
}

// Exactly 2 inactive cards fan out on each side of the active pair, so
// 6 slots are visible in total regardless of how many items exist.
const SIDE_COUNT = 2;
// Fixed gap between the two active cards' edges, in px (not scaled with
// the container — the user asked for exactly 16px).
const ACTIVE_GAP = 16;
// Card width is a third of the track's own width.
const CARD_WIDTH_RATIO = 1 / 3;
// Original ellipse's Y-to-X aspect ratio (130/340), reused so the arc
// keeps the same proportions once radiusX is derived below.
const RADIUS_Y_TO_X_RATIO = 130 / 340;

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

function getItemPosition(
  index: number,
  activeIndex: number,
  total: number,
  radiusX: number,
  radiusY: number,
  cardWidth: number,
) {
  // adjustedOffset is `offset` wrapped around the pool so that it's the
  // representative closest to the pair center at 0.5 — this keeps the
  // 2-left/2-right split symmetric no matter where activeIndex wraps.
  const offset = index - activeIndex;
  const wrapped = mod(offset - 0.5 + total / 2, total) - total / 2;
  const adjustedOffset = wrapped + 0.5;

  if (adjustedOffset < -SIDE_COUNT || adjustedOffset > 1 + SIDE_COUNT) {
    return null;
  }

  // Distance from whichever edge of the active pair (slot 0 or 1) is
  // nearer — both pair members get distance 0 (full scale/opacity).
  const distance =
    adjustedOffset < 0
      ? Math.abs(adjustedOffset)
      : adjustedOffset > 1
        ? adjustedOffset - 1
        : 0;
  const sign = adjustedOffset <= 0 ? -1 : 1;

  // At distance 0 this reduces to exactly ±halfGap (the fixed 16px gap);
  // farther cards continue fanning outward along the same arc.
  const halfGap = (cardWidth + ACTIVE_GAP) / 2;
  const angle = (distance / SIDE_COUNT) * (Math.PI / 2);
  const x = sign * (halfGap + Math.sin(angle) * radiusX);
  const y = -radiusY * Math.cos(angle);

  const scale = Math.max(0, 1 - (distance / SIDE_COUNT) * 0.3);
  const opacity = Math.max(0.3, 1 - (distance / SIDE_COUNT) * 0.7);
  const zIndex = SIDE_COUNT + 2 - distance;

  return { x, y, scale, opacity, zIndex };
}

export function CircularCarousel({
  items,
  activeIndex: controlledIndex,
  onActiveChange,
  autoPlay = true,
  autoPlayInterval = 4000,
  className,
}: CircularCarouselProps) {
  const [internalIndex, setInternalIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [trackWidth, setTrackWidth] = useState(1024);

  const activeIndex = controlledIndex ?? internalIndex;
  const total = items.length;

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      setTrackWidth(entry.contentRect.width);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const cardWidth = trackWidth * CARD_WIDTH_RATIO;
  // Sized so the outermost (2nd) side card's outer edge lands exactly on
  // the track's edge: halfGap + radiusX + cardWidth/2 === trackWidth/2.
  const radiusX = Math.max(0, (cardWidth - ACTIVE_GAP) / 2);
  const radiusY = radiusX * RADIUS_Y_TO_X_RATIO;

  const goTo = useCallback(
    (index: number) => {
      const newIndex = ((index % total) + total) % total;
      if (controlledIndex === undefined) {
        setInternalIndex(newIndex);
      }
      onActiveChange?.(newIndex);
    },
    [total, controlledIndex, onActiveChange],
  );

  const next = useCallback(() => goTo(activeIndex + 2), [activeIndex, goTo]);
  const prev = useCallback(() => goTo(activeIndex - 2), [activeIndex, goTo]);

  useEffect(() => {
    if (!autoPlay || isHovered || isFocused) return;
    intervalRef.current = setInterval(next, autoPlayInterval);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [autoPlay, autoPlayInterval, isHovered, isFocused, next]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    const el = containerRef.current;
    el?.addEventListener("keydown", handler);
    return () => el?.removeEventListener("keydown", handler);
  }, [next, prev]);

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      role="region"
      aria-label="Circular carousel"
      aria-roledescription="carousel"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      className={cn(
        "relative flex flex-col items-center justify-center gap-8 outline-none",
        className,
      )}
    >
      {/* Circular track — spans the full width of the parent container;
          card width and fan radius both derive from its measured width */}
      <div ref={trackRef} className="relative h-[460px] w-full">
        {/* Center content — bottom-anchored to the track's own box (not the
            outer container); combined with the controls row's own
            translateY below, this gives an exact 40px gap to the controls
            row below */}
        <motion.div
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: -32 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center"
        >
          <span
            className={`text-3xl leading-[0.98] tracking-[-0.02em] text-[#161616] ${fontVelaGxBold}`}
          >
            Факты о нас
          </span>
        </motion.div>
        <AnimatePresence mode="popLayout">
          {items.map((item, i) => {
            const pos = getItemPosition(
              i,
              activeIndex,
              total,
              radiusX,
              radiusY,
              cardWidth,
            );
            if (!pos) return null;

            const isActive = i === activeIndex || i === (activeIndex + 1) % total;

            return (
              <motion.button
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  x: pos.x,
                  y: pos.y,
                  scale: pos.scale,
                  opacity: pos.opacity,
                  zIndex: pos.zIndex,
                }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{
                  duration: 0.65,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onClick={() => goTo(i)}
                aria-label={item.title}
                aria-selected={isActive}
                role="option"
                className={cn(
                  "absolute left-1/2 top-1/2 flex min-h-[200px] w-1/3 -translate-x-1/2 -translate-y-1/2 cursor-pointer flex-col items-start justify-center gap-4 rounded-lg bg-[#f5f5f5] px-8 py-6 text-left",
                )}
                style={{ transformOrigin: "center center" }}
              >
                {item.tag && (
                  <span
                    className={`rounded-full bg-[#161616]/5 px-2 py-0.5 text-[10px] uppercase tracking-wider text-[#161616]/70 ${fontVelaMedium}`}
                  >
                    {item.tag}
                  </span>
                )}
                <h3
                  className={cn(
                    "w-full text-[28px] leading-[0.95] tracking-[-0.02em] text-black",
                    fontVelaGxBold,
                  )}
                >
                  {item.title}
                </h3>
                <p
                  className={cn(
                    "w-full text-[18px] leading-[1.2] tracking-[-0.04em] text-[#626262]",
                    fontVelaMedium,
                  )}
                >
                  {item.description}
                </p>
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4" style={{ transform: "translateY(-24px)" }}>
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={prev}
          aria-label="Previous item"
          className="-translate-y-2 flex h-10 w-10 items-center justify-center rounded-full border border-[#d8d8d8] bg-[#f5f5f5] text-[#161616]/70 transition-colors hover:bg-[#ececec] hover:text-[#161616] focus-visible:ring-2 focus-visible:ring-[#161616]/20"
        >
          <ChevronLeft className="size-5" />
        </motion.button>

        {/* Dot indicators */}
        <div className="flex items-center gap-1.5" role="tablist">
          {items.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === activeIndex || i === (activeIndex + 1) % total}
              onClick={() => goTo(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === activeIndex || i === (activeIndex + 1) % total
                  ? "w-6 bg-[#161616]/80"
                  : "w-1.5 bg-[#161616]/20 hover:bg-[#161616]/40",
              )}
              aria-label={`Go to item ${i + 1}`}
            />
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={next}
          aria-label="Next item"
          className="-translate-y-2 flex h-10 w-10 items-center justify-center rounded-full border border-[#d8d8d8] bg-[#f5f5f5] text-[#161616]/70 transition-colors hover:bg-[#ececec] hover:text-[#161616] focus-visible:ring-2 focus-visible:ring-[#161616]/20"
        >
          <ChevronRight className="size-5" />
        </motion.button>
      </div>
    </div>
  );
}

export default CircularCarousel;
