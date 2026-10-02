import type { ReactNode } from "react";
import Asset from "./Asset";
import HeroWaveBackground from "./HeroWaveBackground";
import { fontVelaGxBold, fontVelaMedium } from "./fonts";

/**
 * Hero — redesigned per Figma node 380:2144 (replaces the earlier
 * node 218:2027 version this file used before): centered uppercase
 * headline with a right-aligned note above it, and three taller product
 * cards each showing an angled MacBook mockup peeking out from behind its
 * text instead of a plain name+button row. The big logo that used to live
 * here is gone — the header (SiteHeader.tsx) now shows the small logo
 * permanently instead of only after scrolling past this section.
 *
 * The background is the animated WebGL "wave" shader (see
 * HeroWaveBackground.tsx), ported from a reference supplied by the user,
 * with the page's own grey kept as the canvas's base fill.
 *
 * Fluid-scaling pass: everything is in `cqw` against this file's 1440px
 * reference (see Footer.tsx's doc comment for the technique writeup);
 * font-sizes use `clamp(floor, Pcqw, ceiling)`, tracking is in `em`.
 * Only the MacBook mockup inside each card gets its own nested
 * `[container-type:inline-size]` wrapper (sized to the card's full box via
 * `absolute inset-0`), since its left/width/height are cqw calibrated
 * against the *card's* own width (carried over from a reference
 * implementation the user supplied). That container-type must NOT sit on
 * the card itself, or the card's own text (eyebrow/name/button/
 * description) would also resolve its cqw against the card's ~1/3-page
 * width instead of this file's 1440px page reference — which is exactly
 * the bug that caused text to render at its clamp floor at every viewport.
 */

interface LaptopSpec {
  left: string;
  top: number;
  width: string;
  height: string;
  /** only the "займы" card's mockup has this extra wrapping inset around
   * body+screen together — the other two don't. */
  groupInset?: string;
  screenInset: string;
  screenRadius?: number;
  screenRect: { left: string; top: string; width: string; height: string };
  notchInset: string;
  screen: string;
}

function Laptop({ spec }: { spec: LaptopSpec }) {
  const body = (
    <>
      <Asset src="/products-promo/macbook.png" alt="" className="absolute inset-0 h-full w-full -scale-x-100" />
      <div
        className="absolute overflow-hidden"
        style={{ inset: spec.screenInset, borderRadius: spec.screenRadius }}
      >
        <Asset
          src={spec.screen}
          alt=""
          fit="fill"
          className="absolute"
          style={spec.screenRect}
        />
      </div>
    </>
  );

  return (
    <div
      className="pointer-events-none absolute [container-type:inline-size]"
      style={{ left: spec.left, top: spec.top, width: spec.width, height: spec.height }}
    >
      {spec.groupInset ? (
        <div className="absolute" style={{ inset: spec.groupInset }}>
          {body}
        </div>
      ) : (
        body
      )}
      <div className="absolute rounded-bl-[7px] rounded-br-[6px] bg-black" style={{ inset: spec.notchInset }} />
    </div>
  );
}

interface Product {
  eyebrow: string;
  name: string;
  sub: string;
  description: ReactNode;
  href: string;
  nameGap: string;
  nameAlign: "items-center" | "items-start";
  nameWidth?: string;
  laptop: LaptopSpec;
}

