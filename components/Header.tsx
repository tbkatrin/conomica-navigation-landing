/**
 * Header — шапка продуктового героя. Макет Figma `hero for claude — all default`
 * (node 2044:620): высота 96, `backdrop-blur(20)` над заливкой rgba(242,242,242,.12).
 * Слева — логотип, справа — слоган. Контент выровнен по краям кадра карточек
 * (1288px по центру макетной ширины 1920).
 */

/* eslint-disable @next/next/no-img-element */

export default function Header() {
  return (
    <header
      className="absolute inset-x-0 top-0 z-20 flex h-24 justify-center backdrop-blur-[20px]"
      style={{ backgroundColor: "rgba(242,242,242,0.12)" }}
    >
      <div className="flex w-full max-w-[1288px] items-center justify-between py-6">
        <img
          src="/logo.svg"
          alt="Conomica"
          width={200}
          height={40}
          className="h-10 w-[200px]"
        />
        <p className="text-[12px] font-medium uppercase leading-none tracking-tagline text-tagline">
          Экосистема финтех-продуктов
        </p>
      </div>
    </header>
  );
}
