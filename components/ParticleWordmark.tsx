"use client";

/**
 * ParticleWordmark — dots assemble into a company name, react to the cursor,
 * and periodically scatter across the whole viewport (rotating patterns, with
 * motion-blur trails) then reassemble into the name.
 *
 * Project-agnostic: React 18/19, no dependencies. Drop into any Next.js (App
 * Router) / Vite / CRA project.
 *
 *   <div style={{ height: 280 }}>
 *     <ParticleWordmark text="ACME" />
 *   </div>
 *
 * The wrapping <div> stays in normal flow and defines WHERE the wordmark sits
 * and how tall it is. The <canvas> is `position: fixed` and covers the viewport
 * so the scatter can use the real screen corners.
 *
 * Caveats:
 *  - `position: fixed` means a `transform` / `filter` / `will-change` on ANY
 *    ancestor clips the canvas to that ancestor. Keep the ancestors transform-free.
 *  - `zIndex` must be >= 0. A negative z-index drops the canvas behind an opaque
 *    page background and it vanishes. In DOM/tree order the canvas sits where you
 *    place this component, so put foreground copy AFTER it (or give that copy a
 *    higher stacking context) to keep the dots behind it.
 *  - The raf loop pauses while the tab is hidden and resumes (skipping the intro)
 *    when it returns.
 *
 * Origin: conomica hero (session 2026-09). Reusable per user request.
 */

import { useEffect, useRef } from "react";

export type ScatterPattern = "corners" | "explode" | "swirl" | "bands";

export type ParticleWordmarkProps = {
  /** the text the particles form */
  text: string;
  /** optional second line, rendered smaller under `text` (same particle field) */
  subtitle?: string;
  /** subtitle font size relative to the main line (default 0.42) */
  subtitleScale?: number;
  /** dot-count multiplier — 1 = default density, >1 = more dots (default 1) */
  density?: number;
  /** RGB triplet "r, g, b" for the dot core (default emerald-600) */
  coreColor?: string;
  /** RGB triplet "r, g, b" for the soft glow (default emerald-500) */
  glowColor?: string;
  /** hard safety cap on particle count (default 6000); the real count follows the
   *  wordmark size so on-screen density stays roughly constant */
  maxParticles?: number;
  /** cursor repel radius in px (default 120) */
  repelRadius?: number;
  /** cursor repel strength (default 6) */
  repelStrength?: number;
  /** ms between scatter bursts; 0 disables the burst (default 10000) */
  burstInterval?: number;
  /** ms for one out-and-back scatter (default 2000) */
  burstDuration?: number;
  /** ms before the first burst (default 6000) */
  burstFirst?: number;
  /** scatter patterns cycled through, one per burst (default all four) */
  patterns?: ScatterPattern[];
  /** motion-blur trails during the scatter (default true) */
  trails?: boolean;
  /** stacking level of the fixed canvas — must be >= 0 (default 0) */
  zIndex?: number;
  /** font stack used to raster the text */
  fontFamily?: string;
  /** font weight used to raster the text (default 700) */
  fontWeight?: number;
  className?: string;
};

type P = {
  x: number; y: number; vx: number; vy: number;
  hx: number; hy: number;   // home, in wrapper-local coords
  cjx: number; cjy: number; // per-particle jitter around the scatter target
  phase: number; amp: number;
  delay: number; r: number;
};

const SPRING = 0.045;
const FRICTION = 0.86;
const TRAIL_TAIL = 300; // ms of trail fade after the burst proper
const smootherstep = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);
const GOLDEN = 2.399963229728653;

