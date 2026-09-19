import type { ReactNode } from "react";
import Asset from "./Asset";
import { fontVelaGxExtraBold, fontVelaGxRegular, fontVelaMedium } from "./fonts";

/**
 * Fixed-width (1440px) reproduction of the Figma hero frame (node 57:6392).
 * Assets live in /public/hero, exported from the same Figma node.
 */

function NavLink({ children }: { children: ReactNode }) {
  return (
    <p className="w-[161.893px] shrink-0 leading-[1.2] tracking-[-0.72px]">
      {children}
    </p>
  );
}

function TrustBadge({
  icon,
  iconAlt,
  iconClassName,
  lines,
  className,
}: {
  icon: string;
  iconAlt: string;
  iconClassName: string;
  lines: [string, string];
  className: string;
}) {
  return (
    <div
      className={`flex flex-col items-start justify-center rounded-[8px] bg-[rgba(245,245,245,0.8)] p-[8px] backdrop-blur-[20px] ${className}`}
    >
      <div className="flex w-full items-center gap-[24px]">
        <Asset src={icon} alt={iconAlt} className={iconClassName} />
        <div
          className={`min-w-0 flex-1 text-[14px] leading-none tracking-[-0.56px] text-[#161616] ${fontVelaMedium}`}
        >
          <p className="leading-none">{lines[0]}</p>
          <p className="leading-none">{lines[1]}</p>
        </div>
      </div>
    </div>
  );
}

function ProductCard({
  logo,
  description,
  cta,
}: {
  logo: ReactNode;
  description: string;
  cta: string;
}) {
  return (
    <div className="flex h-[249px] flex-1 flex-col items-start justify-between rounded-[8px] bg-[rgba(245,245,245,0.6)] px-[32px] py-[24px] backdrop-blur-[60px]">
      <div className="flex w-full items-start">{logo}</div>
      <p
        className={`w-full text-[18px] leading-[1.2] tracking-[-0.72px] text-[#626262] ${fontVelaMedium}`}
      >
        {description}
      </p>
      <div className="flex w-full items-end justify-end">
        <button className="flex h-[48px] w-[232px] items-center justify-center rounded-[12px] bg-[#00703E] drop-shadow-[0px_2px_1px_rgba(0,0,0,0.04)]">
          <span
            className={`text-[16px] leading-[1.2] tracking-[0.16px] text-white ${fontVelaMedium}`}
          >
            {cta}
          </span>
        </button>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-white">
      {/* Decorative wave background — full viewport width, not capped to the 1440px content column */}
      <Asset
        src="/hero/wave-bg.png"
        alt=""
        fit="cover"
        className="pointer-events-none absolute left-0 top-[385px] h-[590px] w-full"
      />

      <div className="relative mx-auto w-[1440px]" style={{ minHeight: 975 }}>
        {/* Header */}
        <header className="absolute left-0 top-0 z-10 flex w-[1440px] items-center justify-between bg-white px-[80px] py-[19px]">
          <div className="flex items-center gap-[24px]">
            <Asset
              src="/hero/cone.svg"
              alt=""
              className="h-[47px] w-[42px]"
            />
            <div className="flex w-[201px] flex-col items-start gap-[4px]">
              <Asset
                src="/hero/conomica-wordmark.svg"
                alt="Conomica"
                className="h-[32px] w-[190px]"
              />
              <p
                className={`text-[16px] leading-[1.2] tracking-[-0.16px] text-[#161616] ${fontVelaMedium}`}
              >
                группа компаний
              </p>
            </div>
          </div>
          <nav
            className={`flex items-center gap-[24px] text-[18px] text-[#161616] ${fontVelaMedium}`}
          >
            <NavLink>Бизнесу</NavLink>
            <NavLink>Инвесторам</NavLink>
            <NavLink>О нас</NavLink>
            <NavLink>Стать партнером</NavLink>
          </nav>
        </header>

        {/* Headline */}
        <h1
          className={`absolute left-[calc(25%+99px)] top-[186px] w-[607px] text-[52px] leading-[0.95] tracking-[-1.56px] text-[#161616] ${fontVelaGxExtraBold}`}
        >
          <span className="block">Экосистема fintech</span>
          <span className="block">продуктов Conomica</span>
        </h1>

        {/* Trust badges */}
        <div className="absolute left-[calc(25%+73px)] top-[332px] flex h-[63px] items-start gap-[8px]">
          <TrustBadge
            icon="/hero/badge-cb.svg"
            iconAlt="Лицензия ЦБ"
            iconClassName="h-[46.639px] w-[46.643px]"
            lines={["Лицензия", "ЦБ"]}
            className="w-[167px]"
          />
          <TrustBadge
            icon="/hero/badge-skolkovo.svg"
            iconAlt="Резидент Сколково"
            iconClassName="h-[43px] w-[42.685px]"
            lines={["Резидент", "Сколково"]}
            className="h-[62px] w-[167px]"
          />
          <TrustBadge
            icon="/hero/badge-mincifry.svg"
            iconAlt="Зарегистрированы в Минцифры"
            iconClassName="h-[34.201px] w-[34.107px]"
            lines={["Зарегистрированы", "в Минцифры"]}
            className="h-[62px] w-[236px]"
          />
        </div>

        {/* Eyebrow */}
        <div className="absolute left-[120px] top-[443px] w-[1200px]">
          <p
            className={`[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] text-[14px] uppercase leading-[1.24] tracking-[0.28px] text-[#212226] ${fontVelaMedium}`}
          >
            переход к продуктам
          </p>
        </div>

        {/* Product cards */}
        <div className="absolute left-[80px] top-[481px] flex w-[1280px] items-center gap-[12px]">
          <ProductCard
            logo={
              <div className="flex items-center gap-[16px]">
                <Asset
                  src="/hero/sis-icon.svg"
                  alt=""
                  className="h-[34.285px] w-[30.421px]"
                />
                <div className="flex w-[147.231px] flex-col items-start gap-[2px]">
                  <Asset
                    src="/hero/product-wordmark.svg"
                    alt="Conomica"
                    className="h-[25.158px] w-[147.231px]"
                  />
                  <p
                    className={`text-[16px] text-[#161616] ${fontVelaGxRegular}`}
                  >
                    займы
                  </p>
                </div>
              </div>
            }
            description="Платформа инвестиций в займы для бизнеса, обеспеченные текущей дебиторской задолженностью"
            cta="Перейти на платформу"
          />
          <ProductCard
            logo={
              <div className="flex items-center gap-[16px]">
                <Asset
                  src="/hero/cone-sis-icon.svg"
                  alt=""
                  className="h-[34.285px] w-[30.421px]"
                />
                <div className="flex w-[147.231px] flex-col items-start gap-[2px] pb-[4px]">
                  <Asset
                    src="/hero/product-wordmark.svg"
                    alt="Conomica"
                    className="h-[25.158px] w-[147.231px]"
                  />
                  <p
                    className={`text-[16px] text-[#161616] ${fontVelaGxRegular}`}
                  >
                    цессии
                  </p>
                </div>
              </div>
            }
            description="Платформа управления сделками по приобретению и взысканию истекшей дебиторской задолжености"
            cta="Перейти на платформу"
          />
          <ProductCard
            logo={
              <Asset
                src="/hero/rescore-logo.svg"
                alt="Rescore"
                className="h-[35px] w-[163px]"
              />
            }
            description="Платформа сбора, анализа и мониторинга данных о платежеспособности контрагентов"
            cta="Перейти на платформу"
          />
        </div>
      </div>
    </section>
  );
}
