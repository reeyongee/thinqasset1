"use client";

import { useEffect } from "react";
import { scrollRampRef, scrollVelocityRef } from "./scrollVelocity";

type ScrollVelocityProviderProps = {
  children: React.ReactNode;
};

export function ScrollVelocityProvider({
  children,
}: ScrollVelocityProviderProps) {
  useEffect(() => {
    let lastY = window.scrollY;
    let lastTime = performance.now();
    let raf = 0;

    const onScroll = () => {
      const now = performance.now();
      const dt = Math.max(now - lastTime, 1);
      scrollVelocityRef.current = ((window.scrollY - lastY) / dt) * 16.67;
      scrollRampRef.current = Math.min(1, scrollRampRef.current + 0.14);
      lastY = window.scrollY;
      lastTime = now;
    };

    const tick = () => {
      scrollVelocityRef.current *= 0.9;
      scrollRampRef.current += (0 - scrollRampRef.current) * 0.045;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return children;
}
