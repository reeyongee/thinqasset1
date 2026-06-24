"use client";

import { useCallback, useLayoutEffect, useRef } from "react";

const WORD_STAGGER = 0.005;
const HERO_ANIMATION_TIME = 1600;

export function animateTextUnblur(element: HTMLElement | null) {
  if (!element) return;

  const words = element.querySelectorAll<HTMLElement>(".text-unblur__word");
  words.forEach((word, index) => {
    word.style.setProperty("--delay", `${WORD_STAGGER * index}s`);
  });

  element.classList.add("text-unblur--transition");
  window.setTimeout(() => {
    element.classList.add("text-unblur--appeared");
  }, 10);
}

export function resetTextUnblur(element: HTMLElement | null) {
  if (!element) return;
  element.classList.remove("text-unblur--transition", "text-unblur--appeared");
  element.classList.add("text-unblur");
}

export function useTextUnblur() {
  return { animate: animateTextUnblur, reset: resetTextUnblur };
}

export function useHeroEntrance(
  logoRef: React.RefObject<HTMLAnchorElement | null>,
  menuRef: React.RefObject<HTMLButtonElement | null>,
  onTaglineAnimate: () => void,
) {
  const heroRef = useRef<HTMLElement | null>(null);
  const onTaglineRef = useRef(onTaglineAnimate);
  onTaglineRef.current = onTaglineAnimate;

  useLayoutEffect(() => {
    let cancelled = false;
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    const schedule = (fn: () => void, delay: number) => {
      timeouts.push(setTimeout(fn, delay));
    };

    const start = () => {
      if (cancelled) return;

      const hero = heroRef.current;
      const logo = logoRef.current;
      const menu = menuRef.current;
      if (!hero || !logo || !menu) {
        requestAnimationFrame(start);
        return;
      }

      hero.classList.add("initial");
      logo.classList.add("initial");
      menu.classList.add("initial");

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reducedMotion) {
        hero.classList.remove("initial");
        logo.classList.remove("initial");
        menu.classList.remove("initial");
        onTaglineRef.current();
        return;
      }

      schedule(() => {
        hero.classList.add("transition");
        logo.classList.add("transition");
        menu.classList.add("transition");

        schedule(() => {
          hero.classList.remove("initial");
          logo.classList.remove("initial");

          schedule(() => {
            onTaglineRef.current();

            schedule(() => {
              hero.classList.remove("transition");
              menu.classList.remove("initial", "transition");
            }, HERO_ANIMATION_TIME * 0.5);
          }, HERO_ANIMATION_TIME * 0.5);
        }, 50);
      }, 50);
    };

    start();

    return () => {
      cancelled = true;
      timeouts.forEach(clearTimeout);
    };
  }, [logoRef, menuRef]);

  return { heroRef };
}
