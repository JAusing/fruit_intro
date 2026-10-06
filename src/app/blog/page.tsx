import type { Metadata } from "next";
import Link from "next/link";

import ParallaxImage from "@/components/parallax-image";
import PostCard, { PostMeta } from "@/components/post-card";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { getFruit } from "@/lib/fruits";
import { posts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "專欄｜島果誌",
  description: "關於台灣水果的產地故事、品種身世與挑選保存的小知識。",
};

export default function BlogIndex() {
  const [featured, ...rest] = posts;
  const featuredFruit = getFruit(featured.fruitId);

  return (
    <div className="flex-1 bg-paper text-ink">
      <SiteHeader />

      <main className="mx-auto max-w-7xl px-4 sm:px-8">
        {/* Masthead */}
        <header className="grid gap-6 border-b border-ink/15 pb-10 pt-12 sm:pb-14 sm:pt-20 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-persimmon">Journal — 果物專欄</p>
            <h1 className="mt-5 font-serif text-[clamp(3.5rem,10vw,7.5rem)] font-black leading-none tracking-tight">專欄</h1>
          </div>
          <p className="max-w-md leading-8 text-ink/70 md:col-span-5 md:justify-self-end">
            走進果園與產地，記錄每一種台灣水果的身世、風土，以及把它吃得剛剛好的小知識。
          </p>
        </header>

        {/* Featured */}
        <article className="group grid gap-8 border-b border-ink/15 py-12 sm:py-16 lg:grid-cols-12 lg:items-center lg:gap-12">
          <Link href={`/blog/${featured.slug}`} className="block lg:col-span-7" tabIndex={-1} aria-hidden>
            <ParallaxImage
              fruit={featuredFruit}
              preload
              depth={50}
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="aspect-[4/3] rounded-3xl"
            />
          </Link>
          <div className="lg:col-span-5">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white/40 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-ink/60 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-persimmon" />
              最新一篇
            </p>
            <PostMeta post={featured} />
            <h2 className="mt-4 font-serif text-3xl font-black leading-tight sm:text-4xl lg:text-[2.75rem]">
              <Link href={`/blog/${featured.slug}`} className="transition-colors group-hover:text-persimmon">
                {featured.title}
              </Link>
            </h2>
            <p className="mt-5 text-lg leading-8 text-ink/70">{featured.dek}</p>
            <Link
              href={`/blog/${featured.slug}`}
              className="mt-8 inline-flex items-center gap-3 border-b border-ink pb-1 text-sm tracking-[0.15em] transition-colors hover:border-persimmon hover:text-persimmon"
            >
              閱讀全文 <span aria-hidden>→</span>
            </Link>
          </div>
        </article>

        {/* The rest */}
        <section aria-label="更多文章" className="grid gap-12 py-12 sm:py-16 md:grid-cols-2 md:gap-10 lg:gap-16">
          {rest.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
