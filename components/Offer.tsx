import type { ReactNode } from "react";
import Asset from "./Asset";
import { fontVelaBold, fontVelaGxBold, fontVelaMedium } from "./fonts";

/**
 * "Полный цикл..." offer block from the same Figma frame (node 57:6392,
 * subtree 136:1902) — sits directly below Hero. Pulled up with a negative
 * top margin to match the original 100px overlap with the tail of Hero's
 * wave background.
 */

function Divider() {
  return (
    <Asset
      src="/hero/divider-line.svg"
      alt=""
      className="h-px w-full"
      fit="cover"
    />
  );
}

function Stat({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-baseline gap-[6px] text-[#24252b]">
      {children}
    </div>
  );
}

function StatNumber({ children }: { children: ReactNode }) {
  return (
    <span
      className={`text-[32px] leading-none tracking-[-1.6px] ${fontVelaBold}`}
    >
      {children}
    </span>
  );
}

function StatLabel({ children }: { children: ReactNode }) {
  return (
    <span
      className={`text-[14px] leading-none tracking-[-0.56px] ${fontVelaMedium}`}
    >
      {children}
    </span>
  );
}

function SolutionCard({
  title,
  titleGap,
  description,
  stat1,
  stat2,
}: {
  title: string;
  titleGap: "gap-[8px]" | "gap-[16px]";
  description: string;
  stat1: ReactNode;
  stat2: ReactNode;
}) {
  return (
    <div className="flex flex-1 flex-col items-start justify-between gap-[24px] self-stretch rounded-[16px] bg-[#f5f5f5] px-[32px] py-[24px]">
      <div className="flex w-full items-start justify-between">
        <div
          className={`flex w-[220px] flex-col items-start self-stretch ${titleGap}`}
        >
          <p
            className={`text-[28px] leading-[0.95] tracking-[-0.84px] text-[#191919] ${fontVelaGxBold}`}
          >
            {title}
          </p>
          <p
            className={`text-[18px] leading-[1.2] tracking-[-0.72px] text-[#626262] ${fontVelaMedium}`}
          >
            {description}
          </p>
        </div>
        <div className="flex w-[250px] flex-col items-start gap-[25px] pt-[8px]">
          <Stat>{stat1}</Stat>
          <Stat>{stat2}</Stat>
        </div>
      </div>
      <button className="flex h-[48px] w-full items-center justify-center rounded-[12px] bg-[#00703e] drop-shadow-[0px_2px_1px_rgba(0,0,0,0.04)] transition-colors hover:bg-[#0EAD66]">
        <span
          className={`text-[16px] leading-[1.2] tracking-[0.16px] text-white ${fontVelaMedium}`}
        >
          Подробнее
        </span>
      </button>
    </div>
  );
}

export default function Offer() {
  return (
    <section className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col items-center gap-[64px] overflow-x-hidden bg-white px-[32px]">
      <div className="flex w-full flex-col items-start gap-[32px]">
        <div className="flex w-full items-start gap-[24px]">
          <div className="flex flex-1 items-start">
            <p
              className={`[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] text-[14px] uppercase leading-[1.24] tracking-[0.28px] text-[#212226] ${fontVelaMedium}`}
            >
              Что мы можем предложить бизнесу, у которого есть дебиторка?
            </p>
          </div>
          <div className="min-w-0 flex-1">
            <p
              className={`w-[660px] max-w-full leading-[0.98] text-[#212226] ${fontVelaGxBold}`}
              style={{
                fontSize: "clamp(38px, 2.35vw, 47px)",
                letterSpacing: "-0.03em",
              }}
            >
              Полный цикл от оценки до работы со взысканием для монетизации
              дебиторской задолженности
            </p>
          </div>
        </div>

        <div className="flex w-full items-start gap-[24px]">
          <SolutionCard
            title="Продать долг"
            titleGap="gap-[8px]"
            description="Выкупаем дебиторскую задолженность Ваших контрагентов"
            stat1={
              <>
                <StatLabel>до</StatLabel>
                <StatNumber>80%</StatNumber>
                <StatLabel>от суммы задолженности</StatLabel>
              </>
            }
            stat2={
              <>
                <StatLabel>от</StatLabel>
                <StatNumber>2</StatNumber>
                <StatLabel>до</StatLabel>
                <StatNumber>50</StatNumber>
                <StatLabel>млн руб.</StatLabel>
              </>
            }
          />
          <SolutionCard
            title="Получить займ для бизнеса"
            titleGap="gap-[16px]"
            description="Финансируем бизнес под обеспечение текущей дебиторской задолженности"
            stat1={
              <>
                <StatLabel>до</StatLabel>
                <StatNumber>90%</StatNumber>
                <StatLabel>от суммы задолженности</StatLabel>
              </>
            }
            stat2={
              <>
                <StatLabel>от</StatLabel>
                <StatNumber>1</StatNumber>
                <StatLabel>до</StatLabel>
                <StatNumber>50</StatNumber>
                <StatLabel>млн руб.</StatLabel>
              </>
            }
          />
        </div>
      </div>

      <Divider />
    </section>
  );
}
