import React from "react";

import Up from "./up";
import UpWoman from "./upWoman";
import Down from "./down";
import Raised from "./raised";
import Angry from "./angry";
import Flat from "./flat";
import { positionFeature } from "../feature";

export default function eyebrow(props: {
  style: string;
  offsetY?: string;
  offsetX?: string;
}): React.ReactElement {
  const { style, offsetY, offsetX } = props;
  const svg = renderEyebrow(style);
  return positionFeature(svg, { offsetY, offsetX });
}

function renderEyebrow(style: string): React.ReactElement {
  switch (style) {
    case "upWoman":
      return <UpWoman />;
    case "down":
      return <Down />;
    case "raised":
      return <Raised />;
    case "angry":
      return <Angry />;
    case "flat":
      return <Flat />;
    case "up":
    default:
      return <Up />;
  }
}
