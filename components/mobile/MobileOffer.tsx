import { fontVelaGxBold, fontVelaMedium } from "../fonts";
import { CtaButton, RingMark, SHADOW } from "./shared";

/**
 * Mobile "Что мы можем предложить бизнесу" card (Figma "Главная 390"): two
 * headings, two solution cards with the upper-bound financing stats, the
 * grey ring shapes peeking out behind the content.
 */

const H3 = `tm-h3 text-[#212226] ${fontVelaGxBold}`;
const H4 = `tm-h4 text-[#212226] ${fontVelaMedium}`;

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex items-end gap-2">
      <span className={`pb-[7px] tm-small text-[#24252b] ${fontVelaMedium}`}>до</span>
      <span className={`tm-h2 text-[#24252b] ${fontVelaGxBold}`}>{number}</span>
      <span className={`pb-[3px] tm-small text-[#24252b] ${fontVelaMedium}`}>
        {label}
      </span>
    </div>
  );
}

function SolutionCard({
  title,
  description,
  stats,
}: {
  title: string;
  description: string;
  stats: { number: string; label: string }[];
}) {
  return (
    <div className={`flex flex-col gap-5 rounded-[16px] bg-white p-5 ${SHADOW}`}>
      <div className="flex flex-col gap-2">
        <p className={`tm-h3 text-[#191919] ${fontVelaGxBold}`}>{title}</p>
        <p className={`tm-small text-[#626262] ${fontVelaMedium}`}>{description}</p>
      </div>
      <div className="flex flex-col gap-4">
        {stats.map((s) => (
          <Stat key={s.number} {...s} />
        ))}
      </div>
      <CtaButton href="https://conomica.ru/creditors">Подробнее</CtaButton>
    </div>
  );
}

export default function MobileOffer() {
  return (
    <section className="px-4 pb-4">
      <div className="relative overflow-hidden rounded-[24px] bg-white px-5 py-8">
        <RingMark size={190} rotate={-61.35} className="pointer-events-none absolute -right-[70px] -top-[40px]" />
        <RingMark size={300} rotate={-61.35} className="pointer-events-none absolute -bottom-[120px] -left-[170px]" />

        <div className="relative flex flex-col gap-7">
          <p className={H4}>Что мы можем предложить бизнесу, у которого есть дебиторка?</p>
          <p className={H3}>
            Полный цикл <span className="text-[#00703e]">от оценки до фактической монетизации</span> дебиторской
            задолженности
          </p>
          <div className="flex flex-col gap-4">
            <SolutionCard
              title="Продать долг"
              description="Выкупаем дебиторскую задолженность Ваших контрагентов"
              stats={[
                { number: "80%", label: "от суммы задолженности" },
                { number: "50", label: "млн руб." },
              ]}
            />
            <SolutionCard
              title="Получить займ для бизнеса"
              description="Финансируем бизнес под обеспечение текущей дебиторской задолженности"
              stats={[
                { number: "90%", label: "от суммы задолженности" },
                { number: "50", label: "млн руб." },
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
