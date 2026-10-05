import CircularCarousel from "./ui/circular-carousel";

/**
 * "Факты о нас" — content sourced from the Figma facts section (node
 * 142:2025), but presented via the CircularCarousel component instead of
 * the static checkmark grid from the original mockup.
 *
 * Fluid-scaling pass: `py` is in `cqw` against this file's 1440px
 * reference (see Footer.tsx's doc comment for the technique writeup);
 * the wrapper's own cap moved from a fixed 1424px to `min(1600px, calc(100%
 * - 16px))` — same 16px edge gutter, new 1600px ceiling. CircularCarousel
 * itself already measures its own rendered width via ResizeObserver for
 * the card-fan trig math, so its card width/arc radius were already
 * fluid; this pass just brings its remaining fixed px (track height, text
 * sizes, button sizes) in line with the same container via `cqw` too.
 */
const facts = [
  {
    id: "leader",
    title: "Лидер отрасли",
    description:
      "Крупнейший покупатель долговых требований среди компаний небанковского сектора в сегменте МСП",
  },
  {
    id: "first-in-russia",
    title: "Первые в России",
    description:
      "Первыми выпустили цифровые финансовые активы, обеспеченные приобретаемыми долговыми активами",
  },
  {
    id: "companies",
    title: "100 000+ компаний",
    description: "Хотя бы однажды получили от нас оффер о продаже долга",
  },
  {
    id: "it",
    title: "Уникальные IT-решения",
    description:
      "Собственная разработка компании, не имеющая аналогов в России и Европе",
  },
  {
    id: "legislation",
    title: "Законодательные инициативы",
    description:
      "Продвигаем на уровне Минфина и Торгово-промышленной палаты изменения налогового законодательства в области инвестирования в долговые требования",
  },
  {
    id: "media",
    title: "Эксперты в СМИ",
    description:
      "Эксперты Кономики неоднократно выступали приглашёнными экспертами на федеральных СМИ",
  },
];

export default function Facts() {
  return (
    <section
      className="relative z-10 mx-auto w-full rounded-[24px] bg-white [container-type:inline-size]"
      style={{ maxWidth: "min(1600px, calc(100% - 16px))" }}
    >
      <div className="py-[6.9444cqw]">
        <CircularCarousel items={facts} />
      </div>
    </section>
  );
}
