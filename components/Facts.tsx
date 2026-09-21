import CircularCarousel from "./ui/circular-carousel";

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
    <section
      className="relative z-10 mx-auto rounded-[24px] bg-white py-[100px]"
      style={{ maxWidth: 1424, width: "calc(100% - 16px)" }}
    >
      <CircularCarousel items={facts} />
    </section>
  );
}
