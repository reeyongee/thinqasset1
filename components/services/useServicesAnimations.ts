"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { animateTextUnblur } from "@/components/hero/hooks";
import { animateTextAppear } from "./TextAppearHeading";
import {
  animateEndConceal,
  animateEndReveal,
  buildScrubTimeline,
  createOrganHandlers,
  ORGAN_BLUR,
  ORGAN_SEQUENCE,
  ORGAN_TRANSFORMS,
  type OrganAction,
  type OrganDirection,
} from "./servicesOrganAnimations";

const N = "70%";

type UseServicesAnimationsOptions = {
  sectionRef: React.RefObject<HTMLElement | null>;
  stepsRef: React.RefObject<HTMLDivElement | null>;
  sideLineRef: React.RefObject<HTMLDivElement | null>;
  sideGlowRef: React.RefObject<HTMLDivElement | null>;
  imageRefs: React.RefObject<(HTMLImageElement | null)[]>;
  headingRefs: React.RefObject<(HTMLHeadingElement | null)[]>;
  bodyRefs: React.RefObject<(HTMLDivElement | null)[]>;
  indexRefs: React.RefObject<(HTMLDivElement | null)[]>;
  endRef: React.RefObject<HTMLDivElement | null>;
  endBgRef: React.RefObject<HTMLDivElement | null>;
  endImageRef: React.RefObject<HTMLDivElement | null>;
  endLogoRef: React.RefObject<HTMLImageElement | null>;
  endHeadingLineRefs: React.RefObject<(HTMLDivElement | null)[]>;
  endBodyLineRefs: React.RefObject<(HTMLDivElement | null)[]>;
  endTaglineLineRefs: React.RefObject<(HTMLDivElement | null)[]>;
};

function observeOnce(
  elements: Element[],
  onEnter: (el: Element) => void,
  rootMargin = "-20% 0px -20% 0px",
) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        onEnter(entry.target);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0, rootMargin },
  );

  elements.forEach((el) => observer.observe(el));
  return () => observer.disconnect();
}

function observeToggle(
  elements: Element[],
  onChange: (el: Element, visible: boolean) => void,
  rootMargin: string,
) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        onChange(entry.target, entry.isIntersecting);
      });
    },
    { threshold: 0, rootMargin },
  );

  elements.forEach((el) => observer.observe(el));
  return () => observer.disconnect();
}

