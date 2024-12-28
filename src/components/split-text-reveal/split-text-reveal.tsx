"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { clamp, round } from "@utils/numbers";
import { characters, sentences, words } from "@utils/text";
import { useIntersectionObserver } from "@hooks";
import { SplitTextRevealProps } from "./split-test-reveal.types";
import clsx from "clsx";
import styles from "./split-text-reveal.module.scss";

const DEFAULT_DURATION = 0.5;
const DEFAULT_STAGGER = 0.01;
const MIN_THRESHOLD = 0;
const MAX_THRESHOLD = 1;
const DEFAULT_THRESHOLD = 0.25;

export function SplitTextReveal({
  text,
  splitType = "char",
  revealOptions,
}: SplitTextRevealProps) {
  const ref = useRef(null);

  const [hasBeenMounted, setHasBeenMounted] = useState(false);

  const memoizedOptions = useMemo(() => {
    const once = revealOptions?.once ?? true;
    const threshold = revealOptions?.threshold
      ? clamp(revealOptions.threshold, MIN_THRESHOLD, MAX_THRESHOLD)
      : DEFAULT_THRESHOLD;
    return {
      once,
      threshold,
    };
  }, [revealOptions]);

  const isInView = useIntersectionObserver(ref, memoizedOptions);

  const transitionDuration = revealOptions?.duration || DEFAULT_DURATION;
  const transitionStagger = revealOptions?.stagger || DEFAULT_STAGGER;

  const splittedText = useMemo(() => {
    switch (splitType) {
      case "sentence":
        return sentences(text);
      case "word":
        return words(text);
      case "char":
        return characters(text);
    }
  }, [splitType, text]);

  useEffect(() => {
    setHasBeenMounted(true);
  }, []);

  return (
    <span
      ref={ref}
      className={clsx(styles["text"], { [styles["animate"]]: isInView })}
      style={
        {
          "--var-duration": `${transitionDuration}s`,
        } as React.CSSProperties
      }
    >
      {hasBeenMounted ? (
        <>
          <span className={styles["sr-only"]}>{text}</span>

          {splittedText.map((el, i) => (
            <span key={i} className={styles["container"]} aria-hidden="true">
              <span
                aria-hidden="true"
                style={
                  {
                    "--var-delay": `${round(transitionStagger * i, 3)}s`,
                  } as React.CSSProperties
                }
              >
                {el}
              </span>
            </span>
          ))}
        </>
      ) : (
        <span className={styles["is-hidden"]}>{text}</span>
      )}
    </span>
  );
}