const PRODUCTS: Product[] = [
  {
    eyebrow: "Онлайн-сервис",
    name: "Conomica",
    sub: "займы",
    description: (
      <>
        <span className="text-[#00703E]">Инвестиции</span> в займы для бизнеса с обеспечением
      </>
    ),
    href: "https://conomica-finance.ru/",
    nameGap: "1.1111cqw",
    nameAlign: "items-center",
    laptop: {
      left: "-6.625cqw",
      top: 198,
      width: "130.124cqw",
      height: "103.622cqw",
      groupInset: "2.06% -0.45% -2.06% 0.45%",
      screenInset: "15.57% 10.61% 30.61% 32.29%",
      screenRect: { left: "2.84%", top: "7.65%", width: "89.41%", height: "87%" },
      notchInset: "20.63% 36.92% 77.31% 56.2%",
      screen: "/products-promo/dashboard-overview.png",
    },
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
    nameAlign: "items-start",
    nameWidth: "12.5cqw",
    laptop: {
      left: "-8.568cqw",
      top: 216,
      width: "129.329cqw",
      height: "102.827cqw",
      screenInset: "17.37% 13.22% 31.31% 31.42%",
      screenRadius: 36,
      screenRect: { left: "4.29%", top: "3.88%", width: "92.41%", height: "91.46%" },
      notchInset: "18.57% 37.37% 79.37% 55.75%",
      screen: "/products-promo/dashboard-money.png",
    },
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
    nameAlign: "items-center",
    nameWidth: "10.0694cqw",
    laptop: {
      left: "-6.273cqw",
      top: 219,
      width: "129.329cqw",
      height: "102.827cqw",
      screenInset: "17.37% 13.22% 31.31% 31.42%",
      screenRadius: 36,
      screenRect: { left: "4.29%", top: "3.88%", width: "92.41%", height: "91.46%" },
      notchInset: "18.57% 37.37% 79.37% 55.75%",
      screen: "/products-promo/dashboard-money.png",
    },
  },
];

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="relative flex h-full flex-1 flex-col items-start justify-between overflow-hidden rounded-[24px] bg-white px-[2.7778cqw] py-[2.2222cqw] drop-shadow-[4px_4px_17px_rgba(0,0,0,0.11)]">
      <div className="relative z-[1] flex w-full items-end justify-between">
        <div className={`flex flex-col ${product.nameAlign} justify-center`} style={{ gap: product.nameGap, width: product.nameWidth }}>
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
      <p className={`relative z-[1] text-[clamp(11px,1.25cqw,20px)] leading-none tracking-[-0.04em] text-[#191919] ${fontVelaMedium}`}>
        {product.description}
      </p>
      <div className="absolute inset-0 [container-type:inline-size]">
        <Laptop spec={product.laptop} />
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="hero" className="relative w-full overflow-hidden bg-[#F5F5F5]">
      <HeroWaveBackground className="pointer-events-none absolute inset-0 overflow-hidden" />

      <div
        className="relative mx-auto w-full max-w-[1600px] [container-type:inline-size]"
        style={{ minHeight: "94.0972cqw" }}
      >
        {/* Headline + note */}
        <div
          className="absolute flex flex-col items-center gap-[4.5139cqw]"
          style={{ left: "2.5694cqw", top: "10.625cqw", width: "95.2083cqw" }}
        >
          <div className="flex w-full justify-end px-[2.7778cqw]">
            <p
              className={`text-right text-[clamp(11px,1.25cqw,20px)] leading-none tracking-[-0.04em] text-[#191919] ${fontVelaMedium}`}
              style={{ width: "16.7361cqw" }}
            >
              Опыт группы компаний во взыскании более 9 лет
            </p>
          </div>
          <h1
            className={`text-center uppercase leading-[0.95] tracking-[-0.03em] text-[#191919] ${fontVelaGxBold}`}
            style={{ fontSize: "clamp(17.33px, 3.6111cqw, 57.78px)", width: "clamp(260px, 42.5cqw, 680px)" }}
          >
            <span className="block">Экосистема</span>
            <span className="block">fintech продуктов</span>
            <span className="block">от группы компаний Conomica</span>
          </h1>
        </div>

        {/* Product cards */}
        <div
          className="absolute flex items-stretch gap-[1.6667cqw]"
          style={{ left: "2.5694cqw", top: "42.9167cqw", width: "95.2778cqw", height: "48.8194cqw" }}
        >
          {PRODUCTS.map((product) => (
            <ProductCard key={product.sub} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
