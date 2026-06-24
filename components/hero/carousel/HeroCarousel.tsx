"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";
import { IMAGE_LIST } from "./constants";

const HeroCarouselScene = dynamic(
  () =>
    import("./HeroCarouselScene").then((mod) => mod.HeroCarouselScene),
  { ssr: false },
);

export function HeroCarousel() {
  useEffect(() => {
    void import("./HeroCarouselScene");
    IMAGE_LIST.forEach((src) => {
      const image = new window.Image();
      image.decoding = "async";
      image.src = src;
    });
  }, []);

  return <HeroCarouselScene />;
}
