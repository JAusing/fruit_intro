"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const DURATION = 15;
const BEST_KEY = "mango-catch-best";
const EMOJI_FONT = '"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif';

type Phase = "idle" | "playing" | "done";
type Drop = { x: number; y: number; vy: number; bug: boolean; angle: number; spin: number };
type Pop = { x: number; y: number; text: string; life: number; good: boolean };

// Best score lives in localStorage (falls back to memory when storage is blocked).
let bestMemo = 0;
const bestListeners = new Set<() => void>();

function readBest() {
  try {
    return Number(localStorage.getItem(BEST_KEY)) || bestMemo;
  } catch {
    return bestMemo;
  }
}

function saveBest(score: number) {
  bestMemo = score;
  try {
    localStorage.setItem(BEST_KEY, String(score));
  } catch {}
  bestListeners.forEach((cb) => cb());
}

function subscribeBest(cb: () => void) {
  bestListeners.add(cb);
  return () => bestListeners.delete(cb);
}

export default function MangoCatch() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(DURATION);
  const best = useSyncExternalStore(subscribeBest, readBest, () => 0);
  const [newBest, setNewBest] = useState(false);

  // Mutable game state — the rAF loop reads/writes these without re-rendering every frame.
  const game = useRef({
    w: 0,
    h: 0,
    basketX: 0,
    targetX: 0,
    drops: [] as Drop[],
    pops: [] as Pop[],
    keys: new Set<string>(),
    score: 0,
  });

  const draw = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const g = game.current;
    const dpr = window.devicePixelRatio || 1;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, g.w, g.h);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const item = Math.max(28, Math.min(44, g.w * 0.09));
    ctx.font = `${item}px ${EMOJI_FONT}`;
    for (const d of g.drops) {
      ctx.save();
      ctx.translate(d.x, d.y);
      ctx.rotate(d.angle);
      ctx.fillText(d.bug ? "🐛" : "🥭", 0, 0);
      ctx.restore();
    }

    const basket = item * 1.7;
    ctx.font = `${basket}px ${EMOJI_FONT}`;
    ctx.fillText("🧺", g.basketX, g.h - basket * 0.6);

    ctx.font = `700 ${item * 0.6}px ui-monospace, monospace`;
    for (const p of g.pops) {
      ctx.globalAlpha = Math.max(0, p.life);
      ctx.fillStyle = p.good ? "#d9532a" : "#1d261c";
      ctx.fillText(p.text, p.x, p.y);
    }
    ctx.globalAlpha = 1;
  };

  // Keep the canvas sharp and sized to its box.
  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ro = new ResizeObserver(() => {
      const g = game.current;
      const dpr = window.devicePixelRatio || 1;
      const ratio = g.w ? g.basketX / g.w : 0.5;
      g.w = wrap.clientWidth;
      g.h = wrap.clientHeight;
      canvas.width = g.w * dpr;
      canvas.height = g.h * dpr;
      g.basketX = g.targetX = ratio * g.w;
      draw();
    });
    ro.observe(wrap);
    return () => ro.disconnect();
  }, []);

  // Keyboard control.
  useEffect(() => {
    const keys = game.current.keys;
    const down = (e: KeyboardEvent) => {
      if (phase !== "playing" || !["ArrowLeft", "ArrowRight", "a", "d"].includes(e.key)) return;
      e.preventDefault();
      keys.add(e.key);
    };
    const up = (e: KeyboardEvent) => keys.delete(e.key);
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
      keys.clear();
    };
  }, [phase]);

  // Game loop.
  useEffect(() => {
    if (phase !== "playing") return;
    const g = game.current;
    let raf = 0;
    let last = performance.now();
    const start = last;
    let spawnIn = 0;
    let shownTime = DURATION;

    const loop = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const elapsed = (now - start) / 1000;
      const progress = Math.min(1, elapsed / DURATION);
      const item = Math.max(28, Math.min(44, g.w * 0.09));
      const basket = item * 1.7;

      // Spawn faster and fall harder as time runs out.
      spawnIn -= dt;
      if (spawnIn <= 0) {
        spawnIn = 0.65 - progress * 0.35;
        g.drops.push({
          x: item / 2 + Math.random() * (g.w - item),
          y: -item,
          vy: g.h * (0.35 + progress * 0.35 + Math.random() * 0.15),
          bug: Math.random() < 0.15,
          angle: Math.random() * Math.PI,
          spin: (Math.random() - 0.5) * 4,
        });
      }

      // Basket: keyboard nudges the target; the basket eases toward it.
      const step = g.w * 1.3 * dt;
      if (g.keys.has("ArrowLeft") || g.keys.has("a")) g.targetX -= step;
      if (g.keys.has("ArrowRight") || g.keys.has("d")) g.targetX += step;
      g.targetX = Math.max(basket / 2, Math.min(g.w - basket / 2, g.targetX));
      g.basketX += (g.targetX - g.basketX) * Math.min(1, dt * 18);

      const catchTop = g.h - basket * 0.95;
      const catchBottom = g.h - basket * 0.3;
      g.drops = g.drops.filter((d) => {
        d.y += d.vy * dt;
        d.angle += d.spin * dt;
        if (d.y >= catchTop && d.y <= catchBottom && Math.abs(d.x - g.basketX) < basket * 0.5) {
          const delta = d.bug ? -2 : 1;
          g.score = Math.max(0, g.score + delta);
          setScore(g.score);
          g.pops.push({ x: d.x, y: catchTop, text: delta > 0 ? "+1" : "-2", life: 1, good: delta > 0 });
          return false;
        }
        return d.y < g.h + item;
      });
      g.pops = g.pops.filter((p) => {
        p.y -= 40 * dt;
        p.life -= dt * 1.5;
        return p.life > 0;
      });

      draw();

      const left = Math.ceil(DURATION - elapsed);
      if (left !== shownTime) {
        shownTime = left;
        setTimeLeft(Math.max(0, left));
      }
      if (elapsed >= DURATION) {
        const isBest = g.score > readBest();
        if (isBest) saveBest(g.score);
        setNewBest(isBest);
        setPhase("done");
        return;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [phase]);

  const start = () => {
    const g = game.current;
    g.drops = [];
    g.pops = [];
    g.score = 0;
    g.basketX = g.targetX = g.w / 2;
    setScore(0);
    setTimeLeft(DURATION);
    setNewBest(false);
    setPhase("playing");
  };

  const aim = (e: React.PointerEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    game.current.targetX = e.clientX - rect.left;
  };

  return (
    <div className="mx-auto w-full max-w-xl">
      {/* Scoreboard */}
      <div className="flex items-end justify-between border-b border-ink/15 pb-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-ink/50">Score</p>
          <p className="font-serif text-4xl font-black tabular-nums text-persimmon">{score}</p>
        </div>
        <div className="text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-ink/50">Time</p>
          <p className={`font-mono text-3xl tabular-nums ${phase === "playing" && timeLeft <= 3 ? "text-persimmon" : ""}`}>
            {timeLeft}s
          </p>
        </div>
        <div className="text-right">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-ink/50">Best</p>
          <p className="font-serif text-4xl font-black tabular-nums">{best}</p>
        </div>
      </div>

      {/* Time bar */}
      <div className="mt-3 h-1 overflow-hidden rounded-full bg-ink/10">
        <div
          className="h-full bg-persimmon transition-[width] duration-1000 ease-linear"
          style={{ width: `${(timeLeft / DURATION) * 100}%` }}
        />
      </div>

      {/* Playfield */}
      <div
        ref={wrapRef}
        className="relative mt-5 aspect-[4/5] w-full touch-none select-none overflow-hidden rounded-3xl border border-ink/15 bg-gradient-to-b from-[#fbe9c6] to-paper sm:aspect-[5/6]"
        onPointerDown={aim}
        onPointerMove={aim}
      >
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />

        {phase !== "playing" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-paper/70 px-6 text-center backdrop-blur-sm">
            {phase === "idle" ? (
              <>
                <p className="text-6xl" aria-hidden>
                  🥭
                </p>
                <h2 className="mt-4 font-serif text-3xl font-black">接芒果！</h2>
                <p className="mt-3 leading-7 text-ink/70">
                  移動滑鼠、手指滑動，或用 ← → 鍵控制籃子。
                  <br />
                  🥭 +1 分，小心 🐛 會扣 2 分！
                </p>
              </>
            ) : (
              <div aria-live="polite">
                <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-persimmon">Time&apos;s up</p>
                <p className="mt-3 font-serif text-2xl font-black">你接到了</p>
                <p className="font-serif text-7xl font-black text-persimmon tabular-nums">{score}</p>
                <p className="mt-2 text-ink/70">{newBest ? "🎉 新紀錄！" : `最佳紀錄 ${best} 分`}</p>
              </div>
            )}
            <button
              type="button"
              onClick={start}
              className="mt-6 rounded-full bg-ink px-8 py-3 text-sm tracking-[0.15em] text-paper transition-colors hover:bg-persimmon"
            >
              {phase === "idle" ? `開始遊戲（${DURATION} 秒）` : "再玩一次"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
