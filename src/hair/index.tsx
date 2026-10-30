import { OriginalHair } from "../originals";
import React from "react";
import Variants from "./variants";

import Normal from "./normal";
import Thick from "./thick";
import Mohawk from "./mohawk";
import WomanLong from "./womanLong";
import WomanShort from "./womanShort";

export default function hair(props: { style: string, color: string, colorRandom: boolean }): SVGElement {
  const { style, color, colorRandom } = props;
  if (["curly", "bob", "pixie", "bun", "buzz"].includes(style)) return <Variants style={style} color={color} />;
  if (["dougFunny", "bald"].includes(style)) return <OriginalHair style={style} color={color} />;
  switch (style) {
    case "thick": return <Thick color={color} colorRandom={colorRandom} />;
    case "mohawk": return <Mohawk color={color} colorRandom={colorRandom} />;
    case "womanLong": return <WomanLong color={color} />;
    case "womanShort": return <WomanShort color={color} />;
    case "normal":
    default:
      return <Normal color={color} />;
  }
}
