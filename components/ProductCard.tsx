/**
 * ProductCard — карточка-продукт героя. Макет Figma `hero for claude — all default`
 * (node 2044:619), состояния `card N -Default` / `card N -Hover`.
 *
 *   default — 304×423, фон `#EAF6EE`; лейбл-пилюля, заголовок `#010610`,
 *             описание Inter Medium `#47484A`, снизу зелёная кнопка «Узнать
 *             больше»; в правом верхнем углу — призрачная цифра-водяной знак
 *             `rgba(0,112,63,0.09)`, чуть выходящая за верхний край (обрезается)
 *   hover   — полная инверсия: фон → сплошной зелёный `#00703F`, текст `#FAFAFA`,
 *             кнопка становится белой с зелёным текстом; цифра → `rgba(249,250,250,0.09)`
 *
 * Инверсия — только по `:hover` / `:focus-visible` (CSS-варианты `group/card`).
 * Размер карточки в обоих состояниях фиксированный.
 */

import type { ProductCardData } from "./hero.data";

export default function ProductCard({ card }: { card: ProductCardData }) {
  return (
    <li className="relative h-[423px] w-[304px] shrink-0 rounded-card shadow-card">
      <a
        href={card.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${card.title.join(" ")} — ${card.description}`}
        className={
          "group/card relative flex h-full w-full flex-col justify-between overflow-hidden rounded-card bg-card-fill p-[40px] " +
          "transition-colors duration-300 ease-out hover:bg-brand-card focus-visible:bg-brand-card motion-reduce:transition-none " +
          "outline-none focus-visible:outline-brand"
        }
      >
        {/* призрачная цифра-водяной знак — прижата к правому верхнему углу */}
        <span
          aria-hidden
          className={
            "pointer-events-none absolute top-[-4px] right-[10px] block h-[110px] w-[180px] select-none text-right text-[110px] font-medium leading-normal text-[rgba(0,112,63,0.09)] " +
            "transition-all duration-300 motion-reduce:transition-none " +
            "group-hover/card:top-[-8px] group-hover/card:right-[13px] group-hover/card:text-[rgba(249,250,250,0.09)] " +
            "group-focus-visible/card:top-[-8px] group-focus-visible/card:right-[13px] group-focus-visible/card:text-[rgba(249,250,250,0.09)]"
          }
        >
          {card.numeral}
        </span>

        {/* контент */}
        <div className="relative flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <span className="self-start rounded-pill border border-card-pill bg-card-fill p-[10px] text-[12px] font-medium uppercase leading-none tracking-tag text-brand">
              {card.label}
            </span>

            <h3
              className={
                "text-[28px] font-medium leading-[1.08] tracking-title text-card-ink " +
                "transition-colors duration-300 motion-reduce:transition-none " +
                "group-hover/card:text-card-invert group-focus-visible/card:text-card-invert"
              }
            >
              {card.title.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h3>
          </div>

          <p
            className={
              "text-[18px] font-medium leading-[1.32] tracking-desc text-card-desc " +
              "transition-colors duration-300 motion-reduce:transition-none " +
              "group-hover/card:text-card-invert group-focus-visible/card:text-card-invert"
            }
          >
            {card.description}
          </p>
        </div>

        {/* кнопка */}
        <span
          className={
            "relative flex h-12 w-full items-center justify-center rounded-pill border border-transparent bg-brand text-[16px] font-medium leading-none tracking-btn text-white shadow-btn " +
            "transition-colors duration-300 motion-reduce:transition-none " +
            "group-hover/card:border-brand group-hover/card:bg-white group-hover/card:text-brand " +
            "group-focus-visible/card:border-brand group-focus-visible/card:bg-white group-focus-visible/card:text-brand"
          }
        >
          Узнать больше
        </span>
      </a>
    </li>
  );
}
