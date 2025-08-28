import React from "react";

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

type HtmlTextElementTag = (typeof htmlTextElementTags)[number];

export function generateJsxVariations<Props>(component: React.FC<Props>): {
  [k in HtmlTextElementTag]: React.FC<Props>;
} {
  return htmlTextElementTags.reduce((variations, Tag) => {
    variations[Tag] = (props: Props) => <Tag>{component(props)}</Tag>;
    return variations;
  }, {} as { [k in HtmlTextElementTag]: React.FC<Props> });
}
