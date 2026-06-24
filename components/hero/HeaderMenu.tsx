"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { BRAND_ASSETS, HEADER } from "@/content/thinqasset";
import { BurgerIcon } from "./icons";

type FixedHeaderProps = {
  logoRef: React.RefObject<HTMLAnchorElement | null>;
  menuRef: React.RefObject<HTMLButtonElement | null>;
  menuOpen: boolean;
  onMenuToggle: () => void;
};

export function FixedHeader({
  logoRef,
  menuRef,
  menuOpen,
  onMenuToggle,
}: FixedHeaderProps) {
  return (
    <header className="fixed-content bg-toggled">
      <div aria-hidden />
      <div className="fixed__logo">
        <a
          ref={logoRef}
          href="/"
          aria-label="go to main"
          className="fixed__logo__link initial"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={BRAND_ASSETS.logoMark}
            alt={BRAND_ASSETS.logoAlt}
            className="fixed__logo__link__embed"
            loading="eager"
          />
        </a>
      </div>
      <button
        ref={menuRef}
        type="button"
        className={`menu-btn initial${menuOpen ? " menu-btn--opened" : ""}`}
        aria-expanded={menuOpen}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        onClick={onMenuToggle}
      >
        <span className="menu-btn__border" aria-hidden />
        <span className="menu-btn__text">Menu</span>
        <span className="menu-btn__icon">
          <BurgerIcon />
        </span>
      </button>
    </header>
  );
}

const NAV_LINKS = HEADER.navLinks;

type MenuOverlayProps = {
  open: boolean;
  onClose: () => void;
};

export function MenuOverlay({ open, onClose }: MenuOverlayProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [dimmedIndex, setDimmedIndex] = useState<number | null>(null);
  const [linksVisible, setLinksVisible] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("menu-opened", open);

    if (!open) {
      setLinksVisible(false);
      return;
    }

    const menu = menuRef.current;
    if (!menu) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const desktop = window.matchMedia("(min-width: 992px)").matches;

    if (reducedMotion) {
      menu.style.display = "block";
      setLinksVisible(true);
      return;
    }

    if (desktop) {
      gsap.fromTo(
        menu,
        { display: "block", x: "100%" },
        {
          x: "0%",
          duration: 1,
          ease: "power2.out",
          onComplete: () => setLinksVisible(true),
        },
      );
    } else {
      gsap.fromTo(
        menu,
        { display: "block", opacity: 0 },
        {
          opacity: 1,
          duration: 0.4,
          onComplete: () => setLinksVisible(true),
        },
      );
    }

    return () => {
      gsap.killTweensOf(menu);
    };
  }, [open]);

  const handleClose = useCallback(() => {
    const menu = menuRef.current;
    if (!menu) {
      onClose();
      return;
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const desktop = window.matchMedia("(min-width: 992px)").matches;

    if (reducedMotion) {
      onClose();
      return;
    }

    if (desktop) {
      gsap.to(menu, {
        x: "100%",
        duration: 1,
        onComplete: () => {
          menu.style.display = "none";
          onClose();
        },
      });
    } else {
      gsap.to(menu, {
        opacity: 0,
        duration: 0.4,
        onComplete: () => {
          menu.style.display = "none";
          onClose();
        },
      });
    }
  }, [onClose]);

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleClose();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, handleClose]);

  return (
    <nav
      ref={menuRef}
      className={`menu${open ? " is-open" : ""}`}
      aria-hidden={!open}
    >
      <div
        className="menu__bg"
        aria-hidden
        style={{
          WebkitBackdropFilter: "blur(14px)",
          backdropFilter: "blur(14px)",
        }}
      />
      <div className="menu__container">
        <div className="menu__links">
          {NAV_LINKS.map((link, index) => (
            <a
              key={link.label}
              href={link.href}
              className={`menu__link${dimmedIndex !== null && dimmedIndex !== index ? " transparent" : ""}`}
              onMouseEnter={() => setDimmedIndex(index)}
              onMouseLeave={() => setDimmedIndex(null)}
              onClick={handleClose}
            >
              <div className="menu__link__text">
                <p
                  className={`heading heading--nav-link${linksVisible ? " transition shown" : ""}`}
                >
                  {link.label}
                </p>
              </div>
              <div className="menu__link__eyes" aria-hidden>
                <div className="eyes">
                  <div className="eyes__dot" />
                  <div className="eyes__dot" />
                </div>
              </div>
            </a>
          ))}
        </div>
        <div className="menu__members-links">
          {HEADER.memberLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              data-animation="underline"
              className={`members-link${linksVisible ? " transition shown" : ""}`}
            >
              <p className="caption">{link.label}</p>
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
