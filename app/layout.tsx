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

// Brand font: one variable file ("Vela Sans GX", weight axis 200–800) that
// serves every weight the site uses — Regular, Medium, Bold, ExtraBold — as
// real cuts instead of a faux-emboldened Regular. Both brand family names
// (Vela Sans and Vela Sans GX) resolve to it, see globals.css.
const velaSans = localFont({
  src: "./fonts/VelaSans-GX.woff2",
  variable: "--font-vela-sans-file",
  weight: "200 800",
  style: "normal",
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
