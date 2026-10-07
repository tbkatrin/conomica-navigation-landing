import { fontVelaGxBold, fontVelaMedium } from "../fonts";
import { ContactIcon, SHADOW } from "./shared";

/** Mobile "Свяжитесь с нами": heading and two audience cards with tappable
 * phone / e-mail rows. Same (verified) contact data as ContactUs.tsx. */

const CARDS = [
  { label: "Инвесторам", phone: "+7 (495) 150-16-67", email: "info@conomica.ru" },
  { label: "Заемщикам", phone: "+7 (495) 477-52-57", email: "info@conomica-finance.ru" },
];

export default function MobileContact() {
  return (
    <section className="flex flex-col gap-6 px-4 py-10">
      <h2 className={`text-[38px] leading-[0.98] tracking-[-0.03em] text-[#212121] ${fontVelaGxBold}`}>
        Свяжитесь с нами и мы предложим <span className="text-[#00703E]">лучшее решение</span>
      </h2>
      <div className="flex flex-col gap-3">
        {CARDS.map((c) => (
          <div key={c.label} className={`flex flex-col gap-5 rounded-[8px] bg-white p-5 ${SHADOW}`}>
            <p className={`text-[14px] leading-none tracking-[-0.04em] text-black ${fontVelaMedium}`}>{c.label}</p>
            <div className="flex flex-col gap-3">
              <a
                href={`tel:${c.phone.replace(/[^+\d]/g, "")}`}
                className={`flex items-center gap-2.5 text-[24px] leading-[0.95] tracking-[-0.03em] text-black ${fontVelaGxBold}`}
              >
                <ContactIcon kind="phone" size={32} color="#353537" />
                {c.phone}
              </a>
              <a
                href={`mailto:${c.email}`}
                className={`flex items-center gap-2.5 break-all text-[24px] leading-[0.95] tracking-[-0.03em] text-black ${fontVelaGxBold}`}
              >
                <ContactIcon kind="mail" size={32} color="#353537" />
                {c.email}
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
