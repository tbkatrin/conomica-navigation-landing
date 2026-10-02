import type { ReactNode } from "react";
import Asset from "./Asset";
import { fontVelaGxRegular, fontVelaRegular } from "./fonts";

/**
 * Site-wide fixed header — per Figma node 380:2144's own header (node
 * 311:2428/Header), which now has a single, permanent state: translucent
 * white background with the small logo always visible. The earlier
 * two-state design (no logo + transparent on the hero, small logo + solid
 * white once scrolled past it, per node 311:2514) was replaced per the new
 * hero redesign — the hero no longer draws its own separate big logo, so
 * the header's logo needs to be visible from the very first frame, not
 * conditionally on scroll position.
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
  return (
    <header className="fixed left-0 top-0 z-50 w-full bg-[rgba(255,255,255,0.6)] backdrop-blur-[1.5px]">
      <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between px-[2.2222cqw] py-[1.6667cqw] [container-type:inline-size]">
        <div className="flex min-w-0 flex-1 items-center">
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
        </div>
        <nav className="flex shrink-0 items-center gap-[1.6667cqw]">
          <NavLink href="https://conomica.ru/creditors/">Бизнесу</NavLink>
          <NavLink href="https://conomica.ru/investors">Инвесторам</NavLink>
          <NavLink>О нас</NavLink>
          <NavLink dropShadow={false}>Стать партнером</NavLink>
        </nav>
      </div>
    </header>
  );
}
