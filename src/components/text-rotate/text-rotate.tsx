"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { round } from "@utils/numbers";
import { characters } from "@utils/text";
import { generateJsxVariations } from "@utils/jsx";
import styles from "./text-rotate.module.scss";

const DEFAULT_DURATION = 0.25;
const DEFAULT_STAGGER = 0.025;

function TextRotate({
  text,
  animation,
}: {
  text: string;
  animation?: Partial<{
    duration: number;
    stagger: number;
  }>;
}) {
  const [hasBeenMounted, setHasBeenMounted] = useState(false);

  const splittedText = useMemo(() => characters(text), [text]);

  const { duration, stagger } = useMemo(
    () => ({
      duration: animation?.duration || DEFAULT_DURATION,
      stagger: animation?.stagger || DEFAULT_STAGGER,
    }),
    [animation]
  );

  const delays = useCallback(
    (index: number) => {
      const noElementsZeroBased = splittedText.length - 1;
      return {
        in: round(stagger * index, 3),
        out: round(stagger * (noElementsZeroBased - index), 3),
      };
    },
    [splittedText, stagger]
  );

  useEffect(() => {
    setHasBeenMounted(true);
  }, []);

  return (
    <span
      className={styles["text"]}
      style={
        {
          "--var-duration": `${duration}s`,
        } as React.CSSProperties
      }
    >
      {hasBeenMounted ? (
        <>
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

const textRotate = generateJsxVariations(TextRotate);

export { textRotate };
