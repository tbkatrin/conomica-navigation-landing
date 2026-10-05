import Asset from "./Asset";
import { fontVelaGxBold, fontVelaMedium } from "./fonts";

/**
 * "Conomica — это люди" — team section, right after "Структура группы
 * компаний". The Figma source (node 192:2880) is itself laid out with
 * flex/gap rather than absolute positions, so this follows the same
 * pattern as Offer.tsx's card rows instead of Hero.tsx's fixed-1440
 * reproduction. The quote under each name is a placeholder in the
 * design (literal Lorem Ipsum, intentionally blurred with a fade-to-white
 * mask) — kept as-is rather than inventing real quotes for named people.
 *
 * Fluid-scaling pass: sizes/gaps in `cqw` against this file's 1440px
 * reference (see Footer.tsx's doc comment for the technique writeup);
 * font-sizes use `clamp(floor, Pcqw, ceiling)`. Tracking here was already
 * authored in `em` (ratio to its own font-size), so it needed no change.
 */

interface Person {
  name: string;
  title: string;
  photo: string;
}

const LEADS: Person[] = [
  { name: "Светлана Васина", title: "Генеральный директор", photo: "/team/vasina.png" },
  { name: "Кирилл Панов", title: "Управляющий партнёр", photo: "/team/panov.png" },
];

const TEAM: Person[] = [
  { name: "Ирина Юманова", title: "Директор по финансам и инвестициям", photo: "/team/yumanova.png" },
  { name: "Андрей Горбунов", title: "Директор по цифровой трансформации", photo: "/team/gorbunov.png" },
  { name: "Альфия Чудутова", title: "Директор по продажам", photo: "/team/chudutova.png" },
  { name: "Михаил Гущин", title: "Руководитель ОЭБ", photo: "/team/gushchin.png" },
];

const MANAGERS: Person[] = [
  {
    name: "Фархат Гайдаров",
    title: "Руководитель департамента договорных и корпоративных отношений",
    photo: "/team/gaydarov.png",
  },
  {
    name: "Михаил Кирсанов",
    title: "Бизнес-лидер продукта Rescore.online",
    photo: "/team/kirsanov.png",
  },
];

const PLACEHOLDER_QUOTE = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914 Cicero translation and scrambled it to make dummy text for Letraset's Body Type sheets. It has survived not only many decades, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised thanks to these sheets and more recently with desktop publishing software like Aldus PageMaker and Microsoft Word including versions of Lorem Ipsum.`;

/**
 * Collapsed by default (gradient fade to white, clipped to two lines);
 * on hover of the parent `.group` card it expands to the full paragraph
 * in solid gray and a rotated closing quote mark appears — matches the
 * "state2" hover variant in Figma (node 192:2600).
 */
function PlaceholderQuote() {
  return (
    <div className="flex w-full items-start gap-[0.2778cqw]">
      <Asset
        src="/team/quote-mark.svg"
        alt=""
        className="h-[1.0417cqw] w-[1.0417cqw] shrink-0"
      />
      <div className="max-h-[4.7222cqw] flex-1 overflow-hidden transition-[max-height] duration-500 ease-in-out group-hover:max-h-[27.7778cqw]">
        <p
          className={`bg-gradient-to-b from-[#919191] from-[2%] to-white to-[21%] bg-clip-text text-[clamp(11px,0.9722cqw,15.56px)] leading-none tracking-[-0.04em] text-transparent transition-[background-image,color] duration-300 group-hover:bg-none group-hover:text-[#919191] group-hover:leading-[1.5] ${fontVelaMedium}`}
        >
          {PLACEHOLDER_QUOTE}
        </p>
      </div>
      <Asset
        src="/team/quote-mark.svg"
        alt=""
        className="h-[1.0417cqw] w-[1.0417cqw] shrink-0 rotate-180 self-end opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
    </div>
  );
}

function NameBlock({ name, title }: Person) {
  return (
    <div className="flex w-full flex-col items-start gap-[0.5556cqw]">
      <p
        className={`w-full text-[clamp(12.67px,2.6389cqw,42.22px)] leading-[0.98] tracking-[-0.02em] text-[#161616] ${fontVelaGxBold}`}
      >
        {name}
      </p>
      <p
        className={`w-full text-[clamp(11px,1.25cqw,20px)] leading-[1.2] tracking-[-0.04em] text-[#626262] ${fontVelaMedium}`}
      >
        {title}
      </p>
    </div>
  );
}

