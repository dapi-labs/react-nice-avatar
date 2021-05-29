import React from "react";

import Long from "./long";
import Short from "./short";
import Round from "./round";

export default function (props) {
  const { style } = props;
  switch (style) {
    case "short": return <Short />;
    case "long": return <Long />;
    case "round": return <Round />;
  }
}
