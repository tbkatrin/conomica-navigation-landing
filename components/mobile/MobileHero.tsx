import type { ReactNode } from "react";
import Asset from "../Asset";
import { fontVelaGxBold, fontVelaMedium } from "../fonts";
import { CtaButton, SHADOW } from "./shared";

/**
 * Mobile hero (Figma "Главная 390"): wave art, the headline, and the three
 * product cards stacked — each with its description always visible, since
 * there is no hover on touch screens.
 */

const PRODUCTS: { name: string; sub: string; description: ReactNode; href: string }[] = [
  {
    name: "Conomica",
    sub: "займы",
    description: (
      <>
        <span className="text-[#00703E]">Инвестиции</span> в займы для бизнеса с обеспечением дебиторской
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
        <span className="text-[#00703E]">Сервис</span> для приобретения ликвидной дебиторской задолженности:
        инструменты для роста капитала
      </>
    ),
    href: "https://cabinet.conomica.space/",
  },
  {
    name: "Rescore",
    sub: "online",
    description: (
      <>
        <span className="text-[#00703E]">Сервис</span> сбора, анализа и мониторинга данных о платежеспособности
        контрагентов
      </>
    ),
    href: "https://corp.rescore.online/",
  },
];

export default function MobileHero() {
  return (
    <section id="hero-mobile" className="overflow-hidden pt-[72px]">
      {/* wave art — wider than the screen so only the ribbon's middle shows */}
      <div className="relative h-[230px] overflow-hidden">
        <div className="absolute top-0 h-full" style={{ left: "-34.6%", width: "169.2%" }}>
          <Asset src="/hero/wave-bg.png" alt="" fit="cover" className="h-full w-full" />
        </div>
      </div>

      <h1
        className={`px-4 pb-6 pt-2 tm-h2 text-[#191919] ${fontVelaGxBold}`}
      >
        Экосистема fintech продуктов от Conomica
      </h1>

      <div className="flex flex-col gap-3 px-4 pb-8">
        {PRODUCTS.map((p) => (
          <div key={p.sub} className={`flex flex-col gap-4 rounded-[16px] bg-white px-5 pb-5 pt-6 ${SHADOW}`}>
            <div className={`flex flex-col gap-0.5 text-black ${fontVelaGxBold}`}>
              <p className="tm-h2">{p.name}</p>
              <p className="tm-h3">{p.sub}</p>
            </div>
            <p className={`tm-small text-[#191919] ${fontVelaMedium}`}>
              {p.description}
            </p>
            <CtaButton href={p.href}>На платформу</CtaButton>
          </div>
        ))}
      </div>
    </section>
  );
}
