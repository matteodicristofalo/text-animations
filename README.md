# @matteodicristofalo/text-animations

This library provides a set of React components to animate text

# Installation

```bash
npm install @matteodicristofalo/text-animations
# or
yarn add @matteodicristofalo/text-animations
# or
pnpm add @matteodicristofalo/text-animations
```

# Usage

The first thing to do in order to use this library is to import its CSS.

The following example is for a Next.js App but you can apply the same concept for different frameworks

```js
// app/layout.tsx

...
import "@matteodicristofalo/text-animations/index.css";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
```

Once imported the CSS you can use the React components.

## SplitTextReveal

```js
"use client";

import { SplitTextReveal } from "@matteodicristofalo/text-animations";

export function MyComponent() {
  return (
    <h1>
      <SplitTextReveal text="Hello World" />
    </h1>
  );
}
```

You can decide how to split the text between one of this options:

- char (default)
- word
- sentence

```js
<SplitTextReveal text="Hello World" splitType="word" />
```

You can also configure the reveal animation by specifying:

- duration (number in seconds)
- stagger (number in seconds)
- threshold (number between 0 and 1)
- once (boolean)

```js
"use client";

import { useMemo } from "react";
import { SplitTextReveal } from "@matteodicristofalo/text-animations";

export function MyComponent() {
  const revealOptions = useMemo(
    () => ({
      duration: 1,
      stagger: 0.5,
      threshold: 0.75,
      once: false,
    }),
    []
  );

  return (
    <h1>
      <SplitTextReveal text="Hello World" revealOptions={revealOptions} />
    </h1>
  );
}
```

## SplitTextRotate

```js
"use client";

import { SplitTextRotate } from "@matteodicristofalo/text-animations";

export function MyComponent() {
  return (
    <h1>
      <SplitTextRotate text="Hello World" />
    </h1>
  );
}
```

This component split always by char, the only thing you can configure is the rotate animation

```js
"use client";

import { useMemo } from "react";
import { SplitTextRotate } from "@matteodicristofalo/text-animations";

export function MyComponent() {
  const rotateOptions = useMemo(
    () => ({
      duration: 1,
      stagger: 0.5,
    }),
    []
  );

  return (
    <h1>
      <SplitTextRotate text="Hello World" rotateOptions={rotateOptions} />
    </h1>
  );
}
```
