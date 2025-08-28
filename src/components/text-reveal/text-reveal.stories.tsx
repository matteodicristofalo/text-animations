import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { textReveal } from "./text-reveal";

const meta = {
  title: "textReveal",
  component: textReveal.h1,
  argTypes: {
    text: {
      control: "text",
    },
    splitType: {
      control: "radio",
      options: ["char", "word", "sentence"],
    },
    animation: {
      control: {
        type: "object",
      },
    },
  },
  args: {
    text: "Here is the revealed text",
    splitType: "char",
  },
} satisfies Meta<typeof textReveal.h1>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SplitByWord: Story = {
  args: {
    splitType: "word",
  },
};

export const SplitBySentence: Story = {
  args: {
    splitType: "sentence",
  },
};

export const Duration: Story = {
  args: {
    animation: {
      duration: 1,
    },
  },
};

export const Delay: Story = {
  args: {
    animation: {
      delay: 1,
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

export const Threshold: Story = {
  args: {
    animation: {
      threshold: 0.75,
    },
  },
  render: (args) => {
    return (
      <>
        <div style={{ marginBottom: "100vh" }}>Scroll to reveal the text</div>

        <textReveal.h1 {...args} />
      </>
    );
  },
};

export const MultipleTimes: Story = {
  args: {
    animation: {
      once: false,
    },
  },
  render: (args) => {
    return (
      <>
        <div style={{ marginBottom: "100vh" }}>Scroll to reveal the text</div>

        <textReveal.h1 {...args} />
      </>
    );
  },
};
