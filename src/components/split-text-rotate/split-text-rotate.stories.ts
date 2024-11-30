import type { Meta, StoryObj } from "@storybook/react";
import { SplitTextRotate } from "./split-text-rotate";

const meta = {
  title: "SplitTextRotate",
  component: SplitTextRotate,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    text: {
      control: "text",
    },
    rotateOptions: {
      control: {
        type: "object",
      },
    },
  },
} satisfies Meta<typeof SplitTextRotate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: "Rotating text",
  },
};
