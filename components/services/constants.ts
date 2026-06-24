import { BRAND_ASSETS, SERVICES_COPY } from "@/content/thinqasset";

export const SERVICES_CDN =
  "https://cdn.prod.website-files.com/68359b057989673b79f2f2ce";

export const SERVICE_IMAGES = [
  {
    id: "brain",
    avif: `${SERVICES_CDN}/684033cc134b072c5218b84e_1.avif`,
    srcSet: [
      `${SERVICES_CDN}/684033cc134b072c5218b84e_1-p-500.avif 500w`,
      `${SERVICES_CDN}/684033cc134b072c5218b84e_1-p-800.avif 800w`,
      `${SERVICES_CDN}/684033cc134b072c5218b84e_1-p-1080.avif 1080w`,
      `${SERVICES_CDN}/684033cc134b072c5218b84e_1.avif 1714w`,
    ].join(", "),
  },
  {
    id: "nerves",
    avif: `${SERVICES_CDN}/684033cca50cbbe30f886b27_2.avif`,
    srcSet: [
      `${SERVICES_CDN}/684033cca50cbbe30f886b27_2-p-500.avif 500w`,
      `${SERVICES_CDN}/684033cca50cbbe30f886b27_2-p-800.avif 800w`,
      `${SERVICES_CDN}/684033cca50cbbe30f886b27_2.avif 1714w`,
    ].join(", "),
  },
  {
    id: "lungs",
    avif: `${SERVICES_CDN}/684033cd27d2c79afac51e5e_3.avif`,
    srcSet: [
      `${SERVICES_CDN}/684033cd27d2c79afac51e5e_3-p-500.avif 500w`,
      `${SERVICES_CDN}/684033cd27d2c79afac51e5e_3-p-800.avif 800w`,
      `${SERVICES_CDN}/684033cd27d2c79afac51e5e_3.avif 1714w`,
    ].join(", "),
  },
  {
    id: "lymphs",
    avif: `${SERVICES_CDN}/684033cc8d5b68a3bde98b17_4.avif`,
    srcSet: [
      `${SERVICES_CDN}/684033cc8d5b68a3bde98b17_4-p-500.avif 500w`,
      `${SERVICES_CDN}/684033cc8d5b68a3bde98b17_4-p-800.avif 800w`,
      `${SERVICES_CDN}/684033cc8d5b68a3bde98b17_4.avif 1714w`,
    ].join(", "),
  },
  {
    id: "heart",
    avif: `${SERVICES_CDN}/684033ccb554afa6a516846f_5.avif`,
    srcSet: [
      `${SERVICES_CDN}/684033ccb554afa6a516846f_5-p-500.avif 500w`,
      `${SERVICES_CDN}/684033ccb554afa6a516846f_5.avif 1714w`,
    ].join(", "),
  },
] as const;

export const END_ASSETS = {
  logo: BRAND_ASSETS.logoMark,
};

export const SERVICE_STEPS = SERVICES_COPY.steps;

export const END_CONTENT = SERVICES_COPY.endContent;
