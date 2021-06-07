import React from "react";

import Scruff from "./scruff";

export default function (props) {
  const { style, color } = props;
  switch (style) {
    case "scruff":
      return <Scruff color={color} />;
    case "none":
    default:
      return null;
  }
}
