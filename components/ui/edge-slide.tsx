"use client";

/**
 * Generic "swap two variants by sliding each piece off/on through its own
 * nearest frame border" mechanic, used by HeroShowcase.tsx. A
 * `Slot` renders one shared anchor position twice — variant A's piece
 * riding out toward `direction` as scroll progress goes 0→1, variant B's
 * piece riding in from that same border into that same spot.
 */

import { motion, useTransform, type MotionValue } from "motion/react";
import type { CSSProperties, ReactNode } from "react";

export type Direction = "up" | "down" | "left" | "right";

export function edgeDelta(
  direction: Direction,
  frame: { width: number; height: number },
): { x: number; y: number } {
  switch (direction) {
    case "up":
      return { x: 0, y: -frame.height };
    case "down":
      return { x: 0, y: frame.height };
    case "left":
      return { x: -frame.width, y: 0 };
    case "right":
      return { x: frame.width, y: 0 };
  }
}

/**
 * One piece of content, pinned at a shared slot position. `mode="exit"`
 * rides it from rest (0,0) out past the given border as progress 0→1;
 * `mode="enter"` starts it at that same off-frame border and brings it
 * back to rest — so an exiting and an entering item trade places through
 * the identical off-screen point.
 */
export function SlotItem({
  direction,
  frame,
  mode,
  progress,
  className,
  style,
  children,
}: {
  direction: Direction;
  frame: { width: number; height: number };
  mode: "exit" | "enter";
  progress: MotionValue<number>;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  const delta = edgeDelta(direction, frame);
  const x = useTransform(progress, [0, 1], mode === "exit" ? [0, delta.x] : [delta.x, 0]);
  const y = useTransform(progress, [0, 1], mode === "exit" ? [0, delta.y] : [delta.y, 0]);

  return (
    <motion.div className={className} style={{ ...style, x, y }}>
      {children}
    </motion.div>
  );
}

/**
 * Renders one slot's two items (variant A exiting, variant B entering)
 * sharing the same anchor position, unless `anchorB` is given for a slot
 * whose two variants rest at slightly different spots (e.g. a mockup
 * whose own asset dimensions differ between variants).
 */
export function Slot<V>({
  direction,
  frame,
  anchor,
  anchorB,
  progress,
  variants,
  render,
}: {
  direction: Direction;
  frame: { width: number; height: number };
  anchor: CSSProperties;
  anchorB?: CSSProperties;
  progress: MotionValue<number>;
  variants: [V, V];
  render: (variant: V) => ReactNode;
}) {
  const [outVariant, inVariant] = variants;
  return (
    <>
      <SlotItem direction={direction} frame={frame} mode="exit" progress={progress} className="absolute" style={anchor}>
        {render(outVariant)}
      </SlotItem>
      <SlotItem direction={direction} frame={frame} mode="enter" progress={progress} className="absolute" style={anchorB ?? anchor}>
        {render(inVariant)}
      </SlotItem>
    </>
  );
}
