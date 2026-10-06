"use client";

import { type FormEvent, useEffect, useRef, useState } from "react";

import { setVisitorName, useVisitorName } from "@/lib/visitor";

export default function WelcomeGate() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const name = useVisitorName();
  const [draft, setDraft] = useState("");

  // Ask once, on the first visit (name === "" means hydrated and nothing stored).
  useEffect(() => {
    if (name === "" && !dialogRef.current?.open) dialogRef.current?.showModal();
  }, [name]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = draft.trim();
    if (!trimmed) return;
    setVisitorName(trimmed);
    dialogRef.current?.close();
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="welcome-title"
      className="lucky-draw m-auto w-[min(26rem,calc(100%-2rem))] rounded-3xl bg-paper p-0 text-ink shadow-[0_40px_80px_-30px_rgba(29,38,28,0.6)]"
    >
      <form onSubmit={submit} className="relative p-6 text-center sm:p-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-persimmon">Welcome</p>
        <h2 id="welcome-title" className="mt-3 font-serif text-3xl font-black">
          歡迎來到島果誌
        </h2>
        <p className="mt-4 leading-7 text-ink/70">翻開這本水果小誌之前，該怎麼稱呼你呢？</p>

        <label htmlFor="visitor-name" className="sr-only">
          你的稱呼
        </label>
        <input
          id="visitor-name"
          autoFocus
          required
          maxLength={20}
          autoComplete="nickname"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="例如：阿芒"
          className="mt-6 w-full rounded-full border border-ink/25 bg-white/60 px-5 py-3 text-center outline-none transition-colors focus:border-persimmon"
        />

        <button
          type="submit"
          disabled={!draft.trim()}
          className="mt-5 rounded-full bg-ink px-8 py-3 text-sm tracking-[0.15em] text-paper transition-colors hover:bg-persimmon disabled:opacity-40 disabled:hover:bg-ink"
        >
          進入網站
        </button>
      </form>
    </dialog>
  );
}
