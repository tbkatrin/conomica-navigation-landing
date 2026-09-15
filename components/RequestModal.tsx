"use client";

/**
 * RequestModal — модальное окно заявки на консультацию.
 * Макет Figma "Navigation landing V1", узел `modal window` (2148:5549,
 * fileKey JI3xuwFG1gkfqdqiRLTYB0). Открывается по клику на «Оставить заявку
 * на консультацию» в футере (карточка «Инвесторам»).
 *
 * Две колонки «вариант инвестиций» с зелёным бейджем и декоративной круглой
 * печатью-лицензией (сделана техникой круг + текст по textPath + искра в
 * центре — в макете это растеризованные фрагменты векторов, а не текст),
 * ниже — инфоблок и форма заявки (2×2 грид).
 */

import { useEffect } from "react";

function Seal({
  text,
  idx,
  className,
}: {
  text: string;
  idx: number;
  className: string;
}) {
  const pathId = "modal-seal-path-" + idx;
  return (
    <div
      aria-hidden
      className={"pointer-events-none absolute select-none " + className}
    >
      <svg viewBox="0 0 184 184" className="h-full w-full">
        <defs>
          <path
            id={pathId}
            d="M85.4 167.7 A76 76 0 1 1 98.6 167.7"
            fill="none"
          />
        </defs>
        <circle
          cx={92}
          cy={92}
          r={62}
          fill="none"
          stroke="#00703E"
          strokeWidth={1}
          strokeOpacity={0.9}
        />
        <text
          fill="#00703E"
          fillOpacity={0.95}
          style={{ fontSize: "10px", fontWeight: 500, letterSpacing: "0.8px" }}
        >
          <textPath href={"#" + pathId} startOffset="50%" textAnchor="middle">
            {"• " + text + " •"}
          </textPath>
        </text>
        <path
          d="M92 69C92 81.7 81.7 92 69 92C81.7 92 92 102.3 92 115C92 102.3 102.3 92 115 92C102.3 92 92 81.7 92 69Z"
          fill="#00703E"
        />
      </svg>
    </div>
  );
}

function Field({ placeholder }: { placeholder: string }) {
  return (
    <input
      type="text"
      name={placeholder}
      placeholder={placeholder}
      className="h-[48px] w-full rounded-[12px] border border-[#D8D8D8] bg-white px-[16px] text-[14px] font-normal leading-[1.4] tracking-[0.14px] text-[#292A26] shadow-[0px_2px_2px_0_rgba(0,0,0,0.04)] outline-none placeholder:text-[#626262] focus:border-[#00703E]"
    />
  );
}

const OPTIONS = [
  {
    id: "quasi-factoring",
    badge: "1 вариант инвестиций",
    text: "Инвестирование в займы с обеспечением дебиторской задолженностью контрагентов заемщика - квазифакторинг",
    seal: "ЛИЦЕНЗИЯ ОПЕРАТОРА ПЛАТФОРМЫ",
    sealClass: "left-[205px] top-[-84px] h-[123px] w-[123px]",
  },
  {
    id: "debt-acquisition",
    badge: "2 вариант инвестиций",
    text: "Приобретение долговых требований компаний в сегменте МСБ",
    seal: "РЕЗИДЕНТ СКОЛКОВО",
    sealClass: "left-[210px] top-[-84px] h-[123px] w-[123px]",
  },
];

