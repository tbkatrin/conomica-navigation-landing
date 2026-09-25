import Asset from "./Asset";

/**
 * The cone-in-circle decorative motif — per Figma node 225:8293
 * ("Group 345"): a thin grey circle outline with 6 evenly-spaced green dots
 * and the Conomica cone mark centered inside. The 6 "Vector" arcs in Figma
 * are just segments of one plain circle, so this is reconstructed as a
 * single stroked circle instead of downloading six fragile arc-segment SVGs.
 *
 * Used by StatsShowcase.tsx's alternate "Conomica в цифрах" screen (bigger,
 * with the "sequential" line-travel variant — see DecorativeCircleMark's
 * own doc comment). No longer placed between HeroShowcase and Offer.
 */

const SIZE = 236;
const DOT_RADIUS = 4.4485;
const DOTS = 6;

function dotPoint(i: number, center: number, radius: number) {
  const angle = (i / DOTS) * Math.PI * 2 - Math.PI / 2;
  return { x: center + radius * Math.cos(angle), y: center + radius * Math.sin(angle) };
}

/**
 * The animated mark itself (ring + 6 dots + centred cone) — reused by both
 * this section's Offer placement and StatsShowcase.tsx's alternate
 * "Conomica в цифрах" screen, so the two share one implementation instead
 * of two copies of the same SVG geometry.
 *
 * `size` lets a caller scale the whole mark (dot radius and the cone icon
 * scale proportionally, so a bigger mark doesn't look sparse). `travel`
 * switches the line animation:
 *  - "bidirectional" (default, Offer's original ask): each gap between
 *    adjacent dots is split into two half-arcs that grow from each dot
 *    toward the gap's midpoint, so every dot emits green both ways at once.
 *  - "sequential": one full arc per gap (dot i straight through to dot
 *    i+1, no midpoint split), lighting up one at a time around the ring —
 *    a single travelling line "from one point to the next" instead of two
 *    ends meeting in the middle.
 */
export function DecorativeCircleMark({
  className,
  size = SIZE,
  travel = "bidirectional",
}: {
  className?: string;
  size?: number;
  travel?: "bidirectional" | "sequential";
}) {
  const scale = size / SIZE;
  const dotRadius = DOT_RADIUS * scale;
  const center = size / 2;
  const ringRadius = size / 2 - dotRadius;

  const dots = Array.from({ length: DOTS }, (_, i) => dotPoint(i, center, ringRadius));
  const gapAngle = (Math.PI * 2) / DOTS;

  const sequentialArcs = dots.map((p, i) => {
    const next = dots[(i + 1) % DOTS];
    return `M ${p.x} ${p.y} A ${ringRadius} ${ringRadius} 0 0 1 ${next.x} ${next.y}`;
  });

  // two half-arcs per gap between adjacent dots — one grown from each
  // side's own dot toward the gap's midpoint — so every dot emits green in
  // both directions instead of only "handing off" to the next dot.
  const bidirectionalArcs = dots.flatMap((p, i) => {
    const next = dots[(i + 1) % DOTS];
    const midAngle = (i / DOTS) * Math.PI * 2 - Math.PI / 2 + gapAngle / 2;
    const mid = {
      x: center + ringRadius * Math.cos(midAngle),
      y: center + ringRadius * Math.sin(midAngle),
    };
    return [
      `M ${p.x} ${p.y} A ${ringRadius} ${ringRadius} 0 0 1 ${mid.x} ${mid.y}`,
      `M ${next.x} ${next.y} A ${ringRadius} ${ringRadius} 0 0 0 ${mid.x} ${mid.y}`,
    ];
  });

  const isSequential = travel === "sequential";
  const arcs = isSequential ? sequentialArcs : bidirectionalArcs;

  return (
    <div className={`relative shrink-0 ${className ?? ""}`} style={{ width: size, height: size }}>
      <svg viewBox={`0 0 ${size} ${size}`} className="absolute inset-0 h-full w-full">
        <circle cx={center} cy={center} r={ringRadius} fill="none" stroke="#D8D8D8" strokeWidth={1} />
        {arcs.map((d, i) => (
          <path
            key={i}
            d={d}
            fill="none"
            stroke="#00703E"
            strokeWidth={1}
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray="1"
            className={isSequential ? "ring-travel" : "ring-fill"}
            style={isSequential ? { animationDelay: `${i}s` } : undefined}
          />
        ))}
        {dots.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={dotRadius}
            fill="#00703E"
            style={{ filter: "drop-shadow(2px 2px 10px rgba(19,117,71,0.55))" }}
          />
        ))}
        <style>{`
          .ring-fill {
            animation: ring-fill-cycle 8s ease-in-out infinite;
          }
          @keyframes ring-fill-cycle {
            0%, 10% { stroke-dashoffset: 1; }
            50%, 60% { stroke-dashoffset: 0; }
            100% { stroke-dashoffset: 1; }
          }
          .ring-travel {
            stroke-dashoffset: 1;
            opacity: 0;
            animation: ring-travel-cycle 6s linear infinite;
          }
          @keyframes ring-travel-cycle {
            0% { stroke-dashoffset: 1; opacity: 0; }
            2% { opacity: 1; }
            14% { stroke-dashoffset: 0; }
            22% { stroke-dashoffset: 0; opacity: 1; }
            29% { opacity: 0; stroke-dashoffset: 0; }
            30% { stroke-dashoffset: 1; opacity: 0; }
            100% { stroke-dashoffset: 1; opacity: 0; }
          }
          @media (prefers-reduced-motion: reduce) {
            .ring-fill, .ring-travel { animation: none; stroke-dashoffset: 1; opacity: 1; }
          }
        `}</style>
      </svg>
      <Asset
        src="/hero/cone.svg"
        alt=""
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ height: 55 * scale, width: 49 * scale }}
      />
    </div>
  );
}
