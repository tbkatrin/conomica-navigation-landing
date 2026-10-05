import type { ReactNode } from "react";
import Asset from "./Asset";
import { fontVelaBold, fontVelaGxBold, fontVelaMedium } from "./fonts";

/**
 * "Полный цикл..." offer block from the same Figma frame (node 57:6392,
 * subtree 136:1902) — sits directly below Hero. Pulled up with a negative
 * top margin to match the original 100px overlap with the tail of Hero's
 * wave background.
 *
 * Fluid-scaling pass: sizes/gaps in `cqw` against this file's 1440px
 * reference (see Footer.tsx's doc comment for the full technique
 * writeup); font-sizes use `clamp(floor, Pcqw, ceiling)`, tracking is in
 * `em`. The headline's old hand-tuned `clamp(38px, 2.35vw, 47px)` folds
 * into the same convention using 38px as its reference (its actual
 * rendered size at every viewport up to ~1617px under the old rule).
 * Border-radius stays literal px everywhere (a finish detail, not a core
 * layout dimension) — same convention as the other converted files.
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
    <div className="flex items-baseline gap-[0.4167cqw] text-[#24252b]">
      {children}
    </div>
  );
}

function StatNumber({ children }: { children: ReactNode }) {
  return (
    <span
      className={`text-[clamp(11px,2.2222cqw,35.56px)] leading-none tracking-[-0.05em] ${fontVelaBold}`}
    >
      {children}
    </span>
  );
}

function StatLabel({ children }: { children: ReactNode }) {
  return (
    <span
      className={`text-[clamp(11px,0.9722cqw,15.56px)] leading-none tracking-[-0.04em] ${fontVelaMedium}`}
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
  titleGap: "gap-[0.5556cqw]" | "gap-[1.1111cqw]";
  description: string;
  stat1: ReactNode;
  stat2: ReactNode;
}) {
  return (
    <div className="flex flex-1 flex-col items-start justify-between gap-[1.6667cqw] self-stretch rounded-[16px] bg-[#f5f5f5] px-[2.2222cqw] py-[1.6667cqw]">
      <div className="flex w-full items-start justify-between">
        <div
          className={`flex w-[15.2778cqw] flex-col items-start self-stretch ${titleGap}`}
        >
          <p
            className={`text-[clamp(11px,1.9444cqw,31.11px)] leading-[0.95] tracking-[-0.03em] text-[#191919] ${fontVelaGxBold}`}
          >
            {title}
          </p>
          <p
            className={`text-[clamp(11px,1.25cqw,20px)] leading-[1.2] tracking-[-0.04em] text-[#626262] ${fontVelaMedium}`}
          >
            {description}
          </p>
        </div>
        <div className="flex w-[17.3611cqw] flex-col items-start gap-[1.7361cqw] pt-[0.5556cqw]">
          <Stat>{stat1}</Stat>
          <Stat>{stat2}</Stat>
        </div>
      </div>
      <a
        href="https://conomica.ru/creditors"
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-[3.3333cqw] w-full items-center justify-center rounded-[12px] bg-[#00703e] drop-shadow-[0px_2px_1px_rgba(0,0,0,0.04)] transition-colors hover:bg-[#0EAD66]"
      >
        <span
          className={`text-[clamp(11px,1.1111cqw,17.78px)] leading-[1.2] tracking-[0.01em] text-white ${fontVelaMedium}`}
        >
          Подробнее
        </span>
      </a>
    </div>
  );
}

export default function Offer() {
  return (
    <section className="relative z-10 mx-auto w-full max-w-[1600px] overflow-x-hidden bg-white [container-type:inline-size]">
      <div className="flex w-full flex-col items-center gap-[4.4444cqw] px-[2.2222cqw]">
      <div className="flex w-full flex-col items-start gap-[4.4444cqw]">
        <div className="flex w-full items-start gap-[1.6667cqw]">
          <div className="flex flex-1 items-start">
            <p
              className={`text-[clamp(11px,0.9722cqw,15.56px)] uppercase leading-[1.24] tracking-[0.02em] text-[#212226] ${fontVelaMedium}`}
            >
              Что мы можем предложить бизнесу, у которого есть дебиторка?
            </p>
          </div>
          <div className="min-w-0 flex-1">
            <p
              className={`w-[45.8333cqw] max-w-full leading-[0.98] text-[#212226] ${fontVelaGxBold}`}
              style={{
                fontSize: "clamp(12.67px, 2.6389cqw, 42.22px)",
                letterSpacing: "-0.03em",
              }}
            >
              Полный цикл <span className="text-[#00703e]">от оценки до фактической монетизации</span> дебиторской
              задолженности
            </p>
          </div>
        </div>

        <div className="flex w-full items-start gap-[1.6667cqw]">
          <SolutionCard
            title="Продать долг"
            titleGap="gap-[0.5556cqw]"
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
            titleGap="gap-[1.1111cqw]"
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
      </div>
    </section>
  );
}
