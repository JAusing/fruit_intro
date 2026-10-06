import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_TC, Noto_Serif_TC } from "next/font/google";
import LuckyDraw from "@/components/lucky-draw";
import WelcomeGate from "@/components/welcome-gate";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSerifTC = Noto_Serif_TC({
  variable: "--font-noto-serif-tc",
  weight: ["400", "600", "900"],
  subsets: ["latin"],
  preload: false,
});

const notoSansTC = Noto_Sans_TC({
  variable: "--font-noto-sans-tc",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  preload: false,
});

export const metadata: Metadata = {
  title: "島果誌｜Formosa Fruit Almanac",
  description: "一本關於台灣水果的小誌：產地、產季與風味。",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="zh-Hant"
      className={`${geistSans.variable} ${geistMono.variable} ${notoSerifTC.variable} ${notoSansTC.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <LuckyDraw />
        <WelcomeGate />
      </body>
    </html>
  );
}
