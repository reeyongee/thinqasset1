"use client";

import { Fragment, forwardRef, useImperativeHandle, useRef } from "react";

const WORD_STAGGER = 0.005;

type TextUnblurParagraphProps = {
  id: string;
  lines: readonly string[];
  /** Line indices after which the CMS inserts a `<br>` spacer. */
  breakAfter?: readonly number[];
  className?: string;
};

export const TextUnblurParagraph = forwardRef<
  HTMLDivElement,
  TextUnblurParagraphProps
>(function TextUnblurParagraph(
  { id, lines, breakAfter = [], className = "text text-unblur" },
  ref,
) {
  const innerRef = useRef<HTMLDivElement>(null);
  useImperativeHandle(ref, () => innerRef.current as HTMLDivElement);

  const breakSet = new Set(breakAfter);
  const fullText = lines.join(" ");
  let wordIndex = 0;

  return (
    <div ref={innerRef} id={id} className={className} aria-label={fullText}>
      {lines.map((line, lineIndex) => (
        <Fragment key={lineIndex}>
          <div className="text-unblur__line" aria-hidden>
            {line.split(/\s+/).map((word, indexInLine, words) => {
              const delay = wordIndex * WORD_STAGGER;
              wordIndex += 1;
              return (
                <Fragment key={`${lineIndex}-${word}-${indexInLine}`}>
                  <div
                    className="text-unblur__word"
                    style={{ "--delay": `${delay}s` } as React.CSSProperties}
                  >
                    {word}
                  </div>
                  {indexInLine < words.length - 1 ? " " : null}
                </Fragment>
              );
            })}
          </div>
          {breakSet.has(lineIndex) ? (
            <div className="text-unblur__stanza-gap" aria-hidden />
          ) : null}
        </Fragment>
      ))}
    </div>
  );
});
