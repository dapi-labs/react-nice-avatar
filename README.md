# Nice Avatar SVG

This is a fork of [react-nice-avatar][react-nice-avatar] which provide and handy way to generate beautiful SVG avatar.

![preview](./preview.png)

## Why?

The major differences with [react-nice-avatar][react-nice-avatar] are:

1. Produce a 100% standard SVG icon, and don't mix HTML/CSS. So you can use image on all platforms where SVG is supported (web, mobile, etc..)
2. Use [lazy loading](https://react.dev/reference/react/lazy): the image will load only needed SVG parts
3. Support many stacks
   1. For Preact: `npm i @nice-avatar-svg/preact` (see [README](./preact/README.md))
   2. For React: `npm i @nice-avatar-svg/react` (see [README](./react/README.md))
   3. For Solid: `npm i @nice-avatar-svg/solid` (see [README](solid/README))
   4. As [Web Component][web-components]: `npm i @nice-avatar-svg/element` (see [README](./element/README.md))
   5. As a plain function: `npm i @nice-avatar-svg/render` (see [README](./render/README.md))

## How?

This monorepo expose plain JSX components in `shared` folder. It means that any frontend frameworks using JSX as template language can compile them.

Check [how.md](./how.md) for more informations.

[react-nice-avatar]: https://github.com/dapi-labs/react-nice-avatar
[web-components]: https://developer.mozilla.org/en-US/docs/Web/API/Web_components
