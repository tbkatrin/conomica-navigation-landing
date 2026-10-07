"use client";

import { useEffect, useRef, useState } from "react";
import Asset from "../Asset";
import { facts } from "../Facts";
import { fontVelaGxBold, fontVelaMedium } from "../fonts";
import { SHADOW } from "./shared";

/** Mobile "Факты о нас": a swipeable scroll-snap row of cards with a dot
 * indicator, instead of the desktop's fanned circular carousel. */

export default function MobileFacts() {
  const rowRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    const onScroll = () => {
      const card = row.firstElementChild as HTMLElement | null;
      if (!card) return;
      const step = card.offsetWidth + 12;
      setActive(Math.max(0, Math.min(facts.length - 1, Math.round(row.scrollLeft / step))));
    };
    row.addEventListener("scroll", onScroll, { passive: true });
    return () => row.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (i: number) => {
    const row = rowRef.current;
    const card = row?.children[i] as HTMLElement | undefined;
    if (row && card) row.scrollTo({ left: card.offsetLeft - row.offsetLeft - 20, behavior: "smooth" });
  };

  return (
    <section className="px-4 pb-4">
      <div className="rounded-[24px] bg-white py-8">
        <h2 className={`px-5 pb-6 text-[38px] leading-[0.98] tracking-[-0.03em] text-[#161616] ${fontVelaGxBold}`}>
          Факты о нас
        </h2>

        <div
          ref={rowRef}
          className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {facts.map((f) => (
            <div
              key={f.id}
              className={`flex w-[280px] shrink-0 snap-start scroll-ml-5 flex-col gap-4 rounded-[24px] bg-[#f5f5f5] p-6 ${SHADOW}`}
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-[12px] bg-white">
                <Asset src="/hero/cone.svg" alt="" className="h-[30px] w-[27px]" />
              </div>
              <p className={`text-[28px] leading-[0.95] tracking-[-0.03em] text-[#191919] ${fontVelaGxBold}`}>{f.title}</p>
              <p className={`text-[18px] leading-[1.1] tracking-[-0.04em] text-[#626262] ${fontVelaMedium}`}>
                {f.description}
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-2">
          {facts.map((f, i) => (
            <button
              key={f.id}
              type="button"
              aria-label={`Факт ${i + 1}`}
              onClick={() => goTo(i)}
              className={`h-2 rounded-full transition-all ${i === active ? "w-6 bg-[#00703E]" : "w-2 bg-[#D8D8D8]"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
