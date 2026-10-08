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
      <h2 className={`tm-h3 text-[#212121] ${fontVelaGxBold}`}>
        Свяжитесь с нами и мы предложим <span className="text-[#00703E]">лучшее решение</span>
      </h2>
      <div className="flex flex-col gap-3">
        {CARDS.map((c) => (
          <div key={c.label} className={`flex flex-col gap-5 rounded-[8px] bg-white p-5 ${SHADOW}`}>
            <p className={`tm-body text-black ${fontVelaMedium}`}>{c.label}</p>
            <div className="flex flex-col gap-3">
              <a
                href={`tel:${c.phone.replace(/[^+\d]/g, "")}`}
                className={`flex items-center gap-2.5 tm-h4 text-black ${fontVelaMedium}`}
              >
                <ContactIcon kind="phone" size={32} color="#353537" />
                {c.phone}
              </a>
              <a
                href={`mailto:${c.email}`}
                className={`flex items-center gap-2.5 break-all tm-h4 text-black ${fontVelaMedium}`}
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
