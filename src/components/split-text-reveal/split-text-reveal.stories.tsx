import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { SplitTextReveal } from "./split-text-reveal";

const meta = {
  title: "SplitTextReveal",
  component: SplitTextReveal,
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
  args: {
    text: "Here is the revealed text",
    splitType: "char",
  },
  render: (args) => {
    return (
      <h1>
        <SplitTextReveal {...args} />
      </h1>
    );
  },
} satisfies Meta<typeof SplitTextReveal>;

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
    revealOptions: {
      duration: 1,
    },
  },
};

export const Stagger: Story = {
  args: {
    revealOptions: {
      stagger: 0.05,
    },
  },
};

export const Threshold: Story = {
  args: {
    revealOptions: {
      threshold: 0.75,
    },
  },
  render: (args) => {
    return (
      <>
        <div style={{ marginBottom: "100vh" }}>Scroll to reveal the text</div>

        <h1 style={{ background: "lightcoral" }}>
          <SplitTextReveal {...args} />
        </h1>
      </>
    );
  },
};

export const NotOnce: Story = {
  args: {
    revealOptions: {
      once: false,
    },
  },
  render: (args) => {
    return (
      <>
        <div style={{ marginBottom: "100vh" }}>Scroll to reveal the text</div>

        <h1 style={{ background: "lightcoral" }}>
          <SplitTextReveal {...args} />
        </h1>
      </>
    );
  },
};
