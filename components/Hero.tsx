import type { ReactNode } from "react";
import Asset from "./Asset";
import HeroWaveBackground from "./HeroWaveBackground";
import { fontVelaGxBold, fontVelaGxExtraBold, fontVelaMedium } from "./fonts";

/**
 * Hero — per Figma node 380:2144: a big logo top-left, a right-aligned
 * two-tone headline (layer "Hero-заголовок"), and three product cards
 * (447×242 in the frame, no laptop mockups). The header (SiteHeader.tsx)
 * stays transparent with no logo while this section is on screen, then
 * switches to the small logo once the headline reaches it.
 *
 * The background is the animated WebGL "wave" shader (see
 * HeroWaveBackground.tsx), ported from a reference supplied by the user,
 * with the page's own grey kept as the canvas's base fill.
 *
 * Fluid-scaling pass: everything is in `cqw` against this file's 1440px
 * reference (see Footer.tsx's doc comment for the technique writeup);
 * font-sizes use `clamp(floor, Pcqw, ceiling)`, tracking is in `em`. The
 * cards sit in normal flow below a spacer so they can grow past their
 * nominal height when the text wraps more on narrow screens.
 */

interface Product {
  eyebrow: string;
  name: string;
  sub: string;
  description: ReactNode;
  href: string;
  nameGap: string;
  nameWidth?: string;
}

const PRODUCTS: Product[] = [
  {
    eyebrow: "Онлайн-сервис",
    name: "Conomica",
    sub: "займы",
    description: (
      <>
        <span className="text-[#00703E]">Инвестиции</span> в займы для бизнеса с обеспечением дебиторской задолженностью контрагентов
      </>
    ),
    href: "https://conomica-finance.ru/",
    nameGap: "1.1111cqw",
  },
  {
    eyebrow: "Инвестиционная платформа",
    name: "Conomica",
    sub: "цессии",
    description: (
      <>
        <span className="text-[#00703E]">Сервис</span> для приобретения ликвидной дебиторской задолженности: инструменты для роста капитала
      </>
    ),
    href: "https://cabinet.conomica.space/",
    nameGap: "1.1111cqw",
    nameWidth: "12.5cqw",
  },
  {
    eyebrow: "Онлайн-сервис",
    name: "Rescore",
    sub: "online",
    description: (
      <>
        <span className="text-[#00703E]">Сервис</span> сбора, анализа и мониторинга <br />
        данных о платежеспособности контрагентов
      </>
    ),
    href: "https://corp.rescore.online/",
    nameGap: "0.6944cqw",
    nameWidth: "10.0694cqw",
  },
];

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="relative flex flex-1 flex-col items-start justify-between gap-[2.2222cqw] rounded-[24px] bg-white px-[2.7778cqw] py-[2.2222cqw] drop-shadow-[4px_4px_17px_rgba(0,0,0,0.11)]">
      <div className="flex w-full items-end justify-between">
        <div className="flex flex-col items-start justify-center" style={{ gap: product.nameGap, width: product.nameWidth }}>
          <p className={`text-[clamp(11px,0.9722cqw,15.56px)] leading-none tracking-[-0.04em] text-[#626262] ${fontVelaMedium}`}>
            {product.eyebrow}
          </p>
          <div className={`text-black ${fontVelaGxBold}`}>
            <p className="text-[clamp(12.67px,2.6389cqw,42.22px)] leading-[0.98] tracking-[-0.03em]">{product.name}</p>
            <p className="text-[clamp(11px,1.9444cqw,31.11px)] leading-[0.95] tracking-[-0.03em]">{product.sub}</p>
          </div>
        </div>
        <a
          href={product.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-[3.3333cqw] shrink-0 items-center justify-center rounded-[12px] bg-[#00703E] px-[1.1111cqw] drop-shadow-[0px_2px_1px_rgba(0,0,0,0.04)] transition-colors hover:bg-[#0EAD66]"
          style={{ width: "clamp(110px, 11.1111cqw, 177.78px)" }}
        >
          <span className={`text-[clamp(11px,1.1111cqw,17.78px)] leading-[1.2] tracking-[0.01em] text-white ${fontVelaMedium}`}>
            На платформу
          </span>
        </a>
      </div>
      <p className={`text-[clamp(11px,1.25cqw,20px)] leading-none tracking-[-0.04em] text-[#191919] ${fontVelaMedium}`}>
        {product.description}
      </p>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="hero" className="relative w-full overflow-hidden bg-[#F5F5F5]">
      <HeroWaveBackground className="pointer-events-none absolute inset-0 overflow-hidden" />

      <div className="relative mx-auto w-full max-w-[1600px] [container-type:inline-size]">
        {/* Top of the cards: 618px at the 1440 reference, but never above a
            point that keeps the cards' description text (their bottom
            ~10.8cqw) below the first screen's fold — so it only shows on
            scroll at any viewport size. The headline hangs 34px above the
            cards, as in Figma. */}
        <div className="relative" style={{ height: "max(42.9167cqw, calc(100svh - 9cqw))" }}>
          {/* Headline — Figma layer "Hero-заголовок" (node 429:1988) */}
          <h1
            id="hero-headline"
            className={`absolute text-right leading-[0.95] tracking-[-0.03em] text-[#353537] ${fontVelaGxExtraBold}`}
            style={{
              right: "2.8472cqw",
              bottom: "2.3611cqw",
              width: "clamp(260px, 42.1528cqw, 674px)",
              fontSize: "clamp(17.33px, 3.6111cqw, 57.78px)",
            }}
          >
            <span className="block text-[#00703e]">Экосистема</span>
            <span className="block">финтех-продуктов</span>
            <span className="block">
              группы <span className="text-[#00703e]">CONOMICA</span>
            </span>
          </h1>
        </div>
        {/* Big logo mark — ordinary page content, not part of the fixed
            header (see SiteHeader.tsx); scrolls away with the rest of Hero.
            z-[60] keeps it above the header's z-50 so the header's own
            backdrop-blur doesn't blur the logo underneath it. */}
        <div id="hero-logo" className="absolute z-[60] flex items-center gap-[1.6667cqw]" style={{ left: "2.3611cqw", top: "3.125cqw" }}>
          <Asset src="/hero/cone.svg" alt="" className="h-[4.6528cqw] w-[4.0972cqw]" />
          <div className="flex flex-col items-start gap-[0.2778cqw]">
            <Asset src="/hero/conomica-wordmark.svg" alt="Conomica" className="h-[3.8889cqw] w-[22.7083cqw]" />
            <p className={`text-[clamp(11px,1.9444cqw,31.11px)] leading-[0.95] tracking-[-0.03em] text-[#161616] ${fontVelaGxBold}`}>
              группа компаний
            </p>
          </div>
        </div>

        {/* Product cards */}
        <div
          className="relative flex items-stretch gap-[1.1111cqw]"
          style={{ marginLeft: "2.5694cqw", width: "95.2778cqw", minHeight: "16.8056cqw" }}
        >
          {PRODUCTS.map((product) => (
            <ProductCard key={product.sub} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
