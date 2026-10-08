import type { ReactNode } from "react";
import { DecorativeCircleMark } from "../DecorativeCircle";
import { fontVelaGxBold, fontVelaGxExtraBold, fontVelaMedium } from "../fonts";

/** Mobile "Кономика в цифрах": the six stats in a two-column grid, then the
 * animated ring mark. Same copy as StatsShowcase.tsx. */

const STATS: { prefix?: string; value: string; unit: string; description: ReactNode }[] = [
  { prefix: "более", value: "700", unit: "сделок", description: "по приобретению дебиторской задолженности" },
  { value: "6.9", unit: "млрд", description: "возвращено бизнесу в оборот с помощью продажи дебиторской задолженности" },
  { value: "7.7", unit: "млрд", description: "было взыскано по приобретенному портфелю требований" },
  { value: "1.5", unit: "млрд", description: "заработали наши клиенты на сделках с долговыми требованиями" },
  { value: "2.3", unit: "млрд", description: "активный портфель, находящийся в текущем взыскании" },
  {
    prefix: "более",
    value: "1500",
    unit: "инвесторов",
    description: "участвовали в финансировании сделок с долговыми требованиями",
  },
];

export default function MobileStats() {
  return (
    <section className="flex flex-col gap-8 px-4 py-10">
      <h2 className={`tm-h3 text-[#191919] ${fontVelaGxBold}`}>
        Кономика в цифрах
      </h2>

      <div className="grid grid-cols-2 gap-x-4 gap-y-8">
        {STATS.map((s) => (
          <div key={s.value} className="flex flex-col gap-3 border-l border-[#191919] pl-[14px]">
            <div className="flex flex-col items-start gap-1">
              {/* reserve the prefix row so the numbers line up across a row */}
              <p className={`h-[22px] tm-body text-[#353537] ${fontVelaMedium}`}>
                {s.prefix}
              </p>
              <p className={`tm-h1 text-[#191919] ${fontVelaGxExtraBold}`}>
                {s.value}
              </p>
              <p className={`tm-body text-[#353537] ${fontVelaMedium}`}>
                {s.unit}
              </p>
            </div>
            <p className={`tm-small text-[#353537] ${fontVelaMedium}`}>
              {s.description}
            </p>
          </div>
        ))}
      </div>

      <div className="flex justify-center pt-4">
        <DecorativeCircleMark size="236px" travel="sequential" />
      </div>
    </section>
  );
}
