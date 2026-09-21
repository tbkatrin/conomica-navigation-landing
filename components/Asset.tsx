import type { CSSProperties } from "react";

/**
 * Renders a static image (icon, logo, background) inside an exactly-sized
 * box. Pass `absolute ...` in `className` to position it directly; a
 * base `relative` class is only added when the caller isn't already
 * positioning it, so the two never collide on the `position` property.
 */
export default function Asset({
  src,
  alt,
  className,
  fit = "contain",
  style,
}: {
  src: string;
  alt: string;
  className?: string;
  /** "fill" stretches non-uniformly to the box, ignoring the asset's own
   * aspect ratio — matches how Figma exports a pre-warped/cropped image
   * against a specific target frame size. */
  fit?: "contain" | "cover" | "fill";
  style?: CSSProperties;
}) {
  const isPositioned = className?.includes("absolute") ?? false;
  const fitClass =
    fit === "cover" ? "object-cover" : fit === "fill" ? "object-fill" : "object-contain";
  return (
    <div
      className={`${isPositioned ? "" : "relative"} shrink-0 ${className ?? ""}`}
      style={style}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- fixed local asset, exact fractional sizing */}
      <img src={src} alt={alt} className={`absolute inset-0 block size-full max-w-none ${fitClass}`} />
    </div>
  );
}
