import type { ReactNode } from "react";
import Asset from "./Asset";
import { fontVelaGxBold, fontVelaGxRegular, fontVelaMedium } from "./fonts";

/**
 * Footer — per Figma node 307:1647 ("Footer desktop"), latest revision:
 * dark (#191919) background, three columns up top — "Компании группы" +
 * company list, a "Контакты группы" column (phone, email and the office
 * address, each with a round icon), and the
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

const ICON_CLASS = "size-[2.5cqw] shrink-0";
const ICON_COLOR = "#F5F5F5";

function PhoneIcon() {
  return (
    <svg viewBox="0 0 32 32" className={ICON_CLASS} fill="none" aria-hidden>
      <circle cx="16" cy="16" r="15.5" stroke={ICON_COLOR} />
      <path
        d="M11.2915 8.47092V10.1742C11.2922 10.3323 11.2598 10.4888 11.1964 10.6337C11.1331 10.7786 11.0402 10.9086 10.9237 11.0155C10.8071 11.1224 10.6696 11.2038 10.5198 11.2544C10.37 11.3051 10.2113 11.3239 10.0538 11.3097C8.30675 11.1198 6.62857 10.5229 5.15412 9.56668C3.78233 8.69499 2.6193 7.53195 1.74761 6.16017C0.788094 4.67902 0.190969 2.99267 0.00460828 1.23775C-0.00957956 1.08075 0.00907928 0.922516 0.0593966 0.77312C0.109714 0.623724 0.190587 0.486442 0.296868 0.370014C0.403148 0.253586 0.532507 0.160564 0.676708 0.0968693C0.820909 0.0331746 0.976793 0.0002035 1.13444 5.50449e-05H2.83769C3.11322 -0.00265679 3.38034 0.0949143 3.58926 0.274582C3.79818 0.454249 3.93463 0.703754 3.9732 0.976589C4.04509 1.52167 4.17841 2.05687 4.37062 2.57197C4.44701 2.77518 4.46354 2.99603 4.41826 3.20835C4.37298 3.42067 4.26778 3.61556 4.11513 3.76993L3.39409 4.49097C4.20231 5.91237 5.37921 7.08926 6.8006 7.89749L7.52165 7.17644C7.67601 7.02379 7.8709 6.9186 8.08322 6.87332C8.29554 6.82803 8.51639 6.84457 8.7196 6.92095C9.23471 7.11317 9.76991 7.24649 10.315 7.31838C10.5908 7.35729 10.8427 7.4962 11.0227 7.70871C11.2028 7.92121 11.2984 8.19248 11.2915 8.47092Z"
        fill={ICON_COLOR}
        transform="translate(10.35,10.34)"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 32 32" className={ICON_CLASS} fill="none" aria-hidden>
      <circle cx="16" cy="16" r="15.5" stroke={ICON_COLOR} />
      <path
        d="M0.753221 0L6.00773 4.1629L11.2545 0H0.753221ZM0 0.499857V6.85714H11.9991V0.503293L6.27398 5.04924C6.19816 5.10915 6.10436 5.14174 6.00773 5.14174C5.9111 5.14174 5.8173 5.10915 5.74148 5.04924L0.000858901 0.499857H0Z"
        fill={ICON_COLOR}
        transform="translate(10,12.57)"
      />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 32 32" className={ICON_CLASS} fill="none" aria-hidden>
      <circle cx="16" cy="16" r="15.5" stroke={ICON_COLOR} />
      <path
        d="M16 7.5c-3.6 0-6.5 2.8-6.5 6.4 0 4.6 6.5 10.6 6.5 10.6s6.5-6 6.5-10.6c0-3.6-2.9-6.4-6.5-6.4Z"
        fill={ICON_COLOR}
      />
      <circle cx="16" cy="13.9" r="2.3" fill="#191919" />
    </svg>
  );
}

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
      <div className="mx-auto w-full max-w-[1600px] [container-type:inline-size]">
      <div className="flex w-full flex-col items-start gap-[2.7778cqw] px-[6.9444cqw] py-[5cqw]">
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
              className={`flex flex-col items-start gap-[1.3889cqw] text-[clamp(11px,1.25cqw,20px)] leading-none tracking-[-0.04em] text-white ${fontVelaMedium}`}
            >
              <a href="tel:+74954775257" className="flex items-center gap-[0.9722cqw] transition-colors hover:text-[#0EAD66]">
                <PhoneIcon />
                +7 (495) 477-52-57
              </a>
              <a href="mailto:info@conomica.ru" className="flex items-center gap-[0.9722cqw] transition-colors hover:text-[#0EAD66]">
                <MailIcon />
                info@conomica.ru
              </a>
              <address className="flex items-center gap-[0.9722cqw] not-italic">
                <PinIcon />
                <span className="leading-[1.05]">
                  г. Москва, ул. Бутлерова 17
                  <br />
                  Бизнес центр «NEO GEO»
                </span>
              </address>
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
      </div>
    </footer>
  );
}
