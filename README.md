# react-nice-avatar

[![Version](http://img.shields.io/npm/v/react-nice-avatar.svg)](https://www.npmjs.org/package/react-nice-avatar)
[![npm download][download-image]][download-url]

[download-image]: https://img.shields.io/npm/dm/react-nice-avatar.svg?style=flat-square
[download-url]: https://npmjs.org/package/react-nice-avatar

<img width="800" alt="react-nice-avatar" src="https://user-images.githubusercontent.com/5305874/120075910-c1632780-c0d5-11eb-9d0a-74d97e2e7f19.gif">


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
const myConfig = genConfig(optObj?)
```

3. Render the component with config and width / height


```js
<Avatar style={{ width: '8rem', height: '8rem' }} {...config} />
```

or using className to set the width / height

```js
<Avatar className="w-32 h-32" {...config} />
```

## Options

The options can be passed into genConfig or on React props

|key|type|default|accept
|---|---|---|---|
|className|string|
|style|object|
|shape|string|circle|circle, rounded, square
|sex| string | | man, woman
|faceColor| string |
|earSize| string | | small, big
|hairColor| string |
|hairStyle| string | | normal, thick, mohawk, womanLong, womanShort
|eyeStyle| string | | circle, oval, smile
|noseStyle| string | | short, long, round
|mouthStyle| string | | laugh, smile, peace
|shirtStyle| string | | hoody, short, polo
|shirtColor| string |
|bgColor| string |


## License

MIT
