import React, { useEffect, useState } from "react";

import Circle from "./circle";
import Oval from "./oval";
import Smile from "./smile";
import Closed from "./closed";
import Wide from "./wide";
import Squint from "./squint";
import Droopy from "./droopy";
import { positionFeature, addPercent } from "../feature";

// Eye styles drawn as open shapes that read as closed (arcs/lines) look odd
// when blinking, so only genuinely open eyes get the blink animation.
const BLINKABLE_STYLES = ["circle", "oval", "wide", "droopy"];
// Saccades read as twitches on eyes drawn shut, so closed eyes never dart.
const SACCADABLE_STYLES = ["circle", "oval", "smile", "wide", "squint", "droopy"];

export default function eyes(props: {
  style: string;
  offsetY?: string;
  offsetX?: string;
  blink?: boolean;
  sleepy?: boolean;
  saccade?: boolean;
  scan?: boolean;
}): React.ReactElement {
  const { style, offsetY, offsetX, blink, sleepy, saccade, scan } = props;
  const blinkOn = useNaturalBlink(blink && BLINKABLE_STYLES.includes(style), sleepy);
  const dart = useSaccades(saccade && SACCADABLE_STYLES.includes(style));
  const svg = renderEyes(style);

  let animation: string | false = false;
  if (blinkOn) {
    animation = "rna-blink-once 190ms ease-in-out";
  } else if (scan) {
    animation = "rna-focus-scan 2.6s ease-in-out infinite";
  }

  return positionFeature(svg, {
    offsetY: addPercent(offsetY, dart?.y),
    offsetX: addPercent(offsetX, dart?.x),
    animation,
  });
}

/**
 * Humans don't blink on a metronome. Schedule each blink at a random
 * interval, with the occasional quick double blink. Drowsy eyes blink
 * slower and heavier. Runs client-side only (effects don't fire during SSR).
 */
function useNaturalBlink(enabled?: boolean, sleepy?: boolean): boolean {
  const [blinkOn, setBlinkOn] = useState(false);
  useEffect(() => {
    if (!enabled) {
      setBlinkOn(false);
      return undefined;
    }
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;
    const close = (duration: number, next: () => void) => {
      setBlinkOn(true);
      timer = setTimeout(() => {
        if (cancelled) return;
        setBlinkOn(false);
        next();
      }, duration);
    };
    const schedule = () => {
      timer = setTimeout(
        () => {
          if (cancelled) return;
          if (!sleepy && Math.random() < 0.2) {
            close(150, () => close(130, schedule));
          } else {
            close(sleepy ? 420 : 170, schedule);
          }
        },
        sleepy ? 1400 + Math.random() * 2200 : 2200 + Math.random() * 4200,
      );
    };
    schedule();
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [enabled, sleepy]);
  return blinkOn;
}

/**
 * Eyes at rest still dart around: tiny saccades to a nearby point, held for
 * a tenth of a second, then back to center. Never fires while the avatar is
 * already looking at something (cursor tracking, turns).
 */
function useSaccades(enabled?: boolean): { x: string; y: string } | null {
  const [dart, setDart] = useState<{ x: string; y: string } | null>(null);
  useEffect(() => {
    if (!enabled) {
      setDart(null);
      return undefined;
    }
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;
    const schedule = () => {
      timer = setTimeout(
        () => {
          if (cancelled) return;
          setDart({
            x: `${(Math.random() * 2.4 - 1.2).toFixed(2)}%`,
            y: `${(Math.random() * 1.2 - 0.6).toFixed(2)}%`,
          });
          timer = setTimeout(
            () => {
              if (cancelled) return;
              setDart(null);
              schedule();
            },
            120 + Math.random() * 80,
          );
        },
        1600 + Math.random() * 3200,
      );
    };
    schedule();
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [enabled]);
  return dart;
}

function renderEyes(style: string): React.ReactElement {
  switch (style) {
    case "circle":
      return <Circle />;
    case "smile":
      return <Smile />;
    case "closed":
      return <Closed />;
    case "wide":
      return <Wide />;
    case "squint":
      return <Squint />;
    case "droopy":
      return <Droopy />;
    case "oval":
    default:
      return <Oval />;
  }
}
