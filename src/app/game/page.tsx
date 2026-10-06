import type { Metadata } from "next";

import MangoCatch from "@/components/mango-catch";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";

export const metadata: Metadata = {
  title: "接芒果｜島果誌",
  description: "15 秒接芒果小遊戲，看看你能接到幾顆。",
};

export default function GamePage() {
  return (
    <div className="flex-1 bg-paper text-ink">
      <SiteHeader />

      <main className="mx-auto max-w-7xl px-4 sm:px-8">
        <header className="grid gap-6 border-b border-ink/15 pb-10 pt-12 sm:pb-14 sm:pt-20 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-persimmon">Mini Game — 小遊戲</p>
            <h1 className="mt-5 font-serif text-[clamp(3.5rem,10vw,7.5rem)] font-black leading-none tracking-tight">
              接芒果
            </h1>
          </div>
          <p className="max-w-md leading-8 text-ink/70 md:col-span-5 md:justify-self-end">
            夏天到了，芒果從樹上掉下來啦！15 秒內盡量接住，看看你能拿幾分。純屬娛樂，玩得開心就好。
          </p>
        </header>

        <section className="py-12 sm:py-16">
          <MangoCatch />
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
