import gsap from "gsap";

const DURATION = 2;
const N = "70%";

export const ORGAN_TRANSFORMS = {
  TOP: `translateY(-${N})`,
  BOTTOM: `translateY(${N})`,
  ZERO: "translateY(0)",
  SCALE_DOWN: "scale(0.7)",
  SCALE_UP: "scale(1.3)",
  SCALE_ZERO: "scale(1)",
} as const;

export const ORGAN_BLUR = {
  BLURRED: "blur(10px)",
  ZERO: "blur(0px)",
} as const;

export type OrganKey = "BRAIN" | "NERVES" | "LUNGS" | "LYMPHS" | "HEART" | "END";
export type OrganDirection = "FORWARD" | "BACKWARD";
export type OrganAction = "SHOW" | "HIDE";

type OrganImages = {
  brain: HTMLImageElement;
  nerves: HTMLImageElement;
  lungs: HTMLImageElement;
  lymphs: HTMLImageElement;
  heart: HTMLImageElement;
};

type EndElements = {
  block: HTMLElement;
  bg: HTMLElement;
  logo: HTMLImageElement;
  image: HTMLElement;
  headingLines: HTMLElement[];
  bodyLines: HTMLElement[];
  taglineLines: HTMLElement[];
};

export function animateEndReveal(end: EndElements) {
  const e = ORGAN_BLUR;
  const headingDuration =
    end.headingLines.length > 0
      ? (2 * DURATION) / end.headingLines.length
      : DURATION;

  return gsap
    .timeline({ overwrite: "auto" })
    .to(end.image, { opacity: 1, duration: DURATION / 4 }, "bg-change")
    .to(end.bg, { opacity: 1, duration: DURATION / 4 }, "bg-change")
    .to(
      end.headingLines,
      {
        opacity: 1,
        filter: e.ZERO,
        duration: headingDuration,
        stagger: 0.1 / Math.max(end.headingLines.length, 1),
      },
      "texts",
    )
    .to(
      end.bodyLines,
      {
        opacity: 1,
        filter: e.ZERO,
        duration: headingDuration,
        stagger: 0.1 / Math.max(end.bodyLines.length, 1),
      },
      "texts",
    )
    .to(
      end.logo,
      { opacity: 1, transform: "scale(1)", duration: DURATION },
      "texts",
    )
    .to(
      end.taglineLines,
      {
        opacity: 1,
        filter: e.ZERO,
        duration: DURATION / Math.max(end.taglineLines.length, 1),
        stagger: 0.1 / Math.max(end.taglineLines.length, 1),
      },
      "texts",
    );
}

export function animateEndConceal(end: EndElements) {
  const e = ORGAN_BLUR;
  const headingDuration =
    end.headingLines.length > 0
      ? (2 * DURATION) / end.headingLines.length
      : DURATION;
  const headingStagger = 0.1 / Math.max(end.headingLines.length, 1);
  const bodyStagger = 0.1 / Math.max(end.bodyLines.length, 1);
  const taglineStagger = 0.1 / Math.max(end.taglineLines.length, 1);

  return gsap
    .timeline({ overwrite: "auto" })
    .to(end.taglineLines, {
      opacity: 0,
      filter: e.BLURRED,
      duration: DURATION / Math.max(end.taglineLines.length, 1),
      stagger: taglineStagger,
    })
    .to(
      end.logo,
      { opacity: 0, transform: "scale(0.75)", duration: DURATION / 4 },
      "<0.08",
    )
    .to(
      end.bodyLines,
      {
        opacity: 0,
        filter: e.BLURRED,
        duration: headingDuration,
        stagger: bodyStagger,
      },
      "<0.05",
    )
    .to(
      end.headingLines,
      {
        opacity: 0,
        filter: e.BLURRED,
        duration: headingDuration,
        stagger: headingStagger,
      },
      "<0.05",
    )
    .to([end.image, end.bg], { opacity: 0, duration: DURATION / 4 }, "<0.08");
}

