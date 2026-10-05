"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Asset from "./Asset";
import { fontVelaGxRegular, fontVelaRegular } from "./fonts";

/**
 * Site-wide fixed header — per Figma node 311:2514, which defines two
 * states for the same bar:
 *  - "On hero Page": transparent (just a faint blur), no logo — the Hero
 *    section shows its own big logo mark as part of its own content instead.
 *  - "On other page" (node 311:2428): translucent white (60%) background +
 *    a small logo, shown as soon as the Hero headline reaches the header
 *    (so the nav never sits bare on top of the headline text).
 * Rendered once at the page root (not inside Hero) so it persists — and
 * keeps tracking the Hero's scroll position — across every section.
 *
 * Fluid-scaling: sizes in `cqw` against a 1440px reference; font-sizes use
 * `clamp(floor, Pcqw, ceiling)`, tracking is in `em`.
 */

function NavLink({ children, href, dropShadow = true }: { children: ReactNode; href?: string; dropShadow?: boolean }) {
  const className = `shrink-0 whitespace-nowrap border-b border-[#161616] pb-[0.1389cqw] text-[clamp(11px,0.9722cqw,15.56px)] leading-[1.4] tracking-[0.01em] text-[#161616] transition-colors hover:border-[#0EAD66] hover:text-[#0EAD66] ${
    dropShadow ? "drop-shadow-[8px_6px_7.8px_rgba(0,0,0,0.14)]" : ""
  } ${fontVelaRegular}`;

  if (href) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={className}>
      {children}
    </button>
  );
}

export default function SiteHeader() {
  const [pastHero, setPastHero] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const headline = document.getElementById("hero-headline");
    if (!headline) return;

    const onScroll = () => {
      const headerBottom = headerRef.current?.offsetHeight ?? 0;
      setPastHero(headline.getBoundingClientRect().top <= headerBottom);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className={`fixed left-0 top-0 z-50 w-full transition-colors duration-300 ${
        pastHero ? "bg-[rgba(255,255,255,0.6)] backdrop-blur-[1.5px]" : "bg-transparent backdrop-blur-[1.5px]"
      }`}
    >
      <div className="mx-auto w-full max-w-[1600px] [container-type:inline-size]">
      <div className="flex w-full items-center justify-between px-[2.2222cqw] py-[1.6667cqw]">
        <div className="flex min-w-0 flex-1 items-center">
          {pastHero && (
            <div className="flex items-center gap-[1.1111cqw]">
              <Asset src="/hero/cone.svg" alt="" className="h-[2.3809cqw] w-[2.1126cqw]" />
              <div className="flex flex-col items-start gap-[0.1389cqw]">
                <Asset
                  src="/hero/conomica-wordmark.svg"
                  alt="Conomica"
                  className="h-[1.7471cqw] w-[10.2244cqw]"
                />
                <p className={`text-[clamp(11px,1.1111cqw,17.78px)] leading-none text-[#161616] ${fontVelaGxRegular}`}>
                  группа компаний
                </p>
              </div>
            </div>
          )}
        </div>
        <nav className="flex shrink-0 items-center gap-[1.6667cqw]">
          <NavLink href="https://conomica.ru/creditors/">Бизнесу</NavLink>
          <NavLink href="https://conomica.ru/investors">Инвесторам</NavLink>
          <NavLink>О нас</NavLink>
          <NavLink dropShadow={false}>Стать партнером</NavLink>
        </nav>
      </div>
      </div>
    </header>
  );
}
