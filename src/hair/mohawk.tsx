import React from "react";
import chroma from "chroma-js";

let nextMohawkId = 0;

export default function hairMohawk(props: { color: string, colorRandom: boolean }): SVGElement {
  const { color, colorRandom } = props;
  const clipId = `mohawk-scalp-${nextMohawkId++}`;
  const mainColor = colorRandom && color || "#171921";
  const subColor = colorRandom && chroma(color).brighten(2) || "#717376";
  return (
    <svg
      style={{
        position: "absolute",
        bottom: "40.8%",
        width: "97.6%",
        height: "63.5%",
        left: "-1.8%",
        overflow: "visible"
      }}
      width="240"
      height="203"
      viewBox="0 0 240 203"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Inner edge of the original face outline, mapped into this hair viewport.
            Keep the translucent shaved sides off the existing dark contour. */}
        <clipPath id={clipId}>
          <path transform="translate(30.75 13.746) scale(0.999016)" d="M74.514 27.998C113.949 18.5498 153.575 42.7219 163.267 82.0331L179.83 151.154C188.842 191.999 164.541 230.993 125.397 240.371C86.253 249.75 46.9204 226.002 36.8636 187.204L19.8842 116.386C10.7094 76.9513 35.0796 37.4461 74.514 27.998Z" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
      <path opacity="0.35" d="M187.986 80.1756C179.986 73.7756 166.153 73.1758 160.486 73.6758L152.486 47.1758C166.086 50.3758 184.486 71.1758 187.986 80.1756Z" fill={subColor} stroke={subColor} strokeWidth="1" />
      <path opacity="0.35" d="M67.4855 133.675C60.2855 106.475 89.4855 91.8415 102.985 87.6749C95.9855 71.3415 79.9854 56.6749 60.4854 74.6756C42.4854 105.175 49.4855 128.676 54.9855 146.675L67.4855 133.675Z" fill={subColor} stroke={subColor} strokeWidth="1" />
      </g>
      <path d="M85.7923 14.7636C85.7923 14.7636 91.5301 10.802 115.746 4.70097C139.963 -1.40007 148.792 0.983287 148.792 0.983287L160.581 73.815C160.581 73.815 152.542 73.6416 132.548 78.0085C112.555 82.3754 102.986 87.6748 102.986 87.6748C83.7855 48.0758 57.6521 72.5091 48.9855 89.6758C42.1855 48.0758 72.3188 21.5091 85.7923 14.7636Z" fill={mainColor} stroke="#171921" strokeWidth="3.8" strokeLinejoin="round" />
    </svg>

  );
}
