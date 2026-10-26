import React from "react";
import type { EmoteFxName } from "../types";

import Idea from "./idea";
import Zzz from "./zzz";
import Sweat from "./sweat";
import Sparkle from "./sparkle";
import Anger from "./anger";
import Question from "./question";
import Exclamation from "./exclamation";
import Heart from "./heart";
import Gear from "./gear";

export interface EmoteFxProps {
  type?: EmoteFxName | null;
}

export default function EmoteFx(props: EmoteFxProps): JSX.Element | null {
  const { type } = props;
  if (!type) return null;

  switch (type) {
    case "idea":
      return <Idea />;
    case "zzz":
      return <Zzz />;
    case "sweat":
      return <Sweat />;
    case "sparkle":
      return <Sparkle />;
    case "anger":
      return <Anger />;
    case "question":
      return <Question />;
    case "exclamation":
      return <Exclamation />;
    case "heart":
      return <Heart />;
    case "gear":
      return <Gear />;
    default:
      return null;
  }
}
