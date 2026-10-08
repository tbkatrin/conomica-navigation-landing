"use client";

import { useEffect, useState } from "react";
import Asset from "../Asset";
import { fontVelaGxBold, fontVelaGxRegular } from "../fonts";

/**
 * Mobile top bar: logo on the left, burger on the right. Fixed to the top;
 * transparent over the hero, then a translucent white bar once the page is
 * scrolled. The burger opens a full-screen menu (Figma "Меню 390").
 */

const LINKS = [
  { label: "Бизнесу", href: "https://conomica.ru/creditors/" },
  { label: "Инвесторам", href: "https://conomica.ru/investors" },
  { label: "О нас", href: undefined },
];

function Logo() {
  return (
    <div className="flex items-center gap-[7px]">
      <Asset src="/hero/cone.svg" alt="" className="h-[29px] w-[26px]" />
      <div className="flex flex-col items-start gap-px">
        <Asset src="/hero/conomica-wordmark.svg" alt="Conomica" className="h-[19px] w-[112px]" />
        <p className={`text-[12px] leading-none text-[#161616] ${fontVelaGxRegular}`}>группа компаний</p>
      </div>
    </div>
  );
}

export default function MobileHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled ? "bg-[rgba(255,255,255,0.8)] backdrop-blur-[6px]" : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-4">
          <Logo />
          <button
            type="button"
            aria-label="Открыть меню"
            onClick={() => setOpen(true)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-[5px]"
          >
            <span className="h-[2px] w-6 rounded-full bg-[#191919]" />
            <span className="h-[2px] w-6 rounded-full bg-[#191919]" />
            <span className="h-[2px] w-6 rounded-full bg-[#191919]" />
          </button>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-[60] bg-white">
          <div className="flex items-center justify-between px-4 py-4">
            <Logo />
            <button
              type="button"
              aria-label="Закрыть меню"
              onClick={() => setOpen(false)}
              className="relative h-10 w-10"
            >
              <span className="absolute left-[7px] top-[19px] h-[2px] w-[26px] rotate-45 rounded-full bg-[#191919]" />
              <span className="absolute left-[7px] top-[19px] h-[2px] w-[26px] -rotate-45 rounded-full bg-[#191919]" />
            </button>
          </div>
          <nav className="flex flex-col gap-7 px-4 pt-8">
            {LINKS.map((l) => {
              const cls = `border-b border-[#D8D8D8] pb-3 text-left tm-h3 text-[#191919] ${fontVelaGxBold}`;
              return l.href ? (
                <a key={l.label} href={l.href} className={cls} onClick={() => setOpen(false)}>
                  {l.label}
                </a>
              ) : (
                <button key={l.label} type="button" className={cls} onClick={() => setOpen(false)}>
                  {l.label}
                </button>
              );
            })}
          </nav>
        </div>
      )}
    </>
  );
}
