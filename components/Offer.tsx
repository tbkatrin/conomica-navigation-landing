import type { ReactNode } from "react";
import { fontVelaBold, fontVelaGxBold, fontVelaMedium } from "./fonts";

/**
 * "Что мы можем предложить бизнесу, у которого есть дебиторка?" — its own
 * white rounded card (Figma node 399:2917), separated from the showcase
 * above it. Two H2 headings (the second one pushed to the right column and
 * accented green), then two white cards with a soft shadow; the financing
 * stats show only the upper bounds now ("до 80%", "до 50 млн руб.").
 *
 * Fluid-scaling: sizes/gaps in `cqw` against this card's own 1372px Figma
 * width (see Footer.tsx's doc comment for the full technique writeup);
 * font-sizes use `clamp(floor, Pcqw, ceiling)`, tracking is in `em`.
 * Border-radius stays literal px (a finish detail, not a layout dimension).
 */

const CQ = (px: number) => `${(px / 13.72).toFixed(4)}cqw`;

function StatRow({
  height,
  pre,
  number,
  post,
  preStyle,
  numberStyle,
  postStyle,
}: {
  height: number;
  pre: ReactNode;
  number: string;
  post: ReactNode;
  preStyle: { left: number; top: number; rightAligned?: boolean };
  numberStyle: { left: number; top: number };
  postStyle: { left: number; top: number };
}) {
  return (
    <div className="relative w-full shrink-0" style={{ height: CQ(height) }}>
      <p
        className={`absolute whitespace-nowrap text-[clamp(11px,1.0204cqw,15.56px)] leading-none tracking-[-0.04em] text-[#24252b] ${fontVelaMedium}`}
        style={{
          left: CQ(preStyle.left),
          top: CQ(preStyle.top),
          transform: preStyle.rightAligned ? "translate(-100%, -50%)" : "translateY(-50%)",
        }}
      >
        {pre}
      </p>
      <p
        className={`absolute whitespace-nowrap text-[clamp(11px,2.3324cqw,35.56px)] leading-[0.94] tracking-[-0.05em] text-[#24252b] ${fontVelaBold}`}
        style={{ left: CQ(numberStyle.left), top: CQ(numberStyle.top), transform: "translateY(-50%)" }}
      >
        {number}
      </p>
      <p
        className={`absolute text-[clamp(11px,1.0204cqw,15.56px)] leading-none tracking-[-0.04em] text-[#24252b] ${fontVelaMedium}`}
        style={{ left: CQ(postStyle.left), top: CQ(postStyle.top), width: CQ(114) }}
      >
        {post}
      </p>
    </div>
  );
}

function SolutionCard({
  title,
  description,
  textGap,
  spaced,
  percent,
  percentOffsets,
  amountOffsets,
}: {
  title: string;
  description: string;
  /** gap between title and description, px */
  textGap: number;
  /** card 1 pushes the button to the bottom; card 2 keeps a fixed 24px gap */
  spaced: boolean;
  percent: string;
  percentOffsets: { pre: number; number: number; post: number };
  amountOffsets: { pre: number; number: number; post: number };
}) {
  return (
    <div
      className={`flex flex-1 flex-col items-start self-stretch rounded-[16px] bg-white drop-shadow-[4px_4px_17px_rgba(0,0,0,0.11)] ${
        spaced ? "justify-between" : ""
      }`}
      style={{ padding: `${CQ(24)} ${CQ(32)}`, gap: spaced ? undefined : CQ(24) }}
    >
      <div className="flex w-full items-start justify-between">
        <div className="flex flex-col items-start" style={{ width: CQ(220), gap: CQ(textGap) }}>
          <p
            className={`w-full text-[clamp(11px,2.0408cqw,31.11px)] leading-[0.9] tracking-[-0.03em] text-[#191919] ${fontVelaGxBold}`}
          >
            {title}
          </p>
          <p
            className={`w-full text-[clamp(11px,1.312cqw,20px)] leading-none tracking-[-0.04em] text-[#626262] ${fontVelaMedium}`}
          >
            {description}
          </p>
        </div>
        <div className="flex shrink-0 flex-col items-start" style={{ width: CQ(250), paddingTop: CQ(8), gap: CQ(25) }}>
          <StatRow
            height={56}
            pre="до"
            number={percent}
            post="от суммы задолженности"
            preStyle={{ left: 17, top: 4 + percentOffsets.pre, rightAligned: true }}
            numberStyle={{ left: 34, top: 12 + percentOffsets.number }}
            postStyle={{ left: 113, top: -4.5 + percentOffsets.post }}
          />
          <StatRow
            height={56}
            pre="до"
            number="50"
            post="млн руб."
            preStyle={{ left: 0, top: 1 + amountOffsets.pre }}
            numberStyle={{ left: 22, top: 10.5 + amountOffsets.number }}
            postStyle={{ left: 70, top: -6 + amountOffsets.post }}
          />
        </div>
      </div>
      <a
        href="https://conomica.ru/creditors"
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-full shrink-0 items-center justify-center rounded-[12px] bg-[#00703e] drop-shadow-[0px_2px_1px_rgba(0,0,0,0.04)] transition-colors hover:bg-[#0EAD66]"
        style={{ height: CQ(48) }}
      >
        <span
          className={`text-[clamp(11px,1.1662cqw,17.78px)] leading-[1.2] tracking-[0.01em] text-white ${fontVelaMedium}`}
        >
          Подробнее
        </span>
      </a>
    </div>
  );
}

export default function Offer() {
  return (
    <section className="relative z-10 mx-auto w-full max-w-[1600px] overflow-hidden rounded-[24px] bg-white [container-type:inline-size]">
      <div
        className="flex w-full flex-col items-start"
        style={{ padding: `${CQ(120)} ${CQ(24)}`, gap: CQ(64) }}
      >
        <div className="w-full" style={{ padding: `0 ${CQ(32)}` }}>
          <p
            className={`text-[clamp(12.67px,2.7697cqw,42.22px)] leading-[0.98] tracking-[-0.03em] text-[#212226] ${fontVelaGxBold}`}
            style={{ width: CQ(618), maxWidth: "100%" }}
          >
            Что мы можем предложить бизнесу, у которого есть дебиторка?
          </p>
        </div>

        <div className="flex w-full items-start" style={{ padding: `0 ${CQ(32)}`, gap: CQ(24) }}>
          <div className="min-w-0 flex-1" />
          <div className="min-w-0 flex-1">
            <p
              className={`text-[clamp(12.67px,2.7697cqw,42.22px)] leading-[0.98] tracking-[-0.03em] text-[#212226] ${fontVelaGxBold}`}
              style={{ width: CQ(660) }}
            >
              Полный цикл <span className="text-[#00703e]">от оценки до фактической монетизации</span> дебиторской
              задолженности
            </p>
          </div>
        </div>

        <div className="flex w-full items-start" style={{ gap: CQ(24) }}>
          <SolutionCard
            title="Продать долг"
            description="Выкупаем дебиторскую задолженность Ваших контрагентов"
            textGap={8}
            spaced
            percent="80%"
            percentOffsets={{ pre: 0, number: 0, post: 0 }}
            amountOffsets={{ pre: 0, number: 0, post: 0 }}
          />
          <SolutionCard
            title="Получить займ для бизнеса"
            description="Финансируем бизнес под обеспечение текущей дебиторской задолженности"
            textGap={16}
            spaced={false}
            percent="90%"
            percentOffsets={{ pre: 0, number: 0, post: 0 }}
            amountOffsets={{ pre: 2, number: 2, post: 2 }}
          />
        </div>
      </div>
    </section>
  );
}
