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
}: {
  src: string;
  alt: string;
  className?: string;
  fit?: "contain" | "cover";
}) {
  const isPositioned = className?.includes("absolute") ?? false;
  return (
    <div
      className={`${isPositioned ? "" : "relative"} shrink-0 ${className ?? ""}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- fixed local asset, exact fractional sizing */}
      <img
        src={src}
        alt={alt}
        className={`absolute inset-0 block size-full max-w-none ${fit === "cover" ? "object-cover" : "object-contain"}`}
      />
    </div>
  );
}
