"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  CONTACT_CONTENT,
  FOOTER_ASSETS,
  LEGAL_DISCLAIMER,
} from "./constants";

export function LegalDisclaimerEntry() {
  const entryRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const close = useCallback(() => {
    const entry = entryRef.current;
    const panel = panelRef.current;
    if (!entry || !panel) {
      setOpen(false);
      return;
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      panel.style.display = "none";
      setOpen(false);
      return;
    }

    gsap
      .timeline()
      .to(entry, { opacity: 0.5, duration: 0.2 })
      .to(panel, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          panel.style.display = "none";
          gsap.set(entry, { clearProps: "opacity" });
          setOpen(false);
        },
      });
  }, []);

  const openPanel = useCallback(
    (event: React.MouseEvent | React.KeyboardEvent) => {
      event.stopPropagation();
      const entry = entryRef.current;
      const panel = panelRef.current;
      if (!entry || !panel || open) return;

      setOpen(true);
      panel.style.display = "block";
      gsap.set(panel, { opacity: 0 });

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reducedMotion) {
        gsap.set(panel, { opacity: 1 });
        gsap.set(entry, { opacity: 1 });
        return;
      }

      gsap.to(panel, { opacity: 1, duration: 0.3 });
      gsap.to(entry, { opacity: 1, duration: 0.2 });
    },
    [open],
  );

  useEffect(() => {
    if (!open) return;

    const onDocumentClick = (event: MouseEvent) => {
      const panel = panelRef.current;
      const closeBtn = panel?.querySelector(".legal__disclaimer__close");
      if (!panel) return;

      const target = event.target as Node;
      if (!panel.contains(target) || closeBtn?.contains(target)) {
        close();
      }
    };

    const timer = window.setTimeout(() => {
      document.addEventListener("click", onDocumentClick);
    }, 0);

    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("click", onDocumentClick);
    };
  }, [open, close]);

  return (
    <div
      ref={entryRef}
      role="button"
      tabIndex={0}
      className="legal__entry legal__entry--disclaimer"
      onClick={openPanel}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openPanel(event);
        }
      }}
    >
      <div ref={panelRef} className="legal__disclaimer">
        <button
          type="button"
          className="legal__disclaimer__close"
          aria-label="Close disclaimer"
          onClick={(event) => {
            event.stopPropagation();
            close();
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={FOOTER_ASSETS.close} alt="" loading="lazy" />
        </button>
        <div className="legal__disclaimer__content">
          <p>
            {LEGAL_DISCLAIMER.paragraph1}
            <br />
            <br />
            {LEGAL_DISCLAIMER.paragraph2Intro}
          </p>
          <p>
            {LEGAL_DISCLAIMER.privacyIntro}
            <a
              href={`mailto:${CONTACT_CONTENT.email}?subject=Personal%20information%20inquiry`}
            >
              {CONTACT_CONTENT.email}
            </a>
            .
            <br />
            <br />
            {LEGAL_DISCLAIMER.regulatory}
          </p>
        </div>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={FOOTER_ASSETS.info} alt="" loading="lazy" />
      <p className="text text--legal">legal disclaimer</p>
    </div>
  );
}
