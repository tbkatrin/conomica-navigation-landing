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
 */

function ContactCard({
  label,
  phone,
  email,
  labelPosition,
}: {
  label: string;
  phone: string;
  email: string;
  labelPosition: "bottom" | "top";
}) {
  const contact = (
    <div
      className={`flex w-full flex-col gap-[16px] text-[18px] leading-none tracking-[-0.72px] text-black ${fontVelaMedium} ${
        labelPosition === "top" ? "items-end text-right" : "items-start"
      }`}
    >
      <a href={`tel:${phone.replace(/[^+\d]/g, "")}`} className="transition-colors hover:text-[#00703E]">
        {phone}
      </a>
      <a href={`mailto:${email}`} className="transition-colors hover:text-[#00703E]">
        {email}
      </a>
    </div>
  );

  const labelEl = (
    <div className={`flex w-full items-start ${labelPosition === "bottom" ? "justify-end" : "justify-start"}`}>
      <p className={`text-[28px] leading-[0.95] tracking-[-0.84px] text-black ${fontVelaGxBold}`}>{label}</p>
    </div>
  );

  return (
    <div className="flex h-[285px] w-full flex-1 flex-col items-start justify-between rounded-[8px] bg-white px-[32px] py-[24px] drop-shadow-[4px_4px_17px_rgba(0,0,0,0.11)]">
      {labelPosition === "bottom" ? contact : labelEl}
      {labelPosition === "bottom" ? labelEl : contact}
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
        <ContactCard label="Инвесторам" phone="+7 (495) 150-16-67" email="info@conomica.ru" labelPosition="bottom" />
        <ContactCard label="Заемщикам" phone="+7 (495) 477-52-57" email="info@conomica-finance.ru" labelPosition="top" />
      </div>
    </section>
  );
}
