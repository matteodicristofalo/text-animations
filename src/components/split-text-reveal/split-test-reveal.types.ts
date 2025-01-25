export type SplitTextRevealProps = {
  text: string;
  splitType?: SplitType;
  revealOptions?: Partial<RevealOptions>;
};

type SplitType = "sentence" | "word" | "char";

type RevealOptions = {
  duration: number;
  delay: number;
  stagger: number;
  threshold: number;
  once: boolean;
};
