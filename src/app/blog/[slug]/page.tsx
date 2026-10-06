import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import GlossPhoto from "@/components/gloss-photo";
import ParallaxImage from "@/components/parallax-image";
import PostCard, { PostMeta } from "@/components/post-card";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { getFruit } from "@/lib/fruits";
import { getPost, posts, type Block } from "@/lib/posts";

// Only the three known articles exist; any other slug is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return { title: `${post.title}｜島果誌`, description: post.excerpt };
}

export default async function BlogPost({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const fruit = getFruit(post.fruitId);
  const others = posts.filter((p) => p.slug !== post.slug);

  return (
    <div className="flex-1 bg-paper text-ink">
      <SiteHeader />

      <main>
        {/* Title block */}
        <header className="mx-auto max-w-4xl px-4 pb-10 pt-10 text-center sm:px-8 sm:pb-14 sm:pt-16">
          <nav aria-label="麵包屑" className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/45">
            <Link href="/blog" className="transition-colors hover:text-persimmon">
              ← 專欄
            </Link>
          </nav>
          <PostMeta post={post} className="mt-8 justify-center" />
          <h1 className="mt-6 font-serif text-[clamp(2.25rem,6vw,4.25rem)] font-black leading-[1.15] tracking-tight">
            {post.title}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-ink/65 sm:text-xl sm:leading-9">{post.dek}</p>
          <p className="mt-6 text-sm text-ink/50">文／島果誌編輯部</p>
        </header>

        {/* Hero image with parallax window */}
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <ParallaxImage
            fruit={fruit}
            preload
            depth={60}
            sizes="(min-width: 1280px) 1216px, 100vw"
            className="aspect-[4/3] rounded-2xl sm:aspect-[16/9] sm:rounded-3xl lg:aspect-[21/9]"
          />
          <p className="mt-3 text-right text-[11px] text-ink/40">
            {fruit.name}・攝影 {fruit.credit.author}（{fruit.credit.license}）
          </p>
        </div>

        {/* Body + fact box */}
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-14 sm:px-8 sm:py-20 lg:grid-cols-12 lg:gap-8">
          <article className="lg:col-span-7 lg:col-start-2">
            {post.body.map((block, i) => (
              <ArticleBlock key={i} block={block} lead={i === 0} />
            ))}
          </article>

          <aside className="lg:col-span-3 lg:col-start-10">
            <div className="rounded-2xl border border-white/60 bg-white/35 p-6 shadow-[0_20px_50px_-24px_rgba(29,38,28,0.35),inset_0_1px_0_rgba(255,255,255,0.8)] backdrop-blur-xl lg:sticky lg:top-28">
              <div className="flex items-center gap-4">
                <GlossPhoto fruit={fruit} sizes="64px" className="relative aspect-square w-16 shrink-0" />
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/45">果物小檔案</p>
                  <p className="mt-1 font-serif text-xl font-black">{fruit.name}</p>
                  <p className="text-xs italic text-ink/50">{fruit.en}</p>
                </div>
              </div>
              <dl className="mt-6 space-y-4 border-t border-ink/10 pt-5 text-sm">
                {post.facts.map((f) => (
                  <div key={f.label} className="grid grid-cols-[3rem_1fr] gap-3">
                    <dt className="text-ink/45">{f.label}</dt>
                    <dd className="leading-6">{f.value}</dd>
                  </div>
                ))}
              </dl>
              <Link
                href="/#calendar"
                className="mt-6 inline-flex items-center gap-2 text-xs tracking-[0.15em] text-ink/60 transition-colors hover:text-persimmon"
              >
                查看完整產季曆 <span aria-hidden>→</span>
              </Link>
            </div>
          </aside>
        </div>

        {/* Keep reading */}
        <section aria-labelledby="more" className="border-t border-ink/15">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-8 sm:py-20">
            <div className="reveal mb-10 flex flex-wrap items-baseline justify-between gap-4">
              <h2 id="more" className="font-serif text-3xl font-black sm:text-4xl">
                繼續閱讀
              </h2>
              <Link href="/blog" className="text-sm tracking-[0.15em] text-ink/60 transition-colors hover:text-persimmon">
                所有文章 →
              </Link>
            </div>
            <div className="grid gap-12 md:grid-cols-2 md:gap-10 lg:gap-16">
              {others.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

function ArticleBlock({ block, lead }: { block: Block; lead: boolean }) {
  switch (block.type) {
    case "p":
      return lead ? (
        <p className="font-serif text-xl leading-10 text-ink sm:text-[1.4rem]">{block.text}</p>
      ) : (
        <p className="mt-6 text-[17px] leading-9 text-ink/80">{block.text}</p>
      );
    case "h2":
      return <h2 className="reveal mt-14 font-serif text-2xl font-black sm:text-3xl">{block.text}</h2>;
    case "quote":
      return (
        <blockquote className="reveal my-14 border-l-2 border-persimmon pl-6 font-serif text-2xl font-semibold leading-snug sm:pl-8 sm:text-3xl">
          「{block.text}」
        </blockquote>
      );
    case "list":
      return (
        <ol className="mt-6 space-y-4">
          {block.items.map((item, i) => (
            <li key={i} className="grid grid-cols-[2rem_1fr] gap-2 text-[17px] leading-8 text-ink/80">
              <span className="pt-1 font-mono text-xs text-persimmon">{String(i + 1).padStart(2, "0")}</span>
              {item}
            </li>
          ))}
        </ol>
      );
  }
}
