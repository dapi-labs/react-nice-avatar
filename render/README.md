# Nice Avatar SVG

This is a fork of [react-nice-avatar][react-nice-avatar] which provide and handy way to generate beautiful SVG avatar.

![preview](../preview.png)

## Usage

Install the lib

```sh
npm install @nice-avatar-svg/render
```

And then call the function to get the SVG image.

```js
import render from "nice-avatar-svg/render";

const svg = await render({
  bgColor: "#D2EFF3",
  earSize: "small",
  eyesStyle: "base",
  facialHairStyle: undefined,
  hairColor: "#AC6651",
  hairStyle: "pixie",
  mouthStyle: "smile",
  noseStyle: "round",
  shirtColor: "#F4D150",
  shirtStyle: "open",
  skinColor: "#F9C9B6",
  earRing: false,
  eyebrowsStyle: "up",
  glassesStyle: "round",
  shape: "circle",
});
```

[react-nice-avatar]: https://github.com/dapi-labs/react-nice-avatar
[web-components]: https://developer.mozilla.org/en-US/docs/Web/API/Web_components
