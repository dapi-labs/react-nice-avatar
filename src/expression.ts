import { AvatarFullConfig, EyeBrowStyle, EyeStyle, MouthStyle } from "./types";

type ExpressionParts = {
  eyeBrowStyle: EyeBrowStyle;
  eyeStyle: EyeStyle;
  mouthStyle: MouthStyle;
};

const expressionMap: Record<string, ExpressionParts> = {
  neutral: {
    eyeBrowStyle: "up",
    eyeStyle: "circle",
    mouthStyle: "peace",
  },
  happy: {
    eyeBrowStyle: "up",
    eyeStyle: "smile",
    mouthStyle: "smile",
  },
  excited: {
    eyeBrowStyle: "raised",
    eyeStyle: "wide",
    mouthStyle: "open",
  },
  surprised: {
    eyeBrowStyle: "raised",
    eyeStyle: "wide",
    mouthStyle: "surprised",
  },
  sad: {
    eyeBrowStyle: "down",
    eyeStyle: "droopy",
    mouthStyle: "frown",
  },
  disappointed: {
    eyeBrowStyle: "flat",
    eyeStyle: "droopy",
    mouthStyle: "straight",
  },
  exhausted: {
    eyeBrowStyle: "flat",
    eyeStyle: "closed",
    mouthStyle: "straight",
  },
  angry: {
    eyeBrowStyle: "angry",
    eyeStyle: "squint",
    mouthStyle: "grimace",
  },
  shy: {
    eyeBrowStyle: "up",
    eyeStyle: "squint",
    mouthStyle: "smile",
  },
  sleepy: {
    eyeBrowStyle: "flat",
    eyeStyle: "closed",
    mouthStyle: "peace",
  },
  focused: {
    eyeBrowStyle: "flat",
    eyeStyle: "oval",
    mouthStyle: "straight",
  },
  // Internal expressions driving the life behaviors — rendered through the
  // same pipeline but never valid as a public `expression` prop (propTypes
  // keeps the public list).
  drowsy: {
    eyeBrowStyle: "flat",
    eyeStyle: "squint",
    mouthStyle: "peace",
  },
  yawn: {
    eyeBrowStyle: "raised",
    eyeStyle: "closed",
    mouthStyle: "open",
  },
  sneezing: {
    eyeBrowStyle: "angry",
    eyeStyle: "squint",
    mouthStyle: "straight",
  },
};

export function applyExpression<T extends AvatarFullConfig>(config: T): T {
  // No expression passed at all → keep the randomly generated face
  // (backward-compatible default). An explicit expression — including
  // "neutral" — always maps to its fixed feature set.
  if (!config.expression) {
    return config;
  }

  const mapped = expressionMap[config.expression];
  if (!mapped) {
    return config;
  }

  return {
    ...config,
    eyeBrowStyle: mapped.eyeBrowStyle,
    eyeStyle: mapped.eyeStyle,
    mouthStyle: mapped.mouthStyle,
  };
}

/**
 * Extra vertical offsets (in % of the avatar height) applied on top of each
 * feature's baked-in position, so switching expressions glides the features
 * instead of snapping. Negative values move a feature up.
 */
export type FeatureOffsets = {
  eyebrow: string;
  eye: string;
  mouth: string;
};

const featureOffsets: Record<string, FeatureOffsets> = {
  neutral: { eyebrow: "0%", eye: "0%", mouth: "0%" },
  happy: { eyebrow: "0.6%", eye: "0.4%", mouth: "1%" },
  excited: { eyebrow: "-2.5%", eye: "-1%", mouth: "-2%" },
  surprised: { eyebrow: "-3.5%", eye: "-1.5%", mouth: "-2.5%" },
  sad: { eyebrow: "2.5%", eye: "2.5%", mouth: "3%" },
  disappointed: { eyebrow: "1.5%", eye: "1.5%", mouth: "1.5%" },
  exhausted: { eyebrow: "2%", eye: "1%", mouth: "1.5%" },
  angry: { eyebrow: "-1.5%", eye: "0.5%", mouth: "1%" },
  shy: { eyebrow: "0.5%", eye: "1%", mouth: "1%" },
  sleepy: { eyebrow: "1.5%", eye: "0.5%", mouth: "1.5%" },
  drowsy: { eyebrow: "1.5%", eye: "1%", mouth: "1.5%" },
  yawn: { eyebrow: "-2%", eye: "-1%", mouth: "-1.5%" },
  sneezing: { eyebrow: "-1.5%", eye: "0.5%", mouth: "1%" },
  focused: { eyebrow: "2.8%", eye: "1.2%", mouth: "1.4%" },
};

export function getFeatureOffsets(expression?: string): FeatureOffsets {
  return (expression && featureOffsets[expression]) || featureOffsets.neutral;
}
