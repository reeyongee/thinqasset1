import { CONTACT_CONTENT, FOOTER_ASSETS } from "./constants";
import { ContactForm } from "./ContactForm";
import { FooterNavigation } from "./FooterNavigation";

export function FooterSection() {
  return (
    <footer className="footer" id="contact">
      <div className="footer__container">
        <div className="contact">
          <div className="contact__line" aria-hidden>
            <div className="block-line block-line--rounded" />
          </div>

          <div className="contact__title">
            <p className="heading heading--h2 heading--draft">
              {CONTACT_CONTENT.title}
            </p>
          </div>

          <div className="contact__data">
            <div className="contact__info__data__title__line" aria-hidden>
              <div className="glowing-line__line" />
            </div>
            <div className="contact__data__content">
              <div className="contact__data__title">
                <h2 className="caption">{CONTACT_CONTENT.dataTitle}</h2>
              </div>
              <div className="contact__data__info">
                <div data-animation="underline" className="contact__data__link">
                  <a
                    href={`mailto:${CONTACT_CONTENT.email}`}
                    className="text text--small"
                  >
                    {CONTACT_CONTENT.email}
                  </a>
                </div>
                <div data-animation="underline" className="contact__data__link">
                  <a
                    href={`tel:${CONTACT_CONTENT.phone.replace(/[\s.]/g, "")}`}
                    className="text text--small"
                  >
                    {CONTACT_CONTENT.phone}
                  </a>
                </div>
              </div>
              <div className="contact__data__socials">
                <a
                  aria-label="LinkedIn"
                  href={CONTACT_CONTENT.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact__data__social"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={FOOTER_ASSETS.linkedin}
                    alt="LinkedIn icon"
                    className="contact__data__social__icon"
                    loading="lazy"
                  />
                </a>
              </div>
            </div>
          </div>

          <div className="contact__form">
            <div className="contact__form__bg" aria-hidden />
            <div className="contact__form__content">
              <ContactForm />
            </div>
          </div>
        </div>

        <FooterNavigation />
      </div>
    </footer>
  );
}
