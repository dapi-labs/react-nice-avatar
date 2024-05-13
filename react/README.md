# Nice Avatar SVG for [React](https://github.com/facebook/react/)

This is a fork of [react-nice-avatar][react-nice-avatar] which provide and handy way to generate beautiful SVG avatar.

![preview](../preview.png)

This package is about using it with [React](https://github.com/facebook/react/)

## Usage

Install the lib

```sh
npm install @nice-avatar-svg/react
```

```jsx
import NiceAvatar from "@nice-avatar-svg/react";

import { Suspense } from "react";

export default function App() {
  return (
    <Suspens fallback={"Loading..."}>
      <NiceAvatar
        bgColor="#6BD9E9"
        hairColor="#9287FF"
        shirtColor="#F4D150"
        skinColor="#F9C9B6"
        earSize="big"
        hairStyle="dannyPhantom"
        noseStyle="curve"
        glassesStyle="round"
        eyesStyle="smiling"
        facialHairStyle="beard"
        mouthStyle="laughing"
        shirtStyle="collared"
        earRing="loop"
        eyebrowsStyle="up"
      />
    </Suspens>
  );
}
```
