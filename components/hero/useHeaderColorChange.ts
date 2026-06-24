"use client";

import { useEffect } from "react";

const COLOR_TARGETS_SELECTOR =
  "[data-color-change], .approach, .services__end, .strategy-and-solutions";

function setBgChange(el: HTMLElement, active: boolean) {
  el.classList.toggle("bg-change", active);
  el.style.removeProperty("color");
}

export function useHeaderColorChange() {
  useEffect(() => {
    const targets = document.querySelectorAll(COLOR_TARGETS_SELECTOR);
    const headers = document.querySelectorAll<HTMLElement>(".fixed-content");

    if (!targets.length) {
      headers.forEach((header) => setBgChange(header, false));
      return;
    }

    const headerObservers: IntersectionObserver[] = [];
    const colorObservers: (IntersectionObserver | null)[] = [];

    const disconnectColorObserver = (index: number) => {
      colorObservers[index]?.disconnect();
      colorObservers[index] = null;
    };

    const setupColorObserver = (header: HTMLElement, index: number) => {
      disconnectColorObserver(index);

      const { top, bottom } = header.getBoundingClientRect();
      const vh = window.innerHeight;
      const topPct = (top / vh) * 100;
      const bottomPct = 100 * (1 - bottom / vh);
      const rootMargin = `-${topPct}% 50% -${bottomPct}% 50%`;

      const visibleTargets = new Set<Element>();

      const colorObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              visibleTargets.add(entry.target);
            } else {
              visibleTargets.delete(entry.target);
            }
          });
          setBgChange(header, visibleTargets.size > 0);
        },
        { rootMargin, threshold: [0] },
      );

      targets.forEach((target) => colorObserver.observe(target));
      colorObservers[index] = colorObserver;
    };

    headers.forEach((header, index) => {
      header.classList.add("bg-toggled");

      const headerObserver = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setupColorObserver(header, index);
          } else {
            disconnectColorObserver(index);
          }
        },
        { threshold: [0] },
      );

      headerObserver.observe(header);
      headerObservers.push(headerObserver);
    });

    return () => {
      headerObservers.forEach((observer) => observer.disconnect());
      colorObservers.forEach((observer) => observer?.disconnect());
    };
  }, []);
}