// Both card shapes are pinned `absolute` inside a `relative` wrapper that's
// fixed at exactly the collapsed card size — reserving that footprint in
// the grid permanently. The card is centered on the wrapper via
// left/top-1/2 + -translate-1/2, so growing its width/height on hover
// expands symmetrically from that centre instead of shoving the grid
// around; `hover:z-20` lifts the now-larger card above whatever it overlaps.
const WIDE_CARD_HEIGHT = "20cqw"; // 224px photo + 32px padding top/bottom, at the 1440 reference
const SQUARE_CARD_HEIGHT = "37.2222cqw"; // 224px photo + 24px gap + 224px text + 64px padding, at the 1440 reference

function WideCard({ person }: { person: Person }) {
  return (
    <div className="relative flex-1" style={{ height: WIDE_CARD_HEIGHT }}>
      <div className="group absolute left-1/2 top-1/2 z-0 w-full -translate-x-1/2 -translate-y-1/2 flex items-end gap-[1.6667cqw] rounded-[16px] bg-[#f5f5f5] p-[2.2222cqw] shadow-[0_0_0_rgba(0,0,0,0)] transition-[width,box-shadow] duration-300 hover:z-20 hover:w-[115%] hover:items-start hover:shadow-[0_24px_60px_-15px_rgba(0,0,0,0.25)]">
        <Asset
          src={person.photo}
          alt={person.name}
          fit="cover"
          className="h-[15.5556cqw] w-[15.5556cqw] shrink-0 overflow-hidden rounded-[8px]"
        />
        <div className="flex flex-1 flex-col items-start justify-between gap-[1.6667cqw] self-stretch">
          <PlaceholderQuote />
          <NameBlock {...person} />
        </div>
      </div>
    </div>
  );
}

function SquareCard({ person }: { person: Person }) {
  return (
    <div className="relative flex-1" style={{ height: SQUARE_CARD_HEIGHT }}>
      <div className="group absolute left-1/2 top-1/2 z-0 w-full -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-[1.6667cqw] rounded-[16px] bg-[#f5f5f5] p-[2.2222cqw] shadow-[0_0_0_rgba(0,0,0,0)] transition-[width,box-shadow] duration-300 hover:z-20 hover:w-[115%] hover:shadow-[0_24px_60px_-15px_rgba(0,0,0,0.25)]">
        <Asset
          src={person.photo}
          alt={person.name}
          fit="cover"
          className="h-[15.5556cqw] w-full shrink-0 overflow-hidden rounded-[8px]"
        />
        <div className="flex min-h-[15.5556cqw] w-full flex-col items-start justify-between">
          <PlaceholderQuote />
          <NameBlock {...person} />
        </div>
      </div>
    </div>
  );
}

export default function Team() {
  return (
    <section className="relative z-10 mx-auto w-full max-w-[1600px] [container-type:inline-size]">
      <div className="flex flex-col items-start gap-[3.3333cqw] px-[5.5556cqw] py-[6.9444cqw]">
        <p
          className={`w-[54.1667cqw] max-w-full text-[#212121] ${fontVelaGxBold}`}
          style={{
            fontSize: "clamp(12.67px, 2.6389cqw, 42.22px)",
            lineHeight: 0.98,
            letterSpacing: "-0.02em",
          }}
        >
          Conomica — это люди. И мы с гордостью показываем тех, кто двигает
          нас вперёд
        </p>

        <div className="flex w-full flex-col items-start gap-[1.6667cqw]">
          <div className="flex w-full items-center gap-[1.6667cqw]">
            {LEADS.map((p) => (
              <WideCard key={p.name} person={p} />
            ))}
          </div>

          <div className="flex w-full items-start gap-[1.6667cqw]">
            {TEAM.map((p) => (
              <SquareCard key={p.name} person={p} />
            ))}
          </div>

          <div className="flex w-full items-center gap-[1.6667cqw]">
            {MANAGERS.map((p) => (
              <WideCard key={p.name} person={p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