export function createOrganHandlers(
  images: OrganImages,
  end: EndElements,
  reducedMotion: boolean,
) {
  const i = ORGAN_TRANSFORMS;
  const e = ORGAN_BLUR;
  const t = DURATION;

  const showEnd = () => {
    if (reducedMotion) return;
    animateEndReveal(end);
  };

  const hideEnd = () => {
    if (reducedMotion) return;
    animateEndConceal(end);
  };

  return {
    BRAIN: {
      FORWARD: {
        SHOW: () => {
          gsap.fromTo(
            images.brain,
            { opacity: 0, transform: "translateY(25%)", filter: e.BLURRED },
            {
              opacity: 1,
              transform: i.ZERO,
              filter: e.ZERO,
              duration: t / 2,
            },
          );
        },
        HIDE: () => {
          gsap.to(images.brain, {
            opacity: 0,
            transform: i.TOP,
            filter: e.BLURRED,
            duration: t,
          });
        },
      },
      BACKWARD: {
        SHOW: () => {
          gsap.fromTo(
            images.brain,
            { opacity: 0, transform: i.TOP, filter: e.BLURRED, duration: t },
            {
              opacity: 1,
              transform: i.ZERO,
              filter: e.ZERO,
              duration: t,
            },
          );
        },
        HIDE: () => {
          gsap.to(images.brain, {
            opacity: 0,
            transform: "translateY(5%)",
            filter: e.BLURRED,
            duration: t / 2,
          });
        },
      },
    },
    NERVES: {
      FORWARD: {
        SHOW: () => {
          gsap.fromTo(
            images.nerves,
            { opacity: 0, transform: i.BOTTOM, filter: e.BLURRED },
            {
              opacity: 1,
              transform: i.ZERO,
              filter: e.ZERO,
              duration: t,
            },
          );
        },
        HIDE: () => {
          gsap.to(images.nerves, {
            opacity: 0,
            transform: i.TOP,
            filter: e.BLURRED,
            duration: t,
          });
        },
      },
      BACKWARD: {
        SHOW: () => {
          gsap.fromTo(
            images.nerves,
            { opacity: 0, transform: i.TOP, filter: e.BLURRED, duration: t },
            {
              opacity: 1,
              transform: i.ZERO,
              filter: e.ZERO,
              duration: t,
            },
          );
        },
        HIDE: () => {
          gsap.to(images.nerves, {
            opacity: 0,
            transform: i.BOTTOM,
            filter: e.BLURRED,
            duration: t,
          });
        },
      },
    },
    LUNGS: {
      FORWARD: {
        SHOW: () => {
          gsap.fromTo(
            images.lungs,
            { opacity: 0, transform: i.BOTTOM, filter: e.BLURRED },
            {
              opacity: 1,
              transform: i.ZERO,
              filter: e.ZERO,
              duration: t,
            },
          );
        },
        HIDE: () => {
          gsap.to(images.lungs, {
            opacity: 0,
            transform: i.SCALE_DOWN,
            filter: e.BLURRED,
            duration: t,
          });
        },
      },
      BACKWARD: {
        SHOW: () => {
          gsap.fromTo(
            images.lungs,
            { opacity: 0, transform: i.SCALE_DOWN, filter: e.BLURRED, duration: t },
            {
              opacity: 1,
              transform: i.SCALE_ZERO,
              filter: e.ZERO,
              duration: t,
            },
          );
        },
        HIDE: () => {
          gsap.to(images.lungs, {
            opacity: 0,
            transform: i.BOTTOM,
            filter: e.BLURRED,
            duration: t,
          });
        },
      },
    },
    LYMPHS: {
      FORWARD: {
        SHOW: () => {
          gsap.fromTo(
            images.lymphs,
            { opacity: 0, transform: i.SCALE_UP, filter: e.BLURRED },
            {
              opacity: 1,
              transform: i.SCALE_ZERO,
              filter: e.ZERO,
              duration: t,
            },
          );
        },
        HIDE: () => {
          gsap.to(images.lymphs, {
            opacity: 0,
            transform: i.SCALE_UP,
            filter: e.BLURRED,
            duration: t,
          });
        },
      },
      BACKWARD: {
        SHOW: () => {
          gsap.fromTo(
            images.lymphs,
            { opacity: 0, transform: i.SCALE_UP, filter: e.BLURRED, duration: t },
            {
              opacity: 1,
              transform: i.SCALE_ZERO,
              filter: e.ZERO,
              duration: t,
            },
          );
        },
        HIDE: () => {
          gsap.to(images.lymphs, {
            opacity: 0,
            transform: i.SCALE_UP,
            filter: e.BLURRED,
            duration: t,
          });
        },
      },
    },
    HEART: {
      FORWARD: {
        SHOW: () => {
          gsap.fromTo(
            images.heart,
            { opacity: 0, transform: i.SCALE_DOWN, filter: e.BLURRED },
            {
              opacity: 1,
              transform: i.SCALE_ZERO,
              filter: e.ZERO,
              duration: t,
            },
          );
        },
        HIDE: () => {
          gsap.to(images.heart, {
            transform: "translate(-12%, 0%) scale(0.25)",
            duration: t,
          });
        },
      },
      BACKWARD: {
        SHOW: () => {
          gsap.to(images.heart, { transform: i.SCALE_ZERO, duration: t });
        },
        HIDE: () => {
          gsap.to(images.heart, {
            opacity: 0,
            transform: i.SCALE_DOWN,
            filter: e.BLURRED,
            duration: t,
          });
        },
      },
    },
    END: {
      FORWARD: { SHOW: showEnd, HIDE: hideEnd },
      BACKWARD: { SHOW: showEnd, HIDE: hideEnd },
    },
  } satisfies Record<
    OrganKey,
    Record<OrganDirection, Partial<Record<OrganAction, () => void>>>
  >;
}

