import { BRAND_ASSETS, FOOTER_COPY } from "@/content/thinqasset";

export const CDN =
  "https://cdn.prod.website-files.com/68359b057989673b79f2f2ce";

export const FOOTER_ASSETS = {
  linkedin: `${CDN}/683982d1dc2e8e9dc838244f_linkedin.svg`,
  logoFull: BRAND_ASSETS.logoFull,
  logoFull500: BRAND_ASSETS.logoFull500,
  check: `${CDN}/6851938bba1f0beb9f45f28a_check.svg`,
  info: `${CDN}/6839860d23cb46b5c095e0ba_info.svg`,
  close: `${CDN}/6863c10098a9e9ad4fb2aef3_close-blue.svg`,
} as const;

export const CONTACT_CONTENT = FOOTER_COPY.contact;

export const CAREER_STAGE_OPTIONS = FOOTER_COPY.clientTypeOptions;

export const FOUND_US_OPTIONS = FOOTER_COPY.foundUsOptions;

export const SERVICE_INTERESTS = FOOTER_COPY.serviceInterests;

export const SCHEDULE_BOOKING_URL = FOOTER_COPY.scheduleBookingUrl;

export const PRIVACY_POLICY_URL = FOOTER_COPY.privacyPolicyUrl;

export const LEGAL_LINKS = FOOTER_COPY.legalLinks;

export const SOLUTIONS_LINKS = FOOTER_COPY.solutionsLinks;

export const EXTERNAL_LINKS = FOOTER_COPY.externalLinks;

export const FORM_COPY = {
  submitDefault: FOOTER_COPY.form.submitDefault,
  submitSchedule: FOOTER_COPY.form.submitSchedule,
  successDefault: `Thank you for reaching out to us!\n${FOOTER_COPY.form.successTeamLine}`,
  successSchedule:
    "Thank you for reaching out to us!\nYou should be redirected to a scheduling form in a moment.\nIf it doesn't happen, please use this link",
  errorPrefix: FOOTER_COPY.form.errorPrefix,
} as const;

export const FORM_LABELS = {
  clientType: FOOTER_COPY.form.clientTypeLabel,
  mandate: FOOTER_COPY.form.mandateLabel,
} as const;

export const COPYRIGHT_NAME = FOOTER_COPY.copyright;

export { BRAND_ASSETS } from "@/content/thinqasset";

export const LEGAL_DISCLAIMER = FOOTER_COPY.disclaimer;