function shuffle<T>(a: T[]) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function ParticleWordmark({
  text,
  subtitle,
  subtitleScale = 0.42,
  density = 1,
  coreColor = "5, 150, 105",
  glowColor = "16, 185, 129",
  maxParticles = 6000,
  repelRadius = 120,
  repelStrength = 6,
  burstInterval = 10000,
  burstDuration = 2000,
  burstFirst = 6000,
  patterns = ["corners", "explode", "swirl", "bands"],
  trails = true,
  zIndex = 0,
  fontFamily = 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
  fontWeight = 700,
  className,
}: ParticleWordmarkProps) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouse = useRef({ cx: -9999, cy: -9999, active: false });

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pats: ScatterPattern[] = patterns.length ? patterns : ["corners"];

    let boxW = 0; // wrapper size — where the wordmark is rastered
    let boxH = 0;
    let vw = 0; // viewport size — the canvas covers this
    let vh = 0;
    let dpr = 1;
    let dense = false; // narrow viewport → smaller, denser dots so the text stays legible
    let particles: P[] = [];
    let raf = 0;
    let buildRaf = 0;
    let running = true;
    let start = performance.now();

    // pre-rendered soft glow sprite (blitted per particle — cheap)
    const SPRITE = 26;
    const sprite = document.createElement("canvas");
    sprite.width = sprite.height = SPRITE;
    const sctx = sprite.getContext("2d")!;
    const sg = sctx.createRadialGradient(
      SPRITE / 2, SPRITE / 2, 0, SPRITE / 2, SPRITE / 2, SPRITE / 2,
    );
    sg.addColorStop(0, `rgba(${glowColor}, 0.55)`);
    sg.addColorStop(1, `rgba(${glowColor}, 0)`);
    sctx.fillStyle = sg;
    sctx.fillRect(0, 0, SPRITE, SPRITE);

    const sampleTargets = (): { x: number; y: number }[] => {
      if (boxW < 2 || boxH < 2) return [];
      const off = document.createElement("canvas");
      off.width = boxW;
      off.height = boxH;
      const octx = off.getContext("2d");
      if (!octx) return [];
      octx.textAlign = "center";
      octx.textBaseline = "middle";
      const setFont = (s: number) => (octx.font = `${fontWeight} ${s}px ${fontFamily}`);
      const widthFrac = dense ? 0.9 : 0.8;
      const hasSub = !!subtitle;

      // main line — fit to width, cap by height (leave room for the subtitle)
      let size = Math.min(boxH * (hasSub ? 0.5 : 0.72), boxW * 0.5);
      setFont(size);
      const measured = octx.measureText(text).width;
      if (measured > 0) size *= (boxW * widthFrac) / measured;
      size = Math.max(24, Math.min(size, boxH * (hasSub ? 0.5 : 0.84)));

      // subtitle line — relative to the main size, also clamped to width
      let subSize = 0;
      if (hasSub) {
        subSize = Math.max(11, size * subtitleScale);
        setFont(subSize);
        const sm = octx.measureText(subtitle!).width;
        if (sm > boxW * widthFrac) subSize *= (boxW * widthFrac) / sm;
      }

      const lineGap = hasSub ? size * 0.34 : 0;
      const blockH = size + (hasSub ? lineGap + subSize : 0);
      const blockTop = boxH / 2 - blockH / 2;

      octx.fillStyle = "#fff";
      setFont(size);
      octx.fillText(text, boxW / 2, blockTop + size / 2);
      if (hasSub) {
        setFont(subSize);
        octx.fillText(subtitle!, boxW / 2, blockTop + size + lineGap + subSize / 2);
      }

      const data = octx.getImageData(0, 0, boxW, boxH).data;
      // `density` (default 1) scales how many opaque pixels become dots
      const gap = 2;
      const keep = Math.min(1, (dense ? 0.85 : 0.55) * density);
      const jit = dense ? 0.3 : 0.6;
      const pts: { x: number; y: number }[] = [];
      for (let y = 0; y < boxH; y += gap) {
        for (let x = 0; x < boxW; x += gap) {
          if (data[(y * boxW + x) * 4 + 3] > 128 && Math.random() < keep) {
            pts.push({
              x: x + (Math.random() - 0.5) * gap * jit,
              y: y + (Math.random() - 0.5) * gap * jit,
            });
          }
        }
      }
      return pts;
    };

    let rectLeft = 0;
    let rectTop = 0;
    let mouseActiveUntil = 0;
    let burstT = -1; // performance.now() when the current burst started (-1 = none)
    let burstIx = 0; // scatter-pattern index for the current burst
    let cycleIndex = 0; // number of bursts started so far
    let burstTimer = 0;

    const readRect = () => {
      const r = wrap.getBoundingClientRect();
      rectLeft = r.left;
      rectTop = r.top;
    };

    // the loop parks itself (raf = 0) once the wordmark is assembled and still;
    // wake() restarts it on interaction, scatter, resize or tab-return.
    const wake = () => {
      if (running && raf === 0) raf = requestAnimationFrame(loop);
    };

    const build = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      vw = window.innerWidth;
      vh = window.innerHeight;
      readRect();
      boxW = Math.round(wrap.getBoundingClientRect().width);
      boxH = Math.round(wrap.getBoundingClientRect().height);

      // layout not ready (0-size box/viewport on first paint) — retry next frame
      if (boxW < 2 || boxH < 2 || vw < 2 || vh < 2) {
        cancelAnimationFrame(buildRaf);
        buildRaf = requestAnimationFrame(build);
        return;
      }

      dense = boxW < 560;
      canvas.width = Math.floor(vw * dpr);
      canvas.height = Math.floor(vh * dpr);

      let targets = sampleTargets();
      if (targets.length > maxParticles) {
        targets = shuffle(targets).slice(0, maxParticles);
      }

      particles = targets.map((t) => ({
        x: boxW / 2 + (Math.random() - 0.5) * boxW,
        y: boxH / 2 + (Math.random() - 0.5) * boxH * 1.4,
        vx: 0, vy: 0,
        hx: t.x, hy: t.y,
        cjx: (Math.random() - 0.5) * 260,
        cjy: (Math.random() - 0.5) * 260,
        phase: 0,
        amp: 0,
        delay: (t.x / Math.max(boxW, 1)) * 380 + Math.random() * 160,
        r: (dense ? 0.55 : 0.85) + Math.random() * (dense ? 0.4 : 0.7),
      }));
      start = performance.now();
    };

    build();
    const rebuild = () => {
      build();
      wake();
    };
    if (document.fonts?.ready) document.fonts.ready.then(rebuild).catch(() => {});

    window.addEventListener("resize", rebuild);
    window.addEventListener("load", rebuild);
    const onScroll = () => {
      readRect();
      wake();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    const ro =
      typeof ResizeObserver !== "undefined" ? new ResizeObserver(rebuild) : null;
    ro?.observe(wrap);

    const trackMouse = (e: PointerEvent) => {
      mouse.current.cx = e.clientX;
      mouse.current.cy = e.clientY;
      mouseActiveUntil = performance.now() + 260;
      wake();
    };
    const releaseMouse = () => {
      mouseActiveUntil = 0;
    };
    window.addEventListener("pointermove", trackMouse, { passive: true });
    window.addEventListener("pointerdown", trackMouse, { passive: true });
    window.addEventListener("blur", releaseMouse);
    document.addEventListener("pointerleave", releaseMouse);

    const onVisibility = () => {
      running = document.visibilityState === "visible";
      if (running) {
        start = performance.now() - 5000; // skip the intro when returning
        wake();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    // scatter bursts are driven by timers, not a per-frame clock check, so the
    // loop can stay parked between them
    const scheduleBurst = () => {
      if (reduce || burstInterval <= 0) return;
      window.clearTimeout(burstTimer);
      burstTimer = window.setTimeout(
        () => {
          burstT = performance.now();
          burstIx = cycleIndex;
          cycleIndex += 1;
          wake();
          scheduleBurst();
        },
        cycleIndex === 0 ? burstFirst : burstInterval,
      );
    };
    scheduleBurst();

    const coreFill = `rgb(${coreColor})`;
    const glowBaseA = dense ? 0.4 : 0.62;

    const loop = () => {
      if (!running) {
        raf = 0;
        return;
      }
      const now = performance.now();
      const elapsed = now - start;

      ctx.setTransform(dpr, 0, 0, dpr, rectLeft * dpr, rectTop * dpr);
      const originX = -rectLeft;
      const originY = -rectTop;

      // ---- burst state ----
      let s = 0;
      let bursting = false;
      if (burstT >= 0) {
        const cp = now - burstT;
        if (cp < burstDuration) {
          const phase = cp / burstDuration;
          s =
            phase < 0.32
              ? 1 - Math.pow(1 - phase / 0.32, 3)
              : 1 - smootherstep((phase - 0.32) / 0.68);
          bursting = true;
        } else if (cp < burstDuration + TRAIL_TAIL) {
          bursting = true;
        } else {
          burstT = -1;
        }
      }

      // ---- clear / motion-blur trail ----
      if (trails && bursting && !reduce) {
        ctx.globalCompositeOperation = "destination-out";
        ctx.fillStyle = "rgba(0,0,0,0.3)";
        ctx.fillRect(originX, originY, vw, vh);
        ctx.globalCompositeOperation = "source-over";
      } else {
        ctx.clearRect(originX, originY, vw, vh);
      }

      // ---- scatter geometry (once per frame) ----
      const cx = boxW / 2;
      const cy = boxH / 2;
      const left = originX - 60;
      const right = originX + vw + 60;
      const top = originY - 60;
      const bottom = originY + vh + 60;
      let reach = 0;
      for (const [qx, qy] of [
        [left, top], [right, top], [left, bottom], [right, bottom],
      ] as const) {
        reach = Math.max(reach, Math.hypot(qx - cx, qy - cy));
      }
      reach *= 1.12;
      const pattern = pats[burstIx % pats.length];

      const mouseHot = !reduce && now < mouseActiveUntil;
      const mx = mouse.current.cx + originX;
      const my = mouse.current.cy + originY;
      const introDone = elapsed > 1500;

      let maxSpeed = 0;
      ctx.fillStyle = coreFill;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const ease = introDone
          ? 1
          : 1 -
            Math.pow(
              1 - Math.max(0, Math.min(1, (elapsed - p.delay) / 900)),
              3,
            );

        if (!introDone || ease > 0) {
          p.vx += (p.hx - p.x) * SPRING;
          p.vy += (p.hy - p.y) * SPRING;

          if (mouseHot) {
            const dx = p.x - mx;
            const dy = p.y - my;
            const d = Math.hypot(dx, dy);
            if (d < repelRadius && d > 0.001) {
              const f = 1 - d / repelRadius;
              p.vx += (dx / d) * f * repelStrength;
              p.vy += (dy / d) * f * repelStrength;
            }
          }

          p.vx *= FRICTION;
          p.vy *= FRICTION;
          p.x += p.vx;
          p.y += p.vy;
        }

        const sp = Math.abs(p.vx) + Math.abs(p.vy);
        if (sp > maxSpeed) maxSpeed = sp;

        // scatter displacement, layered on top so it always returns home exactly
        let rx = p.x;
        let ry = p.y;
        if (s > 0) {
          let sx: number;
          let sy: number;
          if (pattern === "corners") {
            const c = (i + burstIx) % 4;
            sx = (c === 1 || c === 3 ? right : left) + p.cjx * 0.4;
            sy = (c === 2 || c === 3 ? bottom : top) + p.cjy * 0.4;
          } else if (pattern === "bands") {
            sx = p.hx + p.cjx;
            sy = i % 2 === 0 ? top : bottom;
          } else {
            let a = Math.atan2(p.hy - cy, p.hx - cx);
            if (Math.abs(p.hx - cx) + Math.abs(p.hy - cy) < 1) a = i * GOLDEN;
            if (pattern === "swirl") a += 0.9;
            const rr = pattern === "swirl" ? reach * 0.92 : reach;
            sx = cx + Math.cos(a) * rr + p.cjx * 0.3;
            sy = cy + Math.sin(a) * rr + p.cjy * 0.3;
          }
          rx = p.x + (sx - p.x) * s;
          ry = p.y + (sy - p.y) * s;
        }

        const g = p.r * (dense ? 2.3 : 3.2);
        ctx.globalAlpha = introDone ? glowBaseA : glowBaseA * ease;
        ctx.drawImage(sprite, rx - g, ry - g, g * 2, g * 2);

        ctx.globalAlpha = ease;
        ctx.fillRect(rx - p.r, ry - p.r, p.r * 2, p.r * 2);
      }
      ctx.globalAlpha = 1;

      const keepGoing =
        bursting || burstT >= 0 || mouseHot || !introDone || maxSpeed > 0.05;
      raf = keepGoing ? requestAnimationFrame(loop) : 0;
    };
    loop();

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      cancelAnimationFrame(buildRaf);
      window.clearTimeout(burstTimer);
      ro?.disconnect();
      window.removeEventListener("resize", rebuild);
      window.removeEventListener("load", rebuild);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", trackMouse);
      window.removeEventListener("pointerdown", trackMouse);
      window.removeEventListener("blur", releaseMouse);
      document.removeEventListener("pointerleave", releaseMouse);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [
    text, subtitle, subtitleScale, density, coreColor, glowColor, maxParticles,
    repelRadius, repelStrength, burstInterval, burstDuration, burstFirst,
    patterns, trails, zIndex, fontFamily, fontWeight,
  ]);

  return (
    <div
      ref={wrapRef}
      className={className}
      aria-label={subtitle ? `${text} — ${subtitle}` : text}
      role="img"
      style={{ position: "relative", width: "100%", height: "100%" }}
    >
      <canvas
        ref={canvasRef}
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
          zIndex: Math.max(0, zIndex),
        }}
      />
    </div>
  );
}
