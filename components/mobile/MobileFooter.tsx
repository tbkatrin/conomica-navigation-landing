import Asset from "../Asset";
import { COMPANIES, OFFICE } from "../Footer";
import { fontVelaGxBold, fontVelaGxRegular, fontVelaMedium } from "../fonts";

/** Mobile footer — Figma "Footer" 495:1835: a white card with the meeting /
 * contacts block, the companies with their ИНН, the Telegram QR card, a
 * divider and the logo lockup, stacked. Same copy as the desktop footer. */

const T2 = `text-[14px] leading-none tracking-[-0.04em] ${fontVelaMedium}`;
const H3 = `text-[28px] leading-[0.9] tracking-[-0.03em] text-[#17171a] ${fontVelaGxBold}`;

export default function MobileFooter() {
  return (
    <footer className="rounded-b-[24px] bg-white px-8 pb-8 pt-10">
      <div className="flex flex-col gap-8">
        <p className={H3}>
          Будем рады личной встрече!
          <br />
          Приезжайте к нам в&nbsp;офис на Калужской
        </p>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2 text-[#00703e]">
            <p className={T2}>{OFFICE.address}</p>
            <p className={T2}>{OFFICE.building}</p>
          </div>
          <p className={`${T2} text-[#17171a]`}>
            {OFFICE.hours[0]}
            <br />
            {OFFICE.hours[1]}
          </p>
          <div className="flex flex-col items-start gap-2.5 text-[#00703e]">
            <a href={`mailto:${OFFICE.email}`} className={T2}>
              {OFFICE.email}
            </a>
            <a href={`tel:${OFFICE.phone.replace(/[^+\d]/g, "")}`} className={T2}>
              {OFFICE.phone}
            </a>
            <button type="button" className={T2}>
              FAQ
            </button>
          </div>
          <p className={`${T2} text-[#626262]`}>{OFFICE.cookie}</p>
        </div>
      </div>

      <div className="mt-12 flex flex-col gap-8">
        <p className={H3}>Компании группы</p>
        <div className="flex flex-col gap-4">
          {COMPANIES.map((co) => (
            <div key={co.inn + co.name} className="flex flex-col gap-[6px] border-b border-[#D8D8D8] pb-3">
              <p className={`${T2} text-[#191919]`}>{co.name}</p>
              <p className={`${T2} text-[#626262]`}>
                <span className="uppercase tracking-[0.02em]">ИНН</span> {co.inn}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 flex w-[307px] max-w-full items-center gap-3 rounded-[12px] bg-[#F5F5F5] p-4">
        <Asset
          src="/footer/qr-telegram.png"
          alt="QR-код официального telegram-канала Conomica"
          fit="cover"
          className="h-[115px] w-[115px] shrink-0"
        />
        <div className="flex flex-col gap-3">
          <p className={H3}>Conomica</p>
          <p className={`${T2} text-[#616161]`}>
            Официальный информационный telegram-канал
          </p>
        </div>
      </div>

      <div aria-hidden className="mt-12 h-px bg-[#626262]" />

      <div className="mt-12 flex items-center gap-4">
        <Asset src="/hero/cone.svg" alt="" className="h-[34.285px] w-[30.421px] shrink-0" />
        <div className="flex flex-col items-start gap-0.5">
          <Asset src="/hero/conomica-wordmark.svg" alt="Conomica" className="h-[25.158px] w-[147.231px]" />
          <p className={`text-[16px] leading-none text-[#161616] ${fontVelaGxRegular}`}>группа компаний</p>
        </div>
      </div>
    </footer>
  );
}
