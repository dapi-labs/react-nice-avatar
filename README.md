# react-nice-avatar

[![Version](http://img.shields.io/npm/v/react-nice-avatar.svg)](https://www.npmjs.org/package/react-nice-avatar)
[![npm download][download-image]][download-url]
[![Build Status](https://app.travis-ci.com/dapi-labs/react-nice-avatar.svg?branch=main)](https://app.travis-ci.com/github/dapi-labs/react-nice-avatar)
[![Netlify Status](https://api.netlify.com/api/v1/badges/df23baf6-daac-4ce5-a0b6-5baade2cb822/deploy-status)](https://app.netlify.com/sites/gracious-turing-db4aa3/deploys)

[download-image]: https://img.shields.io/npm/dm/react-nice-avatar.svg?style=flat-square
[download-url]: https://npmjs.org/package/react-nice-avatar

<div align="center">
    <a href="https://nice-avatar.chilllab.io/">
        <img src="https://user-images.githubusercontent.com/5305874/131275587-a6f44325-cb18-4a1c-8a1c-785942e751e7.png" 
             width="600" alt="imagewall" />
    </a>
</div>

## Online editor / preview

- https://nice-avatar.wwayne.com

## Assets

- Designer: [@Micah](https://www.figma.com/@Micah) on Figma
- Figma files: [Avatar Illustration System](https://www.figma.com/community/file/829741575478342595)

## Installation

```sh
npm install react-nice-avatar
```

or

```sh
yarn add react-nice-avatar
```

## Usage

1. Import the component.
    ```js
    import Avatar, { genConfig } from 'react-nice-avatar'
    ```
2. Generate a configuration
   
    Config can be generated with a seed, a seed is a string of name, email or any string you like
    ```js
    const config = genConfig("hi@dapi.to") 
    ```
    
    or it can be generate with a customized object, plz check the Options below for what attributes can be passed in
    ```js
    const config = genConfig({ sex: "man", hairStyle: "mohawk" }) 
    ```
    
    or generating a random config by passing nothing to the function genConfig
    ```js
    const config = genConfig() 
    ```
    
3. Render the component with specific width / height and configuration.
    ```jsx
    <Avatar style={{ width: '8rem', height: '8rem' }} {...config} />
    ```
    or
    
    ```jsx
    <Avatar className="w-32 h-32" {...config} />
    ```

## Options

The options can be passed into genConfig or as React props

| key            | type   | default | accept                                       | tips                 |
| -------------- | ------ | ------- | -------------------------------------------- | -------------------- |
| `id`           | string |         |                                              | Only for React Props |
| `className`    | string |         |                                              | Only for React Props |
| `style`        | object |         |                                              | Only for React Props |
| `shape`        | string | circle  | circle, rounded, square                      | Only for React Props |
| `sex`          | string |         | man, woman                                   |                      |
| `faceColor`    | string |         |                                              |                      |
| `earSize`      | string |         | small, big                                   |                      |
| `hairColor`    | string |         |                                              |                      |
| `hairStyle`    | string |         | normal, thick, mohawk, womanLong, womanShort |                      |
| `hairColorRandom` | boolean |  false   |                           | thick,mohawk default only be black |
| `hatColor`     | string |         |                                              |                      |
| `hatStyle`     | string |         | none, beanie, turban                         | Usually is none      |
| `eyeStyle`     | string |         | circle, oval, smile                          |                      |
| `glassesStyle` | string | | none, round, square, aviator | Existing aliases remain supported |
| `glassesMode` | string | transparent | transparent, tinted, dark | Applies to all three shapes |
| `glassesColor` | string | #ADBFFF | CSS color | Tinted lenses use 32% opacity |
| `eyeBrowStyle` | string | | up, upWoman, unibrow | Original automatic selection when omitted |
| `noseStyle`    | string |         | short, long, round                           |                      |
| `mouthStyle`   | string |         | laugh, smile, peace                          |                      |
| `shirtStyle`   | string |         | hoody, short, polo                           |                      |
| `shirtColor`   | string |         |                                              |                      |
| `bgColor`      | string |         |                                              |                      |
| `isGradient`   | boolean |   false   |                                           |                      |

## Development

1. Clone the repo:
    ```sh
    $ git clone git@github.com:dapi-labs/react-nice-avatar.git
    $ cd react-nice-avatar
    ```
2. Install dependencies:
    ```sh
    $ yarn
    ```
3. Start the server for the demo:
    ```sh
    $ make dev
    ```
4. Open the browser to reivew the demo:
    ```sh
    $ open http://localhost:8080
    ```
5. Edit the files inside [src](/src).

## Test

1. Lint test:
    ```sh
    $ make lint-test
    ```

2. code test:
    ```sh
    $ make test
    ```

## Release

```sh
$ make release level=patch | minor | major | 1.3.0
```

## License

Released under [MIT](/LICENSE) by [@dapi-labs](https://github.com/dapi-labs).

## Extended avatar styles

16 curated presets, 10 new interchangeable hair/hat/eye options, facial hair
and a robot are available in this extension. See [the recipe](./RECETA.md)
for usage, the complete inventory and visual design rules.

### Glasses shape and finish

```tsx
<Avatar
  glassesStyle="aviator"
  glassesMode="tinted"
  glassesColor="#ADBFFF"
  eyeBrowStyle="unibrow"
/>
```

`round`, `square` and `aviator` each support `transparent`, `tinted` and `dark`. Omitting `glassesMode` keeps the original transparent appearance. `none` always hides glasses. Tint applies 32% opacity only to the lenses; the black frame stays opaque. Dark lenses retain the selected gray reflection and ignore the tint color.

Existing aliases remain valid: `roundDark`, `squareDark`, `aviatorDark` and `aviatorTinted`. An explicit `glassesMode` overrides an alias's implied finish. Existing explicit style values remain supported. The expanded random option pools can produce different avatars for seeds used with earlier releases. The editor offers separate shape, finish and tint controls, plus a brow selector.

### Original Figma library additions

Imported directly from the [Avatar Illustration System](https://www.figma.com/design/HjwULEwq8hpWuMEAe6kLcV/Avatar-Illustration-System--Community-?node-id=0-1). These additional variants preserve existing explicit values. The imported Figma variants are opt-in; other additions expand the random option pools.

| Prop | New values |
| --- | --- |
| `earringStyle` | `none` (default), `hoop`, `stud` |
| `mouthStyle` | `surprised`, `sad`, `frown`, `pucker`, `nervous` |
| `eyeBrowStyle` | `down`, `eyelashesDown` |
| `eyeStyle` | `eyeshadow` |
| `hairStyle` | `dougFunny`, `bald` (Mr Clean highlight) |
| `facialHairStyle` | `originalBeard`, `scruff` |

`earringColor` defaults to `#F4D150`; `eyeshadowColor` defaults to `#D2EFF3`. Hair and both imported beards use `hairColor`. `fullBeard`, `chinBeard` and `goatee` are available; `goateeV2` is a compatibility alias. Accessories are rendered only for human avatars.

```tsx
<NiceAvatar
  {...genConfig('my-avatar')}
  hairStyle="dougFunny"
  hatStyle="none"
  facialHairStyle="scruff"
  mouthStyle="nervous"
  eyeBrowStyle="down"
  eyeStyle="eyeshadow"
  eyeshadowColor="#D2EFF3"
  earringStyle="hoop"
  earringColor="#F4D150"
/>
```

The committed SVG sources and node provenance are in `assets/figma-originals/`. Regenerate the JSX with `python3 scripts/import-figma-originals.py`; no Figma access or temporary asset URLs are needed at runtime. See `RECETA.md` for alignment and layering.

### Additional configuration

- `avatarStyle`: `human` (default) or `robot`. Robot shell uses `faceColor`; eyes and accents use `shirtColor`.
- `facialHairStyle`: `none`, `mustache`, `handlebar`, `goatee`, `fullBeard`, `chinBeard`, `originalBeard`, `scruff`.
- Additional hair: `curly`, `bob`, `pixie`, `bun`, `buzz`; additional hat: `bucket`.
- Additional eyes: `wink`, `sleepy`, `sparkle`, `focused`, `eyeshadow`, `smileShadow`. Both shadow variants accept `eyeshadowColor`.
- Saved `curlyV2`, `bobV2`, `pixieV2`, `bunV2`, `buzzV2`, `goateeV2` and `beard` values normalize to their unversioned counterparts (`beard` becomes `fullBeard`).

The demo retains the original cycling controls and adds separate accessory and color rows. `preview/` contains the visual development archive, including superseded candidates; runtime artwork lives in `src/`.
