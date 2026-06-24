"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { animateTextUnblur } from "@/components/hero/hooks";
import { animateTextAppear } from "@/components/services/TextAppearHeading";

type UseStrategySolutionsAnimationsOptions = {
  sectionRef: React.RefObject<HTMLDivElement | null>;
  headingRef: React.RefObject<HTMLParagraphElement | null>;
  bodyRef: React.RefObject<HTMLDivElement | null>;
  wrapperRef: React.RefObject<HTMLDivElement | null>;
  cardsRef: React.RefObject<HTMLDivElement | null>;
  cardsWrapperRef: React.RefObject<HTMLDivElement | null>;
  cardRefs: React.RefObject<(HTMLAnchorElement | null)[]>;
};

function observeOnce(
  elements: Element[],
  onEnter: (target: Element) => void,
  rootMargin = "15%",
) {
  const seen = new WeakSet<Element>();
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || seen.has(entry.target)) return;
        seen.add(entry.target);
        onEnter(entry.target);
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: `${rootMargin} 0% ${rootMargin} 0%`, threshold: 0 },
  );

  elements.forEach((element) => observer.observe(element));
  return () => observer.disconnect();
}

function observeToggle(
  elements: Element[],
  onChange: (target: Element, visible: boolean) => void,
  rootMargin = "25%",
) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        onChange(entry.target, entry.isIntersecting);
      });
    },
    { rootMargin: `${rootMargin} 0% ${rootMargin} 0%`, threshold: 0 },
  );

  elements.forEach((element) => observer.observe(element));
  return () => observer.disconnect();
}

export function useStrategySolutionsAnimations({
  sectionRef,
  headingRef,
  bodyRef,
  wrapperRef,
  cardsRef,
  cardsWrapperRef,
  cardRefs,
}: UseStrategySolutionsAnimationsOptions) {
  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const body = bodyRef.current;
    const wrapper = wrapperRef.current;
    const cards = cardsRef.current;
    const cardsWrapper = cardsWrapperRef.current;
    const cardElements = cardRefs.current?.filter(Boolean) as HTMLAnchorElement[];

    if (!section || !heading || !body || !wrapper || !cards || !cardsWrapper) {
      return;
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)")
      .matches;

    gsap.registerPlugin(ScrollTrigger);

    const cleanups: Array<() => void> = [];

    if (!reducedMotion) {
      cleanups.push(
        observeOnce([heading, body], (target) => {
          if (target === heading) {
            animateTextAppear(heading);
            return;
          }
          animateTextUnblur(body);
        }),
      );
    } else {
      animateTextAppear(heading);
      animateTextUnblur(body);
    }

    const updateShift = () => {
      const shift = cards.offsetWidth - cardsWrapper.offsetWidth;
      cards.style.setProperty("--shift", `${Math.max(0, shift)}px`);
    };

    updateShift();
    const resizeObserver = new ResizeObserver(updateShift);
    resizeObserver.observe(cardsWrapper);
    resizeObserver.observe(cards);
    cleanups.push(() => resizeObserver.disconnect());

    if (!reducedMotion) {
      const scrollTrigger = ScrollTrigger.create({
        trigger: wrapper,
        start: "top top",
        end: "95% bottom",
        scrub: true,
        onUpdate: (self) => {
          cards.style.setProperty("--progress", self.progress.toFixed(4));
        },
      });
      cleanups.push(() => scrollTrigger.kill());
    } else {
      cards.style.setProperty("--progress", "1");
      updateShift();
    }

    if (!finePointer && cardElements.length) {
      cleanups.push(
        observeToggle(cardElements, (target, visible) => {
          target.classList.toggle("active", visible);
        }),
      );
    }

    const refreshObserver = new IntersectionObserver(
      () => ScrollTrigger.refresh(),
      { threshold: 0 },
    );
    refreshObserver.observe(section);
    cleanups.push(() => refreshObserver.disconnect());

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [
    bodyRef,
    cardRefs,
    cardsRef,
    cardsWrapperRef,
    headingRef,
    sectionRef,
    wrapperRef,
  ]);
}
