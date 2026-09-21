import type { ReactNode } from "react";
import Asset from "./Asset";
import { fontVelaGxBold, fontVelaMedium } from "./fonts";

/**
 * "Структура группы компаний" — org chart block, right after the
 * Conomica-в-цифрах section. Absolute positions are the Figma frame's
 * coordinates (heading "grid" node 164:944, origin x=80,y=2689 — same
 * technique as Hero.tsx's fixed-1440 reproduction), re-synced against the
 * live file on 2026-09-20 after the designer moved the cards and shrank
 * the centre mark into its own bordered box. The connector lines are now
 * simple right-angle elbows (verified against a calibrated screenshot
 * crop, since Figma's own connector assets use a fragile rotated-SVG
 * trick that broke once positions changed) — drawn as plain inline SVG
 * paths instead of imported rotated assets, so they always exactly meet
 * the card edges and the centre box regardless of future nudges.
 */

const ICON = { left: 544, top: 436, size: 162 };
const AO_UK = { left: 475, top: 202, width: 300, bottomX: 625, bottomY: 314 };

function CompanyCard({
  left,
  top,
  width,
  gap,
  title,
  titleColor = "#191919",
  description,
}: {
  left: number;
  top: number;
  width: number;
  gap: number;
  title: string;
  titleColor?: string;
  description: ReactNode;
}) {
  return (
    <div
      className="absolute flex flex-col items-start rounded-[12px] bg-white px-[40px] py-[32px] drop-shadow-[4px_4px_17px_rgba(0,0,0,0.11)]"
      style={{ left, top, width, gap }}
    >
      <p
        className={`w-full text-[28px] leading-[0.95] tracking-[-0.84px] ${fontVelaGxBold}`}
        style={{ color: titleColor }}
      >
        {title}
      </p>
      <div
        className={`w-full text-[18px] leading-none tracking-[-0.72px] text-[#626262] ${fontVelaMedium}`}
      >
        {description}
      </div>
    </div>
  );
}

/** Right-angle elbow: straight from (x1,y1), turns at x=bend, ends at
 * (bend,y2) — the corner is rounded with a short quadratic curve. u=0 is
 * always the card end, u=1 the icon end, so the flow animation direction
 * (icon → card, see the .flow keyframes below) is the same for every path. */
function elbow(x1: number, y1: number, bend: number, y2: number, r = 16) {
  const dirX = Math.sign(bend - x1) || 1;
  const dirY = Math.sign(y2 - y1) || 1;
  const rr = Math.min(r, Math.abs(bend - x1), Math.abs(y2 - y1));
  return `M ${x1} ${y1} L ${bend - rr * dirX} ${y1} Q ${bend} ${y1} ${bend} ${y1 + rr * dirY} L ${bend} ${y2}`;
}

function Connectors() {
  const paths = [
    // ООО «Кономика» (top-left) → icon, entering its top-left
    elbow(327, 265.5, ICON.left + 40, ICON.top),
    // ООО «Технологии скоринга» (top-right) → icon, entering its top-right
    elbow(952, 304, ICON.left + ICON.size - 40, ICON.top),
    // ООО «Кономика займы для бизнеса» (bottom-left) → icon, entering bottom-left
    elbow(327, 635.32, ICON.left + 40, ICON.top + ICON.size),
    // ООО «Про Фактор» (bottom-right) → icon, entering bottom-right
    elbow(952, 621.5, ICON.left + ICON.size - 40, ICON.top + ICON.size),
    // АО УК Кономика → icon, straight trunk
    `M ${AO_UK.bottomX} ${AO_UK.bottomY} L ${AO_UK.bottomX} ${ICON.top}`,
  ];

  return (
    <svg
      className="pointer-events-none absolute left-0 top-0"
      width={1280}
      height={800}
      viewBox="0 0 1280 800"
      fill="none"
    >
      {paths.map((d, i) => (
        <g key={i}>
          <path d={d} stroke="#D8D8D8" strokeLinecap="round" />
          <path
            d={d}
            stroke="#00703E"
            strokeWidth={2}
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray="0.2 1.3"
            className="flow"
          />
        </g>
      ))}
      <style>{`.flow{animation:flow-travel 2.2s linear infinite}@keyframes flow-travel{from{stroke-dashoffset:0}to{stroke-dashoffset:1.5}}@media (prefers-reduced-motion: reduce){.flow{animation:none;opacity:0}}`}</style>
    </svg>
  );
}

