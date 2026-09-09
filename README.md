# conomica-landing

Навигационный лендинг **Conomica** — Next.js 15 (App Router) + Tailwind CSS 3 + TypeScript.
Собран по макету Figma [«Navigation landing V1»](https://www.figma.com/design/JI3xuwFG1gkfqdqiRLTYB0/Navigation-landing-V1?node-id=7-3169) (page `7:3169`). Готов к деплою на Vercel без изменений.

## Что это

Две сцены:

### 1. Интро-лоадер (`components/Loader.tsx`)

Полноэкранная тёмно-зелёная (`#0A4028`) заставка. По кругу рисуется орбита из
6 точек, вокруг них проступают подписи-ценности группы компаний, в центре —
лого «conomica · группа компаний». Затем композиция схлопывается в белую точку,
и оверлей уезжает, открывая витрину.

- Проигрывается **один раз** при загрузке (autoplay, ~3.7 с). При
  `prefers-reduced-motion` — сразу скрывается.
- Сцена 1102 × 620, свёрстана в `cqw` (container queries) и масштабируется
  под вьюпорт через `transform: scale(min(1, …))`.
- Углы точек орбиты (по часовой от «12 часов»): 0, 54, 122, 180, 238, 300.

Подписи: «более 3 тысяч инвесторов», «соединяем капитал бизнеса и частных
инвесторов», «монетизируем дебиторскую задолженность», «группа финтех-компаний»,
«полный цикл работы с дебиторской задолженностью», «открыли доступ на рынок,
ранее недоступный частным лицам».

### 2. Продуктовая витрина (`components/ProductShowcase.tsx`)

Лавандовый фон (`#E2E6EF`), сверху — тёмно-зелёная точка (преемственность с
финальным кадром лоадера). Ниже три блока продуктов, у каждого: тег-пилюля +
заголовок H2 + мокап iPhone 15 Pro с дашбордом (`components/PhoneMock.tsx`).

| Блок | Тег | Порядок карточек в мокапе |
|---|---|---|
| Conomica Finance | платформа | balances → account → metrics → chart |
| Conomica Cessions | платформа | chart → balances → account |
| Rescore | Онлайн-сервис | balances → account → metrics → chart |

Наполнение дашборда во всех трёх мокапах одинаковое — различаются набор и
порядок карточек (`components/phone.data.ts`). Карточки свёрстаны в DOM 1:1
с макетом; кольцевая диаграмма — SVG.

## Стек

| Что | Версия |
|---|---|
| Next.js | 15 (App Router, RSC, `next/font`) |
| React | 19 |
| Tailwind CSS | 3.4 — токены в `tailwind.config.ts` |
| Framer Motion | 13 — вся анимация лендинга |
| TypeScript | 5 (strict) |

`Loader` и `Reveal` — клиентские компоненты (Framer Motion). `ProductShowcase`
и `PhoneMock` — серверные.

## Анимация

Всё на **Framer Motion**, собственных CSS-кейфреймов нет.

- `components/Loader.tsx` — интро-последовательность на `variants` со сдвигом по
  времени (кольцо → точки → подписи → лого → схлопывание), фазы `intro →
  collapse → done`; выход оверлея — через `AnimatePresence`.
- `components/Reveal.tsx` — обёртка `whileInView` (fade-up, `once: true`) для
  блоков продуктовой витрины.
- Оба компонента уважают `prefers-reduced-motion` (`useReducedMotion`): лоадер
  скрывается сразу, блоки рендерятся статично.

## Ассеты из Figma

- `public/cone-loader.svg`, `public/wordmark-loader.svg` — лого-локап для лоадера (белый)
- `public/logo.svg`, `public/wordmark.svg` — логотип и фоновая надпись (наследие, сейчас не используются)
- `public/icons/*.svg` — иконки дашборда (search, bell, menu, wallet, activity, plus, user, chevron-right, message-square, dynamic-island)
- `app/icon.svg` — фавикон

Ассеты скачаны из Figma MCP и закоммичены (ссылки на CDN Figma живут ~7 дней).

## Шрифт

**Inter** (Medium 500 — основной вес макета). Подключён через `next/font/google`
в `app/layout.tsx` (subsets `latin` + `cyrillic`, веса 400/500/600).

## Дизайн-токены

Полная таблица — в `design/tokens.json` и `design/tokens.css`.

## Локальный запуск

```bash
npm install
npm run dev
```

→ http://localhost:3000

```bash
npm run build   # прод-сборка
npm run start   # запуск прод-сборки
npm run lint    # ESLint
```

Нужен Node.js ≥ 18.18 (рекомендуется 20 или 22).

## Деплой на Vercel

1. Залейте репозиторий на GitHub / GitLab / Bitbucket.
2. На [vercel.com/new](https://vercel.com/new) импортируйте репозиторий — Next.js определится сам.
3. Deploy. Переменные окружения не требуются.

## Известные ограничения

- **Мобильной вёрстки нет** — в макете только desktop. Блоки витрины
  фиксированной ширины (372 / 344 px), лоадер масштабируется, но композиция
  рассчитана на широкий экран. Нужен отдельный мобильный макет.
- 21 кадр анимации лоадера (`Group 347`) сведён к одной автоплей-последовательности
  (рисование кольца → точки → подписи → лого → схлопывание); покадрово не воспроизводится.
- Геометрия орбиты восстановлена из позиций нод — точность ~1–2 %.
