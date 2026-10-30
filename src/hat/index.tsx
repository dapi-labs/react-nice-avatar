import React from "react";
import Variants from "./variants";

import Turban from "./turban";
import Beanie from "./beanie";

export default function hat(props: { color: string, style: string }): SVGElement {
  const { style, color } = props;
  if (["bucket"].includes(style)) return <Variants style={style} color={color} />;
  switch (style) {
    case "beanie": return <Beanie color={color} />;
    case "turban": return <Turban color={color} />;
    case "none":
    default:
      return null;
  }
}
