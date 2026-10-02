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
 *
 * Fluid-scaling pass: every size/gap/position below is expressed in `cqw`
 * (1cqw = 1% of the `[container-type:inline-size]` wrapper's own rendered
 * width) instead of raw px, computed against this file's 1440px reference
 * — same technique Loader.tsx already used. Font-sizes additionally get a
 * `clamp(floor, Pcqw, ceiling)` so text never shrinks below ~11px on a
 * narrow phone; tracking/letter-spacing switches to `em` (ratio to its own
 * paired font-size) so it rides along with the clamped font-size instead
 * of needing its own floor.
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
      <div className="mx-auto flex w-full max-w-[1600px] flex-col items-start gap-[2.7778cqw] px-[6.9444cqw] py-[5cqw] [container-type:inline-size]">
        <div className="flex w-full items-start justify-between gap-[4.4444cqw]">
          {/* companies */}
          <div className="flex flex-col items-start gap-[2.2222cqw]">
            <p
              className={`text-[clamp(11px,1.9444cqw,31.11px)] leading-[0.95] tracking-[-0.03em] text-[#F5F5F5] ${fontVelaGxBold}`}
            >
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
              style={{ gridTemplateColumns: "max-content max-content", columnGap: "1.1111cqw" }}
            >
              {COMPANIES.map((co) => (
                <div key={co.inn + co.name} className="contents">
                  <p
                    className={`whitespace-nowrap border-r border-[#626262] py-[1.1111cqw] pr-[1.1111cqw] text-[clamp(11px,0.9722cqw,15.56px)] leading-none tracking-[-0.04em] text-white ${fontVelaMedium}`}
                  >
                    {co.name}
                  </p>
                  <div
                    className={`flex items-center gap-[0.5556cqw] whitespace-nowrap py-[1.1111cqw] text-[clamp(11px,0.9722cqw,15.56px)] text-white ${fontVelaMedium}`}
                  >
                    <span className="uppercase leading-[1.24] tracking-[0.02em]">ИНН</span>
                    <span className="leading-none tracking-[-0.04em]">{co.inn}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* contacts */}
          <div className="flex flex-col items-start gap-[2.2222cqw]">
            <p
              className={`text-[clamp(11px,1.9444cqw,31.11px)] leading-[0.95] tracking-[-0.03em] text-[#F5F5F5] ${fontVelaGxBold}`}
            >
              Контакты группы
            </p>
            <div
              className={`flex flex-col items-start gap-[1.1111cqw] text-[clamp(11px,1.25cqw,20px)] leading-none tracking-[-0.04em] text-white ${fontVelaMedium}`}
            >
              <a href="mailto:info@conomica.ru" className="transition-colors hover:text-[#0EAD66]">
                info@conomica.ru
              </a>
              <a href="tel:+74954775257" className="transition-colors hover:text-[#0EAD66]">
                +7 (495) 477-52-57
              </a>
            </div>
          </div>

          {/* socials */}
          <div className="flex shrink-0 items-start gap-[0.5556cqw]">
            <SocialCard
              href="https://conomica.ru"
              className="w-[12.9167cqw] flex-col gap-[0.8333cqw] p-[1.1111cqw]"
            >
              <Asset
                src="/footer/qr-conomica.png"
                alt="QR-код Conomica"
                className="shrink-0"
                style={{ width: "9.5833cqw", height: "9.5833cqw" }}
                fit="cover"
              />
              <div className={`flex w-full flex-col items-start gap-[0.5556cqw] leading-none ${fontVelaMedium}`}>
                <p className="text-[clamp(11px,1.25cqw,20px)] tracking-[-0.04em] text-[#353537]">Conomica</p>
                <p className="w-full text-[clamp(11px,0.9722cqw,15.56px)] tracking-[-0.04em] text-[#626262]">
                  Официальный информационный канал
                </p>
              </div>
            </SocialCard>
            <div className="flex w-[7.6389cqw] shrink-0 flex-col gap-[0.5556cqw]">
              <SocialCard href="https://tenchat.ru/conomica" className="h-[8.0556cqw] w-full p-[0.6944cqw]">
                <Asset src="/footer/tenchat.svg" alt="TenChat" className="h-[5.8333cqw] w-[5.4167cqw]" />
              </SocialCard>
              <SocialCard href="https://vk.com/conomica" className="h-[7.7778cqw] w-full p-[0.6944cqw]">
                <Asset src="/footer/vk.svg" alt="ВКонтакте" className="h-[5.2778cqw] w-[5.3403cqw]" />
              </SocialCard>
            </div>
          </div>
        </div>

        <div aria-hidden className="h-px w-full bg-[#626262]" />

        {/* centred logo lockup */}
        <div className="flex w-full items-center justify-center gap-[2.2222cqw]">
          <Asset src="/footer/cone-sis-white.svg" alt="" className="h-[4.7917cqw] w-[4.3056cqw]" />
          <div className="flex flex-col items-start gap-[0.5556cqw] pb-[0.2778cqw]">
            <Asset src="/footer/wordmark-footer-white.svg" alt="Conomica" className="h-[3.4722cqw] w-[20.3201cqw]" />
            <p className={`text-[clamp(11px,1.6667cqw,26.67px)] leading-none text-white ${fontVelaGxRegular}`}>
              группа компаний
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
