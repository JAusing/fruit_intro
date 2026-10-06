import type { CSSProperties } from "react";
import Image from "next/image";

import type { Fruit } from "@/lib/fruits";

/**
 * A round photo with a glass-sphere highlight laid over it.
 * `className` must include a position utility (`relative` or `absolute`) for the `fill` image.
 */
export default function GlossPhoto({
  fruit,
  sizes,
  className = "",
  style,
  preload = false,
}: {
  fruit: Fruit;
  sizes: string;
  className?: string;
  style?: CSSProperties;
  preload?: boolean;
}) {
  return (
    <div
      className={`overflow-hidden rounded-full ${className}`}
      style={{ boxShadow: `0 40px 60px -30px ${fruit.color[2]}`, ...style }}
    >
      <Image
        src={fruit.photo}
        alt={`${fruit.name}（${fruit.en}）`}
        fill
        sizes={sizes}
        placeholder="blur"
        preload={preload}
        className="object-cover"
        style={{ objectPosition: fruit.focus ?? "50% 50%" }}
      />
      <span
        aria-hidden
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(ellipse 60% 45% at 32% 18%, rgba(255,255,255,0.55), rgba(255,255,255,0) 70%), radial-gradient(circle at 70% 85%, rgba(0,0,0,0.28), rgba(0,0,0,0) 55%)",
          boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.45), inset 0 2px 6px rgba(255,255,255,0.6)",
        }}
      />
    </div>
  );
}
