import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { SplitTextRotate } from "./split-text-rotate";

const meta = {
  title: "SplitTextRotate",
  component: SplitTextRotate,
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
  args: {
    text: "Rotating text",
  },
  render: (args) => {
    return (
      <h3>
        <SplitTextRotate {...args} />
      </h3>
    );
  },
} satisfies Meta<typeof SplitTextRotate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Duration: Story = {
  args: {
    rotateOptions: {
      duration: 1,
    },
  },
};

export const Stagger: Story = {
  args: {
    rotateOptions: {
      stagger: 0.05,
    },
  },
};
