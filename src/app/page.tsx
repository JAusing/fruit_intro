import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import GlossPhoto from "@/components/gloss-photo";
import { fruits, getFruit, orbStyle } from "@/lib/fruits";
import { motion } from "@/lib/motion";

const terroir = [
  {
    title: "北回歸線穿島而過",
    text: "熱帶與亞熱帶在此交會，南北數百公里間，就能種出截然不同的果物。",
  },
  {
    title: "從海岸到高山",
    text: "平原、丘陵到中高海拔的果園，讓同一種水果也能錯開產季，延長賞味期。",
  },
  {
    title: "一代代的品種改良",
    text: "農改場與果農持續育種、嫁接，才有了金鑽鳳梨、鳳梨釋迦這些台灣原創品種。",
  },
];

const months = Array.from({ length: 12 }, (_, i) => i + 1);

const mango = getFruit("mango");
const lychee = getFruit("lychee");
const waxApple = getFruit("wax-apple");
const atemoya = getFruit("atemoya");
const banana = getFruit("banana");

export default function Home() {
  return (
    <div className="flex-1 bg-paper text-ink">
      <SiteHeader />

      {/* Hero */}
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-10 sm:px-8 sm:pb-24 sm:pt-16 md:grid-cols-12 md:gap-8 lg:gap-12 lg:pt-24">
        <div className="md:col-span-6 lg:col-span-7">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-persimmon">
            Formosa Fruit Almanac — 夏季號
          </p>
          <h1 style={motion({ "--shift": 40 })} className="hero-drift mt-6 font-serif text-[clamp(2.75rem,8vw,6.5rem)] font-black leading-[1.08] tracking-tight sm:mt-8">
            島嶼的甜，
            <br />
            是<span className="text-persimmon">陽光</span>
            <br />
            寫成的。
          </h1>
          <div className="mt-10 grid max-w-xl gap-3 border-t border-ink/15 pt-6 sm:mt-12 sm:grid-cols-[auto_1fr] sm:gap-6">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/50">Editor&apos;s note</span>
            <p className="leading-8 text-ink/75">
              從玉井的芒果到林邊的蓮霧，每一顆台灣水果都帶著產地的氣候與人的手藝。這本小誌，記錄它們的名字、故鄉與最好吃的季節。
            </p>
          </div>
        </div>

        {/* Aspect-ratio box so the photo composition scales instead of overlapping */}
        <div className="relative mx-auto aspect-[4/5] w-full max-w-md md:col-span-6 md:max-w-none lg:col-span-5">
          {/* Each layer drifts at its own speed on scroll: the smaller the fruit, the "closer" and faster it moves */}
          <span
            style={motion({ "--shift": 120 })}
            className="vertical hero-drift absolute right-0 top-0 font-serif text-xs tracking-[0.5em] text-ink/40 sm:text-sm sm:tracking-[0.6em]"
          >
            台灣水果誌・第一期
          </span>
          <GlossPhoto
            fruit={mango}
            preload
            sizes="(min-width: 768px) 28vw, 64vw"
            style={motion({ "--shift": -40 })}
            className="hero-drift absolute left-[8%] top-[6%] aspect-square w-[64%]"
          />
          <GlossPhoto
            fruit={atemoya}
            sizes="(min-width: 768px) 15vw, 34vw"
            style={motion({ "--shift": -150 })}
            className="hero-drift absolute right-[10%] top-[36%] aspect-square w-[34%] lg:top-[44%]"
          />
          <GlossPhoto
            fruit={lychee}
            sizes="(min-width: 768px) 9vw, 20vw"
            style={motion({ "--shift": -240 })}
            className="hero-drift absolute left-[2%] top-[46%] aspect-square w-[20%] lg:top-[58%]"
          />

          {/* Frosted caption card */}
          <figure
            style={motion({ "--shift": -90 })}
            className="hero-drift absolute bottom-0 left-[14%] w-[min(19rem,80%)] rounded-2xl border border-white/60 bg-white/30 p-4 shadow-[0_20px_50px_-20px_rgba(29,38,28,0.35),inset_0_1px_0_rgba(255,255,255,0.8)] backdrop-blur-xl sm:p-5"
          >
            <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-ink/55">
              <span>Cover</span>
              <span>No.{mango.no}</span>
            </div>
            <p className="mt-3 font-serif text-2xl font-semibold">{mango.name}</p>
            <p className="text-sm italic text-ink/60">{mango.en}</p>
            <dl className="mt-4 grid grid-cols-2 gap-2 border-t border-ink/10 pt-3 text-xs">
              <div>
                <dt className="text-ink/45">產地</dt>
                <dd className="mt-0.5 font-medium">{mango.origin}</dd>
              </div>
              <div>
                <dt className="text-ink/45">產季</dt>
                <dd className="mt-0.5 font-medium">{mango.seasonLabel}</dd>
              </div>
            </dl>
          </figure>
        </div>
      </section>

      {/* Index */}
      <section id="index" className="mx-auto max-w-7xl scroll-mt-20 px-4 pb-20 sm:px-8 sm:pb-28">
        <SectionHeading no="01" zh="果物索引" en="Index" />
        {/*
          Phone:   [photo | name, meta, note]
          Tablet:  [no | photo | name + note | origin/season stacked]
          Desktop: [no | photo | name | note | origin | season]
        */}
        <ol className="border-b border-ink/15">
          {fruits.map((f) => (
            <li
              key={f.no}
              className="reveal group grid grid-cols-[5.5rem_1fr] items-start gap-x-5 border-t border-ink/15 py-6 transition-colors hover:bg-white/40 sm:grid-cols-[2.5rem_6rem_1fr_8rem] sm:items-center sm:gap-x-6 sm:px-2 sm:py-7 lg:grid-cols-[3rem_7rem_1.2fr_1.6fr_9rem_6rem]"
            >
              <span className="font-mono text-xs text-ink/45 max-sm:hidden">{f.no}</span>
              {/* Wrapper carries the parallax so it doesn't collide with the hover translate/scale */}
              <div className="parallax" style={motion({ "--depth": 16 })}>
                <GlossPhoto
                  fruit={f}
                  sizes="112px"
                  className="relative aspect-square w-[5.5rem] transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-105 sm:w-24 lg:w-28"
                />
              </div>
              <div>
                <p className="font-serif text-2xl font-semibold sm:text-3xl">{f.name}</p>
                <p className="mt-1 text-sm italic text-ink/55">{f.en}</p>
                <p className="mt-2 flex flex-wrap gap-x-3 text-sm sm:hidden">
                  <span className="text-ink/70">{f.origin}</span>
                  <span className="font-mono text-persimmon">{f.seasonLabel}</span>
                </p>
                <p className="mt-2 text-sm leading-6 text-ink/65 lg:hidden">{f.note}</p>
              </div>
              <p className="text-[15px] leading-7 text-ink/70 max-lg:hidden">{f.note}</p>
              <div className="space-y-1 text-right max-sm:hidden lg:contents">
                <p className="text-sm text-ink/70 lg:text-left">
                  <span className="mr-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ink/40 max-lg:hidden">產地</span>
                  {f.origin}
                </p>
                <p className="font-mono text-sm text-persimmon">{f.seasonLabel}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Calendar */}
      <section id="calendar" className="relative scroll-mt-16 overflow-hidden bg-ink py-20 text-paper sm:py-28">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="parallax absolute -left-24 top-10 h-80 w-80 rounded-full opacity-70 blur-2xl" style={{ ...orbStyle(mango.color), ...motion({ "--depth": 140 }) }} />
          <div className="parallax absolute -right-16 bottom-0 h-96 w-96 rounded-full opacity-60 blur-2xl" style={{ ...orbStyle(lychee.color), ...motion({ "--depth": 80 }) }} />
          <div className="parallax absolute left-1/2 top-1/3 h-56 w-56 rounded-full opacity-50 blur-2xl" style={{ ...orbStyle(atemoya.color), ...motion({ "--depth": -120 }) }} />

          {/* Fruit spheres behind the glass panel — the panel's backdrop blur frosts whatever drifts under it */}
          <GlossPhoto
            fruit={atemoya}
            sizes="(min-width: 1024px) 288px, 128px"
            style={motion({ "--depth": 160 })}
            className="parallax absolute -right-12 top-32 aspect-square w-32 opacity-90 sm:right-[4%] sm:top-24 sm:w-56 lg:w-72"
          />
          <GlossPhoto
            fruit={waxApple}
            sizes="(min-width: 1024px) 240px, 144px"
            style={motion({ "--depth": -110 })}
            className="parallax absolute -left-12 bottom-[14%] aspect-square w-36 opacity-90 sm:w-48 lg:-left-8 lg:w-60"
          />
          <GlossPhoto
            fruit={banana}
            sizes="(min-width: 640px) 160px, 112px"
            style={motion({ "--depth": 220 })}
            className="parallax absolute -bottom-10 right-[22%] aspect-square w-28 opacity-90 max-sm:hidden sm:w-40"
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-8">
          {/* Foreground sphere above the panel: moves fastest, reads as nearest to the viewer */}
          <div aria-hidden className="pointer-events-none absolute right-4 top-6 z-10 sm:right-10 sm:top-2">
            <GlossPhoto
              fruit={lychee}
              sizes="112px"
              style={motion({ "--depth": 280 })}
              className="parallax relative aspect-square w-16 sm:w-24 lg:w-28"
            />
          </div>
          <SectionHeading no="02" zh="產季曆" en="Harvest Calendar" dark />
          <div className="reveal overflow-x-auto rounded-2xl border border-white/15 bg-white/[0.06] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] backdrop-blur-2xl sm:rounded-3xl sm:p-8 lg:p-10">
            <table className="w-full min-w-[300px] border-separate border-spacing-y-3 text-sm">
              <thead>
                <tr className="font-mono text-[10px] text-paper/50 sm:text-[11px]">
                  <th className="w-[5.5rem] text-left font-normal uppercase tracking-[0.2em] sm:w-36">Fruit</th>
                  {months.map((m) => (
                    <th key={m} className="font-normal">
                      {m}
                      <span className="max-sm:hidden">月</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {fruits.map((f) => (
                  <tr key={f.no}>
                    <td className="pr-2 font-serif text-[13px] sm:pr-4 sm:text-base">{f.name}</td>
                    {months.map((m) => {
                      const on = f.months.includes(m);
                      return (
                        <td key={m} className="px-px sm:px-0.5">
                          <div
                            className={`h-2.5 rounded-full sm:h-3 ${on ? "grow-x" : "bg-white/[0.07]"}`}
                            style={on ? { background: `linear-gradient(180deg, ${f.color[0]}, ${f.color[1]})`, boxShadow: `0 0 16px -2px ${f.color[1]}` } : undefined}
                            title={on ? `${f.name}・${m}月` : undefined}
                          />
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 text-xs text-paper/45">＊產季依品種、產地與當年氣候略有差異。</p>
        </div>
      </section>

      {/* Terroir */}
      <section id="terroir" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-20 sm:px-8 sm:py-28">
        <SectionHeading no="03" zh="風土" en="Terroir" />
        <div className="grid gap-12 sm:gap-16 lg:grid-cols-12">
          <blockquote style={motion({ "--depth": 30 })} className="parallax font-serif text-3xl font-semibold leading-snug sm:text-4xl lg:col-span-5">
            「一座島，
            <br />
            裝得下熱帶
            <br />
            與溫帶的果園。」
          </blockquote>
          <ol className="grid gap-8 sm:grid-cols-3 sm:gap-6 lg:col-span-7 lg:gap-10">
            {terroir.map((t, i) => (
              <li key={t.title} className="reveal border-t border-ink pt-5">
                <span className="font-mono text-xs text-persimmon">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 font-serif text-xl font-semibold">{t.title}</h3>
                <p className="mt-3 text-[15px] leading-7 text-ink/70">{t.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function SectionHeading({ no, zh, en, dark = false }: { no: string; zh: string; en: string; dark?: boolean }) {
  return (
    <div className={`reveal mb-8 flex flex-wrap items-baseline gap-x-4 gap-y-1 sm:mb-12 sm:gap-x-5 ${dark ? "text-paper" : ""}`}>
      <span className={`font-mono text-xs ${dark ? "text-paper/50" : "text-ink/45"}`}>{no}</span>
      <h2 className="font-serif text-3xl font-black sm:text-5xl">{zh}</h2>
      <span className={`text-sm italic ${dark ? "text-paper/50" : "text-ink/45"}`}>{en}</span>
    </div>
  );
}
