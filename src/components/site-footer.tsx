import NewsletterSignup from "@/components/newsletter-signup";
import { fruits } from "@/lib/fruits";

export default function SiteFooter() {
  return (
    <footer className="border-t border-ink/15">
      <NewsletterSignup />
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-12 sm:px-8 sm:py-14 md:flex-row md:items-end md:justify-between md:gap-10">
        <p className="slide-in font-serif text-[clamp(4rem,14vw,10rem)] font-black leading-none tracking-[0.05em]">島果誌</p>
        <div className="space-y-2 text-sm text-ink/60 md:text-right">
          <p>Formosa Fruit Almanac — Vol.01</p>
          <a href="mailto:hello@example.com" className="inline-block border-b border-ink/40 pb-0.5 text-ink transition-colors hover:border-persimmon hover:text-persimmon">
            hello@example.com
          </a>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/40">© 2026</p>
        </div>
      </div>
      <div className="mx-auto max-w-7xl border-t border-ink/10 px-4 py-6 text-[11px] leading-6 text-ink/45 sm:px-8">
        <span className="mr-2 font-mono uppercase tracking-[0.2em]">Photo credits</span>
        {fruits.map((f, i) => (
          <span key={f.no}>
            {f.name}：
            <a href={f.credit.source} target="_blank" rel="noopener noreferrer" className="underline decoration-ink/20 underline-offset-2 hover:text-persimmon">
              {f.credit.author}
            </a>
            （{f.credit.license}）
            {i < fruits.length - 1 && <span className="mx-2">/</span>}
          </span>
        ))}
        <span className="ml-1">・via Wikimedia Commons</span>
      </div>
    </footer>
  );
}
