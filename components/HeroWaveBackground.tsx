"use client";

import { useEffect, useRef } from "react";

/**
 * Animated green "wave" background — ported from a WebGL fragment-shader
 * reference the user supplied (procedural ribbons drawn every frame, not
 * the static `wave-bg.png` + CSS sway animation this replaces). Three
 * sine-and-twist "ribbon" shapes are blended over a flat base fill; the
 * base fill is the site's own page grey (`#F5F5F5`), not the reference's
 * own `#d8d8d8` — only the green ribbons themselves were "the waves" asked
 * to be ported, the page background was explicitly asked to stay as-is.
 *
 * Bottom edge fades into the page via a CSS mask (not part of the shader)
 * so it blends into whatever sits below it, same technique the reference
 * used for its own full-height hero. A slow scroll parallax (the canvas
 * translates at 65% of scroll speed) matches the reference's own feel.
 *
 * Ribbons are also narrower/thinner than the reference's own amplitudes
 * (smaller waves, per user request) and fade out toward the horizontal
 * center via `centerFade` in the shader — the hero's headline is now
 * centered, so the waves read as framing it from the left/right instead
 * of cutting across it.
 */

const FRAG_SRC = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec3 uBg, uC1, uC2, uC3;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

vec4 ribbon(vec2 p, float t, float angle, float offset, float amp, float freq,
            float width, float twistFreq, float seed, float travel) {
  float s = sin(angle), c = cos(angle);
  vec2 q = vec2(c * p.x - s * p.y, s * p.x + c * p.y);
  float along = q.y, across = q.x;

  float center = offset
    + amp * sin(freq * along + t * 0.6 + seed)
    + amp * 0.35 * sin(freq * 2.3 * along - t * 0.45 + seed * 2.0);
  float d = across - center;

  float tw = cos(twistFreq * along + t * 0.5 + seed * 1.7);
  float w = width * (0.3 + 0.7 * abs(tw));
  float edge = mix(0.004, 0.04, 0.5 + 0.5 * sin(along * 3.0 + seed));
  float aPos = d < 0.0 ? smoothstep(-edge, 0.0, d) : exp(-d / w);
  float aNeg = d > 0.0 ? smoothstep(-edge, 0.0, -d) : exp(d / w);
  float k = smoothstep(-0.35, 0.35, tw);
  float a = mix(aNeg, aPos, k);
  float ds = mix(-d, d, k);

  float head = mod(t * 0.1 * travel + seed, 2.6) - 1.3;
  a *= smoothstep(head - 0.9, head - 0.2, along) * (1.0 - smoothstep(head + 0.4, head + 1.1, along));

  vec3 col = mix(uC1, uC2, 0.5 + 0.5 * sin(along * 2.5 + t * 0.3 + seed));
  col = mix(col, uC3, clamp(ds / (w * 1.5), 0.0, 1.0));
  return vec4(col, a);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  // The ribbon offsets/amplitudes below are tuned for a moderate aspect
  // ratio; clamping it keeps the pattern spread across the whole canvas
  // instead of bunching into one side on an ultra-wide (e.g. 27"+) monitor.
  float aspect = min(uRes.x / uRes.y, 2.0);
  vec2 p = (uv - 0.5) * vec2(aspect, 1.0);
  float t = uTime;

  // Fades ribbons out toward the horizontal center (where the centered
  // headline sits) and back in toward each side, so the waves read as
  // framing the text from left/right instead of cutting through it.
  float centerFade = smoothstep(0.0, 0.38, abs(p.x));
  // Folding the x coordinate mirrors the whole ribbon pattern across the
  // vertical center line, so the same cluster of waves appears on both
  // sides instead of the original tuning's naturally one-sided lean.
  vec2 pf = vec2(abs(p.x), p.y);

  vec3 col = uBg;
  vec4 r;
  r = ribbon(pf, t,  0.55, -0.25, 0.075, 2.2, 0.15, 2.0, 0.0, 1.0);  col = mix(col, r.rgb, min(1.0, r.a * 1.15 * centerFade));
  r = ribbon(pf, t,  0.45,  0.30, 0.09, 1.8, 0.18, 1.6, 2.1, 0.8);  col = mix(col, r.rgb, min(1.0, r.a * 1.05 * centerFade));
  r = ribbon(pf, t,  0.70,  0.05, 0.06, 2.8, 0.11, 2.6, 4.3, 1.2);  col = mix(col, r.rgb, r.a * 0.95 * centerFade);

  col += (hash(gl_FragCoord.xy + fract(t) * 100.0) - 0.5) * 0.03;
  gl_FragColor = vec4(col, 1.0);
}
`;

const VERT_SRC = "attribute vec2 p; void main(){ gl_Position = vec4(p, 0., 1.); }";

// Ribbon greens from the reference; background is this site's own page
// grey instead of the reference's own #d8d8d8.
const PAL = { bg: "#F5F5F5", c1: "#005c33", c2: "#00873f", c3: "#7fcf98" };

function hexToRgb(hex: string): [number, number, number] {
  return [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255) as [number, number, number];
}

export default function HeroWaveBackground({ className }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const gl = canvas.getContext("webgl", { antialias: false });
    if (!gl) {
      wrap.style.background = `radial-gradient(ellipse at 55% 40%, ${PAL.c3}, ${PAL.bg} 60%)`;
      return;
    }

    function compile(type: number, src: string) {
      const s = gl!.createShader(type)!;
      gl!.shaderSource(s, src);
      gl!.compileShader(s);
      if (!gl!.getShaderParameter(s, gl!.COMPILE_STATUS)) {
        const info = gl!.getShaderInfoLog(s);
        gl!.deleteShader(s);
        throw new Error(info ?? "Shader compile failed");
      }
      return s;
    }

    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT_SRC));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG_SRC));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    const U = (n: string) => gl.getUniformLocation(prog, n);
    const uRes = U("uRes");
    const uTime = U("uTime");
    gl.uniform3fv(U("uBg"), hexToRgb(PAL.bg));
    gl.uniform3fv(U("uC1"), hexToRgb(PAL.c1));
    gl.uniform3fv(U("uC2"), hexToRgb(PAL.c2));
    gl.uniform3fv(U("uC3"), hexToRgb(PAL.c3));

    const SCALE = 0.75; // waves are soft/blurred — full resolution buys nothing
    const FPS = 30;
    let time = 0;
    let last = 0;
    let raf = 0;
    let visible = true;

    function draw() {
      gl!.viewport(0, 0, canvas!.width, canvas!.height);
      gl!.uniform2f(uRes, canvas!.width, canvas!.height);
      gl!.uniform1f(uTime, time);
      gl!.drawArrays(gl!.TRIANGLES, 0, 3);
    }
    function resize() {
      canvas!.width = Math.round(wrap!.clientWidth * SCALE);
      canvas!.height = Math.round(wrap!.clientHeight * SCALE);
      draw();
    }
    function frame(now: number) {
      raf = requestAnimationFrame(frame);
      if (reduceMotion || !visible || document.hidden || now - last < 1000 / FPS) return;
      last = now;
      time += 1 / FPS;
      draw();
    }

    resize();
    raf = requestAnimationFrame(frame);
    window.addEventListener("resize", resize);

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
    });
    io.observe(wrap);

    // Slow parallax: the canvas lags behind the page scroll instead of
    // moving 1:1 with it, same feel as the reference's BG_SPEED.
    const BG_SPEED = 0.65;
    let ticking = false;
    function applyParallax() {
      ticking = false;
      const h = wrap!.offsetHeight;
      const y = Math.min(window.scrollY, h);
      canvas!.style.transform = `translate3d(0, ${y * BG_SPEED}px, 0)`;
    }
    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(applyParallax);
      }
    }
    if (!reduceMotion) {
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className={className}
      style={{
        maskImage: "linear-gradient(to bottom, #000 75%, transparent)",
        WebkitMaskImage: "linear-gradient(to bottom, #000 75%, transparent)",
      }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full will-change-transform" />
    </div>
  );
}
