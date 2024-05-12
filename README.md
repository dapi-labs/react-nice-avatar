## Nice Avatar SVG

This is a fork of [react-nice-avatar][react-nice-avatar] which provide and handy way to generate beautiful SVG avatar.

![preview](./preview.png)

## Major differences

1. Produce a 100% standard SVG icon, and don't mix HTML/CSS
2. export [Web Component][web-components] which make it compatible with any/no frontend frameworks
3. expose a `render` method to generate the SVG on server side easily
4. Use [Preact](https://preactjs.com/) with [lazy loading](https://react.dev/reference/react/lazy): the image will load only needed SVG parts

## Usage

Install the lib

```sh
npm install react-nice-avatar
```

### With [Preact](https://preactjs.com/)

```jsx
import NiceAvatar, { COLOR } from "nice-avatar-svg/preact";
import { COLORS } from "nice-avatar-svg/constants";
import { Suspense } from "react";

export default function App() {
  return (
    <Suspens fallback={"Loading..."}>
      <NiceAvatar
        bgColor={COLORS.Salmon}
        hairColor={COLORS.Lavender}
        shirtColor={COLORS.Canary}
        skinColor={COLORS.Apricot}
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

### As [Web Component][web-components]

```html
<script type="module" src=".../nice-avatar-svg/element"></script>

<nice-avatar
  bgColor="azure"
  earSize="small"
  eyesStyle="base"
  facialHairStyle=""
  hairColor="red"
  hairStyle="pixie"
  mouthStyle="smile"
  noseStyle="round"
  shirtColor="#ffff"
  shirtStyle="open"
  skinColor="coral"
  glassesStyle="round"
  shape="circle"
></nice-avatar>
```

### With renderer

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
