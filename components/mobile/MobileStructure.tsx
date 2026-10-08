import Asset from "../Asset";
import { fontVelaGxBold, fontVelaMedium } from "../fonts";
import { SHADOW } from "./shared";

/** Mobile "Структура группы компаний": the holding on top, the brand tile,
 * then the four subsidiaries — joined by short vertical connectors. */

const COMPANIES = [
  {
    title: "АО УК Кономика",
    titleColor: "#0a1833",
    description: "Холдинговая компания группы",
  },
  {
    title: "ООО «Кономика»",
    description:
      "Высокотехнологичная IT-компания, предоставляющая услуги онлайн-платформы для сделок с долговыми требованиями.",
  },
  {
    title: "ООО «Технологии скоринга»",
    description:
      "IT-компания - высокотехнологичный скоринговый агрегатор данных, предназначенный для проверки и мониторинга платежеспособности.",
  },
  {
    title: "ООО «Кономика займы для бизнеса»",
    description:
      "Оператор Инвестиционной Платформы. Лицензия ЦБ РФ. Состоит в реестре Операторов Инвестиционных платформ Банка России.",
  },
  {
    title: "ООО «Про Фактор»",
    description: "Юридическая компания, обеспечивающая полный цикл юридического сопровождения компаний группы.",
  },
];

function Connector() {
  return <div aria-hidden className="h-6 w-px bg-[#D8D8D8]" />;
}

function CompanyCard({ title, titleColor = "#191919", description }: (typeof COMPANIES)[number]) {
  return (
    <div className={`flex w-full flex-col gap-2 rounded-[12px] bg-white p-5 ${SHADOW}`}>
      <p className={`tm-h3 ${fontVelaGxBold}`} style={{ color: titleColor }}>
        {title}
      </p>
      <p className={`tm-small text-[#626262] ${fontVelaMedium}`}>{description}</p>
    </div>
  );
}

export default function MobileStructure() {
  const [holding, ...subs] = COMPANIES;
  return (
    <section className="px-4 pb-4">
      <div className="flex flex-col items-center rounded-[24px] bg-white px-5 py-8">
        <h2 className={`w-full pb-6 tm-h3 text-[#161616] ${fontVelaGxBold}`}>
          Структура группы компаний
        </h2>

        <CompanyCard {...holding} />
        <Connector />
        <div className={`flex h-[104px] w-[104px] items-center justify-center rounded-[16px] border border-[#d8d8d8] bg-white`}>
          <Asset src="/company-structure/sis.svg" alt="" fit="contain" className="h-12 w-12" />
        </div>
        {subs.map((c) => (
          <div key={c.title} className="flex w-full flex-col items-center">
            <Connector />
            <CompanyCard {...c} />
          </div>
        ))}
      </div>
    </section>
  );
}
