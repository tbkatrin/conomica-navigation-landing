"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Asset from "@/components/Asset";
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

const CARD_BASE =
  "relative flex flex-col items-start justify-start gap-[1.3889cqw] rounded-[24px] px-[2.2222cqw] py-[2.2222cqw]";

function renderCardContent(item: CarouselItem) {
  return (
    <>
      <span className="flex h-[3.8889cqw] w-[3.8889cqw] shrink-0 items-center justify-center rounded-[16px] bg-white">
        <Asset src="/hero/cone.svg" alt="" className="h-[1.9444cqw] w-[1.7471cqw]" />
      </span>
      {item.tag && (
        <span
          className={`rounded-full bg-[#161616]/5 px-[0.5556cqw] py-[0.1389cqw] t-caption text-[#161616]/70 ${fontVelaMedium}`}
        >
          {item.tag}
        </span>
      )}
      <h3
        className={cn(
          "w-full t-h3 text-[#161616]",
          fontVelaGxBold,
        )}
      >
        {item.title}
      </h3>
      <p
        className={cn(
          "w-full t-body text-[#626262]",
          fontVelaMedium,
        )}
      >
        {item.description}
      </p>
    </>
  );
}

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
        "relative flex flex-col items-center justify-center gap-[1.6667cqw] outline-none [container-type:inline-size]",
        className,
      )}
    >
      {/* Heading — H2, left edge aligned to the left edge of the left
          active card (card width is a third of the track, and the two
          active cards sit symmetrically around the center with a fixed
          gap between them). */}
      <h2
        className={`mb-[1.6667cqw] w-full t-h2 text-[#191919] ${fontVelaGxBold}`}
        style={{ paddingLeft: Math.max(0, trackWidth / 2 - cardWidth - ACTIVE_GAP / 2) }}
      >
        Факты о нас
      </h2>

      {/* Circular track — spans the full width of the parent container;
          card width and fan radius both derive from its measured width */}
      <div ref={trackRef} className="relative w-full" style={{ paddingTop: radiusY }}>
        {/* All cards share one grid cell and stretch to that cell's height
            — so every card is as tall as the tallest one. Invisible copies
            of every item (not only the six on screen) keep that height
            constant as the carousel rotates; shorter cards simply grow
            extra space at the bottom. The active pair is lifted by radiusY
            (see getItemPosition), so padding the track by the same amount
            puts the pair's top edge exactly at the track's top edge. */}
        <div className="grid grid-cols-[100%]">
          {items.map((item) => (
            <div
              key={`sizer-${item.id}`}
              aria-hidden
              className={`pointer-events-none invisible w-1/3 justify-self-center [grid-area:1/1] ${CARD_BASE}`}
            >
              {renderCardContent(item)}
            </div>
          ))}
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
                  "w-1/3 cursor-pointer self-stretch justify-self-center bg-[#f5f5f5] text-left shadow-[4px_4px_34px_rgba(0,0,0,0.11)] [grid-area:1/1]",
                  CARD_BASE,
                )}
                style={{ transformOrigin: "center center" }}
              >
                {renderCardContent(item)}
              </motion.button>
            );
          })}
        </AnimatePresence>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-[1.1111cqw]">
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={prev}
          aria-label="Previous item"
          className="-translate-y-2 flex h-[2.7778cqw] w-[2.7778cqw] items-center justify-center rounded-full border border-[#d8d8d8] bg-[#f5f5f5] text-[#161616]/70 transition-colors hover:bg-[#ececec] hover:text-[#161616] focus-visible:ring-2 focus-visible:ring-[#161616]/20"
        >
          <ChevronLeft className="size-[1.3889cqw]" />
        </motion.button>

        {/* Dot indicators */}
        <div className="flex items-center gap-[0.4167cqw]" role="tablist">
          {items.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === activeIndex || i === (activeIndex + 1) % total}
              onClick={() => goTo(i)}
              className={cn(
                "h-[0.4167cqw] rounded-full transition-all duration-300",
                i === activeIndex || i === (activeIndex + 1) % total
                  ? "w-[1.6667cqw] bg-[#161616]/80"
                  : "w-[0.4167cqw] bg-[#161616]/20 hover:bg-[#161616]/40",
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
          className="-translate-y-2 flex h-[2.7778cqw] w-[2.7778cqw] items-center justify-center rounded-full border border-[#d8d8d8] bg-[#f5f5f5] text-[#161616]/70 transition-colors hover:bg-[#ececec] hover:text-[#161616] focus-visible:ring-2 focus-visible:ring-[#161616]/20"
        >
          <ChevronRight className="size-[1.3889cqw]" />
        </motion.button>
      </div>
    </div>
  );
}

export default CircularCarousel;
