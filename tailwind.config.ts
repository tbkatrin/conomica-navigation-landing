import type { Config } from "tailwindcss";

/**
 * Токены с макета Figma "Navigation landing V1"
 * (fileKey JI3xuwFG1gkfqdqiRLTYB0).
 *
 * Экраны:
 *  • интро-лоадер (`loader`) — тёмно-зелёная сцена, орбита; проигрывается один раз;
 *  • продуктовый герой (`hero for claude — all default`, node 2044:619) —
 *    светлый градиент + зелёная волна, шапка + ряд из 4 карточек-продуктов.
 *    Карточка: default — мятный фон `#EAF6EE`; hover — полная инверсия в
 *    сплошной зелёный `#00703F` (белый текст, белая кнопка).
 *
 * Обе сцены — desktop-first, макетная ширина 1440px.
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        base: "#EEF2EC", // верх градиента страницы (низ — #C5C7CD)
        ink: "#17171A", // Figma Black
        brand: {
          DEFAULT: "#00703E", // Figma Green — знак логотипа, кнопка (default)
          card: "#00703F", // фон карточки в состоянии hover (инверсия)
        },
        tagline: "rgba(0,112,63,0.75)", // слоган в шапке
        // интро-лоадер
        loader: {
          bg: "#0A4028", // тёмно-зелёная заливка сцены
          dot: "#F2FAF2", // точка орбиты
        },
        // карточка-продукт
        card: {
          fill: "#EAF6EE", // фон карточки (default)
          ink: "#010610", // заголовок (default)
          desc: "#47484A", // описание (default) — серый
          invert: "#FAFAFA", // заголовок + описание + кнопка (hover)
          pill: "#93DAAB", // граница лейбл-пилюли
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tag: "-0.01em", // 12px лейбл-пилюля + слоган-база (Figma −1%)
        title: "-0.03em", // 28px заголовок карточки (Figma −3%)
        desc: "-0.04em", // 18px описание карточки (Figma −0.72px)
        btn: "0.01em", // 16px кнопка (Figma +1%)
        tagline: "0.08em", // 12px слоган в шапке (Figma 0.96px)
        caption: "0.02em", // 14px подписи орбиты лоадера (Figma +2%)
      },
      borderRadius: {
        card: "20px",
        pill: "4px",
      },
      maxWidth: {
        loader: "1102px",
        stage: "1920px",
      },
      boxShadow: {
        card: "0px 14px 28px -2px rgba(5,31,18,0.14)",
        btn: "0px 2px 1px 0 rgba(0,0,0,0.04)",
      },
      // Анимации лоадера — Framer Motion; ховер карточек — CSS + проп `active`.
    },
  },
  plugins: [],
};

export default config;