export function useServicesAnimations({
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
}: UseServicesAnimationsOptions) {
  useEffect(() => {
    const section = sectionRef.current;
    const steps = stepsRef.current;
    const sideLine = sideLineRef.current;
    const sideGlow = sideGlowRef.current;
    const images = imageRefs.current?.filter(Boolean) as HTMLImageElement[];
    const headings = headingRefs.current?.filter(Boolean) as HTMLHeadingElement[];
    const bodies = bodyRefs.current?.filter(Boolean) as HTMLDivElement[];
    const indexes = indexRefs.current?.filter(Boolean) as HTMLDivElement[];
    const end = endRef.current;
    const endBg = endBgRef.current;
    const endImage = endImageRef.current;
    const endLogo = endLogoRef.current;
    const endHeadingLines = endHeadingLineRefs.current?.filter(Boolean) as HTMLDivElement[];
    const endBodyLines = endBodyLineRefs.current?.filter(Boolean) as HTMLDivElement[];
    const endTaglineLines = endTaglineLineRefs.current?.filter(Boolean) as HTMLDivElement[];

    if (
      !section ||
      !steps ||
      !sideLine ||
      !sideGlow ||
      images.length !== 5 ||
      !headings.length ||
      !bodies.length ||
      !end ||
      !endBg ||
      !endImage ||
      !endLogo
    ) {
      return;
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isMobile = window.innerWidth < 767;
    const useStepTriggers = reducedMotion || isMobile;

    if (reducedMotion) {
      document.documentElement.setAttribute("data-reduced-motion", "true");
      headings.forEach(animateTextAppear);
      bodies.forEach(animateTextUnblur);
      indexes.forEach((index) => index.classList.add("appeared"));
      gsap.set(images, {
        opacity: 1,
        transform: ORGAN_TRANSFORMS.SCALE_ZERO,
        filter: ORGAN_BLUR.ZERO,
      });
      gsap.set([endBg, endImage], { opacity: 1 });
      gsap.set(end, { opacity: 1 });
      gsap.set(endLogo, { opacity: 1, scale: 1 });
      gsap.set([...endHeadingLines, ...endBodyLines, ...endTaglineLines], {
        opacity: 1,
        filter: ORGAN_BLUR.ZERO,
      });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const [brain, nerves, lungs, lymphs, heart] = images;
    const lineTriggerPercent = isMobile ? 50 : 85;
    const indexMargin = `${100 - lineTriggerPercent}% 0% -${100 - lineTriggerPercent}% 0%`;
    const organImages = { brain, nerves, lungs, lymphs, heart };
    const endElements = {
      block: end,
      bg: endBg,
      logo: endLogo,
      image: endImage,
      headingLines: endHeadingLines,
      bodyLines: endBodyLines,
      taglineLines: endTaglineLines,
    };

    gsap.set(images, {
      opacity: 0,
      transform: `translateY(${N})`,
      filter: ORGAN_BLUR.BLURRED,
    });
    gsap.set([endBg, endImage], { opacity: 0 });
    gsap.set(endLogo, { opacity: 0, scale: 0.75 });
    gsap.set([...endHeadingLines, ...endBodyLines, ...endTaglineLines], {
      opacity: 0,
      filter: ORGAN_BLUR.BLURRED,
    });

    const refreshObserver = new IntersectionObserver(
      () => ScrollTrigger.refresh(),
      { threshold: 0 },
    );
    refreshObserver.observe(section);

    const textObserverCleanup = observeOnce(
      [...headings, ...bodies],
      (target) => {
        if (target instanceof HTMLHeadingElement) {
          animateTextAppear(target);
        } else if (
          target instanceof HTMLElement &&
          target.classList.contains("text-unblur")
        ) {
          animateTextUnblur(target);
        }
      },
    );

    const indexObserverCleanup = observeToggle(
      indexes,
      (target, visible) => {
        target.classList.toggle("appeared", visible);
      },
      indexMargin,
    );

    const sideTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: sideLine,
        start: `top ${lineTriggerPercent}%`,
        end: `bottom ${lineTriggerPercent}%`,
        scrub: isMobile ? 0.5 : 1,
      },
    });
    sideTimeline.fromTo(
      sideGlow,
      { scaleY: 0 },
      { scaleY: 1, duration: 1, ease: "none" },
    );

    const cleanups: (() => void)[] = [];
    let imageTimeline: gsap.core.Timeline | null = null;
    let endTrigger: ScrollTrigger | null = null;
    let endShowTimeline: gsap.core.Timeline | null = null;

    // End block overlaps the last step by 50vh; reveal only after that overlap clears.
    const endRevealStart = "25% top";

    if (useStepTriggers) {
      const handlers = createOrganHandlers(organImages, endElements, reducedMotion);
      const stepElements = section.querySelectorAll(".services__step, .services__end");

      stepElements.forEach((element, index) => {
        const isLast = index === stepElements.length - 1;
        const organ = ORGAN_SEQUENCE[index];

        const trigger = ScrollTrigger.create({
          trigger: element,
          start: isLast ? endRevealStart : "top 50%",
          end: "bottom 50%",
          onToggle: ({ isActive, direction }) => {
            const dir: OrganDirection = direction === 1 ? "FORWARD" : "BACKWARD";
            const action: OrganAction = isActive ? "SHOW" : "HIDE";
            handlers[organ][dir][action]?.();
          },
        });

        cleanups.push(() => trigger.kill());
      });
    } else {
      imageTimeline = buildScrubTimeline(organImages, steps);

      const showEnd = () => {
        endShowTimeline?.kill();
        endShowTimeline = animateEndReveal(endElements);
      };

      const hideEnd = () => {
        endShowTimeline?.kill();
        endShowTimeline = animateEndConceal(endElements);
      };

      endTrigger = ScrollTrigger.create({
        trigger: end,
        start: endRevealStart,
        onToggle: ({ isActive }) => {
          if (isActive) showEnd();
          else hideEnd();
        },
      });

      if (endTrigger.isActive) {
        showEnd();
      } else {
        hideEnd();
      }

      const preload = Promise.all(
        images.map(
          (img) =>
            new Promise<void>((resolve) => {
              if (img.complete) resolve();
              else img.addEventListener("load", () => resolve(), { once: true });
            }),
        ),
      );

      preload.then(() => {
        requestAnimationFrame(() => ScrollTrigger.refresh());
      });
    }

    return () => {
      refreshObserver.disconnect();
      textObserverCleanup();
      indexObserverCleanup();
      imageTimeline?.kill();
      sideTimeline.kill();
      endTrigger?.kill();
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [
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
  ]);
}
