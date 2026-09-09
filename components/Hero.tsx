/**
 * Hero — продуктовый герой навигационного лендинга Conomica.
 * Макет Figma "Navigation landing V1" / `hero for claude — all default`
 * (node 2044:619, fileKey JI3xuwFG1gkfqdqiRLTYB0). Макетная ширина 1920, высота 930.
 *
 * Светлый вертикальный градиент `#EEF2EC → #C5C7CD`, поверх — фон `Background`
 * (node 2063:737): рифлёное стекло (вертикальные блики с шагом 72px) + большое
 * размытое зелёное пятно `#00703F`/30% за карточками. Сверху шапка, между шапкой
 * и карточками — «рассыпающийся» логотип-словомарка (`ParticleWordmark`), ниже
 * по центру — ряд из 4 карточек-продуктов. Кадр карточек: 433px сверху, по центру.
 * Desktop-first.
 */

/* eslint-disable @next/next/no-img-element */

import Header from "./Header";
import ParticleWordmark from "./ParticleWordmark";
import ProductGrid from "./ProductGrid";

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-base to-[#c5c7cd]">
      <Header />

      <h1 className="sr-only">
        Conomica — навигация по продуктам группы компаний
      </h1>

      <div className="relative mx-auto h-[930px] w-full max-w-stage">
        {/* фон Background (2063:737) — большое размытое зелёное пятно за карточками */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[1107px]"
          style={{
            background:
              "radial-gradient(760px 430px at 52% 58%, rgba(0,112,63,0.20), rgba(0,112,63,0.05) 46%, transparent 74%)",
          }}
        />
        {/* фон Background (2063:737) — рифлёное стекло, шаг 72px, едва заметное,
            видно только в верхней части */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, rgba(255,255,255,0.28) 0px, rgba(255,255,255,0.06) 14px, rgba(0,0,0,0.02) 36px, rgba(255,255,255,0.06) 58px, rgba(255,255,255,0.28) 72px)",
            maskImage:
              "linear-gradient(to bottom, #000 0%, #000 40%, transparent 58%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, #000 0%, #000 40%, transparent 58%)",
          }}
        />

        {/* логотип-словомарка: точки собираются в «conomica» и периодически
            разлетаются по экрану, затем снова складываются. По центру промежутка
            между шапкой (низ 96px) и карточками (верх 433px). */}
        <div className="pointer-events-none absolute inset-x-0 top-[97px] z-[1] flex justify-center">
          <div className="h-[335px] w-full max-w-[1240px] px-6">
            <ParticleWordmark
              text="conomica"
              coreColor="0, 112, 63"
              glowColor="0, 112, 63"
              fontWeight={800}
              density={1.8}
              maxParticles={7000}
              burstInterval={16000}
              burstFirst={7200}
              zIndex={1}
            />
          </div>
        </div>

        {/* ряд карточек — по центру кадра */}
        <div className="absolute left-1/2 top-[433px] z-10 -translate-x-1/2">
          <ProductGrid />
        </div>
      </div>
    </section>
  );
}
