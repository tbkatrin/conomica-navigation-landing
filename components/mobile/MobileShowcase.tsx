import Asset from "../Asset";
import { fontVelaGxBold, fontVelaMedium } from "../fonts";
import { CtaButton, SHADOW } from "./shared";

/**
 * Mobile version of the products showcase (Figma "Главная 390"): one card per
 * product — four badges in a 2×2 grid, the product name, a headline, the CTA
 * and the laptop mockup bleeding off the card's right/bottom edge. The mockup
 * is the same shell + dashboard screenshot the desktop block composes.
 */

interface Mockup {
  /** aspect ratio of the mockup box */
  aspect: string;
  groupInset?: string;
  screenInset: string;
  screenRadius?: string;
  screenRect: { left: string; top: string; width: string; height: string };
  notchInset: string;
  screen: string;
}

interface Product {
  name: string;
  sub: string;
  headline: string;
  href: string;
  badges: { icon: string; w: number; h: number; text: string }[];
  mockup: Mockup;
}

const PRODUCTS: Product[] = [
  {
    name: "Conomica",
    sub: "займы",
    headline: " инвестиций в займы для бизнеса, обеспеченные текущей дебиторской задолженностью",
    href: "https://conomica-finance.ru/",
    badges: [
      { icon: "/products-promo/bank-icon.svg", w: 33, h: 30.6, text: "Лицензия Центробанка РФ" },
      { icon: "/products-promo/badge-unique-solutions.svg", w: 30, h: 30, text: "Уникальные продуктовые решения" },
      { icon: "/products-promo/badge-experience.svg", w: 27, h: 30, text: "Более 9 лет опыт работы команды" },
      { icon: "/products-promo/badge-it-solution.svg", w: 32, h: 29.5, text: "Собственное безопасное IT-решение" },
    ],
    mockup: {
      aspect: "643 / 512.462",
      screenInset: "17.37% 13.22% 31.31% 31.42%",
      screenRadius: "5.6% / 7%",
      screenRect: { left: "4.29%", top: "3.88%", width: "92.41%", height: "91.46%" },
      notchInset: "18.57% 37.37% 79.37% 55.75%",
      screen: "/products-promo/dashboard-money.png",
    },
  },
  {
    name: "Conomica",
    sub: "цессии",
    headline: " управления сделками по приобретению и взысканию истекшей дебиторской задолженности",
    href: "https://cabinet.conomica.space/",
    badges: [
      { icon: "/hero/badge-skolkovo.svg", w: 30, h: 30.2, text: "Резидент Сколково" },
      { icon: "/products-promo/badge-valuation.svg", w: 30, h: 30, text: "Более 9 лет опыт в оценке и взыскании" },
      { icon: "/products-promo/badge-industry-leader.svg", w: 30, h: 30, text: "Лидер отрасли в сегменте" },
      { icon: "/products-promo/badge-crm.svg", w: 30, h: 30, text: "Собственная уникальная CRM-система" },
    ],
    mockup: {
      aspect: "669 / 533.183",
      groupInset: "2.06% -0.45% -2.06% 0.45%",
      screenInset: "15.57% 10.61% 30.61% 32.29%",
      screenRect: { left: "2.84%", top: "7.65%", width: "89.41%", height: "87%" },
      notchInset: "20.63% 36.92% 77.31% 56.2%",
      screen: "/products-promo/dashboard-overview.png",
    },
  },
];

function Macbook({ mockup }: { mockup: Mockup }) {
  const body = (
    <>
      <Asset src="/products-promo/macbook.png" alt="" className="absolute inset-0 h-full w-full -scale-x-100" />
      <div className="absolute overflow-hidden" style={{ inset: mockup.screenInset, borderRadius: mockup.screenRadius }}>
        <Asset src={mockup.screen} alt="" fit="fill" className="absolute" style={mockup.screenRect} />
      </div>
    </>
  );
  return (
    <div className="relative w-full" style={{ aspectRatio: mockup.aspect }}>
      {mockup.groupInset ? (
        <div className="absolute" style={{ inset: mockup.groupInset }}>
          {body}
        </div>
      ) : (
        body
      )}
      <div
        className="absolute rounded-bl-[3px] rounded-br-[3px] bg-black"
        style={{ inset: mockup.notchInset }}
      />
    </div>
  );
}

export default function MobileShowcase() {
  return (
    <section className="flex flex-col gap-4 px-4 pb-4">
      {PRODUCTS.map((p) => (
        <div key={p.sub} className="overflow-hidden rounded-[24px] bg-white">
          <div className="flex flex-col gap-5 p-5">
            <div className="grid grid-cols-2 gap-2">
              {p.badges.map((b) => (
                <div key={b.text} className={`flex flex-col gap-2.5 rounded-[8px] bg-white p-3 ${SHADOW}`}>
                  <Asset src={b.icon} alt="" className="shrink-0" style={{ width: b.w, height: b.h }} />
                  <p className={`tm-small text-[#191919] ${fontVelaMedium}`}>
                    {b.text}
                  </p>
                </div>
              ))}
            </div>

            <div className={`flex flex-col gap-0.5 text-black ${fontVelaGxBold}`}>
              <p className="tm-h2">{p.name}</p>
              <p className="tm-h3">{p.sub}</p>
            </div>

            <p className={`tm-h4 text-[#191919] ${fontVelaMedium}`}>
              <span className="text-[#00703E]">Платформа</span>
              {p.headline}
            </p>

            <CtaButton href={p.href}>На платформу</CtaButton>
          </div>

          {/* laptop bleeds off the card's right/bottom edge */}
          <div className="relative h-[230px] overflow-hidden">
            <div className="absolute left-[14%] top-0 w-[112%]">
              <Macbook mockup={p.mockup} />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
