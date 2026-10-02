"use client";

/**
 * Generic "swap two variants by sliding each piece off/on through its own
 * nearest frame border" mechanic, used by HeroShowcase.tsx. A
 * `Slot` renders one shared anchor position twice — variant A's piece
 * riding out toward `direction` as scroll progress goes 0→1, variant B's
 * piece riding in from that same border into that same spot.
 *
 * Fluid-scaling pass: the travel distance used to be a fixed px number
 * derived from HeroShowcase's own (then-fixed) 1330×584 box. Now that box
 * is fluid, so the distance is expressed as a container-relative `100cqw`
 * (left/right) or `100cqh` (up/down) instead of a frame size in px — "one
 * full box width/height," whatever that currently renders as. This drops
 * the `frame` prop entirely; HeroShowcase's own box just needs to be a
 * `[container-type:inline-size]` (cqw) that also has a determinate height
 * (cqh) — see that file's own doc comment.
 */

import { motion, useTransform, type MotionValue } from "motion/react";
import type { CSSProperties, ReactNode } from "react";

export type Direction = "up" | "down" | "left" | "right";

export function edgeDelta(direction: Direction): { x: string; y: string } {
  switch (direction) {
    case "up":
      return { x: "0cqw", y: "-100cqh" };
    case "down":
      return { x: "0cqw", y: "100cqh" };
    case "left":
      return { x: "-100cqw", y: "0cqh" };
    case "right":
      return { x: "100cqw", y: "0cqh" };
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
  mode,
  progress,
  className,
  style,
  children,
}: {
  direction: Direction;
  mode: "exit" | "enter";
  progress: MotionValue<number>;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  const delta = edgeDelta(direction);
  const x = useTransform(progress, [0, 1], mode === "exit" ? ["0cqw", delta.x] : [delta.x, "0cqw"]);
  const y = useTransform(progress, [0, 1], mode === "exit" ? ["0cqh", delta.y] : [delta.y, "0cqh"]);

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
  anchor,
  anchorB,
  progress,
  variants,
  render,
}: {
  direction: Direction;
  anchor: CSSProperties;
  anchorB?: CSSProperties;
  progress: MotionValue<number>;
  variants: [V, V];
  render: (variant: V) => ReactNode;
}) {
  const [outVariant, inVariant] = variants;
  return (
    <>
      <SlotItem direction={direction} mode="exit" progress={progress} className="absolute" style={anchor}>
        {render(outVariant)}
      </SlotItem>
      <SlotItem direction={direction} mode="enter" progress={progress} className="absolute" style={anchorB ?? anchor}>
        {render(inVariant)}
      </SlotItem>
    </>
  );
}
