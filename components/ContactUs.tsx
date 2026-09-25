import type { ReactNode } from "react";
import { DecorativeCircleMark } from "./DecorativeCircle";
import { fontVelaGxBold, fontVelaMedium } from "./fonts";

/**
 * "Свяжитесь с нами и мы предложим лучшее решение" — per Figma node
 * 348:1955, two audience-specific contact cards right before the footer.
 *
 * The Figma frame's own phone/email values look like placeholders rather
 * than real data (a typo'd "+7 (945)…" instead of "495", and invented
 * addresses "invest@conomica.ru" / "for.lenders@conomica.ru" that don't
 * exist anywhere on the live site) — verified against conomica.ru itself:
 * the investors line is +7 (495) 150-16-67, the creditors/business line is
 * +7 (495) 477-52-57 (same one already used for "Бизнесу" in the header).
 * Emails: info@conomica.ru for investors, info@conomica-finance.ru for
 * borrowers.
 *
 * Each card also carries the small grey "sis"/"Group 345" watermark from
 * the design — the same ring+dots(+cone) mark as DecorativeCircleMark,
 * just muted and static (see that component's `tone="muted"`), positioned
 * with the card's own Figma-measured coordinates and clipped by the
 * card's `overflow-hidden`. The investors card keeps the centred cone;
 * the borrowers card's instance has no cone in Figma.
 */

function PhoneIcon() {
  return (
    <svg viewBox="0 0 32 32" className="size-[32px] shrink-0" fill="none">
      <circle cx="16" cy="16" r="15.5" stroke="#353537" />
      <path
        d="M11.2915 8.47092V10.1742C11.2922 10.3323 11.2598 10.4888 11.1964 10.6337C11.1331 10.7786 11.0402 10.9086 10.9237 11.0155C10.8071 11.1224 10.6696 11.2038 10.5198 11.2544C10.37 11.3051 10.2113 11.3239 10.0538 11.3097C8.30675 11.1198 6.62857 10.5229 5.15412 9.56668C3.78233 8.69499 2.6193 7.53195 1.74761 6.16017C0.788094 4.67902 0.190969 2.99267 0.00460828 1.23775C-0.00957956 1.08075 0.00907928 0.922516 0.0593966 0.77312C0.109714 0.623724 0.190587 0.486442 0.296868 0.370014C0.403148 0.253586 0.532507 0.160564 0.676708 0.0968693C0.820909 0.0331746 0.976793 0.0002035 1.13444 5.50449e-05H2.83769C3.11322 -0.00265679 3.38034 0.0949143 3.58926 0.274582C3.79818 0.454249 3.93463 0.703754 3.9732 0.976589C4.04509 1.52167 4.17841 2.05687 4.37062 2.57197C4.44701 2.77518 4.46354 2.99603 4.41826 3.20835C4.37298 3.42067 4.26778 3.61556 4.11513 3.76993L3.39409 4.49097C4.20231 5.91237 5.37921 7.08926 6.8006 7.89749L7.52165 7.17644C7.67601 7.02379 7.8709 6.9186 8.08322 6.87332C8.29554 6.82803 8.51639 6.84457 8.7196 6.92095C9.23471 7.11317 9.76991 7.24649 10.315 7.31838C10.5908 7.35729 10.8427 7.4962 11.0227 7.70871C11.2028 7.92121 11.2984 8.19248 11.2915 8.47092Z"
        fill="#353537"
        transform="translate(10.35,10.34)"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 32 32" className="size-[32px] shrink-0" fill="none">
      <circle cx="16" cy="16" r="15.5" stroke="#353537" />
      <path
        d="M0.753221 0L6.00773 4.1629L11.2545 0H0.753221ZM0 0.499857V6.85714H11.9991V0.503293L6.27398 5.04924C6.19816 5.10915 6.10436 5.14174 6.00773 5.14174C5.9111 5.14174 5.8173 5.10915 5.74148 5.04924L0.000858901 0.499857H0Z"
        fill="#353537"
        transform="translate(10,12.57)"
      />
    </svg>
  );
}

function ContactCard({
  label,
  phone,
  email,
  labelPosition,
  mark,
}: {
  label: string;
  phone: string;
  email: string;
  labelPosition: "bottom" | "top";
  /** the muted watermark ring, positioned with Figma's own measured
   * coordinates (top/left of its size×size box, relative to the card). */
  mark: { top: number; left: number; size: number; cone?: boolean };
}) {
  const isTop = labelPosition === "top";

  const row = (icon: ReactNode, text: string, href: string) => (
    <a
      href={href}
      className={`flex items-center gap-[10px] transition-colors hover:text-[#00703E] ${
        isTop ? "flex-row-reverse" : ""
      }`}
    >
      {icon}
      <span className={`text-[28px] leading-[0.95] tracking-[-0.84px] text-black ${fontVelaGxBold}`}>{text}</span>
    </a>
  );

  const contact = (
    <div className={`flex w-full flex-col gap-[16px] ${isTop ? "items-end" : "items-start"}`}>
      {row(<PhoneIcon />, phone, `tel:${phone.replace(/[^+\d]/g, "")}`)}
      {row(<MailIcon />, email, `mailto:${email}`)}
    </div>
  );

  const labelEl = (
    <div className={`flex w-full items-start ${labelPosition === "bottom" ? "justify-end" : "justify-start"}`}>
      <p className={`text-[18px] leading-none tracking-[-0.72px] text-black ${fontVelaMedium}`}>{label}</p>
    </div>
  );

  return (
    <div className="relative h-[285px] w-full flex-1 overflow-hidden rounded-[8px] bg-white drop-shadow-[4px_4px_17px_rgba(0,0,0,0.11)]">
      <div className="flex h-full w-full flex-col items-start justify-between px-[32px] py-[24px]">
        {labelPosition === "bottom" ? contact : labelEl}
        {labelPosition === "bottom" ? labelEl : contact}
      </div>
      <div className="pointer-events-none absolute" style={{ top: mark.top, left: mark.left }}>
        <DecorativeCircleMark size={mark.size} tone="muted" cone={mark.cone ?? true} />
      </div>
    </div>
  );
}

export default function ContactUs() {
  return (
    <section
      className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col items-start gap-[64px] px-[82px] py-[100px]"
    >
      <p
        className={`w-full max-w-[539px] text-[38px] leading-[0.98] tracking-[-1.14px] text-[#212121] ${fontVelaGxBold}`}
      >
        Свяжитесь с нами и мы предложим <span className="text-[#00703E]">лучшее решение</span>
      </p>
      <div className="flex w-full items-center gap-[24px]">
        <ContactCard
          label="Инвесторам"
          phone="+7 (495) 150-16-67"
          email="info@conomica.ru"
          labelPosition="bottom"
          mark={{ top: -10, left: 504, size: 128 }}
        />
        <ContactCard
          label="Заемщикам"
          phone="+7 (495) 477-52-57"
          email="info@conomica-finance.ru"
          labelPosition="top"
          mark={{ top: 188, left: -25, size: 128, cone: false }}
        />
      </div>
    </section>
  );
}
