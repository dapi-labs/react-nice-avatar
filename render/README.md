# Nice Avatar SVG

This is a fork of [react-nice-avatar][react-nice-avatar] which provide and handy way to generate beautiful SVG avatar.

![preview](./preview.png)

## Usage

Install the lib

```sh
npm install @nice-avatar-svg/render
```

And then call the function to get the SVG image.

```js
import render from "nice-avatar-svg/render";
import { COLORS } from "nice-avatar-svg/constants";

const svg = await render({
  bgColor: COLORS.Azure,
  earSize: "small",
  eyesStyle: "base",
  facialHairStyle: undefined,
  hairColor: COLORS.Coast,
  hairStyle: "pixie",
  mouthStyle: "smile",
  noseStyle: "round",
  shirtColor: COLORS.Canary,
  shirtStyle: "open",
  skinColor: COLORS.Apricot,
  earRing: false,
  eyebrowsStyle: "up",
  glassesStyle: "round",
  shape: "circle",
});
```

[react-nice-avatar]: https://github.com/dapi-labs/react-nice-avatar
[web-components]: https://developer.mozilla.org/en-US/docs/Web/API/Web_components
