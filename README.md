# react-nice-avatar

[![Version](http://img.shields.io/npm/v/react-nice-avatar.svg)](https://www.npmjs.org/package/react-nice-avatar)
[![npm download][download-image]][download-url]

[download-image]: https://img.shields.io/npm/dm/react-nice-avatar.svg?style=flat-square
[download-url]: https://npmjs.org/package/react-nice-avatar

<img width="600" alt="imagewall" src="https://user-images.githubusercontent.com/5305874/120076504-68e15980-c0d8-11eb-896c-3824b5eb05bb.png">

## Online editor / preview
* https://nice-avatar.chilllab.io/

## Assets
* Designer: [Micah](https://www.figma.com/@Micah)
* Figma files: https://www.figma.com/community/file/829741575478342595

## Installation

```
npm install react-nice-avatar
```

or

```
yarn add react-nice-avatar
```

## Usage
1. Import the component

```js
import Avatar, { genConfig } from 'react-nice-avatar'
```

2. Generate random config, the config can be saved into your database to use later


```js
const config = genConfig(AvatarConfig?)
```

3. Render the component with specific width / height and configuration


```js
<Avatar style={{ width: '8rem', height: '8rem' }} {...config} />

or

<Avatar className="w-32 h-32" {...config} />
```

## Options

The options can be passed into genConfig or as React props

|key|type|default|accept|tips
|---|---|---|---|---|
|id|string| | | Only for React Props
|className|string| | | Only for React Props
|style|object| | | Only for React Props
|shape|string|circle|circle, rounded, square| Only for React Props
|sex| string | | man, woman
|faceColor| string |
|earSize| string | | small, big
|hairColor| string |
|hairStyle| string | | normal, thick, mohawk, womanLong, womanShort
|eyeStyle| string | | circle, oval, smile
|glassesStyle| string | | none, round, square | Usually is none
|noseStyle| string | | short, long, round
|mouthStyle| string | | laugh, smile, peace
|shirtStyle| string | | hoody, short, polo
|shirtColor| string |
|bgColor| string |

## Development

1. `$ git clone git@github.com:chilllab/react-nice-avatar.git`: Clone the codebase
2. `$ yarn` or `$ npm install`: Install dependencies
3. `$ make dev`: Star the server for the demo
4. `$ open http://localhost:5555`: Open the browser to reivew the demo
5. Edit the files inside `/src`

## License

MIT
