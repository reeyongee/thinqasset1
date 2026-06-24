"use client";

import { useRef } from "react";
import { TextUnblurParagraph } from "@/components/approach/TextUnblurParagraph";
import {
  SOLUTION_CARDS,
  SOLUTIONS_HEADING,
  STRATEGY_BODY_BREAK_AFTER,
  STRATEGY_BODY_LINES,
  STRATEGY_HEADING,
} from "./constants";
import { useStrategySolutionsAnimations } from "./useStrategySolutionsAnimations";

export function StrategyAndSolutionsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLParagraphElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const cardsWrapperRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useStrategySolutionsAnimations({
    sectionRef,
    headingRef,
    bodyRef,
    wrapperRef,
    cardsRef,
    cardsWrapperRef,
    cardRefs,
  });

  return (
    <div ref={sectionRef} className="strategy-and-solutions" id="about">
      <div className="fixed-element-wrapper">
        <div className="approach__bg" aria-hidden />
      </div>

      <section className="strategy">
        <div className="strategy__line" aria-hidden>
          <div className="block-line block-line--rounded" />
        </div>

        <div className="strategy__heading">
          <p
            ref={headingRef}
            className="heading heading--h2 heading--strategy text-appear"
          >
            <span className="text-appear__line-mask" aria-hidden>
              <span
                className="text-appear__line"
                style={{ "--delay": "0s" } as React.CSSProperties}
              >
                {STRATEGY_HEADING.line1} <span className="heading--blue" />
              </span>
            </span>
            <span className="text-appear__line-mask" aria-hidden>
              <span
                className="text-appear__line"
                style={{ "--delay": "0.15s" } as React.CSSProperties}
              >
                <span className="heading--blue">{STRATEGY_HEADING.line2}</span>
              </span>
            </span>
          </p>
        </div>

        <div className="strategy__content">
          <TextUnblurParagraph
            ref={bodyRef}
            id="strategy-body"
            lines={STRATEGY_BODY_LINES}
            breakAfter={STRATEGY_BODY_BREAK_AFTER}
            className="text text-unblur"
          />
        </div>
      </section>

      <div ref={wrapperRef} className="solutions-wrapper">
        <section className="solutions">
          <div className="solutions__pre-line" aria-hidden />

          <div className="solutions__line" aria-hidden>
            <div className="block-line" />
          </div>

          <div className="solutions__heading">
            <h2 className="caption">{SOLUTIONS_HEADING}</h2>
          </div>

          <div ref={cardsWrapperRef} className="solutions__cards-wrapper">
            <div ref={cardsRef} className="solutions__cards">
              {SOLUTION_CARDS.map((card, index) => (
                <div
                  key={card.href}
                  className={[
                    "solutions__card-wrapper",
                    card.offset ? "solutions__card-wrapper--move" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <a
                    ref={(node) => {
                      cardRefs.current[index] = node;
                    }}
                    href={card.href}
                    className="solutions__card"
                  >
                    <div className="solutions__card__images">
                      <div className="solutions__card__image">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={card.defaultImage.avif}
                          srcSet={card.defaultImage.srcSet}
                          sizes="38.2vw"
                          alt=""
                          className="solutions__card__image__img"
                          loading="lazy"
                        />
                      </div>
                      <div className="solutions__card__image solutions__card__image--hover">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={card.hoverImage.avif}
                          srcSet={card.hoverImage.srcSet}
                          sizes="38.2vw"
                          alt=""
                          className="solutions__card__image__img"
                          loading="lazy"
                        />
                      </div>
                    </div>

                    <div className="solutions__card__title">
                      <h3 className="heading heading--h3">{card.title}</h3>
                    </div>

                    <div className="solutions__card__button">
                      <div className="eyes" aria-hidden>
                        <div className="eyes__dot" />
                        <div className="eyes__dot" />
                      </div>
                      <p className="caption">learn more</p>
                    </div>

                    <div className="solutions__card__tooltip" aria-hidden />
                  </a>
                </div>
              ))}
            </div>

            <div className="solutions__tip-container" aria-hidden>
              <div className="solutions__tip">
                <div className="video-element__tooltip__btn">
                  <div className="tooltip-btn__icon">
                    <div className="eyes">
                      <div className="eyes__dot" />
                      <div className="eyes__dot" />
                    </div>
                  </div>
                  <div className="tooltip-btn__label">
                    <p className="caption">explore</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
