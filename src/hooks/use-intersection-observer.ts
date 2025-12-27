"use client";

import { useEffect, useState, RefObject } from "react";

type Options = IntersectionObserverInit & {
  once?: boolean;
};

export function useIntersectionObserver(
  ref: RefObject<HTMLElement>,
  options?: Options
): boolean {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (options?.once) {
          if (entry.isIntersecting) {
            setIntersecting(true);
            observer.disconnect();
          }
        } else {
          setIntersecting(entry.isIntersecting);
        }
      },
      {
        threshold: 0.75,
        ...options,
      }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref, options]);

  return isIntersecting;
}
