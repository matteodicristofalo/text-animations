import React, { useCallback, useMemo } from "react";
import { round } from "@utils/numbers";
import { characters } from "@utils/text";
import { generateJsxVariations } from "@utils/jsx";
import { WithTag } from "@utils/types";
import { useIsHydrated } from "@hooks";
import styles from "./text-rotate.module.scss";

const DEFAULT_DURATION = 0.25;
const DEFAULT_STAGGER = 0.025;

type TextRotateProps = WithTag<{
  text: string;
  animation?: Partial<{
    duration: number;
    stagger: number;
  }>;
}>;

function TextRotate(props: TextRotateProps) {
  const isHydrated = useIsHydrated();

  if (isHydrated === false) {
    return <TextRotateServer {...props} />;
  }

  return <TextRotateClient {...props} />;
}

function TextRotateServer({ tag: Tag, text }: TextRotateProps) {
  return <Tag>{text}</Tag>;
}

function TextRotateClient({ tag: Tag, text, animation }: TextRotateProps) {
  const chars = useMemo(() => characters(text), [text]);

  const { duration, stagger } = useMemo(
    () => ({
      duration: animation?.duration || DEFAULT_DURATION,
      stagger: animation?.stagger || DEFAULT_STAGGER,
    }),
    [animation]
  );

  const delays = useCallback(
    (index: number) => {
      const noElementsZeroBased = chars.length - 1;
      return {
        in: round(stagger * index, 3),
        out: round(stagger * (noElementsZeroBased - index), 3),
      };
    },
    [chars, stagger]
  );

  return (
    <Tag
      className={styles["text"]}
      style={
        {
          "--var-duration": `${duration}s`,
        } as React.CSSProperties
      }
      aria-label={text}
    >
      {Array.from({ length: 2 }).map((_, i) => (
        <span key={i} className={styles["container"]} aria-hidden="true">
          {chars.map((char, i) => {
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
    </Tag>
  );
}

const textRotate = generateJsxVariations(TextRotate);

export { textRotate };
