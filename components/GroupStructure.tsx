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
 *
 * Fluid-scaling pass: `ICON`/`AO_UK`/`CompanyCard`'s left/top/width/gap
 * stay plain design-px numbers (reused as-is by `Connectors()`'s SVG path
 * math below, which auto-scales via its own `viewBox` regardless of the
 * `<svg>`'s final rendered CSS size — no per-point conversion needed
 * there), and get divided by 14.4 (design-px → cqw, this file's 1440px
 * reference — see Footer.tsx's doc comment for the technique writeup)
 * only where they're used as actual CSS `style` positions on the HTML
 * card/icon divs. Font-sizes use `clamp(floor, Pcqw, ceiling)`.
 */

const CQW = (px: number) => `${px / 14.4}cqw`;

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
      className="absolute flex flex-col items-start rounded-[12px] bg-white px-[2.7778cqw] py-[2.2222cqw] drop-shadow-[4px_4px_17px_rgba(0,0,0,0.11)]"
      style={{ left: CQW(left), top: CQW(top), width: CQW(width), gap: CQW(gap) }}
    >
      <p
        className={`w-full t-h3 ${fontVelaGxBold}`}
        style={{ color: titleColor }}
      >
        {title}
      </p>
      <div
        className={`w-full t-body text-[#626262] ${fontVelaMedium}`}
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
      style={{ width: CQW(1280), height: CQW(800) }}
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
      className="relative z-10 mx-auto w-full overflow-x-hidden rounded-[24px] bg-white [container-type:inline-size]"
      style={{ maxWidth: "min(1600px, calc(100% - 16px))" }}
    >
      <div className="px-[5.5556cqw] py-[6.9444cqw]">
      <div className="relative" style={{ minHeight: CQW(800) }}>
        <p
          className={`text-[#161616] ${fontVelaGxBold}`}
          style={{
            fontSize: "clamp(12.67px, 2.6389cqw, 42.22px)",
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
          style={{ left: CQW(ICON.left), top: CQW(ICON.top), width: CQW(ICON.size), height: CQW(ICON.size) }}
        >
          <Asset
            src="/company-structure/sis.svg"
            alt=""
            fit="contain"
            className="h-[6.9444cqw] w-[6.9444cqw]"
          />
        </div>

        {/* АО УК Кономика — the parent holding */}
        <div
          className="absolute flex flex-col items-start rounded-[12px] bg-white px-[2.7778cqw] py-[2.2222cqw] drop-shadow-[4px_4px_17px_rgba(0,0,0,0.11)]"
          style={{ left: CQW(AO_UK.left), top: CQW(AO_UK.top), width: CQW(AO_UK.width), gap: CQW(13) }}
        >
          <p
            className={`w-full t-h3 text-[#0a1833] ${fontVelaGxBold}`}
          >
            АО УК Кономика
          </p>
          <p
            className={`w-full t-body text-[#626262] ${fontVelaMedium}`}
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
      </div>
    </section>
  );
}
