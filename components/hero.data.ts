/**
 * Данные карточек продуктового героя. Макет Figma `hero for claude — all default`
 * (node 2044:619). Порядок = порядок в ряду (слева направо).
 *
 *  numeral     — «призрачная» цифра-водяной знак за контентом
 *  label       — текст лейбл-пилюли (рендерится uppercase)
 *  title       — строки заголовка (склеиваются через <br/>; для точного
 *                совпадения с макетом переносы заданы вручную)
 *  description — абзац под заголовком
 *  href        — ссылка карточки-кнопки «Узнать больше»
 */

export type ProductCardData = {
  id: string;
  numeral: string;
  label: string;
  title: string[];
  description: string;
  href: string;
};

export const PRODUCT_CARDS: ProductCardData[] = [
  {
    id: "group",
    numeral: "1",
    label: "корпоративный сайт",
    title: ["Conomica", "группа компаний"],
    description: "Общая информация о всех продуктах группы Conomica",
    href: "https://conomica.ru/",
  },
  {
    id: "finance",
    numeral: "2",
    label: "инвестиционная платформа",
    title: ["Conomica Finance"],
    description: "Инвестиции в сделки с обеспечением дебиторской задолженности",
    href: "https://conomica-finance.ru/",
  },
  {
    id: "prof",
    numeral: "3",
    label: "онлайн-сервис",
    title: ["Conomica", "Проф"],
    description:
      "Онлайн-сервис управления сделками по приобретению и взысканию дебиторской задолжености",
    href: "https://cabinet.conomica.ru/",
  },
  {
    id: "rescore",
    numeral: "4",
    label: "скоринг-агрегатор",
    title: ["Rescore"],
    description:
      "Технологичная платформа сбора, анализа и мониторинга данных о платежеспособности контрагентов",
    href: "https://corp.rescore.online/",
  },
];
