# react-nice-avatar

[![Version](http://img.shields.io/npm/v/@oniharnantyo/react-nice-avatar.svg)](https://www.npmjs.com/package/@oniharnantyo/react-nice-avatar)
[![npm download][download-image]][download-url]
[![CI](https://github.com/oniharnantyo/react-nice-avatar/actions/workflows/ci.yml/badge.svg)](https://github.com/oniharnantyo/react-nice-avatar/actions/workflows/ci.yml)
[![Netlify Status](https://api.netlify.com/api/v1/badges/df23baf6-daac-4ce5-a0b6-5baade2cb822/deploy-status)](https://app.netlify.com/sites/gracious-turing-db4aa3/deploys)

[download-image]: https://img.shields.io/npm/dm/@oniharnantyo/react-nice-avatar.svg?style=flat-square
[download-url]: https://npmjs.org/package/@oniharnantyo/react-nice-avatar

<div align="center">
    <a href="https://nice-avatar.chilllab.io/">
        <img src="https://user-images.githubusercontent.com/5305874/131275587-a6f44325-cb18-4a1c-8a1c-785942e751e7.png" 
             width="600" alt="imagewall" />
    </a>
</div>

## Online editor / preview

- https://nice-avatar.wwayne.com

## What's new

The avatar is no longer a static picture — it can behave like a little living
character, which makes it a good fit for AI copilots, chat assistants and
landing pages:

- **Ambient life** — natural blinking (with occasional double blinks), tiny
  eye saccades, breathing sway and a head turn, all randomized so it never
  looks metronomic.
- **Expressions** — 11 named expressions that drive the eyebrows, eyes and
  mouth together, and _glide_ between each other instead of snapping.
- **Gestures** — one-shot `nod`, `shake`, `sneeze` and `squash`, playable
  declaratively via the `gesture` prop or imperatively through a ref.
- **Gaze tracking** — the head and eyes follow the pointer, either just over
  the avatar (`hover`) or across the whole window (`global`).
- **Agent states** — a high-level persona state (`listening`, `thinking`,
  `speaking`, `celebrating`, `confused`, `error`, `focused`, …) that changes
  the pose, the expression, the breathing tempo and the badge.
- **Sentiment** — a separate, fast-changing emotional channel (`joy`,
  `curiosity`, `concern`, …) layered on top of the agent state.
- **Emote FX** — comic / anime overlay badges (`idea`, `zzz`, `sparkle`,
  `sweat`, `anger`, `question`, `exclamation`, `heart`, `gear`).
- **Secondary motion** — spring inertia on the hair and accessories that
  follows the head.
- **Talking** — the mouth cycles speech-like shapes, driven by the `talking`
  prop, the `speaking` agent state, or `talk(ms)`.
- **Sleeping** — after a period of inactivity the avatar yawns, droops and
  falls asleep; any interaction startles it awake.
- **`useAvatarController`** — a hook that bundles the props, the ref and a
  small imperative API for driving the avatar from your own code.

Everything above is opt-in, ships zero extra dependencies, and respects
`prefers-reduced-motion`.

## Assets

- Designer: [@Micah](https://www.figma.com/@Micah) on Figma
- Figma files: [Avatar Illustration System](https://www.figma.com/community/file/829741575478342595)

## Installation

```sh
npm install @oniharnantyo/react-nice-avatar
```

or

```sh
yarn add @oniharnantyo/react-nice-avatar
```

## Usage

1. Import the component.
   ```js
   import Avatar, { genConfig } from "@oniharnantyo/react-nice-avatar";
   ```
2. Generate a configuration

   Config can be generated with a seed, a seed is a string of name, email or any string you like

   ```js
   const config = genConfig("hi@dapi.to");
   ```

   or it can be generate with a customized object, plz check the Options below for what attributes can be passed in

   ```js
   const config = genConfig({ sex: "man", hairStyle: "mohawk" });
   ```

   or generating a random config by passing nothing to the function genConfig

   ```js
   const config = genConfig();
   ```

3. Render the component with specific width / height and configuration.

   ```jsx
   <Avatar style={{ width: "8rem", height: "8rem" }} {...config} />
   ```

   or

   ```jsx
   <Avatar className="w-32 h-32" {...config} />
   ```

4. Make it alive.

   ```jsx
   <Avatar className="w-32 h-32" {...config} animated idle lookAt="hover" />
   ```

## Options

The options can be passed into genConfig or as React props

| key               | type    | default | accept                                                                                           | tips                                                             |
| ----------------- | ------- | ------- | ------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------- |
| `id`              | string  |         |                                                                                                  | Only for React Props                                             |
| `className`       | string  |         |                                                                                                  | Only for React Props                                             |
| `style`           | object  |         |                                                                                                  | Only for React Props                                             |
| `shape`           | string  | circle  | circle, rounded, square                                                                          | Only for React Props                                             |
| `sex`             | string  |         | man, woman                                                                                       |                                                                  |
| `faceColor`       | string  |         |                                                                                                  |                                                                  |
| `earSize`         | string  |         | small, big                                                                                       |                                                                  |
| `hairColor`       | string  |         |                                                                                                  |                                                                  |
| `hairStyle`       | string  |         | normal, thick, mohawk, womanLong, womanShort                                                     |                                                                  |
| `hairColorRandom` | boolean | false   |                                                                                                  | thick,mohawk default only be black                               |
| `hatColor`        | string  |         |                                                                                                  |                                                                  |
| `hatStyle`        | string  |         | none, beanie, turban                                                                             | Usually is none                                                  |
| `eyeStyle`        | string  |         | circle, oval, smile, closed, droopy, squint, wide                                                |                                                                  |
| `eyeBrowStyle`    | string  |         | up, upWoman, angry, down, flat, raised                                                           | Only for `genConfig`                                             |
| `glassesStyle`    | string  |         | none, round, square                                                                              | Usually is none                                                  |
| `noseStyle`       | string  |         | short, long, round                                                                               |                                                                  |
| `mouthStyle`      | string  |         | laugh, smile, peace, frown, grimace, open, straight, surprised                                   |                                                                  |
| `shirtStyle`      | string  |         | hoody, short, polo                                                                               |                                                                  |
| `shirtColor`      | string  |         |                                                                                                  |                                                                  |
| `bgColor`         | string  |         |                                                                                                  |                                                                  |
| `isGradient`      | boolean | false   |                                                                                                  |                                                                  |
| `expression`      | string  | neutral | neutral, happy, excited, surprised, sad, disappointed, exhausted, angry, shy, sleepy, focused    | Overrides eye/eyebrow/mouth styles                               |
| `animated`        | boolean | false   |                                                                                                  | Blinking, mouth movement, head sway and turn                     |
| `idle`            | boolean | false   |                                                                                                  | Subtle idle life: blinking + gentle head sway                    |
| `gesture`         | string  |         | nod, shake, sneeze, squash                                                                       | One-shot head gesture, replayed when the prop changes            |
| `lookAt`          | string  | none    | none, hover, global, center                                                                      | Gaze tracking; `useAvatarController` defaults to `hover`         |
| `lookAtCursor`    | boolean | false   |                                                                                                  | Deprecated alias, implies `lookAt="hover"`                       |
| `agentState`      | string  | idle    | idle, listening, thinking, speaking, focused, executing, tool_call, celebrating, confused, error | High-level persona state for AI companions                       |
| `sentiment`       | string  | neutral | neutral, joy, curiosity, confusion, concern, amusement, surprise                                 | Dynamic emotion mapping                                          |
| `fx`              | string  |         | idea, zzz, sweat, sparkle, anger, question, exclamation, heart, gear                             | Comic / anime animated overlay badges                            |
| `secondaryMotion` | boolean | true    |                                                                                                  | Secondary spring inertia on hair and accessories                 |
| `talking`         | boolean | false   |                                                                                                  | Mouth cycles speech-like shapes; also via ref `talk(ms)`         |
| `sleepAfter`      | number  | 60000   |                                                                                                  | ms of inactivity before it nods off (needs `animated` or `idle`) |

> Without an explicit `expression`, the randomly generated face is kept as-is.
> Passing `expression="neutral"` pins the avatar to the neutral feature set.

### Expressions

An expression overrides the eyebrow / eye / mouth styles of the generated
config, and the features glide into place instead of snapping:

| expression     | eyebrow | eye    | mouth     |
| -------------- | ------- | ------ | --------- |
| `neutral`      | up      | circle | peace     |
| `happy`        | up      | smile  | smile     |
| `excited`      | raised  | wide   | open      |
| `surprised`    | raised  | wide   | surprised |
| `sad`          | down    | droopy | frown     |
| `disappointed` | flat    | droopy | straight  |
| `exhausted`    | flat    | closed | straight  |
| `angry`        | angry   | squint | grimace   |
| `shy`          | up      | squint | smile     |
| `sleepy`       | flat    | closed | peace     |
| `focused`      | flat    | oval   | straight  |

### Agent states

`agentState` is the coarse "what is the character doing right now" channel.
It changes the head pose, the expression, the breathing tempo and the emote
badge at once:

| state         | behavior                                                                   |
| ------------- | -------------------------------------------------------------------------- |
| `idle`        | Resting pose, no badge                                                     |
| `listening`   | Slow repeating head nod, happy expression                                  |
| `thinking`    | Eyes drift up and to the right, head tilts, `idea` badge, slower breathing |
| `speaking`    | Speech bob, mouth cycles speech shapes                                     |
| `focused`     | Flat brows, narrowed eyes, scanning gaze, `gear` badge, fast breathing     |
| `executing`   | Same as `focused` — use it while a job is running                          |
| `tool_call`   | Same as `focused` — use it while a tool is being called                    |
| `celebrating` | Squash-and-stretch, happy expression, `sparkle` badge                      |
| `confused`    | Head tilt, surprised expression, `question` badge                          |
| `error`       | Disappointed expression, `exclamation` badge                               |

### Sentiment

`sentiment` is the fast-moving emotional layer on top of the agent state. It
maps onto an expression and decays back to `neutral` on its own when driven
through the controller:

| sentiment   | expression      |
| ----------- | --------------- |
| `joy`       | happy           |
| `amusement` | happy           |
| `curiosity` | excited         |
| `confusion` | surprised       |
| `surprise`  | surprised       |
| `concern`   | sad             |
| `neutral`   | – (no override) |

The final expression is resolved in this order:

**reaction flash → sleep cycle → sentiment → agent state → configured expression**

### Emote FX

`fx` renders an animated comic / anime badge over the avatar. Pass a string to
pin it, or `null` to hide it:

`idea` · `zzz` · `sweat` · `sparkle` · `anger` · `question` · `exclamation` ·
`heart` · `gear`

## Live avatar: `useAvatarController`

The hook wires the props, the ref and a small imperative API together — handy
for AI copilots, chat widgets and anything that reacts to your app state:

```jsx
import Avatar, { useAvatarController, genConfig } from "@oniharnantyo/react-nice-avatar";

function Companion() {
  const { avatarProps, controller } = useAvatarController({
    agentState: "idle",
    lookAt: "global", // tracks the pointer across the entire browser window!
    secondaryMotion: true, // spring inertia on hair & accessories
    sleepAfter: 45000,
  });

  const config = genConfig("hi@dapi.to");

  return (
    <div>
      <Avatar className="w-32 h-32" {...config} {...avatarProps} />

      {/* Programmatic triggers */}
      <button onClick={() => controller.setAgentState("thinking")}>Think</button>
      <button onClick={() => controller.runTool(() => fetchResults())}>Run Tool ⚙️</button>
      <button onClick={() => controller.speak("Hello! Nice to meet you.")}>Speak</button>
      <button onClick={() => controller.showFx("sparkle")}>Sparkle ✨</button>
      <button onClick={() => controller.nod()}>Nod</button>
    </div>
  );
}
```

### Controller API

| method                                        | description                                                                           |
| --------------------------------------------- | ------------------------------------------------------------------------------------- |
| `setAgentState(state)`                        | Switch the persona state (`listening`, `thinking`, `speaking`, …)                     |
| `setSentiment(sentiment, duration?)`          | Set the emotion; decays back to `neutral` after `duration` ms (default `2200`)        |
| `showFx(fx, duration?)`                       | Show an emote badge for `duration` ms (default `2500`)                                |
| `clearFx()`                                   | Hide the emote badge immediately                                                      |
| `speak(durationOrText?, options?)`            | Speak for a duration, or estimate it from the text (≈280 ms/word, minimum 1600 ms)    |
| `stopSpeaking()`                              | Stop talking and return to `idle`                                                     |
| `runTool(task)`                               | Runs `task` while showing the `focused` state; on failure it shakes and shows `error` |
| `nod()` / `shake()` / `sneeze()` / `squash()` | One-shot head gestures                                                                |
| `doubleTake()`                                | Glance away, snap back, brief surprise                                                |
| `turn(direction?)`                            | Hold a head turn (`left` / `right`); `turn()` releases it                             |
| `wake()` / `sleep()`                          | Wake the avatar up or put it to sleep                                                 |

### Ref handle

Direct ref methods are also available on the component itself:

```jsx
const ref = useRef(null);

<ReactNiceAvatar ref={ref} {...config} animated />;

ref.current.nod(); // one-shot nod (two dips)
ref.current.shake(); // one-shot head shake
ref.current.sneeze(); // squinting wind-up, then a sharp burst
ref.current.squash(); // whole-body squash-and-stretch
ref.current.doubleTake(); // glance away, snap back, brief surprise
ref.current.talk(4000); // mouth babbles for 4s (talk(0)/stopTalking() to stop)
ref.current.turn("left"); // hold a head turn — the eyes lead, the head follows
ref.current.turn(); // or turn("center"): release the turn
ref.current.showFx("idea"); // trigger lightbulb, zzz, sweat, sparkle, etc.
ref.current.clearFx(); // hide the badge
ref.current.wake(); // wake up from sleep
ref.current.sleep(); // fall asleep now
```

There is also a declarative shortcut: `<ReactNiceAvatar gesture="nod" />` plays the
gesture on mount and whenever the prop value changes.

## How the life behaviors work

With `animated` or `idle` set, the avatar has ambient life of its own:

- **Blinking** happens on a randomized interval, with an occasional double blink.
  Drowsy eyes blink slower and heavier.
- **Saccades** — at rest the eyes dart to a nearby point for a tenth of a second,
  then return to center. They never fire while the avatar is tracking the
  pointer or busy with a task.
- **Attention** — coming back to the tab wakes the avatar up if it had fallen
  asleep, with a startled wide-eyed reaction.
- **Sleeping** — after `sleepAfter` ms without attention it yawns, droops and
  falls asleep. Any interaction startles it awake.
- **Secondary motion** — the hair lags behind the head with a springy inertia.
- **Emotional follow-through** — gestures leave a trace: a nod may resolve into a
  smile, a shake into a frown.

`animated` is the fuller version (blinking, mouth movement, head sway and
turn); `idle` is the subtler one (blinking plus a gentle sway). Both can be
combined.

All of it respects `prefers-reduced-motion`: the library's animation keyframes
are never injected, so everything stays still.

## Accessibility & SSR

- **Reduced motion** — when the user prefers reduced motion, the keyframes are
  never injected into the document, so the avatar renders static instead of
  animating.
- **Server-side rendering** — the component renders fine on the server. The
  animation styles are injected lazily in the browser, and the random-looking
  behaviors (blinking, saccades) only start after mount, so there is no
  hydration mismatch.

## Examples

Runnable examples live in [`examples/`](./examples):

| example                                 | description                                        |
| --------------------------------------- | -------------------------------------------------- |
| [`basic`](./examples/basic)             | Basic usage with a custom config                   |
| [`random`](./examples/random)           | Generating random avatars with a seed              |
| [`expressions`](./examples/expressions) | Facial expressions (happy, sad, excited, angry, …) |

```sh
cd examples/basic
npm install
npm run dev
```

## Development & Modern Toolchain (Vite+)

This project is built and maintained with [Vite+](https://viteplus.dev) (`vp`), unifying Vite, Vitest, Rolldown, Oxlint, and Oxfmt into a single high-performance developer toolchain.

1. Clone the repo:
   ```sh
   git clone git@github.com:oniharnantyo/react-nice-avatar.git
   cd react-nice-avatar
   ```
2. Install dependencies (Node.js 22.18+, 24.11+ or 26+ — required by the Vite+ toolchain):
   ```sh
   npm install
   ```
3. Start the dev server for the interactive demo:
   ```sh
   npm run dev
   # or: make dev (runs vp dev --config vite.config.demo.ts)
   ```
4. Build the library (dual ESM and CJS outputs with TypeScript declarations via Rolldown):
   ```sh
   npm run build
   # or: make build (runs vp build)
   ```

## Testing & Quality Assurance

- **Format, Lint & Type Check** (Oxfmt + Oxlint + TypeScript via Vite+):

  ```sh
  npm run check       # runs vp check
  npm run check:fix   # runs vp check --fix to auto-fix formatting & linting
  # or: make check / make check-fix
  ```

- **Run Tests** (Vitest v5 via Vite+):

  ```sh
  npm test            # runs vp test run
  npm run test:watch  # runs vp test in watch mode
  npm run test:coverage
  # or: make test
  ```

- **Type Check Only**:

  ```sh
  npm run typecheck   # runs tsc --noEmit
  # or: make typecheck
  ```

## Release

Publishing uses [npm trusted publishing](https://docs.npmjs.com/trusted-publishers):
the workflow authenticates to the registry with a short-lived OIDC token, so
no long-lived `NPM_TOKEN` secret is needed. Provenance attestations are
attached automatically.

One-time setup — on [npmjs.com](https://www.npmjs.com) → Packages →
`@oniharnantyo/react-nice-avatar` → Settings → Trusted Publisher, add a
GitHub Actions publisher with:

| field                | value               |
| -------------------- | ------------------- |
| Organization or user | `oniharnantyo`      |
| Repository           | `react-nice-avatar` |
| Workflow filename    | `npm-publish.yml`   |

> The new trusted publisher must complete its first publish within 2 days,
> otherwise it expires and has to be recreated.

Then publish by pushing a `v*` tag:

```sh
git tag v0.1.0
git push origin v0.1.0
```

## License

Released under [MIT](/LICENSE) by [@oniharnantyo](https://github.com/oniharnantyo).
