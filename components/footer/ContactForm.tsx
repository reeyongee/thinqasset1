"use client";

import {
  useCallback,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import {
  CAREER_STAGE_OPTIONS,
  CONTACT_CONTENT,
  FOOTER_ASSETS,
  FORM_COPY,
  FORM_LABELS,
  FOUND_US_OPTIONS,
  PRIVACY_POLICY_URL,
  SCHEDULE_BOOKING_URL,
  SERVICE_INTERESTS,
} from "./constants";
import { Eyes } from "./Eyes";
import {
  useContactFormLogic,
  useScheduleSessionToggle,
} from "./useContactFormLogic";

type FormCheckboxProps = {
  id: string;
  name: string;
  label: ReactNode;
  checked: boolean;
  required?: boolean;
  standalone?: boolean;
  privacy?: boolean;
  onChange: (checked: boolean) => void;
};

function FormCheckbox({
  id,
  name,
  label,
  checked,
  required,
  standalone,
  privacy,
  onChange,
}: FormCheckboxProps) {
  return (
    <label
      className={`form__checkbox${privacy ? " form__checkbox--privacy" : ""}`}
    >
      <div
        className={`form__checkbox__box${
          standalone ? " form__checkbox__box--standalone" : ""
        }${checked ? " is-checked" : ""}`}
        aria-hidden
      />
      <input
        type="checkbox"
        id={id}
        name={name}
        checked={checked}
        required={required}
        onChange={(event) => onChange(event.target.checked)}
      />
      <span
        className={`form__checkbox__label${
          privacy ? " form__checkbox__label--privacy" : ""
        }`}
      >
        {label}
      </span>
    </label>
  );
}

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const [scheduleSession, setScheduleSession] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [interests, setInterests] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);
  const [failed, setFailed] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useContactFormLogic(formRef);
  useScheduleSessionToggle(formRef, setScheduleSession);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!privacyAccepted || submitting) return;

      setSubmitting(true);
      setFailed(false);

      try {
        await new Promise((resolve) => window.setTimeout(resolve, 400));
        setSubmitted(true);

        if (scheduleSession) {
          window.open(SCHEDULE_BOOKING_URL, "_blank", "noopener,noreferrer");
        }
      } catch {
        setFailed(true);
      } finally {
        setSubmitting(false);
      }
    },
    [privacyAccepted, scheduleSession, submitting],
  );

  const buttonLabel = scheduleSession
    ? FORM_COPY.submitSchedule
    : FORM_COPY.submitDefault;

  if (submitted) {
    return (
      <div
        ref={successRef}
        className={`form-success${scheduleSession ? " form-success--schedule" : ""}`}
        role="region"
        aria-label="Email Form success"
      >
        <div className="form-success__content">
          <div className="form-success__icon">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={FOOTER_ASSETS.check} alt="" loading="eager" />
          </div>
          <div className="form-success__default">
            <div className="caption">
              Thank you for reaching out to us!
              <br />
              {FORM_COPY.successDefault.split("\n")[1]}
            </div>
          </div>
          <div className="form-success__schedule">
            <div className="caption">
              Thank you for reaching out to us!
              <br />
              You should be redirected to a scheduling form in a moment.
              <br />
              If it doesn&apos;t happen, please use{" "}
              <a
                href={SCHEDULE_BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="underlined"
              >
                this link
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      id="email-form"
      name="email-form"
      className="form"
      aria-label="Email Form"
      onSubmit={handleSubmit}
    >
      <div className="form__inputs">
        <div className="form__question">
          <label htmlFor="name" className="form__label">
            Full Name*
          </label>
          <input
            className="form__input"
            maxLength={256}
            name="name"
            placeholder="Your Name"
            type="text"
            id="name"
            required
          />
        </div>

        <div className="form__question">
          <label htmlFor="email" className="form__label">
            e-mail*
          </label>
          <input
            className="form__input"
            maxLength={256}
            name="email"
            placeholder="Your E-mail"
            type="email"
            id="email"
            required
          />
        </div>

        <div className="form__question">
          <label htmlFor="career-stage" className="form__label">
            {FORM_LABELS.clientType}
          </label>
          <select
            id="career-stage"
            name="career-stage"
            required
            className="form__input form__input--select"
            defaultValue={CAREER_STAGE_OPTIONS[0]}
          >
            {CAREER_STAGE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="form__question-wrapper">
          <div className="form__question form__question--graduation">
            <label htmlFor="graduation-date" className="form__label">
              graduation date*
            </label>
            <input
              name="graduation date"
              id="graduation-date"
              className="form__input form__input--date"
              type="date"
            />
          </div>
          <div className="form__question form__question--career-other">
            <label htmlFor="career-stage-other" className="form__label">
              Please specify
            </label>
            <input
              className="form__input"
              maxLength={256}
              name="career-stage-other"
              placeholder="Please specify"
              type="text"
              id="career-stage-other"
            />
          </div>
        </div>

        <div className="form__question form__question--services">
          <span className="form__label">
            What services are you most interested in?
          </span>
          <div className="form__checkboxes">
            {SERVICE_INTERESTS.map((item) => (
              <FormCheckbox
                key={item.id}
                id={item.id}
                name={item.id}
                label={item.label}
                checked={Boolean(interests[item.id])}
                onChange={(checked) =>
                  setInterests((current) => ({
                    ...current,
                    [item.id]: checked,
                  }))
                }
              />
            ))}
          </div>
        </div>

        <div className="form__question">
          <label htmlFor="found-us-through" className="form__label">
            How did you hear about us?
          </label>
          <select
            id="found-us-through"
            name="found-us-through"
            className="form__input form__input--select"
            defaultValue={FOUND_US_OPTIONS[0]}
          >
            {FOUND_US_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="form__question-wrapper form__question-wrapper--found-other">
          <div className="form__question">
            <input
              className="form__input"
              maxLength={256}
              name="found-us-through-other"
              placeholder="Please specify"
              type="text"
              id="found-us-through-other"
            />
          </div>
        </div>

        <div className="form__question form__question--story">
          <label htmlFor="story" className="form__label">
            {FORM_LABELS.mandate}
          </label>
          <textarea
            maxLength={5000}
            id="story"
            name="story"
            className="form__input form__input--multiline"
          />
        </div>
      </div>

      <div className="form__end-checkboxes">
        <FormCheckbox
          id="Schedule-a-session"
          name="Schedule-a-session"
          label="I would like to schedule a collaboration session"
          checked={scheduleSession}
          onChange={setScheduleSession}
        />
        <FormCheckbox
          id="agree-to-privacy-policy"
          name="agree-to-privacy-policy"
          label={
            <>
              I agree to the{" "}
              <a
                href={PRIVACY_POLICY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="underlined"
              >
                Privacy Policy
              </a>
            </>
          }
          checked={privacyAccepted}
          required
          standalone
          privacy
          onChange={setPrivacyAccepted}
        />
      </div>

      <div className="form__button">
        <button
          type="submit"
          aria-label="send form data"
          className="form__button__real"
          disabled={!privacyAccepted || submitting}
        />
        <p className="form__button__text">{buttonLabel}</p>
        <div className="form__button__icon">
          <Eyes />
        </div>
      </div>

      {failed && (
        <div
          className="form-error"
          role="region"
          aria-label="Email Form failure"
        >
          <div className="caption">
            {FORM_COPY.errorPrefix}
            <a href={`mailto:${CONTACT_CONTENT.email}`}>
              {CONTACT_CONTENT.email}
            </a>
          </div>
        </div>
      )}
    </form>
  );
}
