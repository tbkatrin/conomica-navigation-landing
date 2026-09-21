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
    <div className="flex w-full items-start gap-1">
      <Asset
        src="/team/quote-mark.svg"
        alt=""
        className="h-[15px] w-[15px] shrink-0"
      />
      <div className="max-h-[68px] flex-1 overflow-hidden transition-[max-height] duration-500 ease-in-out group-hover:max-h-[400px]">
        <p
          className={`bg-gradient-to-b from-[#919191] from-[2%] to-white to-[21%] bg-clip-text text-[14px] leading-none tracking-[-0.56px] text-transparent transition-[background-image,color] duration-300 group-hover:bg-none group-hover:text-[#919191] group-hover:leading-[1.5] ${fontVelaMedium}`}
        >
          {PLACEHOLDER_QUOTE}
        </p>
      </div>
      <Asset
        src="/team/quote-mark.svg"
        alt=""
        className="h-[15px] w-[15px] shrink-0 rotate-180 self-end opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
    </div>
  );
}

function NameBlock({ name, title }: Person) {
  return (
    <div className="flex w-full flex-col items-start gap-2">
      <p
        className={`w-full text-[38px] leading-[0.98] tracking-[-0.02em] text-[#161616] ${fontVelaGxBold}`}
      >
        {name}
      </p>
      <p
        className={`w-full text-[18px] leading-[1.2] tracking-[-0.04em] text-[#626262] ${fontVelaMedium}`}
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
const WIDE_CARD_HEIGHT = 288; // 224px photo + 32px padding top/bottom
const SQUARE_CARD_HEIGHT = 536; // 224px photo + 24px gap + 224px text + 64px padding

function WideCard({ person }: { person: Person }) {
  return (
    <div className="relative flex-1" style={{ height: WIDE_CARD_HEIGHT }}>
      <div className="group absolute left-1/2 top-1/2 z-0 w-full -translate-x-1/2 -translate-y-1/2 flex items-end gap-[24px] rounded-[16px] bg-[#f5f5f5] p-[32px] shadow-[0_0_0_rgba(0,0,0,0)] transition-[width,box-shadow] duration-300 hover:z-20 hover:w-[115%] hover:items-start hover:shadow-[0_24px_60px_-15px_rgba(0,0,0,0.25)]">
        <Asset
          src={person.photo}
          alt={person.name}
          fit="cover"
          className="h-[224px] w-[224px] shrink-0 overflow-hidden rounded-[8px]"
        />
        <div className="flex flex-1 flex-col items-start justify-between gap-[24px] self-stretch">
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
      <div className="group absolute left-1/2 top-1/2 z-0 w-full -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-[24px] rounded-[16px] bg-[#f5f5f5] p-[32px] shadow-[0_0_0_rgba(0,0,0,0)] transition-[width,box-shadow] duration-300 hover:z-20 hover:w-[115%] hover:shadow-[0_24px_60px_-15px_rgba(0,0,0,0.25)]">
        <Asset
          src={person.photo}
          alt={person.name}
          fit="cover"
          className="h-[224px] w-full shrink-0 overflow-hidden rounded-[8px]"
        />
        <div className="flex min-h-[224px] w-full flex-col items-start justify-between">
          <PlaceholderQuote />
          <NameBlock {...person} />
        </div>
      </div>
    </div>
  );
}

export default function Team() {
  return (
    <section className="relative z-10 mx-auto w-full max-w-[1440px] px-[80px] py-[100px]">
      <div className="flex flex-col items-start gap-[48px]">
        <p
          className={`w-[780px] max-w-full text-[#212121] ${fontVelaGxBold}`}
          style={{
            fontSize: "clamp(38px, 2.35vw, 47px)",
            lineHeight: 0.98,
            letterSpacing: "-0.02em",
          }}
        >
          Conomica — это люди. И мы с гордостью показываем тех, кто двигает
          нас вперёд
        </p>

        <div className="flex w-full flex-col items-start gap-[24px]">
          <div className="flex w-full items-center gap-[24px]">
            {LEADS.map((p) => (
              <WideCard key={p.name} person={p} />
            ))}
          </div>

          <div className="flex w-full items-start gap-[24px]">
            {TEAM.map((p) => (
              <SquareCard key={p.name} person={p} />
            ))}
          </div>

          <div className="flex w-full items-center gap-[24px]">
            {MANAGERS.map((p) => (
              <WideCard key={p.name} person={p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
