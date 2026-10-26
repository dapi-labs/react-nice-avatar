# Expressions Example

Demonstrates all available facial expressions for react-nice-avatar.

Available expressions: `neutral`, `happy`, `excited`, `surprised`, `sad`, `disappointed`, `exhausted`, `angry`, `shy`, `sleepy`

Changing the expression glides the eyebrows, eyes and mouth to their new positions (CSS transition) instead of snapping.

Life-like motion props:

- `animated` — blinking (randomized, occasional double blinks), mouth opening/closing, head sway and head turn
- `idle` — subtler idle life: blinking + gentle head sway
- With either pulse prop, the avatar also darts its eyes in tiny saccades at rest, looks up startled when you come back to the tab, and yawns itself to sleep after ~30s of no attention (demo sets `sleepAfter={30000}`; library default is 60s). Any hover, click or gesture wakes it with a surprised flash and speeds its breathing up for a moment.

Head gestures (buttons wired to ref methods):

- `ref.current.nod()` / `shake()` — one-shot nods and shakes
- `ref.current.sneeze()` — squinting wind-up, then a sharp burst
- `ref.current.squash()` — whole-body squash-and-stretch (this is what a stage click does)
- `ref.current.doubleTake()` — glance left, snap back with a surprised flash
- `ref.current.talk(4000)` — the mouth cycles speech-like shapes irregularly
- `ref.current.turn("left" | "right" | "center")` — hold a head turn; the eyes lead, the head follows
- Declarative: `<Avatar gesture="shake" />` replays whenever the prop value changes

The stage hero also has `lookAtCursor`: hover around it and the head tilts while the eyes track your pointer; gestures may leave a little emotional follow-through (a nod can end in a smile, a shake in a frown).

## Run

```bash
cd examples/expressions
npm install
npm run dev
```
