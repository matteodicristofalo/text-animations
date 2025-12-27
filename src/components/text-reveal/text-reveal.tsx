"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { clamp, round } from "@utils/numbers";
import { characters, sentences, words } from "@utils/text";
import { useIntersectionObserver } from "@hooks";
import { generateJsxVariations, HtmlTextElementTag } from "@utils/jsx";
import clsx from "clsx";
import styles from "./text-reveal.module.scss";

const DEFAULT_DURATION = 0.5;
const DEFAULT_STAGGER = 0.01;
const MIN_THRESHOLD = 0;
const MAX_THRESHOLD = 1;
const DEFAULT_THRESHOLD = 0.25;

function TextReveal({
  tag: Tag,
  text,
  splitType = "char",
  animation,
}: {
  tag: HtmlTextElementTag;
  text: string;
  splitType?: "sentence" | "word" | "char";
  animation?: Partial<{
    duration: number;
    delay: number;
    stagger: number;
    threshold: number;
    once: boolean;
  }>;
}) {
  const ref = useRef(null);

  const [hasBeenMounted, setHasBeenMounted] = useState(false);

  const intersectionObserverOptions = useMemo(() => {
    const once = animation?.once ?? true;

    const threshold = animation?.threshold
      ? clamp(animation.threshold, MIN_THRESHOLD, MAX_THRESHOLD)
      : DEFAULT_THRESHOLD;

    return {
      once,
      threshold,
    };
  }, [animation]);

  const isInView = useIntersectionObserver(ref, intersectionObserverOptions);

  const duration = animation?.duration || DEFAULT_DURATION;
  const stagger = animation?.stagger || DEFAULT_STAGGER;

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
    <Tag
      ref={ref}
      className={clsx(styles["text"], { [styles["animate"]]: isInView })}
      style={
        {
          "--var-duration": `${duration}s`,
        } as React.CSSProperties
      }
      aria-label={text}
    >
      {hasBeenMounted ? (
        <>
          {splittedText.map((el, i) => (
            <span key={i} className={styles["container"]} aria-hidden="true">
              <span
                aria-hidden="true"
                style={
                  {
                    "--var-delay": `${animation?.delay ?? 0}s`,
                    "--var-stagger": `${round(stagger * i, 3)}s`,
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
    </Tag>
  );
}

const textReveal = generateJsxVariations(TextReveal);

export { textReveal };
