export type SplitTextRotateProps = {
  text: string;
  rotateOptions?: Partial<RotateOptions>;
};

type RotateOptions = {
  duration: number;
  stagger: number;
};
