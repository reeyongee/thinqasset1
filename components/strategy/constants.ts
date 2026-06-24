import { STRATEGY_COPY } from "@/content/thinqasset";

export const STRATEGY_CDN =
  "https://cdn.prod.website-files.com/68359b057989673b79f2f2ce";

function buildCardImage(baseName: string) {
  const avif = `${STRATEGY_CDN}/${baseName}.avif`;
  const srcSet = [
    `${STRATEGY_CDN}/${baseName}-p-500.avif 500w`,
    `${STRATEGY_CDN}/${baseName}-p-800.avif 800w`,
    `${STRATEGY_CDN}/${baseName}-p-1080.avif 1080w`,
    `${avif} 1186w`,
  ].join(", ");
  return { avif, srcSet };
}

export const STRATEGY_BODY_LINES = STRATEGY_COPY.bodyLines;

export const STRATEGY_BODY_BREAK_AFTER = STRATEGY_COPY.bodyBreakAfter;

export const STRATEGY_HEADING = {
  line1: STRATEGY_COPY.headingLine1,
  line2: STRATEGY_COPY.headingLine2,
} as const;

export const SOLUTIONS_HEADING = STRATEGY_COPY.solutionsHeading;

const CARD_IMAGES = [
  {
    defaultImage: buildCardImage(
      "684ad8296057358965a92c09_c0c0c07a37fb358981f16eab62190e7d_3-1",
    ),
    hoverImage: buildCardImage("684ad82935c959def9e8b983_3-2"),
  },
  {
    defaultImage: buildCardImage(
      "684ad829e72356ddf9a2f50c_bf3777a62711bf2949da3d22f71e8f25_2-1",
    ),
    hoverImage: buildCardImage("684ad8298203777d80fb5939_2-2"),
  },
  {
    defaultImage: buildCardImage(
      "684ad82969185d8a8730547d_35061f01a2516f2418e63ce060692f8b_1-1",
    ),
    hoverImage: buildCardImage("684ad829af9630ad465997ff_1-2"),
  },
  {
    defaultImage: buildCardImage(
      "684ad8293365b17c38502452_2c3ff5f53a3ceda4d3385846b59bdae8_5-1",
    ),
    hoverImage: buildCardImage("684ad8298352153310fc5d46_5-2"),
  },
  {
    defaultImage: buildCardImage(
      "684ad829ed35d19d5efb995c_313625372d4e6332cfe0429e39804b91_4-1",
    ),
    hoverImage: buildCardImage("684ad82992c1c6e7bf813ea7_4-2"),
  },
] as const;

export const SOLUTION_CARDS = STRATEGY_COPY.cards.map((card, index) => ({
  title: card.title,
  href: card.href,
  offset: "offset" in card ? card.offset : false,
  defaultImage: CARD_IMAGES[index].defaultImage,
  hoverImage: CARD_IMAGES[index].hoverImage,
}));
