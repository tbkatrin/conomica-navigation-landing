import type { ReactNode } from "react";
import Asset from "./Asset";
import { fontVelaGxBold, fontVelaGxExtraBold, fontVelaMedium, fontVelaRegular } from "./fonts";

/**
 * Redesigned hero — per Figma node 218:2027 ("Главная 1440" / frame
 * 225:5804 "Hero"). Simpler than the previous hero: no trust badges, no
 * per-product descriptions — those moved into the new HeroShowcase block
 * right below. The animated wave keeps its sway animation but is mirrored
 * horizontally to match the new design (nested wrapper: outer div carries
 * position + the `hero-wave` sway animation, inner div carries the static
 * flip so the two transforms don't fight over the same CSS property).
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

function ProductCard({ name, sub }: { name: string; sub: string }) {
  return (
    <div className="flex h-[140px] flex-1 items-center justify-between rounded-[16px] bg-white px-[32px] py-[24px] drop-shadow-[4px_4px_17px_rgba(0,0,0,0.11)]">
      <div className={`text-black ${fontVelaGxBold}`}>
        <p className="text-[38px] leading-[0.98] tracking-[-1.14px]">{name}</p>
        <p className="text-[28px] leading-[0.95] tracking-[-0.84px]">{sub}</p>
      </div>
      <button className="flex h-[48px] w-[160px] shrink-0 items-center justify-center rounded-[12px] bg-[#00703E] drop-shadow-[0px_2px_1px_rgba(0,0,0,0.04)] transition-colors hover:bg-[#0EAD66]">
        <span className={`text-[16px] leading-[1.2] tracking-[0.16px] text-white ${fontVelaMedium}`}>
          На платформу
        </span>
      </button>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-[#F5F5F5]">
      {/* Animated wave background — full-bleed (spans the real viewport,
          not capped to the 1440px content column). Height uses `aspect-`
          instead of a fixed px value so the box's own aspect ratio always
          exactly matches the source photo's (2341×688, transparent
          background — no more white backing behind the wave) at any
          viewport width — that's what actually guarantees zero cropping in
          either direction; a fixed height only avoids cropping at one
          specific width and crops top/bottom everywhere else. Mirrored
          horizontally per the design. Outer div: position. Middle div: the
          existing sway animation. Inner div: the static horizontal flip. */}
      <div
        className="pointer-events-none absolute top-[12px] aspect-[2341/688] overflow-hidden"
        style={{ left: -60, width: "calc(100% + 60px)" }}
      >
        <div className="hero-wave h-full w-full">
          <div className="h-full w-full -scale-x-100">
            <Asset src="/hero/wave-bg.png" alt="" fit="cover" className="h-full w-full" />
          </div>
        </div>
      </div>

      {/* Header — fixed to the viewport so it stays put while the page scrolls,
          instead of scrolling away with the rest of the Hero content. */}
      <header className="fixed left-0 top-0 z-50 w-full">
        <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-[34px] py-[18px]">
          <div className="flex items-center gap-[24px]">
            <Asset src="/hero/cone.svg" alt="" className="h-[67px] w-[59px]" />
            <div className="flex flex-col items-start gap-[4px]">
              <Asset
                src="/hero/conomica-wordmark.svg"
                alt="Conomica"
                className="h-[56px] w-[327px]"
              />
              <p
                className={`text-[28px] leading-[0.95] tracking-[-0.84px] text-[#161616] ${fontVelaGxBold}`}
              >
                группа компаний
              </p>
            </div>
          </div>
          <nav className="flex items-center gap-[32px] rounded-[16px] bg-white/[0.24] px-[32px] py-[24px] backdrop-blur-[1.5px] drop-shadow-[8px_6px_16px_rgba(0,0,0,0.14)]">
            <NavLink href="https://conomica.ru/creditors/">Бизнесу</NavLink>
            <NavLink href="https://conomica.ru/investors">Инвесторам</NavLink>
            <NavLink>О нас</NavLink>
            <NavLink>Стать партнером</NavLink>
          </nav>
        </div>
      </header>

      <div className="relative mx-auto w-full max-w-[1440px]" style={{ minHeight: 756 }}>
        {/* Headline */}
        <h1
          className={`absolute right-[32px] top-[493px] w-[653px] text-right leading-[0.95] tracking-[-1.56px] text-[#191919] ${fontVelaGxExtraBold}`}
          style={{ fontSize: 52 }}
        >
          <span className="block">Экосистема fintech</span>
          <span className="block">продуктов от Conomica</span>
        </h1>

        {/* Product row */}
        <div className="absolute left-[34px] top-[616px] flex w-[calc(100%-68px)] items-center gap-[21px]">
          <ProductCard name="Conomica" sub="займы" />
          <ProductCard name="Conomica" sub="цессии" />
          <ProductCard name="Rescore" sub="online" />
        </div>
      </div>
    </section>
  );
}
