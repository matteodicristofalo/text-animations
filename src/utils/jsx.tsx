import React from "react";
import { WithoutTag } from "./types";

const htmlTextElementTags = [
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "p",
  "span",
] as const;

export type HtmlTextElementTag = (typeof htmlTextElementTags)[number];

export function generateJsxVariations<
  Props extends { tag: HtmlTextElementTag }
>(
  Component: React.FC<Props>
): {
  [k in HtmlTextElementTag]: React.FC<WithoutTag<Props>>;
} {
  return htmlTextElementTags.reduce((variations, tag) => {
    variations[tag] = (props: WithoutTag<Props>) => (
      <Component {...(props as Props)} tag={tag} />
    );
    return variations;
  }, {} as { [k in HtmlTextElementTag]: React.FC<WithoutTag<Props>> });
}
