import type { ReactNode } from "react";
import Asset from "./Asset";
import { fontVelaGxBold, fontVelaGxRegular, fontVelaMedium } from "./fonts";

/**
 * Footer — per Figma node 307:1647 ("Footer desktop"), latest revision:
 * dark (#191919) background, three columns up top — "Компании группы" +
 * company list, a new "Контакты группы" column (email + phone), and the
 * social cards (QR/TenChat/VK) — then a divider and a single centred logo
 * lockup at the bottom (email/phone moved out of that bottom row into
 * their own column above).
 *
 * Tidied up the same way as before: fixed the double-spaced/typo'd company
 * names and unified their "«…»" quoting with GroupStructure.tsx's naming
 * convention, and gave the phone/email real tel:/mailto: links.
 */

const COMPANIES = [
  { name: "ООО «Управляющая компания Кономика»", inn: "9728069364" },
  { name: "ООО «Кономика»", inn: "9728069364" },
  { name: "ООО «Кономика займы для бизнеса»", inn: "9728131284" },
  { name: "ООО «Технологии скоринга»", inn: "7728468083" },
  { name: "ООО «Про Фактор»", inn: "7709976250" },
];

function SocialCard({ href, className, children }: { href: string; className?: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex shrink-0 items-center justify-center rounded-[4px] bg-[#F5F5F5] drop-shadow-[4px_4px_17px_rgba(0,0,0,0.11)] transition-opacity hover:opacity-80 ${className ?? ""}`}
    >
      {children}
    </a>
  );
}

export default function Footer() {
  return (
    <footer className="relative w-full bg-[#191919]">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-start gap-[40px] px-[100px] py-[72px]">
        <div className="flex w-full items-start justify-between gap-[64px]">
          {/* companies */}
          <div className="flex flex-col items-start gap-[32px]">
            <p className={`text-[28px] leading-[0.95] tracking-[-0.84px] text-[#F5F5F5] ${fontVelaGxBold}`}>
              Компании группы
            </p>
            {/* name and ИНН, in a grid so the name column auto-sizes to its
                widest row instead of a fixed 296px box — that fixed width
                was the reason short names ("ООО «Кономика»") left a huge
                gap before the divider while long ones didn't. The divider
                itself is each row's own border-right; with zero row-gap
                and the vertical rhythm moved into padding instead, those
                borders sit flush against each other and read as one
                continuous line, same as before. */}
            <div
              className="grid items-stretch"
              style={{ gridTemplateColumns: "max-content max-content", columnGap: 16 }}
            >
              {COMPANIES.map((co) => (
                <div key={co.inn + co.name} className="contents">
                  <p
                    className={`whitespace-nowrap border-r border-[#626262] py-[16px] pr-[16px] text-[14px] leading-none tracking-[-0.56px] text-white ${fontVelaMedium}`}
                  >
                    {co.name}
                  </p>
                  <div className={`flex items-center gap-[8px] whitespace-nowrap py-[16px] text-[14px] text-white ${fontVelaMedium}`}>
                    <span className="uppercase leading-[1.24] tracking-[0.28px]">ИНН</span>
                    <span className="leading-none tracking-[-0.56px]">{co.inn}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* contacts */}
          <div className="flex flex-col items-start gap-[32px]">
            <p className={`text-[28px] leading-[0.95] tracking-[-0.84px] text-[#F5F5F5] ${fontVelaGxBold}`}>
              Контакты группы
            </p>
            <div className={`flex flex-col items-start gap-[16px] text-[18px] leading-none tracking-[-0.72px] text-white ${fontVelaMedium}`}>
              <a href="mailto:info@conomica.ru" className="transition-colors hover:text-[#0EAD66]">
                info@conomica.ru
              </a>
              <a href="tel:+74954775257" className="transition-colors hover:text-[#0EAD66]">
                +7 (495) 477-52-57
              </a>
            </div>
          </div>

          {/* socials */}
          <div className="flex shrink-0 items-start gap-[8px]">
            <SocialCard href="https://conomica.ru" className="w-[186px] flex-col gap-[12px] p-[16px]">
              <Asset
                src="/footer/qr-conomica.png"
                alt="QR-код Conomica"
                className="shrink-0"
                style={{ width: 138, height: 138 }}
                fit="cover"
              />
              <div className={`flex w-full flex-col items-start gap-[8px] leading-none ${fontVelaMedium}`}>
                <p className="text-[18px] tracking-[-0.72px] text-[#353537]">Conomica</p>
                <p className="w-full text-[14px] tracking-[-0.56px] text-[#626262]">
                  Официальный информационный канал
                </p>
              </div>
            </SocialCard>
            <div className="flex w-[110px] shrink-0 flex-col gap-[8px]">
              <SocialCard href="https://tenchat.ru/conomica" className="h-[116px] w-full p-[10px]">
                <Asset src="/footer/tenchat.svg" alt="TenChat" className="h-[84px] w-[78px]" />
              </SocialCard>
              <SocialCard href="https://vk.com/conomica" className="h-[112px] w-full p-[10px]">
                <Asset src="/footer/vk.svg" alt="ВКонтакте" className="h-[76px] w-[76.9px]" />
              </SocialCard>
            </div>
          </div>
        </div>

        <div aria-hidden className="h-px w-full bg-[#626262]" />

        {/* centred logo lockup */}
        <div className="flex w-full items-center justify-center gap-[32px]">
          <Asset src="/footer/cone-sis-white.svg" alt="" className="h-[69px] w-[62px]" />
          <div className="flex flex-col items-start gap-[8px] pb-[4px]">
            <Asset src="/footer/wordmark-footer-white.svg" alt="Conomica" className="h-[50px] w-[292.61px]" />
            <p className={`text-[24px] leading-none text-white ${fontVelaGxRegular}`}>группа компаний</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
