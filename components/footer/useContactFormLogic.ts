"use client";

import { useEffect, useRef } from "react";

const OTHER = "Other";

export function useContactFormLogic(formRef: React.RefObject<HTMLFormElement | null>) {
  const graduationRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const form = formRef.current;
    if (!form) return;

    const careerStage = form.querySelector<HTMLSelectElement>(
      'select[name="career-stage"]',
    );
    const foundUs = form.querySelector<HTMLSelectElement>(
      'select[name="found-us-through"]',
    );
    const graduationInput = form.querySelector<HTMLInputElement>(
      'input[name="graduation date"]',
    );
    const graduationGroup = graduationInput?.closest(
      ".form__question",
    ) as HTMLElement | null;
    const careerOtherInput = form.querySelector<HTMLInputElement>(
      'input[name="career-stage-other"]',
    );
    const careerOtherGroup = careerOtherInput?.closest(
      ".form__question",
    ) as HTMLElement | null;
    const careerWrapper = careerOtherInput?.closest(
      ".form__question-wrapper",
    ) as HTMLElement | null;
    const foundOtherInput = form.querySelector<HTMLInputElement>(
      'input[name="found-us-through-other"]',
    );
    const foundOtherWrapper = foundOtherInput?.closest(
      ".form__question-wrapper",
    ) as HTMLElement | null;

    if (
      !careerStage ||
      !foundUs ||
      !graduationInput ||
      !graduationGroup ||
      !careerOtherInput ||
      !careerOtherGroup ||
      !careerWrapper ||
      !foundOtherInput ||
      !foundOtherWrapper
    ) {
      return;
    }

    graduationRef.current = graduationInput;
    graduationInput.min = new Date().toISOString().split("T")[0];

    const onGraduationFocus = (event: FocusEvent) => {
      const target = event.target as HTMLInputElement;
      try {
        target.showPicker();
      } catch {
        // showPicker is not supported in all browsers
      }
    };

    const syncCareerStage = () => {
      const isOther = careerStage.value === OTHER;

      careerWrapper.style.display = isOther ? "flex" : "none";
      graduationInput.required = false;
      graduationGroup.style.display = "none";

      if (isOther) {
        careerOtherInput.required = true;
        careerOtherGroup.style.display = "flex";
      } else {
        careerOtherInput.required = false;
        careerOtherGroup.style.display = "none";
      }
    };

    const syncFoundUs = () => {
      foundOtherWrapper.style.display =
        foundUs.value === OTHER ? "flex" : "none";
    };

    graduationInput.addEventListener("focus", onGraduationFocus);
    careerStage.addEventListener("change", syncCareerStage);
    foundUs.addEventListener("change", syncFoundUs);
    syncCareerStage();
    syncFoundUs();

    return () => {
      graduationInput.removeEventListener("focus", onGraduationFocus);
      careerStage.removeEventListener("change", syncCareerStage);
      foundUs.removeEventListener("change", syncFoundUs);
    };
  }, [formRef]);
}

export function useScheduleSessionToggle(
  formRef: React.RefObject<HTMLFormElement | null>,
  onScheduleChange: (scheduled: boolean) => void,
) {
  useEffect(() => {
    const form = formRef.current;
    if (!form) return;

    const scheduleInput = form.querySelector<HTMLInputElement>(
      'input[name="Schedule-a-session"]',
    );
    if (!scheduleInput) return;

    const sync = () => {
      onScheduleChange(scheduleInput.checked);
    };

    scheduleInput.addEventListener("change", sync);
    sync();

    return () => scheduleInput.removeEventListener("change", sync);
  }, [formRef, onScheduleChange]);
}
