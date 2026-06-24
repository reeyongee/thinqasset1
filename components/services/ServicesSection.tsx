"use client";

import { Fragment, useRef } from "react";
import { TextUnblurParagraph } from "@/components/approach/TextUnblurParagraph";
import {
  END_ASSETS,
  END_CONTENT,
  SERVICE_IMAGES,
  SERVICE_STEPS,
} from "./constants";
import { TextAppearHeading } from "./TextAppearHeading";
import { useServicesAnimations } from "./useServicesAnimations";

function StepIndex({ label }: { label: string }) {
  return (
    <>
      <div className="services__step__index__line">
        <div className="glowing-line">
          <div className="glowing-line__line" />
          <div className="glowing-line__line glowing-line__line--glow" />
        </div>
      </div>
      <div className="services__step__index__text">
        <p className="caption">{label}</p>
      </div>
    </>
  );
}

type ServiceStepProps = {
  step: (typeof SERVICE_STEPS)[number];
  index: number;
  headingRefs: React.RefObject<(HTMLHeadingElement | null)[]>;
  bodyRefs: React.RefObject<(HTMLDivElement | null)[]>;
  indexRefs: React.RefObject<(HTMLDivElement | null)[]>;
};

function ServiceStep({
  step,
  index,
  headingRefs,
  bodyRefs,
  indexRefs,
}: ServiceStepProps) {
  return (
    <div
      className={
        "isLast" in step && step.isLast
          ? "services__step services__step--last"
          : "services__step"
      }
    >
      <div className="services__step__heading">
        <div
          ref={(node) => {
            indexRefs.current[index] = node;
          }}
          className="services__step__index"
        >
          <StepIndex label={step.index} />
        </div>
        <div className={`services__step__heading__text ${step.headingModifier}`}>
          <TextAppearHeading
            ref={(node) => {
              headingRefs.current[index] = node;
            }}
            lines={step.titleLines}
            accentWords={step.accentWords}
            extraClass={
              "isLast" in step && step.isLast ? "heading--services--5" : ""
            }
          />
        </div>
      </div>
      <div className="services__step__container">
        <div aria-hidden />
        <div className="services__step__content">
          <TextUnblurParagraph
            ref={(node) => {
              bodyRefs.current[index] = node;
            }}
            id={`service-body-${step.index}`}
            lines={step.bodyLines}
            breakAfter={
              "bodyBreakAfter" in step ? step.bodyBreakAfter : undefined
            }
          />
        </div>
      </div>
    </div>
  );
}

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const sideLineRef = useRef<HTMLDivElement>(null);
  const sideGlowRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
  const headingRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const bodyRefs = useRef<(HTMLDivElement | null)[]>([]);
  const indexRefs = useRef<(HTMLDivElement | null)[]>([]);
  const endRef = useRef<HTMLDivElement>(null);
  const endBgRef = useRef<HTMLDivElement>(null);
  const endImageRef = useRef<HTMLDivElement>(null);
  const endLogoRef = useRef<HTMLImageElement>(null);
  const endHeadingLineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const endBodyLineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const endTaglineLineRefs = useRef<(HTMLDivElement | null)[]>([]);

  useServicesAnimations({
    sectionRef,
    stepsRef,
    sideLineRef,
    sideGlowRef,
    imageRefs,
    headingRefs,
    bodyRefs,
    indexRefs,
    endRef,
    endBgRef,
    endImageRef,
    endLogoRef,
    endHeadingLineRefs,
    endBodyLineRefs,
    endTaglineLineRefs,
  });

  const regularSteps = SERVICE_STEPS.slice(0, 4);
  const lastStep = SERVICE_STEPS[4];

  return (
    <section ref={sectionRef} className="services" id="solutions">
      <div className="fixed-element-wrapper fixed-element-wrapper--services">
        <div className="services__images" aria-hidden>
          {SERVICE_IMAGES.map((image, index) => (
            <div
              key={image.id}
              className={`services__image services__image--${index + 1}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                ref={(node) => {
                  imageRefs.current[index] = node;
                }}
                src={image.avif}
                srcSet={image.srcSet}
                sizes="(max-width: 1714px) 100vw, 1714px"
                alt=""
                className="services__image__img"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      <div ref={stepsRef} className="services__steps">
        <div className="steps__with-line">
          <div ref={sideLineRef} className="side-line">
            <div className="glowing-line">
              <div className="glowing-line__line" />
              <div
                ref={sideGlowRef}
                className="glowing-line__line glowing-line__line--glow"
              />
            </div>
          </div>

          <div className="services__heading">
            <div className="services__rounded__line">
              <div className="services__heading__line" />
              <div className="services__heading__line services__heading__line--glow" />
            </div>
            <div className="services__heading__text">
              <h2 className="caption">Our services</h2>
            </div>
          </div>

          {regularSteps.map((step, index) => (
            <ServiceStep
              key={step.index}
              step={step}
              index={index}
              headingRefs={headingRefs}
              bodyRefs={bodyRefs}
              indexRefs={indexRefs}
            />
          ))}
        </div>

        <ServiceStep
          step={lastStep}
          index={4}
          headingRefs={headingRefs}
          bodyRefs={bodyRefs}
          indexRefs={indexRefs}
        />
      </div>

      <div ref={endRef} className="services__end">
        <div className="services__end__container">
          <div ref={endBgRef} className="services__end__bg" aria-hidden />
          <div className="services__end__content">
            <div ref={endImageRef} className="services__end__image">
              <div className="services__end__logo">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  ref={endLogoRef}
                  src={END_ASSETS.logo}
                  alt=""
                  className="services__end__logo__image"
                  loading="lazy"
                />
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={END_ASSETS.familyDesktop}
                alt="Doctors' family"
                className="services__end__image__image services__end__image__image--desktop"
                loading="lazy"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={END_ASSETS.familyMobile}
                alt="Doctors' family"
                className="services__end__image__image services__end__image__image--mobile"
                loading="lazy"
              />
            </div>

            <div className="services__end__heading">
              <div className="heading heading--h3 heading--services-end">
                {END_CONTENT.headingLines.map((line, index) => (
                  <div
                    key={index}
                    ref={(node) => {
                      endHeadingLineRefs.current[index] = node;
                    }}
                    className="services__end__text-line"
                  >
                    {line}
                  </div>
                ))}
              </div>
            </div>

            <div className="services__end__text">
              <div className="text text--small">
                {END_CONTENT.bodyLines.map((line, index) => (
                  <Fragment key={index}>
                    <div
                      ref={(node) => {
                        endBodyLineRefs.current[index] = node;
                      }}
                      className="services__end__text-line"
                    >
                      {line}
                    </div>
                    {"bodyBreakAfter" in END_CONTENT &&
                    (END_CONTENT.bodyBreakAfter as readonly number[]).includes(
                      index,
                    ) ? (
                      <div
                        className="services__end__text-stanza-gap"
                        aria-hidden
                      />
                    ) : null}
                  </Fragment>
                ))}
              </div>
            </div>

            <div className="services__end__tagline">
              <div className="heading heading--h3">
                {END_CONTENT.taglineLines.map((line, index) => (
                  <div
                    key={index}
                    ref={(node) => {
                      endTaglineLineRefs.current[index] = node;
                    }}
                    className="services__end__text-line"
                  >
                    {line}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
