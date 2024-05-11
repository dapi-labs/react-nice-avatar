## Nice Avatar SVG

This is a fork of [react-nice-avatar][react-nice-avatar] which provide and handy way to generate beautiful SVG avatar.

![preview](./preview.png)

## Major differences

1. Produce a 100% standard SVG icon, and don't mix HTML/CSS
2. export [Web Component][web-components] which make it compatible with any/no frontend frameworks
3. expose a `render` method to generate the SVG on server side easily
4. Use Solid.js with [lazy loading](https://docs.solidjs.com/reference/component-apis/lazy): it's much smaller

## Usage

Install the lib

```sh
npm install react-nice-avatar
```

### With [Solid.js](https://www.solidjs.com/)

```jsx
import NiceAvatar, { COLOR } from "nice-avatar-svg/solid";

export default function App() {
  return (
    <div>
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
    </div>
  );
}
```

### As [Web Component][web-components]

```html
<script type="module" src=".../nice-avatar-svg/element"></script>

<nice-avatar
  bg-color="azure"
  ear-size="small"
  eyes-style="base"
  facial-hair-style=""
  hair-color="red"
  hair-style="pixie"
  mouth-style="smile"
  nose-style="round"
  shirt-color="#ffff"
  shirt-style="open"
  skin-color="coral"
  glasses-style="round"
  shape="circle"
></nice-avatar>
```

### With renderer

⚠️ Still WIP, doesn't work when `document` is not defined

```js
import render, { COLOR } from "nice-avatar-svg/render";

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
