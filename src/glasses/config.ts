import { GlassesStyle, GlassesMode } from "../types";

/** Explicit mode wins; legacy aliases retain their original appearance. */
export function resolveGlasses(style: GlassesStyle, mode?: GlassesMode) {
  const aliases: {[key: string]: [GlassesStyle, GlassesMode]} = {
    roundDark: ["round", "dark"], squareDark: ["square", "dark"],
    aviatorDark: ["aviator", "dark"], aviatorTinted: ["aviator", "tinted"]
  };
  const legacy = aliases[style];
  return {style: legacy ? legacy[0] : style, mode: mode || (legacy ? legacy[1] : "transparent")};
}
