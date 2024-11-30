import type { Meta, StoryObj } from "@storybook/react";
import { SplitTextReveal } from "./split-text-reveal";

const meta = {
  title: "SplitTextReveal",
  component: SplitTextReveal,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    text: {
      control: "text",
    },
    splitType: {
      control: "radio",
      options: ["char", "word", "sentence"],
    },
    revealOptions: {
      control: {
        type: "object",
      },
    },
  },
} satisfies Meta<typeof SplitTextReveal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: "Here is the revealed text",
    splitType: "char",
  },
};
