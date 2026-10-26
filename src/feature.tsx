import React from "react";

type FeatureOptions = {
  /** Extra vertical offset in % of the avatar height; transitioned so expression changes glide. */
  offsetY?: string;
  /** Extra horizontal offset in % of the feature width; transitioned so head turns lead with the eyes. */
  offsetX?: string;
  /** CSS animation shorthand (e.g. "rna-blink-once 190ms ease-in-out"), or falsy to disable. */
  animation?: string | false;
  animationDelay?: string;
};

/**
 * Merge positioning and animation styles onto a feature component element.
 * Each feature SVG owns its baked position as
 * `top: calc(<baked> + var(--rna-top-shift, 0%))`, so we only supply the
 * variable — the component keeps being the single source of truth for its
 * own geometry. Horizontal shifts use the standalone `translate` property so
 * they compose with (rather than fight) `transform`-based animations like the
 * blink.
 */
export function positionFeature(
  svg: React.ReactElement,
  { offsetY = "0%", offsetX, animation, animationDelay }: FeatureOptions,
): React.ReactElement {
  const style: Record<string, string | number> = {
    ...svg.props?.style,
    transition: "top 400ms ease, translate 450ms cubic-bezier(0.34, 1.3, 0.64, 1)",
    "--rna-top-shift": offsetY,
  };
  if (offsetX) {
    style.translate = `${offsetX} 0`;
  }
  if (animation) {
    style.animation = animation;
    if (animationDelay) {
      style.animationDelay = animationDelay;
    }
  }
  return React.cloneElement(svg, { style });
}

/**
 * Add two percentage offsets ("-1.2%" + "0.4%" → "-0.80%"); falsy reads as 0.
 * Used to stack local feature motion (saccades) on top of the offsets the
 * parent already supplies (turns, cursor tracking).
 */
export function addPercent(a?: string, b?: string): string {
  return `${((a ? parseFloat(a) : 0) + (b ? parseFloat(b) : 0)).toFixed(2)}%`;
}
