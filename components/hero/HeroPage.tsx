"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { PageBackground } from "./PageBackground";
import { FixedHeader, MenuOverlay } from "./HeaderMenu";
import { ApproachSection } from "@/components/approach/ApproachSection";
import { ServicesSection } from "@/components/services/ServicesSection";
import { StrategyAndSolutionsSection } from "@/components/strategy/StrategyAndSolutionsSection";
import { FooterSection } from "@/components/footer/FooterSection";
import { HeroSection } from "./HeroSection";
import { ScrollVelocityProvider } from "./ScrollVelocityProvider";
import { useHeaderColorChange } from "./useHeaderColorChange";

export function HeroPage() {
  useHeaderColorChange();
  const [menuOpen, setMenuOpen] = useState(false);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const menuRef = useRef<HTMLButtonElement>(null);

  const toggleMenu = useCallback(() => {
    setMenuOpen((open) => !open);
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <ScrollVelocityProvider>
      <PageBackground />
      <FixedHeader
        logoRef={logoRef}
        menuRef={menuRef}
        menuOpen={menuOpen}
        onMenuToggle={toggleMenu}
      />
      <MenuOverlay open={menuOpen} onClose={closeMenu} />
      <main>
        <HeroSection logoRef={logoRef} menuRef={menuRef} />
        <ApproachSection />
        <ServicesSection />
        <StrategyAndSolutionsSection />
        <FooterSection />
      </main>
    </ScrollVelocityProvider>
  );
}
