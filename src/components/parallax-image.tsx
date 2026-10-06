import Image from "next/image";

import type { Fruit } from "@/lib/fruits";
import { motion } from "@/lib/motion";

/**
 * A clipped photo whose image layer is taller than its frame and drifts on scroll
 * (the classic parallax "window"), finished with a glass sheen on top.
 * Give it an aspect ratio / size via `className`.
 */
export default function ParallaxImage({
  fruit,
  sizes,
  className = "",
  depth = 40,
  preload = false,
}: {
  fruit: Fruit;
  sizes: string;
  className?: string;
  depth?: number;
  preload?: boolean;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Extra height (inset -12%) gives the image room to move without exposing edges */}
      <div className="parallax absolute inset-x-0 -inset-y-[12%]" style={motion({ "--depth": depth })}>
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
      </div>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: "linear-gradient(160deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0) 38%), linear-gradient(0deg, rgba(29,38,28,0.25), rgba(29,38,28,0) 45%)",
          boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.35)",
        }}
      />
    </div>
  );
}
