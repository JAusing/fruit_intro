"use client";

import { useEffect, useRef, useState } from "react";

import GlossPhoto from "@/components/gloss-photo";
import { fruits } from "@/lib/fruits";

const WIN_RATE = 0.1;
const SPIN_MS = 1800;

type Result = { win: boolean; code?: string };
type Phase = "idle" | "spinning" | "done";

function makeCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const rand = Array.from(crypto.getRandomValues(new Uint32Array(6)), (n) => chars[n % chars.length]).join("");
  return `FRUIT90-${rand}`;
}

export default function LuckyDraw() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [result, setResult] = useState<Result | null>(null);
  const [face, setFace] = useState(0);
  const [copied, setCopied] = useState(false);

  // Shuffle through the fruit photos while spinning.
  useEffect(() => {
    if (phase !== "spinning") return;
    const tick = setInterval(() => setFace((i) => (i + 1) % fruits.length), 90);
    return () => clearInterval(tick);
  }, [phase]);

  const open = () => {
    setResult(null);
    setPhase("idle");
    dialogRef.current?.showModal();
  };

  const draw = () => {
    setPhase("spinning");
    setCopied(false);
    setTimeout(() => {
      const win = Math.random() < WIN_RATE;
      setResult({ win, code: win ? makeCode() : undefined });
      setPhase("done");
    }, SPIN_MS);
  };

  const againButton = (
    <button
      type="button"
      onClick={draw}
      className="mt-4 rounded-full border border-ink/25 px-6 py-2.5 text-sm tracking-[0.1em] transition-colors hover:border-persimmon hover:text-persimmon"
    >
      再抽一次
    </button>
  );

  const copy = async () => {
    if (!result?.code) return;
    try {
      await navigator.clipboard.writeText(result.code);
      setCopied(true);
    } catch {}
  };

  const fruit = fruits[phase === "done" && result?.win ? 0 : face];

  return (
    <>
      <button
        type="button"
        onClick={open}
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-persimmon px-5 py-3 text-sm font-medium tracking-[0.1em] text-paper shadow-[0_16px_40px_-12px_rgba(217,83,42,0.7)] transition-transform hover:-translate-y-0.5 sm:bottom-8 sm:right-8"
      >
        <span aria-hidden>🎁</span>
        抽水果優惠券
      </button>

      <dialog
        ref={dialogRef}
        onClick={(e) => e.target === e.currentTarget && phase !== "spinning" && dialogRef.current?.close()}
        onCancel={(e) => phase === "spinning" && e.preventDefault()}
        aria-labelledby="lucky-draw-title"
        className="lucky-draw m-auto w-[min(26rem,calc(100%-2rem))] rounded-3xl bg-paper p-0 text-ink shadow-[0_40px_80px_-30px_rgba(29,38,28,0.6)]"
      >
        <div className="relative p-6 text-center sm:p-8">
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            disabled={phase === "spinning"}
            aria-label="關閉"
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full text-xl text-ink/50 transition-colors hover:bg-ink/5 disabled:opacity-30"
          >
            ×
          </button>

          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-persimmon">Lucky Draw</p>
          <h2 id="lucky-draw-title" className="mt-3 font-serif text-3xl font-black">
            水果抽獎
          </h2>

          <div className="mx-auto mt-6 w-40">
            <GlossPhoto
              key={phase === "spinning" ? "spin" : fruit.id}
              fruit={fruit}
              sizes="160px"
              className={`relative aspect-square w-full ${phase === "spinning" ? "animate-pulse" : ""}`}
            />
          </div>

          <div aria-live="polite" className="mt-6 min-h-[8.5rem]">
            {phase === "idle" && (
              <>
                <p className="leading-7 text-ink/70">
                  每次抽獎都有<span className="font-semibold text-persimmon">10%</span> 機率抽中
                  <br />
                  全站水果 <span className="font-semibold">9 折優惠券</span>！
                </p>
                <button
                  type="button"
                  onClick={draw}
                  className="mt-5 rounded-full bg-ink px-8 py-3 text-sm tracking-[0.15em] text-paper transition-colors hover:bg-persimmon"
                >
                  開始抽獎
                </button>
              </>
            )}

            {phase === "spinning" && <p className="pt-4 font-serif text-xl text-ink/70">抽獎中⋯⋯</p>}

            {phase === "done" && result?.win && (
              <>
                <p className="font-serif text-2xl font-black text-persimmon">🎉 恭喜中獎！</p>
                <div className="mx-auto mt-4 max-w-xs rounded-2xl border-2 border-dashed border-persimmon/60 bg-white/60 px-4 py-3">
                  <p className="text-sm text-ink/60">水果 9 折優惠券</p>
                  <p className="mt-1 font-mono text-lg font-semibold tracking-[0.15em]">{result.code}</p>
                </div>
                <div className="flex flex-wrap justify-center gap-x-3">
                  <button
                    type="button"
                    onClick={copy}
                    className="mt-4 rounded-full bg-ink px-6 py-2.5 text-sm tracking-[0.1em] text-paper transition-colors hover:bg-persimmon"
                  >
                    {copied ? "已複製 ✓" : "複製優惠碼"}
                  </button>
                  {againButton}
                </div>
              </>
            )}

            {phase === "done" && result && !result.win && (
              <>
                <p className="font-serif text-2xl font-black">差一點點！</p>
                <p className="mt-3 leading-7 text-ink/65">
                  這次沒有抽中優惠券，
                  <br />
                  再試一次手氣吧 🍍
                </p>
                {againButton}
              </>
            )}
          </div>
        </div>
      </dialog>
    </>
  );
}
