"use client";

import { useRef } from "react";
import {
  APPROACH_ENTRIES,
  APPROACH_LOGO,
  APPROACH_STEP_COUNT,
} from "./constants";
import { TextUnblurParagraph } from "./TextUnblurParagraph";
import { useApproachScroll } from "./useApproachScroll";

export function ApproachSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const paragraphRefs = useRef<(HTMLDivElement | null)[]>([]);
  const counterRef = useRef<HTMLDivElement>(null);
  const counterTextRef = useRef<HTMLParagraphElement>(null);
  const counterFillRef = useRef<HTMLDivElement>(null);

  useApproachScroll({
    sectionRef,
    stepRefs,
    paragraphRefs,
    counterRef,
    counterTextRef,
    counterFillRef,
  });

  return (
    <section ref={sectionRef} className="approach">
      <div className="fixed-element-wrapper">
        <div className="approach__bg" aria-hidden />

        <div className="fixed-element">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={APPROACH_LOGO.avif}
            srcSet={`${APPROACH_LOGO.png500} 500w, ${APPROACH_LOGO.avif} 1510w`}
            sizes="(max-width: 1510px) 100vw, 1510px"
            alt=""
            className="fixed-shadow"
            loading="lazy"
          />
          <div className="approach__oval approach__oval--top" aria-hidden />
          <div className="approach__oval approach__oval--bottom" aria-hidden />
          <div className="approach__circles" aria-hidden>
            <div className="approach__circle approach__circle--1" />
            <div className="approach__circle approach__circle--2" />
            <div className="approach__circle approach__circle--3" />
          </div>
        </div>

        <div className="approach__content">
          <div className="approach__text">
            {APPROACH_ENTRIES.map((entry, index) => (
              <div
                key={entry.id}
                className={[
                  "approach__text__entry",
                  "modifier" in entry ? entry.modifier : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <TextUnblurParagraph
                  ref={(node) => {
                    paragraphRefs.current[index] = node;
                  }}
                  id={entry.id}
                  lines={entry.lines}
                  breakAfter={
                    "breakAfter" in entry ? entry.breakAfter : undefined
                  }
                />
              </div>
            ))}
          </div>

          <div ref={counterRef} className="approach__counter">
            <div className="approach__counter__number">
              <p
                ref={counterTextRef}
                className="text text--approach-counter"
              >
                1/{APPROACH_STEP_COUNT}
              </p>
            </div>
            <div className="approach__counter__line">
              <div
                ref={counterFillRef}
                className="approach__counter__line__fill"
              />
              <div className="approach__counter__line__bg" />
            </div>
          </div>
        </div>
      </div>

      <div className="approach__space" aria-hidden />

      <div className="approach__steps">
        {Array.from({ length: APPROACH_STEP_COUNT }, (_, index) => (
          <div
            key={`approach-step-${index}`}
            ref={(node) => {
              stepRefs.current[index] = node;
            }}
            className="approach__step"
            aria-hidden
          />
        ))}
      </div>

      <div className="approach__space approach__space--end" aria-hidden />
    </section>
  );
}
