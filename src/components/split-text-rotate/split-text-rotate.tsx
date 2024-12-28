"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { round } from "@utils/numbers";
import { characters } from "@utils/text";
import { SplitTextRotateProps } from "./split-text-rotate.types";
import styles from "./split-text-rotate.module.scss";

const DEFAULT_DURATION = 0.25;
const DEFAULT_STAGGER = 0.025;

export function SplitTextRotate({ text, rotateOptions }: SplitTextRotateProps) {
  const [hasBeenMounted, setHasBeenMounted] = useState(false);

  const splittedText = useMemo(() => characters(text), [text]);

  const { transitionDuration, transitionStagger } = useMemo(
    () => ({
      transitionDuration: rotateOptions?.duration || DEFAULT_DURATION,
      transitionStagger: rotateOptions?.stagger || DEFAULT_STAGGER,
    }),
    [rotateOptions]
  );

  const delays = useCallback(
    (index: number) => {
      const noElementsZeroBased = splittedText.length - 1;
      return {
        in: round(transitionStagger * index, 3),
        out: round(transitionStagger * (noElementsZeroBased - index), 3),
      };
    },
    [splittedText, transitionStagger]
  );

  useEffect(() => {
    setHasBeenMounted(true);
  }, []);

  return (
    <span
      className={styles["text"]}
      style={
        {
          "--var-duration": `${transitionDuration}s`,
        } as React.CSSProperties
      }
    >
      {hasBeenMounted ? (
        <>
          <span className={styles["sr-only"]}>{text}</span>

          {Array.from({ length: 2 }).map((_, i) => (
            <span key={i} className={styles["container"]} aria-hidden="true">
              {splittedText.map((char, i) => {
                const charDelays = delays(i);
                return (
                  <span
                    key={i}
                    className={styles["char"]}
                    aria-hidden="true"
                    style={
                      {
                        "--var-delay-in": `${charDelays.in}s`,
                        "--var-delay-out": `${charDelays.out}s`,
                      } as React.CSSProperties
                    }
                  >
                    {char}
                  </span>
                );
              })}
            </span>
          ))}
        </>
      ) : (
        <span>{text}</span>
      )}
    </span>
  );
}
