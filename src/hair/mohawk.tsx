import React from "react";
import chroma from "chroma-js";

export default function hairMohawk(props: { color: string, colorRandom: boolean }): SVGElement {
  const { color, colorRandom } = props;
  const mainColor = colorRandom && color || "#171921";
  const subColor = colorRandom && chroma(color).brighten(2) || "#717376";
  return (
    <svg
      style={{
        position: "absolute",
        bottom: "40.8%",
        width: "97.6%",
        height: "63.5%",
        left: "-1.8%"
      }}
      width="240"
      height="203"
      viewBox="0 0 240 203"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        opacity="0.35"
        d="M187.986 80.1756C179.986 73.7756 166.153 73.1758 160.486 73.6758L152.486 47.1758C166.086 50.3758 184.486 71.1758 187.986 80.1756Z"
        fill={subColor}
        stroke="#717376"
        strokeWidth="1"
      />
      <path
        opacity="0.35"
        d="M67.4855 133.675C60.2855 106.475 89.4855 91.8415 102.985 87.6749C95.9855 71.3415 79.9854 56.6749 60.4854 74.6756C42.4854 105.175 49.4855 128.676 54.9855 146.675L67.4855 133.675Z"
        fill={subColor}
        stroke="#717376"
        strokeWidth="1"
      />
      <defs>
        <path
          id="ld"
          d="M115.746 6.676C91.529 12.777 85.792 16.74 85.792 16.74 72.124 24.072 42.184 50.05 48.984 91.65c8.667-17.167 34.8-41.6 54-2 0 0 9.569-5.3 29.563-9.666 19.993-4.367 28.032-4.194 28.032-4.194L148.791 2.96s-8.829-2.384-33.045 3.717Z"
          fill={mainColor}
        />
        <clipPath id="clip">
          <use xlinkHref="#ld" />
        </clipPath>
      </defs>
      <g>
        <use
          xlinkHref="#ld"
          stroke="#171921"
          strokeWidth="8"
          fill={mainColor}
          clipPath="url(#clip)"
        />
      </g>
    </svg>

  );
}
