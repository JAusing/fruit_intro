"use client";

import { useState } from "react";

export default function NewsletterSignup() {
  const [sent, setSent] = useState(false);

  // Nothing is stored yet — just acknowledge the visitor.
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="mx-auto grid max-w-7xl gap-6 border-b border-ink/10 px-4 py-12 sm:px-8 sm:py-14 md:grid-cols-12 md:items-end md:gap-10">
      <div className="md:col-span-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-persimmon">Newsletter — 訂閱果誌</p>
        <h2 className="mt-4 font-serif text-3xl font-black leading-tight sm:text-4xl">對台灣水果有興趣嗎？</h2>
        <p className="mt-3 max-w-md leading-7 text-ink/70">留下你的 email，我們會把每一期的產季消息與果物故事寄給你。</p>
      </div>

      <div className="md:col-span-6" aria-live="polite">
        {sent ? (
          <p className="font-serif text-2xl font-black text-persimmon md:text-right">🥭 感謝訂閱，請等待好消息！</p>
        ) : (
          <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row">
            <label htmlFor="newsletter-email" className="sr-only">
              Email
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              className="min-w-0 flex-1 rounded-full border border-ink/25 bg-white/50 px-5 py-3 text-ink placeholder:text-ink/35 focus:border-persimmon focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-full bg-ink px-8 py-3 text-sm tracking-[0.15em] text-paper transition-colors hover:bg-persimmon"
            >
              訂閱
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
