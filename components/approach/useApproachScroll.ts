"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTextUnblur } from "@/components/hero/hooks";
import { APPROACH_STEP_COUNT } from "./constants";

const STEP_CLASSES = ["step-0", "step-1", "step-2"] as const;
const BASE_CLASS = "approach";

type UseApproachScrollOptions = {
  sectionRef: React.RefObject<HTMLElement | null>;
  stepRefs: React.RefObject<(HTMLDivElement | null)[]>;
  paragraphRefs: React.RefObject<(HTMLDivElement | null)[]>;
  counterRef: React.RefObject<HTMLDivElement | null>;
  counterTextRef: React.RefObject<HTMLParagraphElement | null>;
  counterFillRef: React.RefObject<HTMLDivElement | null>;
};

export function useApproachScroll({
  sectionRef,
  stepRefs,
  paragraphRefs,
  counterRef,
  counterTextRef,
  counterFillRef,
}: UseApproachScrollOptions) {
  const { animate, reset } = useTextUnblur();

  useEffect(() => {
    const section = sectionRef.current;
    const steps = stepRefs.current?.filter(Boolean) as HTMLDivElement[];
    const paragraphs = paragraphRefs.current?.filter(Boolean) as HTMLDivElement[];
    const counter = counterRef.current;
    const counterText = counterTextRef.current;
    const counterFill = counterFillRef.current;

    if (
      !section ||
      !steps?.length ||
      !paragraphs?.length ||
      !counter ||
      !counterText ||
      !counterFill
    ) {
      return;
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      paragraphs.forEach((paragraph) => {
        paragraph.style.opacity = "1";
        animate(paragraph);
      });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    let activeStep: number | null = null;

    const updateCounter = (step: number | null) => {
      gsap.killTweensOf(counter);

      if (step === null) {
        counter.style.opacity = "0";
        counterFill.style.transform = "scaleX(0)";
        return;
      }

      counterText.textContent = `${step + 1}/${APPROACH_STEP_COUNT}`;
      counterFill.style.transform = `scaleX(${(step + 1) / APPROACH_STEP_COUNT})`;
      gsap.to(counter, { opacity: 1, duration: 0.4, overwrite: true });
    };

    const hideCounter = () => {
      gsap.killTweensOf(counter);
      gsap.to(counter, { opacity: 0, duration: 0.6, overwrite: true });
    };

    const setStepClass = (step: number | null, forceReset = false) => {
      if (step === null && !forceReset) return;
      section.className =
        step === null ? BASE_CLASS : `${BASE_CLASS} animated ${STEP_CLASSES[step]}`;
    };

    const setStepState = (step: number | null, forceReset = false) => {
      if (step === activeStep && !forceReset) return;
      updateCounter(step);
      setStepClass(step, forceReset);
      activeStep = step;
    };

    updateCounter(null);

    const refreshObserver = new IntersectionObserver(
      () => ScrollTrigger.refresh(),
      { threshold: 0 },
    );
    refreshObserver.observe(section);

    const triggers = steps.map((step, index) => {
      const paragraph = paragraphs[index];

      return ScrollTrigger.create({
        trigger: step,
        start: "top 25%",
        end: "bottom 25%",
        onToggle: ({ isActive, direction }) => {
          if (isActive) {
            gsap.to(paragraph, { opacity: 1, overwrite: true });
            animate(paragraph);
            setStepState(index);
            // Always restore counter when (re)entering a step — e.g. scroll back
            // up after the step-2 exit fade leaves inline opacity at 0.
            updateCounter(index);
            return;
          }

          gsap.to(paragraph, {
            opacity: 0,
            duration: 0.4,
            overwrite: true,
            onComplete: () => reset(paragraph),
          });

          const exitAbove = index === 0 && direction < 0;
          const exitBelow =
            index === APPROACH_STEP_COUNT - 1 && direction > 0;

          if (exitBelow) {
            hideCounter();
            return;
          }

          if (exitAbove) {
            setStepState(null, true);
          }
        },
      });
    });

    return () => {
      refreshObserver.disconnect();
      triggers.forEach((trigger) => trigger.kill());
    };
  }, [
    animate,
    reset,
    counterFillRef,
    counterRef,
    counterTextRef,
    paragraphRefs,
    sectionRef,
    stepRefs,
  ]);
}
