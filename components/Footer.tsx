/**
 * Footer — подвал лендинга. Макет Figma "Navigation landing V1" / `home 4`,
 * узел `Footer desktop` (2130:3457, fileKey JI3xuwFG1gkfqdqiRLTYB0).
 * Макетная ширина 1440 — как у Hero, использует тот же класс `.home-fit`
 * (см. globals.css), так что масштабируется вместе с героем на широких экранах.
 *
 * Белый фон, три колонки — «Прямая связь» (2 карточки с CTA), «Мы в
 * социальных сетях» (QR + TenChat/VK), «Компании группы» (5 юрлиц с ИНН).
 * Ниже — разделительная линия, телефон + слоган, логотип группы компаний.
 */

/* eslint-disable @next/next/no-img-element */

const H3 =
  "text-[28px] font-medium leading-[1.08] tracking-[-0.84px] text-[#292A26]";

const CONTACT_CARDS = [
  {
    id: "investor",
    text: "Вы — инвестор, изучаете возможность размещения средств в сделки, связанные с дебиторской задолженностью",
    cta: "Оставить заявку на консультацию",
  },
  {
    id: "business",
    text: "Вы — бизнес, хотите привлечь средства, используя дебиторскую задолженность",
    cta: "Больше о продуктах Conomica",
  },
];

const COMPANIES = [
  { name: 'ООО Управляющая компания "Кономика"', inn: "9728069364" },
  { name: 'ООО "Кономика"', inn: "9728069364" },
  { name: 'ООО "Кономика-займы для бизнеса"', inn: "9728131284" },
  { name: "ООО «Технологии Скоринга»", inn: "7728468083" },
  { name: "ООО «Про-Фактор»", inn: "7709976250" },
];

/* стрелка кнопки — зелёная, на белом кружке (обратная схема цвету кнопки в hero) */
function ArrowButton({ label }: { label: string }) {
  return (
    <div className="flex h-[48px] w-[355px] items-center justify-end gap-[16px] rounded-[22px] bg-[#00703E] py-[16px] pl-[24px] pr-[8px] shadow-[0px_2px_1px_0_rgba(0,0,0,0.04)]">
      <span className="flex-1 whitespace-nowrap text-center text-[16px] font-medium leading-[1.2] tracking-[0.16px] text-white">
        {label}
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
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="relative flex w-full justify-center overflow-x-hidden bg-white">
      <div className="home-fit w-[1440px] shrink-0 backdrop-blur-[10px]">
        <div className="flex w-full flex-col items-start gap-[40px] px-[80px] py-[64px]">
          {/* верхняя часть: три колонки */}
          <div className="flex w-full items-start gap-[72px]">
            {/* Прямая связь */}
            <div className="flex w-[411px] shrink-0 flex-col items-start gap-[32px]">
              <p className={H3}>Прямая связь</p>
              <div className="flex w-full flex-col items-start gap-[8px]">
                {CONTACT_CARDS.map((c) => (
                  <div
                    key={c.id}
                    className="flex w-full flex-col items-center justify-center gap-[12px] rounded-[16px] bg-[#F2FAF2] p-[16px]"
                  >
                    <div className="flex w-full items-center justify-center px-[16px]">
                      <p className="flex-1 text-[14px] font-medium leading-[16px] tracking-[-0.14px] text-[#292A26]">
                        {c.text}
                      </p>
                    </div>
                    <ArrowButton label={c.cta} />
                  </div>
                ))}
              </div>
            </div>

            {/* Мы в социальных сетях */}
            <div className="flex shrink-0 flex-col items-start justify-center gap-[32px]">
              <p className={H3}>Мы в социальных сетях</p>
              <div className="flex w-[319px] items-center gap-[8px]">
                <div className="group flex h-[271px] w-[186px] shrink-0 flex-col items-center justify-center gap-[12px] rounded-[12px] bg-[#F2FAF2] px-[16px] py-[24px] transition-colors duration-200 hover:bg-[#00703E]">
                  <img
                    src="/qr-conomica.png"
                    alt="QR-код Conomica"
                    width={96}
                    height={98}
                    className="h-[98px] w-[96px] object-cover transition-[filter] duration-200 group-hover:brightness-0 group-hover:invert"
                  />
                  <div className="flex w-full flex-col items-center gap-[16px]">
                    <p className="text-[18px] font-medium leading-[1.32] tracking-[-0.72px] text-[#292A26] transition-colors duration-200 group-hover:text-white">
                      Кономика
                    </p>
                    <p className="w-full text-center text-[14px] font-medium leading-[16px] tracking-[-0.14px] text-[#626262] transition-colors duration-200 group-hover:text-white">
                      Официальный информационный канал
                    </p>
                  </div>
                </div>
                <div className="flex h-[271px] w-[125px] shrink-0 flex-col items-start gap-[8px]">
                  <div className="relative flex w-full flex-1 items-center justify-center overflow-hidden rounded-[8px] bg-[#F2FAF2] p-[10px] transition-colors duration-200 hover:bg-[#00703E]">
                    <span
                      aria-hidden
                      className="absolute left-[44px] top-[42px] h-[35px] w-[38px] bg-white"
                    />
                    <img
                      src="/tenchat.svg"
                      alt="TenChat"
                      className="relative h-[76.8px] w-[71px]"
                    />
                  </div>
                  <div className="flex w-full flex-1 items-center justify-center rounded-[8px] bg-[#F2FAF2] p-[10px] transition-colors duration-200 hover:bg-[#00703E]">
                    <img
                      src="/vk.svg"
                      alt="ВКонтакте"
                      className="h-[76px] w-[76.9px]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Компании группы */}
            <div className="flex flex-1 flex-col items-start gap-[32px]">
              <p className={H3}>Компании группы</p>
              <div className="flex w-full flex-col items-start gap-[24px]">
                {COMPANIES.map((co) => (
                  <div
                    key={co.inn + co.name}
                    className="flex w-full flex-col items-start gap-[8px]"
                  >
                    <p className="w-full text-[18px] font-normal leading-[1.32] tracking-[-0.36px] text-[#292A26]">
                      {co.name}
                    </p>
                    <div className="flex items-start gap-[8px]">
                      <span className="text-[14px] font-medium leading-[16px] tracking-[-0.14px] text-[#626262]">
                        ИНН
                      </span>
                      <span
                        aria-hidden
                        className="h-[16px] w-px bg-[#626262]"
                      />
                      <span className="text-[14px] font-medium leading-[16px] tracking-[-0.14px] text-[#626262]">
                        {co.inn}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* разделитель */}
          <div aria-hidden className="h-px w-full bg-[#626262]" />

          {/* телефон + логотип группы компаний */}
          <div className="flex w-full items-center justify-between">
            <div className="flex flex-col items-start gap-[1px]">
              <p className={H3}>+7 (495)477-52-57</p>
              <p className="text-[14px] font-normal leading-[1.2] tracking-[-0.14px] text-[#626262]">
                Звонок бесплатный
              </p>
            </div>
            <div className="flex items-center gap-[16px]">
              <img
                src="/cone-sis.svg"
                alt=""
                aria-hidden
                className="h-[34.285px] w-[30.421px]"
              />
              <img
                src="/wordmark-footer.svg"
                alt="Conomica"
                className="h-[29.158px] w-[147.231px]"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
