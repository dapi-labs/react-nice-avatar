# Nice Avatar SVG for [Solid.js](https://github.com/solidjs/solid)

This is a fork of [react-nice-avatar][react-nice-avatar] which provide and handy way to generate beautiful SVG avatar.

![preview](../preview.png)

This package is about using it with [Solid.js](https://github.com/solidjs/solid)

## Usage

Install the lib

```sh
npm install @nice-avatar-svg/solid
```

```jsx
import NiceAvatar, { COLOR } from "@nice-avatar-svg/solid";

export default function App() {
  return (
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
  );
}
```

[react-nice-avatar]: https://github.com/dapi-labs/react-nice-avatar
