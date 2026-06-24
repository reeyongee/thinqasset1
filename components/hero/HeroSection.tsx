"use client";

import { Fragment, useCallback, useEffect, useRef } from "react";
import { HERO } from "@/content/thinqasset";
import { ArrowDownIcon } from "./icons";
import { useHeroEntrance, useTextUnblur } from "./hooks";
import { HeroCarousel } from "./carousel/HeroCarousel";
import { MeshCanvas } from "./MeshCanvas";

function Tagline() {
  let wordIndex = 0;

  return (
    <p
      id="hero-tagline"
      className="text text-unblur"
      aria-label={HERO.taglineAriaLabel}
    >
      {HERO.taglineWords.map((line, lineIndex) => (
        <span key={lineIndex} className="text-unblur__line" aria-hidden>
          {line.map((word, indexInLine) => {
            const delay = wordIndex * 0.005;
            wordIndex += 1;
            return (
              <Fragment key={`${lineIndex}-${word}`}>
                <span
                  className="text-unblur__word"
                  style={{ "--delay": `${delay}s` } as React.CSSProperties}
                >
                  {word}
                </span>
                {indexInLine < line.length - 1 ? " " : null}
              </Fragment>
            );
          })}
        </span>
      ))}
    </p>
  );
}

type HeroSectionProps = {
  logoRef: React.RefObject<HTMLAnchorElement | null>;
  menuRef: React.RefObject<HTMLButtonElement | null>;
};

export function HeroSection({ logoRef, menuRef }: HeroSectionProps) {
  const { animate: animateTagline } = useTextUnblur();
  const tipIconRef = useRef<HTMLDivElement>(null);

  const onTaglineAnimate = useCallback(() => {
    const el = document.getElementById("hero-tagline");
    if (el) animateTagline(el);
  }, [animateTagline]);

  const { heroRef } = useHeroEntrance(logoRef, menuRef, onTaglineAnimate);

  useEffect(() => {
    const icon = tipIconRef.current;
    if (!icon) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        icon.classList.toggle("animate", entry.isIntersecting);
      },
      { threshold: 0 },
    );

    observer.observe(icon);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={heroRef} className="hero initial">
      <div className="hero__bg" aria-hidden>
        <MeshCanvas variant="institutional" />
      </div>

      <div className="fixed-element-wrapper fixed-element-wrapper--hero">
        <div className="fixed-element fixed-element--hero">
          <div className="fixed-shadow" aria-hidden />
        </div>
      </div>

      <div className="hero__carousel" aria-hidden>
        <HeroCarousel />
      </div>

      <div className="hero__container">
        <div className="hero__content">
          <div className="hero__info">
            <h1
              className="heading heading--h1 heading--main"
              data-safari-force-repaint
              aria-label={HERO.ariaLabel}
            >
              <span className="hero__title__integrated">
                <div aria-hidden>{HERO.titleLine1}</div>
              </span>{" "}
              <span className="hero__title__wealthcare">
                <div aria-hidden>{HERO.titleLine2}</div>
              </span>
            </h1>

            <div className="hero__tagline">
              <Tagline />
            </div>
          </div>
        </div>

        <div className="hero__tip">
          <div className="hero__tip__content">
            <p className="caption">scroll down</p>
            <div ref={tipIconRef} className="hero__tip__content__icon">
              <ArrowDownIcon className="hero__tip__content__image" />
              <ArrowDownIcon className="hero__tip__content__image hero__tip__content__image--duplicate" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
