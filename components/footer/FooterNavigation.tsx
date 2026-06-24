"use client";

import {
  BRAND_ASSETS,
  COPYRIGHT_NAME,
  EXTERNAL_LINKS,
  FOOTER_ASSETS,
  LEGAL_LINKS,
  SOLUTIONS_LINKS,
} from "./constants";
import { Eyes } from "./Eyes";
import { LegalDisclaimerEntry } from "./LegalDisclaimerEntry";

type NavigationSecondaryLinkProps = {
  href: string;
  label: string;
};

function NavigationSecondaryLink({ href, label }: NavigationSecondaryLinkProps) {
  return (
    <a href={href} className="navigation__secondary">
      <div className="navigation__secondary__icons">
        <div className="navigation__secondary__corner">
          <div className="navigation__secondary__corner navigation__secondary__corner--glow" />
        </div>
        <div className="navigation__secondary__eyes">
          <Eyes />
        </div>
      </div>
      <div className="navigation__secondary__text">
        <p className="caption">{label}</p>
      </div>
    </a>
  );
}

export function FooterNavigation() {
  const year = new Date().getFullYear();

  return (
    <div className="navigation">
      <div className="navigation__logo">
        <a href="/" aria-label="go to main" className="navigation__logo__link">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={FOOTER_ASSETS.logoFull}
            srcSet={`${FOOTER_ASSETS.logoFull500} 500w, ${FOOTER_ASSETS.logoFull} 637w`}
            sizes="366px"
            alt={BRAND_ASSETS.logoAlt}
            loading="lazy"
          />
        </a>
      </div>

      <div className="navigation__contacts" aria-hidden />

      <nav className="navigation__links" aria-label="Footer links">
        <div className="navigation__section">
          <a href="#solutions" className="navigation__link">
            <p className="caption">services</p>
          </a>
          <div className="navigation__section__links">
            {SOLUTIONS_LINKS.map((link) => (
              <NavigationSecondaryLink
                key={link.href + link.label}
                href={link.href}
                label={link.label}
              />
            ))}
          </div>
        </div>

        <div className="navigation__section">
          <a href="#about" className="navigation__link">
            <p className="caption">About</p>
          </a>
          <a href="#contact" className="navigation__link">
            <p className="caption">contact</p>
          </a>
          <div className="navigation__members-links">
            <a
              href={EXTERNAL_LINKS.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              data-animation="underline"
              className="members-link"
            >
              <p className="caption">LinkedIn</p>
            </a>
            <a
              href={EXTERNAL_LINKS.website}
              target="_blank"
              rel="noopener noreferrer"
              data-animation="underline"
              className="members-link"
            >
              <p className="caption">thinqasset.com</p>
            </a>
          </div>
        </div>
      </nav>

      <div className="navigation__line" aria-hidden />

      <div className="legal__links legal__links--resources">
        <LegalDisclaimerEntry />
        {LEGAL_LINKS.map((link) => (
          <div key={link.href + link.label} className="legal__entry">
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text text--legal"
            >
              {link.label}
            </a>
          </div>
        ))}
      </div>

      <div className="legal__links legal__links--copy">
        <div className="legal__entry legal__entry--inactive">
          <p className="text text--legal">
            {COPYRIGHT_NAME} © {year}
          </p>
        </div>
        <div className="legal__entry">
          <a
            href="https://www.3200kelvin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text text--legal"
          >
            website by 3200 Kelvin
          </a>
        </div>
      </div>
    </div>
  );
}
