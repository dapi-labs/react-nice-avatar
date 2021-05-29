import React from "react";
import chroma from "chroma-js";

import Hoody from "./hoody";
import Short from "./short";
import Polo from "./polo";

export default function (props) {
  const { style, color } = props;
  const secondColor = chroma(color).brighten(1).hex();
  switch (style) {
    case "hoody": return <Hoody color={color} lightColor={secondColor} />;
    case "short": return <Short color={color} />;
    case "polo": return <Polo color={color} lightColor={secondColor} />;
  }
}
