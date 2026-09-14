/**
 * Hero — главный экран навигационного лендинга Conomica.
 * Макет Figma "Navigation landing V1" / `home 3` (node 2092:199,
 * fileKey JI3xuwFG1gkfqdqiRLTYB0). Макетная ширина 1440, высота 810.
 *
 * Появляется сразу после интро-лоадера (светлый экран с тёмно-зелёной точкой).
 * Фон `#F2FAF2` + мягкое мятное пятно снизу. Сверху — орбита-логотип с конусом,
 * заголовок «Экосистема fintech продуктов Conomica», кнопка и знак ®.
 * Ниже — три блока-продукта (Finance / Проф / Rescore), от светло-зелёного к
 * тёмному, у каждого — печать-лицензия и кнопка с сеткой точек. Desktop-first.
 */

/* eslint-disable @next/next/no-img-element */

/* углы 6 точек орбиты (как в лоадере), градусы от верха по часовой */
const ORBIT_ANGLES = [0, 54, 122, 180, 238, 300];

type BlockData = {
  id: string;
  href: string;
  bg: string;
  labelBg: string;
  label: string;
  title: string;
  desc: string;
  contentW: number;
  dotColor: string;
  seal: string;
  sealClass: string; // размер + положение печати внутри блока
};

const BLOCKS: BlockData[] = [
  {
    id: "finance",
    href: "https://conomica-finance.ru/",
    bg: "#0EAD66",
    labelBg: "#178856",
    label: "инвестиционная платформа",
    title: "Conomica Finance",
    desc: "Инвестиции в сделки с обеспечением дебиторской задолженности",
    contentW: 191,
    dotColor: "#0EAD66",
    seal: "ЛИЦЕНЗИЯ ОПЕРАТОРА ИНВЕСТ. ПЛАТФОРМЫ ЦБ РФ",
    sealClass: "right-[14px] top-[30px] h-[166px] w-[166px]",
  },
  {
    id: "prof",
    href: "https://cabinet.conomica.ru/",
    bg: "#00703E",
    labelBg: "#0F5C3A",
    label: "онлайн-сервис",
    title: "Conomica Проф",
    desc: "Онлайн-сервис управления сделками по приобретению и взысканию дебиторской задолжености",
    contentW: 231,
    dotColor: "#00703E",
    seal: "РЕЗИДЕНТ СКОЛКОВО",
    sealClass: "right-[16px] top-[32px] h-[164px] w-[164px]",
  },
  {
    id: "rescore",
    href: "https://corp.rescore.online/",
    bg: "#0A4028",
    labelBg: "#082417",
    label: "скоринг агрегатор",
    title: "Rescore",
    desc: "Технологичная платформа сбора, анализа и мониторинга данных о платежеспособности контрагентов",
    contentW: 217,
    dotColor: "#00703E",
    seal: "РЕГИСТРАЦИЯ В МИНЦИФРЫ РОССИИ",
    sealClass: "right-[14px] top-[30px] h-[168px] w-[168px]",
  },
];

/* орбита-логотип: тонкое кольцо `#0A4028` + 6 точек + конус в центре */
function OrbitMark() {
  const cx = 98;
  const cy = 100;
  const r = 96;
  return (
    <div className="relative shrink-0" style={{ width: 196, height: 202 }}>
      <svg
        viewBox="0 0 196 202"
        className="absolute inset-0 h-full w-full overflow-visible"
        fill="none"
      >
        <circle
          cx={cx}
          cy={cy}
          r={r}
          stroke="#0A4028"
          strokeWidth={0.6}
          strokeOpacity={0.85}
        />
        {ORBIT_ANGLES.map((a) => {
          const rad = ((a - 90) * Math.PI) / 180;
          return (
            <circle
              key={a}
              cx={cx + r * Math.cos(rad)}
              cy={cy + r * Math.sin(rad)}
              r={3.5}
              fill="#0A4028"
            />
          );
        })}
      </svg>
      <img
        src="/cone.svg"
        alt=""
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[51px] w-[45px] -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  );
}

