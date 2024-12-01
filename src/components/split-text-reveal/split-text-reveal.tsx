"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { round } from "@utils/numbers";
import { characters, sentences, words } from "@utils/text";
import { useIntersectionObserver } from "@hooks";
import { SplitTextRevealProps } from "./split-test-reveal.types";
import clsx from "clsx";
import styles from "./split-text-reveal.module.scss";

const DEFAULT_DURATION = 0.5;
const DEFAULT_STAGGER = 0.01;

export function SplitTextReveal({
  text,
  splitType = "char",
  revealOptions,
}: SplitTextRevealProps) {
  const [hasBeenMounted, setHasBeenMounted] = useState(false);

  const ref = useRef(null);
  const memoizedOptions = useMemo(() => ({ once: true, threshold: 0.1 }), []);
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
        splittedText.map((el, i) => (
          <span key={i} className={styles["container"]}>
            <span
              style={
                {
                  "--var-delay": `${round(transitionStagger * i, 3)}s`,
                } as React.CSSProperties
              }
            >
              {el}
            </span>
          </span>
        ))
      ) : (
        <span className={styles["is-hidden"]}>{text}</span>
      )}
    </span>
  );
}
