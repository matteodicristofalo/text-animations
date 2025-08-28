import type { Meta, StoryObj } from "@storybook/react";
import { textRotate } from "./text-rotate";

const meta = {
  title: "textRotate",
  component: textRotate.h1,
  argTypes: {
    text: {
      control: "text",
    },
    animation: {
      control: {
        type: "object",
      },
    },
  },
  args: {
    text: "Rotating text",
  },
} satisfies Meta<typeof textRotate.h1>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Duration: Story = {
  args: {
    animation: {
      duration: 1,
    },
  },
};

export const Stagger: Story = {
  args: {
    animation: {
      stagger: 0.05,
    },
  },
};
