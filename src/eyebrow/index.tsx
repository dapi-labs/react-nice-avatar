import { OriginalEyebrow } from "../originals";
import React from "react";

import Unibrow from "./unibrow";
import Up from "./up";
import UpWoman from "./upWoman";

export default function eyebrow(props: { style: string }): SVGElement {
  const { style } = props;
  if (["down", "eyelashesDown"].includes(style)) return <OriginalEyebrow style={style} />;
  switch (style) {
    case "unibrow": return <Unibrow />;
    case "upWoman": return <UpWoman />;
    case "up":
    default:
      return <Up />;
  }
}