export const ORGAN_SEQUENCE: OrganKey[] = [
  "BRAIN",
  "NERVES",
  "LUNGS",
  "LYMPHS",
  "HEART",
  "END",
];

export function buildScrubTimeline(
  images: OrganImages,
  trigger: HTMLElement,
) {
  const i = ORGAN_TRANSFORMS;
  const e = ORGAN_BLUR;
  const t = DURATION;
  const { brain, nerves, lungs, lymphs, heart } = images;

  return gsap.timeline({
    scrollTrigger: {
      trigger,
      start: "top 20%",
      end: "bottom center",
      scrub: 1.5,
    },
    defaults: { ease: "linear" },
  })
    .set([brain, nerves, lungs, lymphs, heart], {
      willChange: "opacity, transform, filter",
    })
    .add("step0")
    .fromTo(
      brain,
      {
        opacity: 0,
        transform: "translateY(50%) scale(0.6)",
        filter: e.BLURRED,
      },
      {
        opacity: 1,
        transform: i.ZERO,
        filter: e.ZERO,
        duration: t / 2,
      },
      "step0",
    )
    .add("step1")
    .to(
      brain,
      { transform: i.TOP, filter: e.BLURRED, duration: t },
      "step1",
    )
    .to(nerves, { opacity: 1, duration: t / 4 }, "step1")
    .fromTo(
      nerves,
      { transform: i.BOTTOM, filter: e.BLURRED },
      { transform: i.ZERO, filter: e.ZERO, duration: t },
      "step1",
    )
    .add("step2")
    .to(brain, { opacity: 0, duration: t / 4 }, "step2")
    .to(
      nerves,
      { transform: i.TOP, filter: e.BLURRED, duration: t },
      "step2",
    )
    .to(lungs, { opacity: 1, duration: t / 4 }, "step2")
    .fromTo(
      lungs,
      { transform: i.BOTTOM, filter: e.BLURRED },
      { transform: i.ZERO, filter: e.ZERO, duration: t },
      "step2",
    )
    .add("step3")
    .to(nerves, { opacity: 0, duration: t / 4 }, "step3")
    .to(
      lungs,
      {
        opacity: 0,
        transform: i.SCALE_DOWN,
        filter: e.BLURRED,
        duration: t,
      },
      "step3",
    )
    .fromTo(
      lymphs,
      {
        opacity: 0,
        transform: i.SCALE_UP,
        filter: e.BLURRED,
      },
      {
        opacity: 1,
        transform: i.SCALE_ZERO,
        filter: e.ZERO,
        duration: t,
      },
      "step3",
    )
    .add("step4")
    .to(
      lymphs,
      {
        opacity: 0,
        transform: i.SCALE_UP,
        filter: e.BLURRED,
        duration: t,
      },
      "step4",
    )
    .fromTo(
      heart,
      {
        opacity: 0,
        transform: i.SCALE_DOWN,
        filter: e.BLURRED,
      },
      {
        opacity: 1,
        transform: i.SCALE_ZERO,
        filter: e.ZERO,
        duration: t,
      },
      "step4",
    )
    .to(
      heart,
      { transform: "translate(-12%, 0%) scale(0.25)", duration: t / 2 },
    )
    .set([brain, nerves, lungs, lymphs, heart], { willChange: "" });
}