export default function GroupStructure() {
  return (
    <section
      className="relative z-10 mx-auto overflow-x-hidden rounded-[24px] bg-white px-[80px] py-[100px]"
      style={{ maxWidth: 1424, width: "calc(100% - 16px)" }}
    >
      <div className="relative" style={{ minHeight: 800 }}>
        <p
          className={`text-[#161616] ${fontVelaGxBold}`}
          style={{
            fontSize: "clamp(38px, 2.35vw, 47px)",
            lineHeight: 0.98,
            letterSpacing: "-0.02em",
          }}
        >
          Структура группы компаний
        </p>

        <Connectors />

        {/* centre brand mark — its own bordered card, matching the company cards */}
        <div
          className="absolute flex items-center justify-center rounded-[16px] border border-[#d8d8d8] bg-white"
          style={{ left: ICON.left, top: ICON.top, width: ICON.size, height: ICON.size }}
        >
          <Asset
            src="/company-structure/sis.svg"
            alt=""
            fit="contain"
            className="h-[100px] w-[100px]"
          />
        </div>

        {/* АО УК Кономика — the parent holding */}
        <div
          className="absolute flex flex-col items-start rounded-[12px] bg-white px-[40px] py-[32px] drop-shadow-[4px_4px_17px_rgba(0,0,0,0.11)]"
          style={{ left: AO_UK.left, top: AO_UK.top, width: AO_UK.width, gap: 13 }}
        >
          <p
            className={`w-full text-[28px] leading-[0.95] tracking-[-0.84px] text-[#0a1833] ${fontVelaGxBold}`}
          >
            АО УК Кономика
          </p>
          <p
            className={`w-full text-[18px] leading-none tracking-[-0.72px] text-[#626262] ${fontVelaMedium}`}
          >
            Холдинговая компания группы
          </p>
        </div>

        <CompanyCard
          left={0}
          top={133}
          width={327}
          gap={8}
          title="ООО «Кономика»"
          description={
            <>
              <p className="mb-0 leading-none">Высокотехнологичная</p>
              <p className="leading-none">
                IT-компания, предоставляющая услуги онлайн-платформы для сделок
                с долговыми требованиями.
              </p>
            </>
          }
        />

        <CompanyCard
          left={952}
          top={121}
          width={326}
          gap={24}
          title="ООО «Технологии скоринга»"
          description={
            <>
              <p className="mb-0 leading-none">
                IT-компания - высокотехнологичный скоринговый
              </p>
              <p className="leading-none">
                агрегатор данных, предназначенный для проверки и мониторинга
                платежеспособности.
              </p>
            </>
          }
        />

        <CompanyCard
          left={0}
          top={481}
          width={327}
          gap={16}
          title="ООО «Кономика займы для бизнеса»"
          description={
            <>
              <p className="mb-0 leading-none">
                Оператор Инвестиционной Платформы. Лицензия ЦБ РФ.
              </p>
              <p className="leading-none">
                Состоит в реестре Операторов Инвестиционных платформ Банка
                России.
              </p>
            </>
          }
        />

        <CompanyCard
          left={952}
          top={531}
          width={326}
          gap={16}
          title="ООО «Про Фактор»"
          description="Юридическая компания, обеспечивающая полный цикл юридического сопровождения компаний группы."
        />
      </div>
    </section>
  );
}
