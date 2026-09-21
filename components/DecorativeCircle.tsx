import Asset from "./Asset";

/**
 * Small decorative motif between the hero showcase and the offer section —
 * per Figma node 225:8293 ("Group 345"): a thin grey circle outline with 6
 * evenly-spaced green dots and the Conomica cone mark centered inside. The
 * 6 "Vector" arcs in Figma are just segments of one plain circle, so this
 * is reconstructed as a single stroked circle instead of downloading six
 * fragile arc-segment SVGs.
 *
 * Animation: green "fills in" from all 6 dots simultaneously, growing in
 * BOTH directions from each dot — each of the 6 gaps between adjacent dots
 * is split into two half-arcs (one growing from each side's dot toward the
 * gap's midpoint), so every dot visibly emits green on both sides at once.
 * Uses the same traveling-dash technique as GroupStructure's connectors
 * (pathLength=1 + animated stroke-dashoffset over a grey base circle) —
 * until the whole ring is green, then it recedes back to grey the same
 * way, and loops.
 *
 * Shares Offer's own two-column split (empty left column + content right)
 * so the circle's left edge lines up with Offer's heading directly below it.
 */

const SIZE = 236;
const DOT_RADIUS = 4.4485;
const DOTS = 6;

function dotPoint(i: number, center: number, radius: number) {
  const angle = (i / DOTS) * Math.PI * 2 - Math.PI / 2;
  return { x: center + radius * Math.cos(angle), y: center + radius * Math.sin(angle) };
}

export default function DecorativeCircle() {
  const center = SIZE / 2;
  const ringRadius = SIZE / 2 - DOT_RADIUS;

  const dots = Array.from({ length: DOTS }, (_, i) => dotPoint(i, center, ringRadius));
  const gapAngle = (Math.PI * 2) / DOTS;
  // two half-arcs per gap between adjacent dots — one grown from each
  // side's own dot toward the gap's midpoint — so every dot emits green in
  // both directions instead of only "handing off" to the next dot.
  const arcs = dots.flatMap((p, i) => {
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

  return (
    <div className="mx-auto flex w-full max-w-[1440px] items-center gap-[24px] px-[32px] py-[16px]">
      <div className="flex-1" />
      <div className="flex min-w-0 flex-1 items-center justify-start">
        <div className="relative shrink-0" style={{ width: SIZE, height: SIZE }}>
          <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="absolute inset-0 h-full w-full">
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
                className="ring-fill"
              />
            ))}
            {dots.map((p, i) => (
              <circle
                key={i}
                cx={p.x}
                cy={p.y}
                r={DOT_RADIUS}
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
              @media (prefers-reduced-motion: reduce) {
                .ring-fill { animation: none; stroke-dashoffset: 1; }
              }
            `}</style>
          </svg>
          <Asset
            src="/hero/cone.svg"
            alt=""
            className="absolute left-1/2 top-1/2 h-[55px] w-[49px] -translate-x-1/2 -translate-y-1/2"
          />
        </div>
      </div>
    </div>
  );
}
