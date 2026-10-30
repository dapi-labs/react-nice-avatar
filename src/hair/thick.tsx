import React from "react";

export default function hairThick(props: { color: string, colorRandom: boolean }): SVGElement {
  const { color, colorRandom } = props;
  const fill = colorRandom && color || "black";
  return (
    <svg
      style={{
        position: "absolute",
        left: 0,
        bottom: "40.2%",
        width: "93.5%",
        height: "64%"
      }}
      width="240"
      height="200"
      viewBox="0 0 240 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M189.499 2.502C210.177 11 215.116 27.719 210.177 51.397C208.9 57.5 205.5 63 200.5 67.8C208 96 210.6 120.988 205.134 124.947L190 77.6C161 93 105 96.896 83.677 96.896C70 98.5 69 112 71 128C72.2 139 74 147 74 153C69 153 64 154.5 60 156C53 158 49 166 49 176C42 165 36 149 30.677 134.896C24 118.5 22.5 106 26 94C22 89 15 86 10 84.5C20 79.2 30 79.3 37 82C34 75.5 29 70 24.989 67.363C33 63.3 41 64.2 48.4 67.333C67 50 94 37.8 121.999 30.999C170.815 19.165 189.499 2.502 189.499 2.502Z"
        fill={fill} stroke="#171921" strokeWidth="4" strokeLinejoin="round" />
    </svg>

  );
}
