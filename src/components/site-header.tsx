"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useVisitorName } from "@/lib/visitor";

// Section links are absolute ("/#index") so they also work from /blog pages.
const links = [
  { href: "/#index", zh: "果物索引", en: "Index" },
  { href: "/#calendar", zh: "產季曆", en: "Harvest Calendar" },
  { href: "/#terroir", zh: "風土", en: "Terroir" },
  { href: "/blog", zh: "專欄", en: "Journal" },
  { href: "/game", zh: "小遊戲", en: "Mini Game" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const visitor = useVisitorName();
  const isActive = (href: string) => !href.includes("#") && pathname.startsWith(href);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    // Close if the viewport grows to desktop, where the inline nav takes over.
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onResize = () => desktop.matches && setOpen(false);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onResize);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onResize);
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-ink/15 bg-paper/75 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-8 lg:py-5">
          <Link href="/" onClick={() => setOpen(false)} className="font-serif text-xl font-black tracking-[0.2em]">
            島果誌
          </Link>

          {/* Desktop nav */}
          <nav className="flex gap-8 text-[13px] tracking-[0.15em] text-ink/70 max-lg:hidden">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                aria-current={isActive(l.href) ? "page" : undefined}
                className={`transition-colors hover:text-persimmon ${isActive(l.href) ? "text-persimmon" : ""}`}
              >
                {l.zh}
              </Link>
            ))}
          </nav>
          {visitor ? (
            <p className="ml-auto mr-3 max-w-[12rem] truncate text-sm text-ink/70 lg:m-0">
              歡迎，<span className="font-serif font-semibold text-persimmon">{visitor}</span> 👋
            </p>
          ) : (
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/50 max-lg:hidden">
              Vol.01 / 2026
            </span>
          )}

          {/* Hamburger (phone + tablet) */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "關閉選單" : "開啟選單"}
            className="relative -mr-2 flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-ink/5 lg:hidden"
          >
            <span
              className={`absolute h-px w-6 bg-ink transition-transform duration-300 ${open ? "rotate-45" : "-translate-y-[4px]"}`}
            />
            <span
              className={`absolute h-px w-6 bg-ink transition-transform duration-300 ${open ? "-rotate-45" : "translate-y-[4px]"}`}
            />
          </button>
        </div>
      </header>

      {/* Full-screen frosted menu — kept outside <header>: its backdrop-filter would trap position:fixed */}
      <div
        id="mobile-menu"
        inert={!open}
        className={`fixed inset-x-0 bottom-0 top-[4.5rem] z-30 bg-paper/85 backdrop-blur-2xl transition-[opacity,visibility] duration-300 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <nav className="mx-auto flex h-full max-w-7xl flex-col overflow-y-auto px-4 pb-10 pt-6 sm:px-8">
          <ol>
            {links.map((l, i) => (
              <li
                key={l.href}
                className={`border-b border-ink/15 transition-[opacity,transform] duration-500 ${
                  open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                }`}
                style={{ transitionDelay: open ? `${80 + i * 60}ms` : "0ms" }}
              >
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(l.href) ? "page" : undefined}
                  className="group flex items-baseline gap-5 py-6 sm:py-8"
                >
                  <span className="font-mono text-xs text-ink/45">{String(i + 1).padStart(2, "0")}</span>
                  <span
                    className={`font-serif text-4xl font-black transition-colors group-hover:text-persimmon sm:text-5xl ${
                      isActive(l.href) ? "text-persimmon" : ""
                    }`}
                  >
                    {l.zh}
                  </span>
                  <span className="ml-auto text-sm italic text-ink/45">{l.en}</span>
                </Link>
              </li>
            ))}
          </ol>
          <p className="mt-auto pt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-ink/45">
            Formosa Fruit Almanac — Vol.01 / 2026
          </p>
        </nav>
      </div>
    </>
  );
}
