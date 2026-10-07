import Asset from "../Asset";
import { fontVelaGxBold, fontVelaMedium } from "../fonts";
import { LEADS, MANAGERS, TEAM, type Person } from "../Team";
import { SHADOW } from "./shared";

/** Mobile "Conomica — это люди": the same eight people as the desktop block,
 * as a two-column grid of white cards (photo, name, role). */

const PEOPLE: Person[] = [...LEADS, ...TEAM, ...MANAGERS];

export default function MobileTeam() {
  return (
    <section className="flex flex-col gap-6 px-4 py-10">
      <h2 className={`text-[28px] leading-[0.98] tracking-[-0.02em] text-[#161616] ${fontVelaGxBold}`}>
        Conomica — это люди. И мы с гордостью показываем тех, кто двигает нас вперёд
      </h2>
      <div className="grid grid-cols-2 gap-3">
        {PEOPLE.map((p) => (
          <div key={p.name} className={`flex flex-col gap-3 rounded-[16px] bg-white p-3 ${SHADOW}`}>
            <Asset src={p.photo} alt={p.name} fit="cover" className="aspect-square w-full rounded-[12px]" />
            <div className="flex flex-col gap-1.5">
              <p className={`text-[24px] leading-[0.98] tracking-[-0.02em] text-[#161616] ${fontVelaGxBold}`}>{p.name}</p>
              <p className={`text-[14px] leading-[1.1] tracking-[-0.04em] text-[#626262] ${fontVelaMedium}`}>{p.title}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