/* сетка 3×3 точек внутри круглой кнопки блока (углы — 50% прозрачности) */
function DotGrid({ color }: { color: string }) {
  const step = 7.884;
  const base = 2.616;
  return (
    <svg viewBox="0 0 21 21" className="h-[21px] w-[21px]" aria-hidden>
      {[0, 1, 2].map((row) =>
        [0, 1, 2].map((col) => {
          const corner = (row === 0 || row === 2) && (col === 0 || col === 2);
          return (
            <circle
              key={String(row) + col}
              cx={base + col * step}
              cy={base + row * step}
              r={2.616}
              fill={color}
              opacity={corner ? 0.5 : 1}
            />
          );
        }),
      )}
    </svg>
  );
}

/* круглая печать-лицензия: текст по кольцу + конус в центре */
function Seal({
  text,
  idx,
  className,
}: {
  text: string;
  idx: number;
  className: string;
}) {
  const pathId = "seal-path-" + idx;
  return (
    <div className={"pointer-events-none absolute select-none " + className}>
      <svg viewBox="0 0 184 184" className="h-full w-full" aria-hidden>
        <defs>
          {/* почти полный круг r=76, старт снизу, текст по часовой, ровно по верху */}
          <path
            id={pathId}
            d="M85.4 167.7 A76 76 0 1 1 98.6 167.7"
            fill="none"
          />
        </defs>
        {/* видимое кольцо-обод печати */}
        <circle
          cx={92}
          cy={92}
          r={62}
          fill="none"
          stroke="#ffffff"
          strokeWidth={1}
          strokeOpacity={0.9}
        />
        {/* текст-лицензия снаружи кольца */}
        <text
          fill="#ffffff"
          fillOpacity={0.95}
          style={{ fontSize: "10px", fontWeight: 500, letterSpacing: "0.8px" }}
        >
          <textPath href={"#" + pathId} startOffset="50%" textAnchor="middle">
            {"• " + text + " •"}
          </textPath>
        </text>
        {/* 4-конечная «искра» в центре, ~46px */}
        <path
          d="M92 69C92 81.7 81.7 92 69 92C81.7 92 92 102.3 92 115C92 102.3 102.3 92 115 92C102.3 92 92 81.7 92 69Z"
          fill="#ffffff"
        />
      </svg>
    </div>
  );
}

