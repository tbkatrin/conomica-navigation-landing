import type { ReactNode } from "react";
import Asset from "./Asset";
import { fontVelaGxBold, fontVelaGxRegular, fontVelaMedium } from "./fonts";

/**
 * Footer — per Figma node 511:4683 ("Footer desktop"), latest revision: a
 * light card (white, rounded top, 8px gutters like the other cards) with
 * three columns — the Telegram QR card, "Будем рады личной встрече!" (office
 * address, hours, e-mail / phone / FAQ, cookie notice) and "Компании группы"
 * with each company's ИНН — then a divider and the centred logo lockup.
 *
 * Fluid-scaling: every size/gap below is in `cqw` against the card's own
 * 1424px Figma width (see the other sections' doc comments for the
 * technique); the container-type lives on the wrapper so the padding on the
 * inner element resolves against the card, not the viewport. Font-sizes use
 * `clamp(floor, Pcqw, ceiling)`, tracking is in `em`.
 *
 * The phones' version is components/mobile/MobileFooter.tsx.
 */

export const COMPANIES = [
  { name: "ООО «Управляющая компания Кономика»", inn: "9728069364" },
  { name: "ООО «Кономика»", inn: "9728069364" },
  { name: "ООО «Кономика займы для бизнеса»", inn: "9728131284" },
  { name: "ООО «Технологии скоринга»", inn: "7728468083" },
  { name: "ООО «Про Фактор»", inn: "7709976250" },
];

export const OFFICE = {
  address: "г. Москва, Бутлерова 17, этаж 2, ком. 27",
  building: "Бизнес-центр «NEO GEO», м. Калужская",
  hours: ["Время работы офиса:", "пн-пт с 10:00 до 19:00"],
  email: "info@conomica.ru",
  phone: "+7 (495) 150-16-67",
  cookie:
    "Продолжая использовать сайт, вы даете согласие на обработку файлов Cookies и других пользовательских данных, в соответствии с Политикой конфиденциальности.",
};

const T2 = `text-[clamp(11px,0.9831cqw,15.73px)] leading-none tracking-[-0.04em] ${fontVelaMedium}`;
const H3 = `text-[clamp(11px,1.9663cqw,31.46px)] leading-[0.9] tracking-[-0.03em] text-[#17171a] ${fontVelaGxBold}`;

function GreenLink({ href, children }: { href?: string; children: ReactNode }) {
  const className = `text-left text-[#00703e] transition-colors hover:text-[#0EAD66] ${T2}`;
  return href ? (
    <a href={href} className={className}>
      {children}
    </a>
  ) : (
    <button type="button" className={className}>
      {children}
    </button>
  );
}

export default function Footer() {
  return (
    <footer className="mx-auto w-full [container-type:inline-size]" style={{ maxWidth: "min(1600px, calc(100% - 16px))" }}>
      <div className="rounded-t-[24px] bg-white px-[2.2472cqw] pb-[3.3708cqw] pt-[3.3708cqw]">
        <div className="flex w-full items-start justify-center" style={{ gap: "11.1657cqw" }}>
          {/* Telegram QR card */}
          <div
            className="flex shrink-0 flex-col rounded-[16px] border border-[#D8D8D8] bg-[#F5F5F5]"
            style={{ width: "17.1348cqw", padding: "1.1236cqw", gap: "1.6854cqw" }}
          >
            <Asset
              src="/footer/qr-telegram.png"
              alt="QR-код официального telegram-канала Conomica"
              fit="cover"
              className="shrink-0"
              style={{ width: "14.7472cqw", height: "14.7472cqw" }}
            />
            <div className="flex flex-col" style={{ gap: "1.1236cqw", padding: "0 0.3511cqw 0.3511cqw" }}>
              <p className={H3}>Conomica</p>
              <p className={`${T2} text-[#616161]`}>
                Официальный информационный
                <br />
                telegram-канал
              </p>
            </div>
          </div>

          {/* meeting + contacts */}
          <div className="flex shrink-0 flex-col" style={{ width: "26.4747cqw", gap: "2.2472cqw" }}>
            <p className={H3}>
              Будем рады личной встрече!
              <br />
              Приезжайте к нам в офис на Калужской
            </p>
            <div className="flex flex-col" style={{ gap: "2.2472cqw" }}>
              <div className="flex flex-col" style={{ gap: "0.5618cqw" }}>
                <p className={`${T2} text-[#00703e]`}>{OFFICE.address}</p>
                <p className={`${T2} text-[#00703e]`}>{OFFICE.building}</p>
              </div>
              <p className={`${T2} text-[#17171a]`}>
                {OFFICE.hours[0]}
                <br />
                {OFFICE.hours[1]}
              </p>
              <div className="flex flex-col items-start" style={{ gap: "0.7022cqw" }}>
                <GreenLink href={`mailto:${OFFICE.email}`}>{OFFICE.email}</GreenLink>
                <GreenLink href={`tel:${OFFICE.phone.replace(/[^+\d]/g, "")}`}>{OFFICE.phone}</GreenLink>
                <GreenLink>FAQ</GreenLink>
              </div>
              <p className={`${T2} text-[#626262]`}>{OFFICE.cookie}</p>
            </div>
          </div>

          {/* companies */}
          <div className="flex shrink-0 flex-col" style={{ width: "28.8624cqw", gap: "3.3708cqw" }}>
            <p className={H3}>Компании группы</p>
            <div className="relative flex flex-col" style={{ gap: "2.2472cqw" }}>
              {COMPANIES.map((co) => (
                <div key={co.inn + co.name} className="flex items-center" style={{ gap: "1.6854cqw" }}>
                  <p className={`shrink-0 whitespace-nowrap text-[#191919] ${T2}`} style={{ width: "18.4691cqw" }}>
                    {co.name}
                  </p>
                  <p className={`flex items-center whitespace-nowrap text-[#626262] ${T2}`} style={{ gap: "0.5618cqw" }}>
                    <span className="uppercase leading-[1.24] tracking-[0.02em]">ИНН</span>
                    <span>{co.inn}</span>
                  </p>
                </div>
              ))}
              {/* vertical rule between the names and the ИНН column */}
              <div
                aria-hidden
                className="absolute top-0 w-px bg-[#D8D8D8]"
                style={{ left: "18.9607cqw", height: "13.9045cqw" }}
              />
            </div>
          </div>
        </div>

        <div aria-hidden className="h-px bg-[#D8D8D8]" style={{ margin: "4.1433cqw -0.8427cqw 0" }} />

        {/* centred logo lockup */}
        <div className="flex w-full items-center justify-center" style={{ gap: "2.2472cqw", marginTop: "4.1433cqw" }}>
          <Asset src="/hero/cone.svg" alt="" style={{ width: "4.3539cqw", height: "4.8455cqw" }} />
          <div className="flex flex-col items-start" style={{ width: "21.8399cqw", gap: "0.5618cqw", paddingBottom: "0.2809cqw" }}>
            <Asset
              src="/hero/conomica-wordmark.svg"
              alt="Conomica"
              style={{ width: "20.5484cqw", height: "3.5112cqw" }}
            />
            <p className={`whitespace-nowrap text-[clamp(11px,1.6854cqw,26.97px)] leading-none text-[#161616] ${fontVelaGxRegular}`}>
              группа компаний
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
