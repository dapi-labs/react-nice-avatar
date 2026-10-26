import React, { useEffect, useState } from "react";

import Laugh from "./laugh";
import Smile from "./smile";
import Peace from "./peace";
import Frown from "./frown";
import Open from "./open";
import Surprised from "./surprised";
import Straight from "./straight";
import Grimace from "./grimace";
import { positionFeature } from "../feature";

export default function mouth(props: {
  style: string;
  offsetY?: string;
  move?: boolean;
  talking?: boolean;
}): React.ReactElement {
  const { style, offsetY, move, talking } = props;
  const spoken = useTalkingShapes(talking);
  const svg = renderMouth(spoken ?? style);
  return positionFeature(svg, {
    offsetY,
    animation: move && !talking ? "rna-mouth 2.6s ease-in-out infinite" : false,
  });
}

/**
 * Talking mouths don't hold one shape: cycle irregularly between open,
 * closed and smiling positions. Never metronomic — real speech is lumpy.
 */
function useTalkingShapes(active?: boolean): string | null {
  const [shape, setShape] = useState<string | null>(null);
  useEffect(() => {
    if (!active) {
      setShape(null);
      return undefined;
    }
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;
    const pick = () => {
      const roll = Math.random();
      setShape(roll < 0.42 ? "open" : roll < 0.68 ? "straight" : roll < 0.88 ? "smile" : "laugh");
      timer = setTimeout(
        () => {
          if (!cancelled) pick();
        },
        130 + Math.random() * 170,
      );
    };
    pick();
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [active]);
  return shape;
}

function renderMouth(style: string): React.ReactElement {
  switch (style) {
    case "laugh":
      return <Laugh />;
    case "smile":
      return <Smile />;
    case "frown":
      return <Frown />;
    case "open":
      return <Open />;
    case "surprised":
      return <Surprised />;
    case "straight":
      return <Straight />;
    case "grimace":
      return <Grimace />;
    case "peace":
    default:
      return <Peace />;
  }
}
