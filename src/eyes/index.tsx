import { OriginalEyes } from "../originals";
import React from "react";
import Variants from "./variants";

import Circle from "./circle";
import Oval from "./oval";
import Smile from "./smile";

export default function eyes(props: { style: string, color?: string }): SVGElement {
  const { style } = props;
  if (["wink", "sleepy", "sparkle", "focused"].includes(style)) return <Variants style={style} />;
  if (style === "eyeshadow") return <OriginalEyes color={props.color} />;
  switch (style) {
    case "circle": return <Circle />;
    case "smileShadow": return <Smile shadowColor={props.color || "#6BD9E9"} />;
    case "smile": return <Smile />;
    case "oval":
    default:
      return <Oval />;
  }
}
