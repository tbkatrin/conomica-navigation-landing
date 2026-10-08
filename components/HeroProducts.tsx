"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { fontVelaGxBold, fontVelaMedium } from "./fonts";

/**
 * The three product cards on the Hero. Each shows its name and sub-title;
 * on hover/focus the name fades out and the product description fades in
 * (Figma node 468:2687), with the "На платформу" button staying put.
 *
 * To hint that hidden text exists, once the intro loader has finished the
 * hover state is played slowly on each card in turn (left to right), then
 * stops. The demo is skipped for `prefers-reduced-motion` and cancelled the
 * moment the user hovers, focuses or touches the cards. Sizes are in `cqw`
 * against the Hero's 1440px reference (see Footer.tsx's doc comment).
 */

const DEMO_START_DELAY = 1000; // ms after the loader finishes
const DEMO_HOLD = 3400; // ms each card stays in its hover state
const DEMO_GAP = 700; // ms with no card shown between two cards

interface Product {
  name: string;
  sub: string;
  description: ReactNode;
  href: string;
}

const PRODUCTS: Product[] = [
  {
    name: "Conomica",
    sub: "займы",
    description: (
      <>
        <span className="text-[#00703E]">Инвестиции</span> в&nbsp;займы для&nbsp;бизнеса с&nbsp;обеспечением дебиторской
        задолженностью контрагентов
      </>
    ),
    href: "https://conomica-finance.ru/",
  },
  {
    name: "Conomica",
    sub: "цессии",
    description: (
      <>
        <span className="text-[#00703E]">Сервис</span> для&nbsp;приобретения ликвидной дебиторской
        задолженности: инструменты для&nbsp;роста капитала
      </>
    ),
    href: "https://cabinet.conomica.space/",
  },
  {
    name: "Rescore",
    sub: "online",
    description: (
      <>
        <span className="text-[#00703E]">Сервис</span> сбора, анализа и мониторинга
        <br />
        данных о&nbsp;платежеспособности контрагентов
      </>
    ),
    href: "https://corp.rescore.online/",
  },
];

function ProductCard({ product, demo }: { product: Product; demo: boolean }) {
  return (
    <div className="group flex h-[9.7222cqw] flex-1 items-center justify-between gap-[1.6667cqw] rounded-[16px] bg-white px-[2.2222cqw] py-[1.6667cqw] drop-shadow-[4px_4px_17px_rgba(0,0,0,0.11)]">
      <div className="relative h-full min-w-0 flex-1">
        <div
          className={`flex h-full flex-col justify-center text-black transition-[opacity,transform,filter] duration-[900ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:-translate-y-1 group-hover:opacity-0 group-hover:blur-[2px] group-hover:delay-0 group-focus-within:-translate-y-1 group-focus-within:opacity-0 group-focus-within:blur-[2px] group-focus-within:delay-0 ${
            demo ? "-translate-y-1 opacity-0 blur-[2px] delay-0" : "translate-y-0 opacity-100 blur-[0px] delay-200"
          } ${fontVelaGxBold}`}
        >
          <p className="t-h2">{product.name}</p>
          <p className="t-h3">{product.sub}</p>
        </div>
        <p
          aria-hidden
          className={`absolute inset-0 flex items-center t-body leading-[1.15]! text-[#191919] transition-[opacity,transform,filter] duration-[900ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:translate-y-0 group-hover:opacity-100 group-hover:blur-[0px] group-hover:delay-200 group-focus-within:translate-y-0 group-focus-within:opacity-100 group-focus-within:blur-[0px] group-focus-within:delay-200 ${
            demo ? "translate-y-0 opacity-100 blur-[0px] delay-200" : "translate-y-1 opacity-0 blur-[2px] delay-0"
          } ${fontVelaMedium}`}
        >
          <span>{product.description}</span>
        </p>
      </div>
      <a
        href={product.href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-[3.3333cqw] shrink-0 items-center justify-center rounded-[12px] bg-[#00703E] drop-shadow-[0px_2px_1px_rgba(0,0,0,0.04)] transition-colors hover:bg-[#0EAD66]"
        style={{ width: "clamp(110px, 11.1111cqw, 177.78px)" }}
      >
        <span className={`t-button text-white ${fontVelaMedium}`}>
          На платформу
        </span>
      </a>
    </div>
  );
}

export default function HeroProducts({ className, style }: { className?: string; style?: React.CSSProperties }) {
  const [demoIndex, setDemoIndex] = useState<number | null>(null);
  const timers = useRef<number[]>([]);
  const cancelled = useRef(false);

  const stopDemo = () => {
    cancelled.current = true;
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
    setDemoIndex(null);
  };

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let started = false;
    const later = (fn: () => void, ms: number) => {
      timers.current.push(window.setTimeout(fn, ms));
    };

    const play = () => {
      if (started || cancelled.current) return;
      started = true;
      PRODUCTS.forEach((_, i) => {
        const at = DEMO_START_DELAY + i * (DEMO_HOLD + DEMO_GAP);
        later(() => !cancelled.current && setDemoIndex(i), at);
        later(() => !cancelled.current && setDemoIndex(null), at + DEMO_HOLD);
      });
    };

    // the intro loader locks scrolling while it runs and fires this when it ends
    document.addEventListener("conomica:loaded", play);
    if (document.body.style.overflow !== "hidden") play();

    return () => {
      document.removeEventListener("conomica:loaded", play);
      timers.current.forEach((t) => window.clearTimeout(t));
      timers.current = [];
    };
  }, []);

  return (
    <div
      className={className}
      style={style}
      onPointerEnter={stopDemo}
      onFocus={stopDemo}
      onTouchStart={stopDemo}
    >
      {PRODUCTS.map((product, i) => (
        <ProductCard key={product.sub} product={product} demo={demoIndex === i} />
      ))}
    </div>
  );
}
