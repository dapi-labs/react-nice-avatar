# Nice Avatar SVG for [Preact](https://preactjs.com/)

This is a fork of [react-nice-avatar][react-nice-avatar] which provide and handy way to generate beautiful SVG avatar.

![preview](../preview.png)

This package is about using it with [Preact](https://preactjs.com/).

## Usage

Install the lib

```sh
npm install @nice-avatar-svg/preact
```

```jsx
import NiceAvatar from "@nice-avatar-svg/preact";

import { Suspense } from "preact";

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

[react-nice-avatar]: https://github.com/dapi-labs/react-nice-avatar
