export type SplitTextRevealProps = {
  text: string;
  splitType?: SplitType;
  revealOptions?: Partial<RevealOptions>;
};

type SplitType = "sentence" | "word" | "char";

type RevealOptions = {
  duration: number;
  stagger: number;
};
