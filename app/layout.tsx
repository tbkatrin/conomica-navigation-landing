import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Conomica — продукты группы компаний",
  description:
    "Навигация по продуктам группы компаний Conomica: инвестиционная платформа Conomica, Conomica-finance, сервис Rescore и лендинг для заёмщиков.",
  openGraph: {
    title: "Conomica — продукты группы компаний",
    description:
      "Навигация по продуктам группы компаний Conomica: инвестиционная платформа, работа с дебиторской задолженностью, проверка по ИНН.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A4028",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="ru" className={inter.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
