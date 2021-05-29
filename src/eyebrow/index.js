import React from "react";

import Up from "./up";
import UpWoman from "./upWoman";

export default function (props) {
  const { style } = props;
  switch (style) {
    case "up": return <Up />;
    case "upWoman": return <UpWoman />;
  }
}
