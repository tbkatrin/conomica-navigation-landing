import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import Loader from "@/components/Loader";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Real brand font (Regular only — see globals.css for the "Vela Sans GX"
// heading family, which still has no font file and falls back to system
// sans-serif). font-weight classes heavier than 400 (font-medium,
// font-bold) fake-embolden this single file rather than using a real
// matching weight, since only Regular was provided.
const velaSans = localFont({
  src: "./fonts/VelaSans-Regular.ttf",
  variable: "--font-vela-sans-file",
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Arkkhe Landing",
  description: "Landing page",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ru"
      className={`${geistSans.variable} ${geistMono.variable} ${velaSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F5F5F5] text-[#161616]">
        <Loader />
        {children}
      </body>
    </html>
  );
}
