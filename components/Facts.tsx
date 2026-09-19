import CircularCarousel from "./ui/circular-carousel";
import { fontVelaGxBold } from "./fonts";

/**
 * "Факты о нас" — content sourced from the Figma facts section (node
 * 142:2025), but presented via the CircularCarousel component instead of
 * the static checkmark grid from the original mockup.
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
    <section className="relative z-10 mx-auto w-[1280px] py-[100px]">
      <h2
        className={`mb-[64px] text-[38px] leading-[0.98] tracking-[-0.76px] text-[#161616] ${fontVelaGxBold}`}
      >
        Факты о нас
      </h2>
      <CircularCarousel items={facts} />
    </section>
  );
}
