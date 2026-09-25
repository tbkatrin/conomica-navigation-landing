/**
 * Данные интро-лоадера — макет Figma "Navigation landing V1"
 * (`Group 347` / вариант `Group 352`, fileKey JI3xuwFG1gkfqdqiRLTYB0).
 *
 * Сцена лоадера — 1102 × 620. Орбита из 6 точек с подписями, в центре — лого
 * группы компаний. Углы точек отсчитываются по часовой стрелке от «12 часов»
 * (сняты с позиций нод `Rectangle 4271`). Подписи спозиционированы `inset`-ами
 * в процентах сцены — ровно как в макете (`text for loader`).
 */

export const STAGE_W = 1102;
export const STAGE_H = 620;

/** диаметр кольца в cqw (516px / 1102px сцены) */
export const RING_DIAMETER_CQW = 46.8;
/** центр кольца, % сцены */
export const RING_CENTER = { x: 49.5, y: 48.5 };

export type OrbitPoint = {
  /** угол по часовой от 12 часов, град */
  angle: number;
  label: string;
  /** inset подписи: [top, right, bottom, left] в % сцены (из макета) */
  labelInset: [number, number, number, number];
  /** подпись в одну строку, центрируется по точке (верх/низ орбиты) */
  nowrap?: boolean;
};

export const ORBIT: OrbitPoint[] = [
  {
    angle: 0,
    label: "более 3 тысяч инвесторов",
    labelInset: [0.3, 0, 0, 0],
    nowrap: true,
  },
  {
    angle: 54,
    label: "соединяем капитал бизнеса и частных инвесторов",
    labelInset: [24.19, 0, 71.45, 75.09],
  },
  {
    angle: 122,
    label: "монетизируем дебиторскую задолженность",
    labelInset: [72.74, 2.36, 22.9, 75.27],
  },
  {
    angle: 180,
    label: "группа финтех-компаний",
    labelInset: [0, 0, 3, 0],
    nowrap: true,
  },
  {
    angle: 238,
    label: "полный цикл работы с дебиторской задолженностью",
    labelInset: [72.74, 72.64, 22.9, 1.54],
  },
  {
    angle: 300,
    label: "открыли доступ на рынок, ранее недоступный частным лицам",
    labelInset: [25.48, 74.37, 69.19, 0],
  },
];
