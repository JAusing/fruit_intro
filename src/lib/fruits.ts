import type { CSSProperties } from "react";
import type { StaticImageData } from "next/image";

import mangoPhoto from "../../public/fruits/mango.jpg";
import pineapplePhoto from "../../public/fruits/pineapple.jpg";
import lycheePhoto from "../../public/fruits/lychee.jpg";
import waxApplePhoto from "../../public/fruits/wax-apple.jpg";
import atemoyaPhoto from "../../public/fruits/atemoya.jpg";
import bananaPhoto from "../../public/fruits/banana.jpg";

export type Fruit = {
  id: "mango" | "pineapple" | "lychee" | "wax-apple" | "atemoya" | "banana";
  no: string;
  name: string;
  en: string;
  origin: string;
  seasonLabel: string;
  months: number[];
  note: string;
  color: [light: string, base: string, dark: string];
  photo: StaticImageData;
  focus?: string;
  credit: { author: string; license: string; source: string };
};

export const fruits: Fruit[] = [
  {
    id: "mango",
    no: "01",
    name: "愛文芒果",
    en: "Irwin Mango",
    origin: "台南 玉井",
    seasonLabel: "5—8 月",
    months: [5, 6, 7, 8],
    note: "果皮由綠轉紅，香氣濃郁，是台灣夏天的代名詞。",
    color: ["#f7b538", "#e8742a", "#a83a1c"],
    photo: mangoPhoto,
    focus: "50% 60%",
    credit: { author: "Asit K. Ghosh", license: "CC BY-SA 3.0", source: "https://commons.wikimedia.org/wiki/File:Mango_Irwin_Asit_fs8.jpg" },
  },
  {
    id: "pineapple",
    no: "02",
    name: "金鑽鳳梨",
    en: "Tainung No.17 Pineapple",
    origin: "屏東・嘉義",
    seasonLabel: "3—7 月",
    months: [3, 4, 5, 6, 7],
    note: "低酸高甜、纖維細緻，連果心都能入口。",
    color: ["#f6dc72", "#e0a81e", "#94640f"],
    photo: pineapplePhoto,
    focus: "80% 30%",
    credit: { author: "Syced", license: "CC0", source: "https://commons.wikimedia.org/wiki/File:Taiwan_pineapples_at_upscale_supermarket_in_Tokyo.jpg" },
  },
  {
    id: "lychee",
    no: "03",
    name: "玉荷包荔枝",
    en: "Yu Her Pau Lychee",
    origin: "高雄 大樹",
    seasonLabel: "5—6 月",
    months: [5, 6],
    note: "核小肉厚，汁多清甜，產季只有短短一個多月。",
    color: ["#f49aaa", "#d63e5c", "#7f1832"],
    photo: lycheePhoto,
    credit: { author: "Mk2010", license: "CC BY-SA 3.0", source: "https://commons.wikimedia.org/wiki/File:Yu_Her_Pao_Lychee.jpg" },
  },
  {
    id: "wax-apple",
    no: "04",
    name: "黑珍珠蓮霧",
    en: "Black Pearl Wax Apple",
    origin: "屏東 林邊",
    seasonLabel: "12—4 月",
    months: [12, 1, 2, 3, 4],
    note: "海風與鹽分地孕育出深紅果色與爽脆口感。",
    color: ["#d0505f", "#8f1d2c", "#420a14"],
    photo: waxApplePhoto,
    focus: "40% 68%",
    credit: { author: "Allen Timothy Chang", license: "CC BY 2.5", source: "https://commons.wikimedia.org/wiki/File:Wax_apple1.jpg" },
  },
  {
    id: "atemoya",
    no: "05",
    name: "鳳梨釋迦",
    en: "Atemoya",
    origin: "台東",
    seasonLabel: "11—3 月",
    months: [11, 12, 1, 2, 3],
    note: "綿密中帶一絲微酸，台東冬日的限定風味。",
    color: ["#c6dda6", "#7fa560", "#3e5f33"],
    photo: atemoyaPhoto,
    credit: { author: "Takoradee", license: "CC BY 2.5", source: "https://commons.wikimedia.org/wiki/File:Annona_atemoya.jpg" },
  },
  {
    id: "banana",
    no: "06",
    name: "香蕉",
    en: "Cavendish Banana",
    origin: "高雄 旗山",
    seasonLabel: "全年",
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    note: "曾讓台灣贏得「香蕉王國」之名，四季不斷。",
    color: ["#f8e88a", "#e9c537", "#9d7c15"],
    photo: bananaPhoto,
    credit: { author: "Wilfredor", license: "CC0", source: "https://commons.wikimedia.org/wiki/File:Bunch_of_bananas_on_sale.jpg" },
  },
];

export function getFruit(id: Fruit["id"]): Fruit {
  const fruit = fruits.find((f) => f.id === id);
  if (!fruit) throw new Error(`Unknown fruit: ${id}`);
  return fruit;
}

/** A soft glossy colour sphere in the fruit's palette (used for blurred background orbs). */
export function orbStyle([light, base, dark]: Fruit["color"]): CSSProperties {
  return {
    background: `radial-gradient(circle at 32% 26%, rgba(255,255,255,0.95) 0 5%, ${light} 20%, ${base} 55%, ${dark} 100%)`,
  };
}
