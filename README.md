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

## textReveal

```js
"use client";

import { textReveal } from "@matteodicristofalo/text-animations";

export function MyComponent() {
  return (
    <>
      <textReveal.h1 text="Hello World" />
      <textReveal.h2 text="Hello World" />
      <textReveal.p text="Hello World" />
      <textReveal.span text="Hello World" />
    </>
  );
}
```

You can decide how to split the text between one of this options:

- char (default)
- word
- sentence

```js
<textReveal.h1 text="Hello World" splitType="word" />
```

You can also configure the reveal animation by specifying:

- duration (number in seconds)
- stagger (number in seconds)
- threshold (number between 0 and 1)
- once (boolean)

```js
"use client";

import { useMemo } from "react";
import { textReveal } from "@matteodicristofalo/text-animations";

export function MyComponent() {
  const animation = useMemo(
    () => ({
      duration: 1,
      stagger: 0.5,
      threshold: 0.75,
      once: false,
    }),
    []
  );

  return <textReveal.h1 text="Hello World" animation={animation} />;
}
```

## textRotate

```js
"use client";

import { textRotate } from "@matteodicristofalo/text-animations";

export function MyComponent() {
  return (
    <>
      <textRotate.h1 text="Hello World" />
      <textRotate.h1 text="Hello World" />
      <textRotate.p text="Hello World" />
      <textRotate.span text="Hello World" />
    </>
  );
}
```

This component split always by char, the only thing you can configure is the rotate animation

```js
"use client";

import { useMemo } from "react";
import { textRotate } from "@matteodicristofalo/text-animations";

export function MyComponent() {
  const animation = useMemo(
    () => ({
      duration: 1,
      stagger: 0.5,
    }),
    []
  );

  return <textRotate.h1 text="Hello World" animation={animation} />;
}
```
