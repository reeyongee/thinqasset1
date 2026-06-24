"use client";

import { forwardRef, Fragment } from "react";

const LINE_STAGGER = 0.15;

type TextAppearHeadingProps = {
  lines: readonly string[];
  accentWords?: readonly string[];
  className?: string;
  extraClass?: string;
};

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function renderLineWithAccents(
  line: string,
  accentWords: readonly string[],
) {
  if (!accentWords.length) return line;

  const pattern = accentWords.map(escapeRegExp).join("|");
  const parts = line.split(new RegExp(`(${pattern})`, "gi"));

  return parts.map((part, index) => {
    const isAccent = accentWords.some(
      (word) => word.toLowerCase() === part.toLowerCase(),
    );

    if (!isAccent) return <Fragment key={index}>{part}</Fragment>;

    return (
      <span key={index} className="services__title-accent">
        {part}
      </span>
    );
  });
}

export const TextAppearHeading = forwardRef<
  HTMLHeadingElement,
  TextAppearHeadingProps
>(function TextAppearHeading(
  {
    lines,
    accentWords = [],
    className = "heading heading--h2 heading--services text-appear",
    extraClass = "",
  },
  ref,
) {
  const mergedClass = [className, extraClass].filter(Boolean).join(" ");

  return (
    <h3 ref={ref} className={mergedClass}>
      {lines.map((line, index) => (
        <span key={index} className="text-appear__line-mask" aria-hidden>
          <span
            className="text-appear__line"
            style={{ "--delay": `${LINE_STAGGER * index}s` } as React.CSSProperties}
          >
            {renderLineWithAccents(line, accentWords)}
          </span>
        </span>
      ))}
    </h3>
  );
});

export function animateTextAppear(element: HTMLElement | null) {
  if (!element) return;
  element.classList.add("text-appear--transition");
  window.setTimeout(() => {
    element.classList.add("text-appear--appeared");
  }, 10);
}

export function resetTextAppear(element: HTMLElement | null) {
  if (!element) return;
  element.classList.remove("text-appear--transition", "text-appear--appeared");
  element.classList.add("text-appear");
}
