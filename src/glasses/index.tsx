import React from "react";

import Round from "./round";
import Square from "./square";

export default function (props: { style: string }) {
  const { style } = props;
  switch (style) {
    case "round": return <Round />;
    case "square": return <Square />;
    case "none":
    default:
      return null;
  }
}
