import Link from "next/link";

import ParallaxImage from "@/components/parallax-image";
import { getFruit } from "@/lib/fruits";
import { formatDate, type Post } from "@/lib/posts";

export function PostMeta({ post, className = "" }: { post: Post; className?: string }) {
  return (
    <p className={`flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.18em] text-ink/50 ${className}`}>
      <span className="text-persimmon">{post.category}</span>
      <span aria-hidden>／</span>
      <time dateTime={post.date}>{formatDate(post.date)}</time>
      <span aria-hidden>／</span>
      <span>閱讀 {post.readMinutes} 分鐘</span>
    </p>
  );
}

/** Grid card used on /blog and in "繼續閱讀". */
export default function PostCard({ post }: { post: Post }) {
  const fruit = getFruit(post.fruitId);
  return (
    <article className="reveal group">
      <Link href={`/blog/${post.slug}`} className="block">
        <ParallaxImage
          fruit={fruit}
          depth={24}
          sizes="(min-width: 768px) 45vw, 100vw"
          className="aspect-[3/2] rounded-2xl transition-transform duration-500 group-hover:-translate-y-1"
        />
        <PostMeta post={post} className="mt-5" />
        <h3 className="mt-3 font-serif text-2xl font-black leading-snug transition-colors group-hover:text-persimmon sm:text-[1.7rem]">
          {post.title}
        </h3>
        <p className="mt-3 leading-7 text-ink/65">{post.excerpt}</p>
      </Link>
    </article>
  );
}
