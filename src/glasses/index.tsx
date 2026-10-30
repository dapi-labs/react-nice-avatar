import React from "react";
import { GlassesStyle, GlassesMode } from "../types";
import { resolveGlasses } from "./config";
import Aviator from "./aviator";
import Round from "./round";
import Square from "./square";

export default function Glasses(props: {style: GlassesStyle, color?: string, mode?: GlassesMode}) {
  const {style, mode} = resolveGlasses(props.style, props.mode);
  const finish = {dark: mode === "dark", tinted: mode === "tinted", color: props.color};
  switch (style) {
    case "round": return <Round {...finish} />;
    case "square": return <Square {...finish} />;
    case "aviator": return <Aviator {...finish} />;
    default: return null;
  }
}