function Block({ data, idx }: { data: BlockData; idx: number }) {
  return (
    <li className="shrink-0">
      <a
        href={data.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={data.title + " — " + data.desc}
        className="relative flex h-[420px] w-[459px] flex-col justify-between overflow-hidden rounded-[16px] p-[40px] shadow-[0px_0px_13px_0px_rgba(215,216,214,0.6)] outline-none transition-[filter] duration-200 hover:brightness-[1.05] focus-visible:ring-2 focus-visible:ring-white"
        style={{ backgroundColor: data.bg }}
      >
        <Seal text={data.seal} idx={idx} className={data.sealClass} />

        <div
          className="relative flex flex-col gap-[12px]"
          style={{ width: data.contentW }}
        >
          <span
            className="inline-flex h-[27px] w-fit items-center justify-center whitespace-nowrap rounded-[12px] border border-white px-[10px] text-[12px] font-medium uppercase leading-none tracking-[-0.12px] text-white"
            style={{ backgroundColor: data.labelBg }}
          >
            {data.label}
          </span>
          <h3 className="text-[36px] font-medium leading-[1.08] tracking-[1.08px] text-white">
            {data.title}
          </h3>
          <p className="text-[20px] font-normal leading-[1.08] tracking-[-0.2px] text-white">
            {data.desc}
          </p>
        </div>

        <div className="relative flex w-full items-center justify-end">
          <span className="flex h-[64px] w-[64px] items-center justify-center rounded-full bg-white p-[22px] drop-shadow-[0px_0px_6.5px_#d7d8d6]">
            <DotGrid color={data.dotColor} />
          </span>
        </div>
      </a>
    </li>
  );
}

export default function Hero() {
  return (
    <section className="relative flex min-h-screen w-full justify-center overflow-x-hidden bg-[#F2FAF2]">
      <h1 className="sr-only">Экосистема fintech продуктов Conomica</h1>

      {/* фиксированная композиция 1440; на широких экранах масштабируется
          целиком через `zoom` (см. .home-fit в globals.css) */}
      <div className="home-fit relative w-[1440px] shrink-0 pt-[14px]">
        {/* мягкое мятное пятно снизу */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[62%] h-[342px] w-[1583px] max-w-none -translate-x-1/2 rounded-[50%] blur-[110px]"
          style={{ backgroundColor: "#BEF9DF", opacity: 0.5 }}
        />

        <div className="relative mx-auto w-[1409px]">
          <div className="flex w-full flex-col items-center gap-[16px]">
          {/* верхняя часть */}
          <div className="flex w-full items-center gap-[80px] py-[40px] pl-[24px] pr-[48px]">
            <OrbitMark />

            <div className="flex flex-1 items-stretch justify-between">
              <div className="flex w-[295px] flex-col justify-center gap-[24px]">
                <p className="w-[295px] text-[48px] font-medium leading-none tracking-[-0.48px] text-[#292A26]">
                  Экосистема fintech продуктов Conomica
                </p>
                <a
                  href="https://conomica.ru/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-[48px] w-[282px] items-center justify-center gap-[8px] rounded-[22px] bg-white py-[16px] pl-[16px] pr-[8px] shadow-[0px_2px_1px_0_rgba(0,0,0,0.04)] outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-[#00703E]"
                >
                  <span className="whitespace-nowrap text-[16px] font-medium leading-[1.2] tracking-[0.16px] text-[#292A26]">
                    Узнать о группе Conomica
                  </span>
                  <span className="flex h-[31px] w-[31px] shrink-0 rotate-90 items-center justify-center rounded-[27px] bg-[#00703E] drop-shadow-[8px_6px_7.8px_rgba(0,0,0,0.14)]">
                    <svg
                      viewBox="0 0 17 17"
                      className="h-[17px] w-[17px] shrink-0"
                      fill="none"
                      aria-hidden
                    >
                      <path
                        d="M8.5 2.83333L8.14645 2.47978L8.5 2.12623L8.85355 2.47978L8.5 2.83333ZM9 13.4583C9 13.7345 8.77614 13.9583 8.5 13.9583C8.22386 13.9583 8 13.7345 8 13.4583L8.5 13.4583L9 13.4583ZM4.25 7.08333L3.89645 6.72978L8.14645 2.47978L8.5 2.83333L8.85355 3.18689L4.60355 7.43689L4.25 7.08333ZM8.5 2.83333L8.85355 2.47978L13.1036 6.72978L12.75 7.08333L12.3964 7.43689L8.14645 3.18689L8.5 2.83333ZM8.5 2.83333L9 2.83333L9 13.4583L8.5 13.4583L8 13.4583L8 2.83333L8.5 2.83333Z"
                        fill="#ffffff"
                      />
                    </svg>
                  </span>
                </a>
              </div>

              <p className="self-center text-right text-[20px] font-medium leading-[1.08] tracking-[-0.2px] text-[#292A26]">
                Официальный
                <br />
                товарный
                <br />
                знак
                <sup className="relative -top-[0.45em] -ml-[1.5px] text-[0.55em] text-black">
                  ®
                </sup>
              </p>
            </div>
          </div>

          {/* блоки-продукты */}
          <ul className="flex h-[420px] w-full items-center justify-center gap-[8px]">
            {BLOCKS.map((b, i) => (
              <Block key={b.id} data={b} idx={i} />
            ))}
          </ul>
        </div>
        </div>
      </div>
    </section>
  );
}