export default function RequestModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-[16px]"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        className="relative max-h-[90vh] w-[770px] max-w-full overflow-y-auto rounded-[16px] bg-white p-[40px]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Закрыть"
          className="absolute right-[24px] top-[24px] flex h-[32px] w-[32px] items-center justify-center rounded-full text-[20px] leading-none text-[#626262] transition-colors hover:bg-[#F2FAF2]"
        >
          ×
        </button>

        <div className="flex flex-col items-start gap-[80px]">
          <div className="flex w-full items-center justify-center">
            <p className="flex-1 pr-[40px] text-[28px] font-medium leading-[1.08] tracking-[-0.84px] text-[#292A26]">
              Узнайте больше о возможностях заработка
              <br />
              вместе с Conomica
            </p>
          </div>

          <div className="flex items-start gap-[80px]">
            {OPTIONS.map((o, idx) => (
              <div
                key={o.id}
                className="relative flex w-[285px] flex-col items-start gap-[10px]"
              >
                <span className="inline-flex h-[32px] w-fit items-center justify-center whitespace-nowrap rounded-[46px] bg-[#00703E] px-[16px] text-[14px] font-medium leading-[16px] tracking-[-0.14px] text-white">
                  {o.badge}
                </span>
                <p className="w-full text-[14px] font-medium leading-[16px] tracking-[-0.14px] text-[#292A26]">
                  {o.text}
                </p>
                <Seal idx={idx} text={o.seal} className={o.sealClass} />
              </div>
            ))}
          </div>

          <div className="flex w-full items-start gap-[32px]">
            <div className="flex w-[194px] shrink-0 flex-col gap-[24px]">
              <p className="w-full text-[20px] font-medium leading-[1.08] tracking-[-0.8px] text-[#00703E]">
                Хотите получить больше информации?
              </p>
              <p className="w-full text-[14px] font-medium leading-[16px] tracking-[-0.14px] text-[#292A26]">
                Заполните заявку на персональную консультацию и наш менеджер
                с Вами свяжется в ближайшее время.
              </p>
            </div>
            <div className="flex flex-1 flex-col justify-center gap-[24px]">
              <form
                className="grid w-full grid-cols-2 gap-[8px]"
                onSubmit={(e) => e.preventDefault()}
              >
                <Field placeholder="Ваше имя" />
                <Field placeholder="Эл. почта" />
                <Field placeholder="Номер телефона" />
                <button
                  type="submit"
                  className="flex h-[48px] items-center justify-end gap-[16px] rounded-[12px] bg-[#00703E] py-[16px] pl-[24px] pr-[8px] shadow-[0px_2px_1px_0_rgba(0,0,0,0.04)]"
                >
                  <span className="flex-1 whitespace-nowrap text-center text-[16px] font-medium leading-[1.2] tracking-[0.16px] text-white">
                    Отправить заявку
                  </span>
                  <span className="flex h-[31px] w-[31px] shrink-0 rotate-90 items-center justify-center rounded-[27px] bg-white drop-shadow-[8px_6px_7.8px_rgba(0,0,0,0.14)]">
                    <svg
                      viewBox="0 0 17 17"
                      className="h-[17px] w-[17px] shrink-0"
                      fill="none"
                      aria-hidden
                    >
                      <path
                        d="M8.5 2.83333L8.14645 2.47978L8.5 2.12623L8.85355 2.47978L8.5 2.83333ZM9 13.4583C9 13.7345 8.77614 13.9583 8.5 13.9583C8.22386 13.9583 8 13.7345 8 13.4583L8.5 13.4583L9 13.4583ZM4.25 7.08333L3.89645 6.72978L8.14645 2.47978L8.5 2.83333L8.85355 3.18689L4.60355 7.43689L4.25 7.08333ZM8.5 2.83333L8.85355 2.47978L13.1036 6.72978L12.75 7.08333L12.3964 7.43689L8.14645 3.18689L8.5 2.83333ZM8.5 2.83333L9 2.83333L9 13.4583L8.5 13.4583L8 13.4583L8 2.83333L8.5 2.83333Z"
                        fill="#00703E"
                      />
                    </svg>
                  </span>
                </button>
              </form>
              <p className="w-full text-[12px] font-normal leading-[1.2] tracking-[-0.12px] text-[#292A26]">
                *Отправляя заявку на консультацию, Вы подтверждаете согласие
                на звонок на указанный мобильный телефон и/или отправку
                маркетинговых материалов на эл. почту
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
