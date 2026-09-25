"use client";

import { useEffect, useState, type ReactNode } from "react";
import Asset from "./Asset";
import { fontVelaGxRegular, fontVelaRegular } from "./fonts";

/**
 * Site-wide fixed header — per Figma node 311:2514, which defines two
 * states for the same bar:
 *  - "On hero Page": transparent (just a faint blur), no logo — the Hero
 *    section shows its own big logo mark as part of its own content instead.
 *  - "On other page": translucent white background + a small logo, shown
 *    once the Hero section has scrolled out of view.
 * Rendered once at the page root (not inside Hero) so it persists — and
 * keeps tracking the Hero's scroll position — across every section.
 */

function NavLink({ children, href }: { children: ReactNode; href?: string }) {
  const className = `shrink-0 whitespace-nowrap border-b border-[#161616] pb-[2px] text-[14px] leading-[1.4] tracking-[0.14px] text-[#161616] transition-colors hover:border-[#0EAD66] hover:text-[#0EAD66] ${fontVelaRegular}`;

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

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;

    const onScroll = () => setPastHero(hero.getBoundingClientRect().bottom <= 0);
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
      className={`fixed left-0 top-0 z-50 w-full transition-colors duration-300 ${
        pastHero ? "bg-white/80 backdrop-blur-[12px] drop-shadow-[0_2px_12px_rgba(0,0,0,0.06)]" : "bg-transparent backdrop-blur-[1.5px]"
      }`}
    >
      <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-[32px] py-[24px]">
        <div className="flex min-w-0 flex-1 items-center">
          {pastHero && (
            <div className="flex items-center gap-[16px]">
              <Asset src="/hero/cone.svg" alt="" className="h-[34.285px] w-[30.421px]" />
              <div className="flex flex-col items-start gap-[2px]">
                <Asset
                  src="/hero/conomica-wordmark.svg"
                  alt="Conomica"
                  className="h-[25.158px] w-[147.231px]"
                />
                <p className={`text-[16px] leading-none text-[#161616] ${fontVelaGxRegular}`}>
                  группа компаний
                </p>
              </div>
            </div>
          )}
        </div>
        <nav className="flex shrink-0 items-center gap-[32px]">
          <NavLink href="https://conomica.ru/creditors/">Бизнесу</NavLink>
          <NavLink href="https://conomica.ru/investors">Инвесторам</NavLink>
          <NavLink>О нас</NavLink>
          <NavLink>Стать партнером</NavLink>
        </nav>
      </div>
    </header>
  );
}
