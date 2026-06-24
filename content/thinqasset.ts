/** Centralized ThinqAsset copy — re-exported from section constants. */

export const SITE_NAME = "ThinqAsset";

export const METADATA = {
  title: "ThinqAsset — Innovative Global Fund Management",
  description:
    "Connecting the Middle East with global investment opportunities through tailored strategies and unparalleled service across Mauritius, DIFC, and global fund hubs.",
} as const;

export const HERO = {
  titleLine1: "Innovative Global",
  titleLine2: "Fund Management.",
  ariaLabel: "Innovative Global Fund Management",
  taglineAriaLabel:
    "Connecting the Middle East with global investment opportunities through tailored strategies and unparalleled service",
  taglineWords: [
    ["Connecting", "the", "Middle", "East", "with", "global", "investment"],
    [
      "opportunities",
      "through",
      "tailored",
      "strategies",
      "and",
      "unparalleled",
      "service.",
    ],
  ],
} as const;

export const HEADER = {
  navLinks: [
    { href: "#", label: "home" },
    { href: "#solutions", label: "Services" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" },
  ],
  memberLinks: [
    {
      href: "https://www.linkedin.com/company/thinqasset/",
      label: "LinkedIn",
    },
    {
      href: "https://www.thinqasset.com/",
      label: "thinqasset.com",
    },
  ],
} as const;

export const BRAND_ASSETS = {
  logoBase: "/thinqasset-assets",
  logoMark: "/thinqasset-assets/thinqasset-logo-mark-gold.png",
  logoFull: "/thinqasset-assets/thinqasset-logo-primary.png",
  logoFull500: "/thinqasset-assets/thinqasset-logo-primary.png",
  logoReversed: "/thinqasset-assets/thinqasset-logo-reversed.png",
  logoAlt: "ThinqAsset",
} as const;

export const APPROACH_COPY = {
  entries: [
    {
      id: "approach-entry-1",
      lines: [
        "Fund architecture is a complex system. Structuring, compliance, NAV, reporting, and investor communications must work as one integrated picture of operational health that supports your mandate.",
      ],
      breakAfter: [],
    },
    {
      id: "approach-entry-2",
      lines: [
        "Sophisticated allocators and emerging managers need a regulated partner",
        "who understands both architecture and strategy, not off-the-shelf templates.",
        "You operate with discipline, governance, and precision.",
        "But in markets that demand selectivity, who ensures your structure gets the same rigour you apply to manager selection?",
      ],
      breakAfter: [1, 2],
    },
    {
      id: "approach-entry-3",
      modifier: "approach__text__entry--3" as const,
      lines: [
        "The ThinqAsset approach is built on fiduciary discipline, cross-border execution, and long-term partnership.",
        "Your structure deserves the same attention you give to performance.",
        "You've built the strategy. It's time the architecture matched the ambition.",
      ],
      breakAfter: [1, 2],
    },
  ],
} as const;

export const SERVICES_COPY = {
  steps: [
    {
      index: "01",
      headingModifier: "services__step__heading__text--1",
      accentWords: ["Strategies"],
      titleLines: ["Fund Management:", "Alternative & Listed", "Strategies"],
      bodyLines: [
        "We support alternative and listed fund strategies across private markets, real assets, and retail structures, from Mauritius VCC sub-funds to DIFC and Luxembourg vehicles, so managers can focus on performance while we handle institutional-grade oversight.",
      ],
    },
    {
      index: "02",
      headingModifier: "services__step__heading__text--2",
      accentWords: ["Operations"],
      titleLines: [
        "Fund Administration",
        "& Services:",
        "End-to-End Operations",
      ],
      bodyLines: [
        "Your operations connect every part of your fund. When one area falters, the whole system feels it.",
        "Our approach is tailored, risk-aware, and built to adapt: NAV cycles, accounting, compliance, and investor communications designed to scale with your mandate.",
      ],
      bodyBreakAfter: [0],
    },
    {
      index: "03",
      headingModifier: "services__step__heading__text--3",
      accentWords: ["Weeks"],
      titleLines: [
        "Fund Establishment",
        "& Domiciliation:",
        "Weeks, Not Months",
      ],
      bodyLines: [
        "Every launch carries hidden cost in time and jurisdiction fit.",
        "That's why we integrate domicile selection into your strategy, from Mauritius FSC-licensed vehicles to DIFC presence, so structures go live in weeks, not months.",
        "With dual regulation across Mauritius and DIFC, we help you deploy capital through familiar hubs with institutional certainty.",
      ],
      bodyBreakAfter: [0],
    },
    {
      index: "04",
      headingModifier: "services__step__heading__text--4",
      accentWords: ["Transparency"],
      titleLines: [
        "Investor Services",
        "& Reporting:",
        "NAV & Transparency",
      ],
      bodyLines: [
        "You've worked tirelessly to earn allocator trust. But reporting gaps erode confidence fast.",
        "That's why we integrate investor onboarding, transfer agency, and NAV reporting into your broader fund architecture, keeping LPs informed with clarity.",
        "We aim to deliver institutional-grade transparency so even in volatile markets, your investors remain aligned.",
      ],
      bodyBreakAfter: [0],
    },
    {
      index: "05",
      headingModifier: "services__step__heading__text--5",
      accentWords: ["Governance"],
      titleLines: ["Corporate &", "Governance:", "Institutional Discipline"],
      bodyLines: [
        "Your fund's integrity was never just about returns. It's about governance.",
        "Whether company secretarial, board support, or listed-fund compliance, we create frameworks that evolve with your structure and reflect your values.",
        "From SPVs to multi-jurisdiction vehicles, we work alongside you and your counsel to preserve capital with clarity and purpose.",
      ],
      bodyBreakAfter: [0],
      isLast: true,
    },
  ],
  endContent: {
    headingLines: [
      "Risk can't be eliminated, but it can be understood,",
      "measured, and aligned with your mandate.",
    ],
    bodyLines: [
      "That's where we come in. Beyond ordinary fund services, we are your long-term structure partners, helping you move forward with clarity and confidence, no matter the market.",
      "Because for us, selectivity isn't just about access: it's about manager quality, risk assessment, and structures that behave differently across cycles.",
    ],
    bodyBreakAfter: [0] as const,
    taglineLines: ["Structure First.", "Always."],
  },
} as const;

export const STRATEGY_COPY = {
  headingLine1: "Your mandate shapes",
  headingLine2: "the structure",
  bodyLines: [
    "We take the time to understand more than just your target returns. We get to know your jurisdiction, your governance needs, your LPs, and your real mandate.",
    "The result is a structure that reflects who you are, adapts with you, and stays aligned as your fund evolves.",
    "You won't be handed a template and sent on your way. You'll be guided, advised, and supported through every phase of your fund lifecycle.",
  ],
  bodyBreakAfter: [0, 1] as const,
  solutionsHeading: "explore our capabilities",
  cards: [
    {
      title: "Fund Management",
      href: "/services/asset-classes",
    },
    {
      title: "Fund Administration & Services",
      href: "/services/fund-administration",
      offset: true,
    },
    {
      title: "About Us",
      href: "/about",
    },
    {
      title: "Jurisdictions",
      href: "/jurisdictions",
    },
    {
      title: "Why ThinqAsset",
      href: "/about#why-thinqasset",
    },
  ],
} as const;

export const FOOTER_COPY = {
  contact: {
    title: "let's talk about your structure",
    dataTitle: "contact us",
    email: "info@thinqasset.com",
    phone: "+230 5 500 01 02",
    linkedIn: "https://www.linkedin.com/company/thinqasset/",
  },
  clientTypeOptions: [
    "Family office",
    "Institutional allocator",
    "Fund promoter",
    "Asset manager",
    "Other",
  ] as const,
  foundUsOptions: [
    "Current Client",
    "Web Search",
    "Social Media",
    "Industry Event",
    "Referral",
    "Other",
  ] as const,
  serviceInterests: [
    { id: "interested---private-equity", label: "Private equity" },
    { id: "interested---private-credit", label: "Private credit" },
    { id: "interested---fund-admin", label: "Fund administration" },
    { id: "interested---establishment", label: "Fund establishment" },
    { id: "interested---corporate-services", label: "Corporate services" },
    { id: "interested---total-package", label: "Total package" },
  ] as const,
  scheduleBookingUrl: "mailto:info@thinqasset.com?subject=Collaboration%20session",
  privacyPolicyUrl: "https://www.thinqasset.com/privacy",
  legalLinks: [
    { label: "Regulatory Disclosures", href: "#" },
    { label: "Privacy Policy", href: "https://www.thinqasset.com/privacy" },
  ] as const,
  solutionsLinks: [
    { href: "/services/asset-classes", label: "Fund Management" },
    {
      href: "/services/fund-administration",
      label: "Fund Administration & Services",
    },
    { href: "/about", label: "About Us" },
    { href: "/jurisdictions", label: "Jurisdictions" },
    { href: "/about#why-thinqasset", label: "Why ThinqAsset" },
  ] as const,
  externalLinks: {
    linkedIn: "https://www.linkedin.com/company/thinqasset/",
    website: "https://www.thinqasset.com/",
  },
  form: {
    clientTypeLabel: "client type*",
    mandateLabel: "Tell us about your mandate",
    submitDefault: "Send message",
    submitSchedule: "Schedule collaboration session",
    successTeamLine: "The ThinqAsset team will contact you in 3-5 business days.",
    errorPrefix:
      "Something went wrong while submitting the form. Please try again later or contact us at ",
  },
  disclaimer: {
    paragraph1:
      "The content on this site is developed from sources believed to be providing accurate information. The information in this material is not intended as tax or legal advice. Please consult legal or tax professionals for specific information regarding your individual situation.",
    paragraph2Intro:
      "The opinions expressed and material provided are for general information, and should not be considered a solicitation for the purchase or sale of any security or fund interest.",
    privacyIntro:
      "We take protecting your data and privacy very seriously. To make a privacy-related request, please contact us directly at ",
    regulatory:
      "ThinqAsset Fund Management Ltd holds a CIS Manager licence issued by the Financial Services Commission (FSC) of Mauritius and a Category 3C licence authorised by the Dubai Financial Services Authority (DFSA). Services are subject to applicable regulatory requirements in each jurisdiction.",
  },
  copyright: "ThinqAsset",
} as const;
