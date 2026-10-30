import React from "react";
import Bob from "./bob";
import Curly from "./curly";
import Refined from "./refined";

export default function HairVariants({style, color, behindFace = false}: {style: string, color: string, behindFace?: boolean}) {
  if (style === "bob") return <Bob color={color} behindFace={behindFace} />;
  if (style === "curly") return behindFace ? null : <Curly color={color} />;
  if (["pixie", "bun", "buzz"].includes(style)) {
    return <Refined style={style} color={color} behindFace={behindFace} />;
  }
  return null;
}
