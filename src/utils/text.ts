export function sentences(text: string) {
  return segment(text, "sentence");
}

export function words(text: string) {
  return segment(text, "word");
}

export function characters(text: string) {
  return segment(text, "grapheme");
}

export function segment(
  text: string,
  granularity: "sentence" | "word" | "grapheme"
) {
  const segmenter = new Intl.Segmenter(undefined, { granularity });
  return Array.from(segmenter.segment(text), (segment) => segment.segment);
}
