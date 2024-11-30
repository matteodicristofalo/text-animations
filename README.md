# @mdc/text-animations

This library provides a set of React components to animate text

# Installation

```bash
npm install @mdc/text-animations
# or
yarn add @mdc/text-animations
# or
pnpm add @mdc/text-animations
```

# Usage

The first thing to do in order to use this library is to import it's CSS.

The following example is for a Next.js App but you can apply the same concept for different frameworks

```js
// app/layout.tsx

...
import "@mdc/text-animations/index.css";


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

## SplitTextRevel

```js
"use client";

import { SplitTextRevel } from "@mdc/text-animations";

export function MyComponent() {
  return (
    <h1>
      <SplitTextRevel text="Hello World" />
    </h1>
  );
}
```

You can also choose how to split the text between one of this options:

- char
- word
- sentence

```js
<SplitTextRevel text="Hello World" splitType="word" />
```

You can also configure the reveal animation by specifying:

- duration
- stagger

```js
"use client";

import { useMemo } from "react";
import { SplitTextRevel } from "@mdc/text-animations";

export function MyComponent() {
  const revealOptions = useMemo(
    () => ({
      duration: 1,
      stagger: 0.5,
    }),
    []
  );

  return (
    <h1>
      <SplitTextRevel text="Hello World" revealOptions={revealOptions} />
    </h1>
  );
}
```

## SplitTextRotate

```js
"use client";

import { SplitTextRotate } from "@mdc/text-animations";

export function MyComponent() {
  return (
    <h1>
      <SplitTextRotate text="Hello World" />
    </h1>
  );
}
```

Also here you can configure the aniimation

```js
"use client";

import { useMemo } from "react";
import { SplitTextRotate } from "@mdc/text-animations";

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
